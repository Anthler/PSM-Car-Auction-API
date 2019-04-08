const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");

userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true },
  password: { type: String, minlength: 5, maxlength: 1024 },
  isSeller: Boolean,
  address: { type: String }
});

userSchema.methods.generateToken = function() {
  const token = jwt.sign(
    { _id: this._id, isSeller: this.isSeller},
    config.get("jwtprivatekey")
  );

  return token;
};

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = {
    name: Joi.string()
      .required()
      .min(5)
  };

  return Joi.validate(user, schema);
}

module.exports.validateUser = validateUser;

module.exports.User = User;
