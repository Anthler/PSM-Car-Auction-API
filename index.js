require("express-async-errors");
const mongoose = require("mongoose");
const express = require("express");
const config = require("config");
const app = express();
const Joi = require("joi");
const car = require("./routes/car");
const Category = require("./routes/category");
const Tag = require("./routes/tag");
const user = require("./routes/user");
const auth = require("./routes/auth");

if (!config.get("jwtprivatekey")) {
  console.log("fatal error jwt is not defined");
  process.exit(1);
}

app.use(express.json());
app.use("/api/cars", car);
app.use("/api/auth", auth);
//app.use("/api/tags", Tag);
app.use("/api/users", user);

mongoose
  .connect("mongodb://localhost/psmg")
  .then(() => {
    console.log("connected to DB");
  })
  .catch(err => {
    console.log("Could not connect to database" + err);
  });

port = process.env.Port || 4000;
app.listen(4000, () => {
  console.log("Server running on port" + port);
});
