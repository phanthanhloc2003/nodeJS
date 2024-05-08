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
    idComment: {
      type: DataTypes.INTEGER,
    }
  },
  {
    tableName: "SellerResonses",
    timestamps: false, 
  }
);
Comment.hasOne(SellerResonse,{ foreignKey: "idComment",  onDelete: 'CASCADE'});

// SellerResonse.belongsTo(Comment,{ foreignKey: "idComment",  onDelete: 'CASCADE'} )
module.exports = SellerResonse;
