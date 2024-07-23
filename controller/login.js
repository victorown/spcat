const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

process.env.TOKEN_SECRET;

const { User } = require("../models");

router.post("/", async (req, res) => {
  try {
    const { userName, password } = req.body;

    const user = await User.findOne({ where: { userName } });

    if (!user) {
      return res.status(401).json({ message: "Username salah." });
    }

    const inputPasswordHash = crypto
      .createHash("md5")
      .update(password)
      .digest("hex");

    if (inputPasswordHash === user.password) {
      const token = generateAccessToken({ username: user.userName });
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
  console.log(process.env.TOKEN_SECRET);
  return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: "1d" });
}

module.exports = router;
