ace.define("ace/mode/fsharp_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(e,t){"use strict";var o=e("../lib/oop"),i=e("./text_highlight_rules").TextHighlightRules,s=function(){var t=this.createKeywordMapper({variable:"this",keyword:"abstract|assert|base|begin|class|default|delegate|done|downcast|downto|elif|else|exception|extern|false|finally|function|global|inherit|inline|interface|internal|lazy|match|member|module|mutable|namespace|open|or|override|private|public|rec|return|return!|select|static|struct|then|to|true|try|typeof|upcast|use|use!|val|void|when|while|with|yield|yield!|__SOURCE_DIRECTORY__|as|asr|land|lor|lsl|lsr|lxor|mod|sig|atomic|break|checked|component|const|constraint|constructor|continue|eager|event|external|fixed|functor|include|method|mixin|object|parallel|process|protected|pure|sealed|tailcall|trait|virtual|volatile|and|do|end|for|fun|if|in|let|let!|new|not|null|of|endif",constant:"true|false"},"identifier"),e="(?:(?:(?:(?:(?:(?:\\d+)?(?:\\.\\d+))|(?:(?:\\d+)\\.))|(?:\\d+))(?:[eE][+-]?\\d+))|(?:(?:(?:\\d+)?(?:\\.\\d+))|(?:(?:\\d+)\\.)))";this.$rules={start:[{token:"variable.classes",regex:"\\[\\<[.]*\\>\\]"},{token:"comment",regex:"//.*$"},{token:"comment.start",regex:/\(\*(?!\))/,push:"blockComment"},{token:"string",regex:"'.'"},{token:"string",regex:'"""',next:[{token:"constant.language.escape",regex:/\\./,next:"qqstring"},{token:"string",regex:'"""',next:"start"},{defaultToken:"string"}]},{token:"string",regex:'"',next:[{token:"constant.language.escape",regex:/\\./,next:"qqstring"},{token:"string",regex:'"',next:"start"},{defaultToken:"string"}]},{token:["verbatim.string","string"],regex:'(@?)(")',stateName:"qqstring",next:[{token:"constant.language.escape",regex:'""'},{token:"string",regex:'"',next:"start"},{defaultToken:"string"}]},{token:"constant.float",regex:"(?:"+e+"|\\d+)[jJ]\\b"},{token:"constant.float",regex:e},{token:"constant.integer",regex:"(?:(?:(?:[1-9]\\d*)|(?:0))|(?:0[oO]?[0-7]+)|(?:0[xX][\\dA-Fa-f]+)|(?:0[bB][01]+))\\b"},{token:["keyword.type","variable"],regex:"(type\\s)([a-zA-Z0-9_$-]*\\b)"},{token:t,regex:"[a-zA-Z_$][a-zA-Z0-9_$]*\\b"},{token:"keyword.operator",regex:"\\+\\.|\\-\\.|\\*\\.|\\/\\.|#|;;|\\+|\\-|\\*|\\*\\*\\/|\\/\\/|%|<<|>>|&|\\||\\^|~|<|>|<=|=>|==|!=|<>|<-|=|\\(\\*\\)"},{token:"paren.lparen",regex:"[[({]"},{token:"paren.rparen",regex:"[\\])}]"}],blockComment:[{regex:/\(\*\)/,token:"comment"},{regex:/\(\*(?!\))/,token:"comment.start",push:"blockComment"},{regex:/\*\)/,token:"comment.end",next:"pop"},{defaultToken:"comment"}]},this.normalizeRules()};o.inherits(s,i),t.FSharpHighlightRules=s}),ace.define("ace/mode/folding/cstyle",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],function(e,t){"use strict";var i=e("../../lib/oop"),s=e("../../range").Range,a=e("./fold_mode").FoldMode,o=t.FoldMode=function(e){e&&(this.foldingStartMarker=new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/,"|"+e.start)),this.foldingStopMarker=new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/,"|"+e.end)))};i.inherits(o,a),function(){this.foldingStartMarker=/([{[(])[^}\])]*$|^\s*(\/\*)/,this.foldingStopMarker=/^[^[{(]*([}\])])|^[\s*]*(\*\/)/,this.singleLineBlockCommentRe=/^\s*(\/\*).*\*\/\s*$/,this.tripleStarBlockCommentRe=/^\s*(\/\*\*\*).*\*\/\s*$/,this.startRegionRe=/^\s*(\/\*|\/\/)#?region\b/,this._getFoldWidgetBase=this.getFoldWidget,this.getFoldWidget=function(e,t,n){var o,s=e.getLine(n);return this.singleLineBlockCommentRe.test(s)&&!this.startRegionRe.test(s)&&!this.tripleStarBlockCommentRe.test(s)?"":(o=this._getFoldWidgetBase(e,t,n),!o&&this.startRegionRe.test(s)?"start":o)},this.getFoldWidgetRange=function(e,t,n,s){var o,i,a,r=e.getLine(n);if(this.startRegionRe.test(r))return this.getCommentRegionBlock(e,r,n);if(o=r.match(this.foldingStartMarker),o)return i=o.index,o[1]?this.openingBracketBlock(e,o[1],n,i):(a=e.getCommentFoldRange(n,i+o[0].length,1),a&&!a.isMultiLine()&&(s?a=this.getSectionRange(e,n):t!="all"&&(a=null)),a);if(t==="markbegin")return;if(o=r.match(this.foldingStopMarker),o)return i=o.index+o[0].length,o[1]?this.closingBracketBlock(e,o[1],n,i):e.getCommentFoldRange(n,i,-1)},this.getSectionRange=function(e,t){var n,i,a,l,o=e.getLine(t),r=o.search(/\S/),c=t,d=o.length;for(t=t+1,i=t,l=e.getLength();++t<l;){if(o=e.getLine(t),a=o.search(/\S/),a===-1)continue;if(r>a)break;if(n=this.getFoldWidgetRange(e,"all",t),n){if(n.start.row<=c)break;if(n.isMultiLine())t=n.end.row;else if(r==a)break}i=t}return new s(c,d,i,e.getLine(i).length)},this.getCommentRegionBlock=function(e,t,n){for(var i,a,c=t.search(/\s*$/),l=e.getLength(),r=n,d=/^\s*(?:\/\*|\/\/|--)#?(end)?region\b/,o=1;++n<l;){if(t=e.getLine(n),i=d.exec(t),!i)continue;if(i[1]?o--:o++,!o)break}if(a=n,a>r)return new s(r,c,a,t.length)}}.call(o.prototype)}),ace.define("ace/mode/fsharp",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/fsharp_highlight_rules","ace/mode/folding/cstyle"],function(e,t){"use strict";var i=e("../lib/oop"),o=e("./text").Mode,a=e("./fsharp_highlight_rules").FSharpHighlightRules,r=e("./folding/cstyle").FoldMode,s=function(){o.call(this),this.HighlightRules=a,this.foldingRules=new r};i.inherits(s,o),function(){this.lineCommentStart="//",this.blockComment={start:"(*",end:"*)",nestable:!0},this.$id="ace/mode/fsharp"}.call(s.prototype),t.Mode=s}),function(){ace.require(["ace/mode/fsharp"],function(e){typeof module=="object"&&typeof exports=="object"&&module&&(module.exports=e)})}()