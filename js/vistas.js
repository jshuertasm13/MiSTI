"use strict";
const FLUJO={borrador:["Borrador",""],revision:["En revisión","c-dark"],aprobado:["Aprobado","c-good"],devuelto:["Devuelto","c-warn"]};
const flujoChip=(f,apLabel)=>{const x=FLUJO[f||"borrador"];return `<span class="chip ${x[1]}">${f==="aprobado"&&apLabel?apLabel:x[0]}</span>`;};
function log(t){const p=P();p.actividad.unshift({f:TODAY,q:who().replace(/^Ing\.\s*/,""),t});p.actividad=p.actividad.slice(0,50);}
/* Borrar: el residente borra lo que no está aprobado; el director, cualquier registro. Pide confirmación con un segundo clic. */
const puedeBorrar=rec=>canEdit()&&((rec.flujo||"borrador")!=="aprobado"||canApprove());
function delBtn(kind,rec,small){if(!rec||!rec.id||!puedeBorrar(rec))return"";const arm=U.delArm===kind+":"+rec.id;
  return `<button class="btn ${small?"small ":""}${arm?"danger":"ghostdanger"}" data-act="delRec" data-k="${kind}" data-id="${rec.id}">${arm?"¿Borrar? Clic para confirmar":"Borrar"}</button>`;}
function flujoBtns(rec,kind,apLabel){
  if(isCons())return"";const f=rec.flujo||"borrador";let h="";const ap=apLabel||"Aprobar y publicar";
  if((f==="borrador"||f==="devuelto")&&!canApprove())h+=`<button class="btn dark" data-act="flujo" data-k="${kind}" data-id="${rec.id}" data-v="revision">Enviar a revisión</button>`;
  if(canApprove()&&f==="aprobado")h+=`<button class="btn" data-act="flujo" data-k="${kind}" data-id="${rec.id}" data-v="borrador" title="Vuelve a borrador para corregirlo">Reabrir</button>`;
  if(canApprove()&&f!=="aprobado")h+=`${f==="revision"?`<button class="btn" data-act="flujo" data-k="${kind}" data-id="${rec.id}" data-v="devuelto">Devolver</button>`:""}<button class="btn primary" data-act="flujo" data-k="${kind}" data-id="${rec.id}" data-v="aprobado">${ap}</button>`;
  return h;
}
const elLabel=i=>`${CHK[i.tipo]?.label||i.tipo} · ${i.nivel}, ${i.torre}`;
function faseStats(i,k){const items=chkItems(i.tipo).filter(it=>it.fase===k);const r=i.resp||{};const c=(i.conf||{})[k]||"";
  const done=items.filter(it=>r[it.id]&&r[it.id].e).length,nc=items.filter(it=>r[it.id]&&r[it.id].e==="NC"&&!r[it.id].fix).length;
  return{total:items.length,done,nc,conf:c,listo:items.length>0&&done===items.length&&nc===0};}
function inspStats(i){const items=chkItems(i.tipo);const r=i.resp||{};
  const st={total:items.length,done:0,nc:0,fix:0,antesT:0,antesD:0};
  items.forEach(it=>{const a=r[it.id];if(it.fase==="antes")st.antesT++;if(a&&a.e){st.done++;if(it.fase==="antes")st.antesD++;if(a.e==="NC"){if(a.fix)st.fix++;else st.nc++;}}});
  st.fases={};FASES.forEach(([k])=>st.fases[k]=faseStats(i,k));
  st.listo=st.antesD===st.antesT&&st.nc===0;
  st.estado=st.nc?"correccion":FASES.every(([k])=>st.fases[k].conf)?"conforme":"revision";return st;}
/* Datos anteriores: un elemento conforme queda conforme en las fases que tienen todos sus ítems revisados */
function normInsp(i){if(i.conf)return;i.conf={};const r=i.resp||{};
  FASES.forEach(([k])=>{const its=chkItems(i.tipo).filter(it=>it.fase===k);i.conf[k]=i.conforme&&its.length&&its.every(it=>r[it.id]&&r[it.id].e)?i.conforme:"";});
  if(!FASES.every(([k])=>i.conf[k]))i.conforme="";}
const faseCell=f=>f.conf?`<span class="chip c-good" title="Conforme el ${fd(f.conf)}">✓ ${fd(f.conf).replace(/ \d{4}$/,"")}</span>`:f.nc?`<span class="chip c-crit">Corregir</span>`:f.done?`<span class="muted mono">${f.done}/${f.total}</span>`:'<span class="muted">—</span>';
const INSP={revision:["En revisión","c-dark"],correccion:["Requiere corrección","c-crit"],conforme:["Conforme","c-good"]};
const inspChip=k=>`<span class="chip ${INSP[k][1]}">${INSP[k][0]}</span>`;
const NCE={abierta:["Abierta","c-crit"],respondida:["Respondida","c-y"],cerrada:["Levantada","c-good"]};
const ncVencida=n=>n.estado==="abierta"&&n.limite&&n.limite<TODAY;
const ncChip=n=>`<span class="chip ${NCE[n.estado][1]}">${NCE[n.estado][0]}</span>${ncVencida(n)?' <span class="chip c-late">Vencida</span>':""}`;

/* ============================================================
   Estado de la interfaz
   ============================================================ */
const U={view:"inicio",sel:null,sheet:null,tabInsp:"antes",tabEns:"concreto",busy:null,confirm:false,openItem:{},
  fi:{mes:"",torre:"",estado:"",q:""},fn:{estado:"",q:""},newRep:{tipo:"semanal"},respDraft:{},
  ff:{desde:"",hasta:"",torre:"",origen:""},selFotos:[],loginErr:"",fu:{q:"",emp:""}};
function log(t){const p=P();if(!p)return;p.actividad=p.actividad||[];p.actividad.unshift({f:TODAY,q:who().replace(/^Ing\.\s*/,""),t});p.actividad=p.actividad.slice(0,50);}
const initials=n=>String(n||"?").replace(/^(Ing|Arq)\.\s*/i,"").split(/\s+/).filter(Boolean).slice(0,2).map(w=>w[0]).join("").toUpperCase();
const PROJ_VIEWS=["tablero","documentos","materiales","ensayos","inspecciones","inspeccion","nc","informes","informe","fotos","proyecto"];

function alertas(){
  const p=P();const a=[];
  p.documentos.filter(visible).forEach(d=>{if(d.vence){const n=days(TODAY,d.vence);if(n<0)a.push({k:"c-crit",t:`${d.nombre} vencido`,s:`Venció el ${fd(d.vence)}`,go:["documentos",d.id]});else if(n<=45)a.push({k:"c-warn",t:`${d.nombre} vence en ${n} días`,s:`Vence el ${fd(d.vence)}`,go:["documentos",d.id]});}
    (d.rev||[]).forEach(it=>{if(it.est!=="ok")a.push({k:it.est==="aus"?"c-crit":"c-warn",t:`${d.nombre}: ${it.t.toLowerCase()}`,s:it.obs||"Ítem pendiente en la revisión del documento",go:["documentos",d.id]});});});
  resumenEns(p).rows.forEach(r=>{const lbl=`${r.tl} · muestra ${r.cod}`;
    if(r.est==="nocumple")a.push({k:"c-crit",t:`${lbl} no cumple`,s:`${f1(r.base)} MPa para ${f1(r.fc)} MPa · ${r.loc}`,go:["ensayos"]});
    else if(r.est==="prombajo")a.push({k:"c-serious",t:`${lbl}: promedio de 3 bajo la resistencia especificada`,s:r.loc,go:["ensayos"]});
    else if(r.est==="vencido")a.push({k:"c-late",t:`${lbl}: rotura de 28 días atrasada`,s:`Muestreada el ${fd(r.fecha)} · ${r.loc}`,go:["ensayos"]});});
  p.inspecciones.forEach(i=>{const s=inspStats(i);if(s.nc)a.push({k:"c-crit",t:`${elLabel(i)} requiere corrección`,s:`${s.nc} ítem(s) por corregir · ${i.ident}`,go:["inspeccion",i.id]});});
  p.nc.filter(visible).forEach(n=>{if(ncVencida(n))a.push({k:"c-late",t:`${n.id} vencida sin respuesta`,s:`${n.titulo} · límite ${fd(n.limite)}`,go:["nc",n.id]});
    else if(n.estado==="respondida"&&!isCons())a.push({k:"c-y",t:`${n.id}: el constructor respondió`,s:"Verifica en obra y levanta o rechaza la respuesta",go:["nc",n.id]});
    else if(n.estado==="abierta"&&isCons())a.push({k:"c-crit",t:`${n.id} pendiente de su respuesta`,s:`${n.titulo} · límite ${fd(n.limite)}`,go:["nc",n.id]});});
  if(!isCons())p.certificados.filter(c=>c.flujo!=="aprobado").forEach(c=>a.push({k:"c-dark",t:`Certificado ${c.id} por revisar`,s:c.material,go:["cert",c.id]}));
  const pri={"c-crit":0,"c-late":1,"c-y":2,"c-serious":3,"c-warn":4,"c-dark":5};return a.sort((x,y)=>pri[x.k]-pri[y.k]);
}

/* ============================================================
   Acceso
   ============================================================ */
function vLogin(){
  return `<div class="login"><section class="hero"><div class="mark"><span class="logo">${IC.logo}</span><div><h1>Mi STI</h1><div style="color:var(--rail-dim);font-size:13px;margin-top:4px">Supervisión técnica independiente · NSR-10 Título I</div></div></div>
    <div style="display:flex;flex-direction:column;gap:18px"><p>Control documental y control de calidad de la obra en un solo lugar: licencias y diseños, materiales, ensayos, inspecciones, no conformidades, informes y registro fotográfico.</p>
    <ul><li>Cada firma con sus proyectos, usuarios y colores</li><li>El constructor consulta y responde las no conformidades</li><li>Informes y registros exportables a PDF</li></ul></div>
    <small style="color:var(--rail-dim)">Mi STI v2.1 (19 nov 2026) · los datos se guardan en este navegador.</small></section>
  <section class="box"><div><div class="eyebrow">Acceso</div><h2 style="font-size:24px;margin-top:4px">Ingresa a tu cuenta</h2></div>
    <form id="loginForm" autocomplete="on"><label class="fl">Usuario<input type="text" id="lgUser" autocomplete="username" required autofocus></label>
    <label class="fl">Contraseña<input type="password" id="lgPass" autocomplete="current-password" required></label>
    ${U.loginErr?`<div class="err">${esc(U.loginErr)}</div>`:""}<button class="btn primary" type="submit">Ingresar</button></form>
    ${D.demo!==false?`<div class="demo-acc"><b style="font-size:12.5px">Cuentas de prueba</b><span class="muted" style="font-size:12px">Toca una para llenar el acceso.</span>${CUENTAS_DEMO.filter(c=>D.usuarios.some(u=>u.usuario===c[0])).map(c=>`<button type="button" data-act="fillLogin" data-u="${esc(c[0])}" data-p="${esc(c[2])}"><b>${esc(c[1])}</b><span>${esc(c[0])}</span></button>`).join("")}<span class="muted" style="font-size:11.5px">Contraseña de todas: ${DEMO_PASS} (dueño: ${OWNER_PASS})</span></div>`:""}
  </section></div>`;
}

/* ============================================================
   Marco
   ============================================================ */
function navItems(){const p=P();const it=[];
  if(p){const al=alertas().filter(a=>a.k==="c-crit"||a.k==="c-late").length;const ncA=p.nc.filter(n=>visible(n)&&(isCons()?n.estado==="abierta":n.estado!=="cerrada")).length;
    it.push(["tablero","Tablero",IC.dash,al],["documentos","Documentos",IC.doc],["materiales","Materiales",IC.box],["ensayos","Ensayos",IC.lab],["inspecciones","Inspecciones",IC.chk],["nc","No conformidades",IC.nc,ncA],["informes","Informes",IC.rep],["fotos","Registro fotográfico",IC.photo],["proyecto","Proyecto",IC.bld]);}
  else it.push(["inicio","Inicio",IC.dash]);
  it.push(["sep"]);
  if(esOwner())it.push(["plataforma","Empresas",IC.firm],["usuarios","Usuarios",IC.users]);
  else if(esAdmin())it.push(["empresa","Mi empresa",IC.firm],["usuarios","Usuarios",IC.users],["proyectos","Proyectos",IC.bld]);
  it.push(["cuenta","Mi cuenta",IC.key]);return it;}
function renderFrame(){
  const p=P();const me=ME();const E=EMP();
  aplicarPaleta(paletaDe(E));
  const cur=v=>U.view===v||(U.view==="inspeccion"&&v==="inspecciones")||(U.view==="informe"&&v==="informes");
  $("nav").innerHTML=navItems().map(n=>n[0]==="sep"?'<div class="sep"></div>':`<button data-act="nav" data-v="${n[0]}" aria-current="${cur(n[0])?"page":"false"}">${n[2]}<span>${n[1]}</span>${n[3]?`<span class="badge">${n[3]}</span>`:""}</button>`).join("");
  $("railFirm").textContent=E?E.razon:"Plataforma";
  $("railLogo").innerHTML=E&&E.logo?`<img src="${E.logo}" alt="Logo de la firma">`:IC.logo;
  const vis=proyectosVisibles();const ps=$("projSel");
  ps.innerHTML=(p?"":`<option value="">${vis.length?"Elegir proyecto…":"Sin proyectos asignados"}</option>`)+vis.map(x=>`<option value="${x.id}" ${p&&x.id===p.id?"selected":""}>${esc(x.nombre)}${esOwner()?` · ${esc(empById(x.empresaId)?.razon||"")}`:""}</option>`).join("")+(esAdmin()?'<option value="__new">+ Nuevo proyecto…</option>':"")+(p&&(esOwner()||esAdmin())?'<option value="__none">— Salir del proyecto</option>':"");
  $("topSub").textContent=p?`${p.municipio||""}${p.licencia?" · Licencia "+p.licencia:""} · ${sisTxt(p)}`:(esOwner()?"Administración de la plataforma":E?E.razon:"");
  const rol=p?ROL_P[ROL()]:esOwner()?"Dueño de la plataforma":esAdmin()?"Administrador":ROL_P[me.rol]||"";
  $("userBox").innerHTML=`<span class="av">${esc(initials(me.nombre))}</span><span><b>${esc(me.nombre)}</b><span class="rolechip">${esc(rol)}</span></span><button class="btn small" data-act="logout" title="Cerrar sesión">${IC.out}<span>Salir</span></button>`;
  const rb=$("roBanner");rb.hidden=!(p&&isCons());if(p)rb.textContent=`Vista del constructor (${p.constructora}): consulta de lo aprobado por la supervisión. Solo puede responder las no conformidades.`;
  renderAi();
}
function render(){
  if(!ME()){if(U.ensMod){U.ensMod.api.destroy();U.ensMod=null;}$("app").hidden=true;$("loginRoot").hidden=false;aplicarPaleta(paletaDe(null));$("loginRoot").innerHTML=vLogin();U.sheet=null;renderSheet();return;}
  $("loginRoot").hidden=true;$("app").hidden=false;
  if(PROJ_VIEWS.includes(U.view)&&!P())U.view="inicio";
  if(U.view==="plataforma"&&!esOwner())U.view="inicio";
  if((U.view==="empresa"||U.view==="proyectos")&&!esAdmin()&&!esOwner())U.view="inicio";
  if(U.view==="usuarios"&&!esAdmin()&&!esOwner())U.view="inicio";
  renderFrame();
  const fn={inicio:vInicio,tablero:vTablero,documentos:vDocumentos,materiales:vMateriales,ensayos:vEnsayos,inspecciones:vInspecciones,inspeccion:vInspeccion,nc:vNC,informes:vInformes,informe:vInforme,fotos:vFotos,proyecto:vProyecto,
    plataforma:vPlataforma,empresa:vEmpresa,usuarios:vUsuarios,proyectos:vProyectos,cuenta:vCuenta}[U.view]||vInicio;
  $("view").innerHTML=fn();if(U.view==="ensayos")montarEnsHost();
  if(PDF_LISTAS[U.view]&&(U.view==="proyectos"||P())){const ph=$("view").querySelector(".phead");if(ph){let ac=ph.querySelector(":scope>.actions");if(!ac){ac=document.createElement("div");ac.className="actions";ph.appendChild(ac);}
    ac.insertAdjacentHTML("afterbegin",`<button class="btn" data-act="pdfLista" data-v="${U.view}">${IC.pdf} Exportar PDF</button>`);}}
  renderSheet();
}
/* PDF de las pestañas que son listas (cada registro tiene además su propio PDF) */
const PDF_LISTAS={documentos:1,materiales:1,nc:1,informes:1,proyecto:1,proyectos:1};
function pdfListaHTML(v){const p=P();const T=(cols,rows,w)=>`<table>${w?`<colgroup>${w.map(x=>x?`<col style="width:${x}%">`:"<col>").join("")}</colgroup>`:""}<thead><tr>${cols.map(c=>`<th>${c}</th>`).join("")}</tr></thead><tbody>${rows.length?rows.join(""):`<tr><td colspan="${cols.length}">Sin registros.</td></tr>`}</tbody></table>`;
  const est=r=>FLUJO[r.flujo||"borrador"][0];
  if(v==="documentos"){const docs=p.documentos.filter(visible);return hdrHTML("Control documental",`${docs.length} documento(s)`)+["Licencias y permisos","Diseños y estudios","Contratos y otros"].map(c=>{const l=docs.filter(d=>(d.cat||DOC_CAT[d.tipo])===c);if(!l.length)return"";
    return `<h2>${c}</h2>`+T(["Documento","Versión","Fecha","Vence","Contenido mínimo","Adjunto","Estado"],l.map(d=>{const rv=d.rev||[];return `<tr><td>${esc(d.nombre)}<br><small>${esc(DOC_TIPOS[d.tipo]||"")}</small></td><td>v${esc(d.version)}</td><td>${fd(d.fecha)}</td><td>${d.vence?fd(d.vence):"—"}</td><td>${rv.length?`${rv.filter(i=>i.est==="ok").length}/${rv.length} completos`:REV[d.tipo]?"Sin revisar":"—"}</td><td>${d.archivo?"Sí":"No"}</td><td>${est(d)}</td></tr>`;}),[30,8,12,12,14,8,0]);}).join("")+firmasHTML();}
  if(v==="materiales"){const l=p.certificados.filter(visible).slice().sort((a,b)=>(a.fecha||"").localeCompare(b.fecha||""));return hdrHTML("Control de certificados de materiales",`${l.length} certificado(s)`)+"<h2>Certificados de calidad</h2>"+T(["No.","Material","Proveedor · lote","Norma","Fecha","Cantidad","Resultado","Estado"],l.map(c=>`<tr><td>${c.id}</td><td>${esc(c.material)}</td><td>${esc(c.proveedor)}<br><small>${esc(c.lote)}</small></td><td>${esc(c.norma)}</td><td>${fd(c.fecha)}</td><td>${esc(c.cantidad)}</td><td class="${c.resultado==="Cumple"?"st-ok":c.resultado?"st-nc":""}">${esc(c.resultado||"—")}</td><td>${est(c)}</td></tr>`),[8,20,18,10,11,11,10,12])+firmasHTML();}
  if(v==="nc"){const l=p.nc.filter(visible).slice().sort((a,b)=>a.fecha.localeCompare(b.fecha));return hdrHTML("Control de no conformidades",`${l.length} no conformidad(es)`)+"<h2>No conformidades</h2>"+T(["No.","Fecha","No conformidad","Ubicación","Límite","Estado"],l.map(n=>`<tr><td>${n.id}</td><td>${fd(n.fecha)}</td><td>${esc(n.titulo)}<br><small>${esc(n.numeral||"")}${n.origen?" · "+esc(n.origen):""}</small></td><td>${esc(n.ubic||"")}</td><td>${n.limite?fd(n.limite):"—"}</td><td class="${n.estado==="cerrada"?"st-ok":ncVencida(n)?"st-nc":""}">${NCE[n.estado][0]}${ncVencida(n)?" · vencida":""}${n.flujo!=="aprobado"?" · borrador":""}</td></tr>`),[8,12,0,22,12,15])+firmasHTML();}
  if(v==="informes"){const l=p.informes.filter(visible).slice().sort((a,b)=>a.tipo.localeCompare(b.tipo)||a.id.localeCompare(b.id));return hdrHTML("Control de informes",`${l.length} informe(s)`)+"<h2>Informes generados</h2>"+T(["No.","Tipo","Cobertura","Generado","Estado"],l.map(r=>`<tr><td>${r.id}</td><td>${REPS[r.tipo]}</td><td>${fd(r.desde)} – ${fd(r.hasta)}</td><td>${fd(r.creado)}</td><td>${est(r)}</td></tr>`),[12,24,0,14,14])+firmasHTML();}
  if(v==="proyecto"){const kv=[["Nombre",p.nombre],["Dirección",p.direccion],["Municipio",p.municipio],["Propietario",p.propietario],["Constructora",p.constructora],["Director de obra",p.directorObra],["Licencia",p.licencia],["Curaduría",p.curaduria],["Área construida",p.area],["Unidades",p.unidades],["Contrato de STI",p.contrato],["Inicio de la supervisión",fd(p.inicio)],["Torres o bloques",(p.torres||[]).join(", ")],["Sistema estructural",sisTxt(p)]];
    const fp=p.fotoPrincipal&&PH.get(p.fotoPrincipal);const eq=(p.miembros||[]).map(m=>({m,u:userById(m.uid)})).filter(x=>x.u&&x.u.rol!=="owner");
    return hdrHTML("Ficha del proyecto",esc(p.nombre))+(fp?`<figure class="fotoprin"><img src="${fp}" alt=""></figure>`:"")+"<h2>Datos del proyecto</h2>"+T(["Dato","Valor"],kv.map(([k,x])=>`<tr><th>${k}</th><td>${esc(x||"—")}</td></tr>`),[32,0])
      +"<h2>Equipo del proyecto</h2>"+T(["Nombre","Rol","Cargo","Matrícula"],eq.map(({m,u})=>`<tr><td>${esc(u.nombre)}</td><td>${esc(ROL_P[m.rol]||m.rol)}</td><td>${esc(u.cargo||"")}${u.constructora?" · "+esc(u.constructora):""}</td><td>${esc(u.matricula||"")}</td></tr>`),[30,16,0,22])
      +"<h2>Elementos que se inspeccionan</h2>"+T(["Elemento","Ítems de la lista de chequeo"],tiposDe(p).map(t=>`<tr><td>${CHK[t].label}</td><td>${chkItems(t).length}</td></tr>`),[50,0])+firmasHTML();}
  if(v==="proyectos"){const me=ME();const l=D.proyectos.filter(x=>x.empresaId===me.empresaId);const n=(x,r)=>miembrosRol(x,r).map(u=>esc(u.nombre)).join(", ")||"—";
    return `<div class="hdr"><div><b>${esc((EMP()||{}).razon||"")}</b><h1 style="font-size:15px;margin:4px 0">PROYECTOS DE LA EMPRESA</h1><span>${fd(TODAY)}</span></div></div><h2>Proyectos</h2>`+T(["Proyecto","Sistema estructural","Directores","Residentes","Constructores","Inicio"],l.map(x=>`<tr><td>${esc(x.nombre)}<br><small>${esc(x.municipio||"")}</small></td><td>${esc(sisTxt(x))}</td><td>${n(x,"director")}</td><td>${n(x,"residente")}</td><td>${n(x,"constructor")}</td><td>${fd(x.inicio)}</td></tr>`),[24,20,0,0,0,11]);}
  return "";}
