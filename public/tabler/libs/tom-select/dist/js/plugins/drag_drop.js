(function(e,t){typeof exports=="object"&&typeof module!="undefined"?module.exports=t():typeof define=="function"&&define.amd?define(t):(e=typeof globalThis!="undefined"?globalThis:e||self,e.drag_drop=t())})(this,function(){"use strict";function e(){var t,n,e=this;if(!$.fn.sortable)throw new Error('The "drag_drop" plugin requires jQuery UI "sortable".');if(e.settings.mode!=="multi")return;t=e.lock,n=e.unlock,e.hook("instead","lock",()=>{var n=$(e.control).data("sortable");return n&&n.disable(),t.call(e)}),e.hook("instead","unlock",()=>{var t=$(e.control).data("sortable");return t&&t.enable(),n.call(e)}),e.on("initialize",()=>{var t=$(e.control).sortable({items:"[data-value]",forcePlaceholderSize:!0,disabled:e.isLocked,start:(e,n)=>{n.placeholder.css("width",n.helper.css("width")),t.css({overflow:"visible"})},stop:()=>{t.css({overflow:"hidden"});var n=[];t.children("[data-value]").each(function(){this.dataset.value&&n.push(this.dataset.value)}),e.setValue(n)}})})}return e})