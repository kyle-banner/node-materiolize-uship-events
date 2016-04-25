var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'), //mongo connection
    bodyParser = require('body-parser'), //parses information from POST
    methodOverride = require('method-override'), //used to manipulate POST
    upload = require('multer')(),
    imageTypeValidator = require('image-type');

var supportedImageTypes = ['bmp', 'png', 'gif', 'jpg', 'tif'];


function validateAndReturnMime(buffer) {
  var imageInfo = imageTypeValidator(buffer);
  if (imageInfo.ext && supportedImageTypes.indexOf(imageInfo.ext) >= 0 ) {
    return imageInfo.mime;
  } else {
    throw "Image format not supported. Please upload one of the following: " + supportedImageTypes.join(',');
  }
}

//Any requests to this controller must pass through this 'use' function
//Copy and pasted from method-override
router.use(bodyParser.urlencoded({ extended: true }))
router.use(upload.single('image'));
router.use(methodOverride(function(req, res){
      if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method;
        delete req.body._method;
        return method;
      }
}))

//build the REST operations at the base for events
//this will be accessible from http://127.0.0.1:3000/events if the default route for / is left unchanged
router.route('/')
    //GET all events
    .get(function(req, res, next) {
        //retrieve all events from Monogo
        mongoose.model('Event').find({}, function (err, events) {
              if (err) {
                  return console.error(err);
              } else {
                  //respond to both HTML and JSON. JSON responses require 'Accept: application/json;' in the Request Header
                  res.format({
                      //HTML response will render the index.jade file in the views/events folder. We are also setting "events" to be an accessible variable in our jade view
                    html: function(){
                        res.render('events/index', {
                              title: 'All UShip Events',
                              "events" : events
                          });
                    },
                    //JSON response will show all events in JSON format
                    json: function(){
                        res.json(events);
                    }
                });
              }
        });
    })
    //POST a new event
    .post(function(req, res) {
        // Get values from POST request. These can be done through forms or REST calls. These rely on the "name" attributes for forms
        var title = req.body.title;
        var caption = req.body.caption;
        var info = req.body.info;
        var link = req.body.link;
        var imageFileName = req.body.imageFileName
        var image = req.file && req.file.buffer;
        var imageType = "";
        try {
          imageType = validateAndReturnMime(image);
        } catch (e) {
          return res.status(400).send(e);
        }


        //call the create function for our database
        mongoose.model('Event').create({
            title : title,
            caption : caption,
            info : info,
            image : image,
            imageType : imageType,
            link : link
        }, function (err, event) {
              if (err) {
                  res.send("There was a problem adding the information to the database.");
              } else {
                  //event has been created
                  console.log('POST creating new event: ' + event);
                  res.format({
                      //HTML response will set the location and redirect back to the home page. You could also create a 'success' page if that's your thing
                    html: function(){
                        // If it worked, set the header so the address bar doesn't still say /adduser
                        res.location("events");
                        // And forward to success page
                        res.redirect("/events");
                    },
                    //JSON response will show the newly created event
                    json: function(){
                        res.json(event);
                    }
                });
              }
        })
    });

/* GET New event page. */
router.get('/new', function(req, res) {
    res.render('events/new', { title: 'Add New Event' });
});

// route middleware to validate :id
router.param('id', function(req, res, next, id) {
    //console.log('validating ' + id + ' exists');
    //find the ID in the Database
    mongoose.model('Event').findById(id, function (err, event) {
        //if it isn't found, we are going to repond with 404
        if (err) {
            console.log(id + ' was not found');
            res.status(404)
            var err = new Error('Not Found');
            err.status = 404;
            res.format({
                html: function(){
                    next(err);
                 },
                json: function(){
                       res.json({message : err.status  + ' ' + err});
                 }
            });
        //if it is found we continue on
        } else {
            //uncomment this next line if you want to see every JSON document response for every GET/PUT/DELETE call
            //console.log(event);
            // once validation is done save the new item in the req
            req.id = id;
            // go to the next thing
            next();
        }
    });
});

router.route('/:id')
  .get(function(req, res) {
    mongoose.model('Event').findById(req.id, function (err, event) {
      if (err) {
        console.log('GET Error: There was a problem retrieving: ' + err);
      } else {
        console.log('GET Retrieving ID: ' + event._id);
        event.image = event.image && event.image.toString('base64');
        res.format({
          html: function(){
              res.render('events/show', {
                "event" : event
              });
          },
          json: function(){
              res.json(event);
          }
        });
      }
    });
  });

router.route('/:id/edit')
	//GET the individual event by Mongo ID
	.get(function(req, res) {
	    //search for the event within Mongo
	    mongoose.model('Event').findById(req.id, function (err, event) {
	        if (err) {
	            console.log('GET Error: There was a problem retrieving: ' + err);
	        } else {
	            //Return the event
	            console.log('GET Retrieving ID: ' + event._id);
              event.image = event.image && event.image.toString('base64');
	            res.format({
	                //HTML response will render the 'edit.jade' template
	                html: function(){
	                       res.render('events/edit', {
	                          "title" : 'Event:' + event.title,
	                          "event" : event
	                      });
	                 },
	                 //JSON response will return the JSON output
	                json: function(){
	                       res.json(event);
	                 }
	            });
	        }
	    });
	})
	//PUT to update a event by ID
	.put(function(req, res) {
	    // Get our REST or form values. These rely on the "name" attributes
      var title = req.body.title;
      var caption = req.body.caption;
      var info = req.body.info;
      var link = req.body.link;
      var image = req.file && req.file.buffer;
      var imageType = "";
      try {
        imageType = validateAndReturnMime(image);
      } catch (e) {
        return res.status(400).send(e);
      }

	    //find the document by ID
	    mongoose.model('Event').findById(req.id, function (err, event) {
	        //update it
          var updatedEvent = {
	            title : title,
	            caption : caption,
	            info : info,
              link : link
	        };
          if (image) {
            updatedEvent.image = image;
            updatedEvent.imageType = imageType;
          }
	        event.update(updatedEvent, function (err, eventID) {
	          if (err) {
	              res.send("There was a problem updating the information to the database: " + err);
	          }
	          else {
	                  //HTML responds by going back to the page or you can be fancy and create a new view that shows a success page.
	                  res.format({
	                      html: function(){
	                           res.redirect("/events/" + event._id);
	                     },
	                     //JSON responds showing the updated values
	                    json: function(){
	                           res.json(updatedEvent);
	                     }
	                  });
	           }
	        })
	    });
	})
	//DELETE a event by ID
	.delete(function (req, res){
	    //find event by ID
	    mongoose.model('Event').findById(req.id, function (err, event) {
	        if (err) {
	            return console.error(err);
	        } else {
	            //remove it from Mongo
	            event.remove(function (err, event) {
	                if (err) {
	                    return console.error(err);
	                } else {
	                    //Returning success messages saying it was deleted
	                    console.log('DELETE removing ID: ' + event._id);
	                    res.format({
	                        //HTML returns us back to the main page, or you can create a success page
	                          html: function(){
	                               res.redirect("/events");
	                         },
	                         //JSON returns the item with the message that is has been deleted
	                        json: function(){
	                               res.json({message : 'deleted',
	                                   item : event
	                               });
	                         }
	                      });
	                }
	            });
	        }
	    });
	});

module.exports = router;
