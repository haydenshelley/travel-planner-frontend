import { Header } from "./Header";

export function PlacesNew(props) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new FormData(e.target);
    props.onCreatePlace(params, () => e.target.reset());
    window.location.href = "/trips";
  };

  return (
    <div>
      <Header />
      <h1>New Activity</h1>
      <form onSubmit={handleSubmit}>
        <div>
          Trip:
          <select name="trip_id">
            {props.trips.map((trip) => (
              <option key={trip.id} value={trip.id}>
                {trip.title}
              </option>
            ))}
          </select>
        </div>
        <div>
          Name: <input name="name" type="text" />
        </div>
        <div>
          Address: <input name="address" type="text" />
        </div>
        <div>
          Description: <input name="description" type="text" />
        </div>
        <div>
          Image URL: <input name="image_url" type="text" />
        </div>
        <div>
          Start Time: <input name="start_time" type="datetime-local" />
        </div>
        <div>
          End Time: <input name="end_time" type="datetime-local" />
        </div>
        <button type="submit">Create Activity</button>
      </form>
    </div>
  );
}
