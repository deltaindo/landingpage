const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { sequelize } = require("../config/database");
const Registration = require("../models/Registration");

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, "../../uploads/documents");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const filename =
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname);
    cb(null, filename);
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

    if (mimetype && extname) {
      return cb(null, true);
    }
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
      console.log("📝 Registration POST received");
      console.log("Body keys:", Object.keys(req.body));
      console.log("Files received:", Object.keys(req.files || {}));

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

      // Validate required fields
      if (!courseId || !full_name || !nik || !email || !no_whatsapp) {
        console.error("❌ Missing required fields");
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

      // Collect documents info
      const documents = [];
      if (req.files) {
        for (const [fieldname, fileArray] of Object.entries(req.files)) {
          if (fileArray && fileArray) {
            const file = fileArray;
            documents.push({
              type: fieldname,
              filename: file.filename,
              size: file.size,
              path: `/uploads/documents/${file.filename}`,
            });
            console.log(`✅ File uploaded: ${file.filename}`);
          }
        }
      }

      // Create registration in database
      const registration = await Registration.create({
        registration_number,
        course_id: courseId,
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
        documents_json: JSON.stringify(documents),
      });

      console.log("✅ Registration saved to DB:", registration_number);
      console.log("📎 Total documents:", documents.length);

      res.status(201).json({
        success: true,
        message: "Pendaftaran berhasil disimpan",
        data: {
          id: registration.id,
          registration_number,
          status: "pending",
          documents_count: documents.length,
          documents: documents,
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
    const registrations = await Registration.findAll({
      order: [["createdAt", "DESC"]],
      limit: 50,
    });

    res.json({
      success: true,
      data: registrations,
      count: registrations.length,
    });
  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// GET single registration
router.get("/:id", async (req, res) => {
  try {
    const registration = await Registration.findByPk(req.params.id);

    if (!registration) {
      return res.status(404).json({
        success: false,
        error: "Registration not found",
      });
    }

    res.json({
      success: true,
      data: registration,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

module.exports = router;
