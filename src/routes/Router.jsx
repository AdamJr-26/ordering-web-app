import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Welcome from "../pages/Welcome";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />}>
          {/* <Route path="home" element={<Home />} /> */}
        </Route>
        
        <Route path="/" element={<Welcome />}>
          {/* <Route path="/" element={<Welcome />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default Router;
