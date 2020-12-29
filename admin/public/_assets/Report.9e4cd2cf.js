let t=document.createElement("style");t.innerHTML=".report[data-v-f251111e]{width:100%;height:100%}.report h2[data-v-f251111e]{margin-right:10px;vertical-align:middle;display:inline-block;font-size:18px;color:#1a2a3a}.datatime[data-v-f251111e]{width:100%;height:50px;line-height:50px;padding-left:10px;border-bottom:1px solid #ccc;background-color:#fff;box-sizing:border-box;text-align:left}.classify[data-v-f251111e]{width:100%;height:150px;padding:2px 10px 10px;box-sizing:border-box;background-color:#fff}.classify .cls-title[data-v-f251111e]{width:100%;height:40px;padding-top:2px;border-bottom:1px solid #ccc;box-sizing:border-box}.classify .cls-title h2[data-v-f251111e]{float:left;line-height:30px}.classify .cls-title .btns-sel button[data-v-f251111e]{float:left;width:57px;height:30px;margin-right:10px;border-radius:20px;box-shadow:1px 2px 3px #34495e;transition:.2s;font-size:16px}.classify .btns-tag[data-v-f251111e]{width:100%;height:100px;overflow:auto;margin-top:2px;text-align:left}.classify .btns-tag button[data-v-f251111e]{width:62px;padding:2px;margin-right:3.5px;margin-bottom:2px;border-radius:5px;display:inline-block;box-sizing:border-box;border:1px solid #aaa;transition:.5s;background-color:#3498db;font-size:16px;color:#fff}.datatime span[data-v-f251111e]{font-size:21px;vertical-align:middle;color:#777}.dataList[data-v-f251111e]{width:1300px;height:250px;text-align:left;overflow-x:auto;overflow-y:auto;border-top:1px solid #ccc}.dataList div[data-v-f251111e]{position:relative;text-align:center;border-right:1px solid #ccc;box-sizing:border-box;overflow:hidden}.dataList div span[data-v-f251111e]{top:0;left:10px;position:absolute;text-align:left}.dataList div[data-v-f251111e]:nth-child(1){width:50px}.dataList div[data-v-f251111e]:nth-child(2){width:230px}.dataList div[data-v-f251111e]:nth-child(3),.dataList div[data-v-f251111e]:nth-child(4),.dataList div[data-v-f251111e]:nth-child(5),.dataList div[data-v-f251111e]:nth-child(6),.dataList div[data-v-f251111e]:nth-child(7){width:100px}.dataList div[data-v-f251111e]:nth-child(8){width:200px}.dataList li[data-v-f251111e]{width:150%;height:50px;display:flex;font-size:18px;line-height:50px;padding-left:5px;border-bottom:1px solid #ccc;transition:.5s;box-sizing:border-box;background-color:#fff;overflow:height;color:#4a5a6a}.content[data-v-f251111e]{top:70%;left:50%;width:300px;transform:translate(-50%,-50%);position:absolute;text-align:center;opacity:.5}.content h2[data-v-f251111e]{font-size:50px!important}.content .time[data-v-f251111e]{margin-top:20px;margin-left:5px;font-size:25px!important;display:block!important;opacity:.5}",document.head.appendChild(t);import{r as a,j as e,C as o,A as l,n as i,l as s,t as d,a as n,m as r,b as p,p as c,c as f,q as v,e as b,f as h,g as x,s as u,F as g,y as m,w as y,x as C,i as T,z as k}from"./index.822a1184.js";import{s as w,a as L}from"./FootTagbar.9de875d4.js";Array.prototype.contains=function(t){for(var a=0;a<t.length;a++)if(-1===this.indexOf(t[a]))return!1;return!0};var E={name:"Home",components:{Toolbar:w,FootTagbar:L},setup(){const t=n(),c=a({product:{data:[],opts:[]},labels:{specs:[],color:[],other:[],crrType:"specs",opts:[]}}),f=p(),v=e((()=>{var a=String(t.state.createLog.datatime[1]);return a.slice(0,4)+"年"+a.slice(4,6)+"月"}));return o(f,t,c),l.get.label().then((a=>{i(f,t,a)&&!a.err_code&&a.result&&a.result.forEach((t=>c.labels[t.TYPE].push(t)))})).catch((t=>console.log(t))),s((()=>t.state.createLog.datatime[1]),(()=>{o(f,t,c)})),{...d(c),...t.state,datatime:v,dateTimeFormat:function(t){return r(new Date(t))},onButtonTagClick:function(t){-1===c.labels.opts.indexOf(t.ID)?c.labels.opts.push(t.ID):c.labels.opts=c.labels.opts.filter((a=>a!=t.ID)),c.product.opts=[],c.product.data.forEach((t=>{t.CLASSIFY.contains(c.labels.opts)&&c.product.opts.push(t)}))},onButtonTagResetClick:function(t){c.labels.opts=[],c.product.opts=c.product.data,t.toElement.style.color="red",setTimeout((()=>t.toElement.style.color="#4a5a6a"),100)}}}};const F=T("data-v-f251111e");c("data-v-f251111e");const z={class:"report"},A={class:"reportDays",style:{height:"100%"}},D={class:"datatime"},I=x("h2",null,"时间：",-1),S={class:"classify"},B={class:"cls-title"},N=x("h2",null,"分类：",-1),R={class:"btns-sel"},_={class:"btns-tag"},O={class:"dataList"},H=k('<li data-v-f251111e><div data-v-f251111e><span style="left:2px;" data-v-f251111e>序号</span></div><div data-v-f251111e><span data-v-f251111e>品名</span></div><div data-v-f251111e><span data-v-f251111e>上期结存</span></div><div data-v-f251111e><span data-v-f251111e>仓库付出</span></div><div data-v-f251111e><span data-v-f251111e>检验付出</span></div><div data-v-f251111e><span data-v-f251111e>主机付出</span></div><div data-v-f251111e><span data-v-f251111e>本期结存</span></div><div data-v-f251111e><span data-v-f251111e>更新时间</span></div></li>',1),M={style:{left:"5px"}},j={class:"content"},P=x("h2",null,"无数据",-1),U={class:"time"};f();const Y=F(((t,a,e,o,l,i)=>{const s=v("Toolbar"),d=v("foot-tagbar");return b(),h("div",z,[x(s),x("div",A,[x("div",D,[I,x("span",null,u(o.datatime),1)]),x("div",S,[x("div",B,[N,x("div",R,[x("button",{onClick:a[1]||(a[1]=a=>t.labels.crrType="specs"),style:{color:"specs"===t.labels.crrType?"#FFF":"#1a2a3a",backgroundColor:"specs"===t.labels.crrType?"#2C97D8":""}},"规格",4),x("button",{onClick:a[2]||(a[2]=a=>t.labels.crrType="color"),style:{color:"color"===t.labels.crrType?"#FFF":"#1a2a3a",backgroundColor:"color"===t.labels.crrType?"#2C97D8":""}},"颜色",4),x("button",{onClick:a[3]||(a[3]=a=>t.labels.crrType="other"),style:{color:"other"===t.labels.crrType?"#FFF":"#1a2a3a",backgroundColor:"other"===t.labels.crrType?"#2C97D8":""}},"其它",4),x("button",{onClick:a[4]||(a[4]=(...t)=>o.onButtonTagResetClick&&o.onButtonTagResetClick(...t)),style:{color:"#4a5a6a"}},"重置")])]),x("div",_,[(b(!0),h(g,null,m(t.labels[t.labels.crrType],(a=>(b(),h("button",{onClick:t=>o.onButtonTagClick(a),style:{backgroundColor:-1!=t.labels.opts.indexOf(a.ID)?"#EC4C40":""}},u(a.NAME),13,["onClick"])))),256))])]),x("div",O,[x("ul",null,[H,(b(!0),h(g,null,m(t.product.opts,((t,a)=>(b(),h("li",{style:{backgroundColor:a%2?"#ecf0f1":""},key:t.ID},[x("div",null,[x("span",M,u(String(a+1).padStart(3,0)),1)]),x("div",null,[x("span",null,u(t.NAME),1)]),x("div",null,[x("span",null,u(t.PREV_BALANCE),1)]),x("div",null,[x("span",null,u(t.WAREHOUSE),1)]),x("div",null,[x("span",null,u(t.INSPECTION),1)]),x("div",null,[x("span",null,u(t.HOST_MACHINE),1)]),x("div",null,[x("span",null,u(t.CURR_BALANCE),1)]),x("div",null,[x("span",null,u(o.dateTimeFormat(t.C_DATETIME)),1)])],4)))),128))])]),y(x("div",j,[P,x("h2",U,u(o.datatime),1)],512),[[C,!t.product.data.length]])]),x(d)])}));E.render=Y,E.__scopeId="data-v-f251111e";export default E;