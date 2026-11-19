"use strict";
/* ============================================================
   Control de concreto preparado en obra
   Preparación, dosificación, mezclado, ensayos de campo y limpieza.
   Datos en p.concObra = [{id:"CO-01", fecha, torre, elemento, fc, volumen, mezcladora, metodo,
     tol, asMin, asMax, tmin, diseno:{cemento,arena,grava,agua,aditivo}, bachadas:[...], cilindros,
     lista:{itemId:{e,obs,fix}}, fotos, obs, conforme, flujo}]
   ============================================================ */
const CO_MET={peso:"Por peso (báscula)",cajon:"Por volumen en cajones calibrados"};
const coAC=x=>x&&+x.cemento>0&&x.agua!==""&&x.agua!=null?(+x.agua)/(+x.cemento):null;
const f2=n=>n==null||isNaN(n)?"—":(+n).toLocaleString("es-CO",{minimumFractionDigits:2,maximumFractionDigits:2});
const coList=()=>{const p=P();if(!p.concObra)p.concObra=[];return p.concObra;};
/* Revisión automática de las bachadas frente al diseño */
function coRevision(co){
  const d=co.diseno||{};const acD=coAC(d);const tol=(+co.tol||5)/100;const out=[];
  (co.bachadas||[]).forEach((b,i)=>{const n=i+1;const ac=coAC(b);
    if(ac!=null&&acD!=null&&ac>acD+0.005)out.push({k:"crit",b:n,t:`Bachada ${n}: a/c ${f2(ac)} mayor que la del diseño (${f2(acD)}).`});
    CO_MAT.forEach(([k,l])=>{if(k==="agua")return;const dv=+d[k],rv=b[k];if(!(dv>0)||rv===""||rv==null)return;const e=(+rv-dv)/dv;
      if(Math.abs(e)>tol+1e-9)out.push({k:"warn",b:n,t:`Bachada ${n}: ${l.toLowerCase()} ${e>0?"+":""}${Math.round(e*100)} % frente al diseño (tolerancia ±${Math.round(tol*100)} %).`});});
    if(b.asent!==""&&b.asent!=null&&co.asMin!==""&&co.asMax!==""&&(+b.asent<+co.asMin||+b.asent>+co.asMax))out.push({k:"warn",b:n,t:`Bachada ${n}: asentamiento ${f1(b.asent)} cm fuera del rango ${f1(co.asMin)}–${f1(co.asMax)} cm.`});
    if(b.tmez!==""&&b.tmez!=null&&+co.tmin>0&&+b.tmez<+co.tmin)out.push({k:"warn",b:n,t:`Bachada ${n}: mezclado de ${f1(b.tmez)} min, menor que el mínimo de ${f1(co.tmin)} min.`});});
  if(+co.volumen>0&&!(co.cilindros||"").trim())out.push({k:"warn",t:"No se registraron los cilindros tomados (NSR-10 C.5.6.2.1)."});
  return out;}
function coStats(co){const r=co.lista||{};const st={total:CO_ITEMS.length,done:0,nc:0,fix:0};
  CO_ITEMS.forEach(it=>{const a=r[it.id];if(a&&a.e){st.done++;if(a.e==="NC"){if(a.fix)st.fix++;else st.nc++;}}});
  st.alertas=coRevision(co);st.crit=st.alertas.filter(a=>a.k==="crit").length;
  st.listo=st.done===st.total&&st.nc===0;st.estado=co.conforme?"conforme":st.nc?"correccion":"revision";return st;}
const coChip=s=>s.estado==="conforme"?'<span class="chip c-good">Conforme</span>':s.estado==="correccion"?'<span class="chip c-crit">Requiere corrección</span>':'<span class="chip">En revisión</span>';
const coAcMax=co=>{const l=(co.bachadas||[]).map(coAC).filter(x=>x!=null);return l.length?Math.max(...l):null;};
const coAsRange=co=>{const l=(co.bachadas||[]).map(b=>b.asent).filter(x=>x!==""&&x!=null).map(Number);return l.length?(Math.min(...l)===Math.max(...l)?f1(l[0]):`${f1(Math.min(...l))}–${f1(Math.max(...l))}`)+" cm":"—";};

