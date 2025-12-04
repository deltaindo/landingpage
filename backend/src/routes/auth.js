const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { body, validationResult } = require("express-validator");

// Add this route to your existing auth.js routes

/**
 * 🔐 SSO Token Validation Endpoint
 *
 * This endpoint validates SSO tokens received from the SSO provider
 * When WireGuard VPN is active, this validation happens over encrypted tunnel
 */
router.post("/sso/validate", async (req, res, next) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({
        success: false,
        error: "SSO token required",
      });
    }

    // TODO: Implement actual SSO token validation
    // This should verify the token with your SSO provider
    // For now, this is a placeholder

    /*
     * WireGuard VPN Integration:
     * When VPN is active, you can add additional security checks:
     * 1. Verify request came through VPN (check X-VPN-Tunnel header)
     * 2. Validate client certificate if using mutual TLS
     * 3. Check IP is from VPN subnet
     */

    const isVPNRequest = req.headers["x-vpn-tunnel"] === "true";

    if (process.env.REQUIRE_VPN === "true" && !isVPNRequest) {
      return res.status(403).json({
        success: false,
        error: "VPN connection required for SSO",
      });
    }

    // Placeholder: Validate with SSO provider
    // const ssoValidation = await validateWithSSOProvider(token);

    // For now, return mock validation (REPLACE WITH ACTUAL IMPLEMENTATION)
    const user = {
      id: "123",
      email: "admin@deltaindonesia.com",
      name: "Admin User",
      role: "admin",
    };

    // Generate JWT token for your application
    const jwt = require("jsonwebtoken");
    const appToken = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.json({
      success: true,
      data: {
        token: appToken,
        user,
      },
    });
  } catch (error) {
    next(error);
  }
});

// Register (only for initial setup - remove in production)
router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Valid email is required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
    body("name").notEmpty().withMessage("Name is required"),
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
      }

      const { email, password, name, role } = req.body;

      // Check if user exists
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          error: "User already exists",
        });
      }

      // Create user
      const user = await User.create({
        email,
        password,
        name,
        role: role || "viewer",
      });

      // Generate token
      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRE || "7d" }
      );

      res.status(201).json({
        success: true,
        data: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
        token,
      });
    } catch (error) {
      next(error);
    }
  }
);

// Login
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
      }

      const { email, password } = req.body;

      // Find user
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({
          success: false,
          error: "Invalid credentials",
        });
      }

      // Check if user is active
      if (!user.isActive) {
        return res.status(401).json({
          success: false,
          error: "Account is disabled",
        });
      }

      // Check password
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          error: "Invalid credentials",
        });
      }

      // Generate token
      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRE || "7d" }
      );

      res.json({
        success: true,
        data: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
        token,
      });
    } catch (error) {
      next(error);
    }
  }
);

// Get current user
router.get("/me", async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ");
    if (!token) {
      return res.status(401).json({
        success: false,
        error: "Authentication required",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id, {
      attributes: { exclude: ["password"] },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
