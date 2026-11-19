"use strict";
/* ============================================================
   Acciones: carga de archivos, IA de redacción y eventos
   ============================================================ */
const nextId=(list,pre,w=2)=>{const n=Math.max(0,...list.map(x=>parseInt(String(x.id).replace(/^\D+/,""),10)||0))+1;return pre+String(n).padStart(w,"0");};
const parseNums=s=>String(s||"").replace(/;/g," ").split(/\s+/).map(x=>parseFloat(x.replace(",","."))).filter(x=>!isNaN(x));
async function handleUpload(kind,file,sampleKey){
  const tipo=kind==="doc"?($("up-doc-tipo")?.value||"auto"):null;
  U.busy=kind;render();
  let rd,fuente;
  let arch=null;
  try{if(file){rd=await readFile(file);fuente=file.name;arch=await guardarArchivo(file).catch(()=>null);}else{rd={text:SAMPLE_DOCS[sampleKey],pages:1,scanned:false};fuente="Documento de ejemplo";}}
  catch(e){U.busy=null;render();toast("No se pudo abrir el archivo: "+(e&&e.message?e.message:"error")+".");return;}
  try{
    if(kind==="doc")await ingestDoc(tipo,rd,fuente,arch);
    else if(kind==="cert")await ingestCert(rd,fuente,arch);
  }catch(e){toast("Ocurrió un error al extraer los datos.");console.error(e);}
  U.busy=null;render();
}
async function aiFromRead(prompt,rd){
  if(rd.scanned){if(rd.images&&rd.images.length)return aiJSON(prompt+"\n\nEl documento viene como imágenes de sus páginas.",{images:rd.images});return{err:"scan"};}
  return aiJSON(prompt+"\n\nTEXTO:\n"+rd.text.slice(0,45000));
}
async function ingestDoc(tipo,rd,fuente,arch){
  const p=P();if(tipo==="auto"){tipo=guessTipo(rd.scanned?"":rd.text);if(tipo==="otro"||!tipo){const f=String(fuente||"").toLowerCase().replace(/[_.-]+/g," ");tipo=/suelo|geot/.test(f)?"suelos":/memoria|calculo|cálculo/.test(f)?"estructural":/plano/.test(f)?"planos":/licencia/.test(f)?"licencia":tipo||"otro";}}
  const d={id:nextId(p.documentos,"D"),tipo,nombre:DOC_TIPOS[tipo],version:"1",fecha:TODAY,flujo:"borrador",datos:{},fuente,archivo:arch||null,_text:rd.text,_scan:!!rd.scanned};
  let r={err:"off"};
  if(tipo==="licencia"){
    if(aiReady())r=await aiFromRead(`Eres asistente de una firma de supervisión técnica en Colombia. Extrae los datos de esta licencia de construcción. Responde solo JSON con: {"numero","curaduria","fechaExpedicion" (AAAA-MM-DD),"vigenciaMeses" (número),"titular","direccion","areaConstruida","unidades","uso","responsables":[{"rol","nombre","matricula"}]}. Usa "" si un dato no aparece.`,rd);
    if(r.data){const x=r.data;Object.assign(d,{nombre:`Licencia de construcción ${x.numero||""}`.trim(),fecha:x.fechaExpedicion||TODAY,via:"ia",datos:{"Número":x.numero,"Curaduría":x.curaduria,"Fecha de expedición":fd(x.fechaExpedicion),"Vigencia":x.vigenciaMeses?x.vigenciaMeses+" meses":"","Titular":x.titular,"Dirección":x.direccion,"Área construida":x.areaConstruida,"Unidades":x.unidades,"Uso":x.uso}});
      (x.responsables||[]).forEach(q=>{if(q&&q.nombre)d.datos[q.rol||"Responsable"]=`${q.nombre}${q.matricula?" · "+q.matricula:""}`;});
      if(x.fechaExpedicion&&x.vigenciaMeses)d.vence=addMonths(x.fechaExpedicion,+x.vigenciaMeses);}
    else if(!rd.scanned){const x=rulesLicencia(rd.text);Object.assign(d,{nombre:x.nombre,fecha:x.fecha||TODAY,vence:x.vence,datos:x.datos,via:"auto",aiErr:r.err});}
  }else{
    if(aiReady())r=await aiFromRead(`Eres asistente de una firma de supervisión técnica en Colombia. Del documento (${DOC_TIPOS[tipo]}) extrae los datos principales. Responde solo JSON: {"titulo","fecha" (AAAA-MM-DD o ""),"version","responsable","matricula","resumen" (máximo 3 frases con lo técnicamente importante)}.`,rd);
    if(r.data){const x=r.data;Object.assign(d,{nombre:x.titulo||DOC_TIPOS[tipo],fecha:x.fecha||TODAY,version:String(x.version||"1"),via:"ia",datos:{"Título":x.titulo,"Fecha":fd(x.fecha),"Versión":x.version,"Responsable":x.responsable,"Matrícula":x.matricula,"Resumen":x.resumen}});}
    else if(!rd.scanned){const x=rulesGeneral(rd.text,tipo);Object.assign(d,{nombre:x.nombre,fecha:x.fecha||TODAY,version:x.version,datos:x.datos,via:"auto",aiErr:r.err});}
  }
  if(rd.scanned&&!r.data){d.via="scan";d._text="";}
  Object.keys(d.datos).forEach(k=>{if(!d.datos[k])delete d.datos[k];});
  p.documentos.push(d);log(`Documento cargado: ${d.nombre}.`);save();
  openSheet("doc",d.id);
  if(REV[tipo]&&d._text)await reviewDoc(d.id);
}
async function reviewDoc(id){
  const d=P().documentos.find(x=>x.id===id);if(!d||!REV[d.tipo]||!d._text)return;
  const items=REV[d.tipo].items;U.busy="rev";renderSheet();
  let r={err:"off"};
  if(aiReady())r=await aiJSON(`Eres un ingeniero de supervisión técnica independiente en Colombia (NSR-10). Revisa si el documento contiene cada ítem del contenido mínimo de un ${REV[d.tipo].label}. El texto trae marcas [Página N].\nÍTEMS:\n${items.map((t,i)=>`${i}. ${t[0]}`).join("\n")}\n\nResponde solo un arreglo JSON, un objeto por ítem en el mismo orden: {"i": número, "estado": "encontrado"|"incompleto"|"ausente", "pagina": "número o vacío", "observacion": "una frase concreta si está incompleto o ausente"}.\n\nDOCUMENTO:\n${d._text.slice(0,45000)}`);
  if(Array.isArray(r.data)){const arr=r.data;d.rev=items.map((t,i)=>{const a=arr.find(x=>+x.i===i)||arr[i]||{};const e=a.estado==="incompleto"?"inc":a.estado==="ausente"?"aus":"ok";return{t:t[0],est:e,pag:String(a.pagina||""),obs:a.observacion||""};});d.revVia="ia";}
  else{const parts=d._text.split(/\[Página (\d+)\]/);const pg=[];for(let k=1;k<parts.length;k+=2)pg.push([parts[k],parts[k+1]||""]);if(!pg.length)pg.push(["",d._text]);
    d.rev=items.map(t=>{const hit=pg.find(x=>t[1].test(x[1]));return{t:t[0],est:hit?"ok":"aus",pag:hit?hit[0]:"",obs:hit?"":"No se encontró en el texto; verifica en el documento."};});d.revVia="auto";}
  U.busy=null;log(`Revisión de contenido de ${d.nombre}: ${d.rev.filter(x=>x.est!=="ok").length} ítem(s) por resolver.`);save();render();
}
async function ingestCert(rd,fuente,arch){
  const p=P();let r={err:"off"};let x,via="auto";
  if(aiReady())r=await aiFromRead(`Lee este certificado de calidad de un material de construcción. Responde solo JSON: {"material","proveedor","lote","norma","fecha" (AAAA-MM-DD),"cantidad","resultado": "Cumple"|"No cumple"|""}.`,rd);
  if(r.data){x=r.data;via="ia";}else if(!rd.scanned)x=rulesCert(rd.text);else{x={};via="scan";}
  const c={id:nextId(p.certificados,"CE-"),material:x.material||"",proveedor:x.proveedor||"",lote:x.lote||"",norma:x.norma||"",fecha:x.fecha||TODAY,cantidad:x.cantidad||"",resultado:x.resultado||"",flujo:"borrador",via,aiErr:r.err,fuente,archivo:arch||null,_text:rd.text};
  p.certificados.push(c);log(`Certificado ${c.id} cargado${c.material?": "+c.material:""}.`);save();openSheet("cert",c.id);
}

