import React, { useState } from "react";

// ------------------------------------
// ROLES
// ------------------------------------
const ROLES = ["student", "teacher", "admin", "government"];

// ------------------------------------
// QUESTIONS FOR EACH ROLE
// ------------------------------------
const QUESTIONS = {
  student: [
    "My Classes",
    "Upload Class Files",
    "My Attendance",
    "My Assignments",
    "Upload Assignment",
    "My Grades",
    "Important Notices",
    "Comment on Notice",
    "View Report",
    "View Alerts",
    "Settings",
  ],

  teacher: [
    "My Classes",
    "Add Class from Files",
    "Mark Attendance",
    "Add Assignment from Files",
    "Post Assignment",
    "Comment on Assignment",
    "Post Notice",
    "Comment on Notice",
    "Add Reports",
    "Show Reports",
    "Show Alerts",
    "Settings",
  ],

  admin: [
    "Progress Report Dashboard",
    "Add Teacher",
    "Edit Teacher Records",
    "Add Student",
    "Edit Student Records",
    "Manage Grades",
    "School Reports",
    "Analytics Reports",
    "Alerts",
    "Mid Day Meal Usage",
    "Settings",
  ],

  government: [
    "All Schools Report",
    "District Attendance Report",
    "Export Reports",
    "High Priority Alerts",
    "Mid Day Meal Delivery",
    "Settings",
  ],
};

// ------------------------------------------------
// COMPONENT
// ------------------------------------------------
const BubbleChat = () => {
  const [role, setRole] = useState("student");
  const [messages, setMessages] = useState([]);
  const [loadingQuestion, setLoadingQuestion] = useState("");
  const [language, setLanguage] = useState("auto"); // 🔥 Added Language State

  // -----------------------------------------------
  // SEND SELECTED QUESTION TO BACKEND
  // -----------------------------------------------
  const sendQuestion = async (question) => {
    setLoadingQuestion(question);

    setMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        from: "user",
        text: `${role.toUpperCase()}: ${question}`,
      },
    ]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role, question, language }), // 🔥 Send language to backend
      });

      const data = await res.json();
      const reply = data.reply || "No reply received.";
      const ttsUrl = data.tts_url;

      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          from: "bot",
          text: reply,
        },
      ]);

      // 🔥 Auto-play TTS in Hindi / Punjabi / English
      if (ttsUrl) {
        const audio = new Audio(ttsUrl);
        audio.play().catch(() => {});
      }
    } catch (err) {
      console.error("chat error", err);

      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          from: "bot",
          text: "Error connecting to assistant. Please try again.",
        },
      ]);
    } finally {
      setLoadingQuestion("");
    }
  };

  // --------------------------------------------------
  // SWITCH ROLE — CLEAR CHAT
  // --------------------------------------------------
  const handleRoleChange = (newRole) => {
    setRole(newRole);
    setMessages([]);
    setLoadingQuestion("");
  };

  const currentQuestions = QUESTIONS[role];

  return (
    <div className="bubble-root">
      {/* LEFT PANEL */}
      <div className="bubble-left">
        
        {/* Role Selector */}
        <div className="role-selector">
          {ROLES.map((r) => (
            <button
              key={r}
              type="button"
              className={r === role ? "role-btn active" : "role-btn"}
              onClick={() => handleRoleChange(r)}
            >
              {r.charAt(0).toUpperCase() + r.slice(1)}
            </button>
          ))}
        </div>

        {/* 🔥 Language Selector */}
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="language-dropdown"
          style={{
            padding: "6px 10px",
            borderRadius: "8px",
            border: "1px solid #cbd5e1",
            marginBottom: "12px",
            width: "100%",
          }}
        >
          <option value="auto">🌐 Auto Detect</option>
          <option value="en">🇬🇧 English</option>
          <option value="hi">🇮🇳 Hindi</option>
          <option value="pa">🇮🇳 Punjabi</option>
        </select>

        {/* Questions */}
        <div className="question-grid">
          {currentQuestions.map((q) => (
            <button
              key={q}
              type="button"
              className="question-bubble"
              disabled={loadingQuestion === q}
              onClick={() => sendQuestion(q)}
            >
              {loadingQuestion === q ? "..." : q}
            </button>
          ))}
        </div>
      </div>

      {/* RIGHT CHAT */}
      <div className="bubble-right">
        <div className="bubble-header">
          <h2>Ayesha – School Assistant</h2>
        </div>

        <div className="bubble-chat-window">
          {messages.length === 0 && (
            <div className="bubble-empty">
              Start by choosing a role and selecting a question bubble.
            </div>
          )}

          {messages.map((m) => (
            <div
              key={m.id}
              className={m.from === "user" ? "bubble-msg user" : "bubble-msg bot"}
            >
              {m.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BubbleChat;
