let showBlocks = true;
let icon = 'https://cdn.weatherapi.com/weather/64x64/day/116.png'; // hard coded
let currentWeather;
const weatherIconImg = new Image(50, 50);
// Temporarily removed the intervalID for automatically running getWeatherIcon because causes changing the plant type to not work -- QUESTION OF WHY??
//const intervalID = setInterval(getWeatherIcon, 1800000); //60000 for every minute // Change to 600000 for 10 minutes // Calling function every 1 minute (eventuall 30): https://developer.mozilla.org/en-US/docs/Web/API/setInterval
let count = 0;

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

// Reference for fetch - https://github.com/branchwelder/example-fetch/blob/main/index.js 
function getWeatherIcon() {
  console.log("At beginning of getWeatherIcon function");
  fetch("https://api.weatherapi.com/v1/current.json?key=[ ADD KEY HERE and remove brackets ]&q=Seattle&aqi=no") // https://www.weatherapi.com/api-explorer.aspx
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
  //TESTING GETHWEATHERICON
  getWeatherIcon();

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