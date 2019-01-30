var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var roomSchema = new Schema({
    cards: [{_id: String, disliked_by: Array, liked_by: Array}],
    joinCode: String
});

module.exports = mongoose.model("room", roomSchema);
