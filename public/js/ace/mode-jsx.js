ace.define("ace/mode/doc_comment_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(e,t){"use strict";var o=e("../lib/oop"),i=e("./text_highlight_rules").TextHighlightRules,s=function(){this.$rules={start:[{token:"comment.doc.tag",regex:"@[\\w\\d_]+"},s.getTagRule(),{defaultToken:"comment.doc",caseInsensitive:!0}]}};o.inherits(s,i),s.getTagRule=function(){return{token:"comment.doc.tag.storage.type",regex:"\\b(?:TODO|FIXME|XXX|HACK)\\b"}},s.getStartRule=function(e){return{token:"comment.doc",regex:"\\/\\*(?=\\*)",next:e}},s.getEndRule=function(e){return{token:"comment.doc",regex:"\\*\\/",next:e}},t.DocCommentHighlightRules=s}),ace.define("ace/mode/jsx_highlight_rules",["require","exports","module","ace/lib/oop","ace/lib/lang","ace/mode/doc_comment_highlight_rules","ace/mode/text_highlight_rules"],function(e,t){var a=e("../lib/oop"),s=e("../lib/lang"),o=e("./doc_comment_highlight_rules").DocCommentHighlightRules,r=e("./text_highlight_rules").TextHighlightRules,i=function(){var t=s.arrayToMap(("break|do|instanceof|typeof|case|else|new|var|catch|finally|return|void|continue|for|switch|default|while|function|this|if|throw|delete|in|try|class|extends|super|import|from|into|implements|interface|static|mixin|override|abstract|final|number|int|string|boolean|variant|log|assert").split("|")),n=s.arrayToMap("null|true|false|NaN|Infinity|__FILE__|__LINE__|undefined".split("|")),i=s.arrayToMap(("debugger|with|const|export|let|private|public|yield|protected|extern|native|as|operator|__fake__|__readonly__").split("|")),e="[a-zA-Z_][a-zA-Z0-9_]*\\b";this.$rules={start:[{token:"comment",regex:"\\/\\/.*$"},o.getStartRule("doc-start"),{token:"comment",regex:"\\/\\*",next:"comment"},{token:"string.regexp",regex:"[/](?:(?:\\[(?:\\\\]|[^\\]])+\\])|(?:\\\\/|[^\\]/]))*[/]\\w*\\s*(?=[).,;]|$)"},{token:"string",regex:'["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]'},{token:"string",regex:"['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"},{token:"constant.numeric",regex:"0[xX][0-9a-fA-F]+\\b"},{token:"constant.numeric",regex:"[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"},{token:"constant.language.boolean",regex:"(?:true|false)\\b"},{token:["storage.type","text","entity.name.function"],regex:"(function)(\\s+)("+e+")"},{token:function(e){return e=="this"?"variable.language":e=="function"?"storage.type":t.hasOwnProperty(e)||i.hasOwnProperty(e)?"keyword":n.hasOwnProperty(e)?"constant.language":/^_?[A-Z][a-zA-Z0-9_]*$/.test(e)?"language.support.class":"identifier"},regex:e},{token:"keyword.operator",regex:"!|%|&|\\*|\\-\\-|\\-|\\+\\+|\\+|~|==|=|!=|<=|>=|<<=|>>=|>>>=|<>|<|>|!|&&|\\|\\||\\?\\:|\\*=|%=|\\+=|\\-=|&=|\\^=|\\b(?:in|instanceof|new|delete|typeof|void)"},{token:"punctuation.operator",regex:"\\?|\\:|\\,|\\;|\\."},{token:"paren.lparen",regex:"[[({<]"},{token:"paren.rparen",regex:"[\\])}>]"},{token:"text",regex:"\\s+"}],comment:[{token:"comment",regex:"\\*\\/",next:"start"},{defaultToken:"comment"}]},this.embedRules(o,"doc-",[o.getEndRule("start")])};a.inherits(i,r),t.JsxHighlightRules=i}),ace.define("ace/mode/matching_brace_outdent",["require","exports","module","ace/range"],function(e,t){"use strict";var o=e("../range").Range,s=function(){};(function(){this.checkOutdent=function(e,t){return!!/^\s+$/.test(e)&&/^\s*\}/.test(t)},this.autoOutdent=function(e,t){var n,s,a,r=e.getLine(t),i=r.match(/^(\s*\})/);if(!i)return 0;if(s=i[1].length,n=e.findMatchingBracket({row:t,column:s}),!n||n.row==t)return 0;a=this.$getIndent(e.getLine(n.row)),e.replace(new o(t,0,t,s-1),a)},this.$getIndent=function(e){return e.match(/^\s*/)[0]}}).call(s.prototype),t.MatchingBraceOutdent=s}),ace.define("ace/mode/folding/cstyle",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],function(e,t){"use strict";var i=e("../../lib/oop"),s=e("../../range").Range,a=e("./fold_mode").FoldMode,o=t.FoldMode=function(e){e&&(this.foldingStartMarker=new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/,"|"+e.start)),this.foldingStopMarker=new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/,"|"+e.end)))};i.inherits(o,a),function(){this.foldingStartMarker=/([{[(])[^}\])]*$|^\s*(\/\*)/,this.foldingStopMarker=/^[^[{(]*([}\])])|^[\s*]*(\*\/)/,this.singleLineBlockCommentRe=/^\s*(\/\*).*\*\/\s*$/,this.tripleStarBlockCommentRe=/^\s*(\/\*\*\*).*\*\/\s*$/,this.startRegionRe=/^\s*(\/\*|\/\/)#?region\b/,this._getFoldWidgetBase=this.getFoldWidget,this.getFoldWidget=function(e,t,n){var o,s=e.getLine(n);return this.singleLineBlockCommentRe.test(s)&&!this.startRegionRe.test(s)&&!this.tripleStarBlockCommentRe.test(s)?"":(o=this._getFoldWidgetBase(e,t,n),!o&&this.startRegionRe.test(s)?"start":o)},this.getFoldWidgetRange=function(e,t,n,s){var o,i,a,r=e.getLine(n);if(this.startRegionRe.test(r))return this.getCommentRegionBlock(e,r,n);if(o=r.match(this.foldingStartMarker),o)return i=o.index,o[1]?this.openingBracketBlock(e,o[1],n,i):(a=e.getCommentFoldRange(n,i+o[0].length,1),a&&!a.isMultiLine()&&(s?a=this.getSectionRange(e,n):t!="all"&&(a=null)),a);if(t==="markbegin")return;if(o=r.match(this.foldingStopMarker),o)return i=o.index+o[0].length,o[1]?this.closingBracketBlock(e,o[1],n,i):e.getCommentFoldRange(n,i,-1)},this.getSectionRange=function(e,t){var n,i,a,l,o=e.getLine(t),r=o.search(/\S/),c=t,d=o.length;for(t=t+1,i=t,l=e.getLength();++t<l;){if(o=e.getLine(t),a=o.search(/\S/),a===-1)continue;if(r>a)break;if(n=this.getFoldWidgetRange(e,"all",t),n){if(n.start.row<=c)break;if(n.isMultiLine())t=n.end.row;else if(r==a)break}i=t}return new s(c,d,i,e.getLine(i).length)},this.getCommentRegionBlock=function(e,t,n){for(var i,a,c=t.search(/\s*$/),l=e.getLength(),r=n,d=/^\s*(?:\/\*|\/\/|--)#?(end)?region\b/,o=1;++n<l;){if(t=e.getLine(n),i=d.exec(t),!i)continue;if(i[1]?o--:o++,!o)break}if(a=n,a>r)return new s(r,c,a,t.length)}}.call(o.prototype)}),ace.define("ace/mode/jsx",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/jsx_highlight_rules","ace/mode/matching_brace_outdent","ace/mode/behaviour/cstyle","ace/mode/folding/cstyle"],function(e,t){"use strict";var o=e("../lib/oop"),i=e("./text").Mode,a=e("./jsx_highlight_rules").JsxHighlightRules,r=e("./matching_brace_outdent").MatchingBraceOutdent,c=e("./behaviour/cstyle").CstyleBehaviour,l=e("./folding/cstyle").FoldMode;function s(){this.HighlightRules=a,this.$outdent=new r,this.$behaviour=new c,this.foldingRules=new l}o.inherits(s,i),function(){this.lineCommentStart="//",this.blockComment={start:"/*",end:"*/"},this.getNextLineIndent=function(e,t,n){var i,s=this.$getIndent(t),a=this.getTokenizer().getLineTokens(t,e),o=a.tokens;return o.length&&o[o.length-1].type=="comment"?s:(e=="start"&&(i=t.match(/^.*[{([]\s*$/),i&&(s+=n)),s)},this.checkOutdent=function(e,t,n){return this.$outdent.checkOutdent(t,n)},this.autoOutdent=function(e,t,n){this.$outdent.autoOutdent(t,n)},this.$id="ace/mode/jsx"}.call(s.prototype),t.Mode=s}),function(){ace.require(["ace/mode/jsx"],function(e){typeof module=="object"&&typeof exports=="object"&&module&&(module.exports=e)})}()