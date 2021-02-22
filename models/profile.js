const mongoose = require('mongoose');
const schema = mongoose.Schema;
// const objectId = Schema.Types.objectId;

//schema
const user_profile = new schema({
    _id: Schema.Types.ObjectId,
    user_Image: { type: String },
    name: {
        type: Schema.Types.ObjectId, ref: 'users'
    },
    email: {
        type:Schema.Types.ObjectId,
        ref: 'users'
    },
    recovery_email: {
        type: String
        },
    meeting_details: {
        total_meeting: Number,
        default: 0
    }    

});

//user model
mongoose.model('profile',user_profile);

//module exports
module.exports = mongoose.model('profile');