import { Link } from "react-router-dom";

export function LandingPage() {
  return (
    <div>
      <h1>Travel Planner</h1>
      <h3>Please sign up or log in to continue</h3>
      <Link to="/login">Login</Link> | <Link to="/signup">Signup</Link>
    </div>
  );
}
