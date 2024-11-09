const express = require("express");
const router = express.Router({ mergeParams: true });

// const ExpressError = require("../utils/ExpressError.js");
const wrapAsync = require("../utils/wrapAsync.js");

const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
// const { validateReview } = require("../schema.js");
const { validReview, isLoggedIn, isReviewAuthor } = require("../middleware.js");

const reviewController = require("../controllers/reviews.js");


// Create Middleware to validate review -> Moved to middleware.js
// const validReview = (req,res,next) => {
//     const { error } = validateReview.validate(req.body);
//     if (error) {
//         let errMsg = error.details.map((el) => el.message).join(",");
//         throw new ExpressError(400, errMsg);
//     } else {
//         next();
//     }
// };


// REVIEWS Route form new Review
// router.post("/listings/:id/reviews", validReview, wrapAsync( async (req, res, next) => {
// router.post("/", isLoggedIn, validReview, wrapAsync( async (req, res, next) => {
    
//     let listing = await Listing.findById(req.params.id);
//     // console.log(req.body.review);
//     let newReview = new Review(req.body.review);

//     // Save the createdBy field with this newListing as currUser
//     newReview.createdBy = req.user._id;

//     listing.reviews.push(newReview);

//     await newReview.save();
//     await listing.save();

//     console.log("New review Saved...");
//     // res.redirect(`/listings/${listing._id}`);
//     req.flash("success", "New Review Added !");
//     res.redirect(`/listings/${listing._id}`);
// }));

// REVIEW DELETE Route
// router.delete("/:reviewId", isLoggedIn, isReviewAuthor ,wrapAsync( async (req, res, next) => {
//     // console.log("Restructured");
//     let { id, reviewId } = req.params;

//     await Listing.findByIdAndUpdate(id, {pull: {reviews: reviewId}});   //Updating the reviews array of Listing
//     await Review.findByIdAndDelete(reviewId);

//     console.log("Review Deleted...");
//     // res.redirect(`/listings/${id}`);
//     req.flash("success", "Review Deleted !");
//     res.redirect(`/listings/${id}`);
// }));


// REVIEWS Route form new Review
// router.post("/listings/:id/reviews", validReview, wrapAsync( async (req, res, next) => {
    router.post("/", isLoggedIn, validReview, wrapAsync( reviewController.createReview ));

    // REVIEW DELETE Route
    router.delete("/:reviewId", isLoggedIn, isReviewAuthor ,wrapAsync( reviewController.deleteReview ));

module.exports = router;