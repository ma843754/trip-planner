export async function getWeatherForTrip(destination) {
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  if (!apiKey) {
    throw new Error("Weather API key is missing.");
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
    destination
  )}&appid=${apiKey}&units=imperial`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Unable to fetch weather data.");
  }

  const data = await response.json();

  return {
    city: data.name,
    temperature: data.main.temp,
    description: data.weather[0].description,
    feelsLike: data.main.feels_like,
  };
}