 const express = require('express');

 const router = express.Router();
const UserController = require('../../controllers/user-controller');
const {authReqValidation} = require('../../middlewares/index');
//  const userController = n

 router.post('/signup',
 authReqValidation.authvalidation,
 UserController.create
 );
 //router.post('/signup',UserController.create);
//  router.post('/signin',UserController.signIn);
 
//  const UserService = require('../../services/user-service');

//  const userService = new UserService();
 router.post('/signin',
 authReqValidation.authvalidation,
 UserController.signIn
 );
// router.post('/signin',AuthReqValidation,UserController.signIn);

router.get('/isAuthenticated',UserController.isAuthenticated);

router.get('/isAdmin',
authReqValidation.isAdminReqValidation,
UserController.isAdmin);

 module.exports = router;