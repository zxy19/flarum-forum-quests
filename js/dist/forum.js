/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/dayjs/dayjs.min.js":
/*!*****************************************!*\
  !*** ./node_modules/dayjs/dayjs.min.js ***!
  \*****************************************/
/***/ (function(module) {

!function (t, e) {
   true ? module.exports = e() : 0;
}(this, function () {
  "use strict";

  var t = 1e3,
    e = 6e4,
    n = 36e5,
    r = "millisecond",
    i = "second",
    s = "minute",
    u = "hour",
    a = "day",
    o = "week",
    c = "month",
    f = "quarter",
    h = "year",
    d = "date",
    l = "Invalid Date",
    $ = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,
    y = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,
    M = {
      name: "en",
      weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
      months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
      ordinal: function ordinal(t) {
        var e = ["th", "st", "nd", "rd"],
          n = t % 100;
        return "[" + t + (e[(n - 20) % 10] || e[n] || e[0]) + "]";
      }
    },
    m = function m(t, e, n) {
      var r = String(t);
      return !r || r.length >= e ? t : "" + Array(e + 1 - r.length).join(n) + t;
    },
    v = {
      s: m,
      z: function z(t) {
        var e = -t.utcOffset(),
          n = Math.abs(e),
          r = Math.floor(n / 60),
          i = n % 60;
        return (e <= 0 ? "+" : "-") + m(r, 2, "0") + ":" + m(i, 2, "0");
      },
      m: function t(e, n) {
        if (e.date() < n.date()) return -t(n, e);
        var r = 12 * (n.year() - e.year()) + (n.month() - e.month()),
          i = e.clone().add(r, c),
          s = n - i < 0,
          u = e.clone().add(r + (s ? -1 : 1), c);
        return +(-(r + (n - i) / (s ? i - u : u - i)) || 0);
      },
      a: function a(t) {
        return t < 0 ? Math.ceil(t) || 0 : Math.floor(t);
      },
      p: function p(t) {
        return {
          M: c,
          y: h,
          w: o,
          d: a,
          D: d,
          h: u,
          m: s,
          s: i,
          ms: r,
          Q: f
        }[t] || String(t || "").toLowerCase().replace(/s$/, "");
      },
      u: function u(t) {
        return void 0 === t;
      }
    },
    g = "en",
    D = {};
  D[g] = M;
  var p = "$isDayjsObject",
    S = function S(t) {
      return t instanceof _ || !(!t || !t[p]);
    },
    w = function t(e, n, r) {
      var i;
      if (!e) return g;
      if ("string" == typeof e) {
        var s = e.toLowerCase();
        D[s] && (i = s), n && (D[s] = n, i = s);
        var u = e.split("-");
        if (!i && u.length > 1) return t(u[0]);
      } else {
        var a = e.name;
        D[a] = e, i = a;
      }
      return !r && i && (g = i), i || !r && g;
    },
    O = function O(t, e) {
      if (S(t)) return t.clone();
      var n = "object" == typeof e ? e : {};
      return n.date = t, n.args = arguments, new _(n);
    },
    b = v;
  b.l = w, b.i = S, b.w = function (t, e) {
    return O(t, {
      locale: e.$L,
      utc: e.$u,
      x: e.$x,
      $offset: e.$offset
    });
  };
  var _ = function () {
      function M(t) {
        this.$L = w(t.locale, null, !0), this.parse(t), this.$x = this.$x || t.x || {}, this[p] = !0;
      }
      var m = M.prototype;
      return m.parse = function (t) {
        this.$d = function (t) {
          var e = t.date,
            n = t.utc;
          if (null === e) return new Date(NaN);
          if (b.u(e)) return new Date();
          if (e instanceof Date) return new Date(e);
          if ("string" == typeof e && !/Z$/i.test(e)) {
            var r = e.match($);
            if (r) {
              var i = r[2] - 1 || 0,
                s = (r[7] || "0").substring(0, 3);
              return n ? new Date(Date.UTC(r[1], i, r[3] || 1, r[4] || 0, r[5] || 0, r[6] || 0, s)) : new Date(r[1], i, r[3] || 1, r[4] || 0, r[5] || 0, r[6] || 0, s);
            }
          }
          return new Date(e);
        }(t), this.init();
      }, m.init = function () {
        var t = this.$d;
        this.$y = t.getFullYear(), this.$M = t.getMonth(), this.$D = t.getDate(), this.$W = t.getDay(), this.$H = t.getHours(), this.$m = t.getMinutes(), this.$s = t.getSeconds(), this.$ms = t.getMilliseconds();
      }, m.$utils = function () {
        return b;
      }, m.isValid = function () {
        return !(this.$d.toString() === l);
      }, m.isSame = function (t, e) {
        var n = O(t);
        return this.startOf(e) <= n && n <= this.endOf(e);
      }, m.isAfter = function (t, e) {
        return O(t) < this.startOf(e);
      }, m.isBefore = function (t, e) {
        return this.endOf(e) < O(t);
      }, m.$g = function (t, e, n) {
        return b.u(t) ? this[e] : this.set(n, t);
      }, m.unix = function () {
        return Math.floor(this.valueOf() / 1e3);
      }, m.valueOf = function () {
        return this.$d.getTime();
      }, m.startOf = function (t, e) {
        var n = this,
          r = !!b.u(e) || e,
          f = b.p(t),
          l = function l(t, e) {
            var i = b.w(n.$u ? Date.UTC(n.$y, e, t) : new Date(n.$y, e, t), n);
            return r ? i : i.endOf(a);
          },
          $ = function $(t, e) {
            return b.w(n.toDate()[t].apply(n.toDate("s"), (r ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(e)), n);
          },
          y = this.$W,
          M = this.$M,
          m = this.$D,
          v = "set" + (this.$u ? "UTC" : "");
        switch (f) {
          case h:
            return r ? l(1, 0) : l(31, 11);
          case c:
            return r ? l(1, M) : l(0, M + 1);
          case o:
            var g = this.$locale().weekStart || 0,
              D = (y < g ? y + 7 : y) - g;
            return l(r ? m - D : m + (6 - D), M);
          case a:
          case d:
            return $(v + "Hours", 0);
          case u:
            return $(v + "Minutes", 1);
          case s:
            return $(v + "Seconds", 2);
          case i:
            return $(v + "Milliseconds", 3);
          default:
            return this.clone();
        }
      }, m.endOf = function (t) {
        return this.startOf(t, !1);
      }, m.$set = function (t, e) {
        var n,
          o = b.p(t),
          f = "set" + (this.$u ? "UTC" : ""),
          l = (n = {}, n[a] = f + "Date", n[d] = f + "Date", n[c] = f + "Month", n[h] = f + "FullYear", n[u] = f + "Hours", n[s] = f + "Minutes", n[i] = f + "Seconds", n[r] = f + "Milliseconds", n)[o],
          $ = o === a ? this.$D + (e - this.$W) : e;
        if (o === c || o === h) {
          var y = this.clone().set(d, 1);
          y.$d[l]($), y.init(), this.$d = y.set(d, Math.min(this.$D, y.daysInMonth())).$d;
        } else l && this.$d[l]($);
        return this.init(), this;
      }, m.set = function (t, e) {
        return this.clone().$set(t, e);
      }, m.get = function (t) {
        return this[b.p(t)]();
      }, m.add = function (r, f) {
        var d,
          l = this;
        r = Number(r);
        var $ = b.p(f),
          y = function y(t) {
            var e = O(l);
            return b.w(e.date(e.date() + Math.round(t * r)), l);
          };
        if ($ === c) return this.set(c, this.$M + r);
        if ($ === h) return this.set(h, this.$y + r);
        if ($ === a) return y(1);
        if ($ === o) return y(7);
        var M = (d = {}, d[s] = e, d[u] = n, d[i] = t, d)[$] || 1,
          m = this.$d.getTime() + r * M;
        return b.w(m, this);
      }, m.subtract = function (t, e) {
        return this.add(-1 * t, e);
      }, m.format = function (t) {
        var e = this,
          n = this.$locale();
        if (!this.isValid()) return n.invalidDate || l;
        var r = t || "YYYY-MM-DDTHH:mm:ssZ",
          i = b.z(this),
          s = this.$H,
          u = this.$m,
          a = this.$M,
          o = n.weekdays,
          c = n.months,
          f = n.meridiem,
          h = function h(t, n, i, s) {
            return t && (t[n] || t(e, r)) || i[n].slice(0, s);
          },
          d = function d(t) {
            return b.s(s % 12 || 12, t, "0");
          },
          $ = f || function (t, e, n) {
            var r = t < 12 ? "AM" : "PM";
            return n ? r.toLowerCase() : r;
          };
        return r.replace(y, function (t, r) {
          return r || function (t) {
            switch (t) {
              case "YY":
                return String(e.$y).slice(-2);
              case "YYYY":
                return b.s(e.$y, 4, "0");
              case "M":
                return a + 1;
              case "MM":
                return b.s(a + 1, 2, "0");
              case "MMM":
                return h(n.monthsShort, a, c, 3);
              case "MMMM":
                return h(c, a);
              case "D":
                return e.$D;
              case "DD":
                return b.s(e.$D, 2, "0");
              case "d":
                return String(e.$W);
              case "dd":
                return h(n.weekdaysMin, e.$W, o, 2);
              case "ddd":
                return h(n.weekdaysShort, e.$W, o, 3);
              case "dddd":
                return o[e.$W];
              case "H":
                return String(s);
              case "HH":
                return b.s(s, 2, "0");
              case "h":
                return d(1);
              case "hh":
                return d(2);
              case "a":
                return $(s, u, !0);
              case "A":
                return $(s, u, !1);
              case "m":
                return String(u);
              case "mm":
                return b.s(u, 2, "0");
              case "s":
                return String(e.$s);
              case "ss":
                return b.s(e.$s, 2, "0");
              case "SSS":
                return b.s(e.$ms, 3, "0");
              case "Z":
                return i;
            }
            return null;
          }(t) || i.replace(":", "");
        });
      }, m.utcOffset = function () {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, m.diff = function (r, d, l) {
        var $,
          y = this,
          M = b.p(d),
          m = O(r),
          v = (m.utcOffset() - this.utcOffset()) * e,
          g = this - m,
          D = function D() {
            return b.m(y, m);
          };
        switch (M) {
          case h:
            $ = D() / 12;
            break;
          case c:
            $ = D();
            break;
          case f:
            $ = D() / 3;
            break;
          case o:
            $ = (g - v) / 6048e5;
            break;
          case a:
            $ = (g - v) / 864e5;
            break;
          case u:
            $ = g / n;
            break;
          case s:
            $ = g / e;
            break;
          case i:
            $ = g / t;
            break;
          default:
            $ = g;
        }
        return l ? $ : b.a($);
      }, m.daysInMonth = function () {
        return this.endOf(c).$D;
      }, m.$locale = function () {
        return D[this.$L];
      }, m.locale = function (t, e) {
        if (!t) return this.$L;
        var n = this.clone(),
          r = w(t, e, !0);
        return r && (n.$L = r), n;
      }, m.clone = function () {
        return b.w(this.$d, this);
      }, m.toDate = function () {
        return new Date(this.valueOf());
      }, m.toJSON = function () {
        return this.isValid() ? this.toISOString() : null;
      }, m.toISOString = function () {
        return this.$d.toISOString();
      }, m.toString = function () {
        return this.$d.toUTCString();
      }, M;
    }(),
    k = _.prototype;
  return O.prototype = k, [["$ms", r], ["$s", i], ["$m", s], ["$H", u], ["$W", a], ["$M", c], ["$y", h], ["$D", d]].forEach(function (t) {
    k[t[1]] = function (e) {
      return this.$g(e, t[0], t[1]);
    };
  }), O.extend = function (t, e) {
    return t.$i || (t(e, _, O), t.$i = !0), O;
  }, O.locale = w, O.isDayjs = S, O.unix = function (t) {
    return O(1e3 * t);
  }, O.en = D[g], O.Ls = D, O.p = {}, O;
});

/***/ }),

/***/ "./src/common/components/commonSelectionModal.tsx":
/*!********************************************************!*\
  !*** ./src/common/components/commonSelectionModal.tsx ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ commonSelectionModal)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_common_components_Modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/common/components/Modal */ "flarum/common/components/Modal");
/* harmony import */ var flarum_common_components_Modal__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Modal__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/common/components/Button */ "flarum/common/components/Button");
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var flarum_common_components_Select__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! flarum/common/components/Select */ "flarum/common/components/Select");
/* harmony import */ var flarum_common_components_Select__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Select__WEBPACK_IMPORTED_MODULE_5__);






