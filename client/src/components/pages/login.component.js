import React, { useRef } from 'react';
import {useForm} from "react-hook-form";

import AuthService from "../../services/auth.service";

export default function Login() {
    // const state = {
    //     username: "",
    //     password: "",
    //     loading: false,
    //     message: ""
    // }
    const { register, handleSubmit, errors } = useForm();

    const handleLogin = (data) => {
        console.log(data)
        console.log(errors)
        // e.preventDefault();
        // this.setState({
        //     message: "",
        //     loading: true
        // });

        // if (this.checkBtn.context._errors.length === 0) {
        //     AuthService
        //         .login(this.state.username, this.state.password)
        //         .then(() => {
        //             this.props.history.push("/profile");
        //             window.location.reload();
        //         }, err => {
        //             const resMessage = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();

        //             this.setState({
        //                 loading: false,
        //                 message: resMessage
        //             })
        //         })
        // } else {
        //     this.setState({
        //         loading: false
        //     })
        // }
    }

    
        return (
            <div className="col-md-12">
                <div className="card card-container">
                    <img 
                        src="/assets/profile_avatar.png"
                        alt="profile-img"
                        className="profile-img-card"
                    />
                    <form  onSubmit={handleSubmit(handleLogin)}>
                        {/* User Input */}
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input 
                                type="text"
                                className="form-control"
                                name="username"
                                ref = { register({
                                    required: true
                                    }) }
                            />
                            {errors.username && <p>This is required</p>}
                        </div>

                        {/* Password Input */}
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input 
                                type="text"
                                className="form-control"
                                name="password"
                                ref = { register({
                                    required: true,
                                    minLength: 6
                                    })}
                            />
                            {errors.password && <p>This is required</p>}
                            {errors.password && errors.password.type === "minLength" && (<p>Minimum Length of 6</p>)}
                        </div>

                        {/* Login Button */}
                        <div className="form-group">
                            <button
                                className="btn btn-primary btn-block"
                                // disabled={}
                            >
                                {
                                    // this.state.loading && (<span className="spinner-border spinner-border-sm"></span>)
                                }
                                <span>Login</span>
                            </button>
                        </div>
                    </form>
                </div>                
            </div>
        )
    
}
