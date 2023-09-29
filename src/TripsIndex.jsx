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
            <h2>{trip.title}</h2>
            <img width="400" height="300" src={trip.image_url} />
            <p>
              Dates: {trip.start_time} - {trip.end_time}
            </p>
            <h2>{trip.title} Activities</h2>
            <Link to="/trips/places/new">New Activity</Link>
            {trip.places.map((place) => (
              <div key={place.id}>
                <h3>{place.name}</h3>
                <p>{place.address}</p>
                <img width="400" height="300" src={place.image_url} />
                <p>Date: {place.date}</p>
                <p>Starts: {place.start_time}</p>
                <p>Ends: {place.end_time}</p>
                <p>Description: {place.description}</p>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
}
