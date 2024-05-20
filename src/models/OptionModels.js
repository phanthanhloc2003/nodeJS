const { DataTypes } = require("sequelize");
const sequelize = require("../services/db");
const Variation = require("./VariationModels");

const Option = sequelize.define(
  "Option",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
 
    name: {
      type: DataTypes.STRING,
    },
    sold:{
      type: DataTypes.INTEGER,
    },
    price: {
      type: DataTypes.INTEGER,
    },
    price_before_discount:{
      type: DataTypes.INTEGER,
    },
    url: {
      type: DataTypes.STRING,
    }
  },
  {
    tableName: "Options",
    timestamps: true,
  }
);
Variation.hasMany(Option, {as: "list_Option"}); 

module.exports = Option;