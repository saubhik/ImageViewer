import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './screens/home/Home';
import Login from './screens/login/Login';

const App = () => (
  <Switch>
    <Route exact path='/' render={({history}, props) => <Login {...props} history={history}/>} />
    <Route exact path='/home' render={({history}, props) => <Home {...props} history={history}/>} />
  </Switch>
)

export default App;
