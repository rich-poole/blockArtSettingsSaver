chrome.runtime.onInstalled.addListener((details) => {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function(){
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStartMatcher({
        pageUrl: {hostEquals: 'ethblock.art'},
        css: ["input[type='range']"]
      })],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }])
  });
});



chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['content-script.js']
  });
});