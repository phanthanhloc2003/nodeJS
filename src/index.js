const express = require("express");
const app = express();
const port = 3000;
const morgan = require("morgan");
const router = require("./routers");
const bodyParser = require("body-parser");
const path = require('path');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/public')));
router(app);
app.use(morgan("combined"));
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
