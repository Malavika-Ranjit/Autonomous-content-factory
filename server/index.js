// require("dotenv").config(); 

// const express = require("express");
// const cors = require("cors");
// const OpenAI = require("openai");

// // Initialize OpenAI
// const client = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("Server is running...");
// });



// app.post("/process", (req, res) => {
//   const { text } = req.body;

//   // Research Agent
//   const researchData = {
//     features: ["Fast performance", "AI-powered", "User-friendly UI"],
//     audience: "Developers and startups",
//     value: "Saves time and automates content creation"
//   };

//   // Copywriter Agent
//   let blog = `
// This is a very long blog content that might be too long for demo.
// This platform helps developers automate content creation across multiple platforms.
// It ensures consistency, reduces workload, and improves productivity.
// It is designed for scalability and efficiency.
// This continues to make the blog intentionally long for testing purposes.
// More lines added to exceed the character limit.
// `;

//   let twitterThread = [
//     "🚀 Introducing the future!",
//     "⚡ Fast & AI-powered",
//     "💡 Perfect for devs",
//     "⏳ Save time",
//     "🔥 Automate everything"
//   ];
//   let email = "Short email content...";

//   // 🛡️ Editor Agent
//   let editorFeedback = "Approved";
//   let status = "approved";

//   if (blog.length > 300) {
//     status = "rejected";
//     editorFeedback = "Blog is too long. Please shorten it.";
//   }

//   res.json({
//     research: researchData,
//     copy: {
//       blog,
//       twitterThread,
//       email
//     },
//     editor: {
//       status,
//       feedback: editorFeedback
//     }
//   });
//   app.listen(5000, () => {
//   console.log("Server running on port 5000");
// });
// });
require("dotenv").config(); 

const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running...");
});

app.post("/process", (req, res) => {
  const { text } = req.body;

  const researchData = {
    features: ["Fast performance", "AI-powered", "User-friendly UI"],
    audience: "Developers and startups",
    value: "Saves time and automates content creation"
  };

  let blog = `
This is a very long blog content that might be too long for demo.
This platform helps developers automate content creation across multiple platforms.
It ensures consistency, reduces workload, and improves productivity.
It is designed for scalability and efficiency.
This continues to make the blog intentionally long for testing purposes.
More lines added to exceed the character limit.
`;

  let twitterThread = [
    "🚀 Introducing the future!",
    "⚡ Fast & AI-powered",
    "💡 Perfect for devs",
    "⏳ Save time",
    "🔥 Automate everything"
  ];

  let email = "Short email content...";

  let status = "approved";
  let feedback = "Content looks good!";

  if (blog.length > 300) {
    status = "rejected";
    feedback = "Blog is too long. Please shorten it.";
  }

  res.json({
    research: researchData,
    copy: {
      blog,
      twitterThread,
      email
    },
    editor: {
      status,
      feedback
    }
  });
});

// ✅ CORRECT PLACE
app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});
