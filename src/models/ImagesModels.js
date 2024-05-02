const { DataTypes } = require("sequelize");
const sequelize = require("../services/db");
const Product = require("../models/ProductModels");
const Option = require("./OptionModels")
const Image = sequelize.define(
  "Image",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    url: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "Images",
    timestamps: true, 
  }
);
Product.hasMany(Image, {onDelete: 'CASCADE'});
Option.hasMany(Image)
module.exports = Image;
