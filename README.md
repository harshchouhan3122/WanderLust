# Major Project - Airbnb Website

    - cmd to project folder
    - nodemon app.js -> to start the server
    - start mongosh
        - use wanderlust
    - Ctrl + C -> to stop the server

    - NOTE: Stop the server before installing any additional package of npm


## Phase 1 -> Part a (Database Setup and CRUD APIs)

### Installation
    - npm init
    - npm i express
    - npm i ejs
    - npm i mongoose
    - code app.js

### Basic Setup 
    - Basic Template of app.js
        - Server Start 
        - Root Directory
    
    - Connect Database
        - Start services of Mongoose (mongosh) first
        - edit app.js with MONGO_URL and create main() function for db connection

    - Basic DB Commands
        - show dbs
        - use wanderlust, use test
        - show collections (Show Tables)
        - db.listings.count() -> no. of collections (rows)
        - db.collection.insertMany()
            - db.student.insertMany([{name:"Rohan", marks:79, city:"Delhi"}, {name:"Mohan",marks:45}])
        - db.student.find()
            - db.collection.find({city: {$in : ["Delhi", "Mumbai"]}, marks: {$gt:75} })
        - db.student.updateOne( {name:"Harsh"}, {$set: {marks:95} } )
        - db.student.replaceOne( {name:"bob"}, { name:"Harsh", marks:79, state:"Haryana"} )
        - db.collection.deleteMany(<filter>, <options>)
        - db.dropDatabase()
        - db.student.deleteMany( {} )
            -> Model.findByIdAndDelete()


### Listing Model
    - Basic info of Apartment, Villa, Farm House
        - title         -> string
        - description   -> string   
        - image         -> string (URL)
        - price         -> number
        - location      -> string 
        - county        -> string

    - Create a folder -> Models
        - then create Model inside it (Schema of the DB)
        - create listing.js

        - app.js (Entry Point)
        - listing.js
            - create a Database Schema
        - index.js
            - Initialise the Database (delete and then create)
        - data.js for the Dumy data (given Below)

### Sample database for DB
    - Download File for the Data:  https://github.com/apna-college/wanderlust
    - Repo for the project: https://github.com/apna-college/wanderlust/blob/main/init/data.js

### Initialize Database (Changes required in the Schema or You have to change the data.js)
    - create init folder
        - create data.js 
            - copy the content from the sampleListings given data
            - it will export the dummy data to index.js
        - index.js 
            - it will intialise the dummy data (first delete and then create)

        
### Index Route
    - Basic Structure
        - GET   -> /listings -> allListings
        - GET   -> /listings/:id    -> view specific listing data

    - app.js -> /listing

    - Setup index.js
        - require path
        - create folder -> views
            - create index.ejs for rendering the Listings

    - app.js
        - app.set("view engine", "ejs");
        - app.set("views", path.join(__dirname, "views"));

        - res.render("listings/index.ejs");


