var mongoose=require("mongoose");
var passportLocalMongoose=require("passport-local-mongoose");
//userschema
var userschema=new mongoose.Schema({
    username:String,
    password:String,
    isAdmin:{type:Boolean , default:false}
    
})

//to add functionalities of passport-local-schema
userschema.plugin(passportLocalMongoose);
module.exports=mongoose.model("user",userschema);
