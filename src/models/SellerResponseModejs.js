const { DataTypes } = require("sequelize");
const sequelize = require("../services/db");
const Comment = require("./CommentModels")
const SellerResonse = sequelize.define(
  "SellerResonse",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    content: {
      type: DataTypes.TEXT,
    },
  },
  {
    tableName: "SellerResonses",
    timestamps: false, 
  }
);
Comment.hasMany(SellerResonse,{onDelete: 'CASCADE'});
module.exports = SellerResonse;
