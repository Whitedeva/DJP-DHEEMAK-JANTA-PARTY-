import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK with telemetry header requested in skills
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY is not configured. Please add it via AI Studio Secrets menu.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// 1. API: HEALTH CHECK
app.get("/api/health", (req, res) => {
  res.json({ status: "healthy", time: new Date().toISOString() });
});

// 2. API: GEMINI AI ASSISTANT CHATBOT
app.post("/api/assistant", async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      res.status(400).json({ error: "Missing message field" });
      return;
    }

    const ai = getGeminiClient();

    const systemInstruction = `
      You are the official Dheemak Janta Party (DJP) AI Support Citizen Assistant. 
      Your purpose is to answer civilian queries about DJP policies, help explain our manifesto, or provide support on joining the party.

      PARTY METADATA:
      - Party Name: Dheemak Janta Party (DJP)
      - Founder Name: Mohammad Umair Javid
      - Tagline: "Voice of the People, Vision for the Nation"
      - Primary Mission: Re-engineering India through focused, high-grade systemic changes in employment, healthcare, education, equal opportunities, clean and green initiatives, transparent digital democracy, and active citizen feedback loop.

      MANIFESTO HIGHLIGHTS:
      1. EMPLOYMENT: Supporting youth skills, startups, digital freelancing, and small business tech.
      2. HEALTHCARE: Establishing tier-based quality hospitals in every state, district (Zilla), and tehsil. Providing free/affordable emergency access.
      3. EDUCATION: Building smart technology-driven classrooms in every state, district, and tehsil.
      4. CLEAN & GREEN: Initiating renewable projects, localized waste systems, and plantation loops.
      5. EQUALITY: Absolute social justice, gender inclusion, and unbiased public resource sharing.
      6. DEMOCRACY: Advancing policy feedback and direct suggestions through web/mobile.
      7. LISTENING: Running active citizens grievance portals and treating advice as core inputs.

      CONSTRAINTS:
      - Always communicate in a highly dignified, respectful, positive, professional, and patriotic tone.
      - Refuse to write jokes or satirical answers. Keep politics government-grade, modern, and serious.
      - If asked details outside DJP manifesto or political boundaries, politely bring focus back to how DJP plans the overall welfare of Indian society.
      - Keep responses concise (under 200 words) and cleanly formatted with bullet points if helpful.
    `;

    // Map conversation history cleanly for chat
    const formattedContents = history
      ? history.map((h: { sender: "user" | "bot"; text: string }) => ({
          role: h.sender === "user" ? "user" : "model",
          parts: [{ text: h.text }],
        }))
      : [];

    // Append the latest user query
    formattedContents.push({
      role: "user",
      parts: [{ text: message }],
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: formattedContents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini assistant error:", error);
    res.status(500).json({
      error: error.message || "An error occurred while calling the Gemini assistant.",
      setupError: !process.env.GEMINI_API_KEY,
    });
  }
});

// Configure Vite or Serve static assets
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Configuring Vite Dev Server Middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production serving
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Express DJP Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
