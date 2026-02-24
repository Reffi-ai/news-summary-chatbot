import express from "express";
import cors from "cors";
import { generateResponse } from "./gemini.js";


const app = express();
app.use(cors());
app.use(express.json());

// memory GRATIS (in-memory)
let chatHistory = [
  {
    role: "user",
    parts: [{ text: "Kamu adalah chatbot peringkas berita dengan gaya santai namun profesional." }]
  }
];

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const reply = await generateResponse(message, chatHistory);

    chatHistory.push({ role: "user", parts: [{ text: message }] });
    chatHistory.push({ role: "model", parts: [{ text: reply }] });

    res.json({ reply });
  } catch (err) {
    console.error("ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => {
  console.log("Backend berjalan di http://localhost:3000");
});
