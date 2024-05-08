const { DataTypes } = require("sequelize");
const sequelize = require("../services/db");
const Product = require("../models/ProductModels")
const Customers = require("./CustomersModels")
const Comment = sequelize.define(
  "Comment",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    idCustomers:{
      type: DataTypes.INTEGER,
    },
    idProduct: {
      type: DataTypes.INTEGER,
    },
    content: {
      type: DataTypes.TEXT,
    },
    rating:{
        type: DataTypes.INTEGER,
        validate: {min: 1, max:5}
    },
  },
  {
    tableName: "Comments",
    timestamps: false, 
  }
);
Comment.belongsTo(Customers,{ foreignKey:"idCustomers"} )
Product.hasMany(Comment, {foreignKey:"idProduct",onDelete: 'CASCADE'});

module.exports = Comment;