import { n as fe, s as Ke, T as O, o as Y, R as Ur, a as g, t as L, p as H, y as ae } from "./index-72zbi8DG.mjs";
import { b as Hr } from "./umd-ZG6ohAb2.mjs";
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Qe = window, Ht = Qe.ShadowRoot && (Qe.ShadyCSS === void 0 || Qe.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Bt = Symbol(), Ft = /* @__PURE__ */ new WeakMap();
let xr = class {
  constructor(e, r, i) {
    if (this._$cssResult$ = !0, i !== Bt)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = r;
  }
  get styleSheet() {
    let e = this.o;
    const r = this.t;
    if (Ht && e === void 0) {
      const i = r !== void 0 && r.length === 1;
      i && (e = Ft.get(r)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), i && Ft.set(r, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Br = (t) => new xr(typeof t == "string" ? t : t + "", void 0, Bt), C = (t, ...e) => {
  const r = t.length === 1 ? t[0] : e.reduce((i, o, n) => i + ((a) => {
    if (a._$cssResult$ === !0)
      return a.cssText;
    if (typeof a == "number")
      return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + t[n + 1], t[0]);
  return new xr(r, t, Bt);
}, Zr = (t, e) => {
  Ht ? t.adoptedStyleSheets = e.map((r) => r instanceof CSSStyleSheet ? r : r.styleSheet) : e.forEach((r) => {
    const i = document.createElement("style"), o = Qe.litNonce;
    o !== void 0 && i.setAttribute("nonce", o), i.textContent = r.cssText, t.appendChild(i);
  });
}, qt = Ht ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let r = "";
  for (const i of e.cssRules)
    r += i.cssText;
  return Br(r);
})(t) : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var rt;
const Ye = window, Kt = Ye.trustedTypes, zr = Kt ? Kt.emptyScript : "", Qt = Ye.reactiveElementPolyfillSupport, Rt = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? zr : null;
      break;
    case Object:
    case Array:
      t = t == null ? t : JSON.stringify(t);
  }
  return t;
}, fromAttribute(t, e) {
  let r = t;
  switch (e) {
    case Boolean:
      r = t !== null;
      break;
    case Number:
      r = t === null ? null : Number(t);
      break;
    case Object:
    case Array:
      try {
        r = JSON.parse(t);
      } catch {
        r = null;
      }
  }
  return r;
} }, $r = (t, e) => e !== t && (e == e || t == t), ot = { attribute: !0, type: String, converter: Rt, reflect: !1, hasChanged: $r }, Lt = "finalized";
let ue = class extends HTMLElement {
  constructor() {
    super(), this._$Ei = /* @__PURE__ */ new Map(), this.isUpdatePending = !1, this.hasUpdated = !1, this._$El = null, this._$Eu();
  }
  static addInitializer(e) {
    var r;
    this.finalize(), ((r = this.h) !== null && r !== void 0 ? r : this.h = []).push(e);
  }
  static get observedAttributes() {
    this.finalize();
    const e = [];
    return this.elementProperties.forEach((r, i) => {
      const o = this._$Ep(i, r);
      o !== void 0 && (this._$Ev.set(o, i), e.push(o));
    }), e;
  }
  static createProperty(e, r = ot) {
    if (r.state && (r.attribute = !1), this.finalize(), this.elementProperties.set(e, r), !r.noAccessor && !this.prototype.hasOwnProperty(e)) {
      const i = typeof e == "symbol" ? Symbol() : "__" + e, o = this.getPropertyDescriptor(e, i, r);
      o !== void 0 && Object.defineProperty(this.prototype, e, o);
    }
  }
  static getPropertyDescriptor(e, r, i) {
    return { get() {
      return this[r];
    }, set(o) {
      const n = this[e];
      this[r] = o, this.requestUpdate(e, n, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) || ot;
  }
  static finalize() {
    if (this.hasOwnProperty(Lt))
      return !1;
    this[Lt] = !0;
    const e = Object.getPrototypeOf(this);
    if (e.finalize(), e.h !== void 0 && (this.h = [...e.h]), this.elementProperties = new Map(e.elementProperties), this._$Ev = /* @__PURE__ */ new Map(), this.hasOwnProperty("properties")) {
      const r = this.properties, i = [...Object.getOwnPropertyNames(r), ...Object.getOwnPropertySymbols(r)];
      for (const o of i)
        this.createProperty(o, r[o]);
    }
    return this.elementStyles = this.finalizeStyles(this.styles), !0;
  }
  static finalizeStyles(e) {
    const r = [];
    if (Array.isArray(e)) {
      const i = new Set(e.flat(1 / 0).reverse());
      for (const o of i)
        r.unshift(qt(o));
    } else
      e !== void 0 && r.push(qt(e));
    return r;
  }
  static _$Ep(e, r) {
    const i = r.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  _$Eu() {
    var e;
    this._$E_ = new Promise((r) => this.enableUpdating = r), this._$AL = /* @__PURE__ */ new Map(), this._$Eg(), this.requestUpdate(), (e = this.constructor.h) === null || e === void 0 || e.forEach((r) => r(this));
  }
  addController(e) {
    var r, i;
    ((r = this._$ES) !== null && r !== void 0 ? r : this._$ES = []).push(e), this.renderRoot !== void 0 && this.isConnected && ((i = e.hostConnected) === null || i === void 0 || i.call(e));
  }
  removeController(e) {
    var r;
    (r = this._$ES) === null || r === void 0 || r.splice(this._$ES.indexOf(e) >>> 0, 1);
  }
  _$Eg() {
    this.constructor.elementProperties.forEach((e, r) => {
      this.hasOwnProperty(r) && (this._$Ei.set(r, this[r]), delete this[r]);
    });
  }
  createRenderRoot() {
    var e;
    const r = (e = this.shadowRoot) !== null && e !== void 0 ? e : this.attachShadow(this.constructor.shadowRootOptions);
    return Zr(r, this.constructor.elementStyles), r;
  }
  connectedCallback() {
    var e;
    this.renderRoot === void 0 && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (e = this._$ES) === null || e === void 0 || e.forEach((r) => {
      var i;
      return (i = r.hostConnected) === null || i === void 0 ? void 0 : i.call(r);
    });
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    var e;
    (e = this._$ES) === null || e === void 0 || e.forEach((r) => {
      var i;
      return (i = r.hostDisconnected) === null || i === void 0 ? void 0 : i.call(r);
    });
  }
  attributeChangedCallback(e, r, i) {
    this._$AK(e, i);
  }
  _$EO(e, r, i = ot) {
    var o;
    const n = this.constructor._$Ep(e, i);
    if (n !== void 0 && i.reflect === !0) {
      const a = (((o = i.converter) === null || o === void 0 ? void 0 : o.toAttribute) !== void 0 ? i.converter : Rt).toAttribute(r, i.type);
      this._$El = e, a == null ? this.removeAttribute(n) : this.setAttribute(n, a), this._$El = null;
    }
  }
  _$AK(e, r) {
    var i;
    const o = this.constructor, n = o._$Ev.get(e);
    if (n !== void 0 && this._$El !== n) {
      const a = o.getPropertyOptions(n), s = typeof a.converter == "function" ? { fromAttribute: a.converter } : ((i = a.converter) === null || i === void 0 ? void 0 : i.fromAttribute) !== void 0 ? a.converter : Rt;
      this._$El = n, this[n] = s.fromAttribute(r, a.type), this._$El = null;
    }
  }
  requestUpdate(e, r, i) {
    let o = !0;
    e !== void 0 && (((i = i || this.constructor.getPropertyOptions(e)).hasChanged || $r)(this[e], r) ? (this._$AL.has(e) || this._$AL.set(e, r), i.reflect === !0 && this._$El !== e && (this._$EC === void 0 && (this._$EC = /* @__PURE__ */ new Map()), this._$EC.set(e, i))) : o = !1), !this.isUpdatePending && o && (this._$E_ = this._$Ej());
  }
  async _$Ej() {
    this.isUpdatePending = !0;
    try {
      await this._$E_;
    } catch (r) {
      Promise.reject(r);
    }
    const e = this.scheduleUpdate();
    return e != null && await e, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var e;
    if (!this.isUpdatePending)
      return;
    this.hasUpdated, this._$Ei && (this._$Ei.forEach((o, n) => this[n] = o), this._$Ei = void 0);
    let r = !1;
    const i = this._$AL;
    try {
      r = this.shouldUpdate(i), r ? (this.willUpdate(i), (e = this._$ES) === null || e === void 0 || e.forEach((o) => {
        var n;
        return (n = o.hostUpdate) === null || n === void 0 ? void 0 : n.call(o);
      }), this.update(i)) : this._$Ek();
    } catch (o) {
      throw r = !1, this._$Ek(), o;
    }
    r && this._$AE(i);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    var r;
    (r = this._$ES) === null || r === void 0 || r.forEach((i) => {
      var o;
      return (o = i.hostUpdated) === null || o === void 0 ? void 0 : o.call(i);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
  }
  _$Ek() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$E_;
  }
  shouldUpdate(e) {
    return !0;
  }
  update(e) {
    this._$EC !== void 0 && (this._$EC.forEach((r, i) => this._$EO(i, this[i], r)), this._$EC = void 0), this._$Ek();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
};
ue[Lt] = !0, ue.elementProperties = /* @__PURE__ */ new Map(), ue.elementStyles = [], ue.shadowRootOptions = { mode: "open" }, Qt == null || Qt({ ReactiveElement: ue }), ((rt = Ye.reactiveElementVersions) !== null && rt !== void 0 ? rt : Ye.reactiveElementVersions = []).push("1.6.3");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var it;
const Ge = window, be = Ge.trustedTypes, Yt = be ? be.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, Wt = "$lit$", Q = `lit$${(Math.random() + "").slice(9)}$`, Cr = "?" + Q, Vr = `<${Cr}>`, se = document, Se = () => se.createComment(""), Re = (t) => t === null || typeof t != "object" && typeof t != "function", Ar = Array.isArray, Fr = (t) => Ar(t) || typeof (t == null ? void 0 : t[Symbol.iterator]) == "function", nt = `[ 	
\f\r]`, Ce = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Gt = /-->/g, Xt = />/g, ee = RegExp(`>|${nt}(?:([^\\s"'>=/]+)(${nt}*=${nt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Jt = /'/g, er = /"/g, _r = /^(?:script|style|textarea|title)$/i, Er = (t) => (e, ...r) => ({ _$litType$: t, strings: e, values: r }), l = Er(1), E = Er(2), le = Symbol.for("lit-noChange"), P = Symbol.for("lit-nothing"), tr = /* @__PURE__ */ new WeakMap(), ie = se.createTreeWalker(se, 129, null, !1);
function Or(t, e) {
  if (!Array.isArray(t) || !t.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return Yt !== void 0 ? Yt.createHTML(e) : e;
}
const qr = (t, e) => {
  const r = t.length - 1, i = [];
  let o, n = e === 2 ? "<svg>" : "", a = Ce;
  for (let s = 0; s < r; s++) {
    const c = t[s];
    let d, x, $ = -1, m = 0;
    for (; m < c.length && (a.lastIndex = m, x = a.exec(c), x !== null); )
      m = a.lastIndex, a === Ce ? x[1] === "!--" ? a = Gt : x[1] !== void 0 ? a = Xt : x[2] !== void 0 ? (_r.test(x[2]) && (o = RegExp("</" + x[2], "g")), a = ee) : x[3] !== void 0 && (a = ee) : a === ee ? x[0] === ">" ? (a = o ?? Ce, $ = -1) : x[1] === void 0 ? $ = -2 : ($ = a.lastIndex - x[2].length, d = x[1], a = x[3] === void 0 ? ee : x[3] === '"' ? er : Jt) : a === er || a === Jt ? a = ee : a === Gt || a === Xt ? a = Ce : (a = ee, o = void 0);
    const _ = a === ee && t[s + 1].startsWith("/>") ? " " : "";
    n += a === Ce ? c + Vr : $ >= 0 ? (i.push(d), c.slice(0, $) + Wt + c.slice($) + Q + _) : c + Q + ($ === -2 ? (i.push(void 0), s) : _);
  }
  return [Or(t, n + (t[r] || "<?>") + (e === 2 ? "</svg>" : "")), i];
};
class Le {
  constructor({ strings: e, _$litType$: r }, i) {
    let o;
    this.parts = [];
    let n = 0, a = 0;
    const s = e.length - 1, c = this.parts, [d, x] = qr(e, r);
    if (this.el = Le.createElement(d, i), ie.currentNode = this.el.content, r === 2) {
      const $ = this.el.content, m = $.firstChild;
      m.remove(), $.append(...m.childNodes);
    }
    for (; (o = ie.nextNode()) !== null && c.length < s; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) {
          const $ = [];
          for (const m of o.getAttributeNames())
            if (m.endsWith(Wt) || m.startsWith(Q)) {
              const _ = x[a++];
              if ($.push(m), _ !== void 0) {
                const f = o.getAttribute(_.toLowerCase() + Wt).split(Q), u = /([.?@])?(.*)/.exec(_);
                c.push({ type: 1, index: n, name: u[2], strings: f, ctor: u[1] === "." ? Qr : u[1] === "?" ? Gr : u[1] === "@" ? Xr : tt });
              } else
                c.push({ type: 6, index: n });
            }
          for (const m of $)
            o.removeAttribute(m);
        }
        if (_r.test(o.tagName)) {
          const $ = o.textContent.split(Q), m = $.length - 1;
          if (m > 0) {
            o.textContent = be ? be.emptyScript : "";
            for (let _ = 0; _ < m; _++)
              o.append($[_], Se()), ie.nextNode(), c.push({ type: 2, index: ++n });
            o.append($[m], Se());
          }
        }
      } else if (o.nodeType === 8)
        if (o.data === Cr)
          c.push({ type: 2, index: n });
        else {
          let $ = -1;
          for (; ($ = o.data.indexOf(Q, $ + 1)) !== -1; )
            c.push({ type: 7, index: n }), $ += Q.length - 1;
        }
      n++;
    }
  }
  static createElement(e, r) {
    const i = se.createElement("template");
    return i.innerHTML = e, i;
  }
}
function ye(t, e, r = t, i) {
  var o, n, a, s;
  if (e === le)
    return e;
  let c = i !== void 0 ? (o = r._$Co) === null || o === void 0 ? void 0 : o[i] : r._$Cl;
  const d = Re(e) ? void 0 : e._$litDirective$;
  return (c == null ? void 0 : c.constructor) !== d && ((n = c == null ? void 0 : c._$AO) === null || n === void 0 || n.call(c, !1), d === void 0 ? c = void 0 : (c = new d(t), c._$AT(t, r, i)), i !== void 0 ? ((a = (s = r)._$Co) !== null && a !== void 0 ? a : s._$Co = [])[i] = c : r._$Cl = c), c !== void 0 && (e = ye(t, c._$AS(t, e.values), c, i)), e;
}
class Kr {
  constructor(e, r) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = r;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    var r;
    const { el: { content: i }, parts: o } = this._$AD, n = ((r = e == null ? void 0 : e.creationScope) !== null && r !== void 0 ? r : se).importNode(i, !0);
    ie.currentNode = n;
    let a = ie.nextNode(), s = 0, c = 0, d = o[0];
    for (; d !== void 0; ) {
      if (s === d.index) {
        let x;
        d.type === 2 ? x = new De(a, a.nextSibling, this, e) : d.type === 1 ? x = new d.ctor(a, d.name, d.strings, this, e) : d.type === 6 && (x = new Jr(a, this, e)), this._$AV.push(x), d = o[++c];
      }
      s !== (d == null ? void 0 : d.index) && (a = ie.nextNode(), s++);
    }
    return ie.currentNode = se, n;
  }
  v(e) {
    let r = 0;
    for (const i of this._$AV)
      i !== void 0 && (i.strings !== void 0 ? (i._$AI(e, i, r), r += i.strings.length - 2) : i._$AI(e[r])), r++;
  }
}
class De {
  constructor(e, r, i, o) {
    var n;
    this.type = 2, this._$AH = P, this._$AN = void 0, this._$AA = e, this._$AB = r, this._$AM = i, this.options = o, this._$Cp = (n = o == null ? void 0 : o.isConnected) === null || n === void 0 || n;
  }
  get _$AU() {
    var e, r;
    return (r = (e = this._$AM) === null || e === void 0 ? void 0 : e._$AU) !== null && r !== void 0 ? r : this._$Cp;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const r = this._$AM;
    return r !== void 0 && (e == null ? void 0 : e.nodeType) === 11 && (e = r.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, r = this) {
    e = ye(this, e, r), Re(e) ? e === P || e == null || e === "" ? (this._$AH !== P && this._$AR(), this._$AH = P) : e !== this._$AH && e !== le && this._(e) : e._$litType$ !== void 0 ? this.g(e) : e.nodeType !== void 0 ? this.$(e) : Fr(e) ? this.T(e) : this._(e);
  }
  k(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  $(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.k(e));
  }
  _(e) {
    this._$AH !== P && Re(this._$AH) ? this._$AA.nextSibling.data = e : this.$(se.createTextNode(e)), this._$AH = e;
  }
  g(e) {
    var r;
    const { values: i, _$litType$: o } = e, n = typeof o == "number" ? this._$AC(e) : (o.el === void 0 && (o.el = Le.createElement(Or(o.h, o.h[0]), this.options)), o);
    if (((r = this._$AH) === null || r === void 0 ? void 0 : r._$AD) === n)
      this._$AH.v(i);
    else {
      const a = new Kr(n, this), s = a.u(this.options);
      a.v(i), this.$(s), this._$AH = a;
    }
  }
  _$AC(e) {
    let r = tr.get(e.strings);
    return r === void 0 && tr.set(e.strings, r = new Le(e)), r;
  }
  T(e) {
    Ar(this._$AH) || (this._$AH = [], this._$AR());
    const r = this._$AH;
    let i, o = 0;
    for (const n of e)
      o === r.length ? r.push(i = new De(this.k(Se()), this.k(Se()), this, this.options)) : i = r[o], i._$AI(n), o++;
    o < r.length && (this._$AR(i && i._$AB.nextSibling, o), r.length = o);
  }
  _$AR(e = this._$AA.nextSibling, r) {
    var i;
    for ((i = this._$AP) === null || i === void 0 || i.call(this, !1, !0, r); e && e !== this._$AB; ) {
      const o = e.nextSibling;
      e.remove(), e = o;
    }
  }
  setConnected(e) {
    var r;
    this._$AM === void 0 && (this._$Cp = e, (r = this._$AP) === null || r === void 0 || r.call(this, e));
  }
}
class tt {
  constructor(e, r, i, o, n) {
    this.type = 1, this._$AH = P, this._$AN = void 0, this.element = e, this.name = r, this._$AM = o, this.options = n, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = P;
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e, r = this, i, o) {
    const n = this.strings;
    let a = !1;
    if (n === void 0)
      e = ye(this, e, r, 0), a = !Re(e) || e !== this._$AH && e !== le, a && (this._$AH = e);
    else {
      const s = e;
      let c, d;
      for (e = n[0], c = 0; c < n.length - 1; c++)
        d = ye(this, s[i + c], r, c), d === le && (d = this._$AH[c]), a || (a = !Re(d) || d !== this._$AH[c]), d === P ? e = P : e !== P && (e += (d ?? "") + n[c + 1]), this._$AH[c] = d;
    }
    a && !o && this.j(e);
  }
  j(e) {
    e === P ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class Qr extends tt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === P ? void 0 : e;
  }
}
const Yr = be ? be.emptyScript : "";
let Gr = class extends tt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    e && e !== P ? this.element.setAttribute(this.name, Yr) : this.element.removeAttribute(this.name);
  }
};
class Xr extends tt {
  constructor(e, r, i, o, n) {
    super(e, r, i, o, n), this.type = 5;
  }
  _$AI(e, r = this) {
    var i;
    if ((e = (i = ye(this, e, r, 0)) !== null && i !== void 0 ? i : P) === le)
      return;
    const o = this._$AH, n = e === P && o !== P || e.capture !== o.capture || e.once !== o.once || e.passive !== o.passive, a = e !== P && (o === P || n);
    n && this.element.removeEventListener(this.name, this, o), a && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var r, i;
    typeof this._$AH == "function" ? this._$AH.call((i = (r = this.options) === null || r === void 0 ? void 0 : r.host) !== null && i !== void 0 ? i : this.element, e) : this._$AH.handleEvent(e);
  }
}
let Jr = class {
  constructor(e, r, i) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = r, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    ye(this, e);
  }
};
const rr = Ge.litHtmlPolyfillSupport;
rr == null || rr(Le, De), ((it = Ge.litHtmlVersions) !== null && it !== void 0 ? it : Ge.litHtmlVersions = []).push("2.8.0");
const eo = (t, e, r) => {
  var i, o;
  const n = (i = r == null ? void 0 : r.renderBefore) !== null && i !== void 0 ? i : e;
  let a = n._$litPart$;
  if (a === void 0) {
    const s = (o = r == null ? void 0 : r.renderBefore) !== null && o !== void 0 ? o : null;
    n._$litPart$ = a = new De(e.insertBefore(Se(), s), s, void 0, r ?? {});
  }
  return a._$AI(t), a;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var at, st;
class w extends ue {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var e, r;
    const i = super.createRenderRoot();
    return (e = (r = this.renderOptions).renderBefore) !== null && e !== void 0 || (r.renderBefore = i.firstChild), i;
  }
  update(e) {
    const r = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = eo(r, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var e;
    super.connectedCallback(), (e = this._$Do) === null || e === void 0 || e.setConnected(!0);
  }
  disconnectedCallback() {
    var e;
    super.disconnectedCallback(), (e = this._$Do) === null || e === void 0 || e.setConnected(!1);
  }
  render() {
    return le;
  }
}
w.finalized = !0, w._$litElement$ = !0, (at = globalThis.litElementHydrateSupport) === null || at === void 0 || at.call(globalThis, { LitElement: w });
const or = globalThis.litElementPolyfillSupport;
or == null || or({ LitElement: w });
((st = globalThis.litElementVersions) !== null && st !== void 0 ? st : globalThis.litElementVersions = []).push("3.3.3");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const y = (t) => (e) => typeof e == "function" ? ((r, i) => (customElements.define(r, i), i))(t, e) : ((r, i) => {
  const { kind: o, elements: n } = i;
  return { kind: o, elements: n, finisher(a) {
    customElements.define(r, a);
  } };
})(t, e);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const to = (t, e) => e.kind === "method" && e.descriptor && !("value" in e.descriptor) ? { ...e, finisher(r) {
  r.createProperty(e.key, t);
} } : { kind: "field", key: Symbol(), placement: "own", descriptor: {}, originalKey: e.key, initializer() {
  typeof e.initializer == "function" && (this[e.key] = e.initializer.call(this));
}, finisher(r) {
  r.createProperty(e.key, t);
} }, ro = (t, e, r) => {
  e.constructor.createProperty(r, t);
};
function p(t) {
  return (e, r) => r !== void 0 ? ro(t, e, r) : to(t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function W(t) {
  return p({ ...t, state: !0 });
}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var lt;
((lt = window.HTMLSlotElement) === null || lt === void 0 ? void 0 : lt.prototype.assignedElements) != null;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const oo = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 }, io = (t) => (...e) => ({ _$litDirective$: t, values: e });
class no {
  constructor(e) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(e, r, i) {
    this._$Ct = e, this._$AM = r, this._$Ci = i;
  }
  _$AS(e, r) {
    return this.update(e, r);
  }
  update(e, r) {
    return this.render(...r);
  }
}
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Z = io(class extends no {
  constructor(t) {
    var e;
    if (super(t), t.type !== oo.ATTRIBUTE || t.name !== "class" || ((e = t.strings) === null || e === void 0 ? void 0 : e.length) > 2)
      throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
  }
  render(t) {
    return " " + Object.keys(t).filter((e) => t[e]).join(" ") + " ";
  }
  update(t, [e]) {
    var r, i;
    if (this.it === void 0) {
      this.it = /* @__PURE__ */ new Set(), t.strings !== void 0 && (this.nt = new Set(t.strings.join(" ").split(/\s/).filter((n) => n !== "")));
      for (const n in e)
        e[n] && !(!((r = this.nt) === null || r === void 0) && r.has(n)) && this.it.add(n);
      return this.render(e);
    }
    const o = t.element.classList;
    this.it.forEach((n) => {
      n in e || (o.remove(n), this.it.delete(n));
    });
    for (const n in e) {
      const a = !!e[n];
      a === this.it.has(n) || !((i = this.nt) === null || i === void 0) && i.has(n) || (a ? (o.add(n), this.it.add(n)) : (o.remove(n), this.it.delete(n)));
    }
    return le;
  }
});
function ao(t, e) {
  t.indexOf(e) === -1 && t.push(e);
}
const kr = (t, e, r) => Math.min(Math.max(r, t), e), j = {
  duration: 0.3,
  delay: 0,
  endDelay: 0,
  repeat: 0,
  easing: "ease"
}, Xe = (t) => typeof t == "number", we = (t) => Array.isArray(t) && !Xe(t[0]), so = (t, e, r) => {
  const i = e - t;
  return ((r - t) % i + i) % i + t;
};
function lo(t, e) {
  return we(t) ? t[so(0, t.length, e)] : t;
}
const Ir = (t, e, r) => -r * t + r * e + t, Tr = () => {
}, G = (t) => t, Zt = (t, e, r) => e - t === 0 ? 1 : (r - t) / (e - t);
function Pr(t, e) {
  const r = t[t.length - 1];
  for (let i = 1; i <= e; i++) {
    const o = Zt(0, e, i);
    t.push(Ir(r, 1, o));
  }
}
function co(t) {
  const e = [0];
  return Pr(e, t - 1), e;
}
function ho(t, e = co(t.length), r = G) {
  const i = t.length, o = i - e.length;
  return o > 0 && Pr(e, o), (n) => {
    let a = 0;
    for (; a < i - 2 && !(n < e[a + 1]); a++)
      ;
    let s = kr(0, 1, Zt(e[a], e[a + 1], n));
    return s = lo(r, a)(s), Ir(t[a], t[a + 1], s);
  };
}
const Mr = (t) => Array.isArray(t) && Xe(t[0]), Dt = (t) => typeof t == "object" && !!t.createAnimation, xe = (t) => typeof t == "function", mo = (t) => typeof t == "string", Me = {
  ms: (t) => t * 1e3,
  s: (t) => t / 1e3
}, Sr = (t, e, r) => (((1 - 3 * r + 3 * e) * t + (3 * r - 6 * e)) * t + 3 * e) * t, po = 1e-7, uo = 12;
function go(t, e, r, i, o) {
  let n, a, s = 0;
  do
    a = e + (r - e) / 2, n = Sr(a, i, o) - t, n > 0 ? r = a : e = a;
  while (Math.abs(n) > po && ++s < uo);
  return a;
}
function Pe(t, e, r, i) {
  if (t === e && r === i)
    return G;
  const o = (n) => go(n, 0, 1, t, r);
  return (n) => n === 0 || n === 1 ? n : Sr(o(n), e, i);
}
const wo = (t, e = "end") => (r) => {
  r = e === "end" ? Math.min(r, 0.999) : Math.max(r, 1e-3);
  const i = r * t, o = e === "end" ? Math.floor(i) : Math.ceil(i);
  return kr(0, 1, o / t);
}, ir = {
  ease: Pe(0.25, 0.1, 0.25, 1),
  "ease-in": Pe(0.42, 0, 1, 1),
  "ease-in-out": Pe(0.42, 0, 0.58, 1),
  "ease-out": Pe(0, 0, 0.58, 1)
}, vo = /\((.*?)\)/;
function nr(t) {
  if (xe(t))
    return t;
  if (Mr(t))
    return Pe(...t);
  if (ir[t])
    return ir[t];
  if (t.startsWith("steps")) {
    const e = vo.exec(t);
    if (e) {
      const r = e[1].split(",");
      return wo(parseFloat(r[0]), r[1].trim());
    }
  }
  return G;
}
class Rr {
  constructor(e, r = [0, 1], { easing: i, duration: o = j.duration, delay: n = j.delay, endDelay: a = j.endDelay, repeat: s = j.repeat, offset: c, direction: d = "normal", autoplay: x = !0 } = {}) {
    if (this.startTime = null, this.rate = 1, this.t = 0, this.cancelTimestamp = null, this.easing = G, this.duration = 0, this.totalDuration = 0, this.repeat = 0, this.playState = "idle", this.finished = new Promise((m, _) => {
      this.resolve = m, this.reject = _;
    }), i = i || j.easing, Dt(i)) {
      const m = i.createAnimation(r);
      i = m.easing, r = m.keyframes || r, o = m.duration || o;
    }
    this.repeat = s, this.easing = we(i) ? G : nr(i), this.updateDuration(o);
    const $ = ho(r, c, we(i) ? i.map(nr) : G);
    this.tick = (m) => {
      var _;
      n = n;
      let f = 0;
      this.pauseTime !== void 0 ? f = this.pauseTime : f = (m - this.startTime) * this.rate, this.t = f, f /= 1e3, f = Math.max(f - n, 0), this.playState === "finished" && this.pauseTime === void 0 && (f = this.totalDuration);
      const u = f / this.duration;
      let I = Math.floor(u), b = u % 1;
      !b && u >= 1 && (b = 1), b === 1 && I--;
      const M = I % 2;
      (d === "reverse" || d === "alternate" && M || d === "alternate-reverse" && !M) && (b = 1 - b);
      const S = f >= this.totalDuration ? 1 : Math.min(b, 1), D = $(this.easing(S));
      e(D), this.pauseTime === void 0 && (this.playState === "finished" || f >= this.totalDuration + a) ? (this.playState = "finished", (_ = this.resolve) === null || _ === void 0 || _.call(this, D)) : this.playState !== "idle" && (this.frameRequestId = requestAnimationFrame(this.tick));
    }, x && this.play();
  }
  play() {
    const e = performance.now();
    this.playState = "running", this.pauseTime !== void 0 ? this.startTime = e - this.pauseTime : this.startTime || (this.startTime = e), this.cancelTimestamp = this.startTime, this.pauseTime = void 0, this.frameRequestId = requestAnimationFrame(this.tick);
  }
  pause() {
    this.playState = "paused", this.pauseTime = this.t;
  }
  finish() {
    this.playState = "finished", this.tick(0);
  }
  stop() {
    var e;
    this.playState = "idle", this.frameRequestId !== void 0 && cancelAnimationFrame(this.frameRequestId), (e = this.reject) === null || e === void 0 || e.call(this, !1);
  }
  cancel() {
    this.stop(), this.tick(this.cancelTimestamp);
  }
  reverse() {
    this.rate *= -1;
  }
  commitStyles() {
  }
  updateDuration(e) {
    this.duration = e, this.totalDuration = e * (this.repeat + 1);
  }
  get currentTime() {
    return this.t;
  }
  set currentTime(e) {
    this.pauseTime !== void 0 || this.rate === 0 ? this.pauseTime = e : this.startTime = performance.now() - e / this.rate;
  }
  get playbackRate() {
    return this.rate;
  }
  set playbackRate(e) {
    this.rate = e;
  }
}
var jt = function() {
};
process.env.NODE_ENV !== "production" && (jt = function(t, e) {
  if (!t)
    throw new Error(e);
});
class fo {
  setAnimation(e) {
    this.animation = e, e == null || e.finished.then(() => this.clearAnimation()).catch(() => {
    });
  }
  clearAnimation() {
    this.animation = this.generator = void 0;
  }
}
const ct = /* @__PURE__ */ new WeakMap();
function Lr(t) {
  return ct.has(t) || ct.set(t, {
    transforms: [],
    values: /* @__PURE__ */ new Map()
  }), ct.get(t);
}
function bo(t, e) {
  return t.has(e) || t.set(e, new fo()), t.get(e);
}
const yo = ["", "X", "Y", "Z"], xo = ["translate", "scale", "rotate", "skew"], Je = {
  x: "translateX",
  y: "translateY",
  z: "translateZ"
}, ar = {
  syntax: "<angle>",
  initialValue: "0deg",
  toDefaultUnit: (t) => t + "deg"
}, $o = {
  translate: {
    syntax: "<length-percentage>",
    initialValue: "0px",
    toDefaultUnit: (t) => t + "px"
  },
  rotate: ar,
  scale: {
    syntax: "<number>",
    initialValue: 1,
    toDefaultUnit: G
  },
  skew: ar
}, We = /* @__PURE__ */ new Map(), zt = (t) => `--motion-${t}`, et = ["x", "y", "z"];
xo.forEach((t) => {
  yo.forEach((e) => {
    et.push(t + e), We.set(zt(t + e), $o[t]);
  });
});
const Co = (t, e) => et.indexOf(t) - et.indexOf(e), Ao = new Set(et), Wr = (t) => Ao.has(t), _o = (t, e) => {
  Je[e] && (e = Je[e]);
  const { transforms: r } = Lr(t);
  ao(r, e), t.style.transform = Eo(r);
}, Eo = (t) => t.sort(Co).reduce(Oo, "").trim(), Oo = (t, e) => `${t} ${e}(var(${zt(e)}))`, Nt = (t) => t.startsWith("--"), sr = /* @__PURE__ */ new Set();
function ko(t) {
  if (!sr.has(t)) {
    sr.add(t);
    try {
      const { syntax: e, initialValue: r } = We.has(t) ? We.get(t) : {};
      CSS.registerProperty({
        name: t,
        inherits: !1,
        syntax: e,
        initialValue: r
      });
    } catch {
    }
  }
}
const dt = (t, e) => document.createElement("div").animate(t, e), lr = {
  cssRegisterProperty: () => typeof CSS < "u" && Object.hasOwnProperty.call(CSS, "registerProperty"),
  waapi: () => Object.hasOwnProperty.call(Element.prototype, "animate"),
  partialKeyframes: () => {
    try {
      dt({ opacity: [1] });
    } catch {
      return !1;
    }
    return !0;
  },
  finished: () => !!dt({ opacity: [0, 1] }, { duration: 1e-3 }).finished,
  linearEasing: () => {
    try {
      dt({ opacity: 0 }, { easing: "linear(0, 1)" });
    } catch {
      return !1;
    }
    return !0;
  }
}, ht = {}, ge = {};
for (const t in lr)
  ge[t] = () => (ht[t] === void 0 && (ht[t] = lr[t]()), ht[t]);
const Io = 0.015, To = (t, e) => {
  let r = "";
  const i = Math.round(e / Io);
  for (let o = 0; o < i; o++)
    r += t(Zt(0, i - 1, o)) + ", ";
  return r.substring(0, r.length - 2);
}, cr = (t, e) => xe(t) ? ge.linearEasing() ? `linear(${To(t, e)})` : j.easing : Mr(t) ? Po(t) : t, Po = ([t, e, r, i]) => `cubic-bezier(${t}, ${e}, ${r}, ${i})`;
function Mo(t, e) {
  for (let r = 0; r < t.length; r++)
    t[r] === null && (t[r] = r ? t[r - 1] : e());
  return t;
}
const So = (t) => Array.isArray(t) ? t : [t];
function Ut(t) {
  return Je[t] && (t = Je[t]), Wr(t) ? zt(t) : t;
}
const Ue = {
  get: (t, e) => {
    e = Ut(e);
    let r = Nt(e) ? t.style.getPropertyValue(e) : getComputedStyle(t)[e];
    if (!r && r !== 0) {
      const i = We.get(e);
      i && (r = i.initialValue);
    }
    return r;
  },
  set: (t, e, r) => {
    e = Ut(e), Nt(e) ? t.style.setProperty(e, r) : t.style[e] = r;
  }
};
function Dr(t, e = !0) {
  if (!(!t || t.playState === "finished"))
    try {
      t.stop ? t.stop() : (e && t.commitStyles(), t.cancel());
    } catch {
    }
}
function Ro(t, e) {
  var r;
  let i = (e == null ? void 0 : e.toDefaultUnit) || G;
  const o = t[t.length - 1];
  if (mo(o)) {
    const n = ((r = o.match(/(-?[\d.]+)([a-z%]*)/)) === null || r === void 0 ? void 0 : r[2]) || "";
    n && (i = (a) => a + n);
  }
  return i;
}
function Lo() {
  return window.__MOTION_DEV_TOOLS_RECORD;
}
function Wo(t, e, r, i = {}, o) {
  const n = Lo(), a = i.record !== !1 && n;
  let s, { duration: c = j.duration, delay: d = j.delay, endDelay: x = j.endDelay, repeat: $ = j.repeat, easing: m = j.easing, persist: _ = !1, direction: f, offset: u, allowWebkitAcceleration: I = !1, autoplay: b = !0 } = i;
  const M = Lr(t), S = Wr(e);
  let D = ge.waapi();
  S && _o(t, e);
  const N = Ut(e), je = bo(M.values, N), z = We.get(N);
  return Dr(je.animation, !(Dt(m) && je.generator) && i.record !== !1), () => {
    const Ne = () => {
      var k, $e;
      return ($e = (k = Ue.get(t, N)) !== null && k !== void 0 ? k : z == null ? void 0 : z.initialValue) !== null && $e !== void 0 ? $e : 0;
    };
    let T = Mo(So(r), Ne);
    const Vt = Ro(T, z);
    if (Dt(m)) {
      const k = m.createAnimation(T, e !== "opacity", Ne, N, je);
      m = k.easing, T = k.keyframes || T, c = k.duration || c;
    }
    if (Nt(N) && (ge.cssRegisterProperty() ? ko(N) : D = !1), S && !ge.linearEasing() && (xe(m) || we(m) && m.some(xe)) && (D = !1), D) {
      z && (T = T.map((J) => Xe(J) ? z.toDefaultUnit(J) : J)), T.length === 1 && (!ge.partialKeyframes() || a) && T.unshift(Ne());
      const k = {
        delay: Me.ms(d),
        duration: Me.ms(c),
        endDelay: Me.ms(x),
        easing: we(m) ? void 0 : cr(m, c),
        direction: f,
        iterations: $ + 1,
        fill: "both"
      };
      s = t.animate({
        [N]: T,
        offset: u,
        easing: we(m) ? m.map((J) => cr(J, c)) : void 0
      }, k), s.finished || (s.finished = new Promise((J, Nr) => {
        s.onfinish = J, s.oncancel = Nr;
      }));
      const $e = T[T.length - 1];
      s.finished.then(() => {
        _ || (Ue.set(t, N, $e), s.cancel());
      }).catch(Tr), I || (s.playbackRate = 1.000001);
    } else if (o && S)
      T = T.map((k) => typeof k == "string" ? parseFloat(k) : k), T.length === 1 && T.unshift(parseFloat(Ne())), s = new o((k) => {
        Ue.set(t, N, Vt ? Vt(k) : k);
      }, T, Object.assign(Object.assign({}, i), {
        duration: c,
        easing: m
      }));
    else {
      const k = T[T.length - 1];
      Ue.set(t, N, z && Xe(k) ? z.toDefaultUnit(k) : k);
    }
    return a && n(t, e, T, {
      duration: c,
      delay: d,
      easing: m,
      repeat: $,
      offset: u
    }, "motion-one"), je.setAnimation(s), s && !b && s.pause(), s;
  };
}
const Do = (t, e) => (
  /**
   * TODO: Make test for this
   * Always return a new object otherwise delay is overwritten by results of stagger
   * and this results in no stagger
   */
  t[e] ? Object.assign(Object.assign({}, t), t[e]) : Object.assign({}, t)
);
function jo(t, e) {
  var r;
  return typeof t == "string" ? e ? ((r = e[t]) !== null && r !== void 0 || (e[t] = document.querySelectorAll(t)), t = e[t]) : t = document.querySelectorAll(t) : t instanceof Element && (t = [t]), Array.from(t || []);
}
const No = (t) => t(), jr = (t, e, r = j.duration) => new Proxy({
  animations: t.map(No).filter(Boolean),
  duration: r,
  options: e
}, Ho), Uo = (t) => t.animations[0], Ho = {
  get: (t, e) => {
    const r = Uo(t);
    switch (e) {
      case "duration":
        return t.duration;
      case "currentTime":
        return Me.s((r == null ? void 0 : r[e]) || 0);
      case "playbackRate":
      case "playState":
        return r == null ? void 0 : r[e];
      case "finished":
        return t.finished || (t.finished = Promise.all(t.animations.map(Bo)).catch(Tr)), t.finished;
      case "stop":
        return () => {
          t.animations.forEach((i) => Dr(i));
        };
      case "forEachNative":
        return (i) => {
          t.animations.forEach((o) => i(o, t));
        };
      default:
        return typeof (r == null ? void 0 : r[e]) > "u" ? void 0 : () => t.animations.forEach((i) => i[e]());
    }
  },
  set: (t, e, r) => {
    switch (e) {
      case "currentTime":
        r = Me.ms(r);
      case "playbackRate":
        for (let i = 0; i < t.animations.length; i++)
          t.animations[i][e] = r;
        return !0;
    }
    return !1;
  }
}, Bo = (t) => t.finished;
function Zo(t, e, r) {
  return xe(t) ? t(e, r) : t;
}
function zo(t) {
  return function(r, i, o = {}) {
    r = jo(r);
    const n = r.length;
    jt(!!n, "No valid element provided."), jt(!!i, "No keyframes defined.");
    const a = [];
    for (let s = 0; s < n; s++) {
      const c = r[s];
      for (const d in i) {
        const x = Do(o, d);
        x.delay = Zo(x.delay, s, n);
        const $ = Wo(c, d, i[d], x, t);
        a.push($);
      }
    }
    return jr(
      a,
      o,
      /**
       * TODO:
       * If easing is set to spring or glide, duration will be dynamically
       * generated. Ideally we would dynamically generate this from
       * animation.effect.getComputedTiming().duration but this isn't
       * supported in iOS13 or our number polyfill. Perhaps it's possible
       * to Proxy animations returned from animateStyle that has duration
       * as a getter.
       */
      o.duration
    );
  };
}
const Vo = zo(Rr);
function Fo(t, e = {}) {
  return jr([
    () => {
      const r = new Rr(t, [0, 1], e);
      return r.finished.catch(() => {
      }), r;
    }
  ], e, e.duration);
}
function ne(t, e, r) {
  return (xe(t) ? Fo : Vo)(t, e, r);
}
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const R = (t) => t ?? P;
var qo = Object.defineProperty, dr = Object.getOwnPropertySymbols, Ko = Object.prototype.hasOwnProperty, Qo = Object.prototype.propertyIsEnumerable, hr = (t, e, r) => e in t ? qo(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r, mt = (t, e) => {
  for (var r in e || (e = {}))
    Ko.call(e, r) && hr(t, r, e[r]);
  if (dr)
    for (var r of dr(e))
      Qo.call(e, r) && hr(t, r, e[r]);
  return t;
};
function Yo() {
  var t;
  const e = (t = fe.state.themeMode) != null ? t : "dark", r = { light: { foreground: { 1: "rgb(20,20,20)", 2: "rgb(121,134,134)", 3: "rgb(158,169,169)" }, background: { 1: "rgb(255,255,255)", 2: "rgb(241,243,243)", 3: "rgb(228,231,231)" }, overlay: "rgba(0,0,0,0.1)" }, dark: { foreground: { 1: "rgb(228,231,231)", 2: "rgb(148,158,158)", 3: "rgb(110,119,119)" }, background: { 1: "rgb(20,20,20)", 2: "rgb(39,42,42)", 3: "rgb(59,64,64)" }, overlay: "rgba(255,255,255,0.1)" } }[e];
  return { "--wcm-color-fg-1": r.foreground[1], "--wcm-color-fg-2": r.foreground[2], "--wcm-color-fg-3": r.foreground[3], "--wcm-color-bg-1": r.background[1], "--wcm-color-bg-2": r.background[2], "--wcm-color-bg-3": r.background[3], "--wcm-color-overlay": r.overlay };
}
function mr() {
  return { "--wcm-accent-color": "#3396FF", "--wcm-accent-fill-color": "#FFFFFF", "--wcm-z-index": "89", "--wcm-background-color": "#3396FF", "--wcm-background-border-radius": "8px", "--wcm-container-border-radius": "30px", "--wcm-wallet-icon-border-radius": "15px", "--wcm-wallet-icon-large-border-radius": "30px", "--wcm-wallet-icon-small-border-radius": "7px", "--wcm-input-border-radius": "28px", "--wcm-button-border-radius": "10px", "--wcm-notification-border-radius": "36px", "--wcm-secondary-button-border-radius": "28px", "--wcm-icon-button-border-radius": "50%", "--wcm-button-hover-highlight-border-radius": "10px", "--wcm-text-big-bold-size": "20px", "--wcm-text-big-bold-weight": "600", "--wcm-text-big-bold-line-height": "24px", "--wcm-text-big-bold-letter-spacing": "-0.03em", "--wcm-text-big-bold-text-transform": "none", "--wcm-text-xsmall-bold-size": "10px", "--wcm-text-xsmall-bold-weight": "700", "--wcm-text-xsmall-bold-line-height": "12px", "--wcm-text-xsmall-bold-letter-spacing": "0.02em", "--wcm-text-xsmall-bold-text-transform": "uppercase", "--wcm-text-xsmall-regular-size": "12px", "--wcm-text-xsmall-regular-weight": "600", "--wcm-text-xsmall-regular-line-height": "14px", "--wcm-text-xsmall-regular-letter-spacing": "-0.03em", "--wcm-text-xsmall-regular-text-transform": "none", "--wcm-text-small-thin-size": "14px", "--wcm-text-small-thin-weight": "500", "--wcm-text-small-thin-line-height": "16px", "--wcm-text-small-thin-letter-spacing": "-0.03em", "--wcm-text-small-thin-text-transform": "none", "--wcm-text-small-regular-size": "14px", "--wcm-text-small-regular-weight": "600", "--wcm-text-small-regular-line-height": "16px", "--wcm-text-small-regular-letter-spacing": "-0.03em", "--wcm-text-small-regular-text-transform": "none", "--wcm-text-medium-regular-size": "16px", "--wcm-text-medium-regular-weight": "600", "--wcm-text-medium-regular-line-height": "20px", "--wcm-text-medium-regular-letter-spacing": "-0.03em", "--wcm-text-medium-regular-text-transform": "none", "--wcm-font-family": "-apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI', Roboto, Ubuntu, 'Helvetica Neue', sans-serif", "--wcm-font-feature-settings": "'tnum' on, 'lnum' on, 'case' on", "--wcm-success-color": "rgb(38,181,98)", "--wcm-error-color": "rgb(242, 90, 103)", "--wcm-overlay-background-color": "rgba(0, 0, 0, 0.3)", "--wcm-overlay-backdrop-filter": "none" };
}
const v = { getPreset(t) {
  return mr()[t];
}, setTheme() {
  const t = document.querySelector(":root"), { themeVariables: e } = fe.state;
  if (t) {
    const r = mt(mt(mt({}, Yo()), mr()), e);
    Object.entries(r).forEach(([i, o]) => t.style.setProperty(i, o));
  }
}, globalCss: C`*,::after,::before{margin:0;padding:0;box-sizing:border-box;font-style:normal;text-rendering:optimizeSpeed;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-tap-highlight-color:transparent;backface-visibility:hidden}button{cursor:pointer;display:flex;justify-content:center;align-items:center;position:relative;border:none;background-color:transparent;transition:all .2s ease}@media (hover:hover) and (pointer:fine){button:active{transition:all .1s ease;transform:scale(.93)}}button::after{content:'';position:absolute;top:0;bottom:0;left:0;right:0;transition:background-color,.2s ease}button:disabled{cursor:not-allowed}button svg,button wcm-text{position:relative;z-index:1}input{border:none;outline:0;appearance:none}img{display:block}::selection{color:var(--wcm-accent-fill-color);background:var(--wcm-accent-color)}` }, Go = C`button{border-radius:var(--wcm-secondary-button-border-radius);height:28px;padding:0 10px;background-color:var(--wcm-accent-color)}button path{fill:var(--wcm-accent-fill-color)}button::after{border-radius:inherit;border:1px solid var(--wcm-color-overlay)}button:disabled::after{background-color:transparent}.wcm-icon-left svg{margin-right:5px}.wcm-icon-right svg{margin-left:5px}button:active::after{background-color:var(--wcm-color-overlay)}.wcm-ghost,.wcm-ghost:active::after,.wcm-outline{background-color:transparent}.wcm-ghost:active{opacity:.5}@media(hover:hover){button:hover::after{background-color:var(--wcm-color-overlay)}.wcm-ghost:hover::after{background-color:transparent}.wcm-ghost:hover{opacity:.5}}button:disabled{background-color:var(--wcm-color-bg-3);pointer-events:none}.wcm-ghost::after{border-color:transparent}.wcm-ghost path{fill:var(--wcm-color-fg-2)}.wcm-outline path{fill:var(--wcm-accent-color)}.wcm-outline:disabled{background-color:transparent;opacity:.5}`;
var Xo = Object.defineProperty, Jo = Object.getOwnPropertyDescriptor, ce = (t, e, r, i) => {
  for (var o = i > 1 ? void 0 : i ? Jo(e, r) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (o = (i ? a(e, r, o) : a(o)) || o);
  return i && o && Xo(e, r, o), o;
};
let V = class extends w {
  constructor() {
    super(...arguments), this.disabled = !1, this.iconLeft = void 0, this.iconRight = void 0, this.onClick = () => null, this.variant = "default";
  }
  render() {
    const t = { "wcm-icon-left": this.iconLeft !== void 0, "wcm-icon-right": this.iconRight !== void 0, "wcm-ghost": this.variant === "ghost", "wcm-outline": this.variant === "outline" };
    let e = "inverse";
    return this.variant === "ghost" && (e = "secondary"), this.variant === "outline" && (e = "accent"), l`<button class="${Z(t)}" ?disabled="${this.disabled}" @click="${this.onClick}">${this.iconLeft}<wcm-text variant="small-regular" color="${e}"><slot></slot></wcm-text>${this.iconRight}</button>`;
  }
};
V.styles = [v.globalCss, Go], ce([p({ type: Boolean })], V.prototype, "disabled", 2), ce([p()], V.prototype, "iconLeft", 2), ce([p()], V.prototype, "iconRight", 2), ce([p()], V.prototype, "onClick", 2), ce([p()], V.prototype, "variant", 2), V = ce([y("wcm-button")], V);
const ei = C`:host{display:inline-block}button{padding:0 15px 1px;height:40px;border-radius:var(--wcm-button-border-radius);color:var(--wcm-accent-fill-color);background-color:var(--wcm-accent-color)}button::after{content:'';top:0;bottom:0;left:0;right:0;position:absolute;background-color:transparent;border-radius:inherit;transition:background-color .2s ease;border:1px solid var(--wcm-color-overlay)}button:active::after{background-color:var(--wcm-color-overlay)}button:disabled{padding-bottom:0;background-color:var(--wcm-color-bg-3);color:var(--wcm-color-fg-3)}.wcm-secondary{color:var(--wcm-accent-color);background-color:transparent}.wcm-secondary::after{display:none}@media(hover:hover){button:hover::after{background-color:var(--wcm-color-overlay)}}`;
var ti = Object.defineProperty, ri = Object.getOwnPropertyDescriptor, pt = (t, e, r, i) => {
  for (var o = i > 1 ? void 0 : i ? ri(e, r) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (o = (i ? a(e, r, o) : a(o)) || o);
  return i && o && ti(e, r, o), o;
};
let Ae = class extends w {
  constructor() {
    super(...arguments), this.disabled = !1, this.variant = "primary";
  }
  render() {
    const t = { "wcm-secondary": this.variant === "secondary" };
    return l`<button ?disabled="${this.disabled}" class="${Z(t)}"><slot></slot></button>`;
  }
};
Ae.styles = [v.globalCss, ei], pt([p({ type: Boolean })], Ae.prototype, "disabled", 2), pt([p()], Ae.prototype, "variant", 2), Ae = pt([y("wcm-button-big")], Ae);
const oi = C`:host{background-color:var(--wcm-color-bg-2);border-top:1px solid var(--wcm-color-bg-3)}div{padding:10px 20px;display:inherit;flex-direction:inherit;align-items:inherit;width:inherit;justify-content:inherit}`;
var ii = Object.defineProperty, ni = Object.getOwnPropertyDescriptor, ai = (t, e, r, i) => {
  for (var o = i > 1 ? void 0 : i ? ni(e, r) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (o = (i ? a(e, r, o) : a(o)) || o);
  return i && o && ii(e, r, o), o;
};
let ut = class extends w {
  render() {
    return l`<div><slot></slot></div>`;
  }
};
ut.styles = [v.globalCss, oi], ut = ai([y("wcm-info-footer")], ut);
const A = { CROSS_ICON: E`<svg width="12" height="12" viewBox="0 0 12 12"><path d="M9.94 11A.75.75 0 1 0 11 9.94L7.414 6.353a.5.5 0 0 1 0-.708L11 2.061A.75.75 0 1 0 9.94 1L6.353 4.586a.5.5 0 0 1-.708 0L2.061 1A.75.75 0 0 0 1 2.06l3.586 3.586a.5.5 0 0 1 0 .708L1 9.939A.75.75 0 1 0 2.06 11l3.586-3.586a.5.5 0 0 1 .708 0L9.939 11Z" fill="#fff"/></svg>`, WALLET_CONNECT_LOGO: E`<svg width="178" height="29" viewBox="0 0 178 29" id="wcm-wc-logo"><path d="M10.683 7.926c5.284-5.17 13.85-5.17 19.134 0l.636.623a.652.652 0 0 1 0 .936l-2.176 2.129a.343.343 0 0 1-.478 0l-.875-.857c-3.686-3.607-9.662-3.607-13.348 0l-.937.918a.343.343 0 0 1-.479 0l-2.175-2.13a.652.652 0 0 1 0-.936l.698-.683Zm23.633 4.403 1.935 1.895a.652.652 0 0 1 0 .936l-8.73 8.543a.687.687 0 0 1-.956 0L20.37 17.64a.172.172 0 0 0-.239 0l-6.195 6.063a.687.687 0 0 1-.957 0l-8.73-8.543a.652.652 0 0 1 0-.936l1.936-1.895a.687.687 0 0 1 .957 0l6.196 6.064a.172.172 0 0 0 .239 0l6.195-6.064a.687.687 0 0 1 .957 0l6.196 6.064a.172.172 0 0 0 .24 0l6.195-6.064a.687.687 0 0 1 .956 0ZM48.093 20.948l2.338-9.355c.139-.515.258-1.07.416-1.942.12.872.258 1.427.357 1.942l2.022 9.355h4.181l3.528-13.874h-3.21l-1.943 8.523a24.825 24.825 0 0 0-.456 2.457c-.158-.931-.317-1.625-.495-2.438l-1.883-8.542h-4.201l-2.042 8.542a41.204 41.204 0 0 0-.475 2.438 41.208 41.208 0 0 0-.476-2.438l-1.903-8.542h-3.349l3.508 13.874h4.083ZM63.33 21.304c1.585 0 2.596-.654 3.11-1.605-.059.297-.078.595-.078.892v.357h2.655V15.22c0-2.735-1.248-4.32-4.3-4.32-2.636 0-4.36 1.466-4.52 3.487h2.914c.1-.891.734-1.426 1.705-1.426.911 0 1.407.515 1.407 1.11 0 .435-.258.693-1.03.792l-1.388.159c-2.061.257-3.825 1.01-3.825 3.19 0 1.982 1.645 3.092 3.35 3.092Zm.891-2.041c-.773 0-1.348-.436-1.348-1.19 0-.733.655-1.09 1.645-1.268l.674-.119c.575-.118.892-.218 1.09-.396v.912c0 1.228-.892 2.06-2.06 2.06ZM70.398 7.074v13.874h2.874V7.074h-2.874ZM74.934 7.074v13.874h2.874V7.074h-2.874ZM84.08 21.304c2.735 0 4.5-1.546 4.697-3.567h-2.893c-.139.892-.892 1.387-1.804 1.387-1.228 0-2.12-.99-2.14-2.358h6.897v-.555c0-3.21-1.764-5.312-4.816-5.312-2.933 0-4.994 2.062-4.994 5.173 0 3.37 2.12 5.232 5.053 5.232Zm-2.16-6.421c.119-1.11.932-1.922 2.081-1.922 1.11 0 1.883.772 1.903 1.922H81.92ZM94.92 21.146c.633 0 1.248-.1 1.525-.179v-2.18c-.218.04-.475.06-.693.06-1.05 0-1.427-.595-1.427-1.566v-3.805h2.338v-2.24h-2.338V7.788H91.47v3.448H89.37v2.24h2.1v4.201c0 2.3 1.15 3.469 3.45 3.469ZM104.62 21.304c3.924 0 6.302-2.299 6.599-5.608h-3.111c-.238 1.803-1.506 3.032-3.369 3.032-2.2 0-3.746-1.784-3.746-4.796 0-2.953 1.605-4.638 3.805-4.638 1.883 0 2.953 1.15 3.171 2.834h3.191c-.317-3.448-2.854-5.41-6.342-5.41-3.984 0-7.036 2.695-7.036 7.214 0 4.677 2.676 7.372 6.838 7.372ZM117.449 21.304c2.993 0 5.114-1.882 5.114-5.172 0-3.23-2.121-5.233-5.114-5.233-2.972 0-5.093 2.002-5.093 5.233 0 3.29 2.101 5.172 5.093 5.172Zm0-2.22c-1.327 0-2.18-1.09-2.18-2.952 0-1.903.892-2.973 2.18-2.973 1.308 0 2.2 1.07 2.2 2.973 0 1.862-.872 2.953-2.2 2.953ZM126.569 20.948v-5.689c0-1.208.753-2.1 1.823-2.1 1.011 0 1.606.773 1.606 2.06v5.729h2.873v-6.144c0-2.339-1.229-3.905-3.428-3.905-1.526 0-2.458.734-2.953 1.606a5.31 5.31 0 0 0 .079-.892v-.377h-2.874v9.712h2.874ZM137.464 20.948v-5.689c0-1.208.753-2.1 1.823-2.1 1.011 0 1.606.773 1.606 2.06v5.729h2.873v-6.144c0-2.339-1.228-3.905-3.428-3.905-1.526 0-2.458.734-2.953 1.606a5.31 5.31 0 0 0 .079-.892v-.377h-2.874v9.712h2.874ZM149.949 21.304c2.735 0 4.499-1.546 4.697-3.567h-2.893c-.139.892-.892 1.387-1.804 1.387-1.228 0-2.12-.99-2.14-2.358h6.897v-.555c0-3.21-1.764-5.312-4.816-5.312-2.933 0-4.994 2.062-4.994 5.173 0 3.37 2.12 5.232 5.053 5.232Zm-2.16-6.421c.119-1.11.932-1.922 2.081-1.922 1.11 0 1.883.772 1.903 1.922h-3.984ZM160.876 21.304c3.013 0 4.658-1.645 4.975-4.201h-2.874c-.099 1.07-.713 1.982-2.001 1.982-1.309 0-2.2-1.21-2.2-2.993 0-1.942 1.03-2.933 2.259-2.933 1.209 0 1.803.872 1.883 1.882h2.873c-.218-2.358-1.823-4.142-4.776-4.142-2.874 0-5.153 1.903-5.153 5.193 0 3.25 1.923 5.212 5.014 5.212ZM172.067 21.146c.634 0 1.248-.1 1.526-.179v-2.18c-.218.04-.476.06-.694.06-1.05 0-1.427-.595-1.427-1.566v-3.805h2.339v-2.24h-2.339V7.788h-2.854v3.448h-2.1v2.24h2.1v4.201c0 2.3 1.15 3.469 3.449 3.469Z" fill="#fff"/></svg>`, WALLET_CONNECT_ICON: E`<svg width="28" height="20" viewBox="0 0 28 20"><g clip-path="url(#a)"><path d="M7.386 6.482c3.653-3.576 9.575-3.576 13.228 0l.44.43a.451.451 0 0 1 0 .648L19.55 9.033a.237.237 0 0 1-.33 0l-.606-.592c-2.548-2.496-6.68-2.496-9.228 0l-.648.634a.237.237 0 0 1-.33 0L6.902 7.602a.451.451 0 0 1 0-.647l.483-.473Zm16.338 3.046 1.339 1.31a.451.451 0 0 1 0 .648l-6.035 5.909a.475.475 0 0 1-.662 0L14.083 13.2a.119.119 0 0 0-.166 0l-4.283 4.194a.475.475 0 0 1-.662 0l-6.035-5.91a.451.451 0 0 1 0-.647l1.338-1.31a.475.475 0 0 1 .662 0l4.283 4.194c.046.044.12.044.166 0l4.283-4.194a.475.475 0 0 1 .662 0l4.283 4.194c.046.044.12.044.166 0l4.283-4.194a.475.475 0 0 1 .662 0Z" fill="#000000"/></g><defs><clipPath id="a"><path fill="#ffffff" d="M0 0h28v20H0z"/></clipPath></defs></svg>`, WALLET_CONNECT_ICON_COLORED: E`<svg width="96" height="96" fill="none"><path fill="#fff" d="M25.322 33.597c12.525-12.263 32.83-12.263 45.355 0l1.507 1.476a1.547 1.547 0 0 1 0 2.22l-5.156 5.048a.814.814 0 0 1-1.134 0l-2.074-2.03c-8.737-8.555-22.903-8.555-31.64 0l-2.222 2.175a.814.814 0 0 1-1.134 0l-5.156-5.049a1.547 1.547 0 0 1 0-2.22l1.654-1.62Zm56.019 10.44 4.589 4.494a1.547 1.547 0 0 1 0 2.22l-20.693 20.26a1.628 1.628 0 0 1-2.267 0L48.283 56.632a.407.407 0 0 0-.567 0L33.03 71.012a1.628 1.628 0 0 1-2.268 0L10.07 50.75a1.547 1.547 0 0 1 0-2.22l4.59-4.494a1.628 1.628 0 0 1 2.267 0l14.687 14.38c.156.153.41.153.567 0l14.685-14.38a1.628 1.628 0 0 1 2.268 0l14.687 14.38c.156.153.41.153.567 0l14.686-14.38a1.628 1.628 0 0 1 2.268 0Z"/><path stroke="#000" d="M25.672 33.954c12.33-12.072 32.325-12.072 44.655 0l1.508 1.476a1.047 1.047 0 0 1 0 1.506l-5.157 5.048a.314.314 0 0 1-.434 0l-2.074-2.03c-8.932-8.746-23.409-8.746-32.34 0l-2.222 2.174a.314.314 0 0 1-.434 0l-5.157-5.048a1.047 1.047 0 0 1 0-1.506l1.655-1.62Zm55.319 10.44 4.59 4.494a1.047 1.047 0 0 1 0 1.506l-20.694 20.26a1.128 1.128 0 0 1-1.568 0l-14.686-14.38a.907.907 0 0 0-1.267 0L32.68 70.655a1.128 1.128 0 0 1-1.568 0L10.42 50.394a1.047 1.047 0 0 1 0-1.506l4.59-4.493a1.128 1.128 0 0 1 1.567 0l14.687 14.379a.907.907 0 0 0 1.266 0l-.35-.357.35.357 14.686-14.38a1.128 1.128 0 0 1 1.568 0l14.687 14.38a.907.907 0 0 0 1.267 0l14.686-14.38a1.128 1.128 0 0 1 1.568 0Z"/></svg>`, BACK_ICON: E`<svg width="10" height="18" viewBox="0 0 10 18"><path fill-rule="evenodd" clip-rule="evenodd" d="M8.735.179a.75.75 0 0 1 .087 1.057L2.92 8.192a1.25 1.25 0 0 0 0 1.617l5.902 6.956a.75.75 0 1 1-1.144.97L1.776 10.78a2.75 2.75 0 0 1 0-3.559L7.678.265A.75.75 0 0 1 8.735.18Z" fill="#fff"/></svg>`, COPY_ICON: E`<svg width="24" height="24" fill="none"><path fill="#fff" fill-rule="evenodd" d="M7.01 7.01c.03-1.545.138-2.5.535-3.28A5 5 0 0 1 9.73 1.545C10.8 1 12.2 1 15 1c2.8 0 4.2 0 5.27.545a5 5 0 0 1 2.185 2.185C23 4.8 23 6.2 23 9c0 2.8 0 4.2-.545 5.27a5 5 0 0 1-2.185 2.185c-.78.397-1.735.505-3.28.534l-.001.01c-.03 1.54-.138 2.493-.534 3.27a5 5 0 0 1-2.185 2.186C13.2 23 11.8 23 9 23c-2.8 0-4.2 0-5.27-.545a5 5 0 0 1-2.185-2.185C1 19.2 1 17.8 1 15c0-2.8 0-4.2.545-5.27A5 5 0 0 1 3.73 7.545C4.508 7.149 5.46 7.04 7 7.01h.01ZM15 15.5c-1.425 0-2.403-.001-3.162-.063-.74-.06-1.139-.172-1.427-.319a3.5 3.5 0 0 1-1.53-1.529c-.146-.288-.257-.686-.318-1.427C8.501 11.403 8.5 10.425 8.5 9c0-1.425.001-2.403.063-3.162.06-.74.172-1.139.318-1.427a3.5 3.5 0 0 1 1.53-1.53c.288-.146.686-.257 1.427-.318.759-.062 1.737-.063 3.162-.063 1.425 0 2.403.001 3.162.063.74.06 1.139.172 1.427.318a3.5 3.5 0 0 1 1.53 1.53c.146.288.257.686.318 1.427.062.759.063 1.737.063 3.162 0 1.425-.001 2.403-.063 3.162-.06.74-.172 1.139-.319 1.427a3.5 3.5 0 0 1-1.529 1.53c-.288.146-.686.257-1.427.318-.759.062-1.737.063-3.162.063ZM7 8.511c-.444.009-.825.025-1.162.052-.74.06-1.139.172-1.427.318a3.5 3.5 0 0 0-1.53 1.53c-.146.288-.257.686-.318 1.427-.062.759-.063 1.737-.063 3.162 0 1.425.001 2.403.063 3.162.06.74.172 1.139.318 1.427a3.5 3.5 0 0 0 1.53 1.53c.288.146.686.257 1.427.318.759.062 1.737.063 3.162.063 1.425 0 2.403-.001 3.162-.063.74-.06 1.139-.172 1.427-.319a3.5 3.5 0 0 0 1.53-1.53c.146-.287.257-.685.318-1.426.027-.337.043-.718.052-1.162H15c-2.8 0-4.2 0-5.27-.545a5 5 0 0 1-2.185-2.185C7 13.2 7 11.8 7 9v-.489Z" clip-rule="evenodd"/></svg>`, RETRY_ICON: E`<svg width="15" height="16" viewBox="0 0 15 16"><path d="M6.464 2.03A.75.75 0 0 0 5.403.97L2.08 4.293a1 1 0 0 0 0 1.414L5.403 9.03a.75.75 0 0 0 1.06-1.06L4.672 6.177a.25.25 0 0 1 .177-.427h2.085a4 4 0 1 1-3.93 4.746c-.077-.407-.405-.746-.82-.746-.414 0-.755.338-.7.748a5.501 5.501 0 1 0 5.45-6.248H4.848a.25.25 0 0 1-.177-.427L6.464 2.03Z" fill="#fff"/></svg>`, DESKTOP_ICON: E`<svg width="16" height="16" viewBox="0 0 16 16"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 5.98c0-1.85 0-2.775.394-3.466a3 3 0 0 1 1.12-1.12C2.204 1 3.13 1 4.98 1h6.04c1.85 0 2.775 0 3.466.394a3 3 0 0 1 1.12 1.12C16 3.204 16 4.13 16 5.98v1.04c0 1.85 0 2.775-.394 3.466a3 3 0 0 1-1.12 1.12C13.796 12 12.87 12 11.02 12H4.98c-1.85 0-2.775 0-3.466-.394a3 3 0 0 1-1.12-1.12C0 9.796 0 8.87 0 7.02V5.98ZM4.98 2.5h6.04c.953 0 1.568.001 2.034.043.446.04.608.108.69.154a1.5 1.5 0 0 1 .559.56c.046.08.114.243.154.69.042.465.043 1.08.043 2.033v1.04c0 .952-.001 1.568-.043 2.034-.04.446-.108.608-.154.69a1.499 1.499 0 0 1-.56.559c-.08.046-.243.114-.69.154-.466.042-1.08.043-2.033.043H4.98c-.952 0-1.568-.001-2.034-.043-.446-.04-.608-.108-.69-.154a1.5 1.5 0 0 1-.559-.56c-.046-.08-.114-.243-.154-.69-.042-.465-.043-1.08-.043-2.033V5.98c0-.952.001-1.568.043-2.034.04-.446.108-.608.154-.69a1.5 1.5 0 0 1 .56-.559c.08-.046.243-.114.69-.154.465-.042 1.08-.043 2.033-.043Z" fill="#fff"/><path d="M4 14.25a.75.75 0 0 1 .75-.75h6.5a.75.75 0 0 1 0 1.5h-6.5a.75.75 0 0 1-.75-.75Z" fill="#fff"/></svg>`, MOBILE_ICON: E`<svg width="16" height="16" viewBox="0 0 16 16"><path d="M6.75 5a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5Z" fill="#fff"/><path fill-rule="evenodd" clip-rule="evenodd" d="M3 4.98c0-1.85 0-2.775.394-3.466a3 3 0 0 1 1.12-1.12C5.204 0 6.136 0 8 0s2.795 0 3.486.394a3 3 0 0 1 1.12 1.12C13 2.204 13 3.13 13 4.98v6.04c0 1.85 0 2.775-.394 3.466a3 3 0 0 1-1.12 1.12C10.796 16 9.864 16 8 16s-2.795 0-3.486-.394a3 3 0 0 1-1.12-1.12C3 13.796 3 12.87 3 11.02V4.98Zm8.5 0v6.04c0 .953-.001 1.568-.043 2.034-.04.446-.108.608-.154.69a1.499 1.499 0 0 1-.56.559c-.08.045-.242.113-.693.154-.47.042-1.091.043-2.05.043-.959 0-1.58-.001-2.05-.043-.45-.04-.613-.109-.693-.154a1.5 1.5 0 0 1-.56-.56c-.046-.08-.114-.243-.154-.69-.042-.466-.043-1.08-.043-2.033V4.98c0-.952.001-1.568.043-2.034.04-.446.108-.608.154-.69a1.5 1.5 0 0 1 .56-.559c.08-.045.243-.113.693-.154C6.42 1.501 7.041 1.5 8 1.5c.959 0 1.58.001 2.05.043.45.04.613.109.693.154a1.5 1.5 0 0 1 .56.56c.046.08.114.243.154.69.042.465.043 1.08.043 2.033Z" fill="#fff"/></svg>`, ARROW_DOWN_ICON: E`<svg width="14" height="14" viewBox="0 0 14 14"><path d="M2.28 7.47a.75.75 0 0 0-1.06 1.06l5.25 5.25a.75.75 0 0 0 1.06 0l5.25-5.25a.75.75 0 0 0-1.06-1.06l-3.544 3.543a.25.25 0 0 1-.426-.177V.75a.75.75 0 0 0-1.5 0v10.086a.25.25 0 0 1-.427.176L2.28 7.47Z" fill="#fff"/></svg>`, ARROW_UP_RIGHT_ICON: E`<svg width="15" height="14" fill="none"><path d="M4.5 1.75A.75.75 0 0 1 5.25 1H12a1.5 1.5 0 0 1 1.5 1.5v6.75a.75.75 0 0 1-1.5 0V4.164a.25.25 0 0 0-.427-.176L4.061 11.5A.75.75 0 0 1 3 10.44l7.513-7.513a.25.25 0 0 0-.177-.427H5.25a.75.75 0 0 1-.75-.75Z" fill="#fff"/></svg>`, ARROW_RIGHT_ICON: E`<svg width="6" height="14" viewBox="0 0 6 14"><path fill-rule="evenodd" clip-rule="evenodd" d="M2.181 1.099a.75.75 0 0 1 1.024.279l2.433 4.258a2.75 2.75 0 0 1 0 2.729l-2.433 4.257a.75.75 0 1 1-1.303-.744L4.335 7.62a1.25 1.25 0 0 0 0-1.24L1.902 2.122a.75.75 0 0 1 .28-1.023Z" fill="#fff"/></svg>`, QRCODE_ICON: E`<svg width="25" height="24" viewBox="0 0 25 24"><path d="M23.748 9a.748.748 0 0 0 .748-.752c-.018-2.596-.128-4.07-.784-5.22a6 6 0 0 0-2.24-2.24c-1.15-.656-2.624-.766-5.22-.784a.748.748 0 0 0-.752.748c0 .414.335.749.748.752 1.015.007 1.82.028 2.494.088.995.09 1.561.256 1.988.5.7.398 1.28.978 1.679 1.678.243.427.41.993.498 1.988.061.675.082 1.479.09 2.493a.753.753 0 0 0 .75.749ZM3.527.788C4.677.132 6.152.022 8.747.004A.748.748 0 0 1 9.5.752a.753.753 0 0 1-.749.752c-1.014.007-1.818.028-2.493.088-.995.09-1.561.256-1.988.5-.7.398-1.28.978-1.679 1.678-.243.427-.41.993-.499 1.988-.06.675-.081 1.479-.088 2.493A.753.753 0 0 1 1.252 9a.748.748 0 0 1-.748-.752c.018-2.596.128-4.07.784-5.22a6 6 0 0 1 2.24-2.24ZM1.252 15a.748.748 0 0 0-.748.752c.018 2.596.128 4.07.784 5.22a6 6 0 0 0 2.24 2.24c1.15.656 2.624.766 5.22.784a.748.748 0 0 0 .752-.748.753.753 0 0 0-.749-.752c-1.014-.007-1.818-.028-2.493-.089-.995-.089-1.561-.255-1.988-.498a4.5 4.5 0 0 1-1.679-1.68c-.243-.426-.41-.992-.499-1.987-.06-.675-.081-1.479-.088-2.493A.753.753 0 0 0 1.252 15ZM22.996 15.749a.753.753 0 0 1 .752-.749c.415 0 .751.338.748.752-.018 2.596-.128 4.07-.784 5.22a6 6 0 0 1-2.24 2.24c-1.15.656-2.624.766-5.22.784a.748.748 0 0 1-.752-.748c0-.414.335-.749.748-.752 1.015-.007 1.82-.028 2.494-.089.995-.089 1.561-.255 1.988-.498a4.5 4.5 0 0 0 1.679-1.68c.243-.426.41-.992.498-1.987.061-.675.082-1.479.09-2.493Z" fill="#fff"/><path fill-rule="evenodd" clip-rule="evenodd" d="M7 4a2.5 2.5 0 0 0-2.5 2.5v2A2.5 2.5 0 0 0 7 11h2a2.5 2.5 0 0 0 2.5-2.5v-2A2.5 2.5 0 0 0 9 4H7Zm2 1.5H7a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1ZM13.5 6.5A2.5 2.5 0 0 1 16 4h2a2.5 2.5 0 0 1 2.5 2.5v2A2.5 2.5 0 0 1 18 11h-2a2.5 2.5 0 0 1-2.5-2.5v-2Zm2.5-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1ZM7 13a2.5 2.5 0 0 0-2.5 2.5v2A2.5 2.5 0 0 0 7 20h2a2.5 2.5 0 0 0 2.5-2.5v-2A2.5 2.5 0 0 0 9 13H7Zm2 1.5H7a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1Z" fill="#fff"/><path d="M13.5 15.5c0-.465 0-.697.038-.89a2 2 0 0 1 1.572-1.572C15.303 13 15.535 13 16 13v2.5h-2.5ZM18 13c.465 0 .697 0 .89.038a2 2 0 0 1 1.572 1.572c.038.193.038.425.038.89H18V13ZM18 17.5h2.5c0 .465 0 .697-.038.89a2 2 0 0 1-1.572 1.572C18.697 20 18.465 20 18 20v-2.5ZM13.5 17.5H16V20c-.465 0-.697 0-.89-.038a2 2 0 0 1-1.572-1.572c-.038-.193-.038-.425-.038-.89Z" fill="#fff"/></svg>`, SCAN_ICON: E`<svg width="16" height="16" fill="none"><path fill="#fff" d="M10 15.216c0 .422.347.763.768.74 1.202-.064 2.025-.222 2.71-.613a5.001 5.001 0 0 0 1.865-1.866c.39-.684.549-1.507.613-2.709a.735.735 0 0 0-.74-.768.768.768 0 0 0-.76.732c-.009.157-.02.306-.032.447-.073.812-.206 1.244-.384 1.555-.31.545-.761.996-1.306 1.306-.311.178-.743.311-1.555.384-.141.013-.29.023-.447.032a.768.768 0 0 0-.732.76ZM10 .784c0 .407.325.737.732.76.157.009.306.02.447.032.812.073 1.244.206 1.555.384a3.5 3.5 0 0 1 1.306 1.306c.178.311.311.743.384 1.555.013.142.023.29.032.447a.768.768 0 0 0 .76.732.734.734 0 0 0 .74-.768c-.064-1.202-.222-2.025-.613-2.71A5 5 0 0 0 13.477.658c-.684-.39-1.507-.549-2.709-.613a.735.735 0 0 0-.768.74ZM5.232.044A.735.735 0 0 1 6 .784a.768.768 0 0 1-.732.76c-.157.009-.305.02-.447.032-.812.073-1.244.206-1.555.384A3.5 3.5 0 0 0 1.96 3.266c-.178.311-.311.743-.384 1.555-.013.142-.023.29-.032.447A.768.768 0 0 1 .784 6a.735.735 0 0 1-.74-.768c.064-1.202.222-2.025.613-2.71A5 5 0 0 1 2.523.658C3.207.267 4.03.108 5.233.044ZM5.268 14.456a.768.768 0 0 1 .732.76.734.734 0 0 1-.768.74c-1.202-.064-2.025-.222-2.71-.613a5 5 0 0 1-1.865-1.866c-.39-.684-.549-1.507-.613-2.709A.735.735 0 0 1 .784 10c.407 0 .737.325.76.732.009.157.02.306.032.447.073.812.206 1.244.384 1.555a3.5 3.5 0 0 0 1.306 1.306c.311.178.743.311 1.555.384.142.013.29.023.447.032Z"/></svg>`, CHECKMARK_ICON: E`<svg width="13" height="12" viewBox="0 0 13 12"><path fill-rule="evenodd" clip-rule="evenodd" d="M12.155.132a.75.75 0 0 1 .232 1.035L5.821 11.535a1 1 0 0 1-1.626.09L.665 7.21a.75.75 0 1 1 1.17-.937L4.71 9.867a.25.25 0 0 0 .406-.023L11.12.364a.75.75 0 0 1 1.035-.232Z" fill="#fff"/></svg>`, SEARCH_ICON: E`<svg width="20" height="21"><path fill-rule="evenodd" clip-rule="evenodd" d="M12.432 13.992c-.354-.353-.91-.382-1.35-.146a5.5 5.5 0 1 1 2.265-2.265c-.237.441-.208.997.145 1.35l3.296 3.296a.75.75 0 1 1-1.06 1.061l-3.296-3.296Zm.06-5a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" fill="#949E9E"/></svg>`, WALLET_PLACEHOLDER: E`<svg width="60" height="60" fill="none" viewBox="0 0 60 60"><g clip-path="url(#q)"><path id="wallet-placeholder-fill" fill="#fff" d="M0 24.9c0-9.251 0-13.877 1.97-17.332a15 15 0 0 1 5.598-5.597C11.023 0 15.648 0 24.9 0h10.2c9.252 0 13.877 0 17.332 1.97a15 15 0 0 1 5.597 5.598C60 11.023 60 15.648 60 24.9v10.2c0 9.252 0 13.877-1.97 17.332a15.001 15.001 0 0 1-5.598 5.597C48.977 60 44.352 60 35.1 60H24.9c-9.251 0-13.877 0-17.332-1.97a15 15 0 0 1-5.597-5.598C0 48.977 0 44.352 0 35.1V24.9Z"/><path id="wallet-placeholder-dash" stroke="#000" stroke-dasharray="4 4" stroke-width="1.5" d="M.04 41.708a231.598 231.598 0 0 1-.039-4.403l.75-.001L.75 35.1v-2.55H0v-5.1h.75V24.9l.001-2.204h-.75c.003-1.617.011-3.077.039-4.404l.75.016c.034-1.65.099-3.08.218-4.343l-.746-.07c.158-1.678.412-3.083.82-4.316l.713.236c.224-.679.497-1.296.827-1.875a14.25 14.25 0 0 1 1.05-1.585L3.076 5.9A15 15 0 0 1 5.9 3.076l.455.596a14.25 14.25 0 0 1 1.585-1.05c.579-.33 1.196-.603 1.875-.827l-.236-.712C10.812.674 12.217.42 13.895.262l.07.746C15.23.89 16.66.824 18.308.79l-.016-.75C19.62.012 21.08.004 22.695.001l.001.75L24.9.75h2.55V0h5.1v.75h2.55l2.204.001v-.75c1.617.003 3.077.011 4.404.039l-.016.75c1.65.034 3.08.099 4.343.218l.07-.746c1.678.158 3.083.412 4.316.82l-.236.713c.679.224 1.296.497 1.875.827a14.24 14.24 0 0 1 1.585 1.05l.455-.596A14.999 14.999 0 0 1 56.924 5.9l-.596.455c.384.502.735 1.032 1.05 1.585.33.579.602 1.196.827 1.875l.712-.236c.409 1.233.663 2.638.822 4.316l-.747.07c.119 1.264.184 2.694.218 4.343l.75-.016c.028 1.327.036 2.787.039 4.403l-.75.001.001 2.204v2.55H60v5.1h-.75v2.55l-.001 2.204h.75a231.431 231.431 0 0 1-.039 4.404l-.75-.016c-.034 1.65-.099 3.08-.218 4.343l.747.07c-.159 1.678-.413 3.083-.822 4.316l-.712-.236a10.255 10.255 0 0 1-.827 1.875 14.242 14.242 0 0 1-1.05 1.585l.596.455a14.997 14.997 0 0 1-2.824 2.824l-.455-.596c-.502.384-1.032.735-1.585 1.05-.579.33-1.196.602-1.875.827l.236.712c-1.233.409-2.638.663-4.316.822l-.07-.747c-1.264.119-2.694.184-4.343.218l.016.75c-1.327.028-2.787.036-4.403.039l-.001-.75-2.204.001h-2.55V60h-5.1v-.75H24.9l-2.204-.001v.75a231.431 231.431 0 0 1-4.404-.039l.016-.75c-1.65-.034-3.08-.099-4.343-.218l-.07.747c-1.678-.159-3.083-.413-4.316-.822l.236-.712a10.258 10.258 0 0 1-1.875-.827 14.252 14.252 0 0 1-1.585-1.05l-.455.596A14.999 14.999 0 0 1 3.076 54.1l.596-.455a14.24 14.24 0 0 1-1.05-1.585 10.259 10.259 0 0 1-.827-1.875l-.712.236C.674 49.188.42 47.783.262 46.105l.746-.07C.89 44.77.824 43.34.79 41.692l-.75.016Z"/><path fill="#fff" fill-rule="evenodd" d="M35.643 32.145c-.297-.743-.445-1.114-.401-1.275a.42.42 0 0 1 .182-.27c.134-.1.463-.1 1.123-.1.742 0 1.499.046 2.236-.05a6 6 0 0 0 5.166-5.166c.051-.39.051-.855.051-1.784 0-.928 0-1.393-.051-1.783a6 6 0 0 0-5.166-5.165c-.39-.052-.854-.052-1.783-.052h-7.72c-4.934 0-7.401 0-9.244 1.051a8 8 0 0 0-2.985 2.986C16.057 22.28 16.003 24.58 16 29 15.998 31.075 16 33.15 16 35.224A7.778 7.778 0 0 0 23.778 43H28.5c1.394 0 2.09 0 2.67-.116a6 6 0 0 0 4.715-4.714c.115-.58.115-1.301.115-2.744 0-1.31 0-1.964-.114-2.49a4.998 4.998 0 0 0-.243-.792Z" clip-rule="evenodd"/><path fill="#9EA9A9" fill-rule="evenodd" d="M37 18h-7.72c-2.494 0-4.266.002-5.647.126-1.361.122-2.197.354-2.854.728a6.5 6.5 0 0 0-2.425 2.426c-.375.657-.607 1.492-.729 2.853-.11 1.233-.123 2.777-.125 4.867 0 .7 0 1.05.097 1.181.096.13.182.181.343.2.163.02.518-.18 1.229-.581a6.195 6.195 0 0 1 3.053-.8H37c.977 0 1.32-.003 1.587-.038a4.5 4.5 0 0 0 3.874-3.874c.036-.268.039-.611.039-1.588 0-.976-.003-1.319-.038-1.587a4.5 4.5 0 0 0-3.875-3.874C38.32 18.004 37.977 18 37 18Zm-7.364 12.5h-7.414a4.722 4.722 0 0 0-4.722 4.723 6.278 6.278 0 0 0 6.278 6.278H28.5c1.466 0 1.98-.008 2.378-.087a4.5 4.5 0 0 0 3.535-3.536c.08-.397.087-.933.087-2.451 0-1.391-.009-1.843-.08-2.17a3.5 3.5 0 0 0-2.676-2.676c-.328-.072-.762-.08-2.108-.08Z" clip-rule="evenodd"/></g><defs><clipPath id="q"><path fill="#fff" d="M0 0h60v60H0z"/></clipPath></defs></svg>`, GLOBE_ICON: E`<svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="#fff" fill-rule="evenodd" d="M15.5 8a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Zm-2.113.75c.301 0 .535.264.47.558a6.01 6.01 0 0 1-2.867 3.896c-.203.116-.42-.103-.334-.32.409-1.018.691-2.274.797-3.657a.512.512 0 0 1 .507-.477h1.427Zm.47-2.058c.065.294-.169.558-.47.558H11.96a.512.512 0 0 1-.507-.477c-.106-1.383-.389-2.638-.797-3.656-.087-.217.13-.437.333-.32a6.01 6.01 0 0 1 2.868 3.895Zm-4.402.558c.286 0 .515-.24.49-.525-.121-1.361-.429-2.534-.83-3.393-.279-.6-.549-.93-.753-1.112a.535.535 0 0 0-.724 0c-.204.182-.474.513-.754 1.112-.4.859-.708 2.032-.828 3.393a.486.486 0 0 0 .49.525h2.909Zm-5.415 0c.267 0 .486-.21.507-.477.106-1.383.389-2.638.797-3.656.087-.217-.13-.437-.333-.32a6.01 6.01 0 0 0-2.868 3.895c-.065.294.169.558.47.558H4.04ZM2.143 9.308c-.065-.294.169-.558.47-.558H4.04c.267 0 .486.21.507.477.106 1.383.389 2.639.797 3.657.087.217-.13.436-.333.32a6.01 6.01 0 0 1-2.868-3.896Zm3.913-.033a.486.486 0 0 1 .49-.525h2.909c.286 0 .515.24.49.525-.121 1.361-.428 2.535-.83 3.394-.279.6-.549.93-.753 1.112a.535.535 0 0 1-.724 0c-.204-.182-.474-.513-.754-1.112-.4-.859-.708-2.033-.828-3.394Z" clip-rule="evenodd"/></svg>` }, si = C`.wcm-toolbar-placeholder{top:0;bottom:0;left:0;right:0;width:100%;position:absolute;display:block;pointer-events:none;height:100px;border-radius:calc(var(--wcm-background-border-radius) * .9);background-color:var(--wcm-background-color);background-position:center;background-size:cover}.wcm-toolbar{height:38px;display:flex;position:relative;margin:5px 15px 5px 5px;justify-content:space-between;align-items:center}.wcm-toolbar img,.wcm-toolbar svg{height:28px;object-position:left center;object-fit:contain}#wcm-wc-logo path{fill:var(--wcm-accent-fill-color)}button{width:28px;height:28px;border-radius:var(--wcm-icon-button-border-radius);border:0;display:flex;justify-content:center;align-items:center;cursor:pointer;background-color:var(--wcm-color-bg-1);box-shadow:0 0 0 1px var(--wcm-color-overlay)}button:active{background-color:var(--wcm-color-bg-2)}button svg{display:block;object-position:center}button path{fill:var(--wcm-color-fg-1)}.wcm-toolbar div{display:flex}@media(hover:hover){button:hover{background-color:var(--wcm-color-bg-2)}}`;
var li = Object.defineProperty, ci = Object.getOwnPropertyDescriptor, di = (t, e, r, i) => {
  for (var o = i > 1 ? void 0 : i ? ci(e, r) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (o = (i ? a(e, r, o) : a(o)) || o);
  return i && o && li(e, r, o), o;
};
let gt = class extends w {
  render() {
    return l`<div class="wcm-toolbar-placeholder"></div><div class="wcm-toolbar">${A.WALLET_CONNECT_LOGO} <button @click="${Ke.close}">${A.CROSS_ICON}</button></div>`;
  }
};
gt.styles = [v.globalCss, si], gt = di([y("wcm-modal-backcard")], gt);
const hi = C`main{padding:20px;padding-top:0;width:100%}`;
var mi = Object.defineProperty, pi = Object.getOwnPropertyDescriptor, ui = (t, e, r, i) => {
  for (var o = i > 1 ? void 0 : i ? pi(e, r) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (o = (i ? a(e, r, o) : a(o)) || o);
  return i && o && mi(e, r, o), o;
};
let wt = class extends w {
  render() {
    return l`<main><slot></slot></main>`;
  }
};
wt.styles = [v.globalCss, hi], wt = ui([y("wcm-modal-content")], wt);
const gi = C`footer{padding:10px;display:flex;flex-direction:column;align-items:inherit;justify-content:inherit;border-top:1px solid var(--wcm-color-bg-2)}`;
var wi = Object.defineProperty, vi = Object.getOwnPropertyDescriptor, fi = (t, e, r, i) => {
  for (var o = i > 1 ? void 0 : i ? vi(e, r) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (o = (i ? a(e, r, o) : a(o)) || o);
  return i && o && wi(e, r, o), o;
};
let vt = class extends w {
  render() {
    return l`<footer><slot></slot></footer>`;
  }
};
vt.styles = [v.globalCss, gi], vt = fi([y("wcm-modal-footer")], vt);
const bi = C`header{display:flex;justify-content:center;align-items:center;padding:20px;position:relative}.wcm-border{border-bottom:1px solid var(--wcm-color-bg-2);margin-bottom:20px}header button{padding:15px 20px}header button:active{opacity:.5}@media(hover:hover){header button:hover{opacity:.5}}.wcm-back-btn{position:absolute;left:0}.wcm-action-btn{position:absolute;right:0}path{fill:var(--wcm-accent-color)}`;
var yi = Object.defineProperty, xi = Object.getOwnPropertyDescriptor, _e = (t, e, r, i) => {
  for (var o = i > 1 ? void 0 : i ? xi(e, r) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (o = (i ? a(e, r, o) : a(o)) || o);
  return i && o && yi(e, r, o), o;
};
let te = class extends w {
  constructor() {
    super(...arguments), this.title = "", this.onAction = void 0, this.actionIcon = void 0, this.border = !1;
  }
  backBtnTemplate() {
    return l`<button class="wcm-back-btn" @click="${O.goBack}">${A.BACK_ICON}</button>`;
  }
  actionBtnTemplate() {
    return l`<button class="wcm-action-btn" @click="${this.onAction}">${this.actionIcon}</button>`;
  }
  render() {
    const t = { "wcm-border": this.border }, e = O.state.history.length > 1, r = this.title ? l`<wcm-text variant="big-bold">${this.title}</wcm-text>` : l`<slot></slot>`;
    return l`<header class="${Z(t)}">${e ? this.backBtnTemplate() : null} ${r} ${this.onAction ? this.actionBtnTemplate() : null}</header>`;
  }
};
te.styles = [v.globalCss, bi], _e([p()], te.prototype, "title", 2), _e([p()], te.prototype, "onAction", 2), _e([p()], te.prototype, "actionIcon", 2), _e([p({ type: Boolean })], te.prototype, "border", 2), te = _e([y("wcm-modal-header")], te);
const h = { MOBILE_BREAKPOINT: 600, WCM_RECENT_WALLET_DATA: "WCM_RECENT_WALLET_DATA", EXPLORER_WALLET_URL: "https://explorer.walletconnect.com/?type=wallet", getShadowRootElement(t, e) {
  const r = t.renderRoot.querySelector(e);
  if (!r)
    throw new Error(`${e} not found`);
  return r;
}, getWalletIcon({ id: t, image_id: e }) {
  const { walletImages: r } = ae.state;
  return r != null && r[t] ? r[t] : e ? L.getWalletImageUrl(e) : "";
}, getWalletName(t, e = !1) {
  return e && t.length > 8 ? `${t.substring(0, 8)}..` : t;
}, isMobileAnimation() {
  return window.innerWidth <= h.MOBILE_BREAKPOINT;
}, async preloadImage(t) {
  const e = new Promise((r, i) => {
    const o = new Image();
    o.onload = r, o.onerror = i, o.crossOrigin = "anonymous", o.src = t;
  });
  return Promise.race([e, g.wait(3e3)]);
}, getErrorMessage(t) {
  return t instanceof Error ? t.message : "Unknown Error";
}, debounce(t, e = 500) {
  let r;
  return (...i) => {
    function o() {
      t(...i);
    }
    r && clearTimeout(r), r = setTimeout(o, e);
  };
}, handleMobileLinking(t) {
  const { walletConnectUri: e } = H.state, { mobile: r, name: i } = t, o = r == null ? void 0 : r.native, n = r == null ? void 0 : r.universal;
  h.setRecentWallet(t);
  function a(s) {
    let c = "";
    o ? c = g.formatUniversalUrl(o, s, i) : n && (c = g.formatNativeUrl(n, s, i)), g.openHref(c, "_self");
  }
  e && a(e);
}, handleAndroidLinking() {
  const { walletConnectUri: t } = H.state;
  t && (g.setWalletConnectAndroidDeepLink(t), g.openHref(t, "_self"));
}, async handleUriCopy() {
  const { walletConnectUri: t } = H.state;
  if (t)
    try {
      await navigator.clipboard.writeText(t), Y.openToast("Link copied", "success");
    } catch {
      Y.openToast("Failed to copy", "error");
    }
}, getCustomImageUrls() {
  const { walletImages: t } = ae.state, e = Object.values(t ?? {});
  return Object.values(e);
}, truncate(t, e = 8) {
  return t.length <= e ? t : `${t.substring(0, 4)}...${t.substring(t.length - 4)}`;
}, setRecentWallet(t) {
  try {
    localStorage.setItem(h.WCM_RECENT_WALLET_DATA, JSON.stringify(t));
  } catch {
    console.info("Unable to set recent wallet");
  }
}, getRecentWallet() {
  try {
    const t = localStorage.getItem(h.WCM_RECENT_WALLET_DATA);
    return t ? JSON.parse(t) : void 0;
  } catch {
    console.info("Unable to get recent wallet");
  }
}, caseSafeIncludes(t, e) {
  return t.toUpperCase().includes(e.toUpperCase());
}, openWalletExplorerUrl() {
  g.openHref(h.EXPLORER_WALLET_URL, "_blank");
}, getCachedRouterWalletPlatforms() {
  const { desktop: t, mobile: e } = g.getWalletRouterData(), r = !!(t != null && t.native), i = !!(t != null && t.universal), o = !!(e != null && e.native) || !!(e != null && e.universal);
  return { isDesktop: r, isMobile: o, isWeb: i };
}, goToConnectingView(t) {
  O.setData({ Wallet: t });
  const e = g.isMobile(), { isDesktop: r, isWeb: i, isMobile: o } = h.getCachedRouterWalletPlatforms();
  e ? o ? O.push("MobileConnecting") : i ? O.push("WebConnecting") : O.push("InstallWallet") : r ? O.push("DesktopConnecting") : i ? O.push("WebConnecting") : o ? O.push("MobileQrcodeConnecting") : O.push("InstallWallet");
} }, $i = C`.wcm-router{overflow:hidden;will-change:transform}.wcm-content{display:flex;flex-direction:column}`;
var Ci = Object.defineProperty, Ai = Object.getOwnPropertyDescriptor, ft = (t, e, r, i) => {
  for (var o = i > 1 ? void 0 : i ? Ai(e, r) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (o = (i ? a(e, r, o) : a(o)) || o);
  return i && o && Ci(e, r, o), o;
};
let Ee = class extends w {
  constructor() {
    super(), this.view = O.state.view, this.prevView = O.state.view, this.unsubscribe = void 0, this.oldHeight = "0px", this.resizeObserver = void 0, this.unsubscribe = O.subscribe((t) => {
      this.view !== t.view && this.onChangeRoute();
    });
  }
  firstUpdated() {
    this.resizeObserver = new ResizeObserver(([t]) => {
      const e = `${t.contentRect.height}px`;
      this.oldHeight !== "0px" && ne(this.routerEl, { height: [this.oldHeight, e] }, { duration: 0.2 }), this.oldHeight = e;
    }), this.resizeObserver.observe(this.contentEl);
  }
  disconnectedCallback() {
    var t, e;
    (t = this.unsubscribe) == null || t.call(this), (e = this.resizeObserver) == null || e.disconnect();
  }
  get routerEl() {
    return h.getShadowRootElement(this, ".wcm-router");
  }
  get contentEl() {
    return h.getShadowRootElement(this, ".wcm-content");
  }
  viewTemplate() {
    switch (this.view) {
      case "ConnectWallet":
        return l`<wcm-connect-wallet-view></wcm-connect-wallet-view>`;
      case "DesktopConnecting":
        return l`<wcm-desktop-connecting-view></wcm-desktop-connecting-view>`;
      case "MobileConnecting":
        return l`<wcm-mobile-connecting-view></wcm-mobile-connecting-view>`;
      case "WebConnecting":
        return l`<wcm-web-connecting-view></wcm-web-connecting-view>`;
      case "MobileQrcodeConnecting":
        return l`<wcm-mobile-qr-connecting-view></wcm-mobile-qr-connecting-view>`;
      case "WalletExplorer":
        return l`<wcm-wallet-explorer-view></wcm-wallet-explorer-view>`;
      case "Qrcode":
        return l`<wcm-qrcode-view></wcm-qrcode-view>`;
      case "InstallWallet":
        return l`<wcm-install-wallet-view></wcm-install-wallet-view>`;
      default:
        return l`<div>Not Found</div>`;
    }
  }
  async onChangeRoute() {
    await ne(this.routerEl, { opacity: [1, 0], scale: [1, 1.02] }, { duration: 0.15, delay: 0.1 }).finished, this.view = O.state.view, ne(this.routerEl, { opacity: [0, 1], scale: [0.99, 1] }, { duration: 0.37, delay: 0.05 });
  }
  render() {
    return l`<div class="wcm-router"><div class="wcm-content">${this.viewTemplate()}</div></div>`;
  }
};
Ee.styles = [v.globalCss, $i], ft([W()], Ee.prototype, "view", 2), ft([W()], Ee.prototype, "prevView", 2), Ee = ft([y("wcm-modal-router")], Ee);
const _i = C`div{height:36px;width:max-content;display:flex;justify-content:center;align-items:center;padding:9px 15px 11px;position:absolute;top:12px;box-shadow:0 6px 14px -6px rgba(10,16,31,.3),0 10px 32px -4px rgba(10,16,31,.15);z-index:2;left:50%;transform:translateX(-50%);pointer-events:none;backdrop-filter:blur(20px) saturate(1.8);-webkit-backdrop-filter:blur(20px) saturate(1.8);border-radius:var(--wcm-notification-border-radius);border:1px solid var(--wcm-color-overlay);background-color:var(--wcm-color-overlay)}svg{margin-right:5px}@-moz-document url-prefix(){div{background-color:var(--wcm-color-bg-3)}}.wcm-success path{fill:var(--wcm-accent-color)}.wcm-error path{fill:var(--wcm-error-color)}`;
var Ei = Object.defineProperty, Oi = Object.getOwnPropertyDescriptor, pr = (t, e, r, i) => {
  for (var o = i > 1 ? void 0 : i ? Oi(e, r) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (o = (i ? a(e, r, o) : a(o)) || o);
  return i && o && Ei(e, r, o), o;
};
let He = class extends w {
  constructor() {
    super(), this.open = !1, this.unsubscribe = void 0, this.timeout = void 0, this.unsubscribe = Y.subscribe((t) => {
      t.open ? (this.open = !0, this.timeout = setTimeout(() => Y.closeToast(), 2200)) : (this.open = !1, clearTimeout(this.timeout));
    });
  }
  disconnectedCallback() {
    var t;
    (t = this.unsubscribe) == null || t.call(this), clearTimeout(this.timeout), Y.closeToast();
  }
  render() {
    const { message: t, variant: e } = Y.state, r = { "wcm-success": e === "success", "wcm-error": e === "error" };
    return this.open ? l`<div class="${Z(r)}">${e === "success" ? A.CHECKMARK_ICON : null} ${e === "error" ? A.CROSS_ICON : null}<wcm-text variant="small-regular">${t}</wcm-text></div>` : null;
  }
};
He.styles = [v.globalCss, _i], pr([W()], He.prototype, "open", 2), He = pr([y("wcm-modal-toast")], He);
const ki = 0.1, ur = 2.5, B = 7;
function bt(t, e, r) {
  return t === e ? !1 : (t - e < 0 ? e - t : t - e) <= r + ki;
}
function Ii(t, e) {
  const r = Array.prototype.slice.call(Hr.create(t, { errorCorrectionLevel: e }).modules.data, 0), i = Math.sqrt(r.length);
  return r.reduce((o, n, a) => (a % i === 0 ? o.push([n]) : o[o.length - 1].push(n)) && o, []);
}
const Ti = { generate(t, e, r) {
  const i = "#141414", o = "#ffffff", n = [], a = Ii(t, "Q"), s = e / a.length, c = [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }];
  c.forEach(({ x: f, y: u }) => {
    const I = (a.length - B) * s * f, b = (a.length - B) * s * u, M = 0.45;
    for (let S = 0; S < c.length; S += 1) {
      const D = s * (B - S * 2);
      n.push(E`<rect fill="${S % 2 === 0 ? i : o}" height="${D}" rx="${D * M}" ry="${D * M}" width="${D}" x="${I + s * S}" y="${b + s * S}">`);
    }
  });
  const d = Math.floor((r + 25) / s), x = a.length / 2 - d / 2, $ = a.length / 2 + d / 2 - 1, m = [];
  a.forEach((f, u) => {
    f.forEach((I, b) => {
      if (a[u][b] && !(u < B && b < B || u > a.length - (B + 1) && b < B || u < B && b > a.length - (B + 1)) && !(u > x && u < $ && b > x && b < $)) {
        const M = u * s + s / 2, S = b * s + s / 2;
        m.push([M, S]);
      }
    });
  });
  const _ = {};
  return m.forEach(([f, u]) => {
    _[f] ? _[f].push(u) : _[f] = [u];
  }), Object.entries(_).map(([f, u]) => {
    const I = u.filter((b) => u.every((M) => !bt(b, M, s)));
    return [Number(f), I];
  }).forEach(([f, u]) => {
    u.forEach((I) => {
      n.push(E`<circle cx="${f}" cy="${I}" fill="${i}" r="${s / ur}">`);
    });
  }), Object.entries(_).filter(([f, u]) => u.length > 1).map(([f, u]) => {
    const I = u.filter((b) => u.some((M) => bt(b, M, s)));
    return [Number(f), I];
  }).map(([f, u]) => {
    u.sort((b, M) => b < M ? -1 : 1);
    const I = [];
    for (const b of u) {
      const M = I.find((S) => S.some((D) => bt(b, D, s)));
      M ? M.push(b) : I.push([b]);
    }
    return [f, I.map((b) => [b[0], b[b.length - 1]])];
  }).forEach(([f, u]) => {
    u.forEach(([I, b]) => {
      n.push(E`<line x1="${f}" x2="${f}" y1="${I}" y2="${b}" stroke="${i}" stroke-width="${s / (ur / 2)}" stroke-linecap="round">`);
    });
  }), n;
} }, Pi = C`@keyframes fadeIn{0%{opacity:0}100%{opacity:1}}div{position:relative;user-select:none;display:block;overflow:hidden;aspect-ratio:1/1;animation:fadeIn ease .2s}.wcm-dark{background-color:#fff;border-radius:var(--wcm-container-border-radius);padding:18px;box-shadow:0 2px 5px #000}svg:first-child,wcm-wallet-image{position:absolute;top:50%;left:50%;transform:translateY(-50%) translateX(-50%)}wcm-wallet-image{transform:translateY(-50%) translateX(-50%)}wcm-wallet-image{width:25%;height:25%;border-radius:var(--wcm-wallet-icon-border-radius)}svg:first-child{transform:translateY(-50%) translateX(-50%) scale(.9)}svg:first-child path:first-child{fill:var(--wcm-accent-color)}svg:first-child path:last-child{stroke:var(--wcm-color-overlay)}`;
var Mi = Object.defineProperty, Si = Object.getOwnPropertyDescriptor, de = (t, e, r, i) => {
  for (var o = i > 1 ? void 0 : i ? Si(e, r) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (o = (i ? a(e, r, o) : a(o)) || o);
  return i && o && Mi(e, r, o), o;
};
let F = class extends w {
  constructor() {
    super(...arguments), this.uri = "", this.size = 0, this.imageId = void 0, this.walletId = void 0, this.imageUrl = void 0;
  }
  svgTemplate() {
    const t = fe.state.themeMode === "light" ? this.size : this.size - 36;
    return E`<svg height="${t}" width="${t}">${Ti.generate(this.uri, t, t / 4)}</svg>`;
  }
  render() {
    const t = { "wcm-dark": fe.state.themeMode === "dark" };
    return l`<div style="${`width: ${this.size}px`}" class="${Z(t)}">${this.walletId || this.imageUrl ? l`<wcm-wallet-image walletId="${R(this.walletId)}" imageId="${R(this.imageId)}" imageUrl="${R(this.imageUrl)}"></wcm-wallet-image>` : A.WALLET_CONNECT_ICON_COLORED} ${this.svgTemplate()}</div>`;
  }
};
F.styles = [v.globalCss, Pi], de([p()], F.prototype, "uri", 2), de([p({ type: Number })], F.prototype, "size", 2), de([p()], F.prototype, "imageId", 2), de([p()], F.prototype, "walletId", 2), de([p()], F.prototype, "imageUrl", 2), F = de([y("wcm-qrcode")], F);
const Ri = C`:host{position:relative;height:28px;width:80%}input{width:100%;height:100%;line-height:28px!important;border-radius:var(--wcm-input-border-radius);font-style:normal;font-family:-apple-system,system-ui,BlinkMacSystemFont,'Segoe UI',Roboto,Ubuntu,'Helvetica Neue',sans-serif;font-feature-settings:'case' on;font-weight:500;font-size:16px;letter-spacing:-.03em;padding:0 10px 0 34px;transition:.2s all ease;color:var(--wcm-color-fg-1);background-color:var(--wcm-color-bg-3);box-shadow:inset 0 0 0 1px var(--wcm-color-overlay);caret-color:var(--wcm-accent-color)}input::placeholder{color:var(--wcm-color-fg-2)}svg{left:10px;top:4px;pointer-events:none;position:absolute;width:20px;height:20px}input:focus-within{box-shadow:inset 0 0 0 1px var(--wcm-accent-color)}path{fill:var(--wcm-color-fg-2)}`;
var Li = Object.defineProperty, Wi = Object.getOwnPropertyDescriptor, gr = (t, e, r, i) => {
  for (var o = i > 1 ? void 0 : i ? Wi(e, r) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (o = (i ? a(e, r, o) : a(o)) || o);
  return i && o && Li(e, r, o), o;
};
let Be = class extends w {
  constructor() {
    super(...arguments), this.onChange = () => null;
  }
  render() {
    return l`<input type="text" @input="${this.onChange}" placeholder="Search wallets"> ${A.SEARCH_ICON}`;
  }
};
Be.styles = [v.globalCss, Ri], gr([p()], Be.prototype, "onChange", 2), Be = gr([y("wcm-search-input")], Be);
const Di = C`@keyframes rotate{100%{transform:rotate(360deg)}}@keyframes dash{0%{stroke-dasharray:1,150;stroke-dashoffset:0}50%{stroke-dasharray:90,150;stroke-dashoffset:-35}100%{stroke-dasharray:90,150;stroke-dashoffset:-124}}svg{animation:rotate 2s linear infinite;display:flex;justify-content:center;align-items:center}svg circle{stroke-linecap:round;animation:dash 1.5s ease infinite;stroke:var(--wcm-accent-color)}`;
var ji = Object.defineProperty, Ni = Object.getOwnPropertyDescriptor, Ui = (t, e, r, i) => {
  for (var o = i > 1 ? void 0 : i ? Ni(e, r) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (o = (i ? a(e, r, o) : a(o)) || o);
  return i && o && ji(e, r, o), o;
};
let yt = class extends w {
  render() {
    return l`<svg viewBox="0 0 50 50" width="24" height="24"><circle cx="25" cy="25" r="20" fill="none" stroke-width="4" stroke="#fff"/></svg>`;
  }
};
yt.styles = [v.globalCss, Di], yt = Ui([y("wcm-spinner")], yt);
const Hi = C`span{font-style:normal;font-family:var(--wcm-font-family);font-feature-settings:var(--wcm-font-feature-settings)}.wcm-xsmall-bold{font-family:var(--wcm-text-xsmall-bold-font-family);font-weight:var(--wcm-text-xsmall-bold-weight);font-size:var(--wcm-text-xsmall-bold-size);line-height:var(--wcm-text-xsmall-bold-line-height);letter-spacing:var(--wcm-text-xsmall-bold-letter-spacing);text-transform:var(--wcm-text-xsmall-bold-text-transform)}.wcm-xsmall-regular{font-family:var(--wcm-text-xsmall-regular-font-family);font-weight:var(--wcm-text-xsmall-regular-weight);font-size:var(--wcm-text-xsmall-regular-size);line-height:var(--wcm-text-xsmall-regular-line-height);letter-spacing:var(--wcm-text-xsmall-regular-letter-spacing);text-transform:var(--wcm-text-xsmall-regular-text-transform)}.wcm-small-thin{font-family:var(--wcm-text-small-thin-font-family);font-weight:var(--wcm-text-small-thin-weight);font-size:var(--wcm-text-small-thin-size);line-height:var(--wcm-text-small-thin-line-height);letter-spacing:var(--wcm-text-small-thin-letter-spacing);text-transform:var(--wcm-text-small-thin-text-transform)}.wcm-small-regular{font-family:var(--wcm-text-small-regular-font-family);font-weight:var(--wcm-text-small-regular-weight);font-size:var(--wcm-text-small-regular-size);line-height:var(--wcm-text-small-regular-line-height);letter-spacing:var(--wcm-text-small-regular-letter-spacing);text-transform:var(--wcm-text-small-regular-text-transform)}.wcm-medium-regular{font-family:var(--wcm-text-medium-regular-font-family);font-weight:var(--wcm-text-medium-regular-weight);font-size:var(--wcm-text-medium-regular-size);line-height:var(--wcm-text-medium-regular-line-height);letter-spacing:var(--wcm-text-medium-regular-letter-spacing);text-transform:var(--wcm-text-medium-regular-text-transform)}.wcm-big-bold{font-family:var(--wcm-text-big-bold-font-family);font-weight:var(--wcm-text-big-bold-weight);font-size:var(--wcm-text-big-bold-size);line-height:var(--wcm-text-big-bold-line-height);letter-spacing:var(--wcm-text-big-bold-letter-spacing);text-transform:var(--wcm-text-big-bold-text-transform)}:host(*){color:var(--wcm-color-fg-1)}.wcm-color-primary{color:var(--wcm-color-fg-1)}.wcm-color-secondary{color:var(--wcm-color-fg-2)}.wcm-color-tertiary{color:var(--wcm-color-fg-3)}.wcm-color-inverse{color:var(--wcm-accent-fill-color)}.wcm-color-accnt{color:var(--wcm-accent-color)}.wcm-color-error{color:var(--wcm-error-color)}`;
var Bi = Object.defineProperty, Zi = Object.getOwnPropertyDescriptor, xt = (t, e, r, i) => {
  for (var o = i > 1 ? void 0 : i ? Zi(e, r) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (o = (i ? a(e, r, o) : a(o)) || o);
  return i && o && Bi(e, r, o), o;
};
let Oe = class extends w {
  constructor() {
    super(...arguments), this.variant = "medium-regular", this.color = "primary";
  }
  render() {
    const t = { "wcm-big-bold": this.variant === "big-bold", "wcm-medium-regular": this.variant === "medium-regular", "wcm-small-regular": this.variant === "small-regular", "wcm-small-thin": this.variant === "small-thin", "wcm-xsmall-regular": this.variant === "xsmall-regular", "wcm-xsmall-bold": this.variant === "xsmall-bold", "wcm-color-primary": this.color === "primary", "wcm-color-secondary": this.color === "secondary", "wcm-color-tertiary": this.color === "tertiary", "wcm-color-inverse": this.color === "inverse", "wcm-color-accnt": this.color === "accent", "wcm-color-error": this.color === "error" };
    return l`<span><slot class="${Z(t)}"></slot></span>`;
  }
};
Oe.styles = [v.globalCss, Hi], xt([p()], Oe.prototype, "variant", 2), xt([p()], Oe.prototype, "color", 2), Oe = xt([y("wcm-text")], Oe);
const zi = C`button{width:100%;height:100%;border-radius:var(--wcm-button-hover-highlight-border-radius);display:flex;align-items:flex-start}button:active{background-color:var(--wcm-color-overlay)}@media(hover:hover){button:hover{background-color:var(--wcm-color-overlay)}}button>div{width:80px;padding:5px 0;display:flex;flex-direction:column;align-items:center}wcm-text{width:100%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;text-align:center}wcm-wallet-image{height:60px;width:60px;transition:all .2s ease;border-radius:var(--wcm-wallet-icon-border-radius);margin-bottom:5px}.wcm-sublabel{margin-top:2px}`;
var Vi = Object.defineProperty, Fi = Object.getOwnPropertyDescriptor, q = (t, e, r, i) => {
  for (var o = i > 1 ? void 0 : i ? Fi(e, r) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (o = (i ? a(e, r, o) : a(o)) || o);
  return i && o && Vi(e, r, o), o;
};
let U = class extends w {
  constructor() {
    super(...arguments), this.onClick = () => null, this.name = "", this.walletId = "", this.label = void 0, this.imageId = void 0, this.installed = !1, this.recent = !1;
  }
  sublabelTemplate() {
    return this.recent ? l`<wcm-text class="wcm-sublabel" variant="xsmall-bold" color="tertiary">RECENT</wcm-text>` : this.installed ? l`<wcm-text class="wcm-sublabel" variant="xsmall-bold" color="tertiary">INSTALLED</wcm-text>` : null;
  }
  handleClick() {
    Ur.click({ name: "WALLET_BUTTON", walletId: this.walletId }), this.onClick();
  }
  render() {
    var t;
    return l`<button @click="${this.handleClick.bind(this)}"><div><wcm-wallet-image walletId="${this.walletId}" imageId="${R(this.imageId)}"></wcm-wallet-image><wcm-text variant="xsmall-regular">${(t = this.label) != null ? t : h.getWalletName(this.name, !0)}</wcm-text>${this.sublabelTemplate()}</div></button>`;
  }
};
U.styles = [v.globalCss, zi], q([p()], U.prototype, "onClick", 2), q([p()], U.prototype, "name", 2), q([p()], U.prototype, "walletId", 2), q([p()], U.prototype, "label", 2), q([p()], U.prototype, "imageId", 2), q([p({ type: Boolean })], U.prototype, "installed", 2), q([p({ type: Boolean })], U.prototype, "recent", 2), U = q([y("wcm-wallet-button")], U);
const qi = C`:host{display:block}div{overflow:hidden;position:relative;border-radius:inherit;width:100%;height:100%;background-color:var(--wcm-color-overlay)}svg{position:relative;width:100%;height:100%}div::after{content:'';position:absolute;top:0;bottom:0;left:0;right:0;border-radius:inherit;border:1px solid var(--wcm-color-overlay)}div img{width:100%;height:100%;object-fit:cover;object-position:center}#wallet-placeholder-fill{fill:var(--wcm-color-bg-3)}#wallet-placeholder-dash{stroke:var(--wcm-color-overlay)}`;
var Ki = Object.defineProperty, Qi = Object.getOwnPropertyDescriptor, Ze = (t, e, r, i) => {
  for (var o = i > 1 ? void 0 : i ? Qi(e, r) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (o = (i ? a(e, r, o) : a(o)) || o);
  return i && o && Ki(e, r, o), o;
};
let he = class extends w {
  constructor() {
    super(...arguments), this.walletId = "", this.imageId = void 0, this.imageUrl = void 0;
  }
  render() {
    var t;
    const e = (t = this.imageUrl) != null && t.length ? this.imageUrl : h.getWalletIcon({ id: this.walletId, image_id: this.imageId });
    return l`${e.length ? l`<div><img crossorigin="anonymous" src="${e}" alt="${this.id}"></div>` : A.WALLET_PLACEHOLDER}`;
  }
};
he.styles = [v.globalCss, qi], Ze([p()], he.prototype, "walletId", 2), Ze([p()], he.prototype, "imageId", 2), Ze([p()], he.prototype, "imageUrl", 2), he = Ze([y("wcm-wallet-image")], he);
var Yi = Object.defineProperty, Gi = Object.getOwnPropertyDescriptor, wr = (t, e, r, i) => {
  for (var o = i > 1 ? void 0 : i ? Gi(e, r) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (o = (i ? a(e, r, o) : a(o)) || o);
  return i && o && Yi(e, r, o), o;
};
let $t = class extends w {
  constructor() {
    super(), this.preload = !0, this.preloadData();
  }
  async loadImages(t) {
    try {
      t != null && t.length && await Promise.all(t.map(async (e) => h.preloadImage(e)));
    } catch {
      console.info("Unsuccessful attempt at preloading some images", t);
    }
  }
  async preloadListings() {
    if (ae.state.enableExplorer) {
      await L.getRecomendedWallets(), H.setIsDataLoaded(!0);
      const { recomendedWallets: t } = L.state, e = t.map((r) => h.getWalletIcon(r));
      await this.loadImages(e);
    } else
      H.setIsDataLoaded(!0);
  }
  async preloadCustomImages() {
    const t = h.getCustomImageUrls();
    await this.loadImages(t);
  }
  async preloadData() {
    try {
      this.preload && (this.preload = !1, await Promise.all([this.preloadListings(), this.preloadCustomImages()]));
    } catch (t) {
      console.error(t), Y.openToast("Failed preloading", "error");
    }
  }
};
wr([W()], $t.prototype, "preload", 2), $t = wr([y("wcm-explorer-context")], $t);
var Xi = Object.defineProperty, Ji = Object.getOwnPropertyDescriptor, en = (t, e, r, i) => {
  for (var o = i > 1 ? void 0 : i ? Ji(e, r) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (o = (i ? a(e, r, o) : a(o)) || o);
  return i && o && Xi(e, r, o), o;
};
let vr = class extends w {
  constructor() {
    super(), this.unsubscribeTheme = void 0, v.setTheme(), this.unsubscribeTheme = fe.subscribe(v.setTheme);
  }
  disconnectedCallback() {
    var t;
    (t = this.unsubscribeTheme) == null || t.call(this);
  }
};
vr = en([y("wcm-theme-context")], vr);
const tn = C`@keyframes scroll{0%{transform:translate3d(0,0,0)}100%{transform:translate3d(calc(-70px * 9),0,0)}}.wcm-slider{position:relative;overflow-x:hidden;padding:10px 0;margin:0 -20px;width:calc(100% + 40px)}.wcm-track{display:flex;width:calc(70px * 18);animation:scroll 20s linear infinite;opacity:.7}.wcm-track svg{margin:0 5px}wcm-wallet-image{width:60px;height:60px;margin:0 5px;border-radius:var(--wcm-wallet-icon-border-radius)}.wcm-grid{display:grid;grid-template-columns:repeat(4,80px);justify-content:space-between}.wcm-title{display:flex;align-items:center;margin-bottom:10px}.wcm-title svg{margin-right:6px}.wcm-title path{fill:var(--wcm-accent-color)}wcm-modal-footer .wcm-title{padding:0 10px}wcm-button-big{position:absolute;top:50%;left:50%;transform:translateY(-50%) translateX(-50%);filter:drop-shadow(0 0 17px var(--wcm-color-bg-1))}wcm-info-footer{flex-direction:column;align-items:center;display:flex;width:100%;padding:5px 0}wcm-info-footer wcm-text{text-align:center;margin-bottom:15px}#wallet-placeholder-fill{fill:var(--wcm-color-bg-3)}#wallet-placeholder-dash{stroke:var(--wcm-color-overlay)}`;
var rn = Object.defineProperty, on = Object.getOwnPropertyDescriptor, nn = (t, e, r, i) => {
  for (var o = i > 1 ? void 0 : i ? on(e, r) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (o = (i ? a(e, r, o) : a(o)) || o);
  return i && o && rn(e, r, o), o;
};
let Ct = class extends w {
  onGoToQrcode() {
    O.push("Qrcode");
  }
  render() {
    const { recomendedWallets: t } = L.state, e = [...t, ...t], r = g.RECOMMENDED_WALLET_AMOUNT * 2;
    return l`<wcm-modal-header title="Connect your wallet" .onAction="${this.onGoToQrcode}" .actionIcon="${A.QRCODE_ICON}"></wcm-modal-header><wcm-modal-content><div class="wcm-title">${A.MOBILE_ICON}<wcm-text variant="small-regular" color="accent">WalletConnect</wcm-text></div><div class="wcm-slider"><div class="wcm-track">${[...Array(r)].map((i, o) => {
      const n = e[o % e.length];
      return n ? l`<wcm-wallet-image walletId="${n.id}" imageId="${n.image_id}"></wcm-wallet-image>` : A.WALLET_PLACEHOLDER;
    })}</div><wcm-button-big @click="${h.handleAndroidLinking}"><wcm-text variant="medium-regular" color="inverse">Select Wallet</wcm-text></wcm-button-big></div></wcm-modal-content><wcm-info-footer><wcm-text color="secondary" variant="small-thin">Choose WalletConnect to see supported apps on your device</wcm-text></wcm-info-footer>`;
  }
};
Ct.styles = [v.globalCss, tn], Ct = nn([y("wcm-android-wallet-selection")], Ct);
const an = C`@keyframes loading{to{stroke-dashoffset:0}}@keyframes shake{10%,90%{transform:translate3d(-1px,0,0)}20%,80%{transform:translate3d(1px,0,0)}30%,50%,70%{transform:translate3d(-2px,0,0)}40%,60%{transform:translate3d(2px,0,0)}}:host{display:flex;flex-direction:column;align-items:center}div{position:relative;width:110px;height:110px;display:flex;justify-content:center;align-items:center;margin:40px 0 20px 0;transform:translate3d(0,0,0)}svg{position:absolute;width:110px;height:110px;fill:none;stroke:transparent;stroke-linecap:round;stroke-width:2px;top:0;left:0}use{stroke:var(--wcm-accent-color);animation:loading 1s linear infinite}wcm-wallet-image{border-radius:var(--wcm-wallet-icon-large-border-radius);width:90px;height:90px}wcm-text{margin-bottom:40px}.wcm-error svg{stroke:var(--wcm-error-color)}.wcm-error use{display:none}.wcm-error{animation:shake .4s cubic-bezier(.36,.07,.19,.97) both}.wcm-stale svg,.wcm-stale use{display:none}`;
var sn = Object.defineProperty, ln = Object.getOwnPropertyDescriptor, me = (t, e, r, i) => {
  for (var o = i > 1 ? void 0 : i ? ln(e, r) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (o = (i ? a(e, r, o) : a(o)) || o);
  return i && o && sn(e, r, o), o;
};
let K = class extends w {
  constructor() {
    super(...arguments), this.walletId = void 0, this.imageId = void 0, this.isError = !1, this.isStale = !1, this.label = "";
  }
  svgLoaderTemplate() {
    var t, e;
    const r = (e = (t = fe.state.themeVariables) == null ? void 0 : t["--wcm-wallet-icon-large-border-radius"]) != null ? e : v.getPreset("--wcm-wallet-icon-large-border-radius");
    let i = 0;
    r.includes("%") ? i = 88 / 100 * parseInt(r, 10) : i = parseInt(r, 10), i *= 1.17;
    const o = 317 - i * 1.57, n = 425 - i * 1.8;
    return l`<svg viewBox="0 0 110 110" width="110" height="110"><rect id="wcm-loader" x="2" y="2" width="106" height="106" rx="${i}"/><use xlink:href="#wcm-loader" stroke-dasharray="106 ${o}" stroke-dashoffset="${n}"></use></svg>`;
  }
  render() {
    const t = { "wcm-error": this.isError, "wcm-stale": this.isStale };
    return l`<div class="${Z(t)}">${this.svgLoaderTemplate()}<wcm-wallet-image walletId="${R(this.walletId)}" imageId="${R(this.imageId)}"></wcm-wallet-image></div><wcm-text variant="medium-regular" color="${this.isError ? "error" : "primary"}">${this.isError ? "Connection declined" : this.label}</wcm-text>`;
  }
};
K.styles = [v.globalCss, an], me([p()], K.prototype, "walletId", 2), me([p()], K.prototype, "imageId", 2), me([p({ type: Boolean })], K.prototype, "isError", 2), me([p({ type: Boolean })], K.prototype, "isStale", 2), me([p()], K.prototype, "label", 2), K = me([y("wcm-connector-waiting")], K);
const ve = { manualWallets() {
  var t, e;
  const { mobileWallets: r, desktopWallets: i } = ae.state, o = (t = ve.recentWallet()) == null ? void 0 : t.id, n = g.isMobile() ? r : i, a = n == null ? void 0 : n.filter((s) => o !== s.id);
  return (e = g.isMobile() ? a == null ? void 0 : a.map(({ id: s, name: c, links: d }) => ({ id: s, name: c, mobile: d, links: d })) : a == null ? void 0 : a.map(({ id: s, name: c, links: d }) => ({ id: s, name: c, desktop: d, links: d }))) != null ? e : [];
}, recentWallet() {
  return h.getRecentWallet();
}, recomendedWallets(t = !1) {
  var e;
  const r = t || (e = ve.recentWallet()) == null ? void 0 : e.id, { recomendedWallets: i } = L.state;
  return i.filter((o) => r !== o.id);
} }, X = { onConnecting(t) {
  h.goToConnectingView(t);
}, manualWalletsTemplate() {
  return ve.manualWallets().map((t) => l`<wcm-wallet-button walletId="${t.id}" name="${t.name}" .onClick="${() => this.onConnecting(t)}"></wcm-wallet-button>`);
}, recomendedWalletsTemplate(t = !1) {
  return ve.recomendedWallets(t).map((e) => l`<wcm-wallet-button name="${e.name}" walletId="${e.id}" imageId="${e.image_id}" .onClick="${() => this.onConnecting(e)}"></wcm-wallet-button>`);
}, recentWalletTemplate() {
  const t = ve.recentWallet();
  if (t)
    return l`<wcm-wallet-button name="${t.name}" walletId="${t.id}" imageId="${R(t.image_id)}" .recent="${!0}" .onClick="${() => this.onConnecting(t)}"></wcm-wallet-button>`;
} }, cn = C`.wcm-grid{display:grid;grid-template-columns:repeat(4,80px);justify-content:space-between}.wcm-desktop-title,.wcm-mobile-title{display:flex;align-items:center}.wcm-mobile-title{justify-content:space-between;margin-bottom:20px;margin-top:-10px}.wcm-desktop-title{margin-bottom:10px;padding:0 10px}.wcm-subtitle{display:flex;align-items:center}.wcm-subtitle:last-child path{fill:var(--wcm-color-fg-3)}.wcm-desktop-title svg,.wcm-mobile-title svg{margin-right:6px}.wcm-desktop-title path,.wcm-mobile-title path{fill:var(--wcm-accent-color)}`;
var dn = Object.defineProperty, hn = Object.getOwnPropertyDescriptor, mn = (t, e, r, i) => {
  for (var o = i > 1 ? void 0 : i ? hn(e, r) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (o = (i ? a(e, r, o) : a(o)) || o);
  return i && o && dn(e, r, o), o;
};
let At = class extends w {
  render() {
    const { explorerExcludedWalletIds: t, enableExplorer: e } = ae.state, r = t !== "ALL" && e, i = X.manualWalletsTemplate(), o = X.recomendedWalletsTemplate();
    let n = [X.recentWalletTemplate(), ...i, ...o];
    n = n.filter(Boolean);
    const a = n.length > 4 || r;
    let s = [];
    a ? s = n.slice(0, 3) : s = n;
    const c = !!s.length;
    return l`<wcm-modal-header .border="${!0}" title="Connect your wallet" .onAction="${h.handleUriCopy}" .actionIcon="${A.COPY_ICON}"></wcm-modal-header><wcm-modal-content><div class="wcm-mobile-title"><div class="wcm-subtitle">${A.MOBILE_ICON}<wcm-text variant="small-regular" color="accent">Mobile</wcm-text></div><div class="wcm-subtitle">${A.SCAN_ICON}<wcm-text variant="small-regular" color="secondary">Scan with your wallet</wcm-text></div></div><wcm-walletconnect-qr></wcm-walletconnect-qr></wcm-modal-content>${c ? l`<wcm-modal-footer><div class="wcm-desktop-title">${A.DESKTOP_ICON}<wcm-text variant="small-regular" color="accent">Desktop</wcm-text></div><div class="wcm-grid">${s} ${a ? l`<wcm-view-all-wallets-button></wcm-view-all-wallets-button>` : null}</div></wcm-modal-footer>` : null}`;
  }
};
At.styles = [v.globalCss, cn], At = mn([y("wcm-desktop-wallet-selection")], At);
const pn = C`div{background-color:var(--wcm-color-bg-2);padding:10px 20px 15px 20px;border-top:1px solid var(--wcm-color-bg-3);text-align:center}a{color:var(--wcm-accent-color);text-decoration:none;transition:opacity .2s ease-in-out;display:inline}a:active{opacity:.8}@media(hover:hover){a:hover{opacity:.8}}`;
var un = Object.defineProperty, gn = Object.getOwnPropertyDescriptor, wn = (t, e, r, i) => {
  for (var o = i > 1 ? void 0 : i ? gn(e, r) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (o = (i ? a(e, r, o) : a(o)) || o);
  return i && o && un(e, r, o), o;
};
let _t = class extends w {
  render() {
    const { termsOfServiceUrl: t, privacyPolicyUrl: e } = ae.state;
    return t ?? e ? l`<div><wcm-text variant="small-regular" color="secondary">By connecting your wallet to this app, you agree to the app's ${t ? l`<a href="${t}" target="_blank" rel="noopener noreferrer">Terms of Service</a>` : null} ${t && e ? "and" : null} ${e ? l`<a href="${e}" target="_blank" rel="noopener noreferrer">Privacy Policy</a>` : null}</wcm-text></div>` : null;
  }
};
_t.styles = [v.globalCss, pn], _t = wn([y("wcm-legal-notice")], _t);
const vn = C`div{display:grid;grid-template-columns:repeat(4,80px);margin:0 -10px;justify-content:space-between;row-gap:10px}`;
var fn = Object.defineProperty, bn = Object.getOwnPropertyDescriptor, yn = (t, e, r, i) => {
  for (var o = i > 1 ? void 0 : i ? bn(e, r) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (o = (i ? a(e, r, o) : a(o)) || o);
  return i && o && fn(e, r, o), o;
};
let Et = class extends w {
  onQrcode() {
    O.push("Qrcode");
  }
  render() {
    const { explorerExcludedWalletIds: t, enableExplorer: e } = ae.state, r = t !== "ALL" && e, i = X.manualWalletsTemplate(), o = X.recomendedWalletsTemplate();
    let n = [X.recentWalletTemplate(), ...i, ...o];
    n = n.filter(Boolean);
    const a = n.length > 8 || r;
    let s = [];
    a ? s = n.slice(0, 7) : s = n;
    const c = !!s.length;
    return l`<wcm-modal-header title="Connect your wallet" .onAction="${this.onQrcode}" .actionIcon="${A.QRCODE_ICON}"></wcm-modal-header>${c ? l`<wcm-modal-content><div>${s} ${a ? l`<wcm-view-all-wallets-button></wcm-view-all-wallets-button>` : null}</div></wcm-modal-content>` : null}`;
  }
};
Et.styles = [v.globalCss, vn], Et = yn([y("wcm-mobile-wallet-selection")], Et);
const xn = C`:host{all:initial}.wcm-overlay{top:0;bottom:0;left:0;right:0;position:fixed;z-index:var(--wcm-z-index);overflow:hidden;display:flex;justify-content:center;align-items:center;opacity:0;pointer-events:none;background-color:var(--wcm-overlay-background-color);backdrop-filter:var(--wcm-overlay-backdrop-filter)}@media(max-height:720px) and (orientation:landscape){.wcm-overlay{overflow:scroll;align-items:flex-start;padding:20px 0}}.wcm-active{pointer-events:auto}.wcm-container{position:relative;max-width:360px;width:100%;outline:0;border-radius:var(--wcm-background-border-radius) var(--wcm-background-border-radius) var(--wcm-container-border-radius) var(--wcm-container-border-radius);border:1px solid var(--wcm-color-overlay);overflow:hidden}.wcm-card{width:100%;position:relative;border-radius:var(--wcm-container-border-radius);overflow:hidden;box-shadow:0 6px 14px -6px rgba(10,16,31,.12),0 10px 32px -4px rgba(10,16,31,.1),0 0 0 1px var(--wcm-color-overlay);background-color:var(--wcm-color-bg-1);color:var(--wcm-color-fg-1)}@media(max-width:600px){.wcm-container{max-width:440px;border-radius:var(--wcm-background-border-radius) var(--wcm-background-border-radius) 0 0}.wcm-card{border-radius:var(--wcm-container-border-radius) var(--wcm-container-border-radius) 0 0}.wcm-overlay{align-items:flex-end}}@media(max-width:440px){.wcm-container{border:0}}`;
var $n = Object.defineProperty, Cn = Object.getOwnPropertyDescriptor, Ot = (t, e, r, i) => {
  for (var o = i > 1 ? void 0 : i ? Cn(e, r) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (o = (i ? a(e, r, o) : a(o)) || o);
  return i && o && $n(e, r, o), o;
};
let ke = class extends w {
  constructor() {
    super(), this.open = !1, this.active = !1, this.unsubscribeModal = void 0, this.abortController = void 0, this.unsubscribeModal = Ke.subscribe((t) => {
      t.open ? this.onOpenModalEvent() : this.onCloseModalEvent();
    });
  }
  disconnectedCallback() {
    var t;
    (t = this.unsubscribeModal) == null || t.call(this);
  }
  get overlayEl() {
    return h.getShadowRootElement(this, ".wcm-overlay");
  }
  get containerEl() {
    return h.getShadowRootElement(this, ".wcm-container");
  }
  toggleBodyScroll(t) {
    if (document.querySelector("body"))
      if (t) {
        const e = document.getElementById("wcm-styles");
        e == null || e.remove();
      } else
        document.head.insertAdjacentHTML("beforeend", '<style id="wcm-styles">html,body{touch-action:none;overflow:hidden;overscroll-behavior:contain;}</style>');
  }
  onCloseModal(t) {
    t.target === t.currentTarget && Ke.close();
  }
  onOpenModalEvent() {
    this.toggleBodyScroll(!1), this.addKeyboardEvents(), this.open = !0, setTimeout(async () => {
      const t = h.isMobileAnimation() ? { y: ["50vh", "0vh"] } : { scale: [0.98, 1] }, e = 0.1, r = 0.2;
      await Promise.all([ne(this.overlayEl, { opacity: [0, 1] }, { delay: e, duration: r }).finished, ne(this.containerEl, t, { delay: e, duration: r }).finished]), this.active = !0;
    }, 0);
  }
  async onCloseModalEvent() {
    this.toggleBodyScroll(!0), this.removeKeyboardEvents();
    const t = h.isMobileAnimation() ? { y: ["0vh", "50vh"] } : { scale: [1, 0.98] }, e = 0.2;
    await Promise.all([ne(this.overlayEl, { opacity: [1, 0] }, { duration: e }).finished, ne(this.containerEl, t, { duration: e }).finished]), this.containerEl.removeAttribute("style"), this.active = !1, this.open = !1;
  }
  addKeyboardEvents() {
    this.abortController = new AbortController(), window.addEventListener("keydown", (t) => {
      var e;
      t.key === "Escape" ? Ke.close() : t.key === "Tab" && ((e = t.target) != null && e.tagName.includes("wcm-") || this.containerEl.focus());
    }, this.abortController), this.containerEl.focus();
  }
  removeKeyboardEvents() {
    var t;
    (t = this.abortController) == null || t.abort(), this.abortController = void 0;
  }
  render() {
    const t = { "wcm-overlay": !0, "wcm-active": this.active };
    return l`<wcm-explorer-context></wcm-explorer-context><wcm-theme-context></wcm-theme-context><div id="wcm-modal" class="${Z(t)}" @click="${this.onCloseModal}" role="alertdialog" aria-modal="true"><div class="wcm-container" tabindex="0">${this.open ? l`<wcm-modal-backcard></wcm-modal-backcard><div class="wcm-card"><wcm-modal-router></wcm-modal-router><wcm-modal-toast></wcm-modal-toast></div>` : null}</div></div>`;
  }
};
ke.styles = [v.globalCss, xn], Ot([W()], ke.prototype, "open", 2), Ot([W()], ke.prototype, "active", 2), ke = Ot([y("wcm-modal")], ke);
const An = C`div{display:flex;margin-top:15px}slot{display:inline-block;margin:0 5px}wcm-button{margin:0 5px}`;
var _n = Object.defineProperty, En = Object.getOwnPropertyDescriptor, Ie = (t, e, r, i) => {
  for (var o = i > 1 ? void 0 : i ? En(e, r) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (o = (i ? a(e, r, o) : a(o)) || o);
  return i && o && _n(e, r, o), o;
};
let re = class extends w {
  constructor() {
    super(...arguments), this.isMobile = !1, this.isDesktop = !1, this.isWeb = !1, this.isRetry = !1;
  }
  onMobile() {
    g.isMobile() ? O.replace("MobileConnecting") : O.replace("MobileQrcodeConnecting");
  }
  onDesktop() {
    O.replace("DesktopConnecting");
  }
  onWeb() {
    O.replace("WebConnecting");
  }
  render() {
    return l`<div>${this.isRetry ? l`<slot></slot>` : null} ${this.isMobile ? l`<wcm-button .onClick="${this.onMobile}" .iconLeft="${A.MOBILE_ICON}" variant="outline">Mobile</wcm-button>` : null} ${this.isDesktop ? l`<wcm-button .onClick="${this.onDesktop}" .iconLeft="${A.DESKTOP_ICON}" variant="outline">Desktop</wcm-button>` : null} ${this.isWeb ? l`<wcm-button .onClick="${this.onWeb}" .iconLeft="${A.GLOBE_ICON}" variant="outline">Web</wcm-button>` : null}</div>`;
  }
};
re.styles = [v.globalCss, An], Ie([p({ type: Boolean })], re.prototype, "isMobile", 2), Ie([p({ type: Boolean })], re.prototype, "isDesktop", 2), Ie([p({ type: Boolean })], re.prototype, "isWeb", 2), Ie([p({ type: Boolean })], re.prototype, "isRetry", 2), re = Ie([y("wcm-platform-selection")], re);
const On = C`button{display:flex;flex-direction:column;padding:5px 10px;border-radius:var(--wcm-button-hover-highlight-border-radius);height:100%;justify-content:flex-start}.wcm-icons{width:60px;height:60px;display:flex;flex-wrap:wrap;padding:7px;border-radius:var(--wcm-wallet-icon-border-radius);justify-content:space-between;align-items:center;margin-bottom:5px;background-color:var(--wcm-color-bg-2);box-shadow:inset 0 0 0 1px var(--wcm-color-overlay)}button:active{background-color:var(--wcm-color-overlay)}@media(hover:hover){button:hover{background-color:var(--wcm-color-overlay)}}.wcm-icons img{width:21px;height:21px;object-fit:cover;object-position:center;border-radius:calc(var(--wcm-wallet-icon-border-radius)/ 2);border:1px solid var(--wcm-color-overlay)}.wcm-icons svg{width:21px;height:21px}.wcm-icons img:nth-child(1),.wcm-icons img:nth-child(2),.wcm-icons svg:nth-child(1),.wcm-icons svg:nth-child(2){margin-bottom:4px}wcm-text{width:100%;text-align:center}#wallet-placeholder-fill{fill:var(--wcm-color-bg-3)}#wallet-placeholder-dash{stroke:var(--wcm-color-overlay)}`;
var kn = Object.defineProperty, In = Object.getOwnPropertyDescriptor, Tn = (t, e, r, i) => {
  for (var o = i > 1 ? void 0 : i ? In(e, r) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (o = (i ? a(e, r, o) : a(o)) || o);
  return i && o && kn(e, r, o), o;
};
let kt = class extends w {
  onClick() {
    O.push("WalletExplorer");
  }
  render() {
    const { recomendedWallets: t } = L.state, e = ve.manualWallets(), r = [...t, ...e].reverse().slice(0, 4);
    return l`<button @click="${this.onClick}"><div class="wcm-icons">${r.map((i) => {
      const o = h.getWalletIcon(i);
      if (o)
        return l`<img crossorigin="anonymous" src="${o}">`;
      const n = h.getWalletIcon({ id: i.id });
      return n ? l`<img crossorigin="anonymous" src="${n}">` : A.WALLET_PLACEHOLDER;
    })} ${[...Array(4 - r.length)].map(() => A.WALLET_PLACEHOLDER)}</div><wcm-text variant="xsmall-regular">View All</wcm-text></button>`;
  }
};
kt.styles = [v.globalCss, On], kt = Tn([y("wcm-view-all-wallets-button")], kt);
const Pn = C`.wcm-qr-container{width:100%;display:flex;justify-content:center;align-items:center;aspect-ratio:1/1}`;
var Mn = Object.defineProperty, Sn = Object.getOwnPropertyDescriptor, ze = (t, e, r, i) => {
  for (var o = i > 1 ? void 0 : i ? Sn(e, r) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (o = (i ? a(e, r, o) : a(o)) || o);
  return i && o && Mn(e, r, o), o;
};
let pe = class extends w {
  constructor() {
    super(), this.walletId = "", this.imageId = "", this.uri = "", setTimeout(() => {
      const { walletConnectUri: t } = H.state;
      this.uri = t;
    }, 0);
  }
  get overlayEl() {
    return h.getShadowRootElement(this, ".wcm-qr-container");
  }
  render() {
    return l`<div class="wcm-qr-container">${this.uri ? l`<wcm-qrcode size="${this.overlayEl.offsetWidth}" uri="${this.uri}" walletId="${R(this.walletId)}" imageId="${R(this.imageId)}"></wcm-qrcode>` : l`<wcm-spinner></wcm-spinner>`}</div>`;
  }
};
pe.styles = [v.globalCss, Pn], ze([p()], pe.prototype, "walletId", 2), ze([p()], pe.prototype, "imageId", 2), ze([W()], pe.prototype, "uri", 2), pe = ze([y("wcm-walletconnect-qr")], pe);
var Rn = Object.defineProperty, Ln = Object.getOwnPropertyDescriptor, Wn = (t, e, r, i) => {
  for (var o = i > 1 ? void 0 : i ? Ln(e, r) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (o = (i ? a(e, r, o) : a(o)) || o);
  return i && o && Rn(e, r, o), o;
};
let It = class extends w {
  viewTemplate() {
    return g.isAndroid() ? l`<wcm-android-wallet-selection></wcm-android-wallet-selection>` : g.isMobile() ? l`<wcm-mobile-wallet-selection></wcm-mobile-wallet-selection>` : l`<wcm-desktop-wallet-selection></wcm-desktop-wallet-selection>`;
  }
  render() {
    return l`${this.viewTemplate()}<wcm-legal-notice></wcm-legal-notice>`;
  }
};
It.styles = [v.globalCss], It = Wn([y("wcm-connect-wallet-view")], It);
const Dn = C`wcm-info-footer{flex-direction:column;align-items:center;display:flex;width:100%;padding:5px 0}wcm-text{text-align:center}`;
var jn = Object.defineProperty, Nn = Object.getOwnPropertyDescriptor, fr = (t, e, r, i) => {
  for (var o = i > 1 ? void 0 : i ? Nn(e, r) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (o = (i ? a(e, r, o) : a(o)) || o);
  return i && o && jn(e, r, o), o;
};
let Ve = class extends w {
  constructor() {
    super(), this.isError = !1, this.openDesktopApp();
  }
  onFormatAndRedirect(t) {
    const { desktop: e, name: r } = g.getWalletRouterData(), i = e == null ? void 0 : e.native;
    if (i) {
      const o = g.formatNativeUrl(i, t, r);
      g.openHref(o, "_self");
    }
  }
  openDesktopApp() {
    const { walletConnectUri: t } = H.state, e = g.getWalletRouterData();
    h.setRecentWallet(e), t && this.onFormatAndRedirect(t);
  }
  render() {
    const { name: t, id: e, image_id: r } = g.getWalletRouterData(), { isMobile: i, isWeb: o } = h.getCachedRouterWalletPlatforms();
    return l`<wcm-modal-header title="${t}" .onAction="${h.handleUriCopy}" .actionIcon="${A.COPY_ICON}"></wcm-modal-header><wcm-modal-content><wcm-connector-waiting walletId="${e}" imageId="${R(r)}" label="${`Continue in ${t}...`}" .isError="${this.isError}"></wcm-connector-waiting></wcm-modal-content><wcm-info-footer><wcm-text color="secondary" variant="small-thin">${`Connection can continue loading if ${t} is not installed on your device`}</wcm-text><wcm-platform-selection .isMobile="${i}" .isWeb="${o}" .isRetry="${!0}"><wcm-button .onClick="${this.openDesktopApp.bind(this)}" .iconRight="${A.RETRY_ICON}">Retry</wcm-button></wcm-platform-selection></wcm-info-footer>`;
  }
};
Ve.styles = [v.globalCss, Dn], fr([W()], Ve.prototype, "isError", 2), Ve = fr([y("wcm-desktop-connecting-view")], Ve);
const Un = C`wcm-info-footer{flex-direction:column;align-items:center;display:flex;width:100%;padding:5px 0}wcm-text{text-align:center}wcm-button{margin-top:15px}`;
var Hn = Object.defineProperty, Bn = Object.getOwnPropertyDescriptor, Zn = (t, e, r, i) => {
  for (var o = i > 1 ? void 0 : i ? Bn(e, r) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (o = (i ? a(e, r, o) : a(o)) || o);
  return i && o && Hn(e, r, o), o;
};
let Tt = class extends w {
  onInstall(t) {
    t && g.openHref(t, "_blank");
  }
  render() {
    const { name: t, id: e, image_id: r, homepage: i } = g.getWalletRouterData();
    return l`<wcm-modal-header title="${t}"></wcm-modal-header><wcm-modal-content><wcm-connector-waiting walletId="${e}" imageId="${R(r)}" label="Not Detected" .isStale="${!0}"></wcm-connector-waiting></wcm-modal-content><wcm-info-footer><wcm-text color="secondary" variant="small-thin">${`Download ${t} to continue. If multiple browser extensions are installed, disable non ${t} ones and try again`}</wcm-text><wcm-button .onClick="${() => this.onInstall(i)}" .iconLeft="${A.ARROW_DOWN_ICON}">Download</wcm-button></wcm-info-footer>`;
  }
};
Tt.styles = [v.globalCss, Un], Tt = Zn([y("wcm-install-wallet-view")], Tt);
const zn = C`wcm-wallet-image{border-radius:var(--wcm-wallet-icon-large-border-radius);width:96px;height:96px;margin-bottom:20px}wcm-info-footer{display:flex;width:100%}.wcm-app-store{justify-content:space-between}.wcm-app-store wcm-wallet-image{margin-right:10px;margin-bottom:0;width:28px;height:28px;border-radius:var(--wcm-wallet-icon-small-border-radius)}.wcm-app-store div{display:flex;align-items:center}.wcm-app-store wcm-button{margin-right:-10px}.wcm-note{flex-direction:column;align-items:center;padding:5px 0}.wcm-note wcm-text{text-align:center}wcm-platform-selection{margin-top:-15px}.wcm-note wcm-text{margin-top:15px}.wcm-note wcm-text span{color:var(--wcm-accent-color)}`;
var Vn = Object.defineProperty, Fn = Object.getOwnPropertyDescriptor, br = (t, e, r, i) => {
  for (var o = i > 1 ? void 0 : i ? Fn(e, r) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (o = (i ? a(e, r, o) : a(o)) || o);
  return i && o && Vn(e, r, o), o;
};
let Fe = class extends w {
  constructor() {
    super(), this.isError = !1, this.openMobileApp();
  }
  onFormatAndRedirect(t, e = !1) {
    const { mobile: r, name: i } = g.getWalletRouterData(), o = r == null ? void 0 : r.native, n = r == null ? void 0 : r.universal;
    if (o && !e) {
      const a = g.formatNativeUrl(o, t, i);
      g.openHref(a, "_self");
    } else if (n) {
      const a = g.formatUniversalUrl(n, t, i);
      g.openHref(a, "_self");
    }
  }
  openMobileApp(t = !1) {
    const { walletConnectUri: e } = H.state, r = g.getWalletRouterData();
    h.setRecentWallet(r), e && this.onFormatAndRedirect(e, t);
  }
  onGoToAppStore(t) {
    t && g.openHref(t, "_blank");
  }
  render() {
    const { name: t, id: e, image_id: r, app: i, mobile: o } = g.getWalletRouterData(), { isWeb: n } = h.getCachedRouterWalletPlatforms(), a = i == null ? void 0 : i.ios, s = o == null ? void 0 : o.universal;
    return l`<wcm-modal-header title="${t}"></wcm-modal-header><wcm-modal-content><wcm-connector-waiting walletId="${e}" imageId="${R(r)}" label="Tap 'Open' to continue…" .isError="${this.isError}"></wcm-connector-waiting></wcm-modal-content><wcm-info-footer class="wcm-note"><wcm-platform-selection .isWeb="${n}" .isRetry="${!0}"><wcm-button .onClick="${() => this.openMobileApp(!1)}" .iconRight="${A.RETRY_ICON}">Retry</wcm-button></wcm-platform-selection>${s ? l`<wcm-text color="secondary" variant="small-thin">Still doesn't work? <span tabindex="0" @click="${() => this.openMobileApp(!0)}">Try this alternate link</span></wcm-text>` : null}</wcm-info-footer><wcm-info-footer class="wcm-app-store"><div><wcm-wallet-image walletId="${e}" imageId="${R(r)}"></wcm-wallet-image><wcm-text>${`Get ${t}`}</wcm-text></div><wcm-button .iconRight="${A.ARROW_RIGHT_ICON}" .onClick="${() => this.onGoToAppStore(a)}" variant="ghost">App Store</wcm-button></wcm-info-footer>`;
  }
};
Fe.styles = [v.globalCss, zn], br([W()], Fe.prototype, "isError", 2), Fe = br([y("wcm-mobile-connecting-view")], Fe);
const qn = C`wcm-info-footer{flex-direction:column;align-items:center;display:flex;width:100%;padding:5px 0}wcm-text{text-align:center}`;
var Kn = Object.defineProperty, Qn = Object.getOwnPropertyDescriptor, Yn = (t, e, r, i) => {
  for (var o = i > 1 ? void 0 : i ? Qn(e, r) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (o = (i ? a(e, r, o) : a(o)) || o);
  return i && o && Kn(e, r, o), o;
};
let Pt = class extends w {
  render() {
    const { name: t, id: e, image_id: r } = g.getWalletRouterData(), { isDesktop: i, isWeb: o } = h.getCachedRouterWalletPlatforms();
    return l`<wcm-modal-header title="${t}" .onAction="${h.handleUriCopy}" .actionIcon="${A.COPY_ICON}"></wcm-modal-header><wcm-modal-content><wcm-walletconnect-qr walletId="${e}" imageId="${R(r)}"></wcm-walletconnect-qr></wcm-modal-content><wcm-info-footer><wcm-text color="secondary" variant="small-thin">${`Scan this QR Code with your phone's camera or inside ${t} app`}</wcm-text><wcm-platform-selection .isDesktop="${i}" .isWeb="${o}"></wcm-platform-selection></wcm-info-footer>`;
  }
};
Pt.styles = [v.globalCss, qn], Pt = Yn([y("wcm-mobile-qr-connecting-view")], Pt);
var Gn = Object.defineProperty, Xn = Object.getOwnPropertyDescriptor, Jn = (t, e, r, i) => {
  for (var o = i > 1 ? void 0 : i ? Xn(e, r) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (o = (i ? a(e, r, o) : a(o)) || o);
  return i && o && Gn(e, r, o), o;
};
let Mt = class extends w {
  render() {
    return l`<wcm-modal-header title="Scan the code" .onAction="${h.handleUriCopy}" .actionIcon="${A.COPY_ICON}"></wcm-modal-header><wcm-modal-content><wcm-walletconnect-qr></wcm-walletconnect-qr></wcm-modal-content>`;
  }
};
Mt.styles = [v.globalCss], Mt = Jn([y("wcm-qrcode-view")], Mt);
const ea = C`wcm-modal-content{height:clamp(200px,60vh,600px);display:block;overflow:scroll;scrollbar-width:none;position:relative;margin-top:1px}.wcm-grid{display:grid;grid-template-columns:repeat(4,80px);justify-content:space-between;margin:-15px -10px;padding-top:20px}wcm-modal-content::after,wcm-modal-content::before{content:'';position:fixed;pointer-events:none;z-index:1;width:100%;height:20px;opacity:1}wcm-modal-content::before{box-shadow:0 -1px 0 0 var(--wcm-color-bg-1);background:linear-gradient(var(--wcm-color-bg-1),rgba(255,255,255,0))}wcm-modal-content::after{box-shadow:0 1px 0 0 var(--wcm-color-bg-1);background:linear-gradient(rgba(255,255,255,0),var(--wcm-color-bg-1));top:calc(100% - 20px)}wcm-modal-content::-webkit-scrollbar{display:none}.wcm-placeholder-block{display:flex;justify-content:center;align-items:center;height:100px;overflow:hidden}.wcm-empty,.wcm-loading{display:flex}.wcm-loading .wcm-placeholder-block{height:100%}.wcm-end-reached .wcm-placeholder-block{height:0;opacity:0}.wcm-empty .wcm-placeholder-block{opacity:1;height:100%}wcm-wallet-button{margin:calc((100% - 60px)/ 3) 0}`;
var ta = Object.defineProperty, ra = Object.getOwnPropertyDescriptor, Te = (t, e, r, i) => {
  for (var o = i > 1 ? void 0 : i ? ra(e, r) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (o = (i ? a(e, r, o) : a(o)) || o);
  return i && o && ta(e, r, o), o;
};
const St = 40;
let oe = class extends w {
  constructor() {
    super(...arguments), this.loading = !L.state.wallets.listings.length, this.firstFetch = !L.state.wallets.listings.length, this.search = "", this.endReached = !1, this.intersectionObserver = void 0, this.searchDebounce = h.debounce((t) => {
      t.length >= 1 ? (this.firstFetch = !0, this.endReached = !1, this.search = t, L.resetSearch(), this.fetchWallets()) : this.search && (this.search = "", this.endReached = this.isLastPage(), L.resetSearch());
    });
  }
  firstUpdated() {
    this.createPaginationObserver();
  }
  disconnectedCallback() {
    var t;
    (t = this.intersectionObserver) == null || t.disconnect();
  }
  get placeholderEl() {
    return h.getShadowRootElement(this, ".wcm-placeholder-block");
  }
  createPaginationObserver() {
    this.intersectionObserver = new IntersectionObserver(([t]) => {
      t.isIntersecting && !(this.search && this.firstFetch) && this.fetchWallets();
    }), this.intersectionObserver.observe(this.placeholderEl);
  }
  isLastPage() {
    const { wallets: t, search: e } = L.state, { listings: r, total: i } = this.search ? e : t;
    return i <= St || r.length >= i;
  }
  async fetchWallets() {
    var t;
    const { wallets: e, search: r } = L.state, { listings: i, total: o, page: n } = this.search ? r : e;
    if (!this.endReached && (this.firstFetch || o > St && i.length < o))
      try {
        this.loading = !0;
        const a = (t = H.state.chains) == null ? void 0 : t.join(","), { listings: s } = await L.getWallets({ page: this.firstFetch ? 1 : n + 1, entries: St, search: this.search, version: 2, chains: a }), c = s.map((d) => h.getWalletIcon(d));
        await Promise.all([...c.map(async (d) => h.preloadImage(d)), g.wait(300)]), this.endReached = this.isLastPage();
      } catch (a) {
        console.error(a), Y.openToast(h.getErrorMessage(a), "error");
      } finally {
        this.loading = !1, this.firstFetch = !1;
      }
  }
  onConnect(t) {
    g.isAndroid() ? h.handleMobileLinking(t) : h.goToConnectingView(t);
  }
  onSearchChange(t) {
    const { value: e } = t.target;
    this.searchDebounce(e);
  }
  render() {
    const { wallets: t, search: e } = L.state, { listings: r } = this.search ? e : t, i = this.loading && !r.length, o = this.search.length >= 3;
    let n = X.manualWalletsTemplate(), a = X.recomendedWalletsTemplate(!0);
    o && (n = n.filter(({ values: d }) => h.caseSafeIncludes(d[0], this.search)), a = a.filter(({ values: d }) => h.caseSafeIncludes(d[0], this.search)));
    const s = !this.loading && !r.length && !a.length, c = { "wcm-loading": i, "wcm-end-reached": this.endReached || !this.loading, "wcm-empty": s };
    return l`<wcm-modal-header><wcm-search-input .onChange="${this.onSearchChange.bind(this)}"></wcm-search-input></wcm-modal-header><wcm-modal-content class="${Z(c)}"><div class="wcm-grid">${i ? null : n} ${i ? null : a} ${i ? null : r.map((d) => l`${d ? l`<wcm-wallet-button imageId="${d.image_id}" name="${d.name}" walletId="${d.id}" .onClick="${() => this.onConnect(d)}"></wcm-wallet-button>` : null}`)}</div><div class="wcm-placeholder-block">${s ? l`<wcm-text variant="big-bold" color="secondary">No results found</wcm-text>` : null} ${!s && this.loading ? l`<wcm-spinner></wcm-spinner>` : null}</div></wcm-modal-content>`;
  }
};
oe.styles = [v.globalCss, ea], Te([W()], oe.prototype, "loading", 2), Te([W()], oe.prototype, "firstFetch", 2), Te([W()], oe.prototype, "search", 2), Te([W()], oe.prototype, "endReached", 2), oe = Te([y("wcm-wallet-explorer-view")], oe);
const oa = C`wcm-info-footer{flex-direction:column;align-items:center;display:flex;width:100%;padding:5px 0}wcm-text{text-align:center}`;
var ia = Object.defineProperty, na = Object.getOwnPropertyDescriptor, yr = (t, e, r, i) => {
  for (var o = i > 1 ? void 0 : i ? na(e, r) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (o = (i ? a(e, r, o) : a(o)) || o);
  return i && o && ia(e, r, o), o;
};
let qe = class extends w {
  constructor() {
    super(), this.isError = !1, this.openWebWallet();
  }
  onFormatAndRedirect(t) {
    const { desktop: e, name: r } = g.getWalletRouterData(), i = e == null ? void 0 : e.universal;
    if (i) {
      const o = g.formatUniversalUrl(i, t, r);
      g.openHref(o, "_blank");
    }
  }
  openWebWallet() {
    const { walletConnectUri: t } = H.state, e = g.getWalletRouterData();
    h.setRecentWallet(e), t && this.onFormatAndRedirect(t);
  }
  render() {
    const { name: t, id: e, image_id: r } = g.getWalletRouterData(), { isMobile: i, isDesktop: o } = h.getCachedRouterWalletPlatforms(), n = g.isMobile();
    return l`<wcm-modal-header title="${t}" .onAction="${h.handleUriCopy}" .actionIcon="${A.COPY_ICON}"></wcm-modal-header><wcm-modal-content><wcm-connector-waiting walletId="${e}" imageId="${R(r)}" label="${`Continue in ${t}...`}" .isError="${this.isError}"></wcm-connector-waiting></wcm-modal-content><wcm-info-footer><wcm-text color="secondary" variant="small-thin">${`${t} web app has opened in a new tab. Go there, accept the connection, and come back`}</wcm-text><wcm-platform-selection .isMobile="${i}" .isDesktop="${n ? !1 : o}" .isRetry="${!0}"><wcm-button .onClick="${this.openWebWallet.bind(this)}" .iconRight="${A.RETRY_ICON}">Retry</wcm-button></wcm-platform-selection></wcm-info-footer>`;
  }
};
qe.styles = [v.globalCss, oa], yr([W()], qe.prototype, "isError", 2), qe = yr([y("wcm-web-connecting-view")], qe);
export {
  ke as WcmModal,
  F as WcmQrCode
};
