// import { useState, useEffect } from "react";
// import { generateContent } from "./ai";
// import { useNavigate } from "react-router-dom";
// import UserProfile from "./UserProfile";

// import "./App.css";
// import * as pdfjsLib from "pdfjs-dist";

// // Supabase setup
// import { supabase } from "./supabaseClient";

// // required for pdf.js worker
// import { GlobalWorkerOptions } from "pdfjs-dist/build/pdf";
// import pdfWorker from "pdfjs-dist/build/pdf.worker?url";

// GlobalWorkerOptions.workerSrc = pdfWorker;

// function App() {
//   const [user, setUser] = useState(null);
//   const [text, setText] = useState("");
//   const [tone, setTone] = useState("Friendly");
//   const [blog, setBlog] = useState(null);
//   const [social, setSocial] = useState(null);
//   const [email, setEmail] = useState(null);
//   const [activeTab, setActiveTab] = useState(null); // controls what card shows
//   const [toneOpen, setToneOpen] = useState(false); // controls dropdown
//   const tones = ["Professional", "Friendly", "Gen Z", "Casual", "Formal"]; // options

//   const [uploadedFile, setUploadedFile] = useState(null);
//   const [fileContent, setFileContent] = useState("");
//   const navigate = useNavigate();
//   const [generatedContent, setGeneratedContent] = useState("");
//   const [keyPoints, setKeyPoints] = useState("");

//   // Listen for auth changes and fetch profile
//   useEffect(() => {
//     const { data: authListener } = supabase.auth.onAuthStateChange(
//       async (event, session) => {
//         if (session?.user) {
//           setUser(session.user);
//         } else {
//           setUser(null);
//         }
//       }
//     );

//     return () => {
//       authListener.subscription.unsubscribe();
//     };
//   }, []);

//   // Google OAuth login
//   const handleLogin = async () => {
//     const { error } = await supabase.auth.signInWithOAuth({
//       provider: "google",
//     });

//     if (error) console.error("Login error:", error.message);
//   };

//   const handleLogout = async () => {
//     await supabase.auth.signOut();
//     setUser(null);
//   };

//   // Highlight Points
//   const handleHighlight = async () => {
//   console.log("Clicked");

//   if (!blog) return;

//   // Ask AI for proper points with headings
//   const prompt = `
// Summarize the following blog into key points.
// Make sure each point is a complete sentence.
// Use headings for sections if possible, and list points under each heading.
// ${blog}
// `;

//   const result = await generateContent(prompt, "concise", "blog"); // use 'blog' so output is text
//   setKeyPoints(result);
// };



//   // Generate content handler
//   const handleGenerate = async (type) => {
//     if (!text && !fileContent) {
//       return alert("Please enter a topic or upload a file!");
//     }

//     setActiveTab(type);

//     let prompt = text;

//     // Combine user query + PDF content if present
//     if (fileContent) {
//       prompt = `
// You are given a document.

// USER QUESTION:
// ${text}

// DOCUMENT CONTENT:
// ${fileContent}

// Answer based ONLY on the document.
// `;
//     }

//     const result = await generateContent(prompt, tone, type);

//     if (type === "blog") {
//       setBlog(result);
//       setKeyPoints(""); // reset key points whenever blog is regenerated
//     }
//     if (type === "social") setSocial(result);
//     if (type === "email") setEmail(result);
//   };

//   return (
//     <div className="app-wrapper">
//       {/* NAVBAR */}
//       <nav className="navbar">
//         <div className="logo">
//           <div className="logo-icon">🖊</div>
//           ContentIQ<span>AI</span>
//         </div>
//         <div className="nav-links">
//           <a href="#" className="active">
//             <span className="nav-icon">▤</span> Dashboard
//           </a>
//         </div>
//         <div className="nav-right">
//           {!user && (
//             <button onClick={() => navigate("/signin")} className="sign-in-btn">
//               Sign In
//             </button>
//           )}

//           {user && (
//   <>
//     <UserProfile userId={user.id} />

//     <button onClick={handleLogout} className="sign-in-btn">
//       Logout
//     </button>
//   </>
// )}


//         </div>
//       </nav>

//       {/* HERO */}
//       <div className="hero">
//         <h1>Autonomous Content Generation</h1>
//         <p>Transform your ideas into multi-format content in seconds.</p>

