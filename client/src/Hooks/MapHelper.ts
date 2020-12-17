import { mapAPI } from "../key";

export const loadGoogleMapApi = (onLoadSuccess: () => any) => {
  const script = document.createElement(`script`);
  script.src = `https://maps.googleapis.com/maps/api/js?key=${mapAPI}&libraries=places`;
  document.head.append(script);
  script.addEventListener("load", onLoadSuccess);
};
