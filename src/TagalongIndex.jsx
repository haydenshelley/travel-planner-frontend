import { Header } from "./Header";
import { Link } from "react-router-dom";

export function TagalongIndex(props) {
  return (
    <div>
      <Header />
      <h1>You're Tagging Along On</h1>
      {props.tagalongTrips.map((tagalong) => (
        <div key={tagalong.id}>
          <Link to={`/tagalong/${tagalong.id}`}>{tagalong.trip.title}</Link>
          <br />
          <img width="400" height="300" src={tagalong.trip.image_url} />
          <p>Arrive: {tagalong.trip.start_time}</p>
          <p>Depart: {tagalong.trip.end_time}</p>
        </div>
      ))}
    </div>
  );
}
