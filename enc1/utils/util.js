var e = require("../@babel/runtime/helpers/objectSpread2"),
  t = require("../@babel/runtime/helpers/objectWithoutProperties"),
  n = ["position_name"],
  r = require("./log"),
  s = require("./allconst"),
  o = (getApp(), require("miniprogram-sm-crypto")),
  a = function (e) {
    return e.toString();
  },
  i = function (e) {
    return void 0 === e || null == e || "" == e;
  },
  c = 0;
module.exports = e(
  e(
    {
      formatTime: function (e) {
        var t = e.getFullYear(),
          n = e.getMonth() + 1,
          r = e.getDate(),
          s = e.getHours(),
          o = e.getMinutes(),
          i = e.getSeconds();
        return (
          n < 10 && (n = "0" + n),
          r < 10 && (r = "0" + r),
          s < 10 && (s = "0" + s),
          o < 10 && (o = "0" + o),
          i < 10 && (i = "0" + i),
          [t, n, r].map(a).join("/") + " " + [s, o, i].map(a).join(":")
        );
      },
      isEmpty: i,
      showTipNoCancel: function (e, t, n) {
        wx.showModal({
          title: "提示",
          content: e,
          confirmText: t,
          showCancel: !1,
          confirmColor: "#0E9A6C",
          complete: function (e) {
            n();
          },
        });
      },
      isQuickClick: function () {
        var e = new Date(),
          t = e - c < 1e3;
        return (c = e), t;
      },
      indexFrom: {
        ECHARGEPROTOCOL: 1,
        USERPROTOCOL: 2,
        PRIVACYPROTOCOL: 3,
        ACTIVITYURL: 10,
      },
      sm2Enc: function (e) {
        var t = s.s2b1 + s.s2b2 + s.s2b3 + s.s2b4,
          n = o.sm2.doEncrypt(e, t);
        return "04".concat(n);
      },
      sm2Dec: function (e, t) {
        return (
          e.startsWith("04") && (e = e.substring(2)), o.sm2.doDecrypt(e, t)
        );
      },
      showTip: function (e, t, n) {
        wx.showModal({
          title: "提示",
          content: e,
          confirmText: t,
          cancelText: "取消",
          confirmColor: "#0E9A6C",
          cancelColor: "#999999",
          success: function (e) {
            e.confirm && n();
          },
        });
      },
      codeType: { RESETCODE: 6 },
      page: { PAGESIZE: 1 },
      isLogin: function () {
        var e = wx.getStorageSync("sessionId");
        return !i(e);
      },
      formatTimeSecond: function (e) {
        var t = e.getFullYear(),
          n = e.getMonth() + 1,
          r = e.getDate(),
          s = e.getHours(),
          o = e.getMinutes(),
          i = e.getSeconds();
        return (
          n < 10 && (n = "0" + n),
          r < 10 && (r = "0" + r),
          s < 10 && (s = "0" + s),
          o < 10 && (o = "0" + o),
          i < 10 && (i = "0" + i),
          [t, n, r].map(a).join("-") + " " + [s, o].map(a).join(":")
        );
      },
      toFix: function (e) {
        return i(e) ? "0.00" : (e = Number.parseFloat(e)).toFixed(2);
      },
      echargerType: {
        ACCOUNTONLINE: 160,
        SACNECHARGE: 161,
        CARDOFFLINE: 162,
        PLUGCHARGE: 163,
      },
      get2a: function () {
        return s.s2a1 + s.s2a2 + s.s2a3 + s.s2a4;
      },
      get41: function () {
        return s.s41 + s.s42 + s.s43 + s.s44;
      },
      get4i: function () {
        return s.s4i1 + s.s4i2 + s.s4i3;
      },
      loginStatus: { LOGIN_EFFICACY: 101 },
    },
    r
  ),
  {},
  {
    ToastType: {
      SUCCESS: "success",
      FAIL: "fail",
      NONE: "none",
      EXCEPTION: "expection",
    },
    checkID: function (e) {
      return !!(
        (function (e) {
          var t = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2],
            n = e.substring(17);
          if (
            /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(
              e
            )
          ) {
            for (var r = 0, s = 0; s < 17; s++) r += e[s] * t[s];
            if ([1, 0, "X", 9, 8, 7, 6, 5, 4, 3, 2][r % 11] == n.toUpperCase())
              return !0;
          }
          return !1;
        })(e) &&
        (function (e) {
          if (
            /^(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)$/.test(
              e
            )
          ) {
            var t = e.substring(0, 4),
              n = e.substring(4, 6),
              r = e.substring(6, 8),
              s = new Date(t + "-" + n + "-" + r);
            if (s && s.getMonth() == parseInt(n) - 1) return !0;
          }
          return !1;
        })(e.substring(6, 14)) &&
        (function (e) {
          if (
            /^[1-9][0-9]/.test(e) &&
            {
              11: "北京",
              12: "天津",
              13: "河北",
              14: "山西",
              15: "内蒙古",
              21: "辽宁",
              22: "吉林",
              23: "黑龙江 ",
              31: "上海",
              32: "江苏",
              33: "浙江",
              34: "安徽",
              35: "福建",
              36: "江西",
              37: "山东",
              41: "河南",
              42: "湖北 ",
              43: "湖南",
              44: "广东",
              45: "广西",
              46: "海南",
              50: "重庆",
              51: "四川",
              52: "贵州",
              53: "云南",
              54: "西藏 ",
              61: "陕西",
              62: "甘肃",
              63: "青海",
              64: "宁夏",
              65: "新疆",
              71: "台湾",
              81: "香港",
              82: "澳门",
            }[e]
          )
            return !0;
          return !1;
        })(e.substring(0, 2))
      );
    },
    image_upload_url:
      "https://alipaylite-test.ourval.com/echargeapi/external/uploadImage",
    showToast: function (e, t) {
      wx.showToast({ title: t, icon: e, duration: 2e3 });
    },
    showToastNone: function (e) {
      wx.showToast({
        type: "none",
        content: e,
        duration: 2e3,
        success: function () {},
      });
    },
    paserStationTypsStr: function (e) {
      var t = "--";
      switch (parseInt(e)) {
        case 0:
          t = "鲁能社会桩";
          break;
        case 1:
          t = "国网桩";
          break;
        case 7:
          t = "个人桩";
          break;
        case 8:
          t = "电插座";
          break;
        case 9:
          t = "互联互通";
          break;
        case 11:
          t = "即插即充";
          break;
        case 12:
          t = "苏创桩交流桩";
          break;
        case 13:
          t = "联行社会桩";
          break;
        case 14:
          t = "联行个人桩";
          break;
        case 15:
          t = "苏创交流桩即插即充";
          break;
        case 16:
          t = "苏创直流桩";
          break;
        case 17:
          t = "苏创直流";
          break;
        case 18:
          t = "专用站点";
          break;
        case 19:
          t = "联行社会桩";
          break;
        case 20:
          t = "互联互通-小菊";
          break;
        case 21:
          t = "物联自建";
          break;
        case 22:
          t = "物联社会桩(有序)";
          break;
        case 23:
          t = "物联联行桩";
          break;
        case 24:
          t = "个人桩";
          break;
        case 26:
          t = "国网后付费";
          break;
        default:
          t = "--";
      }
      return t;
    },
    requestSubscribeMessage: function (e, t, n, r) {
      wx.requestSubscribeMessage({
        tmplIds: [e],
        success: function (n) {
          "accept" == n[e]
            ? t()
            : (function (e, t) {
                wx.showModal({
                  title: "温馨提示",
                  content: t,
                  confirmText: "我知道了",
                  showCancel: !1,
                  confirmColor: "#0E9A6C",
                  complete: function () {
                    e();
                  },
                });
              })(t, r);
        },
        fail: function (e) {
          !(function (e, t) {
            wx.showModal({
              title: "温馨提示",
              content: t,
              confirmText: "去设置",
              cancelText: "取消",
              success: function (t) {
                t.confirm
                  ? wx.openSetting({ complete: function (e) {} })
                  : t.cancel && e();
              },
            });
          })(t, n);
        },
      });
    },
    getScreenWidth: function () {
      return getApp().systemInfo.screenWidth;
    },
    getUserInfo: function () {
      return JSON.parse(wx.getStorageSync("userInfo"));
    },
    evs_pageview: function (e) {
      var t = JSON.stringify(e),
        n = e.page_name;
      getApp().sensors.track("$pageview", {
        evs_page_info: t,
        evs_page_name: n,
      });
    },
    evs_click: function (e) {
      var r = e.position_name,
        s = t(e, n),
        o = JSON.stringify(s);
      getApp().sensors.track("$WebClick", {
        evs_position_info: o,
        evs_position_name: r,
      });
    },
    orderStatus: { UNPAY_ORDER: 1, FINISH_ORDER: 2 },
    orderType: {
      ORDER_TYPE_TIMEOUT: 1,
      ORDER_TYPE_ECHARGE: 2,
      ORDER_TYPE_ALL: 3,
    },
    businesstype: { CHARGE: 1, DYNASTPARKING: 2 },
    payStatus: { PAYSUCCESS: 1, PAYFALI: 2, PAYCANCLE: 3 },
    getTime: function (e) {
      var t = parseInt((e / 60 / 60) % 24);
      t = t < 10 ? "0" + t : t;
      var n = parseInt((e / 60) % 60);
      n = n < 10 ? "0" + n : n;
      var r = parseInt(e % 60);
      return [t, n, (r = r < 10 ? "0" + r : r)];
    },
    getFormattedDate: function (e) {
      var t,
        n = new Date(e);
      return (
        (t = n ? new Date(n) : new Date()).setMinutes(
          t.getMinutes() - t.getTimezoneOffset()
        ),
        t.toISOString().replace("T", " ").replace("Z", "").substring(0, 19)
      );
    },
  }
);
