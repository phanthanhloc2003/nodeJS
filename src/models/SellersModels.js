const { DataTypes } = require("sequelize");
const sequelize = require("../services/db");
const Users = require("./userModels"); // Import mô hình Users

const Sellers = sequelize.define(
  "Sellers",
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: Users,
        key: "id",
        onDelete: 'CASCADE'
      },
    },
    shop_name: {
      type: DataTypes.STRING,
    },
    shop_address: {
      type: DataTypes.STRING,
    },
    phone:{
      type: DataTypes.INTEGER,
    },
    avata: {
      type: DataTypes.STRING,
    }
  },
  {
    timestamps: true,
  }
);

Sellers.belongsTo(Users, { foreignKey: "user_id",onDelete: 'CASCADE' }); // Thiết lập ràng buộc khóa ngoại
module.exports = Sellers;
