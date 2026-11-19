/* Generado por herramientas/modularizar_ensayos.py a partir de ensayos/concreto.html. No editar a mano. */
window.ENS_MOD=window.ENS_MOD||{};
window.ENS_MOD["concreto"]={css:"\n:host{\n  color-scheme:light;\n  --bg:#f3f4f2; --surface:#ffffff; --surface-2:#eceeeb; --line:#d6d9d4; --line-strong:#b9beb7;\n  --ink:#1b2126; --ink-2:#4a535a; --ink-3:#737c83;\n  --accent:#2c5f8a; --accent-ink:#ffffff; --accent-soft:#e3ecf4;\n  --good:#0ca30c; --good-ink:#0b6e0b; --good-bg:#e5f4e3;\n  --warn:#fab219; --warn-ink:#7a5300; --warn-bg:#fdf1d4;\n  --serious:#ec835a; --serious-ink:#9a3f17; --serious-bg:#fbe6dc;\n  --crit:#d03b3b; --crit-ink:#a02525; --crit-bg:#f9e0e0;\n  --muted-bg:#e7e9e6; --late:#8a5cc2; --late-ink:#5f3a8c; --late-bg:#efe7f8;\n  --shadow:0 1px 2px rgba(20,30,40,.06),0 6px 20px rgba(20,30,40,.08);\n  --f-display:\"Barlow Semi Condensed\",\"Arial Narrow\",Arial,sans-serif;\n  --f-body:\"IBM Plex Sans\",system-ui,-apple-system,\"Segoe UI\",Roboto,sans-serif;\n  --f-mono:\"IBM Plex Mono\",ui-monospace,\"SFMono-Regular\",Menlo,Consolas,monospace;\n}\n*{box-sizing:border-box}\n.ensbody{background:var(--bg);color:var(--ink);font-family:var(--f-body);font-size:14px;line-height:1.45;padding-inline:clamp(16px,3vw,32px);padding-block:0 48px}\n.wrap{max-width:1320px;margin:0 auto;display:flex;flex-direction:column;gap:22px}\nh1,h2,h3{font-family:var(--f-display);font-weight:600;letter-spacing:.01em;text-wrap:balance;margin:0}\nh2{font-size:20px}\nh3{font-size:16px}\n.mono,.num{font-family:var(--f-mono);font-variant-numeric:tabular-nums}\nbutton,input,select,textarea{font:inherit;color:inherit}\nbutton{cursor:pointer}\n:focus-visible{outline:2px solid var(--accent);outline-offset:2px}\n.eyebrow{font-size:11px;text-transform:uppercase;letter-spacing:.09em;color:var(--ink-3);font-weight:600}\n.muted{color:var(--ink-3)}\n\n/* header */\n.top{display:flex;flex-wrap:wrap;align-items:flex-end;justify-content:space-between;gap:16px;padding-block:22px 18px;border-bottom:2px solid var(--ink)}\n.top h1{font-size:clamp(26px,4vw,36px);line-height:1.05}\n.top h1 span{color:var(--accent)}\n.meta{display:flex;flex-wrap:wrap;gap:6px 18px;margin-top:8px;color:var(--ink-2);font-size:13px}\n.meta b{font-weight:600;color:var(--ink)}\n.actions{display:flex;flex-wrap:wrap;gap:8px}\n.btn{border:1px solid var(--line-strong);background:var(--surface);padding:8px 14px;border-radius:6px;font-weight:500;display:inline-flex;align-items:center;gap:6px}\n.btn:hover{border-color:var(--ink-2)}\n.btn.primary{background:var(--accent);border-color:var(--accent);color:var(--accent-ink)}\n.btn.primary:hover{filter:brightness(1.08)}\n.btn.danger{color:var(--crit-ink);border-color:var(--crit)}\n.btn.small{padding:4px 9px;font-size:12.5px}\n.btn:disabled{opacity:.5;cursor:not-allowed}\n.banner{padding:10px 14px;border-radius:6px;background:var(--warn-bg);color:var(--warn-ink);border:1px solid var(--warn)}\n\n/* status summary */\n.statusbar{display:flex;flex-wrap:wrap;gap:8px}\n.schip{display:flex;align-items:center;gap:10px;border:1px solid var(--line);background:var(--surface);border-radius:8px;padding:9px 14px;min-width:140px;text-align:left}\n.schip .n{font-family:var(--f-display);font-size:26px;font-weight:600;line-height:1}\n.schip .l{font-size:12px;color:var(--ink-2);line-height:1.2}\n.schip[aria-pressed=\"true\"]{border-color:var(--ink);box-shadow:inset 0 0 0 1px var(--ink)}\n.dot{width:10px;height:10px;border-radius:50%;flex:none}\n\n/* class cards */\n.classes{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:12px}\n.ccard{background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:14px 16px;display:flex;flex-direction:column;gap:10px}\n.ccard header{display:flex;justify-content:space-between;align-items:baseline;gap:8px}\n.ccard .fc{font-family:var(--f-display);font-size:24px;font-weight:600}\n.ccard .fc small{font-size:13px;color:var(--ink-3);font-family:var(--f-body);font-weight:400}\n.stats{display:grid;grid-template-columns:repeat(3,1fr);gap:8px 12px}\n.stats div{display:flex;flex-direction:column}\n.stats .k{font-size:11px;color:var(--ink-3)}\n.stats .v{font-family:var(--f-mono);font-size:15px;font-weight:500}\n.bar{height:6px;border-radius:3px;background:var(--surface-2);overflow:hidden;display:flex;gap:2px}\n.bar i{display:block;height:100%}\n\n/* layout grid */\n.grid2{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,.9fr);gap:16px;align-items:start}\n@media (max-width:900px){.grid2{grid-template-columns:1fr}}\n.panel{background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:16px;display:flex;flex-direction:column;gap:12px;min-width:0}\n.panel > header{display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap}\n\n/* drop */\n.drop{border:1.5px dashed var(--line-strong);border-radius:8px;padding:22px 16px;text-align:center;background:var(--surface-2);display:flex;flex-direction:column;align-items:center;gap:6px;cursor:pointer;transition:background .15s,border-color .15s}\n.drop.over{border-color:var(--accent);background:var(--accent-soft)}\n.drop strong{font-family:var(--f-display);font-size:17px;font-weight:600}\n.drop input{display:none}\n.review{display:flex;flex-direction:column;gap:12px}\n.rep{border:1px solid var(--line);border-radius:8px;overflow:hidden}\n.rep > .rh{background:var(--surface-2);padding:10px 12px;display:flex;flex-wrap:wrap;gap:4px 14px;align-items:baseline}\n.rep > .rh b{font-family:var(--f-display);font-size:16px;font-weight:600}\n.warns{display:flex;flex-direction:column;gap:4px;padding:8px 12px 0}\n.warn{font-size:12.5px;padding:6px 9px;border-radius:5px;background:var(--serious-bg);color:var(--serious-ink)}\n.warn.crit{background:var(--crit-bg);color:var(--crit-ink)}\n.warn.info{background:var(--accent-soft);color:var(--ink-2)}\n.ritem{display:grid;grid-template-columns:auto 1fr;gap:4px 10px;padding:10px 12px;border-top:1px solid var(--line)}\n.ritem:first-of-type{border-top:0}\n.ritem .rt{display:flex;flex-wrap:wrap;gap:6px 10px;align-items:center}\n.ritem .rv{grid-column:2;font-size:12.5px;color:var(--ink-2)}\n.ritem .fields{grid-column:2;display:flex;flex-wrap:wrap;gap:8px}\n.ritem .fields label{display:flex;flex-direction:column;font-size:11px;color:var(--ink-3);gap:2px}\n.ritem .fields input,.ritem .fields select{padding:4px 6px;border:1px solid var(--line-strong);border-radius:4px;background:var(--surface);font-size:13px}\n.tag{font-size:11px;font-weight:600;letter-spacing:.04em;text-transform:uppercase;padding:2px 7px;border-radius:4px;background:var(--surface-2);color:var(--ink-2)}\n.tag.new{background:var(--accent-soft);color:var(--accent)}\n.tag.add{background:var(--good-bg);color:var(--good-ink)}\n.tag.dup{background:var(--muted-bg);color:var(--ink-3)}\n.tag.diff{background:var(--serious-bg);color:var(--serious-ink)}\n.rfoot{display:flex;justify-content:flex-end;gap:8px;flex-wrap:wrap}\n\n/* alerts */\n.alerts{display:flex;flex-direction:column;gap:6px;max-height:430px;overflow:auto}\n.alert{display:grid;grid-template-columns:auto 1fr auto;gap:10px;align-items:center;padding:8px 10px;border-radius:6px;border:1px solid var(--line);background:var(--surface);text-align:left;width:100%}\n.alert:hover{border-color:var(--ink-3)}\n.alert[data-open]{cursor:pointer}\n.alert.rev{opacity:.7}\n.alert .t{font-size:13px}\n.alert .t small{display:block;color:var(--ink-3);font-size:12px}\n.alert .no{font-family:var(--f-mono);font-size:12px;color:var(--ink-2)}\n.avisos{display:flex;flex-direction:column;gap:4px;padding-bottom:6px;margin-bottom:2px;border-bottom:1px dashed var(--line)}\n.aviso summary{cursor:pointer;font-size:12.5px;color:var(--ink-2);display:flex;align-items:center;gap:6px;list-style:none;padding:3px 0}\n.aviso summary::-webkit-details-marker{display:none}\n.aviso summary::after{content:\"▸\";color:var(--ink-3);font-size:11px}\n.aviso[open] summary::after{content:\"▾\"}\n.avl{font-size:12px;color:var(--ink-2);display:flex;flex-direction:column;gap:3px;padding:2px 0 6px 4px}\n.avl.avn{flex-direction:row;flex-wrap:wrap;gap:4px}\n.avb{border:1px solid var(--line);background:var(--surface);border-radius:4px;padding:1px 6px;font-size:11.5px;font-family:var(--f-mono)}\n.avb:hover{border-color:var(--ink-3)}\n.avline{display:flex;justify-content:space-between;gap:8px;align-items:center}\n.avline.done,.avi.done{opacity:.6}\n.avn{display:flex;flex-wrap:wrap;gap:4px}\n.avi{display:inline-flex;align-items:stretch}\n.avi .avb{border-radius:4px 0 0 4px}\n.avx{border:1px solid var(--line);background:var(--surface);border-radius:4px;padding:1px 7px;font-size:11.5px;color:var(--good-ink);white-space:nowrap}\n.avx:hover{border-color:var(--good)}\n.avx.sm{border-left:0;border-radius:0 4px 4px 0;padding:1px 5px}\n.avlink{border:0;background:none;padding:0;font-size:11.5px;color:var(--accent);text-decoration:underline}\n\n/* chips */\n.chip{display:inline-flex;align-items:center;gap:5px;font-size:12px;font-weight:600;padding:2px 8px 2px 6px;border-radius:999px;white-space:nowrap}\n.chip .ic{font-family:var(--f-mono);font-size:11px;width:15px;height:15px;border-radius:50%;display:inline-grid;place-items:center;color:#fff}\n.c-good{background:var(--good-bg);color:var(--good-ink)} .c-good .ic{background:var(--good)}\n.c-warn{background:var(--warn-bg);color:var(--warn-ink)} .c-warn .ic{background:#c98a00}\n.c-serious{background:var(--serious-bg);color:var(--serious-ink)} .c-serious .ic{background:#d0643a}\n.c-crit{background:var(--crit-bg);color:var(--crit-ink)} .c-crit .ic{background:var(--crit)}\n.c-muted{background:var(--muted-bg);color:var(--ink-2)} .c-muted .ic{background:var(--ink-3)}\n.c-late{background:var(--late-bg);color:var(--late-ink)} .c-late .ic{background:var(--late)}\n.c-apr{background:var(--accent-soft);color:var(--accent)} .c-apr .ic{background:var(--accent)}\n\n/* chart */\n.chartbox{position:relative}\n.chartbox svg{width:100%;height:auto;display:block}\n.chartbox{overflow-x:auto;border:1px solid var(--line);border-radius:6px;background:#fff}\n.chartbox svg{min-width:760px}\n.ctools{display:flex;flex-wrap:wrap;gap:8px;align-items:center}\n.ctools select{padding:6px 8px;border:1px solid var(--line-strong);border-radius:6px;background:var(--surface)}\n.ctools label{display:inline-flex;gap:6px;align-items:center;font-size:13px;color:var(--ink-2)}\n.impbox{display:flex;flex-wrap:wrap;gap:10px;align-items:center;justify-content:space-between;padding:12px 14px;border:1px solid var(--accent);background:var(--accent-soft);border-radius:8px}\n.tip{position:absolute;pointer-events:none;background:var(--ink);color:var(--bg);padding:7px 9px;border-radius:6px;font-size:12px;line-height:1.35;box-shadow:var(--shadow);max-width:240px;z-index:3}\n.tip b{font-family:var(--f-mono)}\n.legend{display:flex;flex-wrap:wrap;gap:6px 14px;font-size:12px;color:var(--ink-2)}\n.legend span{display:inline-flex;align-items:center;gap:6px}\n\n/* table */\n.filters{display:flex;flex-wrap:wrap;gap:8px;align-items:center}\n.filters select,.filters input{padding:6px 8px;border:1px solid var(--line-strong);border-radius:6px;background:var(--surface)}\n.filters input{min-width:0;flex:1 1 180px}\n.tablewrap{overflow-x:auto;border:1px solid var(--line);border-radius:8px;background:var(--surface)}\ntable{border-collapse:collapse;width:100%;min-width:1080px}\nth,td{padding:8px 10px;text-align:left;vertical-align:top;border-bottom:1px solid var(--line)}\nthead th{position:sticky;top:0;background:var(--surface-2);font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:var(--ink-2);font-weight:600;white-space:nowrap}\nthead tr.grp th{text-align:center;border-bottom:0;padding-bottom:0;color:var(--ink-3)}\ntbody tr{cursor:pointer}\ntbody tr:hover td{background:var(--accent-soft)}\ntd.no{font-family:var(--f-mono);font-weight:500;position:sticky;left:0;background:var(--surface);z-index:1}\ntbody tr:hover td.no{background:var(--accent-soft)}\ntd.loc{max-width:240px}\ntd.loc .e{font-weight:600;font-size:12.5px}\ntd.loc .l{color:var(--ink-2);font-size:12.5px}\n.ed{font-size:10.5px;font-weight:600;letter-spacing:.05em;padding:1px 5px;border-radius:3px;border:1px solid var(--line-strong);color:var(--ink-2);margin-left:4px}\n.res .v{font-family:var(--f-mono);font-weight:500;white-space:nowrap}\n.res .pct{font-size:12px;color:var(--ink-2);margin-left:4px}\n.res .cyl{font-family:var(--f-mono);font-size:11px;color:var(--ink-3);white-space:nowrap}\n.res .flag{color:var(--serious-ink);font-weight:700;margin-left:3px}\n.below{color:var(--crit-ink)}\n.empty{padding:36px 16px;text-align:center;color:var(--ink-3)}\n\n/* sheet */\n.scrim{position:fixed;inset:0;background:rgba(10,15,20,.4);z-index:20}\n.sheet{position:fixed;top:0;right:0;bottom:0;width:min(560px,100%);background:var(--surface);z-index:21;box-shadow:var(--shadow);display:flex;flex-direction:column;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}\n.sheet .sh{display:flex;justify-content:space-between;align-items:center;padding:14px 18px;border-bottom:1px solid var(--line);gap:10px}\n.sheet .sb{overflow:auto;padding:16px 18px;display:flex;flex-direction:column;gap:16px}\n.form{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}\n.form label{display:flex;flex-direction:column;gap:3px;font-size:12px;color:var(--ink-2)}\n.form label.full{grid-column:1/-1}\n.form input,.form select,.form textarea{padding:7px 9px;border:1px solid var(--line-strong);border-radius:5px;background:var(--surface)}\n.elist{display:flex;flex-direction:column;gap:8px}\n.eitem{border:1px solid var(--line);border-radius:6px;padding:10px 12px;display:grid;grid-template-columns:1fr auto;gap:4px 10px}\n.eitem .h{font-weight:600}\n.eitem .d{font-family:var(--f-mono);font-size:12.5px;color:var(--ink-2)}\n.addE{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}\n.addE label{display:flex;flex-direction:column;gap:3px;font-size:12px;color:var(--ink-2)}\n.addE input{padding:6px 8px;border:1px solid var(--line-strong);border-radius:5px;background:var(--surface);min-width:0}\n.confirm{display:flex;gap:8px;align-items:center;flex-wrap:wrap;background:var(--crit-bg);color:var(--crit-ink);padding:8px 10px;border-radius:6px}\n\n.toast{position:fixed;left:50%;bottom:calc(20px + env(safe-area-inset-bottom,0px));transform:translateX(-50%);background:var(--ink);color:var(--bg);padding:10px 16px;border-radius:8px;box-shadow:var(--shadow);z-index:40;font-size:13.5px;max-width:calc(100% - 32px)}\ndetails.crit{background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:12px 16px}\ndetails.crit summary{cursor:pointer;font-family:var(--f-display);font-size:17px;font-weight:600}\ndetails.crit .body{max-width:75ch;color:var(--ink-2);display:flex;flex-direction:column;gap:8px;margin-top:10px}\ndetails.crit table{min-width:0;width:auto}\n.reps{display:flex;flex-direction:column;gap:6px}\n.repline{display:flex;flex-wrap:wrap;align-items:center;gap:4px 14px;font-size:13px;padding:6px 0;border-bottom:1px solid var(--line)}\n/* tabla tipo Excel */\ntd.no{padding:0!important}\ntd.no .nob{display:flex;align-items:stretch;min-height:46px}\ntd.no .nob i{width:5px;flex:none}\ntd.no .nob span{flex:1;display:grid;place-items:center;font-family:var(--f-mono);font-size:16px;font-weight:600;padding:0 12px}\n.res .cyl .p{color:var(--ink-3)}\n.xwrap{overflow:auto;max-height:78vh;border:1px solid var(--line-strong);border-radius:6px;background:var(--surface)}\ntable.xt{border-collapse:separate;border-spacing:0;width:max-content;min-width:100%;font-size:12.5px}\n.xt th,.xt td{border-right:1px solid var(--line);border-bottom:1px solid var(--line);padding:5px 7px;text-align:center;vertical-align:middle}\n.xt thead{position:sticky;top:0;z-index:3}\n.xt thead th{position:static;min-width:54px;max-width:120px;background:#e4e8ec;color:var(--ink);font-size:11.5px;font-weight:600;line-height:1.2;text-transform:none;letter-spacing:0;white-space:normal}\n.xt thead th.gT{background:#dde8f3}.xt thead th.gD{background:#dcefdc}.xt thead th.gP{background:#ece2f5}\n.xt td.gT{background:#f6f9fc}.xt td.gD{background:#f5fbf5}.xt td.gP{background:#faf7fd}\n.xt td.gT.b,.xt td.gD.b,.xt td.gP.b{border-left:2px solid var(--line-strong)}\n.xt th.b{border-left:2px solid var(--line-strong)}\n.xt tbody tr{cursor:pointer}\n.xt tbody tr:hover td{background:var(--accent-soft)!important}\n.xt .c-no{position:sticky;left:0;z-index:2;background:var(--surface);border-right:2px solid var(--line-strong);padding:0}\n.xt thead th.c-no{position:sticky;left:0;z-index:4;background:#e4e8ec;padding:5px 7px;min-width:70px}\n.xt .nob{display:flex;align-items:stretch;min-height:44px}\n.xt .nob i{width:5px;flex:none}\n.xt .nob span{flex:1;display:grid;place-items:center;font-family:var(--f-mono);font-size:16px;font-weight:600;color:var(--ink);padding:0 10px}\n.xt td.t{text-align:left;min-width:120px;max-width:230px;white-space:normal}\n.xt td.f{font-family:var(--f-mono);white-space:nowrap;font-size:12px;color:var(--ink-2)}\n.xt .cv{font-family:var(--f-mono);font-weight:500;white-space:nowrap}\n.xt .cp{font-family:var(--f-mono);font-size:10.5px;color:var(--ink-3);white-space:nowrap}\n.xt td.pr .cv{font-weight:700}\n.xt td.pc{font-family:var(--f-mono);font-weight:700;white-space:nowrap}\n.xt .lo,.xt .lo .cp{color:var(--crit-ink)!important}\n.xt .mid,.xt .mid .cp{color:var(--warn-ink)!important}\n.xt .ok{color:var(--good-ink)}\n.xt td.e0{color:var(--line-strong)}\n.xt .sub{font-size:10.5px;color:var(--ink-3);margin-top:2px;white-space:nowrap}\n.kv{display:grid;grid-template-columns:auto 1fr;gap:3px 12px;font-size:12.5px}\n.kv span:nth-child(odd){color:var(--ink-3)}\n.zrow{display:grid;grid-template-columns:110px 1fr auto;gap:8px;align-items:center}\n.zrow input{padding:7px 9px;border:1px solid var(--line-strong);border-radius:5px;background:var(--surface);min-width:0}\n@media (prefers-reduced-motion:reduce){*{transition:none!important}}\n\n.ensbody{margin:0}[hidden]{display:none!important}img{max-width:100%}\n:host{display:block;--bg:transparent;--surface:#ffffff;--surface-2:#f1f1ec;--line:#deded8;--line-strong:#b5b5ad;\n  --ink:#111111;--ink-2:#3b3b38;--ink-3:#6a6a64;--f-display:\"Archivo\",\"Arial Narrow\",Arial,sans-serif}\n.ensbody{background:transparent!important;padding:0!important;color:var(--ink);font-family:var(--f-body);font-size:14px;line-height:1.45}\n.wrap{max-width:none!important;margin:0!important;padding:0!important}\n.top{padding:0!important;border:0!important;justify-content:flex-end!important;margin:0 0 4px!important}\n.top>div:first-child{display:none!important}\n#btnCfg,#btnExpJ,#btnImpJ,#btnReset{display:none!important}\n#tabs{display:none!important}\n.sheet,.scrim{z-index:60!important}.toast{z-index:70!important}\n",html:"<div class=\"wrap\">\n  <header class=\"top\">\n    <div>\n      <div class=\"eyebrow\">Supervisión técnica independiente · Control de ensayos de concreto</div>\n      <h1>Resistencias del concreto <span id=\"hProy\"></span></h1>\n      <div class=\"meta\">\n        <span>Obra lab. <b class=\"mono\" id=\"hObra\"></b></span>\n        <span>Laboratorio <b id=\"hLab\"></b></span>\n        <span>Constructora <b id=\"hCons\"></b></span>\n        <span id=\"hZonas\"></span>\n        <span id=\"syncState\" class=\"muted\">Conectando…</span>\n      </div>\n    </div>\n    <div class=\"actions\">\n      <button class=\"btn\" id=\"btnCfg\" type=\"button\">Editar proyecto</button>\n      <button class=\"btn\" id=\"btnExpJ\" type=\"button\">Exportar proyecto</button>\n      <button class=\"btn\" id=\"btnImpJ\" type=\"button\">Importar proyecto</button>\n      <input type=\"file\" id=\"fileJ\" accept=\".json,application/json\" hidden>\n      <button class=\"btn\" id=\"btnNew\" type=\"button\">+ Muestra manual</button>\n      <button class=\"btn primary\" id=\"btnExport\" type=\"button\">Exportar a Excel</button>\n      <button class=\"btn danger\" id=\"btnReset\" type=\"button\">Borrar todo</button>\n    </div>\n  </header>\n\n  <div id=\"banner\" class=\"banner\" hidden></div>\n  <div id=\"impBox\" hidden></div>\n\n  <section class=\"statusbar\" id=\"statusbar\" aria-label=\"Resumen por estado\"></section>\n\n  <section class=\"classes\" id=\"classes\" aria-label=\"Resumen por clase de concreto\"></section>\n\n  <section class=\"grid2\">\n    <div class=\"panel\">\n      <header><h2>Cargar informes del laboratorio</h2><span class=\"muted\" style=\"font-size:12px\">PDF del laboratorio · uno o varios</span></header>\n      <label class=\"drop\" id=\"drop\" for=\"file\">\n        <strong>Arrastra aquí los informes de roturas</strong>\n        <span class=\"muted\">o haz clic para elegirlos. Se leen No. de muestra, fecha de fundida, f'c, edad y cada cilindro.</span>\n        <input type=\"file\" id=\"file\" accept=\"application/pdf,.pdf\" multiple>\n      </label>\n      <div id=\"review\" class=\"review\"></div>\n    </div>\n    <div class=\"panel\">\n      <header><h2>Requiere atención</h2><span class=\"muted\" id=\"alertCount\" style=\"font-size:12px\"></span></header>\n      <div class=\"alerts\" id=\"alerts\"></div>\n    </div>\n  </section>\n\n  <section class=\"panel\">\n    <header>\n      <h2>Gráfica de control por clase de concreto</h2>\n      <div class=\"ctools\">\n        <select id=\"cFc\" aria-label=\"Clase de concreto\"></select>\n        <label><input type=\"checkbox\" id=\"cLbl\" checked> Etiquetas de %</label>\n        <button class=\"btn small\" type=\"button\" id=\"btnJpg\">Exportar imagen JPG</button>\n      </div>\n    </header>\n    <div class=\"muted\" style=\"font-size:12.5px\">Resistencia final de cada muestra (% de f'c), en orden de fecha de fundida: la de 28 días, o la de edad posterior / testigo si es mayor. Respeta el filtro de edificio / zona de la tabla. La resistencia mínima de aceptación es f'c − 3,5 MPa (NSR-10 C.5.6.3.3 b) y el promedio móvil es el de 3 muestras consecutivas.</div>\n    <div class=\"chartbox\" id=\"chart\"></div>\n  </section>\n\n  <section class=\"panel\">\n    <header>\n      <h2>Tabla de control</h2>\n      <span class=\"muted\" id=\"countLbl\" style=\"font-size:12px\"></span>\n    </header>\n    <div class=\"filters\">\n      <select id=\"fEdif\" aria-label=\"Edificio o zona\"></select>\n      <select id=\"fFc\" aria-label=\"Clase\"><option value=\"\">Todas las clases</option></select>\n      <select id=\"fEst\" aria-label=\"Estado\"><option value=\"\">Todos los estados</option></select>\n      <select id=\"fSort\" aria-label=\"Orden\"><option value=\"asc\">Por fecha de fundida (más antigua primero)</option><option value=\"desc\">Fundida más reciente primero</option><option value=\"no\">Por No. de muestra</option></select>\n      <input id=\"fQ\" type=\"search\" placeholder=\"Buscar elemento, localización o No.\">\n    </div>\n    <div class=\"tablewrap\">\n      <table>\n        <thead>\n          <tr class=\"grp\"><th colspan=\"4\"></th><th>Edad temprana</th><th>28 días</th><th>Edad posterior</th><th colspan=\"2\"></th></tr>\n          <tr><th>No.</th><th>Fundida</th><th>Elemento · localización</th><th>f'c MPa</th><th>MPa · % f'c</th><th>MPa · % f'c</th><th>MPa · % f'c</th><th>Prom. 3 consec.</th><th>Estado</th></tr>\n        </thead>\n        <tbody id=\"tbody\"></tbody>\n      </table>\n    </div>\n  </section>\n\n  <details class=\"crit\" id=\"repsBox\">\n    <summary>Informes cargados <span class=\"muted\" id=\"repsCount\" style=\"font-weight:400;font-size:14px\"></span></summary>\n    <div class=\"reps\" id=\"reps\" style=\"margin-top:10px\"></div>\n  </details>\n\n  <details class=\"crit\">\n    <summary>Criterio de aceptación usado (NSR-10 C.5.6.3.3)</summary>\n    <div class=\"body\">\n      <p>Un <b>ensayo</b> es el promedio de los cilindros de una misma muestra (mínimo 3 cilindros de 100×200 mm, C.5.6.2.4), a 28 días. Una clase de concreto es satisfactoria si cumple ambos requisitos:</p>\n      <p><b>(a)</b> Cada promedio de 3 ensayos consecutivos de la <b>misma clase (mismo f'c)</b>, en orden de fundida, es ≥ f'c.<br><b>(b)</b> Ningún ensayo es menor que f'c − 3,5 MPa (f'c ≤ 35 MPa) o que 0,90 f'c (f'c &gt; 35 MPa).</p>\n      <table>\n        <thead><tr><th>Clase</th><th>f'c</th><th>Límite individual (b)</th></tr></thead>\n        <tbody>\n          <tr><td>3000 psi</td><td class=\"num\">21,0 MPa</td><td class=\"num\">17,5 MPa (83 %)</td></tr>\n          <tr><td>4000 psi</td><td class=\"num\">28,0 MPa</td><td class=\"num\">24,5 MPa (88 %)</td></tr>\n          <tr><td>5000 psi</td><td class=\"num\">34,5 MPa</td><td class=\"num\">31,0 MPa (90 %)</td></tr>\n        </tbody>\n      </table>\n      <p><b>Estados:</b> <i>Cumple</i>: la resistencia final es ≥ 100 % de f'c (redondeada al % entero, como se muestra), sin importar el promedio de 3 consecutivos. <i>Aceptable NSR</i>: bajo 100 % pero sobre el límite (b), con promedio (a) ≥ f'c o sin 3 ensayos aún. <i>Promedio bajo</i>: bajo 100 %, sobre el límite (b), y el promedio de 3 consecutivos de su clase queda bajo f'c. <i>No cumple</i>: bajo el límite (b); aplica C.5.6.5 (investigación, núcleos NTC 3658). <b>Resistencia final:</b> la mayor entre la rotura a 28 días y la de edad posterior o testigos. Si la muestra testigo alcanza la resistencia, el estado se actualiza con ese resultado y se indica la edad de la rotura; el promedio de 3 consecutivos también usa la resistencia final.</p>\n      <p><b>Dispersión:</b> se marca con ⚑ cuando el rango de los cilindros supera 10,6 % del promedio (3 cilindros de 100×200 mm; 9,0 % para 2), referencia de NTC 673 / ASTM C39.</p>\n      <p><b>Solo cuentan resultados a 28 días o más:</b> una rotura temprana (3, 7 o 14 días) nunca da por cumplida la muestra, aunque supere f'c.</p>\n      <p><b>Estado a criterio:</b> solo las muestras en «Promedio bajo» tienen en la tabla un selector para pasarlas a «Aceptable NSR» a criterio del interventor, muestra por muestra. Una muestra que no llega al 100 % de f'c nunca se puede marcar como «Cumple». Se puede dejar una observación en la ficha. El cálculo y los promedios no cambian.</p>\n      <p><b>Alertas:</b> «Requiere atención» lista lo que exige una acción (no cumple, promedio bajo, rotura atrasada). Arriba, en dos líneas compactas que se despliegan, están los avisos del laboratorio (calibración de equipos) y las muestras con dispersión alta (⚑). Cada aviso se puede marcar como revisado; así, al llegar un informe nuevo solo quedan pendientes los avisos nuevos. Una dispersión revisada vuelve a pendiente si la muestra recibe una rotura nueva con dispersión.</p>\n      <p><b>Aprobada por concepto:</b> una muestra que no cumple, con promedio bajo o sin rotura puede aprobarse a mano con un soporte externo (concepto del estructural, núcleos, ensayos no destructivos, resultados del proveedor). Queda registrado el soporte, la referencia, quién lo emite y la fecha; los resultados de laboratorio no cambian.</p>\n      <p><b>Muestra vencida:</b> han pasado más de 31 días desde la fundida y no hay rotura a 28 días.</p>\n      <p><b>Cambios frente a la tabla anterior:</b> el promedio de 3 ensayos usaba la muestra y las <i>dos siguientes</i> sin separar clases (21, 28 y 34,5 MPa mezclados); aquí usa la muestra y las <i>dos anteriores</i> de la misma clase. El límite individual era 90 % para todas las clases; aquí es f'c − 3,5 MPa.</p>\n    </div>\n  </details>\n</div>\n\n<div id=\"tip\" class=\"tip\" hidden></div>\n<div id=\"scrim\" class=\"scrim\" hidden></div>\n<aside id=\"sheet\" class=\"sheet\" hidden aria-modal=\"true\" role=\"dialog\"></aside>\n<div id=\"toast\" class=\"toast\" hidden></div>",run:function(root,STI,document){

/* ================= Lectura de informes de laboratorio (formato compatible) ================= */
const MESES={ENERO:1,FEBRERO:2,MARZO:3,ABRIL:4,MAYO:5,JUNIO:6,JULIO:7,AGOSTO:8,SEPTIEMBRE:9,SETIEMBRE:9,OCTUBRE:10,NOVIEMBRE:11,DICIEMBRE:12};
const pad2=n=>String(n).padStart(2,"0");
const numCO=s=>parseFloat(String(s).replace(",","."));
function clusterLines(toks,tol){const sorted=[...toks].sort((a,b)=>a.y-b.y);const lines=[];for(const t of sorted){const last=lines[lines.length-1];if(last&&Math.abs(t.y-last.y)<=tol)last.toks.push(t);else lines.push({y:t.y,toks:[t]});}lines.forEach(l=>l.toks.sort((a,b)=>a.x-b.x));return lines;}
function parsePageTokens(toks){
  const lines=clusterLines(toks,2.5);const cyls=[];
  for(const l of lines){const t=l.toks.map(o=>o.s);
    for(let k=6;k+4<t.length;k++){
      if(/^\d,\d{3}$/.test(t[k])&&/^\d,\d{2}$/.test(t[k-1])&&/^[1-6]$/.test(t[k-2])&&/^\d+,\d$/.test(t[k+3])){
        cyls.push({y:l.y,cargaX:l.toks[k-6].x,carga:numCO(t[k-6]),diam:numCO(t[k-5]),long:numCO(t[k-4]),area:numCO(t[k-3]),falla:parseInt(t[k-2],10),ld:numCO(t[k-1]),factor:numCO(t[k]),psi:numCO(t[k+1]),mpa:numCO(t[k+3]),pct:numCO(t[k+4])});break;}}}
  if(!cyls.length)return[];
  const minCargaX=Math.min(...cyls.map(c=>c.cargaX));
  const dates=toks.filter(o=>/^\d{4}-\d{2}-\d{2}$/.test(o.s)&&o.x<minCargaX&&cyls.some(c=>Math.abs(c.y-o.y)<14));
  const samples=dates.map(D=>{const line=toks.filter(o=>Math.abs(o.y-D.y)<3).sort((a,b)=>a.x-b.x);
    const noTok=line.find(o=>o.x<D.x&&/^\d+$/.test(o.s));const after=line.filter(o=>o.x>D.x&&/^\d+$/.test(o.s)&&o.x<minCargaX);
    return{D,noTok,no:noTok?parseInt(noTok.s,10):null,fcPsi:after[0]?+after[0].s:null,edad:after[1]?+after[1].s:null,cil:[]};});
  if(!samples.length)return[];
  for(const c of cyls){let best=null,bd=Infinity;for(const s of samples){const d=Math.abs(s.D.y-c.y);if(d<bd){bd=d;best=s;}}best.cil.push(c);}
  const ord=(a,b)=>Math.abs(a.y-b.y)>3?a.y-b.y:a.x-b.x;
  for(const s of samples){const ys=s.cil.map(c=>c.y);const y0=Math.min(...ys,s.D.y)-7,y1=Math.max(...ys,s.D.y)+7;
    const band=toks.filter(o=>o.y>=y0&&o.y<=y1);const xL=s.noTok?s.noTok.x+(s.noTok.w||8)+1:0;
    const mix=band.filter(o=>/^Concreto/i.test(o.s)&&o.x<s.D.x);const xR=mix.length?Math.min(...mix.map(o=>o.x))-1:s.D.x-30;
    s.localizacion=band.filter(o=>o.x>xL&&o.x<xR&&o!==s.noTok).sort(ord).map(o=>o.s).join(" ").replace(/\s+/g," ").trim();
    s.mezcla=band.filter(o=>o.x>=xR&&o.x<s.D.x-2).sort(ord).map(o=>o.s).join(" ").trim();
    s.fechaFundida=s.D.s;s.cil.sort((a,b)=>a.y-b.y);delete s.D;delete s.noTok;}
  return samples;
}
function parseReportText(allText){
  const txt=allText.replace(/\s+/g," ");const info={};let m;
  m=txt.match(/CILINDROS\s+No\.\s*(\d+)\s*-\s*(\d+)/i)||txt.match(/No\.\s*(\d{3,5})\s*-\s*(\d+)/);if(m){info.obra=m[1];info.numero=parseInt(m[2],10);}
  m=txt.match(/C[OÓ]DIGO DE OBRA:\s*(\d+)/i);if(m)info.obra=m[1];
  m=txt.match(/ENSAYO:\s*(\d{1,2})\s+DE\s+([A-ZÁÉÍÓÚa-záéíóú]+)\s+DE\s+(\d{4})/i);
  if(m){const mes=MESES[m[2].toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"")];if(mes)info.fechaEnsayo=`${m[3]}-${pad2(mes)}-${pad2(m[1])}`;}
  m=txt.match(/emisi[oó]n de informe:\s*(\d{4}-\d{2}-\d{2})/i);if(m)info.fechaEmision=m[1];
  m=txt.match(/PROYECTO:\s*(.+?)\s+DIRIGIDO/i);if(m)info.proyecto=m[1].trim();
  m=txt.match(/CONSTRUCTORA:\s*(.+?)\s+-\s+NIT/i);if(m)info.constructora=m[1].trim();
  m=txt.match(/laboratorista\s+(.+?)\s*\/\s*\(/i);if(m)info.laboratorista=m[1].trim();
  info.equipos=[];
  for(const seg of txt.split(/---/)){const cal=seg.match(/Fecha calibraci[oó]n:\s*(\d{4})\/(\d{1,2})\/(\d{1,2})/i);if(!cal)continue;
    const prox=seg.match(/pr[oó]xima calibraci[oó]n:\s*(\d{4})\/(\d{1,2})\/(\d{1,2})/i);const name=seg.replace(/^.*?\d\.\s*/,"").split(",")[0].trim();
    const serie=(seg.match(/serie:\s*([^,]+)/i)||[])[1];
    info.equipos.push({nombre:name,serie:serie?serie.trim():"",calibracion:`${cal[1]}-${pad2(cal[2])}-${pad2(cal[3])}`,proxima:prox?`${prox[1]}-${pad2(prox[2])}-${pad2(prox[3])}`:null});}
  return info;
}
function loadScript(src){return new Promise((res,rej)=>{if(document.querySelector(`script[src="${src}"]`)){res();return;}const s=document.createElement("script");s.src=src;s.onload=res;s.onerror=()=>rej(new Error("No se pudo cargar "+src));document.head.appendChild(s);});}
const PDFJS="vendor/pdf.min.js";
const PDFJS_W="vendor/pdf.worker.min.js";
async function ensurePdf(){await loadScript(PDFJS);await loadScript(PDFJS_W);window.pdfjsLib.GlobalWorkerOptions.workerSrc=PDFJS_W;}
async function readPdf(file){
  await ensurePdf();
  const doc=await window.pdfjsLib.getDocument({data:new Uint8Array(await file.arrayBuffer()),isEvalSupported:false}).promise;
  let allText="";const samples=[];
  for(let p=1;p<=doc.numPages;p++){const page=await doc.getPage(p);const vp=page.getViewport({scale:1});const tc=await page.getTextContent();
    const toks=[];
    for(const it of tc.items){if(!it.str||!it.str.trim())continue;const x0=it.transform[4],y=vp.height-it.transform[5],L=it.str.length||1;
      for(const m of it.str.matchAll(/\S+/g)){toks.push({s:m[0],x:x0+(m.index/L)*it.width,y,w:(m[0].length/L)*it.width});}
      allText+=it.str+(it.hasEOL?"\n":" ");}
    samples.push(...parsePageTokens(toks));}
  return{info:parseReportText(allText),samples};
}

/* ================= Utilidades ================= */
const $=id=>document.getElementById(id);
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const fmt=(n,d=1)=>n==null||isNaN(n)?"—":n.toLocaleString("es-CO",{minimumFractionDigits:d,maximumFractionDigits:d});
const pct=n=>n==null||isNaN(n)?"—":Math.round(n*100)+" %";
const MESC=["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"];
const fdate=s=>{if(!s)return"—";const[y,m,d]=s.split("-");return`${d} ${MESC[+m-1]} ${y.slice(2)}`;};
const dnum=s=>{const[y,m,d]=s.split("-").map(Number);return Date.UTC(y,m-1,d)/864e5;};
const addDays=(s,n)=>{const t=new Date((dnum(s)+n)*864e5);return t.toISOString().slice(0,10);};
const TODAY=(()=>{const d=new Date();return`${d.getFullYear()}-${pad2(d.getMonth()+1)}-${pad2(d.getDate())}`;})();
const mean=a=>a.reduce((x,y)=>x+y,0)/a.length;
const PSI2MPA={3000:21,3500:24.5,4000:28,4500:31.5,5000:34.5,6000:42};
const psiToMpa=p=>p==null?null:(PSI2MPA[p]??Math.round(p*0.006895*10)/10);
const CFG0={proyecto:STI.proyecto,obra:STI.obra,constructora:STI.constructora,laboratorio:STI.laboratorio,zonas:STI.zonas.length?STI.zonas:[{cod:"T1",nombre:"Torre 1"}]};
const zonaNombre=c=>((S.cfg.zonas||[]).find(z=>z.cod===c)||{}).nombre||c||"";
const zonaOpts=sel=>`<option value="">Elegir…</option>`+(S.cfg.zonas||[]).map(z=>`<option value="${esc(z.cod)}" ${z.cod===sel?"selected":""}>${esc(z.cod)} · ${esc(z.nombre)}</option>`).join("")+(sel&&!(S.cfg.zonas||[]).some(z=>z.cod===sel)?`<option value="${esc(sel)}" selected>${esc(sel)}</option>`:"");
const normTxt=t=>String(t||"").toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"");
const ELEMENTOS=["PILOTES","VIGAS CIMENTACIÓN","CIMENTACIÓN","DADO","MURO","LOSA","PLACA","COLUMNAS","PANTALLAS","ESCALERAS","VIGAS"];
function guessElemento(loc){const L=(loc||"").toUpperCase().replace(/\s+/g,"");
  const rules=[["COLUMNA","COLUMNAS"],["PANTALLA","PANTALLAS"],["PILOTE","PILOTES"],["VIGA","VIGAS"],["ESCALERA","ESCALERAS"],["DADO","DADO"],["MURO","MURO"],["LOSA","LOSA"],["PLACA","LOSA"],["CIMENTA","CIMENTACIÓN"]];
  for(const[k,v]of rules)if(L.includes(k))return v;return"";}
function guessEdif(el){const z=(S.cfg.zonas||[]).map(x=>x.cod);if(z.length===1)return z[0];
  const g=["COLUMNAS","PANTALLAS","VIGAS","CIMENTACIÓN","DADO"].includes(el)?"APO":["MURO","LOSA","ESCALERAS"].includes(el)?"IND":"";return z.includes(g)?g:"";}
const limitB=fc=>fc<=35?fc-3.5:0.9*fc;
function rangeFlag(v){if(!v||v.length<2)return null;const a=mean(v);const r=(Math.max(...v)-Math.min(...v))/a*100;const lim=v.length>=3?10.6:9.0;return r>lim?{r,lim}:null;}

const EST={
  cumple:{label:"Cumple",cls:"good",ic:"✓",color:"var(--good)"},
  aceptable:{label:"Aceptable NSR",cls:"warn",ic:"!",color:"var(--warn)"},
  prombajo:{label:"Promedio bajo",cls:"serious",ic:"▲",color:"var(--serious)"},
  nocumple:{label:"No cumple",cls:"crit",ic:"✕",color:"var(--crit)"},
  pendiente:{label:"Pendiente 28 d",cls:"muted",ic:"…",color:"var(--ink-3)"},
  vencido:{label:"Sin rotura a 28 d",cls:"late",ic:"⌛",color:"var(--late)"},
  aprobada:{label:"Aprobada por concepto",cls:"apr",ic:"✓",color:"var(--accent)"}
};
const SOPORTES=["Concepto del diseñador estructural","Ensayos destructivos (núcleos)","Ensayos no destructivos (esclerómetro, ultrasonido)","Resultados del proveedor","Otro"];
const APROBABLE=["nocumple","prombajo","vencido"];
const RECLASIFICABLE=["prombajo"];
const chip=k=>`<span class="chip c-${EST[k].cls}"><span class="ic" aria-hidden="true">${EST[k].ic}</span>${EST[k].label}</span>`;

/* ================= Estado y cálculo ================= */
const S={cfg:JSON.parse(JSON.stringify(CFG0)),muestras:new Map(),informes:new Map(),db:null,downloads:null,mode:"init",review:[],f:{edif:"",fc:"",est:"",q:"",sort:"asc"},cFc:"",cLbl:true,sheet:null};
const stage=e=>e.edad<28?"temp":e.edad<=31?"d28":"post";
function derive(){
  const rows=[...S.muestras.values()].map(m=>{
    const ens=[...(m.ensayos||[])].filter(e=>e.mpa&&e.mpa.length).sort((a,b)=>(a.fecha||"").localeCompare(b.fecha||"")||a.edad-b.edad);
    const last=st=>{const l=ens.filter(e=>stage(e)===st);return l.length?l[l.length-1]:null;};
    const r={m,ens,temp:last("temp"),d28:last("d28"),post:last("post"),fc:+m.fc};
    for(const k of["temp","d28","post"])if(r[k]){r[k].avg=mean(r[k].mpa);r[k].ratio=r[k].avg/r.fc;r[k].flag=rangeFlag(r[k].mpa);}
    r.base=null;
    if(r.d28)r.base=r.d28.avg;
    r.base28=r.base;r.porPost=false;
    if(r.base!=null&&r.post&&r.post.avg>r.base){r.base=r.post.avg;r.porPost=true;}
    r.ratio=r.base!=null?r.base/r.fc:null;
    r.due=m.fechaMuestreo?addDays(m.fechaMuestreo,28):null;
    return r;});
  const byFc=new Map();
  for(const r of rows){if(r.base==null)continue;const k=String(r.fc);if(!byFc.has(k))byFc.set(k,[]);byFc.get(k).push(r);}
  const byF=(a,b)=>(a.m.fechaMuestreo||"9999").localeCompare(b.m.fechaMuestreo||"9999")||a.m.no-b.m.no;
  [...rows].sort(byF).forEach((r,i)=>r.pos=i+1);
  for(const list of byFc.values()){list.sort(byF);
    list.forEach((r,i)=>{if(i>=2){r.avg3=mean([list[i-2].base,list[i-1].base,r.base]);r.avg3Nos=[list[i-2].m.no,list[i-1].m.no,r.m.no];}});}
  for(const r of rows){
    if(r.base==null){r.est=(r.m.fechaMuestreo&&dnum(TODAY)>dnum(r.m.fechaMuestreo)+31)?"vencido":"pendiente";}
    else if(r.base<limitB(r.fc)-1e-9)r.est="nocumple";
    else if(Math.round(r.base/r.fc*100)>=100)r.est="cumple";
    else if(r.avg3!=null&&r.avg3<r.fc-1e-9)r.est="prombajo";
    else r.est="aceptable";
    r.estOrig=r.est;r.reclasif=false;
    const rc=r.m.reclasif,rcA=rc?(rc.a||"aceptable"):null;
    if(rc&&rcA==="aceptable"&&r.est==="prombajo"){r.est="aceptable";r.reclasif=true;}
    else if(r.m.aprobacion&&APROBABLE.includes(r.est))r.est="aprobada";
    r.flags=["temp","d28","post"].filter(k=>r[k]&&r[k].flag);
  }
  return rows;
}

/* ================= Render ================= */
let ROWS=[];
function renderHeader(){const c=S.cfg;
  $("hProy").textContent=c.proyecto||"";$("hObra").textContent=c.obra||"—";$("hLab").textContent=c.laboratorio||"—";$("hCons").textContent=c.constructora||"—";
  const z=c.zonas||[];$("hZonas").innerHTML=z.length?`${z.length===1?"Zona":"Edificios / zonas"} <b>${z.map(x=>esc(x.cod)).join(" · ")}</b>`:"";
  const sel=$("fEdif");const cur=S.f.edif;sel.innerHTML=`<option value="">Todos los edificios / zonas</option>`+z.map(x=>`<option value="${esc(x.cod)}">${esc(x.cod)} · ${esc(x.nombre)}</option>`).join("");sel.value=cur;if(sel.value!==cur)S.f.edif="";}
function render(){
  ROWS=derive();renderHeader();
  renderStatus();renderClasses();renderAlerts();renderChart();renderTable();renderReps();
}
function renderStatus(){
  const c={};for(const k in EST)c[k]=0;ROWS.forEach(r=>c[r.est]++);
  $("statusbar").innerHTML=Object.keys(EST).map(k=>`<button type="button" class="schip" data-est="${k}" aria-pressed="${S.f.est===k}"><span class="dot" style="background:${EST[k].color}"></span><span><span class="n">${c[k]}</span><br><span class="l">${EST[k].label}</span></span></button>`).join("");
  const sel=$("fEst");const cur=S.f.est;sel.innerHTML=`<option value="">Todos los estados</option>`+Object.keys(EST).map(k=>`<option value="${k}">${EST[k].label}</option>`).join("");sel.value=cur;
}
function renderClasses(){
  const groups=new Map();ROWS.forEach(r=>{if(!groups.has(r.fc))groups.set(r.fc,[]);groups.get(r.fc).push(r);});
  const fcs=[...groups.keys()].sort((a,b)=>a-b);
  const selFc=$("fFc");const cur=S.f.fc;selFc.innerHTML=`<option value="">Todas las clases</option>`+fcs.map(f=>`<option value="${f}">f'c ${fmt(f)} MPa</option>`).join("");selFc.value=cur;
  $("classes").innerHTML=fcs.map(fc=>{
    const list=groups.get(fc);const res=list.filter(r=>r.d28).map(r=>r.d28.avg);
    const n=res.length;const avg=n?mean(res):null;const sd=n>1?Math.sqrt(res.reduce((s,x)=>s+(x-avg)**2,0)/(n-1)):null;
    const min=n?Math.min(...res):null;const fin=list.filter(r=>r.base!=null);const okN=fin.filter(r=>r.est==="cumple"||r.est==="aceptable").length;const ok=fin.length?okN/fin.length:null;
    const withAvg=list.filter(r=>r.avg3!=null).sort((a,b)=>(a.m.fechaMuestreo||"").localeCompare(b.m.fechaMuestreo||""));
    const lastAvg=withAvg.length?withAvg[withAvg.length-1].avg3:null;
    const cnt={};list.forEach(r=>cnt[r.est]=(cnt[r.est]||0)+1);
    const bar=Object.keys(EST).filter(k=>cnt[k]).map(k=>`<i style="flex:${cnt[k]};background:${EST[k].color}" title="${EST[k].label}: ${cnt[k]}"></i>`).join("");
    const psi=Object.keys(PSI2MPA).find(p=>PSI2MPA[p]===fc);
    return`<article class="ccard"><header><span class="fc">${fmt(fc)} <small>MPa${psi?" · "+psi+" psi":""}</small></span><span class="muted" style="font-size:12px">${list.length} muestras</span></header>
    <div class="stats">
      <div><span class="k">Ensayos a 28 d</span><span class="v">${n}</span></div>
      <div><span class="k">Promedio</span><span class="v">${fmt(avg)}</span></div>
      <div><span class="k">Desv. est. s</span><span class="v">${fmt(sd,2)}</span></div>
      <div><span class="k">Mínimo</span><span class="v ${min!=null&&min<limitB(fc)?"below":""}">${fmt(min)}</span></div>
      <div title="Muestras con resultado final en «Cumple» o «Aceptable NSR» (incluye las aceptadas a criterio)"><span class="k">Cumple + aceptable</span><span class="v">${ok==null?"—":`${okN}/${fin.length} <small style="font-size:12px;color:var(--ink-3)">${Math.round(ok*100)} %</small>`}</span></div>
      <div><span class="k">Último prom. 3</span><span class="v ${lastAvg!=null&&lastAvg<fc?"below":""}">${fmt(lastAvg)}</span></div>
    </div><div class="bar">${bar}</div></article>`;}).join("")||`<div class="empty">Aún no hay muestras registradas.</div>`;
}
const ALERT_EST=["nocumple","prombajo","vencido"];
const isRev=r=>!!(r.m.revisada&&r.m.revisada.est===r.est);
/* --- avisos compactos con marca de revisado --- */
const dispKey=e=>`${e.fecha||""}|${e.edad}|${e.mpa.join(",")}`;
const dispFlags=r=>["temp","d28","post"].filter(k=>r[k]&&r[k].flag).map(k=>r[k]);
const dispRev=r=>{const ks=r.m.dispRev||[];return dispFlags(r).every(e=>ks.includes(dispKey(e)));};
function avSummary(cat,label,chipHtml,pend,revs){
  const open=S.avOpen&&S.avOpen[cat];
  return`<summary>${chipHtml} ${pend?`<b>${pend}</b> pendiente${pend>1?"s":""}`:`sin pendientes`}${revs?` <span class="muted">· ${revs} revisado(s)</span>`:""}</summary>`;}
function avisoLab(){const L=[];for(const inf of S.informes.values())if((inf.alertas||[]).length)L.push(inf);
  if(!L.length)return"";L.sort((a,b)=>(b.numero||0)-(a.numero||0));
  const pend=L.filter(i=>!i.avisoRev),revs=L.filter(i=>i.avisoRev);const show=S.avShow&&S.avShow.lab;
  const line=(inf,rev)=>`<div class="avline${rev?" done":""}"><span><b class="mono">Inf. ${esc(inf.obra||"")}-${inf.numero}</b> · ${(inf.alertas||[]).map(esc).join(" · ")}${rev?` <span class="muted">· revisado ${fdate(inf.avisoRev.fecha)}</span>`:""}</span><button class="avx" type="button" data-avlab="${inf.numero}" title="${rev?"Volver a pendiente":"Marcar como revisado"}">${rev?"Reabrir":"✓ Revisado"}</button></div>`;
  return`<details class="aviso" data-cat="lab" ${S.avOpen&&S.avOpen.lab?"open":""}>${avSummary("lab","aviso(s) del laboratorio",`<span class="chip c-crit"><span class="ic">!</span>Laboratorio</span>`,pend.length,revs.length)}
    <div class="avl">${pend.map(i=>line(i,false)).join("")}${pend.length>1?`<div><button class="avx" type="button" data-avall="lab">✓ Marcar todos revisados</button></div>`:""}
    ${revs.length?`<div><button class="avlink" type="button" data-avshow="lab">${show?"Ocultar":"Ver"} revisados</button></div>${show?revs.map(i=>line(i,true)).join(""):""}`:""}</div></details>`;}
function avisoDisp(){const D=ROWS.filter(r=>dispFlags(r).length).sort((a,b)=>a.pos-b.pos);if(!D.length)return"";
  const pend=D.filter(r=>!dispRev(r)),revs=D.filter(r=>dispRev(r));const show=S.avShow&&S.avShow.disp;
  const item=(r,rev)=>{const e=dispFlags(r).slice(-1)[0];return`<span class="avi${rev?" done":""}"><button type="button" class="avb" data-open="${r.m.no}" title="${e.edad} d · ${e.mpa.map(v=>fmt(v)).join(" · ")} MPa">No. ${r.m.no} <span class="muted">${e.edad} d · ${fmt(e.flag.r,0)} %</span></button><button class="avx sm" type="button" data-avdisp="${r.m.no}" title="${rev?"Volver a pendiente":"Marcar como revisada"}">${rev?"↺":"✓"}</button></span>`;};
  return`<details class="aviso" data-cat="disp" ${S.avOpen&&S.avOpen.disp?"open":""}>${avSummary("disp","dispersión(es)",`<span class="chip c-serious"><span class="ic">⚑</span>Dispersión</span>`,pend.length,revs.length)}
    <div class="avl"><div class="avn">${pend.map(r=>item(r,false)).join("")}</div>${pend.length>1?`<div><button class="avx" type="button" data-avall="disp">✓ Marcar todas revisadas</button></div>`:""}
    ${revs.length?`<div><button class="avlink" type="button" data-avshow="disp">${show?"Ocultar":"Ver"} revisadas</button></div>${show?`<div class="avn">${revs.map(r=>item(r,true)).join("")}</div>`:""}`:""}</div></details>`;}
async function avSetLab(nums,rev){try{for(const n of nums){const inf=S.informes.get("i"+n);if(!inf)continue;const d=clean(inf);if(rev)d.avisoRev={fecha:TODAY};else delete d.avisoRev;await writeInforme(d);}renderAlerts();renderReps();
  toast(rev?`${nums.length} aviso(s) del laboratorio marcados como revisados.`:"Aviso del laboratorio reabierto.");}catch(e){toast("No se pudo guardar: "+(e.message||e.code));}}
async function avSetDisp(nos,rev){try{for(const no of nos){const m=S.muestras.get(+no);const r=ROWS.find(x=>x.m.no===+no);if(!m||!r)continue;const d=clean(m);
    if(rev)d.dispRev=[...new Set([...(d.dispRev||[]),...dispFlags(r).map(dispKey)])];else delete d.dispRev;await writeMuestra(d);}render();
  toast(rev?`${nos.length} muestra(s) con dispersión marcadas como revisadas.`:"Dispersión reabierta.");}catch(e){toast("No se pudo guardar: "+(e.message||e.code));}}
function renderAlerts(){
  const items=[];
  const pri={nocumple:0,prombajo:1,vencido:2};
  const revs=ROWS.filter(r=>pri[r.est]!=null&&isRev(r));
  ROWS.filter(r=>pri[r.est]!=null&&(S.showRev||!isRev(r))).sort((a,b)=>pri[a.est]-pri[b.est]||b.m.no-a.m.no).forEach(r=>{
    let t="";if(r.est==="nocumple")t=`${fmt(r.base)} MPa < límite ${fmt(limitB(r.fc))} MPa${r.porPost?` (aun con rotura a ${r.post.edad} d)`:""} · evaluar núcleos (C.5.6.5)`;
    else if(r.est==="prombajo")t=`Prom. 3 consecutivos ${fmt(r.avg3)} MPa < f'c ${fmt(r.fc)} (muestras ${r.avg3Nos.join(", ")})`;
    else t=`Tocaba romper el ${fdate(r.due)}; no hay resultado a 28 d${r.temp?` (última: ${r.temp.edad} d, ${pct(r.temp.ratio)})`:""}`;
    items.push({no:r.m.no,k:r.est,title:`${r.m.elemento||"Elemento"} · ${r.m.localizacion||""}`,t,rev:isRev(r),canRev:true});});
  $("alertCount").innerHTML=`${items.length?`${items.length} puntos`:""}${revs.length?` · <button class="btn small" type="button" id="togRev">${S.showRev?"Ocultar":"Ver"} ${revs.length} revisada(s)</button>`:""}`;
  const av=[avisoLab(),avisoDisp()].filter(Boolean);
  const avHtml=av.length?`<div class="avisos">${av.join("")}</div>`:"";
  $("alerts").innerHTML=avHtml+(items.length?items.map(i=>{
    const c=i.k==="flag"?`<span class="chip c-serious"><span class="ic">⚑</span>Dispersión</span>`:i.k==="lab"?`<span class="chip c-crit"><span class="ic">!</span>Laboratorio</span>`:chip(i.k);
    return`<div class="alert${i.rev?" rev":""}" ${i.no!=null?`data-open="${i.no}" role="button" tabindex="0"`:""}>${c}<span class="t">${esc(i.title)}<small>${esc(i.t)}${i.rev?" · revisada":""}</small></span><span class="no" style="display:flex;flex-direction:column;align-items:flex-end;gap:4px">${i.no!=null?"No. "+i.no:""}${i.canRev?`<button class="btn small" type="button" data-rev="${i.no}" title="${i.rev?"Volver a mostrar esta alerta":"Quitar esta alerta de la lista"}">${i.rev?"Reabrir":"Marcar revisada"}</button>`:""}</span></div>`;}).join(""):`<div class="empty">Sin pendientes.</div>`);
}
const CH={W:1200,H:620,L:70,R:24,T:84,B:92,font:"Segoe UI, Helvetica Neue, Arial, sans-serif"};
function chartData(){
  const all=ROWS.filter(r=>r.ratio!=null&&(!S.f.edif||r.m.edificio===S.f.edif));
  const fcs=[...new Set(all.map(r=>r.fc))].sort((a,b)=>a-b);
  if(!fcs.includes(+S.cFc)){const cnt=fcs.map(f=>[f,all.filter(r=>r.fc===f).length]).sort((a,b)=>b[1]-a[1]);S.cFc=cnt.length?String(cnt[0][0]):"";}
  const fc=+S.cFc;const pts=all.filter(r=>r.fc===fc).sort((a,b)=>a.pos-b.pos);pts.forEach((r,i)=>r._x=i+1);
  pts.forEach((r,i)=>{r._mm=i>=2?(pts[i-2].ratio+pts[i-1].ratio+r.ratio)/3:null;});
  return{fcs,fc,pts};
}
function buildChartSVG(d,interactive){
  const{W,H,L,R,T,B,font}=CH;const{fc,pts}=d;
  const lim=limitB(fc)/fc;
  const C={ink:"#1f2933",ink2:"#52606d",ink3:"#7b8794",grid:"#e9edf1",grid2:"#f3f5f7",frame:"#cbd2d9",blue:"#2f5fa7",mm:"#8fb3e3",green:"#2e9e44",red:"#d62828",band:"#fff6db",low:"#fdeeee"};
  const vals=pts.map(r=>r.ratio);const lo=Math.min(...vals,lim)-0.03,hi=Math.max(...vals,1)+0.05;
  const y0=Math.floor((lo-0.05)*10)/10+0.05,y1=Math.ceil((hi-0.05)*10)/10+0.05;
  const nos=pts.map(r=>r._x);const x0=Math.min(1,...nos),x1=Math.max(...nos)+2;
  const X=v=>L+(v-x0)/(x1-x0)*(W-L-R),Y=v=>T+(y1-v)/(y1-y0)*(H-T-B);
  const t=(x,y,txt,o="")=>`<text x="${x}" y="${y}" font-family="${font}" ${o}>${txt}</text>`;
  let g=`<rect x="0" y="0" width="${W}" height="${H}" fill="#ffffff"/>`;
  const zona=S.f.edif?` · ${esc(zonaNombre(S.f.edif))}`:"";
  // títulos
  g+=t(L,34,`Concreto ${fmt(fc,fc%1?1:0)} MPa${zona}`,`font-size="22" font-weight="700" fill="${C.ink}"`);
  g+=t(L,58,`Resistencias a 28 días · ${pts.length} muestras · ${esc(S.cfg.proyecto||"")}`,`font-size="14" fill="${C.ink2}"`);
  // leyenda superior derecha
  const lg=[["pt",C.blue,"Resistencia cilindros"],["line",C.green,"Resistencia de diseño"],["line",C.red,"Resistencia mínima aceptación"],["dash",C.mm,"Promedio móvil"]];
  let lx=W-R;const items=lg.map(l=>({l,w:34+l[2].length*6.6})).reverse();
  items.forEach(({l,w})=>{lx-=w;const[k,c,txt]=l;const yy=52;
    g+=`<line x1="${lx}" x2="${lx+24}" y1="${yy}" y2="${yy}" stroke="${c}" stroke-width="${k==="pt"?2:3}" ${k==="dash"?'stroke-dasharray="7 5"':""} stroke-linecap="round"/>`;
    if(k==="pt")g+=`<circle cx="${lx+12}" cy="${yy}" r="4" fill="${c}" stroke="#fff" stroke-width="1.5"/>`;
    g+=t(lx+30,yy+4.5,esc(txt),`font-size="12.5" fill="${C.ink2}"`);lx-=14;});
  // zonas de fondo
  const yTop=Y(y1),yBot=Y(y0);
  g+=`<rect x="${L}" y="${Y(1)}" width="${W-L-R}" height="${Y(lim)-Y(1)}" fill="${C.band}"/>`;
  g+=`<rect x="${L}" y="${Y(lim)}" width="${W-L-R}" height="${yBot-Y(lim)}" fill="${C.low}"/>`;
  // rejilla
  for(let v=y0;v<=y1+1e-9;v+=0.05){const y=Y(v);const major=Math.round(v*100)%10===5;
    g+=`<line x1="${L}" x2="${W-R}" y1="${y}" y2="${y}" stroke="${major?C.grid:C.grid2}" stroke-width="1"/>`;
    if(major)g+=t(L-10,y+4,`${Math.round(v*100)}%`,`text-anchor="end" font-size="12" fill="${C.ink3}"`);}
  for(let n=1;n<=x1;n++){if(n<x0||(n-1)%5)continue;const x=X(n);
    g+=`<line x1="${x}" x2="${x}" y1="${yTop}" y2="${yBot}" stroke="${C.grid2}" stroke-width="1"/>`;
    g+=`<line x1="${x}" x2="${x}" y1="${yBot}" y2="${yBot+5}" stroke="${C.frame}"/>`+t(x,yBot+20,n,`text-anchor="middle" font-size="12" fill="${C.ink3}"`);}
  g+=`<line x1="${L}" x2="${W-R}" y1="${yBot}" y2="${yBot}" stroke="${C.frame}" stroke-width="1.2"/>`;
  g+=t((L+W-R)/2,yBot+46,"Muestras en orden de fecha de fundida",`text-anchor="middle" font-size="13" font-weight="600" fill="${C.ink2}"`);
  g+=`<text transform="translate(22 ${(yTop+yBot)/2}) rotate(-90)" text-anchor="middle" font-family="${font}" font-size="13" font-weight="600" fill="${C.ink2}">% Resistencia a compresión</text>`;
  // líneas de referencia con rótulo al final
  g+=`<line x1="${L}" x2="${W-R}" y1="${Y(1)}" y2="${Y(1)}" stroke="${C.green}" stroke-width="2.5"/>`;
  g+=`<line x1="${L}" x2="${W-R}" y1="${Y(lim)}" y2="${Y(lim)}" stroke="${C.red}" stroke-width="2.5"/>`;
  const tag=(y,c,txt,below)=>{const w=txt.length*6.6+12;return`<rect x="${L+6}" y="${below?y+4:y-21}" width="${w}" height="17" rx="3" fill="${c}"/>`+t(L+6+w/2,below?y+16.5:y-8.5,txt,`text-anchor="middle" font-size="11.5" font-weight="700" fill="#fff"`);};
  g+=tag(Y(1),C.green,`f'c ${fmt(fc)} MPa · 100%`,false);
  g+=tag(Y(lim),C.red,`Mín. ${fmt(limitB(fc))} MPa · ${Math.round(lim*100)}%`,true);
  // series
  const mm=pts.filter(r=>r._mm!=null);
  if(mm.length>1)g+=`<polyline points="${mm.map(r=>`${X(r._x).toFixed(1)},${Y(r._mm).toFixed(1)}`).join(" ")}" fill="none" stroke="${C.mm}" stroke-width="3" stroke-dasharray="8 6" stroke-linejoin="round" stroke-linecap="round"/>`;
  if(pts.length>1)g+=`<polyline points="${pts.map(r=>`${X(r._x).toFixed(1)},${Y(r.ratio).toFixed(1)}`).join(" ")}" fill="none" stroke="${C.blue}" stroke-width="1.8" stroke-linejoin="round"/>`;
  pts.forEach((r,i)=>{const x=X(r._x),y=Y(r.ratio);const bad=r.ratio<lim-1e-9;
    g+=`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${bad?5.5:4.5}" fill="${bad?C.red:C.blue}" stroke="#ffffff" stroke-width="1.8"${interactive?` data-no="${r.m.no}" style="cursor:pointer"`:""}/>`;
    if(S.cLbl){const prev=pts[i-1]?.ratio??r.ratio,next=pts[i+1]?.ratio??r.ratio;const valley=r.ratio<prev&&r.ratio<next;
      g+=`<text x="${x.toFixed(1)}" y="${(valley?y+18:y-10).toFixed(1)}" text-anchor="middle" font-family="${font}" font-size="11" ${bad?'font-weight="700"':""} fill="${bad?C.red:C.ink}" stroke="#ffffff" stroke-width="3" paint-order="stroke" stroke-linejoin="round">${Math.round(r.ratio*100)}%</text>`;}});
  // pie
  g+=t(L,H-16,`Mínima de aceptación: f'c − 3,5 MPa (NSR-10 C.5.6.3.3 b). Promedio móvil de 3 muestras consecutivas. Si hay rotura a edad posterior o testigo mayor, se grafica esa resistencia.`,`font-size="11" fill="${C.ink3}"`);
  g+=t(W-R,H-16,`Generado ${fdate(TODAY)}`,`text-anchor="end" font-size="11" fill="${C.ink3}"`);
  return`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Resistencias a 28 días, concreto ${fc} MPa">${g}</svg>`;
}
function renderChart(){
  const d=chartData();const sel=$("cFc");
  sel.innerHTML=d.fcs.map(f=>`<option value="${f}">Concreto ${fmt(f,f%1?1:0)} MPa</option>`).join("")||`<option value="">Sin clases</option>`;sel.value=S.cFc;
  $("btnJpg").disabled=!d.pts.length;
  if(!d.pts.length){$("chart").innerHTML=`<div class="empty">Aún no hay resultados a 28 días para graficar.</div>`;return;}
  $("chart").innerHTML=buildChartSVG(d,true).replace('width="1200" height="620"','style="width:100%;height:auto;display:block"');
}
async function exportJpg(){
  const d=chartData();if(!d.pts.length)return;
  const svg=buildChartSVG(d,false);const img=new Image();
  img.src="data:image/svg+xml;charset=utf-8,"+encodeURIComponent(svg);
  try{await img.decode();}catch(e){toast("No se pudo generar la imagen.");return;}
  const c=document.createElement("canvas");c.width=CH.W*2;c.height=CH.H*2;const ctx=c.getContext("2d");ctx.fillStyle="#fff";ctx.fillRect(0,0,c.width,c.height);ctx.drawImage(img,0,0,c.width,c.height);
  const blob=await new Promise(r=>c.toBlob(r,"image/jpeg",0.95));
  await saveFile(`Grafica_Concreto_${String(d.fc).replace(".",",")}MPa${S.f.edif?"_"+S.f.edif:""}_${TODAY}.jpg`,blob,"image/jpeg");
}
async function saveFile(name,blob,type){
  try{if(S.downloads){await S.downloads.save({filename:name,data:blob});return true;}
    const url=URL.createObjectURL(blob.type?blob:new Blob([blob],{type}));const a=document.createElement("a");a.href=url;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),4000);return true;}
  catch(e){if(e&&e.code==="declined")return false;toast("No se pudo guardar el archivo: "+(e.message||e.code||e));return false;}}
