const { DataTypes } = require("sequelize");
const sequelize = require("../services/db");
const Product = require("../models/ProductModels")
const Variation = sequelize.define(
  "Variation",
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
    tableName: "Variations",
    timestamps: true, 
  }
);
Product.hasMany(Variation, {onDelete: 'CASCADE'});
module.exports = Variation;
