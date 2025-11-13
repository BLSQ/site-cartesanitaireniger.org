import { useEffect, useRef } from "react";


export default function SupersetDashboard({openHexaUuid, supersetUuid, supersetDomain}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const loadSdk = async () => {
      if (!window.supersetEmbeddedSdk) {
        await import("https://unpkg.com/@superset-ui/embedded-sdk");
      }

      const response = await fetch(
        `https://exhibit.bluesquare.org/api/superset/dashboard/${openHexaUuid}/guesttoken`,
      );
      const data = await response.json();
      const token =  data.guestToken;

      window.supersetEmbeddedSdk.embedDashboard({
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
    };

    loadSdk();
  }, []);

  return <div id="container" ref={containerRef} className="h-screen w-screen flex"/>;
}
