import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import AuthService from "./services/auth.service";

import Login from "./components/pages/login.component";
import Register from "./components/pages/register.component";
import Home from "./components/pages/home.component";
import Profile from "./components/pages/profile.component";
import BoardUser from "./components/pages/board.user";
import BoardModerator from "./components/pages/board.moderator";
import BoardAdmin from "./components/pages/board.admin";
import Navbar from "./components/navbar/navbar.component";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();
    if (user) {
        if (new Date(user.expiredInDate) > new Date()) {
          this.setState({
              currentUser: user,
              showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
              showAdminBoard: user.roles.includes("ROLE_ADMIN"),
            });
        } else {
          this.logOut();
        } 
    } 
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;

    return (
      <div>
      <Router >
        <Navbar 
          showModeratorBoard = {showModeratorBoard}
          showAdminBoard = {showAdminBoard}
          currentUser = {currentUser}
          logOut = {this.logOut}
        />

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/user" component={BoardUser} />
            <Route path="/mod" component={BoardModerator} />
            <Route path="/admin" component={BoardAdmin} />
          </Switch>
        </div>
        </Router>
      </div>
    );
  }
}

export default App;