/*
  Split.js - v1.3.5
  MIT License
  https://github.com/nathancahill/Split.js
*/
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):e.Split=t()}(this,function(){"use strict";var e=window,t=e.document,n="addEventListener",i="removeEventListener",r="getBoundingClientRect",s=function(){return!1},o=e.attachEvent&&!e[n],a=["","-webkit-","-moz-","-o-"].filter(function(e){var n=t.createElement("div");return n.style.cssText="width:"+e+"calc(9px)",!!n.style.length}).shift()+"calc",l=function(e){return"string"==typeof e||e instanceof String?t.querySelector(e):e};return function(u,c){function z(e,t,n){var i=A(y,t,n);Object.keys(i).forEach(function(t){return e.style[t]=i[t]})}function h(e,t){var n=B(y,t);Object.keys(n).forEach(function(t){return e.style[t]=n[t]})}function f(e){var t=E[this.a],n=E[this.b],i=t.size+n.size;t.size=e/this.size*i,n.size=i-e/this.size*i,z(t.element,t.size,this.aGutterSize),z(n.element,n.size,this.bGutterSize)}function m(e){var t;this.dragging&&((t="touches"in e?e.touches[0][b]-this.start:e[b]-this.start)<=E[this.a].minSize+M+this.aGutterSize?t=E[this.a].minSize+this.aGutterSize:t>=this.size-(E[this.b].minSize+M+this.bGutterSize)&&(t=this.size-(E[this.b].minSize+this.bGutterSize)),f.call(this,t),c.onDrag&&c.onDrag())}function g(){var e=E[this.a].element,t=E[this.b].element;this.size=e[r]()[y]+t[r]()[y]+this.aGutterSize+this.bGutterSize,this.start=e[r]()[G]}function d(){var t=this,n=E[t.a].element,r=E[t.b].element;t.dragging&&c.onDragEnd&&c.onDragEnd(),t.dragging=!1,e[i]("mouseup",t.stop),e[i]("touchend",t.stop),e[i]("touchcancel",t.stop),t.parent[i]("mousemove",t.move),t.parent[i]("touchmove",t.move),delete t.stop,delete t.move,n[i]("selectstart",s),n[i]("dragstart",s),r[i]("selectstart",s),r[i]("dragstart",s),n.style.userSelect="",n.style.webkitUserSelect="",n.style.MozUserSelect="",n.style.pointerEvents="",r.style.userSelect="",r.style.webkitUserSelect="",r.style.MozUserSelect="",r.style.pointerEvents="",t.gutter.style.cursor="",t.parent.style.cursor=""}function S(t){var i=this,r=E[i.a].element,o=E[i.b].element;!i.dragging&&c.onDragStart&&c.onDragStart(),t.preventDefault(),i.dragging=!0,i.move=m.bind(i),i.stop=d.bind(i),e[n]("mouseup",i.stop),e[n]("touchend",i.stop),e[n]("touchcancel",i.stop),i.parent[n]("mousemove",i.move),i.parent[n]("touchmove",i.move),r[n]("selectstart",s),r[n]("dragstart",s),o[n]("selectstart",s),o[n]("dragstart",s),r.style.userSelect="none",r.style.webkitUserSelect="none",r.style.MozUserSelect="none",r.style.pointerEvents="none",o.style.userSelect="none",o.style.webkitUserSelect="none",o.style.MozUserSelect="none",o.style.pointerEvents="none",i.gutter.style.cursor=j,i.parent.style.cursor=j,g.call(i)}function v(e){e.forEach(function(t,n){if(n>0){var i=F[n-1],r=E[i.a],s=E[i.b];r.size=e[n-1],s.size=t,z(r.element,r.size,i.aGutterSize),z(s.element,s.size,i.bGutterSize)}})}function p(){F.forEach(function(e){e.parent.removeChild(e.gutter),E[e.a].element.style[y]="",E[e.b].element.style[y]=""})}void 0===c&&(c={});var y,b,G,E,w=l(u[0]).parentNode,D=e.getComputedStyle(w).flexDirection,U=c.sizes||u.map(function(){return 100/u.length}),k=void 0!==c.minSize?c.minSize:100,x=Array.isArray(k)?k:u.map(function(){return k}),L=void 0!==c.gutterSize?c.gutterSize:10,M=void 0!==c.snapOffset?c.snapOffset:30,O=c.direction||"horizontal",j=c.cursor||("horizontal"===O?"ew-resize":"ns-resize"),C=c.gutter||function(e,n){var i=t.createElement("div");return i.className="gutter gutter-"+n,i},A=c.elementStyle||function(e,t,n){var i={};return"string"==typeof t||t instanceof String?i[e]=t:i[e]=o?t+"%":a+"("+t+"% - "+n+"px)",i},B=c.gutterStyle||function(e,t){return n={},n[e]=t+"px",n;var n};"horizontal"===O?(y="width","clientWidth",b="clientX",G="left","paddingLeft"):"vertical"===O&&(y="height","clientHeight",b="clientY",G="top","paddingTop");var F=[];return E=u.map(function(e,t){var i,s={element:l(e),size:U[t],minSize:x[t]};if(t>0&&(i={a:t-1,b:t,dragging:!1,isFirst:1===t,isLast:t===u.length-1,direction:O,parent:w},i.aGutterSize=L,i.bGutterSize=L,i.isFirst&&(i.aGutterSize=L/2),i.isLast&&(i.bGutterSize=L/2),"row-reverse"===D||"column-reverse"===D)){var a=i.a;i.a=i.b,i.b=a}if(!o&&t>0){var c=C(t,O);h(c,L),c[n]("mousedown",S.bind(i)),c[n]("touchstart",S.bind(i)),w.insertBefore(c,s.element),i.gutter=c}0===t||t===u.length-1?z(s.element,s.size,L/2):z(s.element,s.size,L);var f=s.element[r]()[y];return f<s.minSize&&(s.minSize=f),t>0&&F.push(i),s}),o?{setSizes:v,destroy:p}:{setSizes:v,getSizes:function(){return E.map(function(e){return e.size})},collapse:function(e){if(e===F.length){var t=F[e-1];g.call(t),o||f.call(t,t.size-t.bGutterSize)}else{var n=F[e];g.call(n),o||f.call(n,n.aGutterSize)}},destroy:p}}});

///////////////////////////////////////////////

///////////////////////////////////////////////
// Copyright (c) 2013 Pieroxy <pieroxy@pieroxy.net>
// This work is free. You can redistribute it and/or modify it
// under the terms of the WTFPL, Version 2
// For more information see LICENSE.txt or http://www.wtfpl.net/
//
// For more information, the home page:
// http://pieroxy.net/blog/pages/lz-string/testing.html
//
// LZ-based compression algorithm, version 1.4.4
var LZString=function(){var o=String.fromCharCode,i={};var n={decompressFromBase64:function(o){return null==o?"":""==o?null:n._decompress(o.length,32,function(n){return function(o,n){if(!i[o]){i[o]={};for(var t=0;t<o.length;t++)i[o][o.charAt(t)]=t}return i[o][n]}("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",o.charAt(n))})},_decompress:function(i,n,t){var r,e,a,s,p,u,l,f=[],c=4,d=4,h=3,v="",g=[],m={val:t(0),position:n,index:1};for(r=0;r<3;r+=1)f[r]=r;for(a=0,p=Math.pow(2,2),u=1;u!=p;)s=m.val&m.position,m.position>>=1,0==m.position&&(m.position=n,m.val=t(m.index++)),a|=(s>0?1:0)*u,u<<=1;switch(a){case 0:for(a=0,p=Math.pow(2,8),u=1;u!=p;)s=m.val&m.position,m.position>>=1,0==m.position&&(m.position=n,m.val=t(m.index++)),a|=(s>0?1:0)*u,u<<=1;l=o(a);break;case 1:for(a=0,p=Math.pow(2,16),u=1;u!=p;)s=m.val&m.position,m.position>>=1,0==m.position&&(m.position=n,m.val=t(m.index++)),a|=(s>0?1:0)*u,u<<=1;l=o(a);break;case 2:return""}for(f[3]=l,e=l,g.push(l);;){if(m.index>i)return"";for(a=0,p=Math.pow(2,h),u=1;u!=p;)s=m.val&m.position,m.position>>=1,0==m.position&&(m.position=n,m.val=t(m.index++)),a|=(s>0?1:0)*u,u<<=1;switch(l=a){case 0:for(a=0,p=Math.pow(2,8),u=1;u!=p;)s=m.val&m.position,m.position>>=1,0==m.position&&(m.position=n,m.val=t(m.index++)),a|=(s>0?1:0)*u,u<<=1;f[d++]=o(a),l=d-1,c--;break;case 1:for(a=0,p=Math.pow(2,16),u=1;u!=p;)s=m.val&m.position,m.position>>=1,0==m.position&&(m.position=n,m.val=t(m.index++)),a|=(s>0?1:0)*u,u<<=1;f[d++]=o(a),l=d-1,c--;break;case 2:return g.join("")}if(0==c&&(c=Math.pow(2,h),h++),f[l])v=f[l];else{if(l!==d)return null;v=e+e.charAt(0)}g.push(v),f[d++]=e+v.charAt(0),e=v,0==--c&&(c=Math.pow(2,h),h++)}}};return n}();"function"==typeof define&&define.amd?define(function(){return LZString}):"undefined"!=typeof module&&null!=module?module.exports=LZString:"undefined"!=typeof angular&&null!=angular&&angular.module("LZString",[]).factory("LZString",function(){return LZString});
///////////////////////////////////////////////

///////////////////////////////////////////////
/*!
 * PEP v0.4.3 | https://github.com/jquery/PEP
 * Copyright jQuery Foundation and other contributors | http://jquery.org/license
 */
