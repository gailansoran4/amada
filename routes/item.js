const express = require("express");
const router = express.Router();
const item = require("../controllers/item_controller");
const authhelper = require("../helper/token_auth");


router.post("/insert",authhelper.tokenAuth, item.insertitem )
router.post("/update",authhelper.tokenAuth, item.updateitem )
router.post("/delete",authhelper.tokenAuth, item.deleteitem )
router.post("/set-available",authhelper.tokenAuth, item.updateavalable )


module.exports = router;