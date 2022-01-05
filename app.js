var express               =require("express"),
    app                   =express(),
    mongoose              =require("mongoose"),
    bodyparser            =require("body-parser"),
    dishes                =require("./models/dishes"),
    comment               =require("./models/comment"),
    User                  =require("./models/user.js"),
    passport              =require("passport"),
    LocalStrategy         =require("passport-local"),
    passportLocalMongoose =require("passport-local-mongoose");
    seedDB                = require("./seeds")
   path = require("path");
//call the sedds function to predefine some data
    seedDB();
    app.set("view engine","ejs");
    app.use(bodyparser.urlencoded({extended:true}))
    app.use(bodyparser.json())

    app.use(express.static("public"));
    app.set('views', path.join(__dirname, './public/views'));
//----------------------------------------------------------for authentication
    app.use(require("express-session")({
        secret:"my name is ansh",//the decoder string
        resave:false,
        saveUninitialized:false
      }));
      
      passport.use(new LocalStrategy(User.authenticate()));
      app.use(passport.initialize());
      app.use(passport.session());

      
  //enccrypts and decrypts the data in session 
      passport.serializeUser(User.serializeUser());
      passport.deserializeUser(User.deserializeUser());

//------------------------------------------------------------------------------

const url = "mongodb+srv://ansh:ansh@cluster0.yd5lb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
//database connecion
        mongoose.connect(url,{useNewUrlParser: true ,useUnifiedTopology: true})
        .then(console.log("connected database"))
        .catch(err=>console.log(err))
    


//to get current user and send it to all the template
        app.use((req,res,next)=>{
            res.locals.currentuser=req.user;
            next();
        });


//------------------------------------------------------------------------------
    app.get("/",(req,res)=>{
        res.render("landing");
    });
    
    app.get("/home",(req,res)=>{
        res.render("home")
    })

    app.get("/about",(req,res)=>{

        res.render("about");
    })
    
    app.get("/menu",(req,res)=>{
        dishes.find({},(err,found)=>{
            res.render("menu",{data:found})
        })
    })

    app.get("/menu/adddish",(req,res)=>{
        res.render("adddish");
    })

    app.post("/menu/adddish",(req,res)=>{
        dishes.create(req.body.dish,(err,dish)=>{
            if(err){
                console.log(err);
                
            }else{
                res.redirect("/menu");
            }
        })
    })

    app.get("/menu/:id",isuserloggedin,(req,res)=>{
        dishes.findById(req.params.id).populate("comment").exec((err,found)=>{
            res.render("viewmore",{data:found})
        })
    })

    app.get("/contact",(req,res)=>{
        res.render("contact");
    })

    app.post("/menu/:id/comments/new",isuserloggedin,(req,res)=>{
        dishes.findById(req.params.id,(err,found)=>{
            comment.create(req.body.comm,(err,newcomm)=>{
                found.comment.push(newcomm);
                found.save();
            })
        })
        res.redirect("/menu/"+req.params.id)
    })
    
    //AUTHENTICATION ROUTES===================
    //user register==============
    
    app.get("/userregister",(req,res)=>{
        res.render("userregister");
    })

    app.post("/userregister",(req,res)=>{
        var newuser=new User({username:req.body.username});
        if(req.body.admincode ==='admin'){
            newuser.isAdmin=true;
        }
        User.register(newuser,req.body.password,(err,user)=>{
            
            if(err)
            {
                console.log(err);
                return res.render("userregister");
            }
            passport.authenticate("local")(req,res,()=>{
                res.redirect("/home")
            })
        })
    })
    //login routes==============
    app.get("/userlogin",(req,res)=>{
        res.render("userlogin");
    })
    app.post("/userlogin",passport.authenticate("local",{successRedirect:"/home",failureRedirect:"/userlogin"}),(req,res)=>{})


    //logout route========================
    app.get("/userlogout",(req,res)=>{
              req.logout();
              res.redirect("/")
          })

          
    //function to check is user logged in or not
        function isuserloggedin(req,res,next){
            if(req.isAuthenticated())
            {
                return next();
            }
            res.redirect("/userlogin");
        }


     //port formation
    var port=process.env.PORT||8000
    app.listen(port,()=>{
        console.log(`server running at http://localhost:${port}`);
   })
         

