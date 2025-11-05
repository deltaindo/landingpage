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

// Configure multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
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
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|pdf/;
    const extname = allowedTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = allowedTypes.test(file.mimetype);
    if (mimetype && extname) return cb(null, true);
    cb(new Error("Only JPG, PNG, PDF allowed!"));
  },
});

// POST - Create registration
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

      const {
        courseId,
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

      // Validate required
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

      // Count uploaded files
      const filesCount = Object.keys(req.files || {}).length;
      const documents = [];

      if (req.files) {
        for (const [fieldname, fileArray] of Object.entries(req.files)) {
          const file = fileArray;
          documents.push({
            type: fieldname,
            filename: file.filename,
            size: file.size,
            path: `/uploads/documents/${file.filename}`,
          });
        }
      }

      console.log("✅ Registration created:", registration_number);
      console.log("📎 Documents uploaded:", filesCount);

      res.status(201).json({
        success: true,
        message: "Pendaftaran berhasil",
        data: {
          registration_number,
          status: "pending",
          documents_count: filesCount,
          documents: documents,
        },
      });
    } catch (error) {
      console.error("❌ Error:", error);
      res.status(500).json({
        success: false,
        error: error.message || "Registration failed",
      });
    }
  }
);

// GET placeholder
router.get("/", (req, res) => {
  res.json({
    success: true,
    data: [],
    message: "Registrations endpoint",
  });
});

module.exports = router;
