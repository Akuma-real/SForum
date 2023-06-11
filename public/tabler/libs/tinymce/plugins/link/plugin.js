(function(){"use strict";var r,C,B,Z,ze=tinymce.util.Tools.resolve("tinymce.PluginManager"),oe,se;const Lt=(e,t,n)=>{var s;return!!n(e,t.prototype)||((s=e.constructor)===null||s===void 0?void 0:s.name)===t.name},Mt=e=>{const t=typeof e;return e===null?"null":t==="object"&&Array.isArray(e)?"array":t==="object"&&Lt(e,String,(e,t)=>t.isPrototypeOf(e))?"string":t},v=e=>t=>Mt(t)===e,q=e=>t=>typeof t===e,St=e=>t=>e===t,s=v("string"),U=v("object"),d=v("array"),At=St(null),W=q("boolean"),kt=e=>e==null,h=e=>!kt(e),L=q("function"),z=(e,t)=>{if(d(e)){for(let n=0,s=e.length;n<s;++n)if(!t(e[n]))return!1;return!0}return!1},i=()=>{},Ct=e=>()=>e,xt=(e,t)=>e===t;class e{constructor(e,t){this.tag=e,this.value=t}static some(t){return new e(!0,t)}static none(){return e.singletonNone}fold(e,t){return this.tag?t(this.value):e()}isSome(){return this.tag}isNone(){return!this.tag}map(t){return this.tag?e.some(t(this.value)):e.none()}bind(t){return this.tag?t(this.value):e.none()}exists(e){return this.tag&&e(this.value)}forall(e){return!this.tag||e(this.value)}filter(t){return!this.tag||t(this.value)?this:e.none()}getOr(e){return this.tag?this.value:e}or(e){return this.tag?this:e}getOrThunk(e){return this.tag?this.value:e()}orThunk(e){return this.tag?this:e()}getOrDie(e){if(this.tag)return this.value;throw new Error(e??"Called getOrDie on None")}static from(t){return h(t)?e.some(t):e.none()}getOrNull(){return this.tag?this.value:null}getOrUndefined(){return this.value}each(e){this.tag&&e(this.value)}toArray(){return this.tag?[this.value]:[]}toString(){return this.tag?`some(${this.value})`:"none()"}}e.singletonNone=new e(!1);const Ot=Array.prototype.indexOf,_t=Array.prototype.push,yt=(e,t)=>Ot.call(e,t),vt=(e,t)=>yt(e,t)>-1,rt=(e,t)=>{const n=e.length,s=new Array(n);for(let o=0;o<n;o++){const i=e[o];s[o]=t(i,o)}return s},ot=(e,t)=>{for(let n=0,s=e.length;n<s;n++){const o=e[n];t(o,n)}},$e=(e,t,n)=>(ot(e,(e,s)=>{n=t(n,e,s)}),n),E=e=>{const t=[];for(let n=0,s=e.length;n<s;++n){if(!d(e[n]))throw new Error("Arr.flatten item "+n+" was not an array, input: "+e);_t.apply(t,e[n])}return t},He=(e,t)=>E(rt(e,t)),w=(t,n)=>{for(let e=0;e<t.length;e++){const s=n(t[e],e);if(s.isSome())return s}return e.none()},S=(e,t,n=xt)=>e.exists(e=>n(e,t)),Pe=e=>{const t=[],n=e=>{t.push(e)};for(let t=0;t<e.length;t++)e[t].each(n);return t},y=(t,n)=>t?e.some(n):e.none(),n=e=>t=>t.options.get(e),De=e=>{const t=e.options.register;t("link_assume_external_targets",{processor:e=>{const t=s(e)||W(e);return t?e===!0?{value:1,valid:t}:e==="http"||e==="https"?{value:e,valid:t}:{value:0,valid:t}:{valid:!1,message:"Must be a string or a boolean."}},default:!1}),t("link_context_toolbar",{processor:"boolean",default:!1}),t("link_list",{processor:e=>s(e)||L(e)||z(e,U)}),t("link_default_target",{processor:"string"}),t("link_default_protocol",{processor:"string",default:"https"}),t("link_target_list",{processor:e=>W(e)||z(e,U),default:!0}),t("link_rel_list",{processor:"object[]",default:[]}),t("link_class_list",{processor:"object[]",default:[]}),t("link_title",{processor:"boolean",default:!0}),t("allow_unsafe_link_target",{processor:"boolean",default:!1}),t("link_quicklink",{processor:"boolean",default:!1})},D=n("link_assume_external_targets"),ie=n("link_context_toolbar"),we=n("link_list"),R=n("link_default_target"),_e=n("link_default_protocol"),H=n("link_target_list"),I=n("link_rel_list"),je=n("link_class_list"),be=n("link_title"),$=n("allow_unsafe_link_target"),ve=n("link_quicklink");r=tinymce.util.Tools.resolve("tinymce.util.Tools");const f=e=>s(e.value)?e.value:"",ge=e=>s(e.text)?e.text:s(e.title)?e.title:"",Y=(e,t)=>{const n=[];return r.each(e,e=>{const s=ge(e);if(e.menu!==void 0){const o=Y(e.menu,t);n.push({text:s,items:o})}else{const o=t(e);n.push({text:s,value:o})}}),n},G=(t=f)=>n=>e.from(n).map(e=>Y(e,t)),fe=e=>G(f)(e),me=(e,t)=>n=>({name:e,type:"listbox",label:t,items:n}),t={sanitize:fe,sanitizeWith:G,createUi:me,getValue:f},he=Object.keys,ue=Object.hasOwnProperty,de=(e,t)=>{const n=he(e);for(let s=0,i=n.length;s<i;s++){const o=n[s],a=e[o];t(a,o)}},le=e=>(t,n)=>{e[n]=t},ce=(e,t,n,s)=>{de(e,(e,o)=>{(t(e,o)?n:s)(e,o)})},re=(e,t)=>{const n={};return ce(e,t,le(n),i),n},_=(e,t)=>ue.call(e,t),Ye=(e,t)=>_(e,t)&&e[t]!==void 0&&e[t]!==null;oe=tinymce.util.Tools.resolve("tinymce.dom.TreeWalker"),se=tinymce.util.Tools.resolve("tinymce.util.URI");const ne=e=>h(e)&&e.nodeName.toLowerCase()==="a",te=e=>ne(e)&&!!b(e),ee=(e,t)=>{if(e.collapsed)return[];const s=e.cloneContents(),o=s.firstChild,a=new oe(o,s),i=[];let n=o;do t(n)&&i.push(n);while(n=a.next())return i},J=e=>/^\w+:/i.test(e),b=e=>{var t,n;return(n=(t=e.getAttribute("data-mce-href"))!==null&&t!==void 0?t:e.getAttribute("href"))!==null&&n!==void 0?n:""},X=(e,t)=>{const n=["noopener"],s=e?e.split(/\s+/):[],a=e=>r.trim(e.sort().join(" ")),c=e=>(e=o(e),e.length>0?e.concat(n):n),o=e=>e.filter(e=>r.inArray(n,e)===-1),i=t?c(s):o(s);return i.length>0?a(i):""},pe=e=>e.replace(/\uFEFF/g,""),o=(t,n)=>(n=n||t.selection.getNode(),m(n)?e.from(t.dom.select("a[href]",n)[0]):e.from(t.dom.getParent(n,"a[href]"))),a=(e,t)=>o(e,t).isSome(),V=(e,t)=>{const n=t.fold(()=>e.getContent({format:"text"}),e=>e.innerText||e.textContent||"");return pe(n)},O=e=>r.grep(e,te).length>0,ye=e=>ee(e,te).length>0,P=e=>{const n=e.schema.getTextInlineElements(),s=e=>e.nodeType===1&&!ne(e)&&!_(n,e.nodeName.toLowerCase()),i=o(e).exists(e=>e.hasAttribute("data-mce-block"));if(i)return!1;const t=e.selection.getRng();if(t.collapsed)return!0;const a=ee(t,s);return a.length===0},m=e=>h(e)&&e.nodeName==="FIGURE"&&/\bimage\b/i.test(e.className),Oe=e=>{const t=["title","rel","class","target"];return $e(t,(t,n)=>(e[n].each(e=>{t[n]=e.length>0?e:null}),t),{href:e.href})},xe=(e,t)=>(t==="http"||t==="https")&&!J(e)?t+"://"+e:e,Ce=(t,n)=>{const s={...n};if(I(t).length===0&&!$(t)){const e=X(s.rel,s.target==="_blank");s.rel=e||null}return e.from(s.target).isNone()&&H(t)===!1&&(s.target=R(t)),s.href=xe(s.href,D(t)),s},Ee=(e,t,n,s)=>{n.each(e=>{_(t,"innerText")?t.innerText=e:t.textContent=e}),e.dom.setAttribs(t,s),e.selection.select(t)},ke=(e,t,n,s)=>{const o=e.dom;m(t)?Le(o,t,s):n.fold(()=>{e.execCommand("mceInsertLink",!1,s)},t=>{e.insertContent(o.createHTML("a",s,o.encode(t)))})},Ae=(e,t,n)=>{const s=e.selection.getNode(),a=o(e,s),i=Ce(e,Oe(n));e.undoManager.transact(()=>{n.href===t.href&&t.attach(),a.fold(()=>{ke(e,s,n.text,i)},t=>{e.focus(),Ee(e,t,n.text,i)})})},Se=e=>{const s=e.dom,n=e.selection,a=n.getBookmark(),t=n.getRng().cloneRange(),o=s.getParent(t.startContainer,"a[href]",e.getBody()),i=s.getParent(t.endContainer,"a[href]",e.getBody());o&&t.setStartBefore(o),i&&t.setEndAfter(i),n.setRng(t),e.execCommand("unlink"),n.moveToBookmark(a)},Me=e=>{e.undoManager.transact(()=>{const t=e.selection.getNode();m(t)?Ne(e,t):Se(e),e.focus()})},Fe=e=>{const{class:t,href:n,rel:s,target:o,text:i,title:a}=e;return re({class:t.getOrNull(),href:n,rel:s.getOrNull(),target:o.getOrNull(),text:i.getOrNull(),title:a.getOrNull()},(e)=>At(e)===!1)},Te=(e,t)=>{const n=e.options.get,o={allow_html_data_urls:n("allow_html_data_urls"),allow_script_urls:n("allow_script_urls"),allow_svg_data_urls:n("allow_svg_data_urls")},s=t.href;return{...t,href:se.isDomSafe(s,"a",o)?s:""}},N=(e,t,n)=>{const s=Te(e,n);e.hasPlugin("rtc",!0)?e.execCommand("createlink",!1,Fe(s)):Ae(e,t,s)},c=e=>{e.hasPlugin("rtc",!0)?e.execCommand("unlink"):Me(e)},Ne=(e,t)=>{var n;const s=e.dom.select("img",t)[0];if(s){const o=e.dom.getParents(s,"a[href]",t)[0];o&&((n=o.parentNode)===null||n===void 0?void 0:n.insertBefore(s,o),e.dom.remove(o))}},Le=(e,t,n)=>{var o;const s=e.select("img",t)[0];if(s){const t=e.create("a",n);(o=s.parentNode)===null||o===void 0?void 0:o.insertBefore(t,s),t.appendChild(s)}},Re=e=>Ye(e,"items"),M=(e,t)=>w(t,t=>Re(t)?M(e,t.items):y(t.value===e,t)),k=(t,n,s,o)=>{const a=o[n],r=t.length>0;return a!==void 0?M(a,s).map(e=>({url:{value:e.value,meta:{text:r?t:e.text,attach:i}},text:r?t:e.text})):e.none()},Ie=(t,n)=>n==="link"?t.link:n==="anchor"?t.anchor:e.none(),Be=(t,n)=>{const s={text:t.text,title:t.title},o=t=>{var n;return y(s.title.length<=0,e.from((n=t.meta)===null||n===void 0?void 0:n.title).getOr(""))},i=t=>{var n;return y(s.text.length<=0,e.from((n=t.meta)===null||n===void 0?void 0:n.text).getOr(t.value))},a=t=>{const n=i(t.url),s=o(t.url);return n.isSome()||s.isSome()?e.some({...n.map(e=>({text:e})).getOr({}),...s.map(e=>({title:e})).getOr({})}):e.none()},r=(e,t)=>{const o=Ie(n,t).getOr([]);return k(s.text,t,o,e)},c=(t,n)=>{const o=n.name;return o==="url"?a(t()):vt(["anchor","link"],o)?r(t(),o):o==="text"||o==="title"?(s[o]=t()[o],e.none()):e.none()};return{onChange:c}},Ve={init:Be,getDelta:k};C=tinymce.util.Tools.resolve("tinymce.util.Delay");const We=(e,t,n)=>{const s=e.selection.getRng();C.setEditorTimeout(e,()=>{e.windowManager.confirm(t,t=>{e.selection.setRng(s),n(t)})})},Ue=t=>{const n=t.href,s=n.indexOf("@")>0&&n.indexOf("/")===-1&&n.indexOf("mailto:")===-1;return s?e.some({message:"The URL you entered seems to be an email address. Do you want to add the required mailto: prefix?",preprocess:e=>({...e,href:"mailto:"+n})}):e.none()},Ke=(t,n)=>s=>{const o=s.href,i=t===1&&!J(o)||t===0&&/^\s*www(\.|\d\.)/i.test(o);return i?e.some({message:`The URL you entered seems to be an external link. Do you want to add the required ${n}:// prefix?`,preprocess:e=>({...e,href:n+"://"+o})}):e.none()},qe=(e,t)=>w([Ue,Ke(D(e),_e(e))],e=>e(t)).fold(()=>Promise.resolve(t),n=>new Promise(s=>{We(e,n.message,e=>{s(e?n.preprocess(t):t)})})),ae={preprocess:qe},Ge=t=>{const s=t.dom.select("a:not([href])"),n=He(s,e=>{const t=e.name||e.id;return t?[{text:t,value:"#"+t}]:[]});return n.length>0?e.some([{text:"None",value:""}].concat(n)):e.none()},Xe={getAnchors:Ge},Qe=n=>{const s=je(n);return s.length>0?t.sanitize(s):e.none()},Ze={getClasses:Qe},Je=t=>{try{return e.some(JSON.parse(t))}catch{return e.none()}},et=n=>{const i=e=>n.convertURL(e.value||e.url||"","href"),o=we(n);return new Promise(t=>{s(o)?fetch(o).then(e=>e.ok?e.text().then(Je):Promise.reject()).then(t,()=>t(e.none())):L(o)?o(n=>t(e.some(n))):t(e.from(o))}).then(e=>e.bind(t.sanitizeWith(i)).map(e=>{if(e.length>0){const t=[{text:"None",value:""}];return t.concat(e)}return e}))},tt={getLinks:et},nt=(n,s)=>{const o=I(n);if(o.length>0){const e=S(s,"_blank"),i=$(n)===!1,a=n=>X(t.getValue(n),e),r=i?t.sanitizeWith(a):t.sanitize;return r(o)}return e.none()},st={getRels:nt},x=[{text:"Current window",value:""},{text:"New window",value:"_blank"}],it=n=>{const s=H(n);return d(s)?t.sanitize(s).orThunk(()=>e.some(x)):s===!1?e.none():e.some(x)},at={getTargets:it},l=(t,n,s)=>{const o=t.getAttrib(n,s);return o!==null&&o.length>0?e.some(o):e.none()},ct=(t,n)=>{const s=t.dom,o=P(t),i=o?e.some(V(t.selection,n)):e.none(),a=n.bind(t=>e.from(s.getAttrib(t,"href"))),r=n.bind(t=>e.from(s.getAttrib(t,"target"))),c=n.bind(e=>l(s,e,"rel")),d=n.bind(e=>l(s,e,"class")),u=n.bind(e=>l(s,e,"title"));return{url:a,text:i,title:u,target:r,rel:c,linkClass:d}},lt=(e,t)=>tt.getLinks(e).then(n=>{const s=ct(e,t);return{anchor:s,catalogs:{targets:at.getTargets(e),rels:st.getRels(e,s.target),classes:Ze.getClasses(e),anchor:Xe.getAnchors(e),link:n},optNode:t,flags:{titleEnabled:be(e)}}}),dt={collect:lt},ut=(t,n)=>s=>{const o=s.getData();if(!o.url.value){c(t),s.close();return}const a=t=>e.from(o[t]).filter(e=>!S(n.anchor[t],e)),r={href:o.url.value,text:a("text"),target:a("target"),rel:a("rel"),class:a("linkClass"),title:a("title")},l={href:o.url.value,attach:o.url.meta!==void 0&&o.url.meta.attach?o.url.meta.attach:i};ae.preprocess(t,r).then(e=>{N(t,l,e)}),s.close()},ht=e=>{const t=o(e);return dt.collect(e,t)},mt=(e,t)=>{const n=e.anchor,s=n.url.getOr("");return{url:{value:s,meta:{original:{value:s}}},text:n.text.getOr(""),title:n.title.getOr(""),anchor:s,link:s,rel:n.rel.getOr(""),target:n.target.or(t).getOr(""),linkClass:n.linkClass.getOr("")}},ft=(n,s,o)=>{const r=[{name:"url",type:"urlinput",filetype:"file",label:"URL"}],c=n.anchor.text.map(()=>({name:"text",type:"input",label:"Text to display"})).toArray(),l=n.flags.titleEnabled?[{name:"title",type:"input",label:"Title"}]:[],d=e.from(R(o)),a=mt(n,d),i=n.catalogs,u=Ve.init(a,i),h={type:"panel",items:E([r,c,l,Pe([i.anchor.map(t.createUi("anchor","Anchors")),i.rels.map(t.createUi("rel","Rel")),i.targets.map(t.createUi("target","Open link in...")),i.link.map(t.createUi("link","Link list")),i.classes.map(t.createUi("linkClass","Class"))])])};return{title:"Insert/Edit Link",size:"normal",body:h,buttons:[{type:"cancel",name:"cancel",text:"Cancel"},{type:"submit",name:"save",text:"Save",primary:!0}],initialData:a,onChange:(e,{name:t})=>{u.onChange(e.getData,{name:t}).each(t=>{e.setData(t)})},onSubmit:s}},pt=e=>{const t=ht(e);t.then(t=>{const n=ut(e,t);return ft(t,n,e)}).then(t=>{e.windowManager.open(t)})},gt=e=>{e.addCommand("mceLink",(t,n)=>{n?.dialog===!0||!ve(e)?pt(e):e.dispatch("contexttoolbar-show",{toolbarKey:"quicklink"})})};B=tinymce.util.Tools.resolve("tinymce.util.VK");const bt=(e,t)=>{document.body.appendChild(e),e.dispatchEvent(t),document.body.removeChild(e)},jt=e=>{const t=document.createElement("a");t.target="_blank",t.href=e,t.rel="noreferrer noopener";const n=document.createEvent("MouseEvents");n.initMouseEvent("click",!0,!0,window,0,0,0,0,0,!1,!1,!1,!1,0,null),bt(t,n)},A=(e,t)=>e.dom.getParent(t,"a[href]"),F=e=>A(e,e.selection.getStart()),wt=e=>e.altKey===!0&&e.shiftKey===!1&&e.ctrlKey===!1&&e.metaKey===!1,j=(e,t)=>{if(t){const n=b(t);if(/^#/.test(n)){const t=e.dom.select(n);t.length&&e.selection.scrollIntoView(t[0],!0)}else jt(t.href)}},T=e=>()=>{e.execCommand("mceLink",!1,{dialog:!0})},g=e=>()=>{j(e,F(e))},Et=e=>{e.on("click",t=>{const n=A(e,t.target);n&&B.metaKeyPressed(t)&&(t.preventDefault(),j(e,n))}),e.on("keydown",t=>{if(!t.isDefaultPrevented()&&t.keyCode===13&&wt(t)){const n=F(e);n&&(t.preventDefault(),j(e,n))}})},u=(e,t)=>(e.on("NodeChange",t),()=>e.off("NodeChange",t)),p=e=>t=>{const n=()=>t.setActive(!e.mode.isReadOnly()&&a(e,e.selection.getNode()));return n(),u(e,n)},K=e=>t=>{const n=()=>t.setEnabled(a(e,e.selection.getNode()));return n(),u(e,n)},Q=e=>t=>{const n=t=>O(t)||ye(e.selection.getRng()),s=e.dom.getParents(e.selection.getStart());return t.setEnabled(n(s)),u(e,e=>t.setEnabled(n(e.parents)))},Ft=e=>{e.addShortcut("Meta+K","",()=>{e.execCommand("mceLink")})},Tt=e=>{e.ui.registry.addToggleButton("link",{icon:"link",tooltip:"Insert/edit link",onAction:T(e),onSetup:p(e)}),e.ui.registry.addButton("openlink",{icon:"new-tab",tooltip:"Open link",onAction:g(e),onSetup:K(e)}),e.ui.registry.addButton("unlink",{icon:"unlink",tooltip:"Remove link",onAction:()=>c(e),onSetup:Q(e)})},zt=e=>{e.ui.registry.addMenuItem("openlink",{text:"Open link",icon:"new-tab",onAction:g(e),onSetup:K(e)}),e.ui.registry.addMenuItem("link",{icon:"link",text:"Link...",shortcut:"Meta+K",onAction:T(e)}),e.ui.registry.addMenuItem("unlink",{icon:"unlink",text:"Remove link",onAction:()=>c(e),onSetup:Q(e)})},Dt=e=>{const t="link unlink openlink",n="link";e.ui.registry.addContextMenu("link",{update:s=>O(e.dom.getParents(s,"a"))?t:n})},Nt=t=>{const s=e=>{e.selection.collapse(!1)},n=e=>{const n=t.selection.getNode();return e.setEnabled(a(t,n)),i},r=n=>{const s=o(t),i=P(t);if(s.isNone()&&i){const o=V(t.selection,s);return e.some(o.length>0?o:n)}return e.none()};t.ui.registry.addContextForm("quicklink",{launch:{type:"contextformtogglebutton",icon:"link",tooltip:"Link",onSetup:p(t)},label:"Link",predicate:e=>ie(t)&&a(t,e),initValue:()=>{const e=o(t);return e.fold(Ct(""),b)},commands:[{type:"contextformtogglebutton",icon:"link",tooltip:"Link",primary:!0,onSetup:e=>{const n=t.selection.getNode();return e.setActive(a(t,n)),p(t)(e)},onAction:n=>{const o=n.getValue(),a=r(o),c={href:o,attach:i};N(t,c,{href:o,text:a,title:e.none(),rel:e.none(),target:e.none(),class:e.none()}),s(t),n.hide()}},{type:"contextformbutton",icon:"unlink",tooltip:"Remove link",onSetup:n,onAction:e=>{c(t),e.hide()}},{type:"contextformbutton",icon:"new-tab",tooltip:"Open link",onSetup:n,onAction:e=>{g(t)(),e.hide()}}]})};Z=()=>{ze.add("link",e=>{De(e),Tt(e),zt(e),Dt(e),Nt(e),Et(e),gt(e),Ft(e)})},Z()})()