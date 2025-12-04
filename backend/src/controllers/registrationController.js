const Registration = require("../models/Registration");
const Course = require("../models/Course");
const { sendEmail } = require("../config/email");
const { uploadToStorage } = require("../utils/storage");

// Create new registration
exports.createRegistration = async (req, res, next) => {
  try {
    const { courseId, scheduleIndex, formData } = req.body;

    // Get course
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        error: "Course not found",
      });
    }

    const schedule = course.schedule[scheduleIndex];
    if (!schedule || schedule.status !== "open") {
      return res.status(400).json({
        success: false,
        error: "Schedule not available",
      });
    }

    // Handle file uploads
    const documents = [];
    if (req.files) {
      for (const file of req.files) {
        const url = await uploadToStorage(file);
        documents.push({
          type: file.fieldname,
          label: file.originalname,
          url,
        });
      }
    }

    // Create registration
    const registration = await Registration.create({
      course: courseId,
      schedule: {
        startDate: schedule.startDate,
        endDate: schedule.endDate,
        location: schedule.location,
      },
      formData: formData,
      personalInfo: {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender,
        idNumber: formData.idNumber,
      },
      companyInfo: {
        companyName: formData.companyName,
        position: formData.position,
        department: formData.department,
        address: formData.companyAddress,
      },
      documentsData,
      paymentInfo: {
        method: formData.paymentMethod,
        amount: course.price.regular,
      },
    });

    // Update course enrollment count
    course.schedule[scheduleIndex].currentParticipants += 1;
    course.totalEnrollments += 1;
    await course.save();

    // Send confirmation email
    await sendEmail({
      to: formData.email,
      subject: `Konfirmasi Pendaftaran - ${course.name}`,
      html: `
        <h2>Terima kasih telah mendaftar!</h2>
        <p>Halo ${formData.fullName},</p>
        <p>Pendaftaran Anda untuk pelatihan <strong>${
          course.name
        }</strong> telah kami terima.</p>
        <p><strong>Nomor Registrasi:</strong> ${
          registration.registrationNumber
        }</p>
        <p><strong>Jadwal:</strong> ${new Date(
          schedule.startDate
        ).toLocaleDateString("id-ID")} - ${new Date(
        schedule.endDate
      ).toLocaleDateString("id-ID")}</p>
        <p>Kami akan menghubungi Anda segera untuk informasi lebih lanjut.</p>
        <br>
        <p>Salam,<br>Tim Delta Indonesia</p>
      `,
    });

    res.status(201).json({
      success: true,
      data: registration,
      message: "Registration submitted successfully",
    });
  } catch (error) {
    next(error);
  }
};

// Get all registrations
exports.getAllRegistrations = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 20,
      status,
      courseId,
      search,
      sort = "-createdAt",
    } = req.query;

    const query = {};

    if (status) query.status = status;
    if (courseId) query.course = courseId;
    if (search) {
      query.$or = [
        { registrationNumber: { $regex: search, $options: "i" } },
        { "personalInfo.fullName": { $regex: search, $options: "i" } },
        { "personalInfo.email": { $regex: search, $options: "i" } },
      ];
    }

    const registrations = await Registration.find(query)
      .populate("course")
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Registration.countDocuments(query);

    res.json({
      success: true,
      data: registrations,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count,
    });
  } catch (error) {
    next(error);
  }
};

// Get single registration
exports.getRegistrationById = async (req, res, next) => {
  try {
    const registration = await Registration.findById(req.params.id).populate(
      "course"
    );

    if (!registration) {
      return res.status(404).json({
        success: false,
        error: "Registration not found",
      });
    }

    res.json({
      success: true,
      data: registration,
    });
  } catch (error) {
    next(error);
  }
};

// Update registration status
exports.updateRegistrationStatus = async (req, res, next) => {
  try {
    const { status, adminNotes } = req.body;

    const registration = await Registration.findByIdAndUpdate(
      req.params.id,
      { status, adminNotes },
      { new: true }
    ).populate("course");

    if (!registration) {
      return res.status(404).json({
        success: false,
        error: "Registration not found",
      });
    }

    // Send status update email
    await sendEmail({
      to: registration.personalInfo.email,
      subject: `Update Status Pendaftaran - ${registration.registrationNumber}`,
      html: `
        <h2>Update Status Pendaftaran</h2>
        <p>Halo ${registration.personalInfo.fullName},</p>
        <p>Status pendaftaran Anda telah diupdate menjadi: <strong>${status}</strong></p>
        <p><strong>Nomor Registrasi:</strong> ${
          registration.registrationNumber
        }</p>
        ${adminNotes ? `<p><strong>Catatan:</strong> ${adminNotes}</p>` : ""}
        <br>
        <p>Salam,<br>Tim Delta Indonesia</p>
      `,
    });

    res.json({
      success: true,
      data: registration,
      message: "Registration status updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

// Get registration statistics
exports.getRegistrationStats = async (req, res, next) => {
  try {
    const stats = await Registration.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
          totalAmount: { $sum: "$paymentInfo.amount" },
        },
      },
    ]);

    const recentRegistrations = await Registration.find()
      .populate("course", "name")
      .sort("-createdAt")
      .limit(10);

    res.json({
      success: true,
      data: {
        statusBreakdown: stats,
        recentRegistrations,
      },
    });
  } catch (error) {
    next(error);
  }
};
