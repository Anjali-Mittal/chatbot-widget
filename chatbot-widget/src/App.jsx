import ChatWidget from "./ChatWidget";

function App() {
  return (
    <div className="page">
      <header className="hero">
        <h1>AmplifyEase</h1>
        <p>
          Helping businesses connect with customers faster through
          simple, smart conversations.
        </p>
        <button className="cta">Get Started</button>
      </header>

      <section className="features">
        <div className="feature-card">
          <h3>Instant Support</h3>
          <p>Answer common queries instantly with predefined flows.</p>
        </div>
        <div className="feature-card">
          <h3>Lead Collection</h3>
          <p>Collect user details seamlessly through chat.</p>
        </div>
        <div className="feature-card">
          <h3>Easy Integration</h3>
          <p>Embed the chatbot widget into any website.</p>
        </div>
      </section>
      <ChatWidget />
    </div>
  );
}

export default App;
