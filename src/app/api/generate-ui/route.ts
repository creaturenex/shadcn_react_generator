import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { file } = await request.json();

    if (!file) {
      return NextResponse.json({ error: 'Image data is required' }, { status: 400 });
    }

    // Extract the base64 data and media type from the data URL
    const [header, base64Data] = file.split(',');
    const mediaType = header.match(/:(.*?);/)[1];

    const prompt = `
    Analyze the attached image and generate a React component using code that replicates the layout and style of the uploaded image. Use only existing shadcn components and Tailwind CSS for styling. Follow these guidelines:

    1. Import and use only existing shadcn/ui components:
    2. Use Lucide React icons where appropriate.
    3. Style elements primarily with Tailwind CSS classes.
    4. Do not create or reference any custom shadcn/ui components.
    5. Ensure the component is fully functional and closely resembles the image.
    6. Provide a brief explanation of the component structure after the code.
    7. Include all necessary import statements at the top of the component.
    
    Generate the complete React component code, adhering strictly to these guidelines.`

    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20240620",
      max_tokens: 4096,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              source: {
                type: "base64",
                media_type: mediaType,
                data: base64Data,
              },
            },
            {
              type: "text",
              text: prompt,
            }
          ],
        }
      ],
    });

    const generatedCode = response.content[0].text;

    return NextResponse.json({ uiCode: generatedCode });
  } catch (error) {
    console.error('Error generating UI:', error);
    return NextResponse.json({ error: 'Failed to generate UI' }, { status: 500 });
  }
}