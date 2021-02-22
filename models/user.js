//init codde
const mongoose = require('mongoose');

//user schema
const userSchema = mongoose.Schema({
    _id: Schema.Types.ObjectId,
    username: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type : String,
        require: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdOn: {
        type: Date,
        default: Date.now()
    }
});

//user model
mongoose.model('users',userSchema);

//module exports
module.exports = mongoose.model('users');