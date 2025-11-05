const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { sequelize } = require("../config/database");

const uploadsDir = path.join(__dirname, "../../uploads/documents");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

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

      const {
        courseId,
        fullName,
        nik,
        tempatLahir,
        tanggalLahir,
        golonganDarah,
        provinsi,
        kabupaten,
        kecamatan,
        kelurahan,
        alamat,
        email,
        noWhatsapp,
        pendidikanTerakhir,
        namaSekolah,
        noIjazah,
        tanggalIjazah,
        instansi,
        bidangUsaha,
        jabatan,
        alamatPerusahaan,
        tlpKantor,
        emailPerusahaan,
        paymentMethod,
        paymentAmount,
      } = req.body;

      // Validate required
      if (!courseId || !fullName || !nik || !email || !noWhatsapp) {
        return res.status(400).json({
          success: false,
          error: "Missing required fields",
        });
      }

      // Generate registration number
      const now = new Date();
      const yearMonth = now.toISOString().slice(2, 7).replace("-", "");
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      const registrationNumber = `REG-${yearMonth}-${randomNum}`;

      // Collect documents
      const documents = [];
      if (req.files) {
        for (const [fieldname, fileArray] of Object.entries(req.files)) {
          if (fileArray && fileArray) {
            const file = fileArray;
            documents.push({
              type: fieldname,
              filename: file.filename,
              size: file.size,
            });
            console.log(`✅ ${fieldname}: ${file.filename}`);
          }
        }
      }

      // Insert into registrations table using raw SQL
      const query = `
        INSERT INTO "public"."registrations" (
          "id",
          "registrationNumber",
          "courseId",
          "fullName",
          "nik",
          "tempatLahir",
          "tanggalLahir",
          "golonganDarah",
          "provinsi",
          "kabupaten",
          "kecamatan",
          "kelurahan",
          "alamat",
          "email",
          "noWhatsapp",
          "pendidikanTerakhir",
          "namaSekolah",
          "noIjazah",
          "tanggalIjazah",
          "instansi",
          "bidangUsaha",
          "jabatan",
          "alamatPerusahaan",
          "tlpKantor",
          "emailPerusahaan",
          "paymentMethod",
          "paymentAmount",
          "paymentStatus",
          "formData",
          "status",
          "createdAt",
          "updatedAt"
        ) VALUES (
          gen_random_uuid(),
          $1,
          $2,
          $3,
          $4,
          $5,
          $6,
          $7,
          $8,
          $9,
          $10,
          $11,
          $12,
          $13,
          $14,
          $15,
          $16,
          $17,
          $18,
          $19,
          $20,
          $21,
          $22,
          $23,
          $24,
          $25,
          $26,
          $27,
          'pending',
          'pending',
          NOW(),
          NOW()
        ) RETURNING "id", "registrationNumber"
      `;

      const result = await sequelize.query(query, {
        replacements: [
          registrationNumber,
          courseId,
          fullName,
          nik,
          tempatLahir || null,
          tanggalLahir || null,
          golonganDarah || null,
          provinsi || null,
          kabupaten || null,
          kecamatan || null,
          kelurahan || null,
          alamat || null,
          email,
          noWhatsapp,
          pendidikanTerakhir || null,
          namaSekolah || null,
          noIjazah || null,
          tanggalIjazah || null,
          instansi || null,
          bidangUsaha || null,
          jabatan || null,
          alamatPerusahaan || null,
          tlpKantor || null,
          emailPerusahaan || null,
          paymentMethod || null,
          paymentAmount || null,
          JSON.stringify(documents),
        ],
      });

      console.log("✅ Saved to DB:", registrationNumber);
      console.log("📎 Files:", documents.length);

      res.status(201).json({
        success: true,
        message: "Pendaftaran berhasil disimpan",
        data: {
          registrationNumber,
          status: "pending",
          documentsCount: documents.length,
        },
      });
    } catch (error) {
      console.error("❌ Error:", error.message);
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }
);

router.get("/", (req, res) => {
  res.json({ success: true, data: [] });
});

module.exports = router;
