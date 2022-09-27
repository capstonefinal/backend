require('dotenv').config()
const express = require('express')
const { errorHandler } = require('./middlewares/errorMiddlware')
const connectDB = require('./config/db')
const port = process.env.PORT
const cors = require('cors')

connectDB()
const app = express()
app.use(cors());
// app.use(function (req, res, next) {
//     res.setHeader("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
//     res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/courses', require('./routes/courseRoutes'))
app.use('/api/subjects', require('./routes/subjectRoutes'))
app.use('/api/attendance', require('./routes/attendanceRoutes'))

app.use(errorHandler)

app.listen(port, () => {
    console.log(`server started on port ${port}`)
    console.log('Connecting to database . . .')
})
