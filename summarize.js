
// api/summarize.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  try {
    const { youtubeUrl } = req.body;
    // Minimal placeholder summary
    const summary = 'This is a placeholder summary for ' + youtubeUrl;
    res.status(200).json({ summary });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
