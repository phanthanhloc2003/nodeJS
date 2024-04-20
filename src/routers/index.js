const user = require("./user");
const provinces = require('./provinces')
function router(app) {
  app.use("/api/user", user);
  app.use("/api/provinces", provinces);
}

module.exports = router;
