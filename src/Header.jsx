import { LogoutLink } from "./LogoutLink";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <header>
      <nav>
        <Link to={"/trips"}>My Trips</Link> | |{" "}
        <Link to={"/trips/new"}>New Trip</Link> | | <LogoutLink />
      </nav>
    </header>
  );
}