var commonSelectionModal = /*#__PURE__*/function (_Modal) {
  function commonSelectionModal() {
    var _this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _Modal.call.apply(_Modal, [this].concat(args)) || this;
    _this.selection = "";
    _this.done = false;
    return _this;
  }
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(commonSelectionModal, _Modal);
  var _proto = commonSelectionModal.prototype;
  _proto.oninit = function oninit(vnode) {
    _Modal.prototype.oninit.call(this, vnode);
    this.selection = this.attrs.items[Object.keys(this.attrs.items)[0]];
  };
  _proto.className = function className() {
    return 'Modal';
  };
  _proto.title = function title() {
    return this.attrs.title;
  };
  _proto.oncreate = function oncreate(vnode) {
    _Modal.prototype.oncreate.call(this, vnode);
  };
  _proto.onremove = function onremove(vnode) {
    _Modal.prototype.onremove.call(this, vnode);
    if (!this.done) this.attrs.cancel();
  };
  _proto.content = function content() {
    var _this2 = this;
    var that = this;
    return m("div", {
      className: "Modal-body"
    }, m("div", {
      className: "Form"
    }, m("div", {
      className: "Form-group"
    }, m((flarum_common_components_Select__WEBPACK_IMPORTED_MODULE_5___default()), {
      className: "FormControl",
      value: this.selection,
      options: this.attrs.items,
      onchange: function (name) {
        _this2.selection = name;
      }.bind(this)
    })), m("div", {
      className: "Form-group"
    }, m((flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_4___default()), {
      "class": "Button Button--primary",
      type: "submit",
      loading: this.loading
    }, this.attrs.button))));
  };
  _proto.onsubmit = /*#__PURE__*/function () {
    var _onsubmit = (0,_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().mark(function _callee(e) {
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            e.preventDefault();
            this.done = true;
            this.attrs.callback(this.selection);
          case 3:
          case "end":
            return _context.stop();
        }
      }, _callee, this);
    }));
    function onsubmit(_x) {
      return _onsubmit.apply(this, arguments);
    }
    return onsubmit;
  }();
  commonSelectionModal.open = function open(app, items, title, button) {
    return new Promise(function (resolve, reject) {
      app.modal.show(commonSelectionModal, {
        items: items,
        title: title,
        button: button,
        cancel: function cancel() {
          reject();
        },
        callback: function callback(name) {
          resolve(name);
          app.modal.close();
        }
      }, true);
    });
  };
  return commonSelectionModal;
}((flarum_common_components_Modal__WEBPACK_IMPORTED_MODULE_3___default()));


/***/ }),

/***/ "./src/common/extend.ts":
/*!******************************!*\
  !*** ./src/common/extend.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var flarum_common_extenders__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/common/extenders */ "flarum/common/extenders");
/* harmony import */ var flarum_common_extenders__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_common_extenders__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _models_QuestInfo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./models/QuestInfo */ "./src/common/models/QuestInfo.ts");
/* harmony import */ var _models_QuestCondition__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./models/QuestCondition */ "./src/common/models/QuestCondition.ts");



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ([new (flarum_common_extenders__WEBPACK_IMPORTED_MODULE_0___default().Store)().add('quest-infos', _models_QuestInfo__WEBPACK_IMPORTED_MODULE_1__["default"]).add('quest-condition', _models_QuestCondition__WEBPACK_IMPORTED_MODULE_2__["default"])]);

/***/ }),

/***/ "./src/common/index.ts":
/*!*****************************!*\
  !*** ./src/common/index.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var flarum_common_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/common/app */ "flarum/common/app");
/* harmony import */ var flarum_common_app__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_common_app__WEBPACK_IMPORTED_MODULE_0__);

flarum_common_app__WEBPACK_IMPORTED_MODULE_0___default().initializers.add('xypp/forum-quests', function () {
  console.log('[xypp/forum-quests] Hello, forum and admin!');
});

/***/ }),

/***/ "./src/common/integration/index.ts":
/*!*****************************************!*\
  !*** ./src/common/integration/index.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   init: () => (/* binding */ init)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_AddFrontend__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/AddFrontend */ "./src/common/utils/AddFrontend.ts");
/* harmony import */ var _components_commonSelectionModal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/commonSelectionModal */ "./src/common/components/commonSelectionModal.tsx");




