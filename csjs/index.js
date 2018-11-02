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
    const ChildVnodes = "ChildVnodes";
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
        let at = (el, prop, val) => (callbacks[toLowerCase(el.tagName + "." + prop)] || callbacks[toLowerCase(prop)] || callbacks["*"]).apply(this, [el, prop, val]); // 优先级： tag.prop > prop > *

        // ------------------
        // 普通属性存取
        on("*", (el, prop, val) => (isFunction(val) || val == null ? el.getAttribute(prop) : el.setAttribute(prop, val))); // 不支持值为函数的设定，按取值处理

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
            document.addEventListener ? document.addEventListener(name, fnDocumentEventListener, false) : document.attachEvent ? document.attachEvent("on" + name, fnDocumentEventListener) : (document["on" + name] = fnDocumentEventListener);
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
        let opt = assign({}, vnode.a || {}, vnode.c && vnode.c.length ? { [ChildVnodes]: vnode.c } : {}); // 传入属性和子虚拟节点
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
                let comp = new createComponentByVnode(vnode); // 属性作为配置选项直接全部传入(子虚拟节点也按属性childVnodes传入)
                vnode.o = comp; // 虚拟节点挂上组件实例
                el = comp.render(); // 渲染为DOM，初始配置已通过选项传入
                if (el) {
                    $$el = $$(el);
                    $$el.addClass(comp.$COMPONENT_ID); // 使用组件对象ID插入到组件根节点class上建立关联

                    // 组件有ref属性时，建立关联关系 【refs:{ c:{组件}， e:{节点} }】
                    if (vnode.a && vnode.a.ref) {
                        let refs = ($thisContext.$refs = $thisContext.$refs || {});
                        let ref = (refs.c = refs.c || {});
                        let cls = (ref[vnode.a.ref] = ref[vnode.a.ref] || uid("_ref_")); // 类名
                        $$el.addClass((vnode.r = cls)); // r=cls. 查找时，通过引用名查得cls，由cls查得DOM，由DOM查得单个或复合虚拟节点，再遍历比较虚拟节点的r可找到对应的组件虚拟节点，最后拿到组件对象
                    }
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

                // 创建节点
                el = document.createElement(vnode.t);
                $$el = $$(el);

                // 属性设定
                if (vnode.a) {
                    for (let k in vnode.a) {
                        if (k == "ref") {
                            // 对ref属性做特殊处理：添加相应类名便于查找
                            let refs = ($thisContext.$refs = $thisContext.$refs || {});
                            let ref = (refs.e = refs.e || {});
                            let cls = (ref[vnode.a[k]] = ref[vnode.a[k]] || uid("_ref_")); // 类名
                            $$el.addClass((vnode.r = cls)); // r=cls，查找时，通过引用名查得cls，由cls查得DOM
                        }
                        $$el.attr(k, vnode.a[k]);
                    }
                }

                // 事件绑定
                if (vnode.e) {
                    for (let k in vnode.e) {
                        if (isFunction(vnode.e[k])) {
                            $$(el).on(k, vnode.e[k]);
                        } else {
                            console.error("invalid event handle:", k, "=", vnode.e[k]); // 绑定的不是方法
                        }
                    }
                }

                // 创建子组件
                if (vnode.c) {
                    for (let i = 0, len = vnode.c.length, vn, dom; i < len; i++) {
                        vn = vnode.c[i];
                        if (vn) {
                            dom = createDom(vn, $thisContext); // 可能undefined。。。。。。<script>或<link>
                            dom && el.appendChild(dom);
                        }
                    }
                }
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
                            vnode = this.nodeTemplate(this.$state, this.$options, this.$methods); // 生成节点信息数据进行组件渲染
                            el = createDom(vnode, this); // TODO 运行期检查结果是否正确？
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
                            let vnode2 = this.nodeTemplate(this.$state, this.$options, this.$methods);
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
            //		vnode1.o.setState(vnode2.c ? {[ChildVnodes]: vnode2.c} : undefined);	// 子组件对象时，交由子组件对象自己去做差异更新(如果有虚拟子节点则传入)
            vnode1.o.setState({ [ChildVnodes]: vnode2.c }); // 子组件对象时，交由子组件对象自己去做差异更新(传入虚拟子节点)
            return;
        }

        // 原虚拟节点找不到，或不是同一节点，替换
        let attr1 = (vnode1 || {}).a || {};
        let attr2 = vnode2.a || {};
        if (!vnode1 || vnode1.k != vnode2.k || ((vnode1.t || vnode1.t) && vnode1.t != vnode2.t) || ((attr1.id || attr2.id) && attr1.id != attr2.id) || ((attr1.ref || attr2.ref) && attr1.ref != attr2.ref)) {
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

                    // 真实DOM移动
                    parent.insertBefore(wv2.wv1.el, wv1.el); // 原节点不需要先删除 // parent.removeChild(wv2.wv1.el);

                    if (wv2.vn.m) {
                        // 是组件标签则调用组件对象做差异更新
                        wv2.wv1.vn[wv2.vn.t].o.setState({ [ChildVnodes]: wv2.vn.c }); // 传入子虚拟节点参数
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
                        wv1.vn[wv2.vn.t].o.setState({ [ChildVnodes]: wv2.vn.c }); // 传入子虚拟节点参数
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
                    wv.wv1.vn[wv.vn.t].o.setState({ [ChildVnodes]: wv.vn.c }); // 传入子虚拟节点参数
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
        // 标签名不同、或k值不同、或有属性id且不同、或有属性ref且不同，肯定不一样
        if (vnode1.k != vnode2.k || ((vnode1.t || vnode1.t) && vnode1.t != vnode2.t) || ((attr1.id || attr2.id) && attr1.id != attr2.id) || ((attr1.ref || attr2.ref) && attr1.ref != attr2.ref)) {
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
                } else if (k == ChildVnodes) {
                    // 虚拟子节点,忽略比较
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
            return html
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;");
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
        if (!obj) {
            return obj; // undefined、null、false、‘’、0
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
        "css-reset": CssReset,
        index: index,
        "ui-button": UiButton,
        "ui-homepage": UiHomepage,
        "ui-layout": UiLayout,
        "ui-line": UiLine,
        "ui-loader": UiLoader,
        "ui-page-section": UiPageSection,
        "ui-sample": UiSample
    });

    // ------------------------------------------------------------------------------------------------------
    // 组件 CssReset
    // 注:应通过rpose.newComponentProxy方法创建组件代理对象后使用，而不是直接调用方法或用new创建
    // ------------------------------------------------------------------------------------------------------

    // 属性接口定义
    CssReset.prototype.$OPTION_KEYS = null; // 可通过标签配置的属性，未定义则不支持外部配置
    CssReset.prototype.$STATE_KEYS = null; // 可更新的state属性，未定义则不支持外部更新state

    // 组件函数
    function CssReset(options = {}) {
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
    CssReset.prototype.nodeTemplate = function nodeTemplate($state, $options, $methods) {
        return { r: 1, t: "link", a: { href: "../packages/reset.css", rel: "stylesheet" }, x: 1, k: 1 };
    };

    // ------------------------------------------------------------------------------------------------------
    // 组件 index
    // 注:应通过rpose.newComponentProxy方法创建组件代理对象后使用，而不是直接调用方法或用new创建
    // ------------------------------------------------------------------------------------------------------

    // 属性接口定义
    index.prototype.$OPTION_KEYS = null; // 可通过标签配置的属性，未定义则不支持外部配置
    index.prototype.$STATE_KEYS = null; // 可更新的state属性，未定义则不支持外部更新state

    // 组件函数
    function index(options = {}) {
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
    index.prototype.nodeTemplate = function nodeTemplate($state, $options, $methods) {
        return { r: 1, t: "ui-homepage", m: 1, k: 1 };
    };

    // ------------------------------------------------------------------------------------------------------
    // 组件 UiButton
    // 注:应通过rpose.newComponentProxy方法创建组件代理对象后使用，而不是直接调用方法或用new创建
    // ------------------------------------------------------------------------------------------------------

    // 属性接口定义
    UiButton.prototype.$OPTION_KEYS = ["onclick", "text", "icon", "id", "name", "tabIndex", "class", "style", "autofocus", "disabled", "hidden"]; // 可通过标签配置的属性，未定义则不支持外部配置
    UiButton.prototype.$STATE_KEYS = ["text", "class", "disabled", "hidden"]; // 可更新的state属性，未定义则不支持外部更新state

    // 组件函数
    function UiButton(options = {}) {
        // 组件默认选项值
        this.$options = {};
        rpose.extend(this.$options, options, this.$OPTION_KEYS); // 按属性接口克隆配置选项

        // 组件默认数据状态值 （TODO：声明式简化实现数据双向绑定？）
        this.$state = {};
        rpose.extend(this.$state, options, this.$STATE_KEYS); // 按属性接口克隆数据状态

        // 组件更新函数
        this.$updater = function updater(state) {
            let $$el = $$(this.getRootElement()); // 取本组件对象的根节点
            for (let k in state) {
                this.$STATE_KEYS.includes(k) && (k == "text" ? $$el.attr("textContent", state[k]) : $$el.attr(k, state[k])); // 指定属性范围内做更新
            }
        };
    }

    /**
     * 节点模板函数
     */
    UiButton.prototype.nodeTemplate = function nodeTemplate($state, $options, $methods) {
        return {
            r: 1,
            t: "button",
            e: { click: $options.onclick },
            a: rpose.assign(
                { class: { _ab2ae4cc616e889c72d4c0ce2477db8e: 1 }, disabled: escapeHtml($state.disabled), hidden: escapeHtml($state.hidden) },
                $options
            ),
            c: [{ s: escapeHtml($state.text), k: 2 }],
            k: 1
        };
    };

    // ------------------------------------------------------------------------------------------------------
    // 组件 UiHomepage
    // 注:应通过rpose.newComponentProxy方法创建组件代理对象后使用，而不是直接调用方法或用new创建
    // ------------------------------------------------------------------------------------------------------

    // 属性接口定义
    UiHomepage.prototype.$OPTION_KEYS = null; // 可通过标签配置的属性，未定义则不支持外部配置
    UiHomepage.prototype.$STATE_KEYS = null; // 可更新的state属性，未定义则不支持外部更新state

    // 组件函数
    function UiHomepage(options = {}) {
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
    UiHomepage.prototype.nodeTemplate = function nodeTemplate($state, $options, $methods) {
        return {
            r: 1,
            t: "div",
            a: { class: { _ca2d8121d9b72ad6d27022e348a799f8: 1 } },
            c: [
                { t: "ui-loader", m: 1, k: 2 },
                {
                    t: "div",
                    a: { class: { _03984be15b8b7a46214f0806255fe666: 1 } },
                    c: [
                        { t: "h2", a: { class: { _c0c391e5783d7d67ac00ab1aade15bdd: 1 } }, c: [{ s: "GOTOEASY", k: 5 }], x: 1, k: 4 },
                        {
                            t: "p",
                            a: { class: { _9e16083d714226b76da48b9a133ecefb: 1 } },
                            c: [{ s: " WRITE BUSINESS, RUNNING ", k: 7 }, { t: "br", x: 1, k: 8 }, { s: " PROGRAMMING SHOULD BE SO EASY", k: 9 }],
                            x: 1,
                            k: 6
                        },
                        { t: "ui-line", a: { width: "45%" }, m: 1, k: 10 },
                        { t: "br", x: 1, k: 11 },
                        {
                            t: "span",
                            a: { class: { _9e16083d714226b76da48b9a133ecefb: 1 } },
                            c: [{ s: "写业务，跑起来，编程理应如此简单", k: 13 }],
                            x: 1,
                            k: 12
                        },
                        {
                            t: "div",
                            a: { class: { _c8caf94205105bac5833ab31cc2129d7: 1 } },
                            c: [
                                {
                                    t: "a",
                                    a: { href: "https://github.com/gotoeasy/block-text-file", style: "margin:5px;width:100px" },
                                    c: [{ s: "BTF FILE SPEC", k: 16 }],
                                    x: 1,
                                    k: 15
                                },
                                {
                                    t: "a",
                                    a: { href: "http://gotoeasy.github.io/rpose", style: "margin:5px;width:100px" },
                                    c: [{ s: "RPOSE.JS", k: 18 }],
                                    x: 1,
                                    k: 17
                                }
                            ],
                            x: 1,
                            k: 14
                        }
                    ],
                    x: 1,
                    k: 3
                }
            ],
            x: 1,
            k: 1
        };
    };

    // ------------------------------------------------------------------------------------------------------
    // 组件 UiLayout
    // 注:应通过rpose.newComponentProxy方法创建组件代理对象后使用，而不是直接调用方法或用new创建
    // ------------------------------------------------------------------------------------------------------

    // 属性接口定义
    UiLayout.prototype.$OPTION_KEYS = null; // 可通过标签配置的属性，未定义则不支持外部配置
    UiLayout.prototype.$STATE_KEYS = ["ChildVnodes"]; // 可更新的state属性，未定义则不支持外部更新state

    // 组件函数
    function UiLayout(options = {}) {
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
    UiLayout.prototype.nodeTemplate = function nodeTemplate($state, $options, $methods) {
        let ChildVnodes = $state.ChildVnodes;
        let v_Array = [];

        let headerVnodes, mainVnodes, footerVnodes;
        (ChildVnodes || []).forEach(vn => {
            if (vn.t == "header") {
                headerVnodes = vn.c;
            } else if (vn.t == "main") {
                mainVnodes = vn.c;
            } else if (vn.t == "footer") {
                footerVnodes = vn.c;
            }
        });

        v_Array.push({
            t: "div",
            c: [
                {
                    t: "header",
                    c: (() => {
                        let v_Array = [];
                        return headerVnodes;
                    })(),
                    x: 1,
                    k: 2
                },
                {
                    t: "main",
                    c: (() => {
                        let v_Array = [];
                        return mainVnodes;
                    })(),
                    x: 1,
                    k: 3
                },
                {
                    t: "footer",
                    c: (() => {
                        let v_Array = [];
                        return footerVnodes;
                    })(),
                    x: 1,
                    k: 4
                }
            ],
            x: 1,
            k: 1
        });

        if (v_Array.length > 1) {
            console.warn("invlid tag count");
        }
        return v_Array.length ? v_Array[0] : null;
    };

    // ------------------------------------------------------------------------------------------------------
    // 组件 UiLine
    // 注:应通过rpose.newComponentProxy方法创建组件代理对象后使用，而不是直接调用方法或用new创建
    // ------------------------------------------------------------------------------------------------------

    // 属性接口定义
    UiLine.prototype.$OPTION_KEYS = ["width"]; // 可通过标签配置的属性，未定义则不支持外部配置
    UiLine.prototype.$STATE_KEYS = null; // 可更新的state属性，未定义则不支持外部更新state

    // 组件函数
    function UiLine(options = {}) {
        // 组件默认选项值
        this.$options = {
            width: "50%"
        };
        rpose.extend(this.$options, options, this.$OPTION_KEYS); // 按属性接口克隆配置选项

        // 组件默认数据状态值 （TODO：声明式简化实现数据双向绑定？）
        this.$state = {};
        rpose.extend(this.$state, options, this.$STATE_KEYS); // 按属性接口克隆数据状态
    }

    /**
     * 节点模板函数
     */
    UiLine.prototype.nodeTemplate = function nodeTemplate($state, $options, $methods) {
        return {
            r: 1,
            t: "div",
            a: { style: escapeHtml("border:solid 1px #ff9408;background-color:#ff9408;height:1px;margin:auto;width:" + $options.width) },
            x: 1,
            k: 1
        };
    };

    // ------------------------------------------------------------------------------------------------------
    // 组件 UiLoader
    // 注:应通过rpose.newComponentProxy方法创建组件代理对象后使用，而不是直接调用方法或用new创建
    // ------------------------------------------------------------------------------------------------------

    // 这是个单例组件
    UiLoader.Singleton = true;

    // 属性接口定义
    UiLoader.prototype.$OPTION_KEYS = null; // 可通过标签配置的属性，未定义则不支持外部配置
    UiLoader.prototype.$STATE_KEYS = ["show"]; // 可更新的state属性，未定义则不支持外部更新state

    // 组件函数
    function UiLoader(options = {}) {
        // 组件默认选项值
        this.$options = {};
        rpose.extend(this.$options, options, this.$OPTION_KEYS); // 按属性接口克隆配置选项

        // 组件默认数据状态值 （TODO：声明式简化实现数据双向绑定？）
        this.$state = {};
        rpose.extend(this.$state, options, this.$STATE_KEYS); // 按属性接口克隆数据状态

        // 自定义方法
        this.$methods = {
            // 自己控制渲染和挂载，总是不返回根节点
            render: state => {
                if (this.mounted) {
                    if (state && state.show != null) {
                        let $$el = $$("._15967a6998a0bc92436dc68a1bc0a38d");
                        state.show ? $$el.removeClass("_9d0d8f875f78a8468bdcda1691041e03") : $$el.addClass("_9d0d8f875f78a8468bdcda1691041e03");
                    }
                } else {
                    let vnode = this.nodeTemplate(state, {}, this.$methods);
                    let el = rpose.createDom(vnode, this);
                    this.mounted = true;
                    rpose.mount(el, "body");
                }
            },
            // 点击关闭loader
            fnLoaded: e => $$("._15967a6998a0bc92436dc68a1bc0a38d").addClass("_9d0d8f875f78a8468bdcda1691041e03"),
            // 页面装载完时关闭loader
            "window.onload": e => $$("._15967a6998a0bc92436dc68a1bc0a38d").addClass("_9d0d8f875f78a8468bdcda1691041e03")
        };

        rpose.once("window.onload", this.$methods["window.onload"].bind(this)); // 自定义方法中有window.onload时，自动调用

        this.render = this.$methods.render; // 自定义方法中有render时，使用自定义的render
    }

    /**
     * 节点模板函数
     */
    UiLoader.prototype.nodeTemplate = function nodeTemplate($state, $options, $methods) {
        return {
            r: 1,
            t: "div",
            e: { load: $methods.fnLoaded },
            a: { class: { _15967a6998a0bc92436dc68a1bc0a38d: 1 } },
            c: [
                { t: "div", e: { click: $methods.fnLoaded }, a: { class: { _0dc95fcffd64987c8d67ba2fdd6c26e6: 1 } }, x: 1, k: 2 },
                {
                    t: "div",
                    e: { click: $methods.fnLoaded },
                    a: { class: { _9532e34952ce305ffda91f00e2bcd073: 1, _a18b93a4f04ce224c156887b7722edcd: 1 } },
                    x: 1,
                    k: 3
                },
                {
                    t: "div",
                    e: { click: $methods.fnLoaded },
                    a: { class: { _9532e34952ce305ffda91f00e2bcd073: 1, _8d06e100f1b31acfd472c6b6c8f1c5bb: 1 } },
                    x: 1,
                    k: 4
                }
            ],
            x: 1,
            k: 1
        };
    };

    // ------------------------------------------------------------------------------------------------------
    // 组件 UiPageSection
    // 注:应通过rpose.newComponentProxy方法创建组件代理对象后使用，而不是直接调用方法或用new创建
    // ------------------------------------------------------------------------------------------------------

    // 属性接口定义
    UiPageSection.prototype.$OPTION_KEYS = ["title", "text1", "text2"]; // 可通过标签配置的属性，未定义则不支持外部配置
    UiPageSection.prototype.$STATE_KEYS = null; // 可更新的state属性，未定义则不支持外部更新state

    // 组件函数
    function UiPageSection(options = {}) {
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
    UiPageSection.prototype.nodeTemplate = function nodeTemplate($state, $options, $methods) {
        return {
            r: 1,
            t: "div",
            a: { class: { _465bea86865625b65d826d0d3995fed4: 1 } },
            c: [
                { t: "ui-loader", m: 1, k: 2 },
                {
                    t: "div",
                    a: { class: { _7099db55c77fab95e929adc37bde48e7: 1 } },
                    c: [
                        { t: "h2", a: { class: { _3e53aba28b9661e9c06b18feaa179996: 1 } }, c: [{ s: "GOTOEASY", k: 5 }], x: 1, k: 4 },
                        {
                            t: "p",
                            a: { class: { _9bb8432b130ea0c5aa5332ef57c2f9b1: 1 } },
                            c: [{ s: " WRITE BUSINESS, RUNNING ", k: 7 }, { t: "br", x: 1, k: 8 }, { s: " PROGRAMMING SHOULD BE SO EASY", k: 9 }],
                            x: 1,
                            k: 6
                        },
                        { t: "ui-line", a: { width: "45%" }, m: 1, k: 10 },
                        { t: "br", x: 1, k: 11 },
                        {
                            t: "span",
                            a: { class: { _9bb8432b130ea0c5aa5332ef57c2f9b1: 1 } },
                            c: [{ s: "写业务，跑起来，编程理应如此简单", k: 13 }],
                            x: 1,
                            k: 12
                        },
                        {
                            t: "div",
                            a: { class: { _0ab8ef476b3d3b6509eafc43a5626eab: 1 } },
                            c: [
                                {
                                    t: "a",
                                    a: { href: "https://github.com/gotoeasy/block-text-file", style: "margin:5px;width:100px" },
                                    c: [{ s: "BTF FILE SPEC", k: 16 }],
                                    x: 1,
                                    k: 15
                                },
                                {
                                    t: "a",
                                    a: { href: "http://gotoeasy.github.io/rpose", style: "margin:5px;width:100px" },
                                    c: [{ s: "RPOSE.JS", k: 18 }],
                                    x: 1,
                                    k: 17
                                }
                            ],
                            x: 1,
                            k: 14
                        }
                    ],
                    x: 1,
                    k: 3
                }
            ],
            x: 1,
            k: 1
        };
    };

    // ------------------------------------------------------------------------------------------------------
    // 组件 UiSample
    // 注:应通过rpose.newComponentProxy方法创建组件代理对象后使用，而不是直接调用方法或用new创建
    // ------------------------------------------------------------------------------------------------------

    // 属性接口定义
    UiSample.prototype.$OPTION_KEYS = null; // 可通过标签配置的属性，未定义则不支持外部配置
    UiSample.prototype.$STATE_KEYS = ["name", "items"]; // 可更新的state属性，未定义则不支持外部更新state

    // 组件函数
    function UiSample(options = {}) {
        // 组件默认选项值
        this.$options = {};
        rpose.extend(this.$options, options, this.$OPTION_KEYS); // 按属性接口克隆配置选项

        // 组件默认数据状态值 （TODO：声明式简化实现数据双向绑定？）
        this.$state = {
            items: [{ id: 1, name: "11111" }, { id: 2, name: "222222" }, { id: 3, name: "33333333" }],
            name: "main"
        };
        rpose.extend(this.$state, options, this.$STATE_KEYS); // 按属性接口克隆数据状态

        // 自定义方法
        this.$methods = {
            clear: () => {
                this.$state.items.splice(1, 0, { id: new Date().getTime(), name: new Date().toString() });
                this.$state.name = new Date().toString();
                this.setState(this.$state);
            },
            clickBtn2: function(e) {
                let comp = this.getRefComponents("aaa")[0];
                window.b = comp;
                comp && comp.setState({ text: "321321" + new Date(), disabled: !comp.getState().disabled });

                let els = this.getRefElements("aaa")[0];
                $$(els).attr("text", new Date().toString());
            }.bind(this)
        };
    }

    /**
     * 节点模板函数
     */
    UiSample.prototype.nodeTemplate = function nodeTemplate($state, $options, $methods) {
        let items = $state.items;
        let name = $state.name;
        return {
            r: 1,
            t: "div",
            c: (() => {
                let v_Array = [];
                v_Array.push({ t: "ui-button", a: rpose.assign({ ref: "aasa", text: "演示按钮", onclick: $methods.clear }, $state), m: 1, k: 2 });
                v_Array.push({ t: "br", x: 1, k: 3 });
                v_Array.push({
                    t: "div",
                    a: { ref: "aaa" },
                    c: [
                        { t: "ui-button", a: rpose.assign({ ref: "aasa", text: "演示按钮", onclick: $methods.clickBtn2 }, $state), m: 1, k: 5 },
                        { t: "br", x: 1, k: 6 }
                    ],
                    x: 1,
                    k: 4
                });
                v_Array.push({ t: "ui-button", a: { ref: "aaa", text: "演示按钮1", onclick: $methods.clickBtn2 }, m: 1, k: 7 });
                v_Array.push({ s: "-----------------------------------\r\n\r\n  ", k: 8 });
                for (let i = 0; i < items.length; i++) {
                    v_Array.push({ t: "div", a: { id: escapeHtml(items[i].id) }, c: [{ s: escapeHtml(items[i].name), k: 10 }], x: 1, k: 9 });
                }
                v_Array.push({ t: "ui-loader", m: 1, k: 11 });
                v_Array.push({ t: "ui-loader", m: 1, k: 12 });
                v_Array.push({ t: "ui-loader", m: 1, k: 13 });
                v_Array.push({ t: "ui-loader", m: 1, k: 14 });
                v_Array.push({ t: "ui-loader", m: 1, k: 15 });
                v_Array.push({ t: "ui-loader", m: 1, k: 16 });
                v_Array.push({
                    t: "ui-layout",
                    c: [
                        { t: "header", c: [{ s: "这里是 header", k: 19 }], x: 1, k: 18 },
                        { t: "main", c: [{ s: "这里是 " + escapeHtml(name), k: 21 }], x: 1, k: 20 },
                        { t: "footer", c: [{ s: "这里是 footer", k: 23 }], x: 1, k: 22 }
                    ],
                    m: 1,
                    k: 17
                });
                v_Array.push({ t: "ui-page-section", m: 1, k: 24 });
                return v_Array;
            })(),
            x: 1,
            k: 1
        };
    };
})(rpose.$$, rpose.escapeHtml);



// 组件挂载
rpose.mount(rpose.newComponentProxy("index").render(), "body");

