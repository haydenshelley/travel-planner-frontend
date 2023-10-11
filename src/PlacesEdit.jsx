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
      <div
        id="edit-activity"
        className="container d-flex flex-column justify-content-center align-items-center vh-100"
      >
        <div className="card" style={{ width: "400px" }}>
          <div
            className="card-body"
            style={{ maxHeight: "800px", overflowY: "auto" }}
          >
            <h1 className="card-title text-center">editing {place.name}</h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  name:
                </label>
                <input
                  defaultValue={place.name}
                  name="name"
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="address" className="form-label">
                  address:
                </label>
                <input
                  defaultValue={place.address}
                  name="address"
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  description:
                </label>
                <input
                  defaultValue={place.description}
                  name="description"
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="image_url" className="form-label">
                  image:
                </label>
                <input
                  defaultValue={place.image_url}
                  name="image_url"
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="start_time" className="form-label">
                  start time:
                </label>
                <input
                  defaultValue={startTime}
                  name="start_time"
                  type="datetime-local"
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="end_time" className="form-label">
                  end time:
                </label>
                <input
                  defaultValue={endTime}
                  name="end_time"
                  type="datetime-local"
                  className="form-control"
                />
              </div>
              <div className="d-grid gap-2">
                <button type="submit" className="btn custom-color">
                  update activity
                </button>
              </div>
            </form>
          </div>
        </div>
        <Link to={`/trips/${place.trip_id}`} className="btn custom-color mt-3">
          back to trip
        </Link>
      </div>
    </div>
  );
}
