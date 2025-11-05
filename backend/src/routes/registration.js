const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, "../../uploads/documents");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB max
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|pdf/;
    const extname = allowedTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error("Only JPG, PNG, and PDF files allowed!"));
    }
  },
});

// POST - Create new registration
router.post(
  "/",
  upload.fields([
    { name: "doc_ktp", maxCount: 1 },
    { name: "doc_ijazah", maxCount: 1 },
    { name: "doc_surat_pernyataan", maxCount: 1 },
    { name: "doc_surat_bekerja", maxCount: 1 },
    { name: "doc_cv", maxCount: 1 },
    { name: "doc_pas_foto", maxCount: 1 },
    { name: "doc_skp", maxCount: 1 },
    { name: "doc_lisensi", maxCount: 1 },
    { name: "doc_sertifikat", maxCount: 1 },
    { name: "doc_surat_sehat", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      console.log("📝 Registration request received");
      console.log("Body:", req.body);
      console.log("Files:", req.files);

      const {
        courseId,
        scheduleId,
        full_name,
        nik,
        tempat_lahir,
        tanggal_lahir,
        golongan_darah,
        provinsi,
        kabupaten,
        kecamatan,
        kelurahan,
        alamat,
        email,
        no_whatsapp,
        pendidikan_terakhir,
        nama_sekolah,
        no_ijazah,
        tanggal_ijazah,
        instansi,
        bidang_usaha,
        jabatan,
        alamat_perusahaan,
        tlp_kantor,
        email_perusahaan,
      } = req.body;

      // Validate required fields
      if (!courseId || !full_name || !nik || !email || !no_whatsapp) {
        return res.status(400).json({
          success: false,
          error: "Missing required fields",
        });
      }

      // Generate registration number
      const now = new Date();
      const yearMonth = now.toISOString().slice(2, 7).replace("-", "");
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      const registration_number = `REG-${yearMonth}-${randomNum}`;

      // Create registration object (simplified for now)
      const registration = {
        registration_number,
        course_id: courseId,
        schedule_id: scheduleId || null,
        full_name,
        nik,
        tempat_lahir,
        tanggal_lahir,
        golongan_darah,
        provinsi,
        kabupaten,
        kecamatan,
        kelurahan,
        alamat,
        email,
        no_whatsapp,
        pendidikan_terakhir,
        nama_sekolah,
        no_ijazah,
        tanggal_ijazah,
        instansi,
        bidang_usaha,
        jabatan,
        alamat_perusahaan,
        tlp_kantor,
        email_perusahaan,
        status: "pending",
        created_at: now,
      };

      // Handle document uploads
      const documents = [];
      if (req.files) {
        Object.keys(req.files).forEach((fieldname) => {
          const file = req.files[fieldname];
          documents.push({
            document_type: fieldname,
            file_url: `/uploads/documents/${file.filename}`,
            file_size: file.size,
            file_type: file.mimetype,
          });
        });
      }

      console.log("✅ Registration created:", registration_number);
      console.log("📎 Documents uploaded:", documents.length);

      // Return success response
      res.status(201).json({
        success: true,
        message: "Registration successful",
        data: {
          registration_number,
          status: "pending",
          documents_count: documents.length,
        },
      });
    } catch (error) {
      console.error("❌ Registration error:", error);
      res.status(500).json({
        success: false,
        error: error.message || "Registration failed",
      });
    }
  }
);

// GET all registrations
router.get("/", async (req, res) => {
  try {
    // For now, return empty array
    res.json({
      success: true,
      data: [],
      pagination: {
        total: 0,
        page: 1,
        limit: 20,
        totalPages: 0,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

module.exports = router;
