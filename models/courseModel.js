const mongoose = require('mongoose')
// const studentSchema = mongoose.Schema({
//     studentName: String,
//         studentId: {
//             type: String,
//             unique: true
//         },
// })

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
    ],
    // students: [{
    //     type: mongoose.SchemaTypes.ObjectId,
    //     ref: "Student"
    // }],
},
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Course', courseSchema)
// module.exports = mongoose.model('Student', studentSchema)