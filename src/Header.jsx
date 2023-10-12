import axios from "axios";
import { Link } from "react-router-dom";

export function Header() {
  const handleClick = (event) => {
    event.preventDefault();
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem("jwt");
    window.location.href = "/";
  };

  <Link className="btn custom-color" to="/signup">
    register
  </Link>;

  return (
    <header>
      <nav className="navbar navbar-expand-lg border-bottom border-body">
        <div className="container-fluid">
          <Link id="navbar-logo" className="navbar-brand" to="/trips">
            waypoint
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/trips">
                  my trips
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/trips/new">
                  new trip
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/recommendations">
                  recommendations
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/invitations">
                  invitations
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/tagalong">
                  tagalongs
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" onClick={handleClick} to="#">
                  logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
