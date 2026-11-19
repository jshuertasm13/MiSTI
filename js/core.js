"use strict";
/* ============================================================
   Utilidades
   ============================================================ */
const $=id=>document.getElementById(id);
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const pad=n=>String(n).padStart(2,"0");
const TODAY=(()=>{const d=new Date();return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;})();
const MES=["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"];
const fd=s=>{if(!s||!/^\d{4}-\d{2}-\d{2}$/.test(s))return s||"—";const[y,m,d]=s.split("-");return `${+d} ${MES[+m-1]} ${y}`;};
const dn=s=>{const[y,m,d]=s.split("-").map(Number);return Date.UTC(y,m-1,d)/864e5;};
const addD=(s,n)=>new Date((dn(s)+n)*864e5).toISOString().slice(0,10);
const days=(a,b)=>Math.round(dn(b)-dn(a));
const mean=a=>a.reduce((x,y)=>x+y,0)/a.length;
const f1=n=>n==null||isNaN(n)?"—":(+n).toLocaleString("es-CO",{minimumFractionDigits:1,maximumFractionDigits:1});
const uid=p=>p+Date.now().toString(36)+Math.random().toString(36).slice(2,6);
const slug=s=>String(s||"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
function toast(t){const el=$("toast");el.textContent=t;el.hidden=false;clearTimeout(toast.t);toast.t=setTimeout(()=>el.hidden=true,3600);}
/* ============================================================
   Almacenamiento y acceso
   Esta versión guarda los datos en el navegador (localStorage) y las fotos en IndexedDB.
   Todo pasa por D y save(); para conectar una base de datos en línea basta con reemplazar
   cargarDatos() y save().
   ============================================================ */
const LS="mi-sti-datos",LS_SES="mi-sti-sesion";
let D=null;
async function hashPass(pass,salt){
  const txt=salt+"|"+pass;
  try{const b=await crypto.subtle.digest("SHA-256",new TextEncoder().encode(txt));return [...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,"0")).join("");}
  catch(e){let h=5381;for(let i=0;i<txt.length;i++)h=((h<<5)+h+txt.charCodeAt(i))|0;return "x"+(h>>>0).toString(16);}
}
const DATA_V=4;
async function cargarDatos(){
  try{const raw=localStorage.getItem(LS);D=raw?JSON.parse(raw):null;}catch(e){D=null;}
  if(!D||!D.v||D.v>DATA_V){D=await seedDatos();
    for(const[k,v]of Object.entries(D.ensSeed||{})){try{if(!localStorage.getItem(k))localStorage.setItem(k,JSON.stringify(v));}catch(e){}}
    delete D.ensSeed;}
  await migrarDatos();save();
}
/* Actualiza los datos guardados en el navegador sin perder usuarios ni empresas */
async function migrarDatos(){
  if(D.v<2&&D.demo){
    /* un solo proyecto de demostración */
    const quitar=D.proyectos.filter(p=>p.id==="P1"||p.id==="P2");
    quitar.forEach(p=>{for(const k of["concreto","mamposteria"])for(const s of["","-resumen"])localStorage.removeItem(`mi-sti-ens-${k}-${p.id}${s}`);});
    D.proyectos=D.proyectos.filter(p=>!quitar.includes(p));
    if(!D.proyectos.some(p=>p.id==="P3")){const PE=proyectoEnsayo();D.proyectos.unshift(PE.P);for(const[k,v]of Object.entries(PE.ens))if(!localStorage.getItem(k))localStorage.setItem(k,JSON.stringify(v));}
    /* usuarios de ejemplo sobrantes: solo se quitan si siguen sin cambios */
    const demo={u2:["director2","Carlos Mejía Ríos"],u4:["residente2","Camila Ortiz Pava"],u6:["constructor2","Paula Cárdenas"]};
    for(const[id,[usr,nom]]of Object.entries(demo)){const u=D.usuarios.find(x=>x.id===id);if(!u)continue;
      if(u.usuario===usr&&u.nombre===nom&&u.pass===await hashPass(DEMO_PASS,u.salt)){D.usuarios=D.usuarios.filter(x=>x!==u);}}
    const ids=new Set(D.usuarios.map(u=>u.id));
    D.proyectos.forEach(p=>{p.miembros=(p.miembros||[]).filter(m=>ids.has(m.uid));
      if(p.id==="P3"){const keep=[];for(const rol of["director","residente","constructor"]){const m=p.miembros.find(x=>x.rol===rol&&x.uid!=="u0");if(m)keep.push(m);}
        if(p.miembros.some(x=>x.uid==="u0"))keep.push(p.miembros.find(x=>x.uid==="u0"));p.miembros=keep;}});
  }
  if(D.v<3&&D.demo){const p3=D.proyectos.find(p=>p.id==="P3");if(p3&&!p3.fotoPrincipal)p3.fotoPrincipal="demo-19";}
  for(const p of D.proyectos||[]){
    (p.inspecciones||[]).forEach(normInsp);
    /* consecutivo independiente por tipo de informe */
    (p.informes||[]).forEach(r=>{const m=/^(IS|AM|CTO)-(\d{1,2})$/.exec(r.id);if(m){const old=r.id;r.id=m[1]+"-"+m[2].padStart(3,"0");(p.actividad||[]).forEach(a=>{a.t=a.t.split(old+" ").join(r.id+" ");});}});
    if((p.informes||[]).some(r=>!/^(IS|AM|CTO)-\d{3}$/.test(r.id))){
      const nuevo=r=>/^(IS|AM|CTO)-\d{3}$/.test(r.id);const n={};
      for(const t of["semanal","mensual","final"])n[t]=Math.max(0,...p.informes.filter(r=>r.tipo===t&&nuevo(r)).map(r=>parseInt(r.id.replace(/^\D+/,""),10)||0));
      p.informes.slice().sort((a,b)=>(a.creado||"").localeCompare(b.creado||"")||(a.desde||"").localeCompare(b.desde||"")).forEach(r=>{if(nuevo(r))return;const old=r.id;r.id=REPP[r.tipo]+String(++n[r.tipo]).padStart(3,"0");
        (p.actividad||[]).forEach(a=>{a.t=a.t.split(old+" ").join(r.id+" ");});});}
  }
  D.proyectos.forEach(p=>{if(!p.concObra)p.concObra=[];});
  if(D.v<4&&D.demo){const p3=D.proyectos.find(p=>p.id==="P3");if(p3){const S=proyectoEnsayo().P;
    S.inspecciones.forEach(i=>{if(!p3.inspecciones.some(x=>x.id===i.id)){normInsp(i);p3.inspecciones.push(i);}});
    if(!p3.concObra.length)p3.concObra=S.concObra;
    if((p3.avance||[]).every(a=>!a.torre))p3.avance=S.avance;
    (p3.informes||[]).forEach(r=>{const sr=S.informes.find(x=>x.id===r.id&&x.tipo===r.tipo);if(sr&&(r.avance||[]).every(a=>!a.torre))r.avance=sr.avance.map(a=>Object.assign({},a));});}}
  if(D.v<4){const torreDe=(p,a)=>{if(a.torre)return;const t=(p.torres||[]).find(t=>a.act&&a.act.toLowerCase().includes(t.toLowerCase()));a.torre=t||"General";if(t){const r=a.act.replace(new RegExp("\\s*"+t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+"\\s*","i")," ").trim();if(r)a.act=r;}};
    D.proyectos.forEach(p=>{(p.avance||[]).forEach(a=>torreDe(p,a));(p.informes||[]).forEach(r=>(r.avance||[]).forEach(a=>torreDe(p,a)));});
D.proyectos.forEach(p=>(p.nc||[]).forEach(n=>{if(!n.motivo&&(n.ensayo||n.muestra))n.motivo="grave";}));
    const p3=D.demo&&D.proyectos.find(p=>p.id==="P3");if(p3)(p3.nc||[]).forEach(n=>{if(!n.motivo)n.motivo={"NC-01":"repetitiva","NC-04":"repetitiva"}[n.id]||"grave";});}
  D.v=DATA_V;
}
function save(){try{localStorage.setItem(LS,JSON.stringify(D));}catch(e){toast("No se pudo guardar en este navegador (espacio lleno).");}}
let SES=(()=>{try{return JSON.parse(localStorage.getItem(LS_SES)||"null")||{};}catch(e){return{};}})();
const saveSes=()=>{try{localStorage.setItem(LS_SES,JSON.stringify(SES));}catch(e){}};
const userById=id=>D?D.usuarios.find(u=>u.id===id):null;
const ME=()=>D&&SES.uid?D.usuarios.find(u=>u.id===SES.uid&&u.activo!==false)||null:null;
const empById=id=>D?D.empresas.find(e=>e.id===id):null;
async function login(usuario,pass){
  const u=D.usuarios.find(x=>x.usuario.toLowerCase()===String(usuario).trim().toLowerCase());
  if(!u||u.activo===false)return null;
  if(u.empresaId){const e=empById(u.empresaId);if(e&&e.activa===false)return null;}
  if(await hashPass(pass,u.salt)!==u.pass)return null;
  SES={uid:u.id,pid:null};const vis=proyectosVisibles();if(vis.length===1||(!esOwner()&&vis.length))SES.pid=vis[0].id;saveSes();return u;
}
function logout(){SES={};saveSes();}

