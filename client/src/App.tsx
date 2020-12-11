import React from 'react';
import { gql, useMutation, useQuery } from '@apollo/client'
import { isLoggedInVar } from './apollo/apollo'
import { useApolloClient } from '@apollo/client'


const IS_LOGGED_IN = gql`
query isLoggedIn{
  isLoggedIn @client
}
`

const LOG_USER_IN = gql`
mutation logUserIn{
  logUserIn @client
}
`


const App = (): any => {
  const client = useApolloClient();
  const { data } = useQuery(IS_LOGGED_IN)
  const [logUserInMutation] = useMutation(LOG_USER_IN, {
    onCompleted({ login }) {
      localStorage.setItem("X-JWT", "token")
      isLoggedInVar(true)
    }
  })
  return (
    data.isLoggedIn ?
      <>
        logged in
        <button onClick={() => {
          client.cache.evict({ fieldName: 'me' });
          client.cache.gc();
          localStorage.removeItem('X-JWT')
          isLoggedInVar(false);
        }}>
          logout
      </button>
      </> : <>
        not logged in
        <button onClick={() => logUserInMutation()}>
          login
          </button>
      </>
  )
}

export default App;
