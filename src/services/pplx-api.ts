export async function pplxAskStream(prompt: string, onChunk: (text: string) => void) {
  const url = 'https://www.perplexity.ai/rest/sse/perplexity_ask';
  
  const payload = {
    version: "2.1",
    source: "default",
    model: "sonar-reasoning-pro",
    messages: [
      { role: "user", content: prompt }
    ],
    frontend_uuid: crypto.randomUUID(),
    language: "en-US"
  };

  if (window.location.hostname.includes('perplexity.ai')) {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    
    if (!response.body) throw new Error('No stream');
    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value);
      parseSSE(chunk, onChunk);
    }
  } else {
    throw new Error('PPLX API only works on perplexity.ai domain');
  }
}

function parseSSE(rawText: string, callback: (t: string) => void) {
  const lines = rawText.split('\n');
  for (const line of lines) {
    if (line.startsWith('data: ')) {
      try {
        const json = JSON.parse(line.substring(6));
        if (json.answer) callback(json.answer);
        if (json.text) callback(json.text);
      } catch (e) { }
    }
  }
}
