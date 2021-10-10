const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type:String,
        required:true,
        maxlength:50
    },
    email:{
        type:String,
        maxlength:50,
        required:true
    },
    password:{
        type:String,
        required:true,
        maxlength:100
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        required:true
    },
    refreshToken:{
        token:{
            type:String,
            default:"",
            maxlength:100
        },
        createdAt:{
            type:Date,
            default:Date.now(),
            required:true,
        }
    }
})

module.exports = {
    userSchema: mongoose.model("User", userSchema),
}