var mongoose = require('mongoose');
var eventSchema = new mongoose.Schema({
  title: String,
  caption: String,
  info : String,
  link : String,
  pictures : Array
});
mongoose.model('Event', eventSchema);
