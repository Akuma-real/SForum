(function(e,t){typeof exports=="object"&&typeof module!="undefined"?module.exports=t():typeof define=="function"&&define.amd?define(t):(e=typeof globalThis!="undefined"?globalThis:e||self,e.clear_button=t())})(this,function(){"use strict";const n="[̀-ͯ·ʾʼ]",e={},t={"/":"⁄∕",0:"߀",a:"ⱥɐɑ",aa:"ꜳ",ae:"æǽǣ",ao:"ꜵ",au:"ꜷ",av:"ꜹꜻ",ay:"ꜽ",b:"ƀɓƃ",c:"ꜿƈȼↄ",d:"đɗɖᴅƌꮷԁɦ",e:"ɛǝᴇɇ",f:"ꝼƒ",g:"ǥɠꞡᵹꝿɢ",h:"ħⱨⱶɥ",i:"ɨı",j:"ɉȷ",k:"ƙⱪꝁꝃꝅꞣ",l:"łƚɫⱡꝉꝇꞁɭ",m:"ɱɯϻ",n:"ꞥƞɲꞑᴎлԉ",o:"øǿɔɵꝋꝍᴑ",oe:"œ",oi:"ƣ",oo:"ꝏ",ou:"ȣ",p:"ƥᵽꝑꝓꝕρ",q:"ꝗꝙɋ",r:"ɍɽꝛꞧꞃ",s:"ßȿꞩꞅʂ",t:"ŧƭʈⱦꞇ",th:"þ",tz:"ꜩ",u:"ʉ",v:"ʋꝟʌ",vy:"ꝡ",w:"ⱳ",y:"ƴɏỿ",z:"ƶȥɀⱬꝣ",hv:"ƕ"};for(let n in t){let s=t[n]||"";for(let t=0;t<s.length;t++){let o=s.substring(t,t+1);e[o]=n}}new RegExp(Object.keys(e).join("|")+"|"+n,"gu");const s=e=>{if(e.jquery)return e[0];if(e instanceof HTMLElement)return e;if(o(e)){var t=document.createElement("template");return t.innerHTML=e.trim(),t.content.firstChild}return document.querySelector(e)},o=e=>typeof e=="string"&&e.indexOf("<")>-1;function i(e){const t=this,n=Object.assign({className:"clear-button",title:"Clear All",html:e=>`<div class="${e.className}" title="${e.title}">&#10799;</div>`},e);t.on("initialize",()=>{var e=s(n.html(n));e.addEventListener("click",e=>{if(t.isDisabled)return;t.clear(),t.settings.mode==="single"&&t.settings.allowEmptyOption&&t.addItem(""),e.preventDefault(),e.stopPropagation()}),t.control.appendChild(e)})}return i})