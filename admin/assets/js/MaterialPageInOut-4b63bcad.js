var H=Object.defineProperty;var I=Object.getOwnPropertySymbols;var Q=Object.prototype.hasOwnProperty,Y=Object.prototype.propertyIsEnumerable;var N=(m,r,u)=>r in m?H(m,r,{enumerable:!0,configurable:!0,writable:!0,value:u}):m[r]=u,T=(m,r)=>{for(var u in r||(r={}))Q.call(r,u)&&N(m,u,r[u]);if(I)for(var u of I(r))Y.call(r,u)&&N(m,u,r[u]);return m};var F=(m,r,u)=>new Promise((E,a)=>{var g=p=>{try{v(u.next(p))}catch(U){a(U)}},_=p=>{try{v(u.throw(p))}catch(U){a(U)}},v=p=>p.done?E(p.value):Promise.resolve(p.value).then(g,_);v((u=u.apply(m,r)).next())});import{u as G,U as J,Q as K,r as S,b as L,c as k,k as w,h as l,g as e,e as o,j as W,f as $,l as x,O as X,$ as Z,V as O,E as h,s as ee,R as te,S as oe,Y as le,T as ae,z as ne,A as ue,x as se,P as re}from"./index-919bd748.js";/* empty css                   *//* empty css               *//* empty css                  *//* empty css                *//* empty css                *//* empty css                        *//* empty css                 *//* empty css                */import{_ as de}from"./DictSelect-53263b13.js";/* empty css               */import{u as ie}from"./useDetailPageHooks-0c6721b9.js";/* empty css               *//* empty css                  *//* empty css                     */const me={style:{padding:"0 60px"}},pe=$("span",null,"确 定",-1),Ne={__name:"MaterialPageInOut",setup(m,{expose:r}){const u=G("material"),E={mitt:u,detail:"pageInout"},{formData:a,title:g,visible:_,fnClose:v}=ie(E),p=J(),U=K({quantity:[{required:!0,message:"请输入数量",trigger:"blur"}]}),q=S(),c=S(!0),B=f=>{g.value="【入库】耗材物资",c.value=!0,_.value=!0;const t="入库",i=f.id,{code:s,name:d,unit:V}=f,b=0,y=p.loginUserName;a.value={inOut:t,materialId:i,code:s,name:d,unit:V,quantity:b,opUser:y}},D=f=>{g.value="【出库】耗材物资",c.value=!1,_.value=!0;const t="出库",i=f.id,{code:s,name:d,unit:V}=f,b=0,y=p.loginUserName;a.value={inOut:t,materialId:i,code:s,name:d,unit:V,quantity:b,opUser:y}},M=()=>F(this,null,function*(){yield q.value.validate(f=>{if(!f)return;const t=c.value?"/lab/material/in":"/lab/material/out",i=T({},a.value);Z(t,i).then(s=>{if(!s.success)return O.error(s.message);O.info("操作成功！"),_.value=!1,u.emit("main:search")})})});return r({checkin:B,checkout:D}),(f,t)=>{const i=h,s=ee,d=te,V=de,b=oe,y=le,P=ae,R=L("Select"),z=ne,C=ue,j=se,A=re;return k(),w(A,{modelValue:o(_),"onUpdate:modelValue":t[12]||(t[12]=n=>X(_)?_.value=n:null),title:o(g),size:"700","before-close":o(v)},{footer:l(()=>[e(j,null,{default:l(()=>[e(C,{type:"primary",onClick:M},{default:l(()=>[e(z,null,{default:l(()=>[e(R)]),_:1}),pe]),_:1}),e(C,{onClick:t[11]||(t[11]=n=>o(v)(!0))},{default:l(()=>[W("关 闭")]),_:1})]),_:1})]),default:l(()=>[$("div",me,[e(P,{ref_key:"form",ref:q,model:o(a),rules:o(U),"label-width":"auto","label-position":"right","status-icon":""},{default:l(()=>[e(b,{shadow:"never"},{default:l(()=>[e(d,{span:24},{default:l(()=>[e(s,{label:"耗材物资编码",prop:"code"},{default:l(()=>[e(i,{modelValue:o(a).code,"onUpdate:modelValue":t[0]||(t[0]=n=>o(a).code=n),disabled:!0},null,8,["modelValue"])]),_:1})]),_:1}),e(d,{span:24},{default:l(()=>[e(s,{label:"耗材物资名称",prop:"name"},{default:l(()=>[e(i,{modelValue:o(a).name,"onUpdate:modelValue":t[1]||(t[1]=n=>o(a).name=n),disabled:!0},null,8,["modelValue"])]),_:1})]),_:1}),e(d,{span:24},{default:l(()=>[e(s,{label:"计量单位",prop:"unit"},{default:l(()=>[e(V,{modelValue:o(a).unit,"onUpdate:modelValue":t[2]||(t[2]=n=>o(a).unit=n),dict:"unit",disabled:!0},null,8,["modelValue"])]),_:1})]),_:1})]),_:1}),e(b,{shadow:"never",style:{"margin-top":"20px"}},{default:l(()=>[o(c)?(k(),w(d,{key:0,span:24},{default:l(()=>[e(s,{label:"入库数量",prop:"quantity"},{default:l(()=>[e(y,{modelValue:o(a).quantity,"onUpdate:modelValue":t[3]||(t[3]=n=>o(a).quantity=n),min:1},null,8,["modelValue"])]),_:1})]),_:1})):x("",!0),o(c)?(k(),w(d,{key:1,span:24},{default:l(()=>[e(s,{label:"入库来源",prop:"inFrom"},{default:l(()=>[e(i,{modelValue:o(a).inFrom,"onUpdate:modelValue":t[5]||(t[5]=n=>o(a).inFrom=n),placeholder:"请输入入库来源",class:"input-with-select"},{prepend:l(()=>[e(V,{dict:"inout-from",value:"name",style:{width:"70px"},placeholder:"常用语",onChange:t[4]||(t[4]=n=>o(a).inFrom=n)})]),_:1},8,["modelValue"])]),_:1})]),_:1})):x("",!0),o(c)?x("",!0):(k(),w(d,{key:2,span:24},{default:l(()=>[e(s,{label:"出库数量",prop:"quantity"},{default:l(()=>[e(y,{modelValue:o(a).quantity,"onUpdate:modelValue":t[6]||(t[6]=n=>o(a).quantity=n),min:1},null,8,["modelValue"])]),_:1})]),_:1})),o(c)?x("",!0):(k(),w(d,{key:3,span:24},{default:l(()=>[e(s,{label:"出库去处",prop:"outTo"},{default:l(()=>[e(i,{modelValue:o(a).outTo,"onUpdate:modelValue":t[8]||(t[8]=n=>o(a).outTo=n),placeholder:"请输入出库去处",class:"input-with-select"},{prepend:l(()=>[e(V,{dict:"inout-to",value:"name",style:{width:"70px"},placeholder:"常用语","load-on-open":!0,onChange:t[7]||(t[7]=n=>o(a).outTo=n)})]),_:1},8,["modelValue"])]),_:1})]),_:1})),e(d,{span:24},{default:l(()=>[e(s,{label:"备注",prop:"note"},{default:l(()=>[e(i,{modelValue:o(a).note,"onUpdate:modelValue":t[9]||(t[9]=n=>o(a).note=n),autosize:{minRows:3},type:"textarea",placeholder:"请输入备注"},null,8,["modelValue"])]),_:1})]),_:1}),e(d,{span:24},{default:l(()=>[e(s,{label:"经办者",prop:"opUser"},{default:l(()=>[e(i,{modelValue:o(a).opUser,"onUpdate:modelValue":t[10]||(t[10]=n=>o(a).opUser=n),disabled:!0},null,8,["modelValue"])]),_:1})]),_:1})]),_:1})]),_:1},8,["model","rules"])])]),_:1},8,["modelValue","title","before-close"])}}};export{Ne as default};
