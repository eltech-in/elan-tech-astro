#!/usr/bin/env node
// Renders film.html frame by frame (exact time per frame) and adds music.wav.
//   node render.mjs video 16x9            -> ../elan-dubai-film-16x9.mp4  (1920x1080, YouTube and website)
//   node render.mjs video 9x16            -> ../elan-dubai-film-9x16.mp4  (1080x1920, Reels, Shorts, Status)
//   node render.mjs video 16x9 20 30      -> a test clip from 20 s to 30 s
//   node render.mjs stills 16x9 3,10,18   -> PNG stills at those times in ./stills/
// Needs Google Chrome and ffmpeg. Run music.mjs first.
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const [mode = 'video', fmt = '16x9', a3, a4] = process.argv.slice(2);
const SIZES = { '16x9': [1920, 1080], '9x16': [1080, 1920] };
if (!SIZES[fmt]) throw new Error('Format must be 16x9 or 9x16');
const [W, H] = SIZES[fmt], FPS = 30;
const here = path.dirname(fileURLToPath(import.meta.url));
const port = 9400 + Math.floor(Math.random() * 400);
const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'film-'));
const chrome = spawn(process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', [
  `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`, '--headless=new', '--hide-scrollbars', '--mute-audio', '--allow-file-access-from-files',
  '--disable-background-timer-throttling', '--disable-renderer-backgrounding', `--window-size=${W},${H}`, 'about:blank',
], { stdio: 'ignore' });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

try {
  let ws;
  for (let i = 0; i < 150 && !ws; i++) { try { const l = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json(); const p = l.find((x) => x.type === 'page'); if (p) ws = new WebSocket(p.webSocketDebuggerUrl); } catch { /* starting */ } if (!ws) await sleep(200); }
  await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });
  let id = 0; const pend = new Map(), waits = [];
  ws.onmessage = (e) => { const m = JSON.parse(e.data); if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); } else if (m.method) { const i = waits.findIndex((w) => w.method === m.method); if (i >= 0) waits.splice(i, 1)[0].res(m.params); } };
  const send = (method, params = {}) => new Promise((res, rej) => { const i = ++id; const to = setTimeout(() => rej(new Error('No answer: ' + method)), 60000); pend.set(i, (m) => { clearTimeout(to); m.error ? rej(new Error(JSON.stringify(m.error))) : res(m.result); }); ws.send(JSON.stringify({ id: i, method, params })); });
  const once = (method) => new Promise((res) => waits.push({ method, res }));
  const ev = async (expression) => { const r = await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true }); if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description || r.exceptionDetails.text); return r.result.value; };

  await send('Page.enable'); await send('Runtime.enable');
  await send('Emulation.setDeviceMetricsOverride', { width: W, height: H, deviceScaleFactor: 1, mobile: false });
  const loaded = once('Page.loadEventFired');
  await send('Page.navigate', { url: pathToFileURL(path.join(here, 'film.html')).href + `?w=${W}&h=${H}` });
  await loaded; await ev('window.__ready');
  const DUR = await ev('window.__duration');
  const frame = async (t) => { await ev(`(window.__render(${t}), new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))))`); return (await send('Page.captureScreenshot', { format: mode === 'stills' ? 'png' : 'jpeg', quality: 93 })).data; };

  if (mode === 'stills') {
    const dir = path.join(here, 'stills'); fs.mkdirSync(dir, { recursive: true });
    for (const t of (a3 || '3').split(',').map(Number)) { fs.writeFileSync(path.join(dir, `${fmt}-${String(t).replace('.', '_')}.png`), Buffer.from(await frame(t), 'base64')); }
    console.log('stills written to', path.relative(process.cwd(), dir));
  } else {
    const t0 = a3 ? +a3 : 0, t1 = a4 ? +a4 : DUR, test = a3 != null;
    const out = path.resolve(here, '..', `elan-dubai-film-${fmt}${test ? '.test' : ''}.mp4`);
    const total = Math.round((t1 - t0) * FPS);
    const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-',
      '-ss', String(t0), '-t', String(t1 - t0), '-i', path.join(here, 'music.wav'),
      '-map', '0:v', '-map', '1:a', '-c:v', 'libx264', '-preset', 'medium', '-crf', '17', '-pix_fmt', 'yuv420p', '-r', String(FPS),
      '-c:a', 'aac', '-b:a', '256k', '-shortest', '-movflags', '+faststart', out], { stdio: ['pipe', 'inherit', 'inherit'] });
    const done = new Promise((res, rej) => ff.on('close', (c) => (c === 0 ? res() : rej(new Error('ffmpeg exited ' + c)))));
    console.log(`${fmt}: ${total} frames (${(t1 - t0).toFixed(1)} s) -> ${path.relative(process.cwd(), out)}`);
    const started = Date.now();
    for (let f = 0; f < total; f++) {
      const buf = Buffer.from(await frame(t0 + f / FPS), 'base64');
      if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once('drain', r));
      if (f % 300 === 299) console.log(`  ${f + 1}/${total}, about ${Math.round(((Date.now() - started) / (f + 1)) * (total - f - 1) / 60000)} min left`);
    }
    ff.stdin.end(); await done;
    console.log(`${fmt}: done in ${Math.round((Date.now() - started) / 1000)} s`);
  }
  ws.close();
} finally {
  chrome.kill();
  try { fs.rmSync(profile, { recursive: true, force: true }); } catch { /* temp */ }
}
