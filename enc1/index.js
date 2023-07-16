



var t = require("./typeof");
module.exports = (function (e) {
  var r = {};
  function n(t) {
    if (r[t]) return r[t].exports;
    var i = (r[t] = { i: t, l: !1, exports: {} });
    return e[t].call(i.exports, i, i.exports, n), (i.l = !0), i.exports;
  }
  return (
    (n.m = e),
    (n.c = r),
    (n.d = function (t, e, r) {
      n.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: r });
    }),
    (n.r = function (t) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(t, "__esModule", { value: !0 });
    }),
    (n.t = function (e, r) {
      if ((1 & r && (e = n(e)), 8 & r)) return e;
      if (4 & r && "object" === t(e) && e && e.__esModule) return e;
      var i = Object.create(null);
      if (
        (n.r(i),
        Object.defineProperty(i, "default", { enumerable: !0, value: e }),
        2 & r && "string" != typeof e)
      )
        for (var o in e)
          n.d(
            i,
            o,
            function (t) {
              return e[t];
            }.bind(null, o)
          );
      return i;
    }),
    (n.n = function (t) {
      var e =
        t && t.__esModule
          ? function () {
              return t.default;
            }
          : function () {
              return t;
            };
      return n.d(e, "a", e), e;
    }),
    (n.o = function (t, e) {
      return Object.prototype.hasOwnProperty.call(t, e);
    }),
    (n.p = ""),
    n((n.s = 2))
  );
})([
  function (t, e) {
    t.exports = require("./jsbn");
  },
  function (t, e, r) {
    function n(t, e) {
      for (
        var r = [], n = ~~(e / 8), i = e % 8, o = 0, u = t.length;
        o < u;
        o++
      )
        r[o] =
          ((t[(o + n) % u] << i) & 255) +
          ((t[(o + n + 1) % u] >>> (8 - i)) & 255);
      return r;
    }
    function i(t, e) {
      for (var r = [], n = t.length - 1; n >= 0; n--)
        r[n] = 255 & (t[n] ^ e[n]);
      return r;
    }
    function o(t, e) {
      for (var r = [], n = t.length - 1; n >= 0; n--) r[n] = t[n] & e[n] & 255;
      return r;
    }
    function u(t, e) {
      for (var r = [], n = t.length - 1; n >= 0; n--)
        r[n] = 255 & (t[n] | e[n]);
      return r;
    }
    function s(t, e) {
      for (var r = [], n = 0, i = t.length - 1; i >= 0; i--) {
        var o = t[i] + e[i] + n;
        o > 255 ? ((n = 1), (r[i] = 255 & o)) : ((n = 0), (r[i] = 255 & o));
      }
      return r;
    }
    function a(t) {
      return i(i(t, n(t, 9)), n(t, 17));
    }
    function l(t, e, r, n) {
      return n >= 0 && n <= 15
        ? i(i(t, e), r)
        : u(u(o(t, e), o(t, r)), o(e, r));
    }
    function c(t, e, r, n) {
      return n >= 0 && n <= 15
        ? i(i(t, e), r)
        : u(
            o(t, e),
            o(
              (function (t) {
                for (var e = [], r = t.length - 1; r >= 0; r--)
                  e[r] = 255 & ~t[r];
                return e;
              })(t),
              r
            )
          );
    }
    function f(t, e) {
      for (var r, o = [], u = [], f = 0; f < 16; f++) {
        var h = 4 * f;
        o.push(e.slice(h, h + 4));
      }
      for (var g = 16; g < 68; g++)
        o.push(
          i(
            i(
              ((r = i(i(o[g - 16], o[g - 9]), n(o[g - 3], 15))),
              i(i(r, n(r, 15)), n(r, 23))),
              n(o[g - 13], 7)
            ),
            o[g - 6]
          )
        );
      for (var p = 0; p < 64; p++) u.push(i(o[p], o[p + 4]));
      for (
        var v = [121, 204, 69, 25],
          d = [122, 135, 157, 138],
          y = t.slice(0, 4),
          F = t.slice(4, 8),
          m = t.slice(8, 12),
          b = t.slice(12, 16),
          w = t.slice(16, 20),
          x = t.slice(20, 24),
          I = t.slice(24, 28),
          B = t.slice(28, 32),
          q = void 0,
          E = void 0,
          P = void 0,
          A = void 0,
          C = 0;
        C < 64;
        C++
      ) {
        var S = C >= 0 && C <= 15 ? v : d;
        (E = i((q = n(s(s(n(y, 12), w), n(S, C)), 7)), n(y, 12))),
          (P = s(s(s(l(y, F, m, C), b), E), u[C])),
          (A = s(s(s(c(w, x, I, C), B), q), o[C])),
          (b = m),
          (m = n(F, 9)),
          (F = y),
          (y = P),
          (B = I),
          (I = n(x, 19)),
          (x = w),
          (w = a(A));
      }
      return i([].concat(y, F, m, b, w, x, I, B), t);
    }
    function h(t) {
      var e = 8 * t.length,
        r = e % 512;
      r = r >= 448 ? 512 - (r % 448) - 1 : 448 - r - 1;
      for (var n = new Array((r - 7) / 8), i = 0, o = n.length; i < o; i++)
        n[i] = 0;
      var u = [];
      e = e.toString(2);
      for (var s = 7; s >= 0; s--)
        if (e.length > 8) {
          var a = e.length - 8;
          (u[s] = parseInt(e.substr(a), 2)), (e = e.substr(0, a));
        } else e.length > 0 ? ((u[s] = parseInt(e, 2)), (e = "")) : (u[s] = 0);
      for (
        var l = [].concat(t, [128], n, u),
          c = l.length / 64,
          h = [
            115, 128, 22, 111, 73, 20, 178, 185, 23, 36, 66, 215, 218, 138, 6,
            0, 169, 111, 48, 188, 22, 49, 56, 170, 227, 141, 238, 77, 176, 251,
            14, 78,
          ],
          g = 0;
        g < c;
        g++
      ) {
        var p = 64 * g;
        h = f(h, l.slice(p, p + 64));
      }
      return h;
    }
    for (var g = new Array(64), p = new Array(64), v = 0; v < 64; v++)
      (g[v] = 54), (p[v] = 92);
    t.exports = {
      sm3: h,
      hmac: function (t, e) {
        for (e.length > 64 && (e = h(e)); e.length < 64; ) e.push(0);
        var r = i(e, g).concat(t);
        return (r = h(r)), (r = h((r = i(e, p).concat(r))));
      },
    };
  },
  function (t, e, r) {
    t.exports = { sm2: r(3), sm3: r(7), sm4: r(8) };
  },
  function (t, e, r) {
    var n = r(0).BigInteger,
      i = r(4),
      o = i.encodeDer,
      u = i.decodeDer,
      s = r(5),
      a = r(1).sm3,
      l = s.generateEcparam(),
      c = l.G,
      f = l.curve,
      h = l.n;
    function g(t, e) {
      var r =
        arguments.length > 2 && void 0 !== arguments[2]
          ? arguments[2]
          : "1234567812345678";
      r = s.utf8ToHex(r);
      var n = s.leftPad(c.curve.a.toBigInteger().toRadix(16), 64),
        i = s.leftPad(c.curve.b.toBigInteger().toRadix(16), 64),
        o = s.leftPad(c.getX().toBigInteger().toRadix(16), 64),
        u = s.leftPad(c.getY().toBigInteger().toRadix(16), 64);
      e.length > 128 && (e = e.substr(2, 128));
      var l = e.substr(0, 64),
        f = e.substr(64, 64),
        h = s.hexToArray(r + n + i + o + u + l + f),
        g = 4 * r.length;
      h.unshift(255 & g), h.unshift((g >> 8) & 255);
      var p = a(h);
      return s.arrayToHex(a(p.concat(s.hexToArray(t))));
    }
    function p(t) {
      var e = c.multiply(new n(t, 16));
      return (
        "04" +
        s.leftPad(e.getX().toBigInteger().toString(16), 64) +
        s.leftPad(e.getY().toBigInteger().toString(16), 64)
      );
    }
    function v() {
      var t = s.generateKeyPairHex(),
        e = f.decodePointHex(t.publicKey);
      return (
        (t.k = new n(t.privateKey, 16)), (t.x1 = e.getX().toBigInteger()), t
      );
    }
    t.exports = {
      generateKeyPairHex: s.generateKeyPairHex,
      doEncrypt: function (t, e) {
        var r =
          arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1;
        (t =
          "string" == typeof t
            ? s.hexToArray(s.utf8ToHex(t))
            : Array.prototype.slice.call(t)),
          (e = s.getGlobalCurve().decodePointHex(e));
        var i = s.generateKeyPairHex(),
          o = new n(i.privateKey, 16),
          u = i.publicKey;
        u.length > 128 && (u = u.substr(u.length - 128));
        var l = e.multiply(o),
          c = s.hexToArray(s.leftPad(l.getX().toBigInteger().toRadix(16), 64)),
          f = s.hexToArray(s.leftPad(l.getY().toBigInteger().toRadix(16), 64)),
          h = s.arrayToHex(a([].concat(c, t, f))),
          g = 1,
          p = 0,
          v = [],
          d = [].concat(c, f),
          y = function () {
            (v = a(
              [].concat(d, [
                (g >> 24) & 255,
                (g >> 16) & 255,
                (g >> 8) & 255,
                255 & g,
              ])
            )),
              g++,
              (p = 0);
          };
        y();
        for (var F = 0, m = t.length; F < m; F++)
          p === v.length && y(), (t[F] ^= 255 & v[p++]);
        var b = s.arrayToHex(t);
        return 0 === r ? u + b + h : u + h + b;
      },
      doDecrypt: function (t, e) {
        var r =
            arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1,
          i =
            arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
          o = i.output,
          u = void 0 === o ? "string" : o;
        e = new n(e, 16);
        var l = t.substr(128, 64),
          c = t.substr(192);
        0 === r &&
          ((l = t.substr(t.length - 64)),
          (c = t.substr(128, t.length - 128 - 64)));
        var f = s.hexToArray(c),
          h = s.getGlobalCurve().decodePointHex("04" + t.substr(0, 128)),
          g = h.multiply(e),
          p = s.hexToArray(s.leftPad(g.getX().toBigInteger().toRadix(16), 64)),
          v = s.hexToArray(s.leftPad(g.getY().toBigInteger().toRadix(16), 64)),
          d = 1,
          y = 0,
          F = [],
          m = [].concat(p, v),
          b = function () {
            (F = a(
              [].concat(m, [
                (d >> 24) & 255,
                (d >> 16) & 255,
                (d >> 8) & 255,
                255 & d,
              ])
            )),
              d++,
              (y = 0);
          };
        b();
        for (var w = 0, x = f.length; w < x; w++)
          y === F.length && b(), (f[w] ^= 255 & F[y++]);
        var I = s.arrayToHex(a([].concat(p, f, v)));
        return I === l.toLowerCase()
          ? "array" === u
            ? f
            : s.arrayToUtf8(f)
          : "array" === u
          ? []
          : "";
      },
      doSignature: function (t, e) {
        var r =
            arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
          i = r.pointPool,
          u = r.der,
          a = r.hash,
          l = r.publicKey,
          c = r.userId,
          f = "string" == typeof t ? s.utf8ToHex(t) : s.arrayToHex(t);
        a && (f = g(f, (l = l || p(e)), c));
        var d = new n(e, 16),
          y = new n(f, 16),
          F = null,
          m = null,
          b = null;
        do {
          do {
            var w = void 0;
            (F = (w = i && i.length ? i.pop() : v()).k),
              (m = y.add(w.x1).mod(h));
          } while (m.equals(n.ZERO) || m.add(F).equals(h));
          b = d
            .add(n.ONE)
            .modInverse(h)
            .multiply(F.subtract(m.multiply(d)))
            .mod(h);
        } while (b.equals(n.ZERO));
        return u
          ? o(m, b)
          : s.leftPad(m.toString(16), 64) + s.leftPad(b.toString(16), 64);
      },
      doVerifySignature: function (t, e, r) {
        var i =
            arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
          o = i.der,
          a = i.hash,
          l = i.userId,
          p = "string" == typeof t ? s.utf8ToHex(t) : s.arrayToHex(t);
        a && (p = g(p, r, l));
        var v = void 0,
          d = void 0;
        if (o) {
          var y = u(e);
          (v = y.r), (d = y.s);
        } else
          (v = new n(e.substring(0, 64), 16)), (d = new n(e.substring(64), 16));
        var F = f.decodePointHex(r),
          m = new n(p, 16),
          b = v.add(d).mod(h);
        if (b.equals(n.ZERO)) return !1;
        var w = c.multiply(d).add(F.multiply(b)),
          x = m.add(w.getX().toBigInteger()).mod(h);
        return v.equals(x);
      },
      getPoint: v,
      verifyPublicKey: s.verifyPublicKey,
    };
  },
  function (e, r, n) {
    function i(e, r) {
      if (!e)
        throw new ReferenceError(
          "this hasn't been initialised - super() hasn't been called"
        );
      return !r || ("object" !== t(r) && "function" != typeof r) ? e : r;
    }
    function o(e, r) {
      if ("function" != typeof r && null !== r)
        throw new TypeError(
          "Super expression must either be null or a function, not " + t(r)
        );
      (e.prototype = Object.create(r && r.prototype, {
        constructor: {
          value: e,
          enumerable: !1,
          writable: !0,
          configurable: !0,
        },
      })),
        r &&
          (Object.setPrototypeOf
            ? Object.setPrototypeOf(e, r)
            : (e.__proto__ = r));
    }
    function u(t, e) {
      if (!(t instanceof e))
        throw new TypeError("Cannot call a class as a function");
    }
    var s = n(0).BigInteger;
    var a = (function () {
        function t() {
          u(this, t),
            (this.tlv = null),
            (this.t = "00"),
            (this.l = "00"),
            (this.v = "");
        }
        return (
          (t.prototype.getEncodedHex = function () {
            return (
              this.tlv ||
                ((this.v = this.getValue()),
                (this.l = this.getLength()),
                (this.tlv = this.t + this.l + this.v)),
              this.tlv
            );
          }),
          (t.prototype.getLength = function () {
            var t = this.v.length / 2,
              e = t.toString(16);
            return (
              e.length % 2 == 1 && (e = "0" + e),
              t < 128 ? e : (128 + e.length / 2).toString(16) + e
            );
          }),
          (t.prototype.getValue = function () {
            return "";
          }),
          t
        );
      })(),
      l = (function (t) {
        function e(r) {
          u(this, e);
          var n = i(this, t.call(this));
          return (
            (n.t = "02"),
            r &&
              (n.v = (function (t) {
                var e = t.toString(16);
                if ("-" !== e[0])
                  e.length % 2 == 1
                    ? (e = "0" + e)
                    : e.match(/^[0-7]/) || (e = "00" + e);
                else {
                  var r = (e = e.substr(1)).length;
                  r % 2 == 1 ? (r += 1) : e.match(/^[0-7]/) || (r += 2);
                  for (var n = "", i = 0; i < r; i++) n += "f";
                  e = (e = (n = new s(n, 16)).xor(t).add(s.ONE))
                    .toString(16)
                    .replace(/^-/, "");
                }
                return e;
              })(r)),
            n
          );
        }
        return (
          o(e, t),
          (e.prototype.getValue = function () {
            return this.v;
          }),
          e
        );
      })(a),
      c = (function (t) {
        function e(r) {
          u(this, e);
          var n = i(this, t.call(this));
          return (n.t = "30"), (n.asn1Array = r), n;
        }
        return (
          o(e, t),
          (e.prototype.getValue = function () {
            return (
              (this.v = this.asn1Array
                .map(function (t) {
                  return t.getEncodedHex();
                })
                .join("")),
              this.v
            );
          }),
          e
        );
      })(a);
    function f(t, e) {
      return +t[e + 2] < 8 ? 1 : 128 & +t.substr(e + 2, 2);
    }
    function h(t, e) {
      var r = f(t, e),
        n = t.substr(e + 2, 2 * r);
      return n
        ? (+n[0] < 8 ? new s(n, 16) : new s(n.substr(2), 16)).intValue()
        : -1;
    }
    function g(t, e) {
      return e + 2 * (f(t, e) + 1);
    }
    e.exports = {
      encodeDer: function (t, e) {
        var r = new l(t),
          n = new l(e);
        return new c([r, n]).getEncodedHex();
      },
      decodeDer: function (t) {
        var e = g(t, 0),
          r = g(t, e),
          n = h(t, e),
          i = t.substr(r, 2 * n),
          o = r + i.length,
          u = g(t, o),
          a = h(t, o),
          l = t.substr(u, 2 * a);
        return { r: new s(i, 16), s: new s(l, 16) };
      },
    };
  },
  function (t, e, r) {
    var n = r(0),
      i = n.BigInteger,
      o = n.SecureRandom,
      u = r(6).ECCurveFp,
      s = new o(),
      a = h(),
      l = a.curve,
      c = a.G,
      f = a.n;
    function h() {
      var t = new i(
          "FFFFFFFEFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF00000000FFFFFFFFFFFFFFFF",
          16
        ),
        e = new i(
          "FFFFFFFEFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF00000000FFFFFFFFFFFFFFFC",
          16
        ),
        r = new i(
          "28E9FA9E9D9F5E344D5A9E4BCF6509A7F39789F515AB8F92DDBCBD414D940E93",
          16
        ),
        n = new u(t, e, r),
        o = n.decodePointHex(
          "0432C4AE2C1F1981195F9904466A39C9948FE30BBFF2660BE1715A4589334C74C7BC3736A2F4F6779C59BDCEE36B692153D0A9877CC62A474002DF32E52139F0A0"
        );
      return {
        curve: n,
        G: o,
        n: new i(
          "FFFFFFFEFFFFFFFFFFFFFFFFFFFFFFFF7203DF6B21C6052B53BBF40939D54123",
          16
        ),
      };
    }
    function g(t, e) {
      return t.length >= e ? t : new Array(e - t.length + 1).join("0") + t;
    }
    t.exports = {
      getGlobalCurve: function () {
        return l;
      },
      generateEcparam: h,
      generateKeyPairHex: function (t, e, r) {
        var n = (t ? new i(t, e, r) : new i(f.bitLength(), s))
            .mod(f.subtract(i.ONE))
            .add(i.ONE),
          o = g(n.toString(16), 64),
          u = c.multiply(n);
        return {
          privateKey: o,
          publicKey:
            "04" +
            g(u.getX().toBigInteger().toString(16), 64) +
            g(u.getY().toBigInteger().toString(16), 64),
        };
      },
      utf8ToHex: function (t) {
        for (
          var e = (t = unescape(encodeURIComponent(t))).length, r = [], n = 0;
          n < e;
          n++
        )
          r[n >>> 2] |= (255 & t.charCodeAt(n)) << (24 - (n % 4) * 8);
        for (var i = [], o = 0; o < e; o++) {
          var u = (r[o >>> 2] >>> (24 - (o % 4) * 8)) & 255;
          i.push((u >>> 4).toString(16)), i.push((15 & u).toString(16));
        }
        return i.join("");
      },
      leftPad: g,
      arrayToHex: function (t) {
        return t
          .map(function (t) {
            return 1 === (t = t.toString(16)).length ? "0" + t : t;
          })
          .join("");
      },
      arrayToUtf8: function (t) {
        for (var e = [], r = 0, n = 0; n < 2 * t.length; n += 2)
          (e[n >>> 3] |= parseInt(t[r], 10) << (24 - (n % 8) * 4)), r++;
        try {
          for (var i = [], o = 0; o < t.length; o++) {
            var u = (e[o >>> 2] >>> (24 - (o % 4) * 8)) & 255;
            i.push(String.fromCharCode(u));
          }
          return decodeURIComponent(escape(i.join("")));
        } catch (t) {
          throw new Error("Malformed UTF-8 data");
        }
      },
      hexToArray: function (t) {
        var e = [],
          r = t.length;
        r % 2 != 0 && (t = g(t, r + 1)), (r = t.length);
        for (var n = 0; n < r; n += 2) e.push(parseInt(t.substr(n, 2), 16));
        return e;
      },
      verifyPublicKey: function (t) {
        var e = l.decodePointHex(t);
        if (!e) return !1;
        var r = e.getX();
        return e
          .getY()
          .square()
          .equals(r.multiply(r.square()).add(r.multiply(l.a)).add(l.b));
      },
    };
  },
  function (t, e, r) {
    function n(t, e) {
      if (!(t instanceof e))
        throw new TypeError("Cannot call a class as a function");
    }
    var i = r(0).BigInteger,
      o = new i("3"),
      u = (function () {
        function t(e, r) {
          n(this, t), (this.x = r), (this.q = e);
        }
        return (
          (t.prototype.equals = function (t) {
            return t === this || (this.q.equals(t.q) && this.x.equals(t.x));
          }),
          (t.prototype.toBigInteger = function () {
            return this.x;
          }),
          (t.prototype.negate = function () {
            return new t(this.q, this.x.negate().mod(this.q));
          }),
          (t.prototype.add = function (e) {
            return new t(this.q, this.x.add(e.toBigInteger()).mod(this.q));
          }),
          (t.prototype.subtract = function (e) {
            return new t(this.q, this.x.subtract(e.toBigInteger()).mod(this.q));
          }),
          (t.prototype.multiply = function (e) {
            return new t(this.q, this.x.multiply(e.toBigInteger()).mod(this.q));
          }),
          (t.prototype.divide = function (e) {
            return new t(
              this.q,
              this.x.multiply(e.toBigInteger().modInverse(this.q)).mod(this.q)
            );
          }),
          (t.prototype.square = function () {
            return new t(this.q, this.x.square().mod(this.q));
          }),
          t
        );
      })(),
      s = (function () {
        function t(e, r, o, u) {
          n(this, t),
            (this.curve = e),
            (this.x = r),
            (this.y = o),
            (this.z = null == u ? i.ONE : u),
            (this.zinv = null);
        }
        return (
          (t.prototype.getX = function () {
            return (
              null === this.zinv &&
                (this.zinv = this.z.modInverse(this.curve.q)),
              this.curve.fromBigInteger(
                this.x.toBigInteger().multiply(this.zinv).mod(this.curve.q)
              )
            );
          }),
          (t.prototype.getY = function () {
            return (
              null === this.zinv &&
                (this.zinv = this.z.modInverse(this.curve.q)),
              this.curve.fromBigInteger(
                this.y.toBigInteger().multiply(this.zinv).mod(this.curve.q)
              )
            );
          }),
          (t.prototype.equals = function (t) {
            return (
              t === this ||
              (this.isInfinity()
                ? t.isInfinity()
                : t.isInfinity()
                ? this.isInfinity()
                : !!t.y
                    .toBigInteger()
                    .multiply(this.z)
                    .subtract(this.y.toBigInteger().multiply(t.z))
                    .mod(this.curve.q)
                    .equals(i.ZERO) &&
                  t.x
                    .toBigInteger()
                    .multiply(this.z)
                    .subtract(this.x.toBigInteger().multiply(t.z))
                    .mod(this.curve.q)
                    .equals(i.ZERO))
            );
          }),
          (t.prototype.isInfinity = function () {
            return (
              (null === this.x && null === this.y) ||
              (this.z.equals(i.ZERO) && !this.y.toBigInteger().equals(i.ZERO))
            );
          }),
          (t.prototype.negate = function () {
            return new t(this.curve, this.x, this.y.negate(), this.z);
          }),
          (t.prototype.add = function (e) {
            if (this.isInfinity()) return e;
            if (e.isInfinity()) return this;
            var r = this.x.toBigInteger(),
              n = this.y.toBigInteger(),
              o = this.z,
              u = e.x.toBigInteger(),
              s = e.y.toBigInteger(),
              a = e.z,
              l = this.curve.q,
              c = r.multiply(a).mod(l),
              f = u.multiply(o).mod(l),
              h = c.subtract(f),
              g = n.multiply(a).mod(l),
              p = s.multiply(o).mod(l),
              v = g.subtract(p);
            if (i.ZERO.equals(h))
              return i.ZERO.equals(v) ? this.twice() : this.curve.infinity;
            var d = c.add(f),
              y = o.multiply(a).mod(l),
              F = h.square().mod(l),
              m = h.multiply(F).mod(l),
              b = y.multiply(v.square()).subtract(d.multiply(F)).mod(l),
              w = h.multiply(b).mod(l),
              x = v
                .multiply(F.multiply(c).subtract(b))
                .subtract(g.multiply(m))
                .mod(l),
              I = m.multiply(y).mod(l);
            return new t(
              this.curve,
              this.curve.fromBigInteger(w),
              this.curve.fromBigInteger(x),
              I
            );
          }),
          (t.prototype.twice = function () {
            if (this.isInfinity()) return this;
            if (!this.y.toBigInteger().signum()) return this.curve.infinity;
            var e = this.x.toBigInteger(),
              r = this.y.toBigInteger(),
              n = this.z,
              i = this.curve.q,
              u = this.curve.a.toBigInteger(),
              s = e.square().multiply(o).add(u.multiply(n.square())).mod(i),
              a = r.shiftLeft(1).multiply(n).mod(i),
              l = r.square().mod(i),
              c = l.multiply(e).multiply(n).mod(i),
              f = a.square().mod(i),
              h = s.square().subtract(c.shiftLeft(3)).mod(i),
              g = a.multiply(h).mod(i),
              p = s
                .multiply(c.shiftLeft(2).subtract(h))
                .subtract(f.shiftLeft(1).multiply(l))
                .mod(i),
              v = a.multiply(f).mod(i);
            return new t(
              this.curve,
              this.curve.fromBigInteger(g),
              this.curve.fromBigInteger(p),
              v
            );
          }),
          (t.prototype.multiply = function (t) {
            if (this.isInfinity()) return this;
            if (!t.signum()) return this.curve.infinity;
            for (
              var e = t.multiply(o),
                r = this.negate(),
                n = this,
                i = e.bitLength() - 2;
              i > 0;
              i--
            ) {
              n = n.twice();
              var u = e.testBit(i);
              u !== t.testBit(i) && (n = n.add(u ? this : r));
            }
            return n;
          }),
          t
        );
      })(),
      a = (function () {
        function t(e, r, i) {
          n(this, t),
            (this.q = e),
            (this.a = this.fromBigInteger(r)),
            (this.b = this.fromBigInteger(i)),
            (this.infinity = new s(this, null, null));
        }
        return (
          (t.prototype.equals = function (t) {
            return (
              t === this ||
              (this.q.equals(t.q) && this.a.equals(t.a) && this.b.equals(t.b))
            );
          }),
          (t.prototype.fromBigInteger = function (t) {
            return new u(this.q, t);
          }),
          (t.prototype.decodePointHex = function (t) {
            switch (parseInt(t.substr(0, 2), 16)) {
              case 0:
                return this.infinity;
              case 2:
              case 3:
                return null;
              case 4:
              case 6:
              case 7:
                var e = (t.length - 2) / 2,
                  r = t.substr(2, e),
                  n = t.substr(e + 2, e);
                return new s(
                  this,
                  this.fromBigInteger(new i(r, 16)),
                  this.fromBigInteger(new i(n, 16))
                );
              default:
                return null;
            }
          }),
          t
        );
      })();
    t.exports = { ECPointFp: s, ECCurveFp: a };
  },
  function (t, e, r) {
    var n = r(1),
      i = n.sm3,
      o = n.hmac;
    function u(t) {
      return t
        .map(function (t) {
          return 1 === (t = t.toString(16)).length ? "0" + t : t;
        })
        .join("");
    }
    function s(t) {
      var e,
        r,
        n = [],
        i = t.length;
      i % 2 != 0 &&
        ((r = i + 1),
        (t =
          (e = t).length >= r ? e : new Array(r - e.length + 1).join("0") + e)),
        (i = t.length);
      for (var o = 0; o < i; o += 2) n.push(parseInt(t.substr(o, 2), 16));
      return n;
    }
    t.exports = function (t, e) {
      if (
        ((t =
          "string" == typeof t
            ? (function (t) {
                for (var e = [], r = 0, n = t.length; r < n; r++) {
                  var i = t.codePointAt(r);
                  if (i <= 127) e.push(i);
                  else if (i <= 2047)
                    e.push(192 | (i >>> 6)), e.push(128 | (63 & i));
                  else if (i <= 55295 || (i >= 57344 && i <= 65535))
                    e.push(224 | (i >>> 12)),
                      e.push(128 | ((i >>> 6) & 63)),
                      e.push(128 | (63 & i));
                  else {
                    if (!(i >= 65536 && i <= 1114111))
                      throw (e.push(i), new Error("input is not supported"));
                    r++,
                      e.push(240 | ((i >>> 18) & 28)),
                      e.push(128 | ((i >>> 12) & 63)),
                      e.push(128 | ((i >>> 6) & 63)),
                      e.push(128 | (63 & i));
                  }
                }
                return e;
              })(t)
            : Array.prototype.slice.call(t)),
        e)
      ) {
        if ("hmac" !== (e.mode || "hmac")) throw new Error("invalid mode");
        var r = e.key;
        if (!r) throw new Error("invalid key");
        return (
          (r = "string" == typeof r ? s(r) : Array.prototype.slice.call(r)),
          u(o(t, r))
        );
      }
      return u(i(t));
    };
  },
  function (t, e, r) {
    var n = [
        214, 144, 233, 254, 204, 225, 61, 183, 22, 182, 20, 194, 40, 251, 44, 5,
        43, 103, 154, 118, 42, 190, 4, 195, 170, 68, 19, 38, 73, 134, 6, 153,
        156, 66, 80, 244, 145, 239, 152, 122, 51, 84, 11, 67, 237, 207, 172, 98,
        228, 179, 28, 169, 201, 8, 232, 149, 128, 223, 148, 250, 117, 143, 63,
        166, 71, 7, 167, 252, 243, 115, 23, 186, 131, 89, 60, 25, 230, 133, 79,
        168, 104, 107, 129, 178, 113, 100, 218, 139, 248, 235, 15, 75, 112, 86,
        157, 53, 30, 36, 14, 94, 99, 88, 209, 162, 37, 34, 124, 59, 1, 33, 120,
        135, 212, 0, 70, 87, 159, 211, 39, 82, 76, 54, 2, 231, 160, 196, 200,
        158, 234, 191, 138, 210, 64, 199, 56, 181, 163, 247, 242, 206, 249, 97,
        21, 161, 224, 174, 93, 164, 155, 52, 26, 85, 173, 147, 50, 48, 245, 140,
        177, 227, 29, 246, 226, 46, 130, 102, 202, 96, 192, 41, 35, 171, 13, 83,
        78, 111, 213, 219, 55, 69, 222, 253, 142, 47, 3, 255, 106, 114, 109,
        108, 91, 81, 141, 27, 175, 146, 187, 221, 188, 127, 17, 217, 92, 65, 31,
        16, 90, 216, 10, 193, 49, 136, 165, 205, 123, 189, 45, 116, 208, 18,
        184, 229, 180, 176, 137, 105, 151, 74, 12, 150, 119, 126, 101, 185, 241,
        9, 197, 110, 198, 132, 24, 240, 125, 236, 58, 220, 77, 32, 121, 238, 95,
        62, 215, 203, 57, 72,
      ],
      i = [
        462357, 472066609, 943670861, 1415275113, 1886879365, 2358483617,
        2830087869, 3301692121, 3773296373, 4228057617, 404694573, 876298825,
        1347903077, 1819507329, 2291111581, 2762715833, 3234320085, 3705924337,
        4177462797, 337322537, 808926789, 1280531041, 1752135293, 2223739545,
        2695343797, 3166948049, 3638552301, 4110090761, 269950501, 741554753,
        1213159005, 1684763257,
      ];
    function o(t) {
      for (var e = [], r = 0, n = t.length; r < n; r += 2)
        e.push(parseInt(t.substr(r, 2), 16));
      return e;
    }
    function u(t) {
      return t
        .map(function (t) {
          return 1 === (t = t.toString(16)).length ? "0" + t : t;
        })
        .join("");
    }
    function s(t) {
      for (var e = [], r = 0, n = t.length; r < n; r++) {
        var i = t.codePointAt(r);
        if (i <= 127) e.push(i);
        else if (i <= 2047) e.push(192 | (i >>> 6)), e.push(128 | (63 & i));
        else if (i <= 55295 || (i >= 57344 && i <= 65535))
          e.push(224 | (i >>> 12)),
            e.push(128 | ((i >>> 6) & 63)),
            e.push(128 | (63 & i));
        else {
          if (!(i >= 65536 && i <= 1114111))
            throw (e.push(i), new Error("input is not supported"));
          r++,
            e.push(240 | ((i >>> 18) & 28)),
            e.push(128 | ((i >>> 12) & 63)),
            e.push(128 | ((i >>> 6) & 63)),
            e.push(128 | (63 & i));
        }
      }
      return e;
    }
    function a(t) {
      for (var e = [], r = 0, n = t.length; r < n; r++)
        t[r] >= 240 && t[r] <= 247
          ? (e.push(
              String.fromCodePoint(
                ((7 & t[r]) << 18) +
                  ((63 & t[r + 1]) << 12) +
                  ((63 & t[r + 2]) << 6) +
                  (63 & t[r + 3])
              )
            ),
            (r += 3))
          : t[r] >= 224 && t[r] <= 239
          ? (e.push(
              String.fromCodePoint(
                ((15 & t[r]) << 12) + ((63 & t[r + 1]) << 6) + (63 & t[r + 2])
              )
            ),
            (r += 2))
          : t[r] >= 192 && t[r] <= 223
          ? (e.push(String.fromCodePoint(((31 & t[r]) << 6) + (63 & t[r + 1]))),
            r++)
          : e.push(String.fromCodePoint(t[r]));
      return e.join("");
    }
    function l(t, e) {
      return (t << e) | (t >>> (32 - e));
    }
    function c(t) {
      return (
        ((255 & n[(t >>> 24) & 255]) << 24) |
        ((255 & n[(t >>> 16) & 255]) << 16) |
        ((255 & n[(t >>> 8) & 255]) << 8) |
        (255 & n[255 & t])
      );
    }
    function f(t) {
      return t ^ l(t, 2) ^ l(t, 10) ^ l(t, 18) ^ l(t, 24);
    }
    function h(t) {
      return t ^ l(t, 13) ^ l(t, 23);
    }
    function g(t, e, r) {
      for (var n = new Array(4), i = new Array(4), o = 0; o < 4; o++)
        (i[0] = 255 & t[4 * o]),
          (i[1] = 255 & t[4 * o + 1]),
          (i[2] = 255 & t[4 * o + 2]),
          (i[3] = 255 & t[4 * o + 3]),
          (n[o] = (i[0] << 24) | (i[1] << 16) | (i[2] << 8) | i[3]);
      for (var u, s = 0; s < 32; s += 4)
        (u = n[1] ^ n[2] ^ n[3] ^ r[s + 0]),
          (n[0] ^= f(c(u))),
          (u = n[2] ^ n[3] ^ n[0] ^ r[s + 1]),
          (n[1] ^= f(c(u))),
          (u = n[3] ^ n[0] ^ n[1] ^ r[s + 2]),
          (n[2] ^= f(c(u))),
          (u = n[0] ^ n[1] ^ n[2] ^ r[s + 3]),
          (n[3] ^= f(c(u)));
      for (var a = 0; a < 16; a += 4)
        (e[a] = (n[3 - a / 4] >>> 24) & 255),
          (e[a + 1] = (n[3 - a / 4] >>> 16) & 255),
          (e[a + 2] = (n[3 - a / 4] >>> 8) & 255),
          (e[a + 3] = 255 & n[3 - a / 4]);
    }
    function p(t, e, r) {
      for (var n = new Array(4), o = new Array(4), u = 0; u < 4; u++)
        (o[0] = 255 & t[0 + 4 * u]),
          (o[1] = 255 & t[1 + 4 * u]),
          (o[2] = 255 & t[2 + 4 * u]),
          (o[3] = 255 & t[3 + 4 * u]),
          (n[u] = (o[0] << 24) | (o[1] << 16) | (o[2] << 8) | o[3]);
      (n[0] ^= 2746333894),
        (n[1] ^= 1453994832),
        (n[2] ^= 1736282519),
        (n[3] ^= 2993693404);
      for (var s, a = 0; a < 32; a += 4)
        (s = n[1] ^ n[2] ^ n[3] ^ i[a + 0]),
          (e[a + 0] = n[0] ^= h(c(s))),
          (s = n[2] ^ n[3] ^ n[0] ^ i[a + 1]),
          (e[a + 1] = n[1] ^= h(c(s))),
          (s = n[3] ^ n[0] ^ n[1] ^ i[a + 2]),
          (e[a + 2] = n[2] ^= h(c(s))),
          (s = n[0] ^ n[1] ^ n[2] ^ i[a + 3]),
          (e[a + 3] = n[3] ^= h(c(s)));
      if (0 === r)
        for (var l, f = 0; f < 16; f++)
          (l = e[f]), (e[f] = e[31 - f]), (e[31 - f] = l);
    }
    function v(t, e, r) {
      var n =
          arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
        i = n.padding,
        l = void 0 === i ? "pkcs#7" : i,
        c = n.mode,
        f = n.iv,
        h = void 0 === f ? [] : f,
        v = n.output,
        d = void 0 === v ? "string" : v;
      if ("cbc" === c && ("string" == typeof h && (h = o(h)), 16 !== h.length))
        throw new Error("iv is invalid");
      if (("string" == typeof e && (e = o(e)), 16 !== e.length))
        throw new Error("key is invalid");
      if (
        ((t = "string" == typeof t ? (0 !== r ? s(t) : o(t)) : [].concat(t)),
        ("pkcs#5" === l || "pkcs#7" === l) && 0 !== r)
      )
        for (var y = 16 - (t.length % 16), F = 0; F < y; F++) t.push(y);
      var m = new Array(32);
      p(e, m, r);
      for (var b = [], w = h, x = t.length, I = 0; x >= 16; ) {
        var B = t.slice(I, I + 16),
          q = new Array(16);
        if ("cbc" === c) for (var E = 0; E < 16; E++) 0 !== r && (B[E] ^= w[E]);
        g(B, q, m);
        for (var P = 0; P < 16; P++)
          "cbc" === c && 0 === r && (q[P] ^= w[P]), (b[I + P] = q[P]);
        "cbc" === c && (w = 0 !== r ? q : B), (x -= 16), (I += 16);
      }
      if (("pkcs#5" === l || "pkcs#7" === l) && 0 === r) {
        for (var A = b.length, C = b[A - 1], S = 1; S <= C; S++)
          if (b[A - S] !== C) throw new Error("padding is invalid");
        b.splice(A - C, C);
      }
      return "array" !== d ? (0 !== r ? u(b) : a(b)) : b;
    }
    t.exports = {
      encrypt: function (t, e, r) {
        return v(t, e, 1, r);
      },
      decrypt: function (t, e, r) {
        return v(t, e, 0, r);
      },
    };
  },
]);
