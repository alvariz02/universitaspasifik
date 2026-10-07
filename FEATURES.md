# Fitur pengelolaan website

## Menyiapkan database

Schema menggunakan PostgreSQL, sedangkan folder migrasi historis berasal dari SQLite. Jangan menjalankan `migrate reset` atau memaksakan migrasi SQLite pada database aktif.

Upgrade ini hanya menambah kolom, tabel, dan index. Data berita lama tetap berstatus `published`. SQL berjalan dalam transaksi dan dapat dijalankan ulang.

```powershell
npm run db:upgrade-features
npm run db:generate
npm run db:import-media
npm run build
```

`db:upgrade-features` memakai `DATABASE_URL` pada environment saat perintah dijalankan. Pastikan environment mengarah ke database website yang dimaksud. Upgrade perlu diterapkan sebelum versi aplikasi baru dipakai di Vercel. Untuk database baru, buat seluruh schema PostgreSQL terlebih dahulu dengan `prisma db push` tanpa opsi penghapusan data.

## Akun dan izin

Login administrator awal masih menggunakan `ADMIN_EMAIL`, `ADMIN_PASSWORD`, dan `SESSION_SECRET` (minimal 32 karakter). Administrator dapat membuat akun staf melalui **Akun Staf**. Password staf disimpan dengan scrypt dan salt acak, tidak dikembalikan oleh API, dan wajib minimal 12 karakter.

| Role | Akses |
| --- | --- |
| Administrator | Semua modul, akun staf, publikasi, pendaftar |
| Humas | Berita, penelitian, halaman, media, event, pengumuman, galeri, video, kontak, pendaftar, riwayat |
| Editor | Berita draft/tinjauan, penelitian, media, riwayat untuk modul yang diizinkan |

Mengubah role, password, atau status akun membatalkan sesi akun tersebut. Akun yang sedang dipakai tidak bisa menonaktifkan dirinya atau mengganti role sendiri. Akun administrator awal tetap tersedia sebagai akses pemulihan.

## Berita

Status baru: `draft`, `review`, dan `published`. Editor mengirim ke tinjauan; humas/admin dapat mempublikasikan. Tanggal publikasi di masa depan menunda tayangan publik. Draft, artikel terjadwal, dan arsip tidak muncul di daftar berita, homepage, galeri, sitemap, maupun pencarian.

Preview tersimpan tersedia di `/admin/news/preview/[id]`. Form editor berita lama tersedia di `/admin/news/create`, dan daftar berita memakai pengelolaan arsip/versi yang baru. HTML konten difilter sebelum ditampilkan.

## Penelitian dan halaman

Modul penelitian tersedia di `/admin/manage/research`, termasuk abstrak, peneliti, tanggal publikasi, gambar, dan URL PDF. Detail publik tersedia di `/penelitian/[slug]`.

Modul halaman tersedia di `/admin/manage/pages`. Slug `profil`, `sejarah`, dan `visi-misi` mengganti konten pada URL yang sudah ada ketika dipublikasikan. Sebelum ada penggantian, desain dan konten lama tetap ditampilkan. Halaman tambahan tersedia di `/halaman/[slug]`. Konten dapat ditulis dengan editor rich text.

## Calon mahasiswa

Formulir publik kini menyimpan data pada tabel pendaftar khusus, bukan Kontak. Admin/humas dapat mencari, memfilter status, mencatat tindak lanjut, mengarsipkan, memulihkan, dan mengekspor CSV di `/admin/manage/applicants`.

Ini pengelolaan formulir minat/pendaftaran website. Pembayaran, ujian seleksi, dan portal akun calon mahasiswa belum menjadi bagian fitur ini. Status diterima/ditolak merupakan catatan internal, tidak dikirim otomatis ke pendaftar.

CSV mengikuti filter yang dipilih, dengan batas 10.000 baris per ekspor dan perlindungan formula spreadsheet.

## Media dan riwayat

Upload gambar otomatis masuk perpustakaan media. Tombol **Pilih dari Media** pada form upload memungkinkan penggunaan ulang. Script `db:import-media` mengindeks gambar yang sudah dipakai pada konten lama tanpa mengubah konten tersebut.

Versi sebelum perubahan dan arsip tersimpan untuk berita, penelitian, halaman, pendaftar, dan media. Pemulihan versi juga menyimpan keadaan sebelumnya. Akun staf dinonaktifkan, bukan dihapus; hash password tidak disimpan dalam riwayat.

Aktivitas perubahan modul lama dicatat setelah berhasil. Riwayat versi/pemulihan hanya berlaku untuk kelima modul yang disebutkan di atas, bukan penghapusan lama pada fakultas, prodi, event, dan modul lainnya.

## Pencarian

Tombol pencarian tersedia pada header. `/cari` mencari berita publik, pengumuman aktif, prodi, fakultas, jurnal aktif, penelitian, event, dan halaman yang dikelola. Pilih jenis hasil untuk pagination. Konten halaman lama yang masih ditulis langsung dalam source belum masuk indeks sampai dibuat melalui modul Halaman Website.

## Pengujian

`npm run test:features` menguji fitur backend di dalam transaksi PostgreSQL yang selalu dibatalkan. Tidak ada record uji yang dipertahankan. `npm run test:features:ui` menjalankan Edge headless pada `http://localhost:3000` (atau `TEST_BASE_URL`), memakai akun administrator dari environment, dan tidak mengirim perubahan konten.

Pada Windows, hentikan server development sebelum menjalankan `prisma generate` atau build agar file engine Prisma tidak terkunci. Pengujian UI production dapat memakai `npm run build:standalone` lalu `npm start`.
