console.log("Theme JS loaded");

const toggle = document.getElementById("themeToggle");

if (!toggle) {
    console.error("Theme button not found");
} else {

    // Load saved theme
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
    }

    toggle.addEventListener("click", function () {

        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {

            localStorage.setItem("theme", "dark");

            toggle.textContent = "☀️";

        } else {

            localStorage.setItem("theme", "light");

            toggle.textContent = "🌙";
        }

    });
}