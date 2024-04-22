
const user = require("./user");
const provinces = require('./provinces')
const address = require("./address")
const category = require("./categoty")

function router(app) {
  app.use("/api/user", user);
  app.use("/api/provinces", provinces);
  app.use("/api/address", address);
  app.use("/api/category", category);
}

module.exports = router;
