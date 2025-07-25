import { al as Q, q as kt, w as zt, r as $t, x as Y } from "./umd-DIrkvCx7.mjs";
import { n as v, c as Ot } from "./if-defined-BeJkmk4s.mjs";
import "./index-DBdqi8i8.mjs";
var K = {}, Vt = function() {
  return typeof Promise == "function" && Promise.prototype && Promise.prototype.then;
}, Bt = {}, b = {};
let ht;
const Ht = [
  0,
  // Not used
  26,
  44,
  70,
  100,
  134,
  172,
  196,
  242,
  292,
  346,
  404,
  466,
  532,
  581,
  655,
  733,
  815,
  901,
  991,
  1085,
  1156,
  1258,
  1364,
  1474,
  1588,
  1706,
  1828,
  1921,
  2051,
  2185,
  2323,
  2465,
  2611,
  2761,
  2876,
  3034,
  3196,
  3362,
  3532,
  3706
];
b.getSymbolSize = function(t) {
  if (!t) throw new Error('"version" cannot be null or undefined');
  if (t < 1 || t > 40) throw new Error('"version" should be in range from 1 to 40');
  return t * 4 + 17;
};
b.getSymbolTotalCodewords = function(t) {
  return Ht[t];
};
b.getBCHDigit = function(e) {
  let t = 0;
  for (; e !== 0; )
    t++, e >>>= 1;
  return t;
};
b.setToSJISFunction = function(t) {
  if (typeof t != "function")
    throw new Error('"toSJISFunc" is not a valid function.');
  ht = t;
};
b.isKanjiModeEnabled = function() {
  return typeof ht < "u";
};
b.toSJIS = function(t) {
  return ht(t);
};
var x = {};
(function(e) {
  e.L = { bit: 1 }, e.M = { bit: 0 }, e.Q = { bit: 3 }, e.H = { bit: 2 };
  function t(i) {
    if (typeof i != "string")
      throw new Error("Param is not a string");
    switch (i.toLowerCase()) {
      case "l":
      case "low":
        return e.L;
      case "m":
      case "medium":
        return e.M;
      case "q":
      case "quartile":
        return e.Q;
      case "h":
      case "high":
        return e.H;
      default:
        throw new Error("Unknown EC Level: " + i);
    }
  }
  e.isValid = function(o) {
    return o && typeof o.bit < "u" && o.bit >= 0 && o.bit < 4;
  }, e.from = function(o, r) {
    if (e.isValid(o))
      return o;
    try {
      return t(o);
    } catch {
      return r;
    }
  };
})(x);
function At() {
  this.buffer = [], this.length = 0;
}
At.prototype = {
  get: function(e) {
    const t = Math.floor(e / 8);
    return (this.buffer[t] >>> 7 - e % 8 & 1) === 1;
  },
  put: function(e, t) {
    for (let i = 0; i < t; i++)
      this.putBit((e >>> t - i - 1 & 1) === 1);
  },
  getLengthInBits: function() {
    return this.length;
  },
  putBit: function(e) {
    const t = Math.floor(this.length / 8);
    this.buffer.length <= t && this.buffer.push(0), e && (this.buffer[t] |= 128 >>> this.length % 8), this.length++;
  }
};
var Kt = At;
function J(e) {
  if (!e || e < 1)
    throw new Error("BitMatrix size must be defined and greater than 0");
  this.size = e, this.data = new Uint8Array(e * e), this.reservedBit = new Uint8Array(e * e);
}
J.prototype.set = function(e, t, i, o) {
  const r = e * this.size + t;
  this.data[r] = i, o && (this.reservedBit[r] = !0);
};
J.prototype.get = function(e, t) {
  return this.data[e * this.size + t];
};
J.prototype.xor = function(e, t, i) {
  this.data[e * this.size + t] ^= i;
};
J.prototype.isReserved = function(e, t) {
  return this.reservedBit[e * this.size + t];
};
var Jt = J, It = {};
(function(e) {
  const t = b.getSymbolSize;
  e.getRowColCoords = function(o) {
    if (o === 1) return [];
    const r = Math.floor(o / 7) + 2, n = t(o), s = n === 145 ? 26 : Math.ceil((n - 13) / (2 * r - 2)) * 2, u = [n - 7];
    for (let a = 1; a < r - 1; a++)
      u[a] = u[a - 1] - s;
    return u.push(6), u.reverse();
  }, e.getPositions = function(o) {
    const r = [], n = e.getRowColCoords(o), s = n.length;
    for (let u = 0; u < s; u++)
      for (let a = 0; a < s; a++)
        u === 0 && a === 0 || // top-left
        u === 0 && a === s - 1 || // bottom-left
        u === s - 1 && a === 0 || r.push([n[u], n[a]]);
    return r;
  };
})(It);
var bt = {};
const Yt = b.getSymbolSize, pt = 7;
bt.getPositions = function(t) {
  const i = Yt(t);
  return [
    // top-left
    [0, 0],
    // top-right
    [i - pt, 0],
    // bottom-left
    [0, i - pt]
  ];
};
var Nt = {};
(function(e) {
  e.Patterns = {
    PATTERN000: 0,
    PATTERN001: 1,
    PATTERN010: 2,
    PATTERN011: 3,
    PATTERN100: 4,
    PATTERN101: 5,
    PATTERN110: 6,
    PATTERN111: 7
  };
  const t = {
    N1: 3,
    N2: 3,
    N3: 40,
    N4: 10
  };
  e.isValid = function(r) {
    return r != null && r !== "" && !isNaN(r) && r >= 0 && r <= 7;
  }, e.from = function(r) {
    return e.isValid(r) ? parseInt(r, 10) : void 0;
  }, e.getPenaltyN1 = function(r) {
    const n = r.size;
    let s = 0, u = 0, a = 0, d = null, g = null;
    for (let B = 0; B < n; B++) {
      u = a = 0, d = g = null;
      for (let y = 0; y < n; y++) {
        let w = r.get(B, y);
        w === d ? u++ : (u >= 5 && (s += t.N1 + (u - 5)), d = w, u = 1), w = r.get(y, B), w === g ? a++ : (a >= 5 && (s += t.N1 + (a - 5)), g = w, a = 1);
      }
      u >= 5 && (s += t.N1 + (u - 5)), a >= 5 && (s += t.N1 + (a - 5));
    }
    return s;
  }, e.getPenaltyN2 = function(r) {
    const n = r.size;
    let s = 0;
    for (let u = 0; u < n - 1; u++)
      for (let a = 0; a < n - 1; a++) {
        const d = r.get(u, a) + r.get(u, a + 1) + r.get(u + 1, a) + r.get(u + 1, a + 1);
        (d === 4 || d === 0) && s++;
      }
    return s * t.N2;
  }, e.getPenaltyN3 = function(r) {
    const n = r.size;
    let s = 0, u = 0, a = 0;
    for (let d = 0; d < n; d++) {
      u = a = 0;
      for (let g = 0; g < n; g++)
        u = u << 1 & 2047 | r.get(d, g), g >= 10 && (u === 1488 || u === 93) && s++, a = a << 1 & 2047 | r.get(g, d), g >= 10 && (a === 1488 || a === 93) && s++;
    }
    return s * t.N3;
  }, e.getPenaltyN4 = function(r) {
    let n = 0;
    const s = r.data.length;
    for (let a = 0; a < s; a++) n += r.data[a];
    return Math.abs(Math.ceil(n * 100 / s / 5) - 10) * t.N4;
  };
  function i(o, r, n) {
    switch (o) {
      case e.Patterns.PATTERN000:
        return (r + n) % 2 === 0;
      case e.Patterns.PATTERN001:
        return r % 2 === 0;
      case e.Patterns.PATTERN010:
        return n % 3 === 0;
      case e.Patterns.PATTERN011:
        return (r + n) % 3 === 0;
      case e.Patterns.PATTERN100:
        return (Math.floor(r / 2) + Math.floor(n / 3)) % 2 === 0;
      case e.Patterns.PATTERN101:
        return r * n % 2 + r * n % 3 === 0;
      case e.Patterns.PATTERN110:
        return (r * n % 2 + r * n % 3) % 2 === 0;
      case e.Patterns.PATTERN111:
        return (r * n % 3 + (r + n) % 2) % 2 === 0;
      default:
        throw new Error("bad maskPattern:" + o);
    }
  }
  e.applyMask = function(r, n) {
    const s = n.size;
    for (let u = 0; u < s; u++)
      for (let a = 0; a < s; a++)
        n.isReserved(a, u) || n.xor(a, u, i(r, a, u));
  }, e.getBestMask = function(r, n) {
    const s = Object.keys(e.Patterns).length;
    let u = 0, a = 1 / 0;
    for (let d = 0; d < s; d++) {
      n(d), e.applyMask(d, r);
      const g = e.getPenaltyN1(r) + e.getPenaltyN2(r) + e.getPenaltyN3(r) + e.getPenaltyN4(r);
      e.applyMask(d, r), g < a && (a = g, u = d);
    }
    return u;
  };
})(Nt);
var X = {};
const D = x, j = [
  // L  M  Q  H
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  2,
  2,
  1,
  2,
  2,
  4,
  1,
  2,
  4,
  4,
  2,
  4,
  4,
  4,
  2,
  4,
  6,
  5,
  2,
  4,
  6,
  6,
  2,
  5,
  8,
  8,
  4,
  5,
  8,
  8,
  4,
  5,
  8,
  11,
  4,
  8,
  10,
  11,
  4,
  9,
  12,
  16,
  4,
  9,
  16,
  16,
  6,
  10,
  12,
  18,
  6,
  10,
  17,
  16,
  6,
  11,
  16,
  19,
  6,
  13,
  18,
  21,
  7,
  14,
  21,
  25,
  8,
  16,
  20,
  25,
  8,
  17,
  23,
  25,
  9,
  17,
  23,
  34,
  9,
  18,
  25,
  30,
  10,
  20,
  27,
  32,
  12,
  21,
  29,
  35,
  12,
  23,
  34,
  37,
  12,
  25,
  34,
  40,
  13,
  26,
  35,
  42,
  14,
  28,
  38,
  45,
  15,
  29,
  40,
  48,
  16,
  31,
  43,
  51,
  17,
  33,
  45,
  54,
  18,
  35,
  48,
  57,
  19,
  37,
  51,
  60,
  19,
  38,
  53,
  63,
  20,
  40,
  56,
  66,
  21,
  43,
  59,
  70,
  22,
  45,
  62,
  74,
  24,
  47,
  65,
  77,
  25,
  49,
  68,
  81
], G = [
  // L  M  Q  H
  7,
  10,
  13,
  17,
  10,
  16,
  22,
  28,
  15,
  26,
  36,
  44,
  20,
  36,
  52,
  64,
  26,
  48,
  72,
  88,
  36,
  64,
  96,
  112,
  40,
  72,
  108,
  130,
  48,
  88,
  132,
  156,
  60,
  110,
  160,
  192,
  72,
  130,
  192,
  224,
  80,
  150,
  224,
  264,
  96,
  176,
  260,
  308,
  104,
  198,
  288,
  352,
  120,
  216,
  320,
  384,
  132,
  240,
  360,
  432,
  144,
  280,
  408,
  480,
  168,
  308,
  448,
  532,
  180,
  338,
  504,
  588,
  196,
  364,
  546,
  650,
  224,
  416,
  600,
  700,
  224,
  442,
  644,
  750,
  252,
  476,
  690,
  816,
  270,
  504,
  750,
  900,
  300,
  560,
  810,
  960,
  312,
  588,
  870,
  1050,
  336,
  644,
  952,
  1110,
  360,
  700,
  1020,
  1200,
  390,
  728,
  1050,
  1260,
  420,
  784,
  1140,
  1350,
  450,
  812,
  1200,
  1440,
  480,
  868,
  1290,
  1530,
  510,
  924,
  1350,
  1620,
  540,
  980,
  1440,
  1710,
  570,
  1036,
  1530,
  1800,
  570,
  1064,
  1590,
  1890,
  600,
  1120,
  1680,
  1980,
  630,
  1204,
  1770,
  2100,
  660,
  1260,
  1860,
  2220,
  720,
  1316,
  1950,
  2310,
  750,
  1372,
  2040,
  2430
];
X.getBlocksCount = function(t, i) {
  switch (i) {
    case D.L:
      return j[(t - 1) * 4 + 0];
    case D.M:
      return j[(t - 1) * 4 + 1];
    case D.Q:
      return j[(t - 1) * 4 + 2];
    case D.H:
      return j[(t - 1) * 4 + 3];
    default:
      return;
  }
};
X.getTotalCodewordsCount = function(t, i) {
  switch (i) {
    case D.L:
      return G[(t - 1) * 4 + 0];
    case D.M:
      return G[(t - 1) * 4 + 1];
    case D.Q:
      return G[(t - 1) * 4 + 2];
    case D.H:
      return G[(t - 1) * 4 + 3];
    default:
      return;
  }
};
var Tt = {}, Z = {};
const V = new Uint8Array(512), q = new Uint8Array(256);
(function() {
  let t = 1;
  for (let i = 0; i < 255; i++)
    V[i] = t, q[t] = i, t <<= 1, t & 256 && (t ^= 285);
  for (let i = 255; i < 512; i++)
    V[i] = V[i - 255];
})();
Z.log = function(t) {
  if (t < 1) throw new Error("log(" + t + ")");
  return q[t];
};
Z.exp = function(t) {
  return V[t];
};
Z.mul = function(t, i) {
  return t === 0 || i === 0 ? 0 : V[q[t] + q[i]];
};
(function(e) {
  const t = Z;
  e.mul = function(o, r) {
    const n = new Uint8Array(o.length + r.length - 1);
    for (let s = 0; s < o.length; s++)
      for (let u = 0; u < r.length; u++)
        n[s + u] ^= t.mul(o[s], r[u]);
    return n;
  }, e.mod = function(o, r) {
    let n = new Uint8Array(o);
    for (; n.length - r.length >= 0; ) {
      const s = n[0];
      for (let a = 0; a < r.length; a++)
        n[a] ^= t.mul(r[a], s);
      let u = 0;
      for (; u < n.length && n[u] === 0; ) u++;
      n = n.slice(u);
    }
    return n;
  }, e.generateECPolynomial = function(o) {
    let r = new Uint8Array([1]);
    for (let n = 0; n < o; n++)
      r = e.mul(r, new Uint8Array([1, t.exp(n)]));
    return r;
  };
})(Tt);
const St = Tt;
function dt(e) {
  this.genPoly = void 0, this.degree = e, this.degree && this.initialize(this.degree);
}
dt.prototype.initialize = function(t) {
  this.degree = t, this.genPoly = St.generateECPolynomial(this.degree);
};
dt.prototype.encode = function(t) {
  if (!this.genPoly)
    throw new Error("Encoder not initialized");
  const i = new Uint8Array(t.length + this.degree);
  i.set(t);
  const o = St.mod(i, this.genPoly), r = this.degree - o.length;
  if (r > 0) {
    const n = new Uint8Array(this.degree);
    return n.set(o, r), n;
  }
  return o;
};
var jt = dt, Mt = {}, U = {}, gt = {};
gt.isValid = function(t) {
  return !isNaN(t) && t >= 1 && t <= 40;
};
var M = {};
const Rt = "[0-9]+", Gt = "[A-Z $%*+\\-./:]+";
let H = "(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";
H = H.replace(/u/g, "\\u");
const Qt = "(?:(?![A-Z0-9 $%*+\\-./:]|" + H + `)(?:.|[\r
]))+`;
M.KANJI = new RegExp(H, "g");
M.BYTE_KANJI = new RegExp("[^A-Z0-9 $%*+\\-./:]+", "g");
M.BYTE = new RegExp(Qt, "g");
M.NUMERIC = new RegExp(Rt, "g");
M.ALPHANUMERIC = new RegExp(Gt, "g");
const qt = new RegExp("^" + H + "$"), Wt = new RegExp("^" + Rt + "$"), xt = new RegExp("^[A-Z0-9 $%*+\\-./:]+$");
M.testKanji = function(t) {
  return qt.test(t);
};
M.testNumeric = function(t) {
  return Wt.test(t);
};
M.testAlphanumeric = function(t) {
  return xt.test(t);
};
(function(e) {
  const t = gt, i = M;
  e.NUMERIC = {
    id: "Numeric",
    bit: 1,
    ccBits: [10, 12, 14]
  }, e.ALPHANUMERIC = {
    id: "Alphanumeric",
    bit: 2,
    ccBits: [9, 11, 13]
  }, e.BYTE = {
    id: "Byte",
    bit: 4,
    ccBits: [8, 16, 16]
  }, e.KANJI = {
    id: "Kanji",
    bit: 8,
    ccBits: [8, 10, 12]
  }, e.MIXED = {
    bit: -1
  }, e.getCharCountIndicator = function(n, s) {
    if (!n.ccBits) throw new Error("Invalid mode: " + n);
    if (!t.isValid(s))
      throw new Error("Invalid version: " + s);
    return s >= 1 && s < 10 ? n.ccBits[0] : s < 27 ? n.ccBits[1] : n.ccBits[2];
  }, e.getBestModeForData = function(n) {
    return i.testNumeric(n) ? e.NUMERIC : i.testAlphanumeric(n) ? e.ALPHANUMERIC : i.testKanji(n) ? e.KANJI : e.BYTE;
  }, e.toString = function(n) {
    if (n && n.id) return n.id;
    throw new Error("Invalid mode");
  }, e.isValid = function(n) {
    return n && n.bit && n.ccBits;
  };
  function o(r) {
    if (typeof r != "string")
      throw new Error("Param is not a string");
    switch (r.toLowerCase()) {
      case "numeric":
        return e.NUMERIC;
      case "alphanumeric":
        return e.ALPHANUMERIC;
      case "kanji":
        return e.KANJI;
      case "byte":
        return e.BYTE;
      default:
        throw new Error("Unknown mode: " + r);
    }
  }
  e.from = function(n, s) {
    if (e.isValid(n))
      return n;
    try {
      return o(n);
    } catch {
      return s;
    }
  };
})(U);
(function(e) {
  const t = b, i = X, o = x, r = U, n = gt, s = 7973, u = t.getBCHDigit(s);
  function a(y, w, E) {
    for (let m = 1; m <= 40; m++)
      if (w <= e.getCapacity(m, E, y))
        return m;
  }
  function d(y, w) {
    return r.getCharCountIndicator(y, w) + 4;
  }
  function g(y, w) {
    let E = 0;
    return y.forEach(function(m) {
      const p = d(m.mode, w);
      E += p + m.getBitsLength();
    }), E;
  }
  function B(y, w) {
    for (let E = 1; E <= 40; E++)
      if (g(y, E) <= e.getCapacity(E, w, r.MIXED))
        return E;
  }
  e.from = function(w, E) {
    return n.isValid(w) ? parseInt(w, 10) : E;
  }, e.getCapacity = function(w, E, m) {
    if (!n.isValid(w))
      throw new Error("Invalid QR Code version");
    typeof m > "u" && (m = r.BYTE);
    const p = t.getSymbolTotalCodewords(w), f = i.getTotalCodewordsCount(w, E), l = (p - f) * 8;
    if (m === r.MIXED) return l;
    const h = l - d(m, w);
    switch (m) {
      case r.NUMERIC:
        return Math.floor(h / 10 * 3);
      case r.ALPHANUMERIC:
        return Math.floor(h / 11 * 2);
      case r.KANJI:
        return Math.floor(h / 13);
      case r.BYTE:
      default:
        return Math.floor(h / 8);
    }
  }, e.getBestVersionForData = function(w, E) {
    let m;
    const p = o.from(E, o.M);
    if (Array.isArray(w)) {
      if (w.length > 1)
        return B(w, p);
      if (w.length === 0)
        return 1;
      m = w[0];
    } else
      m = w;
    return a(m.mode, m.getLength(), p);
  }, e.getEncodedBits = function(w) {
    if (!n.isValid(w) || w < 7)
      throw new Error("Invalid QR Code version");
    let E = w << 12;
    for (; t.getBCHDigit(E) - u >= 0; )
      E ^= s << t.getBCHDigit(E) - u;
    return w << 12 | E;
  };
})(Mt);
var Pt = {};
const ut = b, Lt = 1335, Xt = 21522, yt = ut.getBCHDigit(Lt);
Pt.getEncodedBits = function(t, i) {
  const o = t.bit << 3 | i;
  let r = o << 10;
  for (; ut.getBCHDigit(r) - yt >= 0; )
    r ^= Lt << ut.getBCHDigit(r) - yt;
  return (o << 10 | r) ^ Xt;
};
var _t = {};
const Zt = U;
function F(e) {
  this.mode = Zt.NUMERIC, this.data = e.toString();
}
F.getBitsLength = function(t) {
  return 10 * Math.floor(t / 3) + (t % 3 ? t % 3 * 3 + 1 : 0);
};
F.prototype.getLength = function() {
  return this.data.length;
};
F.prototype.getBitsLength = function() {
  return F.getBitsLength(this.data.length);
};
F.prototype.write = function(t) {
  let i, o, r;
  for (i = 0; i + 3 <= this.data.length; i += 3)
    o = this.data.substr(i, 3), r = parseInt(o, 10), t.put(r, 10);
  const n = this.data.length - i;
  n > 0 && (o = this.data.substr(i), r = parseInt(o, 10), t.put(r, n * 3 + 1));
};
var te = F;
const ee = U, nt = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  " ",
  "$",
  "%",
  "*",
  "+",
  "-",
  ".",
  "/",
  ":"
];
function k(e) {
  this.mode = ee.ALPHANUMERIC, this.data = e;
}
k.getBitsLength = function(t) {
  return 11 * Math.floor(t / 2) + 6 * (t % 2);
};
k.prototype.getLength = function() {
  return this.data.length;
};
k.prototype.getBitsLength = function() {
  return k.getBitsLength(this.data.length);
};
k.prototype.write = function(t) {
  let i;
  for (i = 0; i + 2 <= this.data.length; i += 2) {
    let o = nt.indexOf(this.data[i]) * 45;
    o += nt.indexOf(this.data[i + 1]), t.put(o, 11);
  }
  this.data.length % 2 && t.put(nt.indexOf(this.data[i]), 6);
};
var ne = k, re = function(t) {
  for (var i = [], o = t.length, r = 0; r < o; r++) {
    var n = t.charCodeAt(r);
    if (n >= 55296 && n <= 56319 && o > r + 1) {
      var s = t.charCodeAt(r + 1);
      s >= 56320 && s <= 57343 && (n = (n - 55296) * 1024 + s - 56320 + 65536, r += 1);
    }
    if (n < 128) {
      i.push(n);
      continue;
    }
    if (n < 2048) {
      i.push(n >> 6 | 192), i.push(n & 63 | 128);
      continue;
    }
    if (n < 55296 || n >= 57344 && n < 65536) {
      i.push(n >> 12 | 224), i.push(n >> 6 & 63 | 128), i.push(n & 63 | 128);
      continue;
    }
    if (n >= 65536 && n <= 1114111) {
      i.push(n >> 18 | 240), i.push(n >> 12 & 63 | 128), i.push(n >> 6 & 63 | 128), i.push(n & 63 | 128);
      continue;
    }
    i.push(239, 191, 189);
  }
  return new Uint8Array(i).buffer;
};
const oe = re, ie = U;
function z(e) {
  this.mode = ie.BYTE, typeof e == "string" && (e = oe(e)), this.data = new Uint8Array(e);
}
z.getBitsLength = function(t) {
  return t * 8;
};
z.prototype.getLength = function() {
  return this.data.length;
};
z.prototype.getBitsLength = function() {
  return z.getBitsLength(this.data.length);
};
z.prototype.write = function(e) {
  for (let t = 0, i = this.data.length; t < i; t++)
    e.put(this.data[t], 8);
};
var se = z;
const ae = U, ue = b;
function $(e) {
  this.mode = ae.KANJI, this.data = e;
}
$.getBitsLength = function(t) {
  return t * 13;
};
$.prototype.getLength = function() {
  return this.data.length;
};
$.prototype.getBitsLength = function() {
  return $.getBitsLength(this.data.length);
};
$.prototype.write = function(e) {
  let t;
  for (t = 0; t < this.data.length; t++) {
    let i = ue.toSJIS(this.data[t]);
    if (i >= 33088 && i <= 40956)
      i -= 33088;
    else if (i >= 57408 && i <= 60351)
      i -= 49472;
    else
      throw new Error(
        "Invalid SJIS character: " + this.data[t] + `
Make sure your charset is UTF-8`
      );
    i = (i >>> 8 & 255) * 192 + (i & 255), e.put(i, 13);
  }
};
var ce = $, Dt = { exports: {} };
(function(e) {
  var t = {
    single_source_shortest_paths: function(i, o, r) {
      var n = {}, s = {};
      s[o] = 0;
      var u = t.PriorityQueue.make();
      u.push(o, 0);
      for (var a, d, g, B, y, w, E, m, p; !u.empty(); ) {
        a = u.pop(), d = a.value, B = a.cost, y = i[d] || {};
        for (g in y)
          y.hasOwnProperty(g) && (w = y[g], E = B + w, m = s[g], p = typeof s[g] > "u", (p || m > E) && (s[g] = E, u.push(g, E), n[g] = d));
      }
      if (typeof r < "u" && typeof s[r] > "u") {
        var f = ["Could not find a path from ", o, " to ", r, "."].join("");
        throw new Error(f);
      }
      return n;
    },
    extract_shortest_path_from_predecessor_list: function(i, o) {
      for (var r = [], n = o; n; )
        r.push(n), i[n], n = i[n];
      return r.reverse(), r;
    },
    find_path: function(i, o, r) {
      var n = t.single_source_shortest_paths(i, o, r);
      return t.extract_shortest_path_from_predecessor_list(
        n,
        r
      );
    },
    /**
     * A very naive priority queue implementation.
     */
    PriorityQueue: {
      make: function(i) {
        var o = t.PriorityQueue, r = {}, n;
        i = i || {};
        for (n in o)
          o.hasOwnProperty(n) && (r[n] = o[n]);
        return r.queue = [], r.sorter = i.sorter || o.default_sorter, r;
      },
      default_sorter: function(i, o) {
        return i.cost - o.cost;
      },
      /**
       * Add a new item to the queue and ensure the highest priority element
       * is at the front of the queue.
       */
      push: function(i, o) {
        var r = { value: i, cost: o };
        this.queue.push(r), this.queue.sort(this.sorter);
      },
      /**
       * Return the highest priority element in the queue.
       */
      pop: function() {
        return this.queue.shift();
      },
      empty: function() {
        return this.queue.length === 0;
      }
    }
  };
  e.exports = t;
})(Dt);
var le = Dt.exports;
(function(e) {
  const t = U, i = te, o = ne, r = se, n = ce, s = M, u = b, a = le;
  function d(f) {
    return unescape(encodeURIComponent(f)).length;
  }
  function g(f, l, h) {
    const c = [];
    let C;
    for (; (C = f.exec(h)) !== null; )
      c.push({
        data: C[0],
        index: C.index,
        mode: l,
        length: C[0].length
      });
    return c;
  }
  function B(f) {
    const l = g(s.NUMERIC, t.NUMERIC, f), h = g(s.ALPHANUMERIC, t.ALPHANUMERIC, f);
    let c, C;
    return u.isKanjiModeEnabled() ? (c = g(s.BYTE, t.BYTE, f), C = g(s.KANJI, t.KANJI, f)) : (c = g(s.BYTE_KANJI, t.BYTE, f), C = []), l.concat(h, c, C).sort(function(I, N) {
      return I.index - N.index;
    }).map(function(I) {
      return {
        data: I.data,
        mode: I.mode,
        length: I.length
      };
    });
  }
  function y(f, l) {
    switch (l) {
      case t.NUMERIC:
        return i.getBitsLength(f);
      case t.ALPHANUMERIC:
        return o.getBitsLength(f);
      case t.KANJI:
        return n.getBitsLength(f);
      case t.BYTE:
        return r.getBitsLength(f);
    }
  }
  function w(f) {
    return f.reduce(function(l, h) {
      const c = l.length - 1 >= 0 ? l[l.length - 1] : null;
      return c && c.mode === h.mode ? (l[l.length - 1].data += h.data, l) : (l.push(h), l);
    }, []);
  }
  function E(f) {
    const l = [];
    for (let h = 0; h < f.length; h++) {
      const c = f[h];
      switch (c.mode) {
        case t.NUMERIC:
          l.push([
            c,
            { data: c.data, mode: t.ALPHANUMERIC, length: c.length },
            { data: c.data, mode: t.BYTE, length: c.length }
          ]);
          break;
        case t.ALPHANUMERIC:
          l.push([
            c,
            { data: c.data, mode: t.BYTE, length: c.length }
          ]);
          break;
        case t.KANJI:
          l.push([
            c,
            { data: c.data, mode: t.BYTE, length: d(c.data) }
          ]);
          break;
        case t.BYTE:
          l.push([
            { data: c.data, mode: t.BYTE, length: d(c.data) }
          ]);
      }
    }
    return l;
  }
  function m(f, l) {
    const h = {}, c = { start: {} };
    let C = ["start"];
    for (let A = 0; A < f.length; A++) {
      const I = f[A], N = [];
      for (let _ = 0; _ < I.length; _++) {
        const S = I[_], O = "" + A + _;
        N.push(O), h[O] = { node: S, lastCount: 0 }, c[O] = {};
        for (let et = 0; et < C.length; et++) {
          const R = C[et];
          h[R] && h[R].node.mode === S.mode ? (c[R][O] = y(h[R].lastCount + S.length, S.mode) - y(h[R].lastCount, S.mode), h[R].lastCount += S.length) : (h[R] && (h[R].lastCount = S.length), c[R][O] = y(S.length, S.mode) + 4 + t.getCharCountIndicator(S.mode, l));
        }
      }
      C = N;
    }
    for (let A = 0; A < C.length; A++)
      c[C[A]].end = 0;
    return { map: c, table: h };
  }
  function p(f, l) {
    let h;
    const c = t.getBestModeForData(f);
    if (h = t.from(l, c), h !== t.BYTE && h.bit < c.bit)
      throw new Error('"' + f + '" cannot be encoded with mode ' + t.toString(h) + `.
 Suggested mode is: ` + t.toString(c));
    switch (h === t.KANJI && !u.isKanjiModeEnabled() && (h = t.BYTE), h) {
      case t.NUMERIC:
        return new i(f);
      case t.ALPHANUMERIC:
        return new o(f);
      case t.KANJI:
        return new n(f);
      case t.BYTE:
        return new r(f);
    }
  }
  e.fromArray = function(l) {
    return l.reduce(function(h, c) {
      return typeof c == "string" ? h.push(p(c, null)) : c.data && h.push(p(c.data, c.mode)), h;
    }, []);
  }, e.fromString = function(l, h) {
    const c = B(l, u.isKanjiModeEnabled()), C = E(c), A = m(C, h), I = a.find_path(A.map, "start", "end"), N = [];
    for (let _ = 1; _ < I.length - 1; _++)
      N.push(A.table[I[_]].node);
    return e.fromArray(w(N));
  }, e.rawSplit = function(l) {
    return e.fromArray(
      B(l, u.isKanjiModeEnabled())
    );
  };
})(_t);
const tt = b, rt = x, fe = Kt, he = Jt, de = It, ge = bt, ct = Nt, lt = X, me = jt, W = Mt, we = Pt, pe = U, ot = _t;
function ye(e, t) {
  const i = e.size, o = ge.getPositions(t);
  for (let r = 0; r < o.length; r++) {
    const n = o[r][0], s = o[r][1];
    for (let u = -1; u <= 7; u++)
      if (!(n + u <= -1 || i <= n + u))
        for (let a = -1; a <= 7; a++)
          s + a <= -1 || i <= s + a || (u >= 0 && u <= 6 && (a === 0 || a === 6) || a >= 0 && a <= 6 && (u === 0 || u === 6) || u >= 2 && u <= 4 && a >= 2 && a <= 4 ? e.set(n + u, s + a, !0, !0) : e.set(n + u, s + a, !1, !0));
  }
}
function Ee(e) {
  const t = e.size;
  for (let i = 8; i < t - 8; i++) {
    const o = i % 2 === 0;
    e.set(i, 6, o, !0), e.set(6, i, o, !0);
  }
}
function Ce(e, t) {
  const i = de.getPositions(t);
  for (let o = 0; o < i.length; o++) {
    const r = i[o][0], n = i[o][1];
    for (let s = -2; s <= 2; s++)
      for (let u = -2; u <= 2; u++)
        s === -2 || s === 2 || u === -2 || u === 2 || s === 0 && u === 0 ? e.set(r + s, n + u, !0, !0) : e.set(r + s, n + u, !1, !0);
  }
}
function Be(e, t) {
  const i = e.size, o = W.getEncodedBits(t);
  let r, n, s;
  for (let u = 0; u < 18; u++)
    r = Math.floor(u / 3), n = u % 3 + i - 8 - 3, s = (o >> u & 1) === 1, e.set(r, n, s, !0), e.set(n, r, s, !0);
}
function it(e, t, i) {
  const o = e.size, r = we.getEncodedBits(t, i);
  let n, s;
  for (n = 0; n < 15; n++)
    s = (r >> n & 1) === 1, n < 6 ? e.set(n, 8, s, !0) : n < 8 ? e.set(n + 1, 8, s, !0) : e.set(o - 15 + n, 8, s, !0), n < 8 ? e.set(8, o - n - 1, s, !0) : n < 9 ? e.set(8, 15 - n - 1 + 1, s, !0) : e.set(8, 15 - n - 1, s, !0);
  e.set(o - 8, 8, 1, !0);
}
function Ae(e, t) {
  const i = e.size;
  let o = -1, r = i - 1, n = 7, s = 0;
  for (let u = i - 1; u > 0; u -= 2)
    for (u === 6 && u--; ; ) {
      for (let a = 0; a < 2; a++)
        if (!e.isReserved(r, u - a)) {
          let d = !1;
          s < t.length && (d = (t[s] >>> n & 1) === 1), e.set(r, u - a, d), n--, n === -1 && (s++, n = 7);
        }
      if (r += o, r < 0 || i <= r) {
        r -= o, o = -o;
        break;
      }
    }
}
function Ie(e, t, i) {
  const o = new fe();
  i.forEach(function(a) {
    o.put(a.mode.bit, 4), o.put(a.getLength(), pe.getCharCountIndicator(a.mode, e)), a.write(o);
  });
  const r = tt.getSymbolTotalCodewords(e), n = lt.getTotalCodewordsCount(e, t), s = (r - n) * 8;
  for (o.getLengthInBits() + 4 <= s && o.put(0, 4); o.getLengthInBits() % 8 !== 0; )
    o.putBit(0);
  const u = (s - o.getLengthInBits()) / 8;
  for (let a = 0; a < u; a++)
    o.put(a % 2 ? 17 : 236, 8);
  return be(o, e, t);
}
function be(e, t, i) {
  const o = tt.getSymbolTotalCodewords(t), r = lt.getTotalCodewordsCount(t, i), n = o - r, s = lt.getBlocksCount(t, i), u = o % s, a = s - u, d = Math.floor(o / s), g = Math.floor(n / s), B = g + 1, y = d - g, w = new me(y);
  let E = 0;
  const m = new Array(s), p = new Array(s);
  let f = 0;
  const l = new Uint8Array(e.buffer);
  for (let I = 0; I < s; I++) {
    const N = I < a ? g : B;
    m[I] = l.slice(E, E + N), p[I] = w.encode(m[I]), E += N, f = Math.max(f, N);
  }
  const h = new Uint8Array(o);
  let c = 0, C, A;
  for (C = 0; C < f; C++)
    for (A = 0; A < s; A++)
      C < m[A].length && (h[c++] = m[A][C]);
  for (C = 0; C < y; C++)
    for (A = 0; A < s; A++)
      h[c++] = p[A][C];
  return h;
}
function Ne(e, t, i, o) {
  let r;
  if (Array.isArray(e))
    r = ot.fromArray(e);
  else if (typeof e == "string") {
    let d = t;
    if (!d) {
      const g = ot.rawSplit(e);
      d = W.getBestVersionForData(g, i);
    }
    r = ot.fromString(e, d || 40);
  } else
    throw new Error("Invalid data");
  const n = W.getBestVersionForData(r, i);
  if (!n)
    throw new Error("The amount of data is too big to be stored in a QR Code");
  if (!t)
    t = n;
  else if (t < n)
    throw new Error(
      `
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: ` + n + `.
`
    );
  const s = Ie(t, i, r), u = tt.getSymbolSize(t), a = new he(u);
  return ye(a, t), Ee(a), Ce(a, t), it(a, i, 0), t >= 7 && Be(a, t), Ae(a, s), isNaN(o) && (o = ct.getBestMask(
    a,
    it.bind(null, a, i)
  )), ct.applyMask(o, a), it(a, i, o), {
    modules: a,
    version: t,
    errorCorrectionLevel: i,
    maskPattern: o,
    segments: r
  };
}
Bt.create = function(t, i) {
  if (typeof t > "u" || t === "")
    throw new Error("No input text");
  let o = rt.M, r, n;
  return typeof i < "u" && (o = rt.from(i.errorCorrectionLevel, rt.M), r = W.from(i.version), n = ct.from(i.maskPattern), i.toSJISFunc && tt.setToSJISFunction(i.toSJISFunc)), Ne(t, r, o, n);
};
var vt = {}, mt = {};
(function(e) {
  function t(i) {
    if (typeof i == "number" && (i = i.toString()), typeof i != "string")
      throw new Error("Color should be defined as hex string");
    let o = i.slice().replace("#", "").split("");
    if (o.length < 3 || o.length === 5 || o.length > 8)
      throw new Error("Invalid hex color: " + i);
    (o.length === 3 || o.length === 4) && (o = Array.prototype.concat.apply([], o.map(function(n) {
      return [n, n];
    }))), o.length === 6 && o.push("F", "F");
    const r = parseInt(o.join(""), 16);
    return {
      r: r >> 24 & 255,
      g: r >> 16 & 255,
      b: r >> 8 & 255,
      a: r & 255,
      hex: "#" + o.slice(0, 6).join("")
    };
  }
  e.getOptions = function(o) {
    o || (o = {}), o.color || (o.color = {});
    const r = typeof o.margin > "u" || o.margin === null || o.margin < 0 ? 4 : o.margin, n = o.width && o.width >= 21 ? o.width : void 0, s = o.scale || 4;
    return {
      width: n,
      scale: n ? 4 : s,
      margin: r,
      color: {
        dark: t(o.color.dark || "#000000ff"),
        light: t(o.color.light || "#ffffffff")
      },
      type: o.type,
      rendererOpts: o.rendererOpts || {}
    };
  }, e.getScale = function(o, r) {
    return r.width && r.width >= o + r.margin * 2 ? r.width / (o + r.margin * 2) : r.scale;
  }, e.getImageWidth = function(o, r) {
    const n = e.getScale(o, r);
    return Math.floor((o + r.margin * 2) * n);
  }, e.qrToImageData = function(o, r, n) {
    const s = r.modules.size, u = r.modules.data, a = e.getScale(s, n), d = Math.floor((s + n.margin * 2) * a), g = n.margin * a, B = [n.color.light, n.color.dark];
    for (let y = 0; y < d; y++)
      for (let w = 0; w < d; w++) {
        let E = (y * d + w) * 4, m = n.color.light;
        if (y >= g && w >= g && y < d - g && w < d - g) {
          const p = Math.floor((y - g) / a), f = Math.floor((w - g) / a);
          m = B[u[p * s + f] ? 1 : 0];
        }
        o[E++] = m.r, o[E++] = m.g, o[E++] = m.b, o[E] = m.a;
      }
  };
})(mt);
(function(e) {
  const t = mt;
  function i(r, n, s) {
    r.clearRect(0, 0, n.width, n.height), n.style || (n.style = {}), n.height = s, n.width = s, n.style.height = s + "px", n.style.width = s + "px";
  }
  function o() {
    try {
      return document.createElement("canvas");
    } catch {
      throw new Error("You need to specify a canvas element");
    }
  }
  e.render = function(n, s, u) {
    let a = u, d = s;
    typeof a > "u" && (!s || !s.getContext) && (a = s, s = void 0), s || (d = o()), a = t.getOptions(a);
    const g = t.getImageWidth(n.modules.size, a), B = d.getContext("2d"), y = B.createImageData(g, g);
    return t.qrToImageData(y.data, n, a), i(B, d, g), B.putImageData(y, 0, 0), d;
  }, e.renderToDataURL = function(n, s, u) {
    let a = u;
    typeof a > "u" && (!s || !s.getContext) && (a = s, s = void 0), a || (a = {});
    const d = e.render(n, s, a), g = a.type || "image/png", B = a.rendererOpts || {};
    return d.toDataURL(g, B.quality);
  };
})(vt);
var Ut = {};
const Te = mt;
function Et(e, t) {
  const i = e.a / 255, o = t + '="' + e.hex + '"';
  return i < 1 ? o + " " + t + '-opacity="' + i.toFixed(2).slice(1) + '"' : o;
}
function st(e, t, i) {
  let o = e + t;
  return typeof i < "u" && (o += " " + i), o;
}
function Se(e, t, i) {
  let o = "", r = 0, n = !1, s = 0;
  for (let u = 0; u < e.length; u++) {
    const a = Math.floor(u % t), d = Math.floor(u / t);
    !a && !n && (n = !0), e[u] ? (s++, u > 0 && a > 0 && e[u - 1] || (o += n ? st("M", a + i, 0.5 + d + i) : st("m", r, 0), r = 0, n = !1), a + 1 < t && e[u + 1] || (o += st("h", s), s = 0)) : r++;
  }
  return o;
}
Ut.render = function(t, i, o) {
  const r = Te.getOptions(i), n = t.modules.size, s = t.modules.data, u = n + r.margin * 2, a = r.color.light.a ? "<path " + Et(r.color.light, "fill") + ' d="M0 0h' + u + "v" + u + 'H0z"/>' : "", d = "<path " + Et(r.color.dark, "stroke") + ' d="' + Se(s, n, r.margin) + '"/>', g = 'viewBox="0 0 ' + u + " " + u + '"', y = '<svg xmlns="http://www.w3.org/2000/svg" ' + (r.width ? 'width="' + r.width + '" height="' + r.width + '" ' : "") + g + ' shape-rendering="crispEdges">' + a + d + `</svg>
`;
  return typeof o == "function" && o(null, y), y;
};
const Me = Vt, ft = Bt, Ft = vt, Re = Ut;
function wt(e, t, i, o, r) {
  const n = [].slice.call(arguments, 1), s = n.length, u = typeof n[s - 1] == "function";
  if (!u && !Me())
    throw new Error("Callback required as last argument");
  if (u) {
    if (s < 2)
      throw new Error("Too few arguments provided");
    s === 2 ? (r = i, i = t, t = o = void 0) : s === 3 && (t.getContext && typeof r > "u" ? (r = o, o = void 0) : (r = o, o = i, i = t, t = void 0));
  } else {
    if (s < 1)
      throw new Error("Too few arguments provided");
    return s === 1 ? (i = t, t = o = void 0) : s === 2 && !t.getContext && (o = i, i = t, t = void 0), new Promise(function(a, d) {
      try {
        const g = ft.create(i, o);
        a(e(g, t, o));
      } catch (g) {
        d(g);
      }
    });
  }
  try {
    const a = ft.create(i, o);
    r(null, e(a, t, o));
  } catch (a) {
    r(a);
  }
}
K.create = ft.create;
K.toCanvas = wt.bind(null, Ft.render);
K.toDataURL = wt.bind(null, Ft.renderToDataURL);
K.toString = wt.bind(null, function(e, t, i) {
  return Re.render(e, i);
});
const Pe = 0.1, Ct = 2.5, P = 7;
function at(e, t, i) {
  return e === t ? !1 : (e - t < 0 ? t - e : e - t) <= i + Pe;
}
function Le(e, t) {
  const i = Array.prototype.slice.call(K.create(e, { errorCorrectionLevel: t }).modules.data, 0), o = Math.sqrt(i.length);
  return i.reduce((r, n, s) => (s % o === 0 ? r.push([n]) : r[r.length - 1].push(n)) && r, []);
}
const _e = {
  generate({ uri: e, size: t, logoSize: i, dotColor: o = "#141414" }) {
    const r = "transparent", s = [], u = Le(e, "Q"), a = t / u.length, d = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: 1 }
    ];
    d.forEach(({ x: m, y: p }) => {
      const f = (u.length - P) * a * m, l = (u.length - P) * a * p, h = 0.45;
      for (let c = 0; c < d.length; c += 1) {
        const C = a * (P - c * 2);
        s.push(Q`
            <rect
              fill=${c === 2 ? o : r}
              width=${c === 0 ? C - 5 : C}
              rx= ${c === 0 ? (C - 5) * h : C * h}
              ry= ${c === 0 ? (C - 5) * h : C * h}
              stroke=${o}
              stroke-width=${c === 0 ? 5 : 0}
              height=${c === 0 ? C - 5 : C}
              x= ${c === 0 ? l + a * c + 5 / 2 : l + a * c}
              y= ${c === 0 ? f + a * c + 5 / 2 : f + a * c}
            />
          `);
      }
    });
    const g = Math.floor((i + 25) / a), B = u.length / 2 - g / 2, y = u.length / 2 + g / 2 - 1, w = [];
    u.forEach((m, p) => {
      m.forEach((f, l) => {
        if (u[p][l] && !(p < P && l < P || p > u.length - (P + 1) && l < P || p < P && l > u.length - (P + 1)) && !(p > B && p < y && l > B && l < y)) {
          const h = p * a + a / 2, c = l * a + a / 2;
          w.push([h, c]);
        }
      });
    });
    const E = {};
    return w.forEach(([m, p]) => {
      var f;
      E[m] ? (f = E[m]) == null || f.push(p) : E[m] = [p];
    }), Object.entries(E).map(([m, p]) => {
      const f = p.filter((l) => p.every((h) => !at(l, h, a)));
      return [Number(m), f];
    }).forEach(([m, p]) => {
      p.forEach((f) => {
        s.push(Q`<circle cx=${m} cy=${f} fill=${o} r=${a / Ct} />`);
      });
    }), Object.entries(E).filter(([m, p]) => p.length > 1).map(([m, p]) => {
      const f = p.filter((l) => p.some((h) => at(l, h, a)));
      return [Number(m), f];
    }).map(([m, p]) => {
      p.sort((l, h) => l < h ? -1 : 1);
      const f = [];
      for (const l of p) {
        const h = f.find((c) => c.some((C) => at(l, C, a)));
        h ? h.push(l) : f.push([l]);
      }
      return [m, f.map((l) => [l[0], l[l.length - 1]])];
    }).forEach(([m, p]) => {
      p.forEach(([f, l]) => {
        s.push(Q`
              <line
                x1=${m}
                x2=${m}
                y1=${f}
                y2=${l}
                stroke=${o}
                stroke-width=${a / (Ct / 2)}
                stroke-linecap="round"
              />
            `);
      });
    }), s;
  }
}, De = kt`
  :host {
    position: relative;
    user-select: none;
    display: block;
    overflow: hidden;
    aspect-ratio: 1 / 1;
    width: var(--local-size);
  }

  :host([data-theme='dark']) {
    border-radius: clamp(0px, var(--wui-border-radius-l), 40px);
    background-color: var(--wui-color-inverse-100);
    padding: var(--wui-spacing-l);
  }

  :host([data-theme='light']) {
    box-shadow: 0 0 0 1px var(--wui-color-bg-125);
    background-color: var(--wui-color-bg-125);
  }

  :host([data-clear='true']) > wui-icon {
    display: none;
  }

  svg:first-child,
  wui-image,
  wui-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
  }

  wui-image {
    width: 25%;
    height: 25%;
    border-radius: var(--wui-border-radius-xs);
  }

  wui-icon {
    width: 100%;
    height: 100%;
    color: var(--local-icon-color) !important;
    transform: translateY(-50%) translateX(-50%) scale(0.25);
  }
`;
var L = function(e, t, i, o) {
  var r = arguments.length, n = r < 3 ? t : o === null ? o = Object.getOwnPropertyDescriptor(t, i) : o, s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") n = Reflect.decorate(e, t, i, o);
  else for (var u = e.length - 1; u >= 0; u--) (s = e[u]) && (n = (r < 3 ? s(n) : r > 3 ? s(t, i, n) : s(t, i)) || n);
  return r > 3 && n && Object.defineProperty(t, i, n), n;
};
const ve = "#3396ff";
let T = class extends $t {
  constructor() {
    super(...arguments), this.uri = "", this.size = 0, this.theme = "dark", this.imageSrc = void 0, this.alt = void 0, this.arenaClear = void 0, this.farcaster = void 0;
  }
  render() {
    return this.dataset.theme = this.theme, this.dataset.clear = String(this.arenaClear), this.style.cssText = `
     --local-size: ${this.size}px;
     --local-icon-color: ${this.color ?? ve}
    `, Y`${this.templateVisual()} ${this.templateSvg()}`;
  }
  templateSvg() {
    const t = this.theme === "light" ? this.size : this.size - 32;
    return Q`
      <svg height=${t} width=${t}>
        ${_e.generate({
      uri: this.uri,
      size: t,
      logoSize: this.arenaClear ? 0 : t / 4,
      dotColor: this.color
    })}
      </svg>
    `;
  }
  templateVisual() {
    return this.imageSrc ? Y`<wui-image src=${this.imageSrc} alt=${this.alt ?? "logo"}></wui-image>` : this.farcaster ? Y`<wui-icon
        class="farcaster"
        size="inherit"
        color="inherit"
        name="farcaster"
      ></wui-icon>` : Y`<wui-icon size="inherit" color="inherit" name="walletConnect"></wui-icon>`;
  }
};
T.styles = [zt, De];
L([
  v()
], T.prototype, "uri", void 0);
L([
  v({ type: Number })
], T.prototype, "size", void 0);
L([
  v()
], T.prototype, "theme", void 0);
L([
  v()
], T.prototype, "imageSrc", void 0);
L([
  v()
], T.prototype, "alt", void 0);
L([
  v()
], T.prototype, "color", void 0);
L([
  v({ type: Boolean })
], T.prototype, "arenaClear", void 0);
L([
  v({ type: Boolean })
], T.prototype, "farcaster", void 0);
T = L([
  Ot("wui-qr-code")
], T);
