document.addEventListener("DOMContentLoaded", function () {

    // Mobile menu toggle (if needed)
    const mobileMenuButton = document.createElement("button");
    mobileMenuButton.innerText = "☰ Menu";
    mobileMenuButton.classList.add("mobile-menu-button");
    document.querySelector("header").prepend(mobileMenuButton);

    const nav = document.querySelector("nav ul");
    mobileMenuButton.addEventListener("click", function () {
        nav.classList.toggle("open");
    });

    // Ensure the menu is hidden by default on mobile
    function checkScreenWidth() {
        if (window.innerWidth <= 768) {
            nav.classList.remove("open");
            nav.style.display = "none"; // Initially hide the menu on mobile
            mobileMenuButton.style.display = "block"; // Show the menu button
        } else {
            nav.classList.remove("open");
            nav.style.display = "flex"; // Make the menu visible on desktop
            mobileMenuButton.style.display = "none"; // Hide the menu button on desktop
        }
    }

    // Toggle the menu on button click
    mobileMenuButton.addEventListener("click", function () {
        if (nav.classList.contains("open")) {
            nav.style.display = "block"; // Show the menu
        } else {
            nav.style.display = "none"; // Hide the menu
        }
    });

    // Run checkScreenWidth function to ensure proper display
    checkScreenWidth();
    window.addEventListener("resize", checkScreenWidth);

    // Scroll animations
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, { threshold: 0.3 });

    document.querySelectorAll("section").forEach(section => {
        section.classList.add("hidden");
        observer.observe(section);
    });
});
