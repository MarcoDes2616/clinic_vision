const express = require('express');
const userRouter = require('./users.routes');
const systemRouter = require('./system.routes');
const locationRouter = require('./location.routes');
const patientRouter = require('./patient.routes');
const clinicHistoryRouter = require('./clinicHistory.routes');
const router = express.Router();

// colocar las rutas aquí
router.use("/users", userRouter)

router.use("/system", systemRouter)

router.use('/location', locationRouter)

router.use("/patient", patientRouter)

router.use("/clinic-history", clinicHistoryRouter)

module.exports = router;