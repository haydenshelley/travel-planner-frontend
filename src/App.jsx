import { BrowserRouter } from "react-router-dom";
import { Content } from "./Content";
import { Footer } from "./Footer";

function App() {
  return (
    <div>
      <BrowserRouter basename="/">
        <div className="wrapper">
          <div className="main-content">
            <Content />
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
