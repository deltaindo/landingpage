const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const slugify = require("slugify");

const Blog = sequelize.define(
  "Blog",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
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
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      defaultValue: "Delta Indonesia",
    },
    category: {
      type: DataTypes.STRING,
      defaultValue: "Media Release",
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
    },
    status: {
      type: DataTypes.ENUM("draft", "published", "archived"),
      defaultValue: "draft",
    },
    publishedAt: {
      type: DataTypes.DATE,
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
    timestamps: true,
    hooks: {
      beforeValidate: (blog) => {
        if (blog.title && !blog.slug) {
          blog.slug = slugify(blog.title, { lower: true, strict: true });
        }
      },
      beforeUpdate: (blog) => {
        if (
          blog.changed("status") &&
          blog.status === "published" &&
          !blog.publishedAt
        ) {
          blog.publishedAt = new Date();
        }
      },
    },
  }
);

module.exports = Blog;
