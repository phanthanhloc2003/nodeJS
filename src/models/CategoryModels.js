const { DataTypes } = require("sequelize");
const sequelize = require("../services/db");

const Category = sequelize.define(
  "Category",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
   text: {
    type: DataTypes.STRING
   },
   icon_url: {
    type: DataTypes.STRING
   },
   link: {
    type: DataTypes.STRING
   },
  },
  {
    timestamps: true, 
  }
);
Category.sync();
module.exports = Category;
