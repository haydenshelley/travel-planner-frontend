import axios from "axios";
import { Header } from "./Header";

export function Invitations(props) {
  const currentUserId = props.userId;

  const handleAcceptInvitation = (invitation) => {
    const traveler = invitation.travelers.filter(
      (traveler) =>
        traveler.user_id === currentUserId && traveler.accepted === false
    );
    const travelerId = traveler[0].id;
    console.log(travelerId);
    if (travelerId) {
      axios
        .patch(
          `http://localhost:3000/trips/${invitation.id}/travelers/${travelerId}.json`,
          {
            accepted: true,
          }
        )
        .then(() => {
          window.location.reload(true);
        })
        .catch((error) => {
          console.error("Error accepting invitation:", error);
          console.log(invitation.id);
          console.log(travelerId);
        });
    }
  };

  const handleDeclineInvitation = (invitation) => {
    const traveler = invitation.travelers.find(
      (traveler) => traveler.user_id === currentUserId && !traveler.accepted
    );
    const travelerId = traveler.id;
    console.log(travelerId);
    if (travelerId)
      axios
        .delete("http://localhost:3000/invitations/decline.json", {
          data: { traveler_id: travelerId },
        })
        .then(() => {
          window.location.reload(true);
        });
  };

  return (
    <div>
      <Header />
      <h1>Invitations</h1>
      {props.invitations.map((invitation) => (
        <div key={invitation.id}>
          <h1>{invitation.title}</h1>
          <h3>Invited by: {invitation.user_name}</h3>
          <p>Arrive: {invitation.start_time}</p>
          <p>Depart: {invitation.end_time}</p>
          <button onClick={() => handleAcceptInvitation(invitation)}>
            Accept
          </button>
          <button onClick={() => handleDeclineInvitation(invitation)}>
            Decline
          </button>
          <hr />
        </div>
      ))}
    </div>
  );
}
