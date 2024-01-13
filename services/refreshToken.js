const { pool } = require("../model/db.config");

const addTokenToDb = async (refreshToken, userId) => {
  try {
    // Check if username or email or phoneNumber already exist in the database
    const [result] = await pool.query(
      "UPDATE users SET refreshToken = ? WHERE userId = ?",
      [refreshToken, userId]
    );

    // return result;
  } catch (error) {
    // Handle any error that might occur during the database query
    console.error("Error adding the refresh token :", error.message);
    return true; // Return true to indicate an error occurred
  }
};

const findRefreshToken = async (refreshToken) => {
  try {
    // Check if username or email or phoneNumber already exist in the database
    const [rows] = await pool.query(
      "SELECT * FROM users WHERE refreshToken = ? ",
      [refreshToken]
    );
    console.log(`Rows in findRefreshToken: ${rows.length}`);
    return rows[0];
  } catch (error) {
    // Handle any error that might occur during the database query
    console.error("Error Finding the refresh Token:", error.message);
    throw error; // Re-throw the error to let the calling function handle it
  }
};
module.exports = { addTokenToDb, findRefreshToken };
