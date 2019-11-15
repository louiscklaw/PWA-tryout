const staticCacheName = 'site-static-v4';
const dynamicCacheName = 'site-dynamic-v4';

const assets = [
  '/',
  '/index.html',
  '/js/app.js',
  '/js/ui.js',
  '/js/materialize.min.js',
  '/css/styles.css',
  '/css/materialize.min.css',
  '/img/dish.png',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  'https://fonts.gstatic.com/s/materialicons/v47/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2',
  '/pages/fallback.html'
];

const limitCacheSize = ( name, size ) => {
  // console.log('limitCacheSize calling')
  caches.open( name ).then( cache => {
    cache.keys().then( keys => {
      // console.log('delete cache', keys)
      if ( keys.length > size ) {
        // console.log('delete cache', keys[0])
        cache.delete( keys[ 0 ] ).then(
          limitCacheSize( name, size )
        )
      }
    } )
  } )
}

self.addEventListener( 'install', evt => {
  // console.log('service worker has been installed', evt);
  evt.waitUntil(
    caches.open( staticCacheName )
    .then( cache => {
      // console.log( 'caching static assets' )
      cache.addAll( assets );
    } )
  )
} )

// activate
self.addEventListener( 'activate', evt => {
  // console.log( 'service worker has been activated', evt );
  evt.waitUntil(
    caches.keys()
    .then( keys => {
      return Promise.all(
        keys
        .filter( key => key !== staticCacheName )
        .map( key => caches.delete( key ) )
      )
    } )
  )
} )
// fetch event
self.addEventListener( 'fetch', evt => {
  // console.log( 'fetch event', evt )
  // console.log( 'check this ', evt.request.url, evt.request.url.indexOf( 'firestore.googleapis.com' ) )
  if ( evt.request.url.indexOf( 'firestore.googleapis.com' ) === -1 ) {

    evt.respondWith(
      caches.match( evt.request ).then( cacheRes => {
        return cacheRes || fetch( evt.request )
          .then( fetchRes => {
            return caches.open( dynamicCacheName ).then( cache => {
              cache.put( evt.request.url, fetchRes.clone() )

              limitCacheSize( dynamicCacheName, 30 )
              return fetchRes
            } )
          } )

      } )
      .catch( () => {
        if ( evt.request.url.indexOf( '.html' ) ) {
          return caches.match( '/pages/fallback.html' )
        }
      } )
    )
  } else {

  }

} )