function filtered(){
  const q=S.f.q.trim().toUpperCase();
  return ROWS.filter(r=>(!S.f.edif||r.m.edificio===S.f.edif)&&(!S.f.fc||String(r.fc)===S.f.fc)&&(!S.f.est||r.est===S.f.est)&&
    (!q||`${r.m.no} ${r.m.elemento} ${r.m.localizacion} ${r.m.notas||""}`.toUpperCase().includes(q)));
}
function resCell(e){if(!e)return`<td class="res"><span class="muted">—</span></td>`;
  return`<td class="res"><div class="v">${fmt(e.avg)}<span class="pct">${pct(e.ratio)}</span>${e.flag?`<span class="flag" title="Rango ${fmt(e.flag.r)} % > ${fmt(e.flag.lim)} %">⚑</span>`:""}</div><div class="cyl">${e.edad} d · ${e.mpa.map(v=>fmt(v)).join(" · ")}</div></td>`;}
function renderTable(){
  const list=filtered().sort((a,b)=>S.f.sort==="no"?a.m.no-b.m.no:S.f.sort==="desc"?b.pos-a.pos:a.pos-b.pos);
  $("countLbl").textContent=`${list.length} de ${ROWS.length} muestras`;
  $("tbody").innerHTML=list.length?list.map(r=>`<tr data-open="${r.m.no}">
    <td class="no"><div class="nob" title="${EST[r.est].label}"><i style="background:${EST[r.est].color}"></i><span>${r.m.no}</span></div></td>
    <td class="mono" style="white-space:nowrap;font-size:12.5px">${fdate(r.m.fechaMuestreo)}</td>
    <td class="loc"><div class="e">${esc(r.m.elemento||"—")}${r.m.edificio?`<span class="ed" title="${esc(zonaNombre(r.m.edificio))}">${esc(r.m.edificio)}</span>`:""}</div><div class="l">${esc(r.m.localizacion)}</div></td>
    <td class="num">${fmt(r.fc)}</td>
    ${resCell(r.temp)}${resCell(r.d28)}${resCell(r.post)}
    <td class="num ${r.avg3!=null&&r.avg3<r.fc?"below":""}">${r.avg3!=null?fmt(r.avg3)+`<div class="muted" style="font-size:11px">${pct(r.avg3/r.fc)}</div>`:`<span class="muted">—</span>`}</td>
    <td>${chip(r.est)}${reclSel(r)}${r.reclasif?`<div class="muted" style="font-size:11px;margin-top:3px">manual · por cálculo: ${EST[r.estOrig].label}</div>`:""}${r.est==="aprobada"?`<div class="muted" style="font-size:11px;margin-top:3px">${esc(r.m.aprobacion.soporte)}${r.m.aprobacion.ref?" · "+esc(r.m.aprobacion.ref):""} · era «${EST[r.estOrig].label}»</div>`:""}${isRev(r)?`<div class="muted" style="font-size:11px;margin-top:3px">alerta revisada ${fdate(r.m.revisada.fecha)}</div>`:""}${r.porPost?`<div style="font-size:11px;margin-top:3px;color:var(--ink-2)">según rotura a ${r.post.edad} d · a 28 d fue ${pct(r.base28/r.fc)}</div>`:""}</td>
  </tr>`).join(""):`<tr><td colspan="9" class="empty">${ROWS.length?"Ninguna muestra coincide con los filtros.":"Aún no hay muestras. Carga un informe o agrega una muestra manual."}</td></tr>`;
}
function renderReps(){
  const reps=[...S.informes.values()].sort((a,b)=>b.numero-a.numero);
  const nal=reps.reduce((n,i)=>n+(i.alertas||[]).length,0);$("repsCount").textContent=reps.length?`· ${reps.length}${nal?` · ${nal} alerta(s) de laboratorio`:""}`:"· ninguno";
  $("reps").innerHTML=reps.length?reps.map(i=>{const id="i"+i.numero;return`<div class="repline"><b class="mono">${esc(i.obra||"")}-${i.numero}</b><span>Ensayo ${fdate(i.fechaEnsayo)}</span><span class="muted">Muestras ${(i.muestras||[]).join(", ")}</span><span class="muted">Cargado ${fdate(i.cargado)}</span>${(i.alertas||[]).length?`<span class="chip c-crit"><span class="ic">!</span>${i.alertas.length} alerta(s)</span>`:""}<span style="margin-left:auto"><button class="btn small danger" type="button" data-delinf="${id}">Eliminar informe</button></span>${S.delInf===id?delInfConfirm(i):""}</div>`;}).join(""):`<div class="muted">Los informes que cargues quedan listados aquí, con las alertas de calibración de equipos.</div>`;
}
/* --- eliminar un informe cargado y sus resultados --- */
function infImpact(inf){const id="i"+inf.numero,num=String(inf.numero);const hits=[];const fps=inf.resultados||[];
  const same=(a,b)=>Array.isArray(a)&&Array.isArray(b)&&a.length===b.length&&a.every((v,i)=>Math.abs(v-b[i])<0.051);
  const match=(m,x)=>{if(!x)return false;if(x.infId)return x.infId===id;if(String(x.informe||"")===num)return true;
    return fps.some(f=>+f.no===+m.no&&(f.edad==null||Math.abs(f.edad-x.edad)<=1)&&same(f.vals,x.mpa));};
  for(const m of S.muestras.values()){const d=clean(m);const before=(d.ensayos||[]).length;d.ensayos=(d.ensayos||[]).filter(e=>!match(m,e));const n=before-d.ensayos.length;if(!n)continue;
    hits.push({m,doc:d,n,borrar:!d.ensayos.length&&!m.manual});}
  return hits;}
