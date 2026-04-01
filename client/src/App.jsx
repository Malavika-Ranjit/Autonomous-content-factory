import { useState } from "react";

function App() {
  const [text, setText] = useState("");
  const [output, setOutput] = useState("");

  const handleGenerate = async () => {
    const res = await fetch("http://localhost:5000/process", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    const data = await res.json();
    setOutput(data.result);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>🚀 ContentForge AI</h1>

      {/* THIS IS YOUR INPUT BOX 👇 */}
      <textarea
        rows="10"
        cols="60"
        placeholder="Paste your source content here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <br /><br />

      <button onClick={handleGenerate}>
        Generate Content
      </button>

      <h2>📄 Output:</h2>
      <div style={{ whiteSpace: "pre-wrap" }}>
        {output}
      </div>
    </div>
  );
}

export default App;
