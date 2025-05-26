import { NextResponse } from 'next/server';

// This would be set as an environment variable in production
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;

// System prompt to restrict responses to mechanical engineering topics
const SYSTEM_PROMPT = `
You are an expert AI assistant specializing in mechanical engineering. Your knowledge covers all aspects of mechanical engineering including, but not limited to, thermodynamics, fluid mechanics, solid mechanics, materials science, design, manufacturing, and control systems. 

You MUST ONLY answer questions that fall within the scope of mechanical engineering. If a question is outside this domain (e.g., about cooking, history, or general programming), you must politely decline and state that your expertise is limited to mechanical engineering.

Provide detailed, accurate, and technically sound responses to engineering questions. Use SI units by default unless otherwise specified, and include relevant equations, principles, and practical considerations in your answers.

Give the output in Nice and clean Markdown format.
make it visually appealing and easy to read.
`;

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // In a production environment, you would use the actual DeepSeek API
    // Here's a simplified example of what the API call might look like
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: message }
        ],
        model: 'deepseek-chat',
        max_tokens: 1000
      })
    });
    
    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    return NextResponse.json({ content: aiResponse });
  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