function delInfConfirm(inf){const h=infImpact(inf);const nb=h.filter(x=>x.borrar);
  return`<div class="confirm" style="flex-basis:100%">Se quitan ${h.reduce((a,x)=>a+x.n,0)} rotura(s) de ${h.length} muestra(s)${h.length?` (No. ${h.map(x=>x.m.no).join(", ")})`:""}${nb.length?`; se eliminan ${nb.length} muestra(s) que quedan sin roturas`:""}.${h.length?"":" Este informe no tiene roturas en la tabla; solo se quita de la lista."} ¿Continuar?
    <button class="btn small danger" type="button" data-delinfok="i${inf.numero}">Sí, eliminar</button><button class="btn small" type="button" data-delinfno="1">Cancelar</button></div>`;}
async function deleteInforme(id){const inf=S.informes.get(id);if(!inf)return;
  try{const hs=infImpact(inf);for(const h of hs){if(h.borrar)await deleteMuestra(h.m.no);else await writeMuestra(h.doc);}
    if(S.db)await S.db.doc("informes/"+id).delete();S.informes.delete(id);saveLocal();S.delInf=null;render();
    const nr=hs.reduce((a,x)=>a+x.n,0),nb=hs.filter(x=>x.borrar).length;toast(`Informe ${inf.numero} eliminado: se quitaron ${nr} rotura(s)${nb?` y ${nb} muestra(s)`:""}.`);}
  catch(e){toast("No se pudo eliminar por completo: "+(e.message||e.code)+". Vuelve a intentarlo.");}}
