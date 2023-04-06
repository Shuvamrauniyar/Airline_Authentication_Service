const UserService = require('../services/user-service');

const userService = new UserService();
// class UserController{
//     constructor() {
//     }

    const create = async (req, res) => {
        try {
            const response  = await userService.create({
                email: req.body.email,
                password: req.body.password
            });
            return res.status(200).json({
                success: true,
                message: 'Successfully created a new user',
                data: response,
                err: {}
            });
            
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: 'Something went wrong in controller layer',
                data: {},
                err: error
            });
        }
    }

    const signIn = async (req, res) => {
        try {
            const response  = await userService.signIn(
                req.body.email,
                req.body.password
            );
            return res.status(200).json({
                success: true,
                message: 'Successfully signed in ',
                data: response,
                err: {}
            });
            
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: 'Something went wrong in controller layer while signing in ',
                data: {},
                err: error
            });
        }
    }
//}

module.exports = {
    create ,
    signIn
}