/* ============================================================
   Acciones: IA de redacción
   ============================================================ */
async function aiObs(itemId){
  const i=P().inspecciones.find(x=>x.id===U.sel);const it=chkItems(i.tipo).find(x=>x.id===itemId);const a=i.resp[itemId]||{};
  const nota=(document.querySelector(`[data-obs="${itemId}"]`)?.value||a.obs||"").trim();
  if(!nota){toast("Escribe primero una nota corta.");return;}
  if(!aiReady()){toast("Activa la IA (arriba) para redactar.");return;}
  U.busy="obs-"+itemId;render();
  const r=await aiText(`Redacta en una o dos frases, en español técnico de supervisión técnica en Colombia, la observación de una revisión de obra. Ítem: "${it.t}". Elemento: ${elLabel(i)}, ${i.ident}. Resultado: ${a.e==="NC"?"no cumple":a.e==="C"?"cumple":"sin evaluar"}. Nota del residente: "${nota}". Devuelve solo la observación, sin comillas.`,{modelTier:"quick"});
  U.busy=null;if(r.text){i.resp[itemId]=Object.assign({},a,{obs:r.text});save();}else toast(aiErrMsg(r.err));render();
}
function readNCForm(n){if(!n||!$("ncTit"))return;n.origen=$("ncOrig").value;n.torre=$("ncTorre").value;n.ubic=$("ncUb").value;n.titulo=$("ncTit").value;n.descripcion=$("ncDesc").value;n.numeral=$("ncNum").value;n.limite=$("ncLim").value;n.requerida=$("ncReq").value;if($("ncNota"))n.nota=$("ncNota").value;}
async function aiNC(){
  const S=U.sheet;const n=S.draft||P().nc.find(x=>x.id===S.id);readNCForm(n);
  const nota=(n.nota||"").trim();if(!nota){toast("Escribe una nota corta de lo que viste.");return;}
  if(!aiReady()){toast("Activa la IA (arriba) para redactar.");return;}
  U.busy="nc";renderSheet();
  const fotos=(n.fotos||[]).filter(id=>PH.has(id)).slice(0,3);let images;
  if(fotos.length&&AI_IMG)images=await Promise.all(fotos.map(id=>fetch(PH.get(id)).then(r=>r.blob())));
  const r=await aiJSON(`Eres el residente de una supervisión técnica independiente en Colombia. Con la nota${images?" y las fotos adjuntas":""}, redacta una no conformidad formal dirigida al constructor. Ubicación: ${n.ubic||"(sin dato)"}, ${n.torre||""}. Origen: ${n.origen||""}. Nota: "${nota}".\nResponde solo JSON: {"titulo" (máx. 12 palabras),"descripcion" (2-3 frases: lo observado y lo exigido),"numeral" (numeral NSR-10 u otra norma incumplida, o "Planos de diseño"),"requerida" (acción que se le exige al constructor),"diasLimite" (días razonables para responder)}.`,images?{images}:{});
  U.busy=null;
  if(r.data){const x=r.data;Object.assign(n,{titulo:x.titulo||n.titulo,descripcion:x.descripcion||n.descripcion,numeral:x.numeral||n.numeral,requerida:x.requerida||n.requerida});if(x.diasLimite&&!n.limite)n.limite=addD(TODAY,Math.max(1,Math.min(60,+x.diasLimite||5)));n._ai='<div class="note ok">Redactado por la IA. Revisa antes de emitir.</div>';}
  else toast(aiErrMsg(r.err));
  S.keep=false;renderSheet();
}

function readRepForm(rep){if(!rep)return;if($("repDesde")){rep.desde=$("repDesde").value||rep.desde;rep.hasta=$("repHasta").value||rep.hasta;}
  document.querySelectorAll("[data-rep]").forEach(x=>{rep[x.dataset.rep]=x.value;});}
function datosIA(rep,R){return{periodo:`${rep.desde} a ${rep.hasta}`,inspecciones:R.ins.map(x=>({fecha:x.i.fecha,elemento:elLabel(x.i),identificacion:x.i.ident,estado:INSP[x.s.estado][0],porCorregir:x.s.nc,observaciones:Object.values(x.i.resp||{}).filter(a=>a&&a.obs).map(a=>a.obs)})),
  ensayos:R.ens.map(r=>({material:r.tl,muestra:r.cod,ubicacion:r.loc,especificada:r.fc,resultado:r.base!=null?+(+r.base).toFixed(1):null,estado:(EST_ENS[r.est]||[r.est])[0]})),
  ncAbiertas:R.ncA.map(n=>({id:n.id,titulo:n.titulo,estado:NCE[n.estado][0],limite:n.limite,vencida:ncVencida(n)})),ncEmitidas:R.ncN.map(n=>n.titulo),ncLevantadas:R.ncC.map(n=>n.titulo),certificados:R.certs.map(c=>c.material),avance:rep.avance};}
