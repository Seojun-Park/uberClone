import React, { createContext } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client'
import { userLogIn, userLogOut } from './apollo/authResolvers'

const IS_LOGGED_IN = gql`
query isLoggedIn{
  isLoggedIn @client
}`

const AppContext = createContext(null);


const App = (): any => {
  const { data: { isLoggedIn } } = useQuery(IS_LOGGED_IN)
  return (
    <AppContext.Provider value={isLoggedIn}>
      {isLoggedIn ?
        <>
          logged in
          <button onClick={() => userLogOut()}>
            logout
      </button>
        </> : <>
          not logged in
          <button onClick={() => userLogIn("token")}>
            login
          </button>
        </>}
    </AppContext.Provider>
  )
}

export default App;
