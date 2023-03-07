// LIST OF ERRORS TO RESOLVE:
  // Not updating plant image to proper condition when change location (only when change type of plant in popup)
  //Plant image and world image not showing up when move to a different tab OR when refresh page
  // - WEIRD - plant image changes when hit enter button twice (seems like remembering past selection for too long — something about timing not lining up
  // Error getting is: 
      // Error handling response: TypeError: Cannot read properties of undefined (reading 'includes')
      // at addBlock (chrome-extension://hgmlainahkjaohebembopmgblgdbkacg/content-scripts/block.js:189:28)
      //at chrome-extension://hgmlainahkjaohebembopmgblgdbkacg/content-scripts/block.js:251:3

  // - Background image also won’t update unless change the plant type (doesn’t change automatically) -- Does change if click enter twice 
  // Both plant image and background image update properly if submit location 2 times!!! What does this mean?

let showBlocks = true;
let icon; // = 'https://cdn.weatherapi.com/weather/64x64/day/116.png'; // hard coded
let currentWeather;
const weatherIconImg = new Image(50, 50);
let count = 0;
let locationf = 'Los Angeles';
let dayvalue = 1;



console.log("locationf outside of message:" + locationf);

//let locationf;

chrome.storage.sync.get("locationSaved", (items) => {
  locationf = items.locationSaved; // comment out TO GET IT BACK TO BEING STATIC -- QUESTION OF HOW TO WRITE CODE THAT ENTER ON POPUP LISTEN EVENT TRIGGERS RUNNING GETTING WEATHER ICON AGAIN (MAY NEED TO SAVE AND COMPARE PREVIOUS VERSIONS OF THE LOCATION AND RUN IF NOT THE SAME -- MIGHT BE A SIMPLER WAY)
});

console.log("locationf outside of message:" + locationf);




//getWeatherIcon(); // just once so will load properly when first open


  //TESTING GETHWEATHERICON
  // Temporarily removed the intervalID for automatically running getWeatherIcon because causes changing the plant type to not work -- QUESTION OF WHY??
  //60000 for every minute // Change to 600000 for 10 minutes // Calling function every 1 minute (eventuall 30): https://developer.mozilla.org/en-US/docs/Web/API/setInterval
    // Logical error resolve -- how to make sure that this function is only call every 15 minutes instead of restarting that timer each time a user changes the plant type and it restarts the page -- the way to go about this is to not call this function directly in the function that creates the block (will be called everytime the items update) (THIS STEP IS DONE!)
  const intervalID = setInterval(getWeatherIcon, 900000); //60000); //900000); // Set to update every 15 minutes based on how Weather API said updates data every 10-15 for realtime weather (https://www.weatherapi.com/pricing.aspx) -- don't want to call when it's not updated
// Question of how make sure it's called more requently than set interval once accepting user input of the location (will need to update more frequently than every 10-15 minutes)

// Create a block container div and append it to the document
const blockContainer = document.createElement("div");
blockContainer.classList.add("blockContainer");
document.body.appendChild(blockContainer);

// Based on https://www.geeksforgeeks.org/how-to-clear-the-content-of-a-div-using-javascript/
function clear(element) {
  var div = document.getElementById(element);
  while(div.firstChild) {
      div.removeChild(div.firstChild);
  }
}

// TO DO - Figure out how to get location to update and rerun call to API to updat weather icon (for next prototype) - a new function might not be necessary
//function updateLocation() {
//  chrome.storage.sync.get("locationSaved", (items) => {
 //   locationf = items.locationSaved;
//  });
//}

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
    // For prototype 2 - will need to write an if statement of whether value is day, then use the day background, else, use the night background



    count += 1;
    console.log("Count: " + count);
  });
  console.log("At end of getWeatherIcon function");
 // console.log(response.value);
  
  // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
  // Then do something with the JSON data
  //.then((data) => {
   // let weather = data;
}





