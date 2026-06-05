/* ===========================================================================
   PLANTILLA DE CONFIGURACIÓN — Cronómetro Hyrox
   ---------------------------------------------------------------------------
   CÓMO USAR (una sola vez):
   1. Copia este archivo y renómbralo exactamente "config.js"
   2. Reemplaza los valores de abajo por los de tu proyecto Firebase
      (Consola Firebase > ⚙ Configuración del proyecto > Tus apps > Web).
   3. Coloca config.js JUNTO a index.html y leaderboard.html (misma carpeta).
   4. Súbelo a Netlify junto con los demás archivos.
 
   IMPORTANTE:

   - El campo databaseURL es obligatorio (Realtime Database).
   - Si no existe config.js, la app funciona en modo local (un solo dispositivo).
   =========================================================================== */

window.firebaseConfig = {
  apiKey: "AIzaSyAiOQGVdQddxKqXOL8iuv2-M3wC1p6Ky7w",
  authDomain: "simulacion-primus.firebaseapp.com",
  databaseURL: "https://simulacion-primus-default-rtdb.firebaseio.com",
  projectId: "simulacion-primus",
  storageBucket: "simulacion-primus.firebasestorage.app",
  messagingSenderId: "683783449687",
  appId: "1:683783449687:web:68c2c199b63de748288712",
  measurementId: "G-BPCWB7Q27C"
};