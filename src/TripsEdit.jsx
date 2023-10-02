import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Header } from "./Header";

export function TripsEdit() {
  const { id } = useParams();
  const [trip, setTrip] = useState({});
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:3000/trips/${id}.json`).then((response) => {
      setTrip(response.data);
      setStartTime(formatDateForInput(response.data.start_time));
      setEndTime(formatDateForInput(response.data.end_time));
    });
  }, [id]);

  const formatDateForInput = (date) => {
    const formattedDate = new Date(date).toISOString().slice(0, 16);
    return formattedDate;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    axios
      .patch(`http://localhost:3000/trips/${id}.json`, formData)
      .then((window.location.href = "/trips"));
  };

  return (
    <div>
      <Header />
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
            defaultValue={startTime}
            name="start_time"
            type="datetime-local"
          />
        </div>
        <div>
          End Date:{" "}
          <input defaultValue={endTime} name="end_time" type="datetime-local" />
        </div>
        <button type="submit">Update Trip</button>
      </form>
    </div>
  );
}