/* ---------- Lista ---------- */
function coFiltrados(){const f=U.fco||(U.fco={mes:"",torre:""});return coList().filter(c=>(!f.mes||c.fecha.slice(0,7)===f.mes)&&(!f.torre||c.torre===f.torre)).slice().sort((a,b)=>b.fecha.localeCompare(a.fecha)||b.id.localeCompare(a.id));}
function vConcObra(){
  const p=P();const all=coList();const f=U.fco||(U.fco={mes:"",torre:""});const l=coFiltrados();const meses=[...new Set(all.map(c=>c.fecha.slice(0,7)))].sort().reverse();
  const g=new Map();l.forEach(c=>{const m=c.fecha.slice(0,7);if(!g.has(m))g.set(m,[]);g.get(m).push(c);});
  return `<div class="phead"><div><div class="eyebrow">Control de calidad</div><h1>Concreto en obra</h1><p>Control del concreto preparado en obra: almacenamiento y limpieza de los materiales, dosificación de cada bachada frente al diseño de mezcla, mezclado, ensayos de campo (asentamiento, temperatura y cilindros) y limpieza al terminar.</p></div>
  ${canEdit()?`<div class="actions"><button class="btn primary" data-act="coNew">${IC.lab} Nuevo registro</button></div>`:""}</div>
  <div class="filters"><label>Mes<select data-fco="mes"><option value="">Todos los meses</option>${meses.map(m=>`<option value="${m}" ${m===f.mes?"selected":""}>${mesTxt(m)}</option>`).join("")}</select></label>
  <label>Torre o bloque<select data-fco="torre"><option value="">Todas</option>${(p.torres||[]).map(t=>`<option ${t===f.torre?"selected":""}>${esc(t)}</option>`).join("")}</select></label><span class="muted" style="font-size:12.5px">${l.length} de ${all.length}</span></div>
  ${l.length?`<div class="tablewrap"><table class="insptable"><thead><tr><th>No.</th><th>Fecha</th><th>Elemento</th><th>Torre</th><th class="c">f'c</th><th class="c">Volumen</th><th class="c">Bachadas</th><th class="c">a/c máx.</th><th class="c">Asentamiento</th><th>Lista</th><th>Estado</th></tr></thead><tbody>
  ${[...g.entries()].map(([m,rows])=>`<tr class="grp"><td colspan="11"><b>${mesTxt(m)}</b> · ${rows.length} registro(s) · ${rows.reduce((s,c)=>s+(+c.volumen||0),0).toLocaleString("es-CO",{maximumFractionDigits:1})} m³</td></tr>`+rows.map(c=>{const s=coStats(c);const acm=coAcMax(c);const acD=coAC(c.diseno);
    return `<tr class="click" data-act="goto" data-v="concobra1" data-id="${c.id}"><td class="n">${c.id}</td><td class="n">${fd(c.fecha)}</td><td><b>${esc(c.elemento)}</b>${s.alertas.length?`<span class="sub ${s.crit?"lo":""}">${s.alertas.length} alerta(s) en las bachadas</span>`:""}</td><td>${esc(c.torre)}</td><td class="c">${f1(c.fc)} MPa</td><td class="c">${f1(c.volumen)} m³</td><td class="c">${(c.bachadas||[]).length}</td><td class="c ${acm!=null&&acD!=null&&acm>acD+0.005?"lo":""}">${f2(acm)}</td><td class="c">${coAsRange(c)}</td><td><span class="mono">${s.done}/${s.total}</span>${s.nc?` <span class="chip c-crit">${s.nc} NC</span>`:""}</td><td>${coChip(s)}</td></tr>`;}).join("")).join("")}</tbody></table></div>`:'<div class="empty">Sin registros de concreto preparado en obra.</div>'}`;}

