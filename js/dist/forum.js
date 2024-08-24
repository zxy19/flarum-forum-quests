/*! For license information please see forum.js.LICENSE.txt */
(()=>{var t={912:function(t){t.exports=function(){"use strict";var t=6e4,e=36e5,n="millisecond",r="second",o="minute",a="hour",i="day",s="week",u="month",c="quarter",l="year",f="date",d="Invalid Date",m=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,p=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,h={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(t){var e=["th","st","nd","rd"],n=t%100;return"["+t+(e[(n-20)%10]||e[n]||e[0])+"]"}},v=function(t,e,n){var r=String(t);return!r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},y={s:v,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),o=n%60;return(e<=0?"+":"-")+v(r,2,"0")+":"+v(o,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var r=12*(n.year()-e.year())+(n.month()-e.month()),o=e.clone().add(r,u),a=n-o<0,i=e.clone().add(r+(a?-1:1),u);return+(-(r+(n-o)/(a?o-i:i-o))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:u,y:l,w:s,d:i,D:f,h:a,m:o,s:r,ms:n,Q:c}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},g="en",w={};w[g]=h;var b="$isDayjsObject",_=function(t){return t instanceof S||!(!t||!t[b])},x=function t(e,n,r){var o;if(!e)return g;if("string"==typeof e){var a=e.toLowerCase();w[a]&&(o=a),n&&(w[a]=n,o=a);var i=e.split("-");if(!o&&i.length>1)return t(i[0])}else{var s=e.name;w[s]=e,o=s}return!r&&o&&(g=o),o||!r&&g},$=function(t,e){if(_(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new S(n)},M=y;M.l=x,M.i=_,M.w=function(t,e){return $(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var S=function(){function h(t){this.$L=x(t.locale,null,!0),this.parse(t),this.$x=this.$x||t.x||{},this[b]=!0}var v=h.prototype;return v.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(M.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match(m);if(r){var o=r[2]-1||0,a=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],o,r[3]||1,r[4]||0,r[5]||0,r[6]||0,a)):new Date(r[1],o,r[3]||1,r[4]||0,r[5]||0,r[6]||0,a)}}return new Date(e)}(t),this.init()},v.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},v.$utils=function(){return M},v.isValid=function(){return!(this.$d.toString()===d)},v.isSame=function(t,e){var n=$(t);return this.startOf(e)<=n&&n<=this.endOf(e)},v.isAfter=function(t,e){return $(t)<this.startOf(e)},v.isBefore=function(t,e){return this.endOf(e)<$(t)},v.$g=function(t,e,n){return M.u(t)?this[e]:this.set(n,t)},v.unix=function(){return Math.floor(this.valueOf()/1e3)},v.valueOf=function(){return this.$d.getTime()},v.startOf=function(t,e){var n=this,c=!!M.u(e)||e,d=M.p(t),m=function(t,e){var r=M.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return c?r:r.endOf(i)},p=function(t,e){return M.w(n.toDate()[t].apply(n.toDate("s"),(c?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},h=this.$W,v=this.$M,y=this.$D,g="set"+(this.$u?"UTC":"");switch(d){case l:return c?m(1,0):m(31,11);case u:return c?m(1,v):m(0,v+1);case s:var w=this.$locale().weekStart||0,b=(h<w?h+7:h)-w;return m(c?y-b:y+(6-b),v);case i:case f:return p(g+"Hours",0);case a:return p(g+"Minutes",1);case o:return p(g+"Seconds",2);case r:return p(g+"Milliseconds",3);default:return this.clone()}},v.endOf=function(t){return this.startOf(t,!1)},v.$set=function(t,e){var s,c=M.p(t),d="set"+(this.$u?"UTC":""),m=(s={},s[i]=d+"Date",s[f]=d+"Date",s[u]=d+"Month",s[l]=d+"FullYear",s[a]=d+"Hours",s[o]=d+"Minutes",s[r]=d+"Seconds",s[n]=d+"Milliseconds",s)[c],p=c===i?this.$D+(e-this.$W):e;if(c===u||c===l){var h=this.clone().set(f,1);h.$d[m](p),h.init(),this.$d=h.set(f,Math.min(this.$D,h.daysInMonth())).$d}else m&&this.$d[m](p);return this.init(),this},v.set=function(t,e){return this.clone().$set(t,e)},v.get=function(t){return this[M.p(t)]()},v.add=function(n,c){var f,d=this;n=Number(n);var m=M.p(c),p=function(t){var e=$(d);return M.w(e.date(e.date()+Math.round(t*n)),d)};if(m===u)return this.set(u,this.$M+n);if(m===l)return this.set(l,this.$y+n);if(m===i)return p(1);if(m===s)return p(7);var h=(f={},f[o]=t,f[a]=e,f[r]=1e3,f)[m]||1,v=this.$d.getTime()+n*h;return M.w(v,this)},v.subtract=function(t,e){return this.add(-1*t,e)},v.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||d;var r=t||"YYYY-MM-DDTHH:mm:ssZ",o=M.z(this),a=this.$H,i=this.$m,s=this.$M,u=n.weekdays,c=n.months,l=n.meridiem,f=function(t,n,o,a){return t&&(t[n]||t(e,r))||o[n].slice(0,a)},m=function(t){return M.s(a%12||12,t,"0")},h=l||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r};return r.replace(p,(function(t,r){return r||function(t){switch(t){case"YY":return String(e.$y).slice(-2);case"YYYY":return M.s(e.$y,4,"0");case"M":return s+1;case"MM":return M.s(s+1,2,"0");case"MMM":return f(n.monthsShort,s,c,3);case"MMMM":return f(c,s);case"D":return e.$D;case"DD":return M.s(e.$D,2,"0");case"d":return String(e.$W);case"dd":return f(n.weekdaysMin,e.$W,u,2);case"ddd":return f(n.weekdaysShort,e.$W,u,3);case"dddd":return u[e.$W];case"H":return String(a);case"HH":return M.s(a,2,"0");case"h":return m(1);case"hh":return m(2);case"a":return h(a,i,!0);case"A":return h(a,i,!1);case"m":return String(i);case"mm":return M.s(i,2,"0");case"s":return String(e.$s);case"ss":return M.s(e.$s,2,"0");case"SSS":return M.s(e.$ms,3,"0");case"Z":return o}return null}(t)||o.replace(":","")}))},v.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},v.diff=function(n,f,d){var m,p=this,h=M.p(f),v=$(n),y=(v.utcOffset()-this.utcOffset())*t,g=this-v,w=function(){return M.m(p,v)};switch(h){case l:m=w()/12;break;case u:m=w();break;case c:m=w()/3;break;case s:m=(g-y)/6048e5;break;case i:m=(g-y)/864e5;break;case a:m=g/e;break;case o:m=g/t;break;case r:m=g/1e3;break;default:m=g}return d?m:M.a(m)},v.daysInMonth=function(){return this.endOf(u).$D},v.$locale=function(){return w[this.$L]},v.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=x(t,e,!0);return r&&(n.$L=r),n},v.clone=function(){return M.w(this.$d,this)},v.toDate=function(){return new Date(this.valueOf())},v.toJSON=function(){return this.isValid()?this.toISOString():null},v.toISOString=function(){return this.$d.toISOString()},v.toString=function(){return this.$d.toUTCString()},h}(),N=S.prototype;return $.prototype=N,[["$ms",n],["$s",r],["$m",o],["$H",a],["$W",i],["$M",u],["$y",l],["$D",f]].forEach((function(t){N[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),$.extend=function(t,e){return t.$i||(t(e,S,$),t.$i=!0),$},$.locale=x,$.isDayjs=_,$.unix=function(t){return $(1e3*t)},$.en=w[g],$.Ls=w,$.p={},$}()},24:(t,e,n)=>{var r=n(735).default;function o(){"use strict";t.exports=o=function(){return n},t.exports.__esModule=!0,t.exports.default=t.exports;var e,n={},a=Object.prototype,i=a.hasOwnProperty,s=Object.defineProperty||function(t,e,n){t[e]=n.value},u="function"==typeof Symbol?Symbol:{},c=u.iterator||"@@iterator",l=u.asyncIterator||"@@asyncIterator",f=u.toStringTag||"@@toStringTag";function d(t,e,n){return Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{d({},"")}catch(e){d=function(t,e,n){return t[e]=n}}function m(t,e,n,r){var o=e&&e.prototype instanceof b?e:b,a=Object.create(o.prototype),i=new D(r||[]);return s(a,"_invoke",{value:O(t,n,i)}),a}function p(t,e,n){try{return{type:"normal",arg:t.call(e,n)}}catch(t){return{type:"throw",arg:t}}}n.wrap=m;var h="suspendedStart",v="suspendedYield",y="executing",g="completed",w={};function b(){}function _(){}function x(){}var $={};d($,c,(function(){return this}));var M=Object.getPrototypeOf,S=M&&M(M(T([])));S&&S!==a&&i.call(S,c)&&($=S);var N=x.prototype=b.prototype=Object.create($);function q(t){["next","throw","return"].forEach((function(e){d(t,e,(function(t){return this._invoke(e,t)}))}))}function A(t,e){function n(o,a,s,u){var c=p(t[o],t,a);if("throw"!==c.type){var l=c.arg,f=l.value;return f&&"object"==r(f)&&i.call(f,"__await")?e.resolve(f.__await).then((function(t){n("next",t,s,u)}),(function(t){n("throw",t,s,u)})):e.resolve(f).then((function(t){l.value=t,s(l)}),(function(t){return n("throw",t,s,u)}))}u(c.arg)}var o;s(this,"_invoke",{value:function(t,r){function a(){return new e((function(e,o){n(t,r,e,o)}))}return o=o?o.then(a,a):a()}})}function O(t,n,r){var o=h;return function(a,i){if(o===y)throw Error("Generator is already running");if(o===g){if("throw"===a)throw i;return{value:e,done:!0}}for(r.method=a,r.arg=i;;){var s=r.delegate;if(s){var u=L(s,r);if(u){if(u===w)continue;return u}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(o===h)throw o=g,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);o=y;var c=p(t,n,r);if("normal"===c.type){if(o=r.done?g:v,c.arg===w)continue;return{value:c.arg,done:r.done}}"throw"===c.type&&(o=g,r.method="throw",r.arg=c.arg)}}}function L(t,n){var r=n.method,o=t.iterator[r];if(o===e)return n.delegate=null,"throw"===r&&t.iterator.return&&(n.method="return",n.arg=e,L(t,n),"throw"===n.method)||"return"!==r&&(n.method="throw",n.arg=new TypeError("The iterator does not provide a '"+r+"' method")),w;var a=p(o,t.iterator,n.arg);if("throw"===a.type)return n.method="throw",n.arg=a.arg,n.delegate=null,w;var i=a.arg;return i?i.done?(n[t.resultName]=i.value,n.next=t.nextLoc,"return"!==n.method&&(n.method="next",n.arg=e),n.delegate=null,w):i:(n.method="throw",n.arg=new TypeError("iterator result is not an object"),n.delegate=null,w)}function k(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function E(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function D(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(k,this),this.reset(!0)}function T(t){if(t||""===t){var n=t[c];if(n)return n.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var o=-1,a=function n(){for(;++o<t.length;)if(i.call(t,o))return n.value=t[o],n.done=!1,n;return n.value=e,n.done=!0,n};return a.next=a}}throw new TypeError(r(t)+" is not iterable")}return _.prototype=x,s(N,"constructor",{value:x,configurable:!0}),s(x,"constructor",{value:_,configurable:!0}),_.displayName=d(x,f,"GeneratorFunction"),n.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===_||"GeneratorFunction"===(e.displayName||e.name))},n.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,x):(t.__proto__=x,d(t,f,"GeneratorFunction")),t.prototype=Object.create(N),t},n.awrap=function(t){return{__await:t}},q(A.prototype),d(A.prototype,l,(function(){return this})),n.AsyncIterator=A,n.async=function(t,e,r,o,a){void 0===a&&(a=Promise);var i=new A(m(t,e,r,o),a);return n.isGeneratorFunction(e)?i:i.next().then((function(t){return t.done?t.value:i.next()}))},q(N),d(N,f,"Generator"),d(N,c,(function(){return this})),d(N,"toString",(function(){return"[object Generator]"})),n.keys=function(t){var e=Object(t),n=[];for(var r in e)n.push(r);return n.reverse(),function t(){for(;n.length;){var r=n.pop();if(r in e)return t.value=r,t.done=!1,t}return t.done=!0,t}},n.values=T,D.prototype={constructor:D,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(E),!t)for(var n in this)"t"===n.charAt(0)&&i.call(this,n)&&!isNaN(+n.slice(1))&&(this[n]=e)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var n=this;function r(r,o){return s.type="throw",s.arg=t,n.next=r,o&&(n.method="next",n.arg=e),!!o}for(var o=this.tryEntries.length-1;o>=0;--o){var a=this.tryEntries[o],s=a.completion;if("root"===a.tryLoc)return r("end");if(a.tryLoc<=this.prev){var u=i.call(a,"catchLoc"),c=i.call(a,"finallyLoc");if(u&&c){if(this.prev<a.catchLoc)return r(a.catchLoc,!0);if(this.prev<a.finallyLoc)return r(a.finallyLoc)}else if(u){if(this.prev<a.catchLoc)return r(a.catchLoc,!0)}else{if(!c)throw Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return r(a.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var r=this.tryEntries[n];if(r.tryLoc<=this.prev&&i.call(r,"finallyLoc")&&this.prev<r.finallyLoc){var o=r;break}}o&&("break"===t||"continue"===t)&&o.tryLoc<=e&&e<=o.finallyLoc&&(o=null);var a=o?o.completion:{};return a.type=t,a.arg=e,o?(this.method="next",this.next=o.finallyLoc,w):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),w},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.finallyLoc===t)return this.complete(n.completion,n.afterLoc),E(n),w}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc===t){var r=n.completion;if("throw"===r.type){var o=r.arg;E(n)}return o}}throw Error("illegal catch attempt")},delegateYield:function(t,n,r){return this.delegate={iterator:T(t),resultName:n,nextLoc:r},"next"===this.method&&(this.arg=e),w}},n}t.exports=o,t.exports.__esModule=!0,t.exports.default=t.exports},735:t=>{function e(n){return t.exports=e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t.exports.__esModule=!0,t.exports.default=t.exports,e(n)}t.exports=e,t.exports.__esModule=!0,t.exports.default=t.exports},183:(t,e,n)=>{var r=n(24)();t.exports=r;try{regeneratorRuntime=r}catch(t){"object"==typeof globalThis?globalThis.regeneratorRuntime=r:Function("r","regeneratorRuntime = r")(r)}}},e={};function n(r){var o=e[r];if(void 0!==o)return o.exports;var a=e[r]={exports:{}};return t[r].call(a.exports,a,a.exports,n),a.exports}n.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return n.d(e,{a:e}),e},n.d=(t,e)=>{for(var r in e)n.o(e,r)&&!n.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:e[r]})},n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),n.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})};var r={};(()=>{"use strict";n.r(r),n.d(r,{HumanizeUtils:()=>E,QuestCondition:()=>at,QuestConditionViewModal:()=>H,QuestInfo:()=>st,QuestItem:()=>R,addCondition:()=>U,addReward:()=>Q,addRewardSelection:()=>z,extend:()=>ct,rewardValueConvert:()=>G,triggerCondition:()=>J,triggerConditions:()=>Z});const t=flarum.core.compat["common/app"];n.n(t)().initializers.add("xypp/forum-quests",(function(){console.log("[xypp/forum-quests] Hello, forum and admin!")}));const e=flarum.core.compat["forum/app"];var o=n.n(e);function a(t,e){return a=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},a(t,e)}function i(t,e){t.prototype=Object.create(e.prototype),t.prototype.constructor=t,a(t,e)}const s=flarum.core.compat["forum/components/Notification"];var u=function(t){function e(){return t.apply(this,arguments)||this}i(e,t);var n=e.prototype;return n.excerpt=function(){return""},n.icon=function(){return"fas fa-star"},n.href=function(){return o().route("quest_page")},n.content=function(){return o().translator.trans("xypp-forum-quests.forum.notification.quest_done",{name:this.attrs.notification.subject().name()})},e}(n.n(s)());const c=flarum.core.compat["common/extend"],l=flarum.core.compat["forum/components/NotificationGrid"];var f=n.n(l);const d=flarum.core.compat["common/components/LinkButton"];var p=n.n(d);const h=flarum.core.compat["forum/components/IndexPage"];var v=n.n(h);function y(t,e,n,r,o,a,i){try{var s=t[a](i),u=s.value}catch(t){return void n(t)}s.done?e(u):Promise.resolve(u).then(r,o)}function g(t){return function(){var e=this,n=arguments;return new Promise((function(r,o){var a=t.apply(e,n);function i(t){y(a,r,o,i,s,"next",t)}function s(t){y(a,r,o,i,s,"throw",t)}i(void 0)}))}}var w=n(183),b=n.n(w);const _=flarum.core.compat["common/components/Page"];var x=n.n(_);const $=flarum.core.compat["common/helpers/listItems"];var M=n.n($);const S=flarum.core.compat["common/components/LoadingIndicator"];var N=n.n(S);const q=flarum.core.compat["common/components/Button"];var A=n.n(q);function O(t,e,n){return t?e:n||""}const L=flarum.core.compat["common/utils/ItemList"];var k=n.n(L),E=function(){function t(){}t.getInstance=function(){return this.instance||(this.instance=new t),this.instance};var e=t.prototype;return e.getAllConditions=function(){return new(k())},e.getAllRewards=function(){return new(k())},e.getConditionName=function(t){return this.getAllConditions().has(t)?this.getAllConditions().get(t):t},e.getRewardName=function(t){return this.getAllRewards().has(t)?this.getAllRewards().get(t):t},e.getRewardValue=function(t,e){return e},e.rewardSelection=function(){var t=g(b().mark((function t(e){return b().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return","");case 1:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),e.humanizeCondition=function(t){var e=this;if(Array.isArray(t))return t.map((function(t){return e.humanizeCondition(t)}));if(t.alter_name)return t.alter_name;var n=t.span?o().translator.trans("xypp-forum-quests.forum.condition.span",{span:t.span}):"";return Array.isArray(n)&&(n=n.join("")),o().translator.trans("xypp-forum-quests.forum.condition.format",{b:m("b",null),name:this.getConditionName(t.name),operator:t.operator,value:t.value,span:n})},e.humanizeReward=function(t){var e=this;return Array.isArray(t)?t.map((function(t){return e.humanizeReward(t)})):t.alter_name?t.alter_name:o().translator.trans("xypp-forum-quests.forum.reward.format",{b:m("b",null),name:this.getRewardName(t.name),value:this.getRewardValue(t.name,t.value)})},e.humanizeReAvailable=function(t){var e=null==t?void 0:t.split(":");if(!e||e.length<2)return o().translator.trans("xypp-forum-quests.forum.re_available.none");var n=e[0],r=e[1];return o().translator.trans("xypp-forum-quests.forum.re_available."+n,{value:r})},t}();E.instance=void 0;const D=flarum.core.compat["common/Component"];var T=n.n(D),C=function(t){return t.EQUAL="=",t.NOT_EQUAL="!=",t.GREATER_THAN=">",t.LESS_THAN="<",t.GREATER_THAN_OR_EQUAL=">=",t.LESS_THAN_OR_EQUAL="<=",t}({}),R=function(t){function e(){for(var e,n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))||this).loading=!1,e.currentFilter="all",e.updatingCondition=!1,e}i(e,t);var n=e.prototype;return n.oninit=function(e){t.prototype.oninit.call(this,e)},n.oncreate=function(e){t.prototype.oncreate.call(this,e)},n.view=function(){var t=this,e=E.getInstance();return m("div",{className:this.attrs.item.done()?"quest-item-container quest-done":"quest-item-container"},m("div",{className:"quest-item-name"},this.attrs.item.name(),O(!!this.attrs.item.done(),m("span",{className:"quest-item-done"},o().translator.trans("xypp-forum-quests.forum.quest.done")+" ",m("i",{class:"fas fa-check"})),O(this.attrs.item.manual(),m(A(),{className:"Button Button--secondary Button--small",loading:this.updatingCondition,disabled:this.updatingCondition,onclick:this.updateCondition.bind(this)},O(!this.updatingCondition,m("i",{class:"fas fa-sync"})))))),m("div",{className:"quest-item-description"},this.attrs.item.description()),m("div",{className:"quest-item-time"},m("i",{className:"fas fa-clock"})," ",e.humanizeReAvailable(this.attrs.item.re_available())),m("div",{className:"quest-item-infos"},m("div",{className:"quest-item-condition"},m("div",{className:"quest-item-condition-title"},m("i",{class:"fas fa-tasks"})," ",o().translator.trans("xypp-forum-quests.forum.condition.condition")),this.attrs.item.condition().map((function(n){return m("div",{className:"quest-item-condition-line"},m("span",null,e.humanizeCondition(n)),t.progress(n))}))),m("div",{className:"quest-item-reward"},m("div",{className:"quest-item-reward-title"},m("i",{class:"fas fa-gift"})," ",o().translator.trans("xypp-forum-quests.forum.reward.reward")),e.humanizeReward(this.attrs.item.reward()).map((function(t){return m("div",null,t)})))),O(!!this.attrs.item.icon(),m("div",{className:"quest-item-icon"},m("i",{class:this.attrs.item.icon()}))))},n.progress=function(t){if(!this.attrs.conditionMap||!this.attrs.conditionMap[t.name])return"";var e=this.attrs.conditionMap[t.name].value();return t.span&&(e=this.attrs.conditionMap[t.name].getSpan(t.span)),this.conditionOp(e,t.operator,t.value)?m("span",{className:"quest-item-progress-satisfy"},"[",m("i",{class:"fas fa-check"}),"]"):m("span",{className:"quest-item-progress-not-satisfy"},"[",e,"/",t.value,"]")},n.conditionOp=function(t,e,n){switch(e){case C.EQUAL:return t==n;case C.GREATER_THAN:return t>n;case C.GREATER_THAN_OR_EQUAL:return t>=n;case C.LESS_THAN:return t<n;case C.LESS_THAN_OR_EQUAL:return t<=n;case C.NOT_EQUAL:return t!=n}},n.updateCondition=function(){var t=g(b().mark((function t(){var e;return b().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return this.updatingCondition=!0,m.redraw(),t.prev=2,t.next=5,o().request({method:"GET",url:o().forum.attribute("apiUrl")+"/quest-infos/"+this.attrs.item.id()+"/update"});case 5:return t.next=7,o().store.find("quest-infos",this.attrs.item.id());case 7:e=t.sent,this.attrs.item.pushAttributes(e.data.attributes);case 9:return t.prev=9,this.updatingCondition=!1,m.redraw(),t.finish(9);case 13:case"end":return t.stop()}}),t,this,[[2,,9,13]])})));return function(){return t.apply(this,arguments)}}(),e}(T());const j=flarum.core.compat["common/components/Select"];var Y=n.n(j);const P=flarum.core.compat["common/components/Modal"];var I=n.n(P),H=function(t){function e(){for(var e,n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))||this).span=0,e}i(e,t);var n=e.prototype;return n.className=function(){return"Modal"},n.title=function(){return o().translator.trans("xypp-forum-quests.forum.condition_view.title")},n.content=function(){var t=this;return m("div",{className:"Modal-body"},m("table",{className:"Table ConditionViewTable"},m("thead",null,m("tr",null,m("th",null,o().translator.trans("xypp-forum-quests.forum.condition_view.name")),m("th",null,o().translator.trans("xypp-forum-quests.forum.condition_view.value")),m("th",null,o().translator.trans("xypp-forum-quests.forum.condition_view.span")))),m("tbody",null,this.attrs.items.map((function(e,n){return m("tr",null,m("td",null,E.getInstance().getConditionName(e.name())),m("td",null,e.value()),m("td",null,e.getSpan(t.span)))})),m("tr",null,m("td",null,o().translator.trans("xypp-forum-quests.forum.condition_view.set_span")),m("td",null),m("td",null,m("input",{type:"number",className:"FormControl",step:"any",value:this.span,oninput:function(e){t.span=parseInt(e.target.value),m.redraw()}}))))))},e}(I()),F=function(t){function e(){for(var e,n=arguments.length,r=new Array(n),a=0;a<n;a++)r[a]=arguments[a];return(e=t.call.apply(t,[this].concat(r))||this).REG_STATUS={all:o().translator.trans("xypp-forum-quests.forum.quest_done.all"),true:o().translator.trans("xypp-forum-quests.forum.quest_done.true"),false:o().translator.trans("xypp-forum-quests.forum.quest_done.false")},e.loading=!1,e.more=!1,e.currentFilter="all",e.offset=0,e.items=[],e.conditions=[],e.conditionLoading=!1,e.conditionMap={},e}i(e,t);var n=e.prototype;return n.oninit=function(e){t.prototype.oninit.call(this,e)},n.oncreate=function(e){t.prototype.oncreate.call(this,e),this.loadMore(),o().session.user&&this.loadConditions()},n.view=function(){var t=this;return m("div",null,v().prototype.hero(),m("div",{className:"container"},m("div",{className:"sideNavContainer"},m("nav",{className:"IndexPage-nav sideNav"},m("ul",null,M()(v().prototype.sidebarItems().toArray()))),m("div",{className:"QuestPageContainer"},m("div",{className:"QuestPageOpt"},m(Y(),{options:this.REG_STATUS,value:this.currentFilter,onchange:function(e){return t.reloadAll(e)}.bind(this)}),m(A(),{className:"Button Button--primary",onclick:this.conditionView.bind(this)},o().translator.trans("xypp-forum-quests.forum.condition_view.button"))),m("div",{className:"QuestPageContent"},this.items.map((function(e){return m(R,{item:e,conditionMap:t.conditionMap})}))),m("div",{className:"QuestPageLoad"},O(this.loading,m(N(),null),O(this.more,m(A(),{className:"Button Button--primary"},o().translator.trans("xypp-forum-quests.forum.quest.load_more")))))))))},n.loadMore=function(){var t=g(b().mark((function t(){var e,n;return b().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return this.loading=!0,m.redraw(),t.next=4,o().store.find("quest-infos",{page:{offset:this.offset,limit:10},filter:this.currentFilter});case 4:n=t.sent,(e=this.items).push.apply(e,n),this.loading=!1,n.length<10&&(this.more=!1),this.offset+=n.length,m.redraw();case 10:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}(),n.loadConditions=function(){var t=g(b().mark((function t(){var e=this;return b().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(this.conditionLoading=!0,m.redraw(),this.conditions=o().store.all("quest-condition"),0!=this.conditions.length){t.next=7;break}return t.next=6,o().store.find("quest-condition");case 6:this.conditions=t.sent;case 7:this.conditions.forEach((function(t){e.conditionMap[t.name()]=t})),this.conditionLoading=!1,m.redraw();case 10:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}(),n.reloadAll=function(t){this.currentFilter=t,this.items=[],this.offset=0,this.more=!0,this.loadMore()},n.conditionView=function(){o().modal.show(H,{items:this.conditions},!0)},e}(x());function U(t,e){(0,c.extend)(E.prototype,"getAllConditions",(function(n){n.add(t,e)}))}function Q(t,e){(0,c.extend)(E.prototype,"getAllRewards",(function(n){n.add(t,e)}))}function G(t,e){(0,c.override)(E.prototype,"getRewardValue",(function(n,r,o){return t===r?e(o):n(r,o)}))}function z(t,e){(0,c.override)(E.prototype,"rewardSelection",function(){var n=g(b().mark((function n(r,o){return b().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(t!==o){n.next=4;break}return n.abrupt("return",e());case 4:return n.abrupt("return",r(o));case 5:case"end":return n.stop()}}),n)})));return function(t,e){return n.apply(this,arguments)}}())}var B=function(t){function e(){for(var e,n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))||this).selection="",e.done=!1,e}i(e,t);var n=e.prototype;return n.oninit=function(e){t.prototype.oninit.call(this,e),this.selection=this.attrs.items[Object.keys(this.attrs.items)[0]]},n.className=function(){return"Modal"},n.title=function(){return this.attrs.title},n.oncreate=function(e){t.prototype.oncreate.call(this,e)},n.onremove=function(e){t.prototype.onremove.call(this,e),this.done||this.attrs.cancel()},n.content=function(){var t=this;return m("div",{className:"Modal-body"},m("div",{className:"Form"},m("div",{className:"Form-group"},m(Y(),{className:"FormControl",value:this.selection,options:this.attrs.items,onchange:function(e){t.selection=e}.bind(this)})),m("div",{className:"Form-group"},m(A(),{class:"Button Button--primary",type:"submit",loading:this.loading},this.attrs.button))))},n.onsubmit=function(){var t=g(b().mark((function t(e){return b().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:e.preventDefault(),this.done=!0,this.attrs.callback(this.selection);case 3:case"end":return t.stop()}}),t,this)})));return function(e){return t.apply(this,arguments)}}(),e.open=function(t,n,r,o){return new Promise((function(a,i){t.modal.show(e,{items:n,title:r,button:o,cancel:function(){i()},callback:function(e){a(e),t.modal.close()}},!0)}))},e}(I());const V=flarum.core.compat["forum/components/UserPage"];var W=n.n(V);function J(t,e){var n;return Z(((n={})[t]=e,n))}function Z(t){var e=Object.keys(t).map((function(e){return{name:e,value:t[e]}}));return o().request({url:o().forum.attribute("apiUrl")+"/quest-condition",method:"POST",body:{data:e}})}var K={},X={};const tt=flarum.core.compat["common/Model"];var et=n.n(tt),nt=n(912),rt=n.n(nt);function ot(t){if(!t)return null;try{return JSON.parse(t)}catch(t){return null}}var at=function(t){function e(){for(var e,n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))||this).name=et().attribute("name"),e.value=et().attribute("value"),e.accumulation=et().attribute("accumulation",ot),e}return i(e,t),e.prototype.getSpan=function(t){var e=this.accumulation();if(!e||t<1)return 0;var n=rt()(rt()().format("YYYYMMDD"),"YYYYMMDD");1!=t&&(n=n.subtract(t-1,"day"));var r=0;return Object.keys(e).forEach((function(t){if("all"!=t&&"rest"!=t){var o=rt()(t,"YYYYMMDD");(o.isAfter(n)||o.isSame(n))&&(r+=e[t])}})),r},e}(et());function it(t){if(!t)return[];try{return JSON.parse(t)}catch(t){return[]}}var st=function(t){function e(){for(var e,n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))||this).name=et().attribute("name"),e.createdAt=et().attribute("createdAt",et().transformDate),e.updatedAt=et().attribute("updatedAt",et().transformDate),e.description=et().attribute("description"),e.condition=et().attribute("conditions",it),e.reward=et().attribute("rewards",it),e.re_available=et().attribute("re_available"),e.done=et().attribute("done"),e.icon=et().attribute("icon"),e.hidden=et().attribute("hidden"),e.manual=et().attribute("manual"),e}return i(e,t),e}(et());o().initializers.add("xypp/forum-quests",(function(){var t,e;t=o(),e="xypp-forum-quests."+"forum"+".integration",U("post_count",t.translator.trans(e+".condition.post_count")+""),U("user_page_view",t.translator.trans(e+".condition.user_page_view")+""),U("avatar_changed",t.translator.trans(e+".condition.avatar_changed")+""),U("email_changed",t.translator.trans(e+".condition.email_changed")+""),U("discussion_count",t.translator.trans(e+".condition.discussion_count")+""),U("discussion_replied",t.translator.trans(e+".condition.discussion_replied")+""),U("reloads",t.translator.trans(e+".condition.reloads")+""),flarum.extensions["xypp-store"]&&U("store_purchased",t.translator.trans(e+".condition.store_purchased")+""),flarum.extensions["flarum-likes"]&&(U("like_recv",t.translator.trans(e+".condition.like_recv")+""),U("like_send",t.translator.trans(e+".condition.like_send")+"")),flarum.extensions["v17development-user-badges"]&&U("badge_received",t.translator.trans(e+".condition.badge_received")+""),flarum.extensions["michaelbelgium-discussion-views"]&&U("discussion_views",t.translator.trans(e+".condition.discussion_views")+""),Q("money",t.translator.trans(e+".reward.money")+""),flarum.extensions["xypp-store"]&&function(t,e){var n={};Q("store_item",t.translator.trans(e+".reward.store_item")+""),G("store_item",(function(r){var o=t.store.getById("store-item",r);return o?o.attribute("name"):void 0===n[r]?(n[r]=!0,t.store.find("store-item",r).then((function(){m.redraw()})).catch((function(){n[r]=!1})),t.translator.trans(e+".reward.store_item_loading")+""):!1===n[r]?t.translator.trans(e+".reward.store_item_error")+"":t.translator.trans(e+".reward.store_item_loading")+""})),z("store_item",g(b().mark((function n(){var r,o;return b().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,t.store.find("store-item");case 2:return r=n.sent,o=r.reduce((function(t,e){return t[e.id()]=e.attribute("name"),t}),{}),n.next=6,B.open(t,o,t.translator.trans(e+".reward.store_item_select"),t.translator.trans(e+".reward.store_item_select_button"));case 6:return n.abrupt("return",n.sent);case 7:case"end":return n.stop()}}),n)}))))}(t,e),flarum.extensions["v17development-user-badges"]&&function(t,e){var n={};Q("badge",t.translator.trans(e+".reward.badge")+""),G("badge",(function(r){var o=t.store.getById("badges",r);return o?o.attribute("name"):void 0===n[r]?(n[r]=!0,t.store.find("badges",r).then((function(){m.redraw()})).catch((function(){n[r]=!1})),t.translator.trans(e+".reward.badge_loading")+""):!1===n[r]?t.translator.trans(e+".reward.badge_error")+"":t.translator.trans(e+".reward.badge_loading")+""})),z("badge",g(b().mark((function n(){var r,o;return b().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,t.store.find("badges");case 2:return r=n.sent,o=r.reduce((function(t,e){return t[e.id()]=e.attribute("name"),t}),{}),n.next=6,B.open(t,o,t.translator.trans(e+".reward.badge_select"),t.translator.trans(e+".reward.badge_select_button"));case 6:return n.abrupt("return",n.sent);case 7:case"end":return n.stop()}}),n)}))))}(t,e),(0,c.extend)(W().prototype,"show",(function(){var t,e,n,r,a,i;null!=(t=o().session)&&t.user&&(n="user_page_view",r=null==(e=this.user)?void 0:e.slug(),a=function(t){return n=function(t){return J(t,1)},K[e=t]=K[e]||0,void(K[e]<5&&(K[e]++,n(e)));var e,n},(i=X[n]=X[n]||{})[r]||(i[r]=!0,a(n)))})),o().notificationComponents.quest_done=u,o().routes.quest_page={path:"/quest_page",component:F},(0,c.extend)(f().prototype,"notificationTypes",(function(t){t.add("postLiked",{name:"postLiked",icon:"far fa-thumbs-up",label:o().translator.trans("xypp-forum-quests.forum.notification.quest_done_label")})})),(0,c.extend)(v().prototype,"navItems",(function(t){t.add("quest_page",p().component({href:o().route("quest_page"),icon:"fas fa-tasks"},[o().translator.trans("xypp-forum-quests.forum.quest.quest")]),10)}))}));const ut=flarum.core.compat["common/extenders"],ct=[(new(n.n(ut)().Store)).add("quest-infos",st).add("quest-condition",at)]})(),module.exports=r})();
//# sourceMappingURL=forum.js.map