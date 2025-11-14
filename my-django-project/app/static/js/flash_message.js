/*
    Custom Flash Message Utility
*/ 
console.log("Custom Flash Message Component Loaded")
class CustomFlashMessage extends HTMLElement {
    constructor() {
        super(); // Always call super() in the constructor
        // Initialize element properties or create shadow DOM
        this.timer = null;
        this.isTimed = false // default untimed
        this.duration = 5000 // default 5s
    }

    connectedCallback() {
        // Called when the element is inserted into the DOM
        // Set basic style
        this.style.zIndex = "1000";
        this.style.width = "fit-content";
        this.style.textAlign = "center";
        // Set visibility
        this.style.display = 'none'; // Initially hidden

        // --- old approach -------------------------
        // const isTimed = this.getAttribute('timed')
        // console.log(`isTimed : ${isTimed}`)
        // ------------------------------------------
        // --- new approach ---------------------------------------------------
        if (this.isTimed && ['true', 'yes', 'y', '1'].includes(this.isTimed)) {
            this.setupObserver();
        }
        // --------------------------------------------------------------------
        console.log("custom element created")
    }

    disconnectedCallback() {
        // Called when the element is removed from the DOM
    }

    attributeChangedCallback(name, oldValue, newValue) {
        // Called when an observed attribute changes
        /* you may get attributes via this.getAttribute('timed') also */

        if (name == "duration"){
            this.duration = parseInt(newValue, 5000, 10)
        }
        if (name == "timed"){
            this.isTimed = newValue
        }
        
    }

    setupObserver() {
        // observes on the element style.display property
        const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                    if (this.style.display !== 'none') {
                        this.startHideTimer();
                    } else {
                        this.clearHideTimer();
                    }
                }
            });
        });
        observer.observe(this, { attributes: true });
    }

    startHideTimer() {
        this.clearHideTimer(); // Clear any existing timer
        this.timer = setTimeout(() => {
            this.style.display = 'none';
        }, this.duration || 5000); // Default to 5 seconds if no interval is set
    }

    clearHideTimer() {
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
    }

    static get observedAttributes() {
        // Define attributes to observe for changes
        return ['timed', 'duration'];
    }
}
const CustomFlashMessageTagName = "custom-flash-message" // Tag Name to use in HTML
customElements.define(CustomFlashMessageTagName, CustomFlashMessage);

function displayTimedMessage(elementId, message, duration) {
    // A Custom Timed message
    /*
        CustomFlashMessage Tag provides options for displaying
        timed messages . 
        In case you want to control the timing part of this tag ,
            you can use this function
    */
    const messageBox = document.getElementById(elementId);
    
    if (!messageBox){
        return;
    }
    if (messageBox.tagName.toUpperCase() !== CustomFlashMessageTagName.toUpperCase()) {
        return;
    }
    messageBox.textContent = message;
    messageBox.style.display = 'block'; // Show the message box

    setTimeout(() => {
        messageBox.style.display = 'none'; // Hide the message box after the duration
    }, duration);
}