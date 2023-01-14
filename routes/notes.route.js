const {NoteModel}= require("../models/notemodel");
const express = require("express");
const {validator} = require("../middleware/validator")
const noterouter = express.Router();

noterouter.use(validator)

noterouter.get("/",async(req,res)=>{
    try {
        let id = req.body.userID
        const notes = await NoteModel.find({userID:req.body.userID});
        res.send(notes)
    } catch (error) {
        res.send({"msg":"Something went wrong in notes get route"})
    }
})

noterouter.post("/create",async(req,res)=>{
    const data = req.body;
    try {
        const notes = new NoteModel(data);
        await notes.save();
        res.send("Created the note")
    } catch (error) {
        console.log(err);
        res.send({"msg":"Something went wrong"})
    }
})

noterouter.patch("/update/:id",async(req,res)=>{
    const data = req.body;
    const id = req.params.id
    const note=await NoteModel.findOne({"_id":id})
    const userid_in_note = note.userID
    const useerid_in_req = req.body.userID
    // console.log(data)
    try {
        if(userid_in_note === useerid_in_req){
            await NoteModel.findByIdAndUpdate({_id:id},data);
            res.send("Note Updated Successfully")
        }else{
            res.send("Not Authorized")
        }
        
    } catch (error) {
        res.send({"err":"Something went wrong in note update"})
    }
})

noterouter.put("/update/:id",async(req,res)=>{
    const data = req.body;
    const id = req.params.id
    const note=await NoteModel.findOne({"_id":id})
    const userid_in_note = note.userID
    const useerid_in_req = req.body.userID
    // console.log(data)
    try {
        if(userid_in_note === useerid_in_req){
            await NoteModel.findOneAndReplace({_id:id},data);
            res.send("Note Replaced Successfully")
        }else{
            res.send("Not Authorized")
        }
        
    } catch (error) {
        res.send({"err":"Something went wrong in note update"})
    }
})


noterouter.delete("/delete/:id",async(req,res)=>{
    const id = req.params.id
    const note=await NoteModel.findOne({"_id":id})
    const userid_in_note = note.userID
    const useerid_in_req = req.body.userID
    // console.log(data)
    try {
        if(userid_in_note === useerid_in_req){
            await NoteModel.findByIdAndDelete({_id:id});
            res.send("Note Deleted Successfully")
        }else{
            res.send("Not Authorized")
        }
        
    } catch (error) {
        res.send({"err":"Something went wrong in note update"})
    }
})


module.exports={
    noterouter
}