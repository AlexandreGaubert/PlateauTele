var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var movieSchema = new Schema({
  title: String,
  img: String,
  genre: String,
  duration: String,
  overview: String,
  actors: [String],
  producers: [String],
  writers: [String],
  director: String,
  release_year: String,
  release_date: String,
});

module.exports = mongoose.model("movie", movieSchema);
