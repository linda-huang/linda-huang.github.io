(this["webpackJsonplinda-huang"]=this["webpackJsonplinda-huang"]||[]).push([[0],{15:function(e,t,s){},16:function(e,t,s){},18:function(e,t,s){},20:function(e,t,s){"use strict";s.r(t);var o=s(1),a=s.n(o),i=s(5),h=s.n(i),n=(s(15),s(8)),r=(s(16),s(6)),d=s(7),c=s(3),l=s(10),p=s(9),u=s(2),O=(s(18),s.p+"static/media/mooncake.c0f09b80.svg"),g=s(0),m=Object.freeze({Up:0,Down:1,Left:2,Right:3}),k="#ED2939",v="#13364b",b=function(e){Object(l.a)(s,e);var t=Object(p.a)(s);function s(e){var o;return Object(r.a)(this,s),(o=t.call(this,e)).handleKeyDown=o.handleKeyDown.bind(Object(c.a)(o)),o.state={width:0,height:0,blockWidth:0,blockHeight:0,gameLoopTimeout:60,timeoutId:0,startSnakeSize:0,snake:[],apple:{},fish:{},direction:m.Right,directionChanged:!1,isGameOver:!1,snakeColor:v,appleColor:k,score:0,highScore:Number(localStorage.getItem("snakeHighScore"))||0,newHighScore:!1},o}return Object(d.a)(s,[{key:"componentDidMount",value:function(){u.isMobile||(this.initGame(),window.addEventListener("keydown",this.handleKeyDown),this.gameLoop())}},{key:"initGame",value:function(){var e=.65*document.getElementById("GameBoard").parentElement.offsetWidth;(e-=e%30)<30&&(e=30);var t=e/3*2,s=e/60,o=t/40,a=[],i=e/2,h=t/2,n={Xpos:i,Ypos:h};a.push(n);for(var r=1;r<10;r++){var d={Xpos:i-=s,Ypos:h};a.push(d)}for(var c=Math.floor(Math.random()*((e-s)/s+1))*s,l=Math.floor(Math.random()*((t-o)/o+1))*o;l===a[0].Ypos;)l=Math.floor(Math.random()*((t-o)/o+1))*o;for(var p=Math.floor(Math.random()*((e-3*s)/s+1))*s,u=Math.floor(Math.random()*((t-3*o)/o+1))*o;!(Math.abs(a[0].Ypos-u)>5*o)||this.isAppleOnFish(c,l);)u=Math.floor(Math.random()*((t-3*o)/o+1))*o;this.setState({width:e,height:t,blockWidth:s,blockHeight:o,startSnakeSize:10,snake:a,fish:{Xpos:p,Ypos:u},apple:{Xpos:c,Ypos:l}})}},{key:"gameLoop",value:function(){var e=this,t=setTimeout((function(){e.state.isGameOver||(e.moveSnake(),e.tryToEatSnake(),e.tryToEatApple(),e.tryToEatFish(),e.setState({directionChanged:!1})),e.gameLoop()}),this.state.gameLoopTimeout);this.setState({timeoutId:t})}},{key:"componentWillUnmount",value:function(){u.isMobile||(clearTimeout(this.state.timeoutId),window.removeEventListener("keydown",this.handleKeyDown))}},{key:"resetGame",value:function(){var e=this.state.width,t=this.state.height,s=this.state.blockWidth,o=this.state.blockHeight,a=this.state.apple,i=[],h=e/2,n=t/2,r={Xpos:h,Ypos:n};i.push(r);for(var d=1;d<this.state.startSnakeSize;d++){var c={Xpos:h-=s,Ypos:n};i.push(c)}for(a.Xpos=Math.floor(Math.random()*((e-s)/s+1))*s,a.Ypos=Math.floor(Math.random()*((t-o)/o+1))*o;this.isAppleOnSnake(a.Xpos,a.Ypos);)a.Xpos=Math.floor(Math.random()*((e-s)/s+1))*s,a.Ypos=Math.floor(Math.random()*((t-o)/o+1))*o;this.setState({snake:i,apple:a,direction:m.Right,directionChanged:!1,isGameOver:!1,gameLoopTimeout:60,snakeColor:v,appleColor:k,score:0,newHighScore:!1}),this.props.setIsGameOver(!1)}},{key:"getRandomColor",value:function(){for(var e="#",t=0;t<6;t++)e+="0123456789ABCDEF"[Math.floor(16*Math.random())];return e}},{key:"moveSnake",value:function(){var e=this.state.snake,t=this.state.snake[0].Xpos,s=this.state.snake[0].Ypos,o=t,a=s;this.moveHead();for(var i=1;i<e.length;i++)o=e[i].Xpos,a=e[i].Ypos,e[i].Xpos=t,e[i].Ypos=s,t=o,s=a;this.setState({snake:e})}},{key:"tryToEatFish",value:function(){var e=this.state.snake,t=this.state.fish;e[0].Xpos>=t.Xpos&&e[0].Xpos<=t.Xpos+2*this.state.blockWidth&&e[0].Ypos>=t.Ypos&&e[0].Ypos<=t.Ypos+2*this.state.blockHeight&&(window.location.href="https://linda-huang.github.io/resume.pdf")}},{key:"tryToEatApple",value:function(){var e=this.state.snake,t=this.state.apple;if(e[0].Xpos===t.Xpos&&e[0].Ypos===t.Ypos){var s=this.state.width,o=this.state.height,a=this.state.blockWidth,i=this.state.blockHeight,h={Xpos:t.Xpos,Ypos:t.Ypos},n=this.state.highScore,r=this.state.newHighScore,d=this.state.gameLoopTimeout;for(e.push(h),t.Xpos=Math.floor(Math.random()*((s-a)/a+1))*a,t.Ypos=Math.floor(Math.random()*((o-i)/i+1))*i;this.isAppleOnSnake(t.Xpos,t.Ypos)||this.isAppleOnFish(t.Xpos,t.Ypos);)t.Xpos=Math.floor(Math.random()*((s-a)/a+1))*a,t.Ypos=Math.floor(Math.random()*((o-i)/i+1))*i;this.state.score===n&&(n++,localStorage.setItem("snakeHighScore",n),r=!0),d>25&&(d-=.5),this.setState({snake:e,apple:t,score:this.state.score+1,highScore:n,newHighScore:r,gameLoopTimeout:d})}}},{key:"tryToEatSnake",value:function(){for(var e=this.state.snake,t=1;t<e.length;t++)e[0].Xpos===e[t].Xpos&&e[0].Ypos===e[t].Ypos&&(this.setState({isGameOver:!0}),this.props.setIsGameOver(!0))}},{key:"isAppleOnFish",value:function(e,t){var s=this.state.fish;return e>=s.Xpos&&e<=s.Xpos+2*this.state.blockWidth&&t>=s.Ypos&&t<=s.Ypos+2*this.state.blockHeight}},{key:"isAppleOnSnake",value:function(e,t){for(var s=this.state.snake,o=0;o<s.length;o++)if(e===s[o].Xpos&&t===s[o].Ypos)return!0;return!1}},{key:"moveHead",value:function(){switch(this.state.direction){case m.Left:this.moveHeadLeft();break;case m.Up:this.moveHeadUp();break;case m.Right:this.moveHeadRight();break;default:this.moveHeadDown()}}},{key:"moveHeadLeft",value:function(){var e=this.state.width,t=this.state.blockWidth,s=this.state.snake;s[0].Xpos=s[0].Xpos<=0?e-t:s[0].Xpos-t,this.setState({snake:s})}},{key:"moveHeadUp",value:function(){var e=this.state.height,t=this.state.blockHeight,s=this.state.snake;s[0].Ypos=s[0].Ypos<=0?e-t:s[0].Ypos-t,this.setState({snake:s})}},{key:"moveHeadRight",value:function(){var e=this.state.width,t=this.state.blockWidth,s=this.state.snake;s[0].Xpos=s[0].Xpos>=e-t?0:s[0].Xpos+t,this.setState({snake:s})}},{key:"moveHeadDown",value:function(){var e=this.state.height,t=this.state.blockHeight,s=this.state.snake;s[0].Ypos=s[0].Ypos>=e-t?0:s[0].Ypos+t,this.setState({snake:s})}},{key:"handleKeyDown",value:function(e){if(this.state.isGameOver&&32===e.keyCode)this.resetGame();else if(!this.state.directionChanged){switch(e.keyCode){case 37:case 65:this.goLeft();break;case 38:case 87:this.goUp();break;case 39:case 68:this.goRight();break;case 40:case 83:this.goDown()}this.setState({directionChanged:!0})}}},{key:"goLeft",value:function(){var e=this.state.direction===m.Right?m.Right:m.Left;this.setState({direction:e})}},{key:"goUp",value:function(){var e=this.state.direction===m.Down?m.Down:m.Up;this.setState({direction:e})}},{key:"goRight",value:function(){var e=this.state.direction===m.Left?m.Left:m.Right;this.setState({direction:e})}},{key:"goDown",value:function(){var e=this.state.direction===m.Up?m.Up:m.Down;this.setState({direction:e})}},{key:"render",value:function(){var e=this;return u.isMobile?Object(g.jsx)("a",{href:"https://linda-huang.github.io/resume.pdf",target:"_blank",rel:"noopener noreferrer",children:Object(g.jsx)("div",{children:Object(g.jsx)("img",{src:O,className:"mooncake",alt:"mooncake",height:"250",width:"250"})})}):this.state.isGameOver?Object(g.jsxs)("div",{className:"end-screen",children:[Object(g.jsx)("a",{href:"https://linda-huang.github.io/resume.pdf",target:"_blank",rel:"noopener noreferrer",children:Object(g.jsx)("div",{children:Object(g.jsx)("img",{src:O,className:"mooncake",alt:"mooncake",height:"300",width:"300"})})}),Object(g.jsx)("div",{className:"game-over",children:"game over!"})]}):Object(g.jsxs)("div",{id:"GameBoard",style:{width:this.state.width,height:this.state.height,borderWidth:this.state.width/400},children:[this.state.snake.map((function(t,s){return Object(g.jsx)("div",{className:"Block",style:{width:e.state.blockWidth,height:e.state.blockHeight,left:t.Xpos,top:t.Ypos,background:e.state.snakeColor}},s)})),Object(g.jsx)("div",{className:"Block",style:{width:this.state.blockWidth,height:this.state.blockHeight,left:this.state.apple.Xpos,top:this.state.apple.Ypos,background:this.state.appleColor}}),Object(g.jsx)("a",{href:"https://linda-huang.github.io/resume.pdf",target:"_blank",rel:"noopener noreferrer",children:Object(g.jsx)("img",{src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfQAAAH0CAMAAAD8CC+4AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjkxODFDMjYyNjE3MTExRTk4NDZBOTYzQjJDNjI2NjM3IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjkxODFDMjYzNjE3MTExRTk4NDZBOTYzQjJDNjI2NjM3Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OTE4MUMyNjA2MTcxMTFFOTg0NkE5NjNCMkM2MjY2MzciIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OTE4MUMyNjE2MTcxMTFFOTg0NkE5NjNCMkM2MjY2MzciLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz65q/NyAAABNVBMVEX2+/0jHSu2t7iYi4vY2tr6/f6glpa6urr9/v74/P2dlZmBeX64tLbX19lPQ02onp52anCzr69RSFM+ND9US1V5cHa+v8GUiIvQ0NHV1NSLhorFwMBDO0XY2drCwMHDxMWuq6yQiIxvZ21LRE5KP0mtoqNNR1HIxcWjnaB4aW6BeoBnXGT8/f5HQEpTSVO0r7FbUFnPzs+ajY7u8PJtYmmmnqCtpaX+/v82LTm4ubq1sLF8cnjs7/ApIzCro6PAu7uooaGCeH2wq65yZm3S0dFMQUpoXGWjnJ2emp26u7xdUlq0ra1rYWlyanBwZ26zsLHq6uyVkpXJxcVsZGubkJH9/v+ek5Ta2drSz9FlW2Lf3+BEO0Wsp6mQh4x9dnxEOkU7Mz/IyMiclZhxZWtLQkuPhov///8iegOBAAAAZ3RSTlP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8AFBa6eAAABcVJREFUeNrs3ddS20AUgGEIscGYEnogFUgPkFAS0nvvvffC+z9CHmA3M2dk44K+/1qrkfYb+eqMt2dLpavHFkAXdEEXdEEXdEEXdEEXdEEXdEEXdEEXdEGHLuiCLuiCLuiCLuiCLuiCLuiCLuiCLuiCDl3QBV3QBV3QBV3QBV3QBV3QBV3QBV3QBR26oAu6oAu6oAu6oAu6oAu6oAu6oAu6oAs6dEEXdEEXdEEXdEEXdEEXdEEXdEEXdEEXdOi2ALqgC7qgC7qgC7qgC7qgC7qgC7qgC7qgCzp0QRd0QRd0QRd0Qd/WKj3Fgw4dOnTo0KFDhw4dOnTo0KFDhw4dOnTo0KFDhw4dOnTo0KFDhw4dOvRObSDtRQPomdu9hd5xz59W7y3cSOZ2NejQoUOHDh06dOjQoUOHDh06dOjQoUOHDh06dOjQoUOHDh06dOjQoUPvIvQf46HuDaetVmJB7zT0qd2xMksnd94gLXTo0KFDhw4dOnTo0KFDhw4dOnTo0KFDhw4dOnTo0KFDhw4dOnTo0FtSLbaFteaiP5sO9aD4TGVvF81UlgR9YVeoOejQoUOHDh06dOjQoUOHDh06dOjQoUOHDh06dOjQoUOHDh06dOjQm9Fm5hTL9Rj6+kCszNLLGZHXbUG/knngzZ2OnjvqdjC2hYPBccSRdOl4ZuBxX1/a8cx1mcuONnemsgIdOnTo0KFDhw4dOnTo0KFDhw4dOnTo0KFDhw4dOnTo0KFDhw4dOvQSo1+YT7s1HOtjenbmxmza9dG0V+lldzKXPT4QajVziueTzAN/6IATOzsB/UjmuzkYHEc8kS6dzXyu/ZkpyGp6WXVX4aaDL1HvgP8dhA4dOnTo0KFDhw4dOnTo0KFDhw4dOnTo0KFDhw4dOnTo0KFDhw4dervQ/+xNOzOVdvt02vN06c/mon87lvYyvexh8CW+DiZ9qaVVdjr6/sxWHwqOtB5Ol/Y3F30h87nOxb7+3EvMp3cbafWfTUKHDh06dOjQoUOHDh06dOjQoUOHDh06dOjQoUOHDh06dOjQoUOHDr1d6BMZpdHgPGI1tnSsL1QDg5HRTkGHDh06dOjQoUOHDh06dOjQoUOHDh06dOjQoUOHDh06dOjQoUOHDr3E6N8zh12e7491I7b00ljam21Hv5h5kqfQ/zsY2R/7NFswGNlAuSdZhA4dOnTo0KFDhw4dOnTo0KFDhw4dOnTo0KFDhw4dOnTo0KFDhw4deonRP2cG2M7tiXU/XXqtPejBl9ioJ/2tpC2VcRp2JnjA7snYD0IL0IMv4YBd6NChQ4cOHTp06NChQ4cOHTp06NChQ4cOHTp06NChQ4cOHTp06NDLjH51Iu3sUKy76e2WM9v/rpq2ll62Vi1e8CXeD6SVET3XZE+skXTpYl9bCr5EZav9QYcOHTp06NChQ4cOHTp06NChQ4cOHTp06NChQ4cOHTp06NChQ28H+q8Y+kpx9OWOQV8pI3quWgwz+ud5maXDme2fKS4XrdX/AAgdOnTo0KFDhw4dOnTo0KFDhw4dOnTo0KFDhw4dOnTo0KFDhw4dOvROR1+qhFpqLvqj2CGev+uFu9nqszO7Cb3Zzx9Db+BzjdZNmwYdOnTo0KFDhw4dOnTo0KFDhw4dOnTo0KFDhw4dOnTo0KFDhw4dOvQuLHOI5aeh4g0UD3o7q5Tjc4UOHTp06NChQ4cOHTp06NChQ4cOHTp06NChQ4cOHTp06NChQ4cOHTp0QRd0QYcu6IIu6IIu6IIu6IIu6IIu6IIu6IIu6IIOXdAFXdAFXdAFXdAFXdAFXdAFXdAFXdAFHbqgC7qgC7qgC7qgC7qgC7qgC7qgC7qgCzp0QRd0QRd0QRd0QRd0QRd0QRd0QRd0QRd06LYAuqALuqALuqALuqALuqALuqALuqALuqALOnRBF3RBF3RBF3RBF3RBF3RBF3RBF3RBF3Togi7ogi7o6qr+CTAA1TRRQFOFdUIAAAAASUVORK5CYII=",alt:"fish",height:3*this.state.blockHeight,width:3*this.state.blockWidth,style:{left:this.state.fish.Xpos,top:this.state.fish.Ypos,position:"absolute"}})}),Object(g.jsxs)("div",{id:"Score",style:{fontSize:this.state.width/50},children:["high score: ",this.state.highScore,"\u2002\u2002\u2002\u2002score:"," ",this.state.score]})]})}}]),s}(a.a.Component);function j(e){return u.isMobile?Object(g.jsxs)("div",{children:[Object(g.jsxs)("div",{className:"mobile-instructions",children:["if you were on your desktop browser, you'd see a snake game",Object(g.jsx)("br",{}),"here's a giant spinning mooncake instead"]}),Object(g.jsx)("div",{className:"game-instructions",children:"(click for one-page resume)"})]}):e.isGameOver?Object(g.jsxs)("div",{children:[Object(g.jsx)("div",{className:"instructions",children:"that's okay. click on giant spinning mooncake for a one-page resume"}),Object(g.jsx)("div",{className:"game-instructions",children:"(or hit the spacebar to restart)"})]}):Object(g.jsxs)("div",{children:[Object(g.jsx)("div",{className:"instructions",children:"eat (or just click on) the fish for a one-page resume"}),Object(g.jsxs)("div",{className:"game-instructions",children:["use arrow keys to navigate your Snake",Object(g.jsx)("br",{}),"snack on the red apple to grow (the game ends when you munch on yourself!)"]})]})}var f=function(){var e=Object(o.useState)(!1),t=Object(n.a)(e,2),s=t[0],a=t[1];return Object(g.jsx)("div",{className:"App",children:Object(g.jsxs)("header",{className:"App-header",children:[Object(g.jsx)(j,{isGameOver:s}),Object(g.jsxs)("div",{className:"link-container",children:[Object(g.jsx)("a",{className:"link",href:"https://github.com/linda-huang",target:"_blank",rel:"noopener noreferrer",children:"github"}),Object(g.jsx)("a",{className:"link",href:"https://scholar.google.com/citations?hl=en&user=Wms1BCMAAAAJ",target:"_blank",rel:"noopener noreferrer",children:"google scholar"}),Object(g.jsx)("a",{className:"link",href:"https://www.linkedin.com/in/linda-huang-sijia/",target:"_blank",rel:"noopener noreferrer",children:"linkedin"})]}),Object(g.jsx)(b,{setIsGameOver:function(e){return a(e)}})]})})};h.a.render(Object(g.jsx)(a.a.StrictMode,{children:Object(g.jsx)(f,{})}),document.getElementById("root"))}},[[20,1,2]]]);
//# sourceMappingURL=main.b21b3f90.chunk.js.map