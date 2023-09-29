import { LogoutLink } from "./LogoutLink";

export function Header() {
  return (
    <header>
      <nav>
        <a href="#">Home</a> | <a href="#">My Trips</a> |{" "}
        <a href="#">New Trip</a> | <LogoutLink />
      </nav>
    </header>
  );
}
