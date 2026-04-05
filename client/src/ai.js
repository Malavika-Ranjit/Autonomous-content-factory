// import OpenAI from "openai";

// const client = new OpenAI({
//   apiKey: import.meta.env.VITE_OPENAI_API_KEY;
//   baseURL: "https://api.groq.com/openai/v1";
// });

// export async function generateContent(type, topic, tone) {
//   let prompt = "";

//   if (type === "blog") {
//     prompt = `Write a detailed blog post about "${topic}" in a ${tone} tone.`;
//   } else if (type === "social") {
//     prompt = `Create 5 engaging social media posts about "${topic}" in a ${tone} tone.`;
//   } else {
//     prompt = `Write a marketing email about "${topic}" in a ${tone} tone.`;
//   }

//   const response = await client.chat.completions.create({
//     model: "llama-3.3-70b-versatile",
//     messages: [{ role: "user", content: prompt }],
//   });

//   return response.choices[0].message.content;
// }
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
  dangerouslyAllowBrowser: true,
});

export async function generateContent(text, tone, type) {
  try {
    let prompt = "";

    if (type === "blog") {
      prompt = `Write a detailed blog post about "${text}" in a ${tone} tone with headings.`;
    } else if (type === "social") {
      prompt = `Create 3 engaging social media posts about "${text}" in a ${tone} tone.`;
    } else {
      prompt = `Write a marketing email about "${text}" in a ${tone} tone.`;
    }

    const response = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
    });

    return response.choices[0].message.content;

  } catch (error) {
    console.error("AI ERROR:", error);
    return "Error generating content.";
  }
}
