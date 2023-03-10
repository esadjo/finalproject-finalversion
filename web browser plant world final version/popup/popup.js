const locationInput = document.getElementById("locationtext"); 
const locationEntered = document.getElementById("locationBut"); 
const locationDisplay = document.getElementById("locationUpfront");
let globalPlant; 


let globalLocation = 'Seattle'; // or can leave empty
console.log("Global location var:" + globalLocation);

const checkbox = document.getElementById("enable");
console.log("Checkbox status before: " + checkbox.checked);



chrome.storage.sync.get("locationSaved", (items) => {
  console.log("in chrome.storage.sync.get locationSaved");
  loct = items.locationSaved;
  console.log(loct);
  if (loct == undefined) {
    locationDisplay.innerHTML = "No location"; // So that shows "No location  instead of undefined"
  } else {
    locationDisplay.innerHTML = loct;
  }

  globalLocation = loct;
  console.log(locationDisplay);
}); 

chrome.storage.sync.get("plants", (items) => {
  console.log("in chrome storaget get plants");
  type = items.plants;
  updateButton(type);
  globalPlant = type;
}); 

chrome.storage.sync.get("check", (items) => {
  console.log("in chrome storage get check");
  showBlocks = items.check;
  checkbox.checked = showBlocks;
  console.log("Forcing toggle state to update: " + showBlocks);
  if (showBlocks == false) {
    updateContentScript(false, globalPlant);
  } else {
    updateContentScript(true, globalPlant);
  }
});





locationEntered.addEventListener("click", (e) => {
  console.log("in event listener for clicking the button to enter location");
  if (locationInput.value != "") { // SO that when the text input is empty, it won't update the location
    SaveUpdateLocation(locationInput);
  }

  chrome.storage.sync.get("plants", (items) => {
    type = items.plants;
    updateContentScript(checkbox.checked, type); // instead make a object with all three data points 
  }); 
});




// Add event listeners to the checkbox and button
checkbox.addEventListener("change", (e) => {
  console.log('event listener to changes in toggle');
  saveCheck(checkbox.checked);
  updateContentScript(false, globalPlant);
});

function updateButtonColor(sprout, herb, clover, v1, v2, v3) { // Updating button background colors of plants based on which one selected
  sprout.style.backgroundColor = v1;
  herb.style.backgroundColor = v2;
  clover.style.backgroundColor = v3;
}

const addSprout = document.getElementById("sprout");
const addHerb = document.getElementById("herb");
const addClover = document.getElementById("clover");

addSprout.addEventListener("click", (e) => {
  globalPlant = "sprout";
  updateContentScript(true, globalPlant); 
  saveRule("sprout");
}); 

addHerb.addEventListener("click", (e) => {
  globalPlant = "herb";
  updateContentScript(true, globalPlant);
  saveRule("herb");
}); 

addClover.addEventListener("click", (e) => {
  globalPlant = "clover";
  updateContentScript(true, globalPlant); 
  saveRule("clover");
}); 


function saveCheck(status) {
  chrome.storage.sync.set({ check: status });
  console.log("Clicked toggle: " + status);
}

function SaveUpdateLocation(loc) {
  console.log('where is this?');
  console.log("Location inputted: " + loc.value);
  chrome.storage.sync.set({ locationSaved: loc.value });

  locationDisplay.innerHTML = loc.value;
  
  globalLocation  = loc.value; 
  console.log("Global location var: " + globalLocation);
}



function updateButton(type) {
  if (type == "sprout") {
    updateButtonColor(addSprout, addHerb, addClover, "#D8EDFF", "#FFFFFF", "#FFFFFF");
  } else if (type == "herb") {
    updateButtonColor(addSprout, addHerb, addClover, "#FFFFFF", "#D8EDFF", "#FFFFFF");
  } else if (type == "clover") {
    updateButtonColor(addSprout, addHerb, addClover, "#FFFFFF", "#FFFFFF", "#D8EDFF");
  }
}


async function updateContentScript(addBlock, name) {
  // Sends a message to the content script with an object that has the
  // current value of the checkbox and a boolean (whether to add a block)
  updateButton(name);

  console.log("location display: " + globalLocation);
  
  const message = { enable: checkbox.checked, addBlock: addBlock, type: name, location2: globalLocation};
  //console.log(message);
  const [tab] = await chrome.tabs.query({
    active: true,
    lastFocusedWindow: true,
  });

  const response = await chrome.tabs.sendMessage(tab.id, message);
  // You can do something with response from the content script here
  //console.log(response);
}


function saveRule(name) {
  //console.log('This is save rule!');
  chrome.storage.sync.set({ plants: name });
}
