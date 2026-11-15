#!/usr/bin/env node
// Renders a presentation to an MP4, frame by frame, with no screen recording.
//   node record.mjs dubai            -> ../elan-dubai-presentation.mp4
//   node record.mjs bni-raipur       -> ../elan-bni-raipur-presentation.mp4
//   node record.mjs dubai 8          -> first 8 seconds only (quick test)
//
// It opens the deck in headless Chrome with ?record (auto-play, no controls), freezes the
// browser clock, steps it 1/30 s at a time and captures every frame, so the video is smooth
// even though a frame takes longer than 1/30 s to draw. ffmpeg then encodes it with a short
// fade in and out. Needs Google Chrome and ffmpeg (both installed on this Mac). Silent.
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const edition = process.argv[2] || 'dubai';
const testSeconds = process.argv[3] ? Number(process.argv[3]) : null;
const FPS = 30, W = 1920, H = 1080;
const here = path.dirname(fileURLToPath(import.meta.url));
const names = { dubai: 'elan-dubai-presentation', 'bni-raipur': 'elan-bni-raipur-presentation' };
if (!names[edition]) throw new Error(`Unknown edition "${edition}". Use: ${Object.keys(names).join(', ')}`);
const html = path.resolve(here, '..', names[edition] + '.html');
const out = path.resolve(here, '..', names[edition] + (testSeconds ? '.test' : '') + '.mp4');
const CHROME = process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const port = 9300 + Math.floor(Math.random() * 600);
const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'deck-rec-'));

const chrome = spawn(CHROME, [
  `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`, '--headless=new', '--hide-scrollbars', '--mute-audio',
  '--no-first-run', '--no-default-browser-check', '--disable-background-timer-throttling', '--disable-renderer-backgrounding',
  '--disable-backgrounding-occluded-windows', `--window-size=${W},${H}`, 'about:blank',
], { stdio: 'ignore' });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function pageSocket() {
  for (let i = 0; i < 150; i++) {
    try {
      const list = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
      const page = list.find((t) => t.type === 'page');
      if (page) return page.webSocketDebuggerUrl;
    } catch { /* Chrome still starting */ }
    await sleep(200);
  }
  throw new Error('Chrome did not start');
}

let ff;
try {
  const ws = new WebSocket(await pageSocket());
  await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });
  let nextId = 0;
  const pending = new Map(), waiters = [];
  ws.onmessage = (ev) => {
    const m = JSON.parse(ev.data);
    if (m.id) { const p = pending.get(m.id); if (p) { pending.delete(m.id); m.error ? p.rej(new Error(JSON.stringify(m.error))) : p.res(m.result); } }
    else if (m.method) { const i = waiters.findIndex((w) => w.method === m.method); if (i >= 0) waiters.splice(i, 1)[0].res(m.params); }
  };
  const send = (method, params = {}) => new Promise((res, rej) => { const id = ++nextId; const t = setTimeout(() => rej(new Error('Chrome stopped answering: ' + method)), 60000); pending.set(id, { res: (v) => { clearTimeout(t); res(v); }, rej: (e) => { clearTimeout(t); rej(e); } }); ws.send(JSON.stringify({ id, method, params })); });
  const once = (method) => new Promise((res, rej) => { const t = setTimeout(() => rej(new Error('Timed out waiting for ' + method)), 60000); waiters.push({ method, res: (v) => { clearTimeout(t); res(v); } }); });
  const evaluate = async (expression) => (await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true })).result.value;

  await send('Page.enable');
  await send('Runtime.enable');
  await send('Emulation.setDeviceMetricsOverride', { width: W, height: H, deviceScaleFactor: 1, mobile: false });
  const loaded = once('Page.loadEventFired');
  await send('Page.navigate', { url: pathToFileURL(html).href + '?record' });
  await loaded;
  await evaluate('document.fonts.ready.then(() => true)');
  // Freeze the clock only after the page has loaded (a paused clock never finishes loading).
  await send('Emulation.setVirtualTimePolicy', { policy: 'pause' });
  const loopSeconds = await evaluate('window.__loopSeconds');
  if (!loopSeconds) throw new Error('The deck did not report its length');

  const seconds = testSeconds ?? loopSeconds + 0.6;
  const total = Math.round(seconds * FPS);
  const fade = `fade=t=in:st=0:d=0.8,fade=t=out:st=${Math.max(0, seconds - 1.4).toFixed(2)}:d=1.4`;
  ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-',
    '-vf', `${fade},format=yuv420p`, '-c:v', 'libx264', '-preset', 'medium', '-crf', '17', '-movflags', '+faststart', out], { stdio: ['pipe', 'inherit', 'inherit'] });
  const ffDone = new Promise((res, rej) => { ff.on('close', (c) => (c === 0 ? res() : rej(new Error('ffmpeg exited with ' + c)))); });

  console.log(`${edition}: ${total} frames, ${seconds.toFixed(1)} s -> ${path.relative(process.cwd(), out)}`);
  const started = Date.now();
  for (let f = 0; f < total; f++) {
    if (f > 0) {
      const expired = once('Emulation.virtualTimeBudgetExpired');
      await send('Emulation.setVirtualTimePolicy', { policy: 'advance', budget: 1000 / FPS });
      await expired;
    }
    const shot = await send('Page.captureScreenshot', { format: 'jpeg', quality: 92 });
    if (!ff.stdin.write(Buffer.from(shot.data, 'base64'))) await new Promise((r) => ff.stdin.once('drain', r));
    if (f % 150 === 149) {
      const per = (Date.now() - started) / (f + 1);
      console.log(`  ${f + 1}/${total} frames, about ${Math.round((per * (total - f - 1)) / 60000)} min left`);
    }
  }
  ff.stdin.end();
  await ffDone;
  ws.close();
  console.log(`${edition}: done in ${Math.round((Date.now() - started) / 1000)} s`);
} finally {
  chrome.kill();
  try { fs.rmSync(profile, { recursive: true, force: true }); } catch { /* temp folder */ }
}
