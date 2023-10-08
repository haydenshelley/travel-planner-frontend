import { Header } from "./Header";
import { useState } from "react";
import { useParams } from "react-router-dom";

export function PlacesNew(props) {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const { id } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new FormData(e.target);
    props.onCreatePlace(params, () => e.target.reset());
    window.location.href = `/trips/${id}`;
  };

  const handleStartTimeChange = (e) => {
    setStartTime(e.target.value);
  };

  const handleEndTimeChange = (e) => {
    setEndTime(e.target.value);
  };

  return (
    <div>
      <Header />
      <div
        id="new-activity"
        className="container d-flex justify-content-center align-items-center vh-100"
      >
        <div className="card" style={{ width: "400px" }}>
          <div
            className="card-body"
            style={{ maxHeight: "800px", overflowY: "auto" }}
          >
            <h1 className="card-title text-center">New Activity</h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="trip_id" className="form-label">
                  Trip:
                </label>
                <select
                  name="trip_id"
                  defaultValue={id}
                  className="form-select"
                >
                  {props.trips.map((trip) => (
                    <option key={trip.id} value={trip.id}>
                      {trip.title}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name:
                </label>
                <input name="name" type="text" className="form-control" />
              </div>
              <div className="mb-3">
                <label htmlFor="address" className="form-label">
                  Address:
                </label>
                <input name="address" type="text" className="form-control" />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description:
                </label>
                <input
                  name="description"
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="image_url" className="form-label">
                  Image URL:
                </label>
                <input name="image_url" type="text" className="form-control" />
              </div>
              <div className="mb-3">
                <label htmlFor="start_time" className="form-label">
                  Start Time:
                </label>
                <input
                  name="start_time"
                  type="datetime-local"
                  className="form-control"
                  onChange={handleStartTimeChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="end_time" className="form-label">
                  End Time:
                </label>
                <input
                  name="end_time"
                  type="datetime-local"
                  defaultValue={startTime}
                  className="form-control"
                  onChange={handleEndTimeChange}
                />
              </div>
              <div className="d-grid gap-2">
                <button type="submit" className="btn custom-color">
                  Create Activity
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
