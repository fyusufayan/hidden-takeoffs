import './App.css';
import Header from './components/layout/Header';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"
import Register from './components/userManagement/Register';
import store from './store';
import { Provider } from 'react-redux';
import Login from './components/userManagement/Login';
import Landing from './components/layout/Landing';
import CustomMap from './components/map/CustomMap';
import setJWTToken from './securityUtils/setJWTToken';
import jwt_decode from 'jwt-decode'
import {securityActions} from './reducers/securitySlice'
import {SET_CURRENT_USER} from './actions/types'
import { logout } from './actions/securityActions';
import SecureRoute from './securityUtils/SecureRoute';


const jwtToken=localStorage.jwtToken

if(jwtToken){
  setJWTToken(jwtToken)
  const decoded_jwtToken=jwt_decode(jwtToken)
  store.dispatch(securityActions.setcurrentuserfunc({
    type:SET_CURRENT_USER,
    token:decoded_jwtToken
  }))

  const currentTime=Date.now()/1000

  if(decoded_jwtToken.exp<currentTime){
    store.dispatch(logout())
    // window.location.href="/"
    // window.location.href("/")
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Header />


          <Route exact path="/" component={Landing}/>
          <Route exact path="/register" component={Register}/>
          <Route exact path="/login" component={Login}/>

          <Switch>
            <SecureRoute exact path="/map" component={CustomMap}/>            
          </Switch>

        </div>
      </Router>
    </Provider>
  );
}

export default App;
