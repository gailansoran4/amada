const express = require('express');
const router = express.Router();
const itemDB = require('../models/itemDB'); 
const featureDb = require('../models/featureDb');
const authhelper = require('../helper/token_auth');
const path = require('path');

router.get("/:itemID", authhelper.tokenAuth, async (req, res) => {
  console.log(req.params.itemID, '-------------------------');
  const itemid = req.params.itemID;

  try {
    const data = await itemDB.findOne({
      where: { id: itemid },
      include: [
        {
          model: itemDB,
          as: "extraItems",
          through: { attributes: [] },
        },
        {
          model: featureDb,
          as: "features",
          through: { attributes: [] },
        },
      ],
    });

    if (!data) {
      return res.json({ error: "Item not found" });
    }

    const imagePath = path.posix.join("items", `${data.id}.png`);
    const dataWithImage = {
      ...data.toJSON(),
      imagePath,
    };

    const extraItemsWithImages = data.extraItems.map((extraItem) => {
      const extraItemImagePath = path.posix.join("items", `${extraItem.id}.png`);
      return {
        ...extraItem.toJSON(),
        imagePath: extraItemImagePath,
      };
    });

    dataWithImage.extraItems = extraItemsWithImages;

    res.json(dataWithImage);
  } catch (error) {
    console.error("Error retrieving item:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
