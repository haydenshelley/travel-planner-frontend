import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "./Header";
import { Link } from "react-router-dom";
import axios from "axios";

export function TripsShow() {
  const { id } = useParams();
  const [trip, setTrip] = useState({});
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/trips/${id}.json`)
      .then((response) => response.json())
      .then((data) => {
        setTrip(data);
        const sortedPlaces = [...data.places].sort((a, b) => {
          const dateCompare = new Date(a.date) - new Date(b.date);
          if (dateCompare === 0) {
            return new Date(a.start_time) - new Date(b.start_time);
          }
          return dateCompare;
        });
        setPlaces(sortedPlaces);
      })
      .catch((error) => console.error("Error fetching trip:", error));
  }, [id]);

  const handleDestroyPlace = (place) => {
    axios
      .delete(`http://localhost:3000/places/${place.id}.json`)
      .then(window.location.reload(true));
  };

  return (
    <div>
      <Header />
      <h1>{trip.title} Activities</h1>
      <h4>
        {trip.start_time} - {trip.end_time}
      </h4>
      <Link to={`/trips/${id}/places/new`}>Add Activity</Link>
      {places.map((place) => (
        <div key={place.id}>
          <h3>{place.name}</h3>
          <p>{place.address}</p>
          <img width="400" height="300" src={place.image_url} />
          <p>Date: {place.date}</p>
          <p>Starts: {place.start}</p>
          <p>Ends: {place.end}</p>
          <p>Description: {place.description}</p>
          <Link to={`/trips/places/${place.id}/edit`}>Edit Activity</Link>
          <br />
          <button onClick={() => handleDestroyPlace(place)}>
            Cancel Activity
          </button>
        </div>
      ))}
    </div>
  );
}
