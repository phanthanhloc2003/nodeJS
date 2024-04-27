const { DataTypes } = require("sequelize");
const sequelize = require("../services/db");
const Product = require("../models/ProductModels")
const Attributes = sequelize.define(
  "Attributes",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
    },
    value: {
      type: DataTypes.STRING,
  },
    url: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "Attributess",
  }
);
Product.hasMany(Attributes,  { onDelete: 'CASCADE' });
// Attributes.belongsTo(Product, { foreignKey: 'idProduct' , onDelete: 'CASCADE' });
module.exports = Attributes;
