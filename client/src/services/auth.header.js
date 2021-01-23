// helper function to get x-access-token header with access token
const authHeader = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user && user.accessToken) {
        return {"x-access-token": user.accessToken};
    } else {
        return {}
    }
}

export default authHeader;