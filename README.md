# Major Project - Airbnb Website

    - Download nodejs first -> https://nodejs.org/en
    - cmd to project folder
    - nodemon app.js -> to start the server
    - start mongosh
        - use wanderlust
    - Ctrl + C -> to stop the server

    - NOTE: Stop the server before installing any additional package of npm


## Phase 1 -> Part a (Database Setup and CRUD APIs)

### MongoDB Setup if not available
    - https://www.youtube.com/watch?v=h2x6BmUi5zQ (VIDEO)
    - https://www.mongodb.com/try/download/community (MONGODB)  -> msi
    - https://www.mongodb.com/try/download/shell (MONGO SHELL) -> zip
        - then from bin folder after extraction downloaded folder, pin to start the mongosh application

### Installation
    - npm install -> it will install all the dependencies mentioned in package.json
    - npm init  -> run index.js of init folder to initialized dummy data
    - npm i express ejs mongoose
    - code app.js

### Basic Setup 
    - Basic Template of app.js
        - Server Start 
        - Root Directory
    
    - Connect Database
        - Start services of Mongoose (mongosh) first
        - edit app.js with MONGO_URL and create main() function for db connection

    - Basic DB Commands on mongosh
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



## Phase 2 -> Part b    (Express Routes -> Restructuring routes(modulor code) & Cookies (Send/Parse/Signed))

### What is Express Router? (Important)

#### Express Router (https://expressjs.com/en/5x/api.html#router)
    - It is a way to organize our Express applications such that our primary app.js file does not become bloated.
    - const router = express.Router()   //creates new router

    - A router object is an instance of middleware and routes. You can think of it as a “mini-application,” capable only of performing middleware and routing functions. Every Express application has a built-in app router.

    - We can segregate the routes using Express Router
        - https://expressjs.com/en/5x/api.html#router


### Restructuring Listing Routes using Express Routes
    - Restructuring Listings (edit app.js)
        const listings = require("./routes/listing.js");
        app.use("/listings", listings)

    - Create Route folder in root Directory
        - Create listing.js inside Route Folder
            - Required all the requirements
            - Update path of request (remove listings from there)

            // Create Route (Index Route    -> to show all the listings)
            router.get("/", wrapAsync( async (req, res, next) => {
                const allListings = await Listing.find({});
                // console.log(allListings);
                console.log("All Listings from the DB...");
                // res.send(allListings);
                res.render("listings/index.ejs", {allListings});
            }) );

        - Update app.js file
            const listings = require("./routes/listing.js");
            app.use("/listings", listings)

        - Also create review.js inside routes and then move all the path request from app.js to review.js of reviews request


#### NOTE (merge params for review.js of routes)
    - https://expressjs.com/en/guide/routing.html
    - But if the parent route /birds has path parameters, it will not be accessible by default from the sub-routes. To make it accessible, you will need to pass the mergeParams option to the Router constructor reference.


    - app.use("/listings/:id/reviews", reviews);    // Its a parent route present in app.js, and it has :id parameter for which we have to use mergeParams
    - router.post("/", validReview, wrapAsync( async (req, res, next) => {}));    //Its a child route present in review.js

    const router = express.Router({ mergeParams: true })



### Cookies (Web Cookies)

#### Introduction
    - HTTP cookies/ Server Cookies/ Web Cookies are the small blocks of data created by a web server while a user is browsing a website and placed on the user's local pc or other device by the user's browser.
    - They are stored in Name Value pair
    - Inspect -> Application -> Cookies

    - Used to remember the user preferences and for personalization

    - We can use Cookies for the Authorization and Authentication purpose

#### Sending Cookies
    - Server send cookies to browser ((Name,Value) pair)

    - in Express
        app.get("/getCookies", (req, res) => {
            res.cookie("greet","namaste");
            res.cookie("made in","INDIA");
            res.send("We have sent you some cookies");
        });

#### Cookie Parser (Cookie Reader)
    - cookie-parser npm package (npm i cookie-parser)
        - middleware use to parse cookies

        - npm i cookie-parser
        - const cookieParser = require("cookie-parser")
        - app.use(cookieParser());
        
    - let { name = "anonymous" } = req.cookies;


