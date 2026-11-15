#!/usr/bin/env node
// Original soundtrack for the Dubai film, synthesised from scratch (no samples, no licences).
// 120 BPM, D minor with a Hijaz (Arabic) colour in the breakdown. 46 bars of 2 s = 92 s + tail.
//   node music.mjs            -> music.wav next to this file
// Sections (seconds) match the film's scenes, so cuts land on the downbeat:
//   0 intro · 6 drop · 14 · 22 · 30 breakdown (Hijaz melody) · 38 drop · 46 · 54 · 60 peak · 70 · 78 build · 84 outro
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SR = 44100, BPM = 120, BEAT = 60 / BPM, BAR = BEAT * 4, DUR = 93.5;
const N = Math.ceil(DUR * SR);
const bus = () => ({ L: new Float32Array(N), R: new Float32Array(N) });
const drums = bus(), bass = bus(), pad = bus(), arp = bus(), lead = bus(), fx = bus(), send = bus(), dly = bus();
const duck = new Float32Array(N).fill(1);
const mtof = (m) => 440 * Math.pow(2, (m - 69) / 12);
let seed = 7; const noise = () => { seed = (seed * 16807) % 2147483647; return (seed / 2147483647) * 2 - 1; };
const put = (b, i, l, r) => { if (i >= 0 && i < N) { b.L[i] += l; b.R[i] += r; } };
const S = (t) => Math.round(t * SR);

function biquad(type, f, q) {
  const o = { x1: 0, x2: 0, y1: 0, y2: 0 };
  o.set = (fr, qq = q) => {
    const w = (2 * Math.PI * Math.min(fr, SR * 0.45)) / SR, c = Math.cos(w), s = Math.sin(w), a = s / (2 * qq);
    let b0, b1, b2; if (type === 'lp') { b0 = (1 - c) / 2; b1 = 1 - c; b2 = (1 - c) / 2; } else if (type === 'hp') { b0 = (1 + c) / 2; b1 = -(1 + c); b2 = (1 + c) / 2; } else { b0 = a; b1 = 0; b2 = -a; }
    const a0 = 1 + a; Object.assign(o, { b0: b0 / a0, b1: b1 / a0, b2: b2 / a0, a1: (-2 * c) / a0, a2: (1 - a) / a0 });
  };
  o.run = (x) => { const y = o.b0 * x + o.b1 * o.x1 + o.b2 * o.x2 - o.a1 * o.y1 - o.a2 * o.y2; o.x2 = o.x1; o.x1 = x; o.y2 = o.y1; o.y1 = y; return y; };
  o.set(f, q); return o;
}
const saw = (ph) => 2 * (ph - Math.floor(ph + 0.5));

