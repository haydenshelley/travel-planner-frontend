import { Link } from "react-router-dom";
import { Header } from "./Header";
import axios from "axios";
import { useState } from "react";

export function TripsIndex(props) {
  const sortedTrips = [...props.trips].sort(
    (a, b) => new Date(a.start_time) - new Date(b.start_time)
  );
  const [selectedFriendId, setSelectedFriendId] = useState("");
  const [selectedTripId, setSelectedTripId] = useState("");
  const [friendInvited, setFriendInvited] = useState(false);

  const handleDestroyTrip = (trip) => {
    axios
      .delete(`http://localhost:3000/trips/${trip.id}.json`)
      .then(window.location.reload(true));
  };

  const handleInviteFriend = () => {
    axios
      .post(`http://localhost:3000/trips/${selectedTripId}/travelers.json`, {
        user_id: selectedFriendId,
      })
      .then((response) => {
        console.log("Friend invited:", response.data);
        setSelectedFriendId("");
        setFriendInvited(true);
      })
      .catch((error) => {
        console.error("Error inviting friend:", error);
      });
  };

  let divContent = null;
  if (friendInvited) {
    divContent = <p>Friend Invited!</p>;
  }

  return (
    <div>
      <Header />
      {props.trips.length === 0 ? (
        <div>
          <h1>No current trips</h1>
          <Link to="/trips/new">Try creating a new trip!</Link>
        </div>
      ) : (
        <div>
          <h1>{props.trips[0].user.name}'s Trips</h1>
          {sortedTrips.map((trip) => (
            <div key={trip.id}>
              <Link to={`/trips/${trip.id}`}>{trip.title}</Link>
              <br />
              <img width="400" height="300" src={trip.image_url} />
              <p>Arrive: {trip.start_time}</p>
              <p>Depart: {trip.end_time}</p>
              <div>
                <label>Invite Friends:</label>
                <select
                  onChange={(e) => {
                    setSelectedFriendId(e.target.value);
                    setSelectedTripId(trip.id);
                    console.log("Selected Friend ID:", e.target.value);
                    console.log("Current Trip ID:", trip.id);
                  }}
                  value={selectedFriendId}
                >
                  <option value="">Select a friend</option>
                  {props.allUsers.map((user, index) => (
                    <option key={index} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </select>
                <button onClick={() => handleInviteFriend()}>
                  Invite Friend
                </button>
                <div>{divContent}</div>
              </div>
              <Link to={`/trips/${trip.id}/edit`}>Edit Trip</Link>
              <br />
              <button onClick={() => handleDestroyTrip(trip)}>
                Cancel Trip
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