//         {/* INPUT CARD */}
//         <div className="input-card">
//           <div className="input-label">
//             Enter Your Content Idea: <div className="help-icon">?</div>
//           </div>
//           <div className="input-row">
//             <input
//               className="topic-input"
//               type="text"
//               placeholder="Enter your topic or brief..."
//               value={text}
//               onChange={(e) => setText(e.target.value)}
//             />
//             <div className="tone-select-container" style={{ position: "relative" }}>
//               <div
//                 className="tone-select"
//                 onClick={() => setToneOpen(!toneOpen)}
//                 style={{ cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}
//               >
//                 <span>Tone: {tone} <span className="tone-check">✔</span></span>
//                 <span>▼</span>
//               </div>

//               {toneOpen && (
//                 <div className="tone-options" style={{
//                   position: "absolute", top: "100%", left: 0, backgroundColor: "#fff",
//                   border: "1px solid #ccc", borderRadius: "8px", marginTop: "4px", width: "100%", zIndex: 10
//                 }}>
//                   {tones.map((t) => (
//                     <div key={t} onClick={() => { setTone(t); setToneOpen(false); }}
//                       style={{ padding: "8px 12px", cursor: "pointer", backgroundColor: t === tone ? "#e6f7ff" : "#fff" }}>
//                       {t} {t === tone && "✔"}
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>

//           <div className="action-buttons">
//             <button className="action-btn btn-blog" onClick={() => handleGenerate("blog")}>
//               <div className="btn-icon">📄</div> Generate Blog Post
//             </button>
//             <button className="action-btn btn-social" onClick={() => handleGenerate("social")}>
//               <div className="btn-icon">💬</div> Create Social Posts
//             </button>
//             <button className="action-btn btn-email" onClick={() => handleGenerate("email")}>
//               <div className="btn-icon">✉️</div> Draft Marketing Email
//             </button>
//           </div>

//           <div className="card-footer">
//             <label className="upload-link" style={{ cursor: "pointer", color: "#4a90e2" }}>
//               or Upload a Document
//               <input
//                 type="file"
//                 accept=".pdf,.doc,.docx,.txt"
//                 style={{ display: "none" }}
//                 onChange={async (e) => {
//                   const file = e.target.files[0];
//                   if (!file) return;

//                   setUploadedFile(file);

//                   if (file.type === "application/pdf") {
//                     const reader = new FileReader();
//                     reader.onload = async (event) => {
//                       const typedArray = new Uint8Array(event.target.result);
//                       const pdf = await pdfjsLib.getDocument(typedArray).promise;

//                       let fullText = "";
//                       for (let i = 1; i <= pdf.numPages; i++) {
//                         const page = await pdf.getPage(i);
//                         const content = await page.getTextContent();
//                         const pageText = content.items.map((item) => item.str).join(" ");
//                         fullText += pageText + "\n";
//                       }

//                       setFileContent(fullText);
//                     };
//                     reader.readAsArrayBuffer(file);
//                   } else {
//                     const reader = new FileReader();
//                     reader.onload = (event) => {
//                       const content = event.target.result;
//                       setFileContent(content);
//                       setText(content);
//                     };
//                     reader.readAsText(file);
//                   }
//                 }}
//               />
//             </label>
//             {uploadedFile && (
//               <div style={{ marginTop: "8px", color: "#aaa" }}>Uploaded: {uploadedFile.name}</div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* LIVE PREVIEW */}
//       <div className="preview-section">
//         <div className="preview-title">Live Preview</div>
//         <div className={`preview-grid ${activeTab ? "single-view" : ""}`}>
//           {/* Blog Card */}
//           {(activeTab === null || activeTab === "blog") && (
//             <div className={`preview-card ${activeTab === "blog" ? "expand" : ""}`}>
//               <div className="preview-card-header">
//                 <span className="ph-icon">≡</span> Generated Blog
//               </div>
//               <div className="blog-content">
//                 <div className="blog-title-line">Exciting Top Ideas</div>
//                 <div className="blog-thumb"></div>
//                 <div className="blog-generated-text">
//                   {blog ? blog : "Blog skeleton content..."}
//                   {keyPoints && (
//   <div className="highlight-box">
//     <h3>Key Points</h3>
//     <ul>
//       {keyPoints
//         .split(/[\n,]+/) // split by newline OR comma
//         .map((point) => point.trim()) // remove extra spaces
//         .filter(Boolean) // ignore empty items
//         .map((point, index) => (
//           <li key={index}>{point}</li>
//         ))}
//     </ul>
//   </div>
// )}

