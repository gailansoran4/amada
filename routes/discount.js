const express = require("express");
const router = express.Router();
const itemDB = require("../models/itemDB");
const authhelper = require("../helper/token_auth");

router.get("/", authhelper.tokenAuth, async (req, res) => {
    const page = req.headers.page || 1;
    const pageSize = 10; 
    const offset = (page - 1) * pageSize;
  
    try {
      const data = await itemDB.findAll({ limit: pageSize, offset, where: { shopId: req.id } });
      res.json(data);
    } catch (error) {
      console.error("Error retrieving items:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
module.exports = router;
