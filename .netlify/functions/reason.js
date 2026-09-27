exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' };
  }

  const { prompt } = JSON.parse(event.body);
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    return { statusCode: 500, body: JSON.stringify({ error: 'API key not configured' }) };
  }

  if (!prompt) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Prompt required' }) };
  }

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': 'https://second-thought.netlify.app',
        'X-Title': 'Second Thought',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'anthropic/claude-3-5-sonnet',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 2048,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('OpenRouter error:', data);
      return { statusCode: response.status, body: JSON.stringify({ error: data.error?.message || 'API error' }) };
    }

    const text = data.choices?.[0]?.message?.content || '';
    let result;
    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      result = jsonMatch ? JSON.parse(jsonMatch[0]) : {};
    } catch {
      result = { raw: text };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error) {
    console.error('Function error:', error);
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};
