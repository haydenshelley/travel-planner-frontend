import { Link } from "react-router-dom";

export function TripsIndex(props) {
  return (
    <div>
      <h1>My Trips</h1>
      <Link to="/trips/new">New Trip</Link>
      {props.trips.map((trip) => (
        <div key={trip.id}>
          <h2>{trip.title}</h2>
          <img width="400" height="300" src={trip.image_url} />
          <p>
            Dates: {trip.start_time} - {trip.end_time}
          </p>
          <h2>{trip.title} Activities</h2>
          {trip.places.map((place) => (
            <div key={place.id}>
              <h3>{place.name}</h3>
              <p>{place.address}</p>
              <img width="400" height="300" src={place.image_url} />
              <p>
                Dates: {place.start_time} - {place.end_time}
              </p>
              <p>Description: {place.description}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
