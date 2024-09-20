# Major Project - Airbnb Website

    - cmd to project folder
    - nodemon app.js -> to start the server
    - Ctrl + C -> to stop the server


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
        - 