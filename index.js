const express = require("express");
const {connection} = require("./config/db")
const {userRout} = require("./routes/user.rout")
const {noterouter}= require("./routes/notes.route")
require('dotenv').config()
const cors = require("cors")

const app = express();
app.use(express.json())
app.use(cors({
    origin:"*"
}))

app.get("/",async(req,res)=>{
    try {
        res.send("Welcome to the practice session")
    } catch (error) {
        res.send("Something went wrong in practice index page")
    }
})


app.use("/users",userRout)
app.use("/notes",noterouter)



app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("Connected to DB")
        
    } catch (error) {
        console.log("Error while connecting to DB")
    }
    console.log(`The server is running at ${process.env.port}`)
})