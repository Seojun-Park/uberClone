import React, { createContext } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client'
import { userLogIn, userLogOut } from './apollo/authResolvers'
import { ThemeProvider } from 'styled-components'
import styled from 'styled-components'
import GlobalStyles from './Styles/GlobalStyles'
import theme from './Styles/Theme'

const IS_LOGGED_IN = gql`
query isLoggedIn{
  isLoggedIn @client
}`

const AppContext = createContext(null);

const Test = styled.span`
color: ${props => props.theme.blueColor};
`


const App = (): any => {
  const { data: { isLoggedIn } } = useQuery(IS_LOGGED_IN)
  return (
    <AppContext.Provider value={isLoggedIn}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        {isLoggedIn ?
          <>
            <Test>
              logged in
            </Test>
            <button onClick={() => userLogOut()}>

              logout
      </button>
          </> : <>
            <Test>
              not logged in

          </Test>
            <button onClick={() => userLogIn("token")}>
              login
          </button>
          </>}
      </ThemeProvider>
    </AppContext.Provider>
  )
}

export default App;
