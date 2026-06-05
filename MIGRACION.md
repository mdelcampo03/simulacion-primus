# Migración de Netlify a GitHub Pages — Hyrox Cronómetro

Resumen de los pasos realizados para migrar la app a GitHub Pages, con
`config.js` fuera del repo (generado en cada despliegue desde Secrets) y
login anónimo de Firebase.

## Preparación del código

- `index.html` adaptado para usar **login anónimo de Firebase**: autentica al
  cargar y solo escribe en la base cuando hay sesión válida.
- `leaderboard.html` no requiere login (solo lee; las reglas permiten lectura
  pública).
- Archivos de apoyo generados:
  - `config.example.js` — plantilla de credenciales (sí va al repo).
  - `.gitignore` — evita subir `config.js`.
  - `database.rules.json` — reglas de Firebase (referencia).
  - `.github/workflows/deploy.yml` — workflow que publica el sitio.

## Pasos realizados

1. **Repositorio en GitHub.** Se creó un repo vacío en github.com.

2. **Subir el proyecto desde la computadora (Windows).** Terminal abierta
   dentro de la carpeta del proyecto y secuencia de Git:
   ```bash
   git init
   git add .
   git commit -m "Cronometro y leaderboard Hyrox + deploy Pages"
   git remote add origin https://github.com/TU_USUARIO/hyrox-cronometro.git
   git branch -M main
   git push -u origin main
   ```
   - Se resolvió el error "remote origin already exists" (el origin ya existía).
   - Se verificó con `git status` y `git ls-files` que todo se subió y que
     `config.js` quedó fuera del repo.

3. **Subir el `.gitignore`.** GitHub oculta en la vista web los archivos que
   empiezan con punto; se confirmó que estaba y se subió:
   ```bash
   git add .gitignore
   git commit -m "Agregar .gitignore"
   git push
   ```

4. **Secrets de Firebase.** En Settings → Secrets and variables → Actions, se
   crearon los 7 secrets con las credenciales reales:
   `FB_API_KEY`, `FB_AUTH_DOMAIN`, `FB_DATABASE_URL`, `FB_PROJECT_ID`,
   `FB_STORAGE_BUCKET`, `FB_SENDER_ID`, `FB_APP_ID`.

5. **Activar GitHub Pages.** Settings → Pages → Source: **GitHub Actions**.

6. **Primer despliegue.** Se lanzó el workflow manualmente (el push fue previo a
   activar Pages). El job `build-deploy` terminó en **verde**. Los dos warnings
   (Node.js 20 deprecated y URL del entorno) eran inofensivos.

7. **Configurar Firebase.**
   - Authentication → Sign-in method → **Anonymous** habilitado.
   - Realtime Database → Rules → pegado el contenido de `database.rules.json`
     → Publish.

8. **Prueba final.** Se abrió el sitio, se agregó un atleta y se confirmó la
   sincronización.

## Resultado

- La app vive en `https://TU_USUARIO.github.io/hyrox-cronometro/`.
  - Cronómetro: `index.html`
  - Leaderboard / TV: `leaderboard.html?s=tu-sesion`
- `config.js` se genera en cada despliegue desde los Secrets; nunca toca el repo.
- La seguridad real la dan las reglas de Firebase + login anónimo, no el ocultar
  la API key (que es visible en cualquier app cliente).

## Cómo actualizar el sitio de aquí en adelante

Cualquier cambio redespliega el sitio automáticamente. Dos caminos (no mezclar
sin sincronizar):

- **Local + Git:** editar archivos → `git add .` → `git commit -m "..."` →
  `git push`. La carpeta local es la fuente principal.
- **Web de GitHub:** editar el archivo con el lápiz (✏️) → "Commit changes".
  Cómodo para retoques rápidos, pero deja la copia local desactualizada
  (recuperar con `git pull` antes de volver a trabajar local).

No hace falta volver a tocar Secrets ni la configuración de Pages, salvo que se
roten credenciales de Firebase.

## Mantenimiento de Firebase

- Al terminar un evento, se pueden endurecer las reglas a `".read": false` y
  `".write": false` para cerrar la base.
- El login anónimo evita escrituras externas, pero no distingue operador de
  público. Si en el futuro hace falta impedir escritura a cualquier visitante,
  cambiar a Email/contraseña.
