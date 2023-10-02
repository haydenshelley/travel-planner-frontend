import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "./Header";

export function TripsShow() {
  const { id } = useParams();
  const [trip, setTrip] = useState({});
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/trips/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setTrip(data);
        setPlaces(data.places);
      })
      .catch((error) => console.error("Error fetching trip:", error));
  }, [id]);

  return (
    <div>
      <Header />
      <h1>{trip.title} Activities</h1>
      {places.map((place) => (
        <div key={place.id}>
          <h3>{place.name}</h3>
          <p>{place.address}</p>
          <img width="400" height="300" src={place.image_url} />
          <p>Date: {place.date}</p>
          <p>Starts: {place.start_time}</p>
          <p>Ends: {place.end_time}</p>
          <p>Description: {place.description}</p>
        </div>
      ))}
    </div>
  );
}
