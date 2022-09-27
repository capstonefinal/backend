const mongoose = require('mongoose')

const courseSchema = mongoose.Schema({
    courseName: {
        type: String,
        required: true,
    },
    yearLevel: {
        type: String,
        required: true,
    },
    students: [
        {
            studentName: String,
            studentId: {
                type: String,
                unique: true
            },
        }
    ]
},
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Course', courseSchema)