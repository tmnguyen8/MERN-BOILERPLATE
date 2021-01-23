import React, { Component } from 'react';
import AuthService from "../../services/auth.service";

export default class Profile extends Component {
    state = {
        currentuser: AuthService.getCurrentUser()
    }

    render() {
        const { currentuser } = this.state

        return (
            <div className="container">
                <header className="jumbotron">
                    <h3>
                        <strong>{currentuser.username}</strong> Profile
                    </h3>
                </header>
                <p>
                    <strong>Token:</strong>{" "}
                    {currentuser.accessToken.substring(0,20)} ...{" "}
                    {currentuser.accessToken.substr(currentuser.accessToken.length - 20)}
                </p>
                <p>
                    <strong>Id: </strong>{" "}
                    {currentuser.id}
                </p>
                <p>
                    <strong>Email: </strong>{" "}
                    {currentuser.email}
                </p>
                <strong>Authorities:</strong>
                <ul>{currentuser.roles && 
                        currentuser.roles.map( (role, index) => 
                            <li key={index}>{role}</li>)
                    }
                </ul>
            </div>
        )
    }
}