/* ============================================================
   Permisos
   ============================================================ */
const esOwner=()=>ME()?.rol==="owner";
const esAdmin=()=>!!ME()?.esAdmin;
function proyectosVisibles(){const me=ME();if(!me||!D)return[];
  return D.proyectos.filter(p=>(p.miembros||[]).some(m=>m.uid===me.id)||(me.esAdmin&&p.empresaId===me.empresaId));}
function rolEn(p){const me=ME();if(!me||!p)return null;const m=(p.miembros||[]).find(x=>x.uid===me.id);if(m)return m.rol;
  if(me.esAdmin&&p.empresaId===me.empresaId)return"director";return null;}
const P=()=>{if(!SES.pid||!D)return null;const p=D.proyectos.find(x=>x.id===SES.pid);return p&&rolEn(p)?p:null;};
const ROL=()=>rolEn(P());
const canEdit=()=>ROL()==="director"||ROL()==="residente";
const canApprove=()=>ROL()==="director";
const isCons=()=>ROL()==="constructor";
const visible=r=>!isCons()||r.flujo==="aprobado";
const who=()=>ME()?.nombre||"";
/* La empresa que firma: la del proyecto abierto o, si no hay, la del usuario */
const EMP=()=>empById(P()?.empresaId||ME()?.empresaId)||null;
const miembrosRol=(p,rol)=>(p.miembros||[]).filter(m=>m.rol===rol).map(m=>userById(m.uid)).filter(u=>u&&u.rol!=="owner");

/* ============================================================
   Paleta
   ============================================================ */
const hex2rgb=h=>{h=String(h||"#000").replace("#","");if(h.length===3)h=h.split("").map(c=>c+c).join("");const n=parseInt(h,16)||0;return[(n>>16)&255,(n>>8)&255,n&255];};
const rgb2hex=a=>"#"+a.map(v=>Math.max(0,Math.min(255,Math.round(v))).toString(16).padStart(2,"0")).join("");
const mixC=(a,b,t)=>{const x=hex2rgb(a),y=hex2rgb(b);return rgb2hex(x.map((v,i)=>v+(y[i]-v)*t));};
const lum=h=>{const c=hex2rgb(h).map(v=>{v/=255;return v<=.03928?v/12.92:Math.pow((v+.055)/1.055,2.4);});return .2126*c[0]+.7152*c[1]+.0722*c[2];};
const inkFor=h=>lum(h)>.42?"#111111":"#ffffff";
function paletaDe(e){const pal=e&&e.paleta||{};if(pal.id==="custom"&&pal.rail&&pal.y)return{rail:pal.rail,y:pal.y};const p=PALETAS.find(x=>x.id===pal.id)||PALETAS[0];return{rail:p.rail,y:p.y};}
function aplicarPaleta(pal){
  const r=document.documentElement.style;const {rail,y}=pal||paletaDe(null);
  const railInk=inkFor(rail);
  r.setProperty("--rail",rail);r.setProperty("--rail-ink",railInk==="#ffffff"?"#f4f4f1":"#111111");
  r.setProperty("--rail-dim",mixC(rail,railInk,.6));r.setProperty("--rail-active",mixC(rail,railInk,.1));
  r.setProperty("--y",y);r.setProperty("--y-ink",inkFor(y));r.setProperty("--y-soft",mixC(y,"#ffffff",.84));r.setProperty("--y-line",mixC(y,"#000000",.18));
}
const temaEns=()=>{const {y}=paletaDe(EMP());return{accent:mixC(y,"#000000",lum(y)>.42?.35:0),accentInk:"#ffffff",accentSoft:mixC(y,"#ffffff",.86)};};

/* ============================================================
   Fotos: se comprimen y se guardan en IndexedDB de este navegador
   ============================================================ */
const PH=new Map();
const IDB={db:null,
  async open(){if(this.db)return this.db;this.db=await new Promise((res,rej)=>{const r=indexedDB.open("mi-sti-fotos",1);r.onupgradeneeded=()=>r.result.createObjectStore("f");r.onsuccess=()=>res(r.result);r.onerror=()=>rej(r.error);});return this.db;},
  async put(k,v){const db=await this.open();return new Promise((res,rej)=>{const tx=db.transaction("f","readwrite");tx.objectStore("f").put(v,k);tx.oncomplete=()=>res();tx.onerror=()=>rej(tx.error);});},
  async del(k){const db=await this.open();return new Promise(res=>{const tx=db.transaction("f","readwrite");tx.objectStore("f").delete(k);tx.oncomplete=()=>res();tx.onerror=()=>res();});},
  async all(){const db=await this.open();return new Promise((res,rej)=>{const tx=db.transaction("f");const st=tx.objectStore("f");const ks=st.getAllKeys(),vs=st.getAll();tx.oncomplete=()=>res(ks.result.map((k,i)=>[k,vs.result[i]]));tx.onerror=()=>rej(tx.error);});}};
