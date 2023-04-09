const authvalidation = (req, res, next) => {
    if(!req.body.email || !req.body.password){
    return res.status(400).json({
        success: false,
        data: {},
        err : "something went wrong",
        message: "anyone of email or password is missing"
    });
}
    next();
}
module.exports = {
    authvalidation
}