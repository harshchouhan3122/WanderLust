const express = require("express");
const router = express.Router();
const User = require("../models/user.js");

const ExpressError = require("../utils/ExpressError.js");
const wrapAsync = require("../utils/wrapAsync.js");

// To Open the form -> SignUp GET request
router.get("/signup", (req, res, next) => {
    res.render("./users/signup.ejs");
});

// To register the User -> SignUp POST request
router.post("/signup", wrapAsync( async (req, res, next) => {
    try{
        let { username, email, password } = req.body;
        // res.send(email);
        const newUser = new User({email, username});
    
        let registeredUser = await User.register(newUser, password);     //to register new user, also checks the username is unique or not
        // res.send(registeredUser);
    
        req.flash("success", "Welcome to WanderLust!");
    
        // console.log(`User Registered Successfully! -> ${registeredUser.username}, ${registeredUser.email}, ${registeredUser.hash}`); //hash is a hashed password
        console.log(`User Registered Successfully! -> ${registeredUser.username}, ${registeredUser.email}`);
        res.redirect("/listings");

    } catch (e) {
        req.flash("error", e.message);
        console.log(`Error -> ${e.message}.`);
        res.redirect("/signup");
    }

}));





module.exports = router;