import express from 'express';
import cors from 'cors';
import { Configuration, OpenAIApi } from 'openai';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAIApi(new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
}));

app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;
  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: userMessage }],
    });
    res.json({ reply: response.data.choices[0].message.content });
  } catch (err) {
    res.status(500).json({ error: 'Failed to get response from AI.' });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));
