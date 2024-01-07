const prize = require("../models/prizeDB");
const multer = require("multer");
const upload = multer({ dest: "prize/" });
const fs = require("fs");
const path = require("path");

exports.getprizes = async (req, res, next) => {
  try {
    const prizes = await prize.findAll({ where: { shopId: req.id } });

    const prizesWithImages = prizes.map((prize) => {
      const imageUrl = `/Prizes/${prize.id}.png`; 
      return { ...prize.dataValues, imageUrl };
    });

    res.send(prizesWithImages);
  } catch (error) {
    console.error("Error fetching prizes:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};


exports.insertprize = async (req, res, next) => {
  console.log(req.file, "--------------------");
  const data = await prize.create({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    is_available: req.body.is_available,
    shopId: req.id,
  });
  const imageBuffer = Buffer.from(req.body.image, "base64");
  const imagePath = path.join("Prizes", `${data.id}.png`);

  fs.writeFileSync(imagePath, imageBuffer);
  console.log(data);
  res.send("successfully insert the row");
};

exports.updateprizes = async (req, res, next) => {
  const updatedValues = {
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    is_available: req.body.is_available,
  };

  const updateCondition = {
    where: {
      id: req.body.id,
    },
  };

  try {
    const [updatedRowCount] = await prize.update(
      updatedValues,
      updateCondition
    );
    const imageBuffer = Buffer.from(req.body.image, "base64");
    const imagePath = path.join("Prizes", `${updatedRowCount.id}.png`);

    fs.writeFileSync(imagePath, imageBuffer);
    if (updatedRowCount > 0) {
      res.send(`Successfully updated ${updatedRowCount} row`);
    } else {
      res.status(404).send(`No row found with ID ${req.body.id}`);
    }
  } catch (error) {
    console.error("Error updating row:", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.deleteprizes = async (req, res, next) => {
  const idToDelete = req.body.id;

  try {
    const deletedRowsCount = await prize.destroy({ where: { id: idToDelete } });

    if (deletedRowsCount > 0) {
      res.send(`Successfully deleted ${deletedRowsCount} row`);
    } else {
      res.status(404).send(`No row found with ID ${idToDelete}`);
    }
  } catch (error) {
    console.error("Error deleting row:", error);
    res.status(500).send("Internal Server Error");
  }
};