/* Archivos adjuntos (documentos y certificados): se guardan en este navegador */
const ARCH={db:null,
  async open(){if(this.db)return this.db;this.db=await new Promise((res,rej)=>{const r=indexedDB.open("mi-sti-archivos",1);r.onupgradeneeded=()=>r.result.createObjectStore("a");r.onsuccess=()=>res(r.result);r.onerror=()=>rej(r.error);});return this.db;},
  async put(k,v){const db=await this.open();return new Promise((res,rej)=>{const tx=db.transaction("a","readwrite");tx.objectStore("a").put(v,k);tx.oncomplete=()=>res();tx.onerror=()=>rej(tx.error);});},
  async get(k){const db=await this.open();return new Promise((res,rej)=>{const tx=db.transaction("a");const r=tx.objectStore("a").get(k);tx.oncomplete=()=>res(r.result||null);tx.onerror=()=>rej(tx.error);});},
  async del(k){const db=await this.open();return new Promise(res=>{const tx=db.transaction("a","readwrite");tx.objectStore("a").delete(k);tx.oncomplete=()=>res();tx.onerror=()=>res();});},
  async all(){const db=await this.open();return new Promise((res,rej)=>{const tx=db.transaction("a");const st=tx.objectStore("a");const ks=st.getAllKeys(),vs=st.getAll();tx.oncomplete=()=>res(ks.result.map((k,i)=>[k,vs.result[i]]));tx.onerror=()=>rej(tx.error);});}};
async function guardarArchivo(file){const id=uid("arch");await ARCH.put(id,{blob:file,nombre:file.name,tipo:file.type||"application/octet-stream"});return{id,nombre:file.name,tipo:file.type||"",tam:file.size,fecha:TODAY};}
const tamTxt=b=>b>=1048576?(b/1048576).toFixed(1).replace(".",",")+" MB":Math.max(1,Math.round(b/1024))+" kB";
async function abrirArchivo(meta,descargar){const r=await ARCH.get(meta.id).catch(()=>null);
  if(!r){toast("El archivo no está en este navegador: se cargó desde otro equipo o se borraron los datos del navegador.");return;}
  const blob=r.blob instanceof Blob?r.blob:new Blob([r.blob],{type:r.tipo});
  if(descargar){await saveBlob(blob,meta.nombre);return;}
  const url=URL.createObjectURL(blob);const w=window.open(url,"_blank");if(!w)await saveBlob(blob,meta.nombre);setTimeout(()=>URL.revokeObjectURL(url),60000);}
function archivoHTML(rec,kind,ed){const a=rec.archivo;
  return `<section class="adjunto"><h3>${IC.clip} Archivo adjunto</h3>${a?`<div class="adj-row"><div><b>${esc(a.nombre)}</b><span class="sub">${a.tam?tamTxt(a.tam)+" · ":""}cargado el ${fd(a.fecha||rec.fecha)}</span></div><div class="actions"><button class="btn small" data-act="verArch" data-k="${kind}" data-id="${rec.id}">Ver</button><button class="btn small" data-act="bajarArch" data-k="${kind}" data-id="${rec.id}">Descargar</button>${ed?`<label class="btn small">Reemplazar<input type="file" hidden data-arch="${kind}" data-id="${rec.id}"></label>`:""}</div></div>`
    :`<div class="adj-row"><span class="muted">Sin archivo adjunto.</span>${ed?`<label class="btn small">${IC.up} Adjuntar archivo<input type="file" hidden data-arch="${kind}" data-id="${rec.id}"></label>`:""}</div>`}</section>`;}
