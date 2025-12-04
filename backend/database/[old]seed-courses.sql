-- =====================================================
-- DELTA INDONESIA - K3 TRAINING COURSES
-- Only insert if not already exists
-- =====================================================

-- Check if courses already exist, if not insert
INSERT INTO courses (
  code, name, category, certification, duration_value, duration_unit,
  description, objectives, prerequisites, price_regular, currency, featured, status
) 
SELECT 
  code, name, category, certification, duration_value, duration_unit,
  description, objectives, prerequisites, price_regular, currency, featured, status
FROM (
  VALUES
    ('KEM-AK3U-001', 'Ahli K3 Umum', 'kemnaker', 'Kementerian Ketenagakerjaan RI', 12, 'days',
     'Pelatihan Ahli Keselamatan dan Kesehatan Kerja Umum yang memberikan pengetahuan komprehensif tentang manajemen K3 di tempat kerja.',
     ARRAY['Memahami regulasi K3','Mampu melakukan inspeksi audit K3','Identifikasi bahaya dan penilaian risiko','Menyusun program K3','Investigasi kecelakaan kerja'],
     ARRAY['Pendidikan minimal D3','Pengalaman kerja minimal 2 tahun','Sehat jasmani dan rohani'],
     8500000, 'IDR', TRUE, 'active'),
    
    ('KEM-K3LIS-001', 'K3 Listrik', 'kemnaker', 'Kementerian Ketenagakerjaan RI', 6, 'days',
     'Pelatihan K3 bidang Listrik untuk teknisi listrik yang bekerja dengan instalasi dan peralatan listrik.',
     ARRAY['Dasar-dasar keselamatan kelistrikan','Identifikasi bahaya listrik','Penggunaan APD listrik','Prosedur lockout tagout','Pertolongan pertama kecelakaan listrik'],
     ARRAY['Teknisi listrik atau bekerja di bidang kelistrikan','Pendidikan minimal SMK Teknik Listrik','Pengalaman kerja di bidang listrik'],
     6500000, 'IDR', TRUE, 'active'),
    
    ('KEM-K3PKT-001', 'K3 Pekerjaan Pada Ketinggian', 'kemnaker', 'Kementerian Ketenagakerjaan RI', 3, 'days',
     'Pelatihan khusus untuk pekerja yang melakukan pekerjaan pada ketinggian dengan alat pelindung jatuh dan teknik rescue.',
     ARRAY['Regulasi bekerja di ketinggian','Penggunaan full body harness','Sistem penyelamatan','Inspeksi alat pelindung jatuh','Rescue pada ketinggian'],
     ARRAY['Bekerja atau akan bekerja di ketinggian','Sehat jasmani tidak takut ketinggian','Tidak memiliki riwayat penyakit jantung'],
     3500000, 'IDR', TRUE, 'active'),
    
    ('KEM-K3KB-001', 'K3 Kebakaran', 'kemnaker', 'Kementerian Ketenagakerjaan RI', 3, 'days',
     'Pelatihan Penanggulangan Kebakaran untuk membentuk Regu Penanggulangan Kebakaran di perusahaan.',
     ARRAY['Dasar-dasar kebakaran','Penggunaan APAR dan hydrant','Teknik pemadaman api','Sistem proteksi kebakaran','Evakuasi darurat'],
     ARRAY['Ditunjuk sebagai anggota regu kebakaran','Sehat jasmani dan rohani','Minimal pendidikan SMA/SMK'],
     4500000, 'IDR', FALSE, 'active'),
    
    ('KEM-K3PAA-001', 'K3 Pesawat Angkat dan Angkut', 'kemnaker', 'Kementerian Ketenagakerjaan RI', 3, 'days',
     'Pelatihan untuk operator pesawat angkat dan angkut seperti crane, forklift, overhead crane.',
     ARRAY['Jenis-jenis pesawat angkat dan angkut','Operasi dengan aman','Inspeksi pre-operation','Load chart dan kapasitas angkat','Perawatan dasar'],
     ARRAY['Operator atau calon operator PAA','Memiliki SIM A untuk mobile crane','Sehat jasmani terutama penglihatan'],
     4000000, 'IDR', FALSE, 'active'),
    
    ('KEM-K3ELEV-001', 'K3 Elevator dan Eskalator', 'kemnaker', 'Kementerian Ketenagakerjaan RI', 5, 'days',
     'Pelatihan K3 untuk operator dan teknisi elevator serta eskalator.',
     ARRAY['Sistem kerja elevator dan eskalator','Inspeksi berkala','Prosedur emergency rescue','Sistem keselamatan','Troubleshooting dasar'],
     ARRAY['Teknisi elevator/eskalator','Pendidikan minimal SMK Teknik','Pengalaman di bidang elevator'],
     5500000, 'IDR', FALSE, 'active'),
    
    ('KEM-K3KONS-001', 'K3 Konstruksi', 'kemnaker', 'Kementerian Ketenagakerjaan RI', 4, 'days',
     'Pelatihan K3 khusus untuk proyek konstruksi bangunan.',
     ARRAY['Bahaya di proyek konstruksi','Pengelolaan K3 konstruksi','Scaffolding safety','Excavation dan confined space','JSA dan risk assessment'],
     ARRAY['Supervisor atau manager proyek konstruksi','Pendidikan minimal D3','Pengalaman di proyek konstruksi'],
     5000000, 'IDR', FALSE, 'active'),
    
    ('KEM-K3KIMIA-001', 'K3 Kimia', 'kemnaker', 'Kementerian Ketenagakerjaan RI', 5, 'days',
     'Pelatihan K3 bidang Bahan Kimia Berbahaya.',
     ARRAY['Klasifikasi bahan kimia berbahaya','Membaca dan memahami MSDS','Prosedur penanganan B3','Spill response dan emergency','Risk assessment kimia'],
     ARRAY['Bekerja dengan bahan kimia','Pendidikan minimal SMK Kimia','Memahami dasar-dasar kimia'],
     6000000, 'IDR', FALSE, 'active'),
    
    ('KEM-K3PTP-001', 'K3 Pesawat Tenaga dan Produksi', 'kemnaker', 'Kementerian Ketenagakerjaan RI', 4, 'days',
     'Pelatihan untuk operator dan teknisi pesawat tenaga dan produksi seperti boiler, genset, compressor.',
     ARRAY['Sistem kerja pesawat tenaga','Operasi aman','Maintenance dasar','Sistem keselamatan','Identifikasi bahaya'],
     ARRAY['Operator atau teknisi PTP','Pendidikan minimal SMK Teknik','Pengalaman operasi mesin'],
     4500000, 'IDR', FALSE, 'active'),
    
    ('KEM-K3PUBT-001', 'K3 Pesawat Uap dan Bejana Tekanan', 'kemnaker', 'Kementerian Ketenagakerjaan RI', 5, 'days',
     'Pelatihan untuk operator pesawat uap dan bejana tekanan.',
     ARRAY['Sistem pesawat uap','Operasi dengan aman','Inspeksi berkala','Pencegahan ledakan','Emergency procedure'],
     ARRAY['Operator pesawat uap','Pendidikan minimal SMK','Sehat jasmani'],
     5500000, 'IDR', FALSE, 'active'),
    
    ('KEM-K3RT-001', 'K3 Ruang Terbatas', 'kemnaker', 'Kementerian Ketenagakerjaan RI', 3, 'days',
     'Pelatihan untuk pekerja dan petugas penyelamat ruang terbatas.',
     ARRAY['Definisi ruang terbatas','Hazard assessment','Entry procedure','Penggunaan gas detector','Rescue'],
     ARRAY['Bekerja atau akan bekerja di ruang terbatas','Sehat jasmani tidak claustrophobia','Minimal pendidikan SMA'],
     4000000, 'IDR', FALSE, 'active'),
    
    ('KEM-K3LAS-001', 'K3 Pengelasan', 'kemnaker', 'Kementerian Ketenagakerjaan RI', 3, 'days',
     'Pelatihan K3 untuk juru las dan operator mesin las.',
     ARRAY['Bahaya pengelasan','Penggunaan APD las','Prosedur hot work','Fire prevention','Inspeksi peralatan las'],
     ARRAY['Juru las atau operator las','Memiliki kemampuan mengelas','Sehat jasmani terutama penglihatan'],
     3500000, 'IDR', FALSE, 'active'),
    
    ('KEM-K3LING-001', 'K3 Lingkungan Kerja', 'kemnaker', 'Kementerian Ketenagakerjaan RI', 5, 'days',
     'Pelatihan Ahli K3 bidang Lingkungan Kerja.',
     ARRAY['Faktor lingkungan kerja','Pengukuran lingkungan','NAB dan TLV','Metode pengendalian','Program higiene industri'],
     ARRAY['Ahli K3 atau HSE','Pendidikan minimal D3','Pengalaman di bidang K3'],
     7000000, 'IDR', FALSE, 'active'),
    
    ('KEM-K3KESK-001', 'K3 Kesehatan Kerja', 'kemnaker', 'Kementerian Ketenagakerjaan RI', 2, 'days',
     'Pelatihan untuk petugas P3K dan kesehatan kerja.',
     ARRAY['Dasar-dasar P3K','Pertolongan pertama','Penanganan luka dan patah tulang','CPR dan AED','Kegawatdaruratan'],
     ARRAY['Ditunjuk sebagai petugas P3K','Sehat jasmani dan rohani','Minimal pendidikan SMA'],
     3000000, 'IDR', FALSE, 'active'),
    
    ('BNSP-CRANE-001', 'Operator Overhead Crane BNSP', 'bnsp', 'BNSP Badan Nasional Sertifikasi Profesi', 4, 'days',
     'Sertifikasi kompetensi operator overhead crane sesuai SKKNI.',
     ARRAY['Operasi overhead crane','Load chart','Hand signal','Inspeksi harian','Uji kompetensi BNSP'],
     ARRAY['Operator atau calon operator overhead crane','Pengalaman operasi crane diutamakan','Sehat jasmani'],
     5000000, 'IDR', TRUE, 'active'),
    
    ('BNSP-FORK-001', 'Operator Forklift BNSP', 'bnsp', 'BNSP Badan Nasional Sertifikasi Profesi', 3, 'days',
     'Sertifikasi kompetensi operator forklift sesuai SKKNI.',
     ARRAY['Operasi forklift dengan aman','Load capacity dan stability','Prosedur keselamatan','Pre-operation check','Uji kompetensi BNSP'],
     ARRAY['Operator atau calon operator forklift','Memiliki SIM A','Sehat jasmani terutama penglihatan'],
     3500000, 'IDR', TRUE, 'active'),
    
    ('BNSP-SCAFF-001', 'Teknisi Perancah Scaffolding BNSP', 'bnsp', 'BNSP Badan Nasional Sertifikasi Profesi', 4, 'days',
     'Sertifikasi kompetensi teknisi scaffolding.',
     ARRAY['Perencanaan scaffolding','Teknik pemasangan aman','Load calculation','Inspeksi','Uji kompetensi BNSP'],
     ARRAY['Teknisi scaffolding','Pengalaman scaffolding','Tidak takut ketinggian'],
     4500000, 'IDR', FALSE, 'active'),
    
    ('MIGAS-BASIC-001', 'Basic Safety Induction Migas', 'migas', 'MIGAS Indonesia / SKK Migas', 2, 'days',
     'Pelatihan dasar keselamatan untuk pekerja yang akan bekerja di area migas.',
     ARRAY['Budaya safety migas','Identifikasi bahaya','Prosedur emergency','JSA dan permit to work','Penggunaan APD'],
     ARRAY['Akan bekerja di industri migas','Belum memiliki sertifikat migas','Sehat jasmani dan rohani'],
     3500000, 'IDR', TRUE, 'active'),
    
    ('MIGAS-BOSIET-001', 'BOSIET Basic Offshore Safety Induction Emergency Training', 'migas', 'OPITO / MIGAS Indonesia', 5, 'days',
     'Pelatihan safety offshore yang wajib untuk pekerja lepas pantai.',
     ARRAY['Sea survival','Helicopter escape','Firefighting offshore','First aid','Simulasi emergency'],
     ARRAY['Akan bekerja offshore','Sehat jasmani bisa berenang','Tidak memiliki fobia air/ketinggian'],
     12000000, 'IDR', TRUE, 'active'),
    
    ('INH-JSA-001', 'Job Safety Analysis JSA Workshop', 'inhouse', 'Delta Indonesia', 2, 'days',
     'Workshop penyusunan JSA untuk supervisor dan manager.',
     ARRAY['Menyusun JSA','Hazard identification','Risk assessment','Menentukan control measures','Implementasi JSA'],
     ARRAY['Supervisor atau manager','Pengalaman di operasional','Minimal pendidikan D3'],
     4000000, 'IDR', FALSE, 'active'),
    
    ('INH-HIRA-001', 'HIRA Hazard Identification Risk Assessment', 'inhouse', 'Delta Indonesia', 2, 'days',
     'Pelatihan HIRA untuk HSE team.',
     ARRAY['Metodologi HIRA','Hazard identification','Risk rating','Berbagai tools HIRARC HAZOP FMEA','Laporan HIRA'],
     ARRAY['HSE team atau supervisor','Pengalaman di HSE','Minimal pendidikan D3'],
     4500000, 'IDR', FALSE, 'active'),
    
    ('INH-INC-001', 'Incident Investigation Training', 'inhouse', 'Delta Indonesia', 2, 'days',
     'Pelatihan investigasi kecelakaan kerja.',
     ARRAY['Proses investigasi','Root cause analysis','5 Why dan Fishbone','Corrective action','Laporan investigasi'],
     ARRAY['HSE team atau investigator','Pengalaman di HSE','Minimal pendidikan D3'],
     3800000, 'IDR', FALSE, 'active'),
    
    ('INH-AUDIT-001', 'Internal HSE Audit Training', 'inhouse', 'Delta Indonesia', 3, 'days',
     'Pelatihan internal auditor HSE.',
     ARRAY['Standar audit HSE','Audit planning','Teknik interview dan observasi','Identifikasi non-conformance','Audit report'],
     ARRAY['Calon auditor internal HSE','Pengalaman di HSE minimal 2 tahun','Minimal pendidikan D3'],
     5500000, 'IDR', FALSE, 'active'),
    
    ('INH-LOTO-001', 'Lockout Tagout LOTO Training', 'inhouse', 'Delta Indonesia', 1, 'days',
     'Pelatihan prosedur LOTO untuk maintenance team.',
     ARRAY['Konsep LOTO','Identifikasi sumber energi','Prosedur isolasi','Verification','Group LOTO'],
     ARRAY['Maintenance team','Bekerja dengan mesin/peralatan','Minimal pendidikan SMK Teknik'],
     2500000, 'IDR', FALSE, 'active'),
    
    ('INH-PTW-001', 'Permit to Work System', 'inhouse', 'Delta Indonesia', 2, 'days',
     'Pelatihan sistem permit to work.',
     ARRAY['Sistem permit to work','Identifikasi jenis permit','Prosedur penerbitan','Risk assessment','Monitoring dan close-out'],
     ARRAY['Supervisor atau permit issuer','Pengalaman di operasional','Minimal pendidikan D3'],
     3500000, 'IDR', FALSE, 'active'),
    
    ('INH-BBS-001', 'Behavior Based Safety BBS Program', 'inhouse', 'Delta Indonesia', 2, 'days',
     'Pelatihan implementasi program BBS.',
     ARRAY['Konsep BBS','Safety observation','Teknik feedback','Identifikasi at-risk behavior','Implementasi program BBS'],
     ARRAY['Supervisor atau safety observer','Leadership skill','Minimal pendidikan D3'],
     4200000, 'IDR', FALSE, 'active'),
    
    ('INH-CRANE-001', 'Mobile Crane Safety', 'inhouse', 'Delta Indonesia', 3, 'days',
     'Pelatihan keselamatan mobile crane untuk operator rigger dan supervisor.',
     ARRAY['Jenis mobile crane','Membaca load chart','Hand signals','Lifting plan','Inspeksi'],
     ARRAY['Operator rigger atau supervisor crane','Pengalaman lifting operation','Sehat jasmani'],
     4000000, 'IDR', FALSE, 'active'),
    
    ('INH-TOWER-001', 'Tower Crane Safety', 'inhouse', 'Delta Indonesia', 3, 'days',
     'Pelatihan keselamatan tower crane.',
     ARRAY['Sistem tower crane','Operasi aman','Prosedur instalasi','Load chart','Inspeksi'],
     ARRAY['Operator tower crane','Pengalaman crane','Tidak takut ketinggian'],
     4500000, 'IDR', FALSE, 'active'),
    
    ('INH-HOTWORK-001', 'Hot Work Safety Training', 'inhouse', 'Delta Indonesia', 1, 'days',
     'Pelatihan keselamatan hot work pengelasan cutting grinding.',
     ARRAY['Bahaya hot work','Fire hazard identification','Hot work permit','Tugas fire watch','Fire prevention'],
     ARRAY['Welder fitter atau contractor','Bekerja dengan hot work','Minimal pendidikan SMK'],
     2200000, 'IDR', FALSE, 'active')
) AS t(code, name, category, certification, duration_value, duration_unit, description, objectives, prerequisites, price_regular, currency, featured, status)
WHERE NOT EXISTS (
  SELECT 1 FROM courses WHERE courses.code = t.code
);

