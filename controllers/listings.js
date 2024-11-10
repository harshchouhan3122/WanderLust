const Listing = require("../models/listing");

// Index Route (All Listings)
module.exports.index = async (req, res, next) => {
    const allListings = await Listing.find({});
    // console.log(allListings);
    console.log("All Listings from the DB...");
    // res.send(allListings);
    res.render("listings/index.ejs", {allListings});
};

// Render New Form for new Listing
module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
    console.log("Loading Form to Create new Listing...");
};

// Create Route (Save new Listing)
module.exports.addListing = async(req, res, next) => {
    let url = req.file.path;
    let filename = req.file.filename;
    // console.log(url, filename);

    const newListing = new Listing(req.body.listing);
    // console.log(req.user);
    newListing.owner = req.user._id;    //current user is the owner of this new listing
    newListing.image = {url, filename}; // save the url and filename in mongoDB from Cloudinary
    await newListing.save();

    console.log("New Listing Added Successfully...");
    req.flash("success", "New listing Added Successfully !");
    res.redirect("/listings");

};

// Show Route
module.exports.showListing = async (req, res, next) => {
    let { id } = req.params;
    // let listing = await Listing.findById(id).populate("reviews").populate("owner");

    // Nested Populate for display username with review
    let listing = await Listing.findById(id)
                    .populate({
                        path: "reviews",
                        populate: {
                            path: "createdBy"
                        },
                    })
                    .populate("owner");

    // console.log(req.user);
    // console.log(listing.owner._id);
    if (listing){
        res.render("listings/show.ejs", {listing});

    } else{
        console.log("Listing not found...");
        req.flash("error", "Requested Listing not found !");
        res.redirect("/listings"); 
    }

    console.log("Listing available...");
};

// Edit Route
module.exports.renderEditForm = async (req, res, next) => {
    let {id} = req.params;
    let listing = await Listing.findById(id);
    // console.log(listing);

    if (listing){
        console.log('Loading Form to Edit Listing......')
        res.render("listings/edit.ejs", {listing});

    } else{
        console.log("Listing not found...");
        req.flash("error", "Requested Listing not found !");
        res.redirect("/listings"); 
    }
};

// Update Route
module.exports.updateListing = async(req, res, next) => {

    let { id } = req.params;

    // We created middleware isOwner for below commented code
    // let listing = await Listing.findById(id);
    // if (!listing.owner._id.equals(req.user._id)){
    //     req.flash("error", "You don't have permission to edit this listing.");
    //     console.log("Unautherized Persion trying to Edit the Listing.")
    //     return res.redirect(`/listings/${id}`); 
    // } 
    
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing}); 
    // console.log({ ...req.body.listing});

    // If we get the file in edit form then only we are going to extract url and filename from the form
    if (typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = {url, filename};
    
        await listing.save();
    }

    req.flash("success", "Listing Updated !");
    res.redirect(`/listings/${id}`);
    console.log("Listing Edited and Updated Successfully...");
};

// Delete Route / Destroy Route
module.exports.deleteListing = async (req, res, next) => {
    let { id } = req.params;
    let result = await Listing.findByIdAndDelete(id);
    
    console.log(`Listing Deleted... -> ${result.title},${result.location},${result.country}`);
    req.flash("success", "Listing Deleted !")
    res.redirect('/listings');
};

