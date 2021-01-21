//Importing express which is library for nodejs
const express = require('express')
const app = express()
const port = 3002

//Importing express handlebars
var exphbs = require('express-handlebars');
const helpers = require('./lib/helpers')

//Creating 'ExpressHandlebars instance with a default layout
const hbs = exphbs.create({
    helpers,

    //Uses multiple partial dirs, template in shared/templates are used
    partialsDir : [
       // "shared/templates/",
		"views/partials/",
    ]
})

//Importing mongoose for mongodb
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/test', { useNewUrlParser : true, useUnifiedTopology : true });

//outputing the db connection fail or success
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error : '));
db.once('open', ()=>{
    console.log('we are connected to db')
})

//Setting up schema
const medicineScheema = new mongoose.Schema({
    name: String,
    usedFor : Array,
    medicalPrescription : Boolean,
    content : Array,
    quantity : Number,
    manufactur : String,
    actualPrice : Number,
    afterPrice : Number,
    discription : String,
    usedForDiscription : String,
    availability : Boolean,
    pictures : Array,
    category : String
});

const medicine = mongoose.model('Medicine', medicineScheema);
const viks = new medicine({
    name: 'Viks',
    usedFor : ['cough', 'cold', 'maleria'],
    medicalPrescription : false,
    content : ['meth', 'seth', 'leth', 'reth'],
    quantity : 12,
    manufactur : 'Viksy',
    actualPrice : 1.5,
    afterPrice : 2.3,
    discription : 'This is such as beautiful madicine',
    usedForDiscription : 'This must be used for such a things that they can be thinsg',
    availability : true,
    pictures : ['/asasfdf', 'asdasdasd', 'asdasd'],
    category : 'This is such a nice'
});
console.log(viks.name);
viks.save((error, resposne)=>{
    if(error){
        return console.log(error)
    }
    console.log('the details are successfully on db')
})

//Setting up the app engine as handlebars
app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

//Serving webpage
app.get('/', (req, res)=>{
    res.render('home',
    {
        title:'Home'
    })
})

app.listen(port, ()=>{
    console.log(`Example app listening at http://localhost:${port}`)
})