const D = window.COURSE_DATA;
const $ = (s,r=document)=>r.querySelector(s);
const $$ = (s,r=document)=>[...r.querySelectorAll(s)];

let selectedClass = "all";
let materialWeek = "all";
let scheduleView = "roadmap";

const PHASES = [
  {key:"backend",label:"Foundation",range:[1,3],className:"phase-backend",icon:"01"},
  {key:"data",label:"Backend & Data",range:[4,6],className:"phase-data",icon:"02"},
  {key:"security",label:"Security",range:[7,7],className:"phase-security",icon:"03"},
  {key:"exam",label:"UTS",range:[8,8],className:"phase-exam",icon:"✦"},
  {key:"frontend",label:"Frontend & Full-stack",range:[9,12],className:"phase-frontend",icon:"04"},
  {key:"quality",label:"QA & Deployment",range:[13,15],className:"phase-quality",icon:"05"},
  {key:"exam",label:"UAS",range:[16,16],className:"phase-exam",icon:"✦"}
];

const MATERIAL_ICONS = {
  backend:"{ }", data:"DB", security:"◆", frontend:"UI", quality:"✓", exam:"★"
};

const ASSESSMENT_COLORS = ["#6c63ff","#20c7b7","#16b8d4","#9b6bff","#ff8a4c","#2d6cdf"];

function esc(v=""){
  return String(v).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));
}

function phaseForWeek(week){
  const p = PHASES.find(x=>week>=x.range[0] && week<=x.range[1]);
  return p || PHASES[0];
}

function renderClassFilter(){
  const wrap=$("#classFilter");
  wrap.innerHTML=[{id:"all",type:"Semua"},...D.classes].map(c =>
    `<button type="button" data-class="${c.id}" class="${selectedClass===c.id?"active":""}">${esc(c.type)}</button>`
  ).join("");
  $$("[data-class]",wrap).forEach(b=>b.onclick=()=>{
    selectedClass=b.dataset.class;
    renderClassFilter();
    renderClasses();
  });
}

function renderClasses(){
  const list=selectedClass==="all"?D.classes:D.classes.filter(c=>c.id===selectedClass);
  $("#classCards").innerHTML=list.map(c=>`
    <article class="class-card ${c.id==="eksekutif"?"exec":""}">
      <div class="class-head">
        <span class="class-type">${esc(c.type.toUpperCase())}</span>
        <span class="class-badge">${esc(c.mode)}</span>
      </div>
      <h3>${esc(c.name)}</h3>
      <div class="class-time">
        <span class="icon">${c.id==="eksekutif"?"Z":"L1"}</span>
        <div>
          <small>${esc(c.day.toUpperCase())}</small>
          <strong>${esc(c.start)}–${esc(c.end)} ${esc(c.timezone)}</strong>
          <span>${esc(c.location)}</span>
        </div>
      </div>
    </article>
  `).join("");
}

function renderPhaseLegend(){
  const unique = [
    {label:"Foundation",className:"phase-backend"},
    {label:"Backend & Data",className:"phase-data"},
    {label:"Security",className:"phase-security"},
    {label:"Frontend & Full-stack",className:"phase-frontend"},
    {label:"QA & Deployment",className:"phase-quality"},
    {label:"UTS / UAS",className:"phase-exam"}
  ];
  $("#phaseLegend").innerHTML=unique.map(p=>`
    <span class="phase-chip ${p.className}">
      <i class="phase-dot" style="background:var(--phase)"></i>${esc(p.label)}
    </span>
  `).join("");
}

function tagHtml(w,phase){
  const tags=w.tags.map(t=>`<span class="tag">${esc(t)}</span>`);
  if(w.activity)tags.push(`<span class="tag activity">${esc(w.activity)}</span>`);
  return tags.join("");
}

function renderSchedule(query=""){
  const q=query.toLowerCase().trim();
  const rows=D.weeks.filter(w=>{
    const phase=phaseForWeek(w.week);
    return !q || [w.week,w.title,w.summary,w.handsOn,w.activity,w.sub,phase.label,...w.tags].join(" ").toLowerCase().includes(q);
  });

  const wrap=$("#scheduleTimeline");
  wrap.className="schedule-roadmap"+(scheduleView==="grid"?" grid-view":"");
  wrap.innerHTML=rows.length?rows.map(w=>{
    const phase=phaseForWeek(w.week);
    return `
      <article class="week-card ${phase.className}">
        <div class="week-index">${String(w.week).padStart(2,"0")}</div>
        <div class="week-content">
          <div class="week-meta">
            <span class="week-phase">${esc(phase.label)}</span>
            ${w.sub?`<span class="week-sub">${esc(w.sub)}</span>`:""}
          </div>
          <h3>${esc(w.title)}</h3>
          <p>${esc(w.summary)}</p>
          <div class="week-tags">${tagHtml(w,phase)}</div>
        </div>
        <div class="week-actions">
          <button class="link-btn material-open" data-week="${w.week}">Detail ↗</button>
        </div>
      </article>
    `;
  }).join(""):'<div class="empty">Tidak ada jadwal yang cocok. Coba kata kunci lain.</div>';

  $$(".material-open",wrap).forEach(b=>b.onclick=()=>openMaterial(Number(b.dataset.week)));
}

