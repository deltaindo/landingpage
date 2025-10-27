const express = require("express");
const router = express.Router();
const {
  Registration,
  RegistrationDocument,
  Course,
  CourseSchedule,
} = require("../models");
const multer = require("multer");
const path = require("path");
const { body, validationResult } = require("express-validator");
const { sendEmail } = require("../config/email");

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/documents/");
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
      cb(new Error("Only JPG, PNG, and PDF files are allowed!"));
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
  ]),
  [
    body("courseId").notEmpty().withMessage("Course ID is required"),
    body("full_name").trim().notEmpty().withMessage("Full name is required"),
    body("nik")
      .isLength({ min: 16, max: 16 })
      .withMessage("NIK must be 16 digits"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("no_whatsapp").notEmpty().withMessage("WhatsApp number is required"),
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
      }

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

      // Verify course exists
      const course = await Course.findByPk(courseId);
      if (!course) {
        return res.status(404).json({
          success: false,
          error: "Course not found",
        });
      }

      // Create registration
      const registration = await Registration.create({
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
        payment_amount: course.price_regular,
        status: "pending",
      });

      // Handle document uploads
      if (req.files) {
        const documentPromises = [];

        Object.keys(req.files).forEach((fieldname) => {
          const file = req.files[fieldname];
          documentPromises.push(
            RegistrationDocument.create({
              registration_id: registration.id,
              document_type: fieldname,
              document_label: fieldname
                .replace("doc_", "")
                .replace("_", " ")
                .toUpperCase(),
              file_url: `/uploads/documents/${file.filename}`,
              file_size: file.size,
              file_type: file.mimetype,
            })
          );
        });

        await Promise.all(documentPromises);
      }

      // Send confirmation email
      try {
        await sendEmail({
          to: email,
          subject: "Konfirmasi Pendaftaran - Delta Indonesia",
          html: `
            <h2>Terima kasih telah mendaftar!</h2>
            <p>Halo <strong>${full_name}</strong>,</p>
            <p>Pendaftaran Anda untuk pelatihan <strong>${course.name}</strong> telah kami terima.</p>
            <p><strong>Nomor Registrasi:</strong> ${registration.registration_number}</p>
            <p><strong>Status:</strong> Menunggu Konfirmasi</p>
            <br>
            <p>Tim kami akan menghubungi Anda melalui WhatsApp di nomor <strong>${no_whatsapp}</strong> untuk informasi lebih lanjut.</p>
            <br>
            <p>Salam,<br><strong>Tim Delta Indonesia</strong></p>
          `,
        });
      } catch (emailError) {
        console.error("Email sending failed:", emailError);
        // Don't fail the registration if email fails
      }

      res.status(201).json({
        success: true,
        message: "Registration successful",
        data: {
          registration_number: registration.registration_number,
          course_name: course.name,
          status: registration.status,
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

// GET all registrations (admin)
router.get("/", async (req, res, next) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;

    const where = {};
    if (status) {
      where.status = status;
    }

    const offset = (page - 1) * limit;

    const { count, rows } = await Registration.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset,
      include: [
        {
          model: Course,
          as: "course",
          attributes: ["name", "code", "category"],
        },
      ],
      order: [["created_at", "DESC"]],
    });

    res.json({
      success: true,
      data: rows,
      pagination: {
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(count / limit),
      },
    });
  } catch (error) {
    next(error);
  }
});

// GET single registration
router.get("/:id", async (req, res, next) => {
  try {
    const registration = await Registration.findByPk(req.params.id, {
      include: [
        {
          model: Course,
          as: "course",
        },
        {
          model: CourseSchedule,
          as: "schedule",
        },
        {
          model: RegistrationDocument,
          as: "documents",
        },
      ],
    });

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
    next(error);
  }
});

module.exports = router;
