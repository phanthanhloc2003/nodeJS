const { DataTypes } = require("sequelize");
const sequelize = require("../services/db");
const Product = require("../models/ProductModels");
const Variation = require("./VariationModels");
const Image = sequelize.define(
  "Image",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    idProduct: {
    type: DataTypes.INTEGER,
      references: {
        model: Product,
        key: "id",
        onDelete: 'CASCADE'
      },
    
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
Product.hasOne(Image, {onDelete: 'CASCADE'});
Variation.hasMany(Image)
module.exports = Image;
