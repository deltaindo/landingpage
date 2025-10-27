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
    course_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
    },
    type: {
      type: DataTypes.ENUM("online", "offline", "hybrid"),
    },
    max_participants: {
      type: DataTypes.INTEGER,
    },
    current_participants: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    status: {
      type: DataTypes.ENUM("open", "full", "closed", "cancelled"),
      defaultValue: "open",
    },
    whatsapp_group: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "course_schedules",
    timestamps: true,
    underscored: true,
  }
);

module.exports = CourseSchedule;
