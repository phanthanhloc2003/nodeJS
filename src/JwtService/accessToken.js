
const jwt = require('jsonwebtoken');

const genneraAccessToken = (payload) => {
  const accessToken = jwt.sign(
    {
      ...payload,
    },
    "accessToken",
    { expiresIn: "30s" }
  );

  return accessToken;
};
module.exports = genneraAccessToken;
