/**
 * QPA Login Scheme
 * ================
 * we are applying QPA( Query Parameter Approach ) scheme in UserView Component 
 */
const authBtn = document.getElementById('auth')
authBtn.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default link behavior (immediate navigation)

    // Define your custom query parameter
    const paramName1 = 'origin_url';
    const paramValue1 = encodeURIComponent(window.location.href);

    const paramName2 = 'scheme';
    const paramValue2 = 'ORIGIN_PRESERVE_QPA'
    
    // Construct the new URL with the query parameter
    const currentHref = auth.href;
    const newUrl = new URL(currentHref);
    newUrl.searchParams.append(paramName1, paramValue1);
    newUrl.searchParams.append(paramName2, paramValue2);

    // Redirect to the new URL
    window.location.href = newUrl.toString();
});