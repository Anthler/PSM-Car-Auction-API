const mongoose = require("mongoose");
const Joi = require("joi");

authSchema = new mongoose.Schema({
  email: { required: true },
  password: { required: true }
});

const Auth = mongoose.model("Auth", authSchema);

module.exports.Auth = Auth;
