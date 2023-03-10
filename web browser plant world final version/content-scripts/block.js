// Last to do -- Change the dimensions of the plant images in content scripts and popup and update the images themselves (and their css positioning in block.css) so that the circle selector on the popup is a circle (make the width and height of the image the same)
// Get rid of unused code on both content scripts and popup -- double check that isn't breaking anything when save 


  const ultimateBlock = document.createElement("div");

  // Create a block container div and append it to the document
  const blockContainer = document.createElement("div");
  blockContainer.classList.add("blockContainer");
  document.body.appendChild(blockContainer);


let showBlocks = true;
let icon;
let currentWeather;

let count = 0;
let locationf;
let dayvalue = 1;
let dispType;




console.log("locationf outside of message:" + locationf);


// seeing what stored -- chrome.storage.sync.set({block: showBlocks, plant: dispType, locationFin: locationf});

chrome.storage.sync.get("locationFin", (items) => {
  locationf = items.locationFin; 
  console.log("HERE HERE HERE IN SYNC GET LOCATION");
  console.log("What is locationf right now?: " + locationf); // Correct value
});



// Get the rules key from Chrome storage, and assign its value to our rules
// object

chrome.storage.sync.get("plant", (items) => {
  type = items.plant;
  dispType = type;
  console.log("HERE HERE HERE IN SYNC GET PLANT");
  console.log("What is PLANT dispType right now?: " + dispType);

});

chrome.storage.sync.get("block", (items) => {
  showBlocks = items.block;
  console.log("HERE HERE HERE IN SYNC GET BLOCK");
  console.log("What is BLOCK right now?: " + showBlocks);
  if (showBlocks) {
    console.log("TOP!!!!");
    // https://www.w3schools.com/jsref/met_node_removechild.asp (To remove other plants)
    while (ultimateBlock.hasChildNodes()) { 
      ultimateBlock.removeChild(ultimateBlock.firstChild);
    } 
    console.log("I'm reaching this point in the if statement");
    getWeatherIcon();
    console.log("Looks like getWeatherIcon going through");
    addBlock(ultimateBlock);
  }
  console.log("IOUTSIDE");
  
  renderBlocks();
});


let weatherIconImg = new Image(60, 60);
let backgroundImg = new Image(120, 125.74);
let myImage = new Image(65, 65); //new Image(65, 56.1);

chrome.storage.sync.get("addBl", (items) => {
  stateA = items.addBl;
  console.log("HERE HERE HERE IN SYNC ADDBL adding block");
  console.log("What is ADDBL right now?: " + stateA);


});


  const intervalID = setInterval(getWeatherIcon, 900000); 


// Based on https://www.geeksforgeeks.org/how-to-clear-the-content-of-a-div-using-javascript/
function clear(element) {
  var div = document.getElementById(element);
  while(div.firstChild) {
      div.removeChild(div.firstChild);
  }
}


