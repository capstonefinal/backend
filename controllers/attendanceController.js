const asyncHandler = require('express-async-handler')

// const Subject = require('../models/subjectModel')
const Course = require('../models/courseModel')

const scanID = asyncHandler(async (req, res, next) => {
    // const subjects = await Subject.find({ user: req.user }).populate('course', ['courseName', 'yearLevel', 'students'])

    // return res.status(200).json({ message: 'test' })

    const course = await Course.findOne({ _id: '6320cc4f4814b72e5f0a7518' })
    const studentExists = await course.students.filter((student) => student.studentId == req.body.studentId)[0]
    if (course) {
        // return res.status(200).json(subjects)
        console.log(studentExists);
        return res.status(200).json(studentExists)
    }
    //check if already timed in/out
    //if type time-out .. check if has time-in
    res.status(400)
    throw new Error('Error')
})

module.exports = {
    scanID,
}
