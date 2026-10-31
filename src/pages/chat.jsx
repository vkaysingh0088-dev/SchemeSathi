
import { useState, useEffect, useRef } from "react";

function Chat() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState("English");
  const [speakingIndex, setSpeakingIndex] = useState(null);
  const [selectedCitation, setSelectedCitation] = useState(null);
  const [listening, setListening] = useState(false);

  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);
  const voiceBaseMessageRef = useRef("");

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hello! I'm SchemeSathi AI. Ask me anything about your government scheme document.",
      citation: null
    }
  ]);

  const languageCodes = {
    English: "en-IN",
    Hindi: "hi-IN",
    Bengali: "bn-IN",
    Tamil: "ta-IN",
    Telugu: "te-IN"
  };

  // Automatically scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth"
    });
  }, [messages, loading]);

  // Stop speech and recognition when component is removed
  useEffect(() => {
    return () => {
      window.speechSynthesis?.cancel();
      recognitionRef.current?.abort();
    };
  }, []);

  // Text-to-Speech
  function handleSpeak(text, index) {
    if (!("speechSynthesis" in window)) {
      alert("Sorry, your browser does not support Text-to-Speech.");
      return;
    }

    window.speechSynthesis.cancel();

    if (speakingIndex === index) {
      setSpeakingIndex(null);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);

    utterance.lang = languageCodes[language];
    utterance.rate = 0.9;
    utterance.pitch = 1;

    utterance.onend = () => setSpeakingIndex(null);
    utterance.onerror = () => setSpeakingIndex(null);

    setSpeakingIndex(index);
    window.speechSynthesis.speak(utterance);
  }

  // Speech-to-Text
  function handleVoiceInput() {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert(
        "Speech recognition is not supported. Please try Google Chrome."
      );
      return;
    }

    // Stop recording if already listening
    if (listening) {
      recognitionRef.current?.stop();
      return;
    }

    const recognition = new SpeechRecognition();

    recognitionRef.current = recognition;

    // Preserve existing typed text
    voiceBaseMessageRef.current = message.trim();

    recognition.lang = languageCodes[language];
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setListening(true);
    };

    recognition.onresult = (event) => {
      // Collect the recognition results
      const transcript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join(" ");

      // Replace previous voice result instead of appending duplicates
      setMessage(
        [voiceBaseMessageRef.current, transcript]
          .filter(Boolean)
          .join(" ")
      );
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);
      recognitionRef.current = null;
    };

    try {
      recognition.start();
    } catch (error) {
      console.error("Could not start speech recognition:", error);
      setListening(false);
    }
  }

  // Send message
  function handleSend() {
    if (!message.trim() || loading) return;

    const userMessage = message.trim();

    recognitionRef.current?.abort();
    setListening(false);

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text: userMessage,
        citation: null
      }
    ]);

    setMessage("");
    setLoading(true);

    // Temporary mock AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: `This is a sample AI response in ${language}. Once the backend is ready, I'll answer using your uploaded government scheme document and provide genuine citations.`,
          citation: {
            document: "Sample Government Scheme Guidelines",
            page: 5,
            clause: "Section 2.1",
            excerpt:
              "This is an example of a source passage from a government scheme document.",
            verified: false
          }
        }
      ]);

      setLoading(false);
    }, 1500);
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">

      {/* Navbar */}
      <nav className="bg-white shadow-sm px-5 md:px-10 py-5">
        <h1 className="text-2xl font-bold text-blue-700">
          Scheme<span className="text-slate-800">Sathi</span>
        </h1>
      </nav>

      {/* Chat Header */}
      <div className="text-center py-6 px-4">
        <h2 className="text-2xl font-bold text-slate-800">
          Ask SchemeSathi AI
        </h2>

        <p className="text-slate-500 mt-2">
          Understand government schemes in simple language.
        </p>

        {/* Language Selector */}
        <div className="mt-5 flex justify-center items-center gap-3 flex-wrap">
          <label className="font-medium text-slate-700">
            Select Language:
          </label>

          <select
            value={language}
            onChange={(e) => {
              window.speechSynthesis?.cancel();
              recognitionRef.current?.abort();

              setSpeakingIndex(null);
              setListening(false);
              setLanguage(e.target.value);
            }}
            className="border border-slate-300 rounded-lg px-4 py-2 bg-white outline-none focus:border-blue-500"
          >
            <option value="English">English</option>
            <option value="Hindi">हिन्दी</option>
            <option value="Bengali">বাংলা</option>
            <option value="Tamil">தமிழ்</option>
            <option value="Telugu">తెలుగు</option>
          </select>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 w-full max-w-4xl mx-auto px-4 pb-5">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 md:p-7 space-y-6 min-h-[350px]">

          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.role === "user"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div className="max-w-[90%] md:max-w-[80%]">

                {/* Message Bubble */}
                <div
                  className={`p-4 rounded-2xl ${
                    msg.role === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 text-slate-800"
                  }`}
                >
                  {msg.text}
                </div>

                {/* Text-to-Speech */}
                {msg.role === "assistant" && (
                  <button
                    onClick={() => handleSpeak(msg.text, index)}
                    className="mt-3 text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    {speakingIndex === index
                      ? "⏹ Stop speaking"
                      : "🔊 Listen to answer"}
                  </button>
                )}

                {/* Citation Reference */}
                {msg.citation && (
                  <div className="mt-3">
                    <button
                      onClick={() =>
                        setSelectedCitation(msg.citation)
                      }
                      className="text-sm font-semibold text-blue-700 hover:text-blue-900 underline"
                    >
                      📄 View Source (Page {msg.citation.page})
                    </button>

                    <p className="mt-1 text-xs text-slate-500">
                      Demo citation, not verified against an actual document.
                    </p>
                  </div>
                )}

              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-slate-100 rounded-xl px-5 py-4 text-slate-600">
                <span className="animate-pulse">
                  SchemeSathi is thinking...
                </span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message Input */}
      <div className="w-full max-w-4xl mx-auto px-4 pb-8">
        <div className="flex gap-3 bg-white border border-slate-200 rounded-xl p-3 shadow-sm">

          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSend();
            }}
            placeholder="Ask a question about the scheme..."
            className="flex-1 min-w-0 outline-none px-2 text-slate-700"
          />

          {/* Microphone Button */}
          <button
            type="button"
            onClick={handleVoiceInput}
            disabled={loading}
            className={`rounded-lg px-4 py-3 text-xl transition ${
              listening
                ? "bg-red-100 text-red-600"
                : "bg-slate-100 hover:bg-slate-200"
            } disabled:opacity-50`}
            title={
              listening
                ? "Stop recording"
                : "Speak your question"
            }
            aria-label={
              listening
                ? "Stop recording"
                : "Start voice input"
            }
          >
            {listening ? "🔴" : "🎤"}
          </button>

          {/* Send Button */}
          <button
            onClick={handleSend}
            disabled={!message.trim() || loading}
            className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
          >
            Send →
          </button>

        </div>

        {listening && (
          <p className="mt-2 text-center text-sm text-red-600">
            Listening... Speak your question.
          </p>
        )}
      </div>

      {/* Citation Popup */}
      {selectedCitation && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
          onClick={() => setSelectedCitation(null)}
        >
          <div
            className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-blue-900">
                Source Details
              </h3>

              <button
                onClick={() => setSelectedCitation(null)}
                className="text-2xl text-slate-500 hover:text-red-600"
                aria-label="Close source details"
              >
                ×
              </button>
            </div>

            <div className="mt-5 space-y-4">
              <div>
                <p className="text-sm text-slate-500">
                  Document
                </p>

                <p className="font-semibold text-slate-800">
                  {selectedCitation.document}
                </p>
              </div>

              <div className="flex gap-8">
                <div>
                  <p className="text-sm text-slate-500">
                    Page
                  </p>

                  <p className="font-semibold">
                    {selectedCitation.page}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-500">
                    Section
                  </p>

                  <p className="font-semibold">
                    {selectedCitation.clause}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Referenced passage
                </p>

                <div className="mt-2 rounded-lg bg-blue-50 border-l-4 border-blue-600 p-4 text-slate-700">
                  {selectedCitation.excerpt}
                </div>
              </div>

              <p className="text-xs text-amber-700">
                Demo source: this passage is illustrative, not extracted
                from a verified government document.
              </p>
            </div>

            <button
              onClick={() => setSelectedCitation(null)}
              className="mt-6 w-full rounded-lg bg-blue-700 py-3 font-semibold text-white hover:bg-blue-800"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

export default Chat;
