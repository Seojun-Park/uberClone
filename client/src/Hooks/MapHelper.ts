import { mapAPI } from "../key";
import axios from "axios";
import { toast } from "react-toastify";

export interface ICoords {
  lat: number;
  lng: number;
}

export const loadMapApi = () => {
  const mapURL = `https://maps.googleapis.com/maps/api/js?key=${mapAPI}&callback=initMap`;
  const scripts = document.getElementsByTagName("script");
  for (let i = 0; i < scripts.length; i++) {
    if (scripts[i].src.indexOf(mapURL) === 0) {
      return scripts[i];
    }
  }
  const googleMapScript = document.createElement("script");
  googleMapScript.src = mapURL;
  googleMapScript.async = true;
  googleMapScript.defer = true;
  window.document.body.appendChild(googleMapScript);
  return googleMapScript;
};

export const loadGoogleMapApi = (onloadSuccess: () => any) => {
  const script = document.createElement("script");
  script.src = `https://maps.googleapis.com/maps/api/js?key=${mapAPI}&callback=initMap`;
  document.head.append(script);
  script.addEventListener("load", onloadSuccess);
};

export const getAddress = async (coords: ICoords) => {
  const { lat, lng } = coords;
  const url = `https://maps.googleapis.com/maps/api/js?key=${mapAPI}&callback=initMap`;
  const { status, data } = await axios.get(url);
  if (status) {
    const { results } = data;
    const place = results[0];
    const address = place.formatted_address;
    return address;
  } else {
    toast.error(data.error_message);
  }
};

export const generateMarker = (
  map: google.maps.Map,
  coords: ICoords,
  icon?: any
) => {
  const markerConfig: google.maps.MarkerOptions = {
    position: { ...coords }
  };
  if (icon) {
    markerConfig.icon = icon;
  }
  const marker = new google.maps.Marker(markerConfig);
  if (marker) {
    marker.setMap(map);
    return marker;
  } else {
    return false;
  }
};

export const renderPath = (
  map: google.maps.Map,
  fromGeoCode: ICoords,
  toGeoCode: ICoords,
  onSuccessHandler?: (
    routes: google.maps.DirectionsRoute[],
    directionRenderer: google.maps.DirectionsRenderer
  ) => void
) => {
  const renderOption: google.maps.DirectionsRendererOptions = {
    polylineOptions: {
      strokeColor: "#000"
    },
    suppressMarkers: true
  };
  const newDirectionRenderer = new google.maps.DirectionsRenderer(renderOption);
  const directionService = new google.maps.DirectionsService();
  const destination = new google.maps.LatLng(fromGeoCode);
  const origin = new google.maps.LatLng(toGeoCode);
  const directionServiceOption: google.maps.DirectionsRequest = {
    destination,
    origin,
    travelMode: google.maps.TravelMode.DRIVING
  };
  directionService.route(directionServiceOption, (result, status) => {
    if (status === google.maps.DirectionsStatus.OK) {
      const { routes } = result;
      newDirectionRenderer.setDirections(result);
      newDirectionRenderer.setMap(map);
      if (onSuccessHandler) {
        onSuccessHandler(routes, newDirectionRenderer);
      }
    }
  });
};
