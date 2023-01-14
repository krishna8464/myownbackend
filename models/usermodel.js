const mongoose  = require("mongoose");

const userSchema = mongoose.Schema({
    name : String,
    email : String,
    role : String,
    pass : String,
    age : Number
},{
    versionKey:false
})

const UserModel = mongoose.model("users",userSchema);

module.exports={
    UserModel
}

