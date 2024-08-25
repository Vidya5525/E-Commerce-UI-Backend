// Create token and save it in a cookie
const sendToken = (user, statusCode, res) => {
    const token = user.getJWTToken();

    // Ensure COOKIE_EXPIRE is defined and valid
    const cookieExpireDays = parseInt(process.env.COOKIE_EXPIRE, 10) || 7; // default to 7 days if not defined

    // Calculate the expiration date
    const expires = new Date(Date.now() + cookieExpireDays * 24 * 60 * 60 * 1000);
    
    // Debugging: Ensure expires is a valid Date object
    console.log("Expires Date:", expires); // Should output a valid Date object

    // Options for cookies
    const options = {
        expires: expires,
        httpOnly: true,
        // secure: true // Uncomment if you are using HTTPS
    };

    res.status(statusCode)
        .cookie("token", token, options)
        .json({
            success: true,
            user,
            token,
        });
};

export default sendToken;


