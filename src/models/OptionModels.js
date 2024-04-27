const { DataTypes } = require("sequelize");
const sequelize = require("../services/db");
const Product = require("../models/ProductModels");
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
  },
  {
    tableName: "Options",
    timestamps: true,
  }
);
Variation.hasMany(Option); 

module.exports = Option;