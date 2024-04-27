const { DataTypes } = require("sequelize");
const sequelize = require("../services/db");
const Product = require("../models/ProductModels")
const Quantity = sequelize.define(
  "Quantity",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: "Quantitys",
    timestamps: false, 
  }
);
Product.hasOne(Quantity, {onDelete: 'CASCADE'});
module.exports = Quantity;
