import React from 'react';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import AuthService from "../../services/auth.service";

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        )
    }
}

export default class Login extends React.Component {
    state = {
        username: "",
        password: "",
        loading: false,
        message: ""
    }

    onChangeUsername = (e) => {
        this.setState({
            username: e.target.value
        })
    }

    onChangePassword = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    handleLogin = (e) => {
        e.preventDefault();
        this.setState({
            message: "",
            loading: true
        });

        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            AuthService
                .login(this.state.username, this.state.password)
                .then(() => {
                    this.props.history.push("/profile");
                    window.location.reload();
                }, err => {
                    const resMessage = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();

                    this.setState({
                        loading: false,
                        message: resMessage
                    })
                })
        } else {
            this.setState({
                loading: false
            })
        }
    }

    render() {
        return (
            <div className="col-md-12">
                <div className="card card-container">
                    <img 
                        src="/assets/profile_avatar.png"
                        alt="profile-img"
                        className="profile-img-card"
                    />
                    <Form  
                        onSubmit={e => this.handleLogin(e)}
                        ref={c => {this.form = c}}
                    >
                        {/* User Input */}
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <Input 
                                type="text"
                                className="form-control"
                                name="username"
                                value={this.state.username}
                                onChange={(e) => this.onChangeUsername(e)}
                                validations={[required]}
                            />
                        </div>

                        {/* Password Input */}
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <Input 
                                type="text"
                                className="form-control"
                                name="password"
                                value={this.state.password}
                                onChange={this.onChangePassword}
                                validations={[required]}
                            />
                        </div>

                        {/* Login Button */}
                        <div className="form-group">
                            <button
                                className="btn btn-primary btn-block"
                                disabled={this.state.loading}
                            >
                                {this.state.loading && (<span className="spinner-border spinner-border-sm"></span>)}
                                <span>Login</span>
                            </button>
                        </div>
                        <CheckButton 
                            style={{display: "none"}}
                            ref={c => {this.checkBtn = c}}
                        />
                    </Form>
                </div>                
            </div>
        )
    }
}
