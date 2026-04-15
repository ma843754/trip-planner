export async function generateTripSuggestions({
  destination,
  date,
  budget,
  preference,
  weather,
}) {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error("OpenAI API key is missing.");
  }

  const prompt = `
You are a travel planning assistant.

Suggest 4 trip activities for this user.

Destination: ${destination}
Date: ${date}
Budget: ${budget}
Preference: ${preference}
Weather: ${weather.description}, ${weather.temperature}°F

Return the response as a JSON array.
Each object should include:
- title
- description
- estimatedCost
- category
`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content: "You help users plan realistic travel activities.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to generate AI suggestions.");
  }

  const data = await response.json();
  const content = data.choices[0].message.content;

  try {
    return JSON.parse(content);
  } catch (error) {
    throw new Error("AI returned invalid suggestion format.");
  }
}