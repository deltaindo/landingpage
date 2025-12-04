const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Course = sequelize.define(
  "Course",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    code: {
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    category: {
      type: DataTypes.ENUM("kemnaker", "bnsp", "migas", "inhouse"),
      allowNull: false,
    },
    certification: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    durationValue: {
      type: DataTypes.INTEGER,
    },
    durationUnit: {
      type: DataTypes.STRING(20),
      defaultValue: "days",
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    objectives: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
    },
    prerequisites: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
    },
    syllabus: {
      type: DataTypes.JSONB,
      defaultValue: [],
    },
    priceRegular: {
      type: DataTypes.DECIMAL(15, 2),
    },
    priceEarlyBird: {
      type: DataTypes.DECIMAL(15, 2),
    },
    priceGroup: {
      type: DataTypes.DECIMAL(15, 2),
    },
    currency: {
      type: DataTypes.STRING(10),
      defaultValue: "IDR",
    },
    instructor: {
      type: DataTypes.JSONB,
      defaultValue: {},
    },
    images: {
      type: DataTypes.JSONB,
      defaultValue: [],
    },
    featured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    status: {
      type: DataTypes.ENUM("active", "inactive", "archived"),
      defaultValue: "active",
    },
    totalEnrollments: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    ratingAverage: {
      type: DataTypes.DECIMAL(3, 2),
      defaultValue: 0.0,
    },
    ratingCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    tableName: "courses",
    timestamps: true,
    underscored: false, // Use camelCase
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  }
);

module.exports = Course;
