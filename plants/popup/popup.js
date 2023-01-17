const checkbox = document.getElementById("enable");
//const addBlockButton = document.getElementById("add-block");
//Need to create const for the cursor buttons -- need to add ids to the buttons in pop-up html

// Add event listeners to the checkbox and button
checkbox.addEventListener("change", (e) => updateContentScript(false, "no"));
//addBlockButton.addEventListener("click", (e) => updateContentScript(true));

function updateButtonColor(sprout, herb, clover, v1, v2, v3) { // Updating button background colors of plants based on which one selected
  sprout.style.backgroundColor = v1;
  herb.style.backgroundColor = v2;
  clover.style.backgroundColor = v3;
}

const addSprout = document.getElementById("sprout");
const addHerb = document.getElementById("herb");
const addClover = document.getElementById("clover");

addSprout.addEventListener("click", (e) => updateContentScript(true, "sprout"), saveRule("sprout")); 
addHerb.addEventListener("click", (e) => updateContentScript(true, "herb"), saveRule("herb")); 
addClover.addEventListener("click", (e) => updateContentScript(true, "clover"), saveRule("clover")); 



async function updateContentScript(addBlock, name) {
  // Sends a message to the content script with an object that has the
  // current value of the checkbox and a boolean (whether to add a block)
  if (name == "sprout") {
    updateButtonColor(addSprout, addHerb, addClover, "#D2F4A1", "#FFFFFF", "#FFFFFF");
  } else if (name == "herb") {
    updateButtonColor(addSprout, addHerb, addClover, "#FFFFFF", "#D2F4A1", "#FFFFFF");
  } else if (name == "clover") {
    updateButtonColor(addSprout, addHerb, addClover, "#FFFFFF", "#FFFFFF", "#D2F4A1");
  }

  const message = { enable: checkbox.checked, addBlock: addBlock, type: name };
  const [tab] = await chrome.tabs.query({
    active: true,
    lastFocusedWindow: true,
  });
  const response = await chrome.tabs.sendMessage(tab.id, message);
  // You can do something with response from the content script here
  console.log(response);
}

//Testing
function saveRule(plants) {
  //plants = ["sprout", "herb"]
  chrome.storage.sync.set({ plants: plants });
}