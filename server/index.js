require("dotenv").config(); 

const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");

// Initialize OpenAI
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running...");
});



app.post("/process", async (req, res) => {
  const { text } = req.body;

  // 🔥 FAKE AI RESPONSE
  res.json({
    result: `
Features: AI-based automation
Target Audience: Students & Businesses
Value: Saves time and effort

(Input was: ${text})
    `,
  });
});



app.listen(5000, () => {
  console.log("Server running on port 5000");
});
