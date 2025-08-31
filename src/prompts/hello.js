import { OpenAI } from 'openai';
import  'dotenv/config'
const client = new OpenAI({
  // apiKey: process.env.OPENAI_API_KEY, // we can change to gemini key
    apiKey: process.env.GOOGLE_API_KEY,
   baseURL: 'https://generativelanguage.googleapis.com/v1beta/openai/'
});

// these APi calls are stateless- not remembering
async function getHelloResponse() {
  const response = await client.chat.completions.create({
    // model: 'gpt-4.1-mini',  // or gemini-1.5-flash if using gemini
    model: 'gemini-1.5-flash',
    messages: [
        { role: 'user', content: 'hey GPT, my name is anil' },
        { role: 'assistant', content: 'hello anil, how can I assist you today?' },
        { role: 'user', content: 'can you tell me my name?' },
        { role: 'user', content: 'write a poem on me' },
        
    ],
  });

  return response;
}

getHelloResponse()
  .then(response => console.log(JSON.stringify(response.choices[0].message.content, null, 2)))
  .catch(error => console.error('❌ Error:', error));
