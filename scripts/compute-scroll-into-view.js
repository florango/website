let e = e => "object" == typeof e && null != e && 1 === e.nodeType, t = (e, t) => (!t || "hidden" !== e) && ("visible" !== e && "clip" !== e), n = (e, n) => { if (e.clientHeight < e.scrollHeight || e.clientWidth < e.scrollWidth) { let l = getComputedStyle(e, null); return t(l.overflowY, n) || t(l.overflowX, n) || (e => { let t = (e => { if (!e.ownerDocument || !e.ownerDocument.defaultView) return null; try { return e.ownerDocument.defaultView.frameElement } catch (e) { return null } })(e); return !!t && (t.clientHeight < e.scrollHeight || t.clientWidth < e.scrollWidth) })(e) } return !1 }, l = (e, t, n, l, i, o, r, d) => o < e && r > t || o > e && r < t ? 0 : o <= e && d <= n || r >= t && d >= n ? o - e - l : r > t && d < n || o < e && d > n ? r - t + i : 0, i = e => { let t = e.parentElement; return null == t ? e.getRootNode().host || null : t }; var o = (t, o) => { var r, d, h, f, u, s; if ("undefined" == typeof document) return []; let { scrollMode: a, block: c, inline: g, boundary: m, skipOverflowHiddenElements: p } = o, w = "function" == typeof m ? m : e => e !== m; if (!e(t)) throw new TypeError("Invalid target"); let W = document.scrollingElement || document.documentElement, H = [], b = t; for (; e(b) && w(b);) { if (b = i(b), b === W) { H.push(b); break } null != b && b === document.body && n(b) && !n(document.documentElement) || null != b && n(b, p) && H.push(b) } let v = null != (d = null == (r = window.visualViewport) ? void 0 : r.width) ? d : innerWidth, y = null != (f = null == (h = window.visualViewport) ? void 0 : h.height) ? f : innerHeight, E = null != (u = window.scrollX) ? u : pageXOffset, M = null != (s = window.scrollY) ? s : pageYOffset, { height: x, width: I, top: C, right: R, bottom: T, left: V } = t.getBoundingClientRect(), k = "start" === c || "nearest" === c ? C : "end" === c ? T : C + x / 2, B = "center" === g ? V + I / 2 : "end" === g ? R : V, D = []; for (let e = 0; e < H.length; e++) { let t = H[e], { height: n, width: i, top: o, right: r, bottom: d, left: h } = t.getBoundingClientRect(); if ("if-needed" === a && C >= 0 && V >= 0 && T <= y && R <= v && C >= o && T <= d && V >= h && R <= r) return D; let f = getComputedStyle(t), u = parseInt(f.borderLeftWidth, 10), s = parseInt(f.borderTopWidth, 10), m = parseInt(f.borderRightWidth, 10), p = parseInt(f.borderBottomWidth, 10), w = 0, b = 0, O = "offsetWidth" in t ? t.offsetWidth - t.clientWidth - u - m : 0, X = "offsetHeight" in t ? t.offsetHeight - t.clientHeight - s - p : 0, Y = "offsetWidth" in t ? 0 === t.offsetWidth ? 0 : i / t.offsetWidth : 0, L = "offsetHeight" in t ? 0 === t.offsetHeight ? 0 : n / t.offsetHeight : 0; if (W === t) w = "start" === c ? k : "end" === c ? k - y : "nearest" === c ? l(M, M + y, y, s, p, M + k, M + k + x, x) : k - y / 2, b = "start" === g ? B : "center" === g ? B - v / 2 : "end" === g ? B - v : l(E, E + v, v, u, m, E + B, E + B + I, I), w = Math.max(0, w + M), b = Math.max(0, b + E); else { w = "start" === c ? k - o - s : "end" === c ? k - d + p + X : "nearest" === c ? l(o, d, n, s, p + X, k, k + x, x) : k - (o + n / 2) + X / 2, b = "start" === g ? B - h - u : "center" === g ? B - (h + i / 2) + O / 2 : "end" === g ? B - r + m + O : l(h, r, i, u, m + O, B, B + I, I); let { scrollLeft: e, scrollTop: f } = t; w = Math.max(0, Math.min(f + w / L, t.scrollHeight - n / L + X)), b = Math.max(0, Math.min(e + b / Y, t.scrollWidth - i / Y + O)), k += f - w, B += e - b } D.push({ el: t, top: w, left: b }) } return D }; export { o as default };