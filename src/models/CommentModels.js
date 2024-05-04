const { DataTypes } = require("sequelize");
const sequelize = require("../services/db");
const Product = require("../models/ProductModels")
const User = require("./userModels")
const Comment = sequelize.define(
  "Comment",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    idUser:{
      type: DataTypes.INTEGER,
    },
    idSeller: {
      type: DataTypes.INTEGER,
    },
    content: {
      type: DataTypes.TEXT,
    },
    rating:{
        type: DataTypes.INTEGER,
        validate: {min: 1, max:5}
    },
    likes: {
        type: DataTypes.INTEGER,
        defaultValue:0
    }
  },
  {
    tableName: "Comments",
    timestamps: false, 
  }
);
User.hasMany(Comment);
Product.hasMany(Comment, {onDelete: 'CASCADE'});

module.exports = Comment;