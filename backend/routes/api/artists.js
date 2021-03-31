// const singleFileUpload = { singlePublicFileUpload } = require('../../awsS3')

// const singleMulterUpl= { singleMulterUpload } = require('../../awsS3')

const express = require('express')
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');


const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


router.get( '/', asyncHandler(async (req, res) => {
  // const profileImageUrl = await singleFileUpload(req.file);
  const artists = await User.findAll()
  return res.json(artists);
}))

router.post('/', asyncHandler(async (req, res) => {
  const {artistName} = req.body;
  const artist = await Artist.create({
    artistName
  });
  res.json(artist)
}))

module.exports = router;
