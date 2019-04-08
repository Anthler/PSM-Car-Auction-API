const express = require("express");
const Joi = require("joi");
const router = express.Router();
const { Car, validateCar } = require("../models/car");
const auth = require("../middleware/auth")
const seller = require("../middleware/sellers");

//(req, res) => {}

router.get("/", async (req, res) => {
  
    const cars = await Car.find().sort("name");
    res.status(200).send(cars);
  
    //res.status(500).send("Something Happened");
  
});

router.post("/", [auth, seller], async (req, res) => {
  try {
    const error = validateCar(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let car = new Car({
      name: req.body.name,
      mileage: req.body.mileage,
      year: req.body.year,
      condition: req.body.condition,
      transmition: req.body.transmition,
      vn_number: req.body.vn_number,
      category: req.body.category,
      tag: req.body.tag
    });

    car = await car.save();
    res.status(200).send(car);
  } catch (err) {
    res.send(err.message);
  }
});
router.get("/:id", async (req, res) => {
  const car = await Car.findById(req.params.id);
  if (!car) return res.status(404).send("Car not found");
  res.status(200).send(car);
});
router.put("/:id", async (req, res) => {
  try {
    const error  = validateCar(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const car = await Car.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        mileage: req.body.mileage,
        year: req.body.year,
        condition: req.body.condition,
        transmition: req.body.transmition,
        vn_number: req.body.vn_number,
        category: req.body.category,
        tag: req.body.tag
      },
      { new: true }
    );
  
    if (!car) return res.status(404).send("The Car with given ID does not exist");
  
    res.status(200).send(car);
  } catch (err) {
      res.send(err.message);
  }
});
router.delete("/:id", async (req, res) => {
  const car = await Car.findByIdAndDelete(req.params.id);
  res.send(car);
});

module.exports = router;
