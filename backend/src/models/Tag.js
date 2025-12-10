const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Tag = sequelize.define(
  "Tag",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    slug: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: "blog_tags",
    timestamps: true,
    underscored: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
    hooks: {
      beforeValidate: (tag) => {
        if (tag.name && !tag.slug) {
          tag.slug = tag.name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, "");
        }
      },
    },
  }
);

module.exports = Tag;
