export const company = {
  legalName: "DRKS Alignment LLC",
  tagline: "Strategy. Alignment. Results.",
  founded: "[YEAR]",
  headquarters: "[CITY, STATE]",
  serviceArea: "[SERVICE AREA]",
  address: "[ADDRESS]",
  email: "info@drks-allignment-llc.com",
  phone: "[PHONE NUMBER]",
  positioning:
    "A strategic consulting and alignment partner helping organizations turn strategy into coordinated execution and measurable results.",
};

export const socialLinks = [
  { label: "Facebook", url: "[FACEBOOK URL]", icon: "facebook" },
  { label: "LinkedIn", url: "[LINKEDIN URL]", icon: "linkedin" },
];

export const governmentData = {
  uei: "[VERIFY]",
  cage: "[VERIFY]",
  primaryNaics: "[VERIFY]",
  additionalNaics: "[VERIFY]",
  certifications: "[VERIFY]",
  contractVehicles: "[VERIFY]",
};

export const navigation = [
  { label: "Home", path: "/" },
  { label: "For Partners", path: "/partners" },
  {
    label: "About",
    path: "/about",
    children: [
      { label: "Who We Are", path: "/about/who-we-are" },
      { label: "Mission Statement", path: "/about/mission-statement" },
      { label: "About CEO", path: "/about/ceo" },
    ],
  },
  { label: "For Government Buyers", path: "/government" },
  {
    label: "Capabilities",
    path: "/capabilities",
    children: [
      {
        label: "Professional & Administrative Support",
        path: "/capabilities/professional-administrative-support",
      },
      {
        label: "Healthcare & Medical Services",
        path: "/capabilities/healthcare-medical-services",
      },
      {
        label: "Information Technology Solutions",
        path: "/capabilities/information-technology-solutions",
      },
      {
        label: "Professional Development Services",
        path: "/capabilities/professional-development-services",
      },
      {
        label: "Facilities, Operations & Maintenance",
        path: "/capabilities/facilities-operations-maintenance",
      },
      {
        label: "Medical & Surgical Device Supply",
        path: "/capabilities/medical-surgical-device-supply",
      },
    ],
  },
  { label: "Insights", path: "/insights" },
  { label: "Careers", path: "/careers" },
];

export const quickLinks = [
  { label: "Home", path: "/" },
  { label: "Capabilities", path: "/capabilities" },
  { label: "For Government Buyers", path: "/government" },
  { label: "For Partners", path: "/partners" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

export const additionalLinks = [
  { label: "Who We Are", path: "/about/who-we-are" },
  { label: "Mission Statement", path: "/about/mission-statement" },
  { label: "About CEO", path: "/about/ceo" },
  {
    label: "Professional & Administrative Support",
    path: "/capabilities/professional-administrative-support",
  },
  {
    label: "Healthcare & Medical Services",
    path: "/capabilities/healthcare-medical-services",
  },
  { label: "Insights", path: "/insights" },
  { label: "Careers", path: "/careers" },
];

export const framework = [
  {
    title: "Strategy",
    description:
      "Define what matters, where the organization is going and what success looks like.",
  },
  {
    title: "Alignment",
    description:
      "Connect people, processes, resources and priorities around a common direction.",
  },
  {
    title: "Results",
    description:
      "Translate plans into disciplined execution, measurable progress and meaningful outcomes.",
  },
];

export const whyDrks = [
  {
    title: "Strategic Perspective",
    description: "Connect strategy to practical execution.",
  },
  {
    title: "Alignment First",
    description:
      "Close disconnects between leadership intent and day-to-day execution.",
  },
  {
    title: "Execution Mindset",
    description: "Move beyond recommendations toward practical implementation.",
  },
  {
    title: "Results Orientation",
    description: "Focus on outcomes, accountability and measurable progress.",
  },
];

export const audiences = [
  {
    id: "government_buyers",
    name: "Government Buyers",
    needs: [
      "Reliable delivery",
      "Clear capabilities",
      "Procurement readiness",
      "Qualified personnel",
      "Documented outcomes",
    ],
    cta: "Discuss a Requirement",
    ctaPath: "/government",
  },
  {
    id: "prime_contractors",
    name: "Prime Contractors & Strategic Partners",
    needs: [
      "Complementary capabilities",
      "Reliable delivery",
      "Responsive leadership",
      "Contract support",
    ],
    cta: "Partner With DRKS",
    ctaPath: "/partners",
  },
  {
    id: "corporate_leaders",
    name: "Corporate & Institutional Leaders",
    needs: [
      "Strategic clarity",
      "Organizational alignment",
      "Operational improvement",
      "Execution support",
      "Measurable outcomes",
    ],
    cta: "Start a Conversation",
    ctaPath: "/contact",
  },
  {
    id: "healthcare_institutions",
    name: "Healthcare & Mission-Driven Institutions",
    needs: [
      "Operational improvement",
      "Strategic planning",
      "Process alignment",
      "Program support",
    ],
    cta: "Explore Our Services",
    ctaPath: "/capabilities",
  },
];
