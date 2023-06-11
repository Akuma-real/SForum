ace.define("ace/mode/jack_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(e,t){"use strict";var o=e("../lib/oop"),i=e("./text_highlight_rules").TextHighlightRules,s=function(){this.$rules={start:[{token:"string",regex:'"',next:"string2"},{token:"string",regex:"'",next:"string1"},{token:"constant.numeric",regex:"-?0[xX][0-9a-fA-F]+\\b"},{token:"constant.numeric",regex:"(?:0|[-+]?[1-9][0-9]*)\\b"},{token:"constant.binary",regex:"<[0-9A-Fa-f][0-9A-Fa-f](\\s+[0-9A-Fa-f][0-9A-Fa-f])*>"},{token:"constant.language.boolean",regex:"(?:true|false)\\b"},{token:"constant.language.null",regex:"null\\b"},{token:"storage.type",regex:"(?:Integer|Boolean|Null|String|Buffer|Tuple|List|Object|Function|Coroutine|Form)\\b"},{token:"keyword",regex:"(?:return|abort|vars|for|delete|in|is|escape|exec|split|and|if|elif|else|while)\\b"},{token:"language.builtin",regex:"(?:lines|source|parse|read-stream|interval|substr|parseint|write|print|range|rand|inspect|bind|i-values|i-pairs|i-map|i-filter|i-chunk|i-all\\?|i-any\\?|i-collect|i-zip|i-merge|i-each)\\b"},{token:"comment",regex:"--.*$"},{token:"paren.lparen",regex:"[[({]"},{token:"paren.rparen",regex:"[\\])}]"},{token:"storage.form",regex:"@[a-z]+"},{token:"constant.other.symbol",regex:":+[a-zA-Z_]([-]?[a-zA-Z0-9_])*[?!]?"},{token:"variable",regex:"[a-zA-Z_]([-]?[a-zA-Z0-9_])*[?!]?"},{token:"keyword.operator",regex:"\\|\\||\\^\\^|&&|!=|==|<=|<|>=|>|\\+|-|\\*|\\/|\\^|\\%|\\#|\\!"},{token:"text",regex:"\\s+"}],string1:[{token:"constant.language.escape",regex:/\\(?:x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|['"\\/bfnrt])/},{token:"string",regex:"[^'\\\\]+"},{token:"string",regex:"'",next:"start"},{token:"string",regex:"",next:"start"}],string2:[{token:"constant.language.escape",regex:/\\(?:x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|['"\\/bfnrt])/},{token:"string",regex:'[^"\\\\]+'},{token:"string",regex:'"',next:"start"},{token:"string",regex:"",next:"start"}]}};o.inherits(s,i),t.JackHighlightRules=s}),ace.define("ace/mode/matching_brace_outdent",["require","exports","module","ace/range"],function(e,t){"use strict";var o=e("../range").Range,s=function(){};(function(){this.checkOutdent=function(e,t){return!!/^\s+$/.test(e)&&/^\s*\}/.test(t)},this.autoOutdent=function(e,t){var n,s,a,r=e.getLine(t),i=r.match(/^(\s*\})/);if(!i)return 0;if(s=i[1].length,n=e.findMatchingBracket({row:t,column:s}),!n||n.row==t)return 0;a=this.$getIndent(e.getLine(n.row)),e.replace(new o(t,0,t,s-1),a)},this.$getIndent=function(e){return e.match(/^\s*/)[0]}}).call(s.prototype),t.MatchingBraceOutdent=s}),ace.define("ace/mode/folding/cstyle",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],function(e,t){"use strict";var i=e("../../lib/oop"),s=e("../../range").Range,a=e("./fold_mode").FoldMode,o=t.FoldMode=function(e){e&&(this.foldingStartMarker=new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/,"|"+e.start)),this.foldingStopMarker=new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/,"|"+e.end)))};i.inherits(o,a),function(){this.foldingStartMarker=/([{[(])[^}\])]*$|^\s*(\/\*)/,this.foldingStopMarker=/^[^[{(]*([}\])])|^[\s*]*(\*\/)/,this.singleLineBlockCommentRe=/^\s*(\/\*).*\*\/\s*$/,this.tripleStarBlockCommentRe=/^\s*(\/\*\*\*).*\*\/\s*$/,this.startRegionRe=/^\s*(\/\*|\/\/)#?region\b/,this._getFoldWidgetBase=this.getFoldWidget,this.getFoldWidget=function(e,t,n){var o,s=e.getLine(n);return this.singleLineBlockCommentRe.test(s)&&!this.startRegionRe.test(s)&&!this.tripleStarBlockCommentRe.test(s)?"":(o=this._getFoldWidgetBase(e,t,n),!o&&this.startRegionRe.test(s)?"start":o)},this.getFoldWidgetRange=function(e,t,n,s){var o,i,a,r=e.getLine(n);if(this.startRegionRe.test(r))return this.getCommentRegionBlock(e,r,n);if(o=r.match(this.foldingStartMarker),o)return i=o.index,o[1]?this.openingBracketBlock(e,o[1],n,i):(a=e.getCommentFoldRange(n,i+o[0].length,1),a&&!a.isMultiLine()&&(s?a=this.getSectionRange(e,n):t!="all"&&(a=null)),a);if(t==="markbegin")return;if(o=r.match(this.foldingStopMarker),o)return i=o.index+o[0].length,o[1]?this.closingBracketBlock(e,o[1],n,i):e.getCommentFoldRange(n,i,-1)},this.getSectionRange=function(e,t){var n,i,a,l,o=e.getLine(t),r=o.search(/\S/),c=t,d=o.length;for(t=t+1,i=t,l=e.getLength();++t<l;){if(o=e.getLine(t),a=o.search(/\S/),a===-1)continue;if(r>a)break;if(n=this.getFoldWidgetRange(e,"all",t),n){if(n.start.row<=c)break;if(n.isMultiLine())t=n.end.row;else if(r==a)break}i=t}return new s(c,d,i,e.getLine(i).length)},this.getCommentRegionBlock=function(e,t,n){for(var i,a,c=t.search(/\s*$/),l=e.getLength(),r=n,d=/^\s*(?:\/\*|\/\/|--)#?(end)?region\b/,o=1;++n<l;){if(t=e.getLine(n),i=d.exec(t),!i)continue;if(i[1]?o--:o++,!o)break}if(a=n,a>r)return new s(r,c,a,t.length)}}.call(o.prototype)}),ace.define("ace/mode/jack",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/jack_highlight_rules","ace/mode/matching_brace_outdent","ace/mode/behaviour/cstyle","ace/mode/folding/cstyle"],function(e,t){"use strict";var o=e("../lib/oop"),i=e("./text").Mode,a=e("./jack_highlight_rules").JackHighlightRules,r=e("./matching_brace_outdent").MatchingBraceOutdent,c=e("./behaviour/cstyle").CstyleBehaviour,l=e("./folding/cstyle").FoldMode,s=function(){this.HighlightRules=a,this.$outdent=new r,this.$behaviour=new c,this.foldingRules=new l};o.inherits(s,i),function(){this.lineCommentStart="--",this.getNextLineIndent=function(e,t,n){var o,s=this.$getIndent(t);return e=="start"&&(o=t.match(/^.*[{([]\s*$/),o&&(s+=n)),s},this.checkOutdent=function(e,t,n){return this.$outdent.checkOutdent(t,n)},this.autoOutdent=function(e,t,n){this.$outdent.autoOutdent(t,n)},this.$id="ace/mode/jack"}.call(s.prototype),t.Mode=s}),function(){ace.require(["ace/mode/jack"],function(e){typeof module=="object"&&typeof exports=="object"&&module&&(module.exports=e)})}()