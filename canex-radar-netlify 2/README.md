# Canex Radar — Despliegue en Netlify

Este paquete contiene todo lo necesario para publicar la herramienta en tu propio
dominio, usando Netlify Blobs como base de datos (incluido gratis en Netlify,
no requiere Lark ni ninguna otra cuenta externa).

## Contenido
- `index.html` — la app completa (idéntica a la que usabas en Claude, con un
  pequeño "traductor" agregado al inicio para que hable con tu backend en vez
  del sistema de almacenamiento de Claude).
- `netlify/functions/storage.js` — la función que guarda y lee los datos.
- `netlify.toml` — configuración de Netlify.
- `package.json` — la única dependencia necesaria (`@netlify/blobs`).

## Pasos para publicarlo

1. **Crea una cuenta en Netlify** (netlify.com) si no tienes una — es gratis.
2. **Sube esta carpeta completa.** La forma más simple:
   - Entra a tu panel de Netlify → "Add new site" → "Deploy manually".
   - Arrastra esta carpeta completa (o un .zip de ella) al recuadro.
3. Netlify va a detectar `netlify.toml` automáticamente e instalar
   `@netlify/blobs` solo. No necesitas configurar nada más — Netlify Blobs
   se activa automáticamente en cualquier sitio, sin claves ni tokens.
4. En unos segundos te da una URL tipo `algo-al-azar.netlify.app`.
5. **(Opcional) Dominio propio:** en el panel del sitio → "Domain settings" →
   "Add a domain", y conectas algo como `radar.canex.com.ec` si ya tienes ese
   dominio o subdominio disponible en tu proveedor (mismo proceso que hiciste
   con el formulario de despacho).

## Importante: los datos NO se heredan de Claude

Los códigos, vendedores y ventas que ya creaste dentro de Claude viven en el
almacenamiento de Claude — **no se copian automáticamente** a este nuevo sitio.
La primera vez que abras el sitio en Netlify, va a sembrar de nuevo los mismos
datos base (vendedores, códigos de gerencia, comité, técnico, etc.) gracias a
la función de sembrado que ya tiene el código. Cualquier venta o persona que
hayas agregado después manualmente en Claude, tendrás que volver a agregarla
aquí (o dime y te ayudo a exportarla/migrarla a mano).

## Si algo falla

- Error 404 en las llamadas a `/api/storage`: revisa que `netlify.toml` se haya
  subido junto con el resto (algunos métodos de subida por arrastre a veces
  ocultan archivos que empiezan con punto o con nombres poco comunes — verifica
  que esté ahí).
- Si el login no deja escribir código o la app se queda cargando: abre las
  herramientas de desarrollador del navegador (F12) → pestaña "Console" o
  "Network", y fíjate si hay errores en las llamadas a `/api/storage`.
