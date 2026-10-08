const mongoose = require("mongoose");

const competitorCoffeeSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true, trim: true },
        price: { type: Number, required: true, min: 0 }
    },
    { collection: "competitorcoffees", timestamps: true, strict: false }
);

module.exports = mongoose.model("CompetitorCoffee", competitorCoffeeSchema);
