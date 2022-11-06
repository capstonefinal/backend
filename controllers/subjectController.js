const asyncHandler = require('express-async-handler')

const Subject = require('../models/subjectModel')
const Course = require('../models/courseModel')

const getSubjects = asyncHandler(async (req, res, next) => {
    const subjects = await Subject.find({ user: req.body.user??req.user }).populate('course', ['courseName', 'yearLevel', 'students'])
    const courses = await Course.find().select(['courseName', 'yearLevel'])
    if (subjects) {
        // return res.status(200).json(subjects)
        return res.status(200).json({ courses, subjects })
    }
    res.status(400)
    throw new Error('Error')
})

const getSubject = asyncHandler(async (req, res) => {
    const subject = await Subject.findOne({ _id: req.params.subject, user: req.user }).populate('course', ['courseName', 'yearLevel', 'students'])
    if (subject) {
        return res.status(200).json(subject)
    }
    throw new Error('Subject not found')
})

const addSubject = asyncHandler(async (req, res) => {
    const { subjectName, course } = req.body
    const data = {
        subjectName,
        course,
        user: req.user
    }
    const newSubject = await Subject.create(data)
    if (newSubject) {
        return res.status(200).json(newSubject)
    }
})

const updateSubject = asyncHandler(async (req, res) => {
    const updatedSubject = await Subject.findOneAndUpdate({ _id: req.params.subject, user: req.user }, { $set: req.body })
    const subject = await Subject.find({ _id: req.params.subject, user: req.user })
    return res.status(200).json(subject)
})

const deleteSubject = asyncHandler(async (req, res) => {
    // return res.status(200).json(req.body)

    // return console.log(req.body);
    const subject = await Subject.findByIdAndRemove(req.body.subjectId)
    return res.status(200).json(subject)
})
const getStudents = asyncHandler(async (req, res) => {
    const students = await Subject.findById(req.params.subject).select(['students', '-_id'])
    return res.status(200).json(students.students)
})
const addStudent = asyncHandler(async (req, res) => {
    const updatedSubject = await Subject.findByIdAndUpdate(req.params.subject, { students: req.body.students }, { new: true })
    return res.status(200).json(updatedSubject)
})
const updateStudent = asyncHandler(async (req, res) => {
    await Subject.updateOne({ _id: req.params.subject }, { $pull: { students: { _id: req.params.student } } })
    await Subject.updateOne({ _id: req.params.subject }, { $push: { students: req.body } })
    return res.status(200).json({
        message: 'Record updated'
    })
})
const deleteStudent = asyncHandler(async (req, res) => {
    await Subject.updateOne({ _id: req.params.subject }, { $pull: { students: { _id: req.params.student } } })

    return res.status(200).json({
        message: 'Record deleted'
    })
})

module.exports = {
    getSubjects,
    addSubject,
    getSubject,
    updateSubject,
    deleteSubject,
    getStudents,
    addStudent,
    updateStudent,
    deleteStudent
}
