const item = require("../models/itemDB");
const feature = require("../models/featureDb");

const fs = require("fs");
const path = require("path");

exports.insertitem = async (req, res, next) => {
  try {
    const newItem = await item.create({
      shopId: req.id,
      name: req.body.name,
      price: req.body.price,
      discount: req.body.discount,
      is_available: true,
    });

    const features = await feature.findAll({
      where: { id: req.body.features },
    });

    const extraItems = await item.findAll({
      where: { id: req.body.more_items },
    });

    await newItem.setFeatures(features);
    await newItem.setExtraItems(extraItems);

    const imageBuffer = Buffer.from(req.body.image, "base64");
    const imagePath = path.join("items", `${newItem.id}.png`);

    fs.writeFileSync(imagePath, imageBuffer);

    console.log("Image saved successfully");
    console.log("Successfully inserted the row");
    res.status(201).json({ message: "Successfully inserted the row", newItem });
  } catch (error) {
    console.error("Error inserting item:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateitem = async (req, res, next) => {
  try {
    const itemId = req.body.id;

    const existingItem = await item.findByPk(itemId);

    if (!existingItem) {
      return res.status(404).json({ error: "Item not found" });
    }

    existingItem.name = req.body.name;
    existingItem.price = req.body.price;
    existingItem.discount = req.body.discount;
    existingItem.image = "req.body.image";

    const features = await feature.findAll({
      where: { id: req.body.features },
    });
    const extraItems = await item.findAll({
      where: { id: req.body.more_items },
    });

    await existingItem.setFeatures(features);
    await existingItem.setExtraItems(extraItems);

    await existingItem.save();

    console.log("Successfully updated the item");
    res.status(200).json({
      message: "Successfully updated the item",
      updatedItem: existingItem,
    });
  } catch (error) {
    console.error("Error updating item:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deleteitem = async (req, res, next) => {
  try {
    const itemId = req.body.id;

    const itemToDelete = await item.findByPk(itemId);

    if (!itemToDelete) {
      console.log("Item not found in the table");
      return res.status(404).json({ error: "Item not found" });
    }

    await itemToDelete.destroy();

    console.log("Successfully deleted the item");
    res.status(200).json({ message: "Successfully deleted the item" });
  } catch (error) {
    console.error("Error deleting item:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.updateavalable = async (req, res, next) => {
  const itemId = req.body.id;
  const is_available = req.body.is_available;

  const itemToDelete = await item.findByPk(itemId);

  if (!itemToDelete) {
    console.log("Item not found in the table");
    return res.status(404).json({ error: "Item not found" });
  }

  await itemToDelete.update({ is_available: is_available });

  console.log("Successfully update the item");
  res.status(200).json({ message: "Successfully update the item" });
};

// exports.updatefeature  = async (req, res, next) => {
//   const updatedValues = {
//     name: req.body.name,
//   };

//   const updateCondition = {
//     where: {
//       id: req.body.id,
//     },
//   };

//   try {
//     const [updatedRowCount] = await feature.update(updatedValues, updateCondition);

//     if (updatedRowCount > 0) {
//       res.send(`Successfully updated ${updatedRowCount} row`);
//     } else {
//       res.status(404).send(`No row found with ID ${req.body.id}`);
//     }
//   } catch (error) {
//     console.error("Error updating row:", error);
//     res.status(500).send("Internal Server Error");
//   }
// };

// exports.deletefeature = async (req, res, next) => {
//   const idToDelete = req.body.id;

//   try {
//     const deletedRowsCount = await feature.destroy({
//       where: { id: idToDelete },
//     });

//     if (deletedRowsCount > 0) {
//       res.send(`Successfully deleted ${deletedRowsCount} row`);
//     } else {
//       res.status(404).send(`No row found with ID ${idToDelete}`);
//     }
//   } catch (error) {
//     console.error("Error deleting row:", error);
//     res.status(500).send("Internal Server Error");
//   }
// };
