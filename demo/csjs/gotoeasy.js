/*!
* gotoEasy 0.1 (http://gotoeasy.github.io)
* (c) 2016 Zhang Ming
* Licensed under the MIT license
*/
(function(E,p){function na(){V=null==f.debug?1:f.debug;L=f.domAttrBind||"data-bind";F="["+L+"]";G=f.dataKeyFnId||"_$id";z=f.dataKeyFnParent||"_$parent";M=f.dataKeyFnRoot||"_$root";W=f.dataKeyFnData||"_$data";oa=f.bindRefRoot||"$root";pa=f.bindRefParent||"$parent";qa=f.bindRefData||"$data";v=f.bindKeyField||"field";N=f.bindKeyValue||"value";X=f.bindKeyInnerText||"text";ra=f.bindKeyInnerHtml||"html";sa=f.bindKeyOptions||"options";ta=f.bindKeyReadonly||"readonly";ua=f.bindKeyDisabled||"disabled";va=
f.bindKeyVisible||"visible";Y=f.bindKeyChecked||"checked";Z=f.bindKeyStyle||"style";aa=f.bindKeyClass||"class";wa=f.bindKeyForeach||"foreach";xa=f.bindKeyWith||"with";ya=f.bindKeyIf||"if";ba=f.bindKeyClick||"click";ca=f.eventDataChage||"datachange";H=f.eventUpdateView||"updaueview";za=f.uidPrefixData||"d";Aa=f.uidPrefixTemplate||"t"}function Ba(a){if(!a)return Ca(f);var b=f;if(I(a)){var c=Object.keys(b),d;for(d in a)0<=c.indexOf(d)&&(b[d]=a[d])}na();return Ca(f)}function J(a){J[a]=J[a]||1;return a+
J[a]++}function O(a){return a.replace(/(^\s*)|(\s*$)/g,"")}function Da(a){return P(a)?JSON.stringify(a):JSON.parse(a)}function A(a){return Array.isArray&&Array.isArray(a)||a instanceof Array||"[object Array]"==Object.prototype.toString.call(a)}function I(a){return a&&"[object Object]"===Object.prototype.toString.call(a)}function P(a){return null!==a&&"object"===typeof a}function Na(a,b){return I(a)&&void 0!==a[b]}function Ca(a){var b={},c;for(c in a)b[c]=a[c];return b}function Oa(a,b,c){var d=[];
if(!b||0>b)b=0;if(!c||c>a.length)c=a.length;if(b>=c)return d;for(;b<c;b++)d.push(a[b]);return d}function q(a,b){for(var c=0;c<a.length&&!1!==b(a[c],c);c++);}function Pa(a,b,c){try{return b.apply(a,c)}catch(d){Qa(arguments,d)}}function Ra(){da("log",B.call(arguments),V)}function Qa(){da("warn",B.call(arguments),V)}function ea(){da("error",B.call(arguments),1)}function da(a,b,c){if(c){c=[];for(var d=0;d<b.length;d++)c.push("_["+d+"]");c="console."+a+"("+c.join(",");try{(new Function("_",c+")"))(b)}catch(e){console.warn(a,
b,e)}}}function fa(a,b,c,d){if(a[G]){var e=a[b];if(d||P(c)||c!==e)if(C(c,a,b),a[b]=c,ga(ca,a,b,c,e),A(a))for(k in b=a[z](),b)b[k]===a&&ha(H,b,k,c,e);else ha(H,a,b,c,e)}else a[b]=c}function r(a){return a&&a[G]()}function C(a,b,c){if(P(a))if(Sa(a,b),I(a))for(var d in a)C(a[d],a,d);else if(A(a)){for(d=0;d<a.length;d++)C(a[d],a,d);a[z]()&&Ta(a,b,c)}}function Sa(a,b){var c=a[G]?r(a):J(za),d=b?r(b):null,e=b?r(b[M]()):c;w[c]=a;a[G]=function(){return c};a[z]=function(){return w[d]};a[M]=function(){return w[e]};
a[W]=function(){return this}}function Ta(a,b,c){a.x||(q("push pop shift unshift splice sort reverse".split(" "),function(d){var e=a[d];a[d]=function(){var g=a.length,h=e.apply(a,arguments);if("push"==d)for(var l=g;l<h;l++)C(a[l],a,l);else if("unshift"==d)for(l=0;l<h-g;l++)C(a[l],a,l);ga(ca+" "+H,b,c,a);return h}}),a.x=1)}function n(a,b,c,d){if(Na(a,b))return c&&c.push(r(a)+"-"+b),a[b];var e=r(a)+"#"+b;if(c||!x[e]){var g=[],h=b.replace(Ua,function(a){var b="{"+g.length+"}";g.push(a);return b}),h=h.replace(Va,
function(b){if(/^\d+(\.\d+)?$/g.test(b)||0<=Wa.indexOf(b)||"]"===b.slice(0,1))return b;b=b.split(oa).join(M+"()");b=b.split(pa).join(z+"()");b=b.split(qa).join(W+"()");if(c){var d;a:{var e="return _."+b;if(d=ia(e)){d=d(a);if(0>e.indexOf(".")){d=r(a)+"-"+e;break a}var g=e.split("."),e=g.pop();if(P(d)){d=r(d[z]())+"-"+e;break a}if(d=ia(g.join("."))){d=r(d(a))+"-"+e;break a}}d=void 0}d&&c.push(d)}return"_."+b});for(i=0;i<g.length;i++)h=h.replace("{"+i+"}",g[i]);x[e]=x[e]||ia("return "+h)}if(d)return x[e];
if(!c)try{return x[e](a)}catch(l){ea("#2",x[e],a,b,l)}}function ia(a){try{return new Function("_",a)}catch(b){ea("#1",a)}}function Q(a,b,c){if(a._bindInfo)return Da(a._bindInfo);a=ja(a);if(!a)return 0;a.$d=r(b);if(c)for(var d in a)if("$d"!=d&&d!=v&&d!=ba)if(d==Z||d==aa)for(var e=a[d].split(";"),g=0,h;g<e.length;g++){h=e[g].split("=");var l=[];n(b,h[1],l);for(h=0;h<l.length;h++)c.push(l[h])}else for(l=[],n(b,a[d],l),g=0;g<l.length;g++)c.push(l[g]);return a}function ja(a){var b={},c;a=a.getAttribute(L);
if(!a)return null;a=a.replace(/,{1}\s*\w+\s*:{1}/g,function(a){return"\n"+a.substring(1)}).split("\n");q(a,function(a){c=a.split(":");b[O(c[0]).toLowerCase()]=O(a.substring(a.indexOf(":")+1))});return b}function Ea(a,b){var c=[],d=Q(a,b,c);q(c,function(b){Fa(a,b)});d[v]||(c=d[N]||d[X],void 0!==b[c]&&(d[v]=c));a._bindInfo=Da(d)}function Ga(a,b){for(var c=a.querySelectorAll(b||F),d=Xa(Ha),e=[],g=0;g<d.length;g++)e.push("["+L+"*="+d[g]+"]");q(c,function(a){var b=ja(a),c=0,g;for(g in b)0<=d.indexOf(g)&&
(c=1);if(c){for(b=0;b<d.length;b++)Ya(a,e[b],d[b])&&Ga(a);var f=p.createDocumentFragment(),b=Oa(a.childNodes);q(b,function(a){f.appendChild(a.cloneNode(!0))});b=J(Aa);p[b]=f;a.setAttribute("_template",b);R(a)}})}function Ya(a,b,c){a=a.querySelectorAll(b);for(b=0;b<a.length;b++)if(ja(el)[c])return!0;return!1}function Za(a,b){Ga(b||p);var c=(b||p).querySelectorAll(F);q(c,function(b){Ea(b,a)})}function $a(a){a=(a||p).querySelectorAll(F);q(a,function(a){ka(a)})}function m(a,b,c,d,e,g){g={};g[la]=a;g[S]=
b;g[K]=c||0;g[Ha]=!!d;g[Ia]=!!e;t[a]=g}function Xa(a){var b=[],c;for(c in t)a?t[c][a]&&b.push(c):b.push(c);return b}function ma(a,b,c){var d,e=a.split(";");for(a=0;a<e.length;a++)d=e[a].split("="),2==d.length&&(b.push(O(d[0])),c.push(O(d[1])))}function Ja(a,b,c){var d=[],e=a.getAttribute("style");if(e){var g=[],h=[];ma(e,g,h);for(e=0;e<g.length;e++)0>b.indexOf(k)&&d.push(g[e]+":"+h[e]);c&&d.push(c);e=d.join(";");a.setAttribute("style",e);return e}}function T(a,b,c){var d;c?(d=p.createDocumentFragment(),
A(a)&&0<a.length&&q(a,function(a){if(a){var c;a=T(a,b);for(var h=0;h<a.childNodes.length;h++)"TBODY"==a.childNodes[h].tagName&&(c=a.childNodes[h]);if(c)for(h=0;h<c.childNodes.length;h++)d.appendChild(c.childNodes[h]);else d.appendChild(a)}})):(d=p[b.getAttribute("_template")].cloneNode(!0),q(d.querySelectorAll(F),function(b){Ea(b,a);ka(b)}));return d}function ka(a,b,c){b=b||Q(a);if(!D){D=[];for(k in t)D.push(t[k]);D.sort(function(a,b){return a[K]==b[K]?0:a[K]<b[K]?1:-1})}q(D,function(d){function e(){try{n(m,
f,0,1).call(m,m)}catch(b){ea("#3",a,f,m,b)}}var f=b[d[la]],m=w[b.$d];if(f&&!(c&&0>f.indexOf(c)))if(d[Ia])Ka(d[la],e,a);else d[S](a,m,f)});for(var d in b)if(!t[d]&&"$d"!=d){var e=b[d];c&&0>e.indexOf(c)||(e=n(w[b.$d],e),t["*"][S](a,d,e))}}function ab(a,b){for(var c=p.querySelectorAll("."+r(a)+"-"+b),d=0;d<c.length;d++)ka(c[d],"",b)}function bb(a){a=a.target;var b=Q(a);if(b){var c=b[v]||b[N]||b[Y];if(null==c)Ra("[ignore datachange]",a);else{var b=w[b.$d],d=b[c];"checkbox"==a.type?A(d)?a.checked?0>d.indexOf(a.value)&&
d.push(a.value):0<=d.indexOf(a.value)&&d.splice(d.indexOf(a.value),1):d=a.checked?a.value:"":d=a.value;fa(b,c,d)}}}function Ka(a,b,c){c.addEventListener?c.addEventListener(a,b,!1):c.attachEvent?c.attachEvent("on"+a,b):c["on"+a]=b}function Fa(a,b){if(La)if(a.className){var c=a.className.split(" ");0<=c.indexOf(b)||(c.push(b),a.className=c.join(" "))}else a.className=b;else a.classList.contains(b)||a.classList.add(b)}function R(a){try{a.innerHTML=""}catch(b){for(;a.firstChild;)a.removeChild(a.firstChild)}}
function Ma(a,b){a&&"function"==typeof b&&b.constructor==Function&&a.replace(U,function(a,d){(y[a]=y[a]||[]).push(b)})}function ga(a,b){var c=B.call(arguments,1);a.replace(U,function(a){a=y[a]||[];for(var e=0;e<a.length;e++)Pa(b,a[e],c)})}function ha(a,b,c){isNaN(a);var d=isNaN(a)?B.call(arguments,0):B.call(arguments,1);cb(function(){ga.apply(null,d)},a)}var La=E==p&&p!=E;Array.prototype.indexOf||(Array.prototype.indexOf=function(a,b){for(var c=b||0;c<this.length;c++)if(this[c]===a)return c;return-1});
var f={},V,L,F,G,z,M,W,oa,pa,qa,v,N,X,ra,sa,ta,ua,va,Y,Z,aa,wa,xa,ya,ba,ca,H,za,Aa;na();var B=Array.prototype.slice,cb=setTimeout,w={},Ua=/(['"])[^'"]*\1/g,Va=/([\w$_\.\[\]]+)/g,x={},Wa="true false null alert this _ if else".split(" "),t={},D,la="k",S="f",K="o",Ha="t",Ia="e";m("*",function(a,b,c){c=(new Option(null==c?"":c)).innerHTML.replace(/"/g,"&quot;");a.setAttribute(b,c)});m(N,function(a,b,c){var d=n(b,c);a.value=null==d?"":d;t[v][S](a,b,c,d)});m(ta,function(a,b,c){b=n(b,c);a.readOnly=!!b});
m(ua,function(a,b,c){b=n(b,c);a.disabled=!!b},5);m(Y,function(a,b,c){b=n(b,c);A(b)?a.checked=0<=b.indexOf(a.value):a.checked=b==a.value});m(va,function(a,b,c){b=n(b,c);Ja(a,["visibility","display"]);b?a.style.visibility="visible":a.style.display="none"},5);m(Z,function(a,b,c){var d=[],e=[];ma(c,d,e);if(d.length){c=[];for(var g=0;g<d.length;g++)c.push(d[g]+":"+n(b,e[g]));Ja(a,d,c.join(";"))}},5);m(aa,function(a,b,c){var d=[],e=[];ma(c,d,e);if(d.length)for(c=0;c<d.length;c++)if(n(b,e[c]))Fa(a,d[c]);
else{var g=a,f=d[c];if(La){var l=g.className.split(" "),f=l.indexOf(f);0<=f&&(l.slice(f,1),g.className=l.join(" "))}else g.classList.remove(f)}});m(X,function(a,b,c){b=n(b,c);a.textContent=null==b?"":b});m(ra,function(a,b,c){b=n(b,c);a.innerHTML=null==b?"":b});m(v,function(a,b,c,d){(a=Q(a)[v])&&a!=c&&fa(b,a,d)});m(sa,function(a,b,c){b=n(b,c);a.length=0;if(null!=b&&!I(b)){var d=a.options;A(b)||(b=b.split(";").join(",").split(","));q(b,function(a){if(I(a))d[d.length]=new Option(a.text,a.value);else if(null==
a)d[d.length]=new Option("","");else{var b=a.split(":");d[d.length]=new Option(1<b.length?b[1]:a,b[0])}})}},5);m(ba,null,0,0,1);m(wa,function(a,b,c){b=n(b,c);R(a);b&&b.length&&a.appendChild(T(b,a,!0))},7,1);m(xa,function(a,b,c){b=n(b,c);R(a);a.appendChild(T(b,a))},8,1);m(ya,function(a,b,c){c=n(b,c);R(a);if(c)a.appendChild(T(b,a));else return!1},9,1);var U=/\S+/g,y={};E.addEventListener("beforeunload",function(a){x=y=D=t=w=null});var u={};u.settings=Ba;u.bind=function(a,b,c){c&&Ba(c);C(a);b=b?p.querySelector(b):
p;Za(a,b);$a(b);Ma(H,ab);Ka("change",bb,p)};u.set=fa;u.on=Ma;u.off=function(a,b){a&&"*"!=a?b?a.replace(U,function(a){a=y[a];for(var d=0;d<a.length;d++)b===a[d]&&a.splice(d--,1)}):a.replace(U,function(a){y[a]=[]}):y={}};u.notify=ha;"object"==typeof exports?module.exports=u:"function"==typeof define&&define.amd?define(function(){return u}):E.gotoEasy=E.$easy=u})(window,document);