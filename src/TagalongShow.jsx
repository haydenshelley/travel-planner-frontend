import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "./Header";
import axios from "axios";

export function TagalongShow() {
  const { id } = useParams();
  const [trip, setTrip] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/tagalong/${id}.json`
        );
        setTrip(response.data);
      } catch (error) {
        console.error("Error fetching trip data:", error);
      }
    };

    fetchData();
  }, [id]);

  if (!trip) {
    return (
      <div>
        <Header />
        <p>Loading trip data...</p>
      </div>
    );
  }

  const handleTest = () => {
    console.log(trip);
  };

  return (
    <div>
      <Header />
      <button onClick={handleTest}>Test</button>
      <h1>{trip.trip.title} Activities</h1>
      <h4>
        {trip.trip.start_time} - {trip.trip.end_time}
      </h4>
      {trip.places.map((place) => (
        <div key={place.id}>
          <h3>{place.name}</h3>
          <p>{place.address}</p>
          <img width="400" height="300" src={place.image_url} />
          <p>Date: {place.start_time}</p>
          <p>Ends: {place.end_time}</p>
          <p>Description: {place.description}</p>
        </div>
      ))}
    </div>
  );
}
