const mongoose = require("mongoose");

const notesSchema = mongoose.Schema({
    title:String,
    note:String,
    category:String,
    userID:String
},{
    versionKey:false
})

const NoteModel = mongoose.model("notes",notesSchema);

module.exports={
    NoteModel
}