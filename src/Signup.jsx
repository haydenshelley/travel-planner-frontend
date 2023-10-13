import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Signup() {
  const [errors, setErrors] = useState([]);
  const [isErrorVisible, setIsErrorVisible] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors([]);
    const params = new FormData(event.target);
    axios
      .post("/users.json", params)
      .then((response) => {
        event.target.reset();
        navigate("/trips");
        handleTripsIndex();
      })
      .catch((error) => {
        setErrors(error.response.data.errors);
        setIsErrorVisible(true);
      });
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div
      id="signup"
      className="container d-flex justify-content-center align-items-center vh-100"
    >
      <div className="card" style={{ width: "400px" }}>
        <div
          className="card-body"
          style={{ maxHeight: "800px", overflowY: "auto" }}
        >
          <h1 className="card-title text-center">signup</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                name:
              </label>
              <input
                name="name"
                type="text"
                className="form-control"
                id="name"
                required
              />
            </div>
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
            <div className="mb-3">
              <label htmlFor="password_confirmation" className="form-label">
                retype password:
              </label>
              <input
                name="password_confirmation"
                type="password"
                className="form-control"
                id="password_confirmation"
                required
              />
            </div>
            <div className="d-grid gap-2">
              <button type="submit" className="btn custom-color">
                signup
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
