// 💡 Nombre para nuestra caché (incrementa esto cuando cambies los archivos cacheados)
const CACHE_NAME = 'mi-app-v1'; 

// 💡 Lista de archivos esenciales que queremos guardar en caché
const urlsToCache = [
  '/', 
  '/index.html',
  '/manifest.json',
  '/favicon.svg',
  // Añade las rutas a tus archivos estáticos cruciales (CSS, JS compilado, etc.)
  // Si usas un bundler, las rutas a los archivos JS/CSS serán hashes (ej: /static/js/main.1234.chunk.js)
  // En aplicaciones de React modernas (Vite/CRA), estas rutas se gestionan en el build.
  // Por simplicidad, aquí solo cacheados los archivos principales:
];

// =========================================================================
// 1. INSTALACIÓN (Instala el SW y abre la caché)
// =========================================================================
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Instalando y abriendo caché...');
  // waitUntil asegura que el SW no se considera instalado hasta que se complete la promesa.
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] Cacheando archivos de shell de la aplicación');
        // Agrega todos los archivos esenciales a la caché
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting()) // Forzar al SW a activarse inmediatamente
  );
});

// =========================================================================
// 2. ACTIVACIÓN (Limpia cachés antiguas)
// =========================================================================
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activando y limpiando cachés antiguas...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // Si el nombre de la caché no coincide con la versión actual (CACHE_NAME), la elimina
          if (cacheName !== CACHE_NAME) {
            console.log('[Service Worker] Eliminando caché antigua:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim()) // Permite que el SW tome control inmediatamente
  );
});

// =========================================================================
// 3. RECUPERACIÓN (Estrategia de caché: Cache-First)
// =========================================================================
self.addEventListener('fetch', (event) => {
  // Solo manejar solicitudes GET y no peticiones externas (como Google Analytics)
  if (event.request.method !== 'GET' || !event.request.url.startsWith(self.location.origin)) {
    return;
  }

  event.respondWith(
    // 1. Buscar la solicitud en la caché
    caches.match(event.request)
      .then((response) => {
        // Si se encuentra en caché, devolver la versión cacheada
        if (response) {
          return response;
        }
        
        // 2. Si no está en caché, ir a la red
        return fetch(event.request).then((networkResponse) => {
            // Opcional: Si la red fue exitosa, clonar la respuesta y guardarla en caché para futuras veces.
            const responseToCache = networkResponse.clone();
            if (networkResponse && networkResponse.status === 200) {
                 caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, responseToCache);
                 });
            }
            return networkResponse;
        });
      })
      .catch(() => {
        // En caso de que falle la red y no haya respuesta en caché (ej: si se solicitó algo no cacheado)
        // Puedes devolver una página offline predeterminada aquí si la tienes.
        // return caches.match('/offline.html');
      })
  );
});