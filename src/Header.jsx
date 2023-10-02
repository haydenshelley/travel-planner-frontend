import { LogoutLink } from "./LogoutLink";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <header>
      <nav>
        <Link to={"/trips"}>My Trips</Link> | |{" "}
        <Link to={"/trips/new"}>New Trip</Link> | |{" "}
        <Link to={"/trips/places/new"}>New Activity</Link> || <LogoutLink />
      </nav>
    </header>
  );
}
