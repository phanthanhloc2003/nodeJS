const jwt = require("jsonwebtoken");
const genneraAccessToken = require("./accessToken");
const updateAccsessToken = async (payload) => {
    return new Promise((resolve, reject) => {
        jwt.verify(payload, "refreshToken", async(err, user) => {
          if (err) {
            reject(err);
          } else {
         
            const access_Token = await genneraAccessToken({
              id: user?.id,
              role: user?.role,
            });
            resolve({ access_Token });
          }
        });
      });
};

module.exports = updateAccsessToken;
