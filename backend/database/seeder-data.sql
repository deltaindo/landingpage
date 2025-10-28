-- =====================================================
-- SEED DATA FOR COURSES
-- =====================================================

INSERT INTO courses (
  code, name, category, certification, "durationValue", "durationUnit",
  description, objectives, prerequisites, "priceRegular", currency, featured, status
) VALUES
-- KEMNAKER COURSES
('KEM-AK3U-001', 'Ahli K3 Umum', 'kemnaker', 'Kementerian Ketenagakerjaan RI', 12, 'days',
 'Pelatihan Ahli Keselamatan dan Kesehatan Kerja Umum yang memberikan pengetahuan komprehensif tentang manajemen K3 di tempat kerja.',
 ARRAY['Memahami regulasi K3','Mampu inspeksi audit K3','Identifikasi bahaya','Menyusun program K3','Investigasi kecelakaan'],
 ARRAY['Pendidikan minimal D3','Pengalaman kerja minimal 2 tahun','Sehat jasmani'],
 8500000, 'IDR', TRUE, 'active'),

('KEM-K3LIS-001', 'K3 Listrik', 'kemnaker', 'Kementerian Ketenagakerjaan RI', 6, 'days',
 'Pelatihan K3 bidang Listrik untuk teknisi listrik yang bekerja dengan instalasi dan peralatan listrik.',
 ARRAY['Keselamatan kelistrikan','Identifikasi bahaya listrik','Penggunaan APD','Lockout tagout','Pertolongan pertama'],
 ARRAY['Teknisi listrik','Pendidikan SMK Teknik Listrik','Pengalaman kerja listrik'],
 6500000, 'IDR', TRUE, 'active'),

('KEM-K3PKT-001', 'K3 Pekerjaan Pada Ketinggian', 'kemnaker', 'Kementerian Ketenagakerjaan RI', 3, 'days',
 'Pelatihan khusus untuk pekerja yang melakukan pekerjaan pada ketinggian.',
 ARRAY['Regulasi ketinggian','Full body harness','Sistem penyelamatan','Inspeksi alat','Rescue ketinggian'],
 ARRAY['Bekerja di ketinggian','Sehat tidak takut tinggi','Tidak ada penyakit jantung'],
 3500000, 'IDR', TRUE, 'active'),

('KEM-K3KB-001', 'K3 Kebakaran', 'kemnaker', 'Kementerian Ketenagakerjaan RI', 3, 'days',
 'Pelatihan Penanggulangan Kebakaran untuk membentuk Regu Penanggulangan Kebakaran.',
 ARRAY['Dasar kebakaran','APAR dan hydrant','Teknik pemadaman','Proteksi kebakaran','Evakuasi'],
 ARRAY['Anggota regu kebakaran','Sehat jasmani','Minimal SMA/SMK'],
 4500000, 'IDR', FALSE, 'active'),

('KEM-K3PAA-001', 'K3 Pesawat Angkat dan Angkut', 'kemnaker', 'Kementerian Ketenagakerjaan RI', 3, 'days',
 'Pelatihan operator pesawat angkat dan angkut seperti crane, forklift, overhead crane.',
 ARRAY['Jenis PAA','Operasi aman','Inspeksi pre-operation','Load chart','Perawatan dasar'],
 ARRAY['Operator PAA','Memiliki SIM A','Sehat jasmani'],
 4000000, 'IDR', FALSE, 'active'),

-- BNSP COURSES
('BNSP-CRANE-001', 'Operator Overhead Crane BNSP', 'bnsp', 'BNSP', 4, 'days',
 'Sertifikasi kompetensi operator overhead crane sesuai SKKNI.',
 ARRAY['Operasi overhead crane','Load chart','Hand signal','Inspeksi harian','Uji BNSP'],
 ARRAY['Operator crane','Pengalaman crane','Sehat jasmani'],
 5000000, 'IDR', TRUE, 'active'),

('BNSP-FORK-001', 'Operator Forklift BNSP', 'bnsp', 'BNSP', 3, 'days',
 'Sertifikasi kompetensi operator forklift sesuai SKKNI.',
 ARRAY['Operasi forklift aman','Load capacity','Prosedur keselamatan','Pre-check','Uji BNSP'],
 ARRAY['Operator forklift','SIM A','Sehat jasmani'],
 3500000, 'IDR', TRUE, 'active'),

