const Sequelize = require("sequelize");
const sequelize = require("../util/database");


const shop = sequelize.define("shop", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    phone : {
        type: Sequelize.STRING,
        allowNull: false
    },
    password : {
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = shop