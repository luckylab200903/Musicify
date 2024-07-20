const mongoose = require("mongoose");
const User=require("./userModel.js")
const songSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    thumbnail:{
        type:String,
        required:true
    },
    track:{
        type:String,
        required:true
    },
    artist:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    }
});

const songModel = mongoose.model("Song", songSchema);
module.exports = songModel;
