const { DataTypes } = require("sequelize");
const sequelize = require("../services/db");
const Comment = require("./CommentModels")
const like = sequelize.define(
  "like",
  {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    // idProduct:{
    //     type: DataTypes.INTEGER,
    //     allowNull: false
    // },
    idCustomer: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    idComment: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
  },
  {
    tableName: "likes",
    timestamps: false, 
  }
);
Comment.hasMany(like, {as: "like" , foreignKey: "idComment"})
module.exports = like;