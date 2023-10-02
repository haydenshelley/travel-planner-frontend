import axios from "axios";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { Login } from "./Login";
import { Signup } from "./Signup";
import { LandingPage } from "./LandingPage";
import { TripsIndex } from "./TripsIndex";
import { TripsShow } from "./TripsShow";
import { TripsNew } from "./TripsNew";
import { PlacesNew } from "./PlacesNew";
import { PlacesEdit } from "./PlacesEdit";
import { TripsEdit } from "./TripsEdit";

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
        <Route path="/trips/:id" element={<TripsShow />} />
        <Route
          path="/trips/new"
          element={<TripsNew onCreateTrip={handleCreateTrip} />}
        />
        <Route path="/trips/:id/edit" element={<TripsEdit />} />
        <Route
          path="/trips/places/new"
          element={
            <PlacesNew onCreatePlace={handleCreatePlace} trips={trips} />
          }
        />
        <Route path="/trips/places/:id/edit" element={<PlacesEdit />} />
      </Routes>
    </div>
  );
}
