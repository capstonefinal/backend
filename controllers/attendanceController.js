const asyncHandler = require('express-async-handler')

// const Subject = require('../models/subjectModel')
const Course = require('../models/courseModel')
const Subject = require('../models/subjectModel')
const Attendance = require('../models/attendanceModel')

const scanID = asyncHandler(async (req, res, next) => {
    // const subjects = await Subject.find({ user: req.user }).populate('course', ['courseName', 'yearLevel', 'students'])

    // return res.status(200).json({ message: 'test' })
            const course = await Course.findById(req.body.courseId)
            // const studentHasAttendance =  await Attendance.findOne({student: '123'})
            const student= course.students.filter((student) => student.studentId == req.body.studentId)[0]
            // return res.status(200).json(studentFound)
            // return 
            const studentHasAttendance =  await Attendance.findOne({student: student._id})
            if (!studentHasAttendance) { //if no attendance
                if(req.body.attendanceType==="Time-in"){ //if type === time-in
                    Attendance.create({student: student._id, subject:req.body.subject, timeIn: Date()})
                } else {//if type === time-out
                    if (studentHasAttendance.timeIn && !studentHasAttendance.timeOut) { //if may time in
                        Attendance.create({student: student._id, subject:req.body.subject, timeOut: Date()})

                        return res.status(200).json({
                            message: 'Time-out success!'
                        })
                    } else if(studentHasAttendance.timeIn && studentHasAttendance.timeOut) { 
                        return res.status(200).json({
                            message: 'Already Timed in!'
                        })
                    }
                    
                    else { //if uwa it time in
                        return res.status(200).json({
                            message: 'No Time-in!'
                        })
                    }
                }
            }else {
                if(req.body.attendanceType==="Time-in"){ //if type === time-in
                    if (studentHasAttendance.timeIn) {
                        return res.status(200).json({
                            message: 'Already Timed in!'
                        })
                    } else {
                        Attendance.create({student: student._id, attendanceType: req.body.attendanceType, subject:req.body.subject, timeIn: Date()})
                        return res.status(200).json({
                            message: 'Time-in Success!'
                        })
                    }
                } else{
                    if(req.body.attendanceType==="Time-in"){ //if type === time-in
                        Attendance.create({student: student._id, subject:req.body.subject, timeIn: Date()})
                    } else {//if type === time-out
                        if (studentHasAttendance.timeIn && !studentHasAttendance.timeOut) { //if may time in
                        Attendance.create({student: student._id, subject:req.body.subject, timeOut: Date()})

                        return res.status(200).json({
                            message: 'Time-out success!'
                        })
                    } else if(studentHasAttendance.timeIn && studentHasAttendance.timeOut) { 
                        return res.status(200).json({
                            message: 'Already Timed in!'
                        })
                    }
                    
                    else { //if uwa it time in
                        return res.status(200).json({
                            message: 'No Time-in!'
                        })
                    }
                    }
                }
            }

        // return res.status(200).json(subjects)
        // return res.status(200).json(hasIn?'may login': 'wat login')
    //check if already timed in/out
    //if type time-out .. check if has time-in (cant time out if no time in)

        return res.status(200).json({message:'Time in Successful'})
    
        // return res.status(200).json('studentExists')

})
const timedInOrOutStudents = asyncHandler(async(req,res,next)=>{
    const timedInOrOutStudents = await Attendance.find().populate('subject')
    // const timedInOrOutStudents = await Attendance.find({subject: req.params.subjectID}).populate('subject')
    // const allStudents = await Subject.findById(req.params.subjectID).populate('course')
    return res.status(200).json(timedInOrOutStudents)
    // return res.status(200).json({attendance: timedInOrOutStudents, allStudents:allStudents?.course?.students})
}) 
module.exports = {
    scanID,
    timedInOrOutStudents
}
