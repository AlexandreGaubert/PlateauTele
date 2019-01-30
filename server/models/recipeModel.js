var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var recipeSchema = new Schema({
  title: String,
  recipeType: String,
  img: String,
  total_time: String,
  guest_number: String,
  difficulty: String,
  prep_time: String,
  rest_time: String,
  cook_time: String,
  ingredients: [{ingredient: String, icon: String}],
  instructions: [String]
});

module.exports = mongoose.model("recipe", recipeSchema);
