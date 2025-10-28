const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Registration = sequelize.define(
  "Registration",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    registrationNumber: {
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: false,
    },
    courseId: {
      type: DataTypes.UUID,
      field: "courseId",
    },
    scheduleId: {
      type: DataTypes.UUID,
      field: "scheduleId",
    },

    // Personal Information
    fullName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    nik: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    tempatLahir: {
      type: DataTypes.STRING(100),
    },
    tanggalLahir: {
      type: DataTypes.DATE,
    },
    golonganDarah: {
      type: DataTypes.STRING(10),
    },

    // Address
    provinsi: DataTypes.STRING(100),
    kabupaten: DataTypes.STRING(100),
    kecamatan: DataTypes.STRING(100),
    kelurahan: DataTypes.STRING(100),
    alamat: DataTypes.TEXT,

    // Contact
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    noWhatsapp: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },

    // Education
    pendidikanTerakhir: DataTypes.STRING(50),
    namaSekolah: DataTypes.STRING(255),
    noIjazah: DataTypes.STRING(50),
    tanggalIjazah: DataTypes.DATE,

    // Company
    instansi: DataTypes.STRING(255),
    bidangUsaha: DataTypes.STRING(100),
    jabatan: DataTypes.STRING(100),
    alamatPerusahaan: DataTypes.TEXT,
    tlpKantor: DataTypes.STRING(20),
    emailPerusahaan: DataTypes.STRING(100),

    // Form Data
    formData: {
      type: DataTypes.JSONB,
      defaultValue: {},
    },

    // Payment
    paymentMethod: DataTypes.STRING(50),
    paymentAmount: DataTypes.DECIMAL(15, 2),
    paymentStatus: {
      type: DataTypes.ENUM("pending", "paid", "failed", "refunded"),
      defaultValue: "pending",
    },
    paidAt: DataTypes.DATE,
    invoiceNumber: DataTypes.STRING(50),

    // Status
    status: {
      type: DataTypes.ENUM(
        "pending",
        "confirmed",
        "attended",
        "completed",
        "cancelled"
      ),
      defaultValue: "pending",
    },
    notes: DataTypes.TEXT,
    adminNotes: DataTypes.TEXT,
  },
  {
    tableName: "registrations",
    timestamps: true,
    underscored: false,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  }
);

module.exports = Registration;
