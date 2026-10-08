const express = require("express");
const router = express.Router();

const {
    addCoffee,
    getAllCoffees,
    updateCoffee
} = require("../controllers/competitorController");

router.post("/", addCoffee);
router.get("/", getAllCoffees);
router.put("/:name", updateCoffee);

module.exports = router;