async function aiConcl(id){
  const p=P();const rep=p.informes.find(r=>r.id===id);readRepForm(rep);const R=repData(rep);
  if(!aiReady()){toast("Configura la IA en «Mi empresa» para redactar.");return;}
  U.busy="concl";render();
  const r=await aiText(`Eres el director de una supervisión técnica independiente en Colombia (NSR-10, Título I). Redacta las ${rep.tipo==="final"?"declaraciones de la certificación técnica":"conclusiones y recomendaciones del acta mensual"} del proyecto ${p.nombre}. Usa solo estos datos, sin inventar cifras. Escribe 1 párrafo y luego 2 a 4 recomendaciones concretas, cada una en una línea que empiece con "- ". Español técnico y directo, sin títulos.\n\nDATOS:\n${JSON.stringify(datosIA(rep,R))}`);
  U.busy=null;if(r.text){rep.concl=r.text;rep.aiNote="Texto redactado por la IA con los datos del periodo. Revísalo antes de aprobar.";save();}else toast(aiErrMsg(r.err));render();
}
async function aiRepTxt(k){
  const p=P();const rep=p.informes.find(r=>r.id===U.sel);readRepForm(rep);const R=repData(rep);
  if(!aiReady()){toast("Configura la IA en «Mi empresa» para redactar.");return;}
  if(!R.ins.length){toast("No hay inspecciones en el periodo.");return;}
  U.busy="concl";render();
  const r=await aiText(`Eres el residente de una supervisión técnica independiente en Colombia. Redacta un resumen breve (3 a 5 frases) de las inspecciones del periodo para el ${REPS[rep.tipo].toLowerCase()} del proyecto ${p.nombre}: qué elementos se revisaron, qué hubo que corregir y cómo quedaron. Usa solo estos datos, sin inventar. Español técnico, sin títulos ni viñetas.\n\nDATOS:\n${JSON.stringify(datosIA(rep,R).inspecciones)}`);
  U.busy=null;if(r.text){rep[k]=r.text;save();}else toast(aiErrMsg(r.err));render();
}
function syncAvance(p,rep){/* el informe más reciente define el avance vigente del proyecto */
  const last=p.informes.filter(r=>(r.avance||[]).length).sort((a,b)=>(b.hasta||"").localeCompare(a.hasta||"")||b.id.localeCompare(a.id))[0];
  if(last&&last.id===rep.id)p.avance=rep.avance.map(a=>({act:a.act,pct:+a.pct||0}));}
function refreshPrev(){const rep=P()?.informes.find(r=>r.id===U.sel);const el=$("repPrev");if(rep&&el)el.innerHTML=repHTML(rep);}
function newNC(extra){const p=P();openSheet("nc",null,{draft:Object.assign({id:"",fecha:TODAY,origen:"",torre:(p.torres||[])[0]||"",ubic:"",titulo:"",descripcion:"",numeral:"",requerida:"",limite:"",fotos:[],estado:"abierta",flujo:"borrador",resp:[]},extra||{})});}
function photoTarget(ctx){const[k,id]=ctx.split(":");const p=P();
  if(k==="insp")return p.inspecciones.find(x=>x.id===id)?.fotos;
  if(k==="nc")return(id==="draft"?U.sheet&&U.sheet.draft:p.nc.find(x=>x.id===id))?.fotos;
  if(k==="resp")return U.respDraft[id]?.fotos;
  if(k==="ni")return U.sheet&&(U.sheet.fotos||(U.sheet.fotos=[]));return null;}
function crearProyecto(){
  const nom=$("npNom").value.trim();if(!nom){toast("Escribe el nombre del proyecto.");return;}const sis=[...document.querySelectorAll('[data-sys="new"]:checked')].map(x=>x.value);if(!sis.length){toast("Elige al menos un sistema estructural.");return;}
  const me=ME();const np={id:uid("P"),empresaId:me.empresaId,nombre:nom,direccion:"",municipio:$("npMun").value.trim(),propietario:"",constructora:$("npCons").value.trim()||"Constructora",directorObra:$("npDir").value.trim(),licencia:$("npLic").value.trim(),curaduria:"",area:"",unidades:"",inicio:TODAY,contrato:"",
    sistemas:sis,torres:$("npTorres").value.split(",").map(s=>s.trim()).filter(Boolean),miembros:[{uid:me.id,rol:me.rol==="constructor"?"director":me.rol}],documentos:[],certificados:[],inspecciones:[],nc:[],informes:[],actividad:[],avance:[],fotos:[],fotoDesc:{}};
  if(!np.torres.length)np.torres=["General"];D.proyectos.push(np);SES.pid=np.id;saveSes();log("Proyecto creado.");save();U.sheet=null;go("proyecto");toast("Proyecto creado. Ahora asigna el equipo del proyecto.");}
async function guardarUsuario(id){
  const nom=$("usNom").value.trim(),usr=$("usUser").value.trim().toLowerCase(),pass=$("usPass").value;
  if(!nom||!usr){toast("Escribe el nombre y el usuario.");return;}
  if(!/^[a-z0-9._-]{3,}$/.test(usr)){toast("El usuario debe tener al menos 3 caracteres: letras, números, punto o guion.");return;}
  if(D.usuarios.some(u=>u.usuario.toLowerCase()===usr&&u.id!==id)){toast("Ese usuario ya existe.");return;}
  if(!id&&pass.length<6){toast("La contraseña debe tener al menos 6 caracteres.");return;}
  if(id&&pass&&pass.length<6){toast("La contraseña debe tener al menos 6 caracteres.");return;}
  let u=id?userById(id):null;const nuevo=!u;
  if(nuevo){const nid=uid("u");u={id:nid,salt:nid+"-"+Math.random().toString(36).slice(2,8),activo:true};D.usuarios.push(u);}
  Object.assign(u,{nombre:nom,usuario:usr,rol:$("usRol").value,esAdmin:$("usAdmin").disabled?u.esAdmin:$("usAdmin").checked,empresaId:esOwner()&&$("usEmp")?$("usEmp").value:(u.empresaId||ME().empresaId),cargo:$("usCargo").value.trim(),profesion:$("usProf").value.trim(),matricula:$("usMat").value.trim(),correo:$("usCorreo").value.trim(),constructora:$("usCons").value.trim()});
  if($("usActivo"))u.activo=$("usActivo").checked;
  if(pass)u.pass=await hashPass(pass,u.salt);
  save();const back=U.sheet&&U.sheet.back;U.sheet=back?{kind:"emp",id:back}:null;render();toast(nuevo?`Usuario creado. Entra con «${usr}» y la contraseña que definiste.`:"Usuario guardado.");}
function respaldo(){const ens={};for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(/^mi-sti-ens-/.test(k))ens[k]=localStorage.getItem(k);}
  const b64=blob=>new Promise(res=>{const r=new FileReader();r.onload=()=>res(r.result);r.onerror=()=>res(null);r.readAsDataURL(blob);});
  return Promise.all([IDB.all().catch(()=>[]),ARCH.all().catch(()=>[])]).then(async([fotos,arch])=>{const archivos=[];for(const[k,v]of arch){const d=await b64(v.blob);if(d)archivos.push([k,{nombre:v.nombre,tipo:v.tipo,data:d}]);}
    return new Blob([JSON.stringify({app:"Mi STI",exportado:TODAY,datos:D,ensayos:ens,fotos,archivos})],{type:"application/json"});});}

