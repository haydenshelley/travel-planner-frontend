import axios from "axios";
import { useState, useEffect } from "react";
import { Login } from "./Login";
import { Signup } from "./Signup";
import { TripsIndex } from "./TripsIndex";
import { TripsNew } from "./TripsNew";
import { PlacesNew } from "./PlacesNew";
import { Modal } from "./Modal";

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
      <h1>Vacation Planner</h1>
      <TripsIndex trips={trips} />
      <TripsNew onCreateTrip={handleCreateTrip} />
      <PlacesNew onCreatePlace={handleCreatePlace} />
      <Modal show={false}>
        <h1>TEST</h1>
      </Modal>
      <Signup />
      <Login />
    </div>
  );
}