!function(a,b){"object"==typeof exports&&"undefined"!=typeof module?module.exports=b():"function"==typeof define&&define.amd?define(b):a.PointerEventsPolyfill=b()}(this,function(){"use strict";function a(a,b){b=b||Object.create(null);var c=document.createEvent("Event");c.initEvent(a,b.bubbles||!1,b.cancelable||!1);
for(var d,e=2;e<m.length;e++)d=m[e],c[d]=b[d]||n[e];c.buttons=b.buttons||0;
var f=0;return f=b.pressure&&c.buttons?b.pressure:c.buttons?.5:0,c.x=c.clientX,c.y=c.clientY,c.pointerId=b.pointerId||0,c.width=b.width||0,c.height=b.height||0,c.pressure=f,c.tiltX=b.tiltX||0,c.tiltY=b.tiltY||0,c.twist=b.twist||0,c.tangentialPressure=b.tangentialPressure||0,c.pointerType=b.pointerType||"",c.hwTimestamp=b.hwTimestamp||0,c.isPrimary=b.isPrimary||!1,c}function b(){this.array=[],this.size=0}function c(a,b,c,d){this.addCallback=a.bind(d),this.removeCallback=b.bind(d),this.changedCallback=c.bind(d),A&&(this.observer=new A(this.mutationWatcher.bind(this)))}function d(a){return"body /shadow-deep/ "+e(a)}function e(a){return'[touch-action="'+a+'"]'}function f(a){return"{ -ms-touch-action: "+a+"; touch-action: "+a+"; }"}function g(){if(F){D.forEach(function(a){String(a)===a?(E+=e(a)+f(a)+"\n",G&&(E+=d(a)+f(a)+"\n")):(E+=a.selectors.map(e)+f(a.rule)+"\n",G&&(E+=a.selectors.map(d)+f(a.rule)+"\n"))});var a=document.createElement("style");a.textContent=E,document.head.appendChild(a)}}function h(){if(!window.PointerEvent){if(window.PointerEvent=a,window.navigator.msPointerEnabled){var b=window.navigator.msMaxTouchPoints;Object.defineProperty(window.navigator,"maxTouchPoints",{value:b,enumerable:!0}),u.registerSource("ms",_)}else Object.defineProperty(window.navigator,"maxTouchPoints",{value:0,enumerable:!0}),u.registerSource("mouse",N),void 0!==window.ontouchstart&&u.registerSource("touch",V);u.register(document)}}function i(a){if(!u.pointermap.has(a)){var b=new Error("InvalidPointerId");throw b.name="InvalidPointerId",b}}function j(a){for(var b=a.parentNode;b&&b!==a.ownerDocument;)b=b.parentNode;if(!b){var c=new Error("InvalidStateError");throw c.name="InvalidStateError",c}}function k(a){var b=u.pointermap.get(a);return 0!==b.buttons}function l(){window.Element&&!Element.prototype.setPointerCapture&&Object.defineProperties(Element.prototype,{setPointerCapture:{value:W},releasePointerCapture:{value:X},hasPointerCapture:{value:Y}})}
var m=["bubbles","cancelable","view","detail","screenX","screenY","clientX","clientY","ctrlKey","altKey","shiftKey","metaKey","button","relatedTarget","pageX","pageY"],n=[!1,!1,null,null,0,0,0,0,!1,!1,!1,!1,0,null,0,0],o=window.Map&&window.Map.prototype.forEach,p=o?Map:b;b.prototype={set:function(a,b){return void 0===b?this["delete"](a):(this.has(a)||this.size++,void(this.array[a]=b))},has:function(a){return void 0!==this.array[a]},"delete":function(a){this.has(a)&&(delete this.array[a],this.size--)},get:function(a){return this.array[a]},clear:function(){this.array.length=0,this.size=0},forEach:function(a,b){return this.array.forEach(function(c,d){a.call(b,c,d,this)},this)}};var q=["bubbles","cancelable","view","detail","screenX","screenY","clientX","clientY","ctrlKey","altKey","shiftKey","metaKey","button","relatedTarget","buttons","pointerId","width","height","pressure","tiltX","tiltY","pointerType","hwTimestamp","isPrimary","type","target","currentTarget","which","pageX","pageY","timeStamp"],r=[!1,!1,null,null,0,0,0,0,!1,!1,!1,!1,0,null,0,0,0,0,0,0,0,"",0,!1,"",null,null,0,0,0,0],s={pointerover:1,pointerout:1,pointerenter:1,pointerleave:1},t="undefined"!=typeof SVGElementInstance,u={pointermap:new p,eventMap:Object.create(null),captureInfo:Object.create(null),eventSources:Object.create(null),eventSourceList:[],registerSource:function(a,b){var c=b,d=c.events;d&&(d.forEach(function(a){c[a]&&(this.eventMap[a]=c[a].bind(c))},this),this.eventSources[a]=c,this.eventSourceList.push(c))},register:function(a){for(var b,c=this.eventSourceList.length,d=0;d<c&&(b=this.eventSourceList[d]);d++)
b.register.call(b,a)},unregister:function(a){for(var b,c=this.eventSourceList.length,d=0;d<c&&(b=this.eventSourceList[d]);d++)
b.unregister.call(b,a)},contains:function(a,b){try{return a.contains(b)}catch(c){return!1}},down:function(a){a.bubbles=!0,this.fireEvent("pointerdown",a)},move:function(a){a.bubbles=!0,this.fireEvent("pointermove",a)},up:function(a){a.bubbles=!0,this.fireEvent("pointerup",a)},enter:function(a){a.bubbles=!1,this.fireEvent("pointerenter",a)},leave:function(a){a.bubbles=!1,this.fireEvent("pointerleave",a)},over:function(a){a.bubbles=!0,this.fireEvent("pointerover",a)},out:function(a){a.bubbles=!0,this.fireEvent("pointerout",a)},cancel:function(a){a.bubbles=!0,this.fireEvent("pointercancel",a)},leaveOut:function(a){this.out(a),this.propagate(a,this.leave,!1)},enterOver:function(a){this.over(a),this.propagate(a,this.enter,!0)},eventHandler:function(a){if(!a._handledByPE){var b=a.type,c=this.eventMap&&this.eventMap[b];c&&c(a),a._handledByPE=!0}},listen:function(a,b){b.forEach(function(b){this.addEvent(a,b)},this)},unlisten:function(a,b){b.forEach(function(b){this.removeEvent(a,b)},this)},addEvent:function(a,b){a.addEventListener(b,this.boundHandler)},removeEvent:function(a,b){a.removeEventListener(b,this.boundHandler)},makeEvent:function(b,c){this.captureInfo[c.pointerId]&&(c.relatedTarget=null);var d=new a(b,c);return c.preventDefault&&(d.preventDefault=c.preventDefault),d._target=d._target||c.target,d},fireEvent:function(a,b){var c=this.makeEvent(a,b);return this.dispatchEvent(c)},cloneEvent:function(a){for(var b,c=Object.create(null),d=0;d<q.length;d++)b=q[d],c[b]=a[b]||r[d],!t||"target"!==b&&"relatedTarget"!==b||c[b]instanceof SVGElementInstance&&(c[b]=c[b].correspondingUseElement);return a.preventDefault&&(c.preventDefault=function(){a.preventDefault()}),c},getTarget:function(a){var b=this.captureInfo[a.pointerId];return b?a._target!==b&&a.type in s?void 0:b:a._target},propagate:function(a,b,c){for(var d=a.target,e=[];d!==document&&!d.contains(a.relatedTarget);) if(e.push(d),d=d.parentNode,!d)return;c&&e.reverse(),e.forEach(function(c){a.target=c,b.call(this,a)},this)},setCapture:function(b,c,d){this.captureInfo[b]&&this.releaseCapture(b,d),this.captureInfo[b]=c,this.implicitRelease=this.releaseCapture.bind(this,b,d),document.addEventListener("pointerup",this.implicitRelease),document.addEventListener("pointercancel",this.implicitRelease);var e=new a("gotpointercapture");e.pointerId=b,e._target=c,d||this.asyncDispatchEvent(e)},releaseCapture:function(b,c){var d=this.captureInfo[b];if(d){this.captureInfo[b]=void 0,document.removeEventListener("pointerup",this.implicitRelease),document.removeEventListener("pointercancel",this.implicitRelease);var e=new a("lostpointercapture");e.pointerId=b,e._target=d,c||this.asyncDispatchEvent(e)}},dispatchEvent:/*scope.external.dispatchEvent || */function(a){var b=this.getTarget(a);if(b)return b.dispatchEvent(a)},asyncDispatchEvent:function(a){requestAnimationFrame(this.dispatchEvent.bind(this,a))}};u.boundHandler=u.eventHandler.bind(u);var v={shadow:function(a){if(a)return a.shadowRoot||a.webkitShadowRoot},canTarget:function(a){return a&&Boolean(a.elementFromPoint)},targetingShadow:function(a){var b=this.shadow(a);if(this.canTarget(b))return b},olderShadow:function(a){var b=a.olderShadowRoot;if(!b){var c=a.querySelector("shadow");c&&(b=c.olderShadowRoot)}return b},allShadows:function(a){for(var b=[],c=this.shadow(a);c;)b.push(c),c=this.olderShadow(c);return b},searchRoot:function(a,b,c){if(a){var d,e,f=a.elementFromPoint(b,c);for(e=this.targetingShadow(f);e;){if(d=e.elementFromPoint(b,c)){var g=this.targetingShadow(d);return this.searchRoot(g,b,c)||d} e=this.olderShadow(e)} return f}},owner:function(a){
for(var b=a;b.parentNode;)b=b.parentNode;
return b.nodeType!==Node.DOCUMENT_NODE&&b.nodeType!==Node.DOCUMENT_FRAGMENT_NODE&&(b=document),b},findTarget:function(a){var b=a.clientX,c=a.clientY,d=this.owner(a.target);
return d.elementFromPoint(b,c)||(d=document),this.searchRoot(d,b,c)}},w=Array.prototype.forEach.call.bind(Array.prototype.forEach),x=Array.prototype.map.call.bind(Array.prototype.map),y=Array.prototype.slice.call.bind(Array.prototype.slice),z=Array.prototype.filter.call.bind(Array.prototype.filter),A=window.MutationObserver||window.WebKitMutationObserver,B="[touch-action]",C={subtree:!0,childList:!0,attributes:!0,attributeOldValue:!0,attributeFilter:["touch-action"]};c.prototype={watchSubtree:function(a){
//
this.observer&&v.canTarget(a)&&this.observer.observe(a,C)},enableOnSubtree:function(a){this.watchSubtree(a),a===document&&"complete"!==document.readyState?this.installOnLoad():this.installNewSubtree(a)},installNewSubtree:function(a){w(this.findElements(a),this.addElement,this)},findElements:function(a){return a.querySelectorAll?a.querySelectorAll(B):[]},removeElement:function(a){this.removeCallback(a)},addElement:function(a){this.addCallback(a)},elementChanged:function(a,b){this.changedCallback(a,b)},concatLists:function(a,b){return a.concat(y(b))},
installOnLoad:function(){document.addEventListener("readystatechange",function(){"complete"===document.readyState&&this.installNewSubtree(document)}.bind(this))},isElement:function(a){return a.nodeType===Node.ELEMENT_NODE},flattenMutationTree:function(a){
var b=x(a,this.findElements,this);
return b.push(z(a,this.isElement)),b.reduce(this.concatLists,[])},mutationWatcher:function(a){a.forEach(this.mutationHandler,this)},mutationHandler:function(a){if("childList"===a.type){var b=this.flattenMutationTree(a.addedNodes);b.forEach(this.addElement,this);var c=this.flattenMutationTree(a.removedNodes);c.forEach(this.removeElement,this)}else"attributes"===a.type&&this.elementChanged(a.target,a.oldValue)}};var D=["none","auto","pan-x","pan-y",{rule:"pan-x pan-y",selectors:["pan-x pan-y","pan-y pan-x"]}],E="",F=window.PointerEvent||window.MSPointerEvent,G=!window.ShadowDOMPolyfill&&document.head.createShadowRoot,H=u.pointermap,I=25,J=[1,4,2,8,16],K=!1;try{K=1===new MouseEvent("test",{buttons:1}).buttons}catch(L){}
var M,N={POINTER_ID:1,POINTER_TYPE:"mouse",events:["mousedown","mousemove","mouseup","mouseover","mouseout"],register:function(a){u.listen(a,this.events)},unregister:function(a){u.unlisten(a,this.events)},lastTouches:[],
isEventSimulatedFromTouch:function(a){for(var b,c=this.lastTouches,d=a.clientX,e=a.clientY,f=0,g=c.length;f<g&&(b=c[f]);f++){
var h=Math.abs(d-b.x),i=Math.abs(e-b.y);if(h<=I&&i<=I)return!0}},prepareEvent:function(a){var b=u.cloneEvent(a),c=b.preventDefault;return b.preventDefault=function(){a.preventDefault(),c()},b.pointerId=this.POINTER_ID,b.isPrimary=!0,b.pointerType=this.POINTER_TYPE,b},prepareButtonsForMove:function(a,b){var c=H.get(this.POINTER_ID);
0!==b.which&&c?a.buttons=c.buttons:a.buttons=0,b.buttons=a.buttons},mousedown:function(a){if(!this.isEventSimulatedFromTouch(a)){var b=H.get(this.POINTER_ID),c=this.prepareEvent(a);K||(c.buttons=J[c.button],b&&(c.buttons|=b.buttons),a.buttons=c.buttons),H.set(this.POINTER_ID,a),b&&0!==b.buttons?u.move(c):u.down(c)}},mousemove:function(a){if(!this.isEventSimulatedFromTouch(a)){var b=this.prepareEvent(a);K||this.prepareButtonsForMove(b,a),b.button=-1,H.set(this.POINTER_ID,a),u.move(b)}},mouseup:function(a){if(!this.isEventSimulatedFromTouch(a)){var b=H.get(this.POINTER_ID),c=this.prepareEvent(a);if(!K){var d=J[c.button];
c.buttons=b?b.buttons&~d:0,a.buttons=c.buttons}H.set(this.POINTER_ID,a),
c.buttons&=~J[c.button],0===c.buttons?u.up(c):u.move(c)}},mouseover:function(a){if(!this.isEventSimulatedFromTouch(a)){var b=this.prepareEvent(a);K||this.prepareButtonsForMove(b,a),b.button=-1,H.set(this.POINTER_ID,a),u.enterOver(b)}},mouseout:function(a){if(!this.isEventSimulatedFromTouch(a)){var b=this.prepareEvent(a);K||this.prepareButtonsForMove(b,a),b.button=-1,u.leaveOut(b)}},cancel:function(a){var b=this.prepareEvent(a);u.cancel(b),this.deactivateMouse()},deactivateMouse:function(){H["delete"](this.POINTER_ID)}},O=u.captureInfo,P=v.findTarget.bind(v),Q=v.allShadows.bind(v),R=u.pointermap,S=2500,T=200,U="touch-action",V={events:["touchstart","touchmove","touchend","touchcancel"],register:function(a){M.enableOnSubtree(a)},unregister:function(){},elementAdded:function(a){var b=a.getAttribute(U),c=this.touchActionToScrollType(b);c&&(a._scrollType=c,u.listen(a,this.events),
Q(a).forEach(function(a){a._scrollType=c,u.listen(a,this.events)},this))},elementRemoved:function(a){a._scrollType=void 0,u.unlisten(a,this.events),
Q(a).forEach(function(a){a._scrollType=void 0,u.unlisten(a,this.events)},this)},elementChanged:function(a,b){var c=a.getAttribute(U),d=this.touchActionToScrollType(c),e=this.touchActionToScrollType(b);
d&&e?(a._scrollType=d,Q(a).forEach(function(a){a._scrollType=d},this)):e?this.elementRemoved(a):d&&this.elementAdded(a)},scrollTypes:{EMITTER:"none",XSCROLLER:"pan-x",YSCROLLER:"pan-y",SCROLLER:/^(?:pan-x pan-y)|(?:pan-y pan-x)|auto$/},touchActionToScrollType:function(a){var b=a,c=this.scrollTypes;return"none"===b?"none":b===c.XSCROLLER?"X":b===c.YSCROLLER?"Y":c.SCROLLER.exec(b)?"XY":void 0},POINTER_TYPE:"touch",firstTouch:null,isPrimaryTouch:function(a){return this.firstTouch===a.identifier},setPrimaryTouch:function(a){
(0===R.size||1===R.size&&R.has(1))&&(this.firstTouch=a.identifier,this.firstXY={X:a.clientX,Y:a.clientY},this.scrolling=!1,this.cancelResetClickCount())},removePrimaryPointer:function(a){a.isPrimary&&(this.firstTouch=null,this.firstXY=null,this.resetClickCount())},clickCount:0,resetId:null,resetClickCount:function(){var a=function(){this.clickCount=0,this.resetId=null}.bind(this);this.resetId=setTimeout(a,T)},cancelResetClickCount:function(){this.resetId&&clearTimeout(this.resetId)},typeToButtons:function(a){var b=0;return"touchstart"!==a&&"touchmove"!==a||(b=1),b},touchToPointer:function(a){var b=this.currentTouchEvent,c=u.cloneEvent(a),d=c.pointerId=a.identifier+2;c.target=O[d]||P(c),c.bubbles=!0,c.cancelable=!0,c.detail=this.clickCount,c.button=0,c.buttons=this.typeToButtons(b.type),c.width=2*(a.radiusX||a.webkitRadiusX||0),c.height=2*(a.radiusY||a.webkitRadiusY||0),c.pressure=a.force||a.webkitForce||.5,c.isPrimary=this.isPrimaryTouch(a),c.pointerType=this.POINTER_TYPE,
c.altKey=b.altKey,c.ctrlKey=b.ctrlKey,c.metaKey=b.metaKey,c.shiftKey=b.shiftKey;
var e=this;return c.preventDefault=function(){e.scrolling=!1,e.firstXY=null,b.preventDefault()},c},processTouches:function(a,b){var c=a.changedTouches;this.currentTouchEvent=a;for(var d,e=0;e<c.length;e++)d=c[e],b.call(this,this.touchToPointer(d))},
shouldScroll:function(a){if(this.firstXY){var b,c=a.currentTarget._scrollType;if("none"===c)
b=!1;else if("XY"===c)
b=!0;else{var d=a.changedTouches[0],e=c,f="Y"===c?"X":"Y",g=Math.abs(d["client"+e]-this.firstXY[e]),h=Math.abs(d["client"+f]-this.firstXY[f]);
b=g>=h}return this.firstXY=null,b}},findTouch:function(a,b){for(var c,d=0,e=a.length;d<e&&(c=a[d]);d++)if(c.identifier===b)return!0},
vacuumTouches:function(a){var b=a.touches;
if(R.size>=b.length){var c=[];R.forEach(function(a,d){
if(1!==d&&!this.findTouch(b,d-2)){var e=a.out;c.push(e)}},this),c.forEach(this.cancelOut,this)}},touchstart:function(a){this.vacuumTouches(a),this.setPrimaryTouch(a.changedTouches[0]),this.dedupSynthMouse(a),this.scrolling||(this.clickCount++,this.processTouches(a,this.overDown))},overDown:function(a){R.set(a.pointerId,{target:a.target,out:a,outTarget:a.target}),u.enterOver(a),u.down(a)},touchmove:function(a){this.scrolling||(this.shouldScroll(a)?(this.scrolling=!0,this.touchcancel(a)):(a.preventDefault(),this.processTouches(a,this.moveOverOut)))},moveOverOut:function(a){var b=a,c=R.get(b.pointerId);
if(c){var d=c.out,e=c.outTarget;u.move(b),d&&e!==b.target&&(d.relatedTarget=b.target,b.relatedTarget=e,
d.target=e,b.target?(u.leaveOut(d),u.enterOver(b)):(
b.target=e,b.relatedTarget=null,this.cancelOut(b))),c.out=b,c.outTarget=b.target}},touchend:function(a){this.dedupSynthMouse(a),this.processTouches(a,this.upOut)},upOut:function(a){this.scrolling||(u.up(a),u.leaveOut(a)),this.cleanUpPointer(a)},touchcancel:function(a){this.processTouches(a,this.cancelOut)},cancelOut:function(a){u.cancel(a),u.leaveOut(a),this.cleanUpPointer(a)},cleanUpPointer:function(a){R["delete"](a.pointerId),this.removePrimaryPointer(a)},
dedupSynthMouse:function(a){var b=N.lastTouches,c=a.changedTouches[0];
if(this.isPrimaryTouch(c)){
var d={x:c.clientX,y:c.clientY};b.push(d);var e=function(a,b){var c=a.indexOf(b);c>-1&&a.splice(c,1)}.bind(null,b,d);setTimeout(e,S)}}};M=new c(V.elementAdded,V.elementRemoved,V.elementChanged,V);var W,X,Y,Z=u.pointermap,$=window.MSPointerEvent&&"number"==typeof window.MSPointerEvent.MSPOINTER_TYPE_MOUSE,_={events:["MSPointerDown","MSPointerMove","MSPointerUp","MSPointerOut","MSPointerOver","MSPointerCancel","MSGotPointerCapture","MSLostPointerCapture"],register:function(a){u.listen(a,this.events)},unregister:function(a){u.unlisten(a,this.events)},POINTER_TYPES:["","unavailable","touch","pen","mouse"],prepareEvent:function(a){var b=a;return $&&(b=u.cloneEvent(a),b.pointerType=this.POINTER_TYPES[a.pointerType]),b},cleanup:function(a){Z["delete"](a)},MSPointerDown:function(a){Z.set(a.pointerId,a);var b=this.prepareEvent(a);u.down(b)},MSPointerMove:function(a){var b=this.prepareEvent(a);u.move(b)},MSPointerUp:function(a){var b=this.prepareEvent(a);u.up(b),this.cleanup(a.pointerId)},MSPointerOut:function(a){var b=this.prepareEvent(a);u.leaveOut(b)},MSPointerOver:function(a){var b=this.prepareEvent(a);u.enterOver(b)},MSPointerCancel:function(a){var b=this.prepareEvent(a);u.cancel(b),this.cleanup(a.pointerId)},MSLostPointerCapture:function(a){var b=u.makeEvent("lostpointercapture",a);u.dispatchEvent(b)},MSGotPointerCapture:function(a){var b=u.makeEvent("gotpointercapture",a);u.dispatchEvent(b)}},aa=window.navigator;aa.msPointerEnabled?(W=function(a){i(a),j(this),k(a)&&(u.setCapture(a,this,!0),this.msSetPointerCapture(a))},X=function(a){i(a),u.releaseCapture(a,!0),this.msReleasePointerCapture(a)}):(W=function(a){i(a),j(this),k(a)&&u.setCapture(a,this)},X=function(a){i(a),u.releaseCapture(a)}),Y=function(a){return!!u.captureInfo[a]},g(),h(),l();var ba={dispatcher:u,Installer:c,PointerEvent:a,PointerMap:p,targetFinding:v};return ba});

///////////////////////////////////////////////

///////////////////////////////////////////////
var config = {"dark_mode": true, "show_pads": true, "show_fabrication": false, "show_silkscreen": false, "highlight_pin1": "none", "redraw_on_drag": true, "board_rotation": 0, "checkboxes": "Sourced,Placed", "bom_view": "left-right", "layer_view": "F", "offset_back_rotation": false, "kicad_text_formatting": true, "fields": ["Value", "Footprint"]}
///////////////////////////////////////////////

///////////////////////////////////////////////
var pcbdata = JSON.parse(LZString.decompressFromBase64("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1NieDdEjGagfIx5V1alDIdGjHoXToxiCGGMd0BpjGfIYDsPyGC0ZAJoYHuMfuJm11ZRHCh54mJweEx74kPiYrdL4nZMZ+JlgGZMaMgZ5R5McRdTKHlMZbzVTG8oc/Bp8mrCZfJtN1dB3hJ7mxbgaRJpow22Dqh7byGodeBzEmq3Q0dHEm7MZZFBzGeoakB1t1+ofVGdzH3WE8xvt1d/oHdOEG/MY2h0d1AsdRBhkmFoaZJ/qEWSZWhqLGOSYPR2LHuSZ2h3kmkscV2Pd1RSaOhxkHMsdFJ86Gtslyxq6H18bNCGUmiaDlJ7kGnoZYB5Um6f1VJ4UH1Sbqxw1GGsZ8iJrHdScBhtcGNyaXJiB0jSeUJucH+schhi0mvSftBm0nZwztJ8MN4kHsaedimAw4yQIBP8fdJqkNIQwOpv0nLSe9Jp6nuUY5R4MnFCfnJzWscHQH+yMnBUejJ5MHEYjjJiVGkCelR2dHZUcvdVMmYwae0OMHwCUzJlVGkwbwJjVG8ycIJgsmb9BIJ4smDUcl9KR1yyeoJysm6yeLB0D1oRgYJq1GKwdtRpsmMgbYJ0sGOCZwxjsn4KZ4J9CG+Cd7JgQn+ycv+0/7ewdv+0cmH/vHJkAmpCanJmQmZyddBj6mNqYDJ4AntqeXJg0n00fXJrama/q0Jncns0Z+h3NGDydMpot1jyehdU8mLgcvB0amLCZIB68nCAdvJx8G2nWMIRtGgqZoB5wnXybUxs2mPyeWML8m+0Y9BkCH/yaWdCCGBAeAp8dHNnXCJ0f7IiakBqCmv3QXR9CGl0bHR1dHEKfXR5CmCId3+oiHd0dykHInDAewpkwHcKcKJ8woCKftRq9GyiZIpyomyKeqJ2F1n0bqJtwGaKYyBviHmia/RkQH/AdEh/F1+yZ6JqSGOKclJgYm5IZ4pyDHFIcCxsYm4MdaUBDHA0iQxiFoxKdQx+YmpKfN/JYnsMeKB+Sm0LUUp6V0iMZUp7YmoacVdOoH9ia0pw4mdKeOJvSnTiYMp84mPQcuJkymOMcChoV0eMasp/jGSVUExkAn7KdbYRynM/vExlyn7lN+J1KGNga8posxd7Kyhvyn9gYtpkKmSAehJwKnSobCpxk0ESY1p6qHoqZMxttG0Sc/ipqGj6Zah7EnbMYgh+t18SYyp2dGsqdwdHKmu3Typ8kmvMcKp2EGJoZKpg9GyqfYhiqm6ycZJzpwaqYixnEGSZIapxEGmqYQdHkmSQb5J/aGOqYyBtLHjoagOwEHz3WYQCkUJScr+qyQCseGpu6Gn3QehsrHnofeMyrGZqbbRkUGNSfqxnN1foc+BmvyZQeTR/UmQAcNJlcnNyZhh/amZGdNJl6mEYbw9JRQUI1Op4Y5AEC2hq30A9m1AG6nf7Q9JrQQHqcZR40nfScMZsWnmUfkJkAnZyaFpiAnvqe9B36nM/tgJgGnSHX7J+Mma/sTJmVHkyYhpy3aMCZhp9kYWIY4dBGmcyZlJ2MwUaYzBtGm9UbIJ0snaCeNR3GmiwboJmsniabrJ0mnmCbtRimmWyapptsnOCdpp5sHSMY9Rpmnz/pZpn1GhyZokWUmxCa5p4lQQ0a8dPmnYRFkJsAnAyYXJqxnJGYlptcm1qelp9J0nJCPR3cmFab0JgymDCcLRowmTyZMJj+nzyevBnWmq0b1ph8G60fvJo2mHCZNpj8H3CZcJt8nLaZYBz8nAId8J/tH7aYCJgCmgidWdOmnhAbaJ92nwKb2dL2mCYugphhnj/v9prCH6SZSJ4On8Ia3RsOmd0fQpyOnMKYohnV18ibjprqR8KaHpqwHr0fKJ0aG2IYSBmoms6aopqMwt5CYdfOnP0cEhximcXWYpoIHK/okhwDG+iarprim+dtrpvOn66dGJgSmOHSEpjSG26ZmJ8Sm0Me7pwyGZKb7psV0zIcHpgjHlKdBdVSmdifUpviwVXWnppxqjiarUE4nE9kXp7yGLid6BtjH+gZuJrjHgofmBhl1HicmB3emgyf3p2KGnKZf9E+mVgbcpv4nZMc8pwEmfKd2B0EnEXUWZh+mLgafp+ZmdMbKh8KnYScMx2YGHgdip8+nGocsxwBnkqeAZn4HQGfSp5t1Mqb6hqBm3MZgZvfHe3XWhkkGiqaQZ4d1SqYCxtBmrmckdfhlBPSwZud0rUbqpiaHoscaprkmiGZapkhm2qd3dFsGKGZAmdLH41NOh3qnssf6phhmWQeYZ5LjWGb9SdhmeQc4Zz91pqdQhNUnPofmpoD0THCWpnUnwPVWp1rGpGeFp4GHq2fVBkxm9qfkZgxmhsaOplt6uzTsRmJQ1YZkgkV5HdGwG01JKnluiNEsbJhYSw4wxnkVWbJGBIj3S1nYUhGhxgyJLHinZuhxSkdRCOD5cmi1JQP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"))
///////////////////////////////////////////////

