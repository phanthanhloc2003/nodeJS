const jwt = require("jsonwebtoken");
const adminMiddleware = (req, res, next) => {
  const token = req.headers.token.split(" ")[1];
  jwt.verify(token, "accessToken", function (err, user) {
    if (err) {
      return res.status(403).json({
        message: "lỗi accsessToken hết hạng",
      });
    }

    if (user.role === "admin") {

      next();
    } else {
      return res.status(403).json({
        message: "Invalid token",
      });
    }
  });
};

module.exports = adminMiddleware;
