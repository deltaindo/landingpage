-- =====================================================
-- DELTA INDONESIA POSTGRESQL DATABASE SCHEMA
-- Based on MySQL Database + PDF Form Requirements
-- =====================================================

-- Drop existing tables if they exist
DROP TABLE IF EXISTS registrations CASCADE;
DROP TABLE IF EXISTS registration_documents CASCADE;
DROP TABLE IF EXISTS courses CASCADE;
DROP TABLE IF EXISTS course_schedules CASCADE;
DROP TABLE IF EXISTS form_templates CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS blog_posts CASCADE;

-- =====================================================
-- USERS TABLE (Authentication)
-- =====================================================
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
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
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
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
CREATE INDEX idx_blog_posts_type ON blog_posts(type);

-- =====================================================
-- COURSES TABLE
-- =====================================================
CREATE TABLE courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL CHECK (category IN ('kemnaker', 'bnsp', 'migas', 'inhouse')),
    certification VARCHAR(255) NOT NULL,
    duration_value INTEGER,
    duration_unit VARCHAR(20) DEFAULT 'days',
    description TEXT NOT NULL,
    objectives TEXT[],
    prerequisites TEXT[],
    syllabus JSONB DEFAULT '[]'::jsonb,
    price_regular DECIMAL(15,2),
    price_early_bird DECIMAL(15,2),
    price_group DECIMAL(15,2),
    currency VARCHAR(10) DEFAULT 'IDR',
    instructor JSONB DEFAULT '{}'::jsonb,
    images JSONB DEFAULT '[]'::jsonb,
    featured BOOLEAN DEFAULT FALSE,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'archived')),
    total_enrollments INTEGER DEFAULT 0,
    rating_average DECIMAL(3,2) DEFAULT 0.00,
    rating_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_courses_code ON courses(code);
CREATE INDEX idx_courses_category ON courses(category);
CREATE INDEX idx_courses_status ON courses(status);

-- =====================================================
-- COURSE SCHEDULES TABLE
-- =====================================================
CREATE TABLE course_schedules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    location VARCHAR(255),
    type VARCHAR(20) CHECK (type IN ('online', 'offline', 'hybrid')),
    max_participants INTEGER,
    current_participants INTEGER DEFAULT 0,
    status VARCHAR(20) DEFAULT 'open' CHECK (status IN ('open', 'full', 'closed', 'cancelled')),
    whatsapp_group VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_schedules_course_id ON course_schedules(course_id);
CREATE INDEX idx_schedules_start_date ON course_schedules(start_date);

-- =====================================================
-- FORM TEMPLATES TABLE (Dynamic Form Builder)
-- =====================================================
CREATE TABLE form_templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    sections JSONB NOT NULL DEFAULT '[]'::jsonb,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
    is_default BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- REGISTRATIONS TABLE (Main Registration Data)
-- =====================================================
CREATE TABLE registrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    registration_number VARCHAR(50) UNIQUE NOT NULL,
    course_id UUID REFERENCES courses(id),
    schedule_id UUID REFERENCES course_schedules(id),
    
    full_name VARCHAR(255) NOT NULL,
    nik VARCHAR(20) NOT NULL,
    tempat_lahir VARCHAR(100),
    tanggal_lahir DATE,
    golongan_darah VARCHAR(10),
    
    provinsi VARCHAR(100),
    kabupaten VARCHAR(100),
    kecamatan VARCHAR(100),
    kelurahan VARCHAR(100),
    alamat TEXT,
    
    email VARCHAR(100) NOT NULL,
    no_whatsapp VARCHAR(20) NOT NULL,
    
    pendidikan_terakhir VARCHAR(50),
    nama_sekolah VARCHAR(255),
    no_ijazah VARCHAR(50),
    tanggal_ijazah DATE,
    
    instansi VARCHAR(255),
    bidang_usaha VARCHAR(100),
    jabatan VARCHAR(100),
    alamat_perusahaan TEXT,
    tlp_kantor VARCHAR(20),
    email_perusahaan VARCHAR(100),
    
    form_data JSONB DEFAULT '{}'::jsonb,
    
    payment_method VARCHAR(50),
    payment_amount DECIMAL(15,2),
    payment_status VARCHAR(20) DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
    paid_at TIMESTAMP,
    invoice_number VARCHAR(50),
    
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'attended', 'completed', 'cancelled')),
    notes TEXT,
    admin_notes TEXT,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_registrations_number ON registrations(registration_number);