/* ---------- Detalle ---------- */
function vConcObraDet(){
  const p=P();const co=coList().find(x=>x.id===U.sel);if(!co)return vConcObra();
  const s=coStats(co);const ed=canEdit()&&!co.conforme;const dis=ed?"":"disabled";const d=co.diseno||(co.diseno={});const r=co.lista||(co.lista={});
  const inp=(k,type,extra)=>`<input type="${type||"text"}" data-co="${k}" value="${esc(co[k]??"")}" ${extra||""} ${dis}>`;
  const num=(v,attrs)=>`<input type="number" step="any" ${attrs} value="${v??""}" ${dis}>`;
  const acD=coAC(d);const tol=(+co.tol||5)/100;
  const cell=(b,i,k)=>{const dv=+d[k],rv=b[k];const off=k!=="agua"&&dv>0&&rv!==""&&rv!=null&&Math.abs((+rv-dv)/dv)>tol+1e-9;return `<td class="n ${off?"cellwarn":""}">${ed?num(rv,`data-cob="${i}" data-k="${k}" aria-label="${k} bachada ${i+1}"`):(rv===""||rv==null?"—":f1(rv))}</td>`;};
  const bach=(co.bachadas||[]).map((b,i)=>{const ac=coAC(b);const asOff=b.asent!==""&&b.asent!=null&&(+b.asent<+co.asMin||+b.asent>+co.asMax);const tOff=b.tmez!==""&&b.tmez!=null&&+b.tmez<+co.tmin;
    return `<tr><td class="n"><b>${i+1}</b></td><td>${ed?`<input type="time" data-cob="${i}" data-k="hora" value="${esc(b.hora||"")}" aria-label="Hora bachada ${i+1}">`:esc(b.hora||"")}</td>${CO_MAT.map(([k])=>cell(b,i,k)).join("")}<td class="n ${ac!=null&&acD!=null&&ac>acD+0.005?"cellbad":""}"><b>${f2(ac)}</b></td>
    <td class="n ${tOff?"cellwarn":""}">${ed?num(b.tmez,`data-cob="${i}" data-k="tmez" aria-label="Tiempo de mezclado bachada ${i+1}"`):f1(b.tmez)}</td><td class="n ${asOff?"cellwarn":""}">${ed?num(b.asent,`data-cob="${i}" data-k="asent" aria-label="Asentamiento bachada ${i+1}"`):f1(b.asent)}</td><td class="n">${ed?num(b.temp,`data-cob="${i}" data-k="temp" aria-label="Temperatura bachada ${i+1}"`):f1(b.temp)}</td>${ed?`<td><button class="btn small danger" data-act="coBachDel" data-i="${i}" aria-label="Quitar bachada">×</button></td>`:""}</tr>`;}).join("");
  return `<div class="phead"><div><button class="link" data-act="nav" data-v="concobra">← Concreto en obra</button><div class="eyebrow" style="margin-top:8px">${esc(co.torre)} · ${fd(co.fecha)} · ${co.id}</div><h1>${esc(co.elemento||"Concreto preparado en obra")}</h1><p>f'c ${f1(co.fc)} MPa · ${f1(co.volumen)} m³ · ${(co.bachadas||[]).length} bachada(s) · ${coChip(s)}</p></div>
  <div class="actions">${delBtn("co",co)}<button class="btn" data-act="coPDF" data-id="${co.id}">${IC.pdf} Exportar PDF</button></div></div>
  ${co.conforme?`<div class="note ok fasenote"><span>Registro conforme el ${fd(co.conforme)}.</span>${canApprove()?`<button class="btn small" data-act="coReabrir" data-id="${co.id}">Reabrir</button>`:""}</div>`:canEdit()?`<div class="note ${s.listo?"ok":"y"} fasenote"><span>${s.listo?"Todos los ítems cumplen o están corregidos.":s.nc?`Hay ${s.nc} ítem(s) por corregir.`:`Faltan ${s.total-s.done} ítem(s) por revisar.`}${s.crit?` Revisa la relación agua/cemento de ${s.crit} bachada(s).`:""}</span><button class="btn small primary" data-act="coConf" data-id="${co.id}" ${s.listo?"":"disabled"}>Declarar conforme</button></div>`:""}
  <section class="panel"><header><h2>Datos del vaciado</h2></header><div class="form">
    <label>Fecha${inp("fecha","date")}</label>
    <label>Torre o bloque<select data-co="torre" ${dis}>${[...new Set([...(p.torres||[]),"General",co.torre].filter(Boolean))].map(t=>`<option ${t===co.torre?"selected":""}>${esc(t)}</option>`).join("")}</select></label>
    <label class="full">Elemento y ubicación${inp("elemento","text",'placeholder="Columnetas eje 3, piso 4"')}</label>
    <label>f'c especificado (MPa)${inp("fc","number",'step="any"')}</label><label>Volumen (m³)${inp("volumen","number",'step="any"')}</label>
    <label>Mezcladora${inp("mezcladora","text",'placeholder="Mezcladora de 1 bulto"')}</label>
    <label>Medición de agregados<select data-co="metodo" ${dis}>${Object.entries(CO_MET).map(([k,v])=>`<option value="${k}" ${co.metodo===k?"selected":""}>${v}</option>`).join("")}</select></label>
    <label class="full">Cilindros tomados${inp("cilindros","text",'placeholder="Muestra 15 · 4 cilindros (2 a 7 días, 2 a 28 días)"')}</label>
  </div></section>
  <section class="panel"><header><h2>Dosificación por bachada</h2><span class="muted">Primera fila: diseño de mezcla aprobado (por bachada)</span></header>
    <div class="form co-lim"><label>Asentamiento mín. (cm)${inp("asMin","number",'step="any"')}</label><label>Asentamiento máx. (cm)${inp("asMax","number",'step="any"')}</label><label>Mezclado mínimo (min)${inp("tmin","number",'step="any"')}</label><label>Tolerancia de pesaje (± %)${inp("tol","number",'step="any"')}</label></div>
    <div class="tablewrap cotable"><table><thead><tr><th>Bachada</th><th>Hora</th>${CO_MAT.map(([,l,u])=>`<th class="c">${l}<span class="sub">${co.metodo==="cajon"&&(l==="Arena"||l==="Grava")?"kg equiv.":u}</span></th>`).join("")}<th class="c">a/c</th><th class="c">Mezclado<span class="sub">min</span></th><th class="c">Asent.<span class="sub">cm</span></th><th class="c">Temp.<span class="sub">°C</span></th>${ed?"<th></th>":""}</tr></thead><tbody>
    <tr class="grp"><td><b>Diseño</b></td><td></td>${CO_MAT.map(([k])=>`<td class="n">${ed?num(d[k],`data-cod="${k}" aria-label="Diseño ${k}"`):f1(d[k])}</td>`).join("")}<td class="n"><b>${f2(acD)}</b></td><td class="n">≥ ${f1(co.tmin)}</td><td class="n">${f1(co.asMin)}–${f1(co.asMax)}</td><td></td>${ed?"<td></td>":""}</tr>
    ${bach||`<tr><td colspan="${ed?12:11}" class="muted">Sin bachadas registradas.</td></tr>`}</tbody></table></div>
    ${ed?`<div class="actions"><button class="btn small" data-act="coBachAdd">+ Agregar bachada</button><span class="muted" style="font-size:12px">La relación a/c se calcula con el agua y el cemento de cada bachada. En amarillo, lo que se sale de la tolerancia o del rango; en rojo, a/c mayor que la del diseño.</span></div>`:""}
    ${s.alertas.length?`<div class="coalerts">${s.alertas.map(a=>`<div class="note ${a.k==="crit"?"bad":"y"}">${esc(a.t)}</div>`).join("")}</div>`:(co.bachadas||[]).length?'<div class="note ok">Todas las bachadas cumplen el diseño, el rango de asentamiento y el tiempo de mezclado.</div>':""}
  </section>
  ${CO_CHK.map(sec=>{const its=CO_ITEMS.filter(it=>it.sec===sec.k);const dn=its.filter(it=>r[it.id]&&r[it.id].e).length;const nc=its.filter(it=>r[it.id]&&r[it.id].e==="NC"&&!r[it.id].fix).length;
    return `<section class="panel"><header><h2>${esc(sec.l)}</h2><span class="cnt ${nc?"bad":""} muted mono">${dn}/${its.length}</span></header><div class="items">${its.map(it=>{const a=r[it.id]||{};const k="co-"+it.id;const open=U.openItem[k]||(a.e==="NC"&&!a.fix);const cls=a.e==="NC"&&a.fix?"FX":a.e||"";
      return `<article class="item ${cls}"><span class="nn">${it.n}</span><div>${esc(it.t)}${a.obs&&!open?`<span class="sub">${esc(a.obs)}</span>`:""}${a.e==="NC"&&a.fix?`<span class="sub">Corregido y verificado el ${fd(a.fix)}</span>`:""}</div>
      <div class="ans" role="group" aria-label="Resultado del ítem ${it.n}">${["C","NC","NA"].map(v=>`<button class="b${v}" data-act="coAns" data-id="${it.id}" data-v="${v}" aria-pressed="${a.e===v}" ${ed?"":"disabled"}>${v==="C"?"Cumple":v==="NC"?"No cumple":"N.A."}</button>`).join("")}<button data-act="toggleItem" data-id="${k}" aria-label="Observación">${open?"−":"+"}</button></div>
      ${open?`<div class="more"><textarea data-coobs="${it.id}" placeholder="${a.e==="NC"?"Qué se encontró y en qué bachada":"Observación (opcional)"}" ${dis}>${esc(a.obs||"")}</textarea>${ed&&a.e==="NC"?`<div class="row"><label class="chip ${a.fix?"c-y":""}" style="cursor:pointer"><input type="checkbox" data-cofix="${it.id}" ${a.fix?"checked":""}> Corregido y verificado</label></div>`:""}</div>`:""}</article>`;}).join("")}</div></section>`;}).join("")}
  <section class="panel"><header><h2>Fotos</h2><span class="muted">${(co.fotos||[]).length}</span></header>${photosHTML(co.fotos,"co:"+co.id,ed,ed)}</section>
  ${ed?`<label class="panel" style="gap:6px"><b>Observaciones</b><textarea data-co="obs" placeholder="Observaciones del vaciado">${esc(co.obs||"")}</textarea></label>`:co.obs?`<div class="panel"><b>Observaciones</b><p style="margin:0">${esc(co.obs)}</p></div>`:""}`;}

