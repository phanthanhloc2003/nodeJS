const { DataTypes } = require("sequelize");
const sequelize = require("../services/db");

const Product = sequelize.define(
  "Product",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    shop_id:{
      type: DataTypes.STRING,
    },
    shop_location: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
    discount: {
      type: DataTypes.INTEGER,
    },
    brand: {
      type: DataTypes.STRING,
    },
    brand_id: {
      type: DataTypes.INTEGER,
    },
    price: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: "Products",
    timestamps: true,
  }
);

module.exports = Product;
