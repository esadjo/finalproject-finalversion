const locationInput = document.getElementById("locationtext"); 
updateLocation();
const locationEntered = document.getElementById("locationBut"); 
locationEntered.addEventListener("click", (e) => {
  SaveUpdateLocation(locationInput);
});
const locationDisplay = document.getElementById("locationUpfront");

const checkbox = document.getElementById("enable");

console.log("Checkbox status before: " + checkbox.checked);


chrome.storage.sync.get("check", (items) => {
  showBlocks = items.check;
  checkbox.checked = showBlocks;
  console.log("Forcing toggle state to update: " + showBlocks);
  if (showBlocks == false) {
    updateContentScript(false, "no");
  }
});

chrome.storage.sync.get("plants", (items) => {
  type = items.plants;
  updateButton(type);
});


// Add event listeners to the checkbox and button
checkbox.addEventListener("change", (e) => {
  saveCheck(checkbox.checked);
  updateContentScript(false, "no");
});
//addBlockButton.addEventListener("click", (e) => updateContentScript(true));

function updateButtonColor(sprout, herb, clover, v1, v2, v3) { // Updating button background colors of plants based on which one selected
  sprout.style.backgroundColor = v1;
  herb.style.backgroundColor = v2;
  clover.style.backgroundColor = v3;
}

const addSprout = document.getElementById("sprout");
const addHerb = document.getElementById("herb");
const addClover = document.getElementById("clover");

addSprout.addEventListener("click", (e) => {
  updateContentScript(true, "sprout"); 
  saveRule("sprout");
}); 

addHerb.addEventListener("click", (e) => {
  updateContentScript(true, "herb");
  saveRule("herb");
}); 

addClover.addEventListener("click", (e) => {
  updateContentScript(true, "clover"); 
  saveRule("clover");
}); 


function saveCheck(status) {
  chrome.storage.sync.set({ check: status });
  console.log("Clicked toggle: " + status);
}

function SaveUpdateLocation(loc) {
  console.log("Location inputed: " + loc.value);
  chrome.storage.sync.set({ locationSaved: loc });
  locationDisplay.innerHTML = loc.value;
  // [TO DO] -- ADD CODE SO THAT THE LOCATION IS UPDATED ON THE POPUP SCREEN
}

function updateLocation() {
  chrome.storage.sync.get("locationSaved", (items) => {
    locationInputted = items.locationSaved;
    // Reference - https://www.w3schools.com/js/js_htmldom_html.asp
    if (locationInputted = 'undefined') {
      locationDisplay.innerHTML = "No location added";
    } else {
      locationDisplay.innerHTML = locationInputted.value;
    }
  });
}

function updateButton(type) {
  if (type == "sprout") {
    updateButtonColor(addSprout, addHerb, addClover, "#D2F4A1", "#FFFFFF", "#FFFFFF");
  } else if (type == "herb") {
    updateButtonColor(addSprout, addHerb, addClover, "#FFFFFF", "#D2F4A1", "#FFFFFF");
  } else if (type == "clover") {
    updateButtonColor(addSprout, addHerb, addClover, "#FFFFFF", "#FFFFFF", "#D2F4A1");
  }
}


async function updateContentScript(addBlock, name) {
  // Sends a message to the content script with an object that has the
  // current value of the checkbox and a boolean (whether to add a block)
  updateButton(name);
  //SaveUpdateLocation(locationInput);
  //updateLocation();
  
  const message = { enable: checkbox.checked, addBlock: addBlock, type: name}; //Testing: locate: locationDisplay.innerHTML
  console.log(message);
  const [tab] = await chrome.tabs.query({
    active: true,
    lastFocusedWindow: true,
  });
  const response = await chrome.tabs.sendMessage(tab.id, message);
  // You can do something with response from the content script here
  console.log(response);
}


function saveRule(name) {
  //console.log('This is save rule!');
  chrome.storage.sync.set({ plants: name });
}
