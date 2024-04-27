const { DataTypes } = require("sequelize");
const sequelize = require("../services/db");
const Product = require("../models/ProductModels")
const Rating = sequelize.define(
  "Rating",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    rating: {
      type: DataTypes.DECIMAL(20, 10),
    },
  },
  {
    tableName: "Ratings",
    timestamps: false, 
  }
);
Product.hasOne(Rating, {onDelete: 'CASCADE'});
module.exports = Rating;
