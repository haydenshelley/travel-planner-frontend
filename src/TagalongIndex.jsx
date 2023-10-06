import { Header } from "./Header";

export function TagalongIndex(props) {
  return (
    <div>
      <Header />
      <h1>Your Accepted Trips</h1>
      {props.tagalongTrips.map((tagalong) => (
        <div key={tagalong.id}>
          <h2>{tagalong.trip.title}</h2>
          <img width="400" height="300" src={tagalong.trip.image_url} />
          <p>Arrive: {tagalong.trip.start_time}</p>
          <p>Depart: {tagalong.trip.end_time}</p>
        </div>
      ))}
    </div>
  );
}
