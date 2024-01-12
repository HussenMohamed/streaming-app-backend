const { pool } = require("../model/db.config");

const addTokenToDb = async (refreshToken, userId) => {
  try {
    // Check if username or email or phoneNumber already exist in the database
    const [result] = await pool.query(
      "UPDATE users SET refresh_token = ? WHERE user_id = ?",
      [refreshToken, userId]
    );

    // return result;
  } catch (error) {
    // Handle any error that might occur during the database query
    console.error("Error adding the refresh token :", error.message);
    return true; // Return true to indicate an error occurred
  }
};
module.exports = { addTokenToDb };
