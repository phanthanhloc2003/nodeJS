
const jwt = require('jsonwebtoken');

const genneraAccessToken = (payload) => {
  const accessToken = jwt.sign(
    {
      ...payload,
    },
    "accessToken",
    { expiresIn: "1h" }
  );

  return accessToken;
};
module.exports = genneraAccessToken;
