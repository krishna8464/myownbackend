const {UserModel} = require("../models/usermodel")
const fs = require("fs")

async function logger(req,res,next){
    let url = req.url;
    try {
        if(url === "/login"){
            const {email,pass}= req.body;
            const userdetials = await UserModel.find({email});
            if(userdetials.length>0){
                const date = new Date();
                fs.appendFileSync("logger.txt",`Username:${userdetials[0].name}, Role:${userdetials[0].role}, Date:${date}`)
                next()
            }else{
                res.send("User Not Regestered")
            }
        }else{
            next()
        }
    } catch (error) {
        res.send("Something went wrong in loggerfiles")
    }
}

module.exports={
    logger
}