const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const CourseSchedule = sequelize.define(
  "CourseSchedule",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    courseId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "courseId", // Match database column
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
    },
    type: {
      type: DataTypes.ENUM("online", "offline", "hybrid"),
    },
    maxParticipants: {
      type: DataTypes.INTEGER,
    },
    currentParticipants: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    status: {
      type: DataTypes.ENUM("open", "full", "closed", "cancelled"),
      defaultValue: "open",
    },
    whatsappGroup: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "courseSchedules",
    timestamps: true,
    underscored: false,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  }
);

module.exports = CourseSchedule;
