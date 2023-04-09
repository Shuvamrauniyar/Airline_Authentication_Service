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
const isAuthenticated = async (req, res) => {
    try {
        const token = req.headers['x-access-token'];
        //console.log('hello',token);
        const response = await userService.isAuthenticated(token);
        return res.status(200).json({
            success: true,
            message: 'Successfully Authenticated ',
            data: response,
            err: {}
        });
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Something went wrong in controller layer while authenticating ',
            data: {},
            err: error
        });
    }


}
const isAdmin = async(req,res) => {
    try {
        const response = await userService.isAdmin(req.body.id);
        console.log(response);
        return res.status(200).json({
            success:true,
            message:' the role of user as admin is successfully checked',
            err: {},//i mistakely threw error here as err:error
            data: response
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Something went wrong in controller layer while checking the role ',
            data: {},
            err: error
        });
    }
}
module.exports = {
    create ,
    signIn ,
    isAuthenticated,
    isAdmin
}
