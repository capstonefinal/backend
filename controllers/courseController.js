const asyncHandler = require('express-async-handler')

const Course = require('../models/courseModel')

const getCourses = asyncHandler(async (req, res, next) => {
    const courses = await Course.find()
    if (courses) {
        return res.status(200).json(courses)
    }
    res.status(400)
    throw new Error('Error')
})

const getCourse = asyncHandler(async (req, res) => {
    const course = await Course.findById(req.params.course)
    if (course) {
        return res.status(200).json(course)
    }
    throw new Error('Course not found')
})

const addCourse = asyncHandler(async (req, res) => {
    const newCourse = await Course.create(req.body)
    if (newCourse) {
        return res.status(200).json(newCourse)
    }
})

const updateCourse = asyncHandler(async (req, res) => {
    const updatedCourse = await Course.findByIdAndUpdate(req.params.course, { $set: req.body })
    // console.log(req.body);

    // res.status(200).json(req.body.students)
    // return res.status(200).json(updatedCourse)
    // console.log(req.body);
    return res.status(200).json(updatedCourse)
})

const deleteCourse = asyncHandler(async (req, res) => {
    const course = await Course.findByIdAndRemove(req.params.course)
    return res.status(200).json(course)
})
const getStudents = asyncHandler(async (req, res) => {
    const students = await Course.findById(req.params.course).select(['students', '-_id'])
    return res.status(200).json(students.students)
})
const addStudent = asyncHandler(async (req, res) => {
    const updatedCourse = await Course.findByIdAndUpdate(req.params.course, { students: req.body.students }, { new: true })
    return res.status(200).json(updatedCourse)
})
const updateStudent = asyncHandler(async (req, res) => {
    await Course.updateOne({ _id: req.params.course }, { $pull: { students: { _id: req.params.student } } })
    await Course.updateOne({ _id: req.params.course }, { $push: { students: req.body } })
    return res.status(200).json({
        message: 'Record updated'
    })
})
const deleteStudent = asyncHandler(async (req, res) => {
    await Course.updateOne({ _id: req.params.course }, { $pull: { students: { _id: req.params.student } } })

    return res.status(200).json({
        message: 'Record deleted'
    })
})

module.exports = {
    getCourses,
    addCourse,
    getCourse,
    updateCourse,
    deleteCourse,
    getStudents,
    addStudent,
    updateStudent,
    deleteStudent
}
