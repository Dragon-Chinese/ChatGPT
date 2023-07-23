import{l as e,u as t,a as n,r}from"./_@vue_reactivity@3.3.4@@vue-76911006.js";import{f as o,d as a,i as s,p as c,w as i,t as l,n as u}from"./_@vue_runtime-core@3.3.4@@vue-e5c0790c.js";
/*!
  * vue-router v4.2.2
  * (c) 2023 Eduardo San Martin Morote
  * @license MIT
  */const f="undefined"!=typeof window;const p=Object.assign;function h(e,t){const n={};for(const r in t){const o=t[r];n[r]=m(o)?o.map(e):e(o)}return n}const d=()=>{},m=Array.isArray,g=/\/$/,v=e=>e.replace(g,"");function y(e,t,n="/"){let r,o={},a="",s="";const c=t.indexOf("#");let i=t.indexOf("?");return c<i&&c>=0&&(i=-1),i>-1&&(r=t.slice(0,i),a=t.slice(i+1,c>-1?c:t.length),o=e(a)),c>-1&&(r=r||t.slice(0,c),s=t.slice(c,t.length)),r=function(e,t){if(e.startsWith("/"))return e;if(!e)return t;const n=t.split("/"),r=e.split("/"),o=r[r.length-1];".."!==o&&"."!==o||r.push("");let a,s,c=n.length-1;for(a=0;a<r.length;a++)if(s=r[a],"."!==s){if(".."!==s)break;c>1&&c--}return n.slice(0,c).join("/")+"/"+r.slice(a-(a===r.length?1:0)).join("/")}(null!=r?r:t,n),{fullPath:r+(a&&"?")+a+s,path:r,query:o,hash:s}}function b(e,t){return t&&e.toLowerCase().startsWith(t.toLowerCase())?e.slice(t.length)||"/":e}function w(e,t){return(e.aliasOf||e)===(t.aliasOf||t)}function E(e,t){if(Object.keys(e).length!==Object.keys(t).length)return!1;for(const n in e)if(!R(e[n],t[n]))return!1;return!0}function R(e,t){return m(e)?k(e,t):m(t)?k(t,e):e===t}function k(e,t){return m(t)?e.length===t.length&&e.every(((e,n)=>e===t[n])):1===e.length&&e[0]===t}var O,x,P,C;(x=O||(O={})).pop="pop",x.push="push",(C=P||(P={})).back="back",C.forward="forward",C.unknown="";const $=/^[^#]+#/;function j(e,t){return e.replace($,"#")+t}const S=()=>({left:window.pageXOffset,top:window.pageYOffset});function A(e){let t;if("el"in e){const n=e.el,r="string"==typeof n&&n.startsWith("#"),o="string"==typeof n?r?document.getElementById(n.slice(1)):document.querySelector(n):n;if(!o)return;t=function(e,t){const n=document.documentElement.getBoundingClientRect(),r=e.getBoundingClientRect();return{behavior:t.behavior,left:r.left-n.left-(t.left||0),top:r.top-n.top-(t.top||0)}}(o,e)}else t=e;"scrollBehavior"in document.documentElement.style?window.scrollTo(t):window.scrollTo(null!=t.left?t.left:window.pageXOffset,null!=t.top?t.top:window.pageYOffset)}function q(e,t){return(history.state?history.state.position-t:-1)+e}const _=new Map;let L=()=>location.protocol+"//"+location.host;function M(e,t){const{pathname:n,search:r,hash:o}=t,a=e.indexOf("#");if(a>-1){let t=o.includes(e.slice(a))?e.slice(a).length:1,n=o.slice(t);return"/"!==n[0]&&(n="/"+n),b(n,"")}return b(n,e)+r+o}function B(e,t,n,r=!1,o=!1){return{back:e,current:t,forward:n,replaced:r,position:window.history.length,scroll:o?S():null}}function G(e){const t=function(e){const{history:t,location:n}=window,r={value:M(e,n)},o={value:t.state};function a(r,a,s){const c=e.indexOf("#"),i=c>-1?(n.host&&document.querySelector("base")?e:e.slice(c))+r:L()+e+r;try{t[s?"replaceState":"pushState"](a,"",i),o.value=a}catch(l){n[s?"replace":"assign"](i)}}return o.value||a(r.value,{back:null,current:r.value,forward:null,position:t.length-1,replaced:!0,scroll:null},!0),{location:r,state:o,push:function(e,n){const s=p({},o.value,t.state,{forward:e,scroll:S()});a(s.current,s,!0),a(e,p({},B(r.value,e,null),{position:s.position+1},n),!1),r.value=e},replace:function(e,n){a(e,p({},t.state,B(o.value.back,e,o.value.forward,!0),n,{position:o.value.position}),!0),r.value=e}}}(e=function(e){if(!e)if(f){const t=document.querySelector("base");e=(e=t&&t.getAttribute("href")||"/").replace(/^\w+:\/\/[^\/]+/,"")}else e="/";return"/"!==e[0]&&"#"!==e[0]&&(e="/"+e),v(e)}(e)),n=function(e,t,n,r){let o=[],a=[],s=null;const c=({state:a})=>{const c=M(e,location),i=n.value,l=t.value;let u=0;if(a){if(n.value=c,t.value=a,s&&s===i)return void(s=null);u=l?a.position-l.position:0}else r(c);o.forEach((e=>{e(n.value,i,{delta:u,type:O.pop,direction:u?u>0?P.forward:P.back:P.unknown})}))};function i(){const{history:e}=window;e.state&&e.replaceState(p({},e.state,{scroll:S()}),"")}return window.addEventListener("popstate",c),window.addEventListener("beforeunload",i,{passive:!0}),{pauseListeners:function(){s=n.value},listen:function(e){o.push(e);const t=()=>{const t=o.indexOf(e);t>-1&&o.splice(t,1)};return a.push(t),t},destroy:function(){for(const e of a)e();a=[],window.removeEventListener("popstate",c),window.removeEventListener("beforeunload",i)}}}(e,t.state,t.location,t.replace);const r=p({location:"",base:e,go:function(e,t=!0){t||n.pauseListeners(),history.go(e)},createHref:j.bind(null,e)},t,n);return Object.defineProperty(r,"location",{enumerable:!0,get:()=>t.location.value}),Object.defineProperty(r,"state",{enumerable:!0,get:()=>t.state.value}),r}function I(e){return(e=location.host?e||location.pathname+location.search:"").includes("#")||(e+="#"),G(e)}function W(e){return"string"==typeof e||"symbol"==typeof e}const D={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0},U=Symbol("");var F,T;function V(e,t){return p(new Error,{type:e,[U]:!0},t)}function z(e,t){return e instanceof Error&&U in e&&(null==t||!!(e.type&t))}(T=F||(F={}))[T.aborted=4]="aborted",T[T.cancelled=8]="cancelled",T[T.duplicated=16]="duplicated";const K="[^/]+?",H={sensitive:!1,strict:!1,start:!0,end:!0},Q=/[.+*?^${}()[\]/\\]/g;function X(e,t){let n=0;for(;n<e.length&&n<t.length;){const r=t[n]-e[n];if(r)return r;n++}return e.length<t.length?1===e.length&&80===e[0]?-1:1:e.length>t.length?1===t.length&&80===t[0]?1:-1:0}function Y(e,t){let n=0;const r=e.score,o=t.score;for(;n<r.length&&n<o.length;){const e=X(r[n],o[n]);if(e)return e;n++}if(1===Math.abs(o.length-r.length)){if(N(r))return 1;if(N(o))return-1}return o.length-r.length}function N(e){const t=e[e.length-1];return e.length>0&&t[t.length-1]<0}const Z={type:0,value:""},J=/[a-zA-Z0-9_]/;function ee(e,t,n){const r=function(e,t){const n=p({},H,t),r=[];let o=n.start?"^":"";const a=[];for(const i of e){const e=i.length?[]:[90];n.strict&&!i.length&&(o+="/");for(let t=0;t<i.length;t++){const r=i[t];let s=40+(n.sensitive?.25:0);if(0===r.type)t||(o+="/"),o+=r.value.replace(Q,"\\$&"),s+=40;else if(1===r.type){const{value:e,repeatable:n,optional:l,regexp:u}=r;a.push({name:e,repeatable:n,optional:l});const f=u||K;if(f!==K){s+=10;try{new RegExp(`(${f})`)}catch(c){throw new Error(`Invalid custom RegExp for param "${e}" (${f}): `+c.message)}}let p=n?`((?:${f})(?:/(?:${f}))*)`:`(${f})`;t||(p=l&&i.length<2?`(?:/${p})`:"/"+p),l&&(p+="?"),o+=p,s+=20,l&&(s+=-8),n&&(s+=-20),".*"===f&&(s+=-50)}e.push(s)}r.push(e)}if(n.strict&&n.end){const e=r.length-1;r[e][r[e].length-1]+=.7000000000000001}n.strict||(o+="/?"),n.end?o+="$":n.strict&&(o+="(?:/|$)");const s=new RegExp(o,n.sensitive?"":"i");return{re:s,score:r,keys:a,parse:function(e){const t=e.match(s),n={};if(!t)return null;for(let r=1;r<t.length;r++){const e=t[r]||"",o=a[r-1];n[o.name]=e&&o.repeatable?e.split("/"):e}return n},stringify:function(t){let n="",r=!1;for(const o of e){r&&n.endsWith("/")||(n+="/"),r=!1;for(const e of o)if(0===e.type)n+=e.value;else if(1===e.type){const{value:a,repeatable:s,optional:c}=e,i=a in t?t[a]:"";if(m(i)&&!s)throw new Error(`Provided param "${a}" is an array but it is not repeatable (* or + modifiers)`);const l=m(i)?i.join("/"):i;if(!l){if(!c)throw new Error(`Missing required param "${a}"`);o.length<2&&(n.endsWith("/")?n=n.slice(0,-1):r=!0)}n+=l}}return n||"/"}}}(function(e){if(!e)return[[]];if("/"===e)return[[Z]];if(!e.startsWith("/"))throw new Error(`Invalid path "${e}"`);function t(e){throw new Error(`ERR (${n})/"${l}": ${e}`)}let n=0,r=n;const o=[];let a;function s(){a&&o.push(a),a=[]}let c,i=0,l="",u="";function f(){l&&(0===n?a.push({type:0,value:l}):1===n||2===n||3===n?(a.length>1&&("*"===c||"+"===c)&&t(`A repeatable param (${l}) must be alone in its segment. eg: '/:ids+.`),a.push({type:1,value:l,regexp:u,repeatable:"*"===c||"+"===c,optional:"*"===c||"?"===c})):t("Invalid state to consume buffer"),l="")}function p(){l+=c}for(;i<e.length;)if(c=e[i++],"\\"!==c||2===n)switch(n){case 0:"/"===c?(l&&f(),s()):":"===c?(f(),n=1):p();break;case 4:p(),n=r;break;case 1:"("===c?n=2:J.test(c)?p():(f(),n=0,"*"!==c&&"?"!==c&&"+"!==c&&i--);break;case 2:")"===c?"\\"==u[u.length-1]?u=u.slice(0,-1)+c:n=3:u+=c;break;case 3:f(),n=0,"*"!==c&&"?"!==c&&"+"!==c&&i--,u="";break;default:t("Unknown state")}else r=n,n=4;return 2===n&&t(`Unfinished custom RegExp for param "${l}"`),f(),s(),o}(e.path),n),o=p(r,{record:e,parent:t,children:[],alias:[]});return t&&!o.record.aliasOf==!t.record.aliasOf&&t.children.push(o),o}function te(e,t){const n=[],r=new Map;function o(e,n,r){const c=!r,i=function(e){return{path:e.path,redirect:e.redirect,name:e.name,meta:e.meta||{},aliasOf:void 0,beforeEnter:e.beforeEnter,props:re(e),children:e.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in e?e.components||null:e.component&&{default:e.component}}}(e);i.aliasOf=r&&r.record;const l=se(t,e),u=[i];if("alias"in e){const t="string"==typeof e.alias?[e.alias]:e.alias;for(const e of t)u.push(p({},i,{components:r?r.record.components:i.components,path:e,aliasOf:r?r.record:i}))}let f,h;for(const t of u){const{path:u}=t;if(n&&"/"!==u[0]){const e=n.record.path,r="/"===e[e.length-1]?"":"/";t.path=n.record.path+(u&&r+u)}if(f=ee(t,n,l),r?r.alias.push(f):(h=h||f,h!==f&&h.alias.push(f),c&&e.name&&!oe(f)&&a(e.name)),i.children){const e=i.children;for(let t=0;t<e.length;t++)o(e[t],f,r&&r.children[t])}r=r||f,(f.record.components&&Object.keys(f.record.components).length||f.record.name||f.record.redirect)&&s(f)}return h?()=>{a(h)}:d}function a(e){if(W(e)){const t=r.get(e);t&&(r.delete(e),n.splice(n.indexOf(t),1),t.children.forEach(a),t.alias.forEach(a))}else{const t=n.indexOf(e);t>-1&&(n.splice(t,1),e.record.name&&r.delete(e.record.name),e.children.forEach(a),e.alias.forEach(a))}}function s(e){let t=0;for(;t<n.length&&Y(e,n[t])>=0&&(e.record.path!==n[t].record.path||!ce(e,n[t]));)t++;n.splice(t,0,e),e.record.name&&!oe(e)&&r.set(e.record.name,e)}return t=se({strict:!1,end:!0,sensitive:!1},t),e.forEach((e=>o(e))),{addRoute:o,resolve:function(e,t){let o,a,s,c={};if("name"in e&&e.name){if(o=r.get(e.name),!o)throw V(1,{location:e});s=o.record.name,c=p(ne(t.params,o.keys.filter((e=>!e.optional)).map((e=>e.name))),e.params&&ne(e.params,o.keys.map((e=>e.name)))),a=o.stringify(c)}else if("path"in e)a=e.path,o=n.find((e=>e.re.test(a))),o&&(c=o.parse(a),s=o.record.name);else{if(o=t.name?r.get(t.name):n.find((e=>e.re.test(t.path))),!o)throw V(1,{location:e,currentLocation:t});s=o.record.name,c=p({},t.params,e.params),a=o.stringify(c)}const i=[];let l=o;for(;l;)i.unshift(l.record),l=l.parent;return{name:s,path:a,params:c,matched:i,meta:ae(i)}},removeRoute:a,getRoutes:function(){return n},getRecordMatcher:function(e){return r.get(e)}}}function ne(e,t){const n={};for(const r of t)r in e&&(n[r]=e[r]);return n}function re(e){const t={},n=e.props||!1;if("component"in e)t.default=n;else for(const r in e.components)t[r]="boolean"==typeof n?n:n[r];return t}function oe(e){for(;e;){if(e.record.aliasOf)return!0;e=e.parent}return!1}function ae(e){return e.reduce(((e,t)=>p(e,t.meta)),{})}function se(e,t){const n={};for(const r in e)n[r]=r in t?t[r]:e[r];return n}function ce(e,t){return t.children.some((t=>t===e||ce(e,t)))}const ie=/#/g,le=/&/g,ue=/\//g,fe=/=/g,pe=/\?/g,he=/\+/g,de=/%5B/g,me=/%5D/g,ge=/%5E/g,ve=/%60/g,ye=/%7B/g,be=/%7C/g,we=/%7D/g,Ee=/%20/g;function Re(e){return encodeURI(""+e).replace(be,"|").replace(de,"[").replace(me,"]")}function ke(e){return Re(e).replace(he,"%2B").replace(Ee,"+").replace(ie,"%23").replace(le,"%26").replace(ve,"`").replace(ye,"{").replace(we,"}").replace(ge,"^")}function Oe(e){return null==e?"":function(e){return Re(e).replace(ie,"%23").replace(pe,"%3F")}(e).replace(ue,"%2F")}function xe(e){try{return decodeURIComponent(""+e)}catch(t){}return""+e}function Pe(e){const t={};if(""===e||"?"===e)return t;const n=("?"===e[0]?e.slice(1):e).split("&");for(let r=0;r<n.length;++r){const e=n[r].replace(he," "),o=e.indexOf("="),a=xe(o<0?e:e.slice(0,o)),s=o<0?null:xe(e.slice(o+1));if(a in t){let e=t[a];m(e)||(e=t[a]=[e]),e.push(s)}else t[a]=s}return t}function Ce(e){let t="";for(let n in e){const r=e[n];if(n=ke(n).replace(fe,"%3D"),null==r){void 0!==r&&(t+=(t.length?"&":"")+n);continue}(m(r)?r.map((e=>e&&ke(e))):[r&&ke(r)]).forEach((e=>{void 0!==e&&(t+=(t.length?"&":"")+n,null!=e&&(t+="="+e))}))}return t}function $e(e){const t={};for(const n in e){const r=e[n];void 0!==r&&(t[n]=m(r)?r.map((e=>null==e?null:""+e)):null==r?r:""+r)}return t}const je=Symbol(""),Se=Symbol(""),Ae=Symbol(""),qe=Symbol(""),_e=Symbol("");function Le(){let e=[];return{add:function(t){return e.push(t),()=>{const n=e.indexOf(t);n>-1&&e.splice(n,1)}},list:()=>e,reset:function(){e=[]}}}function Me(e,t,n,r,o){const a=r&&(r.enterCallbacks[o]=r.enterCallbacks[o]||[]);return()=>new Promise(((s,c)=>{const i=e=>{var i;!1===e?c(V(4,{from:n,to:t})):e instanceof Error?c(e):"string"==typeof(i=e)||i&&"object"==typeof i?c(V(2,{from:t,to:e})):(a&&r.enterCallbacks[o]===a&&"function"==typeof e&&a.push(e),s())},l=e.call(r&&r.instances[o],t,n,i);let u=Promise.resolve(l);e.length<3&&(u=u.then(i)),u.catch((e=>c(e)))}))}function Be(e,t,n,r){const o=[];for(const s of e)for(const e in s.components){let c=s.components[e];if("beforeRouteEnter"===t||s.instances[e])if("object"==typeof(a=c)||"displayName"in a||"props"in a||"__vccOpts"in a){const a=(c.__vccOpts||c)[t];a&&o.push(Me(a,n,r,s,e))}else{let a=c();o.push((()=>a.then((o=>{if(!o)return Promise.reject(new Error(`Couldn't resolve component "${e}" at "${s.path}"`));const a=(c=o).__esModule||"Module"===c[Symbol.toStringTag]?o.default:o;var c;s.components[e]=a;const i=(a.__vccOpts||a)[t];return i&&Me(i,n,r,s,e)()}))))}}var a;return o}function Ge(e){const n=s(Ae),r=s(qe),a=o((()=>n.resolve(t(e.to)))),c=o((()=>{const{matched:e}=a.value,{length:t}=e,n=e[t-1],o=r.matched;if(!n||!o.length)return-1;const s=o.findIndex(w.bind(null,n));if(s>-1)return s;const c=We(e[t-2]);return t>1&&We(n)===c&&o[o.length-1].path!==c?o.findIndex(w.bind(null,e[t-2])):s})),i=o((()=>c.value>-1&&function(e,t){for(const n in t){const r=t[n],o=e[n];if("string"==typeof r){if(r!==o)return!1}else if(!m(o)||o.length!==r.length||r.some(((e,t)=>e!==o[t])))return!1}return!0}(r.params,a.value.params))),l=o((()=>c.value>-1&&c.value===r.matched.length-1&&E(r.params,a.value.params)));return{route:a,href:o((()=>a.value.href)),isActive:i,isExactActive:l,navigate:function(r={}){return function(e){if(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)return;if(e.defaultPrevented)return;if(void 0!==e.button&&0!==e.button)return;if(e.currentTarget&&e.currentTarget.getAttribute){const t=e.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(t))return}e.preventDefault&&e.preventDefault();return!0}(r)?n[t(e.replace)?"replace":"push"](t(e.to)).catch(d):Promise.resolve()}}}const Ie=a({name:"RouterLink",compatConfig:{MODE:3},props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"}},useLink:Ge,setup(e,{slots:t}){const r=n(Ge(e)),{options:a}=s(Ae),c=o((()=>({[De(e.activeClass,a.linkActiveClass,"router-link-active")]:r.isActive,[De(e.exactActiveClass,a.linkExactActiveClass,"router-link-exact-active")]:r.isExactActive})));return()=>{const n=t.default&&t.default(r);return e.custom?n:l("a",{"aria-current":r.isExactActive?e.ariaCurrentValue:null,href:r.href,onClick:r.navigate,class:c.value},n)}}});function We(e){return e?e.aliasOf?e.aliasOf.path:e.path:""}const De=(e,t,n)=>null!=e?e:null!=t?t:n;function Ue(e,t){if(!e)return null;const n=e(t);return 1===n.length?n[0]:n}const Fe=a({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},compatConfig:{MODE:3},setup(e,{attrs:n,slots:a}){const u=s(_e),f=o((()=>e.route||u.value)),h=s(Se,0),d=o((()=>{let e=t(h);const{matched:n}=f.value;let r;for(;(r=n[e])&&!r.components;)e++;return e})),m=o((()=>f.value.matched[d.value]));c(Se,o((()=>d.value+1))),c(je,m),c(_e,f);const g=r();return i((()=>[g.value,m.value,e.name]),(([e,t,n],[r,o,a])=>{t&&(t.instances[n]=e,o&&o!==t&&e&&e===r&&(t.leaveGuards.size||(t.leaveGuards=o.leaveGuards),t.updateGuards.size||(t.updateGuards=o.updateGuards))),!e||!t||o&&w(t,o)&&r||(t.enterCallbacks[n]||[]).forEach((t=>t(e)))}),{flush:"post"}),()=>{const t=f.value,r=e.name,o=m.value,s=o&&o.components[r];if(!s)return Ue(a.default,{Component:s,route:t});const c=o.props[r],i=c?!0===c?t.params:"function"==typeof c?c(t):c:null,u=l(s,p({},i,n,{onVnodeUnmounted:e=>{e.component.isUnmounted&&(o.instances[r]=null)},ref:g}));return Ue(a.default,{Component:u,route:t})||u}}});function Te(r){const a=te(r.routes,r),s=r.parseQuery||Pe,c=r.stringifyQuery||Ce,i=r.history,l=Le(),g=Le(),v=Le(),b=e(D);let R=D;f&&r.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const k=h.bind(null,(e=>""+e)),x=h.bind(null,Oe),P=h.bind(null,xe);function C(e,t){if(t=p({},t||b.value),"string"==typeof e){const n=y(s,e,t.path),r=a.resolve({path:n.path},t),o=i.createHref(n.fullPath);return p(n,r,{params:P(r.params),hash:xe(n.hash),redirectedFrom:void 0,href:o})}let n;if("path"in e)n=p({},e,{path:y(s,e.path,t.path).path});else{const r=p({},e.params);for(const e in r)null==r[e]&&delete r[e];n=p({},e,{params:x(r)}),t.params=x(t.params)}const r=a.resolve(n,t),o=e.hash||"";r.params=k(P(r.params));const l=function(e,t){const n=t.query?e(t.query):"";return t.path+(n&&"?")+n+(t.hash||"")}(c,p({},e,{hash:(u=o,Re(u).replace(ye,"{").replace(we,"}").replace(ge,"^")),path:r.path}));var u;const f=i.createHref(l);return p({fullPath:l,hash:o,query:c===Ce?$e(e.query):e.query||{}},r,{redirectedFrom:void 0,href:f})}function $(e){return"string"==typeof e?y(s,e,b.value.path):p({},e)}function j(e,t){if(R!==e)return V(8,{from:t,to:e})}function L(e){return B(e)}function M(e){const t=e.matched[e.matched.length-1];if(t&&t.redirect){const{redirect:n}=t;let r="function"==typeof n?n(e):n;return"string"==typeof r&&(r=r.includes("?")||r.includes("#")?r=$(r):{path:r},r.params={}),p({query:e.query,hash:e.hash,params:"path"in r?{}:e.params},r)}}function B(e,t){const n=R=C(e),r=b.value,o=e.state,a=e.force,s=!0===e.replace,i=M(n);if(i)return B(p($(i),{state:"object"==typeof i?p({},o,i.state):o,force:a,replace:s}),t||n);const l=n;let u;return l.redirectedFrom=t,!a&&function(e,t,n){const r=t.matched.length-1,o=n.matched.length-1;return r>-1&&r===o&&w(t.matched[r],n.matched[o])&&E(t.params,n.params)&&e(t.query)===e(n.query)&&t.hash===n.hash}(c,r,n)&&(u=V(16,{to:l,from:r}),J(r,r,!0,!1)),(u?Promise.resolve(u):U(l,r)).catch((e=>z(e)?z(e,2)?e:Z(e):N(e,l,r))).then((e=>{if(e){if(z(e,2))return B(p({replace:s},$(e.to),{state:"object"==typeof e.to?p({},o,e.to.state):o,force:a}),t||l)}else e=T(l,r,!0,s,o);return F(l,r,e),e}))}function G(e,t){const n=j(e,t);return n?Promise.reject(n):Promise.resolve()}function I(e){const t=re.values().next().value;return t&&"function"==typeof t.runWithContext?t.runWithContext(e):e()}function U(e,t){let n;const[r,o,a]=function(e,t){const n=[],r=[],o=[],a=Math.max(t.matched.length,e.matched.length);for(let s=0;s<a;s++){const a=t.matched[s];a&&(e.matched.find((e=>w(e,a)))?r.push(a):n.push(a));const c=e.matched[s];c&&(t.matched.find((e=>w(e,c)))||o.push(c))}return[n,r,o]}(e,t);n=Be(r.reverse(),"beforeRouteLeave",e,t);for(const c of r)c.leaveGuards.forEach((r=>{n.push(Me(r,e,t))}));const s=G.bind(null,e,t);return n.push(s),ae(n).then((()=>{n=[];for(const r of l.list())n.push(Me(r,e,t));return n.push(s),ae(n)})).then((()=>{n=Be(o,"beforeRouteUpdate",e,t);for(const r of o)r.updateGuards.forEach((r=>{n.push(Me(r,e,t))}));return n.push(s),ae(n)})).then((()=>{n=[];for(const r of e.matched)if(r.beforeEnter&&!t.matched.includes(r))if(m(r.beforeEnter))for(const o of r.beforeEnter)n.push(Me(o,e,t));else n.push(Me(r.beforeEnter,e,t));return n.push(s),ae(n)})).then((()=>(e.matched.forEach((e=>e.enterCallbacks={})),n=Be(a,"beforeRouteEnter",e,t),n.push(s),ae(n)))).then((()=>{n=[];for(const r of g.list())n.push(Me(r,e,t));return n.push(s),ae(n)})).catch((e=>z(e,8)?e:Promise.reject(e)))}function F(e,t,n){for(const r of v.list())I((()=>r(e,t,n)))}function T(e,t,n,r,o){const a=j(e,t);if(a)return a;const s=t===D,c=f?history.state:{};n&&(r||s?i.replace(e.fullPath,p({scroll:s&&c&&c.scroll},o)):i.push(e.fullPath,o)),b.value=e,J(e,t,n,s),Z()}let K;function H(){K||(K=i.listen(((e,t,n)=>{if(!oe.listening)return;const r=C(e),o=M(r);if(o)return void B(p(o,{replace:!0}),r).catch(d);R=r;const a=b.value;var s,c;f&&(s=q(a.fullPath,n.delta),c=S(),_.set(s,c)),U(r,a).catch((e=>z(e,12)?e:z(e,2)?(B(e.to,r).then((e=>{z(e,20)&&!n.delta&&n.type===O.pop&&i.go(-1,!1)})).catch(d),Promise.reject()):(n.delta&&i.go(-n.delta,!1),N(e,r,a)))).then((e=>{(e=e||T(r,a,!1))&&(n.delta&&!z(e,8)?i.go(-n.delta,!1):n.type===O.pop&&z(e,20)&&i.go(-1,!1)),F(r,a,e)})).catch(d)})))}let Q,X=Le(),Y=Le();function N(e,t,n){Z(e);const r=Y.list();return r.length&&r.forEach((r=>r(e,t,n))),Promise.reject(e)}function Z(e){return Q||(Q=!e,H(),X.list().forEach((([t,n])=>e?n(e):t())),X.reset()),e}function J(e,t,n,o){const{scrollBehavior:a}=r;if(!f||!a)return Promise.resolve();const s=!n&&function(e){const t=_.get(e);return _.delete(e),t}(q(e.fullPath,0))||(o||!n)&&history.state&&history.state.scroll||null;return u().then((()=>a(e,t,s))).then((e=>e&&A(e))).catch((n=>N(n,e,t)))}const ee=e=>i.go(e);let ne;const re=new Set,oe={currentRoute:b,listening:!0,addRoute:function(e,t){let n,r;return W(e)?(n=a.getRecordMatcher(e),r=t):r=e,a.addRoute(r,n)},removeRoute:function(e){const t=a.getRecordMatcher(e);t&&a.removeRoute(t)},hasRoute:function(e){return!!a.getRecordMatcher(e)},getRoutes:function(){return a.getRoutes().map((e=>e.record))},resolve:C,options:r,push:L,replace:function(e){return L(p($(e),{replace:!0}))},go:ee,back:()=>ee(-1),forward:()=>ee(1),beforeEach:l.add,beforeResolve:g.add,afterEach:v.add,onError:Y.add,isReady:function(){return Q&&b.value!==D?Promise.resolve():new Promise(((e,t)=>{X.add([e,t])}))},install(e){e.component("RouterLink",Ie),e.component("RouterView",Fe),e.config.globalProperties.$router=this,Object.defineProperty(e.config.globalProperties,"$route",{enumerable:!0,get:()=>t(b)}),f&&!ne&&b.value===D&&(ne=!0,L(i.location).catch((e=>{})));const r={};for(const t in D)r[t]=o((()=>b.value[t]));e.provide(Ae,this),e.provide(qe,n(r)),e.provide(_e,b);const a=e.unmount;re.add(e),e.unmount=function(){re.delete(e),re.size<1&&(R=D,K&&K(),K=null,b.value=D,ne=!1,Q=!1),a()}}};function ae(e){return e.reduce(((e,t)=>e.then((()=>I(t)))),Promise.resolve())}return oe}export{Fe as R,I as a,Te as c};
