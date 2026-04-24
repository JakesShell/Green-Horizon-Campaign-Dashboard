const summary = [
    { title: "Campaign Name", text: "Green Horizon Campaign" },
    { title: "Focus", text: "Eco-Friendly Product Launch" },
    { title: "Primary Goal", text: "Awareness, Engagement, And Sales Growth" },
    { title: "Launch Window", text: "Spring Campaign Rollout" }
];

const goals = [
    { title: "Increase Brand Awareness", text: "Elevate visibility of the eco-friendly product line among target audiences." },
    { title: "Drive Sales", text: "Target a 20% sales increase within the first quarter after launch." },
    { title: "Engage Target Audience", text: "Build loyalty and interaction around sustainability-focused messaging." },
    { title: "Educate Consumers", text: "Explain the value and benefits of eco-friendly product choices." }
];

const audience = [
    { title: "Eco-Conscious Consumers", text: "Adults interested in sustainable living and lower-impact choices." },
    { title: "Families", text: "Households seeking healthier and more sustainable alternatives." },
    { title: "Health-Conscious Buyers", text: "Consumers already motivated by wellness and better daily habits." },
    { title: "Local Sustainability Communities", text: "People and groups engaged in environmental initiatives." }
];

const inScope = [
    "Market Research And Competitive Analysis",
    "Digital And Print Marketing Materials",
    "Social Media Strategy And Management",
    "Email Marketing Campaigns",
    "Influencer And Eco-Activist Collaboration",
    "Launch Event Planning"
];

const outScope = [
    "Development Of New Products",
    "Global Marketing Beyond Initial Launch Region",
    "In-Depth Public Relations Campaigns"
];

const phases = [
    { title: "Phase 1: Planning", text: "Conduct market research, develop strategy and messaging, and create the budget." },
    { title: "Phase 2: Development", text: "Design campaign materials, set up channels, and begin partnership coordination." },
    { title: "Phase 3: Launch", text: "Execute the campaign, host the launch event or webinar, and gather feedback." }
];

const metrics = [
    { title: "Sales Growth", text: "Measure percentage growth compared with previous quarters." },
    { title: "Customer Engagement", text: "Track shares, comments, and campaign interaction across social channels." },
    { title: "Website Traffic", text: "Review visits to the product landing page and site." },
    { title: "Email Open Rates", text: "Evaluate email campaign performance and audience response." }
];

const risks = [
    { title: "Low Consumer Engagement", text: "Mitigation: strengthen targeting and expand influencer reach." },
    { title: "Budget Overruns", text: "Mitigation: track expenses regularly and adjust tactics early." },
    { title: "Negative Feedback", text: "Mitigation: prepare a response plan and monitor sentiment closely." }
];

const benefits = [
    { title: "Increased Sales", text: "Supports revenue growth through stronger campaign performance." },
    { title: "Enhanced Brand Loyalty", text: "Builds a community around sustainable values and product trust." },
    { title: "Positive Environmental Impact", text: "Promotes lower-impact consumer behavior and sustainability messaging." }
];

function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
}

function buildCards(containerId, items) {
    const container = document.getElementById(containerId);
    container.innerHTML = items.map(item => `
        <article class="card">
            <h3>${item.title}</h3>
            <p>${item.text}</p>
        </article>
    `).join("");
}

function buildList(containerId, items) {
    const container = document.getElementById(containerId);
    container.innerHTML = items.map(item => `<li>${item}</li>`).join("");
}

document.addEventListener("DOMContentLoaded", () => {
    buildCards("summaryGrid", summary);
    buildCards("goalsGrid", goals);
    buildCards("audienceGrid", audience);
    buildCards("phasesGrid", phases);
    buildCards("metricsGrid", metrics);
    buildCards("risksGrid", risks);
    buildCards("benefitsGrid", benefits);
    buildList("inScopeList", inScope);
    buildList("outScopeList", outScope);
});