/* ---------- PDF ---------- */
function pdfCOHTML(co){const s=coStats(co);const d=co.diseno||{};const r=co.lista||{};
  return hdrHTML("Control de concreto preparado en obra",`${co.id} · ${fd(co.fecha)}`)+`<h2>Datos del vaciado</h2><table><tbody>
  <tr><th>Elemento</th><td colspan="3" style="white-space:normal">${esc(co.elemento)}</td></tr>
  <tr><th>Torre o bloque</th><td>${esc(co.torre)}</td><th>Fecha</th><td>${fd(co.fecha)}</td></tr>
  <tr><th>f'c especificado</th><td>${f1(co.fc)} MPa</td><th>Volumen</th><td>${f1(co.volumen)} m³</td></tr>
  <tr><th>Mezcladora</th><td>${esc(co.mezcladora||"")}</td><th>Agregados</th><td>${esc(CO_MET[co.metodo]||"")}</td></tr>
  <tr><th>Cilindros</th><td colspan="3" style="white-space:normal">${esc(co.cilindros||"—")}</td></tr>
  <tr><th>Estado</th><td colspan="3" class="${s.estado==="conforme"?"st-ok":s.estado==="correccion"?"st-nc":""}">${s.estado==="conforme"?"Conforme el "+fd(co.conforme):s.estado==="correccion"?"Requiere corrección":"En revisión"}</td></tr></tbody></table>
  <h2>Dosificación por bachada</h2><table><thead><tr><th>Bachada</th><th>Hora</th>${CO_MAT.map(([,l,u])=>`<th>${l} (${u})</th>`).join("")}<th>a/c</th><th>Mezclado (min)</th><th>Asent. (cm)</th><th>Temp. (°C)</th></tr></thead><tbody>
  <tr><td><b>Diseño</b></td><td></td>${CO_MAT.map(([k])=>`<td>${f1(d[k])}</td>`).join("")}<td><b>${f2(coAC(d))}</b></td><td>≥ ${f1(co.tmin)}</td><td>${f1(co.asMin)}–${f1(co.asMax)}</td><td></td></tr>
  ${(co.bachadas||[]).map((b,i)=>{const ac=coAC(b);return `<tr><td>${i+1}</td><td>${esc(b.hora||"")}</td>${CO_MAT.map(([k])=>`<td>${b[k]===""||b[k]==null?"—":f1(b[k])}</td>`).join("")}<td class="${ac!=null&&coAC(d)!=null&&ac>coAC(d)+0.005?"st-nc":""}">${f2(ac)}</td><td>${f1(b.tmez)}</td><td>${f1(b.asent)}</td><td>${f1(b.temp)}</td></tr>`;}).join("")}</tbody></table>
  ${s.alertas.length?`<p><b>Revisión de las bachadas:</b></p><ul>${s.alertas.map(a=>`<li>${esc(a.t)}</li>`).join("")}</ul>`:""}
  ${CO_CHK.map(sec=>`<h2>${esc(sec.l)}</h2><table class="wrap"><thead><tr><th style="width:5%">No.</th><th>Ítem</th><th style="width:13%">Resultado</th><th style="width:34%">Observación</th></tr></thead><tbody>${CO_ITEMS.filter(it=>it.sec===sec.k).map(it=>{const a=r[it.id]||{};return `<tr><td>${it.n}</td><td>${esc(it.t)}</td><td class="${a.e==="C"||a.fix?"st-ok":a.e==="NC"?"st-nc":""}">${a.e==="C"?"Cumple":a.e==="NC"?(a.fix?"Corregido "+fd(a.fix):"No cumple"):a.e==="NA"?"N.A.":"—"}</td><td>${esc(a.obs||"")}</td></tr>`;}).join("")}</tbody></table>`).join("")}
  ${co.obs?`<h2>Observaciones</h2><p>${esc(co.obs)}</p>`:""}${(co.fotos||[]).length?`<h2>Registro fotográfico</h2>${photosPDF(co.fotos,"Foto")}`:""}
  <p style="font-size:10.5px;color:#555;margin-top:10px">Asentamiento según NTC 396. Frecuencia de muestreo de cilindros según NSR-10 C.5.6.2.1. La tolerancia de pesaje, el tiempo mínimo de mezclado y el tiempo máximo hasta la colocación se toman de la especificación del proyecto.</p>${firmasHTML()}`;}
