import { g as gn, l as mn, m as Et, o as yn } from "./umd-DIrkvCx7.mjs";
import { s as bn } from "./sha2-B49Ilg9Y.mjs";
const wn = bn;
class D {
  constructor(e, n) {
    this.scope = e, this.module = n;
  }
  storeObject(e, n) {
    this.setItem(e, JSON.stringify(n));
  }
  loadObject(e) {
    const n = this.getItem(e);
    return n ? JSON.parse(n) : void 0;
  }
  setItem(e, n) {
    localStorage.setItem(this.scopedKey(e), n);
  }
  getItem(e) {
    return localStorage.getItem(this.scopedKey(e));
  }
  removeItem(e) {
    localStorage.removeItem(this.scopedKey(e));
  }
  clear() {
    const e = this.scopedKey(""), n = [];
    for (let s = 0; s < localStorage.length; s++) {
      const i = localStorage.key(s);
      typeof i == "string" && i.startsWith(e) && n.push(i);
    }
    n.forEach((s) => localStorage.removeItem(s));
  }
  scopedKey(e) {
    return `-${this.scope}${this.module ? `:${this.module}` : ""}:${e}`;
  }
  static clearAll() {
    new D("CBWSDK").clear(), new D("walletlink").clear();
  }
}
const E = {
  rpc: {
    invalidInput: -32e3,
    resourceNotFound: -32001,
    resourceUnavailable: -32002,
    transactionRejected: -32003,
    methodNotSupported: -32004,
    limitExceeded: -32005,
    parse: -32700,
    invalidRequest: -32600,
    methodNotFound: -32601,
    invalidParams: -32602,
    internal: -32603
  },
  provider: {
    userRejectedRequest: 4001,
    unauthorized: 4100,
    unsupportedMethod: 4200,
    disconnected: 4900,
    chainDisconnected: 4901,
    unsupportedChain: 4902
  }
}, xe = {
  "-32700": {
    standard: "JSON RPC 2.0",
    message: "Invalid JSON was received by the server. An error occurred on the server while parsing the JSON text."
  },
  "-32600": {
    standard: "JSON RPC 2.0",
    message: "The JSON sent is not a valid Request object."
  },
  "-32601": {
    standard: "JSON RPC 2.0",
    message: "The method does not exist / is not available."
  },
  "-32602": {
    standard: "JSON RPC 2.0",
    message: "Invalid method parameter(s)."
  },
  "-32603": {
    standard: "JSON RPC 2.0",
    message: "Internal JSON-RPC error."
  },
  "-32000": {
    standard: "EIP-1474",
    message: "Invalid input."
  },
  "-32001": {
    standard: "EIP-1474",
    message: "Resource not found."
  },
  "-32002": {
    standard: "EIP-1474",
    message: "Resource unavailable."
  },
  "-32003": {
    standard: "EIP-1474",
    message: "Transaction rejected."
  },
  "-32004": {
    standard: "EIP-1474",
    message: "Method not supported."
  },
  "-32005": {
    standard: "EIP-1474",
    message: "Request limit exceeded."
  },
  4001: {
    standard: "EIP-1193",
    message: "User rejected the request."
  },
  4100: {
    standard: "EIP-1193",
    message: "The requested account and/or method has not been authorized by the user."
  },
  4200: {
    standard: "EIP-1193",
    message: "The requested method is not supported by this Ethereum provider."
  },
  4900: {
    standard: "EIP-1193",
    message: "The provider is disconnected from all chains."
  },
  4901: {
    standard: "EIP-1193",
    message: "The provider is disconnected from the specified chain."
  },
  4902: {
    standard: "EIP-3085",
    message: "Unrecognized chain ID."
  }
}, It = "Unspecified error message.", vn = "Unspecified server error.";
function Oe(t, e = It) {
  if (t && Number.isInteger(t)) {
    const n = t.toString();
    if (Ae(xe, n))
      return xe[n].message;
    if (St(t))
      return vn;
  }
  return e;
}
function kn(t) {
  if (!Number.isInteger(t))
    return !1;
  const e = t.toString();
  return !!(xe[e] || St(t));
}
function En(t, { shouldIncludeStack: e = !1 } = {}) {
  const n = {};
  if (t && typeof t == "object" && !Array.isArray(t) && Ae(t, "code") && kn(t.code)) {
    const s = t;
    n.code = s.code, s.message && typeof s.message == "string" ? (n.message = s.message, Ae(s, "data") && (n.data = s.data)) : (n.message = Oe(n.code), n.data = { originalError: Ge(t) });
  } else
    n.code = E.rpc.internal, n.message = Ye(t, "message") ? t.message : It, n.data = { originalError: Ge(t) };
  return e && (n.stack = Ye(t, "stack") ? t.stack : void 0), n;
}
function St(t) {
  return t >= -32099 && t <= -32e3;
}
function Ge(t) {
  return t && typeof t == "object" && !Array.isArray(t) ? Object.assign({}, t) : t;
}
function Ae(t, e) {
  return Object.prototype.hasOwnProperty.call(t, e);
}
function Ye(t, e) {
  return typeof t == "object" && t !== null && e in t && typeof t[e] == "string";
}
const y = {
  rpc: {
    parse: (t) => A(E.rpc.parse, t),
    invalidRequest: (t) => A(E.rpc.invalidRequest, t),
    invalidParams: (t) => A(E.rpc.invalidParams, t),
    methodNotFound: (t) => A(E.rpc.methodNotFound, t),
    internal: (t) => A(E.rpc.internal, t),
    server: (t) => {
      if (!t || typeof t != "object" || Array.isArray(t))
        throw new Error("Ethereum RPC Server errors must provide single object argument.");
      const { code: e } = t;
      if (!Number.isInteger(e) || e > -32005 || e < -32099)
        throw new Error('"code" must be an integer such that: -32099 <= code <= -32005');
      return A(e, t);
    },
    invalidInput: (t) => A(E.rpc.invalidInput, t),
    resourceNotFound: (t) => A(E.rpc.resourceNotFound, t),
    resourceUnavailable: (t) => A(E.rpc.resourceUnavailable, t),
    transactionRejected: (t) => A(E.rpc.transactionRejected, t),
    methodNotSupported: (t) => A(E.rpc.methodNotSupported, t),
    limitExceeded: (t) => A(E.rpc.limitExceeded, t)
  },
  provider: {
    userRejectedRequest: (t) => F(E.provider.userRejectedRequest, t),
    unauthorized: (t) => F(E.provider.unauthorized, t),
    unsupportedMethod: (t) => F(E.provider.unsupportedMethod, t),
    disconnected: (t) => F(E.provider.disconnected, t),
    chainDisconnected: (t) => F(E.provider.chainDisconnected, t),
    unsupportedChain: (t) => F(E.provider.unsupportedChain, t),
    custom: (t) => {
      if (!t || typeof t != "object" || Array.isArray(t))
        throw new Error("Ethereum Provider custom errors must provide single object argument.");
      const { code: e, message: n, data: s } = t;
      if (!n || typeof n != "string")
        throw new Error('"message" must be a nonempty string');
      return new At(e, n, s);
    }
  }
};
function A(t, e) {
  const [n, s] = Ct(e);
  return new xt(t, n || Oe(t), s);
}
function F(t, e) {
  const [n, s] = Ct(e);
  return new At(t, n || Oe(t), s);
}
function Ct(t) {
  if (t) {
    if (typeof t == "string")
      return [t];
    if (typeof t == "object" && !Array.isArray(t)) {
      const { message: e, data: n } = t;
      if (e && typeof e != "string")
        throw new Error("Must specify string message.");
      return [e || void 0, n];
    }
  }
  return [];
}
class xt extends Error {
  constructor(e, n, s) {
    if (!Number.isInteger(e))
      throw new Error('"code" must be an integer.');
    if (!n || typeof n != "string")
      throw new Error('"message" must be a nonempty string.');
    super(n), this.code = e, s !== void 0 && (this.data = s);
  }
}
class At extends xt {
  /**
   * Create an Ethereum Provider JSON-RPC error.
   * `code` must be an integer in the 1000 <= 4999 range.
   */
  constructor(e, n, s) {
    if (!In(e))
      throw new Error('"code" must be an integer such that: 1000 <= code <= 4999');
    super(e, n, s);
  }
}
function In(t) {
  return Number.isInteger(t) && t >= 1e3 && t <= 4999;
}
function je() {
  return (t) => t;
}
const se = je(), Sn = je(), Cn = je();
function O(t) {
  return Math.floor(t);
}
const Mt = /^[0-9]*$/, Pt = /^[a-f0-9]*$/;
function K(t) {
  return Ue(crypto.getRandomValues(new Uint8Array(t)));
}
function Ue(t) {
  return [...t].map((e) => e.toString(16).padStart(2, "0")).join("");
}
function le(t) {
  return new Uint8Array(t.match(/.{1,2}/g).map((e) => Number.parseInt(e, 16)));
}
function X(t, e = !1) {
  const n = t.toString("hex");
  return se(e ? `0x${n}` : n);
}
function ve(t) {
  return X(Me(t), !0);
}
function T(t) {
  return Cn(t.toString(10));
}
function B(t) {
  return se(`0x${BigInt(t).toString(16)}`);
}
function Rt(t) {
  return t.startsWith("0x") || t.startsWith("0X");
}
function We(t) {
  return Rt(t) ? t.slice(2) : t;
}
function Lt(t) {
  return Rt(t) ? `0x${t.slice(2)}` : `0x${t}`;
}
function _e(t) {
  if (typeof t != "string")
    return !1;
  const e = We(t).toLowerCase();
  return Pt.test(e);
}
function xn(t, e = !1) {
  if (typeof t == "string") {
    const n = We(t).toLowerCase();
    if (Pt.test(n))
      return se(e ? `0x${n}` : n);
  }
  throw y.rpc.invalidParams(`"${String(t)}" is not a hexadecimal string`);
}
function qe(t, e = !1) {
  let n = xn(t, !1);
  return n.length % 2 === 1 && (n = se(`0${n}`)), e ? se(`0x${n}`) : n;
}
function q(t) {
  if (typeof t == "string") {
    const e = We(t).toLowerCase();
    if (_e(e) && e.length === 40)
      return Sn(Lt(e));
  }
  throw y.rpc.invalidParams(`Invalid Ethereum address: ${String(t)}`);
}
function Me(t) {
  if (Buffer.isBuffer(t))
    return t;
  if (typeof t == "string") {
    if (_e(t)) {
      const e = qe(t, !1);
      return Buffer.from(e, "hex");
    }
    return Buffer.from(t, "utf8");
  }
  throw y.rpc.invalidParams(`Not binary data: ${String(t)}`);
}
function ee(t) {
  if (typeof t == "number" && Number.isInteger(t))
    return O(t);
  if (typeof t == "string") {
    if (Mt.test(t))
      return O(Number(t));
    if (_e(t))
      return O(Number(BigInt(qe(t, !0))));
  }
  throw y.rpc.invalidParams(`Not an integer: ${String(t)}`);
}
function Z(t) {
  if (t !== null && (typeof t == "bigint" || Mn(t)))
    return BigInt(t.toString(10));
  if (typeof t == "number")
    return BigInt(ee(t));
  if (typeof t == "string") {
    if (Mt.test(t))
      return BigInt(t);
    if (_e(t))
      return BigInt(qe(t, !0));
  }
  throw y.rpc.invalidParams(`Not an integer: ${String(t)}`);
}
function An(t) {
  if (typeof t == "string")
    return JSON.parse(t);
  if (typeof t == "object")
    return t;
  throw y.rpc.invalidParams(`Not a JSON string or an object: ${String(t)}`);
}
function Mn(t) {
  if (t == null || typeof t.constructor != "function")
    return !1;
  const { constructor: e } = t;
  return typeof e.config == "function" && typeof e.EUCLID == "number";
}
async function Pn() {
  return crypto.subtle.generateKey({
    name: "ECDH",
    namedCurve: "P-256"
  }, !0, ["deriveKey"]);
}
async function Rn(t, e) {
  return crypto.subtle.deriveKey({
    name: "ECDH",
    public: e
  }, t, {
    name: "AES-GCM",
    length: 256
  }, !1, ["encrypt", "decrypt"]);
}
async function Ln(t, e) {
  const n = crypto.getRandomValues(new Uint8Array(12)), s = await crypto.subtle.encrypt({
    name: "AES-GCM",
    iv: n
  }, t, new TextEncoder().encode(e));
  return { iv: n, cipherText: s };
}
async function Tn(t, { iv: e, cipherText: n }) {
  const s = await crypto.subtle.decrypt({
    name: "AES-GCM",
    iv: e
  }, t, n);
  return new TextDecoder().decode(s);
}
function Tt(t) {
  switch (t) {
    case "public":
      return "spki";
    case "private":
      return "pkcs8";
  }
}
async function Nt(t, e) {
  const n = Tt(t), s = await crypto.subtle.exportKey(n, e);
  return Ue(new Uint8Array(s));
}
async function Dt(t, e) {
  const n = Tt(t), s = le(e).buffer;
  return await crypto.subtle.importKey(n, new Uint8Array(s), {
    name: "ECDH",
    namedCurve: "P-256"
  }, !0, t === "private" ? ["deriveKey"] : []);
}
async function Nn(t, e) {
  const n = JSON.stringify(t, (s, i) => {
    if (!(i instanceof Error))
      return i;
    const r = i;
    return Object.assign(Object.assign({}, r.code ? { code: r.code } : {}), { message: r.message });
  });
  return Ln(e, n);
}
async function Dn(t, e) {
  return JSON.parse(await Tn(e, t));
}
const ke = {
  storageKey: "ownPrivateKey",
  keyType: "private"
}, Ee = {
  storageKey: "ownPublicKey",
  keyType: "public"
}, Ie = {
  storageKey: "peerPublicKey",
  keyType: "public"
};
class On {
  constructor() {
    this.storage = new D("CBWSDK", "SCWKeyManager"), this.ownPrivateKey = null, this.ownPublicKey = null, this.peerPublicKey = null, this.sharedSecret = null;
  }
  async getOwnPublicKey() {
    return await this.loadKeysIfNeeded(), this.ownPublicKey;
  }
  // returns null if the shared secret is not yet derived
  async getSharedSecret() {
    return await this.loadKeysIfNeeded(), this.sharedSecret;
  }
  async setPeerPublicKey(e) {
    this.sharedSecret = null, this.peerPublicKey = e, await this.storeKey(Ie, e), await this.loadKeysIfNeeded();
  }
  async clear() {
    this.ownPrivateKey = null, this.ownPublicKey = null, this.peerPublicKey = null, this.sharedSecret = null, this.storage.removeItem(Ee.storageKey), this.storage.removeItem(ke.storageKey), this.storage.removeItem(Ie.storageKey);
  }
  async generateKeyPair() {
    const e = await Pn();
    this.ownPrivateKey = e.privateKey, this.ownPublicKey = e.publicKey, await this.storeKey(ke, e.privateKey), await this.storeKey(Ee, e.publicKey);
  }
  async loadKeysIfNeeded() {
    if (this.ownPrivateKey === null && (this.ownPrivateKey = await this.loadKey(ke)), this.ownPublicKey === null && (this.ownPublicKey = await this.loadKey(Ee)), (this.ownPrivateKey === null || this.ownPublicKey === null) && await this.generateKeyPair(), this.peerPublicKey === null && (this.peerPublicKey = await this.loadKey(Ie)), this.sharedSecret === null) {
      if (this.ownPrivateKey === null || this.peerPublicKey === null)
        return;
      this.sharedSecret = await Rn(this.ownPrivateKey, this.peerPublicKey);
    }
  }
  // storage methods
  async loadKey(e) {
    const n = this.storage.getItem(e.storageKey);
    return n ? Dt(e.keyType, n) : null;
  }
  async storeKey(e, n) {
    const s = await Nt(e.keyType, n);
    this.storage.setItem(e.storageKey, s);
  }
}
const re = "4.3.0", Ot = "@coinbase/wallet-sdk";
async function Be(t, e) {
  const n = Object.assign(Object.assign({}, t), { jsonrpc: "2.0", id: crypto.randomUUID() }), s = await window.fetch(e, {
    method: "POST",
    body: JSON.stringify(n),
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      "X-Cbw-Sdk-Version": re,
      "X-Cbw-Sdk-Platform": Ot
    }
  }), { result: i, error: r } = await s.json();
  if (r)
    throw r;
  return i;
}
function jn() {
  return globalThis.coinbaseWalletExtension;
}
function Un() {
  var t, e;
  try {
    const n = globalThis;
    return (t = n.ethereum) !== null && t !== void 0 ? t : (e = n.top) === null || e === void 0 ? void 0 : e.ethereum;
  } catch {
    return;
  }
}
function Wn({ metadata: t, preference: e }) {
  var n, s;
  const { appName: i, appLogoUrl: r, appChainIds: a } = t;
  if (e.options !== "smartWalletOnly") {
    const c = jn();
    if (c)
      return (n = c.setAppInfo) === null || n === void 0 || n.call(c, i, r, a, e), c;
  }
  const o = Un();
  if (o != null && o.isCoinbaseBrowser)
    return (s = o.setAppInfo) === null || s === void 0 || s.call(o, i, r, a, e), o;
}
function qn(t) {
  if (!t || typeof t != "object" || Array.isArray(t))
    throw y.rpc.invalidParams({
      message: "Expected a single, non-array, object argument.",
      data: t
    });
  const { method: e, params: n } = t;
  if (typeof e != "string" || e.length === 0)
    throw y.rpc.invalidParams({
      message: "'args.method' must be a non-empty string.",
      data: t
    });
  if (n !== void 0 && !Array.isArray(n) && (typeof n != "object" || n === null))
    throw y.rpc.invalidParams({
      message: "'args.params' must be an object or array if provided.",
      data: t
    });
  switch (e) {
    case "eth_sign":
    case "eth_signTypedData_v2":
    case "eth_subscribe":
    case "eth_unsubscribe":
      throw y.provider.unsupportedMethod();
  }
}
const Je = "accounts", Ve = "activeChain", Qe = "availableChains", Ze = "walletCapabilities";
class Bn {
  constructor(e) {
    var n, s, i;
    this.metadata = e.metadata, this.communicator = e.communicator, this.callback = e.callback, this.keyManager = new On(), this.storage = new D("CBWSDK", "SCWStateManager"), this.accounts = (n = this.storage.loadObject(Je)) !== null && n !== void 0 ? n : [], this.chain = this.storage.loadObject(Ve) || {
      id: (i = (s = e.metadata.appChainIds) === null || s === void 0 ? void 0 : s[0]) !== null && i !== void 0 ? i : 1
    }, this.handshake = this.handshake.bind(this), this.request = this.request.bind(this), this.createRequestMessage = this.createRequestMessage.bind(this), this.decryptResponseMessage = this.decryptResponseMessage.bind(this);
  }
  async handshake(e) {
    var n, s, i, r;
    await ((s = (n = this.communicator).waitForPopupLoaded) === null || s === void 0 ? void 0 : s.call(n));
    const a = await this.createRequestMessage({
      handshake: {
        method: e.method,
        params: Object.assign({}, this.metadata, (i = e.params) !== null && i !== void 0 ? i : {})
      }
    }), o = await this.communicator.postRequestAndWaitForResponse(a);
    if ("failure" in o.content)
      throw o.content.failure;
    const c = await Dt("public", o.sender);
    await this.keyManager.setPeerPublicKey(c);
    const u = (await this.decryptResponseMessage(o)).result;
    if ("error" in u)
      throw u.error;
    switch (e.method) {
      case "eth_requestAccounts": {
        const l = u.value;
        this.accounts = l, this.storage.storeObject(Je, l), (r = this.callback) === null || r === void 0 || r.call(this, "accountsChanged", l);
        break;
      }
    }
  }
  async request(e) {
    var n;
    if (this.accounts.length === 0)
      switch (e.method) {
        case "wallet_sendCalls":
          return this.sendRequestToPopup(e);
        default:
          throw y.provider.unauthorized();
      }
    switch (e.method) {
      case "eth_requestAccounts":
        return (n = this.callback) === null || n === void 0 || n.call(this, "connect", { chainId: B(this.chain.id) }), this.accounts;
      case "eth_accounts":
        return this.accounts;
      case "eth_coinbase":
        return this.accounts[0];
      case "net_version":
        return this.chain.id;
      case "eth_chainId":
        return B(this.chain.id);
      case "wallet_getCapabilities":
        return this.storage.loadObject(Ze);
      case "wallet_switchEthereumChain":
        return this.handleSwitchChainRequest(e);
      case "eth_ecRecover":
      case "personal_sign":
      case "wallet_sign":
      case "personal_ecRecover":
      case "eth_signTransaction":
      case "eth_sendTransaction":
      case "eth_signTypedData_v1":
      case "eth_signTypedData_v3":
      case "eth_signTypedData_v4":
      case "eth_signTypedData":
      case "wallet_addEthereumChain":
      case "wallet_watchAsset":
      case "wallet_sendCalls":
      case "wallet_showCallsStatus":
      case "wallet_grantPermissions":
        return this.sendRequestToPopup(e);
      default:
        if (!this.chain.rpcUrl)
          throw y.rpc.internal("No RPC URL set for chain");
        return Be(e, this.chain.rpcUrl);
    }
  }
  async sendRequestToPopup(e) {
    var n, s;
    await ((s = (n = this.communicator).waitForPopupLoaded) === null || s === void 0 ? void 0 : s.call(n));
    const i = await this.sendEncryptedRequest(e), a = (await this.decryptResponseMessage(i)).result;
    if ("error" in a)
      throw a.error;
    return a.value;
  }
  async cleanup() {
    var e, n;
    this.storage.clear(), await this.keyManager.clear(), this.accounts = [], this.chain = {
      id: (n = (e = this.metadata.appChainIds) === null || e === void 0 ? void 0 : e[0]) !== null && n !== void 0 ? n : 1
    };
  }
  /**
   * @returns `null` if the request was successful.
   * https://eips.ethereum.org/EIPS/eip-3326#wallet_switchethereumchain
   */
  async handleSwitchChainRequest(e) {
    var n;
    const s = e.params;
    if (!s || !(!((n = s[0]) === null || n === void 0) && n.chainId))
      throw y.rpc.invalidParams();
    const i = ee(s[0].chainId);
    if (this.updateChain(i))
      return null;
    const a = await this.sendRequestToPopup(e);
    return a === null && this.updateChain(i), a;
  }
  async sendEncryptedRequest(e) {
    const n = await this.keyManager.getSharedSecret();
    if (!n)
      throw y.provider.unauthorized("No valid session found, try requestAccounts before other methods");
    const s = await Nn({
      action: e,
      chainId: this.chain.id
    }, n), i = await this.createRequestMessage({ encrypted: s });
    return this.communicator.postRequestAndWaitForResponse(i);
  }
  async createRequestMessage(e) {
    const n = await Nt("public", await this.keyManager.getOwnPublicKey());
    return {
      id: crypto.randomUUID(),
      sender: n,
      content: e,
      timestamp: /* @__PURE__ */ new Date()
    };
  }
  async decryptResponseMessage(e) {
    var n, s;
    const i = e.content;
    if ("failure" in i)
      throw i.failure;
    const r = await this.keyManager.getSharedSecret();
    if (!r)
      throw y.provider.unauthorized("Invalid session");
    const a = await Dn(i.encrypted, r), o = (n = a.data) === null || n === void 0 ? void 0 : n.chains;
    if (o) {
      const d = Object.entries(o).map(([u, l]) => ({
        id: Number(u),
        rpcUrl: l
      }));
      this.storage.storeObject(Qe, d), this.updateChain(this.chain.id, d);
    }
    const c = (s = a.data) === null || s === void 0 ? void 0 : s.capabilities;
    return c && this.storage.storeObject(Ze, c), a;
  }
  updateChain(e, n) {
    var s;
    const i = n ?? this.storage.loadObject(Qe), r = i == null ? void 0 : i.find((a) => a.id === e);
    return r ? (r !== this.chain && (this.chain = r, this.storage.storeObject(Ve, r), (s = this.callback) === null || s === void 0 || s.call(this, "chainChanged", B(r.id))), !0) : !1;
  }
}
const Kn = /* @__PURE__ */ gn(mn), { keccak_256: zn } = Kn;
function jt(t) {
  return Buffer.allocUnsafe(t).fill(0);
}
function Hn(t) {
  return t.toString(2).length;
}
function Ut(t, e) {
  let n = t.toString(16);
  n.length % 2 !== 0 && (n = "0" + n);
  const s = n.match(/.{1,2}/g).map((i) => parseInt(i, 16));
  for (; s.length < e; )
    s.unshift(0);
  return Buffer.from(s);
}
function Fn(t, e) {
  const n = t < 0n;
  let s;
  if (n) {
    const i = (1n << BigInt(e)) - 1n;
    s = (~t & i) + 1n;
  } else
    s = t;
  return s &= (1n << BigInt(e)) - 1n, s;
}
function Wt(t, e, n) {
  const s = jt(e);
  return t = ge(t), n ? t.length < e ? (t.copy(s), s) : t.slice(0, e) : t.length < e ? (t.copy(s, e - t.length), s) : t.slice(-e);
}
function $n(t, e) {
  return Wt(t, e, !0);
}
function ge(t) {
  if (!Buffer.isBuffer(t))
    if (Array.isArray(t))
      t = Buffer.from(t);
    else if (typeof t == "string")
      qt(t) ? t = Buffer.from(Jn(Bt(t)), "hex") : t = Buffer.from(t);
    else if (typeof t == "number")
      t = intToBuffer(t);
    else if (t == null)
      t = Buffer.allocUnsafe(0);
    else if (typeof t == "bigint")
      t = Ut(t);
    else if (t.toArray)
      t = Buffer.from(t.toArray());
    else
      throw new Error("invalid type");
  return t;
}
function Gn(t) {
  return t = ge(t), "0x" + t.toString("hex");
}
function Yn(t, e) {
  if (t = ge(t), e || (e = 256), e !== 256)
    throw new Error("unsupported");
  return Buffer.from(zn(new Uint8Array(t)));
}
function Jn(t) {
  return t.length % 2 ? "0" + t : t;
}
function qt(t) {
  return typeof t == "string" && t.match(/^0x[0-9A-Fa-f]*$/);
}
function Bt(t) {
  return typeof t == "string" && t.startsWith("0x") ? t.slice(2) : t;
}
var Kt = {
  zeros: jt,
  setLength: Wt,
  setLengthRight: $n,
  isHexString: qt,
  stripHexPrefix: Bt,
  toBuffer: ge,
  bufferToHex: Gn,
  keccak: Yn,
  bitLengthFromBigInt: Hn,
  bufferBEFromBigInt: Ut,
  twosFromBigInt: Fn
};
const x = Kt;
function zt(t) {
  return t.startsWith("int[") ? "int256" + t.slice(3) : t === "int" ? "int256" : t.startsWith("uint[") ? "uint256" + t.slice(4) : t === "uint" ? "uint256" : t.startsWith("fixed[") ? "fixed128x128" + t.slice(5) : t === "fixed" ? "fixed128x128" : t.startsWith("ufixed[") ? "ufixed128x128" + t.slice(6) : t === "ufixed" ? "ufixed128x128" : t;
}
function $(t) {
  return Number.parseInt(/^\D+(\d+)$/.exec(t)[1], 10);
}
function Xe(t) {
  var e = /^\D+(\d+)x(\d+)$/.exec(t);
  return [Number.parseInt(e[1], 10), Number.parseInt(e[2], 10)];
}
function Ht(t) {
  var e = t.match(/(.*)\[(.*?)\]$/);
  return e ? e[2] === "" ? "dynamic" : Number.parseInt(e[2], 10) : null;
}
function z(t) {
  var e = typeof t;
  if (e === "string" || e === "number")
    return BigInt(t);
  if (e === "bigint")
    return t;
  throw new Error("Argument is not a number");
}
function N(t, e) {
  var n, s, i, r;
  if (t === "address")
    return N("uint160", z(e));
  if (t === "bool")
    return N("uint8", e ? 1 : 0);
  if (t === "string")
    return N("bytes", new Buffer(e, "utf8"));
  if (Qn(t)) {
    if (typeof e.length > "u")
      throw new Error("Not an array?");
    if (n = Ht(t), n !== "dynamic" && n !== 0 && e.length > n)
      throw new Error("Elements exceed array size: " + n);
    i = [], t = t.slice(0, t.lastIndexOf("[")), typeof e == "string" && (e = JSON.parse(e));
    for (r in e)
      i.push(N(t, e[r]));
    if (n === "dynamic") {
      var a = N("uint256", e.length);
      i.unshift(a);
    }
    return Buffer.concat(i);
  } else {
    if (t === "bytes")
      return e = new Buffer(e), i = Buffer.concat([N("uint256", e.length), e]), e.length % 32 !== 0 && (i = Buffer.concat([i, x.zeros(32 - e.length % 32)])), i;
    if (t.startsWith("bytes")) {
      if (n = $(t), n < 1 || n > 32)
        throw new Error("Invalid bytes<N> width: " + n);
      return x.setLengthRight(e, 32);
    } else if (t.startsWith("uint")) {
      if (n = $(t), n % 8 || n < 8 || n > 256)
        throw new Error("Invalid uint<N> width: " + n);
      s = z(e);
      const o = x.bitLengthFromBigInt(s);
      if (o > n)
        throw new Error("Supplied uint exceeds width: " + n + " vs " + o);
      if (s < 0)
        throw new Error("Supplied uint is negative");
      return x.bufferBEFromBigInt(s, 32);
    } else if (t.startsWith("int")) {
      if (n = $(t), n % 8 || n < 8 || n > 256)
        throw new Error("Invalid int<N> width: " + n);
      s = z(e);
      const o = x.bitLengthFromBigInt(s);
      if (o > n)
        throw new Error("Supplied int exceeds width: " + n + " vs " + o);
      const c = x.twosFromBigInt(s, 256);
      return x.bufferBEFromBigInt(c, 32);
    } else if (t.startsWith("ufixed")) {
      if (n = Xe(t), s = z(e), s < 0)
        throw new Error("Supplied ufixed is negative");
      return N("uint256", s * BigInt(2) ** BigInt(n[1]));
    } else if (t.startsWith("fixed"))
      return n = Xe(t), N("int256", z(e) * BigInt(2) ** BigInt(n[1]));
  }
  throw new Error("Unsupported or invalid type: " + t);
}
function Vn(t) {
  return t === "string" || t === "bytes" || Ht(t) === "dynamic";
}
function Qn(t) {
  return t.lastIndexOf("]") === t.length - 1;
}
function Zn(t, e) {
  var n = [], s = [], i = 32 * t.length;
  for (var r in t) {
    var a = zt(t[r]), o = e[r], c = N(a, o);
    Vn(a) ? (n.push(N("uint256", i)), s.push(c), i += c.length) : n.push(c);
  }
  return Buffer.concat(n.concat(s));
}
function Ft(t, e) {
  if (t.length !== e.length)
    throw new Error("Number of types are not matching the values");
  for (var n, s, i = [], r = 0; r < t.length; r++) {
    var a = zt(t[r]), o = e[r];
    if (a === "bytes")
      i.push(o);
    else if (a === "string")
      i.push(new Buffer(o, "utf8"));
    else if (a === "bool")
      i.push(new Buffer(o ? "01" : "00", "hex"));
    else if (a === "address")
      i.push(x.setLength(o, 20));
    else if (a.startsWith("bytes")) {
      if (n = $(a), n < 1 || n > 32)
        throw new Error("Invalid bytes<N> width: " + n);
      i.push(x.setLengthRight(o, n));
    } else if (a.startsWith("uint")) {
      if (n = $(a), n % 8 || n < 8 || n > 256)
        throw new Error("Invalid uint<N> width: " + n);
      s = z(o);
      const c = x.bitLengthFromBigInt(s);
      if (c > n)
        throw new Error("Supplied uint exceeds width: " + n + " vs " + c);
      i.push(x.bufferBEFromBigInt(s, n / 8));
    } else if (a.startsWith("int")) {
      if (n = $(a), n % 8 || n < 8 || n > 256)
        throw new Error("Invalid int<N> width: " + n);
      s = z(o);
      const c = x.bitLengthFromBigInt(s);
      if (c > n)
        throw new Error("Supplied int exceeds width: " + n + " vs " + c);
      const d = x.twosFromBigInt(s, n);
      i.push(x.bufferBEFromBigInt(d, n / 8));
    } else
      throw new Error("Unsupported or invalid type: " + a);
  }
  return Buffer.concat(i);
}
function Xn(t, e) {
  return x.keccak(Ft(t, e));
}
var es = {
  rawEncode: Zn,
  solidityPack: Ft,
  soliditySHA3: Xn
};
const M = Kt, te = es, $t = {
  type: "object",
  properties: {
    types: {
      type: "object",
      additionalProperties: {
        type: "array",
        items: {
          type: "object",
          properties: {
            name: { type: "string" },
            type: { type: "string" }
          },
          required: ["name", "type"]
        }
      }
    },
    primaryType: { type: "string" },
    domain: { type: "object" },
    message: { type: "object" }
  },
  required: ["types", "primaryType", "domain", "message"]
}, Se = {
  /**
   * Encodes an object by encoding and concatenating each of its members
   *
   * @param {string} primaryType - Root type
   * @param {Object} data - Object to encode
   * @param {Object} types - Type definitions
   * @returns {string} - Encoded representation of an object
   */
  encodeData(t, e, n, s = !0) {
    const i = ["bytes32"], r = [this.hashType(t, n)];
    if (s) {
      const a = (o, c, d) => {
        if (n[c] !== void 0)
          return ["bytes32", d == null ? "0x0000000000000000000000000000000000000000000000000000000000000000" : M.keccak(this.encodeData(c, d, n, s))];
        if (d === void 0)
          throw new Error(`missing value for field ${o} of type ${c}`);
        if (c === "bytes")
          return ["bytes32", M.keccak(d)];
        if (c === "string")
          return typeof d == "string" && (d = Buffer.from(d, "utf8")), ["bytes32", M.keccak(d)];
        if (c.lastIndexOf("]") === c.length - 1) {
          const u = c.slice(0, c.lastIndexOf("[")), l = d.map((f) => a(o, u, f));
          return ["bytes32", M.keccak(te.rawEncode(
            l.map(([f]) => f),
            l.map(([, f]) => f)
          ))];
        }
        return [c, d];
      };
      for (const o of n[t]) {
        const [c, d] = a(o.name, o.type, e[o.name]);
        i.push(c), r.push(d);
      }
    } else
      for (const a of n[t]) {
        let o = e[a.name];
        if (o !== void 0)
          if (a.type === "bytes")
            i.push("bytes32"), o = M.keccak(o), r.push(o);
          else if (a.type === "string")
            i.push("bytes32"), typeof o == "string" && (o = Buffer.from(o, "utf8")), o = M.keccak(o), r.push(o);
          else if (n[a.type] !== void 0)
            i.push("bytes32"), o = M.keccak(this.encodeData(a.type, o, n, s)), r.push(o);
          else {
            if (a.type.lastIndexOf("]") === a.type.length - 1)
              throw new Error("Arrays currently unimplemented in encodeData");
            i.push(a.type), r.push(o);
          }
      }
    return te.rawEncode(i, r);
  },
  /**
   * Encodes the type of an object by encoding a comma delimited list of its members
   *
   * @param {string} primaryType - Root type to encode
   * @param {Object} types - Type definitions
   * @returns {string} - Encoded representation of the type of an object
   */
  encodeType(t, e) {
    let n = "", s = this.findTypeDependencies(t, e).filter((i) => i !== t);
    s = [t].concat(s.sort());
    for (const i of s) {
      if (!e[i])
        throw new Error("No type definition specified: " + i);
      n += i + "(" + e[i].map(({ name: a, type: o }) => o + " " + a).join(",") + ")";
    }
    return n;
  },
  /**
   * Finds all types within a type definition object
   *
   * @param {string} primaryType - Root type
   * @param {Object} types - Type definitions
   * @param {Array} results - current set of accumulated types
   * @returns {Array} - Set of all types found in the type definition
   */
  findTypeDependencies(t, e, n = []) {
    if (t = t.match(/^\w*/)[0], n.includes(t) || e[t] === void 0)
      return n;
    n.push(t);
    for (const s of e[t])
      for (const i of this.findTypeDependencies(s.type, e, n))
        !n.includes(i) && n.push(i);
    return n;
  },
  /**
   * Hashes an object
   *
   * @param {string} primaryType - Root type
   * @param {Object} data - Object to hash
   * @param {Object} types - Type definitions
   * @returns {Buffer} - Hash of an object
   */
  hashStruct(t, e, n, s = !0) {
    return M.keccak(this.encodeData(t, e, n, s));
  },
  /**
   * Hashes the type of an object
   *
   * @param {string} primaryType - Root type to hash
   * @param {Object} types - Type definitions
   * @returns {string} - Hash of an object
   */
  hashType(t, e) {
    return M.keccak(this.encodeType(t, e));
  },
  /**
   * Removes properties from a message object that are not defined per EIP-712
   *
   * @param {Object} data - typed message object
   * @returns {Object} - typed message object with only allowed fields
   */
  sanitizeData(t) {
    const e = {};
    for (const n in $t.properties)
      t[n] && (e[n] = t[n]);
    return e.types && (e.types = Object.assign({ EIP712Domain: [] }, e.types)), e;
  },
  /**
   * Returns the hash of a typed message as per EIP-712 for signing
   *
   * @param {Object} typedData - Types message data to sign
   * @returns {string} - sha3 hash for signing
   */
  hash(t, e = !0) {
    const n = this.sanitizeData(t), s = [Buffer.from("1901", "hex")];
    return s.push(this.hashStruct("EIP712Domain", n.domain, n.types, e)), n.primaryType !== "EIP712Domain" && s.push(this.hashStruct(n.primaryType, n.message, n.types, e)), M.keccak(Buffer.concat(s));
  }
};
var ts = {
  TYPED_MESSAGE_SCHEMA: $t,
  TypedDataUtils: Se,
  hashForSignTypedDataLegacy: function(t) {
    return ns(t.data);
  },
  hashForSignTypedData_v3: function(t) {
    return Se.hash(t.data, !1);
  },
  hashForSignTypedData_v4: function(t) {
    return Se.hash(t.data);
  }
};
function ns(t) {
  const e = new Error("Expect argument to be non-empty array");
  if (typeof t != "object" || !t.length) throw e;
  const n = t.map(function(r) {
    return r.type === "bytes" ? M.toBuffer(r.value) : r.value;
  }), s = t.map(function(r) {
    return r.type;
  }), i = t.map(function(r) {
    if (!r.name) throw e;
    return r.type + " " + r.name;
  });
  return te.soliditySHA3(
    ["bytes32", "bytes32"],
    [
      te.soliditySHA3(new Array(t.length).fill("string"), i),
      te.soliditySHA3(s, n)
    ]
  );
}
const oe = /* @__PURE__ */ Et(ts), ss = "walletUsername", Pe = "Addresses", is = "AppVersion";
function C(t) {
  return t.errorMessage !== void 0;
}
class rs {
  // @param secret hex representation of 32-byte secret
  constructor(e) {
    this.secret = e;
  }
  /**
   *
   * @param plainText string to be encrypted
   * returns hex string representation of bytes in the order: initialization vector (iv),
   * auth tag, encrypted plaintext. IV is 12 bytes. Auth tag is 16 bytes. Remaining bytes are the
   * encrypted plainText.
   */
  async encrypt(e) {
    const n = this.secret;
    if (n.length !== 64)
      throw Error("secret must be 256 bits");
    const s = crypto.getRandomValues(new Uint8Array(12)), i = await crypto.subtle.importKey("raw", le(n), { name: "aes-gcm" }, !1, ["encrypt", "decrypt"]), r = new TextEncoder(), a = await window.crypto.subtle.encrypt({
      name: "AES-GCM",
      iv: s
    }, i, r.encode(e)), o = 16, c = a.slice(a.byteLength - o), d = a.slice(0, a.byteLength - o), u = new Uint8Array(c), l = new Uint8Array(d), f = new Uint8Array([...s, ...u, ...l]);
    return Ue(f);
  }
  /**
   *
   * @param cipherText hex string representation of bytes in the order: initialization vector (iv),
   * auth tag, encrypted plaintext. IV is 12 bytes. Auth tag is 16 bytes.
   */
  async decrypt(e) {
    const n = this.secret;
    if (n.length !== 64)
      throw Error("secret must be 256 bits");
    return new Promise((s, i) => {
      (async function() {
        const r = await crypto.subtle.importKey("raw", le(n), { name: "aes-gcm" }, !1, ["encrypt", "decrypt"]), a = le(e), o = a.slice(0, 12), c = a.slice(12, 28), d = a.slice(28), u = new Uint8Array([...d, ...c]), l = {
          name: "AES-GCM",
          iv: new Uint8Array(o)
        };
        try {
          const f = await window.crypto.subtle.decrypt(l, r, u), h = new TextDecoder();
          s(h.decode(f));
        } catch (f) {
          i(f);
        }
      })();
    });
  }
}
class as {
  constructor(e, n, s) {
    this.linkAPIUrl = e, this.sessionId = n;
    const i = `${n}:${s}`;
    this.auth = `Basic ${btoa(i)}`;
  }
  // mark unseen events as seen
  async markUnseenEventsAsSeen(e) {
    return Promise.all(e.map((n) => fetch(`${this.linkAPIUrl}/events/${n.eventId}/seen`, {
      method: "POST",
      headers: {
        Authorization: this.auth
      }
    }))).catch((n) => console.error("Unabled to mark event as failed:", n));
  }
  async fetchUnseenEvents() {
    var e;
    const n = await fetch(`${this.linkAPIUrl}/events?unseen=true`, {
      headers: {
        Authorization: this.auth
      }
    });
    if (n.ok) {
      const { events: s, error: i } = await n.json();
      if (i)
        throw new Error(`Check unseen events failed: ${i}`);
      const r = (e = s == null ? void 0 : s.filter((a) => a.event === "Web3Response").map((a) => ({
        type: "Event",
        sessionId: this.sessionId,
        eventId: a.id,
        event: a.event,
        data: a.data
      }))) !== null && e !== void 0 ? e : [];
      return this.markUnseenEventsAsSeen(r), r;
    }
    throw new Error(`Check unseen events failed: ${n.status}`);
  }
}
var U;
(function(t) {
  t[t.DISCONNECTED = 0] = "DISCONNECTED", t[t.CONNECTING = 1] = "CONNECTING", t[t.CONNECTED = 2] = "CONNECTED";
})(U || (U = {}));
class os {
  setConnectionStateListener(e) {
    this.connectionStateListener = e;
  }
  setIncomingDataListener(e) {
    this.incomingDataListener = e;
  }
  /**
   * Constructor
   * @param url WebSocket server URL
   * @param [WebSocketClass] Custom WebSocket implementation
   */
  constructor(e, n = WebSocket) {
    this.WebSocketClass = n, this.webSocket = null, this.pendingData = [], this.url = e.replace(/^http/, "ws");
  }
  /**
   * Make a websocket connection
   * @returns a Promise that resolves when connected
   */
  async connect() {
    if (this.webSocket)
      throw new Error("webSocket object is not null");
    return new Promise((e, n) => {
      var s;
      let i;
      try {
        this.webSocket = i = new this.WebSocketClass(this.url);
      } catch (r) {
        n(r);
        return;
      }
      (s = this.connectionStateListener) === null || s === void 0 || s.call(this, U.CONNECTING), i.onclose = (r) => {
        var a;
        this.clearWebSocket(), n(new Error(`websocket error ${r.code}: ${r.reason}`)), (a = this.connectionStateListener) === null || a === void 0 || a.call(this, U.DISCONNECTED);
      }, i.onopen = (r) => {
        var a;
        e(), (a = this.connectionStateListener) === null || a === void 0 || a.call(this, U.CONNECTED), this.pendingData.length > 0 && ([...this.pendingData].forEach((c) => this.sendData(c)), this.pendingData = []);
      }, i.onmessage = (r) => {
        var a, o;
        if (r.data === "h")
          (a = this.incomingDataListener) === null || a === void 0 || a.call(this, {
            type: "Heartbeat"
          });
        else
          try {
            const c = JSON.parse(r.data);
            (o = this.incomingDataListener) === null || o === void 0 || o.call(this, c);
          } catch {
          }
      };
    });
  }
  /**
   * Disconnect from server
   */
  disconnect() {
    var e;
    const { webSocket: n } = this;
    if (n) {
      this.clearWebSocket(), (e = this.connectionStateListener) === null || e === void 0 || e.call(this, U.DISCONNECTED), this.connectionStateListener = void 0, this.incomingDataListener = void 0;
      try {
        n.close();
      } catch {
      }
    }
  }
  /**
   * Send data to server
   * @param data text to send
   */
  sendData(e) {
    const { webSocket: n } = this;
    if (!n) {
      this.pendingData.push(e), this.connect();
      return;
    }
    n.send(e);
  }
  clearWebSocket() {
    const { webSocket: e } = this;
    e && (this.webSocket = null, e.onclose = null, e.onerror = null, e.onmessage = null, e.onopen = null);
  }
}
const et = 1e4, cs = 6e4;
class ls {
  /**
   * Constructor
   * @param session Session
   * @param linkAPIUrl Coinbase Wallet link server URL
   * @param listener WalletLinkConnectionUpdateListener
   * @param [WebSocketClass] Custom WebSocket implementation
   */
  constructor({ session: e, linkAPIUrl: n, listener: s }) {
    this.destroyed = !1, this.lastHeartbeatResponse = 0, this.nextReqId = O(1), this._connected = !1, this._linked = !1, this.shouldFetchUnseenEventsOnConnect = !1, this.requestResolutions = /* @__PURE__ */ new Map(), this.handleSessionMetadataUpdated = (r) => {
      if (!r)
        return;
      (/* @__PURE__ */ new Map([
        ["__destroyed", this.handleDestroyed],
        ["EthereumAddress", this.handleAccountUpdated],
        ["WalletUsername", this.handleWalletUsernameUpdated],
        ["AppVersion", this.handleAppVersionUpdated],
        [
          "ChainId",
          // ChainId and JsonRpcUrl are always updated together
          (o) => r.JsonRpcUrl && this.handleChainUpdated(o, r.JsonRpcUrl)
        ]
      ])).forEach((o, c) => {
        const d = r[c];
        d !== void 0 && o(d);
      });
    }, this.handleDestroyed = (r) => {
      var a;
      r === "1" && ((a = this.listener) === null || a === void 0 || a.resetAndReload());
    }, this.handleAccountUpdated = async (r) => {
      var a;
      const o = await this.cipher.decrypt(r);
      (a = this.listener) === null || a === void 0 || a.accountUpdated(o);
    }, this.handleMetadataUpdated = async (r, a) => {
      var o;
      const c = await this.cipher.decrypt(a);
      (o = this.listener) === null || o === void 0 || o.metadataUpdated(r, c);
    }, this.handleWalletUsernameUpdated = async (r) => {
      this.handleMetadataUpdated(ss, r);
    }, this.handleAppVersionUpdated = async (r) => {
      this.handleMetadataUpdated(is, r);
    }, this.handleChainUpdated = async (r, a) => {
      var o;
      const c = await this.cipher.decrypt(r), d = await this.cipher.decrypt(a);
      (o = this.listener) === null || o === void 0 || o.chainUpdated(c, d);
    }, this.session = e, this.cipher = new rs(e.secret), this.listener = s;
    const i = new os(`${n}/rpc`, WebSocket);
    i.setConnectionStateListener(async (r) => {
      let a = !1;
      switch (r) {
        case U.DISCONNECTED:
          if (!this.destroyed) {
            const o = async () => {
              await new Promise((c) => setTimeout(c, 5e3)), this.destroyed || i.connect().catch(() => {
                o();
              });
            };
            o();
          }
          break;
        case U.CONNECTED:
          a = await this.handleConnected(), this.updateLastHeartbeat(), setInterval(() => {
            this.heartbeat();
          }, et), this.shouldFetchUnseenEventsOnConnect && this.fetchUnseenEventsAPI();
          break;
        case U.CONNECTING:
          break;
      }
      this.connected !== a && (this.connected = a);
    }), i.setIncomingDataListener((r) => {
      var a;
      switch (r.type) {
        case "Heartbeat":
          this.updateLastHeartbeat();
          return;
        case "IsLinkedOK":
        case "Linked": {
          const o = r.type === "IsLinkedOK" ? r.linked : void 0;
          this.linked = o || r.onlineGuests > 0;
          break;
        }
        case "GetSessionConfigOK":
        case "SessionConfigUpdated": {
          this.handleSessionMetadataUpdated(r.metadata);
          break;
        }
        case "Event": {
          this.handleIncomingEvent(r);
          break;
        }
      }
      r.id !== void 0 && ((a = this.requestResolutions.get(r.id)) === null || a === void 0 || a(r));
    }), this.ws = i, this.http = new as(n, e.id, e.key);
  }
  /**
   * Make a connection to the server
   */
  connect() {
    if (this.destroyed)
      throw new Error("instance is destroyed");
    this.ws.connect();
  }
  /**
   * Terminate connection, and mark as destroyed. To reconnect, create a new
   * instance of WalletSDKConnection
   */
  async destroy() {
    this.destroyed || (await this.makeRequest({
      type: "SetSessionConfig",
      id: O(this.nextReqId++),
      sessionId: this.session.id,
      metadata: { __destroyed: "1" }
    }, { timeout: 1e3 }), this.destroyed = !0, this.ws.disconnect(), this.listener = void 0);
  }
  get connected() {
    return this._connected;
  }
  set connected(e) {
    this._connected = e;
  }
  get linked() {
    return this._linked;
  }
  set linked(e) {
    var n, s;
    this._linked = e, e && ((n = this.onceLinked) === null || n === void 0 || n.call(this)), (s = this.listener) === null || s === void 0 || s.linkedUpdated(e);
  }
  setOnceLinked(e) {
    return new Promise((n) => {
      this.linked ? e().then(n) : this.onceLinked = () => {
        e().then(n), this.onceLinked = void 0;
      };
    });
  }
  async handleIncomingEvent(e) {
    var n;
    if (e.type !== "Event" || e.event !== "Web3Response")
      return;
    const s = await this.cipher.decrypt(e.data), i = JSON.parse(s);
    if (i.type !== "WEB3_RESPONSE")
      return;
    const { id: r, response: a } = i;
    (n = this.listener) === null || n === void 0 || n.handleWeb3ResponseMessage(r, a);
  }
  async checkUnseenEvents() {
    if (!this.connected) {
      this.shouldFetchUnseenEventsOnConnect = !0;
      return;
    }
    await new Promise((e) => setTimeout(e, 250));
    try {
      await this.fetchUnseenEventsAPI();
    } catch (e) {
      console.error("Unable to check for unseen events", e);
    }
  }
  async fetchUnseenEventsAPI() {
    this.shouldFetchUnseenEventsOnConnect = !1, (await this.http.fetchUnseenEvents()).forEach((n) => this.handleIncomingEvent(n));
  }
  /**
   * Publish an event and emit event ID when successful
   * @param event event name
   * @param unencryptedData unencrypted event data
   * @param callWebhook whether the webhook should be invoked
   * @returns a Promise that emits event ID when successful
   */
  async publishEvent(e, n, s = !1) {
    const i = await this.cipher.encrypt(JSON.stringify(Object.assign(Object.assign({}, n), { origin: location.origin, location: location.href, relaySource: "coinbaseWalletExtension" in window && window.coinbaseWalletExtension ? "injected_sdk" : "sdk" }))), r = {
      type: "PublishEvent",
      id: O(this.nextReqId++),
      sessionId: this.session.id,
      event: e,
      data: i,
      callWebhook: s
    };
    return this.setOnceLinked(async () => {
      const a = await this.makeRequest(r);
      if (a.type === "Fail")
        throw new Error(a.error || "failed to publish event");
      return a.eventId;
    });
  }
  sendData(e) {
    this.ws.sendData(JSON.stringify(e));
  }
  updateLastHeartbeat() {
    this.lastHeartbeatResponse = Date.now();
  }
  heartbeat() {
    if (Date.now() - this.lastHeartbeatResponse > et * 2) {
      this.ws.disconnect();
      return;
    }
    try {
      this.ws.sendData("h");
    } catch {
    }
  }
  async makeRequest(e, n = { timeout: cs }) {
    const s = e.id;
    this.sendData(e);
    let i;
    return Promise.race([
      new Promise((r, a) => {
        i = window.setTimeout(() => {
          a(new Error(`request ${s} timed out`));
        }, n.timeout);
      }),
      new Promise((r) => {
        this.requestResolutions.set(s, (a) => {
          clearTimeout(i), r(a), this.requestResolutions.delete(s);
        });
      })
    ]);
  }
  async handleConnected() {
    return (await this.makeRequest({
      type: "HostSession",
      id: O(this.nextReqId++),
      sessionId: this.session.id,
      sessionKey: this.session.key
    })).type === "Fail" ? !1 : (this.sendData({
      type: "IsLinked",
      id: O(this.nextReqId++),
      sessionId: this.session.id
    }), this.sendData({
      type: "GetSessionConfig",
      id: O(this.nextReqId++),
      sessionId: this.session.id
    }), !0);
  }
}
class ds {
  constructor() {
    this._nextRequestId = 0, this.callbacks = /* @__PURE__ */ new Map();
  }
  makeRequestId() {
    this._nextRequestId = (this._nextRequestId + 1) % 2147483647;
    const e = this._nextRequestId, n = Lt(e.toString(16));
    return this.callbacks.get(n) && this.callbacks.delete(n), e;
  }
}
const tt = "session:id", nt = "session:secret", st = "session:linked";
class G {
  constructor(e, n, s, i = !1) {
    this.storage = e, this.id = n, this.secret = s, this.key = yn(wn(`${n}, ${s} WalletLink`)), this._linked = !!i;
  }
  static create(e) {
    const n = K(16), s = K(32);
    return new G(e, n, s).save();
  }
  static load(e) {
    const n = e.getItem(tt), s = e.getItem(st), i = e.getItem(nt);
    return n && i ? new G(e, n, i, s === "1") : null;
  }
  get linked() {
    return this._linked;
  }
  set linked(e) {
    this._linked = e, this.persistLinked();
  }
  save() {
    return this.storage.setItem(tt, this.id), this.storage.setItem(nt, this.secret), this.persistLinked(), this;
  }
  persistLinked() {
    this.storage.setItem(st, this._linked ? "1" : "0");
  }
}
function us() {
  try {
    return window.frameElement !== null;
  } catch {
    return !1;
  }
}
function hs() {
  try {
    return us() && window.top ? window.top.location : window.location;
  } catch {
    return window.location;
  }
}
function fs() {
  var t;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test((t = window == null ? void 0 : window.navigator) === null || t === void 0 ? void 0 : t.userAgent);
}
function Gt() {
  var t, e;
  return (e = (t = window == null ? void 0 : window.matchMedia) === null || t === void 0 ? void 0 : t.call(window, "(prefers-color-scheme: dark)").matches) !== null && e !== void 0 ? e : !1;
}
const ps = '@namespace svg "http://www.w3.org/2000/svg";.-cbwsdk-css-reset,.-cbwsdk-css-reset *{animation:none;animation-delay:0;animation-direction:normal;animation-duration:0;animation-fill-mode:none;animation-iteration-count:1;animation-name:none;animation-play-state:running;animation-timing-function:ease;backface-visibility:visible;background:0;background-attachment:scroll;background-clip:border-box;background-color:rgba(0,0,0,0);background-image:none;background-origin:padding-box;background-position:0 0;background-position-x:0;background-position-y:0;background-repeat:repeat;background-size:auto auto;border:0;border-style:none;border-width:medium;border-color:inherit;border-bottom:0;border-bottom-color:inherit;border-bottom-left-radius:0;border-bottom-right-radius:0;border-bottom-style:none;border-bottom-width:medium;border-collapse:separate;border-image:none;border-left:0;border-left-color:inherit;border-left-style:none;border-left-width:medium;border-radius:0;border-right:0;border-right-color:inherit;border-right-style:none;border-right-width:medium;border-spacing:0;border-top:0;border-top-color:inherit;border-top-left-radius:0;border-top-right-radius:0;border-top-style:none;border-top-width:medium;box-shadow:none;box-sizing:border-box;caption-side:top;clear:none;clip:auto;color:inherit;columns:auto;column-count:auto;column-fill:balance;column-gap:normal;column-rule:medium none currentColor;column-rule-color:currentColor;column-rule-style:none;column-rule-width:none;column-span:1;column-width:auto;counter-increment:none;counter-reset:none;direction:ltr;empty-cells:show;float:none;font:normal;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","Helvetica Neue",Arial,sans-serif;font-size:medium;font-style:normal;font-variant:normal;font-weight:normal;height:auto;hyphens:none;letter-spacing:normal;line-height:normal;list-style:none;list-style-image:none;list-style-position:outside;list-style-type:disc;margin:0;margin-bottom:0;margin-left:0;margin-right:0;margin-top:0;opacity:1;orphans:0;outline:0;outline-color:invert;outline-style:none;outline-width:medium;overflow:visible;overflow-x:visible;overflow-y:visible;padding:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;page-break-after:auto;page-break-before:auto;page-break-inside:auto;perspective:none;perspective-origin:50% 50%;pointer-events:auto;position:static;quotes:"\\201C" "\\201D" "\\2018" "\\2019";tab-size:8;table-layout:auto;text-align:inherit;text-align-last:auto;text-decoration:none;text-decoration-color:inherit;text-decoration-line:none;text-decoration-style:solid;text-indent:0;text-shadow:none;text-transform:none;transform:none;transform-style:flat;transition:none;transition-delay:0s;transition-duration:0s;transition-property:none;transition-timing-function:ease;unicode-bidi:normal;vertical-align:baseline;visibility:visible;white-space:normal;widows:0;word-spacing:normal;z-index:auto}.-cbwsdk-css-reset strong{font-weight:bold}.-cbwsdk-css-reset *{box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","Helvetica Neue",Arial,sans-serif;line-height:1}.-cbwsdk-css-reset [class*=container]{margin:0;padding:0}.-cbwsdk-css-reset style{display:none}';
function Yt() {
  const t = document.createElement("style");
  t.type = "text/css", t.appendChild(document.createTextNode(ps)), document.documentElement.appendChild(t);
}
function Jt(t) {
  var e, n, s = "";
  if (typeof t == "string" || typeof t == "number") s += t;
  else if (typeof t == "object") if (Array.isArray(t)) for (e = 0; e < t.length; e++) t[e] && (n = Jt(t[e])) && (s && (s += " "), s += n);
  else for (e in t) t[e] && (s && (s += " "), s += e);
  return s;
}
function ne() {
  for (var t, e, n = 0, s = ""; n < arguments.length; ) (t = arguments[n++]) && (e = Jt(t)) && (s && (s += " "), s += e);
  return s;
}
var me, v, Vt, H, it, Qt, Zt, Xt, Ke, Re, Le, ie = {}, en = [], _s = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i, ye = Array.isArray;
function W(t, e) {
  for (var n in e) t[n] = e[n];
  return t;
}
function ze(t) {
  t && t.parentNode && t.parentNode.removeChild(t);
}
function b(t, e, n) {
  var s, i, r, a = {};
  for (r in e) r == "key" ? s = e[r] : r == "ref" ? i = e[r] : a[r] = e[r];
  if (arguments.length > 2 && (a.children = arguments.length > 3 ? me.call(arguments, 2) : n), typeof t == "function" && t.defaultProps != null) for (r in t.defaultProps) a[r] === void 0 && (a[r] = t.defaultProps[r]);
  return de(t, a, s, i, null);
}
function de(t, e, n, s, i) {
  var r = { type: t, props: e, key: n, ref: s, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: i ?? ++Vt, __i: -1, __u: 0 };
  return i == null && v.vnode != null && v.vnode(r), r;
}
function be(t) {
  return t.children;
}
function ue(t, e) {
  this.props = t, this.context = e;
}
function Y(t, e) {
  if (e == null) return t.__ ? Y(t.__, t.__i + 1) : null;
  for (var n; e < t.__k.length; e++) if ((n = t.__k[e]) != null && n.__e != null) return n.__e;
  return typeof t.type == "function" ? Y(t) : null;
}
function tn(t) {
  var e, n;
  if ((t = t.__) != null && t.__c != null) {
    for (t.__e = t.__c.base = null, e = 0; e < t.__k.length; e++) if ((n = t.__k[e]) != null && n.__e != null) {
      t.__e = t.__c.base = n.__e;
      break;
    }
    return tn(t);
  }
}
function rt(t) {
  (!t.__d && (t.__d = !0) && H.push(t) && !fe.__r++ || it != v.debounceRendering) && ((it = v.debounceRendering) || Qt)(fe);
}
function fe() {
  for (var t, e, n, s, i, r, a, o = 1; H.length; ) H.length > o && H.sort(Zt), t = H.shift(), o = H.length, t.__d && (n = void 0, i = (s = (e = t).__v).__e, r = [], a = [], e.__P && ((n = W({}, s)).__v = s.__v + 1, v.vnode && v.vnode(n), He(e.__P, n, s, e.__n, e.__P.namespaceURI, 32 & s.__u ? [i] : null, r, i ?? Y(s), !!(32 & s.__u), a), n.__v = s.__v, n.__.__k[n.__i] = n, rn(r, n, a), n.__e != i && tn(n)));
  fe.__r = 0;
}
function nn(t, e, n, s, i, r, a, o, c, d, u) {
  var l, f, h, _, k, p, g = s && s.__k || en, m = e.length;
  for (c = gs(n, e, g, c, m), l = 0; l < m; l++) (h = n.__k[l]) != null && (f = h.__i == -1 ? ie : g[h.__i] || ie, h.__i = l, p = He(t, h, f, i, r, a, o, c, d, u), _ = h.__e, h.ref && f.ref != h.ref && (f.ref && Fe(f.ref, null, h), u.push(h.ref, h.__c || _, h)), k == null && _ != null && (k = _), 4 & h.__u || f.__k === h.__k ? c = sn(h, c, t) : typeof h.type == "function" && p !== void 0 ? c = p : _ && (c = _.nextSibling), h.__u &= -7);
  return n.__e = k, c;
}
function gs(t, e, n, s, i) {
  var r, a, o, c, d, u = n.length, l = u, f = 0;
  for (t.__k = new Array(i), r = 0; r < i; r++) (a = e[r]) != null && typeof a != "boolean" && typeof a != "function" ? (c = r + f, (a = t.__k[r] = typeof a == "string" || typeof a == "number" || typeof a == "bigint" || a.constructor == String ? de(null, a, null, null, null) : ye(a) ? de(be, { children: a }, null, null, null) : a.constructor == null && a.__b > 0 ? de(a.type, a.props, a.key, a.ref ? a.ref : null, a.__v) : a).__ = t, a.__b = t.__b + 1, o = null, (d = a.__i = ms(a, n, c, l)) != -1 && (l--, (o = n[d]) && (o.__u |= 2)), o == null || o.__v == null ? (d == -1 && (i > u ? f-- : i < u && f++), typeof a.type != "function" && (a.__u |= 4)) : d != c && (d == c - 1 ? f-- : d == c + 1 ? f++ : (d > c ? f-- : f++, a.__u |= 4))) : t.__k[r] = null;
  if (l) for (r = 0; r < u; r++) (o = n[r]) != null && !(2 & o.__u) && (o.__e == s && (s = Y(o)), on(o, o));
  return s;
}
function sn(t, e, n) {
  var s, i;
  if (typeof t.type == "function") {
    for (s = t.__k, i = 0; s && i < s.length; i++) s[i] && (s[i].__ = t, e = sn(s[i], e, n));
    return e;
  }
  t.__e != e && (e && t.type && !n.contains(e) && (e = Y(t)), n.insertBefore(t.__e, e || null), e = t.__e);
  do
    e = e && e.nextSibling;
  while (e != null && e.nodeType == 8);
  return e;
}
function ms(t, e, n, s) {
  var i, r, a = t.key, o = t.type, c = e[n];
  if (c === null && t.key == null || c && a == c.key && o == c.type && !(2 & c.__u)) return n;
  if (s > (c != null && !(2 & c.__u) ? 1 : 0)) for (i = n - 1, r = n + 1; i >= 0 || r < e.length; ) {
    if (i >= 0) {
      if ((c = e[i]) && !(2 & c.__u) && a == c.key && o == c.type) return i;
      i--;
    }
    if (r < e.length) {
      if ((c = e[r]) && !(2 & c.__u) && a == c.key && o == c.type) return r;
      r++;
    }
  }
  return -1;
}
function at(t, e, n) {
  e[0] == "-" ? t.setProperty(e, n ?? "") : t[e] = n == null ? "" : typeof n != "number" || _s.test(e) ? n : n + "px";
}
function ce(t, e, n, s, i) {
  var r, a;
  e: if (e == "style") if (typeof n == "string") t.style.cssText = n;
  else {
    if (typeof s == "string" && (t.style.cssText = s = ""), s) for (e in s) n && e in n || at(t.style, e, "");
    if (n) for (e in n) s && n[e] == s[e] || at(t.style, e, n[e]);
  }
  else if (e[0] == "o" && e[1] == "n") r = e != (e = e.replace(Xt, "$1")), a = e.toLowerCase(), e = a in t || e == "onFocusOut" || e == "onFocusIn" ? a.slice(2) : e.slice(2), t.l || (t.l = {}), t.l[e + r] = n, n ? s ? n.u = s.u : (n.u = Ke, t.addEventListener(e, r ? Le : Re, r)) : t.removeEventListener(e, r ? Le : Re, r);
  else {
    if (i == "http://www.w3.org/2000/svg") e = e.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
    else if (e != "width" && e != "height" && e != "href" && e != "list" && e != "form" && e != "tabIndex" && e != "download" && e != "rowSpan" && e != "colSpan" && e != "role" && e != "popover" && e in t) try {
      t[e] = n ?? "";
      break e;
    } catch {
    }
    typeof n == "function" || (n == null || n === !1 && e[4] != "-" ? t.removeAttribute(e) : t.setAttribute(e, e == "popover" && n == 1 ? "" : n));
  }
}
function ot(t) {
  return function(e) {
    if (this.l) {
      var n = this.l[e.type + t];
      if (e.t == null) e.t = Ke++;
      else if (e.t < n.u) return;
      return n(v.event ? v.event(e) : e);
    }
  };
}
function He(t, e, n, s, i, r, a, o, c, d) {
  var u, l, f, h, _, k, p, g, m, w, P, R, J, $e, ae, V, we, L = e.type;
  if (e.constructor != null) return null;
  128 & n.__u && (c = !!(32 & n.__u), r = [o = e.__e = n.__e]), (u = v.__b) && u(e);
  e: if (typeof L == "function") try {
    if (g = e.props, m = "prototype" in L && L.prototype.render, w = (u = L.contextType) && s[u.__c], P = u ? w ? w.props.value : u.__ : s, n.__c ? p = (l = e.__c = n.__c).__ = l.__E : (m ? e.__c = l = new L(g, P) : (e.__c = l = new ue(g, P), l.constructor = L, l.render = bs), w && w.sub(l), l.props = g, l.state || (l.state = {}), l.context = P, l.__n = s, f = l.__d = !0, l.__h = [], l._sb = []), m && l.__s == null && (l.__s = l.state), m && L.getDerivedStateFromProps != null && (l.__s == l.state && (l.__s = W({}, l.__s)), W(l.__s, L.getDerivedStateFromProps(g, l.__s))), h = l.props, _ = l.state, l.__v = e, f) m && L.getDerivedStateFromProps == null && l.componentWillMount != null && l.componentWillMount(), m && l.componentDidMount != null && l.__h.push(l.componentDidMount);
    else {
      if (m && L.getDerivedStateFromProps == null && g !== h && l.componentWillReceiveProps != null && l.componentWillReceiveProps(g, P), !l.__e && l.shouldComponentUpdate != null && l.shouldComponentUpdate(g, l.__s, P) === !1 || e.__v == n.__v) {
        for (e.__v != n.__v && (l.props = g, l.state = l.__s, l.__d = !1), e.__e = n.__e, e.__k = n.__k, e.__k.some(function(Q) {
          Q && (Q.__ = e);
        }), R = 0; R < l._sb.length; R++) l.__h.push(l._sb[R]);
        l._sb = [], l.__h.length && a.push(l);
        break e;
      }
      l.componentWillUpdate != null && l.componentWillUpdate(g, l.__s, P), m && l.componentDidUpdate != null && l.__h.push(function() {
        l.componentDidUpdate(h, _, k);
      });
    }
    if (l.context = P, l.props = g, l.__P = t, l.__e = !1, J = v.__r, $e = 0, m) {
      for (l.state = l.__s, l.__d = !1, J && J(e), u = l.render(l.props, l.state, l.context), ae = 0; ae < l._sb.length; ae++) l.__h.push(l._sb[ae]);
      l._sb = [];
    } else do
      l.__d = !1, J && J(e), u = l.render(l.props, l.state, l.context), l.state = l.__s;
    while (l.__d && ++$e < 25);
    l.state = l.__s, l.getChildContext != null && (s = W(W({}, s), l.getChildContext())), m && !f && l.getSnapshotBeforeUpdate != null && (k = l.getSnapshotBeforeUpdate(h, _)), V = u, u != null && u.type === be && u.key == null && (V = an(u.props.children)), o = nn(t, ye(V) ? V : [V], e, n, s, i, r, a, o, c, d), l.base = e.__e, e.__u &= -161, l.__h.length && a.push(l), p && (l.__E = l.__ = null);
  } catch (Q) {
    if (e.__v = null, c || r != null) if (Q.then) {
      for (e.__u |= c ? 160 : 128; o && o.nodeType == 8 && o.nextSibling; ) o = o.nextSibling;
      r[r.indexOf(o)] = null, e.__e = o;
    } else for (we = r.length; we--; ) ze(r[we]);
    else e.__e = n.__e, e.__k = n.__k;
    v.__e(Q, e, n);
  }
  else r == null && e.__v == n.__v ? (e.__k = n.__k, e.__e = n.__e) : o = e.__e = ys(n.__e, e, n, s, i, r, a, c, d);
  return (u = v.diffed) && u(e), 128 & e.__u ? void 0 : o;
}
function rn(t, e, n) {
  for (var s = 0; s < n.length; s++) Fe(n[s], n[++s], n[++s]);
  v.__c && v.__c(e, t), t.some(function(i) {
    try {
      t = i.__h, i.__h = [], t.some(function(r) {
        r.call(i);
      });
    } catch (r) {
      v.__e(r, i.__v);
    }
  });
}
function an(t) {
  return typeof t != "object" || t == null || t.__b && t.__b > 0 ? t : ye(t) ? t.map(an) : W({}, t);
}
function ys(t, e, n, s, i, r, a, o, c) {
  var d, u, l, f, h, _, k, p = n.props, g = e.props, m = e.type;
  if (m == "svg" ? i = "http://www.w3.org/2000/svg" : m == "math" ? i = "http://www.w3.org/1998/Math/MathML" : i || (i = "http://www.w3.org/1999/xhtml"), r != null) {
    for (d = 0; d < r.length; d++) if ((h = r[d]) && "setAttribute" in h == !!m && (m ? h.localName == m : h.nodeType == 3)) {
      t = h, r[d] = null;
      break;
    }
  }
  if (t == null) {
    if (m == null) return document.createTextNode(g);
    t = document.createElementNS(i, m, g.is && g), o && (v.__m && v.__m(e, r), o = !1), r = null;
  }
  if (m == null) p === g || o && t.data == g || (t.data = g);
  else {
    if (r = r && me.call(t.childNodes), p = n.props || ie, !o && r != null) for (p = {}, d = 0; d < t.attributes.length; d++) p[(h = t.attributes[d]).name] = h.value;
    for (d in p) if (h = p[d], d != "children") {
      if (d == "dangerouslySetInnerHTML") l = h;
      else if (!(d in g)) {
        if (d == "value" && "defaultValue" in g || d == "checked" && "defaultChecked" in g) continue;
        ce(t, d, null, h, i);
      }
    }
    for (d in g) h = g[d], d == "children" ? f = h : d == "dangerouslySetInnerHTML" ? u = h : d == "value" ? _ = h : d == "checked" ? k = h : o && typeof h != "function" || p[d] === h || ce(t, d, h, p[d], i);
    if (u) o || l && (u.__html == l.__html || u.__html == t.innerHTML) || (t.innerHTML = u.__html), e.__k = [];
    else if (l && (t.innerHTML = ""), nn(e.type == "template" ? t.content : t, ye(f) ? f : [f], e, n, s, m == "foreignObject" ? "http://www.w3.org/1999/xhtml" : i, r, a, r ? r[0] : n.__k && Y(n, 0), o, c), r != null) for (d = r.length; d--; ) ze(r[d]);
    o || (d = "value", m == "progress" && _ == null ? t.removeAttribute("value") : _ != null && (_ !== t[d] || m == "progress" && !_ || m == "option" && _ != p[d]) && ce(t, d, _, p[d], i), d = "checked", k != null && k != t[d] && ce(t, d, k, p[d], i));
  }
  return t;
}
function Fe(t, e, n) {
  try {
    if (typeof t == "function") {
      var s = typeof t.__u == "function";
      s && t.__u(), s && e == null || (t.__u = t(e));
    } else t.current = e;
  } catch (i) {
    v.__e(i, n);
  }
}
function on(t, e, n) {
  var s, i;
  if (v.unmount && v.unmount(t), (s = t.ref) && (s.current && s.current != t.__e || Fe(s, null, e)), (s = t.__c) != null) {
    if (s.componentWillUnmount) try {
      s.componentWillUnmount();
    } catch (r) {
      v.__e(r, e);
    }
    s.base = s.__P = null;
  }
  if (s = t.__k) for (i = 0; i < s.length; i++) s[i] && on(s[i], e, n || typeof t.type != "function");
  n || ze(t.__e), t.__c = t.__ = t.__e = void 0;
}
function bs(t, e, n) {
  return this.constructor(t, n);
}
function Te(t, e, n) {
  var s, i, r, a;
  e == document && (e = document.documentElement), v.__ && v.__(t, e), i = (s = !1) ? null : e.__k, r = [], a = [], He(e, t = e.__k = b(be, null, [t]), i || ie, ie, e.namespaceURI, i ? null : e.firstChild ? me.call(e.childNodes) : null, r, i ? i.__e : e.firstChild, s, a), rn(r, t, a);
}
me = en.slice, v = { __e: function(t, e, n, s) {
  for (var i, r, a; e = e.__; ) if ((i = e.__c) && !i.__) try {
    if ((r = i.constructor) && r.getDerivedStateFromError != null && (i.setState(r.getDerivedStateFromError(t)), a = i.__d), i.componentDidCatch != null && (i.componentDidCatch(t, s || {}), a = i.__d), a) return i.__E = i;
  } catch (o) {
    t = o;
  }
  throw t;
} }, Vt = 0, ue.prototype.setState = function(t, e) {
  var n;
  n = this.__s != null && this.__s != this.state ? this.__s : this.__s = W({}, this.state), typeof t == "function" && (t = t(W({}, n), this.props)), t && W(n, t), t != null && this.__v && (e && this._sb.push(e), rt(this));
}, ue.prototype.forceUpdate = function(t) {
  this.__v && (this.__e = !0, t && this.__h.push(t), rt(this));
}, ue.prototype.render = be, H = [], Qt = typeof Promise == "function" ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, Zt = function(t, e) {
  return t.__v.__b - e.__v.__b;
}, fe.__r = 0, Xt = /(PointerCapture)$|Capture$/i, Ke = 0, Re = ot(!1), Le = ot(!0);
var pe, I, Ce, ct, Ne = 0, cn = [], S = v, lt = S.__b, dt = S.__r, ut = S.diffed, ht = S.__c, ft = S.unmount, pt = S.__;
function ln(t, e) {
  S.__h && S.__h(I, t, Ne || e), Ne = 0;
  var n = I.__H || (I.__H = { __: [], __h: [] });
  return t >= n.__.length && n.__.push({}), n.__[t];
}
function _t(t) {
  return Ne = 1, ws(dn, t);
}
function ws(t, e, n) {
  var s = ln(pe++, 2);
  if (s.t = t, !s.__c && (s.__ = [dn(void 0, e), function(o) {
    var c = s.__N ? s.__N[0] : s.__[0], d = s.t(c, o);
    c !== d && (s.__N = [d, s.__[1]], s.__c.setState({}));
  }], s.__c = I, !I.__f)) {
    var i = function(o, c, d) {
      if (!s.__c.__H) return !0;
      var u = s.__c.__H.__.filter(function(f) {
        return !!f.__c;
      });
      if (u.every(function(f) {
        return !f.__N;
      })) return !r || r.call(this, o, c, d);
      var l = s.__c.props !== o;
      return u.forEach(function(f) {
        if (f.__N) {
          var h = f.__[0];
          f.__ = f.__N, f.__N = void 0, h !== f.__[0] && (l = !0);
        }
      }), r && r.call(this, o, c, d) || l;
    };
    I.__f = !0;
    var r = I.shouldComponentUpdate, a = I.componentWillUpdate;
    I.componentWillUpdate = function(o, c, d) {
      if (this.__e) {
        var u = r;
        r = void 0, i(o, c, d), r = u;
      }
      a && a.call(this, o, c, d);
    }, I.shouldComponentUpdate = i;
  }
  return s.__N || s.__;
}
function vs(t, e) {
  var n = ln(pe++, 3);
  !S.__s && Is(n.__H, e) && (n.__ = t, n.u = e, I.__H.__h.push(n));
}
function ks() {
  for (var t; t = cn.shift(); ) if (t.__P && t.__H) try {
    t.__H.__h.forEach(he), t.__H.__h.forEach(De), t.__H.__h = [];
  } catch (e) {
    t.__H.__h = [], S.__e(e, t.__v);
  }
}
S.__b = function(t) {
  I = null, lt && lt(t);
}, S.__ = function(t, e) {
  t && e.__k && e.__k.__m && (t.__m = e.__k.__m), pt && pt(t, e);
}, S.__r = function(t) {
  dt && dt(t), pe = 0;
  var e = (I = t.__c).__H;
  e && (Ce === I ? (e.__h = [], I.__h = [], e.__.forEach(function(n) {
    n.__N && (n.__ = n.__N), n.u = n.__N = void 0;
  })) : (e.__h.forEach(he), e.__h.forEach(De), e.__h = [], pe = 0)), Ce = I;
}, S.diffed = function(t) {
  ut && ut(t);
  var e = t.__c;
  e && e.__H && (e.__H.__h.length && (cn.push(e) !== 1 && ct === S.requestAnimationFrame || ((ct = S.requestAnimationFrame) || Es)(ks)), e.__H.__.forEach(function(n) {
    n.u && (n.__H = n.u), n.u = void 0;
  })), Ce = I = null;
}, S.__c = function(t, e) {
  e.some(function(n) {
    try {
      n.__h.forEach(he), n.__h = n.__h.filter(function(s) {
        return !s.__ || De(s);
      });
    } catch (s) {
      e.some(function(i) {
        i.__h && (i.__h = []);
      }), e = [], S.__e(s, n.__v);
    }
  }), ht && ht(t, e);
}, S.unmount = function(t) {
  ft && ft(t);
  var e, n = t.__c;
  n && n.__H && (n.__H.__.forEach(function(s) {
    try {
      he(s);
    } catch (i) {
      e = i;
    }
  }), n.__H = void 0, e && S.__e(e, n.__v));
};
var gt = typeof requestAnimationFrame == "function";
function Es(t) {
  var e, n = function() {
    clearTimeout(s), gt && cancelAnimationFrame(e), setTimeout(t);
  }, s = setTimeout(n, 35);
  gt && (e = requestAnimationFrame(n));
}
function he(t) {
  var e = I, n = t.__c;
  typeof n == "function" && (t.__c = void 0, n()), I = e;
}
function De(t) {
  var e = I;
  t.__c = t.__(), I = e;
}
function Is(t, e) {
  return !t || t.length !== e.length || e.some(function(n, s) {
    return n !== t[s];
  });
}
function dn(t, e) {
  return typeof e == "function" ? e(t) : e;
}
const Ss = ".-cbwsdk-css-reset .-gear-container{margin-left:16px !important;margin-right:9px !important;display:flex;align-items:center;justify-content:center;width:24px;height:24px;transition:opacity .25s}.-cbwsdk-css-reset .-gear-container *{user-select:none}.-cbwsdk-css-reset .-gear-container svg{opacity:0;position:absolute}.-cbwsdk-css-reset .-gear-icon{height:12px;width:12px;z-index:10000}.-cbwsdk-css-reset .-cbwsdk-snackbar{align-items:flex-end;display:flex;flex-direction:column;position:fixed;right:0;top:0;z-index:2147483647}.-cbwsdk-css-reset .-cbwsdk-snackbar *{user-select:none}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance{display:flex;flex-direction:column;margin:8px 16px 0 16px;overflow:visible;text-align:left;transform:translateX(0);transition:opacity .25s,transform .25s}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-header:hover .-gear-container svg{opacity:1}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-header{display:flex;align-items:center;background:#fff;overflow:hidden;border:1px solid #e7ebee;box-sizing:border-box;border-radius:8px;cursor:pointer}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-header-cblogo{margin:8px 8px 8px 8px}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-header *{cursor:pointer}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-header-message{color:#000;font-size:13px;line-height:1.5;user-select:none}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu{background:#fff;transition:opacity .25s ease-in-out,transform .25s linear,visibility 0s;visibility:hidden;border:1px solid #e7ebee;box-sizing:border-box;border-radius:8px;opacity:0;flex-direction:column;padding-left:8px;padding-right:8px}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu-item:last-child{margin-bottom:8px !important}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu-item:hover{background:#f5f7f8;border-radius:6px;transition:background .25s}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu-item:hover span{color:#050f19;transition:color .25s}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu-item:hover svg path{fill:#000;transition:fill .25s}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu-item{visibility:inherit;height:35px;margin-top:8px;margin-bottom:0;display:flex;flex-direction:row;align-items:center;padding:8px;cursor:pointer}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu-item *{visibility:inherit;cursor:pointer}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu-item-is-red:hover{background:rgba(223,95,103,.2);transition:background .25s}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu-item-is-red:hover *{cursor:pointer}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu-item-is-red:hover svg path{fill:#df5f67;transition:fill .25s}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu-item-is-red:hover span{color:#df5f67;transition:color .25s}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu-item-info{color:#aaa;font-size:13px;margin:0 8px 0 32px;position:absolute}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-hidden{opacity:0;text-align:left;transform:translateX(25%);transition:opacity .5s linear}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-expanded .-cbwsdk-snackbar-instance-menu{opacity:1;display:flex;transform:translateY(8px);visibility:visible}", Cs = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEuNDkyIDEwLjQxOWE4LjkzIDguOTMgMCAwMTguOTMtOC45M2gxMS4xNjNhOC45MyA4LjkzIDAgMDE4LjkzIDguOTN2MTEuMTYzYTguOTMgOC45MyAwIDAxLTguOTMgOC45M0gxMC40MjJhOC45MyA4LjkzIDAgMDEtOC45My04LjkzVjEwLjQxOXoiIGZpbGw9IiMxNjUyRjAiLz48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTEwLjQxOSAwSDIxLjU4QzI3LjMzNSAwIDMyIDQuNjY1IDMyIDEwLjQxOVYyMS41OEMzMiAyNy4zMzUgMjcuMzM1IDMyIDIxLjU4MSAzMkgxMC40MkM0LjY2NSAzMiAwIDI3LjMzNSAwIDIxLjU4MVYxMC40MkMwIDQuNjY1IDQuNjY1IDAgMTAuNDE5IDB6bTAgMS40ODhhOC45MyA4LjkzIDAgMDAtOC45MyA4LjkzdjExLjE2M2E4LjkzIDguOTMgMCAwMDguOTMgOC45M0gyMS41OGE4LjkzIDguOTMgMCAwMDguOTMtOC45M1YxMC40MmE4LjkzIDguOTMgMCAwMC04LjkzLTguOTNIMTAuNDJ6IiBmaWxsPSIjZmZmIi8+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xNS45OTggMjYuMDQ5Yy01LjU0OSAwLTEwLjA0Ny00LjQ5OC0xMC4wNDctMTAuMDQ3IDAtNS41NDggNC40OTgtMTAuMDQ2IDEwLjA0Ny0xMC4wNDYgNS41NDggMCAxMC4wNDYgNC40OTggMTAuMDQ2IDEwLjA0NiAwIDUuNTQ5LTQuNDk4IDEwLjA0Ny0xMC4wNDYgMTAuMDQ3eiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik0xMi43NjIgMTQuMjU0YzAtLjgyMi42NjctMS40ODkgMS40ODktMS40ODloMy40OTdjLjgyMiAwIDEuNDg4LjY2NiAxLjQ4OCAxLjQ4OXYzLjQ5N2MwIC44MjItLjY2NiAxLjQ4OC0xLjQ4OCAxLjQ4OGgtMy40OTdhMS40ODggMS40ODggMCAwMS0xLjQ4OS0xLjQ4OHYtMy40OTh6IiBmaWxsPSIjMTY1MkYwIi8+PC9zdmc+", xs = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEyIDYuNzV2LTEuNWwtMS43Mi0uNTdjLS4wOC0uMjctLjE5LS41Mi0uMzItLjc3bC44MS0xLjYyLTEuMDYtMS4wNi0xLjYyLjgxYy0uMjQtLjEzLS41LS4yNC0uNzctLjMyTDYuNzUgMGgtMS41bC0uNTcgMS43MmMtLjI3LjA4LS41My4xOS0uNzcuMzJsLTEuNjItLjgxLTEuMDYgMS4wNi44MSAxLjYyYy0uMTMuMjQtLjI0LjUtLjMyLjc3TDAgNS4yNXYxLjVsMS43Mi41N2MuMDguMjcuMTkuNTMuMzIuNzdsLS44MSAxLjYyIDEuMDYgMS4wNiAxLjYyLS44MWMuMjQuMTMuNS4yMy43Ny4zMkw1LjI1IDEyaDEuNWwuNTctMS43MmMuMjctLjA4LjUyLS4xOS43Ny0uMzJsMS42Mi44MSAxLjA2LTEuMDYtLjgxLTEuNjJjLjEzLS4yNC4yMy0uNS4zMi0uNzdMMTIgNi43NXpNNiA4LjVhMi41IDIuNSAwIDAxMC01IDIuNSAyLjUgMCAwMTAgNXoiIGZpbGw9IiMwNTBGMTkiLz48L3N2Zz4=";
class As {
  constructor() {
    this.items = /* @__PURE__ */ new Map(), this.nextItemKey = 0, this.root = null, this.darkMode = Gt();
  }
  attach(e) {
    this.root = document.createElement("div"), this.root.className = "-cbwsdk-snackbar-root", e.appendChild(this.root), this.render();
  }
  presentItem(e) {
    const n = this.nextItemKey++;
    return this.items.set(n, e), this.render(), () => {
      this.items.delete(n), this.render();
    };
  }
  clear() {
    this.items.clear(), this.render();
  }
  render() {
    this.root && Te(b(
      "div",
      null,
      b(un, { darkMode: this.darkMode }, Array.from(this.items.entries()).map(([e, n]) => b(Ms, Object.assign({}, n, { key: e }))))
    ), this.root);
  }
}
const un = (t) => b(
  "div",
  { class: ne("-cbwsdk-snackbar-container") },
  b("style", null, Ss),
  b("div", { class: "-cbwsdk-snackbar" }, t.children)
), Ms = ({ autoExpand: t, message: e, menuItems: n }) => {
  const [s, i] = _t(!0), [r, a] = _t(t ?? !1);
  vs(() => {
    const c = [
      window.setTimeout(() => {
        i(!1);
      }, 1),
      window.setTimeout(() => {
        a(!0);
      }, 1e4)
    ];
    return () => {
      c.forEach(window.clearTimeout);
    };
  });
  const o = () => {
    a(!r);
  };
  return b(
    "div",
    { class: ne("-cbwsdk-snackbar-instance", s && "-cbwsdk-snackbar-instance-hidden", r && "-cbwsdk-snackbar-instance-expanded") },
    b(
      "div",
      { class: "-cbwsdk-snackbar-instance-header", onClick: o },
      b("img", { src: Cs, class: "-cbwsdk-snackbar-instance-header-cblogo" }),
      " ",
      b("div", { class: "-cbwsdk-snackbar-instance-header-message" }, e),
      b(
        "div",
        { class: "-gear-container" },
        !r && b(
          "svg",
          { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
          b("circle", { cx: "12", cy: "12", r: "12", fill: "#F5F7F8" })
        ),
        b("img", { src: xs, class: "-gear-icon", title: "Expand" })
      )
    ),
    n && n.length > 0 && b("div", { class: "-cbwsdk-snackbar-instance-menu" }, n.map((c, d) => b(
      "div",
      { class: ne("-cbwsdk-snackbar-instance-menu-item", c.isRed && "-cbwsdk-snackbar-instance-menu-item-is-red"), onClick: c.onClick, key: d },
      b(
        "svg",
        { width: c.svgWidth, height: c.svgHeight, viewBox: "0 0 10 11", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
        b("path", { "fill-rule": c.defaultFillRule, "clip-rule": c.defaultClipRule, d: c.path, fill: "#AAAAAA" })
      ),
      b("span", { class: ne("-cbwsdk-snackbar-instance-menu-item-info", c.isRed && "-cbwsdk-snackbar-instance-menu-item-info-is-red") }, c.info)
    )))
  );
};
class Ps {
  constructor() {
    this.attached = !1, this.snackbar = new As();
  }
  attach() {
    if (this.attached)
      throw new Error("Coinbase Wallet SDK UI is already attached");
    const e = document.documentElement, n = document.createElement("div");
    n.className = "-cbwsdk-css-reset", e.appendChild(n), this.snackbar.attach(n), this.attached = !0, Yt();
  }
  showConnecting(e) {
    let n;
    return e.isUnlinkedErrorState ? n = {
      autoExpand: !0,
      message: "Connection lost",
      menuItems: [
        {
          isRed: !1,
          info: "Reset connection",
          svgWidth: "10",
          svgHeight: "11",
          path: "M5.00008 0.96875C6.73133 0.96875 8.23758 1.94375 9.00008 3.375L10.0001 2.375V5.5H9.53133H7.96883H6.87508L7.80633 4.56875C7.41258 3.3875 6.31258 2.53125 5.00008 2.53125C3.76258 2.53125 2.70633 3.2875 2.25633 4.36875L0.812576 3.76875C1.50008 2.125 3.11258 0.96875 5.00008 0.96875ZM2.19375 6.43125C2.5875 7.6125 3.6875 8.46875 5 8.46875C6.2375 8.46875 7.29375 7.7125 7.74375 6.63125L9.1875 7.23125C8.5 8.875 6.8875 10.0312 5 10.0312C3.26875 10.0312 1.7625 9.05625 1 7.625L0 8.625V5.5H0.46875H2.03125H3.125L2.19375 6.43125Z",
          defaultFillRule: "evenodd",
          defaultClipRule: "evenodd",
          onClick: e.onResetConnection
        }
      ]
    } : n = {
      message: "Confirm on phone",
      menuItems: [
        {
          isRed: !0,
          info: "Cancel transaction",
          svgWidth: "11",
          svgHeight: "11",
          path: "M10.3711 1.52346L9.21775 0.370117L5.37109 4.21022L1.52444 0.370117L0.371094 1.52346L4.2112 5.37012L0.371094 9.21677L1.52444 10.3701L5.37109 6.53001L9.21775 10.3701L10.3711 9.21677L6.53099 5.37012L10.3711 1.52346Z",
          defaultFillRule: "inherit",
          defaultClipRule: "inherit",
          onClick: e.onCancel
        },
        {
          isRed: !1,
          info: "Reset connection",
          svgWidth: "10",
          svgHeight: "11",
          path: "M5.00008 0.96875C6.73133 0.96875 8.23758 1.94375 9.00008 3.375L10.0001 2.375V5.5H9.53133H7.96883H6.87508L7.80633 4.56875C7.41258 3.3875 6.31258 2.53125 5.00008 2.53125C3.76258 2.53125 2.70633 3.2875 2.25633 4.36875L0.812576 3.76875C1.50008 2.125 3.11258 0.96875 5.00008 0.96875ZM2.19375 6.43125C2.5875 7.6125 3.6875 8.46875 5 8.46875C6.2375 8.46875 7.29375 7.7125 7.74375 6.63125L9.1875 7.23125C8.5 8.875 6.8875 10.0312 5 10.0312C3.26875 10.0312 1.7625 9.05625 1 7.625L0 8.625V5.5H0.46875H2.03125H3.125L2.19375 6.43125Z",
          defaultFillRule: "evenodd",
          defaultClipRule: "evenodd",
          onClick: e.onResetConnection
        }
      ]
    }, this.snackbar.presentItem(n);
  }
}
const Rs = ".-cbwsdk-css-reset .-cbwsdk-redirect-dialog-backdrop{position:fixed;top:0;left:0;right:0;bottom:0;transition:opacity .25s;background-color:rgba(10,11,13,.5)}.-cbwsdk-css-reset .-cbwsdk-redirect-dialog-backdrop-hidden{opacity:0}.-cbwsdk-css-reset .-cbwsdk-redirect-dialog-box{display:block;position:fixed;top:50%;left:50%;transform:translate(-50%, -50%);padding:20px;border-radius:8px;background-color:#fff;color:#0a0b0d}.-cbwsdk-css-reset .-cbwsdk-redirect-dialog-box p{display:block;font-weight:400;font-size:14px;line-height:20px;padding-bottom:12px;color:#5b636e}.-cbwsdk-css-reset .-cbwsdk-redirect-dialog-box button{appearance:none;border:none;background:none;color:#0052ff;padding:0;text-decoration:none;display:block;font-weight:600;font-size:16px;line-height:24px}.-cbwsdk-css-reset .-cbwsdk-redirect-dialog-box.dark{background-color:#0a0b0d;color:#fff}.-cbwsdk-css-reset .-cbwsdk-redirect-dialog-box.dark button{color:#0052ff}.-cbwsdk-css-reset .-cbwsdk-redirect-dialog-box.light{background-color:#fff;color:#0a0b0d}.-cbwsdk-css-reset .-cbwsdk-redirect-dialog-box.light button{color:#0052ff}";
class Ls {
  constructor() {
    this.root = null, this.darkMode = Gt();
  }
  attach() {
    const e = document.documentElement;
    this.root = document.createElement("div"), this.root.className = "-cbwsdk-css-reset", e.appendChild(this.root), Yt();
  }
  present(e) {
    this.render(e);
  }
  clear() {
    this.render(null);
  }
  render(e) {
    this.root && (Te(null, this.root), e && Te(b(Ts, Object.assign({}, e, { onDismiss: () => {
      this.clear();
    }, darkMode: this.darkMode })), this.root));
  }
}
const Ts = ({ title: t, buttonText: e, darkMode: n, onButtonClick: s, onDismiss: i }) => {
  const r = n ? "dark" : "light";
  return b(
    un,
    { darkMode: n },
    b(
      "div",
      { class: "-cbwsdk-redirect-dialog" },
      b("style", null, Rs),
      b("div", { class: "-cbwsdk-redirect-dialog-backdrop", onClick: i }),
      b(
        "div",
        { class: ne("-cbwsdk-redirect-dialog-box", r) },
        b("p", null, t),
        b("button", { onClick: s }, e)
      )
    )
  );
}, Ns = "https://keys.coinbase.com/connect", Ds = "http://rpc.wallet.coinbase.com", mt = "https://www.walletlink.org", Os = "https://go.cb-w.com/walletlink";
class yt {
  constructor() {
    this.attached = !1, this.redirectDialog = new Ls();
  }
  attach() {
    if (this.attached)
      throw new Error("Coinbase Wallet SDK UI is already attached");
    this.redirectDialog.attach(), this.attached = !0;
  }
  redirectToCoinbaseWallet(e) {
    const n = new URL(Os);
    n.searchParams.append("redirect_url", hs().href), e && n.searchParams.append("wl_url", e);
    const s = document.createElement("a");
    s.target = "cbw-opener", s.href = n.href, s.rel = "noreferrer noopener", s.click();
  }
  openCoinbaseWalletDeeplink(e) {
    this.redirectDialog.present({
      title: "Redirecting to Coinbase Wallet...",
      buttonText: "Open",
      onButtonClick: () => {
        this.redirectToCoinbaseWallet(e);
      }
    }), setTimeout(() => {
      this.redirectToCoinbaseWallet(e);
    }, 99);
  }
  showConnecting(e) {
    return () => {
      this.redirectDialog.clear();
    };
  }
}
class j {
  constructor(e) {
    this.chainCallbackParams = { chainId: "", jsonRpcUrl: "" }, this.isMobileWeb = fs(), this.linkedUpdated = (r) => {
      this.isLinked = r;
      const a = this.storage.getItem(Pe);
      if (r && (this._session.linked = r), this.isUnlinkedErrorState = !1, a) {
        const o = a.split(" "), c = this.storage.getItem("IsStandaloneSigning") === "true";
        o[0] !== "" && !r && this._session.linked && !c && (this.isUnlinkedErrorState = !0);
      }
    }, this.metadataUpdated = (r, a) => {
      this.storage.setItem(r, a);
    }, this.chainUpdated = (r, a) => {
      this.chainCallbackParams.chainId === r && this.chainCallbackParams.jsonRpcUrl === a || (this.chainCallbackParams = {
        chainId: r,
        jsonRpcUrl: a
      }, this.chainCallback && this.chainCallback(a, Number.parseInt(r, 10)));
    }, this.accountUpdated = (r) => {
      this.accountsCallback && this.accountsCallback([r]), j.accountRequestCallbackIds.size > 0 && (Array.from(j.accountRequestCallbackIds.values()).forEach((a) => {
        this.invokeCallback(a, {
          method: "requestEthereumAccounts",
          result: [r]
        });
      }), j.accountRequestCallbackIds.clear());
    }, this.resetAndReload = this.resetAndReload.bind(this), this.linkAPIUrl = e.linkAPIUrl, this.storage = e.storage, this.metadata = e.metadata, this.accountsCallback = e.accountsCallback, this.chainCallback = e.chainCallback;
    const { session: n, ui: s, connection: i } = this.subscribe();
    this._session = n, this.connection = i, this.relayEventManager = new ds(), this.ui = s, this.ui.attach();
  }
  subscribe() {
    const e = G.load(this.storage) || G.create(this.storage), { linkAPIUrl: n } = this, s = new ls({
      session: e,
      linkAPIUrl: n,
      listener: this
    }), i = this.isMobileWeb ? new yt() : new Ps();
    return s.connect(), { session: e, ui: i, connection: s };
  }
  resetAndReload() {
    this.connection.destroy().then(() => {
      const e = G.load(this.storage);
      (e == null ? void 0 : e.id) === this._session.id && D.clearAll(), document.location.reload();
    }).catch((e) => {
    });
  }
  signEthereumTransaction(e) {
    return this.sendRequest({
      method: "signEthereumTransaction",
      params: {
        fromAddress: e.fromAddress,
        toAddress: e.toAddress,
        weiValue: T(e.weiValue),
        data: X(e.data, !0),
        nonce: e.nonce,
        gasPriceInWei: e.gasPriceInWei ? T(e.gasPriceInWei) : null,
        maxFeePerGas: e.gasPriceInWei ? T(e.gasPriceInWei) : null,
        maxPriorityFeePerGas: e.gasPriceInWei ? T(e.gasPriceInWei) : null,
        gasLimit: e.gasLimit ? T(e.gasLimit) : null,
        chainId: e.chainId,
        shouldSubmit: !1
      }
    });
  }
  signAndSubmitEthereumTransaction(e) {
    return this.sendRequest({
      method: "signEthereumTransaction",
      params: {
        fromAddress: e.fromAddress,
        toAddress: e.toAddress,
        weiValue: T(e.weiValue),
        data: X(e.data, !0),
        nonce: e.nonce,
        gasPriceInWei: e.gasPriceInWei ? T(e.gasPriceInWei) : null,
        maxFeePerGas: e.maxFeePerGas ? T(e.maxFeePerGas) : null,
        maxPriorityFeePerGas: e.maxPriorityFeePerGas ? T(e.maxPriorityFeePerGas) : null,
        gasLimit: e.gasLimit ? T(e.gasLimit) : null,
        chainId: e.chainId,
        shouldSubmit: !0
      }
    });
  }
  submitEthereumTransaction(e, n) {
    return this.sendRequest({
      method: "submitEthereumTransaction",
      params: {
        signedTransaction: X(e, !0),
        chainId: n
      }
    });
  }
  getWalletLinkSession() {
    return this._session;
  }
  sendRequest(e) {
    let n = null;
    const s = K(8), i = (r) => {
      this.publishWeb3RequestCanceledEvent(s), this.handleErrorResponse(s, e.method, r), n == null || n();
    };
    return new Promise((r, a) => {
      n = this.ui.showConnecting({
        isUnlinkedErrorState: this.isUnlinkedErrorState,
        onCancel: i,
        onResetConnection: this.resetAndReload
        // eslint-disable-line @typescript-eslint/unbound-method
      }), this.relayEventManager.callbacks.set(s, (o) => {
        if (n == null || n(), C(o))
          return a(new Error(o.errorMessage));
        r(o);
      }), this.publishWeb3RequestEvent(s, e);
    });
  }
  publishWeb3RequestEvent(e, n) {
    const s = { type: "WEB3_REQUEST", id: e, request: n };
    this.publishEvent("Web3Request", s, !0).then((i) => {
    }).catch((i) => {
      this.handleWeb3ResponseMessage(s.id, {
        method: n.method,
        errorMessage: i.message
      });
    }), this.isMobileWeb && this.openCoinbaseWalletDeeplink(n.method);
  }
  // copied from MobileRelay
  openCoinbaseWalletDeeplink(e) {
    if (this.ui instanceof yt)
      switch (e) {
        case "requestEthereumAccounts":
        case "switchEthereumChain":
          return;
        default:
          window.addEventListener("blur", () => {
            window.addEventListener("focus", () => {
              this.connection.checkUnseenEvents();
            }, { once: !0 });
          }, { once: !0 }), this.ui.openCoinbaseWalletDeeplink();
          break;
      }
  }
  publishWeb3RequestCanceledEvent(e) {
    const n = {
      type: "WEB3_REQUEST_CANCELED",
      id: e
    };
    this.publishEvent("Web3RequestCanceled", n, !1).then();
  }
  publishEvent(e, n, s) {
    return this.connection.publishEvent(e, n, s);
  }
  handleWeb3ResponseMessage(e, n) {
    if (n.method === "requestEthereumAccounts") {
      j.accountRequestCallbackIds.forEach((s) => this.invokeCallback(s, n)), j.accountRequestCallbackIds.clear();
      return;
    }
    this.invokeCallback(e, n);
  }
  handleErrorResponse(e, n, s) {
    var i;
    const r = (i = s == null ? void 0 : s.message) !== null && i !== void 0 ? i : "Unspecified error message.";
    this.handleWeb3ResponseMessage(e, {
      method: n,
      errorMessage: r
    });
  }
  invokeCallback(e, n) {
    const s = this.relayEventManager.callbacks.get(e);
    s && (s(n), this.relayEventManager.callbacks.delete(e));
  }
  requestEthereumAccounts() {
    const { appName: e, appLogoUrl: n } = this.metadata, s = {
      method: "requestEthereumAccounts",
      params: {
        appName: e,
        appLogoUrl: n
      }
    }, i = K(8);
    return new Promise((r, a) => {
      this.relayEventManager.callbacks.set(i, (o) => {
        if (C(o))
          return a(new Error(o.errorMessage));
        r(o);
      }), j.accountRequestCallbackIds.add(i), this.publishWeb3RequestEvent(i, s);
    });
  }
  watchAsset(e, n, s, i, r, a) {
    const o = {
      method: "watchAsset",
      params: {
        type: e,
        options: {
          address: n,
          symbol: s,
          decimals: i,
          image: r
        },
        chainId: a
      }
    };
    let c = null;
    const d = K(8), u = (l) => {
      this.publishWeb3RequestCanceledEvent(d), this.handleErrorResponse(d, o.method, l), c == null || c();
    };
    return c = this.ui.showConnecting({
      isUnlinkedErrorState: this.isUnlinkedErrorState,
      onCancel: u,
      onResetConnection: this.resetAndReload
      // eslint-disable-line @typescript-eslint/unbound-method
    }), new Promise((l, f) => {
      this.relayEventManager.callbacks.set(d, (h) => {
        if (c == null || c(), C(h))
          return f(new Error(h.errorMessage));
        l(h);
      }), this.publishWeb3RequestEvent(d, o);
    });
  }
  addEthereumChain(e, n, s, i, r, a) {
    const o = {
      method: "addEthereumChain",
      params: {
        chainId: e,
        rpcUrls: n,
        blockExplorerUrls: i,
        chainName: r,
        iconUrls: s,
        nativeCurrency: a
      }
    };
    let c = null;
    const d = K(8), u = (l) => {
      this.publishWeb3RequestCanceledEvent(d), this.handleErrorResponse(d, o.method, l), c == null || c();
    };
    return c = this.ui.showConnecting({
      isUnlinkedErrorState: this.isUnlinkedErrorState,
      onCancel: u,
      onResetConnection: this.resetAndReload
      // eslint-disable-line @typescript-eslint/unbound-method
    }), new Promise((l, f) => {
      this.relayEventManager.callbacks.set(d, (h) => {
        if (c == null || c(), C(h))
          return f(new Error(h.errorMessage));
        l(h);
      }), this.publishWeb3RequestEvent(d, o);
    });
  }
  switchEthereumChain(e, n) {
    const s = {
      method: "switchEthereumChain",
      params: Object.assign({ chainId: e }, { address: n })
    };
    let i = null;
    const r = K(8), a = (o) => {
      this.publishWeb3RequestCanceledEvent(r), this.handleErrorResponse(r, s.method, o), i == null || i();
    };
    return i = this.ui.showConnecting({
      isUnlinkedErrorState: this.isUnlinkedErrorState,
      onCancel: a,
      onResetConnection: this.resetAndReload
      // eslint-disable-line @typescript-eslint/unbound-method
    }), new Promise((o, c) => {
      this.relayEventManager.callbacks.set(r, (d) => {
        if (i == null || i(), C(d) && d.errorCode)
          return c(y.provider.custom({
            code: d.errorCode,
            message: "Unrecognized chain ID. Try adding the chain using addEthereumChain first."
          }));
        if (C(d))
          return c(new Error(d.errorMessage));
        o(d);
      }), this.publishWeb3RequestEvent(r, s);
    });
  }
}
j.accountRequestCallbackIds = /* @__PURE__ */ new Set();
const bt = "DefaultChainId", wt = "DefaultJsonRpcUrl";
class hn {
  constructor(e) {
    this._relay = null, this._addresses = [], this.metadata = e.metadata, this._storage = new D("walletlink", mt), this.callback = e.callback || null;
    const n = this._storage.getItem(Pe);
    if (n) {
      const s = n.split(" ");
      s[0] !== "" && (this._addresses = s.map((i) => q(i)));
    }
    this.initializeRelay();
  }
  getSession() {
    const e = this.initializeRelay(), { id: n, secret: s } = e.getWalletLinkSession();
    return { id: n, secret: s };
  }
  async handshake() {
    await this._eth_requestAccounts();
  }
  get selectedAddress() {
    return this._addresses[0] || void 0;
  }
  get jsonRpcUrl() {
    var e;
    return (e = this._storage.getItem(wt)) !== null && e !== void 0 ? e : void 0;
  }
  set jsonRpcUrl(e) {
    this._storage.setItem(wt, e);
  }
  updateProviderInfo(e, n) {
    var s;
    this.jsonRpcUrl = e;
    const i = this.getChainId();
    this._storage.setItem(bt, n.toString(10)), ee(n) !== i && ((s = this.callback) === null || s === void 0 || s.call(this, "chainChanged", B(n)));
  }
  async watchAsset(e) {
    const n = Array.isArray(e) ? e[0] : e;
    if (!n.type)
      throw y.rpc.invalidParams("Type is required");
    if ((n == null ? void 0 : n.type) !== "ERC20")
      throw y.rpc.invalidParams(`Asset of type '${n.type}' is not supported`);
    if (!(n != null && n.options))
      throw y.rpc.invalidParams("Options are required");
    if (!(n != null && n.options.address))
      throw y.rpc.invalidParams("Address is required");
    const s = this.getChainId(), { address: i, symbol: r, image: a, decimals: o } = n.options, d = await this.initializeRelay().watchAsset(n.type, i, r, o, a, s == null ? void 0 : s.toString());
    return C(d) ? !1 : !!d.result;
  }
  async addEthereumChain(e) {
    var n, s;
    const i = e[0];
    if (((n = i.rpcUrls) === null || n === void 0 ? void 0 : n.length) === 0)
      throw y.rpc.invalidParams("please pass in at least 1 rpcUrl");
    if (!i.chainName || i.chainName.trim() === "")
      throw y.rpc.invalidParams("chainName is a required field");
    if (!i.nativeCurrency)
      throw y.rpc.invalidParams("nativeCurrency is a required field");
    const r = Number.parseInt(i.chainId, 16);
    if (r === this.getChainId())
      return !1;
    const a = this.initializeRelay(), { rpcUrls: o = [], blockExplorerUrls: c = [], chainName: d, iconUrls: u = [], nativeCurrency: l } = i, f = await a.addEthereumChain(r.toString(), o, u, c, d, l);
    if (C(f))
      return !1;
    if (((s = f.result) === null || s === void 0 ? void 0 : s.isApproved) === !0)
      return this.updateProviderInfo(o[0], r), null;
    throw y.rpc.internal("unable to add ethereum chain");
  }
  async switchEthereumChain(e) {
    const n = e[0], s = Number.parseInt(n.chainId, 16), r = await this.initializeRelay().switchEthereumChain(s.toString(10), this.selectedAddress || void 0);
    if (C(r))
      throw r;
    const a = r.result;
    return a.isApproved && a.rpcUrl.length > 0 && this.updateProviderInfo(a.rpcUrl, s), null;
  }
  async cleanup() {
    this.callback = null, this._relay && this._relay.resetAndReload(), this._storage.clear();
  }
  _setAddresses(e, n) {
    var s;
    if (!Array.isArray(e))
      throw new Error("addresses is not an array");
    const i = e.map((r) => q(r));
    JSON.stringify(i) !== JSON.stringify(this._addresses) && (this._addresses = i, (s = this.callback) === null || s === void 0 || s.call(this, "accountsChanged", i), this._storage.setItem(Pe, i.join(" ")));
  }
  async request(e) {
    const n = e.params || [];
    switch (e.method) {
      case "eth_accounts":
        return [...this._addresses];
      case "eth_coinbase":
        return this.selectedAddress || null;
      case "net_version":
        return this.getChainId().toString(10);
      case "eth_chainId":
        return B(this.getChainId());
      case "eth_requestAccounts":
        return this._eth_requestAccounts();
      case "eth_ecRecover":
      case "personal_ecRecover":
        return this.ecRecover(e);
      case "personal_sign":
        return this.personalSign(e);
      case "eth_signTransaction":
        return this._eth_signTransaction(n);
      case "eth_sendRawTransaction":
        return this._eth_sendRawTransaction(n);
      case "eth_sendTransaction":
        return this._eth_sendTransaction(n);
      case "eth_signTypedData_v1":
      case "eth_signTypedData_v3":
      case "eth_signTypedData_v4":
      case "eth_signTypedData":
        return this.signTypedData(e);
      case "wallet_addEthereumChain":
        return this.addEthereumChain(n);
      case "wallet_switchEthereumChain":
        return this.switchEthereumChain(n);
      case "wallet_watchAsset":
        return this.watchAsset(n);
      default:
        if (!this.jsonRpcUrl)
          throw y.rpc.internal("No RPC URL set for chain");
        return Be(e, this.jsonRpcUrl);
    }
  }
  _ensureKnownAddress(e) {
    const n = q(e);
    if (!this._addresses.map((i) => q(i)).includes(n))
      throw new Error("Unknown Ethereum address");
  }
  _prepareTransactionParams(e) {
    const n = e.from ? q(e.from) : this.selectedAddress;
    if (!n)
      throw new Error("Ethereum address is unavailable");
    this._ensureKnownAddress(n);
    const s = e.to ? q(e.to) : null, i = e.value != null ? Z(e.value) : BigInt(0), r = e.data ? Me(e.data) : Buffer.alloc(0), a = e.nonce != null ? ee(e.nonce) : null, o = e.gasPrice != null ? Z(e.gasPrice) : null, c = e.maxFeePerGas != null ? Z(e.maxFeePerGas) : null, d = e.maxPriorityFeePerGas != null ? Z(e.maxPriorityFeePerGas) : null, u = e.gas != null ? Z(e.gas) : null, l = e.chainId ? ee(e.chainId) : this.getChainId();
    return {
      fromAddress: n,
      toAddress: s,
      weiValue: i,
      data: r,
      nonce: a,
      gasPriceInWei: o,
      maxFeePerGas: c,
      maxPriorityFeePerGas: d,
      gasLimit: u,
      chainId: l
    };
  }
  async ecRecover(e) {
    const { method: n, params: s } = e;
    if (!Array.isArray(s))
      throw y.rpc.invalidParams();
    const r = await this.initializeRelay().sendRequest({
      method: "ethereumAddressFromSignedMessage",
      params: {
        message: ve(s[0]),
        signature: ve(s[1]),
        addPrefix: n === "personal_ecRecover"
      }
    });
    if (C(r))
      throw r;
    return r.result;
  }
  getChainId() {
    var e;
    return Number.parseInt((e = this._storage.getItem(bt)) !== null && e !== void 0 ? e : "1", 10);
  }
  async _eth_requestAccounts() {
    var e, n;
    if (this._addresses.length > 0)
      return (e = this.callback) === null || e === void 0 || e.call(this, "connect", { chainId: B(this.getChainId()) }), this._addresses;
    const i = await this.initializeRelay().requestEthereumAccounts();
    if (C(i))
      throw i;
    if (!i.result)
      throw new Error("accounts received is empty");
    return this._setAddresses(i.result), (n = this.callback) === null || n === void 0 || n.call(this, "connect", { chainId: B(this.getChainId()) }), this._addresses;
  }
  async personalSign({ params: e }) {
    if (!Array.isArray(e))
      throw y.rpc.invalidParams();
    const n = e[1], s = e[0];
    this._ensureKnownAddress(n);
    const r = await this.initializeRelay().sendRequest({
      method: "signEthereumMessage",
      params: {
        address: q(n),
        message: ve(s),
        addPrefix: !0,
        typedDataJson: null
      }
    });
    if (C(r))
      throw r;
    return r.result;
  }
  async _eth_signTransaction(e) {
    const n = this._prepareTransactionParams(e[0] || {}), i = await this.initializeRelay().signEthereumTransaction(n);
    if (C(i))
      throw i;
    return i.result;
  }
  async _eth_sendRawTransaction(e) {
    const n = Me(e[0]), i = await this.initializeRelay().submitEthereumTransaction(n, this.getChainId());
    if (C(i))
      throw i;
    return i.result;
  }
  async _eth_sendTransaction(e) {
    const n = this._prepareTransactionParams(e[0] || {}), i = await this.initializeRelay().signAndSubmitEthereumTransaction(n);
    if (C(i))
      throw i;
    return i.result;
  }
  async signTypedData(e) {
    const { method: n, params: s } = e;
    if (!Array.isArray(s))
      throw y.rpc.invalidParams();
    const i = (d) => {
      const u = {
        eth_signTypedData_v1: oe.hashForSignTypedDataLegacy,
        eth_signTypedData_v3: oe.hashForSignTypedData_v3,
        eth_signTypedData_v4: oe.hashForSignTypedData_v4,
        eth_signTypedData: oe.hashForSignTypedData_v4
      };
      return X(u[n]({
        data: An(d)
      }), !0);
    }, r = s[n === "eth_signTypedData_v1" ? 1 : 0], a = s[n === "eth_signTypedData_v1" ? 0 : 1];
    this._ensureKnownAddress(r);
    const c = await this.initializeRelay().sendRequest({
      method: "signEthereumMessage",
      params: {
        address: q(r),
        message: i(a),
        typedDataJson: JSON.stringify(a, null, 2),
        addPrefix: !1
      }
    });
    if (C(c))
      throw c;
    return c.result;
  }
  initializeRelay() {
    return this._relay || (this._relay = new j({
      linkAPIUrl: mt,
      storage: this._storage,
      metadata: this.metadata,
      accountsCallback: this._setAddresses.bind(this),
      chainCallback: this.updateProviderInfo.bind(this)
    })), this._relay;
  }
}
const fn = "SignerType", pn = new D("CBWSDK", "SignerConfigurator");
function js() {
  return pn.getItem(fn);
}
function Us(t) {
  pn.setItem(fn, t);
}
async function Ws(t) {
  const { communicator: e, metadata: n, handshakeRequest: s, callback: i } = t;
  Bs(e, n, i).catch(() => {
  });
  const r = {
    id: crypto.randomUUID(),
    event: "selectSignerType",
    data: Object.assign(Object.assign({}, t.preference), { handshakeRequest: s })
  }, { data: a } = await e.postRequestAndWaitForResponse(r);
  return a;
}
function qs(t) {
  const { signerType: e, metadata: n, communicator: s, callback: i } = t;
  switch (e) {
    case "scw":
      return new Bn({
        metadata: n,
        callback: i,
        communicator: s
      });
    case "walletlink":
      return new hn({
        metadata: n,
        callback: i
      });
  }
}
async function Bs(t, e, n) {
  await t.onMessage(({ event: i }) => i === "WalletLinkSessionRequest");
  const s = new hn({
    metadata: e,
    callback: n
  });
  t.postMessage({
    event: "WalletLinkUpdate",
    data: { session: s.getSession() }
  }), await s.handshake(), t.postMessage({
    event: "WalletLinkUpdate",
    data: { connected: !0 }
  });
}
const Ks = `Coinbase Wallet SDK requires the Cross-Origin-Opener-Policy header to not be set to 'same-origin'. This is to ensure that the SDK can communicate with the Coinbase Smart Wallet app.

Please see https://www.smartwallet.dev/guides/tips/popup-tips#cross-origin-opener-policy for more information.`, zs = () => {
  let t;
  return {
    getCrossOriginOpenerPolicy: () => t === void 0 ? "undefined" : t,
    checkCrossOriginOpenerPolicy: async () => {
      if (typeof window > "u") {
        t = "non-browser-env";
        return;
      }
      try {
        const e = `${window.location.origin}${window.location.pathname}`, n = await fetch(e, {
          method: "HEAD"
        });
        if (!n.ok)
          throw new Error(`HTTP error! status: ${n.status}`);
        const s = n.headers.get("Cross-Origin-Opener-Policy");
        t = s ?? "null", t === "same-origin" && console.error(Ks);
      } catch (e) {
        console.error("Error checking Cross-Origin-Opener-Policy:", e.message), t = "error";
      }
    }
  };
}, { checkCrossOriginOpenerPolicy: Hs, getCrossOriginOpenerPolicy: Fs } = zs(), vt = 420, kt = 540;
function $s(t) {
  const e = (window.innerWidth - vt) / 2 + window.screenX, n = (window.innerHeight - kt) / 2 + window.screenY;
  Ys(t);
  const s = `wallet_${crypto.randomUUID()}`, i = window.open(t, s, `width=${vt}, height=${kt}, left=${e}, top=${n}`);
  if (i == null || i.focus(), !i)
    throw y.rpc.internal("Pop up window failed to open");
  return i;
}
function Gs(t) {
  t && !t.closed && t.close();
}
function Ys(t) {
  const e = {
    sdkName: Ot,
    sdkVersion: re,
    origin: window.location.origin,
    coop: Fs()
  };
  for (const [n, s] of Object.entries(e))
    t.searchParams.append(n, s.toString());
}
class Js {
  constructor({ url: e = Ns, metadata: n, preference: s }) {
    this.popup = null, this.listeners = /* @__PURE__ */ new Map(), this.postMessage = async (i) => {
      (await this.waitForPopupLoaded()).postMessage(i, this.url.origin);
    }, this.postRequestAndWaitForResponse = async (i) => {
      const r = this.onMessage(({ requestId: a }) => a === i.id);
      return this.postMessage(i), await r;
    }, this.onMessage = async (i) => new Promise((r, a) => {
      const o = (c) => {
        if (c.origin !== this.url.origin)
          return;
        const d = c.data;
        i(d) && (r(d), window.removeEventListener("message", o), this.listeners.delete(o));
      };
      window.addEventListener("message", o), this.listeners.set(o, { reject: a });
    }), this.disconnect = () => {
      Gs(this.popup), this.popup = null, this.listeners.forEach(({ reject: i }, r) => {
        i(y.provider.userRejectedRequest("Request rejected")), window.removeEventListener("message", r);
      }), this.listeners.clear();
    }, this.waitForPopupLoaded = async () => this.popup && !this.popup.closed ? (this.popup.focus(), this.popup) : (this.popup = $s(this.url), this.onMessage(({ event: i }) => i === "PopupUnload").then(this.disconnect).catch(() => {
    }), this.onMessage(({ event: i }) => i === "PopupLoaded").then((i) => {
      this.postMessage({
        requestId: i.id,
        data: {
          version: re,
          metadata: this.metadata,
          preference: this.preference,
          location: window.location.toString()
        }
      });
    }).then(() => {
      if (!this.popup)
        throw y.rpc.internal();
      return this.popup;
    })), this.url = new URL(e), this.metadata = n, this.preference = s;
  }
}
function Vs(t) {
  const e = En(Qs(t), {
    shouldIncludeStack: !0
  }), n = new URL("https://docs.cloud.coinbase.com/wallet-sdk/docs/errors");
  return n.searchParams.set("version", re), n.searchParams.set("code", e.code.toString()), n.searchParams.set("message", e.message), Object.assign(Object.assign({}, e), { docUrl: n.href });
}
function Qs(t) {
  var e;
  if (typeof t == "string")
    return {
      message: t,
      code: E.rpc.internal
    };
  if (C(t)) {
    const n = t.errorMessage, s = (e = t.errorCode) !== null && e !== void 0 ? e : n.match(/(denied|rejected)/i) ? E.provider.userRejectedRequest : void 0;
    return Object.assign(Object.assign({}, t), {
      message: n,
      code: s,
      data: { method: t.method }
    });
  }
  return t;
}
var _n = { exports: {} };
(function(t) {
  var e = Object.prototype.hasOwnProperty, n = "~";
  function s() {
  }
  Object.create && (s.prototype = /* @__PURE__ */ Object.create(null), new s().__proto__ || (n = !1));
  function i(c, d, u) {
    this.fn = c, this.context = d, this.once = u || !1;
  }
  function r(c, d, u, l, f) {
    if (typeof u != "function")
      throw new TypeError("The listener must be a function");
    var h = new i(u, l || c, f), _ = n ? n + d : d;
    return c._events[_] ? c._events[_].fn ? c._events[_] = [c._events[_], h] : c._events[_].push(h) : (c._events[_] = h, c._eventsCount++), c;
  }
  function a(c, d) {
    --c._eventsCount === 0 ? c._events = new s() : delete c._events[d];
  }
  function o() {
    this._events = new s(), this._eventsCount = 0;
  }
  o.prototype.eventNames = function() {
    var d = [], u, l;
    if (this._eventsCount === 0) return d;
    for (l in u = this._events)
      e.call(u, l) && d.push(n ? l.slice(1) : l);
    return Object.getOwnPropertySymbols ? d.concat(Object.getOwnPropertySymbols(u)) : d;
  }, o.prototype.listeners = function(d) {
    var u = n ? n + d : d, l = this._events[u];
    if (!l) return [];
    if (l.fn) return [l.fn];
    for (var f = 0, h = l.length, _ = new Array(h); f < h; f++)
      _[f] = l[f].fn;
    return _;
  }, o.prototype.listenerCount = function(d) {
    var u = n ? n + d : d, l = this._events[u];
    return l ? l.fn ? 1 : l.length : 0;
  }, o.prototype.emit = function(d, u, l, f, h, _) {
    var k = n ? n + d : d;
    if (!this._events[k]) return !1;
    var p = this._events[k], g = arguments.length, m, w;
    if (p.fn) {
      switch (p.once && this.removeListener(d, p.fn, void 0, !0), g) {
        case 1:
          return p.fn.call(p.context), !0;
        case 2:
          return p.fn.call(p.context, u), !0;
        case 3:
          return p.fn.call(p.context, u, l), !0;
        case 4:
          return p.fn.call(p.context, u, l, f), !0;
        case 5:
          return p.fn.call(p.context, u, l, f, h), !0;
        case 6:
          return p.fn.call(p.context, u, l, f, h, _), !0;
      }
      for (w = 1, m = new Array(g - 1); w < g; w++)
        m[w - 1] = arguments[w];
      p.fn.apply(p.context, m);
    } else {
      var P = p.length, R;
      for (w = 0; w < P; w++)
        switch (p[w].once && this.removeListener(d, p[w].fn, void 0, !0), g) {
          case 1:
            p[w].fn.call(p[w].context);
            break;
          case 2:
            p[w].fn.call(p[w].context, u);
            break;
          case 3:
            p[w].fn.call(p[w].context, u, l);
            break;
          case 4:
            p[w].fn.call(p[w].context, u, l, f);
            break;
          default:
            if (!m) for (R = 1, m = new Array(g - 1); R < g; R++)
              m[R - 1] = arguments[R];
            p[w].fn.apply(p[w].context, m);
        }
    }
    return !0;
  }, o.prototype.on = function(d, u, l) {
    return r(this, d, u, l, !1);
  }, o.prototype.once = function(d, u, l) {
    return r(this, d, u, l, !0);
  }, o.prototype.removeListener = function(d, u, l, f) {
    var h = n ? n + d : d;
    if (!this._events[h]) return this;
    if (!u)
      return a(this, h), this;
    var _ = this._events[h];
    if (_.fn)
      _.fn === u && (!f || _.once) && (!l || _.context === l) && a(this, h);
    else {
      for (var k = 0, p = [], g = _.length; k < g; k++)
        (_[k].fn !== u || f && !_[k].once || l && _[k].context !== l) && p.push(_[k]);
      p.length ? this._events[h] = p.length === 1 ? p[0] : p : a(this, h);
    }
    return this;
  }, o.prototype.removeAllListeners = function(d) {
    var u;
    return d ? (u = n ? n + d : d, this._events[u] && a(this, u)) : (this._events = new s(), this._eventsCount = 0), this;
  }, o.prototype.off = o.prototype.removeListener, o.prototype.addListener = o.prototype.on, o.prefixed = n, o.EventEmitter = o, t.exports = o;
})(_n);
var Zs = _n.exports;
const Xs = /* @__PURE__ */ Et(Zs);
class ei extends Xs {
}
var ti = function(t, e) {
  var n = {};
  for (var s in t) Object.prototype.hasOwnProperty.call(t, s) && e.indexOf(s) < 0 && (n[s] = t[s]);
  if (t != null && typeof Object.getOwnPropertySymbols == "function")
    for (var i = 0, s = Object.getOwnPropertySymbols(t); i < s.length; i++)
      e.indexOf(s[i]) < 0 && Object.prototype.propertyIsEnumerable.call(t, s[i]) && (n[s[i]] = t[s[i]]);
  return n;
};
class ni extends ei {
  constructor(e) {
    var { metadata: n } = e, s = e.preference, { keysUrl: i } = s, r = ti(s, ["keysUrl"]);
    super(), this.signer = null, this.isCoinbaseWallet = !0, this.metadata = n, this.preference = r, this.communicator = new Js({
      url: i,
      metadata: n,
      preference: r
    });
    const a = js();
    a && (this.signer = this.initSigner(a));
  }
  async request(e) {
    try {
      if (qn(e), !this.signer)
        switch (e.method) {
          case "eth_requestAccounts": {
            const n = await this.requestSignerSelection(e), s = this.initSigner(n);
            await s.handshake(e), this.signer = s, Us(n);
            break;
          }
          case "wallet_sendCalls": {
            const n = this.initSigner("scw");
            await n.handshake({ method: "handshake" });
            const s = await n.request(e);
            return await n.cleanup(), s;
          }
          case "wallet_getCallsStatus":
            return Be(e, Ds);
          case "net_version":
            return 1;
          case "eth_chainId":
            return B(1);
          default:
            throw y.provider.unauthorized("Must call 'eth_requestAccounts' before other methods");
        }
      return await this.signer.request(e);
    } catch (n) {
      const { code: s } = n;
      return s === E.provider.unauthorized && this.disconnect(), Promise.reject(Vs(n));
    }
  }
  /** @deprecated Use `.request({ method: 'eth_requestAccounts' })` instead. */
  async enable() {
    return console.warn('.enable() has been deprecated. Please use .request({ method: "eth_requestAccounts" }) instead.'), await this.request({
      method: "eth_requestAccounts"
    });
  }
  async disconnect() {
    var e;
    await ((e = this.signer) === null || e === void 0 ? void 0 : e.cleanup()), this.signer = null, D.clearAll(), this.emit("disconnect", y.provider.disconnected("User initiated disconnection"));
  }
  requestSignerSelection(e) {
    return Ws({
      communicator: this.communicator,
      preference: this.preference,
      metadata: this.metadata,
      handshakeRequest: e,
      callback: this.emit.bind(this)
    });
  }
  initSigner(e) {
    return qs({
      signerType: e,
      metadata: this.metadata,
      communicator: this.communicator,
      callback: this.emit.bind(this)
    });
  }
}
function si(t) {
  if (t) {
    if (!["all", "smartWalletOnly", "eoaOnly"].includes(t.options))
      throw new Error(`Invalid options: ${t.options}`);
    if (t.attribution && t.attribution.auto !== void 0 && t.attribution.dataSuffix !== void 0)
      throw new Error("Attribution cannot contain both auto and dataSuffix properties");
  }
}
function ii(t) {
  var e;
  const n = {
    metadata: t.metadata,
    preference: t.preference
  };
  return (e = Wn(n)) !== null && e !== void 0 ? e : new ni(n);
}
const ri = {
  options: "all"
};
function ci(t) {
  var e;
  new D("CBWSDK").setItem("VERSION", re), Hs();
  const s = {
    metadata: {
      appName: t.appName || "Dapp",
      appLogoUrl: t.appLogoUrl || "",
      appChainIds: t.appChainIds || []
    },
    preference: Object.assign(ri, (e = t.preference) !== null && e !== void 0 ? e : {})
  };
  si(s.preference);
  let i = null;
  return {
    getProvider: () => (i || (i = ii(s)), i)
  };
}
export {
  ci as createCoinbaseWalletSDK
};
