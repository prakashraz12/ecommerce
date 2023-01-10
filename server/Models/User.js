const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true,
        minlength:3,
        
    },
    email:{
        type: String,
        require: true,
        minlength:3,
        unique: true
    },
    password:{
        type: String,
        required: true,
        minlength:6
    },
});
const User = mongoose.model("USER", userSchema)
exports.User = User;