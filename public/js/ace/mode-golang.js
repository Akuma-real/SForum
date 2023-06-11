ace.define("ace/mode/doc_comment_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(e,t){"use strict";var o=e("../lib/oop"),i=e("./text_highlight_rules").TextHighlightRules,s=function(){this.$rules={start:[{token:"comment.doc.tag",regex:"@[\\w\\d_]+"},s.getTagRule(),{defaultToken:"comment.doc",caseInsensitive:!0}]}};o.inherits(s,i),s.getTagRule=function(){return{token:"comment.doc.tag.storage.type",regex:"\\b(?:TODO|FIXME|XXX|HACK)\\b"}},s.getStartRule=function(e){return{token:"comment.doc",regex:"\\/\\*(?=\\*)",next:e}},s.getEndRule=function(e){return{token:"comment.doc",regex:"\\*\\/",next:e}},t.DocCommentHighlightRules=s}),ace.define("ace/mode/golang_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/doc_comment_highlight_rules","ace/mode/text_highlight_rules"],function(e,t){var i=e("../lib/oop"),s=e("./doc_comment_highlight_rules").DocCommentHighlightRules,a=e("./text_highlight_rules").TextHighlightRules,o=function(){var t="else|break|case|return|goto|if|const|select|continue|struct|default|switch|for|range|func|import|package|chan|defer|fallthrough|go|interface|map|range|select|type|var",n="string|uint8|uint16|uint32|uint64|int8|int16|int32|int64|float32|float64|complex64|complex128|byte|rune|uint|int|uintptr|bool|error",o="new|close|cap|copy|panic|panicln|print|println|len|make|delete|real|recover|imag|append",i="nil|true|false|iota",e=this.createKeywordMapper({keyword:t,"constant.language":i,"support.function":o,"support.type":n},""),a=`\\\\(?:[0-7]{3}|x\\h{2}|u{4}|U\\h{6}|[abfnrtv'"\\\\])`.replace(/\\h/g,"[a-fA-F\\d]");this.$rules={start:[{token:"comment",regex:"\\/\\/.*$"},s.getStartRule("doc-start"),{token:"comment.start",regex:"\\/\\*",next:"comment"},{token:"string",regex:/"(?:[^"\\]|\\.)*?"/},{token:"string",regex:"`",next:"bqstring"},{token:"constant.numeric",regex:"'(?:[^\\'\uD800-\uDBFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|"+a.replace('"',"")+")'"},{token:"constant.numeric",regex:"0[xX][0-9a-fA-F]+\\b"},{token:"constant.numeric",regex:"[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"},{token:["keyword","text","entity.name.function"],regex:"(func)(\\s+)([a-zA-Z_$][a-zA-Z0-9_$]*)\\b"},{token:function(t){return t[t.length-1]=="("?[{type:e(t.slice(0,-1))||"support.function",value:t.slice(0,-1)},{type:"paren.lparen",value:t.slice(-1)}]:e(t)||"identifier"},regex:"[a-zA-Z_$][a-zA-Z0-9_$]*\\b\\(?"},{token:"keyword.operator",regex:"!|\\$|%|&|\\*|\\-\\-|\\-|\\+\\+|\\+|~|==|=|!=|<=|>=|<<=|>>=|>>>=|<>|<|>|!|&&|\\|\\||\\?\\:|\\*=|%=|\\+=|\\-=|&=|\\^="},{token:"punctuation.operator",regex:"\\?|\\:|\\,|\\;|\\."},{token:"paren.lparen",regex:"[[({]"},{token:"paren.rparen",regex:"[\\])}]"},{token:"text",regex:"\\s+"}],comment:[{token:"comment.end",regex:"\\*\\/",next:"start"},{defaultToken:"comment"}],bqstring:[{token:"string",regex:"`",next:"start"},{defaultToken:"string"}]},this.embedRules(s,"doc-",[s.getEndRule("start")])};i.inherits(o,a),t.GolangHighlightRules=o}),ace.define("ace/mode/matching_brace_outdent",["require","exports","module","ace/range"],function(e,t){"use strict";var o=e("../range").Range,s=function(){};(function(){this.checkOutdent=function(e,t){return!!/^\s+$/.test(e)&&/^\s*\}/.test(t)},this.autoOutdent=function(e,t){var n,s,a,r=e.getLine(t),i=r.match(/^(\s*\})/);if(!i)return 0;if(s=i[1].length,n=e.findMatchingBracket({row:t,column:s}),!n||n.row==t)return 0;a=this.$getIndent(e.getLine(n.row)),e.replace(new o(t,0,t,s-1),a)},this.$getIndent=function(e){return e.match(/^\s*/)[0]}}).call(s.prototype),t.MatchingBraceOutdent=s}),ace.define("ace/mode/folding/cstyle",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],function(e,t){"use strict";var i=e("../../lib/oop"),s=e("../../range").Range,a=e("./fold_mode").FoldMode,o=t.FoldMode=function(e){e&&(this.foldingStartMarker=new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/,"|"+e.start)),this.foldingStopMarker=new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/,"|"+e.end)))};i.inherits(o,a),function(){this.foldingStartMarker=/([{[(])[^}\])]*$|^\s*(\/\*)/,this.foldingStopMarker=/^[^[{(]*([}\])])|^[\s*]*(\*\/)/,this.singleLineBlockCommentRe=/^\s*(\/\*).*\*\/\s*$/,this.tripleStarBlockCommentRe=/^\s*(\/\*\*\*).*\*\/\s*$/,this.startRegionRe=/^\s*(\/\*|\/\/)#?region\b/,this._getFoldWidgetBase=this.getFoldWidget,this.getFoldWidget=function(e,t,n){var o,s=e.getLine(n);return this.singleLineBlockCommentRe.test(s)&&!this.startRegionRe.test(s)&&!this.tripleStarBlockCommentRe.test(s)?"":(o=this._getFoldWidgetBase(e,t,n),!o&&this.startRegionRe.test(s)?"start":o)},this.getFoldWidgetRange=function(e,t,n,s){var o,i,a,r=e.getLine(n);if(this.startRegionRe.test(r))return this.getCommentRegionBlock(e,r,n);if(o=r.match(this.foldingStartMarker),o)return i=o.index,o[1]?this.openingBracketBlock(e,o[1],n,i):(a=e.getCommentFoldRange(n,i+o[0].length,1),a&&!a.isMultiLine()&&(s?a=this.getSectionRange(e,n):t!="all"&&(a=null)),a);if(t==="markbegin")return;if(o=r.match(this.foldingStopMarker),o)return i=o.index+o[0].length,o[1]?this.closingBracketBlock(e,o[1],n,i):e.getCommentFoldRange(n,i,-1)},this.getSectionRange=function(e,t){var n,i,a,l,o=e.getLine(t),r=o.search(/\S/),c=t,d=o.length;for(t=t+1,i=t,l=e.getLength();++t<l;){if(o=e.getLine(t),a=o.search(/\S/),a===-1)continue;if(r>a)break;if(n=this.getFoldWidgetRange(e,"all",t),n){if(n.start.row<=c)break;if(n.isMultiLine())t=n.end.row;else if(r==a)break}i=t}return new s(c,d,i,e.getLine(i).length)},this.getCommentRegionBlock=function(e,t,n){for(var i,a,c=t.search(/\s*$/),l=e.getLength(),r=n,d=/^\s*(?:\/\*|\/\/|--)#?(end)?region\b/,o=1;++n<l;){if(t=e.getLine(n),i=d.exec(t),!i)continue;if(i[1]?o--:o++,!o)break}if(a=n,a>r)return new s(r,c,a,t.length)}}.call(o.prototype)}),ace.define("ace/mode/golang",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/golang_highlight_rules","ace/mode/matching_brace_outdent","ace/mode/behaviour/cstyle","ace/mode/folding/cstyle"],function(e,t){var o=e("../lib/oop"),i=e("./text").Mode,a=e("./golang_highlight_rules").GolangHighlightRules,r=e("./matching_brace_outdent").MatchingBraceOutdent,c=e("./behaviour/cstyle").CstyleBehaviour,l=e("./folding/cstyle").FoldMode,s=function(){this.HighlightRules=a,this.$outdent=new r,this.foldingRules=new l,this.$behaviour=new c};o.inherits(s,i),function(){this.lineCommentStart="//",this.blockComment={start:"/*",end:"*/"},this.getNextLineIndent=function(e,t,n){var a,s=this.$getIndent(t),i=this.getTokenizer().getLineTokens(t,e),o=i.tokens,r=i.state;return o.length&&o[o.length-1].type=="comment"?s:(e=="start"&&(a=t.match(/^.*[{([]\s*$/),a&&(s+=n)),s)},this.checkOutdent=function(e,t,n){return this.$outdent.checkOutdent(t,n)},this.autoOutdent=function(e,t,n){this.$outdent.autoOutdent(t,n)},this.$id="ace/mode/golang"}.call(s.prototype),t.Mode=s}),function(){ace.require(["ace/mode/golang"],function(e){typeof module=="object"&&typeof exports=="object"&&module&&(module.exports=e)})}()