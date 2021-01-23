import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom";
import authService from '../../services/auth.service';

import UserService from "../../services/user.service";
import AuthService from "../../services/auth.service";

export default class BoardMod extends Component {
    state = {
        currentuser: authService.getCurrentUser(),
        content: ""
    }
    componentDidMount() {
        UserService.getModeratorBoard().then(res => {
            this.setState({content: res.data})
        }, err => {
            this.setState({
                content: (err.response && err.response.data) || err.message || err.toString()
            })
        })
    }
    render() {
        if (this.state.currentuser) {
            return (
                <div className="container">
                    <header className="jumbotron">
                        <h3>{this.state.content}</h3>
                    </header>
                </div>
            )
        } else {
            return (
                <Route>
                    <Redirect
                        to={{
                        pathname: "/login"
                        }}
                    />
                </Route>
            )
            
        }
        
    }
}
