(function(rpose, $$, escapeHtml) {
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

    // 组件挂载
    rpose.mount(rpose.newComponentProxy("ui-sample").render(), "body");
})(rpose, rpose.$$, rpose.escapeHtml);
