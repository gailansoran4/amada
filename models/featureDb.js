const Sequelize = require("sequelize");
const sequelize = require("../util/database");
const shop = require("./shopDB");

const feature = sequelize.define("feature", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  shopId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: shop,
      key: "id",
    },
  },
});
feature.belongsTo(shop, { foreignKey: "shopId" });
shop.hasMany(feature, { foreignKey: "shopId" });

module.exports = feature;
