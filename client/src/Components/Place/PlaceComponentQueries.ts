import { gql } from "@apollo/client";

export const TOGGLE_PLACE = gql`
  mutation toggleFav($placeId: Int!, $isFav: Boolean) {
    EditPlace(placeId: $placeId, isFav: $isFav) {
      ok
      err
    }
  }
`;

export const EDIT_PLACENAME = gql`
mutation editPlaceName($placeId: Int!, $name: String){
    EditPlace(placeId: $placeId, name: $name){
        ok
        err
    }
}
`;
