const { sequelize } = require("../config/database");

// Import all models
const Blog = require("./Blog");
const Course = require("./Course");
const CourseSchedule = require("./CourseSchedule");
const Registration = require("./Registration");
const RegistrationDocument = require("./RegistrationDocument");
const FormTemplate = require("./FormTemplate");
const User = require("./User");

// Define associations
Course.hasMany(CourseSchedule, {
  foreignKey: "course_id",
  as: "schedules",
});
CourseSchedule.belongsTo(Course, {
  foreignKey: "course_id",
  as: "course",
});

Course.hasMany(Registration, {
  foreignKey: "course_id",
  as: "registrations",
});
Registration.belongsTo(Course, {
  foreignKey: "course_id",
  as: "course",
});

Registration.belongsTo(CourseSchedule, {
  foreignKey: "schedule_id",
  as: "courseSchedule",
});
CourseSchedule.hasMany(Registration, {
  foreignKey: "schedule_id",
  as: "registrations",
});

Registration.hasMany(RegistrationDocument, {
  foreignKey: "registration_id",
  as: "documents",
});
RegistrationDocument.belongsTo(Registration, {
  foreignKey: "registration_id",
  as: "registration",
});

module.exports = {
  sequelize,
  Blog,
  Course,
  CourseSchedule,
  Registration,
  RegistrationDocument,
  FormTemplate,
  User,
};
