'use strict';
const bcrypt = require('bcrypt')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {

    static associate(models) {

    }
  };
  users.init({
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
    password: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    admin: {
      type: DataTypes.BOOLEAN
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        len: {
          args: [3, 50],
          msg: 'El nombre debe contener 3 caracteres como mínimo y 50 como máximo'
        }
      }
    },
    surname: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        isAlpha: {
          msg: 'El apellido solo puede contener letras'
        },
        len: {
          args: [2, 50],
          msg: 'El apellido debe contener 2 caracteres como mínimo y 50 como máximo'
        }
      }
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: 'El email debe ser una dirección válida'
        },
        len: {
          args: [7, 150],
          msg: 'El nombre debe contener 7 caracteres como mínimo y 150 como máximo'
        }
      }
    },
    logo: {
      type: DataTypes.BLOB('medium'),
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: false
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: false
    }
  }, 
  {
    sequelize,
    modelName: 'users',
    timestamps: false
  });
  return users;
};