///////////////////////////////////////////////
/* Utility functions */

var storagePrefix = 'KiCad_HTML_BOM__' + pcbdata.metadata.title + '__' +
  pcbdata.metadata.revision + '__#';
var storage;

function initStorage(key) {
  try {
    window.localStorage.getItem("blank");
    storage = window.localStorage;
  } catch (e) {
    // localStorage not available
  }
  if (!storage) {
    try {
      window.sessionStorage.getItem("blank");
      storage = window.sessionStorage;
    } catch (e) {
      // sessionStorage also not available
    }
  }
}

function readStorage(key) {
  if (storage) {
    return storage.getItem(storagePrefix + key);
  } else {
    return null;
  }
}

function writeStorage(key, value) {
  if (storage) {
    storage.setItem(storagePrefix + key, value);
  }
}

function fancyDblClickHandler(el, onsingle, ondouble) {
  return function () {
    if (el.getAttribute("data-dblclick") == null) {
      el.setAttribute("data-dblclick", 1);
      setTimeout(function () {
        if (el.getAttribute("data-dblclick") == 1) {
          onsingle();
        }
        el.removeAttribute("data-dblclick");
      }, 200);
    } else {
      el.removeAttribute("data-dblclick");
      ondouble();
    }
  }
}

function smoothScrollToRow(rowid) {
  document.getElementById(rowid).scrollIntoView({
    behavior: "smooth",
    block: "center",
    inline: "nearest"
  });
}

function focusInputField(input) {
  input.scrollIntoView(false);
  input.focus();
  input.select();
}

function saveBomTable(output) {
  var text = '';
  for (var node of bomhead.childNodes[0].childNodes) {
    if (node.firstChild) {
      text += (output == 'csv' ? `"${node.firstChild.nodeValue}"` : node.firstChild.nodeValue);
    }
    if (node != bomhead.childNodes[0].lastChild) {
      text += (output == 'csv' ? ',' : '\t');
    }
  }
  text += '\n';
  for (var row of bombody.childNodes) {
    for (var cell of row.childNodes) {
      let val = '';
      for (var node of cell.childNodes) {
        if (node.nodeName == "INPUT") {
          if (node.checked) {
            val += '✓';
          }
        } else if ((node.nodeName == "MARK") || (node.nodeName == "A")) {
          val += node.firstChild.nodeValue;
        } else {
          val += node.nodeValue;
        }
      }
      if (output == 'csv') {
        val = val.replace(/\"/g, '\"\"'); // pair of double-quote characters
        if (isNumeric(val)) {
          val = +val;                     // use number
        } else {
          val = `"${val}"`;               // enclosed within double-quote
        }
      }
      text += val;
      if (cell != row.lastChild) {
        text += (output == 'csv' ? ',' : '\t');
      }
    }
    text += '\n';
  }

  if (output != 'clipboard') {
    // To file: csv or txt
    var blob = new Blob([text], {
      type: `text/${output}`
    });
    saveFile(`${pcbdata.metadata.title}.${output}`, blob);
  } else {
    // To clipboard
    var textArea = document.createElement("textarea");
    textArea.classList.add('clipboard-temp');
    textArea.value = text;

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      if (document.execCommand('copy')) {
        console.log('Bom copied to clipboard.');
      }
    } catch (err) {
      console.log('Can not copy to clipboard.');
    }

    document.body.removeChild(textArea);
  }
}

function isNumeric(str) {
  /* https://stackoverflow.com/a/175787 */
  return (typeof str != "string" ? false : !isNaN(str) && !isNaN(parseFloat(str)));
}

function removeGutterNode(node) {
  for (var i = 0; i < node.childNodes.length; i++) {
    if (node.childNodes[i].classList &&
      node.childNodes[i].classList.contains("gutter")) {
      node.removeChild(node.childNodes[i]);
      break;
    }
  }
}

function cleanGutters() {
  removeGutterNode(document.getElementById("bot"));
  removeGutterNode(document.getElementById("canvasdiv"));
}

var units = {
  prefixes: {
    giga: ["G", "g", "giga", "Giga", "GIGA"],
    mega: ["M", "mega", "Mega", "MEGA"],
    kilo: ["K", "k", "kilo", "Kilo", "KILO"],
    milli: ["m", "milli", "Milli", "MILLI"],
    micro: ["U", "u", "micro", "Micro", "MICRO", "μ", "µ"], // different utf8 μ
    nano: ["N", "n", "nano", "Nano", "NANO"],
    pico: ["P", "p", "pico", "Pico", "PICO"],
  },
  unitsShort: ["R", "r", "Ω", "F", "f", "H", "h"],
  unitsLong: [
    "OHM", "Ohm", "ohm", "ohms",
    "FARAD", "Farad", "farad",
    "HENRY", "Henry", "henry"
  ],
  getMultiplier: function (s) {
    if (this.prefixes.giga.includes(s)) return 1e9;
    if (this.prefixes.mega.includes(s)) return 1e6;
    if (this.prefixes.kilo.includes(s)) return 1e3;
    if (this.prefixes.milli.includes(s)) return 1e-3;
    if (this.prefixes.micro.includes(s)) return 1e-6;
    if (this.prefixes.nano.includes(s)) return 1e-9;
    if (this.prefixes.pico.includes(s)) return 1e-12;
    return 1;
  },
  valueRegex: null,
}

function initUtils() {
  var allPrefixes = units.prefixes.giga
    .concat(units.prefixes.mega)
    .concat(units.prefixes.kilo)
    .concat(units.prefixes.milli)
    .concat(units.prefixes.micro)
    .concat(units.prefixes.nano)
    .concat(units.prefixes.pico);
  var allUnits = units.unitsShort.concat(units.unitsLong);
  units.valueRegex = new RegExp("^([0-9\.]+)" +
    "\\s*(" + allPrefixes.join("|") + ")?" +
    "(" + allUnits.join("|") + ")?" +
    "(\\b.*)?$", "");
  units.valueAltRegex = new RegExp("^([0-9]*)" +
    "(" + units.unitsShort.join("|") + ")?" +
    "([GgMmKkUuNnPp])?" +
    "([0-9]*)" +
    "(\\b.*)?$", "");
  if (config.fields.includes("Value")) {
    var index = config.fields.indexOf("Value");
    pcbdata.bom["parsedValues"] = {};
    for (var id in pcbdata.bom.fields) {
      pcbdata.bom.parsedValues[id] = parseValue(pcbdata.bom.fields[id][index])
    }
  }
}

function parseValue(val, ref) {
  var inferUnit = (unit, ref) => {
    if (unit) {
      unit = unit.toLowerCase();
      if (unit == 'Ω' || unit == "ohm" || unit == "ohms") {
        unit = 'r';
      }
      unit = unit[0];
    } else {
      ref = /^([a-z]+)\d+$/i.exec(ref);
      if (ref) {
        ref = ref[1].toLowerCase();
        if (ref == "c") unit = 'f';
        else if (ref == "l") unit = 'h';
        else if (ref == "r" || ref == "rv") unit = 'r';
        else unit = null;
      }
    }
    return unit;
  };
  val = val.replace(/,/g, "");
  var match = units.valueRegex.exec(val);
  var unit;
  if (match) {
    val = parseFloat(match[1]);
    if (match[2]) {
      val = val * units.getMultiplier(match[2]);
    }
    unit = inferUnit(match[3], ref);
    if (!unit) return null;
    else return {
      val: val,
      unit: unit,
      extra: match[4],
    }
  }
  match = units.valueAltRegex.exec(val);
  if (match && (match[1] || match[4])) {
    val = parseFloat(match[1] + "." + match[4]);
    if (match[3]) {
      val = val * units.getMultiplier(match[3]);
    }
    unit = inferUnit(match[2], ref);
    if (!unit) return null;
    else return {
      val: val,
      unit: unit,
      extra: match[5],
    }
  }
  return null;
}

function valueCompare(a, b, stra, strb) {
  if (a === null && b === null) {
    // Failed to parse both values, compare them as strings.
    if (stra != strb) return stra > strb ? 1 : -1;
    else return 0;
  } else if (a === null) {
    return 1;
  } else if (b === null) {
    return -1;
  } else {
    if (a.unit != b.unit) return a.unit > b.unit ? 1 : -1;
    else if (a.val != b.val) return a.val > b.val ? 1 : -1;
    else if (a.extra != b.extra) return a.extra > b.extra ? 1 : -1;
    else return 0;
  }
}

function validateSaveImgDimension(element) {
  var valid = false;
  var intValue = 0;
  if (/^[1-9]\d*$/.test(element.value)) {
    intValue = parseInt(element.value);
    if (intValue <= 16000) {
      valid = true;
    }
  }
  if (valid) {
    element.classList.remove("invalid");
  } else {
    element.classList.add("invalid");
  }
  return intValue;
}

function saveImage(layer) {
  var width = validateSaveImgDimension(document.getElementById("render-save-width"));
  var height = validateSaveImgDimension(document.getElementById("render-save-height"));
  var bgcolor = null;
  if (!document.getElementById("render-save-transparent").checked) {
    var style = getComputedStyle(topmostdiv);
    bgcolor = style.getPropertyValue("background-color");
  }
  if (!width || !height) return;

  // Prepare image
  var canvas = document.createElement("canvas");
  var layerdict = {
    transform: {
      x: 0,
      y: 0,
      s: 1,
      panx: 0,
      pany: 0,
      zoom: 1,
    },
    bg: canvas,
    fab: canvas,
    silk: canvas,
    highlight: canvas,
    layer: layer,
  }
  // Do the rendering
  recalcLayerScale(layerdict, width, height);
  prepareLayer(layerdict);
  clearCanvas(canvas, bgcolor);
  drawBackground(layerdict, false);
  drawHighlightsOnLayer(layerdict, false);

  // Save image
  var imgdata = canvas.toDataURL("image/png");

  var filename = pcbdata.metadata.title;
  if (pcbdata.metadata.revision) {
    filename += `.${pcbdata.metadata.revision}`;
  }
  filename += `.${layer}.png`;
  saveFile(filename, dataURLtoBlob(imgdata));
}

function saveSettings() {
  var data = {
    type: "InteractiveHtmlBom settings",
    version: 1,
    pcbmetadata: pcbdata.metadata,
    settings: settings,
  }
  var blob = new Blob([JSON.stringify(data, null, 4)], {
    type: "application/json"
  });
  saveFile(`${pcbdata.metadata.title}.settings.json`, blob);
}

function loadSettings() {
  var input = document.createElement("input");
  input.type = "file";
  input.accept = ".settings.json";
  input.onchange = function (e) {
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.onload = readerEvent => {
      var content = readerEvent.target.result;
      var newSettings;
      try {
        newSettings = JSON.parse(content);
      } catch (e) {
        alert("Selected file is not InteractiveHtmlBom settings file.");
        return;
      }
      if (newSettings.type != "InteractiveHtmlBom settings") {
        alert("Selected file is not InteractiveHtmlBom settings file.");
        return;
      }
      var metadataMatches = newSettings.hasOwnProperty("pcbmetadata");
      if (metadataMatches) {
        for (var k in pcbdata.metadata) {
          if (!newSettings.pcbmetadata.hasOwnProperty(k) || newSettings.pcbmetadata[k] != pcbdata.metadata[k]) {
            metadataMatches = false;
          }
        }
      }
      if (!metadataMatches) {
        var currentMetadata = JSON.stringify(pcbdata.metadata, null, 4);
        var fileMetadata = JSON.stringify(newSettings.pcbmetadata, null, 4);
        if (!confirm(
          `Settins file metadata does not match current metadata.\n\n` +
          `Page metadata:\n${currentMetadata}\n\n` +
          `Settings file metadata:\n${fileMetadata}\n\n` +
          `Press OK if you would like to import settings anyway.`)) {
          return;
        }
      }
      overwriteSettings(newSettings.settings);
    }
    reader.readAsText(file, 'UTF-8');
  }
  input.click();
}

function resetSettings() {
  if (!confirm(
    `This will reset all checkbox states and other settings.\n\n` +
    `Press OK if you want to continue.`)) {
    return;
  }
  if (storage) {
    var keys = [];
    for (var i = 0; i < storage.length; i++) {
      var key = storage.key(i);
      if (key.startsWith(storagePrefix)) keys.push(key);
    }
    for (var key of keys) storage.removeItem(key);
  }
  location.reload();
}

function overwriteSettings(newSettings) {
  initDone = false;
  Object.assign(settings, newSettings);
  writeStorage("bomlayout", settings.bomlayout);
  writeStorage("bommode", settings.bommode);
  writeStorage("canvaslayout", settings.canvaslayout);
  writeStorage("bomCheckboxes", settings.checkboxes.join(","));
  document.getElementById("bomCheckboxes").value = settings.checkboxes.join(",");
  for (var checkbox of settings.checkboxes) {
    writeStorage("checkbox_" + checkbox, settings.checkboxStoredRefs[checkbox]);
  }
  writeStorage("markWhenChecked", settings.markWhenChecked);
  padsVisible(settings.renderPads);
  document.getElementById("padsCheckbox").checked = settings.renderPads;
  fabricationVisible(settings.renderFabrication);
  document.getElementById("fabricationCheckbox").checked = settings.renderFabrication;
  silkscreenVisible(settings.renderSilkscreen);
  document.getElementById("silkscreenCheckbox").checked = settings.renderSilkscreen;
  referencesVisible(settings.renderReferences);
  document.getElementById("referencesCheckbox").checked = settings.renderReferences;
  valuesVisible(settings.renderValues);
  document.getElementById("valuesCheckbox").checked = settings.renderValues;
  tracksVisible(settings.renderTracks);
  document.getElementById("tracksCheckbox").checked = settings.renderTracks;
  zonesVisible(settings.renderZones);
  document.getElementById("zonesCheckbox").checked = settings.renderZones;
  dnpOutline(settings.renderDnpOutline);
  document.getElementById("dnpOutlineCheckbox").checked = settings.renderDnpOutline;
  setRedrawOnDrag(settings.redrawOnDrag);
  document.getElementById("dragCheckbox").checked = settings.redrawOnDrag;
  setDarkMode(settings.darkMode);
  document.getElementById("darkmodeCheckbox").checked = settings.darkMode;
  setHighlightPin1(settings.highlightpin1);
  document.forms.highlightpin1.highlightpin1.value = settings.highlightpin1;
  writeStorage("boardRotation", settings.boardRotation);
  document.getElementById("boardRotation").value = settings.boardRotation / 5;
  document.getElementById("rotationDegree").textContent = settings.boardRotation;
  setOffsetBackRotation(settings.offsetBackRotation);
  document.getElementById("offsetBackRotationCheckbox").checked = settings.offsetBackRotation;
  initDone = true;
  prepCheckboxes();
  changeBomLayout(settings.bomlayout);
}

function saveFile(filename, blob) {
  var link = document.createElement("a");
  var objurl = URL.createObjectURL(blob);
  link.download = filename;
  link.href = objurl;
  link.click();
}

function dataURLtoBlob(dataurl) {
  var arr = dataurl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], {
    type: mime
  });
}

var settings = {
  canvaslayout: "FB",
  bomlayout: "left-right",
  bommode: "grouped",
  checkboxes: [],
  checkboxStoredRefs: {},
  darkMode: false,
  highlightpin1: "none",
  redrawOnDrag: true,
  boardRotation: 0,
  offsetBackRotation: false,
  renderPads: true,
  renderReferences: true,
  renderValues: true,
  renderSilkscreen: true,
  renderFabrication: true,
  renderDnpOutline: false,
  renderTracks: true,
  renderZones: true,
  columnOrder: [],
  hiddenColumns: [],
  netColors: {},
}

