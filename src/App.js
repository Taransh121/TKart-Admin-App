// import logo from './logo.svg';
import './App.css';
import { } from "react-bootstrap"
import { Home } from './containers/Home';
import { Signin } from './containers/Signin';
import { Signup } from './containers/Signup';
import { Switch, Route } from "react-router-dom";
import { PrivateRoute } from './components/PrivateRoute';
import { useEffect } from 'react';
import { isUserLoggedIn } from "./actions/authActions";
import { useDispatch, useSelector } from 'react-redux';
import { Products } from './containers/Products';
import { Page } from './containers/Page';
import { Orders } from './containers/Orders';
import { Category } from './containers/Category';
import { getInitialData } from './actions/initialDataActions';




function App() {

  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn())
    }
    if(auth.authenticate){
    dispatch(getInitialData());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.authenticate])  //everytime auth.authenticate gets change it will call the api again and again

  return (
    <div className="App">
      <Switch>
        <PrivateRoute path='/' exact component={Home} />
        <PrivateRoute path='/page' exact component={Page} />
        <PrivateRoute path='/products' exact component={Products} />
        <PrivateRoute path='/orders' exact component={Orders} />
        <PrivateRoute path='/category' exact component={Category} />
        <Route path='/signin' exact component={Signin} />
        <Route path='/signup' exact component={Signup} />
      </Switch>
    </div>
  );
}

export default App;
