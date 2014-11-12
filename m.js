! function(g, m) {
    if (typeof define === "function" && define.amd) {
        define("M", [], m);
    } else if (typeof exports === "object") {
        module.exports = m();
    } else {
        g.M = m();
    }
}(this, function() {
    /*!
     * m.js
     * The M Library v0.2.25
     * Licensed under MIT (https://github.com/jamesliu96/m.js/blob/master/LICENSE)
     * Copyright (C) 2014 James Liu
     * =J=
     */
    if ("function" !== typeof window.jQuery) throw Error("M requires jQuery");

    function M(a) {
        this.model = a;
        this.box = {}
    }
    M.prototype = {
        is: function(a) {
            var e = !1;
            "string" === typeof a && (a = a.split(","));
            for (var l in a)
                if (this.model === a[l].trim()) {
                    e = !0;
                    break
                }
            return e
        },
        not: function(a) {
            return !this.is(a)
        },
        open: function(a, e) {
            "undefined" !== typeof e && (this.box[a] = e);
            return this.box[a]
        },
        close: function(a) {
            this.box[a] = void 0;
            return !1
        }
    };
    M.ua = window.navigator.userAgent;
    M.mobile = /Mobile/.test(M.ua);
    M.ie = /MSIE/.test(M.ua);
    M.chrome = /Chrome/.test(M.ua) || /Chromium/.test(M.ua);
    M.safari = !M.chrome && /Safari/.test(M.ua);
    M.firefox = /Firefox/.test(M.ua);
    M.opera = /Opera/.test(M.ua);
    M.ajax = function(a, e, l, n) {
        return window.jQuery.ajax({
            url: a,
            type: "POST",
            data: e,
            dataType: "json",
            timeout: 1E4,
            success: l,
            error: n
        })
    };
    M.storage = {
        stack: window.localStorage || {},
        set: function(a, e) {
            window.localStorage ? M.storage.stack.setItem(a, e) : M.storage.stack[a] = e
        },
        get: function(a) {
            return window.localStorage ? M.storage.stack.getItem(a) : M.storage.stack[a]
        },
        del: function(a) {
            window.localStorage ? M.storage.stack.removeItem(a) : M.storage.stack[a] = void 0
        }
    };
    M.each = function(a, e) {
        for (var l in a)
            if ("function" === typeof e) a[l] = e(a[l]);
            else throw Error("Callback should be a function");
        return a
    };
    M.crypto = {
        md5: function(a) {
            function e(a, b) {
                var c, g, d, f, e;
                d = a & 2147483648;
                f = b & 2147483648;
                c = a & 1073741824;
                g = b & 1073741824;
                e = (a & 1073741823) + (b & 1073741823);
                return c & g ? e ^ 2147483648 ^ d ^ f : c | g ? e & 1073741824 ? e ^ 3221225472 ^ d ^ f : e ^ 1073741824 ^ d ^ f : e ^ d ^ f
            }

            function l(a, b, c, d, g, f, m) {
                a = e(a, e(e(b & c | ~b & d, g), m));
                return e(a << f | a >>> 32 - f, b)
            }

            function n(a, b, c, d, g, f, m) {
                a = e(a, e(e(b & d | c & ~d, g), m));
                return e(a << f | a >>> 32 - f, b)
            }

            function m(a, b, d, c, g, f, m) {
                a = e(a, e(e(b ^ d ^ c, g), m));
                return e(a << f | a >>> 32 - f, b)
            }

            function h(a, b, d, c, g, f, m) {
                a = e(a, e(e(d ^ (b | ~c), g), m));
                return e(a << f | a >>> 32 - f, b)
            }

            function k(a) {
                var b = "",
                    d = "",
                    c;
                for (c = 0; 3 >= c; c++) d = a >>> 8 * c & 255, d = "0" + d.toString(16), b += d.substr(d.length - 2, 2);
                return b
            }
            var f = [],
                p, t, u, v, c, g, d, b;
            a = function(a) {
                a = a.replace(/\r\n/g, "\n");
                for (var b = "", d = 0; d < a.length; d++) {
                    var c = a.charCodeAt(d);
                    128 > c ? b += String.fromCharCode(c) : (127 < c && 2048 > c ? b += String.fromCharCode(c >> 6 | 192) : (b += String.fromCharCode(c >> 12 | 224), b += String.fromCharCode(c >> 6 & 63 | 128)), b += String.fromCharCode(c & 63 | 128))
                }
                return b
            }(a);
            f = function(a) {
                var b, c = a.length;
                b = c + 8;
                for (var d = 16 * ((b - b % 64) / 64 + 1), f = Array(d - 1), g = 0, e = 0; e < c;) b = (e - e % 4) / 4, g = e % 4 * 8, f[b] |= a.charCodeAt(e) << g, e++;
                b = (e - e % 4) / 4;
                f[b] |= 128 << e % 4 * 8;
                f[d - 2] = c << 3;
                f[d - 1] = c >>> 29;
                return f
            }(a);
            c = 1732584193;
            g = 4023233417;
            d = 2562383102;
            b = 271733878;
            for (a = 0; a < f.length; a += 16) p = c, t = g, u = d, v = b, c = l(c, g, d, b, f[a + 0], 7, 3614090360), b = l(b, c, g, d, f[a + 1], 12, 3905402710), d = l(d, b, c, g, f[a + 2], 17, 606105819), g = l(g, d, b, c, f[a + 3], 22, 3250441966), c = l(c, g, d, b, f[a + 4], 7, 4118548399), b = l(b, c, g, d, f[a + 5], 12, 1200080426), d = l(d, b, c, g, f[a + 6], 17, 2821735955), g = l(g, d, b, c, f[a + 7], 22, 4249261313), c = l(c, g, d, b, f[a + 8], 7, 1770035416), b = l(b, c, g, d, f[a + 9], 12, 2336552879), d = l(d, b, c, g, f[a + 10], 17, 4294925233), g = l(g, d, b, c, f[a + 11], 22, 2304563134), c = l(c, g, d, b, f[a + 12], 7, 1804603682), b = l(b, c, g, d, f[a + 13], 12, 4254626195), d = l(d, b, c, g, f[a + 14], 17, 2792965006), g = l(g, d, b, c, f[a + 15], 22, 1236535329), c = n(c, g, d, b, f[a + 1], 5, 4129170786), b = n(b, c, g, d, f[a + 6], 9, 3225465664), d = n(d, b, c, g, f[a + 11], 14, 643717713), g = n(g, d, b, c, f[a + 0], 20, 3921069994), c = n(c, g, d, b, f[a + 5], 5, 3593408605), b = n(b, c, g, d, f[a + 10], 9, 38016083), d = n(d, b, c, g, f[a + 15], 14, 3634488961), g = n(g, d, b, c, f[a + 4], 20, 3889429448), c = n(c, g, d, b, f[a + 9], 5, 568446438), b = n(b, c, g, d, f[a + 14], 9, 3275163606), d = n(d, b, c, g, f[a + 3], 14, 4107603335), g = n(g, d, b, c, f[a + 8], 20, 1163531501), c = n(c, g, d, b, f[a + 13], 5, 2850285829), b = n(b, c, g, d, f[a + 2], 9, 4243563512), d = n(d, b, c, g, f[a + 7], 14, 1735328473), g = n(g, d, b, c, f[a + 12], 20, 2368359562), c = m(c, g, d, b, f[a + 5], 4, 4294588738), b = m(b, c, g, d, f[a + 8], 11, 2272392833), d = m(d, b, c, g, f[a + 11], 16, 1839030562), g = m(g, d, b, c, f[a + 14], 23, 4259657740), c = m(c, g, d, b, f[a + 1], 4, 2763975236), b = m(b, c, g, d, f[a + 4], 11, 1272893353), d = m(d, b, c, g, f[a + 7], 16, 4139469664), g = m(g, d, b, c, f[a + 10], 23, 3200236656), c = m(c, g, d, b, f[a + 13], 4, 681279174), b = m(b, c, g, d, f[a + 0], 11, 3936430074), d = m(d, b, c, g, f[a + 3], 16, 3572445317), g = m(g, d, b, c, f[a + 6], 23, 76029189), c = m(c, g, d, b, f[a + 9], 4, 3654602809), b = m(b, c, g, d, f[a + 12], 11, 3873151461), d = m(d, b, c, g, f[a + 15], 16, 530742520), g = m(g, d, b, c, f[a + 2], 23, 3299628645), c = h(c, g, d, b, f[a + 0], 6, 4096336452), b = h(b, c, g, d, f[a + 7], 10, 1126891415), d = h(d, b, c, g, f[a + 14], 15, 2878612391), g = h(g, d, b, c, f[a + 5], 21, 4237533241), c = h(c, g, d, b, f[a + 12], 6, 1700485571), b = h(b, c, g, d, f[a + 3], 10, 2399980690), d = h(d, b, c, g, f[a + 10], 15, 4293915773), g = h(g, d, b, c, f[a + 1], 21, 2240044497), c = h(c, g, d, b, f[a + 8], 6, 1873313359), b = h(b, c, g, d, f[a + 15], 10, 4264355552), d = h(d, b, c, g, f[a + 6], 15, 2734768916), g = h(g, d, b, c, f[a + 13], 21, 1309151649), c = h(c, g, d, b, f[a + 4], 6, 4149444226), b = h(b, c, g, d, f[a + 11], 10, 3174756917), d = h(d, b, c, g, f[a + 2], 15, 718787259), g = h(g, d, b, c, f[a + 9], 21, 3951481745), c = e(c, p), g = e(g, t), d = e(d, u), b = e(b, v);
            return (k(c) + k(g) + k(d) + k(b)).toLowerCase()
        },
        sha256: function(a) {
            function e(a, e) {
                var h = (a & 65535) + (e & 65535);
                return (a >> 16) + (e >> 16) + (h >> 16) << 16 | h & 65535
            }

            function l(a, e) {
                return a >>> e | a << 32 - e
            }
            a = function(a) {
                a = a.replace(/\r\n/g, "\n");
                for (var e = "", h = 0; h < a.length; h++) {
                    var k = a.charCodeAt(h);
                    128 > k ? e += String.fromCharCode(k) : (127 < k && 2048 > k ? e += String.fromCharCode(k >> 6 | 192) : (e += String.fromCharCode(k >> 12 | 224), e += String.fromCharCode(k >> 6 & 63 | 128)), e += String.fromCharCode(k & 63 | 128))
                }
                return e
            }(a);
            return function(a) {
                for (var e = "", h = 0; h < 4 * a.length; h++) e += "0123456789abcdef".charAt(a[h >> 2] >> 8 * (3 - h % 4) + 4 & 15) + "0123456789abcdef".charAt(a[h >> 2] >> 8 * (3 - h % 4) & 15);
                return e
            }(function(a, m) {
                var h = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298],
                    k = [1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225],
                    f = Array(64),
                    p, t, u, v, c, g, d, b, w, q, r, s;
                a[m >> 5] |= 128 << 24 - m % 32;
                a[(m + 64 >> 9 << 4) + 15] = m;
                for (w = 0; w < a.length; w += 16) {
                    p = k[0];
                    t = k[1];
                    u = k[2];
                    v = k[3];
                    c = k[4];
                    g = k[5];
                    d = k[6];
                    b = k[7];
                    for (q = 0; 64 > q; q++) {
                        if (16 > q) f[q] = a[q + w];
                        else {
                            r = q;
                            s = f[q - 2];
                            s = l(s, 17) ^ l(s, 19) ^ s >>> 10;
                            s = e(s, f[q - 7]);
                            var x = f[q - 15],
                                x = l(x, 7) ^ l(x, 18) ^ x >>> 3;
                            f[r] = e(e(s, x), f[q - 16])
                        }
                        r = c;
                        r = l(r, 6) ^ l(r, 11) ^ l(r, 25);
                        r = e(e(e(e(b, r), c & g ^ ~c & d), h[q]), f[q]);
                        b = p;
                        b = l(b, 2) ^ l(b, 13) ^ l(b, 22);
                        s = e(b, p & t ^ p & u ^ t & u);
                        b = d;
                        d = g;
                        g = c;
                        c = e(v, r);
                        v = u;
                        u = t;
                        t = p;
                        p = e(r, s)
                    }
                    k[0] = e(p, k[0]);
                    k[1] = e(t, k[1]);
                    k[2] = e(u, k[2]);
                    k[3] = e(v, k[3]);
                    k[4] = e(c, k[4]);
                    k[5] = e(g, k[5]);
                    k[6] = e(d, k[6]);
                    k[7] = e(b, k[7])
                }
                return k
            }(function(a) {
                for (var e = [], h = 0; h < 8 * a.length; h += 8) e[h >> 5] |= (a.charCodeAt(h / 8) & 255) << 24 - h % 32;
                return e
            }(a), 8 * a.length))
        },
        base64: {
            encode: function(a) {
                var e, l, n, m, h = 0,
                    k = 0,
                    f = "",
                    f = [];
                if (!a) return a;
                do e = a.charCodeAt(h++), l = a.charCodeAt(h++), n = a.charCodeAt(h++), m = e << 16 | l << 8 | n, e = m >> 18 & 63, l = m >> 12 & 63, n = m >> 6 & 63, m &= 63, f[k++] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(e) + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(l) + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(n) + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(m); while (h < a.length);
                f = f.join("");
                a = a.length % 3;
                return (a ? f.slice(0, a - 3) : f) + "===".slice(a || 3)
            },
            decode: function(a) {
                var e, l, n, m, h, k = 0,
                    f = 0;
                m = "";
                var p = [];
                if (!a) return a;
                a += "";
                do e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(a.charAt(k++)), l = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(a.charAt(k++)), m = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(a.charAt(k++)), h = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(a.charAt(k++)), n = e << 18 | l << 12 | m << 6 | h, e = n >> 16 & 255, l = n >> 8 & 255, n &= 255, 64 == m ? p[f++] = String.fromCharCode(e) : 64 == h ? p[f++] = String.fromCharCode(e, l) : p[f++] = String.fromCharCode(e, l, n); while (k < a.length);
                return m = p.join("")
            }
        }
    };
    M.htmlspecialchars = function(a) {
        a = a.replace(/&/g, "&amp;");
        a = a.replace(/</g, "&lt;");
        a = a.replace(/>/g, "&gt;");
        a = a.replace(/"/g, "&quot;");
        return a = a.replace(/'/g, "&#039;")
    };
    M.url = {
        search: function() {
            var a = {};
            M.each(window.location.search.slice(1).split("&"), function(e) {
                e && (a[e.split("=")[0]] = e.split("=")[1])
            });
            return a
        }(),
        location: window.location.href.split("#")[1]
    };
    M.status = {
        list: {
            100: ["\u90ae\u7bb1\u9a8c\u8bc1\u6210\u529f", ""],
            101: ["\u90ae\u7bb1\u9a8c\u8bc1\u5931\u8d25", "\u5df2\u9a8c\u8bc1"],
            102: ["\u90ae\u7bb1\u9a8c\u8bc1\u5931\u8d25", "\u90ae\u7bb1\u5730\u5740\u4e3a\u7a7a"],
            103: ["\u90ae\u7bb1\u9a8c\u8bc1\u5931\u8d25", "\u90ae\u7bb1\u6821\u9a8c\u7801\u5931\u6548"],
            104: ["\u4fe1\u606f\u83b7\u53d6\u5931\u8d25", "\u5f53\u524d\u4f1a\u8bdd\u5931\u6548"],
            105: ["\u4fe1\u606f\u83b7\u53d6\u5931\u8d25", "\u7528\u6237\u4fe1\u606f\u83b7\u53d6\u9519\u8bef"],
            106: ["\u6ce8\u518c\u5931\u8d25", "\u90ae\u7bb1\u4e0d\u7b26\u5408\u89c4\u5219"],
            107: ["\u6ce8\u518c\u5931\u8d25", "\u9a8c\u8bc1\u7801\u4e0d\u6b63\u786e"],
            108: ["\u6ce8\u518c\u5931\u8d25", "\u8bf7\u6c42\u65b9\u5f0f\u9519\u8bef"],
            109: ["\u6ce8\u518c\u5931\u8d25", "\u90ae\u7bb1\u5df2\u88ab\u6ce8\u518c"],
            110: ["\u6ce8\u518c\u6210\u529f", ""],
            111: ["\u6ce8\u518c\u5931\u8d25", "\u7f51\u7edc\u51fa\u73b0\u95ee\u9898"],
            112: ["\u6ce8\u518c\u5931\u8d25", "\u8bf7\u6c42\u65b9\u5f0f\u9519\u8bef"],
            113: ["\u767b\u9646\u5931\u8d25", "\u8bf7\u6c42\u65b9\u5f0f\u9519\u8bef"],
            114: ["\u767b\u5f55\u5931\u8d25", "\u90ae\u7bb1\u672a\u6ce8\u518c"],
            115: ["\u767b\u5f55\u5931\u8d25", "\u5bc6\u7801\u9519\u8bef"],
            116: ["\u767b\u9646\u6210\u529f", ""],
            117: ["\u4fe1\u606f\u83b7\u53d6\u5931\u8d25", "\u7528\u6237\u4e0d\u5b58\u5728"],
            118: ["\u767b\u9646\u5931\u8d25", "\u8d26\u53f7\u672a\u9a8c\u8bc1"],
            119: ["\u90ae\u7bb1\u9a8c\u8bc1\u5931\u8d25", "\u4e0d\u9700\u8981\u9a8c\u8bc1"],
            120: ["\u90ae\u7bb1\u9a8c\u8bc1\u5931\u8d25", "\u90ae\u7bb1\u4e0d\u5b58\u5728"],
            121: ["\u767b\u9646\u5931\u8d25", "\u8d26\u53f7\u5f02\u5e38"]
        },
        getTitle: function(a) {
            return M.status.list[a][0]
        },
        getReason: function(a) {
            return M.status.list[a][1]
        }
    };
    M.alert = function(a) {
        a = "string" === typeof a ? {
            content: a
        } : a;
        var e = a.id || a.id || setTimeout(0);
        jQuery("body").append('<div class="modal fade" id="' + e + '" tabindex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header" style="color:black;"><button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">\u5173\u95ed</span></button><h4 class="modal-title" id="modalLabel">' + (a.title || a.title || "\u63d0\u793a") + '</h4></div><div class="modal-body" style="color:black;">' + (a.content || a.content || "") + '</div><div class="modal-footer"><button type="button" class="btn btn-primary" data-dismiss="modal">' + (a.confirmBtn || a.confirmBtn || "\u786e\u8ba4") + "</button></div></div></div></div>");
        jQuery("#" + e).modal("show");
        jQuery("#" + e).on("hidden.bs.modal", function() {
            a.cb && a.cb();
            jQuery(this).remove()
        });
        return e
    };
    M.form = function(c) {
        c = c ? c : {};
        id = c.id || "form";
        $(id).attr("novalidate", "");
        var whiteList = [
            "这个邮箱还没有注册哦",
            "密码错误",
            "验证码输入错误",
            "Email输入错误",
            "Email地址已被使用"
        ];
        var bind = {
            maxLength: function(o, l) {
                l = parseInt(l);
                return function() {
                    o.val().length > l && o.val(o.val().substring(0, l));
                };
            },
            minLength: function(o, l) {
                l = parseInt(l);
                return function() {
                    o.val().length < l ? showAlert(o, "长度不能小于" + l + "位") : destroyAlert(o, "长度不能小于" + l + "位");
                };
            },
            equalTo: function(o, to) {
                $(to).on("blur", function() {
                    o.trigger("input")
                });
                return function() {
                    o.val() !== $(to).val() ? showAlert(o, "两次输入的密码不相同") : destroyAlert(o, "两次输入的密码不相同");
                };
            },
            email: function(o) {
                return function() {
                    !/^[\w\-\.]+@[\w\-\.]+(\.\w+)+$/.test(o.val()) ? showAlert(o, "邮件格式错误") : destroyAlert(o, "邮件格式错误");
                };
            },
            require: function(o) {
                return function() {
                    o.val() == "" ? showAlert(o, "这里不能为空哦") : destroyAlert(o, "这里不能为空哦");
                };
            },
            clear: function(o) {
                return function() {
                    destroyAlert(o);
                };
            }
        };
        var showAlert = function(o, content) {
            if ($(".popover-content:visible").length !== 0) return;
            if (o.data("content") !== content) {
                o.popover("destroy");
                o.focus().data("content", content).popover("show");
            }
        };
        var destroyAlert = function(o, content) {
            if (o.data("content") === content || !content || $.inArray(o.data("content"), whiteList) !== -1) {
                o.popover("destroy");
                o.data("content", "");
            }
        };
        var helper = function(next) {
            return function() {
                next && next();
            };
        };
        var cbMap = {};
        $(id).find("input, textarea").each(function() {
            $(this).data({
                "trigger": "manual",
                "placement": c.placement || "left",
                "content": ""
            });
            var listenToCode = $(this).attr("listen-to-code") ? $(this).attr("listen-to-code").split(",") : [];
            for (var i = 0; i < listenToCode.length; i++) {
                cbMap[listenToCode[i]] = $(this);
            };
            $(this).attr("required") && $(this).on("input", helper(bind.require($(this))));
            $(this).attr("max-length") && $(this).on("input", helper(bind.maxLength($(this), $(this).attr("max-length"))));
            $(this).attr("min-length") && $(this).on("input", helper(bind.minLength($(this), $(this).attr("min-length"))));
            $(this).attr("equal-to") && $(this).on("input", helper(bind.equalTo($(this), $(this).attr("equal-to"))));
            $(this).attr("type") === "email" && $(this).on("blur", helper(bind.email($(this)))).on("input", helper(bind.clear($(this))));
        });
        $(id).submit(function(e) {
            e.preventDefault();
            if ($(".popover-content:visible").length !== 0) return;
            var no_empty = true;
            var sendData = {}
            $(this).find("input, textarea").each(function() {
                if ($(this).attr("required") && no_empty && !$(this).val()) {
                    no_empty = false;
                    showAlert($(this), "这里不能为空哦");
                }
                if ($(this).attr) {
                    sendData[$(this).attr("name")] = $(this).attr("type") === "password" ? M.crypto.md5($(this).val()) : $(this).val();
                }
            });
            if (!no_empty) return;
            M.ajax($(this).attr("action"), sendData, function(data) {
                data = c.cb ? c.cb(data) ? data : {"code": "0"} : data;
                if (data["code"] === "118") {
                    M.alert("请登陆邮箱进行验证");
                } else if (data["code"] === "121") {
                    M.alert("用户信息异常，请1小时后再试");
                } else if (data["code"] === "207") {
                    window.location.href = "/guide/";
                } else if (data["code"] === "116") {
                    window.location.href = c_url;
                } else if (data["code"] === "114") {
                    showAlert(cbMap[data["code"]], "这个邮箱还没有注册哦");
                } else if (data["code"] === "115") {
                    showAlert(cbMap[data["code"]], "密码错误");
                } else if (data["code"] === "107") {
                    showAlert(cbMap[data["code"]], "验证码输入错误");
                } else if (data["code"] === "106") {
                    showAlert(cbMap[data["code"]], "Email输入错误");
                } else if (data["code"] === "109") {
                    showAlert(cbMap[data["code"]], "Email地址已被使用");
                } else if (data["code"] === "110") {
                    $("#login-success-modal").modal("show");
                }
            }, function() {
                M.alert("网络有问题！无法登录！可能木有吃药，感觉自己萌萌哒！");
            });
        })
    }
    return M;
});
