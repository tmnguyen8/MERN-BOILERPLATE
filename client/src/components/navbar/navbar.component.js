import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import NavItem from "./navitem.component";

export default function Navbar(props) {
    return (
        <div>
                <nav className="navbar navbar-expand navbar-dark bg-dark">
                <Link to={"/"} className="navbar-brand">
                    MERN STACK BOILERPLATE
                </Link>
                <div className="navbar-nav mr-auto">
                    <NavItem link="Home" label="Home"/>

                    {props.showModeratorBoard && (
                        <NavItem link="Mod" label="Moderator Board"/>
                    )}

                    {props.showAdminBoard && (
                    <li className="nav-item">
                        <NavItem link="Admin" label="Admin Board"/>
                    </li>
                    )}

                    {props.currentUser && (
                    <li className="nav-item">
                        <NavItem link="User" label="User Board"/>
                    </li>
                    )}
                </div>

                {props.currentUser ? (
                    <div className="navbar-nav ml-auto">
                        <NavItem link="profile" label={props.currentUser.username}/>
                        
                        <li className="nav-item">
                            <a href="/login" className="nav-link" onClick={props.logOut}>
                                Logout
                            </a>
                        </li>
                    </div>
                ) : (
                    <div className="navbar-nav ml-auto">
                        <NavItem link="login" label="Sign In"/>
                        <NavItem link="register" label="Sign Up"/>
                    </div>
                )}
                </nav>
            
        </div>
    )
}
