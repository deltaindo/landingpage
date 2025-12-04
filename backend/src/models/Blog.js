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
    categoryId: {
      type: DataTypes.UUID,
      allowNull: true,
      field: "category_id",
      references: {
        model: "blog_categories",
        key: "id",
      },
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
      allowNull: true,
      field: "published_at",
    },
    scheduledAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "scheduled_at",
    },
    views: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    seo: {
      type: DataTypes.JSONB,
      defaultValue: {
        metaTitle: null,
        metaDescription: null,
        keywords: [],
        ogImage: null,
      },
    },
  },
  {
    tableName: "blog_posts",
    timestamps: true,
    underscored: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    hooks: {
      beforeValidate: (blog) => {
        // Auto-generate slug from title if not provided
        if (blog.title && !blog.slug) {
          blog.slug = blog.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, "");
        }
      },
    },
  }
);

module.exports = Blog;
