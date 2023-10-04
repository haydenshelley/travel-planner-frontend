import { Header } from "./Header";
import { useState } from "react";
import axios from "axios";

export function Recommendations() {
  const [results, setResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 5;
  const startIndex = (currentPage - 1) * resultsPerPage;
  const endIndex = startIndex + resultsPerPage;
  const displayedResults = results.slice(startIndex, endIndex);
  const [resultsClicked, setResultsClicked] = useState(false);
  const [location, setLocation] = useState("");
  const [proximity, setProximity] = useState("");
  const [category, setCategory] = useState("");
  const categoryOptions = [
    ["catering.restaurant", "Restuarant(All)"],
    ["catering.restaurant.burger", "Restuarant(Burger)"],
    ["catering.restaurant.pizza", "Restuarant(Pizza)"],
    ["catering.restaurant.sandwich", "Restuarant(Sandwich)"],
    ["catering.restaurant.mexican", "Restuarant(Mexican)"],
    ["catering.restaurant.asian", "Restuarant(Asian)"],
    ["catering.restaurant.american", "Restuarant(American)"],
    ["catering.fast_food", "Restuarant(Fast Food)"],
    ["catering.cafe.coffee_shop", "Restuarant(Cafe)"],
    ["catering.cafe.ice_cream", "Restuarant(Ice Cream)"],
    ["entertainment.museum", "Entertainment(Museum)"],
    ["entertainment.aquarium", "Entertainment(Aquarium)"],
    ["entertainment.cinema", "Entertainment(Movie Theater)"],
    ["entertainment.bowling_alley", "Entertainment(Bowling)"],
    ["pet.dog_park", "Dog Park"],
    ["tourism.attraction", "Tourism Sites"],
    ["production.brewery", "Brewery"],
  ];

  const handleMoreResults = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleRecommendations = () => {
    axios
      .get(
        `http://localhost:3000/places/recommendations.json?location=${location}&proximity=${proximity}&category=${category}`
      )
      .then((response) => {
        console.log(response.data);
        setResults(response.data.features);
        setCurrentPage(1);
        setResultsClicked(true);
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
        <select name="category" onChange={(e) => setCategory(e.target.value)}>
          <option value="">Select a category</option>
          {categoryOptions.map((option, index) => (
            <option key={index} value={option[0]}>
              {option[1]}
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleRecommendations}>Get Activities</button>
      {resultsClicked && results.length === 0 ? (
        <div>
          <p>No results. Try another search!</p>
        </div>
      ) : (
        displayedResults.map((result, index) =>
          result.properties.name ? (
            <div key={index}>
              <h1>{result.properties.name}</h1>
              <h3>{result.properties.address_line2}</h3>
              <hr />
            </div>
          ) : null
        )
      )}
      {results.length > endIndex && (
        <button onClick={handleMoreResults}>More Recommendations</button>
      )}
    </div>
  );
}
