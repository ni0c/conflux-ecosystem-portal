import { ar as H, aA as w, av as y, at as m, aw as U, aB as _, au as A, aC as C, aD as x } from "./umd-DIrkvCx7.mjs";
function I(f, t, n, s) {
  if (typeof f.setBigUint64 == "function")
    return f.setBigUint64(t, n, s);
  const i = BigInt(32), o = BigInt(4294967295), e = Number(n >> i & o), h = Number(n & o), a = s ? 4 : 0, r = s ? 0 : 4;
  f.setUint32(t + a, e, s), f.setUint32(t + r, h, s);
}
function D(f, t, n) {
  return f & t ^ ~f & n;
}
function L(f, t, n) {
  return f & t ^ f & n ^ t & n;
}
class E extends H {
  constructor(t, n, s, i) {
    super(), this.finished = !1, this.length = 0, this.pos = 0, this.destroyed = !1, this.blockLen = t, this.outputLen = n, this.padOffset = s, this.isLE = i, this.buffer = new Uint8Array(t), this.view = w(this.buffer);
  }
  update(t) {
    y(this), t = m(t), U(t);
    const { view: n, buffer: s, blockLen: i } = this, o = t.length;
    for (let e = 0; e < o; ) {
      const h = Math.min(i - this.pos, o - e);
      if (h === i) {
        const a = w(t);
        for (; i <= o - e; e += i)
          this.process(a, e);
        continue;
      }
      s.set(t.subarray(e, e + h), this.pos), this.pos += h, e += h, this.pos === i && (this.process(n, 0), this.pos = 0);
    }
    return this.length += t.length, this.roundClean(), this;
  }
  digestInto(t) {
    y(this), _(t, this), this.finished = !0;
    const { buffer: n, view: s, blockLen: i, isLE: o } = this;
    let { pos: e } = this;
    n[e++] = 128, A(this.buffer.subarray(e)), this.padOffset > i - e && (this.process(s, 0), e = 0);
    for (let c = e; c < i; c++)
      n[c] = 0;
    I(s, i - 8, BigInt(this.length * 8), o), this.process(s, 0);
    const h = w(t), a = this.outputLen;
    if (a % 4)
      throw new Error("_sha2: outputLen should be aligned to 32bit");
    const r = a / 4, b = this.get();
    if (r > b.length)
      throw new Error("_sha2: outputLen bigger than state");
    for (let c = 0; c < r; c++)
      h.setUint32(4 * c, b[c], o);
  }
  digest() {
    const { buffer: t, outputLen: n } = this;
    this.digestInto(t);
    const s = t.slice(0, n);
    return this.destroy(), s;
  }
  _cloneInto(t) {
    t || (t = new this.constructor()), t.set(...this.get());
    const { blockLen: n, buffer: s, length: i, finished: o, destroyed: e, pos: h } = this;
    return t.destroyed = e, t.finished = o, t.length = i, t.pos = h, i % n && t.buffer.set(s), t;
  }
  clone() {
    return this._cloneInto();
  }
}
const u = /* @__PURE__ */ Uint32Array.from([
  1779033703,
  3144134277,
  1013904242,
  2773480762,
  1359893119,
  2600822924,
  528734635,
  1541459225
]), F = /* @__PURE__ */ Uint32Array.from([
  1116352408,
  1899447441,
  3049323471,
  3921009573,
  961987163,
  1508970993,
  2453635748,
  2870763221,
  3624381080,
  310598401,
  607225278,
  1426881987,
  1925078388,
  2162078206,
  2614888103,
  3248222580,
  3835390401,
  4022224774,
  264347078,
  604807628,
  770255983,
  1249150122,
  1555081692,
  1996064986,
  2554220882,
  2821834349,
  2952996808,
  3210313671,
  3336571891,
  3584528711,
  113926993,
  338241895,
  666307205,
  773529912,
  1294757372,
  1396182291,
  1695183700,
  1986661051,
  2177026350,
  2456956037,
  2730485921,
  2820302411,
  3259730800,
  3345764771,
  3516065817,
  3600352804,
  4094571909,
  275423344,
  430227734,
  506948616,
  659060556,
  883997877,
  958139571,
  1322822218,
  1537002063,
  1747873779,
  1955562222,
  2024104815,
  2227730452,
  2361852424,
  2428436474,
  2756734187,
  3204031479,
  3329325298
]), d = /* @__PURE__ */ new Uint32Array(64);
class G extends E {
  constructor(t = 32) {
    super(64, t, 8, !1), this.A = u[0] | 0, this.B = u[1] | 0, this.C = u[2] | 0, this.D = u[3] | 0, this.E = u[4] | 0, this.F = u[5] | 0, this.G = u[6] | 0, this.H = u[7] | 0;
  }
  get() {
    const { A: t, B: n, C: s, D: i, E: o, F: e, G: h, H: a } = this;
    return [t, n, s, i, o, e, h, a];
  }
  // prettier-ignore
  set(t, n, s, i, o, e, h, a) {
    this.A = t | 0, this.B = n | 0, this.C = s | 0, this.D = i | 0, this.E = o | 0, this.F = e | 0, this.G = h | 0, this.H = a | 0;
  }
  process(t, n) {
    for (let c = 0; c < 16; c++, n += 4)
      d[c] = t.getUint32(n, !1);
    for (let c = 16; c < 64; c++) {
      const p = d[c - 15], l = d[c - 2], B = x(p, 7) ^ x(p, 18) ^ p >>> 3, g = x(l, 17) ^ x(l, 19) ^ l >>> 10;
      d[c] = g + d[c - 7] + B + d[c - 16] | 0;
    }
    let { A: s, B: i, C: o, D: e, E: h, F: a, G: r, H: b } = this;
    for (let c = 0; c < 64; c++) {
      const p = x(h, 6) ^ x(h, 11) ^ x(h, 25), l = b + p + D(h, a, r) + F[c] + d[c] | 0, g = (x(s, 2) ^ x(s, 13) ^ x(s, 22)) + L(s, i, o) | 0;
      b = r, r = a, a = h, h = e + l | 0, e = o, o = i, i = s, s = l + g | 0;
    }
    s = s + this.A | 0, i = i + this.B | 0, o = o + this.C | 0, e = e + this.D | 0, h = h + this.E | 0, a = a + this.F | 0, r = r + this.G | 0, b = b + this.H | 0, this.set(s, i, o, e, h, a, r, b);
  }
  roundClean() {
    A(d);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0), A(this.buffer);
  }
}
const S = /* @__PURE__ */ C(() => new G());
export {
  S as s
};