### READ (Show Route)
    - app.use(express.urlencoded({extended:true}))

    - app.get("/listings/:id)
        - Listing.findById(id);
        - res.render("listings/show.ejs");

    - num.toLocaleString("en-IN") -> to convert the number into indian number system


### CREATE (New & Create Route)
    - GET   ->  /listings/new   -> Open Form
    - POST  ->  /listings       <- Submit

    - create new.ejs -> for Form for New Listing

    - index.ejs -> add button in the form (PREFER TO USE FORM FOR THE BUTTON)
        -> method="GET" action="/listing/new"
    
    - app.get("/listings/new", (req, res) => {
        res.render("listings/new")
    })


    -IMP: KEEP THE BELOW ROUTE ABOVE THAN READ ROUTE otherwise it will consider the new as id and shows error
    - app.post("/listings", async (req, res) => {

        <!-- let {title, description, price, country, etc...} = req.body; -->
                                    OR 
        <!-- You can change the name field of the new.ejs form as listing{title} -->
        let listing = req.body.listing;

        let newListing = new Listing(listing);
        await newListing.save();

        res.redirect("/listings");

    })


### UPDATE (Edit & Update Route)
    - npm i method-override

    - app.js
        - const methodOverride = require("method-override");
        - app.use(methodOverride("_method"));
        - await Listing.findByIdAndUpdate(id, { ...req.body.listing});
    
    - edit.ejs
        - <form method="POST" action="/listings/<%=listing._id%>?_method=PUT">


### DELETE Route
    - show.ejs 
        - Create a Delete Button under a new form

    - app.js
        - await Listing.findByIdAndDelete(id);






## Phase 1 -> Part b (Styling)

### Creating BoilerPlate
    - EJS mate
        - it helps to create templates so that you can use that one in other EJS files
            - Navbar, Footer etc
            - Its like REACT

        - https://www.npmjs.com/package/ejs-mate?activeTab=readme
        - npm i ejs-mate
        - const ejsMate = require("ejs-mate");
        - app.engine("ejs", ejsMate);

    - Create layouts folder inside views folder
        - create boilerplate.ejs (common code in every other file)

    - Create public folder in root directory
        - create css folder
            style.css

        - app.js
            - app.use(express.static(path.join(__dirname, "/public")));

### Creating Navbar
    - include bootstrap as cdn
    - also include js styling
    - then include the code of simple navbar from the official website

    - Create include folder inside the views folder
        - create navbar.ejs
    
    - boilerplate.ejs
        - <%- include("../includes/navbar.ejs") %>

    #### ICONS
        - fontawesome (https://fontawesome.com/icons)
        - include cdn of font awesome
            - paste it oin the boilerplate.ejs
                - <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css" integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
        - manual Styling
        - <nav class="navbar navbar-expand-md bg-body-light border-bottom sticky-top">

### Creating Footer
    - styling footer from bootstrap
    #### Stick the footer at the bottom of the page
    - style.css
        - body {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
        }
        .container{
            flex: 1;
        } 

### Styling Index (Home Page where All Listings are Shown)
    - Cards using bootstrap

    #### Fonts 
        - https://fonts.google.com/?query=Plus+Jakarta
            - boilerplate.ejs
                - add links
            - style.css
                - body add font family

    - add card
    - responsive row
    - card height width
    - google fonts
    - card selection functionality
    - card overlay

### Styling New Listing (Form Page)
    - https://getbootstrap.com/docs/5.3/forms/form-control/

    - add label
    - add class form-control and form-label
        <div class="mb-4">
            <label for="price" class="form-label">Price</label>
            <input class="form-control" type="number" name="listing[price]" placeholder="price">
        </div>
    - footer stick to bottom
    - add-btn color change

### Styling Edit Listing page
    - convert edit.ejs as new.ejs and add following class
        - form-control
        - form-label
    
### Styling Show Listing page
    - Using card Component from the Bootstrap





## Phase 1 -> Part c (Error Handeling)

### Client Side Validation (Form)   -> new.ejs      -> Frontend Form Validations
    #### Form Validation
    - When we eneter the data in the form, the browser and /or the web server will check to see that the data is in the correct format and within the constraints set by the application.

    - Required
        - Title, Location Price etc

    - We are going to design standard website for all the browsers so use bootstrap required
        - https://getbootstrap.com/docs/5.3/forms/validation/
        - class="needs-validation", nonvalidate
        
        - Create js folder inside public forlder
            - Create script.js -> Javascript logical code (for new.js)
            - Add this js file to boilerplate.ejs or you can add it to edit.ejs and new.ejs only


### Success & Failure Text (Frontend Validations)
    - Explanation of the missing field in form validation
    - new.ejs
        - add new <div class="invalid-feedback"> Price should be valid. </div>
        - add new <div class="valid-feedback"> Title looks good! </div>

    - Also update the edit.ejs with these text and validations


### Custom Error Handling (Backend Validations)
    - Suppose you have directly calling the path/api from the postman/hoppscotch, for that we have to create Custom Error Handler becuase in previous two sections we have implemented the Frontend Form Validations.

    - app.js    (Define Error Handler Middlewares at the end)

        // Custom Error Handler
        app.use((err, req, res, next) => {
            console.log('Something went Wrong! ');
            res.send('Something went Wrong! ');
        });

        // Updated Create Route 1
        app.post("/listings", async(req, res, next) => {
            try {
                // const {title, description, price, country, etc...} = req.body;
                const newListing = new Listing(req.body.listing);
                await newListing.save();
                console.log("New Listing Added Successfully...");
                res.redirect("/listings");

            } catch (err) {
                next(err);
            }
        });


### Custom wrapAsync
    - Its a better way to write try-catch block for Async Error Handling. (Lecture 52: Custom Error Handling.)
    
    - Create utils folder in root directory
        - Store extra files here
        - Create wrapAsync.js
            module.exports = (fn) => {
                return (req, res, next) => {
                    // fn(req, res, next).catch((err) => next(err));
                    fn(req, res, next).catch(next);
                }
            };

        - app.js
            const wrapAsync = require("./utils/wrapAsync.js");

            // Updated Create Route 2
            app.post("/listings", wrapAsync (async(req, res, next) => {
                // const {title, description, price, country, etc...} = req.body;
                const newListing = new Listing(req.body.listing);
                await newListing.save();

                console.log("New Listing Added Successfully...");
                res.redirect("/listings");
                })
            );


### Add ExpressError (Lecture 52)
    - Create ExpressError.js inside the utils folder for the Custom Error Class
        class ExpressError extends Error {
            constructor(status, message) {
                super();
                this.statusCode = status;
                this.message = message;
            }
        };
        module.exports = ExpressError;

    - app.js
        const ExpressError = require("./utils/ExpressError.js");

        app.all("*", (req, res, next) => {
            next(new ExpressError(404, "Page Not Found !"));
        });


        // Custom Error Handler
        app.use((err, req, res, next) => {
            // console.log('Something went Wrong! ');
            // res.send('Something went Wrong! ');

            let { statusCode = 500, message="Something Went Wrong!!" } = err;
            res.status(statusCode).send(message);
        });

    - update all the async function with wrapAsync in app.js    -> (req, res, next) no next

    - update post request of listings and update route also
        if (!req.body.listing) {
            throw new ExpressError(400, "Send a valid data for Listing.");
        };



### Error.ejs
    - Create error.ejs inside the views folder and use bootsrap to create it 
    
    - error.ejs
        < layout('/layouts/boilerplate') -%>
        <div class="row">
            <div class="alert alert-danger col-6 offset-3" role="alert">
                <h5> <%= err.message %> </h5>
                <!-- <p> <= err.stack %> </p> -->
            </div>
        </div>

    - app.js
        // Custom Error Handler
        app.use((err, req, res, next) => {
            // console.log('Something went Wrong! ');
            // res.send('Something went Wrong! ');

            let { statusCode = 500, message="Something Went Wrong!!" } = err;
            // res.status(statusCode).send(message);

            console.log(`ERROR OCCURED: ${message}`);
            // console.log(`ERROR OCCURED: ${err.stack}`);
            res.status(statusCode).render("error.ejs", { err });
        });


### Validation for Schema (using JOI dev tool)
    - Currently we are able to make the POST request to change the db using hoppscotch or postman without any error (without providing required fields, since we have validate the frontend of the form till now)

    - for that missmanagement of missed fields , we have to validate the Schema before saving the data in db

    - app.js (NEW ROUTE/ CREATE ROUTE)
        // Error Handling if the list object not contains the required field according to the schema    -> Not a good way to write it as this, So we use JOI DEV TOOL
        // if (!newListing.title) {
        //     throw new ExpressError(400, "Title is missing.");
        // };
        // if (!newListing.price) {
        //     throw new ExpressError(400, "Price is missing.");
        // };
        // if (!newListing.description) {
        //     throw new ExpressError(400, "Description is missing.");
        // };

    #### (Important)
    - JOI Tool  (https://www.npmjs.com/package/joi)
        -> Used for object schema validation, Data validator for the javascript
        -> Its a npm module (Example: https://joi.dev/api/?v=17.13.3)
        
        -> npm install joi

    - Create schema.js in the root directory
        - schema.js -> Define the Schema for the Server Side Validation using example https://joi.dev/api/?v=17.13.3

            const Joi = require('joi');
            const validateListing = Joi.object({
                listing: Joi.object({
                    title: Joi.string().required().messages({
                        'string.empty': 'Title is required.'
                    }),
                    description: Joi.string().required().messages({
                        'string.empty': 'Description is required.'
                    }),
                    price: Joi.number().required().min(0).messages({
                        'number.base': 'Price must be a valid number.',
                        'number.min': 'Price must be greater than or equal to 0.',
                        'any.required': 'Price is required.'
                    }),
                    country: Joi.string().required().messages({
                        'string.empty': 'Country is required.'
                    }),
                    location: Joi.string().required().messages({
                        'string.empty': 'Location is required.'
                    }),
                    image: Joi.object({
                        url: Joi.string().uri().allow('', null).messages({
                            'string.uri': 'Image URL must be a valid URI.'
                        }),
                        filename: Joi.string().allow('', null).optional() // Allow empty or null for optional filename
                    }).optional()

                }).required()
            });
            module.exports = { validateListing };


        - new.ejs
            <div class="mb-4">
                <label for="image" class="form-label">Image Link</label>
                <!-- <input class="form-control" type="text" name="listing{image}" placeholder="Enter image url"> -->
                <input class="form-control" type="url" name="listing[image][url]" placeholder="Enter image url">
            </div>


        - app.js
            - require, remove multiple if's, let result = listingSchema.validate(req.body);, if(result.error){throw new ExpressError(400,"result.error")};

            //const { listingSchema } = require("./schema.js");
            const { validateListing } = require("./schema.js");

            //Update Create Route (New Listing)
            let result = listingSchema.validate(req.body);       //Schema Validation using JOI
            console.log(result);

            const { error } = validateListing.validate(req.body);
            if (error) {
                throw new ExpressError(400, error.details[0].message);
            }

            - Update this validation for the EDIT Route


### Validation for Schema (writing Middleware)
    - We can create a function for this validation and call it whenever needed without defining everytime
    
    - app.js
        // Creating Middleware to validate Listing for Create and Update Route
        const checkListing = (req, res, next) => {
            const { error } = validateListing.validate(req.body);
            if (error) {
                throw new ExpressError(400, error.details[0].message);
            } else {
                next();
            }
        }

        - and then pass it as middleware in Create and Update Route





## Phase 2 -> Part a    (Creating Review Section)

### Handeling Deletion
    - Cascading of Deletion
        - Deleting other documents related to one document which we have to delete
        - Deleting Posts related to user Account when we dare deleting the user Account.

    - using Mongoose Middleware (Different from the express Middlewares) -> https://mongoosejs.com/docs/middleware.html
        - Currently we are focus on Query Middlewares


#### Use the customer.js from lecture no.54 Database relationships
    - Two Functions
        - Add customers
            const addCustomer= async() => {
                let newCust = new Customer({
                    name: "Karan Bhai",
                });
                await newCust.save();

                let newOrder = new Order({
                    item: "Pizza",
                    price: 550,
                });
                await newOrder.save();

                newCust.orders.push(newOrder);
                await newCust.save();

            };


        - Delete Customers
            const deleteCustomer = async() => {
                let data = await Customer.findByIdAndDelete("670f85d70e111c6f1e4c6ea6");
                console.log(data);
            };

### Mongoose middleware (https://mongoosejs.com/docs/middleware.html)
    - We have to use Mongoose middleware to delete the orders related to the customer which we have to delete. -> By using POST Query Mongoose Middleware

    - We can use two middleware
        - Pre -> run before the query is executed
        - Post -> run after the query is executed

    - findByIdAndDelete() triggers the mongoose middleware -> findOneAndDelete()
        - https://mongoosejs.com/docs/api/model.html#Model.findByIdAndDelete()
    

    - Mention the Pre and post Middlewares just after the Schema Defined.
        customerSchema.pre("findOneAndDelete", async() => {
            console.log("PRE Middleware Works....");
        });

#### Deleting all the Orders associated with the deleting customer
    // We wanna delete orders of deleted Customer
    customerSchema.post("findOneAndDelete", async(customer) => {
        // console.log(customer);
        if (customer.orders.length){
            let res = await Order.deleteMany({_id: {$in: customer.orders} });
            console.log(res);
        }
    });

    const deleteCustomer = async() => {
        let data = await Customer.findByIdAndDelete("670f8f998e92ede4c1262553");    //Customer ID
        console.log(data);
    };

    deleteCustomer();



### Creating Review Model (One to many Relationship)
    - Following data to be present in each review
        - comment (String)
        - rating (Number)
        - createdAt (date and time)

    - Create review.js inside the models folder
        const mongoose = require("mongoose");
        const Schema = mongoose.Schema;

        const reviewSchema = new Schema({
            comment: String,
            rating: {
                type: Number,
                min: 1,
                max: 5,
            },
            createdAt: {
                type: Date,
                default: Date.now(),
            },
        });

        module.exports = mongoose.model("Review",reviewSchema);
    
    - Edit listing.js inside model folder
        - Update the Schema with reviews section
        - Reviews -> One to Many Relation -> Using Array

            review: [
              {
                type: Schema.Types.ObjectId,
                ref: "Review",
              }
            ],
    
### Create review

#### Setting up the Review Form (Step 1)
    - Review Form -> Adding this section below the listing details in show.ejs page

#### Submitting the Reviw form (Step 2) -> Backend
    - POST /listings/:id/reviews
    - Edit app.js
        - const Review = require("./models/review.js");
        - Create Review POST request

        // REVIEWS Route
        app.post("/listings/:id/reviews", wrapAsync( async (req, res, next) => {
        
            let listing = await Listing.findById(req.params.id);
            // console.log(req.body.review);
            let newReview = new Review(req.body.review);

            listing.reviews.push(newReview);

            await newReview.save();
            await listing.save();

            console.log("New review Saved...");
            res.redirect(`/listings/${listing._id}`);
        }));


#### Validation for Reviews (Client Side and Server Side both)

    - Cliend Side Validation
        - textarea -> required
        - apply bootstrap form validation -> Class="needs-validation"
            -                     <form action="/listings/<=listing.id%>/reviews" method="POST" novalidate class="needs-validation">

        - logic of this need-validation is in script.js in public folder

        - show.ejs
        <div class="invalid-feedback">
            Please add some comments for review.
        </div>


    - Server Side Validation
        - Send a request using hoppscotch having no comment and no rating, It will save the review at the DB which is not good,
        to avoid this situation we can do Server side Validation
        - JOI schema -> function to validate schema -> pass this func as middleware to Review Route
            - edit schema.js    -> add validateReview Joi Schema
            - edit app.js       -> require validateReview then create validReview function and then pass it to Review Route as middleware
            - check the functionality using hoppscotch.io


### Render Reviews (to display reviews)
    - Edit show.ejs
        <h5 class="mb-3">All Reviews</h5>
        <ul>
            <% for(review of listing.reviews ) { %>
                <li> <%= review.comment %>, <%= review.rating %> star </li> 
            <% } %>
        </ul>

    - edit app.js
        - update Show Route
            let listing = await Listing.findById(id).populate("reviews");

#### Styling Reviews
    - Bootstrap cards to show reviews
    - edit show.ejs
        - add review card
    - edit style.css
        - add reviewCard
        - change card to listing-card


### Deleting Reviews
    - Mongo $pull operator
    - Add delete button inside each review in show.ejs using another form
       <form method="POST" action="/listings/<= listing._id %>/reviews/<= review._id %>?method=DELETE" >
    
    - edit app.js
        // REVIEW DELETE Route
        app.delete("/listings/:id/reviews/    :reviewId", wrapAsync( async (req, res,next) => {
            let { id, reviewId } = req.params;

            await Listing.findByIdAndUpdate(id, {pull: {reviews: reviewId}});   //Updating the reviews array of Listing
            await Review.findByIdAndDelete(reviewId);

            console.log("Review Deleted...");
            res.redirect(`/listings/${id}`);
        }));


#### Deleting Listing
    - Delete reviews associated with the listing which we have to delete (handeling Deletion -> Phase 2 part a Mongoose Middlewares)
    - DELETE middleware for Reviews
        - POST Mongoose Middleware
        - edit  listings.js
            // POST Mongoose Middleware for deleting reviews of Listing
            listingSchema.post("findOneAndDelete", async(listing) => {
              if (listing) {
                await Review.deleteMany({_id: {$in: listing.reviews}})
              }
            });



## Phase 2 -> Part b    ()

### 