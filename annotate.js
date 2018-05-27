/*

 Lodash <https://lodash.com/>
 Copyright JS Foundation and other contributors <https://js.foundation/>
 Released under MIT license <https://lodash.com/license>
 Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 FastClick: polyfill to remove click delays on browsers with touch UIs.

 @codingstandard ftlabs-jsv2
 @copyright The Financial Times Limited [All Rights Reserved]
 @license MIT License (see LICENSE.txt)
*/
(function(g) {
    if (window["com.genius.Genius.annotation_enabled"]) {
        g = g.jQuery;
        var d = window.onerror;
        window.onerror = function() {
            window.onerror = d;
            return !0
        };
        g(document).trigger("genius:reinjection");
        throw "this script has already run on this page";
    }
    window["com.genius.Genius.annotation_enabled"] = !0
})(window["com.genius.Genius"]);

(function(g) {
    "undefined" === typeof g && (g = {});
    "undefined" === typeof g.performance && (g.performance = {});
    g._perfRefForUserTimingPolyfill = g.performance;
    g.performance.userTimingJsNow = !1;
    g.performance.userTimingJsNowPrefixed = !1;
    g.performance.userTimingJsUserTiming = !1;
    g.performance.userTimingJsUserTimingPrefixed = !1;
    g.performance.userTimingJsPerformanceTimeline = !1;
    g.performance.userTimingJsPerformanceTimelinePrefixed = !1;
    var d = [],
        m = [],
        a = null,
        b, h;
    if ("function" !== typeof g.performance.now) {
        g.performance.userTimingJsNow = !0;
        m = ["webkitNow", "msNow", "mozNow"];
        for (b = 0; b < m.length; b++)
            if ("function" === typeof g.performance[m[b]]) {
                g.performance.now = g.performance[m[b]];
                g.performance.userTimingJsNowPrefixed = !0;
                break
            }
        var n = +new Date;
        g.performance.timing && g.performance.timing.navigationStart && (n = g.performance.timing.navigationStart);
        "function" !== typeof g.performance.now && (g.performance.now = Date.now ? function() {
            return Date.now() - n
        } : function() {
            return +new Date - n
        })
    }
    var l = function() {},
        w = function() {},
        r = [],
        t = !1,
        D = !1;
    if ("function" !== typeof g.performance.getEntries ||
        "function" !== typeof g.performance.mark) {
        "function" === typeof g.performance.getEntries && "function" !== typeof g.performance.mark && (D = !0);
        g.performance.userTimingJsPerformanceTimeline = !0;
        d = ["webkit", "moz"];
        m = ["getEntries", "getEntriesByName", "getEntriesByType"];
        for (b = 0; b < m.length; b++)
            for (h = 0; h < d.length; h++) a = d[h] + m[b].substr(0, 1).toUpperCase() + m[b].substr(1), "function" === typeof g.performance[a] && (g.performance[m[b]] = g.performance[a], g.performance.userTimingJsPerformanceTimelinePrefixed = !0);
        var l = function(a) {
                r.push(a);
                "measure" === a.entryType && (t = !0)
            },
            x = function() {
                t && (r.sort(function(a, b) {
                    return a.startTime - b.startTime
                }), t = !1)
            },
            w = function(a, d) {
                for (b = 0; b < r.length;) r[b].entryType !== a ? b++ : "undefined" !== typeof d && r[b].name !== d ? b++ : r.splice(b, 1)
            };
        if ("function" !== typeof g.performance.getEntries || D) {
            var G = g.performance.getEntries;
            g.performance.getEntries = function() {
                x();
                var a = r.slice(0);
                D && G && (Array.prototype.push.apply(a, G.call(g.performance)), a.sort(function(a, b) {
                    return a.startTime - b.startTime
                }));
                return a
            }
        }
        if ("function" !==
            typeof g.performance.getEntriesByType || D) {
            var J = g.performance.getEntriesByType;
            g.performance.getEntriesByType = function(a) {
                if ("undefined" === typeof a || "mark" !== a && "measure" !== a) return D && J ? J.call(g.performance, a) : [];
                "measure" === a && x();
                var d = [];
                for (b = 0; b < r.length; b++) r[b].entryType === a && d.push(r[b]);
                return d
            }
        }
        if ("function" !== typeof g.performance.getEntriesByName || D) {
            var B = g.performance.getEntriesByName;
            g.performance.getEntriesByName = function(a, d) {
                if (d && "mark" !== d && "measure" !== d) return D && B ? B.call(g.performance,
                    a, d) : [];
                "undefined" !== typeof d && "measure" === d && x();
                var m = [];
                for (b = 0; b < r.length; b++) "undefined" !== typeof d && r[b].entryType !== d || r[b].name !== a || m.push(r[b]);
                D && B && (Array.prototype.push.apply(m, B.call(g.performance, a, d)), m.sort(function(a, b) {
                    return a.startTime - b.startTime
                }));
                return m
            }
        }
    }
    if ("function" !== typeof g.performance.mark) {
        g.performance.userTimingJsUserTiming = !0;
        d = ["webkit", "moz", "ms"];
        m = ["mark", "measure", "clearMarks", "clearMeasures"];
        for (b = 0; b < m.length; b++)
            for (h = 0; h < d.length; h++) a = d[h] + m[b].substr(0,
                1).toUpperCase() + m[b].substr(1), "function" === typeof g.performance[a] && (g.performance[m[b]] = g.performance[a], g.performance.userTimingJsUserTimingPrefixed = !0);
        var A = {};
        "function" !== typeof g.performance.mark && (g.performance.mark = function(a) {
            var b = g.performance.now();
            if ("undefined" === typeof a) throw new SyntaxError("Mark name must be specified");
            if (g.performance.timing && a in g.performance.timing) throw new SyntaxError("Mark name is not allowed");
            A[a] || (A[a] = []);
            A[a].push(b);
            l({
                entryType: "mark",
                name: a,
                startTime: b,
                duration: 0
            })
        });
        "function" !== typeof g.performance.clearMarks && (g.performance.clearMarks = function(a) {
            a ? A[a] = [] : A = {};
            w("mark", a)
        });
        "function" !== typeof g.performance.measure && (g.performance.measure = function(a, b, d) {
            var m = g.performance.now();
            if ("undefined" === typeof a) throw new SyntaxError("Measure must be specified");
            if (b) {
                var h = 0;
                if (g.performance.timing && b in g.performance.timing) {
                    if ("navigationStart" !== b && 0 === g.performance.timing[b]) throw Error(b + " has a timing of 0");
                    h = g.performance.timing[b] - g.performance.timing.navigationStart
                } else if (b in
                    A) h = A[b][A[b].length - 1];
                else throw Error(b + " mark not found");
                b = m;
                if (d)
                    if (g.performance.timing && d in g.performance.timing) {
                        if ("navigationStart" !== d && 0 === g.performance.timing[d]) throw Error(d + " has a timing of 0");
                        b = g.performance.timing[d] - g.performance.timing.navigationStart
                    } else if (d in A) b = A[d][A[d].length - 1];
                else throw Error(d + " mark not found");
                l({
                    entryType: "measure",
                    name: a,
                    startTime: h,
                    duration: b - h
                })
            } else l({
                entryType: "measure",
                name: a,
                startTime: 0,
                duration: m
            })
        });
        "function" !== typeof g.performance.clearMeasures &&
            (g.performance.clearMeasures = function(a) {
                w("measure", a)
            })
    }
    "function" === typeof define && define.amd ? define([], function() {
        return g.performance
    }) : "undefined" !== typeof module && "undefined" !== typeof module.exports && (module.exports = g.performance)
})("undefined" !== typeof window ? window : void 0);

window.performance.mark("genius.startScriptEvaluation");

window["com.genius.Genius"] = {};

(function(g, d, m) {
    d.conflicts = {};
    ["require", "define", "Modernizr", "bowser"].forEach(function(a) {
        d.conflicts[a] = g[a];
        g[a] = m
    })
})(this, this["com.genius.Genius"]);

(function(g, d) {
    function m(b) {
        G[x] = a.apply(d, b);
        return x++
    }

    function a(a) {
        var b = [].slice.call(arguments, 1);
        return function() {
            "function" === typeof a ? a.apply(d, b) : (new Function("" + a))()
        }
    }

    function b(d) {
        if (J) setTimeout(a(b, d), 0);
        else {
            var m = G[d];
            if (m) {
                J = !0;
                try {
                    m()
                } finally {
                    h(d), J = !1
                }
            }
        }
    }

    function h(a) {
        delete G[a]
    }

    function n() {
        A = function() {
            var d = m(arguments);
            process.nextTick(a(b, d));
            return d
        }
    }

    function l() {
        if (g.postMessage && !g.importScripts) {
            var a = !0,
                b = g.onmessage;
            g.onmessage = function() {
                a = !1
            };
            g.postMessage("",
                "*");
            g.onmessage = b;
            return a
        }
    }

    function w() {
        var a = "setImmediate$" + Math.random() + "$",
            d = function(d) {
                d.source === g && "string" === typeof d.data && 0 === d.data.indexOf(a) && b(+d.data.slice(a.length))
            };
        g.addEventListener ? g.addEventListener("message", d, !1) : g.attachEvent("onmessage", d);
        A = function() {
            var b = m(arguments);
            g.postMessage(a + b, "*");
            return b
        }
    }

    function r() {
        var a = new MessageChannel;
        a.port1.onmessage = function(a) {
            b(a.data)
        };
        A = function() {
            var b = m(arguments);
            a.port2.postMessage(b);
            return b
        }
    }

    function t() {
        var a = B.documentElement;
        A = function() {
            var d = m(arguments),
                h = B.createElement("script");
            h.onreadystatechange = function() {
                b(d);
                h.onreadystatechange = null;
                a.removeChild(h);
                h = null
            };
            a.appendChild(h);
            return d
        }
    }

    function D() {
        A = function() {
            var d = m(arguments);
            setTimeout(a(b, d), 0);
            return d
        }
    }
    if (!g.setImmediate) {
        var x = 1,
            G = {},
            J = !1,
            B = g.document,
            A, E = Object.getPrototypeOf && Object.getPrototypeOf(g),
            E = E && E.setTimeout ? E : g;
        "[object process]" === {}.toString.call(g.process) ? n() : l() ? w() : g.MessageChannel ? r() : B && "onreadystatechange" in B.createElement("script") ?
            t() : D();
        E.setImmediate = A;
        E.clearImmediate = h
    }
})("undefined" === typeof self ? "undefined" === typeof global ? this : global : self);

! function(g, d) {
    "undefined" != typeof module && module.exports ? module.exports = d() : "function" == typeof define && define.amd ? define(d) : this[g] = d()
}("bowser", function() {
    function g(d) {
        function a(a) {
            return (a = d.match(a)) && 1 < a.length && a[1] || ""
        }

        function b(a) {
            return (a = d.match(a)) && 1 < a.length && a[2] || ""
        }
        var h = a(/(ipod|iphone|ipad)/i).toLowerCase(),
            g = !/like android/i.test(d) && /android/i.test(d),
            l = /CrOS/.test(d),
            w = /silk/i.test(d),
            r = /sailfish/i.test(d),
            t = /tizen/i.test(d),
            D = /(web|hpw)os/i.test(d),
            x = /windows phone/i.test(d),
            G = !x && /windows/i.test(d),
            J = !h && !w && /macintosh/i.test(d),
            B = !g && !r && !t && !D && /linux/i.test(d),
            A = a(/edge\/(\d+(\.\d+)?)/i),
            E = a(/version\/(\d+(\.\d+)?)/i),
            F = /tablet/i.test(d),
            K = !F && /[^-]mobi/i.test(d);
        /opera|opr/i.test(d) ? l = {
                name: "Opera",
                opera: !0,
                version: E || a(/(?:opera|opr)[\s\/](\d+(\.\d+)?)/i)
            } : /yabrowser/i.test(d) ? l = {
                name: "Yandex Browser",
                yandexbrowser: !0,
                version: E || a(/(?:yabrowser)[\s\/](\d+(\.\d+)?)/i)
            } : x ? (l = {
                name: "Windows Phone",
                windowsphone: !0
            }, A ? (l.msedge = !0, l.version = A) : (l.msie = !0, l.version = a(/iemobile\/(\d+(\.\d+)?)/i))) :
            /msie|trident/i.test(d) ? l = {
                name: "Internet Explorer",
                msie: !0,
                version: a(/(?:msie |rv:)(\d+(\.\d+)?)/i)
            } : l ? l = {
                name: "Chrome",
                chromeos: !0,
                chromeBook: !0,
                chrome: !0,
                version: a(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
            } : /chrome.+? edge/i.test(d) ? l = {
                name: "Microsoft Edge",
                msedge: !0,
                version: A
            } : /chrome|crios|crmo/i.test(d) ? l = {
                name: "Chrome",
                chrome: !0,
                version: a(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
            } : h ? (l = {
                name: "iphone" == h ? "iPhone" : "ipad" == h ? "iPad" : "iPod"
            }, E && (l.version = E)) : r ? l = {
                name: "Sailfish",
                sailfish: !0,
                version: a(/sailfish\s?browser\/(\d+(\.\d+)?)/i)
            } :
            /seamonkey\//i.test(d) ? l = {
                name: "SeaMonkey",
                seamonkey: !0,
                version: a(/seamonkey\/(\d+(\.\d+)?)/i)
            } : /firefox|iceweasel/i.test(d) ? (l = {
                name: "Firefox",
                firefox: !0,
                version: a(/(?:firefox|iceweasel)[ \/](\d+(\.\d+)?)/i)
            }, /\((mobile|tablet);[^\)]*rv:[\d\.]+\)/i.test(d) && (l.firefoxos = !0)) : w ? l = {
                name: "Amazon Silk",
                silk: !0,
                version: a(/silk\/(\d+(\.\d+)?)/i)
            } : g ? l = {
                name: "Android",
                version: E
            } : /phantom/i.test(d) ? l = {
                name: "PhantomJS",
                phantom: !0,
                version: a(/phantomjs\/(\d+(\.\d+)?)/i)
            } : /blackberry|\bbb\d+/i.test(d) || /rim\stablet/i.test(d) ?
            l = {
                name: "BlackBerry",
                blackberry: !0,
                version: E || a(/blackberry[\d]+\/(\d+(\.\d+)?)/i)
            } : D ? (l = {
                name: "WebOS",
                webos: !0,
                version: E || a(/w(?:eb)?osbrowser\/(\d+(\.\d+)?)/i)
            }, /touchpad\//i.test(d) && (l.touchpad = !0)) : l = /bada/i.test(d) ? {
                name: "Bada",
                bada: !0,
                version: a(/dolfin\/(\d+(\.\d+)?)/i)
            } : t ? {
                name: "Tizen",
                tizen: !0,
                version: a(/(?:tizen\s?)?browser\/(\d+(\.\d+)?)/i) || E
            } : /safari/i.test(d) ? {
                name: "Safari",
                safari: !0,
                version: E
            } : {
                name: a(/^(.*)\/(.*) /),
                version: b(/^(.*)\/(.*) /)
            };
        !l.msedge && /(apple)?webkit/i.test(d) ? (l.name =
            l.name || "Webkit", l.webkit = !0, !l.version && E && (l.version = E)) : !l.opera && /gecko\//i.test(d) && (l.name = l.name || "Gecko", l.gecko = !0, l.version = l.version || a(/gecko\/(\d+(\.\d+)?)/i));
        l.msedge || !g && !l.silk ? h ? (l[h] = !0, l.ios = !0) : G ? l.windows = !0 : J ? l.mac = !0 : B && (l.linux = !0) : l.android = !0;
        G = "";
        l.windowsphone ? G = a(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i) : h ? (G = a(/os (\d+([_\s]\d+)*) like mac os x/i), G = G.replace(/[_\s]/g, ".")) : g ? G = a(/android[ \/-](\d+(\.\d+)*)/i) : l.webos ? G = a(/(?:web|hpw)os\/(\d+(\.\d+)*)/i) : l.blackberry ?
            G = a(/rim\stablet\sos\s(\d+(\.\d+)*)/i) : l.bada ? G = a(/bada\/(\d+(\.\d+)*)/i) : l.tizen && (G = a(/tizen[\/\s](\d+(\.\d+)*)/i));
        G && (l.osversion = G);
        G = G.split(".")[0];
        if (F || "ipad" == h || g && (3 == G || 4 == G && !K) || l.silk) l.tablet = !0;
        else if (K || "iphone" == h || "ipod" == h || g || l.blackberry || l.webos || l.bada) l.mobile = !0;
        l.msedge || l.msie && 10 <= l.version || l.yandexbrowser && 15 <= l.version || l.chrome && 20 <= l.version || l.firefox && 20 <= l.version || l.safari && 6 <= l.version || l.opera && 10 <= l.version || l.ios && l.osversion && 6 <= l.osversion.split(".")[0] ||
            l.blackberry && 10.1 <= l.version ? l.a = !0 : l.msie && 10 > l.version || l.chrome && 20 > l.version || l.firefox && 20 > l.version || l.safari && 6 > l.version || l.opera && 10 > l.version || l.ios && l.osversion && 6 > l.osversion.split(".")[0] ? l.c = !0 : l.x = !0;
        return l
    }
    var d = g("undefined" !== typeof navigator ? navigator.userAgent : "");
    d.test = function(g) {
        for (var a = 0; a < g.length; ++a) {
            var b = g[a];
            if ("string" === typeof b && b in d) return !0
        }
        return !1
    };
    d._detect = g;
    return d
});

(function(g, d) {
    "object" === typeof module && "object" === typeof module.exports ? module.exports = g.document ? d(g, !0) : function(g) {
        if (!g.document) throw Error("jQuery requires a window with a document");
        return d(g)
    } : d(g)
})("undefined" !== typeof window ? window : this, function(g, d) {
    function m(e) {
        var y = "length" in e && e.length,
            a = k.type(e);
        return "function" === a || k.isWindow(e) ? !1 : 1 === e.nodeType && y ? !0 : "array" === a || 0 === y || "number" === typeof y && 0 < y && y - 1 in e
    }

    function a(e, y, a) {
        if (k.isFunction(y)) return k.grep(e, function(e, c) {
            return !!y.call(e,
                c, e) !== a
        });
        if (y.nodeType) return k.grep(e, function(e) {
            return e === y !== a
        });
        if ("string" === typeof y) {
            if (dd.test(y)) return k.filter(y, e, a);
            y = k.filter(y, e)
        }
        return k.grep(e, function(e) {
            return 0 <= Pa.call(y, e) !== a
        })
    }

    function b(e, y) {
        for (;
            (e = e[y]) && 1 !== e.nodeType;);
        return e
    }

    function h(e) {
        var y = hc[e] = {};
        k.each(e.match(Qa) || [], function(e, a) {
            y[a] = !0
        });
        return y
    }

    function n() {
        P.removeEventListener("DOMContentLoaded", n, !1);
        g.removeEventListener("load", n, !1);
        k.ready()
    }

    function l() {
        Object.defineProperty(this.cache = {},
            0, {
                get: function() {
                    return {}
                }
            });
        this.expando = k.expando + l.uid++
    }

    function w(e, y, a) {
        if (void 0 === a && 1 === e.nodeType)
            if (a = "data-" + y.replace(ed, "-$1").toLowerCase(), a = e.getAttribute(a), "string" === typeof a) {
                try {
                    a = "true" === a ? !0 : "false" === a ? !1 : "null" === a ? null : +a + "" === a ? +a : fd.test(a) ? k.parseJSON(a) : a
                } catch (c) {}
                na.set(e, y, a)
            } else a = void 0;
        return a
    }

    function r() {
        return !0
    }

    function t() {
        return !1
    }

    function D() {
        try {
            return P.activeElement
        } catch (e) {}
    }

    function x(e, y) {
        return k.nodeName(e, "table") && k.nodeName(11 !== y.nodeType ?
            y : y.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e
    }

    function G(e) {
        e.type = (null !== e.getAttribute("type")) + "/" + e.type;
        return e
    }

    function J(e) {
        var y = Bb.exec(e.type);
        y ? e.type = y[1] : e.removeAttribute("type");
        return e
    }

    function B(e, y) {
        for (var a = 0, c = e.length; a < c; a++) C.set(e[a], "globalEval", !y || C.get(y[a], "globalEval"))
    }

    function A(e, y) {
        var a, c, b, d;
        if (1 === y.nodeType) {
            if (C.hasData(e) && (d = C.access(e), a = C.set(y, d), d = d.events))
                for (b in delete a.handle,
                    a.events = {}, d)
                    for (a = 0, c = d[b].length; a < c; a++) k.event.add(y, b, d[b][a]);
            na.hasData(e) && (b = na.access(e), b = k.extend({}, b), na.set(y, b))
        }
    }

    function E(e, y) {
        var a = e.getElementsByTagName ? e.getElementsByTagName(y || "*") : e.querySelectorAll ? e.querySelectorAll(y || "*") : [];
        return void 0 === y || y && k.nodeName(e, y) ? k.merge([e], a) : a
    }

    function F(e, y) {
        var a, c = k(y.createElement(e)).appendTo(y.body),
            b = g.getDefaultComputedStyle && (a = g.getDefaultComputedStyle(c[0])) ? a.display : k.css(c[0], "display");
        c.detach();
        return b
    }

    function K(e) {
        var y =
            P,
            a = Z[e];
        a || (a = F(e, y), "none" !== a && a || (ic = (ic || k("<iframe frameborder='0' width='0' height='0'/>")).appendTo(y.documentElement), y = ic[0].contentDocument, y.write(), y.close(), a = F(e, y), ic.detach()), Z[e] = a);
        return a
    }

    function V(e, y, a) {
        var c, b, d = e.style;
        (a = a || Ub(e)) && (b = a.getPropertyValue(y) || a[y]);
        a && ("" !== b || k.contains(e.ownerDocument, e) || (b = k.style(e, y)), Hb.test(b) && ba.test(y) && (e = d.width, y = d.minWidth, c = d.maxWidth, d.minWidth = d.maxWidth = d.width = b, b = a.width, d.width = e, d.minWidth = y, d.maxWidth = c));
        return void 0 !==
            b ? b + "" : b
    }

    function O(e, y) {
        return {
            get: function() {
                if (e()) delete this.get;
                else return (this.get = y).apply(this, arguments)
            }
        }
    }

    function ea(e, y) {
        if (y in e) return y;
        for (var a = y[0].toUpperCase() + y.slice(1), c = y, b = ob.length; b--;)
            if (y = ob[b] + a, y in e) return y;
        return c
    }

    function la(e, a, c) {
        return (e = Vb.exec(a)) ? Math.max(0, e[1] - (c || 0)) + (e[2] || "px") : a
    }

    function ta(e, a, c, b, d) {
        a = c === (b ? "border" : "content") ? 4 : "width" === a ? 1 : 0;
        for (var h = 0; 4 > a; a += 2) "margin" === c && (h += k.css(e, c + db[a], !0, d)), b ? ("content" === c && (h -= k.css(e, "padding" +
            db[a], !0, d)), "margin" !== c && (h -= k.css(e, "border" + db[a] + "Width", !0, d))) : (h += k.css(e, "padding" + db[a], !0, d), "padding" !== c && (h += k.css(e, "border" + db[a] + "Width", !0, d)));
        return h
    }

    function L(e, a, c) {
        var b = !0,
            d = "width" === a ? e.offsetWidth : e.offsetHeight,
            h = Ub(e),
            g = "border-box" === k.css(e, "boxSizing", !1, h);
        if (0 >= d || null == d) {
            d = V(e, a, h);
            if (0 > d || null == d) d = e.style[a];
            if (Hb.test(d)) return d;
            b = g && (aa.boxSizingReliable() || d === e.style[a]);
            d = parseFloat(d) || 0
        }
        return d + ta(e, a, c || (g ? "border" : "content"), b, h) + "px"
    }

    function ma(e,
        a) {
        for (var c, b, d, h = [], g = 0, l = e.length; g < l; g++) b = e[g], b.style && (h[g] = C.get(b, "olddisplay"), c = b.style.display, a ? (h[g] || "none" !== c || (b.style.display = ""), "" === b.style.display && pb(b) && (h[g] = C.access(b, "olddisplay", K(b.nodeName)))) : (d = pb(b), "none" === c && d || C.set(b, "olddisplay", d ? c : k.css(b, "display"))));
        for (g = 0; g < l; g++) b = e[g], !b.style || a && "none" !== b.style.display && "" !== b.style.display || (b.style.display = a ? h[g] || "" : "none");
        return e
    }

    function T(e, a, c, b, d) {
        return new T.prototype.init(e, a, c, b, d)
    }

    function R() {
        setTimeout(function() {
            Cb =
                void 0
        });
        return Cb = k.now()
    }

    function Ba(e, a) {
        var c, b = 0,
            d = {
                height: e
            };
        for (a = a ? 1 : 0; 4 > b; b += 2 - a) c = db[b], d["margin" + c] = d["padding" + c] = e;
        a && (d.opacity = d.width = e);
        return d
    }

    function Xa(e, a, c) {
        for (var b, d = (eb[a] || []).concat(eb["*"]), k = 0, h = d.length; k < h; k++)
            if (b = d[k].call(c, a, e)) return b
    }

    function fb(e, a) {
        var c, b, d, h, g;
        for (c in e)
            if (b = k.camelCase(c), d = a[b], h = e[c], k.isArray(h) && (d = h[1], h = e[c] = h[0]), c !== b && (e[b] = h, delete e[c]), (g = k.cssHooks[b]) && "expand" in g)
                for (c in h = g.expand(h), delete e[b], h) c in e || (e[c] = h[c],
                    a[c] = d);
            else a[b] = d
    }

    function Ib(e, a, c) {
        var b, d = 0,
            h = Jb.length,
            g = k.Deferred().always(function() {
                delete l.elem
            }),
            l = function() {
                if (b) return !1;
                for (var a = Cb || R(), a = Math.max(0, m.startTime + m.duration - a), c = 1 - (a / m.duration || 0), y = 0, d = m.tweens.length; y < d; y++) m.tweens[y].run(c);
                g.notifyWith(e, [m, c, a]);
                if (1 > c && d) return a;
                g.resolveWith(e, [m]);
                return !1
            },
            m = g.promise({
                elem: e,
                props: k.extend({}, a),
                opts: k.extend(!0, {
                    specialEasing: {}
                }, c),
                originalProperties: a,
                originalOptions: c,
                startTime: Cb || R(),
                duration: c.duration,
                tweens: [],
                createTween: function(a, c) {
                    var y = k.Tween(e, m.opts, a, c, m.opts.specialEasing[a] || m.opts.easing);
                    m.tweens.push(y);
                    return y
                },
                stop: function(a) {
                    var c = 0,
                        y = a ? m.tweens.length : 0;
                    if (b) return this;
                    for (b = !0; c < y; c++) m.tweens[c].run(1);
                    a ? g.resolveWith(e, [m, a]) : g.rejectWith(e, [m, a]);
                    return this
                }
            });
        c = m.props;
        for (fb(c, m.opts.specialEasing); d < h; d++)
            if (a = Jb[d].call(m, e, c, m.opts)) return a;
        k.map(c, Xa, m);
        k.isFunction(m.opts.start) && m.opts.start.call(e, m);
        k.fx.timer(k.extend(l, {
            elem: e,
            anim: m,
            queue: m.opts.queue
        }));
        return m.progress(m.opts.progress).done(m.opts.done,
            m.opts.complete).fail(m.opts.fail).always(m.opts.always)
    }

    function Wb(e) {
        return function(a, c) {
            "string" !== typeof a && (c = a, a = "*");
            var b, d = 0,
                h = a.toLowerCase().match(Qa) || [];
            if (k.isFunction(c))
                for (; b = h[d++];) "+" === b[0] ? (b = b.slice(1) || "*", (e[b] = e[b] || []).unshift(c)) : (e[b] = e[b] || []).push(c)
        }
    }

    function ga(e, a, c, b) {
        function d(m) {
            var l;
            h[m] = !0;
            k.each(e[m] || [], function(e, k) {
                var m = k(a, c, b);
                if ("string" === typeof m && !g && !h[m]) return a.dataTypes.unshift(m), d(m), !1;
                if (g) return !(l = m)
            });
            return l
        }
        var h = {},
            g = e === Kc;
        return d(a.dataTypes[0]) ||
            !h["*"] && d("*")
    }

    function rb(e, a) {
        var c, b, d = k.ajaxSettings.flatOptions || {};
        for (c in a) void 0 !== a[c] && ((d[c] ? e : b || (b = {}))[c] = a[c]);
        b && k.extend(!0, e, b);
        return e
    }

    function ka(e, a, c, b) {
        var d;
        if (k.isArray(a)) k.each(a, function(a, y) {
            c || Db.test(e) ? b(e, y) : ka(e + "[" + ("object" === typeof y ? a : "") + "]", y, c, b)
        });
        else if (c || "object" !== k.type(a)) b(e, a);
        else
            for (d in a) ka(e + "[" + d + "]", a[d], c, b)
    }

    function sb(e) {
        return k.isWindow(e) ? e : 9 === e.nodeType && e.defaultView
    }

    var Lb = [],
        xa = Lb.slice,
        Ka = Lb.concat,
        u = Lb.push,
        Pa = Lb.indexOf,
        gb = {},
        Lc = gb.toString,
        jc = gb.hasOwnProperty,
        aa = {},
        P = g.document,
        k = function(e, a) {
            return new k.fn.init(e, a)
        },
        kc = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
        Mc = /^-ms-/,
        lc = /-([\da-z])/gi,
        gd = function(e, a) {
            return a.toUpperCase()
        };

    k.fn = k.prototype = {
        jquery: "2.1.4",
        constructor: k,
        selector: "",
        length: 0,
        toArray: function() {
            return xa.call(this)
        },
        get: function(e) {
            return null != e ? 0 > e ? this[e + this.length] : this[e] : xa.call(this)
        },
        pushStack: function(e) {
            e = k.merge(this.constructor(), e);
            e.prevObject = this;
            e.context = this.context;
            return e
        },
        each: function(e, a) {
            return k.each(this, e, a)
        },
        map: function(e) {
            return this.pushStack(k.map(this, function(a, c) {
                return e.call(a, c, a)
            }))
        },
        slice: function() {
            return this.pushStack(xa.apply(this, arguments))
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq(-1)
        },
        eq: function(e) {
            var a = this.length;
            e = +e + (0 > e ? a : 0);
            return this.pushStack(0 <= e && e < a ? [this[e]] : [])
        },
        end: function() {
            return this.prevObject || this.constructor(null)
        },
        push: u,
        sort: Lb.sort,
        splice: Lb.splice
    };

    k.extend = k.fn.extend = function() {
        var e,
            a, c, b, d, h = arguments[0] || {},
            g = 1,
            m = arguments.length,
            l = !1;
        "boolean" === typeof h && (l = h, h = arguments[g] || {}, g++);
        "object" === typeof h || k.isFunction(h) || (h = {});
        g === m && (h = this, g--);
        for (; g < m; g++)
            if (null != (e = arguments[g]))
                for (a in e) c = h[a], b = e[a], h !== b && (l && b && (k.isPlainObject(b) || (d = k.isArray(b))) ? (d ? (d = !1, c = c && k.isArray(c) ? c : []) : c = c && k.isPlainObject(c) ? c : {}, h[a] = k.extend(l, c, b)) : void 0 !== b && (h[a] = b));
        return h
    };

    k.extend({
        expando: "jQuery" + ("2.1.4" + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function(e) {
            throw Error(e);
        },
        noop: function() {},
        isFunction: function(e) {
            return "function" === k.type(e)
        },
        isArray: Array.isArray,
        isWindow: function(e) {
            return null != e && e === e.window
        },
        isNumeric: function(e) {
            return !k.isArray(e) && 0 <= e - parseFloat(e) + 1
        },
        isPlainObject: function(e) {
            return "object" !== k.type(e) || e.nodeType || k.isWindow(e) || e.constructor && !jc.call(e.constructor.prototype, "isPrototypeOf") ? !1 : !0
        },
        isEmptyObject: function(e) {
            for (var a in e) return !1;
            return !0
        },
        type: function(e) {
            return null == e ? e + "" : "object" === typeof e || "function" === typeof e ?
                gb[Lc.call(e)] || "object" : typeof e
        },
        globalEval: function(e) {
            var a;
            a = eval;
            if (e = k.trim(e)) 1 === e.indexOf("use strict") ? (a = P.createElement("script"), a.text = e, P.head.appendChild(a).parentNode.removeChild(a)) : a(e)
        },
        camelCase: function(e) {
            return e.replace(Mc, "ms-").replace(lc, gd)
        },
        nodeName: function(e, a) {
            return e.nodeName && e.nodeName.toLowerCase() === a.toLowerCase()
        },
        each: function(e, a, c) {
            var b, d = 0,
                k = e.length;
            b = m(e);
            if (c)
                if (b)
                    for (; d < k && (b = a.apply(e[d], c), !1 !== b); d++);
                else
                    for (d in e) {
                        if (b = a.apply(e[d], c), !1 ===
                            b) break
                    } else if (b)
                        for (; d < k && (b = a.call(e[d], d, e[d]), !1 !== b); d++);
                    else
                        for (d in e)
                            if (b = a.call(e[d], d, e[d]), !1 === b) break;
            return e
        },
        trim: function(e) {
            return null == e ? "" : (e + "").replace(kc, "")
        },
        makeArray: function(e, a) {
            var c = a || [];
            null != e && (m(Object(e)) ? k.merge(c, "string" === typeof e ? [e] : e) : u.call(c, e));
            return c
        },
        inArray: function(e, a, c) {
            return null == a ? -1 : Pa.call(a, e, c)
        },
        merge: function(e, a) {
            for (var c = +a.length, b = 0, d = e.length; b < c; b++) e[d++] = a[b];
            e.length = d;
            return e
        },
        grep: function(e, a, c) {
            for (var b = [], d = 0, k = e.length,
                    h = !c; d < k; d++) c = !a(e[d], d), c !== h && b.push(e[d]);
            return b
        },
        map: function(e, a, c) {
            var b, d = 0,
                k = e.length,
                h = [];
            if (m(e))
                for (; d < k; d++) b = a(e[d], d, c), null != b && h.push(b);
            else
                for (d in e) b = a(e[d], d, c), null != b && h.push(b);
            return Ka.apply([], h)
        },
        guid: 1,
        proxy: function(e, a) {
            var c, b;
            "string" === typeof a && (c = e[a], a = e, e = c);
            if (k.isFunction(e)) return b = xa.call(arguments, 2), c = function() {
                return e.apply(a || this, b.concat(xa.call(arguments)))
            }, c.guid = e.guid = e.guid || k.guid++, c
        },
        now: Date.now,
        support: aa
    });

    k.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),
        function(e, a) {
            gb["[object " + a + "]"] = a.toLowerCase()
        });

    var oa = function(e) {
        function a(f, e, c, v) {
            var b, d, y, k, h;
            (e ? e.ownerDocument || e : C) !== Ra && Xb(e);
            e = e || Ra;
            c = c || [];
            k = e.nodeType;
            if ("string" !== typeof f || !f || 1 !== k && 9 !== k && 11 !== k) return c;
            if (!v && ca) {
                if (11 !== k && (b = Wb.exec(f)))
                    if (y = b[1])
                        if (9 === k)
                            if ((d = e.getElementById(y)) && d.parentNode) {
                                if (d.id === y) return c.push(d), c
                            } else return c;
                else {
                    if (e.ownerDocument && (d = e.ownerDocument.getElementById(y)) && T(e, d) && d.id === y) return c.push(d), c
                } else {
                    if (b[2]) return M.apply(c,
                        e.getElementsByTagName(f)), c;
                    if ((y = b[3]) && u.getElementsByClassName) return M.apply(c, e.getElementsByClassName(y)), c
                }
                if (u.qsa && (!La || !La.test(f))) {
                    d = b = L;
                    y = e;
                    h = 1 !== k && f;
                    if (1 === k && "object" !== e.nodeName.toLowerCase()) {
                        k = q(f);
                        (b = e.getAttribute("id")) ? d = b.replace(na, "\\$&"): e.setAttribute("id", d);
                        d = "[id='" + d + "'] ";
                        for (y = k.length; y--;) k[y] = d + t(k[y]);
                        y = fa.test(f) && p(e.parentNode) || e;
                        h = k.join(",")
                    }
                    if (h) try {
                        return M.apply(c, y.querySelectorAll(h)), c
                    } catch (ja) {} finally {
                        b || e.removeAttribute("id")
                    }
                }
            }
            return z(f.replace(ua,
                "$1"), e, c, v)
        }

        function c() {
            function f(q, a) {
                e.push(q + " ") > A.cacheLength && delete f[e.shift()];
                return f[q + " "] = a
            }
            var e = [];
            return f
        }

        function b(f) {
            f[L] = !0;
            return f
        }

        function d(f) {
            var e = Ra.createElement("div");
            try {
                return !!f(e)
            } catch (q) {
                return !1
            } finally {
                e.parentNode && e.parentNode.removeChild(e)
            }
        }

        function k(f, e) {
            for (var q = f.split("|"), a = f.length; a--;) A.attrHandle[q[a]] = e
        }

        function h(f, e) {
            var q = e && f,
                a = q && 1 === f.nodeType && 1 === e.nodeType && (~e.sourceIndex || -2147483648) - (~f.sourceIndex || -2147483648);
            if (a) return a;
            if (q)
                for (; q = q.nextSibling;)
                    if (q === e) return -1;
            return f ? 1 : -1
        }

        function g(f) {
            return function(e) {
                return "input" === e.nodeName.toLowerCase() && e.type === f
            }
        }

        function m(f) {
            return function(e) {
                var q = e.nodeName.toLowerCase();
                return ("input" === q || "button" === q) && e.type === f
            }
        }

        function l(f) {
            return b(function(e) {
                e = +e;
                return b(function(q, a) {
                    for (var c, v = f([], q.length, e), b = v.length; b--;) q[c = v[b]] && (q[c] = !(a[c] = q[c]))
                })
            })
        }

        function p(f) {
            return f && "undefined" !== typeof f.getElementsByTagName && f
        }

        function n() {}

        function t(f) {
            for (var e =
                    0, q = f.length, a = ""; e < q; e++) a += f[e].value;
            return a
        }

        function x(f, e, q) {
            var a = e.dir,
                c = q && "parentNode" === a,
                v = I++;
            return e.first ? function(e, q, v) {
                for (; e = e[a];)
                    if (1 === e.nodeType || c) return f(e, q, v)
            } : function(e, q, b) {
                var d, y, z = [Ga, v];
                if (b)
                    for (; e = e[a];) {
                        if ((1 === e.nodeType || c) && f(e, q, b)) return !0
                    } else
                        for (; e = e[a];)
                            if (1 === e.nodeType || c) {
                                y = e[L] || (e[L] = {});
                                if ((d = y[a]) && d[0] === Ga && d[1] === v) return z[2] = d[2];
                                y[a] = z;
                                if (z[2] = f(e, q, b)) return !0
                            }
            }
        }

        function r(f) {
            return 1 < f.length ? function(e, q, a) {
                for (var c = f.length; c--;)
                    if (!f[c](e,
                            q, a)) return !1;
                return !0
            } : f[0]
        }

        function G(f, e, q, a, c) {
            for (var v, b = [], d = 0, y = f.length, z = null != e; d < y; d++)
                if (v = f[d])
                    if (!q || q(v, a, c)) b.push(v), z && e.push(d);
            return b
        }

        function w(f, e, q, c, v, d) {
            c && !c[L] && (c = w(c));
            v && !v[L] && (v = w(v, d));
            return b(function(b, d, z, k) {
                var h, ja, g = [],
                    m = [],
                    N = d.length,
                    l;
                if (!(l = b)) {
                    l = e || "*";
                    for (var H = z.nodeType ? [z] : z, Ta = [], p = 0, n = H.length; p < n; p++) a(l, H[p], Ta);
                    l = Ta
                }
                l = !f || !b && e ? l : G(l, g, f, z, k);
                H = q ? v || (b ? f : N || c) ? [] : d : l;
                q && q(l, H, z, k);
                if (c)
                    for (h = G(H, m), c(h, [], z, k), z = h.length; z--;)
                        if (ja = h[z]) H[m[z]] = !(l[m[z]] = ja);
                if (b) {
                    if (v || f) {
                        if (v) {
                            h = [];
                            for (z = H.length; z--;)(ja = H[z]) && h.push(l[z] = ja);
                            v(null, H = [], h, k)
                        }
                        for (z = H.length; z--;)(ja = H[z]) && -1 < (h = v ? Ca(b, ja) : g[z]) && (b[h] = !(d[h] = ja))
                    }
                } else H = G(H === d ? H.splice(N, H.length) : H), v ? v(null, d, H, k) : M.apply(d, H)
            })
        }

        function J(f) {
            var e, q, a, c = f.length,
                v = A.relative[f[0].type];
            q = v || A.relative[" "];
            for (var b = v ? 1 : 0, d = x(function(f) {
                    return f === e
                }, q, !0), y = x(function(f) {
                    return -1 < Ca(e, f)
                }, q, !0), z = [function(f, q, a) {
                    f = !v && (a || q !== N) || ((e = q).nodeType ? d(f, q, a) : y(f, q, a));
                    e = null;
                    return f
                }]; b <
                c; b++)
                if (q = A.relative[f[b].type]) z = [x(r(z), q)];
                else {
                    q = A.filter[f[b].type].apply(null, f[b].matches);
                    if (q[L]) {
                        for (a = ++b; a < c && !A.relative[f[a].type]; a++);
                        return w(1 < b && r(z), 1 < b && t(f.slice(0, b - 1).concat({
                            value: " " === f[b - 2].type ? "*" : ""
                        })).replace(ua, "$1"), q, b < a && J(f.slice(b, a)), a < c && J(f = f.slice(a)), a < c && t(f))
                    }
                    z.push(q)
                }
            return r(z)
        }

        function B(f, e) {
            var q = 0 < e.length,
                c = 0 < f.length,
                v = function(v, b, d, z, k) {
                    var h, ja, g, m = 0,
                        l = "0",
                        H = v && [],
                        Ta = [],
                        p = N,
                        n = v || c && A.find.TAG("*", k),
                        t = Ga += null == p ? 1 : Math.random() || .1,
                        Tb = n.length;
                    for (k && (N = b !== Ra && b); l !== Tb && null != (h = n[l]); l++) {
                        if (c && h) {
                            for (ja = 0; g = f[ja++];)
                                if (g(h, b, d)) {
                                    z.push(h);
                                    break
                                }
                            k && (Ga = t)
                        }
                        q && ((h = !g && h) && m--, v && H.push(h))
                    }
                    m += l;
                    if (q && l !== m) {
                        for (ja = 0; g = e[ja++];) g(H, Ta, b, d);
                        if (v) {
                            if (0 < m)
                                for (; l--;) H[l] || Ta[l] || (Ta[l] = O.call(z));
                            Ta = G(Ta)
                        }
                        M.apply(z, Ta);
                        k && !v && 0 < Ta.length && 1 < m + e.length && a.uniqueSort(z)
                    }
                    k && (Ga = t, N = p);
                    return H
                };
            return q ? b(v) : v
        }

        var D, u, A, F, f, q, v, z, N, H, Za, Xb, Ra, E, ca, La, Q, K, T, L = "sizzle" + 1 * new Date,
            C = e.document,
            Ga = 0,
            I = 0,
            V = c(),
            ma = c(),
            id = c(),
            Xa = function(f, e) {
                f === e &&
                    (Za = !0);
                return 0
            },
            R = {}.hasOwnProperty,
            W = [],
            O = W.pop,
            ta = W.push,
            M = W.push,
            Gb = W.slice,
            Ca = function(f, e) {
                for (var q = 0, a = f.length; q < a; q++)
                    if (f[q] === e) return q;
                return -1
            },
            P = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+".replace("w", "w#"),
            Ob = "\\[[\\x20\\t\\r\\n\\f]*((?:\\\\.|[\\w-]|[^\\x00-\\xa0])+)(?:[\\x20\\t\\r\\n\\f]*([*^$|!~]?=)[\\x20\\t\\r\\n\\f]*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + P + "))|)[\\x20\\t\\r\\n\\f]*\\]",
            Ba = ":((?:\\\\.|[\\w-]|[^\\x00-\\xa0])+)(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" +
            Ob + ")*)|.*)\\)|)",
            aa = /[\x20\t\r\n\f]+/g,
            ua = /^[\x20\t\r\n\f]+|((?:^|[^\\])(?:\\.)*)[\x20\t\r\n\f]+$/g,
            ga = /^[\x20\t\r\n\f]*,[\x20\t\r\n\f]*/,
            ba = /^[\x20\t\r\n\f]*([>+~]|[\x20\t\r\n\f])[\x20\t\r\n\f]*/,
            rb = /=[\x20\t\r\n\f]*([^\]'"]*?)[\x20\t\r\n\f]*\]/g,
            ha = new RegExp(Ba),
            ea = new RegExp("^" + P + "$"),
            Z = {
                ID: /^#((?:\\.|[\w-]|[^\x00-\xa0])+)/,
                CLASS: /^\.((?:\\.|[\w-]|[^\x00-\xa0])+)/,
                TAG: new RegExp("^(" + "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+".replace("w", "w*") + ")"),
                ATTR: new RegExp("^" + Ob),
                PSEUDO: new RegExp("^" + Ba),
                CHILD: /^:(only|first|last|nth|nth-last)-(child|of-type)(?:\([\x20\t\r\n\f]*(even|odd|(([+-]|)(\d*)n|)[\x20\t\r\n\f]*(?:([+-]|)[\x20\t\r\n\f]*(\d+)|))[\x20\t\r\n\f]*\)|)/i,
                bool: /^(?:checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped)$/i,
                needsContext: /^[\x20\t\r\n\f]*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\([\x20\t\r\n\f]*((?:-\d)?\d*)[\x20\t\r\n\f]*\)|)(?=[^-]|$)/i
            },
            la = /^(?:input|select|textarea|button)$/i,
            Ib = /^h\d$/i,
            fb =
            /^[^{]+\{\s*\[native \w/,
            Wb = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
            fa = /[+~]/,
            na = /'|\\/g,
            U = /\\([\da-f]{1,6}[\x20\t\r\n\f]?|([\x20\t\r\n\f])|.)/ig,
            ka = function(f, e, q) {
                f = "0x" + e - 65536;
                return f !== f || q ? e : 0 > f ? String.fromCharCode(f + 65536) : String.fromCharCode(f >> 10 | 55296, f & 1023 | 56320)
            },
            da = function() {
                Xb()
            };

        try {
            M.apply(W = Gb.call(C.childNodes), C.childNodes), W[C.childNodes.length].nodeType
        } catch (ie) {
            M = {
                apply: W.length ? function(f, e) {
                    ta.apply(f, Gb.call(e))
                } : function(f, e) {
                    for (var q = f.length, a = 0; f[q++] = e[a++];);
                    f.length =
                        q - 1
                }
            }
        }

        u = a.support = {};
        f = a.isXML = function(f) {
            return (f = f && (f.ownerDocument || f).documentElement) ? "HTML" !== f.nodeName : !1
        };
        Xb = a.setDocument = function(e) {
            var q = e ? e.ownerDocument || e : C;
            if (q === Ra || 9 !== q.nodeType || !q.documentElement) return Ra;
            Ra = q;
            E = q.documentElement;
            (e = q.defaultView) && e !== e.top && (e.addEventListener ? e.addEventListener("unload", da, !1) : e.attachEvent && e.attachEvent("onunload", da));
            ca = !f(q);
            u.attributes = d(function(f) {
                f.className = "i";
                return !f.getAttribute("className")
            });
            u.getElementsByTagName = d(function(f) {
                f.appendChild(q.createComment(""));
                return !f.getElementsByTagName("*").length
            });
            u.getElementsByClassName = fb.test(q.getElementsByClassName);
            u.getById = d(function(f) {
                E.appendChild(f).id = L;
                return !q.getElementsByName || !q.getElementsByName(L).length
            });
            u.getById ? (A.find.ID = function(f, e) {
                if ("undefined" !== typeof e.getElementById && ca) {
                    var q = e.getElementById(f);
                    return q && q.parentNode ? [q] : []
                }
            }, A.filter.ID = function(f) {
                var e = f.replace(U, ka);
                return function(f) {
                    return f.getAttribute("id") === e
                }
            }) : (delete A.find.ID, A.filter.ID = function(f) {
                var e = f.replace(U,
                    ka);
                return function(f) {
                    return (f = "undefined" !== typeof f.getAttributeNode && f.getAttributeNode("id")) && f.value === e
                }
            });
            A.find.TAG = u.getElementsByTagName ? function(f, e) {
                if ("undefined" !== typeof e.getElementsByTagName) return e.getElementsByTagName(f);
                if (u.qsa) return e.querySelectorAll(f)
            } : function(f, e) {
                var q, a = [],
                    c = 0,
                    v = e.getElementsByTagName(f);
                if ("*" === f) {
                    for (; q = v[c++];) 1 === q.nodeType && a.push(q);
                    return a
                }
                return v
            };
            A.find.CLASS = u.getElementsByClassName && function(f, e) {
                if (ca) return e.getElementsByClassName(f)
            };
            Q = [];
            La = [];
            if (u.qsa = fb.test(q.querySelectorAll)) d(function(f) {
                E.appendChild(f).innerHTML = "<a id='" + L + "'></a><select id='" + L + "-\f]' msallowcapture=''><option selected=''></option></select>";
                f.querySelectorAll("[msallowcapture^='']").length && La.push("[*^$]=[\\x20\\t\\r\\n\\f]*(?:''|\"\")");
                f.querySelectorAll("[selected]").length || La.push("\\[[\\x20\\t\\r\\n\\f]*(?:value|checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped)");
                f.querySelectorAll("[id~=" +
                    L + "-]").length || La.push("~=");
                f.querySelectorAll(":checked").length || La.push(":checked");
                f.querySelectorAll("a#" + L + "+*").length || La.push(".#.+[+~]")
            }), d(function(f) {
                var e = q.createElement("input");
                e.setAttribute("type", "hidden");
                f.appendChild(e).setAttribute("name", "D");
                f.querySelectorAll("[name=d]").length && La.push("name[\\x20\\t\\r\\n\\f]*[*^$|!~]?=");
                f.querySelectorAll(":enabled").length || La.push(":enabled", ":disabled");
                f.querySelectorAll("*,:x");
                La.push(",.*:")
            });
            (u.matchesSelector = fb.test(K = E.matches ||
                E.webkitMatchesSelector || E.mozMatchesSelector || E.oMatchesSelector || E.msMatchesSelector)) && d(function(f) {
                u.disconnectedMatch = K.call(f, "div");
                K.call(f, "[s!='']:x");
                Q.push("!=", Ba)
            });
            La = La.length && new RegExp(La.join("|"));
            Q = Q.length && new RegExp(Q.join("|"));
            T = (e = fb.test(E.compareDocumentPosition)) || fb.test(E.contains) ? function(f, e) {
                var q = 9 === f.nodeType ? f.documentElement : f,
                    a = e && e.parentNode;
                return f === a || !!(a && 1 === a.nodeType && (q.contains ? q.contains(a) : f.compareDocumentPosition && f.compareDocumentPosition(a) &
                    16))
            } : function(f, e) {
                if (e)
                    for (; e = e.parentNode;)
                        if (e === f) return !0;
                return !1
            };
            Xa = e ? function(f, e) {
                if (f === e) return Za = !0, 0;
                var a = !f.compareDocumentPosition - !e.compareDocumentPosition;
                if (a) return a;
                a = (f.ownerDocument || f) === (e.ownerDocument || e) ? f.compareDocumentPosition(e) : 1;
                return a & 1 || !u.sortDetached && e.compareDocumentPosition(f) === a ? f === q || f.ownerDocument === C && T(C, f) ? -1 : e === q || e.ownerDocument === C && T(C, e) ? 1 : H ? Ca(H, f) - Ca(H, e) : 0 : a & 4 ? -1 : 1
            } : function(f, e) {
                if (f === e) return Za = !0, 0;
                var a, c = 0;
                a = f.parentNode;
                var v =
                    e.parentNode,
                    b = [f],
                    d = [e];
                if (!a || !v) return f === q ? -1 : e === q ? 1 : a ? -1 : v ? 1 : H ? Ca(H, f) - Ca(H, e) : 0;
                if (a === v) return h(f, e);
                for (a = f; a = a.parentNode;) b.unshift(a);
                for (a = e; a = a.parentNode;) d.unshift(a);
                for (; b[c] === d[c];) c++;
                return c ? h(b[c], d[c]) : b[c] === C ? -1 : d[c] === C ? 1 : 0
            };
            return q
        };

        a.matches = function(f, e) {
            return a(f, null, null, e)
        };

        a.matchesSelector = function(f, e) {
            (f.ownerDocument || f) !== Ra && Xb(f);
            e = e.replace(rb, "='$1']");
            if (!(!u.matchesSelector || !ca || Q && Q.test(e) || La && La.test(e))) try {
                var q = K.call(f, e);
                if (q || u.disconnectedMatch ||
                    f.document && 11 !== f.document.nodeType) return q
            } catch (c) {}
            return 0 < a(e, Ra, null, [f]).length
        };

        a.contains = function(f, e) {
            (f.ownerDocument || f) !== Ra && Xb(f);
            return T(f, e)
        };

        a.attr = function(f, e) {
            (f.ownerDocument || f) !== Ra && Xb(f);
            var q = A.attrHandle[e.toLowerCase()],
                q = q && R.call(A.attrHandle, e.toLowerCase()) ? q(f, e, !ca) : void 0;
            return void 0 !== q ? q : u.attributes || !ca ? f.getAttribute(e) : (q = f.getAttributeNode(e)) && q.specified ? q.value : null
        };

        a.error = function(f) {
            throw Error("Syntax error, unrecognized expression: " + f);
        };

        a.uniqueSort = function(f) {
            var e, q = [],
                a = 0,
                c = 0;
            Za = !u.detectDuplicates;
            H = !u.sortStable && f.slice(0);
            f.sort(Xa);
            if (Za) {
                for (; e = f[c++];) e === f[c] && (a = q.push(c));
                for (; a--;) f.splice(q[a], 1)
            }
            H = null;
            return f
        };

        F = a.getText = function(f) {
            var e, q = "",
                a = 0;
            e = f.nodeType;
            if (!e)
                for (; e = f[a++];) q += F(e);
            else if (1 === e || 9 === e || 11 === e) {
                if ("string" === typeof f.textContent) return f.textContent;
                for (f = f.firstChild; f; f = f.nextSibling) q += F(f)
            } else if (3 === e || 4 === e) return f.nodeValue;
            return q
        };

        A = a.selectors = {
            cacheLength: 50,
            createPseudo: b,
            match: Z,
            attrHandle: {},
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(f) {
                    f[1] = f[1].replace(U, ka);
                    f[3] = (f[3] || f[4] || f[5] || "").replace(U, ka);
                    "~=" === f[2] && (f[3] = " " + f[3] + " ");
                    return f.slice(0, 4)
                },
                CHILD: function(f) {
                    f[1] = f[1].toLowerCase();
                    "nth" === f[1].slice(0, 3) ? (f[3] || a.error(f[0]), f[4] = +(f[4] ? f[5] + (f[6] || 1) : 2 * ("even" === f[3] || "odd" === f[3])), f[5] = +(f[7] + f[8] || "odd" === f[3])) : f[3] && a.error(f[0]);
                    return f
                },
                PSEUDO: function(f) {
                    var e, a = !f[6] && f[2];
                    if (Z.CHILD.test(f[0])) return null;
                    f[3] ? f[2] = f[4] || f[5] || "" : a && ha.test(a) && (e = q(a, !0)) && (e = a.indexOf(")", a.length - e) - a.length) && (f[0] = f[0].slice(0, e), f[2] = a.slice(0, e));
                    return f.slice(0, 3)
                }
            },
            filter: {
                TAG: function(f) {
                    var e = f.replace(U, ka).toLowerCase();
                    return "*" === f ? function() {
                        return !0
                    } : function(f) {
                        return f.nodeName && f.nodeName.toLowerCase() === e
                    }
                },
                CLASS: function(f) {
                    var e = V[f + " "];
                    return e || (e = new RegExp("(^|[\\x20\\t\\r\\n\\f])" + f + "([\\x20\\t\\r\\n\\f]|$)")) &&
                        V(f, function(f) {
                            return e.test("string" === typeof f.className && f.className || "undefined" !== typeof f.getAttribute && f.getAttribute("class") || "")
                        })
                },
                ATTR: function(f, e, q) {
                    return function(c) {
                        c = a.attr(c, f);
                        if (null == c) return "!=" === e;
                        if (!e) return !0;
                        c += "";
                        return "=" === e ? c === q : "!=" === e ? c !== q : "^=" === e ? q && 0 === c.indexOf(q) : "*=" === e ? q && -1 < c.indexOf(q) : "$=" === e ? q && c.slice(-q.length) === q : "~=" === e ? -1 < (" " + c.replace(aa, " ") + " ").indexOf(q) : "|=" === e ? c === q || c.slice(0, q.length + 1) === q + "-" : !1
                    }
                },
                CHILD: function(f, e, q, a, c) {
                    var v =
                        "nth" !== f.slice(0, 3),
                        b = "last" !== f.slice(-4),
                        d = "of-type" === e;
                    return 1 === a && 0 === c ? function(f) {
                        return !!f.parentNode
                    } : function(e, q, y) {
                        var z, k, h, ja, g;
                        q = v !== b ? "nextSibling" : "previousSibling";
                        var m = e.parentNode,
                            l = d && e.nodeName.toLowerCase();
                        y = !y && !d;
                        if (m) {
                            if (v) {
                                for (; q;) {
                                    for (k = e; k = k[q];)
                                        if (d ? k.nodeName.toLowerCase() === l : 1 === k.nodeType) return !1;
                                    g = q = "only" === f && !g && "nextSibling"
                                }
                                return !0
                            }
                            g = [b ? m.firstChild : m.lastChild];
                            if (b && y)
                                for (y = m[L] || (m[L] = {}), z = y[f] || [], ja = z[0] === Ga && z[1], h = z[0] === Ga && z[2], k = ja && m.childNodes[ja]; k =
                                    ++ja && k && k[q] || (h = ja = 0) || g.pop();) {
                                    if (1 === k.nodeType && ++h && k === e) {
                                        y[f] = [Ga, ja, h];
                                        break
                                    }
                                } else if (y && (z = (e[L] || (e[L] = {}))[f]) && z[0] === Ga) h = z[1];
                                else
                                    for (;
                                        (k = ++ja && k && k[q] || (h = ja = 0) || g.pop()) && ((d ? k.nodeName.toLowerCase() !== l : 1 !== k.nodeType) || !++h || (y && ((k[L] || (k[L] = {}))[f] = [Ga, h]), k !== e)););
                            h -= c;
                            return h === a || 0 === h % a && 0 <= h / a
                        }
                    }
                },
                PSEUDO: function(f, e) {
                    var q, c = A.pseudos[f] || A.setFilters[f.toLowerCase()] || a.error("unsupported pseudo: " + f);
                    return c[L] ? c(e) : 1 < c.length ? (q = [f, f, "", e], A.setFilters.hasOwnProperty(f.toLowerCase()) ?
                        b(function(f, q) {
                            for (var a, v = c(f, e), b = v.length; b--;) a = Ca(f, v[b]), f[a] = !(q[a] = v[b])
                        }) : function(f) {
                            return c(f, 0, q)
                        }) : c
                }
            },
            pseudos: {
                not: b(function(f) {
                    var e = [],
                        q = [],
                        a = v(f.replace(ua, "$1"));
                    return a[L] ? b(function(f, e, q, c) {
                        c = a(f, null, c, []);
                        for (var v = f.length; v--;)
                            if (q = c[v]) f[v] = !(e[v] = q)
                    }) : function(f, c, v) {
                        e[0] = f;
                        a(e, null, v, q);
                        e[0] = null;
                        return !q.pop()
                    }
                }),
                has: b(function(f) {
                    return function(e) {
                        return 0 < a(f, e).length
                    }
                }),
                contains: b(function(f) {
                    f = f.replace(U, ka);
                    return function(e) {
                        return -1 < (e.textContent || e.innerText ||
                            F(e)).indexOf(f)
                    }
                }),
                lang: b(function(f) {
                    ea.test(f || "") || a.error("unsupported lang: " + f);
                    f = f.replace(U, ka).toLowerCase();
                    return function(e) {
                        var q;
                        do
                            if (q = ca ? e.lang : e.getAttribute("xml:lang") || e.getAttribute("lang")) return q = q.toLowerCase(), q === f || 0 === q.indexOf(f + "-"); while ((e = e.parentNode) && 1 === e.nodeType);
                        return !1
                    }
                }),
                target: function(f) {
                    var q = e.location && e.location.hash;
                    return q && q.slice(1) === f.id
                },
                root: function(f) {
                    return f === E
                },
                focus: function(f) {
                    return f === Ra.activeElement && (!Ra.hasFocus || Ra.hasFocus()) &&
                        !!(f.type || f.href || ~f.tabIndex)
                },
                enabled: function(f) {
                    return !1 === f.disabled
                },
                disabled: function(f) {
                    return !0 === f.disabled
                },
                checked: function(f) {
                    var e = f.nodeName.toLowerCase();
                    return "input" === e && !!f.checked || "option" === e && !!f.selected
                },
                selected: function(f) {
                    f.parentNode && f.parentNode.selectedIndex;
                    return !0 === f.selected
                },
                empty: function(f) {
                    for (f = f.firstChild; f; f = f.nextSibling)
                        if (6 > f.nodeType) return !1;
                    return !0
                },
                parent: function(f) {
                    return !A.pseudos.empty(f)
                },
                header: function(f) {
                    return Ib.test(f.nodeName)
                },
                input: function(f) {
                    return la.test(f.nodeName)
                },
                button: function(f) {
                    var e = f.nodeName.toLowerCase();
                    return "input" === e && "button" === f.type || "button" === e
                },
                text: function(f) {
                    var e;
                    return "input" === f.nodeName.toLowerCase() && "text" === f.type && (null == (e = f.getAttribute("type")) || "text" === e.toLowerCase())
                },
                first: l(function() {
                    return [0]
                }),
                last: l(function(f, e) {
                    return [e - 1]
                }),
                eq: l(function(f, e, q) {
                    return [0 > q ? q + e : q]
                }),
                even: l(function(f, e) {
                    for (var q = 0; q < e; q += 2) f.push(q);
                    return f
                }),
                odd: l(function(f, e) {
                    for (var q = 1; q < e; q += 2) f.push(q);
                    return f
                }),
                lt: l(function(f, e, q) {
                    for (e =
                        0 > q ? q + e : q; 0 <= --e;) f.push(e);
                    return f
                }),
                gt: l(function(f, e, q) {
                    for (q = 0 > q ? q + e : q; ++q < e;) f.push(q);
                    return f
                })
            }
        };

        A.pseudos.nth = A.pseudos.eq;
        for (D in {
                radio: !0,
                checkbox: !0,
                file: !0,
                password: !0,
                image: !0
            }) A.pseudos[D] = g(D);
        for (D in {
                submit: !0,
                reset: !0
            }) A.pseudos[D] = m(D);

        n.prototype = A.filters = A.pseudos;
        A.setFilters = new n;
        q = a.tokenize = function(f, e) {
            var q, c, v, b, d, z, k;
            if (d = ma[f + " "]) return e ? 0 : d.slice(0);
            d = f;
            z = [];
            for (k = A.preFilter; d;) {
                if (!q || (c = ga.exec(d))) c && (d = d.slice(c[0].length) || d), z.push(v = []);
                q = !1;
                if (c = ba.exec(d)) q =
                    c.shift(), v.push({
                        value: q,
                        type: c[0].replace(ua, " ")
                    }), d = d.slice(q.length);
                for (b in A.filter) !(c = Z[b].exec(d)) || k[b] && !(c = k[b](c)) || (q = c.shift(), v.push({
                    value: q,
                    type: b,
                    matches: c
                }), d = d.slice(q.length));
                if (!q) break
            }
            return e ? d.length : d ? a.error(f) : ma(f, z).slice(0)
        };

        v = a.compile = function(f, e) {
            var a, c = [],
                v = [],
                b = id[f + " "];
            if (!b) {
                e || (e = q(f));
                for (a = e.length; a--;) b = J(e[a]), b[L] ? c.push(b) : v.push(b);
                b = id(f, B(v, c));
                b.selector = f
            }
            return b
        };

        z = a.select = function(f, e, a, c) {
            var b, d, y, z, k = "function" === typeof f && f,
                h = !c &&
                q(f = k.selector || f);
            a = a || [];
            if (1 === h.length) {
                d = h[0] = h[0].slice(0);
                if (2 < d.length && "ID" === (y = d[0]).type && u.getById && 9 === e.nodeType && ca && A.relative[d[1].type]) {
                    e = (A.find.ID(y.matches[0].replace(U, ka), e) || [])[0];
                    if (!e) return a;
                    k && (e = e.parentNode);
                    f = f.slice(d.shift().value.length)
                }
                for (b = Z.needsContext.test(f) ? 0 : d.length; b--;) {
                    y = d[b];
                    if (A.relative[z = y.type]) break;
                    if (z = A.find[z])
                        if (c = z(y.matches[0].replace(U, ka), fa.test(d[0].type) && p(e.parentNode) || e)) {
                            d.splice(b, 1);
                            f = c.length && t(d);
                            if (!f) return M.apply(a,
                                c), a;
                            break
                        }
                }
            }(k || v(f, h))(c, e, !ca, a, fa.test(f) && p(e.parentNode) || e);
            return a
        };

        u.sortStable = L.split("").sort(Xa).join("") === L;
        u.detectDuplicates = !!Za;
        Xb();

        u.sortDetached = d(function(f) {
            return f.compareDocumentPosition(Ra.createElement("div")) & 1
        });

        d(function(f) {
            f.innerHTML = "<a href='#'></a>";
            return "#" === f.firstChild.getAttribute("href")
        }) || k("type|href|height|width", function(f, e, q) {
            if (!q) return f.getAttribute(e, "type" === e.toLowerCase() ? 1 : 2)
        });

        u.attributes && d(function(f) {
            f.innerHTML = "<input/>";
            f.firstChild.setAttribute("value",
                "");
            return "" === f.firstChild.getAttribute("value")
        }) || k("value", function(f, e, q) {
            if (!q && "input" === f.nodeName.toLowerCase()) return f.defaultValue
        });

        d(function(f) {
            return null == f.getAttribute("disabled")
        }) || k("checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", function(f, e, q) {
            var a;
            if (!q) return !0 === f[e] ? e.toLowerCase() : (a = f.getAttributeNode(e)) && a.specified ? a.value : null
        });

        return a
    }(g);

    k.find = oa;
    k.expr = oa.selectors;
    k.expr[":"] = k.expr.pseudos;
    k.unique = oa.uniqueSort;
    k.text = oa.getText;
    k.isXMLDoc = oa.isXML;
    k.contains = oa.contains;
    var I = k.expr.match.needsContext,
        c = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
        dd = /^.[^:#\[\.,]*$/;
    k.filter = function(e, a, c) {
        var b = a[0];
        c && (e = ":not(" + e + ")");
        return 1 === a.length && 1 === b.nodeType ? k.find.matchesSelector(b, e) ? [b] : [] : k.find.matches(e, k.grep(a, function(e) {
            return 1 === e.nodeType
        }))
    };
    k.fn.extend({
        find: function(e) {
            var a, c = this.length,
                b = [],
                d = this;
            if ("string" !== typeof e) return this.pushStack(k(e).filter(function() {
                for (a = 0; a < c; a++)
                    if (k.contains(d[a],
                            this)) return !0
            }));
            for (a = 0; a < c; a++) k.find(e, d[a], b);
            b = this.pushStack(1 < c ? k.unique(b) : b);
            b.selector = this.selector ? this.selector + " " + e : e;
            return b
        },
        filter: function(e) {
            return this.pushStack(a(this, e || [], !1))
        },
        not: function(e) {
            return this.pushStack(a(this, e || [], !0))
        },
        is: function(e) {
            return !!a(this, "string" === typeof e && I.test(e) ? k(e) : e || [], !1).length
        }
    });
    var rc, jd = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/;
    (k.fn.init = function(e, a) {
        var b;
        if (!e) return this;
        if ("string" === typeof e) {
            b = "<" === e[0] && ">" === e[e.length - 1] &&
                3 <= e.length ? [null, e, null] : jd.exec(e);
            if (!b || !b[1] && a) return !a || a.jquery ? (a || rc).find(e) : this.constructor(a).find(e);
            if (b[1]) {
                if (a = a instanceof k ? a[0] : a, k.merge(this, k.parseHTML(b[1], a && a.nodeType ? a.ownerDocument || a : P, !0)), c.test(b[1]) && k.isPlainObject(a))
                    for (b in a)
                        if (k.isFunction(this[b])) this[b](a[b]);
                        else this.attr(b, a[b])
            } else(b = P.getElementById(b[2])) && b.parentNode && (this.length = 1, this[0] = b), this.context = P, this.selector = e;
            return this
        }
        if (e.nodeType) return this.context = this[0] = e, this.length = 1,
            this;
        if (k.isFunction(e)) return "undefined" !== typeof rc.ready ? rc.ready(e) : e(k);
        void 0 !== e.selector && (this.selector = e.selector, this.context = e.context);
        return k.makeArray(e, this)
    }).prototype = k.fn;
    rc = k(P);
    var Ac = /^(?:parents|prev(?:Until|All))/,
        Nb = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        };
    k.extend({
        dir: function(e, a, c) {
            for (var b = [], d = void 0 !== c;
                (e = e[a]) && 9 !== e.nodeType;)
                if (1 === e.nodeType) {
                    if (d && k(e).is(c)) break;
                    b.push(e)
                }
            return b
        },
        sibling: function(e, a) {
            for (var c = []; e; e = e.nextSibling) 1 === e.nodeType && e !==
                a && c.push(e);
            return c
        }
    });
    k.fn.extend({
        has: function(e) {
            var a = k(e, this),
                c = a.length;
            return this.filter(function() {
                for (var e = 0; e < c; e++)
                    if (k.contains(this, a[e])) return !0
            })
        },
        closest: function(e, a) {
            for (var c, b = 0, d = this.length, h = [], g = I.test(e) || "string" !== typeof e ? k(e, a || this.context) : 0; b < d; b++)
                for (c = this[b]; c && c !== a; c = c.parentNode)
                    if (11 > c.nodeType && (g ? -1 < g.index(c) : 1 === c.nodeType && k.find.matchesSelector(c, e))) {
                        h.push(c);
                        break
                    }
            return this.pushStack(1 < h.length ? k.unique(h) : h)
        },
        index: function(e) {
            return e ? "string" ===
                typeof e ? Pa.call(k(e), this[0]) : Pa.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        },
        add: function(e, a) {
            return this.pushStack(k.unique(k.merge(this.get(), k(e, a))))
        },
        addBack: function(e) {
            return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
        }
    });
    k.each({
        parent: function(e) {
            return (e = e.parentNode) && 11 !== e.nodeType ? e : null
        },
        parents: function(e) {
            return k.dir(e, "parentNode")
        },
        parentsUntil: function(e, a, c) {
            return k.dir(e, "parentNode", c)
        },
        next: function(e) {
            return b(e,
                "nextSibling")
        },
        prev: function(e) {
            return b(e, "previousSibling")
        },
        nextAll: function(e) {
            return k.dir(e, "nextSibling")
        },
        prevAll: function(e) {
            return k.dir(e, "previousSibling")
        },
        nextUntil: function(e, a, c) {
            return k.dir(e, "nextSibling", c)
        },
        prevUntil: function(e, a, c) {
            return k.dir(e, "previousSibling", c)
        },
        siblings: function(e) {
            return k.sibling((e.parentNode || {}).firstChild, e)
        },
        children: function(e) {
            return k.sibling(e.firstChild)
        },
        contents: function(e) {
            return e.contentDocument || k.merge([], e.childNodes)
        }
    }, function(e,
        a) {
        k.fn[e] = function(c, b) {
            var d = k.map(this, a, c);
            "Until" !== e.slice(-5) && (b = c);
            b && "string" === typeof b && (d = k.filter(b, d));
            1 < this.length && (Nb[e] || k.unique(d), Ac.test(e) && d.reverse());
            return this.pushStack(d)
        }
    });
    var Qa = /\S+/g,
        hc = {};
    k.Callbacks = function(e) {
        e = "string" === typeof e ? hc[e] || h(e) : k.extend({}, e);
        var a, c, b, d, g, m, l = [],
            p = !e.once && [],
            n = function(k) {
                a = e.memory && k;
                c = !0;
                m = d || 0;
                d = 0;
                g = l.length;
                for (b = !0; l && m < g; m++)
                    if (!1 === l[m].apply(k[0], k[1]) && e.stopOnFalse) {
                        a = !1;
                        break
                    }
                b = !1;
                l && (p ? p.length && n(p.shift()) : a ?
                    l = [] : t.disable())
            },
            t = {
                add: function() {
                    if (l) {
                        var c = l.length;
                        (function Pc(a) {
                            k.each(a, function(a, c) {
                                var b = k.type(c);
                                "function" === b ? e.unique && t.has(c) || l.push(c) : c && c.length && "string" !== b && Pc(c)
                            })
                        })(arguments);
                        b ? g = l.length : a && (d = c, n(a))
                    }
                    return this
                },
                remove: function() {
                    l && k.each(arguments, function(e, a) {
                        for (var c; - 1 < (c = k.inArray(a, l, c));) l.splice(c, 1), b && (c <= g && g--, c <= m && m--)
                    });
                    return this
                },
                has: function(e) {
                    return e ? -1 < k.inArray(e, l) : !(!l || !l.length)
                },
                empty: function() {
                    l = [];
                    g = 0;
                    return this
                },
                disable: function() {
                    l =
                        p = a = void 0;
                    return this
                },
                disabled: function() {
                    return !l
                },
                lock: function() {
                    p = void 0;
                    a || t.disable();
                    return this
                },
                locked: function() {
                    return !p
                },
                fireWith: function(e, a) {
                    !l || c && !p || (a = a || [], a = [e, a.slice ? a.slice() : a], b ? p.push(a) : n(a));
                    return this
                },
                fire: function() {
                    t.fireWith(this, arguments);
                    return this
                },
                fired: function() {
                    return !!c
                }
            };
        return t
    };
    k.extend({
        Deferred: function(e) {
            var a = [
                    ["resolve", "done", k.Callbacks("once memory"), "resolved"],
                    ["reject", "fail", k.Callbacks("once memory"), "rejected"],
                    ["notify", "progress",
                        k.Callbacks("memory")
                    ]
                ],
                c = "pending",
                b = {
                    state: function() {
                        return c
                    },
                    always: function() {
                        d.done(arguments).fail(arguments);
                        return this
                    },
                    then: function() {
                        var e = arguments;
                        return k.Deferred(function(c) {
                            k.each(a, function(a, y) {
                                var h = k.isFunction(e[a]) && e[a];
                                d[y[1]](function() {
                                    var e = h && h.apply(this, arguments);
                                    if (e && k.isFunction(e.promise)) e.promise().done(c.resolve).fail(c.reject).progress(c.notify);
                                    else c[y[0] + "With"](this === b ? c.promise() : this, h ? [e] : arguments)
                                })
                            });
                            e = null
                        }).promise()
                    },
                    promise: function(e) {
                        return null !=
                            e ? k.extend(e, b) : b
                    }
                },
                d = {};
            b.pipe = b.then;
            k.each(a, function(e, k) {
                var h = k[2],
                    g = k[3];
                b[k[1]] = h.add;
                g && h.add(function() {
                    c = g
                }, a[e ^ 1][2].disable, a[2][2].lock);
                d[k[0]] = function() {
                    d[k[0] + "With"](this === d ? b : this, arguments);
                    return this
                };
                d[k[0] + "With"] = h.fireWith
            });
            b.promise(d);
            e && e.call(d, d);
            return d
        },
        when: function(e) {
            var a = 0,
                c = xa.call(arguments),
                b = c.length,
                d = 1 !== b || e && k.isFunction(e.promise) ? b : 0,
                h = 1 === d ? e : k.Deferred(),
                g = function(e, a, c) {
                    return function(b) {
                        a[e] = this;
                        c[e] = 1 < arguments.length ? xa.call(arguments) :
                            b;
                        c === l ? h.notifyWith(a, c) : --d || h.resolveWith(a, c)
                    }
                },
                l, m, p;
            if (1 < b)
                for (l = Array(b), m = Array(b), p = Array(b); a < b; a++) c[a] && k.isFunction(c[a].promise) ? c[a].promise().done(g(a, p, c)).fail(h.reject).progress(g(a, m, l)) : --d;
            d || h.resolveWith(p, c);
            return h.promise()
        }
    });
    var sc;
    k.fn.ready = function(e) {
        k.ready.promise().done(e);
        return this
    };
    k.extend({
        isReady: !1,
        readyWait: 1,
        holdReady: function(e) {
            e ? k.readyWait++ : k.ready(!0)
        },
        ready: function(e) {
            (!0 === e ? --k.readyWait : k.isReady) || (k.isReady = !0, !0 !== e && 0 < --k.readyWait || (sc.resolveWith(P, [k]), k.fn.triggerHandler && (k(P).triggerHandler("ready"), k(P).off("ready"))))
        }
    });
    k.ready.promise = function(e) {
        sc || (sc = k.Deferred(), "complete" === P.readyState ? setTimeout(k.ready) : (P.addEventListener("DOMContentLoaded", n, !1), g.addEventListener("load", n, !1)));
        return sc.promise(e)
    };
    k.ready.promise();
    var ya = k.access = function(e, a, c, b, d, h, g) {
        var l = 0,
            m = e.length,
            p = null == c;
        if ("object" === k.type(c))
            for (l in d = !0, c) k.access(e, a, l, c[l], !0, h, g);
        else if (void 0 !== b && (d = !0, k.isFunction(b) || (g = !0), p && (g ? (a.call(e, b), a =
                null) : (p = a, a = function(e, a, c) {
                return p.call(k(e), c)
            })), a))
            for (; l < m; l++) a(e[l], c, g ? b : b.call(e[l], l, a(e[l], c)));
        return d ? e : p ? a.call(e) : m ? a(e[0], c) : h
    };
    k.acceptData = function(e) {
        return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType
    };
    l.uid = 1;
    l.accepts = k.acceptData;
    l.prototype = {
        key: function(e) {
            if (!l.accepts(e)) return 0;
            var a = {},
                c = e[this.expando];
            if (!c) {
                c = l.uid++;
                try {
                    a[this.expando] = {
                        value: c
                    }, Object.defineProperties(e, a)
                } catch (b) {
                    a[this.expando] = c, k.extend(e, a)
                }
            }
            this.cache[c] || (this.cache[c] = {});
            return c
        },
        set: function(e,
            a, c) {
            var b;
            e = this.key(e);
            var d = this.cache[e];
            if ("string" === typeof a) d[a] = c;
            else if (k.isEmptyObject(d)) k.extend(this.cache[e], a);
            else
                for (b in a) d[b] = a[b];
            return d
        },
        get: function(e, a) {
            var c = this.cache[this.key(e)];
            return void 0 === a ? c : c[a]
        },
        access: function(e, a, c) {
            if (void 0 === a || a && "string" === typeof a && void 0 === c) return c = this.get(e, a), void 0 !== c ? c : this.get(e, k.camelCase(a));
            this.set(e, a, c);
            return void 0 !== c ? c : a
        },
        remove: function(e, a) {
            var c, b;
            c = this.key(e);
            var d = this.cache[c];
            if (void 0 === a) this.cache[c] = {};
            else
                for (k.isArray(a) ? b = a.concat(a.map(k.camelCase)) : (c = k.camelCase(a), a in d ? b = [a, c] : (b = c, b = b in d ? [b] : b.match(Qa) || [])), c = b.length; c--;) delete d[b[c]]
        },
        hasData: function(e) {
            return !k.isEmptyObject(this.cache[e[this.expando]] || {})
        },
        discard: function(e) {
            e[this.expando] && delete this.cache[e[this.expando]]
        }
    };
    var C = new l,
        na = new l,
        fd = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
        ed = /([A-Z])/g;
    k.extend({
        hasData: function(e) {
            return na.hasData(e) || C.hasData(e)
        },
        data: function(e, a, c) {
            return na.access(e, a, c)
        },
        removeData: function(e,
            a) {
            na.remove(e, a)
        },
        _data: function(e, a, c) {
            return C.access(e, a, c)
        },
        _removeData: function(e, a) {
            C.remove(e, a)
        }
    });
    k.fn.extend({
        data: function(e, a) {
            var c, b, d, h = this[0],
                g = h && h.attributes;
            if (void 0 === e) {
                if (this.length && (d = na.get(h), 1 === h.nodeType && !C.get(h, "hasDataAttrs"))) {
                    for (c = g.length; c--;) g[c] && (b = g[c].name, 0 === b.indexOf("data-") && (b = k.camelCase(b.slice(5)), w(h, b, d[b])));
                    C.set(h, "hasDataAttrs", !0)
                }
                return d
            }
            return "object" === typeof e ? this.each(function() {
                na.set(this, e)
            }) : ya(this, function(a) {
                var c, b = k.camelCase(e);
                if (h && void 0 === a) {
                    c = na.get(h, e);
                    if (void 0 !== c) return c;
                    c = na.get(h, b);
                    if (void 0 !== c) return c;
                    c = w(h, b, void 0);
                    if (void 0 !== c) return c
                } else this.each(function() {
                    var c = na.get(this, b);
                    na.set(this, b, a); - 1 !== e.indexOf("-") && void 0 !== c && na.set(this, e, a)
                })
            }, null, a, 1 < arguments.length, null, !0)
        },
        removeData: function(e) {
            return this.each(function() {
                na.remove(this, e)
            })
        }
    });
    k.extend({
        queue: function(e, a, c) {
            var b;
            if (e) return a = (a || "fx") + "queue", b = C.get(e, a), c && (!b || k.isArray(c) ? b = C.access(e, a, k.makeArray(c)) : b.push(c)),
                b || []
        },
        dequeue: function(e, a) {
            a = a || "fx";
            var c = k.queue(e, a),
                b = c.length,
                d = c.shift(),
                h = k._queueHooks(e, a),
                g = function() {
                    k.dequeue(e, a)
                };
            "inprogress" === d && (d = c.shift(), b--);
            d && ("fx" === a && c.unshift("inprogress"), delete h.stop, d.call(e, g, h));
            !b && h && h.empty.fire()
        },
        _queueHooks: function(e, a) {
            var c = a + "queueHooks";
            return C.get(e, c) || C.access(e, c, {
                empty: k.Callbacks("once memory").add(function() {
                    C.remove(e, [a + "queue", c])
                })
            })
        }
    });
    k.fn.extend({
        queue: function(e, a) {
            var c = 2;
            "string" !== typeof e && (a = e, e = "fx", c--);
            return arguments.length <
                c ? k.queue(this[0], e) : void 0 === a ? this : this.each(function() {
                    var c = k.queue(this, e, a);
                    k._queueHooks(this, e);
                    "fx" === e && "inprogress" !== c[0] && k.dequeue(this, e)
                })
        },
        dequeue: function(e) {
            return this.each(function() {
                k.dequeue(this, e)
            })
        },
        clearQueue: function(e) {
            return this.queue(e || "fx", [])
        },
        promise: function(e, a) {
            var c, b = 1,
                d = k.Deferred(),
                h = this,
                g = this.length,
                l = function() {
                    --b || d.resolveWith(h, [h])
                };
            "string" !== typeof e && (a = e, e = void 0);
            for (e = e || "fx"; g--;)(c = C.get(h[g], e + "queueHooks")) && c.empty && (b++, c.empty.add(l));
            l();
            return d.promise(a)
        }
    });
    var Sa = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
        db = ["Top", "Right", "Bottom", "Left"],
        pb = function(e, a) {
            e = a || e;
            return "none" === k.css(e, "display") || !k.contains(e.ownerDocument, e)
        },
        Sc = /^(?:checkbox|radio)$/i;
    (function() {
        var e = P.createDocumentFragment().appendChild(P.createElement("div")),
            a = P.createElement("input");
        a.setAttribute("type", "radio");
        a.setAttribute("checked", "checked");
        a.setAttribute("name", "t");
        e.appendChild(a);
        aa.checkClone = e.cloneNode(!0).cloneNode(!0).lastChild.checked;
        e.innerHTML = "<textarea>x</textarea>";
        aa.noCloneChecked = !!e.cloneNode(!0).lastChild.defaultValue
    })();
    aa.focusinBubbles = "onfocusin" in g;
    var kd = /^key/,
        ld = /^(?:mouse|pointer|contextmenu)|click/,
        Yb = /^(?:focusinfocus|focusoutblur)$/,
        tb = /^([^.]*)(?:\.(.+)|)$/;
    k.event = {
        global: {},
        add: function(e, a, c, b, d) {
            var h, g, l, m, p, n, t, x, r;
            if (p = C.get(e))
                for (c.handler && (h = c, c = h.handler, d = h.selector), c.guid || (c.guid = k.guid++), (m = p.events) || (m = p.events = {}), (g = p.handle) || (g = p.handle = function(a) {
                        return "undefined" !== typeof k &&
                            k.event.triggered !== a.type ? k.event.dispatch.apply(e, arguments) : void 0
                    }), a = (a || "").match(Qa) || [""], p = a.length; p--;) l = tb.exec(a[p]) || [], x = n = l[1], r = (l[2] || "").split(".").sort(), x && (l = k.event.special[x] || {}, x = (d ? l.delegateType : l.bindType) || x, l = k.event.special[x] || {}, n = k.extend({
                    type: x,
                    origType: n,
                    data: b,
                    handler: c,
                    guid: c.guid,
                    selector: d,
                    needsContext: d && k.expr.match.needsContext.test(d),
                    namespace: r.join(".")
                }, h), (t = m[x]) || (t = m[x] = [], t.delegateCount = 0, l.setup && !1 !== l.setup.call(e, b, r, g) || e.addEventListener &&
                    e.addEventListener(x, g, !1)), l.add && (l.add.call(e, n), n.handler.guid || (n.handler.guid = c.guid)), d ? t.splice(t.delegateCount++, 0, n) : t.push(n), k.event.global[x] = !0)
        },
        remove: function(e, a, c, b, d) {
            var h, g, l, m, p, n, t, x, r, G, w, u = C.hasData(e) && C.get(e);
            if (u && (m = u.events)) {
                a = (a || "").match(Qa) || [""];
                for (p = a.length; p--;)
                    if (l = tb.exec(a[p]) || [], r = w = l[1], G = (l[2] || "").split(".").sort(), r) {
                        t = k.event.special[r] || {};
                        r = (b ? t.delegateType : t.bindType) || r;
                        x = m[r] || [];
                        l = l[2] && new RegExp("(^|\\.)" + G.join("\\.(?:.*\\.|)") + "(\\.|$)");
                        for (g = h = x.length; h--;) n = x[h], !d && w !== n.origType || c && c.guid !== n.guid || l && !l.test(n.namespace) || b && b !== n.selector && ("**" !== b || !n.selector) || (x.splice(h, 1), n.selector && x.delegateCount--, t.remove && t.remove.call(e, n));
                        g && !x.length && (t.teardown && !1 !== t.teardown.call(e, G, u.handle) || k.removeEvent(e, r, u.handle), delete m[r])
                    } else
                        for (r in m) k.event.remove(e, r + a[p], c, b, !0);
                k.isEmptyObject(m) && (delete u.handle, C.remove(e, "events"))
            }
        },
        trigger: function(e, a, c, b) {
            var d, h, l, m, p, n, t = [c || P],
                x = jc.call(e, "type") ? e.type :
                e;
            n = jc.call(e, "namespace") ? e.namespace.split(".") : [];
            h = d = c = c || P;
            if (3 !== c.nodeType && 8 !== c.nodeType && !Yb.test(x + k.event.triggered) && (0 <= x.indexOf(".") && (n = x.split("."), x = n.shift(), n.sort()), m = 0 > x.indexOf(":") && "on" + x, e = e[k.expando] ? e : new k.Event(x, "object" === typeof e && e), e.isTrigger = b ? 2 : 3, e.namespace = n.join("."), e.namespace_re = e.namespace ? new RegExp("(^|\\.)" + n.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, e.result = void 0, e.target || (e.target = c), a = null == a ? [e] : k.makeArray(a, [e]), n = k.event.special[x] || {}, b || !n.trigger ||
                    !1 !== n.trigger.apply(c, a))) {
                if (!b && !n.noBubble && !k.isWindow(c)) {
                    l = n.delegateType || x;
                    Yb.test(l + x) || (h = h.parentNode);
                    for (; h; h = h.parentNode) t.push(h), d = h;
                    d === (c.ownerDocument || P) && t.push(d.defaultView || d.parentWindow || g)
                }
                for (d = 0;
                    (h = t[d++]) && !e.isPropagationStopped();) e.type = 1 < d ? l : n.bindType || x, (p = (C.get(h, "events") || {})[e.type] && C.get(h, "handle")) && p.apply(h, a), (p = m && h[m]) && p.apply && k.acceptData(h) && (e.result = p.apply(h, a), !1 === e.result && e.preventDefault());
                e.type = x;
                b || e.isDefaultPrevented() || n._default &&
                    !1 !== n._default.apply(t.pop(), a) || !k.acceptData(c) || !m || !k.isFunction(c[x]) || k.isWindow(c) || ((d = c[m]) && (c[m] = null), k.event.triggered = x, c[x](), k.event.triggered = void 0, d && (c[m] = d));
                return e.result
            }
        },
        dispatch: function(e) {
            e = k.event.fix(e);
            var a, c, b, d, h = [],
                g = xa.call(arguments);
            a = (C.get(this, "events") || {})[e.type] || [];
            var l = k.event.special[e.type] || {};
            g[0] = e;
            e.delegateTarget = this;
            if (!l.preDispatch || !1 !== l.preDispatch.call(this, e)) {
                h = k.event.handlers.call(this, e, a);
                for (a = 0;
                    (d = h[a++]) && !e.isPropagationStopped();)
                    for (e.currentTarget =
                        d.elem, c = 0;
                        (b = d.handlers[c++]) && !e.isImmediatePropagationStopped();)
                        if (!e.namespace_re || e.namespace_re.test(b.namespace)) e.handleObj = b, e.data = b.data, b = ((k.event.special[b.origType] || {}).handle || b.handler).apply(d.elem, g), void 0 !== b && !1 === (e.result = b) && (e.preventDefault(), e.stopPropagation());
                l.postDispatch && l.postDispatch.call(this, e);
                return e.result
            }
        },
        handlers: function(e, a) {
            var c, b, d, h, g = [],
                l = a.delegateCount,
                m = e.target;
            if (l && m.nodeType && (!e.button || "click" !== e.type))
                for (; m !== this; m = m.parentNode ||
                    this)
                    if (!0 !== m.disabled || "click" !== e.type) {
                        b = [];
                        for (c = 0; c < l; c++) h = a[c], d = h.selector + " ", void 0 === b[d] && (b[d] = h.needsContext ? 0 <= k(d, this).index(m) : k.find(d, this, null, [m]).length), b[d] && b.push(h);
                        b.length && g.push({
                            elem: m,
                            handlers: b
                        })
                    }
            l < a.length && g.push({
                elem: this,
                handlers: a.slice(l)
            });
            return g
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: ["char", "charCode", "key", "keyCode"],
            filter: function(e,
                a) {
                null == e.which && (e.which = null != a.charCode ? a.charCode : a.keyCode);
                return e
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(e, a) {
                var c, b, d = a.button;
                null == e.pageX && null != a.clientX && (c = e.target.ownerDocument || P, b = c.documentElement, c = c.body, e.pageX = a.clientX + (b && b.scrollLeft || c && c.scrollLeft || 0) - (b && b.clientLeft || c && c.clientLeft || 0), e.pageY = a.clientY + (b && b.scrollTop || c && c.scrollTop || 0) - (b && b.clientTop || c && c.clientTop ||
                    0));
                e.which || void 0 === d || (e.which = d & 1 ? 1 : d & 2 ? 3 : d & 4 ? 2 : 0);
                return e
            }
        },
        fix: function(e) {
            if (e[k.expando]) return e;
            var a, c, b;
            a = e.type;
            var d = e,
                h = this.fixHooks[a];
            h || (this.fixHooks[a] = h = ld.test(a) ? this.mouseHooks : kd.test(a) ? this.keyHooks : {});
            b = h.props ? this.props.concat(h.props) : this.props;
            e = new k.Event(d);
            for (a = b.length; a--;) c = b[a], e[c] = d[c];
            e.target || (e.target = P);
            3 === e.target.nodeType && (e.target = e.target.parentNode);
            return h.filter ? h.filter(e, d) : e
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function() {
                    if (this !==
                        D() && this.focus) return this.focus(), !1
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    if (this === D() && this.blur) return this.blur(), !1
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function() {
                    if ("checkbox" === this.type && this.click && k.nodeName(this, "input")) return this.click(), !1
                },
                _default: function(e) {
                    return k.nodeName(e.target, "a")
                }
            },
            beforeunload: {
                postDispatch: function(e) {
                    void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result)
                }
            }
        },
        simulate: function(e, a, c, b) {
            e = k.extend(new k.Event, c, {
                type: e,
                isSimulated: !0,
                originalEvent: {}
            });
            b ? k.event.trigger(e, null, a) : k.event.dispatch.call(a, e);
            e.isDefaultPrevented() && c.preventDefault()
        }
    };
    k.removeEvent = function(e, a, c) {
        e.removeEventListener && e.removeEventListener(a, c, !1)
    };
    k.Event = function(e, a) {
        if (!(this instanceof k.Event)) return new k.Event(e, a);
        e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && !1 === e.returnValue ? r : t) : this.type = e;
        a && k.extend(this, a);
        this.timeStamp = e && e.timeStamp ||
            k.now();
        this[k.expando] = !0
    };
    k.Event.prototype = {
        isDefaultPrevented: t,
        isPropagationStopped: t,
        isImmediatePropagationStopped: t,
        preventDefault: function() {
            var e = this.originalEvent;
            this.isDefaultPrevented = r;
            e && e.preventDefault && e.preventDefault()
        },
        stopPropagation: function() {
            var e = this.originalEvent;
            this.isPropagationStopped = r;
            e && e.stopPropagation && e.stopPropagation()
        },
        stopImmediatePropagation: function() {
            var e = this.originalEvent;
            this.isImmediatePropagationStopped = r;
            e && e.stopImmediatePropagation && e.stopImmediatePropagation();
            this.stopPropagation()
        }
    };
    k.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function(e, a) {
        k.event.special[e] = {
            delegateType: a,
            bindType: a,
            handle: function(e) {
                var c, b = e.relatedTarget,
                    d = e.handleObj;
                if (!b || b !== this && !k.contains(this, b)) e.type = d.origType, c = d.handler.apply(this, arguments), e.type = a;
                return c
            }
        }
    });
    aa.focusinBubbles || k.each({
        focus: "focusin",
        blur: "focusout"
    }, function(e, a) {
        var c = function(e) {
            k.event.simulate(a, e.target, k.event.fix(e), !0)
        };
        k.event.special[a] = {
            setup: function() {
                var b = this.ownerDocument || this,
                    d = C.access(b, a);
                d || b.addEventListener(e, c, !0);
                C.access(b, a, (d || 0) + 1)
            },
            teardown: function() {
                var b = this.ownerDocument || this,
                    d = C.access(b, a) - 1;
                d ? C.access(b, a, d) : (b.removeEventListener(e, c, !0), C.remove(b, a))
            }
        }
    });
    k.fn.extend({
        on: function(e, a, c, b, d) {
            var h, g;
            if ("object" === typeof e) {
                "string" !== typeof a && (c = c || a, a = void 0);
                for (g in e) this.on(g, a, c, e[g], d);
                return this
            }
            null == c && null == b ? (b = a, c = a = void 0) : null == b && ("string" === typeof a ? (b = c, c = void 0) : (b = c, c = a, a = void 0));
            if (!1 === b) b = t;
            else if (!b) return this;
            1 === d && (h = b, b = function(e) {
                k().off(e);
                return h.apply(this, arguments)
            }, b.guid = h.guid || (h.guid = k.guid++));
            return this.each(function() {
                k.event.add(this, e, b, c, a)
            })
        },
        one: function(e, a, c, b) {
            return this.on(e, a, c, b, 1)
        },
        off: function(e, a, c) {
            var b;
            if (e && e.preventDefault && e.handleObj) return b = e.handleObj, k(e.delegateTarget).off(b.namespace ? b.origType + "." + b.namespace : b.origType, b.selector, b.handler), this;
            if ("object" === typeof e) {
                for (b in e) this.off(b, a, e[b]);
                return this
            }
            if (!1 ===
                a || "function" === typeof a) c = a, a = void 0;
            !1 === c && (c = t);
            return this.each(function() {
                k.event.remove(this, e, c, a)
            })
        },
        trigger: function(e, a) {
            return this.each(function() {
                k.event.trigger(e, a, this)
            })
        },
        triggerHandler: function(e, a) {
            var c = this[0];
            if (c) return k.event.trigger(e, a, c, !0)
        }
    });
    var ib = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        ub = /<([\w:]+)/,
        Bc = /<|&#?\w+;/,
        Cc = /<(?:script|style|link)/i,
        Zb = /checked\s*(?:[^=]|=\s*.checked.)/i,
        Tc = /^$|\/(?:java|ecma)script/i,
        Bb = /^true\/(.*)/,
        Uc =
        /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
        za = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            thead: [1, "<table>", "</table>"],
            col: [2, "<table><colgroup>", "</colgroup></table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: [0, "", ""]
        };
    za.optgroup = za.option;
    za.tbody = za.tfoot = za.colgroup = za.caption = za.thead;
    za.th = za.td;
    k.extend({
        clone: function(e, a, c) {
            var b, d, h, g, l = e.cloneNode(!0),
                m = k.contains(e.ownerDocument, e);
            if (!(aa.noCloneChecked || 1 !==
                    e.nodeType && 11 !== e.nodeType || k.isXMLDoc(e)))
                for (g = E(l), h = E(e), b = 0, d = h.length; b < d; b++) {
                    var p = h[b],
                        n = g[b],
                        t = n.nodeName.toLowerCase();
                    if ("input" === t && Sc.test(p.type)) n.checked = p.checked;
                    else if ("input" === t || "textarea" === t) n.defaultValue = p.defaultValue
                }
            if (a)
                if (c)
                    for (h = h || E(e), g = g || E(l), b = 0, d = h.length; b < d; b++) A(h[b], g[b]);
                else A(e, l);
            g = E(l, "script");
            0 < g.length && B(g, !m && E(e, "script"));
            return l
        },
        buildFragment: function(e, a, c, b) {
            for (var d, h, g, l = a.createDocumentFragment(), m = [], p = 0, n = e.length; p < n; p++)
                if ((d =
                        e[p]) || 0 === d)
                    if ("object" === k.type(d)) k.merge(m, d.nodeType ? [d] : d);
                    else if (Bc.test(d)) {
                h = h || l.appendChild(a.createElement("div"));
                g = (ub.exec(d) || ["", ""])[1].toLowerCase();
                g = za[g] || za._default;
                h.innerHTML = g[1] + d.replace(ib, "<$1></$2>") + g[2];
                for (g = g[0]; g--;) h = h.lastChild;
                k.merge(m, h.childNodes);
                h = l.firstChild;
                h.textContent = ""
            } else m.push(a.createTextNode(d));
            l.textContent = "";
            for (p = 0; d = m[p++];)
                if (!b || -1 === k.inArray(d, b))
                    if (e = k.contains(d.ownerDocument, d), h = E(l.appendChild(d), "script"), e && B(h), c)
                        for (g =
                            0; d = h[g++];) Tc.test(d.type || "") && c.push(d);
            return l
        },
        cleanData: function(e) {
            for (var a, c, b, d, h = k.event.special, g = 0; void 0 !== (c = e[g]); g++) {
                if (k.acceptData(c) && (d = c[C.expando]) && (a = C.cache[d])) {
                    if (a.events)
                        for (b in a.events) h[b] ? k.event.remove(c, b) : k.removeEvent(c, b, a.handle);
                    C.cache[d] && delete C.cache[d]
                }
                delete na.cache[c[na.expando]]
            }
        }
    });
    k.fn.extend({
        text: function(e) {
            return ya(this, function(e) {
                return void 0 === e ? k.text(this) : this.empty().each(function() {
                    if (1 === this.nodeType || 11 === this.nodeType || 9 ===
                        this.nodeType) this.textContent = e
                })
            }, null, e, arguments.length)
        },
        append: function() {
            return this.domManip(arguments, function(e) {
                1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || x(this, e).appendChild(e)
            })
        },
        prepend: function() {
            return this.domManip(arguments, function(e) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var a = x(this, e);
                    a.insertBefore(e, a.firstChild)
                }
            })
        },
        before: function() {
            return this.domManip(arguments, function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this)
            })
        },
        after: function() {
            return this.domManip(arguments, function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
            })
        },
        remove: function(e, a) {
            for (var c, b = e ? k.filter(e, this) : this, d = 0; null != (c = b[d]); d++) a || 1 !== c.nodeType || k.cleanData(E(c)), c.parentNode && (a && k.contains(c.ownerDocument, c) && B(E(c, "script")), c.parentNode.removeChild(c));
            return this
        },
        empty: function() {
            for (var e, a = 0; null != (e = this[a]); a++) 1 === e.nodeType && (k.cleanData(E(e, !1)), e.textContent = "");
            return this
        },
        clone: function(e, a) {
            e = null ==
                e ? !1 : e;
            a = null == a ? e : a;
            return this.map(function() {
                return k.clone(this, e, a)
            })
        },
        html: function(e) {
            return ya(this, function(e) {
                var a = this[0] || {},
                    c = 0,
                    b = this.length;
                if (void 0 === e && 1 === a.nodeType) return a.innerHTML;
                if ("string" === typeof e && !Cc.test(e) && !za[(ub.exec(e) || ["", ""])[1].toLowerCase()]) {
                    e = e.replace(ib, "<$1></$2>");
                    try {
                        for (; c < b; c++) a = this[c] || {}, 1 === a.nodeType && (k.cleanData(E(a, !1)), a.innerHTML = e);
                        a = 0
                    } catch (d) {}
                }
                a && this.empty().append(e)
            }, null, e, arguments.length)
        },
        replaceWith: function() {
            var e = arguments[0];
            this.domManip(arguments, function(a) {
                e = this.parentNode;
                k.cleanData(E(this));
                e && e.replaceChild(a, this)
            });
            return e && (e.length || e.nodeType) ? this : this.remove()
        },
        detach: function(e) {
            return this.remove(e, !0)
        },
        domManip: function(e, a) {
            e = Ka.apply([], e);
            var c, b, d, h, g = 0,
                l = this.length,
                m = this,
                p = l - 1,
                n = e[0],
                t = k.isFunction(n);
            if (t || 1 < l && "string" === typeof n && !aa.checkClone && Zb.test(n)) return this.each(function(c) {
                var b = m.eq(c);
                t && (e[0] = n.call(this, c, b.html()));
                b.domManip(e, a)
            });
            if (l && (c = k.buildFragment(e, this[0].ownerDocument, !1, this), b = c.firstChild, 1 === c.childNodes.length && (c = b), b)) {
                b = k.map(E(c, "script"), G);
                for (d = b.length; g < l; g++) h = c, g !== p && (h = k.clone(h, !0, !0), d && k.merge(b, E(h, "script"))), a.call(this[g], h, g);
                if (d)
                    for (c = b[b.length - 1].ownerDocument, k.map(b, J), g = 0; g < d; g++) h = b[g], Tc.test(h.type || "") && !C.access(h, "globalEval") && k.contains(c, h) && (h.src ? k._evalUrl && k._evalUrl(h.src) : k.globalEval(h.textContent.replace(Uc, "")))
            }
            return this
        }
    });
    k.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(e, a) {
        k.fn[e] = function(e) {
            for (var c = [], b = k(e), d = b.length - 1, h = 0; h <= d; h++) e = h === d ? this : this.clone(!0), k(b[h])[a](e), u.apply(c, e.get());
            return this.pushStack(c)
        }
    });
    var ic, Z = {},
        ba = /^margin/,
        Hb = new RegExp("^(" + Sa + ")(?!px)[a-z%]+$", "i"),
        Ub = function(e) {
            return e.ownerDocument.defaultView.opener ? e.ownerDocument.defaultView.getComputedStyle(e, null) : g.getComputedStyle(e, null)
        };
    (function() {
        function e() {
            h.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute";
            h.innerHTML = "";
            b.appendChild(d);
            var e = g.getComputedStyle(h, null);
            a = "1%" !== e.top;
            c = "4px" === e.width;
            b.removeChild(d)
        }
        var a, c, b = P.documentElement,
            d = P.createElement("div"),
            h = P.createElement("div");
        h.style && (h.style.backgroundClip = "content-box", h.cloneNode(!0).style.backgroundClip = "", aa.clearCloneStyle = "content-box" === h.style.backgroundClip, d.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;position:absolute", d.appendChild(h), g.getComputedStyle && k.extend(aa, {
            pixelPosition: function() {
                e();
                return a
            },
            boxSizingReliable: function() {
                null == c && e();
                return c
            },
            reliableMarginRight: function() {
                var e, a = h.appendChild(P.createElement("div"));
                a.style.cssText = h.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0";
                a.style.marginRight = a.style.width = "0";
                h.style.width = "1px";
                b.appendChild(d);
                e = !parseFloat(g.getComputedStyle(a, null).marginRight);
                b.removeChild(d);
                h.removeChild(a);
                return e
            }
        }))
    })();
    k.swap = function(e, a, c, b) {
        var d,
            h = {};
        for (d in a) h[d] = e.style[d], e.style[d] = a[d];
        c = c.apply(e, b || []);
        for (d in a) e.style[d] = h[d];
        return c
    };
    var Vc = /^(none|table(?!-c[ea]).+)/,
        Vb = new RegExp("^(" + Sa + ")(.*)$", "i"),
        $b = new RegExp("^([+-])=(" + Sa + ")", "i"),
        fa = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        Eb = {
            letterSpacing: "0",
            fontWeight: "400"
        },
        ob = ["Webkit", "O", "Moz", "ms"];
    k.extend({
        cssHooks: {
            opacity: {
                get: function(e, a) {
                    if (a) {
                        var c = V(e, "opacity");
                        return "" === c ? "1" : c
                    }
                }
            }
        },
        cssNumber: {
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": "cssFloat"
        },
        style: function(e, a, c, b) {
            if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                var d, h, g, l = k.camelCase(a),
                    m = e.style;
                a = k.cssProps[l] || (k.cssProps[l] = ea(m, l));
                g = k.cssHooks[a] || k.cssHooks[l];
                if (void 0 !== c) h = typeof c, "string" === h && (d = $b.exec(c)) && (c = (d[1] + 1) * d[2] + parseFloat(k.css(e, a)), h = "number"), null != c && c === c && ("number" !== h || k.cssNumber[l] || (c += "px"), aa.clearCloneStyle || "" !== c || 0 !== a.indexOf("background") ||
                    (m[a] = "inherit"), g && "set" in g && void 0 === (c = g.set(e, c, b)) || (m[a] = c));
                else return g && "get" in g && void 0 !== (d = g.get(e, !1, b)) ? d : m[a]
            }
        },
        css: function(e, a, c, b) {
            var d, h;
            h = k.camelCase(a);
            a = k.cssProps[h] || (k.cssProps[h] = ea(e.style, h));
            (h = k.cssHooks[a] || k.cssHooks[h]) && "get" in h && (d = h.get(e, !0, c));
            void 0 === d && (d = V(e, a, b));
            "normal" === d && a in Eb && (d = Eb[a]);
            return "" === c || c ? (e = parseFloat(d), !0 === c || k.isNumeric(e) ? e || 0 : d) : d
        }
    });
    k.each(["height", "width"], function(e, a) {
        k.cssHooks[a] = {
            get: function(e, c, b) {
                if (c) return Vc.test(k.css(e,
                    "display")) && 0 === e.offsetWidth ? k.swap(e, fa, function() {
                    return L(e, a, b)
                }) : L(e, a, b)
            },
            set: function(e, c, b) {
                var d = b && Ub(e);
                return la(e, c, b ? ta(e, a, b, "border-box" === k.css(e, "boxSizing", !1, d), d) : 0)
            }
        }
    });
    k.cssHooks.marginRight = O(aa.reliableMarginRight, function(e, a) {
        if (a) return k.swap(e, {
            display: "inline-block"
        }, V, [e, "marginRight"])
    });
    k.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(e, a) {
        k.cssHooks[e + a] = {
            expand: function(c) {
                var b = 0,
                    d = {};
                for (c = "string" === typeof c ? c.split(" ") : [c]; 4 > b; b++) d[e + db[b] + a] = c[b] ||
                    c[b - 2] || c[0];
                return d
            }
        };
        ba.test(e) || (k.cssHooks[e + a].set = la)
    });
    k.fn.extend({
        css: function(e, a) {
            return ya(this, function(e, a, c) {
                var b, d = {},
                    h = 0;
                if (k.isArray(a)) {
                    c = Ub(e);
                    for (b = a.length; h < b; h++) d[a[h]] = k.css(e, a[h], !1, c);
                    return d
                }
                return void 0 !== c ? k.style(e, a, c) : k.css(e, a)
            }, e, a, 1 < arguments.length)
        },
        show: function() {
            return ma(this, !0)
        },
        hide: function() {
            return ma(this)
        },
        toggle: function(e) {
            return "boolean" === typeof e ? e ? this.show() : this.hide() : this.each(function() {
                pb(this) ? k(this).show() : k(this).hide()
            })
        }
    });
    k.Tween =
        T;
    T.prototype = {
        constructor: T,
        init: function(e, a, c, b, d, h) {
            this.elem = e;
            this.prop = c;
            this.easing = d || "swing";
            this.options = a;
            this.start = this.now = this.cur();
            this.end = b;
            this.unit = h || (k.cssNumber[c] ? "" : "px")
        },
        cur: function() {
            var e = T.propHooks[this.prop];
            return e && e.get ? e.get(this) : T.propHooks._default.get(this)
        },
        run: function(e) {
            var a, c = T.propHooks[this.prop];
            this.pos = this.options.duration ? a = k.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : a = e;
            this.now = (this.end - this.start) * a + this.start;
            this.options.step && this.options.step.call(this.elem, this.now, this);
            c && c.set ? c.set(this) : T.propHooks._default.set(this);
            return this
        }
    };
    T.prototype.init.prototype = T.prototype;
    T.propHooks = {
        _default: {
            get: function(e) {
                return null == e.elem[e.prop] || e.elem.style && null != e.elem.style[e.prop] ? (e = k.css(e.elem, e.prop, "")) && "auto" !== e ? e : 0 : e.elem[e.prop]
            },
            set: function(e) {
                if (k.fx.step[e.prop]) k.fx.step[e.prop](e);
                else e.elem.style && (null != e.elem.style[k.cssProps[e.prop]] || k.cssHooks[e.prop]) ? k.style(e.elem, e.prop,
                    e.now + e.unit) : e.elem[e.prop] = e.now
            }
        }
    };
    T.propHooks.scrollTop = T.propHooks.scrollLeft = {
        set: function(e) {
            e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
        }
    };
    k.easing = {
        linear: function(e) {
            return e
        },
        swing: function(e) {
            return .5 - Math.cos(e * Math.PI) / 2
        }
    };
    k.fx = T.prototype.init;
    k.fx.step = {};
    var Cb, U, da = /^(?:toggle|show|hide)$/,
        Fb = new RegExp("^(?:([+-])=|)(" + Sa + ")([a-z%]*)$", "i"),
        Dc = /queueHooks$/,
        Jb = [function(e, a, c) {
            var b, d, h, g, l, m, p = this,
                n = {},
                t = e.style,
                x = e.nodeType && pb(e),
                r = C.get(e, "fxshow");
            c.queue || (g =
                k._queueHooks(e, "fx"), null == g.unqueued && (g.unqueued = 0, l = g.empty.fire, g.empty.fire = function() {
                    g.unqueued || l()
                }), g.unqueued++, p.always(function() {
                    p.always(function() {
                        g.unqueued--;
                        k.queue(e, "fx").length || g.empty.fire()
                    })
                }));
            1 === e.nodeType && ("height" in a || "width" in a) && (c.overflow = [t.overflow, t.overflowX, t.overflowY], m = k.css(e, "display"), d = "none" === m ? C.get(e, "olddisplay") || K(e.nodeName) : m, "inline" === d && "none" === k.css(e, "float") && (t.display = "inline-block"));
            c.overflow && (t.overflow = "hidden", p.always(function() {
                t.overflow =
                    c.overflow[0];
                t.overflowX = c.overflow[1];
                t.overflowY = c.overflow[2]
            }));
            for (b in a)
                if (d = a[b], da.exec(d)) {
                    delete a[b];
                    h = h || "toggle" === d;
                    if (d === (x ? "hide" : "show"))
                        if ("show" === d && r && void 0 !== r[b]) x = !0;
                        else continue;
                    n[b] = r && r[b] || k.style(e, b)
                } else m = void 0;
            if (k.isEmptyObject(n)) "inline" === ("none" === m ? K(e.nodeName) : m) && (t.display = m);
            else
                for (b in r ? "hidden" in r && (x = r.hidden) : r = C.access(e, "fxshow", {}), h && (r.hidden = !x), x ? k(e).show() : p.done(function() {
                        k(e).hide()
                    }), p.done(function() {
                        var a;
                        C.remove(e, "fxshow");
                        for (a in n) k.style(e, a, n[a])
                    }), n) a = Xa(x ? r[b] : 0, b, p), b in r || (r[b] = a.start, x && (a.end = a.start, a.start = "width" === b || "height" === b ? 1 : 0))
        }],
        eb = {
            "*": [function(e, a) {
                var c = this.createTween(e, a),
                    b = c.cur(),
                    d = Fb.exec(a),
                    h = d && d[3] || (k.cssNumber[e] ? "" : "px"),
                    g = (k.cssNumber[e] || "px" !== h && +b) && Fb.exec(k.css(c.elem, e)),
                    l = 1,
                    m = 20;
                if (g && g[3] !== h) {
                    h = h || g[3];
                    d = d || [];
                    g = +b || 1;
                    do l = l || ".5", g /= l, k.style(c.elem, e, g + h); while (l !== (l = c.cur() / b) && 1 !== l && --m)
                }
                d && (g = c.start = +g || +b || 0, c.unit = h, c.end = d[1] ? g + (d[1] + 1) * d[2] : +d[2]);
                return c
            }]
        };
    k.Animation = k.extend(Ib, {
        tweener: function(e, a) {
            k.isFunction(e) ? (a = e, e = ["*"]) : e = e.split(" ");
            for (var c, b = 0, d = e.length; b < d; b++) c = e[b], eb[c] = eb[c] || [], eb[c].unshift(a)
        },
        prefilter: function(e, a) {
            a ? Jb.unshift(e) : Jb.push(e)
        }
    });
    k.speed = function(e, a, c) {
        var b = e && "object" === typeof e ? k.extend({}, e) : {
            complete: c || !c && a || k.isFunction(e) && e,
            duration: e,
            easing: c && a || a && !k.isFunction(a) && a
        };
        b.duration = k.fx.off ? 0 : "number" === typeof b.duration ? b.duration : b.duration in k.fx.speeds ? k.fx.speeds[b.duration] : k.fx.speeds._default;
        if (null == b.queue || !0 === b.queue) b.queue = "fx";
        b.old = b.complete;
        b.complete = function() {
            k.isFunction(b.old) && b.old.call(this);
            b.queue && k.dequeue(this, b.queue)
        };
        return b
    };
    k.fn.extend({
        fadeTo: function(e, a, c, b) {
            return this.filter(pb).css("opacity", 0).show().end().animate({
                opacity: a
            }, e, c, b)
        },
        animate: function(e, a, c, b) {
            var d = k.isEmptyObject(e),
                h = k.speed(a, c, b);
            a = function() {
                var a = Ib(this, k.extend({}, e), h);
                (d || C.get(this, "finish")) && a.stop(!0)
            };
            a.finish = a;
            return d || !1 === h.queue ? this.each(a) : this.queue(h.queue,
                a)
        },
        stop: function(e, a, c) {
            var b = function(e) {
                var a = e.stop;
                delete e.stop;
                a(c)
            };
            "string" !== typeof e && (c = a, a = e, e = void 0);
            a && !1 !== e && this.queue(e || "fx", []);
            return this.each(function() {
                var a = !0,
                    d = null != e && e + "queueHooks",
                    h = k.timers,
                    g = C.get(this);
                if (d) g[d] && g[d].stop && b(g[d]);
                else
                    for (d in g) g[d] && g[d].stop && Dc.test(d) && b(g[d]);
                for (d = h.length; d--;) h[d].elem !== this || null != e && h[d].queue !== e || (h[d].anim.stop(c), a = !1, h.splice(d, 1));
                !a && c || k.dequeue(this, e)
            })
        },
        finish: function(e) {
            !1 !== e && (e = e || "fx");
            return this.each(function() {
                var a,
                    c = C.get(this),
                    b = c[e + "queue"];
                a = c[e + "queueHooks"];
                var d = k.timers,
                    h = b ? b.length : 0;
                c.finish = !0;
                k.queue(this, e, []);
                a && a.stop && a.stop.call(this, !0);
                for (a = d.length; a--;) d[a].elem === this && d[a].queue === e && (d[a].anim.stop(!0), d.splice(a, 1));
                for (a = 0; a < h; a++) b[a] && b[a].finish && b[a].finish.call(this);
                delete c.finish
            })
        }
    });
    k.each(["toggle", "show", "hide"], function(e, a) {
        var c = k.fn[a];
        k.fn[a] = function(e, b, d) {
            return null == e || "boolean" === typeof e ? c.apply(this, arguments) : this.animate(Ba(a, !0), e, b, d)
        }
    });
    k.each({
        slideDown: Ba("show"),
        slideUp: Ba("hide"),
        slideToggle: Ba("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(e, a) {
        k.fn[e] = function(e, c, b) {
            return this.animate(a, e, c, b)
        }
    });
    k.timers = [];
    k.fx.tick = function() {
        var e, a = 0,
            c = k.timers;
        for (Cb = k.now(); a < c.length; a++) e = c[a], e() || c[a] !== e || c.splice(a--, 1);
        c.length || k.fx.stop();
        Cb = void 0
    };
    k.fx.timer = function(e) {
        k.timers.push(e);
        e() ? k.fx.start() : k.timers.pop()
    };
    k.fx.interval = 13;
    k.fx.start = function() {
        U || (U = setInterval(k.fx.tick, k.fx.interval))
    };
    k.fx.stop = function() {
        clearInterval(U);
        U = null
    };
    k.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    };
    k.fn.delay = function(e, a) {
        e = k.fx ? k.fx.speeds[e] || e : e;
        return this.queue(a || "fx", function(a, c) {
            var b = setTimeout(a, e);
            c.stop = function() {
                clearTimeout(b)
            }
        })
    };
    (function() {
        var e = P.createElement("input"),
            a = P.createElement("select"),
            c = a.appendChild(P.createElement("option"));
        e.type = "checkbox";
        aa.checkOn = "" !== e.value;
        aa.optSelected = c.selected;
        a.disabled = !0;
        aa.optDisabled = !c.disabled;
        e = P.createElement("input");
        e.value =
            "t";
        e.type = "radio";
        aa.radioValue = "t" === e.value
    })();
    var jb, Fa = k.expr.attrHandle;
    k.fn.extend({
        attr: function(e, a) {
            return ya(this, k.attr, e, a, 1 < arguments.length)
        },
        removeAttr: function(e) {
            return this.each(function() {
                k.removeAttr(this, e)
            })
        }
    });
    k.extend({
        attr: function(e, a, c) {
            var b, d, h = e.nodeType;
            if (e && 3 !== h && 8 !== h && 2 !== h) {
                if ("undefined" === typeof e.getAttribute) return k.prop(e, a, c);
                1 === h && k.isXMLDoc(e) || (a = a.toLowerCase(), b = k.attrHooks[a] || (k.expr.match.bool.test(a) ? jb : void 0));
                if (void 0 !== c)
                    if (null === c) k.removeAttr(e,
                        a);
                    else {
                        if (b && "set" in b && void 0 !== (d = b.set(e, c, a))) return d;
                        e.setAttribute(a, c + "");
                        return c
                    }
                else {
                    if (b && "get" in b && null !== (d = b.get(e, a))) return d;
                    d = k.find.attr(e, a);
                    return null == d ? void 0 : d
                }
            }
        },
        removeAttr: function(e, a) {
            var c, b, d = 0,
                h = a && a.match(Qa);
            if (h && 1 === e.nodeType)
                for (; c = h[d++];) b = k.propFix[c] || c, k.expr.match.bool.test(c) && (e[b] = !1), e.removeAttribute(c)
        },
        attrHooks: {
            type: {
                set: function(e, a) {
                    if (!aa.radioValue && "radio" === a && k.nodeName(e, "input")) {
                        var c = e.value;
                        e.setAttribute("type", a);
                        c && (e.value = c);
                        return a
                    }
                }
            }
        }
    });
    jb = {
        set: function(e, a, c) {
            !1 === a ? k.removeAttr(e, c) : e.setAttribute(c, c);
            return c
        }
    };
    k.each(k.expr.match.bool.source.match(/\w+/g), function(e, a) {
        var c = Fa[a] || k.find.attr;
        Fa[a] = function(e, a, b) {
            var d, h;
            b || (h = Fa[a], Fa[a] = d, d = null != c(e, a, b) ? a.toLowerCase() : null, Fa[a] = h);
            return d
        }
    });
    var Ec = /^(?:input|select|textarea|button)$/i;
    k.fn.extend({
        prop: function(e, a) {
            return ya(this, k.prop, e, a, 1 < arguments.length)
        },
        removeProp: function(e) {
            return this.each(function() {
                delete this[k.propFix[e] || e]
            })
        }
    });
    k.extend({
        propFix: {
            "for": "htmlFor",
            "class": "className"
        },
        prop: function(e, a, c) {
            var b, d, h;
            h = e.nodeType;
            if (e && 3 !== h && 8 !== h && 2 !== h) {
                if (h = 1 !== h || !k.isXMLDoc(e)) a = k.propFix[a] || a, d = k.propHooks[a];
                return void 0 !== c ? d && "set" in d && void 0 !== (b = d.set(e, c, a)) ? b : e[a] = c : d && "get" in d && null !== (b = d.get(e, a)) ? b : e[a]
            }
        },
        propHooks: {
            tabIndex: {
                get: function(a) {
                    return a.hasAttribute("tabindex") || Ec.test(a.nodeName) || a.href ? a.tabIndex : -1
                }
            }
        }
    });
    aa.optSelected || (k.propHooks.selected = {
        get: function(a) {
            (a = a.parentNode) && a.parentNode && a.parentNode.selectedIndex;
            return null
        }
    });
    k.each("tabIndex readOnly maxLength cellSpacing cellPadding rowSpan colSpan useMap frameBorder contentEditable".split(" "), function() {
        k.propFix[this.toLowerCase()] = this
    });
    var ac = /[\t\r\n\f]/g;
    k.fn.extend({
        addClass: function(a) {
            var c, b, d, h, g;
            c = "string" === typeof a && a;
            var l = 0,
                m = this.length;
            if (k.isFunction(a)) return this.each(function(c) {
                k(this).addClass(a.call(this, c, this.className))
            });
            if (c)
                for (c = (a || "").match(Qa) || []; l < m; l++)
                    if (b = this[l], d = 1 === b.nodeType && (b.className ? (" " + b.className + " ").replace(ac,
                            " ") : " ")) {
                        for (g = 0; h = c[g++];) 0 > d.indexOf(" " + h + " ") && (d += h + " ");
                        d = k.trim(d);
                        b.className !== d && (b.className = d)
                    }
            return this
        },
        removeClass: function(a) {
            var c, b, d, h, g;
            c = 0 === arguments.length || "string" === typeof a && a;
            var l = 0,
                m = this.length;
            if (k.isFunction(a)) return this.each(function(c) {
                k(this).removeClass(a.call(this, c, this.className))
            });
            if (c)
                for (c = (a || "").match(Qa) || []; l < m; l++)
                    if (b = this[l], d = 1 === b.nodeType && (b.className ? (" " + b.className + " ").replace(ac, " ") : "")) {
                        for (g = 0; h = c[g++];)
                            for (; 0 <= d.indexOf(" " + h + " ");) d =
                                d.replace(" " + h + " ", " ");
                        d = a ? k.trim(d) : "";
                        b.className !== d && (b.className = d)
                    }
            return this
        },
        toggleClass: function(a, c) {
            var b = typeof a;
            return "boolean" === typeof c && "string" === b ? c ? this.addClass(a) : this.removeClass(a) : k.isFunction(a) ? this.each(function(b) {
                k(this).toggleClass(a.call(this, b, this.className, c), c)
            }) : this.each(function() {
                if ("string" === b)
                    for (var c, d = 0, h = k(this), g = a.match(Qa) || []; c = g[d++];) h.hasClass(c) ? h.removeClass(c) : h.addClass(c);
                else if ("undefined" === b || "boolean" === b) this.className && C.set(this,
                    "__className__", this.className), this.className = this.className || !1 === a ? "" : C.get(this, "__className__") || ""
            })
        },
        hasClass: function(a) {
            a = " " + a + " ";
            for (var c = 0, b = this.length; c < b; c++)
                if (1 === this[c].nodeType && 0 <= (" " + this[c].className + " ").replace(ac, " ").indexOf(a)) return !0;
            return !1
        }
    });
    var md = /\r/g;
    k.fn.extend({
        val: function(a) {
            var c, b, d, h = this[0];
            if (arguments.length) return d = k.isFunction(a), this.each(function(b) {
                1 === this.nodeType && (b = d ? a.call(this, b, k(this).val()) : a, null == b ? b = "" : "number" === typeof b ? b += "" :
                    k.isArray(b) && (b = k.map(b, function(a) {
                        return null == a ? "" : a + ""
                    })), c = k.valHooks[this.type] || k.valHooks[this.nodeName.toLowerCase()], c && "set" in c && void 0 !== c.set(this, b, "value") || (this.value = b))
            });
            if (h) {
                if ((c = k.valHooks[h.type] || k.valHooks[h.nodeName.toLowerCase()]) && "get" in c && void 0 !== (b = c.get(h, "value"))) return b;
                b = h.value;
                return "string" === typeof b ? b.replace(md, "") : null == b ? "" : b
            }
        }
    });
    k.extend({
        valHooks: {
            option: {
                get: function(a) {
                    var c = k.find.attr(a, "value");
                    return null != c ? c : k.trim(k.text(a))
                }
            },
            select: {
                get: function(a) {
                    for (var c,
                            b = a.options, d = a.selectedIndex, h = (a = "select-one" === a.type || 0 > d) ? null : [], g = a ? d + 1 : b.length, l = 0 > d ? g : a ? d : 0; l < g; l++)
                        if (c = b[l], !(!c.selected && l !== d || (aa.optDisabled ? c.disabled : null !== c.getAttribute("disabled")) || c.parentNode.disabled && k.nodeName(c.parentNode, "optgroup"))) {
                            c = k(c).val();
                            if (a) return c;
                            h.push(c)
                        }
                    return h
                },
                set: function(a, c) {
                    for (var b, d, h = a.options, g = k.makeArray(c), l = h.length; l--;)
                        if (d = h[l], d.selected = 0 <= k.inArray(d.value, g)) b = !0;
                    b || (a.selectedIndex = -1);
                    return g
                }
            }
        }
    });
    k.each(["radio", "checkbox"],
        function() {
            k.valHooks[this] = {
                set: function(a, c) {
                    if (k.isArray(c)) return a.checked = 0 <= k.inArray(k(a).val(), c)
                }
            };
            aa.checkOn || (k.valHooks[this].get = function(a) {
                return null === a.getAttribute("value") ? "on" : a.value
            })
        });
    k.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(a, c) {
        k.fn[c] = function(a, e) {
            return 0 < arguments.length ? this.on(c,
                null, a, e) : this.trigger(c)
        }
    });
    k.fn.extend({
        hover: function(a, c) {
            return this.mouseenter(a).mouseleave(c || a)
        },
        bind: function(a, c, b) {
            return this.on(a, null, c, b)
        },
        unbind: function(a, c) {
            return this.off(a, null, c)
        },
        delegate: function(a, c, b, d) {
            return this.on(c, a, b, d)
        },
        undelegate: function(a, c, b) {
            return 1 === arguments.length ? this.off(a, "**") : this.off(c, a || "**", b)
        }
    });
    var Fc = k.now(),
        Ua = /\?/;
    k.parseJSON = function(a) {
        return JSON.parse(a + "")
    };
    k.parseXML = function(a) {
        var c, b;
        if (!a || "string" !== typeof a) return null;
        try {
            b = new DOMParser,
                c = b.parseFromString(a, "text/xml")
        } catch (d) {
            c = void 0
        }
        c && !c.getElementsByTagName("parsererror").length || k.error("Invalid XML: " + a);
        return c
    };
    var ca = /#.*$/,
        Ga = /([?&])_=[^&]*/,
        Q = /^(.*?):[ \t]*([^\r\n]*)$/mg,
        p = /^(?:GET|HEAD)$/,
        Gb = /^\/\//,
        Ob = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
        M = {},
        Kc = {},
        Hd = "*/".concat("*"),
        Ha = g.location.href,
        va = Ob.exec(Ha.toLowerCase()) || [];
    k.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: Ha,
            type: "GET",
            isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(va[1]),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": Hd,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": k.parseJSON,
                "text xml": k.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(a, c) {
            return c ? rb(rb(a,
                k.ajaxSettings), c) : rb(k.ajaxSettings, a)
        },
        ajaxPrefilter: Wb(M),
        ajaxTransport: Wb(Kc),
        ajax: function(a, c) {
            function b(a, f, e, c) {
                var z, l, H, p;
                p = f;
                if (2 !== E) {
                    E = 2;
                    m && clearTimeout(m);
                    d = void 0;
                    g = c || "";
                    L.readyState = 0 < a ? 4 : 0;
                    c = 200 <= a && 300 > a || 304 === a;
                    if (e) {
                        H = r;
                        for (var n = L, x, B, A, y, F = H.contents, ca = H.dataTypes;
                            "*" === ca[0];) ca.shift(), void 0 === x && (x = H.mimeType || n.getResponseHeader("Content-Type"));
                        if (x)
                            for (B in F)
                                if (F[B] && F[B].test(x)) {
                                    ca.unshift(B);
                                    break
                                }
                        if (ca[0] in e) A = ca[0];
                        else {
                            for (B in e) {
                                if (!ca[0] || H.converters[B +
                                        " " + ca[0]]) {
                                    A = B;
                                    break
                                }
                                y || (y = B)
                            }
                            A = A || y
                        }
                        A ? (A !== ca[0] && ca.unshift(A), H = e[A]) : H = void 0
                    }
                    a: {
                        e = r;x = H;B = L;A = c;
                        var Q, K, T, n = {},
                            F = e.dataTypes.slice();
                        if (F[1])
                            for (K in e.converters) n[K.toLowerCase()] = e.converters[K];
                        for (y = F.shift(); y;)
                            if (e.responseFields[y] && (B[e.responseFields[y]] = x), !T && A && e.dataFilter && (x = e.dataFilter(x, e.dataType)), T = y, y = F.shift())
                                if ("*" === y) y = T;
                                else if ("*" !== T && T !== y) {
                            K = n[T + " " + y] || n["* " + y];
                            if (!K)
                                for (Q in n)
                                    if (H = Q.split(" "), H[1] === y && (K = n[T + " " + H[0]] || n["* " + H[0]])) {
                                        !0 === K ? K = n[Q] : !0 !==
                                            n[Q] && (y = H[0], F.unshift(H[1]));
                                        break
                                    }
                            if (!0 !== K)
                                if (K && e["throws"]) x = K(x);
                                else try {
                                    x = K(x)
                                } catch (C) {
                                    H = {
                                        state: "parsererror",
                                        error: K ? C : "No conversion from " + T + " to " + y
                                    };
                                    break a
                                }
                        }
                        H = {
                            state: "success",
                            data: x
                        }
                    }
                    if (c) r.ifModified && ((p = L.getResponseHeader("Last-Modified")) && (k.lastModified[h] = p), (p = L.getResponseHeader("etag")) && (k.etag[h] = p)), 204 === a || "HEAD" === r.type ? p = "nocontent" : 304 === a ? p = "notmodified" : (p = H.state, z = H.data, l = H.error, c = !l);
                    else if (l = p, a || !p) p = "error", 0 > a && (a = 0);
                    L.status = a;
                    L.statusText = (f || p) +
                        "";
                    c ? u.resolveWith(G, [z, p, L]) : u.rejectWith(G, [L, p, l]);
                    L.statusCode(D);
                    D = void 0;
                    t && w.trigger(c ? "ajaxSuccess" : "ajaxError", [L, r, c ? z : l]);
                    J.fireWith(G, [L, p]);
                    t && (w.trigger("ajaxComplete", [L, r]), --k.active || k.event.trigger("ajaxStop"))
                }
            }
            "object" === typeof a && (c = a, a = void 0);
            c = c || {};
            var d, h, g, l, m, n, t, x, r = k.ajaxSetup({}, c),
                G = r.context || r,
                w = r.context && (G.nodeType || G.jquery) ? k(G) : k.event,
                u = k.Deferred(),
                J = k.Callbacks("once memory"),
                D = r.statusCode || {},
                B = {},
                A = {},
                E = 0,
                F = "canceled",
                L = {
                    readyState: 0,
                    getResponseHeader: function(a) {
                        var f;
                        if (2 === E) {
                            if (!l)
                                for (l = {}; f = Q.exec(g);) l[f[1].toLowerCase()] = f[2];
                            f = l[a.toLowerCase()]
                        }
                        return null == f ? null : f
                    },
                    getAllResponseHeaders: function() {
                        return 2 === E ? g : null
                    },
                    setRequestHeader: function(a, f) {
                        var e = a.toLowerCase();
                        E || (a = A[e] = A[e] || a, B[a] = f);
                        return this
                    },
                    overrideMimeType: function(a) {
                        E || (r.mimeType = a);
                        return this
                    },
                    statusCode: function(a) {
                        var f;
                        if (a)
                            if (2 > E)
                                for (f in a) D[f] = [D[f], a[f]];
                            else L.always(a[L.status]);
                        return this
                    },
                    abort: function(a) {
                        a = a || F;
                        d && d.abort(a);
                        b(0, a);
                        return this
                    }
                };
            u.promise(L).complete =
                J.add;
            L.success = L.done;
            L.error = L.fail;
            r.url = ((a || r.url || Ha) + "").replace(ca, "").replace(Gb, va[1] + "//");
            r.type = c.method || c.type || r.method || r.type;
            r.dataTypes = k.trim(r.dataType || "*").toLowerCase().match(Qa) || [""];
            null == r.crossDomain && (n = Ob.exec(r.url.toLowerCase()), r.crossDomain = !(!n || n[1] === va[1] && n[2] === va[2] && (n[3] || ("http:" === n[1] ? "80" : "443")) === (va[3] || ("http:" === va[1] ? "80" : "443"))));
            r.data && r.processData && "string" !== typeof r.data && (r.data = k.param(r.data, r.traditional));
            ga(M, r, c, L);
            if (2 === E) return L;
            (t = k.event && r.global) && 0 === k.active++ && k.event.trigger("ajaxStart");
            r.type = r.type.toUpperCase();
            r.hasContent = !p.test(r.type);
            h = r.url;
            r.hasContent || (r.data && (h = r.url += (Ua.test(h) ? "&" : "?") + r.data, delete r.data), !1 === r.cache && (r.url = Ga.test(h) ? h.replace(Ga, "$1_=" + Fc++) : h + (Ua.test(h) ? "&" : "?") + "_=" + Fc++));
            r.ifModified && (k.lastModified[h] && L.setRequestHeader("If-Modified-Since", k.lastModified[h]), k.etag[h] && L.setRequestHeader("If-None-Match", k.etag[h]));
            (r.data && r.hasContent && !1 !== r.contentType || c.contentType) &&
            L.setRequestHeader("Content-Type", r.contentType);
            L.setRequestHeader("Accept", r.dataTypes[0] && r.accepts[r.dataTypes[0]] ? r.accepts[r.dataTypes[0]] + ("*" !== r.dataTypes[0] ? ", " + Hd + "; q=0.01" : "") : r.accepts["*"]);
            for (x in r.headers) L.setRequestHeader(x, r.headers[x]);
            if (r.beforeSend && (!1 === r.beforeSend.call(G, L, r) || 2 === E)) return L.abort();
            F = "abort";
            for (x in {
                    success: 1,
                    error: 1,
                    complete: 1
                }) L[x](r[x]);
            if (d = ga(Kc, r, c, L)) {
                L.readyState = 1;
                t && w.trigger("ajaxSend", [L, r]);
                r.async && 0 < r.timeout && (m = setTimeout(function() {
                        L.abort("timeout")
                    },
                    r.timeout));
                try {
                    E = 1, d.send(B, b)
                } catch (K) {
                    if (2 > E) b(-1, K);
                    else throw K;
                }
            } else b(-1, "No Transport");
            return L
        },
        getJSON: function(a, c, b) {
            return k.get(a, c, b, "json")
        },
        getScript: function(a, c) {
            return k.get(a, void 0, c, "script")
        }
    });
    k.each(["get", "post"], function(a, c) {
        k[c] = function(a, e, b, d) {
            k.isFunction(e) && (d = d || b, b = e, e = void 0);
            return k.ajax({
                url: a,
                type: c,
                dataType: d,
                data: e,
                success: b
            })
        }
    });
    k._evalUrl = function(a) {
        return k.ajax({
            url: a,
            type: "GET",
            dataType: "script",
            async: !1,
            global: !1,
            "throws": !0
        })
    };
    k.fn.extend({
        wrapAll: function(a) {
            var c;
            if (k.isFunction(a)) return this.each(function(c) {
                k(this).wrapAll(a.call(this, c))
            });
            this[0] && (c = k(a, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && c.insertBefore(this[0]), c.map(function() {
                for (var a = this; a.firstElementChild;) a = a.firstElementChild;
                return a
            }).append(this));
            return this
        },
        wrapInner: function(a) {
            return k.isFunction(a) ? this.each(function(c) {
                k(this).wrapInner(a.call(this, c))
            }) : this.each(function() {
                var c = k(this),
                    b = c.contents();
                b.length ? b.wrapAll(a) : c.append(a)
            })
        },
        wrap: function(a) {
            var c =
                k.isFunction(a);
            return this.each(function(b) {
                k(this).wrapAll(c ? a.call(this, b) : a)
            })
        },
        unwrap: function() {
            return this.parent().each(function() {
                k.nodeName(this, "body") || k(this).replaceWith(this.childNodes)
            }).end()
        }
    });
    k.expr.filters.hidden = function(a) {
        return 0 >= a.offsetWidth && 0 >= a.offsetHeight
    };
    k.expr.filters.visible = function(a) {
        return !k.expr.filters.hidden(a)
    };
    var pa = /%20/g,
        Db = /\[\]$/,
        nd = /\r?\n/g,
        vb = /^(?:submit|button|image|reset|file)$/i,
        od = /^(?:input|select|textarea|keygen)/i;
    k.param = function(a, c) {
        var b,
            d = [],
            h = function(a, c) {
                c = k.isFunction(c) ? c() : null == c ? "" : c;
                d[d.length] = encodeURIComponent(a) + "=" + encodeURIComponent(c)
            };
        void 0 === c && (c = k.ajaxSettings && k.ajaxSettings.traditional);
        if (k.isArray(a) || a.jquery && !k.isPlainObject(a)) k.each(a, function() {
            h(this.name, this.value)
        });
        else
            for (b in a) ka(b, a[b], c, h);
        return d.join("&").replace(pa, "+")
    };
    k.fn.extend({
        serialize: function() {
            return k.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                var a = k.prop(this, "elements");
                return a ?
                    k.makeArray(a) : this
            }).filter(function() {
                var a = this.type;
                return this.name && !k(this).is(":disabled") && od.test(this.nodeName) && !vb.test(a) && (this.checked || !Sc.test(a))
            }).map(function(a, c) {
                var b = k(this).val();
                return null == b ? null : k.isArray(b) ? k.map(b, function(a) {
                    return {
                        name: c.name,
                        value: a.replace(nd, "\r\n")
                    }
                }) : {
                    name: c.name,
                    value: b.replace(nd, "\r\n")
                }
            }).get()
        }
    });
    k.ajaxSettings.xhr = function() {
        try {
            return new XMLHttpRequest
        } catch (a) {}
    };
    var kb = 0,
        wb = {},
        bc = {
            0: 200,
            1223: 204
        },
        xb = k.ajaxSettings.xhr();
    g.attachEvent &&
        g.attachEvent("onunload", function() {
            for (var a in wb) wb[a]()
        });
    aa.cors = !!xb && "withCredentials" in xb;
    aa.ajax = xb = !!xb;
    k.ajaxTransport(function(a) {
        var c;
        if (aa.cors || xb && !a.crossDomain) return {
            send: function(b, d) {
                var h, g = a.xhr(),
                    k = ++kb;
                g.open(a.type, a.url, a.async, a.username, a.password);
                if (a.xhrFields)
                    for (h in a.xhrFields) g[h] = a.xhrFields[h];
                a.mimeType && g.overrideMimeType && g.overrideMimeType(a.mimeType);
                a.crossDomain || b["X-Requested-With"] || (b["X-Requested-With"] = "XMLHttpRequest");
                for (h in b) g.setRequestHeader(h,
                    b[h]);
                c = function(a) {
                    return function() {
                        c && (delete wb[k], c = g.onload = g.onerror = null, "abort" === a ? g.abort() : "error" === a ? d(g.status, g.statusText) : d(bc[g.status] || g.status, g.statusText, "string" === typeof g.responseText ? {
                            text: g.responseText
                        } : void 0, g.getAllResponseHeaders()))
                    }
                };
                g.onload = c();
                g.onerror = c("error");
                c = wb[k] = c("abort");
                try {
                    g.send(a.hasContent && a.data || null)
                } catch (l) {
                    if (c) throw l;
                }
            },
            abort: function() {
                c && c()
            }
        }
    });
    k.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /(?:java|ecma)script/
        },
        converters: {
            "text script": function(a) {
                k.globalEval(a);
                return a
            }
        }
    });
    k.ajaxPrefilter("script", function(a) {
        void 0 === a.cache && (a.cache = !1);
        a.crossDomain && (a.type = "GET")
    });
    k.ajaxTransport("script", function(a) {
        if (a.crossDomain) {
            var c, b;
            return {
                send: function(d, h) {
                    c = k("<script>").prop({
                        async: !0,
                        charset: a.scriptCharset,
                        src: a.url
                    }).on("load error", b = function(a) {
                        c.remove();
                        b = null;
                        a && h("error" === a.type ? 404 : 200, a.type)
                    });
                    P.head.appendChild(c[0])
                },
                abort: function() {
                    b && b()
                }
            }
        }
    });
    var Wc = [],
        Pb = /(=)\?(?=&|$)|\?\?/;
    k.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var a = Wc.pop() || k.expando + "_" + Fc++;
            this[a] = !0;
            return a
        }
    });
    k.ajaxPrefilter("json jsonp", function(a, c, b) {
        var d, h, l, m = !1 !== a.jsonp && (Pb.test(a.url) ? "url" : "string" === typeof a.data && !(a.contentType || "").indexOf("application/x-www-form-urlencoded") && Pb.test(a.data) && "data");
        if (m || "jsonp" === a.dataTypes[0]) return d = a.jsonpCallback = k.isFunction(a.jsonpCallback) ? a.jsonpCallback() : a.jsonpCallback, m ? a[m] = a[m].replace(Pb, "$1" +
            d) : !1 !== a.jsonp && (a.url += (Ua.test(a.url) ? "&" : "?") + a.jsonp + "=" + d), a.converters["script json"] = function() {
            l || k.error(d + " was not called");
            return l[0]
        }, a.dataTypes[0] = "json", h = g[d], g[d] = function() {
            l = arguments
        }, b.always(function() {
            g[d] = h;
            a[d] && (a.jsonpCallback = c.jsonpCallback, Wc.push(d));
            l && k.isFunction(h) && h(l[0]);
            l = h = void 0
        }), "script"
    });
    k.parseHTML = function(a, b, d) {
        if (!a || "string" !== typeof a) return null;
        "boolean" === typeof b && (d = b, b = !1);
        b = b || P;
        var h = c.exec(a);
        d = !d && [];
        if (h) return [b.createElement(h[1])];
        h = k.buildFragment([a], b, d);
        d && d.length && k(d).remove();
        return k.merge([], h.childNodes)
    };
    var tc = k.fn.load;
    k.fn.load = function(a, c, b) {
        if ("string" !== typeof a && tc) return tc.apply(this, arguments);
        var d, h, g, l = this,
            m = a.indexOf(" ");
        0 <= m && (d = k.trim(a.slice(m)), a = a.slice(0, m));
        k.isFunction(c) ? (b = c, c = void 0) : c && "object" === typeof c && (h = "POST");
        0 < l.length && k.ajax({
            url: a,
            type: h,
            dataType: "html",
            data: c
        }).done(function(a) {
            g = arguments;
            l.html(d ? k("<div>").append(k.parseHTML(a)).find(d) : a)
        }).complete(b && function(a, c) {
            l.each(b,
                g || [a.responseText, c, a])
        });
        return this
    };
    k.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function(a, c) {
        k.fn[c] = function(a) {
            return this.on(c, a)
        }
    });
    k.expr.filters.animated = function(a) {
        return k.grep(k.timers, function(c) {
            return a === c.elem
        }).length
    };
    var $a = g.document.documentElement;
    k.offset = {
        setOffset: function(a, c, b) {
            var d, h, g, l = k.css(a, "position"),
                m = k(a),
                p = {};
            "static" === l && (a.style.position = "relative");
            g = m.offset();
            h = k.css(a, "top");
            d = k.css(a, "left");
            ("absolute" === l ||
                "fixed" === l) && -1 < (h + d).indexOf("auto") ? (d = m.position(), h = d.top, d = d.left) : (h = parseFloat(h) || 0, d = parseFloat(d) || 0);
            k.isFunction(c) && (c = c.call(a, b, g));
            null != c.top && (p.top = c.top - g.top + h);
            null != c.left && (p.left = c.left - g.left + d);
            "using" in c ? c.using.call(a, p) : m.css(p)
        }
    };
    k.fn.extend({
        offset: function(a) {
            if (arguments.length) return void 0 === a ? this : this.each(function(c) {
                k.offset.setOffset(this, a, c)
            });
            var c, b;
            b = this[0];
            var d = {
                    top: 0,
                    left: 0
                },
                h = b && b.ownerDocument;
            if (h) {
                c = h.documentElement;
                if (!k.contains(c, b)) return d;
                "undefined" !== typeof b.getBoundingClientRect && (d = b.getBoundingClientRect());
                b = sb(h);
                return {
                    top: d.top + b.pageYOffset - c.clientTop,
                    left: d.left + b.pageXOffset - c.clientLeft
                }
            }
        },
        position: function() {
            if (this[0]) {
                var a, c, b = this[0],
                    d = {
                        top: 0,
                        left: 0
                    };
                "fixed" === k.css(b, "position") ? c = b.getBoundingClientRect() : (a = this.offsetParent(), c = this.offset(), k.nodeName(a[0], "html") || (d = a.offset()), d.top += k.css(a[0], "borderTopWidth", !0), d.left += k.css(a[0], "borderLeftWidth", !0));
                return {
                    top: c.top - d.top - k.css(b, "marginTop", !0),
                    left: c.left - d.left - k.css(b, "marginLeft", !0)
                }
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var a = this.offsetParent || $a; a && !k.nodeName(a, "html") && "static" === k.css(a, "position");) a = a.offsetParent;
                return a || $a
            })
        }
    });
    k.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(a, c) {
        var b = "pageYOffset" === c;
        k.fn[a] = function(d) {
            return ya(this, function(a, e, d) {
                var h = sb(a);
                if (void 0 === d) return h ? h[c] : a[e];
                h ? h.scrollTo(b ? g.pageXOffset : d, b ? d : g.pageYOffset) : a[e] = d
            }, a, d, arguments.length, null)
        }
    });
    k.each(["top", "left"], function(a, c) {
        k.cssHooks[c] = O(aa.pixelPosition, function(a, e) {
            if (e) return e = V(a, c), Hb.test(e) ? k(a).position()[c] + "px" : e
        })
    });
    k.each({
        Height: "height",
        Width: "width"
    }, function(a, c) {
        k.each({
            padding: "inner" + a,
            content: c,
            "": "outer" + a
        }, function(b, d) {
            k.fn[d] = function(d, h) {
                var g = arguments.length && (b || "boolean" !== typeof d),
                    l = b || (!0 === d || !0 === h ? "margin" : "border");
                return ya(this, function(c, b, d) {
                    return k.isWindow(c) ? c.document.documentElement["client" + a] : 9 === c.nodeType ? (b = c.documentElement,
                        Math.max(c.body["scroll" + a], b["scroll" + a], c.body["offset" + a], b["offset" + a], b["client" + a])) : void 0 === d ? k.css(c, b, l) : k.style(c, b, d, l)
                }, c, g ? d : void 0, g, null)
            }
        })
    });
    k.fn.size = function() {
        return this.length
    };
    k.fn.andSelf = k.fn.addBack;
    "function" === typeof define && define.amd && define("jquery", [], function() {
        return k
    });
    var lb = g.jQuery,
        Ia = g.$;
    k.noConflict = function(a) {
        g.$ === k && (g.$ = Ia);
        a && g.jQuery === k && (g.jQuery = lb);
        return k
    };
    "undefined" === typeof d && (g.jQuery = g.$ = k);
    return k
});

(function() {
    function g(a, c) {
        a.set(c[0], c[1]);
        return a
    }

    function d(a, c) {
        a.add(c);
        return a
    }

    function m(a, c, b) {
        switch (b.length) {
            case 0:
                return a.call(c);
            case 1:
                return a.call(c, b[0]);
            case 2:
                return a.call(c, b[0], b[1]);
            case 3:
                return a.call(c, b[0], b[1], b[2])
        }
        return a.apply(c, b)
    }

    function a(a, c, b, d) {
        for (var h = -1, g = null == a ? 0 : a.length; ++h < g;) {
            var k = a[h];
            c(d, k, b(k), a)
        }
        return d
    }

    function b(a, c) {
        for (var b = -1, d = null == a ? 0 : a.length; ++b < d && !1 !== c(a[b], b, a););
        return a
    }

    function h(a, c) {
        for (var b = null == a ? 0 : a.length; b-- && !1 !==
            c(a[b], b, a););
        return a
    }

    function n(a, c) {
        for (var b = -1, d = null == a ? 0 : a.length; ++b < d;)
            if (!c(a[b], b, a)) return !1;
        return !0
    }

    function l(a, c) {
        for (var b = -1, d = null == a ? 0 : a.length, h = 0, g = []; ++b < d;) {
            var k = a[b];
            c(k, b, a) && (g[h++] = k)
        }
        return g
    }

    function w(a, c) {
        return !(null == a || !a.length) && -1 < E(a, c, 0)
    }

    function r(a, c, b) {
        for (var d = -1, h = null == a ? 0 : a.length; ++d < h;)
            if (b(c, a[d])) return !0;
        return !1
    }

    function t(a, c) {
        for (var b = -1, d = null == a ? 0 : a.length, h = Array(d); ++b < d;) h[b] = c(a[b], b, a);
        return h
    }

    function D(a, c) {
        for (var b = -1, d = c.length,
                h = a.length; ++b < d;) a[h + b] = c[b];
        return a
    }

    function x(a, c, b, d) {
        var h = -1,
            g = null == a ? 0 : a.length;
        for (d && g && (b = a[++h]); ++h < g;) b = c(b, a[h], h, a);
        return b
    }

    function G(a, c, b, d) {
        var h = null == a ? 0 : a.length;
        for (d && h && (b = a[--h]); h--;) b = c(b, a[h], h, a);
        return b
    }

    function J(a, c) {
        for (var b = -1, d = null == a ? 0 : a.length; ++b < d;)
            if (c(a[b], b, a)) return !0;
        return !1
    }

    function B(a, c, b) {
        var d;
        b(a, function(a, b, h) {
            if (c(a, b, h)) return d = b, !1
        });
        return d
    }

    function A(a, c, b, d) {
        var h = a.length;
        for (b += d ? 1 : -1; d ? b-- : ++b < h;)
            if (c(a[b], b, a)) return b;
        return -1
    }

    function E(a, c, b) {
        if (c === c) a: {--b;
            for (var d = a.length; ++b < d;)
                if (a[b] === c) {
                    a = b;
                    break a
                }
            a = -1
        }
        else a = A(a, K, b);
        return a
    }

    function F(a, c, b, d) {
        --b;
        for (var h = a.length; ++b < h;)
            if (d(a[b], c)) return b;
        return -1
    }

    function K(a) {
        return a !== a
    }

    function V(a, c) {
        var b = null == a ? 0 : a.length;
        return b ? L(a, c) / b : gb
    }

    function O(a) {
        return function(c) {
            return null == c ? u : c[a]
        }
    }

    function ea(a) {
        return function(c) {
            return null == a ? u : a[c]
        }
    }

    function la(a, c, b, d, h) {
        h(a, function(a, h, g) {
            b = d ? (d = !1, a) : c(b, a, h, g)
        });
        return b
    }

    function ta(a, c) {
        var b = a.length;
        for (a.sort(c); b--;) a[b] = a[b].value;
        return a
    }

    function L(a, c) {
        for (var b, d = -1, h = a.length; ++d < h;) {
            var g = c(a[d]);
            g !== u && (b = b === u ? g : b + g)
        }
        return b
    }

    function ma(a, c) {
        for (var b = -1, d = Array(a); ++b < a;) d[b] = c(b);
        return d
    }

    function T(a, c) {
        return t(c, function(c) {
            return [c, a[c]]
        })
    }

    function R(a) {
        return function(c) {
            return a(c)
        }
    }

    function Ba(a, c) {
        return t(c, function(c) {
            return a[c]
        })
    }

    function Xa(a, c) {
        return a.has(c)
    }

    function fb(a, c) {
        for (var b = -1, d = a.length; ++b < d && -1 < E(c, a[b], 0););
        return b
    }

    function Ib(a, c) {
        for (var b = a.length; b-- &&
            -1 < E(c, a[b], 0););
        return b
    }

    function Wb(a) {
        return "\\" + Hb[a]
    }

    function ga(a) {
        var c = -1,
            b = Array(a.size);
        a.forEach(function(a, d) {
            b[++c] = [d, a]
        });
        return b
    }

    function rb(a, c) {
        return function(b) {
            return a(c(b))
        }
    }

    function ka(a, c) {
        for (var b = -1, d = a.length, h = 0, g = []; ++b < d;) {
            var k = a[b];
            if (k === c || "__lodash_placeholder__" === k) a[b] = "__lodash_placeholder__", g[h++] = b
        }
        return g
    }

    function sb(a) {
        var c = -1,
            b = Array(a.size);
        a.forEach(function(a) {
            b[++c] = a
        });
        return b
    }

    function Lb(a) {
        var c = -1,
            b = Array(a.size);
        a.forEach(function(a) {
            b[++c] = [a, a]
        });
        return b
    }

    function xa(a) {
        if (Bb.test(a)) {
            for (var c = Zb.lastIndex = 0; Zb.test(a);) ++c;
            a = c
        } else a = Ec(a);
        return a
    }

    function Ka(a) {
        return Bb.test(a) ? a.match(Zb) || [] : a.split("")
    }
    var u, Pa = 1 / 0,
        gb = 0 / 0,
        Lc = [
            ["ary", 128],
            ["bind", 1],
            ["bindKey", 2],
            ["curry", 8],
            ["curryRight", 16],
            ["flip", 512],
            ["partial", 32],
            ["partialRight", 64],
            ["rearg", 256]
        ],
        jc = /\b__p \+= '';/g,
        aa = /\b(__p \+=) '' \+/g,
        P = /(__e\(.*?\)|\b__t\)) \+\n'';/g,
        k = /&(?:amp|lt|gt|quot|#39);/g,
        kc = /[&<>"']/g,
        Mc = RegExp(k.source),
        lc = RegExp(kc.source),
        gd = /<%-([\s\S]+?)%>/g,
        oa = /<%([\s\S]+?)%>/g,
        I = /<%=([\s\S]+?)%>/g,
        c = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
        dd = /^\w*$/,
        rc = /^\./,
        jd = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
        Ac = /[\\^$.*+?()[\]{}|]/g,
        Nb = RegExp(Ac.source),
        Qa = /^\s+|\s+$/g,
        hc = /^\s+/,
        sc = /\s+$/,
        ya = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/,
        C = /\{\n\/\* \[wrapped with (.+)\] \*/,
        na = /,? & /,
        fd = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g,
        ed = /\\(\\)?/g,
        Sa = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,
        db = /\w*$/,
        pb = /^[-+]0x[0-9a-f]+$/i,
        Sc = /^0b[01]+$/i,
        kd = /^\[object .+?Constructor\]$/,
        ld = /^0o[0-7]+$/i,
        Yb = /^(?:0|[1-9]\d*)$/,
        tb = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g,
        ib = /($^)/,
        ub = /['\n\r\u2028\u2029\\]/g,
        Bc = /['\u2019]/g,
        Cc = /[\u0300-\u036f\ufe20-\ufe2f\u20d0-\u20ff]/g,
        Zb = /\ud83c[\udffb-\udfff](?=\ud83c[\udffb-\udfff])|(?:[^\ud800-\udfff][\u0300-\u036f\ufe20-\ufe2f\u20d0-\u20ff]?|[\u0300-\u036f\ufe20-\ufe2f\u20d0-\u20ff]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udfff])[\ufe0e\ufe0f]?(?:[\u0300-\u036f\ufe20-\ufe2f\u20d0-\u20ff]|\ud83c[\udffb-\udfff])?(?:\u200d(?:[^\ud800-\udfff]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff])[\ufe0e\ufe0f]?(?:[\u0300-\u036f\ufe20-\ufe2f\u20d0-\u20ff]|\ud83c[\udffb-\udfff])?)*/g,
        Tc = /[A-Z\xc0-\xd6\xd8-\xde]?[a-z\xdf-\xf6\xf8-\xff]+(?:['\u2019](?:d|ll|m|re|s|t|ve))?(?=[\xac\xb1\xd7\xf7\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\xbf\u2000-\u206f \t\x0b\f\xa0\ufeff\n\r\u2028\u2029\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000]|[A-Z\xc0-\xd6\xd8-\xde]|$)|(?:[A-Z\xc0-\xd6\xd8-\xde]|[^\ud800-\udfff\xac\xb1\xd7\xf7\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\xbf\u2000-\u206f \t\x0b\f\xa0\ufeff\n\r\u2028\u2029\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\d+\u2700-\u27bfa-z\xdf-\xf6\xf8-\xffA-Z\xc0-\xd6\xd8-\xde])+(?:['\u2019](?:D|LL|M|RE|S|T|VE))?(?=[\xac\xb1\xd7\xf7\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\xbf\u2000-\u206f \t\x0b\f\xa0\ufeff\n\r\u2028\u2029\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000]|[A-Z\xc0-\xd6\xd8-\xde](?:[a-z\xdf-\xf6\xf8-\xff]|[^\ud800-\udfff\xac\xb1\xd7\xf7\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\xbf\u2000-\u206f \t\x0b\f\xa0\ufeff\n\r\u2028\u2029\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\d+\u2700-\u27bfa-z\xdf-\xf6\xf8-\xffA-Z\xc0-\xd6\xd8-\xde])|$)|[A-Z\xc0-\xd6\xd8-\xde]?(?:[a-z\xdf-\xf6\xf8-\xff]|[^\ud800-\udfff\xac\xb1\xd7\xf7\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\xbf\u2000-\u206f \t\x0b\f\xa0\ufeff\n\r\u2028\u2029\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\d+\u2700-\u27bfa-z\xdf-\xf6\xf8-\xffA-Z\xc0-\xd6\xd8-\xde])+(?:['\u2019](?:d|ll|m|re|s|t|ve))?|[A-Z\xc0-\xd6\xd8-\xde]+(?:['\u2019](?:D|LL|M|RE|S|T|VE))?|\d*(?:(?:1ST|2ND|3RD|(?![123])\dTH)\b)|\d*(?:(?:1st|2nd|3rd|(?![123])\dth)\b)|\d+|(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff])[\ufe0e\ufe0f]?(?:[\u0300-\u036f\ufe20-\ufe2f\u20d0-\u20ff]|\ud83c[\udffb-\udfff])?(?:\u200d(?:[^\ud800-\udfff]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff])[\ufe0e\ufe0f]?(?:[\u0300-\u036f\ufe20-\ufe2f\u20d0-\u20ff]|\ud83c[\udffb-\udfff])?)*/g,
        Bb = /[\u200d\ud800-\udfff\u0300-\u036f\ufe20-\ufe2f\u20d0-\u20ff\ufe0e\ufe0f]/,
        Uc = /[a-z][A-Z]|[A-Z]{2,}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/,
        za = "Array Buffer DataView Date Error Float32Array Float64Array Function Int8Array Int16Array Int32Array Map Math Object Promise RegExp Set String Symbol TypeError Uint8Array Uint8ClampedArray Uint16Array Uint32Array WeakMap _ clearTimeout isFinite parseInt setTimeout".split(" "),
        ic = -1,
        Z = {};
    Z["[object Float32Array]"] = Z["[object Float64Array]"] = Z["[object Int8Array]"] =
        Z["[object Int16Array]"] = Z["[object Int32Array]"] = Z["[object Uint8Array]"] = Z["[object Uint8ClampedArray]"] = Z["[object Uint16Array]"] = Z["[object Uint32Array]"] = !0;
    Z["[object Arguments]"] = Z["[object Array]"] = Z["[object ArrayBuffer]"] = Z["[object Boolean]"] = Z["[object DataView]"] = Z["[object Date]"] = Z["[object Error]"] = Z["[object Function]"] = Z["[object Map]"] = Z["[object Number]"] = Z["[object Object]"] = Z["[object RegExp]"] = Z["[object Set]"] = Z["[object String]"] = Z["[object WeakMap]"] = !1;
    var ba = {};
    ba["[object Arguments]"] =
        ba["[object Array]"] = ba["[object ArrayBuffer]"] = ba["[object DataView]"] = ba["[object Boolean]"] = ba["[object Date]"] = ba["[object Float32Array]"] = ba["[object Float64Array]"] = ba["[object Int8Array]"] = ba["[object Int16Array]"] = ba["[object Int32Array]"] = ba["[object Map]"] = ba["[object Number]"] = ba["[object Object]"] = ba["[object RegExp]"] = ba["[object Set]"] = ba["[object String]"] = ba["[object Symbol]"] = ba["[object Uint8Array]"] = ba["[object Uint8ClampedArray]"] = ba["[object Uint16Array]"] = ba["[object Uint32Array]"] = !0;
    ba["[object Error]"] = ba["[object Function]"] = ba["[object WeakMap]"] = !1;
    var Hb = {
            "\\": "\\",
            "'": "'",
            "\n": "n",
            "\r": "r",
            "\u2028": "u2028",
            "\u2029": "u2029"
        },
        Ub = parseFloat,
        Vc = parseInt,
        Vb = "object" == typeof global && global && global.Object === Object && global,
        $b = "object" == typeof self && self && self.Object === Object && self,
        fa = Vb || $b || Function("return this")(),
        Eb = "object" == typeof exports && exports && !exports.nodeType && exports,
        ob = Eb && "object" == typeof module && module && !module.nodeType && module,
        Cb = ob && ob.exports === Eb,
        U = Cb &&
        Vb.process,
        da;
    a: {
        try {
            da = U && U.binding && U.binding("util");
            break a
        } catch (ca) {}
        da = void 0
    }
    var Fb = da && da.isArrayBuffer,
        Dc = da && da.isDate,
        Jb = da && da.isMap,
        eb = da && da.isRegExp,
        jb = da && da.isSet,
        Fa = da && da.isTypedArray,
        Ec = O("length"),
        ac = ea({
            "\u00c0": "A",
            "\u00c1": "A",
            "\u00c2": "A",
            "\u00c3": "A",
            "\u00c4": "A",
            "\u00c5": "A",
            "\u00e0": "a",
            "\u00e1": "a",
            "\u00e2": "a",
            "\u00e3": "a",
            "\u00e4": "a",
            "\u00e5": "a",
            "\u00c7": "C",
            "\u00e7": "c",
            "\u00d0": "D",
            "\u00f0": "d",
            "\u00c8": "E",
            "\u00c9": "E",
            "\u00ca": "E",
            "\u00cb": "E",
            "\u00e8": "e",
            "\u00e9": "e",
            "\u00ea": "e",
            "\u00eb": "e",
            "\u00cc": "I",
            "\u00cd": "I",
            "\u00ce": "I",
            "\u00cf": "I",
            "\u00ec": "i",
            "\u00ed": "i",
            "\u00ee": "i",
            "\u00ef": "i",
            "\u00d1": "N",
            "\u00f1": "n",
            "\u00d2": "O",
            "\u00d3": "O",
            "\u00d4": "O",
            "\u00d5": "O",
            "\u00d6": "O",
            "\u00d8": "O",
            "\u00f2": "o",
            "\u00f3": "o",
            "\u00f4": "o",
            "\u00f5": "o",
            "\u00f6": "o",
            "\u00f8": "o",
            "\u00d9": "U",
            "\u00da": "U",
            "\u00db": "U",
            "\u00dc": "U",
            "\u00f9": "u",
            "\u00fa": "u",
            "\u00fb": "u",
            "\u00fc": "u",
            "\u00dd": "Y",
            "\u00fd": "y",
            "\u00ff": "y",
            "\u00c6": "Ae",
            "\u00e6": "ae",
            "\u00de": "Th",
            "\u00fe": "th",
            "\u00df": "ss",
            "\u0100": "A",
            "\u0102": "A",
            "\u0104": "A",
            "\u0101": "a",
            "\u0103": "a",
            "\u0105": "a",
            "\u0106": "C",
            "\u0108": "C",
            "\u010a": "C",
            "\u010c": "C",
            "\u0107": "c",
            "\u0109": "c",
            "\u010b": "c",
            "\u010d": "c",
            "\u010e": "D",
            "\u0110": "D",
            "\u010f": "d",
            "\u0111": "d",
            "\u0112": "E",
            "\u0114": "E",
            "\u0116": "E",
            "\u0118": "E",
            "\u011a": "E",
            "\u0113": "e",
            "\u0115": "e",
            "\u0117": "e",
            "\u0119": "e",
            "\u011b": "e",
            "\u011c": "G",
            "\u011e": "G",
            "\u0120": "G",
            "\u0122": "G",
            "\u011d": "g",
            "\u011f": "g",
            "\u0121": "g",
            "\u0123": "g",
            "\u0124": "H",
            "\u0126": "H",
            "\u0125": "h",
            "\u0127": "h",
            "\u0128": "I",
            "\u012a": "I",
            "\u012c": "I",
            "\u012e": "I",
            "\u0130": "I",
            "\u0129": "i",
            "\u012b": "i",
            "\u012d": "i",
            "\u012f": "i",
            "\u0131": "i",
            "\u0134": "J",
            "\u0135": "j",
            "\u0136": "K",
            "\u0137": "k",
            "\u0138": "k",
            "\u0139": "L",
            "\u013b": "L",
            "\u013d": "L",
            "\u013f": "L",
            "\u0141": "L",
            "\u013a": "l",
            "\u013c": "l",
            "\u013e": "l",
            "\u0140": "l",
            "\u0142": "l",
            "\u0143": "N",
            "\u0145": "N",
            "\u0147": "N",
            "\u014a": "N",
            "\u0144": "n",
            "\u0146": "n",
            "\u0148": "n",
            "\u014b": "n",
            "\u014c": "O",
            "\u014e": "O",
            "\u0150": "O",
            "\u014d": "o",
            "\u014f": "o",
            "\u0151": "o",
            "\u0154": "R",
            "\u0156": "R",
            "\u0158": "R",
            "\u0155": "r",
            "\u0157": "r",
            "\u0159": "r",
            "\u015a": "S",
            "\u015c": "S",
            "\u015e": "S",
            "\u0160": "S",
            "\u015b": "s",
            "\u015d": "s",
            "\u015f": "s",
            "\u0161": "s",
            "\u0162": "T",
            "\u0164": "T",
            "\u0166": "T",
            "\u0163": "t",
            "\u0165": "t",
            "\u0167": "t",
            "\u0168": "U",
            "\u016a": "U",
            "\u016c": "U",
            "\u016e": "U",
            "\u0170": "U",
            "\u0172": "U",
            "\u0169": "u",
            "\u016b": "u",
            "\u016d": "u",
            "\u016f": "u",
            "\u0171": "u",
            "\u0173": "u",
            "\u0174": "W",
            "\u0175": "w",
            "\u0176": "Y",
            "\u0177": "y",
            "\u0178": "Y",
            "\u0179": "Z",
            "\u017b": "Z",
            "\u017d": "Z",
            "\u017a": "z",
            "\u017c": "z",
            "\u017e": "z",
            "\u0132": "IJ",
            "\u0133": "ij",
            "\u0152": "Oe",
            "\u0153": "oe",
            "\u0149": "'n",
            "\u017f": "s"
        }),
        md = ea({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        }),
        Fc = ea({
            "&amp;": "&",
            "&lt;": "<",
            "&gt;": ">",
            "&quot;": '"',
            "&#39;": "'"
        }),
        Ua = function Ga(Q) {
            function p(a) {
                if (Da(a) && !X(a) && !(a instanceof M)) {
                    if (a instanceof U) return a;
                    if (qa.call(a, "__wrapped__")) return rf(a)
                }
                return new U(a)
            }

            function ea() {}

            function U(a, f) {
                this.__wrapped__ = a;
                this.__actions__ = [];
                this.__chain__ = !!f;
                this.__index__ = 0;
                this.__values__ = u
            }

            function M(a) {
                this.__wrapped__ = a;
                this.__actions__ = [];
                this.__dir__ = 1;
                this.__filtered__ = !1;
                this.__iteratees__ = [];
                this.__takeCount__ = 4294967295;
                this.__views__ = []
            }

            function ca(a) {
                var f = -1,
                    c = null == a ? 0 : a.length;
                for (this.clear(); ++f < c;) {
                    var b = a[f];
                    this.set(b[0], b[1])
                }
            }

            function da(a) {
                var f = -1,
                    c = null == a ? 0 : a.length;
                for (this.clear(); ++f < c;) {
                    var b = a[f];
                    this.set(b[0], b[1])
                }
            }

            function Ha(a) {
                var f = -1,
                    c = null == a ? 0 : a.length;
                for (this.clear(); ++f <
                    c;) {
                    var b = a[f];
                    this.set(b[0], b[1])
                }
            }

            function va(a) {
                var f = -1,
                    c = null == a ? 0 : a.length;
                for (this.__data__ = new Ha; ++f < c;) this.add(a[f])
            }

            function pa(a) {
                this.size = (this.__data__ = new da(a)).size
            }

            function Db(a, f) {
                var c = X(a),
                    b = !c && Gc(a),
                    e = !c && !b && uc(a),
                    d = !c && !b && !e && Yc(a),
                    b = (c = c || b || e || d) ? ma(a.length, Gg) : [],
                    q = b.length,
                    h;
                for (h in a) !f && !qa.call(a, h) || c && ("length" == h || e && ("offset" == h || "parent" == h) || d && ("buffer" == h || "byteLength" == h || "byteOffset" == h) || cc(h, q)) || b.push(h);
                return b
            }

            function ob(a) {
                var f = a.length;
                return f ?
                    a[oe(0, f - 1)] : u
            }

            function vb(a, f) {
                return Id(Ya(a), Ia(f, 0, a.length))
            }

            function Eb(a) {
                return Id(Ya(a))
            }

            function kb(a, f, c, b) {
                return a === u || Qb(a, pd[c]) && !qa.call(b, c) ? f : a
            }

            function wb(a, f, c) {
                (c === u || Qb(a[f], c)) && (c !== u || f in a) || $a(a, f, c)
            }

            function bc(a, f, c) {
                var b = a[f];
                qa.call(a, f) && Qb(b, c) && (c !== u || f in a) || $a(a, f, c)
            }

            function xb(a, f) {
                for (var c = a.length; c--;)
                    if (Qb(a[c][0], f)) return c;
                return -1
            }

            function Hb(a, f, c, b) {
                vc(a, function(a, Aa, e) {
                    f(b, a, c(a), e)
                });
                return b
            }

            function Pb(a, f) {
                return a && Mb(f, Ja(f), a)
            }

            function tc(a,
                f) {
                return a && Mb(f, mb(f), a)
            }

            function $a(a, f, c) {
                "__proto__" == f && Jd ? Jd(a, f, {
                    configurable: !0,
                    enumerable: !0,
                    value: c,
                    writable: !0
                }) : a[f] = c
            }

            function lb(a, f) {
                for (var c = -1, b = f.length, e = Na(b), d = null == a; ++c < b;) e[c] = d ? u : we(a, f[c]);
                return e
            }

            function Ia(a, f, c) {
                a === a && (c !== u && (a = a <= c ? a : c), f !== u && (a = a >= f ? a : f));
                return a
            }

            function e(a, f, c, d, q, h) {
                var v, g = f & 1,
                    k = f & 2,
                    z = f & 4;
                c && (v = q ? c(a, d, q, h) : c(a));
                if (v !== u) return v;
                if (!ra(a)) return a;
                if (d = X(a)) {
                    if (v = Hg(a), !g) return Ya(a, v)
                } else {
                    var l = Va(a),
                        m = "[object Function]" == l || "[object GeneratorFunction]" ==
                        l;
                    if (uc(a)) return cf(a, g);
                    if ("[object Object]" == l || "[object Arguments]" == l || m && !q) {
                        if (v = k || m ? {} : sf(a), !g) return k ? xg(a, tc(v, a)) : wg(a, Pb(v, a))
                    } else {
                        if (!ba[l]) return q ? a : {};
                        v = Ig(a, l, e, g)
                    }
                }
                h || (h = new pa);
                if (q = h.get(a)) return q;
                h.set(a, v);
                var k = z ? k ? xe : Jg : k ? mb : Ja,
                    H = d ? u : k(a);
                b(H || a, function(b, d) {
                    H && (d = b, b = a[d]);
                    bc(v, d, e(b, f, c, d, a, h))
                });
                return v
            }

            function y(a) {
                var f = Ja(a);
                return function(c) {
                    return ja(c, a, f)
                }
            }

            function ja(a, f, c) {
                var b = c.length;
                if (null == a) return !b;
                for (a = sa(a); b--;) {
                    var e = c[b],
                        d = f[e],
                        q = a[e];
                    if (q ===
                        u && !(e in a) || !d(q)) return !1
                }
                return !0
            }

            function Ta(a, f, c) {
                if ("function" != typeof a) throw new yb("Expected a function");
                return qd(function() {
                    a.apply(u, c)
                }, f)
            }

            function Tb(a, f, c, b) {
                var e = -1,
                    d = w,
                    q = !0,
                    h = a.length,
                    v = [],
                    g = f.length;
                if (!h) return v;
                c && (f = t(f, R(c)));
                b ? (d = r, q = !1) : 200 <= f.length && (d = Xa, q = !1, f = new va(f));
                a: for (; ++e < h;) {
                    var k = a[e],
                        z = null == c ? k : c(k),
                        k = b || 0 !== k ? k : 0;
                    if (q && z === z) {
                        for (var l = g; l--;)
                            if (f[l] === z) continue a;
                        v.push(k)
                    } else d(f, z, b) || v.push(k)
                }
                return v
            }

            function Zb(a, f) {
                var c = !0;
                vc(a, function(a,
                    Aa, b) {
                    return c = !!f(a, Aa, b)
                });
                return c
            }

            function xc(a, f, c) {
                for (var b = -1, e = a.length; ++b < e;) {
                    var d = a[b],
                        q = f(d);
                    if (null != q && (h === u ? q === q && !nb(q) : c(q, h))) var h = q,
                        v = d
                }
                return v
            }

            function Vb(a, f) {
                var c = [];
                vc(a, function(a, Aa, b) {
                    f(a, Aa, b) && c.push(a)
                });
                return c
            }

            function wa(a, f, c, b, e) {
                var d = -1,
                    q = a.length;
                c || (c = Kg);
                for (e || (e = []); ++d < q;) {
                    var h = a[d];
                    0 < f && c(h) ? 1 < f ? wa(h, f - 1, c, b, e) : D(e, h) : b || (e[e.length] = h)
                }
                return e
            }

            function qb(a, f) {
                return a && ye(a, f, Ja)
            }

            function $b(a, f) {
                return a && tf(a, f, Ja)
            }

            function yc(a, f) {
                return l(f,
                    function(f) {
                        return dc(a[f])
                    })
            }

            function Kb(a, f) {
                f = mc(f, a);
                for (var c = 0, b = f.length; null != a && c < b;) a = a[Rb(f[c++])];
                return c && c == b ? a : u
            }

            function Pc(a, f, c) {
                f = f(a);
                return X(a) ? f : D(f, c(a))
            }

            function Ma(a) {
                if (null == a) return a === u ? "[object Undefined]" : "[object Null]";
                a = sa(a);
                var f;
                if (Hc && Hc in a) {
                    var c = qa.call(a, Hc),
                        b = a[Hc];
                    try {
                        a[Hc] = u, f = !0
                    } catch (e) {}
                    var d = uf.call(a);
                    f && (c ? a[Hc] = b : delete a[Hc]);
                    f = d
                } else f = uf.call(a);
                return f
            }

            function pc(a, f) {
                return a > f
            }

            function Qc(a, f) {
                return null != a && qa.call(a, f)
            }

            function Ec(a,
                f) {
                return null != a && f in sa(a)
            }

            function zc(a, f, c) {
                for (var b = c ? r : w, e = a[0].length, d = a.length, q = d, h = Na(d), v = Infinity, g = []; q--;) {
                    var k = a[q];
                    q && f && (k = t(k, R(f)));
                    v = Wa(k.length, v);
                    h[q] = !c && (f || 120 <= e && 120 <= k.length) ? new va(q && k) : u
                }
                var k = a[0],
                    z = -1,
                    l = h[0];
                a: for (; ++z < e && g.length < v;) {
                    var m = k[z],
                        H = f ? f(m) : m,
                        m = c || 0 !== m ? m : 0;
                    if (l ? !l.has(H) : !b(g, H, c)) {
                        for (q = d; --q;) {
                            var N = h[q];
                            if (N ? !N.has(H) : !b(a[q], H, c)) continue a
                        }
                        l && l.push(H);
                        g.push(m)
                    }
                }
                return g
            }

            function Ed(a, f, c, b) {
                qb(a, function(a, Aa, e) {
                    f(b, c(a), Aa, e)
                });
                return b
            }

            function nc(a, f, c) {
                f = mc(f, a);
                a = 2 > f.length ? a : Kb(a, Ca(f, 0, -1));
                f = null == a ? a : a[Rb(zb(f))];
                return null == f ? u : m(f, a, c)
            }

            function Bd(a) {
                return Da(a) && "[object Arguments]" == Ma(a)
            }

            function le(a) {
                return Da(a) && "[object ArrayBuffer]" == Ma(a)
            }

            function f(a) {
                return Da(a) && "[object Date]" == Ma(a)
            }

            function q(a, f, c, b, e) {
                if (a === f) return !0;
                if (null == a || null == f || !ra(a) && !Da(f)) return a !== a && f !== f;
                a: {
                    var d = X(a),
                        h = X(f),
                        v = "[object Array]",
                        g = "[object Array]";d || (v = Va(a), v = "[object Arguments]" == v ? "[object Object]" : v);h || (g = Va(f),
                        g = "[object Arguments]" == g ? "[object Object]" : g);
                    var k = "[object Object]" == v,
                        h = "[object Object]" == g;
                    if ((g = v == g) && uc(a)) {
                        if (!uc(f)) {
                            f = !1;
                            break a
                        }
                        d = !0;
                        k = !1
                    }
                    if (g && !k) e || (e = new pa),
                    f = d || Yc(a) ? vf(a, f, c, b, q, e) : Lg(a, f, v, c, b, q, e);
                    else {
                        if (!(c & 1) && (d = k && qa.call(a, "__wrapped__"), v = h && qa.call(f, "__wrapped__"), d || v)) {
                            a = d ? a.value() : a;
                            f = v ? f.value() : f;
                            e || (e = new pa);
                            f = q(a, f, c, b, e);
                            break a
                        }
                        if (g) b: if (e || (e = new pa), d = c & 1, v = Ja(a), h = v.length, g = Ja(f).length, h == g || d) {
                            for (k = h; k--;) {
                                var z = v[k];
                                if (!(d ? z in f : qa.call(f, z))) {
                                    f = !1;
                                    break b
                                }
                            }
                            if ((g = e.get(a)) && e.get(f)) f = g == f;
                            else {
                                g = !0;
                                e.set(a, f);
                                e.set(f, a);
                                for (var l = d; ++k < h;) {
                                    var z = v[k],
                                        m = a[z],
                                        H = f[z];
                                    if (b) var N = d ? b(H, m, z, f, a, e) : b(m, H, z, a, f, e);
                                    if (N === u ? m !== H && !q(m, H, c, b, e) : !N) {
                                        g = !1;
                                        break
                                    }
                                    l || (l = "constructor" == z)
                                }
                                g && !l && (c = a.constructor, b = f.constructor, c != b && "constructor" in a && "constructor" in f && !("function" == typeof c && c instanceof c && "function" == typeof b && b instanceof b) && (g = !1));
                                e["delete"](a);
                                e["delete"](f);
                                f = g
                            }
                        } else f = !1;
                        else f = !1
                    }
                }
                return f
            }

            function v(a) {
                return Da(a) && "[object Map]" ==
                    Va(a)
            }

            function z(a, f, c, b) {
                var e = c.length,
                    d = e,
                    h = !b;
                if (null == a) return !d;
                for (a = sa(a); e--;) {
                    var v = c[e];
                    if (h && v[2] ? v[1] !== a[v[0]] : !(v[0] in a)) return !1
                }
                for (; ++e < d;) {
                    var v = c[e],
                        g = v[0],
                        k = a[g],
                        z = v[1];
                    if (h && v[2]) {
                        if (k === u && !(g in a)) return !1
                    } else {
                        v = new pa;
                        if (b) var l = b(k, z, g, a, f, v);
                        if (l === u ? !q(z, k, 3, b, v) : !l) return !1
                    }
                }
                return !0
            }

            function N(a) {
                return !ra(a) || wf && wf in a ? !1 : (dc(a) ? Mg : kd).test(Ic(a))
            }

            function H(a) {
                return Da(a) && "[object RegExp]" == Ma(a)
            }

            function Za(a) {
                return Da(a) && "[object Set]" == Va(a)
            }

            function Xb(a) {
                return Da(a) &&
                    Kd(a.length) && !!Z[Ma(a)]
            }

            function Ra(a) {
                return "function" == typeof a ? a : null == a ? ab : "object" == typeof a ? X(a) ? Fd(a[0], a[1]) : lf(a) : xf(a)
            }

            function me(a) {
                if (!rd(a)) return Ng(a);
                var f = [],
                    c;
                for (c in sa(a)) qa.call(a, c) && "constructor" != c && f.push(c);
                return f
            }

            function je(a, f) {
                return a < f
            }

            function La(a, f) {
                var c = -1,
                    b = bb(a) ? Na(a.length) : [];
                vc(a, function(a, Aa, e) {
                    b[++c] = f(a, Aa, e)
                });
                return b
            }

            function lf(a) {
                var f = ze(a);
                return 1 == f.length && f[0][2] ? yf(f[0][0], f[0][1]) : function(c) {
                    return c === a || z(c, a, f)
                }
            }

            function Fd(a, f) {
                return Ae(a) &&
                    f === f && !ra(f) ? yf(Rb(a), f) : function(c) {
                        var b = we(c, a);
                        return b === u && b === f ? Be(c, a) : q(f, b, 3)
                    }
            }

            function Ad(a, f, c, b, e) {
                a !== f && ye(f, function(d, q) {
                    if (ra(d)) {
                        e || (e = new pa);
                        var h = e,
                            v = a[q],
                            g = f[q],
                            k = h.get(g);
                        if (!k) {
                            var k = b ? b(v, g, q + "", a, f, h) : u,
                                z = k === u;
                            if (z) {
                                var l = X(g),
                                    m = !l && uc(g),
                                    H = !l && !m && Yc(g),
                                    k = g;
                                if (l || m || H) X(v) ? k = v : Ea(v) ? k = Ya(v) : m ? (z = !1, k = cf(g, !0)) : H ? (z = !1, k = pf(g, !0)) : k = [];
                                else if (Ld(g) || Gc(g))
                                    if (k = v, Gc(v)) k = zf(v);
                                    else {
                                        if (!ra(v) || c && dc(v)) k = sf(g)
                                    }
                                else z = !1
                            }
                            z && (h.set(g, k), Ad(k, g, c, b, h), h["delete"](g))
                        }
                        wb(a,
                            q, k)
                    } else h = b ? b(a[q], d, q + "", a, f, e) : u, h === u && (h = d), wb(a, q, h)
                }, mb)
            }

            function bf(a, f) {
                var c = a.length;
                if (c) return f += 0 > f ? c : 0, cc(f, c) ? a[f] : u
            }

            function af(a, f, c) {
                var b = -1;
                f = t(f.length ? f : [ab], R(S()));
                a = La(a, function(a, c, Aa) {
                    return {
                        criteria: t(f, function(f) {
                            return f(a)
                        }),
                        index: ++b,
                        value: a
                    }
                });
                return ta(a, function(a, f) {
                    var Aa;
                    a: {
                        Aa = -1;
                        for (var b = a.criteria, e = f.criteria, d = b.length, Xc = c.length; ++Aa < d;) {
                            var q = qf(b[Aa], e[Aa]);
                            if (q) {
                                if (Aa >= Xc) {
                                    Aa = q;
                                    break a
                                }
                                Aa = q * ("desc" == c[Aa] ? -1 : 1);
                                break a
                            }
                        }
                        Aa = a.index - f.index
                    }
                    return Aa
                })
            }

            function zg(a, f) {
                a = sa(a);
                return ef(a, f, function(f, c) {
                    return Be(a, c)
                })
            }

            function ef(a, f, c) {
                for (var b = -1, e = f.length, d = {}; ++b < e;) {
                    var q = f[b],
                        h = Kb(a, q);
                    c(h, q) && Oc(d, mc(q, a), h)
                }
                return d
            }

            function Cg(a) {
                return function(f) {
                    return Kb(f, a)
                }
            }

            function ne(a, f, c, b) {
                var e = b ? F : E,
                    d = -1,
                    q = f.length,
                    h = a;
                a === f && (f = Ya(f));
                for (c && (h = t(a, R(c))); ++d < q;)
                    for (var v = 0, g = f[d], g = c ? c(g) : g; - 1 < (v = e(h, g, v, b));) h !== a && Md.call(h, v, 1), Md.call(a, v, 1);
                return a
            }

            function id(a, f) {
                for (var c = a ? f.length : 0, b = c - 1; c--;) {
                    var e = f[c];
                    if (c == b || e !== d) {
                        var d =
                            e;
                        cc(e) ? Md.call(a, e, 1) : re(a, e)
                    }
                }
                return a
            }

            function oe(a, f) {
                return a + Nd(Af() * (f - a + 1))
            }

            function pe(a, f) {
                var c = "";
                if (!a || 1 > f || 9007199254740991 < f) return c;
                do f % 2 && (c += a), (f = Nd(f / 2)) && (a += a); while (f);
                return c
            }

            function W(a, f) {
                return Ce(Bf(a, f, ab), a + "")
            }

            function Bg(a) {
                return ob(Zc(a))
            }

            function Dg(a, f) {
                var c = Zc(a);
                return Id(c, Ia(f, 0, c.length))
            }

            function Oc(a, f, c, b) {
                if (!ra(a)) return a;
                f = mc(f, a);
                for (var e = -1, d = f.length, q = d - 1, h = a; null != h && ++e < d;) {
                    var v = Rb(f[e]),
                        g = c;
                    if (e != q) {
                        var k = h[v],
                            g = b ? b(k, v, h) : u;
                        g === u && (g =
                            ra(k) ? k : cc(f[e + 1]) ? [] : {})
                    }
                    bc(h, v, g);
                    h = h[v]
                }
                return a
            }

            function Eg(a) {
                return Id(Zc(a))
            }

            function Ca(a, f, c) {
                var b = -1,
                    e = a.length;
                0 > f && (f = -f > e ? 0 : e + f);
                c = c > e ? e : c;
                0 > c && (c += e);
                e = f > c ? 0 : c - f >>> 0;
                f >>>= 0;
                for (c = Na(e); ++b < e;) c[b] = a[b + f];
                return c
            }

            function Fg(a, f) {
                var c;
                vc(a, function(a, Aa, b) {
                    c = f(a, Aa, b);
                    return !c
                });
                return !!c
            }

            function Gd(a, f, c) {
                var b = 0,
                    e = null == a ? b : a.length;
                if ("number" == typeof f && f === f && 2147483647 >= e) {
                    for (; b < e;) {
                        var d = b + e >>> 1,
                            q = a[d];
                        null !== q && !nb(q) && (c ? q <= f : q < f) ? b = d + 1 : e = d
                    }
                    return e
                }
                return qe(a, f, ab, c)
            }

            function qe(a, f, c, b) {
                f = c(f);
                for (var e = 0, d = null == a ? 0 : a.length, q = f !== f, h = null === f, v = nb(f), g = f === u; e < d;) {
                    var k = Nd((e + d) / 2),
                        z = c(a[k]),
                        l = z !== u,
                        m = null === z,
                        H = z === z,
                        N = nb(z);
                    (q ? b || H : g ? H && (b || l) : h ? H && l && (b || !m) : v ? H && l && !m && (b || !N) : m || N ? 0 : b ? z <= f : z < f) ? e = k + 1: d = k
                }
                return Wa(d, 4294967294)
            }

            function mf(a, f) {
                for (var c = -1, b = a.length, e = 0, d = []; ++c < b;) {
                    var q = a[c],
                        h = f ? f(q) : q;
                    if (!c || !Qb(h, v)) {
                        var v = h;
                        d[e++] = 0 === q ? 0 : q
                    }
                }
                return d
            }

            function ua(a) {
                return "number" == typeof a ? a : nb(a) ? gb : +a
            }

            function hb(a) {
                if ("string" == typeof a) return a;
                if (X(a)) return t(a, hb) + "";
                if (nb(a)) return Cf ? Cf.call(a) : "";
                var f = a + "";
                return "0" == f && 1 / a == -Pa ? "-0" : f
            }

            function qc(a, f, c) {
                var b = -1,
                    e = w,
                    d = a.length,
                    q = !0,
                    h = [],
                    v = h;
                if (c) q = !1, e = r;
                else if (200 <= d) {
                    if (e = f ? null : Og(a)) return sb(e);
                    q = !1;
                    e = Xa;
                    v = new va
                } else v = f ? [] : h;
                a: for (; ++b < d;) {
                    var g = a[b],
                        k = f ? f(g) : g,
                        g = c || 0 !== g ? g : 0;
                    if (q && k === k) {
                        for (var z = v.length; z--;)
                            if (v[z] === k) continue a;
                        f && v.push(k);
                        h.push(g)
                    } else e(v, k, c) || (v !== h && v.push(k), h.push(g))
                }
                return h
            }

            function re(a, f) {
                f = mc(f, a);
                a = 2 > f.length ? a : Kb(a, Ca(f, 0, -1));
                return null ==
                    a || delete a[Rb(zb(f))]
            }

            function ha(a, f, c, b) {
                for (var e = a.length, d = b ? e : -1;
                    (b ? d-- : ++d < e) && f(a[d], d, a););
                return c ? Ca(a, b ? 0 : d, b ? d + 1 : e) : Ca(a, b ? d + 1 : 0, b ? e : d)
            }

            function nf(a, f) {
                var c = a;
                c instanceof M && (c = c.value());
                return x(f, function(a, f) {
                    return f.func.apply(f.thisArg, D([a], f.args))
                }, c)
            }

            function se(a, f, c) {
                var b = a.length;
                if (2 > b) return b ? qc(a[0]) : [];
                for (var e = -1, d = Na(b); ++e < b;)
                    for (var q = a[e], h = -1; ++h < b;) h != e && (d[e] = Tb(d[e] || q, a[h], f, c));
                return qc(wa(d, 1), f, c)
            }

            function of (a, f, c) {
                for (var b = -1, e = a.length, d = f.length,
                        q = {}; ++b < e;) c(q, a[b], b < d ? f[b] : u);
                return q
            }

            function te(a) {
                return Ea(a) ? a : []
            }

            function ue(a) {
                return "function" == typeof a ? a : ab
            }

            function mc(a, f) {
                return X(a) ? a : Ae(a, f) ? [a] : Df(ia(a))
            }

            function oc(a, f, c) {
                var b = a.length;
                c = c === u ? b : c;
                return !f && c >= b ? a : Ca(a, f, c)
            }

            function cf(a, f) {
                if (f) return a.slice();
                var c = a.length,
                    c = Ef ? Ef(c) : new a.constructor(c);
                a.copy(c);
                return c
            }

            function ve(a) {
                var f = new a.constructor(a.byteLength);
                (new Od(f)).set(new Od(a));
                return f
            }

            function pf(a, f) {
                var c = f ? ve(a.buffer) : a.buffer;
                return new a.constructor(c,
                    a.byteOffset, a.length)
            }

            function qf(a, f) {
                if (a !== f) {
                    var c = a !== u,
                        b = null === a,
                        e = a === a,
                        d = nb(a),
                        q = f !== u,
                        h = null === f,
                        v = f === f,
                        g = nb(f);
                    if (!h && !g && !d && a > f || d && q && v && !h && !g || b && q && v || !c && v || !e) return 1;
                    if (!b && !d && !g && a < f || g && c && e && !b && !d || h && c && e || !q && e || !v) return -1
                }
                return 0
            }

            function ie(a, f, c, b) {
                var e = -1,
                    d = a.length,
                    q = c.length,
                    h = -1,
                    v = f.length,
                    g = Oa(d - q, 0),
                    k = Na(v + g);
                for (b = !b; ++h < v;) k[h] = f[h];
                for (; ++e < q;)
                    if (b || e < d) k[c[e]] = a[e];
                for (; g--;) k[h++] = a[e++];
                return k
            }

            function Ze(a, f, c, b) {
                var e = -1,
                    d = a.length,
                    q = -1,
                    h = c.length,
                    v = -1,
                    g = f.length,
                    k = Oa(d - h, 0),
                    z = Na(k + g);
                for (b = !b; ++e < k;) z[e] = a[e];
                for (k = e; ++v < g;) z[k + v] = f[v];
                for (; ++q < h;)
                    if (b || e < d) z[k + c[q]] = a[e++];
                return z
            }

            function Ya(a, f) {
                var c = -1,
                    b = a.length;
                for (f || (f = Na(b)); ++c < b;) f[c] = a[c];
                return f
            }

            function Mb(a, f, c, b) {
                var e = !c;
                c || (c = {});
                for (var d = -1, q = f.length; ++d < q;) {
                    var h = f[d],
                        v = b ? b(c[h], a[h], h, c, a) : u;
                    v === u && (v = a[h]);
                    e ? $a(c, h, v) : bc(c, h, v)
                }
                return c
            }

            function wg(a, f) {
                return Mb(a, De(a), f)
            }

            function xg(a, f) {
                return Mb(a, Ff(a), f)
            }

            function zd(f, c) {
                return function(b, e) {
                    var d = X(b) ? a :
                        Hb,
                        q = c ? c() : {};
                    return d(b, f, S(e, 2), q)
                }
            }

            function Nc(a) {
                return W(function(f, c) {
                    var b = -1,
                        e = c.length,
                        d = 1 < e ? c[e - 1] : u,
                        q = 2 < e ? c[2] : u,
                        d = 3 < a.length && "function" == typeof d ? (e--, d) : u;
                    q && cb(c[0], c[1], q) && (d = 3 > e ? u : d, e = 1);
                    for (f = sa(f); ++b < e;)(q = c[b]) && a(f, q, b, d);
                    return f
                })
            }

            function $e(a, f) {
                return function(c, b) {
                    if (null == c) return c;
                    if (!bb(c)) return a(c, b);
                    for (var e = c.length, d = f ? e : -1, q = sa(c);
                        (f ? d-- : ++d < e) && !1 !== b(q[d], d, q););
                    return c
                }
            }

            function df(a) {
                return function(f, c, b) {
                    var e = -1,
                        d = sa(f);
                    b = b(f);
                    for (var q = b.length; q--;) {
                        var h =
                            b[a ? q : ++e];
                        if (!1 === c(d[h], h, d)) break
                    }
                    return f
                }
            }

            function yg(a, f, c) {
                function b() {
                    return (this && this !== fa && this instanceof b ? d : a).apply(e ? c : this, arguments)
                }
                var e = f & 1,
                    d = hd(a);
                return b
            }

            function ff(a) {
                return function(f) {
                    f = ia(f);
                    var c = Bb.test(f) ? Ka(f) : u,
                        b = c ? c[0] : f.charAt(0);
                    f = c ? oc(c, 1).join("") : f.slice(1);
                    return b[a]() + f
                }
            }

            function Rc(a) {
                return function(f) {
                    return x(Gf(Hf(f).replace(Bc, "")), a, "")
                }
            }

            function hd(a) {
                return function() {
                    var f = arguments;
                    switch (f.length) {
                        case 0:
                            return new a;
                        case 1:
                            return new a(f[0]);
                        case 2:
                            return new a(f[0], f[1]);
                        case 3:
                            return new a(f[0], f[1], f[2]);
                        case 4:
                            return new a(f[0], f[1], f[2], f[3]);
                        case 5:
                            return new a(f[0], f[1], f[2], f[3], f[4]);
                        case 6:
                            return new a(f[0], f[1], f[2], f[3], f[4], f[5]);
                        case 7:
                            return new a(f[0], f[1], f[2], f[3], f[4], f[5], f[6])
                    }
                    var c = $c(a.prototype),
                        f = a.apply(c, f);
                    return ra(f) ? f : c
                }
            }

            function Ag(a, f, c) {
                function b() {
                    for (var d = arguments.length, q = Na(d), h = d, v = ad(b); h--;) q[h] = arguments[h];
                    h = 3 > d && q[0] !== v && q[d - 1] !== v ? [] : ka(q, v);
                    d -= h.length;
                    return d < c ? If(a, f, Cd, b.placeholder,
                        u, q, h, u, u, c - d) : m(this && this !== fa && this instanceof b ? e : a, this, q)
                }
                var e = hd(a);
                return b
            }

            function gf(a) {
                return function(f, c, b) {
                    var e = sa(f);
                    if (!bb(f)) {
                        var d = S(c, 3);
                        f = Ja(f);
                        c = function(a) {
                            return d(e[a], a, e)
                        }
                    }
                    c = a(f, c, b);
                    return -1 < c ? e[d ? f[c] : c] : u
                }
            }

            function hf(a) {
                return ec(function(f) {
                    var c = f.length,
                        b = c,
                        e = U.prototype.thru;
                    for (a && f.reverse(); b--;) {
                        var d = f[b];
                        if ("function" != typeof d) throw new yb("Expected a function");
                        if (e && !q && "wrapper" == Pd(d)) var q = new U([], !0)
                    }
                    for (b = q ? b : c; ++b < c;) var d = f[b],
                        e = Pd(d),
                        h = "wrapper" ==
                        e ? Ee(d) : u,
                        q = h && Fe(h[0]) && 424 == h[1] && !h[4].length && 1 == h[9] ? q[Pd(h[0])].apply(q, h[3]) : 1 == d.length && Fe(d) ? q[e]() : q.thru(d);
                    return function() {
                        var a = arguments,
                            b = a[0];
                        if (q && 1 == a.length && X(b) && 200 <= b.length) return q.plant(b).value();
                        for (var e = 0, a = c ? f[e].apply(this, a) : b; ++e < c;) a = f[e].call(this, a);
                        return a
                    }
                })
            }

            function Cd(a, f, c, b, e, d, q, h, v, g) {
                function k() {
                    for (var p = arguments.length, t = Na(p), r = p; r--;) t[r] = arguments[r];
                    if (H) {
                        var x = ad(k),
                            Sb, r = t.length;
                        for (Sb = 0; r--;) t[r] === x && ++Sb
                    }
                    b && (t = ie(t, b, e, H));
                    d && (t = Ze(t,
                        d, q, H));
                    p -= Sb;
                    if (H && p < g) return x = ka(t, x), If(a, f, Cd, k.placeholder, c, t, x, h, v, g - p);
                    x = l ? c : this;
                    r = m ? x[a] : a;
                    p = t.length;
                    if (h) {
                        Sb = t.length;
                        for (var Za = Wa(h.length, Sb), G = Ya(t); Za--;) {
                            var w = h[Za];
                            t[Za] = cc(w, Sb) ? G[w] : u
                        }
                    } else N && 1 < p && t.reverse();
                    z && v < p && (t.length = v);
                    this && this !== fa && this instanceof k && (r = n || hd(r));
                    return r.apply(x, t)
                }
                var z = f & 128,
                    l = f & 1,
                    m = f & 2,
                    H = f & 24,
                    N = f & 512,
                    n = m ? u : hd(a);
                return k
            }

            function jf(a, f) {
                return function(c, b) {
                    return Ed(c, a, f(b), {})
                }
            }

            function Dd(a, f) {
                return function(c, b) {
                    var e;
                    if (c === u && b ===
                        u) return f;
                    c !== u && (e = c);
                    if (b !== u) {
                        if (e === u) return b;
                        "string" == typeof c || "string" == typeof b ? (c = hb(c), b = hb(b)) : (c = ua(c), b = ua(b));
                        e = a(c, b)
                    }
                    return e
                }
            }

            function ke(a) {
                return ec(function(f) {
                    f = t(f, R(S()));
                    return W(function(c) {
                        var b = this;
                        return a(f, function(a) {
                            return m(a, b, c)
                        })
                    })
                })
            }

            function Qd(a, f) {
                f = f === u ? " " : hb(f);
                var c = f.length;
                if (2 > c) return c ? pe(f, a) : f;
                c = pe(f, Rd(a / xa(f)));
                return Bb.test(f) ? oc(Ka(c), 0, a).join("") : c.slice(0, a)
            }

            function Pg(a, f, c, b) {
                function e() {
                    for (var f = -1, h = arguments.length, Xc = -1, v = b.length,
                            g = Na(v + h), k = this && this !== fa && this instanceof e ? q : a; ++Xc < v;) g[Xc] = b[Xc];
                    for (; h--;) g[Xc++] = arguments[++f];
                    return m(k, d ? c : this, g)
                }
                var d = f & 1,
                    q = hd(a);
                return e
            }

            function Sb(a) {
                return function(f, c, b) {
                    b && "number" != typeof b && cb(f, c, b) && (c = b = u);
                    f = fc(f);
                    c === u ? (c = f, f = 0) : c = fc(c);
                    b = b === u ? f < c ? 1 : -1 : fc(b);
                    var e = -1;
                    c = Oa(Rd((c - f) / (b || 1)), 0);
                    for (var d = Na(c); c--;) d[a ? c : ++e] = f, f += b;
                    return d
                }
            }

            function Sd(a) {
                return function(f, c) {
                    if ("string" != typeof f || "string" != typeof c) f = Ab(f), c = Ab(c);
                    return a(f, c)
                }
            }

            function If(a, f, c, b,
                e, d, q, h, v, g) {
                var k = f & 8,
                    z = k ? q : u;
                q = k ? u : q;
                var l = k ? d : u;
                d = k ? u : d;
                f = (f | (k ? 32 : 64)) & ~(k ? 64 : 32);
                f & 4 || (f &= -4);
                e = [a, f, e, l, z, d, q, h, v, g];
                c = c.apply(u, e);
                Fe(a) && Jf(c, e);
                c.placeholder = b;
                return Kf(c, a, f)
            }

            function Ge(a) {
                var f = bd[a];
                return function(a, c) {
                    a = Ab(a);
                    if (c = Wa(Y(c), 292)) {
                        var b = (ia(a) + "e").split("e"),
                            b = f(b[0] + "e" + (+b[1] + c)),
                            b = (ia(b) + "e").split("e");
                        return +(b[0] + "e" + (+b[1] - c))
                    }
                    return f(a)
                }
            }

            function Lf(a) {
                return function(f) {
                    var c = Va(f);
                    return "[object Map]" == c ? ga(f) : "[object Set]" == c ? Lb(f) : T(f, a(f))
                }
            }

            function gc(a,
                f, c, b, e, d, q, h) {
                var v = f & 2;
                if (!v && "function" != typeof a) throw new yb("Expected a function");
                var g = b ? b.length : 0;
                g || (f &= -97, b = e = u);
                q = q === u ? q : Oa(Y(q), 0);
                h = h === u ? h : Y(h);
                g -= e ? e.length : 0;
                if (f & 64) {
                    var k = b,
                        z = e;
                    b = e = u
                }
                var l = v ? u : Ee(a);
                d = [a, f, c, b, e, k, z, d, q, h];
                if (l && (c = d[1], a = l[1], f = c | a, b = 128 == a && 8 == c || 128 == a && 256 == c && d[7].length <= l[8] || 384 == a && l[7].length <= l[8] && 8 == c, 131 > f || b)) {
                    a & 1 && (d[2] = l[2], f |= c & 1 ? 0 : 4);
                    if (c = l[3]) b = d[3], d[3] = b ? ie(b, c, l[4]) : c, d[4] = b ? ka(d[3], "__lodash_placeholder__") : l[4];
                    if (c = l[5]) b = d[5], d[5] =
                        b ? Ze(b, c, l[6]) : c, d[6] = b ? ka(d[5], "__lodash_placeholder__") : l[6];
                    (c = l[7]) && (d[7] = c);
                    a & 128 && (d[8] = null == d[8] ? l[8] : Wa(d[8], l[8]));
                    null == d[9] && (d[9] = l[9]);
                    d[0] = l[0];
                    d[1] = f
                }
                a = d[0];
                f = d[1];
                c = d[2];
                b = d[3];
                e = d[4];
                h = d[9] = null == d[9] ? v ? 0 : a.length : Oa(d[9] - g, 0);
                !h && f & 24 && (f &= -25);
                v = f && 1 != f ? 8 == f || 16 == f ? Ag(a, f, h) : 32 != f && 33 != f || e.length ? Cd.apply(u, d) : Pg(a, f, c, b) : yg(a, f, c);
                return Kf((l ? Mf : Jf)(v, d), a, f)
            }

            function vf(a, f, c, b, e, d) {
                var q = c & 1,
                    h = a.length,
                    v = f.length;
                if (h != v && !(q && v > h)) return !1;
                if ((v = d.get(a)) && d.get(f)) return v ==
                    f;
                var v = -1,
                    g = !0,
                    k = c & 2 ? new va : u;
                d.set(a, f);
                for (d.set(f, a); ++v < h;) {
                    var z = a[v],
                        l = f[v];
                    if (b) var m = q ? b(l, z, v, f, a, d) : b(z, l, v, a, f, d);
                    if (m !== u) {
                        if (m) continue;
                        g = !1;
                        break
                    }
                    if (k) {
                        if (!J(f, function(a, f) {
                                if (!k.has(f) && (z === a || e(z, a, c, b, d))) return k.push(f)
                            })) {
                            g = !1;
                            break
                        }
                    } else if (z !== l && !e(z, l, c, b, d)) {
                        g = !1;
                        break
                    }
                }
                d["delete"](a);
                d["delete"](f);
                return g
            }

            function Lg(a, f, c, b, e, d, q) {
                switch (c) {
                    case "[object DataView]":
                        if (a.byteLength != f.byteLength || a.byteOffset != f.byteOffset) break;
                        a = a.buffer;
                        f = f.buffer;
                    case "[object ArrayBuffer]":
                        if (a.byteLength !=
                            f.byteLength || !d(new Od(a), new Od(f))) break;
                        return !0;
                    case "[object Boolean]":
                    case "[object Date]":
                    case "[object Number]":
                        return Qb(+a, +f);
                    case "[object Error]":
                        return a.name == f.name && a.message == f.message;
                    case "[object RegExp]":
                    case "[object String]":
                        return a == f + "";
                    case "[object Map]":
                        var h = ga;
                    case "[object Set]":
                        h || (h = sb);
                        if (a.size != f.size && !(b & 1)) break;
                        if (c = q.get(a)) return c == f;
                        b |= 2;
                        q.set(a, f);
                        f = vf(h(a), h(f), b, e, d, q);
                        q["delete"](a);
                        return f;
                    case "[object Symbol]":
                        if (sd) return sd.call(a) == sd.call(f)
                }
                return !1
            }

            function ec(a) {
                return Ce(Bf(a, u, Nf), a + "")
            }

            function Jg(a) {
                return Pc(a, Ja, De)
            }

            function xe(a) {
                return Pc(a, mb, Ff)
            }

            function Pd(a) {
                for (var f = a.name + "", c = td[f], b = qa.call(td, f) ? c.length : 0; b--;) {
                    var e = c[b],
                        d = e.func;
                    if (null == d || d == a) return e.name
                }
                return f
            }

            function ad(a) {
                return (qa.call(p, "placeholder") ? p : a).placeholder
            }

            function S() {
                var a = p.iteratee || He,
                    a = a === He ? Ra : a;
                return arguments.length ? a(arguments[0], arguments[1]) : a
            }

            function Td(a, f) {
                var c = a.__data__,
                    b = typeof f;
                return ("string" == b || "number" == b || "symbol" ==
                    b || "boolean" == b ? "__proto__" !== f : null === f) ? c["string" == typeof f ? "string" : "hash"] : c.map
            }

            function ze(a) {
                for (var f = Ja(a), c = f.length; c--;) {
                    var b = f[c],
                        e = a[b];
                    f[c] = [b, e, e === e && !ra(e)]
                }
                return f
            }

            function Jc(a, f) {
                var c = null == a ? u : a[f];
                return N(c) ? c : u
            }

            function Of(a, f, c) {
                f = mc(f, a);
                for (var b = -1, e = f.length, d = !1; ++b < e;) {
                    var q = Rb(f[b]);
                    if (!(d = null != a && c(a, q))) break;
                    a = a[q]
                }
                if (d || ++b != e) return d;
                e = null == a ? 0 : a.length;
                return !!e && Kd(e) && cc(q, e) && (X(a) || Gc(a))
            }

            function Hg(a) {
                var f = a.length,
                    c = a.constructor(f);
                f && "string" ==
                    typeof a[0] && qa.call(a, "index") && (c.index = a.index, c.input = a.input);
                return c
            }

            function sf(a) {
                return "function" != typeof a.constructor || rd(a) ? {} : $c(Ud(a))
            }

            function Ig(a, f, c, b) {
                var e = a.constructor;
                switch (f) {
                    case "[object ArrayBuffer]":
                        return ve(a);
                    case "[object Boolean]":
                    case "[object Date]":
                        return new e(+a);
                    case "[object DataView]":
                        return f = b ? ve(a.buffer) : a.buffer, new a.constructor(f, a.byteOffset, a.byteLength);
                    case "[object Float32Array]":
                    case "[object Float64Array]":
                    case "[object Int8Array]":
                    case "[object Int16Array]":
                    case "[object Int32Array]":
                    case "[object Uint8Array]":
                    case "[object Uint8ClampedArray]":
                    case "[object Uint16Array]":
                    case "[object Uint32Array]":
                        return pf(a,
                            b);
                    case "[object Map]":
                        return f = b ? c(ga(a), 1) : ga(a), x(f, g, new a.constructor);
                    case "[object Number]":
                    case "[object String]":
                        return new e(a);
                    case "[object RegExp]":
                        return f = new a.constructor(a.source, db.exec(a)), f.lastIndex = a.lastIndex, f;
                    case "[object Set]":
                        return f = b ? c(sb(a), 1) : sb(a), x(f, d, new a.constructor);
                    case "[object Symbol]":
                        return sd ? sa(sd.call(a)) : {}
                }
            }

            function Kg(a) {
                return X(a) || Gc(a) || !!(Pf && a && a[Pf])
            }

            function cc(a, f) {
                f = null == f ? 9007199254740991 : f;
                return !!f && ("number" == typeof a || Yb.test(a)) &&
                    -1 < a && 0 == a % 1 && a < f
            }

            function cb(a, f, c) {
                if (!ra(c)) return !1;
                var b = typeof f;
                return ("number" == b ? bb(c) && cc(f, c.length) : "string" == b && f in c) ? Qb(c[f], a) : !1
            }

            function Ae(a, f) {
                if (X(a)) return !1;
                var b = typeof a;
                return "number" == b || "symbol" == b || "boolean" == b || null == a || nb(a) ? !0 : dd.test(a) || !c.test(a) || null != f && a in sa(f)
            }

            function Fe(a) {
                var f = Pd(a),
                    c = p[f];
                if ("function" != typeof c || !(f in M.prototype)) return !1;
                if (a === c) return !0;
                f = Ee(c);
                return !!f && a === f[0]
            }

            function rd(a) {
                var f = a && a.constructor;
                return a === ("function" == typeof f &&
                    f.prototype || pd)
            }

            function yf(a, f) {
                return function(c) {
                    return null == c ? !1 : c[a] === f && (f !== u || a in sa(c))
                }
            }

            function Qf(a, f, c, b, e, d) {
                ra(a) && ra(f) && (d.set(f, a), Ad(a, f, u, Qf, d), d["delete"](f));
                return a
            }

            function Bf(a, f, c) {
                f = Oa(f === u ? a.length - 1 : f, 0);
                return function() {
                    for (var b = arguments, e = -1, d = Oa(b.length - f, 0), q = Na(d); ++e < d;) q[e] = b[f + e];
                    e = -1;
                    for (d = Na(f + 1); ++e < f;) d[e] = b[e];
                    d[f] = c(q);
                    return m(a, this, d)
                }
            }

            function Kf(a, f, c) {
                var b = f + "";
                f = Ce;
                var e = Qg,
                    d;
                d = (d = b.match(C)) ? d[1].split(na) : [];
                c = e(d, c);
                if (e = c.length) d = e -
                    1, c[d] = (1 < e ? "& " : "") + c[d], c = c.join(2 < e ? ", " : " "), b = b.replace(ya, "{\n/* [wrapped with " + c + "] */\n");
                return f(a, b)
            }

            function Rf(a) {
                var f = 0,
                    c = 0;
                return function() {
                    var b = Rg(),
                        e = 16 - (b - c);
                    c = b;
                    if (0 < e) {
                        if (800 <= ++f) return arguments[0]
                    } else f = 0;
                    return a.apply(u, arguments)
                }
            }

            function Id(a, f) {
                var c = -1,
                    b = a.length,
                    e = b - 1;
                for (f = f === u ? b : f; ++c < f;) {
                    var b = oe(c, e),
                        d = a[b];
                    a[b] = a[c];
                    a[c] = d
                }
                a.length = f;
                return a
            }

            function Rb(a) {
                if ("string" == typeof a || nb(a)) return a;
                var f = a + "";
                return "0" == f && 1 / a == -Pa ? "-0" : f
            }

            function Ic(a) {
                if (null !=
                    a) {
                    try {
                        return Vd.call(a)
                    } catch (f) {}
                    return a + ""
                }
                return ""
            }

            function Qg(a, f) {
                b(Lc, function(c) {
                    var b = "_." + c[0];
                    f & c[1] && !w(a, b) && a.push(b)
                });
                return a.sort()
            }

            function rf(a) {
                if (a instanceof M) return a.clone();
                var f = new U(a.__wrapped__, a.__chain__);
                f.__actions__ = Ya(a.__actions__);
                f.__index__ = a.__index__;
                f.__values__ = a.__values__;
                return f
            }

            function Sf(a, f, c) {
                var b = null == a ? 0 : a.length;
                if (!b) return -1;
                c = null == c ? 0 : Y(c);
                0 > c && (c = Oa(b + c, 0));
                return A(a, S(f, 3), c)
            }

            function Tf(a, f, c) {
                var b = null == a ? 0 : a.length;
                if (!b) return -1;
                var e = b - 1;
                c !== u && (e = Y(c), e = 0 > c ? Oa(b + e, 0) : Wa(e, b - 1));
                return A(a, S(f, 3), e, !0)
            }

            function Nf(a) {
                return (null == a ? 0 : a.length) ? wa(a, 1) : []
            }

            function Uf(a) {
                return a && a.length ? a[0] : u
            }

            function zb(a) {
                var f = null == a ? 0 : a.length;
                return f ? a[f - 1] : u
            }

            function Vf(a, f) {
                return a && a.length && f && f.length ? ne(a, f) : a
            }

            function Ie(a) {
                return null == a ? a : Sg.call(a)
            }

            function Je(a) {
                if (!a || !a.length) return [];
                var f = 0;
                a = l(a, function(a) {
                    if (Ea(a)) return f = Oa(a.length, f), !0
                });
                return ma(f, function(f) {
                    return t(a, O(f))
                })
            }

            function Wf(a, f) {
                if (!a ||
                    !a.length) return [];
                var c = Je(a);
                return null == f ? c : t(c, function(a) {
                    return m(f, u, a)
                })
            }

            function Xf(a) {
                a = p(a);
                a.__chain__ = !0;
                return a
            }

            function Wd(a, f) {
                return f(a)
            }

            function Tg() {
                return this
            }

            function Yf(a, f) {
                return (X(a) ? b : vc)(a, S(f, 3))
            }

            function Zf(a, f) {
                return (X(a) ? h : $f)(a, S(f, 3))
            }

            function Xd(a, f) {
                return (X(a) ? t : La)(a, S(f, 3))
            }

            function ag(a, f, c) {
                f = c ? u : f;
                f = a && null == f ? a.length : f;
                return gc(a, 128, u, u, u, u, f)
            }

            function bg(a, f) {
                var c;
                if ("function" != typeof f) throw new yb("Expected a function");
                a = Y(a);
                return function() {
                    0 <
                        --a && (c = f.apply(this, arguments));
                    1 >= a && (f = u);
                    return c
                }
            }

            function cg(a, f, c) {
                f = c ? u : f;
                a = gc(a, 8, u, u, u, u, u, f);
                a.placeholder = cg.placeholder;
                return a
            }

            function dg(a, f, c) {
                f = c ? u : f;
                a = gc(a, 16, u, u, u, u, u, f);
                a.placeholder = dg.placeholder;
                return a
            }

            function eg(a, f, c) {
                function b(f) {
                    var c = v,
                        e = g;
                    v = g = u;
                    H = f;
                    return z = a.apply(e, c)
                }

                function e(a) {
                    var c = a - m;
                    a -= H;
                    return m === u || c >= f || 0 > c || n && a >= k
                }

                function d() {
                    var a = Yd();
                    if (e(a)) return q(a);
                    var c = qd,
                        b;
                    b = a - H;
                    a = f - (a - m);
                    b = n ? Wa(a, k - b) : a;
                    l = c(d, b)
                }

                function q(a) {
                    l = u;
                    if (p && v) return b(a);
                    v = g = u;
                    return z
                }

                function h() {
                    var a = Yd(),
                        c = e(a);
                    v = arguments;
                    g = this;
                    m = a;
                    if (c) {
                        if (l === u) return H = a = m, l = qd(d, f), N ? b(a) : z;
                        if (n) return l = qd(d, f), b(m)
                    }
                    l === u && (l = qd(d, f));
                    return z
                }
                var v, g, k, z, l, m, H = 0,
                    N = !1,
                    n = !1,
                    p = !0;
                if ("function" != typeof a) throw new yb("Expected a function");
                f = Ab(f) || 0;
                ra(c) && (N = !!c.leading, k = (n = "maxWait" in c) ? Oa(Ab(c.maxWait) || 0, f) : k, p = "trailing" in c ? !!c.trailing : p);
                h.cancel = function() {
                    l !== u && Ug(l);
                    H = 0;
                    v = m = g = l = u
                };
                h.flush = function() {
                    return l === u ? z : q(Yd())
                };
                return h
            }

            function Zd(a, f) {
                if ("function" !=
                    typeof a || null != f && "function" != typeof f) throw new yb("Expected a function");
                var c = function() {
                    var b = arguments,
                        e = f ? f.apply(this, b) : b[0],
                        d = c.cache;
                    if (d.has(e)) return d.get(e);
                    b = a.apply(this, b);
                    c.cache = d.set(e, b) || d;
                    return b
                };
                c.cache = new(Zd.Cache || Ha);
                return c
            }

            function $d(a) {
                if ("function" != typeof a) throw new yb("Expected a function");
                return function() {
                    var f = arguments;
                    switch (f.length) {
                        case 0:
                            return !a.call(this);
                        case 1:
                            return !a.call(this, f[0]);
                        case 2:
                            return !a.call(this, f[0], f[1]);
                        case 3:
                            return !a.call(this,
                                f[0], f[1], f[2])
                    }
                    return !a.apply(this, f)
                }
            }

            function Qb(a, f) {
                return a === f || a !== a && f !== f
            }

            function bb(a) {
                return null != a && Kd(a.length) && !dc(a)
            }

            function Ea(a) {
                return Da(a) && bb(a)
            }

            function Ke(a) {
                if (!Da(a)) return !1;
                var f = Ma(a);
                return "[object Error]" == f || "[object DOMException]" == f || "string" == typeof a.message && "string" == typeof a.name && !Ld(a)
            }

            function dc(a) {
                if (!ra(a)) return !1;
                a = Ma(a);
                return "[object Function]" == a || "[object GeneratorFunction]" == a || "[object AsyncFunction]" == a || "[object Proxy]" == a
            }

            function fg(a) {
                return "number" ==
                    typeof a && a == Y(a)
            }

            function Kd(a) {
                return "number" == typeof a && -1 < a && 0 == a % 1 && 9007199254740991 >= a
            }

            function ra(a) {
                var f = typeof a;
                return null != a && ("object" == f || "function" == f)
            }

            function Da(a) {
                return null != a && "object" == typeof a
            }

            function gg(a) {
                return "number" == typeof a || Da(a) && "[object Number]" == Ma(a)
            }

            function Ld(a) {
                if (!Da(a) || "[object Object]" != Ma(a)) return !1;
                a = Ud(a);
                if (null === a) return !0;
                a = qa.call(a, "constructor") && a.constructor;
                return "function" == typeof a && a instanceof a && Vd.call(a) == Vg
            }

            function ae(a) {
                return "string" ==
                    typeof a || !X(a) && Da(a) && "[object String]" == Ma(a)
            }

            function nb(a) {
                return "symbol" == typeof a || Da(a) && "[object Symbol]" == Ma(a)
            }

            function hg(a) {
                if (!a) return [];
                if (bb(a)) return ae(a) ? Ka(a) : Ya(a);
                if (ud && a[ud]) {
                    a = a[ud]();
                    for (var f, c = []; !(f = a.next()).done;) c.push(f.value);
                    return c
                }
                f = Va(a);
                return ("[object Map]" == f ? ga : "[object Set]" == f ? sb : Zc)(a)
            }

            function fc(a) {
                if (!a) return 0 === a ? a : 0;
                a = Ab(a);
                return a === Pa || a === -Pa ? 1.7976931348623157E308 * (0 > a ? -1 : 1) : a === a ? a : 0
            }

            function Y(a) {
                a = fc(a);
                var f = a % 1;
                return a === a ? f ? a - f : a : 0
            }

            function ig(a) {
                return a ? Ia(Y(a), 0, 4294967295) : 0
            }

            function Ab(a) {
                if ("number" == typeof a) return a;
                if (nb(a)) return gb;
                ra(a) && (a = "function" == typeof a.valueOf ? a.valueOf() : a, a = ra(a) ? a + "" : a);
                if ("string" != typeof a) return 0 === a ? a : +a;
                a = a.replace(Qa, "");
                var f = Sc.test(a);
                return f || ld.test(a) ? Vc(a.slice(2), f ? 2 : 8) : pb.test(a) ? gb : +a
            }

            function zf(a) {
                return Mb(a, mb(a))
            }

            function ia(a) {
                return null == a ? "" : hb(a)
            }

            function we(a, f, c) {
                a = null == a ? u : Kb(a, f);
                return a === u ? c : a
            }

            function Be(a, f) {
                return null != a && Of(a, f, Ec)
            }

            function Ja(a) {
                return bb(a) ?
                    Db(a) : me(a)
            }

            function mb(a) {
                if (bb(a)) a = Db(a, !0);
                else if (ra(a)) {
                    var f = rd(a),
                        c = [],
                        b;
                    for (b in a)("constructor" != b || !f && qa.call(a, b)) && c.push(b);
                    a = c
                } else {
                    b = [];
                    if (null != a)
                        for (f in sa(a)) b.push(f);
                    a = b
                }
                return a
            }

            function jg(a, f) {
                if (null == a) return {};
                var c = t(xe(a), function(a) {
                    return [a]
                });
                f = S(f);
                return ef(a, c, function(a, c) {
                    return f(a, c[0])
                })
            }

            function Zc(a) {
                return null == a ? [] : Ba(a, Ja(a))
            }

            function kg(a) {
                return Le(ia(a).toLowerCase())
            }

            function Hf(a) {
                return (a = ia(a)) && a.replace(tb, ac).replace(Cc, "")
            }

            function Gf(a,
                f, c) {
                a = ia(a);
                f = c ? u : f;
                return f === u ? Uc.test(a) ? a.match(Tc) || [] : a.match(fd) || [] : a.match(f) || []
            }

            function Me(a) {
                return function() {
                    return a
                }
            }

            function ab(a) {
                return a
            }

            function He(a) {
                return Ra("function" == typeof a ? a : e(a, 1))
            }

            function Ne(a, f, c) {
                var e = Ja(f),
                    d = yc(f, e);
                null != c || ra(f) && (d.length || !e.length) || (c = f, f = a, a = this, d = yc(f, Ja(f)));
                var q = !(ra(c) && "chain" in c) || !!c.chain,
                    h = dc(a);
                b(d, function(c) {
                    var b = f[c];
                    a[c] = b;
                    h && (a.prototype[c] = function() {
                        var f = this.__chain__;
                        if (q || f) {
                            var c = a(this.__wrapped__);
                            (c.__actions__ =
                                Ya(this.__actions__)).push({
                                func: b,
                                args: arguments,
                                thisArg: a
                            });
                            c.__chain__ = f;
                            return c
                        }
                        return b.apply(a, D([this.value()], arguments))
                    })
                });
                return a
            }

            function Oe() {}

            function xf(a) {
                return Ae(a) ? O(Rb(a)) : Cg(a)
            }

            function Pe() {
                return []
            }

            function Qe() {
                return !1
            }
            Q = null == Q ? fa : Ua.defaults(fa.Object(), Q, Ua.pick(fa, za));
            var Na = Q.Array,
                be = Q.Date,
                lg = Q.Error,
                mg = Q.Function,
                bd = Q.Math,
                sa = Q.Object,
                Re = Q.RegExp,
                Gg = Q.String,
                yb = Q.TypeError,
                ce = Na.prototype,
                pd = sa.prototype,
                de = Q["__core-js_shared__"],
                Vd = mg.prototype.toString,
                qa =
                pd.hasOwnProperty,
                Wg = 0,
                wf = function() {
                    var a = /[^.]+$/.exec(de && de.keys && de.keys.IE_PROTO || "");
                    return a ? "Symbol(src)_1." + a : ""
                }(),
                uf = pd.toString,
                Vg = Vd.call(sa),
                Xg = fa._,
                Mg = Re("^" + Vd.call(qa).replace(Ac, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"),
                ee = Cb ? Q.Buffer : u,
                wc = Q.Symbol,
                Od = Q.Uint8Array,
                Ef = ee ? ee.allocUnsafe : u,
                Ud = rb(sa.getPrototypeOf, sa),
                ng = sa.create,
                Yg = pd.propertyIsEnumerable,
                Md = ce.splice,
                Pf = wc ? wc.isConcatSpreadable : u,
                ud = wc ? wc.iterator : u,
                Hc = wc ? wc.toStringTag :
                u,
                Jd = function() {
                    try {
                        var a = Jc(sa, "defineProperty");
                        a({}, "", {});
                        return a
                    } catch (f) {}
                }(),
                Zg = Q.clearTimeout !== fa.clearTimeout && Q.clearTimeout,
                $g = be && be.now !== fa.Date.now && be.now,
                ah = Q.setTimeout !== fa.setTimeout && Q.setTimeout,
                Rd = bd.ceil,
                Nd = bd.floor,
                Se = sa.getOwnPropertySymbols,
                bh = ee ? ee.isBuffer : u,
                ch = Q.isFinite,
                dh = ce.join,
                Ng = rb(sa.keys, sa),
                Oa = bd.max,
                Wa = bd.min,
                Rg = be.now,
                eh = Q.parseInt,
                Af = bd.random,
                Sg = ce.reverse,
                Te = Jc(Q, "DataView"),
                vd = Jc(Q, "Map"),
                Ue = Jc(Q, "Promise"),
                cd = Jc(Q, "Set"),
                wd = Jc(Q, "WeakMap"),
                xd = Jc(sa,
                    "create"),
                fe = wd && new wd,
                td = {},
                fh = Ic(Te),
                gh = Ic(vd),
                hh = Ic(Ue),
                ih = Ic(cd),
                jh = Ic(wd),
                ge = wc ? wc.prototype : u,
                sd = ge ? ge.valueOf : u,
                Cf = ge ? ge.toString : u,
                $c = function() {
                    function a() {}
                    return function(f) {
                        if (!ra(f)) return {};
                        if (ng) return ng(f);
                        a.prototype = f;
                        f = new a;
                        a.prototype = u;
                        return f
                    }
                }();
            p.templateSettings = {
                escape: gd,
                evaluate: oa,
                interpolate: I,
                variable: "",
                imports: {
                    _: p
                }
            };
            p.prototype = ea.prototype;
            p.prototype.constructor = p;
            U.prototype = $c(ea.prototype);
            U.prototype.constructor = U;
            M.prototype = $c(ea.prototype);
            M.prototype.constructor =
                M;
            ca.prototype.clear = function() {
                this.__data__ = xd ? xd(null) : {};
                this.size = 0
            };
            ca.prototype["delete"] = function(a) {
                a = this.has(a) && delete this.__data__[a];
                this.size -= a ? 1 : 0;
                return a
            };
            ca.prototype.get = function(a) {
                var f = this.__data__;
                return xd ? (a = f[a], "__lodash_hash_undefined__" === a ? u : a) : qa.call(f, a) ? f[a] : u
            };
            ca.prototype.has = function(a) {
                var f = this.__data__;
                return xd ? f[a] !== u : qa.call(f, a)
            };
            ca.prototype.set = function(a, f) {
                var c = this.__data__;
                this.size += this.has(a) ? 0 : 1;
                c[a] = xd && f === u ? "__lodash_hash_undefined__" :
                    f;
                return this
            };
            da.prototype.clear = function() {
                this.__data__ = [];
                this.size = 0
            };
            da.prototype["delete"] = function(a) {
                var f = this.__data__;
                a = xb(f, a);
                if (0 > a) return !1;
                a == f.length - 1 ? f.pop() : Md.call(f, a, 1);
                --this.size;
                return !0
            };
            da.prototype.get = function(a) {
                var f = this.__data__;
                a = xb(f, a);
                return 0 > a ? u : f[a][1]
            };
            da.prototype.has = function(a) {
                return -1 < xb(this.__data__, a)
            };
            da.prototype.set = function(a, f) {
                var c = this.__data__,
                    b = xb(c, a);
                0 > b ? (++this.size, c.push([a, f])) : c[b][1] = f;
                return this
            };
            Ha.prototype.clear = function() {
                this.size =
                    0;
                this.__data__ = {
                    hash: new ca,
                    map: new(vd || da),
                    string: new ca
                }
            };
            Ha.prototype["delete"] = function(a) {
                a = Td(this, a)["delete"](a);
                this.size -= a ? 1 : 0;
                return a
            };
            Ha.prototype.get = function(a) {
                return Td(this, a).get(a)
            };
            Ha.prototype.has = function(a) {
                return Td(this, a).has(a)
            };
            Ha.prototype.set = function(a, f) {
                var c = Td(this, a),
                    b = c.size;
                c.set(a, f);
                this.size += c.size == b ? 0 : 1;
                return this
            };
            va.prototype.add = va.prototype.push = function(a) {
                this.__data__.set(a, "__lodash_hash_undefined__");
                return this
            };
            va.prototype.has = function(a) {
                return this.__data__.has(a)
            };
            pa.prototype.clear = function() {
                this.__data__ = new da;
                this.size = 0
            };
            pa.prototype["delete"] = function(a) {
                var f = this.__data__;
                a = f["delete"](a);
                this.size = f.size;
                return a
            };
            pa.prototype.get = function(a) {
                return this.__data__.get(a)
            };
            pa.prototype.has = function(a) {
                return this.__data__.has(a)
            };
            pa.prototype.set = function(a, f) {
                var c = this.__data__;
                if (c instanceof da) {
                    var b = c.__data__;
                    if (!vd || 199 > b.length) return b.push([a, f]), this.size = ++c.size, this;
                    c = this.__data__ = new Ha(b)
                }
                c.set(a, f);
                this.size = c.size;
                return this
            };
            var vc =
                $e(qb),
                $f = $e($b, !0),
                ye = df(),
                tf = df(!0),
                Mf = fe ? function(a, f) {
                    fe.set(a, f);
                    return a
                } : ab,
                kh = Jd ? function(a, f) {
                    return Jd(a, "toString", {
                        configurable: !0,
                        enumerable: !1,
                        value: Me(f),
                        writable: !0
                    })
                } : ab,
                Ug = Zg || function(a) {
                    return fa.clearTimeout(a)
                },
                Og = cd && 1 / sb(new cd([, -0]))[1] == Pa ? function(a) {
                    return new cd(a)
                } : Oe,
                Ee = fe ? function(a) {
                    return fe.get(a)
                } : Oe,
                De = Se ? rb(Se, sa) : Pe,
                Ff = Se ? function(a) {
                    for (var f = []; a;) D(f, De(a)), a = Ud(a);
                    return f
                } : Pe,
                Va = Ma;
            if (Te && "[object DataView]" != Va(new Te(new ArrayBuffer(1))) || vd && "[object Map]" !=
                Va(new vd) || Ue && "[object Promise]" != Va(Ue.resolve()) || cd && "[object Set]" != Va(new cd) || wd && "[object WeakMap]" != Va(new wd)) Va = function(a) {
                var f = Ma(a);
                if (a = (a = "[object Object]" == f ? a.constructor : u) ? Ic(a) : "") switch (a) {
                    case fh:
                        return "[object DataView]";
                    case gh:
                        return "[object Map]";
                    case hh:
                        return "[object Promise]";
                    case ih:
                        return "[object Set]";
                    case jh:
                        return "[object WeakMap]"
                }
                return f
            };
            var lh = de ? dc : Qe,
                Jf = Rf(Mf),
                qd = ah || function(a, f) {
                    return fa.setTimeout(a, f)
                },
                Ce = Rf(kh),
                Df = function(a) {
                    a = Zd(a, function(a) {
                        500 ===
                            f.size && f.clear();
                        return a
                    });
                    var f = a.cache;
                    return a
                }(function(a) {
                    var f = [];
                    rc.test(a) && f.push("");
                    a.replace(jd, function(a, c, b, e) {
                        f.push(b ? e.replace(ed, "$1") : c || a)
                    });
                    return f
                }),
                mh = W(function(a, f) {
                    return Ea(a) ? Tb(a, wa(f, 1, Ea, !0)) : []
                }),
                nh = W(function(a, f) {
                    var c = zb(f);
                    Ea(c) && (c = u);
                    return Ea(a) ? Tb(a, wa(f, 1, Ea, !0), S(c, 2)) : []
                }),
                oh = W(function(a, f) {
                    var c = zb(f);
                    Ea(c) && (c = u);
                    return Ea(a) ? Tb(a, wa(f, 1, Ea, !0), u, c) : []
                }),
                ph = W(function(a) {
                    var f = t(a, te);
                    return f.length && f[0] === a[0] ? zc(f) : []
                }),
                qh = W(function(a) {
                    var f =
                        zb(a),
                        c = t(a, te);
                    f === zb(c) ? f = u : c.pop();
                    return c.length && c[0] === a[0] ? zc(c, S(f, 2)) : []
                }),
                rh = W(function(a) {
                    var f = zb(a),
                        c = t(a, te);
                    (f = "function" == typeof f ? f : u) && c.pop();
                    return c.length && c[0] === a[0] ? zc(c, u, f) : []
                }),
                sh = W(Vf),
                th = ec(function(a, f) {
                    var c = null == a ? 0 : a.length,
                        b = lb(a, f);
                    id(a, t(f, function(a) {
                        return cc(a, c) ? +a : a
                    }).sort(qf));
                    return b
                }),
                uh = W(function(a) {
                    return qc(wa(a, 1, Ea, !0))
                }),
                vh = W(function(a) {
                    var f = zb(a);
                    Ea(f) && (f = u);
                    return qc(wa(a, 1, Ea, !0), S(f, 2))
                }),
                wh = W(function(a) {
                    var f = zb(a),
                        f = "function" == typeof f ?
                        f : u;
                    return qc(wa(a, 1, Ea, !0), u, f)
                }),
                xh = W(function(a, f) {
                    return Ea(a) ? Tb(a, f) : []
                }),
                yh = W(function(a) {
                    return se(l(a, Ea))
                }),
                zh = W(function(a) {
                    var f = zb(a);
                    Ea(f) && (f = u);
                    return se(l(a, Ea), S(f, 2))
                }),
                Ah = W(function(a) {
                    var f = zb(a),
                        f = "function" == typeof f ? f : u;
                    return se(l(a, Ea), u, f)
                }),
                Bh = W(Je),
                Ch = W(function(a) {
                    var f = a.length,
                        f = 1 < f ? a[f - 1] : u,
                        f = "function" == typeof f ? (a.pop(), f) : u;
                    return Wf(a, f)
                }),
                Dh = ec(function(a) {
                    var f = a.length,
                        c = f ? a[0] : 0,
                        b = this.__wrapped__,
                        e = function(f) {
                            return lb(f, a)
                        };
                    if (1 < f || this.__actions__.length ||
                        !(b instanceof M) || !cc(c)) return this.thru(e);
                    b = b.slice(c, +c + (f ? 1 : 0));
                    b.__actions__.push({
                        func: Wd,
                        args: [e],
                        thisArg: u
                    });
                    return (new U(b, this.__chain__)).thru(function(a) {
                        f && !a.length && a.push(u);
                        return a
                    })
                }),
                Eh = zd(function(a, f, c) {
                    qa.call(a, c) ? ++a[c] : $a(a, c, 1)
                }),
                Fh = gf(Sf),
                Gh = gf(Tf),
                Hh = zd(function(a, f, c) {
                    qa.call(a, c) ? a[c].push(f) : $a(a, c, [f])
                }),
                Ih = W(function(a, f, c) {
                    var b = -1,
                        e = "function" == typeof f,
                        d = bb(a) ? Na(a.length) : [];
                    vc(a, function(a) {
                        d[++b] = e ? m(f, a, c) : nc(a, f, c)
                    });
                    return d
                }),
                Jh = zd(function(a, f, c) {
                    $a(a,
                        c, f)
                }),
                Kh = zd(function(a, f, c) {
                    a[c ? 0 : 1].push(f)
                }, function() {
                    return [
                        [],
                        []
                    ]
                }),
                Lh = W(function(a, f) {
                    if (null == a) return [];
                    var c = f.length;
                    1 < c && cb(a, f[0], f[1]) ? f = [] : 2 < c && cb(f[0], f[1], f[2]) && (f = [f[0]]);
                    return af(a, wa(f, 1), [])
                }),
                Yd = $g || function() {
                    return fa.Date.now()
                },
                Ve = W(function(a, f, c) {
                    var b = 1;
                    if (c.length) var e = ka(c, ad(Ve)),
                        b = b | 32;
                    return gc(a, b, f, c, e)
                }),
                og = W(function(a, f, c) {
                    var b = 3;
                    if (c.length) var e = ka(c, ad(og)),
                        b = b | 32;
                    return gc(f, b, a, c, e)
                }),
                Mh = W(function(a, f) {
                    return Ta(a, 1, f)
                }),
                Nh = W(function(a, f, c) {
                    return Ta(a,
                        Ab(f) || 0, c)
                });
            Zd.Cache = Ha;
            var Oh = W(function(a, f) {
                    f = 1 == f.length && X(f[0]) ? t(f[0], R(S())) : t(wa(f, 1), R(S()));
                    var c = f.length;
                    return W(function(b) {
                        for (var e = -1, d = Wa(b.length, c); ++e < d;) b[e] = f[e].call(this, b[e]);
                        return m(a, this, b)
                    })
                }),
                We = W(function(a, f) {
                    var c = ka(f, ad(We));
                    return gc(a, 32, u, f, c)
                }),
                pg = W(function(a, f) {
                    var c = ka(f, ad(pg));
                    return gc(a, 64, u, f, c)
                }),
                Ph = ec(function(a, f) {
                    return gc(a, 256, u, u, u, f)
                }),
                Qh = Sd(pc),
                Rh = Sd(function(a, f) {
                    return a >= f
                }),
                Gc = Bd(function() {
                    return arguments
                }()) ? Bd : function(a) {
                    return Da(a) &&
                        qa.call(a, "callee") && !Yg.call(a, "callee")
                },
                X = Na.isArray,
                Sh = Fb ? R(Fb) : le,
                uc = bh || Qe,
                Th = Dc ? R(Dc) : f,
                Uh = Jb ? R(Jb) : v,
                Xe = eb ? R(eb) : H,
                Vh = jb ? R(jb) : Za,
                Yc = Fa ? R(Fa) : Xb,
                Wh = Sd(je),
                Xh = Sd(function(a, f) {
                    return a <= f
                }),
                Yh = Nc(function(a, f) {
                    if (rd(f) || bb(f)) Mb(f, Ja(f), a);
                    else
                        for (var c in f) qa.call(f, c) && bc(a, c, f[c])
                }),
                qg = Nc(function(a, f) {
                    Mb(f, mb(f), a)
                }),
                yd = Nc(function(a, f, c, b) {
                    Mb(f, mb(f), a, b)
                }),
                Zh = Nc(function(a, f, c, b) {
                    Mb(f, Ja(f), a, b)
                }),
                $h = ec(lb),
                ai = W(function(a) {
                    a.push(u, kb);
                    return m(yd, u, a)
                }),
                bi = W(function(a) {
                    a.push(u,
                        Qf);
                    return m(rg, u, a)
                }),
                ci = jf(function(a, f, c) {
                    a[f] = c
                }, Me(ab)),
                di = jf(function(a, f, c) {
                    qa.call(a, f) ? a[f].push(c) : a[f] = [c]
                }, S),
                ei = W(nc),
                fi = Nc(function(a, f, c) {
                    Ad(a, f, c)
                }),
                rg = Nc(function(a, f, c, b) {
                    Ad(a, f, c, b)
                }),
                gi = ec(function(a, f) {
                    var c = {};
                    if (null == a) return c;
                    var b = !1;
                    f = t(f, function(f) {
                        f = mc(f, a);
                        b || (b = 1 < f.length);
                        return f
                    });
                    Mb(a, xe(a), c);
                    b && (c = e(c, 7));
                    for (var d = f.length; d--;) re(c, f[d]);
                    return c
                }),
                hi = ec(function(a, f) {
                    return null == a ? {} : zg(a, f)
                }),
                sg = Lf(Ja),
                tg = Lf(mb),
                ii = Rc(function(a, f, c) {
                    f = f.toLowerCase();
                    return a +
                        (c ? kg(f) : f)
                }),
                ji = Rc(function(a, f, c) {
                    return a + (c ? "-" : "") + f.toLowerCase()
                }),
                ki = Rc(function(a, f, c) {
                    return a + (c ? " " : "") + f.toLowerCase()
                }),
                li = ff("toLowerCase"),
                mi = Rc(function(a, f, c) {
                    return a + (c ? "_" : "") + f.toLowerCase()
                }),
                ni = Rc(function(a, f, c) {
                    return a + (c ? " " : "") + Le(f)
                }),
                oi = Rc(function(a, f, c) {
                    return a + (c ? " " : "") + f.toUpperCase()
                }),
                Le = ff("toUpperCase"),
                ug = W(function(a, f) {
                    try {
                        return m(a, u, f)
                    } catch (c) {
                        return Ke(c) ? c : new lg(c)
                    }
                }),
                pi = ec(function(a, f) {
                    b(f, function(f) {
                        f = Rb(f);
                        $a(a, f, Ve(a[f], a))
                    });
                    return a
                }),
                qi =
                hf(),
                ri = hf(!0),
                si = W(function(a, f) {
                    return function(c) {
                        return nc(c, a, f)
                    }
                }),
                ti = W(function(a, f) {
                    return function(c) {
                        return nc(a, c, f)
                    }
                }),
                ui = ke(t),
                vi = ke(n),
                wi = ke(J),
                xi = Sb(),
                yi = Sb(!0),
                zi = Dd(function(a, f) {
                    return a + f
                }, 0),
                Ai = Ge("ceil"),
                Bi = Dd(function(a, f) {
                    return a / f
                }, 1),
                Ci = Ge("floor"),
                Di = Dd(function(a, f) {
                    return a * f
                }, 1),
                Ei = Ge("round"),
                Fi = Dd(function(a, f) {
                    return a - f
                }, 0);
            p.after = function(a, f) {
                if ("function" != typeof f) throw new yb("Expected a function");
                a = Y(a);
                return function() {
                    if (1 > --a) return f.apply(this, arguments)
                }
            };
            p.ary = ag;
            p.assign = Yh;
            p.assignIn = qg;
            p.assignInWith = yd;
            p.assignWith = Zh;
            p.at = $h;
            p.before = bg;
            p.bind = Ve;
            p.bindAll = pi;
            p.bindKey = og;
            p.castArray = function() {
                if (!arguments.length) return [];
                var a = arguments[0];
                return X(a) ? a : [a]
            };
            p.chain = Xf;
            p.chunk = function(a, f, c) {
                f = (c ? cb(a, f, c) : f === u) ? 1 : Oa(Y(f), 0);
                c = null == a ? 0 : a.length;
                if (!c || 1 > f) return [];
                for (var b = 0, e = 0, d = Na(Rd(c / f)); b < c;) d[e++] = Ca(a, b, b += f);
                return d
            };
            p.compact = function(a) {
                for (var f = -1, c = null == a ? 0 : a.length, b = 0, e = []; ++f < c;) {
                    var d = a[f];
                    d && (e[b++] = d)
                }
                return e
            };
            p.concat =
                function() {
                    var a = arguments.length;
                    if (!a) return [];
                    for (var f = Na(a - 1), c = arguments[0]; a--;) f[a - 1] = arguments[a];
                    return D(X(c) ? Ya(c) : [c], wa(f, 1))
                };
            p.cond = function(a) {
                var f = null == a ? 0 : a.length,
                    c = S();
                a = f ? t(a, function(a) {
                    if ("function" != typeof a[1]) throw new yb("Expected a function");
                    return [c(a[0]), a[1]]
                }) : [];
                return W(function(c) {
                    for (var b = -1; ++b < f;) {
                        var e = a[b];
                        if (m(e[0], this, c)) return m(e[1], this, c)
                    }
                })
            };
            p.conforms = function(a) {
                return y(e(a, 1))
            };
            p.constant = Me;
            p.countBy = Eh;
            p.create = function(a, f) {
                var c = $c(a);
                return null ==
                    f ? c : Pb(c, f)
            };
            p.curry = cg;
            p.curryRight = dg;
            p.debounce = eg;
            p.defaults = ai;
            p.defaultsDeep = bi;
            p.defer = Mh;
            p.delay = Nh;
            p.difference = mh;
            p.differenceBy = nh;
            p.differenceWith = oh;
            p.drop = function(a, f, c) {
                var b = null == a ? 0 : a.length;
                if (!b) return [];
                f = c || f === u ? 1 : Y(f);
                return Ca(a, 0 > f ? 0 : f, b)
            };
            p.dropRight = function(a, f, c) {
                var b = null == a ? 0 : a.length;
                if (!b) return [];
                f = c || f === u ? 1 : Y(f);
                f = b - f;
                return Ca(a, 0, 0 > f ? 0 : f)
            };
            p.dropRightWhile = function(a, f) {
                return a && a.length ? ha(a, S(f, 3), !0, !0) : []
            };
            p.dropWhile = function(a, f) {
                return a && a.length ?
                    ha(a, S(f, 3), !0) : []
            };
            p.fill = function(a, f, c, b) {
                var e = null == a ? 0 : a.length;
                if (!e) return [];
                c && "number" != typeof c && cb(a, f, c) && (c = 0, b = e);
                e = a.length;
                c = Y(c);
                0 > c && (c = -c > e ? 0 : e + c);
                b = b === u || b > e ? e : Y(b);
                0 > b && (b += e);
                for (b = c > b ? 0 : ig(b); c < b;) a[c++] = f;
                return a
            };
            p.filter = function(a, f) {
                return (X(a) ? l : Vb)(a, S(f, 3))
            };
            p.flatMap = function(a, f) {
                return wa(Xd(a, f), 1)
            };
            p.flatMapDeep = function(a, f) {
                return wa(Xd(a, f), Pa)
            };
            p.flatMapDepth = function(a, f, c) {
                c = c === u ? 1 : Y(c);
                return wa(Xd(a, f), c)
            };
            p.flatten = Nf;
            p.flattenDeep = function(a) {
                return (null ==
                    a ? 0 : a.length) ? wa(a, Pa) : []
            };
            p.flattenDepth = function(a, f) {
                if (null == a || !a.length) return [];
                f = f === u ? 1 : Y(f);
                return wa(a, f)
            };
            p.flip = function(a) {
                return gc(a, 512)
            };
            p.flow = qi;
            p.flowRight = ri;
            p.fromPairs = function(a) {
                for (var f = -1, c = null == a ? 0 : a.length, b = {}; ++f < c;) {
                    var e = a[f];
                    b[e[0]] = e[1]
                }
                return b
            };
            p.functions = function(a) {
                return null == a ? [] : yc(a, Ja(a))
            };
            p.functionsIn = function(a) {
                return null == a ? [] : yc(a, mb(a))
            };
            p.groupBy = Hh;
            p.initial = function(a) {
                return (null == a ? 0 : a.length) ? Ca(a, 0, -1) : []
            };
            p.intersection = ph;
            p.intersectionBy =
                qh;
            p.intersectionWith = rh;
            p.invert = ci;
            p.invertBy = di;
            p.invokeMap = Ih;
            p.iteratee = He;
            p.keyBy = Jh;
            p.keys = Ja;
            p.keysIn = mb;
            p.map = Xd;
            p.mapKeys = function(a, f) {
                var c = {};
                f = S(f, 3);
                qb(a, function(a, b, e) {
                    $a(c, f(a, b, e), a)
                });
                return c
            };
            p.mapValues = function(a, f) {
                var c = {};
                f = S(f, 3);
                qb(a, function(a, b, e) {
                    $a(c, b, f(a, b, e))
                });
                return c
            };
            p.matches = function(a) {
                return lf(e(a, 1))
            };
            p.matchesProperty = function(a, f) {
                return Fd(a, e(f, 1))
            };
            p.memoize = Zd;
            p.merge = fi;
            p.mergeWith = rg;
            p.method = si;
            p.methodOf = ti;
            p.mixin = Ne;
            p.negate = $d;
            p.nthArg = function(a) {
                a =
                    Y(a);
                return W(function(f) {
                    return bf(f, a)
                })
            };
            p.omit = gi;
            p.omitBy = function(a, f) {
                return jg(a, $d(S(f)))
            };
            p.once = function(a) {
                return bg(2, a)
            };
            p.orderBy = function(a, f, c, b) {
                if (null == a) return [];
                X(f) || (f = null == f ? [] : [f]);
                c = b ? u : c;
                X(c) || (c = null == c ? [] : [c]);
                return af(a, f, c)
            };
            p.over = ui;
            p.overArgs = Oh;
            p.overEvery = vi;
            p.overSome = wi;
            p.partial = We;
            p.partialRight = pg;
            p.partition = Kh;
            p.pick = hi;
            p.pickBy = jg;
            p.property = xf;
            p.propertyOf = function(a) {
                return function(f) {
                    return null == a ? u : Kb(a, f)
                }
            };
            p.pull = sh;
            p.pullAll = Vf;
            p.pullAllBy = function(a,
                f, c) {
                return a && a.length && f && f.length ? ne(a, f, S(c, 2)) : a
            };
            p.pullAllWith = function(a, f, c) {
                return a && a.length && f && f.length ? ne(a, f, u, c) : a
            };
            p.pullAt = th;
            p.range = xi;
            p.rangeRight = yi;
            p.rearg = Ph;
            p.reject = function(a, f) {
                return (X(a) ? l : Vb)(a, $d(S(f, 3)))
            };
            p.remove = function(a, f) {
                var c = [];
                if (!a || !a.length) return c;
                var b = -1,
                    e = [],
                    d = a.length;
                for (f = S(f, 3); ++b < d;) {
                    var q = a[b];
                    f(q, b, a) && (c.push(q), e.push(b))
                }
                id(a, e);
                return c
            };
            p.rest = function(a, f) {
                if ("function" != typeof a) throw new yb("Expected a function");
                f = f === u ? f : Y(f);
                return W(a,
                    f)
            };
            p.reverse = Ie;
            p.sampleSize = function(a, f, c) {
                f = (c ? cb(a, f, c) : f === u) ? 1 : Y(f);
                return (X(a) ? vb : Dg)(a, f)
            };
            p.set = function(a, f, c) {
                return null == a ? a : Oc(a, f, c)
            };
            p.setWith = function(a, f, c, b) {
                b = "function" == typeof b ? b : u;
                return null == a ? a : Oc(a, f, c, b)
            };
            p.shuffle = function(a) {
                return (X(a) ? Eb : Eg)(a)
            };
            p.slice = function(a, f, c) {
                var b = null == a ? 0 : a.length;
                if (!b) return [];
                c && "number" != typeof c && cb(a, f, c) ? (f = 0, c = b) : (f = null == f ? 0 : Y(f), c = c === u ? b : Y(c));
                return Ca(a, f, c)
            };
            p.sortBy = Lh;
            p.sortedUniq = function(a) {
                return a && a.length ? mf(a) : []
            };
            p.sortedUniqBy = function(a, f) {
                return a && a.length ? mf(a, S(f, 2)) : []
            };
            p.split = function(a, f, c) {
                c && "number" != typeof c && cb(a, f, c) && (f = c = u);
                c = c === u ? 4294967295 : c >>> 0;
                return c ? (a = ia(a)) && ("string" == typeof f || null != f && !Xe(f)) && (f = hb(f), !f && Bb.test(a)) ? oc(Ka(a), 0, c) : a.split(f, c) : []
            };
            p.spread = function(a, f) {
                if ("function" != typeof a) throw new yb("Expected a function");
                f = f === u ? 0 : Oa(Y(f), 0);
                return W(function(c) {
                    var b = c[f];
                    c = oc(c, 0, f);
                    b && D(c, b);
                    return m(a, this, c)
                })
            };
            p.tail = function(a) {
                var f = null == a ? 0 : a.length;
                return f ?
                    Ca(a, 1, f) : []
            };
            p.take = function(a, f, c) {
                if (!a || !a.length) return [];
                f = c || f === u ? 1 : Y(f);
                return Ca(a, 0, 0 > f ? 0 : f)
            };
            p.takeRight = function(a, f, c) {
                var b = null == a ? 0 : a.length;
                if (!b) return [];
                f = c || f === u ? 1 : Y(f);
                f = b - f;
                return Ca(a, 0 > f ? 0 : f, b)
            };
            p.takeRightWhile = function(a, f) {
                return a && a.length ? ha(a, S(f, 3), !1, !0) : []
            };
            p.takeWhile = function(a, f) {
                return a && a.length ? ha(a, S(f, 3)) : []
            };
            p.tap = function(a, f) {
                f(a);
                return a
            };
            p.throttle = function(a, f, c) {
                var b = !0,
                    e = !0;
                if ("function" != typeof a) throw new yb("Expected a function");
                ra(c) && (b =
                    "leading" in c ? !!c.leading : b, e = "trailing" in c ? !!c.trailing : e);
                return eg(a, f, {
                    leading: b,
                    maxWait: f,
                    trailing: e
                })
            };
            p.thru = Wd;
            p.toArray = hg;
            p.toPairs = sg;
            p.toPairsIn = tg;
            p.toPath = function(a) {
                return X(a) ? t(a, Rb) : nb(a) ? [a] : Ya(Df(ia(a)))
            };
            p.toPlainObject = zf;
            p.transform = function(a, f, c) {
                var e = X(a),
                    d = e || uc(a) || Yc(a);
                f = S(f, 4);
                if (null == c) {
                    var q = a && a.constructor;
                    c = d ? e ? new q : [] : ra(a) ? dc(q) ? $c(Ud(a)) : {} : {}
                }(d ? b : qb)(a, function(a, b, e) {
                    return f(c, a, b, e)
                });
                return c
            };
            p.unary = function(a) {
                return ag(a, 1)
            };
            p.union = uh;
            p.unionBy =
                vh;
            p.unionWith = wh;
            p.uniq = function(a) {
                return a && a.length ? qc(a) : []
            };
            p.uniqBy = function(a, f) {
                return a && a.length ? qc(a, S(f, 2)) : []
            };
            p.uniqWith = function(a, f) {
                f = "function" == typeof f ? f : u;
                return a && a.length ? qc(a, u, f) : []
            };
            p.unset = function(a, f) {
                return null == a ? !0 : re(a, f)
            };
            p.unzip = Je;
            p.unzipWith = Wf;
            p.update = function(a, f, c) {
                null != a && (c = ue(c), a = Oc(a, f, c(Kb(a, f)), void 0));
                return a
            };
            p.updateWith = function(a, f, c, b) {
                b = "function" == typeof b ? b : u;
                null != a && (c = ue(c), a = Oc(a, f, c(Kb(a, f)), b));
                return a
            };
            p.values = Zc;
            p.valuesIn = function(a) {
                return null ==
                    a ? [] : Ba(a, mb(a))
            };
            p.without = xh;
            p.words = Gf;
            p.wrap = function(a, f) {
                return We(ue(f), a)
            };
            p.xor = yh;
            p.xorBy = zh;
            p.xorWith = Ah;
            p.zip = Bh;
            p.zipObject = function(a, f) {
                return of(a || [], f || [], bc)
            };
            p.zipObjectDeep = function(a, f) {
                return of(a || [], f || [], Oc)
            };
            p.zipWith = Ch;
            p.entries = sg;
            p.entriesIn = tg;
            p.extend = qg;
            p.extendWith = yd;
            Ne(p, p);
            p.add = zi;
            p.attempt = ug;
            p.camelCase = ii;
            p.capitalize = kg;
            p.ceil = Ai;
            p.clamp = function(a, f, c) {
                c === u && (c = f, f = u);
                c !== u && (c = Ab(c), c = c === c ? c : 0);
                f !== u && (f = Ab(f), f = f === f ? f : 0);
                return Ia(Ab(a), f, c)
            };
            p.clone =
                function(a) {
                    return e(a, 4)
                };
            p.cloneDeep = function(a) {
                return e(a, 5)
            };
            p.cloneDeepWith = function(a, f) {
                f = "function" == typeof f ? f : u;
                return e(a, 5, f)
            };
            p.cloneWith = function(a, f) {
                f = "function" == typeof f ? f : u;
                return e(a, 4, f)
            };
            p.conformsTo = function(a, f) {
                return null == f || ja(a, f, Ja(f))
            };
            p.deburr = Hf;
            p.defaultTo = function(a, f) {
                return null == a || a !== a ? f : a
            };
            p.divide = Bi;
            p.endsWith = function(a, f, c) {
                a = ia(a);
                f = hb(f);
                var b = a.length,
                    b = c = c === u ? b : Ia(Y(c), 0, b);
                c -= f.length;
                return 0 <= c && a.slice(c, b) == f
            };
            p.eq = Qb;
            p.escape = function(a) {
                return (a =
                    ia(a)) && lc.test(a) ? a.replace(kc, md) : a
            };
            p.escapeRegExp = function(a) {
                return (a = ia(a)) && Nb.test(a) ? a.replace(Ac, "\\$&") : a
            };
            p.every = function(a, f, c) {
                var b = X(a) ? n : Zb;
                c && cb(a, f, c) && (f = u);
                return b(a, S(f, 3))
            };
            p.find = Fh;
            p.findIndex = Sf;
            p.findKey = function(a, f) {
                return B(a, S(f, 3), qb)
            };
            p.findLast = Gh;
            p.findLastIndex = Tf;
            p.findLastKey = function(a, f) {
                return B(a, S(f, 3), $b)
            };
            p.floor = Ci;
            p.forEach = Yf;
            p.forEachRight = Zf;
            p.forIn = function(a, f) {
                return null == a ? a : ye(a, S(f, 3), mb)
            };
            p.forInRight = function(a, f) {
                return null == a ? a : tf(a,
                    S(f, 3), mb)
            };
            p.forOwn = function(a, f) {
                return a && qb(a, S(f, 3))
            };
            p.forOwnRight = function(a, f) {
                return a && $b(a, S(f, 3))
            };
            p.get = we;
            p.gt = Qh;
            p.gte = Rh;
            p.has = function(a, f) {
                return null != a && Of(a, f, Qc)
            };
            p.hasIn = Be;
            p.head = Uf;
            p.identity = ab;
            p.includes = function(a, f, c, b) {
                a = bb(a) ? a : Zc(a);
                c = c && !b ? Y(c) : 0;
                b = a.length;
                0 > c && (c = Oa(b + c, 0));
                return ae(a) ? c <= b && -1 < a.indexOf(f, c) : !!b && -1 < E(a, f, c)
            };
            p.indexOf = function(a, f, c) {
                var b = null == a ? 0 : a.length;
                if (!b) return -1;
                c = null == c ? 0 : Y(c);
                0 > c && (c = Oa(b + c, 0));
                return E(a, f, c)
            };
            p.inRange = function(a,
                f, c) {
                f = fc(f);
                c === u ? (c = f, f = 0) : c = fc(c);
                a = Ab(a);
                return a >= Wa(f, c) && a < Oa(f, c)
            };
            p.invoke = ei;
            p.isArguments = Gc;
            p.isArray = X;
            p.isArrayBuffer = Sh;
            p.isArrayLike = bb;
            p.isArrayLikeObject = Ea;
            p.isBoolean = function(a) {
                return !0 === a || !1 === a || Da(a) && "[object Boolean]" == Ma(a)
            };
            p.isBuffer = uc;
            p.isDate = Th;
            p.isElement = function(a) {
                return Da(a) && 1 === a.nodeType && !Ld(a)
            };
            p.isEmpty = function(a) {
                if (null == a) return !0;
                if (bb(a) && (X(a) || "string" == typeof a || "function" == typeof a.splice || uc(a) || Yc(a) || Gc(a))) return !a.length;
                var f = Va(a);
                if ("[object Map]" ==
                    f || "[object Set]" == f) return !a.size;
                if (rd(a)) return !me(a).length;
                for (var c in a)
                    if (qa.call(a, c)) return !1;
                return !0
            };
            p.isEqual = function(a, f) {
                return q(a, f)
            };
            p.isEqualWith = function(a, f, c) {
                var b = (c = "function" == typeof c ? c : u) ? c(a, f) : u;
                return b === u ? q(a, f, u, c) : !!b
            };
            p.isError = Ke;
            p.isFinite = function(a) {
                return "number" == typeof a && ch(a)
            };
            p.isFunction = dc;
            p.isInteger = fg;
            p.isLength = Kd;
            p.isMap = Uh;
            p.isMatch = function(a, f) {
                return a === f || z(a, f, ze(f))
            };
            p.isMatchWith = function(a, f, c) {
                c = "function" == typeof c ? c : u;
                return z(a,
                    f, ze(f), c)
            };
            p.isNaN = function(a) {
                return gg(a) && a != +a
            };
            p.isNative = function(a) {
                if (lh(a)) throw new lg("Unsupported core-js use. Try https://npms.io/search?q=ponyfill.");
                return N(a)
            };
            p.isNil = function(a) {
                return null == a
            };
            p.isNull = function(a) {
                return null === a
            };
            p.isNumber = gg;
            p.isObject = ra;
            p.isObjectLike = Da;
            p.isPlainObject = Ld;
            p.isRegExp = Xe;
            p.isSafeInteger = function(a) {
                return fg(a) && -9007199254740991 <= a && 9007199254740991 >= a
            };
            p.isSet = Vh;
            p.isString = ae;
            p.isSymbol = nb;
            p.isTypedArray = Yc;
            p.isUndefined = function(a) {
                return a ===
                    u
            };
            p.isWeakMap = function(a) {
                return Da(a) && "[object WeakMap]" == Va(a)
            };
            p.isWeakSet = function(a) {
                return Da(a) && "[object WeakSet]" == Ma(a)
            };
            p.join = function(a, f) {
                return null == a ? "" : dh.call(a, f)
            };
            p.kebabCase = ji;
            p.last = zb;
            p.lastIndexOf = function(a, f, c) {
                var b = null == a ? 0 : a.length;
                if (!b) return -1;
                var e = b;
                c !== u && (e = Y(c), e = 0 > e ? Oa(b + e, 0) : Wa(e, b - 1));
                if (f === f) a: {
                    for (c = e + 1; c--;)
                        if (a[c] === f) {
                            a = c;
                            break a
                        }
                    a = c
                }
                else a = A(a, K, e, !0);
                return a
            };
            p.lowerCase = ki;
            p.lowerFirst = li;
            p.lt = Wh;
            p.lte = Xh;
            p.max = function(a) {
                return a && a.length ?
                    xc(a, ab, pc) : u
            };
            p.maxBy = function(a, f) {
                return a && a.length ? xc(a, S(f, 2), pc) : u
            };
            p.mean = function(a) {
                return V(a, ab)
            };
            p.meanBy = function(a, f) {
                return V(a, S(f, 2))
            };
            p.min = function(a) {
                return a && a.length ? xc(a, ab, je) : u
            };
            p.minBy = function(a, f) {
                return a && a.length ? xc(a, S(f, 2), je) : u
            };
            p.stubArray = Pe;
            p.stubFalse = Qe;
            p.stubObject = function() {
                return {}
            };
            p.stubString = function() {
                return ""
            };
            p.stubTrue = function() {
                return !0
            };
            p.multiply = Di;
            p.nth = function(a, f) {
                return a && a.length ? bf(a, Y(f)) : u
            };
            p.noConflict = function() {
                fa._ === this && (fa._ =
                    Xg);
                return this
            };
            p.noop = Oe;
            p.now = Yd;
            p.pad = function(a, f, c) {
                a = ia(a);
                var b = (f = Y(f)) ? xa(a) : 0;
                if (!f || b >= f) return a;
                f = (f - b) / 2;
                return Qd(Nd(f), c) + a + Qd(Rd(f), c)
            };
            p.padEnd = function(a, f, c) {
                a = ia(a);
                var b = (f = Y(f)) ? xa(a) : 0;
                return f && b < f ? a + Qd(f - b, c) : a
            };
            p.padStart = function(a, f, c) {
                a = ia(a);
                var b = (f = Y(f)) ? xa(a) : 0;
                return f && b < f ? Qd(f - b, c) + a : a
            };
            p.parseInt = function(a, f, c) {
                c || null == f ? f = 0 : f && (f = +f);
                return eh(ia(a).replace(hc, ""), f || 0)
            };
            p.random = function(a, f, c) {
                c && "boolean" != typeof c && cb(a, f, c) && (f = c = u);
                c === u && ("boolean" ==
                    typeof f ? (c = f, f = u) : "boolean" == typeof a && (c = a, a = u));
                a === u && f === u ? (a = 0, f = 1) : (a = fc(a), f === u ? (f = a, a = 0) : f = fc(f));
                if (a > f) {
                    var b = a;
                    a = f;
                    f = b
                }
                return c || a % 1 || f % 1 ? (c = Af(), Wa(a + c * (f - a + Ub("1e-" + ((c + "").length - 1))), f)) : oe(a, f)
            };
            p.reduce = function(a, f, c) {
                var b = X(a) ? x : la,
                    e = 3 > arguments.length;
                return b(a, S(f, 4), c, e, vc)
            };
            p.reduceRight = function(a, f, c) {
                var b = X(a) ? G : la,
                    e = 3 > arguments.length;
                return b(a, S(f, 4), c, e, $f)
            };
            p.repeat = function(a, f, c) {
                f = (c ? cb(a, f, c) : f === u) ? 1 : Y(f);
                return pe(ia(a), f)
            };
            p.replace = function() {
                var a = arguments,
                    f = ia(a[0]);
                return 3 > a.length ? f : f.replace(a[1], a[2])
            };
            p.result = function(a, f, c) {
                f = mc(f, a);
                var b = -1,
                    e = f.length;
                e || (e = 1, a = u);
                for (; ++b < e;) {
                    var d = null == a ? u : a[Rb(f[b])];
                    d === u && (b = e, d = c);
                    a = dc(d) ? d.call(a) : d
                }
                return a
            };
            p.round = Ei;
            p.runInContext = Ga;
            p.sample = function(a) {
                return (X(a) ? ob : Bg)(a)
            };
            p.size = function(a) {
                if (null == a) return 0;
                if (bb(a)) return ae(a) ? xa(a) : a.length;
                var f = Va(a);
                return "[object Map]" == f || "[object Set]" == f ? a.size : me(a).length
            };
            p.snakeCase = mi;
            p.some = function(a, f, c) {
                var b = X(a) ? J : Fg;
                c && cb(a, f, c) &&
                    (f = u);
                return b(a, S(f, 3))
            };
            p.sortedIndex = function(a, f) {
                return Gd(a, f)
            };
            p.sortedIndexBy = function(a, f, c) {
                return qe(a, f, S(c, 2))
            };
            p.sortedIndexOf = function(a, f) {
                var c = null == a ? 0 : a.length;
                if (c) {
                    var b = Gd(a, f);
                    if (b < c && Qb(a[b], f)) return b
                }
                return -1
            };
            p.sortedLastIndex = function(a, f) {
                return Gd(a, f, !0)
            };
            p.sortedLastIndexBy = function(a, f, c) {
                return qe(a, f, S(c, 2), !0)
            };
            p.sortedLastIndexOf = function(a, f) {
                if (null == a ? 0 : a.length) {
                    var c = Gd(a, f, !0) - 1;
                    if (Qb(a[c], f)) return c
                }
                return -1
            };
            p.startCase = ni;
            p.startsWith = function(a, f,
                c) {
                a = ia(a);
                c = Ia(Y(c), 0, a.length);
                f = hb(f);
                return a.slice(c, c + f.length) == f
            };
            p.subtract = Fi;
            p.sum = function(a) {
                return a && a.length ? L(a, ab) : 0
            };
            p.sumBy = function(a, f) {
                return a && a.length ? L(a, S(f, 2)) : 0
            };
            p.template = function(a, f, c) {
                var b = p.templateSettings;
                c && cb(a, f, c) && (f = u);
                a = ia(a);
                f = yd({}, f, b, kb);
                c = yd({}, f.imports, b.imports, kb);
                var e = Ja(c),
                    d = Ba(c, e),
                    q, h, v = 0;
                c = f.interpolate || ib;
                var g = "__p += '";
                c = Re((f.escape || ib).source + "|" + c.source + "|" + (c === I ? Sa : ib).source + "|" + (f.evaluate || ib).source + "|$", "g");
                var k = "//# sourceURL=" +
                    ("sourceURL" in f ? f.sourceURL : "lodash.templateSources[" + ++ic + "]") + "\n";
                a.replace(c, function(f, c, b, e, d, k) {
                    b || (b = e);
                    g += a.slice(v, k).replace(ub, Wb);
                    c && (q = !0, g += "' +\n__e(" + c + ") +\n'");
                    d && (h = !0, g += "';\n" + d + ";\n__p += '");
                    b && (g += "' +\n((__t = (" + b + ")) == null ? '' : __t) +\n'");
                    v = k + f.length;
                    return f
                });
                g += "';\n";
                (f = f.variable) || (g = "with (obj) {\n" + g + "\n}\n");
                g = (h ? g.replace(jc, "") : g).replace(aa, "$1").replace(P, "$1;");
                g = "function(" + (f || "obj") + ") {\n" + (f ? "" : "obj || (obj = {});\n") + "var __t, __p = ''" + (q ? ", __e = _.escape" :
                    "") + (h ? ", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n" : ";\n") + g + "return __p\n}";
                f = ug(function() {
                    return mg(e, k + "return " + g).apply(u, d)
                });
                f.source = g;
                if (Ke(f)) throw f;
                return f
            };
            p.times = function(a, f) {
                a = Y(a);
                if (1 > a || 9007199254740991 < a) return [];
                var c = 4294967295,
                    b = Wa(a, 4294967295);
                f = S(f);
                a -= 4294967295;
                for (b = ma(b, f); ++c < a;) f(c);
                return b
            };
            p.toFinite = fc;
            p.toInteger = Y;
            p.toLength = ig;
            p.toLower = function(a) {
                return ia(a).toLowerCase()
            };
            p.toNumber = Ab;
            p.toSafeInteger = function(a) {
                return Ia(Y(a), -9007199254740991, 9007199254740991)
            };
            p.toString = ia;
            p.toUpper = function(a) {
                return ia(a).toUpperCase()
            };
            p.trim = function(a, f, c) {
                if ((a = ia(a)) && (c || f === u)) return a.replace(Qa, "");
                if (!a || !(f = hb(f))) return a;
                a = Ka(a);
                c = Ka(f);
                f = fb(a, c);
                c = Ib(a, c) + 1;
                return oc(a, f, c).join("")
            };
            p.trimEnd = function(a, f, c) {
                if ((a = ia(a)) && (c || f === u)) return a.replace(sc, "");
                if (!a || !(f = hb(f))) return a;
                a = Ka(a);
                f = Ib(a, Ka(f)) + 1;
                return oc(a, 0, f).join("")
            };
            p.trimStart = function(a, f, c) {
                if ((a = ia(a)) && (c || f === u)) return a.replace(hc, "");
                if (!a ||
                    !(f = hb(f))) return a;
                a = Ka(a);
                f = fb(a, Ka(f));
                return oc(a, f).join("")
            };
            p.truncate = function(a, f) {
                var c = 30,
                    b = "...";
                if (ra(f)) var e = "separator" in f ? f.separator : e,
                    c = "length" in f ? Y(f.length) : c,
                    b = "omission" in f ? hb(f.omission) : b;
                a = ia(a);
                var d = a.length;
                if (Bb.test(a)) var q = Ka(a),
                    d = q.length;
                if (c >= d) return a;
                d = c - xa(b);
                if (1 > d) return b;
                c = q ? oc(q, 0, d).join("") : a.slice(0, d);
                if (e === u) return c + b;
                q && (d += c.length - d);
                if (Xe(e)) {
                    if (a.slice(d).search(e)) {
                        var h = c;
                        e.global || (e = Re(e.source, ia(db.exec(e)) + "g"));
                        for (e.lastIndex = 0; q =
                            e.exec(h);) var v = q.index;
                        c = c.slice(0, v === u ? d : v)
                    }
                } else a.indexOf(hb(e), d) != d && (e = c.lastIndexOf(e), -1 < e && (c = c.slice(0, e)));
                return c + b
            };
            p.unescape = function(a) {
                return (a = ia(a)) && Mc.test(a) ? a.replace(k, Fc) : a
            };
            p.uniqueId = function(a) {
                var f = ++Wg;
                return ia(a) + f
            };
            p.upperCase = oi;
            p.upperFirst = Le;
            p.each = Yf;
            p.eachRight = Zf;
            p.first = Uf;
            Ne(p, function() {
                var a = {};
                qb(p, function(f, c) {
                    qa.call(p.prototype, c) || (a[c] = f)
                });
                return a
            }(), {
                chain: !1
            });
            p.VERSION = "4.17.2";
            b("bind bindKey curry curryRight partial partialRight".split(" "),
                function(a) {
                    p[a].placeholder = p
                });
            b(["drop", "take"], function(a, f) {
                M.prototype[a] = function(c) {
                    var b = this.__filtered__;
                    if (b && !f) return new M(this);
                    c = c === u ? 1 : Oa(Y(c), 0);
                    var e = this.clone();
                    b ? e.__takeCount__ = Wa(c, e.__takeCount__) : e.__views__.push({
                        size: Wa(c, 4294967295),
                        type: a + (0 > e.__dir__ ? "Right" : "")
                    });
                    return e
                };
                M.prototype[a + "Right"] = function(f) {
                    return this.reverse()[a](f).reverse()
                }
            });
            b(["filter", "map", "takeWhile"], function(a, f) {
                var c = f + 1,
                    b = 1 == c || 3 == c;
                M.prototype[a] = function(a) {
                    var f = this.clone();
                    f.__iteratees__.push({
                        iteratee: S(a,
                            3),
                        type: c
                    });
                    f.__filtered__ = f.__filtered__ || b;
                    return f
                }
            });
            b(["head", "last"], function(a, f) {
                var c = "take" + (f ? "Right" : "");
                M.prototype[a] = function() {
                    return this[c](1).value()[0]
                }
            });
            b(["initial", "tail"], function(a, f) {
                var c = "drop" + (f ? "" : "Right");
                M.prototype[a] = function() {
                    return this.__filtered__ ? new M(this) : this[c](1)
                }
            });
            M.prototype.compact = function() {
                return this.filter(ab)
            };
            M.prototype.find = function(a) {
                return this.filter(a).head()
            };
            M.prototype.findLast = function(a) {
                return this.reverse().find(a)
            };
            M.prototype.invokeMap =
                W(function(a, f) {
                    return "function" == typeof a ? new M(this) : this.map(function(c) {
                        return nc(c, a, f)
                    })
                });
            M.prototype.reject = function(a) {
                return this.filter($d(S(a)))
            };
            M.prototype.slice = function(a, f) {
                a = Y(a);
                var c = this;
                if (c.__filtered__ && (0 < a || 0 > f)) return new M(c);
                0 > a ? c = c.takeRight(-a) : a && (c = c.drop(a));
                f !== u && (f = Y(f), c = 0 > f ? c.dropRight(-f) : c.take(f - a));
                return c
            };
            M.prototype.takeRightWhile = function(a) {
                return this.reverse().takeWhile(a).reverse()
            };
            M.prototype.toArray = function() {
                return this.take(4294967295)
            };
            qb(M.prototype,
                function(a, f) {
                    var c = /^(?:filter|find|map|reject)|While$/.test(f),
                        b = /^(?:head|last)$/.test(f),
                        e = p[b ? "take" + ("last" == f ? "Right" : "") : f],
                        d = b || /^find/.test(f);
                    e && (p.prototype[f] = function() {
                        var f = this.__wrapped__,
                            q = b ? [1] : arguments,
                            h = f instanceof M,
                            v = q[0],
                            g = h || X(f),
                            k = function(a) {
                                a = e.apply(p, D([a], q));
                                return b && z ? a[0] : a
                            };
                        g && c && "function" == typeof v && 1 != v.length && (h = g = !1);
                        var z = this.__chain__,
                            l = !!this.__actions__.length,
                            v = d && !z,
                            h = h && !l;
                        if (!d && g) return f = h ? f : new M(this), f = a.apply(f, q), f.__actions__.push({
                            func: Wd,
                            args: [k],
                            thisArg: u
                        }), new U(f, z);
                        if (v && h) return a.apply(this, q);
                        f = this.thru(k);
                        return v ? b ? f.value()[0] : f.value() : f
                    })
                });
            b("pop push shift sort splice unshift".split(" "), function(a) {
                var f = ce[a],
                    c = /^(?:push|sort|unshift)$/.test(a) ? "tap" : "thru",
                    b = /^(?:pop|shift)$/.test(a);
                p.prototype[a] = function() {
                    var a = arguments;
                    if (b && !this.__chain__) {
                        var e = this.value();
                        return f.apply(X(e) ? e : [], a)
                    }
                    return this[c](function(c) {
                        return f.apply(X(c) ? c : [], a)
                    })
                }
            });
            qb(M.prototype, function(a, f) {
                var c = p[f];
                if (c) {
                    var b = c.name + "";
                    (td[b] || (td[b] = [])).push({
                        name: f,
                        func: c
                    })
                }
            });
            td[Cd(u, 2).name] = [{
                name: "wrapper",
                func: u
            }];
            M.prototype.clone = function() {
                var a = new M(this.__wrapped__);
                a.__actions__ = Ya(this.__actions__);
                a.__dir__ = this.__dir__;
                a.__filtered__ = this.__filtered__;
                a.__iteratees__ = Ya(this.__iteratees__);
                a.__takeCount__ = this.__takeCount__;
                a.__views__ = Ya(this.__views__);
                return a
            };
            M.prototype.reverse = function() {
                if (this.__filtered__) {
                    var a = new M(this);
                    a.__dir__ = -1;
                    a.__filtered__ = !0
                } else a = this.clone(), a.__dir__ *= -1;
                return a
            };
            M.prototype.value =
                function() {
                    var a, f = this.__wrapped__.value(),
                        c = this.__dir__,
                        b = X(f),
                        e = 0 > c,
                        d = b ? f.length : 0;
                    a = 0;
                    for (var q = d, h = this.__views__, v = -1, g = h.length; ++v < g;) {
                        var k = h[v],
                            z = k.size;
                        switch (k.type) {
                            case "drop":
                                a += z;
                                break;
                            case "dropRight":
                                q -= z;
                                break;
                            case "take":
                                q = Wa(q, a + z);
                                break;
                            case "takeRight":
                                a = Oa(a, q - z)
                        }
                    }
                    h = q;
                    q = h - a;
                    e = e ? h : a - 1;
                    a = this.__iteratees__;
                    h = a.length;
                    v = 0;
                    g = Wa(q, this.__takeCount__);
                    if (!b || 200 > d || d == q && g == q) return nf(f, this.__actions__);
                    b = [];
                    a: for (; q-- && v < g;) {
                        e += c;
                        d = -1;
                        for (k = f[e]; ++d < h;) {
                            var l = a[d],
                                z = l.iteratee,
                                l = l.type,
                                z = z(k);
                            if (2 == l) k = z;
                            else if (!z)
                                if (1 == l) continue a;
                                else break a
                        }
                        b[v++] = k
                    }
                    return b
                };
            p.prototype.at = Dh;
            p.prototype.chain = function() {
                return Xf(this)
            };
            p.prototype.commit = function() {
                return new U(this.value(), this.__chain__)
            };
            p.prototype.next = function() {
                this.__values__ === u && (this.__values__ = hg(this.value()));
                var a = this.__index__ >= this.__values__.length,
                    f = a ? u : this.__values__[this.__index__++];
                return {
                    done: a,
                    value: f
                }
            };
            p.prototype.plant = function(a) {
                for (var f, c = this; c instanceof ea;) {
                    var b = rf(c);
                    b.__index__ =
                        0;
                    b.__values__ = u;
                    f ? e.__wrapped__ = b : f = b;
                    var e = b,
                        c = c.__wrapped__
                }
                e.__wrapped__ = a;
                return f
            };
            p.prototype.reverse = function() {
                var a = this.__wrapped__;
                return a instanceof M ? (this.__actions__.length && (a = new M(this)), a = a.reverse(), a.__actions__.push({
                    func: Wd,
                    args: [Ie],
                    thisArg: u
                }), new U(a, this.__chain__)) : this.thru(Ie)
            };
            p.prototype.toJSON = p.prototype.valueOf = p.prototype.value = function() {
                return nf(this.__wrapped__, this.__actions__)
            };
            p.prototype.first = p.prototype.head;
            ud && (p.prototype[ud] = Tg);
            return p
        }();
    "function" ==
    typeof define && "object" == typeof define.amd && define.amd ? (fa._ = Ua, define(function() {
        return Ua
    })) : ob ? ((ob.exports = Ua)._ = Ua, Eb._ = Ua) : fa._ = Ua
}).call(this);

_.mixin({
    eachCons: function(g, d, m) {
        return _.zipWith.apply(null, _.times(d, function(a) {
            return _.slice(g, a, g.length - d + a + 1)
        }).concat(m))
    },
    flattenObject: function(g) {
        return _.reduce(g, function(d, g, a) {
            _.isPlainObject(g) ? _.each(_.flattenObject(g), function(b, h) {
                d[a + "." + h] = b
            }) : d[a] = g;
            return d
        }, {})
    }
});

(function() {
    function g(a, b) {
        function d(a, b) {
            return function() {
                return a.apply(b, arguments)
            }
        }
        var h;
        b = b || {};
        this.trackingClick = !1;
        this.trackingClickStart = 0;
        this.targetElement = null;
        this.lastTouchIdentifier = this.touchStartY = this.touchStartX = 0;
        this.touchBoundary = b.touchBoundary || 10;
        this.layer = a;
        this.tapDelay = b.tapDelay || 200;
        this.tapTimeout = b.tapTimeout || 700;
        if (!g.notNeeded(a)) {
            for (var n = "onMouse onClick onTouchStart onTouchMove onTouchEnd onTouchCancel".split(" "), x = 0, G = n.length; x < G; x++) this[n[x]] = d(this[n[x]],
                this);
            m && (a.addEventListener("mouseover", this.onMouse, !0), a.addEventListener("mousedown", this.onMouse, !0), a.addEventListener("mouseup", this.onMouse, !0));
            a.addEventListener("click", this.onClick, !0);
            a.addEventListener("touchstart", this.onTouchStart, !1);
            a.addEventListener("touchmove", this.onTouchMove, !1);
            a.addEventListener("touchend", this.onTouchEnd, !1);
            a.addEventListener("touchcancel", this.onTouchCancel, !1);
            Event.prototype.stopImmediatePropagation || (a.removeEventListener = function(b, d, h) {
                var g = Node.prototype.removeEventListener;
                "click" === b ? g.call(a, b, d.hijacked || d, h) : g.call(a, b, d, h)
            }, a.addEventListener = function(b, d, h) {
                var g = Node.prototype.addEventListener;
                "click" === b ? g.call(a, b, d.hijacked || (d.hijacked = function(a) {
                    a.propagationStopped || d(a)
                }), h) : g.call(a, b, d, h)
            });
            "function" === typeof a.onclick && (h = a.onclick, a.addEventListener("click", function(a) {
                h(a)
            }, !1), a.onclick = null)
        }
    }
    var d = 0 <= navigator.userAgent.indexOf("Windows Phone"),
        m = 0 < navigator.userAgent.indexOf("Android") && !d,
        a = /iP(ad|hone|od)/.test(navigator.userAgent) && !d,
        b =
        a && /OS 4_\d(_\d)?/.test(navigator.userAgent),
        h = a && /OS [6-7]_\d/.test(navigator.userAgent),
        n = 0 < navigator.userAgent.indexOf("BB10");


    g.prototype.needsClick = function(b) {
        switch (b.nodeName.toLowerCase()) {
            case "button":
            case "select":
            case "textarea":
                if (b.disabled) return !0;
                break;
            case "input":
                if (a && "file" === b.type || b.disabled) return !0;
                break;
            case "label":
            case "iframe":
            case "video":
                return !0
        }
        return /\bneedsclick\b/.test(b.className)
    };


    g.prototype.needsFocus = function(a) {
        switch (a.nodeName.toLowerCase()) {
            case "textarea":
                return !0;
            case "select":
                return !m;
            case "input":
                switch (a.type) {
                    case "button":
                    case "checkbox":
                    case "file":
                    case "image":
                    case "radio":
                    case "submit":
                        return !1
                }
                return !a.disabled && !a.readOnly;
            default:
                return /\bneedsfocus\b/.test(a.className)
        }
    };


    g.prototype.sendClick = function(a, b) {
        var d, h;
        document.activeElement && document.activeElement !== a && document.activeElement.blur();
        h = b.changedTouches[0];
        d = document.createEvent("MouseEvents");
        d.initMouseEvent(this.determineEventType(a), !0, !0, window, 1, h.screenX, h.screenY, h.clientX, h.clientY, !1, !1, !1, !1, 0, null);
        d.forwardedTouchEvent = !0;
        a.dispatchEvent(d)
    };


    g.prototype.determineEventType = function(a) {
        return m && "select" === a.tagName.toLowerCase() ? "mousedown" : "click"
    };


    g.prototype.focus = function(b) {
        var d;
        a && b.setSelectionRange && 0 !== b.type.indexOf("date") && "time" !== b.type && "month" !== b.type ? (d = b.value.length, b.setSelectionRange(d, d)) : b.focus()
    };


    g.prototype.updateScrollParent = function(a) {
        var b, d;
        b = a.fastClickScrollParent;
        if (!b || !b.contains(a)) {
            d = a;
            do {
                if (d.scrollHeight > d.offsetHeight) {
                    b = d;
                    a.fastClickScrollParent =
                        d;
                    break
                }
                d = d.parentElement
            } while (d)
        }
        b && (b.fastClickLastScrollTop = b.scrollTop)
    };


    g.prototype.getTargetElementFromEventTarget = function(a) {
        return a.nodeType === Node.TEXT_NODE ? a.parentNode : a
    };


    g.prototype.onTouchStart = function(d) {
        var h, g, m;
        if (1 < d.targetTouches.length) return !0;
        h = this.getTargetElementFromEventTarget(d.target);
        g = d.targetTouches[0];
        if (a) {
            m = window.getSelection();
            if (m.rangeCount && !m.isCollapsed) return !0;
            if (!b) {
                if (g.identifier && g.identifier === this.lastTouchIdentifier) return d.preventDefault(), !1;
                this.lastTouchIdentifier = g.identifier;
                this.updateScrollParent(h)
            }
        }
        this.trackingClick = !0;
        this.trackingClickStart = d.timeStamp;
        this.targetElement = h;
        this.touchStartX = g.pageX;
        this.touchStartY = g.pageY;
        d.timeStamp - this.lastClickTime < this.tapDelay && d.preventDefault();
        return !0
    };


    g.prototype.touchHasMoved = function(a) {
        a = a.changedTouches[0];
        var b = this.touchBoundary;
        return Math.abs(a.pageX - this.touchStartX) > b || Math.abs(a.pageY - this.touchStartY) > b ? !0 : !1
    };


    g.prototype.onTouchMove = function(a) {
        if (!this.trackingClick) return !0;
        if (this.targetElement !== this.getTargetElementFromEventTarget(a.target) || this.touchHasMoved(a)) this.trackingClick = !1, this.targetElement = null;
        return !0
    };


    g.prototype.findControl = function(a) {
        return void 0 !== a.control ? a.control : a.htmlFor ? document.getElementById(a.htmlFor) : a.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")
    };


    g.prototype.onTouchEnd = function(d) {
        var g, n, t = this.targetElement;
        if (!this.trackingClick) return !0;
        if (d.timeStamp - this.lastClickTime <
            this.tapDelay) return this.cancelNextClick = !0;
        if (d.timeStamp - this.trackingClickStart > this.tapTimeout) return !0;
        this.cancelNextClick = !1;
        this.lastClickTime = d.timeStamp;
        g = this.trackingClickStart;
        this.trackingClick = !1;
        this.trackingClickStart = 0;
        h && (n = d.changedTouches[0], t = document.elementFromPoint(n.pageX - window.pageXOffset, n.pageY - window.pageYOffset) || t, t.fastClickScrollParent = this.targetElement.fastClickScrollParent);
        n = t.tagName.toLowerCase();
        if ("label" === n) {
            if (g = this.findControl(t)) {
                this.focus(t);
                if (m) return !1;
                t = g
            }
        } else if (this.needsFocus(t)) {
            if (100 < d.timeStamp - g || a && window.top !== window && "input" === n) return this.targetElement = null, !1;
            this.focus(t);
            this.sendClick(t, d);
            a && "select" === n || (this.targetElement = null, d.preventDefault());
            return !1
        }
        if (a && !b && (g = t.fastClickScrollParent) && g.fastClickLastScrollTop !== g.scrollTop) return !0;
        this.needsClick(t) || (d.preventDefault(), this.sendClick(t, d));
        return !1
    };


    g.prototype.onTouchCancel = function() {
        this.trackingClick = !1;
        this.targetElement = null
    };


    g.prototype.onMouse = function(a) {
        return this.targetElement &&
            !a.forwardedTouchEvent && a.cancelable ? !this.needsClick(this.targetElement) || this.cancelNextClick ? (a.stopImmediatePropagation ? a.stopImmediatePropagation() : a.propagationStopped = !0, a.stopPropagation(), a.preventDefault(), !1) : !0 : !0
    };


    g.prototype.onClick = function(a) {
        if (this.trackingClick) return this.targetElement = null, this.trackingClick = !1, !0;
        if ("submit" === a.target.type && 0 === a.detail) return !0;
        a = this.onMouse(a);
        a || (this.targetElement = null);
        return a
    };


    g.prototype.destroy = function() {
        var a = this.layer;
        m && (a.removeEventListener("mouseover",
            this.onMouse, !0), a.removeEventListener("mousedown", this.onMouse, !0), a.removeEventListener("mouseup", this.onMouse, !0));
        a.removeEventListener("click", this.onClick, !0);
        a.removeEventListener("touchstart", this.onTouchStart, !1);
        a.removeEventListener("touchmove", this.onTouchMove, !1);
        a.removeEventListener("touchend", this.onTouchEnd, !1);
        a.removeEventListener("touchcancel", this.onTouchCancel, !1)
    };
    g.notNeeded = function(a) {
        var b, d;
        if ("undefined" === typeof window.ontouchstart) return !0;
        if (d = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1])
            if (m) {
                if ((b = document.querySelector("meta[name=viewport]")) && (-1 !== b.content.indexOf("user-scalable=no") || 31 < d && document.documentElement.scrollWidth <= window.outerWidth)) return !0
            } else return !0;
        return n && (b = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/), 10 <= b[1] && 3 <= b[2] && (b = document.querySelector("meta[name=viewport]")) && (-1 !== b.content.indexOf("user-scalable=no") || document.documentElement.scrollWidth <= window.outerWidth)) || "none" === a.style.msTouchAction || "manipulation" === a.style.touchAction ||
            27 <= +(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1] && (b = document.querySelector("meta[name=viewport]")) && (-1 !== b.content.indexOf("user-scalable=no") || document.documentElement.scrollWidth <= window.outerWidth) ? !0 : "none" === a.style.touchAction || "manipulation" === a.style.touchAction ? !0 : !1
    };
    g.attach = function(a, b) {
        return new g(a, b)
    };
    "function" === typeof define && "object" === typeof define.amd && define.amd ? define(function() {
        return g
    }) : "undefined" !== typeof module && module.exports ? (module.exports = g.attach,
        module.exports.FastClick = g) : window.FastClick = g
})();

$(function() {
    FastClick.attach(document.body)
});

window.Modernizr = function(g, d, m) {
    var a = {},
        b = d.documentElement,
        h = d.createElement("modernizr"),
        h = h.style,
        n = " -webkit- -moz- -o- -ms- ".split(" "),
        l = {},
        w = [],
        r = w.slice,
        t, D = function(a, h, g, m) {
            var l, n, t = d.createElement("div"),
                x = d.body,
                r = x || d.createElement("body");
            if (parseInt(g, 10))
                for (; g--;) l = d.createElement("div"), l.id = m ? m[g] : "modernizr" + (g + 1), t.appendChild(l);
            g = ['&#173;<style id="smodernizr">', a, "</style>"].join("");
            t.id = "modernizr";
            (x ? t : r).innerHTML += g;
            r.appendChild(t);
            x || (r.style.background = "", r.style.overflow =
                "hidden", n = b.style.overflow, b.style.overflow = "hidden", b.appendChild(r));
            a = h(t, a);
            x ? t.parentNode.removeChild(t) : (r.parentNode.removeChild(r), b.style.overflow = n);
            return !!a
        },
        x = function() {
            var a = {
                select: "input",
                change: "input",
                submit: "form",
                reset: "form",
                error: "img",
                load: "img",
                abort: "img"
            };
            return function(b, h) {
                h = h || d.createElement(a[b] || "div");
                b = "on" + b;
                var g = b in h;
                g || (h.setAttribute || (h = d.createElement("div")), h.setAttribute && h.removeAttribute && (h.setAttribute(b, ""), g = "function" === typeof h[b], "undefined" !==
                    typeof h[b] && (h[b] = m), h.removeAttribute(b)));
                return g
            }
        }(),
        G = {}.hasOwnProperty,
        J;
    J = "undefined" !== typeof G && "undefined" !== typeof G.call ? function(a, b) {
        return G.call(a, b)
    } : function(a, b) {
        return b in a && "undefined" === typeof a.constructor.prototype[b]
    };
    Function.prototype.bind || (Function.prototype.bind = function(a) {
        var b = this;
        if ("function" != typeof b) throw new TypeError;
        var d = r.call(arguments, 1),
            h = function() {
                if (this instanceof h) {
                    var g = function() {};
                    g.prototype = b.prototype;
                    var g = new g,
                        m = b.apply(g, d.concat(r.call(arguments)));
                    return Object(m) === m ? m : g
                }
                return b.apply(a, d.concat(r.call(arguments)))
            };
        return h
    });
    l.touch = function() {
        var a;
        "ontouchstart" in g || g.DocumentTouch && d instanceof DocumentTouch ? a = !0 : D(["@media (", n.join("touch-enabled),("), "modernizr){#modernizr{top:9px;position:absolute}}"].join(""), function(b) {
            a = 9 === b.offsetTop
        });
        return a
    };
    for (var B in l) J(l, B) && (t = B.toLowerCase(), a[t] = l[B](), w.push((a[t] ? "" : "no-") + t));
    a.addTest = function(d, h) {
        if ("object" == typeof d)
            for (var g in d) J(d, g) && a.addTest(g, d[g]);
        else {
            d = d.toLowerCase();
            if (a[d] !== m) return a;
            h = "function" == typeof h ? h() : h;
            b.className += " com-genius-Genius-" + (h ? "" : "no-") + d;
            a[d] = h
        }
        return a
    };
    h.cssText = "";
    h = null;
    a._version = "2.8.3";
    a._prefixes = n;
    a.hasEvent = x;
    a.testStyles = D;
    b.className = b.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + (" com-genius-Genius-js com-genius-Genius-" + w.join(" com-genius-Genius-"));
    return a
}(this, this.document);

(function(g, d) {
    function m(a, b) {
        var d = function(m) {
            if (!b.is(":not(:visible)"))
                if (g(m.target).closest(b).length) g(document).one("click", d);
                else return a.toggle_target(!1), !g(m.target).is_toggle_target_control_for(b)
        };
        g(document).one("click", d)
    }
    g.fn.scroll_lock = function() {
        return g(this).on("DOMMouseScroll mousewheel", function(a) {
            var b = g(this),
                d = this.scrollTop,
                m = this.scrollHeight,
                l = b.height(),
                w = "DOMMouseScroll" === a.type ? -40 * a.originalEvent.detail : a.originalEvent.wheelDelta,
                r = 0 < w,
                t = function() {
                    a.stopPropagation();
                    a.preventDefault();
                    return a.returnValue = !1
                };
            if (!r && -w > m - l - d) return b.scrollTop(m), t();
            if (r && w > d) return b.scrollTop(0), t()
        })
    };
    g.fn.scroll_release = function() {
        return g(this).off("DOMMouseScroll mousewheel")
    };
    g.fn.outer_html = function() {
        return this[0].outerHTML
    };
    g.fn.unique_items_in_array = function() {
        var a = [];
        g.each(this, function(b, d) {
            -1 === g.inArray(d, a) && a.push(d)
        });
        return a
    };
    g.fn.force_reflow = function() {
        this[0].offsetHeight;
        return this
    };
    g.fn.is_scrolled_into_view = function() {
        return this.is_scrolled_vertically_into_view() &&
            this.is_scrolled_horizontally_into_view()
    };
    g.fn.is_scrolled_vertically_into_view = function() {
        var a = this[0].getBoundingClientRect();
        return 0 <= a.top && a.bottom <= window.innerHeight
    };
    g.fn.is_scrolled_horizontally_into_view = function() {
        var a = this[0].getBoundingClientRect();
        return 0 <= a.left && a.right <= window.innerWidth
    };
    g.fn.scroll_bottom = function() {
        var a = this.prop("innerHeight");
        if (void 0 !== a) return a + this.scrollTop()
    };
    g.fn.get_bounding_client_rect = function() {
        for (var a = this[0].getBoundingClientRect(), a = {
                top: a.top,
                bottom: a.bottom,
                left: a.left,
                right: a.right
            }, b = 1; b < this.length; b++) {
            var d = this[b].getBoundingClientRect();
            a.top = Math.min(a.top, d.top);
            a.bottom = Math.max(a.bottom, d.bottom);
            a.left = Math.min(a.left, d.left);
            a.right = Math.max(a.right, d.right)
        }
        a.height = a.bottom - a.top;
        a.width = a.right - a.left;
        return a
    };
    g.fn.closest_block_level_element = function() {
        return this.parents().filter(function() {
            return "block" === g(this).css("display")
        }).first()
    };
    g.fn.is_block_level_element = function() {
        var a = g(this).css("display");
        return void 0 ===
            a ? !1 : !("inline" === a || "none" === a)
    };
    g.fn.on_screen = function(a) {
        g(this).waypoint(a, {
            offset: "150%",
            triggerOnce: !0
        })
    };
    g.fn.auto_load_more_on_scroll = function() {
        g(this).scroll(function() {
            g.doTimeout("context_scroll", 250, function() {
                Waypoint.refreshAll();
                var a = g("a.more:visible:not(.loading, .no_auto_more a)");
                a.on_screen(function() {
                    a.click()
                })
            })
        });
        return this
    };
    g.fn.scrollToCenterOfScreen = function(a) {
        a = a || {};
        if (!this.length) return this;
        var b = g(a.scroller || (MOBILE_DEVICE ? "#container" : document)),
            d = g(window).height(),
            m = this.height();
        b.scrollTo(this, {
            offset: m / 2 - d / 2,
            onAfter: a.onAfter || function() {}
        });
        return this
    };
    g.fn.retainingScrollPosition = function(a, b) {
        if (!a.length) return b(), this;
        var d = a.offset().top,
            g = this.scrollTop();
        b();
        var m = a.offset().top;
        if (m === d) return this;
        this.scrollTop(g + (m - d));
        return this
    };
    g.fn.reloadTooltip = function() {
        var a;
        try {
            a = this.qtip("api")
        } catch (b) {
            return this
        }
        a.updateContent("Loading...");
        a.loadContent(a.options.content.url);
        return this
    };
    g.fn.reset_editable = function() {
        this.length && "function" ===
            typeof this[0].reset && this[0].reset()
    };
    g.fn.counter_value = function() {
        return parseInt(this.text().replace(/[^0-9]/g, ""))
    };
    g.fn.change_counter_value_by = function(a) {
        this.text(this.text().replace(/[0-9]+/, this.counter_value() + a))
    };
    g.fn.detect = function(a) {
        var b = null;
        this.each(function() {
            if (a.call(this)) return b = this, !1
        });
        return b
    };
    g.fn.insertAtCursor = function(a) {
        return this.each(function() {
            if (this.selectionStart || "0" === this.selectionStart) {
                var b = this.selectionStart,
                    d = this.selectionEnd,
                    g = this.scrollTop;
                this.value = this.value.substring(0, b) + a + this.value.substring(d, this.value.length);
                this.focus();
                this.selectionStart = b + a.length;
                this.selectionEnd = b + a.length;
                this.scrollTop = g
            } else this.value += a, this.focus()
        })
    };
    g.fn.submitWithAjaxQueue = function(a) {
        var b = (a || {}).complete || g.noop;
        return this.each(function() {
            var d = g(this);
            app.ajaxQueue.add(g.extend({
                type: this.method,
                url: this.action,
                data: d.serialize()
            }, a, {
                complete: function() {
                    d.trigger("ajax:complete");
                    b.apply(this, arguments)
                }
            }))
        })
    };
    g.referents_for_this_annotation = {
        settings: {
            selector: function(a) {
                return 'a[data-id="' + a + '"]'
            },
            attribute: "data-id"
        }
    };
    g.fn.referents_for_this_annotation = function() {
        var a = this.attr(g.referents_for_this_annotation.settings.attribute),
            b = g.referents_for_this_annotation.settings.selector;
        return void 0 === a ? this : g(b(a))
    };
    g.fn.hydrate_diff = function() {
        g(this).each(function() {
            var a = g(this),
                b = new diff_match_patch,
                d = b.diff_main(a.data("before"), a.data("after"));
            b.diff_cleanupSemantic(d);
            a.html(b.diff_prettyHtml(d).replace(/&para;/g, ""))
        });
        return this
    };
    g.fn.chosen_auto_choose = function(a) {
        var b = g(this),
            d = b.find('option[value="' + a + '"]');
        b.find("option.auto-selected").removeAttr("selected").removeClass("auto-selected");
        d.is(":selected") || d.attr("selected", !0).addClass("auto-selected");
        setTimeout(function() {
            var a = b.parent().find("ul.chzn-choices"),
                g = a.parent().attr("id");
            a.find("#" + g + "_c_" + d.index()).addClass("locked").siblings().removeClass("locked")
        }, 0);
        b.trigger("liszt:updated")
    };
    g.fn.toggle_target = function(a) {
        var b = g(this).toggleClass("pressed",
                a),
            d = b.attr("data-relative") ? b.find(b.attr("data-target")) : g(b.attr("data-target")),
            n = b.attr("data-show-with-class");
        n ? d.toggleClass(n, a) : d.toggle(a);
        (a = d.is(":visible")) && app.process_auto_load_containers && app.process_auto_load_containers();
        void 0 !== b.attr("data-hide-on-blur") && m(b, d);
        b.attr("data-hide-siblings") && (d.is(":visible") ? (d.siblings(":visible").addClass("toggle_target_hidden_sibling"), n ? d.siblings().removeClass(n) : d.siblings(":visible").hide()) : d.siblings().removeClass("toggle_target_hidden_sibling"),
            b.siblings(".toggle_target").removeClass("pressed"));
        n = b.attr("data-toggles-to-hide");
        void 0 !== n && a && g(n).not(b).toggle_target(!1);
        (b = b.attr("data-focus")) && g(b).focus();
        d.trigger(a ? "toggle_target:visible" : "toggle_target:hidden")
    };
    g.fn.is_toggle_target_control_for = function(a) {
        var b = g(this).closest(".toggle_target");
        return b.length && a.is(b.attr("data-target"))
    };
    g.fn.dirtyable = function() {
        if ("undefined" === typeof this.data("dirty")) {
            var a = this;
            this.data("dirty", !1);
            this.on("dirtyable:changed", function(b,
                d) {
                a.data("dirty", d).toggleClass("dirty", d)
            });
            this.on("input propertychange", function() {
                a.trigger("dirtyable:changed", !!a.val())
            });
            this.each(function() {
                var a = g(this),
                    d = a.closest("form")[0];
                if (d) {
                    var m = "function" === typeof d.onsubmit ? d.onsubmit.bind(d) : function() {
                        return !0
                    };
                    d.onsubmit = function() {
                        a.trigger("dirtyable:changed", !1);
                        return m()
                    };
                    var l = "function" === typeof d.onreset ? d.onreset.bind(d) : function() {
                        return !0
                    };
                    d.onreset = function() {
                        a.trigger("dirtyable:changed", !1);
                        return l()
                    }
                }
            })
        }
    };
    g.fn.values_for_attribute =
        function(a) {
            return g.map(g(this), function(b) {
                return g(b).attr(a)
            })
        };
    g.when_all = function(a) {
        return g.when.apply(g, a)
    };
    g.fn.toggle_boolean_attribute = function(a) {
        var b = g(this);
        b.attr(a) ? b.removeAttr(a) : b.attr(a, !0)
    };
    g.trim = function(a) {
        return (a || "").replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "")
    };
    g.html_to_text = function(a) {
        return g("<div>").prop("innerHTML", a).text()
    };
    g.capitalize_first_letter = function(a) {
        return a.charAt(0).toUpperCase() + a.slice(1)
    };
    g.hyphen_compatible_titleize = function(a) {
        return a.replace(/\b('?[a-z])/g,
            function(a) {
                return a.toUpperCase()
            })
    };
    g.trim_to_length = function(a, b) {
        return a.length > b ? g.trim(a).substring(0, b).split(" ").slice(0, -1).join(" ") + "..." : a
    };
    g.fn.unwrap_contents = function() {
        return g(this).contents().unwrap()
    };
    g.fn.acts_like_input = function() {
        var a = g(this);
        return a.is(":input") || a.prop("isContentEditable")
    };
    g.fn.cache_iframe_contents = function() {
        this.each(function() {
            this.src || this.srcdoc || !this.contentWindow || (this.srcdoc = this.contentWindow.document.documentElement.outerHTML)
        })
    };
    g.fn.capture =
        function(a) {
            var b, d;
            2 === arguments.length ? d = arguments[1] : (b = arguments[1], d = arguments[2]);
            var m = function(a, m) {
                var n = a.originalEvent,
                    t;
                if (t = b ? g(n.target).closest(b)[0] : m) n = g.extend(g.event.fix(n), {
                    currentTarget: t,
                    delegateTarget: m,
                    target: n.target
                }), !1 === d.call(t, n) && (n.stopPropagation(), n.preventDefault())
            };
            this.each(function() {
                var b = g(this),
                    d = b.data("_capture_event_listener");
                d || (d = g({}), b.data("_capture_event_listener", d));
                d.prop(a) || (d.prop(a, !0), this.addEventListener(a, function(a) {
                    d.triggerHandler(g.Event(a),
                        this)
                }, !0));
                d.on(a, m)
            });
            return this
        };
    void 0 !== g.facebox && (g.facebox_then_reload = function(a, b) {
        g.facebox(a);
        g(document).bind("close.facebox", function() {
            (b || PRODUCTION_ENV) && window.location.reload(!0)
        })
    });
    g.ajax_with_retry = function(a) {
        a = g.extend({}, {
            retry_limit: 2,
            type: "get",
            dataType: "html",
            success: function() {},
            data: {}
        }, a);
        g.ajax({
            url: a.url,
            type: a.type,
            data: a.data,
            dataType: a.dataType,
            try_count: 0,
            retry_limit: a.retry_limit,
            success: a.success,
            error: function() {
                this.try_count++;
                this.try_count <= this.retry_limit &&
                    g.ajax(this)
            }
        })
    };
    g.event_emitter = {
        ensure_jquery_wrapper: function() {
            return this.jquery_wrapper || (this.jquery_wrapper = g(this))
        },
        emit: function(a, b) {
            this.ensure_jquery_wrapper().triggerHandler(a, b)
        },
        once: function(a, b) {
            this.ensure_jquery_wrapper().one(a, b)
        },
        on: function(a, b) {
            this.ensure_jquery_wrapper().bind(a, b)
        },
        off: function(a, b) {
            this.ensure_jquery_wrapper().unbind(a, b)
        }
    };
    g.get_selection = function() {
        var a = (window.getSelection || document.getSelection || g.noop)();
        if ("undefined" !== typeof a && a.rangeCount && !a.isCollapsed) return a
    };
    g.get_selection_range = function() {
        return getSelection().getRangeAt(0)
    };
    g.on_body_available = function() {
        var a = g.Deferred();
        if (document.body) a.resolve();
        else {
            var b = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
            if (!b) return g;
            (new b(function(b, d) {
                document.body && (d.disconnect(), a.resolve())
            })).observe(document.documentElement, {
                childList: !0
            })
        }
        b = a.promise();
        return b.done.bind(b)
    }();
    g(function() {
        var a = function() {
            var a = g.get_selection();
            if (a) return g("<div>").append(a.getRangeAt(0).cloneContents()).html()
        };
        g(document).on("mouseup", function() {
            setTimeout(function() {
                var a = g.get_selection();
                if (a)
                    for (var b = 0; b < a.rangeCount; b++) {
                        for (var d = a.getRangeAt(b), m = d.commonAncestorContainer; m.nodeType !== Node.ELEMENT_NODE;) m = m.parentNode;
                        var r = g.Event("textselected", {
                            selection: a,
                            range: d,
                            triggering_event: r
                        });
                        g(m).trigger(r)
                    }
            }, 0)
        });
        if (d.touch) {
            var b = function(d) {
                a() && g(d.target).trigger("textselected", {
                    triggering_event: d
                });
                window.setImmediate(function() {
                    g(document).one("selectionchange", b)
                })
            };
            g(document).one("selectionchange",
                b)
        }
    })
})(jQuery, Modernizr);

(function(g) {
    function d(d) {
        "string" === typeof d.data && (d.data = {
            keys: d.data
        });
        if (d.data && d.data.keys && "string" === typeof d.data.keys) {
            var a = d.handler,
                b = d.data.keys.toLowerCase().split(" "),
                h = "text password number email url range date month week time datetime datetime-local search color tel".split(" ");
            d.handler = function(n) {
                if (d.data.allowInTextInputField || this === n.target || !(/textarea|select/i.test(n.target.nodeName) || -1 < g.inArray(n.target.type, h) || g(n.target).prop("isContentEditable"))) {
                    var l = g.hotkeys.specialKeys[n.keyCode],
                        w = 0 < n.which && String.fromCharCode(n.which).toLowerCase(),
                        r = "",
                        t = {};
                    n.altKey && "alt" !== l && (r += "alt+");
                    n.ctrlKey && "ctrl" !== l && (r += "ctrl+");
                    n.metaKey && !n.ctrlKey && "meta" !== l && (r += "meta+");
                    n.shiftKey && "shift" !== l && (r += "shift+");
                    l && (t[r + l] = !0);
                    w && (t[r + w] = !0, t[r + g.hotkeys.shiftNums[w]] = !0, "shift+" === r && (t[g.hotkeys.shiftNums[w]] = !0));
                    l = 0;
                    for (w = b.length; l < w; l++)
                        if (t[b[l]]) return a.apply(this, arguments)
                }
            }
        }
    }
    g.hotkeys = {
        version: "0.8",
        specialKeys: {
            8: "backspace",
            9: "tab",
            10: "return",
            13: "return",
            16: "shift",
            17: "ctrl",
            18: "alt",
            19: "pause",
            20: "capslock",
            27: "esc",
            32: "space",
            33: "pageup",
            34: "pagedown",
            35: "end",
            36: "home",
            37: "left",
            38: "up",
            39: "right",
            40: "down",
            45: "insert",
            46: "del",
            96: "0",
            97: "1",
            98: "2",
            99: "3",
            100: "4",
            101: "5",
            102: "6",
            103: "7",
            104: "8",
            105: "9",
            106: "*",
            107: "+",
            109: "-",
            110: ".",
            111: "/",
            112: "f1",
            113: "f2",
            114: "f3",
            115: "f4",
            116: "f5",
            117: "f6",
            118: "f7",
            119: "f8",
            120: "f9",
            121: "f10",
            122: "f11",
            123: "f12",
            144: "numlock",
            145: "scroll",
            186: ";",
            191: "/",
            220: "\\",
            222: "'",
            224: "meta"
        },
        shiftNums: {
            "`": "~",
            1: "!",
            2: "@",
            3: "#",
            4: "$",
            5: "%",
            6: "^",
            7: "&",
            8: "*",
            9: "(",
            0: ")",
            "-": "_",
            "=": "+",
            ";": ": ",
            "'": '"',
            ",": "<",
            ".": ">",
            "/": "?",
            "\\": "|"
        }
    };
    g.each(["keydown", "keyup", "keypress"], function() {
        g.event.special[this] = {
            add: d
        }
    })
})(this.jQuery);

(function() {
    if (!window["com.genius.Genius"].require) {
        var g = {},
            d = {},
            m = function(b, h) {
                var n = a(h, b),
                    l = a(n, "./index"),
                    w;
                if (w = d[n] || d[l]) return w;
                if (l = g[n] || g[n = l]) return w = {
                    id: n,
                    exports: {}
                }, d[n] = w.exports, l(w.exports, function(a) {
                    return m(a, n.split("/").slice(0, -1).join("/"))
                }, w), d[n] = w.exports;
                throw "module " + b + " not found";
            },
            a = function(a, d) {
                var g = [],
                    m, w;
                m = /^\.\.?(\/|$)/.test(d) ? [a, d].join("/").split("/") : d.split("/");
                for (var r = 0, t = m.length; r < t; r++) w = m[r], ".." == w ? g.pop() : "." != w && "" != w && g.push(w);
                return g.join("/")
            };
        window["com.genius.Genius"].require = function(a) {
            return m(a, "")
        };
        window["com.genius.Genius"].require.define = function(a) {
            for (var d in a) g[d] = a[d]
        };
        window["com.genius.Genius"].require.modules = g;
        window["com.genius.Genius"].require.cache = d
    }
    return window["com.genius.Genius"].require
}).call(this);

(function() {
    window["com.genius.Genius"].require.define({
        jschannel: function(g, d, m) {
            g = function() {
                function a(a, b, d, h) {
                    function m(b) {
                        for (var d = 0; d < b.length; d++)
                            if (b[d].win === a) return !0;
                        return !1
                    }
                    var l = !1;
                    if ("*" === b)
                        for (var B in g) {
                            if (g.hasOwnProperty(B) && "*" !== B && "object" === typeof g[B][d] && (l = m(g[B][d]))) break
                        } else g["*"] && g["*"][d] && (l = m(g["*"][d])), !l && g[b] && g[b][d] && (l = m(g[b][d]));
                    if (l) throw "A channel is already bound to the same window which overlaps with origin '" + b + "' and has scope '" + d + "'";
                    "object" !=
                    typeof g[b] && (g[b] = {});
                    "object" != typeof g[b][d] && (g[b][d] = []);
                    g[b][d].push({
                        win: a,
                        handler: h
                    })
                }

                function b(a) {
                    return Array.isArray ? Array.isArray(a) : -1 != a.constructor.toString().indexOf("Array")
                }
                var d = Math.floor(1000001 * Math.random()),
                    g = {},
                    m = {},
                    w = function(a) {
                        try {
                            var b = JSON.parse(a.data);
                            if ("object" !== typeof b || null === b) throw "malformed";
                        } catch (d) {
                            return
                        }
                        var h = a.source;
                        a = a.origin;
                        var x, G, J;
                        "string" === typeof b.method && (J = b.method.split("::"), 2 == J.length ? (x = J[0], J = J[1]) : J = b.method);
                        "undefined" !== typeof b.id &&
                            (G = b.id);
                        if ("string" === typeof J) {
                            G = !1;
                            if (g[a] && g[a][x])
                                for (var B = 0; B < g[a][x].length; B++)
                                    if (g[a][x][B].win === h) {
                                        g[a][x][B].handler(a, J, b);
                                        G = !0;
                                        break
                                    }
                            if (!G && g["*"] && g["*"][x])
                                for (B = 0; B < g["*"][x].length; B++)
                                    if (g["*"][x][B].win === h) {
                                        g["*"][x][B].handler(a, J, b);
                                        break
                                    }
                        } else if ("undefined" != typeof G && m[G]) m[G](a, J, b)
                    };
                window.addEventListener ? window.addEventListener("message", w, !1) : window.attachEvent && window.attachEvent("onmessage", w);
                return {
                    build: function(r) {
                        var t = function(a) {
                            if (r.debugOutput && window.console &&
                                window.console.log) {
                                try {
                                    "string" !== typeof a && (a = JSON.stringify(a))
                                } catch (b) {}
                                console.log("[" + G + "] " + a)
                            }
                        };
                        if (!window.postMessage) throw "jschannel cannot run this browser, no postMessage";
                        if (!window.JSON || !window.JSON.stringify || !window.JSON.parse) throw "jschannel cannot run this browser, no JSON parsing/serialization";
                        if ("object" != typeof r) throw "Channel build invoked without a proper object argument";
                        if (!r.window || !r.window.postMessage) throw "Channel.build() called without a valid window argument";
                        if (window ===
                            r.window) throw "target window is same as present window -- not allowed";
                        var D = !1;
                        if ("string" === typeof r.origin) {
                            var x;
                            "*" === r.origin ? D = !0 : null !== (x = r.origin.match(/^https?:\/\/(?:[-a-zA-Z0-9_\.])+(?::\d+)?/)) && (r.origin = x[0].toLowerCase(), D = !0)
                        }
                        if (!D) throw "Channel.build() called with an invalid origin";
                        if ("undefined" !== typeof r.scope) {
                            if ("string" !== typeof r.scope) throw "scope, when specified, must be a string";
                            if (1 < r.scope.split("::").length) throw "scope may not contain double colons: '::'";
                        }
                        var G = function() {
                                for (var a =
                                        "", b = 0; 5 > b; b++) a += "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".charAt(Math.floor(62 * Math.random()));
                                return a
                            }(),
                            J = {},
                            B = {},
                            w = {},
                            E = !1,
                            F = [],
                            K = function(a, b, d) {
                                var h = !1,
                                    g = !1;
                                return {
                                    origin: b,
                                    invoke: function(b, h) {
                                        if (!w[a]) throw "attempting to invoke a callback of a nonexistent transaction: " + a;
                                        for (var g = !1, m = 0; m < d.length; m++)
                                            if (b === d[m]) {
                                                g = !0;
                                                break
                                            }
                                        if (!g) throw "request supports no such callback '" + b + "'";
                                        la({
                                            id: a,
                                            callback: b,
                                            params: h
                                        })
                                    },
                                    error: function(b, d) {
                                        g = !0;
                                        if (!w[a]) throw "error called for nonexistent message: " +
                                            a;
                                        delete w[a];
                                        la({
                                            id: a,
                                            error: b,
                                            message: d
                                        })
                                    },
                                    complete: function(b) {
                                        g = !0;
                                        if (!w[a]) throw "complete called for nonexistent message: " + a;
                                        delete w[a];
                                        la({
                                            id: a,
                                            result: b
                                        })
                                    },
                                    delayReturn: function(a) {
                                        "boolean" === typeof a && (h = !0 === a);
                                        return h
                                    },
                                    completed: function() {
                                        return g
                                    }
                                }
                            },
                            V = function(a, b, d) {
                                return window.setTimeout(function() {
                                    if (B[a]) {
                                        var h = "timeout (" + b + "ms) exceeded on method '" + d + "'";
                                        (1, B[a].error)("timeout_error", h);
                                        delete B[a];
                                        delete m[a]
                                    }
                                }, b)
                            },
                            O = function(a, d, h) {
                                if ("function" === typeof r.gotMessageObserver) try {
                                    r.gotMessageObserver(a,
                                        h)
                                } catch (g) {
                                    t("gotMessageObserver() raised an exception: " + g.toString())
                                }
                                if (h.id && d) {
                                    if (J[d]) {
                                        var n = K(h.id, a, h.callbacks ? h.callbacks : []);
                                        w[h.id] = {};
                                        try {
                                            if (h.callbacks && b(h.callbacks) && 0 < h.callbacks.length)
                                                for (a = 0; a < h.callbacks.length; a++) {
                                                    for (var x = h.callbacks[a], G = h.params, D = x.split("/"), F = 0; F < D.length - 1; F++) {
                                                        var E = D[F];
                                                        "object" !== typeof G[E] && (G[E] = {});
                                                        G = G[E]
                                                    }
                                                    G[D[D.length - 1]] = function() {
                                                        var a = x;
                                                        return function(b) {
                                                            return n.invoke(a, b)
                                                        }
                                                    }()
                                                }
                                            var V = J[d](n, h.params);
                                            n.delayReturn() || n.completed() || n.complete(V)
                                        } catch (g) {
                                            d =
                                                "runtime_error";
                                            h = null;
                                            "string" === typeof g ? h = g : "object" === typeof g && (g && b(g) && 2 == g.length ? (d = g[0], h = g[1]) : "string" === typeof g.error && (d = g.error, g.message ? "string" === typeof g.message ? h = g.message : g = g.message : h = ""));
                                            if (null === h) try {
                                                h = JSON.stringify(g), "undefined" == typeof h && (h = g.toString())
                                            } catch (O) {
                                                h = g.toString()
                                            }
                                            n.error(d, h)
                                        }
                                    }
                                } else if (h.id && h.callback)
                                    if (B[h.id] && B[h.id].callbacks && B[h.id].callbacks[h.callback]) B[h.id].callbacks[h.callback](h.params);
                                    else t("ignoring invalid callback, id:" + h.id + " (" +
                                        h.callback + ")");
                                else if (h.id) B[h.id] ? (h.error ? (1, B[h.id].error)(h.error, h.message) : void 0 !== h.result ? (1, B[h.id].success)(h.result) : (1, B[h.id].success)(), delete B[h.id], delete m[h.id]) : t("ignoring invalid response: " + h.id);
                                else if (d && J[d]) J[d]({
                                    origin: a
                                }, h.params)
                            };
                        a(r.window, r.origin, "string" === typeof r.scope ? r.scope : "", O);
                        var ea = function(a) {
                                "string" === typeof r.scope && r.scope.length && (a = [r.scope, a].join("::"));
                                return a
                            },
                            la = function(a, b) {
                                if (!a) throw "postMessage called with null message";
                                t((E ? "post  " :
                                    "queue ") + " message: " + JSON.stringify(a));
                                if (b || E) {
                                    if ("function" === typeof r.postMessageObserver) try {
                                        r.postMessageObserver(r.origin, a)
                                    } catch (d) {
                                        t("postMessageObserver() raised an exception: " + d.toString())
                                    }
                                    r.window.postMessage(JSON.stringify(a), r.origin)
                                } else F.push(a)
                            },
                            ta = {
                                unbind: function(a) {
                                    if (J[a]) {
                                        if (!delete J[a]) throw "can't delete method: " + a;
                                        return !0
                                    }
                                    return !1
                                },
                                bind: function(a, b) {
                                    if (!a || "string" !== typeof a) throw "'method' argument to bind must be string";
                                    if (!b || "function" !== typeof b) throw "callback missing from bind params";
                                    if (J[a]) throw "method '" + a + "' is already bound!";
                                    J[a] = b;
                                    return this
                                },
                                call: function(a) {
                                    if (!a) throw "missing arguments to call function";
                                    if (!a.method || "string" !== typeof a.method) throw "'method' argument to call must be string";
                                    if (!a.success || "function" !== typeof a.success) throw "'success' callback missing from call";
                                    var b = {},
                                        g = [],
                                        n = [],
                                        t = function(a, d) {
                                            if (0 <= n.indexOf(d)) throw "params cannot be a recursive data structure";
                                            n.push(d);
                                            if ("object" === typeof d)
                                                for (var h in d)
                                                    if (d.hasOwnProperty(h)) {
                                                        var m = a + (a.length ?
                                                            "/" : "") + h;
                                                        "function" === typeof d[h] ? (b[m] = d[h], g.push(m), delete d[h]) : "object" === typeof d[h] && t(m, d[h])
                                                    }
                                        };
                                    t("", a.params);
                                    var x = {
                                        id: d,
                                        method: ea(a.method),
                                        params: a.params
                                    };
                                    g.length && (x.callbacks = g);
                                    a.timeout && V(d, a.timeout, ea(a.method));
                                    B[d] = {
                                        callbacks: b,
                                        error: a.error,
                                        success: a.success
                                    };
                                    m[d] = O;
                                    d++;
                                    la(x)
                                },
                                notify: function(a) {
                                    if (!a) throw "missing arguments to notify function";
                                    if (!a.method || "string" !== typeof a.method) throw "'method' argument to notify must be string";
                                    la({
                                        method: ea(a.method),
                                        params: a.params
                                    })
                                },
                                destroy: function() {
                                    for (var a = r.window, b = r.origin, d = "string" === typeof r.scope ? r.scope : "", h = g[b][d], m = 0; m < h.length; m++) h[m].win === a && h.splice(m, 1);
                                    0 === g[b][d].length && delete g[b][d];
                                    window.removeEventListener ? window.removeEventListener("message", O, !1) : window.detachEvent && window.detachEvent("onmessage", O);
                                    E = !1;
                                    J = {};
                                    w = {};
                                    B = {};
                                    r.origin = null;
                                    F = [];
                                    t("channel destroyed");
                                    G = ""
                                }
                            };
                        ta.bind("__ready", function(a, b) {
                            t("ready msg received");
                            if (E) throw "received ready message while in ready state.  help!";
                            G = "ping" ===
                                b ? G + "-R" : G + "-L";
                            ta.unbind("__ready");
                            E = !0;
                            t("ready msg accepted.");
                            for ("ping" === b && ta.notify({
                                    method: "__ready",
                                    params: "pong"
                                }); F.length;) la(F.pop());
                            if ("function" === typeof r.onReady) r.onReady(ta)
                        });
                        setTimeout(function() {
                            la({
                                method: ea("__ready"),
                                params: "ping"
                            }, !0)
                        }, 0);
                        return ta
                    }
                }
            }();
            m.exports = g
        }
    })
})();

(function() {
    function g(a, b, d) {
        "addEventListener" in window ? a.addEventListener(b, d, !1) : "attachEvent" in window && a.attachEvent("on" + b, d)
    }

    function d(a) {
        B.log && "object" === typeof console && console.log("[iFrameSizer][Host page]" + a)
    }

    function m() {
        null === x && (x = {
            x: void 0 !== window.pageXOffset ? window.pageXOffset : document.documentElement.scrollLeft,
            y: void 0 !== window.pageYOffset ? window.pageYOffset : document.documentElement.scrollTop
        }, d(" Get position: " + x.x + "," + x.y))
    }

    function a() {
        null !== x && (window.scrollTo(x.x, x.y),
            d(" Set position: " + x.x + "," + x.y), x = null)
    }

    function b(a) {
        d(" Size reset requested by " + ("init" === a.type ? "host page" : "iFrame"));
        m();
        n(function() {
            h(a);
            l("reset", "reset", a.iframe)
        }, a, "init")
    }

    function h(a) {
        function b(h) {
            a.iframe.style[h] = a[h] + "px";
            d(" IFrame (" + a.iframe.id + ") " + h + " set to " + a[h] + "px")
        }
        B.sizeHeight && b("height");
        B.sizeWidth && b("width")
    }

    function n(a, b, h) {
        h !== b.type && G ? (d(" Requesting animation frame"), G(a)) : a()
    }

    function l(a, b, h) {
        d("[" + a + "] Sending msg to iframe (" + b + ")");
        h.contentWindow.postMessage("[iFrameSizer]" +
            b, "*")
    }

    function w() {
        var a = this,
            h = function(b) {
                "" === b && (a.id = b = "iFrameResizer" + t++, d(" Added missing iframe ID: " + b + " (" + a.src + ")"));
                return b
            }(a.id);
        d(" IFrame scrolling " + (B.scrolling ? "enabled" : "disabled") + " for " + h);
        a.style.overflow = !1 === B.scrolling ? "hidden" : "auto";
        a.scrolling = !1 === B.scrolling ? "no" : "yes";
        (function() {
            function b(h) {
                Infinity !== B[h] && 0 !== B[h] && (a.style[h] = B[h] + "px", d(" Set " + h + " = " + B[h] + "px"))
            }
            b("maxHeight");
            b("minHeight");
            b("maxWidth");
            b("minWidth")
        })();
        if ("number" === typeof B.bodyMargin ||
            "0" === B.bodyMargin) B.bodyMarginV1 = B.bodyMargin, B.bodyMargin = "" + B.bodyMargin + "px";
        E.push(a);
        (function(d) {
            g(a, "load", function() {
                var h = D;
                l("iFrame.onload", d, a);
                !h && B.heightCalculationMethod in J && b({
                    iframe: a,
                    height: 0,
                    width: 0,
                    type: "init"
                })
            });
            l("init", d, a)
        })(h + ":" + B.bodyMarginV1 + ":" + B.sizeWidth + ":" + B.log + ":" + B.interval + ":" + B.enablePublicMethods + ":" + B.autoResize + ":" + B.bodyMargin + ":" + B.heightCalculationMethod + ":" + B.bodyBackground + ":" + B.bodyPadding + ":" + B.tolerance)
    }

    function r(a) {
        a.fn.iFrameResize = function(b) {
            b =
                b || {};
            if ("object" !== typeof b) throw new TypeError("Options is not an object.");
            B = a.extend({}, A, b);
            return this.filter("iframe").each(w).end()
        }
    }
    var t = 0,
        D = !0,
        x = null,
        G = window.requestAnimationFrame,
        J = {
            max: 1,
            scroll: 1,
            bodyScroll: 1,
            documentElementScroll: 1
        },
        B = {},
        A = {
            autoResize: !0,
            bodyBackground: null,
            bodyMargin: null,
            bodyMarginV1: 8,
            bodyPadding: null,
            checkOrigin: !0,
            enablePublicMethods: !1,
            heightCalculationMethod: "offset",
            interval: 32,
            log: !1,
            maxHeight: Infinity,
            maxWidth: Infinity,
            minHeight: 0,
            minWidth: 0,
            scrolling: !1,
            sizeHeight: !0,
            sizeWidth: !1,
            tolerance: 0,
            closedCallback: function() {},
            initCallback: function() {},
            messageCallback: function() {},
            resizedCallback: function() {}
        },
        E = [];
    (function() {
        var a = ["moz", "webkit", "o", "ms"],
            b;
        for (b = 0; b < a.length && !G; b += 1) G = window[a[b] + "RequestAnimationFrame"];
        G || d(" RequestAnimationFrame not supported")
    })();
    g(window, "message", function(g) {
        function l() {
            G("Height");
            G("Width");
            n(function() {
                h(R);
                a();
                B.resizedCallback(R)
            }, R, "resetPage")
        }

        function t(a) {
            var b = a.id;
            d(" Removing iFrame: " + b);
            a.parentNode.removeChild(a);
            B.closedCallback(b);
            d(" --")
        }

        function r() {
            var a = T.substr(13).split(":");
            return {
                iframe: document.getElementById(a[0]),
                id: a[0],
                height: a[1],
                width: a[2],
                type: a[3]
            }
        }

        function G(a) {
            var b = Number(B["max" + a]),
                h = Number(B["min" + a]),
                g = a.toLowerCase(),
                m = Number(R[g]);
            if (h > b) throw Error("Value for min" + a + " can not be greater than max" + a);
            d(" Checking " + g + " is in range " + h + "-" + b);
            m < h && (m = h, d(" Set " + g + " to min value"));
            m > b && (m = b, d(" Set " + g + " to max value"));
            R[g] = "" + m
        }

        function J() {
            var a = g.origin,
                b = R.iframe.src.split("/").slice(0,
                    3).join("/");
            if (-1 === E.indexOf(R.iframe)) return !1;
            if (B.checkOrigin && (d(" Checking connection is from: " + b), "null" !== "" + a && a !== b)) throw Error("Unexpected message received from: " + a + " for " + R.iframe.id + ". Message was: " + g.data + ". This error can be disabled by adding the checkOrigin: false option.");
            return !0
        }

        function w() {
            var a = R.type in {
                "true": 1,
                "false": 1
            };
            a && d(" Ignoring init message from meta parent page");
            return a
        }

        function A() {
            var a = T.substr(T.indexOf(":") + 7 + 6);
            d(" MessageCallback passed: {iframe: " +
                R.iframe.id + ", message: " + a + "}");
            B.messageCallback({
                iframe: R.iframe,
                message: JSON.parse(a)
            });
            d(" --")
        }

        function ma(b) {
            b ? (b = R.iframe.getBoundingClientRect(), m(), b = {
                x: Number(b.left) + Number(x.x),
                y: Number(b.top) + Number(x.y)
            }) : b = {
                x: 0,
                y: 0
            };
            d(" Reposition requested from iFrame (offset x:" + b.x + " y:" + b.y + ")");
            x = {
                x: Number(R.width) + b.x,
                y: Number(R.height) + b.y
            };
            a()
        }
        var T = g.data,
            R = {};
        if ("[iFrameSizer]" === ("" + T).substr(0, 13)) {
            d(" Received: " + T);
            var R = r(),
                Ba;
            if (Ba = !w()) {
                if (null === R.iframe) throw Error("iFrame (" + R.id +
                    ") does not exist on ");
                Ba = !0
            }
            if (Ba && J()) {
                switch (R.type) {
                    case "close":
                        t(R.iframe);
                        B.resizedCallback(R);
                        break;
                    case "message":
                        A();
                        break;
                    case "scrollTo":
                        ma(!1);
                        break;
                    case "scrollToOffset":
                        ma(!0);
                        break;
                    case "reset":
                        b(R);
                        break;
                    case "init":
                        l();
                        B.initCallback(R.iframe);
                        break;
                    default:
                        l()
                }
                D = !1
            }
        }
    });
    window.jQuery && r(jQuery)
})();

(function() {
    var g = window.jQuery,
        d = g.fn.iFrameResize;
    g.fn.iFrameResize = function(m) {
        d.call(this, g.extend({}, m, {
            resizedCallback: function() {
                var a = document.createEvent("Event");
                a.initEvent("iFrameResize", !0, !0);
                document.dispatchEvent(a)
            }
        }));
        return this
    }
})();

var Genius = window["com.genius.Genius"];

Genius.Modernizr = Modernizr;

$.extend(window, Genius.conflicts);

Genius.jQuery = $.noConflict("removeAll");

Genius.lodash = _.noConflict();

(function() {
    function g() {
        this.Diff_Timeout = 1;
        this.Diff_EditCost = 4;
        this.Match_Threshold = .5;
        this.Match_Distance = 1E3;
        this.Patch_DeleteThreshold = .5;
        this.Patch_Margin = 4;
        this.Match_MaxBits = 32
    }


    g.prototype.diff_main = function(d, g, a, b) {
        "undefined" == typeof b && (b = 0 >= this.Diff_Timeout ? Number.MAX_VALUE : (new Date).getTime() + 1E3 * this.Diff_Timeout);
        if (null == d || null == g) throw Error("Null input. (diff_main)");
        if (d == g) return d ? [
            [0, d]
        ] : [];
        "undefined" == typeof a && (a = !0);
        var h = a,
            n = this.diff_commonPrefix(d, g);
        a = d.substring(0,
            n);
        d = d.substring(n);
        g = g.substring(n);
        var n = this.diff_commonSuffix(d, g),
            l = d.substring(d.length - n);
        d = d.substring(0, d.length - n);
        g = g.substring(0, g.length - n);
        d = this.diff_compute_(d, g, h, b);
        a && d.unshift([0, a]);
        l && d.push([0, l]);
        this.diff_cleanupMerge(d);
        return d
    };


    g.prototype.diff_compute_ = function(d, g, a, b) {
        if (!d) return [
            [1, g]
        ];
        if (!g) return [
            [-1, d]
        ];
        var h = d.length > g.length ? d : g,
            n = d.length > g.length ? g : d,
            l = h.indexOf(n);
        return -1 != l ? (a = [
            [1, h.substring(0, l)],
            [0, n],
            [1, h.substring(l + n.length)]
        ], d.length > g.length && (a[0][0] =
            a[2][0] = -1), a) : 1 == n.length ? [
            [-1, d],
            [1, g]
        ] : (h = this.diff_halfMatch_(d, g)) ? (n = h[0], d = h[1], l = h[2], g = h[3], h = h[4], n = this.diff_main(n, l, a, b), a = this.diff_main(d, g, a, b), n.concat([
            [0, h]
        ], a)) : a && 100 < d.length && 100 < g.length ? this.diff_lineMode_(d, g, b) : this.diff_bisect_(d, g, b)
    };


    g.prototype.diff_lineMode_ = function(d, g, a) {
        var b = this.diff_linesToChars_(d, g);
        d = b.chars1;
        g = b.chars2;
        b = b.lineArray;
        d = this.diff_main(d, g, !1, a);
        this.diff_charsToLines_(d, b);
        this.diff_cleanupSemantic(d);
        d.push([0, ""]);
        for (var h = b = g = 0, n = "", l =
                ""; g < d.length;) {
            switch (d[g][0]) {
                case 1:
                    h++;
                    l += d[g][1];
                    break;
                case -1:
                    b++;
                    n += d[g][1];
                    break;
                case 0:
                    if (1 <= b && 1 <= h) {
                        d.splice(g - b - h, b + h);
                        g = g - b - h;
                        b = this.diff_main(n, l, !1, a);
                        for (h = b.length - 1; 0 <= h; h--) d.splice(g, 0, b[h]);
                        g += b.length
                    }
                    b = h = 0;
                    l = n = ""
            }
            g++
        }
        d.pop();
        return d
    };


    g.prototype.diff_bisect_ = function(d, g, a) {
        for (var b = d.length, h = g.length, n = Math.ceil((b + h) / 2), l = 2 * n, w = Array(l), r = Array(l), t = 0; t < l; t++) w[t] = -1, r[t] = -1;
        w[n + 1] = 0;
        r[n + 1] = 0;
        for (var t = b - h, D = 0 != t % 2, x = 0, G = 0, J = 0, B = 0, A = 0; A < n && !((new Date).getTime() > a); A++) {
            for (var E = -A + x; E <= A - G; E += 2) {
                var F = n + E,
                    K;
                K = E == -A || E != A && w[F - 1] < w[F + 1] ? w[F + 1] : w[F - 1] + 1;
                for (var V = K - E; K < b && V < h && d.charAt(K) == g.charAt(V);) K++, V++;
                w[F] = K;
                if (K > b) G += 2;
                else if (V > h) x += 2;
                else if (D && (F = n + t - E, 0 <= F && F < l && -1 != r[F])) {
                    var O = b - r[F];
                    if (K >= O) return this.diff_bisectSplit_(d, g, K, V, a)
                }
            }
            for (E = -A + J; E <= A - B; E += 2) {
                F = n + E;
                O = E == -A || E != A && r[F - 1] < r[F + 1] ? r[F + 1] : r[F - 1] + 1;
                for (K = O - E; O < b && K < h && d.charAt(b - O - 1) == g.charAt(h - K - 1);) O++, K++;
                r[F] = O;
                if (O > b) B += 2;
                else if (K > h) J += 2;
                else if (!D && (F = n + t - E, 0 <= F && F < l && -1 != w[F] && (K = w[F], V = n +
                        K - F, O = b - O, K >= O))) return this.diff_bisectSplit_(d, g, K, V, a)
            }
        }
        return [
            [-1, d],
            [1, g]
        ]
    };


    g.prototype.diff_bisectSplit_ = function(d, g, a, b, h) {
        var n = d.substring(0, a),
            l = g.substring(0, b);
        d = d.substring(a);
        g = g.substring(b);
        n = this.diff_main(n, l, !1, h);
        h = this.diff_main(d, g, !1, h);
        return n.concat(h)
    };


    g.prototype.diff_linesToChars_ = function(d, g) {
        function a(a) {
            for (var d = "", g = 0, m = -1, l = b.length; m < a.length - 1;) {
                m = a.indexOf("\n", g); - 1 == m && (m = a.length - 1);
                var n = a.substring(g, m + 1),
                    g = m + 1;
                (h.hasOwnProperty ? h.hasOwnProperty(n) : void 0 !==
                    h[n]) ? d += String.fromCharCode(h[n]): (d += String.fromCharCode(l), h[n] = l, b[l++] = n)
            }
            return d
        }
        var b = [],
            h = {};
        b[0] = "";
        var n = a(d),
            l = a(g);
        return {
            chars1: n,
            chars2: l,
            lineArray: b
        }
    };


    g.prototype.diff_charsToLines_ = function(d, g) {
        for (var a = 0; a < d.length; a++) {
            for (var b = d[a][1], h = [], n = 0; n < b.length; n++) h[n] = g[b.charCodeAt(n)];
            d[a][1] = h.join("")
        }
    };


    g.prototype.diff_commonPrefix = function(d, g) {
        if (!d || !g || d.charAt(0) != g.charAt(0)) return 0;
        for (var a = 0, b = Math.min(d.length, g.length), h = b, n = 0; a < h;) d.substring(n, h) == g.substring(n,
            h) ? n = a = h : b = h, h = Math.floor((b - a) / 2 + a);
        return h
    };


    g.prototype.diff_commonSuffix = function(d, g) {
        if (!d || !g || d.charAt(d.length - 1) != g.charAt(g.length - 1)) return 0;
        for (var a = 0, b = Math.min(d.length, g.length), h = b, n = 0; a < h;) d.substring(d.length - h, d.length - n) == g.substring(g.length - h, g.length - n) ? n = a = h : b = h, h = Math.floor((b - a) / 2 + a);
        return h
    };


    g.prototype.diff_commonOverlap_ = function(d, g) {
        var a = d.length,
            b = g.length;
        if (0 == a || 0 == b) return 0;
        a > b ? d = d.substring(a - b) : a < b && (g = g.substring(0, a));
        a = Math.min(a, b);
        if (d == g) return a;
        for (var b = 0, h = 1;;) {
            var n = d.substring(a - h),
                n = g.indexOf(n);
            if (-1 == n) return b;
            h += n;
            if (0 == n || d.substring(a - h) == g.substring(0, h)) b = h, h++
        }
    };


    g.prototype.diff_halfMatch_ = function(d, g) {
        function a(a, b, d) {
            for (var h = a.substring(d, d + Math.floor(a.length / 4)), g = -1, m = "", l, r, w, K; - 1 != (g = b.indexOf(h, g + 1));) {
                var V = n.diff_commonPrefix(a.substring(d), b.substring(g)),
                    O = n.diff_commonSuffix(a.substring(0, d), b.substring(0, g));
                m.length < O + V && (m = b.substring(g - O, g) + b.substring(g, g + V), l = a.substring(0, d - O), r = a.substring(d + V), w = b.substring(0,
                    g - O), K = b.substring(g + V))
            }
            return 2 * m.length >= a.length ? [l, r, w, K, m] : null
        }
        if (0 >= this.Diff_Timeout) return null;
        var b = d.length > g.length ? d : g,
            h = d.length > g.length ? g : d;
        if (4 > b.length || 2 * h.length < b.length) return null;
        var n = this,
            l = a(b, h, Math.ceil(b.length / 4)),
            b = a(b, h, Math.ceil(b.length / 2)),
            w;
        if (!l && !b) return null;
        w = b ? l ? l[4].length > b[4].length ? l : b : b : l;
        var r;
        d.length > g.length ? (l = w[0], b = w[1], h = w[2], r = w[3]) : (h = w[0], r = w[1], l = w[2], b = w[3]);
        w = w[4];
        return [l, b, h, r, w]
    };


    g.prototype.diff_cleanupSemantic = function(d) {
        for (var g = !1, a = [], b = 0, h = null, n = 0, l = 0, w = 0, r = 0, t = 0; n < d.length;) 0 == d[n][0] ? (a[b++] = n, l = r, w = t, t = r = 0, h = d[n][1]) : (1 == d[n][0] ? r += d[n][1].length : t += d[n][1].length, h && h.length <= Math.max(l, w) && h.length <= Math.max(r, t) && (d.splice(a[b - 1], 0, [-1, h]), d[a[b - 1] + 1][0] = 1, b--, b--, n = 0 < b ? a[b - 1] : -1, t = r = w = l = 0, h = null, g = !0)), n++;
        g && this.diff_cleanupMerge(d);
        this.diff_cleanupSemanticLossless(d);
        for (n = 1; n < d.length;) {
            if (-1 == d[n - 1][0] && 1 == d[n][0]) {
                g = d[n - 1][1];
                a = d[n][1];
                b = this.diff_commonOverlap_(g, a);
                h = this.diff_commonOverlap_(a, g);
                if (b >=
                    h) {
                    if (b >= g.length / 2 || b >= a.length / 2) d.splice(n, 0, [0, a.substring(0, b)]), d[n - 1][1] = g.substring(0, g.length - b), d[n + 1][1] = a.substring(b), n++
                } else if (h >= g.length / 2 || h >= a.length / 2) d.splice(n, 0, [0, g.substring(0, h)]), d[n - 1][0] = 1, d[n - 1][1] = a.substring(0, a.length - h), d[n + 1][0] = -1, d[n + 1][1] = g.substring(h), n++;
                n++
            }
            n++
        }
    };


    g.prototype.diff_cleanupSemanticLossless = function(d) {
        function m(a, b) {
            if (!a || !b) return 6;
            var d = a.charAt(a.length - 1),
                h = b.charAt(0),
                l = d.match(g.nonAlphaNumericRegex_),
                m = h.match(g.nonAlphaNumericRegex_),
                n = l && d.match(g.whitespaceRegex_),
                t = m && h.match(g.whitespaceRegex_),
                d = n && d.match(g.linebreakRegex_),
                h = t && h.match(g.linebreakRegex_),
                r = d && a.match(g.blanklineEndRegex_),
                w = h && b.match(g.blanklineStartRegex_);
            return r || w ? 5 : d || h ? 4 : l && !n && t ? 3 : n || t ? 2 : l || m ? 1 : 0
        }
        for (var a = 1; a < d.length - 1;) {
            if (0 == d[a - 1][0] && 0 == d[a + 1][0]) {
                var b = d[a - 1][1],
                    h = d[a][1],
                    n = d[a + 1][1],
                    l = this.diff_commonSuffix(b, h);
                if (l) var w = h.substring(h.length - l),
                    b = b.substring(0, b.length - l),
                    h = w + h.substring(0, h.length - l),
                    n = w + n;
                for (var l = b, w = h, r = n, t = m(b,
                        h) + m(h, n); h.charAt(0) === n.charAt(0);) {
                    var b = b + h.charAt(0),
                        h = h.substring(1) + n.charAt(0),
                        n = n.substring(1),
                        D = m(b, h) + m(h, n);
                    D >= t && (t = D, l = b, w = h, r = n)
                }
                d[a - 1][1] != l && (l ? d[a - 1][1] = l : (d.splice(a - 1, 1), a--), d[a][1] = w, r ? d[a + 1][1] = r : (d.splice(a + 1, 1), a--))
            }
            a++
        }
    };
    g.nonAlphaNumericRegex_ = /[^a-zA-Z0-9]/;
    g.whitespaceRegex_ = /\s/;
    g.linebreakRegex_ = /[\r\n]/;
    g.blanklineEndRegex_ = /\n\r?\n$/;
    g.blanklineStartRegex_ = /^\r?\n\r?\n/;


    g.prototype.diff_cleanupEfficiency = function(d) {
        for (var g = !1, a = [], b = 0, h = null, n = 0, l = !1, w = !1, r = !1,
                t = !1; n < d.length;) {
            if (0 == d[n][0]) d[n][1].length < this.Diff_EditCost && (r || t) ? (a[b++] = n, l = r, w = t, h = d[n][1]) : (b = 0, h = null), r = t = !1;
            else if (-1 == d[n][0] ? t = !0 : r = !0, h && (l && w && r && t || h.length < this.Diff_EditCost / 2 && 3 == l + w + r + t)) d.splice(a[b - 1], 0, [-1, h]), d[a[b - 1] + 1][0] = 1, b--, h = null, l && w ? (r = t = !0, b = 0) : (b--, n = 0 < b ? a[b - 1] : -1, r = t = !1), g = !0;
            n++
        }
        g && this.diff_cleanupMerge(d)
    };


    g.prototype.diff_cleanupMerge = function(d) {
        d.push([0, ""]);
        for (var g = 0, a = 0, b = 0, h = "", n = "", l; g < d.length;) switch (d[g][0]) {
            case 1:
                b++;
                n += d[g][1];
                g++;
                break;
            case -1:
                a++;
                h += d[g][1];
                g++;
                break;
            case 0:
                1 < a + b ? (0 !== a && 0 !== b && (l = this.diff_commonPrefix(n, h), 0 !== l && (0 < g - a - b && 0 == d[g - a - b - 1][0] ? d[g - a - b - 1][1] += n.substring(0, l) : (d.splice(0, 0, [0, n.substring(0, l)]), g++), n = n.substring(l), h = h.substring(l)), l = this.diff_commonSuffix(n, h), 0 !== l && (d[g][1] = n.substring(n.length - l) + d[g][1], n = n.substring(0, n.length - l), h = h.substring(0, h.length - l))), 0 === a ? d.splice(g - b, a + b, [1, n]) : 0 === b ? d.splice(g - a, a + b, [-1, h]) : d.splice(g - a - b, a + b, [-1, h], [1, n]), g = g - a - b + (a ? 1 : 0) + (b ? 1 : 0) + 1) : 0 !== g && 0 ==
                    d[g - 1][0] ? (d[g - 1][1] += d[g][1], d.splice(g, 1)) : g++, a = b = 0, n = h = ""
        }
        "" === d[d.length - 1][1] && d.pop();
        a = !1;
        for (g = 1; g < d.length - 1;) 0 == d[g - 1][0] && 0 == d[g + 1][0] && (d[g][1].substring(d[g][1].length - d[g - 1][1].length) == d[g - 1][1] ? (d[g][1] = d[g - 1][1] + d[g][1].substring(0, d[g][1].length - d[g - 1][1].length), d[g + 1][1] = d[g - 1][1] + d[g + 1][1], d.splice(g - 1, 1), a = !0) : d[g][1].substring(0, d[g + 1][1].length) == d[g + 1][1] && (d[g - 1][1] += d[g + 1][1], d[g][1] = d[g][1].substring(d[g + 1][1].length) + d[g + 1][1], d.splice(g + 1, 1), a = !0)), g++;
        a && this.diff_cleanupMerge(d)
    };


    g.prototype.diff_xIndex = function(d, g) {
        var a = 0,
            b = 0,
            h = 0,
            n = 0,
            l;
        for (l = 0; l < d.length; l++) {
            1 !== d[l][0] && (a += d[l][1].length); - 1 !== d[l][0] && (b += d[l][1].length);
            if (a > g) break;
            h = a;
            n = b
        }
        return d.length != l && -1 === d[l][0] ? n : n + (g - h)
    };


    g.prototype.diff_prettyHtml = function(d) {
        for (var g = [], a = /&/g, b = /</g, h = />/g, n = /\n/g, l = 0; l < d.length; l++) {
            var w = d[l][0],
                r = d[l][1],
                r = r.replace(a, "&amp;").replace(b, "&lt;").replace(h, "&gt;").replace(n, "&para;<br>");
            switch (w) {
                case 1:
                    g[l] = '<ins style="background:#e6ffe6;">' + r + "</ins>";
                    break;
                case -1:
                    g[l] =
                        '<del style="background:#ffe6e6;">' + r + "</del>";
                    break;
                case 0:
                    g[l] = "<span>" + r + "</span>"
            }
        }
        return g.join("")
    };


    g.prototype.diff_text1 = function(d) {
        for (var g = [], a = 0; a < d.length; a++) 1 !== d[a][0] && (g[a] = d[a][1]);
        return g.join("")
    };


    g.prototype.diff_text2 = function(d) {
        for (var g = [], a = 0; a < d.length; a++) - 1 !== d[a][0] && (g[a] = d[a][1]);
        return g.join("")
    };


    g.prototype.diff_levenshtein = function(d) {
        for (var g = 0, a = 0, b = 0, h = 0; h < d.length; h++) {
            var n = d[h][1];
            switch (d[h][0]) {
                case 1:
                    a += n.length;
                    break;
                case -1:
                    b += n.length;
                    break;
                case 0:
                    g +=
                        Math.max(a, b), b = a = 0
            }
        }
        return g + Math.max(a, b)
    };


    g.prototype.diff_toDelta = function(d) {
        for (var g = [], a = 0; a < d.length; a++) switch (d[a][0]) {
            case 1:
                g[a] = "+" + encodeURI(d[a][1]);
                break;
            case -1:
                g[a] = "-" + d[a][1].length;
                break;
            case 0:
                g[a] = "=" + d[a][1].length
        }
        return g.join("\t").replace(/%20/g, " ")
    };


    g.prototype.diff_fromDelta = function(d, g) {
        for (var a = [], b = 0, h = 0, n = g.split(/\t/g), l = 0; l < n.length; l++) {
            var w = n[l].substring(1);
            switch (n[l].charAt(0)) {
                case "+":
                    try {
                        a[b++] = [1, decodeURI(w)]
                    } catch (t) {
                        throw Error("Illegal escape in diff_fromDelta: " +
                            w);
                    }
                    break;
                case "-":
                case "=":
                    var r = parseInt(w, 10);
                    if (isNaN(r) || 0 > r) throw Error("Invalid number in diff_fromDelta: " + w);
                    w = d.substring(h, h += r);
                    "=" == n[l].charAt(0) ? a[b++] = [0, w] : a[b++] = [-1, w];
                    break;
                default:
                    if (n[l]) throw Error("Invalid diff operation in diff_fromDelta: " + n[l]);
            }
        }
        if (h != d.length) throw Error("Delta length (" + h + ") does not equal source text length (" + d.length + ").");
        return a
    };


    g.prototype.match_main = function(d, g, a) {
        if (null == d || null == g || null == a) throw Error("Null input. (match_main)");
        a = Math.max(0,
            Math.min(a, d.length));
        return d == g ? 0 : d.length ? d.substring(a, a + g.length) == g ? a : this.match_bitap_(d, g, a) : -1
    };


    g.prototype.match_bitap_ = function(d, g, a) {
        function b(b, d) {
            var h = b / g.length,
                l = Math.abs(a - d);
            return n.Match_Distance ? h + l / n.Match_Distance : l ? 1 : h
        }
        if (g.length > this.Match_MaxBits) throw Error("Pattern too long for this browser.");
        var h = this.match_alphabet_(g),
            n = this,
            l = this.Match_Threshold,
            w = d.indexOf(g, a); - 1 != w && (l = Math.min(b(0, w), l), w = d.lastIndexOf(g, a + g.length), -1 != w && (l = Math.min(b(0, w), l)));
        for (var r =
                1 << g.length - 1, w = -1, t, D, x = g.length + d.length, G, J = 0; J < g.length; J++) {
            t = 0;
            for (D = x; t < D;) b(J, a + D) <= l ? t = D : x = D, D = Math.floor((x - t) / 2 + t);
            x = D;
            t = Math.max(1, a - D + 1);
            var B = Math.min(a + D, d.length) + g.length;
            D = Array(B + 2);
            for (D[B + 1] = (1 << J) - 1; B >= t; B--) {
                var A = h[d.charAt(B - 1)];
                D[B] = 0 === J ? (D[B + 1] << 1 | 1) & A : (D[B + 1] << 1 | 1) & A | (G[B + 1] | G[B]) << 1 | 1 | G[B + 1];
                if (D[B] & r && (A = b(J, B - 1), A <= l))
                    if (l = A, w = B - 1, w > a) t = Math.max(1, 2 * a - w);
                    else break
            }
            if (b(J + 1, a) > l) break;
            G = D
        }
        return w
    };


    g.prototype.match_alphabet_ = function(d) {
        for (var g = {}, a = 0; a < d.length; a++) g[d.charAt(a)] =
            0;
        for (a = 0; a < d.length; a++) g[d.charAt(a)] |= 1 << d.length - a - 1;
        return g
    };


    g.prototype.patch_addContext_ = function(d, g) {
        if (0 != g.length) {
            for (var a = g.substring(d.start2, d.start2 + d.length1), b = 0; g.indexOf(a) != g.lastIndexOf(a) && a.length < this.Match_MaxBits - this.Patch_Margin - this.Patch_Margin;) b += this.Patch_Margin, a = g.substring(d.start2 - b, d.start2 + d.length1 + b);
            b += this.Patch_Margin;
            (a = g.substring(d.start2 - b, d.start2)) && d.diffs.unshift([0, a]);
            (b = g.substring(d.start2 + d.length1, d.start2 + d.length1 + b)) && d.diffs.push([0,
                b
            ]);
            d.start1 -= a.length;
            d.start2 -= a.length;
            d.length1 += a.length + b.length;
            d.length2 += a.length + b.length
        }
    };


    g.prototype.patch_make = function(d, m, a) {
        var b;
        if ("string" == typeof d && "string" == typeof m && "undefined" == typeof a) b = d, m = this.diff_main(b, m, !0), 2 < m.length && (this.diff_cleanupSemantic(m), this.diff_cleanupEfficiency(m));
        else if (d && "object" == typeof d && "undefined" == typeof m && "undefined" == typeof a) m = d, b = this.diff_text1(m);
        else if ("string" == typeof d && m && "object" == typeof m && "undefined" == typeof a) b = d;
        else if ("string" ==
            typeof d && "string" == typeof m && a && "object" == typeof a) b = d, m = a;
        else throw Error("Unknown call format to patch_make.");
        if (0 === m.length) return [];
        a = [];
        d = new g.patch_obj;
        for (var h = 0, n = 0, l = 0, w = b, r = 0; r < m.length; r++) {
            var t = m[r][0],
                D = m[r][1];
            !h && 0 !== t && (d.start1 = n, d.start2 = l);
            switch (t) {
                case 1:
                    d.diffs[h++] = m[r];
                    d.length2 += D.length;
                    b = b.substring(0, l) + D + b.substring(l);
                    break;
                case -1:
                    d.length1 += D.length;
                    d.diffs[h++] = m[r];
                    b = b.substring(0, l) + b.substring(l + D.length);
                    break;
                case 0:
                    D.length <= 2 * this.Patch_Margin && h && m.length !=
                        r + 1 ? (d.diffs[h++] = m[r], d.length1 += D.length, d.length2 += D.length) : D.length >= 2 * this.Patch_Margin && h && (this.patch_addContext_(d, w), a.push(d), d = new g.patch_obj, h = 0, w = b, n = l)
            }
            1 !== t && (n += D.length); - 1 !== t && (l += D.length)
        }
        h && (this.patch_addContext_(d, w), a.push(d));
        return a
    };


    g.prototype.patch_deepCopy = function(d) {
        for (var m = [], a = 0; a < d.length; a++) {
            var b = d[a],
                h = new g.patch_obj;
            h.diffs = [];
            for (var n = 0; n < b.diffs.length; n++) h.diffs[n] = b.diffs[n].slice();
            h.start1 = b.start1;
            h.start2 = b.start2;
            h.length1 = b.length1;
            h.length2 =
                b.length2;
            m[a] = h
        }
        return m
    };


    g.prototype.patch_apply = function(d, g) {
        if (0 == d.length) return [g, []];
        d = this.patch_deepCopy(d);
        var a = this.patch_addPadding(d);
        g = a + g + a;
        this.patch_splitMax(d);
        for (var b = 0, h = [], n = 0; n < d.length; n++) {
            var l = d[n].start2 + b,
                w = this.diff_text1(d[n].diffs),
                r, t = -1;
            if (w.length > this.Match_MaxBits) {
                if (r = this.match_main(g, w.substring(0, this.Match_MaxBits), l), -1 != r && (t = this.match_main(g, w.substring(w.length - this.Match_MaxBits), l + w.length - this.Match_MaxBits), -1 == t || r >= t)) r = -1
            } else r = this.match_main(g,
                w, l);
            if (-1 == r) h[n] = !1, b -= d[n].length2 - d[n].length1;
            else if (h[n] = !0, b = r - l, l = -1 == t ? g.substring(r, r + w.length) : g.substring(r, t + this.Match_MaxBits), w == l) g = g.substring(0, r) + this.diff_text2(d[n].diffs) + g.substring(r + w.length);
            else if (l = this.diff_main(w, l, !1), w.length > this.Match_MaxBits && this.diff_levenshtein(l) / w.length > this.Patch_DeleteThreshold) h[n] = !1;
            else {
                this.diff_cleanupSemanticLossless(l);
                for (var w = 0, D, t = 0; t < d[n].diffs.length; t++) {
                    var x = d[n].diffs[t];
                    0 !== x[0] && (D = this.diff_xIndex(l, w));
                    1 === x[0] ? g =
                        g.substring(0, r + D) + x[1] + g.substring(r + D) : -1 === x[0] && (g = g.substring(0, r + D) + g.substring(r + this.diff_xIndex(l, w + x[1].length))); - 1 !== x[0] && (w += x[1].length)
                }
            }
        }
        g = g.substring(a.length, g.length - a.length);
        return [g, h]
    };


    g.prototype.patch_addPadding = function(d) {
        for (var g = this.Patch_Margin, a = "", b = 1; b <= g; b++) a += String.fromCharCode(b);
        for (b = 0; b < d.length; b++) d[b].start1 += g, d[b].start2 += g;
        var b = d[0],
            h = b.diffs;
        if (0 == h.length || 0 != h[0][0]) h.unshift([0, a]), b.start1 -= g, b.start2 -= g, b.length1 += g, b.length2 += g;
        else if (g > h[0][1].length) {
            var n =
                g - h[0][1].length;
            h[0][1] = a.substring(h[0][1].length) + h[0][1];
            b.start1 -= n;
            b.start2 -= n;
            b.length1 += n;
            b.length2 += n
        }
        b = d[d.length - 1];
        h = b.diffs;
        0 == h.length || 0 != h[h.length - 1][0] ? (h.push([0, a]), b.length1 += g, b.length2 += g) : g > h[h.length - 1][1].length && (n = g - h[h.length - 1][1].length, h[h.length - 1][1] += a.substring(0, n), b.length1 += n, b.length2 += n);
        return a
    };


    g.prototype.patch_splitMax = function(d) {
        for (var m = this.Match_MaxBits, a = 0; a < d.length; a++)
            if (!(d[a].length1 <= m)) {
                var b = d[a];
                d.splice(a--, 1);
                for (var h = b.start1, n = b.start2,
                        l = ""; 0 !== b.diffs.length;) {
                    var w = new g.patch_obj,
                        r = !0;
                    w.start1 = h - l.length;
                    w.start2 = n - l.length;
                    for ("" !== l && (w.length1 = w.length2 = l.length, w.diffs.push([0, l])); 0 !== b.diffs.length && w.length1 < m - this.Patch_Margin;) {
                        var l = b.diffs[0][0],
                            t = b.diffs[0][1];
                        1 === l ? (w.length2 += t.length, n += t.length, w.diffs.push(b.diffs.shift()), r = !1) : -1 === l && 1 == w.diffs.length && 0 == w.diffs[0][0] && t.length > 2 * m ? (w.length1 += t.length, h += t.length, r = !1, w.diffs.push([l, t]), b.diffs.shift()) : (t = t.substring(0, m - w.length1 - this.Patch_Margin), w.length1 +=
                            t.length, h += t.length, 0 === l ? (w.length2 += t.length, n += t.length) : r = !1, w.diffs.push([l, t]), t == b.diffs[0][1] ? b.diffs.shift() : b.diffs[0][1] = b.diffs[0][1].substring(t.length))
                    }
                    l = this.diff_text2(w.diffs);
                    l = l.substring(l.length - this.Patch_Margin);
                    t = this.diff_text1(b.diffs).substring(0, this.Patch_Margin);
                    "" !== t && (w.length1 += t.length, w.length2 += t.length, 0 !== w.diffs.length && 0 === w.diffs[w.diffs.length - 1][0] ? w.diffs[w.diffs.length - 1][1] += t : w.diffs.push([0, t]));
                    r || d.splice(++a, 0, w)
                }
            }
    };


    g.prototype.patch_toText = function(d) {
        for (var g = [], a = 0; a < d.length; a++) g[a] = d[a];
        return g.join("")
    };


    g.prototype.patch_fromText = function(d) {
        var m = [];
        if (!d) return m;
        d = d.split("\n");
        for (var a = 0, b = /^@@ -(\d+),?(\d*) \+(\d+),?(\d*) @@$/; a < d.length;) {
            var h = d[a].match(b);
            if (!h) throw Error("Invalid patch string: " + d[a]);
            var n = new g.patch_obj;
            m.push(n);
            n.start1 = parseInt(h[1], 10);
            "" === h[2] ? (n.start1--, n.length1 = 1) : "0" == h[2] ? n.length1 = 0 : (n.start1--, n.length1 = parseInt(h[2], 10));
            n.start2 = parseInt(h[3], 10);
            "" === h[4] ? (n.start2--, n.length2 = 1) : "0" == h[4] ? n.length2 =
                0 : (n.start2--, n.length2 = parseInt(h[4], 10));
            for (a++; a < d.length;) {
                h = d[a].charAt(0);
                try {
                    var l = decodeURI(d[a].substring(1))
                } catch (w) {
                    throw Error("Illegal escape in patch_fromText: " + l);
                }
                if ("-" == h) n.diffs.push([-1, l]);
                else if ("+" == h) n.diffs.push([1, l]);
                else if (" " == h) n.diffs.push([0, l]);
                else if ("@" == h) break;
                else if ("" !== h) throw Error('Invalid patch mode "' + h + '" in: ' + l);
                a++
            }
        }
        return m
    };
    g.patch_obj = function() {
        this.diffs = [];
        this.start2 = this.start1 = null;
        this.length2 = this.length1 = 0
    };
    g.patch_obj.prototype.toString =
        function() {
            var d, g;
            d = 0 === this.length1 ? this.start1 + ",0" : 1 == this.length1 ? this.start1 + 1 : this.start1 + 1 + "," + this.length1;
            g = 0 === this.length2 ? this.start2 + ",0" : 1 == this.length2 ? this.start2 + 1 : this.start2 + 1 + "," + this.length2;
            d = ["@@ -" + d + " +" + g + " @@\n"];
            var a;
            for (g = 0; g < this.diffs.length; g++) {
                switch (this.diffs[g][0]) {
                    case 1:
                        a = "+";
                        break;
                    case -1:
                        a = "-";
                        break;
                    case 0:
                        a = " "
                }
                d[g + 1] = a + encodeURI(this.diffs[g][1]) + "\n"
            }
            return d.join("").replace(/%20/g, " ")
        };
    this.diff_match_patch = g;
    this.DIFF_DELETE = -1;
    this.DIFF_INSERT = 1;
    this.DIFF_EQUAL = 0
})();

(function e$$0(d, m, a) {
    function b(l, n) {
        if (!m[l]) {
            if (!d[l]) {
                var r = "function" == typeof require && require;
                if (!n && r) return r(l, !0);
                if (h) return h(l, !0);
                throw Error("Cannot find module '" + l + "'");
            }
            r = m[l] = {
                exports: {}
            };
            d[l][0].call(r.exports, function(a) {
                var h = d[l][1][a];
                return b(h ? h : a)
            }, r, r.exports, e$$0, d, m, a)
        }
        return m[l].exports
    }
    for (var h = "function" == typeof require && require, n = 0; n < a.length; n++) b(a[n]);
    return b
})({
    1: [function(g, d, m) {
        window.Range = g("xpath-range/lib/range.js")
    }, {
        "xpath-range/lib/range.js": 2
    }],
    2: [function(g,
        d, m) {
        (function() {
            var a, b, h, n, l = function(a, b) {
                    function d() {
                        this.constructor = a
                    }
                    for (var g in b) m.call(b, g) && (a[g] = b[g]);
                    d.prototype = b.prototype;
                    a.prototype = new d;
                    a.__super__ = b.prototype;
                    return a
                },
                m = {}.hasOwnProperty;
            n = g("./xpath");
            h = g("./util");
            a = g("jquery");
            b = {
                sniff: function(a) {
                    return null != a.commonAncestorContainer ? new b.BrowserRange(a) : "string" === typeof a.start ? new b.SerializedRange(a) : a.start && "object" === typeof a.start ? new b.NormalizedRange(a) : !1
                }
            };
            b.RangeError = function(a) {
                function b(a, d, g) {
                    this.type =
                        a;
                    this.message = d;
                    this.parent = null != g ? g : null;
                    b.__super__.constructor.call(this, this.message)
                }
                l(b, a);
                return b
            }(Error);
            b.BrowserRange = function() {
                function a(b) {
                    this.commonAncestorContainer = b.commonAncestorContainer;
                    this.startContainer = b.startContainer;
                    this.startOffset = b.startOffset;
                    this.endContainer = b.endContainer;
                    this.endOffset = b.endOffset
                }
                a.prototype.normalize = function(a) {
                    var d, g;
                    if (this.tainted) return !1;
                    this.tainted = !0;
                    g = {};
                    this._normalizeStart(g);
                    this._normalizeEnd(g);
                    a = {};
                    if (0 < g.startOffset)
                        if (g.start.nodeValue.length >
                            g.startOffset) a.start = g.start.splitText(g.startOffset);
                        else {
                            for (d = g.start; !d.nextSibling;) d = d.parentNode;
                            a.start = d.nextSibling
                        }
                    else a.start = g.start;
                    g.start === g.end ? (a.start.nodeValue.length > g.endOffset - g.startOffset && a.start.splitText(g.endOffset - g.startOffset), a.end = a.start) : (g.end.nodeValue.length > g.endOffset && g.end.splitText(g.endOffset), a.end = g.end);
                    for (a.commonAncestor = this.commonAncestorContainer; a.commonAncestor.nodeType !== h.NodeTypes.ELEMENT_NODE;) a.commonAncestor = a.commonAncestor.parentNode;
                    return new b.NormalizedRange(a)
                };
                a.prototype._normalizeStart = function(a) {
                    if (this.startContainer.nodeType === h.NodeTypes.ELEMENT_NODE) return a.start = h.getFirstTextNodeNotBefore(this.startContainer.childNodes[this.startOffset]), a.startOffset = 0;
                    a.start = this.startContainer;
                    return a.startOffset = this.startOffset
                };
                a.prototype._normalizeEnd = function(a) {
                    var b;
                    if (this.endContainer.nodeType === h.NodeTypes.ELEMENT_NODE) {
                        b = this.endContainer.childNodes[this.endOffset];
                        if (null != b) {
                            for (; null != b && b.nodeType !== h.NodeTypes.TEXT_NODE;) b =
                                b.firstChild;
                            null != b && (a.end = b, a.endOffset = 0)
                        }
                        if (null == a.end) return b = this.endOffset ? this.endContainer.childNodes[this.endOffset - 1] : this.endContainer.previousSibling, a.end = h.getLastTextNodeUpTo(b), a.endOffset = a.end.nodeValue.length
                    } else return a.end = this.endContainer, a.endOffset = this.endOffset
                };
                a.prototype.serialize = function(a, b) {
                    return this.normalize(a).serialize(a, b)
                };
                return a
            }();
            b.NormalizedRange = function() {
                function d(a) {
                    this.commonAncestor = a.commonAncestor;
                    this.start = a.start;
                    this.end = a.end
                }
                d.prototype.normalize =
                    function(a) {
                        return this
                    };
                d.prototype.limit = function(b) {
                    var d, g, h, l;
                    if (this.commonAncestor === b || a.contains(b, this.commonAncestor)) return this;
                    if (!a.contains(this.commonAncestor, b)) return null;
                    d = b.ownerDocument;
                    a.contains(b, this.start) || (g = d.createTreeWalker(b, NodeFilter.SHOW_TEXT), this.start = g.firstChild());
                    a.contains(b, this.end) || (g = d.createTreeWalker(b, NodeFilter.SHOW_TEXT), this.end = g.lastChild());
                    if (!this.start || !this.end) return null;
                    l = a(this.start).parents();
                    h = a(this.end).parents();
                    b = 0;
                    for (d = h.length; b <
                        d; b++)
                        if (g = h[b], -1 !== l.index(g)) {
                            this.commonAncestor = g;
                            break
                        }
                    return this
                };
                d.prototype.serialize = function(d, g) {
                    var l, m;
                    l = function(b, l) {
                        var m, x, r, G, w, O;
                        m = g ? a(b).parents(":not(" + g + ")").eq(0) : a(b).parent();
                        O = n.fromNode(m, d)[0];
                        m = h.getTextNodes(m);
                        G = m.slice(0, m.index(b));
                        m = w = 0;
                        for (x = G.length; m < x; m++) r = G[m], w += r.nodeValue.length;
                        return l ? [O, w + b.nodeValue.length] : [O, w]
                    };
                    m = l(this.start);
                    l = l(this.end, !0);
                    return new b.SerializedRange({
                        start: m[0],
                        end: l[0],
                        startOffset: m[1],
                        endOffset: l[1]
                    })
                };
                d.prototype.text =
                    function() {
                        var a, b, d, g, h;
                        g = this.textNodes();
                        h = [];
                        b = 0;
                        for (d = g.length; b < d; b++) a = g[b], h.push(a.nodeValue);
                        return h.join("")
                    };
                d.prototype.textNodes = function() {
                    var b, d;
                    d = h.getTextNodes(a(this.commonAncestor));
                    b = [d.index(this.start), d.index(this.end)];
                    return a.makeArray(d.slice(b[0], +b[1] + 1 || 9E9))
                };
                return d
            }();
            b.SerializedRange = function() {
                function d(a) {
                    this.start = a.start;
                    this.startOffset = a.startOffset;
                    this.end = a.end;
                    this.endOffset = a.endOffset
                }
                d.prototype.normalize = function(d) {
                    var g, l, m, r, w, A, E, F, K, V, O,
                        ea, la;
                    K = {};
                    V = ["start", "end"];
                    l = 0;
                    for (r = V.length; l < r; l++) {
                        F = V[l];
                        try {
                            E = n.toNode(this[F], d)
                        } catch (ta) {
                            throw d = ta, new b.RangeError(F, "Error while finding " + F + " node: " + this[F] + ": " + d, d);
                        }
                        if (!E) throw new b.RangeError(F, "Couldn't find " + F + " node: " + this[F]);
                        A = 0;
                        ea = this[F + "Offset"];
                        "end" === F && --ea;
                        O = h.getTextNodes(a(E));
                        m = 0;
                        for (w = O.length; m < w; m++)
                            if (la = O[m], A + la.nodeValue.length > ea) {
                                K[F + "Container"] = la;
                                K[F + "Offset"] = this[F + "Offset"] - A;
                                break
                            } else A += la.nodeValue.length;
                        if (null == K[F + "Offset"]) throw new b.RangeError(F +
                            "offset", "Couldn't find offset " + this[F + "Offset"] + " in element " + this[F]);
                    }
                    g = null != document.compareDocumentPosition ? function(a, b) {
                        return a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_CONTAINED_BY
                    } : function(a, b) {
                        return a.contains(b)
                    };
                    a(K.startContainer).parents().each(function() {
                        if (g(this, K.endContainer.nodeType === h.NodeTypes.TEXT_NODE ? K.endContainer.parentNode : K.endContainer)) return K.commonAncestorContainer = this, !1
                    });
                    return (new b.BrowserRange(K)).normalize(d)
                };
                d.prototype.serialize = function(a,
                    b) {
                    return this.normalize(a).serialize(a, b)
                };
                d.prototype.toObject = function() {
                    return {
                        start: this.start,
                        startOffset: this.startOffset,
                        end: this.end,
                        endOffset: this.endOffset
                    }
                };
                return d
            }();
            d.exports = b
        }).call(this)
    }, {
        "./util": 3,
        "./xpath": 4,
        jquery: 5
    }],
    3: [function(g, d, m) {
        (function() {
            var a;
            g("jquery");
            a = {
                NodeTypes: {
                    ELEMENT_NODE: 1,
                    ATTRIBUTE_NODE: 2,
                    TEXT_NODE: 3,
                    CDATA_SECTION_NODE: 4,
                    ENTITY_REFERENCE_NODE: 5,
                    ENTITY_NODE: 6,
                    PROCESSING_INSTRUCTION_NODE: 7,
                    COMMENT_NODE: 8,
                    DOCUMENT_NODE: 9,
                    DOCUMENT_TYPE_NODE: 10,
                    DOCUMENT_FRAGMENT_NODE: 11,
                    NOTATION_NODE: 12
                },
                getFirstTextNodeNotBefore: function(b) {
                    var d;
                    switch (b.nodeType) {
                        case a.NodeTypes.TEXT_NODE:
                            return b;
                        case a.NodeTypes.ELEMENT_NODE:
                            if (null != b.firstChild && (d = a.getFirstTextNodeNotBefore(b.firstChild), null != d)) return d
                    }
                    b = b.nextSibling;
                    return null != b ? a.getFirstTextNodeNotBefore(b) : null
                },
                getLastTextNodeUpTo: function(b) {
                    var d;
                    switch (b.nodeType) {
                        case a.NodeTypes.TEXT_NODE:
                            return b;
                        case a.NodeTypes.ELEMENT_NODE:
                            if (null != b.lastChild && (d = a.getLastTextNodeUpTo(b.lastChild), null != d)) return d
                    }
                    b =
                        b.previousSibling;
                    return null != b ? a.getLastTextNodeUpTo(b) : null
                },
                getTextNodes: function(a) {
                    var d;
                    d = function(a) {
                        var b;
                        b = a.ownerDocument.createTreeWalker(a, NodeFilter.SHOW_TEXT, null, !1);
                        var d;
                        for (d = []; a = b.nextNode();) d.push(a);
                        return d
                    };
                    return a.map(function() {
                        return d(this)
                    })
                },
                contains: function(a, d) {
                    var g;
                    for (g = d; null != g;) {
                        if (g === a) return !0;
                        g = g.parentNode
                    }
                    return !1
                }
            };
            d.exports = a
        }).call(this)
    }, {
        jquery: 5
    }],
    4: [function(g, d, m) {
        (function() {
            var a, b, h, m, l, w, r, t;
            a = g("jquery");
            b = g("./util");
            h = function(a, b, d) {
                var g,
                    h, l;
                null == b && (b = document);
                null == d && (d = null);
                try {
                    return document.evaluate("." + a, b, d, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue
                } catch (r) {
                    a = a.substring(1).split("/");
                    l = b;
                    b = 0;
                    for (d = a.length; b < d; b++) h = a[b], g = h.split("["), h = g[0], g = g[1], g = null != g ? parseInt((null != g ? g.split("]") : void 0)[0]) : 1, l = m(l, h.toLowerCase(), g);
                    return l
                }
            };
            r = function(d, g) {
                return d.map(function() {
                    var d, h, l;
                    l = "";
                    for (d = this;
                        (null != d ? d.nodeType : void 0) === b.NodeTypes.ELEMENT_NODE && d !== g;) h = d.tagName.replace(":", "\\:"), h = a(d.parentNode).children(h).index(d) +
                        1, h = "[" + h + "]", l = "/" + d.tagName.toLowerCase() + h + l, d = d.parentNode;
                    return l
                }).get()
            };
            t = function(a, b) {
                var d, g;
                d = function(a) {
                    var b;
                    b = l(a);
                    a = w(a);
                    return b + "[" + a + "]"
                };
                g = function(a) {
                    var g;
                    for (g = ""; a !== b;) {
                        if (null == a) throw Error("Called getPathTo on a node which was not a descendant of @rootNode. " + b);
                        g = d(a) + "/" + g;
                        a = a.parentNode
                    }
                    return g = ("/" + g).replace(/\/$/, "")
                };
                return a.map(function() {
                    return g(this)
                }).get()
            };
            m = function(a, b, d) {
                var g, h, m, n, r;
                if (!a.hasChildNodes()) throw Error("XPath error: node has no children!");
                g = a.childNodes;
                m = h = 0;
                for (n = g.length; m < n; m++)
                    if (a = g[m], r = l(a), r === b && (h += 1, h === d)) return a;
                throw Error("XPath error: wanted child not found.");
            };
            l = function(a) {
                a = a.nodeName.toLowerCase();
                switch (a) {
                    case "#text":
                        return "text()";
                    case "#comment":
                        return "comment()";
                    case "#cdata-section":
                        return "cdata-section()";
                    default:
                        return a
                }
            };
            w = function(a) {
                var b, d;
                b = 0;
                for (d = a; d;) d.nodeName === a.nodeName && (b += 1), d = d.previousSibling;
                return b
            };
            d.exports = {
                fromNode: function(a, b) {
                    var d;
                    try {
                        d = r(a, b)
                    } catch (g) {
                        d = t(a, b)
                    }
                    return d
                },
                toNode: function(b, d) {
                    var g, l, m;
                    null == d && (d = document);
                    return a.isXMLDoc(document.documentElement) ? (g = document.createNSResolver(null === document.ownerDocument ? document.documentElement : document.ownerDocument.documentElement), g = h(b, d, g), g || (b = function() {
                        var a, d, g, h;
                        g = b.split("/");
                        h = [];
                        a = 0;
                        for (d = g.length; a < d; a++)(m = g[a]) && -1 === m.indexOf(":") ? h.push(m.replace(/^([a-z]+)/, "xhtml:$1")) : h.push(m);
                        return h
                    }().join("/"), l = document.lookupNamespaceURI(null), g = function(a) {
                        return "xhtml" === a ? l : document.documentElement.getAttribute("xmlns:" +
                            a)
                    }, g = h(b, d, g)), g) : h(b, d)
                }
            }
        }).call(this)
    }, {
        "./util": 3,
        jquery: 5
    }],
    5: [function(g, d, m) {
            (function(a, b) {
                "object" === typeof d && "object" === typeof d.exports ? d.exports = a.document ? b(a, !0) : function(a) {
                    if (!a.document) throw Error("jQuery requires a window with a document");
                    return b(a)
                } : b(a)
            })("undefined" !== typeof window ? window : this, function(a, b) {
                function d(a) {
                    var b = "length" in a && a.length,
                        e = c.type(a);
                    return "function" === e || c.isWindow(a) ? !1 : 1 === a.nodeType && b ? !0 : "array" === e || 0 === b || "number" === typeof b && 0 < b && b - 1 in
                        a
                }

                function g(a, b, d) {
                    if (c.isFunction(b)) return c.grep(a, function(a, f) {
                        return !!b.call(a, f, a) !== d
                    });
                    if (b.nodeType) return c.grep(a, function(a) {
                        return a === b !== d
                    });
                    if ("string" === typeof b) {
                        if (sc.test(b)) return c.filter(b, a, d);
                        b = c.filter(b, a)
                    }
                    return c.grep(a, function(a) {
                        return 0 <= c.inArray(a, b) !== d
                    })
                }

                function l(a, c) {
                    do a = a[c]; while (a && 1 !== a.nodeType);
                    return a
                }

                function m(a) {
                    var b = db[a] = {};
                    c.each(a.match(Sa) || [], function(a, f) {
                        b[f] = !0
                    });
                    return b
                }

                function r() {
                    C.addEventListener ? (C.removeEventListener("DOMContentLoaded",
                        t, !1), a.removeEventListener("load", t, !1)) : (C.detachEvent("onreadystatechange", t), a.detachEvent("onload", t))
                }

                function t() {
                    if (C.addEventListener || "load" === event.type || "complete" === C.readyState) r(), c.ready()
                }

                function D(a, b, d) {
                    if (void 0 === d && 1 === a.nodeType)
                        if (d = "data-" + b.replace(ld, "-$1").toLowerCase(), d = a.getAttribute(d), "string" === typeof d) {
                            try {
                                d = "true" === d ? !0 : "false" === d ? !1 : "null" === d ? null : +d + "" === d ? +d : kd.test(d) ? c.parseJSON(d) : d
                            } catch (e) {}
                            c.data(a, b, d)
                        } else d = void 0;
                    return d
                }

                function x(a) {
                    for (var b in a)
                        if (("data" !==
                                b || !c.isEmptyObject(a[b])) && "toJSON" !== b) return !1;
                    return !0
                }

                function G(a, b, d, e) {
                    if (c.acceptData(a)) {
                        var g = c.expando,
                            h = a.nodeType,
                            k = h ? c.cache : a,
                            l = h ? a[g] : a[g] && g;
                        if (l && k[l] && (e || k[l].data) || void 0 !== d || "string" !== typeof b) {
                            l || (l = h ? a[g] = aa.pop() || c.guid++ : g);
                            k[l] || (k[l] = h ? {} : {
                                toJSON: c.noop
                            });
                            if ("object" === typeof b || "function" === typeof b) e ? k[l] = c.extend(k[l], b) : k[l].data = c.extend(k[l].data, b);
                            a = k[l];
                            e || (a.data || (a.data = {}), a = a.data);
                            void 0 !== d && (a[c.camelCase(b)] = d);
                            "string" === typeof b ? (d = a[b], null == d &&
                                (d = a[c.camelCase(b)])) : d = a;
                            return d
                        }
                    }
                }

                function J(a, b, d) {
                    if (c.acceptData(a)) {
                        var e, g, h = a.nodeType,
                            k = h ? c.cache : a,
                            l = h ? a[c.expando] : c.expando;
                        if (k[l]) {
                            if (b && (e = d ? k[l] : k[l].data)) {
                                c.isArray(b) ? b = b.concat(c.map(b, c.camelCase)) : b in e ? b = [b] : (b = c.camelCase(b), b = b in e ? [b] : b.split(" "));
                                for (g = b.length; g--;) delete e[b[g]];
                                if (d ? !x(e) : !c.isEmptyObject(e)) return
                            }
                            if (!d && (delete k[l].data, !x(k[l]))) return;
                            h ? c.cleanData([a], !0) : I.deleteExpando || k != k.window ? delete k[l] : k[l] = null
                        }
                    }
                }

                function B() {
                    return !0
                }

                function A() {
                    return !1
                }

                function E() {
                    try {
                        return C.activeElement
                    } catch (a) {}
                }

                function F(a) {
                    var c = za.split("|");
                    a = a.createDocumentFragment();
                    if (a.createElement)
                        for (; c.length;) a.createElement(c.pop());
                    return a
                }

                function K(a, b) {
                    var d, e, g = 0,
                        h = "undefined" !== typeof a.getElementsByTagName ? a.getElementsByTagName(b || "*") : "undefined" !== typeof a.querySelectorAll ? a.querySelectorAll(b || "*") : void 0;
                    if (!h)
                        for (h = [], d = a.childNodes || a; null != (e = d[g]); g++) !b || c.nodeName(e, b) ? h.push(e) : c.merge(h, K(e, b));
                    return void 0 === b || b && c.nodeName(a, b) ? c.merge([a],
                        h) : h
                }

                function V(a) {
                    Bc.test(a.type) && (a.defaultChecked = a.checked)
                }

                function O(a, b) {
                    return c.nodeName(a, "table") && c.nodeName(11 !== b.nodeType ? b : b.firstChild, "tr") ? a.getElementsByTagName("tbody")[0] || a.appendChild(a.ownerDocument.createElement("tbody")) : a
                }

                function ea(a) {
                    a.type = (null !== c.find.attr(a, "type")) + "/" + a.type;
                    return a
                }

                function la(a) {
                    var c = ob.exec(a.type);
                    c ? a.type = c[1] : a.removeAttribute("type");
                    return a
                }

                function ta(a, b) {
                    for (var d, e = 0; null != (d = a[e]); e++) c._data(d, "globalEval", !b || c._data(b[e], "globalEval"))
                }

                function L(a, b) {
                    if (1 === b.nodeType && c.hasData(a)) {
                        var d, e, g;
                        e = c._data(a);
                        var h = c._data(b, e),
                            k = e.events;
                        if (k)
                            for (d in delete h.handle, h.events = {}, k)
                                for (e = 0, g = k[d].length; e < g; e++) c.event.add(b, d, k[d][e]);
                        h.data && (h.data = c.extend({}, h.data))
                    }
                }

                function ma(f, b) {
                    var d, e = c(b.createElement(f)).appendTo(b.body),
                        g = a.getDefaultComputedStyle && (d = a.getDefaultComputedStyle(e[0])) ? d.display : c.css(e[0], "display");
                    e.detach();
                    return g
                }

                function T(a) {
                    var b = C,
                        d = Dc[a];
                    d || (d = ma(a, b), "none" !== d && d || (Fb = (Fb || c("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement),
                        b = (Fb[0].contentWindow || Fb[0].contentDocument).document, b.write(), b.close(), d = ma(a, b), Fb.detach()), Dc[a] = d);
                    return d
                }

                function R(a, c) {
                    return {
                        get: function() {
                            var b = a();
                            if (null != b)
                                if (b) delete this.get;
                                else return (this.get = c).apply(this, arguments)
                        }
                    }
                }

                function Ba(a, c) {
                    if (c in a) return c;
                    for (var b = c.charAt(0).toUpperCase() + c.slice(1), d = c, e = p.length; e--;)
                        if (c = p[e] + b, c in a) return c;
                    return d
                }

                function Xa(a, b) {
                    for (var d, e, g, h = [], k = 0, l = a.length; k < l; k++) e = a[k], e.style && (h[k] = c._data(e, "olddisplay"), d = e.style.display,
                        b ? (h[k] || "none" !== d || (e.style.display = ""), "" === e.style.display && ib(e) && (h[k] = c._data(e, "olddisplay", T(e.nodeName)))) : (g = ib(e), (d && "none" !== d || !g) && c._data(e, "olddisplay", g ? d : c.css(e, "display"))));
                    for (k = 0; k < l; k++) e = a[k], !e.style || b && "none" !== e.style.display && "" !== e.style.display || (e.style.display = b ? h[k] || "" : "none");
                    return a
                }

                function fb(a, c, b) {
                    return (a = Ua.exec(c)) ? Math.max(0, a[1] - (b || 0)) + (a[2] || "px") : c
                }

                function Ib(a, b, d, e, g) {
                    b = d === (e ? "border" : "content") ? 4 : "width" === b ? 1 : 0;
                    for (var h = 0; 4 > b; b += 2) "margin" ===
                        d && (h += c.css(a, d + tb[b], !0, g)), e ? ("content" === d && (h -= c.css(a, "padding" + tb[b], !0, g)), "margin" !== d && (h -= c.css(a, "border" + tb[b] + "Width", !0, g))) : (h += c.css(a, "padding" + tb[b], !0, g), "padding" !== d && (h += c.css(a, "border" + tb[b] + "Width", !0, g)));
                    return h
                }

                function Wb(a, b, d) {
                    var e = !0,
                        g = "width" === b ? a.offsetWidth : a.offsetHeight,
                        h = jb(a),
                        k = I.boxSizing && "border-box" === c.css(a, "boxSizing", !1, h);
                    if (0 >= g || null == g) {
                        g = Fa(a, b, h);
                        if (0 > g || null == g) g = a.style[b];
                        if (eb.test(g)) return g;
                        e = k && (I.boxSizingReliable() || g === a.style[b]);
                        g = parseFloat(g) || 0
                    }
                    return g + Ib(a, b, d || (k ? "border" : "content"), e, h) + "px"
                }

                function ga(a, c, b, d, e) {
                    return new ga.prototype.init(a, c, b, d, e)
                }

                function rb() {
                    setTimeout(function() {
                        Gb = void 0
                    });
                    return Gb = c.now()
                }

                function ka(a, c) {
                    var b, d = {
                            height: a
                        },
                        e = 0;
                    for (c = c ? 1 : 0; 4 > e; e += 2 - c) b = tb[e], d["margin" + b] = d["padding" + b] = a;
                    c && (d.opacity = d.width = a);
                    return d
                }

                function sb(a, c, b) {
                    for (var d, e = (va[c] || []).concat(va["*"]), g = 0, h = e.length; g < h; g++)
                        if (d = e[g].call(b, c, a)) return d
                }

                function Lb(a, b) {
                    var d, e, g, h, k;
                    for (d in a)
                        if (e = c.camelCase(d),
                            g = b[e], h = a[d], c.isArray(h) && (g = h[1], h = a[d] = h[0]), d !== e && (a[e] = h, delete a[d]), (k = c.cssHooks[e]) && "expand" in k)
                            for (d in h = k.expand(h), delete a[e], h) d in a || (a[d] = h[d], b[d] = g);
                        else b[e] = g
                }

                function xa(a, b, d) {
                    var e, g = 0,
                        h = Ha.length,
                        k = c.Deferred().always(function() {
                            delete l.elem
                        }),
                        l = function() {
                            if (e) return !1;
                            for (var c = Gb || rb(), c = Math.max(0, m.startTime + m.duration - c), b = 1 - (c / m.duration || 0), d = 0, g = m.tweens.length; d < g; d++) m.tweens[d].run(b);
                            k.notifyWith(a, [m, b, c]);
                            if (1 > b && g) return c;
                            k.resolveWith(a, [m]);
                            return !1
                        },
                        m = k.promise({
                            elem: a,
                            props: c.extend({}, b),
                            opts: c.extend(!0, {
                                specialEasing: {}
                            }, d),
                            originalProperties: b,
                            originalOptions: d,
                            startTime: Gb || rb(),
                            duration: d.duration,
                            tweens: [],
                            createTween: function(b, d) {
                                var e = c.Tween(a, m.opts, b, d, m.opts.specialEasing[b] || m.opts.easing);
                                m.tweens.push(e);
                                return e
                            },
                            stop: function(c) {
                                var b = 0,
                                    d = c ? m.tweens.length : 0;
                                if (e) return this;
                                for (e = !0; b < d; b++) m.tweens[b].run(1);
                                c ? k.resolveWith(a, [m, c]) : k.rejectWith(a, [m, c]);
                                return this
                            }
                        });
                    d = m.props;
                    for (Lb(d, m.opts.specialEasing); g < h; g++)
                        if (b =
                            Ha[g].call(m, a, d, m.opts)) return b;
                    c.map(d, sb, m);
                    c.isFunction(m.opts.start) && m.opts.start.call(a, m);
                    c.fx.timer(c.extend(l, {
                        elem: a,
                        anim: m,
                        queue: m.opts.queue
                    }));
                    return m.progress(m.opts.progress).done(m.opts.done, m.opts.complete).fail(m.opts.fail).always(m.opts.always)
                }

                function Ka(a) {
                    return function(b, d) {
                        "string" !== typeof b && (d = b, b = "*");
                        var e, g = 0,
                            h = b.toLowerCase().match(Sa) || [];
                        if (c.isFunction(d))
                            for (; e = h[g++];) "+" === e.charAt(0) ? (e = e.slice(1) || "*", (a[e] = a[e] || []).unshift(d)) : (a[e] = a[e] || []).push(d)
                    }
                }

                function u(a, b, d, e) {
                    function g(l) {
                        var m;
                        h[l] = !0;
                        c.each(a[l] || [], function(a, f) {
                            var c = f(b, d, e);
                            if ("string" === typeof c && !k && !h[c]) return b.dataTypes.unshift(c), g(c), !1;
                            if (k) return !(m = c)
                        });
                        return m
                    }
                    var h = {},
                        k = a === he;
                    return g(b.dataTypes[0]) || !h["*"] && g("*")
                }

                function Pa(a, b) {
                    var d, e, g = c.ajaxSettings.flatOptions || {};
                    for (e in b) void 0 !== b[e] && ((g[e] ? a : d || (d = {}))[e] = b[e]);
                    d && c.extend(!0, a, d);
                    return a
                }

                function gb(a, b, d, e) {
                    var g;
                    if (c.isArray(b)) c.each(b, function(c, b) {
                        d || vg.test(a) ? e(a, b) : gb(a + "[" + ("object" ===
                            typeof b ? c : "") + "]", b, d, e)
                    });
                    else if (d || "object" !== c.type(b)) e(a, b);
                    else
                        for (g in b) gb(a + "[" + g + "]", b[g], d, e)
                }

                function Lc() {
                    try {
                        return new a.XMLHttpRequest
                    } catch (f) {}
                }

                function jc(a) {
                    return c.isWindow(a) ? a : 9 === a.nodeType ? a.defaultView || a.parentWindow : !1
                }
                var aa = [],
                    P = aa.slice,
                    k = aa.concat,
                    kc = aa.push,
                    Mc = aa.indexOf,
                    lc = {},
                    gd = lc.toString,
                    oa = lc.hasOwnProperty,
                    I = {},
                    c = function(a, b) {
                        return new c.fn.init(a, b)
                    },
                    dd = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
                    rc = /^-ms-/,
                    jd = /-([\da-z])/gi,
                    Ac = function(a, c) {
                        return c.toUpperCase()
                    };
                c.fn = c.prototype = {
                    jquery: "1.11.3",
                    constructor: c,
                    selector: "",
                    length: 0,
                    toArray: function() {
                        return P.call(this)
                    },
                    get: function(a) {
                        return null != a ? 0 > a ? this[a + this.length] : this[a] : P.call(this)
                    },
                    pushStack: function(a) {
                        a = c.merge(this.constructor(), a);
                        a.prevObject = this;
                        a.context = this.context;
                        return a
                    },
                    each: function(a, b) {
                        return c.each(this, a, b)
                    },
                    map: function(a) {
                        return this.pushStack(c.map(this, function(c, b) {
                            return a.call(c, b, c)
                        }))
                    },
                    slice: function() {
                        return this.pushStack(P.apply(this, arguments))
                    },
                    first: function() {
                        return this.eq(0)
                    },
                    last: function() {
                        return this.eq(-1)
                    },
                    eq: function(a) {
                        var c = this.length;
                        a = +a + (0 > a ? c : 0);
                        return this.pushStack(0 <= a && a < c ? [this[a]] : [])
                    },
                    end: function() {
                        return this.prevObject || this.constructor(null)
                    },
                    push: kc,
                    sort: aa.sort,
                    splice: aa.splice
                };
                c.extend = c.fn.extend = function() {
                    var a, b, d, e, g, h = arguments[0] || {},
                        k = 1,
                        l = arguments.length,
                        m = !1;
                    "boolean" === typeof h && (m = h, h = arguments[k] || {}, k++);
                    "object" === typeof h || c.isFunction(h) || (h = {});
                    k === l && (h = this, k--);
                    for (; k < l; k++)
                        if (null != (g = arguments[k]))
                            for (e in g) a = h[e], d =
                                g[e], h !== d && (m && d && (c.isPlainObject(d) || (b = c.isArray(d))) ? (b ? (b = !1, a = a && c.isArray(a) ? a : []) : a = a && c.isPlainObject(a) ? a : {}, h[e] = c.extend(m, a, d)) : void 0 !== d && (h[e] = d));
                    return h
                };
                c.extend({
                    expando: "jQuery" + ("1.11.3" + Math.random()).replace(/\D/g, ""),
                    isReady: !0,
                    error: function(a) {
                        throw Error(a);
                    },
                    noop: function() {},
                    isFunction: function(a) {
                        return "function" === c.type(a)
                    },
                    isArray: Array.isArray || function(a) {
                        return "array" === c.type(a)
                    },
                    isWindow: function(a) {
                        return null != a && a == a.window
                    },
                    isNumeric: function(a) {
                        return !c.isArray(a) &&
                            0 <= a - parseFloat(a) + 1
                    },
                    isEmptyObject: function(a) {
                        for (var c in a) return !1;
                        return !0
                    },
                    isPlainObject: function(a) {
                        var b;
                        if (!a || "object" !== c.type(a) || a.nodeType || c.isWindow(a)) return !1;
                        try {
                            if (a.constructor && !oa.call(a, "constructor") && !oa.call(a.constructor.prototype, "isPrototypeOf")) return !1
                        } catch (d) {
                            return !1
                        }
                        if (I.ownLast)
                            for (b in a) return oa.call(a, b);
                        for (b in a);
                        return void 0 === b || oa.call(a, b)
                    },
                    type: function(a) {
                        return null == a ? a + "" : "object" === typeof a || "function" === typeof a ? lc[gd.call(a)] || "object" : typeof a
                    },
                    globalEval: function(f) {
                        f && c.trim(f) && (a.execScript || function(f) {
                            a.eval.call(a, f)
                        })(f)
                    },
                    camelCase: function(a) {
                        return a.replace(rc, "ms-").replace(jd, Ac)
                    },
                    nodeName: function(a, c) {
                        return a.nodeName && a.nodeName.toLowerCase() === c.toLowerCase()
                    },
                    each: function(a, c, b) {
                        var e, g = 0,
                            k = a.length;
                        e = d(a);
                        if (b)
                            if (e)
                                for (; g < k && (e = c.apply(a[g], b), !1 !== e); g++);
                            else
                                for (g in a) {
                                    if (e = c.apply(a[g], b), !1 === e) break
                                } else if (e)
                                    for (; g < k && (e = c.call(a[g], g, a[g]), !1 !== e); g++);
                                else
                                    for (g in a)
                                        if (e = c.call(a[g], g, a[g]), !1 === e) break;
                        return a
                    },
                    trim: function(a) {
                        return null == a ? "" : (a + "").replace(dd, "")
                    },
                    makeArray: function(a, b) {
                        var e = b || [];
                        null != a && (d(Object(a)) ? c.merge(e, "string" === typeof a ? [a] : a) : kc.call(e, a));
                        return e
                    },
                    inArray: function(a, c, b) {
                        var d;
                        if (c) {
                            if (Mc) return Mc.call(c, a, b);
                            d = c.length;
                            for (b = b ? 0 > b ? Math.max(0, d + b) : b : 0; b < d; b++)
                                if (b in c && c[b] === a) return b
                        }
                        return -1
                    },
                    merge: function(a, c) {
                        for (var b = +c.length, d = 0, e = a.length; d < b;) a[e++] = c[d++];
                        if (b !== b)
                            for (; void 0 !== c[d];) a[e++] = c[d++];
                        a.length = e;
                        return a
                    },
                    grep: function(a, c, b) {
                        for (var d = [], e = 0, g = a.length, h = !b; e < g; e++) b = !c(a[e], e), b !== h && d.push(a[e]);
                        return d
                    },
                    map: function(a, c, b) {
                        var e, g = 0,
                            l = a.length,
                            m = [];
                        if (d(a))
                            for (; g < l; g++) e = c(a[g], g, b), null != e && m.push(e);
                        else
                            for (g in a) e = c(a[g], g, b), null != e && m.push(e);
                        return k.apply([], m)
                    },
                    guid: 1,
                    proxy: function(a, b) {
                        var d, e;
                        "string" === typeof b && (e = a[b], b = a, a = e);
                        if (c.isFunction(a)) return d = P.call(arguments, 2), e = function() {
                            return a.apply(b || this, d.concat(P.call(arguments)))
                        }, e.guid = a.guid = a.guid || c.guid++, e
                    },
                    now: function() {
                        return +new Date
                    },
                    support: I
                });
                c.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(a, c) {
                    lc["[object " + c + "]"] = c.toLowerCase()
                });
                var Nb = function(a) {
                    function c(a, f, b, d) {
                        var e, g, h, q, k;
                        (f ? f.ownerDocument || f : V) !== M && R(f);
                        f = f || M;
                        b = b || [];
                        q = f.nodeType;
                        if ("string" !== typeof a || !a || 1 !== q && 9 !== q && 11 !== q) return b;
                        if (!d && P) {
                            if (11 !== q && (e = Sa.exec(a)))
                                if (h = e[1])
                                    if (9 === q)
                                        if ((g = f.getElementById(h)) && g.parentNode) {
                                            if (g.id === h) return b.push(g), b
                                        } else return b;
                            else {
                                if (f.ownerDocument && (g = f.ownerDocument.getElementById(h)) &&
                                    ta(f, g) && g.id === h) return b.push(g), b
                            } else {
                                if (e[2]) return fa.apply(b, f.getElementsByTagName(a)), b;
                                if ((h = e[3]) && A.getElementsByClassName) return fa.apply(b, f.getElementsByClassName(h)), b
                            }
                            if (A.qsa && (!ua || !ua.test(a))) {
                                g = e = ha;
                                h = f;
                                k = 1 !== q && a;
                                if (1 === q && "object" !== f.nodeName.toLowerCase()) {
                                    q = C(a);
                                    (e = f.getAttribute("id")) ? g = e.replace(Ta, "\\$&"): f.setAttribute("id", g);
                                    g = "[id='" + g + "'] ";
                                    for (h = q.length; h--;) q[h] = g + r(q[h]);
                                    h = Fa.test(a) && n(f.parentNode) || f;
                                    k = q.join(",")
                                }
                                if (k) try {
                                    return fa.apply(b, h.querySelectorAll(k)),
                                        b
                                } catch (v) {} finally {
                                    e || f.removeAttribute("id")
                                }
                            }
                        }
                        return K(a.replace(xa, "$1"), f, b, d)
                    }

                    function b() {
                        function a(c, b) {
                            f.push(c + " ") > y.cacheLength && delete a[f.shift()];
                            return a[c + " "] = b
                        }
                        var f = [];
                        return a
                    }

                    function d(a) {
                        a[ha] = !0;
                        return a
                    }

                    function e(a) {
                        var f = M.createElement("div");
                        try {
                            return !!a(f)
                        } catch (c) {
                            return !1
                        } finally {
                            f.parentNode && f.parentNode.removeChild(f)
                        }
                    }

                    function g(a, f) {
                        for (var c = a.split("|"), b = a.length; b--;) y.attrHandle[c[b]] = f
                    }

                    function h(a, f) {
                        var c = f && a,
                            b = c && 1 === a.nodeType && 1 === f.nodeType && (~f.sourceIndex ||
                                -2147483648) - (~a.sourceIndex || -2147483648);
                        if (b) return b;
                        if (c)
                            for (; c = c.nextSibling;)
                                if (c === f) return -1;
                        return a ? 1 : -1
                    }

                    function k(a) {
                        return function(f) {
                            return "input" === f.nodeName.toLowerCase() && f.type === a
                        }
                    }

                    function l(a) {
                        return function(f) {
                            var c = f.nodeName.toLowerCase();
                            return ("input" === c || "button" === c) && f.type === a
                        }
                    }

                    function m(a) {
                        return d(function(f) {
                            f = +f;
                            return d(function(c, b) {
                                for (var d, e = a([], c.length, f), g = e.length; g--;) c[d = e[g]] && (c[d] = !(b[d] = c[d]))
                            })
                        })
                    }

                    function n(a) {
                        return a && "undefined" !== typeof a.getElementsByTagName &&
                            a
                    }

                    function p() {}

                    function r(a) {
                        for (var f = 0, c = a.length, b = ""; f < c; f++) b += a[f].value;
                        return b
                    }

                    function t(a, f, c) {
                        var b = f.dir,
                            d = c && "parentNode" === b,
                            e = aa++;
                        return f.first ? function(f, c, e) {
                            for (; f = f[b];)
                                if (1 === f.nodeType || d) return a(f, c, e)
                        } : function(f, c, g) {
                            var h, q, k = [ma, e];
                            if (g)
                                for (; f = f[b];) {
                                    if ((1 === f.nodeType || d) && a(f, c, g)) return !0
                                } else
                                    for (; f = f[b];)
                                        if (1 === f.nodeType || d) {
                                            q = f[ha] || (f[ha] = {});
                                            if ((h = q[b]) && h[0] === ma && h[1] === e) return k[2] = h[2];
                                            q[b] = k;
                                            if (k[2] = a(f, c, g)) return !0
                                        }
                        }
                    }

                    function x(a) {
                        return 1 < a.length ?
                            function(f, c, b) {
                                for (var d = a.length; d--;)
                                    if (!a[d](f, c, b)) return !1;
                                return !0
                            } : a[0]
                    }

                    function u(a, f, c, b, d) {
                        for (var e, g = [], h = 0, q = a.length, k = null != f; h < q; h++)
                            if (e = a[h])
                                if (!c || c(e, b, d)) g.push(e), k && f.push(h);
                        return g
                    }

                    function w(a, f, b, e, g, h) {
                        e && !e[ha] && (e = w(e));
                        g && !g[ha] && (g = w(g, h));
                        return d(function(d, h, k, v) {
                            var l, z, m = [],
                                n = [],
                                p = h.length,
                                H;
                            if (!(H = d)) {
                                H = f || "*";
                                for (var N = k.nodeType ? [k] : k, r = [], t = 0, x = N.length; t < x; t++) c(H, N[t], r);
                                H = r
                            }
                            H = !a || !d && f ? H : u(H, m, a, k, v);
                            N = b ? g || (d ? a : p || e) ? [] : h : H;
                            b && b(H, N, k, v);
                            if (e)
                                for (l = u(N,
                                        n), e(l, [], k, v), k = l.length; k--;)
                                    if (z = l[k]) N[n[k]] = !(H[n[k]] = z);
                            if (d) {
                                if (g || a) {
                                    if (g) {
                                        l = [];
                                        for (k = N.length; k--;)(z = N[k]) && l.push(H[k] = z);
                                        g(null, N = [], l, v)
                                    }
                                    for (k = N.length; k--;)(z = N[k]) && -1 < (l = g ? ga(d, z) : m[k]) && (d[l] = !(h[l] = z))
                                }
                            } else N = u(N === h ? N.splice(p, N.length) : N), g ? g(null, h, N, v) : fa.apply(h, N)
                        })
                    }

                    function G(a) {
                        var f, c, b, d = a.length,
                            e = y.relative[a[0].type];
                        c = e || y.relative[" "];
                        for (var g = e ? 1 : 0, h = t(function(a) {
                                return a === f
                            }, c, !0), q = t(function(a) {
                                return -1 < ga(f, a)
                            }, c, !0), k = [function(a, c, b) {
                                a = !e && (b || c !== L) ||
                                    ((f = c).nodeType ? h(a, c, b) : q(a, c, b));
                                f = null;
                                return a
                            }]; g < d; g++)
                            if (c = y.relative[a[g].type]) k = [t(x(k), c)];
                            else {
                                c = y.filter[a[g].type].apply(null, a[g].matches);
                                if (c[ha]) {
                                    for (b = ++g; b < d && !y.relative[a[b].type]; b++);
                                    return w(1 < g && x(k), 1 < g && r(a.slice(0, g - 1).concat({
                                        value: " " === a[g - 2].type ? "*" : ""
                                    })).replace(xa, "$1"), c, g < b && G(a.slice(g, b)), b < d && G(a = a.slice(b)), b < d && r(a))
                                }
                                k.push(c)
                            }
                        return x(k)
                    }

                    function B(a, f) {
                        var b = 0 < f.length,
                            e = 0 < a.length,
                            g = function(d, g, h, k, v) {
                                var l, z, m, n = 0,
                                    H = "0",
                                    p = d && [],
                                    N = [],
                                    r = L,
                                    t = d || e && y.find.TAG("*",
                                        v),
                                    x = ma += null == r ? 1 : Math.random() || .1,
                                    Za = t.length;
                                for (v && (L = g !== M && g); H !== Za && null != (l = t[H]); H++) {
                                    if (e && l) {
                                        for (z = 0; m = a[z++];)
                                            if (m(l, g, h)) {
                                                k.push(l);
                                                break
                                            }
                                        v && (ma = x)
                                    }
                                    b && ((l = !m && l) && n--, d && p.push(l))
                                }
                                n += H;
                                if (b && H !== n) {
                                    for (z = 0; m = f[z++];) m(p, N, g, h);
                                    if (d) {
                                        if (0 < n)
                                            for (; H--;) p[H] || N[H] || (N[H] = ka.call(k));
                                        N = u(N)
                                    }
                                    fa.apply(k, N);
                                    v && !d && 0 < N.length && 1 < n + f.length && c.uniqueSort(k)
                                }
                                v && (ma = x, L = r);
                                return p
                            };
                        return b ? d(g) : g
                    }
                    var J, A, y, D, E, C, F, K, L, I, T, R, M, O, P, ua, Q, U, ta, ha = "sizzle" + 1 * new Date,
                        V = a.document,
                        ma = 0,
                        aa = 0,
                        Z = b(),
                        ba = b(),
                        da = b(),
                        ca = function(a, f) {
                            a === f && (T = !0);
                            return 0
                        },
                        ja = {}.hasOwnProperty,
                        ea = [],
                        ka = ea.pop,
                        Ba = ea.push,
                        fa = ea.push,
                        la = ea.slice,
                        ga = function(a, f) {
                            for (var c = 0, b = a.length; c < b; c++)
                                if (a[c] === f) return c;
                            return -1
                        },
                        na = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+".replace("w", "w#"),
                        wa = "\\[[\\x20\\t\\r\\n\\f]*((?:\\\\.|[\\w-]|[^\\x00-\\xa0])+)(?:[\\x20\\t\\r\\n\\f]*([*^$|!~]?=)[\\x20\\t\\r\\n\\f]*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + na + "))|)[\\x20\\t\\r\\n\\f]*\\]",
                        va = ":((?:\\\\.|[\\w-]|[^\\x00-\\xa0])+)(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" +
                        wa + ")*)|.*)\\)|)",
                        Xa = /[\x20\t\r\n\f]+/g,
                        xa = /^[\x20\t\r\n\f]+|((?:^|[^\\])(?:\\.)*)[\x20\t\r\n\f]+$/g,
                        Ga = /^[\x20\t\r\n\f]*,[\x20\t\r\n\f]*/,
                        Ha = /^[\x20\t\r\n\f]*([>+~]|[\x20\t\r\n\f])[\x20\t\r\n\f]*/,
                        Ia = /=[\x20\t\r\n\f]*([^\]'"]*?)[\x20\t\r\n\f]*\]/g,
                        Ka = new RegExp(va),
                        Ma = new RegExp("^" + na + "$"),
                        za = {
                            ID: /^#((?:\\.|[\w-]|[^\x00-\xa0])+)/,
                            CLASS: /^\.((?:\\.|[\w-]|[^\x00-\xa0])+)/,
                            TAG: new RegExp("^(" + "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+".replace("w", "w*") + ")"),
                            ATTR: new RegExp("^" + wa),
                            PSEUDO: new RegExp("^" + va),
                            CHILD: /^:(only|first|last|nth|nth-last)-(child|of-type)(?:\([\x20\t\r\n\f]*(even|odd|(([+-]|)(\d*)n|)[\x20\t\r\n\f]*(?:([+-]|)[\x20\t\r\n\f]*(\d+)|))[\x20\t\r\n\f]*\)|)/i,
                            bool: /^(?:checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped)$/i,
                            needsContext: /^[\x20\t\r\n\f]*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\([\x20\t\r\n\f]*((?:-\d)?\d*)[\x20\t\r\n\f]*\)|)(?=[^-]|$)/i
                        },
                        Pa = /^(?:input|select|textarea|button)$/i,
                        Qa = /^h\d$/i,
                        ya =
                        /^[^{]+\{\s*\[native \w/,
                        Sa = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
                        Fa = /[+~]/,
                        Ta = /'|\\/g,
                        oa = /\\([\da-f]{1,6}[\x20\t\r\n\f]?|([\x20\t\r\n\f])|.)/ig,
                        pa = function(a, f, c) {
                            a = "0x" + f - 65536;
                            return a !== a || c ? f : 0 > a ? String.fromCharCode(a + 65536) : String.fromCharCode(a >> 10 | 55296, a & 1023 | 56320)
                        },
                        Ua = function() {
                            R()
                        };
                    try {
                        fa.apply(ea = la.call(V.childNodes), V.childNodes), ea[V.childNodes.length].nodeType
                    } catch (Sb) {
                        fa = {
                            apply: ea.length ? function(a, f) {
                                Ba.apply(a, la.call(f))
                            } : function(a, f) {
                                for (var c = a.length, b = 0; a[c++] = f[b++];);
                                a.length =
                                    c - 1
                            }
                        }
                    }
                    A = c.support = {};
                    E = c.isXML = function(a) {
                        return (a = a && (a.ownerDocument || a).documentElement) ? "HTML" !== a.nodeName : !1
                    };
                    R = c.setDocument = function(a) {
                        var f = a ? a.ownerDocument || a : V;
                        if (f === M || 9 !== f.nodeType || !f.documentElement) return M;
                        M = f;
                        O = f.documentElement;
                        (a = f.defaultView) && a !== a.top && (a.addEventListener ? a.addEventListener("unload", Ua, !1) : a.attachEvent && a.attachEvent("onunload", Ua));
                        P = !E(f);
                        A.attributes = e(function(a) {
                            a.className = "i";
                            return !a.getAttribute("className")
                        });
                        A.getElementsByTagName = e(function(a) {
                            a.appendChild(f.createComment(""));
                            return !a.getElementsByTagName("*").length
                        });
                        A.getElementsByClassName = ya.test(f.getElementsByClassName);
                        A.getById = e(function(a) {
                            O.appendChild(a).id = ha;
                            return !f.getElementsByName || !f.getElementsByName(ha).length
                        });
                        A.getById ? (y.find.ID = function(a, f) {
                            if ("undefined" !== typeof f.getElementById && P) {
                                var c = f.getElementById(a);
                                return c && c.parentNode ? [c] : []
                            }
                        }, y.filter.ID = function(a) {
                            var f = a.replace(oa, pa);
                            return function(a) {
                                return a.getAttribute("id") === f
                            }
                        }) : (delete y.find.ID, y.filter.ID = function(a) {
                            var f = a.replace(oa,
                                pa);
                            return function(a) {
                                return (a = "undefined" !== typeof a.getAttributeNode && a.getAttributeNode("id")) && a.value === f
                            }
                        });
                        y.find.TAG = A.getElementsByTagName ? function(a, f) {
                            if ("undefined" !== typeof f.getElementsByTagName) return f.getElementsByTagName(a);
                            if (A.qsa) return f.querySelectorAll(a)
                        } : function(a, f) {
                            var c, b = [],
                                d = 0,
                                e = f.getElementsByTagName(a);
                            if ("*" === a) {
                                for (; c = e[d++];) 1 === c.nodeType && b.push(c);
                                return b
                            }
                            return e
                        };
                        y.find.CLASS = A.getElementsByClassName && function(a, f) {
                            if (P) return f.getElementsByClassName(a)
                        };
                        Q = [];
                        ua = [];
                        if (A.qsa = ya.test(f.querySelectorAll)) e(function(a) {
                            O.appendChild(a).innerHTML = "<a id='" + ha + "'></a><select id='" + ha + "-\f]' msallowcapture=''><option selected=''></option></select>";
                            a.querySelectorAll("[msallowcapture^='']").length && ua.push("[*^$]=[\\x20\\t\\r\\n\\f]*(?:''|\"\")");
                            a.querySelectorAll("[selected]").length || ua.push("\\[[\\x20\\t\\r\\n\\f]*(?:value|checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped)");
                            a.querySelectorAll("[id~=" +
                                ha + "-]").length || ua.push("~=");
                            a.querySelectorAll(":checked").length || ua.push(":checked");
                            a.querySelectorAll("a#" + ha + "+*").length || ua.push(".#.+[+~]")
                        }), e(function(a) {
                            var c = f.createElement("input");
                            c.setAttribute("type", "hidden");
                            a.appendChild(c).setAttribute("name", "D");
                            a.querySelectorAll("[name=d]").length && ua.push("name[\\x20\\t\\r\\n\\f]*[*^$|!~]?=");
                            a.querySelectorAll(":enabled").length || ua.push(":enabled", ":disabled");
                            a.querySelectorAll("*,:x");
                            ua.push(",.*:")
                        });
                        (A.matchesSelector = ya.test(U =
                            O.matches || O.webkitMatchesSelector || O.mozMatchesSelector || O.oMatchesSelector || O.msMatchesSelector)) && e(function(a) {
                            A.disconnectedMatch = U.call(a, "div");
                            U.call(a, "[s!='']:x");
                            Q.push("!=", va)
                        });
                        ua = ua.length && new RegExp(ua.join("|"));
                        Q = Q.length && new RegExp(Q.join("|"));
                        ta = (a = ya.test(O.compareDocumentPosition)) || ya.test(O.contains) ? function(a, f) {
                            var c = 9 === a.nodeType ? a.documentElement : a,
                                b = f && f.parentNode;
                            return a === b || !!(b && 1 === b.nodeType && (c.contains ? c.contains(b) : a.compareDocumentPosition && a.compareDocumentPosition(b) &
                                16))
                        } : function(a, f) {
                            if (f)
                                for (; f = f.parentNode;)
                                    if (f === a) return !0;
                            return !1
                        };
                        ca = a ? function(a, c) {
                            if (a === c) return T = !0, 0;
                            var b = !a.compareDocumentPosition - !c.compareDocumentPosition;
                            if (b) return b;
                            b = (a.ownerDocument || a) === (c.ownerDocument || c) ? a.compareDocumentPosition(c) : 1;
                            return b & 1 || !A.sortDetached && c.compareDocumentPosition(a) === b ? a === f || a.ownerDocument === V && ta(V, a) ? -1 : c === f || c.ownerDocument === V && ta(V, c) ? 1 : I ? ga(I, a) - ga(I, c) : 0 : b & 4 ? -1 : 1
                        } : function(a, c) {
                            if (a === c) return T = !0, 0;
                            var b, d = 0;
                            b = a.parentNode;
                            var e =
                                c.parentNode,
                                g = [a],
                                q = [c];
                            if (!b || !e) return a === f ? -1 : c === f ? 1 : b ? -1 : e ? 1 : I ? ga(I, a) - ga(I, c) : 0;
                            if (b === e) return h(a, c);
                            for (b = a; b = b.parentNode;) g.unshift(b);
                            for (b = c; b = b.parentNode;) q.unshift(b);
                            for (; g[d] === q[d];) d++;
                            return d ? h(g[d], q[d]) : g[d] === V ? -1 : q[d] === V ? 1 : 0
                        };
                        return f
                    };
                    c.matches = function(a, f) {
                        return c(a, null, null, f)
                    };
                    c.matchesSelector = function(a, f) {
                        (a.ownerDocument || a) !== M && R(a);
                        f = f.replace(Ia, "='$1']");
                        if (!(!A.matchesSelector || !P || Q && Q.test(f) || ua && ua.test(f))) try {
                            var b = U.call(a, f);
                            if (b || A.disconnectedMatch ||
                                a.document && 11 !== a.document.nodeType) return b
                        } catch (d) {}
                        return 0 < c(f, M, null, [a]).length
                    };
                    c.contains = function(a, f) {
                        (a.ownerDocument || a) !== M && R(a);
                        return ta(a, f)
                    };
                    c.attr = function(a, f) {
                        (a.ownerDocument || a) !== M && R(a);
                        var c = y.attrHandle[f.toLowerCase()],
                            c = c && ja.call(y.attrHandle, f.toLowerCase()) ? c(a, f, !P) : void 0;
                        return void 0 !== c ? c : A.attributes || !P ? a.getAttribute(f) : (c = a.getAttributeNode(f)) && c.specified ? c.value : null
                    };
                    c.error = function(a) {
                        throw Error("Syntax error, unrecognized expression: " + a);
                    };
                    c.uniqueSort =
                        function(a) {
                            var f, c = [],
                                b = 0,
                                d = 0;
                            T = !A.detectDuplicates;
                            I = !A.sortStable && a.slice(0);
                            a.sort(ca);
                            if (T) {
                                for (; f = a[d++];) f === a[d] && (b = c.push(d));
                                for (; b--;) a.splice(c[b], 1)
                            }
                            I = null;
                            return a
                        };
                    D = c.getText = function(a) {
                        var f, c = "",
                            b = 0;
                        f = a.nodeType;
                        if (!f)
                            for (; f = a[b++];) c += D(f);
                        else if (1 === f || 9 === f || 11 === f) {
                            if ("string" === typeof a.textContent) return a.textContent;
                            for (a = a.firstChild; a; a = a.nextSibling) c += D(a)
                        } else if (3 === f || 4 === f) return a.nodeValue;
                        return c
                    };
                    y = c.selectors = {
                        cacheLength: 50,
                        createPseudo: d,
                        match: za,
                        attrHandle: {},
                        find: {},
                        relative: {
                            ">": {
                                dir: "parentNode",
                                first: !0
                            },
                            " ": {
                                dir: "parentNode"
                            },
                            "+": {
                                dir: "previousSibling",
                                first: !0
                            },
                            "~": {
                                dir: "previousSibling"
                            }
                        },
                        preFilter: {
                            ATTR: function(a) {
                                a[1] = a[1].replace(oa, pa);
                                a[3] = (a[3] || a[4] || a[5] || "").replace(oa, pa);
                                "~=" === a[2] && (a[3] = " " + a[3] + " ");
                                return a.slice(0, 4)
                            },
                            CHILD: function(a) {
                                a[1] = a[1].toLowerCase();
                                "nth" === a[1].slice(0, 3) ? (a[3] || c.error(a[0]), a[4] = +(a[4] ? a[5] + (a[6] || 1) : 2 * ("even" === a[3] || "odd" === a[3])), a[5] = +(a[7] + a[8] || "odd" === a[3])) : a[3] && c.error(a[0]);
                                return a
                            },
                            PSEUDO: function(a) {
                                var f,
                                    c = !a[6] && a[2];
                                if (za.CHILD.test(a[0])) return null;
                                a[3] ? a[2] = a[4] || a[5] || "" : c && Ka.test(c) && (f = C(c, !0)) && (f = c.indexOf(")", c.length - f) - c.length) && (a[0] = a[0].slice(0, f), a[2] = c.slice(0, f));
                                return a.slice(0, 3)
                            }
                        },
                        filter: {
                            TAG: function(a) {
                                var f = a.replace(oa, pa).toLowerCase();
                                return "*" === a ? function() {
                                    return !0
                                } : function(a) {
                                    return a.nodeName && a.nodeName.toLowerCase() === f
                                }
                            },
                            CLASS: function(a) {
                                var f = Z[a + " "];
                                return f || (f = new RegExp("(^|[\\x20\\t\\r\\n\\f])" + a + "([\\x20\\t\\r\\n\\f]|$)")) && Z(a, function(a) {
                                    return f.test("string" ===
                                        typeof a.className && a.className || "undefined" !== typeof a.getAttribute && a.getAttribute("class") || "")
                                })
                            },
                            ATTR: function(a, f, b) {
                                return function(d) {
                                    d = c.attr(d, a);
                                    if (null == d) return "!=" === f;
                                    if (!f) return !0;
                                    d += "";
                                    return "=" === f ? d === b : "!=" === f ? d !== b : "^=" === f ? b && 0 === d.indexOf(b) : "*=" === f ? b && -1 < d.indexOf(b) : "$=" === f ? b && d.slice(-b.length) === b : "~=" === f ? -1 < (" " + d.replace(Xa, " ") + " ").indexOf(b) : "|=" === f ? d === b || d.slice(0, b.length + 1) === b + "-" : !1
                                }
                            },
                            CHILD: function(a, f, c, b, d) {
                                var e = "nth" !== a.slice(0, 3),
                                    g = "last" !== a.slice(-4),
                                    h = "of-type" === f;
                                return 1 === b && 0 === d ? function(a) {
                                    return !!a.parentNode
                                } : function(f, c, q) {
                                    var k, v, l, z, m;
                                    c = e !== g ? "nextSibling" : "previousSibling";
                                    var n = f.parentNode,
                                        H = h && f.nodeName.toLowerCase();
                                    q = !q && !h;
                                    if (n) {
                                        if (e) {
                                            for (; c;) {
                                                for (v = f; v = v[c];)
                                                    if (h ? v.nodeName.toLowerCase() === H : 1 === v.nodeType) return !1;
                                                m = c = "only" === a && !m && "nextSibling"
                                            }
                                            return !0
                                        }
                                        m = [g ? n.firstChild : n.lastChild];
                                        if (g && q)
                                            for (q = n[ha] || (n[ha] = {}), k = q[a] || [], z = k[0] === ma && k[1], l = k[0] === ma && k[2], v = z && n.childNodes[z]; v = ++z && v && v[c] || (l = z = 0) || m.pop();) {
                                                if (1 ===
                                                    v.nodeType && ++l && v === f) {
                                                    q[a] = [ma, z, l];
                                                    break
                                                }
                                            } else if (q && (k = (f[ha] || (f[ha] = {}))[a]) && k[0] === ma) l = k[1];
                                            else
                                                for (;
                                                    (v = ++z && v && v[c] || (l = z = 0) || m.pop()) && ((h ? v.nodeName.toLowerCase() !== H : 1 !== v.nodeType) || !++l || (q && ((v[ha] || (v[ha] = {}))[a] = [ma, l]), v !== f)););
                                        l -= d;
                                        return l === b || 0 === l % b && 0 <= l / b
                                    }
                                }
                            },
                            PSEUDO: function(a, f) {
                                var b, e = y.pseudos[a] || y.setFilters[a.toLowerCase()] || c.error("unsupported pseudo: " + a);
                                return e[ha] ? e(f) : 1 < e.length ? (b = [a, a, "", f], y.setFilters.hasOwnProperty(a.toLowerCase()) ? d(function(a, c) {
                                    for (var b,
                                            d = e(a, f), g = d.length; g--;) b = ga(a, d[g]), a[b] = !(c[b] = d[g])
                                }) : function(a) {
                                    return e(a, 0, b)
                                }) : e
                            }
                        },
                        pseudos: {
                            not: d(function(a) {
                                var f = [],
                                    c = [],
                                    b = F(a.replace(xa, "$1"));
                                return b[ha] ? d(function(a, f, c, d) {
                                    d = b(a, null, d, []);
                                    for (var e = a.length; e--;)
                                        if (c = d[e]) a[e] = !(f[e] = c)
                                }) : function(a, d, e) {
                                    f[0] = a;
                                    b(f, null, e, c);
                                    f[0] = null;
                                    return !c.pop()
                                }
                            }),
                            has: d(function(a) {
                                return function(f) {
                                    return 0 < c(a, f).length
                                }
                            }),
                            contains: d(function(a) {
                                a = a.replace(oa, pa);
                                return function(f) {
                                    return -1 < (f.textContent || f.innerText || D(f)).indexOf(a)
                                }
                            }),
                            lang: d(function(a) {
                                Ma.test(a || "") || c.error("unsupported lang: " + a);
                                a = a.replace(oa, pa).toLowerCase();
                                return function(f) {
                                    var c;
                                    do
                                        if (c = P ? f.lang : f.getAttribute("xml:lang") || f.getAttribute("lang")) return c = c.toLowerCase(), c === a || 0 === c.indexOf(a + "-"); while ((f = f.parentNode) && 1 === f.nodeType);
                                    return !1
                                }
                            }),
                            target: function(c) {
                                var b = a.location && a.location.hash;
                                return b && b.slice(1) === c.id
                            },
                            root: function(a) {
                                return a === O
                            },
                            focus: function(a) {
                                return a === M.activeElement && (!M.hasFocus || M.hasFocus()) && !!(a.type || a.href ||
                                    ~a.tabIndex)
                            },
                            enabled: function(a) {
                                return !1 === a.disabled
                            },
                            disabled: function(a) {
                                return !0 === a.disabled
                            },
                            checked: function(a) {
                                var f = a.nodeName.toLowerCase();
                                return "input" === f && !!a.checked || "option" === f && !!a.selected
                            },
                            selected: function(a) {
                                a.parentNode && a.parentNode.selectedIndex;
                                return !0 === a.selected
                            },
                            empty: function(a) {
                                for (a = a.firstChild; a; a = a.nextSibling)
                                    if (6 > a.nodeType) return !1;
                                return !0
                            },
                            parent: function(a) {
                                return !y.pseudos.empty(a)
                            },
                            header: function(a) {
                                return Qa.test(a.nodeName)
                            },
                            input: function(a) {
                                return Pa.test(a.nodeName)
                            },
                            button: function(a) {
                                var f = a.nodeName.toLowerCase();
                                return "input" === f && "button" === a.type || "button" === f
                            },
                            text: function(a) {
                                var f;
                                return "input" === a.nodeName.toLowerCase() && "text" === a.type && (null == (f = a.getAttribute("type")) || "text" === f.toLowerCase())
                            },
                            first: m(function() {
                                return [0]
                            }),
                            last: m(function(a, f) {
                                return [f - 1]
                            }),
                            eq: m(function(a, f, c) {
                                return [0 > c ? c + f : c]
                            }),
                            even: m(function(a, f) {
                                for (var c = 0; c < f; c += 2) a.push(c);
                                return a
                            }),
                            odd: m(function(a, f) {
                                for (var c = 1; c < f; c += 2) a.push(c);
                                return a
                            }),
                            lt: m(function(a, f, c) {
                                for (f =
                                    0 > c ? c + f : c; 0 <= --f;) a.push(f);
                                return a
                            }),
                            gt: m(function(a, f, c) {
                                for (c = 0 > c ? c + f : c; ++c < f;) a.push(c);
                                return a
                            })
                        }
                    };
                    y.pseudos.nth = y.pseudos.eq;
                    for (J in {
                            radio: !0,
                            checkbox: !0,
                            file: !0,
                            password: !0,
                            image: !0
                        }) y.pseudos[J] = k(J);
                    for (J in {
                            submit: !0,
                            reset: !0
                        }) y.pseudos[J] = l(J);
                    p.prototype = y.filters = y.pseudos;
                    y.setFilters = new p;
                    C = c.tokenize = function(a, f) {
                        var b, d, e, g, h, k, v;
                        if (h = ba[a + " "]) return f ? 0 : h.slice(0);
                        h = a;
                        k = [];
                        for (v = y.preFilter; h;) {
                            if (!b || (d = Ga.exec(h))) d && (h = h.slice(d[0].length) || h), k.push(e = []);
                            b = !1;
                            if (d = Ha.exec(h)) b =
                                d.shift(), e.push({
                                    value: b,
                                    type: d[0].replace(xa, " ")
                                }), h = h.slice(b.length);
                            for (g in y.filter) !(d = za[g].exec(h)) || v[g] && !(d = v[g](d)) || (b = d.shift(), e.push({
                                value: b,
                                type: g,
                                matches: d
                            }), h = h.slice(b.length));
                            if (!b) break
                        }
                        return f ? h.length : h ? c.error(a) : ba(a, k).slice(0)
                    };
                    F = c.compile = function(a, f) {
                        var c, b = [],
                            d = [],
                            e = da[a + " "];
                        if (!e) {
                            f || (f = C(a));
                            for (c = f.length; c--;) e = G(f[c]), e[ha] ? b.push(e) : d.push(e);
                            e = da(a, B(d, b));
                            e.selector = a
                        }
                        return e
                    };
                    K = c.select = function(a, f, c, b) {
                        var d, e, g, h, q = "function" === typeof a && a,
                            k = !b &&
                            C(a = q.selector || a);
                        c = c || [];
                        if (1 === k.length) {
                            e = k[0] = k[0].slice(0);
                            if (2 < e.length && "ID" === (g = e[0]).type && A.getById && 9 === f.nodeType && P && y.relative[e[1].type]) {
                                f = (y.find.ID(g.matches[0].replace(oa, pa), f) || [])[0];
                                if (!f) return c;
                                q && (f = f.parentNode);
                                a = a.slice(e.shift().value.length)
                            }
                            for (d = za.needsContext.test(a) ? 0 : e.length; d--;) {
                                g = e[d];
                                if (y.relative[h = g.type]) break;
                                if (h = y.find[h])
                                    if (b = h(g.matches[0].replace(oa, pa), Fa.test(e[0].type) && n(f.parentNode) || f)) {
                                        e.splice(d, 1);
                                        a = b.length && r(e);
                                        if (!a) return fa.apply(c,
                                            b), c;
                                        break
                                    }
                            }
                        }(q || F(a, k))(b, f, !P, c, Fa.test(a) && n(f.parentNode) || f);
                        return c
                    };
                    A.sortStable = ha.split("").sort(ca).join("") === ha;
                    A.detectDuplicates = !!T;
                    R();
                    A.sortDetached = e(function(a) {
                        return a.compareDocumentPosition(M.createElement("div")) & 1
                    });
                    e(function(a) {
                        a.innerHTML = "<a href='#'></a>";
                        return "#" === a.firstChild.getAttribute("href")
                    }) || g("type|href|height|width", function(a, f, c) {
                        if (!c) return a.getAttribute(f, "type" === f.toLowerCase() ? 1 : 2)
                    });
                    A.attributes && e(function(a) {
                        a.innerHTML = "<input/>";
                        a.firstChild.setAttribute("value",
                            "");
                        return "" === a.firstChild.getAttribute("value")
                    }) || g("value", function(a, f, c) {
                        if (!c && "input" === a.nodeName.toLowerCase()) return a.defaultValue
                    });
                    e(function(a) {
                        return null == a.getAttribute("disabled")
                    }) || g("checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", function(a, f, c) {
                        var b;
                        if (!c) return !0 === a[f] ? f.toLowerCase() : (b = a.getAttributeNode(f)) && b.specified ? b.value : null
                    });
                    return c
                }(a);
                c.find = Nb;
                c.expr = Nb.selectors;
                c.expr[":"] = c.expr.pseudos;
                c.unique = Nb.uniqueSort;
                c.text = Nb.getText;
                c.isXMLDoc = Nb.isXML;
                c.contains = Nb.contains;
                var Qa = c.expr.match.needsContext,
                    hc = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
                    sc = /^.[^:#\[\.,]*$/;
                c.filter = function(a, b, d) {
                    var e = b[0];
                    d && (a = ":not(" + a + ")");
                    return 1 === b.length && 1 === e.nodeType ? c.find.matchesSelector(e, a) ? [e] : [] : c.find.matches(a, c.grep(b, function(a) {
                        return 1 === a.nodeType
                    }))
                };
                c.fn.extend({
                    find: function(a) {
                        var b, d = [],
                            e = this,
                            g = e.length;
                        if ("string" !== typeof a) return this.pushStack(c(a).filter(function() {
                            for (b = 0; b < g; b++)
                                if (c.contains(e[b],
                                        this)) return !0
                        }));
                        for (b = 0; b < g; b++) c.find(a, e[b], d);
                        d = this.pushStack(1 < g ? c.unique(d) : d);
                        d.selector = this.selector ? this.selector + " " + a : a;
                        return d
                    },
                    filter: function(a) {
                        return this.pushStack(g(this, a || [], !1))
                    },
                    not: function(a) {
                        return this.pushStack(g(this, a || [], !0))
                    },
                    is: function(a) {
                        return !!g(this, "string" === typeof a && Qa.test(a) ? c(a) : a || [], !1).length
                    }
                });
                var ya, C = a.document,
                    na = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/;
                (c.fn.init = function(a, b) {
                    var d, e;
                    if (!a) return this;
                    if ("string" === typeof a) {
                        d = "<" === a.charAt(0) &&
                            ">" === a.charAt(a.length - 1) && 3 <= a.length ? [null, a, null] : na.exec(a);
                        if (!d || !d[1] && b) return !b || b.jquery ? (b || ya).find(a) : this.constructor(b).find(a);
                        if (d[1]) {
                            if (b = b instanceof c ? b[0] : b, c.merge(this, c.parseHTML(d[1], b && b.nodeType ? b.ownerDocument || b : C, !0)), hc.test(d[1]) && c.isPlainObject(b))
                                for (d in b)
                                    if (c.isFunction(this[d])) this[d](b[d]);
                                    else this.attr(d, b[d])
                        } else {
                            if ((e = C.getElementById(d[2])) && e.parentNode) {
                                if (e.id !== d[2]) return ya.find(a);
                                this.length = 1;
                                this[0] = e
                            }
                            this.context = C;
                            this.selector = a
                        }
                        return this
                    }
                    if (a.nodeType) return this.context =
                        this[0] = a, this.length = 1, this;
                    if (c.isFunction(a)) return "undefined" !== typeof ya.ready ? ya.ready(a) : a(c);
                    void 0 !== a.selector && (this.selector = a.selector, this.context = a.context);
                    return c.makeArray(a, this)
                }).prototype = c.fn;
                ya = c(C);
                var fd = /^(?:parents|prev(?:Until|All))/,
                    ed = {
                        children: !0,
                        contents: !0,
                        next: !0,
                        prev: !0
                    };
                c.extend({
                    dir: function(a, b, d) {
                        var e = [];
                        for (a = a[b]; a && 9 !== a.nodeType && (void 0 === d || 1 !== a.nodeType || !c(a).is(d));) 1 === a.nodeType && e.push(a), a = a[b];
                        return e
                    },
                    sibling: function(a, c) {
                        for (var b = []; a; a =
                            a.nextSibling) 1 === a.nodeType && a !== c && b.push(a);
                        return b
                    }
                });
                c.fn.extend({
                    has: function(a) {
                        var b, d = c(a, this),
                            e = d.length;
                        return this.filter(function() {
                            for (b = 0; b < e; b++)
                                if (c.contains(this, d[b])) return !0
                        })
                    },
                    closest: function(a, b) {
                        for (var d, e = 0, g = this.length, h = [], k = Qa.test(a) || "string" !== typeof a ? c(a, b || this.context) : 0; e < g; e++)
                            for (d = this[e]; d && d !== b; d = d.parentNode)
                                if (11 > d.nodeType && (k ? -1 < k.index(d) : 1 === d.nodeType && c.find.matchesSelector(d, a))) {
                                    h.push(d);
                                    break
                                }
                        return this.pushStack(1 < h.length ? c.unique(h) : h)
                    },
                    index: function(a) {
                        return a ? "string" === typeof a ? c.inArray(this[0], c(a)) : c.inArray(a.jquery ? a[0] : a, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
                    },
                    add: function(a, b) {
                        return this.pushStack(c.unique(c.merge(this.get(), c(a, b))))
                    },
                    addBack: function(a) {
                        return this.add(null == a ? this.prevObject : this.prevObject.filter(a))
                    }
                });
                c.each({
                    parent: function(a) {
                        return (a = a.parentNode) && 11 !== a.nodeType ? a : null
                    },
                    parents: function(a) {
                        return c.dir(a, "parentNode")
                    },
                    parentsUntil: function(a, b, d) {
                        return c.dir(a,
                            "parentNode", d)
                    },
                    next: function(a) {
                        return l(a, "nextSibling")
                    },
                    prev: function(a) {
                        return l(a, "previousSibling")
                    },
                    nextAll: function(a) {
                        return c.dir(a, "nextSibling")
                    },
                    prevAll: function(a) {
                        return c.dir(a, "previousSibling")
                    },
                    nextUntil: function(a, b, d) {
                        return c.dir(a, "nextSibling", d)
                    },
                    prevUntil: function(a, b, d) {
                        return c.dir(a, "previousSibling", d)
                    },
                    siblings: function(a) {
                        return c.sibling((a.parentNode || {}).firstChild, a)
                    },
                    children: function(a) {
                        return c.sibling(a.firstChild)
                    },
                    contents: function(a) {
                        return c.nodeName(a,
                            "iframe") ? a.contentDocument || a.contentWindow.document : c.merge([], a.childNodes)
                    }
                }, function(a, b) {
                    c.fn[a] = function(d, e) {
                        var g = c.map(this, b, d);
                        "Until" !== a.slice(-5) && (e = d);
                        e && "string" === typeof e && (g = c.filter(e, g));
                        1 < this.length && (ed[a] || (g = c.unique(g)), fd.test(a) && (g = g.reverse()));
                        return this.pushStack(g)
                    }
                });
                var Sa = /\S+/g,
                    db = {};
                c.Callbacks = function(a) {
                    a = "string" === typeof a ? db[a] || m(a) : c.extend({}, a);
                    var b, d, e, g, h, k, l = [],
                        n = !a.once && [],
                        p = function(c) {
                            d = a.memory && c;
                            e = !0;
                            h = k || 0;
                            k = 0;
                            g = l.length;
                            for (b = !0; l &&
                                h < g; h++)
                                if (!1 === l[h].apply(c[0], c[1]) && a.stopOnFalse) {
                                    d = !1;
                                    break
                                }
                            b = !1;
                            l && (n ? n.length && p(n.shift()) : d ? l = [] : r.disable())
                        },
                        r = {
                            add: function() {
                                if (l) {
                                    var e = l.length;
                                    (function Fd(b) {
                                        c.each(b, function(b, d) {
                                            var e = c.type(d);
                                            "function" === e ? a.unique && r.has(d) || l.push(d) : d && d.length && "string" !== e && Fd(d)
                                        })
                                    })(arguments);
                                    b ? g = l.length : d && (k = e, p(d))
                                }
                                return this
                            },
                            remove: function() {
                                l && c.each(arguments, function(a, f) {
                                    for (var d; - 1 < (d = c.inArray(f, l, d));) l.splice(d, 1), b && (d <= g && g--, d <= h && h--)
                                });
                                return this
                            },
                            has: function(a) {
                                return a ?
                                    -1 < c.inArray(a, l) : !(!l || !l.length)
                            },
                            empty: function() {
                                l = [];
                                g = 0;
                                return this
                            },
                            disable: function() {
                                l = n = d = void 0;
                                return this
                            },
                            disabled: function() {
                                return !l
                            },
                            lock: function() {
                                n = void 0;
                                d || r.disable();
                                return this
                            },
                            locked: function() {
                                return !n
                            },
                            fireWith: function(a, f) {
                                !l || e && !n || (f = f || [], f = [a, f.slice ? f.slice() : f], b ? n.push(f) : p(f));
                                return this
                            },
                            fire: function() {
                                r.fireWith(this, arguments);
                                return this
                            },
                            fired: function() {
                                return !!e
                            }
                        };
                    return r
                };
                c.extend({
                    Deferred: function(a) {
                        var b = [
                                ["resolve", "done", c.Callbacks("once memory"),
                                    "resolved"
                                ],
                                ["reject", "fail", c.Callbacks("once memory"), "rejected"],
                                ["notify", "progress", c.Callbacks("memory")]
                            ],
                            d = "pending",
                            e = {
                                state: function() {
                                    return d
                                },
                                always: function() {
                                    g.done(arguments).fail(arguments);
                                    return this
                                },
                                then: function() {
                                    var a = arguments;
                                    return c.Deferred(function(f) {
                                        c.each(b, function(b, d) {
                                            var h = c.isFunction(a[b]) && a[b];
                                            g[d[1]](function() {
                                                var a = h && h.apply(this, arguments);
                                                if (a && c.isFunction(a.promise)) a.promise().done(f.resolve).fail(f.reject).progress(f.notify);
                                                else f[d[0] + "With"](this ===
                                                    e ? f.promise() : this, h ? [a] : arguments)
                                            })
                                        });
                                        a = null
                                    }).promise()
                                },
                                promise: function(a) {
                                    return null != a ? c.extend(a, e) : e
                                }
                            },
                            g = {};
                        e.pipe = e.then;
                        c.each(b, function(a, f) {
                            var c = f[2],
                                h = f[3];
                            e[f[1]] = c.add;
                            h && c.add(function() {
                                d = h
                            }, b[a ^ 1][2].disable, b[2][2].lock);
                            g[f[0]] = function() {
                                g[f[0] + "With"](this === g ? e : this, arguments);
                                return this
                            };
                            g[f[0] + "With"] = c.fireWith
                        });
                        e.promise(g);
                        a && a.call(g, g);
                        return g
                    },
                    when: function(a) {
                        var b = 0,
                            d = P.call(arguments),
                            e = d.length,
                            g = 1 !== e || a && c.isFunction(a.promise) ? e : 0,
                            h = 1 === g ? a : c.Deferred(),
                            k = function(a, f, c) {
                                return function(b) {
                                    f[a] = this;
                                    c[a] = 1 < arguments.length ? P.call(arguments) : b;
                                    c === l ? h.notifyWith(f, c) : --g || h.resolveWith(f, c)
                                }
                            },
                            l, m, n;
                        if (1 < e)
                            for (l = Array(e), m = Array(e), n = Array(e); b < e; b++) d[b] && c.isFunction(d[b].promise) ? d[b].promise().done(k(b, n, d)).fail(h.reject).progress(k(b, m, l)) : --g;
                        g || h.resolveWith(n, d);
                        return h.promise()
                    }
                });
                var pb;
                c.fn.ready = function(a) {
                    c.ready.promise().done(a);
                    return this
                };
                c.extend({
                    isReady: !1,
                    readyWait: 1,
                    holdReady: function(a) {
                        a ? c.readyWait++ : c.ready(!0)
                    },
                    ready: function(a) {
                        if (!0 ===
                            a ? !--c.readyWait : !c.isReady) {
                            if (!C.body) return setTimeout(c.ready);
                            c.isReady = !0;
                            !0 !== a && 0 < --c.readyWait || (pb.resolveWith(C, [c]), c.fn.triggerHandler && (c(C).triggerHandler("ready"), c(C).off("ready")))
                        }
                    }
                });
                c.ready.promise = function(f) {
                    if (!pb)
                        if (pb = c.Deferred(), "complete" === C.readyState) setTimeout(c.ready);
                        else if (C.addEventListener) C.addEventListener("DOMContentLoaded", t, !1), a.addEventListener("load", t, !1);
                    else {
                        C.attachEvent("onreadystatechange", t);
                        a.attachEvent("onload", t);
                        var b = !1;
                        try {
                            b = null == a.frameElement &&
                                C.documentElement
                        } catch (d) {}
                        b && b.doScroll && function z() {
                            if (!c.isReady) {
                                try {
                                    b.doScroll("left")
                                } catch (a) {
                                    return setTimeout(z, 50)
                                }
                                r();
                                c.ready()
                            }
                        }()
                    }
                    return pb.promise(f)
                };
                for (var Sc in c(I)) break;
                I.ownLast = "0" !== Sc;
                I.inlineBlockNeedsLayout = !1;
                c(function() {
                    var a, c, b;
                    (c = C.getElementsByTagName("body")[0]) && c.style && (a = C.createElement("div"), b = C.createElement("div"), b.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", c.appendChild(b).appendChild(a), "undefined" !== typeof a.style.zoom &&
                        (a.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1", I.inlineBlockNeedsLayout = a = 3 === a.offsetWidth) && (c.style.zoom = 1), c.removeChild(b))
                });
                (function() {
                    var a = C.createElement("div");
                    if (null == I.deleteExpando) {
                        I.deleteExpando = !0;
                        try {
                            delete a.test
                        } catch (c) {
                            I.deleteExpando = !1
                        }
                    }
                })();
                c.acceptData = function(a) {
                    var b = c.noData[(a.nodeName + " ").toLowerCase()],
                        d = +a.nodeType || 1;
                    return 1 !== d && 9 !== d ? !1 : !b || !0 !== b && a.getAttribute("classid") === b
                };
                var kd = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
                    ld = /([A-Z])/g;
                c.extend({
                    cache: {},
                    noData: {
                        "applet ": !0,
                        "embed ": !0,
                        "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
                    },
                    hasData: function(a) {
                        a = a.nodeType ? c.cache[a[c.expando]] : a[c.expando];
                        return !!a && !x(a)
                    },
                    data: function(a, c, b) {
                        return G(a, c, b)
                    },
                    removeData: function(a, c) {
                        return J(a, c)
                    },
                    _data: function(a, c, b) {
                        return G(a, c, b, !0)
                    },
                    _removeData: function(a, c) {
                        return J(a, c, !0)
                    }
                });
                c.fn.extend({
                    data: function(a, b) {
                        var d, e, g, h = this[0],
                            k = h && h.attributes;
                        if (void 0 === a) {
                            if (this.length && (g = c.data(h), 1 === h.nodeType && !c._data(h,
                                    "parsedAttrs"))) {
                                for (d = k.length; d--;) k[d] && (e = k[d].name, 0 === e.indexOf("data-") && (e = c.camelCase(e.slice(5)), D(h, e, g[e])));
                                c._data(h, "parsedAttrs", !0)
                            }
                            return g
                        }
                        return "object" === typeof a ? this.each(function() {
                            c.data(this, a)
                        }) : 1 < arguments.length ? this.each(function() {
                            c.data(this, a, b)
                        }) : h ? D(h, a, c.data(h, a)) : void 0
                    },
                    removeData: function(a) {
                        return this.each(function() {
                            c.removeData(this, a)
                        })
                    }
                });
                c.extend({
                    queue: function(a, b, d) {
                        var e;
                        if (a) return b = (b || "fx") + "queue", e = c._data(a, b), d && (!e || c.isArray(d) ? e = c._data(a,
                            b, c.makeArray(d)) : e.push(d)), e || []
                    },
                    dequeue: function(a, b) {
                        b = b || "fx";
                        var d = c.queue(a, b),
                            e = d.length,
                            g = d.shift(),
                            h = c._queueHooks(a, b),
                            k = function() {
                                c.dequeue(a, b)
                            };
                        "inprogress" === g && (g = d.shift(), e--);
                        g && ("fx" === b && d.unshift("inprogress"), delete h.stop, g.call(a, k, h));
                        !e && h && h.empty.fire()
                    },
                    _queueHooks: function(a, b) {
                        var d = b + "queueHooks";
                        return c._data(a, d) || c._data(a, d, {
                            empty: c.Callbacks("once memory").add(function() {
                                c._removeData(a, b + "queue");
                                c._removeData(a, d)
                            })
                        })
                    }
                });
                c.fn.extend({
                    queue: function(a, b) {
                        var d =
                            2;
                        "string" !== typeof a && (b = a, a = "fx", d--);
                        return arguments.length < d ? c.queue(this[0], a) : void 0 === b ? this : this.each(function() {
                            var d = c.queue(this, a, b);
                            c._queueHooks(this, a);
                            "fx" === a && "inprogress" !== d[0] && c.dequeue(this, a)
                        })
                    },
                    dequeue: function(a) {
                        return this.each(function() {
                            c.dequeue(this, a)
                        })
                    },
                    clearQueue: function(a) {
                        return this.queue(a || "fx", [])
                    },
                    promise: function(a, b) {
                        var d, e = 1,
                            g = c.Deferred(),
                            h = this,
                            k = this.length,
                            l = function() {
                                --e || g.resolveWith(h, [h])
                            };
                        "string" !== typeof a && (b = a, a = void 0);
                        for (a = a || "fx"; k--;)(d =
                            c._data(h[k], a + "queueHooks")) && d.empty && (e++, d.empty.add(l));
                        l();
                        return g.promise(b)
                    }
                });
                var Yb = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
                    tb = ["Top", "Right", "Bottom", "Left"],
                    ib = function(a, b) {
                        a = b || a;
                        return "none" === c.css(a, "display") || !c.contains(a.ownerDocument, a)
                    },
                    ub = c.access = function(a, b, d, e, g, h, k) {
                        var l = 0,
                            m = a.length,
                            n = null == d;
                        if ("object" === c.type(d))
                            for (l in g = !0, d) c.access(a, b, l, d[l], !0, h, k);
                        else if (void 0 !== e && (g = !0, c.isFunction(e) || (k = !0), n && (k ? (b.call(a, e), b = null) : (n = b, b = function(a, f, b) {
                                return n.call(c(a),
                                    b)
                            })), b))
                            for (; l < m; l++) b(a[l], d, k ? e : e.call(a[l], l, b(a[l], d)));
                        return g ? a : n ? b.call(a) : m ? b(a[0], d) : h
                    },
                    Bc = /^(?:checkbox|radio)$/i;
                (function() {
                    var a = C.createElement("input"),
                        c = C.createElement("div"),
                        b = C.createDocumentFragment();
                    c.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
                    I.leadingWhitespace = 3 === c.firstChild.nodeType;
                    I.tbody = !c.getElementsByTagName("tbody").length;
                    I.htmlSerialize = !!c.getElementsByTagName("link").length;
                    I.html5Clone = "<:nav></:nav>" !== C.createElement("nav").cloneNode(!0).outerHTML;
                    a.type = "checkbox";
                    a.checked = !0;
                    b.appendChild(a);
                    I.appendChecked = a.checked;
                    c.innerHTML = "<textarea>x</textarea>";
                    I.noCloneChecked = !!c.cloneNode(!0).lastChild.defaultValue;
                    b.appendChild(c);
                    c.innerHTML = "<input type='radio' checked='checked' name='t'/>";
                    I.checkClone = c.cloneNode(!0).cloneNode(!0).lastChild.checked;
                    I.noCloneEvent = !0;
                    c.attachEvent && (c.attachEvent("onclick", function() {
                        I.noCloneEvent = !1
                    }), c.cloneNode(!0).click());
                    if (null == I.deleteExpando) {
                        I.deleteExpando = !0;
                        try {
                            delete c.test
                        } catch (d) {
                            I.deleteExpando = !1
                        }
                    }
                })();
                (function() {
                    var f, c, b = C.createElement("div");
                    for (f in {
                            submit: !0,
                            change: !0,
                            focusin: !0
                        }) c = "on" + f, (I[f + "Bubbles"] = c in a) || (b.setAttribute(c, "t"), I[f + "Bubbles"] = !1 === b.attributes[c].expando)
                })();
                var Cc = /^(?:input|select|textarea)$/i,
                    Zb = /^key/,
                    Tc = /^(?:mouse|pointer|contextmenu)|click/,
                    Bb = /^(?:focusinfocus|focusoutblur)$/,
                    Uc = /^([^.]*)(?:\.(.+)|)$/;
                c.event = {
                    global: {},
                    add: function(a, b, d, e, g) {
                        var h, k, l, m, n, p, r, t, x;
                        if (l = c._data(a)) {
                            d.handler && (m = d, d = m.handler, g = m.selector);
                            d.guid || (d.guid = c.guid++);
                            (k = l.events) || (k = l.events = {});
                            (n = l.handle) || (n = l.handle = function(a) {
                                return "undefined" === typeof c || a && c.event.triggered === a.type ? void 0 : c.event.dispatch.apply(n.elem, arguments)
                            }, n.elem = a);
                            b = (b || "").match(Sa) || [""];
                            for (l = b.length; l--;) h = Uc.exec(b[l]) || [], t = p = h[1], x = (h[2] || "").split(".").sort(), t && (h = c.event.special[t] || {}, t = (g ? h.delegateType : h.bindType) || t, h = c.event.special[t] || {}, p = c.extend({
                                type: t,
                                origType: p,
                                data: e,
                                handler: d,
                                guid: d.guid,
                                selector: g,
                                needsContext: g && c.expr.match.needsContext.test(g),
                                namespace: x.join(".")
                            }, m), (r = k[t]) || (r = k[t] = [], r.delegateCount = 0, h.setup && !1 !== h.setup.call(a, e, x, n) || (a.addEventListener ? a.addEventListener(t, n, !1) : a.attachEvent && a.attachEvent("on" + t, n))), h.add && (h.add.call(a, p), p.handler.guid || (p.handler.guid = d.guid)), g ? r.splice(r.delegateCount++, 0, p) : r.push(p), c.event.global[t] = !0);
                            a = null
                        }
                    },
                    remove: function(a, b, d, e, g) {
                        var h, k, l, m, n, p, r, t, x, u, w, G = c.hasData(a) && c._data(a);
                        if (G && (p = G.events)) {
                            b = (b || "").match(Sa) || [""];
                            for (n = b.length; n--;)
                                if (l = Uc.exec(b[n]) || [], x =
                                    w = l[1], u = (l[2] || "").split(".").sort(), x) {
                                    r = c.event.special[x] || {};
                                    x = (e ? r.delegateType : r.bindType) || x;
                                    t = p[x] || [];
                                    l = l[2] && new RegExp("(^|\\.)" + u.join("\\.(?:.*\\.|)") + "(\\.|$)");
                                    for (m = h = t.length; h--;) k = t[h], !g && w !== k.origType || d && d.guid !== k.guid || l && !l.test(k.namespace) || e && e !== k.selector && ("**" !== e || !k.selector) || (t.splice(h, 1), k.selector && t.delegateCount--, r.remove && r.remove.call(a, k));
                                    m && !t.length && (r.teardown && !1 !== r.teardown.call(a, u, G.handle) || c.removeEvent(a, x, G.handle), delete p[x])
                                } else
                                    for (x in p) c.event.remove(a,
                                        x + b[n], d, e, !0);
                            c.isEmptyObject(p) && (delete G.handle, c._removeData(a, "events"))
                        }
                    },
                    trigger: function(f, b, d, e) {
                        var g, h, k, l, m, n, p = [d || C],
                            r = oa.call(f, "type") ? f.type : f;
                        m = oa.call(f, "namespace") ? f.namespace.split(".") : [];
                        k = g = d = d || C;
                        if (3 !== d.nodeType && 8 !== d.nodeType && !Bb.test(r + c.event.triggered) && (0 <= r.indexOf(".") && (m = r.split("."), r = m.shift(), m.sort()), h = 0 > r.indexOf(":") && "on" + r, f = f[c.expando] ? f : new c.Event(r, "object" === typeof f && f), f.isTrigger = e ? 2 : 3, f.namespace = m.join("."), f.namespace_re = f.namespace ? new RegExp("(^|\\.)" +
                                m.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, f.result = void 0, f.target || (f.target = d), b = null == b ? [f] : c.makeArray(b, [f]), m = c.event.special[r] || {}, e || !m.trigger || !1 !== m.trigger.apply(d, b))) {
                            if (!e && !m.noBubble && !c.isWindow(d)) {
                                l = m.delegateType || r;
                                Bb.test(l + r) || (k = k.parentNode);
                                for (; k; k = k.parentNode) p.push(k), g = k;
                                g === (d.ownerDocument || C) && p.push(g.defaultView || g.parentWindow || a)
                            }
                            for (n = 0;
                                (k = p[n++]) && !f.isPropagationStopped();) f.type = 1 < n ? l : m.bindType || r, (g = (c._data(k, "events") || {})[f.type] && c._data(k, "handle")) &&
                                g.apply(k, b), (g = h && k[h]) && g.apply && c.acceptData(k) && (f.result = g.apply(k, b), !1 === f.result && f.preventDefault());
                            f.type = r;
                            if (!(e || f.isDefaultPrevented() || m._default && !1 !== m._default.apply(p.pop(), b)) && c.acceptData(d) && h && d[r] && !c.isWindow(d)) {
                                (g = d[h]) && (d[h] = null);
                                c.event.triggered = r;
                                try {
                                    d[r]()
                                } catch (t) {}
                                c.event.triggered = void 0;
                                g && (d[h] = g)
                            }
                            return f.result
                        }
                    },
                    dispatch: function(a) {
                        a = c.event.fix(a);
                        var b, d, e, g, h = [],
                            k = P.call(arguments);
                        b = (c._data(this, "events") || {})[a.type] || [];
                        var l = c.event.special[a.type] || {};
                        k[0] = a;
                        a.delegateTarget = this;
                        if (!l.preDispatch || !1 !== l.preDispatch.call(this, a)) {
                            h = c.event.handlers.call(this, a, b);
                            for (b = 0;
                                (e = h[b++]) && !a.isPropagationStopped();)
                                for (a.currentTarget = e.elem, g = 0;
                                    (d = e.handlers[g++]) && !a.isImmediatePropagationStopped();)
                                    if (!a.namespace_re || a.namespace_re.test(d.namespace)) a.handleObj = d, a.data = d.data, d = ((c.event.special[d.origType] || {}).handle || d.handler).apply(e.elem, k), void 0 !== d && !1 === (a.result = d) && (a.preventDefault(), a.stopPropagation());
                            l.postDispatch && l.postDispatch.call(this,
                                a);
                            return a.result
                        }
                    },
                    handlers: function(a, b) {
                        var d, e, g, h, k = [],
                            l = b.delegateCount,
                            m = a.target;
                        if (l && m.nodeType && (!a.button || "click" !== a.type))
                            for (; m != this; m = m.parentNode || this)
                                if (1 === m.nodeType && (!0 !== m.disabled || "click" !== a.type)) {
                                    g = [];
                                    for (h = 0; h < l; h++) e = b[h], d = e.selector + " ", void 0 === g[d] && (g[d] = e.needsContext ? 0 <= c(d, this).index(m) : c.find(d, this, null, [m]).length), g[d] && g.push(e);
                                    g.length && k.push({
                                        elem: m,
                                        handlers: g
                                    })
                                }
                        l < b.length && k.push({
                            elem: this,
                            handlers: b.slice(l)
                        });
                        return k
                    },
                    fix: function(a) {
                        if (a[c.expando]) return a;
                        var b, d, e;
                        b = a.type;
                        var g = a,
                            h = this.fixHooks[b];
                        h || (this.fixHooks[b] = h = Tc.test(b) ? this.mouseHooks : Zb.test(b) ? this.keyHooks : {});
                        e = h.props ? this.props.concat(h.props) : this.props;
                        a = new c.Event(g);
                        for (b = e.length; b--;) d = e[b], a[d] = g[d];
                        a.target || (a.target = g.srcElement || C);
                        3 === a.target.nodeType && (a.target = a.target.parentNode);
                        a.metaKey = !!a.metaKey;
                        return h.filter ? h.filter(a, g) : a
                    },
                    props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
                    fixHooks: {},
                    keyHooks: {
                        props: ["char", "charCode", "key", "keyCode"],
                        filter: function(a, c) {
                            null == a.which && (a.which = null != c.charCode ? c.charCode : c.keyCode);
                            return a
                        }
                    },
                    mouseHooks: {
                        props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
                        filter: function(a, c) {
                            var b, d, e = c.button,
                                g = c.fromElement;
                            null == a.pageX && null != c.clientX && (b = a.target.ownerDocument || C, d = b.documentElement, b = b.body, a.pageX = c.clientX + (d && d.scrollLeft || b && b.scrollLeft || 0) - (d && d.clientLeft ||
                                b && b.clientLeft || 0), a.pageY = c.clientY + (d && d.scrollTop || b && b.scrollTop || 0) - (d && d.clientTop || b && b.clientTop || 0));
                            !a.relatedTarget && g && (a.relatedTarget = g === a.target ? c.toElement : g);
                            a.which || void 0 === e || (a.which = e & 1 ? 1 : e & 2 ? 3 : e & 4 ? 2 : 0);
                            return a
                        }
                    },
                    special: {
                        load: {
                            noBubble: !0
                        },
                        focus: {
                            trigger: function() {
                                if (this !== E() && this.focus) try {
                                    return this.focus(), !1
                                } catch (a) {}
                            },
                            delegateType: "focusin"
                        },
                        blur: {
                            trigger: function() {
                                if (this === E() && this.blur) return this.blur(), !1
                            },
                            delegateType: "focusout"
                        },
                        click: {
                            trigger: function() {
                                if (c.nodeName(this,
                                        "input") && "checkbox" === this.type && this.click) return this.click(), !1
                            },
                            _default: function(a) {
                                return c.nodeName(a.target, "a")
                            }
                        },
                        beforeunload: {
                            postDispatch: function(a) {
                                void 0 !== a.result && a.originalEvent && (a.originalEvent.returnValue = a.result)
                            }
                        }
                    },
                    simulate: function(a, b, d, e) {
                        a = c.extend(new c.Event, d, {
                            type: a,
                            isSimulated: !0,
                            originalEvent: {}
                        });
                        e ? c.event.trigger(a, null, b) : c.event.dispatch.call(b, a);
                        a.isDefaultPrevented() && d.preventDefault()
                    }
                };
                c.removeEvent = C.removeEventListener ? function(a, c, b) {
                    a.removeEventListener &&
                        a.removeEventListener(c, b, !1)
                } : function(a, c, b) {
                    c = "on" + c;
                    a.detachEvent && ("undefined" === typeof a[c] && (a[c] = null), a.detachEvent(c, b))
                };
                c.Event = function(a, b) {
                    if (!(this instanceof c.Event)) return new c.Event(a, b);
                    a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || void 0 === a.defaultPrevented && !1 === a.returnValue ? B : A) : this.type = a;
                    b && c.extend(this, b);
                    this.timeStamp = a && a.timeStamp || c.now();
                    this[c.expando] = !0
                };
                c.Event.prototype = {
                    isDefaultPrevented: A,
                    isPropagationStopped: A,
                    isImmediatePropagationStopped: A,
                    preventDefault: function() {
                        var a = this.originalEvent;
                        this.isDefaultPrevented = B;
                        a && (a.preventDefault ? a.preventDefault() : a.returnValue = !1)
                    },
                    stopPropagation: function() {
                        var a = this.originalEvent;
                        this.isPropagationStopped = B;
                        a && (a.stopPropagation && a.stopPropagation(), a.cancelBubble = !0)
                    },
                    stopImmediatePropagation: function() {
                        var a = this.originalEvent;
                        this.isImmediatePropagationStopped = B;
                        a && a.stopImmediatePropagation && a.stopImmediatePropagation();
                        this.stopPropagation()
                    }
                };
                c.each({
                    mouseenter: "mouseover",
                    mouseleave: "mouseout",
                    pointerenter: "pointerover",
                    pointerleave: "pointerout"
                }, function(a, b) {
                    c.event.special[a] = {
                        delegateType: b,
                        bindType: b,
                        handle: function(a) {
                            var f, d = a.relatedTarget,
                                e = a.handleObj;
                            if (!d || d !== this && !c.contains(this, d)) a.type = e.origType, f = e.handler.apply(this, arguments), a.type = b;
                            return f
                        }
                    }
                });
                I.submitBubbles || (c.event.special.submit = {
                    setup: function() {
                        if (c.nodeName(this, "form")) return !1;
                        c.event.add(this, "click._submit keypress._submit", function(a) {
                            a = a.target;
                            (a = c.nodeName(a, "input") || c.nodeName(a,
                                "button") ? a.form : void 0) && !c._data(a, "submitBubbles") && (c.event.add(a, "submit._submit", function(a) {
                                a._submit_bubble = !0
                            }), c._data(a, "submitBubbles", !0))
                        })
                    },
                    postDispatch: function(a) {
                        a._submit_bubble && (delete a._submit_bubble, this.parentNode && !a.isTrigger && c.event.simulate("submit", this.parentNode, a, !0))
                    },
                    teardown: function() {
                        if (c.nodeName(this, "form")) return !1;
                        c.event.remove(this, "._submit")
                    }
                });
                I.changeBubbles || (c.event.special.change = {
                    setup: function() {
                        if (Cc.test(this.nodeName)) {
                            if ("checkbox" === this.type ||
                                "radio" === this.type) c.event.add(this, "propertychange._change", function(a) {
                                "checked" === a.originalEvent.propertyName && (this._just_changed = !0)
                            }), c.event.add(this, "click._change", function(a) {
                                this._just_changed && !a.isTrigger && (this._just_changed = !1);
                                c.event.simulate("change", this, a, !0)
                            });
                            return !1
                        }
                        c.event.add(this, "beforeactivate._change", function(a) {
                            a = a.target;
                            Cc.test(a.nodeName) && !c._data(a, "changeBubbles") && (c.event.add(a, "change._change", function(a) {
                                !this.parentNode || a.isSimulated || a.isTrigger || c.event.simulate("change",
                                    this.parentNode, a, !0)
                            }), c._data(a, "changeBubbles", !0))
                        })
                    },
                    handle: function(a) {
                        var c = a.target;
                        if (this !== c || a.isSimulated || a.isTrigger || "radio" !== c.type && "checkbox" !== c.type) return a.handleObj.handler.apply(this, arguments)
                    },
                    teardown: function() {
                        c.event.remove(this, "._change");
                        return !Cc.test(this.nodeName)
                    }
                });
                I.focusinBubbles || c.each({
                    focus: "focusin",
                    blur: "focusout"
                }, function(a, b) {
                    var d = function(a) {
                        c.event.simulate(b, a.target, c.event.fix(a), !0)
                    };
                    c.event.special[b] = {
                        setup: function() {
                            var e = this.ownerDocument ||
                                this,
                                g = c._data(e, b);
                            g || e.addEventListener(a, d, !0);
                            c._data(e, b, (g || 0) + 1)
                        },
                        teardown: function() {
                            var e = this.ownerDocument || this,
                                g = c._data(e, b) - 1;
                            g ? c._data(e, b, g) : (e.removeEventListener(a, d, !0), c._removeData(e, b))
                        }
                    }
                });
                c.fn.extend({
                    on: function(a, b, d, e, g) {
                        var h, k;
                        if ("object" === typeof a) {
                            "string" !== typeof b && (d = d || b, b = void 0);
                            for (h in a) this.on(h, b, d, a[h], g);
                            return this
                        }
                        null == d && null == e ? (e = b, d = b = void 0) : null == e && ("string" === typeof b ? (e = d, d = void 0) : (e = d, d = b, b = void 0));
                        if (!1 === e) e = A;
                        else if (!e) return this;
                        1 === g && (k = e, e = function(a) {
                            c().off(a);
                            return k.apply(this, arguments)
                        }, e.guid = k.guid || (k.guid = c.guid++));
                        return this.each(function() {
                            c.event.add(this, a, e, d, b)
                        })
                    },
                    one: function(a, c, b, d) {
                        return this.on(a, c, b, d, 1)
                    },
                    off: function(a, b, d) {
                        var e;
                        if (a && a.preventDefault && a.handleObj) return e = a.handleObj, c(a.delegateTarget).off(e.namespace ? e.origType + "." + e.namespace : e.origType, e.selector, e.handler), this;
                        if ("object" === typeof a) {
                            for (e in a) this.off(e, b, a[e]);
                            return this
                        }
                        if (!1 === b || "function" === typeof b) d = b, b = void 0;
                        !1 === d && (d = A);
                        return this.each(function() {
                            c.event.remove(this, a, d, b)
                        })
                    },
                    trigger: function(a, b) {
                        return this.each(function() {
                            c.event.trigger(a, b, this)
                        })
                    },
                    triggerHandler: function(a, b) {
                        var d = this[0];
                        if (d) return c.event.trigger(a, b, d, !0)
                    }
                });
                var za = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
                    ic = / jQuery\d+="(?:null|\d+)"/g,
                    Z = new RegExp("<(?:" + za + ")[\\s/>]", "i"),
                    ba = /^\s+/,
                    Hb = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
                    Ub = /<([\w:]+)/,
                    Vc = /<tbody/i,
                    Vb = /<|&#?\w+;/,
                    $b = /<(?:script|style|link)/i,
                    fa = /checked\s*(?:[^=]|=\s*.checked.)/i,
                    Eb = /^$|\/(?:java|ecma)script/i,
                    ob = /^true\/(.*)/,
                    Cb = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
                    U = {
                        option: [1, "<select multiple='multiple'>", "</select>"],
                        legend: [1, "<fieldset>", "</fieldset>"],
                        area: [1, "<map>", "</map>"],
                        param: [1, "<object>", "</object>"],
                        thead: [1, "<table>", "</table>"],
                        tr: [2, "<table><tbody>", "</tbody></table>"],
                        col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
                        td: [3,
                            "<table><tbody><tr>", "</tr></tbody></table>"
                        ],
                        _default: I.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
                    },
                    da = F(C).appendChild(C.createElement("div"));
                U.optgroup = U.option;
                U.tbody = U.tfoot = U.colgroup = U.caption = U.thead;
                U.th = U.td;
                c.extend({
                    clone: function(a, b, d) {
                        var e, g, h, k, l, m = c.contains(a.ownerDocument, a);
                        I.html5Clone || c.isXMLDoc(a) || !Z.test("<" + a.nodeName + ">") ? h = a.cloneNode(!0) : (da.innerHTML = a.outerHTML, da.removeChild(h = da.firstChild));
                        if (!(I.noCloneEvent && I.noCloneChecked || 1 !== a.nodeType && 11 !== a.nodeType ||
                                c.isXMLDoc(a)))
                            for (e = K(h), l = K(a), k = 0; null != (g = l[k]); ++k)
                                if (e[k]) {
                                    var n = e[k],
                                        p = void 0,
                                        r = void 0,
                                        t = void 0;
                                    if (1 === n.nodeType) {
                                        p = n.nodeName.toLowerCase();
                                        if (!I.noCloneEvent && n[c.expando]) {
                                            t = c._data(n);
                                            for (r in t.events) c.removeEvent(n, r, t.handle);
                                            n.removeAttribute(c.expando)
                                        }
                                        if ("script" === p && n.text !== g.text) ea(n).text = g.text, la(n);
                                        else if ("object" === p) n.parentNode && (n.outerHTML = g.outerHTML), I.html5Clone && g.innerHTML && !c.trim(n.innerHTML) && (n.innerHTML = g.innerHTML);
                                        else if ("input" === p && Bc.test(g.type)) n.defaultChecked =
                                            n.checked = g.checked, n.value !== g.value && (n.value = g.value);
                                        else if ("option" === p) n.defaultSelected = n.selected = g.defaultSelected;
                                        else if ("input" === p || "textarea" === p) n.defaultValue = g.defaultValue
                                    }
                                }
                        if (b)
                            if (d)
                                for (l = l || K(a), e = e || K(h), k = 0; null != (g = l[k]); k++) L(g, e[k]);
                            else L(a, h);
                        e = K(h, "script");
                        0 < e.length && ta(e, !m && K(a, "script"));
                        return h
                    },
                    buildFragment: function(a, b, d, e) {
                        for (var g, h, k, l, m, n, p = a.length, r = F(b), t = [], x = 0; x < p; x++)
                            if ((h = a[x]) || 0 === h)
                                if ("object" === c.type(h)) c.merge(t, h.nodeType ? [h] : h);
                                else if (Vb.test(h)) {
                            k =
                                k || r.appendChild(b.createElement("div"));
                            l = (Ub.exec(h) || ["", ""])[1].toLowerCase();
                            n = U[l] || U._default;
                            k.innerHTML = n[1] + h.replace(Hb, "<$1></$2>") + n[2];
                            for (g = n[0]; g--;) k = k.lastChild;
                            !I.leadingWhitespace && ba.test(h) && t.push(b.createTextNode(ba.exec(h)[0]));
                            if (!I.tbody)
                                for (g = (h = "table" !== l || Vc.test(h) ? "<table>" !== n[1] || Vc.test(h) ? 0 : k : k.firstChild) && h.childNodes.length; g--;) c.nodeName(m = h.childNodes[g], "tbody") && !m.childNodes.length && h.removeChild(m);
                            c.merge(t, k.childNodes);
                            for (k.textContent = ""; k.firstChild;) k.removeChild(k.firstChild);
                            k = r.lastChild
                        } else t.push(b.createTextNode(h));
                        k && r.removeChild(k);
                        I.appendChecked || c.grep(K(t, "input"), V);
                        for (x = 0; h = t[x++];)
                            if (!e || -1 === c.inArray(h, e))
                                if (a = c.contains(h.ownerDocument, h), k = K(r.appendChild(h), "script"), a && ta(k), d)
                                    for (g = 0; h = k[g++];) Eb.test(h.type || "") && d.push(h);
                        return r
                    },
                    cleanData: function(a, b) {
                        for (var d, e, g, h, k = 0, l = c.expando, m = c.cache, n = I.deleteExpando, p = c.event.special; null != (d = a[k]); k++)
                            if (b || c.acceptData(d))
                                if (h = (g = d[l]) && m[g]) {
                                    if (h.events)
                                        for (e in h.events) p[e] ? c.event.remove(d,
                                            e) : c.removeEvent(d, e, h.handle);
                                    m[g] && (delete m[g], n ? delete d[l] : "undefined" !== typeof d.removeAttribute ? d.removeAttribute(l) : d[l] = null, aa.push(g))
                                }
                    }
                });
                c.fn.extend({
                    text: function(a) {
                        return ub(this, function(a) {
                            return void 0 === a ? c.text(this) : this.empty().append((this[0] && this[0].ownerDocument || C).createTextNode(a))
                        }, null, a, arguments.length)
                    },
                    append: function() {
                        return this.domManip(arguments, function(a) {
                            1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || O(this, a).appendChild(a)
                        })
                    },
                    prepend: function() {
                        return this.domManip(arguments,
                            function(a) {
                                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                                    var c = O(this, a);
                                    c.insertBefore(a, c.firstChild)
                                }
                            })
                    },
                    before: function() {
                        return this.domManip(arguments, function(a) {
                            this.parentNode && this.parentNode.insertBefore(a, this)
                        })
                    },
                    after: function() {
                        return this.domManip(arguments, function(a) {
                            this.parentNode && this.parentNode.insertBefore(a, this.nextSibling)
                        })
                    },
                    remove: function(a, b) {
                        for (var d, e = a ? c.filter(a, this) : this, g = 0; null != (d = e[g]); g++) b || 1 !== d.nodeType || c.cleanData(K(d)), d.parentNode &&
                            (b && c.contains(d.ownerDocument, d) && ta(K(d, "script")), d.parentNode.removeChild(d));
                        return this
                    },
                    empty: function() {
                        for (var a, b = 0; null != (a = this[b]); b++) {
                            for (1 === a.nodeType && c.cleanData(K(a, !1)); a.firstChild;) a.removeChild(a.firstChild);
                            a.options && c.nodeName(a, "select") && (a.options.length = 0)
                        }
                        return this
                    },
                    clone: function(a, b) {
                        a = null == a ? !1 : a;
                        b = null == b ? a : b;
                        return this.map(function() {
                            return c.clone(this, a, b)
                        })
                    },
                    html: function(a) {
                        return ub(this, function(a) {
                            var b = this[0] || {},
                                f = 0,
                                d = this.length;
                            if (void 0 === a) return 1 ===
                                b.nodeType ? b.innerHTML.replace(ic, "") : void 0;
                            if (!("string" !== typeof a || $b.test(a) || !I.htmlSerialize && Z.test(a) || !I.leadingWhitespace && ba.test(a) || U[(Ub.exec(a) || ["", ""])[1].toLowerCase()])) {
                                a = a.replace(Hb, "<$1></$2>");
                                try {
                                    for (; f < d; f++) b = this[f] || {}, 1 === b.nodeType && (c.cleanData(K(b, !1)), b.innerHTML = a);
                                    b = 0
                                } catch (e) {}
                            }
                            b && this.empty().append(a)
                        }, null, a, arguments.length)
                    },
                    replaceWith: function() {
                        var a = arguments[0];
                        this.domManip(arguments, function(b) {
                            a = this.parentNode;
                            c.cleanData(K(this));
                            a && a.replaceChild(b,
                                this)
                        });
                        return a && (a.length || a.nodeType) ? this : this.remove()
                    },
                    detach: function(a) {
                        return this.remove(a, !0)
                    },
                    domManip: function(a, b) {
                        a = k.apply([], a);
                        var d, e, g, h, l = 0,
                            m = this.length,
                            n = this,
                            p = m - 1,
                            r = a[0],
                            t = c.isFunction(r);
                        if (t || 1 < m && "string" === typeof r && !I.checkClone && fa.test(r)) return this.each(function(c) {
                            var d = n.eq(c);
                            t && (a[0] = r.call(this, c, d.html()));
                            d.domManip(a, b)
                        });
                        if (m && (h = c.buildFragment(a, this[0].ownerDocument, !1, this), d = h.firstChild, 1 === h.childNodes.length && (h = d), d)) {
                            g = c.map(K(h, "script"), ea);
                            for (e =
                                g.length; l < m; l++) d = h, l !== p && (d = c.clone(d, !0, !0), e && c.merge(g, K(d, "script"))), b.call(this[l], d, l);
                            if (e)
                                for (h = g[g.length - 1].ownerDocument, c.map(g, la), l = 0; l < e; l++) d = g[l], Eb.test(d.type || "") && !c._data(d, "globalEval") && c.contains(h, d) && (d.src ? c._evalUrl && c._evalUrl(d.src) : c.globalEval((d.text || d.textContent || d.innerHTML || "").replace(Cb, "")));
                            h = d = null
                        }
                        return this
                    }
                });
                c.each({
                    appendTo: "append",
                    prependTo: "prepend",
                    insertBefore: "before",
                    insertAfter: "after",
                    replaceAll: "replaceWith"
                }, function(a, b) {
                    c.fn[a] = function(a) {
                        for (var f =
                                0, d = [], e = c(a), g = e.length - 1; f <= g; f++) a = f === g ? this : this.clone(!0), c(e[f])[b](a), kc.apply(d, a.get());
                        return this.pushStack(d)
                    }
                });
                var Fb, Dc = {};
                (function() {
                    var a;
                    I.shrinkWrapBlocks = function() {
                        if (null != a) return a;
                        a = !1;
                        var c, b, d;
                        if ((b = C.getElementsByTagName("body")[0]) && b.style) return c = C.createElement("div"), d = C.createElement("div"), d.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", b.appendChild(d).appendChild(c), "undefined" !== typeof c.style.zoom && (c.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1",
                            c.appendChild(C.createElement("div")).style.width = "5px", a = 3 !== c.offsetWidth), b.removeChild(d), a
                    }
                })();
                var Jb = /^margin/,
                    eb = new RegExp("^(" + Yb + ")(?!px)[a-z%]+$", "i"),
                    jb, Fa, Ec = /^(top|right|bottom|left)$/;
                a.getComputedStyle ? (jb = function(c) {
                    return c.ownerDocument.defaultView.opener ? c.ownerDocument.defaultView.getComputedStyle(c, null) : a.getComputedStyle(c, null)
                }, Fa = function(a, b, d) {
                    var e, g, h = a.style;
                    g = (d = d || jb(a)) ? d.getPropertyValue(b) || d[b] : void 0;
                    d && ("" !== g || c.contains(a.ownerDocument, a) || (g = c.style(a,
                        b)), eb.test(g) && Jb.test(b) && (a = h.width, b = h.minWidth, e = h.maxWidth, h.minWidth = h.maxWidth = h.width = g, g = d.width, h.width = a, h.minWidth = b, h.maxWidth = e));
                    return void 0 === g ? g : g + ""
                }) : C.documentElement.currentStyle && (jb = function(a) {
                    return a.currentStyle
                }, Fa = function(a, c, b) {
                    var d, e, g, h = a.style;
                    g = (b = b || jb(a)) ? b[c] : void 0;
                    null == g && h && h[c] && (g = h[c]);
                    if (eb.test(g) && !Ec.test(c)) {
                        b = h.left;
                        if (e = (d = a.runtimeStyle) && d.left) d.left = a.currentStyle.left;
                        h.left = "fontSize" === c ? "1em" : g;
                        g = h.pixelLeft + "px";
                        h.left = b;
                        e && (d.left =
                            e)
                    }
                    return void 0 === g ? g : g + "" || "auto"
                });
                (function() {
                    function b() {
                        var c, f, d, e;
                        if ((f = C.getElementsByTagName("body")[0]) && f.style) {
                            c = C.createElement("div");
                            d = C.createElement("div");
                            d.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
                            f.appendChild(d).appendChild(c);
                            c.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute";
                            g = h = !1;
                            l = !0;
                            a.getComputedStyle &&
                                (g = "1%" !== (a.getComputedStyle(c, null) || {}).top, h = "4px" === (a.getComputedStyle(c, null) || {
                                    width: "4px"
                                }).width, e = c.appendChild(C.createElement("div")), e.style.cssText = c.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", e.style.marginRight = e.style.width = "0", c.style.width = "1px", l = !parseFloat((a.getComputedStyle(e, null) || {}).marginRight), c.removeChild(e));
                            c.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
                            e =
                                c.getElementsByTagName("td");
                            e[0].style.cssText = "margin:0;border:0;padding:0;display:none";
                            if (k = 0 === e[0].offsetHeight) e[0].style.display = "", e[1].style.display = "none", k = 0 === e[0].offsetHeight;
                            f.removeChild(d)
                        }
                    }
                    var d, e, g, h, k, l;
                    d = C.createElement("div");
                    d.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
                    if (e = (e = d.getElementsByTagName("a")[0]) && e.style) e.cssText = "float:left;opacity:.5", I.opacity = "0.5" === e.opacity, I.cssFloat = !!e.cssFloat, d.style.backgroundClip = "content-box",
                        d.cloneNode(!0).style.backgroundClip = "", I.clearCloneStyle = "content-box" === d.style.backgroundClip, I.boxSizing = "" === e.boxSizing || "" === e.MozBoxSizing || "" === e.WebkitBoxSizing, c.extend(I, {
                            reliableHiddenOffsets: function() {
                                null == k && b();
                                return k
                            },
                            boxSizingReliable: function() {
                                null == h && b();
                                return h
                            },
                            pixelPosition: function() {
                                null == g && b();
                                return g
                            },
                            reliableMarginRight: function() {
                                null == l && b();
                                return l
                            }
                        })
                })();
                c.swap = function(a, c, b, d) {
                    var e, g = {};
                    for (e in c) g[e] = a.style[e], a.style[e] = c[e];
                    b = b.apply(a, d || []);
                    for (e in c) a.style[e] =
                        g[e];
                    return b
                };
                var ac = /alpha\([^)]*\)/i,
                    md = /opacity\s*=\s*([^)]*)/,
                    Fc = /^(none|table(?!-c[ea]).+)/,
                    Ua = new RegExp("^(" + Yb + ")(.*)$", "i"),
                    ca = new RegExp("^([+-])=(" + Yb + ")", "i"),
                    Ga = {
                        position: "absolute",
                        visibility: "hidden",
                        display: "block"
                    },
                    Q = {
                        letterSpacing: "0",
                        fontWeight: "400"
                    },
                    p = ["Webkit", "O", "Moz", "ms"];
                c.extend({
                    cssHooks: {
                        opacity: {
                            get: function(a, c) {
                                if (c) {
                                    var b = Fa(a, "opacity");
                                    return "" === b ? "1" : b
                                }
                            }
                        }
                    },
                    cssNumber: {
                        columnCount: !0,
                        fillOpacity: !0,
                        flexGrow: !0,
                        flexShrink: !0,
                        fontWeight: !0,
                        lineHeight: !0,
                        opacity: !0,
                        order: !0,
                        orphans: !0,
                        widows: !0,
                        zIndex: !0,
                        zoom: !0
                    },
                    cssProps: {
                        "float": I.cssFloat ? "cssFloat" : "styleFloat"
                    },
                    style: function(a, b, d, e) {
                        if (a && 3 !== a.nodeType && 8 !== a.nodeType && a.style) {
                            var g, h, k, l = c.camelCase(b),
                                m = a.style;
                            b = c.cssProps[l] || (c.cssProps[l] = Ba(m, l));
                            k = c.cssHooks[b] || c.cssHooks[l];
                            if (void 0 !== d) {
                                if (h = typeof d, "string" === h && (g = ca.exec(d)) && (d = (g[1] + 1) * g[2] + parseFloat(c.css(a, b)), h = "number"), null != d && d === d && ("number" !== h || c.cssNumber[l] || (d += "px"), I.clearCloneStyle || "" !== d || 0 !== b.indexOf("background") ||
                                        (m[b] = "inherit"), !(k && "set" in k) || void 0 !== (d = k.set(a, d, e)))) try {
                                    m[b] = d
                                } catch (n) {}
                            } else return k && "get" in k && void 0 !== (g = k.get(a, !1, e)) ? g : m[b]
                        }
                    },
                    css: function(a, b, d, e) {
                        var g, h;
                        h = c.camelCase(b);
                        b = c.cssProps[h] || (c.cssProps[h] = Ba(a.style, h));
                        (h = c.cssHooks[b] || c.cssHooks[h]) && "get" in h && (g = h.get(a, !0, d));
                        void 0 === g && (g = Fa(a, b, e));
                        "normal" === g && b in Q && (g = Q[b]);
                        return "" === d || d ? (a = parseFloat(g), !0 === d || c.isNumeric(a) ? a || 0 : g) : g
                    }
                });
                c.each(["height", "width"], function(a, b) {
                    c.cssHooks[b] = {
                        get: function(a, f, d) {
                            if (f) return Fc.test(c.css(a,
                                "display")) && 0 === a.offsetWidth ? c.swap(a, Ga, function() {
                                return Wb(a, b, d)
                            }) : Wb(a, b, d)
                        },
                        set: function(a, f, d) {
                            var e = d && jb(a);
                            return fb(a, f, d ? Ib(a, b, d, I.boxSizing && "border-box" === c.css(a, "boxSizing", !1, e), e) : 0)
                        }
                    }
                });
                I.opacity || (c.cssHooks.opacity = {
                    get: function(a, c) {
                        return md.test((c && a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : c ? "1" : ""
                    },
                    set: function(a, b) {
                        var d = a.style,
                            e = a.currentStyle,
                            g = c.isNumeric(b) ? "alpha(opacity=" + 100 * b + ")" : "",
                            h = e && e.filter || d.filter || "";
                        d.zoom =
                            1;
                        if ((1 <= b || "" === b) && "" === c.trim(h.replace(ac, "")) && d.removeAttribute && (d.removeAttribute("filter"), "" === b || e && !e.filter)) return;
                        d.filter = ac.test(h) ? h.replace(ac, g) : h + " " + g
                    }
                });
                c.cssHooks.marginRight = R(I.reliableMarginRight, function(a, b) {
                    if (b) return c.swap(a, {
                        display: "inline-block"
                    }, Fa, [a, "marginRight"])
                });
                c.each({
                    margin: "",
                    padding: "",
                    border: "Width"
                }, function(a, b) {
                    c.cssHooks[a + b] = {
                        expand: function(c) {
                            var d = 0,
                                e = {};
                            for (c = "string" === typeof c ? c.split(" ") : [c]; 4 > d; d++) e[a + tb[d] + b] = c[d] || c[d - 2] || c[0];
                            return e
                        }
                    };
                    Jb.test(a) || (c.cssHooks[a + b].set = fb)
                });
                c.fn.extend({
                    css: function(a, b) {
                        return ub(this, function(a, b, f) {
                            var d, e = {},
                                g = 0;
                            if (c.isArray(b)) {
                                f = jb(a);
                                for (d = b.length; g < d; g++) e[b[g]] = c.css(a, b[g], !1, f);
                                return e
                            }
                            return void 0 !== f ? c.style(a, b, f) : c.css(a, b)
                        }, a, b, 1 < arguments.length)
                    },
                    show: function() {
                        return Xa(this, !0)
                    },
                    hide: function() {
                        return Xa(this)
                    },
                    toggle: function(a) {
                        return "boolean" === typeof a ? a ? this.show() : this.hide() : this.each(function() {
                            ib(this) ? c(this).show() : c(this).hide()
                        })
                    }
                });
                c.Tween = ga;
                ga.prototype = {
                    constructor: ga,
                    init: function(a, b, d, e, g, h) {
                        this.elem = a;
                        this.prop = d;
                        this.easing = g || "swing";
                        this.options = b;
                        this.start = this.now = this.cur();
                        this.end = e;
                        this.unit = h || (c.cssNumber[d] ? "" : "px")
                    },
                    cur: function() {
                        var a = ga.propHooks[this.prop];
                        return a && a.get ? a.get(this) : ga.propHooks._default.get(this)
                    },
                    run: function(a) {
                        var b, d = ga.propHooks[this.prop];
                        this.pos = this.options.duration ? b = c.easing[this.easing](a, this.options.duration * a, 0, 1, this.options.duration) : b = a;
                        this.now = (this.end - this.start) * b + this.start;
                        this.options.step && this.options.step.call(this.elem,
                            this.now, this);
                        d && d.set ? d.set(this) : ga.propHooks._default.set(this);
                        return this
                    }
                };
                ga.prototype.init.prototype = ga.prototype;
                ga.propHooks = {
                    _default: {
                        get: function(a) {
                            return null == a.elem[a.prop] || a.elem.style && null != a.elem.style[a.prop] ? (a = c.css(a.elem, a.prop, "")) && "auto" !== a ? a : 0 : a.elem[a.prop]
                        },
                        set: function(a) {
                            if (c.fx.step[a.prop]) c.fx.step[a.prop](a);
                            else a.elem.style && (null != a.elem.style[c.cssProps[a.prop]] || c.cssHooks[a.prop]) ? c.style(a.elem, a.prop, a.now + a.unit) : a.elem[a.prop] = a.now
                        }
                    }
                };
                ga.propHooks.scrollTop =
                    ga.propHooks.scrollLeft = {
                        set: function(a) {
                            a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now)
                        }
                    };
                c.easing = {
                    linear: function(a) {
                        return a
                    },
                    swing: function(a) {
                        return .5 - Math.cos(a * Math.PI) / 2
                    }
                };
                c.fx = ga.prototype.init;
                c.fx.step = {};
                var Gb, Ob, M = /^(?:toggle|show|hide)$/,
                    Kc = new RegExp("^(?:([+-])=|)(" + Yb + ")([a-z%]*)$", "i"),
                    Hd = /queueHooks$/,
                    Ha = [function(a, b, d) {
                        var e, g, h, k, l, m, n = this,
                            p = {},
                            r = a.style,
                            t = a.nodeType && ib(a),
                            x = c._data(a, "fxshow");
                        d.queue || (k = c._queueHooks(a, "fx"), null == k.unqueued && (k.unqueued = 0,
                            l = k.empty.fire, k.empty.fire = function() {
                                k.unqueued || l()
                            }), k.unqueued++, n.always(function() {
                            n.always(function() {
                                k.unqueued--;
                                c.queue(a, "fx").length || k.empty.fire()
                            })
                        }));
                        1 === a.nodeType && ("height" in b || "width" in b) && (d.overflow = [r.overflow, r.overflowX, r.overflowY], m = c.css(a, "display"), g = "none" === m ? c._data(a, "olddisplay") || T(a.nodeName) : m, "inline" === g && "none" === c.css(a, "float") && (I.inlineBlockNeedsLayout && "inline" !== T(a.nodeName) ? r.zoom = 1 : r.display = "inline-block"));
                        d.overflow && (r.overflow = "hidden", I.shrinkWrapBlocks() ||
                            n.always(function() {
                                r.overflow = d.overflow[0];
                                r.overflowX = d.overflow[1];
                                r.overflowY = d.overflow[2]
                            }));
                        for (e in b)
                            if (g = b[e], M.exec(g)) {
                                delete b[e];
                                h = h || "toggle" === g;
                                if (g === (t ? "hide" : "show"))
                                    if ("show" === g && x && void 0 !== x[e]) t = !0;
                                    else continue;
                                p[e] = x && x[e] || c.style(a, e)
                            } else m = void 0;
                        if (c.isEmptyObject(p)) "inline" === ("none" === m ? T(a.nodeName) : m) && (r.display = m);
                        else
                            for (e in x ? "hidden" in x && (t = x.hidden) : x = c._data(a, "fxshow", {}), h && (x.hidden = !t), t ? c(a).show() : n.done(function() {
                                    c(a).hide()
                                }), n.done(function() {
                                    var b;
                                    c._removeData(a, "fxshow");
                                    for (b in p) c.style(a, b, p[b])
                                }), p) b = sb(t ? x[e] : 0, e, n), e in x || (x[e] = b.start, t && (b.end = b.start, b.start = "width" === e || "height" === e ? 1 : 0))
                    }],
                    va = {
                        "*": [function(a, b) {
                            var d = this.createTween(a, b),
                                e = d.cur(),
                                g = Kc.exec(b),
                                h = g && g[3] || (c.cssNumber[a] ? "" : "px"),
                                k = (c.cssNumber[a] || "px" !== h && +e) && Kc.exec(c.css(d.elem, a)),
                                l = 1,
                                m = 20;
                            if (k && k[3] !== h) {
                                h = h || k[3];
                                g = g || [];
                                k = +e || 1;
                                do l = l || ".5", k /= l, c.style(d.elem, a, k + h); while (l !== (l = d.cur() / e) && 1 !== l && --m)
                            }
                            g && (k = d.start = +k || +e || 0, d.unit = h, d.end = g[1] ?
                                k + (g[1] + 1) * g[2] : +g[2]);
                            return d
                        }]
                    };
                c.Animation = c.extend(xa, {
                    tweener: function(a, b) {
                        c.isFunction(a) ? (b = a, a = ["*"]) : a = a.split(" ");
                        for (var d, e = 0, g = a.length; e < g; e++) d = a[e], va[d] = va[d] || [], va[d].unshift(b)
                    },
                    prefilter: function(a, b) {
                        b ? Ha.unshift(a) : Ha.push(a)
                    }
                });
                c.speed = function(a, b, d) {
                    var e = a && "object" === typeof a ? c.extend({}, a) : {
                        complete: d || !d && b || c.isFunction(a) && a,
                        duration: a,
                        easing: d && b || b && !c.isFunction(b) && b
                    };
                    e.duration = c.fx.off ? 0 : "number" === typeof e.duration ? e.duration : e.duration in c.fx.speeds ? c.fx.speeds[e.duration] :
                        c.fx.speeds._default;
                    if (null == e.queue || !0 === e.queue) e.queue = "fx";
                    e.old = e.complete;
                    e.complete = function() {
                        c.isFunction(e.old) && e.old.call(this);
                        e.queue && c.dequeue(this, e.queue)
                    };
                    return e
                };
                c.fn.extend({
                    fadeTo: function(a, b, c, d) {
                        return this.filter(ib).css("opacity", 0).show().end().animate({
                            opacity: b
                        }, a, c, d)
                    },
                    animate: function(a, b, d, e) {
                        var g = c.isEmptyObject(a),
                            h = c.speed(b, d, e);
                        b = function() {
                            var b = xa(this, c.extend({}, a), h);
                            (g || c._data(this, "finish")) && b.stop(!0)
                        };
                        b.finish = b;
                        return g || !1 === h.queue ? this.each(b) :
                            this.queue(h.queue, b)
                    },
                    stop: function(a, b, d) {
                        var e = function(a) {
                            var b = a.stop;
                            delete a.stop;
                            b(d)
                        };
                        "string" !== typeof a && (d = b, b = a, a = void 0);
                        b && !1 !== a && this.queue(a || "fx", []);
                        return this.each(function() {
                            var b = !0,
                                g = null != a && a + "queueHooks",
                                h = c.timers,
                                k = c._data(this);
                            if (g) k[g] && k[g].stop && e(k[g]);
                            else
                                for (g in k) k[g] && k[g].stop && Hd.test(g) && e(k[g]);
                            for (g = h.length; g--;) h[g].elem !== this || null != a && h[g].queue !== a || (h[g].anim.stop(d), b = !1, h.splice(g, 1));
                            !b && d || c.dequeue(this, a)
                        })
                    },
                    finish: function(a) {
                        !1 !== a && (a =
                            a || "fx");
                        return this.each(function() {
                            var b, d = c._data(this),
                                e = d[a + "queue"];
                            b = d[a + "queueHooks"];
                            var g = c.timers,
                                h = e ? e.length : 0;
                            d.finish = !0;
                            c.queue(this, a, []);
                            b && b.stop && b.stop.call(this, !0);
                            for (b = g.length; b--;) g[b].elem === this && g[b].queue === a && (g[b].anim.stop(!0), g.splice(b, 1));
                            for (b = 0; b < h; b++) e[b] && e[b].finish && e[b].finish.call(this);
                            delete d.finish
                        })
                    }
                });
                c.each(["toggle", "show", "hide"], function(a, b) {
                    var d = c.fn[b];
                    c.fn[b] = function(a, c, f) {
                        return null == a || "boolean" === typeof a ? d.apply(this, arguments) : this.animate(ka(b, !0), a, c, f)
                    }
                });
                c.each({
                    slideDown: ka("show"),
                    slideUp: ka("hide"),
                    slideToggle: ka("toggle"),
                    fadeIn: {
                        opacity: "show"
                    },
                    fadeOut: {
                        opacity: "hide"
                    },
                    fadeToggle: {
                        opacity: "toggle"
                    }
                }, function(a, b) {
                    c.fn[a] = function(a, c, f) {
                        return this.animate(b, a, c, f)
                    }
                });
                c.timers = [];
                c.fx.tick = function() {
                    var a, b = c.timers,
                        d = 0;
                    for (Gb = c.now(); d < b.length; d++) a = b[d], a() || b[d] !== a || b.splice(d--, 1);
                    b.length || c.fx.stop();
                    Gb = void 0
                };
                c.fx.timer = function(a) {
                    c.timers.push(a);
                    a() ? c.fx.start() : c.timers.pop()
                };
                c.fx.interval = 13;
                c.fx.start = function() {
                    Ob ||
                        (Ob = setInterval(c.fx.tick, c.fx.interval))
                };
                c.fx.stop = function() {
                    clearInterval(Ob);
                    Ob = null
                };
                c.fx.speeds = {
                    slow: 600,
                    fast: 200,
                    _default: 400
                };
                c.fn.delay = function(a, b) {
                    a = c.fx ? c.fx.speeds[a] || a : a;
                    return this.queue(b || "fx", function(b, c) {
                        var d = setTimeout(b, a);
                        c.stop = function() {
                            clearTimeout(d)
                        }
                    })
                };
                (function() {
                    var a, b, c, d, e;
                    b = C.createElement("div");
                    b.setAttribute("className", "t");
                    b.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
                    d = b.getElementsByTagName("a")[0];
                    c = C.createElement("select");
                    e = c.appendChild(C.createElement("option"));
                    a = b.getElementsByTagName("input")[0];
                    d.style.cssText = "top:1px";
                    I.getSetAttribute = "t" !== b.className;
                    I.style = /top/.test(d.getAttribute("style"));
                    I.hrefNormalized = "/a" === d.getAttribute("href");
                    I.checkOn = !!a.value;
                    I.optSelected = e.selected;
                    I.enctype = !!C.createElement("form").enctype;
                    c.disabled = !0;
                    I.optDisabled = !e.disabled;
                    a = C.createElement("input");
                    a.setAttribute("value", "");
                    I.input = "" === a.getAttribute("value");
                    a.value = "t";
                    a.setAttribute("type", "radio");
                    I.radioValue =
                        "t" === a.value
                })();
                var pa = /\r/g;
                c.fn.extend({
                    val: function(a) {
                        var b, d, e, g = this[0];
                        if (arguments.length) return e = c.isFunction(a), this.each(function(d) {
                            1 === this.nodeType && (d = e ? a.call(this, d, c(this).val()) : a, null == d ? d = "" : "number" === typeof d ? d += "" : c.isArray(d) && (d = c.map(d, function(a) {
                                return null == a ? "" : a + ""
                            })), b = c.valHooks[this.type] || c.valHooks[this.nodeName.toLowerCase()], b && "set" in b && void 0 !== b.set(this, d, "value") || (this.value = d))
                        });
                        if (g) {
                            if ((b = c.valHooks[g.type] || c.valHooks[g.nodeName.toLowerCase()]) &&
                                "get" in b && void 0 !== (d = b.get(g, "value"))) return d;
                            d = g.value;
                            return "string" === typeof d ? d.replace(pa, "") : null == d ? "" : d
                        }
                    }
                });
                c.extend({
                    valHooks: {
                        option: {
                            get: function(a) {
                                var b = c.find.attr(a, "value");
                                return null != b ? b : c.trim(c.text(a))
                            }
                        },
                        select: {
                            get: function(a) {
                                for (var b, d = a.options, e = a.selectedIndex, g = (a = "select-one" === a.type || 0 > e) ? null : [], h = a ? e + 1 : d.length, k = 0 > e ? h : a ? e : 0; k < h; k++)
                                    if (b = d[k], !(!b.selected && k !== e || (I.optDisabled ? b.disabled : null !== b.getAttribute("disabled")) || b.parentNode.disabled && c.nodeName(b.parentNode,
                                            "optgroup"))) {
                                        b = c(b).val();
                                        if (a) return b;
                                        g.push(b)
                                    }
                                return g
                            },
                            set: function(a, b) {
                                for (var d, e, g = a.options, h = c.makeArray(b), k = g.length; k--;)
                                    if (e = g[k], 0 <= c.inArray(c.valHooks.option.get(e), h)) try {
                                        e.selected = d = !0
                                    } catch (l) {
                                        e.scrollHeight
                                    } else e.selected = !1;
                                d || (a.selectedIndex = -1);
                                return g
                            }
                        }
                    }
                });
                c.each(["radio", "checkbox"], function() {
                    c.valHooks[this] = {
                        set: function(a, b) {
                            if (c.isArray(b)) return a.checked = 0 <= c.inArray(c(a).val(), b)
                        }
                    };
                    I.checkOn || (c.valHooks[this].get = function(a) {
                        return null === a.getAttribute("value") ?
                            "on" : a.value
                    })
                });
                var Db, nd, vb = c.expr.attrHandle,
                    od = /^(?:checked|selected)$/i,
                    kb = I.getSetAttribute,
                    wb = I.input;
                c.fn.extend({
                    attr: function(a, b) {
                        return ub(this, c.attr, a, b, 1 < arguments.length)
                    },
                    removeAttr: function(a) {
                        return this.each(function() {
                            c.removeAttr(this, a)
                        })
                    }
                });
                c.extend({
                    attr: function(a, b, d) {
                        var e, g, h = a.nodeType;
                        if (a && 3 !== h && 8 !== h && 2 !== h) {
                            if ("undefined" === typeof a.getAttribute) return c.prop(a, b, d);
                            1 === h && c.isXMLDoc(a) || (b = b.toLowerCase(), e = c.attrHooks[b] || (c.expr.match.bool.test(b) ? nd : Db));
                            if (void 0 !==
                                d)
                                if (null === d) c.removeAttr(a, b);
                                else {
                                    if (e && "set" in e && void 0 !== (g = e.set(a, d, b))) return g;
                                    a.setAttribute(b, d + "");
                                    return d
                                }
                            else {
                                if (e && "get" in e && null !== (g = e.get(a, b))) return g;
                                g = c.find.attr(a, b);
                                return null == g ? void 0 : g
                            }
                        }
                    },
                    removeAttr: function(a, b) {
                        var d, e, g = 0,
                            h = b && b.match(Sa);
                        if (h && 1 === a.nodeType)
                            for (; d = h[g++];) e = c.propFix[d] || d, c.expr.match.bool.test(d) ? wb && kb || !od.test(d) ? a[e] = !1 : a[c.camelCase("default-" + d)] = a[e] = !1 : c.attr(a, d, ""), a.removeAttribute(kb ? d : e)
                    },
                    attrHooks: {
                        type: {
                            set: function(a, b) {
                                if (!I.radioValue &&
                                    "radio" === b && c.nodeName(a, "input")) {
                                    var d = a.value;
                                    a.setAttribute("type", b);
                                    d && (a.value = d);
                                    return b
                                }
                            }
                        }
                    }
                });
                nd = {
                    set: function(a, b, d) {
                        !1 === b ? c.removeAttr(a, d) : wb && kb || !od.test(d) ? a.setAttribute(!kb && c.propFix[d] || d, d) : a[c.camelCase("default-" + d)] = a[d] = !0;
                        return d
                    }
                };
                c.each(c.expr.match.bool.source.match(/\w+/g), function(a, b) {
                    var d = vb[b] || c.find.attr;
                    vb[b] = wb && kb || !od.test(b) ? function(a, b, c) {
                        var f, e;
                        c || (e = vb[b], vb[b] = f, f = null != d(a, b, c) ? b.toLowerCase() : null, vb[b] = e);
                        return f
                    } : function(a, b, d) {
                        if (!d) return a[c.camelCase("default-" +
                            b)] ? b.toLowerCase() : null
                    }
                });
                wb && kb || (c.attrHooks.value = {
                    set: function(a, b, d) {
                        if (c.nodeName(a, "input")) a.defaultValue = b;
                        else return Db && Db.set(a, b, d)
                    }
                });
                kb || (Db = {
                    set: function(a, b, c) {
                        var d = a.getAttributeNode(c);
                        d || a.setAttributeNode(d = a.ownerDocument.createAttribute(c));
                        d.value = b += "";
                        if ("value" === c || b === a.getAttribute(c)) return b
                    }
                }, vb.id = vb.name = vb.coords = function(a, b, c) {
                    var d;
                    if (!c) return (d = a.getAttributeNode(b)) && "" !== d.value ? d.value : null
                }, c.valHooks.button = {
                    get: function(a, b) {
                        var c = a.getAttributeNode(b);
                        if (c && c.specified) return c.value
                    },
                    set: Db.set
                }, c.attrHooks.contenteditable = {
                    set: function(a, b, c) {
                        Db.set(a, "" === b ? !1 : b, c)
                    }
                }, c.each(["width", "height"], function(a, b) {
                    c.attrHooks[b] = {
                        set: function(a, c) {
                            if ("" === c) return a.setAttribute(b, "auto"), c
                        }
                    }
                }));
                I.style || (c.attrHooks.style = {
                    get: function(a) {
                        return a.style.cssText || void 0
                    },
                    set: function(a, b) {
                        return a.style.cssText = b + ""
                    }
                });
                var bc = /^(?:input|select|textarea|button|object)$/i,
                    xb = /^(?:a|area)$/i;
                c.fn.extend({
                    prop: function(a, b) {
                        return ub(this, c.prop, a, b, 1 <
                            arguments.length)
                    },
                    removeProp: function(a) {
                        a = c.propFix[a] || a;
                        return this.each(function() {
                            try {
                                this[a] = void 0, delete this[a]
                            } catch (b) {}
                        })
                    }
                });
                c.extend({
                    propFix: {
                        "for": "htmlFor",
                        "class": "className"
                    },
                    prop: function(a, b, d) {
                        var e, g, h;
                        h = a.nodeType;
                        if (a && 3 !== h && 8 !== h && 2 !== h) {
                            if (h = 1 !== h || !c.isXMLDoc(a)) b = c.propFix[b] || b, g = c.propHooks[b];
                            return void 0 !== d ? g && "set" in g && void 0 !== (e = g.set(a, d, b)) ? e : a[b] = d : g && "get" in g && null !== (e = g.get(a, b)) ? e : a[b]
                        }
                    },
                    propHooks: {
                        tabIndex: {
                            get: function(a) {
                                var b = c.find.attr(a, "tabindex");
                                return b ? parseInt(b, 10) : bc.test(a.nodeName) || xb.test(a.nodeName) && a.href ? 0 : -1
                            }
                        }
                    }
                });
                I.hrefNormalized || c.each(["href", "src"], function(a, b) {
                    c.propHooks[b] = {
                        get: function(a) {
                            return a.getAttribute(b, 4)
                        }
                    }
                });
                I.optSelected || (c.propHooks.selected = {
                    get: function(a) {
                        if (a = a.parentNode) a.selectedIndex, a.parentNode && a.parentNode.selectedIndex;
                        return null
                    }
                });
                c.each("tabIndex readOnly maxLength cellSpacing cellPadding rowSpan colSpan useMap frameBorder contentEditable".split(" "), function() {
                    c.propFix[this.toLowerCase()] =
                        this
                });
                I.enctype || (c.propFix.enctype = "encoding");
                var Wc = /[\t\r\n\f]/g;
                c.fn.extend({
                    addClass: function(a) {
                        var b, d, e, g, h, k = 0,
                            l = this.length;
                        b = "string" === typeof a && a;
                        if (c.isFunction(a)) return this.each(function(b) {
                            c(this).addClass(a.call(this, b, this.className))
                        });
                        if (b)
                            for (b = (a || "").match(Sa) || []; k < l; k++)
                                if (d = this[k], e = 1 === d.nodeType && (d.className ? (" " + d.className + " ").replace(Wc, " ") : " ")) {
                                    for (h = 0; g = b[h++];) 0 > e.indexOf(" " + g + " ") && (e += g + " ");
                                    e = c.trim(e);
                                    d.className !== e && (d.className = e)
                                }
                        return this
                    },
                    removeClass: function(a) {
                        var b,
                            d, e, g, h, k = 0,
                            l = this.length;
                        b = 0 === arguments.length || "string" === typeof a && a;
                        if (c.isFunction(a)) return this.each(function(b) {
                            c(this).removeClass(a.call(this, b, this.className))
                        });
                        if (b)
                            for (b = (a || "").match(Sa) || []; k < l; k++)
                                if (d = this[k], e = 1 === d.nodeType && (d.className ? (" " + d.className + " ").replace(Wc, " ") : "")) {
                                    for (h = 0; g = b[h++];)
                                        for (; 0 <= e.indexOf(" " + g + " ");) e = e.replace(" " + g + " ", " ");
                                    e = a ? c.trim(e) : "";
                                    d.className !== e && (d.className = e)
                                }
                        return this
                    },
                    toggleClass: function(a, b) {
                        var d = typeof a;
                        return "boolean" === typeof b &&
                            "string" === d ? b ? this.addClass(a) : this.removeClass(a) : c.isFunction(a) ? this.each(function(d) {
                                c(this).toggleClass(a.call(this, d, this.className, b), b)
                            }) : this.each(function() {
                                if ("string" === d)
                                    for (var b, e = 0, g = c(this), h = a.match(Sa) || []; b = h[e++];) g.hasClass(b) ? g.removeClass(b) : g.addClass(b);
                                else if ("undefined" === d || "boolean" === d) this.className && c._data(this, "__className__", this.className), this.className = this.className || !1 === a ? "" : c._data(this, "__className__") || ""
                            })
                    },
                    hasClass: function(a) {
                        a = " " + a + " ";
                        for (var b =
                                0, c = this.length; b < c; b++)
                            if (1 === this[b].nodeType && 0 <= (" " + this[b].className + " ").replace(Wc, " ").indexOf(a)) return !0;
                        return !1
                    }
                });
                c.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(a, b) {
                    c.fn[b] = function(a, c) {
                        return 0 < arguments.length ? this.on(b, null, a, c) : this.trigger(b)
                    }
                });
                c.fn.extend({
                    hover: function(a, b) {
                        return this.mouseenter(a).mouseleave(b ||
                            a)
                    },
                    bind: function(a, b, c) {
                        return this.on(a, null, b, c)
                    },
                    unbind: function(a, b) {
                        return this.off(a, null, b)
                    },
                    delegate: function(a, b, c, d) {
                        return this.on(b, a, c, d)
                    },
                    undelegate: function(a, b, c) {
                        return 1 === arguments.length ? this.off(a, "**") : this.off(b, a || "**", c)
                    }
                });
                var Pb = c.now(),
                    tc = /\?/,
                    $a = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
                c.parseJSON = function(b) {
                    if (a.JSON && a.JSON.parse) return a.JSON.parse(b + "");
                    var d, e = null,
                        g = c.trim(b +
                            "");
                    return g && !c.trim(g.replace($a, function(a, b, c, f) {
                        d && b && (e = 0);
                        if (0 === e) return a;
                        d = c || b;
                        e += !f - !c;
                        return ""
                    })) ? Function("return " + g)() : c.error("Invalid JSON: " + b)
                };
                c.parseXML = function(b) {
                    var d, e;
                    if (!b || "string" !== typeof b) return null;
                    try {
                        a.DOMParser ? (e = new DOMParser, d = e.parseFromString(b, "text/xml")) : (d = new ActiveXObject("Microsoft.XMLDOM"), d.async = "false", d.loadXML(b))
                    } catch (g) {
                        d = void 0
                    }
                    d && d.documentElement && !d.getElementsByTagName("parsererror").length || c.error("Invalid XML: " + b);
                    return d
                };
                var lb,
                    Ia, e = /#.*$/,
                    y = /([?&])_=[^&]*/,
                    ja = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,
                    Ta = /^(?:GET|HEAD)$/,
                    Tb = /^\/\//,
                    Ye = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
                    xc = {},
                    he = {},
                    wa = "*/".concat("*");
                try {
                    Ia = location.href
                } catch (f) {
                    Ia = C.createElement("a"), Ia.href = "", Ia = Ia.href
                }
                lb = Ye.exec(Ia.toLowerCase()) || [];
                c.extend({
                    active: 0,
                    lastModified: {},
                    etag: {},
                    ajaxSettings: {
                        url: Ia,
                        type: "GET",
                        isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(lb[1]),
                        global: !0,
                        processData: !0,
                        async: !0,
                        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                        accepts: {
                            "*": wa,
                            text: "text/plain",
                            html: "text/html",
                            xml: "application/xml, text/xml",
                            json: "application/json, text/javascript"
                        },
                        contents: {
                            xml: /xml/,
                            html: /html/,
                            json: /json/
                        },
                        responseFields: {
                            xml: "responseXML",
                            text: "responseText",
                            json: "responseJSON"
                        },
                        converters: {
                            "* text": String,
                            "text html": !0,
                            "text json": c.parseJSON,
                            "text xml": c.parseXML
                        },
                        flatOptions: {
                            url: !0,
                            context: !0
                        }
                    },
                    ajaxSetup: function(a, b) {
                        return b ? Pa(Pa(a, c.ajaxSettings), b) : Pa(c.ajaxSettings, a)
                    },
                    ajaxPrefilter: Ka(xc),
                    ajaxTransport: Ka(he),
                    ajax: function(a,
                        b) {
                        function d(a, b, f, e) {
                            var g, h, q, r;
                            r = b;
                            if (2 !== E) {
                                E = 2;
                                m && clearTimeout(m);
                                p = void 0;
                                l = e || "";
                                F.readyState = 0 < a ? 4 : 0;
                                e = 200 <= a && 300 > a || 304 === a;
                                if (f) {
                                    q = t;
                                    for (var v = F, u, z, A, y, D = q.contents, C = q.dataTypes;
                                        "*" === C[0];) C.shift(), void 0 === z && (z = q.mimeType || v.getResponseHeader("Content-Type"));
                                    if (z)
                                        for (y in D)
                                            if (D[y] && D[y].test(z)) {
                                                C.unshift(y);
                                                break
                                            }
                                    if (C[0] in f) A = C[0];
                                    else {
                                        for (y in f) {
                                            if (!C[0] || q.converters[y + " " + C[0]]) {
                                                A = y;
                                                break
                                            }
                                            u || (u = y)
                                        }
                                        A = A || u
                                    }
                                    A ? (A !== C[0] && C.unshift(A), q = f[A]) : q = void 0
                                }
                                a: {
                                    f = t;u = q;z = F;A = e;
                                    var K,
                                        N, I, v = {},
                                        D = f.dataTypes.slice();
                                    if (D[1])
                                        for (N in f.converters) v[N.toLowerCase()] = f.converters[N];
                                    for (y = D.shift(); y;)
                                        if (f.responseFields[y] && (z[f.responseFields[y]] = u), !I && A && f.dataFilter && (u = f.dataFilter(u, f.dataType)), I = y, y = D.shift())
                                            if ("*" === y) y = I;
                                            else if ("*" !== I && I !== y) {
                                        N = v[I + " " + y] || v["* " + y];
                                        if (!N)
                                            for (K in v)
                                                if (q = K.split(" "), q[1] === y && (N = v[I + " " + q[0]] || v["* " + q[0]])) {
                                                    !0 === N ? N = v[K] : !0 !== v[K] && (y = q[0], D.unshift(q[1]));
                                                    break
                                                }
                                        if (!0 !== N)
                                            if (N && f["throws"]) u = N(u);
                                            else try {
                                                u = N(u)
                                            } catch (L) {
                                                q = {
                                                    state: "parsererror",
                                                    error: N ? L : "No conversion from " + I + " to " + y
                                                };
                                                break a
                                            }
                                    }
                                    q = {
                                        state: "success",
                                        data: u
                                    }
                                }
                                if (e) t.ifModified && ((r = F.getResponseHeader("Last-Modified")) && (c.lastModified[k] = r), (r = F.getResponseHeader("etag")) && (c.etag[k] = r)), 204 === a || "HEAD" === t.type ? r = "nocontent" : 304 === a ? r = "notmodified" : (r = q.state, g = q.data, h = q.error, e = !h);
                                else if (h = r, a || !r) r = "error", 0 > a && (a = 0);
                                F.status = a;
                                F.statusText = (b || r) + "";
                                e ? G.resolveWith(x, [g, r, F]) : G.rejectWith(x, [F, r, h]);
                                F.statusCode(J);
                                J = void 0;
                                n && w.trigger(e ? "ajaxSuccess" : "ajaxError", [F, t, e ? g : h]);
                                B.fireWith(x, [F, r]);
                                n && (w.trigger("ajaxComplete", [F, t]), --c.active || c.event.trigger("ajaxStop"))
                            }
                        }
                        "object" === typeof a && (b = a, a = void 0);
                        b = b || {};
                        var g, h, k, l, m, n, p, r, t = c.ajaxSetup({}, b),
                            x = t.context || t,
                            w = t.context && (x.nodeType || x.jquery) ? c(x) : c.event,
                            G = c.Deferred(),
                            B = c.Callbacks("once memory"),
                            J = t.statusCode || {},
                            A = {},
                            D = {},
                            E = 0,
                            C = "canceled",
                            F = {
                                readyState: 0,
                                getResponseHeader: function(a) {
                                    var b;
                                    if (2 === E) {
                                        if (!r)
                                            for (r = {}; b = ja.exec(l);) r[b[1].toLowerCase()] = b[2];
                                        b = r[a.toLowerCase()]
                                    }
                                    return null ==
                                        b ? null : b
                                },
                                getAllResponseHeaders: function() {
                                    return 2 === E ? l : null
                                },
                                setRequestHeader: function(a, b) {
                                    var c = a.toLowerCase();
                                    E || (a = D[c] = D[c] || a, A[a] = b);
                                    return this
                                },
                                overrideMimeType: function(a) {
                                    E || (t.mimeType = a);
                                    return this
                                },
                                statusCode: function(a) {
                                    var b;
                                    if (a)
                                        if (2 > E)
                                            for (b in a) J[b] = [J[b], a[b]];
                                        else F.always(a[F.status]);
                                    return this
                                },
                                abort: function(a) {
                                    a = a || C;
                                    p && p.abort(a);
                                    d(0, a);
                                    return this
                                }
                            };
                        G.promise(F).complete = B.add;
                        F.success = F.done;
                        F.error = F.fail;
                        t.url = ((a || t.url || Ia) + "").replace(e, "").replace(Tb, lb[1] +
                            "//");
                        t.type = b.method || b.type || t.method || t.type;
                        t.dataTypes = c.trim(t.dataType || "*").toLowerCase().match(Sa) || [""];
                        null == t.crossDomain && (g = Ye.exec(t.url.toLowerCase()), t.crossDomain = !(!g || g[1] === lb[1] && g[2] === lb[2] && (g[3] || ("http:" === g[1] ? "80" : "443")) === (lb[3] || ("http:" === lb[1] ? "80" : "443"))));
                        t.data && t.processData && "string" !== typeof t.data && (t.data = c.param(t.data, t.traditional));
                        u(xc, t, b, F);
                        if (2 === E) return F;
                        (n = c.event && t.global) && 0 === c.active++ && c.event.trigger("ajaxStart");
                        t.type = t.type.toUpperCase();
                        t.hasContent = !Ta.test(t.type);
                        k = t.url;
                        t.hasContent || (t.data && (k = t.url += (tc.test(k) ? "&" : "?") + t.data, delete t.data), !1 === t.cache && (t.url = y.test(k) ? k.replace(y, "$1_=" + Pb++) : k + (tc.test(k) ? "&" : "?") + "_=" + Pb++));
                        t.ifModified && (c.lastModified[k] && F.setRequestHeader("If-Modified-Since", c.lastModified[k]), c.etag[k] && F.setRequestHeader("If-None-Match", c.etag[k]));
                        (t.data && t.hasContent && !1 !== t.contentType || b.contentType) && F.setRequestHeader("Content-Type", t.contentType);
                        F.setRequestHeader("Accept", t.dataTypes[0] &&
                            t.accepts[t.dataTypes[0]] ? t.accepts[t.dataTypes[0]] + ("*" !== t.dataTypes[0] ? ", " + wa + "; q=0.01" : "") : t.accepts["*"]);
                        for (h in t.headers) F.setRequestHeader(h, t.headers[h]);
                        if (t.beforeSend && (!1 === t.beforeSend.call(x, F, t) || 2 === E)) return F.abort();
                        C = "abort";
                        for (h in {
                                success: 1,
                                error: 1,
                                complete: 1
                            }) F[h](t[h]);
                        if (p = u(he, t, b, F)) {
                            F.readyState = 1;
                            n && w.trigger("ajaxSend", [F, t]);
                            t.async && 0 < t.timeout && (m = setTimeout(function() {
                                F.abort("timeout")
                            }, t.timeout));
                            try {
                                E = 1, p.send(A, d)
                            } catch (K) {
                                if (2 > E) d(-1, K);
                                else throw K;
                            }
                        } else d(-1,
                            "No Transport");
                        return F
                    },
                    getJSON: function(a, b, d) {
                        return c.get(a, b, d, "json")
                    },
                    getScript: function(a, b) {
                        return c.get(a, void 0, b, "script")
                    }
                });
                c.each(["get", "post"], function(a, b) {
                    c[b] = function(a, d, f, e) {
                        c.isFunction(d) && (e = e || f, f = d, d = void 0);
                        return c.ajax({
                            url: a,
                            type: b,
                            dataType: e,
                            data: d,
                            success: f
                        })
                    }
                });
                c._evalUrl = function(a) {
                    return c.ajax({
                        url: a,
                        type: "GET",
                        dataType: "script",
                        async: !1,
                        global: !1,
                        "throws": !0
                    })
                };
                c.fn.extend({
                    wrapAll: function(a) {
                        if (c.isFunction(a)) return this.each(function(b) {
                            c(this).wrapAll(a.call(this,
                                b))
                        });
                        if (this[0]) {
                            var b = c(a, this[0].ownerDocument).eq(0).clone(!0);
                            this[0].parentNode && b.insertBefore(this[0]);
                            b.map(function() {
                                for (var a = this; a.firstChild && 1 === a.firstChild.nodeType;) a = a.firstChild;
                                return a
                            }).append(this)
                        }
                        return this
                    },
                    wrapInner: function(a) {
                        return c.isFunction(a) ? this.each(function(b) {
                            c(this).wrapInner(a.call(this, b))
                        }) : this.each(function() {
                            var b = c(this),
                                d = b.contents();
                            d.length ? d.wrapAll(a) : b.append(a)
                        })
                    },
                    wrap: function(a) {
                        var b = c.isFunction(a);
                        return this.each(function(d) {
                            c(this).wrapAll(b ?
                                a.call(this, d) : a)
                        })
                    },
                    unwrap: function() {
                        return this.parent().each(function() {
                            c.nodeName(this, "body") || c(this).replaceWith(this.childNodes)
                        }).end()
                    }
                });
                c.expr.filters.hidden = function(a) {
                    return 0 >= a.offsetWidth && 0 >= a.offsetHeight || !I.reliableHiddenOffsets() && "none" === (a.style && a.style.display || c.css(a, "display"))
                };
                c.expr.filters.visible = function(a) {
                    return !c.expr.filters.hidden(a)
                };
                var qb = /%20/g,
                    vg = /\[\]$/,
                    yc = /\r?\n/g,
                    Kb = /^(?:submit|button|image|reset|file)$/i,
                    Pc = /^(?:input|select|textarea|keygen)/i;
                c.param =
                    function(a, b) {
                        var d, e = [],
                            g = function(a, b) {
                                b = c.isFunction(b) ? b() : null == b ? "" : b;
                                e[e.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b)
                            };
                        void 0 === b && (b = c.ajaxSettings && c.ajaxSettings.traditional);
                        if (c.isArray(a) || a.jquery && !c.isPlainObject(a)) c.each(a, function() {
                            g(this.name, this.value)
                        });
                        else
                            for (d in a) gb(d, a[d], b, g);
                        return e.join("&").replace(qb, "+")
                    };
                c.fn.extend({
                    serialize: function() {
                        return c.param(this.serializeArray())
                    },
                    serializeArray: function() {
                        return this.map(function() {
                            var a = c.prop(this, "elements");
                            return a ? c.makeArray(a) : this
                        }).filter(function() {
                            var a = this.type;
                            return this.name && !c(this).is(":disabled") && Pc.test(this.nodeName) && !Kb.test(a) && (this.checked || !Bc.test(a))
                        }).map(function(a, b) {
                            var d = c(this).val();
                            return null == d ? null : c.isArray(d) ? c.map(d, function(a) {
                                return {
                                    name: b.name,
                                    value: a.replace(yc, "\r\n")
                                }
                            }) : {
                                name: b.name,
                                value: d.replace(yc, "\r\n")
                            }
                        }).get()
                    }
                });
                c.ajaxSettings.xhr = void 0 !== a.ActiveXObject ? function() {
                    var b;
                    if (!(b = !this.isLocal && /^(get|post|head|put|delete|options)$/i.test(this.type) &&
                            Lc())) a: {
                        try {
                            b = new a.ActiveXObject("Microsoft.XMLHTTP");
                            break a
                        } catch (c) {}
                        b = void 0
                    }
                    return b
                } : Lc;
                var Ma = 0,
                    pc = {},
                    Qc = c.ajaxSettings.xhr();
                a.attachEvent && a.attachEvent("onunload", function() {
                    for (var a in pc) pc[a](void 0, !0)
                });
                I.cors = !!Qc && "withCredentials" in Qc;
                (Qc = I.ajax = !!Qc) && c.ajaxTransport(function(a) {
                    if (!a.crossDomain || I.cors) {
                        var b;
                        return {
                            send: function(d, e) {
                                var g, h = a.xhr(),
                                    k = ++Ma;
                                h.open(a.type, a.url, a.async, a.username, a.password);
                                if (a.xhrFields)
                                    for (g in a.xhrFields) h[g] = a.xhrFields[g];
                                a.mimeType &&
                                    h.overrideMimeType && h.overrideMimeType(a.mimeType);
                                a.crossDomain || d["X-Requested-With"] || (d["X-Requested-With"] = "XMLHttpRequest");
                                for (g in d) void 0 !== d[g] && h.setRequestHeader(g, d[g] + "");
                                h.send(a.hasContent && a.data || null);
                                b = function(d, g) {
                                    var l, m, n;
                                    if (b && (g || 4 === h.readyState))
                                        if (delete pc[k], b = void 0, h.onreadystatechange = c.noop, g) 4 !== h.readyState && h.abort();
                                        else {
                                            n = {};
                                            l = h.status;
                                            "string" === typeof h.responseText && (n.text = h.responseText);
                                            try {
                                                m = h.statusText
                                            } catch (p) {
                                                m = ""
                                            }
                                            l || !a.isLocal || a.crossDomain ? 1223 ===
                                                l && (l = 204) : l = n.text ? 200 : 404
                                        }
                                    n && e(l, m, n, h.getAllResponseHeaders())
                                };
                                a.async ? 4 === h.readyState ? setTimeout(b) : h.onreadystatechange = pc[k] = b : b()
                            },
                            abort: function() {
                                b && b(void 0, !0)
                            }
                        }
                    }
                });
                c.ajaxSetup({
                    accepts: {
                        script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
                    },
                    contents: {
                        script: /(?:java|ecma)script/
                    },
                    converters: {
                        "text script": function(a) {
                            c.globalEval(a);
                            return a
                        }
                    }
                });
                c.ajaxPrefilter("script", function(a) {
                    void 0 === a.cache && (a.cache = !1);
                    a.crossDomain && (a.type = "GET",
                        a.global = !1)
                });
                c.ajaxTransport("script", function(a) {
                    if (a.crossDomain) {
                        var b, d = C.head || c("head")[0] || C.documentElement;
                        return {
                            send: function(c, e) {
                                b = C.createElement("script");
                                b.async = !0;
                                a.scriptCharset && (b.charset = a.scriptCharset);
                                b.src = a.url;
                                b.onload = b.onreadystatechange = function(a, c) {
                                    if (c || !b.readyState || /loaded|complete/.test(b.readyState)) b.onload = b.onreadystatechange = null, b.parentNode && b.parentNode.removeChild(b), b = null, c || e(200, "success")
                                };
                                d.insertBefore(b, d.firstChild)
                            },
                            abort: function() {
                                if (b) b.onload(void 0, !0)
                            }
                        }
                    }
                });
                var kf = [],
                    zc = /(=)\?(?=&|$)|\?\?/;
                c.ajaxSetup({
                    jsonp: "callback",
                    jsonpCallback: function() {
                        var a = kf.pop() || c.expando + "_" + Pb++;
                        this[a] = !0;
                        return a
                    }
                });
                c.ajaxPrefilter("json jsonp", function(b, d, e) {
                    var g, h, k, l = !1 !== b.jsonp && (zc.test(b.url) ? "url" : "string" === typeof b.data && !(b.contentType || "").indexOf("application/x-www-form-urlencoded") && zc.test(b.data) && "data");
                    if (l || "jsonp" === b.dataTypes[0]) return g = b.jsonpCallback = c.isFunction(b.jsonpCallback) ? b.jsonpCallback() : b.jsonpCallback, l ? b[l] = b[l].replace(zc,
                        "$1" + g) : !1 !== b.jsonp && (b.url += (tc.test(b.url) ? "&" : "?") + b.jsonp + "=" + g), b.converters["script json"] = function() {
                        k || c.error(g + " was not called");
                        return k[0]
                    }, b.dataTypes[0] = "json", h = a[g], a[g] = function() {
                        k = arguments
                    }, e.always(function() {
                        a[g] = h;
                        b[g] && (b.jsonpCallback = d.jsonpCallback, kf.push(g));
                        k && c.isFunction(h) && h(k[0]);
                        k = h = void 0
                    }), "script"
                });
                c.parseHTML = function(a, b, d) {
                    if (!a || "string" !== typeof a) return null;
                    "boolean" === typeof b && (d = b, b = !1);
                    b = b || C;
                    var e = hc.exec(a);
                    d = !d && [];
                    if (e) return [b.createElement(e[1])];
                    e = c.buildFragment([a], b, d);
                    d && d.length && c(d).remove();
                    return c.merge([], e.childNodes)
                };
                var Ed = c.fn.load;
                c.fn.load = function(a, b, d) {
                    if ("string" !== typeof a && Ed) return Ed.apply(this, arguments);
                    var e, g, h, k = this,
                        l = a.indexOf(" ");
                    0 <= l && (e = c.trim(a.slice(l, a.length)), a = a.slice(0, l));
                    c.isFunction(b) ? (d = b, b = void 0) : b && "object" === typeof b && (h = "POST");
                    0 < k.length && c.ajax({
                        url: a,
                        type: h,
                        dataType: "html",
                        data: b
                    }).done(function(a) {
                        g = arguments;
                        k.html(e ? c("<div>").append(c.parseHTML(a)).find(e) : a)
                    }).complete(d && function(a,
                        b) {
                        k.each(d, g || [a.responseText, b, a])
                    });
                    return this
                };
                c.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function(a, b) {
                    c.fn[b] = function(a) {
                        return this.on(b, a)
                    }
                });
                c.expr.filters.animated = function(a) {
                    return c.grep(c.timers, function(b) {
                        return a === b.elem
                    }).length
                };
                var nc = a.document.documentElement;
                c.offset = {
                    setOffset: function(a, b, d) {
                        var e, g, h, k = c.css(a, "position"),
                            l = c(a),
                            m = {};
                        "static" === k && (a.style.position = "relative");
                        h = l.offset();
                        g = c.css(a, "top");
                        e = c.css(a, "left");
                        ("absolute" ===
                            k || "fixed" === k) && -1 < c.inArray("auto", [g, e]) ? (e = l.position(), g = e.top, e = e.left) : (g = parseFloat(g) || 0, e = parseFloat(e) || 0);
                        c.isFunction(b) && (b = b.call(a, d, h));
                        null != b.top && (m.top = b.top - h.top + g);
                        null != b.left && (m.left = b.left - h.left + e);
                        "using" in b ? b.using.call(a, m) : l.css(m)
                    }
                };
                c.fn.extend({
                    offset: function(a) {
                        if (arguments.length) return void 0 === a ? this : this.each(function(b) {
                            c.offset.setOffset(this, a, b)
                        });
                        var b, d, e = {
                                top: 0,
                                left: 0
                            },
                            g = (d = this[0]) && d.ownerDocument;
                        if (g) {
                            b = g.documentElement;
                            if (!c.contains(b, d)) return e;
                            "undefined" !== typeof d.getBoundingClientRect && (e = d.getBoundingClientRect());
                            d = jc(g);
                            return {
                                top: e.top + (d.pageYOffset || b.scrollTop) - (b.clientTop || 0),
                                left: e.left + (d.pageXOffset || b.scrollLeft) - (b.clientLeft || 0)
                            }
                        }
                    },
                    position: function() {
                        if (this[0]) {
                            var a, b, d = {
                                    top: 0,
                                    left: 0
                                },
                                e = this[0];
                            "fixed" === c.css(e, "position") ? b = e.getBoundingClientRect() : (a = this.offsetParent(), b = this.offset(), c.nodeName(a[0], "html") || (d = a.offset()), d.top += c.css(a[0], "borderTopWidth", !0), d.left += c.css(a[0], "borderLeftWidth", !0));
                            return {
                                top: b.top -
                                    d.top - c.css(e, "marginTop", !0),
                                left: b.left - d.left - c.css(e, "marginLeft", !0)
                            }
                        }
                    },
                    offsetParent: function() {
                        return this.map(function() {
                            for (var a = this.offsetParent || nc; a && !c.nodeName(a, "html") && "static" === c.css(a, "position");) a = a.offsetParent;
                            return a || nc
                        })
                    }
                });
                c.each({
                    scrollLeft: "pageXOffset",
                    scrollTop: "pageYOffset"
                }, function(a, b) {
                    var d = /Y/.test(b);
                    c.fn[a] = function(e) {
                        return ub(this, function(a, e, f) {
                            var g = jc(a);
                            if (void 0 === f) return g ? b in g ? g[b] : g.document.documentElement[e] : a[e];
                            g ? g.scrollTo(d ? c(g).scrollLeft() :
                                f, d ? f : c(g).scrollTop()) : a[e] = f
                        }, a, e, arguments.length, null)
                    }
                });
                c.each(["top", "left"], function(a, b) {
                    c.cssHooks[b] = R(I.pixelPosition, function(a, d) {
                        if (d) return d = Fa(a, b), eb.test(d) ? c(a).position()[b] + "px" : d
                    })
                });
                c.each({
                    Height: "height",
                    Width: "width"
                }, function(a, b) {
                    c.each({
                        padding: "inner" + a,
                        content: b,
                        "": "outer" + a
                    }, function(d, e) {
                        c.fn[e] = function(e, g) {
                            var h = arguments.length && (d || "boolean" !== typeof e),
                                k = d || (!0 === e || !0 === g ? "margin" : "border");
                            return ub(this, function(b, d, e) {
                                return c.isWindow(b) ? b.document.documentElement["client" +
                                    a] : 9 === b.nodeType ? (d = b.documentElement, Math.max(b.body["scroll" + a], d["scroll" + a], b.body["offset" + a], d["offset" + a], d["client" + a])) : void 0 === e ? c.css(b, d, k) : c.style(b, d, e, k)
                            }, b, h ? e : void 0, h, null)
                        }
                    })
                });
                c.fn.size = function() {
                    return this.length
                };
                c.fn.andSelf = c.fn.addBack;
                "function" === typeof define && define.amd && define("jquery", [], function() {
                    return c
                });
                var Bd = a.jQuery,
                    le = a.$;
                c.noConflict = function(b) {
                    a.$ === c && (a.$ = le);
                    b && a.jQuery === c && (a.jQuery = Bd);
                    return c
                };
                "undefined" === typeof b && (a.jQuery = a.$ = c);
                return c
            })
        },
        {}
    ]
}, {}, [1]);

(function() {
    window["com.genius.Genius"].require.define({
        "shared/universal/jquery": function(g, d, m) {
            m.exports = (window["com.genius.Genius"] || {}).jQuery || jQuery
        }
    })
})();

(function() {
    window["com.genius.Genius"].require.define({
        "offsite/helper": function(g, d, m) {
            var a = d("shared/universal/jquery");

            g = {
                extract_annotation_id: function() {
                    var a = /^\/(\d+)\/./.exec(location.pathname);
                    if (a) return parseInt(a[1], 10)
                },
                extract_filter: function() {
                    if (location.search)
                        for (var a = location.search.slice(1).split("&"), d = 0; d < a.length; d++) {
                            var g = /^annotator=(\w+)$/.exec(a[d]);
                            if (g) return "annotator:" + g[1];
                            if (g = /^filter=([\w:]+)$/.exec(a[d])) return g[1]
                        }
                },
                update_url_state: function(a) {
                    var d = document.createElement("a");
                    d.href = window.location.href;
                    d.pathname = d.pathname.replace(/^\/?\d+\//, "");
                    d.search = d.search.replace(/&?annotator=[\w]+/, "");
                    d.search = d.search.replace(/&?filter=[\w:]+/, "");
                    if (a.annotation_id) {
                        var g = d.pathname;
                        0 !== g.indexOf("/") && (g = "/" + g);
                        d.pathname = "/" + a.annotation_id + g
                    }
                    a.filter && (a = "filter=" + a.filter, d.search = d.search ? d.search + ("&" + a) : a);
                    history.replaceState({}, "", d.href)
                }
            };

            d = {
                extract_annotation_id: function() {
                    var a = /(?:#|&)annotations[\/:](\d+)/.exec(location.hash);
                    if (a) return parseInt(a[1], 10)
                },
                extract_filter: function() {
                    var a = /(?:#|&)filter:([\w:]+)/.exec(location.hash);
                    if (a) return a[1];
                    if (a = /(?:#|&)annotator:(\w+)/.exec(location.hash)) return "annotator:" + a[1]
                },
                update_url_state: function(a) {
                    if (!/(^|\.)forbes\.com$/i.test(window.location.origin) && !/(^|\.)google\.com$/i.test(window.location.origin)) {
                        var d = a.annotation_id,
                            g = a.filter;
                        a = [];
                        d && a.push("annotations:" + d);
                        g && a.push("filter:" + g);
                        d = window.location.href.split("#")[0];
                        a.length && (d += "#" + a.join("&"));
                        history.replaceState({}, "", d)
                    }
                }
            };

            m.exports =
                a.extend({
                    source_location: function() {
                        return "genius.it" === window.location.host ? a("<a>", {
                            href: a("base[href]").attr("href")
                        })[0] : window.location
                    },
                    get_link_by_rel: function(b) {
                        return a('link[rel="' + b + '"]').attr("href")
                    },
                    get_original_document_title: function() {
                        return a("title").attr("data-genius-original-content") || document.title
                    },
                    get_meta_content_by_property: function(b) {
                        b = a('meta[property="' + b + '"]');
                        var d = b.attr("data-genius-original-content");
                        return void 0 !== d ? d : b.attr("content")
                    },
                    hash_for_annotation_id: function(a) {
                        return "#annotations:" +
                            a
                    },
                    url_variants: function() {
                        return {
                            raw_annotatable_url: this.source_location().href,
                            canonical_url: this.get_link_by_rel("canonical"),
                            og_url: this.get_meta_content_by_property("og:url")
                        }
                    }
                }, "genius.it" === window.location.host ? g : d)
        }
    })
})();

(function() {
    window["com.genius.Genius"].require.define({
        "offsite/current_script": function(g, d, m) {
            g = {};
            try {
                g.url = document.currentScript.src
            } catch (a) {
                if (d = /\((.*):\d+:\d+\)$/.exec(a.stack)) g.url = d[1]
            }
            g.url && ((d = /\?.*s=(\w+)/.exec(g.url)) ? g.source = d[1] : "genius.codes" === g.url.replace(/^https?:\/\//i, "").replace(/\/+$/, "") && (g.source = "genius.codes"), d = /\?.*v=([\d\.]+)/.exec(g.url)) && (g.source_version = d[1]);
            m.exports = g
        }
    })
})();

(function() {
    window["com.genius.Genius"].require.define({
        "shared/universal/promise_channel": function(g, d, m) {
            var a = function(a) {
                this.buffer = [];
                a.done(function(a) {
                    this.buffer.forEach(function(b) {
                        a[b.method].apply(a, b.arguments)
                    })
                }.bind(this))
            };
            ["bind", "notify", "call"].forEach(function(b) {
                a.prototype[b] = function() {
                    this.buffer.push({
                        method: b,
                        arguments: arguments
                    })
                }
            });
            m.exports = a
        }
    })
})();

(function() {
    window["com.genius.Genius"].require.define({
        "offsite/omniframe": function(g, d, m) {
            g = window["com.genius.Genius"];
            var a = g.jQuery,
                b = g.Modernizr,
                h = d("jschannel"),
                n = d("offsite/helper"),
                l = d("shared/universal/promise_channel"),
                w = d("offsite/current_script");
            d = function() {
                this.$container = a('<genius-back-page id="genius_back_page">').css("visibility", "hidden");
                this.$iframe = a("<iframe>").appendTo(this.$container);
                window.performance.mark("genius.createOmniframeElement");
                var b = a.Deferred();
                this.channel = new l(b.promise());

                a.on_body_available(function() {
                    this.$container.appendTo(document.body);
                    window.performance.mark("genius.addOmniframeToDom");
                    a("<genius-back-page-mobile-clickjacker>").appendTo(document.body);
                    this.channel = h.build({
                        window: this.$iframe[0].contentWindow,
                        origin: "*",
                        scope: "com.genius.Genius",
                        onReady: function(a) {
                            window.performance.mark("genius.omniframeChannelReady");
                            a.notify({
                                method: "track_page_load",
                                params: {
                                    source_location: n.source_location().href,
                                    script_source: w.source,
                                    script_source_version: w.source_version,
                                    referrer: document.referrer
                                }
                            })
                        }
                    });
                    b.resolve(this.channel)
                }.bind(this))
            };

            a.extend(d.prototype, a.event_emitter, {
                show: function() {
                    a("html").addClass("com-genius-Genius-showing");
                    this.$container.css("visibility", "").addClass("showing");
                    this.enable_scrolling_under_omniframe()
                },
                hide: function() {
                    a("html").removeClass("com-genius-Genius-showing");
                    this.$container.removeClass("showing");
                    this.remove_additional_scrolling_width()
                },
                enable_scrolling_under_omniframe: function() {
                    a("body").css("width", a(window).width());
                    b.touch || a("body").css("padding-right", this.$container.width())
                },
                remove_additional_scrolling_width: function() {
                    a("body").css({
                        width: "",
                        paddingRight: ""
                    })
                },
                reset: function() {
                    this.emit("reset");
                    for (var a = this.$iframe[0].attributes, b = 0; b < a.length; b++) {
                        var d = a[b].name;
                        "src" !== d && "id" !== d && this.$iframe.removeAttr(d)
                    }
                    this.hide()
                },
                set_url: function(a) {
                    window.performance.mark("genius.setOmniframeUrl");
                    this.$iframe.attr("src", a)
                }
            });
            m.exports = new d
        }
    })
})();

(function() {
    window["com.genius.Genius"].require.define({
        "injection/referents": function(g, d, m) {
            var a = d("shared/universal/jquery"),
                b = d("offsite/omniframe");
            m.exports = {
                find_by_id: function(b) {
                    return a('[data-genius-referent-id="' + b + '"]')
                },
                update_visibility: function(b) {
                    a("[data-genius-referent-id]").each(function() {
                        var d = a(this),
                            g = Number(d.attr("data-genius-referent-id")); - 1 !== b.visible.indexOf(g) ? d.attr("data-genius-featured-referent", "true") : -1 !== b.hidden.indexOf(g) && d.removeAttr("data-genius-featured-referent")
                    })
                },
                highlighted: function() {
                    return a("[data-genius-is-highlighted]")
                },
                is_highlighted: function(a) {
                    return !!a.attr("data-genius-is-highlighted")
                },
                activate: function(a) {
                    return a.attr("data-genius-hover", "true")
                },
                deactivate: function(a) {
                    return a.attr("data-genius-hover", "")
                },
                highlight: function(a) {
                    this.dehighlight();
                    return a.attr("data-genius-is-highlighted", !0)
                },
                dehighlight: function() {
                    return a("[data-genius-is-highlighted]").removeAttr("data-genius-is-highlighted")
                },
                preload: function(a) {
                    a && b.channel.notify({
                        method: "fetch_annotation",
                        params: a
                    })
                }
            }
        }
    })
})();

(function() {
    window["com.genius.Genius"].require.define({
        "shared/universal/keyboard_shortcuts": function(g, d, m) {
            var a = d("shared/universal/jquery");
            m.exports = {
                shortcut: function(b, d) {
                    a(window).bind("keydown", b, function(a) {
                        d(a);
                        return !1
                    })
                }
            }
        }
    })
})();

(function() {
    window["com.genius.Genius"].require.define({
        "shared/universal/lodash": function(g, d, m) {
            m.exports = (window["com.genius.Genius"] || {}).lodash
        }
    })
})();

(function(g) {
    var d = g.require,
        m = d("shared/universal/jquery"),
        a = d("shared/universal/lodash"),
        b = g.Modernizr,
        h = d("offsite/omniframe"),
        n = d("injection/referents"),
        l = d("offsite/helper"),
        w = window.performance;
    g.jump_to_referent = function(a) {
        if (!a.length) return !1;
        if (!b.touch) {
            var d = m(window),
                g = d.width(),
                l = h.$container.width(),
                n = a.get_bounding_client_rect().right + d.scrollLeft();
            n > g - l && d.scrollLeft(n - g + l + 15)
        }
        a.is_scrolled_vertically_into_view() || (d = m(window), a = a.offset().top - window.innerHeight / 2 + a.height() / 2,
            b.touch ? x(a) : d.scrollTop(a))
    };
    var r = function(a) {
        m("[data-genius-referent-id=" + a + "]").unwrap_contents()
    };
    g.close_back_page = function() {
        h.channel.notify({
            method: "close"
        })
    };
    h.channel.bind("show_back_page", function() {
        x();
        h.show()
    });
    h.channel.bind("hide_back_page", function() {
        h.$container.hasClass("showing") && (n.deactivate(n.highlighted()), n.dehighlight(), h.reset());
        b.touch && 0 !== m(window).data("previous-scroll-top") && (m("body").css("top", ""), m(window).scrollTop(m(window).data("previous-scroll-top")), m(window).data("previous-scroll-top",
            0))
    });
    h.channel.bind("snarly_referents", function() {
        m("html").attr("data-genius-snarly", !0)
    });
    var t = function(a) {
        a && m(a.target).closest("[data-genius-referent-id][data-genius-featured-referent]").length || (m("genius-pre-annotation-prompt").remove(), g.close_back_page())
    };
    m(document).capture("click", t);
    m(document).capture("click", "genius-back-page-mobile-clickjacker", function() {
        t();
        return !1
    });
    var D = function(a) {
        var b = m.Deferred(),
            d = h.$container;
        h.channel.call({
            method: "display_annotation",
            params: a,
            success: function() {
                b.resolve(d);
                g.work_around_ios_invisible_iframe()
            },
            error: function() {
                h.hide();
                b.reject()
            }
        });
        return b.promise()
    };
    g.work_around_ios_invisible_iframe = function() {
        b.touch && setTimeout(function() {
            var a = h.$container;
            a.hide();
            setImmediate(function() {
                a.show()
            })
        }, 50)
    };
    var x = function(a) {
        a = a || m(window).scrollTop();
        b.touch && (m(window).data("previous-scroll-top", a), m("body").css("top", -m(window).data("previous-scroll-top")))
    };
    g.display_annotation = function(b, d) {
        var h = n.find_by_id(b),
            h = h.is(":visible") ? h.get_bounding_client_rect().top :
            0;
        d = a.assign({}, d, {
            referent_id: b,
            referent_offset: h
        });
        D(d).fail(function() {
            g.close_back_page();
            r(b)
        })
    };
    g.all_referents_anchored = m.Deferred();
    h.channel.bind("activate_referent", function(a, b) {
        var d = n.find_by_id(b),
            h = d.is(":visible");
        n.dehighlight();
        h && (n.highlight(d), g.jump_to_referent(d))
    });
    h.channel.bind("update_url_state", function(a, b) {
        l.update_url_state(b)
    });
    h.channel.bind("referent_deleted", function(a, d) {
        b.touch && g.close_back_page();
        r(d)
    });
    h.channel.bind("update_referent_visibility", function(a,
        b) {
        n.update_visibility(b)
    });
    h.channel.bind("window_keydown", function(a, b) {
        var d = m.Event("keydown", {
            which: b,
            keyCode: b
        });
        h.$iframe.trigger(d)
    });
    h.channel.bind("performance_timing", function() {
        var a = w.getEntries().map(function(a) {
                var b = {},
                    d;
                for (d in a) "function" !== typeof a[d] && (b[d] = a[d]);
                return b
            }),
            b = {},
            d;
        for (d in w.timing) "function" !== typeof w.timing[d] && (b[d] = w.timing[d]);
        return [b, a]
    });
    g.onhashchange = g.onpopstate = window.onpopstate = window.onhashchange = function(a) {
        a.stopImmediatePropagation();
        return !1
    }
})(window["com.genius.Genius"]);

(function() {
    window["com.genius.Genius"].require.define({
        "shared/universal/mutation_observer": function(g, d, m) {
            m.exports = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver
        }
    })
})();

(function() {
    window["com.genius.Genius"].require.define({
        "injection/anchorer": function(g, d, m) {
            var a = d("shared/universal/jquery"),
                b = d("shared/universal/lodash"),
                h = window["com.genius.Genius"],
                n = diff_match_patch;
            g = function(a) {
                this.$container = a;
                var b = new l(a),
                    d = new r(a, b);
                a = new w(a);
                this.strategies = [b, d, a];
                this.referent_payloads = []
            };
            a.extend(g.prototype, {
                anchor: function(d) {
                    return b.reduce(this.strategies, function(a, b) {
                        return a.then(function(a) {
                            return a ? a : b.anchor(d)
                        })
                    }, a.Deferred().resolve().promise())
                }
            });
            var l = function(a) {
                this.$container = a
            };
            a.extend(l.prototype, {
                anchor: function(b) {
                    var d = this.locate_positional_anchor(b.range),
                        g = a.Deferred();
                    d && this.normalize_string(d.text()) === this.normalize_string(b.range.content) ? g.resolve(d) : g.resolve();
                    return g.promise()
                },
                locate_positional_anchor: function(a) {
                    return h.reanchor_range(a)
                },
                normalize_string: function(a) {
                    return a.replace(/\s+/gm, "").toLowerCase()
                }
            });
            d = function() {};
            a.extend(d.prototype, {
                anchor: function(a) {
                    var b = this.refresh_text();
                    return this.find_text_range(a).then(function(d) {
                        if (d) {
                            var g =
                                this.current_normalized_container_text(),
                                h = b.slice(d.start_offset, d.end_offset),
                                g = g.slice(d.start_offset, d.end_offset);
                            return h === g ? this.anchor_text_range(d) : this.anchor(a)
                        }
                    }.bind(this))
                },
                anchor_text_range: function(a) {
                    for (var b = this.$container[0], d = document.createTreeWalker(b, NodeFilter.SHOW_TEXT, null, !1), g = 0, l = a.start_offset, m; d.nextNode();) {
                        for (var n = d.currentNode, t = g + n.textContent.length; l < t;) {
                            l -= g;
                            if (m) return a = document.createRange(), a.setStart(m.node, m.offset), a.setEnd(n, l), h.reanchor_range(a,
                                b);
                            m = {
                                node: n,
                                offset: l
                            };
                            l = a.end_offset
                        }
                        g = t
                    }
                },
                current_normalized_container_text: function() {
                    return this.$container.text().toLowerCase()
                }
            });
            var w = function(a) {
                this.$container = a
            };
            a.extend(w.prototype, d.prototype, {
                find_text_range: function(b) {
                    b = b.range.content;
                    var d = this.text.indexOf(b.toLowerCase()),
                        g = a.Deferred(); - 1 !== d ? g.resolve({
                        start_offset: d,
                        end_offset: d + b.length
                    }) : g.resolve();
                    return g.promise()
                },
                refresh_text: function() {
                    return this.text = this.current_normalized_container_text()
                }
            });
            var r = function(a, b) {
                this.$container =
                    a;
                this.positional_strategy = b
            };
            a.extend(r.prototype, d.prototype, {
                MINIMUM_CHARS_FOR_WORD_SEARCH: 200,
                MATCH_DISTANCE: 1E3,
                MATCH_THRESHOLD: .5,
                find_text_range: function(d) {
                    var g = d.range,
                        h = g.content.toLowerCase(),
                        l = (g.before || "").toLowerCase(),
                        m = (g.after || "").toLowerCase(),
                        n = [];
                    d = this.infer_search_position_from_positional_anchor(d.range);
                    void 0 !== d && n.push(d);
                    Array.prototype.push.apply(n, this.infer_search_positions_from_word_search(this.fragment_in_context_for(g)));
                    n = this.collapse_search_positions(n);
                    if (0 ===
                        n.length) return a.Deferred().resolve();
                    g = b.map(n, function(a) {
                        return this.find_text_range_start(h + m, a).then(function(a) {
                            var b = {};
                            if (a) return b.start_offset = a, this.find_text_range_end(l + h, a + h.length).then(function(d) {
                                if (d && d > a) return b.end_offset = d, b
                            })
                        }.bind(this))
                    }.bind(this));
                    return a.when.apply(null, g).then(function() {
                        var a = b.compact(arguments);
                        return this.closest_match(h, a)
                    }.bind(this))
                },
                collapse_search_positions: function(a) {
                    a = b.sortBy(a);
                    for (var d = this.MATCH_DISTANCE * this.MATCH_THRESHOLD, g = 1; g <
                        a.length - 1; g++) a[g + 1] - a[g - 1] < d && (a.splice(g, 1), --g);
                    return a
                },
                closest_match: function(a, d) {
                    var g = b.uniqBy(d, function(a) {
                            return a.start_offset + "," + a.end_offset
                        }),
                        h = new n;
                    return b.minBy(g, function(b) {
                        b = this.text.substr(b.start_offset, b.end_offset - b.start_offset);
                        b = h.diff_main(b, a);
                        return h.diff_levenshtein(b)
                    }.bind(this))
                },
                fragment_in_context_for: function(a) {
                    var b = a.content;
                    if (!a.before) return b;
                    var d = (this.MINIMUM_CHARS_FOR_WORD_SEARCH - b.length) / 2;
                    return 0 > d ? b : [a.before.substring(a.before.length - d),
                        b, a.after.substring(0, d)
                    ].join("")
                },
                find_text_range_start: function(a, b) {
                    return this.dmp_match(this.text, a, b).then(function(a) {
                        return this.snap_to_word_boundary(a)
                    }.bind(this))
                },
                find_text_range_end: function(a, b) {
                    var d = this.text.length,
                        g = t(a);
                    return this.dmp_match(this.reversed_text, g, Math.max(0, d - b), {
                        Match_Distance: 2 * a.length
                    }).then(function(a) {
                        if (a) return this.snap_to_word_boundary(d - a, "snap_to_end")
                    }.bind(this))
                },
                snap_to_word_boundary: function(a, b) {
                    if (void 0 !== a) {
                        for (var d = b ? 1 : -1;
                            /\w{2}/.test(this.text.substr(a -
                                1, 2));) a += d;
                        return a
                    }
                },
                dmp_match: function(d, g, h, l) {
                    var m = a.Deferred();
                    if (!h) return m.resolve().promise();
                    l = b.assign({
                        Match_Distance: this.MATCH_DISTANCE,
                        Match_Threshold: this.MATCH_THRESHOLD
                    }, l);
                    var t = new n,
                        r = g.slice(0, t.Match_MaxBits);
                    a.extend(t, l);
                    setImmediate(function() {
                        var a = t.match_main(d, r, h);
                        if (0 <= a) return m.resolve(a);
                        m.resolve()
                    });
                    return m.promise()
                },
                infer_search_position_from_positional_anchor: function(a, b) {
                    if (0 !== b) {
                        b = b || 3;
                        var d = this.positional_strategy.locate_positional_anchor(a);
                        if (d) return this.text_offset_of_positional_anchor(d);
                        d = (a.start || "").split("/");
                        d.pop();
                        if (d.length) return d = {
                            start: d.join("/"),
                            end: d.join("/"),
                            startOffset: 0,
                            endOffset: 0
                        }, this.infer_search_position_from_positional_anchor(d, b - 1)
                    }
                },
                infer_search_positions_from_word_search: function(a) {
                    var b = a.split(/\W+/),
                        d = [];
                    for (a = 0; a < b.length; a++) {
                        var g = this.token_index.get(b[a]);
                        void 0 !== g && d.push(g)
                    }
                    d = d.sort(function(a, b) {
                        return a.length - b.length
                    });
                    b = [];
                    for (a = 0; a < d.length && 5 > b.length + d[a].length; a++) Array.prototype.push.apply(b, d[a]);
                    return b
                },
                text_offset_of_positional_anchor: function(a) {
                    var b =
                        document.createRange();
                    b.selectNodeContents(this.$container[0]);
                    b.setEnd(a.start, 0);
                    return b.toString().length
                },
                refresh_text: function() {
                    var a = this.current_normalized_container_text();
                    this.text !== a && (this.text = a, this.reversed_text = t(a), this.rebuild_index());
                    return this.text
                },
                rebuild_index: function() {
                    this.token_index = new D;
                    for (var a = /\w{4,}/g, b = a.exec(this.text); null !== b; b = a.exec(this.text)) this.token_index.add(b[0], a.lastIndex - b[0].length)
                }
            });
            var t = function(a) {
                    for (var b = "", d = a.length - 1; 0 <= d; d--) b +=
                        a[d];
                    return b
                },
                D = function() {
                    this.tokens = {}
                };
            a.extend(D.prototype, {
                get: function(a) {
                    a = this.property_for_token(a);
                    return this.tokens[a] || (this.tokens[a] = [])
                },
                add: function(a, b) {
                    this.get(a).push(b)
                },
                property_for_token: function(a) {
                    for (a = a.toLowerCase(); a in this.tokens && !this.tokens.hasOwnProperty(a);) a += "_";
                    return a
                }
            });
            m.exports = g
        }
    })
})();

(function(g) {
    g = g.require("offsite/current_script");
    "bookmarklet" === g.source && 4 > parseInt(g.source_version) && (alert('Your Genius bookmarklet is out of date, click "OK" to get the lastest version!'), window.location.href = "https://genius.com/bookmarklet?update=1")
})(window["com.genius.Genius"]);

(function() {
    window["com.genius.Genius"].require.define({
        "injection/construct_payload_from_selection": function(g, d, m) {
            var a = d("shared/universal/jquery"),
                b = d("offsite/helper"),
                h;
            g = function() {
                var d;
                var g = n();
                d = g ? l(g) : void 0;
                if (d) {
                    var g = b.url_variants(),
                        h = d.html();
                    d = d.text();
                    var m = n(),
                        J = document.createRange();
                    J.selectNodeContents(a(m.startContainer).closest_block_level_element()[0]);
                    J.setEnd(m.startContainer, m.startOffset);
                    var J = l(J),
                        J = document.createTreeWalker(J[0], NodeFilter.SHOW_TEXT, null, !1),
                        B = J.root.textContent.length;
                    if (200 < B)
                        for (B -= 200; J.nextNode() && 0 < B;) {
                            var A = J.currentNode.textContent;
                            J.currentNode.textContent = B >= A.length ? "" : "..." + A.substring(B);
                            B -= A.length
                        }
                    J = J.root.innerHTML;
                    B = document.createRange();
                    B.selectNodeContents(a(m.endContainer).closest_block_level_element()[0]);
                    B.setStart(m.endContainer, m.endOffset);
                    m = l(B);
                    m = document.createTreeWalker(m[0], NodeFilter.SHOW_TEXT, null, !1);
                    if (200 < m.root.textContent.length)
                        for (B = 0; m.nextNode();)
                            if (200 > B) {
                                var A = m.currentNode.textContent,
                                    E = 200 - B;
                                A.length > E && (m.currentNode.textContent =
                                    A.substring(0, E) + "...");
                                B += A.length
                            } else m.currentNode.textContent = "";
                    m = {
                        before_html: J,
                        after_html: m.root.innerHTML
                    };
                    J = n();
                    B = Range.sniff(J).serialize(document.body);
                    a.extend(B, {
                        before: w(J, 200),
                        after: r(J, 200),
                        content: J.toString()
                    });
                    h = {
                        referent: {
                            fragment: h,
                            fragment_as_text: d,
                            context_for_display: m,
                            range: B,
                            raw_annotatable_url: g.raw_annotatable_url
                        },
                        web_page: {
                            title: b.get_original_document_title()
                        }
                    };
                    a.extend(h.web_page, g);
                    return h
                }
            };
            g.remember_range = function(a) {
                h = a
            };
            var n = function() {
                    return a.get_selection() ?
                        a.get_selection_range() : h
                },
                l = function(b) {
                    var d = a(b.commonAncestorContainer);
                    d.find(":not(:visible)").attr("data-genius-not-visible", "true");
                    b = a("<div>").append(b.cloneContents());
                    d.find("[data-genius-not-visible]").removeAttr("data-genius-not-visible");
                    b.find("[data-genius-not-visible]").remove();
                    return b
                },
                w = function(a, b) {
                    var d = document.createRange();
                    d.setEnd(a.startContainer, a.startOffset);
                    d = d.toString();
                    return d.substring(d.length - b)
                },
                r = function(a, b) {
                    var d = document.createRange();
                    d.selectNodeContents(document.body);
                    d.setStart(a.endContainer, a.endOffset);
                    return d.toString().substring(0, b)
                };
            m.exports = g
        }
    })
})();

(function(g) {
    var d = g.require,
        m = d("shared/universal/jquery"),
        a = d("injection/construct_payload_from_selection"),
        b = {
            native_ios_writeonly: {
                construct_payload_from_selection_for_ios: function() {
                    return a()
                },
                anchor_referent_created_in_ios: function(a, b) {
                    g.highlight_referent(m.extend({}, a.referent, b))
                },
                prompt_for_new_annotation: function() {}
            }
        };
    b.native_ios = m.extend({}, b.native_ios_writeonly, {
        display_annotation: function(a) {
            a = "genius:/" + a.api_path || a.$anchor.attr("data-genius-api-path");
            window.location = a
        }
    });
    g.enable_client_mode =
        function(a) {
            m.extend(g, b[a])
        }
})(window["com.genius.Genius"]);

(function(g) {
    var d = g.jQuery,
        m = g.Modernizr,
        a = g.require,
        b = a("offsite/omniframe"),
        h = g.require("injection/referents"),
        n = a("injection/construct_payload_from_selection"),
        l = function() {
            d("[data-genius-referent-in-progress]").unwrap_contents()
        };
    d(document).on("textselected", function() {
        var a = d.get_selection_range();
        if (!r() || a.commonAncestorContainer.isContentEditable || a.commonAncestorContainer.parentNode.isContentEditable) return !1;
        n.remember_range(a);
        l();
        g.prompt_for_new_annotation()
    });
    var w = function() {
        var a =
            n();
        b.channel.call({
            method: "new_annotation",
            params: {
                payload: a,
                autofocus: !m.touch
            },
            success: function() {
                var d;
                d = a.referent;
                getSelection().removeAllRanges();
                b.once("reset", l);
                d = g.highlight_referent(d).attr("data-genius-referent-in-progress", !0);
                g.jump_to_referent(d);
                g.work_around_ios_invisible_iframe();
                b.channel.notify({
                    method: "frame_visible"
                })
            },
            error: function(a, b) {
                throw a + " " + b;
            }
        })
    };
    b.channel.bind("reset_referent_in_progress", function() {
        l()
    });
    g.prompt_for_new_annotation = function(a) {
        if (!d("genius-pre-annotation-prompt").length &&
            !d("html").hasClass("com-genius-Genius-showing")) {
            a = a || {};
            var b = a.triggering_event,
                g = d("<genius-pre-annotation-prompt><genius-pre-annotation-prompt-inner></genius-pre-annotation-prompt-inner></genius-pre-annotation-prompt>").appendTo(document.body),
                h = d.get_selection_range().getBoundingClientRect();
            a = g.width();
            b = b && b.pageX ? b.pageX : h.left + h.width / 2;
            h = h.top + d(window).scrollTop() - g.height();
            g.offset({
                left: b - a / 2,
                top: h
            });
            g.on("mousedown", function() {
                w();
                g.remove();
                return !1
            })
        }
    };
    var r = function() {
        var a = getSelection();
        return !(!a.rangeCount || a.isCollapsed)
    };
    b.channel.bind("finalize_new_annotation", function(a, b) {
        var l = g.apply_referent_attributes(d("[data-genius-referent-in-progress]"), b);
        h.highlight(l).removeAttr("data-genius-referent-in-progress");
        return {
            anchor_offset: l.offset(),
            scroll_offset: l.get_bounding_client_rect().top
        }
    });
    b.channel.bind("resume_new_annotation", function(a, b) {
        g.select_range(b);
        r() && w()
    });
    d(function() {
        r() && w();
        d(document).on("genius:reinjection", function() {
            r() && w()
        })
    })
})(window["com.genius.Genius"]);

(function(g) {
    g = g.jQuery;
    /hillaryclinton\.com|hfa\.io/.test(window.location.host) && g("html").addClass("com-genius-Genius-hillary");
    /washingtonpost\.com/.test(window.location.host) && g("html").addClass("com-genius-Genius-washington_post");
    /whitehouse\.gov/.test(window.location.host) && g("html").addClass("com-genius-Genius-white_house")
})(window["com.genius.Genius"]);

(function(g) {
    var d = g.jQuery;
    d(function() {
        d(document).on("mouseenter", "genius-back-page", function() {
            d(this).scroll_lock()
        }).on("mouseleave", "genius-back-page", function() {
            d(this).scroll_release()
        })
    })
})(window["com.genius.Genius"]);

(function(g) {
    var d = g.jQuery;
    g.highlight_referent = function(a) {
        var b = this.reanchor_range(a.range);
        return this.highlight_range(b, a)
    };
    g.apply_referent_attributes = function(a, b) {
        a.attr({
            "data-genius-referent-id": b.id,
            "data-genius-style-id": "referent",
            "data-genius-wrapped-path": b.path,
            "data-genius-api-path": b.api_path,
            "data-genius-annotator-id": b.annotator_id
        });
        b.hidden ? a.removeAttr("data-genius-featured-referent") : a.attr("data-genius-featured-referent", "true");
        return a
    };
    g.highlight_range = function(a, b) {
        for (var g =
                d("<genius-referent>"), n = a.textNodes(), l = [], w = 0, r = n.length; w < r; w++) {
            var t = n[w],
                D = t;
            D.wholeText.match(/^\s*$/) && m(D, {
                relation: "nextSibling"
            }) && m(D, {
                relation: "previousSibling"
            }) || l.push(d(t).wrapAll(g).parent().show()[0])
        }
        return this.apply_referent_attributes(d(l), b)
    };
    var m = function(a, b) {
        for (; a = a[b.relation];)
            if (d(a).is(":visible") && "#text" !== a.nodeName) return d(a).is_block_level_element();
        return !1
    };
    g.reanchor_range = function(a, b) {
        b = b || document.body;
        try {
            var d = Range.sniff(a);
            if (d) return d.normalize(b)
        } catch (g) {
            if (g instanceof Range.RangeError || "IndexSizeError" === g.name) return null;
            throw g;
        }
        return null
    };
    g.select_range = function(a) {
        var b = g.reanchor_range(a);
        if (b) return a = document.createRange(), a.setStart(b.start, 0), a.setEnd(b.end, b.end.length), b = document.getSelection(), b.removeAllRanges(), b.addRange(a), a
    }
})(window["com.genius.Genius"]);

(function() {
    window["com.genius.Genius"].require.define({
        "shared/universal/performance_mark_once": function(g, d, m) {
            var a = {};
            m.exports = function(b) {
                if (!a.hasOwnProperty(b)) return a[b] = !0, window.performance.mark("genius." + b)
            }
        }
    })
})();

(function() {
    window["com.genius.Genius"].require.define({
        "shared/universal/annotation_filter": function(g, d, m) {
            var a = {
                all: function() {
                    return function() {
                        return !0
                    }
                },
                featured: function() {
                    return function(a) {
                        return a.featured
                    }
                },
                annotator: function(a) {
                    return function(d) {
                        return d.annotator_login === a
                    }
                }
            };
            g = function(b) {
                this.filter_string = b;
                b = this.filter_args = b.split(":");
                var d = this.filter_type = b.shift();
                this.test = a[d].apply(null, b)
            };
            g.ALL = new g("all");
            m.exports = g
        }
    })
})();

(function(g) {
    var d = g.require,
        m = d("shared/universal/jquery"),
        a = d("shared/universal/lodash"),
        b = d("injection/anchorer"),
        h = d("shared/universal/mutation_observer"),
        n = d("shared/universal/annotation_filter"),
        l = d("shared/universal/performance_mark_once"),
        w = d("offsite/omniframe"),
        r = d("offsite/helper"),
        t = m.Deferred(),
        D = [],
        x = r.extract_annotation_id(),
        G, J, B = m.Deferred(),
        A = B.promise(),
        E = function(b) {
            var d = b.page || 1;
            m.ajax({
                method: "get",
                url: "https://genius.com/host_pages/referents.json?" + m.param(b),
                dataType: "json"
            }).then(function(g) {
                if (!J) {
                    var h =
                        r.extract_filter() || g.default_filter;
                    J = new n(h);
                    B.resolve(J)
                }
                G = g.total_pages;
                la(g.total_entries);
                a.each(g.referents, function(b, h) {
                    var l = d === G && h === g.referents.length - 1;
                    F(a.assign({}, b, {
                        hidden: !J.test(b)
                    })).then(function() {
                        l && w.channel.notify({
                            method: "all_referents_added"
                        })
                    })
                });
                d < G && E(a.assign({}, b, {
                    page: d + 1
                }))
            })
        };
    w.channel.bind("draft_referents_loaded", function(b, d) {
        A.then(function(b) {
            d.referents.forEach(function(d) {
                F(a.assign(d, {
                    hidden: !b.test(d)
                }))
            })
        })
    });
    var F = function(a) {
            return t.then(function(b) {
                return b.anchor(a).then(function(b) {
                    var d;
                    b ? (l("firstHighlight"), b = g.highlight_range(b, a), d = a.$anchor = b, ea()) : D.push(a);
                    return V(a, d)
                })
            })
        },
        K = a.debounce(function() {
            var a = D;
            D = [];
            a.forEach(F)
        }, 500),
        V = function(a, b) {
            var d = m.Deferred();
            w.channel.call({
                method: "add_referents",
                params: [a],
                success: function() {
                    a.id === x && g.display_annotation(a.id, {
                        from_permalink: !0
                    });
                    d.resolve()
                },
                error: function(a, b) {
                    d.reject(a + ": " + b)
                }
            });
            return d.promise()
        },
        O = a.assign({}, r.url_variants(), {
            filter: r.extract_filter(),
            annotation_id: r.extract_annotation_id()
        });
    E(O);
    m.on_body_available(function() {
        t.resolve(new b(m(document.body)));
        w.set_url("https://genius.com/web_pages/back_page?" + m.param(O))
    });
    var ea = a.once(function() {
        w.channel.notify({
            method: "track_annotated_page"
        })
    });
    void 0 !== h && (new h(function(a) {
        if (D.length)
            for (var b = 0; b < a.length; b++)
                if (a[b].addedNodes.length) {
                    K();
                    break
                }
    })).observe(document.documentElement, {
        childList: !0,
        subtree: !0
    });
    var la = function(a) {
        var b = document.createEvent("CustomEvent");
        b.initCustomEvent("genius:referents_added", !0, !0, {
            count: a
        });
        document.dispatchEvent(b)
    };
    w.channel.bind("get_referent_offsets", function() {
        var b =
            m(window).scrollTop(),
            d = m(window).scrollLeft();
        return a(m("genius-referent").map(function(a, b) {
            return {
                id: m(b).data("genius-referent-id"),
                rects: b.getClientRects()
            }
        })).chain().reduce(function(b, d) {
            return a.set(b, d.id, (b[d.id] || []).concat(a.toArray(d.rects)))
        }, {}).reduce(function(g, h, l) {
            if (!h.length) return g;
            h = a.first(h.sort(function(a, b) {
                return a.top !== b.top ? a.top > b.top ? 1 : -1 : a.left !== b.left ? a.left > b.left ? 1 : -1 : 0
            }));
            return a.set(g, l, {
                top: h.top + b,
                left: h.left + d
            })
        }, {}).value()
    })
})(window["com.genius.Genius"]);

(function(g) {
    var d = g.jQuery,
        m = g.require,
        a = m("offsite/omniframe"),
        b = g.require("injection/referents");
    d.extend(d.referents_for_this_annotation.settings, {
        selector: function(a) {
            return '[data-genius-referent-id="' + a + '"]'
        },
        attribute: "data-genius-referent-id"
    });
    d(document).on("mouseenter", '[data-genius-referent-id][data-genius-featured-referent],[data-genius-referent-filter="everything"] [data-genius-referent-id]', function() {
        var a = d(this);
        b.activate(a.referents_for_this_annotation());
        b.preload(a.attr("data-genius-referent-id"))
    }).on("mouseleave",
        '[data-genius-referent-id][data-genius-featured-referent],[data-genius-referent-filter="everything"] [data-genius-referent-id]',
        function() {
            b.deactivate(d(this).referents_for_this_annotation())
        }).capture("click", '[data-genius-referent-id][data-genius-featured-referent],[data-genius-referent-filter="everything"] [data-genius-referent-id]', function() {
        var h = d(this);
        if (!d.get_selection()) {
            if (b.is_highlighted(h)) g.close_back_page();
            else {
                var m = h.closest("a[href]"),
                    h = Number(h.attr("data-genius-referent-id"));
                m.length && (m = {
                    annotation_id: h,
                    url: m.prop("href"),
                    text: m.text() || "Open Link"
                }, m.url && a.channel.notify({
                    method: "display_underlying_link",
                    params: m
                }));
                g.display_annotation(h)
            }
            return !1
        }
    })
})(window["com.genius.Genius"]);

(function(g) {
    var d = g.jQuery;
    g.inject_stylesheet = function(g) {
        d("head").append('<link rel="stylesheet" href="' + g + '" type="text/css" />')
    }
})(window["com.genius.Genius"]);

(function(g) {
    var d = g.require("offsite/current_script");
    g.enable_client_mode(d.source)
})(window["com.genius.Genius"]);

window["com.genius.Genius"].inject_stylesheet("https://assets.genius.com/stylesheets/compiled/injection-5116e21defa1e220be9833d7a3ed630b.css");

performance.mark("genius.finishScriptEvaluation");
