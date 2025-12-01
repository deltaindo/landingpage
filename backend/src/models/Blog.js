const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Blog = sequelize.define(
  "Blog",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING(255),
      unique: true,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM("featured", "media-release"),
      defaultValue: "media-release",
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    excerpt: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    featuredImage: {
      type: DataTypes.STRING(500),
      allowNull: false,
      field: "featured_image",
    },
    author: {
      type: DataTypes.STRING(100),
      defaultValue: "Delta Indonesia",
    },
    category: {
      type: DataTypes.STRING(100),
      defaultValue: "Media Release",
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
    },
    status: {
      type: DataTypes.ENUM("draft", "published", "archived"),
      defaultValue: "draft",
    },
    publishedAt: {
      type: DataTypes.DATE,
      field: "published_at",
    },
    views: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    seo: {
      type: DataTypes.JSONB,
      defaultValue: {},
    },
  },
  {
    tableName: "blog_posts",
    timestamps: true,
    underscored: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

// Add validation and relationships
const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, maxlength: 255 },
    slug: { type: String, required: true, unique: true },
    type: {
      type: String,
      enum: ["featured", "media-release"],
      default: "media-release",
    },
    content: { type: String, required: true },
    excerpt: { type: String, required: true, maxlength: 200 },
    featuredImage: { type: String, required: true },
    author: { type: String, default: "Delta Indonesia" },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "draft",
    },
    publishedAt: Date,
    scheduledAt: Date, // For scheduled publishing
    views: { type: Number, default: 0 },
    seo: {
      metaTitle: String,
      metaDescription: String,
      keywords: [String],
      ogImage: String,
    },
  },
  {
    timestamps: true,
  }
);

// Auto-generate slug from title
blogSchema.pre("save", function (next) {
  if (this.isModified("title") && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  }
  next();
});

module.exports = mongoose.model("Blog", blogSchema);

module.exports = Blog;
