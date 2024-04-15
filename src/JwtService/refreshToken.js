const jwt = require('jsonwebtoken');

const genneraRefreshToken = (payload) => {
    const refreshToken = jwt.sign(
      {
        ...payload,
      },
      "refreshToken",
      { expiresIn: "1h" }
    );
  
    return refreshToken;
  };
  module.exports = genneraRefreshToken;