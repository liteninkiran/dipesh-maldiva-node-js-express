const asyncHandler = require('express-async-handler');

// @desc Register a user
// @route POST /api/users/register
// @access public
const registerUser = asyncHandler(async (req, res) => {
    res.json({ message: 'Register user' });
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
