const user = require("./user");
const provinces = require("./provinces");
const address = require("./address");
const menuBlock = require("./menuBlock");
const product = require("./product");
const cart = require("./cart");
const checkout = require("./checkout");
const order = require("./order");
function router(app) {
  app.use("/api/user", user);
  app.use("/api/provinces", provinces);
  app.use("/api/address", address);
  app.use("/api/menuBlock", menuBlock);
  app.use("/api/product", product);
  app.use("/api/cart", cart);
  app.use("/api/checkout", checkout);
  app.use("/api/order", order);
}
module.exports = router;
