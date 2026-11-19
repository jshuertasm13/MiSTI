# Mi STI

Aplicativo web para la **Supervisión Técnica Independiente** (NSR-10, Título I): control documental, certificados de materiales, ensayos de concreto y mampostería, control del concreto preparado en obra, inspecciones de elementos estructurales y no estructurales, no conformidades, informes semanales y actas mensuales, y registro fotográfico.

Es un sitio estático (HTML, CSS y JavaScript sin compilación). Se publica directamente con GitHub Pages.

## Cuentas de prueba

| Usuario | Contraseña | Rol |
|---|---|---|
| `admin` | `admin1234` | Dueño de la plataforma: crea empresas y usuarios administradores |
| `admin.demo` | `demo1234` | Administradora de la empresa *Firma Demo* y directora del proyecto |
| `residente1` | `demo1234` | Residente STI |
| `constructor1` | `demo1234` | Constructor: solo lectura y respuesta a no conformidades |
| `admin.ejemplo` | `demo1234` | Administrador de otra empresa (*Ingeniería Ejemplo*) |

El proyecto **«Proyecto de ensayo · Edificio Muestra»** trae un ejemplo de cada registro: documentos en todos los estados, certificados aprobados, en revisión y devueltos, ensayos de concreto, mortero, grouting, unidades y muretes en todos los estados (cumple, aceptable, promedio bajo, no cumple, pendiente, rotura atrasada, aprobada por concepto), inspecciones de cada tipo de elemento (estructurales y no estructurales), dos registros de concreto preparado en obra, no conformidades por falla repetitiva y por error grave, dos actas mensuales, dos informes semanales y registro fotográfico. El dueño de la plataforma (`admin`) está agregado como miembro para poder verlo.

Desde **Plataforma → Restablecer datos de demostración** se vuelve al estado inicial.

## Roles

- **Dueño de la plataforma**: crea empresas y sus administradores. Solo entra a un proyecto si lo agregan como miembro.
- **Administrador de empresa**: configura los datos y la paleta de colores de su empresa, crea usuarios (directores, residentes, constructores) y proyectos.
- **Director / residente**: registran y revisan. El director aprueba.
- **Constructor**: consulta el proyecto y responde las no conformidades con fotos.

## Publicar en GitHub Pages

1. Sube el contenido de esta carpeta a un repositorio (por ejemplo `mi-sti`).
2. En GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch**, rama `main`, carpeta `/ (root)`.
3. En uno o dos minutos queda en `https://<tu-usuario>.github.io/mi-sti/`.

Para probar en tu computador: `python3 -m http.server 8000` dentro de la carpeta y abrir `http://localhost:8000`.

## Dónde quedan los datos

En esta versión los datos se guardan **en el navegador** de cada persona (localStorage y, las fotos, en IndexedDB). Cada navegador tiene su propia copia: sirve para mostrar y probar, no para trabajo compartido. Desde **Plataforma** se puede descargar un respaldo y restaurarlo.

El siguiente paso para uso real en obra es conectar una base de datos en la nube (propuesta: Supabase, con usuarios, permisos por empresa y fotos en almacenamiento) para que todos vean la misma información.

## Asistente de IA (opcional)

Cada empresa puede pegar su propia clave de API de Anthropic en **Mi empresa**. La clave se guarda solo en ese navegador. Sin clave, la lectura de PDF funciona con reglas y los textos se escriben a mano.

## Estructura

```
index.html            Página principal
css/app.css           Estilos (la paleta se define por empresa)
js/datos.js           Catálogos, listas de chequeo y datos de demostración
js/core.js            Utilidades, sesión, permisos, paletas, fotos, IA, PDF
js/vistas.js          Pantallas
js/acciones.js        Eventos y acciones
js/concreto-obra.js   Control del concreto preparado en obra
js/ens-concreto.js    Módulo de ensayos de concreto (generado desde ensayos/concreto.html)
js/ens-mamposteria.js Módulo de ensayos de mampostería (generado desde ensayos/mamposteria.html)
ensayos/              Apps originales de ensayos (también funcionan solas)
herramientas/         modularizar_ensayos.py: genera los módulos de ensayos
vendor/               Librerías incluidas: pdf.js, html2pdf, SheetJS (con sus licencias)
```

## Datos guardados y actualizaciones

Cuando se publica una versión nueva, la app actualiza los datos guardados en el navegador sin borrar usuarios, empresas ni proyectos (ver `migrarDatos` en `js/core.js`). Los archivos adjuntos de documentos y certificados se guardan en el navegador y se incluyen en el respaldo.

## Actualizar las apps de ensayos

Los ensayos se ven dentro de Mi STI (resumen arriba y pestañas por tipo de ensayo). Para integrar una versión nueva de las apps:

1. Integrar la app original con `integrar_ensayos.py` (se guarda fuera del repositorio porque contiene los textos originales que reemplaza):
   `python3 integrar_ensayos.py concreto_original.html mamposteria_original.html ruta/al/repo/mi-sti`
2. Generar los módulos: `python3 herramientas/modularizar_ensayos.py`
