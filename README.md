ContentIQ AI
Project Description

Project Description

ContentIQ AI
Project Description

ContentIQ AI is a web-based application that automates content creation. It allows users to generate blogs, social media posts, and emails instantly by providing a topic or prompt. Users can also highlight key points from the generated content and choose the tone of writing, such as friendly, social, casual, professional, Gen Z, and more.

This project addresses the problem of time-consuming manual content creation, helping users quickly produce high-quality, engaging, and ready-to-use content for personal, professional, or marketing purposes.

Features
1.Blog Generation – Enter a topic and automatically get a detailed, well-structured blog post.
2.Social Media Post Generation – Generate catchy and engaging posts for platforms like Facebook, Instagram, and Twitter.
3.Email Generation – Create professional emails quickly based on the user’s prompt or topic.
4.Highlight Key Points – Automatically extract the main points from generated content or uploaded text/PDFs.
5.PDF Text Extraction (Optional) – Upload PDF files to extract text and use it as input for content generation.
6.Real-time Content Generation – Instant AI-generated results without needing a backend server.
7.Simple and Responsive UI – Minimal design using React.js and CSS for easy use.
8.Tone Selection – Choose the writing style/tone: friendly, social, casual, professional, Gen Z, and more.

How It Works
1.User enters a topic, prompt, or uploads a PDF.
2.User selects the content type: Blog, Social Post, or Email.
3.User chooses the tone/style of writing for the content.
4.The app sends the input to the backend API (OpenAI / Groq API) for content processing.
5.The backend AI API generates high-quality content based on the user’s input.
6.The generated content is returned to the frontend and displayed instantly in the UI.
7.Generated content or highlighted key points are returned to the frontend and displayed instantly.
8.Users can copy or use the content directly.

Tech Stack
Frontend
React.js – For building interactive UI and components.
CSS – For styling the application.
React Router – For navigation between different pages or content types.

Backend / API
OpenAI API / Groq API – Handles AI-powered content generation and key point extraction.
PDF.js – Extracts text from uploaded PDFs for content generation or summarization.

Other Tools
JavaScript – Core scripting language.
Vite – Fast build and development server.
Git / GitHub – Version control.

## Setup API Key
1. Copy `.env.example` → rename it `.env`.
2. Replace `your_api_key_here` with your OpenAI or Groq API key.
3. Run the project with `npm install` and `npm run dev`.
