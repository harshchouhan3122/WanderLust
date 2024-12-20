# Major Project - Airbnb Website (Wanderlust)

    - Download nodejs first -> https://nodejs.org/en
    - cmd to project folder
    - nodemon app.js -> to start the server
    - start mongosh
        - use wanderlust
    - Ctrl + C -> to stop the server

    - NOTE: Stop the server before installing any additional package of npm


## Phase 1  -> Part a (Database Setup and CRUD APIs)

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






## Phase 1  -> Part b (Styling)

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





## Phase 1  -> Part c (Error Handeling)

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





## Phase 2  -> Part a    (Creating Review Section)

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



## Phase 2  -> Part b    (Express Routes -> Restructuring routes(modulor code) & Cookies (Send/Parse/Signed))

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






## Phase 2  -> Part e   (Login Routes Connection, Post-Login Page, Logout, Update Middlewares, Autherization- Listing, Review)  -> IMPORTANT

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

#### CREATE MIDDLEWARE FOR ABOVE Logic so that you can implement it to protect other routesx
        - middleware.js -> create isOwner middleware
    
            module.exports.isOwner = async (req, res, next) => {
                let { id } = req.params;
                let listing = await Listing.findById(id);

                //if (!listing.owner._id.equals(req.user._id)){
                if (!listing.owner._id.equals(res.locals.currUser._id)){
                    req.flash("error", "You are not the owner of this listing.");
                    console.log("Unautherized Persion trying to Edit the Listing.")
                    return res.redirect(`/listings/${id}`); 
                } 

                next();
            };

        - CHECK IT BY DISPLAYING EDIT AND DELETE BTN ON show.ejs

### Move all the middlewares from different different files to middleware.js
    - validReview, checkListing, isOwner, saveRedirectUrl