CREATE INDEX idx_registrations_course_id ON registrations(course_id);
CREATE INDEX idx_registrations_status ON registrations(status);
CREATE INDEX idx_registrations_email ON registrations(email);
CREATE INDEX idx_registrations_nik ON registrations(nik);

-- =====================================================
-- REGISTRATION DOCUMENTS TABLE (File Uploads)
-- =====================================================
CREATE TABLE registration_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    registration_id UUID REFERENCES registrations(id) ON DELETE CASCADE,
    document_type VARCHAR(100) NOT NULL,
    document_label VARCHAR(255),
    file_url VARCHAR(500) NOT NULL,
    file_size INTEGER,
    file_type VARCHAR(50),
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_documents_registration_id ON registration_documents(registration_id);

-- =====================================================
-- FUNCTIONS: Auto-generate Registration Number
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
    WHERE registration_number LIKE 'REG-' || year_month || '%';
    
    new_reg_number := 'REG-' || year_month || '-' || LPAD(sequence_num::TEXT, 4, '0');
    
    NEW.registration_number := new_reg_number;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_generate_registration_number
BEFORE INSERT ON registrations
FOR EACH ROW
WHEN (NEW.registration_number IS NULL)
EXECUTE FUNCTION generate_registration_number();

-- =====================================================
-- FUNCTIONS: Update timestamps
-- =====================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_courses_updated_at BEFORE UPDATE ON courses
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_course_schedules_updated_at BEFORE UPDATE ON course_schedules
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_form_templates_updated_at BEFORE UPDATE ON form_templates
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_registrations_updated_at BEFORE UPDATE ON registrations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- SEED DATA: Default Form Template
-- =====================================================
INSERT INTO form_templates (name, description, is_default, sections) VALUES (
'Default K3 Training Registration Form',
'Standard registration form for K3 training courses',
TRUE,
'[
  {
    "title": "Informasi Pribadi",
    "description": "Masukkan informasi pribadi Anda",
    "fields": [
      {
        "name": "full_name",
        "label": "Nama Lengkap",
        "type": "text",
        "placeholder": "Nama sesuai KTP",
        "gridColumn": "full",
        "validation": {"required": true, "message": "Nama lengkap wajib diisi"}
      },
      {
        "name": "nik",
        "label": "Nomor KTP (NIK)",
        "type": "text",
        "placeholder": "Masukkan NIK 16 digit",
        "gridColumn": "half",
        "validation": {"required": true, "minLength": 16, "maxLength": 16, "pattern": "^[0-9]{16}$", "message": "NIK harus 16 digit angka"}
      },
      {
        "name": "tempat_lahir",
        "label": "Tempat Lahir",
        "type": "text",
        "placeholder": "Kota/Kabupaten",
        "gridColumn": "half",
        "validation": {"required": true}
      },
      {
        "name": "tanggal_lahir",
        "label": "Tanggal Lahir",
        "type": "date",
        "gridColumn": "half",
        "validation": {"required": true}
      },
      {
        "name": "golongan_darah",
        "label": "Golongan Darah",
        "type": "select",
        "options": ["A", "B", "AB", "O", "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
        "gridColumn": "half",
        "validation": {"required": true}
      }
    ]
  },
  {
    "title": "Alamat",
    "description": "Informasi alamat tempat tinggal",
    "fields": [
      {
        "name": "provinsi",
        "label": "Provinsi",
        "type": "select",
        "placeholder": "Pilih Provinsi",
        "gridColumn": "half",
        "validation": {"required": true}
      },
      {
        "name": "kabupaten",
        "label": "Kabupaten/Kota",
        "type": "select",
        "placeholder": "Pilih Kabupaten",
        "gridColumn": "half",
        "validation": {"required": true}
      },
      {
        "name": "kecamatan",
        "label": "Kecamatan",
        "type": "select",
        "placeholder": "Pilih Kecamatan",
        "gridColumn": "half",
        "validation": {"required": true}
      },
      {
        "name": "kelurahan",
        "label": "Kelurahan/Desa",
        "type": "select",
        "placeholder": "Pilih Kelurahan",
        "gridColumn": "half",
        "validation": {"required": true}
      },
      {
        "name": "alamat",
        "label": "Alamat Lengkap",
        "type": "textarea",
        "placeholder": "Jalan, RT/RW, No. Rumah",
        "gridColumn": "full",
        "validation": {"required": true}
      }
    ]
  },
  {
    "title": "Kontak",
    "description": "Informasi kontak yang dapat dihubungi",
    "fields": [
      {
        "name": "email",
        "label": "Email",
        "type": "email",
        "placeholder": "contoh@email.com",
        "gridColumn": "half",
        "validation": {"required": true, "pattern": "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$"}
      },
      {
        "name": "no_whatsapp",
        "label": "No. WhatsApp",
        "type": "tel",
        "placeholder": "08xxxxxxxxxx",
        "gridColumn": "half",
        "validation": {"required": true, "pattern": "^08[0-9]{8,11}$"}
      }
    ]
  },
  {
    "title": "Pendidikan",
    "description": "Informasi pendidikan terakhir",
    "fields": [
      {
        "name": "pendidikan_terakhir",
        "label": "Pendidikan Terakhir",
        "type": "select",
        "options": ["SD", "SMP", "SMA/SMK", "D3", "S1", "S2", "S3"],
        "gridColumn": "half",
        "validation": {"required": true}
      },
      {
        "name": "nama_sekolah",
        "label": "Nama Sekolah/Universitas",
        "type": "text",
        "placeholder": "Nama institusi pendidikan",
        "gridColumn": "half",
        "validation": {"required": true}
      },
      {
        "name": "no_ijazah",
        "label": "No. Ijazah",
        "type": "text",
        "gridColumn": "half",
        "validation": {"required": true}
      },
      {
        "name": "tanggal_ijazah",
        "label": "Tanggal Ijazah",
        "type": "date",
        "gridColumn": "half",
        "validation": {"required": true}
      }
    ]
  },
  {
    "title": "Informasi Perusahaan",
    "description": "Data perusahaan tempat bekerja",
    "fields": [
      {
        "name": "instansi",
        "label": "Nama Instansi/Perusahaan",
        "type": "text",
        "placeholder": "PT/CV/Instansi",
        "gridColumn": "full",
        "validation": {"required": true}
      },
      {
        "name": "bidang_usaha",
        "label": "Bidang Usaha",
        "type": "text",
        "placeholder": "Contoh: Manufaktur, Konstruksi, dll",
        "gridColumn": "half",
        "validation": {"required": true}
      },
      {
        "name": "jabatan",
        "label": "Jabatan",
        "type": "text",
        "placeholder": "Posisi di perusahaan",
        "gridColumn": "half",
        "validation": {"required": true}
      },
      {
        "name": "alamat_perusahaan",
        "label": "Alamat Perusahaan",
        "type": "textarea",
        "placeholder": "Alamat lengkap perusahaan",
        "gridColumn": "full",
        "validation": {"required": true}
      },
      {
        "name": "tlp_kantor",
        "label": "No. Telp/Fax Kantor",
        "type": "tel",
        "gridColumn": "half",
        "validation": {"required": false}
      },
      {
        "name": "email_perusahaan",
        "label": "Email Perusahaan",
        "type": "email",
        "gridColumn": "half",
        "validation": {"required": false}
      }
    ]
  },
  {
    "title": "Upload Dokumen",
    "description": "Upload dokumen yang diperlukan (Format: JPG, PNG, PDF, Max 2MB)",
    "fields": [
      {
        "name": "doc_ktp",
        "label": "KTP",
        "type": "file",
        "gridColumn": "half",
        "validation": {"required": true}
      },
      {
        "name": "doc_ijazah",
        "label": "Ijazah Terakhir",
        "type": "file",
        "gridColumn": "half",
        "validation": {"required": true}
      },
      {
        "name": "doc_surat_pernyataan",
        "label": "Surat Pernyataan Peserta",
        "type": "file",
        "gridColumn": "half",
        "validation": {"required": true}
      },
      {
        "name": "doc_surat_bekerja",
        "label": "Surat Keterangan Bekerja",
        "type": "file",
        "gridColumn": "half",
        "validation": {"required": true}
      },
      {
        "name": "doc_cv",
        "label": "Curriculum Vitae (CV)",
        "type": "file",
        "gridColumn": "half",
        "validation": {"required": false}
      },
      {
        "name": "doc_pas_foto",
        "label": "Pas Foto Berwarna",
        "type": "file",
        "gridColumn": "half",
        "validation": {"required": true}
      }
    ]
  }
]'::jsonb
);

