// api/summarize.js
import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { youtubeUrl } = req.body;
    if (!youtubeUrl) {
      res.status(400).json({ error: 'YouTube URL is required' });
      return;
    }

    // Call OpenAI GPT for summarization
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.LLM_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are an expert AI that summarizes YouTube videos concisely and clearly."
          },
          {
            role: "user",
            content: `Summarize the content of this YouTube video in short paragraphs: ${youtubeUrl}`
          }
        ],
        temperature: 0.3,
        max_tokens: 300
      })
    });

    const data = await response.json();

    // Extract summary
    const summary = data.choices?.[0]?.message?.content || "No summary available.";

    res.status(200).json({ summary });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

