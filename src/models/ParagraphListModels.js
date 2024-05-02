const { DataTypes } = require("sequelize");
const sequelize = require("../services/db");
const Product = require("../models/ProductModels")
const ParagraphList = sequelize.define(
  "ParagraphList",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
   
    urlId: {
        type: DataTypes.INTEGER,
        defaultValue:null
    },
    ratio:{
        type: DataTypes.INTEGER,
        defaultValue:null
    },
    text: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "ParagraphLists",
  }
);
Product.hasMany(ParagraphList,  { onDelete: 'CASCADE' });

module.exports = ParagraphList;
