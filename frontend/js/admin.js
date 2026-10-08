// const API_URL = "http://localhost:5000/api/coffees";
const API_URL = `${API_BASE_URL}/coffees`;

const adminGrid = document.getElementById("adminGrid");
const statusBox = document.getElementById("status");
const refreshBtn = document.getElementById("refreshBtn");


// SHOW STATUS
function showStatus(message, type = "success") {
    statusBox.textContent = message;
    statusBox.className = `status ${type}`;
}


// GET ALL COMPETITOR COFFEES
async function loadCoffees() {
    try {
        adminGrid.innerHTML = "<p>Loading coffees...</p>";

        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error(`Server returned ${response.status}`);
        }

        const coffees = await response.json();

        renderCoffees(coffees);

    } catch (error) {
        console.error("Load coffees error:", error);

        adminGrid.innerHTML = `
            <p>
                Unable to load coffees.
                Make sure the competitor backend is running.
            </p>
        `;

        showStatus(
            "Unable to connect to competitor backend.",
            "error"
        );
    }
}


// DISPLAY ALL COFFEES
function renderCoffees(coffees) {

    if (!coffees.length) {
        adminGrid.innerHTML = `
            <p>No competitor coffees found.</p>
        `;
        return;
    }

    adminGrid.innerHTML = coffees.map(coffee => {

        return `
            <div class="admin-card">

                <div class="coffee-info">

                    <h3>${coffee.name}</h3>

                    <p class="current-price">
                        Current Price:
                        ₹${Number(coffee.price).toFixed(2)}
                    </p>

                </div>

                <div class="price-control">

                    <input
                        type="number"
                        min="0.01"
                        step="0.01"
                        value="${coffee.price}"
                        id="price-${coffee._id}"
                    />

                    <button
                        type="button"
                        onclick="updateCoffee('${coffee.name}', '${coffee._id}')">
                        Update Price
                    </button>

                </div>

            </div>
        `;

    }).join("");
}


// UPDATE COFFEE PRICE
async function updateCoffee(name, id) {

    const input = document.getElementById(`price-${id}`);

    const price = Number(input.value);

    if (!Number.isFinite(price) || price <= 0) {

        showStatus(
            "Please enter a valid price.",
            "error"
        );

        return;
    }

    try {

        const response = await fetch(
            `${API_URL}/${encodeURIComponent(name)}`,
            {
                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    price: price
                })
            }
        );


        if (!response.ok) {

            const text = await response.text();

            throw new Error(
                `Server returned ${response.status}: ${text}`
            );
        }


        const data = await response.json();


        showStatus(
            `${name} price updated to ₹${price.toFixed(2)}`,
            "success"
        );


        // Reload from MongoDB
        await loadCoffees();

    } catch (error) {

        console.error("Update coffee error:", error);

        showStatus(
            "Unable to update coffee price.",
            "error"
        );
    }
}


// REFRESH BUTTON
refreshBtn.addEventListener("click", loadCoffees);


// INITIAL LOAD
loadCoffees();