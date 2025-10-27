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
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    category: {
      type: DataTypes.ENUM("kemnaker", "bnsp", "migas", "inhouse"),
      allowNull: false,
    },
    certification: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    duration: {
      type: DataTypes.JSONB,
      defaultValue: { value: 0, unit: "days" },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    objectives: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      defaultValue: [],
    },
    prerequisites: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      defaultValue: [],
    },
    syllabus: {
      type: DataTypes.JSONB,
      defaultValue: [],
    },
    price: {
      type: DataTypes.JSONB,
      defaultValue: { regular: 0, earlyBird: 0, group: 0, currency: "IDR" },
    },
    schedule: {
      type: DataTypes.JSONB,
      defaultValue: [],
    },
    instructor: {
      type: DataTypes.JSONB,
      defaultValue: {},
    },
    images: {
      type: DataTypes.ARRAY(DataTypes.JSONB),
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
    rating: {
      type: DataTypes.JSONB,
      defaultValue: { average: 0, count: 0 },
    },
  },
  {
    timestamps: true,
    hooks: {
      beforeValidate: (course) => {
        if (!course.code) {
          const prefix = course.category.substring(0, 3).toUpperCase();
          const random = Math.random()
            .toString(36)
            .substring(2, 8)
            .toUpperCase();
          course.code = `${prefix}-${random}`;
        }
      },
    },
  }
);

module.exports = Course;
