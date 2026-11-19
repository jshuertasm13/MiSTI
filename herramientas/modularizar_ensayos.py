#!/usr/bin/env python3
"""Convierte las apps de ensayos (ensayos/concreto.html y ensayos/mamposteria.html)
en módulos que Mi STI muestra dentro de su propia página (Shadow DOM, sin iframes):
js/ens-concreto.js y js/ens-mamposteria.js.

Uso (desde la carpeta del repositorio):  python3 herramientas/modularizar_ensayos.py
Vuelve a ejecutarlo cada vez que se actualice una de las apps de ensayos."""
import json, re, os, sys

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

EXTRA_CSS = """
:host{display:block;--bg:transparent;--surface:#ffffff;--surface-2:#f1f1ec;--line:#deded8;--line-strong:#b5b5ad;
  --ink:#111111;--ink-2:#3b3b38;--ink-3:#6a6a64;--f-display:"Archivo","Arial Narrow",Arial,sans-serif}
.ensbody{background:transparent!important;padding:0!important;color:var(--ink);font-family:var(--f-body);font-size:14px;line-height:1.45}
.wrap{max-width:none!important;margin:0!important;padding:0!important}
.top{padding:0!important;border:0!important;justify-content:flex-end!important;margin:0 0 4px!important}
.top>div:first-child{display:none!important}
#btnCfg,#btnExpJ,#btnImpJ,#btnReset{display:none!important}
#tabs{display:none!important}
.sheet,.scrim{z-index:60!important}.toast{z-index:70!important}
"""

def convertir(nombre, extra_js_return):
    s = open(os.path.join(REPO, "ensayos", nombre + ".html"), encoding="utf-8").read()
    css = "\n".join(re.findall(r"<style>(.*?)</style>", s, flags=re.S))
    css = css.replace(":root{", ":host{")
    css = re.sub(r"(^|[\s,}])body\{", r"\1.ensbody{", css)
    css = re.sub(r"(^|[\s,}])body\s", r"\1.ensbody ", css)
    css += EXTRA_CSS
    body = s[s.index("<body>") + 6 : s.rindex("</body>")]
    scripts = list(re.finditer(r"<script>(.*?)</script>", body, flags=re.S))
    assert len(scripts) == 2, (nombre, len(scripts))
    puente, main = scripts
    html = body[puente.end() : main.start()].strip()
    code = main.group(1)
    code = code.replace("../vendor/", "vendor/")
    if nombre == "mamposteria":
        assert 'tab:"concreto"' in code
        code = code.replace('tab:"concreto"', 'tab:STI.tab||"mortero"', 1)
    assert "function stiResumen(){" in code
    code = code.replace("function stiResumen(){", "function stiResumen(){setTimeout(()=>{try{STI.onChange&&STI.onChange()}catch(e){}},0);", 1)
    out = (
        "/* Generado por herramientas/modularizar_ensayos.py a partir de ensayos/%s.html. No editar a mano. */\n" % nombre
        + "window.ENS_MOD=window.ENS_MOD||{};\n"
        + "window.ENS_MOD[%s]={css:%s,html:%s,run:function(root,STI,document){\n" % (json.dumps(nombre), json.dumps(css, ensure_ascii=False), json.dumps(html, ensure_ascii=False))
        + code
        + "\n" + extra_js_return + "\n}};\n"
    )
    open(os.path.join(REPO, "js", "ens-%s.js" % nombre), "w", encoding="utf-8").write(out)
    print("js/ens-%s.js" % nombre, len(out))

convertir("concreto", "return{};")
convertir("mamposteria", 'return{setTab:t=>{S.tab=t;S.f.fc="";S.f.est="";S.cFc="";render();}};')
