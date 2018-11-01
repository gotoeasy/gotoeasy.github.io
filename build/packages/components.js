(function($$, escapeHtml) {
    // 组件注册
    rpose.registerComponents({
        "css-reset": CssReset,
        index: index,
        "ui-button": UiButton,
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
    index.prototype.$STATE_KEYS = ["name", "items"]; // 可更新的state属性，未定义则不支持外部更新state

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
        return { r: 1, t: "ui-page-section", m: 1, k: 1 };
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
    UiLine.prototype.$OPTION_KEYS = null; // 可通过标签配置的属性，未定义则不支持外部配置
    UiLine.prototype.$STATE_KEYS = null; // 可更新的state属性，未定义则不支持外部更新state

    // 组件函数
    function UiLine(options = {}) {
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
    UiLine.prototype.nodeTemplate = function nodeTemplate($state, $options, $methods) {
        return { r: 1, t: "div", a: { class: { _9862d90db5c60d935badce559ed28e87: 1 } }, x: 1, k: 1 };
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
    UiPageSection.prototype.$OPTION_KEYS = null; // 可通过标签配置的属性，未定义则不支持外部配置
    UiPageSection.prototype.$STATE_KEYS = ["ChildVnodes"]; // 可更新的state属性，未定义则不支持外部更新state

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
            a: { class: { _3d2fe37e0295aedd192d0a26f8cad904: 1 } },
            c: [
                { t: "ui-loader", m: 1, k: 2 },
                {
                    t: "div",
                    a: { class: { _7099db55c77fab95e929adc37bde48e7: 1 } },
                    c: [
                        { t: "h2", a: { class: { _3e53aba28b9661e9c06b18feaa179996: 1 } }, c: [{ s: "NNNNNN NNNNNNNNN NNNNNN", k: 5 }], x: 1, k: 4 },
                        {
                            t: "p",
                            a: { class: { _9bb8432b130ea0c5aa5332ef57c2f9b1: 1 } },
                            c: [
                                { t: "span", c: [{ s: "nnnnnnnnn", k: 8 }], x: 1, k: 7 },
                                { s: " nnnnnnnn nnnnnn nnnnn nnnnnnnn nnnnnnnnnn", k: 9 },
                                { t: "br", x: 1, k: 10 },
                                { s: "nnnnnnnnn nnnnnnnnn\r\n        ", k: 11 }
                            ],
                            x: 1,
                            k: 6
                        },
                        { t: "ui-line", m: 1, k: 12 },
                        {
                            t: "div",
                            a: { class: { _0ab8ef476b3d3b6509eafc43a5626eab: 1 } },
                            c: [
                                {
                                    t: "a",
                                    a: { href: "http://gotoeasy.github.io/demo", style: "margin-right:5px" },
                                    c: [{ s: "Live Demo", k: 15 }],
                                    x: 1,
                                    k: 14
                                },
                                {
                                    t: "a",
                                    a: { href: "http://gotoeasy.github.io/download/gotoeasy.zip", style: "margin-left:5px" },
                                    c: [{ s: "Download", k: 17 }],
                                    x: 1,
                                    k: 16
                                }
                            ],
                            x: 1,
                            k: 13
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