function initDefaults() {
  settings.bomlayout = readStorage("bomlayout");
  if (settings.bomlayout === null) {
    settings.bomlayout = config.bom_view;
  }
  if (!['bom-only', 'left-right', 'top-bottom'].includes(settings.bomlayout)) {
    settings.bomlayout = config.bom_view;
  }
  settings.bommode = readStorage("bommode");
  if (settings.bommode === null) {
    settings.bommode = "grouped";
  }
  if (settings.bommode == "netlist" && !pcbdata.nets) {
    settings.bommode = "grouped";
  }
  if (!["grouped", "ungrouped", "netlist"].includes(settings.bommode)) {
    settings.bommode = "grouped";
  }
  settings.canvaslayout = readStorage("canvaslayout");
  if (settings.canvaslayout === null) {
    settings.canvaslayout = config.layer_view;
  }
  var bomCheckboxes = readStorage("bomCheckboxes");
  if (bomCheckboxes === null) {
    bomCheckboxes = config.checkboxes;
  }
  settings.checkboxes = bomCheckboxes.split(",").filter((e) => e);
  document.getElementById("bomCheckboxes").value = bomCheckboxes;

  var highlightpin1 = readStorage("highlightpin1") || config.highlight_pin1;
  if (highlightpin1 === "false") highlightpin1 = "none";
  if (highlightpin1 === "true") highlightpin1 = "all";
  setHighlightPin1(highlightpin1);
  document.forms.highlightpin1.highlightpin1.value = highlightpin1;

  settings.markWhenChecked = readStorage("markWhenChecked") || "";
  populateMarkWhenCheckedOptions();

  function initBooleanSetting(storageString, def, elementId, func) {
    var b = readStorage(storageString);
    if (b === null) {
      b = def;
    } else {
      b = (b == "true");
    }
    document.getElementById(elementId).checked = b;
    func(b);
  }

  initBooleanSetting("padsVisible", config.show_pads, "padsCheckbox", padsVisible);
  initBooleanSetting("fabricationVisible", config.show_fabrication, "fabricationCheckbox", fabricationVisible);
  initBooleanSetting("silkscreenVisible", config.show_silkscreen, "silkscreenCheckbox", silkscreenVisible);
  initBooleanSetting("referencesVisible", true, "referencesCheckbox", referencesVisible);
  initBooleanSetting("valuesVisible", true, "valuesCheckbox", valuesVisible);
  if ("tracks" in pcbdata) {
    initBooleanSetting("tracksVisible", true, "tracksCheckbox", tracksVisible);
    initBooleanSetting("zonesVisible", true, "zonesCheckbox", zonesVisible);
  } else {
    document.getElementById("tracksAndZonesCheckboxes").style.display = "none";
    tracksVisible(false);
    zonesVisible(false);
  }
  initBooleanSetting("dnpOutline", false, "dnpOutlineCheckbox", dnpOutline);
  initBooleanSetting("redrawOnDrag", config.redraw_on_drag, "dragCheckbox", setRedrawOnDrag);
  initBooleanSetting("darkmode", config.dark_mode, "darkmodeCheckbox", setDarkMode);

  var fields = ["checkboxes", "References"].concat(config.fields).concat(["Quantity"]);
  var hcols = JSON.parse(readStorage("hiddenColumns"));
  if (hcols === null) {
    hcols = [];
  }
  settings.hiddenColumns = hcols.filter(e => fields.includes(e));

  var cord = JSON.parse(readStorage("columnOrder"));
  if (cord === null) {
    cord = fields;
  } else {
    cord = cord.filter(e => fields.includes(e));
    if (cord.length != fields.length)
      cord = fields;
  }
  settings.columnOrder = cord;

  settings.boardRotation = readStorage("boardRotation");
  if (settings.boardRotation === null) {
    settings.boardRotation = config.board_rotation * 5;
  } else {
    settings.boardRotation = parseInt(settings.boardRotation);
  }
  document.getElementById("boardRotation").value = settings.boardRotation / 5;
  document.getElementById("rotationDegree").textContent = settings.boardRotation;
  initBooleanSetting("offsetBackRotation", config.offset_back_rotation, "offsetBackRotationCheckbox", setOffsetBackRotation);

  settings.netColors = JSON.parse(readStorage("netColors")) || {};
}

// Helper classes for user js callbacks.

const IBOM_EVENT_TYPES = {
  ALL: "all",
  HIGHLIGHT_EVENT: "highlightEvent",
  CHECKBOX_CHANGE_EVENT: "checkboxChangeEvent",
  BOM_BODY_CHANGE_EVENT: "bomBodyChangeEvent",
}

const EventHandler = {
  callbacks: {},
  init: function () {
    for (eventType of Object.values(IBOM_EVENT_TYPES))
      this.callbacks[eventType] = [];
  },
  registerCallback: function (eventType, callback) {
    this.callbacks[eventType].push(callback);
  },
  emitEvent: function (eventType, eventArgs) {
    event = {
      eventType: eventType,
      args: eventArgs,
    }
    var callback;
    for (callback of this.callbacks[eventType])
      callback(event);
    for (callback of this.callbacks[IBOM_EVENT_TYPES.ALL])
      callback(event);
  }
}
EventHandler.init();

///////////////////////////////////////////////

///////////////////////////////////////////////
/* PCB rendering code */

var emptyContext2d = document.createElement("canvas").getContext("2d");

function deg2rad(deg) {
  return deg * Math.PI / 180;
}

function calcFontPoint(linepoint, text, offsetx, offsety, tilt) {
  var point = [
    linepoint[0] * text.width + offsetx,
    linepoint[1] * text.height + offsety
  ];
  // This approximates pcbnew behavior with how text tilts depending on horizontal justification
  point[0] -= (linepoint[1] + 0.5 * (1 + text.justify[0])) * text.height * tilt;
  return point;
}

function drawText(ctx, text, color) {
  if ("ref" in text && !settings.renderReferences) return;
  if ("val" in text && !settings.renderValues) return;
  ctx.save();
  ctx.fillStyle = color;
  ctx.strokeStyle = color;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.lineWidth = text.thickness;
  if ("svgpath" in text) {
    ctx.stroke(new Path2D(text.svgpath));
    ctx.restore();
    return;
  }
  if ("polygons" in text) {
    ctx.fill(getPolygonsPath(text));
    ctx.restore();
    return;
  }
  ctx.translate(...text.pos);
  ctx.translate(text.thickness * 0.5, 0);
  var angle = -text.angle;
  if (text.attr.includes("mirrored")) {
    ctx.scale(-1, 1);
    angle = -angle;
  }
  var tilt = 0;
  if (text.attr.includes("italic")) {
    tilt = 0.125;
  }
  var interline = text.height * 1.5 + text.thickness;
  var txt = text.text.split("\n");
  // KiCad ignores last empty line.
  if (txt[txt.length - 1] == '') txt.pop();
  ctx.rotate(deg2rad(angle));
  var offsety = (1 - text.justify[1]) / 2 * text.height; // One line offset
  offsety -= (txt.length - 1) * (text.justify[1] + 1) / 2 * interline; // Multiline offset
  for (var i in txt) {
    var lineWidth = text.thickness + interline / 2 * tilt;
    for (var j = 0; j < txt[i].length; j++) {
      if (txt[i][j] == '\t') {
        var fourSpaces = 4 * pcbdata.font_data[' '].w * text.width;
        lineWidth += fourSpaces - lineWidth % fourSpaces;
      } else {
        if (txt[i][j] == '~') {
          j++;
          if (j == txt[i].length)
            break;
        }
        lineWidth += pcbdata.font_data[txt[i][j]].w * text.width;
      }
    }
    var offsetx = -lineWidth * (text.justify[0] + 1) / 2;
    var inOverbar = false;
    for (var j = 0; j < txt[i].length; j++) {
      if (config.kicad_text_formatting) {
        if (txt[i][j] == '\t') {
          var fourSpaces = 4 * pcbdata.font_data[' '].w * text.width;
          offsetx += fourSpaces - offsetx % fourSpaces;
          continue;
        } else if (txt[i][j] == '~') {
          j++;
          if (j == txt[i].length)
            break;
          if (txt[i][j] != '~') {
            inOverbar = !inOverbar;
          }
        }
      }
      var glyph = pcbdata.font_data[txt[i][j]];
      if (inOverbar) {
        var overbarStart = [offsetx, -text.height * 1.4 + offsety];
        var overbarEnd = [offsetx + text.width * glyph.w, overbarStart[1]];

        if (!lastHadOverbar) {
          overbarStart[0] += text.height * 1.4 * tilt;
          lastHadOverbar = true;
        }
        ctx.beginPath();
        ctx.moveTo(...overbarStart);
        ctx.lineTo(...overbarEnd);
        ctx.stroke();
      } else {
        lastHadOverbar = false;
      }
      for (var line of glyph.l) {
        ctx.beginPath();
        ctx.moveTo(...calcFontPoint(line[0], text, offsetx, offsety, tilt));
        for (var k = 1; k < line.length; k++) {
          ctx.lineTo(...calcFontPoint(line[k], text, offsetx, offsety, tilt));
        }
        ctx.stroke();
      }
      offsetx += glyph.w * text.width;
    }
    offsety += interline;
  }
  ctx.restore();
}

function drawedge(ctx, scalefactor, edge, color) {
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = Math.max(1 / scalefactor, edge.width);
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  if ("svgpath" in edge) {
    ctx.stroke(new Path2D(edge.svgpath));
  } else {
    ctx.beginPath();
    if (edge.type == "segment") {
      ctx.moveTo(...edge.start);
      ctx.lineTo(...edge.end);
    }
    if (edge.type == "rect") {
      ctx.moveTo(...edge.start);
      ctx.lineTo(edge.start[0], edge.end[1]);
      ctx.lineTo(...edge.end);
      ctx.lineTo(edge.end[0], edge.start[1]);
      ctx.lineTo(...edge.start);
    }
    if (edge.type == "arc") {
      ctx.arc(
        ...edge.start,
        edge.radius,
        deg2rad(edge.startangle),
        deg2rad(edge.endangle));
    }
    if (edge.type == "circle") {
      ctx.arc(
        ...edge.start,
        edge.radius,
        0, 2 * Math.PI);
      ctx.closePath();
    }
    if (edge.type == "curve") {
      ctx.moveTo(...edge.start);
      ctx.bezierCurveTo(...edge.cpa, ...edge.cpb, ...edge.end);
    }
    if("filled" in edge && edge.filled)
      ctx.fill();
    else
      ctx.stroke();
  }
}

function getChamferedRectPath(size, radius, chamfpos, chamfratio) {
  // chamfpos is a bitmask, left = 1, right = 2, bottom left = 4, bottom right = 8
  var path = new Path2D();
  var width = size[0];
  var height = size[1];
  var x = width * -0.5;
  var y = height * -0.5;
  var chamfOffset = Math.min(width, height) * chamfratio;
  path.moveTo(x, 0);
  if (chamfpos & 4) {
    path.lineTo(x, y + height - chamfOffset);
    path.lineTo(x + chamfOffset, y + height);
    path.lineTo(0, y + height);
  } else {
    path.arcTo(x, y + height, x + width, y + height, radius);
  }
  if (chamfpos & 8) {
    path.lineTo(x + width - chamfOffset, y + height);
    path.lineTo(x + width, y + height - chamfOffset);
    path.lineTo(x + width, 0);
  } else {
    path.arcTo(x + width, y + height, x + width, y, radius);
  }
  if (chamfpos & 2) {
    path.lineTo(x + width, y + chamfOffset);
    path.lineTo(x + width - chamfOffset, y);
    path.lineTo(0, y);
  } else {
    path.arcTo(x + width, y, x, y, radius);
  }
  if (chamfpos & 1) {
    path.lineTo(x + chamfOffset, y);
    path.lineTo(x, y + chamfOffset);
    path.lineTo(x, 0);
  } else {
    path.arcTo(x, y, x, y + height, radius);
  }
  path.closePath();
  return path;
}

function getOblongPath(size) {
  return getChamferedRectPath(size, Math.min(size[0], size[1]) / 2, 0, 0);
}

function getPolygonsPath(shape) {
  if (shape.path2d) {
    return shape.path2d;
  }
  if ("svgpath" in shape) {
    shape.path2d = new Path2D(shape.svgpath);
  } else {
    var path = new Path2D();
    for (var polygon of shape.polygons) {
      path.moveTo(...polygon[0]);
      for (var i = 1; i < polygon.length; i++) {
        path.lineTo(...polygon[i]);
      }
      path.closePath();
    }
    shape.path2d = path;
  }
  return shape.path2d;
}

function drawPolygonShape(ctx, scalefactor, shape, color) {
  ctx.save();
  if (!("svgpath" in shape)) {
    ctx.translate(...shape.pos);
    ctx.rotate(deg2rad(-shape.angle));
  }
  if("filled" in shape && !shape.filled) {
    ctx.strokeStyle = color;
    ctx.lineWidth = Math.max(1 / scalefactor, shape.width);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke(getPolygonsPath(shape));
  } else {
    ctx.fillStyle = color;
    ctx.fill(getPolygonsPath(shape));
  }
  ctx.restore();
}

function drawDrawing(ctx, scalefactor, drawing, color) {
  if (["segment", "arc", "circle", "curve", "rect"].includes(drawing.type)) {
    drawedge(ctx, scalefactor, drawing, color);
  } else if (drawing.type == "polygon") {
    drawPolygonShape(ctx, scalefactor, drawing, color);
  } else {
    drawText(ctx, drawing, color);
  }
}

function getCirclePath(radius) {
  var path = new Path2D();
  path.arc(0, 0, radius, 0, 2 * Math.PI);
  path.closePath();
  return path;
}

function getCachedPadPath(pad) {
  if (!pad.path2d) {
    // if path2d is not set, build one and cache it on pad object
    if (pad.shape == "rect") {
      pad.path2d = new Path2D();
      pad.path2d.rect(...pad.size.map(c => -c * 0.5), ...pad.size);
    } else if (pad.shape == "oval") {
      pad.path2d = getOblongPath(pad.size);
    } else if (pad.shape == "circle") {
      pad.path2d = getCirclePath(pad.size[0] / 2);
    } else if (pad.shape == "roundrect") {
      pad.path2d = getChamferedRectPath(pad.size, pad.radius, 0, 0);
    } else if (pad.shape == "chamfrect") {
      pad.path2d = getChamferedRectPath(pad.size, pad.radius, pad.chamfpos, pad.chamfratio)
    } else if (pad.shape == "custom") {
      pad.path2d = getPolygonsPath(pad);
    }
  }
  return pad.path2d;
}

function drawPad(ctx, pad, color, outline) {
  ctx.save();
  ctx.translate(...pad.pos);
  ctx.rotate(-deg2rad(pad.angle));
  if (pad.offset) {
    ctx.translate(...pad.offset);
  }
  ctx.fillStyle = color;
  ctx.strokeStyle = color;
  var path = getCachedPadPath(pad);
  if (outline) {
    ctx.stroke(path);
  } else {
    ctx.fill(path);
  }
  ctx.restore();
}

function drawPadHole(ctx, pad, padHoleColor) {
  if (pad.type != "th") return;
  ctx.save();
  ctx.translate(...pad.pos);
  ctx.rotate(-deg2rad(pad.angle));
  ctx.fillStyle = padHoleColor;
  if (pad.drillshape == "oblong") {
    ctx.fill(getOblongPath(pad.drillsize));
  } else {
    ctx.fill(getCirclePath(pad.drillsize[0] / 2));
  }
  ctx.restore();
}

function drawFootprint(ctx, layer, scalefactor, footprint, colors, highlight, outline) {
  if (highlight) {
    // draw bounding box
    if (footprint.layer == layer) {
      ctx.save();
      ctx.globalAlpha = 0.2;
      ctx.translate(...footprint.bbox.pos);
      ctx.rotate(deg2rad(-footprint.bbox.angle));
      ctx.translate(...footprint.bbox.relpos);
      ctx.fillStyle = colors.pad;
      ctx.fillRect(0, 0, ...footprint.bbox.size);
      ctx.globalAlpha = 1;
      ctx.strokeStyle = colors.pad;
      ctx.lineWidth = 3 / scalefactor;
      ctx.strokeRect(0, 0, ...footprint.bbox.size);
      ctx.restore();
    }
  }
  // draw drawings
  for (var drawing of footprint.drawings) {
    if (drawing.layer == layer) {
      drawDrawing(ctx, scalefactor, drawing.drawing, colors.pad);
    }
  }
  ctx.lineWidth = 3 / scalefactor;
  // draw pads
  if (settings.renderPads) {
    for (var pad of footprint.pads) {
      if (pad.layers.includes(layer)) {
        drawPad(ctx, pad, colors.pad, outline);
        if (pad.pin1 &&
          (settings.highlightpin1 == "all" ||
            settings.highlightpin1 == "selected" && highlight)) {
          drawPad(ctx, pad, colors.outline, true);
        }
      }
    }
    for (var pad of footprint.pads) {
      drawPadHole(ctx, pad, colors.padHole);
    }
  }
}

function drawEdgeCuts(canvas, scalefactor) {
  var ctx = canvas.getContext("2d");
  var edgecolor = getComputedStyle(topmostdiv).getPropertyValue('--pcb-edge-color');
  for (var edge of pcbdata.edges) {
    drawDrawing(ctx, scalefactor, edge, edgecolor);
  }
}

function drawFootprints(canvas, layer, scalefactor, highlight) {
  var ctx = canvas.getContext("2d");
  ctx.lineWidth = 3 / scalefactor;
  var style = getComputedStyle(topmostdiv);

  var colors = {
    pad: style.getPropertyValue('--pad-color'),
    padHole: style.getPropertyValue('--pad-hole-color'),
    outline: style.getPropertyValue('--pin1-outline-color'),
  }

  for (var i = 0; i < pcbdata.footprints.length; i++) {
    var mod = pcbdata.footprints[i];
    var outline = settings.renderDnpOutline && pcbdata.bom.skipped.includes(i);
    var h = highlightedFootprints.includes(i);
    var d = markedFootprints.has(i);
    if (highlight) {
      if(h && d) {
        colors.pad = style.getPropertyValue('--pad-color-highlight-both');
        colors.outline = style.getPropertyValue('--pin1-outline-color-highlight-both');
      } else if (h) {
        colors.pad = style.getPropertyValue('--pad-color-highlight');
        colors.outline = style.getPropertyValue('--pin1-outline-color-highlight');
      } else if (d) {
        colors.pad = style.getPropertyValue('--pad-color-highlight-marked');
        colors.outline = style.getPropertyValue('--pin1-outline-color-highlight-marked');
      }
    }
    if( h || d || !highlight) {
      drawFootprint(ctx, layer, scalefactor, mod, colors, highlight, outline);
    }
  }
}

function drawBgLayer(layername, canvas, layer, scalefactor, edgeColor, polygonColor, textColor) {
  var ctx = canvas.getContext("2d");
  for (var d of pcbdata.drawings[layername][layer]) {
    if (["segment", "arc", "circle", "curve", "rect"].includes(d.type)) {
      drawedge(ctx, scalefactor, d, edgeColor);
    } else if (d.type == "polygon") {
      drawPolygonShape(ctx, scalefactor, d, polygonColor);
    } else {
      drawText(ctx, d, textColor);
    }
  }
}

