import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();
app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

app.post("/generate", async (req, res) => {
  try {
    const { prompt, tone, type } = req.body;

    let finalPrompt = "";

    // 🔥 DIFFERENT PROMPTS BASED ON BUTTON
    if (type === "blog") {
      finalPrompt = `
Write a detailed blog post about: ${prompt}
Tone: ${tone}

Use headings, paragraphs.
DO NOT return JSON.
Only return readable blog text.
`;
    }

    if (type === "social") {
      finalPrompt = `
Write 5 engaging social media posts about: ${prompt}
Tone: ${tone}

Make them short, catchy.
DO NOT return JSON.
Only return plain text.
`;
    }

    if (type === "email") {
      finalPrompt = `
Write a marketing email about: ${prompt}
Tone: ${tone}

Include subject + body.
DO NOT return JSON.
Only return readable email text.
`;
    }

    const response = await client.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: finalPrompt }],
    });

    res.json({
      content: response.choices[0].message.content,
    });
  } catch (err) {
    console.error("🔥 BACKEND ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});
