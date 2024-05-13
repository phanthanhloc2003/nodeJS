const { DataTypes } = require("sequelize");
const sequelize = require("../services/db");
const Product = require("./ProductModels");
const Option = require("./OptionModels")
const Cart = sequelize.define(
  "Cart",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    idUser: {
      type: DataTypes.INTEGER,
    },
    idOption: {
      type: DataTypes.INTEGER,
    },
    ischeck:{
      type:DataTypes.BOOLEAN,
      defaultValue: false
    },
    idProduct: {
      type: DataTypes.INTEGER,
    
    },
    quantity: {
      type: DataTypes.INTEGER,
    },
    price: {
      type: DataTypes.INTEGER,
    },
    currency: {
      type: DataTypes.STRING,
      defaultValue: "USD",
    },
  },
  {
    tableName: "Carts",
  }
);
Cart.belongsTo(Product, {foreignKey: "idProduct"})
Cart.belongsTo(Option, {foreignKey: "idOption"})
module.exports = Cart;
