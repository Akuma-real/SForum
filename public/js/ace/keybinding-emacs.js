ace.define("ace/occur",["require","exports","module","ace/lib/oop","ace/range","ace/search","ace/edit_session","ace/search_highlight","ace/lib/dom"],function(e,t){"use strict";var a,o=e("./lib/oop"),l=e("./range").Range,i=e("./search").Search,r=e("./edit_session").EditSession,c=e("./search_highlight").SearchHighlight;function s(){}o.inherits(s,i),function(){this.enter=function(e,t){if(!t.needle)return!1;var n,s=e.getCursorPosition();return this.displayOccurContent(e,t),n=this.originalToOccurPosition(e.session,s),e.moveCursorToPosition(n),!0},this.exit=function(e,t){var n=t.translatePosition&&e.getCursorPosition(),s=n&&this.occurToOriginalPosition(e.session,n);return this.displayOriginalContent(e),s&&e.moveCursorToPosition(s),!0},this.highlight=function(e,t){var n=e.$occurHighlight=e.$occurHighlight||e.addDynamicMarker(new c(null,"ace_occur-highlight","text"));n.setRegexp(t),e._emit("changeBackMarker")},this.displayOccurContent=function(e,t){this.$originalSession=e.session;var s=this.matchingLines(e.session,t),o=s.map(function(e){return e.content}),n=new r(o.join(`
`));n.$occur=this,n.$occurMatchingLines=s,e.setSession(n),this.$useEmacsStyleLineStart=this.$originalSession.$useEmacsStyleLineStart,n.$useEmacsStyleLineStart=this.$useEmacsStyleLineStart,this.highlight(n,t.re),n._emit("changeBackMarker")},this.displayOriginalContent=function(e){e.setSession(this.$originalSession),this.$originalSession.$useEmacsStyleLineStart=this.$useEmacsStyleLineStart},this.originalToOccurPosition=function(e,t){var n,s=e.$occurMatchingLines,o={row:0,column:0};if(!s)return o;for(n=0;n<s.length;n++)if(s[n].row===t.row)return{row:n,column:t.column};return o},this.occurToOriginalPosition=function(e,t){var n=e.$occurMatchingLines;return!n||!n[t.row]?t:{row:n[t.row].row,column:t.column}},this.matchingLines=function(e,t){if(t=o.mixin({},t),!e||!t.needle)return[];var n=new i;return n.set(t),n.findAll(e).reduce(function(t,n){var s=n.start.row,o=t[t.length-1];return o&&o.row===s?t:t.concat({row:s,content:e.getLine(s)})},[])}}.call(s.prototype),a=e("./lib/dom"),a.importCssString(`.ace_occur-highlight {
    border-radius: 4px;
    background-color: rgba(87, 255, 8, 0.25);
    position: absolute;
    z-index: 4;
    box-sizing: border-box;
    box-shadow: 0 0 4px rgb(91, 255, 50);
}
.ace_dark .ace_occur-highlight {
    background-color: rgb(80, 140, 85);
    box-shadow: 0 0 4px rgb(60, 120, 70);
}
`,"incremental-occur-highlighting"),t.Occur=s}),ace.define("ace/commands/occur_commands",["require","exports","module","ace/config","ace/occur","ace/keyboard/hash_handler","ace/lib/oop"],function(e,t){var l=e("../config"),a=e("../occur").Occur,r={name:"occur",exec:function(e,t){var n=!!e.session.$occur,o=(new a).enter(e,t);o&&!n&&s.installIn(e)},readOnly:!0},o=[{name:"occurexit",bindKey:"esc|Ctrl-G",exec:function(e){var t=e.session.$occur;if(!t)return;t.exit(e,{}),e.session.$occur||s.uninstallFrom(e)},readOnly:!0},{name:"occuraccept",bindKey:"enter",exec:function(e){var t=e.session.$occur;if(!t)return;t.exit(e,{translatePosition:!0}),e.session.$occur||s.uninstallFrom(e)},readOnly:!0}],i=e("../keyboard/hash_handler").HashHandler,c=e("../lib/oop");function s(){}c.inherits(s,i),function(){this.isOccurHandler=!0,this.attach=function(e){i.call(this,o,e.commands.platform),this.$editor=e};var e=this.handleKeyboard;this.handleKeyboard=function(t,n,s,o){var i=e.call(this,t,n,s,o);return i&&i.command?i:void 0}}.call(s.prototype),s.installIn=function(e){var t=new this;e.keyBinding.addKeyboardHandler(t),e.commands.addCommands(o)},s.uninstallFrom=function(e){e.commands.removeCommands(o);var t=e.getKeyboardHandler();t.isOccurHandler&&e.keyBinding.removeKeyboardHandler(t)},t.occurStartCommand=r}),ace.define("ace/commands/incremental_search_commands",["require","exports","module","ace/config","ace/lib/oop","ace/keyboard/hash_handler","ace/commands/occur_commands"],function(e,t){var a=e("../config"),o=e("../lib/oop"),i=e("../keyboard/hash_handler").HashHandler,r=e("./occur_commands").occurStartCommand;t.iSearchStartCommands=[{name:"iSearch",bindKey:{win:"Ctrl-F",mac:"Command-F"},exec:function(e,t){a.loadModule(["core","ace/incremental_search"],function(n){var s=n.iSearch=n.iSearch||new n.IncrementalSearch;s.activate(e,t.backwards),t.jumpToFirstMatch&&s.next(t)})},readOnly:!0},{name:"iSearchBackwards",exec:function(e){e.execCommand("iSearch",{backwards:!0})},readOnly:!0},{name:"iSearchAndGo",bindKey:{win:"Ctrl-K",mac:"Command-G"},exec:function(e){e.execCommand("iSearch",{jumpToFirstMatch:!0,useCurrentOrPrevSearch:!0})},readOnly:!0},{name:"iSearchBackwardsAndGo",bindKey:{win:"Ctrl-Shift-K",mac:"Command-Shift-G"},exec:function(e){e.execCommand("iSearch",{jumpToFirstMatch:!0,backwards:!0,useCurrentOrPrevSearch:!0})},readOnly:!0}],t.iSearchCommands=[{name:"restartSearch",bindKey:{win:"Ctrl-F",mac:"Command-F"},exec:function(e){e.cancelSearch(!0)}},{name:"searchForward",bindKey:{win:"Ctrl-S|Ctrl-K",mac:"Ctrl-S|Command-G"},exec:function(e,t){t.useCurrentOrPrevSearch=!0,e.next(t)}},{name:"searchBackward",bindKey:{win:"Ctrl-R|Ctrl-Shift-K",mac:"Ctrl-R|Command-Shift-G"},exec:function(e,t){t.useCurrentOrPrevSearch=!0,t.backwards=!0,e.next(t)}},{name:"extendSearchTerm",exec:function(e,t){e.addString(t)}},{name:"extendSearchTermSpace",bindKey:"space",exec:function(e){e.addString(" ")}},{name:"shrinkSearchTerm",bindKey:"backspace",exec:function(e){e.removeChar()}},{name:"confirmSearch",bindKey:"return",exec:function(e){e.deactivate()}},{name:"cancelSearch",bindKey:"esc|Ctrl-G",exec:function(e){e.deactivate(!0)}},{name:"occurisearch",bindKey:"Ctrl-O",exec:function(e){var t=o.mixin({},e.$options);e.deactivate(),r.exec(e.$editor,t)}},{name:"yankNextWord",bindKey:"Ctrl-w",exec:function(e){var t=e.$editor,n=t.selection.getRangeOfMovements(function(e){e.moveCursorWordRight()}),s=t.session.getTextRange(n);e.addString(s)}},{name:"yankNextChar",bindKey:"Ctrl-Alt-y",exec:function(e){var t=e.$editor,n=t.selection.getRangeOfMovements(function(e){e.moveCursorRight()}),s=t.session.getTextRange(n);e.addString(s)}},{name:"recenterTopBottom",bindKey:"Ctrl-l",exec:function(e){e.$editor.execCommand("recenterTopBottom")}},{name:"selectAllMatches",bindKey:"Ctrl-space",exec:function(e){var t=e.$editor,n=t.session.$isearchHighlight,s=n&&n.cache?n.cache.reduce(function(e,t){return e.concat(t||[])},[]):[];e.deactivate(!1),s.forEach(t.selection.addRange.bind(t.selection))}},{name:"searchAsRegExp",bindKey:"Alt-r",exec:function(e){e.convertNeedleToRegExp()}}].map(function(e){return e.readOnly=!0,e.isIncrementalSearchCommand=!0,e.scrollIntoView="animate-cursor",e});function s(e){this.$iSearch=e}o.inherits(s,i),function(){this.attach=function(e){var n=this.$iSearch;i.call(this,t.iSearchCommands,e.commands.platform),this.$commandExecHandler=e.commands.on("exec",function(t){if(!t.command.isIncrementalSearchCommand)return n.deactivate();t.stopPropagation(),t.preventDefault();var s=e.session.getScrollTop(),o=t.command.exec(n,t.args||{});return e.renderer.scrollCursorIntoView(null,.5),e.renderer.animateScrolling(s),o})},this.detach=function(e){if(!this.$commandExecHandler)return;e.commands.off("exec",this.$commandExecHandler),delete this.$commandExecHandler};var e=this.handleKeyboard;this.handleKeyboard=function(t,n,s,o){if((n===1||n===8)&&s==="v"||n===1&&s==="y")return null;var a,i=e.call(this,t,n,s,o);return i&&i.command?i:!!(n==-1&&(a=this.commands.extendSearchTerm,a))&&{command:a,args:s}}}.call(s.prototype),t.IncrementalSearchKeyboardHandler=s}),ace.define("ace/incremental_search",["require","exports","module","ace/lib/oop","ace/range","ace/search","ace/search_highlight","ace/commands/incremental_search_commands","ace/lib/dom","ace/commands/command_manager","ace/editor","ace/config"],function(e,t){"use strict";var a,u,h,p=e("./lib/oop"),i=e("./range").Range,g=e("./search").Search,f=e("./search_highlight").SearchHighlight,l=e("./commands/incremental_search_commands"),m=l.IncrementalSearchKeyboardHandler;function o(){this.$options={wrap:!1,skipCurrent:!1},this.$keyboardHandler=new m(this)}p.inherits(o,g);function s(e){return e instanceof RegExp}function r(e){var t=String(e),s=t.indexOf("/"),n=t.lastIndexOf("/");return{expression:t.slice(s+1,n),flags:t.slice(n+1)}}function c(e,t){try{return new RegExp(e,t)}catch{return e}}function d(e){return c(e.expression,e.flags)}(function(){this.activate=function(e,t){this.$editor=e,this.$startPos=this.$currentPos=e.getCursorPosition(),this.$options.needle="",this.$options.backwards=t,e.keyBinding.addKeyboardHandler(this.$keyboardHandler),this.$originalEditorOnPaste=e.onPaste,e.onPaste=this.onPaste.bind(this),this.$mousedownHandler=e.on("mousedown",this.onMouseDown.bind(this)),this.selectionFix(e),this.statusMessage(!0)},this.deactivate=function(e){this.cancelSearch(e);var t=this.$editor;t.keyBinding.removeKeyboardHandler(this.$keyboardHandler),this.$mousedownHandler&&(t.off("mousedown",this.$mousedownHandler),delete this.$mousedownHandler),t.onPaste=this.$originalEditorOnPaste,this.message("")},this.selectionFix=function(e){e.selection.isEmpty()&&!e.session.$emacsMark&&e.clearSelection()},this.highlight=function(e){var t=this.$editor.session,n=t.$isearchHighlight=t.$isearchHighlight||t.addDynamicMarker(new f(null,"ace_isearch-result","text"));n.setRegexp(e),t._emit("changeBackMarker")},this.cancelSearch=function(e){var t=this.$editor;return this.$prevNeedle=this.$options.needle,this.$options.needle="",e?(t.moveCursorToPosition(this.$startPos),this.$currentPos=this.$startPos):t.pushEmacsMark&&t.pushEmacsMark(this.$startPos,!1),this.highlight(null),i.fromPoints(this.$currentPos,this.$currentPos)},this.highlightAndFindWithNeedle=function(e,t){if(!this.$editor)return null;if(s=this.$options,t&&(s.needle=t.call(this,s.needle||"")||""),s.needle.length===0)return this.statusMessage(!0),this.cancelSearch(!0);s.start=this.$currentPos;var s,o=this.$editor.session,n=this.find(o),a=this.$editor.emacsMark?!!this.$editor.emacsMark():!this.$editor.selection.isEmpty();return n&&(s.backwards&&(n=i.fromPoints(n.end,n.start)),this.$editor.selection.setRange(i.fromPoints(a?this.$startPos:n.end,n.end)),e&&(this.$currentPos=n.end),this.highlight(s.re)),this.statusMessage(n),n},this.addString=function(e){return this.highlightAndFindWithNeedle(!1,function(t){if(!s(t))return t+e;var n=r(t);return n.expression+=e,d(n)})},this.removeChar=function(){return this.highlightAndFindWithNeedle(!1,function(e){if(!s(e))return e.substring(0,e.length-1);var t=r(e);return t.expression=t.expression.substring(0,t.expression.length-1),d(t)})},this.next=function(e){return e=e||{},this.$options.backwards=!!e.backwards,this.$currentPos=this.$editor.getCursorPosition(),this.highlightAndFindWithNeedle(!0,function(t){return e.useCurrentOrPrevSearch&&t.length===0?this.$prevNeedle||"":t})},this.onMouseDown=function(){return this.deactivate(),!0},this.onPaste=function(e){this.addString(e)},this.convertNeedleToRegExp=function(){return this.highlightAndFindWithNeedle(!1,function(e){return s(e)?e:c(e,"ig")})},this.convertNeedleToString=function(){return this.highlightAndFindWithNeedle(!1,function(e){return s(e)?r(e).expression:e})},this.statusMessage=function(e){var n=this.$options,t="";t+=n.backwards?"reverse-":"",t+="isearch: "+n.needle,t+=e?"":" (not found)",this.message(t)},this.message=function(e){this.$editor.showCommandLine&&(this.$editor.showCommandLine(e),this.$editor.focus())}}).call(o.prototype),t.IncrementalSearch=o,a=e("./lib/dom"),a.importCssString&&a.importCssString(".ace_marker-layer .ace_isearch-result {  position: absolute;  z-index: 6;  box-sizing: border-box;}div.ace_isearch-result {  border-radius: 4px;  background-color: rgba(255, 200, 0, 0.5);  box-shadow: 0 0 4px rgb(255, 200, 0);}.ace_dark div.ace_isearch-result {  background-color: rgb(100, 110, 160);  box-shadow: 0 0 4px rgb(80, 90, 140);}","incremental-search-highlighting"),u=e("./commands/command_manager"),function(){this.setupIncrementalSearch=function(e,t){if(this.usesIncrementalSearch==t)return;this.usesIncrementalSearch=t;var n=l.iSearchStartCommands,s=t?"addCommands":"removeCommands";this[s](n)}}.call(u.CommandManager.prototype),h=e("./editor").Editor,e("./config").defineOptions(h.prototype,"editor",{useIncrementalSearch:{set:function(e){this.keyBinding.$handlers.forEach(function(t){t.setupIncrementalSearch&&t.setupIncrementalSearch(this,e)}),this._emit("incrementalSearchSettingChanged",{isEnabled:e})}}})}),ace.define("ace/keyboard/emacs",["require","exports","module","ace/lib/dom","ace/incremental_search","ace/commands/incremental_search_commands","ace/keyboard/hash_handler","ace/lib/keys"],function(e,t){"use strict";var s,o,i,a,r,c,l,d,u,h,m,f=e("../lib/dom");e("../incremental_search"),d=e("../commands/incremental_search_commands"),u=e("./hash_handler").HashHandler,t.handler=new u,t.handler.isEmacs=!0,t.handler.$id="ace/keyboard/emacs",r=!1,t.handler.attach=function(e){r||(r=!0,f.importCssString("            .emacs-mode .ace_cursor{                border: 1px rgba(50,250,50,0.8) solid!important;                box-sizing: border-box!important;                background-color: rgba(0,250,0,0.9);                opacity: 0.5;            }            .emacs-mode .ace_hidden-cursors .ace_cursor{                opacity: 1;                background-color: transparent;            }            .emacs-mode .ace_overwrite-cursors .ace_cursor {                opacity: 1;                background-color: transparent;                border-width: 0 0 2px 2px !important;            }            .emacs-mode .ace_text-layer {                z-index: 4            }            .emacs-mode .ace_cursor-layer {                z-index: 2            }","emacsMode")),o=e.session.$selectLongWords,e.session.$selectLongWords=!0,i=e.session.$useEmacsStyleLineStart,e.session.$useEmacsStyleLineStart=!0,e.session.$emacsMark=null,e.session.$emacsMarkRing=e.session.$emacsMarkRing||[],e.emacsMark=function(){return this.session.$emacsMark},e.setEmacsMark=function(e){this.session.$emacsMark=e},e.pushEmacsMark=function(e,t){var n=this.session.$emacsMark;n&&this.session.$emacsMarkRing.push(n),!e||t?this.setEmacsMark(e):this.session.$emacsMarkRing.push(e)},e.popEmacsMark=function(){var e=this.emacsMark();return e?(this.setEmacsMark(null),e):this.session.$emacsMarkRing.pop()},e.getLastEmacsMark=function(){return this.session.$emacsMark||this.session.$emacsMarkRing.slice(-1)[0]},e.emacsMarkForSelection=function(e){var n=this.selection,o=this.multiSelect?this.multiSelect.getAllRanges().length:1,i=n.index||0,t=this.session.$emacsMarkRing,s=t.length-(o-i),a=t[s]||n.anchor;return e&&t.splice(s,1,"row"in e&&"column"in e?e:void 0),a},e.on("click",l),e.on("changeSession",c),e.renderer.$blockCursor=!0,e.setStyle("emacs-mode"),e.commands.addCommands(s),t.handler.platform=e.commands.platform,e.$emacsModeHandler=this,e.on("copy",this.onCopy),e.on("paste",this.onPaste)},t.handler.detach=function(e){e.renderer.$blockCursor=!1,e.session.$selectLongWords=o,e.session.$useEmacsStyleLineStart=i,e.off("click",l),e.off("changeSession",c),e.unsetStyle("emacs-mode"),e.commands.removeCommands(s),e.off("copy",this.onCopy),e.off("paste",this.onPaste),e.$emacsModeHandler=null},c=function(e){e.oldSession&&(e.oldSession.$selectLongWords=o,e.oldSession.$useEmacsStyleLineStart=i),o=e.session.$selectLongWords,e.session.$selectLongWords=!0,i=e.session.$useEmacsStyleLineStart,e.session.$useEmacsStyleLineStart=!0,e.session.hasOwnProperty("$emacsMark")||(e.session.$emacsMark=null),e.session.hasOwnProperty("$emacsMarkRing")||(e.session.$emacsMarkRing=[])},l=function(e){e.editor.session.$emacsMark=null},h=e("../lib/keys").KEY_MODS,a={C:"ctrl",S:"shift",M:"alt",CMD:"command"},m=["C-S-M-CMD","S-M-CMD","C-M-CMD","C-S-CMD","C-S-M","M-CMD","S-CMD","S-M","C-CMD","C-M","C-S","CMD","M","S","C"],m.forEach(function(e){var t=0;e.split("-").forEach(function(e){t=t|h[a[e]]}),a[t]=e.toLowerCase()+"-"}),t.handler.onCopy=function(e,n){if(n.$handlesEmacsOnCopy)return;n.$handlesEmacsOnCopy=!0,t.handler.commands.killRingSave.exec(n),n.$handlesEmacsOnCopy=!1},t.handler.onPaste=function(e,t){t.pushEmacsMark(t.getCursorPosition())},t.handler.bindKey=function(e,t){if(typeof e=="object"&&(e=e[this.platform]),!e)return;var n=this.commandKeyBinding;e.split("|").forEach(function(e){e=e.toLowerCase(),n[e]=t;var s=e.split(" ").slice(0,-1);s.reduce(function(e,t,n){var s=e[n-1]?e[n-1]+" ":"";return e.concat([s+t])},[]).forEach(function(e){n[e]||(n[e]="null")})},this)},t.handler.getStatusText=function(e,t){var n="";return t.count&&(n+=t.count),t.keyChain&&(n+=" "+t.keyChain),n},t.handler.handleKeyboard=function(e,t,n,s){if(s===-1)return void 0;var o,i,c,l,d,r=e.editor;if(r._signal("changeStatus"),t==-1&&(r.pushEmacsMark(),e.count))return d=new Array(e.count+1).join(n),e.count=null,{command:"insertstring",args:d};if(l=a[t],(l=="c-"||e.count)&&(c=parseInt(n[n.length-1]),typeof c=="number"&&!isNaN(c)))return e.count=Math.max(e.count,0)||0,e.count=10*e.count+c,{command:"null"};if(l&&(n=l+n),e.keyChain&&(n=e.keyChain+=" "+n),o=this.commandKeyBinding[n],e.keyChain=o=="null"?n:"",!o)return void 0;if(o==="null")return{command:"null"};if(o==="universalArgument")return e.count=-4,{command:"null"};if(typeof o!="string"&&(i=o.args,o.command&&(o=o.command),o==="goorselect"&&(o=r.emacsMark()?i[1]:i[0],i=null)),typeof o=="string"&&((o==="insertstring"||o==="splitline"||o==="togglecomment")&&r.pushEmacsMark(),o=this.commands[o]||r.commands.commands[o],!o))return void 0;if(!o.readOnly&&!o.isYank&&(e.lastCommand=null),!o.readOnly&&r.emacsMark()&&r.setEmacsMark(null),e.count){if(c=e.count,e.count=0,!o||!o.handlesCount)return{args:i,command:{exec:function(e,t){for(var n=0;n<c;n++)o.exec(e,t)},multiSelectAction:o.multiSelectAction}};i||(i={}),typeof i=="object"&&(i.count=c)}return{command:o,args:i}},t.emacsKeys={"Up|C-p":{command:"goorselect",args:["golineup","selectup"]},"Down|C-n":{command:"goorselect",args:["golinedown","selectdown"]},"Left|C-b":{command:"goorselect",args:["gotoleft","selectleft"]},"Right|C-f":{command:"goorselect",args:["gotoright","selectright"]},"C-Left|M-b":{command:"goorselect",args:["gotowordleft","selectwordleft"]},"C-Right|M-f":{command:"goorselect",args:["gotowordright","selectwordright"]},"Home|C-a":{command:"goorselect",args:["gotolinestart","selecttolinestart"]},"End|C-e":{command:"goorselect",args:["gotolineend","selecttolineend"]},"C-Home|S-M-,":{command:"goorselect",args:["gotostart","selecttostart"]},"C-End|S-M-.":{command:"goorselect",args:["gotoend","selecttoend"]},"S-Up|S-C-p":"selectup","S-Down|S-C-n":"selectdown","S-Left|S-C-b":"selectleft","S-Right|S-C-f":"selectright","S-C-Left|S-M-b":"selectwordleft","S-C-Right|S-M-f":"selectwordright","S-Home|S-C-a":"selecttolinestart","S-End|S-C-e":"selecttolineend","S-C-Home":"selecttostart","S-C-End":"selecttoend","C-l":"recenterTopBottom","M-s":"centerselection","M-g":"gotoline","C-x C-p":"selectall","C-Down":{command:"goorselect",args:["gotopagedown","selectpagedown"]},"C-Up":{command:"goorselect",args:["gotopageup","selectpageup"]},"PageDown|C-v":{command:"goorselect",args:["gotopagedown","selectpagedown"]},"PageUp|M-v":{command:"goorselect",args:["gotopageup","selectpageup"]},"S-C-Down":"selectpagedown","S-C-Up":"selectpageup","C-s":"iSearch","C-r":"iSearchBackwards","M-C-s":"findnext","M-C-r":"findprevious","S-M-5":"replace",Backspace:"backspace","Delete|C-d":"del","Return|C-m":{command:"insertstring",args:`
`},"C-o":"splitline","M-d|C-Delete":{command:"killWord",args:"right"},"C-Backspace|M-Backspace|M-Delete":{command:"killWord",args:"left"},"C-k":"killLine","C-y|S-Delete":"yank","M-y":"yankRotate","C-g":"keyboardQuit","C-w|C-S-W":"killRegion","M-w":"killRingSave","C-Space":"setMark","C-x C-x":"exchangePointAndMark","C-t":"transposeletters","M-u":"touppercase","M-l":"tolowercase","M-/":"autocomplete","C-u":"universalArgument","M-;":"togglecomment","C-/|C-x u|S-C--|C-z":"undo","S-C-/|S-C-x u|C--|S-C-z":"redo","C-x r":"selectRectangularRegion","M-x":{command:"focusCommandLine",args:"M-x "}},t.handler.bindKeys(t.emacsKeys),t.handler.addCommands({recenterTopBottom:function(e){var s=e.renderer,n=s.$cursorLayer.getPixelPosition(),o=s.$size.scrollerHeight-s.lineHeight,t=s.scrollTop;Math.abs(n.top-t)<2?t=n.top-o:Math.abs(n.top-t-o*.5)<2?t=n.top:t=n.top-o*.5,e.session.setScrollTop(t)},selectRectangularRegion:function(e){e.multiSelect.toggleBlockSelection()},setMark:{exec:function(e,t){if(t&&t.count){e.inMultiSelectMode?e.forEachSelection(o):o(),o();return}var n=e.emacsMark(),i=e.selection.getAllRanges(),s=i.map(function(e){return{row:e.start.row,column:e.start.column}}),a=!0,r=i.every(function(e){return e.isEmpty()});if(a&&(n||!r)){e.inMultiSelectMode?e.forEachSelection({exec:e.clearSelection.bind(e)}):e.clearSelection(),n&&e.pushEmacsMark(null);return}if(!n){s.forEach(function(t){e.pushEmacsMark(t)}),e.setEmacsMark(s[s.length-1]);return}function o(){var t=e.popEmacsMark();t&&e.moveCursorToPosition(t)}},readOnly:!0,handlesCount:!0},exchangePointAndMark:{exec:function(t,n){var o,s=t.selection;if(!n.count&&!s.isEmpty()){s.setSelectionRange(s.getRange(),!s.isBackwards());return}n.count?(o={row:s.lead.row,column:s.lead.column},s.clearSelection(),s.moveCursorToPosition(t.emacsMarkForSelection(o))):s.selectToPosition(t.emacsMarkForSelection())},readOnly:!0,handlesCount:!0,multiSelectAction:"forEach"},killWord:{exec:function(e,n){e.clearSelection(),n=="left"?e.selection.selectWordLeft():e.selection.selectWordRight();var s=e.getSelectionRange(),o=e.session.getTextRange(s);t.killRing.add(o),e.session.remove(s),e.clearSelection()},multiSelectAction:"forEach"},killLine:function(e){e.pushEmacsMark(null),e.clearSelection();var o,i,n=e.getSelectionRange(),s=e.session.getLine(n.start.row);n.end.column=s.length,s=s.substr(n.start.column),o=e.session.getFoldLine(n.start.row),o&&n.end.row!=o.end.row&&(n.end.row=o.end.row,s="x"),/^\s*$/.test(s)&&(n.end.row++,s=e.session.getLine(n.end.row),n.end.column=/^\s*$/.test(s)?s.length:0),i=e.session.getTextRange(n),e.prevOp.command==this?t.killRing.append(i):t.killRing.add(i),e.session.remove(n),e.clearSelection()},yank:function(e){e.onPaste(t.killRing.get()||""),e.keyBinding.$data.lastCommand="yank"},yankRotate:function(e){if(e.keyBinding.$data.lastCommand!="yank")return;e.undo(),e.session.$emacsMarkRing.pop(),e.onPaste(t.killRing.rotate()),e.keyBinding.$data.lastCommand="yank"},killRegion:{exec:function(e){t.killRing.add(e.getCopyText()),e.commands.byName.cut.exec(e),e.setEmacsMark(null)},readOnly:!0,multiSelectAction:"forEach"},killRingSave:{exec:function(e){e.$handlesEmacsOnCopy=!0;var s=e.session.$emacsMarkRing.slice(),n=[];t.killRing.add(e.getCopyText()),setTimeout(function(){function t(){var t=e.selection,s=t.getRange(),o=t.isBackwards()?s.end:s.start;n.push({row:o.row,column:o.column}),t.clearSelection()}e.$handlesEmacsOnCopy=!1,e.inMultiSelectMode?e.forEachSelection({exec:t}):t(),e.setEmacsMark(null),e.session.$emacsMarkRing=s.concat(n.reverse())},0)},readOnly:!0},keyboardQuit:function(e){e.selection.clearSelection(),e.setEmacsMark(null),e.keyBinding.$data.count=null},focusCommandLine:function(e,t){e.showCommandLine&&e.showCommandLine(t)}}),t.handler.addCommands(d.iSearchStartCommands),s=t.handler.commands,s.yank.isYank=!0,s.yankRotate.isYank=!0,t.killRing={$data:[],add:function(e){e&&this.$data.push(e),this.$data.length>30&&this.$data.shift()},append:function(e){var n=this.$data.length-1,t=this.$data[n]||"";e&&(t+=e),t&&(this.$data[n]=t)},get:function(e){return e=e||1,this.$data.slice(this.$data.length-e,this.$data.length).reverse().join(`
`)},pop:function(){return this.$data.length>1&&this.$data.pop(),this.get()},rotate:function(){return this.$data.unshift(this.$data.pop()),this.get()}}}),function(){ace.require(["ace/keyboard/emacs"],function(e){typeof module=="object"&&typeof exports=="object"&&module&&(module.exports=e)})}()