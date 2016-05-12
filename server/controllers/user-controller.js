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
                       id: user._id,
                       status: 'OK',
                       message: 'Authentication successful'
                   });
               }
               else {
                   res.json({
                       status: 'FAIL',
                       message: 'Invalid password.'
                   });
               }
            });
        }
    });
}

/**
 * Retrieves profile information for current user
 * @param req
 * @param res
 */
module.exports.findMe = function(req, res) {
    var isAuthenticated = req.body.isAuth;
    var myId = req.body.userid;

    if(isAuthenticated) {
        User.findById(myId,'email username bio role' ,function(err, user){
            if(err) {
                res.json({
                    message: 'Error occurred: ' + err
                });
            }

            if(user) {
                res.json(user);
            } else {
                res.json({
                    status: 'FAIL',
                    message: 'An error has occurred while retrieving your profile'
                });
            }
        });
    }
    else {
        res.json({
            status: 'FAIL',
            message: 'Please re-authenticate before retreving personal information'
        });
    }
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
            if(!bio) {
               res.json({
                status: 'NO',
                message: 'Empty Bio Passed, not updating'
               });
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
    var userId = req.params.userid;
    var oldPassword = req.body.oldpassword;
    var newPassword = req.body.newpassword;

    User.findById(userId, 'password', function(err, user) {
        if(err) {
            res.json({
               message: 'Error ocurred: ' + err
            });
        }

        console.log(user);

        if(user) {
            user.comparePassword(oldPassword, function(err, isMatch) {

                if(isMatch) {
                    user.password = newPassword;
                    user.save(function(err){

                       if(err) {
                           res.json({
                               message: 'Error occurred on save: ' + err
                           });
                       }
                       else {
                           res.json({
                               message: 'Update successfully completed'
                           }) ;
                       }
                    });
                }
                else {
                    res.json({
                        message: 'Invalid password for user:  ' + user.id
                    });
                }
            });
        }
    });
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