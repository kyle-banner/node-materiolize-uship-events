var mongoose = require('mongoose');
var eventSchema = new mongoose.Schema({
  title: String,
  caption: String,
  info : String,
  link : String,
  image : Buffer,
  imageType : String 
});
mongoose.model('Event', eventSchema);
