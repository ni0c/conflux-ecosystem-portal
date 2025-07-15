import { ao as H, ap as I, aq as x, q as _, w as z, ah as L, r as A, x as S, am as O } from "./umd-Cchevry1.mjs";
const w = {
  getSpacingStyles(t, e) {
    if (Array.isArray(t))
      return t[e] ? `var(--wui-spacing-${t[e]})` : void 0;
    if (typeof t == "string")
      return `var(--wui-spacing-${t})`;
  },
  getFormattedDate(t) {
    return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(t);
  },
  getHostName(t) {
    try {
      return new URL(t).hostname;
    } catch {
      return "";
    }
  },
  getTruncateString({ string: t, charsStart: e, charsEnd: i, truncate: a }) {
    return t.length <= e + i ? t : a === "end" ? `${t.substring(0, e)}...` : a === "start" ? `...${t.substring(t.length - i)}` : `${t.substring(0, Math.floor(e))}...${t.substring(t.length - Math.floor(i))}`;
  },
  generateAvatarColors(t) {
    const i = t.toLowerCase().replace(/^0x/iu, "").replace(/[^a-f0-9]/gu, "").substring(0, 6).padEnd(6, "0"), a = this.hexToRgb(i), r = getComputedStyle(document.documentElement).getPropertyValue("--w3m-border-radius-master"), n = 100 - 3 * Number(r == null ? void 0 : r.replace("px", "")), s = `${n}% ${n}% at 65% 40%`, l = [];
    for (let m = 0; m < 5; m += 1) {
      const h = this.tintColor(a, 0.15 * m);
      l.push(`rgb(${h[0]}, ${h[1]}, ${h[2]})`);
    }
    return `
    --local-color-1: ${l[0]};
    --local-color-2: ${l[1]};
    --local-color-3: ${l[2]};
    --local-color-4: ${l[3]};
    --local-color-5: ${l[4]};
    --local-radial-circle: ${s}
   `;
  },
  hexToRgb(t) {
    const e = parseInt(t, 16), i = e >> 16 & 255, a = e >> 8 & 255, r = e & 255;
    return [i, a, r];
  },
  tintColor(t, e) {
    const [i, a, r] = t, o = Math.round(i + (255 - i) * e), n = Math.round(a + (255 - a) * e), s = Math.round(r + (255 - r) * e);
    return [o, n, s];
  },
  isNumber(t) {
    return {
      number: /^[0-9]+$/u
    }.number.test(t);
  },
  getColorTheme(t) {
    var e;
    return t || (typeof window < "u" && window.matchMedia && typeof window.matchMedia == "function" ? (e = window.matchMedia("(prefers-color-scheme: dark)")) != null && e.matches ? "dark" : "light" : "dark");
  },
  splitBalance(t) {
    const e = t.split(".");
    return e.length === 2 ? [e[0], e[1]] : ["0", "00"];
  },
  roundNumber(t, e, i) {
    return t.toString().length >= e ? Number(t).toFixed(i) : t;
  },
  formatNumberToLocalString(t, e = 2) {
    return t === void 0 ? "0.00" : typeof t == "number" ? t.toLocaleString("en-US", {
      maximumFractionDigits: e,
      minimumFractionDigits: e
    }) : parseFloat(t).toLocaleString("en-US", {
      maximumFractionDigits: e,
      minimumFractionDigits: e
    });
  }
};
function D(t, e) {
  const { kind: i, elements: a } = e;
  return {
    kind: i,
    elements: a,
    finisher(r) {
      customElements.get(t) || customElements.define(t, r);
    }
  };
}
function F(t, e) {
  return customElements.get(t) || customElements.define(t, e), e;
}
function T(t) {
  return function(i) {
    return typeof i == "function" ? F(t, i) : D(t, i);
  };
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const G = { attribute: !0, type: String, converter: I, reflect: !1, hasChanged: H }, N = (t = G, e, i) => {
  const { kind: a, metadata: r } = i;
  let o = globalThis.litPropertyMetadata.get(r);
  if (o === void 0 && globalThis.litPropertyMetadata.set(r, o = /* @__PURE__ */ new Map()), a === "setter" && ((t = Object.create(t)).wrapped = !0), o.set(i.name, t), a === "accessor") {
    const { name: n } = i;
    return { set(s) {
      const l = e.get.call(this);
      e.set.call(this, s), this.requestUpdate(n, l, t);
    }, init(s) {
      return s !== void 0 && this.C(n, void 0, t, s), s;
    } };
  }
  if (a === "setter") {
    const { name: n } = i;
    return function(s) {
      const l = this[n];
      e.call(this, s), this.requestUpdate(n, l, t);
    };
  }
  throw Error("Unsupported decorator location: " + a);
};
function c(t) {
  return (e, i) => typeof i == "object" ? N(t, e, i) : ((a, r, o) => {
    const n = r.hasOwnProperty(o);
    return r.constructor.createProperty(o, a), n ? Object.getOwnPropertyDescriptor(r, o) : void 0;
  })(t, e, i);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function st(t) {
  return c({ ...t, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const E = (t) => t === null || typeof t != "object" && typeof t != "function", W = (t) => t.strings === void 0;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const M = { ATTRIBUTE: 1, CHILD: 2 }, j = (t) => (...e) => ({ _$litDirective$: t, values: e });
let B = class {
  constructor(e) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(e, i, a) {
    this._$Ct = e, this._$AM = i, this._$Ci = a;
  }
  _$AS(e, i) {
    return this.update(e, i);
  }
  update(e, i) {
    return this.render(...i);
  }
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const d = (t, e) => {
  var a;
  const i = t._$AN;
  if (i === void 0) return !1;
  for (const r of i) (a = r._$AO) == null || a.call(r, e, !1), d(r, e);
  return !0;
}, $ = (t) => {
  let e, i;
  do {
    if ((e = t._$AM) === void 0) break;
    i = e._$AN, i.delete(t), t = e;
  } while ((i == null ? void 0 : i.size) === 0);
}, U = (t) => {
  for (let e; e = t._$AM; t = e) {
    let i = e._$AN;
    if (i === void 0) e._$AN = i = /* @__PURE__ */ new Set();
    else if (i.has(t)) break;
    i.add(t), K(e);
  }
};
function q(t) {
  this._$AN !== void 0 ? ($(this), this._$AM = t, U(this)) : this._$AM = t;
}
function V(t, e = !1, i = 0) {
  const a = this._$AH, r = this._$AN;
  if (r !== void 0 && r.size !== 0) if (e) if (Array.isArray(a)) for (let o = i; o < a.length; o++) d(a[o], !1), $(a[o]);
  else a != null && (d(a, !1), $(a));
  else d(this, t);
}
const K = (t) => {
  t.type == M.CHILD && (t._$AP ?? (t._$AP = V), t._$AQ ?? (t._$AQ = q));
};
class X extends B {
  constructor() {
    super(...arguments), this._$AN = void 0;
  }
  _$AT(e, i, a) {
    super._$AT(e, i, a), U(this), this.isConnected = e._$AU;
  }
  _$AO(e, i = !0) {
    var a, r;
    e !== this.isConnected && (this.isConnected = e, e ? (a = this.reconnected) == null || a.call(this) : (r = this.disconnected) == null || r.call(this)), i && (d(this, e), $(this));
  }
  setValue(e) {
    if (W(this._$Ct)) this._$Ct._$AI(e, this);
    else {
      const i = [...this._$Ct._$AH];
      i[this._$Ci] = e, this._$Ct._$AI(i, this, 0);
    }
  }
  disconnected() {
  }
  reconnected() {
  }
}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class Y {
  constructor(e) {
    this.G = e;
  }
  disconnect() {
    this.G = void 0;
  }
  reconnect(e) {
    this.G = e;
  }
  deref() {
    return this.G;
  }
}
class Z {
  constructor() {
    this.Y = void 0, this.Z = void 0;
  }
  get() {
    return this.Y;
  }
  pause() {
    this.Y ?? (this.Y = new Promise((e) => this.Z = e));
  }
  resume() {
    var e;
    (e = this.Z) == null || e.call(this), this.Y = this.Z = void 0;
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const k = (t) => !E(t) && typeof t.then == "function", P = 1073741823;
class Q extends X {
  constructor() {
    super(...arguments), this._$Cwt = P, this._$Cbt = [], this._$CK = new Y(this), this._$CX = new Z();
  }
  render(...e) {
    return e.find((i) => !k(i)) ?? x;
  }
  update(e, i) {
    const a = this._$Cbt;
    let r = a.length;
    this._$Cbt = i;
    const o = this._$CK, n = this._$CX;
    this.isConnected || this.disconnected();
    for (let s = 0; s < i.length && !(s > this._$Cwt); s++) {
      const l = i[s];
      if (!k(l)) return this._$Cwt = s, l;
      s < r && l === a[s] || (this._$Cwt = P, r = 0, Promise.resolve(l).then(async (m) => {
        for (; n.get(); ) await n.get();
        const h = o.deref();
        if (h !== void 0) {
          const b = h._$Cbt.indexOf(l);
          b > -1 && b < h._$Cwt && (h._$Cwt = b, h.setValue(m));
        }
      }));
    }
    return x;
  }
  disconnected() {
    this._$CK.disconnect(), this._$CX.pause();
  }
  reconnected() {
    this._$CK.reconnect(this), this._$CX.resume();
  }
}
const J = j(Q);
class tt {
  constructor() {
    this.cache = /* @__PURE__ */ new Map();
  }
  set(e, i) {
    this.cache.set(e, i);
  }
  get(e) {
    return this.cache.get(e);
  }
  has(e) {
    return this.cache.has(e);
  }
  delete(e) {
    this.cache.delete(e);
  }
  clear() {
    this.cache.clear();
  }
}
const C = new tt(), et = _`
  :host {
    display: flex;
    aspect-ratio: var(--local-aspect-ratio);
    color: var(--local-color);
    width: var(--local-width);
  }

  svg {
    width: inherit;
    height: inherit;
    object-fit: contain;
    object-position: center;
  }

  .fallback {
    width: var(--local-width);
    height: var(--local-height);
  }
`;
var v = function(t, e, i, a) {
  var r = arguments.length, o = r < 3 ? e : a === null ? a = Object.getOwnPropertyDescriptor(e, i) : a, n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") o = Reflect.decorate(t, e, i, a);
  else for (var s = t.length - 1; s >= 0; s--) (n = t[s]) && (o = (r < 3 ? n(o) : r > 3 ? n(e, i, o) : n(e, i)) || o);
  return r > 3 && o && Object.defineProperty(e, i, o), o;
};
const R = {
  add: async () => (await import("./add-DsRqpZ36.mjs")).addSvg,
  allWallets: async () => (await import("./all-wallets-DIKtWC7T.mjs")).allWalletsSvg,
  arrowBottomCircle: async () => (await import("./arrow-bottom-circle-DJuC5al2.mjs")).arrowBottomCircleSvg,
  appStore: async () => (await import("./app-store-DMarepFE.mjs")).appStoreSvg,
  apple: async () => (await import("./apple-Ck1rTfui.mjs")).appleSvg,
  arrowBottom: async () => (await import("./arrow-bottom-DXKftHFD.mjs")).arrowBottomSvg,
  arrowLeft: async () => (await import("./arrow-left-BouZLfsB.mjs")).arrowLeftSvg,
  arrowRight: async () => (await import("./arrow-right-C4f1KUG8.mjs")).arrowRightSvg,
  arrowTop: async () => (await import("./arrow-top-Bwf-mDA1.mjs")).arrowTopSvg,
  bank: async () => (await import("./bank-CnvwjUQf.mjs")).bankSvg,
  browser: async () => (await import("./browser-Bh3dK34E.mjs")).browserSvg,
  bin: async () => (await import("./bin-C05ehEfr.mjs")).binSvg,
  bitcoin: async () => (await import("./bitcoin-BrEMDaJn.mjs")).bitcoinSvg,
  card: async () => (await import("./card-klfjGNmM.mjs")).cardSvg,
  checkmark: async () => (await import("./checkmark-DgscSg02.mjs")).checkmarkSvg,
  checkmarkBold: async () => (await import("./checkmark-bold-BXjtoYSC.mjs")).checkmarkBoldSvg,
  chevronBottom: async () => (await import("./chevron-bottom-DQoMK9nO.mjs")).chevronBottomSvg,
  chevronLeft: async () => (await import("./chevron-left-B9JiO4JD.mjs")).chevronLeftSvg,
  chevronRight: async () => (await import("./chevron-right-4QYrSCXl.mjs")).chevronRightSvg,
  chevronTop: async () => (await import("./chevron-top-XoAtd-__.mjs")).chevronTopSvg,
  chromeStore: async () => (await import("./chrome-store-A_3Dbbn7.mjs")).chromeStoreSvg,
  clock: async () => (await import("./clock-CI066z9O.mjs")).clockSvg,
  close: async () => (await import("./close-DYiGrfFV.mjs")).closeSvg,
  compass: async () => (await import("./compass-C_5nglSf.mjs")).compassSvg,
  coinPlaceholder: async () => (await import("./coinPlaceholder-KDF0UrBV.mjs")).coinPlaceholderSvg,
  copy: async () => (await import("./copy-CtxkjJG5.mjs")).copySvg,
  cursor: async () => (await import("./cursor-DHeVtojS.mjs")).cursorSvg,
  cursorTransparent: async () => (await import("./cursor-transparent-CAsRs99F.mjs")).cursorTransparentSvg,
  circle: async () => (await import("./circle-BbxXgh5l.mjs")).circleSvg,
  desktop: async () => (await import("./desktop-CUct9xyX.mjs")).desktopSvg,
  disconnect: async () => (await import("./disconnect-CZ3qHdDc.mjs")).disconnectSvg,
  discord: async () => (await import("./discord-CZmeTXWI.mjs")).discordSvg,
  ethereum: async () => (await import("./ethereum-C-gA6two.mjs")).ethereumSvg,
  etherscan: async () => (await import("./etherscan-D2v813iW.mjs")).etherscanSvg,
  extension: async () => (await import("./extension-zEUIljjN.mjs")).extensionSvg,
  externalLink: async () => (await import("./external-link-iGJjiLFB.mjs")).externalLinkSvg,
  facebook: async () => (await import("./facebook-Bl5MLQiz.mjs")).facebookSvg,
  farcaster: async () => (await import("./farcaster-B-NdwPV0.mjs")).farcasterSvg,
  filters: async () => (await import("./filters-D19kvyC4.mjs")).filtersSvg,
  github: async () => (await import("./github-DfbRH0fF.mjs")).githubSvg,
  google: async () => (await import("./google-DBuyeSIC.mjs")).googleSvg,
  helpCircle: async () => (await import("./help-circle-CuMW5hZ6.mjs")).helpCircleSvg,
  image: async () => (await import("./image-biomxv8f.mjs")).imageSvg,
  id: async () => (await import("./id-LRVXkPFl.mjs")).idSvg,
  infoCircle: async () => (await import("./info-circle-BpZYxLQI.mjs")).infoCircleSvg,
  lightbulb: async () => (await import("./lightbulb-D_NSdnob.mjs")).lightbulbSvg,
  mail: async () => (await import("./mail-D4hYUN5a.mjs")).mailSvg,
  mobile: async () => (await import("./mobile-VMiH2sIJ.mjs")).mobileSvg,
  more: async () => (await import("./more-fhPgeZvR.mjs")).moreSvg,
  networkPlaceholder: async () => (await import("./network-placeholder-CZjZJhlZ.mjs")).networkPlaceholderSvg,
  nftPlaceholder: async () => (await import("./nftPlaceholder-uZVBcpK8.mjs")).nftPlaceholderSvg,
  off: async () => (await import("./off-DmIaN4PI.mjs")).offSvg,
  playStore: async () => (await import("./play-store-Cj0r5Jqp.mjs")).playStoreSvg,
  plus: async () => (await import("./plus--u0ltXpe.mjs")).plusSvg,
  qrCode: async () => (await import("./qr-code-BPR78YYo.mjs")).qrCodeIcon,
  recycleHorizontal: async () => (await import("./recycle-horizontal-B0AQ5jNO.mjs")).recycleHorizontalSvg,
  refresh: async () => (await import("./refresh-BelKwchG.mjs")).refreshSvg,
  search: async () => (await import("./search-CJE60b24.mjs")).searchSvg,
  send: async () => (await import("./send-CFPA4FE4.mjs")).sendSvg,
  swapHorizontal: async () => (await import("./swapHorizontal-tENl_7mU.mjs")).swapHorizontalSvg,
  swapHorizontalMedium: async () => (await import("./swapHorizontalMedium-BOzpKv6_.mjs")).swapHorizontalMediumSvg,
  swapHorizontalBold: async () => (await import("./swapHorizontalBold-8rCi3yz4.mjs")).swapHorizontalBoldSvg,
  swapHorizontalRoundedBold: async () => (await import("./swapHorizontalRoundedBold-Bzndarsf.mjs")).swapHorizontalRoundedBoldSvg,
  swapVertical: async () => (await import("./swapVertical-rebbdRis.mjs")).swapVerticalSvg,
  solana: async () => (await import("./solana-GoD91sRW.mjs")).solanaSvg,
  telegram: async () => (await import("./telegram-Dp_VrptP.mjs")).telegramSvg,
  threeDots: async () => (await import("./three-dots-CWDi65KS.mjs")).threeDotsSvg,
  twitch: async () => (await import("./twitch-D-rXooPx.mjs")).twitchSvg,
  twitter: async () => (await import("./x-D7BByu-z.mjs")).xSvg,
  twitterIcon: async () => (await import("./twitterIcon-CuMasbNg.mjs")).twitterIconSvg,
  verify: async () => (await import("./verify-DDMwVPNQ.mjs")).verifySvg,
  verifyFilled: async () => (await import("./verify-filled-DBj6_MNv.mjs")).verifyFilledSvg,
  wallet: async () => (await import("./wallet-DQKKRLwe.mjs")).walletSvg,
  walletConnect: async () => (await import("./walletconnect-uO3RrFPX.mjs")).walletConnectSvg,
  walletConnectLightBrown: async () => (await import("./walletconnect-uO3RrFPX.mjs")).walletConnectLightBrownSvg,
  walletConnectBrown: async () => (await import("./walletconnect-uO3RrFPX.mjs")).walletConnectBrownSvg,
  walletPlaceholder: async () => (await import("./wallet-placeholder-BqoJvFKJ.mjs")).walletPlaceholderSvg,
  warningCircle: async () => (await import("./warning-circle-BcwbSl3C.mjs")).warningCircleSvg,
  x: async () => (await import("./x-D7BByu-z.mjs")).xSvg,
  info: async () => (await import("./info-Cdgi6WmS.mjs")).infoSvg,
  exclamationTriangle: async () => (await import("./exclamation-triangle-BrrW5dhm.mjs")).exclamationTriangleSvg,
  reown: async () => (await import("./reown-logo-Dh5fOVP9.mjs")).reownSvg,
  "x-mark": async () => (await import("./x-mark-Dfk10Ohs.mjs")).xMarkSvg
};
async function it(t) {
  if (C.has(t))
    return C.get(t);
  const i = (R[t] ?? R.copy)();
  return C.set(t, i), i;
}
let g = class extends A {
  constructor() {
    super(...arguments), this.size = "md", this.name = "copy", this.color = "fg-300", this.aspectRatio = "1 / 1";
  }
  render() {
    return this.style.cssText = `
      --local-color: ${`var(--wui-color-${this.color});`}
      --local-width: ${`var(--wui-icon-size-${this.size});`}
      --local-aspect-ratio: ${this.aspectRatio}
    `, S`${J(it(this.name), S`<div class="fallback"></div>`)}`;
  }
};
g.styles = [z, L, et];
v([
  c()
], g.prototype, "size", void 0);
v([
  c()
], g.prototype, "name", void 0);
v([
  c()
], g.prototype, "color", void 0);
v([
  c()
], g.prototype, "aspectRatio", void 0);
g = v([
  T("wui-icon")
], g);
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ot = j(class extends B {
  constructor(t) {
    var e;
    if (super(t), t.type !== M.ATTRIBUTE || t.name !== "class" || ((e = t.strings) == null ? void 0 : e.length) > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
  }
  render(t) {
    return " " + Object.keys(t).filter((e) => t[e]).join(" ") + " ";
  }
  update(t, [e]) {
    var a, r;
    if (this.st === void 0) {
      this.st = /* @__PURE__ */ new Set(), t.strings !== void 0 && (this.nt = new Set(t.strings.join(" ").split(/\s/).filter((o) => o !== "")));
      for (const o in e) e[o] && !((a = this.nt) != null && a.has(o)) && this.st.add(o);
      return this.render(e);
    }
    const i = t.element.classList;
    for (const o of this.st) o in e || (i.remove(o), this.st.delete(o));
    for (const o in e) {
      const n = !!e[o];
      n === this.st.has(o) || (r = this.nt) != null && r.has(o) || (n ? (i.add(o), this.st.add(o)) : (i.remove(o), this.st.delete(o)));
    }
    return x;
  }
}), at = _`
  :host {
    display: inline-flex !important;
  }

  slot {
    width: 100%;
    display: inline-block;
    font-style: normal;
    font-family: var(--wui-font-family);
    font-feature-settings:
      'tnum' on,
      'lnum' on,
      'case' on;
    line-height: 130%;
    font-weight: var(--wui-font-weight-regular);
    overflow: inherit;
    text-overflow: inherit;
    text-align: var(--local-align);
    color: var(--local-color);
  }

  .wui-line-clamp-1 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
  }

  .wui-line-clamp-2 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

  .wui-font-medium-400 {
    font-size: var(--wui-font-size-medium);
    font-weight: var(--wui-font-weight-light);
    letter-spacing: var(--wui-letter-spacing-medium);
  }

  .wui-font-medium-600 {
    font-size: var(--wui-font-size-medium);
    letter-spacing: var(--wui-letter-spacing-medium);
  }

  .wui-font-title-600 {
    font-size: var(--wui-font-size-title);
    letter-spacing: var(--wui-letter-spacing-title);
  }

  .wui-font-title-6-600 {
    font-size: var(--wui-font-size-title-6);
    letter-spacing: var(--wui-letter-spacing-title-6);
  }

  .wui-font-mini-700 {
    font-size: var(--wui-font-size-mini);
    letter-spacing: var(--wui-letter-spacing-mini);
    text-transform: uppercase;
  }

  .wui-font-large-500,
  .wui-font-large-600,
  .wui-font-large-700 {
    font-size: var(--wui-font-size-large);
    letter-spacing: var(--wui-letter-spacing-large);
  }

  .wui-font-2xl-500,
  .wui-font-2xl-600,
  .wui-font-2xl-700 {
    font-size: var(--wui-font-size-2xl);
    letter-spacing: var(--wui-letter-spacing-2xl);
  }

  .wui-font-paragraph-400,
  .wui-font-paragraph-500,
  .wui-font-paragraph-600,
  .wui-font-paragraph-700 {
    font-size: var(--wui-font-size-paragraph);
    letter-spacing: var(--wui-letter-spacing-paragraph);
  }

  .wui-font-small-400,
  .wui-font-small-500,
  .wui-font-small-600 {
    font-size: var(--wui-font-size-small);
    letter-spacing: var(--wui-letter-spacing-small);
  }

  .wui-font-tiny-400,
  .wui-font-tiny-500,
  .wui-font-tiny-600 {
    font-size: var(--wui-font-size-tiny);
    letter-spacing: var(--wui-letter-spacing-tiny);
  }

  .wui-font-micro-700,
  .wui-font-micro-600,
  .wui-font-micro-500 {
    font-size: var(--wui-font-size-micro);
    letter-spacing: var(--wui-letter-spacing-micro);
    text-transform: uppercase;
  }

  .wui-font-tiny-400,
  .wui-font-small-400,
  .wui-font-medium-400,
  .wui-font-paragraph-400 {
    font-weight: var(--wui-font-weight-light);
  }

  .wui-font-large-700,
  .wui-font-paragraph-700,
  .wui-font-micro-700,
  .wui-font-mini-700 {
    font-weight: var(--wui-font-weight-bold);
  }

  .wui-font-medium-600,
  .wui-font-medium-title-600,
  .wui-font-title-6-600,
  .wui-font-large-600,
  .wui-font-paragraph-600,
  .wui-font-small-600,
  .wui-font-tiny-600,
  .wui-font-micro-600 {
    font-weight: var(--wui-font-weight-medium);
  }

  :host([disabled]) {
    opacity: 0.4;
  }
`;
var y = function(t, e, i, a) {
  var r = arguments.length, o = r < 3 ? e : a === null ? a = Object.getOwnPropertyDescriptor(e, i) : a, n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") o = Reflect.decorate(t, e, i, a);
  else for (var s = t.length - 1; s >= 0; s--) (n = t[s]) && (o = (r < 3 ? n(o) : r > 3 ? n(e, i, o) : n(e, i)) || o);
  return r > 3 && o && Object.defineProperty(e, i, o), o;
};
let f = class extends A {
  constructor() {
    super(...arguments), this.variant = "paragraph-500", this.color = "fg-300", this.align = "left", this.lineClamp = void 0;
  }
  render() {
    const e = {
      [`wui-font-${this.variant}`]: !0,
      [`wui-color-${this.color}`]: !0,
      [`wui-line-clamp-${this.lineClamp}`]: !!this.lineClamp
    };
    return this.style.cssText = `
      --local-align: ${this.align};
      --local-color: var(--wui-color-${this.color});
    `, S`<slot class=${ot(e)}></slot>`;
  }
};
f.styles = [z, at];
y([
  c()
], f.prototype, "variant", void 0);
y([
  c()
], f.prototype, "color", void 0);
y([
  c()
], f.prototype, "align", void 0);
y([
  c()
], f.prototype, "lineClamp", void 0);
f = y([
  T("wui-text")
], f);
const rt = _`
  :host {
    display: flex;
    width: inherit;
    height: inherit;
  }
`;
var u = function(t, e, i, a) {
  var r = arguments.length, o = r < 3 ? e : a === null ? a = Object.getOwnPropertyDescriptor(e, i) : a, n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") o = Reflect.decorate(t, e, i, a);
  else for (var s = t.length - 1; s >= 0; s--) (n = t[s]) && (o = (r < 3 ? n(o) : r > 3 ? n(e, i, o) : n(e, i)) || o);
  return r > 3 && o && Object.defineProperty(e, i, o), o;
};
let p = class extends A {
  render() {
    return this.style.cssText = `
      flex-direction: ${this.flexDirection};
      flex-wrap: ${this.flexWrap};
      flex-basis: ${this.flexBasis};
      flex-grow: ${this.flexGrow};
      flex-shrink: ${this.flexShrink};
      align-items: ${this.alignItems};
      justify-content: ${this.justifyContent};
      column-gap: ${this.columnGap && `var(--wui-spacing-${this.columnGap})`};
      row-gap: ${this.rowGap && `var(--wui-spacing-${this.rowGap})`};
      gap: ${this.gap && `var(--wui-spacing-${this.gap})`};
      padding-top: ${this.padding && w.getSpacingStyles(this.padding, 0)};
      padding-right: ${this.padding && w.getSpacingStyles(this.padding, 1)};
      padding-bottom: ${this.padding && w.getSpacingStyles(this.padding, 2)};
      padding-left: ${this.padding && w.getSpacingStyles(this.padding, 3)};
      margin-top: ${this.margin && w.getSpacingStyles(this.margin, 0)};
      margin-right: ${this.margin && w.getSpacingStyles(this.margin, 1)};
      margin-bottom: ${this.margin && w.getSpacingStyles(this.margin, 2)};
      margin-left: ${this.margin && w.getSpacingStyles(this.margin, 3)};
    `, S`<slot></slot>`;
  }
};
p.styles = [z, rt];
u([
  c()
], p.prototype, "flexDirection", void 0);
u([
  c()
], p.prototype, "flexWrap", void 0);
u([
  c()
], p.prototype, "flexBasis", void 0);
u([
  c()
], p.prototype, "flexGrow", void 0);
u([
  c()
], p.prototype, "flexShrink", void 0);
u([
  c()
], p.prototype, "alignItems", void 0);
u([
  c()
], p.prototype, "justifyContent", void 0);
u([
  c()
], p.prototype, "columnGap", void 0);
u([
  c()
], p.prototype, "rowGap", void 0);
u([
  c()
], p.prototype, "gap", void 0);
u([
  c()
], p.prototype, "padding", void 0);
u([
  c()
], p.prototype, "margin", void 0);
p = u([
  T("wui-flex")
], p);
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ht = (t) => t ?? O;
export {
  w as U,
  j as a,
  T as c,
  ot as e,
  X as f,
  c as n,
  ht as o,
  st as r
};
