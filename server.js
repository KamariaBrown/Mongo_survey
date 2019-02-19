const express = require("express"),
    session = require("express-session"),
    port=5000;
    
    
app = express();
app.set('views', __dirname + '/views'); 
app.set('view engine', 'ejs');
app.use(session({
    secret: 'keyboardkitteh',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function (request, response){
    response.render('index');
});

app.post("/result", function (request, response){
    console.log("inside of /result");
    console.log(request.body);
    request.session.data = request.body;
    response.redirect("/result");
});

app.get("/result", function(request,response){
    response.render("result", {'data': request.session.data});
});

app.listen(port, function() {
    console.log(`listening on port ${port}`);
});
