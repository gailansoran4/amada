const express = require("express");
const router = express.Router();
const prizes = require("../controllers/prizes_controller");
const authhelper = require("../helper/token_auth");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.get("/", authhelper.tokenAuth, prizes.getprizes);
router.post("/insert", authhelper.tokenAuth, prizes.insertprize);
router.post("/update", authhelper.tokenAuth, prizes.updateprizes);
router.post("/delete", authhelper.tokenAuth, prizes.deleteprizes);

module.exports = router;
