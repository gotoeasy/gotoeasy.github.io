/* gotoEasy 0.1, (c) 2016 Zhang Ming, @license MIT (http://gotoeasy.github.io) */
!function(window, document) {
    function initOptionValues() {
        DEBUG = null == Options.debug ? 1 : Options.debug, DOM_ATTR_BIND = Options.domAttrBind || (Options.domAttrBind = "data-bind"), 
        SELECTOR_DATA_BIND = S_LEFT_ZKH + DOM_ATTR_BIND + S_RIGHT_ZKH, DATA_KEY_FN_ID = Options.dataKeyFnId || (Options.dataKeyFnId = "_$id"), 
        DATA_KEY_FN_PARENT = Options.dataKeyFnParent || (Options.dataKeyFnParent = "_$parent"), 
        DATA_KEY_FN_ROOT = Options.dataKeyFnRoot || (Options.dataKeyFnRoot = "_$root"), 
        DATA_KEY_FN_DATA = Options.dataKeyFnData || (Options.dataKeyFnData = "_$data"), 
        BIND_REF_ROOT = Options.bindRefRoot || (Options.bindRefRoot = "$root"), BIND_REF_PARENT = Options.bindRefParent || (Options.bindRefParent = "$parent"), 
        BIND_REF_DATA = Options.bindRefData || (Options.bindRefData = "$data"), BIND_KEY_FIELD = Options.bindKeyField || (Options.bindKeyField = "field"), 
        BIND_KEY_VALUE = Options.bindKeyValue || (Options.bindKeyValue = "value"), BIND_KEY_INNERTEXT = Options.bindKeyInnerText || (Options.bindKeyInnerText = "text"), 
        BIND_KEY_INNERHTML = Options.bindKeyInnerHtml || (Options.bindKeyInnerHtml = "html"), 
        BIND_KEY_OPTIONS = Options.bindKeyOptions || (Options.bindKeyOptions = "options"), 
        BIND_KEY_READONLY = Options.bindKeyReadonly || (Options.bindKeyReadonly = "readonly"), 
        BIND_KEY_DISABLED = Options.bindKeyDisabled || (Options.bindKeyDisabled = "disabled"), 
        BIND_KEY_VISIBLE = Options.bindKeyVisible || (Options.bindKeyVisible = "visible"), 
        BIND_KEY_CHECKED = Options.bindKeyChecked || (Options.bindKeyChecked = "checked"), 
        BIND_KEY_STYLE = Options.bindKeyStyle || (Options.bindKeyStyle = "style"), BIND_KEY_CLASS = Options.bindKeyClass || (Options.bindKeyClass = "class"), 
        BIND_KEY_FOREACH = Options.bindKeyForeach || (Options.bindKeyForeach = "foreach"), 
        BIND_KEY_WITH = Options.bindKeyWith || (Options.bindKeyWith = "with"), BIND_KEY_IF = Options.bindKeyIf || (Options.bindKeyIf = "if"), 
        BIND_KEY_CLICK = Options.bindKeyClick || (Options.bindKeyClick = "click"), EVENT_DATA_CHAGE = Options.eventDataChage || (Options.eventDataChage = "datachange"), 
        EVENT_UPDATE_VIEW = Options.eventUpdateView || (Options.eventUpdateView = "updaueview"), 
        UID_PREFIX_DATA = Options.uidPrefixData || (Options.uidPrefixData = "d"), UID_PREFIX_TEMPLATE = Options.uidPrefixTemplate || (Options.uidPrefixTemplate = "t");
    }
    function settings(opt) {
        return opt ? (extend(Options, opt), initOptionValues(), copyObject(Options)) : copyObject(Options);
    }
    function uid(prefix) {
        return uid[prefix] = uid[prefix] || 1, prefix + uid[prefix]++;
    }
    function startsWith(strSrc, strTest) {
        return strSrc.slice(0, strTest.length) === strTest;
    }
    function trim(str) {
        return str.replace(/(^\s*)|(\s*$)/g, "");
    }
    function nullToBlank(str) {
        return null == str ? "" : str;
    }
    function json(objOrStr) {
        return isObject(objOrStr) ? JSON.stringify(objOrStr) : JSON.parse(objOrStr);
    }
    function isArray(ary) {
        return Array.isArray && Array.isArray(ary) || ary instanceof Array || "[object Array]" == Object.prototype.toString.call(ary);
    }
    function isPlainObject(obj) {
        return obj && Object.prototype.toString.call(obj) === S_OBJECT_OBJECT;
    }
    function isObject(obj) {
        return null !== obj && typeof obj === S_OBJECT;
    }
    function isFunction(obj) {
        return typeof obj == S_FUNCTION && obj.constructor == Function;
    }
    function hasKey(plainObject, key) {
        return isPlainObject(plainObject) && void 0 !== plainObject[key];
    }
    function extend(to, from) {
        if (isPlainObject(from)) {
            Object.keys(to);
            for (var key in from) to[key] = from[key];
        }
    }
    function copyObject(obj) {
        var rs = {};
        for (var key in obj) rs[key] = obj[key];
        return rs;
    }
    function copyArray(ary, start, end) {
        var rs = [];
        if ((!start || 0 > start) && (start = 0), (!end || end > ary.length) && (end = ary.length), 
        start >= end) return rs;
        for (var i = start; end > i; i++) rs.push(ary[i]);
        return rs;
    }
    function each(ary, callback) {
        for (var i = 0; i < ary.length && callback(ary[i], i) !== !1; i++) ;
    }
    function tryApply(thisObj, func, args) {
        try {
            return func.apply(thisObj, args);
        } catch (e) {
            warn(arguments, e);
        }
    }
    function escapeHtml(str) {
        return new Option(str).innerHTML.replace(/"/g, "&quot;");
    }
    function warn() {
        executeConsole("warn", slice.call(arguments), DEBUG);
    }
    function error() {
        executeConsole("error", slice.call(arguments), 1);
    }
    function executeConsole(method, args, mode) {
        if (mode) {
            for (var params = [], i = 0; i < args.length; i++) params.push("_[" + i + "]");
            var body = "console." + method + "(";
            body += params.join(","), body += ")";
            try {
                new Function("_", body)(args);
            } catch (e) {
                console.warn(method, args, e);
            }
        }
    }
    function set(data, key, value, forceUpdate) {
        if (!data[DATA_KEY_FN_ID]) return void (data[key] = value);
        var oldValue = data[key];
        if (forceUpdate || isObject(value) || value !== oldValue) if (observe(value, data, key), 
        data[key] = value, trigger(EVENT_DATA_CHAGE, data, key, value, oldValue), isArray(data)) {
            var parent = data[DATA_KEY_FN_PARENT]();
            for (k in parent) parent[k] === data && notify(EVENT_UPDATE_VIEW, parent, k, value, oldValue);
        } else notify(EVENT_UPDATE_VIEW, data, key, value, oldValue);
    }
    function getData(dataId) {
        return _mapDataIdDataObject[dataId];
    }
    function getDataId(data) {
        return data && data[DATA_KEY_FN_ID]();
    }
    function observe(data, parent, key) {
        if (isObject(data)) if (defineData(data, parent), isPlainObject(data)) for (var k in data) observe(data[k], data, k); else if (isArray(data)) {
            for (var i = 0; i < data.length; i++) observe(data[i], data, i);
            data[DATA_KEY_FN_PARENT]() && defineArrayMethod(data, parent, key);
        }
    }
    function defineData(data, parent) {
        var dataid = data[DATA_KEY_FN_ID] ? getDataId(data) : uid(UID_PREFIX_DATA), parentid = parent ? getDataId(parent) : null, rootid = parent ? getDataId(parent[DATA_KEY_FN_ROOT]()) : dataid;
        _mapDataIdDataObject[dataid] = data, data[DATA_KEY_FN_ID] = function() {
            return dataid;
        }, data[DATA_KEY_FN_PARENT] = function() {
            return getData(parentid);
        }, data[DATA_KEY_FN_ROOT] = function() {
            return getData(rootid);
        }, data[DATA_KEY_FN_DATA] = function() {
            return this;
        };
    }
    function defineArrayMethod(ary, parent, key) {
        ary.x || (each([ "push", "pop", "shift", "unshift", "splice", "sort", "reverse" ], function(fnName) {
            var method = ary[fnName];
            ary[fnName] = function() {
                var oldLength = ary.length, result = method.apply(ary, arguments);
                if ("push" == fnName) for (var i = oldLength; result > i; i++) observe(ary[i], ary, i); else if ("unshift" == fnName) for (var i = 0; result - oldLength > i; i++) observe(ary[i], ary, i);
                return trigger(EVENT_DATA_CHAGE + " " + EVENT_UPDATE_VIEW, parent, key, ary), result;
            };
        }), ary.x = 1);
    }
    function getBindValue(data, bindText, fields, isEvent) {
        if (hasKey(data, bindText)) return fields && fields.push(getDataId(data) + "-" + bindText), 
        data[bindText];
        var fnKey = getDataId(data) + "#" + bindText;
        if (fields || !_fns[fnKey]) {
            var repls = [], body = bindText.replace(S_REG_QUOTE, function(match) {
                var key = "{" + repls.length + "}";
                return repls.push(match), key;
            });
            for (body = body.replace(S_REG_PROP, function(match) {
                if (/^\d+(\.\d+)?$/g.test(match) || S_IGNORE_KEY.indexOf(match) >= 0 || startsWith(match, "]")) return match;
                if (match = match.split(BIND_REF_ROOT).join(DATA_KEY_FN_ROOT + "()"), match = match.split(BIND_REF_PARENT).join(DATA_KEY_FN_PARENT + "()"), 
                match = match.split(BIND_REF_DATA).join(DATA_KEY_FN_DATA + "()"), fields) {
                    var field = getDataFieldCss(data, "return _." + match);
                    field && fields.push(field);
                }
                return "_." + match;
            }), i = 0; i < repls.length; i++) body = body.replace("{" + i + "}", repls[i]);
            _fns[fnKey] = _fns[fnKey] || createFunction("return " + body);
        }
        if (isEvent) return _fns[fnKey];
        if (!fields) try {
            return _fns[fnKey](data);
        } catch (e) {
            return void error("#2", _fns[fnKey], data, bindText, e);
        }
    }
    function createFunction(body) {
        try {
            return new Function("_", body);
        } catch (e) {
            error("#1", body);
        }
    }
    function getDataFieldCss(data, body) {
        var fun = createFunction(body);
        if (fun) {
            var value = fun(data);
            if (body.indexOf(S_DOT) < 0) return getDataId(data) + "-" + body;
            var ary = body.split(S_DOT), lastField = ary.pop();
            if (isObject(value)) return getDataId(value[DATA_KEY_FN_PARENT]()) + "-" + lastField;
            if (fun = createFunction(ary.join(S_DOT))) return getDataId(fun(data)) + "-" + lastField;
        }
    }
    function getElementBindInfo(el, data, cssFields) {
        if (el[S_ELEMENT_PROP_BIND_INFO]) return json(el[S_ELEMENT_PROP_BIND_INFO]);
        var bindInfo = parseBindInfo(el);
        if (!bindInfo) return 0;
        if (bindInfo[S_BIND_INFO_PROP_DATA_ID] = getDataId(data), cssFields) for (var key in bindInfo) if (key != S_BIND_INFO_PROP_DATA_ID && key != BIND_KEY_FIELD && key != BIND_KEY_CLICK) if (key == BIND_KEY_STYLE || key == BIND_KEY_CLASS) for (var kv, kvs = bindInfo[key].split(";"), i = 0; i < kvs.length; i++) {
            kv = kvs[i].split("=");
            var fields = [];
            getBindValue(data, kv[1], fields);
            for (var j = 0; j < fields.length; j++) cssFields.push(fields[j]);
        } else {
            var fields = [];
            getBindValue(data, bindInfo[key], fields);
            for (var i = 0; i < fields.length; i++) cssFields.push(fields[i]);
        }
        return bindInfo;
    }
    function parseBindInfo(el) {
        var kvs, kv, rs = {}, bindText = getAttr(el, DOM_ATTR_BIND);
        if (!bindText) return null;
        var tmpTxt = bindText.replace(/,{1}\s*\w+\s*:{1}/g, function(match) {
            return "\n" + match.substring(1);
        });
        return kvs = tmpTxt.split("\n"), each(kvs, function(item) {
            kv = item.split(S_COLON), rs[trim(kv[0]).toLowerCase()] = trim(item.substring(item.indexOf(S_COLON) + 1));
        }), rs;
    }
    function defineElement(el, data) {
        var cssFields = [], bindInfo = getElementBindInfo(el, data, cssFields);
        if (each(cssFields, function(css) {
            addClass(el, css);
        }), !bindInfo[BIND_KEY_FIELD]) {
            var field = bindInfo[BIND_KEY_VALUE] || bindInfo[BIND_KEY_INNERTEXT];
            void 0 !== data[field] && (bindInfo[BIND_KEY_FIELD] = field);
        }
        el[S_ELEMENT_PROP_BIND_INFO] = json(bindInfo);
    }
    function parseTemplate(dom, selector) {
        for (var els = dom.querySelectorAll(selector || SELECTOR_DATA_BIND), tmplKeys = getRenderKeys(S_RENDER_TEMPLATE), tmplSels = [], i = 0; i < tmplKeys.length; i++) tmplSels.push(S_LEFT_ZKH + DOM_ATTR_BIND + S_XING_EQ + tmplKeys[i] + S_RIGHT_ZKH);
        each(els, function(el) {
            var bindInfo = parseBindInfo(el), hasTemplate = 0;
            for (var key in bindInfo) tmplKeys.indexOf(key) >= 0 && (hasTemplate = 1);
            if (hasTemplate) {
                for (var i = 0; i < tmplKeys.length; i++) hasBindSubTemplate(el, tmplSels[i], tmplKeys[i]) && parseTemplate(el);
                var template = document.createDocumentFragment(), childs = copyArray(el.childNodes);
                each(childs, function(child) {
                    template.appendChild(child.cloneNode(!0));
                });
                var templateid = uid(UID_PREFIX_TEMPLATE);
                document[templateid] = template, setAttr(el, S_ELEMENT_ATTR_TEMPLATE, templateid), 
                removeChilds(el);
            }
        });
    }
    function hasBindSubTemplate(el, selector, bindKey) {
        for (var els = el.querySelectorAll(selector), i = 0; i < els.length; i++) {
            var bindInfo = parseBindInfo(els[i]);
            if (bindInfo[bindKey]) return !0;
        }
        return !1;
    }
    function parseHtml(data, dom) {
        parseTemplate(dom || document);
        var els = (dom || document).querySelectorAll(SELECTOR_DATA_BIND);
        each(els, function(el) {
            defineElement(el, data);
        });
    }
    function showHtml(dom) {
        var els = (dom || document).querySelectorAll(SELECTOR_DATA_BIND);
        each(els, function(el) {
            elementRender(el);
        });
    }
    function putRender(key, func, order, template, eventName, params) {
        var render = {};
        render[S_RENDER_KEY] = key, render[S_RENDER_FN] = func, render[S_RENDER_ORDER] = order || 0, 
        render[S_RENDER_TEMPLATE] = !!template, render[S_RENDER_EVENT] = eventName, _renderMap[key] = render;
    }
    function getRenderKeys(type) {
        var key, rs = [];
        for (key in _renderMap) type ? _renderMap[key][type] && rs.push(key) : rs.push(key);
        return rs;
    }
    function installRenders() {
        _renderMap || (_renderMap = {}, putRender("*", function(el, prop, val) {
            setAttr(el, prop, escapeHtml(nullToBlank(val)));
        }), putRender(BIND_KEY_VALUE, function(el, data, bindText) {
            var val = getBindValue(data, bindText);
            el.value = nullToBlank(val), _renderMap[BIND_KEY_FIELD][S_RENDER_FN](el, data, bindText, val);
        }), putRender(BIND_KEY_READONLY, function(el, data, bindText) {
            var val = getBindValue(data, bindText);
            el.readOnly = !!val;
        }), putRender(BIND_KEY_DISABLED, function(el, data, bindText) {
            var val = getBindValue(data, bindText);
            el.disabled = !!val;
        }, 5), putRender(BIND_KEY_CHECKED, function(el, data, bindText) {
            var val = getBindValue(data, bindText);
            isArray(val) ? el.checked = val.indexOf(el.value) >= 0 : el.checked = val == el.value, 
            _renderMap[BIND_KEY_FIELD][S_RENDER_FN](el, data, bindText, val);
        }), putRender(BIND_KEY_VISIBLE, function(el, data, bindText) {
            var val = getBindValue(data, bindText);
            editStyle(el, [ S_VISIBILITY, S_DISPLAY ]), val ? el.style.visibility = S_VISIBLE : el.style.display = S_NONE;
        }, 5), putRender(BIND_KEY_STYLE, function(el, data, bindText) {
            var keys = [], txts = [];
            if (parseSubBindText(bindText, keys, txts), keys.length) {
                for (var styles = [], i = 0; i < keys.length; i++) styles.push(keys[i] + S_COLON + getBindValue(data, txts[i]));
                editStyle(el, keys, styles.join(S_SEMICOLON));
            }
        }, 5), putRender(BIND_KEY_CLASS, function(el, data, bindText) {
            var keys = [], txts = [];
            if (parseSubBindText(bindText, keys, txts), keys.length) for (var i = 0; i < keys.length; i++) getBindValue(data, txts[i]) ? addClass(el, keys[i]) : removeClass(el, keys[i]);
        }), putRender(BIND_KEY_INNERTEXT, function(el, data, bindText) {
            var val = getBindValue(data, bindText);
            el.textContent = null == val ? S_BLANK : val;
        }), putRender(BIND_KEY_INNERHTML, function(el, data, bindText) {
            var val = getBindValue(data, bindText);
            el.innerHTML = null == val ? S_BLANK : val;
        }), putRender(BIND_KEY_FIELD, function(el, data, bindText, bindValue) {
            var field = getElementBindInfo(el)[BIND_KEY_FIELD];
            field && field != bindText && set(data, field, bindValue);
        }), putRender(BIND_KEY_OPTIONS, function(el, data, bindText) {
            var val = getBindValue(data, bindText);
            if (el.length = 0, null != val && !isPlainObject(val)) {
                var opts = el.options;
                isArray(val) || (val = val.split(S_SEMICOLON).join(S_COMMA).split(S_COMMA)), each(val, function(option) {
                    if (isPlainObject(option)) opts[opts.length] = new Option(option.text, option.value); else if (null == option) opts[opts.length] = new Option(S_BLANK, S_BLANK); else {
                        var kv = option.split(S_COLON);
                        opts[opts.length] = new Option(kv.length > 1 ? kv[1] : option, kv[0]);
                    }
                });
            }
        }, 5), putRender(BIND_KEY_CLICK, null, 0, 0, "click"), putRender(BIND_KEY_FOREACH, function(el, data, bindText) {
            var val = getBindValue(data, bindText);
            removeChilds(el), val && val.length && el.appendChild(createFragmentByTemplate(val, el, !0));
        }, 7, 1), putRender(BIND_KEY_WITH, function(el, data, bindText) {
            var val = getBindValue(data, bindText);
            removeChilds(el), el.appendChild(createFragmentByTemplate(val, el));
        }, 8, 1), putRender(BIND_KEY_IF, function(el, data, bindText) {
            var val = getBindValue(data, bindText);
            return removeChilds(el), val ? void el.appendChild(createFragmentByTemplate(data, el)) : !1;
        }, 9, 1));
    }
    function parseSubBindText(bindText, keys, txts) {
        var i, kv, kvs = bindText.split(S_SEMICOLON);
        for (i = 0; i < kvs.length; i++) kv = kvs[i].split(S_EQUAL), 2 == kv.length && (keys.push(trim(kv[0])), 
        txts.push(trim(kv[1])));
    }
    function editStyle(el, delStyleNames, addStyles) {
        var rs = [], style = getAttr(el, S_STYLE);
        if (style) {
            var keys = [], txts = [];
            parseSubBindText(style, keys, txts);
            for (var i = 0; i < keys.length; i++) delStyleNames.indexOf(k) < 0 && rs.push(keys[i] + S_COLON + txts[i]);
            return addStyles && rs.push(addStyles), style = rs.join(S_SEMICOLON), setAttr(el, S_STYLE, style), 
            style;
        }
    }
    function createFragmentByTemplate(data, el, foreach) {
        var rs;
        return foreach ? (rs = document.createDocumentFragment(), isArray(data) && data.length > 0 && each(data, function(dt) {
            if (dt) {
                for (var tbody, fragment = createFragmentByTemplate(dt, el), i = 0; i < fragment.childNodes.length; i++) fragment.childNodes[i].tagName == S_TBODY && (tbody = fragment.childNodes[i]);
                if (tbody) for (var i = 0; i < tbody.childNodes.length; i++) rs.appendChild(tbody.childNodes[i]); else rs.appendChild(fragment);
            }
        })) : (rs = document[getAttr(el, S_ELEMENT_ATTR_TEMPLATE)].cloneNode(!0), each(rs.querySelectorAll(SELECTOR_DATA_BIND), function(node) {
            defineElement(node, data), elementRender(node);
        })), rs;
    }
    function elementRender(el, bindInfo, dataField) {
        if (bindInfo = bindInfo || getElementBindInfo(el), !_renders) {
            _renders = [];
            for (k in _renderMap) _renders.push(_renderMap[k]);
            _renders.sort(function(o1, o2) {
                return o1[S_RENDER_ORDER] == o2[S_RENDER_ORDER] ? 0 : o1[S_RENDER_ORDER] < o2[S_RENDER_ORDER] ? 1 : -1;
            });
        }
        each(_renders, function(render) {
            function functionOfBind() {
                try {
                    var fn = getBindValue(data, bindText, 0, 1);
                    fn.call(data, data);
                } catch (e) {
                    error("#3", el, bindText, data, e);
                }
            }
            var bindText = bindInfo[render[S_RENDER_KEY]], data = getData(bindInfo[S_BIND_INFO_PROP_DATA_ID]);
            if (bindText) {
                if (dataField && bindText.indexOf(dataField) < 0) return;
                render[S_RENDER_EVENT] ? addEvent(render[S_RENDER_EVENT], functionOfBind, el) : render[S_RENDER_FN](el, data, bindText);
            }
        });
        for (var bindKey in bindInfo) if (!_renderMap[bindKey] && bindKey != S_BIND_INFO_PROP_DATA_ID) {
            var bindText = bindInfo[bindKey];
            if (!(dataField && bindText.indexOf(dataField) < 0)) {
                var data = getData(bindInfo[S_BIND_INFO_PROP_DATA_ID]), value = getBindValue(data, bindText);
                _renderMap[S_STAR][S_RENDER_FN](el, bindKey, value);
            }
        }
    }
    function updateviewEventListener(data, key) {
        for (var els = document.querySelectorAll(S_DOT + getDataId(data) + S_MINUS + key), i = 0; i < els.length; i++) elementRender(els[i], S_BLANK, key);
    }
    function datachangeEventListener(e) {
        var el = e.target, bindInfo = getElementBindInfo(el);
        if (bindInfo) {
            var field = bindInfo[BIND_KEY_FIELD] || bindInfo[BIND_KEY_VALUE] || bindInfo[BIND_KEY_CHECKED];
            if (null != field) {
                var data = getData(bindInfo[S_BIND_INFO_PROP_DATA_ID]), value = data[field];
                "checkbox" == el.type ? isArray(value) ? el.checked ? value.indexOf(el.value) < 0 && value.push(el.value) : value.indexOf(el.value) >= 0 && value.splice(value.indexOf(el.value), 1) : value = el.checked ? el.value : S_BLANK : value = el.value, 
                set(data, field, value);
            }
        }
    }
    function addEvent(ev, fun, el) {
        el.addEventListener ? el.addEventListener(ev, fun, !1) : el.attachEvent ? el.attachEvent("on" + ev, fun) : el["on" + ev] = fun;
    }
    function addClass(el, name) {
        if ($isIE) if (el.className) {
            var ary = el.className.split(" ");
            if (ary.indexOf(name) >= 0) return;
            ary.push(name), el.className = ary.join(" ");
        } else el.className = name; else el.classList.contains(name) || el.classList.add(name);
    }
    function removeClass(el, name) {
        if ($isIE) {
            var ary = el.className.split(" "), idx = ary.indexOf(name);
            idx >= 0 && (ary.slice(idx, 1), el.className = ary.join(" "));
        } else el.classList.remove(name);
    }
    function setAttr(el, name, value) {
        return el.setAttribute(name, value);
    }
    function getAttr(el, name) {
        return el.getAttribute(name);
    }
    function removeChilds(el) {
        try {
            el.innerHTML = "";
        } catch (e) {
            for (;el.firstChild; ) el.removeChild(el.firstChild);
        }
    }
    function on(eventNames, fn) {
        eventNames && isFunction(fn) && eventNames.replace(REG_EVENT, function(name, pos) {
            (_callbacks[name] = _callbacks[name] || []).push(fn);
        });
    }
    function off(eventNames, fn) {
        eventNames && "*" != eventNames ? fn ? eventNames.replace(REG_EVENT, function(name) {
            for (var fns = _callbacks[name], i = 0; i < fns.length; i++) fn === fns[i] && fns.splice(i--, 1);
        }) : eventNames.replace(REG_EVENT, function(name) {
            _callbacks[name] = [];
        }) : _callbacks = {};
    }
    function trigger(eventNames, eventObj) {
        var args = slice.call(arguments, 1);
        eventNames.replace(REG_EVENT, function(name) {
            for (var fns = _callbacks[name] || [], i = 0; i < fns.length; i++) tryApply(eventObj, fns[i], args);
        });
    }
    function notify(delay, eventNames, eventObj) {
        var args = (isNaN(delay) ? 0 : delay, isNaN(delay) ? slice.call(arguments, 0) : slice.call(arguments, 1));
        async(function() {
            trigger.apply(null, args);
        }, delay);
    }
    function bind(data, selector, opt) {
        opt && settings(opt), installRenders(), observe(data);
        var dom = selector ? document.querySelector(selector) : document;
        parseHtml(data, dom), showHtml(dom), on(EVENT_UPDATE_VIEW, updateviewEventListener), 
        addEvent("change", datachangeEventListener, document);
    }
    var S_LEFT_ZKH = "[", S_XING_EQ = "*=", S_RIGHT_ZKH = "]", S_OBJECT_OBJECT = "[object Object]", S_FUNCTION = "function", S_OBJECT = "object", S_VISIBILITY = "visibility", S_DISPLAY = "display", S_COMMA = ",", S_COLON = ":", S_DOT = ".", S_SEMICOLON = ";", S_EQUAL = "=", S_BLANK = "", S_STYLE = "style", S_VISIBLE = "visible", S_NONE = "none", S_TBODY = "TBODY", S_STAR = "*", S_MINUS = "-", $isIE = window == document && document != window;
    "number" == typeof window.screenX;
    Array.prototype.indexOf || (Array.prototype.indexOf = function(item, start) {
        for (var i = start || 0; i < this.length; i++) if (this[i] === item) return i;
        return -1;
    });
    var DEBUG, DOM_ATTR_BIND, SELECTOR_DATA_BIND, DATA_KEY_FN_ID, DATA_KEY_FN_PARENT, DATA_KEY_FN_ROOT, DATA_KEY_FN_DATA, BIND_REF_ROOT, BIND_REF_PARENT, BIND_REF_DATA, BIND_KEY_FIELD, BIND_KEY_VALUE, BIND_KEY_INNERTEXT, BIND_KEY_INNERHTML, BIND_KEY_OPTIONS, BIND_KEY_READONLY, BIND_KEY_DISABLED, BIND_KEY_VISIBLE, BIND_KEY_CHECKED, BIND_KEY_STYLE, BIND_KEY_CLASS, BIND_KEY_FOREACH, BIND_KEY_WITH, BIND_KEY_IF, BIND_KEY_CLICK, EVENT_DATA_CHAGE, EVENT_UPDATE_VIEW, UID_PREFIX_DATA, UID_PREFIX_TEMPLATE, Options = {}, S_BIND_INFO_PROP_DATA_ID = "$d";
    initOptionValues();
    var _renderMap, _renders, slice = Array.prototype.slice, async = setTimeout, _mapDataIdDataObject = {}, S_REG_QUOTE = /(['"])[^'"]*\1/g, S_REG_PROP = /([\w$_\.\[\]]+)/g, _fns = {}, S_ELEMENT_PROP_BIND_INFO = "_bindInfo", S_ELEMENT_ATTR_TEMPLATE = "_template", S_IGNORE_KEY = "true false null alert this _ if else".split(" "), S_RENDER_KEY = "k", S_RENDER_FN = "f", S_RENDER_ORDER = "o", S_RENDER_TEMPLATE = "t", S_RENDER_EVENT = "e", REG_EVENT = /\S+/g, _callbacks = {};
    window.addEventListener("beforeunload", function(event) {
        _mapDataIdDataObject = null, _renderMap = null, _renders = null, _callbacks = null, 
        _fns = null;
    });
    var api = {};
    api.settings = settings, api.bind = bind, api.set = set, api.on = on, api.off = off, 
    api.notify = notify, "object" == typeof exports ? module.exports = api : "function" == typeof define && define.amd ? define(function() {
        return api;
    }) : window.gotoEasy = window.$easy = api;
}(window, document);