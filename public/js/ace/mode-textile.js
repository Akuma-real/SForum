ace.define("ace/mode/textile_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(e,t){"use strict";var o=e("../lib/oop"),i=e("./text_highlight_rules").TextHighlightRules,s=function(){this.$rules={start:[{token:function(e){return e.charAt(0)=="h"?"markup.heading."+e.charAt(1):"markup.heading"},regex:"h1|h2|h3|h4|h5|h6|bq|p|bc|pre",next:"blocktag"},{token:"keyword",regex:"[\\*]+|[#]+"},{token:"text",regex:".+"}],blocktag:[{token:"keyword",regex:"\\. ",next:"start"},{token:"keyword",regex:"\\(",next:"blocktagproperties"}],blocktagproperties:[{token:"keyword",regex:"\\)",next:"blocktag"},{token:"string",regex:"[a-zA-Z0-9\\-_]+"},{token:"keyword",regex:"#"}]}};o.inherits(s,i),t.TextileHighlightRules=s}),ace.define("ace/mode/matching_brace_outdent",["require","exports","module","ace/range"],function(e,t){"use strict";var o=e("../range").Range,s=function(){};(function(){this.checkOutdent=function(e,t){return!!/^\s+$/.test(e)&&/^\s*\}/.test(t)},this.autoOutdent=function(e,t){var n,s,a,r=e.getLine(t),i=r.match(/^(\s*\})/);if(!i)return 0;if(s=i[1].length,n=e.findMatchingBracket({row:t,column:s}),!n||n.row==t)return 0;a=this.$getIndent(e.getLine(n.row)),e.replace(new o(t,0,t,s-1),a)},this.$getIndent=function(e){return e.match(/^\s*/)[0]}}).call(s.prototype),t.MatchingBraceOutdent=s}),ace.define("ace/mode/textile",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/textile_highlight_rules","ace/mode/matching_brace_outdent"],function(e,t){"use strict";var o=e("../lib/oop"),i=e("./text").Mode,a=e("./textile_highlight_rules").TextileHighlightRules,r=e("./matching_brace_outdent").MatchingBraceOutdent,s=function(){this.HighlightRules=a,this.$outdent=new r,this.$behaviour=this.$defaultBehaviour};o.inherits(s,i),function(){this.type="text",this.getNextLineIndent=function(e,t,n){return e=="intag"?n:""},this.checkOutdent=function(e,t,n){return this.$outdent.checkOutdent(t,n)},this.autoOutdent=function(e,t,n){this.$outdent.autoOutdent(t,n)},this.$id="ace/mode/textile",this.snippetFileId="ace/snippets/textile"}.call(s.prototype),t.Mode=s}),function(){ace.require(["ace/mode/textile"],function(e){typeof module=="object"&&typeof exports=="object"&&module&&(module.exports=e)})}()