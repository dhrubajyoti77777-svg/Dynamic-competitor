const axios = require("axios");

const updateCompetitorPrice = async (name, price) => {
    const baseUrl = process.env.EXISTING_DYNAMIC_PRICING_API_URL;
    if (!baseUrl) throw new Error("EXISTING_DYNAMIC_PRICING_API_URL is not configured");

    const response = await axios.post(
        `${baseUrl.replace(/\/$/, "")}/api/competitor`,
        { name, price },
        { timeout: 15000, headers: { "Content-Type": "application/json" } }
    );
    return response.data;
};

module.exports = { updateCompetitorPrice };