/* ---------------- instruments ---------------- */
function kick(t0, g = 0.95) {
  const i0 = S(t0); let ph = 0;
  for (let k = 0; k < S(0.5); k++) {
    const t = k / SR, f = 46 + 90 * Math.exp(-t * 30); ph += f / SR;
    const s = Math.sin(2 * Math.PI * ph) * Math.exp(-t * 6.5) + noise() * Math.exp(-t * 350) * 0.25;
    put(drums, i0 + k, s * g, s * g);
    if (i0 + k < N) duck[i0 + k] = Math.min(duck[i0 + k], 1 - 0.7 * Math.exp(-t * 8));
  }
}
function clap(t0, g = 0.42) {
  const i0 = S(t0), f = biquad('bp', 1300, 0.9);
  for (let k = 0; k < S(0.35); k++) {
    const t = k / SR;
    const env = [0, 0.011, 0.022].reduce((a, d) => a + (t >= d ? Math.exp(-(t - d) * 170) : 0), 0) + (t > 0.03 ? Math.exp(-(t - 0.03) * 20) * 0.8 : 0);
    const s = f.run(noise()) * env * g * 2.2;
    put(drums, i0 + k, s * 0.9, s); put(send, i0 + k, s * 0.35, s * 0.35);
  }
}
function hat(t0, g = 0.16, open = false) {
  const i0 = S(t0), f = biquad('hp', 7500, 0.7), len = open ? 0.32 : 0.07;
  for (let k = 0; k < S(len); k++) { const t = k / SR, s = f.run(noise()) * Math.exp(-t * (open ? 13 : 70)) * g; put(drums, i0 + k, s * 0.75, s); }
}
function bassNote(t0, dur, m, g = 0.32) {
  const i0 = S(t0), f = biquad('lp', 400, 1.1), fr = mtof(m); let ph = 0, ph2 = 0;
  for (let k = 0; k < S(dur + 0.03); k++) {
    const t = k / SR; ph += fr / SR; ph2 += fr / 2 / SR;
    if (k % 32 === 0) f.set(160 + 950 * Math.exp(-t * 11));
    const env = Math.min(1, t / 0.004) * (t > dur ? Math.exp(-(t - dur) * 120) : 1);
    const s = (f.run(saw(ph) * 0.7) + Math.sin(2 * Math.PI * ph2) * 0.55) * env * g;
    put(bass, i0 + k, s, s);
  }
}
function chord(t0, dur, notes, g = 0.075, cutoff = 1500) {
  for (const m of notes) for (const [det, pan] of [[-0.06, 0.25], [0.06, 0.75]]) {
    const i0 = S(t0), f = biquad('lp', cutoff, 0.6), fr = mtof(m + det); let ph = Math.random();
    const total = dur + 1.0;
    for (let k = 0; k < S(total); k++) {
      const t = k / SR; ph += fr / SR;
      const env = Math.min(1, t / 0.45) * (t > dur ? Math.exp(-(t - dur) * 3.2) : 1);
      const s = f.run(saw(ph)) * env * g;
      put(pad, i0 + k, s * (1 - pan) * 1.4, s * pan * 1.4); put(send, i0 + k, s * 0.5, s * 0.5);
    }
  }
}
function pluck(t0, m, g = 0.13, pan = 0.5) {
  const i0 = S(t0), f = biquad('lp', 3000, 1.2), fr = mtof(m); let a = 0, b = 0.37;
  for (let k = 0; k < S(0.55); k++) {
    const t = k / SR; a += fr / SR; b += (fr * 1.006) / SR;
    if (k % 32 === 0) f.set(350 + 4200 * Math.exp(-t * 16));
    const s = f.run(saw(a) + saw(b) * 0.6) * Math.exp(-t * 7) * g;
    put(arp, i0 + k, s * (1 - pan) * 1.4, s * pan * 1.4); put(dly, i0 + k, s, s); put(send, i0 + k, s * 0.3, s * 0.3);
  }
}
function leadNote(t0, dur, m, g = 0.12) {
  const i0 = S(t0), fr = mtof(m), f = biquad('lp', 2600, 0.8); let ph = 0, ph2 = 0;
  for (let k = 0; k < S(dur + 0.35); k++) {
    const t = k / SR, vib = t > 0.18 ? 1 + 0.006 * Math.sin(2 * Math.PI * 5.4 * t) : 1;
    ph += (fr * vib) / SR; ph2 += (fr * 2 * vib) / SR;
    const env = Math.min(1, t / 0.035) * (t > dur ? Math.exp(-(t - dur) * 9) : 1);
    const s = f.run(Math.sin(2 * Math.PI * ph) * 0.8 + saw(ph) * 0.25 + Math.sin(2 * Math.PI * ph2) * 0.15) * env * g;
    put(lead, i0 + k, s * 0.9, s); put(send, i0 + k, s * 0.55, s * 0.55); put(dly, i0 + k, s * 0.6, s * 0.6);
  }
}
function riser(t0, t1, g = 0.16) {
  const i0 = S(t0), len = S(t1 - t0), f = biquad('bp', 300, 2.5); let ph = 0;
  for (let k = 0; k < len; k++) {
    const p = k / len; if (k % 64 === 0) f.set(250 * Math.pow(30, p), 2.5);
    ph += (180 * Math.pow(6, p)) / SR;
    const s = (f.run(noise()) * 1.6 + Math.sin(2 * Math.PI * ph) * 0.25) * p * p * g;
    put(fx, i0 + k, s * 0.8, s); put(send, i0 + k, s * 0.4, s * 0.4);
  }
}
function impact(t0, g = 0.9) {
  const i0 = S(t0), f = biquad('lp', 900, 0.7); let ph = 0;
  for (let k = 0; k < S(2.2); k++) {
    const t = k / SR, fr = 38 + 60 * Math.exp(-t * 12); ph += fr / SR;
    const s = Math.sin(2 * Math.PI * ph) * Math.exp(-t * 2.4) * g + f.run(noise()) * Math.exp(-t * 5) * 0.35 * g;
    put(fx, i0 + k, s, s); put(send, i0 + k, s * 0.5, s * 0.5);
    if (i0 + k < N) duck[i0 + k] = Math.min(duck[i0 + k], 1 - 0.6 * Math.exp(-t * 3));
  }
}
function whoosh(tEnd, g = 0.09) {
  const len = S(0.6), i0 = S(tEnd) - len, f = biquad('bp', 500, 1.5);
  for (let k = 0; k < len; k++) {
    const p = k / len; if (k % 64 === 0) f.set(400 + 5000 * p * p, 1.5);
    const s = f.run(noise()) * Math.sin(Math.PI * p) * g * 2;
    const pan = p; put(fx, i0 + k, s * (1 - pan), s * pan); put(send, i0 + k, s * 0.3, s * 0.3);
  }
}

