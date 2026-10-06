let popupElement = null;
let selectedText = "";

// Listen for mouse releases across the web page
document.addEventListener("mouseup", (event) => {
  // Briefly wait for browser to register the selection state
  setTimeout(() => {
    const selection = window.getSelection();
    selectedText = selection.toString().trim();

    // If text is highlighted, generate the floating menu
    if (selectedText.length > 0) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();

      createPopup(rect.left + window.scrollX, rect.top + window.scrollY, rect.width);
    } else {
      removePopup();
    }
  }, 10);
});

// Remove popup if clicking outside of it
document.addEventListener("mousedown", (event) => {
  if (popupElement && !popupElement.contains(event.target)) {
    removePopup();
  }
});

function createPopup(x, y, selectionWidth) {
  // Remove any existing active popup instance
  removePopup();

  popupElement = document.createElement("div");
  popupElement.className = "custom-selection-popup";

  // Create your tailored search action options (Icons can be replaced with SVGs matching your image style)
  popupElement.innerHTML = `
    <button class="custom-popup-btn" id="btn-search-google" title="Search Google">🔍</button>
    <button class="custom-popup-btn" id="btn-copy" title="Copy Text">📋</button>
    <button class="custom-popup-btn" id="btn-more" title="More Options">•••</button>
  `;

  document.body.appendChild(popupElement);

  // Position the toolbar cleanly over the selected line
  const popupRect = popupElement.getBoundingClientRect();
  const posX = x + (selectionWidth / 2) - (popupRect.width / 2);
  const posY = y - popupRect.height - 10; // 10px spacing buffer above selection

  popupElement.style.left = `${Math.max(10, posX)}px`;
  popupElement.style.top = `${Math.max(10, posY)}px`;

  // Attach execution events to the menu items
  document.getElementById("btn-search-google").addEventListener("click", () => {
    window.open(`https://google.com{encodeURIComponent(selectedText)}`, "_blank");
    removePopup();
  });

  document.getElementById("btn-copy").addEventListener("click", () => {
    navigator.clipboard.writeText(selectedText);
    removePopup();
  });

  document.getElementById("btn-more").addEventListener("click", () => {
    alert(`More tools coming soon! You selected: "${selectedText}"`);
    removePopup();
  });
}

function removePopup() {
  if (popupElement) {
    popupElement.remove();
    popupElement = null;
  }
}

