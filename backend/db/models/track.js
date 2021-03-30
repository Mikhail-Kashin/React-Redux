'use strict';
module.exports = (sequelize, DataTypes) => {
  const Track = sequelize.define('Track', {
    artistId: DataTypes.INTEGER,
    albumId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    songUrl: DataTypes.STRING
  }, {});
  Track.associate = function(models) {
    // associations can be defined here
    Track.belongsTo(models.User, {foreignKey: 'artistId'})
    Track.belongsTo(models.Album, {foreignKey: 'albumId'})
  };
  return Track;
};
