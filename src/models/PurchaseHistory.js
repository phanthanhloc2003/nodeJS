const { DataTypes } = require("sequelize");
const sequelize = require("../services/db");
const Product = require("./ProductModels");
const Option = require("./OptionModels");
const Users = require("./userModels");
const PurchaseHistory = sequelize.define(
  "PurchaseHistory",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    idUser: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    IdOption:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    idProduct: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    quantity:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    totalPrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
    
  },
  {
    tableName: "PurchaseHistorys",
  }
);
PurchaseHistory.belongsTo(Product,{ foreignKey:"idProduct"} )
PurchaseHistory.belongsTo(Option,{ foreignKey:"IdOption"} )
PurchaseHistory.belongsTo(Users,{ foreignKey:"idUser"} )
module.exports = PurchaseHistory;
