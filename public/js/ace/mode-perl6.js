ace.define("ace/mode/perl6_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(e,t){"use strict";var o=e("../lib/oop"),i=e("./text_highlight_rules").TextHighlightRules,s=function(){var g="my|our|class|role|grammar|is|does|sub|method|submethod|try|default|when|if|elsif|else|unless|with|orwith|without|for|given|proceed|succeed|loop|while|until|repeat|module|use|need|import|require|unit|constant|enum|multi|return|has|token|rule|make|made|proto|state|augment|but|anon|supersede|let|subset|gather|returns|return-rw|temp|BEGIN|CHECK|INIT|END|CLOSE|ENTER|LEAVE|KEEP|UNDO|PRE|POST|FIRST|NEXT|LAST|CATCH|CONTROL|QUIT|DOC",p="Any|Array|Associative|AST|atomicint|Attribute|Backtrace|Backtrace::Frame|Bag|Baggy|BagHash|Blob|Block|Bool|Buf|Callable|CallFrame|Cancellation|Capture|Channel|Code|compiler|Complex|ComplexStr|Cool|CurrentThreadScheduler|Cursor|Date|Dateish|DateTime|Distro|Duration|Encoding|Exception|Failure|FatRat|Grammar|Hash|HyperWhatever|Instant|Int|IntStr|IO|IO::ArgFiles|IO::CatHandle|IO::Handle|IO::Notification|IO::Path|IO::Path::Cygwin|IO::Path::QNX|IO::Path::Unix|IO::Path::Win32|IO::Pipe|IO::Socket|IO::Socket::Async|IO::Socket::INET|IO::Spec|IO::Spec::Cygwin|IO::Spec::QNX|IO::Spec::Unix|IO::Spec::Win32|IO::Special|Iterable|Iterator|Junction|Kernel|Label|List|Lock|Lock::Async|Macro|Map|Match|Metamodel::AttributeContainer|Metamodel::C3MRO|Metamodel::ClassHOW|Metamodel::EnumHOW|Metamodel::Finalization|Metamodel::MethodContainer|Metamodel::MROBasedMethodDispatch|Metamodel::MultipleInheritance|Metamodel::Naming|Metamodel::Primitives|Metamodel::PrivateMethodContainer|Metamodel::RoleContainer|Metamodel::Trusting|Method|Mix|MixHash|Mixy|Mu|NFC|NFD|NFKC|NFKD|Nil|Num|Numeric|NumStr|ObjAt|Order|Pair|Parameter|Perl|Pod::Block|Pod::Block::Code|Pod::Block::Comment|Pod::Block::Declarator|Pod::Block::Named|Pod::Block::Para|Pod::Block::Table|Pod::Heading|Pod::Item|Positional|PositionalBindFailover|Proc|Proc::Async|Promise|Proxy|PseudoStash|QuantHash|Range|Rat|Rational|RatStr|Real|Regex|Routine|Scalar|Scheduler|Semaphore|Seq|Set|SetHash|Setty|Signature|Slip|Stash|Str|StrDistance|Stringy|Sub|Submethod|Supplier|Supplier::Preserving|Supply|Systemic|Tap|Telemetry|Telemetry::Instrument::Thread|Telemetry::Instrument::Usage|Telemetry::Period|Telemetry::Sampler|Thread|ThreadPoolScheduler|UInt|Uni|utf8|Variable|Version|VM|Whatever|WhateverCode|WrapHandle|int|uint|num|str|int8|int16|int32|int64|uint8|uint16|uint32|uint64|long|longlong|num32|num64|size_t|bool|CArray|Pointer|Backtrace|Backtrace::Frame|Exception|Failure|X::AdHoc|X::Anon::Augment|X::Anon::Multi|X::Assignment::RO|X::Attribute::NoPackage|X::Attribute::Package|X::Attribute::Undeclared|X::Augment::NoSuchType|X::Bind|X::Bind::NativeType|X::Bind::Slice|X::Caller::NotDynamic|X::Channel::ReceiveOnClosed|X::Channel::SendOnClosed|X::Comp|X::Composition::NotComposable|X::Constructor::Positional|X::ControlFlow|X::ControlFlow::Return|X::DateTime::TimezoneClash|X::Declaration::Scope|X::Declaration::Scope::Multi|X::Does::TypeObject|X::Eval::NoSuchLang|X::Export::NameClash|X::IO|X::IO::Chdir|X::IO::Chmod|X::IO::Copy|X::IO::Cwd|X::IO::Dir|X::IO::DoesNotExist|X::IO::Link|X::IO::Mkdir|X::IO::Move|X::IO::Rename|X::IO::Rmdir|X::IO::Symlink|X::IO::Unlink|X::Inheritance::NotComposed|X::Inheritance::Unsupported|X::Method::InvalidQualifier|X::Method::NotFound|X::Method::Private::Permission|X::Method::Private::Unqualified|X::Mixin::NotComposable|X::NYI|X::NoDispatcher|X::Numeric::Real|X::OS|X::Obsolete|X::OutOfRange|X::Package::Stubbed|X::Parameter::Default|X::Parameter::MultipleTypeConstraints|X::Parameter::Placeholder|X::Parameter::Twigil|X::Parameter::WrongOrder|X::Phaser::Multiple|X::Phaser::PrePost|X::Placeholder::Block|X::Placeholder::Mainline|X::Pod|X::Proc::Async|X::Proc::Async::AlreadyStarted|X::Proc::Async::CharsOrBytes|X::Proc::Async::MustBeStarted|X::Proc::Async::OpenForWriting|X::Proc::Async::TapBeforeSpawn|X::Proc::Unsuccessful|X::Promise::CauseOnlyValidOnBroken|X::Promise::Vowed|X::Redeclaration|X::Role::Initialization|X::Seq::Consumed|X::Sequence::Deduction|X::Signature::NameClash|X::Signature::Placeholder|X::Str::Numeric|X::StubCode|X::Syntax|X::Syntax::Augment::WithoutMonkeyTyping|X::Syntax::Comment::Embedded|X::Syntax::Confused|X::Syntax::InfixInTermPosition|X::Syntax::Malformed|X::Syntax::Missing|X::Syntax::NegatedPair|X::Syntax::NoSelf|X::Syntax::Number::RadixOutOfRange|X::Syntax::P5|X::Syntax::Regex::Adverb|X::Syntax::Regex::SolitaryQuantifier|X::Syntax::Reserved|X::Syntax::Self::WithoutObject|X::Syntax::Signature::InvocantMarker|X::Syntax::Term::MissingInitializer|X::Syntax::UnlessElse|X::Syntax::Variable::Match|X::Syntax::Variable::Numeric|X::Syntax::Variable::Twigil|X::Temporal|X::Temporal::InvalidFormat|X::TypeCheck|X::TypeCheck::Assignment|X::TypeCheck::Binding|"+"X::TypeCheck::Return|X::TypeCheck::Splice|X::Undeclared",f="abs|abs2rel|absolute|accept|ACCEPTS|accessed|acos|acosec|acosech|acosh|acotan|acotanh|acquire|act|action|actions|add|add_attribute|add_enum_value|add_fallback|add_method|add_parent|add_private_method|add_role|add_trustee|adverb|after|all|allocate|allof|allowed|alternative-names|annotations|antipair|antipairs|any|anyof|app_lifetime|append|arch|archname|args|arity|asec|asech|asin|asinh|ASSIGN-KEY|ASSIGN-POS|assuming|ast|at|atan|atan2|atanh|AT-KEY|atomic-assign|atomic-dec-fetch|atomic-fetch|atomic-fetch-add|atomic-fetch-dec|atomic-fetch-inc|atomic-fetch-sub|atomic-inc-fetch|AT-POS|attributes|auth|await|backtrace|Bag|BagHash|base|basename|base-repeating|batch|BIND-KEY|BIND-POS|bind-stderr|bind-stdin|bind-stdout|bind-udp|bits|bless|block|bool-only|bounds|break|Bridge|broken|BUILD|build-date|bytes|cache|callframe|calling-package|CALL-ME|callsame|callwith|can|cancel|candidates|cando|canonpath|caps|caption|Capture|cas|catdir|categorize|categorize-list|catfile|catpath|cause|ceiling|cglobal|changed|Channel|chars|chdir|child|child-name|child-typename|chmod|chomp|chop|chr|chrs|chunks|cis|classify|classify-list|cleanup|clone|close|closed|close-stdin|code|codes|collate|column|comb|combinations|command|comment|compiler|Complex|compose|compose_type|composer|condition|config|configure_destroy|configure_type_checking|conj|connect|constraints|construct|contains|contents|copy|cos|cosec|cosech|cosh|cotan|cotanh|count|count-only|cpu-cores|cpu-usage|CREATE|create_type|cross|cue|curdir|curupdir|d|Date|DateTime|day|daycount|day-of-month|day-of-week|day-of-year|days-in-month|declaration|decode|decoder|deepmap|defined|DEFINITE|delayed|DELETE-KEY|DELETE-POS|denominator|desc|DESTROY|destroyers|devnull|did-you-mean|die|dir|dirname|dir-sep|DISTROnames|do|done|duckmap|dynamic|e|eager|earlier|elems|emit|enclosing|encode|encoder|encoding|end|ends-with|enum_from_value|enum_value_list|enum_values|enums|eof|EVAL|EVALFILE|exception|excludes-max|excludes-min|EXISTS-KEY|EXISTS-POS|exit|exitcode|exp|expected|explicitly-manage|expmod|extension|f|fail|fc|feature|file|filename|find_method|find_method_qualified|finish|first|flat|flatmap|flip|floor|flush|fmt|format|formatter|freeze|from|from-list|from-loop|from-posix|full|full-barrier|get|get_value|getc|gist|got|grab|grabpairs|grep|handle|handled|handles|hardware|has_accessor|head|headers|hh-mm-ss|hidden|hides|hour|how|hyper|id|illegal|im|in|indent|index|indices|indir|infinite|infix|install_method_cache|Instant|instead|int-bounds|interval|in-timezone|invalid-str|invert|invocant|IO|IO::Notification.watch-path|is_trusted|is_type|isa|is-absolute|is-hidden|is-initial-thread|is-int|is-lazy|is-leap-year|isNaN|is-prime|is-relative|is-routine|is-setting|is-win|item|iterator|join|keep|kept|KERNELnames|key|keyof|keys|kill|kv|kxxv|l|lang|last|lastcall|later|lazy|lc|leading|level|line|lines|link|listen|live|local|lock|log|log10|lookup|lsb|MAIN|match|max|maxpairs|merge|message|method_table|methods|migrate|min|minmax|minpairs|minute|misplaced|Mix|MixHash|mkdir|mode|modified|month|move|mro|msb|multiness|name|named|named_names|narrow|nativecast|native-descriptor|nativesizeof|new|new_type|new-from-daycount|new-from-pairs|next|nextcallee|next-handle|nextsame|nextwith|NFC|NFD|NFKC|NFKD|nl-in|nl-out|nodemap|none|norm|not|note|now|nude|numerator|Numeric|of|offset|offset-in-hours|offset-in-minutes|old|on-close|one|on-switch|open|opened|operation|optional|ord|ords|orig|os-error|osname|out-buffer|pack|package|package-kind|package-name|packages|pair|pairs|pairup|parameter|params|parent|parent-name|parents|parse|parse-base|parsefile|parse-names|parts|path|path-sep|payload|peer-host|peer-port|periods|perl|permutations|phaser|pick|pickpairs|pid|placeholder|plus|polar|poll|polymod|pop|pos|positional|posix|postfix|postmatch|precomp-ext|precomp-target|pred|prefix|prematch|prepend|print|printf|print-nl|print-to|private|private_method_table|proc|produce|Promise|prompt|protect|pull-one|push|push-all|push-at-least|push-exactly|push-until-lazy|put|qualifier-type|quit|r|race|radix|rand|range|raw|re|read|readchars|readonly|ready|Real|reallocate|reals|reason|rebless|receive|recv|redispatcher|redo|reduce|"+"rel2abs|relative|release|rename|repeated|replacement|report|reserved|resolve|"+"restore|result|resume|rethrow|reverse|right|rindex|rmdir|roles_to_compose|"+"rolish|roll|rootdir|roots|rotate|rotor|round|roundrobin|routine-type|run|rwx|s|"+"samecase|samemark|samewith|say|schedule-on|scheduler|scope|sec|sech|second|seek|"+"self|send|Set|set_hidden|set_name|set_package|set_rw|set_value|SetHash|"+"set-instruments|setup_finalization|shape|share|shell|shift|sibling|sigil|"+"sign|signal|signals|signature|sin|sinh|sink|sink-all|skip|skip-at-least|"+"skip-at-least-pull-one|skip-one|sleep|sleep-timer|sleep-until|Slip|slurp|"+"slurp-rest|slurpy|snap|snapper|so|socket-host|socket-port|sort|source|"+"source-package|spawn|SPEC|splice|split|splitdir|splitpath|sprintf|spurt|"+"sqrt|squish|srand|stable|start|started|starts-with|status|stderr|stdout|"+"sub_signature|subbuf|subbuf-rw|subname|subparse|subst|subst-mutate|"+"substr|substr-eq|substr-rw|succ|sum|Supply|symlink|t|tail|take|take-rw|"+"tan|tanh|tap|target|target-name|tc|tclc|tell|then|throttle|throw|timezone|"+"tmpdir|to|today|toggle|to-posix|total|trailing|trans|tree|trim|trim-leading|"+"trim-trailing|truncate|truncated-to|trusts|try_acquire|trying|twigil|type|"+"type_captures|typename|uc|udp|uncaught_handler|unimatch|uniname|uninames|"+"uniparse|uniprop|uniprops|unique|unival|univals|unlink|unlock|unpack|unpolar|"+"unshift|unwrap|updir|USAGE|utc|val|value|values|VAR|variable|verbose-config|"+"version|VMnames|volume|vow|w|wait|warn|watch|watch-path|week|weekday-of-month|"+"week-number|week-year|WHAT|WHERE|WHEREFORE|WHICH|WHO|whole-second|WHY|"+"wordcase|words|workaround|wrap|write|write-to|yada|year|yield|yyyy-mm-dd|"+"z|zip|zip-latest|"+"plan|done-testing|bail-out|todo|skip|skip-rest|diag|subtest|pass|flunk|ok|"+"nok|cmp-ok|is-deeply|isnt|is-approx|like|unlike|use-ok|isa-ok|does-ok|"+"can-ok|dies-ok|lives-ok|eval-dies-ok|eval-lives-ok|throws-like|fails-like|"+"rw|required|native|repr|export|symbol",m="pi|Inf|tau|time",y="eq|ne|gt|lt|le|ge|div|gcd|lcm|leg|cmp|ff|fff|x|before|after|Z|X|and|or|andthen|notandthen|orelse|xor",b=this.createKeywordMapper({keyword:g,"storage.type":p,"constant.language":m,"support.function":f,"keyword.operator":y},"identifier"),v="[a-zA-Z_][a-zA-Z_0-9:-]*\\b",r={token:"constant.numeric",regex:"0x[0-9a-fA-F]+\\b"},c={token:"constant.numeric",regex:"[+-.]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"},l={token:"constant.numeric",regex:"(?:\\d+_?\\d+)+\\b"},n={token:"constant.numeric",regex:"\\+?\\d+i\\b"},s={token:"constant.language.boolean",regex:"(?:True|False)\\b"},h={token:"constant.other",regex:"v[0-9](?:\\.[a-zA-Z0-9*])*\\b"},u={token:b,regex:"[a-zA-Z][\\:a-zA-Z0-9_-]*\\b"},e={token:"variable.language",regex:"[$@%&][?*!.]?[a-zA-Z0-9_-]+\\b"},t={token:"variable.language",regex:"\\$[/|!]?|@\\$/"},d={token:"keyword.operator",regex:"=|<|>|\\+|\\*|-|/|~|%|\\?|!|\\^|\\.|\\:|\\,|»|«|\\||\\&|⚛|∘"},a={token:"constant.language",regex:"𝑒|π|τ|∞"},i={token:"string.quoted.single",regex:"['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"},j={token:"string.quoted.single",regex:"[<](?:[a-zA-Z0-9 ])*[>]"},o={token:"string.regexp",regex:"[m|rx]?[/](?:(?:\\[(?:\\\\]|[^\\]])+\\])|(?:\\\\/|[^\\]/]))*[/]\\w*\\s*(?=[).,;]|$)"};this.$rules={start:[{token:"comment.block",regex:"#[`|=]\\(.*\\)"},{token:"comment.block",regex:"#[`|=]\\[.*\\]"},{token:"comment.doc",regex:"^=(?:begin)\\b",next:"block_comment"},{token:"string.unquoted",regex:"q[x|w]?\\:to/END/;",next:"qheredoc"},{token:"string.unquoted",regex:"qq[x|w]?\\:to/END/;",next:"qqheredoc"},o,i,{token:"string.quoted.double",regex:'"',next:"qqstring"},j,{token:["keyword","text","variable.module"],regex:"(use)(\\s+)((?:"+v+"\\.?)*)"},r,c,l,n,s,h,u,e,t,d,a,{token:"comment",regex:"#.*$"},{token:"lparen",regex:"[[({]"},{token:"rparen",regex:"[\\])}]"},{token:"text",regex:"\\s+"}],qqstring:[{token:"constant.language.escape",regex:'\\\\(?:[nrtef\\\\"$]|[0-7]{1,3}|x[0-9A-Fa-f]{1,2})'},e,t,{token:"lparen",regex:"{",next:"qqinterpolation"},{token:"string.quoted.double",regex:'"',next:"start"},{defaultToken:"string.quoted.double"}],qqinterpolation:[r,c,l,n,s,h,u,e,t,d,a,i,o,{token:"rparen",regex:"}",next:"qqstring"}],block_comment:[{token:"comment.doc",regex:"^=end +[a-zA-Z_0-9]*",next:"start"},{defaultToken:"comment.doc"}],qheredoc:[{token:"string.unquoted",regex:"END$",next:"start"},{defaultToken:"string.unquoted"}],qqheredoc:[e,t,{token:"lparen",regex:"{",next:"qqheredocinterpolation"},{token:"string.unquoted",regex:"END$",next:"start"},{defaultToken:"string.unquoted"}],qqheredocinterpolation:[r,c,l,n,s,h,u,e,t,d,a,i,o,{token:"rparen",regex:"}",next:"qqheredoc"}]}};o.inherits(s,i),t.Perl6HighlightRules=s}),ace.define("ace/mode/matching_brace_outdent",["require","exports","module","ace/range"],function(e,t){"use strict";var o=e("../range").Range,s=function(){};(function(){this.checkOutdent=function(e,t){return!!/^\s+$/.test(e)&&/^\s*\}/.test(t)},this.autoOutdent=function(e,t){var n,s,a,r=e.getLine(t),i=r.match(/^(\s*\})/);if(!i)return 0;if(s=i[1].length,n=e.findMatchingBracket({row:t,column:s}),!n||n.row==t)return 0;a=this.$getIndent(e.getLine(n.row)),e.replace(new o(t,0,t,s-1),a)},this.$getIndent=function(e){return e.match(/^\s*/)[0]}}).call(s.prototype),t.MatchingBraceOutdent=s}),ace.define("ace/mode/folding/cstyle",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],function(e,t){"use strict";var i=e("../../lib/oop"),s=e("../../range").Range,a=e("./fold_mode").FoldMode,o=t.FoldMode=function(e){e&&(this.foldingStartMarker=new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/,"|"+e.start)),this.foldingStopMarker=new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/,"|"+e.end)))};i.inherits(o,a),function(){this.foldingStartMarker=/([{[(])[^}\])]*$|^\s*(\/\*)/,this.foldingStopMarker=/^[^[{(]*([}\])])|^[\s*]*(\*\/)/,this.singleLineBlockCommentRe=/^\s*(\/\*).*\*\/\s*$/,this.tripleStarBlockCommentRe=/^\s*(\/\*\*\*).*\*\/\s*$/,this.startRegionRe=/^\s*(\/\*|\/\/)#?region\b/,this._getFoldWidgetBase=this.getFoldWidget,this.getFoldWidget=function(e,t,n){var o,s=e.getLine(n);return this.singleLineBlockCommentRe.test(s)&&!this.startRegionRe.test(s)&&!this.tripleStarBlockCommentRe.test(s)?"":(o=this._getFoldWidgetBase(e,t,n),!o&&this.startRegionRe.test(s)?"start":o)},this.getFoldWidgetRange=function(e,t,n,s){var o,i,a,r=e.getLine(n);if(this.startRegionRe.test(r))return this.getCommentRegionBlock(e,r,n);if(o=r.match(this.foldingStartMarker),o)return i=o.index,o[1]?this.openingBracketBlock(e,o[1],n,i):(a=e.getCommentFoldRange(n,i+o[0].length,1),a&&!a.isMultiLine()&&(s?a=this.getSectionRange(e,n):t!="all"&&(a=null)),a);if(t==="markbegin")return;if(o=r.match(this.foldingStopMarker),o)return i=o.index+o[0].length,o[1]?this.closingBracketBlock(e,o[1],n,i):e.getCommentFoldRange(n,i,-1)},this.getSectionRange=function(e,t){var n,i,a,l,o=e.getLine(t),r=o.search(/\S/),c=t,d=o.length;for(t=t+1,i=t,l=e.getLength();++t<l;){if(o=e.getLine(t),a=o.search(/\S/),a===-1)continue;if(r>a)break;if(n=this.getFoldWidgetRange(e,"all",t),n){if(n.start.row<=c)break;if(n.isMultiLine())t=n.end.row;else if(r==a)break}i=t}return new s(c,d,i,e.getLine(i).length)},this.getCommentRegionBlock=function(e,t,n){for(var i,a,c=t.search(/\s*$/),l=e.getLength(),r=n,d=/^\s*(?:\/\*|\/\/|--)#?(end)?region\b/,o=1;++n<l;){if(t=e.getLine(n),i=d.exec(t),!i)continue;if(i[1]?o--:o++,!o)break}if(a=n,a>r)return new s(r,c,a,t.length)}}.call(o.prototype)}),ace.define("ace/mode/perl6",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/perl6_highlight_rules","ace/mode/matching_brace_outdent","ace/mode/folding/cstyle"],function(e,t){"use strict";var o=e("../lib/oop"),i=e("./text").Mode,a=e("./perl6_highlight_rules").Perl6HighlightRules,r=e("./matching_brace_outdent").MatchingBraceOutdent,c=e("./folding/cstyle").FoldMode,s=function(){this.HighlightRules=a,this.$outdent=new r,this.foldingRules=new c({start:"^=(begin)\\b",end:"^=(end)\\b"}),this.$behaviour=this.$defaultBehaviour};o.inherits(s,i),function(){this.lineCommentStart="#",this.blockComment=[{start:"=begin",end:"=end",lineStartOnly:!0},{start:"=item",end:"=end",lineStartOnly:!0}],this.getNextLineIndent=function(e,t,n){var i,s=this.$getIndent(t),a=this.getTokenizer().getLineTokens(t,e),o=a.tokens;return o.length&&o[o.length-1].type=="comment"?s:(e=="start"&&(i=t.match(/^.*[{([:]\s*$/),i&&(s+=n)),s)},this.checkOutdent=function(e,t,n){return this.$outdent.checkOutdent(t,n)},this.autoOutdent=function(e,t,n){this.$outdent.autoOutdent(t,n)},this.$id="ace/mode/perl6"}.call(s.prototype),t.Mode=s}),function(){ace.require(["ace/mode/perl6"],function(e){typeof module=="object"&&typeof exports=="object"&&module&&(module.exports=e)})}()