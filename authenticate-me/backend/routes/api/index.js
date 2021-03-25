const router = require('express').Router();


//testing testing api routes
router.post('/test', function(req, res) {
  res.json({ requestBody: req.body });
});

module.exports = router;
