 const express = require('express');

 const router = express.Router();
const UserController = require('../../controllers/user-controller');

//  const userController = n

 router.post('/signup',UserController.create);
//  router.post('/signin',UserController.signIn);
 
//  const UserService = require('../../services/user-service');

//  const userService = new UserService();
 router.post('/signin',UserController.signIn);

 module.exports = router;