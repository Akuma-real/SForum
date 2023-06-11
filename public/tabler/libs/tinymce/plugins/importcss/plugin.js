(function(){"use strict";var e,i,a,r,d,w=tinymce.util.Tools.resolve("tinymce.PluginManager");const U=(e,t,n)=>{var s;return!!n(e,t.prototype)||((s=e.constructor)===null||s===void 0?void 0:s.name)===t.name},H=e=>{const t=typeof e;return e===null?"null":t==="object"&&Array.isArray(e)?"array":t==="object"&&U(e,String,(e,t)=>t.isPrototypeOf(e))?"string":t},n=e=>t=>H(t)===e,L=e=>t=>typeof t===e,s=n("string"),T=n("object"),m=n("array"),A=L("function");d=tinymce.util.Tools.resolve("tinymce.dom.DOMUtils"),i=tinymce.util.Tools.resolve("tinymce.EditorManager"),a=tinymce.util.Tools.resolve("tinymce.Env"),e=tinymce.util.Tools.resolve("tinymce.util.Tools");const t=e=>t=>t.options.get(e),f=e=>{const t=e.options.register,n=e=>s(e)||A(e)||T(e);t("importcss_merge_classes",{processor:"boolean",default:!0}),t("importcss_exclusive",{processor:"boolean",default:!0}),t("importcss_selector_converter",{processor:"function"}),t("importcss_selector_filter",{processor:n}),t("importcss_file_filter",{processor:n}),t("importcss_groups",{processor:"object[]"}),t("importcss_append",{processor:"boolean",default:!1})},p=t("importcss_merge_classes"),g=t("importcss_exclusive"),v=t("importcss_selector_converter"),b=t("importcss_selector_filter"),j=t("importcss_groups"),y=t("importcss_append"),_=t("importcss_file_filter"),u=t("skin"),O=t("skin_url"),x=Array.prototype.push,C=(e,t)=>{const n=e.length,s=new Array(n);for(let o=0;o<n;o++){const i=e[o];s[o]=t(i,o)}return s},E=e=>{const t=[];for(let n=0,s=e.length;n<s;++n){if(!m(e[n]))throw new Error("Arr.flatten item "+n+" was not an array, input: "+e);x.apply(t,e[n])}return t},k=(e,t)=>E(C(e,t)),h=()=>{const t=[],n=[],e={},s=(t,s)=>{e[t]?e[t].push(s):(n.push(t),e[t]=[s])},o=e=>{t.push(e)},i=()=>{const s=k(n,t=>{const n=e[t];return n.length===0?[]:[{title:t,items:n}]});return s.concat(t)};return{addItemToGroup:s,addItem:o,toFormats:i}},S=/^\.(?:ephox|tiny-pageembed|mce)(?:[.-]+\w+)+$/,M=e=>{const t=a.cacheSuffix;return s(e)&&(e=e.replace("?"+t,"").replace("&"+t,"")),e},F=(e,t)=>{const n=u(e);if(n){const s=O(e),o=s?e.documentBaseURI.toAbsolute(s):i.baseURL+"/skins/ui/"+n,a=i.baseURL+"/skins/content/";return t===o+"/content"+(e.inline?".inline":"")+".min.css"||t.indexOf(a)!==-1}return!1},o=e=>s(e)?t=>t.indexOf(e)!==-1:e instanceof RegExp?t=>e.test(t):e,z=e=>e.styleSheet,D=e=>e.selectorText,N=(t,n,s)=>{const i=[],a={},o=(n,a)=>{let r=n.href,c;if(r=M(r),!r||s&&!s(r,a)||F(t,r))return;e.each(n.imports,e=>{o(e,!0)});try{c=n.cssRules||n.rules}catch{}e.each(c,t=>{z(t)?o(t.styleSheet,!0):D(t)&&e.each(t.selectorText.split(","),t=>{i.push(e.trim(t))})})};e.each(t.contentCSS,e=>{a[e]=!0}),s||(s=(e,t)=>t||a[e]);try{e.each(n.styleSheets,e=>{o(e)})}catch{}return i},l=(t,n)=>{let s={};const i=/^(?:([a-z0-9-_]+))?(\.[a-z0-9_\-.]+)$/i.exec(n);if(!i)return;const o=i[1],a=i[2].substr(1).split(".").join(" "),r=e.makeMap("a,img");return i[1]?(s={title:n},t.schema.getTextBlockElements()[o]?s.block=o:t.schema.getBlockElements()[o]||r[o.toLowerCase()]?s.selector=o:s.inline=o):i[2]&&(s={inline:"span",title:n.substr(1),classes:a}),p(t)?s.classes=a:s.attributes={class:a},s},R=(t,n)=>e.grep(t,e=>!e.filter||e.filter(n)),P=t=>e.map(t,t=>e.extend({},t,{original:t,selectors:{},filter:o(t.filter)})),c=(e,t)=>t===null||g(e),I=(e,t,n,s)=>!(c(e,n)?t in s:t in n.selectors),B=(e,t,n,s)=>{c(e,n)?s[t]=!0:n.selectors[t]=!0},V=(e,t,n,s)=>{let o;const i=v(e);return s&&s.selector_converter?o=s.selector_converter:i?o=i:o=()=>l(e,n),o.call(t,n,s)},$=t=>{t.on("init",()=>{const n=h(),s={},i=o(b(t)),r=P(j(t)),a=(e,n)=>{if(I(t,e,n,s)){B(t,e,n,s);const o=V(t,t.plugins.importcss,e,n);if(o){const e=o.name||d.DOM.uniqueId();return t.formatter.register(e,o),{title:o.title,format:e}}}return null};e.each(N(t,t.getDoc(),o(_(t))),t=>{if(!S.test(t)&&(!i||i(t))){const s=R(r,t);if(s.length>0)e.each(s,e=>{const s=a(t,e);s&&n.addItemToGroup(e.title,s)});else{const e=a(t,null);e&&n.addItem(e)}}});const c=n.toFormats();t.dispatch("addStyleModifications",{items:c,replace:!y(t)})})},W=e=>{const t=t=>l(e,t);return{convertSelectorToFormat:t}};r=()=>{w.add("importcss",e=>(f(e),$(e),W(e)))},r()})()