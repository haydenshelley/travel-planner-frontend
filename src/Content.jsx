import axios from "axios";
import { Routes, Route, Navigate } from "react-router-dom";
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
  const jwt = localStorage.getItem("jwt");
  const [trips, setTrips] = useState([]);
  const [tagalongTrips, setTagalongTrips] = useState([]);
  const [invitations, setInvitations] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [user, setUser] = useState("");
  const [userId, setUserId] = useState("");

  const handleUsersIndex = () => {
    axios.get("http://localhost:3000/users.json").then((response) => {
      console.log(response.data);
      setAllUsers(response.data);
    });
  };

  const handleCurrentUser = () => {
    axios.get("http://localhost:3000/current.json").then((response) => {
      console.log(response.data);
      setUser(response.data.name);
      setUserId(response.data.id);
    });
  };

  const handleTripsIndex = () => {
    axios.get("http://localhost:3000/trips.json").then((response) => {
      setTrips(response.data);
    });
  };

  const handleInvitationsIndex = () => {
    axios.get("http://localhost:3000/invitations.json").then((response) => {
      setInvitations(response.data);
    });
  };

  const handleTagalongIndex = () => {
    axios.get("http://localhost:3000/tagalong.json").then((response) => {
      setTagalongTrips(response.data);
    });
  };

  const handleCreateTrip = (params, successCallback) => {
    axios.post("http://localhost:3000/trips.json", params).then((response) => {
      setTrips([...trips, response.data]);
      successCallback();
    });
  };

  const handleCreatePlace = (params, successCallback) => {
    axios.post("http://localhost:3000/places.json", params).then((response) => {
      successCallback();
      window.location.reload(true);
    });
  };

  useEffect(handleTripsIndex, []);
  useEffect(handleInvitationsIndex, []);
  useEffect(handleUsersIndex, []);
  useEffect(handleCurrentUser, []);
  useEffect(handleTagalongIndex, []);

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={jwt ? <Navigate to="/trips" /> : <LandingPage />}
        />
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