function go(view,sel){U.view=view;U.sel=sel||null;U.confirm=false;U.selFotos=[];try{history.replaceState(null,"","#"+view);}catch(e){}render();window.scrollTo({top:0});}
function abrirProyecto(id){SES.pid=id||null;saveSes();U.selFotos=[];refreshAi();go(id?"tablero":"inicio");}

/* ============================================================
   Inicio (sin proyecto abierto)
   ============================================================ */
function vInicio(){const me=ME();const vis=proyectosVisibles();
  const card=p=>{const nc=p.nc.filter(n=>n.flujo==="aprobado"&&n.estado!=="cerrada").length;const e=empById(p.empresaId);
    return `<button class="card" data-act="openProj" data-id="${p.id}"><span class="eyebrow">${esc(e?.razon||"")}</span><h3>${esc(p.nombre)}</h3><div class="meta"><span>${esc(p.municipio||"")}</span><span>${esc(sisTxt(p))}</span></div><div class="chips"><span class="chip c-dark">${esc(ROL_P[rolEn(p)]||"")}</span>${nc?`<span class="chip c-crit">${nc} NC abiertas</span>`:'<span class="chip c-good">Sin NC abiertas</span>'}</div></button>`;};
  let extra="";
  if(esOwner())extra=`<section class="kpis"><button class="kpi" data-act="nav" data-v="plataforma"><span class="k">Empresas</span><span class="v">${D.empresas.length}</span><span class="d">${D.empresas.filter(e=>e.activa!==false).length} activas</span></button><button class="kpi" data-act="nav" data-v="usuarios"><span class="k">Usuarios</span><span class="v">${D.usuarios.length-1}</span><span class="d">en todas las empresas</span></button><div class="kpi"><span class="k">Proyectos</span><span class="v">${D.proyectos.length}</span><span class="d">en la plataforma</span></div></section>
    <div class="note y">Como dueño de la plataforma creas las empresas y sus usuarios administradores. Solo ves un proyecto si una empresa te agrega como miembro.</div>`;
  else if(esAdmin())extra=`<div class="actions"><button class="btn primary" data-act="newProj">+ Nuevo proyecto</button><button class="btn" data-act="nav" data-v="usuarios">${IC.users} Usuarios</button><button class="btn" data-act="nav" data-v="empresa">${IC.firm} Mi empresa</button></div>`;
  return `<div class="phead"><div><div class="eyebrow">${fd(TODAY)}</div><h1>Hola, ${esc(me.nombre.split(" ")[0])}</h1><p>${vis.length?"Elige un proyecto para trabajar.":esOwner()?"Aún no tienes proyectos asignados.":"Aún no tienes proyectos asignados. Pide al administrador de tu empresa que te agregue."}</p></div></div>
  ${extra}${vis.length?`<section><h2 style="margin-bottom:10px">Proyectos</h2><div class="cards">${vis.map(card).join("")}</div></section>`:""}`;
}

/* ============================================================
   Tablero
   ============================================================ */
function vTablero(){
  const p=P();const E=resumenEns(p).rows;const c28=E.filter(r=>r.base!=null);const ok=c28.filter(r=>["cumple","aceptable","aprobada"].includes(r.est)).length;
  const docs=p.documentos.filter(visible);const docOk=docs.filter(d=>d.flujo==="aprobado").length;
  const revPend=docs.reduce((n,d)=>n+(d.rev||[]).filter(i=>i.est!=="ok").length,0);
  const ins=p.inspecciones.map(inspStats);const conf=ins.filter(s=>s.estado==="conforme").length;const insR=ins.filter(s=>s.estado==="revision").length,insC=ins.filter(s=>s.estado==="correccion").length;
  const nc=p.nc.filter(visible);const ncA=nc.filter(n=>n.estado!=="cerrada");const ncR=nc.filter(n=>n.estado==="respondida");const ncV=nc.filter(ncVencida);
  const al=alertas();const cnt=k=>E.filter(r=>r.est===k).length;
  const kpi=(view,k,v,small,d,bar)=>`<button class="kpi" data-act="nav" data-v="${view}"><span class="k">${k}</span><span class="v">${v}${small?` <small>${small}</small>`:""}</span><span class="d">${d}</span>${bar||""}</button>`;
  const bar=parts=>`<div class="bar">${parts.filter(x=>x[0]>0).map(x=>`<i style="flex:${x[0]};background:${x[1]}"></i>`).join("")}</div>`;
  return `<div class="phead"><div><div class="eyebrow">Tablero del proyecto · ${fd(TODAY)}</div><h1>${esc(p.nombre)}</h1><p>${esc(sisTxt(p))} · ${esc((p.torres||[]).join(", "))}</p></div>
  ${canEdit()?`<div class="actions"><button class="btn" data-act="nav" data-v="informes">${IC.rep} Generar informe</button><button class="btn primary" data-act="newInsp">${IC.chk} Nueva inspección</button></div>`:""}</div>
  <section class="kpis">
    ${kpi("documentos","Documentos",docOk,`/ ${docs.length}`,revPend?`${revPend} ítem(s) de revisión pendientes`:"Revisión de diseños al día",bar([[docOk,"var(--good)"],[docs.length-docOk,"var(--y)"]]))}
    ${kpi("ensayos","Ensayos a 28 días",ok,`/ ${c28.length} cumplen`,`${cnt("nocumple")} no cumple · ${cnt("prombajo")} promedio bajo · ${cnt("vencido")} atrasada`,bar([[cnt("cumple")+cnt("aprobada"),"var(--good)"],[cnt("aceptable"),"var(--y)"],[cnt("prombajo"),"var(--serious)"],[cnt("nocumple"),"var(--crit)"]]))}
    ${kpi("inspecciones","Inspecciones",conf,`/ ${ins.length} conformes`,`${insR} en revisión · ${insC} requieren corrección`,bar([[conf,"var(--good)"],[insR,"var(--ink)"],[insC,"var(--crit)"]]))}
    ${kpi("nc","No conformidades abiertas",ncA.length,`de ${nc.length}`,`${ncR.length} respondida(s) · ${ncV.length} vencida(s)`,bar([[nc.length-ncA.length,"var(--good)"],[ncR.length,"var(--y)"],[ncA.length-ncR.length-ncV.length,"var(--crit)"],[ncV.length,"var(--late)"]]))}
  </section>
  <section class="grid2">
    <div class="panel"><header><h2>Requiere atención</h2><span class="muted">${al.length} punto(s)</span></header>
      <div class="alerts">${al.length?al.slice(0,10).map(a=>`<button class="alert" data-act="goto" data-v="${a.go[0]}" data-id="${esc(a.go[1]||"")}"><span class="chip ${a.k}" style="padding:2px 6px"></span><span><b>${esc(a.t)}</b><span>${esc(a.s)}</span></span></button>`).join(""):'<div class="empty">Todo al día.</div>'}</div></div>
    <div class="panel"><header><h2>Avance de obra</h2><span class="muted">según el último informe</span></header>
      ${(p.avance||[]).length?`<div class="tablewrap"><table><tbody>${p.avance.map(a=>`<tr><td>${esc(a.act)}</td><td style="width:40%"><div class="pbar"><i style="width:${Math.max(0,Math.min(100,+a.pct||0))}%"></i></div></td><td class="n" style="width:60px">${+a.pct||0} %</td></tr>`).join("")}</tbody></table></div>`:'<div class="empty">Se llena desde el informe semanal o el acta mensual.</div>'}
      ${isCons()?"":`<header><h2>Actividad reciente</h2></header>
      <div class="alerts">${(p.actividad||[]).slice(0,5).map(a=>`<div class="alert"><span class="tag">${fd(a.f)}</span><span><b>${esc(a.t)}</b><span>${esc(a.q)}</span></span></div>`).join("")||'<div class="empty">Sin actividad.</div>'}</div>`}</div>
  </section>`;
}

/* ============================================================
   Materiales (certificados de calidad)
   ============================================================ */
function vMateriales(){
  const p=P();const l=p.certificados.filter(visible).slice().sort((a,b)=>(b.fecha||"").localeCompare(a.fecha||""));
  return `<div class="phead"><div><div class="eyebrow">Control de calidad</div><h1>Materiales</h1><p>Certificados de calidad de los materiales que llegan a la obra. Al subir el PDF la app extrae proveedor, material, lote, norma, fecha, cantidad y resultado.</p></div></div>
  ${uploader("cert","Subir certificado de calidad","Se extraen proveedor, material, lote, norma, fecha, cantidad y resultado.")}${busyBox("cert")}
  ${l.length?`<div class="tablewrap"><table><thead><tr><th>No.</th><th>Material</th><th>Proveedor · lote</th><th>Norma</th><th>Fecha</th><th>Resultado</th><th>Estado</th></tr></thead><tbody>${l.map(c=>`<tr class="click" data-act="openCert" data-id="${c.id}"><td class="n">${c.id}</td><td><b>${esc(c.material||"Sin material")}</b>${c.archivo?` <span class="clipi" title="Con archivo adjunto">${IC.clip}</span>`:""}<span class="sub">${esc(c.cantidad)}</span></td><td>${esc(c.proveedor)}<span class="sub">${esc(c.lote)}</span></td><td class="n">${esc(c.norma)}</td><td class="n">${fd(c.fecha)}</td><td>${c.resultado?`<span class="chip ${c.resultado==="Cumple"?"c-good":"c-crit"}">${esc(c.resultado)}</span>`:"—"}</td><td>${flujoChip(c.flujo)}</td></tr>`).join("")}</tbody></table></div>`:'<div class="empty">Sin certificados.</div>'}`;
}

/* ============================================================
   Ensayos: resumen + apps de concreto y mampostería
   ============================================================ */
const ENS_MALOS=["nocumple","prombajo","vencido"];
function ensResumenHTML(p,rows){
  if(!rows.length)return'<div class="empty">Aún no hay ensayos cargados en este proyecto.</div>';
  const tipos=ensTiposDe(p).map(t=>t[0]).filter(k=>rows.some(r=>r.tipo===k));
  return `<div class="tablewrap"><table class="enssum"><thead><tr><th>Material</th>${Object.values(EST_ENS).map(x=>`<th class="c">${x[0]}</th>`).join("")}<th class="c">Total</th></tr></thead><tbody>${tipos.map(k=>{const l=rows.filter(r=>r.tipo===k);return `<tr class="click" data-act="tabEns" data-v="${k}"><td><b>${esc(ENS_TIPOS.find(t=>t[0]===k)[2])}</b></td>${Object.keys(EST_ENS).map(e=>{const n=l.filter(r=>r.est===e).length;return`<td class="c n ${n&&ENS_MALOS.includes(e)?"lo":""}">${n||"·"}</td>`;}).join("")}<td class="c n"><b>${l.length}</b></td></tr>`;}).join("")}</tbody></table></div>`;
}
function ensAccionHTML(p,rows){if(!canEdit())return"";
  const l=rows.filter(r=>ENS_MALOS.includes(r.est)&&!p.nc.some(n=>n.ensayo===r.app+":"+r.cod||n.muestra===r.cod));
  if(!l.length)return"";
  return `<details class="panel ensaccion"><summary><b>Resultados sin no conformidad</b> <span class="muted">${l.length} muestra(s) no cumplen, con promedio bajo o con rotura atrasada</span></summary>
  <div class="tablewrap"><table><thead><tr><th>Muestra</th><th>Material</th><th>Ubicación</th><th>Resultado</th><th>Estado</th><th></th></tr></thead><tbody>${l.map(r=>`<tr><td class="n">${esc(r.cod)}</td><td>${esc(r.tl)}</td><td>${esc(r.loc||r.elemento||"")}</td><td class="n">${r.base!=null?f1(r.base)+" MPa":"—"}</td><td>${estEnsChip(r.est)}</td><td><button class="btn small" data-act="ncFromEns" data-k="${esc(r.app)}" data-id="${esc(r.cod)}">${IC.nc} Crear NC</button></td></tr>`).join("")}</tbody></table></div></details>`;}
function ensTabsHTML(p,rows){
  return `<nav class="tabs enstabs" role="tablist" aria-label="Tipo de ensayo">${ensTiposDe(p).map(([k,,l])=>{const r=rows.filter(x=>x.tipo===k);const nc=r.filter(x=>x.est==="nocumple").length,ve=r.filter(x=>x.est==="vencido").length;
    return `<button class="tab" role="tab" data-act="tabEns" data-v="${k}" aria-selected="${U.tabEns===k}">${l}<span class="cnt">${r.length}</span>${nc?`<span class="cnt bad">✕ ${nc}</span>`:""}${ve?`<span class="cnt late">⌛ ${ve}</span>`:""}</button>`;}).join("")}</nav>`;}
