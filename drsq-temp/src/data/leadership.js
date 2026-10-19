// Leadership. Supplied and verified by DRSQ Oasis LLC.
//
// Unlike src/data/credentials.js, the content here is confirmed and publishable
// as written. Anything added later — a second leader, an award, a board seat —
// follows the same rule: it goes live only once DRSQ confirms it.

export const leaders = [
  {
    slug: "dhalia-k-sanni",
    name: "Dr. Dhalia K-Sanni",
    title: "President and Chief Executive Officer",
    strapline: "Executive Leader · Entrepreneur · Strategic Business Advisor",
    photo: "/ceo.jpg",
    photoAlt: "Dr. Dhalia K-Sanni, President and Chief Executive Officer of DRSQ Oasis LLC",

    // Short pull-quote used on the homepage.
    summary:
      "More than 20 years across healthcare operations, financial management, regulatory compliance, management consulting, information technology and business development — translating complex operational, financial and regulatory requirements into practical strategies that strengthen organizational performance.",

    bio: [
      "Dr. Dhalia K-Sanni is an accomplished executive, entrepreneur and strategic business leader with more than 20 years of experience spanning healthcare operations, financial management, regulatory compliance, management consulting, information technology and business development. She is the President and CEO of DRSQ Oasis LLC, a women-owned minority small business providing innovative consulting, management, technology, administrative, financial and facilities support solutions to government and private-sector organizations.",
      "Throughout her career, Dr. K-Sanni has built a reputation for translating complex operational, financial and regulatory requirements into practical strategies that strengthen organizational performance.",
      "In addition to leading DRSQ Oasis LLC, Dr. K-Sanni serves as President and Director of Operations for Eastside Bariatric and General Surgery, where she directs enterprise strategy and operating priorities across clinical, administrative, financial and growth functions. Her leadership there has focused on strengthening financial controls, standardizing workflows, improving performance oversight, supporting regulatory compliance and building the operational infrastructure necessary for sustainable growth.",
      "Her professional background also includes senior financial and accounting roles with Mercedes-Benz USA, MDRC and General Motors, where she developed extensive experience in financial reporting, budgeting, revenue recognition, audit readiness, compliance, multinational finance and performance analysis. Earlier in her career, she worked in the legal sector in the United Kingdom, gaining valuable experience supporting senior leadership and working within legal and regulatory frameworks.",
      "Through DRSQ Oasis LLC, Dr. K-Sanni brings together her multidisciplinary experience to help organizations improve operations, manage complex initiatives, strengthen financial and administrative processes and deliver high-quality services. Driven by excellence, disciplined execution and customer satisfaction, she is committed to helping public- and private-sector organizations achieve sustainable growth, operational efficiency and measurable results.",
    ],

    expertise: [
      "Enterprise strategy",
      "Program and project management",
      "Financial stewardship",
      "Business analytics",
      "Regulatory governance",
      "Organizational scaling",
      "Strategic partnerships",
      "Executive decision support",
    ],

    roles: [
      {
        title: "President and Chief Executive Officer",
        organization: "DRSQ Oasis LLC",
      },
      {
        title: "President and Director of Operations",
        organization: "Eastside Bariatric and General Surgery",
      },
    ],

    priorExperience: [
      "Mercedes-Benz USA — senior financial and accounting roles",
      "MDRC — senior financial and accounting roles",
      "General Motors — senior financial and accounting roles",
      "Legal sector, United Kingdom — support to senior leadership within legal and regulatory frameworks",
    ],

    education: [
      {
        credential: "Doctor of Business Administration",
        institution: "Georgia State University, J. Mack Robinson College of Business",
      },
      {
        credential: "Master of Science, Accounting and Business/Management",
        institution: "Wagner College",
      },
      {
        credential: "Bachelor of Science, Management with Accounting",
        institution: "University of London",
      },
      {
        credential: "Legal Executive Studies",
        institution: "Chartered Institute of Legal Executives, United Kingdom",
      },
    ],
  },
];

export const primaryLeader = leaders[0];

export const getLeader = (slug) => leaders.find((leader) => leader.slug === slug);
