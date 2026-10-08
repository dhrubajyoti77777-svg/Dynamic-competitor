const CompetitorCoffee = require("../models/competitorCoffee.model");


// ADD NEW COMPETITOR COFFEE
const addCoffee = async (req, res) => {
    try {
        const name = String(req.body?.name || "")
            .trim()
            .toLowerCase();

        const price = Number(req.body?.price);

        if (!name) {
            return res.status(400).json({
                error: "Coffee name is required"
            });
        }

        if (!Number.isFinite(price) || price <= 0) {
            return res.status(400).json({
                error: "Price must be greater than 0"
            });
        }

        const existingCoffee = await CompetitorCoffee.findOne({ name });

        if (existingCoffee) {
            return res.status(409).json({
                error: `Coffee '${name}' already exists`
            });
        }

        const coffee = await CompetitorCoffee.create({
            name,
            price: Number(price.toFixed(2))
        });

        res.status(201).json({
            message: "Competitor coffee added successfully",
            coffee
        });

    } catch (error) {

        console.error("Add competitor coffee error:", error.message);

        res.status(500).json({
            error: "Unable to add competitor coffee"
        });
    }
};


const getAllCoffees = async (req, res) => {
    try {
        const coffees = await CompetitorCoffee
            .find({})
            .sort({ name: 1 })
            .lean();

        res.status(200).json(coffees);

    } catch (error) {

        console.error("Get competitor coffees error:", error.message);

        res.status(500).json({
            error: "Unable to fetch competitor coffees"
        });
    }
};


const updateCoffee = async (req, res) => {
    try {
        const name = String(req.params.name || "")
            .trim()
            .toLowerCase();

        const price = Number(req.body?.price);

        if (!name) {
            return res.status(400).json({
                error: "Coffee name is required"
            });
        }

        if (!Number.isFinite(price) || price <= 0) {
            return res.status(400).json({
                error: "Price must be greater than 0"
            });
        }

        const coffee = await CompetitorCoffee.findOneAndUpdate(
            { name },
            {
                $set: {
                    price: Number(price.toFixed(2))
                }
            },
            {
                returnDocument: "after"
            }
        );

        if (!coffee) {
            return res.status(404).json({
                error: `Coffee '${name}' not found`
            });
        }

        res.status(200).json({
            message: "Coffee price updated successfully",
            coffee
        });

    } catch (error) {
        console.error("Update competitor coffee error:", error.message);

        res.status(500).json({
            error: "Unable to update competitor coffee"
        });
    }
};


module.exports = {
    addCoffee,
    getAllCoffees,
    updateCoffee
};