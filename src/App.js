import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './screens/home/Home';
import Login from './screens/login/Login';
import Profile from './screens/profile/Profile';

const App = () => (
  <Switch>
    <Route exact path='/' render={({history}, props) => <Login {...props} history={history}/>} />
    <Route exact path='/home' component={Home} />
    <Route exact path='/profile' component={Profile} />
  </Switch>
)

export default App;
