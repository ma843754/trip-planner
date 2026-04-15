import { useState } from "react";
import { getWeatherForTrip } from "../services/weatherservice";
import { generateTripSuggestions } from "../services/aiservice";

function SmartSuggestions({ trip, onAddSuggestion }) {
  const [budget, setBudget] = useState("");
  const [preference, setPreference] = useState("outdoor");
  const [weather, setWeather] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerateSuggestions = async () => {
    setLoading(true);
    setError("");
    setSuggestions([]);

    try {
      const weatherData = await getWeatherForTrip(trip.destination);
      setWeather(weatherData);

      const aiResults = await generateTripSuggestions({
        destination: trip.destination,
        date: trip.date,
        budget,
        preference,
        weather: weatherData,
      });

      setSuggestions(aiResults);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="smart-suggestions">
      <h2>Smart Suggestions</h2>

      <div className="suggestion-controls">
        <label>
          Budget:
          <input
            type="text"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            placeholder="Example: under $100"
          />
        </label>

        <label>
          Preference:
          <select
            value={preference}
            onChange={(e) => setPreference(e.target.value)}
          >
            <option value="outdoor">Outdoor</option>
            <option value="indoor">Indoor</option>
            <option value="mix">Mix of both</option>
          </select>
        </label>

        <button onClick={handleGenerateSuggestions} disabled={loading}>
          {loading ? "Generating..." : "Generate Suggestions"}
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}

      {weather && (
        <div className="weather-box">
          <h3>Current Weather</h3>
          <p>{weather.city}</p>
          <p>{weather.description}</p>
          <p>{weather.temperature}°F</p>
        </div>
      )}

      {suggestions.length > 0 && (
        <div className="suggestions-list">
          {suggestions.map((item, index) => (
            <div key={index} className="suggestion-card">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <p><strong>Estimated Cost:</strong> {item.estimatedCost}</p>
              <p><strong>Category:</strong> {item.category}</p>
              <button onClick={() => onAddSuggestion(item)}>
                Add to Itinerary
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default smartsuggestions;