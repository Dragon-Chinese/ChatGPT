import{i as t}from"./_vue-demi@0.14.5@vue-demi-46a7f895.js";import{a2 as e,i as n,w as s,n as o,f as c}from"./_@vue_runtime-core@3.3.4@@vue-e5c0790c.js";import{w as a,r,m as i,a as u,i as f,c as p,t as l,g as h,o as d,v}from"./_@vue_reactivity@3.3.4@@vue-76911006.js";
/*!
  * pinia v2.1.4
  * (c) 2023 Eduardo San Martin Morote
  * @license MIT
  */let y;const _=t=>y=t,b=Symbol();function m(t){return t&&"object"==typeof t&&"[object Object]"===Object.prototype.toString.call(t)&&"function"!=typeof t.toJSON}var j,O;function $(){const e=a(!0),n=e.run((()=>r({})));let s=[],o=[];const c=i({install(t){_(c),c._a=t,t.provide(b,c),t.config.globalProperties.$pinia=c,o.forEach((t=>s.push(t))),o=[]},use(e){return this._a||t?s.push(e):o.push(e),this},_p:s,_a:null,_e:e,_s:new Map,state:n});return c}(O=j||(j={})).direct="direct",O.patchObject="patch object",O.patchFunction="patch function";const g=()=>{};function w(t,e,n,s=g){t.push(e);const o=()=>{const n=t.indexOf(e);n>-1&&(t.splice(n,1),s())};return!n&&h()&&d(o),o}function P(t,...e){t.slice().forEach((t=>{t(...e)}))}const S=t=>t();function E(t,e){t instanceof Map&&e instanceof Map&&e.forEach(((e,n)=>t.set(n,e))),t instanceof Set&&e instanceof Set&&e.forEach(t.add,t);for(const n in e){if(!e.hasOwnProperty(n))continue;const s=e[n],o=t[n];m(o)&&m(s)&&t.hasOwnProperty(n)&&!f(s)&&!p(s)?t[n]=E(o,s):t[n]=s}return t}const x=Symbol();const{assign:I}=Object;function M(t,e,n={},c,i,h){let d;const v=I({actions:{}},n),y={deep:!0};let b,O,$,M=[],A=[];const F=c.state.value[t];let k;function C(e){let n;b=O=!1,"function"==typeof e?(e(c.state.value[t]),n={type:j.patchFunction,storeId:t,events:$}):(E(c.state.value[t],e),n={type:j.patchObject,payload:e,storeId:t,events:$});const s=k=Symbol();o().then((()=>{k===s&&(b=!0)})),O=!0,P(M,n,c.state.value[t])}h||F||(c.state.value[t]={}),r({});const J=h?function(){const{state:t}=n,e=t?t():{};this.$patch((t=>{I(t,e)}))}:g;function N(e,n){return function(){_(c);const s=Array.from(arguments),o=[],a=[];let r;P(A,{args:s,name:e,store:q,after:function(t){o.push(t)},onError:function(t){a.push(t)}});try{r=n.apply(this&&this.$id===t?this:q,s)}catch(i){throw P(a,i),i}return r instanceof Promise?r.then((t=>(P(o,t),t))).catch((t=>(P(a,t),Promise.reject(t)))):(P(o,r),r)}}const W={_p:c,$id:t,$onAction:w.bind(null,A),$patch:C,$reset:J,$subscribe(e,n={}){const o=w(M,e,n.detached,(()=>a())),a=d.run((()=>s((()=>c.state.value[t]),(s=>{("sync"===n.flush?O:b)&&e({storeId:t,type:j.direct,events:$},s)}),I({},y,n))));return o},$dispose:function(){d.stop(),M=[],A=[],c._s.delete(t)}},q=u(W);c._s.set(t,q);const z=c._a&&c._a.runWithContext||S,B=c._e.run((()=>(d=a(),z((()=>d.run(e))))));for(const s in B){const e=B[s];if(f(e)&&(!f(G=e)||!G.effect)||p(e))h||(!F||m(D=e)&&D.hasOwnProperty(x)||(f(e)?e.value=F[s]:E(e,F[s])),c.state.value[t][s]=e);else if("function"==typeof e){const t=N(s,e);B[s]=t,v.actions[s]=e}}var D,G;return I(q,B),I(l(q),B),Object.defineProperty(q,"$state",{get:()=>c.state.value[t],set:t=>{C((e=>{I(e,t)}))}}),c._p.forEach((t=>{I(q,d.run((()=>t({store:q,app:c._a,pinia:c,options:v}))))})),F&&h&&n.hydrate&&n.hydrate(q.$state,F),b=!0,O=!0,q}function A(t,s,o){let a,r;const u="function"==typeof s;function f(t,o){const f=e();(t=t||(f?n(b,null):null))&&_(t),(t=y)._s.has(a)||(u?M(a,s,r,t):function(t,e,n,s){const{state:o,actions:a,getters:r}=e,u=n.state.value[t];let f;f=M(t,(function(){u||(n.state.value[t]=o?o():{});const e=v(n.state.value[t]);return I(e,a,Object.keys(r||{}).reduce(((e,s)=>(e[s]=i(c((()=>{_(n);const e=n._s.get(t);return r[s].call(e,e)}))),e)),{}))}),e,n,0,!0)}(a,r,t));return t._s.get(a)}return"string"==typeof t?(a=t,r=u?o:s):(r=t,a=t.id),f.$id=a,f}export{$ as c,A as d};
