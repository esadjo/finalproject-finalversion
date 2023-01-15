const checkbox = document.getElementById("enable");
//const addBlockButton = document.getElementById("add-block");
//Need to create const for the cursor buttons -- need to add ids to the buttons in pop-up html

// Add event listeners to the checkbox and button
checkbox.addEventListener("change", (e) => updateContentScript(false, "no"));
//addBlockButton.addEventListener("click", (e) => updateContentScript(true));

function updateButtonColor(sprout, herb, clover, v1, v2, v3) { //FIGURE OUT HOW TO UPDATE BACKGROUND COLOR BASED ON WHICH ONE SELECTED MOST RECENTLY -- RIGHT NOW -- JUST SHOWING FOR CLOVER BECAUSE THINK OF ORDER OF CLICK BUTTON EVENT LISTENERS BELOW
  sprout.style.backgroundColor = v1;
  herb.style.backgroundColor = v2;
  clover.style.backgroundColor = v3;
}

const addSprout = document.getElementById("sprout");
const addHerb = document.getElementById("herb");
const addClover = document.getElementById("clover");

addSprout.addEventListener("click", (e) => updateContentScript(true, "sprout"), updateButtonColor(addSprout, addHerb, addClover, "#3D7F20", "#D7F2B2", "#D7F2B2"));
addHerb.addEventListener("click", (e) => updateContentScript(true, "herb"), updateButtonColor(addSprout, addHerb, addClover, "#D7F2B2", "#3D7F20", "#D7F2B2"));
addClover.addEventListener("click", (e) => updateContentScript(true, "clover"), updateButtonColor(addSprout, addHerb, addClover, "#D7F2B2", "#D7F2B2", "#3D7F20"));



async function updateContentScript(addBlock, name) {
  // Sends a message to the content script with an object that has the
  // current value of the checkbox and a boolean (whether to add a block)
  const message = { enable: checkbox.checked, addBlock: addBlock, type: name };
  const [tab] = await chrome.tabs.query({
    active: true,
    lastFocusedWindow: true,
  });
  const response = await chrome.tabs.sendMessage(tab.id, message);
  // You can do something with response from the content script here
  console.log(response);
}
