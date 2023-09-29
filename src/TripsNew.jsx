export function TripsNew(props) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new FormData(e.target);
    props.onCreateTrip(params, () => e.target.reset());
  };
  return (
    <div>
      <h1>New Trip</h1>
      <form onSubmit={handleSubmit}>
        <div>
          Title: <input name="title" type="text" />
        </div>
        <div>
          Image URL: <input name="image_url" type="text" />
        </div>
        <div>
          Start Date: <input name="start_time" type="text" />
        </div>
        <div>
          End Date: <input name="end_time" type="text" />
        </div>
        <button type="submit">Create Trip</button>
      </form>
    </div>
  );
}