function init(app, fe) {
  var base = "xypp-forum-quests." + fe + ".integration";
  (0,_utils_AddFrontend__WEBPACK_IMPORTED_MODULE_2__.addCondition)("post_count", app.translator.trans(base + ".condition.post_count") + "");
  (0,_utils_AddFrontend__WEBPACK_IMPORTED_MODULE_2__.addCondition)("user_page_view", app.translator.trans(base + ".condition.user_page_view") + "");
  (0,_utils_AddFrontend__WEBPACK_IMPORTED_MODULE_2__.addCondition)("like_recv", app.translator.trans(base + ".condition.like_recv") + "");
  (0,_utils_AddFrontend__WEBPACK_IMPORTED_MODULE_2__.addCondition)("like_send", app.translator.trans(base + ".condition.like_send") + "");
  (0,_utils_AddFrontend__WEBPACK_IMPORTED_MODULE_2__.addCondition)("discussion_count", app.translator.trans(base + ".condition.discussion_count") + "");
  (0,_utils_AddFrontend__WEBPACK_IMPORTED_MODULE_2__.addCondition)("discussion_replied", app.translator.trans(base + ".condition.discussion_replied") + "");
  (0,_utils_AddFrontend__WEBPACK_IMPORTED_MODULE_2__.addCondition)("discussion_views", app.translator.trans(base + ".condition.discussion_views") + "");
  (0,_utils_AddFrontend__WEBPACK_IMPORTED_MODULE_2__.addCondition)("store_purchased", app.translator.trans(base + ".condition.store_purchased") + "");
  (0,_utils_AddFrontend__WEBPACK_IMPORTED_MODULE_2__.addCondition)("reloads", app.translator.trans(base + ".condition.reloads") + "");
  (0,_utils_AddFrontend__WEBPACK_IMPORTED_MODULE_2__.addCondition)("badge_received", app.translator.trans(base + ".condition.badge_received") + "");
  (0,_utils_AddFrontend__WEBPACK_IMPORTED_MODULE_2__.addReward)("money", app.translator.trans(base + ".reward.money") + "");
  addStoreItem(app, base);
  addBadge(app, base);
}
function addStoreItem(app, base) {
  var storeItemLoadingMap = {};
  (0,_utils_AddFrontend__WEBPACK_IMPORTED_MODULE_2__.addReward)("store_item", app.translator.trans(base + ".reward.store_item") + "");
  (0,_utils_AddFrontend__WEBPACK_IMPORTED_MODULE_2__.rewardValueConvert)("store_item", function (value) {
    var item = app.store.getById("store-item", value);
    if (!item) {
      if (storeItemLoadingMap[value] === undefined) {
        storeItemLoadingMap[value] = true;
        app.store.find("store-item", value).then(function () {
          m.redraw();
        })["catch"](function () {
          storeItemLoadingMap[value] = false;
        });
        return app.translator.trans(base + ".reward.store_item_loading") + "";
      } else if (storeItemLoadingMap[value] === false) {
        return app.translator.trans(base + ".reward.store_item_error") + "";
      } else {
        return app.translator.trans(base + ".reward.store_item_loading") + "";
      }
    }
    return item.attribute("name");
  });
  (0,_utils_AddFrontend__WEBPACK_IMPORTED_MODULE_2__.addRewardSelection)("store_item", /*#__PURE__*/(0,_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().mark(function _callee() {
    var items, itemsMap;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return app.store.find("store-item");
        case 2:
          items = _context.sent;
          itemsMap = items.reduce(function (map, item) {
            map[item.id()] = item.attribute("name");
            return map;
          }, {});
          _context.next = 6;
          return _components_commonSelectionModal__WEBPACK_IMPORTED_MODULE_3__["default"].open(app, itemsMap, app.translator.trans(base + ".reward.store_item_select"), app.translator.trans(base + ".reward.store_item_select_button"));
        case 6:
          return _context.abrupt("return", _context.sent);
        case 7:
        case "end":
          return _context.stop();
      }
    }, _callee);
  })));
}
function addBadge(app, base) {
  var badgeLoadingMap = {};
  (0,_utils_AddFrontend__WEBPACK_IMPORTED_MODULE_2__.addReward)("badge", app.translator.trans(base + ".reward.badge") + "");
  (0,_utils_AddFrontend__WEBPACK_IMPORTED_MODULE_2__.rewardValueConvert)("badge", function (value) {
    var item = app.store.getById("badges", value);
    if (!item) {
      if (badgeLoadingMap[value] === undefined) {
        badgeLoadingMap[value] = true;
        app.store.find("badges", value).then(function () {
          m.redraw();
        })["catch"](function () {
          badgeLoadingMap[value] = false;
        });
        return app.translator.trans(base + ".reward.badge_loading") + "";
      } else if (badgeLoadingMap[value] === false) {
        return app.translator.trans(base + ".reward.badge_error") + "";
      } else {
        return app.translator.trans(base + ".reward.badge_loading") + "";
      }
    }
    return item.attribute("name");
  });
  (0,_utils_AddFrontend__WEBPACK_IMPORTED_MODULE_2__.addRewardSelection)("badge", /*#__PURE__*/(0,_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().mark(function _callee2() {
    var items, itemsMap;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return app.store.find("badges");
        case 2:
          items = _context2.sent;
          itemsMap = items.reduce(function (map, item) {
            map[item.id()] = item.attribute("name");
            return map;
          }, {});
          _context2.next = 6;
          return _components_commonSelectionModal__WEBPACK_IMPORTED_MODULE_3__["default"].open(app, itemsMap, app.translator.trans(base + ".reward.badge_select"), app.translator.trans(base + ".reward.badge_select_button"));
        case 6:
          return _context2.abrupt("return", _context2.sent);
        case 7:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  })));
}

/***/ }),

/***/ "./src/common/models/QuestCondition.ts":
/*!*********************************************!*\
  !*** ./src/common/models/QuestCondition.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ QuestCondition)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_common_Model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/common/Model */ "flarum/common/Model");
/* harmony import */ var flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_common_Model__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! dayjs */ "./node_modules/dayjs/dayjs.min.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_2__);



// For more details about frontend models
// checkout https://docs.flarum.org/extend/models.html#frontend-models
function optionalJsonParser(data) {
  if (!data) {
    return null;
  }
  ;
  try {
    return JSON.parse(data);
  } catch (ignore) {
    return null;
  }
}
var QuestCondition = /*#__PURE__*/function (_Model) {
  function QuestCondition() {
    var _this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _Model.call.apply(_Model, [this].concat(args)) || this;
    _this.name = flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().attribute('name');
    _this.value = flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().attribute('value');
    _this.accumulation = flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().attribute('accumulation', optionalJsonParser);
    return _this;
  }
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(QuestCondition, _Model);
  var _proto = QuestCondition.prototype;
  _proto.getSpan = function getSpan(span) {
    var accumulation = this.accumulation();
    if (!accumulation || span < 1) return 0;
    var cut = dayjs__WEBPACK_IMPORTED_MODULE_2___default()(dayjs__WEBPACK_IMPORTED_MODULE_2___default()().format("YYYYMMDD"), "YYYYMMDD");
    if (span != 1) {
      cut = cut.subtract(span - 1, 'day');
    }
    var ret = 0;
    Object.keys(accumulation).forEach(function (key) {
      if (key == 'all' || key == 'rest') return;
      var d = dayjs__WEBPACK_IMPORTED_MODULE_2___default()(key, "YYYYMMDD");
      if (d.isAfter(cut) || d.isSame(cut)) {
        ret += accumulation[key];
      }
    });
    return ret;
  };
  return QuestCondition;
}((flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default()));


/***/ }),

/***/ "./src/common/models/QuestInfo.ts":
/*!****************************************!*\
  !*** ./src/common/models/QuestInfo.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ QuestInfo)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_common_Model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/common/Model */ "flarum/common/Model");
/* harmony import */ var flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_common_Model__WEBPACK_IMPORTED_MODULE_1__);


// For more details about frontend models
// checkout https://docs.flarum.org/extend/models.html#frontend-models
function optionalJsonParser(data) {
  if (!data) {
    return [];
  }
  try {
    return JSON.parse(data);
  } catch (ignore) {
    return [];
  }
}
var QuestInfo = /*#__PURE__*/function (_Model) {
  function QuestInfo() {
    var _this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _Model.call.apply(_Model, [this].concat(args)) || this;
    _this.name = flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().attribute('name');
    _this.createdAt = flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().attribute('createdAt', (flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().transformDate));
    _this.updatedAt = flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().attribute('updatedAt', (flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().transformDate));
    _this.description = flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().attribute('description');
    _this.condition = flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().attribute('conditions', optionalJsonParser);
    _this.reward = flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().attribute('rewards', optionalJsonParser);
    _this.re_available = flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().attribute('re_available');
    _this.done = flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().attribute('done');
    _this.icon = flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().attribute('icon');
    _this.hidden = flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().attribute('hidden');
    _this.manual = flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().attribute('manual');
    return _this;
  }
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(QuestInfo, _Model);
  return QuestInfo;
}((flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default()));


/***/ }),

/***/ "./src/common/types/data.ts":
/*!**********************************!*\
  !*** ./src/common/types/data.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OPERATOR: () => (/* binding */ OPERATOR)
/* harmony export */ });
var OPERATOR = /*#__PURE__*/function (OPERATOR) {
  OPERATOR["EQUAL"] = "=";
  OPERATOR["NOT_EQUAL"] = "!=";
  OPERATOR["GREATER_THAN"] = ">";
  OPERATOR["LESS_THAN"] = "<";
  OPERATOR["GREATER_THAN_OR_EQUAL"] = ">=";
  OPERATOR["LESS_THAN_OR_EQUAL"] = "<=";
  return OPERATOR;
}({});
;

/***/ }),

