const { pool } = require("../model/db.config");

const findUser = async (username) => {
  try {
    console.log("userName: " + username);
    // Check if username or email or phoneNumber already exist in the database
    const [rows] = await pool.query(`SELECT * FROM users WHERE username = ? `, [
      username,
    ]);
    console.log(`rows[0]`);
    console.log(rows);
    return rows[0];
  } catch (error) {
    // Handle any error that might occur during the database query
    console.error("Error Finding the user:", error.message);
    throw error; // Re-throw the error to let the calling function handle it
  }
};

module.exports = { findUser };
