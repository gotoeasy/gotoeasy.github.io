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
