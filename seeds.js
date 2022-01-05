

var mongoose = require("mongoose");
var dishes    = require("./models/dishes.js");
var comment   = require("./models/comment.js");
 
var data = [
    
    {
        title: "Lasagna", 
        image: "https://www.holidify.com/images/cmsuploads/compressed/9dd2e32b-613d-4515-9597-39ba6ad86b8b_20181227134422.jpg",
        description:"Italy's lasagna takes over Pizza to be added in the world's best food dishes list because of its comeback. It is one of the oldest pasta but has become popular only in the present times. The ingredients itself sound mouthwatering - meats, pasta, vegetables, tomato sauce, and lots and lots of cheese. Lasagne (plural form for Lasagna) is loved by people of all ages and is dish ideal for any occasion or celebration.",
        veg:false,
        price:650
    
    },
    {
        title: "Sushi", 
        image: "https://www.holidify.com/images/cmsuploads/compressed/c700x420_20181227132950.jpg",
        description:"Prepared with vinegared rice and a wide range of ingredients including seafood, vegetables, and sometimes fruits. Sushi tastes best when served with wasabi, pickled ginger, and soy sauce. A popular garnish for this dish is Daikon radish. The type of fish in it defines a sushi's taste. However, the vinegared rice gives the dish a tangy taste overall. Tuna, eel, and Salmon tend to have a light flavour while octopus flavoured sushi is generally strong in taste",
        veg:false,
        price:500

    },
    {
        title: "Apfelstrudel", 
        image: "https://www.holidify.com/images/cmsuploads/compressed/48824979_20181227134147.jpg",
        description: "More commonly known as Apple Strudel, Apfelstrudel is a popular pastry in Austria and other parts of Europe. The dish consists of an oval strudel pastry cover with mouthwatering apple filling inside. The apple filling is prepared with grated apples, cinnamon, sugar, breadcrumbs, and raisins. This delicacy tastes best when served with vanilla ice cream and whipped cream. You can experiment with vanilla sauce instead of ice cream and custard instead of cream to try new flavours. Apfelstrudel can be served any time accompanied by coffee, tea, or even champagne and is widely found at Viennese cafes.",
        veg:true,
        price:500
    },
    {
        title: "Dosa", 
        image: "https://www.holidify.com/images/cmsuploads/compressed/Featured-image-masala-dosa-recipe_20181227134705.jpg",
        description: "To put it in simple terms, dosa is a type of pancake made from fermented rice batter. The dish looks like a crepe and the main ingredients are black gram and rice. Earlier, Dosa was prominent only in South India and Sri Lanka. It is now a well-known dish in India and all over the world. It is usually filled with various stuffings with potato being the main ingredient for the stuffing. Dosa is served along with chutneys and sambar (vegetable stew)",
        veg:true,
        price:500
    }
]
 
function seedDB(){
   //Remove all campgrounds
   dishes.deleteMany({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed dishes!");
        comment.deleteMany({}, function(err) {
            if(err){
                console.log(err);
            }
            console.log("removed comments!");
             //add a few campgrounds
            data.forEach(function(seed){
                dishes.create(seed, function(err,dish){
                    if(err){
                        console.log(err)
                    } else {
                        
                        console.log("added a dish");
                        //create a comment
                        comment.create(
                            {
                                content: "This is the best dish  I have ever had",
                                author: "ANSH"
                            },function(err, comment){
                                if(err){
                                    console.log(err);
                                } else {
                                    dish.comment.push(comment);
                                
                                    dish.save((err)=>{
                                    if(err)
                                    {
                                        console.log("error aarih hhhh");
                                        
                                    }else{
                                        console.log("created comment");
                                        
                                    }
                                   });
                                    
                                }
                            });
                    }
                });
            });
        });
    }); 
}
 
module.exports = seedDB;