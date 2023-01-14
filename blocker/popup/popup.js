const checkbox = document.getElementById("enable");
const addBlockButton = document.getElementById("add-block");
//Need to create const for the cursor buttons -- need to add ids to the buttons in pop-up html
const addWave = document.getElementById("wave");
const addPointer= document.getElementById("pointer");


// Add event listeners to the checkbox and button
checkbox.addEventListener("change", (e) => updateContentScript(false));
/*addBlockButton.addEventListener("click", (e) => updateContentScript(true));*/

addWave.addEventListener("click", (e) => updateCursor('wave'));
addWave.addEventListener("click", (e) => updateCursor('pointer'));

function updateCursor(icon) {
  if icon == 'wave' {
    location = "";
  }
}






async function updateContentScript(addBlock) {
  // Sends a message to the content script with an object that has the
  // current value of the checkbox and a boolean (whether to add a block)
  const message = { enable: checkbox.checked, addBlock: addBlock };
  const [tab] = await chrome.tabs.query({
    active: true,
    lastFocusedWindow: true,
  });
  const response = await chrome.tabs.sendMessage(tab.id, message);
  // You can do something with response from the content script here
  console.log(response);
}



