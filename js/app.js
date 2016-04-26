import React from 'react';
import omniscient from 'omniscient';
import Slides from './eventSlides';

const component = omniscient.withDefaults({
  jsx: true
});

$(document).ready(function(){
  $('.slider').slider({full_width: true});
  $.ajax({
   type: 'GET',
    url: 'http://localhost:3666/events',
    headers : {
      "accept" : "application/json"
    },
    success: function(json) {
       $('body').append("<img src=\"" + json[0].image + "\" />");
    },
    error: function(e) {
       console.log(e.message);
    }
});
});

const App = component('App', ({ counter }) => {
  return (
    <div className="app">
          <Slides />
    </div>
  )
});

export default App;
