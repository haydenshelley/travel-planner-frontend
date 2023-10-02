import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Header } from "./Header";

export function PlacesEdit() {
  const { id } = useParams();
  const [place, setPlace] = useState({});
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:3000/places/${id}.json`).then((response) => {
      setPlace(response.data);
      console.log(place);
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
      .patch(`http://localhost:3000/places/${id}.json`, formData)
      .then(window.location.reload(true));
  };

  return (
    <div>
      <Header />
      <h1>Editing Activity{place.title}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          Name: <input defaultValue={place.name} name="name" type="text" />
        </div>
        <div>
          Address:{" "}
          <input defaultValue={place.address} name="address" type="text" />
        </div>
        <div>
          Description:{" "}
          <input
            defaultValue={place.description}
            name="description"
            type="text"
          />
        </div>
        <div>
          Image URL:{" "}
          <input defaultValue={place.image_url} name="image_url" type="text" />
        </div>
        <div>
          Start Time:{" "}
          <input
            defaultValue={startTime}
            name="start_time"
            type="datetime-local"
          />
        </div>
        <div>
          End Time:{" "}
          <input defaultValue={endTime} name="end_time" type="datetime-local" />
        </div>
        <button type="submit">Update Activity</button>
      </form>
      <Link to={`/trips/${place.trip_id}`}>Back to Trip</Link>
    </div>
  );
}
