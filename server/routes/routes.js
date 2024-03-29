const router = require('express').Router();
const userRoutes = require("./userRoute.js")
const authRoutes = require("./auth.route.js")

const base = "/api/v1"

router.use(`${base}/users`, userRoutes);
router.use(`${base}/auth`, authRoutes);

module.exports = router