(function() {
    function r(e, n, t) {
        function o(i, f) {
            if (!n[i]) {
                if (!e[i]) {
                    var c = "function" == typeof require && require;
                    if (!f && c) return c(i, !0);
                    if (u) return u(i, !0);
                    var a = new Error("Cannot find module '" + i + "'");
                    throw ((a.code = "MODULE_NOT_FOUND"), a);
                }
                var p = (n[i] = { exports: {} });
                e[i][0].call(
                    p.exports,
                    function(r) {
                        var n = e[i][1][r];
                        return o(n || r);
                    },
                    p,
                    p.exports,
                    r,
                    e,
                    n,
                    t
                );
            }
            return n[i].exports;
        }
        for (var u = "function" == typeof require && require, i = 0; i < t.length; i++) o(t[i]);
        return o;
    }
    return r;
})()(
    {
        1: [
            function(require, module, exports) {
                "use strict";

                require("core-js/modules/es6.array.from");

                require("core-js/modules/es6.reflect.construct");

                require("core-js/modules/es6.object.set-prototype-of");

                require("core-js/modules/es7.symbol.async-iterator");

                require("core-js/modules/es6.symbol");

                require("core-js/modules/es6.map");

                require("core-js/modules/es6.object.keys");

                require("core-js/modules/es6.function.name");

                require("core-js/modules/es7.array.includes");

                require("core-js/modules/es6.string.includes");

                require("core-js/modules/es6.object.assign");

                require("core-js/modules/es6.weak-map");

                require("core-js/modules/es6.regexp.split");

                require("core-js/modules/es6.string.starts-with");

                require("core-js/modules/es6.regexp.constructor");

                require("core-js/modules/es6.regexp.replace");

                require("core-js/modules/web.dom.iterable");

                require("core-js/modules/es6.array.iterator");

                require("core-js/modules/es6.string.iterator");

                require("core-js/modules/es6.set");

                require("core-js/modules/es6.regexp.to-string");

                require("core-js/modules/es6.promise");

                require("core-js/modules/es6.object.to-string");

                function _toConsumableArray(arr) {
                    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
                }

                function _nonIterableSpread() {
                    throw new TypeError("Invalid attempt to spread non-iterable instance");
                }

                function _iterableToArray(iter) {
                    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
                }

                function _arrayWithoutHoles(arr) {
                    if (Array.isArray(arr)) {
                        for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
                            arr2[i] = arr[i];
                        }
                        return arr2;
                    }
                }

                function isNativeReflectConstruct() {
                    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
                    if (Reflect.construct.sham) return false;
                    if (typeof Proxy === "function") return true;
                    try {
                        Date.prototype.toString.call(Reflect.construct(Date, [], function() {}));
                        return true;
                    } catch (e) {
                        return false;
                    }
                }

                function _construct(Parent, args, Class) {
                    if (isNativeReflectConstruct()) {
                        _construct = Reflect.construct;
                    } else {
                        _construct = function _construct(Parent, args, Class) {
                            var a = [null];
                            a.push.apply(a, args);
                            var Constructor = Function.bind.apply(Parent, a);
                            var instance = new Constructor();
                            if (Class) _setPrototypeOf(instance, Class.prototype);
                            return instance;
                        };
                    }
                    return _construct.apply(null, arguments);
                }

                function _setPrototypeOf(o, p) {
                    _setPrototypeOf =
                        Object.setPrototypeOf ||
                        function _setPrototypeOf(o, p) {
                            o.__proto__ = p;
                            return o;
                        };
                    return _setPrototypeOf(o, p);
                }

                function _defineProperty(obj, key, value) {
                    if (key in obj) {
                        Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
                    } else {
                        obj[key] = value;
                    }
                    return obj;
                }

                function _typeof(obj) {
                    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
                        _typeof = function _typeof(obj) {
                            return typeof obj;
                        };
                    } else {
                        _typeof = function _typeof(obj) {
                            return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype
                                ? "symbol"
                                : typeof obj;
                        };
                    }
                    return _typeof(obj);
                }

                (function(window, document) {
                    var IS_IE = window == document && document != window;
                    var BOOL_PROPS = [
                        "autofocus",
                        "hidden",
                        "readonly",
                        "disabled",
                        "checked",
                        "selected",
                        "multiple",
                        "translate",
                        "draggable",
                        "noresize"
                    ];
                    var $SLOT = "$SLOT";

                    var defer = function defer(fn) {
                        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                            args[_key - 1] = arguments[_key];
                        }

                        return Promise.resolve.apply(Promise, args).then(fn);
                    };

                    var log = function log() {
                        var _console;

                        return (_console = console).log.apply(_console, arguments);
                    };

                    var warn = function warn() {
                        var _console2;

                        return (_console2 = console).warn.apply(_console2, arguments);
                    };

                    var error = function error() {
                        var _console3;

                        return (_console3 = console).error.apply(_console3, arguments);
                    };

                    var _toString = function _toString(obj) {
                        return Object.prototype.toString.call(obj);
                    };

                    var isFunction = function isFunction(obj) {
                        return typeof obj == "function" && obj.constructor == Function;
                    };

                    var isBoolean = function isBoolean(str) {
                        return typeof str === "boolean";
                    };

                    var isNumber = function isNumber(str) {
                        return typeof str === "number";
                    };

                    var isString = function isString(str) {
                        return typeof str === "string";
                    };

                    var isObject = function isObject(obj) {
                        return obj !== null && (typeof str === "undefined" ? "undefined" : _typeof(str)) === "object";
                    };

                    var isArray = function isArray(obj) {
                        return Array.isArray(obj) || obj instanceof Array;
                    };

                    var isPlainObject = function isPlainObject(obj) {
                        return _toString(obj) === "[object Object]";
                    };

                    var isDate = function isDate(obj) {
                        return _toString(obj) === "[object Date]";
                    };

                    var isRegExp = function isRegExp(obj) {
                        return _toString(obj) === "[object RegExp]";
                    };

                    var isMap = function isMap(obj) {
                        return _toString(obj) === "[object Map]";
                    };

                    var isSet = function isSet(obj) {
                        return _toString(obj) === "[object Set]";
                    };

                    var isTextNode = function isTextNode(obj) {
                        return _toString(obj) === "[object Text]";
                    };

                    var toLowerCase = function toLowerCase(str) {
                        return str.toLowerCase();
                    };

                    var BUS = (function() {
                        var keySetFn = {};

                        var on = function on(key, fn) {
                            if (!key || !isFunction(fn)) {
                                return;
                            }

                            key = toLowerCase(key);
                            (keySetFn[key] || (keySetFn[key] = new Set())).add(fn);
                        };

                        var off = function off(key, fn) {
                            key = toLowerCase(key);
                            var setFn = keySetFn[key];
                            setFn && (fn ? setFn.delete(fn) : delete keySetFn[key]);
                        };

                        var once = function once(key, fn) {
                            fn["ONCE_" + toLowerCase(key)] = 1;
                            on(key, fn);
                        };

                        var at = function at(key) {
                            for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                                args[_key2 - 1] = arguments[_key2];
                            }

                            key = toLowerCase(key);
                            var rs,
                                setFn = keySetFn[key];

                            if (setFn) {
                                setFn.forEach(function(fn) {
                                    fn["ONCE_" + key] && setFn.delete(fn) && delete fn["ONCE_" + key];
                                    rs = fn.apply(void 0, args);
                                });
                                !setFn.size && off(key);
                            }

                            return rs;
                        };

                        on("window.onload", function(e) {
                            $$(".pre-render").addClass("loaded");
                            setTimeout(function() {
                                return $$(".pre-render").remove();
                            }, 5e3);
                        });

                        var handler = function handler(e) {
                            at("window.onload", e);
                            window.removeEventListener ? window.removeEventListener("load", handler) : window.detachEvent("onload", handler);
                            off("window.onload");
                        };

                        window.addEventListener ? window.addEventListener("load", handler, false) : window.attachEvent("onload", handler);
                        return {
                            on: on,
                            off: off,
                            once: once,
                            at: at
                        };
                    })();

                    var Router = (function(BUS) {
                        var historyApi = history && history.pushState;
                        var routes = [];
                        var notfoundRoutes = [];
                        var defaultRoutes = [];
                        var activeRoutes = [];
                        var ignoreHashchange;

                        var fnLocationChange = function fnLocationChange(e) {
                            return BUS.at("router.locationchange", e);
                        };

                        var eventname = historyApi ? "popstate" : "hashchange";
                        window.addEventListener
                            ? window.addEventListener(eventname, fnLocationChange, false)
                            : window.attachEvent("on" + eventname, fnLocationChange);
                        BUS.on("window.onload", function(e) {
                            var path = location.hash ? location.hash.substring(1) : "",
                                useDefault = 1;
                            route({
                                path: path,
                                useDefault: useDefault
                            }) &&
                                replace({
                                    path: path,
                                    state: {
                                        useDefault: useDefault
                                    }
                                });
                        });
                        var locationchange;

                        if (historyApi) {
                            locationchange = function locationchange(e) {
                                var path = location.hash ? location.hash.substring(1) : "";
                                var state = e.state;
                                var useDefault = state ? state.useDefault : 0;
                                useDefault
                                    ? route({
                                          path: path,
                                          useDefault: useDefault
                                      })
                                    : route({
                                          path: path,
                                          state: state
                                      });
                            };
                        } else {
                            locationchange = function locationchange(e) {
                                if (!ignoreHashchange) {
                                    var hash = location.hash ? location.hash.substring(1) : "";
                                    var idx = hash.indexOf("?");

                                    if (idx >= 0) {
                                        var path = hash.substring(0, idx);
                                        var key = hash.substring(idx + 1);
                                        var ctx = sessionStorage.getItem(key);

                                        if (ctx != null) {
                                            ctx = JSON.parse(ctx);

                                            if (ctx.path != path) {
                                                route({
                                                    path: hash
                                                });
                                            } else {
                                                if (ctx.state && ctx.state.useDefault) {
                                                    route({
                                                        path: path,
                                                        useDefault: 1
                                                    });
                                                } else {
                                                    route(ctx);
                                                }
                                            }
                                        } else {
                                            route({
                                                path: hash
                                            });
                                        }
                                    } else {
                                        route({
                                            path: hash
                                        });
                                    }
                                }
                            };
                        }

                        BUS.on("router.locationchange", locationchange);

                        var register = function register(route) {
                            if (route.notfound) {
                                notfoundRoutes.push(route);
                            } else {
                                route.path == null && (route.path = "");
                                routes.push(route);
                            }

                            route.default && defaultRoutes.push(route);
                        };

                        var match = function match(pattern, path) {
                            return pattern.indexOf("*") < 0 ? pattern == path : patternToRegExp(pattern).test(path);
                        };

                        var patternToRegExp = function patternToRegExp(pattern) {
                            var reg = pattern.replace(/[\^\$\.\+\-\=\!\(\)\[\]\{\}\/\?]{1}/g, function(ch) {
                                return "\\" + ch;
                            });
                            reg = reg.replace(/\*+/g, ".*");
                            return new RegExp("^" + reg + "$");
                        };

                        var route = function route(ctx) {
                            var useDefault;

                            if (routes.length) {
                                var nextRoutes = [];
                                routes.forEach(function(rt) {
                                    return match(rt.path, ctx.path) && nextRoutes.push(rt);
                                });

                                if (!nextRoutes.length && ctx.useDefault && defaultRoutes.length) {
                                    nextRoutes = defaultRoutes;
                                    useDefault = 1;
                                }

                                if (nextRoutes.length) {
                                    notfoundRoutes.forEach(function(rt) {
                                        return rt.component.setState({
                                            active: 0
                                        });
                                    });
                                    activeRoutes.forEach(function(rt) {
                                        return rt.component.setState({
                                            active: 0
                                        });
                                    });
                                    nextRoutes.forEach(function(rt) {
                                        return rt.component.route(ctx);
                                    });
                                    activeRoutes = nextRoutes;
                                } else {
                                    activeRoutes.forEach(function(rt) {
                                        return rt.component.setState({
                                            active: 0
                                        });
                                    });
                                    notfoundRoutes.forEach(function(rt) {
                                        return rt.component.route(ctx);
                                    });
                                }
                            } else {
                                notfoundRoutes.forEach(function(rt) {
                                    return rt.component.route();
                                });
                            }

                            BUS.at("router.onroute", ctx);
                            return useDefault;
                        };

                        var push = function push(ctx) {
                            if (historyApi) {
                                history.pushState(ctx.state, ctx.title, "#" + ctx.path);
                            } else {
                                ignoreHashchange = true;

                                if (ctx.state == null) {
                                    location.hash = ctx.path;
                                } else {
                                    var jsonStr = JSON.stringify(ctx);
                                    var key = hashString(jsonStr);
                                    sessionStorage.setItem(key, jsonStr);
                                    location.hash = ctx.path + "?" + key;
                                }

                                setTimeout(function() {
                                    return (ignoreHashchange = false);
                                });
                            }
                        };

                        var replace = function replace(ctx) {
                            if (historyApi) {
                                history.replaceState(ctx.state, ctx.title, "#" + ctx.path);
                            } else {
                                if (ctx.state == null) {
                                    location.replace("#" + ctx.path);
                                } else {
                                    var jsonStr = JSON.stringify(ctx);
                                    var key = hashString(jsonStr);
                                    sessionStorage.setItem(key, jsonStr);
                                    location.replace("#" + ctx.path + "?" + key);
                                }
                            }
                        };

                        var url = function url(_url) {
                            location.href = _url;
                        };

                        var page = function page(ctx) {
                            if (/^http[s]?:/i.test(ctx.path)) {
                                return url(ctx.path);
                            }

                            push(ctx) > route(ctx);
                        };

                        var hashString = function hashString(str) {
                            var rs = 53653,
                                i = str.length;

                            while (i) {
                                rs = (rs * 33) ^ str.charCodeAt(--i);
                            }

                            return (rs >>> 0).toString(36);
                        };

                        return {
                            register: register,
                            page: page,
                            route: route,
                            push: push,
                            replace: replace,
                            url: url
                        };
                    })(BUS);

                    var DomAttrHandle = (function() {
                        var _this = this;

                        var callbacks = {};

                        var on = function on(key, fn) {
                            return callbacks[toLowerCase(key)] || (callbacks[toLowerCase(key)] = fn);
                        };

                        var at = function at(el, prop, val) {
                            return (callbacks[toLowerCase(el.tagName + "." + prop)] || callbacks[toLowerCase(prop)] || callbacks["*"]).apply(_this, [
                                el,
                                prop,
                                val
                            ]);
                        };

                        on("*", function(el, prop, val) {
                            return isFunction(val) || val == null || prop.startsWith("$") ? el.getAttribute(prop) : el.setAttribute(prop, val);
                        });
                        BOOL_PROPS.forEach(function(k) {
                            return on(k, function(el, prop, val) {
                                return val === undefined ? el[k] : (el[k] = toBoolean(val));
                            });
                        });
                        on("value", function(el, prop, val) {
                            return val === undefined ? el.value : (el.value = val == null ? "" : val);
                        });
                        on("innerHTML", function(el, prop, val) {
                            return val === undefined ? el.innerHTML : (el.innerHTML = val == null ? "" : val);
                        });
                        on("innerTEXT", function(el, prop, val) {
                            return val === undefined ? el.textContent : (el.textContent = val == null ? "" : val);
                        });
                        on("textcontent", function(el, prop, val) {
                            return val === undefined ? el.textContent : (el.textContent = val == null ? "" : val);
                        });
                        on("img.src", function(el, prop, val) {
                            return val === undefined ? el.src : (el.src = val);
                        });
                        on("class", function(el, prop, val) {
                            if (val === undefined) {
                                return el.className;
                            }

                            if (isPlainObject(val)) {
                                for (var key in val) {
                                    toBoolean(val[key]) ? $$(el).addClass(key) : $$(el).removeClass(key);
                                }
                            } else {
                                $$(el).addClass(val);
                            }
                        });
                        on("style", function(el, prop, val) {
                            if (val === undefined) {
                                return el.getAttribute("style");
                            }

                            var oStyle = parseStyleToObject(val);

                            for (var key in oStyle) {
                                el.style[key] = oStyle[key];
                            }
                        });
                        return {
                            at: at
                        };
                    })();

                    function parseStyleToObject() {
                        var style = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

                        if (isPlainObject(style)) {
                            return style;
                        }

                        var rs = {};
                        var ary = style.split(";").filter(function(v) {
                            return v.trim() != "";
                        });
                        ary.forEach(function(v) {
                            var kv = v.split(":").filter(function(v) {
                                    return v.trim() != "";
                                }),
                                key;

                            if (kv.length == 2) {
                                key = toLowerCase(kv[0])
                                    .split("-")
                                    .filter(function(v) {
                                        return v.trim() != "";
                                    })
                                    .map(function(v, i) {
                                        return i ? v.charAt(0).toUpperCase() + v.substring(1) : v;
                                    })
                                    .join("");
                                rs[key] = kv[1].trim();
                            }
                        });
                        return rs;
                    }

                    function $$(selector, context) {
                        if (_typeof(selector) == "object") {
                            return new Dom(selector);
                        }

                        var doc = context || document;
                        var byId = selector.substring(0, 1) == "#";
                        var qs;

                        if (byId) {
                            qs = document.getElementById(selector.substring(1));
                            return new Dom(qs ? [qs] : []);
                        }

                        if (doc instanceof Dom) {
                            var ary = [],
                                _qs;

                            if (byId) {
                                for (var i = 0; i < doc.length; i++) {
                                    _qs = doc[i].querySelectorAll(selector);

                                    for (var j = 0; j < _qs.length; j++) {
                                        ary.push(_qs[j]);
                                    }
                                }
                            }

                            return new Dom(ary);
                        }

                        return new Dom(doc.querySelectorAll(selector));
                    }

                    function Dom(queryResult) {
                        var els = [];

                        if (queryResult) {
                            if (queryResult.nodeType) {
                                els[0] = queryResult;
                            } else if (queryResult.length) {
                                for (var i = 0; i < queryResult.length; i++) {
                                    queryResult[i] && els.push(queryResult[i]);
                                }
                            }
                        }

                        this.length = els.length;

                        for (var _i = 0; _i < els.length; _i++) {
                            this[_i] = els[_i];
                        }

                        this.forEach = function(fn) {
                            els.forEach(fn);
                            return this;
                        };

                        this.replaceWith = function(element) {
                            var el, parent, theOne;

                            while (els.length) {
                                el = els.pop();
                                parent = el.parentNode;
                                parent && (theOne ? parent.removeChild(el) : (theOne = el));
                            }

                            if (theOne) {
                                theOne.parentNode.insertBefore(element, theOne);
                                theOne.parentNode.removeChild(theOne);
                            }

                            return this;
                        };

                        this.on = function(name, fn) {
                            els.forEach(function(el) {
                                el.addEventListener
                                    ? el.addEventListener(name, fn, false)
                                    : el.attachEvent
                                    ? el.attachEvent("on" + name, fn)
                                    : (el["on" + name] = fn);
                            });
                            return this;
                        };

                        this.addClass = function(name) {
                            if (!name) {
                                return this;
                            }

                            for (var _i2 = 0, el; _i2 < els.length; _i2++) {
                                el = els[_i2];

                                if (!el) {
                                    continue;
                                }

                                if (IS_IE) {
                                    if (!el.className) {
                                        el.className = name;
                                    } else {
                                        var ary = el.className.split(" ");

                                        if (ary.indexOf(name) >= 0) {
                                            return this;
                                        }

                                        ary.push(name);
                                        el.className = ary.join(" ");
                                    }
                                } else {
                                    var nms = name.split(/\s+/);

                                    for (var _i3 = 0, nm; (nm = nms[_i3++]); ) {
                                        !el.classList.contains(nm) && el.classList.add(nm);
                                    }
                                }
                            }

                            return this;
                        };

                        this.removeClass = function(name) {
                            name &&
                                els.forEach(function(el) {
                                    if (IS_IE) {
                                        var ary = el.className.split(" ");
                                        var idx = ary.indexOf(name);

                                        if (idx >= 0) {
                                            ary.slice(idx, 1);
                                            el.className = ary.join(" ");
                                        }
                                    } else {
                                        var nms = name.split(/\s+/);
                                        nms.forEach(function(nm) {
                                            return el.classList.remove(nm);
                                        });
                                    }
                                });
                            return this;
                        };

                        this.toggleClass = function(name) {
                            name &&
                                els.forEach(function(el) {
                                    if (IS_IE) {
                                        var ary = el.className.split(" ");
                                        var idx = ary.indexOf(name);
                                        idx >= 0 ? ary.slice(idx, 1) : ary.push(name);
                                        el.className = ary.join(" ");
                                    } else {
                                        el.classList.contains(name) ? el.classList.remove(name) : el.classList.add(name);
                                    }
                                });
                            return this;
                        };

                        this.attr = function(name, value) {
                            if (!els.length) {
                                return value == null ? null : this;
                            }

                            var rs;

                            for (var _i4 = 0; _i4 < els.length; _i4++) {
                                if (value == null) {
                                    return DomAttrHandle.at(els[0], name);
                                }

                                DomAttrHandle.at(els[_i4], name, value);
                            }

                            return this;
                        };

                        this.removeChildren = function() {
                            els.forEach(function(el) {
                                try {
                                    el.innerHTML = "";
                                } catch (e) {
                                    for (; el.firstChild; ) {
                                        el.removeChild(el.firstChild);
                                    }
                                }
                            });
                            return this;
                        };

                        this.remove = function() {
                            els.forEach(function(el) {
                                return el.parentNode.removeChild(el);
                            });
                            return this;
                        };

                        return this;
                    }

                    var mapTagComponent = {};
                    var mapSingletonComp = {};

                    function registerComponents() {
                        var components = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

                        for (var key in components) {
                            mapTagComponent[key] = components[key];
                        }
                    }

                    function getComponent(name) {
                        return mapTagComponent[name];
                    }

                    function newComponentProxy(componentKey, opt) {
                        var Component = mapTagComponent[componentKey];

                        if (!Component) {
                            throw new Error("component not found: " + componentKey);
                        }

                        var comp;

                        if (Component.Singleton) {
                            comp = mapSingletonComp[componentKey] || (mapSingletonComp[componentKey] = enhance(Component, opt));
                        } else {
                            comp = enhance(Component, opt);
                        }

                        isFunction(comp.init) && comp.init();
                        return comp;
                    }

                    function createComponentByVnode(vnode) {
                        var opt = assign({}, vnode.a || {}, vnode.c && vnode.c.length ? _defineProperty({}, $SLOT, vnode.c) : {});
                        return newComponentProxy(vnode.t, opt);
                    }

                    function domVnode(el, vnode) {
                        if (!el) {
                            return;
                        }

                        var map = domVnode.m || (domVnode.m = new WeakMap());

                        if (!vnode) {
                            return map.get(el);
                        }

                        var vn = vnode;

                        if (vnode.c) {
                            vn = Object.assign({}, vnode);
                            delete vn.c;
                        }

                        var oVal = map.get(el);

                        if (!oVal) {
                            return map.set(el, vn);
                        }

                        if (!oVal.M) {
                            var mVal = {
                                M: 1
                            };
                            mVal[oVal.t] = oVal;
                            map.set(el, mVal);
                            oVal = mVal;
                        }

                        oVal[vn.t] = vn;
                        return oVal;
                    }

                    function createDom(vnode, $thisContext) {
                        if (!vnode) {
                            return;
                        }

                        var el, $$el;

                        if (vnode.t) {
                            if (vnode.m) {
                                var comp = new createComponentByVnode(vnode);
                                vnode.o = comp;
                                el = comp.render();
                                var refs, cls;

                                if (vnode.a && vnode.a.ref) {
                                    var $context = vnode.a.$context || $thisContext;
                                    refs = $context.$refs = $context.$refs || {};
                                    var ref = (refs.c = refs.c || {});
                                    cls = ref[vnode.a.ref] = ref[vnode.a.ref] || uid("_ref_");
                                }

                                if (el) {
                                    $$el = $$(el);
                                    $$el.addClass(comp.$COMPONENT_ID);
                                    cls && $$el.addClass((vnode.r = cls));
                                }
                            } else {
                                if (/^script$/i.test(vnode.t)) {
                                    return loadScript(vnode.a);
                                }

                                if (/^link$/i.test(vnode.t)) {
                                    return loadLink(vnode.a);
                                }

                                el = vnode.g ? document.createElementNS("http://www.w3.org/2000/svg", vnode.t) : document.createElement(vnode.t);
                                $$el = $$(el);

                                if (vnode.a) {
                                    for (var k in vnode.a) {
                                        if (k == "ref") {
                                            var _$context = vnode.a.$context || $thisContext;

                                            var _refs = (_$context.$refs = _$context.$refs || {});

                                            var _ref2 = (_refs.e = _refs.e || {});

                                            var _cls = (_ref2[vnode.a[k]] = _ref2[vnode.a[k]] || uid("_ref_"));

                                            $$el.addClass((vnode.r = _cls));
                                        }

                                        $$el.attr(k, vnode.a[k]);
                                    }
                                }

                                if (vnode.e) {
                                    for (var _k in vnode.e) {
                                        if (isFunction(vnode.e[_k])) {
                                            $$(el).on(_k, vnode.e[_k]);
                                        } else if (vnode.e[_k] == undefined) {
                                        } else {
                                            console.error("invalid event handle:", _k, "=", vnode.e[_k]);
                                        }
                                    }
                                }

                                if (vnode.c) {
                                    for (var i = 0, vn, dom; (vn = vnode.c[i++]); ) {
                                        dom = createDom(vn, $thisContext);
                                        dom && el.appendChild(dom);
                                    }
                                }
                            }
                        } else {
                            el = document.createTextNode(vnode.s);
                        }

                        el && domVnode(el, vnode);
                        return el;
                    }

                    function assignOptions() {
                        for (var _len3 = arguments.length, objs = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                            objs[_key3] = arguments[_key3];
                        }

                        if (objs.length == 1) {
                            return objs[0];
                        }

                        var rs = objs[0];

                        for (var i = 1; i < objs.length; i++) {
                            for (var k in objs[i]) {
                                if (k == "ref") {
                                    continue;
                                }

                                if (k == "class") {
                                    if (isString(objs[i][k])) {
                                        (function() {
                                            var ary = objs[i][k].split(/\s/);
                                            var objCls = {};
                                            ary.forEach(function(v) {
                                                return v.trim() && (objCls[v] = 1);
                                            });
                                            rs[k] = objCls;
                                        })();
                                    } else {
                                        rs[k] = objs[i][k];
                                    }
                                } else {
                                    rs[k] = objs[i][k];
                                }
                            }
                        }

                        return rs;
                    }

                    function loadScript(attr) {
                        var ary = loadScript.s || (loadScript.s = []);

                        if (!attr || !attr.src || ary.includes(attr.src)) {
                            return;
                        }

                        ary.push(attr.src);
                        var el = document.createElement("script");
                        el.src = attr.src;
                        el.type = attr.type || "text/javascript";
                        document.head.appendChild(el);
                    }

                    function loadLink(attr) {
                        var ary = loadLink.s || (loadLink.s = []);

                        if (!attr || !attr.href || ary.includes(attr.href)) {
                            return;
                        }

                        ary.push(attr.href);
                        var el = document.createElement("link");
                        el.href = attr.href;
                        el.rel = attr.rel || "stylesheet";
                        document.head.appendChild(el);
                    }

                    function enhance(Component) {
                        for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
                            args[_key4 - 1] = arguments[_key4];
                        }

                        var oComp = _construct(Component, args);

                        enhanceFields(oComp);
                        enhanceRender(oComp);
                        enhanceState(oComp);
                        enhanceRef(oComp);
                        enhanceRoot(oComp);
                        return oComp;
                    }

                    function enhanceFields(component) {
                        Object.defineProperty(component, "$COMPONENT_ID", {
                            value: uid("_cid_")
                        });
                        Object.defineProperty(component, "isInitRender", {
                            value: true,
                            writable: true
                        });
                    }

                    function enhanceRender(component) {
                        !component.render &&
                            Object.defineProperty(component, "render", {
                                get: function get() {
                                    return function() {
                                        var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
                                        var el, $$el, vnode;

                                        if (this.isInitRender) {
                                            extend(this.$state, state, this.$STATE_KEYS);
                                            vnode = this.nodeTemplate(this.$state, this.$options, this.$actions, this);
                                            el = createDom(vnode, this);

                                            if (el && el.nodeType == 1) {
                                                $$(el).addClass(this.$COMPONENT_ID);
                                            }

                                            this.isInitRender = false;
                                            return el;
                                        }

                                        extend(this.$state, state, this.$STATE_KEYS);
                                        $$el = $$("." + this.$COMPONENT_ID);

                                        if (!$$el.length) {
                                            warn("dom node missing");
                                            return;
                                        }

                                        if (this.$updater) {
                                            this.$updater(this.$state);
                                        } else {
                                            var vnode2 = this.nodeTemplate(this.$state, this.$options, this.$actions, this);
                                            diffRender(this, vnode2);
                                        }

                                        return el;
                                    };
                                }
                            });
                    }

                    function enhanceState(component) {
                        Object.defineProperty(component, "getState", {
                            get: function get() {
                                return function() {
                                    return extend({}, this.$state);
                                };
                            }
                        });
                        Object.defineProperty(component, "setState", {
                            get: function get() {
                                return function(state) {
                                    state && this.render(state);
                                };
                            }
                        });
                    }

                    function enhanceRoot(component) {
                        Object.defineProperty(component, "getRootElement", {
                            get: function get() {
                                return function() {
                                    var $$el = $$("." + this.$COMPONENT_ID);
                                    return $$el.length ? $$el[0] : null;
                                };
                            }
                        });
                    }

                    function enhanceRef(component) {
                        Object.defineProperty(component, "getRefElements", {
                            get: function get() {
                                return function(name) {
                                    var cls = this.$refs && this.$refs.e ? this.$refs.e[name] : "";
                                    return cls ? _toConsumableArray(new Set(document.querySelectorAll("." + cls))) : [];
                                };
                            }
                        });
                        Object.defineProperty(component, "getRefElement", {
                            get: function get() {
                                return function(name) {
                                    var els = this.getRefElements(name);
                                    return els.length ? els[0] : null;
                                };
                            }
                        });
                        Object.defineProperty(component, "getRefComponents", {
                            get: function get() {
                                return function(name) {
                                    var cls = this.$refs && this.$refs.c ? this.$refs.c[name] : "";

                                    if (!cls) {
                                        return [];
                                    }

                                    var rs = [];

                                    var els = _toConsumableArray(new Set(document.querySelectorAll("." + cls)));

                                    els.forEach(function(el) {
                                        var vnode = domVnode(el);

                                        if (vnode && vnode.M) {
                                            for (var k in vnode) {
                                                if (vnode[k].r == cls) {
                                                    rs.push(vnode[k].o);
                                                    break;
                                                }
                                            }
                                        } else {
                                            rs.push(vnode.o);
                                        }
                                    });
                                    return rs;
                                };
                            }
                        });
                        Object.defineProperty(component, "getRefComponent", {
                            get: function get() {
                                return function(name) {
                                    var objs = this.getRefComponents(name);
                                    return objs.length ? objs[0] : null;
                                };
                            }
                        });
                    }

                    function diffRender(component, vnode2) {
                        var $$el = $$("." + component.$COMPONENT_ID);

                        if (!$$el.length) {
                            error("root node not found:", component.$COMPONENT_ID);
                            return;
                        }

                        if (!vnode2) {
                            $$el.remove();
                            return;
                        }

                        var vnode1 = domVnode($$el[0]);
                        vnode1.M && (vnode1 = vnode1[vnode2.t]);

                        if (vnode2.m) {
                            vnode1.o.setState(_defineProperty({}, $SLOT, vnode2.c));
                            return;
                        }

                        var attr1 = (vnode1 || {}).a || {};
                        var attr2 = vnode2.a || {};

                        if (
                            !vnode1 ||
                            vnode1.k != vnode2.k ||
                            ((vnode1.t || vnode1.t) && vnode1.t != vnode2.t) ||
                            ((attr1.id || attr2.id) && attr1.id != attr2.id) ||
                            ((attr1.ref || attr2.ref) && attr1.ref != attr2.ref)
                        ) {
                            var el = createDom(vnode2, component);
                            $$el.replaceWith(el);
                            return el;
                        }

                        var diffAttrs = getDiffAttrs(vnode1, vnode2);

                        if (diffAttrs) {
                            for (var k in diffAttrs) {
                                vnode1.a[k] = diffAttrs[k];
                                $$el.attr(k, diffAttrs[k]);
                            }
                        }

                        diffRenderChildern(component, $$el[0], vnode2);
                        return $$el[0];
                    }

                    function diffRenderChildern(component, parent, parentVnode2) {
                        var childern1 = _toConsumableArray(parent.childNodes || []);

                        var childern2 = parentVnode2.c || [];

                        if (!childern1.length) {
                            return childern2.forEach(function(vn) {
                                return parent.appendChild(createDom(vn, component));
                            });
                        }

                        var ary1 = [],
                            ary2 = [];
                        childern1.forEach(function(v) {
                            return ary1.push({
                                vn: domVnode(v),
                                el: v
                            });
                        });
                        childern2.forEach(function(v) {
                            return ary2.push({
                                vn: v
                            });
                        });
                        var matchAll = 1;

                        if (ary1.length == ary2.length) {
                            for (var i = 0, _wv, wv2; i < ary1.length; i++) {
                                _wv = ary1[i];
                                wv2 = ary2[i];

                                if (matchWvnode(_wv, wv2)) {
                                    _wv.S = 1;
                                    wv2.S = 1;
                                    wv2.wv1 = _wv;
                                } else {
                                    matchAll = 0;
                                    break;
                                }
                            }
                        } else {
                            matchAll = 0;
                        }

                        if (!matchAll) {
                            ary2.forEach(function(wv) {
                                return !wv.S && findVnode(ary1, wv);
                            });
                            ary1.filter(function(wv) {
                                return wv.S ? 1 : $$(wv.el).remove() && 0;
                            });

                            if (!ary1.length) {
                                return ary2.forEach(function(wv) {
                                    return parent.appendChild(createDom(wv.vn, component));
                                });
                            }
                        }

                        var j = 0;
                        var wv1 = ary1[j];

                        for (var _i5 = 0, idx, _wv2; _i5 < ary2.length; _i5++) {
                            _wv2 = ary2[_i5];

                            if (!_wv2.S) {
                                var el = createDom(_wv2.vn, component);

                                if (el) {
                                    if (wv1) {
                                        parent.insertBefore(el, wv1.el);
                                    } else {
                                        parent.appendChild(el);
                                    }
                                }
                            } else {
                                if (_wv2.wv1 != wv1) {
                                    ary1.splice(j, 0, ary1.splice(ary1.indexOf(_wv2.wv1), 1)[0]);
                                    j++;
                                    parent.insertBefore(_wv2.wv1.el, wv1.el);

                                    if (_wv2.vn.m) {
                                        _wv2.wv1.vn[_wv2.vn.t].o.setState(_defineProperty({}, $SLOT, _wv2.vn.c));
                                    } else {
                                        var diffAttrs = getDiffAttrs(_wv2.wv1.vn, _wv2.vn);

                                        if (diffAttrs) {
                                            for (var k in diffAttrs) {
                                                _wv2.wv1.vn.a[k] = diffAttrs[k];
                                                $$(_wv2.wv1.el).attr(k, diffAttrs[k]);
                                            }
                                        } else if (!_wv2.vn.t && _wv2.wv1.vn.s != _wv2.vn.s) {
                                            _wv2.wv1.vn.s = _wv2.vn.s;
                                            _wv2.wv1.el.textContent = _wv2.vn.s;
                                        }
                                    }
                                } else {
                                    if (_wv2.vn.m) {
                                        wv1.vn[_wv2.vn.t].o.setState(_defineProperty({}, $SLOT, _wv2.vn.c));
                                    } else {
                                        var _diffAttrs = getDiffAttrs(wv1.vn, _wv2.vn);

                                        if (_diffAttrs) {
                                            for (var _k2 in _diffAttrs) {
                                                wv1.vn.a[_k2] = _diffAttrs[_k2];
                                                $$(wv1.el).attr(_k2, _diffAttrs[_k2]);
                                            }
                                        } else if (!_wv2.vn.t && wv1.vn.s != _wv2.vn.s) {
                                            wv1.vn.s = _wv2.vn.s;
                                            wv1.el.textContent = _wv2.vn.s;
                                        }
                                    }

                                    wv1 = ary1[++j];
                                }
                            }
                        }

                        ary2.forEach(function(wv) {
                            if (wv.S) {
                                if (wv.vn.m) {
                                    wv.wv1.vn[wv.vn.t].o.setState(_defineProperty({}, $SLOT, wv.vn.c));
                                } else {
                                    diffRenderChildern(component, wv.wv1.el, wv.vn);
                                }
                            }
                        });
                    }

                    function findVnode(wvnodes, wv2) {
                        var vnode1,
                            vnode2 = wv2.vn;

                        for (var i = 0, wv1; (wv1 = wvnodes[i++]); ) {
                            if (matchWvnode(wv1, wv2)) {
                                wv1.S = 1;
                                wv2.S = 1;
                                return (wv2.wv1 = wv1);
                            }
                        }
                    }

                    function matchWvnode(wv1, wv2) {
                        if (wv1.S) {
                            return 0;
                        }

                        var vnode1 = wv1.vn,
                            vnode2 = wv2.vn;

                        if (vnode1.M) {
                            vnode1 = vnode1[vnode2.t];

                            if (!vnode1) {
                                return 0;
                            }
                        }

                        var attr1 = vnode1.a || {};
                        var attr2 = vnode2.a || {};

                        if (
                            vnode1.k != vnode2.k ||
                            ((vnode1.t || vnode2.t) && vnode1.t != vnode2.t) ||
                            ((attr1.id || attr2.id) && attr1.id != attr2.id) ||
                            ((attr1.ref || attr2.ref) && attr1.ref != attr2.ref) ||
                            ((vnode1.g || vnode2.g) && vnode1.g != vnode2.g)
                        ) {
                            return 0;
                        }

                        return 1;
                    }

                    function getDiffAttrs(vnode1, vnode2) {
                        if (vnode1.x) {
                            return 0;
                        }

                        var attr1 = vnode1.a || {};
                        var attr2 = vnode2.a || {};
                        var keys2 = Object.keys(attr2);
                        var rs = {};
                        var has = 0;
                        keys2.forEach(function(k) {
                            if (attr1[k] != attr2[k]) {
                                if (k == "class") {
                                    var oDiff = getDiffClass(attr1[k], attr2[k]);

                                    if (oDiff) {
                                        rs[k] = oDiff;
                                        has = 1;
                                    }
                                } else if (k == $SLOT) {
                                } else if (k == "style") {
                                    var _oDiff = getDiffStyle(attr1[k], attr2[k]);

                                    if (_oDiff) {
                                        rs[k] = _oDiff;
                                        has = 1;
                                    }
                                } else if (BOOL_PROPS.includes(k)) {
                                    if (toBoolean(attr1[k]) != toBoolean(attr2[k])) {
                                        rs[k] = toBoolean(attr2[k]);
                                        has = 1;
                                    }
                                } else {
                                    rs[k] = attr2[k];
                                    has = 1;
                                }
                            }
                        });
                        return has ? rs : 0;
                    }

                    function getDiffClass(class1, class2) {
                        var obj1 = class1 || {};
                        var obj2 = class2 || {};
                        var keys2 = Object.keys(obj2);
                        var rs = {};
                        var has = 0;
                        keys2.forEach(function(k) {
                            if (obj1[k] == null) {
                                rs[k] = toBoolean(obj2[k]);
                                has = 1;
                            } else if (toBoolean(obj1[k]) != toBoolean(obj2[k])) {
                                rs[k] = toBoolean(obj2[k]);
                                has = 1;
                            }
                        });
                        return has ? rs : null;
                    }

                    function getDiffStyle(style1, style2) {
                        var obj1 = parseStyleToObject(style1);
                        var obj2 = parseStyleToObject(style2);
                        var keys2 = Object.keys(obj2);
                        var rs = {};
                        var has = 0;
                        keys2.forEach(function(k) {
                            if (obj1[k] == null) {
                                rs[k] = obj2[k];
                                has = 1;
                            } else if (obj1[k] != obj2[k]) {
                                rs[k] = obj2[k];
                                has = 1;
                            }
                        });
                        return has ? rs : null;
                    }

                    function mount(dom, selector, context) {
                        dom && (context || document).querySelector(selector || "body").appendChild(dom);
                    }

                    function escapeHtml(html) {
                        if (typeof html == "string") {
                            return html.replace(/</g, "&lt;").replace(/>/g, "&gt;");
                        }

                        return html;
                    }

                    function unescapeHtml(str) {
                        if (typeof str == "string") {
                            return str
                                .replace(/&lt;/g, "<")
                                .replace(/&gt;/g, ">")
                                .replace(/&quot;/g, '"')
                                .replace(/&amp;/g, "&");
                        }

                        return str;
                    }

                    function isEmpty(obj) {
                        if (!obj) {
                            return true;
                        }

                        if (isPlainObject(obj)) {
                            for (var k in obj) {
                                return false;
                            }

                            return true;
                        }

                        return !!obj;
                    }

                    function uid(prefix) {
                        if (prefix) {
                            !uid[prefix] && (uid[prefix] = 1);
                            return prefix + uid[prefix]++;
                        }

                        !uid.n && (uid.n = 1);
                        return uid.n++;
                    }

                    function toBoolean(arg) {
                        if (!arg) {
                            return false;
                        }

                        if (!isString(arg)) {
                            return true;
                        }

                        return !/^(0|false|f|no|n)$/i.test((arg + "").trim());
                    }

                    function extend() {
                        var _ref3,
                            _arguments = arguments;

                        if (
                            !arguments.length ||
                            isArray(arguments.length <= 0 ? undefined : arguments[0]) ||
                            !(arguments.length <= 0 ? undefined : arguments[0])
                        ) {
                            return null;
                        }

                        var keys = ((_ref3 = arguments.length - 1), _ref3 < 0 || arguments.length <= _ref3 ? undefined : arguments[_ref3]);

                        if (!keys) {
                            return;
                        }

                        var oOrig = arguments.length <= 0 ? undefined : arguments[0];
                        oOrig.class = classToPlantObject(oOrig.class);

                        if (isArray(keys)) {
                            var _loop = function _loop(i, _oCopy) {
                                _oCopy = i < 0 || _arguments.length <= i ? undefined : _arguments[i];

                                if (oOrig !== _oCopy && isPlainObject(_oCopy)) {
                                    keys.forEach(function(k) {
                                        if (_oCopy[k] !== undefined) {
                                            k == "class"
                                                ? Object.assign(oOrig.class, classToPlantObject(_oCopy[k]))
                                                : (oOrig[k] = _copyObjectValue(_oCopy[k]));
                                        }
                                    });
                                }

                                oCopy = _oCopy;
                            };

                            for (var i = 0, oCopy; i < arguments.length - 1; i++) {
                                _loop(i, oCopy);
                            }
                        } else {
                            for (var i = 1, _oCopy2; i < arguments.length; i++) {
                                _oCopy2 = i < 0 || arguments.length <= i ? undefined : arguments[i];

                                if (oOrig !== _oCopy2 && isPlainObject(_oCopy2)) {
                                    for (var k in _oCopy2) {
                                        k == "class"
                                            ? Object.assign(oOrig.class, classToPlantObject(_oCopy2[k]))
                                            : (oOrig[k] = _copyObjectValue(_oCopy2[k]));
                                    }
                                }
                            }
                        }

                        return oOrig;
                    }

                    function assign() {
                        var _ref4,
                            _arguments2 = arguments;

                        if (
                            !arguments.length ||
                            isArray(arguments.length <= 0 ? undefined : arguments[0]) ||
                            !(arguments.length <= 0 ? undefined : arguments[0])
                        ) {
                            return null;
                        }

                        var keys = ((_ref4 = arguments.length - 1), _ref4 < 0 || arguments.length <= _ref4 ? undefined : arguments[_ref4]);

                        if (!keys) {
                            return;
                        }

                        var oOrig = arguments.length <= 0 ? undefined : arguments[0];
                        oOrig.class = classToPlantObject(oOrig.class);

                        if (isArray(keys)) {
                            var _loop2 = function _loop2(i, _oCopy4) {
                                _oCopy4 = i < 0 || _arguments2.length <= i ? undefined : _arguments2[i];

                                if (oOrig !== _oCopy4 && isPlainObject(_oCopy4)) {
                                    keys.forEach(function(k) {
                                        if (_oCopy4[k] !== undefined) {
                                            k == "class" ? Object.assign(oOrig.class, classToPlantObject(_oCopy4[k])) : (oOrig[k] = _oCopy4[k]);
                                        }
                                    });
                                }

                                _oCopy3 = _oCopy4;
                            };

                            for (var i = 1, _oCopy3; i < arguments.length - 1; i++) {
                                _loop2(i, _oCopy3);
                            }
                        } else {
                            for (var i = 1, _oCopy5; i < arguments.length; i++) {
                                _oCopy5 = i < 0 || arguments.length <= i ? undefined : arguments[i];

                                if (oOrig !== _oCopy5 && isPlainObject(_oCopy5)) {
                                    for (var k in _oCopy5) {
                                        k == "class" ? Object.assign(oOrig.class, classToPlantObject(_oCopy5[k])) : (oOrig[k] = _oCopy5[k]);
                                    }
                                }
                            }
                        }

                        return oOrig;
                    }

                    function classToPlantObject(str) {
                        if (str == null) {
                            return {};
                        }

                        if (isPlainObject(str)) {
                            return str;
                        }

                        var ary = str.split(/\s/);
                        var objCls = {};
                        ary.forEach(function(v) {
                            return v.trim() && (objCls[v] = 1);
                        });
                        return objCls;
                    }

                    function _copyObjectValue(obj) {
                        if (!obj || obj.$COMPONENT_ID) {
                            return obj;
                        }

                        if (isPlainObject(obj)) {
                            var rs = {};

                            for (var key in obj) {
                                rs[key] = _copyObjectValue(obj[key]);
                            }

                            return rs;
                        }

                        if (isArray(obj)) {
                            var _rs = [];

                            for (var i = 0; i < obj.length; i++) {
                                _rs[i] = _copyObjectValue(obj[i]);
                            }

                            return _rs;
                        }

                        if (isDate(obj)) {
                            return new Date(obj.getTime());
                        }

                        if (isMap(obj)) {
                            return new Map(obj);
                        }

                        if (isSet(obj)) {
                            return new Set(obj);
                        }

                        return obj;
                    }

                    var api = {};
                    api.$$ = $$;
                    api.registerComponents = registerComponents;
                    api.newComponentProxy = newComponentProxy;
                    api.createDom = createDom;
                    api.escapeHtml = escapeHtml;
                    api.mount = mount;
                    api.extend = extend;
                    api.assign = assign;
                    api.on = BUS.on;
                    api.off = BUS.off;
                    api.once = BUS.once;
                    api.at = BUS.at;
                    api.router = Router;
                    window.rpose = api;
                })(window, document);

                (function($$) {
                    // 组件注册
                    rpose.registerComponents({
                        "layout-foo": LayoutFoo,
                        "page-foo": PageFoo
                    }); // ------------------------------------------------------------------------------------------------------
                    // 组件 LayoutFoo
                    // 注:应通过rpose.newComponentProxy方法创建组件代理对象后使用，而不是直接调用方法或用new创建
                    // ------------------------------------------------------------------------------------------------------
                    // 属性接口定义

                    LayoutFoo.prototype.$OPTION_KEYS = undefined; // 可通过标签配置的属性，未定义则不支持外部配置

                    LayoutFoo.prototype.$STATE_KEYS = ["$SLOT"]; // 可更新的state属性，未定义则不支持外部更新state
                    // 组件函数

                    function LayoutFoo() {
                        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
                        // 组件默认选项值
                        this.$options = {}; // 组件默认数据状态值

                        this.$state = {};
                        rpose.extend(this.$state, options, this.$STATE_KEYS); // 按属性接口克隆数据状态
                    }
                    /**
                     * 节点模板函数
                     */

                    LayoutFoo.prototype.nodeTemplate = function nodeTemplate($state, $options, $actions, $this) {
                        var v_Array = [];
                        var slotVnodes_j8svvu = [],
                            slotVnodes_1lvhozp = [],
                            slotVnodes_j955ww = [];
                        ($state.$SLOT || []).forEach(function(vn) {
                            if (vn.a) {
                                vn.a.slot === "header" && (slotVnodes_j8svvu = vn.c || []);
                                vn.a.slot === "body" && (slotVnodes_1lvhozp = vn.c || []);
                                vn.a.slot === "footer" && (slotVnodes_j955ww = vn.c || []);
                            }
                        });
                        v_Array.push({
                            t: "div",
                            r: 1,
                            k: 4,
                            c: [
                                {
                                    t: "div",
                                    k: 1,
                                    c: (function(_Ary) {
                                        _Ary.push.apply(_Ary, _toConsumableArray(slotVnodes_j8svvu));

                                        return _Ary;
                                    })([]),
                                    a: {
                                        class: {
                                            "atclass-toyjqu___8maz8k": 1
                                        }
                                    }
                                },
                                {
                                    t: "div",
                                    k: 2,
                                    c: (function(_Ary) {
                                        _Ary.push.apply(_Ary, _toConsumableArray(slotVnodes_1lvhozp));

                                        return _Ary;
                                    })([]),
                                    a: {
                                        class: {
                                            "atclass-1vw896k___8maz8k": 1
                                        }
                                    }
                                },
                                {
                                    t: "div",
                                    k: 3,
                                    c: (function(_Ary) {
                                        _Ary.push.apply(_Ary, _toConsumableArray(slotVnodes_j955ww));

                                        return _Ary;
                                    })([]),
                                    a: {
                                        class: {
                                            "atclass-1d7sa19___8maz8k": 1
                                        }
                                    }
                                }
                            ],
                            a: {
                                class: {
                                    "atclass-183hbv___8maz8k": 1
                                }
                            }
                        });
                        v_Array.length > 1 && console.warn("invlid tag count");
                        return v_Array.length ? v_Array[0] : null;
                    }; // ------------------------------------------------------------------------------------------------------
                    // 组件 PageFoo
                    // 注:应通过rpose.newComponentProxy方法创建组件代理对象后使用，而不是直接调用方法或用new创建
                    // ------------------------------------------------------------------------------------------------------
                    // 属性接口定义

                    PageFoo.prototype.$OPTION_KEYS = undefined; // 可通过标签配置的属性，未定义则不支持外部配置

                    PageFoo.prototype.$STATE_KEYS = ["$SLOT"]; // 可更新的state属性，未定义则不支持外部更新state
                    // 组件函数

                    function PageFoo() {
                        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
                        // 组件默认选项值
                        this.$options = {}; // 组件默认数据状态值

                        this.$state = {};
                        rpose.extend(this.$state, options, this.$STATE_KEYS); // 按属性接口克隆数据状态
                    }
                    /**
                     * 节点模板函数
                     */

                    PageFoo.prototype.nodeTemplate = function nodeTemplate($state, $options, $actions, $this) {
                        return {
                            t: "layout-foo",
                            r: 1,
                            m: 1,
                            k: 10,
                            c: [
                                {
                                    t: "div",
                                    k: 3,
                                    c: [
                                        {
                                            t: "div",
                                            k: 2,
                                            c: [
                                                {
                                                    s: "Header",
                                                    k: 1
                                                }
                                            ],
                                            a: {
                                                class: {
                                                    "atclass-r1lyn2___1it0trh": 1
                                                }
                                            }
                                        }
                                    ],
                                    a: {
                                        slot: "header"
                                    }
                                },
                                {
                                    t: "div",
                                    k: 6,
                                    c: [
                                        {
                                            t: "div",
                                            k: 5,
                                            c: [
                                                {
                                                    s: "Content",
                                                    k: 4
                                                }
                                            ],
                                            a: {
                                                class: {
                                                    "atclass-m6ncwk___1it0trh": 1
                                                }
                                            }
                                        }
                                    ],
                                    a: {
                                        slot: "body"
                                    }
                                },
                                {
                                    t: "div",
                                    k: 9,
                                    c: [
                                        {
                                            t: "div",
                                            k: 8,
                                            c: [
                                                {
                                                    s: "Footer",
                                                    k: 7
                                                }
                                            ],
                                            a: {
                                                class: {
                                                    "atclass-1m8mj8v___1it0trh": 1
                                                }
                                            }
                                        }
                                    ],
                                    a: {
                                        slot: "footer"
                                    }
                                }
                            ]
                        };
                    }; // 组件挂载

                    rpose.mount(rpose.newComponentProxy("page-foo").render(), "body");
                })(rpose.$$);
            },
            {
                "core-js/modules/es6.array.from": 96,
                "core-js/modules/es6.array.iterator": 97,
                "core-js/modules/es6.function.name": 98,
                "core-js/modules/es6.map": 99,
                "core-js/modules/es6.object.assign": 100,
                "core-js/modules/es6.object.keys": 101,
                "core-js/modules/es6.object.set-prototype-of": 102,
                "core-js/modules/es6.object.to-string": 103,
                "core-js/modules/es6.promise": 104,
                "core-js/modules/es6.reflect.construct": 105,
                "core-js/modules/es6.regexp.constructor": 106,
                "core-js/modules/es6.regexp.replace": 109,
                "core-js/modules/es6.regexp.split": 110,
                "core-js/modules/es6.regexp.to-string": 111,
                "core-js/modules/es6.set": 112,
                "core-js/modules/es6.string.includes": 113,
                "core-js/modules/es6.string.iterator": 114,
                "core-js/modules/es6.string.starts-with": 115,
                "core-js/modules/es6.symbol": 116,
                "core-js/modules/es6.weak-map": 117,
                "core-js/modules/es7.array.includes": 118,
                "core-js/modules/es7.symbol.async-iterator": 119,
                "core-js/modules/web.dom.iterable": 120
            }
        ],
        2: [
            function(require, module, exports) {
                module.exports = function(it) {
                    if (typeof it != "function") throw TypeError(it + " is not a function!");
                    return it;
                };
            },
            {}
        ],
        3: [
            function(require, module, exports) {
                // 22.1.3.31 Array.prototype[@@unscopables]
                var UNSCOPABLES = require("./_wks")("unscopables");
                var ArrayProto = Array.prototype;
                if (ArrayProto[UNSCOPABLES] == undefined) require("./_hide")(ArrayProto, UNSCOPABLES, {});
                module.exports = function(key) {
                    ArrayProto[UNSCOPABLES][key] = true;
                };
            },
            { "./_hide": 34, "./_wks": 94 }
        ],
        4: [
            function(require, module, exports) {
                "use strict";
                var at = require("./_string-at")(true);

                // `AdvanceStringIndex` abstract operation
                // https://tc39.github.io/ecma262/#sec-advancestringindex
                module.exports = function(S, index, unicode) {
                    return index + (unicode ? at(S, index).length : 1);
                };
            },
            { "./_string-at": 80 }
        ],
        5: [
            function(require, module, exports) {
                module.exports = function(it, Constructor, name, forbiddenField) {
                    if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
                        throw TypeError(name + ": incorrect invocation!");
                    }
                    return it;
                };
            },
            {}
        ],
        6: [
            function(require, module, exports) {
                var isObject = require("./_is-object");
                module.exports = function(it) {
                    if (!isObject(it)) throw TypeError(it + " is not an object!");
                    return it;
                };
            },
            { "./_is-object": 42 }
        ],
        7: [
            function(require, module, exports) {
                // false -> Array#indexOf
                // true  -> Array#includes
                var toIObject = require("./_to-iobject");
                var toLength = require("./_to-length");
                var toAbsoluteIndex = require("./_to-absolute-index");
                module.exports = function(IS_INCLUDES) {
                    return function($this, el, fromIndex) {
                        var O = toIObject($this);
                        var length = toLength(O.length);
                        var index = toAbsoluteIndex(fromIndex, length);
                        var value;
                        // Array#includes uses SameValueZero equality algorithm
                        // eslint-disable-next-line no-self-compare
                        if (IS_INCLUDES && el != el)
                            while (length > index) {
                                value = O[index++];
                                // eslint-disable-next-line no-self-compare
                                if (value != value) return true;
                                // Array#indexOf ignores holes, Array#includes - not
                            }
                        else
                            for (; length > index; index++)
                                if (IS_INCLUDES || index in O) {
                                    if (O[index] === el) return IS_INCLUDES || index || 0;
                                }
                        return !IS_INCLUDES && -1;
                    };
                };
            },
            { "./_to-absolute-index": 83, "./_to-iobject": 85, "./_to-length": 86 }
        ],
        8: [
            function(require, module, exports) {
                // 0 -> Array#forEach
                // 1 -> Array#map
                // 2 -> Array#filter
                // 3 -> Array#some
                // 4 -> Array#every
                // 5 -> Array#find
                // 6 -> Array#findIndex
                var ctx = require("./_ctx");
                var IObject = require("./_iobject");
                var toObject = require("./_to-object");
                var toLength = require("./_to-length");
                var asc = require("./_array-species-create");
                module.exports = function(TYPE, $create) {
                    var IS_MAP = TYPE == 1;
                    var IS_FILTER = TYPE == 2;
                    var IS_SOME = TYPE == 3;
                    var IS_EVERY = TYPE == 4;
                    var IS_FIND_INDEX = TYPE == 6;
                    var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
                    var create = $create || asc;
                    return function($this, callbackfn, that) {
                        var O = toObject($this);
                        var self = IObject(O);
                        var f = ctx(callbackfn, that, 3);
                        var length = toLength(self.length);
                        var index = 0;
                        var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
                        var val, res;
                        for (; length > index; index++)
                            if (NO_HOLES || index in self) {
                                val = self[index];
                                res = f(val, index, O);
                                if (TYPE) {
                                    if (IS_MAP) result[index] = res;
                                    // map
                                    else if (res)
                                        switch (TYPE) {
                                            case 3:
                                                return true; // some
                                            case 5:
                                                return val; // find
                                            case 6:
                                                return index; // findIndex
                                            case 2:
                                                result.push(val); // filter
                                        }
                                    else if (IS_EVERY) return false; // every
                                }
                            }
                        return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
                    };
                };
            },
            { "./_array-species-create": 10, "./_ctx": 19, "./_iobject": 39, "./_to-length": 86, "./_to-object": 87 }
        ],
        9: [
            function(require, module, exports) {
                var isObject = require("./_is-object");
                var isArray = require("./_is-array");
                var SPECIES = require("./_wks")("species");

                module.exports = function(original) {
                    var C;
                    if (isArray(original)) {
                        C = original.constructor;
                        // cross-realm fallback
                        if (typeof C == "function" && (C === Array || isArray(C.prototype))) C = undefined;
                        if (isObject(C)) {
                            C = C[SPECIES];
                            if (C === null) C = undefined;
                        }
                    }
                    return C === undefined ? Array : C;
                };
            },
            { "./_is-array": 41, "./_is-object": 42, "./_wks": 94 }
        ],
        10: [
            function(require, module, exports) {
                // 9.4.2.3 ArraySpeciesCreate(originalArray, length)
                var speciesConstructor = require("./_array-species-constructor");

                module.exports = function(original, length) {
                    return new (speciesConstructor(original))(length);
                };
            },
            { "./_array-species-constructor": 9 }
        ],
        11: [
            function(require, module, exports) {
                "use strict";
                var aFunction = require("./_a-function");
                var isObject = require("./_is-object");
                var invoke = require("./_invoke");
                var arraySlice = [].slice;
                var factories = {};

                var construct = function(F, len, args) {
                    if (!(len in factories)) {
                        for (var n = [], i = 0; i < len; i++) n[i] = "a[" + i + "]";
                        // eslint-disable-next-line no-new-func
                        factories[len] = Function("F,a", "return new F(" + n.join(",") + ")");
                    }
                    return factories[len](F, args);
                };

                module.exports =
                    Function.bind ||
                    function bind(that /* , ...args */) {
                        var fn = aFunction(this);
                        var partArgs = arraySlice.call(arguments, 1);
                        var bound = function(/* args... */) {
                            var args = partArgs.concat(arraySlice.call(arguments));
                            return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
                        };
                        if (isObject(fn.prototype)) bound.prototype = fn.prototype;
                        return bound;
                    };
            },
            { "./_a-function": 2, "./_invoke": 38, "./_is-object": 42 }
        ],
        12: [
            function(require, module, exports) {
                // getting tag from 19.1.3.6 Object.prototype.toString()
                var cof = require("./_cof");
                var TAG = require("./_wks")("toStringTag");
                // ES3 wrong here
                var ARG =
                    cof(
                        (function() {
                            return arguments;
                        })()
                    ) == "Arguments";

                // fallback for IE11 Script Access Denied error
                var tryGet = function(it, key) {
                    try {
                        return it[key];
                    } catch (e) {
                        /* empty */
                    }
                };

                module.exports = function(it) {
                    var O, T, B;
                    return it === undefined
                        ? "Undefined"
                        : it === null
                        ? "Null"
                        : // @@toStringTag case
                        typeof (T = tryGet((O = Object(it)), TAG)) == "string"
                        ? T
                        : // builtinTag case
                        ARG
                        ? cof(O)
                        : // ES3 arguments fallback
                        (B = cof(O)) == "Object" && typeof O.callee == "function"
                        ? "Arguments"
                        : B;
                };
            },
            { "./_cof": 13, "./_wks": 94 }
        ],
        13: [
            function(require, module, exports) {
                var toString = {}.toString;

                module.exports = function(it) {
                    return toString.call(it).slice(8, -1);
                };
            },
            {}
        ],
        14: [
            function(require, module, exports) {
                "use strict";
                var dP = require("./_object-dp").f;
                var create = require("./_object-create");
                var redefineAll = require("./_redefine-all");
                var ctx = require("./_ctx");
                var anInstance = require("./_an-instance");
                var forOf = require("./_for-of");
                var $iterDefine = require("./_iter-define");
                var step = require("./_iter-step");
                var setSpecies = require("./_set-species");
                var DESCRIPTORS = require("./_descriptors");
                var fastKey = require("./_meta").fastKey;
                var validate = require("./_validate-collection");
                var SIZE = DESCRIPTORS ? "_s" : "size";

                var getEntry = function(that, key) {
                    // fast case
                    var index = fastKey(key);
                    var entry;
                    if (index !== "F") return that._i[index];
                    // frozen object case
                    for (entry = that._f; entry; entry = entry.n) {
                        if (entry.k == key) return entry;
                    }
                };

                module.exports = {
                    getConstructor: function(wrapper, NAME, IS_MAP, ADDER) {
                        var C = wrapper(function(that, iterable) {
                            anInstance(that, C, NAME, "_i");
                            that._t = NAME; // collection type
                            that._i = create(null); // index
                            that._f = undefined; // first entry
                            that._l = undefined; // last entry
                            that[SIZE] = 0; // size
                            if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
                        });
                        redefineAll(C.prototype, {
                            // 23.1.3.1 Map.prototype.clear()
                            // 23.2.3.2 Set.prototype.clear()
                            clear: function clear() {
                                for (var that = validate(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
                                    entry.r = true;
                                    if (entry.p) entry.p = entry.p.n = undefined;
                                    delete data[entry.i];
                                }
                                that._f = that._l = undefined;
                                that[SIZE] = 0;
                            },
                            // 23.1.3.3 Map.prototype.delete(key)
                            // 23.2.3.4 Set.prototype.delete(value)
                            delete: function(key) {
                                var that = validate(this, NAME);
                                var entry = getEntry(that, key);
                                if (entry) {
                                    var next = entry.n;
                                    var prev = entry.p;
                                    delete that._i[entry.i];
                                    entry.r = true;
                                    if (prev) prev.n = next;
                                    if (next) next.p = prev;
                                    if (that._f == entry) that._f = next;
                                    if (that._l == entry) that._l = prev;
                                    that[SIZE]--;
                                }
                                return !!entry;
                            },
                            // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
                            // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
                            forEach: function forEach(callbackfn /* , that = undefined */) {
                                validate(this, NAME);
                                var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
                                var entry;
                                while ((entry = entry ? entry.n : this._f)) {
                                    f(entry.v, entry.k, this);
                                    // revert to the last existing entry
                                    while (entry && entry.r) entry = entry.p;
                                }
                            },
                            // 23.1.3.7 Map.prototype.has(key)
                            // 23.2.3.7 Set.prototype.has(value)
                            has: function has(key) {
                                return !!getEntry(validate(this, NAME), key);
                            }
                        });
                        if (DESCRIPTORS)
                            dP(C.prototype, "size", {
                                get: function() {
                                    return validate(this, NAME)[SIZE];
                                }
                            });
                        return C;
                    },
                    def: function(that, key, value) {
                        var entry = getEntry(that, key);
                        var prev, index;
                        // change existing entry
                        if (entry) {
                            entry.v = value;
                            // create new entry
                        } else {
                            that._l = entry = {
                                i: (index = fastKey(key, true)), // <- index
                                k: key, // <- key
                                v: value, // <- value
                                p: (prev = that._l), // <- previous entry
                                n: undefined, // <- next entry
                                r: false // <- removed
                            };
                            if (!that._f) that._f = entry;
                            if (prev) prev.n = entry;
                            that[SIZE]++;
                            // add to index
                            if (index !== "F") that._i[index] = entry;
                        }
                        return that;
                    },
                    getEntry: getEntry,
                    setStrong: function(C, NAME, IS_MAP) {
                        // add .keys, .values, .entries, [@@iterator]
                        // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
                        $iterDefine(
                            C,
                            NAME,
                            function(iterated, kind) {
                                this._t = validate(iterated, NAME); // target
                                this._k = kind; // kind
                                this._l = undefined; // previous
                            },
                            function() {
                                var that = this;
                                var kind = that._k;
                                var entry = that._l;
                                // revert to the last existing entry
                                while (entry && entry.r) entry = entry.p;
                                // get next entry
                                if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
                                    // or finish the iteration
                                    that._t = undefined;
                                    return step(1);
                                }
                                // return step by kind
                                if (kind == "keys") return step(0, entry.k);
                                if (kind == "values") return step(0, entry.v);
                                return step(0, [entry.k, entry.v]);
                            },
                            IS_MAP ? "entries" : "values",
                            !IS_MAP,
                            true
                        );

                        // add [@@species], 23.1.2.2, 23.2.2.2
                        setSpecies(NAME);
                    }
                };
            },
            {
                "./_an-instance": 5,
                "./_ctx": 19,
                "./_descriptors": 21,
                "./_for-of": 30,
                "./_iter-define": 46,
                "./_iter-step": 48,
                "./_meta": 51,
                "./_object-create": 55,
                "./_object-dp": 56,
                "./_redefine-all": 70,
                "./_set-species": 75,
                "./_validate-collection": 91
            }
        ],
        15: [
            function(require, module, exports) {
                "use strict";
                var redefineAll = require("./_redefine-all");
                var getWeak = require("./_meta").getWeak;
                var anObject = require("./_an-object");
                var isObject = require("./_is-object");
                var anInstance = require("./_an-instance");
                var forOf = require("./_for-of");
                var createArrayMethod = require("./_array-methods");
                var $has = require("./_has");
                var validate = require("./_validate-collection");
                var arrayFind = createArrayMethod(5);
                var arrayFindIndex = createArrayMethod(6);
                var id = 0;

                // fallback for uncaught frozen keys
                var uncaughtFrozenStore = function(that) {
                    return that._l || (that._l = new UncaughtFrozenStore());
                };
                var UncaughtFrozenStore = function() {
                    this.a = [];
                };
                var findUncaughtFrozen = function(store, key) {
                    return arrayFind(store.a, function(it) {
                        return it[0] === key;
                    });
                };
                UncaughtFrozenStore.prototype = {
                    get: function(key) {
                        var entry = findUncaughtFrozen(this, key);
                        if (entry) return entry[1];
                    },
                    has: function(key) {
                        return !!findUncaughtFrozen(this, key);
                    },
                    set: function(key, value) {
                        var entry = findUncaughtFrozen(this, key);
                        if (entry) entry[1] = value;
                        else this.a.push([key, value]);
                    },
                    delete: function(key) {
                        var index = arrayFindIndex(this.a, function(it) {
                            return it[0] === key;
                        });
                        if (~index) this.a.splice(index, 1);
                        return !!~index;
                    }
                };

                module.exports = {
                    getConstructor: function(wrapper, NAME, IS_MAP, ADDER) {
                        var C = wrapper(function(that, iterable) {
                            anInstance(that, C, NAME, "_i");
                            that._t = NAME; // collection type
                            that._i = id++; // collection id
                            that._l = undefined; // leak store for uncaught frozen objects
                            if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
                        });
                        redefineAll(C.prototype, {
                            // 23.3.3.2 WeakMap.prototype.delete(key)
                            // 23.4.3.3 WeakSet.prototype.delete(value)
                            delete: function(key) {
                                if (!isObject(key)) return false;
                                var data = getWeak(key);
                                if (data === true) return uncaughtFrozenStore(validate(this, NAME))["delete"](key);
                                return data && $has(data, this._i) && delete data[this._i];
                            },
                            // 23.3.3.4 WeakMap.prototype.has(key)
                            // 23.4.3.4 WeakSet.prototype.has(value)
                            has: function has(key) {
                                if (!isObject(key)) return false;
                                var data = getWeak(key);
                                if (data === true) return uncaughtFrozenStore(validate(this, NAME)).has(key);
                                return data && $has(data, this._i);
                            }
                        });
                        return C;
                    },
                    def: function(that, key, value) {
                        var data = getWeak(anObject(key), true);
                        if (data === true) uncaughtFrozenStore(that).set(key, value);
                        else data[that._i] = value;
                        return that;
                    },
                    ufstore: uncaughtFrozenStore
                };
            },
            {
                "./_an-instance": 5,
                "./_an-object": 6,
                "./_array-methods": 8,
                "./_for-of": 30,
                "./_has": 33,
                "./_is-object": 42,
                "./_meta": 51,
                "./_redefine-all": 70,
                "./_validate-collection": 91
            }
        ],
        16: [
            function(require, module, exports) {
                "use strict";
                var global = require("./_global");
                var $export = require("./_export");
                var redefine = require("./_redefine");
                var redefineAll = require("./_redefine-all");
                var meta = require("./_meta");
                var forOf = require("./_for-of");
                var anInstance = require("./_an-instance");
                var isObject = require("./_is-object");
                var fails = require("./_fails");
                var $iterDetect = require("./_iter-detect");
                var setToStringTag = require("./_set-to-string-tag");
                var inheritIfRequired = require("./_inherit-if-required");

                module.exports = function(NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
                    var Base = global[NAME];
                    var C = Base;
                    var ADDER = IS_MAP ? "set" : "add";
                    var proto = C && C.prototype;
                    var O = {};
                    var fixMethod = function(KEY) {
                        var fn = proto[KEY];
                        redefine(
                            proto,
                            KEY,
                            KEY == "delete"
                                ? function(a) {
                                      return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
                                  }
                                : KEY == "has"
                                ? function has(a) {
                                      return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
                                  }
                                : KEY == "get"
                                ? function get(a) {
                                      return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
                                  }
                                : KEY == "add"
                                ? function add(a) {
                                      fn.call(this, a === 0 ? 0 : a);
                                      return this;
                                  }
                                : function set(a, b) {
                                      fn.call(this, a === 0 ? 0 : a, b);
                                      return this;
                                  }
                        );
                    };
                    if (
                        typeof C != "function" ||
                        !(
                            IS_WEAK ||
                            (proto.forEach &&
                                !fails(function() {
                                    new C().entries().next();
                                }))
                        )
                    ) {
                        // create collection constructor
                        C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
                        redefineAll(C.prototype, methods);
                        meta.NEED = true;
                    } else {
                        var instance = new C();
                        // early implementations not supports chaining
                        var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
                        // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
                        var THROWS_ON_PRIMITIVES = fails(function() {
                            instance.has(1);
                        });
                        // most early implementations doesn't supports iterables, most modern - not close it correctly
                        var ACCEPT_ITERABLES = $iterDetect(function(iter) {
                            new C(iter);
                        }); // eslint-disable-line no-new
                        // for early implementations -0 and +0 not the same
                        var BUGGY_ZERO =
                            !IS_WEAK &&
                            fails(function() {
                                // V8 ~ Chromium 42- fails only with 5+ elements
                                var $instance = new C();
                                var index = 5;
                                while (index--) $instance[ADDER](index, index);
                                return !$instance.has(-0);
                            });
                        if (!ACCEPT_ITERABLES) {
                            C = wrapper(function(target, iterable) {
                                anInstance(target, C, NAME);
                                var that = inheritIfRequired(new Base(), target, C);
                                if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
                                return that;
                            });
                            C.prototype = proto;
                            proto.constructor = C;
                        }
                        if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
                            fixMethod("delete");
                            fixMethod("has");
                            IS_MAP && fixMethod("get");
                        }
                        if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);
                        // weak collections should not contains .clear method
                        if (IS_WEAK && proto.clear) delete proto.clear;
                    }

                    setToStringTag(C, NAME);

                    O[NAME] = C;
                    $export($export.G + $export.W + $export.F * (C != Base), O);

                    if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

                    return C;
                };
            },
            {
                "./_an-instance": 5,
                "./_export": 25,
                "./_fails": 27,
                "./_for-of": 30,
                "./_global": 32,
                "./_inherit-if-required": 37,
                "./_is-object": 42,
                "./_iter-detect": 47,
                "./_meta": 51,
                "./_redefine": 71,
                "./_redefine-all": 70,
                "./_set-to-string-tag": 76
            }
        ],
        17: [
            function(require, module, exports) {
                var core = (module.exports = { version: "2.6.5" });
                if (typeof __e == "number") __e = core; // eslint-disable-line no-undef
            },
            {}
        ],
        18: [
            function(require, module, exports) {
                "use strict";
                var $defineProperty = require("./_object-dp");
                var createDesc = require("./_property-desc");

                module.exports = function(object, index, value) {
                    if (index in object) $defineProperty.f(object, index, createDesc(0, value));
                    else object[index] = value;
                };
            },
            { "./_object-dp": 56, "./_property-desc": 69 }
        ],
        19: [
            function(require, module, exports) {
                // optional / simple context binding
                var aFunction = require("./_a-function");
                module.exports = function(fn, that, length) {
                    aFunction(fn);
                    if (that === undefined) return fn;
                    switch (length) {
                        case 1:
                            return function(a) {
                                return fn.call(that, a);
                            };
                        case 2:
                            return function(a, b) {
                                return fn.call(that, a, b);
                            };
                        case 3:
                            return function(a, b, c) {
                                return fn.call(that, a, b, c);
                            };
                    }
                    return function(/* ...args */) {
                        return fn.apply(that, arguments);
                    };
                };
            },
            { "./_a-function": 2 }
        ],
        20: [
            function(require, module, exports) {
                // 7.2.1 RequireObjectCoercible(argument)
                module.exports = function(it) {
                    if (it == undefined) throw TypeError("Can't call method on  " + it);
                    return it;
                };
            },
            {}
        ],
        21: [
            function(require, module, exports) {
                // Thank's IE8 for his funny defineProperty
                module.exports = !require("./_fails")(function() {
                    return (
                        Object.defineProperty({}, "a", {
                            get: function() {
                                return 7;
                            }
                        }).a != 7
                    );
                });
            },
            { "./_fails": 27 }
        ],
        22: [
            function(require, module, exports) {
                var isObject = require("./_is-object");
                var document = require("./_global").document;
                // typeof document.createElement is 'object' in old IE
                var is = isObject(document) && isObject(document.createElement);
                module.exports = function(it) {
                    return is ? document.createElement(it) : {};
                };
            },
            { "./_global": 32, "./_is-object": 42 }
        ],
        23: [
            function(require, module, exports) {
                // IE 8- don't enum bug keys
                module.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",");
            },
            {}
        ],
        24: [
            function(require, module, exports) {
                // all enumerable object keys, includes symbols
                var getKeys = require("./_object-keys");
                var gOPS = require("./_object-gops");
                var pIE = require("./_object-pie");
                module.exports = function(it) {
                    var result = getKeys(it);
                    var getSymbols = gOPS.f;
                    if (getSymbols) {
                        var symbols = getSymbols(it);
                        var isEnum = pIE.f;
                        var i = 0;
                        var key;
                        while (symbols.length > i) if (isEnum.call(it, (key = symbols[i++]))) result.push(key);
                    }
                    return result;
                };
            },
            { "./_object-gops": 61, "./_object-keys": 64, "./_object-pie": 65 }
        ],
        25: [
            function(require, module, exports) {
                var global = require("./_global");
                var core = require("./_core");
                var hide = require("./_hide");
                var redefine = require("./_redefine");
                var ctx = require("./_ctx");
                var PROTOTYPE = "prototype";

                var $export = function(type, name, source) {
                    var IS_FORCED = type & $export.F;
                    var IS_GLOBAL = type & $export.G;
                    var IS_STATIC = type & $export.S;
                    var IS_PROTO = type & $export.P;
                    var IS_BIND = type & $export.B;
                    var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
                    var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
                    var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
                    var key, own, out, exp;
                    if (IS_GLOBAL) source = name;
                    for (key in source) {
                        // contains in native
                        own = !IS_FORCED && target && target[key] !== undefined;
                        // export native or passed
                        out = (own ? target : source)[key];
                        // bind timers to global for call from export context
                        exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == "function" ? ctx(Function.call, out) : out;
                        // extend global
                        if (target) redefine(target, key, out, type & $export.U);
                        // export
                        if (exports[key] != out) hide(exports, key, exp);
                        if (IS_PROTO && expProto[key] != out) expProto[key] = out;
                    }
                };
                global.core = core;
                // type bitmap
                $export.F = 1; // forced
                $export.G = 2; // global
                $export.S = 4; // static
                $export.P = 8; // proto
                $export.B = 16; // bind
                $export.W = 32; // wrap
                $export.U = 64; // safe
                $export.R = 128; // real proto method for `library`
                module.exports = $export;
            },
            { "./_core": 17, "./_ctx": 19, "./_global": 32, "./_hide": 34, "./_redefine": 71 }
        ],
        26: [
            function(require, module, exports) {
                var MATCH = require("./_wks")("match");
                module.exports = function(KEY) {
                    var re = /./;
                    try {
                        "/./"[KEY](re);
                    } catch (e) {
                        try {
                            re[MATCH] = false;
                            return !"/./"[KEY](re);
                        } catch (f) {
                            /* empty */
                        }
                    }
                    return true;
                };
            },
            { "./_wks": 94 }
        ],
        27: [
            function(require, module, exports) {
                module.exports = function(exec) {
                    try {
                        return !!exec();
                    } catch (e) {
                        return true;
                    }
                };
            },
            {}
        ],
        28: [
            function(require, module, exports) {
                "use strict";
                require("./es6.regexp.exec");
                var redefine = require("./_redefine");
                var hide = require("./_hide");
                var fails = require("./_fails");
                var defined = require("./_defined");
                var wks = require("./_wks");
                var regexpExec = require("./_regexp-exec");

                var SPECIES = wks("species");

                var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function() {
                    // #replace needs built-in support for named groups.
                    // #match works fine because it just return the exec results, even if it has
                    // a "grops" property.
                    var re = /./;
                    re.exec = function() {
                        var result = [];
                        result.groups = { a: "7" };
                        return result;
                    };
                    return "".replace(re, "$<a>") !== "7";
                });

                var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = (function() {
                    // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
                    var re = /(?:)/;
                    var originalExec = re.exec;
                    re.exec = function() {
                        return originalExec.apply(this, arguments);
                    };
                    var result = "ab".split(re);
                    return result.length === 2 && result[0] === "a" && result[1] === "b";
                })();

                module.exports = function(KEY, length, exec) {
                    var SYMBOL = wks(KEY);

                    var DELEGATES_TO_SYMBOL = !fails(function() {
                        // String methods call symbol-named RegEp methods
                        var O = {};
                        O[SYMBOL] = function() {
                            return 7;
                        };
                        return ""[KEY](O) != 7;
                    });

                    var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL
                        ? !fails(function() {
                              // Symbol-named RegExp methods call .exec
                              var execCalled = false;
                              var re = /a/;
                              re.exec = function() {
                                  execCalled = true;
                                  return null;
                              };
                              if (KEY === "split") {
                                  // RegExp[@@split] doesn't call the regex's exec method, but first creates
                                  // a new one. We need to return the patched regex when creating the new one.
                                  re.constructor = {};
                                  re.constructor[SPECIES] = function() {
                                      return re;
                                  };
                              }
                              re[SYMBOL]("");
                              return !execCalled;
                          })
                        : undefined;

                    if (
                        !DELEGATES_TO_SYMBOL ||
                        !DELEGATES_TO_EXEC ||
                        (KEY === "replace" && !REPLACE_SUPPORTS_NAMED_GROUPS) ||
                        (KEY === "split" && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
                    ) {
                        var nativeRegExpMethod = /./[SYMBOL];
                        var fns = exec(defined, SYMBOL, ""[KEY], function maybeCallNative(nativeMethod, regexp, str, arg2, forceStringMethod) {
                            if (regexp.exec === regexpExec) {
                                if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
                                    // The native String method already delegates to @@method (this
                                    // polyfilled function), leasing to infinite recursion.
                                    // We avoid it by directly calling the native @@method method.
                                    return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
                                }
                                return { done: true, value: nativeMethod.call(str, regexp, arg2) };
                            }
                            return { done: false };
                        });
                        var strfn = fns[0];
                        var rxfn = fns[1];

                        redefine(String.prototype, KEY, strfn);
                        hide(
                            RegExp.prototype,
                            SYMBOL,
                            length == 2
                                ? // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
                                  // 21.2.5.11 RegExp.prototype[@@split](string, limit)
                                  function(string, arg) {
                                      return rxfn.call(string, this, arg);
                                  }
                                : // 21.2.5.6 RegExp.prototype[@@match](string)
                                  // 21.2.5.9 RegExp.prototype[@@search](string)
                                  function(string) {
                                      return rxfn.call(string, this);
                                  }
                        );
                    }
                };
            },
            { "./_defined": 20, "./_fails": 27, "./_hide": 34, "./_redefine": 71, "./_regexp-exec": 73, "./_wks": 94, "./es6.regexp.exec": 107 }
        ],
        29: [
            function(require, module, exports) {
                "use strict";
                // 21.2.5.3 get RegExp.prototype.flags
                var anObject = require("./_an-object");
                module.exports = function() {
                    var that = anObject(this);
                    var result = "";
                    if (that.global) result += "g";
                    if (that.ignoreCase) result += "i";
                    if (that.multiline) result += "m";
                    if (that.unicode) result += "u";
                    if (that.sticky) result += "y";
                    return result;
                };
            },
            { "./_an-object": 6 }
        ],
        30: [
            function(require, module, exports) {
                var ctx = require("./_ctx");
                var call = require("./_iter-call");
                var isArrayIter = require("./_is-array-iter");
                var anObject = require("./_an-object");
                var toLength = require("./_to-length");
                var getIterFn = require("./core.get-iterator-method");
                var BREAK = {};
                var RETURN = {};
                var exports = (module.exports = function(iterable, entries, fn, that, ITERATOR) {
                    var iterFn = ITERATOR
                        ? function() {
                              return iterable;
                          }
                        : getIterFn(iterable);
                    var f = ctx(fn, that, entries ? 2 : 1);
                    var index = 0;
                    var length, step, iterator, result;
                    if (typeof iterFn != "function") throw TypeError(iterable + " is not iterable!");
                    // fast case for arrays with default iterator
                    if (isArrayIter(iterFn))
                        for (length = toLength(iterable.length); length > index; index++) {
                            result = entries ? f(anObject((step = iterable[index]))[0], step[1]) : f(iterable[index]);
                            if (result === BREAK || result === RETURN) return result;
                        }
                    else
                        for (iterator = iterFn.call(iterable); !(step = iterator.next()).done; ) {
                            result = call(iterator, f, step.value, entries);
                            if (result === BREAK || result === RETURN) return result;
                        }
                });
                exports.BREAK = BREAK;
                exports.RETURN = RETURN;
            },
            { "./_an-object": 6, "./_ctx": 19, "./_is-array-iter": 40, "./_iter-call": 44, "./_to-length": 86, "./core.get-iterator-method": 95 }
        ],
        31: [
            function(require, module, exports) {
                module.exports = require("./_shared")("native-function-to-string", Function.toString);
            },
            { "./_shared": 78 }
        ],
        32: [
            function(require, module, exports) {
                // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
                var global = (module.exports =
                    typeof window != "undefined" && window.Math == Math
                        ? window
                        : typeof self != "undefined" && self.Math == Math
                        ? self
                        : // eslint-disable-next-line no-new-func
                          Function("return this")());
                if (typeof __g == "number") __g = global; // eslint-disable-line no-undef
            },
            {}
        ],
        33: [
            function(require, module, exports) {
                var hasOwnProperty = {}.hasOwnProperty;
                module.exports = function(it, key) {
                    return hasOwnProperty.call(it, key);
                };
            },
            {}
        ],
        34: [
            function(require, module, exports) {
                var dP = require("./_object-dp");
                var createDesc = require("./_property-desc");
                module.exports = require("./_descriptors")
                    ? function(object, key, value) {
                          return dP.f(object, key, createDesc(1, value));
                      }
                    : function(object, key, value) {
                          object[key] = value;
                          return object;
                      };
            },
            { "./_descriptors": 21, "./_object-dp": 56, "./_property-desc": 69 }
        ],
        35: [
            function(require, module, exports) {
                var document = require("./_global").document;
                module.exports = document && document.documentElement;
            },
            { "./_global": 32 }
        ],
        36: [
            function(require, module, exports) {
                module.exports =
                    !require("./_descriptors") &&
                    !require("./_fails")(function() {
                        return (
                            Object.defineProperty(require("./_dom-create")("div"), "a", {
                                get: function() {
                                    return 7;
                                }
                            }).a != 7
                        );
                    });
            },
            { "./_descriptors": 21, "./_dom-create": 22, "./_fails": 27 }
        ],
        37: [
            function(require, module, exports) {
                var isObject = require("./_is-object");
                var setPrototypeOf = require("./_set-proto").set;
                module.exports = function(that, target, C) {
                    var S = target.constructor;
                    var P;
                    if (S !== C && typeof S == "function" && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf) {
                        setPrototypeOf(that, P);
                    }
                    return that;
                };
            },
            { "./_is-object": 42, "./_set-proto": 74 }
        ],
        38: [
            function(require, module, exports) {
                // fast apply, http://jsperf.lnkit.com/fast-apply/5
                module.exports = function(fn, args, that) {
                    var un = that === undefined;
                    switch (args.length) {
                        case 0:
                            return un ? fn() : fn.call(that);
                        case 1:
                            return un ? fn(args[0]) : fn.call(that, args[0]);
                        case 2:
                            return un ? fn(args[0], args[1]) : fn.call(that, args[0], args[1]);
                        case 3:
                            return un ? fn(args[0], args[1], args[2]) : fn.call(that, args[0], args[1], args[2]);
                        case 4:
                            return un ? fn(args[0], args[1], args[2], args[3]) : fn.call(that, args[0], args[1], args[2], args[3]);
                    }
                    return fn.apply(that, args);
                };
            },
            {}
        ],
        39: [
            function(require, module, exports) {
                // fallback for non-array-like ES3 and non-enumerable old V8 strings
                var cof = require("./_cof");
                // eslint-disable-next-line no-prototype-builtins
                module.exports = Object("z").propertyIsEnumerable(0)
                    ? Object
                    : function(it) {
                          return cof(it) == "String" ? it.split("") : Object(it);
                      };
            },
            { "./_cof": 13 }
        ],
        40: [
            function(require, module, exports) {
                // check on default Array iterator
                var Iterators = require("./_iterators");
                var ITERATOR = require("./_wks")("iterator");
                var ArrayProto = Array.prototype;

                module.exports = function(it) {
                    return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
                };
            },
            { "./_iterators": 49, "./_wks": 94 }
        ],
        41: [
            function(require, module, exports) {
                // 7.2.2 IsArray(argument)
                var cof = require("./_cof");
                module.exports =
                    Array.isArray ||
                    function isArray(arg) {
                        return cof(arg) == "Array";
                    };
            },
            { "./_cof": 13 }
        ],
        42: [
            function(require, module, exports) {
                module.exports = function(it) {
                    return typeof it === "object" ? it !== null : typeof it === "function";
                };
            },
            {}
        ],
        43: [
            function(require, module, exports) {
                // 7.2.8 IsRegExp(argument)
                var isObject = require("./_is-object");
                var cof = require("./_cof");
                var MATCH = require("./_wks")("match");
                module.exports = function(it) {
                    var isRegExp;
                    return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == "RegExp");
                };
            },
            { "./_cof": 13, "./_is-object": 42, "./_wks": 94 }
        ],
        44: [
            function(require, module, exports) {
                // call something on iterator step with safe closing on error
                var anObject = require("./_an-object");
                module.exports = function(iterator, fn, value, entries) {
                    try {
                        return entries ? fn(anObject(value)[0], value[1]) : fn(value);
                        // 7.4.6 IteratorClose(iterator, completion)
                    } catch (e) {
                        var ret = iterator["return"];
                        if (ret !== undefined) anObject(ret.call(iterator));
                        throw e;
                    }
                };
            },
            { "./_an-object": 6 }
        ],
        45: [
            function(require, module, exports) {
                "use strict";
                var create = require("./_object-create");
                var descriptor = require("./_property-desc");
                var setToStringTag = require("./_set-to-string-tag");
                var IteratorPrototype = {};

                // 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
                require("./_hide")(IteratorPrototype, require("./_wks")("iterator"), function() {
                    return this;
                });

                module.exports = function(Constructor, NAME, next) {
                    Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
                    setToStringTag(Constructor, NAME + " Iterator");
                };
            },
            { "./_hide": 34, "./_object-create": 55, "./_property-desc": 69, "./_set-to-string-tag": 76, "./_wks": 94 }
        ],
        46: [
            function(require, module, exports) {
                "use strict";
                var LIBRARY = require("./_library");
                var $export = require("./_export");
                var redefine = require("./_redefine");
                var hide = require("./_hide");
                var Iterators = require("./_iterators");
                var $iterCreate = require("./_iter-create");
                var setToStringTag = require("./_set-to-string-tag");
                var getPrototypeOf = require("./_object-gpo");
                var ITERATOR = require("./_wks")("iterator");
                var BUGGY = !([].keys && "next" in [].keys()); // Safari has buggy iterators w/o `next`
                var FF_ITERATOR = "@@iterator";
                var KEYS = "keys";
                var VALUES = "values";

                var returnThis = function() {
                    return this;
                };

                module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
                    $iterCreate(Constructor, NAME, next);
                    var getMethod = function(kind) {
                        if (!BUGGY && kind in proto) return proto[kind];
                        switch (kind) {
                            case KEYS:
                                return function keys() {
                                    return new Constructor(this, kind);
                                };
                            case VALUES:
                                return function values() {
                                    return new Constructor(this, kind);
                                };
                        }
                        return function entries() {
                            return new Constructor(this, kind);
                        };
                    };
                    var TAG = NAME + " Iterator";
                    var DEF_VALUES = DEFAULT == VALUES;
                    var VALUES_BUG = false;
                    var proto = Base.prototype;
                    var $native = proto[ITERATOR] || proto[FF_ITERATOR] || (DEFAULT && proto[DEFAULT]);
                    var $default = $native || getMethod(DEFAULT);
                    var $entries = DEFAULT ? (!DEF_VALUES ? $default : getMethod("entries")) : undefined;
                    var $anyNative = NAME == "Array" ? proto.entries || $native : $native;
                    var methods, key, IteratorPrototype;
                    // Fix native
                    if ($anyNative) {
                        IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
                        if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
                            // Set @@toStringTag to native iterators
                            setToStringTag(IteratorPrototype, TAG, true);
                            // fix for some old engines
                            if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != "function") hide(IteratorPrototype, ITERATOR, returnThis);
                        }
                    }
                    // fix Array#{values, @@iterator}.name in V8 / FF
                    if (DEF_VALUES && $native && $native.name !== VALUES) {
                        VALUES_BUG = true;
                        $default = function values() {
                            return $native.call(this);
                        };
                    }
                    // Define iterator
                    if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
                        hide(proto, ITERATOR, $default);
                    }
                    // Plug for library
                    Iterators[NAME] = $default;
                    Iterators[TAG] = returnThis;
                    if (DEFAULT) {
                        methods = {
                            values: DEF_VALUES ? $default : getMethod(VALUES),
                            keys: IS_SET ? $default : getMethod(KEYS),
                            entries: $entries
                        };
                        if (FORCED)
                            for (key in methods) {
                                if (!(key in proto)) redefine(proto, key, methods[key]);
                            }
                        else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
                    }
                    return methods;
                };
            },
            {
                "./_export": 25,
                "./_hide": 34,
                "./_iter-create": 45,
                "./_iterators": 49,
                "./_library": 50,
                "./_object-gpo": 62,
                "./_redefine": 71,
                "./_set-to-string-tag": 76,
                "./_wks": 94
            }
        ],
        47: [
            function(require, module, exports) {
                var ITERATOR = require("./_wks")("iterator");
                var SAFE_CLOSING = false;

                try {
                    var riter = [7][ITERATOR]();
                    riter["return"] = function() {
                        SAFE_CLOSING = true;
                    };
                    // eslint-disable-next-line no-throw-literal
                    Array.from(riter, function() {
                        throw 2;
                    });
                } catch (e) {
                    /* empty */
                }

                module.exports = function(exec, skipClosing) {
                    if (!skipClosing && !SAFE_CLOSING) return false;
                    var safe = false;
                    try {
                        var arr = [7];
                        var iter = arr[ITERATOR]();
                        iter.next = function() {
                            return { done: (safe = true) };
                        };
                        arr[ITERATOR] = function() {
                            return iter;
                        };
                        exec(arr);
                    } catch (e) {
                        /* empty */
                    }
                    return safe;
                };
            },
            { "./_wks": 94 }
        ],
        48: [
            function(require, module, exports) {
                module.exports = function(done, value) {
                    return { value: value, done: !!done };
                };
            },
            {}
        ],
        49: [
            function(require, module, exports) {
                module.exports = {};
            },
            {}
        ],
        50: [
            function(require, module, exports) {
                module.exports = false;
            },
            {}
        ],
        51: [
            function(require, module, exports) {
                var META = require("./_uid")("meta");
                var isObject = require("./_is-object");
                var has = require("./_has");
                var setDesc = require("./_object-dp").f;
                var id = 0;
                var isExtensible =
                    Object.isExtensible ||
                    function() {
                        return true;
                    };
                var FREEZE = !require("./_fails")(function() {
                    return isExtensible(Object.preventExtensions({}));
                });
                var setMeta = function(it) {
                    setDesc(it, META, {
                        value: {
                            i: "O" + ++id, // object ID
                            w: {} // weak collections IDs
                        }
                    });
                };
                var fastKey = function(it, create) {
                    // return primitive with prefix
                    if (!isObject(it)) return typeof it == "symbol" ? it : (typeof it == "string" ? "S" : "P") + it;
                    if (!has(it, META)) {
                        // can't set metadata to uncaught frozen object
                        if (!isExtensible(it)) return "F";
                        // not necessary to add metadata
                        if (!create) return "E";
                        // add missing metadata
                        setMeta(it);
                        // return object ID
                    }
                    return it[META].i;
                };
                var getWeak = function(it, create) {
                    if (!has(it, META)) {
                        // can't set metadata to uncaught frozen object
                        if (!isExtensible(it)) return true;
                        // not necessary to add metadata
                        if (!create) return false;
                        // add missing metadata
                        setMeta(it);
                        // return hash weak collections IDs
                    }
                    return it[META].w;
                };
                // add metadata on freeze-family methods calling
                var onFreeze = function(it) {
                    if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
                    return it;
                };
                var meta = (module.exports = {
                    KEY: META,
                    NEED: false,
                    fastKey: fastKey,
                    getWeak: getWeak,
                    onFreeze: onFreeze
                });
            },
            { "./_fails": 27, "./_has": 33, "./_is-object": 42, "./_object-dp": 56, "./_uid": 89 }
        ],
        52: [
            function(require, module, exports) {
                var global = require("./_global");
                var macrotask = require("./_task").set;
                var Observer = global.MutationObserver || global.WebKitMutationObserver;
                var process = global.process;
                var Promise = global.Promise;
                var isNode = require("./_cof")(process) == "process";

                module.exports = function() {
                    var head, last, notify;

                    var flush = function() {
                        var parent, fn;
                        if (isNode && (parent = process.domain)) parent.exit();
                        while (head) {
                            fn = head.fn;
                            head = head.next;
                            try {
                                fn();
                            } catch (e) {
                                if (head) notify();
                                else last = undefined;
                                throw e;
                            }
                        }
                        last = undefined;
                        if (parent) parent.enter();
                    };

                    // Node.js
                    if (isNode) {
                        notify = function() {
                            process.nextTick(flush);
                        };
                        // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
                    } else if (Observer && !(global.navigator && global.navigator.standalone)) {
                        var toggle = true;
                        var node = document.createTextNode("");
                        new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
                        notify = function() {
                            node.data = toggle = !toggle;
                        };
                        // environments with maybe non-completely correct, but existent Promise
                    } else if (Promise && Promise.resolve) {
                        // Promise.resolve without an argument throws an error in LG WebOS 2
                        var promise = Promise.resolve(undefined);
                        notify = function() {
                            promise.then(flush);
                        };
                        // for other environments - macrotask based on:
                        // - setImmediate
                        // - MessageChannel
                        // - window.postMessag
                        // - onreadystatechange
                        // - setTimeout
                    } else {
                        notify = function() {
                            // strange IE + webpack dev server bug - use .call(global)
                            macrotask.call(global, flush);
                        };
                    }

                    return function(fn) {
                        var task = { fn: fn, next: undefined };
                        if (last) last.next = task;
                        if (!head) {
                            head = task;
                            notify();
                        }
                        last = task;
                    };
                };
            },
            { "./_cof": 13, "./_global": 32, "./_task": 82 }
        ],
        53: [
            function(require, module, exports) {
                "use strict";
                // 25.4.1.5 NewPromiseCapability(C)
                var aFunction = require("./_a-function");

                function PromiseCapability(C) {
                    var resolve, reject;
                    this.promise = new C(function($$resolve, $$reject) {
                        if (resolve !== undefined || reject !== undefined) throw TypeError("Bad Promise constructor");
                        resolve = $$resolve;
                        reject = $$reject;
                    });
                    this.resolve = aFunction(resolve);
                    this.reject = aFunction(reject);
                }

                module.exports.f = function(C) {
                    return new PromiseCapability(C);
                };
            },
            { "./_a-function": 2 }
        ],
        54: [
            function(require, module, exports) {
                "use strict";
                // 19.1.2.1 Object.assign(target, source, ...)
                var getKeys = require("./_object-keys");
                var gOPS = require("./_object-gops");
                var pIE = require("./_object-pie");
                var toObject = require("./_to-object");
                var IObject = require("./_iobject");
                var $assign = Object.assign;

                // should work with symbols and should have deterministic property order (V8 bug)
                module.exports =
                    !$assign ||
                    require("./_fails")(function() {
                        var A = {};
                        var B = {};
                        // eslint-disable-next-line no-undef
                        var S = Symbol();
                        var K = "abcdefghijklmnopqrst";
                        A[S] = 7;
                        K.split("").forEach(function(k) {
                            B[k] = k;
                        });
                        return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join("") != K;
                    })
                        ? function assign(target, source) {
                              // eslint-disable-line no-unused-vars
                              var T = toObject(target);
                              var aLen = arguments.length;
                              var index = 1;
                              var getSymbols = gOPS.f;
                              var isEnum = pIE.f;
                              while (aLen > index) {
                                  var S = IObject(arguments[index++]);
                                  var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
                                  var length = keys.length;
                                  var j = 0;
                                  var key;
                                  while (length > j) if (isEnum.call(S, (key = keys[j++]))) T[key] = S[key];
                              }
                              return T;
                          }
                        : $assign;
            },
            { "./_fails": 27, "./_iobject": 39, "./_object-gops": 61, "./_object-keys": 64, "./_object-pie": 65, "./_to-object": 87 }
        ],
        55: [
            function(require, module, exports) {
                // 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
                var anObject = require("./_an-object");
                var dPs = require("./_object-dps");
                var enumBugKeys = require("./_enum-bug-keys");
                var IE_PROTO = require("./_shared-key")("IE_PROTO");
                var Empty = function() {
                    /* empty */
                };
                var PROTOTYPE = "prototype";

                // Create object with fake `null` prototype: use iframe Object with cleared prototype
                var createDict = function() {
                    // Thrash, waste and sodomy: IE GC bug
                    var iframe = require("./_dom-create")("iframe");
                    var i = enumBugKeys.length;
                    var lt = "<";
                    var gt = ">";
                    var iframeDocument;
                    iframe.style.display = "none";
                    require("./_html").appendChild(iframe);
                    iframe.src = "javascript:"; // eslint-disable-line no-script-url
                    // createDict = iframe.contentWindow.Object;
                    // html.removeChild(iframe);
                    iframeDocument = iframe.contentWindow.document;
                    iframeDocument.open();
                    iframeDocument.write(lt + "script" + gt + "document.F=Object" + lt + "/script" + gt);
                    iframeDocument.close();
                    createDict = iframeDocument.F;
                    while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
                    return createDict();
                };

                module.exports =
                    Object.create ||
                    function create(O, Properties) {
                        var result;
                        if (O !== null) {
                            Empty[PROTOTYPE] = anObject(O);
                            result = new Empty();
                            Empty[PROTOTYPE] = null;
                            // add "__proto__" for Object.getPrototypeOf polyfill
                            result[IE_PROTO] = O;
                        } else result = createDict();
                        return Properties === undefined ? result : dPs(result, Properties);
                    };
            },
            { "./_an-object": 6, "./_dom-create": 22, "./_enum-bug-keys": 23, "./_html": 35, "./_object-dps": 57, "./_shared-key": 77 }
        ],
        56: [
            function(require, module, exports) {
                var anObject = require("./_an-object");
                var IE8_DOM_DEFINE = require("./_ie8-dom-define");
                var toPrimitive = require("./_to-primitive");
                var dP = Object.defineProperty;

                exports.f = require("./_descriptors")
                    ? Object.defineProperty
                    : function defineProperty(O, P, Attributes) {
                          anObject(O);
                          P = toPrimitive(P, true);
                          anObject(Attributes);
                          if (IE8_DOM_DEFINE)
                              try {
                                  return dP(O, P, Attributes);
                              } catch (e) {
                                  /* empty */
                              }
                          if ("get" in Attributes || "set" in Attributes) throw TypeError("Accessors not supported!");
                          if ("value" in Attributes) O[P] = Attributes.value;
                          return O;
                      };
            },
            { "./_an-object": 6, "./_descriptors": 21, "./_ie8-dom-define": 36, "./_to-primitive": 88 }
        ],
        57: [
            function(require, module, exports) {
                var dP = require("./_object-dp");
                var anObject = require("./_an-object");
                var getKeys = require("./_object-keys");

                module.exports = require("./_descriptors")
                    ? Object.defineProperties
                    : function defineProperties(O, Properties) {
                          anObject(O);
                          var keys = getKeys(Properties);
                          var length = keys.length;
                          var i = 0;
                          var P;
                          while (length > i) dP.f(O, (P = keys[i++]), Properties[P]);
                          return O;
                      };
            },
            { "./_an-object": 6, "./_descriptors": 21, "./_object-dp": 56, "./_object-keys": 64 }
        ],
        58: [
            function(require, module, exports) {
                var pIE = require("./_object-pie");
                var createDesc = require("./_property-desc");
                var toIObject = require("./_to-iobject");
                var toPrimitive = require("./_to-primitive");
                var has = require("./_has");
                var IE8_DOM_DEFINE = require("./_ie8-dom-define");
                var gOPD = Object.getOwnPropertyDescriptor;

                exports.f = require("./_descriptors")
                    ? gOPD
                    : function getOwnPropertyDescriptor(O, P) {
                          O = toIObject(O);
                          P = toPrimitive(P, true);
                          if (IE8_DOM_DEFINE)
                              try {
                                  return gOPD(O, P);
                              } catch (e) {
                                  /* empty */
                              }
                          if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
                      };
            },
            {
                "./_descriptors": 21,
                "./_has": 33,
                "./_ie8-dom-define": 36,
                "./_object-pie": 65,
                "./_property-desc": 69,
                "./_to-iobject": 85,
                "./_to-primitive": 88
            }
        ],
        59: [
            function(require, module, exports) {
                // fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
                var toIObject = require("./_to-iobject");
                var gOPN = require("./_object-gopn").f;
                var toString = {}.toString;

                var windowNames = typeof window == "object" && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];

                var getWindowNames = function(it) {
                    try {
                        return gOPN(it);
                    } catch (e) {
                        return windowNames.slice();
                    }
                };

                module.exports.f = function getOwnPropertyNames(it) {
                    return windowNames && toString.call(it) == "[object Window]" ? getWindowNames(it) : gOPN(toIObject(it));
                };
            },
            { "./_object-gopn": 60, "./_to-iobject": 85 }
        ],
        60: [
            function(require, module, exports) {
                // 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
                var $keys = require("./_object-keys-internal");
                var hiddenKeys = require("./_enum-bug-keys").concat("length", "prototype");

                exports.f =
                    Object.getOwnPropertyNames ||
                    function getOwnPropertyNames(O) {
                        return $keys(O, hiddenKeys);
                    };
            },
            { "./_enum-bug-keys": 23, "./_object-keys-internal": 63 }
        ],
        61: [
            function(require, module, exports) {
                exports.f = Object.getOwnPropertySymbols;
            },
            {}
        ],
        62: [
            function(require, module, exports) {
                // 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
                var has = require("./_has");
                var toObject = require("./_to-object");
                var IE_PROTO = require("./_shared-key")("IE_PROTO");
                var ObjectProto = Object.prototype;

                module.exports =
                    Object.getPrototypeOf ||
                    function(O) {
                        O = toObject(O);
                        if (has(O, IE_PROTO)) return O[IE_PROTO];
                        if (typeof O.constructor == "function" && O instanceof O.constructor) {
                            return O.constructor.prototype;
                        }
                        return O instanceof Object ? ObjectProto : null;
                    };
            },
            { "./_has": 33, "./_shared-key": 77, "./_to-object": 87 }
        ],
        63: [
            function(require, module, exports) {
                var has = require("./_has");
                var toIObject = require("./_to-iobject");
                var arrayIndexOf = require("./_array-includes")(false);
                var IE_PROTO = require("./_shared-key")("IE_PROTO");

                module.exports = function(object, names) {
                    var O = toIObject(object);
                    var i = 0;
                    var result = [];
                    var key;
                    for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
                    // Don't enum bug & hidden keys
                    while (names.length > i)
                        if (has(O, (key = names[i++]))) {
                            ~arrayIndexOf(result, key) || result.push(key);
                        }
                    return result;
                };
            },
            { "./_array-includes": 7, "./_has": 33, "./_shared-key": 77, "./_to-iobject": 85 }
        ],
        64: [
            function(require, module, exports) {
                // 19.1.2.14 / 15.2.3.14 Object.keys(O)
                var $keys = require("./_object-keys-internal");
                var enumBugKeys = require("./_enum-bug-keys");

                module.exports =
                    Object.keys ||
                    function keys(O) {
                        return $keys(O, enumBugKeys);
                    };
            },
            { "./_enum-bug-keys": 23, "./_object-keys-internal": 63 }
        ],
        65: [
            function(require, module, exports) {
                exports.f = {}.propertyIsEnumerable;
            },
            {}
        ],
        66: [
            function(require, module, exports) {
                // most Object methods by ES6 should accept primitives
                var $export = require("./_export");
                var core = require("./_core");
                var fails = require("./_fails");
                module.exports = function(KEY, exec) {
                    var fn = (core.Object || {})[KEY] || Object[KEY];
                    var exp = {};
                    exp[KEY] = exec(fn);
                    $export(
                        $export.S +
                            $export.F *
                                fails(function() {
                                    fn(1);
                                }),
                        "Object",
                        exp
                    );
                };
            },
            { "./_core": 17, "./_export": 25, "./_fails": 27 }
        ],
        67: [
            function(require, module, exports) {
                module.exports = function(exec) {
                    try {
                        return { e: false, v: exec() };
                    } catch (e) {
                        return { e: true, v: e };
                    }
                };
            },
            {}
        ],
        68: [
            function(require, module, exports) {
                var anObject = require("./_an-object");
                var isObject = require("./_is-object");
                var newPromiseCapability = require("./_new-promise-capability");

                module.exports = function(C, x) {
                    anObject(C);
                    if (isObject(x) && x.constructor === C) return x;
                    var promiseCapability = newPromiseCapability.f(C);
                    var resolve = promiseCapability.resolve;
                    resolve(x);
                    return promiseCapability.promise;
                };
            },
            { "./_an-object": 6, "./_is-object": 42, "./_new-promise-capability": 53 }
        ],
        69: [
            function(require, module, exports) {
                module.exports = function(bitmap, value) {
                    return {
                        enumerable: !(bitmap & 1),
                        configurable: !(bitmap & 2),
                        writable: !(bitmap & 4),
                        value: value
                    };
                };
            },
            {}
        ],
        70: [
            function(require, module, exports) {
                var redefine = require("./_redefine");
                module.exports = function(target, src, safe) {
                    for (var key in src) redefine(target, key, src[key], safe);
                    return target;
                };
            },
            { "./_redefine": 71 }
        ],
        71: [
            function(require, module, exports) {
                var global = require("./_global");
                var hide = require("./_hide");
                var has = require("./_has");
                var SRC = require("./_uid")("src");
                var $toString = require("./_function-to-string");
                var TO_STRING = "toString";
                var TPL = ("" + $toString).split(TO_STRING);

                require("./_core").inspectSource = function(it) {
                    return $toString.call(it);
                };

                (module.exports = function(O, key, val, safe) {
                    var isFunction = typeof val == "function";
                    if (isFunction) has(val, "name") || hide(val, "name", key);
                    if (O[key] === val) return;
                    if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? "" + O[key] : TPL.join(String(key)));
                    if (O === global) {
                        O[key] = val;
                    } else if (!safe) {
                        delete O[key];
                        hide(O, key, val);
                    } else if (O[key]) {
                        O[key] = val;
                    } else {
                        hide(O, key, val);
                    }
                    // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
                })(Function.prototype, TO_STRING, function toString() {
                    return (typeof this == "function" && this[SRC]) || $toString.call(this);
                });
            },
            { "./_core": 17, "./_function-to-string": 31, "./_global": 32, "./_has": 33, "./_hide": 34, "./_uid": 89 }
        ],
        72: [
            function(require, module, exports) {
                "use strict";

                var classof = require("./_classof");
                var builtinExec = RegExp.prototype.exec;

                // `RegExpExec` abstract operation
                // https://tc39.github.io/ecma262/#sec-regexpexec
                module.exports = function(R, S) {
                    var exec = R.exec;
                    if (typeof exec === "function") {
                        var result = exec.call(R, S);
                        if (typeof result !== "object") {
                            throw new TypeError("RegExp exec method returned something other than an Object or null");
                        }
                        return result;
                    }
                    if (classof(R) !== "RegExp") {
                        throw new TypeError("RegExp#exec called on incompatible receiver");
                    }
                    return builtinExec.call(R, S);
                };
            },
            { "./_classof": 12 }
        ],
        73: [
            function(require, module, exports) {
                "use strict";

                var regexpFlags = require("./_flags");

                var nativeExec = RegExp.prototype.exec;
                // This always refers to the native implementation, because the
                // String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
                // which loads this file before patching the method.
                var nativeReplace = String.prototype.replace;

                var patchedExec = nativeExec;

                var LAST_INDEX = "lastIndex";

                var UPDATES_LAST_INDEX_WRONG = (function() {
                    var re1 = /a/,
                        re2 = /b*/g;
                    nativeExec.call(re1, "a");
                    nativeExec.call(re2, "a");
                    return re1[LAST_INDEX] !== 0 || re2[LAST_INDEX] !== 0;
                })();

                // nonparticipating capturing group, copied from es5-shim's String#split patch.
                var NPCG_INCLUDED = /()??/.exec("")[1] !== undefined;

                var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED;

                if (PATCH) {
                    patchedExec = function exec(str) {
                        var re = this;
                        var lastIndex, reCopy, match, i;

                        if (NPCG_INCLUDED) {
                            reCopy = new RegExp("^" + re.source + "$(?!\\s)", regexpFlags.call(re));
                        }
                        if (UPDATES_LAST_INDEX_WRONG) lastIndex = re[LAST_INDEX];

                        match = nativeExec.call(re, str);

                        if (UPDATES_LAST_INDEX_WRONG && match) {
                            re[LAST_INDEX] = re.global ? match.index + match[0].length : lastIndex;
                        }
                        if (NPCG_INCLUDED && match && match.length > 1) {
                            // Fix browsers whose `exec` methods don't consistently return `undefined`
                            // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
                            // eslint-disable-next-line no-loop-func
                            nativeReplace.call(match[0], reCopy, function() {
                                for (i = 1; i < arguments.length - 2; i++) {
                                    if (arguments[i] === undefined) match[i] = undefined;
                                }
                            });
                        }

                        return match;
                    };
                }

                module.exports = patchedExec;
            },
            { "./_flags": 29 }
        ],
        74: [
            function(require, module, exports) {
                // Works with __proto__ only. Old v8 can't work with null proto objects.
                /* eslint-disable no-proto */
                var isObject = require("./_is-object");
                var anObject = require("./_an-object");
                var check = function(O, proto) {
                    anObject(O);
                    if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
                };
                module.exports = {
                    set:
                        Object.setPrototypeOf ||
                        ("__proto__" in {} // eslint-disable-line
                            ? (function(test, buggy, set) {
                                  try {
                                      set = require("./_ctx")(Function.call, require("./_object-gopd").f(Object.prototype, "__proto__").set, 2);
                                      set(test, []);
                                      buggy = !(test instanceof Array);
                                  } catch (e) {
                                      buggy = true;
                                  }
                                  return function setPrototypeOf(O, proto) {
                                      check(O, proto);
                                      if (buggy) O.__proto__ = proto;
                                      else set(O, proto);
                                      return O;
                                  };
                              })({}, false)
                            : undefined),
                    check: check
                };
            },
            { "./_an-object": 6, "./_ctx": 19, "./_is-object": 42, "./_object-gopd": 58 }
        ],
        75: [
            function(require, module, exports) {
                "use strict";
                var global = require("./_global");
                var dP = require("./_object-dp");
                var DESCRIPTORS = require("./_descriptors");
                var SPECIES = require("./_wks")("species");

                module.exports = function(KEY) {
                    var C = global[KEY];
                    if (DESCRIPTORS && C && !C[SPECIES])
                        dP.f(C, SPECIES, {
                            configurable: true,
                            get: function() {
                                return this;
                            }
                        });
                };
            },
            { "./_descriptors": 21, "./_global": 32, "./_object-dp": 56, "./_wks": 94 }
        ],
        76: [
            function(require, module, exports) {
                var def = require("./_object-dp").f;
                var has = require("./_has");
                var TAG = require("./_wks")("toStringTag");

                module.exports = function(it, tag, stat) {
                    if (it && !has((it = stat ? it : it.prototype), TAG)) def(it, TAG, { configurable: true, value: tag });
                };
            },
            { "./_has": 33, "./_object-dp": 56, "./_wks": 94 }
        ],
        77: [
            function(require, module, exports) {
                var shared = require("./_shared")("keys");
                var uid = require("./_uid");
                module.exports = function(key) {
                    return shared[key] || (shared[key] = uid(key));
                };
            },
            { "./_shared": 78, "./_uid": 89 }
        ],
        78: [
            function(require, module, exports) {
                var core = require("./_core");
                var global = require("./_global");
                var SHARED = "__core-js_shared__";
                var store = global[SHARED] || (global[SHARED] = {});

                (module.exports = function(key, value) {
                    return store[key] || (store[key] = value !== undefined ? value : {});
                })("versions", []).push({
                    version: core.version,
                    mode: require("./_library") ? "pure" : "global",
                    copyright: "© 2019 Denis Pushkarev (zloirock.ru)"
                });
            },
            { "./_core": 17, "./_global": 32, "./_library": 50 }
        ],
        79: [
            function(require, module, exports) {
                // 7.3.20 SpeciesConstructor(O, defaultConstructor)
                var anObject = require("./_an-object");
                var aFunction = require("./_a-function");
                var SPECIES = require("./_wks")("species");
                module.exports = function(O, D) {
                    var C = anObject(O).constructor;
                    var S;
                    return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
                };
            },
            { "./_a-function": 2, "./_an-object": 6, "./_wks": 94 }
        ],
        80: [
            function(require, module, exports) {
                var toInteger = require("./_to-integer");
                var defined = require("./_defined");
                // true  -> String#at
                // false -> String#codePointAt
                module.exports = function(TO_STRING) {
                    return function(that, pos) {
                        var s = String(defined(that));
                        var i = toInteger(pos);
                        var l = s.length;
                        var a, b;
                        if (i < 0 || i >= l) return TO_STRING ? "" : undefined;
                        a = s.charCodeAt(i);
                        return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
                            ? TO_STRING
                                ? s.charAt(i)
                                : a
                            : TO_STRING
                            ? s.slice(i, i + 2)
                            : ((a - 0xd800) << 10) + (b - 0xdc00) + 0x10000;
                    };
                };
            },
            { "./_defined": 20, "./_to-integer": 84 }
        ],
        81: [
            function(require, module, exports) {
                // helper for String#{startsWith, endsWith, includes}
                var isRegExp = require("./_is-regexp");
                var defined = require("./_defined");

                module.exports = function(that, searchString, NAME) {
                    if (isRegExp(searchString)) throw TypeError("String#" + NAME + " doesn't accept regex!");
                    return String(defined(that));
                };
            },
            { "./_defined": 20, "./_is-regexp": 43 }
        ],
        82: [
            function(require, module, exports) {
                var ctx = require("./_ctx");
                var invoke = require("./_invoke");
                var html = require("./_html");
                var cel = require("./_dom-create");
                var global = require("./_global");
                var process = global.process;
                var setTask = global.setImmediate;
                var clearTask = global.clearImmediate;
                var MessageChannel = global.MessageChannel;
                var Dispatch = global.Dispatch;
                var counter = 0;
                var queue = {};
                var ONREADYSTATECHANGE = "onreadystatechange";
                var defer, channel, port;
                var run = function() {
                    var id = +this;
                    // eslint-disable-next-line no-prototype-builtins
                    if (queue.hasOwnProperty(id)) {
                        var fn = queue[id];
                        delete queue[id];
                        fn();
                    }
                };
                var listener = function(event) {
                    run.call(event.data);
                };
                // Node.js 0.9+ & IE10+ has setImmediate, otherwise:
                if (!setTask || !clearTask) {
                    setTask = function setImmediate(fn) {
                        var args = [];
                        var i = 1;
                        while (arguments.length > i) args.push(arguments[i++]);
                        queue[++counter] = function() {
                            // eslint-disable-next-line no-new-func
                            invoke(typeof fn == "function" ? fn : Function(fn), args);
                        };
                        defer(counter);
                        return counter;
                    };
                    clearTask = function clearImmediate(id) {
                        delete queue[id];
                    };
                    // Node.js 0.8-
                    if (require("./_cof")(process) == "process") {
                        defer = function(id) {
                            process.nextTick(ctx(run, id, 1));
                        };
                        // Sphere (JS game engine) Dispatch API
                    } else if (Dispatch && Dispatch.now) {
                        defer = function(id) {
                            Dispatch.now(ctx(run, id, 1));
                        };
                        // Browsers with MessageChannel, includes WebWorkers
                    } else if (MessageChannel) {
                        channel = new MessageChannel();
                        port = channel.port2;
                        channel.port1.onmessage = listener;
                        defer = ctx(port.postMessage, port, 1);
                        // Browsers with postMessage, skip WebWorkers
                        // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
                    } else if (global.addEventListener && typeof postMessage == "function" && !global.importScripts) {
                        defer = function(id) {
                            global.postMessage(id + "", "*");
                        };
                        global.addEventListener("message", listener, false);
                        // IE8-
                    } else if (ONREADYSTATECHANGE in cel("script")) {
                        defer = function(id) {
                            html.appendChild(cel("script"))[ONREADYSTATECHANGE] = function() {
                                html.removeChild(this);
                                run.call(id);
                            };
                        };
                        // Rest old browsers
                    } else {
                        defer = function(id) {
                            setTimeout(ctx(run, id, 1), 0);
                        };
                    }
                }
                module.exports = {
                    set: setTask,
                    clear: clearTask
                };
            },
            { "./_cof": 13, "./_ctx": 19, "./_dom-create": 22, "./_global": 32, "./_html": 35, "./_invoke": 38 }
        ],
        83: [
            function(require, module, exports) {
                var toInteger = require("./_to-integer");
                var max = Math.max;
                var min = Math.min;
                module.exports = function(index, length) {
                    index = toInteger(index);
                    return index < 0 ? max(index + length, 0) : min(index, length);
                };
            },
            { "./_to-integer": 84 }
        ],
        84: [
            function(require, module, exports) {
                // 7.1.4 ToInteger
                var ceil = Math.ceil;
                var floor = Math.floor;
                module.exports = function(it) {
                    return isNaN((it = +it)) ? 0 : (it > 0 ? floor : ceil)(it);
                };
            },
            {}
        ],
        85: [
            function(require, module, exports) {
                // to indexed object, toObject with fallback for non-array-like ES3 strings
                var IObject = require("./_iobject");
                var defined = require("./_defined");
                module.exports = function(it) {
                    return IObject(defined(it));
                };
            },
            { "./_defined": 20, "./_iobject": 39 }
        ],
        86: [
            function(require, module, exports) {
                // 7.1.15 ToLength
                var toInteger = require("./_to-integer");
                var min = Math.min;
                module.exports = function(it) {
                    return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
                };
            },
            { "./_to-integer": 84 }
        ],
        87: [
            function(require, module, exports) {
                // 7.1.13 ToObject(argument)
                var defined = require("./_defined");
                module.exports = function(it) {
                    return Object(defined(it));
                };
            },
            { "./_defined": 20 }
        ],
        88: [
            function(require, module, exports) {
                // 7.1.1 ToPrimitive(input [, PreferredType])
                var isObject = require("./_is-object");
                // instead of the ES6 spec version, we didn't implement @@toPrimitive case
                // and the second argument - flag - preferred type is a string
                module.exports = function(it, S) {
                    if (!isObject(it)) return it;
                    var fn, val;
                    if (S && typeof (fn = it.toString) == "function" && !isObject((val = fn.call(it)))) return val;
                    if (typeof (fn = it.valueOf) == "function" && !isObject((val = fn.call(it)))) return val;
                    if (!S && typeof (fn = it.toString) == "function" && !isObject((val = fn.call(it)))) return val;
                    throw TypeError("Can't convert object to primitive value");
                };
            },
            { "./_is-object": 42 }
        ],
        89: [
            function(require, module, exports) {
                var id = 0;
                var px = Math.random();
                module.exports = function(key) {
                    return "Symbol(".concat(key === undefined ? "" : key, ")_", (++id + px).toString(36));
                };
            },
            {}
        ],
        90: [
            function(require, module, exports) {
                var global = require("./_global");
                var navigator = global.navigator;

                module.exports = (navigator && navigator.userAgent) || "";
            },
            { "./_global": 32 }
        ],
        91: [
            function(require, module, exports) {
                var isObject = require("./_is-object");
                module.exports = function(it, TYPE) {
                    if (!isObject(it) || it._t !== TYPE) throw TypeError("Incompatible receiver, " + TYPE + " required!");
                    return it;
                };
            },
            { "./_is-object": 42 }
        ],
        92: [
            function(require, module, exports) {
                var global = require("./_global");
                var core = require("./_core");
                var LIBRARY = require("./_library");
                var wksExt = require("./_wks-ext");
                var defineProperty = require("./_object-dp").f;
                module.exports = function(name) {
                    var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
                    if (name.charAt(0) != "_" && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
                };
            },
            { "./_core": 17, "./_global": 32, "./_library": 50, "./_object-dp": 56, "./_wks-ext": 93 }
        ],
        93: [
            function(require, module, exports) {
                exports.f = require("./_wks");
            },
            { "./_wks": 94 }
        ],
        94: [
            function(require, module, exports) {
                var store = require("./_shared")("wks");
                var uid = require("./_uid");
                var Symbol = require("./_global").Symbol;
                var USE_SYMBOL = typeof Symbol == "function";

                var $exports = (module.exports = function(name) {
                    return store[name] || (store[name] = (USE_SYMBOL && Symbol[name]) || (USE_SYMBOL ? Symbol : uid)("Symbol." + name));
                });

                $exports.store = store;
            },
            { "./_global": 32, "./_shared": 78, "./_uid": 89 }
        ],
        95: [
            function(require, module, exports) {
                var classof = require("./_classof");
                var ITERATOR = require("./_wks")("iterator");
                var Iterators = require("./_iterators");
                module.exports = require("./_core").getIteratorMethod = function(it) {
                    if (it != undefined) return it[ITERATOR] || it["@@iterator"] || Iterators[classof(it)];
                };
            },
            { "./_classof": 12, "./_core": 17, "./_iterators": 49, "./_wks": 94 }
        ],
        96: [
            function(require, module, exports) {
                "use strict";
                var ctx = require("./_ctx");
                var $export = require("./_export");
                var toObject = require("./_to-object");
                var call = require("./_iter-call");
                var isArrayIter = require("./_is-array-iter");
                var toLength = require("./_to-length");
                var createProperty = require("./_create-property");
                var getIterFn = require("./core.get-iterator-method");

                $export(
                    $export.S +
                        $export.F *
                            !require("./_iter-detect")(function(iter) {
                                Array.from(iter);
                            }),
                    "Array",
                    {
                        // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
                        from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
                            var O = toObject(arrayLike);
                            var C = typeof this == "function" ? this : Array;
                            var aLen = arguments.length;
                            var mapfn = aLen > 1 ? arguments[1] : undefined;
                            var mapping = mapfn !== undefined;
                            var index = 0;
                            var iterFn = getIterFn(O);
                            var length, result, step, iterator;
                            if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
                            // if object isn't iterable or it's array with default iterator - use simple case
                            if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
                                for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
                                    createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
                                }
                            } else {
                                length = toLength(O.length);
                                for (result = new C(length); length > index; index++) {
                                    createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
                                }
                            }
                            result.length = index;
                            return result;
                        }
                    }
                );
            },
            {
                "./_create-property": 18,
                "./_ctx": 19,
                "./_export": 25,
                "./_is-array-iter": 40,
                "./_iter-call": 44,
                "./_iter-detect": 47,
                "./_to-length": 86,
                "./_to-object": 87,
                "./core.get-iterator-method": 95
            }
        ],
        97: [
            function(require, module, exports) {
                "use strict";
                var addToUnscopables = require("./_add-to-unscopables");
                var step = require("./_iter-step");
                var Iterators = require("./_iterators");
                var toIObject = require("./_to-iobject");

                // 22.1.3.4 Array.prototype.entries()
                // 22.1.3.13 Array.prototype.keys()
                // 22.1.3.29 Array.prototype.values()
                // 22.1.3.30 Array.prototype[@@iterator]()
                module.exports = require("./_iter-define")(
                    Array,
                    "Array",
                    function(iterated, kind) {
                        this._t = toIObject(iterated); // target
                        this._i = 0; // next index
                        this._k = kind; // kind
                        // 22.1.5.2.1 %ArrayIteratorPrototype%.next()
                    },
                    function() {
                        var O = this._t;
                        var kind = this._k;
                        var index = this._i++;
                        if (!O || index >= O.length) {
                            this._t = undefined;
                            return step(1);
                        }
                        if (kind == "keys") return step(0, index);
                        if (kind == "values") return step(0, O[index]);
                        return step(0, [index, O[index]]);
                    },
                    "values"
                );

                // argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
                Iterators.Arguments = Iterators.Array;

                addToUnscopables("keys");
                addToUnscopables("values");
                addToUnscopables("entries");
            },
            { "./_add-to-unscopables": 3, "./_iter-define": 46, "./_iter-step": 48, "./_iterators": 49, "./_to-iobject": 85 }
        ],
        98: [
            function(require, module, exports) {
                var dP = require("./_object-dp").f;
                var FProto = Function.prototype;
                var nameRE = /^\s*function ([^ (]*)/;
                var NAME = "name";

                // 19.2.4.2 name
                NAME in FProto ||
                    (require("./_descriptors") &&
                        dP(FProto, NAME, {
                            configurable: true,
                            get: function() {
                                try {
                                    return ("" + this).match(nameRE)[1];
                                } catch (e) {
                                    return "";
                                }
                            }
                        }));
            },
            { "./_descriptors": 21, "./_object-dp": 56 }
        ],
        99: [
            function(require, module, exports) {
                "use strict";
                var strong = require("./_collection-strong");
                var validate = require("./_validate-collection");
                var MAP = "Map";

                // 23.1 Map Objects
                module.exports = require("./_collection")(
                    MAP,
                    function(get) {
                        return function Map() {
                            return get(this, arguments.length > 0 ? arguments[0] : undefined);
                        };
                    },
                    {
                        // 23.1.3.6 Map.prototype.get(key)
                        get: function get(key) {
                            var entry = strong.getEntry(validate(this, MAP), key);
                            return entry && entry.v;
                        },
                        // 23.1.3.9 Map.prototype.set(key, value)
                        set: function set(key, value) {
                            return strong.def(validate(this, MAP), key === 0 ? 0 : key, value);
                        }
                    },
                    strong,
                    true
                );
            },
            { "./_collection": 16, "./_collection-strong": 14, "./_validate-collection": 91 }
        ],
        100: [
            function(require, module, exports) {
                // 19.1.3.1 Object.assign(target, source)
                var $export = require("./_export");

                $export($export.S + $export.F, "Object", { assign: require("./_object-assign") });
            },
            { "./_export": 25, "./_object-assign": 54 }
        ],
        101: [
            function(require, module, exports) {
                // 19.1.2.14 Object.keys(O)
                var toObject = require("./_to-object");
                var $keys = require("./_object-keys");

                require("./_object-sap")("keys", function() {
                    return function keys(it) {
                        return $keys(toObject(it));
                    };
                });
            },
            { "./_object-keys": 64, "./_object-sap": 66, "./_to-object": 87 }
        ],
        102: [
            function(require, module, exports) {
                // 19.1.3.19 Object.setPrototypeOf(O, proto)
                var $export = require("./_export");
                $export($export.S, "Object", { setPrototypeOf: require("./_set-proto").set });
            },
            { "./_export": 25, "./_set-proto": 74 }
        ],
        103: [
            function(require, module, exports) {
                "use strict";
                // 19.1.3.6 Object.prototype.toString()
                var classof = require("./_classof");
                var test = {};
                test[require("./_wks")("toStringTag")] = "z";
                if (test + "" != "[object z]") {
                    require("./_redefine")(
                        Object.prototype,
                        "toString",
                        function toString() {
                            return "[object " + classof(this) + "]";
                        },
                        true
                    );
                }
            },
            { "./_classof": 12, "./_redefine": 71, "./_wks": 94 }
        ],
        104: [
            function(require, module, exports) {
                "use strict";
                var LIBRARY = require("./_library");
                var global = require("./_global");
                var ctx = require("./_ctx");
                var classof = require("./_classof");
                var $export = require("./_export");
                var isObject = require("./_is-object");
                var aFunction = require("./_a-function");
                var anInstance = require("./_an-instance");
                var forOf = require("./_for-of");
                var speciesConstructor = require("./_species-constructor");
                var task = require("./_task").set;
                var microtask = require("./_microtask")();
                var newPromiseCapabilityModule = require("./_new-promise-capability");
                var perform = require("./_perform");
                var userAgent = require("./_user-agent");
                var promiseResolve = require("./_promise-resolve");
                var PROMISE = "Promise";
                var TypeError = global.TypeError;
                var process = global.process;
                var versions = process && process.versions;
                var v8 = (versions && versions.v8) || "";
                var $Promise = global[PROMISE];
                var isNode = classof(process) == "process";
                var empty = function() {
                    /* empty */
                };
                var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
                var newPromiseCapability = (newGenericPromiseCapability = newPromiseCapabilityModule.f);

                var USE_NATIVE = !!(function() {
                    try {
                        // correct subclassing with @@species support
                        var promise = $Promise.resolve(1);
                        var FakePromise = ((promise.constructor = {})[require("./_wks")("species")] = function(exec) {
                            exec(empty, empty);
                        });
                        // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
                        return (
                            (isNode || typeof PromiseRejectionEvent == "function") &&
                            promise.then(empty) instanceof FakePromise &&
                            // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
                            // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
                            // we can't detect it synchronously, so just check versions
                            v8.indexOf("6.6") !== 0 &&
                            userAgent.indexOf("Chrome/66") === -1
                        );
                    } catch (e) {
                        /* empty */
                    }
                })();

                // helpers
                var isThenable = function(it) {
                    var then;
                    return isObject(it) && typeof (then = it.then) == "function" ? then : false;
                };
                var notify = function(promise, isReject) {
                    if (promise._n) return;
                    promise._n = true;
                    var chain = promise._c;
                    microtask(function() {
                        var value = promise._v;
                        var ok = promise._s == 1;
                        var i = 0;
                        var run = function(reaction) {
                            var handler = ok ? reaction.ok : reaction.fail;
                            var resolve = reaction.resolve;
                            var reject = reaction.reject;
                            var domain = reaction.domain;
                            var result, then, exited;
                            try {
                                if (handler) {
                                    if (!ok) {
                                        if (promise._h == 2) onHandleUnhandled(promise);
                                        promise._h = 1;
                                    }
                                    if (handler === true) result = value;
                                    else {
                                        if (domain) domain.enter();
                                        result = handler(value); // may throw
                                        if (domain) {
                                            domain.exit();
                                            exited = true;
                                        }
                                    }
                                    if (result === reaction.promise) {
                                        reject(TypeError("Promise-chain cycle"));
                                    } else if ((then = isThenable(result))) {
                                        then.call(result, resolve, reject);
                                    } else resolve(result);
                                } else reject(value);
                            } catch (e) {
                                if (domain && !exited) domain.exit();
                                reject(e);
                            }
                        };
                        while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
                        promise._c = [];
                        promise._n = false;
                        if (isReject && !promise._h) onUnhandled(promise);
                    });
                };
                var onUnhandled = function(promise) {
                    task.call(global, function() {
                        var value = promise._v;
                        var unhandled = isUnhandled(promise);
                        var result, handler, console;
                        if (unhandled) {
                            result = perform(function() {
                                if (isNode) {
                                    process.emit("unhandledRejection", value, promise);
                                } else if ((handler = global.onunhandledrejection)) {
                                    handler({ promise: promise, reason: value });
                                } else if ((console = global.console) && console.error) {
                                    console.error("Unhandled promise rejection", value);
                                }
                            });
                            // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
                            promise._h = isNode || isUnhandled(promise) ? 2 : 1;
                        }
                        promise._a = undefined;
                        if (unhandled && result.e) throw result.v;
                    });
                };
                var isUnhandled = function(promise) {
                    return promise._h !== 1 && (promise._a || promise._c).length === 0;
                };
                var onHandleUnhandled = function(promise) {
                    task.call(global, function() {
                        var handler;
                        if (isNode) {
                            process.emit("rejectionHandled", promise);
                        } else if ((handler = global.onrejectionhandled)) {
                            handler({ promise: promise, reason: promise._v });
                        }
                    });
                };
                var $reject = function(value) {
                    var promise = this;
                    if (promise._d) return;
                    promise._d = true;
                    promise = promise._w || promise; // unwrap
                    promise._v = value;
                    promise._s = 2;
                    if (!promise._a) promise._a = promise._c.slice();
                    notify(promise, true);
                };
                var $resolve = function(value) {
                    var promise = this;
                    var then;
                    if (promise._d) return;
                    promise._d = true;
                    promise = promise._w || promise; // unwrap
                    try {
                        if (promise === value) throw TypeError("Promise can't be resolved itself");
                        if ((then = isThenable(value))) {
                            microtask(function() {
                                var wrapper = { _w: promise, _d: false }; // wrap
                                try {
                                    then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
                                } catch (e) {
                                    $reject.call(wrapper, e);
                                }
                            });
                        } else {
                            promise._v = value;
                            promise._s = 1;
                            notify(promise, false);
                        }
                    } catch (e) {
                        $reject.call({ _w: promise, _d: false }, e); // wrap
                    }
                };

                // constructor polyfill
                if (!USE_NATIVE) {
                    // 25.4.3.1 Promise(executor)
                    $Promise = function Promise(executor) {
                        anInstance(this, $Promise, PROMISE, "_h");
                        aFunction(executor);
                        Internal.call(this);
                        try {
                            executor(ctx($resolve, this, 1), ctx($reject, this, 1));
                        } catch (err) {
                            $reject.call(this, err);
                        }
                    };
                    // eslint-disable-next-line no-unused-vars
                    Internal = function Promise(executor) {
                        this._c = []; // <- awaiting reactions
                        this._a = undefined; // <- checked in isUnhandled reactions
                        this._s = 0; // <- state
                        this._d = false; // <- done
                        this._v = undefined; // <- value
                        this._h = 0; // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
                        this._n = false; // <- notify
                    };
                    Internal.prototype = require("./_redefine-all")($Promise.prototype, {
                        // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
                        then: function then(onFulfilled, onRejected) {
                            var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
                            reaction.ok = typeof onFulfilled == "function" ? onFulfilled : true;
                            reaction.fail = typeof onRejected == "function" && onRejected;
                            reaction.domain = isNode ? process.domain : undefined;
                            this._c.push(reaction);
                            if (this._a) this._a.push(reaction);
                            if (this._s) notify(this, false);
                            return reaction.promise;
                        },
                        // 25.4.5.1 Promise.prototype.catch(onRejected)
                        catch: function(onRejected) {
                            return this.then(undefined, onRejected);
                        }
                    });
                    OwnPromiseCapability = function() {
                        var promise = new Internal();
                        this.promise = promise;
                        this.resolve = ctx($resolve, promise, 1);
                        this.reject = ctx($reject, promise, 1);
                    };
                    newPromiseCapabilityModule.f = newPromiseCapability = function(C) {
                        return C === $Promise || C === Wrapper ? new OwnPromiseCapability(C) : newGenericPromiseCapability(C);
                    };
                }

                $export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
                require("./_set-to-string-tag")($Promise, PROMISE);
                require("./_set-species")(PROMISE);
                Wrapper = require("./_core")[PROMISE];

                // statics
                $export($export.S + $export.F * !USE_NATIVE, PROMISE, {
                    // 25.4.4.5 Promise.reject(r)
                    reject: function reject(r) {
                        var capability = newPromiseCapability(this);
                        var $$reject = capability.reject;
                        $$reject(r);
                        return capability.promise;
                    }
                });
                $export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
                    // 25.4.4.6 Promise.resolve(x)
                    resolve: function resolve(x) {
                        return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
                    }
                });
                $export(
                    $export.S +
                        $export.F *
                            !(
                                USE_NATIVE &&
                                require("./_iter-detect")(function(iter) {
                                    $Promise.all(iter)["catch"](empty);
                                })
                            ),
                    PROMISE,
                    {
                        // 25.4.4.1 Promise.all(iterable)
                        all: function all(iterable) {
                            var C = this;
                            var capability = newPromiseCapability(C);
                            var resolve = capability.resolve;
                            var reject = capability.reject;
                            var result = perform(function() {
                                var values = [];
                                var index = 0;
                                var remaining = 1;
                                forOf(iterable, false, function(promise) {
                                    var $index = index++;
                                    var alreadyCalled = false;
                                    values.push(undefined);
                                    remaining++;
                                    C.resolve(promise).then(function(value) {
                                        if (alreadyCalled) return;
                                        alreadyCalled = true;
                                        values[$index] = value;
                                        --remaining || resolve(values);
                                    }, reject);
                                });
                                --remaining || resolve(values);
                            });
                            if (result.e) reject(result.v);
                            return capability.promise;
                        },
                        // 25.4.4.4 Promise.race(iterable)
                        race: function race(iterable) {
                            var C = this;
                            var capability = newPromiseCapability(C);
                            var reject = capability.reject;
                            var result = perform(function() {
                                forOf(iterable, false, function(promise) {
                                    C.resolve(promise).then(capability.resolve, reject);
                                });
                            });
                            if (result.e) reject(result.v);
                            return capability.promise;
                        }
                    }
                );
            },
            {
                "./_a-function": 2,
                "./_an-instance": 5,
                "./_classof": 12,
                "./_core": 17,
                "./_ctx": 19,
                "./_export": 25,
                "./_for-of": 30,
                "./_global": 32,
                "./_is-object": 42,
                "./_iter-detect": 47,
                "./_library": 50,
                "./_microtask": 52,
                "./_new-promise-capability": 53,
                "./_perform": 67,
                "./_promise-resolve": 68,
                "./_redefine-all": 70,
                "./_set-species": 75,
                "./_set-to-string-tag": 76,
                "./_species-constructor": 79,
                "./_task": 82,
                "./_user-agent": 90,
                "./_wks": 94
            }
        ],
        105: [
            function(require, module, exports) {
                // 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
                var $export = require("./_export");
                var create = require("./_object-create");
                var aFunction = require("./_a-function");
                var anObject = require("./_an-object");
                var isObject = require("./_is-object");
                var fails = require("./_fails");
                var bind = require("./_bind");
                var rConstruct = (require("./_global").Reflect || {}).construct;

                // MS Edge supports only 2 arguments and argumentsList argument is optional
                // FF Nightly sets third argument as `new.target`, but does not create `this` from it
                var NEW_TARGET_BUG = fails(function() {
                    function F() {
                        /* empty */
                    }
                    return !(
                        rConstruct(
                            function() {
                                /* empty */
                            },
                            [],
                            F
                        ) instanceof F
                    );
                });
                var ARGS_BUG = !fails(function() {
                    rConstruct(function() {
                        /* empty */
                    });
                });

                $export($export.S + $export.F * (NEW_TARGET_BUG || ARGS_BUG), "Reflect", {
                    construct: function construct(Target, args /* , newTarget */) {
                        aFunction(Target);
                        anObject(args);
                        var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
                        if (ARGS_BUG && !NEW_TARGET_BUG) return rConstruct(Target, args, newTarget);
                        if (Target == newTarget) {
                            // w/o altered newTarget, optimization for 0-4 arguments
                            switch (args.length) {
                                case 0:
                                    return new Target();
                                case 1:
                                    return new Target(args[0]);
                                case 2:
                                    return new Target(args[0], args[1]);
                                case 3:
                                    return new Target(args[0], args[1], args[2]);
                                case 4:
                                    return new Target(args[0], args[1], args[2], args[3]);
                            }
                            // w/o altered newTarget, lot of arguments case
                            var $args = [null];
                            $args.push.apply($args, args);
                            return new (bind.apply(Target, $args))();
                        }
                        // with altered newTarget, not support built-in constructors
                        var proto = newTarget.prototype;
                        var instance = create(isObject(proto) ? proto : Object.prototype);
                        var result = Function.apply.call(Target, instance, args);
                        return isObject(result) ? result : instance;
                    }
                });
            },
            {
                "./_a-function": 2,
                "./_an-object": 6,
                "./_bind": 11,
                "./_export": 25,
                "./_fails": 27,
                "./_global": 32,
                "./_is-object": 42,
                "./_object-create": 55
            }
        ],
        106: [
            function(require, module, exports) {
                var global = require("./_global");
                var inheritIfRequired = require("./_inherit-if-required");
                var dP = require("./_object-dp").f;
                var gOPN = require("./_object-gopn").f;
                var isRegExp = require("./_is-regexp");
                var $flags = require("./_flags");
                var $RegExp = global.RegExp;
                var Base = $RegExp;
                var proto = $RegExp.prototype;
                var re1 = /a/g;
                var re2 = /a/g;
                // "new" creates a new object, old webkit buggy here
                var CORRECT_NEW = new $RegExp(re1) !== re1;

                if (
                    require("./_descriptors") &&
                    (!CORRECT_NEW ||
                        require("./_fails")(function() {
                            re2[require("./_wks")("match")] = false;
                            // RegExp constructor can alter flags and IsRegExp works correct with @@match
                            return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, "i") != "/a/i";
                        }))
                ) {
                    $RegExp = function RegExp(p, f) {
                        var tiRE = this instanceof $RegExp;
                        var piRE = isRegExp(p);
                        var fiU = f === undefined;
                        return !tiRE && piRE && p.constructor === $RegExp && fiU
                            ? p
                            : inheritIfRequired(
                                  CORRECT_NEW
                                      ? new Base(piRE && !fiU ? p.source : p, f)
                                      : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags.call(p) : f),
                                  tiRE ? this : proto,
                                  $RegExp
                              );
                    };
                    var proxy = function(key) {
                        key in $RegExp ||
                            dP($RegExp, key, {
                                configurable: true,
                                get: function() {
                                    return Base[key];
                                },
                                set: function(it) {
                                    Base[key] = it;
                                }
                            });
                    };
                    for (var keys = gOPN(Base), i = 0; keys.length > i; ) proxy(keys[i++]);
                    proto.constructor = $RegExp;
                    $RegExp.prototype = proto;
                    require("./_redefine")(global, "RegExp", $RegExp);
                }

                require("./_set-species")("RegExp");
            },
            {
                "./_descriptors": 21,
                "./_fails": 27,
                "./_flags": 29,
                "./_global": 32,
                "./_inherit-if-required": 37,
                "./_is-regexp": 43,
                "./_object-dp": 56,
                "./_object-gopn": 60,
                "./_redefine": 71,
                "./_set-species": 75,
                "./_wks": 94
            }
        ],
        107: [
            function(require, module, exports) {
                "use strict";
                var regexpExec = require("./_regexp-exec");
                require("./_export")(
                    {
                        target: "RegExp",
                        proto: true,
                        forced: regexpExec !== /./.exec
                    },
                    {
                        exec: regexpExec
                    }
                );
            },
            { "./_export": 25, "./_regexp-exec": 73 }
        ],
        108: [
            function(require, module, exports) {
                // 21.2.5.3 get RegExp.prototype.flags()
                if (require("./_descriptors") && /./g.flags != "g")
                    require("./_object-dp").f(RegExp.prototype, "flags", {
                        configurable: true,
                        get: require("./_flags")
                    });
            },
            { "./_descriptors": 21, "./_flags": 29, "./_object-dp": 56 }
        ],
        109: [
            function(require, module, exports) {
                "use strict";

                var anObject = require("./_an-object");
                var toObject = require("./_to-object");
                var toLength = require("./_to-length");
                var toInteger = require("./_to-integer");
                var advanceStringIndex = require("./_advance-string-index");
                var regExpExec = require("./_regexp-exec-abstract");
                var max = Math.max;
                var min = Math.min;
                var floor = Math.floor;
                var SUBSTITUTION_SYMBOLS = /\$([$&`']|\d\d?|<[^>]*>)/g;
                var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&`']|\d\d?)/g;

                var maybeToString = function(it) {
                    return it === undefined ? it : String(it);
                };

                // @@replace logic
                require("./_fix-re-wks")("replace", 2, function(defined, REPLACE, $replace, maybeCallNative) {
                    return [
                        // `String.prototype.replace` method
                        // https://tc39.github.io/ecma262/#sec-string.prototype.replace
                        function replace(searchValue, replaceValue) {
                            var O = defined(this);
                            var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
                            return fn !== undefined ? fn.call(searchValue, O, replaceValue) : $replace.call(String(O), searchValue, replaceValue);
                        },
                        // `RegExp.prototype[@@replace]` method
                        // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
                        function(regexp, replaceValue) {
                            var res = maybeCallNative($replace, regexp, this, replaceValue);
                            if (res.done) return res.value;

                            var rx = anObject(regexp);
                            var S = String(this);
                            var functionalReplace = typeof replaceValue === "function";
                            if (!functionalReplace) replaceValue = String(replaceValue);
                            var global = rx.global;
                            if (global) {
                                var fullUnicode = rx.unicode;
                                rx.lastIndex = 0;
                            }
                            var results = [];
                            while (true) {
                                var result = regExpExec(rx, S);
                                if (result === null) break;
                                results.push(result);
                                if (!global) break;
                                var matchStr = String(result[0]);
                                if (matchStr === "") rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
                            }
                            var accumulatedResult = "";
                            var nextSourcePosition = 0;
                            for (var i = 0; i < results.length; i++) {
                                result = results[i];
                                var matched = String(result[0]);
                                var position = max(min(toInteger(result.index), S.length), 0);
                                var captures = [];
                                // NOTE: This is equivalent to
                                //   captures = result.slice(1).map(maybeToString)
                                // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
                                // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
                                // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
                                for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
                                var namedCaptures = result.groups;
                                if (functionalReplace) {
                                    var replacerArgs = [matched].concat(captures, position, S);
                                    if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
                                    var replacement = String(replaceValue.apply(undefined, replacerArgs));
                                } else {
                                    replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
                                }
                                if (position >= nextSourcePosition) {
                                    accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
                                    nextSourcePosition = position + matched.length;
                                }
                            }
                            return accumulatedResult + S.slice(nextSourcePosition);
                        }
                    ];

                    // https://tc39.github.io/ecma262/#sec-getsubstitution
                    function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
                        var tailPos = position + matched.length;
                        var m = captures.length;
                        var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
                        if (namedCaptures !== undefined) {
                            namedCaptures = toObject(namedCaptures);
                            symbols = SUBSTITUTION_SYMBOLS;
                        }
                        return $replace.call(replacement, symbols, function(match, ch) {
                            var capture;
                            switch (ch.charAt(0)) {
                                case "$":
                                    return "$";
                                case "&":
                                    return matched;
                                case "`":
                                    return str.slice(0, position);
                                case "'":
                                    return str.slice(tailPos);
                                case "<":
                                    capture = namedCaptures[ch.slice(1, -1)];
                                    break;
                                default:
                                    // \d\d?
                                    var n = +ch;
                                    if (n === 0) return match;
                                    if (n > m) {
                                        var f = floor(n / 10);
                                        if (f === 0) return match;
                                        if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
                                        return match;
                                    }
                                    capture = captures[n - 1];
                            }
                            return capture === undefined ? "" : capture;
                        });
                    }
                });
            },
            {
                "./_advance-string-index": 4,
                "./_an-object": 6,
                "./_fix-re-wks": 28,
                "./_regexp-exec-abstract": 72,
                "./_to-integer": 84,
                "./_to-length": 86,
                "./_to-object": 87
            }
        ],
        110: [
            function(require, module, exports) {
                "use strict";

                var isRegExp = require("./_is-regexp");
                var anObject = require("./_an-object");
                var speciesConstructor = require("./_species-constructor");
                var advanceStringIndex = require("./_advance-string-index");
                var toLength = require("./_to-length");
                var callRegExpExec = require("./_regexp-exec-abstract");
                var regexpExec = require("./_regexp-exec");
                var fails = require("./_fails");
                var $min = Math.min;
                var $push = [].push;
                var $SPLIT = "split";
                var LENGTH = "length";
                var LAST_INDEX = "lastIndex";
                var MAX_UINT32 = 0xffffffff;

                // babel-minify transpiles RegExp('x', 'y') -> /x/y and it causes SyntaxError
                var SUPPORTS_Y = !fails(function() {
                    RegExp(MAX_UINT32, "y");
                });

                // @@split logic
                require("./_fix-re-wks")("split", 2, function(defined, SPLIT, $split, maybeCallNative) {
                    var internalSplit;
                    if (
                        "abbc"[$SPLIT](/(b)*/)[1] == "c" ||
                        "test"[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
                        "ab"[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
                        "."[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
                        "."[$SPLIT](/()()/)[LENGTH] > 1 ||
                        ""[$SPLIT](/.?/)[LENGTH]
                    ) {
                        // based on es5-shim implementation, need to rework it
                        internalSplit = function(separator, limit) {
                            var string = String(this);
                            if (separator === undefined && limit === 0) return [];
                            // If `separator` is not a regex, use native split
                            if (!isRegExp(separator)) return $split.call(string, separator, limit);
                            var output = [];
                            var flags =
                                (separator.ignoreCase ? "i" : "") +
                                (separator.multiline ? "m" : "") +
                                (separator.unicode ? "u" : "") +
                                (separator.sticky ? "y" : "");
                            var lastLastIndex = 0;
                            var splitLimit = limit === undefined ? MAX_UINT32 : limit >>> 0;
                            // Make `global` and avoid `lastIndex` issues by working with a copy
                            var separatorCopy = new RegExp(separator.source, flags + "g");
                            var match, lastIndex, lastLength;
                            while ((match = regexpExec.call(separatorCopy, string))) {
                                lastIndex = separatorCopy[LAST_INDEX];
                                if (lastIndex > lastLastIndex) {
                                    output.push(string.slice(lastLastIndex, match.index));
                                    if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));
                                    lastLength = match[0][LENGTH];
                                    lastLastIndex = lastIndex;
                                    if (output[LENGTH] >= splitLimit) break;
                                }
                                if (separatorCopy[LAST_INDEX] === match.index) separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
                            }
                            if (lastLastIndex === string[LENGTH]) {
                                if (lastLength || !separatorCopy.test("")) output.push("");
                            } else output.push(string.slice(lastLastIndex));
                            return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
                        };
                        // Chakra, V8
                    } else if ("0"[$SPLIT](undefined, 0)[LENGTH]) {
                        internalSplit = function(separator, limit) {
                            return separator === undefined && limit === 0 ? [] : $split.call(this, separator, limit);
                        };
                    } else {
                        internalSplit = $split;
                    }

                    return [
                        // `String.prototype.split` method
                        // https://tc39.github.io/ecma262/#sec-string.prototype.split
                        function split(separator, limit) {
                            var O = defined(this);
                            var splitter = separator == undefined ? undefined : separator[SPLIT];
                            return splitter !== undefined ? splitter.call(separator, O, limit) : internalSplit.call(String(O), separator, limit);
                        },
                        // `RegExp.prototype[@@split]` method
                        // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@split
                        //
                        // NOTE: This cannot be properly polyfilled in engines that don't support
                        // the 'y' flag.
                        function(regexp, limit) {
                            var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== $split);
                            if (res.done) return res.value;

                            var rx = anObject(regexp);
                            var S = String(this);
                            var C = speciesConstructor(rx, RegExp);

                            var unicodeMatching = rx.unicode;
                            var flags = (rx.ignoreCase ? "i" : "") + (rx.multiline ? "m" : "") + (rx.unicode ? "u" : "") + (SUPPORTS_Y ? "y" : "g");

                            // ^(? + rx + ) is needed, in combination with some S slicing, to
                            // simulate the 'y' flag.
                            var splitter = new C(SUPPORTS_Y ? rx : "^(?:" + rx.source + ")", flags);
                            var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
                            if (lim === 0) return [];
                            if (S.length === 0) return callRegExpExec(splitter, S) === null ? [S] : [];
                            var p = 0;
                            var q = 0;
                            var A = [];
                            while (q < S.length) {
                                splitter.lastIndex = SUPPORTS_Y ? q : 0;
                                var z = callRegExpExec(splitter, SUPPORTS_Y ? S : S.slice(q));
                                var e;
                                if (z === null || (e = $min(toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p) {
                                    q = advanceStringIndex(S, q, unicodeMatching);
                                } else {
                                    A.push(S.slice(p, q));
                                    if (A.length === lim) return A;
                                    for (var i = 1; i <= z.length - 1; i++) {
                                        A.push(z[i]);
                                        if (A.length === lim) return A;
                                    }
                                    q = p = e;
                                }
                            }
                            A.push(S.slice(p));
                            return A;
                        }
                    ];
                });
            },
            {
                "./_advance-string-index": 4,
                "./_an-object": 6,
                "./_fails": 27,
                "./_fix-re-wks": 28,
                "./_is-regexp": 43,
                "./_regexp-exec": 73,
                "./_regexp-exec-abstract": 72,
                "./_species-constructor": 79,
                "./_to-length": 86
            }
        ],
        111: [
            function(require, module, exports) {
                "use strict";
                require("./es6.regexp.flags");
                var anObject = require("./_an-object");
                var $flags = require("./_flags");
                var DESCRIPTORS = require("./_descriptors");
                var TO_STRING = "toString";
                var $toString = /./[TO_STRING];

                var define = function(fn) {
                    require("./_redefine")(RegExp.prototype, TO_STRING, fn, true);
                };

                // 21.2.5.14 RegExp.prototype.toString()
                if (
                    require("./_fails")(function() {
                        return $toString.call({ source: "a", flags: "b" }) != "/a/b";
                    })
                ) {
                    define(function toString() {
                        var R = anObject(this);
                        return "/".concat(R.source, "/", "flags" in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);
                    });
                    // FF44- RegExp#toString has a wrong name
                } else if ($toString.name != TO_STRING) {
                    define(function toString() {
                        return $toString.call(this);
                    });
                }
            },
            { "./_an-object": 6, "./_descriptors": 21, "./_fails": 27, "./_flags": 29, "./_redefine": 71, "./es6.regexp.flags": 108 }
        ],
        112: [
            function(require, module, exports) {
                "use strict";
                var strong = require("./_collection-strong");
                var validate = require("./_validate-collection");
                var SET = "Set";

                // 23.2 Set Objects
                module.exports = require("./_collection")(
                    SET,
                    function(get) {
                        return function Set() {
                            return get(this, arguments.length > 0 ? arguments[0] : undefined);
                        };
                    },
                    {
                        // 23.2.3.1 Set.prototype.add(value)
                        add: function add(value) {
                            return strong.def(validate(this, SET), (value = value === 0 ? 0 : value), value);
                        }
                    },
                    strong
                );
            },
            { "./_collection": 16, "./_collection-strong": 14, "./_validate-collection": 91 }
        ],
        113: [
            function(require, module, exports) {
                // 21.1.3.7 String.prototype.includes(searchString, position = 0)
                "use strict";
                var $export = require("./_export");
                var context = require("./_string-context");
                var INCLUDES = "includes";

                $export($export.P + $export.F * require("./_fails-is-regexp")(INCLUDES), "String", {
                    includes: function includes(searchString /* , position = 0 */) {
                        return !!~context(this, searchString, INCLUDES).indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
                    }
                });
            },
            { "./_export": 25, "./_fails-is-regexp": 26, "./_string-context": 81 }
        ],
        114: [
            function(require, module, exports) {
                "use strict";
                var $at = require("./_string-at")(true);

                // 21.1.3.27 String.prototype[@@iterator]()
                require("./_iter-define")(
                    String,
                    "String",
                    function(iterated) {
                        this._t = String(iterated); // target
                        this._i = 0; // next index
                        // 21.1.5.2.1 %StringIteratorPrototype%.next()
                    },
                    function() {
                        var O = this._t;
                        var index = this._i;
                        var point;
                        if (index >= O.length) return { value: undefined, done: true };
                        point = $at(O, index);
                        this._i += point.length;
                        return { value: point, done: false };
                    }
                );
            },
            { "./_iter-define": 46, "./_string-at": 80 }
        ],
        115: [
            function(require, module, exports) {
                // 21.1.3.18 String.prototype.startsWith(searchString [, position ])
                "use strict";
                var $export = require("./_export");
                var toLength = require("./_to-length");
                var context = require("./_string-context");
                var STARTS_WITH = "startsWith";
                var $startsWith = ""[STARTS_WITH];

                $export($export.P + $export.F * require("./_fails-is-regexp")(STARTS_WITH), "String", {
                    startsWith: function startsWith(searchString /* , position = 0 */) {
                        var that = context(this, searchString, STARTS_WITH);
                        var index = toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length));
                        var search = String(searchString);
                        return $startsWith ? $startsWith.call(that, search, index) : that.slice(index, index + search.length) === search;
                    }
                });
            },
            { "./_export": 25, "./_fails-is-regexp": 26, "./_string-context": 81, "./_to-length": 86 }
        ],
        116: [
            function(require, module, exports) {
                "use strict";
                // ECMAScript 6 symbols shim
                var global = require("./_global");
                var has = require("./_has");
                var DESCRIPTORS = require("./_descriptors");
                var $export = require("./_export");
                var redefine = require("./_redefine");
                var META = require("./_meta").KEY;
                var $fails = require("./_fails");
                var shared = require("./_shared");
                var setToStringTag = require("./_set-to-string-tag");
                var uid = require("./_uid");
                var wks = require("./_wks");
                var wksExt = require("./_wks-ext");
                var wksDefine = require("./_wks-define");
                var enumKeys = require("./_enum-keys");
                var isArray = require("./_is-array");
                var anObject = require("./_an-object");
                var isObject = require("./_is-object");
                var toIObject = require("./_to-iobject");
                var toPrimitive = require("./_to-primitive");
                var createDesc = require("./_property-desc");
                var _create = require("./_object-create");
                var gOPNExt = require("./_object-gopn-ext");
                var $GOPD = require("./_object-gopd");
                var $DP = require("./_object-dp");
                var $keys = require("./_object-keys");
                var gOPD = $GOPD.f;
                var dP = $DP.f;
                var gOPN = gOPNExt.f;
                var $Symbol = global.Symbol;
                var $JSON = global.JSON;
                var _stringify = $JSON && $JSON.stringify;
                var PROTOTYPE = "prototype";
                var HIDDEN = wks("_hidden");
                var TO_PRIMITIVE = wks("toPrimitive");
                var isEnum = {}.propertyIsEnumerable;
                var SymbolRegistry = shared("symbol-registry");
                var AllSymbols = shared("symbols");
                var OPSymbols = shared("op-symbols");
                var ObjectProto = Object[PROTOTYPE];
                var USE_NATIVE = typeof $Symbol == "function";
                var QObject = global.QObject;
                // Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
                var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

                // fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
                var setSymbolDesc =
                    DESCRIPTORS &&
                    $fails(function() {
                        return (
                            _create(
                                dP({}, "a", {
                                    get: function() {
                                        return dP(this, "a", { value: 7 }).a;
                                    }
                                })
                            ).a != 7
                        );
                    })
                        ? function(it, key, D) {
                              var protoDesc = gOPD(ObjectProto, key);
                              if (protoDesc) delete ObjectProto[key];
                              dP(it, key, D);
                              if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
                          }
                        : dP;

                var wrap = function(tag) {
                    var sym = (AllSymbols[tag] = _create($Symbol[PROTOTYPE]));
                    sym._k = tag;
                    return sym;
                };

                var isSymbol =
                    USE_NATIVE && typeof $Symbol.iterator == "symbol"
                        ? function(it) {
                              return typeof it == "symbol";
                          }
                        : function(it) {
                              return it instanceof $Symbol;
                          };

                var $defineProperty = function defineProperty(it, key, D) {
                    if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
                    anObject(it);
                    key = toPrimitive(key, true);
                    anObject(D);
                    if (has(AllSymbols, key)) {
                        if (!D.enumerable) {
                            if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
                            it[HIDDEN][key] = true;
                        } else {
                            if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
                            D = _create(D, { enumerable: createDesc(0, false) });
                        }
                        return setSymbolDesc(it, key, D);
                    }
                    return dP(it, key, D);
                };
                var $defineProperties = function defineProperties(it, P) {
                    anObject(it);
                    var keys = enumKeys((P = toIObject(P)));
                    var i = 0;
                    var l = keys.length;
                    var key;
                    while (l > i) $defineProperty(it, (key = keys[i++]), P[key]);
                    return it;
                };
                var $create = function create(it, P) {
                    return P === undefined ? _create(it) : $defineProperties(_create(it), P);
                };
                var $propertyIsEnumerable = function propertyIsEnumerable(key) {
                    var E = isEnum.call(this, (key = toPrimitive(key, true)));
                    if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
                    return E || !has(this, key) || !has(AllSymbols, key) || (has(this, HIDDEN) && this[HIDDEN][key]) ? E : true;
                };
                var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
                    it = toIObject(it);
                    key = toPrimitive(key, true);
                    if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
                    var D = gOPD(it, key);
                    if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
                    return D;
                };
                var $getOwnPropertyNames = function getOwnPropertyNames(it) {
                    var names = gOPN(toIObject(it));
                    var result = [];
                    var i = 0;
                    var key;
                    while (names.length > i) {
                        if (!has(AllSymbols, (key = names[i++])) && key != HIDDEN && key != META) result.push(key);
                    }
                    return result;
                };
                var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
                    var IS_OP = it === ObjectProto;
                    var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
                    var result = [];
                    var i = 0;
                    var key;
                    while (names.length > i) {
                        if (has(AllSymbols, (key = names[i++])) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
                    }
                    return result;
                };

                // 19.4.1.1 Symbol([description])
                if (!USE_NATIVE) {
                    $Symbol = function Symbol() {
                        if (this instanceof $Symbol) throw TypeError("Symbol is not a constructor!");
                        var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
                        var $set = function(value) {
                            if (this === ObjectProto) $set.call(OPSymbols, value);
                            if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
                            setSymbolDesc(this, tag, createDesc(1, value));
                        };
                        if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
                        return wrap(tag);
                    };
                    redefine($Symbol[PROTOTYPE], "toString", function toString() {
                        return this._k;
                    });

                    $GOPD.f = $getOwnPropertyDescriptor;
                    $DP.f = $defineProperty;
                    require("./_object-gopn").f = gOPNExt.f = $getOwnPropertyNames;
                    require("./_object-pie").f = $propertyIsEnumerable;
                    require("./_object-gops").f = $getOwnPropertySymbols;

                    if (DESCRIPTORS && !require("./_library")) {
                        redefine(ObjectProto, "propertyIsEnumerable", $propertyIsEnumerable, true);
                    }

                    wksExt.f = function(name) {
                        return wrap(wks(name));
                    };
                }

                $export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

                for (
                    var es6Symbols = // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
                        "hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","),
                        j = 0;
                    es6Symbols.length > j;

                )
                    wks(es6Symbols[j++]);

                for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k; ) wksDefine(wellKnownSymbols[k++]);

                $export($export.S + $export.F * !USE_NATIVE, "Symbol", {
                    // 19.4.2.1 Symbol.for(key)
                    for: function(key) {
                        return has(SymbolRegistry, (key += "")) ? SymbolRegistry[key] : (SymbolRegistry[key] = $Symbol(key));
                    },
                    // 19.4.2.5 Symbol.keyFor(sym)
                    keyFor: function keyFor(sym) {
                        if (!isSymbol(sym)) throw TypeError(sym + " is not a symbol!");
                        for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
                    },
                    useSetter: function() {
                        setter = true;
                    },
                    useSimple: function() {
                        setter = false;
                    }
                });

                $export($export.S + $export.F * !USE_NATIVE, "Object", {
                    // 19.1.2.2 Object.create(O [, Properties])
                    create: $create,
                    // 19.1.2.4 Object.defineProperty(O, P, Attributes)
                    defineProperty: $defineProperty,
                    // 19.1.2.3 Object.defineProperties(O, Properties)
                    defineProperties: $defineProperties,
                    // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
                    getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
                    // 19.1.2.7 Object.getOwnPropertyNames(O)
                    getOwnPropertyNames: $getOwnPropertyNames,
                    // 19.1.2.8 Object.getOwnPropertySymbols(O)
                    getOwnPropertySymbols: $getOwnPropertySymbols
                });

                // 24.3.2 JSON.stringify(value [, replacer [, space]])
                $JSON &&
                    $export(
                        $export.S +
                            $export.F *
                                (!USE_NATIVE ||
                                    $fails(function() {
                                        var S = $Symbol();
                                        // MS Edge converts symbol values to JSON as {}
                                        // WebKit converts symbol values to JSON as null
                                        // V8 throws on boxed symbols
                                        return _stringify([S]) != "[null]" || _stringify({ a: S }) != "{}" || _stringify(Object(S)) != "{}";
                                    })),
                        "JSON",
                        {
                            stringify: function stringify(it) {
                                var args = [it];
                                var i = 1;
                                var replacer, $replacer;
                                while (arguments.length > i) args.push(arguments[i++]);
                                $replacer = replacer = args[1];
                                if ((!isObject(replacer) && it === undefined) || isSymbol(it)) return; // IE8 returns string on undefined
                                if (!isArray(replacer))
                                    replacer = function(key, value) {
                                        if (typeof $replacer == "function") value = $replacer.call(this, key, value);
                                        if (!isSymbol(value)) return value;
                                    };
                                args[1] = replacer;
                                return _stringify.apply($JSON, args);
                            }
                        }
                    );

                // 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
                $Symbol[PROTOTYPE][TO_PRIMITIVE] || require("./_hide")($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
                // 19.4.3.5 Symbol.prototype[@@toStringTag]
                setToStringTag($Symbol, "Symbol");
                // 20.2.1.9 Math[@@toStringTag]
                setToStringTag(Math, "Math", true);
                // 24.3.3 JSON[@@toStringTag]
                setToStringTag(global.JSON, "JSON", true);
            },
            {
                "./_an-object": 6,
                "./_descriptors": 21,
                "./_enum-keys": 24,
                "./_export": 25,
                "./_fails": 27,
                "./_global": 32,
                "./_has": 33,
                "./_hide": 34,
                "./_is-array": 41,
                "./_is-object": 42,
                "./_library": 50,
                "./_meta": 51,
                "./_object-create": 55,
                "./_object-dp": 56,
                "./_object-gopd": 58,
                "./_object-gopn": 60,
                "./_object-gopn-ext": 59,
                "./_object-gops": 61,
                "./_object-keys": 64,
                "./_object-pie": 65,
                "./_property-desc": 69,
                "./_redefine": 71,
                "./_set-to-string-tag": 76,
                "./_shared": 78,
                "./_to-iobject": 85,
                "./_to-primitive": 88,
                "./_uid": 89,
                "./_wks": 94,
                "./_wks-define": 92,
                "./_wks-ext": 93
            }
        ],
        117: [
            function(require, module, exports) {
                "use strict";
                var global = require("./_global");
                var each = require("./_array-methods")(0);
                var redefine = require("./_redefine");
                var meta = require("./_meta");
                var assign = require("./_object-assign");
                var weak = require("./_collection-weak");
                var isObject = require("./_is-object");
                var validate = require("./_validate-collection");
                var NATIVE_WEAK_MAP = require("./_validate-collection");
                var IS_IE11 = !global.ActiveXObject && "ActiveXObject" in global;
                var WEAK_MAP = "WeakMap";
                var getWeak = meta.getWeak;
                var isExtensible = Object.isExtensible;
                var uncaughtFrozenStore = weak.ufstore;
                var InternalMap;

                var wrapper = function(get) {
                    return function WeakMap() {
                        return get(this, arguments.length > 0 ? arguments[0] : undefined);
                    };
                };

                var methods = {
                    // 23.3.3.3 WeakMap.prototype.get(key)
                    get: function get(key) {
                        if (isObject(key)) {
                            var data = getWeak(key);
                            if (data === true) return uncaughtFrozenStore(validate(this, WEAK_MAP)).get(key);
                            return data ? data[this._i] : undefined;
                        }
                    },
                    // 23.3.3.5 WeakMap.prototype.set(key, value)
                    set: function set(key, value) {
                        return weak.def(validate(this, WEAK_MAP), key, value);
                    }
                };

                // 23.3 WeakMap Objects
                var $WeakMap = (module.exports = require("./_collection")(WEAK_MAP, wrapper, methods, weak, true, true));

                // IE11 WeakMap frozen keys fix
                if (NATIVE_WEAK_MAP && IS_IE11) {
                    InternalMap = weak.getConstructor(wrapper, WEAK_MAP);
                    assign(InternalMap.prototype, methods);
                    meta.NEED = true;
                    each(["delete", "has", "get", "set"], function(key) {
                        var proto = $WeakMap.prototype;
                        var method = proto[key];
                        redefine(proto, key, function(a, b) {
                            // store frozen objects on internal weakmap shim
                            if (isObject(a) && !isExtensible(a)) {
                                if (!this._f) this._f = new InternalMap();
                                var result = this._f[key](a, b);
                                return key == "set" ? this : result;
                                // store all the rest on native weakmap
                            }
                            return method.call(this, a, b);
                        });
                    });
                }
            },
            {
                "./_array-methods": 8,
                "./_collection": 16,
                "./_collection-weak": 15,
                "./_global": 32,
                "./_is-object": 42,
                "./_meta": 51,
                "./_object-assign": 54,
                "./_redefine": 71,
                "./_validate-collection": 91
            }
        ],
        118: [
            function(require, module, exports) {
                "use strict";
                // https://github.com/tc39/Array.prototype.includes
                var $export = require("./_export");
                var $includes = require("./_array-includes")(true);

                $export($export.P, "Array", {
                    includes: function includes(el /* , fromIndex = 0 */) {
                        return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
                    }
                });

                require("./_add-to-unscopables")("includes");
            },
            { "./_add-to-unscopables": 3, "./_array-includes": 7, "./_export": 25 }
        ],
        119: [
            function(require, module, exports) {
                require("./_wks-define")("asyncIterator");
            },
            { "./_wks-define": 92 }
        ],
        120: [
            function(require, module, exports) {
                var $iterators = require("./es6.array.iterator");
                var getKeys = require("./_object-keys");
                var redefine = require("./_redefine");
                var global = require("./_global");
                var hide = require("./_hide");
                var Iterators = require("./_iterators");
                var wks = require("./_wks");
                var ITERATOR = wks("iterator");
                var TO_STRING_TAG = wks("toStringTag");
                var ArrayValues = Iterators.Array;

                var DOMIterables = {
                    CSSRuleList: true, // TODO: Not spec compliant, should be false.
                    CSSStyleDeclaration: false,
                    CSSValueList: false,
                    ClientRectList: false,
                    DOMRectList: false,
                    DOMStringList: false,
                    DOMTokenList: true,
                    DataTransferItemList: false,
                    FileList: false,
                    HTMLAllCollection: false,
                    HTMLCollection: false,
                    HTMLFormElement: false,
                    HTMLSelectElement: false,
                    MediaList: true, // TODO: Not spec compliant, should be false.
                    MimeTypeArray: false,
                    NamedNodeMap: false,
                    NodeList: true,
                    PaintRequestList: false,
                    Plugin: false,
                    PluginArray: false,
                    SVGLengthList: false,
                    SVGNumberList: false,
                    SVGPathSegList: false,
                    SVGPointList: false,
                    SVGStringList: false,
                    SVGTransformList: false,
                    SourceBufferList: false,
                    StyleSheetList: true, // TODO: Not spec compliant, should be false.
                    TextTrackCueList: false,
                    TextTrackList: false,
                    TouchList: false
                };

                for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
                    var NAME = collections[i];
                    var explicit = DOMIterables[NAME];
                    var Collection = global[NAME];
                    var proto = Collection && Collection.prototype;
                    var key;
                    if (proto) {
                        if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
                        if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
                        Iterators[NAME] = ArrayValues;
                        if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
                    }
                }
            },
            { "./_global": 32, "./_hide": 34, "./_iterators": 49, "./_object-keys": 64, "./_redefine": 71, "./_wks": 94, "./es6.array.iterator": 97 }
        ]
    },
    {},
    [1]
);
