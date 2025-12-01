-- Blog Categories
INSERT INTO blog_categories (id, name, slug, description, created_at, updated_at) VALUES
(uuid_generate_v4(), 'Berita Pelatihan', 'berita-pelatihan', 'Update terbaru tentang program pelatihan', NOW(), NOW()),
(uuid_generate_v4(), 'Artikel K3', 'artikel-k3', 'Artikel tentang keselamatan dan kesehatan kerja', NOW(), NOW()),
(uuid_generate_v4(), 'Testimoni', 'testimoni', 'Cerita sukses dari peserta pelatihan', NOW(), NOW()),
(uuid_generate_v4(), 'Peraturan', 'peraturan', 'Update peraturan dan regulasi terbaru', NOW(), NOW());

-- Blog Tags
INSERT INTO blog_tags (id, name, slug, created_at, updated_at) VALUES
(uuid_generate_v4(), 'K3 Umum', 'k3-umum', NOW(), NOW()),
(uuid_generate_v4(), 'Sertifikasi', 'sertifikasi', NOW(), NOW()),
(uuid_generate_v4(), 'BNSP', 'bnsp', NOW(), NOW()),
(uuid_generate_v4(), 'Kemnaker', 'kemnaker', NOW(), NOW()),
(uuid_generate_v4(), 'HSE', 'hse', NOW(), NOW()),
(uuid_generate_v4(), 'Migas', 'migas', NOW(), NOW());
