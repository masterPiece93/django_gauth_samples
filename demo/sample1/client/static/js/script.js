/*
 Utility functions for the application
 =====================================
*/
console.log('utilities loaded');

function getCookie(name) {
    // Get the value of a cookie by name
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function decodeHtmlEntities(text) {
    // Decode HTML entities in a string
        const textArea = document.createElement("textarea");
        textArea.innerHTML = text;
        return textArea.value;
    }