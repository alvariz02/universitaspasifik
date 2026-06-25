# TODO - Performa Homepage (LCP/CLS/TTFB)

## Step 1 (selesai)
- [x] `src/app/page.tsx`: hapus `dynamic = 'force-dynamic'` dan ganti dengan `revalidate = 3600`.

## Step 2 (selesai)
- [x] `src/components/home/FeaturedNews.tsx`: ganti `<img>` → `next/image` (gunakan `fill` + container `aspect-video`).

## Step 3 (selesai)
- [x] `src/components/home/FacultiesGrid.tsx`: ganti `<img>` → `next/image` (gunakan `fill` + container `aspect-video`).

## Step 4 (selesai)
- [x] Build & lint sukses.

## Step 5 (berikutnya yang disarankan)
- [ ] Jalankan `next dev` lalu cek Vercel Speed Insights untuk metrik LCP & CLS setelah perubahan.
- [ ] Jika masih tinggi: kurangi client hydration (pindahkan fetch home dari client ke server) dan tambah skeleton/height untuk section atas.


