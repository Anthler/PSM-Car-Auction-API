const mongoose = require("mongoose");
const Joi = require("joi");

carSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mileage: { type: Number, required: false },
  year: { type: Date },
  condition: { type: String },
  transmition: String,
  vn_number: Number,
  category: { type: String },
  tag: { type: String }
});

const Car = mongoose.model("Car", carSchema);

function validateCar(car) {
  const schema = {
    name: Joi.string()
      .required()
      .min(5),
    condition: Joi.string().required()
  };

  Joi.validate(schema);
}

module.exports.validateCar = validateCar;

module.exports.Car = Car;
