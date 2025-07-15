import { q as f, r as a, x as m } from "./umd-DIrkvCx7.mjs";
import { c as d } from "./if-defined-BeJkmk4s.mjs";
import "./index-D2Q_VGny.mjs";
const u = f`
  :host > wui-flex:first-child {
    height: 500px;
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: none;
  }

  :host > wui-flex:first-child::-webkit-scrollbar {
    display: none;
  }
`;
var w = function(n, t, i, o) {
  var r = arguments.length, e = r < 3 ? t : o === null ? o = Object.getOwnPropertyDescriptor(t, i) : o, l;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") e = Reflect.decorate(n, t, i, o);
  else for (var s = n.length - 1; s >= 0; s--) (l = n[s]) && (e = (r < 3 ? l(e) : r > 3 ? l(t, i, e) : l(t, i)) || e);
  return r > 3 && e && Object.defineProperty(t, i, e), e;
};
let c = class extends a {
  render() {
    return m`
      <wui-flex flexDirection="column" .padding=${["0", "m", "m", "m"]} gap="s">
        <w3m-activity-list page="activity"></w3m-activity-list>
      </wui-flex>
    `;
  }
};
c.styles = u;
c = w([
  d("w3m-transactions-view")
], c);
export {
  c as W3mTransactionsView
};
