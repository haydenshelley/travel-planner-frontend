import { BrowserRouter } from "react-router-dom";
import { Content } from "./Content";
import { Footer } from "./Footer";
import { MyErrorBoundary } from "./MyErrorBoundary";

function App() {
  return (
    <div>
      <BrowserRouter basename="/">
        <div className="wrapper">
          <div className="main-content">
            <MyErrorBoundary>
              <Content />
            </MyErrorBoundary>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
