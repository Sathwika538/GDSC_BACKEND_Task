const bodyParser = require('body-parser');

const express = require('express');

const mongoose = require('mongoose');

const dotenv = require('dotenv');

const routes = require('./routes');

const methodOverride = require('method-override');

const session = require('express-session');
const flash = require('connect-flash');

dotenv.config({path:"config/config.env"});


const app = express();


app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({extended:true}));

app.use(methodOverride('_method'));

app.use(session({
    secret:'secret',
    cookie:{maxAge:2000},
    saveUninitialized: false,
    resave:false
}));

app.use(flash());

mongoose.set('strictQuery', false);
mongoose.connect(process.env.DB_URI,{useNewUrlParser:true}).then((data)=>{
var conn = mongoose.connection;
        app.use('/',routes);
        console.log(`Mongodb connected with server: ${data.connection.host}`);
    }).catch((err)=>{
        console.log(err);
})


app.set('view engine','ejs');
app.use(bodyParser.json());


module.exports = app