/* --- reiniciar toda la información --- */
function openReset(){const b=$("impBox");PENDING=null;b.hidden=false;b.className="impbox";b.style.borderColor="var(--crit)";b.style.background="var(--crit-bg)";
  b.innerHTML=`<span><b style="color:var(--crit-ink)">Borrar todo</b> · se eliminan ${S.muestras.size} muestra(s) y ${S.informes.size} informe(s). No se puede deshacer.<br>
    <label style="display:inline-flex;gap:6px;align-items:center;font-size:13px;margin-top:6px"><input type="checkbox" id="rCfg"> Borrar también los datos del proyecto y las zonas</label></span>
    <span style="display:flex;gap:8px;flex-wrap:wrap;align-items:center"><button class="btn small" type="button" id="rExp">Exportar copia antes</button>
    <input id="rTxt" placeholder="Escribe BORRAR" style="width:130px;padding:5px 8px;border:1px solid var(--crit);border-radius:5px" autocomplete="off" aria-label="Escribe BORRAR para confirmar">
    <button class="btn small danger" type="button" id="rOk">Borrar todo</button><button class="btn small" type="button" id="rNo">Cancelar</button></span>`;
  b.scrollIntoView({block:"nearest"});$("rTxt").focus();}
function closeBox(){const b=$("impBox");b.hidden=true;b.style.borderColor="";b.style.background="";}
async function resetAll(alsoCfg){
  try{if(S.db){for(const no of[...S.muestras.keys()])await S.db.doc("muestras/m"+no).delete();for(const k of[...S.informes.keys()])await S.db.doc("informes/"+k).delete();if(alsoCfg)await S.db.doc("config/proyecto").delete();}
    S.muestras=new Map();S.informes=new Map();if(alsoCfg)S.cfg=clean(CFG0);saveLocal();closeBox();render();toast(alsoCfg?"Se borró toda la información y la configuración del proyecto.":"Se borraron todas las muestras e informes.");}
  catch(e){toast("El reinicio quedó incompleto: "+(e.message||e.code)+". Vuelve a intentarlo.");render();}}

