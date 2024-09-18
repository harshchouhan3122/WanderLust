// main backend File (Ist main File)

const express = require("express");
const app = express();
const mongoose = require("mongoose");

const PORT = 3000;

const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");

app.use(express.urlencoded({extended:true}))            // to get the parameters from the query String 
app.use(methodOverride("_method"));                      //for PUT request in UPDATE Route


// for index.ejs 
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));





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

// Test Listings Model after creating the listing.js
// app.get("/testListings", async(req, res) => {
//     // res.send("Listing...");

//     let sampleListing = new Listing({
//         title: "My new Villa",
//         description: "By the Beach",
//         price: 12000,
//         location: "Nagpur, MH",
//         country: "India"
//     });

//     await sampleListing.save();

//     console.log("SampleData Saved...")
//     res.send("Sample Data Saved Successfully...")
// })






// Create Route (Index Route)
app.get("/listings", async (req, res) => {
    const allListings = await Listing.find({});
    // console.log(allListings);
    console.log("All Listings from the DB...");
    // res.send(allListings);
    res.render("listings/index.ejs", {allListings});
});


// CREATE ROUTE (new and create)  -> Always be above than READ route
// Open form for this route
app.get("/listings/new", (req, res) => {
    res.render("listings/new.ejs");

    console.log("Create new Listing...");
})

// Add New Listing to DB
app.post("/listings", async(req, res) => {
    // const {title, description, price, country, etc...} = req.body;
    const newListing = new Listing(req.body.listing);
    await newListing.save();

    console.log("New Listing Added Successfully...");
    res.redirect("/listings");

})


//READ (Show Route)
app.get("/listings/:id", async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    res.render("listings/show.ejs", {listing});

    console.log("Listing available...");
})


// EDIT route
app.get("/listings/:id/edit", async (req, res) => {
    let {id} = req.params;
    let listing = await Listing.findById(id);
    // console.log(listing);

    console.log('Edit your Listing...')
    res.render("edit.ejs", {listing});
})

// UPDATE Route
app.put("/listings/:id", async(req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing}); 

    res.redirect(`/listings/${id}`);
    console.log("Listing Edited Successfully...");
})


// DELETE Route
app.delete("/listings/:id", async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);

    console.log("Listing Deleted...");
    res.redirect('/listings');
})


// Start Server
app.listen(PORT, ()=>{
    console.log(`Server is listening to PORT: ${PORT}`);
});