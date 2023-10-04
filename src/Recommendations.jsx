import { Header } from "./Header";
import { useState } from "react";
import axios from "axios";

export function Recommendations(props) {
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
  const [selectedTrip, setSelectedTrip] = useState("");
  const [showForm, setShowForm] = useState(false);
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
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleStartTimeChange = (e) => {
    setStartTime(e.target.value);
  };

  const handleEndTimeChange = (e) => {
    setEndTime(e.target.value);
  };

  const handleMoreResults = () => {
    setCurrentPage(currentPage + 1);
    setShowForm(false);
  };

  const handleRecommendations = () => {
    axios
      .get(
        `http://localhost:3000/places/recommendations.json?location=${location}&proximity=${proximity}&category=${category}`
      )
      .then((response) => {
        console.log(response.data);
        setSelectedTrip("");
        setShowForm(false);
        setResults(response.data.features);
        setCurrentPage(1);
        setResultsClicked(true);
        console.log(props.trips);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new FormData(e.target);
    props.onCreatePlace(params, () => e.target.reset());
    window.location.href = `/trips/${id}`;
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
      <div>
        <label>
          Within{" "}
          <select
            name="proximity"
            onChange={(e) => setProximity(e.target.value)}
          >
            <option value="">Select</option>
            <option value="1609">1</option>
            <option value="8046">5</option>
            <option value="16093">10</option>
            <option value="24140">15</option>
            <option value="32186">20</option>
          </select>{" "}
          mile(s)
        </label>
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
              <div>
                Add to{" "}
                <select
                  name="trip_id"
                  onChange={(e) => {
                    setSelectedTrip(e.target.value);
                    setShowForm(true);
                    console.log(e.target.value);
                  }}
                >
                  <option value="">Select a trip</option>
                  {props.trips.map((trip) => (
                    <option key={trip.id} value={trip.id}>
                      {trip.title}
                    </option>
                  ))}
                </select>
              </div>
              {selectedTrip && showForm ? (
                <div>
                  <form onSubmit={handleSubmit}>
                    <div>
                      <input
                        value={selectedTrip}
                        name="trip_id"
                        type="hidden"
                      />
                    </div>
                    <div>
                      Name:{" "}
                      <input
                        defaultValue={result.properties.name}
                        name="name"
                        type="text"
                      />
                    </div>
                    <div>
                      Address:{" "}
                      <input
                        defaultValue={result.properties.address_line2}
                        name="address"
                        type="text"
                      />
                    </div>
                    <div>
                      Description: <input name="description" type="text" />
                    </div>
                    <div>
                      Image URL: <input name="image_url" type="text" />
                    </div>
                    <div>
                      Start Time:{" "}
                      <input
                        name="start_time"
                        type="datetime-local"
                        onChange={handleStartTimeChange}
                      />
                    </div>
                    <div>
                      End Time:{" "}
                      <input
                        name="end_time"
                        type="datetime-local"
                        defaultValue={startTime}
                        onChange={handleEndTimeChange}
                      />
                    </div>
                    <button type="submit">Add Activity</button>
                  </form>
                </div>
              ) : null}
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
