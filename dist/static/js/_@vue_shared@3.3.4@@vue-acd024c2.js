function e(e,t){const n=Object.create(null),o=e.split(",");for(let s=0;s<o.length;s++)n[o[s]]=!0;return t?e=>!!n[e.toLowerCase()]:e=>!!n[e]}const t={},n=[],o=()=>{},s=()=>!1,r=/^on[^a-z]/,a=e=>r.test(e),i=e=>e.startsWith("onUpdate:"),l=Object.assign,c=(e,t)=>{const n=e.indexOf(t);n>-1&&e.splice(n,1)},f=Object.prototype.hasOwnProperty,u=(e,t)=>f.call(e,t),p=Array.isArray,d=e=>"[object Map]"===w(e),g=e=>"[object Set]"===w(e),y=e=>"[object Date]"===w(e),b=e=>"[object RegExp]"===w(e),h=e=>"function"==typeof e,j=e=>"string"==typeof e,m=e=>"symbol"==typeof e,O=e=>null!==e&&"object"==typeof e,N=e=>O(e)&&h(e.then)&&h(e.catch),S=Object.prototype.toString,w=e=>S.call(e),I=e=>w(e).slice(8,-1),U=e=>"[object Object]"===w(e),v=e=>j(e)&&"NaN"!==e&&"-"!==e[0]&&""+parseInt(e,10)===e,B=e(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),C=e=>{const t=Object.create(null);return n=>t[n]||(t[n]=e(n))},M=/-(\w)/g,R=C((e=>e.replace(M,((e,t)=>t?t.toUpperCase():"")))),x=/\B([A-Z])/g,A=C((e=>e.replace(x,"-$1").toLowerCase())),V=C((e=>e.charAt(0).toUpperCase()+e.slice(1))),k=C((e=>e?`on${V(e)}`:"")),P=(e,t)=>!Object.is(e,t),$=(e,t)=>{for(let n=0;n<e.length;n++)e[n](t)},_=(e,t,n)=>{Object.defineProperty(e,t,{configurable:!0,enumerable:!1,value:n})},z=e=>{const t=parseFloat(e);return isNaN(t)?e:t},E=e=>{const t=j(e)?Number(e):NaN;return isNaN(t)?e:t};let F;const T=()=>F||(F="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{}),D=e("Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,BigInt,console");function J(e){if(p(e)){const t={};for(let n=0;n<e.length;n++){const o=e[n],s=j(o)?H(o):J(o);if(s)for(const e in s)t[e]=s[e]}return t}return j(e)||O(e)?e:void 0}const L=/;(?![^(]*\))/g,q=/:([^]+)/,G=/\/\*[^]*?\*\//g;function H(e){const t={};return e.replace(G,"").split(L).forEach((e=>{if(e){const n=e.split(q);n.length>1&&(t[n[0].trim()]=n[1].trim())}})),t}function K(e){let t="";if(j(e))t=e;else if(p(e))for(let n=0;n<e.length;n++){const o=K(e[n]);o&&(t+=o+" ")}else if(O(e))for(const n in e)e[n]&&(t+=n+" ");return t.trim()}function W(e){if(!e)return null;let{class:t,style:n}=e;return t&&!j(t)&&(e.class=K(t)),n&&(e.style=J(n)),e}const Z=e("itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly");function Q(e){return!!e||""===e}function X(e,t){if(e===t)return!0;let n=y(e),o=y(t);if(n||o)return!(!n||!o)&&e.getTime()===t.getTime();if(n=m(e),o=m(t),n||o)return e===t;if(n=p(e),o=p(t),n||o)return!(!n||!o)&&function(e,t){if(e.length!==t.length)return!1;let n=!0;for(let o=0;n&&o<e.length;o++)n=X(e[o],t[o]);return n}(e,t);if(n=O(e),o=O(t),n||o){if(!n||!o)return!1;if(Object.keys(e).length!==Object.keys(t).length)return!1;for(const n in e){const o=e.hasOwnProperty(n),s=t.hasOwnProperty(n);if(o&&!s||!o&&s||!X(e[n],t[n]))return!1}}return String(e)===String(t)}function Y(e,t){return e.findIndex((e=>X(e,t)))}const ee=e=>j(e)?e:null==e?"":p(e)||O(e)&&(e.toString===S||!h(e.toString))?JSON.stringify(e,te,2):String(e),te=(e,t)=>t&&t.__v_isRef?te(e,t.value):d(t)?{[`Map(${t.size})`]:[...t.entries()].reduce(((e,[t,n])=>(e[`${t} =>`]=n,e)),{})}:g(t)?{[`Set(${t.size})`]:[...t.values()]}:!O(t)||p(t)||U(t)?t:String(t);export{$ as A,b as B,n as C,i as D,t as E,B as F,z as G,A as H,D as I,Y as J,X as K,Z as L,Q as M,o as N,ee as O,W as P,h as a,p as b,u as c,_ as d,l as e,m as f,v as g,P as h,O as i,d as j,T as k,R as l,e as m,V as n,s as o,j as p,K as q,J as r,a as s,I as t,N as u,c as v,g as w,U as x,k as y,E as z};