/* ================= Importación ================= */
async function handleFiles(files){
  const pdfs=[...files].filter(f=>/\.pdf$/i.test(f.name)||f.type==="application/pdf");
  if(!pdfs.length){toast("Elige archivos PDF de informes de roturas.");return;}
  $("review").innerHTML=`<div class="muted">Leyendo ${pdfs.length} informe(s)…</div>`;
  const reports=[];
  for(const f of pdfs){try{const r=await readPdf(f);r.file=f.name;reports.push(r);}catch(e){reports.push({file:f.name,error:e.message||String(e)});}}
  S.review=reports.map(buildReview);renderReview();
}
function buildReview(rep){
  if(rep.error)return{file:rep.file,error:rep.error,items:[]};
  const{info,samples}=rep;const warns=[];
  if(!samples.length)warns.push({c:"crit",t:"No se encontraron muestras en este PDF. ¿Es un informe de roturas en el formato compatible?"});
  const key=normTxt(S.cfg.proyecto).split(/[^A-Z0-9]+/).filter(w=>w.length>=4)[0];
  if(info.proyecto&&key&&!normTxt(info.proyecto).includes(key))warns.push({c:"crit",t:`El informe es del proyecto «${info.proyecto}», no de ${S.cfg.proyecto}.`});
  if(info.obra&&S.cfg.obra&&String(info.obra)!==String(S.cfg.obra))warns.push({c:"crit",t:`El código de obra del informe es ${info.obra}; el del proyecto es ${S.cfg.obra}.`});
  if(info.numero&&S.informes.has("i"+info.numero))warns.push({c:"info",t:`El informe ${info.numero} ya se había cargado antes.`});
  const labAlerts=[];
  for(const eq of info.equipos||[])if(eq.proxima&&info.fechaEnsayo&&eq.proxima<info.fechaEnsayo){const t=`${eq.nombre} (serie ${eq.serie}) tenía calibración vencida: próxima calibración ${eq.proxima}, ensayo ${info.fechaEnsayo}.`;labAlerts.push(t);warns.push({c:"crit",t:"Equipo con calibración vencida: "+t});}
  const items=samples.map(s=>{
    const mpa=s.cil.map(c=>c.mpa);const e={fecha:info.fechaEnsayo||"",edad:s.edad,mpa,falla:s.cil.map(c=>c.falla),informe:info.numero?String(info.numero):"",origen:"pdf"};
    const w=[];const fcM=psiToMpa(s.fcPsi);const ex=S.muestras.get(s.no);
    if(s.fechaFundida&&info.fechaEnsayo){const calc=dnum(info.fechaEnsayo)-dnum(s.fechaFundida);if(Math.abs(calc-s.edad)>1)w.push(`La edad reportada (${s.edad} d) no coincide con las fechas (${calc} d).`);}
    if(mpa.length<3)w.push(`Solo ${mpa.length} cilindro(s); la NSR-10 pide mínimo 3 de 100×200 mm.`);
    const fl=rangeFlag(mpa);if(fl)w.push(`Dispersión alta: rango ${fmt(fl.r)} % > ${fmt(fl.lim)} %.`);
    const f56=s.cil.filter(c=>c.falla>=5).length;if(f56)w.push(`${f56} cilindro(s) con falla tipo 5/6 (extremos, posible refrentado deficiente).`);
    const it={no:s.no,e,s,fcM,w,on:true};
    if(!ex){it.act="nueva";const el=guessElemento(s.localizacion);it.draft={no:s.no,fechaMuestreo:s.fechaFundida,elemento:el,edificio:guessEdif(el),localizacion:s.localizacion,fc:fcM,ensayos:[],notas:""};}
    else{
      if(fcM!=null&&Math.abs(fcM-ex.fc)>0.05)w.push(`f'c en el informe: ${s.fcPsi} psi (${fmt(fcM)} MPa); en la tabla: ${fmt(ex.fc)} MPa.`);
      if(s.fechaFundida&&ex.fechaMuestreo&&s.fechaFundida!==ex.fechaMuestreo)w.push(`Fecha de fundida en el informe ${s.fechaFundida}; en la tabla ${ex.fechaMuestreo}.`);
      const dup=(ex.ensayos||[]).find(x=>(x.fecha&&x.fecha===e.fecha)||(Math.abs(x.edad-e.edad)<=1&&stage(x)===stage(e)));
      if(dup){const same=dup.mpa.length===mpa.length&&dup.mpa.every((v,i)=>Math.abs(v-mpa[i])<0.051);
        if(same){it.act="dup";it.on=false;it.dup=dup;}else{it.act="diff";it.dup=dup;}}
      else it.act="add";
    }
    return it;});
  return{file:rep.file,info,warns,labAlerts,items};
}
function renderReview(){
  const R=S.review;if(!R.length){$("review").innerHTML="";return;}
  const ACT={nueva:["new","Muestra nueva"],add:["add","Agregar rotura"],dup:["dup","Ya registrado"],diff:["diff","Valores distintos"]};
  let pending=0;
  const html=R.map((rep,ri)=>{
    if(rep.error)return`<div class="rep"><div class="rh"><b>${esc(rep.file)}</b></div><div class="warns" style="padding-bottom:10px"><div class="warn crit">No se pudo leer: ${esc(rep.error)}</div></div></div>`;
    const i=rep.info;
    return`<div class="rep"><div class="rh"><b>Informe ${esc(i.obra||"")}-${i.numero??"?"}</b><span class="muted">Ensayo ${fdate(i.fechaEnsayo)}</span><span class="muted">${esc(rep.file)}</span></div>
    ${rep.warns.length?`<div class="warns">${rep.warns.map(w=>`<div class="warn ${w.c}">${esc(w.t)}</div>`).join("")}</div>`:""}
    ${rep.items.map((it,ii)=>{if(it.on&&it.act!=="dup")pending++;const a=ACT[it.act];
      const avg=mean(it.e.mpa);const fc=it.act==="nueva"?it.draft.fc:S.muestras.get(it.no)?.fc;
      return`<div class="ritem"><input type="checkbox" data-ri="${ri}" data-ii="${ii}" ${it.on?"checked":""} aria-label="Incluir muestra ${it.no}">
      <div class="rt"><b class="mono">No. ${it.no}</b><span class="tag ${a[0]}">${a[1]}</span><span>${esc(it.s.localizacion)}</span></div>
      <div class="rv mono">${it.e.edad} d · ${it.e.mpa.map(v=>fmt(v)).join(" · ")} → <b>${fmt(avg)} MPa</b>${fc?` (${pct(avg/fc)} de ${fmt(fc)})`:""} · fundida ${fdate(it.s.fechaFundida)} · ${it.s.fcPsi} psi</div>
      ${it.act==="diff"?`<div class="rv">En la tabla: ${it.dup.edad} d · ${it.dup.mpa.map(v=>fmt(v)).join(" · ")}. Si lo incluyes, se reemplaza por lo del informe.</div>`:""}
      ${it.w.map(w=>`<div class="rv" style="color:var(--serious-ink)">⚑ ${esc(w)}</div>`).join("")}
      ${it.act==="nueva"?`<div class="fields">
        <label>Elemento<input list="elList" value="${esc(it.draft.elemento)}" data-f="elemento" data-ri="${ri}" data-ii="${ii}" size="14"></label>
        <label>Edificio / zona<select data-f="edificio" data-ri="${ri}" data-ii="${ii}">${zonaOpts(it.draft.edificio)}</select></label>
        <label>f'c MPa<input type="number" step="0.1" value="${it.draft.fc??""}" data-f="fc" data-ri="${ri}" data-ii="${ii}" style="width:80px"></label>
        <label style="flex:1 1 200px">Localización<input value="${esc(it.draft.localizacion)}" data-f="localizacion" data-ri="${ri}" data-ii="${ii}"></label></div>`:""}
      </div>`;}).join("")}</div>`;}).join("");
  $("review").innerHTML=html+`<datalist id="elList">${ELEMENTOS.map(e=>`<option value="${e}">`).join("")}</datalist>
    <div class="rfoot"><button class="btn" type="button" id="revCancel">Descartar</button><button class="btn primary" type="button" id="revSave" ${pending?"":"disabled"}>Guardar ${pending} cambio(s) en la tabla</button></div>`;
}
async function saveReview(){
  const btn=$("revSave");btn.disabled=true;btn.textContent="Guardando…";
  let n=0;const errs=[];
  for(const rep of S.review){if(rep.error)continue;const nos=[];
    for(const it of rep.items){if(!it.on||it.act==="dup")continue;
      let doc;
      const infId=rep.info.numero!=null?"i"+rep.info.numero:"";const e={...it.e,infId};
      if(it.act==="nueva"){doc={...it.draft,fc:+it.draft.fc,ensayos:[e],creadoPor:infId};if(!doc.fc){errs.push(`No. ${it.no}: falta f'c`);continue;}}
      else{const ex=JSON.parse(JSON.stringify(S.muestras.get(it.no)));
        if(it.act==="diff")ex.ensayos=ex.ensayos.filter(x=>!(x.fecha===it.dup.fecha&&x.edad===it.dup.edad));
        ex.ensayos.push(e);doc=ex;}
      try{await writeMuestra(doc);n++;nos.push(it.no);}catch(e){errs.push(`No. ${it.no}: ${e.message||e.code}`);}}
    if(rep.info.numero!=null){const inf={resultados:rep.items.map(it=>({no:it.no,edad:it.e.edad,vals:it.e.mpa})),obra:rep.info.obra||"",numero:rep.info.numero,fechaEnsayo:rep.info.fechaEnsayo||"",fechaEmision:rep.info.fechaEmision||"",laboratorista:rep.info.laboratorista||"",equipos:rep.info.equipos||[],alertas:rep.labAlerts,muestras:rep.items.map(i=>i.no),cargado:TODAY,archivo:rep.file};
      try{await writeInforme(inf);}catch(e){errs.push(`Informe ${inf.numero}: ${e.message||e.code}`);}}}
  S.review=[];renderReview();render();
  toast(errs.length?`Se guardaron ${n} cambio(s). Revisar: ${errs.join("; ")}`:`Se guardaron ${n} cambio(s) en la tabla.`);
}

