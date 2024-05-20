const { DataTypes } = require("sequelize");
const sequelize = require("../services/db");
const Sellers = require("./SellersModels");
const Product = require("./ProductModels");
const Option = require("./OptionModels");
const Address = require("./AddressModels");




const Order = sequelize.define(
  "Order",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    shopId: {
        type: DataTypes.INTEGER,
        
    },
    idAddress: {
      type: DataTypes.INTEGER,    
    },
    idProduct: {
        type: DataTypes.INTEGER,    
    },
    quantity:{
        type: DataTypes.INTEGER,
    },
    optionId: {
        type: DataTypes.INTEGER,
    },
    price: {
      type: DataTypes.INTEGER,
    }
    
  },
  {
    tableName: "Orders",
    timestamps: true,
  }
);
Order.belongsTo(Sellers,{ foreignKey:"shopId"} )
Order.belongsTo(Product,{ foreignKey:"idProduct"} )
Order.belongsTo(Option,{ foreignKey:"optionId"} )
Order.belongsTo(Address,{ foreignKey: "idAddress"} )


module.exports = Order;