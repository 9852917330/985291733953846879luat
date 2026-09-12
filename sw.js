const CACHE='luat-vn-v5';
const SHELL=['./manifest.json','./icon-192.png','./icon-512.png','./icon-180.png'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)));});
self.addEventListener('activate',e=>e.waitUntil((async()=>{for(const k of await caches.keys())if(k.startsWith('luat-vn-')&&k!==CACHE)await caches.delete(k);await self.clients.claim();})()));
self.addEventListener('message',e=>{if(e.data==='capnhat')self.skipWaiting();});
self.addEventListener('fetch',e=>{
 const u=new URL(e.request.url);if(e.request.method!=='GET'||u.origin!==location.origin)return;
 const fresh=/\/(?:capnhat|vanban-moi)\.json$/.test(u.pathname)||e.request.mode==='navigate'||u.pathname.endsWith('/index.html');
 if(fresh){
   e.respondWith((async()=>{const cache=await caches.open(CACHE);try{const r=await fetch(e.request,{cache:'no-store'});if(r.ok)cache.put(e.request,r.clone());return r;}catch{const c=await cache.match(e.request);return c||new Response('Offline',{status:503});}})());
   return;
 }
 e.respondWith((async()=>{const cache=await caches.open(CACHE),cached=await cache.match(e.request);if(cached)return cached;try{const r=await fetch(e.request);if(r.ok)cache.put(e.request,r.clone());return r;}catch{return new Response('Offline',{status:503});}})());
});
