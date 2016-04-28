import component from './jsxComponent';
import React from 'react';
import shouldUpdate from 'omniscient/shouldupdate';
import eventsArray from './eventInfo';

const Slides = component('Slides', {

}, () => {
  var eventInfo = [];
  $.ajax({
    async: false,
    type: 'GET',
    url: 'http://localhost:3666/events',
    headers : {
      "accept" : "application/json"
    },
    success: function(json) {
       eventInfo = json;
    },
    error: function(e) {
       console.log(e.message);
    }
  });

  let i = 0;
  const eventsInstance = eventInfo.map(event =>
    <li key={i++}>
      <img src={event.image} className="filterImg"></img>
      <div className="caption center-align">
          <h3>{event.title}</h3>
          {event.caption === "" ? "" : <h5 className="light text-lighten-3">{event.caption}</h5>}
          {event.info === "" ? "" : <h5 className="light text-lighten-3">{event.info}</h5>}
          {event.link === "" ? "" : <h5 className="light text-lighten-3">{event.link}</h5>}
      </div>
    </li>
  );
  
  return(
    <div className="slider fullscreen events-slider"><ul className="slides">{eventsInstance}</ul></div>
  );

});

export default Slides;
