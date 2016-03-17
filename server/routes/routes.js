/**
 * Created by Taru on 9.3.2016.
 */
/**
 * Defines the Routes used by the app to unclutter server.js and modularize code
 */

// Controllers here
var userController = require('../controllers/user-controller');
var avatarController = require('../controllers/avatar-controller');

module.exports = function(app) {

    // Main page

    // User
    app.post('/api/user/signup', userController.createUser);
    app.post('/api/user/signin', userController.signIn);
    app.post('/api/user/update', userController.updateUser);
    app.post('/api/user/updatepassword/:userid', userController.updatePassword);
    app.delete('/api/user/delete/:id', userController.deleteUser);

    // Avatar
    app.get('/api/characters/listall', avatarController.listCharacters);
    app.get('/api/characters/findbyname/:name', avatarController.listOneByName);
    app.get('/api/characters/findbyuser/:ownerid', avatarController.listAllByUser);
    app.post('/api/characters/addavatar', avatarController.newAvatar);
    app.delete('/api/characters/delete/:avatarid', avatarController.deleteAvatar);
    app.post('/api/characters/update/:avatarid', avatarController.updateAvatar);

    // Others
}
