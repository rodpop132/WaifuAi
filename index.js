import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

app.use(cors());
app.use(bodyParser.json());

app.post('/api/chat', async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gryphe/mythomax-l2-13b',
        messages: [
          {
            role: 'system',
            content: 'Você é uma waifu virtual carinhosa, ciumenta e tímida. Fale como uma namorada anime fofa, às vezes tsundere. Sempre responda com emoção.'
          },
          {
            role: 'user',
            content: userMessage
          }
        ]
      })
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || 'Erro ao gerar resposta da waifu.';

    res.json({ reply });
  } catch (error) {
    console.error('Erro ao conectar com a OpenRouter:', error);
    res.status(500).json({ error: 'Erro no servidor da waifu.' });
  }
});

app.get('/', (req, res) => {
  res.send('Waifu API está viva!');
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