#### Signed Cookies (https://expressjs.com/en/4x/api.html#res.cookie)
    - which is signed to avoid tempering of cookie (we can't use it to encode the cookie value)
    - Two Step Process
        - Send Signed Cookie
        - Verify Signed Cookie

##### Send Signed Cookie
    app.use(cookieParser("secret_code"));  

    app.get("/getSignedCookie", (req, res) => {
        res.cookie("color", "red", {signed: true});
        res.send("Done!");
    });

##### Verify Signed Cookie
    app.get("/verify", (req, res) => {
        res.send(req.signedCookies);    
        // It will return an empty object if the cookie is tempered and it will return false in the value if the value of the cookie was changed
    });

#### We will use this Cookie topic in Authentication and Autherization Section



## Phase 2  -> Part c   (Express Sessions, Storing Cookies (Autologin), Flashing Message Alerts)


### What is State ? 
    - Stateful Protocol 
        It require to save the status and sessions information in server.
        - ftp, bank login, secured

    - Stateless Protocol 
        It doesn't require server to retain the server information.
        - http, not secured, no tracking

### Express Sessions
    - Express Sessions are needed to make http requests stateful
    - An attempt to make our session stateful
    - Functionality to add items in the cart before login, it can be done by sessions/ session id
    - Express Session create a session id for the user along with some small amount of data
    - Cookie will store session id into the browser and then other data can be extracted using the session id from the server
    - Info saved in the cookie are not secure

#### Classroom Folder for the Express Session in Delta batch Folder
    - npm i express-session (https://www.npmjs.com/package/express-session) -> "secret" subtopic on page

    - create /test route to check the session id cookie on browser

### Exploring Express Sessions
    - Create Express Session in server.js in Classroom folder of the course
    app.get("/test", (req, res) => {
        // res.send("Test Seccessful. ");
        if(req.session.count){ req.session.count ++; } else{ req.session.count = 1;}
        res.send(`You sent a request ${req.session.count} times`);
    });
    - In previous example we uses Local MemoryStore but for the production level we have to use other Storage(Compatible MemoryStore -> Topic on Website)

### Storing and Using Session Information
    - Edit server.js
    app.get("/register", (req, res) => {
        // let { req.session.name = "Anonymous" } = req.query;  //Incorrect way to define
        let { name = "Anonymous" } = req.query;
        req.session.name = name;
        // res.send(`${req.session.name}`);
        res.redirect("/hello");
    });
    
    
    app.get("/hello", (req, res) => {
        res.send(`Hello, ${req.session.name}`);
    });

### connect-flash (npm package -> https://www.npmjs.com/package/connect-flash)
    - The flash is a special area of the session used for storing messages.
    Messages are written to the flash and cleared after being displayed to the user.
    - For single time message dispaly/ alert/ notification purpose
    - The flash is typically used in combination with redirects, ensuring that the message is available to the next page that is to be rendered.

    - Move to Classroom Folder (for Demo uses)
        - npm i connect-flash
        - edit server.js

            app.get("/register", (req, res) => {
                let { name = "Anonymous" } = req.query;
                req.session.name = name;
                req.flash("success", "User registered Successfully.");
                res.redirect("/hello");
            });
    - used when the user registered for the first time (in a new session)
    - used when the user login in new session

        const session = require("express-session");
        const flash = require("connect-flash");

        const sessionoptions = {
            secret: "secretCode",
            saveUninitialized: true,
            resave: false
        };

        app.use(session(sessionoptions));   //connect.sid
        app.use(flash());

        - Inside route request
            //req.session.name = name;
            req.flash("success", "User registered Successfully.");
            res.redirect("/hello");

### Using res.locals (https://expressjs.com/en/api.html#res.locals)
    - Its a another better way of connect-flash (previous section)
    - Use this property to set variables accessible in templates rendered with res.render. The variables set on res.locals are available within a single request-response cycle, and will not be shared between requests.
    
    - We can use these messages by creating local variables in server.js and then we can directly use these local variables on page.ejs where we can render it.

    - edit server.js
        app.get("/register", (req, res) => {
            let { name = "Anonymous" } = req.query;
            req.session.name = name;
            if (name==="Anonymous"){
                req.flash("error", "User not registered.");
            } else {
                req.flash("success", "User registered Successfully.");
            };
            res.redirect("/hello");
        });

        app.get("/hello", (req, res) => {
            // using res.locals
            res.locals.successMsg = req.flash("success");
            res.locals.errorMsg = req.flash("error");
            res.render("page.ejs", {name: req.session.name});
        });
    
    - edit page.ejs
        <p> <= successMsg %> </p>
        <p> <= errorMsg %> </p>
    
#### Using res.locals (another way -> by using middleware)
    app.use((req, res, next) => {
        res.locals.successMsg = req.flash("success");
        res.locals.errorMsg = req.flash("error");
        next();
    });

    app.get("/hello", (req, res) => {
        res.render("page.ejs", {name: req.session.name});
    });


### Implement Sessions in Project
    - change directory to major project
    - npm i express-session

    - edit app.js
        - require it in app.js
            const session = require("express-session");
        - define sessionOptions
            const sessionOptions = {
                secret: "secretCode",
                resave: false,
                saveUninitialized: true
            };
        - app.use(session(sessionOptions))

    - check working of session from connect.sid from Inspect->Cookie->sessionconnect.sid 

### Implement Project -> Adding Cookie Options -> cookie expiry for autologin
    - https://expressjs.com/en/advanced/best-practice-security.html#set-cookie-security-options

    - use expires and maxAge cookieOptions (explore more options)

    - by default expires is set to null, means it doesn't have age so all the browser deletes this cookie when the browser is get closed.

    - expires option is used for the autologin functionality purpose like insta and fb.

    - httpOnly: true, for security purpose -> explore more about cross scripting Attacks

    - edit app.js (we set it for one week)
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
    
    - Check its working -> Inspect -> application -> cookie -> expiry date
        - 2024-11-13T08:12:47.703Z  (output like this)


### Implement Flash in Project
    - for single time alert type of messages
    - npm i connect-flash

    - edit app.js
        - const flash = require("connect-flash");
        - app.use(flash());
            - NOTE: app.use() should be above the routes of listing or review becuase our routes are going to use flash messages
    
    - inside routes folder edit listing.js
        req.flash("success", "New listing Added Successfully !");
    
    - edit index.ejs of views folder (next section -> update this change to boilerplate)
        <%= successMsg %>

### Flash Success Includes  -> Success Partials
    - Apply Bootstrap to success flash message
    - Bootstrap -> alert (https://getbootstrap.com/docs/4.1/components/alerts/)
    - create flash.ejs inside includes folder and include it before body in boilerplate.ejs
        - conditon to check the successMsg && successMsg.length (in flash.ejs)
        - since flash message is in Array form
    - dimissing alert

    - deleted msg as flash msg
    - create flash msgs for reviews too

    - edit app.js -> update middleware used for flashing msg
        // middleware for flash messages
        app.use((req, res, next) => {
            res.locals.successMsg = req.flash("success");
            res.locals.errorMsg = req.flash("error");
            next();
        });

    - edit listing.js
        // Listing EDIT route
        router.get("/:id/edit", wrapAsync( async (req, res, next) => {
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
        }));
    
    - edit flash.ejs
        <% if (successMsg && successMsg.length) { %>
            <div class="alert alert-success col-6 offset-3 alert-dismissible fade show" role="alert">
                <%= successMsg %>
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"> </button>
            </div>
        <% }

### Flash Failure Includes  -> Failure Partials
    - Display flash message of failure key
    - Handel when the listing not found
        - edit flash.ejs -> add errorMsg
            <% } else if (errorMsg && errorMsg.length) { %>
                <div class="alert alert-danger col-6 offset-3 alert-dismissible fade show" role="alert">
                    <%= errorMsg %>
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"> </button>
                </div>
            <% } %>
        - edit listing.js -> post route and edit route





## Phase 2  -> Part d   (User model, Passport Library, Authentication (Salting, Hashing), Login/Signup form and routes)  -> Most important
    - Authentication (Concept), User Model in DB, User Login

### Authentication vs Autherization
    - Authentication 
        - It is the process of verifying who someone is
        - Sign up/ Login
    - Autherization 
        - It is the process of verifying what specific applications, files, and data a user has to access
        - Accessibility of data, services

###  How are passswords stored ?
    - Password are store in their HASHED form.
    - Hashing Function
        - It converts normal string to unrecognizable string.
        - If one input hashing function will always convert it into same output.
            - abc   -> 14ed54s
            - It will convert abc to 14ed54s everytime (example)
    - Server compaires the password in the hashed form during login

    - Some Important Characteristics of Hashing Function

#### What is Hashing ? 
    - For every input, there is a fixed output length.
        - abc           -> hashing func     -> string of 50 character
        - gheifhk145    -> hashing func     -> string of 50 character
    - There are one-way functions (like .abs(), % operator), we can't get input from the output
    - For a different input, there is a different output but of same length
    - Small changes in input should bring large changes in output
    - Some Important Hashing function/ Algorithms (https://passwordsgenerator.net/sha256-hash-generator/)
        - SHA256 (Fast but not good in practical way)
        - MD5
        - CRC
        - bcrypt
        - we prefer slow function to avoid brutforce attack
    
#### What is Salting ?
    - Password salting is a technique to protect passwords stored in databases by adding a string of 32 or more characters and then hashing them.
    - Every company append or insert some string to their user's password like we can use "%?##" in every user's passwords
        - abc   -> abc%?##      -> hashing func -> hashed form pass
        - hello -> hello%?##    -> hashing func -> hashed form pass
    - Some exta concept to retrieve passwords from hashed form
        - reverse lookup table (to prevent it, we use salting)
    
    - Nowadays, we have some builtin tools of NodeJS to store passwords , no need to code from scratch to hashed form or salting etc
        - PASSPORT is one those tools, which we are going to implement in our project
    
### Passport -> library of NodeJS for Salting and Hashing (IMORTANT)
    -   Passport is authentication middleware for Node.js. Extremely flexible and modular, 
        Passport can be unobtrusively dropped in to any Express-based web application. 
        A comprehensive set of strategies support authentication using a username and password, Facebook, Twitter, and more.
    - Documentation -> (https://www.passportjs.org/)
    - Different Strategies for Authentication (https://www.passportjs.org/packages/)

    - Installation for PASSPORT library (https://www.npmjs.com/package/passport)
        - npm i passport
        - npm i passport-local
        - npm i passport-local-mongoose (for mongoDB database)

### User Model (user.js)
    - user: username, password, email
    - Documentation -> Read the Usage heading of this doc (https://www.npmjs.com/package/passport-local-mongoose)
        salt field to store the username, the hashed password and the salt value.

    - Create user.js inside models folder
        - You're free to define your User how you like. Passport-Local Mongoose will add a username, hash and 
        - edit user.js
            - we are using plugin to use auto functionality of hashing and salting of username and password, and some functions/methods to change and update passwords (Read Documentation -> methods)

            const mongoose = require("mongoose");
            const Schema = mongoose.Schema;
            const passportLocalMongoose = require("passport-local-mongoose");

            const userSchema = new Schema({
                email: {
                    type: String,
                    required: true,
                },
            });

            userSchema.plugin(passportLocalMongoose);

            module.exports = mongoose.model("User", userSchema);


### Configuring Strategy

    - passport strategy requires sessions so that it doesn't need login in the same session again n again
        - use passport below the session

    - edit app.js (https://www.npmjs.com/package/passport-local-mongoose)
        const passport = require("passport");
        const LocalStrategy = require("passport-local");
        const User = require("./models/user.js");

        app.use(passport.initialize());     //middleware that initialize passport

        app.use(passport.session());            // middleware that detects the same user in different requests/pages through the same session

        passport.use(new LocalStrategy(User.authenticate()));
    
    - Serializing User -> Storing User info after login from session
    - Deserializing User -> Removing User info after logout from session

    -  We used library for authentication otherwise we can also implement it from scratch (hashing, salting)


### Demo User (https://www.npmjs.com/package/passport-local-mongoose#main-options)
    - edit app.js
        // Demo User
        app.get("/demoUser", async(req, res) => {
            let fakeUser = new User({
                email: "fakeUser@gmail.com",
                username: "user1"
            });


            let registeredUser = await User.register(fakeUser, "password123");     //to register new user, also checks the username is unique or not
            res.send(registeredUser);
        });

    - then check the registered user output at http://localhost:3000/demoUser

    - default algo for hashing : pbkdf2 digest algorithm in our project with 25000 iterations


### SignUp User

#### SignUp GET request
    - to open the signup form

    - create user.js new route inside routes folder
        const express = require("express");
        const router = express.Router();

        const ExpressError = require("../utils/ExpressError.js");
        const wrapAsync = require("../utils/wrapAsync.js");

        // To Open the form -> SignUp GET request
        router.get("/signup", (req, res, next) => {
            res.render("./users/signup.ejs");
        });

        module.exports = router;

    - create users folder inside views folder, then create signup.ejs inside users folder
        - create a form having username , email, password input fields (like new.ejs form)



#### SignUp POST request 
    - to register the user in Database

    - extra
        -> use wrapAsync
        - refer listing.js of routes
        - checkUser iddleware implement with expressError

    - edit user.js (of routes folder) 
    - move demo user part from app.js to user.js in POST route
        let { username, email, password } = req.body;

        const newUser = new User({email, username});
    
        let registeredUser = await User.register(newUser, password);
    
        req.flash("success", "Welcome to WanderLust!");
    
        console.log(`User Registered Successfully! -> ${registeredUser.username}, ${registeredUser.email}`);
        res.redirect("/listings");
    
    - also use try catch block to handel error in user.js

        router.post("/signup", wrapAsync( async (req, res, next) => {
            try{
                let { username, email, password } = req.body;
                const newUser = new User({email, username});
                let registeredUser = await User.register(newUser, password);
        
                req.flash("success", "Welcome to WanderLust!");
                console.log(`User Registered Successfully! -> ${registeredUser.username}, ${registeredUser.email}`);
                res.redirect("/listings");

            } catch (e) {
                req.flash("error", e.message);
                console.log(`Error -> ${e.message}.`);
                res.redirect("/signup");
            }
        }));


### Login User
    - create GET and POST route as Signup in user.js
        - require passport in user.js
    - create login.ejs in views inside users
    - passport.authenticate()   -> https://www.npmjs.com/package/passport-local-mongoose#asyncawait
        this middleware will authenticate user
    - passport.authenticate("local", { failureRedirect: '/login', failureFlash: true })

#### GET /login
    - to open the Login Form
    - create login.ejs first
    - edit user.js
        router.get("/login", (req, res, next) => {
            res.render("./users/login.ejs");
        });

#### POST /login
    - to get authenticate after submitting form
    - edit user.js
        router.post("/login", passport.authenticate("local", { failureRedirect: "/login", failureFlash: true }),async(req, res) => {
            req.flash("success", "Welcome back to WanderLust !");
            console.log("User Logged in Successfully!");
            res.redirect("/listings");
        });
    - passport.authenticated() is a middleware used to authenticate the user






## Phase 2  -> Part e   ()  -> IMPORTANT

### Connecting Login Routes
    - connecting isLoggedIn middleware to listing.js and review.js

#### How to check if User is Logged in? (IMPORTANT)
    - user can make changes only when he/she is logged in (Like Instagram)

    - edit listing.js
        - req.isAuthenticated()     //passportMethod inbuilt method
        - this method will use the user info saved in session and then check weather the user is logged in or not

    - create isLoggedIn logic as middleware because we have to check the isLoggedIn middleware many times
    - create middleware.js in root directory to store middlewares and require it in app.js 
        - since our app.js has many middlewares there

        module.exports.isLoggedIn = ((req, res, next) => {
            console.log(`User details: ${req.user}`);
            if (!req.isAuthenticated()) {
                req.flash("error","User must be Logged in.");
                return res.redirect("/login");
            }
            next();
        });
    
    - edit listing.js
        - use isLoggedIn middleware in every route
    - edit review.js
        - use isLoggedIn middleware in every route
    
### Logout User (IMPORTANT)
    - req.logout()  //passport-method
    - use it in user.js

        router.get("/logout", (req, res, next) => {
            req.logout((err) => {
                if (err) {
                    return next(err);
                }

                req.flash("success", "You are Logged out!");
                // console.log(` ${req.user.username} User Logged Out");
                res.redirect("/listings");
            });
        });

    - before logout check first that the user is logged in or not 

#### Add Styling
    - Styling to Logout Functionality (Button)
    - edit navbar.ejs in includes folder

    - req.user === undefined    -> means no user logged in
        - use it to toggle log out and log in button with signup button

        - we can't use req.user directly in ejs file, but we cn access local variable from ejs file
        - create res.locals.currUser = req.user;(app.js) and then access it from navbar.ejs

            <div class="navbar-nav ms-auto">
              <% if (!currUser) { %>
                <a class="nav-link btn btn-dark nav-btn" href="/signup">Sign up</a>
                <a class="nav-link btn btn-dark nav-btn" href="/login">Log in </a>
              <% } else { %>
                <a class="nav-link btn btn-dark nav-btn" href="/logout">Log out</a>
              <% } %>
            </div>

        - edit app.js
            res.locals.currUser = req.user;

### Login after Signup
    - current user is not able to login directly after signup 
    - for this we can use .login() of passport -> (https://www.passportjs.org/concepts/authentication/login/)

        // Auto Login after Signup -> user.js
        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            };
            
            req.flash("success", "Welcome to WanderLust!");
            //console.log(`User Registered Successfully! -> ${registeredUser.username}, ${registeredUser.email}`);
            res.redirect("/listings");
        });

### post-login page
    - we need login before some crud changes, so redirect user to the same page where he was before login
        - when we click add listing it redirects to login page and then after login it redirects all listings not the new listing page

    - try to explore the req object (console.log(req))
        - req.path ->  relative path
        - req.originalURL -> complete request path

    - so redirect to originalURL after login/ authenticate user, save this URL only when the user is not Logged in

    (NOTE) - req.session.redirectURL = req.originalURL; //store it in session object in middleware.js but passport resets the session object after login , so store this value with the help of locals variable by creating another middleware in middleware.js

    - also we face problem when we directly login, because at thi time isLoggedIn not called and redirecURL is undefined.

    - edit middleware.js
        module.exports.saveRedirectUrl = (req, res, next) => {
            // console.log("saveRedirect middleware called...");
            if (req.session.redirectUrl) {
                res.locals.redirectUrl = req.session.redirectUrl;
                // console.log("locally URL saved...");
            }
            next();
        };
    
    - edit user.js
        router.post("/login", saveRedirectUrl , passport.authenticate("local", { failureRedirect: "/login", failureFlash: true }), 
        async(req, res) => {
            req.flash("success", "Welcome back to WanderLust !");
            console.log("User Logged in Successfully!");
            //console.log(res.locals.redirectUrl);
            let redirectUrl = res.locals.redirectUrl || "/listings";
            res.redirect(redirectUrl);
            }
        );


### Listing Owner (for Autherization)
    - listing autherization
        - listing can be edit and delete by its creater not by others

    - review autherization
        - review can be deleted by its creater not by others

    - owner property, change in Schema to add owner, 

    - edit index.js of init folder
        // Create Owner of the listing
        initData.data = initData.data.map((obj) => ({...obj, owner: "672b6e4b66a06a8590751b03"}));

    - edit show.ejs
        <i> Owned by: <= listing.owner.username %> </i> <br>
    
    - edit listing.js of routes folder
        newListing.owner = req.user._id;    //current user is the owner of this new listing


### Starting with Autherization
    - set the owner of the listing and review first before the autherization

    - if currUser_id === listingOwner_id; then show edit / delete button otherwise hide these btns

    - edit show.ejs (before this save currUser as locals in app.js)
        < if (currUser && currUser._id.equals(listing.owner._id)) { %>

    - but now anyone can edit without login by sending request through hoppscotch orpostman , so apply logic in app.js too for avoidng edit / delete listing (Protect Routes Also)

    - Protect Routes
        - update route
            - findByIdAndUpdate(), so check the user is LoggedIn or not first and then chek weather he is owner of this listing or not

        // Listing UPDATE Route
        router.put("/:id", isLoggedIn, checkListing, wrapAsync      ( async(req, res, next) => {
        
            let { id } = req.params;
            let listing = await Listing.findById(id);

            if (listing.owner._id.equals(req.user._id)){
            
                await Listing.findByIdAndUpdate(id, { ...req.       body.listing}); 

                // console.log({ ...req.body.listing});

                req.flash("success", "Listing Updated !");
                res.redirect(`/listings/${id}`);
                console.log("Listing Edited and Updated         Successfully...");

            } else {
                req.flash("error", "You don't have permission       to edit this listing.");
                res.redirect(`/listings/${id}`);
                console.log("Unautherized Persion trying to         Edit the Listing.")
            }

        }));

    - CREATE MIDDLEWARE FOR ABOVE Logic so that you can implement it to protect other routesx
        - middleware.js -> create isOwner middleware
    
            module.exports.isOwner = async (req, res, next) => {
                let { id } = req.params;
                let listing = await Listing.findById(id);

                if (!listing.owner._id.equals(req.user._id)){
                    req.flash("error", "You are not the owner of this listing.");
                    console.log("Unautherized Persion trying to Edit the Listing.")
                    return res.redirect(`/listings/${id}`); 
                } 

                next();
            };

        - CHECK IT BY DISPLAYING EDIT AND DELETE BTN ON show.ejs





