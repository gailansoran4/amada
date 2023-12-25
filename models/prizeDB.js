const Sequelize = require("sequelize");

const sequelize = require("../util/database");
const Shop = require('./shopDB');



const Prize = sequelize.define("prize", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description : {
        type: Sequelize.STRING,
        allowNull: false
    },
    price : {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    is_available : {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        default : true,
    },
    shopId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Shop,
            key: 'id'
        }
    }
})

Prize.belongsTo(Shop, { foreignKey: 'shopId' });
Shop.hasMany(Prize, { foreignKey: 'shopId' });

module.exports = Prize