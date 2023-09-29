import { Login } from "./Login";
import { Signup } from "./Signup";

export function Content() {
  return (
    <div>
      <h1>Vacation Planner</h1>
      <Signup />
      <Login />
    </div>
  );
}
