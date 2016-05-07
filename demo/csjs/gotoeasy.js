/* gotoEasy @version, (c) 2016 Zhang Ming, @license MIT (http://gotoeasy.github.io) */

// ---------------------------
// 闭包函数开始，作为参数传入有利于代码压缩
// ---------------------------
(function(window, document
// 函数
//,isObject
){

// ---------------------------
// 常量
// ---------------------------
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

// ---------------------------
// Fix
// ---------------------------
var $isIE = (window == document && document != window);			// IE是朵奇葩，让IT业繁忙
var $isModernBrowser = (typeof window.screenX === "number");	// IE > 8

// 让IE8支持Array.indexOf
if (!Array.prototype.indexOf){
	Array.prototype.indexOf = function(item, start){
		for (var i = start || 0; i < this.length ; i++){
			if (this[i] === item) return i;
		}
		return -1;
	}
}


// ---------------------------
// 选项
// ---------------------------
var Options = {};

// ------------------------------这批变量允许被配置------------------------------
var DEBUG;							// 是否调试模式

var DOM_ATTR_BIND;					// 控件的数据绑定属性名
var SELECTOR_DATA_BIND;				// data-bind选择器

var DATA_KEY_FN_ID;					// 取数据的ID的方法名
var DATA_KEY_FN_PARENT;				// 取父数据对象的方法名
var DATA_KEY_FN_ROOT;				// 取根数据对象的方法名
var DATA_KEY_FN_DATA;				// 取本数据对象的方法名

var BIND_REF_ROOT;					// 定义指向根数据对象的关键字
var BIND_REF_PARENT;				// 定义指向父数据对象的关键字
var BIND_REF_DATA;					// 定义指向本数据对象的关键字

var BIND_KEY_FIELD;					// 绑定键，用于指定回写数据的字段
var BIND_KEY_VALUE;					// 绑定键，用于绑定value
var BIND_KEY_INNERTEXT;				// 绑定键，用于绑定InnerText
var BIND_KEY_INNERHTML;				// 绑定键，用于绑定InnerHtml
var BIND_KEY_OPTIONS;				// 绑定键，用于绑定下拉框的option选项
var BIND_KEY_READONLY;				// 绑定键，用于绑定readonly
var BIND_KEY_DISABLED;				// 绑定键，用于绑定disabled
var BIND_KEY_VISIBLE;				// 绑定键，用于绑定控件是否可见
var BIND_KEY_CHECKED;				// 绑定键，用于绑定复选框和单选框的选中状态
var BIND_KEY_STYLE;					// 绑定键，用于绑定style
var BIND_KEY_CLASS;					// 绑定键，用于绑定class
//var BIND_KEY_TEMPLATE;	// 绑定键，用于绑定template // TODO 支持模板？
var BIND_KEY_FOREACH;				// 绑定键，用于绑定数组循环
var BIND_KEY_WITH;					// 绑定键，用于绑定对象作用域
var BIND_KEY_IF;					// 绑定键，用于控制子节点是否显示
var BIND_KEY_CLICK;					// 绑定键，用于绑定点击事件

var EVENT_DATA_CHAGE;				// 定义数据变化的事件名
var EVENT_UPDATE_VIEW;				// 定义更新视图的事件名

var UID_PREFIX_DATA;				// 定义数据UID使用的前缀
var UID_PREFIX_TEMPLATE;			// 定义模板UID使用的前缀
// --------------------------------------------------------------------------------


var S_BIND_INFO_PROP_DATA_ID = '$d';			// 定义存放数据ID的键，用在绑定信息上
var S_BIND_INFO_PROP_TEMPLATE_ID = '$t';		// 定义存放模板ID的键，用在绑定信息上

// 初始化默认配置
initOptionValues();

function initOptionValues(){
	// Options的属性会被作为外部访问的属性名
	DEBUG = (Options.debug == null ? 1 : Options.debug);						// 是否调试模式(默认true)

	DOM_ATTR_BIND = Options.domAttrBind || (Options.domAttrBind = 'data-bind');							// 控件的数据绑定属性名
	SELECTOR_DATA_BIND = S_LEFT_ZKH + DOM_ATTR_BIND + S_RIGHT_ZKH;				// data-bind选择器

	DATA_KEY_FN_ID = Options.dataKeyFnId || (Options.dataKeyFnId = '_$id');								// 取数据的ID的方法名
	DATA_KEY_FN_PARENT = Options.dataKeyFnParent || (Options.dataKeyFnParent = '_$parent');					// 取父数据对象的方法名
	DATA_KEY_FN_ROOT = Options.dataKeyFnRoot || (Options.dataKeyFnRoot = '_$root');						// 取根数据对象的方法名
	DATA_KEY_FN_DATA = Options.dataKeyFnData || (Options.dataKeyFnData = '_$data');						// 取本数据对象的方法名

	BIND_REF_ROOT = Options.bindRefRoot || (Options.bindRefRoot = '$root');								// 定义指向根数据对象的关键字
	BIND_REF_PARENT = Options.bindRefParent || (Options.bindRefParent = '$parent');						// 定义指向父数据对象的关键字
	BIND_REF_DATA = Options.bindRefData || (Options.bindRefData = '$data');								// 定义指向本数据对象的关键字

	BIND_KEY_FIELD = Options.bindKeyField || (Options.bindKeyField = 'field');							// 绑定键，用于指定回写数据的字段
	BIND_KEY_VALUE = Options.bindKeyValue || (Options.bindKeyValue = 'value');							// 绑定键，用于绑定value
	BIND_KEY_INNERTEXT = Options.bindKeyInnerText || (Options.bindKeyInnerText = 'text');						// 绑定键，用于绑定InnerText
	BIND_KEY_INNERHTML = Options.bindKeyInnerHtml || (Options.bindKeyInnerHtml = 'html');						// 绑定键，用于绑定InnerHtml
	BIND_KEY_OPTIONS = Options.bindKeyOptions || (Options.bindKeyOptions = 'options');						// 绑定键，用于绑定下拉框的option选项
	BIND_KEY_READONLY = Options.bindKeyReadonly || (Options.bindKeyReadonly = 'readonly');					// 绑定键，用于绑定readonly
	BIND_KEY_DISABLED = Options.bindKeyDisabled || (Options.bindKeyDisabled = 'disabled');					// 绑定键，用于绑定disabled
	BIND_KEY_VISIBLE = Options.bindKeyVisible || (Options.bindKeyVisible = 'visible');						// 绑定键，用于绑定控件是否可见
	BIND_KEY_CHECKED = Options.bindKeyChecked || (Options.bindKeyChecked = 'checked');						// 绑定键，用于绑定复选框和单选框的选中状态
	BIND_KEY_STYLE = Options.bindKeyStyle || (Options.bindKeyStyle = 'style');							// 绑定键，用于绑定style
	BIND_KEY_CLASS = Options.bindKeyClass || (Options.bindKeyClass = 'class');							// 绑定键，用于绑定class
//	BIND_KEY_TEMPLATE = Options.bindKeyTemplate || (Options.bindKeyTemplate = 'template');	// 绑定键，用于绑定template
	BIND_KEY_FOREACH = Options.bindKeyForeach || (Options.bindKeyForeach = 'foreach');						// 绑定键，用于绑定数组循环
	BIND_KEY_WITH = Options.bindKeyWith || (Options.bindKeyWith = 'with');								// 绑定键，用于绑定对象作用域
	BIND_KEY_IF = Options.bindKeyIf || (Options.bindKeyIf = 'if');										// 绑定键，用于控制子节点是否显示
	BIND_KEY_CLICK = Options.bindKeyClick || (Options.bindKeyClick = 'click');							// 绑定键，用于绑定点击事件

	EVENT_DATA_CHAGE = Options.eventDataChage || (Options.eventDataChage = 'datachange');					// 定义数据变化的事件名
	EVENT_UPDATE_VIEW = Options.eventUpdateView || (Options.eventUpdateView = 'updaueview');					// 定义更新视图的事件名

	UID_PREFIX_DATA = Options.uidPrefixData || (Options.uidPrefixData = 'd');								// 定义数据UID使用的前缀
	UID_PREFIX_TEMPLATE = Options.uidPrefixTemplate || (Options.uidPrefixTemplate = 't');						// 定义模板UID使用的前缀
}


function settings(opt){
	// 返回配置的拷贝，避免不必要的影响
	if (!opt) return copyObject(Options);

	extend(Options, opt);

	initOptionValues();

	return copyObject(Options);
}


// ---------------------------
// 工具
// ---------------------------
// 可以写一堆方法，只要是没有被用到，最终压缩后都会被自动剔除
var slice = Array.prototype.slice;
var async = setTimeout;

function uid(prefix){
	uid[prefix] = uid[prefix] || 1;
	return prefix + uid[prefix]++;
}

function startsWith(strSrc, strTest) {
  return strSrc.slice(0, strTest.length) === strTest
}

function trim(str){
	 return str.replace(/(^\s*)|(\s*$)/g, '');
}

function nullToBlank(str){
	 return str == null ? '':str;
}

// 参数为字符串时转成json对象，参数为对象时转成json字符串
function json(objOrStr) {
	return isObject(objOrStr) ? JSON.stringify(objOrStr) : JSON.parse(objOrStr);	// TODO 要支持不支持的浏览器？
}

function isArray(ary) {
	return (Array.isArray && Array.isArray(ary)) || ary instanceof Array || Object.prototype.toString.call(ary) == '[object Array]';
}

function isPlainObject(obj) {
	return obj && Object.prototype.toString.call(obj) === S_OBJECT_OBJECT;
}

function isObject(obj) {
	return obj !== null && typeof obj === S_OBJECT;
}

function isFunction(obj){ 
	return (typeof obj == S_FUNCTION) && obj.constructor == Function; 
}

function hasKey(plainObject, key) {
	return isPlainObject(plainObject) && plainObject[key] !== undefined;
}

// From的全部属性都覆盖到To中
function extend(to, from) {
	if (!isPlainObject(from)){
		return;
	}
	var keys = Object.keys(to);
	for (var key in from){
		to[key] = from[key];
	}
}

// From覆盖到To，仅限于From和To都有的属性
function overwrite(to, from) {
	if (!isPlainObject(from)){
		return;
	}
	var keys = Object.keys(to);
	for (var key in from){
		if (keys.indexOf(key) >=0) {
			to[key] = from[key];
		}
	}
}

function copyObject(obj) {
	var rs = {};
	for (var key in obj){
		rs[key] = obj[key];
	}
	return rs;
}

function copyArray(ary, start, end) {
	var rs = [];
	if (!start || start<0){
		start = 0;
	}
	if (!end || end > ary.length){
		end = ary.length;
	}
	if (start >= end){
		return rs;
	}

	for (var i=start; i<end; i++){
		rs.push(ary[i]);
	}
	return rs;
}

function each(ary, callback){
	for (var i=0;i<ary.length ;i++ ){
		if (callback(ary[i], i) === false){
			break;
		}
	}
}

// 调用函数
function tryApply(thisObj, func, args){
	try{
		return func.apply(thisObj, args);
	} catch (e){
		warn(arguments, e);
	}
}

function escapeHtml(str){ 
	return new Option(str).innerHTML.replace(/"/g, "&quot;"); 
}

function log(){
	executeConsole('log', slice.call(arguments), DEBUG);
}
function info(){
	executeConsole('info', slice.call(arguments), DEBUG);
}
function warn(){
	executeConsole('warn', slice.call(arguments), DEBUG);
}
function error(){
	executeConsole('error', slice.call(arguments), 1);
}
function executeConsole(method, args, mode){
	if (mode){
		var params = [];
		for (var i=0; i<args.length; i++){
			params.push('_[' + i + ']');
		}

		var body = 'console.' + method +'(';
		body += params.join(',');
		body += ')';

		try{
			new Function("_", body)(args);
		}catch(e){
			console.warn(method, args, e);
		}
	}
}


// ---------------------------
// 数据/视图 Observe
// ---------------------------
var _mapDataIdDataObject = {};								// 用于通过id找到数据对象 {dataId:数据对象}

var S_REG_QUOTE = /(['"])[^'"]*\1/g;						// 匹配字符串
var S_REG_PROP = /([\w$_\.\[\]]+)/g;						// 匹配字段
var _fns = {};												// 属性取值函数的缓存

var S_ELEMENT_PROP_BIND_INFO = '_bindInfo';					// 页面节点上保存绑定信息用，类似：el['_bindInfo'] = 对象的json字符串
var S_ELEMENT_ATTR_TEMPLATE = '_template';					// 页面节点上保存模板ID用的属性名，模板未绑定时自动算出模板ID并输出

function set(data, key, value, forceUpdate){

	if (!data[DATA_KEY_FN_ID]){ // 无数据绑定
		data[key] = value;
/*del*/ warn("没有绑定的数据对象，仅单纯赋值", data, key, value);
		return;
	}

	var oldValue = data[key];
	if (!forceUpdate && !isObject(value) && value === oldValue){
/*del*/ info("数据没有变化", data, key, value, oldValue);
		return;
	}

	observe(value, data, key); // 值为对象时重新监视值
	data[key] = value;

/*del*/ log("触发数据更新", EVENT_DATA_CHAGE, key, value);
	trigger(EVENT_DATA_CHAGE, data, key, value, oldValue); // 即刻触发数据更新事件
	if (isArray(data)){
		// 直接按下标更新数组元素时刷新整个数组
		var parent = data[DATA_KEY_FN_PARENT]();
		for (k in parent){
			if (parent[k] === data){
/*del*/ log("通知更新页面", EVENT_UPDATE_VIEW, k, value);
				notify(EVENT_UPDATE_VIEW, parent, k, value, oldValue);	// 延时触发视图更新事件
			}
		}
	}else{
/*del*/ log("通知更新页面", EVENT_UPDATE_VIEW, key, value);
		notify(EVENT_UPDATE_VIEW, data, key, value, oldValue);			// 延时触发视图更新事件
	}
}

function getData(dataId){
	return _mapDataIdDataObject[dataId];
}
function getDataId(data){
	return data && data[DATA_KEY_FN_ID]();
}

function get(data, key, defaultValue){
	var value = data[key];
	return value === undefined ? defaultValue : value;
}

function observe(data, parent, key){
	if (isObject(data)){

		defineData(data, parent);

		if (isPlainObject(data)){
			for (var k in data ){
				observe(data[k], data, k);
			}
		}else if (isArray(data)){
			for (var i=0; i<data.length; i++ ){
				observe(data[i], data, i);
			}
			
			if (!data[DATA_KEY_FN_PARENT]()){
				// TODO root is array 极少见
			}else{
				defineArrayMethod(data, parent, key);						// 重定义数组方法
			}
		}
	}

};

function defineData(data, parent){
	// 保存数据关系
	var dataid = data[DATA_KEY_FN_ID] ? getDataId(data) : uid(UID_PREFIX_DATA);
	var parentid = parent ? getDataId(parent) : null;
	var rootid = parent ? getDataId(parent[DATA_KEY_FN_ROOT]()) : dataid;

	_mapDataIdDataObject[dataid] = data;

	// 给数据对象加上函数
	data[DATA_KEY_FN_ID] = function(){ return dataid; };					// data.$id()
	data[DATA_KEY_FN_PARENT] = function(){ return getData(parentid); };		// data.$parent()	// TODO 支持多父节点？
	data[DATA_KEY_FN_ROOT] = function(){ return getData(rootid); };			// data.$root()		// TODO 支持多根节点？
	data[DATA_KEY_FN_DATA] = function(){ return this; };					// data.$data()

//	data.set = function(key, value, forceUpdate){							// data.set(key, value, forceUpdate)
//		set(this, key, value, forceUpdate);
//	};
//	data.get = function(key, defaultValue){									// data.get(key, defaultValue)
//		return get(this, key, defaultValue);
//	};
}


function defineArrayMethod(ary, parent, key){

	if (ary.x) return; // has defined

	// 重写数组方法
	each(['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'], function(fnName){
		var method = ary[fnName];

		ary[fnName] = function(){
			var oldLength = ary.length;
			var result = method.apply(ary, arguments);

			if (fnName == 'push'){
				// 向数组的末尾添加N个元素
				for (var i=oldLength; i < result; i++){
					observe(ary[i], ary, i);
				}
			}else if (fnName == 'unshift'){
				// 向数组的开头添加N个元素
				for (var i=0 ; i < result-oldLength; i++ ){
					observe(ary[i], ary, i);
				}
			}else{
				// TODO 数据删除时资源释放影响？从根节点扫描更新_mapIdData
			}

			trigger(EVENT_DATA_CHAGE + ' ' + EVENT_UPDATE_VIEW, parent, key, ary); // 触发数据更新、视图更新事件

			return result;
		};
	});

	ary.x = 1;  // flag
}

// ------------------------------------------------------------------------------------
// TODO 优化？逗号影响解析结果？
var S_IGNORE_KEY = 'true false null alert this _ if else'.split(' ');
function getBindValue(data, bindText, fields, isEvent){
	if( hasKey(data, bindText)){
		fields && fields.push(getDataId(data) + '-' + bindText);	// 保存字段CSS名
		return data[bindText];
	}

	var fnKey = getDataId(data) + '#' + bindText;
	if (fields || !_fns[fnKey]){
		// 字符串替换成{n}，替换值保存到repls中
		var repls=[];
		var body = bindText.replace(S_REG_QUOTE, function(match){
										var key = '{' + repls.length + "}";
										repls.push(match);
										return key;
									});
		// 匹配为字段时，加前缀“_.”
		body = body.replace(S_REG_PROP, function(match){
								if ( /^\d+(\.\d+)?$/g.test(match) || S_IGNORE_KEY.indexOf(match) >= 0 || startsWith(match,']') ){
									return match;
								}else{
									// $parent.data.$root.fns.check -> _.$parent().data.$root().funs.check
									match = match.split(BIND_REF_ROOT).join(DATA_KEY_FN_ROOT + '()');		// $root -> $root()
									match = match.split(BIND_REF_PARENT).join(DATA_KEY_FN_PARENT + '()');	// $parent -> $parent()
									match = match.split(BIND_REF_DATA).join(DATA_KEY_FN_DATA + '()');		// $data -> $data()

									if (fields) {
										var field = getDataFieldCss(data, "return _." + match);	// 解析字段CSS名
										field && fields.push(field);				// 保存字段CSS名
									}

									return '_.' + match;
								}
							});
		// 字符串还原
		for (i=0; i<repls.length; i++ ){
			body = body.replace("{" + i + "}", repls[i]);
		}

		_fns[fnKey] = _fns[fnKey] || createFunction("return " + body);	// 创建函数
	}

	if (isEvent){
		return _fns[fnKey];
	}

	// 传入fields数组时用于取得关联字段，为提高性能不做取值操作
	if (!fields){
		try{
			return _fns[fnKey](data);		// 调用函数取值
		}catch(e){
			error('#2', _fns[fnKey], data, bindText, e);
			return undefined;
		}
	}
}

function createFunction(body){
	try{
		return new Function("_", body);
	}catch(e){
		error('#1', body);				// 绑定写法有误
	}
}

function getDataFieldCss(data, body){
	var fun = createFunction(body);
	if (!fun) return;

	var value = fun(data);

	if (body.indexOf(S_DOT) < 0){
		// 没有“.”时，简单认为直接就是字段
		return getDataId(data) + '-' + body;		// TODO $index等有影响？
	}

	var ary = body.split(S_DOT);
	var lastField = ary.pop();
	if (isObject(value)){
		// 如：$root().order.headInfo，结果为order的dataid-headInfo
		return getDataId(value[DATA_KEY_FN_PARENT]()) + '-' + lastField;
	}else{
		// TODO 存在更复杂的情况要对应？ $root().names[0]  ? 
		// 如：$root().name，结果为root的dataid-name
		fun = createFunction(ary.join(S_DOT));
		if (!fun) return;
		return getDataId(fun(data)) + '-' + lastField;
	}
}

function getElementBindInfo(el, data, cssFields){

	if (el[S_ELEMENT_PROP_BIND_INFO]){
		return json(el[S_ELEMENT_PROP_BIND_INFO]);
	}

	var bindInfo = parseBindInfo(el);			// 对象化data-bind
	if (!bindInfo){
		return 0;	// 没有绑定的普通控件
	}
	bindInfo[S_BIND_INFO_PROP_DATA_ID] = getDataId(data);			// 添加数据对象ID

	// 传入数组cssFields时算出全部相关字段的css类
	if (cssFields){
		for (var key in bindInfo){
			if (key != S_BIND_INFO_PROP_DATA_ID && key != BIND_KEY_FIELD && key != BIND_KEY_CLICK){	// TODO 排除页面刷新无关的FIELD和CLICK

				if (key == BIND_KEY_STYLE || key == BIND_KEY_CLASS){ // TODO 硬编码改善
					var kvs = bindInfo[key].split(';');
					for (var i=0, kv; i<kvs.length; i++){
						kv = kvs[i].split('=');

						var fields = [];
						getBindValue(data, kv[1], fields);
						for (var j=0; j<fields.length; j++){
							cssFields.push(fields[j]);
						}
					}
				}else{
					var fields = [];
					getBindValue(data, bindInfo[key], fields);
					for (var i=0; i<fields.length; i++){
						cssFields.push(fields[i]);
					}
				}
			}
		}
	}

	return bindInfo;
}

function parseBindInfo(el){
	var rs = {}, kvs, kv, bindText = getAttr(el, DOM_ATTR_BIND);	// text: format(field1, 'yyyy/MM/dd hh:mm:ss', [1,2,3]), click: format(field1, 'yyyyMMddhhmmss')
	if (!bindText){
		return null;
	}

	var tmpTxt = bindText.replace(/,{1}\s*\w+\s*:{1}/g, function(match){  return '\t' + match.substring(1);	});	// 逗号+任意空格+类字母+任意空格+冒号  ->  【换行】+任意空格+类字母+任意空格+冒号
	kvs = tmpTxt.split('\t');										// 按【换行】区分不同的绑定

	each(kvs, function(item){
		kv = item.split(S_COLON);	// ':'
		rs[trim(kv[0]).toLowerCase()] = trim(item.substring(item.indexOf(S_COLON)+1));
	});

	return rs;
}

function defineElement(el, data){

	// 保存绑定信息对象
	var cssFields = [];
	var bindInfo = getElementBindInfo(el, data, cssFields);

	// 节点写入css
	each(cssFields, function(css){
		addClass(el, css);
	});

	// view到data的绑定字段
	if (!bindInfo[BIND_KEY_FIELD]){
		// 未指定时尝试识别并设定
		var field = bindInfo[BIND_KEY_VALUE] || bindInfo[BIND_KEY_INNERTEXT];	// TODO 改善？
		if (data[field] !== undefined){
			bindInfo[BIND_KEY_FIELD] = field;									// 数据有这个字段则添加
		}
	}

	// 给页面Dom节点加上绑定信息
	el[S_ELEMENT_PROP_BIND_INFO] = json(bindInfo);
	
	// TODO 保存绑定信息、关联字段
}

function parseTemplate(dom, selector){
	var els = dom.querySelectorAll(selector || SELECTOR_DATA_BIND);
	
	var tmplKeys = getRenderKeys(S_RENDER_TEMPLATE);	// 带模板的绑定关键字
	var tmplSels = [];									// 关键字相应的选择器
	for (var i=0; i<tmplKeys.length; i++){
		tmplSels.push(S_LEFT_ZKH + DOM_ATTR_BIND + S_XING_EQ + tmplKeys[i] + S_RIGHT_ZKH);		// 例：[data-bind*=foreach]
	}

	each(els, function(el){
		var bindInfo = parseBindInfo(el);	// 对象化data-bind
		var hasTemplate = 0;

		// 判断是否有模板
		for (var key in bindInfo){
			if (tmplKeys.indexOf(key) >= 0) hasTemplate = 1;
		}

		// 有模板时解析模板
		if ( hasTemplate ){
			// 优先解析子模板
			for (var i=0; i<tmplKeys.length; i++){
				if (hasBindSubTemplate(el, tmplSels[i], tmplKeys[i])){
					parseTemplate(el);
				}
			}

			// 保存模板
			var template = document.createDocumentFragment();
			var childs = copyArray(el.childNodes);
			each(childs, function(child){
				template.appendChild(child.cloneNode(true));
			});

			var templateid = uid(UID_PREFIX_TEMPLATE);
			document[templateid] = template;					// 模板Fragment挂到document上保存
			setAttr(el, S_ELEMENT_ATTR_TEMPLATE, templateid);	// 模板ID保存到节点上便于节点克隆后再次取得

			// 清空内容
			removeChilds(el);
		}
	});
} 

function hasBindSubTemplate(el, selector, bindKey) {
	var els = el.querySelectorAll(selector);
	for (var i=0; i<els.length; i++ ){
		var bindInfo = parseBindInfo(els[i]);	// 对象化data-bind
		if (bindInfo[bindKey]){
			return true;
		}
	}
	return false;
}

function parseHtml(data, dom){
	parseTemplate((dom || document)); // 初始化模板

	var els = (dom || document).querySelectorAll(SELECTOR_DATA_BIND);
	each(els, function(el){
		defineElement(el, data);
	});
}

function showHtml(dom){
	var els = (dom || document).querySelectorAll(SELECTOR_DATA_BIND);
	each(els, function(el){
		elementRender(el);
	});
}

// ---------------------------
// 页面渲染
// ---------------------------
var _renderMap, _renders;
var S_RENDER_KEY = "k";
var S_RENDER_FN = "f";
var S_RENDER_ORDER = "o";
var S_RENDER_TEMPLATE = "t";
var S_RENDER_EVENT = "e";
var S_RENDER_PARAMS = "p";

// render对象属性
// key			:	绑定关键字，必须
// func			:	渲染器函数(//TODO 参数说明)，事件以外必须定义
// order		:	渲染顺序，默认0顺序无关
// template		:	是否模板，默认false
// eventName	:	事件名，如click
function putRender(key, func, order, template, eventName, params){
	var render = {};
	render[S_RENDER_KEY] = key;
	render[S_RENDER_FN] = func;
	render[S_RENDER_ORDER] = order || 0;		// 默认顺序无关
	render[S_RENDER_TEMPLATE] = !!template;		// 默认不是模板
	render[S_RENDER_EVENT] = eventName;			// 默认不是事件
	
	// 保存
	_renderMap[key] = render;
}

function getRenderKeys(type){
	var rs = [], key;
	for (key in _renderMap){
		if (type){
			if (_renderMap[key][type]){
				rs.push(key);	// 指定类型
			}
		}else{
			rs.push(key);		// 未指定类型时全部返回
		}
	}
	return rs;
}


function installRenders(){

	if (_renderMap){
		return;			// 避免重复初始化
	}

	_renderMap = {};

	// 节点的普通属性，如src、href等（有属性不能用setAttribute设定时则需拿出来单独实现）
	// 【'*'】表示未定义的都按普通属性处理
	putRender('*', function(el, prop, val) {
		setAttr(el, prop, escapeHtml(nullToBlank(val)));
	});

	// value
	putRender(BIND_KEY_VALUE, function(el, data, bindText) {
		var val = getBindValue(data, bindText);
		el.value = nullToBlank(val);

		// bindText不是直接绑定字段而是表达式运算得出时，若指定了field则调用field渲染器处理
		_renderMap[BIND_KEY_FIELD][S_RENDER_FN](el, data, bindText, val);
	});

	// 节点的单纯属性 readonly
	putRender(BIND_KEY_READONLY, function(el, data, bindText) {
		var val = getBindValue(data, bindText);
		el.readOnly = !!val; // TODO 复选框、单选框、下拉框是否要特别对应？
	});

	// 节点的单纯属性 disabled
	putRender(BIND_KEY_DISABLED, function(el, data, bindText) {
		var val = getBindValue(data, bindText);
		el.disabled = !!val;
	}, 5); // 渲染顺序:5

	// 节点的单纯属性 checked
	putRender(BIND_KEY_CHECKED, function(el, data, bindText) {
		var val = getBindValue(data, bindText);
		if (isArray(val)){
			el.checked = (val.indexOf(el.value) >=0);	// 绑定为数组
		}else{
			el.checked = (val == el.value);				// 绑定为普通值
		}

		/* TODO IE8确认效果
			setTimeout(function () {
				element.defaultChecked = checked
				element.checked = checked
			}, 31)
		*/
		
		// bindText不是直接绑定字段而是表达式运算得出时，若指定了field则调用field渲染器处理
		_renderMap[BIND_KEY_FIELD][S_RENDER_FN](el, data, bindText, val);

	});

	// 控制可视状态 visible
	putRender(BIND_KEY_VISIBLE, function(el, data, bindText) {
		var val = getBindValue(data, bindText);
		editStyle(el, [S_VISIBILITY, S_DISPLAY]);	// 删除影响显示的指定样式值 'visibility', 'display'

		if(!!val){
			el.style.visibility = S_VISIBLE;		// 控制显示
		}else{
			el.style.display = S_NONE;
		}
	}, 5);

	// style
	putRender(BIND_KEY_STYLE, function(el, data, bindText) {
		// data-bind="style:font-size=$root.fontSize;color='#00F';bg-color=getBgColor();"
		var keys = [], txts = [];
		parseSubBindText(bindText, keys, txts); // 解析结果通过参数返回

		if (!keys.length) return; // 没设定或设定有误

		var val, styles = [];
		for (var i=0; i<keys.length; i++){
			styles.push(keys[i] + S_COLON + getBindValue(data, txts[i])); // ':'
		}

		editStyle(el, keys, styles.join(S_SEMICOLON));	// 更新样式 ';'

	}, 5);

	// class
	putRender(BIND_KEY_CLASS, function(el, data, bindText) {
		// data-bind="class:hide=hide;color='info-color';bg-color=getBgColor();"
		var keys = [], txts = [];
		parseSubBindText(bindText, keys, txts); // 解析结果通过参数返回

		if (!keys.length) return; // 没设定或设定有误

		for (var i=0; i<keys.length; i++){
			if (getBindValue(data, txts[i])){
				addClass(el, keys[i]);
			}else{
				removeClass(el, keys[i]);
			}
		}
	});

	// innerText
	putRender(BIND_KEY_INNERTEXT, function(el, data, bindText) {
		var val = getBindValue(data, bindText);
		el.textContent = (val == null ? S_BLANK : val);
	});

	// innerHTML	// TODO
	putRender(BIND_KEY_INNERHTML, function(el, data, bindText) {
		var val = getBindValue(data, bindText);
		el.innerHTML = (val == null ? S_BLANK : val);
	});

	// 仅用于指定绑定的字段名，不需要控制显示
	// 如【data-bind="value: price*num, field:total"】，由于value关联了两个字段无法自动识别，若要自动回绑则需用field指定字段名
	putRender(BIND_KEY_FIELD, function(el, data, bindText, bindValue) {
		var field = getElementBindInfo(el)[BIND_KEY_FIELD];
		if (field && field != bindText){
			set(data, field, bindValue);
		}
	});

	// 下拉框的 options
	putRender(BIND_KEY_OPTIONS, function(el, data, bindText) {
		var val = getBindValue(data, bindText);
		// val可以是分号分隔的字符串、或单纯数组、或对象{value:'value',text:'display text'}数组
		el.length = 0;
		if (val == null || isPlainObject(val)) return;

		var opts = el.options;
		if (!isArray(val)) {
			val = val.split(S_SEMICOLON).join(S_COMMA).split(S_COMMA);			// 字符串时逗号或分号都作为分割符
		}

		each(val, function(option){
			if (isPlainObject(option)){
				opts[opts.length] = new Option(option.text, option.value);
			}else if (option == null){
				opts[opts.length] = new Option(S_BLANK, S_BLANK);
			}else{
				var kv = option.split(S_COLON);						// value和text可以用冒号分割
				opts[opts.length] = new Option(kv.length>1?kv[1]:option, kv[0]);
			}
		});

	}, 5); // 参数【5】表示优先度，越大越优先，不传时默认为0，用于比value优先处理，便于初始化好后供value渲染处理用

	// click事件
	putRender(BIND_KEY_CLICK, null, 0, 0, 'click');

	// foreach
	putRender(BIND_KEY_FOREACH, function(el, data, bindText) {
		var val = getBindValue(data, bindText);
		removeChilds(el);	// 清空
		if (val && val.length){
			el.appendChild(  createFragmentByTemplate(val, el, true)  );	// FOREACH有数据时显示
		}
	}, 7, 1);	// 顺序7：次于WITH, 模板

	// with
	putRender(BIND_KEY_WITH, function(el, data, bindText) {
		var val = getBindValue(data, bindText);
		removeChilds(el);	// 清空
		el.appendChild(  createFragmentByTemplate(val, el)  );
	}, 8, 1);	// 顺序8：次于IF

	// if
	putRender(BIND_KEY_IF, function(el, data, bindText) {
		var val = getBindValue(data, bindText);
		removeChilds(el);	// 清空
		if (val){
			// TODO 如果后面还有模板，这里可能白干甚至出错，待优化！
			el.appendChild(  createFragmentByTemplate(data, el)  );
		}else{
			return false;		// false表示不想显示子节点
		}
	}, 9, 1);	// 顺序9：最大最优先的渲染器

}


function parseSubBindText(bindText, keys, txts){
	// "font-size=$root.fontSize;color='#00F';bg-color=getBgColor();"
	var i, kv, kvs = bindText.split(S_SEMICOLON);	// 分号分割
	for (i=0; i<kvs.length; i++){
		kv = kvs[i].split(S_EQUAL);				// 等号分割
		if (kv.length==2){ // 适当检查
			keys.push(trim(kv[0]));
			txts.push(trim(kv[1]));
		}
	}
}

function editStyle(el, delStyleNames, addStyles){
	var rs = [], style = getAttr(el, S_STYLE);
	if (!style)	return;

	var keys = [], txts = [];
	parseSubBindText(style, keys, txts); // 解析结果通过参数返回

	for (var i =0; i<keys.length; i++){
		if (delStyleNames.indexOf(k) < 0){
			rs.push(keys[i] + S_COLON + txts[i]); // ':'
		}
	}

	addStyles && rs.push(addStyles);

	style = rs.join(S_SEMICOLON); // ';'
	setAttr(el, S_STYLE, style );
	return style;
}

// 循环模板时，data必须是数组且foreach为true
function createFragmentByTemplate(data, el, foreach){
	var rs;
	if (foreach){
		// 循环模板
		rs = document.createDocumentFragment();
		
		if (isArray(data) && data.length > 0){	// 有数据才显示
			each(data, function(dt){
				if (!dt) return; // 通常不该有的错误数据
				var tbody, fragment = createFragmentByTemplate(dt, el);
				for (var i=0; i<fragment.childNodes.length; i++){
					if (fragment.childNodes[i].tagName == S_TBODY){ // 'TBODY'
						tbody = fragment.childNodes[i];
					}
				}
				if (tbody){
					for (var i=0; i<tbody.childNodes.length; i++){
						rs.appendChild(tbody.childNodes[i]);	// TBODY时仅取子节点避免TBODY重复
					}
				}else{
					rs.appendChild(fragment);
				}
			});
		}

	}else{
		// 单纯模板
		rs = document[getAttr(el, S_ELEMENT_ATTR_TEMPLATE)].cloneNode(true);

		each(rs.querySelectorAll(SELECTOR_DATA_BIND), function(node){
			defineElement(node, data);	// 写入绑定信息
			elementRender(node);		// 显示去吧
		});

	}

	return rs;
}

// TODO 自定义模板

// -------------------------------------------------------------------------


// 渲染控件
function elementRender(el, bindInfo, dataField){
	bindInfo = bindInfo || getElementBindInfo(el);

	if (!_renders){
		// 重排
		_renders = [];
		for (k in _renderMap){
			_renders.push(_renderMap[k]);
		}
		_renders.sort(function(o1, o2){
			if (o1[S_RENDER_ORDER] == o2[S_RENDER_ORDER]) return 0;
			return o1[S_RENDER_ORDER] < o2[S_RENDER_ORDER] ? 1 : -1;
		});
	}

	// 按优先顺序渲染
	each(_renders, function(render){

		/* 定义有名函数避免被重复绑定 */
		function functionOfBind(){
			try{
				var fn = getBindValue(data, bindText, 0, 1); // 1:function
				fn.call(data, data);
			}catch(e){
				error('#3', el, bindText, data, e);
			}
		}

		var bindText = bindInfo[render[S_RENDER_KEY]];
		var data = getData(bindInfo[S_BIND_INFO_PROP_DATA_ID]);

		if (bindText){
			if (dataField && bindText.indexOf(dataField) < 0){
				return;	// 无关字段数据更新，不需要刷新 TODO 优化？
			}

			if (render[S_RENDER_EVENT]){
				// 事件
				addEvent(render[S_RENDER_EVENT], functionOfBind, el);
			}else{
				// 显示
				render[S_RENDER_FN](el, data, bindText);		// TODO 可能if做了显示被with覆盖再被foreach覆盖，做if时判断后面有无。。。？
			}

		}
	});

	// 未定义的用属性值渲染器渲染
	for (var bindKey in bindInfo){
		if (_renderMap[bindKey] || bindKey == S_BIND_INFO_PROP_DATA_ID) continue;

		var bindText = bindInfo[bindKey];
		if (dataField && bindText.indexOf(dataField) < 0) continue;	// 无关字段数据更新，不需要刷新

		var data = getData(bindInfo[S_BIND_INFO_PROP_DATA_ID]);
		var value = getBindValue(data, bindText);
		_renderMap[S_STAR][S_RENDER_FN](el, bindKey, value); // TODO render 接口参数统一
	}
}

// 按数据的指定字段刷新相关控件
function updateviewEventListener(data, key){
	var els = document.querySelectorAll(S_DOT + getDataId(data) + S_MINUS + key); // .dataid-field
	for (var i=0; i<els.length; i++ ){
		elementRender(els[i], S_BLANK, key);
	}
}

// 页面上变更数据时更新数据
function datachangeEventListener(e){
	var el = e.target;
	var bindInfo = getElementBindInfo(el);
	if (!bindInfo){
		return; // 忽略无关控件的编辑事件
	}

	var field = bindInfo[BIND_KEY_FIELD] || bindInfo[BIND_KEY_VALUE] || bindInfo[BIND_KEY_CHECKED];
	if (field == null){
/*del*/		warn('[无更新绑定]', el, bindInfo,BIND_KEY_VALUE);
		return;
	}
	var data = getData(bindInfo[S_BIND_INFO_PROP_DATA_ID]);
	var value = data[field];

	if (el.type == 'checkbox'){
		if (isArray(value)){
			if (el.checked){
				value.indexOf(el.value)<0 && value.push(el.value);
			}else{
				value.indexOf(el.value)>=0 && value.splice(value.indexOf(el.value), 1);
			}
		}else{
			value = el.checked ? el.value : S_BLANK;
		}
	}else{
		value = el.value;
	}

	// 更新数据
	set(data, field, value);
};


// ---------------------------
// Dom操作
// ---------------------------
// addEvent('change', onchangefunction, document)
function addEvent(ev, fun, el) {
    if (el.addEventListener) {
		el.addEventListener(ev, fun, false);
    } else if(el.attachEvent){
		el.attachEvent('on' + ev, fun);
    } else{
		el['on' + ev] = fun;
    }
}

// The classList property is not supported by IE9 and lower.
// IE11 still bug on classList, it does not support classList on SVG element
function addClass(el, name){
	if ($isIE){
		if (!el.className){
			el.className = name;
		}else{
			var ary = el.className.split(' ');
			if (ary.indexOf(name) >= 0) {
				return;
			}
			ary.push(name);
			el.className = ary.join(' ');
		}
	}else{
		el.classList.contains(name) || el.classList.add(name);
	}
}

function removeClass(el, name){ 
	if ($isIE){
		var ary = el.className.split(' ');
		var idx = ary.indexOf(name);
		if (idx >= 0) {
			ary.slice(idx,1);
			el.className = ary.join(' ');
		}
	}else{
		el.classList.remove(name);
	}
}

function setAttr(el, name, value){ 
	return el.setAttribute(name, value);
}

function getAttr(el, name){ 
	return el.getAttribute(name);
}

function removeChilds(el){
	try{
		el.innerHTML = '';
	}catch(e){
		// TBODY，IE <= 9
		while(el.firstChild) {
			el.removeChild(el.firstChild);
		}
	}
}


// ---------------------------
// 事件
// ---------------------------
var REG_EVENT = /\S+/g; // 匹配事件名用
var _callbacks = {};	// 事件回调函数

// 注册事件，例：on("datachange viewchange", fn)
function on(eventNames, fn) {
    if (eventNames && isFunction(fn)) {
		eventNames.replace(REG_EVENT, function(name, pos) {
			(_callbacks[name] = _callbacks[name] || []).push(fn);
		});
    }
};

// 关闭事件，例：off("datachange viewchange", fn)
function off(eventNames, fn) {
    if (!eventNames || eventNames == "*"){
		// 关闭所有事件例：off("*")
		_callbacks = {};
	}else if (fn) {
		// 按事件名和函数条件关闭事件，例：off("datachange", fn)
		eventNames.replace(REG_EVENT, function(name) {
			var fns = _callbacks[name];
			for (var i=0;i<fns.length ;i++ ){
				if (fn === fns[i]){
					fns.splice(i--, 1);
				}
			}
		});
    } else {
		// 按事件名条件关闭事件，例：off("datachange")
		eventNames.replace(REG_EVENT, function(name) {
			_callbacks[name] = [];
		});
    }
};

// 触发事件，例：trigger("datachange", data, "fieldName", value)
function trigger(eventNames, eventObj){
	var args = slice.call(arguments, 1);
	eventNames.replace(REG_EVENT, function(name) {
		var fns = _callbacks[name] || [];
		for (var i=0;i<fns.length ;i++ ){
			tryApply(eventObj, fns[i], args)
		}
	});
};

// 延迟触发事件，默认延迟0毫秒，例：notify("datachange", data, "fieldName", value); notify(1000, "datachange", data, "fieldName", value)
function notify(delay, eventNames, eventObj){
	var delaytime = isNaN(delay) ? 0 : delay;
	var args = isNaN(delay) ? slice.call(arguments, 0) : slice.call(arguments, 1);
	async(function(){
			trigger.apply(null, args);
		}, delay);
};


// ---------------------------
// 绑定
// ---------------------------
function bind(data, selector, opt){
/*del*/	var st = new Date() - 0;

	// 配置
	opt && settings(opt);

	installRenders();

/*del*/	log('当前配置', Options);
/*del*/	log('当前渲染器', _renderMap);

	// 检视数据对象，并为数据对象添加get/set等方法
	observe(data);

	// 按指定选择器绑定控件或按默认绑定整个页面
	var dom = selector?document.querySelector(selector):document;

	// 按数据解析页面
	parseHtml(data, dom);	 // TODO 多节点支持？

	// 显示页面
	showHtml(dom);

	// 默认事件
	on(EVENT_UPDATE_VIEW, updateviewEventListener);			// 数据被修改时更新页面
	addEvent('change', datachangeEventListener, document);	// 页面上编辑数据时更新数据

/*del*/	var ed = new Date() - 0;
/*del*/	info('bind耗时', ed-st, 'ms');
}


// ---------------------------
// destroy
// ---------------------------
// 有必要？
if ($isModernBrowser){
	window.addEventListener("beforeunload", function (event) {
		_mapDataIdDataObject = null;
		_renderMap = null;
		_renders = null;
		_callbacks = null;
		_fns = null;
	});

}

// ---------------------------
// 接口
// ---------------------------
var api = {};

// 配置
api.settings = settings;

// 数据绑定接口
api.bind = bind;
api.set = set;

// 事件接口
api.on = on;
api.off = off;
//api.trigger = trigger;
api.notify = notify;


if (typeof exports == 'object') {
  module.exports = api;							// 支持 CommonJS
} else if (typeof define == 'function' && define.amd) {
	define(function() {
		return api;								// 支持 AMD
	});
} else {
	window.gotoEasy = window.$easy = api;		// 支持 browser
}


// ---------------------------
// 闭包函数结束，作为参数传入有利于代码压缩
// ---------------------------
})(window, document
// 函数
//, function (obj) { // isObject
//	return obj !== null && typeof obj === 'object';
//}
);