function drawTracks(canvas, layer, defaultColor, highlight) {
  ctx = canvas.getContext("2d");
  ctx.lineCap = "round";

  var hasHole = (track) => (
    'drillsize' in track &&
    track.start[0] == track.end[0] &&
    track.start[1] == track.end[1]);

  // First draw tracks and tented vias
  for (var track of pcbdata.tracks[layer]) {
    if (highlight && highlightedNet != track.net) continue;
    if (!hasHole(track)) {
      ctx.strokeStyle = highlight ? defaultColor : settings.netColors[track.net] || defaultColor;
      ctx.lineWidth = track.width;
      ctx.beginPath();
      if ('radius' in track) {
        ctx.arc(
          ...track.center,
          track.radius,
          deg2rad(track.startangle),
          deg2rad(track.endangle));
      } else {
        ctx.moveTo(...track.start);
        ctx.lineTo(...track.end);
      }
      ctx.stroke();
    }
  }
  // Second pass to draw untented vias
  var style = getComputedStyle(topmostdiv);
  var holeColor = style.getPropertyValue('--pad-hole-color')

  for (var track of pcbdata.tracks[layer]) {
    if (highlight && highlightedNet != track.net) continue;
    if (hasHole(track)) {
      ctx.strokeStyle = highlight ? defaultColor : settings.netColors[track.net] || defaultColor;
      ctx.lineWidth = track.width;
      ctx.beginPath();
      ctx.moveTo(...track.start);
      ctx.lineTo(...track.end);
      ctx.stroke();
      ctx.strokeStyle = holeColor;
      ctx.lineWidth = track.drillsize;
      ctx.lineTo(...track.end);
      ctx.stroke();
    }
  }
}

function drawZones(canvas, layer, defaultColor, highlight) {
  ctx = canvas.getContext("2d");
  ctx.lineJoin = "round";
  for (var zone of pcbdata.zones[layer]) {
    if (highlight && highlightedNet != zone.net) continue;
    ctx.strokeStyle = highlight ? defaultColor : settings.netColors[zone.net] || defaultColor;
    ctx.fillStyle = highlight ? defaultColor : settings.netColors[zone.net] || defaultColor;
    if (!zone.path2d) {
      zone.path2d = getPolygonsPath(zone);
    }
    ctx.fill(zone.path2d, zone.fillrule || "nonzero");
    if (zone.width > 0) {
      ctx.lineWidth = zone.width;
      ctx.stroke(zone.path2d);
    }
  }
}

function clearCanvas(canvas, color = null) {
  var ctx = canvas.getContext("2d");
  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  if (color) {
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  } else {
    if (!window.matchMedia("print").matches)
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  ctx.restore();
}

function drawNets(canvas, layer, highlight) {
  var style = getComputedStyle(topmostdiv);
  if (settings.renderZones) {
    var zoneColor = style.getPropertyValue(highlight ? '--zone-color-highlight' : '--zone-color');
    drawZones(canvas, layer, zoneColor, highlight);
  }
  if (settings.renderTracks) {
    var trackColor = style.getPropertyValue(highlight ? '--track-color-highlight' : '--track-color');
    drawTracks(canvas, layer, trackColor, highlight);
  }
  if (highlight && settings.renderPads) {
    var padColor = style.getPropertyValue('--pad-color-highlight');
    var padHoleColor = style.getPropertyValue('--pad-hole-color');
    var ctx = canvas.getContext("2d");
    for (var footprint of pcbdata.footprints) {
      // draw pads
      var padDrawn = false;
      for (var pad of footprint.pads) {
        if (highlightedNet != pad.net) continue;
        if (pad.layers.includes(layer)) {
          drawPad(ctx, pad, padColor, false);
          padDrawn = true;
        }
      }
      if (padDrawn) {
        // redraw all pad holes because some pads may overlap
        for (var pad of footprint.pads) {
          drawPadHole(ctx, pad, padHoleColor);
        }
      }
    }
  }
}

function drawHighlightsOnLayer(canvasdict, clear = true) {
  if (clear) {
    clearCanvas(canvasdict.highlight);
  }
  if (markedFootprints.size > 0 || highlightedFootprints.length > 0) {
    drawFootprints(canvasdict.highlight, canvasdict.layer,
      canvasdict.transform.s * canvasdict.transform.zoom, true);
  }
  if (highlightedNet !== null) {
    drawNets(canvasdict.highlight, canvasdict.layer, true);
  }
}

function drawHighlights() {
  drawHighlightsOnLayer(allcanvas.front);
  drawHighlightsOnLayer(allcanvas.back);
}

function drawBackground(canvasdict, clear = true) {
  if (clear) {
    clearCanvas(canvasdict.bg);
    clearCanvas(canvasdict.fab);
    clearCanvas(canvasdict.silk);
  }

  drawNets(canvasdict.bg, canvasdict.layer, false);
  drawFootprints(canvasdict.bg, canvasdict.layer,
    canvasdict.transform.s * canvasdict.transform.zoom, false);

  drawEdgeCuts(canvasdict.bg, canvasdict.transform.s * canvasdict.transform.zoom);

  var style = getComputedStyle(topmostdiv);
  var edgeColor = style.getPropertyValue('--silkscreen-edge-color');
  var polygonColor = style.getPropertyValue('--silkscreen-polygon-color');
  var textColor = style.getPropertyValue('--silkscreen-text-color');
  if (settings.renderSilkscreen) {
    drawBgLayer(
      "silkscreen", canvasdict.silk, canvasdict.layer,
      canvasdict.transform.s * canvasdict.transform.zoom,
      edgeColor, polygonColor, textColor);
  }
  edgeColor = style.getPropertyValue('--fabrication-edge-color');
  polygonColor = style.getPropertyValue('--fabrication-polygon-color');
  textColor = style.getPropertyValue('--fabrication-text-color');
  if (settings.renderFabrication) {
    drawBgLayer(
      "fabrication", canvasdict.fab, canvasdict.layer,
      canvasdict.transform.s * canvasdict.transform.zoom,
      edgeColor, polygonColor, textColor);
  }
}

function prepareCanvas(canvas, flip, transform) {
  var ctx = canvas.getContext("2d");
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.scale(transform.zoom, transform.zoom);
  ctx.translate(transform.panx, transform.pany);
  if (flip) {
    ctx.scale(-1, 1);
  }
  ctx.translate(transform.x, transform.y);
  ctx.rotate(deg2rad(settings.boardRotation + (flip && settings.offsetBackRotation ? - 180 : 0)));
  ctx.scale(transform.s, transform.s);
}

function prepareLayer(canvasdict) {
  var flip = (canvasdict.layer === "B");
  for (var c of ["bg", "fab", "silk", "highlight"]) {
    prepareCanvas(canvasdict[c], flip, canvasdict.transform);
  }
}

function rotateVector(v, angle) {
  angle = deg2rad(angle);
  return [
    v[0] * Math.cos(angle) - v[1] * Math.sin(angle),
    v[0] * Math.sin(angle) + v[1] * Math.cos(angle)
  ];
}

function applyRotation(bbox, flip) {
  var corners = [
    [bbox.minx, bbox.miny],
    [bbox.minx, bbox.maxy],
    [bbox.maxx, bbox.miny],
    [bbox.maxx, bbox.maxy],
  ];
  corners = corners.map((v) => rotateVector(v, settings.boardRotation + (flip && settings.offsetBackRotation ? - 180 : 0)));
  return {
    minx: corners.reduce((a, v) => Math.min(a, v[0]), Infinity),
    miny: corners.reduce((a, v) => Math.min(a, v[1]), Infinity),
    maxx: corners.reduce((a, v) => Math.max(a, v[0]), -Infinity),
    maxy: corners.reduce((a, v) => Math.max(a, v[1]), -Infinity),
  }
}

function recalcLayerScale(layerdict, width, height) {
  var flip = (layerdict.layer === "B");
  var bbox = applyRotation(pcbdata.edges_bbox, flip);
  var scalefactor = 0.98 * Math.min(
    width / (bbox.maxx - bbox.minx),
    height / (bbox.maxy - bbox.miny)
  );
  if (scalefactor < 0.1) {
    scalefactor = 1;
  }
  layerdict.transform.s = scalefactor;
  if (flip) {
    layerdict.transform.x = -((bbox.maxx + bbox.minx) * scalefactor + width) * 0.5;
  } else {
    layerdict.transform.x = -((bbox.maxx + bbox.minx) * scalefactor - width) * 0.5;
  }
  layerdict.transform.y = -((bbox.maxy + bbox.miny) * scalefactor - height) * 0.5;
  for (var c of ["bg", "fab", "silk", "highlight"]) {
    canvas = layerdict[c];
    canvas.width = width;
    canvas.height = height;
    canvas.style.width = (width / devicePixelRatio) + "px";
    canvas.style.height = (height / devicePixelRatio) + "px";
  }
}

function redrawCanvas(layerdict) {
  prepareLayer(layerdict);
  drawBackground(layerdict);
  drawHighlightsOnLayer(layerdict);
}

function resizeCanvas(layerdict) {
  var canvasdivid = {
    "F": "frontcanvas",
    "B": "backcanvas"
  } [layerdict.layer];
  var width = document.getElementById(canvasdivid).clientWidth * devicePixelRatio;
  var height = document.getElementById(canvasdivid).clientHeight * devicePixelRatio;
  recalcLayerScale(layerdict, width, height);
  redrawCanvas(layerdict);
}

function resizeAll() {
  resizeCanvas(allcanvas.front);
  resizeCanvas(allcanvas.back);
}

function pointWithinDistanceToSegment(x, y, x1, y1, x2, y2, d) {
  var A = x - x1;
  var B = y - y1;
  var C = x2 - x1;
  var D = y2 - y1;

  var dot = A * C + B * D;
  var len_sq = C * C + D * D;
  var dx, dy;
  if (len_sq == 0) {
    // start and end of the segment coincide
    dx = x - x1;
    dy = y - y1;
  } else {
    var param = dot / len_sq;
    var xx, yy;
    if (param < 0) {
      xx = x1;
      yy = y1;
    } else if (param > 1) {
      xx = x2;
      yy = y2;
    } else {
      xx = x1 + param * C;
      yy = y1 + param * D;
    }
    dx = x - xx;
    dy = y - yy;
  }
  return dx * dx + dy * dy <= d * d;
}

function modulo(n, mod) {
  return ((n % mod) + mod) % mod;
}

function pointWithinDistanceToArc(x, y, xc, yc, radius, startangle, endangle, d) {
  var dx = x - xc;
  var dy = y - yc;
  var r_sq = dx * dx + dy * dy;
  var rmin = Math.max(0, radius - d);
  var rmax = radius + d;

  if (r_sq < rmin * rmin || r_sq > rmax * rmax)
    return false;

  var angle1 = modulo(deg2rad(startangle), 2 * Math.PI);
  var dx1 = xc + radius * Math.cos(angle1) - x;
  var dy1 = yc + radius * Math.sin(angle1) - y;
  if (dx1 * dx1 + dy1 * dy1 <= d * d)
    return true;

  var angle2 = modulo(deg2rad(endangle), 2 * Math.PI);
  var dx2 = xc + radius * Math.cos(angle2) - x;
  var dy2 = yc + radius * Math.sin(angle2) - y;
  if (dx2 * dx2 + dy2 * dy2 <= d * d)
    return true;

  var angle = modulo(Math.atan2(dy, dx), 2 * Math.PI);
  if (angle1 > angle2)
    return (angle >= angle2 || angle <= angle1);
  else
    return (angle >= angle1 && angle <= angle2);
}

function pointWithinPad(x, y, pad) {
  var v = [x - pad.pos[0], y - pad.pos[1]];
  v = rotateVector(v, pad.angle);
  if (pad.offset) {
    v[0] -= pad.offset[0];
    v[1] -= pad.offset[1];
  }
  return emptyContext2d.isPointInPath(getCachedPadPath(pad), ...v);
}

function netHitScan(layer, x, y) {
  // Check track segments
  if (settings.renderTracks && pcbdata.tracks) {
    for (var track of pcbdata.tracks[layer]) {
      if ('radius' in track) {
        if (pointWithinDistanceToArc(x, y, ...track.center, track.radius, track.startangle, track.endangle, track.width / 2)) {
          return track.net;
        }
      } else {
        if (pointWithinDistanceToSegment(x, y, ...track.start, ...track.end, track.width / 2)) {
          return track.net;
        }
      }
    }
  }
  // Check pads
  if (settings.renderPads) {
    for (var footprint of pcbdata.footprints) {
      for (var pad of footprint.pads) {
        if (pad.layers.includes(layer) && pointWithinPad(x, y, pad)) {
          return pad.net;
        }
      }
    }
  }
  return null;
}

function pointWithinFootprintBbox(x, y, bbox) {
  var v = [x - bbox.pos[0], y - bbox.pos[1]];
  v = rotateVector(v, bbox.angle);
  return bbox.relpos[0] <= v[0] && v[0] <= bbox.relpos[0] + bbox.size[0] &&
    bbox.relpos[1] <= v[1] && v[1] <= bbox.relpos[1] + bbox.size[1];
}

function bboxHitScan(layer, x, y) {
  var result = [];
  for (var i = 0; i < pcbdata.footprints.length; i++) {
    var footprint = pcbdata.footprints[i];
    if (footprint.layer == layer) {
      if (pointWithinFootprintBbox(x, y, footprint.bbox)) {
        result.push(i);
      }
    }
  }
  return result;
}

function handlePointerDown(e, layerdict) {
  if (e.button != 0 && e.button != 1) {
    return;
  }
  e.preventDefault();
  e.stopPropagation();

  if (!e.hasOwnProperty("offsetX")) {
    // The polyfill doesn't set this properly
    e.offsetX = e.pageX - e.currentTarget.offsetLeft;
    e.offsetY = e.pageY - e.currentTarget.offsetTop;
  }

  layerdict.pointerStates[e.pointerId] = {
    distanceTravelled: 0,
    lastX: e.offsetX,
    lastY: e.offsetY,
    downTime: Date.now(),
  };
}

function handleMouseClick(e, layerdict) {
  if (!e.hasOwnProperty("offsetX")) {
    // The polyfill doesn't set this properly
    e.offsetX = e.pageX - e.currentTarget.offsetLeft;
    e.offsetY = e.pageY - e.currentTarget.offsetTop;
  }

  var x = e.offsetX;
  var y = e.offsetY;
  var t = layerdict.transform;
  var flip = layerdict.layer === "B";
  if (flip) {
    x = (devicePixelRatio * x / t.zoom - t.panx + t.x) / -t.s;
  } else {
    x = (devicePixelRatio * x / t.zoom - t.panx - t.x) / t.s;
  }
  y = (devicePixelRatio * y / t.zoom - t.y - t.pany) / t.s;
  var v = rotateVector([x, y], -settings.boardRotation + (flip && settings.offsetBackRotation ? - 180 : 0));
  if ("nets" in pcbdata) {
    var net = netHitScan(layerdict.layer, ...v);
    if (net !== highlightedNet) {
      netClicked(net);
    }
  }
  if (highlightedNet === null) {
    var footprints = bboxHitScan(layerdict.layer, ...v);
    if (footprints.length > 0) {
      footprintsClicked(footprints);
    }
  }
}

function handlePointerLeave(e, layerdict) {
  e.preventDefault();
  e.stopPropagation();

  if (!settings.redrawOnDrag) {
    redrawCanvas(layerdict);
  }

  delete layerdict.pointerStates[e.pointerId];
}

function resetTransform(layerdict) {
  layerdict.transform.panx = 0;
  layerdict.transform.pany = 0;
  layerdict.transform.zoom = 1;
  redrawCanvas(layerdict);
}

function handlePointerUp(e, layerdict) {
  if (!e.hasOwnProperty("offsetX")) {
    // The polyfill doesn't set this properly
    e.offsetX = e.pageX - e.currentTarget.offsetLeft;
    e.offsetY = e.pageY - e.currentTarget.offsetTop;
  }

  e.preventDefault();
  e.stopPropagation();

  if (e.button == 2) {
    // Reset pan and zoom on right click.
    resetTransform(layerdict);
    layerdict.anotherPointerTapped = false;
    return;
  }

  // We haven't necessarily had a pointermove event since the interaction started, so make sure we update this now
  var ptr = layerdict.pointerStates[e.pointerId];
  ptr.distanceTravelled += Math.abs(e.offsetX - ptr.lastX) + Math.abs(e.offsetY - ptr.lastY);

  if (e.button == 0 && ptr.distanceTravelled < 10 && Date.now() - ptr.downTime <= 500) {
    if (Object.keys(layerdict.pointerStates).length == 1) {
      if (layerdict.anotherPointerTapped) {
        // This is the second pointer coming off of a two-finger tap
        resetTransform(layerdict);
      } else {
        // This is just a regular tap
        handleMouseClick(e, layerdict);
      }
      layerdict.anotherPointerTapped = false;
    } else {
      // This is the first finger coming off of what could become a two-finger tap
      layerdict.anotherPointerTapped = true;
    }
  } else {
    if (!settings.redrawOnDrag) {
      redrawCanvas(layerdict);
    }
    layerdict.anotherPointerTapped = false;
  }

  delete layerdict.pointerStates[e.pointerId];
}

function handlePointerMove(e, layerdict) {
  if (!layerdict.pointerStates.hasOwnProperty(e.pointerId)) {
    return;
  }
  e.preventDefault();
  e.stopPropagation();

  if (!e.hasOwnProperty("offsetX")) {
    // The polyfill doesn't set this properly
    e.offsetX = e.pageX - e.currentTarget.offsetLeft;
    e.offsetY = e.pageY - e.currentTarget.offsetTop;
  }

  var thisPtr = layerdict.pointerStates[e.pointerId];

  var dx = e.offsetX - thisPtr.lastX;
  var dy = e.offsetY - thisPtr.lastY;

  // If this number is low on pointer up, we count the action as a click
  thisPtr.distanceTravelled += Math.abs(dx) + Math.abs(dy);

  if (Object.keys(layerdict.pointerStates).length == 1) {
    // This is a simple drag
    layerdict.transform.panx += devicePixelRatio * dx / layerdict.transform.zoom;
    layerdict.transform.pany += devicePixelRatio * dy / layerdict.transform.zoom;
  } else if (Object.keys(layerdict.pointerStates).length == 2) {
    var otherPtr = Object.values(layerdict.pointerStates).filter((ptr) => ptr != thisPtr)[0];

    var oldDist = Math.sqrt(Math.pow(thisPtr.lastX - otherPtr.lastX, 2) + Math.pow(thisPtr.lastY - otherPtr.lastY, 2));
    var newDist = Math.sqrt(Math.pow(e.offsetX - otherPtr.lastX, 2) + Math.pow(e.offsetY - otherPtr.lastY, 2));

    var scaleFactor = newDist / oldDist;

    if (scaleFactor != NaN) {
      layerdict.transform.zoom *= scaleFactor;

      var zoomd = (1 - scaleFactor) / layerdict.transform.zoom;
      layerdict.transform.panx += devicePixelRatio * otherPtr.lastX * zoomd;
      layerdict.transform.pany += devicePixelRatio * otherPtr.lastY * zoomd;
    }
  }

  thisPtr.lastX = e.offsetX;
  thisPtr.lastY = e.offsetY;

  if (settings.redrawOnDrag) {
    redrawCanvas(layerdict);
  }
}

function handleMouseWheel(e, layerdict) {
  e.preventDefault();
  e.stopPropagation();
  var t = layerdict.transform;
  var wheeldelta = e.deltaY;
  if (e.deltaMode == 1) {
    // FF only, scroll by lines
    wheeldelta *= 30;
  } else if (e.deltaMode == 2) {
    wheeldelta *= 300;
  }
  var m = Math.pow(1.1, -wheeldelta / 40);
  // Limit amount of zoom per tick.
  if (m > 2) {
    m = 2;
  } else if (m < 0.5) {
    m = 0.5;
  }
  t.zoom *= m;
  var zoomd = (1 - m) / t.zoom;
  t.panx += devicePixelRatio * e.offsetX * zoomd;
  t.pany += devicePixelRatio * e.offsetY * zoomd;
  redrawCanvas(layerdict);
}

function addMouseHandlers(div, layerdict) {
  div.addEventListener("pointerdown", function(e) {
    handlePointerDown(e, layerdict);
  });
  div.addEventListener("pointermove", function(e) {
    handlePointerMove(e, layerdict);
  });
  div.addEventListener("pointerup", function(e) {
    handlePointerUp(e, layerdict);
  });
  var pointerleave = function(e) {
    handlePointerLeave(e, layerdict);
  }
  div.addEventListener("pointercancel", pointerleave);
  div.addEventListener("pointerleave", pointerleave);
  div.addEventListener("pointerout", pointerleave);

  div.onwheel = function(e) {
    handleMouseWheel(e, layerdict);
  }
  for (var element of [div, layerdict.bg, layerdict.fab, layerdict.silk, layerdict.highlight]) {
    element.addEventListener("contextmenu", function(e) {
      e.preventDefault();
    }, false);
  }
}

function setRedrawOnDrag(value) {
  settings.redrawOnDrag = value;
  writeStorage("redrawOnDrag", value);
}

function setBoardRotation(value) {
  settings.boardRotation = value * 5;
  writeStorage("boardRotation", settings.boardRotation);
  document.getElementById("rotationDegree").textContent = settings.boardRotation;
  resizeAll();
}

function setOffsetBackRotation(value) {
  settings.offsetBackRotation = value;
  writeStorage("offsetBackRotation", value);
  resizeAll();
}

function initRender() {
  allcanvas = {
    front: {
      transform: {
        x: 0,
        y: 0,
        s: 1,
        panx: 0,
        pany: 0,
        zoom: 1,
      },
      pointerStates: {},
      anotherPointerTapped: false,
      bg: document.getElementById("F_bg"),
      fab: document.getElementById("F_fab"),
      silk: document.getElementById("F_slk"),
      highlight: document.getElementById("F_hl"),
      layer: "F",
    },
    back: {
      transform: {
        x: 0,
        y: 0,
        s: 1,
        panx: 0,
        pany: 0,
        zoom: 1,
      },
      pointerStates: {},
      anotherPointerTapped: false,
      bg: document.getElementById("B_bg"),
      fab: document.getElementById("B_fab"),
      silk: document.getElementById("B_slk"),
      highlight: document.getElementById("B_hl"),
      layer: "B",
    }
  };
  addMouseHandlers(document.getElementById("frontcanvas"), allcanvas.front);
  addMouseHandlers(document.getElementById("backcanvas"), allcanvas.back);
}

///////////////////////////////////////////////

///////////////////////////////////////////////
/*
 * Table reordering via Drag'n'Drop
 * Inspired by: https://htmldom.dev/drag-and-drop-table-column
 */

function setBomHandlers() {

  const bom = document.getElementById('bomtable');

  let dragName;
  let placeHolderElements;
  let draggingElement;
  let forcePopulation;
  let xOffset;
  let yOffset;
  let wasDragged;

  const mouseUpHandler = function(e) {
    // Delete dragging element
    draggingElement.remove();

    // Make BOM selectable again
    bom.style.removeProperty("userSelect");

    // Remove listeners
    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);

    if (wasDragged) {
      // Redraw whole BOM
      populateBomTable();
    }
  }

  const mouseMoveHandler = function(e) {
    // Notice the dragging
    wasDragged = true;

    // Make the dragged element visible
    draggingElement.style.removeProperty("display");

    // Set elements position to mouse position
    draggingElement.style.left = `${e.screenX - xOffset}px`;
    draggingElement.style.top = `${e.screenY - yOffset}px`;

    // Forced redrawing of BOM table
    if (forcePopulation) {
      forcePopulation = false;
      // Copy array
      phe = Array.from(placeHolderElements);
      // populate BOM table again
      populateBomHeader(dragName, phe);
      populateBomBody(dragName, phe);
    }

    // Set up array of hidden columns
    var hiddenColumns = Array.from(settings.hiddenColumns);
    // In the ungrouped mode, quantity don't exist
    if (settings.bommode === "ungrouped")
      hiddenColumns.push("Quantity");
    // If no checkbox fields can be found, we consider them hidden
    if (settings.checkboxes.length == 0)
      hiddenColumns.push("checkboxes");

    // Get table headers and group them into checkboxes, extrafields and normal headers
    const bh = document.getElementById("bomhead");
    headers = Array.from(bh.querySelectorAll("th"))
    headers.shift() // numCol is not part of the columnOrder
    headerGroups = []
    lastCompoundClass = null;
    for (i = 0; i < settings.columnOrder.length; i++) {
      cElem = settings.columnOrder[i];
      if (hiddenColumns.includes(cElem)) {
        // Hidden columns appear as a dummy element
        headerGroups.push([]);
        continue;
      }
      elem = headers.filter(e => getColumnOrderName(e) === cElem)[0];
      if (elem.classList.contains("bom-checkbox")) {
        if (lastCompoundClass === "bom-checkbox") {
          cbGroup = headerGroups.pop();
          cbGroup.push(elem);
          headerGroups.push(cbGroup);
        } else {
          lastCompoundClass = "bom-checkbox";
          headerGroups.push([elem])
        }
      } else {
        headerGroups.push([elem])
      }
    }

    // Copy settings.columnOrder
    var columns = Array.from(settings.columnOrder)

    // Set up array with indices of hidden columns
    var hiddenIndices = hiddenColumns.map(e => settings.columnOrder.indexOf(e));
    var dragIndex = columns.indexOf(dragName);
    var swapIndex = dragIndex;
    var swapDone = false;

    // Check if the current dragged element is swapable with the left or right element
    if (dragIndex > 0) {
      // Get left headers boundingbox
      swapIndex = dragIndex - 1;
      while (hiddenIndices.includes(swapIndex) && swapIndex > 0)
        swapIndex--;
      if (!hiddenIndices.includes(swapIndex)) {
        box = getBoundingClientRectFromMultiple(headerGroups[swapIndex]);
        if (e.clientX < box.left + window.scrollX + (box.width / 2)) {
          swapElement = columns[dragIndex];
          columns.splice(dragIndex, 1);
          columns.splice(swapIndex, 0, swapElement);
          forcePopulation = true;
          swapDone = true;
        }
      }
    }
    if ((!swapDone) && dragIndex < headerGroups.length - 1) {
      // Get right headers boundingbox
      swapIndex = dragIndex + 1;
      while (hiddenIndices.includes(swapIndex))
        swapIndex++;
      if (swapIndex < headerGroups.length) {
        box = getBoundingClientRectFromMultiple(headerGroups[swapIndex]);
        if (e.clientX > box.left + window.scrollX + (box.width / 2)) {
          swapElement = columns[dragIndex];
          columns.splice(dragIndex, 1);
          columns.splice(swapIndex, 0, swapElement);
          forcePopulation = true;
          swapDone = true;
        }
      }
    }

    // Write back change to storage
    if (swapDone) {
      settings.columnOrder = columns
      writeStorage("columnOrder", JSON.stringify(columns));
    }

  }

  const mouseDownHandler = function(e) {
    var target = e.target;
    if (target.tagName.toLowerCase() != "td")
      target = target.parentElement;

    // Used to check if a dragging has ever happened
    wasDragged = false;

    // Create new element which will be displayed as the dragged column
    draggingElement = document.createElement("div")
    draggingElement.classList.add("dragging");
    draggingElement.style.display = "none";
    draggingElement.style.position = "absolute";
    draggingElement.style.overflow = "hidden";

    // Get bomhead and bombody elements
    const bh = document.getElementById("bomhead");
    const bb = document.getElementById("bombody");

    // Get all compound headers for the current column
    var compoundHeaders;
    if (target.classList.contains("bom-checkbox")) {
      compoundHeaders = Array.from(bh.querySelectorAll("th.bom-checkbox"));
    } else {
      compoundHeaders = [target];
    }

    // Create new table which will display the column
    var newTable = document.createElement("table");
    newTable.classList.add("bom");
    newTable.style.background = "white";
    draggingElement.append(newTable);

    // Create new header element
    var newHeader = document.createElement("thead");
    newTable.append(newHeader);

    // Set up array for storing all placeholder elements
    placeHolderElements = [];

    // Add all compound headers to the new thead element and placeholders
    compoundHeaders.forEach(function(h) {
      clone = cloneElementWithDimensions(h);
      newHeader.append(clone);
      placeHolderElements.push(clone);
    });

    // Create new body element
    var newBody = document.createElement("tbody");
    newTable.append(newBody);

    // Get indices for compound headers
    var idxs = compoundHeaders.map(e => getBomTableHeaderIndex(e));

    // For each row in the BOM body...
    var rows = bb.querySelectorAll("tr");
    rows.forEach(function(row) {
      // ..get the cells for the compound column
      const tds = row.querySelectorAll("td");
      var copytds = idxs.map(i => tds[i]);
      // Add them to the new element and the placeholders
      var newRow = document.createElement("tr");
      copytds.forEach(function(td) {
        clone = cloneElementWithDimensions(td);
        newRow.append(clone);
        placeHolderElements.push(clone);
      });
      newBody.append(newRow);
    });

    // Compute width for compound header
    var width = compoundHeaders.reduce((acc, x) => acc + x.clientWidth, 0);
    draggingElement.style.width = `${width}px`;

    // Insert the new dragging element and disable selection on BOM
    bom.insertBefore(draggingElement, null);
    bom.style.userSelect = "none";

    // Determine the mouse position offset
    xOffset = e.screenX - compoundHeaders.reduce((acc, x) => Math.min(acc, x.offsetLeft), compoundHeaders[0].offsetLeft);
    yOffset = e.screenY - compoundHeaders[0].offsetTop;

    // Get name for the column in settings.columnOrder
    dragName = getColumnOrderName(target);

    // Change text and class for placeholder elements
    placeHolderElements = placeHolderElements.map(function(e) {
      newElem = cloneElementWithDimensions(e);
      newElem.textContent = "";
      newElem.classList.add("placeholder");
      return newElem;
    });

    // On next mouse move, the whole BOM needs to be redrawn to show the placeholders
    forcePopulation = true;

    // Add listeners for move and up on mouse
    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  }

  // In netlist mode, there is nothing to reorder
  if (settings.bommode === "netlist")
    return;

  // Add mouseDownHandler to every column except the numCol
  bom.querySelectorAll("th")
    .forEach(function(head) {
      if (!head.classList.contains("numCol")) {
        head.onmousedown = mouseDownHandler;
      }
    });

}

