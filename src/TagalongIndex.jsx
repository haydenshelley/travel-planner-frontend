import { Header } from "./Header";
import { Link } from "react-router-dom";

export function TagalongIndex(props) {
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div>
      <Header />
      <h1>You're Tagging Along On</h1>
      {props.tagalongTrips.map((tagalong) => (
        <div key={tagalong.id}>
          <Link to={`/tagalong/${tagalong.id}`}>{tagalong.trip.title}</Link>
          <br />
          <h2>
            Host:{" "}
            {
              props.allUsers.find((user) => user.id === tagalong.trip.user_id)
                .name
            }
          </h2>
          <img width="400" height="300" src={tagalong.trip.image_url} />
          <p>Arrive: {formatDate(tagalong.trip.start_time)}</p>
          <p>Depart: {formatDate(tagalong.trip.end_time)}</p>
        </div>
      ))}
    </div>
  );
}
