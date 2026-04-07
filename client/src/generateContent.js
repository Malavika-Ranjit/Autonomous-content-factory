// generateContent.js
export async function generateContent(text, tone, type) {
  try {
    const res = await fetch("http://localhost:5000/process", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, tone, type }),
    });

    const data = await res.json();
    if (!data.content) {
      console.error("Backend error:", data);
      return "Error from server";
    }
    return data.content;
  } catch (error) {
    console.error("Frontend Error:", error);
    return "Error generating content";
  }
}