//                 </div>
//               </div>
//               <div className="blog-actions">
//                 <button className="blog-btn regen" onClick={() => handleGenerate("blog")}>
//                   ⟳ Regenerate ↓
//                 </button>
//                 <button className="blog-btn highlight" onClick={handleHighlight}>
//                   Highlight Key Points &gt;
//                 </button>
//               </div>
//             </div>
//           )}

//           {/* Social Card */}
//           {(activeTab === null || activeTab === "social") && (
//             <div className={`preview-card ${activeTab === "social" ? "expand" : ""}`}>
//               <div className="preview-card-header">
//                 <span className="ph-icon">💬</span> Social Media Posts
//               </div>
//               <div className="phone-mockup">
//                 <div className="phone-status">
//                   <span>9:41</span>
//                   <span>●●● 📶 🔋</span>
//                 </div>
//                 <div className="social-post">
//                   <div className="post-header">
//                     <div className="post-avatar"></div>
//                     <div className="post-name">ContentForge</div>
//                     <div className="post-time">now</div>
//                     <span style={{ color: "#aaa", marginLeft: "4px" }}>···</span>
//                   </div>
//                   <div className="post-text">{social ? social : "Social post skeleton content..."}</div>
//                   <div className="post-image"></div>
//                   <div className="post-actions">
//                     <div className="post-act">♡ 142</div>
//                     <div className="post-act">🔁 38</div>
//                     <div className="post-act">💬 24</div>
//                   </div>
//                 </div>
//                 <div className="twitter-icon">🐦</div>
//               </div>
//             </div>
//           )}

//           {/* Email Card */}
//           {(activeTab === null || activeTab === "email") && (
//             <div className={`preview-card ${activeTab === "email" ? "expand" : ""}`}>
//               <div className="preview-card-header">
//                 <span className="ph-icon">✉️</span> Marketing Email
//               </div>
//               <div className="email-content">
//                 <div className="email-top-row">
//                   <div className="email-greeting">Hi Alex,</div>
//                 </div>
//                 <div className="email-subject">Drive More Sales with Smart Content!</div>
//                 <div className="email-body">{email ? email : "Email skeleton content..."}</div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;
import { useState, useEffect } from "react";
import { generateContent } from "./ai";
import { useNavigate } from "react-router-dom";
import UserProfile from "./UserProfile";

import "./App.css";
import * as pdfjsLib from "pdfjs-dist";

// Supabase setup
import { supabase } from "./supabaseClient";

// required for pdf.js worker
import { GlobalWorkerOptions } from "pdfjs-dist/build/pdf";
import pdfWorker from "pdfjs-dist/build/pdf.worker?url";

GlobalWorkerOptions.workerSrc = pdfWorker;

