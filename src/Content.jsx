import axios from "axios";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { Login } from "./Login";
import { Signup } from "./Signup";
import { LandingPage } from "./LandingPage";
import { TripsIndex } from "./TripsIndex";
import { TripsShow } from "./TripsShow";
import { TripsNew } from "./TripsNew";
import { PlacesNew } from "./PlacesNew";
import { PlacesEdit } from "./PlacesEdit";
import { TripsEdit } from "./TripsEdit";
import { Recommendations } from "./Recommendations";
import { Invitations } from "./Invitations";
import { TagalongIndex } from "./TagalongIndex";
import { TagalongShow } from "./TagalongShow";

export function Content() {
  const [trips, setTrips] = useState([]);
  const [tagalongTrips, setTagalongTrips] = useState([]);
  const [invitations, setInvitations] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [user, setUser] = useState("");
  const [userId, setUserId] = useState("");

  const handleUsersIndex = () => {
    console.log("handleUsersIndex");
    axios.get("http://localhost:3000/users.json").then((response) => {
      console.log(response.data);
      setAllUsers(response.data);
    });
  };

  const handleTripsIndex = () => {
    console.log("handleTripsIndex");
    axios.get("http://localhost:3000/trips.json").then((response) => {
      console.log(response.data);
      setTrips(response.data);
      setUser(response.data[0].user.name);
      setUserId(response.data[0].user.id);
    });
  };

  const handleInvitationsIndex = () => {
    console.log("handleInvitationsIndex");
    axios.get("http://localhost:3000/invitations.json").then((response) => {
      console.log(response.data);
      setInvitations(response.data);
    });
  };

  const handleTagalongIndex = () => {
    console.log("handleTagalongIndex");
    axios.get("http://localhost:3000/tagalong.json").then((response) => {
      console.log(response.data);
      setTagalongTrips(response.data);
    });
  };

  const handleCreateTrip = (params, successCallback) => {
    console.log("handleCreateTrip", params);
    axios.post("http://localhost:3000/trips.json", params).then((response) => {
      setTrips([...trips, response.data]);
      successCallback();
    });
  };

  const handleCreatePlace = (params, successCallback) => {
    console.log("handleCreatePlace", params);
    axios.post("http://localhost:3000/places.json", params).then((response) => {
      successCallback();
      window.location.reload(true);
    });
  };

  useEffect(handleTripsIndex, []);
  useEffect(handleInvitationsIndex, []);
  useEffect(handleUsersIndex, []);
  useEffect(handleTagalongIndex, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/trips"
          element={<TripsIndex trips={trips} user={user} allUsers={allUsers} />}
        />
        <Route path="/trips/:id" element={<TripsShow />} />
        <Route
          path="/trips/new"
          element={<TripsNew onCreateTrip={handleCreateTrip} />}
        />
        <Route path="/trips/:id/edit" element={<TripsEdit />} />
        <Route
          path="/trips/:id/places/new"
          element={
            <PlacesNew onCreatePlace={handleCreatePlace} trips={trips} />
          }
        />
        <Route path="/trips/places/:id/edit" element={<PlacesEdit />} />
        <Route
          path="/recommendations"
          element={
            <Recommendations trips={trips} onCreatePlace={handleCreatePlace} />
          }
        />
        <Route
          path="/invitations"
          element={<Invitations invitations={invitations} userId={userId} />}
        />
        <Route
          path="/tagalong"
          element={
            <TagalongIndex tagalongTrips={tagalongTrips} allUsers={allUsers} />
          }
        />
        <Route
          path="/tagalong/:id"
          element={<TagalongShow allUsers={allUsers} />}
        />
      </Routes>
    </div>
  );
}
