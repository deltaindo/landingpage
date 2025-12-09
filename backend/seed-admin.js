/**
 * Seed Script - Creates demo admin user
 * Run with: node seed-admin.js
 */

const dotenv = require("dotenv");
const { connectDB, sequelize } = require("./src/config/database");
const { User } = require("./src/models");
const bcrypt = require("bcryptjs");

dotenv.config();

const seedAdmin = async () => {
  try {
    console.log("🌱 Starting database seed...");

    // Connect to database
    await connectDB();
    console.log("✅ Connected to database");

    // Check if admin user already exists
    const existingAdmin = await User.findOne({
      where: { email: "admin@deltaindonesia.com" },
    });

    if (existingAdmin) {
      console.log("⚠️  Admin user already exists! Skipping...");
      console.log(`   Email: ${existingAdmin.email}`);
      console.log(`   Name: ${existingAdmin.name}`);
      console.log(`   Role: ${existingAdmin.role}`);
      await sequelize.close();
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash("password123", 10);

    // Create admin user
    const adminUser = await User.create({
      email: "admin@deltaindonesia.com",
      password: hashedPassword,
      name: "Admin User",
      role: "admin",
      isActive: true,
    });

    console.log("✅ Admin user created successfully!");
    console.log("\n📝 Demo Credentials:");
    console.log("   Email: admin@deltaindonesia.com");
    console.log("   Password: password123");
    console.log("   Role: admin");
    console.log("\n🎉 You can now login to the admin panel!");

    await sequelize.close();
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error.message);
    await sequelize.close();
    process.exit(1);
  }
};

seedAdmin();
