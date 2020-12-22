import { gql } from "@apollo/client";

export const REPORT_MOVEMENT = gql`
mutation ReportMovement(
    $lastOrientation: Float
    $lastLng: Float
    $lastLat: Float
){
    ReportMovement(
        lastOrientation: $lastOrientation
        lastLng: $lastLng
        lastLat: $lastLat
    ){
        ok
        err
    }
}
`;
