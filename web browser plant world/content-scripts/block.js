let showBlocks = true;

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



function addBlock(name, block) {
  // Create a div for the block
  // block.remove();
  block.classList.add("blocker-block");


  // Add the block to the block container
  blockContainer.appendChild(block);

  const weatherIconImg = new Image(50, 50);
  weatherIconImg.src = 'https://cdn.weatherapi.com/weather/64x64/day/116.png';
  block.appendChild(weatherIconImg);
  
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