(this.webpackJsonproulette=this.webpackJsonproulette||[]).push([[0],{14:function(e,t,n){},15:function(e,t,n){},17:function(e,t,n){"use strict";n.r(t);var i=n(2),r=n.n(i),o=n(8),c=n.n(o),s=(n(14),n(9)),a=n(4),l=n(3),d=n(1),u=(n(15),n(0)),f=[2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36],j=[1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35],p=[1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36],b=[2,4,6,8,10,11,13,15,17,20,22,24,26,28,29,31,33,35],h=[1,2,3,4,5,6,7,8,9,10,11,12],x=[13,14,15,16,17,18,19,20,21,22,23,24],g=[25,26,27,28,29,30,31,32,33,34,35,36],O=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18],v=[19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36],m=[1,4,7,10,13,16,19,22,25,28,31,34],y=[2,5,8,11,14,17,20,23,26,29,32,35],w=[3,6,9,12,15,18,21,24,27,30,33,36];function D(e){return function(e){return p.indexOf(Number(e))>=0}(e)?"rgb(255,80,80)":"gold"}function B(){var e=Math.floor(37*Math.random())-1;return e<0||e>36?(console.error("WOAH!! What are the odds??"),B()):e}var C=Object(d.a)(Object(d.a)({},{straight:35,split:17,street:11,square:8,six:5}),{Reds:1,Blacks:1,Evens:1,Odds:1,Lows:1,Highs:1,Dozens:2,Columns:2}),k="text";function S(e,t){return e.filter((function(e){return t.includes(e)})).length==e.length&&t.filter((function(t){return e.includes(t)})).length==t.length}function T(e){var t,n,i;return Object(u.jsxs)("div",{onDrop:e.onDrop?function(t){var n;t.preventDefault(),null===(n=e.onDrop)||void 0===n||n.call(e,Number(t.dataTransfer.getData(k)))}:void 0,onDragOver:e.onDrop?function(e){e.preventDefault()}:void 0,onClick:e.onClick,style:{cursor:e.onClick?"pointer":void 0,flex:e.flex,marginLeft:e.margin,color:e.color||D(e.name),textShadow:"1px 2px rgba(0,0,0,.7)",backgroundColor:"green",border:"1px solid gold",alignItems:"center",display:"flex",justifyContent:"center",minWidth:70,minHeight:70,outline:e.roll==e.name?"10px solid gold":void 0,outlineOffset:-10},children:[e.name,Object(u.jsx)("div",{style:{display:"flex",flexDirection:"column-reverse"},children:null===(t=e.placedBets)||void 0===t?void 0:t.filter((function(t){return"straight"==t.type&&t.winsOn.includes(Number(e.name))})).map((function(e){return Object(u.jsx)(N,{index:e.chipIndex,size:20})}))}),Object(u.jsx)("div",{style:{display:"flex",flexDirection:"column-reverse"},children:e.winsOn&&(null===(n=e.placedBets)||void 0===n?void 0:n.filter((function(t){return t.type==e.type&&S(t.winsOn,e.winsOn)})).map((function(e){return Object(u.jsx)(N,{index:e.chipIndex,size:20})})))}),Object(u.jsx)("div",{style:{display:"flex",flexDirection:"column-reverse"},children:e.winsOn&&(null===(i=e.winningBets)||void 0===i?void 0:i.filter((function(t){return t.type==e.type&&S(t.winsOn,e.winsOn)})).map((function(e){return Object(u.jsxs)("div",{style:{color:M[e.chipIndex],marginTop:-20},children:["+$",z[e.chipIndex]*(C[e.type]+1)]})})))})]})}function I(e){for(var t=[],n={placedBets:e.placedBets,winningBets:e.winningBets,roll:e.roll},i=function(){var i=e.start+r;t.push(Object(u.jsx)(T,Object(d.a)(Object(d.a)({},n),{},{name:i,onDrop:e.onBet?function(t){var n;null===(n=e.onBet)||void 0===n||n.call(e,[i],t)}:void 0})))},r=0;r<e.length;r++)i();return Object(u.jsx)("div",{style:{display:"flex",flexDirection:"column"},children:t})}function E(e){for(var t={placedBets:e.placedBets,winningBets:e.winningBets,roll:e.roll},n=[Object(u.jsx)(T,Object(d.a)({name:"0"},t))],i=0;i<12;i++)i%4==0&&n.push(Object(u.jsx)("div",{style:{width:4,backgroundColor:"green"}})),n.push(Object(u.jsx)(I,Object(d.a)(Object(d.a)({},t),{},{start:3*i+1,length:3,onBet:e.onBet})));return n.push(Object(u.jsx)("div",{style:{width:4,backgroundColor:"green"}})),Object(u.jsxs)("div",{style:{display:"inline-flex",flexDirection:"row",justifyContent:"center"},children:[n,Object(u.jsxs)("div",{style:{display:"flex",flexDirection:"column"},children:[Object(u.jsx)(T,Object(d.a)(Object(d.a)({},t),{},{name:"2to1",type:"Columns",winsOn:m,onDrop:e.onBet?function(t){e.onBet(m,t)}:void 0})),Object(u.jsx)(T,Object(d.a)(Object(d.a)({},t),{},{name:"2to1",type:"Columns",winsOn:y,onDrop:e.onBet?function(t){e.onBet(y,t)}:void 0})),Object(u.jsx)(T,Object(d.a)(Object(d.a)({},t),{},{name:"2to1",type:"Columns",winsOn:w,onDrop:e.onBet?function(t){e.onBet(w,t)}:void 0}))]})]})}var z=[1,5,25,50,100,500,1e3],M=["white","red","blue","orange","grey","teal","lightgreen"],L=["black","white","white","black","white","white","black"];function N(e){var t=e.size||50;return Object(u.jsx)("div",{draggable:e.draggable,onDragStart:e.draggable?function(t){t.dataTransfer.setData(k,e.index.toString())}:void 0,style:{display:"flex",alignItems:"center",justifyContent:"center",color:L[e.index],height:t,width:t,cursor:e.draggable?"grab":void 0,borderRadius:t,backgroundColor:M[e.index],marginBottom:-.85*t,border:"2px solid black",boxShadow:"0px 3px 0px black"},children:t>30?z[e.index]:void 0})}function R(e){return e||0}function $(e,t){return R(e)==R(t)}function W(e,t){return R(e)-R(t)}function F(e){var t=r.a.useState([0,0,0,0,0,0,0,0,0,0,0]),n=Object(l.a)(t,2),i=n[0],o=n[1];console.log(e.chips,i);var c=function(e,t){for(var n=Math.max(e.length,t.length),i=0,r=0;r<n;r++)$(e[r],t[r])||(i+=Math.abs(W(e[r],t[r])));return i}(i,e.chips);r.a.useEffect((function(){if(c){var t=function(){console.log("Updating chips ".concat(c));var t=Object(a.a)(i),n=1;c>10&&(n=5),c>25&&(n=10),c>50&&(n=25);for(var r=10;r>=0;r--){if(R(i[r])>R(e.chips[r]))return t[r]=R(t[r]),t[r]-=Math.min(n,R(t[r])-R(e.chips[r])),setTimeout((function(){o(t)}),100),{v:void 0};if((i[r]||0)<(e.chips[r]||0))return t[r]=t[r]||0,t[r]+=Math.min(n,R(e.chips[r])-R(t[r])),setTimeout((function(){o(t)}),100),{v:void 0}}}();if("object"===typeof t)return t.v}else console.log("DONE?")}),[i,e.chips,c]);var s=0;return i.forEach((function(e,t){e>0&&(s=t)})),console.log(s),Object(u.jsx)("div",{style:{display:"flex",backgroundColor:"green",justifyContent:"center",height:200,marginTop:10},children:i.filter((function(e,t){return t<=s+1})).map((function(t,n){for(var i=[],r=[],o=0;o<t;o++)o%10==0&&r.length>0&&(i.push(Object(u.jsx)("div",{style:{display:"flex",flexDirection:"column-reverse",margin:2},children:r})),r=[]),r.push(Object(u.jsx)(N,{index:n,draggable:!c&&(o==t-1||o%10==9)}));return r.length>0&&i.push(Object(u.jsx)("div",{style:{display:"flex",flexDirection:"column-reverse",margin:2},children:r})),Object(u.jsx)(u.Fragment,{children:Object(u.jsxs)("div",{style:{display:"flex",minWidth:80,justifyContent:"center",padding:10,paddingBottom:50,margin:2,borderLeft:"1px solid gold",borderRight:"1px solid gold",position:"relative"},children:[Object(u.jsxs)("div",{onDrop:function(t){t.preventDefault();var i=Number(t.dataTransfer.getData(k));if(i!=n)if(console.log("Trading chip ".concat(i," ($").concat(z[i],") for ").concat(n," ($").concat(z[n],")")),i<n){if(e.chips[i]*z[i]>=z[n]){var r,o=Object(a.a)(e.chips);o[n]=R(o[n]),o[i]=R(o[i]),o[i]-=Math.floor(z[n]/z[i]),o[n]++,null===(r=e.setChips)||void 0===r||r.call(e,o)}}else if(e.chips[i]>0){var c,s=Object(a.a)(e.chips);s[n]=R(s[n]),s[i]=R(s[i]),s[i]--,s[n]+=Math.floor(z[i]/z[n]),null===(c=e.setChips)||void 0===c||c.call(e,s)}},onDragOver:function(t){var i=Number(t.dataTransfer.getData(k));i!=n&&(console.log("Trading chip ".concat(i," ($").concat(z[i],") for ").concat(n," ($").concat(z[n],")")),i<n?e.chips[i]*z[i]>=z[n]&&(t.preventDefault(),t.dataTransfer.dropEffect="copy"):e.chips[i]>0&&(t.preventDefault(),t.dataTransfer.dropEffect="copy"))},style:{position:"absolute",top:0,textAlign:"center",left:0,right:0},children:["$",z[n]]}),i]})})}))})}function H(e){switch(e.length){case 1:return"straight";case 2:return"split";case 3:return"street";case 4:return"square";case 12:return"Columns";default:throw"HEY! bad type!"}}var A=[10,5,1];var q=function(){var e=r.a.useState(!1),t=Object(l.a)(e,2),n=t[0],i=t[1],o=r.a.useState(!1),c=Object(l.a)(o,2),m=c[0],y=c[1],w=r.a.useState(0),k=Object(l.a)(w,2),S=k[0],I=k[1],M=r.a.useState([]),L=Object(l.a)(M,2),N=L[0],R=L[1],$=r.a.useState([].concat(A)),W=Object(l.a)($,2),q=W[0],J=W[1],P=r.a.useState([]),G=Object(l.a)(P,2),U=G[0],V=G[1],Y=q.reduce((function(e,t,n){return e+t*z[n]}),0),K=r.a.useCallback((function(e){y(!0),R([].concat(Object(a.a)(N),[e]))}),[N,R]),Q=function(e){var t=Object(a.a)(q);t[e]=Math.max(0,t[e]-1),J(t)};function X(e,t){return{winsOn:e,type:t,onDrop:function(n){K({chipIndex:n,winsOn:e,type:t}),Q(n)},placedBets:N,winningBets:U,roll:S}}return Object(u.jsxs)("div",{className:"App",children:[Object(u.jsxs)("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",margin:"10px 50px"},children:[Object(u.jsx)("h1",{style:{marginRight:"auto",position:"absolute",left:50},children:"Roulette"}),Object(u.jsx)("button",{title:"Spin the wheel",style:{borderRadius:100,display:"flex",alignItems:"center",justifyContent:"center",textAlign:"center",height:90,width:90,color:D(S)},onClick:function(){i(!0);var e=B();I(e);var t=N.filter((function(t){return t.winsOn.includes(e)}));V(t),R([]);var n,r=Object(a.a)(q),o=Object(s.a)(t);try{for(o.s();!(n=o.n()).done;){var c=n.value;r[c.chipIndex]+=C[c.type]+1}}catch(l){o.e(l)}finally{o.f()}J(r)},children:S}),n?void 0:Object(u.jsxs)("div",{style:{color:"white",fontWeight:300,fontSize:18,marginLeft:0,position:"absolute",left:"calc(50% + 60px)"},children:[" "," <-- Click to spin the wheel"," "]}),Object(u.jsxs)("div",{style:{backgroundColor:"green",fontSize:24,padding:10,color:"gold",marginLeft:"auto",right:50,position:"absolute"},children:["$",Object(u.jsx)("span",{style:{textShadow:"1px 2px rgba(0,0,0,.5)"},children:Y})]})]}),Object(u.jsxs)("div",{style:{display:"inline-flex",flexDirection:"column"},children:[Object(u.jsx)(E,{placedBets:N,roll:S,winningBets:U,onBet:function(e,t){Q(t),K({chipIndex:t,type:H(e),winsOn:e})}}),Object(u.jsxs)("div",{style:{display:"flex",justifyContent:"end",marginTop:4},children:[Object(u.jsx)("div",{style:{flex:1}}),Object(u.jsx)(T,Object(d.a)({name:"1st 12",flex:"4",margin:4},X(h,"Dozens"))),Object(u.jsx)(T,Object(d.a)({name:"2nd 12",flex:"4",margin:4},X(x,"Dozens"))),Object(u.jsx)(T,Object(d.a)({name:"3rd 12",flex:"4",margin:4},X(g,"Dozens"))),Object(u.jsx)("div",{style:{width:4}}),Object(u.jsx)("div",{style:{flex:1}})]}),Object(u.jsxs)("div",{style:{display:"flex",justifyContent:"end",marginTop:4},children:[Object(u.jsx)("div",{style:{flex:1}}),Object(u.jsx)(T,Object(d.a)({name:"1-18",flex:2,margin:4},X(O,"Lows"))),Object(u.jsx)(T,Object(d.a)({name:"EVEN",flex:2,margin:4},X(f,"Evens"))),Object(u.jsx)(T,Object(d.a)({name:"RED",color:"red",flex:2,margin:4},X(p,"Reds"))),Object(u.jsx)(T,Object(d.a)({name:"GOLD",flex:2,margin:4},X(b,"Blacks"))),Object(u.jsx)(T,Object(d.a)({name:"ODD",flex:2,margin:4},X(j,"Odds"))),Object(u.jsx)(T,Object(d.a)({name:"19-36",flex:2,margin:4},X(v,"Highs"))),Object(u.jsx)("div",{style:{width:4}}),Object(u.jsx)("div",{style:{flex:1}})]})]}),Object(u.jsx)(F,{chips:q,setChips:J}),m?void 0:Object(u.jsxs)("div",{style:{color:"white",fontWeight:300,fontSize:18},children:[" ","Drag your chips to a square to place bets. Or drag between columns to exchange for different chips."," "]})]})},J=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,18)).then((function(t){var n=t.getCLS,i=t.getFID,r=t.getFCP,o=t.getLCP,c=t.getTTFB;n(e),i(e),r(e),o(e),c(e)}))};c.a.render(Object(u.jsx)(r.a.StrictMode,{children:Object(u.jsx)(q,{})}),document.getElementById("root")),J()}},[[17,1,2]]]);
//# sourceMappingURL=main.210f8a71.chunk.js.map