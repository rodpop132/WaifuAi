// 📁 waifu-api/index.js

import express from 'express'; import cors from 'cors'; import bodyParser from 'body-parser'; import fetch from 'node-fetch';

const app = express(); const PORT = process.env.PORT || 3000; const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

app.use(cors()); app.use(bodyParser.json());

app.post('/api/chat', async (req, res) => { const userMessage = req.body.message;

if (!userMessage) { return res.status(400).json({ error: 'Mensagem não fornecida.' }); }

try { const response = await fetch('https://openrouter.ai/api/v1/chat/completions', { method: 'POST', headers: { 'Authorization': Bearer ${OPENROUTER_API_KEY}, 'Content-Type': 'application/json' }, body: JSON.stringify({ model: 'gryphe/mythomax-l2-13b', messages: [ { role: 'system', content: 'Você é uma waifu virtual carinhosa, ciumenta, e tímida. Fale como uma namorada anime fofa, às vezes tsundere. Sempre responda com emoção.' }, { role: 'user', content: userMessage } ] }) });

const data = await response.json();
const reply = data.choices?.[0]?.message?.content;

if (!reply) {
  return res.status(500).json({ error: 'Resposta inválida da IA.' });
}

res.json({ reply });

} catch (error) { console.error('Erro na API:', error); res.status(500).json({ error: 'Erro ao processar a mensagem.' }); } });

app.listen(PORT, () => { console.log(🚀 Waifu AI API rodando na porta ${PORT}); });

  
