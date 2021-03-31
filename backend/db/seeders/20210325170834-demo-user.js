'use strict';
const faker = require('faker');
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'GrigorySkolov@SymphonicCampaign.com',
        artistName: 'Grigory Sokolov',
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'JeanRondeau@SymphonicCampaign.com',
        artistName: 'Jean Rondeau',
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'HilaryHahn@SymphonicCampaign.com',
        artistName: 'Hilary Hahn',
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'demo@user.io',
        artistName: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: faker.internet.email(),
        artistName: 'FakeUser1',
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: faker.internet.email(),
        artistName: 'FakeUser2',
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      artistName: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
