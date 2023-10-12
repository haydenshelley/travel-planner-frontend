import { Header } from "./Header";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function TripsNew(props) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new FormData(e.target);
    props.onCreateTrip(params, () => e.target.reset());
    navigate("/trips");
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
            <h1 className="card-title text-center">new trip</h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  title:
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
                  image:
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
                  start date:
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
                  end date:
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
                <button type="submit" className="btn custom-color">
                  create trip
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
