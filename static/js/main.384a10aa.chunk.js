(this.webpackJsonproulette=this.webpackJsonproulette||[]).push([[0],{14:function(e,t,n){},15:function(e,t,n){},17:function(e,t,n){"use strict";n.r(t);var i=n(1),r=n.n(i),c=n(8),o=n.n(c),s=(n(14),n(9)),a=n(3),l=n(5),d=n(2),u=(n(15),n(0)),f=[2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36],j=[1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35],p=[1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36],x=[2,4,6,8,10,11,13,15,17,20,22,24,26,28,29,31,33,35],b=[1,2,3,4,5,6,7,8,9,10,11,12],h=[13,14,15,16,17,18,19,20,21,22,23,24],g=[25,26,27,28,29,30,31,32,33,34,35,36],O=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18],v=[19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36],m=[1,4,7,10,13,16,19,22,25,28,31,34],y=[2,5,8,11,14,17,20,23,26,29,32,35],D=[3,6,9,12,15,18,21,24,27,30,33,36];function w(e){return function(e){return p.indexOf(Number(e))>=0}(e)?"rgb(255,80,80)":"gold"}function C(){var e=Math.floor(37*Math.random())-1;return e<0||e>36?(console.error("WOAH!! What are the odds??"),C()):e}var B=Object(d.a)(Object(d.a)({},{straight:35,split:17,street:11,square:8,six:5}),{Reds:1,Blacks:1,Evens:1,Odds:1,Lows:1,Highs:1,Dozens:2,Columns:2}),k="text";function S(e){var t,n;return Object(u.jsxs)("div",{onDrop:e.onDrop?function(t){var n;t.preventDefault(),null===(n=e.onDrop)||void 0===n||n.call(e,Number(t.dataTransfer.getData(k)))}:void 0,onDragOver:e.onDrop?function(e){e.preventDefault()}:void 0,onClick:e.onClick,style:{cursor:e.onClick?"pointer":void 0,flex:e.flex,marginLeft:e.margin,color:e.color||w(e.name),textShadow:"1px 2px rgba(0,0,0,.7)",backgroundColor:"green",border:"1px solid gold",alignItems:"center",display:"flex",justifyContent:"center",minWidth:70,minHeight:70},children:[e.name,Object(u.jsx)("div",{style:{display:"flex",flexDirection:"column-reverse"},children:null===(t=e.placedBets)||void 0===t?void 0:t.filter((function(t){return"straight"==t.type&&t.winsOn.includes(Number(e.name))})).map((function(e){return Object(u.jsx)(R,{index:e.chipIndex,size:20})}))}),Object(u.jsx)("div",{style:{display:"flex",flexDirection:"column-reverse"},children:e.winsOn&&(null===(n=e.placedBets)||void 0===n?void 0:n.filter((function(t){return t.type==e.type&&function(e,t){return e.filter((function(e){return t.includes(e)})).length==e.length&&t.filter((function(t){return e.includes(t)})).length==t.length}(t.winsOn,e.winsOn)})).map((function(e){return Object(u.jsx)(R,{index:e.chipIndex,size:20})})))})]})}function T(e){for(var t=[],n=function(){var n=e.start+i;t.push(Object(u.jsx)(S,{placedBets:e.placedBets,name:n,onDrop:e.onBet?function(t){var i;null===(i=e.onBet)||void 0===i||i.call(e,[n],t)}:void 0}))},i=0;i<e.length;i++)n();return Object(u.jsx)("div",{style:{display:"flex",flexDirection:"column"},children:t})}function I(e){for(var t=[Object(u.jsx)(S,{name:"0"})],n=0;n<12;n++)n%4==0&&t.push(Object(u.jsx)("div",{style:{width:4,backgroundColor:"green"}})),t.push(Object(u.jsx)(T,{placedBets:e.placedBets,start:3*n+1,length:3,onBet:e.onBet}));return t.push(Object(u.jsx)("div",{style:{width:4,backgroundColor:"green"}})),Object(u.jsxs)("div",{style:{display:"inline-flex",flexDirection:"row",justifyContent:"center"},children:[t,Object(u.jsxs)("div",{style:{display:"flex",flexDirection:"column"},children:[Object(u.jsx)(S,{placedBets:e.placedBets,name:"2to1",type:"Columns",winsOn:m,onDrop:e.onBet?function(t){e.onBet(m,t)}:void 0}),Object(u.jsx)(S,{placedBets:e.placedBets,name:"2to1",type:"Columns",winsOn:y,onDrop:e.onBet?function(t){e.onBet(y,t)}:void 0}),Object(u.jsx)(S,{placedBets:e.placedBets,name:"2to1",type:"Columns",winsOn:D,onDrop:e.onBet?function(t){e.onBet(D,t)}:void 0})]})]})}var z=[1,5,25,50,100,500,1e3],E=["white","red","blue","orange","grey"],L=["black","white","white","black","white"];function R(e){var t=e.size||50;return Object(u.jsx)("div",{draggable:e.draggable,onDragStart:e.draggable?function(t){t.dataTransfer.setData(k,e.index.toString())}:void 0,style:{display:"flex",alignItems:"center",justifyContent:"center",color:L[e.index],height:t,width:t,cursor:e.draggable?"grab":void 0,borderRadius:t,backgroundColor:E[e.index],marginBottom:-.85*t,border:"2px solid black",boxShadow:"0px 3px 0px black"},children:t>30?z[e.index]:void 0})}function N(e){return Object(u.jsx)("div",{style:{display:"flex",backgroundColor:"green",justifyContent:"center",height:200,marginTop:10},children:e.chips.map((function(t,n){for(var i=[],r=[],c=0;c<t;c++)c%10==0&&r.length>0&&(i.push(Object(u.jsx)("div",{style:{display:"flex",flexDirection:"column-reverse",margin:2},children:r})),r=[]),r.push(Object(u.jsx)(R,{index:n,draggable:c==t-1||c%10==9}));return r.length>0&&i.push(Object(u.jsx)("div",{style:{display:"flex",flexDirection:"column-reverse",margin:2},children:r})),Object(u.jsx)(u.Fragment,{children:Object(u.jsxs)("div",{style:{display:"flex",minWidth:80,justifyContent:"center",padding:10,paddingBottom:50,margin:2,borderLeft:"1px solid gold",borderRight:"1px solid gold",position:"relative"},children:[Object(u.jsxs)("div",{onDrop:function(t){t.preventDefault();var i=Number(t.dataTransfer.getData(k));if(i!=n)if(console.log("Trading chip ".concat(i," ($").concat(z[i],") for ").concat(n," ($").concat(z[n],")")),i<n){if(e.chips[i]*z[i]>=z[n]){var r,c=Object(l.a)(e.chips);c[i]-=Math.floor(z[n]/z[i]),c[n]++,null===(r=e.setChips)||void 0===r||r.call(e,c)}}else if(e.chips[i]>0){var o,s=Object(l.a)(e.chips);s[i]--,s[n]+=Math.floor(z[i]/z[n]),null===(o=e.setChips)||void 0===o||o.call(e,s)}},onDragOver:function(t){var i=Number(t.dataTransfer.getData(k));i!=n&&(console.log("Trading chip ".concat(i," ($").concat(z[i],") for ").concat(n," ($").concat(z[n],")")),i<n?e.chips[i]*z[i]>=z[n]&&(t.preventDefault(),t.dataTransfer.dropEffect="copy"):e.chips[i]>0&&(t.preventDefault(),t.dataTransfer.dropEffect="copy"))},style:{position:"absolute",top:0,textAlign:"center",left:0,right:0},children:["$",z[n]]}),i]})})}))})}function M(e){switch(e.length){case 1:return"straight";case 2:return"split";case 3:return"street";case 4:return"square";case 12:return"Columns";default:throw"HEY! bad type!"}}var W=[10,5,1,0,0];var $=function(){var e=r.a.useState(!1),t=Object(a.a)(e,2),n=t[0],i=t[1],c=r.a.useState(!1),o=Object(a.a)(c,2),m=o[0],y=o[1],D=r.a.useState(0),k=Object(a.a)(D,2),T=k[0],E=k[1],L=r.a.useState([]),R=Object(a.a)(L,2),$=R[0],F=R[1],H=r.a.useState([].concat(W)),A=Object(a.a)(H,2),q=A[0],J=A[1],P=r.a.useState(!1),G=Object(a.a)(P,2),V=(G[0],G[1],q.reduce((function(e,t,n){return e+t*z[n]}))),Y=r.a.useCallback((function(e){y(!0),F([].concat(Object(l.a)($),[e]))}),[$,F]),K=function(e){var t=Object(l.a)(q);t[e]=Math.max(0,t[e]-1),J(t)};function Q(e,t){return{winsOn:e,type:t,onDrop:function(n){Y({chipIndex:n,winsOn:e,type:t}),K(n)},placedBets:$}}return Object(u.jsxs)("div",{className:"App",children:[Object(u.jsxs)("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",margin:"10px 50px"},children:[Object(u.jsx)("h1",{style:{marginRight:"auto",position:"absolute",left:50},children:"Roulette"}),Object(u.jsx)("button",{title:"Spin the wheel",style:{borderRadius:100,display:"flex",alignItems:"center",justifyContent:"center",textAlign:"center",height:90,width:90,color:w(T)},onClick:function(){i(!0);var e=C();E(e);var t=$.filter((function(t){return t.winsOn.includes(e)}));F([]);var n,r=Object(l.a)(q),c=Object(s.a)(t);try{for(c.s();!(n=c.n()).done;){var o=n.value;r[o.chipIndex]+=B[o.type]+1}}catch(a){c.e(a)}finally{c.f()}J(r)},children:T}),n?void 0:Object(u.jsxs)("div",{style:{color:"white",fontWeight:300,fontSize:18,marginLeft:0,position:"absolute",right:300},children:[" "," <-- Click to spin the wheel"," "]}),Object(u.jsxs)("div",{style:{backgroundColor:"green",fontSize:24,padding:10,color:"gold",marginLeft:"auto",right:50,position:"absolute"},children:["$",Object(u.jsx)("span",{style:{textShadow:"1px 2px rgba(0,0,0,.5)"},children:V})]})]}),Object(u.jsxs)("div",{style:{display:"inline-flex",flexDirection:"column"},children:[Object(u.jsx)(I,{placedBets:$,onBet:function(e,t){K(t),Y({chipIndex:t,type:M(e),winsOn:e})}}),Object(u.jsxs)("div",{style:{display:"flex",justifyContent:"end",marginTop:4},children:[Object(u.jsx)("div",{style:{flex:1}}),Object(u.jsx)(S,Object(d.a)({name:"1st 12",flex:"4",margin:4},Q(b,"Dozens"))),Object(u.jsx)(S,Object(d.a)({name:"2nd 12",flex:"4",margin:4},Q(h,"Dozens"))),Object(u.jsx)(S,Object(d.a)({name:"3rd 12",flex:"4",margin:4},Q(g,"Dozens"))),Object(u.jsx)("div",{style:{width:4}}),Object(u.jsx)("div",{style:{flex:1}})]}),Object(u.jsxs)("div",{style:{display:"flex",justifyContent:"end",marginTop:4},children:[Object(u.jsx)("div",{style:{flex:1}}),Object(u.jsx)(S,Object(d.a)({name:"1-18",flex:2,margin:4},Q(O,"Lows"))),Object(u.jsx)(S,Object(d.a)({name:"EVEN",flex:2,margin:4},Q(f,"Evens"))),Object(u.jsx)(S,Object(d.a)({name:"RED",color:"red",flex:2,margin:4},Q(p,"Reds"))),Object(u.jsx)(S,Object(d.a)({name:"GOLD",flex:2,margin:4},Q(x,"Blacks"))),Object(u.jsx)(S,Object(d.a)({name:"ODD",flex:2,margin:4},Q(j,"Odds"))),Object(u.jsx)(S,Object(d.a)({name:"19-36",flex:2,margin:4},Q(v,"Highs"))),Object(u.jsx)("div",{style:{width:4}}),Object(u.jsx)("div",{style:{flex:1}})]})]}),Object(u.jsx)(N,{chips:q,setChips:J}),m?void 0:Object(u.jsxs)("div",{style:{color:"white",fontWeight:300,fontSize:18},children:[" ","Drag your chips to a square to place bets. Or drag between columns to exchange for different chips."," "]})]})},F=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,18)).then((function(t){var n=t.getCLS,i=t.getFID,r=t.getFCP,c=t.getLCP,o=t.getTTFB;n(e),i(e),r(e),c(e),o(e)}))};o.a.render(Object(u.jsx)(r.a.StrictMode,{children:Object(u.jsx)($,{})}),document.getElementById("root")),F()}},[[17,1,2]]]);
//# sourceMappingURL=main.384a10aa.chunk.js.map