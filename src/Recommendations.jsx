import { Header } from "./Header";
import { useEffect, useState } from "react";
import axios from "axios";

export function Recommendations() {
  const [results, setResults] = useState([]);

  const handleRecommendations = () => {
    axios
      .get("http://localhost:3000/places/recommendations.json")
      .then((response) => {
        console.log(response.data);
        setResults(response.data.features);
      });
  };

  useEffect(handleRecommendations, []);

  return (
    <div>
      <Header />
      <h1>Recs</h1>
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
