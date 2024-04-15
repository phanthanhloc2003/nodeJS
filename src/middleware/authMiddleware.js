const jwt = require("jsonwebtoken");
const authMiddleware = (req, res, next) => {
  const token = req.headers.token.split(" ")[1];
  jwt.verify(token, "accessToken", function (err, user) {
    if (err) {
        return res.status(403).json({
          message: "lỗi accsessToken hết hạng"
        });
      }
    
    if (user) {
        req.userId= user.id
      next()
    }
    else{
        return res.status(403).json({
            message: "Invalid token",
        });
    }
  });
  
};

module.exports = authMiddleware