console.log("Global Js Loaded")
function displaySuccessMessage(elementId, message) {
    const messageBox = document.getElementById(elementId);
    
    if (!messageBox){
        return;
    }
    if (messageBox.tagName.toUpperCase() !== CustomFlashMessageTagName.toUpperCase()) {
        return;
    }
    messageBox.textContent = message;
    messageBox.style.display = 'block';
    messageBox.style.color = 'green'
}

function getConfirmatoryBool(value) {
    const _map = new Map();
    _map.set("true", true);
    _map.set("yes", true);
    _map.set("1", true);
    _map.set(1, true);
    _map.set("false", false);
    _map.set("no", false);
    _map.set("0", false);
    _map.set(0, false);
    return _map.get(value)
}