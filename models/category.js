const mongoose = require("mongoose");
const Joi = require("joi");

categorySchema = new mongoose.Schema({
  name: { type: String, require: true },
  description: { type: String }
});

const Category = mongoose.model("Car", categorySchema);

function validateCategory(category) {
  const schema = {
    name: Joi.string()
      .required()
      .min(5)
  };

  Joi.validate(schema);
}

module.exports.validateCategory = validateCategory;

module.exports.Category = Category;
