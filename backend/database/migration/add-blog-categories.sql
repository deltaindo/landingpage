-- Add categories and tags tables for better organization
CREATE TABLE "blogCategories" (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) UNIQUE NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "blogTags" (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(50) UNIQUE NOT NULL,
    slug VARCHAR(50) UNIQUE NOT NULL,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "blogPostTags" (
    "blogPostId" UUID REFERENCES "blogPosts"(id) ON DELETE CASCADE,
    "tagId" UUID REFERENCES "blogTags"(id) ON DELETE CASCADE,
    PRIMARY KEY ("blogPostId", "tagId")
);

-- Insert default categories
INSERT INTO "blogCategories" (name, slug, description) VALUES
('Media Release', 'media-release', 'Official company announcements'),
('Training News', 'training-news', 'Updates about training programs'),
('Industry Insights', 'industry-insights', 'Industry trends and analysis'),
('Success Stories', 'success-stories', 'Client success stories and testimonials');
