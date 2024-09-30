require("dotenv").config()

const express = require("express")
const app = express()
var path = require('path');

var bodyParser=require('body-parser');
var expressSession=require('express-session');
var signup=require('./controllers/signup');
var login=require('./controllers/login');
var profile=require('./controllers/profile');
var menu=require('./controllers/menu');
var home=require('./controllers/home');
var logout=require('./controllers/logout');
var cart=require('./controllers/cart');
// var reg=require('./controllers/reg');

app.set('view engine','ejs');

//Middlewire
// app.use(bodyParser.urlencoded({extended:false}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSession({secret: 'My secret',resave: false,saveUninitialized: true}));

app.get('/',function(req,res){
	res.redirect('/signup');
});


app.use(express.static(path.join(__dirname, 'views')));

app.use('/assets', express.static(path.join(__dirname, 'assets')));

// app.all('*/*',function(req,res,next){
// 	if(req.url=='/home' ||req.url=='/login' ||req.url=='/menu' ||req.url=='/profile' )

// 	{
// 		next();
// 		return;
// 	}
// 	if(req.session.loggedUser==null)
// 	{
//         console.log("no logged in user.")
// 		res.redirect('/signup');
// 	}
// 	else
// 	{
//         console.log(req.session.loggedUser)
// 		next();
// 	}
// });

app.all('*/*', function (req, res, next) {
    // Don't run redirect logic for /signup or static assets (if any)
    if (req.url === '/signup' || req.url === '/login') {
        next(); // Allow access to the signup and login pages
        return;
    }

    if (req.url === '/home' || req.url === '/menu' || req.url === '/profile') {
        // User is trying to access restricted pages
        if (req.session.loggedUser == null) {
            console.log("No logged in user. Redirecting to signup.");
            res.redirect('/signup'); // Redirect to signup if not logged in
            return; // Prevent further code execution
        } else {
            next(); // Allow access if the user is logged in
            return;
        }
    }

    next(); // For other requests, proceed normally
});

app.use('/signup',signup);
app.use('/login',login);
app.use('/home',home);
app.use('/menu',menu);
app.use('/profile', profile);
app.use('/logout',logout);
app.use('/cart', cart);
// app.use('/reg',reg);

const port=process.env.port;
app.listen(port, 
    ()=> console.log(`Server Started on port ${port}...`))


// 
// for inserting the sign up information to the db
// const db = require('./dbserver'); // Assuming this code is in a file named dbserver.js

// // Example of inserting data
// let sql = "INSERT INTO usertable ( user, password) VALUES (?, ?)";
// let params = ['user1@gmail.com', 'password1']; // Replace with actual values

// db.insertData(sql, params, function(result) {
//   if (result) {
//     console.log('Data inserted successfully:', result);
//   } else {
//     console.log('Error inserting data');
//   }
// });


// let sql = "DELETE FROM usertable WHERE user = ?";
// let params = ['John Doe']; // Parameter for the query

// db.deleteData(sql, params, function(result) {
//   if (result) {
//     console.log('Data deleted successfully:', result);
//   } else {
//     console.log('Error deleting data');
//   }
// });