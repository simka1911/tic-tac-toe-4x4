(this["webpackJsonptic-tac-toe-4x4"]=this["webpackJsonptic-tac-toe-4x4"]||[]).push([[0],[,,,,,,,,,,,,,,function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){"use strict";a.r(t);var n=a(1),c=a(0),i=a.n(c),d=a(6),l=a.n(d),y=(a(14),a(8)),s=a(2),r=a(7),u=a.n(r);a(15);function o(e){var t=Object(c.useContext)(j);return Object(n.jsx)("div",{className:"field",children:Object(n.jsx)("div",{className:"field__button-wrapper",children:Object(n.jsx)("button",{className:u()("field__button",e.isPlayed&&"field__button--disabled",1===e.playedBy&&"field__button--player-2",0===e.playedBy&&"field__button--player-1"),onMouseDown:function(e){return e.preventDefault()},onClick:function(a){t.updatefields(e.index,{isPlayed:!0,playedBy:t.currentPlayer}),t.updatePlayersBoard(e.position)}})})})}a(16);function p(){var e=Object(c.useContext)(j).fields.map((function(e,t){return Object(n.jsx)(o,{position:Math.pow(2,t),index:t,isPlayed:e.isPlayed,playedBy:e.playedBy},t)}));return Object(n.jsx)("div",{className:"board",children:e})}var f=[15,240,3840,61440,4369,8738,17476,34952,33825,4680,51,102,204,816,1632,3264,13056,26112,52224],b=function(e,t){(function(e){return f.filter((function(t){return(t&e)===e}))})(t).forEach((function(t){(e&t)===t&&console.log("Yaay, victory")}))},j=(a(17),i.a.createContext({})),P=[{isPlayed:!1,playedBy:-1},{isPlayed:!1,playedBy:-1},{isPlayed:!1,playedBy:-1},{isPlayed:!1,playedBy:-1},{isPlayed:!1,playedBy:-1},{isPlayed:!1,playedBy:-1},{isPlayed:!1,playedBy:-1},{isPlayed:!1,playedBy:-1},{isPlayed:!1,playedBy:-1},{isPlayed:!1,playedBy:-1},{isPlayed:!1,playedBy:-1},{isPlayed:!1,playedBy:-1},{isPlayed:!1,playedBy:-1},{isPlayed:!1,playedBy:-1},{isPlayed:!1,playedBy:-1},{isPlayed:!1,playedBy:-1}];var O=function(){var e=Object(c.useRef)(!0),t=Object(c.useState)(P),a=Object(s.a)(t,2),i=a[0],d=a[1],l=Object(c.useState)(Math.round(Math.random())),r=Object(s.a)(l,2),u=r[0],o=r[1],f=Object(c.useState)(0),O=Object(s.a)(f,2),B=O[0],x=O[1],v=Object(c.useState)(0),h=Object(s.a)(v,2),_=h[0],m=h[1],g=Object(c.useState)(0),C=Object(s.a)(g,2),S=C[0],w=C[1];return Object(c.useEffect)((function(){e.current?e.current=!1:(b(u?_:B,S),o((u+1)%2))}),[B,_]),Object(c.useEffect)((function(){}),[u]),Object(n.jsx)("div",{className:"app",children:Object(n.jsxs)(j.Provider,{value:{currentPlayer:u,updatePlayersBoard:function(e){w(e),u?m(_|e):x(B|e)},fields:i,updatefields:function(e,t){var a=Object(y.a)(i);a[e]=t,d(a)}},children:["player ".concat(u+1," turn"),Object(n.jsx)(p,{})]})})},B=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,19)).then((function(t){var a=t.getCLS,n=t.getFID,c=t.getFCP,i=t.getLCP,d=t.getTTFB;a(e),n(e),c(e),i(e),d(e)}))};l.a.render(Object(n.jsx)(i.a.StrictMode,{children:Object(n.jsx)(O,{})}),document.getElementById("root")),B()}],[[18,1,2]]]);
//# sourceMappingURL=main.71b03c6f.chunk.js.map