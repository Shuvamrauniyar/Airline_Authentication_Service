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

const isAdminReqValidation = (req, res, next) => {
    if(!req.body.id)
    return res.status(400).json({
        success: false,
        err: 'id is missing in the request',
        message : 'incorrect request format',
        data: {}
    });

    next();
}
module.exports = {
    authvalidation,
    isAdminReqValidation
}