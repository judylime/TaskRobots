import React from 'react';
import {Route} from "react-router-dom";
import {Redirect, Switch} from "react-router"

import Home from './Home';
import Login from './Login';
import Register from './Register';
import RegisterComplete from './RegisterComplete';
import AccountInfo from './AccountInfo';
import Ordering from './Ordering';
import Tracking from './Tracking';
import ContactUs from './ContactUs';
import GoTo from "./GoTo"





class Main extends React.Component{
  showAccountInfo = () => {
      // case1: already logged in --> the component you want
      // case2: hasn't logged in --> login
      return this.props.isLoggedIn
        ?
        <AccountInfo/>
        :
        <GoTo target='/login'/>;
    }

  showOrdering = () => {
    // case1: already logged in --> the component you want
    // case2: hasn't logged in --> login
    console.log("is logged in?", this.props.isLoggedIn)
    return this.props.isLoggedIn
      ?
      <Ordering/>
      :
      <Redirect to='/login'/>;
  }

  showLogin = () => {
    return <Login setLoggedIn={this.props.setLoggedIn} isLoggedIn={this.props.isLoggedIn}/>
  }

  render() {
    return (
        <Switch>
            <Route path="/login" render={this.showLogin}/>
            <Route path="/register" component={Register}/>
            <Route path="/register/complete" component={RegisterComplete}/>
            <Route path="/accountInfo" render={this.showAccountInfo}/>
            <Route path="/ordering" render={this.showOrdering}/>
            <Route path="/tracking" component={Tracking}/>
            <Route path="/contactus" component={ContactUs}/>
            <Route path="/" component={Home}/>
        </Switch>
    )
  }
}

export default Main;
