import axios from "axios";
import { useState } from "react";
import { Header } from "./Header";

export function Invitations(props) {
  const currentUserId = props.userId;

  const handleAcceptInvitation = (invitation) => {
    const traveler = invitation.travelers.find(
      (traveler) => traveler.user_id === currentUserId
    );

    if (traveler) {
      const travelerId = traveler.id;

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
        });
    }
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
          <hr />
        </div>
      ))}
    </div>
  );
}