function renderViewSwitch(){
  $$("[data-view]",$("#viewSwitch")).forEach(btn=>{
    btn.classList.toggle("active",btn.dataset.view===scheduleView);
    btn.onclick=()=>{
      scheduleView=btn.dataset.view;
      renderViewSwitch();
      renderSchedule($("#scheduleSearch").value);
    };
  });
}

function renderMaterialFilter(){
  const sel=$("#materialFilter");
  sel.innerHTML='<option value="all">Semua Pertemuan</option>'+
    D.weeks.map(w=>`<option value="${w.week}">Pertemuan ${w.week}</option>`).join("");
  sel.value=materialWeek;
  sel.onchange=()=>{
    materialWeek=sel.value;
    renderMaterials();
  };
}

function renderMaterials(){
  const rows=materialWeek==="all"?D.weeks:D.weeks.filter(w=>String(w.week)===String(materialWeek));
  $("#materialGrid").innerHTML=rows.map(w=>{
    const phase=phaseForWeek(w.week);
    return `
      <article class="material-card ${phase.className}">
        <div class="material-icon">${MATERIAL_ICONS[phase.key] || "•"}</div>
        <span class="num">PERTEMUAN ${w.week}${w.sub?" · "+esc(w.sub):""}</span>
        <h3>${esc(w.title)}</h3>
        <p>${esc(w.summary)}</p>
        <div class="material-actions">
          <button class="link-btn material-open" data-week="${w.week}">Preview hands-on →</button>
        </div>
      </article>
    `;
  }).join("");
  $$(".material-open",$("#materialGrid")).forEach(b=>b.onclick=()=>openMaterial(Number(b.dataset.week)));
}

function openMaterial(week){
  const w=D.weeks.find(x=>x.week===week);
  if(!w)return;
  const phase=phaseForWeek(w.week);
  $("#dialogContent").innerHTML=`
    <span class="eyebrow">PERTEMUAN ${w.week} · ${esc(phase.label)}</span>
    <h2>${esc(w.title)}</h2>
    <p>${esc(w.summary)}</p>
    ${w.sub?`<h4>Sub-CPMK</h4><p>${esc(w.sub)}</p>`:""}
    <h4>Hands-on / Praktik</h4>
    <p>${esc(w.handsOn)}</p>
    <h4>Aktivitas / Penilaian</h4>
    <p>${esc(w.activity)}</p>
    <div class="week-tags">${w.tags.map(t=>`<span class="tag">${esc(t)}</span>`).join("")}</div>
  `;
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
      <small>Bobot RPKPS · ${/Ujian|UTS|UAS/i.test(a.name)?"Assessment":"Coursework"}</small>
    </article>
  `).join("");
}

function renderAssessment(){
  $("#assessmentLegend").innerHTML=D.assessment.map((a,i)=>`
    <div class="legend-row">
      <span class="legend-swatch" style="background:${ASSESSMENT_COLORS[i]}"></span>
      <span>${esc(a.label)}</span>
      <strong>${a.weight}%</strong>
    </div>
  `).join("");
}

function nextTuesdayForClass(c){
  const now=new Date();
  const parts=new Intl.DateTimeFormat("en-CA",{
    timeZone:"Asia/Jakarta",year:"numeric",month:"2-digit",day:"2-digit",
    weekday:"short",hour:"2-digit",minute:"2-digit",hour12:false
  }).formatToParts(now).reduce((a,p)=>(a[p.type]=p.value,a),{});
  const local=new Date(`${parts.year}-${parts.month}-${parts.day}T${c.start}:00+07:00`);
  const jsDay=local.getUTCDay();
  let add=(2-jsDay+7)%7;
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
  $("#nextClassTime").textContent=
    new Intl.DateTimeFormat("id-ID",{timeZone:"Asia/Jakarta",weekday:"long",day:"numeric",month:"long",year:"numeric"}).format(n.date)+
    " · "+n.c.start+"–"+n.c.end+" WIB";
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
$("#materialDialog").addEventListener("click",e=>{
  if(e.target===$("#materialDialog"))$("#materialDialog").close();
});

renderClassFilter();
renderClasses();
renderPhaseLegend();
renderViewSwitch();
renderSchedule();
renderMaterialFilter();
renderMaterials();
renderAssignments();
renderAssessment();
renderNextClass();
initTheme();
