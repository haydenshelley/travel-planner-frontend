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

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      undefined,
      options
    );
    return formattedDate.replace(
      /(\s|^)([A-Z])/g,
      (match, space, letter) => space + letter.toLowerCase()
    );
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
      <h1>invitations</h1>
      <div className="card-container">
        {props.invitations.map((invitation) => (
          <div className="card" style={{ width: "25rem" }} key={invitation.id}>
            <img
              src={invitation.image_url}
              className="card-img-top"
              alt="Trip Image"
            />
            <div className="card-body">
              <h1 className="card-title">{invitation.title?.toLowerCase()}</h1>
              <p className="card-text">
                {formatDate(invitation.start_time)} -{" "}
                {formatDate(invitation.end_time)}
              </p>
              <h3 className="card-text">
                host: {invitation.user_name.toLowerCase()}
              </h3>
              <button
                className="btn custom-color"
                onClick={() => handleAcceptInvitation(invitation)}
              >
                accept
              </button>
              <button
                className="btn custom-color"
                onClick={() => handleDeclineInvitation(invitation)}
              >
                decline
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
