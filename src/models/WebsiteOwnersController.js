const { DataTypes } = require('sequelize');
const sequelize = require('../services/db');
const Users = require('./userControlers'); // Import mô hình Users

const WebsiteOwners = sequelize.define("WebsiteOwners", {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: Users, // Tham chiếu đến bảng Users
            key: 'id' // Tham chiếu đến cột id trong bảng Users
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

WebsiteOwners.belongsTo(Users, { foreignKey: 'user_id' }); // Thiết lập ràng buộc khóa ngoại

WebsiteOwners.sync();

module.exports = WebsiteOwners;