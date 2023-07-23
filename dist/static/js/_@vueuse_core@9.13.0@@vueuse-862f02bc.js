import{i as e,n as t,r as n,t as a,a as i,b as o,c as r,d as u,e as s,f as l}from"./_@vueuse_shared@9.13.0@@vueuse-47365d34.js";import{w as c,f as d,l as v}from"./_@vue_runtime-core@3.3.4@@vue-e5c0790c.js";import{r as f}from"./_@vue_reactivity@3.3.4@@vue-76911006.js";function p(e){var t;const a=n(e);return null!=(t=null==a?void 0:a.$el)?t:a}const m=i?window:void 0,y=i?window.document:void 0;function h(...i){let o,r,u,s;if(e(i[0])||Array.isArray(i[0])?([r,u,s]=i,o=m):[o,r,u,s]=i,!o)return t;Array.isArray(r)||(r=[r]),Array.isArray(u)||(u=[u]);const l=[],d=()=>{l.forEach((e=>e())),l.length=0},v=c((()=>[p(o),n(s)]),(([e,t])=>{d(),e&&l.push(...r.flatMap((n=>u.map((a=>((e,t,n,a)=>(e.addEventListener(t,n,a),()=>e.removeEventListener(t,n,a)))(e,n,a,t))))))}),{immediate:!0,flush:"post"}),f=()=>{v(),d()};return a(f),f}let b=!1;function O(e,n,a={}){const{window:i=m,ignore:r=[],capture:u=!0,detectIframe:s=!1}=a;if(!i)return;o&&!b&&(b=!0,Array.from(i.document.body.children).forEach((e=>e.addEventListener("click",t))));let l=!0;const c=e=>r.some((t=>{if("string"==typeof t)return Array.from(i.document.querySelectorAll(t)).some((t=>t===e.target||e.composedPath().includes(t)));{const n=p(t);return n&&(e.target===n||e.composedPath().includes(n))}})),d=[h(i,"click",(t=>{const a=p(e);a&&a!==t.target&&!t.composedPath().includes(a)&&(0===t.detail&&(l=!c(t)),l?n(t):l=!0)}),{passive:!0,capture:u}),h(i,"pointerdown",(t=>{const n=p(e);n&&(l=!t.composedPath().includes(n)&&!c(t))}),{passive:!0}),s&&h(i,"blur",(t=>{var a;const o=p(e);"IFRAME"!==(null==(a=i.document.activeElement)?void 0:a.tagName)||(null==o?void 0:o.contains(i.document.activeElement))||n(t)}))].filter(Boolean);return()=>d.forEach((e=>e()))}const w="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},g="__vueuse_ssr_handlers__";function I(e,t,{window:a=m,initialValue:i=""}={}){const o=f(i),r=d((()=>{var e;return p(t)||(null==(e=null==a?void 0:a.document)?void 0:e.documentElement)}));return c([r,()=>n(e)],(([e,t])=>{var n;if(e&&a){const r=null==(n=a.getComputedStyle(e).getPropertyValue(t))?void 0:n.trim();o.value=r||i}}),{immediate:!0}),c(o,(t=>{var a;(null==(a=r.value)?void 0:a.style)&&r.value.style.setProperty(n(e),t)})),o}function E({document:e=y}={}){if(!e)return f("visible");const t=f(e.visibilityState);return h(e,"visibilitychange",(()=>{t.value=e.visibilityState})),t}w[g]=w[g]||{},w[g];var S,P,_=Object.getOwnPropertySymbols,j=Object.prototype.hasOwnProperty,x=Object.prototype.propertyIsEnumerable,A=(e,t)=>{var n={};for(var a in e)j.call(e,a)&&t.indexOf(a)<0&&(n[a]=e[a]);if(null!=e&&_)for(var a of _(e))t.indexOf(a)<0&&x.call(e,a)&&(n[a]=e[a]);return n};function N(e,t,n={}){const i=n,{window:o=m}=i,u=A(i,["window"]);let s;const l=function(e,t=!1){const n=f(),a=()=>n.value=Boolean(e());return a(),r(a,t),n}((()=>o&&"ResizeObserver"in o)),d=()=>{s&&(s.disconnect(),s=void 0)},v=c((()=>p(e)),(e=>{d(),l.value&&o&&e&&(s=new ResizeObserver(t),s.observe(e,u))}),{immediate:!0,flush:"post"}),y=()=>{d(),v()};return a(y),{isSupported:l,stop:y}}function Q(e,t={}){const{reset:n=!0,windowResize:a=!0,windowScroll:i=!0,immediate:o=!0}=t,u=f(0),s=f(0),l=f(0),d=f(0),v=f(0),m=f(0),y=f(0),b=f(0);function O(){const t=p(e);if(!t)return void(n&&(u.value=0,s.value=0,l.value=0,d.value=0,v.value=0,m.value=0,y.value=0,b.value=0));const a=t.getBoundingClientRect();u.value=a.height,s.value=a.bottom,l.value=a.left,d.value=a.right,v.value=a.top,m.value=a.width,y.value=a.x,b.value=a.y}return N(e,O),c((()=>p(e)),(e=>!e&&O())),i&&h("scroll",O,{capture:!0,passive:!0}),a&&h("resize",O,{passive:!0}),r((()=>{o&&O()})),{height:u,bottom:s,left:l,right:d,top:v,width:m,x:y,y:b,update:O}}(P=S||(S={})).UP="UP",P.RIGHT="RIGHT",P.DOWN="DOWN",P.LEFT="LEFT",P.NONE="NONE";var C=Object.defineProperty,R=Object.getOwnPropertySymbols,B=Object.prototype.hasOwnProperty,T=Object.prototype.propertyIsEnumerable,k=(e,t,n)=>t in e?C(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;function z(e,t,n,a={}){var i,o,r;const{clone:u=!1,passive:p=!1,eventName:m,deep:y=!1,defaultValue:h}=a,b=v(),O=n||(null==b?void 0:b.emit)||(null==(i=null==b?void 0:b.$emit)?void 0:i.bind(b))||(null==(r=null==(o=null==b?void 0:b.proxy)?void 0:o.$emit)?void 0:r.bind(null==b?void 0:b.proxy));let w=m;t||(t="modelValue"),w=m||w||`update:${t.toString()}`;const g=e=>{return u?s(u)?u(e):(t=e,JSON.parse(JSON.stringify(t))):e;var t},I=()=>l(e[t])?g(e[t]):h;if(p){const n=I(),a=f(n);return c((()=>e[t]),(e=>a.value=g(e))),c(a,(n=>{(n!==e[t]||y)&&O(w,n)}),{deep:y}),a}return d({get:()=>I(),set(e){O(w,e)}})}function H({window:e=m}={}){if(!e)return f(!1);const t=f(e.document.hasFocus());return h(e,"blur",(()=>{t.value=!1})),h(e,"focus",(()=>{t.value=!0})),t}function L(e={}){const{window:t=m,initialWidth:n=1/0,initialHeight:a=1/0,listenOrientation:i=!0,includeScrollbar:o=!0}=e,u=f(n),s=f(a),l=()=>{t&&(o?(u.value=t.innerWidth,s.value=t.innerHeight):(u.value=t.document.documentElement.clientWidth,s.value=t.document.documentElement.clientHeight))};return l(),r(l),h("resize",l,{passive:!0}),i&&h("orientationchange",l,{passive:!0}),{width:u,height:s}}((e,t)=>{for(var n in t||(t={}))B.call(t,n)&&k(e,n,t[n]);if(R)for(var n of R(t))T.call(t,n)&&k(e,n,t[n])})({linear:u},{easeInSine:[.12,0,.39,0],easeOutSine:[.61,1,.88,1],easeInOutSine:[.37,0,.63,1],easeInQuad:[.11,0,.5,0],easeOutQuad:[.5,1,.89,1],easeInOutQuad:[.45,0,.55,1],easeInCubic:[.32,0,.67,0],easeOutCubic:[.33,1,.68,1],easeInOutCubic:[.65,0,.35,1],easeInQuart:[.5,0,.75,0],easeOutQuart:[.25,1,.5,1],easeInOutQuart:[.76,0,.24,1],easeInQuint:[.64,0,.78,0],easeOutQuint:[.22,1,.36,1],easeInOutQuint:[.83,0,.17,1],easeInExpo:[.7,0,.84,0],easeOutExpo:[.16,1,.3,1],easeInOutExpo:[.87,0,.13,1],easeInCirc:[.55,0,1,.45],easeOutCirc:[0,.55,.45,1],easeInOutCirc:[.85,0,.15,1],easeInBack:[.36,0,.66,-.56],easeOutBack:[.34,1.56,.64,1],easeInOutBack:[.68,-.6,.32,1.6]});export{L as a,Q as b,h as c,N as d,I as e,E as f,H as g,z as h,O as o,p as u};
