const CACHE='luat-vn-v4';
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(['./','./index.html','./manifest.json','./icon-192.png','./icon-512.png'])));});
self.addEventListener('activate',e=>e.waitUntil((async()=>{for(const k of await caches.keys())if(k.startsWith('luat-vn-')&&k!==CACHE)await caches.delete(k);await self.clients.claim();})()));
self.addEventListener('message',e=>{if(e.data==='capnhat')self.skipWaiting();});
self.addEventListener('fetch',e=>{
 const u=new URL(e.request.url);if(e.request.method!=='GET'||u.origin!==location.origin)return;
 if(/(?:capnhat|vanban-moi|pending)\.json$/.test(u.pathname)){e.respondWith(fetch(e.request,{cache:'no-store'}));return;}
 e.respondWith((async()=>{
  const cache=await caches.open(CACHE),cached=await cache.match(e.request);
  const network=fetch(e.request).then(r=>{if(r.ok)cache.put(e.request,r.clone());return r;});
  if(cached){e.waitUntil(network.catch(()=>{}));return cached;}
  try{return await network;}catch{return new Response('Offline',{status:503});}
 })());
});