-- =====================================================
-- SEED DATA: Sample Courses
-- =====================================================
INSERT INTO courses (code, name, category, certification, duration_value, duration_unit, description, price_regular) VALUES
('KEM-AK3U-001', 'Ahli K3 Umum', 'kemnaker', 'Kementerian Ketenagakerjaan RI', 12, 'days', 'Pelatihan Ahli Keselamatan dan Kesehatan Kerja Umum', 8500000),
('KEM-K3LIS-001', 'K3 Listrik', 'kemnaker', 'Kementerian Ketenagakerjaan RI', 6, 'days', 'Pelatihan K3 bidang Listrik', 6500000),
('KEM-K3PKT-001', 'K3 Pekerjaan Pada Ketinggian', 'kemnaker', 'Kementerian Ketenagakerjaan RI', 3, 'days', 'Pelatihan K3 Pekerjaan Pada Ketinggian', 3500000),
('KEM-K3KB-001', 'K3 Kebakaran', 'kemnaker', 'Kementerian Ketenagakerjaan RI', 3, 'days', 'Pelatihan Penanggulangan Kebakaran', 4500000),
('KEM-K3PAA-001', 'K3 Pesawat Angkat dan Angkut', 'kemnaker', 'Kementerian Ketenagakerjaan RI', 3, 'days', 'Pelatihan K3 Pesawat Angkat dan Angkut', 4000000);

