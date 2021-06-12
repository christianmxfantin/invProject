'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    //Add seed commands here.
    await queryInterface.bulkInsert('products', [
      {
        username: 'cfantin',
        description: 'Chocolate Aguila x 150 gs',
        unit_price: 214.25,
        quantity: 100
      },
      {
        username: 'cfantin',
        description: 'Cafe La Morenita x 250 gs',
        unit_price: 179.32,
        quantity: 50
      },
      {
        username: 'cfantin',
        description: 'Te La Virginia x 50 saq',
        unit_price: 91.34,
        quantity: 100
      },
      {
        username: 'cfantin',
        description: 'Pure de Tomates Salsati x 400 cc',
        unit_price: 65.30,
        quantity: 200
      },
      {
        username: 'cfantin',
        description: 'Fideos Spaghetti Molto',
        unit_price: 45.05,
        quantity: 100
      },
      {
        username: 'cfantin',
        description: 'Sal Celusal x 500 gs',
        unit_price: 20.15,
        quantity: 200
      },
      {
        username: 'cfantin',
        description: 'Azucar Ledesma x 500 gs',
        unit_price: 52.00,
        quantity: 200
      },
      {
        username: 'cfantin',
        description: 'Galletitas Oreo x 200 gs',
        unit_price: 105,
        quantity: 50
      },
      {
        username: 'cfantin',
        description: 'Levadura Calsa x 50 gs',
        unit_price: 100,
        quantity: 100
      },
      {
        username: 'cfantin',
        description: 'Harina 0000 Pureza',
        unit_price: 130,
        quantity: 200
      },
      {
        username: 'cfantin',
        description: 'Manteca La Serenisima x 200 gs',
        unit_price: 150,
        quantity: 200
      },
      {
        username: 'cfantin',
        description: 'Yogurt Yogs x 1 lt',
        unit_price: 125.82,
        quantity: 50
      },
      {
        username: 'cfantin',
        description: 'Pan para Panchos Fargo x 6 uni',
        unit_price: 105.20,
        quantity: 200
      },
      {
        username: 'cfantin',
        description: 'Mayonesa Mayoliva x 500 gs',
        unit_price: 87.22,
        quantity: 200
      },
      {
        username: 'cfantin',
        description: 'Mostaza Savora x 250 gs',
        unit_price: 106.23,
        quantity: 100
      },
      {
        username: 'cfantin',
        description: 'Salsa Golf Hellmans x 125 gs',
        unit_price: 57.23,
        quantity: 50
      },
      {
        username: 'cfantin',
        description: 'Rebozador Marolio x 500 gs',
        unit_price: 87.50,
        quantity: 200
      },
      {
        username: 'cfantin',
        description: 'Fideos Foratti Mattarazzo x 500 gs',
        unit_price: 90.16,
        quantity: 100
      },
      {
        username: 'cfantin',
        description: 'Aceitunas Descarozadas Nucete x 250 gs',
        unit_price: 62.00,
        quantity: 100
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    //Add commands to revert seed here.
    await queryInterface.bulkDelete('products', null, {});
  }
};