/* ================= Persistencia ================= */
const clean=o=>JSON.parse(JSON.stringify(o));
const LSKEY="mi-sti-ens-concreto-"+STI.p;
function saveLocal(){if(S.db)return;try{localStorage.setItem(LSKEY,JSON.stringify({cfg:S.cfg,muestras:[...S.muestras.values()],informes:[...S.informes.values()]}));}catch(e){}stiResumen();}
function stiResumen(){setTimeout(()=>{try{STI.onChange&&STI.onChange()}catch(e){}},0);try{const rows=derive();localStorage.setItem(LSKEY+"-resumen",JSON.stringify({act:TODAY,rows:rows.map(r=>({cod:String(r.m.no),tipo:"concreto",tl:"Concreto",fecha:r.m.fechaMuestreo||"",elemento:r.m.elemento||"",loc:r.m.localizacion||"",zona:r.m.edificio||"",fc:r.fc,base:r.base,ratio:r.ratio,est:r.est,el:EST[r.est].label}))}));}catch(e){}}

async function writeCfg(c){c=clean(c);if(S.db)await S.db.doc("config/proyecto").set(c);S.cfg=c;saveLocal();}
function loadLocal(){try{const d=JSON.parse(localStorage.getItem(LSKEY)||"null");if(!d)return true;
  if(d.cfg)S.cfg={...clean(CFG0),...d.cfg};(d.muestras||[]).forEach(m=>S.muestras.set(+m.no,m));(d.informes||[]).forEach(i=>S.informes.set("i"+i.numero,i));return true;}catch(e){return false;}}
async function writeMuestra(m){m=clean(m);m.no=+m.no;m.actualizado=TODAY;
  if(S.db)await S.db.doc("muestras/m"+m.no).set(m);S.muestras.set(m.no,m);saveLocal();}
async function deleteMuestra(no){if(S.db)await S.db.doc("muestras/m"+no).delete();S.muestras.delete(no);saveLocal();}
async function writeInforme(i){i=clean(i);if(S.db)await S.db.doc("informes/i"+i.numero).set(i);S.informes.set("i"+i.numero,i);saveLocal();}

/* ================= Hoja de detalle ================= */
function openSheet(no,isNew){
  if(!isNew&&!S.muestras.get(+no))return;
  if(isNew){const max=Math.max(0,...S.muestras.keys());S.sheet={tipo:"muestra",draft:{no:max+1,fechaMuestreo:TODAY,elemento:"",edificio:"",localizacion:"",fc:28,ensayos:[],notas:""},isNew:true};}
  else{const m=S.muestras.get(+no);if(!m)return;S.sheet={tipo:"muestra",draft:clean(m),isNew:false};}
  $("scrim").hidden=false;$("sheet").hidden=false;renderSheet();
}
function closeSheet(){S.sheet=null;$("scrim").hidden=true;$("sheet").hidden=true;}
function openCfg(){S.sheet={tipo:"cfg",draft:JSON.parse(JSON.stringify(S.cfg))};$("scrim").hidden=false;$("sheet").hidden=false;renderSheet();}
function renderCfgSheet(){const d=S.sheet.draft;
  $("sheet").innerHTML=`<div class="sh"><div><div class="eyebrow">Configuración</div><h2>Datos del proyecto</h2></div><button class="btn small" type="button" id="shClose">Cerrar</button></div>
  <div class="sb">
    <div class="form">
      <label class="full">Nombre del proyecto<input id="cP" value="${esc(d.proyecto)}"></label>
      <label>Código de obra (laboratorio)<input id="cO" value="${esc(d.obra)}"></label>
      <label>Laboratorio<input id="cL" value="${esc(d.laboratorio)}"></label>
      <label class="full">Constructora<input id="cC" value="${esc(d.constructora)}"></label>
    </div>
    <div><h3 style="margin-bottom:4px">Edificios o zonas</h3>
      <div class="muted" style="font-size:12.5px;margin-bottom:10px">El código corto es el que aparece en la tabla (por ejemplo T1, IND, ZONA A). Cada muestra se asigna a uno.</div>
      <div style="display:flex;flex-direction:column;gap:8px">
        <div class="zrow muted" style="font-size:11.5px"><span>Código</span><span>Nombre</span><span></span></div>
        ${(d.zonas||[]).map((z,i)=>{const n=[...S.muestras.values()].filter(m=>m.edificio===z.cod).length;
          return`<div class="zrow"><input data-z="${i}" data-k="cod" value="${esc(z.cod)}" maxlength="12" aria-label="Código"><input data-z="${i}" data-k="nombre" value="${esc(z.nombre)}" aria-label="Nombre"><button class="btn small danger" type="button" data-delz="${i}" ${n?`disabled title="Tiene ${n} muestra(s)"`:""}>Quitar</button></div>${n?`<div class="muted" style="font-size:11.5px;margin-top:-4px">${n} muestra(s) asignadas; para quitarla, cámbialas primero de zona.</div>`:""}`;}).join("")}
        <div><button class="btn small" type="button" id="cAddZ">+ Agregar edificio o zona</button></div>
      </div>
    </div>
    <div id="cErr"></div>
    <div style="display:flex;justify-content:flex-end;border-top:1px solid var(--line);padding-top:14px"><button class="btn primary" type="button" id="cSave">Guardar proyecto</button></div>

  </div>`;}
function readCfgForm(){const d=S.sheet.draft;d.proyecto=$("cP").value.trim();d.obra=$("cO").value.trim();d.laboratorio=$("cL").value.trim();d.constructora=$("cC").value.trim();
  document.querySelectorAll("#sheet [data-z]").forEach(inp=>{const z=d.zonas[+inp.dataset.z];if(z)z[inp.dataset.k]=inp.dataset.k==="cod"?inp.value.trim().toUpperCase():inp.value.trim();});}
