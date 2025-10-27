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
    registration_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    document_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    document_label: {
      type: DataTypes.STRING,
    },
    file_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    file_size: {
      type: DataTypes.INTEGER,
    },
    file_type: {
      type: DataTypes.STRING,
    },
    uploaded_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "registration_documents",
    timestamps: false,
  }
);

module.exports = RegistrationDocument;
