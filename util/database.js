const sequelize = require('sequelize');

const Sequelize = new sequelize('amada', 'root', '2221', {
    host: 'localhost',
    dialect: 'mysql',
})

module.exports = Sequelize