/* ---------------- arrangement ---------------- */
const MAIN = [ // pad voicing, bass root, arp notes (8 eighths)
  { pad: [50, 53, 57, 62], root: 38, arp: [62, 65, 69, 74, 69, 65, 69, 72] },        // Dm
  { pad: [46, 50, 53, 58], root: 34, arp: [58, 62, 65, 70, 65, 62, 65, 69] },        // Bb
  { pad: [43, 50, 55, 58], root: 31, arp: [55, 58, 62, 67, 62, 58, 62, 65] },        // Gm
  { pad: [45, 49, 52, 57], root: 33, arp: [57, 61, 64, 69, 70, 69, 61, 58] },        // A (Bb–C# colour)
];
const HIJAZ = [ // breakdown: D – Gm – Eb – D, Hijaz scale D Eb F# G A Bb C
  { pad: [50, 54, 57, 62], root: 38, arp: [62, 66, 69, 74, 69, 66, 69, 72] },
  { pad: [43, 50, 55, 58], root: 31, arp: [55, 58, 62, 67, 62, 58, 62, 66] },
  { pad: [51, 55, 58, 63], root: 39, arp: [63, 67, 70, 75, 70, 67, 70, 74] },
  { pad: [50, 54, 57, 62], root: 38, arp: [62, 66, 69, 74, 75, 74, 66, 63] },
];
const MELODY = [ // [beat offset from 30 s, beats, midi]
  [0, 1, 69], [1, 0.5, 70], [1.5, 0.5, 69], [2, 1, 67], [3, 1, 66],
  [4, 1.5, 67], [5.5, 0.5, 69], [6, 2, 70],
  [8, 1, 74], [9, 0.5, 72], [9.5, 0.5, 70], [10, 1, 69], [11, 1, 67],
  [12, 1, 66], [13, 1, 63], [14, 2, 62],
];
const has = (b, ...ranges) => ranges.some(([a, z]) => b >= a && b <= z);

for (let b = 0; b < 46; b++) {
  const t = b * BAR, hij = has(b, [15, 18]), ch = hij ? HIJAZ[(b - 15) % 4] : MAIN[b % 4];
  const outro = b >= 42;
  chord(t, BAR, ch.pad, outro ? 0.06 : hij ? 0.085 : 0.07, hij ? 2000 : b < 3 ? 900 + b * 300 : 1500);
  const groove = has(b, [3, 14], [19, 41]);
  for (let q = 0; q < 4; q++) {
    const bt = t + q * BEAT;
    if (groove && !has(b, [35, 36])) kick(bt);
    if (groove && has(b, [35, 36]) && q % 2 === 0) kick(bt, 0.8);
    if (has(b, [7, 14], [19, 34], [37, 41]) && (q === 1 || q === 3)) clap(bt);
    if (groove) hat(bt + BEAT / 2, 0.15);
    if (has(b, [23, 34]) && groove) hat(bt + BEAT / 2, 0.07, true);
    if (has(b, [30, 34], [39, 41])) { hat(bt + BEAT / 4, 0.06); hat(bt + (3 * BEAT) / 4, 0.06); }
    if (groove) bassNote(bt + BEAT / 2, BEAT * 0.42, ch.root + 12 * (q === 3 && b % 2 ? 1 : 0));
    if (groove && q === 0) bassNote(bt, BEAT * 0.2, ch.root, 0.2);
  }
  if (has(b, [11, 34])) ch.arp.forEach((m, k) => pluck(t + (k * BEAT) / 2, m + (has(b, [30, 34]) ? 12 : 0), hij ? 0.08 : 0.11, k % 2 ? 0.3 : 0.7));
  if (outro && b < 45) ch.arp.filter((_, k) => k % 2 === 0).forEach((m, k) => pluck(t + k * BEAT, m, 0.09, k % 2 ? 0.35 : 0.65));
  if (hij) { /* sustained low bass under the breakdown */ bassNote(t, BAR * 0.95, ch.root, 0.18); }
  if (has(b, [39, 41])) for (let s16 = 0; s16 < (b === 41 ? 16 : 8); s16++) clap(t + (s16 * BAR) / (b === 41 ? 16 : 8), 0.12 + 0.12 * ((b - 39) * 16 + s16) / 48);
}
MELODY.forEach(([o, d, m]) => leadNote(30 + o * BEAT, d * BEAT * 0.92, m));
riser(1.5, 6, 0.2); riser(34, 38, 0.18); riser(78, 84, 0.2);
impact(6); impact(38, 0.8); impact(84, 1);
[14, 22, 30, 46, 54, 60, 70, 78].forEach((s) => whoosh(s));