/* ============================================================
   Eventos
   ============================================================ */
document.addEventListener("submit",async ev=>{if(ev.target.id!=="loginForm")return;ev.preventDefault();
  const u=await login($("lgUser").value,$("lgPass").value);
  if(!u){U.loginErr="Usuario o contraseña incorrectos, o la cuenta está inactiva.";render();return;}
  U.loginErr="";U.view=P()?"tablero":"inicio";refreshAi();render();});
document.addEventListener("click",async ev=>{
  const el=ev.target.closest("[data-act]");
  if(!el){if(ev.target===$("scrim"))closeSheet();if(ev.target.closest("#lightbox"))$("lightbox").hidden=true;return;}
  const act=el.dataset.act,v=el.dataset.v,id=el.dataset.id;const p=P();
  if(act!=="delRec"&&U.delArm){U.delArm=null;}
  switch(act){
    case"delRec":{const k=el.dataset.k,key=k+":"+id;if(U.delArm!==key){U.delArm=key;render();break;}U.delArm=null;
      const L={doc:"documentos",cert:"certificados",insp:"inspecciones",nc:"nc",rep:"informes"}[k];const rec=p[L].find(x=>x.id===id);if(!rec||!puedeBorrar(rec))break;
      p[L]=p[L].filter(x=>x!==rec);if(rec.archivo)ARCH.del(rec.archivo.id);
      if(k==="nc"&&rec.insp)delete rec.insp;
      log(`Registro borrado: ${rec.id} ${rec.nombre||rec.titulo||rec.material||(rec.tipo&&REPS[rec.tipo])||elLabel&&k==="insp"&&elLabel(rec)||""}.`);save();
      U.sheet=null;const back={doc:"documentos",cert:"materiales",insp:"inspecciones",nc:"nc",rep:"informes"}[k];toast(`${rec.id} borrado.`);go(back);break;}
    case"fillLogin":$("lgUser").value=el.dataset.u;$("lgPass").value=el.dataset.p;$("lgPass").focus();break;
    case"logout":logout();U.view="inicio";U.sheet=null;render();break;
    case"nav":go(v);break;
    case"openProj":abrirProyecto(id);if(v)go(v);break;
    case"goto":
      if(v==="cert"){go("materiales");openSheet("cert",id);}
      else if(v==="documentos"&&id){go("documentos");if(p.documentos.find(x=>x.id===id))openSheet("doc",id);}
      else if(v==="nc"&&id){go("nc");openSheet("nc",id);}
      else if(v==="inspeccion"){U.tabInsp="antes";U.openItem={};go("inspeccion",id);}
      else if(v==="ensayos"){go("ensayos");}
      else go(v,id);break;
    case"aiOn":if(PERM){await PERM.request(["sample"]).catch(()=>null);}await refreshAi();if(AI_STATE==="on")toast("IA activa.");break;
    case"closeSheet":closeSheet();break;
    case"zoom":{const lb=$("lightbox");lb.innerHTML=`<img src="${PH.get(id)}" alt="Foto">`;lb.hidden=false;break;}
    case"delPhoto":{const arr=photoTarget(el.dataset.ctx);if(arr){const k=arr.indexOf(id);if(k>=0)arr.splice(k,1);}if(!id.startsWith("demo"))IDB.del(id).catch(()=>{});save();render();break;}
    case"openDoc":openSheet("doc",id);break;
    case"openCert":openSheet("cert",id);break;
    case"openNC":openSheet("nc",id);break;
    case"tabEns":U.tabEns=v;render();break;
    case"quitarFP":delete p.fotoPrincipal;save();render();break;
    case"pdfLista":{const h=pdfListaHTML(v);if(h)exportPDF(h,fname(v==="proyectos"?(EMP()||{}).razon:p.nombre,v,TODAY));break;}
    case"pdfEns":exportPDF(pdfEnsHTML(p),fname(p.nombre,"ensayos",TODAY));break;
    case"tabInsp":U.tabInsp=v;render();break;
    case"sampleDoc":{const k=el.dataset.k;let key=k==="cert"?"cert":"licencia";if(k==="doc"){const t=$("up-doc-tipo")?.value;key=t==="suelos"?"suelos":"licencia";}handleUpload(k,null,key);break;}
    case"revDoc":await reviewDoc(id);break;
    case"saveDoc":{const d=p.documentos.find(x=>x.id===id);d.nombre=$("docNom").value;{const nt=$("docTipo").value;if(nt!==d.tipo&&(d.rev||[]).length&&(d.rev[0].t!==(REV[nt]?.items[0]||[])[0])){d.rev=[];d.revVia="";}d.tipo=nt;}d.version=$("docVer").value;d.fecha=$("docFecha").value;d.vence=$("docVence").value;
      document.querySelectorAll("[data-dato]").forEach(x=>{d.datos[x.dataset.dato]=x.value;});Object.keys(d.datos).forEach(k=>{if(!d.datos[k])delete d.datos[k];});save();render();toast("Documento guardado.");break;}
    case"licToProj":{const d=p.documentos.find(x=>x.id===id);const g=k=>d.datos[k]||"";
      Object.assign(p,{licencia:g("Número")||p.licencia,curaduria:g("Curaduría")||p.curaduria,area:g("Área construida")||p.area,unidades:g("Unidades")||p.unidades,propietario:g("Titular")||p.propietario,direccion:g("Dirección")||p.direccion});save();render();toast("Datos del proyecto actualizados con la licencia.");break;}
    case"verArch":case"bajarArch":{const rec=(el.dataset.k==="doc"?p.documentos:p.certificados).find(x=>x.id===id);if(rec&&rec.archivo)abrirArchivo(rec.archivo,act==="bajarArch");break;}
    case"revManual":{const d=p.documentos.find(x=>x.id===id);if(!d||!REV[d.tipo])break;d.rev=REV[d.tipo].items.map(t=>({t:t[0],est:"",pag:"",obs:""}));d.revVia="manual";save();renderSheet();break;}
    case"pdfDoc":{const d=p.documentos.find(x=>x.id===id);exportPDF(pdfDocHTML(d),fname(p.nombre,"documento",d.nombre));break;}
    case"flujo":{const k=el.dataset.k;let rec;
      if(k==="doc")rec=p.documentos.find(x=>x.id===id);else if(k==="cert")rec=p.certificados.find(x=>x.id===id);
      else if(k==="nc"){rec=p.nc.find(x=>x.id===id);if(rec)readNCForm(rec);}
      else if(k==="rep"){rec=p.informes.find(x=>x.id===id);readRepForm(rec);if(rec&&rec.tipo!=="semanal"&&!rec.concl)rec.concl=defaultConcl(rec,repData(rec));}
      if(!rec)break;rec.flujo=v;delete rec._ai;delete rec.aiNote;
      const nm=rec.nombre||rec.titulo||rec.material||(rec.tipo&&REPS[rec.tipo])||"";
      log(`${v==="aprobado"?(k==="nc"?"Emitida al constructor":"Aprobado y publicado"):v==="devuelto"?"Devuelto con observaciones":v==="borrador"?"Reabierto por el director":"Enviado a revisión"}: ${rec.id} ${nm}.`);
      save();render();toast(v==="aprobado"?(k==="nc"?"No conformidad emitida. El constructor ya la puede ver y responder.":"Aprobado. El constructor ya lo puede ver."):v==="revision"?"Enviado al director para revisión.":v==="borrador"?"Reabierto: ya se puede corregir. Vuelve a aprobarlo cuando termines.":"Devuelto al residente.");break;}
    case"saveCert":{const c=p.certificados.find(x=>x.id===id);Object.assign(c,{material:$("cMat").value,proveedor:$("cProv").value,lote:$("cLote").value,norma:$("cNorma").value,cantidad:$("cCant").value,fecha:$("cFecha").value,resultado:$("cRes").value});save();render();toast("Certificado guardado.");break;}
    case"pdfCert":{const c=p.certificados.find(x=>x.id===id);exportPDF(hdrHTML("Control de certificado de calidad",c.id)+`<h2>Certificado ${c.id}</h2><table><colgroup><col style="width:28%"><col></colgroup><tbody><tr><th>Material</th><td>${esc(c.material)}</td></tr><tr><th>Proveedor</th><td>${esc(c.proveedor)}</td></tr><tr><th>Lote o colada</th><td>${esc(c.lote)}</td></tr><tr><th>Norma</th><td>${esc(c.norma)}</td></tr><tr><th>Fecha</th><td>${fd(c.fecha)}</td></tr><tr><th>Cantidad</th><td>${esc(c.cantidad)}</td></tr><tr><th>Resultado</th><td class="${c.resultado==="Cumple"?"st-ok":"st-nc"}">${esc(c.resultado||"—")}</td></tr><tr><th>Revisión de la supervisión</th><td>${FLUJO[c.flujo||"borrador"][0]}</td></tr><tr><th>Archivo adjunto</th><td>${c.archivo?esc(c.archivo.nombre):"Sin archivo"}</td></tr></tbody></table>`+firmasHTML(),fname(p.nombre,"certificado",c.id));break;}
    case"ncFromEns":{const r=resumenEns(p).rows.find(x=>x.app===el.dataset.k&&x.cod===id);if(!r)break;newNC({ensayo:r.app+":"+r.cod,origen:`Ensayo de ${r.tl.toLowerCase()}, muestra ${r.cod}`,ubic:r.loc||r.elemento,nota:`Muestra ${r.cod} de ${r.tl.toLowerCase()}: ${r.base!=null?f1(r.base)+" MPa":"sin resultado a 28 días"} para ${f1(r.fc)} MPa especificados (${(EST_ENS[r.est]||[r.est])[0].toLowerCase()})`});break;}
    case"newInsp":if(!tiposDe(p).length){toast("Primero elige el sistema estructural del proyecto.");go("proyecto");break;}openSheet("newInsp",null,{fotos:[]});break;
    case"createInsp":{const nivel=$("niNivel").value.trim();if(!nivel){toast("Escribe el nivel del elemento.");break;}
      const i={id:nextId(p.inspecciones,"I-"),fecha:$("niFecha").value||TODAY,torre:$("niTorre").value,nivel,tipo:$("niTipo").value,ident:$("niIdent").value.trim()||"—",resp:{},fotos:U.sheet.fotos||[],conforme:"",conf:{antes:"",durante:"",despues:""},obs:""};
      p.inspecciones.push(i);log(`Inspección ${i.id} creada: ${elLabel(i)}.`);save();U.sheet=null;U.tabInsp="antes";U.openItem={};go("inspeccion",i.id);break;}
    case"ans":{if(!canEdit())break;const i=p.inspecciones.find(x=>x.id===U.sel);const a=i.resp[id]||{};const nv=a.e===v?null:v;i.resp[id]=Object.assign({},a,{e:nv});if(nv!=="NC")delete i.resp[id].fix;
      if(nv==="NC"){U.openItem[id]=true;const fa=(chkItems(i.tipo).find(x=>x.id===id)||{}).fase;i.conf=i.conf||{};if(fa&&i.conf[fa]){i.conf[fa]="";i.conforme="";toast("La fase vuelve a revisión: hay un ítem que no cumple.");}}save();render();break;}
    case"toggleItem":U.openItem[id]=!U.openItem[id];render();break;
    case"aiObs":await aiObs(id);break;
    case"confFase":{const i=p.inspecciones.find(x=>x.id===id);i.conf=i.conf||{};i.conf[v]=TODAY;const lbl=FASES.find(x=>x[0]===v)[1].toLowerCase();
      if(FASES.every(([k])=>i.conf[k])){i.conforme=TODAY;log(`Elemento conforme en las tres fases: ${elLabel(i)}.`);toast("Fase conforme. El elemento queda conforme.");}
      else{log(`Fase «${lbl}» conforme: ${elLabel(i)}.`);toast("Fase declarada conforme.");const nx=FASES.find(([k])=>!i.conf[k]);if(nx)U.tabInsp=nx[0];}
      save();render();break;}
    case"reabrirFase":{const i=p.inspecciones.find(x=>x.id===id);i.conf=i.conf||{};i.conf[v]="";i.conforme="";save();render();break;}
    case"pdfInspList":{const l=inspFiltradas();exportPDF(pdfInspListHTML(l),fname(p.nombre,"inspecciones",U.fi.mes||"todas"));break;}
    case"pdfInsp":{const i=p.inspecciones.find(x=>x.id===id);exportPDF(pdfInspHTML(i),fname(p.nombre,"inspeccion",i.id,CHK[i.tipo]?.label,i.nivel));break;}
    case"clearFi":U.fi={mes:"",torre:"",estado:"",q:""};render();break;
    case"ncFromItem":{const i=p.inspecciones.find(x=>x.id===U.sel);const it=chkItems(i.tipo).find(x=>x.id===id);const a=i.resp[id]||{};
      newNC({insp:i.id,item:id,origen:`Inspección ${i.id}`,torre:i.torre,ubic:`${i.ident}, ${i.nivel}`,nota:a.obs||it.t,fotos:(i.fotos||[]).slice()});break;}
    case"newNC":newNC();break;
    case"aiNC":await aiNC();break;
    case"saveNC":{const S=U.sheet;if(S.draft){const n=S.draft;readNCForm(n);if(!n.titulo.trim()){toast("Escribe un título o usa la IA para redactarla.");break;}
        n.id=nextId(p.nc,"NC-");delete n._ai;p.nc.push(n);log(`No conformidad ${n.id} en borrador: ${n.titulo}.`);save();U.sheet={kind:"nc",id:n.id};render();toast(`${n.id} guardada como borrador.`);}
      else{const n=p.nc.find(x=>x.id===S.id);readNCForm(n);delete n._ai;save();render();toast("No conformidad guardada.");}break;}
    case"sendResp":{const n=p.nc.find(x=>x.id===id);const rd=U.respDraft[id];rd.correctiva=$("rCorr").value.trim();rd.preventiva=$("rPrev").value.trim();
      if(!rd.correctiva){toast("Describa cómo va a reparar o subsanar.");break;}
      n.resp.push({id:uid("R"),fecha:TODAY,autor:who(),correctiva:rd.correctiva,preventiva:rd.preventiva,fotos:rd.fotos.slice(),veredicto:"",obs:""});n.estado="respondida";delete U.respDraft[id];
      log(`Respuesta del constructor a ${n.id}.`);save();render();toast("Respuesta enviada a la supervisión.");break;}
    case"veredicto":{const n=p.nc.find(x=>x.id===id);const x=n.resp.find(y=>!y.veredicto);const obs=$("vObs").value.trim();
      if(v==="rechazada"&&!obs){toast("Escribe por qué se rechaza la respuesta.");break;}
      Object.assign(x,{veredicto:v,obs,fechaV:TODAY});if(v==="aceptada"){n.estado="cerrada";n.cierre=TODAY;}else n.estado="abierta";
      log(`${n.id} ${v==="aceptada"?"levantada tras verificar en obra":"con respuesta rechazada"}.`);save();render();toast(v==="aceptada"?"No conformidad levantada.":"Respuesta rechazada. La NC sigue abierta.");break;}
    case"pdfNC":{const n=p.nc.find(x=>x.id===id);exportPDF(pdfNCHTML(n),fname(p.nombre,"no-conformidad",n.id));break;}
    /* Informes */
    case"genRep":{const tipo=$("nrTipo").value,desde=$("nrDesde").value,hasta=$("nrHasta").value;if(!desde||!hasta||desde>hasta){toast("Revisa las fechas de cobertura.");break;}
      const rep={id:nextId(p.informes.filter(r=>r.tipo===tipo),REPP[tipo],3),tipo,desde,hasta,creado:TODAY,flujo:"borrador",txtInsp:"",aspectos:"",txtDoc:"",txtCert:"",txtEns:"",concl:"",fotos:[],avance:tipo==="final"?[]:avanceInicial(p)};
      if(tipo!=="semanal")rep.concl=defaultConcl(rep,repData(rep));
      if(tipo==="semanal")rep.aspectos=sugerirAspectos(rep);
      p.informes.push(rep);log(`Informe ${rep.id} generado: ${REPS[tipo]}.`);save();go("informe",rep.id);break;}
    case"aiConcl":await aiConcl(id);break;
    case"aiRepTxt":await aiRepTxt(el.dataset.k);break;
    case"sugAsp":{const rep=p.informes.find(x=>x.id===U.sel);readRepForm(rep);const s=sugerirAspectos(rep);if(!s){toast("No hubo correcciones ni NC en el periodo.");break;}rep.aspectos=(rep.aspectos?rep.aspectos.trim()+"\n":"")+s;save();render();break;}
    case"avAdd":{const rep=p.informes.find(x=>x.id===U.sel);readRepForm(rep);rep.avance=rep.avance||[];rep.avance.push({act:"",ant:0,pct:0});save();render();break;}
    case"avDel":{const rep=p.informes.find(x=>x.id===U.sel);readRepForm(rep);rep.avance.splice(+el.dataset.i,1);syncAvance(p,rep);save();render();break;}
    case"pdfRep":{const rep=p.informes.find(x=>x.id===id);if(canEdit()&&rep.flujo!=="aprobado"){readRepForm(rep);save();}exportPDF(repHTML(rep),fname(p.nombre,REPS[rep.tipo],rep.desde,rep.hasta));break;}
    /* Fotos */
    case"togPh":{const ctx=el.dataset.ctx;
      if(ctx==="rep"){const rep=p.informes.find(x=>x.id===U.sel);if(!rep||!canEdit()||rep.flujo==="aprobado")break;readRepForm(rep);rep.fotos=rep.fotos||[];const k=rep.fotos.indexOf(id);if(k>=0)rep.fotos.splice(k,1);else rep.fotos.push(id);save();render();}
      else{const k=U.selFotos.indexOf(id);if(k>=0)U.selFotos.splice(k,1);else U.selFotos.push(id);render();}break;}
    case"selAllPh":{const f=U.ff;const l=allPhotos(p).filter(x=>(!f.desde||x.fecha>=f.desde)&&(!f.hasta||x.fecha<=f.hasta)&&(!f.torre||x.torre===f.torre)&&(!f.origen||x.origen===f.origen)).map(x=>x.id);U.selFotos=U.selFotos.filter(i=>l.includes(i)).length===l.length?[]:l;render();break;}
    case"delSuelta":{p.fotos=(p.fotos||[]).filter(f=>f.id!==id);U.selFotos=U.selFotos.filter(i=>i!==id);IDB.del(id).catch(()=>{});save();render();break;}
    case"saveFotoUp":{const S=U.sheet;const fecha=$("fuFecha").value||TODAY,torre=$("fuTorre").value,desc=$("fuDesc").value.trim();p.fotos=p.fotos||[];(S.ids||[]).forEach(i=>p.fotos.push({id:i,fecha,torre,desc}));log(`${(S.ids||[]).length} foto(s) agregadas al registro fotográfico.`);save();U.sheet=null;
      if(fecha<U.ff.desde)U.ff.desde=fecha;if(fecha>U.ff.hasta)U.ff.hasta=fecha;render();toast("Fotos agregadas al registro.");break;}
    case"pdfFotos":{const f=U.ff;const l=allPhotos(p).filter(x=>(!f.desde||x.fecha>=f.desde)&&(!f.hasta||x.fecha<=f.hasta)&&(!f.torre||x.torre===f.torre)&&(!f.origen||x.origen===f.origen));
      const sel=U.selFotos.length?l.filter(x=>U.selFotos.includes(x.id)):l;if(!sel.length){toast("No hay fotos en ese rango.");break;}
      exportPDF(hdrHTML("Registro fotográfico",`Del ${fd(f.desde)} al ${fd(f.hasta)}`,`<b>Fotos:</b> ${sel.length}`)+(p.regTxt?`<h2>Resumen</h2><p class="lead">${esc(p.regTxt)}</p>`:"")+`<h2>Fotos</h2>${grid2PDF(sel)}`+firmasHTML(),fname(p.nombre,"registro-fotografico",f.desde,f.hasta));break;}
    /* Proyecto y equipo */
    case"newProj":openSheet("newProj",null,{sis:["porticos"]});break;
    case"createProj":crearProyecto();break;
    case"memAdd":{const uidv=$("memNew").value;if(!uidv){toast("Elige un usuario.");break;}p.miembros=p.miembros||[];p.miembros.push({uid:uidv,rol:$("memRol").value});log(`${userById(uidv)?.nombre} agregado al proyecto.`);save();render();toast("Usuario agregado al proyecto.");break;}
    case"memDel":{const m=p.miembros[+el.dataset.i];if(m&&m.uid===ME().id&&!esAdmin()){toast("No puedes quitarte a ti mismo.");break;}p.miembros.splice(+el.dataset.i,1);save();render();break;}
    case"confirmAsk":U.confirm=v;render();break;
    case"confirmNo":U.confirm=false;render();break;
    case"delProjYes":{D.proyectos=D.proyectos.filter(x=>x.id!==p.id);SES.pid=null;saveSes();save();U.confirm=false;go("inicio");toast("Proyecto eliminado.");break;}
    /* Administración */
    case"newEmp":openSheet("newEmp");break;
    case"openEmp":openSheet("emp",id);break;
    case"createEmp":{const razon=$("neRazon").value.trim(),nom=$("neNom").value.trim(),usr=$("neUser").value.trim().toLowerCase(),pass=$("nePass").value;
      if(!razon||!nom||!usr){toast("Completa la razón social, el nombre y el usuario del administrador.");break;}
      if(!/^[a-z0-9._-]{3,}$/.test(usr)){toast("El usuario debe tener al menos 3 caracteres: letras, números, punto o guion.");break;}
      if(D.usuarios.some(u=>u.usuario.toLowerCase()===usr)){toast("Ese usuario ya existe.");break;}if(pass.length<6){toast("La contraseña debe tener al menos 6 caracteres.");break;}
      const e={id:uid("E"),razon,nit:$("neNit").value.trim(),rep:"",dir:"",ciudad:$("neCiudad").value.trim(),tel:"",correo:"",logo:"",paleta:{id:"pizarra"},creada:TODAY,activa:true};D.empresas.push(e);
      const nid=uid("u");const salt=nid+"-"+Math.random().toString(36).slice(2,8);D.usuarios.push({id:nid,usuario:usr,nombre:nom,rol:$("neRol").value,empresaId:e.id,esAdmin:true,activo:true,cargo:"",profesion:"",matricula:"",correo:"",salt,pass:await hashPass(pass,salt)});
      save();U.sheet={kind:"emp",id:e.id};render();toast(`Empresa creada. El administrador entra con «${usr}».`);break;}
    case"newUser":openSheet("user",null,{emp:id||null,back:U.sheet&&U.sheet.kind==="emp"?U.sheet.id:null});break;
    case"openUser":openSheet("user",id,{back:U.sheet&&U.sheet.kind==="emp"?U.sheet.id:null});break;
    case"saveUser":await guardarUsuario(id||null);break;
    case"noLogo":{const e=empById(id);e.logo="";save();render();break;}
    case"saveIaKey":{const e=EMP();const k=$("iaKey").value.trim();try{if(k)localStorage.setItem("mi-sti-ia-"+e.id,k);else localStorage.removeItem("mi-sti-ia-"+e.id);}catch(x){}await refreshAi();render();toast(k?"Clave guardada en este navegador. La IA queda activa.":"Clave quitada.");break;}
    case"delIaKey":{const e=EMP();try{localStorage.removeItem("mi-sti-ia-"+e.id);}catch(x){}await refreshAi();render();break;}
    case"changePw":{const me=ME();const o=$("pwOld").value,n1=$("pwNew").value,n2=$("pwNew2").value;if(await hashPass(o,me.salt)!==me.pass){toast("La contraseña actual no es correcta.");break;}
      if(n1.length<6){toast("La nueva contraseña debe tener al menos 6 caracteres.");break;}if(n1!==n2){toast("Las contraseñas no coinciden.");break;}me.pass=await hashPass(n1,me.salt);save();render();toast("Contraseña cambiada.");break;}
    case"backup":{const b=await respaldo();await saveBlob(b,`mi-sti-respaldo-${TODAY}.json`);break;}
    case"resetYes":{const ks=[];for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(/^mi-sti-ens-/.test(k))ks.push(k);}ks.forEach(k=>localStorage.removeItem(k));if(U.ensMod){U.ensMod.api.destroy();U.ensMod=null;}
      localStorage.removeItem(LS);await cargarDatos();U.confirm=false;SES={uid:"u0"};saveSes();go("plataforma");toast("Datos de demostración restablecidos.");break;}
  }
});
document.addEventListener("change",async ev=>{
  const t=ev.target;const p=P();
  if(t.id==="restoreIn"){const f=t.files&&t.files[0];t.value="";if(!f)return;try{const j=JSON.parse(await f.text());if(!j.datos||!j.datos.v)throw 0;
      D=j.datos;Object.entries(j.ensayos||{}).forEach(([k,v])=>localStorage.setItem(k,v));for(const[k,v]of j.fotos||[]){PH.set(k,v);await IDB.put(k,v).catch(()=>{});}
      for(const[k,v]of j.archivos||[]){try{const blob=await (await fetch(v.data)).blob();await ARCH.put(k,{blob,nombre:v.nombre,tipo:v.tipo});}catch(e){}}
      await migrarDatos();save();
      if(!ME()){logout();}render();toast("Respaldo restaurado.");}catch(e){toast("Ese archivo no es un respaldo válido de Mi STI.");}return;}
  if(!ME())return;
  if(t.dataset.up){const f=t.files&&t.files[0];t.value="";if(f)handleUpload(t.dataset.up,f);}
  else if(t.dataset.arch){const f=t.files&&t.files[0];t.value="";if(!f)return;const list=t.dataset.arch==="doc"?p.documentos:p.certificados;const rec=list.find(x=>x.id===t.dataset.id);if(!rec)return;
    try{const old=rec.archivo;rec.archivo=await guardarArchivo(f);if(old)ARCH.del(old.id);log(`Archivo adjuntado a ${rec.id}: ${f.name}.`);save();renderSheet();toast("Archivo adjuntado.");}catch(e){toast("No se pudo guardar el archivo en este navegador.");}}
  else if(t.dataset.photo){const files=[...(t.files||[])];t.value="";if(!files.length)return;const ids=await addPhotos(files);
    if(t.dataset.photo==="reg"){if(ids.length)openSheet("fotoUp",null,{ids});return;}
    if(t.dataset.photo==="principal"){if(ids.length){p.fotoPrincipal=ids[0];p.fotos=p.fotos||[];p.fotos.push({id:ids[0],fecha:TODAY,desc:"Foto principal del proyecto",torre:"General"});log("Foto principal del proyecto actualizada.");save();render();toast("Foto principal actualizada.");}return;}
    const arr=photoTarget(t.dataset.photo);if(arr)arr.push(...ids);save();render();if(ids.length)toast(`${ids.length} foto(s) agregada(s).`);}
  else if(t.id==="projSel"){if(t.value==="__new"){t.value=SES.pid||"";openSheet("newProj",null,{sis:["porticos"]});}else if(t.value==="__none"){abrirProyecto(null);}else abrirProyecto(t.value);}
  else if(t.dataset.fi){U.fi[t.dataset.fi]=t.value;render();}
  else if(t.dataset.fn){U.fn[t.dataset.fn]=t.value;render();}
  else if(t.dataset.ff){U.ff[t.dataset.ff]=t.value;render();}
  else if(t.dataset.fu){U.fu[t.dataset.fu]=t.value;render();}
  else if(t.id==="nrTipo"){U.newRep=Object.assign({tipo:t.value},defRange(t.value));render();}
  else if(t.id==="nrDesde"||t.id==="nrHasta"){U.newRep[t.id==="nrDesde"?"desde":"hasta"]=t.value;}
  else if(t.id==="repDesde"||t.id==="repHasta"){const rep=p.informes.find(r=>r.id===U.sel);readRepForm(rep);save();render();}
  else if(t.dataset.rep||t.dataset.av){const rep=p.informes.find(r=>r.id===U.sel);if(t.dataset.av){const a=rep.avance[+t.dataset.av];a[t.dataset.k]=t.dataset.k==="act"?t.value:Math.max(0,Math.min(100,+t.value||0));syncAvance(p,rep);save();render();}else{readRepForm(rep);save();refreshPrev();}}
  else if(t.dataset.phcap){p.fotoDesc=p.fotoDesc||{};const s=(p.fotos||[]).find(f=>f.id===t.dataset.phcap);if(s)s.desc=t.value;else p.fotoDesc[t.dataset.phcap]=t.value;save();}
  else if(t.dataset.rev){const d=p.documentos.find(x=>x.id===t.dataset.rev);d.rev[+t.dataset.i].est=t.value;save();renderSheet();}
  else if(t.dataset.fp!==undefined&&t.tagName==="SELECT"){if(t.value){p.fotoPrincipal=t.value;save();render();toast("Foto principal actualizada.");}}
  else if(t.dataset.revpag||t.dataset.revobs){const d=p.documentos.find(x=>x.id===(t.dataset.revpag||t.dataset.revobs));const it=d.rev[+t.dataset.i];if(t.dataset.revpag)it.pag=t.value.trim();else it.obs=t.value.trim();save();}
  else if(t.dataset.fix){const i=p.inspecciones.find(x=>x.id===U.sel);const r=i.resp[t.dataset.fix];if(t.checked)r.fix=TODAY;else delete r.fix;save();render();}
  else if(t.dataset.sys==="proj"){p.sistemas=[...document.querySelectorAll('[data-sys="proj"]:checked')].map(x=>x.value);save();render();}
  else if(t.dataset.sys==="new"){U.sheet.sis=[...document.querySelectorAll('[data-sys="new"]:checked')].map(x=>x.value);$("npEffect").innerHTML=sysEffect(U.sheet.sis);}
  else if(t.dataset.pj){p[t.dataset.pj]=t.value;save();renderFrame();}
  else if(t.id==="pjTorres"){p.torres=t.value.split(",").map(s=>s.trim()).filter(Boolean);save();}
  else if(t.dataset.mrol){p.miembros[+t.dataset.mrol].rol=t.value;save();render();}
  else if(t.dataset.emp){const e=U.sheet&&U.sheet.kind==="emp"?empById(U.sheet.id):EMP();e[t.dataset.emp]=t.value;save();renderFrame();}
  else if(t.dataset.pal){const e=U.sheet&&U.sheet.kind==="emp"?empById(U.sheet.id):EMP();const c=paletaDe(e);e.paleta=t.dataset.pal==="custom"?{id:"custom",rail:e.paleta?.rail||c.rail,y:e.paleta?.y||c.y}:{id:t.dataset.pal};save();render();}
  else if(t.dataset.palc){const e=U.sheet&&U.sheet.kind==="emp"?empById(U.sheet.id):EMP();e.paleta=Object.assign({id:"custom"},e.paleta,{[t.dataset.palc]:t.value});save();render();}
  else if(t.dataset.logo){const f=t.files&&t.files[0];if(!f)return;try{empById(t.dataset.logo).logo=await compress(f,400);save();render();toast("Logo cargado. Ya aparece en los informes y PDF.");}catch(e){toast("No se pudo leer el logo.");}}
  else if(t.id==="empActiva"){empById(t.dataset.id).activa=t.checked;save();render();}
  else if(t.id==="demoToggle"){D.demo=t.checked;save();}
  else if(t.dataset.me){ME()[t.dataset.me]=t.value;save();renderFrame();}
});
document.addEventListener("input",ev=>{const t=ev.target;const p=P();if(!p)return;
  if(t.dataset.obs){const i=p.inspecciones.find(x=>x.id===U.sel);i.resp[t.dataset.obs]=Object.assign({},i.resp[t.dataset.obs],{obs:t.value});save();}
  else if(t.id==="inspObs"){const i=p.inspecciones.find(x=>x.id===U.sel);i.obs=t.value;save();}
  else if(t.dataset.rep){const rep=p.informes.find(r=>r.id===U.sel);if(rep){rep[t.dataset.rep]=t.value;save();}}
  else if(t.id==="regTxt"){p.regTxt=t.value;save();}
  else if(t.id==="rCorr"||t.id==="rPrev"){const id=U.sheet&&U.sheet.id;if(id&&U.respDraft[id])U.respDraft[id][t.id==="rCorr"?"correctiva":"preventiva"]=t.value;}
  else if(t.id==="ncNota"){const S=U.sheet;const n=S.draft||p.nc.find(x=>x.id===S.id);if(n)n.nota=t.value;}
});
document.addEventListener("dragover",ev=>{const d=ev.target.closest("[data-drop]");if(d){ev.preventDefault();d.classList.add("over");}});
document.addEventListener("dragleave",ev=>{const d=ev.target.closest("[data-drop]");if(d)d.classList.remove("over");});
document.addEventListener("drop",ev=>{const d=ev.target.closest("[data-drop]");if(!d)return;ev.preventDefault();d.classList.remove("over");const f=ev.dataTransfer.files&&ev.dataTransfer.files[0];if(f)handleUpload(d.dataset.drop,f);});
document.addEventListener("keydown",ev=>{if(ev.key==="Escape"){if(!$("lightbox").hidden)$("lightbox").hidden=true;else if(U.sheet)closeSheet();}
  if((ev.key==="Enter"||ev.key===" ")&&ev.target.matches&&ev.target.matches('[role="checkbox"][data-act]')){ev.preventDefault();ev.target.click();}});
/* Las apps de ensayos guardan en este mismo navegador: al cambiar su resumen se actualiza lo que se ve aquí (sin recargar la app abierta). */
window.addEventListener("storage",ev=>{if(ev.key&&/^mi-sti-ens-.*-resumen$/.test(ev.key)&&ME()&&P()&&U.view!=="ensayos")render();});

(async function init(){
  await cargarDatos();
  const h=(location.hash||"").slice(1);if(h)U.view=h;
  if(ME()&&P()&&U.view==="inicio")U.view="tablero";
  render();loadPhotos();refreshAi();calentarEnsayos();
})();
