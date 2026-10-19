// Copy for the site-wide chat assistant (src/components/ChatWidget.jsx).
// The assistant's behaviour and knowledge live in public/api/chat.php.

export const chat = {
  endpoint: "/api/chat.php",
  title: "DRSQ Oasis Assistant",
  subtitle: "Ask about our services, start a project, or report an issue.",
  greeting:
    "Hello, I'm the DRSQ Oasis assistant. I can answer questions about what we do, pass your project details to our team, or forward an issue you need help with. How can I help?",
  placeholder: "Type your message…",
  suggestions: [
    "What services do you offer?",
    "I'd like to discuss a project",
    "I need help with an issue",
  ],
  privacyNote:
    "Messages are processed by an AI assistant. Contact details you share are forwarded to the DRSQ Oasis team.",
  errorMessage:
    "Sorry, the assistant is unavailable right now. Please email info@drsqoasis.com or call (470) 546 0052.",
};
