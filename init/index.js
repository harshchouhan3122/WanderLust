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
    // Create the DB of data.js
    await Listing.insertMany(initData.data);
    
    // console.log(initData.data);
    console.log("Data Initialized Successfully.....");
}

initDB();