async function compress(file,max=1280){
  const url=URL.createObjectURL(file);
  try{const img=await new Promise((res,rej)=>{const i=new Image();i.onload=()=>res(i);i.onerror=rej;i.src=url;});
    const k=Math.min(1,max/Math.max(img.naturalWidth,img.naturalHeight));const c=document.createElement("canvas");c.width=Math.round(img.naturalWidth*k);c.height=Math.round(img.naturalHeight*k);
    const g=c.getContext("2d");g.fillStyle="#fff";g.fillRect(0,0,c.width,c.height);g.drawImage(img,0,0,c.width,c.height);return c.toDataURL("image/jpeg",0.74);}
  finally{URL.revokeObjectURL(url);}
}
async function addPhotos(files){const ids=[];for(const f of files){if(!/^image\//.test(f.type))continue;try{const d=await compress(f);const id=uid("ph");PH.set(id,d);ids.push(id);IDB.put(id,d).catch(()=>{});}catch(e){toast("No se pudo leer una de las fotos.");}}return ids;}
function demoPhoto(seed,label){
  const c=document.createElement("canvas");c.width=640;c.height=480;const g=c.getContext("2d");
  const gr=g.createLinearGradient(0,0,640,480);gr.addColorStop(0,"#9c978d");gr.addColorStop(1,"#6f6a61");g.fillStyle=gr;g.fillRect(0,0,640,480);
  let s=seed*9301;const rnd=()=>{s=(s*9301+49297)%233280;return s/233280;};
  for(let i=0;i<1400;i++){g.fillStyle=`rgba(${rnd()>.5?255:0},${rnd()>.5?255:0},${rnd()>.5?255:0},.05)`;g.fillRect(rnd()*640,rnd()*480,3,3);}
  g.strokeStyle="#3b2a1d";g.lineWidth=9;g.lineCap="round";
  if(seed===3||seed===5){for(let y=60;y<460;y+=42){g.beginPath();g.moveTo(0,y);g.lineTo(640,y+20);g.stroke();}for(let x=40;x<640;x+=60){g.beginPath();g.moveTo(x,0);g.lineTo(x-20,480);g.stroke();}g.fillStyle="#a7743d";g.fillRect(0,380,640,40);}
  else{for(const x of[200,440]){g.beginPath();g.moveTo(x,0);g.lineTo(x,480);g.stroke();}g.lineWidth=5;for(let y=30;y<440;y+=(seed%2?70:44)){g.strokeRect(170,y,300,8);}}
  g.fillStyle="rgba(20,24,28,.82)";g.fillRect(0,438,640,42);g.fillStyle="#fff";g.font="600 20px Arial";g.fillText(label,14,466);
  return c.toDataURL("image/jpeg",0.8);
}
async function loadPhotos(){
  [[1,"C4 · estribos a 15 cm en zona confinada"],[2,"C9 · vista general del armado"],[3,"Placa piso 4 · pasarelas instaladas"],[4,"Muros piso 4 Torre B · formaleta"],[5,"Placa piso 4 · acero inferior"],[6,"Vista general de la obra"],[7,"Zapatas Torre 1 · parrillas"],[8,"C6 · estribos en zona confinada"],[9,"Muros de bloque piso 1 · Torre 2"],[10,"Eje B · dovelas con rebabas"],[11,"Pantallas piso 4 · formaleta"],[12,"C2 · traslapo en zona confinada"],[13,"C15 · traslapo en zona confinada"],[14,"Placa piso 4 · acero inferior"],[15,"C6 · estribos reubicados"],[16,"Núcleos extraídos · pantallas piso 2"],[17,"Torre 1 · avance piso 3"],[18,"Torre 2 · mampostería piso 3"],[19,"Vista general desde el acceso"],[20,"Placa piso 5 · formaleta"]].forEach(([n,t])=>PH.set("demo-"+n,demoPhoto(n,t)));
  try{for(const[k,v]of await IDB.all())PH.set(k,v);}catch(e){}
  if(ME())render();
}
function photosHTML(ids,ctx,canAdd,canDel){
  ids=ids||[];
  const cells=ids.filter(id=>PH.has(id)).map(id=>`<div class="photo"><img src="${PH.get(id)}" alt="Foto adjunta" data-act="zoom" data-id="${id}">${canDel?`<button class="del" data-act="delPhoto" data-ctx="${ctx}" data-id="${id}" aria-label="Quitar foto">×</button>`:""}</div>`).join("");
  const add=canAdd?`<label class="photo add">${IC.cam}<span>Agregar fotos</span><input type="file" accept="image/*" multiple hidden data-photo="${ctx}"></label>`:"";
  if(!cells&&!add)return'<p class="muted" style="margin:0">Sin fotos.</p>';
  return `<div class="photos">${cells}${add}</div>`;
}
/* ============================================================
   IA
   - Dentro de claude.ai se usa la capacidad "sample" del artifact.
   - En GitHub Pages cada empresa puede pegar su clave de API de Anthropic (se guarda solo en este navegador).
   - Sin IA, la app lee los PDF con reglas automáticas.
   ============================================================ */
let SAMPLE=null,PERM=null,AI_IMG=false,AI_STATE="cargando";
const cuse=n=>window.claude&&window.claude.use?window.claude.use(n).catch(()=>null):Promise.resolve(null);
const IA_KEY=()=>{const e=EMP();if(!e)return"";try{return localStorage.getItem("mi-sti-ia-"+e.id)||"";}catch(x){return"";}};
const IA_MODEL="claude-opus-5-5";
(async()=>{SAMPLE=await cuse("sample");PERM=await cuse("permissions");
  if(SAMPLE){const l=await SAMPLE.limits().catch(()=>null);AI_IMG=!!(l&&l.images);}
  await refreshAi();})();
async function refreshAi(){
  if(SAMPLE){if(PERM){const s=await PERM.state("sample").catch(()=>"prompt");AI_STATE=s==="granted"?"on":s==="denied"?"denied":s==="unavailable"?"no":"prompt";}else AI_STATE="prompt";}
  else AI_STATE=IA_KEY()?"on":"no";
  if(!SAMPLE)AI_IMG=AI_STATE==="on";
  renderAi();
}
function renderAi(){
  const el=$("aiBox");if(!el)return;el.className="aiBox"+(AI_STATE==="on"?" on":"");
  const m={cargando:"Conectando IA…",on:"IA activa",no:"IA sin configurar",denied:"IA bloqueada",prompt:"IA sin activar"};
  el.innerHTML=`<i></i><span>${m[AI_STATE]}</span>${AI_STATE==="prompt"?'<button class="btn small ai" data-act="aiOn">Activar IA</button>':AI_STATE==="no"&&esAdmin()?'<button class="btn small" data-act="nav" data-v="empresa">Configurar</button>':""}`;
}
const aiReady=()=>AI_STATE==="on"||(!!SAMPLE&&AI_STATE==="prompt");
function aiErrMsg(c){return{rate_limited:"La IA está ocupada en este momento.",not_granted:"La clave de IA no es válida o no tiene permiso.",sampling_disabled:"La IA está desactivada para esta cuenta.",usage_limit:"Se alcanzó el límite de uso de la IA.",input_too_large:"El documento es demasiado largo para la IA.",off:"La IA no está configurada.",refusal:"La IA no quiso procesar este contenido.",net:"No hubo conexión con el servicio de IA."}[c]||"La IA no respondió.";}
const blob2b64=b=>new Promise((res,rej)=>{const r=new FileReader();r.onload=()=>res(String(r.result).split(",")[1]);r.onerror=rej;r.readAsDataURL(b);});
async function apiCall(prompt,images){
  const content=[];for(const b of images||[])content.push({type:"image",source:{type:"base64",media_type:b.type||"image/jpeg",data:await blob2b64(b)}});
  content.push({type:"text",text:prompt});
  let r;
  try{r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"content-type":"application/json","x-api-key":IA_KEY(),"anthropic-version":"2026-10-21","anthropic-beta":"server-side-fallback-2026-07-01","anthropic-dangerous-direct-browser-access":"true"},
    body:JSON.stringify({model:IA_MODEL,max_tokens:16000,output_config:{effort:"low"},fallbacks:"default",messages:[{role:"user",content}]})});}
  catch(e){throw{code:"net"};}
  if(!r.ok){throw{code:r.status===401||r.status===403?"not_granted":r.status===429?"rate_limited":r.status===413?"input_too_large":"error"};}
  const j=await r.json();
  if(j.stop_reason==="refusal")throw{code:"refusal"};
  return(j.content||[]).filter(b=>b.type==="text").map(b=>b.text).join("").trim();
}
function parseJSONloose(t){t=String(t||"").replace(/^```(?:json)?\s*|\s*```$/g,"").trim();try{return JSON.parse(t);}catch(e){}
  const a=Math.min(...["{","["].map(c=>{const i=t.indexOf(c);return i<0?1e9:i;}));const b=Math.max(t.lastIndexOf("}"),t.lastIndexOf("]"));if(a<b)try{return JSON.parse(t.slice(a,b+1));}catch(e){}return null;}
async function aiJSON(prompt,opts={}){
  if(!aiReady())return{err:"off"};
  if(SAMPLE){try{const d=await SAMPLE.json(prompt,Object.assign({modelTier:"default"},opts));refreshAi();return{data:d};}
    catch(e){if(["not_granted","sampling_disabled","not_declared","capability_disabled","capability_removed"].includes(e&&e.code)){AI_STATE="denied";renderAi();}return{err:(e&&e.code)||"error"};}}
  try{const t=await apiCall(prompt+"\n\nResponde solo con JSON válido, sin texto antes ni después.",opts.images);const d=parseJSONloose(t);return d==null?{err:"error"}:{data:d};}
  catch(e){return{err:e.code||"error"};}
}
async function aiText(prompt,opts={}){
  if(!aiReady())return{err:"off"};
  if(SAMPLE){try{const r=await SAMPLE(prompt,Object.assign({modelTier:"default"},opts));refreshAi();return{text:r.text.trim()};}
    catch(e){if(["not_granted","sampling_disabled","not_declared"].includes(e&&e.code)){AI_STATE="denied";renderAi();}return{err:(e&&e.code)||"error"};}}
  try{return{text:await apiCall(prompt,opts.images)};}catch(e){return{err:e.code||"error"};}
}
function viaNote(rec){
  if(!rec||!rec.via)return"";
  if(rec.via==="ia")return`<div class="note ok">Datos extraídos por la IA${rec.fuente?` de «${esc(rec.fuente)}»`:""}. Revísalos antes de aprobar.</div>`;
  if(rec.via==="auto")return`<div class="note y">Datos leídos automáticamente del texto${rec.fuente?` de «${esc(rec.fuente)}»`:""}. Revisa y completa los campos.${rec.aiErr&&rec.aiErr!=="off"?` ${esc(aiErrMsg(rec.aiErr))}`:""}${AI_STATE!=="on"?" Con la IA activa la lectura es más completa.":""}</div>`;
  if(rec.via==="scan")return`<div class="note bad">Este PDF es una imagen escaneada y no trae texto. Para leerlo hace falta la IA activa; mientras tanto, llena los campos a mano.</div>`;
  return"";
}