/***/ "./src/common/utils/AddFrontend.ts":
/*!*****************************************!*\
  !*** ./src/common/utils/AddFrontend.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addCondition: () => (/* binding */ addCondition),
/* harmony export */   addReward: () => (/* binding */ addReward),
/* harmony export */   addRewardSelection: () => (/* binding */ addRewardSelection),
/* harmony export */   rewardValueConvert: () => (/* binding */ rewardValueConvert)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_common_extend__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/common/extend */ "flarum/common/extend");
/* harmony import */ var flarum_common_extend__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_common_extend__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _HumanizeUtils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./HumanizeUtils */ "./src/common/utils/HumanizeUtils.tsx");




function addCondition(key, name) {
  (0,flarum_common_extend__WEBPACK_IMPORTED_MODULE_2__.extend)(_HumanizeUtils__WEBPACK_IMPORTED_MODULE_3__["default"].prototype, "getAllConditions", function (list) {
    list.add(key, name);
  });
}
function addReward(key, name) {
  (0,flarum_common_extend__WEBPACK_IMPORTED_MODULE_2__.extend)(_HumanizeUtils__WEBPACK_IMPORTED_MODULE_3__["default"].prototype, "getAllRewards", function (list) {
    list.add(key, name);
  });
}
function rewardValueConvert(key, callback) {
  (0,flarum_common_extend__WEBPACK_IMPORTED_MODULE_2__.override)(_HumanizeUtils__WEBPACK_IMPORTED_MODULE_3__["default"].prototype, "getRewardValue", function (ofunction, _key, value) {
    if (key === _key) {
      return callback(value);
    } else {
      return ofunction(_key, value);
    }
  });
}
function addRewardSelection(key, callback) {
  (0,flarum_common_extend__WEBPACK_IMPORTED_MODULE_2__.override)(_HumanizeUtils__WEBPACK_IMPORTED_MODULE_3__["default"].prototype, "rewardSelection", /*#__PURE__*/function () {
    var _ref = (0,_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().mark(function _callee(ofunction, _key) {
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            if (!(key === _key)) {
              _context.next = 4;
              break;
            }
            return _context.abrupt("return", callback());
          case 4:
            return _context.abrupt("return", ofunction(_key));
          case 5:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
}

/***/ }),

/***/ "./src/common/utils/HumanizeUtils.tsx":
/*!********************************************!*\
  !*** ./src/common/utils/HumanizeUtils.tsx ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ HumanizeUtils)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/forum/app */ "flarum/forum/app");
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_app__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_common_utils_ItemList__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/common/utils/ItemList */ "flarum/common/utils/ItemList");
/* harmony import */ var flarum_common_utils_ItemList__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_common_utils_ItemList__WEBPACK_IMPORTED_MODULE_3__);

var _HumanizeUtils;



var HumanizeUtils = /*#__PURE__*/function () {
  function HumanizeUtils() {}
  HumanizeUtils.getInstance = function getInstance() {
    if (!this.instance) {
      this.instance = new HumanizeUtils();
    }
    return this.instance;
  };
  var _proto = HumanizeUtils.prototype;
  _proto.getAllConditions = function getAllConditions() {
    return new (flarum_common_utils_ItemList__WEBPACK_IMPORTED_MODULE_3___default())();
  };
  _proto.getAllRewards = function getAllRewards() {
    return new (flarum_common_utils_ItemList__WEBPACK_IMPORTED_MODULE_3___default())();
  };
  _proto.getConditionName = function getConditionName(key) {
    if (!this.getAllConditions().has(key)) {
      return key;
    }
    return this.getAllConditions().get(key);
  };
  _proto.getRewardName = function getRewardName(key) {
    if (!this.getAllRewards().has(key)) {
      return key;
    }
    return this.getAllRewards().get(key);
  };
  _proto.getRewardValue = function getRewardValue(key, value) {
    return value;
  };
  _proto.rewardSelection = /*#__PURE__*/function () {
    var _rewardSelection = (0,_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().mark(function _callee(type) {
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", "");
          case 1:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    function rewardSelection(_x) {
      return _rewardSelection.apply(this, arguments);
    }
    return rewardSelection;
  }();
  _proto.humanizeCondition = function humanizeCondition(conditionData) {
    var _this = this;
    if (Array.isArray(conditionData)) {
      return conditionData.map(function (condition) {
        return _this.humanizeCondition(condition);
      });
    } else {
      if (conditionData.alter_name) {
        return conditionData.alter_name;
      }
      var span = conditionData.span ? flarum_forum_app__WEBPACK_IMPORTED_MODULE_2___default().translator.trans("xypp-forum-quests.forum.condition.span", {
        span: conditionData.span
      }) : '';
      if (Array.isArray(span)) {
        span = span.join("");
      }
      return flarum_forum_app__WEBPACK_IMPORTED_MODULE_2___default().translator.trans("xypp-forum-quests.forum.condition.format", {
        b: m("b", null),
        name: this.getConditionName(conditionData.name),
        operator: conditionData.operator,
        value: conditionData.value,
        span: span
      });
    }
  };
  _proto.humanizeReward = function humanizeReward(rewardData) {
    var _this2 = this;
    if (Array.isArray(rewardData)) {
      return rewardData.map(function (condition) {
        return _this2.humanizeReward(condition);
      });
    } else {
      if (rewardData.alter_name) {
        return rewardData.alter_name;
      }
      return flarum_forum_app__WEBPACK_IMPORTED_MODULE_2___default().translator.trans("xypp-forum-quests.forum.reward.format", {
        b: m("b", null),
        name: this.getRewardName(rewardData.name),
        value: this.getRewardValue(rewardData.name, rewardData.value)
      });
    }
  };
  _proto.humanizeReAvailable = function humanizeReAvailable(value) {
    var val = value == null ? void 0 : value.split(":");
    if (!val || val.length < 2) {
      return flarum_forum_app__WEBPACK_IMPORTED_MODULE_2___default().translator.trans("xypp-forum-quests.forum.re_available.none");
    }
    var type = val[0],
      v = val[1];
    return flarum_forum_app__WEBPACK_IMPORTED_MODULE_2___default().translator.trans("xypp-forum-quests.forum.re_available." + type, {
      value: v
    });
  };
  return HumanizeUtils;
}();
_HumanizeUtils = HumanizeUtils;
HumanizeUtils.instance = void 0;


/***/ }),

/***/ "./src/common/utils/NodeUtil.ts":
/*!**************************************!*\
  !*** ./src/common/utils/NodeUtil.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   showIf: () => (/* binding */ showIf)
/* harmony export */ });
function showIf(judgement, vnode, def) {
  return judgement ? vnode : def || "";
}

/***/ }),

/***/ "./src/forum/components/QuestConditionViewModal.tsx":
/*!**********************************************************!*\
  !*** ./src/forum/components/QuestConditionViewModal.tsx ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ QuestConditionViewModal)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_common_components_Modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/common/components/Modal */ "flarum/common/components/Modal");
/* harmony import */ var flarum_common_components_Modal__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Modal__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/forum/app */ "flarum/forum/app");
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_app__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _common_utils_HumanizeUtils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../common/utils/HumanizeUtils */ "./src/common/utils/HumanizeUtils.tsx");




var QuestConditionViewModal = /*#__PURE__*/function (_Modal) {
  function QuestConditionViewModal() {
    var _this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _Modal.call.apply(_Modal, [this].concat(args)) || this;
    _this.span = 0;
    return _this;
  }
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(QuestConditionViewModal, _Modal);
  var _proto = QuestConditionViewModal.prototype;
  _proto.className = function className() {
    return 'Modal';
  };
  _proto.title = function title() {
    return flarum_forum_app__WEBPACK_IMPORTED_MODULE_2___default().translator.trans('xypp-forum-quests.forum.condition_view.title');
  };
  _proto.content = function content() {
    var _this2 = this;
    return m("div", {
      className: "Modal-body"
    }, m("table", {
      className: "Table ConditionViewTable"
    }, m("thead", null, m("tr", null, m("th", null, flarum_forum_app__WEBPACK_IMPORTED_MODULE_2___default().translator.trans('xypp-forum-quests.forum.condition_view.name')), m("th", null, flarum_forum_app__WEBPACK_IMPORTED_MODULE_2___default().translator.trans('xypp-forum-quests.forum.condition_view.value')), m("th", null, flarum_forum_app__WEBPACK_IMPORTED_MODULE_2___default().translator.trans('xypp-forum-quests.forum.condition_view.span')))), m("tbody", null, this.attrs.items.map(function (item, index) {
      return m("tr", null, m("td", null, _common_utils_HumanizeUtils__WEBPACK_IMPORTED_MODULE_3__["default"].getInstance().getConditionName(item.name())), m("td", null, item.value()), m("td", null, item.getSpan(_this2.span)));
    }), m("tr", null, m("td", null, flarum_forum_app__WEBPACK_IMPORTED_MODULE_2___default().translator.trans('xypp-forum-quests.forum.condition_view.set_span')), m("td", null), m("td", null, m("input", {
      type: "number",
      className: "FormControl",
      step: "any",
      value: this.span,
      oninput: function oninput(e) {
        _this2.span = parseInt(e.target.value);
        m.redraw();
      }
    }))))));
  };
  return QuestConditionViewModal;
}((flarum_common_components_Modal__WEBPACK_IMPORTED_MODULE_1___default()));


