const userView = document.getElementById("userView");
userView.addEventListener("click", function(event){
    event.preventDefault()
    const baseURL = "/user";
    const name = prompt("Please enter your first name ( Harry )", "Harry");
    const age = prompt("Please enter your age ( 20 )", "20");
    
    if ( name == null || age == null ) {
        displayMessage('messageBox', 'name and age are required for userInfo Page')
    } else {
        const pathWithParams = `${baseURL}/${name}/with-age/${age}`;
        // window.open(pathWithParams, '_blank')
        // window.open(pathWithParams)
        window.location.href = pathWithParams
    }
    
})

const userBio = document.getElementById("userBio");
userBio.addEventListener("click", function(event){
    event.preventDefault()
    const baseURL = "/user";
    const name = prompt("Please enter your first name ( Harry )", "Harry");
    const age = prompt("Please enter your age ( 20 )", "20");
    const job = prompt("Please enter your job title ( Magician )", "Magician");
    const sex = prompt("Please enter your sex ( M )", "M");
    if ( name == null || age == null || job == null || sex == null ) {
        displayMessage('messageBox', 'name , age , job and sex are required for userBio Page')
    }
    else {
        const pathWithParams = `${baseURL}/${name}/with-age/${age}/job/${job}/sex/${sex}`; // Result: /products/electronics/123
        // window.open(pathWithParams, '_blank')
        // window.open(pathWithParams)
        window.location.href = pathWithParams
    }
    
})

function displayMessage(elementId, message) {
    const messageBox = document.getElementById(elementId);
    
    if (!messageBox){
        return;
    }
    if (messageBox.tagName.toUpperCase() !== CustomFlashMessageTagName.toUpperCase()) {
        return;
    }
    messageBox.textContent = message;
    messageBox.style.display = 'block';
}