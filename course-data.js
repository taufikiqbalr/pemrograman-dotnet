window.COURSE_DATA = {
  course: {
    code: "IF133",
    name: "Pemrograman .NET",
    semester: 5,
    credits: 3,
    academicYear: "2026/2027",
    term: "Ganjil",
    lecturer: "Taufik Iqbal Ramdhani, S.Kom., M.Sc.",
    description: "Backend modern dengan ASP.NET Core Web API, Entity Framework Core, REST, security, serta frontend Node.js-based menggunakan Angular/TypeScript."
  },
  classes: [
    { id:"reguler", name:"IF133 - Pemrograman .NET (Reguler)", type:"Reguler", day:"Selasa", start:"13:00", end:"15:15", timezone:"WIB", location:"Lab 1", mode:"Tatap Muka" },
    { id:"eksekutif", name:"IF133 - Pemrograman .NET (Eksekutif)", type:"Eksekutif", day:"Selasa", start:"19:00", end:"21:30", timezone:"WIB", location:"Zoom", mode:"Online" }
  ],
  assessment: [
    { label:"Kuis", weight:10 },
    { label:"Praktik / Tugas", weight:30 },
    { label:"Tugas Kelompok", weight:10 },
    { label:"Presentasi", weight:15 },
    { label:"UTS", weight:15 },
    { label:"UAS", weight:20 }
  ],
  weeks: [
    { week:1, sub:"SUB-IF133-1-1", title:"Kontrak Perkuliahan & Pengenalan .NET", summary:"Orientasi mata kuliah, ekosistem .NET, ASP.NET Core, dan arsitektur full-stack.", handsOn:"API Contract Sprint: client → API → database.", tags:["Kontrak","ASP.NET Core","Full-stack"], activity:"Kuis 1 · 2%" },
    { week:2, sub:"SUB-IF133-1-2", title:"Instalasi & Konfigurasi Toolchain", summary:"Setup .NET SDK, Node.js/NVM, VS Code, Postman, dan verifikasi environment.", handsOn:"Environment readiness checklist dan command-line verification.", tags:[".NET SDK","Node.js","VS Code","Postman"], activity:"Kuis 2 · 3%" },
    { week:3, sub:"SUB-IF133-1-3", title:"Skeleton ASP.NET Core Web API", summary:"Solution, project structure, Program.cs, appsettings, controller, routing, Swagger/OpenAPI.", handsOn:"Membuat solution dan Web API pertama.", tags:["Web API","Routing","Swagger"], activity:"Kuis 3 · 5% · Tugas 1 kickoff" },
    { week:4, sub:"SUB-IF133-2-1", title:"Entity Framework Core & Data Persistence", summary:"Entity, DbContext, provider database, connection string, migration, dan database update.", handsOn:"Membangun data model dan migration awal.", tags:["EF Core","DbContext","Migration"], activity:"Tugas 1 final · 10%" },
    { week:5, sub:"SUB-IF133-2-2", title:"REST API & Operasi CRUD", summary:"GET, POST, PUT, DELETE, status code, async/await, dan API contract.", handsOn:"CRUD endpoint dengan Swagger/Postman.", tags:["REST","CRUD","Async"], activity:"Tugas 2 kickoff" },
    { week:6, sub:"SUB-IF133-2-3", title:"DTO, Validation, Error Handling, Logging & CORS", summary:"Desain API yang aman dan maintainable dengan DTO, validasi, logging, konfigurasi, dan CORS.", handsOn:"Refactor API dan negative testing.", tags:["DTO","Validation","Logging","CORS"], activity:"Tugas 2 final · 10%" },
    { week:7, sub:"SUB-IF133-3-1", title:"Authentication & Authorization", summary:"Login, token/JWT, protected endpoint, role/policy, 401 vs 403, dan secret handling.", handsOn:"Membangun auth flow dan menguji protected endpoint.", tags:["JWT","AuthN","AuthZ","Security"], activity:"Tugas 3 & 4 kickoff" },
    { week:8, sub:"", title:"Ujian Tengah Semester (UTS)", summary:"Evaluasi materi backend pertemuan 1–7.", handsOn:"Praktik/ujian sesuai ketentuan UTS.", tags:["UTS"], activity:"UTS · 15%", exam:true },
    { week:9, sub:"SUB-IF133-3-2", title:"Frontend Node.js-Based: Angular & TypeScript", summary:"Angular CLI, component, service, model/interface, HttpClient, dan konsumsi REST API.", handsOn:"Frontend pertama yang mengambil data backend .NET.", tags:["Angular","TypeScript","HttpClient"], activity:"Tugas 3 final · 10%" },
    { week:10, sub:"SUB-IF133-3-3", title:"Integrasi Full-Stack & Milestone", summary:"Integrasi frontend-backend-database, sinkronisasi state, auth flow, dan demo milestone.", handsOn:"End-to-end use case dan milestone presentation.", tags:["Integration","API Contract","Demo"], activity:"Tugas 5 presentasi · 15%" },
    { week:11, sub:"", title:"Frontend CRUD, Routing, Form & Validation", summary:"UI list/detail/create/edit, routing, form validation, feedback, dan state update.", handsOn:"Menyelesaikan CRUD dari UI ke database.", tags:["CRUD UI","Routing","Forms"], activity:"Latihan formatif" },
    { week:12, sub:"", title:"Authentication Client & Full-Stack Security", summary:"Login UI, token handling, interceptor, route guard, protected request, dan error/loading state.", handsOn:"Integrasi authentication frontend–backend.", tags:["Interceptor","Guard","Token"], activity:"Tugas 4 checkpoint" },
    { week:13, sub:"", title:"Testing, Debugging & Quality Assurance", summary:"Postman test matrix, breakpoint, logging, EF diagnostics, Browser DevTools, defect report, regression test.", handsOn:"Reproduce → diagnose → fix → regression.", tags:["Testing","Debugging","QA"], activity:"Tugas 4 checkpoint" },
    { week:14, sub:"", title:"Build, Deployment & Production Configuration", summary:"dotnet publish, frontend production build, environment configuration, security readiness, dan smoke test.", handsOn:"Membuat deployment package dan dokumentasi run/build/deploy.", tags:["Build","Deploy","Production"], activity:"Tugas 4 final · 10%" },
    { week:15, sub:"", title:"Project Clinic, Code Review & UAS Preparation", summary:"Final review arsitektur, code quality, API contract, test evidence, dokumentasi, dan demo rehearsal.", handsOn:"Smoke test final dan final-demo rehearsal.", tags:["Code Review","Project Clinic","Demo"], activity:"Formatif" },
    { week:16, sub:"", title:"Ujian Akhir Semester (UAS)", summary:"Final full-stack project: design, implementation, QA, build, dokumentasi, dan demo.", handsOn:"Presentasi dan demonstrasi proyek akhir.", tags:["UAS","Final Project"], activity:"UAS · 20%", exam:true }
  ],
  assignments: [
    { name:"Kuis 1", weeks:"Pertemuan 1", weight:"2%", desc:"Pengenalan .NET dan arsitektur full-stack." },
    { name:"Kuis 2", weeks:"Pertemuan 2", weight:"3%", desc:"Instalasi dan konfigurasi toolchain." },
    { name:"Kuis 3", weeks:"Pertemuan 3", weight:"5%", desc:"Skeleton ASP.NET Core Web API." },
    { name:"Tugas 1", weeks:"Pertemuan 3–4", weight:"10%", desc:"Backend skeleton, EF Core, migration, dan data persistence." },
    { name:"Tugas 2", weeks:"Pertemuan 5–6", weight:"10%", desc:"REST CRUD, DTO, validation, error handling, logging, dan CORS." },
    { name:"Tugas 3", weeks:"Pertemuan 7–9", weight:"10%", desc:"Frontend Angular/TypeScript yang mengonsumsi REST API .NET." },
    { name:"Tugas 4", weeks:"Pertemuan 7–14", weight:"10%", desc:"Proyek kelompok full-stack, security, QA, build, dan dokumentasi." },
    { name:"Tugas 5", weeks:"Pertemuan 10", weight:"15%", desc:"Presentasi milestone dan demonstrasi integrasi full-stack." },
    { name:"UTS", weeks:"Pertemuan 8", weight:"15%", desc:"Evaluasi capaian materi backend pertemuan 1–7." },
    { name:"UAS", weeks:"Pertemuan 16", weight:"20%", desc:"Final full-stack project dan demo." }
  ]
};