/***/ }),

/***/ "./src/forum/components/QuestItem.tsx":
/*!********************************************!*\
  !*** ./src/forum/components/QuestItem.tsx ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ QuestItem)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/forum/app */ "flarum/forum/app");
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_app__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _common_utils_HumanizeUtils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../common/utils/HumanizeUtils */ "./src/common/utils/HumanizeUtils.tsx");
/* harmony import */ var flarum_common_Component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! flarum/common/Component */ "flarum/common/Component");
/* harmony import */ var flarum_common_Component__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(flarum_common_Component__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _common_utils_NodeUtil__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../common/utils/NodeUtil */ "./src/common/utils/NodeUtil.ts");
/* harmony import */ var _common_types_data__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../common/types/data */ "./src/common/types/data.ts");
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! flarum/common/components/Button */ "flarum/common/components/Button");
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_8__);









var QuestItem = /*#__PURE__*/function (_Component) {
  function QuestItem() {
    var _this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _Component.call.apply(_Component, [this].concat(args)) || this;
    _this.loading = false;
    _this.currentFilter = "all";
    _this.updatingCondition = false;
    return _this;
  }
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(QuestItem, _Component);
  var _proto = QuestItem.prototype;
  _proto.oninit = function oninit(vnode) {
    _Component.prototype.oninit.call(this, vnode);
  };
  _proto.oncreate = function oncreate(vnode) {
    _Component.prototype.oncreate.call(this, vnode);
  };
  _proto.view = function view() {
    var _this2 = this;
    var humanize = _common_utils_HumanizeUtils__WEBPACK_IMPORTED_MODULE_4__["default"].getInstance();
    return m("div", {
      className: this.attrs.item.done() ? "quest-item-container quest-done" : "quest-item-container"
    }, m("div", {
      className: "quest-item-name"
    }, this.attrs.item.name(), (0,_common_utils_NodeUtil__WEBPACK_IMPORTED_MODULE_6__.showIf)(!!this.attrs.item.done(), m("span", {
      className: "quest-item-done"
    }, flarum_forum_app__WEBPACK_IMPORTED_MODULE_3___default().translator.trans("xypp-forum-quests.forum.quest.done") + " ", m("i", {
      "class": "fas fa-check"
    })), (0,_common_utils_NodeUtil__WEBPACK_IMPORTED_MODULE_6__.showIf)(this.attrs.item.manual(), m((flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_8___default()), {
      className: "Button Button--secondary Button--small",
      loading: this.updatingCondition,
      disabled: this.updatingCondition,
      onclick: this.updateCondition.bind(this)
    }, (0,_common_utils_NodeUtil__WEBPACK_IMPORTED_MODULE_6__.showIf)(!this.updatingCondition, m("i", {
      "class": "fas fa-sync"
    })))))), m("div", {
      className: "quest-item-description"
    }, this.attrs.item.description()), m("div", {
      className: "quest-item-time"
    }, m("i", {
      className: "fas fa-clock"
    }), " ", humanize.humanizeReAvailable(this.attrs.item.re_available())), m("div", {
      className: "quest-item-infos"
    }, m("div", {
      className: "quest-item-condition"
    }, m("div", {
      className: "quest-item-condition-title"
    }, m("i", {
      "class": "fas fa-tasks"
    }), " ", flarum_forum_app__WEBPACK_IMPORTED_MODULE_3___default().translator.trans("xypp-forum-quests.forum.condition.condition")), this.attrs.item.condition().map(function (condition) {
      return m("div", {
        className: "quest-item-condition-line"
      }, m("span", null, humanize.humanizeCondition(condition)), _this2.progress(condition));
    })), m("div", {
      className: "quest-item-reward"
    }, m("div", {
      className: "quest-item-reward-title"
    }, m("i", {
      "class": "fas fa-gift"
    }), " ", flarum_forum_app__WEBPACK_IMPORTED_MODULE_3___default().translator.trans("xypp-forum-quests.forum.reward.reward")), humanize.humanizeReward(this.attrs.item.reward()).map(function (e) {
      return m("div", null, e);
    }))), (0,_common_utils_NodeUtil__WEBPACK_IMPORTED_MODULE_6__.showIf)(!!this.attrs.item.icon(), m("div", {
      className: "quest-item-icon"
    }, m("i", {
      "class": this.attrs.item.icon()
    }))));
  };
  _proto.progress = function progress(condition) {
    if (!this.attrs.conditionMap || !this.attrs.conditionMap[condition.name]) return "";
    var value = this.attrs.conditionMap[condition.name].value();
    if (condition.span) {
      value = this.attrs.conditionMap[condition.name].getSpan(condition.span);
    }
    var satisfy = this.conditionOp(value, condition.operator, condition.value);
    if (satisfy) {
      return m("span", {
        className: "quest-item-progress-satisfy"
      }, "[", m("i", {
        "class": "fas fa-check"
      }), "]");
    }
    return m("span", {
      className: "quest-item-progress-not-satisfy"
    }, "[", value, "/", condition.value, "]");
  };
  _proto.conditionOp = function conditionOp(value1, op, value2) {
    switch (op) {
      case _common_types_data__WEBPACK_IMPORTED_MODULE_7__.OPERATOR.EQUAL:
        return value1 == value2;
      case _common_types_data__WEBPACK_IMPORTED_MODULE_7__.OPERATOR.GREATER_THAN:
        return value1 > value2;
      case _common_types_data__WEBPACK_IMPORTED_MODULE_7__.OPERATOR.GREATER_THAN_OR_EQUAL:
        return value1 >= value2;
      case _common_types_data__WEBPACK_IMPORTED_MODULE_7__.OPERATOR.LESS_THAN:
        return value1 < value2;
      case _common_types_data__WEBPACK_IMPORTED_MODULE_7__.OPERATOR.LESS_THAN_OR_EQUAL:
        return value1 <= value2;
      case _common_types_data__WEBPACK_IMPORTED_MODULE_7__.OPERATOR.NOT_EQUAL:
        return value1 != value2;
    }
  };
  _proto.updateCondition = /*#__PURE__*/function () {
    var _updateCondition = (0,_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().mark(function _callee() {
      var item;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            this.updatingCondition = true;
            m.redraw();
            _context.prev = 2;
            _context.next = 5;
            return flarum_forum_app__WEBPACK_IMPORTED_MODULE_3___default().request({
              method: "GET",
              url: flarum_forum_app__WEBPACK_IMPORTED_MODULE_3___default().forum.attribute("apiUrl") + "/quest-infos/" + this.attrs.item.id() + "/update"
            });
          case 5:
            _context.next = 7;
            return flarum_forum_app__WEBPACK_IMPORTED_MODULE_3___default().store.find('quest-infos', this.attrs.item.id());
          case 7:
            item = _context.sent;
            this.attrs.item.pushAttributes(item.data.attributes);
          case 9:
            _context.prev = 9;
            this.updatingCondition = false;
            m.redraw();
            return _context.finish(9);
          case 13:
          case "end":
            return _context.stop();
        }
      }, _callee, this, [[2,, 9, 13]]);
    }));
    function updateCondition() {
      return _updateCondition.apply(this, arguments);
    }
    return updateCondition;
  }();
  return QuestItem;
}((flarum_common_Component__WEBPACK_IMPORTED_MODULE_5___default()));


/***/ }),

/***/ "./src/forum/components/QuestPage.tsx":
/*!********************************************!*\
  !*** ./src/forum/components/QuestPage.tsx ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ QuestPage)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_common_components_Page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/common/components/Page */ "flarum/common/components/Page");
/* harmony import */ var flarum_common_components_Page__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Page__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_forum_components_IndexPage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/forum/components/IndexPage */ "flarum/forum/components/IndexPage");
/* harmony import */ var flarum_forum_components_IndexPage__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_components_IndexPage__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var flarum_common_helpers_listItems__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! flarum/common/helpers/listItems */ "flarum/common/helpers/listItems");
/* harmony import */ var flarum_common_helpers_listItems__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(flarum_common_helpers_listItems__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var flarum_common_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! flarum/common/components/LoadingIndicator */ "flarum/common/components/LoadingIndicator");
/* harmony import */ var flarum_common_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! flarum/common/components/Button */ "flarum/common/components/Button");
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! flarum/forum/app */ "flarum/forum/app");
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_app__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _common_utils_NodeUtil__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../common/utils/NodeUtil */ "./src/common/utils/NodeUtil.ts");
/* harmony import */ var _QuestItem__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./QuestItem */ "./src/forum/components/QuestItem.tsx");
/* harmony import */ var flarum_common_components_Select__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! flarum/common/components/Select */ "flarum/common/components/Select");
/* harmony import */ var flarum_common_components_Select__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Select__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _QuestConditionViewModal__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./QuestConditionViewModal */ "./src/forum/components/QuestConditionViewModal.tsx");













