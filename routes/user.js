const express = require("express");
const config = require("config");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User, validateUser } = require("../models/user");
const auth = require("../middleware/auth");

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

router.post("/signup", async (req, res) => {
  try {
    // const error = validateUser(req.body);
    // if (error) {
    //   return res.status(400).send(error.details[0].message);
    // }

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("User is already registered");
    user = new User({
      name: req.body.name,
      password: req.body.password,
      email: req.body.email,
      isSeller: req.body.isSeller,
      address: req.body.address
    });
    salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    const token = user.generateToken();
    res.header("x-auth-token", token).send(token);
  } catch (err) {
    err.message;
  }
});

module.exports = router;
