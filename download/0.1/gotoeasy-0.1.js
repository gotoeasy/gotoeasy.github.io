/*!
* gotoEasy 0.1 (http://gotoeasy.github.io)
* (c) 2016 Zhang Ming
* Licensed under the MIT license
*/
(function(window, document) {
	var S_LEFT_ZKH = '[';
	var S_XING_EQ = '*=';
	var S_RIGHT_ZKH = ']';
	var S_OBJECT_OBJECT = '[object Object]';
	var S_FUNCTION = 'function';
	var S_OBJECT = 'object';
	var S_VISIBILITY = 'visibility';
	var S_DISPLAY = 'display';
	var S_COMMA = ',';
	var S_COLON = ':';
	var S_DOT = '.';
	var S_SEMICOLON = ';';
	var S_EQUAL = '=';
	var S_BLANK = '';
	var S_STYLE = 'style';
	var S_CLASS = 'class';
	var S_DISABLED = 'disabled';
	var S_READONLY = 'readonly';
	var S_CHECKED = 'checked';
	var S_VISIBLE = 'visible';
	var S_NONE = 'none';
	var S_TBODY = 'TBODY';
	var S_STAR = '*';
	var S_MINUS = '-';
	var $isIE = (window == document && document != window);
	var $isModernBrowser = (typeof window.screenX === "number");
	if (!Array.prototype.indexOf) {
		Array.prototype.indexOf = function(item, start) {
			for (var i = start || 0; i < this.length; i++) {
				if (this[i] === item) return i
			}
			return -1
		}
	}
	var Options = {};
	var DEBUG;
	var DOM_ATTR_BIND;
	var SELECTOR_DATA_BIND;
	var DATA_KEY_FN_ID;
	var DATA_KEY_FN_PARENT;
	var DATA_KEY_FN_ROOT;
	var DATA_KEY_FN_DATA;
	var BIND_REF_ROOT;
	var BIND_REF_PARENT;
	var BIND_REF_DATA;
	var BIND_KEY_FIELD;
	var BIND_KEY_VALUE;
	var BIND_KEY_INNERTEXT;
	var BIND_KEY_INNERHTML;
	var BIND_KEY_OPTIONS;
	var BIND_KEY_READONLY;
	var BIND_KEY_DISABLED;
	var BIND_KEY_VISIBLE;
	var BIND_KEY_CHECKED;
	var BIND_KEY_STYLE;
	var BIND_KEY_CLASS;
	var BIND_KEY_FOREACH;
	var BIND_KEY_WITH;
	var BIND_KEY_IF;
	var BIND_KEY_CLICK;
	var EVENT_DATA_CHAGE;
	var EVENT_UPDATE_VIEW;
	var UID_PREFIX_DATA;
	var UID_PREFIX_TEMPLATE;
	var S_BIND_INFO_PROP_DATA_ID = '$d';
	var S_BIND_INFO_PROP_TEMPLATE_ID = '$t';
	initOptionValues();

	function initOptionValues() {
		DEBUG = (Options.debug == null ? 1 : Options.debug);
		DOM_ATTR_BIND = Options.domAttrBind || 'data-bind';
		SELECTOR_DATA_BIND = S_LEFT_ZKH + DOM_ATTR_BIND + S_RIGHT_ZKH;
		DATA_KEY_FN_ID = Options.dataKeyFnId || '_$id';
		DATA_KEY_FN_PARENT = Options.dataKeyFnParent || '_$parent';
		DATA_KEY_FN_ROOT = Options.dataKeyFnRoot || '_$root';
		DATA_KEY_FN_DATA = Options.dataKeyFnData || '_$data';
		BIND_REF_ROOT = Options.bindRefRoot || '$root';
		BIND_REF_PARENT = Options.bindRefParent || '$parent';
		BIND_REF_DATA = Options.bindRefData || '$data';
		BIND_KEY_FIELD = Options.bindKeyField || 'field';
		BIND_KEY_VALUE = Options.bindKeyValue || 'value';
		BIND_KEY_INNERTEXT = Options.bindKeyInnerText || 'text';
		BIND_KEY_INNERHTML = Options.bindKeyInnerHtml || 'html';
		BIND_KEY_OPTIONS = Options.bindKeyOptions || 'options';
		BIND_KEY_READONLY = Options.bindKeyReadonly || 'readonly';
		BIND_KEY_DISABLED = Options.bindKeyDisabled || 'disabled';
		BIND_KEY_VISIBLE = Options.bindKeyVisible || 'visible';
		BIND_KEY_CHECKED = Options.bindKeyChecked || 'checked';
		BIND_KEY_STYLE = Options.bindKeyStyle || 'style';
		BIND_KEY_CLASS = Options.bindKeyClass || 'class';
		BIND_KEY_FOREACH = Options.bindKeyForeach || 'foreach';
		BIND_KEY_WITH = Options.bindKeyWith || 'with';
		BIND_KEY_IF = Options.bindKeyIf || 'if';
		BIND_KEY_CLICK = Options.bindKeyClick || 'click';
		EVENT_DATA_CHAGE = Options.eventDataChage || 'datachange';
		EVENT_UPDATE_VIEW = Options.eventUpdateView || 'updaueview';
		UID_PREFIX_DATA = Options.uidPrefixData || 'd';
		UID_PREFIX_TEMPLATE = Options.uidPrefixTemplate || 't'
	}
	function settings(opt) {
		if (!opt) return copyObject(Options);
		overwrite(Options, opt);
		initOptionValues();
		return copyObject(Options)
	}
	var slice = Array.prototype.slice;
	var async = setTimeout;

	function uid(prefix) {
		uid[prefix] = uid[prefix] || 1;
		return prefix + uid[prefix]++
	}
	function startsWith(strSrc, strTest) {
		return strSrc.slice(0, strTest.length) === strTest
	}
	function trim(str) {
		return str.replace(/(^\s*)|(\s*$)/g, '')
	}
	function nullToBlank(str) {
		return str == null ? '' : str
	}
	function json(objOrStr) {
		return isObject(objOrStr) ? JSON.stringify(objOrStr) : JSON.parse(objOrStr)
	}
	function isArray(ary) {
		return (Array.isArray && Array.isArray(ary)) || ary instanceof Array || Object.prototype.toString.call(ary) == '[object Array]'
	}
	function isPlainObject(obj) {
		return obj && Object.prototype.toString.call(obj) === S_OBJECT_OBJECT
	}
	function isObject(obj) {
		return obj !== null && typeof obj === S_OBJECT
	}
	function isFunction(obj) {
		return (typeof obj == S_FUNCTION) && obj.constructor == Function
	}
	function hasKey(plainObject, key) {
		return isPlainObject(plainObject) && plainObject[key] !== undefined
	}
	function extend(to, from) {
		if (!isPlainObject(from)) {
			return
		}
		var keys = Object.keys(to);
		for (var key in from) {
			to[key] = from[key]
		}
	}
	function overwrite(to, from) {
		if (!isPlainObject(from)) {
			return
		}
		var keys = Object.keys(to);
		for (var key in from) {
			if (keys.indexOf(key) >= 0) {
				to[key] = from[key]
			}
		}
	}
	function copyObject(obj) {
		var rs = {};
		for (var key in obj) {
			rs[key] = obj[key]
		}
		return rs
	}
	function copyArray(ary, start, end) {
		var rs = [];
		if (!start || start < 0) {
			start = 0
		}
		if (!end || end > ary.length) {
			end = ary.length
		}
		if (start >= end) {
			return rs
		}
		for (var i = start; i < end; i++) {
			rs.push(ary[i])
		}
		return rs
	}
	function each(ary, callback) {
		for (var i = 0; i < ary.length; i++) {
			if (callback(ary[i], i) === false) {
				break
			}
		}
	}
	function tryApply(thisObj, func, args) {
		try {
			return func.apply(thisObj, args)
		} catch (e) {
			warn(arguments, e)
		}
	}
	function escapeHtml(str) {
		return new Option(str).innerHTML.replace(/"/g, "&quot;")
	}
	function log() {
		executeConsole('log', slice.call(arguments), DEBUG)
	}
	function info() {
		executeConsole('info', slice.call(arguments), DEBUG)
	}
	function warn() {
		executeConsole('warn', slice.call(arguments), DEBUG)
	}
	function error() {
		executeConsole('error', slice.call(arguments), 1)
	}
	function executeConsole(method, args, mode) {
		if (mode) {
			var params = [];
			for (var i = 0; i < args.length; i++) {
				params.push('_[' + i + ']')
			}
			var body = 'console.' + method + '(';
			body += params.join(',');
			body += ')';
			try {
				new Function("_", body)(args)
			} catch (e) {
				console.warn(method, args, e)
			}
		}
	}
	var _mapDataIdDataObject = {};
	var S_REG_QUOTE = /(['"])[^'"]*\1/g;
	var S_REG_PROP = /([\w$_\.\[\]]+)/g;
	var _fns = {};
	var S_ELEMENT_PROP_BIND_INFO = '_bindInfo';
	var S_ELEMENT_ATTR_TEMPLATE = '_template';

	function set(data, key, value, forceUpdate) {
		if (!data[DATA_KEY_FN_ID]) {
			data[key] = value;
			return
		}
		var oldValue = data[key];
		if (!forceUpdate && !isObject(value) && value === oldValue) return;
		observe(value, data, key);
		data[key] = value;
		trigger(EVENT_DATA_CHAGE, data, key, value, oldValue);
		if (isArray(data)) {
			var parent = data[DATA_KEY_FN_PARENT]();
			for (k in parent) {
				if (parent[k] === data) {
					notify(EVENT_UPDATE_VIEW, parent, k, value, oldValue)
				}
			}
		} else {
			notify(EVENT_UPDATE_VIEW, data, key, value, oldValue)
		}
	}
	function getData(dataId) {
		return _mapDataIdDataObject[dataId]
	}
	function getDataId(data) {
		return data && data[DATA_KEY_FN_ID]()
	}
	function get(data, key, defaultValue) {
		var value = data[key];
		return value === undefined ? defaultValue : value
	}
	function observe(data, parent, key) {
		if (isObject(data)) {
			defineData(data, parent);
			if (isPlainObject(data)) {
				for (var k in data) {
					observe(data[k], data, k)
				}
			} else if (isArray(data)) {
				for (var i = 0; i < data.length; i++) {
					observe(data[i], data, i)
				}
				if (!data[DATA_KEY_FN_PARENT]()) {} else {
					defineArrayMethod(data, parent, key)
				}
			}
		}
	};

	function defineData(data, parent) {
		var dataid = data[DATA_KEY_FN_ID] ? getDataId(data) : uid(UID_PREFIX_DATA);
		var parentid = parent ? getDataId(parent) : null;
		var rootid = parent ? getDataId(parent[DATA_KEY_FN_ROOT]()) : dataid;
		_mapDataIdDataObject[dataid] = data;
		data[DATA_KEY_FN_ID] = function() {
			return dataid
		};
		data[DATA_KEY_FN_PARENT] = function() {
			return getData(parentid)
		};
		data[DATA_KEY_FN_ROOT] = function() {
			return getData(rootid)
		};
		data[DATA_KEY_FN_DATA] = function() {
			return this
		}
	}
	function defineArrayMethod(ary, parent, key) {
		if (ary.x) return;
		each(['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'], function(fnName) {
			var method = ary[fnName];
			ary[fnName] = function() {
				var oldLength = ary.length;
				var result = method.apply(ary, arguments);
				if (fnName == 'push') {
					for (var i = oldLength; i < result; i++) {
						observe(ary[i], ary, i)
					}
				} else if (fnName == 'unshift') {
					for (var i = 0; i < result - oldLength; i++) {
						observe(ary[i], ary, i)
					}
				} else {}
				trigger(EVENT_DATA_CHAGE + ' ' + EVENT_UPDATE_VIEW, parent, key, ary);
				return result
			}
		});
		ary.x = 1
	}
	var S_IGNORE_KEY = 'true false null alert this _ if else'.split(' ');

	function getBindValue(data, bindText, fields, isEvent) {
		if (hasKey(data, bindText)) {
			fields && fields.push(getDataId(data) + '-' + bindText);
			return data[bindText]
		}
		var fnKey = getDataId(data) + '#' + bindText;
		if (fields || !_fns[fnKey]) {
			var repls = [];
			var body = bindText.replace(S_REG_QUOTE, function(match) {
				var key = '{' + repls.length + "}";
				repls.push(match);
				return key
			});
			body = body.replace(S_REG_PROP, function(match) {
				if (/^\d+(\.\d+)?$/g.test(match) || S_IGNORE_KEY.indexOf(match) >= 0 || startsWith(match, ']')) {
					return match
				} else {
					match = match.split(BIND_REF_ROOT).join(DATA_KEY_FN_ROOT + '()');
					match = match.split(BIND_REF_PARENT).join(DATA_KEY_FN_PARENT + '()');
					match = match.split(BIND_REF_DATA).join(DATA_KEY_FN_DATA + '()');
					if (fields) {
						var field = getDataFieldCss(data, "return _." + match);
						field && fields.push(field)
					}
					return '_.' + match
				}
			});
			for (i = 0; i < repls.length; i++) {
				body = body.replace("{" + i + "}", repls[i])
			}
			_fns[fnKey] = _fns[fnKey] || createFunction("return " + body)
		}
		if (isEvent) {
			return _fns[fnKey]
		}
		if (!fields) {
			try {
				return _fns[fnKey](data)
			} catch (e) {
				error('#2', _fns[fnKey], data, bindText, e);
				return undefined
			}
		}
	}
	function createFunction(body) {
		try {
			return new Function("_", body)
		} catch (e) {
			error('#1', body)
		}
	}
	function getDataFieldCss(data, body) {
		var fun = createFunction(body);
		if (!fun) return;
		var value = fun(data);
		if (body.indexOf(S_DOT) < 0) {
			return getDataId(data) + '-' + body
		}
		var ary = body.split(S_DOT);
		var lastField = ary.pop();
		if (isObject(value)) {
			return getDataId(value[DATA_KEY_FN_PARENT]()) + '-' + lastField
		} else {
			fun = createFunction(ary.join(S_DOT));
			if (!fun) return;
			return getDataId(fun(data)) + '-' + lastField
		}
	}
	function getElementBindInfo(el, data, cssFields) {
		if (el[S_ELEMENT_PROP_BIND_INFO]) {
			return json(el[S_ELEMENT_PROP_BIND_INFO])
		}
		var bindInfo = parseBindInfo(el);
		if (!bindInfo) {
			return 0
		}
		bindInfo[S_BIND_INFO_PROP_DATA_ID] = getDataId(data);
		if (cssFields) {
			for (var key in bindInfo) {
				if (key != S_BIND_INFO_PROP_DATA_ID && key != BIND_KEY_FIELD && key != BIND_KEY_CLICK) {
					if (key == BIND_KEY_STYLE || key == BIND_KEY_CLASS) {
						var kvs = bindInfo[key].split(';');
						for (var i = 0, kv; i < kvs.length; i++) {
							kv = kvs[i].split('=');
							var fields = [];
							getBindValue(data, kv[1], fields);
							for (var j = 0; j < fields.length; j++) {
								cssFields.push(fields[j])
							}
						}
					} else {
						var fields = [];
						getBindValue(data, bindInfo[key], fields);
						for (var i = 0; i < fields.length; i++) {
							cssFields.push(fields[i])
						}
					}
				}
			}
		}
		return bindInfo
	}
	function parseBindInfo(el) {
		var rs = {},
			kvs, kv, bindText = getAttr(el, DOM_ATTR_BIND);
		if (!bindText) {
			return null
		}
		var tmpTxt = bindText.replace(/,{1}\s*\w+\s*:{1}/g, function(match) {
			return '\n' + match.substring(1)
		});
		kvs = tmpTxt.split('\n');
		each(kvs, function(item) {
			kv = item.split(S_COLON);
			rs[trim(kv[0]).toLowerCase()] = trim(item.substring(item.indexOf(S_COLON) + 1))
		});
		return rs
	}
	function defineElement(el, data) {
		var cssFields = [];
		var bindInfo = getElementBindInfo(el, data, cssFields);
		each(cssFields, function(css) {
			addClass(el, css)
		});
		if (!bindInfo[BIND_KEY_FIELD]) {
			var field = bindInfo[BIND_KEY_VALUE] || bindInfo[BIND_KEY_INNERTEXT];
			if (data[field] !== undefined) {
				bindInfo[BIND_KEY_FIELD] = field
			}
		}
		el[S_ELEMENT_PROP_BIND_INFO] = json(bindInfo)
	}
	function parseTemplate(dom, selector) {
		var els = dom.querySelectorAll(selector || SELECTOR_DATA_BIND);
		var tmplKeys = getRenderKeys(S_RENDER_TEMPLATE);
		var tmplSels = [];
		for (var i = 0; i < tmplKeys.length; i++) {
			tmplSels.push(S_LEFT_ZKH + DOM_ATTR_BIND + S_XING_EQ + tmplKeys[i] + S_RIGHT_ZKH)
		}
		each(els, function(el) {
			var bindInfo = parseBindInfo(el);
			var hasTemplate = 0;
			for (var key in bindInfo) {
				if (tmplKeys.indexOf(key) >= 0) hasTemplate = 1
			}
			if (hasTemplate) {
				for (var i = 0; i < tmplKeys.length; i++) {
					if (hasBindSubTemplate(el, tmplSels[i], tmplKeys[i])) {
						parseTemplate(el)
					}
				}
				var template = document.createDocumentFragment();
				var childs = copyArray(el.childNodes);
				each(childs, function(child) {
					template.appendChild(child.cloneNode(true))
				});
				var templateid = uid(UID_PREFIX_TEMPLATE);
				document[templateid] = template;
				setAttr(el, S_ELEMENT_ATTR_TEMPLATE, templateid);
				removeChilds(el)
			}
		})
	}
	function hasBindSubTemplate(dom, selector, bindKey) {
		var els = dom.querySelectorAll(selector);
		for (var i = 0; i < els.length; i++) {
			var bindInfo = parseBindInfo(el);
			if (bindInfo[bindKey]) {
				return true
			}
		}
		return false
	}
	function parseHtml(data, dom) {
		parseTemplate((dom || document));
		var els = (dom || document).querySelectorAll(SELECTOR_DATA_BIND);
		each(els, function(el) {
			defineElement(el, data)
		})
	}
	function showHtml(dom) {
		var els = (dom || document).querySelectorAll(SELECTOR_DATA_BIND);
		each(els, function(el) {
			elementRender(el)
		})
	}
	var _renderMap = {},
		_renders;
	var S_RENDER_KEY = "k";
	var S_RENDER_FN = "f";
	var S_RENDER_ORDER = "o";
	var S_RENDER_TEMPLATE = "t";
	var S_RENDER_EVENT = "e";
	var S_RENDER_PARAMS = "p";

	function putRender(key, func, order, template, event, params) {
		var render = {};
		render[S_RENDER_KEY] = key;
		render[S_RENDER_FN] = func;
		render[S_RENDER_ORDER] = order || 0;
		render[S_RENDER_TEMPLATE] = !! template;
		render[S_RENDER_EVENT] = !! event;
		_renderMap[key] = render
	}
	function getRenderKeys(type) {
		var rs = [],
			key;
		for (key in _renderMap) {
			if (type) {
				if (_renderMap[key][type]) {
					rs.push(key)
				}
			} else {
				rs.push(key)
			}
		}
		return rs
	}
	putRender('*', function(el, prop, val) {
		setAttr(el, prop, escapeHtml(nullToBlank(val)))
	});
	putRender(BIND_KEY_VALUE, function(el, data, bindText) {
		var val = getBindValue(data, bindText);
		el.value = nullToBlank(val);
		_renderMap[BIND_KEY_FIELD][S_RENDER_FN](el, data, bindText, val)
	});
	putRender(BIND_KEY_READONLY, function(el, data, bindText) {
		var val = getBindValue(data, bindText);
		el.readOnly = !! val
	});
	putRender(BIND_KEY_DISABLED, function(el, data, bindText) {
		var val = getBindValue(data, bindText);
		el.disabled = !! val
	}, 5);
	putRender(BIND_KEY_CHECKED, function(el, data, bindText) {
		var val = getBindValue(data, bindText);
		if (isArray(val)) {
			el.checked = (val.indexOf(el.value) >= 0)
		} else {
			el.checked = (val == el.value)
		}
	});
	putRender(BIND_KEY_VISIBLE, function(el, data, bindText) {
		var val = getBindValue(data, bindText);
		editStyle(el, [S_VISIBILITY, S_DISPLAY]);
		if ( !! val) {
			el.style.visibility = S_VISIBLE
		} else {
			el.style.display = S_NONE
		}
	}, 5);
	putRender(BIND_KEY_STYLE, function(el, data, bindText) {
		var keys = [],
			txts = [];
		parseSubBindText(bindText, keys, txts);
		if (!keys.length) return;
		var val, styles = [];
		for (var i = 0; i < keys.length; i++) {
			styles.push(keys[i] + S_COLON + getBindValue(data, txts[i]))
		}
		editStyle(el, keys, styles.join(S_SEMICOLON))
	}, 5);

	function parseSubBindText(bindText, keys, txts) {
		var i, kv, kvs = bindText.split(S_SEMICOLON);
		for (i = 0; i < kvs.length; i++) {
			kv = kvs[i].split(S_EQUAL);
			if (kv.length == 2) {
				keys.push(trim(kv[0]));
				txts.push(trim(kv[1]))
			}
		}
	}
	function editStyle(el, delStyleNames, addStyles) {
		var rs = [],
			style = getAttr(el, S_STYLE);
		if (!style) return;
		var keys = [],
			txts = [];
		parseSubBindText(style, keys, txts);
		for (var i = 0; i < keys.length; i++) {
			if (delStyleNames.indexOf(k) < 0) {
				rs.push(keys[i] + S_COLON + txts[i])
			}
		}
		addStyles && rs.push(addStyles);
		style = rs.join(S_SEMICOLON);
		setAttr(el, S_STYLE, style);
		return style
	}
	putRender(BIND_KEY_CLASS, function(el, data, bindText) {
		var keys = [],
			txts = [];
		parseSubBindText(bindText, keys, txts);
		if (!keys.length) return;
		for (var i = 0; i < keys.length; i++) {
			if (getBindValue(data, txts[i])) {
				addClass(el, keys[i])
			} else {
				removeClass(el, keys[i])
			}
		}
	});
	putRender(BIND_KEY_INNERTEXT, function(el, data, bindText) {
		var val = getBindValue(data, bindText);
		el.textContent = (val == null ? S_BLANK : val)
	});
	putRender(BIND_KEY_INNERHTML, function(el, data, bindText) {
		var val = getBindValue(data, bindText);
		el.innerHTML = (val == null ? S_BLANK : val)
	});
	putRender(BIND_KEY_FIELD, function(el, data, bindText, bindValue) {
		var field = getElementBindInfo(el)[BIND_KEY_FIELD];
		if (field && field != bindText) {
			set(data, field, bindValue)
		}
	});
	putRender(BIND_KEY_OPTIONS, function(el, data, bindText) {
		var val = getBindValue(data, bindText);
		el.length = 0;
		if (val == null || isPlainObject(val)) return;
		var opts = el.options;
		if (!isArray(val)) {
			val = val.split(S_SEMICOLON).join(S_COMMA).split(S_COMMA)
		}
		each(val, function(option) {
			if (isPlainObject(option)) {
				opts[opts.length] = new Option(option.text, option.value)
			} else if (option == null) {
				opts[opts.length] = new Option(S_BLANK, S_BLANK)
			} else {
				var kv = option.split(S_COLON);
				opts[opts.length] = new Option(kv.length > 1 ? kv[1] : option, kv[0])
			}
		})
	}, 5);
	putRender(BIND_KEY_CLICK, null, 0, 0, 1);
	putRender(BIND_KEY_FOREACH, function(el, data, bindText) {
		var val = getBindValue(data, bindText);
		removeChilds(el);
		if (val && val.length) {
			el.appendChild(createFragmentByTemplate(val, el, true))
		}
	}, 7, 1);
	putRender(BIND_KEY_WITH, function(el, data, bindText) {
		var val = getBindValue(data, bindText);
		removeChilds(el);
		el.appendChild(createFragmentByTemplate(val, el))
	}, 8, 1);
	putRender(BIND_KEY_IF, function(el, data, bindText) {
		var val = getBindValue(data, bindText);
		removeChilds(el);
		if (val) {
			el.appendChild(createFragmentByTemplate(data, el))
		} else {
			return false
		}
	}, 9, 1);

	function createFragmentByTemplate(data, el, foreach) {
		var rs;
		if (foreach) {
			rs = document.createDocumentFragment();
			if (isArray(data) && data.length > 0) {
				each(data, function(dt) {
					if (!dt) return;
					var tbody, fragment = createFragmentByTemplate(dt, el);
					for (var i = 0; i < fragment.childNodes.length; i++) {
						if (fragment.childNodes[i].tagName == S_TBODY) {
							tbody = fragment.childNodes[i]
						}
					}
					if (tbody) {
						for (var i = 0; i < tbody.childNodes.length; i++) {
							rs.appendChild(tbody.childNodes[i])
						}
					} else {
						rs.appendChild(fragment)
					}
				})
			}
		} else {
			rs = document[getAttr(el, S_ELEMENT_ATTR_TEMPLATE)].cloneNode(true);
			each(rs.querySelectorAll(SELECTOR_DATA_BIND), function(node) {
				defineElement(node, data);
				elementRender(node)
			})
		}
		return rs
	}
	function elementRender(el, bindInfo, dataField) {
		bindInfo = bindInfo || getElementBindInfo(el);
		if (!_renders) {
			_renders = [];
			for (k in _renderMap) {
				_renders.push(_renderMap[k])
			}
			_renders.sort(function(o1, o2) {
				if (o1[S_RENDER_ORDER] == o2[S_RENDER_ORDER]) return 0;
				return o1[S_RENDER_ORDER] < o2[S_RENDER_ORDER] ? 1 : -1
			})
		}
		each(_renders, function(render) {
			function functionOfBind() {
				try {
					var fn = getBindValue(data, bindText, 0, 1);
					fn.call(data, data)
				} catch (e) {
					error('#3', el, bindText, data, e)
				}
			}
			var bindText = bindInfo[render[S_RENDER_KEY]];
			var data = getData(bindInfo[S_BIND_INFO_PROP_DATA_ID]);
			if (bindText) {
				if (dataField && bindText.indexOf(dataField) < 0) {
					return
				}
				if (render[S_RENDER_EVENT]) {
					addEvent(render[S_RENDER_KEY], functionOfBind, el)
				} else {
					render[S_RENDER_FN](el, data, bindText)
				}
			}
		});
		for (var bindKey in bindInfo) {
			if (_renderMap[bindKey] || bindKey == S_BIND_INFO_PROP_DATA_ID) continue;
			var bindText = bindInfo[bindKey];
			if (dataField && bindText.indexOf(dataField) < 0) continue;
			var data = getData(bindInfo[S_BIND_INFO_PROP_DATA_ID]);
			var value = getBindValue(data, bindText);
			_renderMap[S_STAR][S_RENDER_FN](el, bindKey, value)
		}
	}
	function updateviewEventListener(data, key) {
		var els = document.querySelectorAll(S_DOT + getDataId(data) + S_MINUS + key);
		for (var i = 0; i < els.length; i++) {
			elementRender(els[i], S_BLANK, key)
		}
	}
	function datachangeEventListener(e) {
		var el = e.target;
		var bindInfo = getElementBindInfo(el);
		if (!bindInfo) {
			return
		}
		var field = bindInfo[BIND_KEY_FIELD] || bindInfo[BIND_KEY_VALUE] || bindInfo[BIND_KEY_CHECKED];
		if (field == null) {
			log('[ignore datachange]', el);
			return
		}
		var data = getData(bindInfo[S_BIND_INFO_PROP_DATA_ID]);
		var value = data[field];
		if (el.type == 'checkbox') {
			if (isArray(value)) {
				if (el.checked) {
					value.indexOf(el.value) < 0 && value.push(el.value)
				} else {
					value.indexOf(el.value) >= 0 && value.splice(value.indexOf(el.value), 1)
				}
			} else {
				value = el.checked ? el.value : S_BLANK
			}
		} else {
			value = el.value
		}
		set(data, field, value)
	};

	function addEvent(ev, fun, el) {
		if (el.addEventListener) {
			el.addEventListener(ev, fun, false)
		} else if (el.attachEvent) {
			el.attachEvent('on' + ev, fun)
		} else {
			el['on' + ev] = fun
		}
	}
	function addClass(el, name) {
		if ($isIE) {
			if (!el.className) {
				el.className = name
			} else {
				var ary = el.className.split(' ');
				if (ary.indexOf(name) >= 0) {
					return
				}
				ary.push(name);
				el.className = ary.join(' ')
			}
		} else {
			el.classList.contains(name) || el.classList.add(name)
		}
	}
	function removeClass(el, name) {
		if ($isIE) {
			var ary = el.className.split(' ');
			var idx = ary.indexOf(name);
			if (idx >= 0) {
				ary.slice(idx, 1);
				el.className = ary.join(' ')
			}
		} else {
			el.classList.remove(name)
		}
	}
	function setAttr(el, name, value) {
		return el.setAttribute(name, value)
	}
	function getAttr(el, name) {
		return el.getAttribute(name)
	}
	function removeChilds(el) {
		try {
			el.innerHTML = ''
		} catch (e) {
			while (el.firstChild) {
				el.removeChild(el.firstChild)
			}
		}
	}
	var REG_EVENT = /\S+/g;
	var _callbacks = {};

	function on(eventNames, fn) {
		if (eventNames && isFunction(fn)) {
			eventNames.replace(REG_EVENT, function(name, pos) {
				(_callbacks[name] = _callbacks[name] || []).push(fn)
			})
		}
	};

	function off(eventNames, fn) {
		if (!eventNames || eventNames == "*") {
			_callbacks = {}
		} else if (fn) {
			eventNames.replace(REG_EVENT, function(name) {
				var fns = _callbacks[name];
				for (var i = 0; i < fns.length; i++) {
					if (fn === fns[i]) {
						fns.splice(i--, 1)
					}
				}
			})
		} else {
			eventNames.replace(REG_EVENT, function(name) {
				_callbacks[name] = []
			})
		}
	};

	function trigger(eventNames, eventObj) {
		var args = slice.call(arguments, 1);
		eventNames.replace(REG_EVENT, function(name) {
			var fns = _callbacks[name] || [];
			for (var i = 0; i < fns.length; i++) {
				tryApply(eventObj, fns[i], args)
			}
		})
	};

	function notify(delay, eventNames, eventObj) {
		var delaytime = isNaN(delay) ? 0 : delay;
		var args = isNaN(delay) ? slice.call(arguments, 0) : slice.call(arguments, 1);
		async(function() {
			trigger.apply(null, args)
		}, delay)
	};

	function bind(data, selector, opt) {
		opt && settings(opt);
		observe(data);
		var dom = selector ? document.querySelector(selector) : document;
		parseHtml(data, dom);
		showHtml(dom);
		on(EVENT_UPDATE_VIEW, updateviewEventListener);
		addEvent('change', datachangeEventListener, document)
	}
	window.addEventListener("beforeunload", function(event) {
		_mapDataIdDataObject = null;
		_renderMap = null;
		_renders = null;
		_callbacks = null;
		_fns = null
	});
	var api = {};
	api.settings = settings;
	api.bind = bind;
	api.set = set;
	api.on = on;
	api.off = off;
	api.notify = notify;
	if (typeof exports == 'object') {
		module.exports = api
	} else if (typeof define == 'function' && define.amd) {
		define(function() {
			return api
		})
	} else {
		window.gotoEasy = window.$easy = api
	}
})(window, document);