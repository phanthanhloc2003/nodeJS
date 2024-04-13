const { DataTypes } = require('sequelize');
const sequelize = require('../services/db');
const Users = require('./userControlers'); // Import mô hình Users

const Customers = sequelize.define("Customers", {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: Users,
            key: 'id'
        }
    },
    shipping_address: {
        type: DataTypes.STRING,
       
    },
    purchase_history: {
        type: DataTypes.STRING,
       
    }
}, {
    timestamps: true // Tạo cột "createdAt" và "updatedAt"
});

Customers.belongsTo(Users, { foreignKey: 'user_id' }); // Thiết lập ràng buộc khóa ngoại

Customers.sync();

module.exports = Customers;