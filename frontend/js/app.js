const API = "http://localhost:5000/api";

async function loadFeatured() {
    const root = document.getElementById("featured");

    try {
        const res = await fetch(`${API}/coffees`);

        if (!res.ok) {
            throw new Error("Could not load menu");
        }

        const coffees = await res.json();

        root.innerHTML = coffees
            .slice(0, 3)
            .map(card)
            .join("");

    } catch (e) {
        root.innerHTML =
            '<div class="empty">Backend is offline. Start the competitor backend and refresh.</div>';
    }
}

function card(c) {
    return `
        <article class="coffee-card">

            <div class="coffee-icon">
                ${c.icon || "☕"}
            </div>

            <div class="coffee-info">

                <span class="tag">SIGNATURE</span>

                <h3>${escapeHtml(c.name)}</h3>

                <div class="price-row">

                    <strong>
                        ₹${Number(c.price).toFixed(2)}
                    </strong>

                    <a href="menu.html">
                        Order
                    </a>

                </div>

            </div>

        </article>
    `;
}

function escapeHtml(value) {
    return String(value).replace(
        /[&<>'"]/g,
        c => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            "'": "&#39;",
            '"': "&quot;"
        }[c])
    );
}

loadFeatured();