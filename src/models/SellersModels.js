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
      },
    },
    shop_name: {
      type: DataTypes.STRING,
    },
    shop_category: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
  }
);

Sellers.belongsTo(Users, { foreignKey: "user_id" }); // Thiết lập ràng buộc khóa ngoại

Sellers.sync();

module.exports = Sellers;