var QuestPage = /*#__PURE__*/function (_Page) {
  function QuestPage() {
    var _this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _Page.call.apply(_Page, [this].concat(args)) || this;
    _this.REG_STATUS = {
      "all": flarum_forum_app__WEBPACK_IMPORTED_MODULE_8___default().translator.trans('xypp-forum-quests.forum.quest_done.all'),
      "true": flarum_forum_app__WEBPACK_IMPORTED_MODULE_8___default().translator.trans('xypp-forum-quests.forum.quest_done.true'),
      "false": flarum_forum_app__WEBPACK_IMPORTED_MODULE_8___default().translator.trans('xypp-forum-quests.forum.quest_done.false')
    };
    _this.loading = false;
    _this.more = false;
    _this.currentFilter = "all";
    _this.offset = 0;
    _this.items = [];
    _this.conditions = [];
    _this.conditionLoading = false;
    _this.conditionMap = {};
    return _this;
  }
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(QuestPage, _Page);
  var _proto = QuestPage.prototype;
  _proto.oninit = function oninit(vnode) {
    _Page.prototype.oninit.call(this, vnode);
  };
  _proto.oncreate = function oncreate(vnode) {
    _Page.prototype.oncreate.call(this, vnode);
    this.loadMore();
    if ((flarum_forum_app__WEBPACK_IMPORTED_MODULE_8___default().session).user) {
      this.loadConditions();
    }
  };
  _proto.view = function view() {
    var _this2 = this;
    return m("div", null, flarum_forum_components_IndexPage__WEBPACK_IMPORTED_MODULE_4___default().prototype.hero(), m("div", {
      className: "container"
    }, m("div", {
      className: "sideNavContainer"
    }, m("nav", {
      className: "IndexPage-nav sideNav"
    }, m("ul", null, flarum_common_helpers_listItems__WEBPACK_IMPORTED_MODULE_5___default()(flarum_forum_components_IndexPage__WEBPACK_IMPORTED_MODULE_4___default().prototype.sidebarItems().toArray()))), m("div", {
      className: "QuestPageContainer"
    }, m("div", {
      className: "QuestPageOpt"
    }, m((flarum_common_components_Select__WEBPACK_IMPORTED_MODULE_11___default()), {
      options: this.REG_STATUS,
      value: this.currentFilter,
      onchange: function (e) {
        return _this2.reloadAll(e);
      }.bind(this)
    }), m((flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_7___default()), {
      className: "Button Button--primary",
      onclick: this.conditionView.bind(this)
    }, flarum_forum_app__WEBPACK_IMPORTED_MODULE_8___default().translator.trans("xypp-forum-quests.forum.condition_view.button"))), m("div", {
      className: "QuestPageContent"
    }, this.items.map(function (item) {
      return m(_QuestItem__WEBPACK_IMPORTED_MODULE_10__["default"], {
        item: item,
        conditionMap: _this2.conditionMap
      });
    })), m("div", {
      className: "QuestPageLoad"
    }, (0,_common_utils_NodeUtil__WEBPACK_IMPORTED_MODULE_9__.showIf)(this.loading, m((flarum_common_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_6___default()), null), (0,_common_utils_NodeUtil__WEBPACK_IMPORTED_MODULE_9__.showIf)(this.more, m((flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_7___default()), {
      className: "Button Button--primary"
    }, flarum_forum_app__WEBPACK_IMPORTED_MODULE_8___default().translator.trans("xypp-forum-quests.forum.quest.load_more")))))))));
  };
  _proto.loadMore = /*#__PURE__*/function () {
    var _loadMore = (0,_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().mark(function _callee() {
      var _this$items;
      var newItems;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            this.loading = true;
            m.redraw();
            _context.next = 4;
            return flarum_forum_app__WEBPACK_IMPORTED_MODULE_8___default().store.find('quest-infos', {
              page: {
                offset: this.offset,
                limit: 10
              },
              filter: this.currentFilter
            });
          case 4:
            newItems = _context.sent;
            (_this$items = this.items).push.apply(_this$items, newItems);
            this.loading = false;
            if (newItems.length < 10) {
              this.more = false;
            }
            this.offset += newItems.length;
            m.redraw();
          case 10:
          case "end":
            return _context.stop();
        }
      }, _callee, this);
    }));
    function loadMore() {
      return _loadMore.apply(this, arguments);
    }
    return loadMore;
  }();
  _proto.loadConditions = /*#__PURE__*/function () {
    var _loadConditions = (0,_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().mark(function _callee2() {
      var _this3 = this;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            this.conditionLoading = true;
            m.redraw();
            this.conditions = flarum_forum_app__WEBPACK_IMPORTED_MODULE_8___default().store.all("quest-condition");
            if (!(this.conditions.length == 0)) {
              _context2.next = 7;
              break;
            }
            _context2.next = 6;
            return flarum_forum_app__WEBPACK_IMPORTED_MODULE_8___default().store.find('quest-condition');
          case 6:
            this.conditions = _context2.sent;
          case 7:
            this.conditions.forEach(function (item) {
              _this3.conditionMap[item.name()] = item;
            });
            this.conditionLoading = false;
            m.redraw();
          case 10:
          case "end":
            return _context2.stop();
        }
      }, _callee2, this);
    }));
    function loadConditions() {
      return _loadConditions.apply(this, arguments);
    }
    return loadConditions;
  }();
  _proto.reloadAll = function reloadAll(type) {
    this.currentFilter = type;
    this.items = [];
    this.offset = 0;
    this.more = true;
    this.loadMore();
  };
  _proto.conditionView = function conditionView() {
    flarum_forum_app__WEBPACK_IMPORTED_MODULE_8___default().modal.show(_QuestConditionViewModal__WEBPACK_IMPORTED_MODULE_12__["default"], {
      items: this.conditions
    }, true);
  };
  return QuestPage;
}((flarum_common_components_Page__WEBPACK_IMPORTED_MODULE_3___default()));


/***/ }),

/***/ "./src/forum/index.ts":
/*!****************************!*\
  !*** ./src/forum/index.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/forum/app */ "flarum/forum/app");
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_app__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _notification_QuestDoneNotification__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./notification/QuestDoneNotification */ "./src/forum/notification/QuestDoneNotification.ts");
/* harmony import */ var flarum_common_extend__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/common/extend */ "flarum/common/extend");
/* harmony import */ var flarum_common_extend__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_common_extend__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_forum_components_NotificationGrid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/forum/components/NotificationGrid */ "flarum/forum/components/NotificationGrid");
/* harmony import */ var flarum_forum_components_NotificationGrid__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_components_NotificationGrid__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_common_components_LinkButton__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/common/components/LinkButton */ "flarum/common/components/LinkButton");
/* harmony import */ var flarum_common_components_LinkButton__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_LinkButton__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var flarum_forum_components_IndexPage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! flarum/forum/components/IndexPage */ "flarum/forum/components/IndexPage");
/* harmony import */ var flarum_forum_components_IndexPage__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_components_IndexPage__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _components_QuestPage__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/QuestPage */ "./src/forum/components/QuestPage.tsx");
/* harmony import */ var _common_integration__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../common/integration */ "./src/common/integration/index.ts");
/* harmony import */ var _integration_pageCount__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./integration/pageCount */ "./src/forum/integration/pageCount.ts");









flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().initializers.add('xypp/forum-quests', function () {
  (0,_common_integration__WEBPACK_IMPORTED_MODULE_7__.init)((flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default()), "forum");
  (0,_integration_pageCount__WEBPACK_IMPORTED_MODULE_8__.registerCount)();
  (flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().notificationComponents).quest_done = _notification_QuestDoneNotification__WEBPACK_IMPORTED_MODULE_1__["default"];
  (flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().routes)['quest_page'] = {
    path: "/quest_page",
    component: _components_QuestPage__WEBPACK_IMPORTED_MODULE_6__["default"]
  };
  (0,flarum_common_extend__WEBPACK_IMPORTED_MODULE_2__.extend)((flarum_forum_components_NotificationGrid__WEBPACK_IMPORTED_MODULE_3___default().prototype), 'notificationTypes', function (items) {
    items.add('postLiked', {
      name: 'postLiked',
      icon: 'far fa-thumbs-up',
      label: flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('xypp-forum-quests.forum.notification.quest_done_label')
    });
  });
  (0,flarum_common_extend__WEBPACK_IMPORTED_MODULE_2__.extend)((flarum_forum_components_IndexPage__WEBPACK_IMPORTED_MODULE_5___default().prototype), 'navItems', function (items) {
    items.add('quest_page', flarum_common_components_LinkButton__WEBPACK_IMPORTED_MODULE_4___default().component({
      href: flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().route('quest_page'),
      icon: 'fas fa-tasks'
    }, [flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('xypp-forum-quests.forum.quest.quest')]), 10);
  });
});

