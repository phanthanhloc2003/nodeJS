const { DataTypes } = require('sequelize');
const sequelize = require('../services/db');
const Users = require('./userModels'); // Import mô hình Users

const Admin = sequelize.define("Admin", {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: Users, // Tham chiếu đến bảng Users
            key: 'id' ,// Tham chiếu đến cột id trong bảng Users
            onDelete: 'CASCADE'
        }
    },
    website_name: {
        type: DataTypes.STRING,
       
    },
    website_url: {
        type: DataTypes.STRING,
        
    }
}, {
    timestamps: true // Tạo cột "createdAt" và "updatedAt"
});

Admin.belongsTo(Users, { foreignKey: 'user_id', onDelete: 'CASCADE' }); // Thiết lập ràng buộc khóa ngoại

Admin.sync();

module.exports = Admin;