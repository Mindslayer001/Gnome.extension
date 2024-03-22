document.addEventListener("DOMContentLoaded", function () {
  // Event listener for the "Scrapper" button
  document.getElementById("scrapper").addEventListener("click", () => {
      newtab("https://extensions.gnome.org/local/",1);
  });

  // Event listener for the "Submit" button
  document.getElementById("submitButton").addEventListener("click", async function () {
      const extensionIdValue = document.getElementById("extensionId").value;
      await newtab("https://extensions.gnome.org/",extensionIdValue);
      document.getElementById("extensionId").value = "";
  });
});

function newtab(url, value){
  window.open(url,"_blank");
  window.addEventListener("load", async function () {
    console.log("windows loaded");
  if (value === 1){
    getExtensions
  }
  else{

    downloadExtensions(value);
  }
});
}

async function getExtensions(callback) {
  let [tab] = await chrome.tabs.query({ active: true});

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => {
      const installedDivs = document.querySelectorAll(
        "#container #local_extensions .installed"
      );
      const numericPartArray = [];

      installedDivs.forEach((installedDiv) => {
        const extensionLink = installedDiv.querySelector(".extension-name a");

        if (extensionLink) {
          const hrefAttribute = extensionLink.getAttribute("href");
          const numericPart = hrefAttribute.match(/\d+/); // Extract numeric part using regex
          if (numericPart) {
            numericPartArray.push(numericPart[0]);
          }
        } else {
          console.error(
            "Element not found based on the specified path within .installed class"
          );
        }
      });
      console.log(numericPartArray);
      // Copy numericPartArray to clipboard
      const numericPartArrayText = numericPartArray.join(", ");
      const textarea = document.createElement("textarea");
      textarea.value = numericPartArrayText;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      //alert("The extension Id is copied to your clipboard");
    },
  });
}

async function downloadExtensions(value) {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: (value) => {
      console.log("New window has loaded:", value);
    },
    args: [value],
  });
}
