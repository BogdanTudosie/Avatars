/**
 * Created by Taru on 15.3.2016.
 */

var mongoose = require('mongoose');
var Avatar = require('../models/avatar');

// Controller methods

// Find All
/**
 * Finds all characters within the database regardless of owner and other criteria
 * @param req
 * @param res
 */
module.exports.listCharacters = function(req, res) {

    // use the Avatar variable to find all the characters
    Avatar.find({}, function(err, avatars){
        if(err) {
            throw err;
        }

        console.log(avatars);

        if(avatars && avatars.length >=1) {
            res.json(avatars);
        }
        else if(avatars && avatars.length == 0) {
            res.json({
                message: 'No characters found in database'
            });
        }
        else {
            res.json({
                message: 'No characters found or request failed'
            });
        }
    });
}


// Find One
/**
 * Finds one character based on a given name using HTTP GET taking one parameter based on name
 * @param req
 * @param res
 */
module.exports.listOneByName = function(req, res) {

    var name = req.query.name;
    Avatar.findOne({name: name}, function(err, avatar) {
        if(err) {
            throw err;
        }

        if(avatar) {
            res.json({
                name: avatar.name,
                description: avatar.description
            });
        }
        else {
            res.json({
                message: 'Unable to find character with the name: ' + name
            });
        }
    });
}


// Find all by User
/**
 * Lists all characters for user based on the user's ID
 * @param req
 * @param res
 */
module.exports.listAllByUser = function(req, res) {

    var ownerId = req.params.ownerid;

    Avatar.find({owner: ownerId}, function(err, avatars) {
       if(err) {
           throw err;
       }

       console.log(avatars);

       if(avatars && avatars.length >= 1) {
           res.json(avatars);
       }
       else if(avatars && avatars.length == 0) {
           res.json({
               message: 'No characters found for selected user'
           });
       }
       else {
           res.json({
               message: 'No data has been returned or error occurred in transaction'
           });
       }
    });
}

// Find all with name like xxx belonging to a user
/**
 * Function will help a user to find characters with the same name or whose name contains a certain character
 * set for example (John in Johnatan)
 * @param req
 * @param res
 */
module.exports.listByNameForUser = function(req, res) {

}

// new character
/**
 * Creates a new character/avatar for the designated user id (currently logged in user)
 * @param req
 * @param res
 */
module.exports.newAvatar = function(req, res) {


    console.log(req.body);

    var newAvatar = new Avatar(req.body);
    newAvatar.save();
    res.json(req.body);
}

// Update

// Delete