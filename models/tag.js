const mongoose = require("mongoose");
const Joi = require("joi");

tagSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String }
});

const Tag = mongoose.model("Tag", categorySchema);

function validateTag(tag) {
  const schema = {
    name: Joi.string()
      .required()
      .min(5)
  };

  Joi.validate(schema);
}

module.exports.validateTag = validateTag;

module.exports.Tag = Tag;
