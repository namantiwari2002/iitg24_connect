
const mongoose = require('mongoose');
let userSchema = new mongoose.Schema({

    _id:mongoose.Schema.Types.ObjectId,
    profile_id:String,
    edit_token:String,
    fname:String,
    lname:String,
    roll:Number,
    branch:String,
    img_link:String,
    about:String,
    city:String,
    interests:String


});

module.exports=mongoose.model('users' , userSchema);