function renderSheet(){
  if(S.sheet.tipo==="cfg"){renderCfgSheet();return;}
  const d=S.sheet.draft;const r=ROWS.find(x=>x.m.no===d.no);
  const ens=[...(d.ensayos||[])].map((e,i)=>({...e,i})).sort((a,b)=>(a.fecha||"").localeCompare(b.fecha||""));
  $("sheet").innerHTML=`<div class="sh"><div><div class="eyebrow">${S.sheet.isNew?"Nueva muestra":"Muestra"}</div><h2 class="mono">No. ${d.no}</h2></div><div style="display:flex;gap:8px;align-items:center">${r&&!S.sheet.isNew?chip(r.est):""}<button class="btn small" type="button" id="shClose">Cerrar</button></div></div>
  <div class="sb">
    ${r&&!S.sheet.isNew?`<div class="muted" style="font-size:13px">${r.base!=null?`Resistencia final ${fmt(r.base)} MPa (${pct(r.ratio)} de f'c)${r.porPost?`, tomada de la rotura a ${r.post.edad} d; a 28 d fue ${fmt(r.base28)} MPa (${pct(r.base28/r.fc)})`:""}. Límite individual ${fmt(limitB(r.fc))} MPa.`:`Rotura a 28 d prevista el ${fdate(r.due)}.`} ${r.avg3!=null?`Promedio de 3 consecutivos (No. ${r.avg3Nos.join(", ")}): ${fmt(r.avg3)} MPa.`:"Aún no hay 3 ensayos consecutivos de esta clase."}</div>`:""}
    ${r&&!S.sheet.isNew&&ALERT_EST.includes(r.est)?`<div class="warn ${isRev(r)?"info":""}" style="display:flex;gap:10px;align-items:center;justify-content:space-between;flex-wrap:wrap"><span>${isRev(r)?`Alerta revisada el ${fdate(r.m.revisada.fecha)}. No aparece en «Requiere atención».`:"Esta muestra aparece en «Requiere atención». Si ya la revisaste, márcala; volverá a aparecer si su estado cambia."}</span><button class="btn small" type="button" data-rev="${r.m.no}">${isRev(r)?"Reabrir alerta":"Marcar revisada"}</button></div>`:""}
    ${r&&!S.sheet.isNew&&RECLASIFICABLE.includes(r.estOrig)?reclHtml(r):""}
    ${r&&!S.sheet.isNew&&APROBABLE.includes(r.estOrig)&&!r.reclasif?aprHtml(r):""}
    <div class="form">
      ${S.sheet.isNew?`<label>No. muestra<input id="sNo" type="number" value="${d.no}"></label>`:""}
      <label>Fecha de fundida<input id="sFecha" type="date" value="${esc(d.fechaMuestreo)}"></label>
      <label>f'c (MPa)<input id="sFc" type="number" step="0.1" value="${d.fc}"></label>
      <label>Elemento<input id="sEl" list="elList2" value="${esc(d.elemento)}"></label>
      <label>Edificio / zona<select id="sEd">${zonaOpts(d.edificio)}</select></label>
      <label class="full">Localización<input id="sLoc" value="${esc(d.localizacion)}"></label>
      <label class="full">Observaciones de interventoría<textarea id="sNotas" rows="2">${esc(d.notas||"")}</textarea></label>
    </div>
    <datalist id="elList2">${ELEMENTOS.map(e=>`<option value="${e}">`).join("")}</datalist>
    <div><h3 style="margin-bottom:8px">Roturas</h3><div class="elist">
      ${ens.length?ens.map(e=>{const a=mean(e.mpa);const fl=rangeFlag(e.mpa);return`<div class="eitem"><span class="h">${e.edad} días · ${fmt(a)} MPa <span class="muted" style="font-weight:400">(${pct(a/d.fc)})</span>${fl?` <span class="flag" style="color:var(--serious-ink)" title="Dispersión">⚑</span>`:""}</span><button class="btn small danger" type="button" data-delE="${e.i}">Quitar</button>
        <span class="d">${fdate(e.fecha)} · ${e.mpa.map(v=>fmt(v)).join(" · ")} MPa${e.falla?` · falla ${e.falla.join("/")}`:""}${e.informe?` · inf. ${esc(e.informe)}`:""}</span></div>`;}).join(""):`<div class="muted">Sin roturas registradas.</div>`}
    </div></div>
    <div><h3 style="margin-bottom:8px">Agregar rotura manual</h3><div class="addE">
      <label>Fecha de rotura<input id="aF" type="date" value="${TODAY}"></label>
      <label>Informe No.<input id="aInf" type="text"></label>
      <label>Edad (días)<input id="aEdad" type="number" placeholder="auto"></label>
      <label>Cilindro 1 MPa<input id="aV1" type="number" step="0.1"></label>
      <label>Cilindro 2 MPa<input id="aV2" type="number" step="0.1"></label>
      <label>Cilindro 3 MPa<input id="aV3" type="number" step="0.1"></label>
    </div><div style="margin-top:8px"><button class="btn small" type="button" id="aAdd">Agregar rotura</button></div></div>
    <div style="display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap;border-top:1px solid var(--line);padding-top:14px">
      ${S.sheet.isNew?"<span></span>":`<button class="btn danger" type="button" id="sDel">Eliminar muestra</button>`}
      <button class="btn primary" type="button" id="sSave">Guardar muestra</button>
    </div>
    <div id="sConfirm"></div>
  </div>`;
}
function reclSel(r){if(!RECLASIFICABLE.includes(r.estOrig))return"";const cur=r.reclasif?r.est:"auto";
  return`<div style="margin-top:4px"><select class="reclSel" data-recl="${r.m.no}" aria-label="Estado manual de la muestra ${r.m.no}" title="Cambia el estado de esta muestra a tu criterio" style="font-size:11.5px;padding:2px 4px;border:1px solid var(--line-strong);border-radius:4px;background:var(--surface);max-width:170px">
    <option value="auto" ${cur==="auto"?"selected":""}>Automático (${EST[r.estOrig].label})</option>
    ${["aceptable"].map(k=>`<option value="${k}" ${cur===k?"selected":""}>${EST[k].label} (manual)</option>`).join("")}</select></div>`;}
async function quickRecl(no,val){const m=S.muestras.get(+no);if(!m)return;const d=clean(m);
  if(val==="auto")delete d.reclasif;else d.reclasif={...(d.reclasif||{}),a:val,fecha:TODAY};
  try{await writeMuestra(d);render();toast(val==="auto"?`Muestra ${no}: vuelve al estado calculado.`:`Muestra ${no} marcada como «${EST[val].label}» a criterio.`);
    if(S.sheet&&S.sheet.draft&&+S.sheet.draft.no===+no){S.sheet.draft=clean(S.muestras.get(+no));renderSheet();}}
  catch(e){toast("No se pudo guardar: "+(e.message||e.code));render();}}
const MOTIVOS_RECL=["El resultado individual cumple f'c (o el límite f'c − 3,5 MPa) y el promedio bajo lo arrastran muestras anteriores ya evaluadas","Diferencia menor del promedio frente a f'c, dentro de la dispersión normal del ensayo","Las muestras del promedio son de elementos o vaciados distintos","Otro (detallar en la observación)"];
function pbNext(no){const l=ROWS.filter(r=>r.est==="prombajo").sort((a,b)=>a.pos-b.pos);if(!l.length)return null;const cur=ROWS.find(r=>r.m.no===+no);
  return(cur?l.find(r=>r.pos>cur.pos&&r.m.no!==+no):null)||l.find(r=>r.m.no!==+no)||null;}
function reclHtml(r){const rc=r.m.reclasif;
  const nos=r.avg3Nos||[];const ctx=nos.map(n=>{const x=ROWS.find(y=>y.m.no===+n);return x?`<span>No. ${n} · ${fdate(x.m.fechaMuestreo)}</span><span>${fmt(x.base)} MPa (${pct(x.ratio)})${x.m.no===r.m.no?" ← esta":""}</span>`:"";}).join("");
  const ctxHtml=nos.length?`<div class="kv">${ctx}<span><b>Promedio 3 consecutivos</b></span><span><b>${fmt(r.avg3)} MPa (${pct(r.avg3/r.fc)})</b></span></div>`:`<div class="muted" style="font-size:12.5px">Aún no hay 3 ensayos consecutivos de esta clase.</div>`;
  const cur=r.reclasif?r.est:"auto";
  return`<div style="border:1px solid ${r.reclasif?"var(--warn)":"var(--line-strong)"};${r.reclasif?"background:var(--warn-bg);":""}border-radius:8px;padding:12px 14px;display:flex;flex-direction:column;gap:8px">
    <h3>Estado a criterio</h3>
    <div class="muted" style="font-size:12.5px">Resultado ${fmt(r.base)} MPa (${pct(r.ratio)} de f'c ${fmt(r.fc)}), sobre el límite individual de ${fmt(limitB(r.fc))} MPa. Por cálculo queda «${EST[r.estOrig].label}».</div>${ctxHtml}
    <div class="form">
      <label class="full">Estado<select id="rcA"><option value="auto" ${cur==="auto"?"selected":""}>Automático (${EST[r.estOrig].label})</option>${["aceptable"].map(k=>`<option value="${k}" ${cur===k?"selected":""}>${EST[k].label} (manual)</option>`).join("")}</select></label>
      <label class="full">Observación (opcional)<input id="rcO" value="${esc(rc&&rc.obs||"")}" placeholder="Por qué se acepta"></label>
    </div>
    <div><button class="btn small primary" type="button" id="reclSave">Guardar estado</button></div></div>`;}
async function setReclasif(no,a,nextNo){if(a&&!a.a)a.a="aceptable";const m=S.muestras.get(+no);if(!m)return;const d=clean(m);if(a)d.reclasif=a;else delete d.reclasif;
  try{await writeMuestra(d);render();
    if(nextNo){openSheet(nextNo);toast(`Muestra ${no} reclasificada. Ahora la No. ${nextNo}.`);return;}
    S.sheet.draft=clean(S.muestras.get(+no));renderSheet();toast(a?`Muestra ${no} marcada como «${EST[a.a].label}» a criterio.`:`Muestra ${no}: vuelve al estado calculado.`);}
  catch(e){toast("No se pudo guardar: "+(e.message||e.code));}}
function aprHtml(r){const a=r.m.aprobacion;
  if(a)return`<div style="border:1px solid var(--accent);background:var(--accent-soft);border-radius:8px;padding:12px 14px;display:flex;flex-direction:column;gap:6px">
    <h3 style="color:var(--accent)">Aprobada por concepto externo</h3>
    <div class="kv"><span>Estado según ensayos</span><span>${EST[r.estOrig].label}</span><span>Soporte</span><span>${esc(a.soporte)}</span><span>Documento / referencia</span><span>${esc(a.ref||"—")}</span><span>Emitido por</span><span>${esc(a.responsable||"—")}</span><span>Fecha</span><span>${fdate(a.fecha)}</span>${a.obs?`<span>Observación</span><span>${esc(a.obs)}</span>`:""}</div>
    <div><button class="btn small danger" type="button" id="aprDel">Quitar aprobación</button></div></div>`;
  return`<div style="border:1px solid var(--line-strong);border-radius:8px;padding:12px 14px;display:flex;flex-direction:column;gap:8px">
    <h3>Aprobar con concepto externo</h3>
    <div class="muted" style="font-size:12.5px">La muestra no cumple con los ensayos (${EST[r.estOrig].label}). Si un concepto externo la respalda, regístralo aquí: la muestra queda como «Aprobada por concepto» y sale de las alertas. Los resultados de laboratorio no se modifican.</div>
    <div class="form">
      <label class="full">Soporte<select id="apS">${SOPORTES.map(x=>`<option>${x}</option>`).join("")}</select></label>
      <label class="full">Documento o referencia<input id="apR" placeholder="Ej.: Oficio 045 del diseñador, informe de núcleos No. 12"></label>
      <label>Emitido por<input id="apP" placeholder="Nombre / empresa"></label>
      <label>Fecha<input id="apF" type="date" value="${TODAY}"></label>
      <label class="full">Observación<textarea id="apO" rows="2"></textarea></label>
    </div>
    <div><button class="btn small primary" type="button" id="aprOk">Aprobar muestra</button></div></div>`;}
async function setAprobacion(no,a){const m=S.muestras.get(+no);if(!m)return;const d=clean(m);if(a)d.aprobacion=a;else delete d.aprobacion;
  try{await writeMuestra(d);render();S.sheet.draft=clean(S.muestras.get(+no));renderSheet();toast(a?`Muestra ${no} aprobada por concepto externo.`:`Se quitó la aprobación de la muestra ${no}.`);}
  catch(e){toast("No se pudo guardar: "+(e.message||e.code));}}
function readSheetForm(){const d=S.sheet.draft;
  if($("sNo"))d.no=+$("sNo").value;d.fechaMuestreo=$("sFecha").value;d.fc=+$("sFc").value;d.elemento=$("sEl").value.trim().toUpperCase();d.edificio=$("sEd").value;d.localizacion=$("sLoc").value.trim();d.notas=$("sNotas").value.trim();}

/* ================= Exportar ================= */
async function exportXlsx(){
  const btn=$("btnExport");btn.disabled=true;
  try{
    await loadScript("vendor/xlsx.full.min.js");
    const X=window.XLSX;const rows=[...ROWS].sort((a,b)=>a.pos-b.pos);
    const blk=e=>e?[e.fecha||"",e.edad,e.mpa[0]??"",e.mpa[1]??"",e.mpa[2]??"",+e.avg.toFixed(2),+e.ratio.toFixed(3)]:["","","","","","",""];
    const aoa=[[`SUPERVISIÓN TÉCNICA INDEPENDIENTE · ${normTxt(S.cfg.proyecto)} · CONTROL ENSAYOS DE CONCRETO`],[`Obra lab. ${S.cfg.obra||""} · Constructora ${S.cfg.constructora||""} · Laboratorio ${S.cfg.laboratorio||""} · Generado ${TODAY} · criterio NSR-10 C.5.6.3.3`],[],
      ["No. Muestra","Fecha de muestreo","Elemento","Edificio / zona","Localización","f'c MPa","Resultados antes de 28 días","","","","","","","Resultados a 28 días","","","","","","","Resultados edad posterior","","","","","","","Resistencia aceptación MPa","% f'c","Prom. 3 consecutivos (misma clase) MPa","Límite individual MPa","Estado","Observaciones"],
      ["","","","","","","Fecha rotura","Edad","C1","C2","C3","Prom","%","Fecha rotura","Edad","C1","C2","C3","Prom","%","Fecha rotura","Edad","C1","C2","C3","Prom","%"]];
    for(const r of rows)aoa.push([r.m.no,r.m.fechaMuestreo,r.m.elemento,r.m.edificio,r.m.localizacion,r.fc,...blk(r.temp),...blk(r.d28),...blk(r.post),
      r.base!=null?+r.base.toFixed(2):"",r.ratio!=null?+r.ratio.toFixed(3):"",r.avg3!=null?+r.avg3.toFixed(2):"",+limitB(r.fc).toFixed(1),(r.reclasif?`${EST[r.est].label} (a criterio del interventor${r.m.reclasif.obs?": "+r.m.reclasif.obs:""}; ${r.m.reclasif.fecha}; por cálculo: ${EST[r.estOrig].label})`:r.est==="aprobada"?`Aprobada por concepto externo: ${r.m.aprobacion.soporte}${r.m.aprobacion.ref?" ("+r.m.aprobacion.ref+")":""}; según ensayos: ${EST[r.estOrig].label}`:EST[r.est].label)+(r.porPost?` (según rotura a ${r.post.edad} d; a 28 d ${Math.round(r.base28/r.fc*100)}%)`:""),r.m.notas||""]);
    const ws=X.utils.aoa_to_sheet(aoa);
    ws["!merges"]=[{s:{r:3,c:6},e:{r:3,c:12}},{s:{r:3,c:13},e:{r:3,c:19}},{s:{r:3,c:20},e:{r:3,c:26}},...[0,1,2,3,4,5,27,28,29,30,31,32].map(c=>({s:{r:3,c},e:{r:4,c}}))];
    ws["!cols"]=[6,11,18,14,36,7,...Array(21).fill(8),10,7,12,10,26,30].map(w=>({wch:w}));
    const wb=X.utils.book_new();X.utils.book_append_sheet(wb,ws,"Control ensayos");
    const inf=[["Informe","Fecha ensayo","Fecha emisión","Muestras","Alertas","Cargado"],...[...S.informes.values()].sort((a,b)=>a.numero-b.numero).map(i=>[`${i.obra}-${i.numero}`,i.fechaEnsayo,i.fechaEmision,(i.muestras||[]).join(", "),(i.alertas||[]).join(" | "),i.cargado])];
    X.utils.book_append_sheet(wb,X.utils.aoa_to_sheet(inf),"Informes");
    const buf=X.write(wb,{bookType:"xlsx",type:"array"});
    const fname=`Control_Ensayos_Concreto_${normTxt(S.cfg.proyecto).replace(/[^A-Z0-9]+/g,"_").replace(/^_|_$/g,"")||"Proyecto"}_${TODAY}.xlsx`;
    await saveFile(fname,new Blob([buf],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}));
  }catch(e){if(e&&e.code==="declined")return;toast("No se pudo exportar: "+(e.message||e.code||e));}
  finally{btn.disabled=false;}
}

