import React, { useEffect, useRef, useState } from 'react';

const Chatbot = () => {
  const [language, setLanguage] = useState("auto"); // controls speech + reply language
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [recording, setRecording] = useState(false);
  const messagesRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  useEffect(() => {
    messagesRef.current?.scrollTo({
      top: messagesRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  const addMessage = (text, role) => {
    setMessages((prev) => [...prev, { id: crypto.randomUUID(), text, role }]);
  };

  // -------------------------------------------------------
  // SEND MESSAGE TO BACKEND
  // -------------------------------------------------------
  const handleSend = async (forcedText) => {
    const text = (forcedText ?? input).trim();
    if (!text) return;

    setInput("");
    addMessage(text, "user");

    const tempId = crypto.randomUUID();
    setMessages((prev) => [
      ...prev,
      { id: tempId, text: "Thinking...", role: "bot" },
    ]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          language: language, // <-- IMPORTANT (Hindi, Punjabi, English etc)
        }),
      });

      const data = await res.json();
      const reply = data.reply || "No response.";
      const audioUrl = data.audio; // backend TTS URL

      setMessages((prev) =>
        prev.map((m) => (m.id === tempId ? { ...m, text: reply } : m))
      );

      if (audioUrl) {
        const audio = new Audio(audioUrl);
        audio.play().catch(() => {});
      }
    } catch (err) {
      console.error(err);
      setMessages((prev) =>
        prev.map((m) =>
          m.id === tempId ? { ...m, text: "Error contacting assistant." } : m
        )
      );
    }
  };

  // -------------------------------------------------------
  // VOICE RECORDING
  // -------------------------------------------------------
  const stopRecording = () => {
    const recorder = mediaRecorderRef.current;
    if (recorder) {
      recorder.stop();
      recorder.stream.getTracks().forEach((t) => t.stop());
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);

      mediaRecorderRef.current = recorder;
      audioChunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      recorder.onstop = async () => {
        setRecording(false);

        const blob = new Blob(audioChunksRef.current, {
          type: "audio/webm",
        });

        await sendAudio(blob);
      };

      recorder.start();
      setRecording(true);
    } catch (err) {
      alert("Microphone not accessible.");
      console.error(err);
    }
  };

  const toggleRecording = () => {
    recording ? stopRecording() : startRecording();
  };

  // -------------------------------------------------------
  // SEND AUDIO TO WHISPER
  // -------------------------------------------------------
  const sendAudio = async (blob) => {
    const formData = new FormData();
    formData.append("audio", blob, "voice.webm");
    formData.append("language", language);

    try {
      const res = await fetch("/api/transcribe", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      const text = data.text;

      if (text) {
        addMessage(`🎙️ ${text}`, "user");
        handleSend(text);
      } else {
        addMessage("Could not understand audio.", "bot");
      }
    } catch (err) {
      console.error(err);
      addMessage("Voice error.", "bot");
    }
  };

  return (
    <div className="chat-shell">
      <div className="chat-header">
        <strong>Smart Assistant</strong>

        {/* Language Menu Updated */}
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="auto">Auto Detect</option>
          <option value="en-US">English</option>
          <option value="hi-IN">Hindi (हिंदी)</option>
          <option value="pa-IN">Punjabi (ਪੰਜਾਬੀ)</option>
          <option value="gu-IN">Gujarati</option>
          <option value="ta-IN">Tamil</option>
          <option value="bn-IN">Bengali</option>
        </select>
      </div>

      <div className="chat-messages" ref={messagesRef}>
        {messages.length === 0 && (
          <div className="chat-empty">
            Speak or type. Supports Hindi, Punjabi, English & more.
          </div>
        )}

        {messages.map((m) => (
          <div key={m.id} className={`chat-msg ${m.role}`}>
            {m.text}
          </div>
        ))}
      </div>

      <div className="chat-input-row">
        <button
          type="button"
          className={`chat-mic ${recording ? "recording" : ""}`}
          onClick={toggleRecording}
        >
          {recording ? "Stop" : "Record"}
        </button>

        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask something..."
        />

        <button className="chat-send" onClick={() => handleSend()}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
