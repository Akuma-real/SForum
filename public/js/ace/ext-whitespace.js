ace.define("ace/ext/whitespace",["require","exports","module","ace/lib/lang"],function(e,t){"use strict";var s=e("../lib/lang");t.$detectIndentation=function(e){for(var s,o,i,a,c,l,u,f,r=[],d=[],m=0,h=0,p=Math.min(e.length,1e3),n=0;n<p;n++){if(o=e[n],!/^\s*[^*+\-\s]/.test(o))continue;for(o[0]=="	"?(m++,h=-Number.MAX_VALUE):(i=o.match(/^ */)[0].length,i&&o[i]!="	"&&(c=i-h,c>0&&!(h%c)&&!(i%c)&&(d[c]=(d[c]||0)+1),r[i]=(r[i]||0)+1),h=i);n<p&&o[o.length-1]=="\\";)o=e[n++]}function g(e){for(var n=0,t=e;t<r.length;t+=e)n+=r[t]||0;return n}f=d.reduce(function(e,t){return e+t},0),a={score:0,length:0},l=0;for(n=1;n<12;n++)s=g(n),n==1?(l=s,s=r[1]?.9:.8,r.length||(s=0)):s/=l,d[n]&&(s+=d[n]/f),s>a.score&&(a={score:s,length:n});if(a.score&&a.score>1.4&&(u=a.length),m>l+1)return(u==1||l<m/4||a.score<1.8)&&(u=void 0),{ch:"	",length:u};if(l>m+1)return{ch:" ",length:u}},t.detectIndentation=function(e){var s=e.getLines(0,1e3),n=t.$detectIndentation(s)||{};return n.ch&&e.setUseSoftTabs(n.ch==" "),n.length&&e.setTabSize(n.length),n},t.trimTrailingSpace=function(e,t){var o,i,a,r,u,c=e.getDocument(),l=c.getAllLines(),d=t&&t.trimEmpty?-1:0,n=[],s=-1;t&&t.keepCursorPosition&&(e.selection.rangeCount?e.selection.rangeList.ranges.forEach(function(e,t,s){var o=s[t+1];if(o&&o.cursor.row==e.cursor.row)return;n.push(e.cursor)}):n.push(e.selection.getCursor()),s=0),a=n[s]&&n[s].row;for(o=0,u=l.length;o<u;o++)r=l[o],i=r.search(/\s+$/),o==a&&(i<n[s].column&&i>d&&(i=n[s].column),s++,a=n[s]?n[s].row:-1),i>d&&c.removeInLine(o,i,r.length)},t.convertIndentation=function(e,t,n){g=e.getTabString()[0],a=e.getTabSize(),n||(n=a),t||(t=g),v=t=="	"?t:s.stringRepeat(t,n),c=e.doc,f=c.getAllLines(),m={},u={};for(var i,a,r,c,l,d,u,h,m,f,p,g,v,o=0,b=f.length;o<b;o++)p=f[o],i=p.match(/^\s*/)[0],i&&(h=e.$getStringScreenWidth(i)[0],d=Math.floor(h/a),l=h%a,r=m[d]||(m[d]=s.stringRepeat(v,d)),r+=u[l]||(u[l]=s.stringRepeat(" ",l)),r!=i&&(c.removeInLine(o,0,i.length),c.insertInLine({row:o,column:0},r)));e.setTabSize(n),e.setUseSoftTabs(t==" ")},t.$parseStringArg=function(e){var n,t={};return/t/.test(e)?t.ch="	":/s/.test(e)&&(t.ch=" "),n=e.match(/\d+/),n&&(t.length=parseInt(n[0],10)),t},t.$parseArg=function(e){return e?typeof e=="string"?t.$parseStringArg(e):typeof e.text=="string"?t.$parseStringArg(e.text):e:{}},t.commands=[{name:"detectIndentation",description:"Detect indentation from content",exec:function(e){t.detectIndentation(e.session)}},{name:"trimTrailingSpace",description:"Trim trailing whitespace",exec:function(e,n){t.trimTrailingSpace(e.session,n)}},{name:"convertIndentation",description:"Convert indentation to ...",exec:function(e,n){var s=t.$parseArg(n);t.convertIndentation(e.session,s.ch,s.length)}},{name:"setIndentation",description:"Set indentation",exec:function(e,n){var s=t.$parseArg(n);s.length&&e.session.setTabSize(s.length),s.ch&&e.session.setUseSoftTabs(s.ch==" ")}}]}),function(){ace.require(["ace/ext/whitespace"],function(e){typeof module=="object"&&typeof exports=="object"&&module&&(module.exports=e)})}()