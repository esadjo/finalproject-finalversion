//var showBlocks = true;
//let showBlocks = true; 
var showBlocks;
var type = "";






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
  
  const myImage = new Image(100, 100);
  if (name == "sprout") {
    myImage.src = 'https://github.com/esadjo/esadjo-bookmarker-extension/blob/main/plants/images/sprout.png?raw=true';
  } else if (name == "herb") {
    myImage.src = 'https://github.com/esadjo/esadjo-bookmarker-extension/blob/main/plants/images/herb.png?raw=true';
  } else if (name == "clover") {
    myImage.src = 'https://github.com/esadjo/esadjo-bookmarker-extension/blob/main/plants/images/clover.png?raw=true';
  }
  
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

const ultimateBlock = document.createElement("div");

chrome.storage.sync.get("check", (items) => {
  showBlocks = items.check;
  console.log("This is the current showBlocks state OUTSIDE: " + showBlocks);
});
console.log("This is Outside of chrome.runtime.onMessage");

chrome.storage.sync.get("plants", (items) => {
  type = items.plants;
  console.log("This is the current type: " + type);
  console.log("This is what checkmark is currently saying: " + showBlocks);
  /*if (showBlocks = true) {
    // https://www.w3schools.com/jsref/met_node_removechild.asp (To remove other plants)
    while (ultimateBlock.hasChildNodes()) { 
      ultimateBlock.removeChild(ultimateBlock.firstChild);
      console.log("cleared");
    } 
    addBlock(type, ultimateBlock);
    console.log("In true fo showblocks if statement");
  } else {
    while (ultimateBlock.hasChildNodes()) { 
      ultimateBlock.removeChild(ultimateBlock.firstChild);
      console.log("Remove");
    } 
    console.log("In false fo showblocks if statement");
  }*/
});
//renderBlocks();



// Add a message listener that sets the value of "replace"
chrome.runtime.onMessage.addListener((request) => {
  // Get the rules key from Chrome storage, and assign its value to our rules
  // object
  chrome.storage.sync.get("check", (items) => {
    showBlocks = items.check;
    console.log("This is the current showBlocks state INSIDE: " + showBlocks);
  });
  console.log("This is INSIDE of chrome.runtime.onMessage");
  renderBlocks();
  chrome.storage.sync.get("plants", (items) => {
    type = items.plants;
    console.log("This is the current type: " + type);
    if (showBlocks == true) {
      console.log("Inside if showBlocks = true");
      // https://www.w3schools.com/jsref/met_node_removechild.asp (To remove other plants)
      while (ultimateBlock.hasChildNodes()) { 
        ultimateBlock.removeChild(ultimateBlock.firstChild);
        console.log("cleared");
      } 
      addBlock(type, ultimateBlock);
      console.log("here");
      
    } else {
      console.log("Inside if showBlocks = false");
      while (ultimateBlock.hasChildNodes()) { 
        ultimateBlock.removeChild(ultimateBlock.firstChild);
        console.log("Remove");
      } 
    }
  });
  //renderBlocks();
});


