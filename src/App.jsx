import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import SupersetDashboard from "./SupersetDashboard";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      
      <Route
        path="/carte"
        element={
          <SupersetDashboard
            openHexaUuid="5dd107f2-7f5c-4646-a2d0-9a7725bbe83a"
            supersetUuid="a90da6f3-f52d-4f0a-8f36-9eb1840fe388"
            supersetDomain="https://superset.bluesquare.org"
          />
        }
      />
      <Route path="*" element={<HomePage />} />
    </Routes>
  );
}
