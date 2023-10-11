import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "./Header";
import { Link } from "react-router-dom";
import axios from "axios";

export function TripsShow() {
  const { id } = useParams();
  const [trip, setTrip] = useState({});
  const [places, setPlaces] = useState([]);

  const formatTime = (timeString) => {
    const parts = timeString.split(" ");
    const [hour, minute] = parts[0].split(":");
    const ampm = parts[1];
    return `${parseInt(hour, 10)}:${minute} ${ampm}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/trips/${id}.json`);
        const data = response.data;

        setTrip(data);

        const sortedPlaces = [...data.places].sort((a, b) => {
          const dateCompare = new Date(a.date) - new Date(b.date);
          if (dateCompare === 0) {
            return new Date(a.start_time) - new Date(b.start_time);
          }
          return dateCompare;
        });

        setPlaces(sortedPlaces);
      } catch (error) {
        console.error("Error fetching trip:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleDestroyPlace = (place) => {
    axios.delete(`/places/${place.id}.json`).then(window.location.reload(true));
  };

  return (
    <div>
      <Header />
      <h1>{trip.title} activities</h1>
      <h4>
        {trip.start_time} - {trip.end_time}
      </h4>
      <Link className="btn custom-color" to={`/trips/${id}/places/new`}>
        new activity
      </Link>
      <div className="card-container">
        {places.map((place) => (
          <div className="card" style={{ width: "25rem" }} key={place.id}>
            <img
              src={place.image_url}
              className="card-img-top"
              alt="trip image"
            />
            <div className="card-body">
              <h2 className="card-title">{place.name}</h2>
              <p className="card-text">{place.address}</p>
              <p className="card-text">{place.date}</p>
              <p className="card-text">
                {formatTime(place.start)} - {formatTime(place.end)}
              </p>
              <p className="card-text">{place.description}</p>
              <Link
                className="btn custom-color"
                to={`/trips/places/${place.id}/edit`}
              >
                edit activity
              </Link>
              <button
                className="btn custom-color"
                onClick={() => handleDestroyPlace(place)}
              >
                cancel activity
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
