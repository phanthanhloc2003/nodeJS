const { DataTypes } = require("sequelize");
const sequelize = require("../services/db");
const Product = require("../models/ProductModels")
const Description = sequelize.define(
  "Description",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
   
    text: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "Descriptions",
    timestamps: true, 
  }
);
Product.hasOne(Description, {onDelete: 'CASCADE'} );

module.exports = Description;
