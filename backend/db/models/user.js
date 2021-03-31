'use strict';
const { Validator } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    artistName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 30],
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error('Cannot be an email.');
          }
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 256]
      },
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [60, 60]
      },
    },
  },
  {
    defaultScope: {
      attributes: {
        exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt'],
      },
    },
    scopes: {
      currentUser: {
        attributes: { exclude: ['hashedPassword'] },
      },
      loginUser: {
        attributes: {},
      },
    },
  });
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Album, {foreignKey: 'artistId'})
    User.hasMany(models.Track, {foreignKey: 'artistId'})
  };

  //safe info that can be passed into the JWT
  User.prototype.toSafeObject = function() {
    const { id, artistName, email } = this;
    return { id, artistName, email };
  };
  //accepts password and return true or false if it matches USER instance hashedPassword
  User.prototype.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.hashedPassword.toString());
   };
   //returns user based on id.
   User.getCurrentUserById = async function (id) {
    return await User.scope('currentUser').findByPk(id);
   };
   //uses login scope to find a user with the specified credentials.
   //If user is found and password validates then it returns user with the currentUser scope.
   User.login = async function ({ credential, password }) {
    const { Op } = require('sequelize');
    const user = await User.scope('loginUser').findOne({
      where: {
        [Op.or]: {
          artistName: credential,
          email: credential,
        },
      },
    });
    if (user && user.validatePassword(password)) {
      return await User.scope('currentUser').findByPk(user.id);
    }
  };
  // accepts email, artistName, password and hashes password.
  //Then creates user with that information and returns the user to currentUser scope.
  User.signup = async function ({ artistName, email, password }) {
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({
      artistName,
      email,
      hashedPassword,
    });
    return await User.scope('currentUser').findByPk(user.id);
  };

  return User;
};
