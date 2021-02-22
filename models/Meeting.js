const mongoose = require('mongoose');
const schema = mongoose.schema;
// const objectId = Schema.Types.objectId;

//schema
const Meeting = new schema({
    _id: Schema.Types.ObjectId,
    // hostId:
   
    createdBy: {
        type: Schema.Types.ObjectId, ref: 'users'
    },
    hostId:{
        type:String,
        require: true
    },
   meetingName: {
            type:String,
            require: true
   },
   meetingId:{
       type: String,
        autogenerated : true
   },
   meetingPassword:{
       type: String,
    autogenerated : true
   },
   isActive:{
    type: Boolean,
    default: false
   },
   createdOn:{
    type: Date,
    default: Date.now()
   }
   
    
});


const Meeting =  mongoose.model('Meeting',Meeting);

//module exports
module.exports = mongoose.model('Meeting');