function ensTopHTML(p){const R=resumenEns(p);
  return `${ensResumenHTML(p,R.rows)}${ensAccionHTML(p,R.rows)}${ensTabsHTML(p,R.rows)}`;}
function ensSoloLectura(p,k){const rows=resumenEns(p).rows.filter(r=>r.tipo===k).sort((a,b)=>(b.fecha||"").localeCompare(a.fecha||""));
  if(!rows.length)return'<div class="empty">No hay muestras de este tipo.</div>';
  return `<div class="tablewrap"><table><thead><tr><th>Muestra</th><th>Ubicación</th><th>Muestreo</th><th>Especificada</th><th>Resultado</th><th>%</th><th>Estado</th></tr></thead><tbody>${rows.map(r=>`<tr><td class="n">${esc(r.cod)}</td><td>${esc(r.loc||r.elemento||"")}${r.zona?`<span class="sub">${esc(r.zona)}</span>`:""}</td><td class="n">${fd(r.fecha)}</td><td class="n">${r.fc?f1(r.fc)+" MPa":"—"}</td><td class="n ${r.est==="nocumple"?"lo":""}">${r.base!=null?f1(r.base)+" MPa":"—"}</td><td class="n">${r.ratio!=null?Math.round(r.ratio*100)+" %":"—"}</td><td>${estEnsChip(r.est)}</td></tr>`).join("")}</tbody></table></div>`;}
