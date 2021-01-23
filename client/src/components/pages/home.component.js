import React, { Component } from 'react';
import UserService from "../../services/user.service";


export default class home extends Component {
    state = {
        content: ""
    }

    componentDidMount() {
        UserService.getPublicContent().then(res => {
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
