!function(t){var e={};function i(s){if(e[s])return e[s].exports;var l=e[s]={i:s,l:!1,exports:{}};return t[s].call(l.exports,l,l.exports,i),l.l=!0,l.exports}i.m=t,i.c=e,i.d=function(t,e,s){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:s})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(i.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var l in t)i.d(s,l,function(e){return t[e]}.bind(null,l));return s},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=0)}([function(t,e,i){"use strict";i(1);var s=function(t){return t&&t.__esModule?t:{default:t}}(i(3));document.addEventListener("DOMContentLoaded",function(){var t=document.querySelector(".board-container"),e=document.documentElement.style,i=10,l=9,n=9,o=new s.default(t,i,l,n),c=document.querySelector(".diff-btn"),a=document.getElementsByClassName("diff");c.addEventListener("click",function(){o.removeBoard(),!0===a[0].checked?(l=9,n=9,i=10):!0===a[1].checked?(l=16,n=16,i=40):!0===a[2].checked&&(l=30,n=16,i=99),e.setProperty("--width",l),e.setProperty("--height",n),o=new s.default(t,i,l,n)})})},function(t,e,i){},,function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=function(){function t(t,e){for(var i=0;i<e.length;i++){var s=e[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(t,s.key,s)}}return function(e,i,s){return i&&t(e.prototype,i),s&&t(e,s),e}}(),l=function(t){return t&&t.__esModule?t:{default:t}}(i(4));var n=function(){function t(e,i,s,l){var n=this;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.onClick=function(e){var i=n.getField(e);if("flagged"!==i.state){if(!1===n.firstClick){n.firstClick=!0;do{for(var s=0;s<n.height;s+=1)for(var l=0;l<n.width;l+=1)n.collection[s][l].value=0;n.randomizeBombs(),n.assignHints(),n.displayValues()}while(9===i.value)}n.fieldEmptyCheck(i.x,i.y),t.fieldStateChange(i,"clicked"),n.gameLost(i),n.gameWon()}},this.onContextMenu=function(e){var i=n.getField(e);e.preventDefault(),"unclicked"===i.state?t.fieldStateChange(i,"flagged"):"flagged"===i.state&&t.fieldStateChange(i,"unclicked")},this.onDoubleClick=function(t){var e=n.getField(t);"flagged"!==e.state&&(n.revealAround(e.x,e.y),n.gameWon())},this.view=e,this.bombs=i,this.width=s,this.height=l,this.state="initial",this.firstClick=!1,this.createBoard()}return s(t,[{key:"createBoard",value:function(){for(var t=[],e=0;e<this.height;e+=1){for(var i=[],s=0;s<this.width;s+=1){var n=document.createElement("BUTTON"),o=new l.default(n,"unclicked",e,s);this.view.appendChild(o.view),i.push(o),o.view.classList.add(o.state),o.view.addEventListener("click",this.onClick),o.view.addEventListener("contextmenu",this.onContextMenu),o.view.addEventListener("dblclick",this.onDoubleClick)}t.push(i)}this.collection=t}},{key:"removeBoard",value:function(){for(var t=0;t<this.height;t+=1)for(var e=0;e<this.width;e+=1){var i=this.collection[t][e].view;i.removeEventListener("click",this.onClick),i.removeEventListener("contextmenu",this.onContextMenu),i.removeEventListener("dblclick",this.onDoubleClick),this.view.removeChild(this.collection[t][e].view),this.gameReset()}}},{key:"gameLost",value:function(e){if("clicked"===e.state&&9===e.value){this.state="lost",this.view.classList.add("game-lost");for(var i=0;i<this.height;i+=1)for(var s=0;s<this.width;s+=1)t.fieldStateChange(this.collection[i][s],"clicked")}}},{key:"gameWon",value:function(){for(var t=0,e=0;e<this.height;e+=1)for(var i=0;i<this.width;i+=1){"clicked"===this.collection[e][i].state&&(t+=1)}t===this.width*this.height-this.bombs&&(this.state="won",this.view.classList.add("game-won"))}},{key:"gameReset",value:function(){this.state="initial",this.view.classList.remove("game-won"),this.view.classList.remove("game-lost")}},{key:"getField",value:function(t){var e=t.target,i=parseInt(e.getAttribute("data-x"),10),s=parseInt(e.getAttribute("data-y"),10);return this.collection[i][s]}},{key:"isInBounds",value:function(t,e){return t>=0&&e>=0&&t<this.height&&e<this.width}},{key:"fieldEmptyCheck",value:function(e,i){if(e>=0&&i>=0&&e<this.height&&i<this.width){var s=this.collection[e][i];if(!0===s.checked)return;s.checked=!0,"flagged"!==s.state&&t.fieldStateChange(s,"clicked"),0===s.value&&"flagged"!==s.state&&(this.isInBounds(e-1,i-1)&&"flagged"!==this.collection[e-1][i-1].state&&t.fieldStateChange(this.collection[e-1][i-1],"clicked"),this.isInBounds(e-1,i)&&"flagged"!==this.collection[e-1][i].state&&t.fieldStateChange(this.collection[e-1][i],"clicked"),this.isInBounds(e-1,i+1)&&"flagged"!==this.collection[e-1][i+1].state&&t.fieldStateChange(this.collection[e-1][i+1],"clicked"),this.isInBounds(e,i-1)&&"flagged"!==this.collection[e][i-1].state&&t.fieldStateChange(this.collection[e][i-1],"clicked"),this.isInBounds(e,i+1)&&"flagged"!==this.collection[e][i+1].state&&t.fieldStateChange(this.collection[e][i+1],"clicked"),this.isInBounds(e+1,i-1)&&"flagged"!==this.collection[e+1][i-1].state&&t.fieldStateChange(this.collection[e+1][i-1],"clicked"),this.isInBounds(e+1,i)&&"flagged"!==this.collection[e+1][i].state&&t.fieldStateChange(this.collection[e+1][i],"clicked"),this.isInBounds(e+1,i+1)&&"flagged"!==this.collection[e+1][i+1].state&&t.fieldStateChange(this.collection[e+1][i+1],"clicked"),this.fieldEmptyCheck(e-1,i-1),this.fieldEmptyCheck(e-1,i),this.fieldEmptyCheck(e-1,i+1),this.fieldEmptyCheck(e,i-1),this.fieldEmptyCheck(e,i+1),this.fieldEmptyCheck(e+1,i-1),this.fieldEmptyCheck(e+1,i),this.fieldEmptyCheck(e+1,i+1))}}},{key:"revealAround",value:function(e,i){var s=this.collection[e][i],l=0;this.isInBounds(e-1,i-1)&&"flagged"===this.collection[e-1][i-1].state&&(l+=1),this.isInBounds(e-1,i)&&"flagged"===this.collection[e-1][i].state&&(l+=1),this.isInBounds(e-1,i+1)&&"flagged"===this.collection[e-1][i+1].state&&(l+=1),this.isInBounds(e,i-1)&&"flagged"===this.collection[e][i-1].state&&(l+=1),this.isInBounds(e,i+1)&&"flagged"===this.collection[e][i+1].state&&(l+=1),this.isInBounds(e+1,i-1)&&"flagged"===this.collection[e+1][i-1].state&&(l+=1),this.isInBounds(e+1,i)&&"flagged"===this.collection[e+1][i].state&&(l+=1),this.isInBounds(e+1,i+1)&&"flagged"===this.collection[e+1][i+1].state&&(l+=1),s.value===l&&(this.isInBounds(e-1,i-1)&&"flagged"!==this.collection[e-1][i-1].state&&(t.fieldStateChange(this.collection[e-1][i-1],"clicked"),this.gameLost(this.collection[e-1][i-1]),this.fieldEmptyCheck(e-1,i-1)),this.isInBounds(e-1,i)&&"flagged"!==this.collection[e-1][i].state&&(t.fieldStateChange(this.collection[e-1][i],"clicked"),this.gameLost(this.collection[e-1][i]),this.fieldEmptyCheck(e-1,i)),this.isInBounds(e-1,i+1)&&"flagged"!==this.collection[e-1][i+1].state&&(t.fieldStateChange(this.collection[e-1][i+1],"clicked"),this.gameLost(this.collection[e-1][i+1]),this.fieldEmptyCheck(e-1,i+1)),this.isInBounds(e,i-1)&&"flagged"!==this.collection[e][i-1].state&&(t.fieldStateChange(this.collection[e][i-1],"clicked"),this.gameLost(this.collection[e][i-1]),this.fieldEmptyCheck(e,i-1)),this.isInBounds(e,i+1)&&"flagged"!==this.collection[e][i+1].state&&(t.fieldStateChange(this.collection[e][i+1],"clicked"),this.gameLost(this.collection[e][i+1]),this.fieldEmptyCheck(e,i+1)),this.isInBounds(e+1,i-1)&&"flagged"!==this.collection[e+1][i-1].state&&(t.fieldStateChange(this.collection[e+1][i-1],"clicked"),this.gameLost(this.collection[e+1][i-1]),this.fieldEmptyCheck(e+1,i-1)),this.isInBounds(e+1,i)&&"flagged"!==this.collection[e+1][i].state&&(t.fieldStateChange(this.collection[e+1][i],"clicked"),this.gameLost(this.collection[e+1][i]),this.fieldEmptyCheck(e+1,i)),this.isInBounds(e+1,i+1)&&"flagged"!==this.collection[e+1][i+1].state&&(t.fieldStateChange(this.collection[e+1][i+1],"clicked"),this.gameLost(this.collection[e+1][i+1]),this.fieldEmptyCheck(e+1,i+1)))}},{key:"randomizeBombs",value:function(){var t=this.bombs;do{var e=Math.floor(Math.random()*this.height),i=Math.floor(Math.random()*this.width),s=this.collection[e][i];9!==s.value&&(s.value=9,t-=1)}while(t>0)}},{key:"assignHints",value:function(){for(var t=0;t<this.height;t+=1)for(var e=0;e<this.width;e+=1)9!==this.collection[t][e].value&&(this.isInBounds(t-1,e-1)&&9===this.collection[t-1][e-1].value&&(this.collection[t][e].value+=1),this.isInBounds(t-1,e)&&9===this.collection[t-1][e].value&&(this.collection[t][e].value+=1),this.isInBounds(t-1,e+1)&&9===this.collection[t-1][e+1].value&&(this.collection[t][e].value+=1),this.isInBounds(t,e-1)&&9===this.collection[t][e-1].value&&(this.collection[t][e].value+=1),this.isInBounds(t,e+1)&&9===this.collection[t][e+1].value&&(this.collection[t][e].value+=1),this.isInBounds(t+1,e-1)&&9===this.collection[t+1][e-1].value&&(this.collection[t][e].value+=1),this.isInBounds(t+1,e)&&9===this.collection[t+1][e].value&&(this.collection[t][e].value+=1),this.isInBounds(t+1,e+1)&&9===this.collection[t+1][e+1].value&&(this.collection[t][e].value+=1))}},{key:"displayValues",value:function(){for(var t=0;t<this.height;t+=1)for(var e=0;e<this.width;e+=1){this.collection[t][e].view.setAttribute("data-value",this.collection[t][e].value)}}}],[{key:"fieldStateChange",value:function(t,e){t.view.classList.remove(t.state),t.state=e,t.view.classList.add(t.state)}}]),t}();e.default=n},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.default=function t(e,i,s,l){var n=arguments.length>4&&void 0!==arguments[4]?arguments[4]:0;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.view=e,this.state=i,this.x=s,this.y=l,this.value=n,this.view.setAttribute("data-x",s),this.view.setAttribute("data-y",l),this.checked=!1}}]);