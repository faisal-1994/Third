// Basic Lib Import
const express =require('express');
const router =require('./src/route/api');
const app= new express();
const bodyParser =require('body-parser');
const urlencoded  = require('express');

// Security Middleware Lib Import
const rateLimit =require('express-rate-limit');
const helmet =require('helmet');
const mongoSanitize =require('express-mongo-sanitize');
// const xss =require('xss-clean');
const hpp =require('hpp');
const cors =require('cors');

//dependencies
// const morgan = require("morgan")
// app.use(morgan("dev"));

// Database Lib Import
const mongoose =require('mongoose');


//!implementation
//cors open
app.use(cors());

//Security implementation
app.use(helmet());
app.use(hpp());
app.use(express.json({limit:"50mb"}));
app.use(express.urlencoded({extended:true}))
// app.use(mongoSanitize());

// Request Rate Limit
const limiter= rateLimit({windowMs:15*60*1000,max:3000});
app.use(limiter);

// Body Parser Implement
app.use(bodyParser.json());



// Connect to  Mongo DB 
 let URI = "mongodb+srv://user:pass@cluster0.981m0ts.mongodb.net/ToDo?retryWrites=true&w=majority"; 
 let OPTION = { user: "", pass: "", autoIndex:true };


let connectMongo = mongoose.connect(URI, OPTION);
connectMongo.then((res) => {
    console.log("successfully connected to database");
}).catch((err) => {
    console.log(err);
    
});

app.use("/api",router);

app.use("*", (req,res)=>{
    res.status(404).json({data:"Not Found"})
})

module.exports = app;