/***/ }),

/***/ "./src/forum/integration/pageCount.ts":
/*!********************************************!*\
  !*** ./src/forum/integration/pageCount.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   registerCount: () => (/* binding */ registerCount)
/* harmony export */ });
/* harmony import */ var flarum_common_extend__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/common/extend */ "flarum/common/extend");
/* harmony import */ var flarum_common_extend__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_common_extend__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_forum_components_UserPage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/forum/components/UserPage */ "flarum/forum/components/UserPage");
/* harmony import */ var flarum_forum_components_UserPage__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_components_UserPage__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_frontendTrigger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/frontendTrigger */ "./src/forum/utils/frontendTrigger.ts");



var typeCnt = {};
var records = {};
function limitCount(type, count, cb) {
  typeCnt[type] = typeCnt[type] || 0;
  if (typeCnt[type] < count) {
    typeCnt[type]++;
    cb(type);
  }
}
function limitTypeOnce(type, newKey, cb) {
  var dict = records[type] = records[type] || {};
  if (!dict[newKey]) {
    dict[newKey] = true;
    cb(type);
  }
}
function registerCount() {
  (0,flarum_common_extend__WEBPACK_IMPORTED_MODULE_0__.extend)((flarum_forum_components_UserPage__WEBPACK_IMPORTED_MODULE_1___default().prototype), "show", function () {
    var _this$user;
    limitTypeOnce("user_page_view", (_this$user = this.user) == null ? void 0 : _this$user.slug(), function (t) {
      return limitCount(t, 5, function (t) {
        return (0,_utils_frontendTrigger__WEBPACK_IMPORTED_MODULE_2__.triggerCondition)(t, 1);
      });
    });
  });
}

/***/ }),

/***/ "./src/forum/notification/QuestDoneNotification.ts":
/*!*********************************************************!*\
  !*** ./src/forum/notification/QuestDoneNotification.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ QuestDoneNotification)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_forum_components_Notification__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/forum/components/Notification */ "flarum/forum/components/Notification");
/* harmony import */ var flarum_forum_components_Notification__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_components_Notification__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/forum/app */ "flarum/forum/app");
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_app__WEBPACK_IMPORTED_MODULE_2__);



var QuestDoneNotification = /*#__PURE__*/function (_Notification) {
  function QuestDoneNotification() {
    return _Notification.apply(this, arguments) || this;
  }
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(QuestDoneNotification, _Notification);
  var _proto = QuestDoneNotification.prototype;
  _proto.excerpt = function excerpt() {
    return "";
  };
  _proto.icon = function icon() {
    return 'fas fa-star';
  };
  _proto.href = function href() {
    return flarum_forum_app__WEBPACK_IMPORTED_MODULE_2___default().route("quest_page");
  };
  _proto.content = function content() {
    //@ts-ignore
    return flarum_forum_app__WEBPACK_IMPORTED_MODULE_2___default().translator.trans('xypp-forum-quests.forum.notification.quest_done', {
      name: this.attrs.notification.subject().name()
    });
  };
  return QuestDoneNotification;
}((flarum_forum_components_Notification__WEBPACK_IMPORTED_MODULE_1___default()));


/***/ }),

/***/ "./src/forum/utils/frontendTrigger.ts":
/*!********************************************!*\
  !*** ./src/forum/utils/frontendTrigger.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   triggerCondition: () => (/* binding */ triggerCondition),
/* harmony export */   triggerConditions: () => (/* binding */ triggerConditions)
/* harmony export */ });
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/forum/app */ "flarum/forum/app");
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_app__WEBPACK_IMPORTED_MODULE_0__);

function triggerCondition(key, value) {
  var _triggerConditions;
  return triggerConditions((_triggerConditions = {}, _triggerConditions[key] = value, _triggerConditions));
}
function triggerConditions(records) {
  var rec = Object.keys(records).map(function (key) {
    return {
      name: key,
      value: records[key]
    };
  });
  return flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().request({
    url: flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().forum.attribute('apiUrl') + "/quest-condition",
    method: "POST",
    body: {
      data: rec
    }
  });
}

/***/ }),

/***/ "flarum/common/Component":
/*!*********************************************************!*\
  !*** external "flarum.core.compat['common/Component']" ***!
  \*********************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/Component'];

/***/ }),

/***/ "flarum/common/Model":
/*!*****************************************************!*\
  !*** external "flarum.core.compat['common/Model']" ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/Model'];

/***/ }),

/***/ "flarum/common/app":
/*!***************************************************!*\
  !*** external "flarum.core.compat['common/app']" ***!
  \***************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/app'];

/***/ }),

/***/ "flarum/common/components/Button":
/*!*****************************************************************!*\
  !*** external "flarum.core.compat['common/components/Button']" ***!
  \*****************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/components/Button'];

/***/ }),

/***/ "flarum/common/components/LinkButton":
/*!*********************************************************************!*\
  !*** external "flarum.core.compat['common/components/LinkButton']" ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/components/LinkButton'];

/***/ }),

/***/ "flarum/common/components/LoadingIndicator":
/*!***************************************************************************!*\
  !*** external "flarum.core.compat['common/components/LoadingIndicator']" ***!
  \***************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/components/LoadingIndicator'];

/***/ }),

/***/ "flarum/common/components/Modal":
/*!****************************************************************!*\
  !*** external "flarum.core.compat['common/components/Modal']" ***!
  \****************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/components/Modal'];

/***/ }),

/***/ "flarum/common/components/Page":
/*!***************************************************************!*\
  !*** external "flarum.core.compat['common/components/Page']" ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/components/Page'];

/***/ }),

/***/ "flarum/common/components/Select":
/*!*****************************************************************!*\
  !*** external "flarum.core.compat['common/components/Select']" ***!
  \*****************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/components/Select'];

/***/ }),

/***/ "flarum/common/extend":
/*!******************************************************!*\
  !*** external "flarum.core.compat['common/extend']" ***!
  \******************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/extend'];

/***/ }),

/***/ "flarum/common/extenders":
/*!*********************************************************!*\
  !*** external "flarum.core.compat['common/extenders']" ***!
  \*********************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/extenders'];

/***/ }),

/***/ "flarum/common/helpers/listItems":
/*!*****************************************************************!*\
  !*** external "flarum.core.compat['common/helpers/listItems']" ***!
  \*****************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/helpers/listItems'];

/***/ }),

/***/ "flarum/common/utils/ItemList":
/*!**************************************************************!*\
  !*** external "flarum.core.compat['common/utils/ItemList']" ***!
  \**************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/utils/ItemList'];

/***/ }),

/***/ "flarum/forum/app":
/*!**************************************************!*\
  !*** external "flarum.core.compat['forum/app']" ***!
  \**************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['forum/app'];

/***/ }),

/***/ "flarum/forum/components/IndexPage":
/*!*******************************************************************!*\
  !*** external "flarum.core.compat['forum/components/IndexPage']" ***!
  \*******************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['forum/components/IndexPage'];

/***/ }),

/***/ "flarum/forum/components/Notification":
/*!**********************************************************************!*\
  !*** external "flarum.core.compat['forum/components/Notification']" ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['forum/components/Notification'];

/***/ }),

/***/ "flarum/forum/components/NotificationGrid":
/*!**************************************************************************!*\
  !*** external "flarum.core.compat['forum/components/NotificationGrid']" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['forum/components/NotificationGrid'];

/***/ }),

