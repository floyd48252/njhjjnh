const menu = document.getElementById("sideMenu");
const menuButton = document.getElementById("menuBtn");
const closeButton = document.getElementById("closeMenu");
const overlay = document.getElementById("overlay");

function setMenuOpen(open) {
    menu.classList.toggle("open", open);
    overlay.classList.toggle("visible", open);
    document.body.classList.toggle("menu-open", open);
    menuButton.setAttribute("aria-expanded", String(open));
    menu.setAttribute("aria-hidden", String(!open));
}

menuButton.setAttribute("aria-controls", "sideMenu");
menuButton.setAttribute("aria-expanded", "false");
menu.setAttribute("aria-hidden", "true");
menuButton.addEventListener("click", () => setMenuOpen(true));
closeButton.addEventListener("click", () => setMenuOpen(false));
overlay.addEventListener("click", () => setMenuOpen(false));
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        setMenuOpen(false);
    }
});

const statusButton = document.getElementById("connectionStatus");
const statusText = document.getElementById("statusText");
const modeTitle = document.getElementById("modeTitle");
const modeDescription = document.getElementById("modeDescription");

function updateConnectionStatus() {
    const online = navigator.onLine;
    statusButton.classList.toggle("offline", !online);
    statusText.textContent = online ? "Online" : "Offline";
    modeTitle.textContent = online ? "Online Mode" : "Offline Mode";
    modeDescription.textContent = online
        ? "Access broader agricultural information."
        : "You may have limited access while offline.";
}

window.addEventListener("online", updateConnectionStatus);
window.addEventListener("offline", updateConnectionStatus);
updateConnectionStatus();

const searchInput = document.getElementById("globalSearch");
const searchButton = document.getElementById("searchButton");
const searchResults = document.getElementById("searchResults");
const pages = [
    { title: "Farm Hub", href: "farm-hub.html", keywords: "farm farming crops livestock planting soil" },
    { title: "Marketplace", href: "marketplace.html", keywords: "market buy sell produce products" },
    { title: "Agribusiness", href: "agribusiness.html", keywords: "business manage farm finance" },
    { title: "Market Intelligence", href: "market-intelligence.html", keywords: "prices market intelligence trends" },
    { title: "Logistics", href: "logistics.html", keywords: "transport storage delivery shipping" },
    { title: "Community", href: "community.html", keywords: "community people connect discussion" },
    { title: "Resources", href: "resources.html", keywords: "resources knowledge guides learning" },
    { title: "Farmers Library", href: "farmers-library.html", keywords: "school form one form two form three form four tvet university study agriculture biology notes" },
    { title: "Experts", href: "experts.html", keywords: "experts advice professional specialists" },
    { title: "Farmers AI", href: "farmers-ai.html", keywords: "ai assistant help questions" },
    { title: "FARMERS PRO", href: "subscription.html", keywords: "pro premium subscription plans" },
    { title: "Profile", href: "profile.html", keywords: "profile account user" },
];

function searchPages() {
    const query = searchInput.value.trim().toLocaleLowerCase();
    searchResults.replaceChildren();

    if (!query) {
        searchInput.focus();
        return;
    }

    const matches = pages.filter((page) =>
        `${page.title} ${page.keywords}`.toLocaleLowerCase().includes(query),
    );

    if (matches.length === 0) {
        const message = document.createElement("p");
        message.className = "search-empty";
        message.textContent = "No matching tools found. Try another search.";
        searchResults.append(message);
        return;
    }

    for (const page of matches) {
        const link = document.createElement("a");
        link.className = "search-result";
        link.href = page.href;

        const title = document.createElement("strong");
        title.textContent = page.title;
        const action = document.createElement("span");
        action.textContent = "Open page →";

        link.append(title, action);
        searchResults.append(link);
    }
}

searchButton.addEventListener("click", searchPages);
searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        searchPages();
    }
});
document.addEventListener("click", (event) => {
    if (!searchInput.contains(event.target) && !searchButton.contains(event.target) && !searchResults.contains(event.target)) {
        searchResults.replaceChildren();
    }
});
