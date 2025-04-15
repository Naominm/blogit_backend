function verifyUser(req, res, next) {
    console.log("Cookies received:", JSON.stringify(req.cookies, null, 2));
}

export default verifyUser;
