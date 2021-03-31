const express = require('express')
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');


const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Album } = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


router.get( '/', asyncHandler(async (req, res) => {
  const albums = await Album.findAll()
  return res.json(albums);
}))

router.post('/', asyncHandler(async (req, res) => {
  const {name, imgUrl} = req.body;
  const album = await Album.create({
    name,
    imgUrl
  });
  res.json(album)
}))

module.exports = router;
