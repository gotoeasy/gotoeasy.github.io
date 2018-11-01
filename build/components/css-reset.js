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
