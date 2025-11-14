/**
 * HPA Login Scheme
 * ================
 * we are applying HPA( Header Parameter Approach ) scheme in UserBio Component 
 * 
 */
const authBtn = document.getElementById('auth')
authBtn.addEventListener('click', function(event) {
    // const baseUrl = "{{context_data.login_url}}"; // login api url
    const baseUrl = loginUrl; // login api url
    const params = {
        scheme: 'ORIGIN_PRESERVE_HPA', // conveys to set Origin via Header Parameter Approach
    };
    const queryParams = new URLSearchParams(params); // setting the login scheme type in QueryParams
    // Construct the full URL with the query parameters
    const urlWithParams = `${baseUrl}?${queryParams.toString()}`;
    // Prepare Headers
    const customHeaders = {
        'X-ORIGIN-URL': encodeURIComponent(window.location.href) // origin url passed
    };
    // Login API Call
    fetch(urlWithParams, {
        method: 'GET',
        headers: customHeaders
    })
    .then(response => {
        console.log(response)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
        window.location.href = data.redirect_to; // Js Redirect on the url returned by Server .
    })
    .catch(error => {
        console.error('Error:', error);
        alert(`Error: ${error}`)
    });
});