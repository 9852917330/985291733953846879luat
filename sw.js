/* Máy chạy nền của app.
   Nguyên tắc: LUÔN ưu tiên bản mới trên mạng, chỉ dùng bản lưu khi mất mạng.
   Nhờ vậy đẩy code mới lên GitHub là app tự cập nhật, không phải xoá cache tay. */

const KHO = "luat-vn-v3";
const CO_BAN = ["./", "./index.html", "./manifest.json", "./icon-192.png", "./icon-512.png"];

self.addEventListener("install", e => {
  self.skipWaiting();                                  // bản mới lên ngôi ngay
  e.waitUntil(caches.open(KHO).then(c => c.addAll(CO_BAN)).catch(() => {}));
});

self.addEventListener("activate", e => {
  e.waitUntil((async () => {
    const ten = await caches.keys();
    await Promise.all(ten.filter(t => t !== KHO).map(t => caches.delete(t)));  // dọn bản cũ
    await self.clients.claim();
  })());
});

self.addEventListener("message", e => { if (e.data === "capnhat") self.skipWaiting(); });

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;     // để trang ngoài tự đi, không đụng vào

  // Kết quả quét: luôn lấy trên mạng, không bao giờ dùng bản cũ
  if (url.pathname.endsWith("capnhat.json")) {
    e.respondWith(fetch(req, { cache: "no-store" }).catch(() => caches.match(req)));
    return;
  }

  // Mọi thứ còn lại: mạng trước, lưu lại làm dự phòng, mất mạng mới dùng bản lưu
  e.respondWith((async () => {
    try {
      const res = await fetch(req);
      if (res && res.ok) {
        const ban = res.clone();
        caches.open(KHO).then(c => c.put(req, ban)).catch(() => {});
      }
      return res;
    } catch {
      const luu = await caches.match(req);
      return luu || caches.match("./index.html");
    }
  })());
});
