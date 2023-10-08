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
    const formattedDate = new Date(dateString).toLocaleDateString(
      undefined,
      options
    );
    return formattedDate.replace(/\b(\w+)\b/g, (match) => match.toLowerCase());
  };
  const formatTime = (timeString) => {
    const parts = timeString.split(" ");
    const [hour, minute] = parts[0].split(":");
    const ampm = parts[1].toLowerCase();
    return `${parseInt(hour, 10)}:${minute} ${ampm}`;
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
      <h1>
        {host?.toLowerCase()}'s {trip.trip.title?.toLowerCase()} activities
      </h1>
      <h4>
        {formatDate(trip.trip.start_time)} - {formatDate(trip.trip.end_time)}
      </h4>
      <div className="card-container">
        {trip.places.map((place) => (
          <div className="card" style={{ width: "25rem" }} key={place.id}>
            <img
              className="card-img-top"
              src={place.image_url}
              alt="Trip Image"
            />
            <div className="card-body">
              <h3 className="card-text">{place.name?.toLowerCase()}</h3>
              <p className="card-text">{place.address?.toLowerCase()}</p>
              <p className="card-text">{place.date?.toLowerCase()}</p>
              <p className="card-text">
                {formatTime(place.start)} - {formatTime(place.end)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
