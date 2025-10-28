const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const FormTemplate = sequelize.define(
  "FormTemplate",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      unique: true,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    sections: {
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: [],
    },
    status: {
      type: DataTypes.ENUM("active", "inactive"),
      defaultValue: "active",
    },
    isDefault: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "formTemplates",
    timestamps: true,
    underscored: false,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  }
);

module.exports = FormTemplate;
