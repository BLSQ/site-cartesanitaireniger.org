import { useEffect } from "react";

function sendPageview() {
  const path = window.location.hash.replace(/^#/, "") || "/";
  window.plausible?.("pageview", {
    u: window.location.origin + path,
  });
}

export function usePlausibleHashTracking() {
  useEffect(() => {
    sendPageview();
    window.addEventListener("hashchange", sendPageview);
    return () => window.removeEventListener("hashchange", sendPageview);
  }, []);
}

export function trackDownloadAndOpen(url) {
  const filename = url.split("/").pop();

  window.plausible?.("File Download", {
    u: window.location.origin + window.location.hash.replace("#", ""),    
    props: { file: filename },
  });

  setTimeout(() => {
    window.open(url, "_blank", "noopener,noreferrer");
  }, 150);
}
