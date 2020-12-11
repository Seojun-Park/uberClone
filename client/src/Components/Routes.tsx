import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import AddPlace from "../Routes/AddPlace";
import EditAccount from "../Routes/EditAccount";
import Home from "../Routes/Home";
import OutHome from "../Routes/OutHome";
import PhoneLogin from "../Routes/PhoneLogin";
import Places from "../Routes/Places";
import Ride from "../Routes/Ride";
import Settings from "../Routes/Settings";
import VerifyPhone from "../Routes/VerifyPhone";
import SocialLogin from "../Routes/SocialLogin";
import FindAddress from '../Routes/FindAddress'

const LoggedInRoutes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/addPlace" component={AddPlace} />
    <Route path="/places" component={Places} />
    <Route path="/ride" component={Ride} />
    <Route path="/settings" component={Settings} />
    <Route path="/editAccount" component={EditAccount} />
    <Route path="/FindAddress" component={FindAddress} />
    <Redirect from="*" to="/" />
  </Switch>
);

const LoggedOutRoutes = () => (
  <Switch>
    <Route exact path="/" component={OutHome} />
    <Route path="/phoneLogin" component={PhoneLogin} />
    <Route path="/verifyPhone/:number" component={VerifyPhone} />
    <Route path="/socialLogin" component={SocialLogin} />
    <Redirect from="*" to="/" />
  </Switch>
);

const AppRouter = ({ isLoggedIn }: any) => {
  console.log(isLoggedIn);
  return (
    <BrowserRouter>
      {isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />}
    </BrowserRouter>
  )
};

// interface IProps {
//   isLoggedIn: boolean;
// }

// const AppRouter: React.FC<IProps> = ({ isLoggedIn }) => {
//   return (
//     <BrowserRouter>
//       {isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />}
//     </BrowserRouter>
//   )
// }

export default AppRouter;
