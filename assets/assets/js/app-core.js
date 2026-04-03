
// PATCHED VERSION - Heatmap + Achievement fix

function localDateStr(d){d=d||new Date(); return [d.getFullYear(),String(d.getMonth()+1).padStart(2,'0'),String(d.getDate()).padStart(2,'0')].join('-');}

function getJSON(key,fallback){
 try{return JSON.parse(localStorage.getItem(key)||JSON.stringify(fallback));}
 catch(e){return fallback;}
}

function setJSON(key,val){
 localStorage.setItem(key,JSON.stringify(val));
}

function getSD(){
 const s=getJSON('streakData',{});
 s.days=s.days||{};
 s.sessions=s.sessions||[];
 s.totalMins=Number(s.totalMins||0);
 return s;
}

function setSD(s){
 setJSON('streakData',s);
}

window.logStudyMinutes=function(mins,topic){
 mins=Number(mins||10);
 const s=getSD();
 const today=localDateStr();

 // prevent duplicate same-day manual logs
 const last = localStorage.getItem("lastHeatmapLog");
 if(topic === "Manual heatmap check-in" && last === today){
   return;
 }

 if(topic === "Manual heatmap check-in"){
   localStorage.setItem("lastHeatmapLog", today);
 }

 s.days[today]=(s.days[today]||0)+mins;
 s.totalMins+=mins;
 s.sessions.push({date:today,mins:mins,topic:topic||'',ts:Date.now()});

 setSD(s);
 if(window.refreshHomeWidgets) window.refreshHomeWidgets();
};

window.refreshHomeWidgets=function(){
 const s=getSD();

 const achievements = [
   ['First Session',(s.totalMins||0)>=10],
   ['Hour Builder',(s.totalMins||0)>=60 && (s.sessions||[]).length >= 3]
 ];

 const el=document.getElementById('achievementsCard');
 if(el){
   el.innerHTML = achievements.map(a=>{
     return `<div>${a[1]?'✓':'•'} ${a[0]}</div>`;
   }).join('');
 }
};
