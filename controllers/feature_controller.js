const feature = require("../models/featureDb");

exports.getfeature = async (req, res, next) => {
  const data = await feature.findAll({ where: { shopId: req.id } });

  res.send(data);
};

exports.insertfeature = async (req, res, next) => {
  const data = await feature.create({
    name: req.body.name,
    shopId: req.id,
  });
  console.log(data);
  res.send("successfully insert the row");
};

exports.updatefeature = async (req, res, next) => {
  const updatedValues = {
    name: req.body.name,
  };

  const updateCondition = {
    where: {
      id: req.body.id,
    },
  };

  try {
    const [updatedRowCount] = await feature.update(
      updatedValues,
      updateCondition
    );

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

exports.deletefeature = async (req, res, next) => {
  const idToDelete = req.body.id;

  try {
    const deletedRowsCount = await feature.destroy({
      where: { id: idToDelete },
    });

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
