const express = require("express");
const router = express.Router();
const feature = require("../controllers/feature_controller");
const authhelper = require("../helper/token_auth");

router.get("/", authhelper.tokenAuth, feature.getfeature)
router.post("/insert",authhelper.tokenAuth, feature.insertfeature )
router.post("/update",authhelper.tokenAuth, feature.updatefeature )
router.post("/delete",authhelper.tokenAuth, feature.deletefeature )


module.exports = router;