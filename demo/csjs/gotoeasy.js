/*!
* gotoEasy 0.1 (http://gotoeasy.github.io)
* (c) 2016 Zhang Ming
* Licensed under the MIT license
*/
(function(J,p){function la(a){if(!a)return ma(e);var b=e;if(F(a)){var c=Object.keys(b),d;for(d in a)0<=c.indexOf(d)&&(b[d]=a[d])}U=e.debug;x=e.domAttrBind;G=e.dataKeyFnId;y=e.dataKeyFnParent;K=e.dataKeyFnRoot;V=e.dataKeyFnData;na=e.bindRefRoot;oa=e.bindRefParent;pa=e.bindRefData;t=e.bindKeyField;L=e.bindKeyValue;W=e.bindKeyInnerText;qa=e.bindKeyInnerHtml;ra=e.bindKeyOptions;sa=e.bindKeyReadonly;ta=e.bindKeyDisabled;ua=e.bindKeyVisible;X=e.bindKeyChecked;Y=e.bindKeyStyle;Z=e.bindKeyClass;va=e.bindKeyForeach;
wa=e.bindKeyWith;xa=e.bindKeyIf;aa=e.bindKeyClick;ba=e.eventDataChage;H=e.eventUpdateView;ya=e.uidPrefixData;za=e.uidPrefixTemplate;return ma(e)}function I(a){I[a]=I[a]||1;return a+I[a]++}function w(a){return a.replace(/(^\s*)|(\s*$)/g,"")}function Aa(a){return M(a)?JSON.stringify(a):JSON.parse(a)}function z(a){return Array.isArray&&Array.isArray(a)||a instanceof Array||"[object Array]"==Object.prototype.toString.call(a)}function F(a){return a&&"[object Object]"===Object.prototype.toString.call(a)}
function M(a){return null!==a&&"object"===typeof a}function Ka(a,b){return F(a)&&void 0!==a[b]}function ma(a){var b={},c;for(c in a)b[c]=a[c];return b}function La(a,b,c){var d=[];if(!b||0>b)b=0;if(!c||c>a.length)c=a.length;if(b>=c)return d;for(;b<c;b++)d.push(a[b]);return d}function q(a,b){for(var c=0;c<a.length&&!1!==b(a[c],c);c++);}function Ma(a,b,c){try{return b.apply(a,c)}catch(d){Na(arguments,d)}}function Oa(){ca("log",A.call(arguments),U)}function Na(){ca("warn",A.call(arguments),U)}function da(){ca("error",
A.call(arguments),1)}function ca(a,b,c){if(c){c=[];for(var d=0;d<b.length;d++)c.push("_["+d+"]");c="console."+a+"("+c.join(",");c+=")";try{(new Function("_",c))(b)}catch(g){console.warn(a,b,g)}}}function ea(a,b,c,d){if(a[G]){var g=a[b];if(d||M(c)||c!==g)if(B(c,a,b),a[b]=c,fa(ba,a,b,c,g),z(a))for(k in b=a[y](),b)b[k]===a&&ga(H,b,k,c,g);else ga(H,a,b,c,g)}else a[b]=c}function r(a){return a&&a[G]()}function B(a,b,c){if(M(a))if(Pa(a,b),F(a))for(var d in a)B(a[d],a,d);else if(z(a)){for(d=0;d<a.length;d++)B(a[d],
a,d);a[y]()&&Qa(a,b,c)}}function Pa(a,b){var c=a[G]?r(a):I(ya),d=b?r(b):null,g=b?r(b[K]()):c;C[c]=a;a[G]=function(){return c};a[y]=function(){return C[d]};a[K]=function(){return C[g]};a[V]=function(){return this}}function Qa(a,b,c){a.x||(q("push pop shift unshift splice sort reverse".split(" "),function(d){var g=a[d];a[d]=function(){var f=a.length,e=g.apply(a,arguments);if("push"==d)for(var l=f;l<e;l++)B(a[l],a,l);else if("unshift"==d)for(l=0;l<e-f;l++)B(a[l],a,l);fa(ba+" "+H,b,c,a);return e}}),a.x=
1)}function n(a,b,c,d){if(Ka(a,b))return c&&c.push(r(a)+"-"+b),a[b];var g=r(a)+"#"+b;if(c||!D[g]){var f=[],e=b.replace(Ra,function(a){var b="{"+f.length+"}";f.push(a);return b}),e=e.replace(Sa,function(b){if(/^\d+(\.\d+)?$/g.test(b)||0<=Ta.indexOf(b)||"]"===b.slice(0,1))return b;b=b.split(na).join(K+"()");b=b.split(oa).join(y+"()");b=b.split(pa).join(V+"()");if(c){var d;a:{var e="return _."+b;if(d=ha(e)){d=d(a);if(0>e.indexOf(".")){d=r(a)+"-"+e;break a}var g=e.split("."),e=g.pop();if(M(d)){d=r(d[y]())+
"-"+e;break a}if(d=ha(g.join("."))){d=r(d(a))+"-"+e;break a}}d=void 0}d&&c.push(d)}return"_."+b});for(i=0;i<f.length;i++)e=e.replace("{"+i+"}",f[i]);D[g]=D[g]||ha("return "+e)}if(d)return D[g];if(!c)try{return D[g](a)}catch(l){da("#2",D[g],a,b,l)}}function ha(a){try{return new Function("_",a)}catch(b){da("#1",a)}}function N(a,b,c){if(a._bindInfo)return Aa(a._bindInfo);a=ia(a.getAttribute(x));if(!a)return 0;a.$d=r(b);if(c)for(var d in a)if("$d"!=d&&d!=t&&d!=aa)if(d==Y||d==Z)for(var e=a[d].split(";"),
f=0,h;f<e.length;f++){h=e[f].split("=");var l=[];n(b,h[1],l);for(h=0;h<l.length;h++)c.push(l[h])}else for(l=[],n(b,a[d],l),f=0;f<l.length;f++)c.push(l[f]);return a}function ia(a){var b={},c;if(!a)return null;a=a.split(",");q(a,function(a){c=a.split(":");b[w(c[0]).toLowerCase()]=w(a.substring(a.indexOf(":")+1))});return b}function Ba(a,b){var c=[],d=N(a,b,c);q(c,function(b){Ca(a,b)});d[t]||(c=d[L]||d[W],void 0!==b[c]&&(d[t]=c));a._bindInfo=Aa(d)}function Da(a,b){for(var c=a.querySelectorAll(b||O),
d=Ua(Ea),e=[],f=0;f<d.length;f++)e.push("["+x+"*="+d[f]+"]");q(c,function(a){var b=ia(a.getAttribute(x)),c=0,f;for(f in b)0<=d.indexOf(f)&&(c=1);if(c){for(b=0;b<d.length;b++)Va(a,e[b],d[b])&&Da(a);var n=p.createDocumentFragment(),b=La(a.childNodes);q(b,function(a){n.appendChild(a.cloneNode(!0))});b=I(za);p[b]=n;a.setAttribute("_template",b);P(a)}})}function Va(a,b,c){a=a.querySelectorAll(b);for(b=0;b<a.length;b++)if(ia(a[b].getAttribute(x))[c])return!0;return!1}function Wa(a,b){Da(b||p);var c=(b||
p).querySelectorAll(O);q(c,function(b){Ba(b,a)})}function Xa(a){a=(a||p).querySelectorAll(O);q(a,function(a){ja(a)})}function m(a,b,c,d,e,f){f={};f[ka]=a;f[Q]=b;f.o=c||0;f[Ea]=!!d;f[Fa]=!!e;u[a]=f;Ya.push(a);R=[];for(k in u)R.push(u[k]);R.sort(function(a,b){return a.o==b.o?0:a.o<b.o?1:-1})}function Ua(a){var b=[],c;for(c in u)a?u[c][a]&&b.push(c):b.push(c);return b}function Ga(a,b,c){var d=[],e=a.getAttribute("style"),f;if(e){for(var e=e.split(";"),h=0;h<e.length;h++)f=e[h].split(":"),f=w(f[0]).toLowerCase(),
0>b.indexOf(f)&&d.push(e[h]);c&&d.push(c);e=d.join(";");a.setAttribute("style",e);return e}}function S(a,b,c){var d;c?(d=p.createDocumentFragment(),z(a)&&0<a.length&&q(a,function(a){if(a){var c;a=S(a,b);for(var e=0;e<a.childNodes.length;e++)"TBODY"==a.childNodes[e].tagName&&(c=a.childNodes[e]);if(c)for(e=0;e<c.childNodes.length;e++)d.appendChild(c.childNodes[e]);else d.appendChild(a)}})):(d=p[b.getAttribute("_template")].cloneNode(!0),q(d.querySelectorAll(O),function(b){Ba(b,a);ja(b)}));return d}
function ja(a,b,c){b=b||N(a);q(R,function(d){function e(){try{n(m,g,0,1).call(m,m)}catch(b){da("#3",a,g,m,b)}}var g=b[d[ka]],m=C[b.$d];if(g&&!(c&&0>g.indexOf(c)))if(d[Fa])Ha(d[ka],e,a);else d[Q](a,m,g)});for(var d in b)if(!u[d]&&"$d"!=d){var e=b[d];c&&0>e.indexOf(c)||(e=n(C[b.$d],e),u["*"][Q](a,d,e))}}function Za(a,b){for(var c=p.querySelectorAll("."+r(a)+"-"+b),d=0;d<c.length;d++)ja(c[d],"",b)}function $a(a){a=a.target;var b=N(a);if(b){var c=b[t]||b[L]||b[X];if(null==c)Oa("[ignore datachange]",a);
else{var b=C[b.$d],d=b[c];"checkbox"==a.type?z(d)?a.checked?0>d.indexOf(a.value)&&d.push(a.value):0<=d.indexOf(a.value)&&d.splice(d.indexOf(a.value),1):d=a.checked?a.value:"":d=a.value;ea(b,c,d)}}}function Ha(a,b,c){c.addEventListener?c.addEventListener(a,b,!1):c.attachEvent?c.attachEvent("on"+a,b):c["on"+a]=b}function Ca(a,b){if(Ia)if(a.className){var c=a.className.split(" ");0<=c.indexOf(b)||(c.push(b),a.className=c.join(" "))}else a.className=b;else a.classList.contains(b)||a.classList.add(b)}
function P(a){try{a.innerHTML=""}catch(b){for(;a.firstChild;)a.removeChild(a.firstChild)}}function Ja(a,b){a&&"function"==typeof b&&b.constructor==Function&&a.replace(T,function(a,d){(E[a]=E[a]||[]).push(b)})}function fa(a,b){var c=A.call(arguments,1);a.replace(T,function(a){a=E[a]||[];for(var e=0;e<a.length;e++)Ma(b,a[e],c)})}function ga(a,b,c){isNaN(a);var d=isNaN(a)?A.call(arguments,0):A.call(arguments,1);ab(function(){fa.apply(null,d)},a)}var Ia=J==p&&p!=J;Array.prototype.indexOf||(Array.prototype.indexOf=
function(a,b){for(var c=b||0;c<this.length;c++)if(this[c]===a)return c;return-1});var e={},U=e.debug=1,x=e.domAttrBind="data-bind",O="["+x+"]",G=e.dataKeyFnId="_$id",y=e.dataKeyFnParent="_$parent",K=e.dataKeyFnRoot="_$root",V=e.dataKeyFnData="_$data",na=e.bindRefRoot="$root",oa=e.bindRefParent="$parent",pa=e.bindRefData="$data",t=e.bindKeyField="field",L=e.bindKeyValue="value",W=e.bindKeyInnerText="text",qa=e.bindKeyInnerHtml="html",ra=e.bindKeyOptions="options",sa=e.bindKeyReadonly="readonly",ta=
e.bindKeyDisabled="disabled",ua=e.bindKeyVisible="visible",X=e.bindKeyChecked="checked",Y=e.bindKeyStyle="style",Z=e.bindKeyClass="class";e.bindKeyTemplate="template";var va=e.bindKeyForeach="foreach",wa=e.bindKeyWith="with",xa=e.bindKeyIf="if",aa=e.bindKeyClick="click",ba=e.eventDataChage="datachange",H=e.eventUpdateView="updaueview",ya=e.uidPrefixData="d",za=e.uidPrefixTemplate="t",A=Array.prototype.slice,ab=setTimeout,C={},Ra=/(['"])[^'"]*\1/g,Sa=/([\w$_\.\[\]]+)/g,D={},Ta="true false null alert this _ if else".split(" "),
u={},R=[],Ya=[],ka="k",Q="f",Ea="t",Fa="e";m("*",function(a,b,c){c=(new Option(null==c?"":c)).innerHTML.replace(/"/g,"&quot;");a.setAttribute(b,c)});m(L,function(a,b,c){var d=n(b,c);a.value=null==d?"":d;u[t][Q](a,b,c,d)});m(sa,function(a,b,c){b=n(b,c);a.readOnly=!!b});m(ta,function(a,b,c){b=n(b,c);a.disabled=!!b},5);m(X,function(a,b,c){b=n(b,c);z(b)?a.checked=0<=b.indexOf(a.value):a.checked=b==a.value});m(ua,function(a,b,c){b=n(b,c);Ga(a,["visibility","display"]);b?a.style.visibility="visible":a.style.display=
"none"},5);m(Y,function(a,b,c){var d=c.split(";");c=[];for(var e=[],f=0,h;f<d.length;f++)h=d[f].split("="),2==h.length&&(c.push(w(h[0]).toLowerCase()),e.push(w(h[1])));if(c.length){d=[];for(f=0;f<c.length;f++)d.push(c[f]+":"+n(b,e[f]));Ga(a,c,d.join(";"))}},5);m(Z,function(a,b,c){var d=c.split(";");c=[];for(var e=[],f=0,h;f<d.length;f++)h=d[f].split("="),2==h.length&&(c.push(w(h[0]).toLowerCase()),e.push(w(h[1])));if(c.length)for(f=0;f<c.length;f++)if(n(b,e[f]))Ca(a,c[f]);else{var d=a,l=c[f];Ia?(h=
d.className.split(" "),l=h.indexOf(l),0<=l&&(h.slice(l,1),d.className=h.join(" "))):d.classList.remove(l)}});m(W,function(a,b,c){b=n(b,c);a.textContent=null==b?"":b});m(qa,function(a,b,c){b=n(b,c);a.innerHTML=null==b?"":b});m(t,function(a,b,c,d){(a=N(a)[t])&&a!=c&&ea(b,a,d)});m(ra,function(a,b,c){b=n(b,c);a.length=0;if(null!=b&&!F(b)){var d=a.options;z(b)||(b=b.split(";").join(",").split(","));q(b,function(a){if(F(a))d[d.length]=new Option(a.text,a.value);else if(null==a)d[d.length]=new Option("",
"");else{var b=a.split(":");d[d.length]=new Option(1<b.length?b[1]:a,b[0])}})}},5);m(aa,null,0,0,1);m(va,function(a,b,c){b=n(b,c);P(a);b&&b.length&&a.appendChild(S(b,a,!0))},7,1);m(wa,function(a,b,c){b=n(b,c);P(a);a.appendChild(S(b,a))},8,1);m(xa,function(a,b,c){c=n(b,c);P(a);if(c)a.appendChild(S(b,a));else return!1},9,1);var T=/\S+/g,E={},v={};v.settings=la;v.bind=function(a,b,c){c&&la(c);B(a);b=b?p.querySelector(b):p;Wa(a,b);Xa(b);Ja(H,Za);Ha("change",$a,p)};v.set=ea;v.on=Ja;v.off=function(a,b){a&&
"*"!=a?b?a.replace(T,function(a){a=E[a];for(var d=0;d<a.length;d++)b===a[d]&&a.splice(d--,1)}):a.replace(T,function(a){E[a]=[]}):E={}};v.notify=ga;"function"==typeof define&&define.constructor==Function&&define.amd?define(function(){return v}):J.gotoEasy=J.$easy=v})(window,document);