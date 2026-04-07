// // import OpenAI from "openai";

// // const client = new OpenAI({
// //   apiKey: import.meta.env.VITE_GROQ_API_KEY,
// //   baseURL: "https://api.groq.com/openai/v1",
// //   dangerouslyAllowBrowser: true,
// // });

// // export async function generateContent(text, tone, type) {
// //   try {
// //     let prompt = "";

// //     if (type === "blog") {
// //       prompt = `Write a detailed blog post about "${text}" in a ${tone} tone with headings.`;
// //     } else if (type === "social") {
// //       prompt = `Create 3 engaging social media posts about "${text}" in a ${tone} tone.`;
// //     } else {
// //       prompt = `Write a marketing email about "${text}" in a ${tone} tone.`;
// //     }

// //     const response = await client.chat.completions.create({
// //       model: "llama-3.3-70b-versatile",
// //       messages: [{ role: "user", content: prompt }],
// //     });

// //     return response.choices[0].message.content;

// //   } catch (error) {
// //     console.error("AI ERROR:", error);
// //     return "Error generating content.";
// //   }
// // }
// export async function generateContent(text, tone, type) {
//   try {
//     const res = await fetch("http://localhost:5000/process", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ text, tone, type }),
//     });

//     const data = await res.json();

//     if (!data.content) {
//       console.error("Backend error:", data);
//       return "Error from server";
//     }

//     // All types return the same AI content now
//     return data.content;

//   } catch (error) {
//     console.error("Frontend Error:", error);
//     return "Error generating content";
//   }
// }
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