// Reference for fetch - https://github.com/branchwelder/example-fetch/blob/main/index.js 
function getWeatherIcon() { 
  console.log("At beginning of getWeatherIcon function");

  console.log("Location inputted: " + locationf);

  fetch("https://api.weatherapi.com/v1/current.json?key=f6ebba3edec24edbba9211625232802&q=" + locationf + "&aqi=no") // https://www.weatherapi.com/api-explorer.aspx
  // Then convert the response to JSON
  .then((response) => response.json())
  .then((data) => {
   // console.log(data);
    let weatherDetails = data;
    icon = "https:" + weatherDetails['current']['condition']['icon'];
    let currentWeatherUpper = weatherDetails['current']['condition']['text'];
    currentWeather = currentWeatherUpper.toLowerCase();
    console.log(icon);
    console.log(currentWeather);
    weatherIconImg.src = icon;

    //Getting day or night 
   dayvalue = weatherDetails['current']['is_day'];

    console.log('Day or night (1 = yes, 0 = no):' + dayvalue);
    

    if (dayvalue == 1) {
      backgroundImg.src = 'https://github.com/esadjo/finalproject-finalversion/blob/main/web%20browser%20plant%20world%20final%20version/images/day-background.png?raw=true'; //'/images/backgroundImg.png';
    } else {
      backgroundImg.src = 'https://github.com/esadjo/finalproject-finalversion/blob/main/web%20browser%20plant%20world%20final%20version/images/night-background.png?raw=true';
    }

    console.log("INSIDE GETWEATHERICON -- Is it knowing what dispType is?: " + dispType);

    if (dispType == "sprout") {
      // Reference includes - https://www.w3schools.com/jsref/jsref_includes.asp
      // Reference lowercase - https://www.w3schools.com/jsref/jsref_tolocalelowercase.asp 
  
  
      // Clear conditions
      if (currentWeather.includes("sunny") || currentWeather.includes("clear") || currentWeather.includes("cloudy") || currentWeather.includes("overcast") || currentWeather.includes("thundery outbreaks")) {
        // "Sunny" , "Clear" , "Partly cloudy", "Cloudy", "Overcast", "Thundery outbreaks possible"
        // INCLUDES: "sunny", "clear", "cloudy", "overcast", "thundery outbreaks",
        myImage.src = 'https://github.com/esadjo/finalproject-finalversion/blob/main/web%20browser%20plant%20world%20final%20version/images/sprout-nothing.png?raw=true';
      
      // Rainy Snow Conditions
      } else if (currentWeather.includes("sleet") || currentWeather.includes("freezing")) {
        // "Patchy sleet possible", "Patchy freezing drizzle possible", "Freezing drizzle", "Freezing fog", "Light freezing rain", "Moderate or heavy freezing rain", "Light sleet", "Moderate or heavy sleet", "Light sleet showers", "Moderate or heavy sleet showers", 
        // INCLUDES: "sleet", "freezing"
        myImage.src = 'https://github.com/esadjo/finalproject-finalversion/blob/main/web%20browser%20plant%20world%20final%20version/images/sprout-snow-rain.png?raw=true';
        
      // Rainy conditions
      } else if (currentWeather.includes("mist") || currentWeather.includes("patchy rain") || currentWeather.includes("fog") || currentWeather.includes("light drizzle") || currentWeather.includes("light rain") || currentWeather.includes("moderate rain") || currentWeather.includes("heavy rain") || currentWeather.includes("rain shower")) {
        // "Mist", "Patchy rain possible", "Fog", "Patchy light drizzle", "Light drizzle", "Patchy light rain", "Light rain", "Moderate rain at times", "Moderate rain", "Heavy rain at times", "Heavy rain", "Light rain shower", "Moderate or heavy rain shower", "Torrential rain shower", "Patchy light rain with thunder", "Moderate or heavy rain with thunder",
        //Includes "mist", "patchy rain", "fog", "light drizzle", "light rain", "moderate rain", "heavy rain", "rain shower",
        myImage.src = 'https://github.com/esadjo/finalproject-finalversion/blob/main/web%20browser%20plant%20world%20final%20version/images/sprout-rain.png?raw=true';
      
      // Snowy conditions  
      } else if (currentWeather.includes("snow") || currentWeather.includes("blizzard") ||  currentWeather.includes("ice pellets") || currentWeather.includes("snow showers")) {
        // "Patchy snow possible",  "Blowing snow", "Blizzard",  "Patchy light snow", "Light snow", "Patchy moderate snow", "Moderate snow", "Patchy heavy snow", "Heavy snow", "Ice pellets", "Light snow showers", "Light showers of ice pellets", "Moderate or heavy showers of ice pellets", "Patchy light snow with thunder", "Moderate or heavy snow with thunder", "Moderate or heavy snow showers",
        // INCLUDES: "snow", "blizzard", "ice pellets", "snow showers", 
        myImage.src = 'https://github.com/esadjo/finalproject-finalversion/blob/main/web%20browser%20plant%20world%20final%20version/images/sprout-snow.png?raw=true';
      } else {
        myImage.src = 'https://github.com/esadjo/finalproject-finalversion/blob/main/web%20browser%20plant%20world%20final%20version/images/sprout-nothing.png?raw=true';
      }
    
      
      
    } else if (dispType == "herb") {
     
          // Clear conditions
          if (currentWeather.includes("sunny") || currentWeather.includes("clear") || currentWeather.includes("cloudy") || currentWeather.includes("overcast") || currentWeather.includes("thundery outbreaks")) {
            console.log("in weather conditions clear herb");
            // "Sunny" , "Clear" , "Partly cloudy", "Cloudy", "Overcast", "Thundery outbreaks possible"
            // INCLUDES: "sunny", "clear", "cloudy", "overcast", "thundery outbreaks",
            myImage.src = 'https://github.com/esadjo/finalproject-finalversion/blob/main/web%20browser%20plant%20world%20final%20version/images/herb-nothing.png?raw=true';
          
          // Rainy Snow Conditions
          } else if (currentWeather.includes("sleet") || currentWeather.includes("freezing")) {
            // "Patchy sleet possible", "Patchy freezing drizzle possible", "Freezing drizzle", "Freezing fog", "Light freezing rain", "Moderate or heavy freezing rain", "Light sleet", "Moderate or heavy sleet", "Light sleet showers", "Moderate or heavy sleet showers", 
            // INCLUDES: "sleet", "freezing"
            myImage.src = 'https://github.com/esadjo/finalproject-finalversion/blob/main/web%20browser%20plant%20world%20final%20version/images/herb-snow-rain.png?raw=true';
            
          // Rainy conditions
          } else if (currentWeather.includes("mist") || currentWeather.includes("patchy rain") || currentWeather.includes("fog") || currentWeather.includes("light drizzle") || currentWeather.includes("light rain") || currentWeather.includes("moderate rain") || currentWeather.includes("heavy rain") || currentWeather.includes("rain shower")) {
            // "Mist", "Patchy rain possible", "Fog", "Patchy light drizzle", "Light drizzle", "Patchy light rain", "Light rain", "Moderate rain at times", "Moderate rain", "Heavy rain at times", "Heavy rain", "Light rain shower", "Moderate or heavy rain shower", "Torrential rain shower", "Patchy light rain with thunder", "Moderate or heavy rain with thunder",
            //Includes "mist", "patchy rain", "fog", "light drizzle", "light rain", "moderate rain", "heavy rain", "rain shower",
            myImage.src = 'https://github.com/esadjo/finalproject-finalversion/blob/main/web%20browser%20plant%20world%20final%20version/images/herb-rain.png?raw=true';
          
          // Snowy conditions  
          } else if (currentWeather.includes("snow") || currentWeather.includes("blizzard") ||  currentWeather.includes("ice pellets") || currentWeather.includes("snow showers")) {
            // "Patchy snow possible",  "Blowing snow", "Blizzard",  "Patchy light snow", "Light snow", "Patchy moderate snow", "Moderate snow", "Patchy heavy snow", "Heavy snow", "Ice pellets", "Light snow showers", "Light showers of ice pellets", "Moderate or heavy showers of ice pellets", "Patchy light snow with thunder", "Moderate or heavy snow with thunder", "Moderate or heavy snow showers",
            // INCLUDES: "snow", "blizzard", "ice pellets", "snow showers", 
            myImage.src = 'https://github.com/esadjo/finalproject-finalversion/blob/main/web%20browser%20plant%20world%20final%20version/images/herb-snow.png?raw=true';
          } else {
            myImage.src = 'https://github.com/esadjo/finalproject-finalversion/blob/main/web%20browser%20plant%20world%20final%20version/images/herb-nothing.png?raw=true';
          }
  
    } else if (dispType == "clover") {
      
          // Clear conditions
          if (currentWeather.includes("sunny") || currentWeather.includes("clear") || currentWeather.includes("cloudy") || currentWeather.includes("overcast") || currentWeather.includes("thundery outbreaks")) {
            // "Sunny" , "Clear" , "Partly cloudy", "Cloudy", "Overcast", "Thundery outbreaks possible"
            // INCLUDES: "sunny", "clear", "cloudy", "overcast", "thundery outbreaks",
            myImage.src = 'https://github.com/esadjo/finalproject-finalversion/blob/main/web%20browser%20plant%20world%20final%20version/images/clover-nothing.png?raw=true';
          
          // Rainy Snow Conditions
          } else if (currentWeather.includes("sleet") || currentWeather.includes("freezing")) {
            // "Patchy sleet possible", "Patchy freezing drizzle possible", "Freezing drizzle", "Freezing fog", "Light freezing rain", "Moderate or heavy freezing rain", "Light sleet", "Moderate or heavy sleet", "Light sleet showers", "Moderate or heavy sleet showers", 
            // INCLUDES: "sleet", "freezing"
            myImage.src = 'https://github.com/esadjo/finalproject-finalversion/blob/main/web%20browser%20plant%20world%20final%20version/images/clover-snow-rain.png?raw=true';
            
          // Rainy conditions
          } else if (currentWeather.includes("mist") || currentWeather.includes("patchy rain") || currentWeather.includes("fog") || currentWeather.includes("light drizzle") || currentWeather.includes("light rain") || currentWeather.includes("moderate rain") || currentWeather.includes("heavy rain") || currentWeather.includes("rain shower")) {
            // "Mist", "Patchy rain possible", "Fog", "Patchy light drizzle", "Light drizzle", "Patchy light rain", "Light rain", "Moderate rain at times", "Moderate rain", "Heavy rain at times", "Heavy rain", "Light rain shower", "Moderate or heavy rain shower", "Torrential rain shower", "Patchy light rain with thunder", "Moderate or heavy rain with thunder",
            //Includes "mist", "patchy rain", "fog", "light drizzle", "light rain", "moderate rain", "heavy rain", "rain shower",
            myImage.src = 'https://github.com/esadjo/finalproject-finalversion/blob/main/web%20browser%20plant%20world%20final%20version/images/clover-rain.png?raw=true';
          
          // Snowy conditions  
          } else if (currentWeather.includes("snow") || currentWeather.includes("blizzard") ||  currentWeather.includes("ice pellets") || currentWeather.includes("snow showers")) {
            // "Patchy snow possible",  "Blowing snow", "Blizzard",  "Patchy light snow", "Light snow", "Patchy moderate snow", "Moderate snow", "Patchy heavy snow", "Heavy snow", "Ice pellets", "Light snow showers", "Light showers of ice pellets", "Moderate or heavy showers of ice pellets", "Patchy light snow with thunder", "Moderate or heavy snow with thunder", "Moderate or heavy snow showers",
            // INCLUDES: "snow", "blizzard", "ice pellets", "snow showers", 
            myImage.src = 'https://github.com/esadjo/finalproject-finalversion/blob/main/web%20browser%20plant%20world%20final%20version/images/clover-snow.png?raw=true';
          } else {
            myImage.src = 'https://github.com/esadjo/finalproject-finalversion/blob/main/web%20browser%20plant%20world%20final%20version/images/clover-nothing.png?raw=true';
          }
    } 


    count += 1;
    console.log("Count: " + count);
  });
  console.log("At end of getWeatherIcon function");
}





