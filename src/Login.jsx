import axios from "axios";
import { useState } from "react";

const jwt = localStorage.getItem("jwt");
if (jwt) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
}

export function Login() {
  const [errors, setErrors] = useState([]);
  const [isErrorVisible, setIsErrorVisible] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors([]);
    const params = new FormData(event.target);
    axios
      .post("http://localhost:3000/sessions.json", params)
      .then((response) => {
        axios.defaults.headers.common["Authorization"] =
          "Bearer " + response.data.jwt;
        localStorage.setItem("jwt", response.data.jwt);
        event.target.reset();
        window.location.href = "/trips";
      })
      .catch((error) => {
        setErrors(["Invalid email or password"]);
        setIsErrorVisible(true);
      });
  };

  const handleCancel = () => {
    window.location.href = "/";
  };

  return (
    <div id="login">
      <div className="card" style={{ width: "400px" }}>
        <div
          className="card-body"
          style={{ maxHeight: "800px", overflowY: "auto" }}
        >
          <h1 className="card-title text-center">log in</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                email:
              </label>
              <input
                name="email"
                type="email"
                className="form-control"
                id="email"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                password:
              </label>
              <input
                name="password"
                type="password"
                className="form-control"
                id="password"
                required
              />
            </div>
            <div className="d-grid gap-2">
              <button type="submit" className="btn custom-color">
                log in
              </button>
              <button
                type="button"
                className="btn custom-color"
                onClick={handleCancel}
              >
                cancel
              </button>
            </div>
          </form>
          {isErrorVisible && (
            <div className="mt-3 alert alert-danger">
              <h5>error:</h5>
              <ul>
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
