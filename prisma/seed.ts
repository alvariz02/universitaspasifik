import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database with Universitas Pasifik Morotai data...')

  // Seed Faculties
  console.log('📚 Creating faculties...')
  const facultyPerikanan = await prisma.faculty.create({
    data: {
      name: 'Fakultas Perikanan dan Kelautan',
      slug: 'fakultas-perikanan-dan-kelautan',
      description: 'Mengembangkan sumber daya kelautan dan perikanan untuk kesejahteraan masyarakat pesisir',
      deanName: 'Prof. Dr. Ir. H. Budi Santoso, M.Si',
      location: 'Kampus Utama Unipas, Morotai',
      establishedYear: 2013,
      imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
      contactEmail: 'faperikan@unipas.ac.id',
      contactPhone: '(0921) 123456',
      websiteUrl: 'https://faperikan.unipas.ac.id'
    }
  })

  const facultyMipa = await prisma.faculty.create({
    data: {
      name: 'Fakultas Matematika dan Ilmu Pengetahuan Alam',
      slug: 'fakultas-matematika-dan-ilmu-pengetahuan-alam',
      description: 'Mengembangkan penalaran ilmiah dan analisis kuantitatif',
      deanName: 'Dr. Siti Nurjanah, M.Si',
      location: 'Kampus Utama Unipas, Morotai',
      establishedYear: 2013,
      imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800',
      contactEmail: 'fmipa@unipas.ac.id',
      contactPhone: '(0921) 123457',
      websiteUrl: 'https://fmipa.unipas.ac.id'
    }
  })

  const facultyTeknik = await prisma.faculty.create({
    data: {
      name: 'Fakultas Teknik',
      slug: 'fakultas-teknik',
      description: 'Menciptakan solusi teknologi untuk pembangunan berkelanjutan',
      deanName: 'Prof. Ir. Ahmad Fauzi, M.T., Ph.D',
      location: 'Kampus Utama Unipas, Morotai',
      establishedYear: 2013,
      imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800',
      contactEmail: 'ft@unipas.ac.id',
      contactPhone: '(0921) 123458',
      websiteUrl: 'https://ft.unipas.ac.id'
    }
  })

  const facultyEkonomi = await prisma.faculty.create({
    data: {
      name: 'Fakultas Ekonomi',
      slug: 'fakultas-ekonomi',
      description: 'Membentuk profesional di bidang ekonomi dan bisnis',
      deanName: 'Dr. Ahmad Wijaya, S.E., M.M',
      location: 'Kampus Utama Unipas, Morotai',
      establishedYear: 2013,
      imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
      contactEmail: 'fe@unipas.ac.id',
      contactPhone: '(0921) 123459',
      websiteUrl: 'https://fe.unipas.ac.id'
    }
  })

  const facultyFisip = await prisma.faculty.create({
    data: {
      name: 'Fakultas Ilmu Sosial dan Ilmu Politik',
      slug: 'fakultas-ilmu-sosial-dan-ilmu-politik',
      description: 'Mengkaji dinamika sosial dan politik masyarakat',
      deanName: 'Dr. Bambang Sutrisno, S.Sos., M.Si',
      location: 'Kampus Utama Unipas, Morotai',
      establishedYear: 2013,
      imageUrl: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800',
      contactEmail: 'fisip@unipas.ac.id',
      contactPhone: '(0921) 123460',
      websiteUrl: 'https://fisip.unipas.ac.id'
    }
  })

  const facultyFkip = await prisma.faculty.create({
    data: {
      name: 'Fakultas Keguruan dan Ilmu Pendidikan',
      slug: 'fakultas-keguruan-dan-ilmu-pendidikan',
      description: 'Mencetak pendidik profesional dan berkualitas',
      deanName: 'Prof. Dr. Ratna Dewi, M.Pd',
      location: 'Kampus Utama Unipas, Morotai',
      establishedYear: 2013,
      imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800',
      contactEmail: 'fkip@unipas.ac.id',
      contactPhone: '(0921) 123461',
      websiteUrl: 'https://fkip.unipas.ac.id'
    }
  })

  // Seed Departments
  console.log('🎓 Creating departments...')
  await Promise.all([
    // Fakultas Perikanan dan Kelautan
    prisma.department.create({
      data: {
        name: 'Ilmu Kelautan',
        slug: 'ilmu-kelautan',
        degreeLevel: 'S1',
        description: 'Studi tentang ekosistem laut dan sumber daya kelautan',
        accreditation: 'B',
        quota: 60,
        facultyId: facultyPerikanan.id
      }
    }),
    prisma.department.create({
      data: {
        name: 'Teknologi Hasil Perikanan',
        slug: 'teknologi-hasil-perikanan',
        degreeLevel: 'S1',
        description: 'Pengolahan dan pengawasan hasil perikanan',
        accreditation: 'B',
        quota: 50,
        facultyId: facultyPerikanan.id
      }
    }),

    // Fakultas Matematika dan Ilmu Pengetahuan Alam
    prisma.department.create({
      data: {
        name: 'Matematika',
        slug: 'matematika',
        degreeLevel: 'S1',
        description: 'Studi tentang struktur, ruang, dan perubahan',
        accreditation: 'B',
        quota: 40,
        facultyId: facultyMipa.id
      }
    }),

    // Fakultas Teknik
    prisma.department.create({
      data: {
        name: 'Teknik Industri',
        slug: 'teknik-industri',
        degreeLevel: 'S1',
        description: 'Optimalisasi sistem produksi dan manufaktur',
        accreditation: 'B',
        quota: 50,
        facultyId: facultyTeknik.id
      }
    }),
    prisma.department.create({
      data: {
        name: 'Teknik Informatika',
        slug: 'teknik-informatika',
        degreeLevel: 'S1',
        description: 'Pengembangan perangkat lunak dan sistem informasi',
        accreditation: 'B',
        quota: 60,
        facultyId: facultyTeknik.id
      }
    }),
    prisma.department.create({
      data: {
        name: 'Teknik Lingkungan',
        slug: 'teknik-lingkungan',
        degreeLevel: 'S1',
        description: 'Pengelolaan sumber daya lingkungan',
        accreditation: 'B',
        quota: 40,
        facultyId: facultyTeknik.id
      }
    }),
    prisma.department.create({
      data: {
        name: 'Teknik Sipil',
        slug: 'teknik-sipil',
        degreeLevel: 'S1',
        description: 'Perencanaan dan perancangan infrastruktur',
        accreditation: 'B',
        quota: 50,
        facultyId: facultyTeknik.id
      }
    }),

    // Fakultas Ekonomi
    prisma.department.create({
      data: {
        name: 'Akuntansi',
        slug: 'akuntansi',
        degreeLevel: 'S1',
        description: 'Studi tentang pelaporan dan analisis keuangan',
        accreditation: 'B',
        quota: 60,
        facultyId: facultyEkonomi.id
      }
    }),

    // Fakultas Ilmu Sosial dan Ilmu Politik
    prisma.department.create({
      data: {
        name: 'Ilmu Administrasi Negara',
        slug: 'ilmu-administrasi-negara',
        degreeLevel: 'S1',
        description: 'Manajemen pemerintahan dan birokrasi',
        accreditation: 'B',
        quota: 50,
        facultyId: facultyFisip.id
      }
    }),

    // Fakultas Keguruan dan Ilmu Pendidikan
    prisma.department.create({
      data: {
        name: 'Pendidikan Bahasa Inggris',
        slug: 'pendidikan-bahasa-inggris',
        degreeLevel: 'S1',
        description: 'Pendidikan guru bahasa Inggris',
        accreditation: 'B',
        quota: 40,
        facultyId: facultyFkip.id
      }
    }),
    prisma.department.create({
      data: {
        name: 'Pendidikan Guru Sekolah Dasar',
        slug: 'pendidikan-guru-sekolah-dasar',
        degreeLevel: 'S1',
        description: 'Pendidikan guru untuk jenjang SD',
        accreditation: 'B',
        quota: 50,
        facultyId: facultyFkip.id
      }
    })
  ])

  // Seed Staff (Dosen)
  console.log('👨‍🏫 Creating staff...')
  const deanPerikanan = await prisma.staff.create({
    data: {
      name: 'Prof. Dr. Ir. H. Budi Santoso, M.Si',
      slug: 'prof-dr-ir-h-budi-santoso-msi',
      position: 'Dekan',
      facultyId: facultyPerikanan.id,
      email: 'dean.faperikan@unipas.ac.id',
      phone: '(0921) 123456',
      photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      bio: 'Profesor di bidang teknologi perikanan dengan pengalaman lebih dari 20 tahun.',
      researchInterest: 'Teknologi Pengolahan Hasil Perikanan, Akuakultur',
      googleScholarUrl: 'https://scholar.google.com/citations?user=example'
    }
  })

  const deanMipa = await prisma.staff.create({
    data: {
      name: 'Dr. Siti Nurjanah, M.Si',
      slug: 'dr-siti-nurjanah-msi',
      position: 'Dekan',
      facultyId: facultyMipa.id,
      email: 'dean.fmipa@unipas.ac.id',
      phone: '(0921) 123457',
      photoUrl: 'https://images.unsplash.com/photo-1494790108755-2616b332c5ca?w=400',
      bio: 'Doktor di bidang matematika terapan dengan fokus pada pemodelan matematis.',
      researchInterest: 'Matematika Terapan, Statistika, Pemodelan',
      googleScholarUrl: 'https://scholar.google.com/citations?user=example2'
    }
  })

  const deanTeknik = await prisma.staff.create({
    data: {
      name: 'Prof. Ir. Ahmad Fauzi, M.T., Ph.D',
      slug: 'prof-ir-ahmad-fauzi-mt-phd',
      position: 'Dekan',
      facultyId: facultyTeknik.id,
      email: 'dean.ft@unipas.ac.id',
      phone: '(0921) 123458',
      photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
      bio: 'Profesor teknik dengan spesialisasi dalam rekayasa struktur dan material.',
      researchInterest: 'Teknik Sipil, Material Konstruksi, Rekayasa Struktur',
      googleScholarUrl: 'https://scholar.google.com/citations?user=example3'
    }
  })

  const deanEkonomi = await prisma.staff.create({
    data: {
      name: 'Dr. Ahmad Wijaya, S.E., M.M',
      slug: 'dr-ahmad-wijaya-se-mm',
      position: 'Dekan',
      facultyId: facultyEkonomi.id,
      email: 'dean.fe@unipas.ac.id',
      phone: '(0921) 123459',
      photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
      bio: 'Doktor ekonomi dengan keahlian dalam manajemen keuangan dan perbankan.',
      researchInterest: 'Manajemen Keuangan, Akuntansi, Perbankan',
      googleScholarUrl: 'https://scholar.google.com/citations?user=example4'
    }
  })

  const deanFisip = await prisma.staff.create({
    data: {
      name: 'Dr. Bambang Sutrisno, S.Sos., M.Si',
      slug: 'dr-bambang-sutrisno-ssos-msi',
      position: 'Dekan',
      facultyId: facultyFisip.id,
      email: 'dean.fisip@unipas.ac.id',
      phone: '(0921) 123460',
      photoUrl: 'https://images.unsplash.com/photo-1557862921-37829c790f19?w=400',
      bio: 'Doktor ilmu sosial dengan fokus pada administrasi publik dan kebijakan.',
      researchInterest: 'Ilmu Administrasi, Kebijakan Publik, Manajemen Pemerintahan',
      googleScholarUrl: 'https://scholar.google.com/citations?user=example5'
    }
  })

  const deanFkip = await prisma.staff.create({
    data: {
      name: 'Prof. Dr. Ratna Dewi, M.Pd',
      slug: 'prof-dr-ratna-dewi-mpd',
      position: 'Dekan',
      facultyId: facultyFkip.id,
      email: 'dean.fkip@unipas.ac.id',
      phone: '(0921) 123461',
      photoUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
      bio: 'Profesor pendidikan dengan spesialisasi dalam kurikulum dan pembelajaran.',
      researchInterest: 'Kurikulum, Teknologi Pendidikan, Psikologi Pendidikan',
      googleScholarUrl: 'https://scholar.google.com/citations?user=example6'
    }
  })

  // Create department heads (Kaprodi)
  const departments = await prisma.department.findMany()
  const departmentHeads = await Promise.all([
    prisma.staff.create({
      data: {
        name: 'Dr. Ir. H. Ahmad Rizki, M.Si',
        slug: 'dr-ir-h-ahmad-rizki-msi',
        position: 'Ketua Program Studi',
        departmentId: departments.find(d => d.name === 'Ilmu Kelautan')?.id,
        facultyId: facultyPerikanan.id,
        email: 'kaprodi.ilmu-kelautan@unipas.ac.id',
        phone: '(0921) 123462',
        photoUrl: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=400',
        bio: 'Doktor ilmu kelautan dengan spesialisasi oseanografi.',
        researchInterest: 'Oseanografi, Ekosistem Laut, Konservasi Kelautan'
      }
    }),
    prisma.staff.create({
      data: {
        name: 'Dr. Ir. Siti Aminah, M.P',
        slug: 'dr-ir-siti-aminah-mp',
        position: 'Ketua Program Studi',
        departmentId: departments.find(d => d.name === 'Teknologi Hasil Perikanan')?.id,
        facultyId: facultyPerikanan.id,
        email: 'kaprodi.thp@unipas.ac.id',
        phone: '(0921) 123463',
        photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
        bio: 'Doktor teknologi pangan dengan fokus pada pengolahan hasil perikanan.',
        researchInterest: 'Teknologi Pangan, Pengolahan Hasil Perikanan, Keamanan Pangan'
      }
    }),
    prisma.staff.create({
      data: {
        name: 'Dr. Budi Santoso, M.Si',
        slug: 'dr-budi-santoso-msi',
        position: 'Ketua Program Studi',
        departmentId: departments.find(d => d.name === 'Matematika')?.id,
        facultyId: facultyMipa.id,
        email: 'kaprodi.matematika@unipas.ac.id',
        phone: '(0921) 123464',
        photoUrl: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=400',
        bio: 'Doktor matematika dengan spesialisasi aljabar dan teori bilangan.',
        researchInterest: 'Aljabar, Teori Bilangan, Matematika Diskrit'
      }
    }),
    prisma.staff.create({
      data: {
        name: 'Dr. Ir. Hendra Kusuma, M.T.',
        slug: 'dr-ir-hendra-kusuma-mt',
        position: 'Ketua Program Studi',
        departmentId: departments.find(d => d.name === 'Teknik Industri')?.id,
        facultyId: facultyTeknik.id,
        email: 'kaprodi.ti@unipas.ac.id',
        phone: '(0921) 123465',
        photoUrl: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400',
        bio: 'Doktor teknik industri dengan fokus pada optimasi sistem produksi.',
        researchInterest: 'Optimasi, Manajemen Operasional, Sistem Produksi'
      }
    }),
    prisma.staff.create({
      data: {
        name: 'Dr. Rina Wijaya, M.Kom',
        slug: 'dr-rina-wijaya-mkom',
        position: 'Ketua Program Studi',
        departmentId: departments.find(d => d.name === 'Teknik Informatika')?.id,
        facultyId: facultyTeknik.id,
        email: 'kaprodi.tif@unipas.ac.id',
        phone: '(0921) 123466',
        photoUrl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400',
        bio: 'Doktor ilmu komputer dengan spesialisasi kecerdasan buatan.',
        researchInterest: 'Kecerdasan Buatan, Machine Learning, Data Science'
      }
    }),
    prisma.staff.create({
      data: {
        name: 'Dr. Ir. Ahmad Hidayat, M.T.',
        slug: 'dr-ir-ahmad-hidayat-mt',
        position: 'Ketua Program Studi',
        departmentId: departments.find(d => d.name === 'Teknik Lingkungan')?.id,
        facultyId: facultyTeknik.id,
        email: 'kaprodi.tl@unipas.ac.id',
        phone: '(0921) 123467',
        photoUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400',
        bio: 'Doktor teknik lingkungan dengan fokus pada pengelolaan sumber daya air.',
        researchInterest: 'Teknik Lingkungan, Pengelolaan Air, Limbah Industri'
      }
    }),
    prisma.staff.create({
      data: {
        name: 'Dr. Ir. Susanto, M.T.',
        slug: 'dr-ir-susanto-mt',
        position: 'Ketua Program Studi',
        departmentId: departments.find(d => d.name === 'Teknik Sipil')?.id,
        facultyId: facultyTeknik.id,
        email: 'kaprodi.ts@unipas.ac.id',
        phone: '(0921) 123468',
        photoUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
        bio: 'Doktor teknik sipil dengan spesialisasi rekayasa struktur.',
        researchInterest: 'Rekayasa Struktur, Material Konstruksi, Gempa'
      }
    }),
    prisma.staff.create({
      data: {
        name: 'Dr. Ratna Sari, S.E., M.Ak',
        slug: 'dr-ratna-sari-se-mak',
        position: 'Ketua Program Studi',
        departmentId: departments.find(d => d.name === 'Akuntansi')?.id,
        facultyId: facultyEkonomi.id,
        email: 'kaprodi.akuntansi@unipas.ac.id',
        phone: '(0921) 123469',
        photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
        bio: 'Doktor akuntansi dengan fokus pada akuntansi keuangan dan perpajakan.',
        researchInterest: 'Akuntansi Keuangan, Perpajakan, Audit'
      }
    }),
    prisma.staff.create({
      data: {
        name: 'Dr. Budi Prasetyo, S.Sos., M.Si',
        slug: 'dr-budi-prasetyo-ssos-msi',
        position: 'Ketua Program Studi',
        departmentId: departments.find(d => d.name === 'Ilmu Administrasi Negara')?.id,
        facultyId: facultyFisip.id,
        email: 'kaprodi.ian@unipas.ac.id',
        phone: '(0921) 123470',
        photoUrl: 'https://images.unsplash.com/photo-1557862921-37829c790f19?w=400',
        bio: 'Doktor administrasi publik dengan fokus pada reformasi birokrasi.',
        researchInterest: 'Administrasi Publik, Reformasi Birokrasi, Kebijakan Publik'
      }
    }),
    prisma.staff.create({
      data: {
        name: 'Dr. Sarah Amanda, M.Pd',
        slug: 'dr-sarah-amanda-mpd',
        position: 'Ketua Program Studi',
        departmentId: departments.find(d => d.name === 'Pendidikan Bahasa Inggris')?.id,
        facultyId: facultyFkip.id,
        email: 'kaprodi.pbi@unipas.ac.id',
        phone: '(0921) 123471',
        photoUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
        bio: 'Doktor pendidikan bahasa dengan spesialisasi pengajaran bahasa Inggris.',
        researchInterest: 'Pengajaran Bahasa Inggris, Linguistik, Literasi'
      }
    }),
    prisma.staff.create({
      data: {
        name: 'Dr. Indah Permata, M.Pd',
        slug: 'dr-indah-permata-mpd',
        position: 'Ketua Program Studi',
        departmentId: departments.find(d => d.name === 'Pendidikan Guru Sekolah Dasar')?.id,
        facultyId: facultyFkip.id,
        email: 'kaprodi.pgsd@unipas.ac.id',
        phone: '(0921) 123472',
        photoUrl: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400',
        bio: 'Doktor pendidikan dasar dengan fokus pada pembelajaran anak usia dini.',
        researchInterest: 'Pendidikan Dasar, Psikologi Anak, Kurikulum SD'
      }
    })
  ])

  // Seed News
  console.log('📰 Creating news...')
  await Promise.all([
    prisma.news.create({
      data: {
        title: 'Unipas Raih Peringkat Terbaik dalam Penelitian Kelautan',
        slug: 'unipas-raih-peringkat-terbaik-penelitian-kelautan',
        excerpt: 'Universitas Pasifik Morotai berhasil meraih peringkat terbaik dalam kategori penelitian kelautan tingkat nasional',
        content: `Universitas Pasifik Morotai (Unipas) berhasil meraih peringkat terbaik dalam kategori penelitian kelautan tingkat nasional. Prestasi ini diraih berkat kerja keras seluruh dosen dan peneliti dalam mengembangkan inovasi di bidang kelautan dan perikanan.`,
        imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
        category: 'penelitian',
        authorName: 'Tim Humas Unipas',
        publishedDate: new Date('2024-01-15'),
        viewCount: 1250,
        isFeatured: true
      }
    }),
    prisma.news.create({
      data: {
        title: 'Mahasiswa Unipas Juara 1 Lomba Inovasi Maritim',
        slug: 'mahasiswa-unipas-juara-1-lomba-inovasi-maritim',
        excerpt: 'Tim mahasiswa Fakultas Teknik Unipas berhasil meraih juara 1 dalam Lomba Inovasi Maritim Tingkat Nasional',
        content: `Tim mahasiswa Fakultas Teknik Universitas Pasifik Morotai berhasil meraih juara 1 dalam Lomba Inovasi Maritim Tingkat Nasional yang diselenggarakan di Jakarta.`,
        imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800',
        category: 'prestasi',
        authorName: 'Tim Humas Unipas',
        publishedDate: new Date('2024-01-10'),
        viewCount: 890,
        isFeatured: false
      }
    })
  ])

  // Seed Events
  console.log('📅 Creating events...')
  await Promise.all([
    prisma.event.create({
      data: {
        title: 'Seminar Nasional Kelautan 2024',
        slug: 'seminar-nasional-kelautan-2024',
        description: 'Seminar nasional dengan tema "Inovasi Teknologi untuk Keberlanjutan Sumber Daya Kelautan"',
        eventDate: new Date('2024-02-15T09:00:00Z'),
        endDate: new Date('2024-02-15T17:00:00Z'),
        location: 'Auditorium Utama Unipas',
        imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
        organizer: 'Fakultas Perikanan dan Kelautan',
        contactEmail: 'faperikan@unipas.ac.id',
        registrationUrl: 'https://unipas.ac.id/seminar-kelautan-2024',
        isFeatured: true
      }
    }),
    prisma.event.create({
      data: {
        title: 'Wisuda Sarjana Periode Februari 2024',
        slug: 'wisuda-sarjana-februari-2024',
        description: 'Wisuda sarjana Universitas Pasifik Morotai periode Februari 2024',
        eventDate: new Date('2024-02-20T08:00:00Z'),
        endDate: new Date('2024-02-20T12:00:00Z'),
        location: 'Auditorium Utama Unipas',
        imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800',
        organizer: 'Universitas Pasifik Morotai',
        contactEmail: 'wisuda@unipas.ac.id',
        isFeatured: false
      }
    })
  ])

  // Seed Hero Sliders
  console.log('🎨 Creating hero sliders...')
  await Promise.all([
    prisma.heroSlider.create({
      data: {
        title: 'Selamat Datang di Universitas Pasifik Morotai',
        subtitle: 'Unggul dalam Ilmu Pengetahuan, Teknologi, dan Seni di Kawasan Pasifik',
        imageUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1920',
        linkText: 'Jalani Pendaftaran',
        linkUrl: '/penerimaan',
        isActive: true,
        orderPosition: 1
      }
    }),
    prisma.heroSlider.create({
      data: {
        title: 'Fakultas Perikanan dan Kelautan',
        subtitle: 'Pusat Unggulan Penelitian Kelautan di Indonesia Timur',
        imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1920',
        linkText: 'Pelajari Lebih Lanjut',
        linkUrl: '/fakultas',
        isActive: true,
        orderPosition: 2
      }
    }),
    prisma.heroSlider.create({
      data: {
        title: 'Penerimaan Mahasiswa Baru 2024',
        subtitle: 'Daftarkan diri Anda sekarang juga',
        imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1920',
        linkText: 'Daftar Sekarang',
        linkUrl: '/penerimaan',
        isActive: true,
        orderPosition: 3
      }
    })
  ])

  // Seed Videos
  console.log('🎥 Creating videos...')
  
  await Promise.all([
    prisma.video.create({
      data: {
        title: 'Upacara Wisuda Universitas Pasifik Morotai 2024',
        description: 'Dokumentasi upacara wisuda periode I tahun 2024 Universitas Pasifik Morotai dengan kelulusan 250 mahasiswa dari berbagai fakultas.',
        youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        youtubeId: 'dQw4w9WgXcQ',
        thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
        category: 'wisuda',
        isFeatured: true,
        publishedAt: new Date('2024-06-15'),
        viewCount: 1250
      }
    }),
    prisma.video.create({
      data: {
        title: 'Seminar Nasional Kelautan dan Perikanan 2024',
        description: 'Seminar nasional dengan tema "Inovasi Teknologi Kelautan untuk Pembangunan Berkelanjutan" yang diselenggarakan oleh Fakultas Perikanan dan Kelautan.',
        youtubeUrl: 'https://www.youtube.com/watch?v=9bZkp7q19f0',
        youtubeId: '9bZkp7q19f0',
        thumbnail: 'https://img.youtube.com/vi/9bZkp7q19f0/maxresdefault.jpg',
        category: 'seminar',
        isFeatured: true,
        publishedAt: new Date('2024-05-20'),
        viewCount: 890
      }
    }),
    prisma.video.create({
      data: {
        title: 'Festival Seni dan Budaya Maluku Utara',
        description: 'Pertunjukan seni dan budaya tradisional Maluku Utara yang diselenggarakan oleh mahasiswa Universitas Pasifik Morotai.',
        youtubeUrl: 'https://www.youtube.com/watch?v=JGwWNGJdvx8',
        youtubeId: 'JGwWNGJdvx8',
        thumbnail: 'https://img.youtube.com/vi/JGwWNGJdvx8/maxresdefault.jpg',
        category: 'seni',
        isFeatured: false,
        publishedAt: new Date('2024-04-10'),
        viewCount: 567
      }
    }),
    prisma.video.create({
      data: {
        title: 'Kompetisi Olahraga Antar Fakultas 2024',
        description: 'Highlight pertandingan sepak bola final antara Fakultas Perikanan vs Fakultas Teknik dalam kompetisi olahraga antar fakultas.',
        youtubeUrl: 'https://www.youtube.com/watch?v=kJQP7kiw5Fk',
        youtubeId: 'kJQP7kiw5Fk',
        thumbnail: 'https://img.youtube.com/vi/kJQP7kiw5Fk/maxresdefault.jpg',
        category: 'olahraga',
        isFeatured: false,
        publishedAt: new Date('2024-03-25'),
        viewCount: 423
      }
    }),
    prisma.video.create({
      data: {
        title: 'Kegiatan Pengabdian Masyarakat di Pulau Morotai',
        description: 'Dokumentasi kegiatan pengabdian masyarakat mahasiswa dan dosen dalam program pemberdayaan nelayan lokal.',
        youtubeUrl: 'https://www.youtube.com/watch?v=L_jWHffIx5E',
        youtubeId: 'L_jWHffIx5E',
        thumbnail: 'https://img.youtube.com/vi/L_jWHffIx5E/maxresdefault.jpg',
        category: 'kegiatan',
        isFeatured: true,
        publishedAt: new Date('2024-02-14'),
        viewCount: 1100
      }
    }),
    prisma.video.create({
      data: {
        title: 'Workshop Teknologi Budidaya Laut Modern',
        description: 'Pelatihan teknologi budidaya laut modern untuk mahasiswa dan masyarakat pesisir Morotai.',
        youtubeUrl: 'https://www.youtube.com/watch?v=fJ9rUzIMcZQ',
        youtubeId: 'fJ9rUzIMcZQ',
        thumbnail: 'https://img.youtube.com/vi/fJ9rUzIMcZQ/maxresdefault.jpg',
        category: 'akademik',
        isFeatured: false,
        publishedAt: new Date('2024-01-30'),
        viewCount: 345
      }
    })
  ])

  // Seed Journals
  console.log('📚 Creating journals...')
  
  await Promise.all([
    prisma.journal.create({
      data: {
        title: 'Analisis Kualitas Air Laut di Perairan Morotai untuk Budidaya Rumput Laut',
        slug: 'analisis-kualitas-air-laut-perairan-morotai-budidaya-rumput-laut',
        abstract: 'Penelitian ini bertujuan untuk menganalisis kualitas air laut di perairan Morotai sebagai dasar pengembangan budidaya rumput laut. Parameter yang diukur meliputi suhu, salinitas, pH, oksigen terlarut, dan kandungan nutrien. Hasil penelitian menunjukkan bahwa perairan Morotai memiliki kualitas air yang baik untuk budidaya rumput laut dengan nilai parameter yang sesuai standar.',
        authors: 'Dr. Ahmad Fauzi, M.Si., Prof. Dr. Siti Nurhaliza, M.Sc., Dr. Budi Santoso, M.Mar',
        authorAffiliation: 'Fakultas Perikanan dan Kelautan, Universitas Pasifik Morotai',
        keywords: 'kualitas air, rumput laut, budidaya, Morotai, perikanan',
        category: 'perikanan',
        subject: 'Budidaya Perairan',
        language: 'id',
        pages: '1-12',
        volume: '5',
        issue: '2',
        year: 2024,
        publishedDate: new Date('2024-06-15'),
        doi: '10.12345/jpk.2024.5.2.001',
        issn: '2580-1234',
        isOpenAccess: true,
        isPeerReviewed: true,
        isFeatured: true,
        facultyId: facultyPerikanan.id,
        viewCount: 245,
        downloadCount: 89
      }
    }),
    prisma.journal.create({
      data: {
        title: 'Implementasi Teknologi IoT dalam Monitoring Sistem Akuakultur Berkelanjutan',
        slug: 'implementasi-teknologi-iot-monitoring-sistem-akuakultur-berkelanjutan',
        abstract: 'Internet of Things (IoT) menjadi solusi inovatif dalam monitoring sistem akuakultur modern. Penelitian ini mengembangkan sistem monitoring berbasis IoT untuk mengoptimalkan produktivitas budidaya ikan dengan monitoring real-time parameter kualitas air, pemberian pakan otomatis, dan sistem peringatan dini.',
        authors: 'Dr. Eng. Rizki Pratama, S.T., M.T., Dr. Maya Sari, S.Kom., M.Kom.',
        authorAffiliation: 'Fakultas Teknik, Universitas Pasifik Morotai',
        keywords: 'IoT, akuakultur, monitoring, teknologi, otomasi',
        category: 'teknik',
        subject: 'Teknik Informatika',
        language: 'id',
        pages: '15-28',
        volume: '3',
        issue: '1',
        year: 2024,
        publishedDate: new Date('2024-05-20'),
        doi: '10.12345/jti.2024.3.1.002',
        issn: '2580-5678',
        isOpenAccess: true,
        isPeerReviewed: true,
        isFeatured: true,
        facultyId: facultyTeknik.id,
        viewCount: 189,
        downloadCount: 67
      }
    }),
    prisma.journal.create({
      data: {
        title: 'Strategi Pengembangan Ekonomi Kreatif Berbasis Kearifan Lokal di Maluku Utara',
        slug: 'strategi-pengembangan-ekonomi-kreatif-kearifan-lokal-maluku-utara',
        abstract: 'Ekonomi kreatif berbasis kearifan lokal memiliki potensi besar untuk dikembangkan di Maluku Utara. Penelitian ini menganalisis strategi pengembangan ekonomi kreatif dengan memanfaatkan kearifan lokal masyarakat Maluku Utara, termasuk kerajinan tradisional, kuliner, dan seni budaya.',
        authors: 'Dr. Fatimah Zahra, S.E., M.M., Dr. Hasan Abdullah, S.Sos., M.Si.',
        authorAffiliation: 'Fakultas Ekonomi dan Bisnis, Universitas Pasifik Morotai',
        keywords: 'ekonomi kreatif, kearifan lokal, Maluku Utara, pembangunan ekonomi',
        category: 'ekonomi',
        subject: 'Ekonomi Pembangunan',
        language: 'id',
        pages: '45-62',
        volume: '7',
        issue: '3',
        year: 2024,
        publishedDate: new Date('2024-04-10'),
        doi: '10.12345/jeb.2024.7.3.003',
        issn: '2580-9012',
        isOpenAccess: true,
        isPeerReviewed: true,
        isFeatured: false,
        viewCount: 156,
        downloadCount: 43
      }
    }),
    prisma.journal.create({
      data: {
        title: 'Penerapan Model Pembelajaran Berbasis Proyek untuk Meningkatkan Kreativitas Mahasiswa',
        slug: 'penerapan-model-pembelajaran-berbasis-proyek-kreativitas-mahasiswa',
        abstract: 'Model pembelajaran berbasis proyek (Project-Based Learning) terbukti efektif dalam meningkatkan kreativitas dan kemampuan problem solving mahasiswa. Penelitian eksperimen ini dilakukan pada mahasiswa Fakultas Keguruan dan Ilmu Pendidikan dengan menggunakan desain quasi-experimental.',
        authors: 'Dr. Nurul Hidayah, M.Pd., Dr. Agus Setiawan, M.Pd.',
        authorAffiliation: 'Fakultas Keguruan dan Ilmu Pendidikan, Universitas Pasifik Morotai',
        keywords: 'pembelajaran berbasis proyek, kreativitas, pendidikan, mahasiswa',
        category: 'pendidikan',
        subject: 'Teknologi Pendidikan',
        language: 'id',
        pages: '78-95',
        volume: '4',
        issue: '2',
        year: 2024,
        publishedDate: new Date('2024-03-15'),
        doi: '10.12345/jkip.2024.4.2.004',
        issn: '2580-3456',
        isOpenAccess: true,
        isPeerReviewed: true,
        isFeatured: false,
        viewCount: 134,
        downloadCount: 52
      }
    })
  ])

  console.log('✅ Database seeding completed successfully!')
  console.log(`📊 Created ${6} faculties, ${11} departments, ${2} news, ${2} events, ${3} hero sliders, ${6} videos, and ${4} journals`)
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
