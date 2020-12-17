import { GoogleApiWrapper } from "google-maps-react";
import { mapAPI } from "../../key";
import FindAddressContainer from "./FindAddressContainer";

export default GoogleApiWrapper({
  apiKey: mapAPI.apiKey
})(FindAddressContainer);
