const { User, sequelize } = require("../models");
const bcrypt = require("bcryptjs");

/**
 * 🌱 Admin User Seeder
 * 
 * Creates default admin user for the CMS
 * Run with: node backend/src/seeders/admin-seeder.js
 */

const seedAdminUser = async () => {
  try {
    // Check if admin already exists
    const existingAdmin = await User.findOne({
      where: { email: "admin@deltaindonesia.com" },
    });

    if (existingAdmin) {
      console.log("✅ Admin user already exists:");
      console.log(`   Email: ${existingAdmin.email}`);
      console.log(`   Role: ${existingAdmin.role}`);
      return;
    }

    // Create admin user
    const admin = await User.create({
      email: "admin@deltaindonesia.com",
      password: "password123", // Will be hashed by the beforeCreate hook
      name: "Admin User",
      role: "admin",
      isActive: true,
    });

    console.log("✅ Admin user created successfully!");
    console.log("\n📋 Login Credentials:");
    console.log("   Email: admin@deltaindonesia.com");
    console.log("   Password: password123");
    console.log("   Role: admin");
    console.log("\n🔐 IMPORTANT: Change this password in production!");

    return admin;
  } catch (error) {
    console.error("❌ Error seeding admin user:", error.message);
    throw error;
  }
};

/**
 * Seed additional users (editor, pic, viewer)
 */
const seedAdditionalUsers = async () => {
  try {
    const users = [
      {
        email: "editor@deltaindonesia.com",
        password: "password123",
        name: "Editor User",
        role: "editor",
      },
      {
        email: "pic@deltaindonesia.com",
        password: "password123",
        name: "PIC User",
        role: "pic",
      },
      {
        email: "viewer@deltaindonesia.com",
        password: "password123",
        name: "Viewer User",
        role: "viewer",
      },
    ];

    for (const userData of users) {
      const existing = await User.findOne({
        where: { email: userData.email },
      });

      if (!existing) {
        await User.create(userData);
        console.log(`✅ Created ${userData.role} user: ${userData.email}`);
      } else {
        console.log(`⏭️  Skipped ${userData.role} user (already exists): ${userData.email}`);
      }
    }
  } catch (error) {
    console.error("❌ Error seeding additional users:", error.message);
    throw error;
  }
};

// Run seeder
(async () => {
  try {
    console.log("🌱 Starting user seeder...\n");

    await seedAdminUser();
    console.log();
    await seedAdditionalUsers();

    console.log("\n✅ Seeding completed!");
    process.exit(0);
  } catch (error) {
    console.error("\n❌ Seeding failed:", error);
    process.exit(1);
  }
})();

module.exports = { seedAdminUser, seedAdditionalUsers };