### Authorization for Reviews (Part 1)
    - No user can create a review without login (like Youtube)

    - edit review.js of models
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }

    - edit show.ejs 
        < if (currUser) { %>

    - protect route also
        - use isLoggedIn middleware in both the routes
        - also store the name of the user with review
            - edit review.js of routes folder
                newReview.createdBy = req.user._id;

            - delete previous review collection
                - db.reviews.deleteMany({})


### Autherization for Reviews (Part 2)
    - Display the name of the user along with reviews
        - Nested Populate in applisting.js

            let listing = await Listing.findById(id)
                            .populate({
                                path: "reviews",
                                populate: {
                                    path: "createdBy"
                                },
                            })
                            .populate("owner");

    - Create isReviewAuthor middleware to protect delete review route in middleware.js
        module.exports.isReviewAuthor = async (req, res, next) => {
            let { id, reviewId } = req.params;
            let review = await Review.findById(reviewId);

            if (!review.createdBy._id.equals(res.locals.currUser._id)){
                req.flash("error", "You are not the author of this review.");
                console.log("Unautherized Person trying to delete the review.")
                return res.redirect(`/listings/${id}`); 
            } 
            next();
        };
    

    - Display Delete button only on those reviews which are created by the currUser or Current Logged in User
    - edit show.ejs
        < if (currUser && currUser._id.equals(review.createdBy._id)) { %>









## Now we are going to use MVC pattern in our codebase , So now files are getting short


## Phase 3  -> Part a   (MVC applied, Controllers, router.route, rating restyle, Manipulate form- upload file, Cloud Setup, Store Link in MongoDB, .env file, Data ReInitialized)

### MVC - Model, View, Control
    - MVC is a way to write a code and increase modularity and readability in codes

#### Controllers
    - We write the actual logic of the routes here and then import it in routes

    - Implement Design Pattern/ Framework for Listings

##### Controller for listing.js (Routes)
    - Create a folder named controllers inside root directory
        - create listing.js inside controllers folder for listing route's logics
    - edit listings.js (of controllers)

        const Listing = require("../models/listing");

        // Index Route (All Listings)
        module.exports.index = async (req, res, next) => {
            const allListings = await Listing.find({});
            // console.log(allListings);
            console.log("All Listings from the DB...");
            // res.send(allListings);
            res.render("listings/index.ejs", {allListings});
        };

    - edit listings.js (of routes folder)
        const listingContoller = require("../controllers/listings.js");

        // Index Route
        router.get("/", wrapAsync ( listingController.index ) );

        // New Listing Route
        router.get("/new", isLoggedIn, listingController.renderNewForm );

        // Create Route
        router.post("/", isLoggedIn, checkListing, wrapAsync(listingController.addListing ) );

        // Show Route
        router.get("/:id", wrapAsync( listingController.showListing) );

        // Edit Route
        router.get("/:id/edit", isLoggedIn, isOwner ,wrapAsync( listingController.renderEditForm));

        // Update Route
        router.put("/:id", isLoggedIn, isOwner, checkListing, wrapAsync( listingController.updateListing));

        // Destroy Route
        router.delete("/:id", isLoggedIn, isOwner, wrapAsync( listingController.deleteListing));

    - Move all the logic of (listings.js- routes to listings.js - controllers)
        - index
        - renderNewForm
        - showListing
        - renderEditForm
        - updateListing
        - deleteListing/ destroyListing

### MVC for Reviews and Users
#### Controllers

##### Controllers for review.js (Routes)
    - create reviews.js in controllers folder
        - move all the logic of routes from review.js(routes folder) to this file

    - require reviewController in review.js(of Routes folder)
        - update all the review routes same as listing routes
            - createReview, deleteReview

##### Controllers for users.js (Routes)
    - create reviews.js in controllers folder
        - move all the logic of routes from user.js(routes folder) to this file

    - require userController in user.js(of Routes folder)
        - update all the user routes same as review routes
            - renderSignupForm, signup 
            - renderLoginForm, login
            - logout

### Routes -> listing.js, review.js, user.js -> remove Commented Routes (Previous routes)
            
### Router.route (https://expressjs.com/en/5x/api.html#router.route)
    - Returns an instance of a single route which you can then use to handle HTTP verbs with optional middleware. Use router.route() to avoid duplicate route naming and thus typing errors.
    - Combine different types (put, post) routes with same named path request
    - router.get("/new", isLoggedIn, listingController.renderNewForm ); //keep this route at the top , otherwise new is determined as id

    - Previously written code
        // Index Route
        router.get("/", wrapAsync ( listingController.index ) );
        // Create Route
        router.post("/", isLoggedIn, checkListing, wrapAsync(listingController.addListing ) );

    - edit listings.js (of Routes) -> updated code
        // Router.route -> to combine the same named paths
        router.route("/")
            .get( wrapAsync ( listingController.index ) )
            .post( isLoggedIn, checkListing, wrapAsync(listingController.addListing ) );

    - Do the same for the other routes, also in users.js

### Removed the commented MVC routes after implementing router.route in files of routes folder

### Re-Styling the Rating
    - Github Repo -> (https://github.com/LunarLogic/starability)
    - Check -> (https://lunarlogic.github.io/starability/)

    - read their README.md file for applying style - How to Use section
    - We are going to use Slot Machine rating Design

    - create rating.css in css folder of public folder of root directory and copy the code from the starability-slot.css file of your rating style of github folder
    - add this css file in boilerplate.js (of layouts folder of views folder)
        - <link rel="stylesheet" href="/css/rating.css">

    - edit show.ejs
        <div class="mb-2">
            <label for="review" class="form-label">Rating</label>
            <fieldset class="starability-slot">
                <input type="radio" id="no-rate" class="input-no-rate" name="review[rating]" value="1" checked aria-label="No rating." />
                <input type="radio" id="first-rate1" name="review[rating]" value="1" />
                <label for="first-rate1" title="Terrible">1 star</label>
                <input type="radio" id="first-rate2" name="review[rating]" value="2" />
                <label for="first-rate2" title="Not good">2 stars</label>
                <input type="radio" id="first-rate3" name="review[rating]" value="3" />
                <label for="first-rate3" title="Average">3 stars</label>
                <input type="radio" id="first-rate4" name="review[rating]" value="4" />
                <label for="first-rate4" title="Very good">4 stars</label>
                <input type="radio" id="first-rate5" name="review[rating]" value="5" />
                <label for="first-rate5" title="Amazing">5 stars</label>
              </fieldset>
        </div>

        // for stable rating display in review card
        <p class="card-text starability-result" data-rating="<= review.rating %>"> Rated: <= review.rating %> stars</p>

### Image Upload
    - directly file upload functionality
    - our current form can't send files to backend, its just sending url encoded datas
    - BSON format has limit, so we can directly save files to our database

    - file -> cloud storage (cloudinay, AWS) -> link -> storing link to mongoDB database

### Manipulating Form
    - currently our form is sending URLencoded data to our backend
        - app.use(express.urlencoded({extended: true}));
    - we have to send the file to backend
        - enctype = "multipart/form-data"   (IMPORTANT)

    - edit new.ejs
        <form method="POST" action="/listings" class="needs-validation" novalidate enctype="multipart/form-data">

    - for multipart/form-data we have to use parser for parsing form data - for that we will use multr package of NodeJs
        - https://www.npmjs.com/package/multer
        - Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files. It is written on top of busboy for maximum efficiency.
        - NOTE: Multer will not process any form which is not multipart (multipart/form-data).

    - npm i multer at root directory

    - edit listing.js (of routes folder)
        const multer  = require('multer')
        const upload = multer({ dest: 'uploads/' })     -> Destination for saving files

        - our uploaded file saved in uploads folder with BSON data format

    - req.file -> {"fieldname":"listing[image]","originalname":"Screenshot (2).png","encoding":"7bit","mimetype":"image/png","destination":"uploads/","filename":"2060afc878a3afbfbff4054f9db3e470","path":"uploads\\2060afc878a3afbfbff4054f9db3e470","size":543110}

### Cloud Setup (Cloudinary)
    - we can't store every file as it is, in our database
    - using cloud storage and saving file link in backend

    - third party free cloud storage -> Cloudinary & .env file setup

    - created acc with hchouhanycce@gmail.com

#### .env File
    - create .env file in root directory to save the Cloud Credential or any other confidential keys data/ credentials here
    - never upload .env in github
    - include this file in .gitignore
    - .env only used in development phase
    - works only in key Value pair and without using ny space or any special character 
    - (use BLOCK letters in variable name -> optional)
        - API_KEY=aadvjnvjsbdv82g2cd

    - we have to use dotenv library of NodeJs to integrate .env with our code base
        - npm i dotenv
        - require it in app.js

        ## Example
        -.env file
            SECRET=harshChouhan

        - app.js
            // .env file integration
            if (process.env.NODE_ENV != "production"){
                require('dotenv').config();
            }
            console.log(process.env.SECRET);

#### Setup Cloud for project (Cloudinary-> Dashboard -> Keys)
    - edit .env
        CLOUD_NAME=dcayfsp
        CLOUD_API_KEY=593734935854
        CLOUD_API_SECRET=nym4GO8iGSVTrXwrYLBRXN54

### Store Files (https://www.npmjs.com/package/cloudinary and https://www.npmjs.com/package/multer-storage-cloudinary)
    - Also check the Cloudinary documentation
    - now our file will be save on Cloud not in /upload folder
    - Multer Store Cloudinary

    - npm i cloudinary multer-storage-cloudinary

    - create cloudConfig.js
        - which configures the cloudinary cloud (for authentication) and integrate it with our code, so that uploaded file can save there

            const cloudinary = require('cloudinary').v2;
            const { CloudinaryStorage } = require           ('multer-storage-cloudinary');

            // Integrating our backend with cloudinary services
            cloudinary.config({
                cloud_name: process.env.CLOUD_NAME,
                api_key: process.env.CLOUD_API_KEY,
                api_secret: process.env.CLOUD_API_SECRET,
            });

            // Define Storage
            const storage = new CloudinaryStorage({
                cloudinary: cloudinary,
                params: {
                  folder: 'wanderlust-dev',
                  allowedFormatsf: ["png", "jpeg", "jpg"]
                },
              });


            module.exports = { cloudinary, storage };

        - edit listing.js (routes folder)
            // File Uploading
            const multer  = require('multer');

            const { cloudinary, storage } = require("../cloudConfig.js");

            // const upload = multer({ dest: 'uploads/' });     //Upload -> destination to save a file locally 
            const upload = multer({ storage });           // Now file are getting uploaded to Cloudinary Storage

        - req.file -> {"fieldname":"listing[image]","originalname":"Screenshot (3).png","encoding":"7bit","mimetype":"image/png","path":"https://res.cloudinary.com/dcayfspmp/image/upload/v1731172640/wanderlust-dev/xpgt969ubjlgxyyknyhe.png","size":335527,"filename":"wanderlust-dev/xpgt969ubjlgxyyknyhe"}

        - Store this req.file -> path in mongoDB in next section

        -> Check the result -> Cloudinary -> Media Library -> wanderlust-dev folder -> uploaded file

        -> Now You can delete the Upload folder from the root directory as Our Cloud Storage is set up properly

### Save Link in MongoDB
    - Modify listing Schema (listing.js of models folder)
        image: {
          url: String,
          filename: String
        },

    - edit listing.js of Routes folder
            .post( isLoggedIn, checkListing, upload.single('listing[image]'), wrapAsync(listingController.addListing ) );                // Create Route

            - use checkListing middleware after upload for checking current result

    - edit listing.js of controllers folder
        let url = req.file.path;
        let filename = req.file.filename;

        newListing.image = {url, filename}; // save the url and filename in mongoDB from Cloudinary

### Display Image
    - ReInitialize the init Data with the new image object
        - https://github.com/apna-college/wanderlust/blob/main/init/data.js
    
    - edit index.ejs of listings folder of views folder
        <img src="<=listing.image.url%>" class="card-img-top" alt="listing_img" style="height: 20rem;">

    - Try to limit the size of the image to be upload to use your cloud efficiently
        - In production, we limit the uploading file size







## Phase 3  -> Part b   (Image Preview, Maps)

### Edit Listing Image
    - Change Edit form same as Create Listing Form (Directly upload image)
    - form update - route change - upload image to cloudinary - get link - save it to mongoDB

    - edit edit.ejs of views to update form to upload file
    - edit listing.js of routes 
        upload.single('listing[image]') in put request of update route
    
    - edit listings.js of controllers
        - same changes as of previous section when we are creating new listing after uploading new file
        // If we get the file in edit form then only we are going to extract url and filename from the form
        if (typeof req.file !== "undefined") {
            let url = req.file.path;
            let filename = req.file.filename;
            listing.image = {url, filename};

            await listing.save();
        }

### Image Preview for Edit Page
    - Create Image Preview on Edit Page because we are get aware about the previous uploaded image on edit form
    - create new div abpve upload new image section on edit.ejs form

    - https://cloudinary.com/documentation/image_transformations (Image Manipulation by Cloudinary)
    - or we can manipulate preview image manually using css

    - use cloudinary image transformation link
        - https://res.cloudinary.com/demo/image/upload/ar_1.0,c_fill,h_250/bo_5px_solid_lightblue/leather_bag_gray.jpg
        - https://res.cloudinary.com/dcayfspmp/image/upload/c_fill,h_250,e_blur:300/v1731259551/wanderlust-dev/g1yep5fjswpjcn8hcpmg.png

        - edit renderEditForm function listings.js of controller 
            // Image Tranformation using Cloudinary
            let originalImageURL = listing.image.url;
            let previewImageURL = originalImageURL.replace("/upload", "/upload/c_fill,h_250");




### Map Setup 
    - https://www.youtube.com/watch?v=ls_Eue1xUtY (Tutorial on Youtube)
    - https://leafletjs.com/examples/quick-start/
    - https://leafletjs.com/reference.html

    - we used Mapbox (but now it requires Credit Card to create account)
    - search for another free alternate options for map
        - OpenStreetMap (OSM) + Leaflet or MapLibre
        - Mapbox (Free Tier)
        - Here Maps (Free Tier)
        - Google Maps Platform (Free Tier)
        - MapTiler (Free Tier)

#### For Display Map -> OpenStreetMap (OSM) + Leaflet
    - create map.js file inside the public folder

    - edit .ejs templates to include Leaflet CSS and JS
        - Adding CSS file (Added to boilerplate.ejs)
            <!-- Leaflet CSS -->
            <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" crossorigin=""/>

        - Adding Script JS Files -> added to ejs file not in boilerplate to avoid errors                                          
            <!-- Leaflet and map functionality -->
            <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" crossorigin=""></script>

            <!-- External JS for map -->
            <script src="/js/map.js"></script>

    - edit listing.js of models
        // add coordinates to listingSchema
          coordinates : {
            type: [Number],
            required: true
          }

    - We can't access the variables from the backend directly, that'swhy we pass those variables to ejs template and then access those variable in map.js using ejs template

        - edit .env file to store credentials
            # hchouhanycce

            # Couldinary
            CLOUD_NAME=dcay
            CLOUD_API_KEY=5934935854
            CLOUD_API_SECRET=nyiGSVTrXwrYLBRXN54

            # OpenCage
            MAP_API=602cacd987

        - edit new.ejs, edit.ejs, show.ejs
            <!-- Pass latitude and longitude to map.js (Initialize Values) -->
            <script>
                const latitude = <= listing.coordinates && listing.coordinates[0] ? listing.coordinates[0] : 0 %>;
                const longitude = <= listing.coordinates && listing.coordinates[1] ? listing.coordinates[1] : 0 %>;
                const address = "<= listing.location %>, <= listing.country %>";
                const zoom = 14;
                const draggableMarker = true;
                const map_apiKey = "<= process.env.MAP_API %>"; //for geocoding APIs
            </script>

            - create div with id map and hidden input to take coordinate of marker from the map send it with the form data
                <div class="mb-4">
                    <label for="coordinates" class="form-label">Select your exact location on map: </label>
                    <!-- Hidden Input to hold Coordinates -->
                    <input type="hidden" name="listing[coordinates]" id="coordinates" />
        
                    <div id="map"></div>
                </div>

        - edit map.js
            - get variables from backend using ejs template
                const lat = latitude || 28.644800;  // Default latitude (Delhi)
                const lng = longitude || 77.216721; // Default longitude (Delhi)
                const locationAddress = address || "Unknown Road";
                const zoomLevel = zoom;
                const markerMove = draggableMarker || false;
                const apiKey = map_apiKey || 'unknownUser';
                
            - create map
                // Initialize the map centered at given coordinates ([Coordinates], zoom level)
                const map = L.map('map').setView([lat, lng], zoomLevel); 

                // Add Google Street tile layer (needs internet connetion)
                var googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
                    maxZoom: 20,
                    attribution: '&copy; Wanderlust',
                    subdomains:['mt0','mt1','mt2','mt3']
                });
                googleStreets.addTo(map);

            - create custom marker
                // Custom Marker
                const customIcon = L.icon({
                    iconUrl: '/icons/marker.png', // Path to your custom icon
                    iconSize: [40, 40],
                    iconAnchor: [20, 40],
                    popupAnchor: [0, -40]
                });
                // Add a marker at the provided coordinates
                const marker = L.marker([lat, lng], { icon: customIcon, draggable: markerMove }).addTo(map);
                // Marker Popup
                marker.bindPopup(`<b>${locationAddress}</b>  <br>Drag marker to exact location.`).openPopup();
                // Function for Draggable Marker -> getting new coordinates from marker position
                marker.on('dragend', function(e) {
                    const newLatLng = marker.getLatLng();   // Get the new position of the marker
                    currentLat = newLatLng.lat;
                    currentLng = newLatLng.lng;
                    // console.log(newLatLng.lat, newLatLng.lng);
                    marker.setPopupContent("Current Postition: " + newLatLng.lat.toFixed(4) + "°N, " + newLatLng.lng.toFixed(4) + "°E" ).openPopup();  // Update the popup content with new position
                    // marker.setPopupContent( locationAddress ).openPopup();   // Can show present address after forward geocoding
                });

            - create layer control (https://gis.stackexchange.com/questions/225098/using-google-maps-static-tiles-with-leaflet)
                googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
                    maxZoom: 20,
                    subdomains:['mt0','mt1','mt2','mt3']
                });
                var openStreetMap = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    maxZoom: 20,
                    attribution: '&copy; Wanderlust'
                });
                googleHybrid = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',{
                    maxZoom: 20,
                    subdomains:['mt0','mt1','mt2','mt3']
                });
                // googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
                //     maxZoom: 20,
                //     subdomains:['mt0','mt1','mt2','mt3']
                // });
                // googleTerrain = L.tileLayer('http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',{
                //     maxZoom: 20,
                //     subdomains:['mt0','mt1','mt2','mt3']
                // });
                var baseLayers = {
                    "Google Street": googleStreets,
                    "Google Hybrid": googleHybrid,
                    "OpenStreetMap": openStreetMap,
                    // "Google Satelite": googleSat,
                    // "Google Terrain": googleTerrain,
                };
                var overlays = {
                    "Default Marker": marker,
                    // "Custom Marker": marker2
                };
                L.control.layers(baseLayers, overlays, {collapsed: true}).addTo(map);

        - create onClick function to fetchCurrentLocation of marker 
            - edit new.ejs and edit.ejs -> add id="ListingForm" to form tag
            - edit map.js
                function fetchCurrentPosition(event) {
                    event.preventDefault(); // Prevent default form submission

                    // Assuming currentLat and currentLng are set when the marker is moved
                    console.log("Current Position: " + currentLat.toFixed(4) + " And " + currentLng.toFixed(4));

                    // Set the coordinates as a geometry object (latitude and longitude) for backend use -> geometry: { "lat": 40.7128, "lng": -74.0060 }
                    const geometryInput = document.getElementById('coordinates');
                    geometryInput.value = JSON.stringify({ lat: currentLat, lng: currentLng });     //Convert Object to Sting before Sending to backend, At backend we will parse it to Object
                    // console.log("Geometry object to submit:", geometryInput.value);

                    // Select the correct form by ID
                    const form = document.getElementById('ListingForm');
                    if (!form) {
                        console.error("Add Listing form not found!");
                        return;
                    }
        
                    form.submit(); // Submit the intended form
                }


                // // Getting the current Position of the Marker, directly sending it as String of Array not Object
                // function fetchCurrentPosition(event) {
                //     event.preventDefault(); // Prevents form from submitting immediately

                //     // Assuming currentLat and currentLng are set when the marker is moved
                //     console.log("Current Position: " + currentLat.toFixed(4) + " And " + currentLng.toFixed(4));

                //     // Set the coordinates in the hidden input field
                //     const coordinatesInput = document.getElementById('coordinates');
                //     coordinatesInput.value = JSON.stringify([currentLat, currentLng]); // Make sure it’s an array


                //     // // Log the form data to verify before submitting
                //     // const formData = new FormData(document.querySelector('form'));
                //     // formData.forEach((value, key) => {
                //     //     console.log(key, value);  // This will log each key-value pair in the form data
                //     // });
                //     console.log("Coordinates to submit:", coordinatesInput.value); // Logs the JSON string


                //     // Submit the form
                //     document.querySelector('form').submit();
                // }

        - edit .ejs template 
            <br><br>
            <!-- onClick function is defined in map.js for sending current location of marker with Listing data -->
            <button class="btn btn-dark add-btn" onclick="fetchCurrentPosition(event)">Add</button>

    - edit checkListing via validateListing of Schema.js
       // we are getting coordinates as string in form-data -> parsing it at listing.js(controllers) as array before saving it to database
        coordinates: Joi.string().required(),

    - edit listings.js of controllers folder -> for edit Listing and new Listing with coordinates

        module.exports.addListing = async(req, res, next) => {
            const newListing = new Listing(req.body.listing);
            
            // coordinates = JSON.parse(req.body.listing.coordinates);     // Convert string '[28,75]' into an array [28, 75]
            // console.log("Coordinates (after parsing):", coordinates);

            // Parse coordinates as an object with lat and lng properties
            const coordinates = JSON.parse(req.body.listing.coordinates); // Should be { lat: ..., lng: ... }
            console.log("Coordinates (after parsing):", coordinates);

            newListing.owner = req.user._id;        //current user is the owner of this new listing
            newListing.image = {url, filename};     // save the url and filename in mongoDB from Cloudinary
            newListing.coordinates = [coordinates.lat, coordinates.lng];;

            await newListing.save();

            console.log("New Listing Added Successfully...");
            req.flash("success", "New listing Added Successfully !");
            res.redirect("/listings");
        };


        module.exports.updateListing = async(req, res, next) => {
            let { id } = req.params;
            let updateListing = { ...req.body.listing};
        

            // Convert coordinates from String to Number
            // coordinates = JSON.parse(req.body.listing.coordinates);     // Convert string '[28,75]' into an array [28, 75]
            // console.log("Coordinates (after parsing):", coordinates);
            // updateListing.coordinates = coordinates;

            // Parse the coordinates JSON string into an object with lat and lng
            const coordinates = JSON.parse(req.body.listing.coordinates);
            // Check that lat and lng are numbers, then assign to the updateListing object
            if (typeof coordinates.lat === 'number' && typeof coordinates.lng === 'number') {
                updateListing.coordinates = [coordinates.lat, coordinates.lng]; // Convert to an array format expected by Mongoose
            } else {
                console.error("Invalid coordinate format");
                return res.status(400).send("Invalid coordinate format");
            }

            let listing = await Listing.findByIdAndUpdate(id, updateListing); 

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


#### For Geocoding APIs (We didn't used it in our current project -> skip this step) -> map.js
    - Get mapAccessToken from the backend (Secured)
        const apiKey = map_apiKey || 'unknownUser'; //Passing it from backend (.env) using .ejs template and using it here
        
    - Forward Geocoding (Coordinates -> Address)
        async function getPlaceName(latitude, longitude) {

            const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;

            try {
                const response = await axios.get(url);
                // console.log("Reverse Geocoding Response:", response.data);

                return response.data.results[0].formatted || "Unknown Location";
            } catch (error) {
                console.error("Error fetching place name:", error.message || error);
                return "Unknown Location";
            }
        };

    - Reverse GeoCoding (Address -> Coordinates)
        async function getCoordinates(address) {
            const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${apiKey}`;
            try {
                const response = await axios.get(url);
                // console.log("Forward Geocoding Response:", response.data); // Log full response data

                if (response.data.results && response.data.results.length > 0) {
                    const { lat, lng } = response.data.results[0].geometry;
                    return { latitude: parseFloat(lat), longitude: parseFloat(lng) };
                } else {
                    console.error("Address not found in response.");
                    return null;
                }
            } catch (error) {
                console.error("Error fetching coordinates:", error.message || error);
                return null;
            }
        };

     -> Can we export function and use same one in the same file ?


### NOTE: IMPORTANT CHANGES 
    - Update init data with their coordinates (Geocoding or through map)
        - edit index.js of init folder
            // Assign the same coordinates [20, 40] and a fixed owner ID to all listings
            initData.data = initData.data.map((obj) => ({
                ...obj,
                owner: "6735ab649714e6944be13201",      // ID of the owner, create a user first in the database
                coordinates: [33.2778, 75.3412],        // Assign fixed coordinates to all previous listings 
            }));

    - Coordinates -> Object -> String -> Backend -> String -> Object -> Array -> Database (Flow of Coordinates from form to database)

    - Update icons folder with image imageLoader
        - use it whenever our listingImage deleted from the cloud or not getting response from cloudinary
        - edit .ejs templates
            <a id="listing-link" href="<= listing.image.url %>" target="_blank">
                <img 
                    src="<= listing.image.url %>" 
                    class="card-img-top show-img" 
                    alt="listing_img"
                    onerror="this.onerror=null; this.src='/icons/imageLoader.png'; document.getElementById('listing-link').href='/icons/imageLoader.png';"
                >
            </a>



## Phase 3  -> Part c   (Adding Filters UI, Search Filter UI, Functional Tax-Switch)

### Fixing Home Page
    - edit navbar.ejs of includes folder
    - delete Home and create /listings as root directory so delete / from app.js
        // Root Directory
        // app.get("/", (req, res)=>{
        //     res.send("Server is working....");
        // });
        
    - Add UI for Filters (Not Implemented)
        - edit index.ejs and edit css file
            <div id="filters" class="mb-2 ">
                <div class="filter">
                    <div><i class="fa-solid fa-fire"></i></div>
                    <p>Trending</p>
                </div>
            </div>


### Add UI for Tax Switch

    - Adding Search Functionality using these filters (Not Implemented) 
        - Edit Listing Schema for this
            category : {
                type: String,
                enum: {"mountains", "farms", "rooms", "artic", ...}
            }
        - Edit New.ejs
            - give the dropdown option to select category of Listing as defined in enum in Schema
            - create another .ejs file and another route in listing controller for displaying Filtered Content

    - Adding UI for Tax Switch
        - Use Bootstrap Switch (Checks & Radio)
        - make filters responsive

        - edit index.ejs
            <div id="tax-switch" class="ms-auto">
                <div class="form-check-reverse form-switch">
                    <label class="form-check-label" for="flexSwitchCheckDefault">Total price with Tax</label>
                    <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault">
                </div>
            </div>

    - Making Tax Switch Functional
        - create script for index.ejs to toggle effect using event listeners

        - edit index.ejs and edit css file
            <script>
                let taxSwitch = document.getElementById("flexSwitchCheckDefault");
                taxSwitch.addEventListener("click", ()=>{
                    // console.log('Clicked');
                    let taxInfo = document.getElementsByClassName("tax-info");

                    for(info of taxInfo) {
                        if (info.style.display != 'inline') {
                            info.style.display = "inline";
                        } else {
                            info.style.display = "none";
                        }
                    }
                });
            </script>

### Add UI for Search (Backend -> Not Implemented)
    - Bootstrap -> Navbar -> Search
    - edit navbar.ejs and edit css file
        <div class="navbar-nav ms-auto" >
          <form class="form-inline nav-search">
            <input class="form-control mr-sm-2" type="search" id="nav-search-input" placeholder="Search Destinations" aria-label="Search">
            <button class="btn btn-outline-success my-2 my-sm-0" id="nav-search-btn" type="submit"><i class="fa-solid fa-magnifying-glass"></i>Search</button>
          </form>
        </div>







## Phase 3  -> Part d   (Deploy Project on Cloud)

### Using Mongo Atlas (Setting up Cloud Database)
    - Cloud Database Service
    - Create Account on Mongo Atlas (Free Tier)
        - JavaScript/ NodeJS
        - Your PC IP first then add render's IP

    - Get Databse Url after Clicking on Connect Cluster
        - Replace your username and password in Database Link

    - Paste DB link in .env file and acccessit in app.js from .env

    - Try to start nodemon app.js again


### Mongo Session Store (https://www.npmjs.com/package/connect-mongo)
    - Use another Session Store for Production work
        - npm i connect-mongo 
        - const mongoStore = require("connect-mongo")

    - edit app.js
        const store = MongoStore.create({
            mongoUrl: dbUrl,
            crypto: {
                secret: "secretCode", 
            },
            touchAfter: 24 * 3600 // time period in seconds
        });

        store.on("error", (err)=>{
            console.log("ERROR in MONGO SESSIONSTORE", err)
        });

        const sessionOptions = {
            store,
            secret: "secretCode",
            resave: false,
            saveUninitialized: true,
            cookie: {
                expires: Date.now() + (7 * 24 * 60 * 60 * 1000), //for 1 week , this function returns in millisec
                maxAge: 7 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            },
        };

    - User gets logout after 14 days by default -> if he will be inactive for 14 days


### Deployment with render
    - render, netlify, cyclic

    - edit package.json (node -v)
          "engines":{
            "node": "22.11.0"
            },

    - render.com create acoount (harsh3121 used)

### Push Code to Github Repo
    - transfer all the credentials to .env file

    - git init 
    - code .gitignore
        .env
        node_modules/
    - git add .
    - git commit -m "Added Project Files"

    - create private repo

### Render with Github
    - Connect Github Repo with render
    - Create Web Services
        - leave root directory option
        - npm install
        - node app.js
        - stop auto deployement

### Create New Services
    - add environment variables
        - environment -> then add env variables

    - configure Atlas
        - store render's ip on atlas

        - render -> logs -> connect(right top) -> white list all the given ip's (add these ips in Atlas -> Network Access)

        - Build - Clear cache and Deploy (on render)

    - You can access your project using the link shown on top of the logs on render (https://wanderlust-harsh.onrender.com)
    