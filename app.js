const D = window.COURSE_DATA;
const $ = (s,r=document)=>r.querySelector(s);
const $$ = (s,r=document)=>[...r.querySelectorAll(s)];

let selectedClass = "all";
let materialWeek = "all";

function esc(v=""){return String(v).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));}

function renderClassFilter(){
  const wrap=$("#classFilter");
  wrap.innerHTML=[{id:"all",type:"Semua"},...D.classes].map(c =>
    `<button type="button" data-class="${c.id}" class="${selectedClass===c.id?"active":""}">${esc(c.type)}</button>`
  ).join("");
  $$("[data-class]",wrap).forEach(b=>b.onclick=()=>{selectedClass=b.dataset.class;renderClassFilter();renderClasses();});
}

function renderClasses(){
  const list=selectedClass==="all"?D.classes:D.classes.filter(c=>c.id===selectedClass);
  $("#classCards").innerHTML=list.map(c=>`
    <article class="class-card">
      <span class="class-type">${esc(c.type)}</span>
      <h3>${esc(c.name)}</h3>
      <dl>
        <dt>Hari</dt><dd>${esc(c.day)}</dd>
        <dt>Waktu</dt><dd>${esc(c.start)}–${esc(c.end)} ${esc(c.timezone)}</dd>
        <dt>Tempat</dt><dd>${esc(c.location)}</dd>
        <dt>Mode</dt><dd>${esc(c.mode)}</dd>
      </dl>
    </article>`).join("");
}

function tagHtml(w){
  const base=w.tags.map(t=>`<span class="tag">${esc(t)}</span>`);
  if(w.exam)base.push('<span class="tag exam">Ujian</span>');
  if(/Tugas/i.test(w.activity))base.push('<span class="tag task">Tugas</span>');
  return base.join("");
}

function renderSchedule(query=""){
  const q=query.toLowerCase().trim();
  const rows=D.weeks.filter(w=>!q || [w.week,w.title,w.summary,w.handsOn,w.activity,w.sub,...w.tags].join(" ").toLowerCase().includes(q));
  $("#scheduleTimeline").innerHTML=rows.length?rows.map(w=>`
    <article class="week">
      <div class="week-no">PERTEMUAN ${w.week}</div>
      <div>
        <h3>${esc(w.title)}</h3>
        <p>${esc(w.summary)}</p>
        <div class="week-tags">${tagHtml(w)}</div>
      </div>
      <div class="week-actions">
        <button class="link-btn material-open" data-week="${w.week}">Detail</button>
      </div>
    </article>`).join(""):'<div class="empty">Tidak ada jadwal yang cocok.</div>';
  $$(".material-open").forEach(b=>b.onclick=()=>openMaterial(Number(b.dataset.week)));
}

function renderMaterialFilter(){
  const sel=$("#materialFilter");
  sel.innerHTML='<option value="all">Semua Pertemuan</option>'+D.weeks.map(w=>`<option value="${w.week}">Pertemuan ${w.week}</option>`).join("");
  sel.value=materialWeek;
  sel.onchange=()=>{materialWeek=sel.value;renderMaterials();};
}

function renderMaterials(){
  const rows=materialWeek==="all"?D.weeks:D.weeks.filter(w=>String(w.week)===String(materialWeek));
  $("#materialGrid").innerHTML=rows.map(w=>`
    <article class="material-card">
      <span class="num">PERTEMUAN ${w.week}${w.sub?" · "+esc(w.sub):""}</span>
      <h3>${esc(w.title)}</h3>
      <p>${esc(w.summary)}</p>
      <div class="material-actions">
        <button class="link-btn material-open" data-week="${w.week}">Preview</button>
      </div>
    </article>`).join("");
  $$(".material-open",$("#materialGrid")).forEach(b=>b.onclick=()=>openMaterial(Number(b.dataset.week)));
}

function openMaterial(week){
  const w=D.weeks.find(x=>x.week===week); if(!w)return;
  $("#dialogContent").innerHTML=`
    <span class="eyebrow">Pertemuan ${w.week}${w.sub?" · "+esc(w.sub):""}</span>
    <h2>${esc(w.title)}</h2>
    <p class="muted">${esc(w.summary)}</p>
    <h4>Hands-on / Praktik</h4>
    <p>${esc(w.handsOn)}</p>
    <h4>Tag Materi</h4>
    <div class="week-tags">${tagHtml(w)}</div>
    <h4>Aktivitas / Penilaian</h4>
    <p>${esc(w.activity)}</p>`;
  $("#materialDialog").showModal();
}

function renderAssignments(){
  $("#assignmentGrid").innerHTML=D.assignments.map(a=>`
    <article class="assignment-card">
      <div class="assignment-top">
        <span class="eyebrow">${esc(a.weeks)}</span>
        <span class="weight">${esc(a.weight)}</span>
      </div>
      <h3>${esc(a.name)}</h3>
      <p>${esc(a.desc)}</p>
      <small>Bobot RPKPS</small>
    </article>`).join("");
}

function renderAssessment(){
  $("#assessmentBars").innerHTML=D.assessment.map(a=>`
    <div class="assessment-row">
      <div class="top"><span>${esc(a.label)}</span><strong>${a.weight}%</strong></div>
      <div class="bar"><span style="width:${a.weight}%"></span></div>
    </div>`).join("");
}

function nextTuesdayForClass(c){
  const now=new Date();
  const parts=new Intl.DateTimeFormat("en-CA",{timeZone:"Asia/Jakarta",year:"numeric",month:"2-digit",day:"2-digit",weekday:"short",hour:"2-digit",minute:"2-digit",hour12:false}).formatToParts(now).reduce((a,p)=>(a[p.type]=p.value,a),{});
  const local=new Date(`${parts.year}-${parts.month}-${parts.day}T${c.start}:00+07:00`);
  const jsDay=local.getUTCDay();
  const target=2;
  let add=(target-jsDay+7)%7;
  const localNowMinutes=Number(parts.hour)*60+Number(parts.minute);
  const startM=Number(c.start.slice(0,2))*60+Number(c.start.slice(3));
  if(add===0 && localNowMinutes>=startM)add=7;
  local.setUTCDate(local.getUTCDate()+add);
  return local;
}

function renderNextClass(){
  const candidates=D.classes.map(c=>({c,date:nextTuesdayForClass(c)})).sort((a,b)=>a.date-b.date);
  const n=candidates[0];
  $("#nextClassTitle").textContent=n.c.type+" · "+n.c.day;
  $("#nextClassTime").textContent=new Intl.DateTimeFormat("id-ID",{timeZone:"Asia/Jakarta",weekday:"long",day:"numeric",month:"long",year:"numeric"}).format(n.date)+" · "+n.c.start+"–"+n.c.end+" WIB";
  $("#nextClassLocation").textContent=n.c.location+" · "+n.c.mode;
}

function initTheme(){
  const saved=localStorage.getItem("if133-theme");
  if(saved)document.documentElement.dataset.theme=saved;
  $("#themeToggle").onclick=()=>{
    const next=document.documentElement.dataset.theme==="dark"?"light":"dark";
    document.documentElement.dataset.theme=next;
    localStorage.setItem("if133-theme",next);
  };
}

$("#scheduleSearch").addEventListener("input",e=>renderSchedule(e.target.value));
$("#dialogClose").onclick=()=>$("#materialDialog").close();
$("#materialDialog").addEventListener("click",e=>{if(e.target===$("#materialDialog"))$("#materialDialog").close();});

renderClassFilter();renderClasses();renderSchedule();renderMaterialFilter();renderMaterials();renderAssignments();renderAssessment();renderNextClass();initTheme();
