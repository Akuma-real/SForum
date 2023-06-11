!function(e){var n={};function t(s){if(n[s])return n[s].exports;var o=n[s]={i:s,l:!1,exports:{}};return e[s].call(o.exports,o,o.exports,t),o.l=!0,o.exports}t.m=e,t.c=n,t.d=function(e,n,s){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:s})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var o,s=Object.create(null);if(t.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(o in e)t.d(s,o,function(t){return e[t]}.bind(null,o));return s},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=9)}([function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.isObject=MathJax._.components.global.isObject,t.combineConfig=MathJax._.components.global.combineConfig,t.combineDefaults=MathJax._.components.global.combineDefaults,t.combineWithMathJax=MathJax._.components.global.combineWithMathJax,t.MathJax=MathJax._.components.global.MathJax},function(e,t,n){"use strict";var f=this&&this.__values||function(e){var t="function"==typeof Symbol&&Symbol.iterator,n=t&&e[t],s=0;if(n)return n.call(e);if(e&&"number"==typeof e.length)return{next:function(){return e&&s>=e.length&&(e=void 0),{value:e&&e[s++],done:!e}}};throw new TypeError(t?"Object is not iterable.":"Symbol.iterator is not defined.")},m=this&&this.__read||function(e,t){if(n="function"==typeof Symbol&&e[Symbol.iterator],!n)return e;var n,s,o,i=n.call(e),a=[];try{for(;(void 0===t||t-- >0)&&!(s=i.next()).done;)a.push(s.value)}catch(e){o={error:e}}finally{try{s&&!s.done&&(n=i.return)&&n.call(i)}finally{if(o)throw o.error}}return a},l=this&&this.__spread||function(){for(var e=[],t=0;t<arguments.length;t++)e=e.concat(m(arguments[t]));return e};Object.defineProperty(t,"__esModule",{value:!0}),t.RequireConfiguration=t.options=t.RequireMethods=t.RequireLoad=void 0;var i=n(2),d=n(3),a=n(4),u=n(0),h=n(5),s=n(6),o=n(7),p=n(8),g=u.MathJax.config;function r(e,t){var a,c,l,d,h=e.parseOptions.options.require,u=e.parseOptions.packageData.get("require").required,n=t.substr(h.prefix.length);u.indexOf(n)<0&&(u.push(n),function(e,t){void 0===t&&(t=[]),i=e.parseOptions.options.require.prefix;try{for(var o,i,a,c,s=f(t),n=s.next();!n.done;n=s.next())a=n.value,a.substr(0,i.length)===i&&r(e,a)}catch(e){o={error:e}}finally{try{n&&!n.done&&(c=s.return)&&c.call(s)}finally{if(o)throw o.error}}}(e,s.CONFIG.dependencies[t]),a=i.ConfigurationHandler.get(n),a&&(c=g[t]||{},a.options&&1===Object.keys(a.options).length&&a.options[n]&&((d={})[n]=c,c=d),e.configuration.add(a,e,c),l=e.parseOptions.packageData.get("require").configured,a.preprocessors.length&&!l.has(n)&&(l.set(n,!0),o.mathjax.retryAfter(Promise.resolve()))))}function c(e,t){var c=e.options.require,i=c.allow,n=("["===t.substr(0,1)?"":c.prefix)+t;if(!(i.hasOwnProperty(n)?i[n]:i.hasOwnProperty(t)?i[t]:c.defaultAllow))throw new a.default("BadRequire",'Extension "%1" is now allowed to be loaded',n);h.Package.packages.has(n)?r(e.configuration.packageData.get("require").jax,n):o.mathjax.retryAfter(s.Loader.load(n))}t.RequireLoad=c,t.RequireMethods={Require:function(e,t){var n=e.GetArgument(t);if(n.match(/[^_a-zA-Z0-9]/)||""===n)throw new a.default("BadPackageName","Argument for %1 is not a valid package name",t);c(e,n)}},t.options={require:{allow:p.expandable({base:!1,"all-packages":!1}),defaultAllow:!0,prefix:"tex"}},new d.CommandMap("require",{require:"Require"},t.RequireMethods),t.RequireConfiguration=i.Configuration.create("require",{handler:{macro:["require"]},config:function(e,t){t.parseOptions.packageData.set("require",{jax:t,required:l(t.options.packages),configured:new Map});var o=t.parseOptions.options.require,n=o.prefix;if(n.match(/[^_a-zA-Z0-9]/))throw Error(`Illegal characters used in \\require prefix`);s.CONFIG.paths[n]||(s.CONFIG.paths[n]="[mathjax]/input/tex/extensions"),o.prefix="["+n+"]/"},options:t.options})},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.Configuration=MathJax._.input.tex.Configuration.Configuration,t.ConfigurationHandler=MathJax._.input.tex.Configuration.ConfigurationHandler,t.ParserConfiguration=MathJax._.input.tex.Configuration.ParserConfiguration},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.AbstractSymbolMap=MathJax._.input.tex.SymbolMap.AbstractSymbolMap,t.RegExpMap=MathJax._.input.tex.SymbolMap.RegExpMap,t.AbstractParseMap=MathJax._.input.tex.SymbolMap.AbstractParseMap,t.CharacterMap=MathJax._.input.tex.SymbolMap.CharacterMap,t.DelimiterMap=MathJax._.input.tex.SymbolMap.DelimiterMap,t.MacroMap=MathJax._.input.tex.SymbolMap.MacroMap,t.CommandMap=MathJax._.input.tex.SymbolMap.CommandMap,t.EnvironmentMap=MathJax._.input.tex.SymbolMap.EnvironmentMap},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=MathJax._.input.tex.TexError.default},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.PackageError=MathJax._.components.package.PackageError,t.Package=MathJax._.components.package.Package},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.Loader=MathJax._.components.loader.Loader,t.MathJax=MathJax._.components.loader.MathJax,t.CONFIG=MathJax._.components.loader.CONFIG},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.mathjax=MathJax._.mathjax.mathjax},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.APPEND=MathJax._.util.Options.APPEND,t.REMOVE=MathJax._.util.Options.REMOVE,t.Expandable=MathJax._.util.Options.Expandable,t.expandable=MathJax._.util.Options.expandable,t.makeArray=MathJax._.util.Options.makeArray,t.keys=MathJax._.util.Options.keys,t.copy=MathJax._.util.Options.copy,t.insert=MathJax._.util.Options.insert,t.defaultOptions=MathJax._.util.Options.defaultOptions,t.userOptions=MathJax._.util.Options.userOptions,t.selectOptions=MathJax._.util.Options.selectOptions,t.selectOptionsFromKeys=MathJax._.util.Options.selectOptionsFromKeys,t.separateOptions=MathJax._.util.Options.separateOptions},function(e,t,n){"use strict";n.r(t);var s=n(0),o=n(1);Object(s.combineWithMathJax)({_:{input:{tex:{require:{RequireConfiguration:o}}}}})}])