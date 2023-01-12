let showBlocks = true;

// Create a block container div and append it to the document
const blockContainer = document.createElement("div");
blockContainer.classList.add("blockContainer");
document.body.appendChild(blockContainer);

function addBlock() {
  // Create a div for the block
  const block = document.createElement("div");
  block.classList.add("blocker-block");

  // Create the drag handle
  const dragButton = document.createElement("button");
  dragButton.innerText = "drag";
  makeDraggable(dragButton);

  // Create the delete button
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "remove";
  deleteButton.addEventListener("click", deleteParent);

  // Add the delete button and drag handle to the block
  block.appendChild(deleteButton);
  block.appendChild(dragButton);

  // Add the block to the block container
  blockContainer.appendChild(block);
}

function deleteParent(e) {
  e.target.parentNode.remove();
}

function makeDraggable(el) {
  el.addEventListener("mousedown", function (e) {
    const parentBlock = el.parentNode;
    var offsetX =
      e.clientX - parseInt(window.getComputedStyle(parentBlock).left);
    var offsetY =
      e.clientY - parseInt(window.getComputedStyle(parentBlock).top);

    function mouseMoveHandler(e) {
      parentBlock.style.top = e.clientY - offsetY + "px";
      parentBlock.style.left = e.clientX - offsetX + "px";
    }

    function reset() {
      window.removeEventListener("mousemove", mouseMoveHandler);
      window.removeEventListener("mouseup", reset);
    }

    window.addEventListener("mousemove", mouseMoveHandler);
    window.addEventListener("mouseup", reset);
  });
}

function renderBlocks() {
  if (showBlocks) {
    blockContainer.classList.remove("invisible");
  } else {
    blockContainer.classList.add("invisible");
  }
}

// Add a message listener that sets the value of "replace"
chrome.runtime.onMessage.addListener((request) => {
  showBlocks = request["enable"];
  if (request["addBlock"]) addBlock();
  renderBlocks();
});
