const jwt = require("jsonwebtoken");
const {NoteModel}= require("../models/notemodel");
require("dotenv").config();

async function validator(req,res,next){
    try {
        const token=req.headers.authorization;
        if(token){
            const decoded = jwt.verify(token,process.env.key);
            if(decoded){
                const userid = decoded.userid
                // console.log(userid)
                req.body.userID=userid;
                next()
            }else{
                res.send("Access Denied")
            }
        }else{
            res.send("Access Denied")
        }
    } catch (error) {
        res.send("Please login first")
    }
}

module.exports={
    validator
}