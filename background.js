// background.js

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.numericPartArray) {
        // Send the message to the popup script
        chrome.runtime.sendMessage({ numericPartArray: message.numericPartArray });
    }
});
