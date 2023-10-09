import { Link } from "react-router-dom";

export function LandingPage() {
  return (
    <div className="landing-page">
      <div className="landing-page-objects">
        <h1 id="landing-page-title">waypoint</h1>
        <h4>welcome to your next adventure</h4>
        <h6>log in or register to begin</h6>
        <Link className="btn custom-color" to="/login">
          log in
        </Link>
        <Link className="btn custom-color" to="/signup">
          register
        </Link>
      </div>
    </div>
  );
}
