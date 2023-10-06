import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "./Header";
import axios from "axios";

export function TagalongShow(props) {
  const { id } = useParams();
  const [trip, setTrip] = useState(null);
  const [host, setHost] = useState(null);
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/tagalong/${id}.json`
        );
        setTrip(response.data);
        const hostId = response.data.trip.user_id;
        const hostName = props.allUsers.find((user) => user.id === hostId);
        setHost(hostName.name);
      } catch (error) {
        console.error("Error fetching trip data:", error);
      }
    };

    fetchData();
  }, [id, props.allUsers]);

  if (!trip) {
    return (
      <div>
        <Header />
        <p>Loading trip data...</p>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <h1>{trip.trip.title} Activities</h1>
      <h2>Host: {host}</h2>
      <h4>
        {formatDate(trip.trip.start_time)} - {formatDate(trip.trip.end_time)}
      </h4>
      {trip.places.map((place) => (
        <div key={place.id}>
          <h3>{place.name}</h3>
          <p>{place.address}</p>
          <img width="400" height="300" src={place.image_url} />
          <p>Date: {place.date}</p>
          <p>Starts: {place.start}</p>
          <p>Ends: {place.end}</p>
        </div>
      ))}
    </div>
  );
}
