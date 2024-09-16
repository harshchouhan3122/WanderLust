// main backend File (Ist main File)

const express = require("express");
const app = express();
const mongoose = require("mongoose");

const PORT = 3000;

const Listing = require("./models/listing.js");
const path = require("path");




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


// for index.ejs 
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// Create Route
app.get("/listings", async (req, res) => {
    const allListings = await Listing.find({});
    // console.log(allListings);
    console.log("Data Imported Successfully from the DB...");
    // res.send(allListings);
    res.render("listings/index.ejs", {allListings});
});

// Start Server
app.listen(PORT, ()=>{
    console.log(`Server is listening to PORT: ${PORT}`);
});