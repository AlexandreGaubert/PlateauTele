var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var recipeRoomSchema = new Schema({
    recipes: [{_id: String, disliked_by: Array, liked_by: Array}],
    joinCode: String
});

module.exports = mongoose.model("recipeRoom", recipeRoomSchema);
