"use strict";
/* ============================================================
   Mi STI · Catálogos: íconos, sistemas estructurales, listas de chequeo,
   contenido mínimo de documentos, paletas y roles.
   ============================================================ */
const IC={
  dash:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/></svg>',
  doc:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M14 3H6v18h12V7z"/><path d="M14 3v4h4M9 12h6M9 16h6"/></svg>',
  lab:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M9 3h6M10 3v6L4.5 19a1.5 1.5 0 0 0 1.3 2h12.4a1.5 1.5 0 0 0 1.3-2L14 9V3"/><path d="M7 15h10"/></svg>',
  chk:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="3" width="16" height="18" rx="1"/><path d="M8 9l2 2 4-4M8 15h8"/></svg>',
  nc:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M12 3l10 18H2z"/><path d="M12 10v5M12 18v.5"/></svg>',
  rep:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M5 3h10l4 4v14H5z"/><path d="M9 17v-4M12 17v-7M15 17v-2"/></svg>',
  bld:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M4 21V9l8-6 8 6v12"/><path d="M4 13h16M4 17h16M9 21V9M15 21V9"/></svg>',
  firm:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><rect x="3" y="7" width="18" height="13"/><path d="M8 7V4h8v3M3 12h18"/></svg>',
  spark:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l1.8 5.6L19.5 9l-5.7 1.6L12 16l-1.8-5.4L4.5 9l5.7-1.4z"/><path d="M19 14l.9 2.6 2.6.9-2.6.9L19 21l-.9-2.6-2.6-.9 2.6-.9z"/></svg>',
  up:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 16V4M7 9l5-5 5 5M5 20h14"/></svg>',
  clip:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5l-8.6 8.6a5 5 0 0 1-7.1-7.1l8.6-8.6a3.4 3.4 0 0 1 4.8 4.8l-8.6 8.6a1.7 1.7 0 0 1-2.4-2.4l7.9-7.9"/></svg>',
  pdf:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M14 3H6v18h12V7z"/><path d="M14 3v4h4"/><path d="M12 10v7M9 14l3 3 3-3"/></svg>',
  users:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.8-3.6 3.4-5.5 6.5-5.5s5.7 1.9 6.5 5.5"/><circle cx="17" cy="9" r="2.6"/><path d="M16.5 14.2c2.6.2 4.4 2 5 4.8"/></svg>',
  box:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M3 7.5 12 3l9 4.5v9L12 21l-9-4.5z"/><path d="M3 7.5 12 12l9-4.5M12 12v9"/></svg>',
  photo:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="1"/><circle cx="9" cy="10" r="2"/><path d="m3 17 5-4 4 3 3-2 6 4"/></svg>',
  gear:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1 7 17M17 7l2.1-2.1"/></svg>',
  out:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 4h5v16h-5M10 8l-4 4 4 4M6 12h10"/></svg>',
  key:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="8" cy="15" r="4"/><path d="m11 12 9-9M17 6l2 2M15 8l2 2"/></svg>',
  logo:'<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"><path d="M5 27V12l11-7 11 7v15"/><path d="M5 19h22M12 27v-8M20 27v-8"/><path d="m11 13 3.5 3 6.5-6"/></svg>',
  cam:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M4 7h4l2-3h4l2 3h4v13H4z"/><circle cx="12" cy="13" r="4"/></svg>'
};

/* ============================================================
   Sistemas estructurales, tipos de elemento y listas de chequeo
   ============================================================ */

const SIS={
  porticos:{l:"Pórticos de concreto",d:"Columnas, vigas y losas vaciadas en sitio.",t:["cimentacion","columnas","vigaslosa","escaleras"]},
  muros:{l:"Muros de concreto (industrializado)",d:"Muros y losas vaciados con formaleta metálica.",t:["cimentacion","muros","losa","escaleras"]},
  dual:{l:"Sistema combinado (pórticos y muros)",d:"Pórticos con muros estructurales o pantallas.",t:["cimentacion","columnas","vigaslosa","muros","escaleras"]},
  mamposteria:{l:"Mampostería estructural",d:"Muros de bloque reforzado con mortero y grouting.",t:["cimentacion","mamposteria","losa","escaleras"],ens:["mortero","grout"]},
  acero:{l:"Estructura metálica",d:"Perfiles de acero, conexiones y losa en steel deck.",t:["cimentacion","acero","deck"]}
};
const CONC_DUR=["Remisión del concreto verificada (f'c, volumen, hora de salida)","Asentamiento dentro del rango especificado","Toma de cilindros para ensayo de resistencia","Vibrado adecuado, sin segregación","Secuencia de vaciado y juntas en la ubicación aprobada"];
const CONC_DES=["Curado iniciado oportunamente y mantenido","Desencofrado respetando el tiempo mínimo","Superficie sin hormigueros ni fisuras","Dimensiones, plomo y nivel finales conformes","Acero de arranque limpio y en posición"];
const CHK={
  cimentacion:{label:"Cimentación",antes:["Excavación a cota de diseño","Suelo de fundación verificado por el geotecnista","Concreto de limpieza","Dimensiones de zapatas, vigas o losa","Parrillas: cantidad, diámetro y separación","Arranques de columnas o muros","Recubrimiento contra el suelo (7,5 cm)","Excavación limpia, sin agua ni lodo"]},
  columnas:{label:"Columnas",antes:["Ejes y ubicación (replanteo)","Dimensiones de la sección","Cantidad y diámetro de barras longitudinales","Traslapos en zona permitida y con longitud de diseño","Separación de estribos en zona confinada","Separación de estribos en zona central","Ganchos sísmicos a 135°","Recubrimiento con distanciadores","Formaleta plomada y arriostrada","Junta de construcción de la base limpia"]},
  vigaslosa:{label:"Vigas y losa",antes:["Nivel de formaleta y contraflecha","Apuntalamiento: separación y arriostramiento","Espesor de losa según planos","Acero inferior: cantidad, diámetro y separación","Acero superior y bastones en apoyos","Refuerzo y flejes de vigas","Recubrimiento con distanciadores","Instalaciones embebidas fijas","Limpieza antes del vaciado"]},
  losa:{label:"Losa de entrepiso",antes:["Nivel de formaleta","Espesor de losa según planos","Malla inferior y superior: referencia y traslapos","Refuerzo adicional en bordes y vanos","Instalaciones embebidas fijas","Recubrimiento con distanciadores","Limpieza antes del vaciado"]},
  muros:{label:"Muros de concreto",antes:["Replanteo y trazo de muros","Arranques: ubicación y traslapo","Malla electrosoldada: referencia y posición","Refuerzo adicional en bordes y vanos","Separadores (recubrimiento)","Tubería y cajas embebidas fijas","Formaleta limpia, con desmoldante y aplomada","Corbatas y pasadores completos"]},
  escaleras:{label:"Escaleras",antes:["Trazado: huella, contrahuella y nivel de descansos","Espesor de la losa de escalera","Refuerzo longitudinal y transversal","Anclaje en vigas o losas de apoyo","Recubrimiento con distanciadores","Formaleta y apuntalamiento"]},
  mamposteria:{label:"Muros de mampostería",antes:["Unidades con certificado aprobado","Replanteo y primera hilada nivelada","Refuerzo vertical en celdas según planos","Refuerzo horizontal (escalerilla) cada hilada indicada","Celdas a inyectar limpias, con ventanas de inspección","Plomo y alineamiento del muro"],
    durante:["Mortero con dosificación aprobada y tiempo de uso","Juntas llenas y de espesor uniforme","Inyección de grout por etapas y consolidada","Toma de muestras de mortero y grout"],despues:["Curado del mortero y del grout","Plomo y alineamiento final","Limpieza de rebabas y celdas"]},
  acero:{label:"Estructura metálica",antes:["Certificados de perfiles y soldadura","Dimensiones y espesores de perfiles","Placas base y pernos de anclaje: posición y nivel","Plomo de columnas","Conexiones según planos de taller","Soldadores calificados"],
    durante:["Procedimiento de soldadura aprobado","Torque de pernos","Inspección visual de soldaduras","Arriostramiento provisional"],despues:["Ensayos no destructivos de soldaduras","Limpieza y pintura anticorrosiva","Espesor de película de pintura","Mortero de nivelación bajo placas base"]},
  deck:{label:"Losa en steel deck",antes:["Lámina: calibre y referencia","Fijación de la lámina a las vigas","Conectores de cortante","Malla o refuerzo de temperatura","Apuntalamiento cuando aplica","Remates de borde"]}
};
const FASES=[["antes","Antes del vaciado"],["durante","Durante"],["despues","Después"]];
function chkItems(tipo){const c=CHK[tipo];if(!c)return[];const out=[];let n=0;
  [["antes",c.antes],["durante",c.durante||CONC_DUR],["despues",c.despues||CONC_DES]].forEach(([f,l])=>l.forEach((t,i)=>{n++;out.push({id:f+"-"+(i+1),fase:f,n,t});}));return out;}
const tiposDe=p=>[...new Set((p.sistemas||[]).flatMap(s=>SIS[s]?SIS[s].t:[]))];
const ensDe=p=>[...new Set(["concreto",...(p.sistemas||[]).flatMap(s=>SIS[s]&&SIS[s].ens||[])])];

