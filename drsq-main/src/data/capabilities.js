export const capabilities = [
  {
    slug: "professional-administrative-support",
    name: "Professional & Administrative Support",
    headline: "Extend Organizational Capacity.",
    description:
      "Provide structured professional and administrative support that improves organizational capacity.",
    services: [
      "Administrative support",
      "Business operations support",
      "Documentation",
      "Research and analysis",
      "Process coordination",
    ],
    detail:
      "Capable teams are often held back by work that has no owner: documentation, coordination, research, follow-through. We provide structured support that absorbs that load so internal staff can stay on the work only they can do.",
    approach: [
      "Define the scope, service standards and reporting cadence.",
      "Stand up the documentation and coordination the work depends on.",
      "Deliver against agreed timelines with clear points of contact.",
      "Hand back clean records and repeatable processes.",
    ],
  },
  {
    slug: "healthcare-medical-services",
    name: "Healthcare & Medical Services",
    headline: "Support Care Delivery With Reliable Capacity.",
    description:
      "Provide healthcare and medical support services that help clinical and administrative teams operate reliably and stay in compliance.",
    services: [
      "Clinical support staffing",
      "Medical administrative support",
      "Case management support",
      "Health program coordination",
      "Compliance and quality support",
    ],
    detail:
      "Healthcare organizations run on capacity they don't always have in-house — clinical coverage, administrative throughput, program coordination. We provide qualified personnel and structured support so care delivery and compliance obligations are met without disruption.",
    approach: [
      "Understand the care setting, staffing model and compliance requirements.",
      "Source and place qualified clinical and administrative personnel.",
      "Support day-to-day coordination across care and administrative teams.",
      "Track quality, compliance and staffing performance against standards.",
    ],
  },
  {
    slug: "information-technology-solutions",
    name: "Information Technology Solutions",
    headline: "Modernize Systems Without Disrupting Operations.",
    description:
      "Deliver IT solutions that strengthen infrastructure, systems and support without slowing the organization down.",
    services: [
      "IT support and help desk",
      "Systems administration",
      "Network and infrastructure support",
      "Cybersecurity support",
      "Software and systems implementation",
    ],
    detail:
      "Technology should reduce friction, not add to it. We provide the support, administration and implementation capacity organizations need to keep systems secure, current and running, whether that means day-to-day help desk coverage or a defined implementation project.",
    approach: [
      "Assess the current systems, support model and risk exposure.",
      "Stand up support, security and administration coverage.",
      "Implement or upgrade systems against an agreed plan and timeline.",
      "Document configurations and transfer knowledge to internal owners.",
    ],
  },
  {
    slug: "professional-development-services",
    name: "Professional Development Services",
    headline: "Build Capability That Lasts.",
    description:
      "Strengthen workforce capabilities through practical training, professional development and knowledge transfer.",
    services: [
      "Leadership development",
      "Professional training",
      "Workforce development",
      "Team effectiveness",
      "Knowledge transfer",
    ],
    detail:
      "Capability that depends on outside help is not capability. We build training around the organization's real work so teams can carry the practices forward without us.",
    approach: [
      "Identify the capability gaps that limit delivery today.",
      "Design training around the organization's own scenarios and tools.",
      "Deliver sessions to teams and leaders at the right level.",
      "Transfer materials, guides and facilitation notes to internal owners.",
    ],
  },
  {
    slug: "facilities-operations-maintenance",
    name: "Facilities, Operations & Maintenance",
    headline: "Keep Facilities Running Safely and Efficiently.",
    description:
      "Provide facilities, operations and maintenance support that keeps physical environments safe, compliant and running.",
    services: [
      "Facilities management",
      "Preventive and corrective maintenance",
      "Operations support",
      "Safety and compliance support",
      "Vendor and contractor coordination",
    ],
    detail:
      "Facilities work fails quietly until it doesn't: deferred maintenance, missed inspections, unclear ownership of building systems. We provide the operational discipline that keeps facilities safe, compliant and functioning, and coordinate the vendors and contractors that support them.",
    approach: [
      "Assess facility condition, maintenance history and compliance status.",
      "Establish preventive maintenance schedules and service standards.",
      "Coordinate operations, vendors and contractors against those standards.",
      "Report facility condition and compliance status on a set cadence.",
    ],
  },
  {
    slug: "medical-surgical-device-supply",
    name: "Medical & Surgical Device Supply",
    headline: "Reliable Supply for Medical and Surgical Devices.",
    description:
      "Support the sourcing, supply and distribution of medical and surgical devices and equipment.",
    services: [
      "Medical and surgical device supply",
      "Equipment sourcing",
      "Inventory and logistics coordination",
      "Vendor management",
      "Quality and compliance documentation",
    ],
    detail:
      "Care delivery depends on the right devices being available, documented and compliant. We support sourcing, inventory and vendor coordination so medical and surgical supply lines stay reliable and audit-ready.",
    approach: [
      "Confirm device and equipment requirements against clinical need.",
      "Source qualified vendors and manage procurement and inventory.",
      "Coordinate logistics so supply is available where and when needed.",
      "Maintain quality and compliance documentation for every order.",
    ],
  },
];

export const getCapability = (slug) =>
  capabilities.find((item) => item.slug === slug);
