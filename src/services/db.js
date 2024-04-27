const Sequelize = require('sequelize');
const sequelize = new Sequelize(
  'QLBH',
  'SA',
  'Ptl2003.',
  { 
    host: 'localhost',
    dialect: 'mssql',
    logging: false,
  }
);

async function connectDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Kết nối đến cơ sở dữ liệu thành công');
    await sequelize.sync();
    console.log('Đồng bộ hóa mô hình với cơ sở dữ liệu thành công');
  } catch (error) {
    console.error('Không thể kết nối đến cơ sở dữ liệu:', error);
  }
}

connectDatabase();

module.exports = sequelize;
