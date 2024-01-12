// routes/auth.js
const express = require("express");
const router = express.Router();
const { findUser } = require("../services/findUser.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createUserRequest } = require("../services/createUser.js");
const { addTokenToDb } = require("../services/refreshToken.js");

// User registration
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await createUserRequest(username, hashedPassword);
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// User login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const foundUser = await findUser(username);
    console.log(JSON.stringify(foundUser));
    if (!foundUser) {
      return res.status(401).json({ error: "Authentication failed" });
    }
    const match = await bcrypt.compare(password, foundUser.userpassword);
    if (match) {
      // create JWTs
      const accessToken = jwt.sign(
        { username: foundUser.user_name },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "30s" }
      );
      console.log(`from auth controller : ${foundUser.Username}`);
      const refreshToken = jwt.sign(
        { username: foundUser.user_name },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "1d" }
      );

      // add the refresh token to the database
      const addedToken = await addTokenToDb(refreshToken, foundUser.UserID);

      // set cookie with refresh token
      // res.cookie("jwt", refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        sameSite: "None",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      });

      // send both access and refresh tokens in the response
      res.json({
        success: `User ${foundUser.username} is logged in!`,
        accessToken,
      });
    } else {
      res.status(401).json({ message: "Wrong password" });
    }
  } catch (error) {
    console.error("Error during login:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
