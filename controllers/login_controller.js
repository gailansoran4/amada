const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const shop = require("../models/shopDB");

const secretKey =
  "7f72acfed1f65f573b7891f6602e974f60f8030c30aa2b48818032687381d8a5";

const login = async (req, res, next) => {
  try {
    const data = await shop.findOne({ phone: req.headers.phone, password: req.headers.password });

    if (!data) {
      return res.status(404).send({ error: "User not found" });
    }

    if (data.password !== req.headers.password) {
      return res.status(401).send({ error: "Incorrect password" });
    }
    if (data.phone !== req.headers.phone) {
      return res.status(401).send({ error: "Incorrect phone number" });
    }
    const token = jwt.sign(
      {
        phone: req.headers.phone,
        password: req.headers.password,
        id: data.id,
      },
      secretKey,
      { expiresIn: "1y" }
    );
    res.send({ token: token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send({ error: "Internal server error" });
  }
};

module.exports = { login };
