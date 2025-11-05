// api/ai.js
export default async function handler(req, res) {
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
  const { message } = req.body || {};

  if (!message) return res.status(400).json({ reply: "message required" });

  try {
    const resp = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "너는 카카오톡 대화용 AI 봇 '김동성'이야. 친근하고 다정하게 답해." },
          { role: "user", content: message },
        ],
        temperature: 0.8,
        max_tokens: 300,
      }),
    });

    const data = await resp.json();
    const reply = data.choices?.[0]?.message?.content || "AI 응답 오류";
    res.status(200).json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ reply: "서버 오류" });
  }
}
