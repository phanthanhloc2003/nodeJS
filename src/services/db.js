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
 sequelize.authenticate()
.then(() => {
  console.log('connect successfully');
})
.catch(err => {
  console.log('connect failed');
});

module.exports = sequelize
