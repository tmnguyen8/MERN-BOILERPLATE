// helper function to get x-access-token header with access token
export default authHeader = () => {
    const user = jSON.parse(localStorage.getItem("user"));

    if (user && user.accessToken) {
        return {"x-access-token": user.accessToken};
    } else {
        return {}
    }
}