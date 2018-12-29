(function(window, document) {
    // ---------------------------
    // 全局常量
    // ---------------------------
    const IS_IE = window == document && document != window;

    /*
checked             (input type=checkbox/radio)
selected            (option)
disabled            (input, textarea, button, select, option, optgroup)
readonly            (input type=text/password, textarea)
multiple            (select,input)
ismap     isMap     (img, input type=image)

defer async draggable              (script)
declare             (object; never used)
noresize  noResize  (frame)
nowrap    noWrap    (td, th; deprecated)
noshade   noShade   (hr; deprecated)
compact             (ul, ol, dl, menu, dir; deprecated)

autofocus

autocomplete autoplay loop muted preload  required open translate
*/
    // 布尔型属性，不常用部分需要时再添加
    const BOOL_PROPS = ["autofocus", "hidden", "readonly", "disabled", "checked", "selected", "multiple", "translate", "draggable", "noresize"];

    // 一个特殊的state属性名，用于设定虚拟子节点数组
    const $SLOT = "$SLOT";
    // ---------------------------
    // 常用的一句话方法
    // ---------------------------

    const defer = (fn, ...args) => Promise.resolve(...args).then(fn);

    const log = (...args) => console.log(...args);
    const warn = (...args) => console.warn(...args);
    const error = (...args) => console.error(...args);

    const _toString = obj => Object.prototype.toString.call(obj);
    const isFunction = obj => typeof obj == "function" && obj.constructor == Function;
    const isBoolean = str => typeof str === "boolean";
    const isNumber = str => typeof str === "number";
    const isString = str => typeof str === "string";
    const isObject = obj => obj !== null && typeof str === "object";
    const isArray = obj => Array.isArray(obj) || obj instanceof Array;
    const isPlainObject = obj => _toString(obj) === "[object Object]";
    const isDate = obj => _toString(obj) === "[object Date]";
    const isRegExp = obj => _toString(obj) === "[object RegExp]";
    const isMap = obj => _toString(obj) === "[object Map]";
    const isSet = obj => _toString(obj) === "[object Set]";
    const isTextNode = obj => _toString(obj) === "[object Text]"; // TextNode

    const toLowerCase = str => str.toLowerCase();

    // ---------------------------
    // 总线
    // ---------------------------
    const BUS = (() => {
        let keySetFn = {}; // key:Set{fn}

        // 安装事件函数
        let on = (key, fn) => (keySetFn[toLowerCase(key)] || (keySetFn[toLowerCase(key)] = new Set())).add(fn);

        // 卸载事件函数
        let off = (key, fn) => {
            let setFn = keySetFn[toLowerCase(key)];
            setFn && (fn ? setFn.delete(fn) : delete keySetFn[toLowerCase(key)]);
        };

        // 安装事件函数，函数仅执行一次
        let once = (key, fn) => {
            fn["ONCE_" + toLowerCase(key)] = 1; // 加上标记
            on(key, fn);
        };

        // 通知执行事件函数
        let at = (key, ...args) => {
            let rs,
                setFn = keySetFn[toLowerCase(key)];
            if (setFn) {
                setFn.forEach(fn => {
                    fn["ONCE_" + toLowerCase(key)] && setFn.delete(fn) && delete fn["ONCE_" + toLowerCase(key)]; // 若是仅执行一次的函数则删除关联
                    rs = fn(...args); // 常用于单个函数的调用，多个函数时返回的是最后一个函数的执行结果
                });
                !setFn.size && off(key);
            }
            return rs;
        };

        // 安装些默认事件处理
        window.onload = e => at("window.onload", e) > (window.onload = null); // 关闭loader可用

        return { on: on, off: off, once: once, at: at };
    })();

    // ---------------------------
    // 常用DOM操作封装
    // ---------------------------

    // 对象常量: 简易封装DOM属性操作
    const DomAttrHandle = (function() {
        let callbacks = {};
        let on = (key, fn) => callbacks[toLowerCase(key)] || (callbacks[toLowerCase(key)] = fn);

        // val为undefined时，意思是要取值，传入则是要设值
        let at = (el, prop, val) =>
            (callbacks[toLowerCase(el.tagName + "." + prop)] || callbacks[toLowerCase(prop)] || callbacks["*"]).apply(this, [el, prop, val]); // 优先级： tag.prop > prop > *

        // ------------------
        // 普通属性存取
        on("*", (el, prop, val) => (isFunction(val) || val == null || prop.startsWith("$") ? el.getAttribute(prop) : el.setAttribute(prop, val))); // 不支持值为函数的设定，按取值处理，属性名$开头时仅取值（非法属性名，但又常用于内部特殊判断用途）

        // ------------------
        // 特殊属性存取定义(简单起见应付常用属性，必要时具体定义) ['autofocus', 'hidden', 'readonly', 'disabled', 'checked', 'selected', 'multiple', 'translate', 'draggable', 'noresize']
        BOOL_PROPS.forEach(k => on(k, (el, prop, val) => (val === undefined ? el[k] : (el[k] = toBoolean(val))))); // on('autofocus', (el, prop, val) => val===undefined ? el.autofocus : (el.autofocus=toBoolean(val)) );

        on("value", (el, prop, val) => (val === undefined ? el.value : (el.value = val == null ? "" : val)));

        on("innerHTML", (el, prop, val) => (val === undefined ? el.innerHTML : (el.innerHTML = val == null ? "" : val)));
        on("innerTEXT", (el, prop, val) => (val === undefined ? el.textContent : (el.textContent = val == null ? "" : val)));
        on("textcontent", (el, prop, val) => (val === undefined ? el.textContent : (el.textContent = val == null ? "" : val)));

        on("image.src", (el, prop, val) => (val === undefined ? el.src : (el.src = val)));

        // class
        on("class", (el, prop, val) => {
            if (val === undefined) {
                return el.className;
            }
            if (isPlainObject(val)) {
                for (let key in val) {
                    val[key] ? $$(el).addClass(key) : $$(el).removeClass(key); // {'class-name': true}
                }
            } else {
                $$(el).addClass(val);
            }
        });

        // style .... 有必要支持?
        on("style", (el, prop, val) => {
            if (val === undefined) {
                return el.getAttribute("style");
            }

            let oStyle = parseStyleToObject(val);
            for (let key in oStyle) {
                el.style[key] = oStyle[key];
            }
        });

        return { at: at };
    })();

    function parseStyleToObject(style = "") {
        // 对象时认为key应该都是合法的style属性: {borderColor: 'red', webkitAppearance: 'button', minWidth: ''}，值空白起到删除的作用
        if (isPlainObject(style)) {
            return style;
        }

        let rs = {};
        // border-color: red; -webkit-appearance: button; => ["border-color: red", " -webkit-appearance: button"]
        let ary = style.split(";").filter(v => v.trim() != "");
        ary.forEach(v => {
            let kv = v.split(":").filter(v => v.trim() != ""),
                key;
            if (kv.length == 2) {
                // key: border-color => borderColor, -webkit-appearance => webkitAppearance
                key = toLowerCase(kv[0])
                    .split("-")
                    .filter(v => v.trim() != "")
                    .map((v, i) => (i ? v.charAt(0).toUpperCase() + v.substring(1) : v))
                    .join("");
                rs[key] = kv[1].trim(); // borderColor = red
            }
        });
        return rs;
    }

    // 选择器 $$('.xxxx')
    function $$(selector, context) {
        if (typeof selector == "object") {
            return new Dom(selector);
        }

        let doc = context || document;
        let byId = selector.substring(0, 1) == "#";
        let qs;

        // 按ID查询，有一个便是
        if (byId) {
            qs = document.getElementById(selector.substring(1));
            return new Dom(qs ? [qs] : []);
        }

        if (doc instanceof Dom) {
            let ary = [],
                qs;
            if (byId) {
                for (let i = 0; i < doc.length; i++) {
                    qs = doc[i].querySelectorAll(selector);
                    for (let j = 0; j < qs.length; j++) {
                        ary.push(qs[j]); // 按class查询，有一个算一个
                    }
                }
            }
            return new Dom(ary);
        }

        return new Dom(doc.querySelectorAll(selector));
    }

    // DOM操作
    function Dom(queryResult) {
        let els = [];

        // queryResult 保存到 els, queryResult可能是单纯文本节点或包含文本节点
        if (queryResult) {
            if (queryResult.nodeType) {
                els[0] = queryResult; // 单个节点
            } else if (queryResult.length) {
                for (let i = 0; i < queryResult.length; i++) {
                    queryResult[i] && els.push(queryResult[i]);
                }
            }
        }

        // els暴露为属性length和下标
        this.length = els.length;
        for (let i = 0; i < els.length; i++) {
            this[i] = els[i];
        }

        // ---------------------------
        // 遍历 $$('.xxxx').forEach( (v,i)=>{...} )
        this.forEach = function(fn) {
            els.forEach(fn);
            return this;
        };

        // ---------------------------
        // 节点替换 $$('.xxxx').replaceWith(element/fragment)
        this.replaceWith = function(element) {
            let el, parent, theOne;

            // 留一个有效节点，其余删除
            while (els.length) {
                el = els.pop();
                parent = el.parentNode;
                parent && (theOne ? parent.removeChild(el) : (theOne = el));
            }

            // 替换保留的节点
            if (theOne) {
                theOne.parentNode.insertBefore(element, theOne);
                theOne.parentNode.removeChild(theOne);
            }

            return this;
        };

        // ---------------------------
        // 事件绑定 $$('.xxxx').on('click', fn)
        this.on = function(name, fn) {
            els.forEach(el => addDomEventListener(el, name, fn));
            return this;
        };

        // ---------------------------
        // 添加class $$('.xxxx').addClass('js-active')
        this.addClass = function(name) {
            name &&
                (name = name.replace(/\./g, "")) &&
                els.forEach(el => {
                    if (!el) return;

                    if (IS_IE) {
                        // The classList property is not supported by IE9 and lower. IE11 still bug on classList, it does not support classList on SVG element
                        if (!el.className) {
                            el.className = name;
                        } else {
                            var ary = el.className.split(" ");
                            if (ary.indexOf(name) >= 0) {
                                return;
                            }
                            ary.push(name);
                            el.className = ary.join(" ");
                        }
                    } else {
                        // 单纯的文本节点没有classList
                        name.split(/\s+/).forEach(nm => el.classList.contains(nm) || el.classList.add(nm));
                    }
                });
            return this;
        };

        // ---------------------------
        // 删除class $$('.xxxx').removeClass('js-active')
        this.removeClass = function(name) {
            name &&
                (name = name.replace(/\./g, "")) &&
                els.forEach(el => {
                    if (IS_IE) {
                        var ary = el.className.split(" ");
                        var idx = ary.indexOf(name);
                        if (idx >= 0) {
                            ary.slice(idx, 1);
                            el.className = ary.join(" ");
                        }
                    } else {
                        let nms = name.split(/\s+/);
                        nms.forEach(nm => el.classList.remove(nm));
                    }
                });
            return this;
        };

        // ---------------------------
        // 存取属性 $$('.xxxx').attr('name', 'value')
        this.attr = function(name, value) {
            if (!els.length) {
                return value == null ? null : this;
            }

            let rs;
            for (let i = 0; i < els.length; i++) {
                if (value == null) {
                    return DomAttrHandle.at(els[0], name); // 取值时仅返回首个节点属性值
                }
                DomAttrHandle.at(els[i], name, value); // 设值时全部节点都设定
            }

            return this;
        };

        // ---------------------------
        // 删除子节点 $$('.xxxx').removeChildren()
        this.removeChildren = function() {
            els.forEach(el => {
                try {
                    el.innerHTML = "";
                } catch (e) {
                    // TBODY，IE <= 9
                    for (; el.firstChild; ) el.removeChild(el.firstChild);
                }
            });
            return this;
        };

        // ---------------------------
        // 删除节点 $$('.xxxx').remove()
        this.remove = function() {
            els.forEach(el => el.parentNode.removeChild(el));
            return this;
        };

        return this;
    }

    // DOM事件
    function addDomEventListener(el, name, fn) {
        if (window.WeakMap) {
            // 支持WeakMap的话使用WeakMap做冒泡事件代理
            // TODO 特殊处理不支持冒泡的事件
            domEventListener(el, name, fn);
            addDocumentEventListener(name);
        } else {
            el.addEventListener ? el.addEventListener(name, fn, false) : el.attachEvent ? el.attachEvent("on" + name, fn) : (el["on" + name] = fn);
        }
    }
    function domEventListener(el, name, fn) {
        let map = (domEventListener.m = domEventListener.m || new WeakMap()); // el: {name: Set(...fn) }

        let oFn;
        if (!fn) {
            oFn = map.get(el) || {};
            return oFn[name];
        }

        !map.has(el) && map.set(el, {});
        oFn = map.get(el);
        let set = oFn[name] || (oFn[name] = new Set());
        set.add(fn);
    }
    function fnDocumentEventListener(event) {
        let el = event.target || event.srcElement;
        let fns = domEventListener(el, event.type);
        fns && fns.forEach(fn => fn(event));
    }
    function addDocumentEventListener(name) {
        if (!addDocumentEventListener[name]) {
            addDocumentEventListener[name] = 1;
            document.addEventListener
                ? document.addEventListener(name, fnDocumentEventListener, false)
                : document.attachEvent
                ? document.attachEvent("on" + name, fnDocumentEventListener)
                : (document["on" + name] = fnDocumentEventListener);
        }
    }

    // ---------------------------
    // 组件
    // ---------------------------

    const mapTagComponent = {}; // 组件注册(tagName: Component Class)
    const mapSingletonComp = {}; // 单例组件对象

    function registerComponents(components = {}) {
        for (let key in components) {
            mapTagComponent[key] = components[key];
        }
    }

    function getComponent(name) {
        return mapTagComponent[name];
    }

    function newComponentProxy(componentKey, opt) {
        let Component = mapTagComponent[componentKey];
        if (!Component) {
            throw new Error("component not found: " + componentKey); // 找不到指定标签的组件
        }

        let comp;
        if (Component.Singleton) {
            comp = mapSingletonComp[componentKey] || (mapSingletonComp[componentKey] = enhance(Component, opt)); // 单例
        } else {
            comp = enhance(Component, opt);
        }

        return comp; // 返回增强的组件对象
    }

    function createComponentByVnode(vnode) {
        let opt = assign({}, vnode.a || {}, vnode.c && vnode.c.length ? { [$SLOT]: vnode.c } : {}); // 传入属性和子虚拟节点
        return newComponentProxy(vnode.t, opt);
    }

    function domVnode(el, vnode) {
        if (!el) return;
        let map = domVnode.m || (domVnode.m = new WeakMap());

        // 取值
        if (!vnode) {
            return map.get(el);
        }

        // 设值
        delete vnode.c; // 删除虚拟节点的子节点引用
        let oVal = map.get(el);
        if (!oVal) {
            // 单纯虚拟节点
            return map.set(el, vnode);
        }

        if (!oVal.M) {
            // 复合虚拟节点
            let mVal = { M: 1 };
            mVal[oVal.t] = oVal; // 原单个虚拟节点
            map.set(el, mVal);
            oVal = mVal;
        }
        oVal[vnode.t] = vnode; // 并入复合虚拟节点

        return oVal;
    }

    // 本方法调用的起点是组件的render方法
    function createDom(vnode, $thisContext) {
        let el, $$el;
        if (vnode.t) {
            if (vnode.m) {
                // HTML标准标准定义的标签以外，都按组件看待。推荐自定义标签名用半角减号连接，如my-tag

                // 子组件渲染
                let comp = new createComponentByVnode(vnode); // 属性作为配置选项直接全部传入(子虚拟节点也按属性$SLOT传入)
                vnode.o = comp; // 虚拟节点挂上组件实例

                el = comp.render(); // 渲染为DOM，初始配置已通过选项传入

                // 组件有ref属性时，建立关联关系 【refs:{ c:{组件}， e:{节点} }】
                let refs, cls;
                if (vnode.a && vnode.a.ref) {
                    // 默认上下文是当前组件，但slot的话需要由原组件对象管理，slot的原组件对象在虚拟节点属性中
                    let $context = vnode.a.$context || $thisContext;
                    refs = $context.$refs = $context.$refs || {};
                    let ref = (refs.c = refs.c || {});
                    cls = ref[vnode.a.ref] = ref[vnode.a.ref] || uid("_ref_"); // 类名

                    // TODO 挂载前也能取。。。
                }

                if (el) {
                    $$el = $$(el);
                    $$el.addClass(comp.$COMPONENT_ID); // 使用组件对象ID插入到组件根节点class上建立关联

                    // 组件有ref属性时，建立关联关系 【refs:{ c:{组件}， e:{节点} }】
                    cls && $$el.addClass((vnode.r = cls)); // r=cls. 查找时，通过引用名查得cls，由cls查得DOM，由DOM查得单个或复合虚拟节点，再遍历比较虚拟节点的r可找到对应的组件虚拟节点，最后拿到组件对象
                }
            } else {
                // <script>标签特殊处理，创建<script>标签直接加到head中
                if (/^script$/i.test(vnode.t)) {
                    return loadScript(vnode.a);
                }
                // <link>标签特殊处理，创建<link>标签直接加到head中
                if (/^link$/i.test(vnode.t)) {
                    return loadLink(vnode.a);
                }

                // 创建节点【g属性代表SVG标签或SVG子标签，SVG标签及其子标签都用createElementNS创建，其他操作雷同】
                el = vnode.g ? document.createElementNS("http://www.w3.org/2000/svg", vnode.t) : document.createElement(vnode.t);
                $$el = $$(el);

                // 属性设定
                if (vnode.a) {
                    for (let k in vnode.a) {
                        if (k == "ref") {
                            // 对ref属性做特殊处理：添加相应类名便于查找
                            let $context = vnode.a.$context || $thisContext;
                            let refs = ($context.$refs = $context.$refs || {});
                            let ref = (refs.e = refs.e || {});
                            let cls = (ref[vnode.a[k]] = ref[vnode.a[k]] || uid("_ref_")); // 类名
                            $$el.addClass((vnode.r = cls)); // r=cls，查找时，通过引用名查得cls，由cls查得DOM

                            // TODO 挂载前也能取。。。
                        }
                        $$el.attr(k, vnode.a[k]);
                    }
                }

                // 事件绑定
                if (vnode.e) {
                    for (let k in vnode.e) {
                        if (isFunction(vnode.e[k])) {
                            $$(el).on(k, vnode.e[k]);
                        } else if (vnode.e[k] == undefined) {
                            // 没有定义事件处理方法，忽略
                        } else {
                            console.error("invalid event handle:", k, "=", vnode.e[k]); // 绑定的不是方法
                        }
                    }
                }

                // 创建子组件
                if (vnode.c) {
                    for (let i = 0, vn, dom; (vn = vnode.c[i++]); ) {
                        dom = createDom(vn, $thisContext); // 可能undefined。。。。。。<script>或<link>
                        dom && el.appendChild(dom);
                    }
                }

                // TODO 含slot属性模板标签的特殊考虑
            }
        } else {
            el = document.createTextNode(vnode.s);
        }

        // 每个真实DOM节点都关联一个对应的虚拟节点
        el && domVnode(el, vnode);

        return el;
    }

    function assignOptions(...objs) {
        if (objs.length == 1) {
            return objs[0];
        }

        let rs = objs[0];
        for (let i = 1; i < objs.length; i++) {
            for (let k in objs[i]) {
                if (k == "ref") {
                    continue; // ref属性仅组件内部使用，不能被外部覆盖
                }
                if (k == "class") {
                    if (isString(objs[i][k])) {
                        let ary = objs[i][k].split(/\s/);
                        let objCls = {};
                        ary.forEach(v => v.trim() && (objCls[v] = 1));
                        rs[k] = objCls;
                    } else {
                        rs[k] = objs[i][k]; // Plain Object
                    }
                } else {
                    rs[k] = objs[i][k];
                }
            }
        }
        return rs;
    }

    function loadScript(attr) {
        let ary = loadScript.s || (loadScript.s = []);
        // 仅支持含src属性的<script>标签，否则忽略。相同src只建一次
        if (!attr || !attr.src || ary.includes(attr.src)) {
            return;
        }
        ary.push(attr.src);

        let el = document.createElement("script");
        el.src = attr.src;
        el.type = attr.type || "text/javascript";

        document.head.appendChild(el);
    }

    function loadLink(attr) {
        let ary = loadLink.s || (loadLink.s = []);
        // 仅支持含href属性的<link>标签，否则忽略。相同href只建一次
        if (!attr || !attr.href || ary.includes(attr.href)) {
            return;
        }
        ary.push(attr.href);

        let el = document.createElement("link");
        el.href = attr.href;
        el.rel = attr.rel || "stylesheet";

        document.head.appendChild(el);
    }

    // ---------------------------
    // 组件增强器
    // ---------------------------

    // Component - 组件函数/类
    // args - 初始化构造参数
    // 返回增强后的组件对象
    function enhance(Component, ...args) {
        let oComp = new Component(...args);

        // 添加字段
        enhanceFields(oComp); // 组件对象ID等

        // 添加方法
        enhanceRender(oComp); // 组件渲染
        enhanceState(oComp); // 组件状态存取
        enhanceRef(oComp); // 按引用名取DOM节点或组件对象
        enhanceRoot(oComp); // 取组件根节点DOM元素

        return oComp;
    }
    // ---------------------------
    // 组件增强器
    // ---------------------------

    // 动态增加组件字段属性
    function enhanceFields(component) {
        // 【1】组件对象ID （也是组件根节点的一个class）
        Object.defineProperty(component, "$COMPONENT_ID", {
            value: uid("_cid_")
        });

        // 【2】是否初次渲染
        Object.defineProperty(component, "isInitRender", {
            value: true,
            writable: true
        });
    }

    // ---------------------------
    // 组件增强器
    // ---------------------------

    // 动态增加组件渲染功能
    function enhanceRender(component) {
        !component.render &&
            Object.defineProperty(component, "render", {
                get: () =>
                    function(state = {}) {
                        let el, $$el, vnode;

                        // 首次渲染，或再次渲染但找不到根节点时，按数据创建根节点返回
                        if (this.isInitRender) {
                            extend(this.$state, state, this.$STATE_KEYS); // 深度克隆数据
                            vnode = this.nodeTemplate(this.$state, this.$options, this.$actions, this); // 生成节点信息数据进行组件渲染
                            el = createDom(vnode, this); // TODO 运行期检查结果是否正确？ // 默认上下文是当前组件，但slot需要由原组件管理，但又但是，通常不应该在组件标签上写slot属性
                            if (el && el.nodeType == 1) {
                                $$(el).addClass(this.$COMPONENT_ID);
                            }
                            this.isInitRender = false;
                            return el;
                        }

                        // 再次渲染，先保存数据，再更新视图
                        extend(this.$state, state, this.$STATE_KEYS); // 深度克隆数据

                        $$el = $$("." + this.$COMPONENT_ID);
                        if (!$$el.length) {
                            warn("dom node missing"); // 组件根节点丢失无法再次渲染
                            return;
                        }

                        if (this.$updater) {
                            this.$updater(state); // 更关注更新性能时，自定义逻辑实现视图更新
                        } else {
                            let vnode2 = this.nodeTemplate(this.$state, this.$options, this.$actions, this);
                            diffRender(this, vnode2); // 默认使用虚拟节点比较进行差异更新
                        }

                        return el;
                    }
            });
    }

    // 动态增加组件状态存取功能
    function enhanceState(component) {
        /**
         * 取得组件对象的数据状态副本
         */
        Object.defineProperty(component, "getState", {
            get: () =>
                function() {
                    return extend({}, this.$state);
                }
        });

        /**
         * 设定组件对象的数据状态，并更新视图
         * 总是先保存数据状态后更新视图
         */
        Object.defineProperty(component, "setState", {
            get: () =>
                function(state) {
                    state && this.render(state);
                }
        });
    }

    // 取组件根节点DOM元素
    function enhanceRoot(component) {
        /**
         * 取组件根节点DOM元素，取不到时返回null
         */
        Object.defineProperty(component, "getRootElement", {
            get: () =>
                function() {
                    let $$el = $$("." + this.$COMPONENT_ID);
                    return $$el.length ? $$el[0] : null;
                }
        });
    }

    // 动态增加组件状态存取功能
    function enhanceRef(component) {
        /**
         * 在组件范围内，按引用名查找DOM节点
         *
         * @name 引用名
         * @return DOM节点数组（找不到时数组长度为0）
         */
        Object.defineProperty(component, "getRefElements", {
            get: () =>
                function(name) {
                    let cls = this.$refs.e[name]; // 引用名对应一个动态初始化的类名
                    return cls ? [...new Set(document.querySelectorAll("." + cls))] : [];
                }
        });

        /**
         * 在组件范围内，按引用名查找组件对象
         *
         * @name 引用名
         * @return 组件对象数组（找不到时数组长度为0）
         */
        Object.defineProperty(component, "getRefComponents", {
            get: () =>
                function(name) {
                    let cls = this.$refs.c[name]; // 引用名对应一个组件对象ID，该ID已在相应节点的class中
                    if (!cls) {
                        return [];
                    }

                    let rs = [];
                    let els = [...new Set(document.querySelectorAll("." + cls))];

                    els.forEach(el => {
                        let vnode = domVnode(el);
                        if (vnode && vnode.M) {
                            // 复合虚拟节点（一个节点对应多个组件对象）
                            for (let k in vnode) {
                                if (vnode[k].r == cls) {
                                    rs.push(vnode[k].o);
                                    break;
                                }
                            }
                        } else {
                            // 独立虚拟节点（一个节点对应一个组件对象）
                            rs.push(vnode.o);
                        }
                    });

                    return rs;
                }
        });
    }

    // ---------------------------
    // 虚拟节点比较和差异更新
    // ---------------------------

    /**
     * 组件对象的虚拟节点比较及差异更新
     *
     * @param component 组件对象
     * @param vnode 新虚拟节点
     * @return 根节点，无根节点时undefined
     */
    function diffRender(component, vnode2) {
        // 组件根节点
        let $$el = $$("." + component.$COMPONENT_ID);
        if (!$$el.length) {
            error("root node not found:", component.$COMPONENT_ID); // 根节点找不到，通常不应该，多数是DOM节点被其他途径修改了
            return;
        }

        // 新虚拟节点不存在，意欲销毁组件对象
        if (!vnode2) {
            $$el.remove(); // 删除
            return;
        }

        // 找出原虚拟节点
        let vnode1 = domVnode($$el[0]);
        vnode1.M && (vnode1 = vnode1[vnode2.t]); // 复合节点时继续深究

        if (vnode2.m) {
            //		vnode1.o.setState(vnode2.c ? {[$SLOT]: vnode2.c} : undefined);	// 子组件对象时，交由子组件对象自己去做差异更新(如果有虚拟子节点则传入)
            vnode1.o.setState({ [$SLOT]: vnode2.c }); // 子组件对象时，交由子组件对象自己去做差异更新(传入虚拟子节点)
            return;
        }

        // 原虚拟节点找不到，或不是同一节点，替换
        let attr1 = (vnode1 || {}).a || {};
        let attr2 = vnode2.a || {};
        if (
            !vnode1 ||
            vnode1.k != vnode2.k ||
            ((vnode1.t || vnode1.t) && vnode1.t != vnode2.t) ||
            ((attr1.id || attr2.id) && attr1.id != attr2.id) ||
            ((attr1.ref || attr2.ref) && attr1.ref != attr2.ref)
        ) {
            let el = createDom(vnode2, component);
            $$el.replaceWith(el); // 替换
            return el;
        }

        // 属性差异比较更新
        let diffAttrs = getDiffAttrs(vnode1, vnode2);
        if (diffAttrs) {
            for (let k in diffAttrs) {
                vnode1.a[k] = diffAttrs[k];
                $$el.attr(k, diffAttrs[k]); // 属性更新
            }
        }

        // 子节点差异比较
        diffRenderChildern(component, $$el[0], vnode2);
        return $$el[0];
    }

    // TODO 优化算法
    function diffRenderChildern(component, parent, parentVnode2) {
        let childern1 = [...(parent.childNodes || [])];
        let childern2 = parentVnode2.c || [];

        // 原节点不存在，直接插入全部新子节点
        if (!childern1.length) {
            return childern2.forEach(vn => parent.appendChild(createDom(vn, component)));
        }

        // 包装成新数组便于打标记比较 (v：虚拟节点)
        let ary1 = [],
            ary2 = [];
        childern1.forEach(v => ary1.push({ vn: domVnode(v), el: v }));
        childern2.forEach(v => ary2.push({ vn: v }));

        let matchAll = 1;
        if (ary1.length == ary2.length) {
            // 大多情况下，都是节点没变仅修改属性，针对这种情况优化，直接按下标比较
            for (let i = 0, wv1, wv2; i < ary1.length; i++) {
                wv1 = ary1[i];
                wv2 = ary2[i];
                if (matchWvnode(wv1, wv2)) {
                    wv1.S = 1;
                    wv2.S = 1;
                    wv2.wv1 = wv1;
                } else {
                    matchAll = 0;
                    break;
                }
            }
        } else {
            matchAll = 0;
        }

        if (!matchAll) {
            // 非顺序完全一致，按普通算法比较
            ary2.forEach(wv => !wv.S && findVnode(ary1, wv)); // 查找并标记 (找到时都标记S:1)
            ary1.filter(wv => (wv.S ? 1 : $$(wv.el).remove() && 0)); // 原节点没被找出来的全部删除，并从包装数组中删除

            // 原节点被删光时，直接插入全部新子节点
            if (!ary1.length) {
                return ary2.forEach(wv => parent.appendChild(createDom(wv.vn, component)));
            }
        }

        // 按新虚拟节点顺序更新视图
        let j = 0;
        let wv1 = ary1[j];
        for (let i = 0, idx, wv2; i < ary2.length; i++) {
            wv2 = ary2[i];

            if (!wv2.S) {
                //console.info('----------diff----insert-------', wv2.vn, wv1)
                let el = createDom(wv2.vn, component);
                if (el) {
                    // 不是所有组件都会渲染返回节点
                    if (wv1) {
                        parent.insertBefore(el, wv1.el); // 在vnode1节点前插入新子节点
                    } else {
                        parent.appendChild(el); // 追加新子节点到尾部
                    }
                }
            } else {
                if (wv2.wv1 != wv1) {
                    //console.info('----------diff----move-------', wv1)
                    // 数组模拟移动，以保持和DOM操作顺序一致
                    ary1.splice(j, 0, ary1.splice(ary1.indexOf(wv2.wv1), 1)[0]); // 修改数组：移动idx元素到j前面
                    j++;

                    // TODO FixMe
                    // 真实DOM移动
                    parent.insertBefore(wv2.wv1.el, wv1.el); // 原节点不需要先删除 // parent.removeChild(wv2.wv1.el);

                    if (wv2.vn.m) {
                        // 是组件标签则调用组件对象做差异更新
                        wv2.wv1.vn[wv2.vn.t].o.setState({ [$SLOT]: wv2.vn.c }); // 传入子虚拟节点参数
                    } else {
                        let diffAttrs = getDiffAttrs(wv2.wv1.vn, wv2.vn); // 比较属性差异
                        if (diffAttrs) {
                            // 节点属性更新
                            for (let k in diffAttrs) {
                                wv2.wv1.vn.a[k] = diffAttrs[k];
                                $$el.attr(k, diffAttrs[k]);
                            }
                        } else if (!wv2.vn.t && wv2.wv1.vn.s != wv2.vn.s) {
                            // 文本节点字符串更新
                            wv2.wv1.vn.s = wv2.vn.s;
                            el.textContent = wv2.vn.s;
                        }
                    }
                } else {
                    // 一样顺序的相同节点，比较属性后继续下一个
                    if (wv2.vn.m) {
                        wv1.vn[wv2.vn.t].o.setState({ [$SLOT]: wv2.vn.c }); // 传入子虚拟节点参数
                    } else {
                        let diffAttrs = getDiffAttrs(wv1.vn, wv2.vn); // 比较属性差异
                        if (diffAttrs) {
                            //console.info('----------diff----update-------', diffAttrs)
                            // 节点属性更新
                            for (let k in diffAttrs) {
                                wv1.vn.a[k] = diffAttrs[k];
                                $$(wv1.el).attr(k, diffAttrs[k]);
                            }
                        } else if (!wv2.vn.t && wv1.vn.s != wv2.vn.s) {
                            //console.info('----------diff----update-------', wv1.vn)
                            // 文本节点字符串更新
                            wv1.vn.s = wv2.vn.s;
                            wv1.el.textContent = wv2.vn.s;
                        }
                    }
                    wv1 = ary1[++j];
                }
            }
        }

        // 非新建节点的子节点继续处理
        ary2.forEach(wv => {
            if (wv.S) {
                if (wv.vn.m) {
                    wv.wv1.vn[wv.vn.t].o.setState({ [$SLOT]: wv.vn.c }); // 传入子虚拟节点参数
                } else {
                    diffRenderChildern(component, wv.wv1.el, wv.vn);
                }
            }
        });
    }

    function findVnode(wvnodes, wv2) {
        let vnode1,
            vnode2 = wv2.vn;
        for (let i = 0, wv1; (wv1 = wvnodes[i++]); ) {
            if (matchWvnode(wv1, wv2)) {
                wv1.S = 1;
                wv2.S = 1;
                return (wv2.wv1 = wv1);
            }
        }
    }

    function matchWvnode(wv1, wv2) {
        if (wv1.S) {
            return 0; // 已标记过的不再匹配
        }

        let vnode1 = wv1.vn,
            vnode2 = wv2.vn;
        if (vnode1.M) {
            vnode1 = vnode1[vnode2.t];
            if (!vnode1) {
                return 0; // 新虚拟节点和当前的复合虚拟节点不能匹配
            }
        }

        let attr1 = vnode1.a || {};
        let attr2 = vnode2.a || {};
        // 标签名不同、或k值不同、或有属性id且不同、或有属性ref且不同、或其中一个是svg标签而另一个不是，肯定不一样
        if (
            vnode1.k != vnode2.k ||
            ((vnode1.t || vnode2.t) && vnode1.t != vnode2.t) ||
            ((attr1.id || attr2.id) && attr1.id != attr2.id) ||
            ((attr1.ref || attr2.ref) && attr1.ref != attr2.ref) ||
            ((vnode1.g || vnode2.g) && vnode1.g != vnode2.g) // SVG标签判断
        ) {
            return 0;
        }

        // 无法继续判断两者不一致，按相同节点看待
        return 1;
    }

    // 同一节点，比较先后虚拟节点的属性变更点
    function getDiffAttrs(vnode1, vnode2) {
        if (vnode1.x) {
            return 0; // log('GOOD： SKIP ATTR DIFF')
        }

        let attr1 = vnode1.a || {};
        let attr2 = vnode2.a || {};
        let keys2 = Object.keys(attr2);

        let rs = {};
        let has = 0;
        keys2.forEach(k => {
            if (attr1[k] != attr2[k]) {
                if (k == "class") {
                    let oDiff = getDiffClass(attr1[k], attr2[k]);
                    if (oDiff) {
                        rs[k] = oDiff;
                        has = 1;
                    }
                } else if (k == $SLOT) {
                    // TODO 虚拟子节点,忽略比较 ????
                } else if (k == "style") {
                    let oDiff = getDiffStyle(attr1[k], attr2[k]);
                    if (oDiff) {
                        rs[k] = oDiff;
                        has = 1;
                    }
                } else if (BOOL_PROPS.includes(k)) {
                    // 布尔型属性
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
        let obj1 = class1 || {};
        let obj2 = class2 || {};
        let keys2 = Object.keys(obj2);

        let rs = {};
        let has = 0;
        keys2.forEach(k => {
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
        let obj1 = parseStyleToObject(style1);
        let obj2 = parseStyleToObject(style2);
        let keys2 = Object.keys(obj2);

        let rs = {};
        let has = 0;
        keys2.forEach(k => {
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

    // ---------------------------
    // DOM挂载
    // ---------------------------
    function mount(dom, selector, context) {
        (context || document).querySelector(selector || "body").appendChild(dom);
    }

    // ---------------------------
    // 常用工具方法
    // ---------------------------

    // html特殊字符转义
    // < = &lt;
    // > = &gt;
    // " = &quot;
    //   = &nbsp;
    // & = &amp;
    function escapeHtml(html) {
        if (typeof html == "string") {
            //		return html.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
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
            for (let k in obj) {
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

    // 直接运算为false则返回false，字符串（不区分大小写）‘0’、‘f’、‘false’、‘n’、‘no’ 都为false，其他为true
    function toBoolean(arg) {
        if (!arg) return false;
        if (!isString(arg)) return true;
        return !/^(0|false|f|no|n)$/i.test((arg + "").trim());
    }

    // 深复制对象属性，与Object.assign(...)的区别在于
    // 1) 如果最后一个参数为数组，则该数组限定了复制的属性范围；如果是null等false值，则不复制；其他情况则复制所有属性
    // 2) 第一参数null时返回null不报错，其他参数null时忽略
    // 3) 对属性class做特殊处理
    // 4) 深度复制
    function extend(...args) {
        if (!args.length || isArray(args[0]) || !args[0]) return null;

        let keys = args[args.length - 1];
        if (!keys) return;

        let oOrig = args[0];
        oOrig.class = classToPlantObject(oOrig.class);

        if (isArray(keys)) {
            for (let i = 0, oCopy; i < args.length - 1; i++) {
                oCopy = args[i];
                if (oOrig !== oCopy && isPlainObject(oCopy)) {
                    keys.forEach(k => {
                        if (oCopy[k] !== undefined) {
                            k == "class" ? Object.assign(oOrig.class, classToPlantObject(oCopy[k])) : (oOrig[k] = _copyObjectValue(oCopy[k]));
                        }
                    });
                }
            }
        } else {
            for (let i = 1, oCopy; i < args.length; i++) {
                oCopy = args[i];
                if (oOrig !== oCopy && isPlainObject(oCopy)) {
                    for (let k in oCopy) {
                        k == "class" ? Object.assign(oOrig.class, classToPlantObject(oCopy[k])) : (oOrig[k] = _copyObjectValue(oCopy[k]));
                    }
                }
            }
        }
        return oOrig;
    }

    // 浅复制对象属性，与Object.assign(...)的区别在于
    // 1) 如果最后一个参数为数组，则该数组限定了复制的属性范围；如果是null等false值，则不复制；其他情况则复制所有属性
    // 2) 第一参数null时返回null不报错，其他参数null时忽略
    // 3) 对属性class做特殊处理
    function assign(...args) {
        if (!args.length || isArray(args[0]) || !args[0]) return null;

        let keys = args[args.length - 1];
        if (!keys) return;

        let oOrig = args[0];
        oOrig.class = classToPlantObject(oOrig.class);

        if (isArray(keys)) {
            for (let i = 1, oCopy; i < args.length - 1; i++) {
                oCopy = args[i];
                if (oOrig !== oCopy && isPlainObject(oCopy)) {
                    keys.forEach(k => {
                        if (oCopy[k] !== undefined) {
                            k == "class" ? Object.assign(oOrig.class, classToPlantObject(oCopy[k])) : (oOrig[k] = oCopy[k]);
                        }
                    });
                }
            }
        } else {
            for (let i = 1, oCopy; i < args.length; i++) {
                oCopy = args[i];
                if (oOrig !== oCopy && isPlainObject(oCopy)) {
                    for (let k in oCopy) {
                        k == "class" ? Object.assign(oOrig.class, classToPlantObject(oCopy[k])) : (oOrig[k] = oCopy[k]);
                    }
                }
            }
        }
        return oOrig;
    }

    // "abc def" => {abc:1, def:1}
    function classToPlantObject(str) {
        if (str == null) {
            return {};
        }
        if (isPlainObject(str)) {
            return str;
        }

        let ary = str.split(/\s/);
        let objCls = {};
        ary.forEach(v => v.trim() && (objCls[v] = 1));
        return objCls;
    }

    function _copyObjectValue(obj) {
        if (!obj || obj.$COMPONENT_ID) {
            return obj; // undefined、null、false、‘’、0、组件对象
        }

        if (isPlainObject(obj)) {
            let rs = {};
            for (var key in obj) {
                rs[key] = _copyObjectValue(obj[key]);
            }
            return rs;
        }
        if (isArray(obj)) {
            let rs = [];
            for (var i = 0; i < obj.length; i++) {
                rs[i] = _copyObjectValue(obj[i]);
            }
            return rs;
        }
        if (isDate(obj)) {
            return new Date(obj.getTime());
        }
        if (isMap(obj)) {
            return new Map(obj); // Map中的值不一定合适克隆，仅简单复制键值
        }
        if (isSet(obj)) {
            return new Set(obj);
        }

        /*
	// RegExp不常用，更不常修改，一般不克隆
	if ( isRegExp(obj) ) {
		let flgs = '';
		obj.ignoreCase && (flgs += 'i')
		obj.multiline && (flgs += 'm')
		obj.global && (flgs += 'g')
		return new RegExp(obj.source, flgs);
	}
*/

        return obj;
    }

    // ---------------------------
    // API
    // ---------------------------
    var api = {};

    api.$$ = $$; // 常用DOM操作

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

    /*
api.isFunction = isFunction;
api.isEmpty = isEmpty;
api.uid = uid;

api.diffRender = diffRender;




api.get = css => {
	let a =	domVnode($$(css)[0])
	return a
		};

*/

    // 仅支持浏览器
    window.rpose = api;
})(window, document);

(function($$, escapeHtml) {
    // 组件注册
    rpose.registerComponents({
        "```": $BuildIn$_193408709,
        "ui-blockquote": UiBlockquote,
        "ui-button": UiButton,
        "ui-line": UiLine,
        "ui-navbar": UiNavbar,
        "ui-sidemenu": UiSidemenu,
        "p101-rpose-start": P101RposeStart
    });

    // ------------------------------------------------------------------------------------------------------
    // 组件 $BuildIn$_193408709
    // 注:应通过rpose.newComponentProxy方法创建组件代理对象后使用，而不是直接调用方法或用new创建
    // ------------------------------------------------------------------------------------------------------

    // 属性接口定义
    $BuildIn$_193408709.prototype.$OPTION_KEYS = ["lang", "height", "$code"]; // 可通过标签配置的属性，未定义则不支持外部配置
    $BuildIn$_193408709.prototype.$STATE_KEYS = null; // 可更新的state属性，未定义则不支持外部更新state

    // 组件函数
    function $BuildIn$_193408709(options = {}) {
        // 组件默认选项值
        this.$options = {};
        rpose.extend(this.$options, options, this.$OPTION_KEYS); // 按属性接口克隆配置选项

        // 组件默认数据状态值 （TODO：声明式简化实现数据双向绑定？）
        this.$state = {};

        // 自定义方法
        this.render = (state = {}) => {
            if (this.isInitRender) {
                rpose.extend(this.$state, state, this.$STATE_KEYS);
                let vnode = this.nodeTemplate(this.$state, this.$options, this.$actions);
                let el = rpose.createDom(vnode, this);
                if (el && el.nodeType == 1) {
                    $$(el).addClass(this.$COMPONENT_ID);
                    $$(el).attr(
                        "innerHTML",
                        `<code lang="${this.$options.lang}" class="hljs" style="max-height:${this.$options.height}">${this.$options.$code}</code>`
                    );
                }
                this.isInitRender = false;
                return el;
            }
        };
    }

    /**
     * 节点模板函数
     */
    $BuildIn$_193408709.prototype.nodeTemplate = function nodeTemplate($state, $options, $actions, $this) {
        return { r: 1, t: "pre", x: 1, k: 1 };
    };

    // ------------------------------------------------------------------------------------------------------
    // 组件 UiBlockquote
    // 注:应通过rpose.newComponentProxy方法创建组件代理对象后使用，而不是直接调用方法或用new创建
    // ------------------------------------------------------------------------------------------------------

    // 属性接口定义
    UiBlockquote.prototype.$OPTION_KEYS = null; // 可通过标签配置的属性，未定义则不支持外部配置
    UiBlockquote.prototype.$STATE_KEYS = ["text"]; // 可更新的state属性，未定义则不支持外部更新state

    // 组件函数
    function UiBlockquote(options = {}) {
        // 组件默认选项值
        this.$options = {};

        // 组件默认数据状态值 （TODO：声明式简化实现数据双向绑定？）
        this.$state = {
            text: ""
        };
        rpose.extend(this.$state, options, this.$STATE_KEYS); // 按属性接口克隆数据状态
    }

    /**
     * 节点模板函数
     */
    UiBlockquote.prototype.nodeTemplate = function nodeTemplate($state, $options, $actions, $this) {
        let text = $state.text;
        return { r: 1, t: "blockquote", a: { class: { _1gia932: 1 } }, c: [{ s: escapeHtml(text), k: 2 }], x: 1, k: 1 };
    };

    // ------------------------------------------------------------------------------------------------------
    // 组件 UiButton
    // 注:应通过rpose.newComponentProxy方法创建组件代理对象后使用，而不是直接调用方法或用new创建
    // ------------------------------------------------------------------------------------------------------

    // 属性接口定义
    UiButton.prototype.$OPTION_KEYS = ["onclick"]; // 可通过标签配置的属性，未定义则不支持外部配置
    UiButton.prototype.$STATE_KEYS = ["value", "disabled"]; // 可更新的state属性，未定义则不支持外部更新state

    // 组件函数
    function UiButton(options = {}) {
        // 组件默认选项值
        this.$options = {};
        rpose.extend(this.$options, options, this.$OPTION_KEYS); // 按属性接口克隆配置选项

        // 组件默认数据状态值 （TODO：声明式简化实现数据双向绑定？）
        this.$state = {};
        rpose.extend(this.$state, options, this.$STATE_KEYS); // 按属性接口克隆数据状态
    }

    /**
     * 节点模板函数
     */
    UiButton.prototype.nodeTemplate = function nodeTemplate($state, $options, $actions, $this) {
        return {
            r: 1,
            t: "button",
            e: { click: $options.onclick },
            a: { class: { _e2kbfz: 1 }, disabled: escapeHtml(!!$state.disabled) },
            c: [{ s: escapeHtml($state.value), k: 2 }],
            k: 1
        };
    };

    // ------------------------------------------------------------------------------------------------------
    // 组件 UiLine
    // 注:应通过rpose.newComponentProxy方法创建组件代理对象后使用，而不是直接调用方法或用new创建
    // ------------------------------------------------------------------------------------------------------

    // 属性接口定义
    UiLine.prototype.$OPTION_KEYS = ["height", "width", "color", "margin"]; // 可通过标签配置的属性，未定义则不支持外部配置
    UiLine.prototype.$STATE_KEYS = null; // 可更新的state属性，未定义则不支持外部更新state

    // 组件函数
    function UiLine(options = {}) {
        // 组件默认选项值
        this.$options = {
            height: "1px",
            width: "98%",
            color: "#e6e6e6",
            margin: "20px auto 20px auto"
        };
        rpose.extend(this.$options, options, this.$OPTION_KEYS); // 按属性接口克隆配置选项

        // 组件默认数据状态值 （TODO：声明式简化实现数据双向绑定？）
        this.$state = {};
    }

    /**
     * 节点模板函数
     */
    UiLine.prototype.nodeTemplate = function nodeTemplate($state, $options, $actions, $this) {
        let color = $options.color;
        let height = $options.height;
        let margin = $options.margin;
        let width = $options.width;
        return { r: 1, t: "div", a: { style: "background-color:" + color + ";height:" + height + ";width:" + width + ";margin:" + margin }, k: 1 };
    };

    // ------------------------------------------------------------------------------------------------------
    // 组件 UiNavbar
    // 注:应通过rpose.newComponentProxy方法创建组件代理对象后使用，而不是直接调用方法或用new创建
    // ------------------------------------------------------------------------------------------------------

    // 属性接口定义
    UiNavbar.prototype.$OPTION_KEYS = null; // 可通过标签配置的属性，未定义则不支持外部配置
    UiNavbar.prototype.$STATE_KEYS = null; // 可更新的state属性，未定义则不支持外部更新state

    // 组件函数
    function UiNavbar(options = {}) {
        // 组件默认选项值
        this.$options = {};

        // 组件默认数据状态值 （TODO：声明式简化实现数据双向绑定？）
        this.$state = {};

        // 事件处理器
        this.$actions = {
            openside: e => rpose.at("openside")
        };
    }

    /**
     * 节点模板函数
     */
    UiNavbar.prototype.nodeTemplate = function nodeTemplate($state, $options, $actions, $this) {
        return {
            r: 1,
            t: "nav",
            a: { class: { _xkf8gf: 1 } },
            c: [
                {
                    t: "div",
                    e: { click: $actions.openside },
                    a: { class: { _8ll8p5: 1 } },
                    c: [
                        {
                            t: "svg",
                            a: { width: "30", height: "30" },
                            c: [
                                { t: "path", a: { d: "M0,5 30,5", stroke: "#ddd", "stroke-width": "5" }, x: 1, k: 4, g: 1 },
                                { t: "path", a: { d: "M0,14 30,14", stroke: "#ddd", "stroke-width": "5" }, x: 1, k: 5, g: 1 },
                                { t: "path", a: { d: "M0,23 30,23", stroke: "#ddd", "stroke-width": "5" }, x: 1, k: 6, g: 1 }
                            ],
                            x: 1,
                            k: 3,
                            g: 1
                        }
                    ],
                    x: 1,
                    k: 2
                },
                {
                    t: "ul",
                    a: { class: { _1scnd42: 1 } },
                    c: [
                        { t: "li", c: [{ t: "a", a: { href: "../../index.html" }, c: [{ s: "Home", k: 10 }], x: 1, k: 9 }], x: 1, k: 8 },
                        {
                            t: "li",
                            c: [{ t: "a", a: { href: "https://github.com/gotoeasy/rpose" }, c: [{ s: "Repository", k: 13 }], x: 1, k: 12 }],
                            x: 1,
                            k: 11
                        },
                        {
                            t: "li",
                            c: [{ t: "a", a: { href: "https://github.com/gotoeasy/rpose/issues" }, c: [{ s: "Issues", k: 16 }], x: 1, k: 15 }],
                            x: 1,
                            k: 14
                        }
                    ],
                    x: 1,
                    k: 7
                }
            ],
            x: 1,
            k: 1
        };
    };

    // ------------------------------------------------------------------------------------------------------
    // 组件 UiSidemenu
    // 注:应通过rpose.newComponentProxy方法创建组件代理对象后使用，而不是直接调用方法或用new创建
    // ------------------------------------------------------------------------------------------------------

    // 属性接口定义
    UiSidemenu.prototype.$OPTION_KEYS = null; // 可通过标签配置的属性，未定义则不支持外部配置
    UiSidemenu.prototype.$STATE_KEYS = ["show"]; // 可更新的state属性，未定义则不支持外部更新state

    // 组件函数
    function UiSidemenu(options = {}) {
        // 组件默认选项值
        this.$options = {};

        // 组件默认数据状态值 （TODO：声明式简化实现数据双向绑定？）
        this.$state = {
            show: false
        };
        rpose.extend(this.$state, options, this.$STATE_KEYS); // 按属性接口克隆数据状态

        // 事件处理器
        this.$actions = {
            closeside: e => rpose.at("closeside")
        };

        // 自定义方法
        this.init = () => {
            rpose.on("openside", () => {
                let el = this.getRefElement("sidemenu");
                el && (el.style.width = "250px");
            });
            rpose.on("closeside", () => {
                let el = this.getRefElement("sidemenu");
                el && (el.style.width = "0");
            });
        };
    }

    /**
     * 节点模板函数
     */
    UiSidemenu.prototype.nodeTemplate = function nodeTemplate($state, $options, $actions, $this) {
        return {
            r: 1,
            t: "div",
            a: { class: { _1kodgs3: 1 }, ref: "sidemenu", $context: $this },
            c: [
                {
                    t: "ul",
                    a: { class: { _3oxtke: 1 } },
                    c: [
                        {
                            t: "li",
                            c: [
                                {
                                    t: "a",
                                    e: { click: $actions.closeside },
                                    a: { href: "#", class: { _1acq7dh: 1 } },
                                    c: [{ s: "X", k: 5 }],
                                    x: 1,
                                    k: 4
                                }
                            ],
                            x: 1,
                            k: 3
                        },
                        { t: "li", c: [{ t: "a", a: { href: "#" }, c: [{ s: "NNNN", k: 8 }], x: 1, k: 7 }], x: 1, k: 6 },
                        { t: "li", c: [{ t: "a", a: { href: "#" }, c: [{ s: "NNNN", k: 11 }], x: 1, k: 10 }], x: 1, k: 9 },
                        { t: "li", c: [{ t: "a", a: { href: "#" }, c: [{ s: "NNNN", k: 14 }], x: 1, k: 13 }], x: 1, k: 12 }
                    ],
                    x: 1,
                    k: 2
                }
            ],
            k: 1
        };
    };

    // ------------------------------------------------------------------------------------------------------
    // 组件 P101RposeStart
    // 注:应通过rpose.newComponentProxy方法创建组件代理对象后使用，而不是直接调用方法或用new创建
    // ------------------------------------------------------------------------------------------------------

    // 属性接口定义
    P101RposeStart.prototype.$OPTION_KEYS = null; // 可通过标签配置的属性，未定义则不支持外部配置
    P101RposeStart.prototype.$STATE_KEYS = null; // 可更新的state属性，未定义则不支持外部更新state

    // 组件函数
    function P101RposeStart(options = {}) {
        // 组件默认选项值
        this.$options = {};

        // 组件默认数据状态值 （TODO：声明式简化实现数据双向绑定？）
        this.$state = {};

        // 事件处理器
        this.$actions = {
            next: e => {
                location.href = "p102-demo-helloworld.html";
            }
        };
    }

    /**
     * 节点模板函数
     */
    P101RposeStart.prototype.nodeTemplate = function nodeTemplate($state, $options, $actions, $this) {
        return {
            r: 1,
            t: "div",
            c: [
                { t: "ui-navbar", m: 1, k: 2 },
                { t: "ui-sidemenu", m: 1, k: 3 },
                {
                    t: "div",
                    a: { class: { _1h70q0v: 1 } },
                    c: [
                        { t: "ui-blockquote", a: { text: "初识 rpose" }, m: 1, k: 5 },
                        { t: "br", x: 1, k: 6 },
                        { s: "\r\n        问：简单介绍下rpose", k: 7 },
                        { t: "br", x: 1, k: 8 },
                        { s: "\r\n        答：说来话长，就算是个前端框架吧", k: 9 },
                        { t: "br", x: 1, k: 10 },
                        { t: "br", x: 1, k: 11 },
                        { s: "\r\n        问：为何放着angular react vue等不用，还要造轮子？", k: 12 },
                        { t: "br", x: 1, k: 13 },
                        { s: "\r\n        答：angular太复杂，react的jsx难以忍受，vue指令太多，(回答像是有点假) ......", k: 14 },
                        { t: "br", x: 1, k: 15 },
                        { t: "br", x: 1, k: 16 },
                        { s: "\r\n        问：能写得比它们还好？", k: 17 },
                        { t: "br", x: 1, k: 18 },
                        { s: "\r\n        答：能写得更加舒服", k: 19 },
                        { t: "br", x: 1, k: 20 },
                        { t: "br", x: 1, k: 21 },
                        { s: "\r\n        问：rpose有什么特点？", k: 22 },
                        { t: "br", x: 1, k: 23 },
                        { s: "\r\n        答：精致（精力有限简化导致^_^）、更少的概念、更多的便易、换取更多的精力关注业务实现", k: 24 },
                        { t: "br", x: 1, k: 25 },
                        { t: "br", x: 1, k: 26 },
                        { s: "\r\n        问：使用rpose需要什么技能？", k: 27 },
                        { t: "br", x: 1, k: 28 },
                        { s: "\r\n        答：不用技能，只要基础，三驾马车 HTML/JS/CSS 大体就够了", k: 29 },
                        { t: "br", x: 1, k: 30 },
                        { t: "br", x: 1, k: 31 },
                        { s: "\r\n        问：有实际例子吗？", k: 32 },
                        { t: "br", x: 1, k: 33 },
                        { s: "\r\n        答：本文就是用rpose写的，往下看了解更多", k: 34 },
                        { t: "br", x: 1, k: 35 },
                        { t: "ui-line", m: 1, k: 36 },
                        { t: "ui-blockquote", a: { text: "1.0 基于Block-Text-File的源码格式" }, m: 1, k: 37 },
                        { s: "\r\n        代码文件基于Block-Text-File格式，为了简化，不使用其中的多文档功能", k: 38 },
                        { t: "br", x: 1, k: 39 },
                        { s: "\r\n        Block-Text-File格式定义详见 ", k: 40 },
                        {
                            t: "a",
                            a: { href: "https://github.com/gotoeasy/block-text-file", target: "_blank" },
                            c: [{ s: "链接", k: 42 }],
                            x: 1,
                            k: 41
                        },
                        { t: "br", x: 1, k: 43 },
                        { t: "br", x: 1, k: 44 },
                        { s: "\r\n        大体形同ini文件，易读性高，就像下面这个\r\n", k: 45 },
                        {
                            t: "```",
                            a: {
                                lang: "btf",
                                $code:
                                    '<ol><li>[abc] <span class="hljs-comment">// 块名后的内容自动忽略，可作注释用途</span></li><li>NNNNNNNNNNNNNN</li><li>NNNNNNNNNNNNNNNN</li><li>NNNNNNNNNNNNNNNNNNN</li><li></li><li>[<span class="hljs-function"><span class="hljs-keyword">def</span>]<span class="hljs-title">\r</span></span></li><li>NNNNNNNNNNNNNN</li><li>NNNNNNNNNNNNNNNNNNN</li><li>NNNNNNNNNNNNNNNN</li><li>--------- 这里用<span class="hljs-number">9</span>个半角减号作为块结束行，代表[abc]的内容已结束</li><li><span class="hljs-comment">// 结束后的内容会被忽略，作为代码文件用途也就形同注释用了</span></li><li></li><li>更详尽的格式定义，详见 https:<span class="hljs-comment">//github.com/gotoeasy/block-text-file</span></li></ol>'
                            },
                            m: 1,
                            k: 46
                        },
                        { t: "ui-line", m: 1, k: 47 },
                        { t: "ui-blockquote", a: { text: "1.1 组件式开发，一个组件对应一个文件" }, m: 1, k: 48 },
                        { s: "\r\n        流行习惯，rpose简化的把一切都作组件看待，比如页面也是组件", k: 49 },
                        { t: "br", x: 1, k: 50 },
                        { s: "\r\n        代码文件目录组织上，可设定组件目录，主要是为了区分页面，因为页面最终是要打包的", k: 51 },
                        { t: "br", x: 1, k: 52 },
                        { t: "br", x: 1, k: 53 },
                        { s: "\r\n        更多具体内容，详见工程配置", k: 54 },
                        { t: "br", x: 1, k: 55 },
                        { t: "ui-line", m: 1, k: 56 },
                        { t: "ui-blockquote", a: { text: "1.2 约定的文本块写法" }, m: 1, k: 57 },
                        { s: "\r\n        rpose常用块名有[api]、[view]、[options]、[state]、[actions]、[css]、[mount]等", k: 58 },
                        { t: "br", x: 1, k: 59 },
                        { s: "\r\n        注：当前版本尚未稳定，块名可能调整", k: 60 },
                        { t: "br", x: 1, k: 61 },
                        { t: "br", x: 1, k: 62 },
                        { s: "\r\n        块名用途分别说明如下\r\n", k: 63 },
                        {
                            t: "```",
                            a: {
                                lang: "btf",
                                $code:
                                    '<ol><li>[<span class="hljs-meta">api</span>] <span class="hljs-comment">// 用于声明组件接口特征</span></li><li><span class="hljs-comment">// 就像写配置文件一样任性</span></li><li>optionkeys = <span class="hljs-keyword">value</span>, disabled, onclick   <span class="hljs-comment">// 允许配置的属性</span></li><li>statekeys  = <span class="hljs-keyword">value</span>, disabled            <span class="hljs-comment">// 允许修改的状态属性</span></li></ol>'
                            },
                            m: 1,
                            k: 64
                        },
                        {
                            t: "```",
                            a: {
                                lang: "btf",
                                $code:
                                    '<ol><li><span class="xml">[view] // 写视图模板，亲近html标签的写法</li><li><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span></li><li>    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>Hello </span><span class="hljs-template-variable">{$state.name}</span><span class="xml">, I am </span><span class="hljs-template-variable">{$options.name}</span><span class="xml">.<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span></li><li>    <span class="hljs-tag">&lt;<span class="hljs-name">ui-button</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"确定"</span> <span class="hljs-attr">onclick</span>=<span class="hljs-string">"fnClick"</span> /&gt;</span></li><li><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></li><li>---------</li><li>// 模板语法简要</li><li>直接写js代码： </span><span class="hljs-template-variable">{% /* 这里写代码 */ %}</span><span class="xml"></li><li>默认转义特殊字符的表达式： </span><span class="hljs-template-variable">{theVar}</span><span class="xml"></li><li>不做转义处理的表达式： </span><span class="hljs-template-variable">{=theVar}</span><span class="xml"></li><li>比如</li><li></span><span class="hljs-template-variable">{% <span class="hljs-keyword">if</span> (条件) { %}</span><span class="xml"></li><li><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span></span><span class="hljs-template-variable">{name}</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></li><li></span><span class="hljs-template-variable">{% }</span><span class="xml"> %}</span></li></ol>'
                            },
                            m: 1,
                            k: 65
                        },
                        {
                            t: "```",
                            a: {
                                lang: "btf",
                                $code:
                                    '<ol><li><span class="hljs-selector-attr">[options]</span> <span class="hljs-comment">// 写默认选项数据，通常是一经设定就不会修改的内容</span></li><li>{</li><li>    <span class="hljs-attribute">name</span>: <span class="hljs-string">\'rpose\'</span></li><li>}</li></ol>'
                            },
                            m: 1,
                            k: 66
                        },
                        {
                            t: "```",
                            a: {
                                lang: "btf",
                                $code:
                                    "<ol><li>[<span class=\"hljs-keyword\">state</span>] // 写默认状态数据，通常是可以被修改的内容</li><li>{</li><li>    name: ''</li><li>}</li></ol>"
                            },
                            m: 1,
                            k: 67
                        },
                        {
                            t: "```",
                            a: {
                                lang: "btf",
                                $code:
                                    '<ol><li>[actions] <span class="hljs-comment">// 写事件响应函数，如按钮点击等</span></li><li>{</li><li>    <span class="hljs-comment">// 响应“确定”按钮点击事件，通过view中onclick的设定进行关联</span></li><li>    fnClick: <span class="hljs-function"><span class="hljs-params">e</span> =&gt;</span> {</li><li>        <span class="hljs-built_in">console</span>.info(<span class="hljs-string">"点击了按钮"</span>, e);</li><li>    }</li><li>}</li></ol>'
                            },
                            m: 1,
                            k: 68
                        },
                        {
                            t: "```",
                            a: {
                                lang: "btf",
                                $code:
                                    '<ol><li>[<span class="hljs-meta">css</span>] <span class="hljs-comment">// 写样式表</span></li><li>.my-<span class="hljs-keyword">class</span>{</li><li>    color: <span class="hljs-string">\'red\'</span></li><li>}</li></ol>'
                            },
                            m: 1,
                            k: 69
                        },
                        {
                            t: "```",
                            a: {
                                lang: "btf",
                                $code:
                                    '<ol><li>[<span class="hljs-meta">mount</span>] <span class="hljs-comment">// 本组件挂载点，常用于页面显示</span></li><li>body</li></ol>'
                            },
                            m: 1,
                            k: 70
                        },
                        { s: "没错，还可以写[less]、[scss]等，不止于此", k: 71 },
                        { t: "br", x: 1, k: 72 },
                        { t: "ui-line", m: 1, k: 73 },
                        { t: "ui-blockquote", a: { text: "1.3 小结" }, m: 1, k: 74 },
                        { s: "\r\n        通过本章节，对rpose的代码结构有个初步了解", k: 75 },
                        { t: "br", x: 1, k: 76 },
                        { s: "\r\n        实现效果放一边，意会下rpose的姿势优劣，感兴趣或有共鸣，随时继续下一章", k: 77 },
                        { t: "br", x: 1, k: 78 },
                        { t: "ui-line", m: 1, k: 79 },
                        { t: "ui-button", a: { value: "2 第一个 hello world 组件", onclick: $actions.next }, m: 1, k: 80 }
                    ],
                    x: 1,
                    k: 4
                },
                { t: "ui-line", m: 1, k: 81 },
                { t: "div", a: { style: "text-align:center;margin-bottom:20px" }, c: [{ s: "青松 2018.12", k: 83 }], x: 1, k: 82 }
            ],
            x: 1,
            k: 1
        };
    };

    // 组件挂载
    rpose.mount(rpose.newComponentProxy("p101-rpose-start").render(), "body");
})(rpose.$$, rpose.escapeHtml);
