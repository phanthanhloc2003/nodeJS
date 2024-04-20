const { DataTypes } = require('sequelize');
const sequelize = require('../services/db');
const Users = require('./userModels'); // Import mô hình Users

const Address = sequelize.define("Address", {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: Users, // Tham chiếu đến bảng Users
            key: 'id' ,// Tham chiếu đến cột id trong bảng Users
            onDelete: 'CASCADE'
        }
    },
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    country: {
        type: DataTypes.STRING,
        defaultValue: "Việt Nam"
    },
    region: {
        type: DataTypes.STRING,
    },
    region_id: {
        type: DataTypes.INTEGER,
    },
    
    district: {
        type: DataTypes.STRING,
    },
    district_id: {
        type: DataTypes.INTEGER,
    }
    ,
    ward: {
        type: DataTypes.STRING,
    },
    ward_id: {
        type: DataTypes.INTEGER,
    },
    full_Name: {
        type: DataTypes.STRING,
    },
    telephone: {
        type: DataTypes.STRING
    },
    street: {
        type: DataTypes.STRING
    },
    is_default: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0
    },
    country_id: {
        type: DataTypes.STRING,
        defaultValue: "vn" 
    },

}, {
    timestamps: true 
});

Address.belongsTo(Users, { foreignKey: 'user_id', onDelete: 'CASCADE' }); // Thiết lập ràng buộc khóa ngoại

Address.sync();

module.exports = Address;