import { Link } from "react-router-dom";
import { Header } from "./Header";
import axios from "axios";

export function TripsIndex(props) {
  const sortedTrips = [...props.trips].sort(
    (a, b) => new Date(a.start_time) - new Date(b.start_time)
  );

  const handleDestroyTrip = (trip) => {
    axios
      .delete(`http://localhost:3000/trips/${trip.id}.json`)
      .then(window.location.reload(true));
  };

  return (
    <div>
      <Header />
      <h1>My Trips</h1>
      {props.trips.length === 0 ? (
        <div>
          <h2>No current trips</h2>
          <Link to="/trips/new">Try creating a new trip!</Link>
        </div>
      ) : (
        sortedTrips.map((trip) => (
          <div key={trip.id}>
            <Link to={`/trips/${trip.id}`}>{trip.title}</Link>
            <br />
            <img width="400" height="300" src={trip.image_url} />
            <p>Arrive: {trip.start_time}</p>
            <p>Depart: {trip.end_time}</p>
            <Link to={`/trips/${trip.id}/edit`}>Edit Trip</Link>
            <br />
            <button onClick={() => handleDestroyTrip(trip)}>Cancel Trip</button>
            <hr />
          </div>
        ))
      )}
    </div>
  );
}
