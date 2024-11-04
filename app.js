// main backend File (Ist main File)

const express = require("express");
const app = express();
const mongoose = require("mongoose");

const PORT = 3000;

const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");

const ejsMate = require("ejs-mate");

const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");

const { validateListing, validateReview } = require("./schema.js");

const Review = require("./models/review.js");


app.use(express.urlencoded({extended:true}))                    // to get the parameters from the query String 
app.use(methodOverride("_method"));                             //for PUT request in UPDATE Route
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));       //for CSS styling


// for index.ejs 
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// sessions for auto login functionality
const session = require("express-session");

// connect-flash for alert messages
const flash = require("connect-flash");
const sessionOptions = {
    secret: "secretCode",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + (7 * 24 * 60 * 60 * 1000), //for 1 week , this function returns in millisec
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    },
};







// Import Listing Routes (Restructuring Request Paths)
const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");


// Connect Databse
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust"

async function main() {
    await mongoose.connect(MONGO_URL);
}

main().then(()=>{
    console.log("Connected to DB....");
})
.catch((err)=>{
    console.log(`Error Occurred: ${err}`)
})


// use it before the using the routes
app.use(session(sessionOptions));
app.use(flash());

// Root Directory
app.get("/", (req, res)=>{
    res.send("Server is working....");
});

// middleware for flash messages
app.use((req, res, next) => {
    res.locals.successMsg = req.flash("success");
    // res.locals.errorMsg = req.flash("error");
    next();
});

// Restructured Listings and reviews and then import there paths
app.use("/listings", listings);
app.use("/listings/:id/reviews", reviews);







// ERROR HANDELING

// If the request isn't match with the above paths/ routes
app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page Not Found !"));
});


// Custom Error Handler after all the routes
app.use((err, req, res, next) => {
    let { statusCode = 500, message="Something Went Wrong!!" } = err;

    console.log(`/// ERROR OCCURED ///  -> ${message}`);
    // console.log(`ERROR OCCURED: ${err.stack}`);
    res.status(statusCode).render("error.ejs", { err });
});




// Start Server
app.listen(PORT, ()=>{
    console.log(`Server is listening to PORT: ${PORT}`);
});