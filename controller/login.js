const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

process.env.TOKEN_SECRET;

const { User } = require("../models"); // Assuming your User model is defined in models/user.js

router.post("/", async (req, res) => {
  try {
    const { userName, password } = req.body;

    // Mencari pengguna berdasarkan username
    const user = await User.findOne({ where: { userName } });

    // Memeriksa apakah pengguna ditemukan
    if (!user) {
      return res.status(401).json({ message: "Username salah." });
    }

    // Membandingkan password yang dikirim dengan password hash
    const inputPasswordHash = crypto
      .createHash("md5")
      .update(password)
      .digest("hex");

    if (inputPasswordHash === user.password) {
      // Assuming the hashed password is stored directly in the 'password' field
      // Generate access token dan mengirimkannya sebagai respons
      const token = generateAccessToken({ username: user.userName }); // Assuming the username field is 'userName'
      return res.json({ token });
    } else {
      return res.status(401).json({ message: "Password salah." });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Terjadi kesalahan pada server." });
  }
});

function generateAccessToken(username) {
  return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: "1d" });
}

module.exports = router;
