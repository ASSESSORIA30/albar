# Albar · Web de viviendas de hormigón celular en kit

Web comercial completa (Next.js 15, App Router, React 19, TypeScript, Tailwind CSS 4, Motion) para vender kits de viviendas de hormigón celular: catálogo, fichas de modelo, configurador de presupuesto, alcance del kit, proceso, página divulgativa del material, formulario de captación con resumen previo, PDF orientativo, WhatsApp, analítica con consentimiento, SEO técnico y textos legales en español y catalán.

«Albar» es un **nombre provisional**: se cambia en `src/content/site.ts` y se actualiza en toda la web.

---

## Puesta en marcha

```bash
npm install
cp .env.example .env.local   # rellena lo que tengas
npm run dev                  # http://localhost:3000
```

| Comando | Qué hace |
| --- | --- |
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Compilación de producción (incluye tipos y lint) |
| `npm start` | Sirve la compilación |
| `npm test` | Pruebas del cálculo de precios |
| `npm run typecheck` | Comprobación de tipos |

Requiere Node 20 o superior.

---

## Dónde se edita cada cosa (panel de datos)

Todo el contenido comercial está centralizado en `src/content/`. No hace falta tocar componentes.

| Archivo | Contenido |
| --- | --- |
| `site.ts` | Marca, URL, teléfono, email, dirección, datos legales, redes |
| `pricing.ts` | 700 €/m² kit, 350 €/m² montaje, límites del configurador, criterio de medición, impuestos, validez |
| `scope.ts` | Partidas **incluidas / con montaje / no incluidas / pendientes**. Cambiar `status` mueve la partida en toda la web y en el PDF |
| `models.ts` | Modelos, superficie presupuestada, programa, renders, geometría para ilustraciones y planos |
| `i18n/es.ts`, `i18n/ca.ts` | Todos los textos (incluidos FAQ y textos legales). TypeScript avisa si al catalán le falta una clave |
| `provinces.ts` | Provincias del formulario |

En desarrollo, **`/panel-datos`** muestra qué datos están configurados y cuáles faltan (en producción solo si se compila con `ENABLE_CONFIG_PANEL=true`; la página no se indexa).

### Cálculo de precios

`src/lib/pricing.ts` (con pruebas en `tests/pricing.test.ts`):

```
precioKit     = superficie × 700
precioMontaje = superficie × 350   (solo con «Kit + montaje»)
total         = precioKit + precioMontaje
```

Todos los precios (tarjetas, fichas, configurador, PDF, WhatsApp, datos estructurados y el email al comercial) salen de esta función. La API **recalcula el presupuesto en el servidor**: no confía en importes enviados por el navegador.

- Precios siempre **sin impuestos**. Mientras `taxes.ratePercent` sea `null`, la web indica que se detallarán en el presupuesto definitivo. Si se fija un tipo, aparece una línea informativa con su importe.
- `surfaceCriterion: "pending"` muestra en cada precio que el criterio de medición está por confirmar. Opciones: `"built"` (construida) o `"useful"` (útil).

---

## Imágenes y renders

No se han usado fotos de terceros ni renders inventados. Cada modelo se dibuja a partir de su geometría en `models.ts`: **fachada principal, perspectiva posterior, perspectiva elevada y plano por planta**, coherentes entre sí (los huecos del alzado coinciden con los del plano). Todas aparecen marcadas como «ilustración orientativa».

Para usar renders reales, colócalos en `public/renders/` y rellena `renders` del modelo:

```ts
renders: {
  front: "/renders/llevant/fachada.webp",
  rear: "/renders/llevant/posterior.webp",
  aerial: "/renders/llevant/elevada.webp",
  plan: "/renders/llevant/plano.webp",
},
```

Las vistas con imagen pasan a servirse optimizadas con `next/image`; las que queden vacías siguen usando la ilustración.

**Encargo de renders recomendado** (por modelo): fachada principal a altura de ojo con luz de media mañana, perspectiva posterior, vista elevada a 30–35°, y plano de planta acotado. Formato 16:10, mínimo 2400 px de ancho, WebP/AVIF. Acabado de fachada en blanco, arena o piedra clara; carpinterías antracita; jardín mediterráneo (olivo, ciprés, lavanda, grava). Solo deben usarse como «obra construida» fotografías de obras reales de la empresa.

---

## Formulario y solicitudes

Ruta: `src/app/api/lead/route.ts`. Flujo: formulario → **resumen previo** → envío → estado real.

- Validación compartida cliente/servidor (`src/lib/lead.ts`, Zod).
- Antispam: campo trampa, tiempo mínimo de 3 s, límite de 5 envíos/10 min por IP y, opcionalmente, **Cloudflare Turnstile** (si se configuran sus dos claves, el formulario lo exige).
- Consentimiento de privacidad obligatorio.
- Si llega desde el configurador o una tarjeta (`/contacto?modelo=llevant`), el modelo, la superficie y la modalidad se rellenan solos.

Canales de entrega (se pueden activar los dos):

