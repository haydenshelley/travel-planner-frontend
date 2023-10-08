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
      <h1>tagalongs</h1>
      <div className="card-container">
        {props.tagalongTrips?.map((tagalong) => (
          <div className="card" style={{ width: "25rem" }} key={tagalong.id}>
            <img
              src={tagalong.trip.image_url}
              className="card-img-top"
              alt="Trip Image"
            />
            <div className="card-body">
              <h5 className="card-title">
                <Link id="card-title" to={`/tagalong/${tagalong.id}`}>
                  {tagalong.trip.title}
                </Link>
              </h5>
              <p className="card-text">
                {formatDate(tagalong.trip.start_time)} -{" "}
                {formatDate(tagalong.trip.end_time)}
              </p>
              <h3 className="card-text">
                Host:{" "}
                {props.allUsers.find(
                  (user) => user.id === tagalong.trip.user_id
                )?.name || "Unknown"}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
