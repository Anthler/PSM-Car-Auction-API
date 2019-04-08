const express = require("express");
const Car = require("../models/car");
const validate = require("../validation")
const router = express.Router();

//(req, res) => {}

router.get("/", async(req, res) => {

    const cars = await Car.find().sort().select();
    const {error} = validate(req.body);
    if(error) {
        res.status(400).send(error.details[0].message)
        return;
    }
    res.send(cars);
})
router.post("/", (req, res) => {
    cons
})
router.get("/:id", (req, res) => {

})
router.put("/:id", (req, res) => {

})
router.delete("/:id", (req, res) => {

})

module.exports = router;


















































