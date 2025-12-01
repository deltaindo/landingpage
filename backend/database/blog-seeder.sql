-- Sample blog categories
INSERT INTO blog_categories (id, name, slug, description, created_at, updated_at) VALUES
(uuid_generate_v4(), 'Training Updates', 'training-updates', 'Latest news about training programs', NOW(), NOW()),
(uuid_generate_v4(), 'Safety News', 'safety-news', 'Industry safety news and updates', NOW(), NOW()),
(uuid_generate_v4(), 'Success Stories', 'success-stories', 'Client testimonials and achievements', NOW(), NOW());

-- Sample blog tags
INSERT INTO blog_tags (id, name, slug, created_at, updated_at) VALUES
(uuid_generate_v4(), 'K3', 'k3', NOW(), NOW()),
(uuid_generate_v4(), 'Certification', 'certification', NOW(), NOW()),
(uuid_generate_v4(), 'Training', 'training', NOW(), NOW()),
(uuid_generate_v4(), 'Safety', 'safety', NOW(), NOW());

-- Sample blog posts (15-20 realistic posts)
INSERT INTO blog_posts (id, title, slug, type, content, excerpt, featured_image, author, category_id, tags, status, published_at, views, created_at, updated_at) VALUES
(uuid_generate_v4(), 
 'Panduan Lengkap Sertifikasi K3 Umum 2025', 
 'panduan-lengkap-sertifikasi-k3-umum-2025',
 'featured',
 '<h2>Pengenalan Sertifikasi K3 Umum</h2><p>Sertifikasi K3 Umum merupakan persyaratan wajib bagi perusahaan di Indonesia...</p><h2>Proses Sertifikasi</h2><p>Proses sertifikasi meliputi beberapa tahapan penting...</p>',
 'Panduan lengkap untuk mendapatkan sertifikasi K3 Umum tahun 2025 dengan persyaratan dan tahapan yang jelas',
 '/uploads/blog/k3-guide-2025.jpg',
 'Delta Indonesia',
 (SELECT id FROM blog_categories WHERE slug = 'training-updates' LIMIT 1),
 ARRAY['K3', 'Certification', 'Training'],
 'published',
 NOW() - INTERVAL '5 days',
 324,
 NOW() - INTERVAL '5 days',
 NOW() - INTERVAL '5 days'
);

-- Add 15-20 more realistic blog posts with varied dates, categories, and content
