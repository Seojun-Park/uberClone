import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import AddPlace from "../Routes/AddPlace";
import EditAccount from "../Routes/EditAccount";
import Home from "../Routes/Home";
import AuthHome from "../Routes/AuthHome";
import PhoneLogin from "../Routes/PhoneLogin";
import Places from "../Routes/Places";
import Ride from "../Routes/Ride";
import Settings from "../Routes/Settings";
import VerifyPhone from "../Routes/VerifyPhone";
import SignUp from '../Routes/SignUp'
import SocialLogin from "../Routes/SocialLogin";
import FindAddress from '../Routes/FindAddress'
import VerifyEmail from '../Routes/VerifyEmail'

const LoggedInRoutes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/verifyEmail" component={VerifyEmail} />
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
    <Route exact path="/" component={AuthHome} />
    <Route path="/phoneLogin" component={PhoneLogin} />
    <Route path="/verifyPhone" component={VerifyPhone} />
    <Route path="/signup" component={SignUp} />
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
