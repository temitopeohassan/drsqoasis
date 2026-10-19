export const company = {
  legalName: "DRSQ Oasis LLC",
  tagline: "Strategy. Alignment. Results.",
  coreIdea: "Knowledge improves lives.",
  address: [
    "4045 Five Forks Trickum Rd,",
    "SW,",
    "Ste B9 #616,",
    "Lilburn, GA 30047",
  ],
  email: "info@drsqoasis.com",
  phone: "(470) 546 0052",
  positioning:
    "A health-focused communications, technology, research, training and technical-assistance partner that turns evidence-based information into clear, engaging, accessible experiences.",
  mission:
    "Make it easier for people to find, understand and use information that leads to better health.",
  vision:
    "Deliver impactful solutions that promote quality of life by making evidence-based information clear, engaging and useful for everyone.",
};

export const brandPrinciples = [
  "Evidence-based",
  "Human-centered",
  "Accessible",
  "Empathetic",
  "Technology-enabled",
  "Outcome-focused",
  "Community-minded",
];

export const navigation = [
  { label: "Home", path: "/" },
  {
    label: "What We Do",
    path: "/what-we-do",
    children: [
      { label: "Strategic Communications", path: "/what-we-do/strategic-communications" },
      { label: "Digital Technology", path: "/what-we-do/digital-technology" },
      { label: "Technical Assistance", path: "/what-we-do/technical-assistance" },
      { label: "Training", path: "/what-we-do/training" },
      { label: "Research and Evaluation", path: "/what-we-do/research-and-evaluation" },
    ],
  },
  {
    label: "Who We Are",
    path: "/who-we-are",
    children: [
      { label: "Leadership", path: "/who-we-are/leadership" },
    ],
  },
  { label: "Join Our Team", path: "/join-our-team" },
];

export const quickLinks = [
  { label: "Home", path: "/" },
  { label: "What We Do", path: "/what-we-do" },
  { label: "Who We Are", path: "/who-we-are" },
  { label: "Join Our Team", path: "/join-our-team" },
  { label: "Contact", path: "/contact" },
];

export const additionalLinks = [
  { label: "Leadership", path: "/who-we-are/leadership" },
  { label: "Strategic Communications", path: "/what-we-do/strategic-communications" },
  { label: "Digital Technology", path: "/what-we-do/digital-technology" },
];

// Primary audiences this site is written for, and what each one needs from us.
export const audiences = [
  {
    id: "federal_health_agencies",
    name: "Federal Health Agencies",
    needs: [
      "Public health communications",
      "Digital transformation",
      "Information dissemination",
      "Technical assistance",
      "Research and evaluation",
    ],
    cta: "Discuss a Requirement",
    ctaPath: "/contact",
  },
  {
    id: "government_program_leaders",
    name: "Government Program Leaders",
    needs: [
      "Mission delivery",
      "Stakeholder engagement",
      "Technology modernization",
      "Measurable outcomes",
      "Compliance",
    ],
    cta: "Explore What We Do",
    ctaPath: "/what-we-do",
  },
  {
    id: "healthcare_public_health",
    name: "Healthcare & Public Health Organizations",
    needs: [
      "Health education",
      "Behavior change",
      "Audience engagement",
      "Digital content",
      "Multilingual outreach",
    ],
    cta: "Explore What We Do",
    ctaPath: "/what-we-do",
  },
  {
    id: "nonprofits_foundations",
    name: "Nonprofits & Foundations",
    needs: [
      "Campaign strategy",
      "Community engagement",
      "Capacity building",
      "Research",
      "Digital experiences",
    ],
    cta: "Explore What We Do",
    ctaPath: "/what-we-do",
  },
  {
    id: "science_research",
    name: "Science & Research Organizations",
    needs: [
      "Science communications",
      "Information centers",
      "Knowledge translation",
      "Audience research",
      "Digital dissemination",
    ],
    cta: "Explore What We Do",
    ctaPath: "/what-we-do",
  },
  {
    id: "job_candidates",
    name: "Job Candidates",
    needs: [
      "Mission-driven work",
      "Career growth",
      "Flexible work",
      "Well-being",
      "Collaborative culture",
    ],
    cta: "Join Our Team",
    ctaPath: "/join-our-team",
  },
];

export const culture = {
  positioning:
    "Mission-driven, collaborative, innovative, flexible and focused on improving lives.",
  workModel: [
    "Flexible scheduling",
    "Virtual and in-person collaboration",
    "A national network of experts",
  ],
  wellbeing: [
    "Health challenges",
    "Virtual yoga and meditation",
    "Community charitable activities",
  ],
};

export const contentVoice = {
  tone: [
    "Authoritative",
    "Human",
    "Empathetic",
    "Evidence-based",
    "Clear",
    "Optimistic",
    "Mission-driven",
  ],
  writingRules: [
    "Prefer plain language over jargon.",
    "Connect technology and research to human outcomes.",
    "Lead with audience needs and measurable impact.",
    "Use credible, evidence-based language.",
    "Emphasize accessibility and inclusivity.",
    "Use concise, benefit-oriented headlines.",
    "Support claims with concrete metrics only once verified.",
  ],
};