-- MIGAS COURSES
('MIGAS-BASIC-001', 'Basic Safety Induction Migas', 'migas', 'MIGAS Indonesia', 2, 'days',
 'Pelatihan dasar keselamatan untuk pekerja area migas.',
 ARRAY['Budaya safety migas','Identifikasi bahaya','Emergency','JSA permit','APD'],
 ARRAY['Akan bekerja migas','Belum ada sertifikat migas','Sehat jasmani'],
 3500000, 'IDR', TRUE, 'active'),

('MIGAS-BOSIET-001', 'BOSIET Basic Offshore Safety', 'migas', 'OPITO', 5, 'days',
 'Pelatihan safety offshore wajib untuk pekerja lepas pantai.',
 ARRAY['Sea survival','Helicopter escape','Firefighting','First aid','Simulasi emergency'],
 ARRAY['Akan bekerja offshore','Bisa berenang','Tidak fobia air'],
 12000000, 'IDR', TRUE, 'active'),

-- IN-HOUSE COURSES
('INH-JSA-001', 'Job Safety Analysis Workshop', 'inhouse', 'Delta Indonesia', 2, 'days',
 'Workshop penyusunan JSA untuk supervisor dan manager.',
 ARRAY['Menyusun JSA','Hazard ID','Risk assessment','Control measures','Implementasi JSA'],
 ARRAY['Supervisor/manager','Pengalaman operasional','Minimal D3'],
 4000000, 'IDR', FALSE, 'active'),

('INH-HIRA-001', 'HIRA Training', 'inhouse', 'Delta Indonesia', 2, 'days',
 'Pelatihan HIRA untuk HSE team.',
 ARRAY['Metodologi HIRA','Hazard ID','Risk rating','Tools HIRARC','Laporan HIRA'],
 ARRAY['HSE team','Pengalaman HSE','Minimal D3'],
 4500000, 'IDR', FALSE, 'active');

-- =====================================================
-- SEED COURSE SCHEDULES
-- =====================================================

INSERT INTO "courseSchedules" ("courseId", "startDate", "endDate", location, type, "maxParticipants", status)
SELECT 
  id,
  CURRENT_DATE + INTERVAL '30 days',
  CURRENT_DATE + INTERVAL '42 days',
  'Bekasi Training Center',
  'hybrid',
  25,
  'open'
FROM courses WHERE code = 'KEM-AK3U-001';

INSERT INTO "courseSchedules" ("courseId", "startDate", "endDate", location, type, "maxParticipants", status)
SELECT 
  id,
  CURRENT_DATE + INTERVAL '14 days',
  CURRENT_DATE + INTERVAL '20 days',
  'Online via Zoom',
  'online',
  30,
  'open'
FROM courses WHERE code = 'KEM-K3LIS-001';

-- =====================================================
-- SEED DEFAULT FORM TEMPLATE
-- =====================================================

INSERT INTO "formTemplates" (name, description, "isDefault", sections) VALUES (
'Default K3 Registration Form',
'Standard registration form for K3 courses',
TRUE,
'[
  {
    "title": "Informasi Pribadi",
    "fields": [
      {"name": "fullName", "label": "Nama Lengkap", "type": "text", "required": true},
      {"name": "nik", "label": "NIK (KTP)", "type": "text", "required": true},
      {"name": "tempatLahir", "label": "Tempat Lahir", "type": "text", "required": true},
      {"name": "tanggalLahir", "label": "Tanggal Lahir", "type": "date", "required": true},
      {"name": "golonganDarah", "label": "Golongan Darah", "type": "select", "required": true}
    ]
  },
  {
    "title": "Alamat",
    "fields": [
      {"name": "provinsi", "label": "Provinsi", "type": "text", "required": true},
      {"name": "kabupaten", "label": "Kabupaten", "type": "text", "required": true},
      {"name": "alamat", "label": "Alamat Lengkap", "type": "textarea", "required": true}
    ]
  },
  {
    "title": "Kontak",
    "fields": [
      {"name": "email", "label": "Email", "type": "email", "required": true},
      {"name": "noWhatsapp", "label": "No WhatsApp", "type": "tel", "required": true}
    ]
  }
]'::jsonb
);
