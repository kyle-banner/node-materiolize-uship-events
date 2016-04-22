const imagesPrefix = "../images/";
let eventsInfo = [
  { //First event
    eventTitle: "Crawfish Boil",
    eventCaption: "Come to the Crawfish Boil! Tear up Matt's Casa!",
    eventInfo: "Friday, May 6th @ Matt Chasen's house on Mt. Bonnell Rd.",
    eventLink: "http://goo.gl/forms/WI7o8ZYdLm",
    eventPicture: "crawfishboil.jpg"
  },
  { //Second event
    eventTitle: "Party Barge",
    eventCaption: "",
    eventInfo: "Friday, June 17th",
    eventLink: "",
    eventPicture: "partybarge.jpg"
  },
  { //Third event
    eventTitle: "Independence Day Holiday",
    eventCaption: "\'murica",
    eventInfo: "",
    eventLink: "",
    eventPicture: "murica.png"
  },
  { //Fourth event
    eventTitle: "",
    eventCaption: "",
    eventInfo: "",
    eventLink: "",
    eventPicture: ""
  },
  { //Fifth event
    eventTitle: "",
    eventCaption: "",
    eventInfo: "",
    eventLink: "",
    eventPicture: ""
  },
  { //Sixth event
    eventTitle: "",
    eventCaption: "",
    eventInfo: "",
    eventLink: "",
    eventPicture: ""
  },
  { //Seventh event
    eventTitle: "",
    eventCaption: "",
    eventInfo: "",
    eventLink: "",
    eventPicture: ""
  },
  { //Eighth event
    eventTitle: "",
    eventCaption: "",
    eventInfo: "",
    eventLink: "",
    eventPicture: ""
  },
  { //Ninth event
    eventTitle: "",
    eventCaption: "",
    eventInfo: "",
    eventLink: "",
    eventPicture: ""
  },
  { //Tenth event
    eventTitle: "",
    eventCaption: "",
    eventInfo: "",
    eventLink: "",
    eventPicture: ""
  }
]

eventsInfo.forEach(event => {
  event.eventPicture = imagesPrefix+event.eventPicture;
});

export default eventsInfo;
