const express = require("express");
const hbs = require("hbs");
const fs=require('fs');

let app = express();

hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine", "hbs");


//middleware and the order in which they are defined matters
app.use((req, res, next) => {
	var now=new Date().toString();
	//all the info about user making the request is in req
	var log=`${now} == ${req.method} == ${req.url}`;
	console.log(log);
	// fs.appendFile('server.log', log+'\n' ,(error) => {
	// 	if(error) {
	// 		console.log('Unable to save to server.log file');
	// 	}
	// });
	next();
});

// app.use((req,res,next) => {
// 	res.render('maintenance');
// });	

//moved down because were still able to access the help.html
app.use(express.static(__dirname + "/public")); //dirname stores the path to our node directory
//now go to localhost:port/help.html directly


//for partials use > and for helper don't
hbs.registerHelper("getCurrentYear", () => {
	return new Date().getFullYear();
});

hbs.registerHelper("screamIt", text => {
	return text.toUpperCase();
});

// app.get("/", (req, res) => {
// 	// res.send("<h1>HELLO EXPRESS!! </h1>");
// 	res.send({
// 		name:"Gaurav",
// 		age:34
// 	});
// });

app.get("/", (req, res) => {
	res.render("home", {
		pageTitle: "Home Page",
		currentYear: new Date().getFullYear(),
		message: "Welcome Home"
	});
});

app.get("/about", (req, res) => {
	res.render("about", {
		pageTitle: "About page",
		currentYear: new Date().getFullYear(),
		message: "top of the morning to ya ladies"
	});
});

app.get("/bad", (req, res) => {
	res.send({
		status: "Bad request"
	});
});


const port=process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`server has started on ${port}`);
});
