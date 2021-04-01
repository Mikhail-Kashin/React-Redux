const express = require('express')
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');


const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Album, Track } = require('../../db/models');


const router = express.Router();


router.get( '/', asyncHandler(async (req, res) => {
  const albums = await Album.findAll()
  return res.json(albums);
}))


router.get('/:id', asyncHandler(async (req, res) => { //gets tracks by album id
  const tracks = await Track.findAll({
    where: { albumId: req.params.id
    }
  }
  )
  return res.json(tracks)
}));


router.post('/', asyncHandler(async (req, res) => {
  const {name, imgUrl} = req.body;
  const album = await Album.create({
    name,
    imgUrl
  });
  res.json(album)
}))

module.exports = router;
