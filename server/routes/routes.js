/**
 * Created by Taru on 9.3.2016.
 */
/**
 * Defines the Routes used by the app to unclutter server.js and modularize code
 */

// Controllers here
var userController = require('../controllers/user-controller');


module.exports = function(app) {

    // Main page

    // User
    app.post('/api/user/signup', userController.createUser);
    app.post('/api/user/signin', userController.signIn);
    app.post('/api/user/update', userController.updateUser);
    app.delete('/api/user/delete/:id', userController.deleteUser);

    // Avatar

    // Others
}
