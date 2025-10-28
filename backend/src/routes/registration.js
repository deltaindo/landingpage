// GET single registration
router.get("/:id", async (req, res, next) => {
  try {
    const registration = await Registration.findByPk(req.params.id, {
      include: [
        {
          model: Course,
          as: "course",
        },
        {
          model: CourseSchedule,
          as: "courseSchedule", // ✅ Use 'courseSchedule' NOT 'schedule'
        },
        {
          model: RegistrationDocument,
          as: "documents",
        },
      ],
    });

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
});
