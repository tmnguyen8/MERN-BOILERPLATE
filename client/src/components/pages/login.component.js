import React, { useRef, useState } from 'react';
import {useForm} from "react-hook-form";

import AuthService from "../../services/auth.service";

export default function Login(props) {
    // STATES
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    // REACT-HOOK-FORM FUNCTIONS
    const { register, handleSubmit, errors } = useForm();

    const handleLogin = async (data) => {
        // console.log(data)
        // console.log("error: ", errors)
        // e.preventDefault();
        if (!errors) {
            setLoading(true)
            setMessage("")
        }

        await AuthService
            .login(data.username, data.password)
            .then((res) => {
                if (res.accessToken) {
                    props.history.push("/profile");
                    window.location.reload();
                } else {
                    setMessage(res.message)
                }
                setLoading(false)

            }, err => {
                // console.log("myerror", err)
                const resMessage = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
                // console.log("Error", resMessage)
                setLoading(false)
                setMessage(resMessage)
            })
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
                                    required: "Password is required",
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
                                disabled={loading}
                            >
                                {
                                    loading && (<span className="spinner-border spinner-border-sm"></span>)
                                }
                                <span>Login</span>
                            </button>
                        </div>
                    </form>
                    {message? <p>{message}</p>: null}
                </div>                
            </div>
        )
    
}
