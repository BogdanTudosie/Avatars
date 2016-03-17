/**
 * Created by Taru on 9.3.2016.
 */
/**
 * Controller created for handling user CRUD operations
 */

var mongoose = require('mongoose');
var User = require('../models/users');

/**
 * Creates a user. it is used by the Signup page and sends a POST request with the user data
 * @param req
 * @param res
 */
module.exports.createUser = function(req, res) {

    // console.log(req.body);
    var user = new User(req.body);

    // does our user exist?
    User.findOne({'email': req.body.email}, 'email', function(err, result){
        if(err) {
            console.log(err);
        }

        if(result) {
            // generate a JSON response for client interaction in future iteration
            res.json({
                message: "I found another user with the same email, not creating account"
            });
        }
        else {
            user.save().error(function(err) {
                console.log('Error: ' + err);
            });
            res.json(req.body);
        }
    });
}


/**
 * Signs in a user using the email/password combination
 * @param req
 * @param res
 */
module.exports.signIn = function(req, res) {

    console.log('Sign in');


    // Find one by email
    User.findOne({'email': req.body.email}, 'email password', function(err, user){
       if(err) {
           console.log(err);
       }

        if(user) {
            // compare the two passwords
            user.comparePassword(req.body.password, function(err, isMatch) {
               if(err) {
                   throw err;
               }
               console.log('Password: ', isMatch);

               if(isMatch) {
                   res.json({
                       email: req.body.email,
                       id: user._id
                   });
               }
               else {
                   res.json({
                       message: 'Invalid password.'
                   });
               }
            });
        }
    });
}


/**
 * Updates an existing user based upon the user ID
 * @param req
 * @param res
 */
module.exports.updateUser = function(req, res) {

    console.log('Update called');
    console.log(req.body);

    // Find a user based on userId
    var bio = req.body.bio;
    var username = req.body.username;
    var role = req.body.role;

    User.findById(req.body.id, function(error, result){

        if(error) {
            res.json({
                message: 'An error occurred ' + error
            });
        }

        if(!result) {
            res.json({
                message: 'I was unable to find user with id: ' + req.body.id
            });
        }
        else {

            var user = result;


            // quick verifications for required fields
            if(!username || !role || (!username && !role)) {
               console.log('Verify username and role fields. One or both are empty');
            }
            else
            {
                user.username = username;
                user.role = role;
            }

            user.bio = bio;

            user.save(function(err){
                if(err) {
                    console.log(err);
                    res.json({status: 500});
                }
                else {
                    console.log('User updated');
                    res.json({status: 200});
                }
            })
        }

    });
}

/**
 * Specific post request for updating passwords.
 * @param req
 * @param res
 */
module.exports.updatePassword = function(req, res) {

    // Find user by email then update the password.

}


/**
 * Deletes a user currently selected based on ID, their characters and every associated data
 * @param req
 * @param res
 */
module.exports.deleteUser = function(req, res) {

    User.findByIdAndRemove(req.params.id, req.body, function(err, user){

        if(err) {
            console.log('Error ' + err);
        }
        else {
            res.json(user);
        }
    });
}