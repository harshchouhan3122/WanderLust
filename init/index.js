// this file is used to intialize the Data

const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

async function main(){
    await mongoose.connect(MONGO_URL);
};

main().then(()=>console.log("Connected to DB....")).catch((err)=>console.log(err));

const initDB = async() => {
    // Delete the existing DB
    await Listing.deleteMany({});
    // Create Owner of the listing
    initData.data = initData.data.map((obj) => ({...obj, owner: "672c95cab23b5992ce25827b"}));   //idof the owner, create a user first in the database
    // Create the DB of data.js
    await Listing.insertMany(initData.data);
    
    // console.log(initData.data);
    console.log("Data Initialized Successfully.....");
}

initDB();