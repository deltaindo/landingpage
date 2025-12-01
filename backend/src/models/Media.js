const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Media = sequelize.define(
  "Media",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    filename: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    originalName: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: "original_name",
    },
    fileUrl: {
      type: DataTypes.STRING(500),
      allowNull: false,
      field: "file_url",
    },
    fileType: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: "file_type",
    },
    fileSize: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "file_size",
    },
    mimeType: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: "mime_type",
    },
    alt: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    caption: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    uploadedBy: {
      type: DataTypes.UUID,
      allowNull: true,
      field: "uploaded_by",
    },
  },
  {
    tableName: "media_library",
    timestamps: true,
    underscored: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = Media;
