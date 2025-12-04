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
      console.log("📝 POST received");

      const data = req.body;
      const courseId = data.courseId;
      const fullName = data.full_name || data.fullName;
      const nik = data.nik;
      const tempatLahir = data.tempat_lahir || data.tempatLahir;
      const tanggalLahir = data.tanggal_lahir || data.tanggalLahir;
      const golonganDarah = data.golongan_darah || data.golonganDarah;
      const provinsi = data.provinsi;
      const kabupaten = data.kabupaten;
      const kecamatan = data.kecamatan;
      const kelurahan = data.kelurahan;
      const alamat = data.alamat;
      const email = data.email;
      const noWhatsapp = data.no_whatsapp || data.noWhatsapp;
      const pendidikanTerakhir =
        data.pendidikan_terakhir || data.pendidikanTerakhir;
      const namaSekolah = data.nama_sekolah || data.namaSekolah;
      const noIjazah = data.no_ijazah || data.noIjazah;
      const tanggalIjazah = data.tanggal_ijazah || data.tanggalIjazah;
      const instansi = data.instansi;
      const bidangUsaha = data.bidang_usaha || data.bidangUsaha;
      const jabatan = data.jabatan;
      const alamatPerusahaan = data.alamat_perusahaan || data.alamatPerusahaan;
      const tlpKantor = data.tlp_kantor || data.tlpKantor;
      const emailPerusahaan = data.email_perusahaan || data.emailPerusahaan;

      if (!courseId || !fullName || !nik || !email || !noWhatsapp) {
        return res.status(400).json({
          success: false,
          error: "Missing required fields",
        });
      }

      const now = new Date();
      const yearMonth = now.toISOString().slice(2, 7).replace("-", "");
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      const registrationNumber = `REG-${yearMonth}-${randomNum}`;

      const documents = [];
      if (req.files) {
        for (const [fieldname, fileArray] of Object.entries(req.files)) {
          if (fileArray && fileArray[0]) {
            const file = fileArray[0];
            documents.push({
              type: fieldname,
              filename: file.filename,
              size: file.size,
            });
          }
        }
      }

      const query = `
        INSERT INTO "registrations" (
          "registrationNumber", "courseId", "fullName", "nik",
          "tempatLahir", "tanggalLahir", "golonganDarah",
          "provinsi", "kabupaten", "kecamatan", "kelurahan",
          "alamat", "email", "noWhatsapp",
          "pendidikanTerakhir", "namaSekolah", "noIjazah", "tanggalIjazah",
          "instansi", "bidangUsaha", "jabatan",
          "alamatPerusahaan", "tlpKantor", "emailPerusahaan",
          "formData", "paymentStatus", "status",
          "createdAt", "updatedAt"
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
          $11, $12, $13, $14, $15, $16, $17, $18, $19, $20,
          $21, $22, $23, $24, $25, $26, $27, NOW(), NOW()
        )
      `;

      await sequelize.query(query, {
        bind: [
          registrationNumber,
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
          JSON.stringify(documents),
          "pending",
          "pending",
        ],
      });

      console.log("✅ Saved:", registrationNumber);

      res.status(201).json({
        success: true,
        message: "Pendaftaran berhasil",
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
