import { GoogleApiWrapper } from "google-maps-react";
import { mapAPI } from "../../key";
import HomeContainer from "./HomeContainer";

export default GoogleApiWrapper({
  apiKey: mapAPI.apiKey
})(HomeContainer);
