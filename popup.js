let saveSettings = document.getElementById("saveSettings");
let restoreSettings = document.getElementById("restoreSettings");
let copySettings = document.getElementById("copySettings");
let rinkebyStyle = document.getElementById("rinkebyStyle").value;

saveSettings.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  let url = tab.url;
  document.getElementById("saveSettings").innerText = 'Done!';
  setTimeout(function(){document.getElementById("saveSettings").innerText = 'Save';},500);
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: saveValues,
    args: [url]
  });
});

restoreSettings.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  let url = tab.url;
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: restoreValues,
    args: [url]
  });
});

copySettings.addEventListener("click", async () => {
  rinkebyStyle = document.getElementById("rinkebyStyle").value;
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  let url = tab.url;
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: copyValues,
    args: [url,rinkebyStyle]
  });
});


function saveValues(url) {

  // Extract style and block
  let urlSplit = url.split('/');
  console.log({ url, urlSplit });
  let style = urlSplit[urlSplit.length - 2];
  let block = urlSplit[urlSplit.length - 1];
  let data = '';
  var nodeList = document.getElementsByTagName("input");
  let modno = 1;
  let colorno = 1;
  for (item in nodeList) {
    if (nodeList[item].type == "number") {
      data += 'mod' + modno + "-" + nodeList[item].value + '||';
      modno++;
    }
    if (nodeList[item].type == "color") {
      data += 'color' + colorno + "-" + nodeList[item].value + '||';
      colorno++;
    }
  };
  console.log({ data });

  chrome.storage.sync.set({ [`data${style}-${block}`]: data }, function () {
    console.log("saved");
  });
}

function restoreValues(url) {

  // Extract style and block
  let urlSplit = url.split('/');
  console.log({ url, urlSplit });
  let style = urlSplit[urlSplit.length - 2];
  let block = urlSplit[urlSplit.length - 1];

  chrome.storage.sync.get([`data${style}-${block}`], function (data) {
    console.log(data);
    if (typeof data[`data${style}-${block}`] == "undefined") {
      alert("Sorry, there's nothing stored for this style & block combination")
    } else {
      let dataArray = data[`data${style}-${block}`].split("||");
      let mappedData = {};
      for (d of dataArray) {
        if (d != "") {
          mappedData[`${d.split("-")[0]}`] = d.split("-")[1];
        }
      }

      console.log({ mappedData })

      var nodeList = document.getElementsByTagName("input");
      let modno = 1;
      let colorno = 1;
      for (item in nodeList) {
        if (nodeList[item].type == "number") {
          // nodeList[item].focus();
          // document.execCommand('selectAll');
          // document.execCommand('insertText', false, mappedData[`mod${modno}`]);
          nodeList[item].select();
          nodeList[item].value = (mappedData[`mod${modno}`]);
          nodeList[item].setAttribute("value", mappedData[`mod${modno}`]);
          nodeList[item].dispatchEvent(new Event("change", { bubbles: true }));
          nodeList[item].dispatchEvent(new Event("blur", { bubbles: true }));
          modno++;
        }
        else if (nodeList[item].type == "color") {
          // nodeList[item].focus();
          // document.execCommand('selectAll');
          // document.execCommand('insertText', false, mappedData[`color${colorno}`]);
          nodeList[item].select();
          nodeList[item].value = (mappedData[`color${colorno}`]);
          nodeList[item].setAttribute("value", mappedData[`color${colorno}`]);
          nodeList[item].dispatchEvent(new Event("change", { bubbles: true }));
          nodeList[item].dispatchEvent(new Event("blur", { bubbles: true }));
          colorno++;
        }
      };
    }

  });

}

function copyValues(url,rinkebyStyle) {
console.log("rinkebyStyle-"+rinkebyStyle)
  // Extract style and block
  let urlSplit = url.split('/');
  // let style = urlSplit[urlSplit.length - 2];
  let block = urlSplit[urlSplit.length - 1];
  chrome.storage.sync.get([`data${rinkebyStyle}-${block}`], function (data) {
    console.log(data);
    if (typeof data[`data${rinkebyStyle}-${block}`] == "undefined") {
      alert("No match, double check the rinkeby style number")
    } else {
      let dataArray = data[`data${rinkebyStyle}-${block}`].split("||");
      let mappedData = {};
      for (d of dataArray) {
        if (d != "") {
          mappedData[`${d.split("-")[0]}`] = d.split("-")[1];
        }
      }

      console.log({ mappedData })

      var nodeList = document.getElementsByTagName("input");
      let modno = 1;
      let colorno = 1;
      for (item in nodeList) {
        if (nodeList[item].type == "number") {
          // nodeList[item].focus();
          // document.execCommand('selectAll');
          // document.execCommand('insertText', false, mappedData[`mod${modno}`]);
          nodeList[item].select();
          nodeList[item].value = (mappedData[`mod${modno}`]);
          nodeList[item].setAttribute("value", mappedData[`mod${modno}`]);
          nodeList[item].dispatchEvent(new Event("change", { bubbles: true }));
          nodeList[item].dispatchEvent(new Event("blur", { bubbles: true }));
          modno++;
        }
        else if (nodeList[item].type == "color") {
          // nodeList[item].focus();
          // document.execCommand('selectAll');
          // document.execCommand('insertText', false, mappedData[`color${colorno}`]);
          nodeList[item].select();
          nodeList[item].value = (mappedData[`color${colorno}`]);
          nodeList[item].setAttribute("value", mappedData[`color${colorno}`]);
          nodeList[item].dispatchEvent(new Event("change", { bubbles: true }));
          nodeList[item].dispatchEvent(new Event("blur", { bubbles: true }));
          colorno++;
        }
      };
    }

  });
}