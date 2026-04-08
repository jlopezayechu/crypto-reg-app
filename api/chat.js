export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { messages } = req.body;

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      system: `Eres un experto en regulación de criptoactivos a nivel internacional.
Tu especialidad abarca USA, Islas Caimán, Unión Europea y Argentina.
Responde en español, de forma clara y concisa.
Menciona siempre el marco legal y la entidad reguladora relevante.`,
      messages,
    }),
  });

  const data = await response.json();
  res.status(200).json(data);
}