function addBlock(block) {

  block.classList.add("blocker-block");

  // Add the block to the block container
  blockContainer.appendChild(block);



  backgroundImg.classList.add("elementPosition");
  block.appendChild(backgroundImg);
  

  weatherIconImg.src = icon; 
  weatherIconImg.classList.add("weathericonPosition");
  block.appendChild(weatherIconImg);
 
  
  myImage.classList.add("plantPosition");
  block.appendChild(myImage);

}

function deleteParent(e) {
  e.target.parentNode.remove();
}



function renderBlocks() {
  if (showBlocks) {
    blockContainer.classList.remove("invisible");
  } else {
    blockContainer.classList.add("invisible");
  }
}





// Add a message listener that sets the value of "replace" // so that updates when changes are paid (e.g., when new location sent)
chrome.runtime.onMessage.addListener((request) => {
  console.log("SHOULD BE SHOWING MESSAGE!!!");
  console.log(request);

  showBlocks = request["enable"];
  dispType = request["type"];
  locationf = request['location2'];
  addingB = request["addBlock"];
  console.log("locationf in message:" + locationf);
  // Saving multiple at a time reference -- https://stackoverflow.com/questions/31126156/chrome-extensions-saving-multiple-ids-into-chrome-storage 
  
  chrome.storage.sync.set({block: showBlocks, plant: dispType, locationFin: locationf, addBl: addingB});


  
  if (showBlocks) {
    // https://www.w3schools.com/jsref/met_node_removechild.asp (To remove other plants)
    while (ultimateBlock.hasChildNodes()) { 
      ultimateBlock.removeChild(ultimateBlock.firstChild);
    } 
    getWeatherIcon();
    addBlock(ultimateBlock);
  }
  renderBlocks();
});