function pdfCOListHTML(){const l=coFiltrados().slice().reverse();const f=U.fco||{};
  return hdrHTML("Control de concreto preparado en obra",f.mes?mesTxt(f.mes):`${l.length} registro(s)`)+`<h2>Registros</h2><table><thead><tr><th>No.</th><th>Fecha</th><th>Elemento</th><th>Torre</th><th>f'c</th><th>Vol.</th><th>Bachadas</th><th>a/c máx. / diseño</th><th>Asentamiento</th><th>Estado</th></tr></thead><tbody>${l.map(c=>{const s=coStats(c);return `<tr><td>${c.id}</td><td>${fd(c.fecha)}</td><td>${esc(c.elemento)}</td><td>${esc(c.torre)}</td><td>${f1(c.fc)} MPa</td><td>${f1(c.volumen)} m³</td><td>${(c.bachadas||[]).length}</td><td class="${s.crit?"st-nc":""}">${f2(coAcMax(c))} / ${f2(coAC(c.diseno))}</td><td>${coAsRange(c)}</td><td class="${s.estado==="conforme"?"st-ok":s.estado==="correccion"?"st-nc":""}">${s.estado==="conforme"?"Conforme":s.estado==="correccion"?"Corregir":"En revisión"}</td></tr>`;}).join("")||'<tr><td colspan="10">Sin registros.</td></tr>'}</tbody></table>`+firmasHTML();}

