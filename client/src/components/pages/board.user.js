import React, { Component } from 'react';

import UserService from "../../services/user.service";

export default class BoardUser extends Component {
    state = {
        content: ""
    }
    componentDidMount() {
        UserService.getUserBoard().then(res => {
            this.setState({content: res.data})
        }, err => {
            this.setState({
                content: (err.response && err.response.data) || err.message || err.toString()
            })
        })
    }
    render() {
        return (
            <div className="container">
                <header className="jumbtron">
                    <h3>{this.state.content}</h3>
                </header>
            </div>
        )
    }
}
