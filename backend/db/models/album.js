'use strict';
module.exports = (sequelize, DataTypes) => {
  const Album = sequelize.define('Album', {
    artistId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    imgUrl: DataTypes.STRING
  }, {});
  Album.associate = function(models) {
    // associations can be defined here
  };
  return Album;
};