const { DataTypes } = require('sequelize');
const sequelize = require('../services/db');
const Users = require('./userControlers'); // Import mô hình Users

const Sellers = sequelize.define("Sellers", {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: Users,
            key: 'id'
        }
    },
    shop_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    shop_category: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true // Tạo cột "createdAt" và "updatedAt"
});

Sellers.belongsTo(Users, { foreignKey: 'user_id' }); // Thiết lập ràng buộc khóa ngoại

Sellers.sync();

module.exports = Sellers;