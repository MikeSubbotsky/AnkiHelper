let isOn = true;

document.getElementById("toggleButton").addEventListener("click", () => {
  isOn = !isOn;
  document.getElementById("state").textContent = isOn ? "On" : "Off";
  document.getElementById("toggleButton").textContent = isOn ? "Turn Off" : "Turn On";
  chrome.storage.sync.set({ isOn: isOn });
});

chrome.storage.sync.get("isOn", (data) => {
  isOn = data.isOn !== undefined ? data.isOn : true;
  document.getElementById("state").textContent = isOn ? "On" : "Off";
  document.getElementById("toggleButton").textContent = isOn ? "Turn Off" : "Turn On";
});


