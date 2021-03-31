const express = require('express')
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');


const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Track } = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


router.get( '/', asyncHandler(async (req, res) => {
  const tracks = await Track.findAll()
  return res.json(tracks);
}))

router.post('/', asyncHandler(async (req, res) => {
  const {name, songUrl} = req.body;
  const track = await Track.create({
    name,
    songUrl
  });
  res.json(track)
}))

module.exports = router;
