import React from 'react';
import { BrowserRouter as Router, Link } from "react-router-dom";

export default function NavItem(props) {
    return (
        <div>
            <li className="nav-item">
                <Link to={`/${props.link}`} className="nav-link">
                    {props.label}
                </Link>
            </li>
        </div>
        
    )
}
