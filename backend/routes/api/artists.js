const singleFileUpload = { singlePublicFileUpload } = require('../../awsS3')

const singleMulterUpl= { singleMulterUpload } = require('../../awsS3')

const express = require('express')
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');



const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


router.get( '/', singleMulterUpload('image'), asyncHandler(async (req, res) => {
  const profileImageUrl = await singleFileUpload(req.file);
  return res.json({});
}))

module.exports = router;
