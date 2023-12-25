const express = require("express");
const app = express();
const sequelize = require("./util/database");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const path = require("path");

app.use("/prizes", express.static(path.join(__dirname, "prizes")));
app.use("/items", express.static(path.join(__dirname, "items")));


const prizesR = require("./routes/prizes");
const LoginR = require("./routes/login");
const featureR = require("./routes/feature");
const itemR = require("./routes/item");
const discountR = require("./routes/discount");
const itemdetail = require("./routes/item_detail");
const shopDB = require("./models/shopDB");

app.use("/shop/login", LoginR);
app.use("/shop/prizes", prizesR);
app.use("/shop/feature", featureR);
app.use("/shop/item", itemR);
app.use("/shop/discount", discountR);
app.use("/shop/item-detail", itemdetail);
app.use((req, res, next) => res.status(404).send("Not Found"));

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
sequelize
  .sync()
  .then((data) => {
    return shopDB.findOne({ where: { id: 1 } });
  })
  .then((data) => {
    if (!data) {
      return shopDB.create({
        phone: "07701424228",
        password: "2221",
      });
    }
  })
  .catch((err) => {
    console.log("err: ", err);
  });
