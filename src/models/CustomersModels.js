const { DataTypes } = require("sequelize");
const sequelize = require("../services/db");
const Users = require("./userModels"); // Import mô hình Users

const Customers = sequelize.define(
  "Customers",
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: Users,
        key: "id",
        onDelete: "CASCADE",
      },
    },
    name: {
      type: DataTypes.STRING,
    },
    avata: {
        type: DataTypes.STRING,
    },
    nickname: {
      type: DataTypes.STRING,
    },
    gender: {
      type: DataTypes.INTEGER,
    },
    dateOfBirth: {
      type: DataTypes.DATE,
    },
  },
  {
    timestamps: true, // Tạo cột "createdAt" và "updatedAt"
  }
);

Customers.belongsTo(Users, { foreignKey: "user_id", onDelete: "CASCADE" }); // Thiết lập ràng buộc khóa ngoại

Customers.sync();

module.exports = Customers;
