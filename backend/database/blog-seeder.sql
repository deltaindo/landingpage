-- Insert sample blog categories
INSERT INTO blog_categories (id, name, slug, description) VALUES
(uuid_generate_v4(), 'Training News', 'training-news', 'Latest updates on training programs'),
(uuid_generate_v4(), 'Industry Insights', 'industry-insights', 'Insights from safety industry'),
(uuid_generate_v4(), 'Success Stories', 'success-stories', 'Client success stories');

-- Insert sample blog posts with rich content
INSERT INTO blog_posts (id, title, slug, type, content, excerpt, featured_image, author, category_id, tags, status, published_at, views) VALUES
(uuid_generate_v4(), 
 'New K3 Certification Requirements for 2025',
 'new-k3-certification-requirements-2025',
 'featured',
 '<h2>Introduction</h2><p>Starting January 2025, new workplace safety regulations...</p>',
 'Learn about the latest K3 certification requirements that will be mandatory in 2025',
 '/images/blog/k3-2025.jpg',
 'Delta Indonesia',
 (SELECT id FROM blog_categories WHERE slug = 'training-news' LIMIT 1),
 ARRAY['K3', 'Certification', 'Regulations'],
 'published',
 CURRENT_TIMESTAMP,
 245
);

-- Add 10-15 more realistic blog posts...
