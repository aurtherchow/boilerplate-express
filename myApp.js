require('dotenv').config();
const bodyParser = require('body-parser');
let express = require('express');
let app = express();


console.log("Hello World")

app.use("/", (req, res, next) => {
    console.log(req.method + ' ' + req.path + ' - ' + req.ip);
    next();
});

app.use( bodyParser.urlencoded({extended: false}));
app.get("/",(req,res) => res.sendFile( __dirname + "/views/index.html"));
app.use("/public", express.static(__dirname + "/public"));
app.get("/json", (req,res) => res.json({"message": `${process.env.MESSAGE_STYLE === 'uppercase' ? 'Hello json'.toUpperCase() : 'Hello json'}`}));
app.get("/now", (req, res, next) => {
    req.time = new Date().toString();
    next();},
    (req, res) => res.json({"time": req.time}));
app.get("/:word/echo", (req, res) => res.json({"echo": req.params.word}));
app.route("/name")
   .get((req, res) => res.json({"name":`${req.query.first} ${req.query.last}`}))
   .post((req, res) => res.json({"name":`${req.body.first} ${req.body.last}`}))


































 module.exports = app;
