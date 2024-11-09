const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const passport = require("passport");

const ExpressError = require("../utils/ExpressError.js");
const wrapAsync = require("../utils/wrapAsync.js");

const { saveRedirectUrl } = require("../middleware.js");

const userController = require("../controllers/users.js")

// SIGNUP ROUTES

// To Open the form -> SignUp GET request
// router.get("/signup", (req, res, next) => {
//     res.render("./users/signup.ejs");
// });


// To register the User -> SignUp POST request
// router.post("/signup", wrapAsync( async (req, res, next) => {
//     try{
//         let { username, email, password } = req.body;
//         // res.send(email);
//         const newUser = new User({email, username});
    
//         let registeredUser = await User.register(newUser, password);     //to register new user, also checks the username is unique or not
//         // res.send(registeredUser);
    
//         // Auto Login after Signup
//         req.login(registeredUser, (err) => {
//             if (err) {
//                 return next(err);
//             };

//             req.flash("success", "Welcome to WanderLust!");
//             // console.log(`User Registered Successfully! -> ${registeredUser.username}, ${registeredUser.email}, ${registeredUser.hash}`); //hash is a hashed password
//             console.log(`User Registered Successfully! -> ${registeredUser.username}, ${registeredUser.email}`);
//             res.redirect("/listings");
//         });

//     } catch (e) {
//         req.flash("error", e.message);
//         console.log(`Error -> ${e.message}.`);
//         res.redirect("/signup");
//     }

// }));



// LOGIN ROUTES

// GET -> To open the Login form
// router.get("/login", (req, res, next) => {
//     res.render("./users/login.ejs");
// });


// // POST -> To authenticate the user through login -> passport.authenticate() is middleware used for authentication
// router.post("/login", saveRedirectUrl , passport.authenticate("local", { failureRedirect: "/login", failureFlash: true }), 
// async(req, res) => {
//     req.flash("success", "Welcome back to WanderLust !");
//     console.log("User Logged in Successfully!");
//     // res.redirect("/listings");

//     // let redirectUrl = req.locals.redirectUrl || "/listings";
//     // console.log(res.session.redirectUrl);
//     console.log(res.locals.redirectUrl);
//     let redirectUrl = res.locals.redirectUrl || "/listings";
//     res.redirect(redirectUrl);
//     }
// );


// router.post("/login", (req, res, next) => {
//     // Call saveRedirectUrl first
//     saveRedirectUrl(req, res, () => {
//         // Now call passport.authenticate
//         passport.authenticate("local", { failureRedirect: "/login", failureFlash: true })(req, res, next);
//     });
// }, async (req, res) => {
//     req.flash("success", "Welcome back to WanderLust!");
//     console.log("User Logged in Successfully!");

//     // Use the saved redirect URL or default to "/listings"
//     let redirectUrl = res.locals.redirectUrl || "/listings";
//     res.redirect(redirectUrl);
// });

// Logout User (IMPORTANT)  - GET
// router.get("/logout", (req, res, next) => {
//     req.logout((err) => {
//         if (err) {
//             return next(err);
//         }
        
//         req.flash("success", "You are Logged out!");
//         // console.log(` ${req.user.username} User Logged Out");
//         res.redirect("/listings");
//     });
// });

// SignUp
router.get("/signup", userController.renderSignupForm);
router.post("/signup", wrapAsync( userController.signup));
// Login
router.get("/login", userController.renderLoginForm);
router.post("/login", saveRedirectUrl , passport.authenticate("local", { failureRedirect: "/login", failureFlash: true }), userController.login);
// Logout
router.get("/logout", userController.logout);



module.exports = router;