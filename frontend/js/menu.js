const API_URL = "http://localhost:5000/api/coffees";

const menuGrid = document.getElementById("menuGrid");


async function loadMenu() {

    try {

        menuGrid.innerHTML = `
            <p>Loading coffees...</p>
        `;

        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error(`Server returned ${response.status}`);
        }

        const coffees = await response.json();
        console.log(coffees);
        renderMenu(coffees);

    } catch (error) {

        console.error("Load menu error:", error);

        menuGrid.innerHTML = `
            <div class="empty">
                Unable to load coffees.
                Please make sure the competitor backend is running.
            </div>
        `;
    }
}


function renderMenu(coffees) {

    if (!coffees || coffees.length === 0) {

        menuGrid.innerHTML = `
            <div class="empty">
                No coffees available.
            </div>
        `;

        return;
    }


    menuGrid.innerHTML = coffees.map(coffee => {

        return `
            <article class="coffee-card">

                <div class="coffee-icon">
                    ☕
                </div>

                <div class="coffee-info">

                    <span class="tag">
                        COFFEE
                    </span>

                    <h3>
                        ${escapeHtml(coffee.name)}
                    </h3>

                    <p>
                        Freshly prepared coffee from
                        Bean & Bloom.
                    </p>

                    <div class="price-row">

                        <strong>
                            ₹${Number(coffee.price).toFixed(2)}
                        </strong>

                    </div>

                </div>

            </article>
        `;

    }).join("");
}


function escapeHtml(value) {

    return String(value).replace(
        /[&<>'"]/g,
        character => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            "'": "&#39;",
            '"': "&quot;"
        }[character])
    );
}


loadMenu();