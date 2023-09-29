import { LogoutLink } from "./LogoutLink";

export function Header() {
  return (
    <header>
      <nav>
        <a href="/trips">My Trips</a> | <a href="/trips/new">New Trip</a> |{" "}
        <LogoutLink />
      </nav>
    </header>
  );
}
