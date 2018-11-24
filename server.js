const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const socket = require('socket.io');
const express = require('express');
const hbs = require('hbs');

const {mongoose} = require('./db/mongoose');
const {User} = require('./db/models/User');

const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
var io = socket(server);

app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.set('view-engine', hbs);
hbs.registerPartials('../views/home.hbs');

/*
*   ROUTES
*/
app.get('/', (req, res) => {
    User.find((err, result) => {
        if (err) {
            return res.status(404).send(err);
        }
        res.status(200).render('../views/home.hbs', {allUsers : result});
    });  
});

app.post('/users/', (req, res) => {
    var user = req.body;
    if (user.name === undefined || user.age === undefined){
        res.redirect('/');
    }
    var newUser = new User(user);
    newUser.save().catch((err) => {
        console.log("There was an error with the user input", err);
    });
    res.redirect('/');
});

server.listen(port, () => {
    console.log('Server listening on port: ', port);
});

/*
*   SOCKETS 
*/

io.on('connection', (socket) => {
    console.log('New connection to server Socket');

    socket.on('newUser', (user) => {
        var newUser = new User(user);
        newUser.save().catch((err) => {
            console.log("There was an error with the user input", err);
        });
        io.sockets.emit('newUser', user);
    });
    
});