function getBoundingClientRectFromMultiple(elements) {
  var elems = Array.from(elements);

  if (elems.length == 0)
    return null;

  var box = elems.shift()
    .getBoundingClientRect();

  elems.forEach(function(elem) {
    var elembox = elem.getBoundingClientRect();
    box.left = Math.min(elembox.left, box.left);
    box.top = Math.min(elembox.top, box.top);
    box.width += elembox.width;
    box.height = Math.max(elembox.height, box.height);
  });

  return box;
}

function cloneElementWithDimensions(elem) {
  var newElem = elem.cloneNode(true);
  newElem.style.height = window.getComputedStyle(elem).height;
  newElem.style.width = window.getComputedStyle(elem).width;
  return newElem;
}

function getBomTableHeaderIndex(elem) {
  const bh = document.getElementById('bomhead');
  const ths = Array.from(bh.querySelectorAll("th"));
  return ths.indexOf(elem);
}

function getColumnOrderName(elem) {
  var cname = elem.getAttribute("col_name");
  if (cname === "bom-checkbox")
    return "checkboxes";
  else
    return cname;
}

function resizableGrid(tablehead) {
  var cols = tablehead.firstElementChild.children;
  var rowWidth = tablehead.offsetWidth;

  for (var i = 1; i < cols.length; i++) {
    if (cols[i].classList.contains("bom-checkbox"))
      continue;
    cols[i].style.width = ((cols[i].clientWidth - paddingDiff(cols[i])) * 100 / rowWidth) + '%';
  }

  for (var i = 1; i < cols.length - 1; i++) {
    var div = document.createElement('div');
    div.className = "column-width-handle";
    cols[i].appendChild(div);
    setListeners(div);
  }

  function setListeners(div) {
    var startX, curCol, nxtCol, curColWidth, nxtColWidth, rowWidth;

    div.addEventListener('mousedown', function(e) {
      e.preventDefault();
      e.stopPropagation();

      curCol = e.target.parentElement;
      nxtCol = curCol.nextElementSibling;
      startX = e.pageX;

      var padding = paddingDiff(curCol);

      rowWidth = curCol.parentElement.offsetWidth;
      curColWidth = curCol.clientWidth - padding;
      nxtColWidth = nxtCol.clientWidth - padding;
    });

    document.addEventListener('mousemove', function(e) {
      if (startX) {
        var diffX = e.pageX - startX;
        diffX = -Math.min(-diffX, curColWidth - 20);
        diffX = Math.min(diffX, nxtColWidth - 20);

        curCol.style.width = ((curColWidth + diffX) * 100 / rowWidth) + '%';
        nxtCol.style.width = ((nxtColWidth - diffX) * 100 / rowWidth) + '%';
        console.log(`${curColWidth + nxtColWidth} ${(curColWidth + diffX) * 100 / rowWidth + (nxtColWidth - diffX) * 100 / rowWidth}`);
      }
    });

    document.addEventListener('mouseup', function(e) {
      curCol = undefined;
      nxtCol = undefined;
      startX = undefined;
      nxtColWidth = undefined;
      curColWidth = undefined
    });
  }

  function paddingDiff(col) {

    if (getStyleVal(col, 'box-sizing') == 'border-box') {
      return 0;
    }

    var padLeft = getStyleVal(col, 'padding-left');
    var padRight = getStyleVal(col, 'padding-right');
    return (parseInt(padLeft) + parseInt(padRight));

  }

  function getStyleVal(elm, css) {
    return (window.getComputedStyle(elm, null).getPropertyValue(css))
  }
}

///////////////////////////////////////////////

///////////////////////////////////////////////
/* DOM manipulation and misc code */

var bomsplit;
var canvassplit;
var initDone = false;
var bomSortFunction = null;
var currentSortColumn = null;
var currentSortOrder = null;
var currentHighlightedRowId;
var highlightHandlers = [];
var footprintIndexToHandler = {};
var netsToHandler = {};
var markedFootprints = new Set();
var highlightedFootprints = [];
var highlightedNet = null;
var lastClicked;

function dbg(html) {
  dbgdiv.innerHTML = html;
}

function redrawIfInitDone() {
  if (initDone) {
    redrawCanvas(allcanvas.front);
    redrawCanvas(allcanvas.back);
  }
}

function padsVisible(value) {
  writeStorage("padsVisible", value);
  settings.renderPads = value;
  redrawIfInitDone();
}

function referencesVisible(value) {
  writeStorage("referencesVisible", value);
  settings.renderReferences = value;
  redrawIfInitDone();
}

function valuesVisible(value) {
  writeStorage("valuesVisible", value);
  settings.renderValues = value;
  redrawIfInitDone();
}

function tracksVisible(value) {
  writeStorage("tracksVisible", value);
  settings.renderTracks = value;
  redrawIfInitDone();
}

function zonesVisible(value) {
  writeStorage("zonesVisible", value);
  settings.renderZones = value;
  redrawIfInitDone();
}

function dnpOutline(value) {
  writeStorage("dnpOutline", value);
  settings.renderDnpOutline = value;
  redrawIfInitDone();
}

function setDarkMode(value) {
  if (value) {
    topmostdiv.classList.add("dark");
  } else {
    topmostdiv.classList.remove("dark");
  }
  writeStorage("darkmode", value);
  settings.darkMode = value;
  redrawIfInitDone();
  if (initDone) {
    populateBomTable();
  }
}

function setShowBOMColumn(field, value) {
  if (field === "references") {
    var rl = document.getElementById("reflookup");
    rl.disabled = !value;
    if (!value) {
      rl.value = "";
      updateRefLookup("");
    }
  }

  var n = settings.hiddenColumns.indexOf(field);
  if (value) {
    if (n != -1) {
      settings.hiddenColumns.splice(n, 1);
    }
  } else {
    if (n == -1) {
      settings.hiddenColumns.push(field);
    }
  }

  writeStorage("hiddenColumns", JSON.stringify(settings.hiddenColumns));

  if (initDone) {
    populateBomTable();
  }

  redrawIfInitDone();
}


function setFullscreen(value) {
  if (value) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}

function fabricationVisible(value) {
  writeStorage("fabricationVisible", value);
  settings.renderFabrication = value;
  redrawIfInitDone();
}

function silkscreenVisible(value) {
  writeStorage("silkscreenVisible", value);
  settings.renderSilkscreen = value;
  redrawIfInitDone();
}

