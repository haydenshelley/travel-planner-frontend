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
      <h1>New Trip</h1>
      <form onSubmit={handleSubmit}>
        <div>
          Title: <input name="title" type="text" />
        </div>
        <div>
          Image URL: <input name="image_url" type="text" />
        </div>
        <div>
          Start Date:{" "}
          <input
            name="start_time"
            type="datetime-local"
            onChange={handleStartDateChange}
          />
        </div>
        <div>
          End Date:{" "}
          <input
            name="end_time"
            type="datetime-local"
            defaultValue={startDate}
            onChange={handleEndDateChange}
          />
        </div>
        <button type="submit">Create Trip</button>
      </form>
    </div>
  );
}
