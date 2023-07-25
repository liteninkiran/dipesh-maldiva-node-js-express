const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

// @desc Register a user
// @route POST /api/users/register
// @access public
const registerUser = asyncHandler(async (req, res) => {

    // Extract fields
    const { username, email, password } = req.body;

    // Check all fields have a value
    if (!username || !email || !password) {
        res.status(400);
        throw new Error('All fields are mandatory!');
    }

    // Check if user's email already exists
    const userAvailable = await User.findOne({ email });

    // Throw error is user already exists
    if (userAvailable) {
        res.status(400);
        throw new Error('User already registered!');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    });

    if (user) {
        console.log(`User created ${user}`);
        res.status(201).json({ _id: user.id, email: user.email });
    } else {
        res.status(400);
        throw new Error('User data is not valid');
    }

    res.json({ message: 'Register the user' });
});

// @desc Login a user
// @route POST /api/users/login
// @access public
const loginUser = asyncHandler(async (req, res) => {
    res.json({ message: 'Login user' });
});

// @desc Current user
// @route GET /api/users/current
// @access public
const currentUser = asyncHandler(async (req, res) => {
    res.json({ message: 'Current user' });
});

module.exports = { registerUser, loginUser, currentUser };