/* ================= Exportar / importar proyecto ================= */
const APPKEY="control-resistencias-concreto";
async function exportProject(){
  const data={app:APPKEY,version:1,exportado:new Date().toISOString(),cfg:S.cfg,muestras:[...S.muestras.values()].sort((a,b)=>a.no-b.no),informes:[...S.informes.values()]};
  const name=`Proyecto_${normTxt(S.cfg.proyecto).replace(/[^A-Z0-9]+/g,"_").replace(/^_|_$/g,"")||"Resistencias"}_${TODAY}.json`;
  if(await saveFile(name,new Blob([JSON.stringify(data,null,1)],{type:"application/json"}),"application/json"))toast(`Proyecto exportado: ${data.muestras.length} muestras.`);
}
let PENDING=null;
async function readProjectFile(f){
  let d;try{d=JSON.parse(await f.text());}catch(e){toast("El archivo no es un proyecto válido (JSON dañado).");return;}
  if(!d||d.app!==APPKEY||!Array.isArray(d.muestras)){toast("El archivo no es un proyecto exportado desde este programa.");return;}
  const bad=d.muestras.filter(m=>m==null||m.no==null||isNaN(+m.no));if(bad.length){toast("El archivo tiene muestras sin número; no se importó.");return;}
  PENDING=d;const cfg=d.cfg||{};
  closeBox();$("impBox").hidden=false;$("impBox").className="impbox";
  $("impBox").innerHTML=`<span><b>Importar «${esc(cfg.proyecto||"proyecto")}»</b> · ${d.muestras.length} muestras, ${(d.informes||[]).length} informes${d.exportado?` · exportado ${fdate(d.exportado.slice(0,10))}`:""}.<br><span class="muted">Reemplaza todo lo actual (${S.muestras.size} muestras). Si quieres conservarlo, expórtalo antes.</span></span>
    <span style="display:flex;gap:8px"><button class="btn" type="button" id="impNo">Cancelar</button><button class="btn primary" type="button" id="impOk">Reemplazar e importar</button></span>`;
}
async function applyImport(){
  const d=PENDING;if(!d)return;const btn=$("impOk");btn.disabled=true;btn.textContent="Importando…";
  try{
    const newM=d.muestras.map(m=>({...clean(m),no:+m.no}));const newI=(d.informes||[]).filter(i=>i&&i.numero!=null).map(clean);
    const cfg={...clean(CFG0),...(d.cfg||{})};
    if(S.db){
      const keepM=new Set(newM.map(m=>m.no));for(const no of [...S.muestras.keys()])if(!keepM.has(no))await S.db.doc("muestras/m"+no).delete();
      const keepI=new Set(newI.map(i=>"i"+i.numero));for(const k of [...S.informes.keys()])if(!keepI.has(k))await S.db.doc("informes/"+k).delete();
      for(const m of newM)await S.db.doc("muestras/m"+m.no).set(m);
      for(const i of newI)await S.db.doc("informes/i"+i.numero).set(i);
      await S.db.doc("config/proyecto").set(cfg);
    }
    S.muestras=new Map(newM.map(m=>[m.no,m]));S.informes=new Map(newI.map(i=>["i"+i.numero,i]));S.cfg=cfg;saveLocal();
    PENDING=null;closeBox();render();toast(`Proyecto importado: ${newM.length} muestras.`);
  }catch(e){btn.disabled=false;btn.textContent="Reintentar";toast("La importación quedó incompleta: "+(e.message||e.code)+". Vuelve a intentarlo.");}
}

/* ================= Eventos ================= */
let toastT;function toast(t){const el=$("toast");el.textContent=t;el.hidden=false;clearTimeout(toastT);toastT=setTimeout(()=>el.hidden=true,4200);}
const drop=$("drop");
["dragenter","dragover"].forEach(ev=>drop.addEventListener(ev,e=>{e.preventDefault();drop.classList.add("over");}));
["dragleave","drop"].forEach(ev=>drop.addEventListener(ev,e=>{e.preventDefault();drop.classList.remove("over");}));
drop.addEventListener("drop",e=>handleFiles(e.dataTransfer.files));
$("file").addEventListener("change",e=>{handleFiles(e.target.files);e.target.value="";});
$("review").addEventListener("change",e=>{const t=e.target;if(t.dataset.ri==null)return;const it=S.review[+t.dataset.ri].items[+t.dataset.ii];
  if(t.type==="checkbox"){it.on=t.checked;renderReview();}
  else if(t.dataset.f){it.draft[t.dataset.f]=t.dataset.f==="fc"?+t.value:t.value;if(t.dataset.f==="elemento"&&!it.draft.edificio){it.draft.edificio=guessEdif(t.value.toUpperCase());renderReview();}}});
$("review").addEventListener("click",e=>{if(e.target.id==="revCancel"){S.review=[];renderReview();}if(e.target.id==="revSave")saveReview();});
async function toggleRev(no){no=+no;const m=S.muestras.get(no);if(!m)return;const r=ROWS.find(x=>x.m.no===no);const d=clean(m);
  if(r&&isRev(r))delete d.revisada;else d.revisada={est:r?r.est:"",fecha:TODAY};
  try{await writeMuestra(d);render();toast(d.revisada?`Alerta de la muestra ${no} marcada como revisada. Vuelve a aparecer si el estado cambia.`:`Alerta de la muestra ${no} reabierta.`);
    if(S.sheet&&S.sheet.tipo!=="cfg"&&S.sheet.draft&&+S.sheet.draft.no===no&&!S.sheet.isNew){S.sheet.draft=clean(S.muestras.get(no));renderSheet();}}
  catch(e){toast("No se pudo guardar: "+(e.message||e.code));}}
document.addEventListener("click",e=>{
  const rv=e.target.closest("[data-rev]");if(rv){toggleRev(rv.dataset.rev);return;}
  if(e.target.id==="togRev"){S.showRev=!S.showRev;renderAlerts();return;}
  if(e.target.closest(".reclSel"))return;
  const ax=e.target.closest("[data-avlab],[data-avdisp],[data-avall],[data-avshow]");
  if(ax){const d=ax.dataset;
    if(d.avlab){const inf=S.informes.get("i"+d.avlab);avSetLab([d.avlab],!(inf&&inf.avisoRev));}
    else if(d.avdisp){const r=ROWS.find(x=>x.m.no===+d.avdisp);avSetDisp([d.avdisp],!(r&&dispRev(r)));}
    else if(d.avall==="lab")avSetLab([...S.informes.values()].filter(i=>(i.alertas||[]).length&&!i.avisoRev).map(i=>i.numero),true);
    else if(d.avall==="disp")avSetDisp(ROWS.filter(r=>dispFlags(r).length&&!dispRev(r)).map(r=>r.m.no),true);
    else if(d.avshow){S.avShow={...(S.avShow||{}),[d.avshow]:!(S.avShow&&S.avShow[d.avshow])};renderAlerts();}
    return;}
  const o=e.target.closest("[data-open]");if(o&&!e.target.closest("#sheet"))openSheet(o.dataset.open);
  const s=e.target.closest(".schip");if(s){S.f.est=S.f.est===s.dataset.est?"":s.dataset.est;renderStatus();renderChart();renderTable();}});
$("chart").addEventListener("click",e=>{const c=e.target.closest("circle[data-no]");if(c)openSheet(c.dataset.no);});
$("chart").addEventListener("mousemove",e=>{const c=e.target.closest("circle[data-no]");const tip=$("tip");
  if(!c){tip.hidden=true;return;}const r=ROWS.find(x=>x.m.no===+c.dataset.no);if(!r)return;
  tip.innerHTML=`<b>No. ${r.m.no}</b> · punto ${r._x??""} · ${esc(r.m.elemento)} ${esc(r.m.edificio)}<br>${esc(r.m.localizacion)}<br>Fundida ${fdate(r.m.fechaMuestreo)} · f'c ${fmt(r.fc)}<br><b>${fmt(r.base)} MPa · ${pct(r.ratio)}</b> · ${EST[r.est].label}`;
  tip.hidden=false;const x=e.pageX+14,y=e.pageY+14;tip.style.left=Math.min(x,document.documentElement.clientWidth-260)+"px";tip.style.top=y+"px";});
$("chart").addEventListener("mouseleave",()=>$("tip").hidden=true);
for(const[id,k]of[["fEdif","edif"],["fFc","fc"],["fEst","est"],["fSort","sort"]])$(id).addEventListener("change",e=>{S.f[k]=e.target.value;renderStatus();renderChart();renderTable();});
$("fQ").addEventListener("input",e=>{S.f.q=e.target.value;renderChart();renderTable();});
$("btnNew").addEventListener("click",()=>openSheet(null,true));
$("btnCfg").addEventListener("click",openCfg);
$("btnExpJ").addEventListener("click",exportProject);
$("btnImpJ").addEventListener("click",()=>$("fileJ").click());
$("fileJ").addEventListener("change",e=>{const f=e.target.files[0];if(f)readProjectFile(f);e.target.value="";});
$("impBox").addEventListener("click",e=>{const t=e.target;if(t.id==="impNo"){PENDING=null;closeBox();}if(t.id==="impOk")applyImport();
  if(t.id==="rNo")closeBox();if(t.id==="rExp")exportProject();
  if(t.id==="rOk"){if($("rTxt").value.trim().toUpperCase()!=="BORRAR"){toast("Escribe BORRAR para confirmar.");$("rTxt").focus();return;}t.disabled=true;t.textContent="Borrando…";resetAll($("rCfg").checked);}});
$("btnReset").addEventListener("click",openReset);
$("cFc").addEventListener("change",e=>{S.cFc=e.target.value;renderChart();});
$("cLbl").addEventListener("change",e=>{S.cLbl=e.target.checked;renderChart();});
$("btnJpg").addEventListener("click",exportJpg);
$("btnExport").addEventListener("click",exportXlsx);
$("reps").addEventListener("click",e=>{const t=e.target;
  if(t.dataset.delinf){S.delInf=t.dataset.delinf;renderReps();return;}
  if(t.dataset.delinfno){S.delInf=null;renderReps();return;}
  if(t.dataset.delinfok){t.disabled=true;t.textContent="Eliminando…";deleteInforme(t.dataset.delinfok);}});
$("tbody").addEventListener("change",e=>{const sl=e.target.closest(".reclSel");if(sl)quickRecl(sl.dataset.recl,sl.value);});
$("alerts").addEventListener("toggle",e=>{const d=e.target;if(d.classList&&d.classList.contains("aviso"))S.avOpen={...(S.avOpen||{}),[d.dataset.cat]:d.open};},true);
$("scrim").addEventListener("click",closeSheet);
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&S.sheet)closeSheet();});
$("sheet").addEventListener("click",async e=>{const t=e.target;
  if(t.id==="shClose"){closeSheet();return;}
  if(t.id==="aprOk"){const ref=$("apR").value.trim();if(!ref){toast("Escribe el documento o referencia que respalda la aprobación.");$("apR").focus();return;}
    const r=ROWS.find(x=>x.m.no===+S.sheet.draft.no);setAprobacion(S.sheet.draft.no,{soporte:$("apS").value,ref,responsable:$("apP").value.trim(),fecha:$("apF").value||TODAY,obs:$("apO").value.trim(),estOriginal:r?r.estOrig:""});return;}
  if(t.id==="aprDel"){setAprobacion(S.sheet.draft.no,null);return;}
  if(t.id==="reclSave"){const v=$("rcA").value;const obs=$("rcO").value.trim();
    setReclasif(S.sheet.draft.no,v==="auto"?null:{a:v,obs,fecha:TODAY});return;}
  if(t.id==="shClose"){closeSheet();return;}
  if(t.id==="cAddZ"){readCfgForm();S.sheet.draft.zonas.push({cod:"",nombre:""});renderSheet();const ins=document.querySelectorAll('#sheet [data-k="cod"]');ins[ins.length-1]?.focus();return;}
  if(t.dataset.delz!=null){readCfgForm();S.sheet.draft.zonas.splice(+t.dataset.delz,1);renderSheet();return;}
  if(t.id==="cSave"){readCfgForm();const d=S.sheet.draft;d.zonas=d.zonas.filter(z=>z.cod||z.nombre);
    const err=m=>{$("cErr").innerHTML=`<div class="warn crit">${esc(m)}</div>`;};
    if(!d.proyecto){err("Escribe el nombre del proyecto.");return;}
    if(d.zonas.some(z=>!z.cod)){err("Cada edificio o zona necesita un código.");return;}
    const cods=d.zonas.map(z=>z.cod);if(new Set(cods).size!==cods.length){err("Hay códigos repetidos.");return;}
    const huerf=[...new Set([...S.muestras.values()].map(m=>m.edificio).filter(c=>c&&!cods.includes(c)))];
    if(huerf.length){err(`Hay muestras asignadas a ${huerf.join(", ")}. Mantén ese código (puedes cambiar el nombre) o reasigna las muestras.`);return;}
    t.disabled=true;try{await writeCfg(d);toast("Proyecto guardado.");closeSheet();render();}catch(er){t.disabled=false;err("No se pudo guardar: "+(er.message||er.code));}return;}
  if(t.dataset.dele!=null){readSheetForm();S.sheet.draft.ensayos.splice(+t.dataset.dele,1);renderSheet();toast("Rotura quitada. Guarda la muestra para confirmar.");return;}
  if(t.id==="aAdd"){readSheetForm();const v=["aV1","aV2","aV3"].map(i=>parseFloat($(i).value)).filter(x=>!isNaN(x));
    const f=$("aF").value;if(!v.length||!f){toast("Escribe la fecha y al menos un cilindro.");return;}
    const edad=$("aEdad").value?+$("aEdad").value:(S.sheet.draft.fechaMuestreo?dnum(f)-dnum(S.sheet.draft.fechaMuestreo):0);
    S.sheet.draft.ensayos.push({fecha:f,edad,mpa:v,informe:$("aInf").value.trim(),origen:"manual"});renderSheet();return;}
  if(t.id==="sSave"){readSheetForm();const d=S.sheet.draft;
    if(!d.no||!d.fc){toast("La muestra necesita número y f'c.");return;}
    if(S.sheet.isNew&&S.muestras.has(d.no)){toast(`Ya existe la muestra No. ${d.no}.`);return;}
    if(S.sheet.isNew)d.manual=true;
    t.disabled=true;try{await writeMuestra(d);toast(`Muestra No. ${d.no} guardada.`);closeSheet();render();}catch(err){t.disabled=false;toast("No se pudo guardar: "+(err.message||err.code));}return;}
  if(t.id==="sDel"){$("sConfirm").innerHTML=`<div class="confirm">¿Eliminar la muestra No. ${S.sheet.draft.no} y todas sus roturas? <button class="btn small danger" type="button" id="sDelOk">Sí, eliminar</button><button class="btn small" type="button" id="sDelNo">Cancelar</button></div>`;return;}
  if(t.id==="sDelNo"){$("sConfirm").innerHTML="";return;}
  if(t.id==="sDelOk"){try{await deleteMuestra(S.sheet.draft.no);toast("Muestra eliminada.");closeSheet();render();}catch(err){toast("No se pudo eliminar: "+(err.message||err.code));}}
});

/* ================= Arranque ================= */
render();
(async()=>{
  const use=n=>window.claude&&window.claude.use?window.claude.use(n).catch(()=>null):Promise.resolve(null);
  const[db,dl]=await Promise.all([use("db"),use("downloads")]);
  S.downloads=dl;
  if(!db){S.mode="local";const ok=loadLocal();stiResumen();render();
    if(ok){$("syncState").textContent="Guardado en este navegador";}
    else{$("syncState").textContent="Sin almacenamiento";$("banner").hidden=false;$("banner").textContent="Este navegador no permite guardar datos. Puedes cargar y revisar informes, pero exporta a Excel antes de cerrar.";}
    return;}
  S.db=db;$("syncState").textContent="Sincronizado";
  db.collection("muestras").onSnapshot(snap=>{S.muestras=new Map();snap.docs.forEach(d=>{const v=d.data();if(v&&v.no!=null)S.muestras.set(+v.no,v);});render();},
    err=>{$("syncState").textContent="Sin sincronización ("+err.code+")";});
  db.doc("config/proyecto").onSnapshot(snap=>{if(snap.exists)S.cfg={...clean(CFG0),...snap.data()};render();},()=>{});
  db.collection("informes").onSnapshot(snap=>{S.informes=new Map();snap.docs.forEach(d=>S.informes.set(d.id,d.data()));render();},()=>{});
})();

return{};
}};