const REV={
  suelos:{label:"Estudio geotécnico",items:[
    ["Descripción del proyecto y cargas",/descripci[oó]n del proyecto|cargas|n[uú]mero de pisos/i],
    ["Exploración del subsuelo: número y profundidad de sondeos",/sondeo|perforaci[oó]n|apique|exploraci[oó]n/i],
    ["Ensayos de laboratorio",/granulometr|l[ií]mites|humedad natural|compresi[oó]n inconfinada|ensayos de laboratorio/i],
    ["Perfil estratigráfico y nivel freático",/estratigraf|nivel fre[aá]tico/i],
    ["Parámetros de resistencia y deformación",/cohesi[oó]n|fricci[oó]n|m[oó]dulo|par[aá]metros/i],
    ["Capacidad portante",/capacidad portante|capacidad de carga|admisible/i],
    ["Asentamientos totales y diferenciales",/asentamiento/i],
    ["Alternativas y recomendación de cimentación",/pilote|zapata|losa de cimentaci|cimentaci[oó]n recomendada|recomendaci[oó]n:/i],
    ["Excavaciones, estabilidad de taludes y contención",/excavaci|talud|contenci[oó]n|entibado/i],
    ["Efectos sísmicos: perfil de suelo y coeficientes",/perfil de suelo tipo|tipo de perfil|\bFa\b|\bFv\b|s[ií]smic/i],
    ["Recomendaciones constructivas",/recomendaciones constructivas|proceso constructivo|durante la construcci/i],
    ["Firma y matrícula del ingeniero geotecnista",/matr[ií]cula|\bM\.?P\.?\s*\d|tarjeta profesional/i]]},
  estructural:{label:"Memoria de cálculo estructural",items:[
    ["Parámetros sísmicos: Aa, Av, perfil de suelo, Fa y Fv",/\bAa\b|\bAv\b|\bFa\b|amenaza s[ií]smica/i],
    ["Grupo de uso y coeficiente de importancia",/grupo de uso|coeficiente de importancia/i],
    ["Sistema estructural, capacidad de disipación y R0",/\bR0\b|\bRo\b|capacidad de disipaci|\bDES\b|\bDMO\b|sistema estructural/i],
    ["Avalúo de cargas muertas y vivas",/aval[uú]o de cargas|carga muerta|carga viva/i],
    ["Combinaciones de carga",/combinaci[oó]n(es)? de carga/i],
    ["Análisis de irregularidades",/irregularidad/i],
    ["Derivas dentro del límite",/deriva/i],
    ["Diseño de vigas, columnas, muros y losas",/dise[nñ]o de (vigas|columnas|muros|losas)/i],
    ["Diseño de la cimentación",/dise[nñ]o de (la )?cimentaci/i],
    ["Especificación de materiales (f'c y fy)",/f'?c\s*=|fy\s*=|resistencia del concreto/i],
    ["Firma y matrícula del diseñador estructural",/matr[ií]cula|\bM\.?P\.?\s*\d|tarjeta profesional/i]]},
  planos:{label:"Planos estructurales",items:[
    ["Notas generales y especificación de materiales",/notas generales|especificaciones/i],
    ["Planta y detalles de cimentación",/cimentaci[oó]n/i],
    ["Despiece de columnas",/columna/i],
    ["Despiece de vigas",/viga/i],
    ["Refuerzo de losas",/losa/i],
    ["Recubrimientos indicados",/recubrimiento/i],
    ["Longitudes de traslapo y ganchos",/traslapo|gancho/i],
    ["Escaleras",/escalera/i],
    ["Cuadro de revisiones y firma del diseñador",/revisi[oó]n|matr[ií]cula/i]]}
};
const DOC_TIPOS={licencia:"Licencia de construcción",suelos:"Estudio geotécnico",estructural:"Memoria de cálculo estructural",planos:"Planos estructurales",otro:"Otro documento"};
const DOC_CAT={licencia:"Licencias y permisos",suelos:"Diseños y estudios",estructural:"Diseños y estudios",planos:"Diseños y estudios",otro:"Contratos y otros"};
const LIC_KEYS=["Número","Curaduría","Fecha de expedición","Vigencia","Titular","Dirección","Área construida","Unidades","Uso"];
const GEN_KEYS=["Título","Fecha","Versión","Responsable","Matrícula","Resumen"];

/* ============================================================
   Paletas: cada empresa elige una o define la suya
   ============================================================ */
const PALETAS=[
  {id:"pizarra",n:"Pizarra y cobre",d:"Propuesta por defecto",rail:"#1f2933",y:"#d9822b"},
  {id:"azul",n:"Azul ingeniería",d:"Sobria y técnica",rail:"#0d2c4a",y:"#2f80ed"},
  {id:"petroleo",n:"Petróleo",d:"Verde azulado",rail:"#0f3b40",y:"#17a398"},
  {id:"verde",n:"Verde obra",d:"Natural",rail:"#1d3a2c",y:"#5aa64a"},
  {id:"vino",n:"Vino",d:"Elegante",rail:"#3a1622",y:"#c0485e"},
  {id:"grafito",n:"Grafito",d:"Neutra",rail:"#2a2d31",y:"#6c8199"},
  {id:"clasico",n:"Clásico estructural",d:"Negro y amarillo",rail:"#111111",y:"#ffc400"}
];

/* ============================================================
   Roles
   - owner: dueño de la plataforma. Crea empresas y usuarios. Entra a un proyecto solo si lo agregan como miembro.
   - esAdmin: administrador de una empresa. Crea proyectos y usuarios de su empresa.
   - En cada proyecto el usuario tiene un rol: director, residente o constructor.
   ============================================================ */
const ROL_P={director:"Director",residente:"Residente",constructor:"Constructor"};
const ROL_DESC={director:"Revisa, aprueba y publica. Edita todo el proyecto.",residente:"Registra inspecciones, documentos, NC e informes y los envía a revisión.",constructor:"Consulta lo aprobado y responde las No Conformidades."};
const zonasDe=p=>(p.torres||[]).map(t=>{const w=String(t).trim().split(/\s+/);const cod=(w.length>1?w[0][0]+w.slice(1).join(""):t).toUpperCase().normalize("NFD").replace(/[^A-Z0-9]/g,"").slice(0,5)||"T";return{cod,nombre:t};});

/* ============================================================
   Datos de demostración (ficticios)
   ============================================================ */
function demoBase(){
  const allC=tipo=>{const r={};chkItems(tipo).filter(it=>it.fase==="antes").forEach(it=>{r[it.id]={e:"C"};});return r;};
  const full=(tipo,except={})=>{const r={};chkItems(tipo).forEach(it=>{r[it.id]=except[it.id]||{e:"C"};});return r;};
  const revAll=(k,over={})=>REV[k].items.map((t,i)=>Object.assign({t:t[0],est:"ok",pag:String(3+i*2),obs:""},over[i]||{}));
  const P1={id:"P1",nombre:"Edificio Mirador del Parque",direccion:"Carrera 00 # 00-00",municipio:"Pereira, Risaralda",propietario:"Inversiones Mirador S.A.S.",constructora:"Constructora Demo S.A.S.",directorObra:"Ing. Mateo Rincón Salazar",
    licencia:"66001-0-26-0000",curaduria:"Curaduría Urbana No. 1 de Pereira",area:"9.840 m²",unidades:"126 apartamentos",inicio:"2026-02-02",contrato:"Contrato STI 014-2026",
    sistemas:["porticos","muros"],torres:["Torre A","Torre B"],
    documentos:[
      {id:"D01",tipo:"licencia",nombre:"Licencia de construcción 66001-0-26-0000",version:"1",fecha:"2026-01-14",vence:"2028-01-14",flujo:"aprobado",
        datos:{"Número":"66001-0-26-0000","Curaduría":"Curaduría Urbana No. 1 de Pereira","Fecha de expedición":"14 ene 2026","Vigencia":"24 meses","Titular":"Inversiones Mirador S.A.S.","Área construida":"9.840 m²","Unidades":"126 apartamentos","Uso":"Vivienda multifamiliar"}},
      {id:"D02",tipo:"otro",cat:"Licencias y permisos",nombre:"Plan de manejo ambiental de RCD",version:"1",fecha:"2026-01-20",vence:"2026-11-02",flujo:"aprobado",datos:{"Título":"Plan de manejo de residuos de construcción y demolición"}},
      {id:"D03",tipo:"otro",nombre:"Contrato de supervisión técnica independiente",version:"1",fecha:"2026-01-28",flujo:"aprobado",datos:{"Título":"Contrato STI 014-2026"}},
      {id:"D05",tipo:"suelos",nombre:"Estudio geotécnico",version:"2",fecha:"2025-11-18",flujo:"aprobado",datos:{"Responsable":"Ing. Sofía Cárdenas","Matrícula":"17202-000004 CLD","Resumen":"8 sondeos de 18 a 25 m. Cimentación con losa y pilotes."},
        rev:revAll("suelos",{8:{est:"inc",obs:"La contención provisional solo cubre el costado oriental; falta el costado sur, contiguo al vecino."}})},
      {id:"D06",tipo:"estructural",nombre:"Memoria de cálculo estructural",version:"3",fecha:"2025-12-02",flujo:"aprobado",datos:{"Responsable":"Ing. Ricardo Peña Mejía","Matrícula":"17202-000003 CLD"},
        rev:revAll("estructural",{5:{est:"inc",obs:"La torre B se reporta regular en planta, pero el vacío de escaleras supera el 50 % del área en el eje C. Solicitar justificación."}})},
      {id:"D07",tipo:"planos",nombre:"Planos estructurales Torre A y B",version:"4.0",fecha:"2026-03-05",flujo:"aprobado",datos:{"Resumen":"Láminas E-01 a E-38"},
        rev:revAll("planos",{7:{est:"aus",pag:"",obs:"No hay despiece de la escalera de la Torre B."}})}],
    certificados:[
      {id:"CE-01",material:"Acero corrugado 420 MPa (3/8\" a 1\")",proveedor:"Aceros del Centro (ficticio)",lote:"L-24871",norma:"NTC 2289",fecha:"2026-05-28",cantidad:"18,4 t",resultado:"Cumple",flujo:"aprobado"},
      {id:"CE-02",material:"Concreto premezclado 21 y 28 MPa",proveedor:"Concretos Demo S.A.",lote:"Contrato de suministro",norma:"NTC 3318",fecha:"2026-05-30",cantidad:"Según remisiones",resultado:"Cumple",flujo:"aprobado"},
      {id:"CE-03",material:"Malla electrosoldada D-131 y D-188",proveedor:"Mallas Demo S.A.S.",lote:"M-5521",norma:"NTC 5806",fecha:"2026-06-25",cantidad:"640 paneles",resultado:"Cumple",flujo:"aprobado"},
      {id:"CE-04",material:"Bloque de arcilla de perforación vertical",proveedor:"Ladrillera Demo",lote:"B-0912",norma:"NTC 4205-1",fecha:"2026-08-12",cantidad:"12.000 und",resultado:"Cumple",flujo:"aprobado"},
      {id:"CE-05",material:"Acero corrugado 420 MPa (1/2\" y 5/8\")",proveedor:"Aceros del Centro (ficticio)",lote:"L-25310",norma:"NTC 2289",fecha:"2026-09-29",cantidad:"9,1 t",resultado:"Cumple",flujo:"revision"}],
    muestras:[
      {id:"M-001",ubic:"Cimentación Torre A, zapatas ejes 1–3",tipo:"concreto",fc:21,fecha:"2026-06-04",r7:[15.2,15.8],r28:[23.1,23.6,22.9]},
      {id:"M-002",ubic:"Cimentación Torre A, vigas ejes 3–5",tipo:"concreto",fc:21,fecha:"2026-06-06",r7:[14.8,15.1],r28:[22.4,21.9,22.8]},
      {id:"M-003",ubic:"Losa de cimentación Torre B, sector 1",tipo:"concreto",fc:21,fecha:"2026-06-18",r7:[16.0,15.6],r28:[24.0,23.4,23.8]},
      {id:"M-004",ubic:"Losa de cimentación Torre B, sector 2",tipo:"concreto",fc:21,fecha:"2026-06-19",r7:[14.2,14.9],r28:[21.6,22.3,21.2]},
      {id:"M-005",ubic:"Columnas piso 1, Torre A",tipo:"concreto",fc:28,fecha:"2026-07-02",r7:[21.0,20.4],r28:[31.2,30.5,31.8]},
      {id:"M-006",ubic:"Muros piso 1, Torre B (ejes 1–4)",tipo:"concreto",fc:21,fecha:"2026-07-08",r7:[12.9,13.4],r28:[18.6,19.2,18.9]},
      {id:"M-007",ubic:"Placa piso 2, Torre A",tipo:"concreto",fc:28,fecha:"2026-07-16",r7:[19.8,20.3],r28:[29.4,30.1,28.8]},
      {id:"M-008",ubic:"Muros piso 1, Torre B (ejes 5–8)",tipo:"concreto",fc:21,fecha:"2026-07-20",r7:[11.6,11.9],r28:[16.4,17.1,16.8]},
      {id:"M-009",ubic:"Columnas piso 2, Torre A",tipo:"concreto",fc:28,fecha:"2026-07-30",r7:[18.4,18.9],r28:[27.1,26.4,26.9]},
      {id:"M-010",ubic:"Placa piso 2, Torre B",tipo:"concreto",fc:21,fecha:"2026-08-05",r7:[15.9,16.2],r28:[22.8,23.3,22.5]},
      {id:"M-011",ubic:"Placa piso 3, Torre A",tipo:"concreto",fc:28,fecha:"2026-08-14",r7:[21.2,21.9],r28:[30.8,31.5,30.2]},
      {id:"M-012",ubic:"Muros piso 2, Torre B",tipo:"concreto",fc:21,fecha:"2026-08-21",r7:[16.8,16.4],r28:[23.9,24.4,23.5]},
      {id:"M-013",ubic:"Placa piso 3, Torre A (segunda etapa)",tipo:"concreto",fc:28,fecha:"2026-08-15",r7:[20.6,21.0],r28:[29.9,30.6]},
      {id:"M-014",ubic:"Columnas piso 3, Torre A (C1–C10)",tipo:"concreto",fc:28,fecha:"2026-09-03",r7:[20.1,19.6],r28:[]},
      {id:"M-015",ubic:"Columnas piso 3, Torre A (C11–C20)",tipo:"concreto",fc:28,fecha:"2026-09-24",r7:[21.3,20.8],r28:[]},
      {id:"M-016",ubic:"Muros piso 3, Torre B",tipo:"concreto",fc:21,fecha:"2026-10-01",r7:[14.9,15.3],r28:[]},
      {id:"MP-01",ubic:"Mampostería de fachada, piso 1",tipo:"mortero",fc:12.5,fecha:"2026-08-20",r7:[8.9,9.2],r28:[14.1,13.6,14.4]},
      {id:"GR-01",ubic:"Mampostería de fachada, piso 1",tipo:"grout",fc:17.5,fecha:"2026-08-20",r7:[12.1,12.6],r28:[19.2,18.8,19.6]},
      {id:"MP-02",ubic:"Mampostería de fachada, piso 2",tipo:"mortero",fc:12.5,fecha:"2026-09-10",r7:[7.4,7.1],r28:[11.2,10.9,11.6]}],
    inspecciones:[
      {id:"I-01",fecha:"2026-06-03",torre:"Torre A",nivel:"Cimentación",tipo:"cimentacion",ident:"Zapatas y vigas, ejes 1–5 / A–E",resp:full("cimentacion"),fotos:[],conforme:"2026-06-03"},
      {id:"I-02",fecha:"2026-06-17",torre:"Torre B",nivel:"Cimentación",tipo:"cimentacion",ident:"Losa de cimentación, ejes 1–8 / A–D",resp:full("cimentacion"),fotos:[],conforme:"2026-06-17"},
      {id:"I-03",fecha:"2026-07-01",torre:"Torre A",nivel:"Piso 1",tipo:"columnas",ident:"Columnas C1–C20",resp:full("columnas"),fotos:[],conforme:"2026-07-01"},
      {id:"I-04",fecha:"2026-07-07",torre:"Torre B",nivel:"Piso 1",tipo:"muros",ident:"Muros ejes 1–8 / A–D",resp:full("muros"),fotos:[],conforme:"2026-07-07"},
      {id:"I-05",fecha:"2026-07-15",torre:"Torre A",nivel:"Placa piso 2",tipo:"vigaslosa",ident:"Placa completa, ejes 1–5 / A–E",resp:full("vigaslosa"),fotos:[],conforme:"2026-07-15"},
      {id:"I-06",fecha:"2026-07-29",torre:"Torre A",nivel:"Piso 2",tipo:"columnas",ident:"Columnas C1–C20",resp:full("columnas",{"antes-8":{e:"NC",fix:"2026-07-30",obs:"C3 y C7 con recubrimiento de 2 cm en la cara norte; se exige 4 cm. Se instalan distanciadores y se verifica."}}),fotos:[],conforme:"2026-07-30"},
      {id:"I-07",fecha:"2026-08-04",torre:"Torre B",nivel:"Placa piso 2",tipo:"losa",ident:"Losa de entrepiso completa",resp:full("losa"),fotos:[],conforme:"2026-08-04"},
      {id:"I-08",fecha:"2026-08-13",torre:"Torre A",nivel:"Placa piso 3",tipo:"vigaslosa",ident:"Placa completa, ejes 1–5 / A–E",resp:full("vigaslosa",{"antes-9":{e:"NC",fix:"2026-08-14",obs:"Acero de placa con residuos de concreto y personal transitando sobre el refuerzo."}}),fotos:[],conforme:"2026-08-14"},
      {id:"I-09",fecha:"2026-08-20",torre:"Torre B",nivel:"Piso 2",tipo:"muros",ident:"Muros ejes 1–8 / A–D",resp:full("muros"),fotos:[],conforme:"2026-08-20"},
      {id:"I-10",fecha:"2026-09-30",torre:"Torre B",nivel:"Piso 3",tipo:"muros",ident:"Muros ejes 1–8 / A–D",resp:allC("muros"),fotos:[],conforme:"2026-09-30"},
      {id:"I-11",fecha:"2026-10-08",torre:"Torre A",nivel:"Piso 3",tipo:"columnas",ident:"Columnas C1–C20, ejes 1–5 / A–E",resp:{"antes-1":{e:"C"},"antes-2":{e:"C"},"antes-3":{e:"C"},"antes-4":{e:"C"},"antes-5":{e:"NC",obs:"C4 y C9: estribos a 15 cm en la zona confinada; el plano E-12 indica 10 cm."},"antes-6":{e:"C"},"antes-7":{e:"C"}},fotos:["demo-1","demo-2"],conforme:""}],
    nc:[
      {id:"NC-01",fecha:"2026-07-29",origen:"Inspección I-06",torre:"Torre A",ubic:"Columnas C3 y C7, piso 2",titulo:"Recubrimiento insuficiente en columnas C3 y C7",descripcion:"Durante la revisión previa al vaciado se midió un recubrimiento de 2 cm en la cara norte de las columnas C3 y C7. El plano exige 4 cm.",numeral:"NSR-10 C.7.7.1",requerida:"Instalar distanciadores de 4 cm y verificar las 20 columnas del nivel.",limite:"2026-07-30",fotos:[],estado:"cerrada",cierre:"2026-07-30",flujo:"aprobado",
        resp:[{id:"R1",fecha:"2026-07-30",autor:"Ing. Mateo Rincón Salazar",correctiva:"Se instalaron distanciadores plásticos de 4 cm en las 20 columnas y se rectificó el acero de C3 y C7.",preventiva:"El maestro verifica distanciadores antes de pedir la revisión.",fotos:[],veredicto:"aceptada",obs:"Verificado en obra.",fechaV:"2026-07-30"}]},
      {id:"NC-02",fecha:"2026-08-13",origen:"Inspección I-08",torre:"Torre A",ubic:"Placa piso 3",titulo:"Refuerzo de placa contaminado y pisado durante el armado",descripcion:"El acero inferior de la placa presenta residuos de concreto de vaciados anteriores y el personal transita sobre el refuerzo, desplazando bastones.",numeral:"NSR-10 C.7.4",requerida:"Limpiar el refuerzo, reponer los bastones desplazados e instalar pasarelas de tránsito.",limite:"2026-10-03",fotos:[],estado:"respondida",flujo:"aprobado",
        resp:[{id:"R1",fecha:"2026-10-02",autor:"Ing. Mateo Rincón Salazar",correctiva:"Se limpió el acero con cepillo metálico, se repusieron 14 bastones y se instalaron pasarelas de tablón en toda la placa del piso 4.",preventiva:"Las pasarelas quedan como requisito antes de armar cada placa.",fotos:["demo-3"],veredicto:"",obs:""}]},
      {id:"NC-03",fecha:"2026-08-17",origen:"Ensayo M-008",muestra:"M-008",torre:"Torre B",ubic:"Muros piso 1, ejes 5–8",titulo:"Resistencia a 28 días bajo el límite en muros del piso 1",descripcion:"La muestra M-008 dio 16,8 MPa a 28 días, por debajo del límite individual de 17,5 MPa para f'c 21 MPa.",numeral:"NSR-10 C.5.6.3.3 (b) y C.5.6.5",requerida:"Extraer núcleos en los muros representados por la muestra y presentar concepto del diseñador estructural.",limite:"2026-10-05",fotos:[],estado:"abierta",flujo:"aprobado",resp:[]},
      {id:"NC-04",fecha:"2026-10-08",origen:"Inspección I-11",torre:"Torre A",ubic:"Columnas C4 y C9, piso 3",titulo:"Separación de estribos mayor a la de diseño en zona confinada",descripcion:"En las columnas C4 y C9 los estribos de la zona confinada están a 15 cm. El plano E-12 indica 10 cm.",numeral:"NSR-10 C.21.6.4",requerida:"Reubicar los estribos a 10 cm en la zona confinada y revisar las demás columnas del nivel.",limite:"2026-10-10",fotos:["demo-1"],estado:"abierta",flujo:"borrador",insp:"I-11",item:"antes-5",resp:[]}],
    informes:[{id:"INF-01",tipo:"mensual",desde:"2026-09-01",hasta:"2026-09-30",creado:"2026-10-01",concl:"Durante septiembre se revisaron los muros del piso 3 de la Torre B, sin observaciones. La rotura a 28 días de la muestra M-014 sigue pendiente y debe gestionarse con el laboratorio.\n- Gestionar con el laboratorio la rotura atrasada de M-014.\n- Presentar los núcleos y el concepto del diseñador para cerrar NC-03.",flujo:"aprobado"}],
    actividad:[
      {f:"2026-10-08",q:"Andrés Ruiz",t:"Inspección de columnas piso 3, Torre A: 1 ítem requiere corrección."},
      {f:"2026-10-08",q:"Andrés Ruiz",t:"No conformidad NC-04 en borrador."},
      {f:"2026-10-02",q:"Mateo Rincón",t:"Respuesta del constructor a NC-02."},
      {f:"2026-10-01",q:"Andrés Ruiz",t:"Muestra M-016 registrada (muros piso 3, Torre B)."}]};
  const P2={id:"P2",nombre:"Conjunto Altos del Río",direccion:"Vereda El Retiro, lote 4",municipio:"Dosquebradas, Risaralda",propietario:"Promotora Altos S.A.S.",constructora:"Obras Demo Ltda.",directorObra:"Ing. Paula Cárdenas",
    licencia:"66170-0-26-0099",curaduria:"Secretaría de Planeación de Dosquebradas",area:"3.120 m²",unidades:"40 casas",inicio:"2026-08-01",contrato:"Contrato STI 021-2026",
    sistemas:["mamposteria"],torres:["Bloque 1","Bloque 2"],
    documentos:[{id:"D01",tipo:"licencia",nombre:"Licencia de construcción 66170-0-26-0099",version:"1",fecha:"2026-07-10",vence:"2028-07-10",flujo:"aprobado",datos:{"Número":"66170-0-26-0099","Vigencia":"24 meses","Unidades":"40 casas"}}],
    certificados:[{id:"CE-01",material:"Bloque de concreto estructural 12 cm",proveedor:"Bloques Demo S.A.S.",lote:"BQ-118",norma:"NTC 4026",fecha:"2026-08-20",cantidad:"9.500 und",resultado:"Cumple",flujo:"aprobado"}],
    muestras:[
      {id:"M-001",ubic:"Cimentación Bloque 1",tipo:"concreto",fc:21,fecha:"2026-08-25",r7:[15.1,15.6],r28:[23.0,22.6,23.4]},
      {id:"MP-01",ubic:"Muros piso 1, Bloque 1",tipo:"mortero",fc:12.5,fecha:"2026-09-12",r7:[9.0,9.4],r28:[13.8,14.2,13.5]},
      {id:"GR-01",ubic:"Muros piso 1, Bloque 1",tipo:"grout",fc:17.5,fecha:"2026-09-12",r7:[12.4,12.0],r28:[18.9,19.4,18.6]}],
    inspecciones:[
      {id:"I-01",fecha:"2026-09-11",torre:"Bloque 1",nivel:"Piso 1",tipo:"mamposteria",ident:"Muros casas 1 a 10",resp:full("mamposteria"),fotos:[],conforme:"2026-09-11"},
      {id:"I-02",fecha:"2026-10-06",torre:"Bloque 1",nivel:"Placa piso 2",tipo:"losa",ident:"Losa casas 1 a 10",resp:{"antes-1":{e:"C"},"antes-2":{e:"C"}},fotos:[],conforme:""}],
    nc:[{id:"NC-01",fecha:"2026-09-11",origen:"Inspección I-01",torre:"Bloque 1",ubic:"Muro casa 4, eje B",titulo:"Celdas con refuerzo vertical sin ventana de limpieza",descripcion:"Las celdas con refuerzo vertical del muro de la casa 4 no tienen ventana de inspección y limpieza en la primera hilada.",numeral:"NSR-10 D.4.6",requerida:"Abrir ventanas de limpieza, retirar rebabas y verificar el refuerzo antes de inyectar.",limite:"2026-10-12",fotos:[],estado:"abierta",flujo:"aprobado",resp:[]}],
    informes:[],actividad:[{f:"2026-10-06",q:"Andrés Ruiz",t:"Inspección de losa del piso 2, Bloque 1 iniciada."}]};
  return {v:4,rol:"director",actual:"P1",
    firma:{razon:"Firma Demo Supervisión S.A.S.",nit:"900.000.000-0",rep:"Laura Gómez Arango",dir:"Calle 00 # 00-00, Of. 201",ciudad:"Pereira, Risaralda",tel:"(606) 000 0000",correo:"contacto@firmademo.co",logo:"",
      prof:[{nombre:"Laura Gómez Arango",cargo:"Directora STI",profesion:"Ingeniera civil",matricula:"66202-000001 RIS"},{nombre:"Andrés Ruiz Henao",cargo:"Residente STI",profesion:"Ingeniero civil",matricula:"66202-000002 RIS"}]},
    proyectos:[P1,P2]};
}
const DEMO_PASS="demo1234",OWNER_PASS="admin1234";
const CUENTAS_DEMO=[
  ["admin","Dueño de la plataforma",OWNER_PASS],
  ["admin.demo","Administradora de Firma Demo · directora",DEMO_PASS],
  ["director2","Director · Firma Demo",DEMO_PASS],
  ["residente1","Residente · Edificio Mirador",DEMO_PASS],
  ["residente2","Residente · Altos del Río",DEMO_PASS],
  ["constructor1","Constructor · Edificio Mirador",DEMO_PASS],
  ["admin.ejemplo","Administrador de Ingeniería Ejemplo",DEMO_PASS]
];
/* ============================================================
   Proyecto de ensayo: un ejemplo de cada tipo de registro
   (documentos en todos los estados, certificados, ensayos de
   concreto y mampostería en todos los estados, inspecciones de
   cada elemento, no conformidades en cada estado, informes
   semanales y mensuales, y registro fotográfico).
   ============================================================ */
function proyectoEnsayo(){
  const full=(tipo,except={})=>{const r={};chkItems(tipo).forEach(it=>{r[it.id]=except[it.id]||{e:"C"};});return r;};
  const antes=(tipo,except={})=>{const r={};chkItems(tipo).filter(it=>it.fase==="antes").forEach(it=>{r[it.id]=except[it.id]||{e:"C"};});return r;};
  const revAll=(k,over={})=>REV[k].items.map((t,i)=>Object.assign({t:t[0],est:"ok",pag:String(2+i*3),obs:""},over[i]||{}));
  const P={id:"P3",nombre:"Proyecto de ensayo · Edificio Muestra",direccion:"Calle 00 # 00-00",municipio:"Pereira, Risaralda",propietario:"Promotora Muestra S.A.S.",constructora:"Constructora Demo S.A.S.",directorObra:"Ing. Mateo Rincón Salazar",
    licencia:"66001-0-26-0500",curaduria:"Curaduría Urbana No. 2 de Pereira",area:"6.450 m²",unidades:"72 apartamentos",inicio:"2026-07-20",contrato:"Contrato STI 030-2026",
    sistemas:["dual","mamposteria"],torres:["Torre 1","Torre 2"],empresaId:"E1",
    miembros:[{uid:"u1",rol:"director"},{uid:"u3",rol:"residente"},{uid:"u5",rol:"constructor"},{uid:"u0",rol:"director"}],
    documentos:[
      {id:"D01",tipo:"licencia",nombre:"Licencia de construcción 66001-0-26-0500",version:"1",fecha:"2026-06-30",vence:"2028-06-30",flujo:"aprobado",
        datos:{"Número":"66001-0-26-0500","Curaduría":"Curaduría Urbana No. 2 de Pereira","Fecha de expedición":"30 jun 2026","Vigencia":"24 meses","Titular":"Promotora Muestra S.A.S.","Área construida":"6.450 m²","Unidades":"72 apartamentos","Uso":"Vivienda multifamiliar"}},
      {id:"D02",tipo:"suelos",nombre:"Estudio geotécnico",version:"1",fecha:"2026-04-15",flujo:"aprobado",datos:{"Responsable":"Ing. Sofía Cárdenas","Matrícula":"17202-000004 CLD","Resumen":"6 sondeos de 15 a 20 m. Zapatas aisladas con vigas de amarre en la Torre 1 y losa de cimentación en la Torre 2."},
        rev:revAll("suelos",{4:{est:"inc",obs:"No se reporta el nivel freático en los sondeos S-5 y S-6."}})},
      {id:"D03",tipo:"estructural",nombre:"Memoria de cálculo estructural",version:"2",fecha:"2026-05-20",flujo:"aprobado",datos:{"Responsable":"Ing. Ricardo Peña Mejía","Matrícula":"17202-000003 CLD","Resumen":"Torre 1 en sistema combinado; Torre 2 en mampostería estructural de bloque de arcilla."},rev:revAll("estructural")},
      {id:"D04",tipo:"planos",nombre:"Planos estructurales Torres 1 y 2",version:"1",fecha:"2026-06-10",flujo:"aprobado",datos:{"Resumen":"Láminas E-01 a E-30"},rev:revAll("planos",{6:{est:"aus",pag:"",obs:"No se acotan las longitudes de traslapo del refuerzo de las dovelas de la Torre 2."}})},
      {id:"D05",tipo:"planos",nombre:"Planos estructurales Torre 2 · revisión 1.1 (dovelas)",version:"1.1",fecha:"2026-11-13",flujo:"aprobado",datos:{"Resumen":"Agrega el detalle de dovelas y refuerzo horizontal de la Torre 2 que faltaba en la versión 1."}},
      {id:"D06",tipo:"otro",cat:"Licencias y permisos",nombre:"Plan de manejo de tráfico",version:"1",fecha:"2026-07-01",vence:"2026-11-30",flujo:"aprobado",datos:{"Título":"Plan de manejo de tráfico aprobado por Movilidad"}},
      {id:"D07",tipo:"otro",nombre:"Póliza de responsabilidad civil extracontractual",version:"1",fecha:"2026-11-16",flujo:"revision",datos:{"Título":"Póliza RCE de la constructora"}},
      {id:"D08",tipo:"otro",nombre:"Memoria de diseño de elementos no estructurales",version:"1",fecha:"2026-11-05",flujo:"devuelto",datos:{"Título":"Diseño de fachadas y antepechos","Resumen":"Devuelta: no incluye el anclaje de antepechos al sistema estructural (NSR-10 A.9)."}}],
    certificados:[
      {id:"CE-01",material:"Acero corrugado 420 MPa (3/8\" a 3/4\")",proveedor:"Aceros del Centro (ficticio)",lote:"L-30112",norma:"NTC 2289",fecha:"2026-07-28",cantidad:"22,6 t",resultado:"Cumple",flujo:"aprobado"},
      {id:"CE-02",material:"Concreto premezclado 21 y 28 MPa",proveedor:"Concretos Demo S.A.",lote:"Contrato de suministro",norma:"NTC 3318",fecha:"2026-07-30",cantidad:"Según remisiones",resultado:"Cumple",flujo:"aprobado"},
      {id:"CE-03",material:"Bloque de arcilla de perforación vertical 12 cm",proveedor:"Ladrillera Demo",lote:"B-1204",norma:"NTC 4205-1",fecha:"2026-08-25",cantidad:"15.000 und",resultado:"Cumple",flujo:"aprobado"},
      {id:"CE-04",material:"Mortero de pega premezclado tipo S",proveedor:"Morteros Demo S.A.S.",lote:"MS-882",norma:"NTC 3329",fecha:"2026-09-15",cantidad:"320 bultos",resultado:"Cumple",flujo:"aprobado"},
      {id:"CE-05",material:"Malla electrosoldada D-131",proveedor:"Mallas Demo S.A.S.",lote:"M-6120",norma:"NTC 5806",fecha:"2026-10-20",cantidad:"410 paneles",resultado:"Cumple",flujo:"aprobado"},
      {id:"CE-06",material:"Grouting premezclado 17,5 MPa",proveedor:"Morteros Demo S.A.S.",lote:"GR-140",norma:"NTC 4048",fecha:"2026-11-14",cantidad:"150 bultos",resultado:"Cumple",flujo:"revision"},
      {id:"CE-07",material:"Anclaje químico epóxico",proveedor:"Químicos Demo",lote:"EP-55",norma:"ASTM C881",fecha:"2026-11-10",cantidad:"40 cartuchos",resultado:"No cumple",flujo:"devuelto"}],
    inspecciones:[
      {id:"I-01",fecha:"2026-08-03",torre:"Torre 1",nivel:"Cimentación",tipo:"cimentacion",ident:"Zapatas y vigas de amarre, ejes 1–6 / A–D",resp:full("cimentacion"),fotos:["demo-7"],conforme:"2026-08-03",obs:""},
      {id:"I-02",fecha:"2026-08-05",torre:"Torre 2",nivel:"Cimentación",tipo:"cimentacion",ident:"Losa de cimentación completa",resp:full("cimentacion"),fotos:[],conforme:"2026-08-05",obs:""},
      {id:"I-03",fecha:"2026-08-19",torre:"Torre 1",nivel:"Piso 1",tipo:"columnas",ident:"Columnas C1–C18",resp:full("columnas",{"antes-5":{e:"NC",fix:"2026-08-20",obs:"C6 con estribos a 14 cm en la zona confinada; el plano indica 10 cm. Se reubicaron y se verificó."}}),fotos:["demo-8"],conforme:"2026-08-20",obs:""},
      {id:"I-04",fecha:"2026-08-26",torre:"Torre 1",nivel:"Piso 1",tipo:"muros",ident:"Pantallas ejes 1 y 6",resp:full("muros"),fotos:[],conforme:"2026-08-26",obs:""},
      {id:"I-05",fecha:"2026-09-01",torre:"Torre 2",nivel:"Piso 1",tipo:"mamposteria",ident:"Muros de bloque, ejes 1–5 / A–C",resp:full("mamposteria"),fotos:["demo-9"],conforme:"2026-09-01",obs:""},
      {id:"I-06",fecha:"2026-09-02",torre:"Torre 1",nivel:"Placa piso 2",tipo:"vigaslosa",ident:"Placa completa, ejes 1–6 / A–D",resp:full("vigaslosa"),fotos:[],conforme:"2026-09-02",obs:""},
      {id:"I-07",fecha:"2026-09-22",torre:"Torre 2",nivel:"Placa piso 2",tipo:"losa",ident:"Losa de entrepiso completa",resp:full("losa"),fotos:[],conforme:"2026-09-22",obs:""},
      {id:"I-08",fecha:"2026-10-01",torre:"Torre 1",nivel:"Pisos 1 a 2",tipo:"escaleras",ident:"Escalera principal, tramos 1 y 2",resp:full("escaleras"),fotos:[],conforme:"2026-10-01",obs:""},
      {id:"I-09",fecha:"2026-10-07",torre:"Torre 1",nivel:"Piso 3",tipo:"columnas",ident:"Columnas C1–C18",resp:full("columnas",{"antes-8":{e:"NC",fix:"2026-10-07",obs:"Faltaban distanciadores en C11 y C12; se instalaron antes del vaciado."}}),fotos:[],conforme:"2026-10-07",obs:""},
      {id:"I-10",fecha:"2026-10-28",torre:"Torre 1",nivel:"Placa piso 4",tipo:"vigaslosa",ident:"Placa completa, ejes 1–6 / A–D",resp:full("vigaslosa"),fotos:["demo-14"],conforme:"2026-10-28",obs:""},
      {id:"I-11",fecha:"2026-11-04",torre:"Torre 2",nivel:"Piso 3",tipo:"mamposteria",ident:"Muros de bloque, ejes 1–5 / A–C",resp:full("mamposteria",{"antes-3":{e:"NC",fix:"",obs:"Dovelas sin limpiar en los muros del eje B: rebabas de mortero obstruyen las celdas a inyectar."}}),fotos:["demo-10"],conforme:"",obs:""},
      {id:"I-12",fecha:"2026-11-11",torre:"Torre 1",nivel:"Piso 4",tipo:"muros",ident:"Pantallas ejes 1 y 6",resp:full("muros"),fotos:["demo-11"],conforme:"2026-11-11",obs:""},
      {id:"I-13",fecha:"2026-11-13",torre:"Torre 2",nivel:"Piso 4",tipo:"mamposteria",ident:"Muros de bloque, ejes 1–5 / A–C",resp:full("mamposteria",{"antes-2":{e:"NC",fix:"2026-11-13",obs:"Refuerzo horizontal de escalerilla faltante en dos hiladas; se completó y se verificó."}}),fotos:[],conforme:"2026-11-13",obs:""},
      {id:"I-14",fecha:"2026-11-17",torre:"Torre 1",nivel:"Piso 5",tipo:"columnas",ident:"Columnas C1–C18",resp:full("columnas",{"antes-4":{e:"NC",obs:"C2 y C15 con traslapos de 40 cm en la zona confinada inferior; el plano exige traslapo en el tercio medio."}}),fotos:["demo-12","demo-13"],conforme:"",obs:""},
      {id:"I-15",fecha:"2026-11-18",torre:"Torre 1",nivel:"Placa piso 5",tipo:"vigaslosa",ident:"Placa completa, ejes 1–6 / A–D",resp:antes("vigaslosa"),fotos:[],conforme:"",conf:{antes:"2026-11-18",durante:"",despues:""},obs:"Armado revisado; pendiente el control durante el vaciado."}],
    nc:[
      {id:"NC-01",fecha:"2026-08-19",origen:"Inspección I-03",torre:"Torre 1",ubic:"Columna C6, piso 1",titulo:"Estribos de C6 más separados que en el diseño",descripcion:"En la columna C6 los estribos de la zona confinada están a 14 cm; el plano indica 10 cm.",numeral:"NSR-10 C.21.6.4",requerida:"Reubicar los estribos a 10 cm y revisar las demás columnas del nivel.",limite:"2026-08-21",fotos:["demo-8"],estado:"cerrada",flujo:"aprobado",insp:"I-03",item:"antes-5",cierre:"2026-08-20",
        resp:[{id:"R1",fecha:"2026-08-20",autor:"Ing. Mateo Rincón Salazar",correctiva:"Se reubicaron los estribos de C6 a 10 cm y se revisaron las 18 columnas del nivel.",preventiva:"El maestro de obra verifica con flexómetro la separación de estribos antes de pedir la revisión.",fotos:["demo-15"],veredicto:"aceptada",obs:"Verificado en obra.",fechaV:"2026-08-20"}]},
      {id:"NC-02",fecha:"2026-10-09",origen:"Ensayo de concreto, muestra 6",muestra:"6",ensayo:"concreto:6",torre:"Torre 1",ubic:"Pantallas piso 2, ejes 1 y 6",titulo:"Resistencia a 28 días bajo el límite en pantallas del piso 2",descripcion:"La muestra 6 dio 16,8 MPa a 28 días, por debajo del límite individual de 17,5 MPa para f'c 21 MPa.",numeral:"NSR-10 C.5.6.3.3 (b) y C.5.6.5",requerida:"Extraer núcleos en las pantallas representadas por la muestra y presentar el concepto del diseñador estructural.",limite:"2026-11-09",fotos:[],estado:"respondida",flujo:"aprobado",
        resp:[{id:"R1",fecha:"2026-11-06",autor:"Ing. Mateo Rincón Salazar",correctiva:"Se extrajeron 3 núcleos en las pantallas del piso 2 (promedio corregido 19,6 MPa). Se adjunta el concepto del diseñador, que acepta la resistencia obtenida.",preventiva:"Se reforzó el control de asentamiento y de agua adicionada en obra.",fotos:["demo-16"],veredicto:"",obs:""}]},
      {id:"NC-03",fecha:"2026-10-14",origen:"Ensayo de grouting, muestra GR-02",muestra:"GR-02",ensayo:"mamposteria:GR-02",torre:"Torre 2",ubic:"Muros piso 2, ejes 1–5",titulo:"Grouting bajo el límite individual en muros del piso 2",descripcion:"La muestra GR-02 dio 13,6 MPa a 28 días; el límite individual para f'cr 17,5 MPa es 14,0 MPa.",numeral:"NSR-10 D.3.7",requerida:"Presentar un plan de verificación (extracción de muretes o núcleos) y el concepto del diseñador.",limite:"2026-11-10",fotos:[],estado:"abierta",flujo:"aprobado",resp:[]},
      {id:"NC-04",fecha:"2026-11-04",origen:"Inspección I-11",torre:"Torre 2",ubic:"Muros eje B, piso 3",titulo:"Dovelas obstruidas con rebabas de mortero",descripcion:"En los muros del eje B las celdas a inyectar tienen rebabas de mortero que impiden el paso del grouting.",numeral:"NSR-10 D.4.6",requerida:"Limpiar las celdas por las ventanas de inspección antes de inyectar y presentar fotos de cada ventana.",limite:"2026-11-25",fotos:["demo-10"],estado:"abierta",flujo:"aprobado",insp:"I-11",item:"antes-3",
        resp:[{id:"R1",fecha:"2026-11-08",autor:"Ing. Mateo Rincón Salazar",correctiva:"Se limpiaron las celdas con varilla.",preventiva:"",fotos:[],veredicto:"rechazada",obs:"En la verificación aún había rebabas en 3 celdas y no se abrieron ventanas de limpieza. Se debe repetir con ventanas y fotos.",fechaV:"2026-11-10"}]},
      {id:"NC-05",fecha:"2026-11-12",origen:"Revisión documental",torre:"General",ubic:"Memoria de elementos no estructurales",titulo:"Falta el diseño del anclaje de antepechos",descripcion:"La memoria de elementos no estructurales no incluye el anclaje de antepechos y fachadas al sistema estructural.",numeral:"NSR-10 A.9",requerida:"Presentar la memoria complementada y firmada por el diseñador.",limite:"2026-11-28",fotos:[],estado:"abierta",flujo:"aprobado",resp:[]},
      {id:"NC-06",fecha:"2026-11-17",origen:"Inspección I-14",torre:"Torre 1",ubic:"Columnas C2 y C15, piso 5",titulo:"Traslapos de columnas en la zona confinada",descripcion:"En C2 y C15 los traslapos del refuerzo longitudinal quedaron en la zona confinada inferior; el plano exige ubicarlos en el tercio medio.",numeral:"NSR-10 C.21.6.3.2",requerida:"Reubicar los traslapos o presentar una solución aprobada por el diseñador.",limite:"2026-11-24",fotos:["demo-12"],estado:"abierta",flujo:"borrador",insp:"I-14",item:"antes-4",resp:[]}],
    fotos:[
      {id:"demo-17",fecha:"2026-09-30",desc:"Avance de estructura, Torre 1 piso 3",torre:"Torre 1"},
      {id:"demo-18",fecha:"2026-10-30",desc:"Mampostería de la Torre 2, piso 3",torre:"Torre 2"},
      {id:"demo-19",fecha:"2026-11-15",desc:"Vista general de la obra desde el acceso",torre:"General"},
      {id:"demo-20",fecha:"2026-11-18",desc:"Formaleta de la placa del piso 5, Torre 1",torre:"Torre 1"}],
    fotoDesc:{},
    avance:[{act:"Cimentación Torre 1",pct:100},{act:"Estructura Torre 1",pct:48},{act:"Cimentación Torre 2",pct:100},{act:"Mampostería estructural Torre 2",pct:62},{act:"Placas Torre 2",pct:55}],
    informes:[
      {id:"AM-01",tipo:"mensual",desde:"2026-09-01",hasta:"2026-09-30",creado:"2026-10-01",flujo:"aprobado",
        txtCert:"Se recibió y revisó el certificado del mortero de pega premezclado, conforme a la NTC 3329.",txtEns:"Las roturas a 28 días del periodo cumplen, salvo la muestra 6 de las pantallas del piso 2, que está por debajo del límite individual.",
        txtInsp:"Se revisaron la mampostería del piso 1 de la Torre 2, la placa del piso 2 de ambas torres y la escalera; todos los elementos quedaron conformes.",
        avance:[["Cimentación Torre 1",100,100],["Estructura Torre 1",10,22],["Cimentación Torre 2",100,100],["Mampostería estructural Torre 2",0,18],["Placas Torre 2",0,15]].map(([act,ant,pct])=>({act,ant,pct})),
        fotos:["demo-9","demo-17"],concl:"El avance de septiembre fue conforme al programa.\n- Gestionar con el laboratorio las roturas a 28 días de octubre.\n- Mantener el control de distanciadores en columnas."},
      {id:"AM-02",tipo:"mensual",desde:"2026-10-01",hasta:"2026-10-31",creado:"2026-11-01",flujo:"aprobado",
        txtCert:"Se recibió el certificado de la malla electrosoldada D-131.",txtEns:"Se generó la NC-02 por la muestra 6 y la NC-03 por el grouting GR-02. La muestra 8 queda con promedio bajo y se sigue de cerca.",
        txtInsp:"Se revisaron las columnas del piso 3 y la placa del piso 4 de la Torre 1; se hizo corregir la falta de distanciadores en dos columnas.",
        avance:[["Cimentación Torre 1",100,100],["Estructura Torre 1",22,38],["Cimentación Torre 2",100,100],["Mampostería estructural Torre 2",18,45],["Placas Torre 2",15,35]].map(([act,ant,pct])=>({act,ant,pct})),
        fotos:["demo-14","demo-18"],concl:"Quedan abiertas dos no conformidades por resistencia (NC-02 y NC-03).\n- Presentar núcleos y concepto del diseñador para la NC-02.\n- Presentar el plan de verificación del grouting para la NC-03."},
      {id:"IS-01",tipo:"semanal",desde:"2026-11-09",hasta:"2026-11-15",creado:"2026-11-16",flujo:"aprobado",
        txtInsp:"Se revisaron las pantallas del piso 4 de la Torre 1 y la mampostería del piso 4 de la Torre 2. En la Torre 2 se hizo completar el refuerzo de escalerilla antes de continuar.",
        aspectos:"Completar el refuerzo horizontal de escalerilla en todas las hiladas indicadas en planos.\nLimpiar las dovelas por ventanas de inspección antes de inyectar.",
        txtDoc:"Se recibió la revisión 1.1 de los planos de la Torre 2 con el detalle de dovelas.",
        avance:[["Cimentación Torre 1",100,100],["Estructura Torre 1",42,45],["Cimentación Torre 2",100,100],["Mampostería estructural Torre 2",55,58],["Placas Torre 2",45,50]].map(([act,ant,pct])=>({act,ant,pct})),
        fotos:["demo-11","demo-19"],concl:"",txtCert:"",txtEns:""},
      {id:"IS-02",tipo:"semanal",desde:"2026-11-16",hasta:"2026-11-22",creado:"2026-11-18",flujo:"borrador",
        txtInsp:"Se revisaron las columnas del piso 5 de la Torre 1, con traslapos mal ubicados en dos columnas (NC-06), y el armado de la placa del piso 5.",
        aspectos:"Columnas piso 5, Torre 1: ubicar los traslapos en el tercio medio.",txtDoc:"Se recibió la póliza de responsabilidad civil, en revisión.",
        avance:[["Cimentación Torre 1",100,100],["Estructura Torre 1",45,48],["Cimentación Torre 2",100,100],["Mampostería estructural Torre 2",58,62],["Placas Torre 2",50,55]].map(([act,ant,pct])=>({act,ant,pct})),
        fotos:["demo-12","demo-20"],concl:"",txtCert:"",txtEns:""}],
    actividad:[
      {f:"2026-11-18",q:"Andrés Ruiz",t:"Inspección de la placa del piso 5, Torre 1: armado revisado."},
      {f:"2026-11-17",q:"Andrés Ruiz",t:"No conformidad NC-06 en borrador."},
      {f:"2026-11-16",q:"Laura Gómez",t:"Informe IS-01 aprobado: informe semanal."},
      {f:"2026-11-10",q:"Laura Gómez",t:"Respuesta a NC-04 rechazada."},
      {f:"2026-11-06",q:"Mateo Rincón",t:"Respuesta del constructor a NC-02."}]};
  /* Ensayos (los leen las apps de concreto y mampostería) */
  const z=zonasDe(P);const e=(fecha,r7,r28,f28)=>[...(r7?[{edad:7,fecha:addD(fecha,7),mpa:r7}]:[]),...(r28?[{edad:28,fecha:f28||addD(fecha,28),mpa:r28}]:[])];
  const C=(no,fecha,elemento,edificio,loc,fc,r7,r28,extra)=>Object.assign({no,fechaMuestreo:fecha,elemento,edificio,localizacion:loc,fc,ensayos:e(fecha,r7,r28),notas:""},extra||{});
  const conc=[
    C(1,"2026-08-04","CIMENTACIÓN","T1","CIMENTACIÓN TORRE 1, ZAPATAS EJES 1–3",21,[15.6,15.9],[23.4,23.9,23.1]),
    C(2,"2026-08-06","CIMENTACIÓN","T2","LOSA DE CIMENTACIÓN TORRE 2",21,[15.0,15.4],[22.6,22.1,23.0]),
    C(3,"2026-08-20","COLUMNAS","T1","COLUMNAS PISO 1, TORRE 1",28,[20.6,21.1],[29.8,30.4,29.5]),
    C(4,"2026-08-27","MURO","T1","PANTALLAS PISO 1, TORRE 1",21,[13.8,14.2],[20.4,19.9,20.6]),
    C(5,"2026-09-03","LOSA","T1","PLACA PISO 2, TORRE 1",28,[19.9,20.4],[28.9,29.3,28.4]),
    C(6,"2026-09-10","MURO","T1","PANTALLAS PISO 2, TORRE 1",21,[11.8,12.1],[17.0,16.6,16.9]),
    C(7,"2026-09-17","COLUMNAS","T1","COLUMNAS PISO 2, TORRE 1",28,[18.1,18.6],[26.1,25.8,26.4]),
    C(8,"2026-09-24","LOSA","T1","PLACA PISO 3, TORRE 1",28,[18.4,18.9],[26.6,27.0,26.2]),
    C(9,"2026-10-01","ESCALERA","T1","ESCALERA PISOS 1 A 2, TORRE 1",21,[11.9,12.2],[16.9,17.2,16.7],{aprobacion:{soporte:"Ensayos destructivos (núcleos / extracción de muretes)",ref:"Informe de núcleos LAB-0912",fecha:"2026-11-12"}}),
    C(10,"2026-10-08","COLUMNAS","T1","COLUMNAS PISO 3, TORRE 1",28,[20.5,21.0],null),
    C(11,"2026-10-29","LOSA","T1","PLACA PISO 4, TORRE 1",28,[20.9,21.4],null),
    C(12,"2026-11-12","MURO","T1","PANTALLAS PISO 4, TORRE 1",21,[14.6,15.0],null)];
  const M=(tipo,codigo,fecha,elemento,loc,fc,r7,r28,extra)=>Object.assign({id:tipo+"-"+codigo.replace(/[^A-Z0-9]/gi,"").toUpperCase(),tipo,no:parseInt(codigo.replace(/\D/g,""),10),codigo,fechaMuestreo:fecha,elemento,edificio:"T2",localizacion:loc,fc,ensayos:e(fecha,r7,r28),notas:""},extra||{});
  const fm=+(117*0.0980665).toFixed(2);
  const mamp=[
    M("mortero","MP-01","2026-09-02","MORTERO DE PEGA","MUROS PISO 1, TORRE 2",12.5,[9.1,9.4],[14.2,13.8,14.5]),
    M("mortero","MP-02","2026-09-23","MORTERO DE PEGA","MUROS PISO 2, TORRE 2",12.5,[8.0,8.3],[12.0,11.6,12.3]),
    M("mortero","MP-03","2026-10-14","MORTERO DE PEGA","MUROS PISO 3, TORRE 2",12.5,[7.0,7.3],[10.1,10.6,10.3]),
    M("mortero","MP-04","2026-11-04","MORTERO DE PEGA","MUROS PISO 4, TORRE 2",12.5,[8.1,8.4],null),
    M("grout","GR-01","2026-09-02","GROUTING","MUROS PISO 1, TORRE 2",17.5,[12.6,13.0],[19.6,19.1,20.0]),
    M("grout","GR-02","2026-09-23","GROUTING","MUROS PISO 2, TORRE 2",17.5,[9.4,9.8],[13.6,13.2,13.9]),
    M("grout","GR-03","2026-10-10","GROUTING","MUROS PISO 3, TORRE 2",17.5,[12.2,12.5],null),
    Object.assign(M("unidad","U-01","2026-08-28","BLOQUE","BLOQUE DE ARCILLA LOTE B-1204",null,null,null),{fc:null,clase:"PVI",ensayos:[],compresion:{fecha:"2026-09-04",mpa:[26.4,25.1,27.0,24.8,25.9],informe:"L-2210"},absorcion:{fecha:"2026-09-04",pct:[11.2,12.0,10.8,11.6,12.4],informe:"L-2210"}}),
    Object.assign(M("unidad","U-02","2026-10-02","BLOQUE","BLOQUE DE ARCILLA LOTE B-1290",null,null,null),{fc:null,clase:"PVI",ensayos:[],compresion:{fecha:"2026-10-09",mpa:[21.5,19.2,22.8,23.0,20.4],informe:"L-2388"},absorcion:{fecha:"2026-10-09",pct:[12.8,13.5,12.1,14.0,13.2],informe:"L-2388"}}),
    Object.assign(M("murete","MU-01","2026-09-09","MURETE INYECTADO","MURETES PISO 1, TORRE 2",fm,null,[12.3,12.9,11.8]),{fmKg:117}),
    Object.assign(M("murete","MU-02","2026-11-03","MURETE INYECTADO","MURETES PISO 3, TORRE 2",fm,null,null),{fmKg:117})];
  const ens={
    "mi-sti-ens-concreto-P3":{cfg:{proyecto:P.nombre,obra:"",constructora:P.constructora,laboratorio:"Laboratorio de ensayos Demo",zonas:z},muestras:conc,informes:[]},
    "mi-sti-ens-mamposteria-P3":{cfg:{proyecto:P.nombre,obra:"",constructora:P.constructora,laboratorio:"Laboratorio de ensayos Demo",zonas:z,claseUni:"PVI",absProm:13,absInd:16,critMam:"C"},muestras:mamp,informes:[]}};
  return{P,ens};
}

async function seedDatos(){
  const B=demoBase();const [P1,P2]=B.proyectos;const F=B.firma;
  const u=async(id,usuario,nombre,rol,extra,pass)=>Object.assign({id,usuario,nombre,rol,empresaId:null,esAdmin:false,activo:true,cargo:"",profesion:"",matricula:"",correo:"",salt:id+"-s",pass:await hashPass(pass||DEMO_PASS,id+"-s")},extra||{});
  const usuarios=[
    await u("u0","admin","Administrador Mi STI","owner",{cargo:"Dueño de la plataforma"},OWNER_PASS),
    await u("u1","admin.demo","Laura Gómez Arango","director",{empresaId:"E1",esAdmin:true,cargo:"Directora STI",profesion:"Ingeniera civil",matricula:"66202-000001 RIS"}),
    await u("u3","residente1","Andrés Ruiz Henao","residente",{empresaId:"E1",cargo:"Residente STI",profesion:"Ingeniero civil",matricula:"66202-000002 RIS"}),
    await u("u5","constructor1","Mateo Rincón Salazar","constructor",{empresaId:"E1",cargo:"Director de obra",constructora:"Constructora Demo S.A.S."}),
    await u("u7","admin.ejemplo","Jorge Salas Duque","director",{empresaId:"E2",esAdmin:true,cargo:"Director STI",profesion:"Ingeniero civil",matricula:"17202-000020 CLD"})];
  const empresas=[
    {id:"E1",razon:F.razon,nit:F.nit,rep:F.rep,dir:F.dir,ciudad:F.ciudad,tel:F.tel,correo:F.correo,logo:"",paleta:{id:"pizarra"},creada:"2026-01-10",activa:true},
    {id:"E2",razon:"Ingeniería Ejemplo Ltda.",nit:"901.111.222-3",rep:"Jorge Salas Duque",dir:"Carrera 00 # 00-00",ciudad:"Manizales, Caldas",tel:"(606) 000 1111",correo:"contacto@ejemplo.co",logo:"",paleta:{id:"azul"},creada:"2026-11-01",activa:true}];
  /* Ensayos: pasan a las apps de concreto y mampostería (cada proyecto guarda los suyos) */
  const ensSeed={};
  for(const p of [P1,P2]){
    const z=zonasDe(p);const zc=t=>(z.find(x=>p.torres.indexOf(x.nombre)>=0&&t.includes(x.nombre))||{}).cod||"";
    const el=t=>/column/i.test(t)?"COLUMNAS":/muro/i.test(t)?"MURO":/placa|losa/i.test(t)?"LOSA":/cimenta|zapata/i.test(t)?"CIMENTACIÓN":"";
    const ens=m=>[...(m.r7&&m.r7.length?[{edad:7,fecha:addD(m.fecha,7),mpa:m.r7}]:[]),...(m.r28&&m.r28.length?[{edad:28,fecha:addD(m.fecha,28),mpa:m.r28}]:[])];
    if(p===P1){const ms=p.muestras.filter(m=>m.tipo==="concreto").map(m=>({no:parseInt(m.id.replace(/\D/g,""),10),fechaMuestreo:m.fecha,elemento:el(m.ubic),edificio:zc(m.ubic),localizacion:m.ubic.toUpperCase(),fc:m.fc,ensayos:ens(m),notas:""}));
      ensSeed["mi-sti-ens-concreto-"+p.id]={cfg:{proyecto:p.nombre,obra:"",constructora:p.constructora,laboratorio:"Laboratorio de ensayos Demo",zonas:z},muestras:ms,informes:[]};}
    else{const ms=p.muestras.map(m=>{const t=m.tipo;const cod=m.id;return{id:t+"-"+cod.replace(/[^A-Z0-9]/gi,"").toUpperCase(),tipo:t,no:parseInt(cod.replace(/\D/g,""),10),codigo:cod,fechaMuestreo:m.fecha,elemento:t==="mortero"?"MORTERO DE PEGA":t==="grout"?"GROUTING":"CIMENTACION",edificio:zc(m.ubic),localizacion:m.ubic.toUpperCase(),fc:m.fc,ensayos:ens(m),notas:""};});
      ensSeed["mi-sti-ens-mamposteria-"+p.id]={cfg:{proyecto:p.nombre,obra:"",constructora:p.constructora,laboratorio:"Laboratorio de ensayos Demo",zonas:z,claseUni:"PVI",absProm:13,absInd:16,critMam:"C"},muestras:ms,informes:[]};}
    /* resumen precalculado (las apps lo recalculan al abrirse) */
    const rows=p.muestras.filter(m=>p===P2||m.tipo==="concreto").map(m=>({m,fc:+m.fc,base:m.r28&&m.r28.length?mean(m.r28):null}));
    const g=new Map();rows.filter(r=>r.base!=null).sort((a,b)=>a.m.fecha.localeCompare(b.m.fecha)).forEach(r=>{const k=r.m.tipo+"|"+r.fc;if(!g.has(k))g.set(k,[]);g.get(k).push(r);});
    for(const l of g.values())l.forEach((r,i)=>{if(i>=2)r.avg3=mean([l[i-2].base,l[i-1].base,r.base]);});
    const lb=fc=>fc<=35?fc-3.5:0.9*fc;const EL={cumple:"Cumple",aceptable:"Aceptable NSR",prombajo:"Promedio bajo",nocumple:"No cumple",pendiente:"Pendiente 28 d",vencido:"Sin rotura a 28 d"};
    const out=rows.map(r=>{let est;if(r.base==null)est=days(r.m.fecha,TODAY)>31?"vencido":"pendiente";else if(r.base<lb(r.fc)-1e-9)est="nocumple";else if(r.base>=r.fc-1e-9)est="cumple";else if(r.avg3!=null&&r.avg3<r.fc)est="prombajo";else est="aceptable";
      return{cod:p===P1?String(parseInt(r.m.id.replace(/\D/g,""),10)):r.m.id,tipo:r.m.tipo,tl:{concreto:"Concreto",mortero:"Mortero de pega",grout:"Grouting"}[r.m.tipo],fecha:r.m.fecha,elemento:"",loc:r.m.ubic.toUpperCase(),zona:"",fc:r.fc,base:r.base,ratio:r.base!=null?r.base/r.fc:null,est,el:EL[est]};});
    ensSeed[(p===P1?"mi-sti-ens-concreto-":"mi-sti-ens-mamposteria-")+p.id+"-resumen"]={act:TODAY,rows:out};
    delete p.muestras;
  }
  /* Ajustes del modelo nuevo */
  const full=(tipo,except={})=>{const r={};chkItems(tipo).forEach(it=>{r[it.id]=except[it.id]||{e:"C"};});return r;};
  P1.empresaId="E1";P2.empresaId="E1";
  P1.miembros=[{uid:"u1",rol:"director"},{uid:"u2",rol:"director"},{uid:"u3",rol:"residente"},{uid:"u5",rol:"constructor"}];
  P2.miembros=[{uid:"u1",rol:"director"},{uid:"u4",rol:"residente"},{uid:"u6",rol:"constructor"}];
  P1.nc.forEach(n=>{if(n.origen==="Ensayo M-008"){n.origen="Ensayo de concreto, muestra 8";n.descripcion=n.descripcion.replace("La muestra M-008","La muestra 8");}});
  P1.inspecciones.push(
    {id:"I-12",fecha:"2026-11-10",torre:"Torre B",nivel:"Piso 4",tipo:"muros",ident:"Muros ejes 1–8 / A–D",resp:full("muros"),fotos:["demo-4"],conforme:"2026-11-10",obs:""},
    {id:"I-13",fecha:"2026-11-17",torre:"Torre A",nivel:"Placa piso 4",tipo:"vigaslosa",ident:"Placa completa, ejes 1–5 / A–E",resp:full("vigaslosa",{"antes-7":{e:"NC",fix:"2026-11-18",obs:"Faltaban distanciadores en el acero inferior del paño entre ejes 2–3; se completaron y se verificó."}}),fotos:["demo-5"],conforme:"2026-11-18",obs:""});
  P1.certificados.push({id:"CE-06",material:"Concreto premezclado 28 MPa para placas",proveedor:"Concretos Demo S.A.",lote:"Remisiones nov.",norma:"NTC 3318",fecha:"2026-11-05",cantidad:"86 m³",resultado:"Cumple",flujo:"aprobado"});
  P1.documentos.push({id:"D08",tipo:"planos",nombre:"Planos estructurales Torre B · revisión 4.1 (escalera)",version:"4.1",fecha:"2026-11-12",flujo:"aprobado",datos:{"Resumen":"Incluye el despiece de la escalera de la Torre B que faltaba en la versión 4.0."}});
  P1.fotos=[{id:"demo-6",fecha:"2026-11-14",desc:"Vista general de la obra desde el costado sur",torre:"General"}];P2.fotos=[];
  P1.fotoDesc={};P2.fotoDesc={};
  const av1=[["Cimentación Torre A",100],["Estructura Torre A",42],["Cimentación Torre B",100],["Estructura Torre B",34],["Mampostería Torre A",6]];
  P1.avance=av1.map(([act,pct])=>({act,pct}));
  P2.avance=[{act:"Cimentación Bloque 1",pct:100},{act:"Muros piso 1, Bloque 1",pct:60},{act:"Cimentación Bloque 2",pct:15}];
  P1.informes=[{id:"INF-01",tipo:"mensual",desde:"2026-09-01",hasta:"2026-09-30",creado:"2026-10-01",flujo:"aprobado",
    txtCert:"",txtEns:"",txtInsp:"Durante septiembre se revisaron los muros del piso 3 de la Torre B, sin observaciones.",
    avance:[["Cimentación Torre A",100,100],["Estructura Torre A",22,30],["Cimentación Torre B",95,100],["Estructura Torre B",14,22],["Mampostería Torre A",0,0]].map(([act,ant,pct])=>({act,ant,pct})),
    fotos:[],concl:"La rotura a 28 días de las columnas del piso 3 sigue pendiente y debe gestionarse con el laboratorio.\n- Gestionar con el laboratorio la rotura atrasada.\n- Presentar los núcleos y el concepto del diseñador para cerrar NC-03."}];
  P2.informes=[];
  const PE=proyectoEnsayo();
  return{v:DATA_V,demo:true,creado:TODAY,usuarios,empresas,proyectos:[PE.P],ensSeed:PE.ens};
}
