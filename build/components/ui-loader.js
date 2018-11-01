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
