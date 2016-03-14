/**
 * Created by Taru on 9.3.2016.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

var UserSchema = new Schema({

    email: {
        type: String,
        required: true
    },

    username: {
        type: String,
        required: false
    },

    password: {
        type: String,
        required: true
    },

    bio: {
        type: String,
        required: false
    },

    role: {
        type: String,
        required: true
    }

});

UserSchema.pre('save', function(next){
    var user = this;
    if(!user.isModified('password'))
    {
        return next();
    }

    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
       if(err)
       {
           return next(err);
       }

       bcrypt.hash(user.password, salt, function(err, hash) {
           if(err)
           {
               return next(err);
           }

           user.password = hash;
           next();
       })
    });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
        if(err) {
            return cb(err);
        }

        cb(null, isMatch);
    })
};

var User = mongoose.model('User', UserSchema);
module.exports = User;