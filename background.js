chrome.runtime.onInstalled.addListener(() => {
  // Create the first button that always appears
  chrome.contextMenus.create({
    id: "open-anki-helper",
    title: "Open Anki Helper",
    contexts: ["all"], // This makes it visible all the time
  });

  // Create the second button that only appears when text is selected
  chrome.contextMenus.create({
    id: "create-card",
    title: "Create a card for '%s'", // '%s' will be replaced by the selected text
    contexts: ["selection"], // Only show this when text is selected
  });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === "open-anki-helper") {
    const prefillText = info.selectionText || "";

    try {
      // Inject content script into the active tab
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["content.js"],
      });

      // After injection, send message to the content script
      chrome.tabs.sendMessage(tab.id, {
        action: "openInput",
        prefillText: prefillText,
      });
    } catch (error) {
      console.error("Failed to inject content script or send message:", error);
    }
  }

  if (info.menuItemId === "create-card" && info.selectionText) {
    // Send the selected text immediately as a POST request
    // const url = "https://mikes.app.n8n.cloud/webhook-test/531c4634-ab11-4884-b7b7-3b04e5300458"; // Test
    const url = "https://mikes.app.n8n.cloud/webhook/531c4634-ab11-4884-b7b7-3b04e5300458"; // Production
    const data = { word: info.selectionText };

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
});
