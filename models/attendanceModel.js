const mongoose = require('mongoose')

const attendanceSchema = mongoose.Schema({
    student: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Course.students"
    },
    subject: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Subject"
    },
    attendanceType: String,
    timeIn: Date,
    timeOut: Date
},
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Attendance', attendanceSchema)