const { findRefreshToken } = require("../services/refreshToken.js");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const handleRefreshToken = async (req, res) => {
  try {
    const cookies = req.cookies;
    console.log(cookies);
    if (!cookies?.jwt) return res.sendStatus(401); // Unauthorized
    console.log(`From refreshToken Controller Cookies JWT: ${cookies.jwt}`);
    // get the refresh token
    const refreshToken = cookies.jwt;
    const foundUser = await findRefreshToken(refreshToken);
    console.log("Found User: ", foundUser);
    if (!foundUser) return res.sendStatus(403); // Forbidden
    //evaluate jwt
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err || foundUser.username !== decoded.username)
          return res.sendStatus(403); // Forbidden
        const accessToken = jwt.sign(
          { username: decoded.username },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "30s" }
        );
        res.json({ accessToken });
      }
    );
  } catch (error) {
    console.error("Error during login:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = handleRefreshToken;