| Canal | Variables |
| --- | --- |
| Email vía [Resend](https://resend.com) | `RESEND_API_KEY`, `LEAD_EMAIL_TO`, `LEAD_EMAIL_FROM` |
| CRM vía webhook JSON (HubSpot, Pipedrive, Zapier, Make, n8n…) | `CRM_WEBHOOK_URL`, `CRM_WEBHOOK_SECRET` (opcional, se envía como `Authorization: Bearer`) |

**Estados reales**: si no hay ningún canal configurado, la API responde `503 not_configured` y el usuario ve que su solicitud **no** se ha enviado, con el contacto directo disponible. Nunca se muestra una confirmación falsa. Si todos los canales fallan, `502 delivery_failed`.

Ejemplo del JSON que recibe el CRM:

```json
{
  "id": "ALB-MVDO43MQ",
  "source": "web",
  "contact": { "name": "…", "phone": "…", "email": "…", "province": "Girona", "language": "es" },
  "project": { "model": "llevant", "surfaceM2": 125, "mode": "assembly", "land": "yes", "message": "…" },
  "estimate": { "currency": "EUR", "kit": 87500, "assembly": 43750, "subtotalExclTaxes": 131250 },
  "consent": { "privacy": true, "at": "2026-10-18T10:13:44.931Z" }
}
```

> El límite por IP vive en la memoria de cada instancia. Para un límite global en Vercel, sustitúyelo por Upstash Redis o similar.

---

## WhatsApp, PDF y analítica

- **WhatsApp**: `NEXT_PUBLIC_WHATSAPP_NUMBER` (p. ej. `34600000000`). El mensaje incluye modelo, superficie, modalidad y total. Sin número configurado, el botón no aparece en producción (en desarrollo se ve un aviso).
- **PDF**: se genera en el navegador (jsPDF, cargado bajo demanda) con superficie, criterio de medición, modalidad, desglose, total, incluidos, exclusiones y pendientes.
- **Analítica**: GA4 con `NEXT_PUBLIC_GA4_ID`. **Solo se carga tras aceptar** en el aviso de cookies. Eventos: `model_view`, `configurator_model`, `configurator_surface`, `configurator_mode`, `budget_pdf_download`, `budget_request_click`, `whatsapp_click`, `lead_review`, `lead_submit_success`, `lead_submit_error`. Las propiedades pasan por una lista blanca (modelo, tramo de superficie, modalidad, ubicación del botón): **nunca** nombre, email, teléfono, provincia ni mensajes.

---

## Idiomas y SEO

- Español sin prefijo (`/casas/llevant`) y catalán con prefijo (`/ca/casas/llevant`). `/es/...` redirige a la versión sin prefijo.
- Metadatos por página, `canonical`, `hreflang` (es-ES, ca-ES, x-default), Open Graph con imagen generada, `sitemap.xml`, `robots.txt`, `manifest`.
- Datos estructurados: `Organization`, `Product` con dos `Offer` (sin impuestos) por modelo, `BreadcrumbList`, `FAQPage` y `Article`.
- Los textos evitan promesas de plazos, ahorros o prestaciones sin ficha técnica.

---

## Despliegue en Vercel

1. Sube el proyecto a un repositorio (GitHub, GitLab o Bitbucket).
2. En Vercel: **Add New → Project**, importa el repositorio (detecta Next.js automáticamente).
3. En **Settings → Environment Variables** añade como mínimo `NEXT_PUBLIC_SITE_URL` y los canales de solicitudes que vayas a usar (ver `.env.example`).
4. Despliega. Añade tu dominio en **Settings → Domains** y actualiza `NEXT_PUBLIC_SITE_URL`.
5. Comprueba un envío real del formulario desde producción.

`vercel.json` fija la región `cdg1` (París), cercana a España.

---

## Antes de publicar

- [ ] Nombre comercial definitivo (`site.ts`)
- [ ] Datos legales completos: razón social, NIF, domicilio, registro, email de privacidad, fecha de revisión (los textos legales muestran marcadores hasta entonces). Conviene que un profesional revise aviso legal, privacidad y cookies
- [ ] Teléfono, email y WhatsApp comerciales
- [ ] Al menos un canal de solicitudes configurado y probado
- [ ] Ficha técnica del kit: confirmar qué partidas «pendientes» pasan a incluidas o excluidas (`scope.ts`)
- [ ] Criterio de medición de la superficie y tratamiento de impuestos (`pricing.ts`)
- [ ] Modelos comerciales reales, programas validados (`programValidated: true`) y renders
- [ ] Ámbito geográfico del transporte (FAQ)
- [ ] `NEXT_PUBLIC_GA4_ID` si se quiere analítica

---

## Estructura

```
src/
  app/
    [lang]/            páginas (inicio, casas, casas/[slug], presupuesto, que-incluye,
                       como-funciona, hormigon-celular, contacto, legales, panel-datos)
    api/lead/          recepción de solicitudes
    sitemap.ts, robots.ts, manifest.ts
  components/
    home/              secciones, configurador, comparador, proceso, formulario
    illustration/      alzados, vista elevada, planos y esquema del sistema (SVG)
    layout/            cabecera, pie, barra fija móvil, WhatsApp, consentimiento
    model/ ui/         tarjetas, galería, precios, utilidades
  content/             ← datos editables
  lib/                 precios, i18n, SEO, PDF, analítica, estado del presupuesto
middleware.ts          enrutado de idiomas
```
