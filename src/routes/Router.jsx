import { BrowserRouter, Routes, Route } from "react-router-dom";
import RouteProtection from "../hooks/RouteProtection";
import Welcome from "../pages/Welcome";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<RouteProtection />}>
          <Route path=":id" element={<RouteProtection />} />
        </Route>

        <Route path="/" element={<Welcome />}>
          <Route path=":id" element={<Welcome />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default Router;