function vEnsayos(){
  const p=P();const tipos=ensTiposDe(p);if(!tipos.some(t=>t[0]===U.tabEns))U.tabEns=tipos[0][0];
  return `<div class="phead"><div><div class="eyebrow">Control de calidad</div><h1>Ensayos</h1><p>Resultados de laboratorio evaluados con los criterios de aceptación de la NSR-10. El resumen se actualiza con cada muestra; el acta mensual lo toma de aquí.</p></div>
  <div class="actions"><button class="btn" data-act="pdfEns">${IC.pdf} Exportar PDF</button></div></div>
  <div id="ensTop">${ensTopHTML(p)}</div>
  <div id="ensHost" class="enshost"></div>`;
}
/* Monta (o recupera) el módulo de ensayos de la pestaña activa sin perder su estado entre renderizados */
function montarEnsHost(){
  const slot=$("ensHost");if(!slot)return;const p=P();const t=ENS_TIPOS.find(x=>x[0]===U.tabEns);if(!t)return;const app=t[1];const ro=!canEdit();const key=p.id+":"+app+(ro?":ro":"");
  if(U.ensMod&&U.ensMod.key===key){slot.replaceWith(U.ensMod.host);}
  else{if(U.ensMod)U.ensMod.api.destroy();const host=document.createElement("div");host.id="ensHost";host.className="enshost";slot.replaceWith(host);
    const ctx=ctxEns(p,app==="mamposteria"?U.tabEns:null,()=>{const el=$("ensTop");if(el&&U.view==="ensayos"&&P())el.innerHTML=ensTopHTML(P());});ctx.soloLectura=ro;
    const api=montarEnsayo(host,app,ctx);
    U.ensMod={key,host,api,tab:U.tabEns};}
  if(app==="mamposteria"&&U.ensMod.tab!==U.tabEns&&U.ensMod.api.setTab){U.ensMod.api.setTab(U.tabEns);U.ensMod.tab=U.tabEns;}
}
/* Gráficas de control para PDF: % de la resistencia especificada por muestra, en orden de fecha */
function ensChartSVG(rows,titulo,lim,unidad){
  const W=720,H=250,L=46,R=12,T=34,B=34;const n=rows.length;if(!n)return"";
  const vals=rows.map(r=>r.ratio*100);const ymin=Math.min(60,Math.floor((Math.min(...vals)-5)/10)*10),ymax=Math.max(130,Math.ceil((Math.max(...vals)+5)/10)*10);
  const X=i=>L+(n===1?(W-L-R)/2:i*(W-L-R)/(n-1)),Y=v=>T+(ymax-v)*(H-T-B)/(ymax-ymin);
  const col={cumple:"#1d7a3e",aceptable:"#c99a00",prombajo:"#d4691e",nocumple:"#b3261e",aprobada:"#2c5f8a"};
  let g="";for(let v=ymin;v<=ymax;v+=10)g+=`<line x1="${L}" x2="${W-R}" y1="${Y(v)}" y2="${Y(v)}" stroke="#e4e4de"/><text x="${L-6}" y="${Y(v)+4}" font-size="10" text-anchor="end" fill="#666">${v}%</text>`;
  const avg=rows.map((r,i)=>i>=2?(vals[i]+vals[i-1]+vals[i-2])/3:null);
  const pa=avg.map((v,i)=>v==null?"":`${X(i)},${Y(v)}`).filter(Boolean).join(" ");
  return `<svg class="pdfchart" xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" font-family="Arial,sans-serif">
  <rect width="${W}" height="${H}" fill="#fff"/><text x="${L}" y="18" font-size="13" font-weight="bold" fill="#111">${esc(titulo)}</text><text x="${W-R}" y="18" font-size="10" text-anchor="end" fill="#666">${n} resultado(s) · ${esc(unidad||"% de la resistencia especificada")}</text>${g}
  <line x1="${L}" x2="${W-R}" y1="${Y(100)}" y2="${Y(100)}" stroke="#1d7a3e" stroke-width="2"/><text x="${W-R}" y="${Y(100)-4}" font-size="10" text-anchor="end" fill="#1d7a3e">100 %</text>
  ${lim?`<line x1="${L}" x2="${W-R}" y1="${Y(lim)}" y2="${Y(lim)}" stroke="#b3261e" stroke-width="1.5" stroke-dasharray="6 4"/><text x="${W-R}" y="${Y(lim)+12}" font-size="10" text-anchor="end" fill="#b3261e">Límite individual ${Math.round(lim)} %</text>`:""}
  ${pa?`<polyline points="${pa}" fill="none" stroke="#777" stroke-width="1.5" stroke-dasharray="4 3"/>`:""}
  <polyline points="${vals.map((v,i)=>`${X(i)},${Y(v)}`).join(" ")}" fill="none" stroke="#2c3e50" stroke-width="1.5"/>
  ${rows.map((r,i)=>`<circle cx="${X(i)}" cy="${Y(vals[i])}" r="4.5" fill="${col[r.est]||"#555"}"/><text x="${X(i)}" y="${Y(vals[i])-8}" font-size="9" text-anchor="middle" fill="#333">${Math.round(vals[i])}</text><text x="${X(i)}" y="${H-B+14}" font-size="9" text-anchor="middle" fill="#666">${esc(String(r.cod).slice(0,7))}</text>`).join("")}
  ${pa?`<text x="${L+4}" y="${H-6}" font-size="9" fill="#777">- - Promedio móvil de 3 resultados</text>`:""}</svg>`;}
function ensChartsHTML(p,rows){const out=[];
  for(const[k,,l]of ensTiposDe(p)){const r=rows.filter(x=>x.tipo===k&&x.base!=null&&x.ratio!=null).sort((a,b)=>(a.fecha||"").localeCompare(b.fecha||""));if(!r.length)continue;
    if(k==="unidad"){out.push(ensChartSVG(r,l+" · compresión","", "% de la resistencia de la clase"));continue;}
    for(const fc of[...new Set(r.map(x=>+x.fc))].sort((a,b)=>a-b)){const g=r.filter(x=>+x.fc===fc);const lim=k==="murete"?0:(fc<=35?(fc-3.5)/fc*100:90);out.push(ensChartSVG(g,`${l} · ${f1(fc)} MPa`,lim));}}
  return out.length?`<div class="charts">${out.map(s=>`<figure class="chart">${s}</figure>`).join("")}</div>`:"";}
function pdfEnsHTML(p){const R=resumenEns(p);const tipos=ensTiposDe(p).filter(t=>R.rows.some(r=>r.tipo===t[0]));
  const sum=`<table><colgroup><col style="width:20%"></colgroup><thead><tr><th>Material</th>${Object.values(EST_ENS).map(x=>`<th>${x[0]}</th>`).join("")}<th>Total</th></tr></thead><tbody>${tipos.map(([k,,l])=>{const r=R.rows.filter(x=>x.tipo===k);return `<tr><td><b>${esc(l)}</b></td>${Object.keys(EST_ENS).map(e=>`<td>${r.filter(x=>x.est===e).length||"·"}</td>`).join("")}<td><b>${r.length}</b></td></tr>`;}).join("")}</tbody></table>`;
  return hdrHTML("Control de ensayos de laboratorio",R.act?`Actualizado el ${fd(R.act)}`:"")+`<h2>Resumen</h2>${R.rows.length?sum:"<p>Sin ensayos.</p>"}`+(R.rows.length?`<h2>Gráficas de control</h2>${ensChartsHTML(p,R.rows)}`:"")+tipos.map(([k,,l])=>{const rows=R.rows.filter(x=>x.tipo===k).sort((a,b)=>(a.fecha||"").localeCompare(b.fecha||""));
    return `<h2>${esc(l)} · ${rows.length} muestra(s)</h2><table><colgroup><col style="width:9%"><col><col style="width:12%"><col style="width:12%"><col style="width:12%"><col style="width:7%"><col style="width:16%"></colgroup><thead><tr><th>Muestra</th><th>Ubicación</th><th>Muestreo</th><th>Especificada</th><th>Resultado</th><th>%</th><th>Estado</th></tr></thead><tbody>${rows.map(r=>`<tr><td>${esc(r.cod)}</td><td>${esc(r.loc||r.elemento||"")}</td><td>${fd(r.fecha)}</td><td>${r.fc?f1(r.fc)+" MPa":"—"}</td><td class="${r.est==="nocumple"?"st-nc":""}">${r.base!=null?f1(r.base)+" MPa":"—"}</td><td>${r.ratio!=null?Math.round(r.ratio*100)+" %":"—"}</td><td class="${["cumple","aprobada"].includes(r.est)?"st-ok":ENS_MALOS.includes(r.est)?"st-nc":""}">${esc((EST_ENS[r.est]||[r.est])[0])}</td></tr>`).join("")}</tbody></table>`;}).join("")
    +`<p style="font-size:10.5px;color:#555;margin-top:10px">Criterio NSR-10 C.5.6.3.3 para concreto: cada promedio de 3 ensayos consecutivos de la misma clase ≥ f'c y ningún ensayo menor que f'c − 3,5 MPa (f'c ≤ 35 MPa). Mampostería según NSR-10 Título D.</p>`+firmasHTML();}

function uploader(kind,label,hint,sel){
  if(!canEdit())return"";
  return `<div class="drop" data-drop="${kind}"><div style="min-width:200px;flex:1"><b>${label}</b><div class="muted" style="font-size:12.5px">${hint}</div></div>
  <div class="actions">${sel||""}<button class="btn" data-act="sampleDoc" data-k="${kind}">Probar con un ejemplo</button>
  <label class="btn primary">${IC.up} Subir PDF<input type="file" hidden data-up="${kind}" accept="application/pdf,.pdf,.txt"></label></div></div>`;
}
const busyBox=(k,t)=>U.busy===k?`<div class="busy"><span class="spin"></span>${t||"Leyendo el documento…"}</div>`:"";
function vDocumentos(){
  const p=P();const docs=p.documentos.filter(visible);const cats=["Licencias y permisos","Diseños y estudios","Contratos y otros"];
  const catOf=d=>d.cat||DOC_CAT[d.tipo];
  return `<div class="phead"><div><div class="eyebrow">Control documental</div><h1>Documentos</h1><p>Licencias, permisos, estudios, memorias y planos con su versión vigente. Al subir un PDF la app extrae los datos principales y, si es un diseño, revisa su contenido mínimo.</p></div></div>
  ${uploader("doc","Subir un documento","PDF con texto. La app detecta el tipo de documento si no lo eliges.",`<select id="up-doc-tipo" aria-label="Tipo de documento" style="width:auto"><option value="auto">Detectar el tipo</option>${Object.entries(DOC_TIPOS).map(([k,v])=>`<option value="${k}">${v}</option>`).join("")}</select>`)}
  ${busyBox("doc")}
  ${cats.map(c=>{const l=docs.filter(d=>catOf(d)===c);if(!l.length)return"";return `<section class="panel"><header><h2>${c}</h2><span class="muted">${l.length}</span></header><div class="tablewrap"><table><thead><tr><th>Documento</th><th>Versión</th><th>Fecha</th><th>Vence</th><th>Revisión de contenido</th><th>Estado</th></tr></thead><tbody>
    ${l.map(d=>{const rv=d.rev||[];const okN=rv.filter(i=>i.est==="ok").length;const vz=d.vence?days(TODAY,d.vence):null;
      return `<tr class="click" data-act="openDoc" data-id="${d.id}"><td><b>${esc(d.nombre)}</b>${d.archivo?` <span class="clipi" title="Con archivo adjunto">${IC.clip}</span>`:""}<span class="sub">${esc(DOC_TIPOS[d.tipo]||"")}</span></td><td class="n">v${esc(d.version)}</td><td class="n">${fd(d.fecha)}</td><td class="n ${vz!=null&&vz<=45?"lo":""}">${d.vence?fd(d.vence):"—"}</td><td>${rv.length?`<span class="chip ${okN===rv.length?"c-good":"c-warn"}">${okN}/${rv.length} completos</span>`:'<span class="muted">No aplica</span>'}</td><td>${flujoChip(d.flujo)}</td></tr>`;}).join("")}</tbody></table></div></section>`;}).join("")||'<div class="empty">Aún no hay documentos.</div>'}`;
}
function sheetDoc(d){
  const rv=d.rev||[];const ed=canEdit()&&d.flujo!=="aprobado";
  const keys=d.tipo==="licencia"?[...new Set([...LIC_KEYS,...Object.keys(d.datos||{})])]:[...new Set([...GEN_KEYS,...Object.keys(d.datos||{})])];
  return {title:d.nombre,sub:`${DOC_TIPOS[d.tipo]||"Documento"} · v${esc(d.version)} · ${fd(d.fecha)}`,
  body:`${viaNote(d)}<div>${flujoChip(d.flujo)}</div>${archivoHTML(d,"doc",canEdit())}
  ${ed?`<section class="form"><label class="full">Nombre<input type="text" id="docNom" value="${esc(d.nombre)}"></label><label>Tipo<select id="docTipo">${Object.entries(DOC_TIPOS).map(([k,v])=>`<option value="${k}" ${k===d.tipo?"selected":""}>${v}</option>`).join("")}</select></label><label>Versión<input type="text" id="docVer" value="${esc(d.version)}"></label><label>Fecha<input type="date" id="docFecha" value="${esc(d.fecha||"")}"></label><label>Vence<input type="date" id="docVence" value="${esc(d.vence||"")}"></label></section>`:""}
  <section><h3 style="margin-bottom:8px">Información principal</h3>
  ${ed?`<div class="form">${keys.map(k=>`<label class="${k==="Resumen"||k==="Título"?"full":""}">${esc(k)}${k==="Resumen"?`<textarea data-dato="${esc(k)}">${esc(d.datos?.[k]||"")}</textarea>`:`<input type="text" data-dato="${esc(k)}" value="${esc(d.datos?.[k]||"")}">`}</label>`).join("")}</div>`
     :Object.keys(d.datos||{}).filter(k=>d.datos[k]).length?`<dl class="kv">${Object.entries(d.datos).filter(([k,v])=>v).map(([k,v])=>`<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join("")}</dl>`:'<p class="muted">Sin datos.</p>'}</section>
  ${d.tipo==="licencia"&&canEdit()?`<div class="note y">Puedes llevar estos datos a la ficha del proyecto. <button class="btn small" data-act="licToProj" data-id="${d.id}">Actualizar el proyecto</button></div>`:""}
  ${REV[d.tipo]?(()=>{const G=REV_GUIA[d.tipo]||{items:[]};const edR=canEdit()&&d.flujo!=="aprobado";const hechos=rv.filter(it=>it.est).length;
    const EST=[["","Sin revisar"],["ok","Encontrado"],["inc","Incompleto"],["aus","Ausente"]];
    return `<section><header style="display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:8px;flex-wrap:wrap"><h3>Contenido mínimo · ${REV[d.tipo].label}</h3>
    <div class="actions">${edR&&rv.length?`<button class="btn small" data-act="revManual" data-id="${d.id}" title="Vuelve a empezar la lista con todos los ítems sin revisar">Reiniciar lista</button>`:""}${edR&&d._text&&!d._scan?`<button class="btn small ai" data-act="revDoc" data-id="${d.id}">${IC.spark} ${aiReady()?"Revisar con IA":"Revisión automática"}</button>`:""}</div></header>
    ${busyBox("rev","Revisando el contenido…")}
    ${rv.length?`<div class="note ${d.revVia==="manual"?"":"y"}" style="margin-bottom:8px">${d.revVia==="auto"?"Revisión automática por palabras clave: confirma cada ítem en el documento.":d.revVia==="ia"?"Revisado por la IA: confirma cada ítem en el documento.":"Revisión manual."} ${hechos} de ${rv.length} ítems revisados. Referencia: ${esc(G.ref||"NSR-10")}.</div>
      <div class="revlist">${rv.map((it,i)=>`<div class="revitem ${it.est?"r-"+it.est:""}"><div class="rt"><span class="nn">${i+1}</span><div><b>${esc(it.t)}</b>${G.items[i]?`<span class="sub">Debe incluir: ${esc(G.items[i])}</span>`:""}</div></div>
        ${edR?`<div class="rf"><select data-rev="${d.id}" data-i="${i}" aria-label="Resultado del ítem">${EST.map(([v,l])=>`<option value="${v}" ${(it.est||"")===v?"selected":""}>${l}</option>`).join("")}</select><input type="text" data-revpag="${d.id}" data-i="${i}" value="${esc(it.pag||"")}" placeholder="Pág." aria-label="Página"><input type="text" class="obs" data-revobs="${d.id}" data-i="${i}" value="${esc(it.obs||"")}" placeholder="Observación (qué falta o qué está mal)"></div>`
          :`<div class="rf"><span class="chip ${it.est==="ok"?"c-good":it.est==="inc"?"c-warn":it.est==="aus"?"c-crit":""}">${(EST.find(x=>x[0]===(it.est||""))||EST[0])[1]}</span>${it.pag?` <span class="tag">pág. ${esc(it.pag)}</span>`:""}${it.obs?`<span class="o">${esc(it.obs)}</span>`:""}</div>`}</div>`).join("")}</div>`
    :`<div class="note y">${d._scan||!d._text?"El archivo es escaneado o no tiene texto, así que la revisión se hace a mano.":"Aún no se ha revisado el contenido."} La lista trae los ${REV[d.tipo].items.length} ítems mínimos recomendados (${esc(G.ref||"NSR-10")}) y qué debe incluir cada uno.
      ${edR?`<div class="actions" style="margin-top:8px"><button class="btn small primary" data-act="revManual" data-id="${d.id}">Hacer la revisión manual</button></div>`:""}</div>`}</section>`;})():""}
  ${d._text?`<details class="raw"><summary>Ver el texto leído del archivo</summary><pre>${esc(d._text.slice(0,6000))}${d._text.length>6000?"\n…":""}</pre></details>`:""}`,
  foot:`${delBtn("doc",d)}<button class="btn" data-act="pdfDoc" data-id="${d.id}">${IC.pdf} PDF</button>${ed?`<button class="btn" data-act="saveDoc" data-id="${d.id}">Guardar</button>`:""}${flujoBtns(d,"doc")}`};
}
function pdfDocHTML(d){
  return hdrHTML("Ficha de documento",DOC_TIPOS[d.tipo])+`<h2>Documento</h2><table><colgroup><col style="width:26%"><col></colgroup><tbody><tr><th>Nombre</th><td style="white-space:normal">${esc(d.nombre)}</td></tr><tr><th>Tipo</th><td>${esc(DOC_TIPOS[d.tipo])}</td></tr><tr><th>Versión</th><td>${esc(d.version)}</td></tr><tr><th>Fecha</th><td>${fd(d.fecha)}</td></tr>${d.vence?`<tr><th>Vence</th><td>${fd(d.vence)}</td></tr>`:""}<tr><th>Estado</th><td>${FLUJO[d.flujo||"borrador"][0]}</td></tr><tr><th>Archivo adjunto</th><td>${d.archivo?esc(d.archivo.nombre):"Sin archivo"}</td></tr></tbody></table>
  <h2>Información principal</h2><table class="wrap"><colgroup><col style="width:26%"><col></colgroup><tbody>${Object.entries(d.datos||{}).filter(([k,v])=>v).map(([k,v])=>`<tr><th>${esc(k)}</th><td>${esc(v)}</td></tr>`).join("")||"<tr><td>Sin datos</td></tr>"}</tbody></table>
  ${(d.rev||[]).length?`<h2>Revisión de contenido mínimo · ${REV[d.tipo].label}</h2><table class="wrap"><colgroup><col style="width:40%"><col style="width:14%"><col style="width:8%"><col></colgroup><thead><tr><th>Ítem</th><th>Resultado</th><th>Pág.</th><th>Observación</th></tr></thead><tbody>${d.rev.map(it=>`<tr><td>${esc(it.t)}</td><td class="${it.est==="ok"?"st-ok":it.est?"st-nc":""}">${it.est==="ok"?"Encontrado":it.est==="inc"?"Incompleto":it.est==="aus"?"Ausente":"Sin revisar"}</td><td>${esc(it.pag||"")}</td><td>${esc(it.obs||"")}</td></tr>`).join("")}</tbody></table>`:""}${firmasHTML()}`;
}
function sheetCert(c){const ed=canEdit()&&c.flujo!=="aprobado";const dis=ed?"":"disabled";
  return{title:`${c.id} · ${c.material||"Certificado"}`,sub:`${esc(c.proveedor)} · ${fd(c.fecha)}`,
  body:`${viaNote(c)}<div>${flujoChip(c.flujo)}</div>${archivoHTML(c,"cert",canEdit())}
  <section class="form"><label class="full">Material<input type="text" id="cMat" value="${esc(c.material)}" ${dis}></label><label>Proveedor<input type="text" id="cProv" value="${esc(c.proveedor)}" ${dis}></label><label>Lote o colada<input type="text" id="cLote" value="${esc(c.lote)}" ${dis}></label><label>Norma<input type="text" id="cNorma" value="${esc(c.norma)}" ${dis}></label><label>Cantidad<input type="text" id="cCant" value="${esc(c.cantidad)}" ${dis}></label><label>Fecha<input type="date" id="cFecha" value="${esc(c.fecha)}" ${dis}></label><label>Resultado<select id="cRes" ${dis}>${["","Cumple","No cumple"].map(v=>`<option ${v===c.resultado?"selected":""} value="${v}">${v||"Sin dato"}</option>`).join("")}</select></label></section>
  ${c._text?`<details class="raw"><summary>Ver el texto leído del archivo</summary><pre>${esc(c._text.slice(0,5000))}</pre></details>`:""}`,
  foot:`${delBtn("cert",c)}<button class="btn" data-act="pdfCert" data-id="${c.id}">${IC.pdf} PDF</button>${ed?`<button class="btn" data-act="saveCert" data-id="${c.id}">Guardar</button>`:""}${flujoBtns(c,"cert")}`};}
/* ============================================================
   Inspecciones
   ============================================================ */
const MESES_L=["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"];
const mesTxt=m=>{const[y,n]=m.split("-");const t=MESES_L[+n-1]+" "+y;return t[0].toUpperCase()+t.slice(1);};
function inspFiltradas(){const f=U.fi;const q=(f.q||"").trim().toLowerCase();
  return P().inspecciones.map(i=>({i,s:inspStats(i)})).filter(({i,s})=>(!f.mes||i.fecha.slice(0,7)===f.mes)&&(!f.torre||i.torre===f.torre)&&(!f.estado||s.estado===f.estado)&&(!q||(elLabel(i)+" "+i.ident+" "+i.id+" "+i.nivel).toLowerCase().includes(q))).sort((a,b)=>b.i.fecha.localeCompare(a.i.fecha)||b.i.id.localeCompare(a.i.id));}
function inspTablaHTML(l){const g=new Map();l.forEach(x=>{const m=x.i.fecha.slice(0,7);if(!g.has(m))g.set(m,[]);g.get(m).push(x);});
  return `<div class="tablewrap"><table class="insptable"><thead><tr><th>No.</th><th>Fecha</th><th>Elemento</th><th>Torre · nivel</th><th>Identificación</th>${FASES.map(([k,l])=>`<th class="c">${l.replace(" del vaciado","")}</th>`).join("")}<th>Estado</th><th class="c">Fotos</th></tr></thead><tbody>
  ${[...g.entries()].map(([m,rows])=>`<tr class="grp"><td colspan="${7+FASES.length}"><b>${mesTxt(m)}</b> · ${rows.length} inspección(es) · ${rows.filter(x=>x.s.estado==="conforme").length} conforme(s)</td></tr>
    ${rows.map(({i,s})=>`<tr class="click" data-act="goto" data-v="inspeccion" data-id="${i.id}"><td class="n">${i.id}</td><td class="n">${fd(i.fecha)}</td><td><b>${esc(CHK[i.tipo]?.label||i.tipo)}</b></td><td>${esc(i.torre)}<span class="sub">${esc(i.nivel)}</span></td><td>${esc(i.ident)}${s.nc?`<span class="sub lo">${s.nc} ítem(s) por corregir</span>`:s.fix?`<span class="sub">${s.fix} corregido(s)</span>`:""}</td>${FASES.map(([k])=>`<td class="c">${faseCell(s.fases[k])}</td>`).join("")}<td>${inspChip(s.estado)}</td><td class="c n">${(i.fotos||[]).length||"—"}</td></tr>`).join("")}`).join("")}</tbody></table></div>`;}
function vInspecciones(){
  const p=P();const l=inspFiltradas();const f=U.fi;const meses=[...new Set(p.inspecciones.map(i=>i.fecha.slice(0,7)))].sort().reverse();
  return `<div class="phead"><div><div class="eyebrow">Proceso constructivo</div><h1>Inspecciones</h1><p>Revisión de cada elemento antes, durante y después del vaciado, con fotos. Cada fase se declara conforme por separado; el elemento queda conforme cuando las tres lo están.</p></div>
  <div class="actions"><button class="btn" data-act="pdfInspList" ${l.length?"":"disabled"}>${IC.pdf} Exportar PDF</button>${canEdit()?`<button class="btn primary" data-act="newInsp">${IC.chk} Nueva inspección</button>`:""}</div></div>
  <div class="filters"><label>Mes<select data-fi="mes"><option value="">Todos los meses</option>${meses.map(m=>`<option value="${m}" ${m===f.mes?"selected":""}>${mesTxt(m)}</option>`).join("")}</select></label>
  <label>Torre o bloque<select data-fi="torre"><option value="">Todas</option>${(p.torres||[]).map(t=>`<option ${t===f.torre?"selected":""}>${esc(t)}</option>`).join("")}</select></label>
  <label>Estado<select data-fi="estado"><option value="">Todos</option>${Object.entries(INSP).map(([k,v])=>`<option value="${k}" ${k===f.estado?"selected":""}>${v[0]}</option>`).join("")}</select></label>
  <label style="flex:1;min-width:160px">Buscar<input type="text" data-fi="q" value="${esc(f.q||"")}" placeholder="Columnas, piso 3…" style="width:100%"></label>
  ${f.mes||f.torre||f.estado||f.q?'<button class="btn small" data-act="clearFi">Limpiar</button>':""}<span class="muted" style="font-size:12.5px">${l.length} de ${p.inspecciones.length}</span></div>
  ${l.length?inspTablaHTML(l):'<div class="empty">No hay inspecciones con esos filtros.</div>'}`;
}
function pdfInspListHTML(l){const f=U.fi;const g=new Map();l.slice().reverse().forEach(x=>{const m=x.i.fecha.slice(0,7);if(!g.has(m))g.set(m,[]);g.get(m).push(x);});
  const fc=fz=>fz.conf?"Conforme "+fd(fz.conf):fz.nc?"Corregir":fz.done?fz.done+"/"+fz.total:"—";
  return hdrHTML("Control de inspecciones",f.mes?mesTxt(f.mes):"Todas las inspecciones")+[...g.entries()].map(([m,rows])=>`<h2>${mesTxt(m)} · ${rows.length} inspección(es)</h2><table><colgroup><col style="width:8%"><col style="width:11%"><col style="width:15%"><col style="width:14%"><col><col style="width:10%"><col style="width:10%"><col style="width:10%"></colgroup><thead><tr><th>No.</th><th>Fecha</th><th>Elemento</th><th>Torre · nivel</th><th>Identificación</th><th>Antes</th><th>Durante</th><th>Después</th></tr></thead><tbody>${rows.map(({i,s})=>`<tr><td>${i.id}</td><td>${fd(i.fecha)}</td><td>${esc(CHK[i.tipo]?.label||i.tipo)}</td><td>${esc(i.torre)} · ${esc(i.nivel)}</td><td>${esc(i.ident)}${s.nc?` · ${s.nc} por corregir`:""}</td>${FASES.map(([k])=>`<td class="${s.fases[k].conf?"st-ok":s.fases[k].nc?"st-nc":""}">${fc(s.fases[k])}</td>`).join("")}</tr>`).join("")}</tbody></table>`).join("")+firmasHTML();}
function vInspeccion(){
  const i=P().inspecciones.find(x=>x.id===U.sel);if(!i)return vInspecciones();
  const s=inspStats(i);const items=chkItems(i.tipo);const r=i.resp||(i.resp={});const ed=canEdit();
  const f=U.tabInsp;const cnt=k=>{const l=items.filter(it=>it.fase===k);return `${l.filter(it=>r[it.id]&&r[it.id].e).length}/${l.length}`;};
  const ncOpen=k=>items.filter(it=>it.fase===k&&r[it.id]&&r[it.id].e==="NC"&&!r[it.id].fix).length;
  return `<div class="phead"><div><button class="link" data-act="nav" data-v="inspecciones">← Inspecciones</button><div class="eyebrow" style="margin-top:8px">${esc(i.torre)} · ${esc(i.nivel)} · ${fd(i.fecha)} · ${i.id}</div><h1>${esc(CHK[i.tipo]?.label||i.tipo)}</h1><p>${esc(i.ident)} · ${inspChip(s.estado)}</p></div>
  <div class="actions">${delBtn("insp",i)}<button class="btn" data-act="pdfInsp" data-id="${i.id}">${IC.pdf} Exportar PDF</button></div></div>
  ${s.estado==="conforme"?`<div class="note ok">Elemento conforme en las tres fases (${FASES.map(([k,l])=>`${l.toLowerCase()}: ${fd(s.fases[k].conf)}`).join(" · ")}).</div>`:s.nc?`<div class="note bad">El elemento requiere corrección: ${s.nc} ítem(s) no cumplen. Cuando el constructor corrija, verifica en obra y márcalos como corregidos.</div>`:""}
  <div class="fasesbar">${FASES.map(([k,l])=>{const fz=s.fases[k];return `<div class="fase ${fz.conf?"ok":fz.nc?"bad":""}"><span class="eyebrow">${l}</span><b>${fz.conf?"Conforme":fz.nc?"Requiere corrección":fz.done===fz.total?"Lista para declarar":"En revisión"}</b><span class="sub">${fz.conf?fd(fz.conf):`${fz.done}/${fz.total} ítems`}</span></div>`;}).join("")}</div>
  <section class="panel"><header><h2>Fotos del elemento</h2><span class="muted">${(i.fotos||[]).length}</span></header>${photosHTML(i.fotos,"insp:"+i.id,ed,ed)}</section>
  <nav class="tabs" role="tablist">${FASES.map(([k,l])=>`<button class="tab" role="tab" data-act="tabInsp" data-v="${k}" aria-selected="${f===k}">${l}${s.fases[k].conf?'<span class="cnt ok">✓</span>':`<span class="cnt ${ncOpen(k)?"bad":""}">${cnt(k)}</span>`}</button>`).join("")}</nav>
  ${(()=>{const fz=s.fases[f];const lbl=FASES.find(x=>x[0]===f)[1];
    if(fz.conf)return `<div class="note ok fasenote"><span>${lbl}: conforme el ${fd(fz.conf)}.</span>${ed&&canApprove()?`<button class="btn small" data-act="reabrirFase" data-id="${i.id}" data-v="${f}">Reabrir esta fase</button>`:""}</div>`;
    if(!ed)return "";
    return `<div class="note ${fz.listo?"ok":"y"} fasenote"><span>${fz.listo?`Todos los ítems de «${lbl.toLowerCase()}» cumplen o están corregidos.`:fz.nc?`Hay ${fz.nc} ítem(s) por corregir en esta fase.`:`Faltan ${fz.total-fz.done} ítem(s) por revisar en esta fase.`}</span><button class="btn small primary" data-act="confFase" data-id="${i.id}" data-v="${f}" ${fz.listo?"":"disabled"}>Declarar conforme · ${esc(lbl.toLowerCase())}</button></div>`;})()}
  <div class="items">${items.filter(it=>it.fase===f).map(it=>{const a=r[it.id]||{};const open=U.openItem[it.id]||(a.e==="NC"&&!a.fix);const cls=a.e==="NC"&&a.fix?"FX":a.e||"";const nc=P().nc.find(n=>n.insp===i.id&&n.item===it.id);
    return `<article class="item ${cls}"><span class="nn">${it.n}</span><div>${esc(it.t)}${a.obs&&!open?`<span class="sub">${esc(a.obs)}</span>`:""}${a.e==="NC"&&a.fix?`<span class="sub">Corregido y verificado el ${fd(a.fix)}</span>`:""}</div>
    <div class="ans" role="group" aria-label="Resultado del ítem ${it.n}">${["C","NC","NA"].map(v=>`<button class="b${v}" data-act="ans" data-id="${it.id}" data-v="${v}" aria-pressed="${a.e===v}" ${ed?"":"disabled"}>${v==="C"?"Cumple":v==="NC"?"No cumple":"N.A."}</button>`).join("")}<button data-act="toggleItem" data-id="${it.id}" aria-label="Observación">${open?"−":"+"}</button></div>
    ${open?`<div class="more"><textarea data-obs="${it.id}" placeholder="${a.e==="NC"?"Nota corta: qué falta y dónde (ej. C4 estribos a 15 cm, plano pide 10)":"Observación (opcional)"}" ${ed?"":"disabled"}>${esc(a.obs||"")}</textarea>
      ${ed?`<div class="row"><button class="btn small ai" data-act="aiObs" data-id="${it.id}">${IC.spark} Redactar con IA</button>${U.busy==="obs-"+it.id?'<span class="busy" style="padding:4px 10px"><span class="spin"></span>Redactando…</span>':""}
      ${a.e==="NC"?`<label class="chip ${a.fix?"c-y":""}" style="cursor:pointer"><input type="checkbox" data-fix="${it.id}" ${a.fix?"checked":""}> Corregido y verificado</label>`:""}
      ${a.e==="NC"?(nc?`<button class="btn small" data-act="goto" data-v="nc" data-id="${nc.id}">Ver ${nc.id}</button>`:`<button class="btn small" data-act="ncFromItem" data-id="${it.id}">${IC.nc} Crear no conformidad</button>`):""}</div>`:""}</div>`:""}</article>`;}).join("")}</div>
  ${ed?`<label class="panel" style="gap:6px"><b>Observaciones generales</b><textarea id="inspObs" placeholder="Observaciones de la revisión del elemento">${esc(i.obs||"")}</textarea></label>`:i.obs?`<div class="panel"><b>Observaciones generales</b><p style="margin:0">${esc(i.obs)}</p></div>`:""}`;
}
function pdfInspHTML(i){
  const s=inspStats(i);const items=chkItems(i.tipo);const r=i.resp||{};
  return hdrHTML("Registro de inspección",`${i.id} · ${fd(i.fecha)}`)+`<h2>Elemento</h2><table><tbody><tr><th>Elemento</th><td>${esc(CHK[i.tipo]?.label)}</td><th>Fecha</th><td>${fd(i.fecha)}</td></tr><tr><th>Torre / nivel</th><td>${esc(i.torre)} · ${esc(i.nivel)}</td><th>Estado</th><td class="${s.estado==="conforme"?"st-ok":s.estado==="correccion"?"st-nc":""}">${INSP[s.estado][0]}${s.estado==="conforme"&&i.conforme?" · "+fd(i.conforme):""}</td></tr><tr><th>Identificación</th><td colspan="3" style="white-space:normal">${esc(i.ident)}</td></tr></tbody></table>
  ${FASES.map(([k,l])=>{const its=items.filter(it=>it.fase===k);const fz=s.fases[k];return `<h2>${l} · ${fz.conf?"conforme el "+fd(fz.conf):fz.nc?"requiere corrección":"en revisión"}</h2><table class="wrap"><thead><tr><th style="width:5%">No.</th><th>Ítem</th><th style="width:13%">Resultado</th><th style="width:36%">Observación</th></tr></thead><tbody>${its.map(it=>{const a=r[it.id]||{};return `<tr><td>${it.n}</td><td>${esc(it.t)}</td><td class="${a.e==="C"||a.fix?"st-ok":a.e==="NC"?"st-nc":""}">${a.e==="C"?"Cumple":a.e==="NC"?(a.fix?"Corregido":"No cumple"):a.e==="NA"?"N.A.":"—"}</td><td>${esc(a.obs||"")}${a.fix?` (verificado ${fd(a.fix)})`:""}</td></tr>`;}).join("")}</tbody></table>`;}).join("")}
  ${i.obs?`<h2>Observaciones generales</h2><p>${esc(i.obs)}</p>`:""}
  ${(i.fotos||[]).length?`<h2>Registro fotográfico</h2>${photosPDF(i.fotos,"Foto")}`:""}${firmasHTML()}`;
}
/* ============================================================
   No conformidades
   ============================================================ */
function vNC(){
  const p=P();const f=U.fn;const q=f.q.trim().toLowerCase();
  const all=p.nc.filter(visible);
  const l=all.filter(n=>(!f.estado||(f.estado==="vencida"?ncVencida(n):n.estado===f.estado))&&(!q||(n.id+" "+n.titulo+" "+n.ubic).toLowerCase().includes(q))).sort((a,b)=>(a.estado==="cerrada")-(b.estado==="cerrada")||b.fecha.localeCompare(a.fecha));
  return `<div class="phead"><div><div class="eyebrow">Control de calidad</div><h1>No conformidades</h1><p>${isCons()?"La supervisión emite la no conformidad; usted responde cómo la va a reparar o subsanar y adjunta fotos. La supervisión verifica en obra y la levanta.":"La supervisión emite la no conformidad. El constructor responde con la reparación y fotos, y la supervisión verifica en obra para levantarla o rechazar la respuesta."}</p></div>${canEdit()?`<div class="actions"><button class="btn primary" data-act="newNC">${IC.nc} Nueva no conformidad</button></div>`:""}</div>
  <div class="filters"><label>Estado<select data-fn="estado"><option value="">Todas (${all.length})</option>${Object.entries(NCE).map(([k,v])=>`<option value="${k}" ${k===f.estado?"selected":""}>${v[0]} (${all.filter(n=>n.estado===k).length})</option>`).join("")}<option value="vencida" ${f.estado==="vencida"?"selected":""}>Vencidas (${all.filter(ncVencida).length})</option></select></label><label style="flex:1;min-width:160px">Buscar<input type="text" data-fn="q" value="${esc(f.q)}" placeholder="Estribos, M-008…" style="width:100%"></label></div>
  ${l.length?`<div class="tablewrap"><table><thead><tr><th>No.</th><th>No conformidad</th><th>Ubicación</th><th>Límite</th><th>Estado</th>${isCons()?"":"<th>Registro</th>"}</tr></thead><tbody>
  ${l.map(n=>`<tr class="click" data-act="openNC" data-id="${n.id}"><td class="n">${n.id}<span class="sub">${fd(n.fecha)}</span></td><td><b>${esc(n.titulo)}</b><span class="sub">${esc(n.numeral)}${n.origen?" · "+esc(n.origen):""}</span></td><td>${esc(n.ubic)}<span class="sub">${esc(n.torre||"")}</span></td><td class="n ${ncVencida(n)?"lo":""}">${fd(n.limite)}</td><td>${ncChip(n)}</td>${isCons()?"":`<td>${flujoChip(n.flujo,"Emitida")}</td>`}</tr>`).join("")}</tbody></table></div>`:'<div class="empty">Sin no conformidades.</div>'}`;
}
function sheetNC(n){
  const p=P();const draft=!n.id;const edSup=canEdit()&&n.flujo!=="aprobado";const dis=edSup?"":"disabled";
  const pend=(n.resp||[]).find(x=>!x.veredicto);
  const canResp=isCons()&&n.flujo==="aprobado"&&n.estado==="abierta";
  const rd=U.respDraft[n.id]||(U.respDraft[n.id]={correctiva:"",preventiva:"",fotos:[]});
  return{title:draft?"Nueva no conformidad":`${n.id} · ${n.titulo||"No conformidad"}`,sub:`${esc(n.ubic||"")}${n.torre?", "+esc(n.torre):""}`,
  body:`<div class="actions">${ncChip(n)} ${isCons()?"":flujoChip(n.flujo,"Emitida al constructor")}</div>${n._ai||""}
  ${edSup?`<section class="panel" style="background:var(--surface-2)"><h3>Describe lo que viste</h3><textarea id="ncNota" placeholder="Nota corta, como la dirías en obra. Ej.: C4 y C9 piso 3 estribos a 15 en zona confinada, plano dice 10">${esc(n.nota||"")}</textarea>
   <div class="actions"><button class="btn ai" data-act="aiNC">${IC.spark} Redactar con IA</button>${U.busy==="nc"?'<span class="busy" style="padding:5px 10px"><span class="spin"></span>Redactando…</span>':""}</div></section>`:""}
  <section class="form">
    <label>Origen<input type="text" id="ncOrig" value="${esc(n.origen||"")}" ${dis} placeholder="Inspección, ensayo, recorrido…"></label>
    <label>Torre o bloque<select id="ncTorre" ${dis}>${(p.torres||[]).map(t=>`<option ${t===n.torre?"selected":""}>${esc(t)}</option>`).join("")}</select></label>
    <label class="full">Ubicación<input type="text" id="ncUb" value="${esc(n.ubic)}" ${dis} placeholder="Columnas C4 y C9, piso 3"></label>
    <label class="full">Título<input type="text" id="ncTit" value="${esc(n.titulo)}" ${dis}></label>
    <label class="full">Descripción<textarea id="ncDesc" ${dis}>${esc(n.descripcion)}</textarea></label>
    <label>Norma o especificación incumplida<input type="text" id="ncNum" value="${esc(n.numeral)}" ${dis}></label>
    <label>Fecha límite de respuesta<input type="date" id="ncLim" value="${esc(n.limite)}" ${dis}></label>
    <label class="full">Acción requerida al constructor<textarea id="ncReq" ${dis}>${esc(n.requerida)}</textarea></label>
  </section>
  <section><h3 style="margin-bottom:8px">Fotos de la supervisión</h3>${photosHTML(n.fotos,"nc:"+(n.id||"draft"),edSup,edSup)}</section>
  ${(n.resp||[]).length||canResp?`<section class="thread"><h3>Respuesta del constructor</h3>
    ${(n.resp||[]).map(x=>`<div class="msg"><div class="who"><b>${esc(x.autor)}</b><span>${fd(x.fecha)}</span></div><div><b>Reparación o subsanación:</b> ${esc(x.correctiva)}</div>${x.preventiva?`<div><b>Para que no se repita:</b> ${esc(x.preventiva)}</div>`:""}${(x.fotos||[]).length?photosHTML(x.fotos,"x",false,false):""}
      ${x.veredicto?`<div class="note ${x.veredicto==="aceptada"?"ok":"bad"}">${x.veredicto==="aceptada"?"Verificada y aceptada por la supervisión":"Rechazada por la supervisión"} el ${fd(x.fechaV)}${x.obs?`: ${esc(x.obs)}`:"."}</div>`:'<div class="note y">Pendiente de verificación de la supervisión.</div>'}</div>`).join("")}
    ${canResp?`<div class="panel hl"><h3>Responder esta no conformidad</h3><label class="fl">¿Cómo la va a reparar o subsanar?<textarea id="rCorr" placeholder="Describa la reparación o la corrección hecha">${esc(rd.correctiva)}</textarea></label><label class="fl">¿Qué hará para que no se repita? (opcional)<textarea id="rPrev">${esc(rd.preventiva)}</textarea></label>
      <div class="fl">Fotos de la corrección${photosHTML(rd.fotos,"resp:"+n.id,true,true)}</div><div class="actions" style="justify-content:flex-end"><button class="btn primary" data-act="sendResp" data-id="${n.id}">Enviar respuesta a la supervisión</button></div></div>`:""}
    ${pend&&canEdit()?`<div class="panel hl"><h3>Verificar la respuesta</h3><textarea id="vObs" placeholder="Observación de la verificación en obra (obligatoria si se rechaza)"></textarea><div class="actions" style="justify-content:flex-end"><button class="btn danger" data-act="veredicto" data-id="${n.id}" data-v="rechazada">Rechazar respuesta</button><button class="btn ok" data-act="veredicto" data-id="${n.id}" data-v="aceptada">Aceptar y levantar la NC</button></div></div>`:""}
  </section>`:""}
  ${n.estado==="cerrada"?`<div class="note ok">No conformidad levantada el ${fd(n.cierre)}.</div>`:""}`,
  foot:draft?`<button class="btn primary" data-act="saveNC">Guardar borrador</button>`:`${delBtn("nc",n)}<button class="btn" data-act="pdfNC" data-id="${n.id}">${IC.pdf} PDF</button>${edSup?`<button class="btn" data-act="saveNC">Guardar</button>`:""}${n.estado!=="cerrada"?flujoBtns(n,"nc","Emitir al constructor"):""}`};
}
function pdfNCHTML(n){
  return hdrHTML("No conformidad",`${n.id} · ${fd(n.fecha)}`)+`<h2>Datos</h2><table><tbody><tr><th>Número</th><td>${n.id}</td><th>Fecha</th><td>${fd(n.fecha)}</td></tr><tr><th>Origen</th><td>${esc(n.origen||"")}</td><th>Estado</th><td class="${n.estado==="cerrada"?"st-ok":"st-nc"}">${NCE[n.estado][0]}${n.cierre?" · "+fd(n.cierre):""}</td></tr><tr><th>Ubicación</th><td style="white-space:normal">${esc(n.ubic)}, ${esc(n.torre||"")}</td><th>Fecha límite</th><td>${fd(n.limite)}</td></tr><tr><th>Norma</th><td colspan="3">${esc(n.numeral)}</td></tr></tbody></table>
  <h2>${esc(n.titulo)}</h2><p>${esc(n.descripcion)}</p><p><b>Acción requerida al constructor:</b> ${esc(n.requerida)}</p>${photosPDF(n.fotos,"Supervisión")}
  ${(n.resp||[]).length?`<h2>Respuesta del constructor</h2>${n.resp.map(x=>`<p><b>${esc(x.autor)} · ${fd(x.fecha)}</b></p><p><b>Reparación o subsanación:</b> ${esc(x.correctiva)}</p>${x.preventiva?`<p><b>Para que no se repita:</b> ${esc(x.preventiva)}</p>`:""}${photosPDF(x.fotos,"Corrección")}${x.veredicto?`<p class="${x.veredicto==="aceptada"?"st-ok":"st-nc"}">${x.veredicto==="aceptada"?"Verificada y aceptada":"Rechazada"} por la supervisión el ${fd(x.fechaV)}${x.obs?": "+esc(x.obs):""}</p>`:"<p>Pendiente de verificación.</p>"}`).join("")}`:""}
  ${firmasHTML(`<div><b>${esc((miembrosRol(P(),"constructor")[0]||{}).nombre||P().directorObra||"")}</b><br>Director de obra · ${esc(P().constructora)}</div>`)}`;
}

/* ============================================================
   Registro fotográfico: todas las fotos del proyecto con su fecha
   ============================================================ */
function allPhotos(p){const out=[];const add=(id,fecha,origen,cap,torre,extra)=>{if(PH.has(id))out.push(Object.assign({id,fecha,origen,cap:(p.fotoDesc||{})[id]||cap,torre:torre||""},extra||{}));};
  p.inspecciones.forEach(i=>(i.fotos||[]).forEach(id=>add(id,i.fecha,"Inspección",`${CHK[i.tipo]?.label||i.tipo} · ${i.nivel}, ${i.torre}`,i.torre)));
  p.nc.filter(visible).forEach(n=>{(n.fotos||[]).forEach(id=>add(id,n.fecha,"No conformidad",`${n.id} · ${n.ubic||n.titulo}`,n.torre));(n.resp||[]).forEach(x=>(x.fotos||[]).forEach(id=>add(id,x.fecha,"No conformidad",`${n.id} · corrección del constructor`,n.torre)));});
  (p.fotos||[]).forEach(f=>add(f.id,f.fecha,"Registro",f.desc||"Foto de obra",f.torre,{suelta:true}));
  const seen=new Set();return out.filter(f=>!seen.has(f.id)&&seen.add(f.id)).sort((a,b)=>(a.fecha||"").localeCompare(b.fecha||""));}
function selPhotosHTML(list,sel,ctx,ed){
  if(!list.length)return'<div class="empty">No hay fotos en este rango de fechas.</div>';
  return `<div class="selph">${list.map(f=>{const on=sel.includes(f.id);return `<figure class="${on?"on":""}"><span class="ck" data-act="togPh" data-ctx="${ctx}" data-id="${f.id}" role="checkbox" aria-checked="${on}" tabindex="0">${on?"✓":""}</span><img src="${PH.get(f.id)}" alt="${esc(f.cap)}" data-act="zoom" data-id="${f.id}"><figcaption><span class="muted">${fd(f.fecha)} · ${esc(f.origen)}</span>${ed?`<input type="text" data-phcap="${f.id}" value="${esc(f.cap)}" aria-label="Descripción de la foto">`:`<span>${esc(f.cap)}</span>`}${ed&&f.suelta?`<button class="link" style="font-size:11.5px" data-act="delSuelta" data-id="${f.id}">Quitar del registro</button>`:""}</figcaption></figure>`;}).join("")}</div>`;}
function grid2PDF(fs){return fs.length?`<div class="pgrid2">${fs.map(f=>`<figure><img src="${PH.get(f.id)}"><figcaption><b>${fd(f.fecha)}</b> · ${esc(f.cap)}</figcaption></figure>`).join("")}</div>`:"";}
function vFotos(){
  const p=P();const f=U.ff;if(!f.desde){f.desde=TODAY.slice(0,8)+"01";f.hasta=TODAY;}
  const all=allPhotos(p);const l=all.filter(x=>(!f.desde||x.fecha>=f.desde)&&(!f.hasta||x.fecha<=f.hasta)&&(!f.torre||x.torre===f.torre)&&(!f.origen||x.origen===f.origen));
  const sel=U.selFotos.filter(id=>l.some(x=>x.id===id));const ed=canEdit();
  return `<div class="phead"><div><div class="eyebrow">Registro fotográfico</div><h1>Registro fotográfico</h1><p>Todas las fotos del proyecto (inspecciones, no conformidades y fotos sueltas de obra) por fecha. Elige un rango, selecciona las fotos y exporta el resumen en PDF.</p></div>
  <div class="actions">${ed?`<label class="btn">${IC.cam} Subir fotos de obra<input type="file" accept="image/*" multiple hidden data-photo="reg"></label>`:""}<button class="btn primary" data-act="pdfFotos">${IC.pdf} Exportar resumen (${sel.length||l.length})</button></div></div>
  <div class="filters"><label>Desde<input type="date" data-ff="desde" value="${f.desde}"></label><label>Hasta<input type="date" data-ff="hasta" value="${f.hasta}"></label>
  <label>Torre o bloque<select data-ff="torre"><option value="">Todas</option>${(p.torres||[]).map(t=>`<option ${t===f.torre?"selected":""}>${esc(t)}</option>`).join("")}</select></label>
  <label>Origen<select data-ff="origen"><option value="">Todos</option>${["Inspección","No conformidad","Registro"].map(o=>`<option ${o===f.origen?"selected":""}>${o}</option>`).join("")}</select></label>
  <span class="muted" style="font-size:12.5px">${l.length} foto(s) · ${sel.length} seleccionada(s)</span>${l.length?`<button class="btn small" data-act="selAllPh">${sel.length===l.length?"Quitar selección":"Seleccionar todas"}</button>`:""}</div>
  ${ed?`<label class="panel" style="gap:6px"><b>Resumen del periodo (opcional, sale al inicio del PDF)</b><textarea id="regTxt" placeholder="Ej.: Durante la quincena se avanzó en la placa del piso 4 de la Torre A y en los muros del piso 4 de la Torre B…">${esc(p.regTxt||"")}</textarea></label>`:""}
  ${selPhotosHTML(l,sel,"reg",ed)}`;
}

/* ============================================================
   Informes
   ============================================================ */
const REPT={semanal:"Informe semanal de supervisión técnica",mensual:"Acta mensual de supervisión técnica",final:"Certificación técnica de ocupación"};
const REPS={semanal:"Informe semanal",mensual:"Acta mensual",final:"Certificación técnica"};
const REPP={semanal:"IS-",mensual:"AM-",final:"CTO-"};
const repNo=r=>`${REPS[r.tipo]} ${r.id}`;
function defRange(tipo){
  if(tipo==="semanal")return{desde:addD(TODAY,-6),hasta:TODAY};
  if(tipo==="mensual")return{desde:TODAY.slice(0,8)+"01",hasta:TODAY};
  return{desde:P().inicio||addD(TODAY,-365),hasta:TODAY};}
function avanceInicial(p,excluir){
  const prev=p.informes.filter(r=>r.id!==excluir&&(r.avance||[]).length).sort((a,b)=>(b.hasta||"").localeCompare(a.hasta||"")||b.id.localeCompare(a.id))[0];
  /* p.avance siempre guarda el último avance (se sincroniza con el informe más reciente) */
  const base=(p.avance||[]).length?p.avance:prev?prev.avance.map(a=>({act:a.act,pct:+a.pct||0})):[];
  return base.map(a=>({act:a.act,ant:+a.pct||0,pct:+a.pct||0}));}
function repData(rep){
  const p=P();const inR=s=>s&&s>=rep.desde&&s<=rep.hasta;const fin=rep.tipo==="final";
  const ins=p.inspecciones.filter(i=>fin||inR(i.fecha)).map(i=>({i,s:inspStats(i)})).sort((a,b)=>a.i.fecha.localeCompare(b.i.fecha));
  const E=resumenEns(p).rows;
  return{ins,ensAll:E,ens:E.filter(r=>r.base!=null&&r.fecha&&(fin||inR(addD(r.fecha,28)))),
    docs:p.documentos.filter(d=>d.flujo==="aprobado"&&(fin||inR(d.fecha))),
    ncN:p.nc.filter(n=>n.flujo==="aprobado"&&inR(n.fecha)),ncC:p.nc.filter(n=>n.flujo==="aprobado"&&inR(n.cierre)),
    ncA:p.nc.filter(n=>n.flujo==="aprobado"&&n.estado!=="cerrada"),
    certs:p.certificados.filter(c=>c.flujo==="aprobado"&&(fin||inR(c.fecha))),
    fotosCand:allPhotos(p).filter(f=>inR(f.fecha))};
}
function sugerirAspectos(rep){const R=repData(rep);const out=[];
  R.ins.forEach(({i})=>{const items=chkItems(i.tipo);Object.entries(i.resp||{}).forEach(([k,a])=>{if(a&&a.e==="NC"){const it=items.find(x=>x.id===k);out.push(`${CHK[i.tipo]?.label} ${i.nivel}, ${i.torre}: ${a.obs||it?.t||""}${a.fix?" (corregido)":""}`);}});});
  R.ncN.forEach(n=>out.push(`${n.id}: ${n.titulo}.`));
  return out.map(t=>"- "+t.replace(/\s+/g," ").trim()).join("\n");}
function defaultConcl(rep,R){
  const nc=R.ens.filter(r=>r.est==="nocumple").length;
  if(rep.tipo==="final")return `La supervisión técnica independiente verificó que la construcción de la cimentación y la estructura se ejecutó conforme a los planos, diseños y especificaciones aprobados en la licencia, con ${R.ens.length} ensayos de resistencia evaluados según la NSR-10. ${R.ncA.length?`Quedan ${R.ncA.length} no conformidad(es) abiertas que deben levantarse antes de expedir la certificación.`:"Todas las no conformidades se levantaron con verificación en obra."}`;
  const t=[`Entre el ${fd(rep.desde)} y el ${fd(rep.hasta)} se revisaron ${R.ins.length} elemento(s) y se evaluaron ${R.ens.length} ensayo(s) a 28 días${nc?`, de los cuales ${nc} no cumple(n) el límite individual de la NSR-10`:R.ens.length?", todos dentro del criterio de aceptación":""}.`];
  if(R.ncA.length)t.push(`Permanecen ${R.ncA.length} no conformidad(es) abiertas.`);
  return t.join(" ")+R.ncA.slice(0,3).map(n=>`\n- ${n.id}: ${n.requerida} Fecha límite: ${fd(n.limite)}.`).join("");
}
const txtP=t=>t&&t.trim()?`<p class="lead">${esc(t.trim())}</p>`:"";
const listP=t=>{const l=String(t||"").split("\n").map(s=>s.replace(/^\s*[-•*]\s*/,"").trim()).filter(Boolean);return l.length?`<ul>${l.map(s=>`<li>${esc(s)}</li>`).join("")}</ul>`:"<p>Sin aspectos a resaltar en el periodo.</p>";};
function tInsHTML(R){return R.ins.length?`<table><colgroup><col style="width:13%"><col style="width:22%"><col style="width:20%"><col><col style="width:16%"></colgroup><thead><tr><th>Fecha</th><th>Elemento</th><th>Torre / nivel</th><th>Identificación</th><th>Estado</th></tr></thead><tbody>${R.ins.map(x=>`<tr><td>${fd(x.i.fecha)}</td><td>${esc(CHK[x.i.tipo]?.label||x.i.tipo)}</td><td>${esc(x.i.torre)} · ${esc(x.i.nivel)}</td><td>${esc(x.i.ident)}${x.s.nc?` · ${x.s.nc} ítem(s) por corregir`:x.s.fix?` · ${x.s.fix} corregido(s)`:""}</td><td class="${x.s.estado==="conforme"?"st-ok":x.s.estado==="correccion"?"st-nc":""}">${INSP[x.s.estado][0]}</td></tr>`).join("")}</tbody></table>`:"<p>No se inspeccionaron elementos en el periodo.</p>";}
function tAvHTML(rep){const l=rep.avance||[];return l.length?`<table><colgroup><col><col style="width:16%"><col style="width:16%"><col style="width:14%"></colgroup><thead><tr><th>Actividad</th><th>% anterior</th><th>% actual</th><th>Variación</th></tr></thead><tbody>${l.map(a=>{const d=(+a.pct||0)-(+a.ant||0);return`<tr><td>${esc(a.act)}</td><td>${+a.ant||0} %</td><td><b>${+a.pct||0} %</b></td><td>${d>0?"+"+d+" %":d<0?d+" %":"—"}</td></tr>`;}).join("")}</tbody></table>`:"<p>Sin actividades registradas.</p>";}
function tDocsHTML(R){const rows=[...R.docs.map(d=>["Documento recibido",`${d.nombre} v${d.version}`,d.fecha]),...R.certs.map(c=>["Certificado recibido",`${c.id} · ${c.material} · ${c.proveedor}`,c.fecha]),...R.ncN.map(n=>["No conformidad generada",`${n.id} · ${n.titulo}`,n.fecha]),...R.ncC.map(n=>["No conformidad levantada",`${n.id} · ${n.titulo}`,n.cierre])].sort((a,b)=>(a[2]||"").localeCompare(b[2]||""));
  return rows.length?`<table><colgroup><col style="width:24%"><col><col style="width:14%"></colgroup><thead><tr><th>Tipo</th><th>Descripción</th><th>Fecha</th></tr></thead><tbody>${rows.map(r=>`<tr><td>${r[0]}</td><td>${esc(r[1])}</td><td>${fd(r[2])}</td></tr>`).join("")}</tbody></table>`:"<p>Sin cambios en la documentación ni no conformidades nuevas en el periodo.</p>";}
function tCertHTML(R){return R.certs.length?`<table><colgroup><col style="width:9%"><col><col style="width:22%"><col style="width:13%"><col style="width:13%"><col style="width:11%"></colgroup><thead><tr><th>No.</th><th>Material</th><th>Proveedor · lote</th><th>Norma</th><th>Fecha</th><th>Resultado</th></tr></thead><tbody>${R.certs.map(c=>`<tr><td>${c.id}</td><td>${esc(c.material)}${c.cantidad?` · ${esc(c.cantidad)}`:""}</td><td>${esc(c.proveedor)} · ${esc(c.lote)}</td><td>${esc(c.norma)}</td><td>${fd(c.fecha)}</td><td class="${c.resultado==="Cumple"?"st-ok":c.resultado?"st-nc":""}">${esc(c.resultado||"—")}</td></tr>`).join("")}</tbody></table>`:"<p>No se recibieron certificados en el periodo.</p>";}
function tEnsHTML(R){
  const tipos=[...new Set(R.ensAll.map(r=>r.tl))];
  const resumen=tipos.length?`<table><colgroup><col style="width:22%"><col><col><col><col><col><col></colgroup><thead><tr><th>Material</th><th>Muestras</th><th>Cumplen</th><th>Aceptables / por concepto</th><th>No cumplen o promedio bajo</th><th>Pendientes</th><th>Atrasadas</th></tr></thead><tbody>${tipos.map(t=>{const l=R.ensAll.filter(r=>r.tl===t);const c=k=>l.filter(r=>k.includes(r.est)).length;return`<tr><td>${esc(t)}</td><td>${l.length}</td><td class="st-ok">${c(["cumple"])}</td><td>${c(["aceptable","aprobada"])}</td><td class="${c(["nocumple","prombajo"])?"st-nc":""}">${c(["nocumple","prombajo"])}</td><td>${c(["pendiente"])}</td><td class="${c(["vencido"])?"st-nc":""}">${c(["vencido"])}</td></tr>`;}).join("")}</tbody></table>`:"<p>No hay ensayos registrados.</p>";
  const per=R.ens.length?`<p><b>Roturas a 28 días en el periodo</b></p><table><colgroup><col style="width:9%"><col style="width:14%"><col><col style="width:13%"><col style="width:13%"><col style="width:16%"></colgroup><thead><tr><th>Muestra</th><th>Material</th><th>Ubicación</th><th>Especificada</th><th>Resultado</th><th>Estado</th></tr></thead><tbody>${R.ens.map(r=>`<tr><td>${esc(r.cod)}</td><td>${esc(r.tl)}</td><td>${esc(r.loc||r.elemento)}</td><td>${r.fc?f1(r.fc)+" MPa":"—"}</td><td>${f1(r.base)} MPa</td><td class="${["cumple","aceptable","aprobada"].includes(r.est)?"st-ok":"st-nc"}">${(EST_ENS[r.est]||[r.est])[0]}</td></tr>`).join("")}</tbody></table>`:"<p>No hubo roturas a 28 días en el periodo.</p>";
  return `<p><b>Estado acumulado a la fecha</b></p>${resumen}${per}`;}
function repHTML(rep){
  const R=repData(rep);const F=EMP()||{},p=P();const per=`Del ${fd(rep.desde)} al ${fd(rep.hasta)}`;
  let k=0;const H=t=>`<h2>${++k}. ${t}</h2>`;
  const fotos=(rep.fotos||[]).map(id=>R.fotosCand.find(f=>f.id===id)||allPhotos(p).find(f=>f.id===id)).filter(Boolean);
  let body;
  if(rep.tipo==="semanal"){
    body=`${H("Inspecciones realizadas en la semana")}${txtP(rep.txtInsp)}${tInsHTML(R)}
    ${H("Avance de obra")}${tAvHTML(rep)}
    ${H("Aspectos a tener en cuenta")}${listP(rep.aspectos)}
    ${H("Documentación y no conformidades")}${tDocsHTML(R)}${txtP(rep.txtDoc)}
    ${fotos.length?`${H("Registro fotográfico")}${grid2PDF(fotos)}`:""}`;
  }else if(rep.tipo==="mensual"){
    const fp=p.fotoPrincipal&&PH.get(p.fotoPrincipal);
    body=`${fp?`<figure class="fotoprin"><img src="${fp}" alt=""><figcaption>${esc(p.nombre)}</figcaption></figure>`:""}${H("Certificados de materiales recibidos")}${tCertHTML(R)}${txtP(rep.txtCert)}
    ${H("Resultados de los ensayos")}${tEnsHTML(R)}${ensChartsHTML(p,R.ensAll.filter(r=>r.fecha&&r.fecha<=rep.hasta))}${txtP(rep.txtEns)}
    ${H("Elementos inspeccionados")}${txtP(rep.txtInsp)}${tInsHTML(R)}
    ${H("Avance de obra")}${tAvHTML(rep)}
    ${fotos.length?`${H("Registro fotográfico")}${grid2PDF(fotos)}`:""}
    ${H("Conclusiones")}<p class="lead">${esc(rep.concl||defaultConcl(rep,R))}</p>`;
  }else{
    const prof=[...miembrosRol(p,"director"),...miembrosRol(p,"residente")];
    body=`${H("Supervisión técnica independiente")}<table><tbody><tr><th>Razón social</th><td>${esc(F.razon)}</td><th>NIT</th><td>${esc(F.nit)}</td></tr><tr><th>Representante legal</th><td>${esc(F.rep)}</td><th>Contrato</th><td>${esc(p.contrato)}</td></tr></tbody></table>
    ${H("Profesionales")}<table><thead><tr><th>Nombre</th><th>Cargo</th><th>Profesión</th><th>Matrícula</th></tr></thead><tbody>${prof.map(x=>`<tr><td>${esc(x.nombre)}</td><td>${esc(x.cargo)}</td><td>${esc(x.profesion)}</td><td>${esc(x.matricula)}</td></tr>`).join("")}</tbody></table>
    ${H("Documentos de diseño")}<table><colgroup><col><col style="width:14%"><col style="width:16%"></colgroup><thead><tr><th>Documento</th><th>Versión</th><th>Fecha</th></tr></thead><tbody>${R.docs.filter(d=>DOC_CAT[d.tipo]==="Diseños y estudios").map(d=>`<tr><td>${esc(d.nombre)}</td><td>v${esc(d.version)}</td><td>${fd(d.fecha)}</td></tr>`).join("")||"<tr><td colspan=3>Ninguno</td></tr>"}</tbody></table>
    ${H("Resumen de controles")}<table><tbody><tr><th>Elementos conformes</th><td>${p.inspecciones.filter(i=>i.conforme).length} de ${p.inspecciones.length}</td></tr><tr><th>Ensayos de resistencia evaluados</th><td>${R.ens.length}</td></tr><tr><th>Certificados de materiales aprobados</th><td>${R.certs.length}</td></tr><tr><th>No conformidades levantadas / abiertas</th><td>${p.nc.filter(n=>n.flujo==="aprobado"&&n.estado==="cerrada").length} / ${R.ncA.length}</td></tr></tbody></table>
    ${H("Certificación")}<p class="lead">${esc(rep.concl||defaultConcl(rep,R))}</p><p>Declaro bajo la gravedad de juramento que no me encuentro incurso en las incompatibilidades del Título I de la NSR-10.</p>`;
  }
  return hdrHTML(REPT[rep.tipo],`No. ${rep.id}`,`<b>Periodo:</b> ${per}`)+body+firmasHTML();
}
function vInformes(){
  const p=P();const l=p.informes.filter(visible).slice().sort((a,b)=>b.creado.localeCompare(a.creado)||b.id.localeCompare(a.id));const nr=U.newRep;
  if(!nr.desde)Object.assign(nr,defRange(nr.tipo));
  return `<div class="phead"><div><div class="eyebrow">Informes</div><h1>Informes</h1><p>Elige el tipo y la fecha de cobertura. El informe toma lo registrado en ese periodo y tú completas los textos, el avance de obra y las fotos. El director aprueba y exporta el PDF.</p></div></div>
  ${canEdit()?`<section class="panel hl"><header><h2>Generar informe</h2></header><div class="filters" style="border:0;padding:0">
    <label>Tipo<select id="nrTipo">${Object.entries(REPS).map(([k,v])=>`<option value="${k}" ${k===nr.tipo?"selected":""}>${v}</option>`).join("")}</select></label>
    <label>Cobertura desde<input type="date" id="nrDesde" value="${nr.desde}"></label><label>Hasta<input type="date" id="nrHasta" value="${nr.hasta}"></label>
    <button class="btn primary" data-act="genRep">${IC.rep} Generar informe</button></div></section>`:""}
  <section class="panel"><header><h2>Informes generados</h2><span class="muted">${l.length}</span></header>
  ${l.length?`<div class="tablewrap"><table><thead><tr><th>No.</th><th>Tipo</th><th>Cobertura</th><th>Generado</th><th>Estado</th></tr></thead><tbody>${l.map(r=>`<tr class="click" data-act="goto" data-v="informe" data-id="${r.id}"><td class="n">${r.id}</td><td><b>${REPS[r.tipo]}</b></td><td class="n">${fd(r.desde)} – ${fd(r.hasta)}</td><td class="n">${fd(r.creado)}</td><td>${flujoChip(r.flujo)}</td></tr>`).join("")}</tbody></table></div>`:'<div class="empty">Aún no hay informes.</div>'}</section>`;
}
const secH=(n,t,sub)=>`<header><h2><span class="secnum">${n}</span>${t}</h2>${sub?`<span class="muted" style="font-size:12.5px">${sub}</span>`:""}</header>`;
function avEditor(rep,ed){const l=rep.avance||[];
  return `<div class="tablewrap avtable"><table><thead><tr><th>Actividad</th><th class="pc">% anterior</th><th class="pc">% actual</th><th style="width:140px"></th>${ed?"<th></th>":""}</tr></thead><tbody>${l.map((a,i)=>`<tr><td>${ed?`<input type="text" data-av="${i}" data-k="act" value="${esc(a.act)}" aria-label="Actividad">`:esc(a.act)}</td><td class="n">${ed?`<input type="number" min="0" max="100" data-av="${i}" data-k="ant" value="${+a.ant||0}" aria-label="% anterior">`:(+a.ant||0)+" %"}</td><td class="n">${ed?`<input type="number" min="0" max="100" data-av="${i}" data-k="pct" value="${+a.pct||0}" aria-label="% actual">`:(+a.pct||0)+" %"}</td><td><div class="pbar"><i style="width:${Math.max(0,Math.min(100,+a.pct||0))}%"></i></div></td>${ed?`<td><button class="btn small danger" data-act="avDel" data-i="${i}" aria-label="Quitar actividad">×</button></td>`:""}</tr>`).join("")||`<tr><td colspan="5" class="muted">Sin actividades.</td></tr>`}</tbody></table></div>${ed?`<div class="actions"><button class="btn small" data-act="avAdd">+ Agregar actividad</button><span class="muted" style="font-size:12px">Esta tabla pasa al siguiente informe con estos porcentajes como «% anterior».</span></div>`:""}`;}
function vInforme(){
  const p=P();const rep=p.informes.find(r=>r.id===U.sel);if(!rep||!visible(rep))return vInformes();
  const R=repData(rep);const ed=canEdit()&&rep.flujo!=="aprobado";const dis=ed?"":"disabled";
  const ta=(k,ph,rows)=>`<textarea data-rep="${k}" rows="${rows||3}" placeholder="${esc(ph)}" ${dis}>${esc(rep[k]||"")}</textarea>`;
  const fotosPanel=n=>`<section class="panel">${secH(n,"Registro fotográfico",`${(rep.fotos||[]).length} seleccionada(s) de ${R.fotosCand.length} del periodo`)}${ed?selPhotosHTML(R.fotosCand,rep.fotos||[],"rep",false):(rep.fotos||[]).length?selPhotosHTML(R.fotosCand.filter(f=>rep.fotos.includes(f.id)),rep.fotos,"rep",false):'<p class="muted" style="margin:0">Sin fotos.</p>'}</section>`;
  let sec="";
  if(rep.tipo==="semanal")sec=`
    <section class="panel">${secH(1,"Inspecciones de la semana",`${R.ins.length} elemento(s) inspeccionado(s)`)}${ta("txtInsp","Breve resumen escrito de las inspecciones de la semana")}${ed?`<div class="actions"><button class="btn small ai" data-act="aiRepTxt" data-k="txtInsp">${IC.spark} Redactar con IA</button></div>`:""}<div class="muted" style="font-size:12.5px">La tabla de elementos inspeccionados se arma sola con las inspecciones del periodo.</div></section>
    <section class="panel">${secH(2,"Avance de obra")}${avEditor(rep,ed)}</section>
    <section class="panel">${secH(3,"Aspectos a tener en cuenta","Lo que se hizo corregir, para que no se repita")}${ta("aspectos","- Un aspecto por línea",5)}${ed?`<div class="actions"><button class="btn small" data-act="sugAsp">Sugerir a partir de lo corregido</button></div>`:""}</section>
    <section class="panel">${secH(4,"Documentación y no conformidades",`${R.docs.length+R.certs.length} recibido(s) · ${R.ncN.length} NC generada(s)`)}${ta("txtDoc","Nota adicional (opcional)",2)}</section>
    ${fotosPanel(5)}`;
  else if(rep.tipo==="mensual")sec=`
    <section class="panel">${secH(1,"Certificados recibidos en el mes",`${R.certs.length} certificado(s)`)}${ta("txtCert","Comentario sobre los certificados (opcional)",2)}</section>
    <section class="panel">${secH(2,"Resultados de los ensayos",`${R.ens.length} rotura(s) a 28 días en el periodo`)}${ta("txtEns","Comentario sobre los resultados (opcional)",2)}</section>
    <section class="panel">${secH(3,"Elementos inspeccionados",`${R.ins.length} elemento(s)`)}${ta("txtInsp","Texto de la supervisión sobre los elementos inspeccionados en el mes",4)}${ed?`<div class="actions"><button class="btn small ai" data-act="aiRepTxt" data-k="txtInsp">${IC.spark} Redactar con IA</button></div>`:""}</section>
    <section class="panel">${secH(4,"Avance de obra")}${avEditor(rep,ed)}</section>
    ${fotosPanel(5)}
    <section class="panel">${secH(6,"Conclusiones")}${ta("concl","Conclusiones y recomendaciones",5)}${ed?`<div class="actions"><button class="btn small ai" data-act="aiConcl" data-id="${rep.id}">${IC.spark} Redactar con IA</button></div>`:""}</section>`;
  else sec=`<section class="panel">${secH(1,"Certificación")}${ta("concl","Texto de la certificación",6)}${ed?`<div class="actions"><button class="btn small ai" data-act="aiConcl" data-id="${rep.id}">${IC.spark} Redactar con IA</button></div>`:""}</section>`;
  return `<div class="phead"><div><button class="link" data-act="nav" data-v="informes">← Informes</button><div class="eyebrow" style="margin-top:8px">${repNo(rep)} · del ${fd(rep.desde)} al ${fd(rep.hasta)}</div><h1>${REPS[rep.tipo]}</h1></div>
  <div class="actions">${isCons()?"":flujoChip(rep.flujo)}${delBtn("rep",rep)}<button class="btn" data-act="pdfRep" data-id="${rep.id}">${IC.pdf} Exportar PDF</button>${flujoBtns(rep,"rep")}</div></div>
  ${ed?`<section class="panel"><div class="form"><label>Cobertura desde<input type="date" id="repDesde" value="${rep.desde}"></label><label>Hasta<input type="date" id="repHasta" value="${rep.hasta}"></label></div></section>`:""}
  ${busyBox("concl","La IA está redactando con los datos del periodo…")}${rep.aiNote?`<div class="note ok">${esc(rep.aiNote)}</div>`:""}
  ${canEdit()?sec:""}
  <h2>Vista previa</h2><div class="paperwrap"><article class="paper" id="repPrev">${repHTML(rep)}</article></div>`;
}
function sysPicker(sel,name){return `<div class="syscards">${Object.entries(SIS).map(([k,s])=>`<label class="sys"><input type="checkbox" data-sys="${name}" value="${k}" ${sel.includes(k)?"checked":""} ${name==="new"||canEdit()?"":"disabled"}><span><b>${s.l}</b><span>${s.d}</span></span></label>`).join("")}</div>`;}

/* ============================================================
   Proyecto
   ============================================================ */
function puedeGestionar(p){const me=ME();return !!me&&me.esAdmin&&p&&p.empresaId===me.empresaId;}
function candidatosMiembro(p){return D.usuarios.filter(u=>u.activo!==false&&(u.empresaId===p.empresaId||u.rol==="owner")&&!(p.miembros||[]).some(m=>m.uid===u.id));}
function miembrosHTML(p,ed){const ms=p.miembros||[];
  return `<div>${ms.map((m,i)=>{const u=userById(m.uid);if(!u)return"";return `<div class="memrow"><span><b>${esc(u.nombre)}</b><span class="sub">${esc(u.usuario)}${u.rol==="owner"?" · dueño de la plataforma":u.constructora?" · "+esc(u.constructora):u.cargo?" · "+esc(u.cargo):""}</span></span>
    ${ed?`<select data-mrol="${i}" aria-label="Rol en el proyecto">${Object.entries(ROL_P).map(([k,v])=>`<option value="${k}" ${k===m.rol?"selected":""}>${v}</option>`).join("")}</select><button class="btn small danger" data-act="memDel" data-i="${i}" aria-label="Quitar del proyecto">×</button>`:`<span class="chip c-dark">${ROL_P[m.rol]}</span><span></span>`}</div>`;}).join("")||'<p class="muted">Sin miembros.</p>'}</div>
  ${ed?`<div class="filters" style="margin-top:8px"><label style="flex:1;min-width:180px">Agregar usuario<select id="memNew"><option value="">Elegir…</option>${candidatosMiembro(p).map(u=>`<option value="${u.id}">${esc(u.nombre)} · ${u.rol==="owner"?"Dueño de la plataforma":ROL_P[u.rol]||""}</option>`).join("")}</select></label><label>Rol<select id="memRol">${Object.entries(ROL_P).map(([k,v])=>`<option value="${k}">${v}</option>`).join("")}</select></label><button class="btn" data-act="memAdd">Agregar</button></div>
  <p class="muted" style="font-size:12px;margin:4px 0 0">Director: ${ROL_DESC.director} Residente: ${ROL_DESC.residente} Constructor: ${ROL_DESC.constructor}</p>`:""}`;}
function vProyecto(){
  const p=P();const ed=canEdit();const dis=ed?"":"disabled";
  const fi=(k,l,full)=>`<label class="${full?"full":""}">${l}<input type="text" data-pj="${k}" value="${esc(p[k]||"")}" ${dis}></label>`;
  return `<div class="phead"><div><div class="eyebrow">Configuración del proyecto</div><h1>${esc(p.nombre)}</h1><p>Datos que salen en el encabezado de todos los registros e informes. El sistema estructural define qué elementos se inspeccionan, sus listas de chequeo y los ensayos.</p></div>${esAdmin()?`<div class="actions"><button class="btn primary" data-act="newProj">+ Nuevo proyecto</button></div>`:""}</div>
  <section class="grid2"><div class="panel"><header><h2>Datos del proyecto</h2>${ed&&p.documentos.some(d=>d.tipo==="licencia")?`<button class="btn small" data-act="goto" data-v="documentos" data-id="${p.documentos.find(d=>d.tipo==="licencia").id}">Llenar desde la licencia</button>`:""}</header>
    <div class="form">${fi("nombre","Nombre",1)}${fi("direccion","Dirección")}${fi("municipio","Municipio")}${fi("propietario","Propietario")}${fi("constructora","Constructora")}${fi("directorObra","Director de obra")}${fi("licencia","Licencia")}${fi("curaduria","Curaduría",1)}${fi("area","Área construida")}${fi("unidades","Unidades")}${fi("contrato","Contrato de STI")}<label>Inicio de la supervisión<input type="date" data-pj="inicio" value="${esc(p.inicio||"")}" ${dis}></label>
    <label class="full">Torres o bloques (separados por coma)<input type="text" id="pjTorres" value="${esc((p.torres||[]).join(", "))}" ${dis}></label></div></div>
    <div style="display:flex;flex-direction:column;gap:16px">${(()=>{const fp=p.fotoPrincipal&&PH.get(p.fotoPrincipal);const fotos=allPhotos(p);
      return `<div class="panel"><header><h2>Foto principal</h2><span class="muted" style="font-size:12px">Portada del acta mensual</span></header>
      ${fp?`<img class="fotoprin-ui" src="${fp}" alt="Foto principal del proyecto">`:'<div class="empty" style="padding:18px">Sin foto principal.</div>'}
      ${ed?`<div class="actions"><label class="btn small">${IC.up} Subir foto<input type="file" hidden accept="image/*" data-photo="principal"></label>${fotos.length?`<select data-fp aria-label="Elegir del registro fotográfico" style="width:auto;max-width:260px"><option value="">Elegir del registro fotográfico…</option>${fotos.slice().reverse().map(f=>`<option value="${esc(f.id)}" ${f.id===p.fotoPrincipal?"selected":""}>${fd(f.fecha)} · ${esc(f.cap)}</option>`).join("")}</select>`:""}${fp?`<button class="btn small ghostdanger" data-act="quitarFP">Quitar</button>`:""}</div>`:""}</div>`;})()}
    <div class="panel"><header><h2>Equipo del proyecto</h2><span class="muted">${(p.miembros||[]).length}</span></header>${miembrosHTML(p,puedeGestionar(p))}${!puedeGestionar(p)?'<p class="muted" style="font-size:12px;margin:0">El administrador de la empresa agrega o quita miembros.</p>':""}</div>
    <div class="panel"><header><h2>Sistema estructural</h2></header>${sysPicker(p.sistemas||[],"proj")}${sysEffect(p.sistemas||[])}
    <div class="tablewrap"><table><thead><tr><th>Elemento</th><th>Ítems de la lista</th></tr></thead><tbody>${tiposDe(p).map(t=>`<tr><td>${CHK[t].label}</td><td class="n">${chkItems(t).length}</td></tr>`).join("")||'<tr><td colspan="2">Elige un sistema</td></tr>'}</tbody></table></div></div></div></section>
  ${puedeGestionar(p)?`<section class="panel"><header><h2>Eliminar proyecto</h2></header>${U.confirm==="delProj"?`<div class="confirm">Se borrará el proyecto con todos sus registros en este navegador. <button class="btn small danger" data-act="delProjYes">Sí, eliminar</button><button class="btn small" data-act="confirmNo">Cancelar</button></div>`:`<button class="btn danger" data-act="confirmAsk" data-v="delProj" style="align-self:flex-start">Eliminar este proyecto</button>`}</section>`:""}`;
}
function sysEffect(sel){const p={sistemas:sel};const t=tiposDe(p);return `<div class="note y"><b>Con este sistema</b> se inspeccionan: ${t.length?t.map(x=>CHK[x].label.toLowerCase()).join(", "):"—"}. Ensayos: concreto${sel.includes("mamposteria")?", mortero, grouting, unidades y muretes":""}.</div>`;}

/* ============================================================
   Administración: plataforma (dueño), empresa, usuarios, proyectos
   ============================================================ */
const swatch=e=>{const c=paletaDe(e);return`<span style="display:inline-flex;border-radius:3px;overflow:hidden;border:1px solid var(--line);vertical-align:middle"><i style="width:18px;height:14px;background:${c.rail}"></i><i style="width:10px;height:14px;background:${c.y}"></i></span>`;};
function vPlataforma(){
  return `<div class="phead"><div><div class="eyebrow">Dueño de la plataforma</div><h1>Empresas</h1><p>Crea las firmas de supervisión que usan Mi STI y su primer usuario administrador. Cada empresa crea luego sus proyectos y usuarios.</p></div><div class="actions"><button class="btn primary" data-act="newEmp">+ Nueva empresa</button></div></div>
  <div class="tablewrap"><table><thead><tr><th>Empresa</th><th>NIT</th><th>Ciudad</th><th>Usuarios</th><th>Proyectos</th><th>Colores</th><th>Estado</th></tr></thead><tbody>${D.empresas.map(e=>`<tr class="click" data-act="openEmp" data-id="${e.id}"><td><b>${esc(e.razon)}</b><span class="sub">Desde ${fd(e.creada)}</span></td><td class="n">${esc(e.nit)}</td><td>${esc(e.ciudad)}</td><td class="n">${D.usuarios.filter(u=>u.empresaId===e.id).length}</td><td class="n">${D.proyectos.filter(p=>p.empresaId===e.id).length}</td><td>${swatch(e)}</td><td>${e.activa===false?'<span class="chip c-crit">Suspendida</span>':'<span class="chip c-good">Activa</span>'}</td></tr>`).join("")}</tbody></table></div>
  <section class="grid2"><div class="panel"><header><h2>Respaldo de datos</h2></header><p class="muted" style="margin:0;font-size:12.5px">En esta versión los datos viven en este navegador. Descarga un respaldo para guardarlo o llevarlo a otro equipo.</p>
    <div class="actions"><button class="btn" data-act="backup">${IC.pdf} Descargar respaldo</button><label class="btn">${IC.up} Restaurar respaldo<input type="file" id="restoreIn" accept="application/json,.json" hidden></label></div></div>
    <div class="panel"><header><h2>Datos de demostración</h2></header>
    <label class="fl" style="flex-direction:row;align-items:center;gap:8px"><input type="checkbox" id="demoToggle" ${D.demo!==false?"checked":""}> Mostrar las cuentas de prueba en la pantalla de acceso</label>
    ${U.confirm==="reset"?`<div class="confirm">Se borrarán todos los cambios hechos en este navegador. <button class="btn small danger" data-act="resetYes">Sí, restablecer</button><button class="btn small" data-act="confirmNo">Cancelar</button></div>`:`<button class="btn danger" data-act="confirmAsk" data-v="reset" style="align-self:flex-start">Restablecer datos de demostración</button>`}</div></section>`;
}
function empresaForm(e,ed){const dis=ed?"":"disabled";const fi=(id,l,full)=>`<label class="${full?"full":""}">${l}<input type="text" data-emp="${id}" value="${esc(e[id]||"")}" ${dis}></label>`;
  return `<div style="display:flex;gap:14px;align-items:center;flex-wrap:wrap"><span style="width:76px;height:76px;border:1.5px dashed var(--line-strong);border-radius:4px;display:grid;place-items:center;overflow:hidden;background:#fff">${e.logo?`<img src="${e.logo}" alt="Logo" style="max-width:100%;max-height:100%">`:'<span style="font-size:11px;color:#666">Sin logo</span>'}</span>
  ${ed?`<label class="btn">${IC.up} Cargar logo<input type="file" data-logo="${e.id}" accept="image/*" hidden></label>${e.logo?`<button class="btn small" data-act="noLogo" data-id="${e.id}">Quitar</button>`:""}`:""}</div>
  <div class="form">${fi("razon","Razón social",1)}${fi("nit","NIT")}${fi("rep","Representante legal")}${fi("dir","Dirección")}${fi("ciudad","Ciudad")}${fi("tel","Teléfono")}${fi("correo","Correo")}</div>`;}
function paletaPicker(e,ed){const pal=e.paleta||{id:"pizarra"};const c=paletaDe(e);
  return `<div class="pal">${PALETAS.map(x=>`<label><input type="radio" name="pal" data-pal="${x.id}" ${pal.id===x.id?"checked":""} ${ed?"":"disabled"}><span class="sw"><i style="background:${x.rail}"></i><i style="background:${x.y}"></i><i style="background:${mixC(x.y,"#ffffff",.84)}"></i></span><span class="nm">${x.n}<small>${x.d}</small></span></label>`).join("")}
  <label><input type="radio" name="pal" data-pal="custom" ${pal.id==="custom"?"checked":""} ${ed?"":"disabled"}><span class="sw"><i style="background:${pal.rail||c.rail}"></i><i style="background:${pal.y||c.y}"></i><i style="background:${mixC(pal.y||c.y,"#ffffff",.84)}"></i></span><span class="nm">Personalizada<small>Tus propios colores</small></span></label></div>
  ${pal.id==="custom"&&ed?`<div class="colorrow"><label>Color principal (menú)<input type="color" data-palc="rail" value="${pal.rail||c.rail}"></label><label>Color de acento<input type="color" data-palc="y" value="${pal.y||c.y}"></label></div>`:""}
  <p class="muted" style="font-size:12px;margin:0">Los colores se aplican a la app, a las apps de ensayos y a los PDF de los proyectos de la empresa.</p>`;}
function vEmpresa(){
  const e=EMP();if(!e)return vInicio();const ed=esAdmin();let key="";try{key=localStorage.getItem("mi-sti-ia-"+e.id)||"";}catch(x){}
  return `<div class="phead"><div><div class="eyebrow">Configuración</div><h1>${esc(e.razon)}</h1><p>Estos datos salen en el encabezado y las firmas de todos los registros, informes y PDF. La app no lleva el nombre de ninguna firma: cada empresa pone los suyos.</p></div></div>
  <section class="grid2"><div class="panel"><header><h2>Datos de la empresa</h2></header>${empresaForm(e,ed)}</div>
  <div style="display:flex;flex-direction:column;gap:16px"><div class="panel"><header><h2>Colores de la empresa</h2></header>${paletaPicker(e,ed)}</div>
  <div class="panel"><header><h2>Inteligencia artificial (opcional)</h2></header><p class="muted" style="margin:0;font-size:12.5px">Con una clave de API de Anthropic la app lee mejor los PDF (incluso escaneados) y redacta observaciones, no conformidades y conclusiones. La clave se guarda solo en este navegador y no sale en los respaldos.</p>
    <div class="actions"><input type="password" id="iaKey" placeholder="sk-ant-…" value="${esc(key)}" style="flex:1;min-width:200px" autocomplete="off"><button class="btn" data-act="saveIaKey">Guardar</button>${key?'<button class="btn small danger" data-act="delIaKey">Quitar</button>':""}</div></div>
  <div class="panel"><header><h2>Profesionales</h2></header><p class="muted" style="margin:0;font-size:12.5px">Las firmas de los informes salen de los usuarios del proyecto (director y residente) con su cargo, profesión y matrícula.</p><button class="btn" data-act="nav" data-v="usuarios" style="align-self:flex-start">${IC.users} Ir a usuarios</button></div></div></section>`;
}
function vUsuarios(){
  const me=ME();const f=U.fu;const q=f.q.trim().toLowerCase();
  let l=D.usuarios.filter(u=>u.rol!=="owner"&&(esOwner()?(!f.emp||u.empresaId===f.emp):u.empresaId===me.empresaId)&&(!q||(u.nombre+" "+u.usuario+" "+(u.cargo||"")).toLowerCase().includes(q)));
  l.sort((a,b)=>(a.empresaId||"").localeCompare(b.empresaId||"")||(b.esAdmin-a.esAdmin)||a.nombre.localeCompare(b.nombre));
  const nproj=u=>D.proyectos.filter(p=>(p.miembros||[]).some(m=>m.uid===u.id)).length;
  return `<div class="phead"><div><div class="eyebrow">${esOwner()?"Dueño de la plataforma":"Administración de la empresa"}</div><h1>Usuarios</h1><p>${esOwner()?"Crea los administradores de cada empresa. Ellos crean después a sus directores, residentes y constructores.":"Crea las cuentas de directores, residentes y constructores. Puede haber varios de cada uno; luego los asignas a los proyectos."}</p></div><div class="actions"><button class="btn primary" data-act="newUser">+ Nuevo usuario</button></div></div>
  <div class="filters">${esOwner()?`<label>Empresa<select data-fu="emp"><option value="">Todas</option>${D.empresas.map(e=>`<option value="${e.id}" ${f.emp===e.id?"selected":""}>${esc(e.razon)}</option>`).join("")}</select></label>`:""}<label style="flex:1;min-width:160px">Buscar<input type="text" data-fu="q" value="${esc(f.q)}" placeholder="Nombre o usuario" style="width:100%"></label><span class="muted" style="font-size:12.5px">${l.length} usuario(s)</span></div>
  <div class="tablewrap"><table><thead><tr><th>Nombre</th><th>Usuario</th>${esOwner()?"<th>Empresa</th>":""}<th>Rol</th><th>Proyectos</th><th>Estado</th></tr></thead><tbody>${l.map(u=>`<tr class="click" data-act="openUser" data-id="${u.id}"><td><b>${esc(u.nombre)}</b><span class="sub">${esc(u.constructora||u.cargo||"")}</span></td><td class="n">${esc(u.usuario)}</td>${esOwner()?`<td>${esc(empById(u.empresaId)?.razon||"—")}</td>`:""}<td>${esc(ROL_P[u.rol]||u.rol)}${u.esAdmin?' <span class="rolechip">Admin</span>':""}</td><td class="n">${nproj(u)}</td><td>${u.activo===false?'<span class="chip c-crit">Inactivo</span>':'<span class="chip c-good">Activo</span>'}</td></tr>`).join("")||'<tr><td colspan="6" class="muted">Sin usuarios.</td></tr>'}</tbody></table></div>`;
}
function vProyectos(){
  const me=ME();const l=D.proyectos.filter(p=>p.empresaId===me.empresaId);
  return `<div class="phead"><div><div class="eyebrow">Administración de la empresa</div><h1>Proyectos</h1><p>Crea los proyectos de la empresa y asigna su equipo. Al crear un proyecto se elige el sistema estructural, que ajusta los elementos, las listas de chequeo y los ensayos.</p></div><div class="actions"><button class="btn primary" data-act="newProj">+ Nuevo proyecto</button></div></div>
  <div class="tablewrap"><table><thead><tr><th>Proyecto</th><th>Sistema estructural</th><th>Directores</th><th>Residentes</th><th>Constructores</th><th>Inicio</th></tr></thead><tbody>${l.map(p=>{const n=r=>miembrosRol(p,r).map(u=>esc(u.nombre)).join(", ")||"—";return `<tr class="click" data-act="openProj" data-id="${p.id}" data-v="proyecto"><td><b>${esc(p.nombre)}</b><span class="sub">${esc(p.municipio||"")}</span></td><td>${esc(sisTxt(p))}</td><td>${n("director")}</td><td>${n("residente")}</td><td>${n("constructor")}</td><td class="n">${fd(p.inicio)}</td></tr>`;}).join("")||'<tr><td colspan="6" class="muted">Aún no hay proyectos.</td></tr>'}</tbody></table></div>`;
}
function vCuenta(){const me=ME();
  return `<div class="phead"><div><div class="eyebrow">Mi cuenta</div><h1>${esc(me.nombre)}</h1><p>Usuario <b>${esc(me.usuario)}</b>${me.empresaId?` · ${esc(empById(me.empresaId)?.razon||"")}`:""}</p></div></div>
  <section class="grid2"><div class="panel"><header><h2>Mis datos</h2></header><div class="form"><label class="full">Nombre<input type="text" data-me="nombre" value="${esc(me.nombre)}"></label><label>Cargo<input type="text" data-me="cargo" value="${esc(me.cargo||"")}"></label><label>Profesión<input type="text" data-me="profesion" value="${esc(me.profesion||"")}"></label><label>Matrícula profesional<input type="text" data-me="matricula" value="${esc(me.matricula||"")}"></label><label>Correo<input type="text" data-me="correo" value="${esc(me.correo||"")}"></label></div></div>
  <div class="panel"><header><h2>Cambiar contraseña</h2></header><div class="form"><label class="full">Contraseña actual<input type="password" id="pwOld" autocomplete="current-password"></label><label>Nueva contraseña<input type="password" id="pwNew" autocomplete="new-password"></label><label>Repetir<input type="password" id="pwNew2" autocomplete="new-password"></label></div><button class="btn primary" data-act="changePw" style="align-self:flex-start">Cambiar contraseña</button></div></section>`;}

/* ============================================================
   Hojas laterales de administración
   ============================================================ */
function sheetEmp(e){const nUsers=D.usuarios.filter(u=>u.empresaId===e.id);
  return{title:e.razon||"Empresa",sub:`NIT ${esc(e.nit||"")} · ${nUsers.length} usuario(s) · ${D.proyectos.filter(p=>p.empresaId===e.id).length} proyecto(s)`,
  body:`${empresaForm(e,true)}<section><h3 style="margin-bottom:8px">Colores</h3>${paletaPicker(e,true)}</section>
  <section><h3 style="margin-bottom:8px">Usuarios</h3><div class="tablewrap"><table><tbody>${nUsers.map(u=>`<tr class="click" data-act="openUser" data-id="${u.id}"><td><b>${esc(u.nombre)}</b><span class="sub">${esc(u.usuario)}</span></td><td>${esc(ROL_P[u.rol]||"")}${u.esAdmin?' <span class="rolechip">Admin</span>':""}</td></tr>`).join("")||'<tr><td class="muted">Sin usuarios</td></tr>'}</tbody></table></div></section>
  <label class="fl" style="flex-direction:row;align-items:center;gap:8px"><input type="checkbox" id="empActiva" data-id="${e.id}" ${e.activa!==false?"checked":""}> Empresa activa (si la suspendes, sus usuarios no pueden entrar)</label>`,
  foot:`<button class="btn" data-act="newUser" data-id="${e.id}">+ Usuario administrador</button><button class="btn primary" data-act="closeSheet">Listo</button>`};}
function sheetNewEmp(){return{title:"Nueva empresa",sub:"Crea la firma y su primer usuario administrador.",
  body:`<section class="form"><label class="full">Razón social<input type="text" id="neRazon"></label><label>NIT<input type="text" id="neNit"></label><label>Ciudad<input type="text" id="neCiudad"></label></section>
  <section><h3 style="margin-bottom:8px">Administrador de la empresa</h3><div class="form"><label class="full">Nombre<input type="text" id="neNom"></label><label>Usuario<input type="text" id="neUser" autocomplete="off"></label><label>Contraseña temporal<input type="text" id="nePass" value="${esc(DEMO_PASS)}" autocomplete="off"></label><label>Rol en los proyectos<select id="neRol">${Object.entries(ROL_P).filter(([k])=>k!=="constructor").map(([k,v])=>`<option value="${k}">${v}</option>`).join("")}</select></label></div></section>`,
  foot:`<button class="btn primary" data-act="createEmp">Crear empresa</button>`};}
function sheetUser(u,empId){const nuevo=!u;u=u||{nombre:"",usuario:"",rol:"residente",esAdmin:esOwner(),empresaId:empId||ME().empresaId||D.empresas[0]?.id,cargo:"",profesion:"",matricula:"",correo:"",constructora:"",activo:true};
  const isMe=u.id===ME().id;
  return{title:nuevo?"Nuevo usuario":u.nombre,sub:nuevo?"La persona entra con este usuario y contraseña; puede cambiar la contraseña en «Mi cuenta».":`Usuario ${esc(u.usuario)}`,
  body:`<section class="form"><label class="full">Nombre completo<input type="text" id="usNom" value="${esc(u.nombre)}"></label><label>Usuario<input type="text" id="usUser" value="${esc(u.usuario)}" autocomplete="off"></label><label>${nuevo?"Contraseña":"Nueva contraseña (opcional)"}<input type="text" id="usPass" value="${nuevo?esc(DEMO_PASS):""}" autocomplete="off" placeholder="${nuevo?"":"Dejar vacío para no cambiarla"}"></label>
  ${esOwner()?`<label>Empresa<select id="usEmp">${D.empresas.map(e=>`<option value="${e.id}" ${e.id===u.empresaId?"selected":""}>${esc(e.razon)}</option>`).join("")}</select></label>`:""}
  <label>Rol habitual<select id="usRol">${Object.entries(ROL_P).map(([k,v])=>`<option value="${k}" ${k===u.rol?"selected":""}>${v}</option>`).join("")}</select></label>
  <label class="full" style="flex-direction:row;align-items:center;gap:8px"><input type="checkbox" id="usAdmin" ${u.esAdmin?"checked":""} ${isMe?"disabled":""}> Administrador de la empresa (crea proyectos y usuarios)</label>
  <label>Cargo<input type="text" id="usCargo" value="${esc(u.cargo||"")}" placeholder="Residente STI, Director de obra…"></label><label>Profesión<input type="text" id="usProf" value="${esc(u.profesion||"")}"></label><label>Matrícula profesional<input type="text" id="usMat" value="${esc(u.matricula||"")}"></label><label>Correo<input type="text" id="usCorreo" value="${esc(u.correo||"")}"></label>
  <label class="full">Constructora (solo para constructores)<input type="text" id="usCons" value="${esc(u.constructora||"")}"></label>
  ${nuevo||isMe?"":`<label class="full" style="flex-direction:row;align-items:center;gap:8px"><input type="checkbox" id="usActivo" ${u.activo!==false?"checked":""}> Usuario activo</label>`}</section>
  ${nuevo?"":`<section><h3 style="margin-bottom:6px">Proyectos</h3>${D.proyectos.filter(p=>(p.miembros||[]).some(m=>m.uid===u.id)).map(p=>`<span class="pill">${esc(p.nombre)} · ${ROL_P[(p.miembros.find(m=>m.uid===u.id)||{}).rol]}</span>`).join(" ")||'<span class="muted">Sin proyectos asignados. Se asignan en la ficha de cada proyecto.</span>'}</section>`}`,
  foot:`<button class="btn primary" data-act="saveUser" data-id="${u.id||""}">${nuevo?"Crear usuario":"Guardar"}</button>`};}
function sheetNewProj(){
  const sel=U.sheet.sis||["porticos"];
  return{title:"Nuevo proyecto",sub:"Al elegir el sistema estructural, la app ajusta los elementos, las listas de chequeo y los ensayos.",
  body:`<section class="form"><label class="full">Nombre del proyecto<input type="text" id="npNom" placeholder="Edificio…"></label><label>Municipio<input type="text" id="npMun"></label><label>Licencia<input type="text" id="npLic"></label><label>Constructora<input type="text" id="npCons"></label><label>Director de obra<input type="text" id="npDir"></label><label class="full">Torres o bloques (separados por coma)<input type="text" id="npTorres" value="Torre 1"></label></section>
  <section><h3 style="margin-bottom:8px">Sistema estructural</h3>${sysPicker(sel,"new")}<div id="npEffect" style="margin-top:8px">${sysEffect(sel)}</div></section>
  <p class="muted" style="font-size:12.5px;margin:0">Después de crearlo asignas el equipo (directores, residentes y constructores) en la ficha del proyecto.</p>`,
  foot:`<button class="btn primary" data-act="createProj">Crear proyecto</button>`};
}
function sheetFotoUp(){const S=U.sheet;const p=P();
  return{title:"Fotos de obra",sub:`${(S.ids||[]).length} foto(s) para el registro fotográfico`,
  body:`<div class="photos">${(S.ids||[]).map(id=>`<div class="photo"><img src="${PH.get(id)}" alt=""></div>`).join("")}</div>
  <section class="form"><label>Fecha<input type="date" id="fuFecha" value="${TODAY}"></label><label>Torre o bloque<select id="fuTorre"><option>General</option>${(p.torres||[]).map(t=>`<option>${esc(t)}</option>`).join("")}</select></label><label class="full">Descripción<input type="text" id="fuDesc" placeholder="Qué muestra la foto"></label></section>`,
  foot:`<button class="btn primary" data-act="saveFotoUp">Agregar al registro</button>`};}
function renderSheet(){
  const sh=$("sheet"),sc=$("scrim");const S=U.sheet;let c=null;const p=P();
  if(S&&ME()){if(S.kind==="doc"&&p){const d=p.documentos.find(x=>x.id===S.id);if(d)c=sheetDoc(d);}
    else if(S.kind==="cert"&&p){const x=p.certificados.find(y=>y.id===S.id);if(x&&visible(x))c=sheetCert(x);}
    else if(S.kind==="nc"&&p){const n=S.draft||p.nc.find(x=>x.id===S.id);if(n&&(S.draft||visible(n)))c=sheetNC(n);}
    else if(S.kind==="newInsp"&&p)c=sheetNewInsp();
    else if(S.kind==="newProj")c=sheetNewProj();
    else if(S.kind==="emp"){const e=empById(S.id);if(e)c=sheetEmp(e);}
    else if(S.kind==="newEmp")c=sheetNewEmp();
    else if(S.kind==="user"){const u=S.id?userById(S.id):null;c=sheetUser(u,S.emp);}
    else if(S.kind==="fotoUp"&&p)c=sheetFotoUp();}
  if(!c){sh.hidden=true;sc.hidden=true;return;}
  const keep=sh.querySelector(".sb")?.scrollTop||0;
  const typed={};if(S.keep&&!sh.hidden)sh.querySelectorAll("input[id]:not([type=file]):not([type=checkbox]),select[id],textarea[id]").forEach(x=>{typed[x.id]=x.value;});
  sh.innerHTML=`<div class="sh"><div style="min-width:0"><h2>${esc(c.title)}</h2><div class="muted" style="font-size:12.5px">${c.sub}</div></div><button class="x" data-act="closeSheet" aria-label="Cerrar">×</button></div><div class="sb">${c.body}</div>${c.foot?`<div class="sf">${c.foot}</div>`:""}`;
  Object.entries(typed).forEach(([k,v])=>{const x=document.getElementById(k);if(x&&!x.disabled)x.value=v;});
  sh.hidden=false;sc.hidden=false;const sb=sh.querySelector(".sb");if(sb&&S.keep)sb.scrollTop=keep;S.keep=true;
}
function openSheet(kind,id,extra){U.sheet=Object.assign({kind,id},extra||{});renderSheet();}
function closeSheet(){U.sheet=null;renderSheet();}
function sheetNewInsp(){
  const p=P();const tipos=tiposDe(p);
  return{title:"Nueva inspección",sub:"Registra el elemento que vas a revisar. La lista de chequeo depende del tipo de elemento.",
  body:`<section class="form"><label>Fecha<input type="date" id="niFecha" value="${TODAY}"></label><label>Torre o bloque<select id="niTorre">${(p.torres&&p.torres.length?p.torres:["General"]).map(t=>`<option>${esc(t)}</option>`).join("")}</select></label>
  <label>Nivel<input type="text" id="niNivel" placeholder="Piso 4, Placa piso 5, Cimentación…"></label><label>Tipo de elemento<select id="niTipo">${tipos.map(t=>`<option value="${t}">${CHK[t].label}</option>`).join("")}</select></label>
  <label class="full">Identificación y ejes<input type="text" id="niIdent" placeholder="Columnas C1–C20, ejes 1–5 / A–E"></label></section>
  <div class="fl">Fotos del elemento (opcional)${photosHTML(U.sheet.fotos||[],"ni",true,true)}</div>`,
  foot:`<button class="btn primary" data-act="createInsp">Crear y empezar la revisión</button>`};
}
