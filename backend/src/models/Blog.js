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

module.exports = Blog;
