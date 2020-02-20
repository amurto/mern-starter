import React from 'react';
import { 
  BrowserRouter as Router, 
  Route, 
  Redirect, 
  Switch 
} from 'react-router-dom';

import { AuthContext } from './components/context/auth-context';
import { useAuth } from './components/hooks/auth-hook';

import PrimaryAppBar from './components/utils/PrimaryAppBar';
import Footer from './components/utils/Footer';
import Signin from './components/auth/Signin';
import Signup from './components/auth/Signup';
import Landing from './components/utils/Landing';

const App = () => {
  const { token, login, logout, userId } = useAuth();

  let routes;

  if (token) {
    routes = (
      <Switch>
        <Route path="/" exact>
            <Landing />
        </Route>
        <Redirect to="/" />
      </Switch>
    )
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
            <Landing />
        </Route>
        <Route path="/signin" exact>
            <Signin />
        </Route>
        <Route path="/signup" exact>
          <Signup />
        </Route>
        <Redirect to="/" />
      </Switch>
    )
  }

  

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout
      }}
    >
      <Router>
        <PrimaryAppBar />
        {routes}
        <Footer />
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
