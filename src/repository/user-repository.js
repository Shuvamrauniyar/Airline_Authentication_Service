
const {User,Role} = require('../models/index');

class UserRepository{
    async create(data) {
        try {
            const user = await User.create(data);
            return user;    
        } catch (error) {
            console.log("Something went wrong in repository layer");
            throw (error);
        }   
    }
    async getById(userId) {
        try {
            const user = await User.findByPk(userId, {
                attributes: ['email', 'id']
            });
            return user;
        } catch (error) {
            console.log("Something went wrong in repository layer");
            throw (error);
        }
    }
    async getByEmail(userEmail) {
        try {
            const user = await User.findOne({
                where: {
                    email : userEmail
                }
            });
            return user;
        } catch (error) {
            console.log("Something went wrong in repository layer");
            throw (error);
        }
    }
    async isAdmin(id) {
        try {
            const user = await User.findByPk(id);
            if(!user)
            throw {err:'user with given id not found'};

            console.log(user);
            const role = await Role.findOne({
                where: {
                    name:'ADMIN'
                }
            })
            const response = await user.hasRoles(role);
            console.log('response is ', response);
            return response;
        } catch (error) {
            console.log('error in repo layer');
            throw error;
        }
    }

}
module.exports = UserRepository;