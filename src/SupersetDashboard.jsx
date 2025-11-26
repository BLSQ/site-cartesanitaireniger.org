import { useEffect, useRef, useState } from "react";
import { embedDashboard } from "@superset-ui/embedded-sdk";
export default function SupersetDashboard({
  openHexaUuid,
  supersetUuid,
  supersetDomain,
}) {
  const [loading, setLoading] = useState(true);

  const containerRef = useRef(null);

  useEffect(() => {
    const loadSdk = async () => {
      const response = await fetch(
        `https://exhibit.bluesquare.org/api/superset/dashboard/${openHexaUuid}/guesttoken`
      );
      const data = await response.json();
      const token = data.guestToken;

      embedDashboard({
        id: supersetUuid,
        supersetDomain: supersetDomain,
        mountPoint: containerRef.current,
        fetchGuestToken: () => token,
        dashboardUiConfig: {
          hideTitle: true,
          filters: { expanded: true },
        },
        iframeSandboxExtras: [
          "allow-top-navigation",
          "allow-popups-to-escape-sandbox",
          "allow-scripts",
        ],
      });
      setTimeout(() => setLoading(false), 2000); // 200ms delay
    };

    loadSdk();
  }, []);

  return (
    <div>
      {loading && (
        <div className="flex items-center justify-center min-h-[100vh]">
          <img src="superset-loading.gif" alt="loading" className="h-8" />
        </div>
      )}
      <div
        id="container"
        ref={containerRef}
        className="h-screen w-screen flex"
      ></div>
    </div>
  );
}
