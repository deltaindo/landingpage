const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const Course = require("./Course");

const Registration = sequelize.define(
  "Registration",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    registrationNumber: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    courseId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Course,
        key: "id",
      },
    },
    schedule: {
      type: DataTypes.JSONB,
      defaultValue: {},
    },
    formData: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    personalInfo: {
      type: DataTypes.JSONB,
      defaultValue: {},
    },
    companyInfo: {
      type: DataTypes.JSONB,
      defaultValue: {},
    },
    documents: {
      type: DataTypes.ARRAY(DataTypes.JSONB),
      defaultValue: [],
    },
    paymentInfo: {
      type: DataTypes.JSONB,
      defaultValue: {
        method: null,
        amount: 0,
        status: "pending",
      },
    },
    status: {
      type: DataTypes.ENUM(
        "pending",
        "confirmed",
        "attended",
        "completed",
        "cancelled"
      ),
      defaultValue: "pending",
    },
    notes: {
      type: DataTypes.TEXT,
    },
    adminNotes: {
      type: DataTypes.TEXT,
    },
  },
  {
    timestamps: true,
    hooks: {
      beforeCreate: async (registration) => {
        if (!registration.registrationNumber) {
          const date = new Date();
          const year = date.getFullYear().toString().substring(2);
          const month = (date.getMonth() + 1).toString().padStart(2, "0");

          // Get count of registrations this month
          const count = await Registration.count({
            where: {
              createdAt: {
                [sequelize.Sequelize.Op.gte]: new Date(
                  date.getFullYear(),
                  date.getMonth(),
                  1
                ),
                [sequelize.Sequelize.Op.lt]: new Date(
                  date.getFullYear(),
                  date.getMonth() + 1,
                  1
                ),
              },
            },
          });

          const sequence = (count + 1).toString().padStart(4, "0");
          registration.registrationNumber = `REG-${year}${month}-${sequence}`;
        }
      },
    },
  }
);

// Define associations
Registration.belongsTo(Course, { foreignKey: "courseId" });
Course.hasMany(Registration, { foreignKey: "courseId" });

module.exports = Registration;
