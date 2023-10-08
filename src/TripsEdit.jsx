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
      <div
        id="edit-trip"
        className="container d-flex justify-content-center align-items-center vh-100"
      >
        <div className="card" style={{ width: "400px" }}>
          <div
            className="card-body"
            style={{ maxHeight: "800px", overflowY: "auto" }}
          >
            <h1 className="card-title text-center">
              editing {trip.title?.toLowerCase()}
            </h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  title:
                </label>
                <input
                  defaultValue={trip.title}
                  name="title"
                  type="text"
                  className="form-control"
                  id="title"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="image_url" className="form-label">
                  image:
                </label>
                <input
                  defaultValue={trip.image_url}
                  name="image_url"
                  type="text"
                  className="form-control"
                  id="image_url"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="start_time" className="form-label">
                  start date:
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
                  end date:
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
                  update trip
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
