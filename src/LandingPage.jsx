import { Link } from "react-router-dom";

export function LandingPage() {
  return (
    <div class="landingPage">
      <h1>waypoint</h1>
      <h3>sign up or log in to begin</h3>
      <Link to="/login">Login</Link>
      <Link to="/signup">Signup</Link>
    </div>
  );
}
