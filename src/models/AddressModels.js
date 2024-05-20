const { DataTypes } = require('sequelize');
const sequelize = require('../services/db');
const Users = require('./userModels'); // Import mô hình Users

const Address = sequelize.define("Address", {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
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

Address.belongsTo(Users, { foreignKey: 'user_id', onDelete: 'CASCADE' }); 

module.exports = Address;