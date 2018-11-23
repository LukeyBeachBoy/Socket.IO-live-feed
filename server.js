const port = process.env.PORT || 3000;

const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const hbs = require('hbs');

const {mongoose} = require('./db/mongoose');
const {User} = require('./db/models/User');

const app = express();
app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.set('view-engine', hbs);
hbs.registerPartials('../views/home.hbs');

app.get('/', (req, res) => {
    User.find((err, result) => {
        if (err) {
            return res.status(404).send(err);
        }
        res.status(200).render('../views/home.hbs', {allUsers : result});
    });  
});

app.post('/users/', (req, res) => {
    console.log(req);
    var user = req.body;
    if (user.name === undefined || user.age === undefined){
        res.status(400).send('No user was submitted');
    }
    var newUser = new User(user);
    newUser.save().catch((err) => {
        console.log("There was an error with the user input", err);
    });
});


app.listen(port);
console.log(`Server running on port: ${port}`);