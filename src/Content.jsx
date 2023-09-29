import axios from "axios";
import { useState, useEffect } from "react";
import { Login } from "./Login";
import { Signup } from "./Signup";
import { TripsIndex } from "./TripsIndex";

export function Content() {
  const [trips, setTrips] = useState([]);

  const handleTripsIndex = () => {
    console.log("handleTripsIndex");
    axios.get("http://localhost:3000/trips.json").then((response) => {
      console.log(response.data);
      setTrips(response.data);
    });
  };

  useEffect(handleTripsIndex, []);

  return (
    <div>
      <h1>Vacation Planner</h1>
      <TripsIndex trips={trips} />
      <Signup />
      <Login />
    </div>
  );
}
