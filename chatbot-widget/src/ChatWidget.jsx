import { useEffect, useRef, useState } from "react";
import "./ChatWidget.css";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState("options");
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello. How can I help you today?" }
  ]);

  const [userInfo, setUserInfo] = useState({
    name: "",
    email: ""
  });

  const messagesEndRef = useRef(null);

  // 🔽 Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, step]);

  const addMessage = (sender, text) => {
    setMessages((prev) => [...prev, { sender, text }]);
  };

  const handleOption = (label, reply, nextStep = "options") => {
    addMessage("user", label);
    addMessage("bot", reply);
    setStep(nextStep);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addMessage("user", `${userInfo.name} (${userInfo.email})`);
    addMessage("bot", "Thank you. Our team will contact you shortly.");
    console.log("Collected user info:", userInfo);
    setStep("done");
  };

  return (
    <>
      {/* Floating button */}
      <button className="chat-button" onClick={() => setOpen(!open)}>
        💬
      </button>

      {open && (
        <div className="chat-box">
          {/* Header */}
          <div className="chat-header">
            <span>Chat</span>
            <span onClick={() => setOpen(false)} style={{ cursor: "pointer" }}>
              ✕
            </span>
          </div>

          {/* Messages */}
          <div className="chat-messages">
            {messages.map((m, i) => (
              <div key={i} className={`chat-message ${m.sender}`}>
                {m.text}
              </div>
            ))}

            {/* Auto-scroll anchor */}
            <div ref={messagesEndRef} />
          </div>

          {/* Footer */}
          <div className="chat-footer">
            {step === "options" && (
              <div className="chat-options">
                <button
                  onClick={() =>
                    handleOption(
                      "Pricing",
                      "Our plans start at ₹999 per month."
                    )
                  }
                >
                  Pricing
                </button>

                <button
                  onClick={() =>
                    handleOption(
                      "Talk to Support",
                      "Our support team is available 24/7."
                    )
                  }
                >
                  Talk to Support
                </button>

                <button
                  onClick={() =>
                    handleOption(
                      "Book a Demo",
                      "Please share your name and email.",
                      "form"
                    )
                  }
                >
                  Book a Demo
                </button>
              </div>
            )}

            {step === "form" && (
              <form className="chat-form" onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Your name"
                  required
                  value={userInfo.name}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, name: e.target.value })
                  }
                />

                <input
                  type="email"
                  placeholder="Your email"
                  required
                  value={userInfo.email}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, email: e.target.value })
                  }
                />

                <button type="submit">Submit</button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
