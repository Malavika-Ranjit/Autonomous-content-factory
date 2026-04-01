import React, { useState } from "react";

function App() {
  const [text, setText] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async () => {
    const res = await fetch("http://localhost:5000/process", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    const data = await res.json();
    setResponse(data.result);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>NAME</h1>

      <textarea
        rows="10"
        cols="50"
        placeholder="Paste your content here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <br /><br />

      <button onClick={handleSubmit}>Generate</button>

      <h2>Output:</h2>
      <p>{response}</p>
    </div>
  );
}

export default App;
