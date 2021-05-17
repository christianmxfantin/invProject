'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class products extends Model {

    static associate(models) {

    }
  };
  products.init({
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      validate: {
        is: {
            args: /^[a-zA-Z0-9]+$/,
            msg: 'El nombre de usuario solo puede tener letras y números'
        },
        len: {
          args: [1, 50],
          msg: 'El nombre de usuario debe contener 1 caracter como mínimo y 50 como máximo'
        }
      }
    },
    description: {
      allowNull: false,
      type: DataTypes.STRING(150)
    },
    unit_price: {
      allowNull: false,
      type: DataTypes.DECIMAL(10, 2)
    },
    quantity: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    modelName: 'products',
  });
  return products;
};