import { GoogleGenAI } from '@google/genai';

async function main() {
  // 1. Initialize the client
  const client = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });

  // 2. Define the model (Gemini 2.0 Flash supports Thinking and Search)
  const modelId = 'gemini-2.0-flash-thinking-exp-01-21'; 

  const config = {
    thinkingConfig: {
      includeThoughts: true, // Set to true to see the "reasoning" process
    },
    tools: [
      { googleSearch: {} }
    ],
  };

  const contents = [
    {
      role: 'user',
      parts: [{ text: "Build a React component for a weather dashboard." }],
    },
  ];

  try {
    // 3. Generate content (Streaming is best for Bolt clones)
    const response = await client.models.generateContentStream({
      model: modelId,
      contents: contents,
      config: config,
    });

    for await (const chunk of response.stream) {
      // For Bolt, you'll want to send these chunks to the UI in real-time
      if (chunk.text) {
        process.stdout.write(chunk.text());
      }
    }
  } catch (error) {
    console.error("AI Generation Error:", error);
  }
}

main();