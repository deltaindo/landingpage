-- =====================================================
-- DELTA INDONESIA 2026 TRAINING SCHEDULE (FIXED)
-- Uses camelCase column names for Sequelize
-- =====================================================

-- Insert 2026 courses (camelCase columns)
INSERT INTO courses (
  code, name, category, certification, "durationValue", "durationUnit",
  description, objectives, "priceRegular", currency, featured, status
)
SELECT * FROM (VALUES
  ('KEM-ELE-TEKN-001', 'K3 Elevator Eskalator (TEKNISI)', 'kemnaker', 'Kementerian Ketenagakerjaan RI', 6, 'days',
   'Pelatihan K3 untuk teknisi elevator dan eskalator', 
   ARRAY['Operasi dan pemeliharaan elevator','Prosedur keselamatan elevator','Inspeksi berkala','Emergency rescue'], 
   6120000, 'IDR', FALSE, 'active'),
   
  ('KEM-ELE-AHLI-001', 'K3 Elevator Eskalator (AHLI)', 'kemnaker', 'Kementerian Ketenagakerjaan RI', 12, 'days',
   'Pelatihan Ahli K3 Elevator dan Eskalator', 
   ARRAY['Sistem elevator dan eskalator','Audit keselamatan','Manajemen pemeliharaan','Emergency response'], 
   13515000, 'IDR', TRUE, 'active'),
   
  ('KEM-LIS-TEKN-001', 'K3 Listrik (TEKNISI)', 'kemnaker', 'Kementerian Ketenagakerjaan RI', 6, 'days',
   'Pelatihan K3 Listrik untuk teknisi', 
   ARRAY['Keselamatan kelistrikan','Lockout tagout','Penggunaan APD listrik','Pertolongan pertama'], 
   6120000, 'IDR', TRUE, 'active'),
   
  ('KEM-LIS-AHLI-001', 'K3 Listrik (AHLI)', 'kemnaker', 'Kementerian Ketenagakerjaan RI', 17, 'days',
   'Pelatihan Ahli K3 Listrik', 
   ARRAY['Sistem kelistrikan industri','Analisis bahaya listrik','Audit keselamatan','Emergency response'], 
   16000000, 'IDR', TRUE, 'active'),
   
  ('KEM-KB-D-001', 'Petugas Peran Kebakaran (Damkar D)', 'kemnaker', 'Kementerian Ketenagakerjaan RI', 3, 'days',
   'Pelatihan petugas kebakaran tingkat dasar', 
   ARRAY['Dasar-dasar kebakaran','Penggunaan APAR','Evakuasi','First aid'], 
   4250000, 'IDR', FALSE, 'active'),
   
  ('KEM-KB-C-001', 'Regu Penanggulangan Kebakaran (Damkar C)', 'kemnaker', 'Kementerian Ketenagakerjaan RI', 6, 'days',
   'Pelatihan regu kebakaran', 
   ARRAY['Teknik pemadaman','Penggunaan hydrant','Team coordination','Rescue operation'], 
   8160000, 'IDR', FALSE, 'active'),
   
  ('KEM-KB-DC-001', 'K3 Kebakaran Kelas D dan Kelas C', 'kemnaker', 'Kementerian Ketenagakerjaan RI', 8, 'days',
   'Pelatihan K3 Kebakaran Kelas D dan C', 
   ARRAY['Pemadaman api','Sistem proteksi kebakaran','Emergency procedure','Fire investigation'], 
   9690000, 'IDR', FALSE, 'active'),
   
  ('KEM-KB-B-001', 'Kordinator Unit Perana Kebakaran (Damkar B)', 'kemnaker', 'Kementerian Ketenagakerjaan RI', 6, 'days',
   'Pelatihan koordinator kebakaran', 
   ARRAY['Manajemen regu kebakaran','Koordinasi emergency','Fire safety management','Incident command'], 
   7250000, 'IDR', FALSE, 'active'),
   
  ('KEM-KB-A-001', 'Ahli K3 Kebakaran (Damkar A)', 'kemnaker', 'Kementerian Ketenagakerjaan RI', 6, 'days',
   'Pelatihan Ahli K3 Kebakaran', 
   ARRAY['Fire protection system','Fire safety audit','Emergency planning','Fire risk assessment'], 
   7250000, 'IDR', FALSE, 'active'),
   
  ('KEM-KONS-MUDA-001', 'K3 Konstruksi Ahli Muda', 'kemnaker', 'Kementerian Ketenagakerjaan RI', 6, 'days',
   'Pelatihan K3 Konstruksi Ahli Muda', 
   ARRAY['Keselamatan konstruksi','Scaffolding safety','Excavation safety','Fall protection'], 
   6000000, 'IDR', FALSE, 'active'),
   
  ('KEM-KONS-MADYA-001', 'K3 Konstruksi Ahli Madya', 'kemnaker', 'Kementerian Ketenagakerjaan RI', 9, 'days',
   'Pelatihan K3 Konstruksi Ahli Madya', 
   ARRAY['Manajemen K3 konstruksi','Risk assessment','Safety plan','Site inspection'], 
   8670000, 'IDR', FALSE, 'active'),
   
  ('KEM-KONS-UTAMA-001', 'K3 Konstruksi Ahli Utama', 'kemnaker', 'Kementerian Ketenagakerjaan RI', 10, 'days',
   'Pelatihan K3 Konstruksi Ahli Utama', 
   ARRAY['Strategic K3 management','Safety leadership','Audit konstruksi','Regulatory compliance'], 
   10710000, 'IDR', FALSE, 'active'),
   
  ('KEM-SCAFF-TEKN-001', 'K3 Scaffolding (TEKNISI)', 'kemnaker', 'Kementerian Ketenagakerjaan RI', 4, 'days',
   'Pelatihan teknisi scaffolding', 
   ARRAY['Pemasangan scaffolding','Load calculation','Inspeksi scaffolding','Safety procedure'], 
   4750000, 'IDR', FALSE, 'active'),
   
  ('KEM-SCAFF-SUP-001', 'K3 Scaffolding (SUPERVISI)', 'kemnaker', 'Kementerian Ketenagakerjaan RI', 5, 'days',
   'Pelatihan supervisi scaffolding', 
   ARRAY['Perencanaan scaffolding','Supervision','Quality control','Safety management'], 
   5100000, 'IDR', FALSE, 'active'),
   
  ('KEM-PAA-AHLI-001', 'K3 Pesawat Angkat Angkut (PAA) (AHLI)', 'kemnaker', 'Kementerian Ketenagakerjaan RI', 25, 'days',
   'Pelatihan Ahli K3 Pesawat Angkat Angkut', 
   ARRAY['Sistem PAA','Load chart analysis','Safety management','Inspection and testing'], 
   26520000, 'IDR', TRUE, 'active'),
   
  ('KEM-PP-TEKN-001', 'Pemeriksa Penguji PAA PTP PUBT (TEKNISI)', 'kemnaker', 'Kementerian Ketenagakerjaan RI', 9, 'days',
   'Pelatihan pemeriksa penguji pesawat', 
   ARRAY['Inspection procedure','Testing method','Documentation','Safety standards'], 
   9690000, 'IDR', FALSE, 'active'),
   
  ('KEM-GONDOLA-001', 'Gondola Dongkrak Mekanik Takel Rigger (OPERATOR)', 'kemnaker', 'Kementerian Ketenagakerjaan RI', 3, 'days',
   'Pelatihan operator alat angkat', 
   ARRAY['Operasi alat angkat','Rigging technique','Hand signals','Safety procedure'], 
   4335000, 'IDR', FALSE, 'active'),
   
  ('KEM-MESIN-T1-001', 'Mesin Produksi Perkakas Tanur I (OPERATOR)', 'kemnaker', 'Kementerian Ketenagakerjaan RI', 5, 'days',
   'Pelatihan operator mesin produksi Tanur I', 
   ARRAY['Operasi mesin tanur','Safety procedure','Maintenance dasar','Emergency response'], 
   5610000, 'IDR', FALSE, 'active'),
   
  ('KEM-MESIN-T2-001', 'Mesin Produksi Perkakas Tanur II (OPERATOR)', 'kemnaker', 'Kementerian Ketenagakerjaan RI', 4, 'days',
   'Pelatihan operator mesin produksi Tanur II', 
   ARRAY['Operasi mesin tanur lanjutan','Process control','Quality assurance','Safety management'], 
   5100000, 'IDR', FALSE, 'active'),
   
  ('KEM-BOILER-I-001', 'K3 Boiler Kelas I', 'kemnaker', 'Kementerian Ketenagakerjaan RI', 6, 'days',
   'Pelatihan K3 Boiler Kelas I', 
   ARRAY['Sistem boiler','Operation procedure','Safety device','Emergency shutdown'], 
   7140000, 'IDR', FALSE, 'active'),
   
  ('KEM-BOILER-II-001', 'K3 Boiler Kelas II', 'kemnaker', 'Kementerian Ketenagakerjaan RI', 4, 'days',
   'Pelatihan K3 Boiler Kelas II', 
   ARRAY['Boiler operation','Maintenance','Safety check','Troubleshooting'], 
   5355000, 'IDR', FALSE, 'active'),
   
  ('KEM-CRANE-I-001', 'K3 Crane Kelas I', 'kemnaker', 'Kementerian Ketenagakerjaan RI', 5, 'days',
   'Pelatihan K3 Crane Kelas I', 
   ARRAY['Crane operation','Load chart','Rigging','Safety procedure'], 
   5610000, 'IDR', FALSE, 'active'),
   
  ('KEM-CRANE-II-001', 'K3 Crane Kelas II', 'kemnaker', 'Kementerian Ketenagakerjaan RI', 4, 'days',
   'Pelatihan K3 Crane Kelas II', 
   ARRAY['Crane handling','Signal communication','Load control','Pre-operation check'], 
   4590000, 'IDR', FALSE, 'active'),
   
  ('KEM-CRANE-III-001', 'K3 Crane Kelas III', 'kemnaker', 'Kementerian Ketenagakerjaan RI', 3, 'days',
   'Pelatihan K3 Crane Kelas III', 
   ARRAY['Basic crane operation','Safety basics','Communication','Equipment care'], 
   4080000, 'IDR', FALSE, 'active'),
   
  ('KEM-ALBER-001', 'K3 Alat Berat', 'kemnaker', 'Kementerian Ketenagakerjaan RI', 4, 'days',
   'Pelatihan K3 Alat Berat', 
   ARRAY['Operation alat berat','Safety procedures','Maintenance basics','Site safety'], 
   4590000, 'IDR', FALSE, 'active'),
   
  ('KEM-FORK-I-001', 'K3 Forklift Kelas I', 'kemnaker', 'Kementerian Ketenagakerjaan RI', 4, 'days',
   'Pelatihan K3 Forklift Kelas I', 
   ARRAY['Forklift operation','Load capacity','Stability','Safety rules'], 
   4590000, 'IDR', TRUE, 'active'),
   
  ('KEM-FORK-II-001', 'K3 Forklift Kelas II', 'kemnaker', 'Kementerian Ketenagakerjaan RI', 3, 'days',
   'Pelatihan K3 Forklift Kelas II', 
   ARRAY['Basic forklift operation','Load handling','Safety awareness','Equipment check'], 
   4080000, 'IDR', FALSE, 'active'),
   
  ('KEM-DIESEL-001', 'K3 Diesel Genset Kelas 1 dan 2', 'kemnaker', 'Kementerian Ketenagakerjaan RI', 4, 'days',
   'Pelatihan K3 Diesel dan Genset', 
   ARRAY['Diesel engine operation','Genset maintenance','Safety procedure','Troubleshooting'], 
   5610000, 'IDR', FALSE, 'active'),
   
  ('KEM-LAS-I-001', 'Juru Las Gas Listrik Kelas I', 'kemnaker', 'Kementerian Ketenagakerjaan RI', 6, 'days',
   'Pelatihan Juru Las Kelas I', 
   ARRAY['Advanced welding technique','Inspection','Quality control','Safety management'], 
   23500000, 'IDR', TRUE, 'active'),
   
  ('KEM-LAS-II-001', 'Juru Las Gas Listrik Kelas II', 'kemnaker', 'Kementerian Ketenagakerjaan RI', 5, 'days',
   'Pelatihan Juru Las Kelas II', 
   ARRAY['Welding technique','Material preparation','Safety procedure','Basic inspection'], 
   22500000, 'IDR', FALSE, 'active'),
   
  ('KEM-LAS-III-001', 'Juru Las Gas Listrik Kelas III', 'kemnaker', 'Kementerian Ketenagakerjaan RI', 4, 'days',
   'Pelatihan Juru Las Kelas III', 
   ARRAY['Basic welding','Equipment handling','Safety basics','Work preparation'], 
   21500000, 'IDR', FALSE, 'active'),
   
  ('KEM-ASBES-001', 'K3 Asbes (PETUGAS)', 'kemnaker', 'Kementerian Ketenagakerjaan RI', 3, 'days',
   'Pelatihan K3 Asbes untuk petugas', 
   ARRAY['Bahaya asbes','APD asbes','Removal procedure','Waste disposal'], 
   3570000, 'IDR', FALSE, 'active'),
   
  ('KEM-PEST-001', 'K3 Pestisida (TEKNISI)', 'kemnaker', 'Kementerian Ketenagakerjaan RI', 3, 'days',
   'Pelatihan K3 Pestisida', 
   ARRAY['Jenis pestisida','Handling pesticide','Safety procedure','First aid'], 
   3570000, 'IDR', FALSE, 'active'),
   
  ('KEM-GAS-001', 'K3 Deteksi Gas (TEKNISI)', 'kemnaker', 'Kementerian Ketenagakerjaan RI', 2, 'days',
   'Pelatihan deteksi gas berbahaya', 
   ARRAY['Gas detector operation','Gas identification','Safety procedure','Emergency response'], 
   3060000, 'IDR', FALSE, 'active'),
   
  ('KEM-CS-001', 'K3 Ruang Terbatas Confined Space (TEKNISI)', 'kemnaker', 'Kementerian Ketenagakerjaan RI', 5, 'days',
   'Pelatihan K3 Ruang Terbatas', 
   ARRAY['Confined space entry','Gas testing','Entry permit','Rescue procedure'], 
   5610000, 'IDR', FALSE, 'active'),
   
  ('KEM-CSR-001', 'K3 Penyelamat Ruang Terbatas (PETUGAS)', 'kemnaker', 'Kementerian Ketenagakerjaan RI', 3, 'days',
   'Pelatihan penyelamat confined space', 
   ARRAY['Rescue technique','Emergency equipment','Communication','Team coordination'], 
   4590000, 'IDR', FALSE, 'active'),
   
  ('KEM-KIMIA-PET-001', 'K3 Kimia (PETUGAS)', 'kemnaker', 'Kementerian Ketenagakerjaan RI', 8, 'days',
   'Pelatihan K3 Kimia untuk petugas', 
   ARRAY['Chemical handling','MSDS reading','Spill response','PPE selection'], 
   6750000, 'IDR', FALSE, 'active'),
   
  ('KEM-KIMIA-AHLI-001', 'K3 Kimia (AHLI)', 'kemnaker', 'Kementerian Ketenagakerjaan RI', 12, 'days',
   'Pelatihan Ahli K3 Kimia', 
   ARRAY['Chemical management','Risk assessment','Emergency planning','Audit chemical safety'], 
   11220000, 'IDR', FALSE, 'active'),
   
  ('KEM-LK-MUDA-001', 'Ahli K3 Muda Lingkungan Kerja', 'kemnaker', 'Kementerian Ketenagakerjaan RI', 5, 'days',
   'Pelatihan Ahli K3 Muda Lingkungan Kerja', 
   ARRAY['Higiene industri','Environmental monitoring','NAB/TLV','Control measures'], 
   7650000, 'IDR', FALSE, 'active'),
   
  ('KEM-LK-MADYA-001', 'Ahli K3 Madya Lingkungan Kerja', 'kemnaker', 'Kementerian Ketenagakerjaan RI', 5, 'days',
   'Pelatihan Ahli K3 Madya Lingkungan Kerja', 
   ARRAY['Advanced hygiene','Risk assessment','Monitoring program','Compliance audit'], 
   7650000, 'IDR', FALSE, 'active'),
   
  ('KEM-LK-UTAMA-001', 'Ahli K3 Utama Lingkungan Kerja', 'kemnaker', 'Kementerian Ketenagakerjaan RI', 5, 'days',
   'Pelatihan Ahli K3 Utama Lingkungan Kerja', 
   ARRAY['Strategic planning','Leadership','Regulatory compliance','System development'], 
   7650000, 'IDR', FALSE, 'active'),
   
  ('KEM-BT-T2-001', 'Tenaga Kerja Bangunan Tinggi Tingkat 2', 'kemnaker', 'Kementerian Ketenagakerjaan RI', 3, 'days',
   'Pelatihan kerja di bangunan tinggi tingkat 2', 
   ARRAY['Work at height','Fall protection','Rescue','Equipment inspection'], 
   5670000, 'IDR', FALSE, 'active'),
   
  ('KEM-PKT-T1-001', 'Tenaga Kerja Pada Ketinggian Tingkat 1', 'kemnaker', 'Kementerian Ketenagakerjaan RI', 4, 'days',
   'Pelatihan kerja pada ketinggian tingkat 1', 
   ARRAY['Height safety basics','Harness usage','Access equipment','Emergency procedure'], 
   7000000, 'IDR', FALSE, 'active'),
   
  ('KEM-PKT-T2-001', 'Tenaga Kerja Pada Ketinggian Tingkat 2', 'kemnaker', 'Kementerian Ketenagakerjaan RI', 4, 'days',
   'Pelatihan kerja pada ketinggian tingkat 2', 
   ARRAY['Advanced height work','Rescue technique','Supervision','Risk assessment'], 
   9000000, 'IDR', FALSE, 'active'),
   
  ('KEM-HYP-PARA-001', 'Hyperkes Untuk Paramedis', 'kemnaker', 'Kementerian Ketenagakerjaan RI', 5, 'days',
   'Pelatihan Hyperkes untuk paramedis', 
   ARRAY['Occupational health','Medical surveillance','First aid','Health promotion'], 
   4590000, 'IDR', FALSE, 'active'),
   
  ('KEM-HYP-DOK-001', 'Hyperkes Untuk Dokter', 'kemnaker', 'Kementerian Ketenagakerjaan RI', 6, 'days',
   'Pelatihan Hyperkes untuk dokter', 
   ARRAY['Occupational medicine','Health risk assessment','Medical management','Diagnosis occupational disease'], 
   6120000, 'IDR', FALSE, 'active'),
   
  ('KEM-P3K-001', 'P3K First Aider', 'kemnaker', 'Kementerian Ketenagakerjaan RI', 3, 'days',
   'Pelatihan Pertolongan Pertama Pada Kecelakaan', 
   ARRAY['Basic first aid','CPR','Wound care','Emergency response'], 
   5100000, 'IDR', FALSE, 'active'),
   
  ('KEM-RS-001', 'K3 Rumah Sakit', 'kemnaker', 'Kementerian Ketenagakerjaan RI', 3, 'days',
   'Pelatihan K3 Rumah Sakit', 
   ARRAY['Hospital safety','Infection control','Chemical safety','Radiation safety'], 
   4590000, 'IDR', FALSE, 'active'),
   
  ('KEM-AK3U-2026-001', 'Ahli K3 Umum', 'kemnaker', 'Kementerian Ketenagakerjaan RI', 12, 'days',
   'Pelatihan Ahli Keselamatan dan Kesehatan Kerja Umum 2026', 
   ARRAY['K3 management','Audit and inspection','Risk assessment','Incident investigation','Regulatory compliance'], 
   7650000, 'IDR', TRUE, 'active'),
   
  ('KEM-P2K3-001', 'P2K3 Panitia Pembina K3', 'kemnaker', 'Kementerian Ketenagakerjaan RI', 3, 'days',
   'Pelatihan Panitia Pembina K3', 
   ARRAY['Roles and responsibility','K3 program','Meeting procedure','Communication'], 
   4080000, 'IDR', FALSE, 'active')
) AS t(code, name, category, certification, "durationValue", "durationUnit", description, objectives, "priceRegular", currency, featured, status)
WHERE NOT EXISTS (
  SELECT 1 FROM courses WHERE courses.code = t.code
);

-- Show results (using camelCase)
SELECT 
  COUNT(*) as total_2026_courses,
  SUM("priceRegular") as total_revenue_potential,
  AVG("priceRegular") as average_price
FROM courses 
WHERE code LIKE 'KEM-%' AND "createdAt" > NOW() - INTERVAL '1 hour';

-- Success message
SELECT '✅ Successfully inserted 2026 training courses!' as message;
