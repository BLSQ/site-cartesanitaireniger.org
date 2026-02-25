import { Routes, Route } from "react-router-dom";
import ReportDownloadPage from "./ReportDownloadPage";
import HomePage from "./HomePage";
import HomePageNew from "./HomePageNew";
import SupersetDashboard from "./SupersetDashboard";
import { usePlausibleHashTracking } from "./Plausible";

export default function App() {
  usePlausibleHashTracking()
  return (
    <Routes>
       <Route path="/new" element={<HomePageNew />} />
      <Route path="/" element={<HomePage />} />
       <Route path="/reports" element={<ReportDownloadPage />} />
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