function setHighlightPin1(value) {
  writeStorage("highlightpin1", value);
  settings.highlightpin1 = value;
  redrawIfInitDone();
}

function getStoredCheckboxRefs(checkbox) {
  function convert(ref) {
    var intref = parseInt(ref);
    if (isNaN(intref)) {
      for (var i = 0; i < pcbdata.footprints.length; i++) {
        if (pcbdata.footprints[i].ref == ref) {
          return i;
        }
      }
      return -1;
    } else {
      return intref;
    }
  }
  if (!(checkbox in settings.checkboxStoredRefs)) {
    var val = readStorage("checkbox_" + checkbox);
    settings.checkboxStoredRefs[checkbox] = val ? val : "";
  }
  if (!settings.checkboxStoredRefs[checkbox]) {
    return new Set();
  } else {
    return new Set(settings.checkboxStoredRefs[checkbox].split(",").map(r => convert(r)).filter(a => a >= 0));
  }
}

function getCheckboxState(checkbox, references) {
  var storedRefsSet = getStoredCheckboxRefs(checkbox);
  var currentRefsSet = new Set(references.map(r => r[1]));
  // Get difference of current - stored
  var difference = new Set(currentRefsSet);
  for (ref of storedRefsSet) {
    difference.delete(ref);
  }
  if (difference.size == 0) {
    // All the current refs are stored
    return "checked";
  } else if (difference.size == currentRefsSet.size) {
    // None of the current refs are stored
    return "unchecked";
  } else {
    // Some of the refs are stored
    return "indeterminate";
  }
}

function setBomCheckboxState(checkbox, element, references) {
  var state = getCheckboxState(checkbox, references);
  element.checked = (state == "checked");
  element.indeterminate = (state == "indeterminate");
}

function createCheckboxChangeHandler(checkbox, references, row) {
  return function () {
    refsSet = getStoredCheckboxRefs(checkbox);
    var markWhenChecked = settings.markWhenChecked == checkbox;
    eventArgs = {
      checkbox: checkbox,
      refs: references,
    }
    if (this.checked) {
      // checkbox ticked
      for (var ref of references) {
        refsSet.add(ref[1]);
      }
      if (markWhenChecked) {
        row.classList.add("checked");
        for (var ref of references) {
          markedFootprints.add(ref[1]);
        }
        drawHighlights();
      }
      eventArgs.state = 'checked';
    } else {
      // checkbox unticked
      for (var ref of references) {
        refsSet.delete(ref[1]);
      }
      if (markWhenChecked) {
        row.classList.remove("checked");
        for (var ref of references) {
          markedFootprints.delete(ref[1]);
        }
        drawHighlights();
      }
      eventArgs.state = 'unchecked';
    }
    settings.checkboxStoredRefs[checkbox] = [...refsSet].join(",");
    writeStorage("checkbox_" + checkbox, settings.checkboxStoredRefs[checkbox]);
    updateCheckboxStats(checkbox);
    EventHandler.emitEvent(IBOM_EVENT_TYPES.CHECKBOX_CHANGE_EVENT, eventArgs);
  }
}

function clearHighlightedFootprints() {
  if (currentHighlightedRowId) {
    document.getElementById(currentHighlightedRowId).classList.remove("highlighted");
    currentHighlightedRowId = null;
    highlightedFootprints = [];
    highlightedNet = null;
  }
}

function createRowHighlightHandler(rowid, refs, net) {
  return function () {
    if (currentHighlightedRowId) {
      if (currentHighlightedRowId == rowid) {
        return;
      }
      document.getElementById(currentHighlightedRowId).classList.remove("highlighted");
    }
    document.getElementById(rowid).classList.add("highlighted");
    currentHighlightedRowId = rowid;
    highlightedFootprints = refs ? refs.map(r => r[1]) : [];
    highlightedNet = net;
    drawHighlights();
    EventHandler.emitEvent(
      IBOM_EVENT_TYPES.HIGHLIGHT_EVENT, {
      rowid: rowid,
      refs: refs,
      net: net
    });
  }
}

function updateNetColors() {
  writeStorage("netColors", JSON.stringify(settings.netColors));
  redrawIfInitDone();
}

function netColorChangeHandler(net) {
  return (event) => {
    settings.netColors[net] = event.target.value;
    updateNetColors();
  }
}

function netColorRightClick(net) {
  return (event) => {
    if(event.button == 2) {
      event.preventDefault();
      event.stopPropagation();

      var style = getComputedStyle(topmostdiv);
      var defaultNetColor = style.getPropertyValue('--track-color').trim();
      event.target.value = defaultNetColor;
      delete settings.netColors[net];
      updateNetColors();
    }
  }
}

function entryMatches(entry) {
  if (settings.bommode == "netlist") {
    // entry is just a net name
    return entry.toLowerCase().indexOf(filter) >= 0;
  }
  // check refs
  if (!settings.hiddenColumns.includes("references")) {
    for (var ref of entry) {
      if (ref[0].toLowerCase().indexOf(filter) >= 0) {
        return true;
      }
    }
  }
  // check fields
  for (var i in config.fields) {
    var f = config.fields[i];
    if (!settings.hiddenColumns.includes(f)) {
      for (var ref of entry) {
        if (String(pcbdata.bom.fields[ref[1]][i]).toLowerCase().indexOf(filter) >= 0) {
          return true;
        }
      }
    }
  }
  return false;
}

function findRefInEntry(entry) {
  return entry.filter(r => r[0].toLowerCase() == reflookup);
}

function highlightFilter(s) {
  if (!filter) {
    return s;
  }
  var parts = s.toLowerCase().split(filter);
  if (parts.length == 1) {
    return s;
  }
  var r = "";
  var pos = 0;
  for (var i in parts) {
    if (i > 0) {
      r += '<mark class="highlight">' +
        s.substring(pos, pos + filter.length) +
        '</mark>';
      pos += filter.length;
    }
    r += s.substring(pos, pos + parts[i].length);
    pos += parts[i].length;
  }
  return r;
}

function checkboxSetUnsetAllHandler(checkboxname) {
  return function () {
    var checkboxnum = 0;
    while (checkboxnum < settings.checkboxes.length &&
      settings.checkboxes[checkboxnum].toLowerCase() != checkboxname.toLowerCase()) {
      checkboxnum++;
    }
    if (checkboxnum >= settings.checkboxes.length) {
      return;
    }
    var allset = true;
    var checkbox;
    var row;
    for (row of bombody.childNodes) {
      checkbox = row.childNodes[checkboxnum + 1].childNodes[0];
      if (!checkbox.checked || checkbox.indeterminate) {
        allset = false;
        break;
      }
    }
    for (row of bombody.childNodes) {
      checkbox = row.childNodes[checkboxnum + 1].childNodes[0];
      checkbox.checked = !allset;
      checkbox.indeterminate = false;
      checkbox.onchange();
    }
  }
}

function createColumnHeader(name, cls, comparator, is_checkbox = false) {
  var th = document.createElement("TH");
  th.innerHTML = name;
  th.classList.add(cls);
  if (is_checkbox)
    th.setAttribute("col_name", "bom-checkbox");
  else
    th.setAttribute("col_name", name);
  var span = document.createElement("SPAN");
  span.classList.add("sortmark");
  span.classList.add("none");
  th.appendChild(span);
  var spacer = document.createElement("div");
  spacer.className = "column-spacer";
  th.appendChild(spacer);
  spacer.onclick = function () {
    if (currentSortColumn && th !== currentSortColumn) {
      // Currently sorted by another column
      currentSortColumn.childNodes[1].classList.remove(currentSortOrder);
      currentSortColumn.childNodes[1].classList.add("none");
      currentSortColumn = null;
      currentSortOrder = null;
    }
    if (currentSortColumn && th === currentSortColumn) {
      // Already sorted by this column
      if (currentSortOrder == "asc") {
        // Sort by this column, descending order
        bomSortFunction = function (a, b) {
          return -comparator(a, b);
        }
        currentSortColumn.childNodes[1].classList.remove("asc");
        currentSortColumn.childNodes[1].classList.add("desc");
        currentSortOrder = "desc";
      } else {
        // Unsort
        bomSortFunction = null;
        currentSortColumn.childNodes[1].classList.remove("desc");
        currentSortColumn.childNodes[1].classList.add("none");
        currentSortColumn = null;
        currentSortOrder = null;
      }
    } else {
      // Sort by this column, ascending order
      bomSortFunction = comparator;
      currentSortColumn = th;
      currentSortColumn.childNodes[1].classList.remove("none");
      currentSortColumn.childNodes[1].classList.add("asc");
      currentSortOrder = "asc";
    }
    populateBomBody();
  }
  if (is_checkbox) {
    spacer.onclick = fancyDblClickHandler(
      spacer, spacer.onclick, checkboxSetUnsetAllHandler(name));
  }
  return th;
}

function populateBomHeader(placeHolderColumn = null, placeHolderElements = null) {
  while (bomhead.firstChild) {
    bomhead.removeChild(bomhead.firstChild);
  }
  var tr = document.createElement("TR");
  var th = document.createElement("TH");
  th.classList.add("numCol");

  var vismenu = document.createElement("div");
  vismenu.id = "vismenu";
  vismenu.classList.add("menu");

  var visbutton = document.createElement("div");
  visbutton.classList.add("visbtn");
  visbutton.classList.add("hideonprint");

  var viscontent = document.createElement("div");
  viscontent.classList.add("menu-content");
  viscontent.id = "vismenu-content";

  settings.columnOrder.forEach(column => {
    if (typeof column !== "string")
      return;

    // Skip empty columns
    if (column === "checkboxes" && settings.checkboxes.length == 0)
      return;
    else if (column === "Quantity" && settings.bommode == "ungrouped")
      return;

    var label = document.createElement("label");
    label.classList.add("menu-label");

    var input = document.createElement("input");
    input.classList.add("visibility_checkbox");
    input.type = "checkbox";
    input.onchange = function (e) {
      setShowBOMColumn(column, e.target.checked)
    };
    input.checked = !(settings.hiddenColumns.includes(column));

    label.appendChild(input);
    if (column.length > 0)
      label.append(column[0].toUpperCase() + column.slice(1));

    viscontent.appendChild(label);
  });

  viscontent.childNodes[0].classList.add("menu-label-top");

  vismenu.appendChild(visbutton);
  if (settings.bommode != "netlist") {
    vismenu.appendChild(viscontent);
    th.appendChild(vismenu);
  }
  tr.appendChild(th);

  var checkboxCompareClosure = function (checkbox) {
    return (a, b) => {
      var stateA = getCheckboxState(checkbox, a);
      var stateB = getCheckboxState(checkbox, b);
      if (stateA > stateB) return -1;
      if (stateA < stateB) return 1;
      return 0;
    }
  }
  var stringFieldCompareClosure = function (fieldIndex) {
    return (a, b) => {
      var fa = pcbdata.bom.fields[a[0][1]][fieldIndex];
      var fb = pcbdata.bom.fields[b[0][1]][fieldIndex];
      if (fa != fb) return fa > fb ? 1 : -1;
      else return 0;
    }
  }
  var referenceRegex = /(?<prefix>[^0-9]+)(?<number>[0-9]+)/;
  var compareRefs = (a, b) => {
    var ra = referenceRegex.exec(a);
    var rb = referenceRegex.exec(b);
    if (ra === null || rb === null) {
      if (a != b) return a > b ? 1 : -1;
      return 0;
    } else {
      if (ra.groups.prefix != rb.groups.prefix) {
        return ra.groups.prefix > rb.groups.prefix ? 1 : -1;
      }
      if (ra.groups.number != rb.groups.number) {
        return parseInt(ra.groups.number) > parseInt(rb.groups.number) ? 1 : -1;
      }
      return 0;
    }
  }
  if (settings.bommode == "netlist") {
    tr.appendChild(createColumnHeader("Net name", "bom-netname", (a, b) => {
      if (a > b) return -1;
      if (a < b) return 1;
      return 0;
    }));
    tr.appendChild(createColumnHeader("Color", "bom-color", (a, b) => {
      return 0;
    }));
  } else {
    // Filter hidden columns
    var columns = settings.columnOrder.filter(e => !settings.hiddenColumns.includes(e));
    var valueIndex = config.fields.indexOf("Value");
    var footprintIndex = config.fields.indexOf("Footprint");
    columns.forEach((column) => {
      if (column === placeHolderColumn) {
        var n = 1;
        if (column === "checkboxes")
          n = settings.checkboxes.length;
        for (i = 0; i < n; i++) {
          td = placeHolderElements.shift();
          tr.appendChild(td);
        }
        return;
      } else if (column === "checkboxes") {
        for (var checkbox of settings.checkboxes) {
          th = createColumnHeader(
            checkbox, "bom-checkbox", checkboxCompareClosure(checkbox), true);
          tr.appendChild(th);
        }
      } else if (column === "References") {
        tr.appendChild(createColumnHeader("References", "references", (a, b) => {
          var i = 0;
          while (i < a.length && i < b.length) {
            if (a[i] != b[i]) return compareRefs(a[i][0], b[i][0]);
            i++;
          }
          return a.length - b.length;
        }));
      } else if (column === "Value") {
        tr.appendChild(createColumnHeader("Value", "value", (a, b) => {
          var ra = a[0][1], rb = b[0][1];
          return valueCompare(
            pcbdata.bom.parsedValues[ra], pcbdata.bom.parsedValues[rb],
            pcbdata.bom.fields[ra][valueIndex], pcbdata.bom.fields[rb][valueIndex]);
        }));
        return;
      } else if (column === "Footprint") {
        tr.appendChild(createColumnHeader(
          "Footprint", "footprint", stringFieldCompareClosure(footprintIndex)));
      } else if (column === "Quantity" && settings.bommode == "grouped") {
        tr.appendChild(createColumnHeader("Quantity", "quantity", (a, b) => {
          return a.length - b.length;
        }));
      } else {
        // Other fields
        var i = config.fields.indexOf(column);
        if (i < 0)
          return;
        tr.appendChild(createColumnHeader(
          column, `field${i + 1}`, stringFieldCompareClosure(i)));
      }
    });
  }
  bomhead.appendChild(tr);
}

