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
// const { listingSchema } = require("./schema.js");
const { validateListing, validateReview } = require("./schema.js");

const Review = require("./models/review.js");


app.use(express.urlencoded({extended:true}))                    // to get the parameters from the query String 
app.use(methodOverride("_method"));                             //for PUT request in UPDATE Route
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));       //for CSS styling


// for index.ejs 
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


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


// Root Directory
app.get("/", (req, res)=>{
    res.send("Server is working....");
});


app.use("/listings", listings);
app.use("/listings/:id/reviews", reviews);



// If the request isn't match with the above paths
app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page Not Found !"));
});


// Custom Error Handler
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