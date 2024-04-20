const user = require("./user");
const provinces = require('./provinces')
const address = require("./address")
function router(app) {
  app.use("/api/user", user);
  app.use("/api/provinces", provinces);
  app.use("/api/address", address);
}

module.exports = router;