function populateBomBody(placeholderColumn = null, placeHolderElements = null) {
  const urlRegex = /^(https?:\/\/[^\s\/$.?#][^\s]*|file:\/\/([a-zA-Z]:|\/)[^\x00]+)$/;
  while (bom.firstChild) {
    bom.removeChild(bom.firstChild);
  }
  highlightHandlers = [];
  footprintIndexToHandler = {};
  netsToHandler = {};
  currentHighlightedRowId = null;
  var first = true;
  var style = getComputedStyle(topmostdiv);
  var defaultNetColor = style.getPropertyValue('--track-color').trim();
  if (settings.bommode == "netlist") {
    bomtable = pcbdata.nets.slice();
  } else {
    switch (settings.canvaslayout) {
      case 'F':
        bomtable = pcbdata.bom.F.slice();
        break;
      case 'FB':
        bomtable = pcbdata.bom.both.slice();
        break;
      case 'B':
        bomtable = pcbdata.bom.B.slice();
        break;
    }
    if (settings.bommode == "ungrouped") {
      // expand bom table
      expandedTable = []
      for (var bomentry of bomtable) {
        for (var ref of bomentry) {
          expandedTable.push([ref]);
        }
      }
      bomtable = expandedTable;
    }
  }
  if (bomSortFunction) {
    bomtable = bomtable.sort(bomSortFunction);
  }
  for (var i in bomtable) {
    var bomentry = bomtable[i];
    if (filter && !entryMatches(bomentry)) {
      continue;
    }
    var references = null;
    var netname = null;
    var tr = document.createElement("TR");
    var td = document.createElement("TD");
    var rownum = +i + 1;
    tr.id = "bomrow" + rownum;
    td.textContent = rownum;
    tr.appendChild(td);
    if (settings.bommode == "netlist") {
      netname = bomentry;
      td = document.createElement("TD");
      td.innerHTML = highlightFilter(netname ? netname : "&lt;no net&gt;");
      tr.appendChild(td);
      var color = settings.netColors[netname] || defaultNetColor;
      td = document.createElement("TD");
      var colorBox = document.createElement("INPUT");
      colorBox.type = "color";
      colorBox.value = color;
      colorBox.onchange = netColorChangeHandler(netname);
      colorBox.onmouseup = netColorRightClick(netname);
      colorBox.oncontextmenu = (e) => e.preventDefault();
      td.appendChild(colorBox);
      td.classList.add("color-column");
      tr.appendChild(td);
    } else {
      if (reflookup) {
        references = findRefInEntry(bomentry);
        if (references.length == 0) {
          continue;
        }
      } else {
        references = bomentry;
      }
      // Filter hidden columns
      var columns = settings.columnOrder.filter(e => !settings.hiddenColumns.includes(e));
      columns.forEach((column) => {
        if (column === placeholderColumn) {
          var n = 1;
          if (column === "checkboxes")
            n = settings.checkboxes.length;
          for (i = 0; i < n; i++) {
            td = placeHolderElements.shift();
            tr.appendChild(td);
          }
          return;
        } else if (column === "checkboxes") {
          for (var checkbox of settings.checkboxes) {
            if (checkbox) {
              td = document.createElement("TD");
              var input = document.createElement("input");
              input.type = "checkbox";
              input.onchange = createCheckboxChangeHandler(checkbox, references, tr);
              setBomCheckboxState(checkbox, input, references);
              if (input.checked && settings.markWhenChecked == checkbox) {
                tr.classList.add("checked");
              }
              td.appendChild(input);
              tr.appendChild(td);
            }
          }
        } else if (column === "References") {
          td = document.createElement("TD");
          td.innerHTML = highlightFilter(references.map(r => r[0]).join(", "));
          tr.appendChild(td);
        } else if (column === "Quantity" && settings.bommode == "grouped") {
          // Quantity
          td = document.createElement("TD");
          td.textContent = references.length;
          tr.appendChild(td);
        } else {
          // All the other fields
          var field_index = config.fields.indexOf(column)
          if (field_index < 0)
            return;
          var valueSet = new Set();
          references.map(r => r[1]).forEach((id) => valueSet.add(pcbdata.bom.fields[id][field_index]));
          td = document.createElement("TD");
          var output = new Array();
          for (let item of valueSet) {
            const visible = highlightFilter(String(item));
            if (typeof item === 'string' && item.match(urlRegex)) {
              output.push(`<a href="${item}" target="_blank">${visible}</a>`);
            } else {
              output.push(visible);
            }
          }
          td.innerHTML = output.join(", ");
          tr.appendChild(td);
        }
      });
    }
    bom.appendChild(tr);
    var handler = createRowHighlightHandler(tr.id, references, netname);
    tr.onmousemove = handler;
    highlightHandlers.push({
      id: tr.id,
      handler: handler,
    });
    if (references !== null) {
      for (var refIndex of references.map(r => r[1])) {
        footprintIndexToHandler[refIndex] = handler;
      }
    }
    if (netname !== null) {
      netsToHandler[netname] = handler;
    }
    if ((filter || reflookup) && first) {
      handler();
      first = false;
    }
  }
  EventHandler.emitEvent(
    IBOM_EVENT_TYPES.BOM_BODY_CHANGE_EVENT, {
    filter: filter,
    reflookup: reflookup,
    checkboxes: settings.checkboxes,
    bommode: settings.bommode,
  });
}

function highlightPreviousRow() {
  if (!currentHighlightedRowId) {
    highlightHandlers[highlightHandlers.length - 1].handler();
  } else {
    if (highlightHandlers.length > 1 &&
      highlightHandlers[0].id == currentHighlightedRowId) {
      highlightHandlers[highlightHandlers.length - 1].handler();
    } else {
      for (var i = 0; i < highlightHandlers.length - 1; i++) {
        if (highlightHandlers[i + 1].id == currentHighlightedRowId) {
          highlightHandlers[i].handler();
          break;
        }
      }
    }
  }
  smoothScrollToRow(currentHighlightedRowId);
}

function highlightNextRow() {
  if (!currentHighlightedRowId) {
    highlightHandlers[0].handler();
  } else {
    if (highlightHandlers.length > 1 &&
      highlightHandlers[highlightHandlers.length - 1].id == currentHighlightedRowId) {
      highlightHandlers[0].handler();
    } else {
      for (var i = 1; i < highlightHandlers.length; i++) {
        if (highlightHandlers[i - 1].id == currentHighlightedRowId) {
          highlightHandlers[i].handler();
          break;
        }
      }
    }
  }
  smoothScrollToRow(currentHighlightedRowId);
}

function populateBomTable() {
  populateBomHeader();
  populateBomBody();
  setBomHandlers();
  resizableGrid(bomhead);
}

function footprintsClicked(footprintIndexes) {
  var lastClickedIndex = footprintIndexes.indexOf(lastClicked);
  for (var i = 1; i <= footprintIndexes.length; i++) {
    var refIndex = footprintIndexes[(lastClickedIndex + i) % footprintIndexes.length];
    if (refIndex in footprintIndexToHandler) {
      lastClicked = refIndex;
      footprintIndexToHandler[refIndex]();
      smoothScrollToRow(currentHighlightedRowId);
      break;
    }
  }
}

function netClicked(net) {
  if (net in netsToHandler) {
    netsToHandler[net]();
    smoothScrollToRow(currentHighlightedRowId);
  } else {
    clearHighlightedFootprints();
    highlightedNet = net;
    drawHighlights();
  }
}

function updateFilter(input) {
  filter = input.toLowerCase();
  populateBomTable();
}

function updateRefLookup(input) {
  reflookup = input.toLowerCase();
  populateBomTable();
}

function changeCanvasLayout(layout) {
  document.getElementById("fl-btn").classList.remove("depressed");
  document.getElementById("fb-btn").classList.remove("depressed");
  document.getElementById("bl-btn").classList.remove("depressed");
  switch (layout) {
    case 'F':
      document.getElementById("fl-btn").classList.add("depressed");
      if (settings.bomlayout != "bom-only") {
        canvassplit.collapse(1);
      }
      break;
    case 'B':
      document.getElementById("bl-btn").classList.add("depressed");
      if (settings.bomlayout != "bom-only") {
        canvassplit.collapse(0);
      }
      break;
    default:
      document.getElementById("fb-btn").classList.add("depressed");
      if (settings.bomlayout != "bom-only") {
        canvassplit.setSizes([50, 50]);
      }
  }
  settings.canvaslayout = layout;
  writeStorage("canvaslayout", layout);
  resizeAll();
  changeBomMode(settings.bommode);
}

function populateMetadata() {
  document.getElementById("title").innerHTML = pcbdata.metadata.title;
  document.getElementById("revision").innerHTML = "Rev: " + pcbdata.metadata.revision;
  document.getElementById("company").innerHTML = pcbdata.metadata.company;
  document.getElementById("filedate").innerHTML = pcbdata.metadata.date;
  if (pcbdata.metadata.title != "") {
    document.title = pcbdata.metadata.title + " BOM";
  }
  // Calculate board stats
  var fp_f = 0,
    fp_b = 0,
    pads_f = 0,
    pads_b = 0,
    pads_th = 0;
  for (var i = 0; i < pcbdata.footprints.length; i++) {
    if (pcbdata.bom.skipped.includes(i)) continue;
    var mod = pcbdata.footprints[i];
    if (mod.layer == "F") {
      fp_f++;
    } else {
      fp_b++;
    }
    for (var pad of mod.pads) {
      if (pad.type == "th") {
        pads_th++;
      } else {
        if (pad.layers.includes("F")) {
          pads_f++;
        }
        if (pad.layers.includes("B")) {
          pads_b++;
        }
      }
    }
  }
  document.getElementById("stats-components-front").innerHTML = fp_f;
  document.getElementById("stats-components-back").innerHTML = fp_b;
  document.getElementById("stats-components-total").innerHTML = fp_f + fp_b;
  document.getElementById("stats-groups-front").innerHTML = pcbdata.bom.F.length;
  document.getElementById("stats-groups-back").innerHTML = pcbdata.bom.B.length;
  document.getElementById("stats-groups-total").innerHTML = pcbdata.bom.both.length;
  document.getElementById("stats-smd-pads-front").innerHTML = pads_f;
  document.getElementById("stats-smd-pads-back").innerHTML = pads_b;
  document.getElementById("stats-smd-pads-total").innerHTML = pads_f + pads_b;
  document.getElementById("stats-th-pads").innerHTML = pads_th;
  // Update version string
  document.getElementById("github-link").innerHTML = "InteractiveHtmlBom&nbsp;" +
    /^v\d+\.\d+/.exec(pcbdata.ibom_version)[0];
}

function changeBomLayout(layout) {
  document.getElementById("bom-btn").classList.remove("depressed");
  document.getElementById("lr-btn").classList.remove("depressed");
  document.getElementById("tb-btn").classList.remove("depressed");
  switch (layout) {
    case 'bom-only':
      document.getElementById("bom-btn").classList.add("depressed");
      if (bomsplit) {
        bomsplit.destroy();
        bomsplit = null;
        canvassplit.destroy();
        canvassplit = null;
      }
      document.getElementById("frontcanvas").style.display = "none";
      document.getElementById("backcanvas").style.display = "none";
      document.getElementById("topmostdiv").style.height = "";
      document.getElementById("topmostdiv").style.display = "block";
      break;
    case 'top-bottom':
      document.getElementById("tb-btn").classList.add("depressed");
      document.getElementById("frontcanvas").style.display = "";
      document.getElementById("backcanvas").style.display = "";
      document.getElementById("topmostdiv").style.height = "100%";
      document.getElementById("topmostdiv").style.display = "flex";
      document.getElementById("bomdiv").classList.remove("split-horizontal");
      document.getElementById("canvasdiv").classList.remove("split-horizontal");
      document.getElementById("frontcanvas").classList.add("split-horizontal");
      document.getElementById("backcanvas").classList.add("split-horizontal");
      if (bomsplit) {
        bomsplit.destroy();
        bomsplit = null;
        canvassplit.destroy();
        canvassplit = null;
      }
      bomsplit = Split(['#bomdiv', '#canvasdiv'], {
        sizes: [50, 50],
        onDragEnd: resizeAll,
        direction: "vertical",
        gutterSize: 5
      });
      canvassplit = Split(['#frontcanvas', '#backcanvas'], {
        sizes: [50, 50],
        gutterSize: 5,
        onDragEnd: resizeAll
      });
      break;
    case 'left-right':
      document.getElementById("lr-btn").classList.add("depressed");
      document.getElementById("frontcanvas").style.display = "";
      document.getElementById("backcanvas").style.display = "";
      document.getElementById("topmostdiv").style.height = "100%";
      document.getElementById("topmostdiv").style.display = "flex";
      document.getElementById("bomdiv").classList.add("split-horizontal");
      document.getElementById("canvasdiv").classList.add("split-horizontal");
      document.getElementById("frontcanvas").classList.remove("split-horizontal");
      document.getElementById("backcanvas").classList.remove("split-horizontal");
      if (bomsplit) {
        bomsplit.destroy();
        bomsplit = null;
        canvassplit.destroy();
        canvassplit = null;
      }
      bomsplit = Split(['#bomdiv', '#canvasdiv'], {
        sizes: [50, 50],
        onDragEnd: resizeAll,
        gutterSize: 5
      });
      canvassplit = Split(['#frontcanvas', '#backcanvas'], {
        sizes: [50, 50],
        gutterSize: 5,
        direction: "vertical",
        onDragEnd: resizeAll
      });
  }
  settings.bomlayout = layout;
  writeStorage("bomlayout", layout);
  changeCanvasLayout(settings.canvaslayout);
}

function changeBomMode(mode) {
  document.getElementById("bom-grouped-btn").classList.remove("depressed");
  document.getElementById("bom-ungrouped-btn").classList.remove("depressed");
  document.getElementById("bom-netlist-btn").classList.remove("depressed");
  var chkbxs = document.getElementsByClassName("visibility_checkbox");

  switch (mode) {
    case 'grouped':
      document.getElementById("bom-grouped-btn").classList.add("depressed");
      for (var i = 0; i < chkbxs.length; i++) {
        chkbxs[i].disabled = false;
      }
      break;
    case 'ungrouped':
      document.getElementById("bom-ungrouped-btn").classList.add("depressed");
      for (var i = 0; i < chkbxs.length; i++) {
        chkbxs[i].disabled = false;
      }
      break;
    case 'netlist':
      document.getElementById("bom-netlist-btn").classList.add("depressed");
      for (var i = 0; i < chkbxs.length; i++) {
        chkbxs[i].disabled = true;
      }
  }

  writeStorage("bommode", mode);
  if (mode != settings.bommode) {
    settings.bommode = mode;
    bomSortFunction = null;
    currentSortColumn = null;
    currentSortOrder = null;
    clearHighlightedFootprints();
  }
  populateBomTable();
}

function focusFilterField() {
  focusInputField(document.getElementById("filter"));
}

function focusRefLookupField() {
  focusInputField(document.getElementById("reflookup"));
}

function toggleBomCheckbox(bomrowid, checkboxnum) {
  if (!bomrowid || checkboxnum > settings.checkboxes.length) {
    return;
  }
  var bomrow = document.getElementById(bomrowid);
  var checkbox = bomrow.childNodes[checkboxnum].childNodes[0];
  checkbox.checked = !checkbox.checked;
  checkbox.indeterminate = false;
  checkbox.onchange();
}

function checkBomCheckbox(bomrowid, checkboxname) {
  var checkboxnum = 0;
  while (checkboxnum < settings.checkboxes.length &&
    settings.checkboxes[checkboxnum].toLowerCase() != checkboxname.toLowerCase()) {
    checkboxnum++;
  }
  if (!bomrowid || checkboxnum >= settings.checkboxes.length) {
    return;
  }
  var bomrow = document.getElementById(bomrowid);
  var checkbox = bomrow.childNodes[checkboxnum + 1].childNodes[0];
  checkbox.checked = true;
  checkbox.indeterminate = false;
  checkbox.onchange();
}

function setBomCheckboxes(value) {
  writeStorage("bomCheckboxes", value);
  settings.checkboxes = value.split(",").map((e) => e.trim()).filter((e) => e);
  prepCheckboxes();
  populateMarkWhenCheckedOptions();
  setMarkWhenChecked(settings.markWhenChecked);
}

function setMarkWhenChecked(value) {
  writeStorage("markWhenChecked", value);
  settings.markWhenChecked = value;
  markedFootprints.clear();
  for (var ref of (value ? getStoredCheckboxRefs(value) : [])) {
    markedFootprints.add(ref);
  }
  populateBomTable();
  drawHighlights();
}

function prepCheckboxes() {
  var table = document.getElementById("checkbox-stats");
  while (table.childElementCount > 1) {
    table.removeChild(table.lastChild);
  }
  if (settings.checkboxes.length) {
    table.style.display = "";
  } else {
    table.style.display = "none";
  }
  for (var checkbox of settings.checkboxes) {
    var tr = document.createElement("TR");
    var td = document.createElement("TD");
    td.innerHTML = checkbox;
    tr.appendChild(td);
    td = document.createElement("TD");
    td.id = "checkbox-stats-" + checkbox;
    var progressbar = document.createElement("div");
    progressbar.classList.add("bar");
    td.appendChild(progressbar);
    var text = document.createElement("div");
    text.classList.add("text");
    td.appendChild(text);
    tr.appendChild(td);
    table.appendChild(tr);
    updateCheckboxStats(checkbox);
  }
}

function populateMarkWhenCheckedOptions() {
  var container = document.getElementById("markWhenCheckedContainer");

  if (settings.checkboxes.length == 0) {
    container.parentElement.style.display = "none";
    return;
  }

  container.innerHTML = '';
  container.parentElement.style.display = "inline-block";

  function createOption(name, displayName) {
    var id = "markWhenChecked-" + name;

    var div = document.createElement("div");
    div.classList.add("radio-container");

    var input = document.createElement("input");
    input.type = "radio";
    input.name = "markWhenChecked";
    input.value = name;
    input.id = id;
    input.onchange = () => setMarkWhenChecked(name);
    div.appendChild(input);

    // Preserve the selected element when the checkboxes change
    if (name == settings.markWhenChecked) {
      input.checked = true;
    }

    var label = document.createElement("label");
    label.innerHTML = displayName;
    label.htmlFor = id;
    div.appendChild(label);

    container.appendChild(div);
  }
  createOption("", "None");
  for (var checkbox of settings.checkboxes) {
    createOption(checkbox, checkbox);
  }
}

function updateCheckboxStats(checkbox) {
  var checked = getStoredCheckboxRefs(checkbox).size;
  var total = pcbdata.footprints.length - pcbdata.bom.skipped.length;
  var percent = checked * 100.0 / total;
  var td = document.getElementById("checkbox-stats-" + checkbox);
  td.firstChild.style.width = percent + "%";
  td.lastChild.innerHTML = checked + "/" + total + " (" + Math.round(percent) + "%)";
}

function constrain(number, min, max){
  return Math.min(Math.max(parseInt(number), min), max);
}

document.onkeydown = function (e) {
  switch (e.key) {
    case "n":
      if (document.activeElement.type == "text") {
        return;
      }
      if (currentHighlightedRowId !== null) {
        checkBomCheckbox(currentHighlightedRowId, "placed");
        highlightNextRow();
        e.preventDefault();
      }
      break;
    case "ArrowUp":
      highlightPreviousRow();
      e.preventDefault();
      break;
    case "ArrowDown":
      highlightNextRow();
      e.preventDefault();
      break;
    case "ArrowLeft":
    case "ArrowRight":
      if (document.activeElement.type != "text"){
        e.preventDefault();
        let boardRotationElement = document.getElementById("boardRotation")
        settings.boardRotation = parseInt(boardRotationElement.value);  // degrees / 5
        if (e.key == "ArrowLeft"){
            settings.boardRotation += 3;  // 15 degrees
        }
        else{
            settings.boardRotation -= 3;
        }
        settings.boardRotation = constrain(settings.boardRotation, boardRotationElement.min, boardRotationElement.max);
        boardRotationElement.value = settings.boardRotation
        setBoardRotation(settings.boardRotation);
      }
      break;
    default:
      break;
  }
  if (e.altKey) {
    switch (e.key) {
      case "f":
        focusFilterField();
        e.preventDefault();
        break;
      case "r":
        focusRefLookupField();
        e.preventDefault();
        break;
      case "z":
        changeBomLayout("bom-only");
        e.preventDefault();
        break;
      case "x":
        changeBomLayout("left-right");
        e.preventDefault();
        break;
      case "c":
        changeBomLayout("top-bottom");
        e.preventDefault();
        break;
      case "v":
        changeCanvasLayout("F");
        e.preventDefault();
        break;
      case "b":
        changeCanvasLayout("FB");
        e.preventDefault();
        break;
      case "n":
        changeCanvasLayout("B");
        e.preventDefault();
        break;
      default:
        break;
    }
    if (e.key >= '1' && e.key <= '9') {
      toggleBomCheckbox(currentHighlightedRowId, parseInt(e.key));
      e.preventDefault();
    }
  }
}

function hideNetlistButton() {
  document.getElementById("bom-ungrouped-btn").classList.remove("middle-button");
  document.getElementById("bom-ungrouped-btn").classList.add("right-most-button");
  document.getElementById("bom-netlist-btn").style.display = "none";
}

function topToggle() {
  var top = document.getElementById("top");
  var toptoggle = document.getElementById("toptoggle");
  if (top.style.display === "none") {
    top.style.display = "flex";
    toptoggle.classList.remove("flipped");
  } else {
    top.style.display = "none";
    toptoggle.classList.add("flipped");
  }
}

window.onload = function (e) {
  initUtils();
  initRender();
  initStorage();
  initDefaults();
  cleanGutters();
  populateMetadata();
  dbgdiv = document.getElementById("dbg");
  bom = document.getElementById("bombody");
  bomhead = document.getElementById("bomhead");
  filter = "";
  reflookup = "";
  if (!("nets" in pcbdata)) {
    hideNetlistButton();
  }
  initDone = true;
  setBomCheckboxes(document.getElementById("bomCheckboxes").value);
  // Triggers render
  changeBomLayout(settings.bomlayout);

  // Users may leave fullscreen without touching the checkbox. Uncheck.
  document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement)
      document.getElementById('fullscreenCheckbox').checked = false;
  });
}

window.onresize = resizeAll;
window.matchMedia("print").addListener(resizeAll);

///////////////////////////////////////////////

///////////////////////////////////////////////
// EventHandler.registerCallback(IBOM_EVENT_TYPES.BOM_BODY_CHANGE_EVENT, () => {
//     for(var tr of bom.childNodes) {
//         tr.onclick = tr.onmousemove;
//         tr.onmousemove = null;
//     };
// });

///////////////////////////////////////////////
