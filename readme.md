# FitGirl Automatic Download Assistant

A Tampermonkey / Violentmonkey userscript that automatically manages and downloads multi-part `fuckingfast.co` links directly from FitGirl Repacks pages.

---

### Türkçe Açıklama

Bu kullanıcı betiği (userscript), FitGirl Repacks (`fitgirl-repacks.site`) sayfalarındaki `fuckingfast.co` indirme bağlantılarını otomatik olarak seçmenizi, sıralı şekilde açmanızı ve FuckingFast sayfalarında indirmeyi doğrudan başlatarak sekmeleri güvenle kapatmanızı sağlar.

#### v2.1 Yenilikleri ve Düzeltmeler:
1. **Otomatik İndirme Sorunu Çözüldü:** FuckingFast sitesindeki indirme butonunun tetiklediği `window.open` çağrıları, tarayıcıların "Pop-up Engelleyicisi" (Pop-up Blocker) tarafından engelleniyordu. Betik artık `window.open` çağrılarını yakalayarak indirme akışına doğrudan mevcut sekmede yönlendirir (`window.location.href`).
2. **Dinamik ve Kapsamlı Buton Tespiti:** Sayfa sınıfları (Tailwind / gay-button / link-button / hx-post) değişse dahi indirme butonu alternatif seçiciler ve metin taraması ile tespit edilir.
3. **Erken Sekme Kapanma Koruması:** Önceki sürümdeki sabit 3 saniyelik sekme kapatma süresi uzatılarak (10 sn) dosya aktarımının başlaması garanti altına alındı. Ayrıca ekranda geri sayım rozeti ve istenirse kapatmayı durduran **"Kapatmayı İptal Et"** butonu eklendi.
4. **Sayaç ve Hazırlık Koruması:** FuckingFast üzerinde geri sayım sayacı varsa buton tıklanmadan önce sayacın bitmesi beklenir.
5. **Türkçe Dil Desteği:** Türkçe arayüz eksikliği giderildi.

> **Önemli İpucu (Tarayıcı İzinleri):**
> Çoklu part indirirken tarayıcınız (Chrome, Edge, Brave vb.) adres çubuğunda *"Bu sitenin birden çok dosya indirmesine izin verilsin mi?"* uyarısı çıkarabilir. Kesintisiz indirme için buna **"İzin Ver" (Allow)** demelisiniz.

---

### English Description

#### Features & v2.1 Improvements:
- **Pop-up Blocker Bypass:** Intercepts `window.open` calls to trigger downloads directly in the active tab without being blocked by browser pop-up protections.
- **Robust Button & Direct Link Detection:** Scans HTML, scripts, HTMX endpoints, and button selectors to find the download link reliably.
- **Safety Tab Closure:** Tab close countdown (10s) with a manual "Cancel Close" button to prevent interrupting active downloads.
- **Timer Handling:** Detects countdown timers before attempting to trigger the download button.
- **Multi-language Support:** Full localization support (including Turkish, English, Spanish, German, French, Chinese, etc.).
