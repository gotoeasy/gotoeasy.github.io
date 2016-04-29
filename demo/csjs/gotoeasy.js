/* gotoEasy 0.1, (c) 2016 Zhang Ming, @license MIT (http://gotoeasy.github.io) */
!function(n,e){function t(){Sn=null==ie.debug?1:ie.debug,_n=ie.domAttrBind||"data-bind",$n=fn+_n+cn,Fn=ie.dataKeyFnId||"_$id",Ln=ie.dataKeyFnParent||"_$parent",qn=ie.dataKeyFnRoot||"_$root",Dn=ie.dataKeyFnData||"_$data",Tn=ie.bindRefRoot||"$root",En=ie.bindRefParent||"$parent",Rn=ie.bindRefData||"$data",In=ie.bindKeyField||"field",Hn=ie.bindKeyValue||"value",Pn=ie.bindKeyInnerText||"text",Mn=ie.bindKeyInnerHtml||"html",Vn=ie.bindKeyOptions||"options",Bn=ie.bindKeyReadonly||"readonly",Jn=ie.bindKeyDisabled||"disabled",Un=ie.bindKeyVisible||"visible",Wn=ie.bindKeyChecked||"checked",Xn=ie.bindKeyStyle||"style",Yn=ie.bindKeyClass||"class",zn=ie.bindKeyForeach||"foreach",Gn=ie.bindKeyWith||"with",Qn=ie.bindKeyIf||"if",Zn=ie.bindKeyClick||"click",ne=ie.eventDataChage||"datachange",ee=ie.eventUpdateView||"updaueview",te=ie.uidPrefixData||"d",re=ie.uidPrefixTemplate||"t"}function r(n){return n?(h(ie,n),t(),y(ie)):y(ie)}function o(n){return o[n]=o[n]||1,n+o[n]++}function u(n,e){return n.slice(0,e.length)===e}function a(n){return n.replace(/(^\s*)|(\s*$)/g,"")}function f(n){return null==n?"":n}function l(n){return d(n)?JSON.stringify(n):JSON.parse(n)}function c(n){return Array.isArray&&Array.isArray(n)||n instanceof Array||"[object Array]"==Object.prototype.toString.call(n)}function s(n){return n&&Object.prototype.toString.call(n)===sn}function d(n){return null!==n&&typeof n===vn}function v(n){return typeof n==dn&&n.constructor==Function}function p(n,e){return s(n)&&void 0!==n[e]}function h(n,e){if(s(e)){var t=Object.keys(n);for(var r in e)t.indexOf(r)>=0&&(n[r]=e[r])}}function y(n){var e={};for(var t in n)e[t]=n[t];return e}function g(n,e,t){var r=[];if((!e||0>e)&&(e=0),(!t||t>n.length)&&(t=n.length),e>=t)return r;for(var i=e;t>i;i++)r.push(n[i]);return r}function b(n,e){for(var t=0;t<n.length&&e(n[t],t)!==!1;t++);}function O(n,e,t){try{return e.apply(n,t)}catch(r){N(arguments,r)}}function x(n){return new Option(n).innerHTML.replace(/"/g,"&quot;")}function m(){j("log",ae.call(arguments),Sn)}function N(){j("warn",ae.call(arguments),Sn)}function K(){j("error",ae.call(arguments),1)}function j(n,e,t){if(t){for(var r=[],i=0;i<e.length;i++)r.push("_["+i+"]");var o="console."+n+"(";o+=r.join(","),o+=")";try{new Function("_",o)(e)}catch(u){console.warn(n,e,u)}}}function A(n,e,t,r){if(!n[Fn])return void(n[e]=t);var i=n[e];if(r||d(t)||t!==i)if(S(t,n,e),n[e]=t,on(ne,n,e,t,i),c(n)){var o=n[Ln]();for(k in o)o[k]===n&&un(ee,o,k,t,i)}else un(ee,n,e,t,i)}function w(n){return le[n]}function C(n){return n&&n[Fn]()}function S(n,e,t){if(d(n))if(_(n,e),s(n))for(var r in n)S(n[r],n,r);else if(c(n)){for(var i=0;i<n.length;i++)S(n[i],n,i);n[Ln]()&&$(n,e,t)}}function _(n,e){var t=n[Fn]?C(n):o(te),r=e?C(e):null,i=e?C(e[qn]()):t;le[t]=n,n[Fn]=function(){return t},n[Ln]=function(){return w(r)},n[qn]=function(){return w(i)},n[Dn]=function(){return this}}function $(n,e,t){n.x||(b(["push","pop","shift","unshift","splice","sort","reverse"],function(r){var i=n[r];n[r]=function(){var o=n.length,u=i.apply(n,arguments);if("push"==r)for(var a=o;u>a;a++)S(n[a],n,a);else if("unshift"==r)for(var a=0;u-o>a;a++)S(n[a],n,a);return on(ne+" "+ee,e,t,n),u}}),n.x=1)}function F(n,e,t,r){if(p(n,e))return t&&t.push(C(n)+"-"+e),n[e];var o=C(n)+"#"+e;if(t||!de[o]){var a=[],f=e.replace(ce,function(n){var e="{"+a.length+"}";return a.push(n),e});for(f=f.replace(se,function(e){if(/^\d+(\.\d+)?$/g.test(e)||he.indexOf(e)>=0||u(e,"]"))return e;if(e=e.split(Tn).join(qn+"()"),e=e.split(En).join(Ln+"()"),e=e.split(Rn).join(Dn+"()"),t){var r=q(n,"return _."+e);r&&t.push(r)}return"_."+e}),i=0;i<a.length;i++)f=f.replace("{"+i+"}",a[i]);de[o]=de[o]||L("return "+f)}if(r)return de[o];if(!t)try{return de[o](n)}catch(l){return void K("#2",de[o],n,e,l)}}function L(n){try{return new Function("_",n)}catch(e){K("#1",n)}}function q(n,e){var t=L(e);if(t){var r=t(n);if(e.indexOf(bn)<0)return C(n)+"-"+e;var i=e.split(bn),o=i.pop();if(d(r))return C(r[Ln]())+"-"+o;if(t=L(i.join(bn)))return C(t(n))+"-"+o}}function D(n,e,t){if(n[ve])return l(n[ve]);var r=T(n);if(!r)return 0;if(r[oe]=C(e),t)for(var i in r)if(i!=oe&&i!=In&&i!=Zn)if(i==Xn||i==Yn)for(var o,u=r[i].split(";"),a=0;a<u.length;a++){o=u[a].split("=");var f=[];F(e,o[1],f);for(var c=0;c<f.length;c++)t.push(f[c])}else{var f=[];F(e,r[i],f);for(var a=0;a<f.length;a++)t.push(f[a])}return r}function T(n){var e,t,r={},i=nn(n,_n);if(!i)return null;var o=i.replace(/,{1}\s*\w+\s*:{1}/g,function(n){return"\n"+n.substring(1)});return e=o.split("\n"),b(e,function(n){t=n.split(gn),r[a(t[0]).toLowerCase()]=a(n.substring(n.indexOf(gn)+1))}),r}function E(n,e){var t=[],r=D(n,e,t);if(b(t,function(e){G(n,e)}),!r[In]){var i=r[Hn]||r[Pn];void 0!==e[i]&&(r[In]=i)}n[ve]=l(r)}function R(n,t){for(var r=n.querySelectorAll(t||$n),i=V(xe),u=[],a=0;a<i.length;a++)u.push(fn+_n+ln+i[a]+cn);b(r,function(n){var t=T(n),r=0;for(var a in t)i.indexOf(a)>=0&&(r=1);if(r){for(var f=0;f<i.length;f++)I(n,u[f],i[f])&&R(n);var l=e.createDocumentFragment(),c=g(n.childNodes);b(c,function(n){l.appendChild(n.cloneNode(!0))});var s=o(re);e[s]=l,Z(n,pe,s),en(n)}})}function I(n,e,t){for(var r=n.querySelectorAll(e),i=0;i<r.length;i++){var o=T(el);if(o[t])return!0}return!1}function H(n,t){R(t||e);var r=(t||e).querySelectorAll($n);b(r,function(e){E(e,n)})}function P(n){var t=(n||e).querySelectorAll($n);b(t,function(n){W(n)})}function M(n,e,t,r,i,o){var u={};u[ge]=n,u[be]=e,u[Oe]=t||0,u[xe]=!!r,u[me]=!!i,ye[n]=u}function V(n){var e,t=[];for(e in ye)n?ye[e][n]&&t.push(e):t.push(e);return t}function B(n,e,t){var r,i,o=n.split(On);for(r=0;r<o.length;r++)i=o[r].split(xn),2==i.length&&(e.push(a(i[0])),t.push(a(i[1])))}function J(n,e,t){var r=[],i=nn(n,Nn);if(i){var o=[],u=[];B(i,o,u);for(var a=0;a<o.length;a++)e.indexOf(k)<0&&r.push(o[a]+gn+u[a]);return t&&r.push(t),i=r.join(On),Z(n,Nn,i),i}}function U(n,t,r){var i;return r?(i=e.createDocumentFragment(),c(n)&&n.length>0&&b(n,function(n){if(n){for(var e,r=U(n,t),o=0;o<r.childNodes.length;o++)r.childNodes[o].tagName==An&&(e=r.childNodes[o]);if(e)for(var o=0;o<e.childNodes.length;o++)i.appendChild(e.childNodes[o]);else i.appendChild(r)}})):(i=e[nn(t,pe)].cloneNode(!0),b(i.querySelectorAll($n),function(e){E(e,n),W(e)})),i}function W(n,e,t){if(e=e||D(n),!ue){ue=[];for(k in ye)ue.push(ye[k]);ue.sort(function(n,e){return n[Oe]==e[Oe]?0:n[Oe]<e[Oe]?1:-1})}b(ue,function(r){function i(){try{var e=F(u,o,0,1);e.call(u,u)}catch(t){K("#3",n,o,u,t)}}var o=e[r[ge]],u=w(e[oe]);if(o){if(t&&o.indexOf(t)<0)return;r[me]?z(r[ge],i,n):r[be](n,u,o)}});for(var r in e)if(!ye[r]&&r!=oe){var i=e[r];if(!(t&&i.indexOf(t)<0)){var o=w(e[oe]),u=F(o,i);ye[kn][be](n,r,u)}}}function X(n,t){for(var r=e.querySelectorAll(bn+C(n)+wn+t),i=0;i<r.length;i++)W(r[i],mn,t)}function Y(n){var e=n.target,t=D(e);if(t){var r=t[In]||t[Hn]||t[Wn];if(null==r)return void m("[ignore datachange]",e);var i=w(t[oe]),o=i[r];"checkbox"==e.type?c(o)?e.checked?o.indexOf(e.value)<0&&o.push(e.value):o.indexOf(e.value)>=0&&o.splice(o.indexOf(e.value),1):o=e.checked?e.value:mn:o=e.value,A(i,r,o)}}function z(n,e,t){t.addEventListener?t.addEventListener(n,e,!1):t.attachEvent?t.attachEvent("on"+n,e):t["on"+n]=e}function G(n,e){if(Cn)if(n.className){var t=n.className.split(" ");if(t.indexOf(e)>=0)return;t.push(e),n.className=t.join(" ")}else n.className=e;else n.classList.contains(e)||n.classList.add(e)}function Q(n,e){if(Cn){var t=n.className.split(" "),r=t.indexOf(e);r>=0&&(t.slice(r,1),n.className=t.join(" "))}else n.classList.remove(e)}function Z(n,e,t){return n.setAttribute(e,t)}function nn(n,e){return n.getAttribute(e)}function en(n){try{n.innerHTML=""}catch(e){for(;n.firstChild;)n.removeChild(n.firstChild)}}function tn(n,e){n&&v(e)&&n.replace(Ne,function(n,t){(Ke[n]=Ke[n]||[]).push(e)})}function rn(n,e){n&&"*"!=n?e?n.replace(Ne,function(n){for(var t=Ke[n],r=0;r<t.length;r++)e===t[r]&&t.splice(r--,1)}):n.replace(Ne,function(n){Ke[n]=[]}):Ke={}}function on(n,e){var t=ae.call(arguments,1);n.replace(Ne,function(n){for(var r=Ke[n]||[],i=0;i<r.length;i++)O(e,r[i],t)})}function un(n,e,t){var r=(isNaN(n)?0:n,isNaN(n)?ae.call(arguments,0):ae.call(arguments,1));fe(function(){on.apply(null,r)},n)}function an(n,t,i){i&&r(i),S(n);var o=t?e.querySelector(t):e;H(n,o),P(o),tn(ee,X),z("change",Y,e)}var fn="[",ln="*=",cn="]",sn="[object Object]",dn="function",vn="object",pn="visibility",hn="display",yn=",",gn=":",bn=".",On=";",xn="=",mn="",Nn="style",Kn="visible",jn="none",An="TBODY",kn="*",wn="-",Cn=n==e&&e!=n;"number"==typeof n.screenX;Array.prototype.indexOf||(Array.prototype.indexOf=function(n,e){for(var t=e||0;t<this.length;t++)if(this[t]===n)return t;return-1});var Sn,_n,$n,Fn,Ln,qn,Dn,Tn,En,Rn,In,Hn,Pn,Mn,Vn,Bn,Jn,Un,Wn,Xn,Yn,zn,Gn,Qn,Zn,ne,ee,te,re,ie={},oe="$d";t();var ue,ae=Array.prototype.slice,fe=setTimeout,le={},ce=/(['"])[^'"]*\1/g,se=/([\w$_\.\[\]]+)/g,de={},ve="_bindInfo",pe="_template",he="true false null alert this _ if else".split(" "),ye={},ge="k",be="f",Oe="o",xe="t",me="e";M("*",function(n,e,t){Z(n,e,x(f(t)))}),M(Hn,function(n,e,t){var r=F(e,t);n.value=f(r),ye[In][be](n,e,t,r)}),M(Bn,function(n,e,t){var r=F(e,t);n.readOnly=!!r}),M(Jn,function(n,e,t){var r=F(e,t);n.disabled=!!r},5),M(Wn,function(n,e,t){var r=F(e,t);c(r)?n.checked=r.indexOf(n.value)>=0:n.checked=r==n.value}),M(Un,function(n,e,t){var r=F(e,t);J(n,[pn,hn]),r?n.style.visibility=Kn:n.style.display=jn},5),M(Xn,function(n,e,t){var r=[],i=[];if(B(t,r,i),r.length){for(var o=[],u=0;u<r.length;u++)o.push(r[u]+gn+F(e,i[u]));J(n,r,o.join(On))}},5),M(Yn,function(n,e,t){var r=[],i=[];if(B(t,r,i),r.length)for(var o=0;o<r.length;o++)F(e,i[o])?G(n,r[o]):Q(n,r[o])}),M(Pn,function(n,e,t){var r=F(e,t);n.textContent=null==r?mn:r}),M(Mn,function(n,e,t){var r=F(e,t);n.innerHTML=null==r?mn:r}),M(In,function(n,e,t,r){var i=D(n)[In];i&&i!=t&&A(e,i,r)}),M(Vn,function(n,e,t){var r=F(e,t);if(n.length=0,null!=r&&!s(r)){var i=n.options;c(r)||(r=r.split(On).join(yn).split(yn)),b(r,function(n){if(s(n))i[i.length]=new Option(n.text,n.value);else if(null==n)i[i.length]=new Option(mn,mn);else{var e=n.split(gn);i[i.length]=new Option(e.length>1?e[1]:n,e[0])}})}},5),M(Zn,null,0,0,1),M(zn,function(n,e,t){var r=F(e,t);en(n),r&&r.length&&n.appendChild(U(r,n,!0))},7,1),M(Gn,function(n,e,t){var r=F(e,t);en(n),n.appendChild(U(r,n))},8,1),M(Qn,function(n,e,t){var r=F(e,t);return en(n),r?void n.appendChild(U(e,n)):!1},9,1);var Ne=/\S+/g,Ke={};n.addEventListener("beforeunload",function(n){le=null,ye=null,ue=null,Ke=null,de=null});var je={};je.settings=r,je.bind=an,je.set=A,je.on=tn,je.off=rn,je.notify=un,"object"==typeof exports?module.exports=je:"function"==typeof define&&define.amd?define(function(){return je}):n.gotoEasy=n.$easy=je}(window,document);