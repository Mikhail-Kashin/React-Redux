const express = require('express')
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');


const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation');


const router = express.Router();


//validations that will ensure signup fields are properly entered and formated.
const validateSignup = [
  check('email')
    .trim()
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('artistName')
    .trim()
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a artistName with at least 4 characters.'),
  check('artistName')
    .trim()
    .not()
    .isEmail()
    .withMessage('artistName cannot be an email.'),
  check('password')
    .trim()
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  check('confirmpassword')
    .trim()
    .exists({ checkFalsy: true })
    .custom (async (confirmpassword, {req}) => {
      const password = req.body.password
      if (password !== confirmpassword) throw new Error('Passwords must match!')
    }),
  handleValidationErrors,
];

// SIGN UP FUNCTION signs user up calling the sign up static method defined in USER model.
// if user is created the it sets the cookie and returns JSON response with user info.
// else it will error into sequelize validation
router.post( '/', validateSignup, asyncHandler(async (req, res) => {
    const { email, password, artistName, confirmpassword } = req.body;
    const user = await User.signup({ email, password, artistName, confirmpassword });

    await setTokenCookie(res, user);

    return res.json({
      user,
    });
  }),
);




module.exports = router;
