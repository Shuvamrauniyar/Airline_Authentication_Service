const UserRepository = require('../repository/user-repository')
const {JWT_KEY} = require('../config/ServerConfig')
const jwt = require('jsonwebtoken');
//const userRepository = 
const bcrypt = require('bcrypt');
class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }
    async create(data){
        try {
            const user = await this.userRepository.create(data);
            return user; 
            
        } catch (error) {
            console.log("Something went wrong in Service layer");
            throw (error);
        }
    }
    //think about the signin using fake email that doesnt exist or is of someoneelse ,so we need to think about the logic to handle that as well
    async signIn(email,inputPassword){
        try {
            const user = await this.userRepository.getByEmail(email);
            //email is not found then error will be thrown from repo layer itself
            //console.log(user);
            const validatePassword = this.checkPassword(user.password, inputPassword);
          //  console.log(user.password);

            if(!validatePassword) {
                console.log("input password is incorrect");
                throw error;
            }
            const newToken = this.createToken({ email: user.email , id: user.id});
            return newToken;
        } catch (error) {
            console.log("Something went wrong in while signing in service layer");
            throw {error : "incorrect password"};
        }
    }
    createToken(user) {
        try {
            const token = jwt.sign(user,JWT_KEY,{expiresIn: '2h'});
        return token;
        } catch (error) {
            console.log("cannot create token");
            throw (error);
        }
    }

    verifyToken(token) {
        try {
            const response = jwt.verify(token,JWT_KEY);
            return response;
        } catch (error) {
            console.log("Something went wrong and cannot verify the token");
            throw (error);
        }
    }
    async isAuthenticated(token) {
        try {
            const response = this.verifyToken(token);
            if(!response)
            {
                throw {error: 'invalid token'}
            }
            const user = await this.userRepository.getById(response.id);
            console.log(user);
            if(!user)
            {
                throw {error: 'user not found with corresponding token'};
            }
            return user.id;
        } catch (error) {
            console.log('token didnt match');
            throw (error);
        }
    }
    checkPassword(encryptedPassword, inputPassword)
    {
        try {
            return bcrypt.compareSync(inputPassword, encryptedPassword);
        } catch (error) {
            console.log("Something went wrong in password checking");
            throw (error);
        }
    }
    async isAdmin(id)
    {
        try {
            const response = await this.userRepository.isAdmin(id);
            return response;
        } catch (error) {
            console.log('error in service layer');
            throw error;
        }
    }
}

module.exports = UserService;