/* ---------- Acciones ---------- */
document.addEventListener("click",ev=>{
  const el=ev.target.closest("[data-act]");if(!el||!P())return;const act=el.dataset.act;if(!act.startsWith("co"))return;
  const id=el.dataset.id,v=el.dataset.v;const p=P();const co=coList().find(x=>x.id===(id||U.sel));
  switch(act){
    case"coNew":{if(!canEdit())break;const last=coList().slice().sort((a,b)=>b.fecha.localeCompare(a.fecha))[0];
      const n={id:nextId(coList(),"CO-"),fecha:TODAY,torre:(p.torres||[])[0]||"General",elemento:"",fc:21,volumen:"",mezcladora:last?last.mezcladora:"",metodo:last?last.metodo:"peso",tol:last?last.tol:5,asMin:last?last.asMin:7.5,asMax:last?last.asMax:10,tmin:last?last.tmin:1.5,
        diseno:Object.assign({cemento:50,arena:"",grava:"",agua:"",aditivo:""},last?last.diseno:{}),bachadas:[],cilindros:"",lista:{},fotos:[],obs:"",conforme:"",flujo:"borrador"};
      coList().push(n);log(`Registro de concreto en obra ${n.id} creado.`);save();U.openItem={};go("concobra1",n.id);toast(`${n.id} creado. Completa los datos del vaciado.`);break;}
    case"coBachAdd":{if(!co)break;co.bachadas=co.bachadas||[];const prev=co.bachadas[co.bachadas.length-1];const d=co.diseno||{};
      co.bachadas.push({hora:"",cemento:d.cemento??"",arena:"",grava:"",agua:"",aditivo:"",tmez:"",asent:"",temp:""});save();render();break;}
    case"coBachDel":{if(!co)break;co.bachadas.splice(+el.dataset.i,1);save();render();break;}
    case"coAns":{if(!co||!canEdit()||co.conforme)break;co.lista=co.lista||{};const a=co.lista[id]||{};const nv=a.e===v?null:v;co.lista[id]=Object.assign({},a,{e:nv});if(nv!=="NC")delete co.lista[id].fix;if(nv==="NC")U.openItem["co-"+id]=true;save();render();break;}
    case"coConf":{if(!co)break;const s=coStats(co);if(!s.listo){toast("Faltan ítems por revisar o corregir.");break;}co.conforme=TODAY;co.flujo="aprobado";log(`Concreto en obra ${co.id} conforme: ${co.elemento}.`);save();render();toast("Registro declarado conforme.");break;}
    case"coReabrir":{if(!co||!canApprove())break;co.conforme="";co.flujo="borrador";log(`Reabierto por el director: concreto en obra ${co.id}.`);save();render();toast("Registro reabierto.");break;}
    case"coPDF":{if(co)exportPDF(pdfCOHTML(co),fname(p.nombre,"concreto_en_obra",co.id,co.elemento));break;}
  }});
