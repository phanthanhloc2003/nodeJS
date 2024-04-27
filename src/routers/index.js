
const user = require("./user");
const provinces = require('./provinces')
const address = require("./address")
const menuBlock = require("./menuBlock")
const product = require("./product")


function router(app) {
  app.use("/api/user", user);
  app.use("/api/provinces", provinces);
  app.use("/api/address", address);
  app.use("/api/menuBlock",menuBlock );
  app.use("/api/product",product );
}

module.exports = router;
