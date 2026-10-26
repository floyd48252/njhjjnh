(function () {
    "use strict";

    const lessons = [
        {
            level: "form-1",
            levelLabel: "Form One",
            subject: "Agriculture",
            title: "Agriculture and the farm",
            summary: "Understand agriculture, its branches, and how farms support food, livelihoods, and the wider economy.",
            content: "Agriculture includes growing crops, keeping animals, and related activities such as handling, processing, and marketing farm products. Farms differ in size, purpose, climate, and resources. A farm study begins by observing its land, water, labour, buildings, tools, and products.",
            points: ["Describe crop and livestock production", "Identify common farm resources", "Explain why careful observation and records matter"]
        },
        {
            level: "form-1",
            levelLabel: "Form One",
            subject: "Biology",
            title: "Living things and plant structure",
            summary: "Review basic plant parts and how roots, stems, and leaves contribute to plant growth.",
            content: "Roots anchor a plant and absorb water and mineral nutrients. Stems support leaves and flowers and transport materials. Leaves capture light for photosynthesis. Healthy growth depends on suitable water, light, air, nutrients, and temperature.",
            points: ["Name the main parts of a flowering plant", "Relate plant structures to their functions", "List conditions plants need to grow"]
        },
        {
            level: "form-2",
            levelLabel: "Form Two",
            subject: "Agriculture",
            title: "Soil formation and conservation",
            summary: "Learn how soil develops and why soil structure, organic matter, and erosion control are important.",
            content: "Soil forms gradually from weathered rock mixed with decomposed organic matter. Its texture and structure affect drainage, aeration, and root growth. Ground cover, contour planting, terraces where suitable, and maintaining organic matter can help reduce soil loss.",
            points: ["Distinguish soil texture from soil structure", "Explain how vegetation helps protect soil", "Select erosion-control practices suited to a site"]
        },
        {
            level: "form-2",
            levelLabel: "Form Two",
            subject: "Biology",
            title: "Photosynthesis and crop growth",
            summary: "Connect the photosynthesis process to crop growth and the factors that can limit it.",
            content: "Green plants use light energy to combine carbon dioxide and water to make sugars, releasing oxygen. The sugars provide energy and building material. Light, water, carbon dioxide, leaf health, and temperature can influence the rate of photosynthesis.",
            points: ["State the basic inputs and products of photosynthesis", "Describe why leaves are important to crop production", "Give examples of factors that limit plant growth"]
        },
        {
            level: "form-3",
            levelLabel: "Form Three",
            subject: "Agriculture",
            title: "Crop husbandry and field planning",
            summary: "Plan crop establishment and routine care using the crop, field conditions, and local recommendations.",
            content: "Crop husbandry covers the practices used to establish and manage a crop. These may include selecting adapted seed, preparing a suitable seedbed, planting at appropriate spacing, managing weeds, monitoring pests, and harvesting at the right maturity. Decisions should reflect local conditions and crop guidance.",
            points: ["Outline a crop production calendar", "Explain the purpose of spacing and timely weeding", "Keep records of planting, inputs, and harvest"]
        },
        {
            level: "form-3",
            levelLabel: "Form Three",
            subject: "Chemistry",
            title: "Nutrients and soil pH",
            summary: "Explore the role of essential plant nutrients and how soil pH affects nutrient availability.",
            content: "Plants need several mineral nutrients in different amounts. Soil pH influences the chemical forms and availability of some nutrients and the activity of soil organisms. Soil testing can help guide amendments; avoid applying lime or fertilizer without considering test results and local advice.",
            points: ["Differentiate major and trace nutrients", "Explain how pH can affect nutrient availability", "Describe why soil testing informs input decisions"]
        },
        {
            level: "form-4",
            levelLabel: "Form Four",
            subject: "Agriculture",
            title: "Farm records and simple budgeting",
            summary: "Use production, sales, and expense records to understand farm performance.",
            content: "A farm budget estimates expected income and costs for a defined period or enterprise. Records should be dated, clear, and supported by receipts where possible. Gross margin is commonly estimated as enterprise revenue minus variable costs; it is not the same as total farm profit because fixed costs may remain.",
            points: ["Classify income and expenses", "Calculate gross margin from given figures", "Explain how records support planning"]
        },
        {
            level: "form-4",
            levelLabel: "Form Four",
            subject: "Geography",
            title: "Climate, water, and agriculture",
            summary: "Study how rainfall, temperature, landform, and water access influence farming choices.",
            content: "Climate and local geography shape the crops and livestock that may be suitable. Rainfall amount and timing, temperature, elevation, slope, soil, and water access all matter. Farmers can reduce some climate risks through diversification, soil cover, water conservation, and locally appropriate planting calendars.",
            points: ["Relate climate patterns to agricultural activities", "Identify farming risks linked to drought or excess rain", "Suggest practical adaptation measures"]
        },
        {
            level: "tvet",
            levelLabel: "TVET",
            subject: "Crop production",
            title: "Practical crop production planning",
            summary: "A practical framework for planning a crop enterprise from site assessment through post-harvest handling.",
            content: "Start with a site and market assessment. Select a crop and variety suited to local conditions, estimate input and labour needs, prepare a calendar, and plan water, pest monitoring, harvest, storage, and sales. Follow product labels and institutional safety procedures when handling farm inputs.",
            points: ["Prepare an enterprise activity calendar", "Estimate basic input and labour requirements", "Record field observations and post-harvest losses"]
        },
        {
            level: "tvet",
            levelLabel: "TVET",
            subject: "Livestock production",
            title: "Livestock welfare and husbandry",
            summary: "Review husbandry planning for housing, nutrition, hygiene, welfare, and routine records.",
            content: "Sound livestock management provides suitable housing, clean water, a balanced diet, good hygiene, and access to appropriate veterinary care. Keep records of stock, feeding, health events, breeding, and sales. Seek qualified veterinary advice for diagnosis or treatment.",
            points: ["Develop a basic husbandry checklist", "Explain the value of biosecurity and clean water", "Maintain health and production records"]
        },
        {
            level: "university",
            levelLabel: "University",
            subject: "Agronomy",
            title: "Agroecosystems and sustainable intensification",
            summary: "An introductory systems view of productivity, resource use, biodiversity, and resilience in agriculture.",
            content: "An agroecosystem includes crops or livestock, soils, water, organisms, people, and institutions interacting across scales. Sustainable intensification seeks to improve production while managing environmental impacts and maintaining resilience. Evaluation requires context-specific indicators rather than a single measure of success.",
            points: ["Map biological and human components of an agroecosystem", "Compare productivity and environmental indicators", "Discuss trade-offs and context in sustainability assessments"]
        },
        {
            level: "university",
            levelLabel: "University",
            subject: "Agribusiness",
            title: "Farm enterprise analysis",
            summary: "Introduce enterprise budgets, gross margins, cash flow, and sensitivity analysis for farm decisions.",
            content: "Enterprise analysis organizes expected revenues and costs for a specific farm activity. Gross margin subtracts variable costs from enterprise revenue. Whole-farm planning also considers fixed costs, cash-flow timing, risk, labour, and the opportunity cost of scarce resources. Sensitivity analysis tests how results change when assumptions shift.",
            points: ["Separate variable and fixed costs", "Build a simple enterprise budget", "Test how price or yield changes affect the result"]
        }
    ];

    const grid = document.getElementById("libraryGrid");
    const search = document.getElementById("librarySearch");
    const level = document.getElementById("levelFilter");
    const count = document.getElementById("libraryCount");

    function render() {
        const query = search.value.trim().toLocaleLowerCase();
        const selectedLevel = level.value;
        const matches = lessons.filter((lesson) => {
            const searchable = [
                lesson.levelLabel,
                lesson.subject,
                lesson.title,
                lesson.summary,
                lesson.content,
                ...lesson.points
            ].join(" ").toLocaleLowerCase();
            return (selectedLevel === "all" || lesson.level === selectedLevel) &&
                (!query || searchable.includes(query));
        });

        grid.replaceChildren();
        count.textContent = `${matches.length} ${matches.length === 1 ? "study guide" : "study guides"}`;

        if (matches.length === 0) {
            const empty = document.createElement("p");
            empty.className = "library-empty";
            empty.textContent = "No study guides match those filters. Try a different level or search term.";
            grid.append(empty);
            return;
        }

        matches.forEach((lesson) => {
            const card = document.createElement("article");
            card.className = "study-card";

            const meta = document.createElement("div");
            meta.className = "study-meta";
            const levelTag = document.createElement("span");
            levelTag.textContent = lesson.levelLabel;
            const subjectTag = document.createElement("span");
            subjectTag.textContent = lesson.subject;
            meta.append(levelTag, subjectTag);

            const title = document.createElement("h3");
            title.textContent = lesson.title;
            const summary = document.createElement("p");
            summary.textContent = lesson.summary;

            const details = document.createElement("details");
            const toggle = document.createElement("summary");
            toggle.textContent = "Open study notes";
            const content = document.createElement("p");
            content.textContent = lesson.content;
            const points = document.createElement("ul");
            lesson.points.forEach((point) => {
                const item = document.createElement("li");
                item.textContent = point;
                points.append(item);
            });
            details.append(toggle, content, points);
            card.append(meta, title, summary, details);
            grid.append(card);
        });
    }

    search.addEventListener("input", render);
    level.addEventListener("change", render);
    render();
}());
