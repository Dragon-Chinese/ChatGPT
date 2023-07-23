import{c as t,r as e}from"./_@floating-ui_core@1.3.1@@floating-ui-20bbec52.js";function n(t){var e;return(null==(e=t.ownerDocument)?void 0:e.defaultView)||window}function o(t){return n(t).getComputedStyle(t)}function i(t){return t instanceof n(t).Node}function r(t){return i(t)?(t.nodeName||"").toLowerCase():"#document"}function c(t){return t instanceof n(t).HTMLElement}function l(t){return t instanceof n(t).Element}function s(t){return"undefined"!=typeof ShadowRoot&&(t instanceof n(t).ShadowRoot||t instanceof ShadowRoot)}function f(t){const{overflow:e,overflowX:n,overflowY:i,display:r}=o(t);return/auto|scroll|overlay|hidden|clip/.test(e+i+n)&&!["inline","contents"].includes(r)}function u(t){return["table","td","th"].includes(r(t))}function d(t){const e=a(),n=o(t);return"none"!==n.transform||"none"!==n.perspective||!!n.containerType&&"normal"!==n.containerType||!e&&!!n.backdropFilter&&"none"!==n.backdropFilter||!e&&!!n.filter&&"none"!==n.filter||["transform","perspective","filter"].some((t=>(n.willChange||"").includes(t)))||["paint","layout","strict","content"].some((t=>(n.contain||"").includes(t)))}function a(){return!("undefined"==typeof CSS||!CSS.supports)&&CSS.supports("-webkit-backdrop-filter","none")}function h(t){return["html","body","#document"].includes(r(t))}const p=Math.min,g=Math.max,y=Math.round,m=t=>({x:t,y:t});function w(t){const e=o(t);let n=parseFloat(e.width)||0,i=parseFloat(e.height)||0;const r=c(t),l=r?t.offsetWidth:n,s=r?t.offsetHeight:i,f=y(n)!==l||y(i)!==s;return f&&(n=l,i=s),{width:n,height:i,$:f}}function x(t){return l(t)?t:t.contextElement}function v(t){const e=x(t);if(!c(e))return m(1);const n=e.getBoundingClientRect(),{width:o,height:i,$:r}=w(e);let l=(r?y(n.width):n.width)/o,s=(r?y(n.height):n.height)/i;return l&&Number.isFinite(l)||(l=1),s&&Number.isFinite(s)||(s=1),{x:l,y:s}}const b=m(0);function T(t,e,o){var i,r;if(void 0===e&&(e=!0),!a())return b;const c=t?n(t):window;return!o||e&&o!==c?b:{x:(null==(i=c.visualViewport)?void 0:i.offsetLeft)||0,y:(null==(r=c.visualViewport)?void 0:r.offsetTop)||0}}function L(t,o,i,r){void 0===o&&(o=!1),void 0===i&&(i=!1);const c=t.getBoundingClientRect(),s=x(t);let f=m(1);o&&(r?l(r)&&(f=v(r)):f=v(t));const u=T(s,i,r);let d=(c.left+u.x)/f.x,a=(c.top+u.y)/f.y,h=c.width/f.x,p=c.height/f.y;if(s){const t=n(s),e=r&&l(r)?n(r):r;let o=t.frameElement;for(;o&&r&&e!==t;){const t=v(o),e=o.getBoundingClientRect(),i=getComputedStyle(o),r=e.left+(o.clientLeft+parseFloat(i.paddingLeft))*t.x,c=e.top+(o.clientTop+parseFloat(i.paddingTop))*t.y;d*=t.x,a*=t.y,h*=t.x,p*=t.y,d+=r,a+=c,o=n(o).frameElement}}return e({width:h,height:p,x:d,y:a})}function R(t){return((i(t)?t.ownerDocument:t.document)||window.document).documentElement}function C(t){return l(t)?{scrollLeft:t.scrollLeft,scrollTop:t.scrollTop}:{scrollLeft:t.pageXOffset,scrollTop:t.pageYOffset}}function S(t){return L(R(t)).left+C(t).scrollLeft}function D(t){if("html"===r(t))return t;const e=t.assignedSlot||t.parentNode||s(t)&&t.host||R(t);return s(e)?e.host:e}function E(t){const e=D(t);return h(e)?t.ownerDocument?t.ownerDocument.body:t.body:c(e)&&f(e)?e:E(e)}function W(t,e){var o;void 0===e&&(e=[]);const i=E(t),r=i===(null==(o=t.ownerDocument)?void 0:o.body),c=n(i);return r?e.concat(c,c.visualViewport||[],f(i)?i:[]):e.concat(i,W(i))}function F(t,i,r){let s;if("viewport"===i)s=function(t,e){const o=n(t),i=R(t),r=o.visualViewport;let c=i.clientWidth,l=i.clientHeight,s=0,f=0;if(r){c=r.width,l=r.height;const t=a();(!t||t&&"fixed"===e)&&(s=r.offsetLeft,f=r.offsetTop)}return{width:c,height:l,x:s,y:f}}(t,r);else if("document"===i)s=function(t){const e=R(t),n=C(t),i=t.ownerDocument.body,r=g(e.scrollWidth,e.clientWidth,i.scrollWidth,i.clientWidth),c=g(e.scrollHeight,e.clientHeight,i.scrollHeight,i.clientHeight);let l=-n.scrollLeft+S(t);const s=-n.scrollTop;return"rtl"===o(i).direction&&(l+=g(e.clientWidth,i.clientWidth)-r),{width:r,height:c,x:l,y:s}}(R(t));else if(l(i))s=function(t,e){const n=L(t,!0,"fixed"===e),o=n.top+t.clientTop,i=n.left+t.clientLeft,r=c(t)?v(t):m(1);return{width:t.clientWidth*r.x,height:t.clientHeight*r.y,x:i*r.x,y:o*r.y}}(i,r);else{const e=T(t);s={...i,x:i.x-e.x,y:i.y-e.y}}return e(s)}function H(t,e){const n=D(t);return!(n===e||!l(n)||h(n))&&("fixed"===o(n).position||H(n,e))}function V(t,e){return c(t)&&"fixed"!==o(t).position?e?e(t):t.offsetParent:null}function M(t,e){const i=n(t);if(!c(t))return i;let l=V(t,e);for(;l&&u(l)&&"static"===o(l).position;)l=V(l,e);return l&&("html"===r(l)||"body"===r(l)&&"static"===o(l).position&&!d(l))?i:l||function(t){let e=D(t);for(;c(e)&&!h(e);){if(d(e))return e;e=D(e)}return null}(t)||i}function N(t,e,n){const o=c(e),i=R(e),l="fixed"===n,s=L(t,!0,l,e);let u={scrollLeft:0,scrollTop:0};const d=m(0);if(o||!o&&!l)if(("body"!==r(e)||f(i))&&(u=C(e)),c(e)){const t=L(e,!0,l,e);d.x=t.x+e.clientLeft,d.y=t.y+e.clientTop}else i&&(d.x=S(i));return{x:s.left+u.scrollLeft-d.x,y:s.top+u.scrollTop-d.y,width:s.width,height:s.height}}const O={getClippingRect:function(t){let{element:e,boundary:n,rootBoundary:i,strategy:c}=t;const s=[..."clippingAncestors"===n?function(t,e){const n=e.get(t);if(n)return n;let i=W(t).filter((t=>l(t)&&"body"!==r(t))),c=null;const s="fixed"===o(t).position;let u=s?D(t):t;for(;l(u)&&!h(u);){const e=o(u),n=d(u);n||"fixed"!==e.position||(c=null),(s?!n&&!c:!n&&"static"===e.position&&c&&["absolute","fixed"].includes(c.position)||f(u)&&!n&&H(t,u))?i=i.filter((t=>t!==u)):c=e,u=D(u)}return e.set(t,i),i}(e,this._c):[].concat(n),i],u=s[0],a=s.reduce(((t,n)=>{const o=F(e,n,c);return t.top=g(o.top,t.top),t.right=p(o.right,t.right),t.bottom=p(o.bottom,t.bottom),t.left=g(o.left,t.left),t}),F(e,u,c));return{width:a.right-a.left,height:a.bottom-a.top,x:a.left,y:a.top}},convertOffsetParentRelativeRectToViewportRelativeRect:function(t){let{rect:e,offsetParent:n,strategy:o}=t;const i=c(n),l=R(n);if(n===l)return e;let s={scrollLeft:0,scrollTop:0},u=m(1);const d=m(0);if((i||!i&&"fixed"!==o)&&(("body"!==r(n)||f(l))&&(s=C(n)),c(n))){const t=L(n);u=v(n),d.x=t.x+n.clientLeft,d.y=t.y+n.clientTop}return{width:e.width*u.x,height:e.height*u.y,x:e.x*u.x-s.scrollLeft*u.x+d.x,y:e.y*u.y-s.scrollTop*u.y+d.y}},isElement:l,getDimensions:function(t){return w(t)},getOffsetParent:M,getDocumentElement:R,getScale:v,async getElementRects(t){let{reference:e,floating:n,strategy:o}=t;const i=this.getOffsetParent||M,r=this.getDimensions;return{reference:N(e,await i(n),o),floating:{x:0,y:0,...await r(n)}}},getClientRects:t=>Array.from(t.getClientRects()),isRTL:t=>"rtl"===o(t).direction},P=(e,n,o)=>{const i=new Map,r={platform:O,...o},c={...r.platform,_c:i};return t(e,n,{...r,platform:c})};export{P as c};
