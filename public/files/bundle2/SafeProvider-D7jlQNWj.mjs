import { g as v, e as H } from "./umd-Cchevry1.mjs";
import { e as C } from "./index-LCw1T0iy.mjs";
var S = {}, m = {};
const y = /* @__PURE__ */ v(C);
var f = {};
Object.defineProperty(f, "__esModule", { value: !0 });
f.numberToHex = f.getLowerCase = void 0;
function A(i) {
  return i && i.toLowerCase();
}
f.getLowerCase = A;
function I(i) {
  return `0x${i.toString(16)}`;
}
f.numberToHex = I;
Object.defineProperty(m, "__esModule", { value: !0 });
m.SafeAppProvider = void 0;
const l = y, P = H, n = f;
class E extends P.EventEmitter {
  constructor(r, d) {
    super(), this.submittedTxs = /* @__PURE__ */ new Map(), this.safe = r, this.sdk = d;
  }
  async connect() {
    this.emit("connect", { chainId: this.chainId });
  }
  async disconnect() {
  }
  get chainId() {
    return this.safe.chainId;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async request(r) {
    var w, T, _, b;
    const { method: d, params: e = [] } = r;
    switch (d) {
      case "eth_accounts":
        return [this.safe.safeAddress];
      case "net_version":
      case "eth_chainId":
        return (0, n.numberToHex)(this.chainId);
      case "personal_sign": {
        const [t, s] = e;
        if (this.safe.safeAddress.toLowerCase() !== s.toLowerCase())
          throw new Error("The address or message hash is invalid");
        const a = await this.sdk.txs.signMessage(t);
        return ("signature" in a ? a.signature : void 0) || "0x";
      }
      case "eth_sign": {
        const [t, s] = e;
        if (this.safe.safeAddress.toLowerCase() !== t.toLowerCase() || !s.startsWith("0x"))
          throw new Error("The address or message hash is invalid");
        const a = await this.sdk.txs.signMessage(s);
        return ("signature" in a ? a.signature : void 0) || "0x";
      }
      case "eth_signTypedData":
      case "eth_signTypedData_v4": {
        const [t, s] = e, a = typeof s == "string" ? JSON.parse(s) : s;
        if (this.safe.safeAddress.toLowerCase() !== t.toLowerCase())
          throw new Error("The address is invalid");
        const o = await this.sdk.txs.signTypedMessage(a);
        return ("signature" in o ? o.signature : void 0) || "0x";
      }
      case "eth_sendTransaction":
        const h = {
          ...e[0],
          value: e[0].value || "0",
          data: e[0].data || "0x"
        };
        typeof h.gas == "string" && h.gas.startsWith("0x") && (h.gas = parseInt(h.gas, 16));
        const p = await this.sdk.txs.send({
          txs: [h],
          params: { safeTxGas: h.gas }
        });
        return this.submittedTxs.set(p.safeTxHash, {
          from: this.safe.safeAddress,
          hash: p.safeTxHash,
          gas: 0,
          gasPrice: "0x00",
          nonce: 0,
          input: h.data,
          value: h.value,
          to: h.to,
          blockHash: null,
          blockNumber: null,
          transactionIndex: null
        }), p.safeTxHash;
      case "eth_blockNumber":
        return (await this.sdk.eth.getBlockByNumber(["latest"])).number;
      case "eth_getBalance":
        return this.sdk.eth.getBalance([(0, n.getLowerCase)(e[0]), e[1]]);
      case "eth_getCode":
        return this.sdk.eth.getCode([(0, n.getLowerCase)(e[0]), e[1]]);
      case "eth_getTransactionCount":
        return this.sdk.eth.getTransactionCount([(0, n.getLowerCase)(e[0]), e[1]]);
      case "eth_getStorageAt":
        return this.sdk.eth.getStorageAt([(0, n.getLowerCase)(e[0]), e[1], e[2]]);
      case "eth_getBlockByNumber":
        return this.sdk.eth.getBlockByNumber([e[0], e[1]]);
      case "eth_getBlockByHash":
        return this.sdk.eth.getBlockByHash([e[0], e[1]]);
      case "eth_getTransactionByHash":
        let u = e[0];
        try {
          u = (await this.sdk.txs.getBySafeTxHash(u)).txHash || u;
        } catch {
        }
        return this.submittedTxs.has(u) ? this.submittedTxs.get(u) : this.sdk.eth.getTransactionByHash([u]).then((t) => (t && (t.hash = e[0]), t));
      case "eth_getTransactionReceipt": {
        let t = e[0];
        try {
          t = (await this.sdk.txs.getBySafeTxHash(t)).txHash || t;
        } catch {
        }
        return this.sdk.eth.getTransactionReceipt([t]).then((s) => (s && (s.transactionHash = e[0]), s));
      }
      case "eth_estimateGas":
        return this.sdk.eth.getEstimateGas(e[0]);
      case "eth_call":
        return this.sdk.eth.call([e[0], e[1]]);
      case "eth_getLogs":
        return this.sdk.eth.getPastLogs([e[0]]);
      case "eth_gasPrice":
        return this.sdk.eth.getGasPrice();
      case "wallet_getPermissions":
        return this.sdk.wallet.getPermissions();
      case "wallet_requestPermissions":
        return this.sdk.wallet.requestPermissions(e[0]);
      case "safe_setSettings":
        return this.sdk.eth.setSafeSettings([e[0]]);
      case "wallet_sendCalls": {
        const { from: t, calls: s, chainId: a } = e[0];
        if (a !== (0, n.numberToHex)(this.chainId))
          throw new Error(`Safe is not on chain ${a}`);
        if (t !== this.safe.safeAddress)
          throw Error("Invalid from address");
        const o = s.map((g, x) => {
          if (!g.to)
            throw new Error(`Invalid call #${x}: missing "to" field`);
          return {
            to: g.to,
            data: g.data ?? "0x",
            value: g.value ?? (0, n.numberToHex)(0)
          };
        }), { safeTxHash: c } = await this.sdk.txs.send({ txs: o });
        return {
          id: c
        };
      }
      case "wallet_getCallsStatus": {
        const t = e[0], s = {
          [l.TransactionStatus.AWAITING_CONFIRMATIONS]: 100,
          [l.TransactionStatus.AWAITING_EXECUTION]: 100,
          [l.TransactionStatus.SUCCESS]: 200,
          [l.TransactionStatus.CANCELLED]: 400,
          [l.TransactionStatus.FAILED]: 500
        }, a = await this.sdk.txs.getBySafeTxHash(t), o = {
          version: "1.0",
          id: t,
          chainId: (0, n.numberToHex)(this.chainId),
          status: s[a.txStatus]
        };
        if (!a.txHash)
          return o;
        const c = await this.sdk.eth.getTransactionReceipt([a.txHash]);
        if (!c)
          return o;
        const k = ((T = (w = a.txData) == null ? void 0 : w.dataDecoded) == null ? void 0 : T.method) !== "multiSend" ? 1 : (
          // Number of batched transactions
          ((b = (_ = a.txData.dataDecoded.parameters) == null ? void 0 : _[0].valueDecoded) == null ? void 0 : b.length) ?? 1
        ), g = Number(c.blockNumber), x = Number(c.gasUsed);
        return o.receipts = Array(k).fill({
          logs: c.logs,
          status: (0, n.numberToHex)(a.txStatus === l.TransactionStatus.SUCCESS ? 1 : 0),
          blockHash: c.blockHash,
          blockNumber: (0, n.numberToHex)(g),
          gasUsed: (0, n.numberToHex)(x),
          transactionHash: a.txHash
        }), o;
      }
      case "wallet_showCallsStatus":
        throw new Error(`"${r.method}" not supported`);
      case "wallet_getCapabilities":
        return {
          [(0, n.numberToHex)(this.chainId)]: {
            atomicBatch: {
              supported: !0
            }
          }
        };
      default:
        throw Error(`"${r.method}" not implemented`);
    }
  }
  // this method is needed for ethers v4
  // https://github.com/ethers-io/ethers.js/blob/427e16826eb15d52d25c4f01027f8db22b74b76c/src.ts/providers/web3-provider.ts#L41-L55
  send(r, d) {
    r || d("Undefined request"), this.request(r).then((e) => d(null, { jsonrpc: "2.0", id: r.id, result: e })).catch((e) => d(e, null));
  }
}
m.SafeAppProvider = E;
(function(i) {
  Object.defineProperty(i, "__esModule", { value: !0 }), i.SafeAppProvider = void 0;
  var r = m;
  Object.defineProperty(i, "SafeAppProvider", { enumerable: !0, get: function() {
    return r.SafeAppProvider;
  } });
})(S);
class D extends S.SafeAppProvider {
  request(r) {
    return r.method === "eth_requestAccounts" ? this.request({
      method: "eth_accounts",
      params: []
    }) : super.request(r);
  }
}
export {
  D as SafeProvider
};