function App() {
  const [user, setUser] = useState(null);
  const [text, setText] = useState("");
  const [tone, setTone] = useState("Friendly");
  const [blog, setBlog] = useState(null);
  const [social, setSocial] = useState(null);
  const [email, setEmail] = useState(null);
  const [activeTab, setActiveTab] = useState(null); // controls what card shows
  const [toneOpen, setToneOpen] = useState(false); // controls dropdown
  const tones = ["Professional", "Friendly", "Gen Z", "Casual", "Formal"]; // options
  const [uploadedFile, setUploadedFile] = useState(null);
  const [fileContent, setFileContent] = useState("");
  const navigate = useNavigate();
  const [generatedContent, setGeneratedContent] = useState("");
  const [keyPoints, setKeyPoints] = useState("");
  const [trendingTopics, setTrendingTopics] = useState([]);

  // Listen for auth changes and fetch profile
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setUser(session.user);
        } else {
          setUser(null);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Fetch trending topics from Supabase
  useEffect(() => {
    const fetchTopics = async () => {
      const { data, error } = await supabase
        .from("generated_content")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(10);
      if (!error) setTrendingTopics(data);
    };

    fetchTopics();

    // Real-time subscription
    const subscription = supabase
      .channel("public:generated_content")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "generated_content" },
        (payload) => {
          setTrendingTopics((prev) => [payload.new, ...prev].slice(0, 10));
        }
      )
      .subscribe();

    return () => supabase.removeChannel(subscription);
  }, []);

  // Google OAuth login
  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) console.error("Login error:", error.message);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  // Highlight Points
  const handleHighlight = async () => {
    if (!blog) return;

    // Ask AI for proper points with headings
    const prompt = `
Summarize the following blog into key points.
Make sure each point is a complete sentence.
Use headings for sections if possible, and list points under each heading.
${blog}
`;

    const result = await generateContent(prompt, "concise", "blog"); // use 'blog' so output is text
    setKeyPoints(result);
  };

  // Generate content handler
  const handleGenerate = async (type) => {
    if (!text && !fileContent) {
      return alert("Please enter a topic or upload a file!");
    }

    setActiveTab(type);

    let prompt = text;

    // Combine user query + PDF content if present
    if (fileContent) {
      prompt = `
You are given a document.

USER QUESTION:
${text}

DOCUMENT CONTENT:
${fileContent}

Answer based ONLY on the document.
`;
    }

    const result = await generateContent(prompt, tone, type);

    if (type === "blog") {
      setBlog(result);
      setKeyPoints(""); // reset key points whenever blog is regenerated
       if (user) {
    const { error } = await supabase.from("ai_history").insert([
      {
        user_id: user.id,
        type,
        prompt,
        result,
      },
    ]);

    if (error) console.error("History save error:", error.message);
  }
      // Save generated blog to Supabase if user logged in
      if (user) {
        const { data, error } = await supabase
          .from("generated_content")
          .insert([{ user_id: user.id, topic: text, content: result }]);
        if (error) console.error("Error saving blog:", error);
      }
    }
    if (type === "social") setSocial(result);
    if (type === "email") setEmail(result);
  };

  return (
    <div className="app-wrapper">
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="logo">
          <div className="logo-icon">🖊</div>
          ContentIQ<span>AI</span>
        </div>
        <div className="nav-links">
          <a href="#" className="active">
            <span className="nav-icon">▤</span> Dashboard
          </a>
        </div>
        <div className="nav-right">
          {!user && (
            <button onClick={() => navigate("/signin")} className="sign-in-btn">
              Sign In
            </button>
          )}

          {user && (
            <>
              <UserProfile userId={user.id} />

              <button onClick={handleLogout} className="sign-in-btn">
                Logout
              </button>
            </>
          )}
        </div>
      </nav>

      {/* HERO */}
      <div className="hero">
        <h1>Autonomous Content Generation</h1>
        <p>Transform your ideas into multi-format content in seconds.</p>

        {/* INPUT CARD */}
        <div className="input-card">
          <div className="input-label">
            Enter Your Content Idea: <div className="help-icon">?</div>
          </div>
          <div className="input-row">
            <input
              className="topic-input"
              type="text"
              placeholder="Enter your topic or brief..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <div
              className="tone-select-container"
              style={{ position: "relative" }}
            >
              <div
                className="tone-select"
                onClick={() => setToneOpen(!toneOpen)}
                style={{
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span>
                  Tone: {tone} <span className="tone-check">✔</span>
                </span>
                <span>▼</span>
              </div>

              {toneOpen && (
                <div
                  className="tone-options"
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    backgroundColor: "#fff",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    marginTop: "4px",
                    width: "100%",
                    zIndex: 10,
                  }}
                >
                  {tones.map((t) => (
                    <div
                      key={t}
                      onClick={() => {
                        setTone(t);
                        setToneOpen(false);
                      }}
                      style={{
                        padding: "8px 12px",
                        cursor: "pointer",
                        backgroundColor: t === tone ? "#e6f7ff" : "#fff",
                      }}
                    >
                      {t} {t === tone && "✔"}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="action-buttons">
            <button
              className="action-btn btn-blog"
              onClick={() => handleGenerate("blog")}
            >
              <div className="btn-icon">📄</div> Generate Blog Post
            </button>
            <button
              className="action-btn btn-social"
              onClick={() => handleGenerate("social")}
            >
              <div className="btn-icon">💬</div> Create Social Posts
            </button>
            <button
              className="action-btn btn-email"
              onClick={() => handleGenerate("email")}
            >
              <div className="btn-icon">✉️</div> Draft Marketing Email
            </button>
          </div>

          <div className="card-footer">
            <label
              className="upload-link"
              style={{ cursor: "pointer", color: "#4a90e2" }}
            >
              or Upload a Document
              <input
                type="file"
                accept=".pdf,.doc,.docx,.txt"
                style={{ display: "none" }}
                onChange={async (e) => {
                  const file = e.target.files[0];
                  if (!file) return;

                  setUploadedFile(file);

                  if (file.type === "application/pdf") {
                    const reader = new FileReader();
                    reader.onload = async (event) => {
                      const typedArray = new Uint8Array(event.target.result);
                      const pdf = await pdfjsLib.getDocument(typedArray).promise;

                      let fullText = "";
                      for (let i = 1; i <= pdf.numPages; i++) {
                        const page = await pdf.getPage(i);
                        const content = await page.getTextContent();
                        const pageText = content.items
                          .map((item) => item.str)
                          .join(" ");
                        fullText += pageText + "\n";
                      }

                      setFileContent(fullText);
                    };
                    reader.readAsArrayBuffer(file);
                  } else {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                      const content = event.target.result;
                      setFileContent(content);
                      setText(content);
                    };
                    reader.readAsText(file);
                  }
                }}
              />
            </label>
            {uploadedFile && (
              <div style={{ marginTop: "8px", color: "#aaa" }}>
                Uploaded: {uploadedFile.name}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* LIVE PREVIEW */}
      <div className="preview-section">
        <div className="preview-title">Live Preview</div>
        <div className={`preview-grid ${activeTab ? "single-view" : ""}`}>
          {/* Blog Card */}
          {(activeTab === null || activeTab === "blog") && (
            <div
              className={`preview-card ${activeTab === "blog" ? "expand" : ""}`}
            >
              <div className="preview-card-header">
                <span className="ph-icon">≡</span> Generated Blog
              </div>
              <div className="blog-content">
                <div className="blog-title-line">Exciting Top Ideas</div>
                <div className="blog-thumb"></div>
                <div className="blog-generated-text">
                  {blog ? blog : "Blog skeleton content..."}
                  {keyPoints && (
                    <div className="highlight-box">
                      <h3>Key Points</h3>
                      <ul>
                        {keyPoints
                          .split(/[\n,]+/) // split by newline OR comma
                          .map((point) => point.trim()) // remove extra spaces
                          .filter(Boolean) // ignore empty items
                          .map((point, index) => (
                            <li key={index}>{point}</li>
                          ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              <div className="blog-actions">
                <button
                  className="blog-btn regen"
                  onClick={() => handleGenerate("blog")}
                >
                  ⟳ Regenerate ↓
                </button>
                <button className="blog-btn highlight" onClick={handleHighlight}>
                  Highlight Key Points &gt;
                </button>
              </div>
            </div>
          )}

          {/* Social Card */}
          {(activeTab === null || activeTab === "social") && (
            <div
              className={`preview-card ${
                activeTab === "social" ? "expand" : ""
              }`}
            >
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
                    <span style={{ color: "#aaa", marginLeft: "4px" }}>···</span>
                  </div>
                  <div className="post-text">
                    {social ? social : "Social post skeleton content..."}
                  </div>
                  <div className="post-image"></div>
                  <div className="post-actions">
                    <div className="post-act">♡ 142</div>
                    <div className="post-act">🔁 38</div>
                    <div className="post-act">💬 24</div>
                  </div>
                </div>
                <div className="twitter-icon">🐦</div>
              </div>
            </div>
          )}

          {/* Email Card */}
          {(activeTab === null || activeTab === "email") && (
            <div
              className={`preview-card ${activeTab === "email" ? "expand" : ""}`}
            >
              <div className="preview-card-header">
                <span className="ph-icon">✉️</span> Marketing Email
              </div>
              <div className="email-content">
                <div className="email-top-row">
                  <div className="email-greeting">Hi Alex,</div>
                </div>
                <div className="email-subject">
                  Drive More Sales with Smart Content!
                </div>
                <div className="email-body">
                  {email ? email : "Email skeleton content..."}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* TRENDING TOPICS */}
      {user && trendingTopics.length > 0 && (
        <div className="trending-section">
          <h3>Trending Topics</h3>
          <ul>
            {trendingTopics.map((topic) => (
              <li key={topic.id}>{topic.topic}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
