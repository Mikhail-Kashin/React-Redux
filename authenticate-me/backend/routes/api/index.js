const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const { setTokenCookie } = require('../../utils/auth.js');
const { User } = require('../../db/models');
const { restoreUser } = require('../../utils/auth.js');
const { requireAuth } = require('../../utils/auth.js');



//testing testing api routes to make sure they even post.
router.post('/test', function(req, res) {
  res.json({ requestBody: req.body });
});

//more testing this will test the setTokenCookie function
//by calling the demo user and it will attempt to set the Token.
router.get('/set-token-cookie', asyncHandler(async (req, res) => {
  const user = await User.findOne({
      where: {
        username: 'Demo-lition'
      },
    })
  setTokenCookie(res, user);
  return res.json({ user });
}));

// tests the restoreUser middleware by using it
//and checking whether the re.user key has populated succesfully.
router.get('/restore-user', restoreUser, (req, res) => {
    return res.json(req.user);
  }
);

//tests requireAuth middleware this test will return an error if there is no user
//else it will resturn session info.
router.get(
  '/require-auth',
  requireAuth,
  (req, res) => {
    return res.json(req.user);
  }
);

module.exports = router;
