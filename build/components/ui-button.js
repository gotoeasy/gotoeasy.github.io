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
