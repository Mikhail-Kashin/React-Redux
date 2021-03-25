const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../config');
const { User } = require('../db/models');

const { secret, expiresIn } = jwtConfig;


// sends a JWT cookie!
const setTokenCookie = (res, user) => {
  // the below creates the cookie.
  const token = jwt.sign(
    { data: user.toSafeObject() },
    secret,
    { expiresIn: parseInt(expiresIn) }, // 604,800 seconds = 1 week
  );

  const isProduction = process.env.NODE_ENV === "production";

  // Sets token cookie
  res.cookie('token', token, {
    maxAge: expiresIn * 1000,
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction && "Lax",
  });

  return token;
};

//restores the session for user based on what is in the JWT cookie.
const restoreUser = (req, res, next) => {
  // token pulled from the cookies!
  const { token } = req.cookies;

  //verify's the data and sends an error if user cannot be found.
  return jwt.verify(token, secret, null, async (err, jwtPayload) => {
    if (err) {
      return next();
    }

    try {
      const { id } = jwtPayload.data;
      req.user = await User.scope('currentUser').findByPk(id);
    } catch (e) {
      res.clearCookie('token');
      return next();
    }

    if (!req.user) res.clearCookie('token');

    return next();
  });
};

//if there is no user this returns an error.
//works in tandom with restoreUser defined above.
const requireAuth = [
  restoreUser,
  function (req, res, next) {
    if (req.user) return next();

    const err = new Error('Unauthorized');
    err.title = 'Unauthorized';
    err.errors = ['Unauthorized'];
    err.status = 401;
    return next(err);
  },
];

module.exports = { setTokenCookie, restoreUser, requireAuth };
