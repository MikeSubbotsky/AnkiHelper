chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "openInput") {
      let existingInput = document.getElementById("anki-helper-input");
      if (existingInput) {
        existingInput.remove(); // Remove if already exists
      }
  
      const inputDiv = document.createElement("div");
      inputDiv.id = "anki-helper-input";
      inputDiv.style.position = "fixed";
      inputDiv.style.bottom = "20px";
      inputDiv.style.right = "20px";
      inputDiv.style.padding = "10px";
      inputDiv.style.backgroundColor = "white";
      inputDiv.style.border = "1px solid black";
      inputDiv.style.zIndex = 10000;
  
      const closeButton = document.createElement("button");
      closeButton.textContent = "X";
      closeButton.style.position = "absolute";
      closeButton.style.top = "5px";
      closeButton.style.right = "5px";
      closeButton.style.background = "transparent";
      closeButton.style.border = "none";
      closeButton.style.fontSize = "16px";
      closeButton.style.cursor = "pointer";
      closeButton.style.color = "black";
      closeButton.addEventListener("click", () => {
        inputDiv.remove(); // Just remove the input field without doing anything else
      });
      inputDiv.appendChild(closeButton);
  
      const inputField = document.createElement("input");
      inputField.type = "text";
      inputField.value = message.prefillText;
      inputField.style.width = "200px";
      inputField.style.marginTop = "20px"; // Add some margin so it doesn't overlap with the close button
      inputDiv.appendChild(inputField);
  
      const sendButton = document.createElement("button");
      sendButton.textContent = "Send";
      sendButton.style.marginLeft = "10px";
      sendButton.style.marginTop = "10px";
      sendButton.addEventListener("click", () => {
        chrome.runtime.sendMessage({
          action: "sendWord",
          word: inputField.value
        });
        inputDiv.remove(); // Remove input field after sending
      });
      inputDiv.appendChild(sendButton);
  
      document.body.appendChild(inputDiv);
    }
  });
  