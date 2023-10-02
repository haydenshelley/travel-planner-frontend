import { Link } from "react-router-dom";
import { Header } from "./Header";

export function TripsIndex(props) {
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
        props.trips.map((trip) => (
          <div key={trip.id}>
            <Link to={`/trips/${trip.id}`}>{trip.title}</Link>
            <br />
            <img width="400" height="300" src={trip.image_url} />
            <p>
              Dates: {trip.start_time} - {trip.end_time}
            </p>
            <hr />
          </div>
        ))
      )}
    </div>
  );
}