/***/ "flarum/forum/components/UserPage":
/*!******************************************************************!*\
  !*** external "flarum.core.compat['forum/components/UserPage']" ***!
  \******************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['forum/components/UserPage'];

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/regeneratorRuntime.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/regeneratorRuntime.js ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _typeof = (__webpack_require__(/*! ./typeof.js */ "./node_modules/@babel/runtime/helpers/typeof.js")["default"]);
function _regeneratorRuntime() {
  "use strict";

  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */
  module.exports = _regeneratorRuntime = function _regeneratorRuntime() {
    return e;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  var t,
    e = {},
    r = Object.prototype,
    n = r.hasOwnProperty,
    o = Object.defineProperty || function (t, e, r) {
      t[e] = r.value;
    },
    i = "function" == typeof Symbol ? Symbol : {},
    a = i.iterator || "@@iterator",
    c = i.asyncIterator || "@@asyncIterator",
    u = i.toStringTag || "@@toStringTag";
  function define(t, e, r) {
    return Object.defineProperty(t, e, {
      value: r,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), t[e];
  }
  try {
    define({}, "");
  } catch (t) {
    define = function define(t, e, r) {
      return t[e] = r;
    };
  }
  function wrap(t, e, r, n) {
    var i = e && e.prototype instanceof Generator ? e : Generator,
      a = Object.create(i.prototype),
      c = new Context(n || []);
    return o(a, "_invoke", {
      value: makeInvokeMethod(t, r, c)
    }), a;
  }
  function tryCatch(t, e, r) {
    try {
      return {
        type: "normal",
        arg: t.call(e, r)
      };
    } catch (t) {
      return {
        type: "throw",
        arg: t
      };
    }
  }
  e.wrap = wrap;
  var h = "suspendedStart",
    l = "suspendedYield",
    f = "executing",
    s = "completed",
    y = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var p = {};
  define(p, a, function () {
    return this;
  });
  var d = Object.getPrototypeOf,
    v = d && d(d(values([])));
  v && v !== r && n.call(v, a) && (p = v);
  var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p);
  function defineIteratorMethods(t) {
    ["next", "throw", "return"].forEach(function (e) {
      define(t, e, function (t) {
        return this._invoke(e, t);
      });
    });
  }
  function AsyncIterator(t, e) {
    function invoke(r, o, i, a) {
      var c = tryCatch(t[r], t, o);
      if ("throw" !== c.type) {
        var u = c.arg,
          h = u.value;
        return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) {
          invoke("next", t, i, a);
        }, function (t) {
          invoke("throw", t, i, a);
        }) : e.resolve(h).then(function (t) {
          u.value = t, i(u);
        }, function (t) {
          return invoke("throw", t, i, a);
        });
      }
      a(c.arg);
    }
    var r;
    o(this, "_invoke", {
      value: function value(t, n) {
        function callInvokeWithMethodAndArg() {
          return new e(function (e, r) {
            invoke(t, n, e, r);
          });
        }
        return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }
    });
  }
  function makeInvokeMethod(e, r, n) {
    var o = h;
    return function (i, a) {
      if (o === f) throw Error("Generator is already running");
      if (o === s) {
        if ("throw" === i) throw a;
        return {
          value: t,
          done: !0
        };
      }
      for (n.method = i, n.arg = a;;) {
        var c = n.delegate;
        if (c) {
          var u = maybeInvokeDelegate(c, n);
          if (u) {
            if (u === y) continue;
            return u;
          }
        }
        if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) {
          if (o === h) throw o = s, n.arg;
          n.dispatchException(n.arg);
        } else "return" === n.method && n.abrupt("return", n.arg);
        o = f;
        var p = tryCatch(e, r, n);
        if ("normal" === p.type) {
          if (o = n.done ? s : l, p.arg === y) continue;
          return {
            value: p.arg,
            done: n.done
          };
        }
        "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg);
      }
    };
  }
  function maybeInvokeDelegate(e, r) {
    var n = r.method,
      o = e.iterator[n];
    if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y;
    var i = tryCatch(o, e.iterator, r.arg);
    if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y;
    var a = i.arg;
    return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y);
  }
  function pushTryEntry(t) {
    var e = {
      tryLoc: t[0]
    };
    1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e);
  }
  function resetTryEntry(t) {
    var e = t.completion || {};
    e.type = "normal", delete e.arg, t.completion = e;
  }
  function Context(t) {
    this.tryEntries = [{
      tryLoc: "root"
    }], t.forEach(pushTryEntry, this), this.reset(!0);
  }
  function values(e) {
    if (e || "" === e) {
      var r = e[a];
      if (r) return r.call(e);
      if ("function" == typeof e.next) return e;
      if (!isNaN(e.length)) {
        var o = -1,
          i = function next() {
            for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next;
            return next.value = t, next.done = !0, next;
          };
        return i.next = i;
      }
    }
    throw new TypeError(_typeof(e) + " is not iterable");
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", {
    value: GeneratorFunctionPrototype,
    configurable: !0
  }), o(GeneratorFunctionPrototype, "constructor", {
    value: GeneratorFunction,
    configurable: !0
  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) {
    var e = "function" == typeof t && t.constructor;
    return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name));
  }, e.mark = function (t) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t;
  }, e.awrap = function (t) {
    return {
      __await: t
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () {
    return this;
  }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) {
    void 0 === i && (i = Promise);
    var a = new AsyncIterator(wrap(t, r, n, o), i);
    return e.isGeneratorFunction(r) ? a : a.next().then(function (t) {
      return t.done ? t.value : a.next();
    });
  }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () {
    return this;
  }), define(g, "toString", function () {
    return "[object Generator]";
  }), e.keys = function (t) {
    var e = Object(t),
      r = [];
    for (var n in e) r.push(n);
    return r.reverse(), function next() {
      for (; r.length;) {
        var t = r.pop();
        if (t in e) return next.value = t, next.done = !1, next;
      }
      return next.done = !0, next;
    };
  }, e.values = values, Context.prototype = {
    constructor: Context,
    reset: function reset(e) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t);
    },
    stop: function stop() {
      this.done = !0;
      var t = this.tryEntries[0].completion;
      if ("throw" === t.type) throw t.arg;
      return this.rval;
    },
    dispatchException: function dispatchException(e) {
      if (this.done) throw e;
      var r = this;
      function handle(n, o) {
        return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o;
      }
      for (var o = this.tryEntries.length - 1; o >= 0; --o) {
        var i = this.tryEntries[o],
          a = i.completion;
        if ("root" === i.tryLoc) return handle("end");
        if (i.tryLoc <= this.prev) {
          var c = n.call(i, "catchLoc"),
            u = n.call(i, "finallyLoc");
          if (c && u) {
            if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
            if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
          } else if (c) {
            if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
          } else {
            if (!u) throw Error("try statement without catch or finally");
            if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
          }
        }
      }
    },
    abrupt: function abrupt(t, e) {
      for (var r = this.tryEntries.length - 1; r >= 0; --r) {
        var o = this.tryEntries[r];
        if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) {
          var i = o;
          break;
        }
      }
      i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null);
      var a = i ? i.completion : {};
      return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a);
    },
    complete: function complete(t, e) {
      if ("throw" === t.type) throw t.arg;
      return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y;
    },
    finish: function finish(t) {
      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
        var r = this.tryEntries[e];
        if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y;
      }
    },
    "catch": function _catch(t) {
      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
        var r = this.tryEntries[e];
        if (r.tryLoc === t) {
          var n = r.completion;
          if ("throw" === n.type) {
            var o = n.arg;
            resetTryEntry(r);
          }
          return o;
        }
      }
      throw Error("illegal catch attempt");
    },
    delegateYield: function delegateYield(e, r, n) {
      return this.delegate = {
        iterator: values(e),
        resultName: r,
        nextLoc: n
      }, "next" === this.method && (this.arg = t), y;
    }
  }, e;
}
module.exports = _regeneratorRuntime, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/typeof.js":
/*!*******************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/typeof.js ***!
  \*******************************************************/
/***/ ((module) => {

function _typeof(o) {
  "@babel/helpers - typeof";

  return (module.exports = _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports), _typeof(o);
}
module.exports = _typeof, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/regenerator/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// TODO(Babel 8): Remove this file.

var runtime = __webpack_require__(/*! ../helpers/regeneratorRuntime */ "./node_modules/@babel/runtime/helpers/regeneratorRuntime.js")();
module.exports = runtime;

// Copied from https://github.com/facebook/regenerator/blob/main/packages/runtime/runtime.js#L736=
try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  if (typeof globalThis === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _asyncToGenerator)
/* harmony export */ });
function asyncGeneratorStep(n, t, e, r, o, a, c) {
  try {
    var i = n[a](c),
      u = i.value;
  } catch (n) {
    return void e(n);
  }
  i.done ? t(u) : Promise.resolve(u).then(r, o);
}
function _asyncToGenerator(n) {
  return function () {
    var t = this,
      e = arguments;
    return new Promise(function (r, o) {
      var a = n.apply(t, e);
      function _next(n) {
        asyncGeneratorStep(a, r, o, _next, _throw, "next", n);
      }
      function _throw(n) {
        asyncGeneratorStep(a, r, o, _next, _throw, "throw", n);
      }
      _next(void 0);
    });
  };
}


/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _inheritsLoose)
/* harmony export */ });
/* harmony import */ var _setPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./setPrototypeOf.js */ "./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js");

function _inheritsLoose(t, o) {
  t.prototype = Object.create(o.prototype), t.prototype.constructor = t, (0,_setPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__["default"])(t, o);
}


/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _setPrototypeOf)
/* harmony export */ });
function _setPrototypeOf(t, e) {
  return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
    return t.__proto__ = e, t;
  }, _setPrototypeOf(t, e);
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!******************!*\
  !*** ./forum.ts ***!
  \******************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   extend: () => (/* reexport safe */ _src_common_extend__WEBPACK_IMPORTED_MODULE_2__["default"])
/* harmony export */ });
/* harmony import */ var _src_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/common */ "./src/common/index.ts");
/* harmony import */ var _src_forum__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/forum */ "./src/forum/index.ts");
/* harmony import */ var _src_common_extend__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./src/common/extend */ "./src/common/extend.ts");



})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=forum.js.map