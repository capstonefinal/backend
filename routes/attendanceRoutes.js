const express = require('express');
const router = express.Router()
const { protect } = require('../middlewares/authMiddleware')

const {
    scanID,
    timedInOrOutStudents
} = require('../controllers/attendanceController')

router.route('/')
    .post(protect, scanID)
    .get(timedInOrOutStudents)
router.route('/:subjectID')
    .get(timedInOrOutStudents)

module.exports = router