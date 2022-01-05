var mongoose=require("mongoose");

var dish=mongoose.Schema({
    title:String,
    image:String,
    description:String,
    veg:Boolean,
    price:Number,
    comment:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"comment"
        }
           
    ]
})

module.exports=mongoose.model("dish",dish);
