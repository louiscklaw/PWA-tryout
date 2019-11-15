
### Hangouts

### PWA:
  1. install on a mobile home screen

  1. access the app when offline

  1. get push notifications

### service workers
  1. load content offline
  1. use background sync
  1. use push notifications

### Service Working Lifecycle
1. register the service worker (sw.js)
1. install event
1. service worker becomes active
1. active event
1. serviceworker "listens" for events


### service worker lifecycle
https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle


### criterial to show app install banner
https://developers.google.com/web/fundamentals/app-install-banners/native


### things to test
1. offline mode
  - http link inside css files

### check browser compatibility
1. caniuse.com

### function outline
- offline(https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/)
  - caching
    1. static caching
    1. dynamic caching
  - offline fallback


### consideration
- online
  - db updating
    - realtime ?

- offline
  - caching
    - html / css / js
  - db syncing
    - CRUD   # handled by firebase

### test tools
1. https://github.com/GoogleChrome/lighthouse