// require("dotenv").config();

// const express = require("express");
// const cors = require("cors");
// const OpenAI = require("openai");

// const app = express();

// // 🔐 Groq via OpenAI SDK
// const client = new OpenAI({
//   apiKey: process.env.VITE_GROQ_API_KEY,
//   baseURL: "https://api.groq.com/openai/v1", // ✅ important for Groq
// });

// app.use(cors());
// app.use(express.json());

// // ✅ Health check
// app.get("/", (req, res) => {
//   res.send("🚀 Server is running...");
// });

// // ✅ MAIN API
// app.post("/process", async (req, res) => {
//   try {
//     const { text, tone, type } = req.body;

//     if (!text) {
//       return res.status(400).json({ error: "Text is required" });
//     }

//     let prompt = "";

//     // 🎯 DIFFERENT OUTPUT BASED ON BUTTON
//     if (type === "blog") {
//       prompt = `
// Write a detailed blog post about: ${text}
// Tone: ${tone}

// Use headings and paragraphs.
// Do NOT return JSON.
// Only return clean readable blog content.
// `;
//     }

//     if (type === "social") {
//       prompt = `
// Write 5 engaging social media posts about: ${text}
// Tone: ${tone}

// Make them short, catchy and separate each post with a new line.
// Do NOT return JSON.
// Only return plain text.
// `;
//     }

//     if (type === "email") {
//       prompt = `
// Write a marketing email about: ${text}
// Tone: ${tone}

// Include subject and body.
// Do NOT return JSON.
// Only return clean readable email.
// `;
//     }

//     const response = await client.chat.completions.create({
//       model: "llama-3.1-8b-instant",
//       messages: [{ role: "user", content: prompt }],
//     });

//     const aiText = response.choices[0].message.content;

//     console.log("🧠 AI RESPONSE:", aiText);

//     // ✅ NO JSON PARSE — just send text
//     res.json({
//       content: aiText,
//     });

//   } catch (error) {
//     console.error("🔥 BACKEND ERROR:", error.message);
//     res.status(500).json({ error: error.message });
//   }
// });


// // ✅ Start server
// app.listen(5000, () => {
//   console.log("🚀 Server running on port 5000");
// });
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");

const app = express();

// ✅ Use a backend-safe env variable name
const client = new OpenAI({
  apiKey: process.env.VITE_GROQ_API_KEY, // make sure you set GROQ_API_KEY in .env
  baseURL: "https://api.groq.com/openai/v1",
});

app.use(cors());
app.use(express.json());

// ✅ Health check
app.get("/", (req, res) => {
  res.send("🚀 Server is running...");
});

// ✅ Main API endpoint
app.post("/process", async (req, res) => {
  try {
    const { text, tone, type } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Text is required" });
    }

    let prompt = "";

    // 🎯 Handle different output types
    switch (type) {
      case "blog":
        prompt = `
Write a detailed blog post about: ${text}
Tone: ${tone}
Use headings and paragraphs.
Do NOT return JSON.
Only return clean readable blog content.
        `;
        break;

      case "social":
        prompt = `
Write 5 engaging social media posts about: ${text}
Tone: ${tone}
Make them short, catchy and separate each post with a new line.
Do NOT return JSON.
Only return plain text.
        `;
        break;

      case "email":
        prompt = `
Write a marketing email about: ${text}
Tone: ${tone}
Include subject and body.
Do NOT return JSON.
Only return clean readable email.
        `;
        break;

      case "keywords":
        prompt = `
Extract the top 5 relevant keywords from the following text:
${text}
Return keywords as a comma-separated list.
Do NOT return JSON.
        `;
        break;

      default:
        return res.status(400).json({ error: "Invalid type provided" });
    }

    // ✅ Call the AI model
    const response = await client.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: prompt }],
    });

    const aiText = response.choices[0].message.content;

    console.log("🧠 AI RESPONSE:", aiText);

    res.json({ content: aiText });

  } catch (error) {
    console.error("🔥 BACKEND ERROR:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