function addBlock(name, block) {

  // Create a div for the block
  // block.remove();
  block.classList.add("blocker-block");

  // Add the block to the block container
  blockContainer.appendChild(block);


  const backgroundImg = new Image(120, 125.74);
  //PROBLEM WHERE WITH BACKGROUND IMAGE
  if (dayvalue == 1) {
    backgroundImg.src = 'https://github.com/esadjo/finalproject-finalversion/blob/main/web%20browser%20plant%20world/images/day-background.png?raw=true'; //'/images/backgroundImg.png';
  } else {
    backgroundImg.src = 'https://github.com/esadjo/finalproject-finalversion/blob/main/web%20browser%20plant%20world%20final%20version/images/day-background.png?raw=true';
  }

  backgroundImg.classList.add("elementPosition");
  block.appendChild(backgroundImg);
  


  getWeatherIcon();
  console.log("here");
  console.log("This is icon rn:" + icon);
  

  //const weatherIconImg = new Image(50, 50);
  weatherIconImg.src = icon; // Hard coded -- 'https://cdn.weatherapi.com/weather/64x64/day/116.png';
  weatherIconImg.classList.add("weathericonPosition");
  block.appendChild(weatherIconImg);
  // Use Interactive Weather API Explorer to see what kind of calls and requests are possible - https://www.weatherapi.com/api-explorer.aspx
  
  const myImage = new Image(65, 56.1);
  // PROBLEM HERE FOR PLANT TYPE WEATHER CONDITION IMAGES
  if (name == "sprout") {
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
      myImage.src = 'https://github.com/esadjo/finalproject-finalversion/blob/main/web%20browser%20plant%20world%20final%20version/images/sprout-snow.png';
    } else {
      myImage.src = 'https://github.com/esadjo/finalproject-finalversion/blob/main/web%20browser%20plant%20world%20final%20version/images/sprout-nothing.png?raw=true';
    }
  
    
    //myImage.src = 'https://github.com/esadjo/esadjo-bookmarker-extension/blob/main/web%20browser%20plant/images/sprout.png?raw=true';
  } else if (name == "herb") {
    //myImage.src = 'https://github.com/esadjo/esadjo-bookmarker-extension/blob/main/web%20browser%20plant/images/herb.png?raw=true';
    
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

  } else if (name == "clover") {
    //myImage.src = 'https://github.com/esadjo/esadjo-bookmarker-extension/blob/main/web%20browser%20plant/images/clover.png?raw=true';
    
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
  
  myImage.classList.add("plantPosition");
  block.appendChild(myImage);
  //block.append(backgroundImg, weatherIconImg, myImage);

}

function deleteParent(e) {
  e.target.parentNode.remove();
}

chrome.storage.sync.get("check", (items) => {
  showBlocks = items.check;
});


function renderBlocks() {
  if (showBlocks) {
    blockContainer.classList.remove("invisible");
  } else {
    blockContainer.classList.add("invisible");
  }
}

const ultimateBlock = document.createElement("div");






// Get the rules key from Chrome storage, and assign its value to our rules
// object
chrome.storage.sync.get("plants", (items) => {
  type = items.plants;
  addBlock(type, ultimateBlock);
  renderBlocks();
});

// Add a message listener that sets the value of "replace" // so that updates when changes are paid (e.g., when new location sent)
chrome.runtime.onMessage.addListener((request) => {
  console.log("SHOULD BE SHOWING MESSAGE!!!");
  console.log(request);
  showBlocks = request["enable"];
  dispType = request["type"];
  locationf = request['location2'];
  console.log("locationf in message:" + locationf);
  //locationf = ultLocation; // Maybe????
  if (request["addBlock"]) {
    // https://www.w3schools.com/jsref/met_node_removechild.asp (To remove other plants)
    while (ultimateBlock.hasChildNodes()) { 
      ultimateBlock.removeChild(ultimateBlock.firstChild);
    } 
    addBlock(dispType, ultimateBlock);
  }
  renderBlocks();
});