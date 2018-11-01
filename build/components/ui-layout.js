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
