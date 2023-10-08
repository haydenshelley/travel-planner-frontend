import { Header } from "./Header";
import { useState } from "react";

export function TripsNew(props) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new FormData(e.target);
    props.onCreateTrip(params, () => e.target.reset());
    window.location.href = "/trips";
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  return (
    <div>
      <Header />
      <div
        id="new-trip"
        className="container d-flex justify-content-center align-items-center vh-100"
      >
        <div className="card" style={{ width: "400px" }}>
          <div
            className="card-body"
            style={{ maxHeight: "800px", overflowY: "auto" }}
          >
            <h1 className="card-title text-center">New Trip</h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Title:
                </label>
                <input
                  name="title"
                  type="text"
                  className="form-control"
                  id="title"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="image_url" className="form-label">
                  Image URL:
                </label>
                <input
                  name="image_url"
                  type="text"
                  className="form-control"
                  id="image_url"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="start_time" className="form-label">
                  Start Date:
                </label>
                <input
                  name="start_time"
                  type="datetime-local"
                  className="form-control"
                  onChange={handleStartDateChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="end_time" className="form-label">
                  End Date:
                </label>
                <input
                  name="end_time"
                  type="datetime-local"
                  defaultValue={startDate}
                  className="form-control"
                  onChange={handleEndDateChange}
                  required
                />
              </div>
              <div className="d-grid gap-2">
                <button type="submit" className="btn btn-primary">
                  Create Trip
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
