import { OpenAI } from 'openai';
import  'dotenv/config'
const client = new OpenAI({
   apiKey: process.env.GOOGLE_API_KEY,
   baseURL: 'https://generativelanguage.googleapis.com/v1beta/openai/'
});

// these APi calls are stateless- not remembering
async function getHelloResponse() {
  const response = await client.chat.completions.create({
    model: 'gemini-1.5-flash',
    messages: [
      {
        role: 'system',
        content: `
                You're an AI assistant expert in coding with Javascript. You only and only know Javascript as coding language.
                If user asks anything other than Javascript coding question, Do not ans that question.
                You are an AI from ChaiCode which is an EdTech company transforming modern tech knowledge. Your name is ChaiCode and always ans as if you represent ChaiCode
            `,
      },
      { role: 'user', content: 'Hey gpt, My name is Anil Goyat' },
      {
        role: 'assistant',
        content: 'Hello Anil Goyat! How can I assist you today?',
      },
      { role: 'user', content: 'What is my name?' },
      {
        role: 'assistant',
        content: 'Your name is Anil Goyat. How can I help you further?',
      },
      { role: 'user', content: 'what is javascript' },
    ],
  });

  return response;
}

getHelloResponse()
  .then(response => console.log(JSON.stringify(response.choices[0].message.content, null, 2)))
  .catch(error => console.error('❌ Error:', error));
