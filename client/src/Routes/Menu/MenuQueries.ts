import { gql } from "@apollo/client";

export const TOGGLE_DRIVING = gql`
  mutation toggleDrivingMode {
    ToggleDrivingMode {
      ok
      err
    }
  }
`;
