import { BrowserRouter } from "react-router-dom";
import { Content } from "./Content";
import { Footer } from "./Footer";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Content />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
