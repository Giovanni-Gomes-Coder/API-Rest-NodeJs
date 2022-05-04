const Sequelize = require('sequelize')
require('dotenv').config()

const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)

const sequelize = new Sequelize('teste', DB_USER, DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql'
  });

const User = sequelize.define('user', {
    nome: {
        type: Sequelize.STRING
    },
    idade: {
        type: Sequelize.INTEGER
    },
    cpf: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    }
}, {
    timestamps: false
})

module.exports = User;