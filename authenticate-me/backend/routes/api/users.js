const express = require('express')
const asyncHandler = require('express-async-handler');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();



// SIGN UP FUNCTION signs user up calling the sign up static method defined in USER model.
// if user is created the it sets the cookie and returns JSON response with user info.
// else it will error into sequelize validation
router.post( '', asyncHandler(async (req, res) => {
    const { email, password, username } = req.body;
    const user = await User.signup({ email, username, password });

    await setTokenCookie(res, user);

    return res.json({
      user,
    });
  }),
);




module.exports = router;
