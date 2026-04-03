import { useState } from "react";
import "./App.css";

function App() {
   const [user, setUser] = useState(null);
const [username, setUsername] = useState("");
const [text, setText] = useState("");
  const [tone, setTone] = useState("Friendly");
  const [blog, setBlog] = useState(null);
  const [social, setSocial] = useState(null);
  const [email, setEmail] = useState(null);

  const generateContent = (type) => {
    if (!text) return alert("Please enter a topic!");
    if (type === "blog")   setBlog(`Generated blog about "${text}" in ${tone} tone.\n\nThis is your AI-generated blog content. It covers the key aspects of the topic with clarity and depth.`);
    if (type === "social") setSocial(`Social posts about "${text}" (${tone}):\n\n• Post 1: Boost your growth!\n• Post 2: Key insights on ${text}\n• Post 3: Learn more today!`);
    if (type === "email")  setEmail(`Hi Alex,\n\nDrive More Sales with Smart Content!\n\nLearn the framework to pour in effective content for ${text}.`);
  };
  const handleLogin = () => {
  if (!username) return alert("Enter your name!");
  setUser({ name: username });
  setUsername("");
};

    
  return (
    <div className="app-wrapper">

      {/* ── NAVBAR ── */}
      <nav className="navbar">
        <div className="logo">
          <div className="logo-icon">🖊</div>
          ContentForge <span>AI</span>
        </div>

        <div className="nav-links">
          <a href="#" className="active"><span className="nav-icon">▤</span> Dashboard</a>
          {/* <a href="#"><span className="nav-icon">⊞</span> Templates</a>
          <a href="#"><span className="nav-icon">📊</span> Analytics</a> */}
        </div>
        <div className="nav-right">
  <div className="avatar">👤</div>

  {user ? (
    <>
      <span>Welcome, {user.name}!</span>
      <button onClick={() => setUser(null)}>Logout</button>
    </>
  ) : (
    <>
      <input
        type="text"
        placeholder="Enter name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="login-input"
      />
      <button onClick={handleLogin}>Sign In</button>
    </>
  )}
</div>
</nav>


      {/* ── HERO ── */}
      <div className="hero">
        <h1>Autonomous Content Generation Made Easy</h1>
        <p>Transform your ideas into multi-format content in seconds.</p>

        {/* ── AGENT TABS ── */}
        <div className="agent-tabs">
          <div className="agent-tab research">
            <div className="tab-icon">🔍</div>
            Research Agent
            <div className="tab-underline"></div>
          </div>
          <div className="agent-tab copy">
            <div className="tab-icon">✒️</div>
            Copywriter Agent
            <div className="tab-underline"></div>
          </div>
          <div className="agent-tab editor">
            <div className="tab-icon">✅</div>
            Editor Agent
            <div className="tab-underline"></div>
          </div>
        </div>

        {/* ── INPUT CARD ── */}
        <div className="input-card">
          <div className="input-label">
            Enter Your Content Idea:
            <div className="help-icon">?</div>
          </div>

          <div className="input-row">
            <input
              className="topic-input"
              type="text"
              placeholder="Enter your topic or brief..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <div className="tone-select">
              <span>Tone: {tone} <span className="tone-check">✔</span></span>
              <span>▼</span>
            </div>
          </div>

          <div className="action-buttons">
            <button className="action-btn btn-blog" onClick={() => generateContent("blog")}>
              <div className="btn-icon">📄</div>
              Generate Blog Post
            </button>
            <button className="action-btn btn-social" onClick={() => generateContent("social")}>
              <div className="btn-icon">💬</div>
              Create Social Posts
            </button>
            <button className="action-btn btn-email" onClick={() => generateContent("email")}>
              <div className="btn-icon">✉️</div>
              Draft Marketing Email
            </button>
          </div>

          <div className="card-footer">
            <div className="adv-settings">⚙ Advanced Settings ⚙</div>
            <div className="upload-link">or Upload a Document</div>
          </div>
        </div>
      </div>

      {/* ── LIVE PREVIEW ── */}
      <div className="preview-section">
        <div className="preview-title">Live Preview</div>

        <div className="preview-grid">

          {/* Blog Card */}
          <div className="preview-card">
            <div className="preview-card-header">
              <span className="ph-icon">≡</span> Generated Blog
            </div>
            {blog ? (
              <div className="blog-content">
                <div className="blog-title-line">Exciting Top Ideas</div>
                <div className="blog-thumb"></div>
                <p className="blog-generated-text">{blog}</p>
              </div>
            ) : (
              <div className="blog-content">
                <div className="blog-title-line">Exciting Top Ideas</div>
                <div className="blog-thumb"></div>
                <div className="skeleton w-full"></div>
                <div className="skeleton w-90"></div>
                <div className="skeleton w-full"></div>
                <div className="skeleton w-75"></div>
                <div className="skeleton w-90"></div>
                <div className="skeleton w-60"></div>
                <div className="skeleton w-full"></div>
                <div className="skeleton w-50"></div>
              </div>
            )}
            <div className="blog-actions">
              <button className="blog-btn regen" onClick={() => generateContent("blog")}>⟳ Regenerate ↓</button>
              <button className="blog-btn highlight">Highlight Key Points &gt;</button>
            </div>
          </div>

          {/* Social Card */}
          <div className="preview-card">
            <div className="preview-card-header">
              <span className="ph-icon">💬</span> Social Media Posts
            </div>
            <div className="phone-mockup">
              <div className="phone-status">
                <span>9:41</span>
                <span>●●● 📶 🔋</span>
              </div>
              <div className="social-post">
                <div className="post-header">
                  <div className="post-avatar"></div>
                  <div className="post-name">ContentForge</div>
                  <div className="post-time">now</div>
                  <span style={{color:"#aaa", marginLeft:"4px"}}>···</span>
                </div>
                <div className="post-text">
                  <strong>Boost Your Business Growth!</strong><br/>
                  {social
                    ? social
                    : "We're sharing key AI-driven content that fits the times. Discover actionable insights about leveraging AI content to drive your business forward."}
                </div>
                <div className="post-image"></div>
                <div className="post-actions">
                  <div className="post-act">♡ 142</div>
                  <div className="post-act">🔁 38</div>
                  <div className="post-act">💬 24</div>
                </div>
              </div>
              <div className="twitter-icon">🐦</div>
              <div className="phone-dots-row">
                <span className="dot dot-active"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
            </div>
          </div>

          {/* Email Card */}
          <div className="preview-card">
            <div className="preview-card-header">
              <span className="ph-icon">✉️</span> Marketing Email
            </div>
            <div className="email-content">
              <div className="email-top-row">
                <div className="email-greeting">Hi Alex,</div>
                <div className="email-skeleton-row">
                  <div className="skeleton" style={{width:"50px", height:"8px", margin:"0"}}></div>
                  <div className="skeleton" style={{width:"50px", height:"8px", margin:"0"}}></div>
                </div>
              </div>
              <div className="email-subject">Drive More Sales with Smart Content!</div>
              <div className="email-body">
                {email
                  ? email
                  : "Learn the deliverance framework to pour in effect content. Utilizing blog frameworks such as blog analytics and your website, have host policy systems so your community content strategy when the piece state is your differentiating achievement."}
              </div>
              {!email && (
                <div className="email-body">
                  Yourced hems from accommodations to have other mass parity expensed for any important that had imaged our sources feed erect nail team mooot.
                </div>
              )}
              <div className="email-cta">Learn More</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;