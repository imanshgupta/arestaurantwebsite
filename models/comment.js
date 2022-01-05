var mongoose=require("mongoose");

var reviewschema=mongoose.Schema({
    author:String,
    content:String
    
})
module.exports=mongoose.model("comment",reviewschema);