import component from './jsxComponent';
import React from 'react';
import Immutable from 'immutable';
import immstruct from 'immstruct';
import shouldUpdate from 'omniscient/shouldupdate';
import eventsArray from './eventInfo';

const Slides = component('Slides', {

}, () => {
  var activeEvents = [];
  eventsArray.forEach(event => {
    if(event.eventTitle !== ""){
      event.backgroundImageStyle = {backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('+event.eventPicture+')'};
      activeEvents.push(event);
    }
  });
  const eventsInstance = activeEvents.map(event =>
    <li>
      <img src={event.eventPicture} className="filterImg"></img>
      <div className="caption center-align">
          <h3>{event.eventTitle}</h3>
          {event.eventCaption === "" ? "" : <h5 className="light text-lighten-3">{event.eventCaption}</h5>}
          {event.eventInfo === "" ? "" : <h5 className="light text-lighten-3">{event.eventInfo}</h5>}
          {event.eventLink === "" ? "" : <h5 className="light text-lighten-3">{event.eventLink}</h5>}
      </div>
    </li>
  );
  return(
    <div className="slider fullscreen events-slider"><ul className="slides">{eventsInstance}</ul></div>
  );

});

export default Slides;

// <div class="slider">
  // <ul class="slides">
  //   <li>
  //     <img src="http://lorempixel.com/580/250/nature/1"> <!-- random image -->
  //     <div class="caption center-align">
  //       <h3>This is our big Tagline!</h3>
  //       <h5 class="light grey-text text-lighten-3">Here's our small slogan.</h5>
  //     </div>
  //   </li>
  //   <li>
  //     <img src="http://lorempixel.com/580/250/nature/2"> <!-- random image -->
  //     <div class="caption left-align">
  //       <h3>Left Aligned Caption</h3>
  //       <h5 class="light grey-text text-lighten-3">Here's our small slogan.</h5>
  //     </div>
  //   </li>
  //   <li>
  //     <img src="http://lorempixel.com/580/250/nature/3"> <!-- random image -->
  //     <div class="caption right-align">
  //       <h3>Right Aligned Caption</h3>
  //       <h5 class="light grey-text text-lighten-3">Here's our small slogan.</h5>
  //     </div>
  //   </li>
  //   <li>
  //     <img src="http://lorempixel.com/580/250/nature/4"> <!-- random image -->
  //     <div class="caption center-align">
  //       <h3>This is our big Tagline!</h3>
  //       <h5 class="light grey-text text-lighten-3">Here's our small slogan.</h5>
  //     </div>
  //   </li>
  // </ul>
// </div>
