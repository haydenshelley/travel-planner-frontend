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
  const [showForm, setShowForm] = useState(null);
  const categoryOptions = [
    ["catering.restaurant", "restuarant(all)"],
    ["catering.restaurant.burger", "restuarant(burger)"],
    ["catering.restaurant.pizza", "restuarant(pizza)"],
    ["catering.restaurant.sandwich", "restuarant(sandwich)"],
    ["catering.restaurant.mexican", "restuarant(mexican)"],
    ["catering.restaurant.asian", "restuarant(asian)"],
    ["catering.restaurant.american", "restuarant(american)"],
    ["catering.fast_food", "restuarant(fast food)"],
    ["catering.cafe.coffee_shop", "restuarant(cafe)"],
    ["catering.cafe.ice_cream", "restuarant(ice cream)"],
    ["entertainment.museum", "entertainment(museum)"],
    ["entertainment.aquarium", "entertainment(aquarium)"],
    ["entertainment.cinema", "entertainment(movie theater)"],
    ["entertainment.bowling_alley", "entertainment(bowling)"],
    ["pet.dog_park", "dog park"],
    ["tourism.attraction", "tourism sites"],
    ["production.brewery", "brewery"],
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
    setShowForm(null);
    setSelectedTrip("");
  };

  const handleRecommendations = () => {
    axios
      .get(
        `http://localhost:3000/places/recommendations.json?location=${location}&proximity=${proximity}&category=${category}`
      )
      .then((response) => {
        console.log(response.data);
        setSelectedTrip("");
        setShowForm(null);
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
      <div className="container-fluid">
        <div className="row justify-content-center align-items-start">
          <div className="col-md-6">
            <h1>recommendations</h1>
            <div className="form-group rec-form input-width">
              <label className="rec-label" htmlFor="location">
                location:
              </label>
              <input
                type="text"
                id="location"
                name="location"
                onChange={(e) => setLocation(e.target.value)}
                className="form-control rec-form-control"
              />
            </div>
            <div className="form-group rec-form input-width">
              <label className="rec-label" htmlFor="category">
                category:
              </label>
              <select
                className="form-select"
                id="category"
                name="category"
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">select a category</option>
                {categoryOptions.map((option, index) => (
                  <option key={index} value={option[0]}>
                    {option[1]}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group rec-form input-width">
              <label className="rec-label" htmlFor="proximity">
                within:
              </label>
              <select
                className="form-select"
                id="proximity"
                name="proximity"
                onChange={(e) => setProximity(e.target.value)}
              >
                <option value="">select a distance</option>
                <option value="1609">1 mile</option>
                <option value="8046">5 miles</option>
                <option value="16093">10 miles</option>
                <option value="24140">15 miles</option>
                <option value="32186">20 miles</option>
              </select>
            </div>
            <button
              className="btn custom-color"
              onClick={handleRecommendations}
            >
              get activities
            </button>
            <div className="recommendations-section">
              {resultsClicked && results.length === 0 ? (
                <div>
                  <p>no results. try another search!</p>
                </div>
              ) : (
                displayedResults.map((result, index) =>
                  result.properties.name ? (
                    <div key={index} className="activity-section">
                      <h1>{result.properties.name.toLowerCase()}</h1>
                      <h3>{result.properties.address_line2.toLowerCase()}</h3>
                      <div>
                        <select
                          className="form-select"
                          name="trip_id"
                          onChange={(e) => {
                            setSelectedTrip(e.target.value);
                            setShowForm(index);
                            console.log(index);
                          }}
                        >
                          <option value="">add to trip</option>
                          {props.trips.map((trip) => (
                            <option key={trip.id} value={trip.id}>
                              {trip.title.toLowerCase()}
                              {"("}
                              {trip.end_time.toLowerCase()}
                              {" - "}
                              {trip.start_time.toLowerCase()}
                              {")"}
                            </option>
                          ))}
                        </select>
                      </div>
                      {selectedTrip && showForm === index ? (
                        <div>
                          <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                              <label htmlFor="name" className="form-label">
                                name:
                              </label>
                              <input
                                defaultValue={result.properties.name}
                                name="name"
                                type="text"
                                className="form-control"
                                id="name"
                              />
                            </div>
                            <div className="mb-3">
                              <label htmlFor="address" className="form-label">
                                address:
                              </label>
                              <input
                                defaultValue={result.properties.address_line2}
                                name="address"
                                type="text"
                                className="form-control"
                                id="address"
                              />
                            </div>
                            <div className="mb-3">
                              <label
                                htmlFor="description"
                                className="form-label"
                              >
                                description:
                              </label>
                              <input
                                name="description"
                                type="text"
                                className="form-control"
                                id="description"
                              />
                            </div>
                            <div className="mb-3">
                              <label htmlFor="image_url" className="form-label">
                                image:
                              </label>
                              <input
                                name="image_url"
                                type="text"
                                className="form-control"
                                id="image_url"
                              />
                            </div>
                            <div className="mb-3">
                              <label
                                htmlFor="start_time"
                                className="form-label"
                              >
                                start time:
                              </label>
                              <input
                                name="start_time"
                                type="datetime-local"
                                className="form-control"
                                onChange={handleStartTimeChange}
                              />
                            </div>
                            <div className="mb-3">
                              <label htmlFor="end_time" className="form-label">
                                end time:
                              </label>
                              <input
                                name="end_time"
                                type="datetime-local"
                                defaultValue={startTime}
                                className="form-control"
                                onChange={handleEndTimeChange}
                              />
                            </div>
                            <div className="d-grid gap-2">
                              <button
                                type="submit"
                                className="btn custom-color"
                              >
                                add activity
                              </button>
                            </div>
                          </form>
                        </div>
                      ) : null}
                    </div>
                  ) : null
                )
              )}
              {results.length > endIndex && (
                <button
                  className="btn custom-color"
                  onClick={handleMoreResults}
                >
                  more recommendations
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
