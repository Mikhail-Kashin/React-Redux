const express = require('express')
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');


const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


router.get( '/', asyncHandler(async (req, res) => {
  return res.json({});
}))

module.exports = router;
