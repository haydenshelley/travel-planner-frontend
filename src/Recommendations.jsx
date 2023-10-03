import { Header } from "./Header";
import { useEffect, useState } from "react";
import axios from "axios";

export function Recommendations() {
  const [results, setResults] = useState([]);
  const [location, setLocation] = useState("");
  const [proximity, setProximity] = useState("");
  const [category, setCategory] = useState("");

  const handleRecommendations = () => {
    axios
      .get(
        `http://localhost:3000/places/recommendations.json?location=${location}&proximity=${proximity}&category=${category}`
      )
      .then((response) => {
        console.log(response.data);
        setResults(response.data.features);
      });
  };

  return (
    <div>
      <Header />
      <h1>Recommendations</h1>
      <div>
        <label>Location:</label>
        <input
          type="text"
          name="location"
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      <div>
        <label>Proximity:</label>
        <input
          type="text"
          name="proximity"
          onChange={(e) => setProximity(e.target.value)}
        />
      </div>
      <div>
        <label>Category:</label>
        <input
          type="text"
          name="category"
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>
      <button onClick={handleRecommendations}>Get Activities</button>
      {results.map((result, index) => (
        <div key={index}>
          <h1>{result.properties.name}</h1>
          <h3>{result.properties.address_line2}</h3>
          <hr />
        </div>
      ))}
    </div>
  );
}
