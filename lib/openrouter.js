const MODEL = 'anthropic/claude-sonnet-5.5';

function openRouterHandler({ temperature, maxTokens }) {
  return async (req, res) => {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) return res.status(500).json({ error: 'API key not configured' });
    const prompt = req.body && req.body.prompt;
    if (!prompt) return res.status(400).json({ error: 'Prompt required' });

    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'HTTP-Referer': `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL || 'localhost'}`,
          'X-Title': 'Second Thought',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: MODEL,
          messages: [{ role: 'user', content: prompt }],
          temperature,
          max_tokens: maxTokens,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        console.error('OpenRouter error:', data);
        return res.status(response.status).json({ error: data.error?.message || 'API error' });
      }

      const text = data.choices?.[0]?.message?.content || '';
      let result;
      try {
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        result = jsonMatch ? JSON.parse(jsonMatch[0]) : {};
      } catch {
        result = { raw: text };
      }
      return res.status(200).json(result);
    } catch (error) {
      console.error('Function error:', error);
      return res.status(500).json({ error: error.message });
    }
  };
}

module.exports = { openRouterHandler };
