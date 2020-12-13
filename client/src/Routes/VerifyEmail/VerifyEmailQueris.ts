import { gql } from "@apollo/client";

export const VERIFY_EMAIL = gql`
mutation verifyEmain($key: String!){
    ValidateEmail(key:$key){
        ok
        error
    }
}
`;
