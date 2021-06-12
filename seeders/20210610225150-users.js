'use strict';
const bcrypt = require('bcrypt')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    //Add seed commands here.
    let password = bcrypt.hashSync('12345678', 10)
    await queryInterface.bulkInsert('users', [
      {
        username: 'cfantin',
        password: password,
        admin: true,
        name: 'Christian Maximiliano',
        surname: 'Fantin',
        email: 'christianmxfantin@gmail.com'
      },
      {
        username: 'lrodriguez',
        password: password,
        admin: false,
        name: 'Laura',
        surname: 'Rodriguez',
        email: 'lrodriguez@gmail.com'
      },
      {
        username: 'cmartinez',
        password: password,
        admin: false,
        name: 'Claudio',
        surname: 'Martinez',
        email: 'cmartinez@gmail.com'
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    //Add commands to revert seed here.
    await queryInterface.bulkDelete('users', null, {});
  }
};
