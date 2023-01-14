const express = require("express");
const mongoose = require("mongoose");
const { UserModel } = require("../models/usermodel");
const {logger}= require("../middleware/logger")
require("dotenv").config();
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");

const userRout = express.Router()


userRout.post("/register", async (req, res) => {
    const { name, email, role, pass, age } = req.body;
    try {
        let all_det = await UserModel.find({ email });
        if (all_det.length === 0) {
            bcrypt.hash(pass, 5, async (err, secure_password) => {
                if (err) {
                    console.log(err)
                } else {
                    const user = new UserModel({ name, email, role, pass: secure_password, age });
                    await user.save();
                    res.send("User registered succefully")
                }
            })
        } else {
            res.send("User already regesterd")
        }
    } catch (error) {
        res.send("Error in registering the user")
        console.log(err)
    }

})

userRout.use(logger)

userRout.post("/login",async(req,res)=>{
    const {email,pass}=req.body;
    // console.log(email,pass);
    try {
        const user = await UserModel.find({email});
        const hashed_pass = user[0].pass
        if(user.length>0){
            bcrypt.compare(pass,hashed_pass,(err,result)=>{
                if(result){
                    const token = jwt.sign({userid:user[0]._id},process.env.key);
                    res.send({"msg":"Login Successfull","Access Tocken":token})
                }else{
                    res.send("Wrong Credntials")
                }
            })

        }else{
            res.send("User Not Regestered")
        }
        
    } catch (error) {
        res.send("Some thing went wrong in login")
    }
})


module.exports = {
    userRout
}