/* ============================================================
   Lectura de PDF (pdf.js) y extracción por reglas
   ============================================================ */
function loadScript(src){return new Promise((res,rej)=>{const ex=document.querySelector(`script[src="${src}"]`);if(ex){if(ex.dataset.ok)res();else{ex.addEventListener("load",()=>res());ex.addEventListener("error",()=>rej(new Error(src)));}return;}
  const s=document.createElement("script");s.src=src;s.onload=()=>{s.dataset.ok="1";res();};s.onerror=()=>rej(new Error("No se pudo cargar el lector de PDF"));document.head.appendChild(s);});}
const PDFJS="vendor/pdf.min.js",PDFW="vendor/pdf.worker.min.js";
const H2P="vendor/html2pdf.bundle.min.js";
/* El worker se carga como script en la página: dentro del marco del artifact no se puede crear un Worker desde otro dominio. */
async function ensurePdf(){await loadScript(PDFJS);await loadScript(PDFW);window.pdfjsLib.GlobalWorkerOptions.workerSrc=PDFW;}
async function pdfRead(file,max=60000){
  await ensurePdf();
  const doc=await window.pdfjsLib.getDocument({data:new Uint8Array(await file.arrayBuffer()),isEvalSupported:false}).promise;
  let out="";
  for(let p=1;p<=doc.numPages&&out.length<max;p++){const pg=await doc.getPage(p);const tc=await pg.getTextContent();
    const rows=[];for(const it of tc.items){if(!it.str||!it.str.trim())continue;const y=it.transform[5],x=it.transform[4];let row=rows.find(r=>Math.abs(r.y-y)<3);if(!row){row={y,its:[]};rows.push(row);}row.its.push({x,s:it.str});}
    rows.sort((a,b)=>b.y-a.y);out+=`\n[Página ${p}]\n`+rows.map(r=>r.its.sort((a,b)=>a.x-b.x).map(i=>i.s).join(" ").replace(/\s+/g," ").trim()).join("\n");}
  const scanned=out.replace(/\[Página \d+\]/g,"").replace(/\s/g,"").length<40;
  let images=null;
  if(scanned&&aiReady()&&AI_IMG){images=[];for(let p=1;p<=Math.min(3,doc.numPages);p++){const pg=await doc.getPage(p);const vp=pg.getViewport({scale:1.6});const c=document.createElement("canvas");c.width=vp.width;c.height=vp.height;
    await pg.render({canvasContext:c.getContext("2d"),viewport:vp}).promise;images.push(await new Promise(r=>c.toBlob(r,"image/jpeg",0.8)));}}
  return{text:out.slice(0,max),pages:doc.numPages,scanned,images};
}
async function readFile(file){if(/pdf$/i.test(file.type)||/\.pdf$/i.test(file.name))return pdfRead(file);return{text:(await file.text()).slice(0,60000),pages:1,scanned:false};}

const MESN={enero:1,febrero:2,marzo:3,abril:4,mayo:5,junio:6,julio:7,agosto:8,septiembre:9,setiembre:9,octubre:10,noviembre:11,diciembre:12};
function findDates(t){const out=[];let m;const ok=(y,mo,d)=>y>=1990&&y<=2100&&mo>=1&&mo<=12&&d>=1&&d<=31;
  const r1=/\b(\d{4})[-\/.](\d{1,2})[-\/.](\d{1,2})\b/g;while((m=r1.exec(t)))if(ok(+m[1],+m[2],+m[3]))out.push({i:m.index,v:`${m[1]}-${pad(m[2])}-${pad(m[3])}`});
  const r2=/\b(\d{1,2})[-\/.](\d{1,2})[-\/.](\d{4})\b/g;while((m=r2.exec(t)))if(ok(+m[3],+m[2],+m[1]))out.push({i:m.index,v:`${m[3]}-${pad(m[2])}-${pad(m[1])}`});
  const r3=/\b(\d{1,2})\s+de\s+(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|setiembre|octubre|noviembre|diciembre)\s+(?:de|del)\s+(\d{4})/gi;while((m=r3.exec(t))){const mo=MESN[m[2].toLowerCase()];if(ok(+m[3],mo,+m[1]))out.push({i:m.index,v:`${m[3]}-${pad(mo)}-${pad(m[1])}`});}
  return out.sort((a,b)=>a.i-b.i);}
const grab=(t,re,i=1)=>{const m=t.match(re);return m&&m[i]?m[i].replace(/\s+/g," ").trim().replace(/[,;:.]+$/,""):"";};
function guessTipo(t){const T=t.slice(0,8000).toLowerCase();
  if(/licencia de construcci|curadur[ií]a/.test(T))return"licencia";
  if(/estudio (geot[eé]cnico|de suelos)|sondeo|capacidad portante/.test(T))return"suelos";
  if(/memoria(s)? de c[aá]lculo|dise[nñ]o estructural|combinaciones de carga|derivas/.test(T))return"estructural";
  if(/plano(s)? estructural|despiece|notas generales/.test(T))return"planos";
  return"otro";}
