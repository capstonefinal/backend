const express = require('express');
const router = express.Router()
const { protect } = require('../middlewares/authMiddleware')

const {
    getSubjects,
    addSubject,
    getSubject,
    updateSubject,
    deleteSubject,
    getStudents,
    addStudent,
    updateStudent,
    deleteStudent
} = require('../controllers/subjectController')

router.route('/')
    .get(protect, getSubjects)
    .post(protect, addSubject)

router.route('/:subject')
    .get(protect, getSubject)
    .patch(protect, updateSubject)
    .delete(protect, deleteSubject)

router.route('/:subject/students')
    .get(getStudents)
    .post(addStudent)

router.route('/:subject/students/:student')
    .patch(updateStudent)
    .delete(deleteStudent)

module.exports = router