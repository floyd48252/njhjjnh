(function () {
    "use strict";

    const planKey = "farmersSubscriptionTier";
    const trialKey = "farmersPremiumTrialStart";
    const trialDuration = 7 * 24 * 60 * 60 * 1000;
    const tiers = {
        basic: 0,
        premium: 1,
        enterprise: 2
    };
    const protectedPages = {
        "farmers-ai.html": "premium",
        "marketplace.html": "premium",
        "market-intelligence.html": "premium",
        "resources.html": "premium",
        "farmers-library.html": "premium"
    };

    function getPlan() {
        const savedPlan = localStorage.getItem(planKey);
        if (savedPlan === "enterprise" || savedPlan === "premium") {
            return savedPlan;
        }

        const trialStart = Number(localStorage.getItem(trialKey));
        if (Number.isFinite(trialStart) &&
            trialStart > 0 &&
            Date.now() >= trialStart &&
            Date.now() - trialStart < trialDuration) {
            return "premium";
        }

        return "basic";
    }

    function hasAccess(requiredPlan) {
        return tiers[getPlan()] >= tiers[requiredPlan];
    }

    function upgradeUrl(service) {
        const query = new URLSearchParams();
        query.set("required", "premium");
        if (service && protectedPages[service]) {
            query.set("return", service);
        }
        return `subscription.html?${query.toString()}`;
    }

    function showAccessWall(requiredPlan, service) {
        const main = document.querySelector("main");
        if (!main || hasAccess(requiredPlan)) {
            return hasAccess(requiredPlan);
        }

        const section = document.createElement("section");
        section.className = "plan-access-wall";

        const label = document.createElement("p");
        label.className = "plan-access-label";
        label.textContent = `${requiredPlan.toUpperCase()} FEATURE`;

        const heading = document.createElement("h1");
        heading.textContent = "Upgrade to continue";

        const message = document.createElement("p");
        message.textContent = "Farmers AI, Marketplace, Market Intelligence, the Resources Library, and Farmers Library are available with FARMERS Premium or Enterprise.";

        const link = document.createElement("a");
        link.className = "plan-access-button";
        link.href = upgradeUrl(service);
        link.textContent = "View Premium plans";

        const back = document.createElement("a");
        back.className = "plan-access-back";
        back.href = "index.html";
        back.textContent = "Return to Home";

        section.append(label, heading, message, link, back);
        main.replaceChildren(section);
        document.body.classList.add("plan-access-limited");
        return false;
    }

    function currentPage() {
        return location.pathname.split("/").pop().toLowerCase();
    }

    function addStyles() {
        const style = document.createElement("style");
        style.textContent = `
            .plan-access-wall {
                width: min(680px, 100%);
                margin: 48px auto;
                padding: clamp(24px, 6vw, 48px);
                border: 1px solid rgba(114, 214, 154, .24);
                border-radius: 22px;
                background: linear-gradient(145deg, #10291c, #0c1d14 70%);
                text-align: center;
            }
            .plan-access-label {
                color: var(--green, #72d69a);
                font-size: 11px;
                font-weight: 800;
                letter-spacing: .14em;
            }
            .plan-access-wall h1 {
                margin: 12px 0;
                color: var(--text, #e8f5ef);
            }
            .plan-access-wall > p:not(.plan-access-label) {
                margin: 0 auto 22px;
                color: var(--muted, #9aaba3);
                line-height: 1.7;
            }
            .plan-access-button,
            .plan-access-back {
                display: inline-block;
                margin: 6px;
                padding: 11px 16px;
                border-radius: 10px;
                text-decoration: none;
                font-weight: 700;
            }
            .plan-access-button {
                background: var(--green, #72d69a);
                color: #092015;
            }
            .plan-access-back {
                border: 1px solid rgba(203, 235, 216, .2);
                color: var(--text, #e8f5ef);
            }
        `;
        document.head.append(style);
    }

    addStyles();

    const page = currentPage();
    if (protectedPages[page]) {
        showAccessWall(protectedPages[page], page);
        window.addEventListener("storage", () => {
            showAccessWall(protectedPages[page], page);
        });

        const trialStart = Number(localStorage.getItem(trialKey));
        const trialRemaining = trialStart + trialDuration - Date.now();
        if (hasAccess("premium") &&
            !localStorage.getItem(planKey) &&
            Number.isFinite(trialStart) &&
            trialRemaining > 0) {
            window.setTimeout(() => {
                showAccessWall("premium", page);
            }, trialRemaining);
        }
    }

    document.addEventListener("click", (event) => {
        if (!(event.target instanceof Element)) {
            return;
        }
        const link = event.target.closest("a[href]");
        if (!link) {
            return;
        }

        const destination = new URL(link.href, location.href);
        const destinationPage = destination.pathname.split("/").pop().toLowerCase();
        const requiredPlan = protectedPages[destinationPage];
        if (requiredPlan && !hasAccess(requiredPlan)) {
            event.preventDefault();
            location.href = upgradeUrl(destinationPage);
        }
    });

    window.FarmersAccess = Object.freeze({
        getPlan,
        hasAccess,
        showAccessWall
    });
}());
