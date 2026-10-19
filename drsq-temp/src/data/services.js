export const services = [
  {
    slug: "strategic-communications",
    name: "Strategic Communications",
    headline: "We don't just communicate—we connect.",
    description:
      "Research, create and distribute trusted information that builds awareness, informs choices and supports better health outcomes.",
    services: [
      "Communications strategy and action plans",
      "Behavior-change, education and awareness campaigns",
      "Partnership and stakeholder engagement",
      "Community relations and coalition building",
      "Public and media relations",
      "Science and medical writing",
      "Multicultural communications and outreach",
      "Multilingual translation",
      "Crisis communications",
      "Event and exhibit planning and production",
      "Traditional, digital, broadcast, OTT and out-of-home media",
      "Media training",
      "Creative design, medical illustration, animation and video",
      "Content and materials development",
      "Plain-language writing",
    ],
    detail:
      "Trusted information only changes outcomes if the right audience receives it, understands it and can act on it. We research the audience first, then build the strategy, message and channel mix around what will actually move them — from a national awareness campaign to a single plain-language fact sheet.",
    approach: [
      "Research the audience and the information gap that matters most to them.",
      "Build a communications strategy, message architecture and channel plan.",
      "Produce content, creative and media across the channels that reach them.",
      "Track reach and engagement and refine the approach against what's working.",
    ],
  },
  {
    slug: "digital-technology",
    name: "Digital Technology",
    headline: "Driving action through smart digital solutions.",
    description:
      "Human-centered digital products, AI-enabled workflows, data, platforms and technology strategies that make complex health information accessible and actionable.",
    services: [
      "Cloud computing, security and infrastructure",
      "UX and human-centered design",
      "Artificial intelligence and virtual reality",
      "Machine learning",
      "Agile website and mobile development",
      "Drupal web development",
      "Plain-language web writing",
      "Social media",
      "Content planning and governance",
      "Content management systems",
      "Content syndication",
      "Application development",
      "Enterprise architecture",
      "Analytics and data strategy/visualization",
      "User testing",
      "Search and SEO",
      "Section 508 compliance",
      "Interactive dashboards",
      "Database development",
    ],
    detail:
      "Health information only works if people can find it, trust it and use it on the device in front of them. We design and build digital products around the people who depend on them, and bring AI-enabled workflows and data into the process where they genuinely speed delivery, not where they add complexity.",
    approach: [
      "Understand the audience, the content and the systems already in place.",
      "Design accessible, human-centered experiences validated with real users.",
      "Build and integrate the platform, application or workflow against that design.",
      "Monitor performance, accessibility and security after launch.",
    ],
  },
  {
    slug: "technical-assistance",
    name: "Technical Assistance",
    headline: "Providing real-time, human-centered support.",
    description:
      "Specialized support, guidance, information services and operational assistance that help people navigate health and social-service information.",
    services: [
      "Toll-free call centers",
      "Inquiry response and tracking",
      "VoIP",
      "Interactive voice response",
      "SMS/text messaging",
      "Online chat",
      "Inventory management, warehousing and distribution",
      "Exhibit program support",
      "Library management and taxonomy",
    ],
    detail:
      "Behind every hotline call, chat message or fulfillment request is someone trying to get an answer they can act on. We staff and operate the information services that connect people to that answer, and keep the underlying inventory, logistics and records running behind it.",
    approach: [
      "Define inquiry types, service standards and escalation paths.",
      "Staff and stand up the call center, chat, IVR or fulfillment channel.",
      "Respond, track and report against agreed service-level standards.",
      "Refine scripts, resources and staffing as inquiry patterns change.",
    ],
  },
  {
    slug: "training",
    name: "Training",
    headline: "Strengthening capacity for outreach success.",
    description:
      "Tailored training and capacity-building delivered by communications, marketing, engagement and subject-matter specialists.",
    services: [
      "Training",
      "Program development",
      "Onsite/offsite technical assistance consultation",
      "Workforce and staff development",
      "Webinar and resource development",
    ],
    detail:
      "Outreach succeeds when the people delivering it have the skills and materials to carry it forward without us. We design training around the organization's real audiences and channels, and hand over the resources needed to keep it going.",
    approach: [
      "Identify the outreach or program gaps training needs to close.",
      "Design curriculum, webinars and resources around real scenarios.",
      "Deliver training to staff, partners and grantees at the right level.",
      "Transfer materials and facilitation guides to internal owners.",
    ],
  },
  {
    slug: "research-and-evaluation",
    name: "Research and Evaluation",
    headline: "Generating insights that move people.",
    description:
      "Rigorous qualitative, quantitative, audience and evaluation research that informs strategy and measures outcomes.",
    services: [
      "Focus groups",
      "In-depth interviews",
      "Cognitive interviews",
      "Online bulletin boards",
      "Social listening",
      "Literature reviews",
      "Environmental scans",
      "Gap analyses",
      "OMB/IRB clearance packages",
      "Process and outcome evaluation",
      "Data analytics",
      "Qualitative instrument development and pilot testing",
      "User testing",
      "Survey design, programming, fielding and analysis",
    ],
    detail:
      "Strategy built on assumptions about the audience is a guess. We run the research that replaces the guess — from a quick environmental scan to a fielded survey with full analysis — and carry it through to evaluation so programs can show what changed.",
    approach: [
      "Scope the research question and select the right method or mix of methods.",
      "Field the study, including clearance packages where required.",
      "Analyze findings and translate them into strategy or program decisions.",
      "Evaluate outcomes against the goals the research was meant to inform.",
    ],
  },
];

export const getService = (slug) =>
  services.find((item) => item.slug === slug);
