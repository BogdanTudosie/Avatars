/**
 * Created by Taru on 15.3.2016.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AvatarSchema = new Schema({

    /**
     * Properties go here
     */
    name: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: false
    },

    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }

});

var Avatar = mongoose.model('Avatar', AvatarSchema);
module.exports = Avatar;