/* ---------------- effects and mix ---------------- */
// ping-pong delay (dotted eighth)
{ const d = S(BEAT * 0.75), fb = 0.38; const bl = new Float32Array(N), br = new Float32Array(N);
  for (let i = 0; i < N; i++) { const inL = dly.L[i], inR = dly.R[i]; const pl = i >= d ? br[i - d] : 0, pr = i >= d ? bl[i - d] : 0;
    bl[i] = inR * 0.5 + pr * fb; br[i] = inL * 0.5 + pl * fb; arp.L[i] += bl[i] * 0.45; arp.R[i] += br[i] * 0.45; } }
// Schroeder reverb on the send bus
function reverb(inp, combs, aps) {
  const out = new Float32Array(N);
  const cs = combs.map((len) => ({ buf: new Float32Array(len), i: 0, lp: 0 }));
  const as = aps.map((len) => ({ buf: new Float32Array(len), i: 0 }));
  for (let n = 0; n < N; n++) {
    let s = 0; const x = inp[n] * 0.25;
    for (const c of cs) { const y = c.buf[c.i]; c.lp = y * 0.6 + c.lp * 0.4; c.buf[c.i] = x + c.lp * 0.84; c.i = (c.i + 1) % c.buf.length; s += y; }
    for (const a of as) { const y = a.buf[a.i]; const v = s + y * 0.5; a.buf[a.i] = v; a.i = (a.i + 1) % a.buf.length; s = y - v * 0.5; }
    out[n] = s;
  }
  return out;
}
const wetL = reverb(send.L, [1557, 1617, 1491, 1422, 1277, 1356], [556, 441]);
const wetR = reverb(send.R, [1580, 1640, 1514, 1445, 1300, 1379], [579, 464]);

const outL = new Float32Array(N), outR = new Float32Array(N);
for (let i = 0; i < N; i++) {
  const d = duck[i], t = i / SR;
  let l = drums.L[i] * 0.9 + bass.L[i] * d + pad.L[i] * (0.55 + 0.45 * d) + arp.L[i] * (0.8 + 0.2 * d) + lead.L[i] + fx.L[i] + wetL[i] * 0.55;
  let r = drums.R[i] * 0.9 + bass.R[i] * d + pad.R[i] * (0.55 + 0.45 * d) + arp.R[i] * (0.8 + 0.2 * d) + lead.R[i] + fx.R[i] + wetR[i] * 0.55;
  const fade = Math.min(1, t / 0.02) * (t > DUR - 3.5 ? Math.max(0, (DUR - t) / 3.5) : 1);
  outL[i] = Math.tanh(l * 1.15) * fade; outR[i] = Math.tanh(r * 1.15) * fade;
}
let peak = 0; for (let i = 0; i < N; i++) peak = Math.max(peak, Math.abs(outL[i]), Math.abs(outR[i]));
const gain = 0.89 / peak;

const here = path.dirname(fileURLToPath(import.meta.url));
const buf = Buffer.alloc(44 + N * 4);
buf.write('RIFF', 0); buf.writeUInt32LE(36 + N * 4, 4); buf.write('WAVE', 8); buf.write('fmt ', 12);
buf.writeUInt32LE(16, 16); buf.writeUInt16LE(1, 20); buf.writeUInt16LE(2, 22); buf.writeUInt32LE(SR, 24); buf.writeUInt32LE(SR * 4, 28); buf.writeUInt16LE(4, 32); buf.writeUInt16LE(16, 34);
buf.write('data', 36); buf.writeUInt32LE(N * 4, 40);
for (let i = 0; i < N; i++) { buf.writeInt16LE(Math.round(outL[i] * gain * 32767), 44 + i * 4); buf.writeInt16LE(Math.round(outR[i] * gain * 32767), 46 + i * 4); }
fs.writeFileSync(path.join(here, 'music.wav'), buf);
console.log(`music.wav: ${DUR} s, ${BPM} BPM, peak gain ${gain.toFixed(2)}`);
