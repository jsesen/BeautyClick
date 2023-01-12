'use strict'

const usersController = require('../controllers/user.controller');
const userMiddleware = require('../middleware/user.middleware');


exports.userRoutes = function(app){
    
    app.post('/api/register-user',[userMiddleware.registerDecrypt,usersController.registerUser]);
    
    app.post('/api/login-user',[userMiddleware.loginDecrypt,usersController.loginUser]);

    app.put('/api/upload/user-pic',usersController.uploadUserPic);

}