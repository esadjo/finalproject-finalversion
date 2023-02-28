// QUESTION - IS THE PROCESS OF USING A DEV TOOLCHAIN DIFFERENT FROM A WEB EXTENSION BROWSER
// To do before done with prototype 1 - Need to make sure that the getWeatherIcon etc functions are rerun immediately to update the weather icon as soon as user inputs a new location when slow down the number of set interval function
let showBlocks = true;
let icon = 'https://cdn.weatherapi.com/weather/64x64/day/116.png'; // hard coded
let currentWeather;
const weatherIconImg = new Image(50, 50);
let count = 0;
let locationf = 'seattle';

getWeatherIcon(); // just once so will load properly when first open


  //TESTING GETHWEATHERICON
  // Temporarily removed the intervalID for automatically running getWeatherIcon because causes changing the plant type to not work -- QUESTION OF WHY??
  //60000 for every minute // Change to 600000 for 10 minutes // Calling function every 1 minute (eventuall 30): https://developer.mozilla.org/en-US/docs/Web/API/setInterval
    // Logical error resolve -- how to make sure that this function is only call every 15 minutes instead of restarting that timer each time a user changes the plant type and it restarts the page -- the way to go about this is to not call this function directly in the function that creates the block (will be called everytime the items update) (THIS STEP IS DONE!)
  const intervalID = setInterval(getWeatherIcon, 6000); //60000); //900000); // Set to update every 15 minutes based on how Weather API said updates data every 10-15 for realtime weather (https://www.weatherapi.com/pricing.aspx) -- don't want to call when it's not updated
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
  chrome.storage.sync.get("locationSaved", (items) => {
    locationf = items.locationSaved; // comment out TO GET IT BACK TO BEING STATIC -- QUESTION OF HOW TO WRITE CODE THAT ENTER ON POPUP LISTEN EVENT TRIGGERS RUNNING GETTING WEATHER ICON AGAIN (MAY NEED TO SAVE AND COMPARE PREVIOUS VERSIONS OF THE LOCATION AND RUN IF NOT THE SAME -- MIGHT BE A SIMPLER WAY)
  });

  console.log("Location inputted: " + locationf);

  fetch("https://api.weatherapi.com/v1/current.json?key=[ ADD KEY AND REMOVE BRACKETS ]&q=" + locationf + "&aqi=no") // https://www.weatherapi.com/api-explorer.aspx
  // Then convert the response to JSON
  .then((response) => response.json())
  .then((data) => {
   // console.log(data);
    let weatherDetails = data;
    icon = "https:" + weatherDetails['current']['condition']['icon'];
    currentWeather = weatherDetails['current']['condition']['text'];
    console.log(icon);
    console.log(currentWeather);
    weatherIconImg.src = icon;

    //Getting day or night 
    timeofDay = weatherDetails['current']['is_day'];
    console.log('Day or night (1 = yes, 0 = no):' + timeofDay);
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
  console.log("here");
  console.log("This is icon rn:" + icon);

  // Create a div for the block
  // block.remove();
  block.classList.add("blocker-block");

  // Add the block to the block container
  blockContainer.appendChild(block);

  //const weatherIconImg = new Image(50, 50);
  weatherIconImg.src = icon; // Hard coded -- 'https://cdn.weatherapi.com/weather/64x64/day/116.png';
  block.appendChild(weatherIconImg);
  // Use Interactive Weather API Explorer to see what kind of calls and requests are possible - https://www.weatherapi.com/api-explorer.aspx
  
  const myImage = new Image(50, 50);
  if (name == "sprout") {
    myImage.src = 'https://github.com/esadjo/esadjo-bookmarker-extension/blob/main/web%20browser%20plant/images/sprout.png?raw=true';
  } else if (name == "herb") {
    myImage.src = 'https://github.com/esadjo/esadjo-bookmarker-extension/blob/main/web%20browser%20plant/images/herb.png?raw=true';
  } else if (name == "clover") {
    myImage.src = 'https://github.com/esadjo/esadjo-bookmarker-extension/blob/main/web%20browser%20plant/images/clover.png?raw=true';
  }
  
  //TESTING -- TRYING TO ADD BACKGROUND
  block.appendChild(myImage);
  const backgroundImg = new Image(100, 100);
  backgroundImg.src = 'https://github.com/esadjo/finalproject-prototype1/blob/main/web%20browser%20plant%20world/images/day-background.png?raw=true'; //'/images/backgroundImg.png';
  block.appendChild(backgroundImg);
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

// Add a message listener that sets the value of "replace"
chrome.runtime.onMessage.addListener((request) => {
  showBlocks = request["enable"];
  dispType = request["type"]; //TESTING // specify plant
  if (request["addBlock"]) {
    // https://www.w3schools.com/jsref/met_node_removechild.asp (To remove other plants)
    while (ultimateBlock.hasChildNodes()) { 
      ultimateBlock.removeChild(ultimateBlock.firstChild);
    } 
    addBlock(dispType, ultimateBlock);
  }
  renderBlocks();
});