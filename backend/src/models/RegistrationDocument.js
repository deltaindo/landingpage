const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const RegistrationDocument = sequelize.define(
  "RegistrationDocument",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    registrationId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "registrationId",
    },
    documentType: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    documentLabel: {
      type: DataTypes.STRING(255),
    },
    fileUrl: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    fileSize: {
      type: DataTypes.INTEGER,
    },
    fileType: {
      type: DataTypes.STRING(50),
    },
    uploadedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "registrationDocuments",
    timestamps: false,
  }
);

module.exports = RegistrationDocument;
