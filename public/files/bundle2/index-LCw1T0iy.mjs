import { B as T, s as m, i as F, n as R, a as ce, p as ue, k as cn, t as de, L as qe, S as Ke, b as C, c as un, I as dn, d as se, f as fn, h as ln, j as P } from "./umd-Cchevry1.mjs";
function hn(e, t) {
  const n = e.exec(t);
  return n == null ? void 0 : n.groups;
}
const ye = /^tuple(?<array>(\[(\d*)\])*)$/;
function ie(e) {
  let t = e.type;
  if (ye.test(e.type) && "components" in e) {
    t = "(";
    const n = e.components.length;
    for (let r = 0; r < n; r++) {
      const i = e.components[r];
      t += ie(i), r < n - 1 && (t += ", ");
    }
    const s = hn(ye, e.type);
    return t += `)${(s == null ? void 0 : s.array) ?? ""}`, ie({
      ...e,
      type: t
    });
  }
  return "indexed" in e && e.indexed && (t = `${t} indexed`), e.name ? `${t} ${e.name}` : t;
}
function H(e) {
  let t = "";
  const n = e.length;
  for (let s = 0; s < n; s++) {
    const r = e[s];
    t += ie(r), s !== n - 1 && (t += ", ");
  }
  return t;
}
function gn(e) {
  var t;
  return e.type === "function" ? `function ${e.name}(${H(e.inputs)})${e.stateMutability && e.stateMutability !== "nonpayable" ? ` ${e.stateMutability}` : ""}${(t = e.outputs) != null && t.length ? ` returns (${H(e.outputs)})` : ""}` : e.type === "event" ? `event ${e.name}(${H(e.inputs)})` : e.type === "error" ? `error ${e.name}(${H(e.inputs)})` : e.type === "constructor" ? `constructor(${H(e.inputs)})${e.stateMutability === "payable" ? " payable" : ""}` : e.type === "fallback" ? `fallback() external${e.stateMutability === "payable" ? " payable" : ""}` : "receive() external payable";
}
function re(e, { includeName: t = !1 } = {}) {
  if (e.type !== "function" && e.type !== "event" && e.type !== "error")
    throw new vn(e.type);
  return `${e.name}(${Xe(e.inputs, { includeName: t })})`;
}
function Xe(e, { includeName: t = !1 } = {}) {
  return e ? e.map((n) => pn(n, { includeName: t })).join(t ? ", " : ",") : "";
}
function pn(e, { includeName: t }) {
  return e.type.startsWith("tuple") ? `(${Xe(e.components, { includeName: t })})${e.type.slice(5)}` : e.type + (t && e.name ? ` ${e.name}` : "");
}
class yn extends T {
  constructor({ expectedLength: t, givenLength: n, type: s }) {
    super([
      `ABI encoding array length mismatch for type ${s}.`,
      `Expected length: ${t}`,
      `Given length: ${n}`
    ].join(`
`), { name: "AbiEncodingArrayLengthMismatchError" });
  }
}
class En extends T {
  constructor({ expectedSize: t, value: n }) {
    super(`Size of bytes "${n}" (bytes${m(n)}) does not match expected size (bytes${t}).`, { name: "AbiEncodingBytesSizeMismatchError" });
  }
}
class An extends T {
  constructor({ expectedLength: t, givenLength: n }) {
    super([
      "ABI encoding params/values length mismatch.",
      `Expected length (params): ${t}`,
      `Given length (values): ${n}`
    ].join(`
`), { name: "AbiEncodingLengthMismatchError" });
  }
}
class Ee extends T {
  constructor(t, { docsPath: n } = {}) {
    super([
      `Function ${t ? `"${t}" ` : ""}not found on ABI.`,
      "Make sure you are using the correct ABI and that the function exists on it."
    ].join(`
`), {
      docsPath: n,
      name: "AbiFunctionNotFoundError"
    });
  }
}
class Tn extends T {
  constructor(t, n) {
    super("Found ambiguous types in overloaded ABI items.", {
      metaMessages: [
        `\`${t.type}\` in \`${re(t.abiItem)}\`, and`,
        `\`${n.type}\` in \`${re(n.abiItem)}\``,
        "",
        "These types encode differently and cannot be distinguished at runtime.",
        "Remove one of the ambiguous items in the ABI."
      ],
      name: "AbiItemAmbiguityError"
    });
  }
}
class mn extends T {
  constructor({ expectedSize: t, givenSize: n }) {
    super(`Expected bytes${t}, got bytes${n}.`, {
      name: "BytesSizeMismatchError"
    });
  }
}
class _n extends T {
  constructor(t, { docsPath: n }) {
    super([
      `Type "${t}" is not a valid encoding type.`,
      "Please provide a valid ABI type."
    ].join(`
`), { docsPath: n, name: "InvalidAbiEncodingType" });
  }
}
class In extends T {
  constructor(t) {
    super([`Value "${t}" is not a valid array.`].join(`
`), {
      name: "InvalidArrayError"
    });
  }
}
class vn extends T {
  constructor(t) {
    super([
      `"${t}" is not a valid definition type.`,
      'Valid types: "function", "event", "error"'
    ].join(`
`), { name: "InvalidDefinitionTypeError" });
  }
}
const Sn = /* @__PURE__ */ new TextEncoder();
function Qe(e, t = {}) {
  return typeof e == "number" || typeof e == "bigint" ? Nn(e, t) : typeof e == "boolean" ? bn(e, t) : F(e) ? Je(e, t) : Ye(e, t);
}
function bn(e, t = {}) {
  const n = new Uint8Array(1);
  return n[0] = Number(e), typeof t.size == "number" ? (ce(n, { size: t.size }), ue(n, { size: t.size })) : n;
}
const v = {
  zero: 48,
  nine: 57,
  A: 65,
  F: 70,
  a: 97,
  f: 102
};
function Ae(e) {
  if (e >= v.zero && e <= v.nine)
    return e - v.zero;
  if (e >= v.A && e <= v.F)
    return e - (v.A - 10);
  if (e >= v.a && e <= v.f)
    return e - (v.a - 10);
}
function Je(e, t = {}) {
  let n = e;
  t.size && (ce(n, { size: t.size }), n = ue(n, { dir: "right", size: t.size }));
  let s = n.slice(2);
  s.length % 2 && (s = `0${s}`);
  const r = s.length / 2, i = new Uint8Array(r);
  for (let o = 0, u = 0; o < r; o++) {
    const h = Ae(s.charCodeAt(u++)), y = Ae(s.charCodeAt(u++));
    if (h === void 0 || y === void 0)
      throw new T(`Invalid byte sequence ("${s[u - 2]}${s[u - 1]}" in "${s}").`);
    i[o] = h * 16 + y;
  }
  return i;
}
function Nn(e, t) {
  const n = R(e, t);
  return Je(n);
}
function Ye(e, t = {}) {
  const n = Sn.encode(e);
  return typeof t.size == "number" ? (ce(n, { size: t.size }), ue(n, { dir: "right", size: t.size })) : n;
}
function I(e, t) {
  const n = t || "hex", s = cn(F(e, { strict: !1 }) ? Qe(e) : e);
  return n === "bytes" ? s : de(s);
}
const On = (e) => I(Qe(e));
function wn(e) {
  return On(e);
}
function Cn(e) {
  let t = !0, n = "", s = 0, r = "", i = !1;
  for (let o = 0; o < e.length; o++) {
    const u = e[o];
    if (["(", ")", ","].includes(u) && (t = !0), u === "(" && s++, u === ")" && s--, !!t) {
      if (s === 0) {
        if (u === " " && ["event", "function", ""].includes(r))
          r = "";
        else if (r += u, u === ")") {
          i = !0;
          break;
        }
        continue;
      }
      if (u === " ") {
        e[o - 1] !== "," && n !== "," && n !== ",(" && (n = "", t = !1);
        continue;
      }
      r += u, n += u;
    }
  }
  if (!i)
    throw new T("Unable to normalize signature.");
  return r;
}
const Dn = (e) => {
  const t = typeof e == "string" ? e : gn(e);
  return Cn(t);
};
function Ze(e) {
  return wn(Dn(e));
}
const Rn = Ze;
class et extends T {
  constructor({ address: t }) {
    super(`Address "${t}" is invalid.`, {
      metaMessages: [
        "- Address must be a hex value of 20 bytes (40 hex characters).",
        "- Address must match its checksum counterpart."
      ],
      name: "InvalidAddressError"
    });
  }
}
const te = /* @__PURE__ */ new qe(8192);
function Pn(e, t) {
  if (te.has(`${e}.${t}`))
    return te.get(`${e}.${t}`);
  const n = e.substring(2).toLowerCase(), s = I(Ye(n), "bytes"), r = n.split("");
  for (let o = 0; o < 40; o += 2)
    s[o >> 1] >> 4 >= 8 && r[o] && (r[o] = r[o].toUpperCase()), (s[o >> 1] & 15) >= 8 && r[o + 1] && (r[o + 1] = r[o + 1].toUpperCase());
  const i = `0x${r.join("")}`;
  return te.set(`${e}.${t}`, i), i;
}
const Mn = /^0x[a-fA-F0-9]{40}$/, ne = /* @__PURE__ */ new qe(8192);
function j(e, t) {
  const { strict: n = !0 } = t ?? {}, s = `${e}.${n}`;
  if (ne.has(s))
    return ne.get(s);
  const r = Mn.test(e) ? e.toLowerCase() === e ? !0 : n ? Pn(e) === e : !0 : !1;
  return ne.set(s, r), r;
}
function O(e) {
  return typeof e[0] == "string" ? tt(e) : Ln(e);
}
function Ln(e) {
  let t = 0;
  for (const r of e)
    t += r.length;
  const n = new Uint8Array(t);
  let s = 0;
  for (const r of e)
    n.set(r, s), s += r.length;
  return n;
}
function tt(e) {
  return `0x${e.reduce((t, n) => t + n.replace("0x", ""), "")}`;
}
function nt(e, t, n, { strict: s } = {}) {
  return F(e, { strict: !1 }) ? $n(e, t, n, {
    strict: s
  }) : Bn(e, t, n, {
    strict: s
  });
}
function st(e, t) {
  if (typeof t == "number" && t > 0 && t > m(e) - 1)
    throw new Ke({
      offset: t,
      position: "start",
      size: m(e)
    });
}
function it(e, t, n) {
  if (typeof t == "number" && typeof n == "number" && m(e) !== n - t)
    throw new Ke({
      offset: n,
      position: "end",
      size: m(e)
    });
}
function Bn(e, t, n, { strict: s } = {}) {
  st(e, t);
  const r = e.slice(t, n);
  return s && it(r, t, n), r;
}
function $n(e, t, n, { strict: s } = {}) {
  st(e, t);
  const r = `0x${e.replace("0x", "").slice((t ?? 0) * 2, (n ?? e.length) * 2)}`;
  return s && it(r, t, n), r;
}
const Hn = /^bytes([1-9]|1[0-9]|2[0-9]|3[0-2])?$/, rt = /^(u?int)(8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)?$/;
function fe(e, t) {
  if (e.length !== t.length)
    throw new An({
      expectedLength: e.length,
      givenLength: t.length
    });
  const n = Gn({
    params: e,
    values: t
  }), s = he(n);
  return s.length === 0 ? "0x" : s;
}
function Gn({ params: e, values: t }) {
  const n = [];
  for (let s = 0; s < e.length; s++)
    n.push(le({ param: e[s], value: t[s] }));
  return n;
}
function le({ param: e, value: t }) {
  const n = Fn(e.type);
  if (n) {
    const [s, r] = n;
    return Un(t, { length: s, param: { ...e, type: r } });
  }
  if (e.type === "tuple")
    return zn(t, {
      param: e
    });
  if (e.type === "address")
    return jn(t);
  if (e.type === "bool")
    return Vn(t);
  if (e.type.startsWith("uint") || e.type.startsWith("int")) {
    const s = e.type.startsWith("int"), [, , r = "256"] = rt.exec(e.type) ?? [];
    return xn(t, {
      signed: s,
      size: Number(r)
    });
  }
  if (e.type.startsWith("bytes"))
    return Wn(t, { param: e });
  if (e.type === "string")
    return kn(t);
  throw new _n(e.type, {
    docsPath: "/docs/contract/encodeAbiParameters"
  });
}
function he(e) {
  let t = 0;
  for (let i = 0; i < e.length; i++) {
    const { dynamic: o, encoded: u } = e[i];
    o ? t += 32 : t += m(u);
  }
  const n = [], s = [];
  let r = 0;
  for (let i = 0; i < e.length; i++) {
    const { dynamic: o, encoded: u } = e[i];
    o ? (n.push(R(t + r, { size: 32 })), s.push(u), r += m(u)) : n.push(u);
  }
  return O([...n, ...s]);
}
function jn(e) {
  if (!j(e))
    throw new et({ address: e });
  return { dynamic: !1, encoded: C(e.toLowerCase()) };
}
function Un(e, { length: t, param: n }) {
  const s = t === null;
  if (!Array.isArray(e))
    throw new In(e);
  if (!s && e.length !== t)
    throw new yn({
      expectedLength: t,
      givenLength: e.length,
      type: `${n.type}[${t}]`
    });
  let r = !1;
  const i = [];
  for (let o = 0; o < e.length; o++) {
    const u = le({ param: n, value: e[o] });
    u.dynamic && (r = !0), i.push(u);
  }
  if (s || r) {
    const o = he(i);
    if (s) {
      const u = R(i.length, { size: 32 });
      return {
        dynamic: !0,
        encoded: i.length > 0 ? O([u, o]) : u
      };
    }
    if (r)
      return { dynamic: !0, encoded: o };
  }
  return {
    dynamic: !1,
    encoded: O(i.map(({ encoded: o }) => o))
  };
}
function Wn(e, { param: t }) {
  const [, n] = t.type.split("bytes"), s = m(e);
  if (!n) {
    let r = e;
    return s % 32 !== 0 && (r = C(r, {
      dir: "right",
      size: Math.ceil((e.length - 2) / 2 / 32) * 32
    })), {
      dynamic: !0,
      encoded: O([C(R(s, { size: 32 })), r])
    };
  }
  if (s !== Number.parseInt(n))
    throw new En({
      expectedSize: Number.parseInt(n),
      value: e
    });
  return { dynamic: !1, encoded: C(e, { dir: "right" }) };
}
function Vn(e) {
  if (typeof e != "boolean")
    throw new T(`Invalid boolean value: "${e}" (type: ${typeof e}). Expected: \`true\` or \`false\`.`);
  return { dynamic: !1, encoded: C(un(e)) };
}
function xn(e, { signed: t, size: n = 256 }) {
  if (typeof n == "number") {
    const s = 2n ** (BigInt(n) - (t ? 1n : 0n)) - 1n, r = t ? -s - 1n : 0n;
    if (e > s || e < r)
      throw new dn({
        max: s.toString(),
        min: r.toString(),
        signed: t,
        size: n / 8,
        value: e.toString()
      });
  }
  return {
    dynamic: !1,
    encoded: R(e, {
      size: 32,
      signed: t
    })
  };
}
function kn(e) {
  const t = se(e), n = Math.ceil(m(t) / 32), s = [];
  for (let r = 0; r < n; r++)
    s.push(C(nt(t, r * 32, (r + 1) * 32), {
      dir: "right"
    }));
  return {
    dynamic: !0,
    encoded: O([
      C(R(m(t), { size: 32 })),
      ...s
    ])
  };
}
function zn(e, { param: t }) {
  let n = !1;
  const s = [];
  for (let r = 0; r < t.components.length; r++) {
    const i = t.components[r], o = Array.isArray(e) ? r : i.name, u = le({
      param: i,
      value: e[o]
    });
    s.push(u), u.dynamic && (n = !0);
  }
  return {
    dynamic: n,
    encoded: n ? he(s) : O(s.map(({ encoded: r }) => r))
  };
}
function Fn(e) {
  const t = e.match(/^(.*)\[(\d+)?\]$/);
  return t ? (
    // Return `null` if the array is dynamic.
    [t[2] ? Number(t[2]) : null, t[1]]
  ) : void 0;
}
const at = (e) => nt(Ze(e), 0, 4);
function qn(e) {
  const { abi: t, args: n = [], name: s } = e, r = F(s, { strict: !1 }), i = t.filter((u) => r ? u.type === "function" ? at(u) === s : u.type === "event" ? Rn(u) === s : !1 : "name" in u && u.name === s);
  if (i.length === 0)
    return;
  if (i.length === 1)
    return i[0];
  let o;
  for (const u of i) {
    if (!("inputs" in u))
      continue;
    if (!n || n.length === 0) {
      if (!u.inputs || u.inputs.length === 0)
        return u;
      continue;
    }
    if (!u.inputs || u.inputs.length === 0 || u.inputs.length !== n.length)
      continue;
    if (n.every((y, g) => {
      const p = "inputs" in u && u.inputs[g];
      return p ? ae(y, p) : !1;
    })) {
      if (o && "inputs" in o && o.inputs) {
        const y = ot(u.inputs, o.inputs, n);
        if (y)
          throw new Tn({
            abiItem: u,
            type: y[0]
          }, {
            abiItem: o,
            type: y[1]
          });
      }
      o = u;
    }
  }
  return o || i[0];
}
function ae(e, t) {
  const n = typeof e, s = t.type;
  switch (s) {
    case "address":
      return j(e, { strict: !1 });
    case "bool":
      return n === "boolean";
    case "function":
      return n === "string";
    case "string":
      return n === "string";
    default:
      return s === "tuple" && "components" in t ? Object.values(t.components).every((r, i) => ae(Object.values(e)[i], r)) : /^u?int(8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)?$/.test(s) ? n === "number" || n === "bigint" : /^bytes([1-9]|1[0-9]|2[0-9]|3[0-2])?$/.test(s) ? n === "string" || e instanceof Uint8Array : /[a-z]+[1-9]{0,3}(\[[0-9]{0,}\])+$/.test(s) ? Array.isArray(e) && e.every((r) => ae(r, {
        ...t,
        // Pop off `[]` or `[M]` from end of type
        type: s.replace(/(\[[0-9]{0,}\])$/, "")
      })) : !1;
  }
}
function ot(e, t, n) {
  for (const s in e) {
    const r = e[s], i = t[s];
    if (r.type === "tuple" && i.type === "tuple" && "components" in r && "components" in i)
      return ot(r.components, i.components, n[s]);
    const o = [r.type, i.type];
    if (o.includes("address") && o.includes("bytes20") ? !0 : o.includes("address") && o.includes("string") ? j(n[s], { strict: !1 }) : o.includes("address") && o.includes("bytes") ? j(n[s], { strict: !1 }) : !1)
      return o;
  }
}
const Te = "/docs/contract/encodeFunctionData";
function Kn(e) {
  const { abi: t, args: n, functionName: s } = e;
  let r = t[0];
  if (s) {
    const i = qn({
      abi: t,
      args: n,
      name: s
    });
    if (!i)
      throw new Ee(s, { docsPath: Te });
    r = i;
  }
  if (r.type !== "function")
    throw new Ee(void 0, { docsPath: Te });
  return {
    abi: [r],
    functionName: at(re(r))
  };
}
function me(e) {
  const { args: t } = e, { abi: n, functionName: s } = (() => {
    var u;
    return e.abi.length === 1 && ((u = e.functionName) != null && u.startsWith("0x")) ? e : Kn(e);
  })(), r = n[0], i = s, o = "inputs" in r && r.inputs ? fe(r.inputs, t ?? []) : void 0;
  return tt([i, o ?? "0x"]);
}
class Xn extends T {
  constructor({ domain: t }) {
    super(`Invalid domain "${fn(t)}".`, {
      metaMessages: ["Must be a valid EIP-712 domain."]
    });
  }
}
class Qn extends T {
  constructor({ primaryType: t, types: n }) {
    super(`Invalid primary type \`${t}\` must be one of \`${JSON.stringify(Object.keys(n))}\`.`, {
      docsPath: "/api/glossary/Errors#typeddatainvalidprimarytypeerror",
      metaMessages: ["Check that the primary type is a key in `types`."]
    });
  }
}
class Jn extends T {
  constructor({ type: t }) {
    super(`Struct type "${t}" is invalid.`, {
      metaMessages: ["Struct type must not be a Solidity type."],
      name: "InvalidStructTypeError"
    });
  }
}
function Yn(e) {
  const { domain: t = {}, message: n, primaryType: s } = e, r = {
    EIP712Domain: ss({ domain: t }),
    ...e.types
  };
  ns({
    domain: t,
    message: n,
    primaryType: s,
    types: r
  });
  const i = ["0x1901"];
  return t && i.push(Zn({
    domain: t,
    types: r
  })), s !== "EIP712Domain" && i.push(ct({
    data: n,
    primaryType: s,
    types: r
  })), I(O(i));
}
function Zn({ domain: e, types: t }) {
  return ct({
    data: e,
    primaryType: "EIP712Domain",
    types: t
  });
}
function ct({ data: e, primaryType: t, types: n }) {
  const s = ut({
    data: e,
    primaryType: t,
    types: n
  });
  return I(s);
}
function ut({ data: e, primaryType: t, types: n }) {
  const s = [{ type: "bytes32" }], r = [es({ primaryType: t, types: n })];
  for (const i of n[t]) {
    const [o, u] = ft({
      types: n,
      name: i.name,
      type: i.type,
      value: e[i.name]
    });
    s.push(o), r.push(u);
  }
  return fe(s, r);
}
function es({ primaryType: e, types: t }) {
  const n = de(ts({ primaryType: e, types: t }));
  return I(n);
}
function ts({ primaryType: e, types: t }) {
  let n = "";
  const s = dt({ primaryType: e, types: t });
  s.delete(e);
  const r = [e, ...Array.from(s).sort()];
  for (const i of r)
    n += `${i}(${t[i].map(({ name: o, type: u }) => `${u} ${o}`).join(",")})`;
  return n;
}
function dt({ primaryType: e, types: t }, n = /* @__PURE__ */ new Set()) {
  const s = e.match(/^\w*/u), r = s == null ? void 0 : s[0];
  if (n.has(r) || t[r] === void 0)
    return n;
  n.add(r);
  for (const i of t[r])
    dt({ primaryType: i.type, types: t }, n);
  return n;
}
function ft({ types: e, name: t, type: n, value: s }) {
  if (e[n] !== void 0)
    return [
      { type: "bytes32" },
      I(ut({ data: s, primaryType: n, types: e }))
    ];
  if (n === "bytes")
    return s = `0x${(s.length % 2 ? "0" : "") + s.slice(2)}`, [{ type: "bytes32" }, I(s)];
  if (n === "string")
    return [{ type: "bytes32" }, I(de(s))];
  if (n.lastIndexOf("]") === n.length - 1) {
    const r = n.slice(0, n.lastIndexOf("[")), i = s.map((o) => ft({
      name: t,
      type: r,
      types: e,
      value: o
    }));
    return [
      { type: "bytes32" },
      I(fe(i.map(([o]) => o), i.map(([, o]) => o)))
    ];
  }
  return [{ type: n }, s];
}
function ns(e) {
  const { domain: t, message: n, primaryType: s, types: r } = e, i = (o, u) => {
    for (const h of o) {
      const { name: y, type: g } = h, p = u[y], V = g.match(rt);
      if (V && (typeof p == "number" || typeof p == "bigint")) {
        const [Y, w, Z] = V;
        R(p, {
          signed: w === "int",
          size: Number.parseInt(Z) / 8
        });
      }
      if (g === "address" && typeof p == "string" && !j(p))
        throw new et({ address: p });
      const x = g.match(Hn);
      if (x) {
        const [Y, w] = x;
        if (w && m(p) !== Number.parseInt(w))
          throw new mn({
            expectedSize: Number.parseInt(w),
            givenSize: m(p)
          });
      }
      const k = r[g];
      k && (is(g), i(k, p));
    }
  };
  if (r.EIP712Domain && t) {
    if (typeof t != "object")
      throw new Xn({ domain: t });
    i(r.EIP712Domain, t);
  }
  if (s !== "EIP712Domain")
    if (r[s])
      i(r[s], n);
    else
      throw new Qn({ primaryType: s, types: r });
}
function ss({ domain: e }) {
  return [
    typeof (e == null ? void 0 : e.name) == "string" && { name: "name", type: "string" },
    (e == null ? void 0 : e.version) && { name: "version", type: "string" },
    (typeof (e == null ? void 0 : e.chainId) == "number" || typeof (e == null ? void 0 : e.chainId) == "bigint") && {
      name: "chainId",
      type: "uint256"
    },
    (e == null ? void 0 : e.verifyingContract) && {
      name: "verifyingContract",
      type: "address"
    },
    (e == null ? void 0 : e.salt) && { name: "salt", type: "bytes32" }
  ].filter(Boolean);
}
function is(e) {
  if (e === "address" || e === "bool" || e === "string" || e.startsWith("bytes") || e.startsWith("uint") || e.startsWith("int"))
    throw new Jn({ type: e });
}
const rs = `Ethereum Signed Message:
`;
function as(e) {
  const t = typeof e == "string" ? se(e) : typeof e.raw == "string" ? e.raw : ln(e.raw), n = se(`${rs}${m(t)}`);
  return O([n, t]);
}
function os(e, t) {
  return I(as(e), t);
}
const lt = () => "9.1.0", cs = (e) => e.toString(16).padStart(2, "0"), us = (e) => {
  const t = new Uint8Array(e / 2);
  return window.crypto.getRandomValues(t), Array.from(t, cs).join("");
}, ds = () => typeof window < "u" ? us(10) : (/* @__PURE__ */ new Date()).getTime().toString(36);
class W {
}
W.makeRequest = (e, t) => ({
  id: ds(),
  method: e,
  params: t,
  env: {
    sdkVersion: lt()
  }
});
W.makeResponse = (e, t, n) => ({
  id: e,
  success: !0,
  version: n,
  data: t
});
W.makeErrorResponse = (e, t, n) => ({
  id: e,
  success: !1,
  error: t,
  version: n
});
var E;
(function(e) {
  e.sendTransactions = "sendTransactions", e.rpcCall = "rpcCall", e.getChainInfo = "getChainInfo", e.getSafeInfo = "getSafeInfo", e.getTxBySafeTxHash = "getTxBySafeTxHash", e.getSafeBalances = "getSafeBalances", e.signMessage = "signMessage", e.signTypedMessage = "signTypedMessage", e.getEnvironmentInfo = "getEnvironmentInfo", e.getOffChainSignature = "getOffChainSignature", e.requestAddressBook = "requestAddressBook", e.wallet_getPermissions = "wallet_getPermissions", e.wallet_requestPermissions = "wallet_requestPermissions";
})(E || (E = {}));
var z;
(function(e) {
  e.requestAddressBook = "requestAddressBook";
})(z || (z = {}));
class fs {
  constructor(t = null, n = !1) {
    this.allowedOrigins = null, this.callbacks = /* @__PURE__ */ new Map(), this.debugMode = !1, this.isServer = typeof window > "u", this.isValidMessage = ({ origin: s, data: r, source: i }) => {
      const o = !r, u = !this.isServer && i === window.parent, h = typeof r.version < "u" && parseInt(r.version.split(".")[0]), y = typeof h == "number" && h >= 1;
      let g = !0;
      return Array.isArray(this.allowedOrigins) && (g = this.allowedOrigins.find((p) => p.test(s)) !== void 0), !o && u && y && g;
    }, this.logIncomingMessage = (s) => {
      console.info(`Safe Apps SDK v1: A message was received from origin ${s.origin}. `, s.data);
    }, this.onParentMessage = (s) => {
      this.isValidMessage(s) && (this.debugMode && this.logIncomingMessage(s), this.handleIncomingMessage(s.data));
    }, this.handleIncomingMessage = (s) => {
      const { id: r } = s, i = this.callbacks.get(r);
      i && (i(s), this.callbacks.delete(r));
    }, this.send = (s, r) => {
      const i = W.makeRequest(s, r);
      if (this.isServer)
        throw new Error("Window doesn't exist");
      return window.parent.postMessage(i, "*"), new Promise((o, u) => {
        this.callbacks.set(i.id, (h) => {
          if (!h.success) {
            u(new Error(h.error));
            return;
          }
          o(h);
        });
      });
    }, this.allowedOrigins = t, this.debugMode = n, this.isServer || window.addEventListener("message", this.onParentMessage);
  }
}
const ge = (e) => typeof e == "object" && e != null && "domain" in e && "types" in e && "message" in e;
var G = {}, B = {}, $ = {}, pe = P && P.__awaiter || function(e, t, n, s) {
  function r(i) {
    return i instanceof n ? i : new n(function(o) {
      o(i);
    });
  }
  return new (n || (n = Promise))(function(i, o) {
    function u(g) {
      try {
        y(s.next(g));
      } catch (p) {
        o(p);
      }
    }
    function h(g) {
      try {
        y(s.throw(g));
      } catch (p) {
        o(p);
      }
    }
    function y(g) {
      g.done ? i(g.value) : r(g.value).then(u, h);
    }
    y((s = s.apply(e, t || [])).next());
  });
};
Object.defineProperty($, "__esModule", { value: !0 });
$.insertParams = gs;
$.stringifyQuery = ps;
$.fetchData = ys;
$.getData = Es;
const ls = (e) => typeof e == "object" && e !== null && ("code" in e || "statusCode" in e) && "message" in e;
function hs(e, t, n) {
  return e.replace(new RegExp(`\\{${t}\\}`, "g"), n);
}
function gs(e, t) {
  return t ? Object.keys(t).reduce((n, s) => hs(n, s, String(t[s])), e) : e;
}
function ps(e) {
  if (!e)
    return "";
  const t = new URLSearchParams();
  Object.keys(e).forEach((s) => {
    e[s] != null && t.append(s, String(e[s]));
  });
  const n = t.toString();
  return n ? `?${n}` : "";
}
function ht(e) {
  return pe(this, void 0, void 0, function* () {
    var t;
    let n;
    try {
      n = yield e.json();
    } catch {
      n = {};
    }
    if (!e.ok) {
      const s = ls(n) ? `CGW error - ${(t = n.code) !== null && t !== void 0 ? t : n.statusCode}: ${n.message}` : `CGW error - status ${e.statusText}`;
      throw new Error(s);
    }
    return n;
  });
}
function ys(e, t, n, s, r) {
  return pe(this, void 0, void 0, function* () {
    const i = Object.assign({ "Content-Type": "application/json" }, s), o = {
      method: t ?? "POST",
      headers: i
    };
    r && (o.credentials = r), n != null && (o.body = typeof n == "string" ? n : JSON.stringify(n));
    const u = yield fetch(e, o);
    return ht(u);
  });
}
function Es(e, t, n) {
  return pe(this, void 0, void 0, function* () {
    const s = {
      method: "GET"
    };
    t && (s.headers = Object.assign(Object.assign({}, t), { "Content-Type": "application/json" })), n && (s.credentials = n);
    const r = yield fetch(e, s);
    return ht(r);
  });
}
Object.defineProperty(B, "__esModule", { value: !0 });
B.postEndpoint = As;
B.putEndpoint = Ts;
B.deleteEndpoint = ms;
B.getEndpoint = _s;
const D = $;
function q(e, t, n, s) {
  const r = (0, D.insertParams)(t, n), i = (0, D.stringifyQuery)(s);
  return `${e}${r}${i}`;
}
function As(e, t, n) {
  const s = q(e, t, n == null ? void 0 : n.path, n == null ? void 0 : n.query);
  return (0, D.fetchData)(s, "POST", n == null ? void 0 : n.body, n == null ? void 0 : n.headers, n == null ? void 0 : n.credentials);
}
function Ts(e, t, n) {
  const s = q(e, t, n == null ? void 0 : n.path, n == null ? void 0 : n.query);
  return (0, D.fetchData)(s, "PUT", n == null ? void 0 : n.body, n == null ? void 0 : n.headers, n == null ? void 0 : n.credentials);
}
function ms(e, t, n) {
  const s = q(e, t, n == null ? void 0 : n.path, n == null ? void 0 : n.query);
  return (0, D.fetchData)(s, "DELETE", n == null ? void 0 : n.body, n == null ? void 0 : n.headers, n == null ? void 0 : n.credentials);
}
function _s(e, t, n, s) {
  if (s)
    return (0, D.getData)(s, void 0, n == null ? void 0 : n.credentials);
  const r = q(e, t, n == null ? void 0 : n.path, n == null ? void 0 : n.query);
  return (0, D.getData)(r, n == null ? void 0 : n.headers, n == null ? void 0 : n.credentials);
}
var K = {};
Object.defineProperty(K, "__esModule", { value: !0 });
K.DEFAULT_BASE_URL = void 0;
K.DEFAULT_BASE_URL = "https://safe-client.safe.global";
var X = {};
Object.defineProperty(X, "__esModule", { value: !0 });
X.ImplementationVersionState = void 0;
var _e;
(function(e) {
  e.UP_TO_DATE = "UP_TO_DATE", e.OUTDATED = "OUTDATED", e.UNKNOWN = "UNKNOWN";
})(_e || (X.ImplementationVersionState = _e = {}));
var b = {};
Object.defineProperty(b, "__esModule", { value: !0 });
b.SafeAppSocialPlatforms = b.SafeAppFeatures = b.SafeAppAccessPolicyTypes = void 0;
var Ie;
(function(e) {
  e.NoRestrictions = "NO_RESTRICTIONS", e.DomainAllowlist = "DOMAIN_ALLOWLIST";
})(Ie || (b.SafeAppAccessPolicyTypes = Ie = {}));
var ve;
(function(e) {
  e.BATCHED_TRANSACTIONS = "BATCHED_TRANSACTIONS";
})(ve || (b.SafeAppFeatures = ve = {}));
var Se;
(function(e) {
  e.TWITTER = "TWITTER", e.GITHUB = "GITHUB", e.DISCORD = "DISCORD", e.TELEGRAM = "TELEGRAM";
})(Se || (b.SafeAppSocialPlatforms = Se = {}));
var l = {};
Object.defineProperty(l, "__esModule", { value: !0 });
l.LabelValue = l.StartTimeValue = l.DurationType = l.DetailedExecutionInfoType = l.TransactionListItemType = l.ConflictType = l.TransactionInfoType = l.SettingsInfoType = l.TransactionTokenType = l.TransferDirection = l.TransactionStatus = l.Operation = void 0;
var be;
(function(e) {
  e[e.CALL = 0] = "CALL", e[e.DELEGATE = 1] = "DELEGATE";
})(be || (l.Operation = be = {}));
var Ne;
(function(e) {
  e.AWAITING_CONFIRMATIONS = "AWAITING_CONFIRMATIONS", e.AWAITING_EXECUTION = "AWAITING_EXECUTION", e.CANCELLED = "CANCELLED", e.FAILED = "FAILED", e.SUCCESS = "SUCCESS";
})(Ne || (l.TransactionStatus = Ne = {}));
var Oe;
(function(e) {
  e.INCOMING = "INCOMING", e.OUTGOING = "OUTGOING", e.UNKNOWN = "UNKNOWN";
})(Oe || (l.TransferDirection = Oe = {}));
var we;
(function(e) {
  e.ERC20 = "ERC20", e.ERC721 = "ERC721", e.NATIVE_COIN = "NATIVE_COIN";
})(we || (l.TransactionTokenType = we = {}));
var Ce;
(function(e) {
  e.SET_FALLBACK_HANDLER = "SET_FALLBACK_HANDLER", e.ADD_OWNER = "ADD_OWNER", e.REMOVE_OWNER = "REMOVE_OWNER", e.SWAP_OWNER = "SWAP_OWNER", e.CHANGE_THRESHOLD = "CHANGE_THRESHOLD", e.CHANGE_IMPLEMENTATION = "CHANGE_IMPLEMENTATION", e.ENABLE_MODULE = "ENABLE_MODULE", e.DISABLE_MODULE = "DISABLE_MODULE", e.SET_GUARD = "SET_GUARD", e.DELETE_GUARD = "DELETE_GUARD";
})(Ce || (l.SettingsInfoType = Ce = {}));
var De;
(function(e) {
  e.TRANSFER = "Transfer", e.SETTINGS_CHANGE = "SettingsChange", e.CUSTOM = "Custom", e.CREATION = "Creation", e.SWAP_ORDER = "SwapOrder", e.TWAP_ORDER = "TwapOrder", e.SWAP_TRANSFER = "SwapTransfer", e.NATIVE_STAKING_DEPOSIT = "NativeStakingDeposit", e.NATIVE_STAKING_VALIDATORS_EXIT = "NativeStakingValidatorsExit", e.NATIVE_STAKING_WITHDRAW = "NativeStakingWithdraw";
})(De || (l.TransactionInfoType = De = {}));
var Re;
(function(e) {
  e.NONE = "None", e.HAS_NEXT = "HasNext", e.END = "End";
})(Re || (l.ConflictType = Re = {}));
var Pe;
(function(e) {
  e.TRANSACTION = "TRANSACTION", e.LABEL = "LABEL", e.CONFLICT_HEADER = "CONFLICT_HEADER", e.DATE_LABEL = "DATE_LABEL";
})(Pe || (l.TransactionListItemType = Pe = {}));
var Me;
(function(e) {
  e.MULTISIG = "MULTISIG", e.MODULE = "MODULE";
})(Me || (l.DetailedExecutionInfoType = Me = {}));
var Le;
(function(e) {
  e.AUTO = "AUTO", e.LIMIT_DURATION = "LIMIT_DURATION";
})(Le || (l.DurationType = Le = {}));
var Be;
(function(e) {
  e.AT_MINING_TIME = "AT_MINING_TIME", e.AT_EPOCH = "AT_EPOCH";
})(Be || (l.StartTimeValue = Be = {}));
var $e;
(function(e) {
  e.Queued = "Queued", e.Next = "Next";
})($e || (l.LabelValue = $e = {}));
var N = {};
Object.defineProperty(N, "__esModule", { value: !0 });
N.FEATURES = N.GAS_PRICE_TYPE = N.RPC_AUTHENTICATION = void 0;
var He;
(function(e) {
  e.API_KEY_PATH = "API_KEY_PATH", e.NO_AUTHENTICATION = "NO_AUTHENTICATION", e.UNKNOWN = "UNKNOWN";
})(He || (N.RPC_AUTHENTICATION = He = {}));
var Ge;
(function(e) {
  e.ORACLE = "ORACLE", e.FIXED = "FIXED", e.FIXED_1559 = "FIXED1559", e.UNKNOWN = "UNKNOWN";
})(Ge || (N.GAS_PRICE_TYPE = Ge = {}));
var je;
(function(e) {
  e.ERC721 = "ERC721", e.SAFE_APPS = "SAFE_APPS", e.CONTRACT_INTERACTION = "CONTRACT_INTERACTION", e.DOMAIN_LOOKUP = "DOMAIN_LOOKUP", e.SPENDING_LIMIT = "SPENDING_LIMIT", e.EIP1559 = "EIP1559", e.SAFE_TX_GAS_OPTIONAL = "SAFE_TX_GAS_OPTIONAL", e.TX_SIMULATION = "TX_SIMULATION", e.EIP1271 = "EIP1271";
})(je || (N.FEATURES = je = {}));
var Q = {};
Object.defineProperty(Q, "__esModule", { value: !0 });
Q.TokenType = void 0;
var Ue;
(function(e) {
  e.ERC20 = "ERC20", e.ERC721 = "ERC721", e.NATIVE_TOKEN = "NATIVE_TOKEN", e.UNKNOWN = "UNKNOWN";
})(Ue || (Q.TokenType = Ue = {}));
var gt = {};
Object.defineProperty(gt, "__esModule", { value: !0 });
var M = {};
Object.defineProperty(M, "__esModule", { value: !0 });
M.NativeStakingStatus = M.ConfirmationViewTypes = void 0;
var We;
(function(e) {
  e.GENERIC = "GENERIC", e.COW_SWAP_ORDER = "COW_SWAP_ORDER", e.COW_SWAP_TWAP_ORDER = "COW_SWAP_TWAP_ORDER", e.KILN_NATIVE_STAKING_DEPOSIT = "KILN_NATIVE_STAKING_DEPOSIT", e.KILN_NATIVE_STAKING_VALIDATORS_EXIT = "KILN_NATIVE_STAKING_VALIDATORS_EXIT", e.KILN_NATIVE_STAKING_WITHDRAW = "KILN_NATIVE_STAKING_WITHDRAW";
})(We || (M.ConfirmationViewTypes = We = {}));
var Ve;
(function(e) {
  e.NOT_STAKED = "NOT_STAKED", e.ACTIVATING = "ACTIVATING", e.DEPOSIT_IN_PROGRESS = "DEPOSIT_IN_PROGRESS", e.ACTIVE = "ACTIVE", e.EXIT_REQUESTED = "EXIT_REQUESTED", e.EXITING = "EXITING", e.EXITED = "EXITED", e.SLASHED = "SLASHED";
})(Ve || (M.NativeStakingStatus = Ve = {}));
var L = {};
Object.defineProperty(L, "__esModule", { value: !0 });
L.SafeMessageStatus = L.SafeMessageListItemType = void 0;
var xe;
(function(e) {
  e.DATE_LABEL = "DATE_LABEL", e.MESSAGE = "MESSAGE";
})(xe || (L.SafeMessageListItemType = xe = {}));
var ke;
(function(e) {
  e.NEEDS_CONFIRMATION = "NEEDS_CONFIRMATION", e.CONFIRMED = "CONFIRMED";
})(ke || (L.SafeMessageStatus = ke = {}));
var J = {};
Object.defineProperty(J, "__esModule", { value: !0 });
J.DeviceType = void 0;
var ze;
(function(e) {
  e.ANDROID = "ANDROID", e.IOS = "IOS", e.WEB = "WEB";
})(ze || (J.DeviceType = ze = {}));
var pt = {};
Object.defineProperty(pt, "__esModule", { value: !0 });
(function(e) {
  var t = P && P.__createBinding || (Object.create ? function(a, c, d, f) {
    f === void 0 && (f = d);
    var _ = Object.getOwnPropertyDescriptor(c, d);
    (!_ || ("get" in _ ? !c.__esModule : _.writable || _.configurable)) && (_ = { enumerable: !0, get: function() {
      return c[d];
    } }), Object.defineProperty(a, f, _);
  } : function(a, c, d, f) {
    f === void 0 && (f = d), a[f] = c[d];
  }), n = P && P.__exportStar || function(a, c) {
    for (var d in a) d !== "default" && !Object.prototype.hasOwnProperty.call(c, d) && t(c, a, d);
  };
  Object.defineProperty(e, "__esModule", { value: !0 }), e.setBaseUrl = void 0, e.relayTransaction = u, e.getRelayCount = h, e.getSafeInfo = y, e.getIncomingTransfers = g, e.getModuleTransactions = p, e.getMultisigTransactions = V, e.getBalances = x, e.getFiatCurrencies = k, e.getOwnedSafes = Y, e.getAllOwnedSafes = w, e.getCollectibles = Z, e.getCollectiblesPage = At, e.getTransactionHistory = Tt, e.getTransactionQueue = mt, e.getTransactionDetails = _t, e.deleteTransaction = It, e.postSafeGasEstimation = vt, e.getNonces = St, e.proposeTransaction = bt, e.getConfirmationView = Nt, e.getTxPreview = Ot, e.getChainsConfig = wt, e.getChainConfig = Ct, e.getSafeApps = Dt, e.getMasterCopies = Rt, e.getDecodedData = Pt, e.getSafeMessages = Mt, e.getSafeMessage = Lt, e.proposeSafeMessage = Bt, e.confirmSafeMessage = $t, e.getDelegates = Ht, e.registerDevice = Gt, e.unregisterSafe = jt, e.unregisterDevice = Ut, e.registerEmail = Wt, e.changeEmail = Vt, e.resendEmailVerificationCode = xt, e.verifyEmail = kt, e.getRegisteredEmail = zt, e.deleteRegisteredEmail = Ft, e.registerRecoveryModule = qt, e.unsubscribeSingle = Kt, e.unsubscribeAll = Xt, e.getSafeOverviews = Qt, e.getContract = Jt, e.getAuthNonce = Yt, e.verifyAuth = Zt, e.createAccount = en, e.getAccount = tn, e.deleteAccount = nn, e.getAccountDataTypes = sn, e.getAccountDataSettings = rn, e.putAccountDataSettings = an, e.getIndexingStatus = on;
  const s = B, r = K;
  n(X, e), n(b, e), n(l, e), n(N, e), n(Q, e), n(gt, e), n(M, e), n(L, e), n(J, e), n(pt, e);
  let i = r.DEFAULT_BASE_URL;
  const o = (a) => {
    i = a;
  };
  e.setBaseUrl = o;
  function u(a, c) {
    return (0, s.postEndpoint)(i, "/v1/chains/{chainId}/relay", { path: { chainId: a }, body: c });
  }
  function h(a, c) {
    return (0, s.getEndpoint)(i, "/v1/chains/{chainId}/relay/{address}", { path: { chainId: a, address: c } });
  }
  function y(a, c) {
    return (0, s.getEndpoint)(i, "/v1/chains/{chainId}/safes/{address}", { path: { chainId: a, address: c } });
  }
  function g(a, c, d, f) {
    return (0, s.getEndpoint)(i, "/v1/chains/{chainId}/safes/{address}/incoming-transfers/", {
      path: { chainId: a, address: c },
      query: d
    }, f);
  }
  function p(a, c, d, f) {
    return (0, s.getEndpoint)(i, "/v1/chains/{chainId}/safes/{address}/module-transactions/", {
      path: { chainId: a, address: c },
      query: d
    }, f);
  }
  function V(a, c, d, f) {
    return (0, s.getEndpoint)(i, "/v1/chains/{chainId}/safes/{address}/multisig-transactions/", {
      path: { chainId: a, address: c },
      query: d
    }, f);
  }
  function x(a, c, d = "usd", f = {}) {
    return (0, s.getEndpoint)(i, "/v1/chains/{chainId}/safes/{address}/balances/{currency}", {
      path: { chainId: a, address: c, currency: d },
      query: f
    });
  }
  function k() {
    return (0, s.getEndpoint)(i, "/v1/balances/supported-fiat-codes");
  }
  function Y(a, c) {
    return (0, s.getEndpoint)(i, "/v1/chains/{chainId}/owners/{address}/safes", { path: { chainId: a, address: c } });
  }
  function w(a) {
    return (0, s.getEndpoint)(i, "/v1/owners/{address}/safes", { path: { address: a } });
  }
  function Z(a, c, d = {}) {
    return (0, s.getEndpoint)(i, "/v1/chains/{chainId}/safes/{address}/collectibles", {
      path: { chainId: a, address: c },
      query: d
    });
  }
  function At(a, c, d = {}, f) {
    return (0, s.getEndpoint)(i, "/v2/chains/{chainId}/safes/{address}/collectibles", { path: { chainId: a, address: c }, query: d }, f);
  }
  function Tt(a, c, d = {}, f) {
    return (0, s.getEndpoint)(i, "/v1/chains/{chainId}/safes/{safe_address}/transactions/history", { path: { chainId: a, safe_address: c }, query: d }, f);
  }
  function mt(a, c, d = {}, f) {
    return (0, s.getEndpoint)(i, "/v1/chains/{chainId}/safes/{safe_address}/transactions/queued", { path: { chainId: a, safe_address: c }, query: d }, f);
  }
  function _t(a, c) {
    return (0, s.getEndpoint)(i, "/v1/chains/{chainId}/transactions/{transactionId}", {
      path: { chainId: a, transactionId: c }
    });
  }
  function It(a, c, d) {
    return (0, s.deleteEndpoint)(i, "/v1/chains/{chainId}/transactions/{safeTxHash}", {
      path: { chainId: a, safeTxHash: c },
      body: { signature: d }
    });
  }
  function vt(a, c, d) {
    return (0, s.postEndpoint)(i, "/v2/chains/{chainId}/safes/{safe_address}/multisig-transactions/estimations", {
      path: { chainId: a, safe_address: c },
      body: d
    });
  }
  function St(a, c) {
    return (0, s.getEndpoint)(i, "/v1/chains/{chainId}/safes/{safe_address}/nonces", {
      path: { chainId: a, safe_address: c }
    });
  }
  function bt(a, c, d) {
    return (0, s.postEndpoint)(i, "/v1/chains/{chainId}/transactions/{safe_address}/propose", {
      path: { chainId: a, safe_address: c },
      body: d
    });
  }
  function Nt(a, c, d, f, _, ee) {
    return (0, s.postEndpoint)(i, "/v1/chains/{chainId}/safes/{safe_address}/views/transaction-confirmation", {
      path: { chainId: a, safe_address: c },
      body: { operation: d, data: f, to: _, value: ee }
    });
  }
  function Ot(a, c, d, f, _, ee) {
    return (0, s.postEndpoint)(i, "/v1/chains/{chainId}/transactions/{safe_address}/preview", {
      path: { chainId: a, safe_address: c },
      body: { operation: d, data: f, to: _, value: ee }
    });
  }
  function wt(a) {
    return (0, s.getEndpoint)(i, "/v1/chains", {
      query: a
    });
  }
  function Ct(a) {
    return (0, s.getEndpoint)(i, "/v1/chains/{chainId}", {
      path: { chainId: a }
    });
  }
  function Dt(a, c = {}) {
    return (0, s.getEndpoint)(i, "/v1/chains/{chainId}/safe-apps", {
      path: { chainId: a },
      query: c
    });
  }
  function Rt(a) {
    return (0, s.getEndpoint)(i, "/v1/chains/{chainId}/about/master-copies", {
      path: { chainId: a }
    });
  }
  function Pt(a, c, d, f) {
    return (0, s.postEndpoint)(i, "/v1/chains/{chainId}/data-decoder", {
      path: { chainId: a },
      body: { operation: c, data: d, to: f }
    });
  }
  function Mt(a, c, d) {
    return (0, s.getEndpoint)(i, "/v1/chains/{chainId}/safes/{safe_address}/messages", { path: { chainId: a, safe_address: c }, query: {} }, d);
  }
  function Lt(a, c) {
    return (0, s.getEndpoint)(i, "/v1/chains/{chainId}/messages/{message_hash}", {
      path: { chainId: a, message_hash: c }
    });
  }
  function Bt(a, c, d) {
    return (0, s.postEndpoint)(i, "/v1/chains/{chainId}/safes/{safe_address}/messages", {
      path: { chainId: a, safe_address: c },
      body: d
    });
  }
  function $t(a, c, d) {
    return (0, s.postEndpoint)(i, "/v1/chains/{chainId}/messages/{message_hash}/signatures", {
      path: { chainId: a, message_hash: c },
      body: d
    });
  }
  function Ht(a, c = {}) {
    return (0, s.getEndpoint)(i, "/v2/chains/{chainId}/delegates", {
      path: { chainId: a },
      query: c
    });
  }
  function Gt(a) {
    return (0, s.postEndpoint)(i, "/v1/register/notifications", {
      body: a
    });
  }
  function jt(a, c, d) {
    return (0, s.deleteEndpoint)(i, "/v1/chains/{chainId}/notifications/devices/{uuid}/safes/{safe_address}", {
      path: { chainId: a, safe_address: c, uuid: d }
    });
  }
  function Ut(a, c) {
    return (0, s.deleteEndpoint)(i, "/v1/chains/{chainId}/notifications/devices/{uuid}", {
      path: { chainId: a, uuid: c }
    });
  }
  function Wt(a, c, d, f) {
    return (0, s.postEndpoint)(i, "/v1/chains/{chainId}/safes/{safe_address}/emails", {
      path: { chainId: a, safe_address: c },
      body: d,
      headers: f
    });
  }
  function Vt(a, c, d, f, _) {
    return (0, s.putEndpoint)(i, "/v1/chains/{chainId}/safes/{safe_address}/emails/{signer}", {
      path: { chainId: a, safe_address: c, signer: d },
      body: f,
      headers: _
    });
  }
  function xt(a, c, d) {
    return (0, s.postEndpoint)(i, "/v1/chains/{chainId}/safes/{safe_address}/emails/{signer}/verify-resend", {
      path: { chainId: a, safe_address: c, signer: d },
      body: ""
    });
  }
  function kt(a, c, d, f) {
    return (0, s.putEndpoint)(i, "/v1/chains/{chainId}/safes/{safe_address}/emails/{signer}/verify", {
      path: { chainId: a, safe_address: c, signer: d },
      body: f
    });
  }
  function zt(a, c, d, f) {
    return (0, s.getEndpoint)(i, "/v1/chains/{chainId}/safes/{safe_address}/emails/{signer}", {
      path: { chainId: a, safe_address: c, signer: d },
      headers: f
    });
  }
  function Ft(a, c, d, f) {
    return (0, s.deleteEndpoint)(i, "/v1/chains/{chainId}/safes/{safe_address}/emails/{signer}", {
      path: { chainId: a, safe_address: c, signer: d },
      headers: f
    });
  }
  function qt(a, c, d) {
    return (0, s.postEndpoint)(i, "/v1/chains/{chainId}/safes/{safe_address}/recovery", {
      path: { chainId: a, safe_address: c },
      body: d
    });
  }
  function Kt(a) {
    return (0, s.deleteEndpoint)(i, "/v1/subscriptions", { query: a });
  }
  function Xt(a) {
    return (0, s.deleteEndpoint)(i, "/v1/subscriptions/all", { query: a });
  }
  function Qt(a, c) {
    return (0, s.getEndpoint)(i, "/v1/safes", {
      query: Object.assign(Object.assign({}, c), { safes: a.join(",") })
    });
  }
  function Jt(a, c) {
    return (0, s.getEndpoint)(i, "/v1/chains/{chainId}/contracts/{contractAddress}", {
      path: {
        chainId: a,
        contractAddress: c
      }
    });
  }
  function Yt() {
    return (0, s.getEndpoint)(i, "/v1/auth/nonce", { credentials: "include" });
  }
  function Zt(a) {
    return (0, s.postEndpoint)(i, "/v1/auth/verify", {
      body: a,
      credentials: "include"
    });
  }
  function en(a) {
    return (0, s.postEndpoint)(i, "/v1/accounts", {
      body: a,
      credentials: "include"
    });
  }
  function tn(a) {
    return (0, s.getEndpoint)(i, "/v1/accounts/{address}", {
      path: { address: a },
      credentials: "include"
    });
  }
  function nn(a) {
    return (0, s.deleteEndpoint)(i, "/v1/accounts/{address}", {
      path: { address: a },
      credentials: "include"
    });
  }
  function sn() {
    return (0, s.getEndpoint)(i, "/v1/accounts/data-types");
  }
  function rn(a) {
    return (0, s.getEndpoint)(i, "/v1/accounts/{address}/data-settings", {
      path: { address: a },
      credentials: "include"
    });
  }
  function an(a, c) {
    return (0, s.putEndpoint)(i, "/v1/accounts/{address}/data-settings", {
      path: { address: a },
      body: c,
      credentials: "include"
    });
  }
  function on(a) {
    return (0, s.getEndpoint)(i, "/v1/chains/{chainId}/about/indexing", {
      path: { chainId: a }
    });
  }
})(G);
class Is {
  constructor(t) {
    this.communicator = t;
  }
  async getBySafeTxHash(t) {
    if (!t)
      throw new Error("Invalid safeTxHash");
    return (await this.communicator.send(E.getTxBySafeTxHash, { safeTxHash: t })).data;
  }
  async signMessage(t) {
    const n = {
      message: t
    };
    return (await this.communicator.send(E.signMessage, n)).data;
  }
  async signTypedMessage(t) {
    if (!ge(t))
      throw new Error("Invalid typed data");
    return (await this.communicator.send(E.signTypedMessage, { typedData: t })).data;
  }
  async send({ txs: t, params: n }) {
    if (!t || !t.length)
      throw new Error("No transactions were passed");
    const s = {
      txs: t,
      params: n
    };
    return (await this.communicator.send(E.sendTransactions, s)).data;
  }
}
const A = {
  eth_call: "eth_call",
  eth_gasPrice: "eth_gasPrice",
  eth_getLogs: "eth_getLogs",
  eth_getBalance: "eth_getBalance",
  eth_getCode: "eth_getCode",
  eth_getBlockByHash: "eth_getBlockByHash",
  eth_getBlockByNumber: "eth_getBlockByNumber",
  eth_getStorageAt: "eth_getStorageAt",
  eth_getTransactionByHash: "eth_getTransactionByHash",
  eth_getTransactionReceipt: "eth_getTransactionReceipt",
  eth_getTransactionCount: "eth_getTransactionCount",
  eth_estimateGas: "eth_estimateGas",
  safe_setSettings: "safe_setSettings"
}, S = {
  defaultBlockParam: (e = "latest") => e,
  returnFullTxObjectParam: (e = !1) => e,
  blockNumberToHex: (e) => Number.isInteger(e) ? `0x${e.toString(16)}` : e
};
class vs {
  constructor(t) {
    this.communicator = t, this.call = this.buildRequest({
      call: A.eth_call,
      formatters: [null, S.defaultBlockParam]
    }), this.getBalance = this.buildRequest({
      call: A.eth_getBalance,
      formatters: [null, S.defaultBlockParam]
    }), this.getCode = this.buildRequest({
      call: A.eth_getCode,
      formatters: [null, S.defaultBlockParam]
    }), this.getStorageAt = this.buildRequest({
      call: A.eth_getStorageAt,
      formatters: [null, S.blockNumberToHex, S.defaultBlockParam]
    }), this.getPastLogs = this.buildRequest({
      call: A.eth_getLogs
    }), this.getBlockByHash = this.buildRequest({
      call: A.eth_getBlockByHash,
      formatters: [null, S.returnFullTxObjectParam]
    }), this.getBlockByNumber = this.buildRequest({
      call: A.eth_getBlockByNumber,
      formatters: [S.blockNumberToHex, S.returnFullTxObjectParam]
    }), this.getTransactionByHash = this.buildRequest({
      call: A.eth_getTransactionByHash
    }), this.getTransactionReceipt = this.buildRequest({
      call: A.eth_getTransactionReceipt
    }), this.getTransactionCount = this.buildRequest({
      call: A.eth_getTransactionCount,
      formatters: [null, S.defaultBlockParam]
    }), this.getGasPrice = this.buildRequest({
      call: A.eth_gasPrice
    }), this.getEstimateGas = (n) => this.buildRequest({
      call: A.eth_estimateGas
    })([n]), this.setSafeSettings = this.buildRequest({
      call: A.safe_setSettings
    });
  }
  buildRequest(t) {
    const { call: n, formatters: s } = t;
    return async (r) => {
      s && Array.isArray(r) && s.forEach((u, h) => {
        u && (r[h] = u(r[h]));
      });
      const i = {
        call: n,
        params: r || []
      };
      return (await this.communicator.send(E.rpcCall, i)).data;
    };
  }
}
const Ss = "0x1626ba7e", bs = "0x20c13b0b", oe = 4001;
class U extends Error {
  constructor(t, n, s) {
    super(t), this.code = n, this.data = s, Object.setPrototypeOf(this, U.prototype);
  }
}
class yt {
  constructor(t) {
    this.communicator = t;
  }
  async getPermissions() {
    return (await this.communicator.send(E.wallet_getPermissions, void 0)).data;
  }
  async requestPermissions(t) {
    if (!this.isPermissionRequestValid(t))
      throw new U("Permissions request is invalid", oe);
    try {
      return (await this.communicator.send(E.wallet_requestPermissions, t)).data;
    } catch {
      throw new U("Permissions rejected", oe);
    }
  }
  isPermissionRequestValid(t) {
    return t.every((n) => typeof n == "object" ? Object.keys(n).every((s) => !!Object.values(z).includes(s)) : !1);
  }
}
const Fe = (e, t) => t.some((n) => n.parentCapability === e), Ns = () => (e, t, n) => {
  const s = n.value;
  return n.value = async function() {
    const r = new yt(this.communicator);
    let i = await r.getPermissions();
    if (Fe(t, i) || (i = await r.requestPermissions([{ [t]: {} }])), !Fe(t, i))
      throw new U("Permissions rejected", oe);
    return s.apply(this);
  }, n;
};
var Os = function(e, t, n, s) {
  var r = arguments.length, i = r < 3 ? t : s === null ? s = Object.getOwnPropertyDescriptor(t, n) : s, o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") i = Reflect.decorate(e, t, n, s);
  else for (var u = e.length - 1; u >= 0; u--) (o = e[u]) && (i = (r < 3 ? o(i) : r > 3 ? o(t, n, i) : o(t, n)) || i);
  return r > 3 && i && Object.defineProperty(t, n, i), i;
};
class Et {
  constructor(t) {
    this.communicator = t;
  }
  async getChainInfo() {
    return (await this.communicator.send(E.getChainInfo, void 0)).data;
  }
  async getInfo() {
    return (await this.communicator.send(E.getSafeInfo, void 0)).data;
  }
  // There is a possibility that this method will change because we may add pagination to the endpoint
  async experimental_getBalances({ currency: t = "usd" } = {}) {
    return (await this.communicator.send(E.getSafeBalances, {
      currency: t
    })).data;
  }
  async check1271Signature(t, n = "0x") {
    const s = await this.getInfo(), r = me({
      abi: [
        {
          constant: !1,
          inputs: [
            {
              name: "_dataHash",
              type: "bytes32"
            },
            {
              name: "_signature",
              type: "bytes"
            }
          ],
          name: "isValidSignature",
          outputs: [
            {
              name: "",
              type: "bytes4"
            }
          ],
          payable: !1,
          stateMutability: "nonpayable",
          type: "function"
        }
      ],
      functionName: "isValidSignature",
      args: [t, n]
    }), i = {
      call: A.eth_call,
      params: [
        {
          to: s.safeAddress,
          data: r
        },
        "latest"
      ]
    };
    try {
      return (await this.communicator.send(E.rpcCall, i)).data.slice(0, 10).toLowerCase() === Ss;
    } catch {
      return !1;
    }
  }
  async check1271SignatureBytes(t, n = "0x") {
    const s = await this.getInfo(), r = me({
      abi: [
        {
          constant: !1,
          inputs: [
            {
              name: "_data",
              type: "bytes"
            },
            {
              name: "_signature",
              type: "bytes"
            }
          ],
          name: "isValidSignature",
          outputs: [
            {
              name: "",
              type: "bytes4"
            }
          ],
          payable: !1,
          stateMutability: "nonpayable",
          type: "function"
        }
      ],
      functionName: "isValidSignature",
      args: [t, n]
    }), i = {
      call: A.eth_call,
      params: [
        {
          to: s.safeAddress,
          data: r
        },
        "latest"
      ]
    };
    try {
      return (await this.communicator.send(E.rpcCall, i)).data.slice(0, 10).toLowerCase() === bs;
    } catch {
      return !1;
    }
  }
  calculateMessageHash(t) {
    return os(t);
  }
  calculateTypedMessageHash(t) {
    const n = typeof t.domain.chainId == "object" ? t.domain.chainId.toNumber() : Number(t.domain.chainId);
    let s = t.primaryType;
    if (!s) {
      const r = Object.values(t.types), i = Object.keys(t.types).filter((o) => r.every((u) => u.every(({ type: h }) => h.replace("[", "").replace("]", "") !== o)));
      if (i.length === 0 || i.length > 1)
        throw new Error("Please specify primaryType");
      s = i[0];
    }
    return Yn({
      message: t.message,
      domain: {
        ...t.domain,
        chainId: n,
        verifyingContract: t.domain.verifyingContract,
        salt: t.domain.salt
      },
      types: t.types,
      primaryType: s
    });
  }
  async getOffChainSignature(t) {
    return (await this.communicator.send(E.getOffChainSignature, t)).data;
  }
  async isMessageSigned(t, n = "0x") {
    let s;
    if (typeof t == "string" && (s = async () => {
      const r = this.calculateMessageHash(t);
      return await this.isMessageHashSigned(r, n);
    }), ge(t) && (s = async () => {
      const r = this.calculateTypedMessageHash(t);
      return await this.isMessageHashSigned(r, n);
    }), s)
      return await s();
    throw new Error("Invalid message type");
  }
  async isMessageHashSigned(t, n = "0x") {
    const s = [this.check1271Signature.bind(this), this.check1271SignatureBytes.bind(this)];
    for (const r of s)
      if (await r(t, n))
        return !0;
    return !1;
  }
  async getEnvironmentInfo() {
    return (await this.communicator.send(E.getEnvironmentInfo, void 0)).data;
  }
  async requestAddressBook() {
    return (await this.communicator.send(E.requestAddressBook, void 0)).data;
  }
}
Os([
  Ns()
], Et.prototype, "requestAddressBook", null);
class ws {
  constructor(t = {}) {
    const { allowedDomains: n = null, debug: s = !1 } = t;
    this.communicator = new fs(n, s), this.eth = new vs(this.communicator), this.txs = new Is(this.communicator), this.safe = new Et(this.communicator), this.wallet = new yt(this.communicator);
  }
}
const Ds = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  MessageFormatter: W,
  get Methods() {
    return E;
  },
  Operation: G.Operation,
  RPC_CALLS: A,
  get RestrictedMethods() {
    return z;
  },
  TokenType: G.TokenType,
  TransactionStatus: G.TransactionStatus,
  TransferDirection: G.TransferDirection,
  default: ws,
  getSDKVersion: lt,
  isObjectEIP712TypedData: ge
}, Symbol.toStringTag, { value: "Module" }));
export {
  Ds as e
};
