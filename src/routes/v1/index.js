 const express = require('express');

 const router = express.Router();
const UserController = require('../../controllers/user-controller');

//  const userController = n
 router.post('/signup',UserController.create);


 module.exports = router;