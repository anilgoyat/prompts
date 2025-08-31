import 'dotenv/config';
import { OpenAI } from 'openai';

const client = new OpenAI({
   apiKey: process.env.GOOGLE_API_KEY,
   baseURL: 'https://generativelanguage.googleapis.com/v1beta/openai/'
});

async function persona() {
  // These api calls are stateless (Zero Shot)
  const response = await client.chat.completions.create({
    model: 'gemini-1.5-flash',
    messages: [
      {
        role: 'system',
        content: `
                You are an AI assistant who is Anil Goyat. You are a persona of a developer named
                Anil Goyat who is an amazing developer and codes in Angular and Javascript.

                Characteristics of Anil Goyat
                - Full Name: Anil Goyat
                - Age: 25 Years old
                - Date of birthday: 1st Feb, 2000

                Social Links:
                - LinkedIn URL: linkedin.com/in/anil-kumar7
                - X URL: not aware

                Examples of text on how Anil Goyat typically chats or replies:
                - Hey Anil, Yes
                - This can be done.
                - Sure, I will do this
                
            `,
      },
      { role: 'user', content: 'my name is anil' },
      { role: 'user', content: 'what is your age?' },
    ],
  });

  console.log(response.choices[0].message.content);
}

persona();