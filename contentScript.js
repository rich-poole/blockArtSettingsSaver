var port = chrome.runtime.connect();

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.greeting === "save")
        sendResponse({farewell: "goodbye"});
    }
  );

window.addEventListener("message", (event) => {
  // We only accept messages from ourselves
  if (event.source != window) {
    return;
  }

  if (event.data.type && (event.data.type == "FROM_PAGE")) {
    console.log("Content script received: " + event.data.text);
    port.postMessage(event.data.text);
  }
}, false);

