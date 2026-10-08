const API_URL = "http://localhost:5000/api/coffees";

const form = document.getElementById("addCoffeeForm");
const statusBox = document.getElementById("status");

function showStatus(message, type) {
    statusBox.textContent = message;
    statusBox.className = `status ${type}`;
}

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document
        .getElementById("coffeeName")
        .value
        .trim();

    const price = Number(
        document.getElementById("coffeePrice").value
    );

    if (!name) {
        showStatus(
            "Please enter a coffee name.",
            "error"
        );
        return;
    }

    if (!Number.isFinite(price) || price <= 0) {
        showStatus(
            "Please enter a valid price.",
            "error"
        );
        return;
    }

    try {

        const response = await fetch(API_URL, {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                name: name,
                price: price
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.error || "Unable to add coffee"
            );
        }

        showStatus(
            `${data.coffee.name} added successfully at ₹${Number(data.coffee.price).toFixed(2)}.`,
            "success"
        );

        form.reset();

    } catch (error) {

        console.error(
            "Add coffee error:",
            error
        );

        showStatus(
            error.message,
            "error"
        );
    }
});


