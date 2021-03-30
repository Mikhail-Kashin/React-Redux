'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Artists', [
      {
        email: 'GrigorySkolov@SymphonicCampaign.com',
        artistName: 'Grigory Sokolov',
        hashedPassword: temp,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'JeanRondeau@SymphonicCampaign.com',
        artistName: 'Jean Rondeau',
        hashedPassword: temp,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'HilaryHahn@SymphonicCampaign.com',
        artistName: 'Hilary Hahn',
        hashedPassword: temp,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
