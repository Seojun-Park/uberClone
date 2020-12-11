import React, { createContext } from 'react';
import { gql, useQuery } from '@apollo/client'
import { ThemeProvider } from 'styled-components'
import { HashRouter as Router } from 'react-router-dom'
import GlobalStyles from '../Styles/GlobalStyles'
import Routes from './Routes'
import theme from '../Styles/Theme'
import { ToastContainer } from 'react-toastify'

const IS_LOGGED_IN = gql`
query isLoggedIn{
  isLoggedIn @client
}`

const AppContext = createContext(null);

const App = (): any => {
  const { data: { isLoggedIn } } = useQuery(IS_LOGGED_IN)
  return (
    <AppContext.Provider value={isLoggedIn}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Router>
          <Routes isLoggedIn={isLoggedIn} />
        </Router>
      </ThemeProvider>
      <ToastContainer draggable={true} position={"bottom-center"} />
    </AppContext.Provider>
  )
}

export default App;
