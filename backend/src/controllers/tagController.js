const Tag = require("../models/Tag");

exports.getAllTags = async (req, res, next) => {
  try {
    const tags = await Tag.find().sort("name");
    res.json({ success: true, data: tags });
  } catch (error) {
    next(error);
  }
};

exports.createTag = async (req, res, next) => {
  try {
    const tag = await Tag.create(req.body);
    res.status(201).json({ success: true, data: tag });
  } catch (error) {
    next(error);
  }
};

exports.bulkCreateTags = async (req, res, next) => {
  try {
    const { tags } = req.body; // Array of tag names
    const createdTags = await Promise.all(
      tags.map((name) =>
        Tag.findOneAndUpdate(
          { name },
          { name, slug: name.toLowerCase().replace(/\s+/g, "-") },
          { upsert: true, new: true }
        )
      )
    );
    res.status(201).json({ success: true, data: createdTags });
  } catch (error) {
    next(error);
  }
};
