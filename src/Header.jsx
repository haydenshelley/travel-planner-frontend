import axios from "axios";

export function Header() {
  const handleClick = (event) => {
    event.preventDefault();
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem("jwt");
    window.location.href = "/";
  };

  return (
    <header>
      <nav
        className="navbar navbar-expand-lg bg-dark border-bottom border-body"
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <a className="navbar-brand" href="/trips">
            My Trips
          </a>
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
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="/trips/new"
                >
                  New Trip
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/recommendations">
                  Recommendations
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/invitations">
                  Invitations
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/tagalong">
                  Tagalong
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" onClick={handleClick} href="#">
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