function addMonths(s,n){const[y,m,d]=s.split("-").map(Number);const mm=m-1+n;return `${y+Math.floor(mm/12)}-${pad(mm%12+1)}-${pad(d)}`;}
function rulesLicencia(t){const T=t.replace(/\s+/g," ");
  const numero=grab(T,/\b(\d{5}-\d-\d{2}-\d{3,5})\b/)||grab(T,/licencia[^.]{0,40}?n[uú]mero\s*[:.]?\s*([\w-]{5,})/i)||grab(T,/resoluci[oó]n\s*(?:no\.?|n[°º])?\s*([\w-]{4,})/i);
  const curaduria=grab(t,/(curadur[ií]a\s+urbana\s*(?:no\.?|n[°º])?\s*\d+[^\n]{0,40}?)(?=\s+resoluci|\s+por la cual|\n|$)/i)||grab(T,/(curadur[ií]a\s+urbana\s*(?:no\.?|n[°º])?\s*\d+(?:\s+de\s+[A-ZÁÉÍÓÚÑ][A-Za-zÁÉÍÓÚÑáéíóúñ]+(?:\s+[A-ZÁÉÍÓÚÑ][A-Za-zÁÉÍÓÚÑáéíóúñ]+){0,3})?)/i)||grab(T,/(secretar[ií]a de planeaci[oó]n(?: de [A-ZÁÉÍÓÚÑ][\wáéíóúñ]+)?)/i);
  const ds=findDates(T);const near=ds.find(d=>/expedi|fecha|del\s*$/i.test(T.slice(Math.max(0,d.i-40),d.i)))||ds[0];
  const vig=grab(T,/vigencia[^.]{0,80}?\(?(\d{1,2})\)?\s*meses/i);
  const titular=grab(T,/titular(?:es)?(?:\s+de\s+la\s+licencia)?\s*[:\-]?\s*(.{3,80}?)(?=\s+NIT|\s+C\.?C\.?|;|\.\s|\s+Predio|$)/i);
  const areaN=grab(T,/[aá]rea\s+(?:total\s+)?construida(?:\s+total)?[^\d]{0,25}([\d.,]+)\s*(?:m2|m²|mts)/i);
  const unidades=grab(T,/(\d+\s+(?:apartamentos|unidades de vivienda|viviendas|casas|unidades)(?:\s+y\s+\d+\s+[a-záéíóúñ]+)?)/i);
  const uso=grab(T,/\buso\s*[:\-]\s*([^.;]{3,60})/i);
  const direccion=grab(T,/((?:calle|carrera|avenida|diagonal|transversal|cra\.?|cl\.?|kr\.?|av\.?)\s*\d+[a-z]?\s*(?:#|no\.?|n[°º])\s*[\w-]+)/i);
  const datos={"Número":numero,"Curaduría":curaduria,"Fecha de expedición":near?fd(near.v):"","Vigencia":vig?vig+" meses":"","Titular":titular,"Dirección":direccion,"Área construida":areaN?areaN+" m²":"","Unidades":unidades,"Uso":uso};
  const re=/(arquitect[oa]|ingenier[oa]|constructor)\s*(estructural|geotecnista|proyectista|de suelos|responsable)?\s*[:\-]?\s*(?:Ing\.\s*|Arq\.\s*)?([A-ZÁÉÍÓÚÑ][a-záéíóúñ]+(?:\s+[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+){1,3})\s*,?\s*(?:M\.?P\.?|matr[ií]cula(?:\s+profesional)?)\s*(?:No\.?)?\s*([\w-]+)/gi;let m;
  while((m=re.exec(T)))datos[(m[1]+" "+(m[2]||"")).trim().replace(/^./,c=>c.toUpperCase())]=`${m[3]} · ${m[4]}`;
  return{nombre:numero?`Licencia de construcción ${numero}`:"Licencia de construcción",fecha:near?near.v:"",vence:near&&vig?addMonths(near.v,+vig):"",datos};}
function rulesGeneral(t,tipo){
  const lines=t.split("\n").map(l=>l.trim()).filter(l=>l&&!/^\[Página/.test(l));
  const titulo=(lines.find(l=>l.length>=12&&l.length<=140&&/[a-záéíóúñ]{4}/i.test(l)&&!/^\d/.test(l)&&l.split(" ").length>=3)||"").replace(/\s+/g," ");
  const ds=findDates(t);
  const responsable=grab(t,/((?:Ing|Arq)(?:eniero|eniera|uitecto|uitecta)?\.?\s+[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+(?:\s+[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+){1,3})/);
  const matricula=grab(t,/(?:\bM\.?P\.?|matr[ií]cula(?:\s+profesional)?|\bT\.?P\.?)\s*(?:No\.?)?\s*[:.]?\s*(\d[\w-]{4,}(?:\s+[A-Z]{3}\b)?)/i);
  const version=grab(t,/versi[oó]n\s*[:\-]?\s*([\w.]{1,6})\b/i)||grab(t,/\brev(?:isi[oó]n)?\.?\s*[:\-]?\s*([\w.]{1,4})\b/i);
  const paras=t.replace(/\[Página \d+\]/g," ").replace(titulo," ").replace(/versi[oó]n\s*[:\-]?\s*[\w.]{1,6}\.?|fecha\s*:\s*\S+/ig," ").replace(/\s+/g," ").split(/(?<=\.)\s+/).filter(s=>s.length>40&&s.length<260);
  return{nombre:titulo||DOC_TIPOS[tipo],fecha:ds[0]?ds[0].v:"",version:version||"1",datos:{"Título":titulo,"Fecha":ds[0]?fd(ds[0].v):"","Versión":version,"Responsable":responsable,"Matrícula":matricula,"Resumen":paras.slice(0,2).join(" ")}};}
function rulesCert(t){
  const ds=findDates(t);
  const material=grab(t,/(?:producto|material|descripci[oó]n(?: del producto)?)\s*[:\-]\s*([^\n]{3,110})/i);
  const proveedor=grab(t,/(?:proveedor|fabricante|empresa|raz[oó]n social|productor)\s*[:\-]\s*([^\n]{3,80})/i)||(t.split("\n").map(s=>s.trim()).find(s=>/S\.?A\.?S\.?|Ltda|S\.A\./i.test(s))||"");
  const lote=grab(t,/(?:colada\s*\/\s*lote|lote|colada|heat|remisi[oó]n)\s*(?:no\.?|n[°º])?\s*[:\-]?\s*([A-Z0-9][\w-]{2,})/i);
  const norma=grab(t,/\b((?:NTC|ASTM|ACI|NSR|ISO|NMX|IRAM)[\s-]?[A-Z]?\s?\d[\d.\-A-Z]*)/);
  const cantidad=grab(t,/(?:cantidad(?:\s+despachada)?|peso|volumen)\s*[:\-]?\s*([\d.,]+\s*(?:t|ton|toneladas|kg|m3|m³|und|unidades|paneles|bultos|rollos)\b\.?)/i);
  const resultado=/no\s+cumple/i.test(t)?"No cumple":/\bcumple\b/i.test(t)?"Cumple":"";
  return{material,proveedor,lote,norma,fecha:ds[0]?ds[0].v:"",cantidad,resultado};}
const PSI={3000:21,3500:24.5,4000:28,4500:31.5,5000:34.5,6000:42};
function rulesLab(t){
  const lines=t.split("\n").map(l=>l.trim()).filter(Boolean);const rows=[];let last=null;
  for(const raw of lines){if(/^\[Página/.test(raw))continue;const L=raw;
    const tipo=/grout|grouting|relleno/i.test(L)?"grout":/mortero/i.test(L)?"mortero":null;
    let code=null,m;
    if((m=L.match(/\b([A-Z]{1,3}-\d{1,4})\b/)))code=m[1];else if((m=L.match(/muestra\s*(?:n[°o.]*\s*)?(\d{1,5})\b/i)))code="M-"+m[1].padStart(3,"0");
    const ds=findDates(L);
    let fc=null;if((m=L.match(/f'?c[^0-9]{0,8}(\d{2}(?:[.,]\d)?)\s*(mpa|psi)?/i)))fc=+m[1].replace(",",".");else if((m=L.match(/\b(3000|3500|4000|4500|5000|6000)\s*psi/i)))fc=PSI[m[1]];else if((m=L.match(/\b(\d{2}(?:[.,]\d)?)\s*mpa\b/i)))fc=+m[1].replace(",",".");
    let edad=null;if((m=L.match(/edad\s*[:\-]?\s*(\d{1,3})/i)||L.match(/\b(\d{1,3})\s*d[ií]as?\b/i)||L.match(/\b(3|7|14|28|56|90)\s*d\b/i)))edad=+m[1];
    let clean=L.replace(/\b\d{4}[-\/.]\d{1,2}[-\/.]\d{1,2}\b|\b\d{1,2}[-\/.]\d{1,2}[-\/.]\d{4}\b/g," ").replace(/f'?c[^0-9]{0,8}\d{2}(?:[.,]\d)?\s*(mpa|psi)?/ig," ").replace(/\b\d{2,4}(?:[.,]\d)?\s*(mpa|psi)\b/ig," ").replace(/edad\s*[:\-]?\s*\d{1,3}|\b\d{1,3}\s*d[ií]as?\b|\b\d{1,2}\s*d\b/ig," ");
    if(code)clean=clean.replace(code," ");
    const vals=[...clean.matchAll(/(?<![\w.,-])(\d{1,2}[.,]\d{1,2})(?![\d])/g)].map(x=>+x[1].replace(",",".")).filter(v=>v>=2&&v<=90);
    if(!code&&last&&vals.length&&!ds.length){last.resultadosMPa.push(...vals);continue;}
    if(!code||!vals.length)continue;
    let ubic=raw.split("|").map(s=>s.trim()).find(s=>/[a-záéíóúñ]{4}/i.test(s)&&!/muestra|cilindro|f'?c|edad|fundid|mpa/i.test(s))||"";
    if(!ubic&&!raw.includes("|")){const a=raw.indexOf(code)+code.length;const b=ds[0]?raw.indexOf(raw.slice(ds[0].i).split(" ")[0],a):-1;const seg=(b>a?raw.slice(a,b):"").replace(/fundid[oa]?|muestra/ig," ").replace(/\s+/g," ").trim();if(/[a-záéíóúñ]{4}/i.test(seg))ubic=seg;}
    const row={codigo:code,elemento:ubic,fechaFundida:ds[0]?ds[0].v:"",fcMPa:fc,tipo:tipo||(code.startsWith("MP")?"mortero":code.startsWith("GR")?"grout":"concreto"),edad:edad||28,resultadosMPa:vals};
    const same=rows.find(r=>r.codigo===row.codigo&&r.edad===row.edad);
    if(same){same.resultadosMPa.push(...vals);last=same;}else{rows.push(row);last=row;}}
  return rows.map(r=>Object.assign(r,{fcMPa:r.fcMPa||(r.tipo==="mortero"?12.5:r.tipo==="grout"?17.5:21)}));
}

const SAMPLE_DOCS={
  licencia:`CURADURÍA URBANA No. 2 DE MUNICIPIO DEMO\nRESOLUCIÓN 66001-2-26-0412 DEL 3 DE OCTUBRE DE 2026\nPor la cual se otorga LICENCIA DE CONSTRUCCIÓN en la modalidad de OBRA NUEVA\nTitular: Promotora Ejemplo S.A.S. NIT 901.000.000-1\nPredio: Calle 12 # 45-30, matrícula inmobiliaria 290-000000\nUso: vivienda multifamiliar. Área construida total: 7.215,40 m2. Unidades: 88 apartamentos y 3 locales.\nVigencia: veinticuatro (24) meses prorrogables por doce (12) meses más.\nProfesionales responsables: Arquitecto proyectista Juliana Ortiz Mesa, MP A00000; Ingeniero estructural Felipe Lozano Duque, MP 17202-000010; Ingeniero geotecnista Marcela Ríos Pava, MP 17202-000011.\nSe exige supervisión técnica independiente según Título I de la NSR-10.`,
  suelos:`[Página 1]\nESTUDIO GEOTÉCNICO PARA EDIFICIO MULTIFAMILIAR TORRES 1 Y 2\nGeotecnia Ejemplo S.A.S. Versión 2. Fecha: 2026-09-15\n[Página 2]\nDescripción del proyecto: dos torres de 12 pisos y un sótano. Cargas por columna de 180 a 320 t.\n[Página 4]\nSe ejecutaron 6 sondeos a 20 m con SPT. Ensayos de laboratorio: humedad natural, límites, granulometría, compresión inconfinada.\n[Página 7]\nPerfil estratigráfico: limos arcillosos sobre arenas; nivel freático a 4,5 m. Parámetros: cohesión 3,5 t/m2, ángulo de fricción 28°.\n[Página 9]\nCapacidad portante admisible 18 t/m2 para zapatas a 2,0 m. Asentamientos totales estimados 3,2 cm.\n[Página 12]\nRecomendación: pilotes preexcavados de 60 cm a 16 m.\n[Página 15]\nPerfil de suelo tipo D, Fa 1,3 y Fv 1,9. Ing. Marcela Ríos Pava, MP 17202-000011 CLD.`,
  cert:`ACEROS DEL CENTRO (FICTICIO) S.A.S.\nCERTIFICADO DE CALIDAD No. 2026-1187\nProducto: Barras corrugadas para refuerzo de concreto grado 60 (420 MPa), diámetros 1/2" y 5/8"\nNorma: NTC 2289\nColada / lote: L-25402\nFecha: 2026-10-06\nCantidad despachada: 6,8 t\nResultados: fy 452 MPa, fu 640 MPa, alargamiento 14 %. El material cumple con la norma.`
};
/* ============================================================
   Encabezado, firmas y exportación a PDF
   ============================================================ */
const sisTxt=p=>(p.sistemas||[]).map(s=>SIS[s]?.l).filter(Boolean).join(" + ")||"—";
/* Encabezado único de todos los registros e informes: los datos del proyecto van aquí y no se repiten en el cuerpo. */
function hdrHTML(titulo,sub,extra){const F=EMP()||{},p=P()||{};
  return `<div class="hdr">${F.logo?`<img src="${F.logo}" alt="Logo">`:`<div class="lg">Logo de la firma</div>`}<div><div style="display:flex;justify-content:space-between;gap:10px;align-items:baseline"><b style="font-size:13px">${esc(F.razon||"")}</b><span style="font-size:10.5px;color:#555">NIT ${esc(F.nit||"")} · ${esc(F.ciudad||"")}</span></div><div class="t">${esc(titulo)}${sub?` <span style="font-weight:500;text-transform:none;font-size:12px">· ${esc(sub)}</span>`:""}</div>
  <div class="meta"><span><b>Proyecto:</b> ${esc(p.nombre||"")}</span><span><b>Licencia:</b> ${esc(p.licencia||"—")}</span><span><b>Constructora:</b> ${esc(p.constructora||"—")}</span><span><b>Ubicación:</b> ${esc([p.direccion,p.municipio].filter(Boolean).join(", ")||"—")}</span><span><b>Sistema:</b> ${esc(sisTxt(p))}</span>${extra?`<span>${extra}</span>`:`<span><b>Contrato:</b> ${esc(p.contrato||"—")}</span>`}</div></div></div>`;}
function firmasHTML(extra){const p=P();if(!p)return"";const fs=[miembrosRol(p,"director")[0],miembrosRol(p,"residente")[0]].filter(Boolean);
  return `<div class="firmas">${fs.map(u=>`<div><b>${esc(u.nombre)}</b><br>${esc(u.cargo||ROL_P[u.rol]||"")}${u.profesion?" · "+esc(u.profesion):""}${u.matricula?`<br>Matrícula ${esc(u.matricula)}`:""}</div>`).join("")}${extra||""}</div>`;}
function photosPDF(ids,cap){ids=(ids||[]).filter(id=>PH.has(id));if(!ids.length)return"";return `<div class="pgrid">${ids.map((id,k)=>`<figure><img src="${PH.get(id)}"><figcaption>${esc(cap||"Foto")} ${k+1}</figcaption></figure>`).join("")}</div>`;}
async function saveBlob(blob,filename){
  const dl=await cuse("downloads");
  if(dl){try{await dl.save({filename,data:blob});return true;}catch(e){if(e&&e.code==="declined")return false;}}
  const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download=filename;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),5000);return true;
}
async function exportPDF(html,filename){
  toast("Generando PDF…");
  try{await loadScript(H2P);}catch(e){toast("No se pudo cargar el generador de PDF.");return;}
  const el=document.createElement("div");el.className="pdfdoc";el.innerHTML=html;
  for(const sv of [...el.querySelectorAll("svg.pdfchart")]){try{const w=+sv.getAttribute("width"),h=+sv.getAttribute("height");
    const img=await new Promise((res,rej)=>{const i=new Image();i.onload=()=>res(i);i.onerror=rej;i.src="data:image/svg+xml;charset=utf-8,"+encodeURIComponent(sv.outerHTML);});
    const c=document.createElement("canvas");c.width=w*2;c.height=h*2;const g=c.getContext("2d");g.scale(2,2);g.drawImage(img,0,0,w,h);
    const im=document.createElement("img");im.src=c.toDataURL("image/png");im.style.width="100%";sv.replaceWith(im);}catch(e){}}
  let blob;
  try{blob=await window.html2pdf().set({margin:[10,10,12,10],image:{type:"jpeg",quality:0.92},html2canvas:{scale:2,scrollX:0,scrollY:0,backgroundColor:"#ffffff",useCORS:true},jsPDF:{unit:"mm",format:"letter",orientation:"portrait"},pagebreak:{mode:["css","legacy"],avoid:["tr","figure","p",".firmas",".hdr",".pgrid figure",".pgrid2 figure","h2"]}}).from(el).outputPdf("blob");}
  catch(e){toast("No se pudo generar el PDF.");return;}
  if(await saveBlob(blob,filename+".pdf"))toast("PDF listo.");
}
const fname=(...p)=>p.map(slug).filter(Boolean).join("_").slice(0,120);

/* ============================================================
   Ensayos: resumen que publican las apps de concreto y mampostería
   ============================================================ */
/* Ensayos: módulos de concreto y mampostería que se muestran dentro de Mi STI (js/ens-*.js) */
const ENS_TIPOS=[["concreto","concreto","Concreto"],["mortero","mamposteria","Mortero de pega"],["grout","mamposteria","Grouting"],["unidad","mamposteria","Unidades de mampostería"],["murete","mamposteria","Muretes"]];
const tieneMamp=p=>(p.sistemas||[]).includes("mamposteria");
const ensTiposDe=p=>ENS_TIPOS.filter(t=>t[1]==="concreto"||tieneMamp(p));
const ensAppsDe=p=>[["concreto"],...(tieneMamp(p)?[["mamposteria"]]:[])];
function resumenEns(p){const out=[];let act="";
  for(const[k]of ensAppsDe(p)){try{const r=JSON.parse(localStorage.getItem(`mi-sti-ens-${k}-${p.id}-resumen`)||"null");if(r){out.push(...(r.rows||[]).filter(x=>!(k==="mamposteria"&&x.tipo==="concreto")).map(x=>Object.assign({app:k},x)));if(r.act>act)act=r.act;}}catch(e){}}
  return{rows:out,act};}
const EST_ENS={cumple:["Cumple","c-good"],aceptable:["Aceptable NSR","c-warn"],prombajo:["Promedio bajo","c-serious"],nocumple:["No cumple","c-crit"],pendiente:["Pendiente","" ],vencido:["Rotura atrasada","c-late"],aprobada:["Aprobada por concepto","c-good"]};
const estEnsChip=k=>{const x=EST_ENS[k]||[k,""];return`<span class="chip ${x[1]}">${esc(x[0])}</span>`;};
/* El módulo corre aislado (Shadow DOM): "document" apunta a su propia raíz */
function shimDoc(root,signal){return{
  getElementById:id=>root.getElementById(id),
  querySelector:q=>root.querySelector(q)||document.querySelector(q),
  querySelectorAll:q=>root.querySelectorAll(q),
  createElement:(...a)=>document.createElement(...a),createElementNS:(...a)=>document.createElementNS(...a),createTextNode:t=>document.createTextNode(t),
  addEventListener:(t,f,o)=>(t==="keydown"?document:root).addEventListener(t,f,{signal}),
  get body(){return document.body},get head(){return document.head},get documentElement(){return document.documentElement}};}
function ctxEns(p,tab,onChange){return{p:p.id,proyecto:p.nombre||"",obra:"",constructora:p.constructora||"",laboratorio:"",zonas:zonasDe(p),tab,onChange,embebida:true};}
/* Vista del constructor: sin carga de informes, sin «Requiere atención» y sin edición */
const ENS_RO_CSS=".grid2,#btnNew,.reclSel,#sheet .sf,#sheet button:not(#shClose),#sheet .addE,#sheet .confirm{display:none!important}#sheet input,#sheet select,#sheet textarea{pointer-events:none;background:#f4f4f1}";
function montarEnsayo(host,app,ctx){const M=(window.ENS_MOD||{})[app];if(!M){host.innerHTML='<div class="empty">No se pudo cargar el módulo de ensayos.</div>';return{destroy(){}};}
  const t=temaEns();host.style.setProperty("--accent",t.accent);host.style.setProperty("--accent-ink",t.accentInk);host.style.setProperty("--accent-soft",t.accentSoft);
  const root=host.attachShadow({mode:"open"});root.innerHTML=`<style>${M.css}</style>${ctx.soloLectura?`<style>${ENS_RO_CSS}</style>`:""}<div class="ensbody">${M.html}</div>`;
  const ac=new AbortController();let api={};try{api=M.run(root,ctx,shimDoc(root,ac.signal))||{};}catch(e){console.error(e);}
  api.destroy=()=>ac.abort();return api;}
/* Calcula el resumen de los proyectos que tienen ensayos guardados y aún no lo tienen */
function calentarEnsayos(){if(!D)return;
  for(const p of D.proyectos||[])for(const[k]of ensAppsDe(p)){const key=`mi-sti-ens-${k}-${p.id}`;
    if(localStorage.getItem(key)&&!localStorage.getItem(key+"-resumen")){const h=document.createElement("div");h.style.cssText="position:absolute;left:-9999px;top:0;width:900px;height:10px;overflow:hidden";h.setAttribute("aria-hidden","true");document.body.appendChild(h);
      const api=montarEnsayo(h,k,ctxEns(p,k==="mamposteria"?"mortero":null,null));setTimeout(()=>{api.destroy();h.remove();if(ME()&&P()&&P().id===p.id)render();},1500);}}}