-- =====================================================
-- Add sample schedules for existing courses
-- =====================================================

INSERT INTO course_schedules (course_id, start_date, end_date, location, type, max_participants, status)
SELECT 
  id,
  CURRENT_DATE + INTERVAL '30 days',
  CURRENT_DATE + INTERVAL '42 days',
  'Bekasi Training Center',
  'hybrid',
  25,
  'open'
FROM courses 
WHERE code = 'KEM-AK3U-001'
AND NOT EXISTS (
  SELECT 1 FROM course_schedules WHERE course_id = courses.id AND location = 'Bekasi Training Center'
);

INSERT INTO course_schedules (course_id, start_date, end_date, location, type, max_participants, status)
SELECT 
  id,
  CURRENT_DATE + INTERVAL '14 days',
  CURRENT_DATE + INTERVAL '20 days',
  'Online via Zoom',
  'online',
  30,
  'open'
FROM courses 
WHERE code = 'KEM-K3LIS-001'
AND NOT EXISTS (
  SELECT 1 FROM course_schedules WHERE course_id = courses.id AND location = 'Online via Zoom'
);

INSERT INTO course_schedules (course_id, start_date, end_date, location, type, max_participants, status)
SELECT 
  id,
  CURRENT_DATE + INTERVAL '21 days',
  CURRENT_DATE + INTERVAL '24 days',
  'Jakarta Training Center',
  'offline',
  20,
  'open'
FROM courses 
WHERE code = 'KEM-K3PKT-001'
AND NOT EXISTS (
  SELECT 1 FROM course_schedules WHERE course_id = courses.id AND location = 'Jakarta Training Center'
);

-- =====================================================
-- Report Results
-- =====================================================
SELECT 
  COUNT(*) as total_courses,
  COUNT(CASE WHEN featured = TRUE THEN 1 END) as featured_courses,
  COUNT(DISTINCT category) as categories,
  MIN(price_regular) as min_price,
  MAX(price_regular) as max_price
FROM courses;
