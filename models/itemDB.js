const Sequelize = require("sequelize");
const sequelize = require("../util/database");
const Shop = require("./shopDB");
const feature = require("./featureDb");

const item = sequelize.define("item", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  shopId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Shop,
      key: "id",
    },
  },
  is_available: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    default: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    default: 0,
  },
  discount: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});
const itemExtraItem = sequelize.define("item_extra_items", {
  itemId: {
    type: Sequelize.INTEGER,
    references: {
      model: item,
      key: "id",
    },
  },
  extraItemId: {
    type: Sequelize.INTEGER,
    references: {
      model: item,
      key: "id",
    },
  },
});

const itemFeature = sequelize.define("item_features", {
  itemId: {
    type: Sequelize.INTEGER,
    references: {
      model: item,
      key: "id",
    },
  },
  featureId: {
    type: Sequelize.INTEGER,
    references: {
      model: feature,
      key: "id",
    },
  },
});
item.belongsToMany(feature, {
  through: itemFeature,
  foreignKey: "itemId",
  otherKey: "featureId",
});
item.belongsToMany(item, {
  as: "extraItems",
  through: itemExtraItem,
  foreignKey: "itemId",
  otherKey: "extraItemId",
});

module.exports = item;
