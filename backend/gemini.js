import 'dotenv/config';

export async function generateResponse(prompt, history) {
  const contents = history ? [...history] : [];

  contents.push({
    role: "user",
    parts: [{ text: prompt }]
  });

  const response = await fetch(
    "https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=" +
      process.env.GEMINI_API_KEY,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ contents })
    }
  );

  const data = await response.json();

  if (!response.ok) {
    console.error("Gemini API error:", data);
    throw new Error(data.error?.message || "Gemini API error");
  }

  return data.candidates[0].content.parts[0].text;
}
