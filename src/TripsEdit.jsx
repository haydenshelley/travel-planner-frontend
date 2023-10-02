import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export function TripsEdit() {
  const { id } = useParams();
  const [trip, setTrip] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:3000/trips/${id}.json`).then((response) => {
      setTrip(response.data);
    });
  }, [id]);

  const formatDateForInput = (date) => {
    const formattedDate = new Date(date).toISOString().slice(0, 16);
    return formattedDate;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.set("start_time", formatDateForInput(formData.get("start_time")));
    formData.set("end_time", formatDateForInput(formData.get("end_time")));
    axios
      .patch(`http://localhost:3000/trips/${id}.json`, formData)
      .then((window.location.href = "/trips"));
  };

  return (
    <div>
      <h1>Editing {trip.title}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          Title: <input defaultValue={trip.title} name="title" type="text" />
        </div>
        <div>
          Image URL:{" "}
          <input defaultValue={trip.image_url} name="image_url" type="text" />
        </div>
        <div>
          Start Date:{" "}
          <input
            defaultValue={formatDateForInput(trip.start_time)}
            name="start_time"
            type="datetime-local"
          />
        </div>
        <div>
          End Date:{" "}
          <input
            defaultValue={formatDateForInput(trip.end_time)}
            name="end_time"
            type="datetime-local"
          />
        </div>
        <button type="submit">Update Trip</button>
      </form>
    </div>
  );
}
