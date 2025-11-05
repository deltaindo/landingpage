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
    registration_number: {
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: false,
    },
    course_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    full_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    nik: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    tempat_lahir: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tanggal_lahir: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    golongan_darah: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    provinsi: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    kabupaten: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    kecamatan: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    kelurahan: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    alamat: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    no_whatsapp: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pendidikan_terakhir: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    nama_sekolah: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    no_ijazah: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tanggal_ijazah: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    instansi: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bidang_usaha: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    jabatan: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    alamat_perusahaan: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    tlp_kantor: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email_perusahaan: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING(20),
      defaultValue: "pending",
    },
    documents_json: {
      type: DataTypes.JSON,
      allowNull: true,
    },
  },
  {
    tableName: "registrations",
    timestamps: true,
    underscored: true,
  }
);

module.exports = Registration;
