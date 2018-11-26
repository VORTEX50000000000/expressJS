var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var expressValidator = require('express-Validator');
var app = express();

/*
var logger = function(req, res, next){
    console.log('Logging...');
    next();
}

app.use(logger);
*/
//Body Parser Middleware
// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


// Set Static Path
app.use(express. static(path.join(__dirname, 'public')))

app.use(function(req, res, next){
    res.local.errors = null;
    next();
});

app.use(expressValidator({
errorFormatter: function(param, msg, value) {
    var namespace = param.split('.')
    , root = namespace.shift()
    , formParam = root;
    
    while(namespace.length) {
        formParam += '[' + namespace.shift() + ']';
    }
    return {
        param : formParam,
        msg : msg,
        value : value
    };
}        
}));

var users = [
    
    {
        id: 1,
        first_name: 'John',
        last_name: 'Doe',
        email: 'johndoe@gmail.com',
    },
    {
        id: 2,
        first_name: 'Bob',
        last_name: 'Smith',
        email: 'bensmith@gmail.com',
    },
    {
        id: 3,
        first_name: 'Jill',
        last_name: 'Jackson',
        email: 'jjackson@gmail.com',
    },
    
]

app.get('/', function(req, res){
    var title = 'Customers';
    res.render('index', {
        title: 'Customers',
        users: users
    });
});

spp.post('/users/add', function(req,res){
    
    req.checkBody('first_name', 'First Name is Required').notEmpty;
    req.checkBody('last_name', 'Last Name is Required').notEmpty;
    req.checkBody('email', 'Email is Required').notEmpty;
    
    var errors = req.validationerrors();
    
    if(errors){
            res.render('index', {
        title: 'Customers',
        users: users,
        errors:errors
    });
        console.log('ERRORS');
    } else {
        var newUser = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email
        }
        console.log('Succes');
    }
    
    var newUser = {
        first_name:req.body.firstname,
        last_name:req.body.lastname,
        email:req.body.email
    }
    
    console.log(newUser);
});

app.listen(3000, function(){
    console.log('Server Started on Port 3000...');
    
})