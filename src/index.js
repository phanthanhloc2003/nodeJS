const express = require("express");
const app = express();
const port = 3000;
const morgan = require("morgan");
 const router = require('./routers')
app.use(morgan("combined"));

router(app);
const Sequelize = require('sequelize');
const sequelize = new Sequelize(
  'QLBH',
  'SA',
  'Ptl2003.',
  { 
    host: 'localhost',
    dialect: 'mssql'
  }
);
sequelize.authenticate()
.then(() => {
  console.log('connect successfully');
})
.catch(err => {
  console.log('connect failed');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
