import axios from "axios";

const API_URL = "/api/auth";

class AuthService  {
    login = (username, password) => {
        return axios
                .post(API_URL + "/signin", {username: username, password: password}, (err)=> console.log(err))
                .then(res => {
                    if (res.data.accessToken) {
                        localStorage.setItem("user", JSON.stringify(res.data))
                    }
                    return res.data;
                })
                .catch(err => {
                    if (err.response.status === 404) {
                        return {message: "User Not Found."}
                    } else if (err.response.status === 401) {
                        return ({message: "Invalid Password!"})
                    } else {
                        return ({message: "Oops! Something went wrong!"})
                    }
                })
    }

    logout = () => {
        localStorage.removeItem("user");
    }

    register = (username, email, password) => {
        return axios.post(API_URL + "/signup", {username, email, password})
    }

    getCurrentUser = () => {
        return JSON.parse(localStorage.getItem("user"))
    }

}

export default new AuthService();
