const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: true}))

app.use(bodyParser.json())

//start
// Configuring the database
const dbConfig =require('./config/database.config.js')
const mongoose = require('mongoose')

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url ,{
    useNewUrlParser : true
}).then(()=>{
    console.log('Successfully connected to the database')
}).catch(err =>{
    console.log('Could not connect to the database. Exiting now...', err)
    process.exit();
});

//end


app.get('/',(req,res)=>{
    res.json({"message" : "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."})
});

app.listen(3000, ()=>{
    console.log("Server is listening on port 3000")
})

require('./app/routes/note.routes.js')(app);