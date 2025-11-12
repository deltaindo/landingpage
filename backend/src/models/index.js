const { sequelize } = require("../config/database");

// Import all models
const User = require("./User");
const Blog = require("./Blog");
const Course = require("./Course");
const CourseSchedule = require("./CourseSchedule");
const Registration = require("./Registration");
const RegistrationDocument = require("./RegistrationDocument");
const FormTemplate = require("./FormTemplate");

// =====================================================
// DEFINE ASSOCIATIONS - FIXES ALIAS ERRORS
// =====================================================

// Course <-> CourseSchedule
Course.hasMany(CourseSchedule, {
  foreignKey: "courseId",
  as: "courseSchedules", // ✅ Match this alias everywhere
});
CourseSchedule.belongsTo(Course, {
  foreignKey: "courseId",
  as: "course",
});

// Course <-> Registration
Course.hasMany(Registration, {
  foreignKey: "courseId",
  as: "registrations",
});
Registration.belongsTo(Course, {
  foreignKey: "courseId",
  as: "course",
});

// CourseSchedule <-> Registration
CourseSchedule.hasMany(Registration, {
  foreignKey: "scheduleId",
  as: "registrations",
});
Registration.belongsTo(CourseSchedule, {
  foreignKey: "scheduleId",
  as: "courseSchedule", // ✅ Use 'courseSchedule' NOT 'schedule'
});

// Registration <-> RegistrationDocument
Registration.hasMany(RegistrationDocument, {
  foreignKey: "registrationId",
  as: "documents",
});
RegistrationDocument.belongsTo(Registration, {
  foreignKey: "registrationId",
  as: "registration",
});

// Export all models
module.exports = {
  sequelize,
  User,
  Blog,
  Course,
  CourseSchedule,
  Registration,
  RegistrationDocument,
  FormTemplate,
};
