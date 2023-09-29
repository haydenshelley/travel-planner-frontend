export function PlacesNew(props) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new FormData(e.target);
    props.onCreatePlace(params, () => e.target.reset());
    window.location.href = "/trips";
  };
  return (
    <div>
      <h1>New Place</h1>
      <form onSubmit={handleSubmit}>
        <div>
          Trip: <input name="trip_id" type="text" />
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
          Start Time: <input name="start_time" type="date" />
        </div>
        <div>
          End Time: <input name="end_time" type="date" />
        </div>
        <button type="submit">Create place</button>
      </form>
    </div>
  );
}
