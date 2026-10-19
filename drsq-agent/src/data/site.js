// All copy for the assistant app lives here. Company facts mirror
// drsq-temp/src/data/site.js — keep them in sync and only add verified values.

export const company = {
  legalName: "DRSQ Oasis LLC",
  tagline: "Strategy. Alignment. Results.",
  email: "info@drsqoasis.com",
  phone: "(470) 546 0052",
  website: "https://drsqoasis.com",
};

export const agent = {
  endpoint: "/api/chat.php",
  name: "DRSQ Oasis Assistant",
  badge: "AI Assistant",
  greeting: "How can we help you today?",
  intro:
    "Ask about our services, tell us about a project, or report an issue and we'll pass it to the team.",
  placeholder: "Message the DRSQ Oasis Assistant…",
  disclaimer:
    "AI responses can be wrong. Contact details you share are forwarded to the DRSQ Oasis team.",
  errorMessage: `Sorry, the assistant is unavailable right now. Please email ${company.email} or call ${company.phone}.`,
  suggestions: [
    {
      title: "Explore our services",
      prompt: "What services does DRSQ Oasis offer?",
    },
    {
      title: "Start a project",
      prompt: "I'd like to discuss a public health communications project.",
    },
    {
      title: "Research and evaluation",
      prompt: "How do you approach research and program evaluation?",
    },
    {
      title: "Report an issue",
      prompt: "I need help with an issue.",
    },
  ],
};
