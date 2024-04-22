const { DataTypes } = require("sequelize");
const sequelize = require("../services/db");

const Outstanding = sequelize.define(
  "Outstanding",
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
  }
);
Outstanding.sync();
module.exports = Outstanding;
