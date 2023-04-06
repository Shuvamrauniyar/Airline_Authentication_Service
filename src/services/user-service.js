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
            throw (error);
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
    checkPassword(encryptedPassword, inputPassword)
    {
        try {
            return bcrypt.compareSync(inputPassword, encryptedPassword);
        } catch (error) {
            console.log("Something went wrong in password checking");
            throw (error);
        }
    }
}

module.exports = UserService;