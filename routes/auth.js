const router = require("express").Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const { User, validateUser } = require("../models/user");

router.post("/", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).send("Email or password is incorrect");
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.status(400).send("Email or password is incorrect");
    }

    const token = user.generateToken();

    res.send(token);
  } catch (err) {
    res.send(err.message);
  }
});

module.exports = router;