document.addEventListener("change",ev=>{const t=ev.target;const p=P();if(!p)return;
  if(t.dataset.fco!=null&&t.dataset.fco!==undefined&&t.matches("[data-fco]")){U.fco=U.fco||{};U.fco[t.dataset.fco]=t.value;render();return;}
  const co=coList().find(x=>x.id===U.sel);if(!co||U.view!=="concobra1"||!canEdit()||co.conforme)return;
  const numK=["fc","volumen","asMin","asMax","tmin","tol"];
  if(t.dataset.co){const k=t.dataset.co;co[k]=numK.includes(k)?(t.value===""?"":+t.value):t.value;save();if(k!=="obs")render();}
  else if(t.dataset.cod){co.diseno=co.diseno||{};co.diseno[t.dataset.cod]=t.value===""?"":+t.value;save();render();}
  else if(t.dataset.cob!=null&&t.matches("[data-cob]")){const b=co.bachadas[+t.dataset.cob];if(!b)return;const k=t.dataset.k;b[k]=k==="hora"?t.value:(t.value===""?"":+t.value);save();render();}
  else if(t.dataset.coobs){co.lista[t.dataset.coobs]=Object.assign({},co.lista[t.dataset.coobs],{obs:t.value});save();}
  else if(t.dataset.cofix){const a=co.lista[t.dataset.cofix];if(a){if(t.checked)a.fix=TODAY;else delete a.fix;save();render();}}});
