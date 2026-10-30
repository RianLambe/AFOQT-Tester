const CACHE='afoqt-1.16-af2cca';
const CORE=['./','./index.html','./manifest.webmanifest','./icons/icon.svg','./icons/icon-192.png','./icons/icon-512.png','./icons/maskable-512.png','./icons/apple-touch-icon.png','./fonts/barlow-condensed-latin-500-normal.woff2','./fonts/barlow-condensed-latin-600-normal.woff2','./fonts/barlow-condensed-latin-700-normal.woff2','./fonts/barlow-latin-400-normal.woff2','./fonts/barlow-latin-500-normal.woff2','./fonts/barlow-latin-600-normal.woff2','./fonts/jetbrains-mono-latin-400-normal.woff2','./fonts/jetbrains-mono-latin-600-normal.woff2'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const r=e.request; if(r.method!=='GET')return; const u=new URL(r.url);
  if(u.origin!==location.origin)return;
  if(r.mode==='navigate'){ // network first so updates arrive, cache when offline
    e.respondWith(fetch(r).then(res=>{const cp=res.clone();caches.open(CACHE).then(c=>c.put('./index.html',cp));return res}).catch(()=>caches.match('./index.html')));return}
  e.respondWith(caches.match(r).then(hit=>hit||fetch(r)));
});
