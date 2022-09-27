const mongoose = require('mongoose')

const subjectSchema = mongoose.Schema({
    subjectName: {
        type: String,
        required: true,
    },
    course: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Course"
    },
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        required: true
    },
    students: [
        {
            studentName: String,
            studentId: String,
        }
    ]
},
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Subject', subjectSchema)