-- =====================================================
-- CREATE VIEWS FOR REPORTING (AFTER ALL TABLES & SEED DATA)
-- =====================================================

-- View: Registration Summary
CREATE OR REPLACE VIEW v_registration_summary AS
SELECT 
    r.id,
    r.registration_number,
    r.full_name,
    r.email,
    r.no_whatsapp,
    c.name as course_name,
    c.code as course_code,
    cs.start_date,
    cs.end_date,
    r.status,
    r.payment_status,
    r.created_at
FROM registrations r
JOIN courses c ON r.course_id = c.id
LEFT JOIN course_schedules cs ON r.schedule_id = cs.id
ORDER BY r.created_at DESC;

-- View: Course Statistics
CREATE OR REPLACE VIEW v_course_stats AS
SELECT 
    c.id,
    c.name,
    c.code,
    c.category,
    COUNT(r.id) as total_registrations,
    COUNT(CASE WHEN r.status = 'completed' THEN 1 END) as completed,
    COUNT(CASE WHEN r.status = 'pending' THEN 1 END) as pending,
    SUM(CASE WHEN r.payment_status = 'paid' THEN r.payment_amount ELSE 0 END) as total_revenue
FROM courses c
LEFT JOIN registrations r ON c.id = r.course_id
GROUP BY c.id, c.name, c.code, c.category;
