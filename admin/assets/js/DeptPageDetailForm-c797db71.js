import{r as p,Q as v,c as i,k as f,h as r,g as a,e,l as N,E as g,s as E,Y as k,S as x,T as B}from"./index-919bd748.js";/* empty css                *//* empty css                *//* empty css                        *//* empty css                 */const h={__name:"DeptPageDetailForm",props:{data:{type:Object,default(){return{}}},readonly:{type:Boolean,default:!0},isCreateMode:{type:Boolean,default:!1}},setup(d,{expose:c}){const t=p(d.data),s=p(),_=v({deptName:[{required:!0,message:"请输入组织机构名称",trigger:"blur"}]});return c({validate:m=>s.value.validate(m)}),(m,l)=>{const u=g,n=E,b=k,V=x,y=B;return i(),f(y,{ref_key:"form",ref:s,model:e(t),rules:e(_),"label-width":"auto","label-position":"right","status-icon":""},{default:r(()=>[a(V,{shadow:"never"},{default:r(()=>[e(t).level>1?(i(),f(n,{key:0,label:"上级组织机构",prop:"parentTitle"},{default:r(()=>[a(u,{modelValue:e(t).parentTitle,"onUpdate:modelValue":l[0]||(l[0]=o=>e(t).parentTitle=o),disabled:""},null,8,["modelValue"])]),_:1})):N("",!0),a(n,{label:"组织机构名称",prop:"deptName"},{default:r(()=>[a(u,{modelValue:e(t).deptName,"onUpdate:modelValue":l[1]||(l[1]=o=>e(t).deptName=o),disabled:d.readonly,placeholder:"请输入组织机构名称"},null,8,["modelValue","disabled"])]),_:1}),a(n,{label:"排序",prop:"sort"},{default:r(()=>[a(b,{modelValue:e(t).sort,"onUpdate:modelValue":l[2]||(l[2]=o=>e(t).sort=o),disabled:d.readonly},null,8,["modelValue","disabled"])]),_:1})]),_:1})]),_:1},8,["model","rules"])}}};export{h as default};
