const axios = require("axios");
const session = require('express-session');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

const port = 8080;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({secret: "shhhh"}))

//Mongo connexion
var mongoDB = 'mongodb://localhost:27017/swipe-my-movie';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//MongoDB Models
var Room = require("./models/roomModel");
var Recipe = require("./models/recipeModel");
var Movie = require("./models/movieModel");

var sess = Object();

io.on('connection', function(socket) {
  var user_id = '_' + Math.random().toString(36).substr(2, 9);
  console.log('user_connected');
  socket.emit('user_id', user_id)

  socket.on('joinRoom', function(room_id) {
    socket.join(`${room_id}`);
  })

  socket.on("swipedLeft", function({_id, user_id, card_id}) {
    Room.findOne({_id: _id}, (err, room) => {
      if (err) {
        console.log(err);
        return err;
      }
      var index = room.cards.findIndex((e) => e._id == card_id);
      room.cards[index].disliked_by.push(user_id)

      room.save((err, updatedRoom) => {
        if (err) return err;
        console.log(room.cards[index]);
        //emit response to client to ensure that the swipe was effective ????
      })
    });
  })
})

app.post('/room/create', function(req, res) {
    const {cards_ids} = req.body;
    var room = new Room()
    console.log('creating room');
    cards_ids.map((card_id) => {
        room.cards.push({_id: card_id, disliked_by: [], liked_by: []})
    })

    room.joinCode = Math.random().toString(36).substr(2, 5);

    room.save(function(err) {
        if (err) {
          console.log(err);
          return res.send(500, "internal server error");
        }

        return res.send(200, room)
    })
})

app.post('/room/join', function(req, res) {
  Room.findOne({joinCode: req.body.joinCode}, function(err, room) {
    if(err) return res.send(404, "room not found")
    var cards_ids = room.cards.map(e => e._id);

    Recipe.find({_id : {$in: cards_ids}}, function(err, cards) {
      return res.send(200, {cards, room})
    })
  })
})

app.get('/recipe/get/all', function(req, res) {
  Recipe.find((err, cards) => {
    if (err) return res.send(500, err)
    res.send(200, cards);
  })
})

app.post('/recipe/get/withParams', function(req, res) {
  console.log('creating room');
  const {recipeType, difficulty, ingredient} = req.body;

  var query = {}
  if (recipeType.length !== 0) query.recipeType = recipeType
  if (difficulty.length !== 0) query.difficulty = difficulty

  Recipe.find(query, (err, recipes) => {
    if (err) return res.send(500, err)
    // returnedRecipes = []
    // if (ingredient) {
    //   recipes.map((recipe, key) => {
    //     recipe.ingredients.each(function(i, elem) {
    //       if (elem.indexOf(ingredient) > -1)
    //         returnedRecipes.push(recipe)
    //     })
    //   })
    // }
    res.send(200, recipes);
  })
})

app.get('/movie/get/all', function(req, res) {
  Movie.find((err, cards) => {
    if (err) return res.send(500, err)
    res.send(200, cards);
  })
})

app.post('/movie/get/withParams', function(req, res) {
  const { genre } = req.body;

  var query = {}

  if (genre.length !== 0) query.genre = genre

  Movie.find(query, (err, recipes) => {
    if (err) return res.send(500, err)
    res.send(200, recipes);
  })
})

http.listen(port, function() {
    console.clear();
    console.log(`server is listening on port ${port}.`)
})
