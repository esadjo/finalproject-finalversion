const checkbox = document.getElementById("enable");
//const addBlockButton = document.getElementById("add-block");
//Need to create const for the cursor buttons -- need to add ids to the buttons in pop-up html

//Testing
function saveCheck(status) {
  chrome.storage.sync.set({ check: status });
  console.log("Clicked toggle: " + status);
}

console.log("Checkbox status before: " + checkbox.checked);

// Add event listeners to the checkbox and button
checkbox.addEventListener("change", (e) => {
  saveCheck(checkbox.checked); 
  //const response = await chrome.tabs.sendMessage(tab.id, message);
});

//checkbox.addEventListener("change", (e) => saveCheck(checkbox.checked));
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
  saveRule("sprout");
  updateContentScript("sprout"); 
}); 

addHerb.addEventListener("click", (e) => {
  saveRule("herb");
  updateContentScript("herb");
}); 

addClover.addEventListener("click", (e) => {
  saveRule("clover");
  updateContentScript("clover"); 
}); 



async function updateContentScript(name) {
  // Sends a message to the content script with an object that has the
  // current value of the checkbox and a boolean (whether to add a block)
  if (name == "sprout") {
    updateButtonColor(addSprout, addHerb, addClover, "#D2F4A1", "#FFFFFF", "#FFFFFF");
    console.log("Recognizes that sprout selected");
  } else if (name == "herb") {
    updateButtonColor(addSprout, addHerb, addClover, "#FFFFFF", "#D2F4A1", "#FFFFFF");
    console.log("Recognizes that herb selected");
  } else if (name == "clover") {
    updateButtonColor(addSprout, addHerb, addClover, "#FFFFFF", "#FFFFFF", "#D2F4A1");
    console.log("Recognizes that clover selected");
  }

  //ADDING TESTING 
  //chrome.storage.sync.set({ plants: name }

  const message = {type: name };
  console.log("This");
  console.log(name);
  console.log(message["type"]); //Problem is the message is not printing!!! WHY??
  //COME FROM HERE: Not working here!!! 
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