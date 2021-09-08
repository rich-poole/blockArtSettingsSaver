let page = document.getElementById("clearStorage");
clearStorage.addEventListener("click", handleButtonClick);

// Reacts to a button click by marking marking the selected button and saving
// the selection
function handleButtonClick(event) {
  chrome.storage.sync.clear()
}