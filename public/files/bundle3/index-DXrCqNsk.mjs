import { q as d, w as v, r as g, x as h } from "./umd-DIrkvCx7.mjs";
import { n as l, c as w } from "./if-defined-BeJkmk4s.mjs";
const p = d`
  :host {
    display: flex;
    justify-content: center;
    align-items: center;
    height: var(--wui-spacing-m);
    padding: 0 var(--wui-spacing-3xs) !important;
    border-radius: var(--wui-border-radius-5xs);
    transition:
      border-radius var(--wui-duration-lg) var(--wui-ease-out-power-1),
      background-color var(--wui-duration-lg) var(--wui-ease-out-power-1);
    will-change: border-radius, background-color;
  }

  :host > wui-text {
    transform: translateY(5%);
  }

  :host([data-variant='main']) {
    background-color: var(--wui-color-accent-glass-015);
    color: var(--wui-color-accent-100);
  }

  :host([data-variant='shade']) {
    background-color: var(--wui-color-gray-glass-010);
    color: var(--wui-color-fg-200);
  }

  :host([data-variant='success']) {
    background-color: var(--wui-icon-box-bg-success-100);
    color: var(--wui-color-success-100);
  }

  :host([data-variant='error']) {
    background-color: var(--wui-icon-box-bg-error-100);
    color: var(--wui-color-error-100);
  }

  :host([data-size='lg']) {
    padding: 11px 5px !important;
  }

  :host([data-size='lg']) > wui-text {
    transform: translateY(2%);
  }

  :host([data-size='xs']) {
    height: var(--wui-spacing-2l);
    padding: 0 var(--wui-spacing-3xs) !important;
  }

  :host([data-size='xs']) > wui-text {
    transform: translateY(2%);
  }
`;
var u = function(o, t, a, s) {
  var e = arguments.length, r = e < 3 ? t : s === null ? s = Object.getOwnPropertyDescriptor(t, a) : s, n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") r = Reflect.decorate(o, t, a, s);
  else for (var c = o.length - 1; c >= 0; c--) (n = o[c]) && (r = (e < 3 ? n(r) : e > 3 ? n(t, a, r) : n(t, a)) || r);
  return e > 3 && r && Object.defineProperty(t, a, r), r;
};
let i = class extends g {
  constructor() {
    super(...arguments), this.variant = "main", this.size = "lg";
  }
  render() {
    this.dataset.variant = this.variant, this.dataset.size = this.size;
    const t = this.size === "md" || this.size === "xs" ? "mini-700" : "micro-700";
    return h`
      <wui-text data-variant=${this.variant} variant=${t} color="inherit">
        <slot></slot>
      </wui-text>
    `;
  }
};
i.styles = [v, p];
u([
  l()
], i.prototype, "variant", void 0);
u([
  l()
], i.prototype, "size", void 0);
i = u([
  w("wui-tag")
], i);
