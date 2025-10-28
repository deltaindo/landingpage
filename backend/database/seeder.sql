-- =====================================================
-- USERS TABLE
-- =====================================================
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'viewer' CHECK (role IN ('admin', 'editor', 'viewer')),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- BLOG POSTS TABLE
-- =====================================================
CREATE TABLE blog_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    type VARCHAR(20) DEFAULT 'media-release' CHECK (type IN ('featured', 'media-release')),
    content TEXT NOT NULL,
    excerpt VARCHAR(200) NOT NULL,
    featured_image VARCHAR(500) NOT NULL,
    author VARCHAR(100) DEFAULT 'Delta Indonesia',
    category VARCHAR(100) DEFAULT 'Media Release',
    tags TEXT[],
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    published_at TIMESTAMP,
    views INTEGER DEFAULT 0,
    seo JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_status ON blog_posts(status);

-- =====================================================
-- COURSES TABLE (camelCase to match Sequelize)
-- =====================================================
CREATE TABLE courses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL CHECK (category IN ('kemnaker', 'bnsp', 'migas', 'inhouse')),
    certification VARCHAR(255) NOT NULL,
    "durationValue" INTEGER,
    "durationUnit" VARCHAR(20) DEFAULT 'days',
    description TEXT NOT NULL,
    objectives TEXT[],
    prerequisites TEXT[],
    syllabus JSONB DEFAULT '[]'::jsonb,
    "priceRegular" DECIMAL(15,2),
    "priceEarlyBird" DECIMAL(15,2),
    "priceGroup" DECIMAL(15,2),
    currency VARCHAR(10) DEFAULT 'IDR',
    instructor JSONB DEFAULT '{}'::jsonb,
    images JSONB DEFAULT '[]'::jsonb,
    featured BOOLEAN DEFAULT FALSE,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'archived')),
    "totalEnrollments" INTEGER DEFAULT 0,
    "ratingAverage" DECIMAL(3,2) DEFAULT 0.00,
    "ratingCount" INTEGER DEFAULT 0,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_courses_code ON courses(code);
CREATE INDEX idx_courses_category ON courses(category);
CREATE INDEX idx_courses_status ON courses(status);

-- =====================================================
-- COURSE SCHEDULES TABLE (camelCase)
-- =====================================================
CREATE TABLE "courseSchedules" (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "courseId" UUID REFERENCES courses(id) ON DELETE CASCADE,
    "startDate" DATE NOT NULL,
    "endDate" DATE NOT NULL,
    location VARCHAR(255),
    type VARCHAR(20) CHECK (type IN ('online', 'offline', 'hybrid')),
    "maxParticipants" INTEGER,
    "currentParticipants" INTEGER DEFAULT 0,
    status VARCHAR(20) DEFAULT 'open' CHECK (status IN ('open', 'full', 'closed', 'cancelled')),
    "whatsappGroup" VARCHAR(500),
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_schedules_courseId ON "courseSchedules"("courseId");
CREATE INDEX idx_schedules_startDate ON "courseSchedules"("startDate");

-- =====================================================
-- FORM TEMPLATES TABLE (camelCase)
-- =====================================================
CREATE TABLE "formTemplates" (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    sections JSONB NOT NULL DEFAULT '[]'::jsonb,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
    "isDefault" BOOLEAN DEFAULT FALSE,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- REGISTRATIONS TABLE (camelCase matching Sequelize)
-- =====================================================
CREATE TABLE registrations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "registrationNumber" VARCHAR(50) UNIQUE NOT NULL,
    "courseId" UUID REFERENCES courses(id),
    "scheduleId" UUID REFERENCES "courseSchedules"(id),
    
    -- Personal Information
    "fullName" VARCHAR(255) NOT NULL,
    nik VARCHAR(20) NOT NULL,
    "tempatLahir" VARCHAR(100),
    "tanggalLahir" DATE,
    "golonganDarah" VARCHAR(10),
    
    -- Address Information
    provinsi VARCHAR(100),
    kabupaten VARCHAR(100),
    kecamatan VARCHAR(100),
    kelurahan VARCHAR(100),
    alamat TEXT,
    
    -- Contact Information
    email VARCHAR(100) NOT NULL,
    "noWhatsapp" VARCHAR(20) NOT NULL,
    
    -- Education Information
    "pendidikanTerakhir" VARCHAR(50),
    "namaSekolah" VARCHAR(255),
    "noIjazah" VARCHAR(50),
    "tanggalIjazah" DATE,
    
    -- Company Information
    instansi VARCHAR(255),
    "bidangUsaha" VARCHAR(100),
    jabatan VARCHAR(100),
    "alamatPerusahaan" TEXT,
    "tlpKantor" VARCHAR(20),
    "emailPerusahaan" VARCHAR(100),
    
    -- Additional Data
    "formData" JSONB DEFAULT '{}'::jsonb,
    
    -- Payment Information
    "paymentMethod" VARCHAR(50),
    "paymentAmount" DECIMAL(15,2),
    "paymentStatus" VARCHAR(20) DEFAULT 'pending' CHECK ("paymentStatus" IN ('pending', 'paid', 'failed', 'refunded')),
    "paidAt" TIMESTAMP,
    "invoiceNumber" VARCHAR(50),
    
    -- Status
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'attended', 'completed', 'cancelled')),
    notes TEXT,
    "adminNotes" TEXT,
    
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_registrations_number ON registrations("registrationNumber");
CREATE INDEX idx_registrations_courseId ON registrations("courseId");
CREATE INDEX idx_registrations_status ON registrations(status);
CREATE INDEX idx_registrations_email ON registrations(email);

-- =====================================================
-- REGISTRATION DOCUMENTS TABLE (camelCase)
-- =====================================================
CREATE TABLE "registrationDocuments" (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "registrationId" UUID REFERENCES registrations(id) ON DELETE CASCADE,
    "documentType" VARCHAR(100) NOT NULL,
    "documentLabel" VARCHAR(255),
    "fileUrl" VARCHAR(500) NOT NULL,
    "fileSize" INTEGER,
    "fileType" VARCHAR(50),
    "uploadedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_documents_registrationId ON "registrationDocuments"("registrationId");

-- =====================================================
-- AUTO-GENERATE REGISTRATION NUMBER FUNCTION
-- =====================================================
CREATE OR REPLACE FUNCTION generate_registration_number()
RETURNS TRIGGER AS $$
DECLARE
    year_month TEXT;
    sequence_num INT;
    new_reg_number TEXT;
BEGIN
    year_month := TO_CHAR(CURRENT_DATE, 'YYMM');
    
    SELECT COUNT(*) + 1 INTO sequence_num
    FROM registrations
    WHERE "registrationNumber" LIKE 'REG-' || year_month || '%';
    
    new_reg_number := 'REG-' || year_month || '-' || LPAD(sequence_num::TEXT, 4, '0');
    
    NEW."registrationNumber" := new_reg_number;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_generate_registration_number
BEFORE INSERT ON registrations
FOR EACH ROW
WHEN (NEW."registrationNumber" IS NULL)
EXECUTE FUNCTION generate_registration_number();

-- =====================================================
-- UPDATE TIMESTAMPS FUNCTION
-- =====================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW."updatedAt" = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to all tables with updatedAt
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_courses_updated_at BEFORE UPDATE ON courses
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_courseSchedules_updated_at BEFORE UPDATE ON "courseSchedules"
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_formTemplates_updated_at BEFORE UPDATE ON "formTemplates"
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_registrations_updated_at BEFORE UPDATE ON registrations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
