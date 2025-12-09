"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * 🌱 PostgreSQL Seeder for Admin Users
     * Inserts default users into the database
     */

    const bcrypt = require("bcryptjs");
    const salt = await bcrypt.genSalt(10);

    // Hash passwords
    const hashedPassword = await bcrypt.hash("password123", salt);

    // Seed data
    const users = [
      {
        id: require("uuid").v4(),
        email: "admin@deltaindonesia.com",
        password: hashedPassword,
        name: "Admin User",
        role: "admin",
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: require("uuid").v4(),
        email: "editor@deltaindonesia.com",
        password: hashedPassword,
        name: "Editor User",
        role: "editor",
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: require("uuid").v4(),
        email: "pic@deltaindonesia.com",
        password: hashedPassword,
        name: "PIC User",
        role: "pic",
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: require("uuid").v4(),
        email: "viewer@deltaindonesia.com",
        password: hashedPassword,
        name: "Viewer User",
        role: "viewer",
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    // Check if admin already exists to avoid duplicates
    const existingAdmin = await queryInterface.sequelize.query(
      `SELECT * FROM users WHERE email = 'admin@deltaindonesia.com'`
    );

    if (existingAdmin[0].length === 0) {
      // Insert users if they don't exist
      await queryInterface.bulkInsert("users", users);
      console.log("✅ Admin and default users seeded successfully!");
    } else {
      console.log("⏭️  Admin users already exist. Skipping seeding.");
    }
  },

  async down(queryInterface, Sequelize) {
    /**
     * Revert seeding - remove seeded users
     */
    await queryInterface.bulkDelete("users", {
      email: [
        "admin@deltaindonesia.com",
        "editor@deltaindonesia.com",
        "pic@deltaindonesia.com",
        "viewer@deltaindonesia.com",
      ],
    });
  },
};
