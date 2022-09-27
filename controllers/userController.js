const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/userModel')

const getAllUser = asyncHandler(async (req, res) => {
    const users = await User.find().select('-password')
    res.header("Access-Control-Allow-Origin", "*").status(200).json(users)
})

const getUser = asyncHandler(async (req, res) => {
    // const user = await User.findById(req.params.id)
    res.status(200).json(req.user)
})

const createUser = asyncHandler(async (req, res) => {
    const { fullName, username, password } = req.body
    const userExists = await User.findOne({ username })
    if (userExists) {
        res.status(400)
        throw new Error("User already exists")
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const user = await User.create({
        fullName,
        username,
        password: hashedPassword
    })
    res.status(200).json({
        _id: user.id,
        fullName: user.fullName,
        username: user.username,
        token: generateToken(user.id)
    })
})

const updateUser = asyncHandler(async (req, res) => {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    console.log('user updated');
    res.status(200).json(updatedUser)
})

const deleteUser = asyncHandler(async (req, res) => {
    const deletedUser = await User.findByIdAndDelete(req.user.id)
    res.status(200).json(deletedUser)
})

const loginUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body
    const user = await User.findOne({ username })
    if (!username || !password) {
        res.status(400)
        throw new Error("Please fill all fields")
    }
    if (username && password && user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            _id: user.id,
            fullName: user.fullName,
            username: user.username,
            token: generateToken(user.id)
        })
    } else {
        res.status(400)
        throw new Error("Invalid credentials")
    }
})

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    })
}

module.exports = {
    getUser,
    getAllUser,
    createUser,
    updateUser,
    deleteUser,
    loginUser
}
