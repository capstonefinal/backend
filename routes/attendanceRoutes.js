const express = require('express');
const router = express.Router()
const { protect } = require('../middlewares/authMiddleware')

const {
    scanID,
} = require('../controllers/attendanceController')

router.route('/')
    .post(protect, scanID)

module.exports = router