!function(e,t){const n=e==t&&t!=e,r=["autofocus","hidden","readonly","disabled","checked","selected","multiple","translate","draggable","noresize"],i="ChildVnodes",l=(...e)=>console.warn(...e),s=(...e)=>console.error(...e),o=e=>Object.prototype.toString.call(e),f=e=>"function"==typeof e&&e.constructor==Function,a=e=>"string"==typeof e,c=e=>Array.isArray(e)||e instanceof Array,u=e=>"[object Object]"===o(e),h=e=>"[object Date]"===o(e),d=e=>"[object Map]"===o(e),v=e=>"[object Set]"===o(e),p=e=>e.toLowerCase(),g=(()=>{let t={},n=(e,n)=>(t[p(e)]||(t[p(e)]=new Set)).add(n),r=(e,n)=>{let r=t[p(e)];r&&(n?r.delete(n):delete t[p(e)])},i=(e,...n)=>{let i,l=t[p(e)];return l&&(l.forEach(t=>{t["ONCE_"+p(e)]&&l.delete(t)&&delete t["ONCE_"+p(e)],i=t(...n)}),!l.size&&r(e)),i};return e.onload=(t=>i("window.onload",t)>(e.onload=null)),{on:n,off:r,once:(e,t)=>{t["ONCE_"+p(e)]=1,n(e,t)},at:i}})(),m=function(){let e={},t=(t,n)=>e[p(t)]||(e[p(t)]=n);return t("*",(e,t,n)=>f(n)||null==n?e.getAttribute(t):e.setAttribute(t,n)),r.forEach(e=>t(e,(t,n,r)=>void 0===r?t[e]:t[e]=L(r))),t("value",(e,t,n)=>void 0===n?e.value:e.value=null==n?"":n),t("innerHTML",(e,t,n)=>void 0===n?e.innerHTML:e.innerHTML=null==n?"":n),t("innerTEXT",(e,t,n)=>void 0===n?e.textContent:e.textContent=null==n?"":n),t("textcontent",(e,t,n)=>void 0===n?e.textContent:e.textContent=null==n?"":n),t("image.src",(e,t,n)=>void 0===n?e.src:e.src=n),t("class",(e,t,n)=>{if(void 0===n)return e.className;if(u(n))for(let t in n)n[t]?C(e).addClass(t):C(e).removeClass(t);else C(e).addClass(n)}),t("style",(e,t,n)=>{if(void 0===n)return e.getAttribute("style");let r=E(n);for(let t in r)e.style[t]=r[t]}),{at:(t,n,r)=>(e[p(t.tagName+"."+n)]||e[p(n)]||e["*"]).apply(this,[t,n,r])}}();function E(e=""){if(u(e))return e;let t={};return e.split(";").filter(e=>""!=e.trim()).forEach(e=>{let n,r=e.split(":").filter(e=>""!=e.trim());2==r.length&&(n=p(r[0]).split("-").filter(e=>""!=e.trim()).map((e,t)=>t?e.charAt(0).toUpperCase()+e.substring(1):e).join(""),t[n]=r[1].trim())}),t}function C(e,n){if("object"==typeof e)return new y(e);let r,i=n||t,l="#"==e.substring(0,1);if(l)return new y((r=t.getElementById(e.substring(1)))?[r]:[]);if(i instanceof y){let t,n=[];if(l)for(let r=0;r<i.length;r++){t=i[r].querySelectorAll(e);for(let e=0;e<t.length;e++)n.push(t[e])}return new y(n)}return new y(i.querySelectorAll(e))}function y(r){let i=[];if(r)if(r.nodeType)i[0]=r;else if(r.length)for(let e=0;e<r.length;e++)r[e]&&i.push(r[e]);this.length=i.length;for(let e=0;e<i.length;e++)this[e]=i[e];return this.forEach=function(e){return i.forEach(e),this},this.replaceWith=function(e){let t,n,r;for(;i.length;)(n=(t=i.pop()).parentNode)&&(r?n.removeChild(t):r=t);return r&&(r.parentNode.insertBefore(e,r),r.parentNode.removeChild(r)),this},this.on=function(n,r){return i.forEach(i=>(function(n,r,i){e.WeakMap?(w(n,r,i),function e(n){e[n]||(e[n]=1,t.addEventListener?t.addEventListener(n,O,!1):t.attachEvent?t.attachEvent("on"+n,O):t["on"+n]=O)}(r)):n.addEventListener?n.addEventListener(r,i,!1):n.attachEvent?n.attachEvent("on"+r,i):n["on"+r]=i})(i,n,r)),this},this.addClass=function(e){return e&&(e=e.replace(/\./g,""))&&i.forEach(t=>{if(t)if(n)if(t.className){var r=t.className.split(" ");if(r.indexOf(e)>=0)return;r.push(e),t.className=r.join(" ")}else t.className=e;else e.split(/\s+/).forEach(e=>t.classList.contains(e)||t.classList.add(e))}),this},this.removeClass=function(e){return e&&(e=e.replace(/\./g,""))&&i.forEach(t=>{if(n){var r=t.className.split(" "),i=r.indexOf(e);i>=0&&(r.slice(i,1),t.className=r.join(" "))}else{e.split(/\s+/).forEach(e=>t.classList.remove(e))}}),this},this.attr=function(e,t){if(!i.length)return null==t?null:this;for(let n=0;n<i.length;n++){if(null==t)return m.at(i[0],e);m.at(i[n],e,t)}return this},this.removeChildren=function(){return i.forEach(e=>{try{e.innerHTML=""}catch(t){for(;e.firstChild;)e.removeChild(e.firstChild)}}),this},this.remove=function(){return i.forEach(e=>e.parentNode.removeChild(e)),this},this}function w(e,t,n){let r,i=w.m=w.m||new WeakMap;if(!n)return(r=i.get(e)||{})[t];!i.has(e)&&i.set(e,{}),((r=i.get(e))[t]||(r[t]=new Set)).add(n)}function O(e){let t=w(e.target||e.srcElement,e.type);t&&t.forEach(t=>t(e))}const b={},$={};function S(e,t){let n,r=b[e];if(!r)throw new Error("component not found: "+e);return n=r.Singleton?$[e]||($[e]=_(r,t)):_(r,t)}function N(e,t){if(!e)return;let n=N.m||(N.m=new WeakMap);if(!t)return n.get(e);delete t.c;let r=n.get(e);if(!r)return n.set(e,t);if(!r.M){let t={M:1};t[r.t]=r,n.set(e,t),r=t}return r[t.t]=t,r}function j(e,n){let r,l;if(e.t)if(e.m){let t=new function(e){let t=D({},e.a||{},e.c&&e.c.length?{[i]:e.c}:{});return S(e.t,t)}(e);if(e.o=t,(r=t.render())&&((l=C(r)).addClass(t.$COMPONENT_ID),e.a&&e.a.ref)){let t=n.$refs=n.$refs||{},r=t.c=t.c||{},i=r[e.a.ref]=r[e.a.ref]||A("_ref_");l.addClass(e.r=i)}}else{if(/^script$/i.test(e.t))return T(e.a);if(/^link$/i.test(e.t))return M(e.a);if(l=C(r=t.createElement(e.t)),e.a)for(let t in e.a){if("ref"==t){let r=n.$refs=n.$refs||{},i=r.e=r.e||{},s=i[e.a[t]]=i[e.a[t]]||A("_ref_");l.addClass(e.r=s)}l.attr(t,e.a[t])}if(e.e)for(let t in e.e)f(e.e[t])?C(r).on(t,e.e[t]):console.error("invalid event handle:",t,"=",e.e[t]);if(e.c)for(let t,i,l=0,s=e.c.length;l<s;l++)(t=e.c[l])&&(i=j(t,n))&&r.appendChild(i)}else r=t.createTextNode(e.s);return r&&N(r,e),r}function T(e){let n=T.s||(T.s=[]);if(!e||!e.src||n.includes(e.src))return;n.push(e.src);let r=t.createElement("script");r.src=e.src,r.type=e.type||"text/javascript",t.head.appendChild(r)}function M(e){let n=M.s||(M.s=[]);if(!e||!e.href||n.includes(e.href))return;n.push(e.href);let r=t.createElement("link");r.href=e.href,r.rel=e.rel||"stylesheet",t.head.appendChild(r)}function _(e,...n){let r=new e(...n);var o;return o=r,Object.defineProperty(o,"$COMPONENT_ID",{value:A("_cid_")}),Object.defineProperty(o,"isInitRender",{value:!0,writable:!0}),function(e){!e.render&&Object.defineProperty(e,"render",{get:()=>(function(e={}){let t,n,r;if(this.isInitRender)return I(this.$state,e,this.$STATE_KEYS),r=this.nodeTemplate(this.$state,this.$options,this.$methods),(t=j(r,this))&&1==t.nodeType&&C(t).addClass(this.$COMPONENT_ID),this.isInitRender=!1,t;if(I(this.$state,e,this.$STATE_KEYS),(n=C("."+this.$COMPONENT_ID)).length){if(this.$updater)this.$updater(e);else{let e=this.nodeTemplate(this.$state,this.$options,this.$methods);!function(e,t){let n=C("."+e.$COMPONENT_ID);if(!n.length)return void s("root node not found:",e.$COMPONENT_ID);if(!t)return void n.remove();let r=N(n[0]);if(r.M&&(r=r[t.t]),t.m)return void r.o.setState({[i]:t.c});let l=(r||{}).a||{},o=t.a||{};if(!r||r.k!=t.k||(r.t||r.t)&&r.t!=t.t||(l.id||o.id)&&l.id!=o.id||(l.ref||o.ref)&&l.ref!=o.ref){let r=j(t,e);return n.replaceWith(r),r}let f=x(r,t);if(f)for(let e in f)r.a[e]=f[e],n.attr(e,f[e]);P(e,n[0],t),n[0]}(this,e)}return t}l("dom node missing")})})}(r),function(e){Object.defineProperty(e,"getState",{get:()=>(function(){return I({},this.$state)})}),Object.defineProperty(e,"setState",{get:()=>(function(e){e&&this.render(e)})})}(r),function(e){Object.defineProperty(e,"getRefElements",{get:()=>(function(e){let n=this.$refs.e[e];return n?[...new Set(t.querySelectorAll("."+n))]:[]})}),Object.defineProperty(e,"getRefComponents",{get:()=>(function(e){let n=this.$refs.c[e];if(!n)return[];let r=[],i=[...new Set(t.querySelectorAll("."+n))];return i.forEach(e=>{let t=N(e);if(t&&t.M){for(let e in t)if(t[e].r==n){r.push(t[e].o);break}}else r.push(t.o)}),r})})}(r),function(e){Object.defineProperty(e,"getRootElement",{get:()=>(function(){let e=C("."+this.$COMPONENT_ID);return e.length?e[0]:null})})}(r),r}function P(e,t,n){let r=[...t.childNodes||[]],l=n.c||[];if(!r.length)return l.forEach(n=>t.appendChild(j(n,e)));let s=[],o=[];r.forEach(e=>s.push({vn:N(e),el:e})),l.forEach(e=>o.push({vn:e}));let f=1;if(s.length==o.length)for(let e,t,n=0;n<s.length;n++){if(!k(e=s[n],t=o[n])){f=0;break}e.S=1,t.S=1,t.wv1=e}else f=0;if(!f&&(o.forEach(e=>!e.S&&function(e,t){t.vn;for(let n,r=0;n=e[r++];)if(k(n,t))return n.S=1,t.S=1,t.wv1=n}(s,e)),s.filter(e=>e.S?1:C(e.el).remove()&&0),!s.length))return o.forEach(n=>t.appendChild(j(n.vn,e)));let a=0,c=s[a];for(let n,r=0;r<o.length;r++)if((n=o[r]).S)if(n.wv1!=c)if(s.splice(a,0,s.splice(s.indexOf(n.wv1),1)[0]),a++,t.insertBefore(n.wv1.el,c.el),n.vn.m)n.wv1.vn[n.vn.t].o.setState({[i]:n.vn.c});else{let e=x(n.wv1.vn,n.vn);if(e)for(let t in e)n.wv1.vn.a[t]=e[t],$$el.attr(t,e[t]);else n.vn.t||n.wv1.vn.s==n.vn.s||(n.wv1.vn.s=n.vn.s,el.textContent=n.vn.s)}else{if(n.vn.m)c.vn[n.vn.t].o.setState({[i]:n.vn.c});else{let e=x(c.vn,n.vn);if(e)for(let t in e)c.vn.a[t]=e[t],C(c.el).attr(t,e[t]);else n.vn.t||c.vn.s==n.vn.s||(c.vn.s=n.vn.s,c.el.textContent=n.vn.s)}c=s[++a]}else{let r=j(n.vn,e);r&&(c?t.insertBefore(r,c.el):t.appendChild(r))}o.forEach(t=>{t.S&&(t.vn.m?t.wv1.vn[t.vn.t].o.setState({[i]:t.vn.c}):P(e,t.wv1.el,t.vn))})}function k(e,t){if(e.S)return 0;let n=e.vn,r=t.vn;if(n.M&&!(n=n[r.t]))return 0;let i=n.a||{},l=r.a||{};return n.k!=r.k||(n.t||n.t)&&n.t!=r.t||(i.id||l.id)&&i.id!=l.id||(i.ref||l.ref)&&i.ref!=l.ref?0:1}function x(e,t){if(e.x)return 0;let n=e.a||{},l=t.a||{},s={},o=0;return Object.keys(l).forEach(e=>{if(n[e]!=l[e])if("class"==e){let t=function(e,t){let n=e||{},r=t||{},i={},l=0;return Object.keys(r).forEach(e=>{null==n[e]?(i[e]=L(r[e]),l=1):L(n[e])!=L(r[e])&&(i[e]=L(r[e]),l=1)}),l?i:null}(n[e],l[e]);t&&(s[e]=t,o=1)}else if(e==i);else if("style"==e){let t=function(e,t){let n=E(e),r=E(t),i={},l=0;return Object.keys(r).forEach(e=>{null==n[e]?(i[e]=r[e],l=1):n[e]!=r[e]&&(i[e]=r[e],l=1)}),l?i:null}(n[e],l[e]);t&&(s[e]=t,o=1)}else r.includes(e)?L(n[e])!=L(l[e])&&(s[e]=L(l[e]),o=1):(s[e]=l[e],o=1)}),o?s:0}function A(e){return e?(!A[e]&&(A[e]=1),e+A[e]++):(!A.n&&(A.n=1),A.n++)}function L(e){return!!e&&(!a(e)||!/^(0|false|f|no|n)$/i.test((e+"").trim()))}function I(...e){if(!e.length||c(e[0])||!e[0])return null;let t=e[e.length-1];if(!t)return;let n=e[0];if(n.class=q(n.class),c(t))for(let r,i=0;i<e.length-1;i++)r=e[i],n!==r&&u(r)&&t.forEach(e=>{void 0!==r[e]&&("class"==e?Object.assign(n.class,q(r[e])):n[e]=R(r[e]))});else for(let t,r=1;r<e.length;r++)if(t=e[r],n!==t&&u(t))for(let e in t)"class"==e?Object.assign(n.class,q(t[e])):n[e]=R(t[e]);return n}function D(...e){if(!e.length||c(e[0])||!e[0])return null;let t=e[e.length-1];if(!t)return;let n=e[0];if(n.class=q(n.class),c(t))for(let r,i=1;i<e.length-1;i++)r=e[i],n!==r&&u(r)&&t.forEach(e=>{void 0!==r[e]&&("class"==e?Object.assign(n.class,q(r[e])):n[e]=r[e])});else for(let t,r=1;r<e.length;r++)if(t=e[r],n!==t&&u(t))for(let e in t)"class"==e?Object.assign(n.class,q(t[e])):n[e]=t[e];return n}function q(e){if(null==e)return{};if(u(e))return e;let t={};return e.split(/\s/).forEach(e=>e.trim()&&(t[e]=1)),t}function R(e){if(!e)return e;if(u(e)){let n={};for(var t in e)n[t]=R(e[t]);return n}if(c(e)){let t=[];for(var n=0;n<e.length;n++)t[n]=R(e[n]);return t}return h(e)?new Date(e.getTime()):d(e)?new Map(e):v(e)?new Set(e):e}var H={};H.$$=C,H.registerComponents=function(e={}){for(let t in e)b[t]=e[t]},H.newComponentProxy=S,H.createDom=j,H.escapeHtml=function(e){return"string"==typeof e?e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"):e},H.mount=function(e,n,r){(r||t).querySelector(n||"body").appendChild(e)},H.extend=I,H.assign=D,H.on=g.on,H.off=g.off,H.once=g.once,H.at=g.at,e.rpose=H}(window,document);

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

