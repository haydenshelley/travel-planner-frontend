import axios from "axios";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { Login } from "./Login";
import { Signup } from "./Signup";
import { LandingPage } from "./LandingPage";
import { TripsIndex } from "./TripsIndex";
import { TripsNew } from "./TripsNew";
import { PlacesNew } from "./PlacesNew";

export function Content() {
  const [trips, setTrips] = useState([]);

  const handleTripsIndex = () => {
    console.log("handleTripsIndex");
    axios.get("http://localhost:3000/trips.json").then((response) => {
      console.log(response.data);
      setTrips(response.data);
    });
  };

  const handleCreateTrip = (params, successCallback) => {
    console.log("handleCreateTrip", params);
    axios.post("http://localhost:3000/trips.json", params).then((response) => {
      setTrips([...trips, response.data]);
      successCallback();
    });
  };

  const handleCreatePlace = (params, successCallback) => {
    console.log("handleCreatePlace", params);
    axios.post("http://localhost:3000/places.json", params).then((response) => {
      successCallback();
      window.location.reload(true);
    });
  };

  useEffect(handleTripsIndex, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/trips" element={<TripsIndex trips={trips} />} />
        <Route
          path="/trips/new"
          element={<TripsNew onCreateTrip={handleCreateTrip} />}
        />
        <Route
          path="/trips/places/new"
          element={
            <PlacesNew onCreatePlace={handleCreatePlace} trips={trips} />
          }
        />
      </Routes>
    </div>
  );
}
