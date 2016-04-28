import React from 'react';
import omniscient from 'omniscient';
import Slides from './eventSlides';
import component from './jsxComponent';

$(document).ready(function(){
  $('.slider').slider({full_width: true});
});

const App = component('App', ({ counter }) => {
  return (
    <div className="app">
      <Slides />
    </div>
  )
});

export default App;
