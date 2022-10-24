const express = require('express');
const router = express.Router()

const { getCourses, addCourse, getCourse, updateCourse, deleteCourse, getStudents, addStudent, updateStudent, deleteStudent } = require('../controllers/courseController')

router.route('/')
    .get(getCourses)
    .post(addCourse)

router.route('/:course')
    .get(getCourse)
    .patch(updateCourse)
    .delete(deleteCourse)

router.route('/:course/students')
    .get(getStudents)
    .post(addStudent)

router.route('/:course/students/:student')
    .patch(updateStudent)
    .delete(deleteStudent)

// router.route('/:id').put(updateCourse).delete(deleteCourse).get(getCourse)

module.exports = router