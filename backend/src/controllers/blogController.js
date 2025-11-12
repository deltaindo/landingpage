const Blog = require("../models/Blog");
const { uploadToStorage } = require("../utils/storage");

// Get all blogs (with pagination and filters)
exports.getAllBlogs = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      status,
      type,
      search,
      sort = "-createdAt",
    } = req.query;

    const query = {};

    if (status) query.status = status;
    if (type) query.type = type;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } },
        { tags: { $regex: search, $options: "i" } },
      ];
    }

    const blogs = await Blog.find(query)
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Blog.countDocuments(query);

    res.json({
      success: true,
      data: blogs,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count,
    });
  } catch (error) {
    next(error);
  }
};

// Get single blog by slug
exports.getBlogBySlug = async (req, res, next) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });

    if (!blog) {
      return res.status(404).json({
        success: false,
        error: "Blog not found",
      });
    }

    // Increment views
    blog.views += 1;
    await blog.save();

    res.json({
      success: true,
      data: blog,
    });
  } catch (error) {
    next(error);
  }
};

// Create new blog
exports.createBlog = async (req, res, next) => {
  try {
    const blogData = req.body;

    // Handle image upload if provided
    if (req.file) {
      blogData.featuredImage = await uploadToStorage(req.file);
    }

    const blog = await Blog.create(blogData);

    res.status(201).json({
      success: true,
      data: blog,
      message: "Blog created successfully",
    });
  } catch (error) {
    next(error);
  }
};

// Update blog
exports.updateBlog = async (req, res, next) => {
  try {
    const updates = req.body;

    // Handle image upload if provided
    if (req.file) {
      updates.featuredImage = await uploadToStorage(req.file);
    }

    const blog = await Blog.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });

    if (!blog) {
      return res.status(404).json({
        success: false,
        error: "Blog not found",
      });
    }

    res.json({
      success: true,
      data: blog,
      message: "Blog updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

// Delete blog
exports.deleteBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        error: "Blog not found",
      });
    }

    res.json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

// Publish blog
exports.publishBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { status: "published", publishedAt: new Date() },
      { new: true }
    );

    if (!blog) {
      return res.status(404).json({
        success: false,
        error: "Blog not found",
      });
    }

    res.json({
      success: true,
      data: blog,
      message: "Blog published successfully",
    });
  } catch (error) {
    next(error);
  }
};
