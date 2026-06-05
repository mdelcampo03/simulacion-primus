# Migración a GitHub Pages — Hyrox Cronómetro

Despliegue en GitHub Pages con `config.js` fuera del repo (lo genera el workflow
desde Secrets) y login anónimo de Firebase.

## Archivos de este paquete

- `index.html` — app de cronometraje (ya incluye login anónimo).
- `leaderboard.html` — pantalla pública (solo lee, no necesita login).
- `config.example.js` — plantilla de credenciales (sí se sube al repo).
- `.gitignore` — evita subir `config.js`.
- `.github/workflows/deploy.yml` — genera `config.js` y publica en cada push.
- `database.rules.json` — reglas de Firebase (referencia; se pegan en la consola).

---

## Paso 1 — Firebase: habilitar login anónimo

Consola de Firebase → **Authentication → Sign-in method → Anonymous → Enable**.
Sin esto, el cronómetro no podrá escribir.

## Paso 2 — Firebase: aplicar las reglas

Consola → **Realtime Database → Rules** → pega el contenido de
`database.rules.json` → **Publish**.

Lectura pública (para el leaderboard/TV), escritura solo con sesión autenticada.

## Paso 3 — Crear el repositorio en GitHub

En github.com → **New repository** → nombre p. ej. `hyrox-cronometro`
→ **vacío** (sin README, sin .gitignore) → Create.

## Paso 4 — Subir el proyecto

Desde la carpeta del proyecto (con todos estos archivos dentro):

```bash
git init
git add .
git commit -m "Cronometro y leaderboard Hyrox + deploy Pages"
git remote add origin https://github.com/TU_USUARIO/hyrox-cronometro.git
git branch -M main
git push -u origin main
```

Confirma con `git status` que `config.js` NO se subió (debe estar ignorado).

## Paso 5 — Guardar las credenciales como Secrets

En el repo → **Settings → Secrets and variables → Actions → New repository secret**.
Crea uno por cada valor (sin comillas), tomados de tu config de Firebase:

- `FB_API_KEY`
- `FB_AUTH_DOMAIN`
- `FB_DATABASE_URL`
- `FB_PROJECT_ID`
- `FB_STORAGE_BUCKET`
- `FB_SENDER_ID`
- `FB_APP_ID`

## Paso 6 — Activar GitHub Pages vía Actions

Repo → **Settings → Pages → Build and deployment → Source: GitHub Actions**.
(No elijas "Deploy from a branch".)

## Paso 7 — Desplegar

El push del Paso 4 ya dispara el workflow. Para volver a lanzarlo:
repo → pestaña **Actions** → workflow "Deploy to Pages" → **Run workflow**,
o simplemente haz otro `git push`.

Al terminar, la URL aparece en Actions y en Settings → Pages:
`https://TU_USUARIO.github.io/hyrox-cronometro/`

- Cronómetro: `…/index.html`
- Leaderboard/TV: `…/leaderboard.html?s=tu-sesion`

## Desarrollo local (opcional)

Copia `config.example.js` a `config.js`, pon tus credenciales y abre con un
servidor estático (p. ej. `python3 -m http.server`). Los módulos ES no cargan
con `file://`.

---

## Notas de seguridad (importante)

- La `apiKey` de Firebase Web NO es secreta: es visible en el navegador en
  cualquier app cliente. Mantenerla fuera del repo es higiene, no seguridad.
- La protección real son las reglas + login. El login anónimo impide escrituras
  externas, pero como cualquier visitante obtiene sesión anónima, no distingue
  operador de público. Para un evento puntual donde solo tú abres el cronómetro,
  es suficiente. Si necesitas impedir escritura a cualquier visitante, cambia a
  Email/contraseña.
- Al terminar el evento, puedes endurecer las reglas a `".read": false` y
  `".write": false`.
