var t = require("../createClass"),
  r = require("../classCallCheck"),
  s = require("./64js.min.js"),
  i = require("./util"),
  n = t(function t() {
    r(this, t),
      (this.mode = 1),
      (this.isPadding = !0),
      (this.sk = new Array(32));
  }),
  e = t(function t() {
    r(this, t), (this.SM4_ENCRYPT = 1), (this.SM4_DECRYPT = 0);
    var s = [
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
      i = [2746333894, 1453994832, 1736282519, 2993693404],
      n = [
        462357, 472066609, 943670861, 1415275113, 1886879365, 2358483617,
        2830087869, 3301692121, 3773296373, 4228057617, 404694573, 876298825,
        1347903077, 1819507329, 2291111581, 2762715833, 3234320085, 3705924337,
        4177462797, 337322537, 808926789, 1280531041, 1752135293, 2223739545,
        2695343797, 3166948049, 3638552301, 4110090761, 269950501, 741554753,
        1213159005, 1684763257,
      ];
    (this.GET_ULONG_BE = function (t, r) {
      return (
        ((255 & t[r]) << 24) |
        ((255 & t[r + 1]) << 16) |
        ((255 & t[r + 2]) << 8) |
        (255 & t[r + 3])
      );
    }),
      (this.PUT_ULONG_BE = function (t, r, s) {
        var i = 255 & (t >> 24),
          n = 255 & (t >> 16),
          e = 255 & (t >> 8),
          h = 255 & t;
        (r[s] = i > 128 ? i - 256 : i),
          (r[s + 1] = n > 128 ? n - 256 : n),
          (r[s + 2] = e > 128 ? e - 256 : e),
          (r[s + 3] = h > 128 ? h - 256 : h);
      }),
      (this.SHL = function (t, r) {
        return (4294967295 & t) << r;
      }),
      (this.ROTL = function (t, r) {
        this.SHL(t, r);
        return this.SHL(t, r) | (t >> (32 - r));
      }),
      (this.sm4Lt = function (t) {
        var r,
          s = new Array(4),
          i = new Array(4);
        return (
          this.PUT_ULONG_BE(t, s, 0),
          (i[0] = this.sm4Sbox(s[0])),
          (i[1] = this.sm4Sbox(s[1])),
          (i[2] = this.sm4Sbox(s[2])),
          (i[3] = this.sm4Sbox(s[3])),
          (r = this.GET_ULONG_BE(i, 0)) ^
            this.ROTL(r, 2) ^
            this.ROTL(r, 10) ^
            this.ROTL(r, 18) ^
            this.ROTL(r, 24)
        );
      }),
      (this.sm4F = function (t, r, s, i, n) {
        return t ^ this.sm4Lt(r ^ s ^ i ^ n);
      }),
      (this.sm4CalciRK = function (t) {
        var r,
          s = new Array(4),
          i = new Array(4);
        return (
          this.PUT_ULONG_BE(t, s, 0),
          (i[0] = this.sm4Sbox(s[0])),
          (i[1] = this.sm4Sbox(s[1])),
          (i[2] = this.sm4Sbox(s[2])),
          (i[3] = this.sm4Sbox(s[3])),
          (r = this.GET_ULONG_BE(i, 0)) ^ this.ROTL(r, 13) ^ this.ROTL(r, 23)
        );
      }),
      (this.sm4Sbox = function (t) {
        var r = s[255 & t];
        return r > 128 ? r - 256 : r;
      }),
      (this.sey_ec = function (t, r) {
        return null == t
          ? (alert("ctx is null!"), !1)
          : null == r || 16 != r.length
          ? (alert("key error!"), !1)
          : ((t.mode = this.SM4_ENCRYPT), void this.sm4_setkey(t.sk, r));
      }),
      (this.sm4_setkey = function (t, r) {
        var s = new Array(4),
          e = new Array(36),
          h = 0;
        (s[0] = this.GET_ULONG_BE(r, 0)),
          (s[1] = this.GET_ULONG_BE(r, 4)),
          (s[2] = this.GET_ULONG_BE(r, 8)),
          (s[3] = this.GET_ULONG_BE(r, 12)),
          (e[0] = s[0] ^ i[0]),
          (e[1] = s[1] ^ i[1]),
          (e[2] = s[2] ^ i[2]),
          (e[3] = s[3] ^ i[3]);
        for (h = 0; h < 32; h++)
          (e[h + 4] =
            e[h] ^ this.sm4CalciRK(e[h + 1] ^ e[h + 2] ^ e[h + 3] ^ n[h])),
            (t[h] = e[h + 4]);
      }),
      (this.padding = function (t, r) {
        if (null == t) return null;
        var s = null;
        if (r == this.SM4_ENCRYPT) {
          var i = parseInt(16 - (t.length % 16));
          s = t.slice(0);
          for (var n = 0; n < i; n++) s[t.length + n] = i;
        } else {
          i = t[t.length - 1];
          s = t.slice(0, t.length - i);
        }
        return s;
      }),
      (this.sm4_one_round = function (t, r, s) {
        var i = 0,
          n = new Array(36);
        for (
          n[0] = this.GET_ULONG_BE(r, 0),
            n[1] = this.GET_ULONG_BE(r, 4),
            n[2] = this.GET_ULONG_BE(r, 8),
            n[3] = this.GET_ULONG_BE(r, 12);
          i < 32;

        )
          (n[i + 4] = this.sm4F(n[i], n[i + 1], n[i + 2], n[i + 3], t[i])), i++;
        this.PUT_ULONG_BE(n[35], s, 0),
          this.PUT_ULONG_BE(n[34], s, 4),
          this.PUT_ULONG_BE(n[33], s, 8),
          this.PUT_ULONG_BE(n[32], s, 12);
      }),
      (this.sm4_crypt_ecb = function (t, r) {
        null == r && alert("input is null!"),
          t.isPadding &&
            t.mode == this.SM4_ENCRYPT &&
            (r = this.padding(r, this.SM4_ENCRYPT));
        for (var s = 0, i = r.length, n = new Array(); i > 0; i -= 16) {
          var e = new Array(16),
            h = r.slice(16 * s, 16 * (s + 1));
          this.sm4_one_round(t.sk, h, e), (n = n.concat(e)), s++;
        }
        var o = n;
        t.isPadding &&
          t.mode == this.SM4_DECRYPT &&
          (o = this.padding(o, this.SM4_DECRYPT));
        for (s = 0; s < o.length; s++) o[s] < 0 && (o[s] = o[s] + 256);
        return o;
      }),
      (this.st_cc = function (t, r, s) {
        (null != r && 16 == r.length) || alert("iv error!"),
          null == s && alert("input is null!"),
          t.isPadding &&
            t.mode == this.SM4_ENCRYPT &&
            (s = this.padding(s, this.SM4_ENCRYPT));
        var i = 0,
          n = s.length,
          e = new Array();
        if (t.mode == this.SM4_ENCRYPT)
          for (var h = 0; n > 0; n -= 16) {
            var o = new Array(16),
              a = new Array(16),
              u = s.slice(16 * h, 16 * (h + 1));
            for (i = 0; i < 16; i++) o[i] = u[i] ^ r[i];
            this.sm4_one_round(t.sk, o, a),
              (r = a.slice(0, 16)),
              (e = e.concat(a)),
              h++;
          }
        else {
          var l = [];
          for (h = 0; n > 0; n -= 16) {
            (o = new Array(16)), (a = new Array(16));
            for (
              l = (u = s.slice(16 * h, 16 * (h + 1))).slice(0, 16),
                sm4_one_round(t.sk, u, o),
                i = 0;
              i < 16;
              i++
            )
              a[i] = o[i] ^ r[i];
            (r = l.slice(0, 16)), (e = e.concat(a)), h++;
          }
        }
        var _ = e;
        t.isPadding &&
          t.mode == this.SM4_DECRYPT &&
          (_ = this.padding(_, this.SM4_DECRYPT));
        for (i = 0; i < _.length; i++) _[i] < 0 && (_[i] = _[i] + 256);
        return _;
      });
  }),
  h = new (t(function t() {
    r(this, t),
      (this.seey = i.get41()),
      (this.ivr = i.get4i()),
      (this.hexString = !0),
      (this.stringToByte1 = function (t) {
        var r,
          s,
          i = new Array();
        r = t.length;
        for (var n = 0; n < r; n++)
          (s = t.charCodeAt(n)) >= 65536 && s <= 1114111
            ? (i.push(((s >> 18) & 7) | 240),
              i.push(((s >> 12) & 63) | 128),
              i.push(((s >> 6) & 63) | 128),
              i.push((63 & s) | 128))
            : s >= 2048 && s <= 65535
            ? (i.push(((s >> 12) & 15) | 224),
              i.push(((s >> 6) & 63) | 128),
              i.push((63 & s) | 128))
            : s >= 128 && s <= 2047
            ? (i.push(((s >> 6) & 31) | 192), i.push((63 & s) | 128))
            : i.push(255 & s);
        for (var e = new Array(), h = 0; h < i.length; h++) {
          var o = i[h];
          e[h] = o - 256;
        }
        return e;
      }),
      (this.byteToHex = function (t) {
        for (var r = "", s = "", i = 0; i < t.length; i++) {
          1 === (s = (255 & t[i]).toString(16)).length
            ? (r = r + "0" + s)
            : (r += s);
        }
        return r.toUpperCase();
      }),
      (this.ea_CBC = function (t) {
        try {
          var r = new e(),
            i = new n();
          (i.isPadding = !0), (i.mode = r.SM4_ENCRYPT);
          var h = this.hexStringToBytes(this.seey),
            o = this.hexStringToBytes(this.ivr);
          r.sey_ec(i, h);
          var a = this.stringToByte1(t),
            u = r.st_cc(i, o, a),
            l = this.byteToHex(u),
            _ = this.stringToByte(l),
            c = s.fromByteArray(_);
          return (
            null != c &&
              c.trim().length > 0 &&
              c.replace(/(\s*|\t|\r|\n)/g, ""),
            c
          );
        } catch (t) {
          return null;
        }
      }),
      (this.hexStringToBytes = function (t) {
        if (null == t || "" === t) return null;
        for (
          var r = ((t = t.toUpperCase()).length / 2) | 0,
            s = t.split(""),
            i = new Array(),
            n = 0;
          n < r;
          n++
        ) {
          var e = 2 * n,
            h = s[e];
          this.charToByte(h);
          i[n] = this.intToByte(
            (this.charToByte(s[e]) << 4) | this.charToByte(s[e + 1]) | 0
          );
        }
        return i;
      }),
      (this.charToByte = function (t) {
        return 0 | "0123456789ABCDEF".indexOf(t);
      }),
      (this.intToByte = function (t) {
        var r = 255 & t;
        return r >= 128 ? -1 * (128 - (r % 128)) : r;
      }),
      (this.stringToByte = function (t) {
        var r,
          s,
          i = new Array();
        r = t.length;
        for (var n = 0; n < r; n++)
          (s = t.charCodeAt(n)) >= 65536 && s <= 1114111
            ? (i.push(((s >> 18) & 7) | 240),
              i.push(((s >> 12) & 63) | 128),
              i.push(((s >> 6) & 63) | 128),
              i.push((63 & s) | 128))
            : s >= 2048 && s <= 65535
            ? (i.push(((s >> 12) & 15) | 224),
              i.push(((s >> 6) & 63) | 128),
              i.push((63 & s) | 128))
            : s >= 128 && s <= 2047
            ? (i.push(((s >> 6) & 31) | 192), i.push((63 & s) | 128))
            : i.push(255 & s);
        return i;
      }),
      (this.byteToString = function (t) {
        if ("string" == typeof t) return t;
        for (var r = "", s = t, i = 0; i < s.length; i++) {
          var n = s[i].toString(2),
            e = n.match(/^1+?(?=0)/);
          if (e && 8 == n.length) {
            for (
              var h = e[0].length, o = s[i].toString(2).slice(7 - h), a = 1;
              a < h;
              a++
            )
              o += s[a + i].toString(2).slice(2);
            (r += String.fromCharCode(parseInt(o, 2))), (i += h - 1);
          } else r += String.fromCharCode(s[i]);
        }
        return r;
      });
  }))();
module.exports = { a4: h };
