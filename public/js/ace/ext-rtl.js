ace.define("ace/ext/rtl",["require","exports","module","ace/editor","ace/config"],function(e){"use strict";var o=[{name:"leftToRight",bindKey:{win:"Ctrl-Alt-Shift-L",mac:"Command-Alt-Shift-L"},exec:function(e){e.session.$bidiHandler.setRtlDirection(e,!1)},readOnly:!0},{name:"rightToLeft",bindKey:{win:"Ctrl-Alt-Shift-R",mac:"Command-Alt-Shift-R"},exec:function(e){e.session.$bidiHandler.setRtlDirection(e,!0)},readOnly:!0}],l=e("../editor").Editor;e("../config").defineOptions(l.prototype,"editor",{rtlText:{set:function(e){e?(this.on("change",r),this.on("changeSelection",i),this.renderer.on("afterRender",s),this.commands.on("exec",a),this.commands.addCommands(o)):(this.off("change",r),this.off("changeSelection",i),this.renderer.off("afterRender",s),this.commands.off("exec",a),this.commands.removeCommands(o),c(this.renderer)),this.renderer.updateFull()}},rtl:{set:function(e){this.session.$bidiHandler.$isRtl=e,e?(this.setOption("rtlText",!1),this.renderer.on("afterRender",s),this.session.$bidiHandler.seenBidi=!0):(this.renderer.off("afterRender",s),c(this.renderer)),this.renderer.updateFull()}}});function i(e,t){var n=t.getSelection().lead;t.session.$bidiHandler.isRtlLine(n.row)&&n.column===0&&(t.session.$bidiHandler.isMoveLeftOperation&&n.row>0?t.getSelection().moveCursorTo(n.row-1,t.session.getLine(n.row-1).length):t.getSelection().isEmpty()?n.column+=1:n.setPosition(n.row,n.column+1))}function a(e){e.editor.session.$bidiHandler.isMoveLeftOperation=/gotoleft|selectleft|backspace|removewordleft/.test(e.command.name)}function r(e,t){var s,n=t.session;if(n.$bidiHandler.currentRow=null,n.$bidiHandler.isRtlLine(e.start.row)&&e.action==="insert"&&e.lines.length>1)for(s=e.start.row;s<e.end.row;s++)n.getLine(s+1).charAt(0)!==n.$bidiHandler.RLE&&(n.doc.$lines[s+1]=n.$bidiHandler.RLE+n.getLine(s+1))}function s(e,t){var s=t.session,n=s.$bidiHandler,o=t.$textLayer.$lines.cells,i=t.layerConfig.width-t.layerConfig.padding+"px";o.forEach(function(e){var t=e.element.style;n&&n.isRtlLine(e.row)?(t.direction="rtl",t.textAlign="right",t.width=i):(t.direction="",t.textAlign="",t.width="")})}function c(e){var t=e.$textLayer.$lines;t.cells.forEach(n),t.cellCache.forEach(n);function n(e){var t=e.element.style;t.direction=t.textAlign=t.width=""}}}),function(){ace.require(["ace/ext/rtl"],function(e){typeof module=="object"&&typeof exports=="object"&&module&&(module.exports=e)})}()